import type { createDb } from "@edgecoms-academy/db";
import { user } from "@edgecoms-academy/db/schema/auth";
import { env } from "@edgecoms-academy/env/server";
import { eq } from "drizzle-orm";

import { sendEmail } from "./email";
import { welcomeEmail } from "./welcome-email";

const COURSE_PATH = "/academy/courses/shopify-ecommerce";

type Database = ReturnType<typeof createDb>;

/** The "start learning" destination baked into every onboarding email. */
export function welcomeCourseUrl() {
	return new URL(COURSE_PATH, env.BETTER_AUTH_URL).toString();
}

export interface WelcomeRecipient {
	email: string;
	id: string;
	name: string;
}

/**
 * Sends the onboarding email, then stamps the user so it can never go out
 * twice. The signup hook and the backfill script both route through here, so
 * neither can send behind the other's back.
 */
export async function sendWelcomeEmail(
	db: Database,
	recipient: WelcomeRecipient
) {
	await sendEmail({
		to: recipient.email,
		...welcomeEmail({
			communityUrl: env.WHATSAPP_COMMUNITY_URL,
			courseUrl: welcomeCourseUrl(),
			name: recipient.name,
			supportEmail: env.SUPPORT_EMAIL,
		}),
	});

	await db
		.update(user)
		.set({ welcomeEmailSentAt: new Date() })
		.where(eq(user.id, recipient.id));
}
