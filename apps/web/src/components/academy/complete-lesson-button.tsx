import { Check } from "lucide-react";

import { completeLesson } from "@/actions/progress";

import { SubmitButton } from "./submit-button";

interface CompleteLessonButtonProps {
	completed: boolean;
	courseSlug: string;
	lessonSlug: string;
}

export function CompleteLessonButton({
	courseSlug,
	lessonSlug,
	completed,
}: CompleteLessonButtonProps) {
	if (completed) {
		return (
			<p className="inline-flex h-9 items-center gap-2 font-medium text-muted-foreground text-sm">
				<Check className="size-4" />
				Completed
			</p>
		);
	}

	return (
		<form action={completeLesson}>
			<input name="courseSlug" type="hidden" value={courseSlug} />
			<input name="lessonSlug" type="hidden" value={lessonSlug} />
			<SubmitButton className="inline-flex h-9 items-center gap-2 border border-border px-4 font-medium text-sm transition-colors hover:bg-muted disabled:opacity-60">
				Mark as complete
			</SubmitButton>
		</form>
	);
}
