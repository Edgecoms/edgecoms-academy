import type { LessonLocation } from "@/content";

export interface LatestProgress {
	completed: boolean;
	lessonSlug: string;
}

export function selectResumeTarget(
	sequence: LessonLocation[],
	latest: LatestProgress | undefined,
	completed: ReadonlySet<string>
): LessonLocation | undefined {
	if (!latest) {
		return sequence.at(0);
	}

	const current = sequence.find(
		(entry) => entry.lesson.slug === latest.lessonSlug
	);

	if (current && !latest.completed) {
		return current;
	}

	const next = current ? sequence[current.index + 1] : undefined;
	if (next && !completed.has(next.lesson.slug)) {
		return next;
	}

	return sequence.find((entry) => !completed.has(entry.lesson.slug));
}
