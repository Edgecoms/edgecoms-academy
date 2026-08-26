import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { completeAndAdvance } from "@/actions/progress";
import type { LessonLocation } from "@/content";

interface LessonPaginationProps {
	courseSlug: string;
	lessonSlug: string;
	next: LessonLocation | undefined;
	previous: LessonLocation | undefined;
}

export function LessonPagination({
	courseSlug,
	lessonSlug,
	previous,
	next,
}: LessonPaginationProps) {
	return (
		<nav
			aria-label="Lesson navigation"
			className="grid gap-3 border-border border-t pt-8 sm:grid-cols-2"
		>
			{previous ? (
				<Link
					className="group flex flex-col gap-1 border border-border p-4 transition-colors hover:bg-muted"
					href={`/academy/courses/${courseSlug}/${previous.lesson.slug}`}
				>
					<span className="flex items-center gap-1.5 font-mono text-eyebrow text-muted-foreground uppercase">
						<ArrowLeft className="size-3" />
						Previous
					</span>
					<span className="font-medium text-sm">{previous.lesson.title}</span>
				</Link>
			) : (
				<span />
			)}

			{next ? (
				<form action={completeAndAdvance}>
					<input name="courseSlug" type="hidden" value={courseSlug} />
					<input name="lessonSlug" type="hidden" value={lessonSlug} />
					<input name="nextSlug" type="hidden" value={next.lesson.slug} />
					<button
						className="flex w-full flex-col items-end gap-1 border border-border p-4 text-right transition-colors hover:bg-muted"
						type="submit"
					>
						<span className="flex items-center gap-1.5 font-mono text-eyebrow text-muted-foreground uppercase">
							Next
							<ArrowRight className="size-3" />
						</span>
						<span className="font-medium text-sm">{next.lesson.title}</span>
					</button>
				</form>
			) : null}
		</nav>
	);
}
