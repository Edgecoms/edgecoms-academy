import { db } from "@edgecoms-academy/db";
import { lessonProgress } from "@edgecoms-academy/db/schema/academy";
import { and, eq, sql } from "drizzle-orm";

const userId = process.argv[2] ?? "";
const courseSlug = "shopify-ecommerce";
const lessonSlug = "pricing";

const target = [
	lessonProgress.userId,
	lessonProgress.courseSlug,
	lessonProgress.lessonSlug,
];

const query = db
	.insert(lessonProgress)
	.values({
		completedAt: new Date("2026-01-01T10:00:00Z"),
		courseSlug,
		lessonSlug,
		userId,
	})
	.onConflictDoUpdate({
		set: {
			completedAt: sql`coalesce(${lessonProgress.completedAt}, excluded.completed_at)`,
			updatedAt: new Date(),
		},
		target,
	});

console.log("SQL:", query.toSQL().sql);

// started (no completion)
await db
	.insert(lessonProgress)
	.values({ courseSlug, lessonSlug, userId })
	.onConflictDoUpdate({ set: { updatedAt: new Date() }, target });

// first completion
await query;

// later completion must not overwrite
await db
	.insert(lessonProgress)
	.values({
		completedAt: new Date("2026-09-09T10:00:00Z"),
		courseSlug,
		lessonSlug,
		userId,
	})
	.onConflictDoUpdate({
		set: {
			completedAt: sql`coalesce(${lessonProgress.completedAt}, excluded.completed_at)`,
			updatedAt: new Date(),
		},
		target,
	});

const rows = await db
	.select()
	.from(lessonProgress)
	.where(
		and(
			eq(lessonProgress.userId, userId),
			eq(lessonProgress.lessonSlug, lessonSlug)
		)
	);

console.log("rows:", rows.length);
console.log("completedAt:", rows[0]?.completedAt?.toISOString());
process.exit(0);
