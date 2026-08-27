import { cn } from "@edgecoms-academy/ui/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { completeAndAdvance } from "@/actions/progress";
import type { LessonLocation } from "@/content";

import { SubmitButton } from "./submit-button";

const NAV_BOX =
	"flex h-auto w-full flex-col items-start gap-1 whitespace-normal rounded-lg border border-border bg-transparent p-5 text-left transition-colors hover:bg-muted/50";

const NAV_LABEL =
	"flex items-center gap-1 font-normal text-muted-foreground text-sm";

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
			className="mt-16 grid gap-4 sm:grid-cols-2"
		>
			{previous ? (
				<Link
					className={NAV_BOX}
					href={`/academy/courses/${courseSlug}/${previous.lesson.slug}`}
				>
					<span className={NAV_LABEL}>
						<ChevronLeft className="size-4" />
						Previous
					</span>
					<span className="font-medium text-sm">{previous.lesson.title}</span>
				</Link>
			) : (
				<span className="hidden sm:block" />
			)}

			{next ? (
				// `contents` lets the button itself sit in the grid track
				<form action={completeAndAdvance} className="contents">
					<input name="courseSlug" type="hidden" value={courseSlug} />
					<input name="lessonSlug" type="hidden" value={lessonSlug} />
					<input name="nextSlug" type="hidden" value={next.lesson.slug} />
					<SubmitButton
						className={cn(NAV_BOX, "items-end text-right")}
						variant="ghost"
					>
						<span className={NAV_LABEL}>
							Next
							<ChevronRight className="size-4" />
						</span>
						<span className="font-medium text-sm">{next.lesson.title}</span>
					</SubmitButton>
				</form>
			) : null}
		</nav>
	);
}
