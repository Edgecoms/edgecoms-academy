import {
	index,
	pgTable,
	primaryKey,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

import { user } from "./auth";

export const lessonProgress = pgTable(
	"lesson_progress",
	{
		completedAt: timestamp("completed_at"),
		courseSlug: text("course_slug").notNull(),
		lessonSlug: text("lesson_slug").notNull(),
		startedAt: timestamp("started_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [
		primaryKey({ columns: [table.userId, table.courseSlug, table.lessonSlug] }),
		index("lesson_progress_resume_idx").on(
			table.userId,
			table.updatedAt.desc()
		),
	]
);
