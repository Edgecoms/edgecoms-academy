import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

function getVercelOrigin() {
	const vercelUrl =
		process.env.VERCEL_ENV === "production"
			? (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL)
			: (process.env.VERCEL_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL);
	if (!vercelUrl) {
		return;
	}
	return vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`;
}

const vercelOrigin = getVercelOrigin();

const runtimeEnv = {
	...process.env,
	BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ?? vercelOrigin,
};

export const env = createEnv({
	emptyStringAsUndefined: true,
	runtimeEnv,
	server: {
		BETTER_AUTH_SECRET: z.string().min(32),
		BETTER_AUTH_URL: z.url(),
		DATABASE_URL: z.string().min(1),
		EMAIL_FROM: z
			.string()
			.min(1)
			.default("Edgecoms Academy <academy@tryedgegrowth.com>"),
		EMAIL_TRANSPORT: z.enum(["smtp", "resend"]).optional(),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
		RESEND_API_KEY: z.string().min(1).optional(),
		SMTP_URL: z.string().min(1).default("smtp://localhost:1025"),
		SUPPORT_EMAIL: z.string().min(1).default("support@edgecoms.com"),
		WHATSAPP_COMMUNITY_URL: z
			.url()
			.default(
				"https://chat.whatsapp.com/DKxNVrzTo3u7jVaBtOfLMZ?s=cl&p=a&mlu=4&ilr=4"
			),
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
