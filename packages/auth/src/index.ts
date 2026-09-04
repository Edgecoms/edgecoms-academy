import { createDb } from "@edgecoms-academy/db";
// biome-ignore lint/performance/noNamespaceImport: drizzleAdapter takes the whole schema object
import * as schema from "@edgecoms-academy/db/schema/auth";
import { env } from "@edgecoms-academy/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins/email-otp";

import { accessCodeEmail } from "./access-code-email";
import { sendEmail } from "./email";
import { sendWelcomeEmail } from "./send-welcome-email";

const SESSION_LIFETIME_SECONDS = 60 * 60 * 24 * 60;
const SESSION_REFRESH_SECONDS = 60 * 60 * 24;
const CODE_LIFETIME_SECONDS = 60 * 10;

export function createAuth() {
	const db = createDb();

	return betterAuth({
		baseURL: env.BETTER_AUTH_URL,
		database: drizzleAdapter(db, {
			provider: "pg",
			schema,
		}),
		databaseHooks: {
			user: {
				create: {
					// Runs once, the first time someone verifies a code, so this is
					// the signup moment rather than every sign-in.
					after: async (createdUser) => {
						try {
							await sendWelcomeEmail(db, createdUser);
						} catch (error) {
							// A welcome email must never keep someone out of the course
							// they just signed up for, so delivery failures stay non-fatal.
							console.error("Welcome email failed to send", error);
						}
					},
				},
			},
		},
		emailAndPassword: {
			enabled: false,
		},
		plugins: [
			emailOTP({
				allowedAttempts: 3,
				expiresIn: CODE_LIFETIME_SECONDS,
				otpLength: 6,
				rateLimit: { max: 3, window: 60 },
				sendVerificationOTP: async ({ email, otp }) => {
					await sendEmail({
						to: email,
						...accessCodeEmail(otp, env.SUPPORT_EMAIL),
					});
				},
				storeOTP: "hashed",
			}),
			nextCookies(),
		],
		rateLimit: {
			storage: "database",
		},
		secret: env.BETTER_AUTH_SECRET,
		session: {
			cookieCache: {
				enabled: true,
			},
			expiresIn: SESSION_LIFETIME_SECONDS,
			updateAge: SESSION_REFRESH_SECONDS,
		},
		trustedOrigins: [env.BETTER_AUTH_URL],
		user: {
			additionalFields: {
				phone: { input: true, required: true, type: "string" },
			},
		},
	});
}

export const auth = createAuth();
