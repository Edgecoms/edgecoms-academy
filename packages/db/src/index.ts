import { env } from "@edgecoms-academy/env/server";
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

// Neon HTTP in prod, plain TCP for the local docker postgres.
// Typed as the Neon database so nothing uses APIs neon-http lacks (interactive transactions).
export function createDb(): NeonHttpDatabase<typeof schema> {
	if (env.DATABASE_URL.includes(".neon.tech")) {
		return drizzleNeon(neon(env.DATABASE_URL), { schema });
	}
	return drizzlePg(env.DATABASE_URL, {
		schema,
	}) as unknown as NeonHttpDatabase<typeof schema>;
}

export const db = createDb();
