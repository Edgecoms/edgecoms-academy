import "server-only";
import { db } from "@edgecoms-academy/db";
import { lessonProgress } from "@edgecoms-academy/db/schema/academy";
import { and, desc, eq } from "drizzle-orm";
import { cache } from "react";

import { getAllLessons, getCourseTotals, type LessonLocation } from "@/content";

import { type LatestProgress, selectResumeTarget } from "./resume";
import { requireSession } from "./session";

export interface CourseProgress {
	completed: Set<string>;
	completedCount: number;
	latest: LatestProgress | undefined;
	percent: number;
	started: Set<string>;
	totalCount: number;
}

export const getCourseProgress = cache(
	async (courseSlug: string): Promise<CourseProgress> => {
		const session = await requireSession();

		const rows = await db
			.select({
				completedAt: lessonProgress.completedAt,
				lessonSlug: lessonProgress.lessonSlug,
			})
			.from(lessonProgress)
			.where(
				and(
					eq(lessonProgress.userId, session.user.id),
					eq(lessonProgress.courseSlug, courseSlug)
				)
			)
			.orderBy(desc(lessonProgress.updatedAt));

		const completed = new Set<string>();
		const started = new Set<string>();

		for (const row of rows) {
			started.add(row.lessonSlug);
			if (row.completedAt) {
				completed.add(row.lessonSlug);
			}
		}

		const totalCount = getCourseTotals(courseSlug).lessons;
		const newest = rows.at(0);

		return {
			completed,
			completedCount: completed.size,
			latest: newest
				? {
						completed: Boolean(newest.completedAt),
						lessonSlug: newest.lessonSlug,
					}
				: undefined,
			percent:
				totalCount === 0 ? 0 : Math.round((completed.size / totalCount) * 100),
			started,
			totalCount,
		};
	}
);

export async function getResumeTarget(
	courseSlug: string
): Promise<LessonLocation | undefined> {
	const progress = await getCourseProgress(courseSlug);
	return selectResumeTarget(
		getAllLessons(courseSlug),
		progress.latest,
		progress.completed
	);
}
