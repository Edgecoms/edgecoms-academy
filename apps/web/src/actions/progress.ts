"use server";

import { db } from "@edgecoms-academy/db";
import { lessonProgress } from "@edgecoms-academy/db/schema/academy";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getLesson } from "@/content";
import { requireSession } from "@/lib/session";

const lessonRef = z.object({
	courseSlug: z.string().min(1),
	lessonSlug: z.string().min(1),
});

const CONFLICT_TARGET = [
	lessonProgress.userId,
	lessonProgress.courseSlug,
	lessonProgress.lessonSlug,
];

async function resolveLesson(input: unknown) {
	const session = await requireSession();
	const { courseSlug, lessonSlug } = lessonRef.parse(input);

	if (!getLesson(courseSlug, lessonSlug)) {
		throw new Error(`Unknown lesson: ${courseSlug}/${lessonSlug}`);
	}

	return { courseSlug, lessonSlug, userId: session.user.id };
}

function revalidateProgress(courseSlug: string, lessonSlug: string) {
	revalidatePath(`/academy/courses/${courseSlug}/${lessonSlug}`, "layout");
}

export async function markLessonStarted(input: z.input<typeof lessonRef>) {
	const { courseSlug, lessonSlug, userId } = await resolveLesson(input);

	await db
		.insert(lessonProgress)
		.values({ courseSlug, lessonSlug, userId })
		.onConflictDoUpdate({
			set: { updatedAt: new Date() },
			target: CONFLICT_TARGET,
		});

	revalidateProgress(courseSlug, lessonSlug);
}

export async function markLessonCompleted(input: z.input<typeof lessonRef>) {
	const { courseSlug, lessonSlug, userId } = await resolveLesson(input);

	await db
		.insert(lessonProgress)
		.values({ completedAt: new Date(), courseSlug, lessonSlug, userId })
		.onConflictDoUpdate({
			set: {
				completedAt: sql`coalesce(${lessonProgress.completedAt}, excluded.completed_at)`,
				updatedAt: new Date(),
			},
			target: CONFLICT_TARGET,
		});

	revalidateProgress(courseSlug, lessonSlug);
}

export async function completeLesson(formData: FormData) {
	await markLessonCompleted({
		courseSlug: String(formData.get("courseSlug")),
		lessonSlug: String(formData.get("lessonSlug")),
	});
}

export async function completeAndAdvance(formData: FormData) {
	const courseSlug = String(formData.get("courseSlug"));
	const lessonSlug = String(formData.get("lessonSlug"));
	const nextSlug = String(formData.get("nextSlug"));

	await markLessonCompleted({ courseSlug, lessonSlug });

	if (!getLesson(courseSlug, nextSlug)) {
		throw new Error(`Unknown lesson: ${courseSlug}/${nextSlug}`);
	}

	redirect(`/academy/courses/${courseSlug}/${nextSlug}`);
}
