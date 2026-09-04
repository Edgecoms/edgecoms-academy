/**
 * Sends the onboarding email to users who signed up before it existed.
 *
 * Selects only users whose welcome_email_sent_at is null, and stamps each one
 * as it goes, so the run is resumable and re-running it never emails anyone
 * twice. Dry run unless --send is passed.
 *
 *   bun run packages/auth/scripts/backfill-welcome-emails.ts            # preview
 *   bun run packages/auth/scripts/backfill-welcome-emails.ts --send     # send
 */
import { createDb } from "@edgecoms-academy/db";
import { user } from "@edgecoms-academy/db/schema/auth";
import { env } from "@edgecoms-academy/env/server";
import { and, asc, eq, isNull } from "drizzle-orm";

import { sendWelcomeEmail, welcomeCourseUrl } from "../src/send-welcome-email";

// Resend allows 2 requests a second on the default plan; stay comfortably under.
const DEFAULT_DELAY_MS = 600;
const LOCAL_HOSTS = new Set(["0.0.0.0", "127.0.0.1", "::1", "localhost"]);

const USAGE = `Backfill the Edgecoms Academy onboarding email.

Usage:
  bun run packages/auth/scripts/backfill-welcome-emails.ts [options]

Options:
  --send            Actually send. Without this the script only reports.
  --limit=N         Send to at most N users, oldest signup first.
  --email=ADDRESS   Restrict to a single user. Useful for one live test.
  --delay=MS        Pause between sends. Default ${DEFAULT_DELAY_MS}.
  --help            Show this message.
`;

const args = process.argv.slice(2);
const hasFlag = (name: string) => args.includes(`--${name}`);

function flagValue(name: string) {
	const prefix = `--${name}=`;
	return args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

function positiveNumber(name: string, fallback: number) {
	const raw = flagValue(name);
	if (raw === undefined) {
		return fallback;
	}
	const parsed = Number(raw);
	if (!Number.isFinite(parsed) || parsed < 0) {
		throw new Error(`--${name} must be a non-negative number, got "${raw}"`);
	}
	return parsed;
}

const sleep = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

if (hasFlag("help")) {
	process.stdout.write(USAGE);
	process.exit(0);
}

const live = hasFlag("send");
const limit = positiveNumber("limit", 0);
const delayMs = positiveNumber("delay", DEFAULT_DELAY_MS);
const onlyEmail = flagValue("email")?.trim().toLowerCase();

const db = createDb();
const transport =
	env.EMAIL_TRANSPORT ?? (env.NODE_ENV === "production" ? "resend" : "smtp");

const neverEmailed = isNull(user.welcomeEmailSentAt);
const query = db
	.select({ email: user.email, id: user.id, name: user.name })
	.from(user)
	.where(
		onlyEmail ? and(neverEmailed, eq(user.email, onlyEmail)) : neverEmailed
	)
	.orderBy(asc(user.createdAt))
	.$dynamic();

const targets = await (limit > 0 ? query.limit(limit) : query);
const courseUrl = welcomeCourseUrl();

// SKIP_ENV_VALIDATION bypasses zod, and with it the schema defaults, so these
// can arrive undefined and bake "undefined" into every email that goes out.
const missing = (
	[
		["EMAIL_FROM", env.EMAIL_FROM],
		["SUPPORT_EMAIL", env.SUPPORT_EMAIL],
		["WHATSAPP_COMMUNITY_URL", env.WHATSAPP_COMMUNITY_URL],
	] as const
)
	.filter(([, value]) => !value)
	.map(([name]) => name);

if (missing.length > 0) {
	process.stderr.write(
		`Refusing to run: ${missing.join(", ")} resolved to nothing.\n` +
			"These have schema defaults, so this usually means SKIP_ENV_VALIDATION is\n" +
			"set, which skips the defaults too. Unset it and supply a real env file.\n"
	);
	process.exit(1);
}

process.stdout.write(
	[
		"",
		`  mode       ${live ? "LIVE SEND" : "DRY RUN - nothing will be sent"}`,
		`  transport  ${transport}`,
		`  from       ${env.EMAIL_FROM}`,
		`  links to   ${courseUrl}`,
		`  community  ${env.WHATSAPP_COMMUNITY_URL}`,
		onlyEmail ? `  filter     ${onlyEmail}` : null,
		limit > 0 ? `  limit      ${limit}` : null,
		`  targeting  ${targets.length} user(s) with no welcome email on record`,
		"",
		"",
	]
		.filter((line) => line !== null)
		.join("\n")
);

// The course link is baked from BETTER_AUTH_URL. Delivering externally off a
// local env would mail every user a link to a machine they cannot reach. A
// local smtp catcher is fine, so this only blocks the combination that escapes.
if (
	live &&
	transport === "resend" &&
	LOCAL_HOSTS.has(new URL(courseUrl).hostname)
) {
	process.stderr.write(
		`Refusing to send: the course link resolves to ${courseUrl}\n` +
			"BETTER_AUTH_URL is pointing at a local origin. Point DOTENV_CONFIG_PATH at\n" +
			"your production env file, or set BETTER_AUTH_URL to the real origin.\n"
	);
	process.exit(1);
}

if (targets.length === 0) {
	process.stdout.write("Nothing to do.\n");
	process.exit(0);
}

let sent = 0;
const failures: { email: string; reason: string }[] = [];

for (const [index, target] of targets.entries()) {
	const position = `[${index + 1}/${targets.length}]`;

	if (!live) {
		process.stdout.write(`${position} would send to ${target.email}\n`);
		continue;
	}

	try {
		// Sequential on purpose: this paces sends under the provider's rate limit.
		// biome-ignore lint/performance/noAwaitInLoops: throughput is deliberately capped
		await sendWelcomeEmail(db, target);
		sent += 1;
		process.stdout.write(`${position} sent to ${target.email}\n`);
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		failures.push({ email: target.email, reason });
		process.stderr.write(`${position} FAILED ${target.email} - ${reason}\n`);
	}

	if (index < targets.length - 1) {
		await sleep(delayMs);
	}
}

if (live) {
	process.stdout.write(`\nSent ${sent}, failed ${failures.length}.\n`);
	for (const failure of failures) {
		process.stdout.write(`  ${failure.email}: ${failure.reason}\n`);
	}
	if (failures.length > 0) {
		process.stdout.write(
			"\nFailures were not stamped, so re-running picks them back up.\n"
		);
	}
} else {
	process.stdout.write("\nDry run. Re-run with --send to deliver these.\n");
}

process.exit(failures.length > 0 ? 1 : 0);
