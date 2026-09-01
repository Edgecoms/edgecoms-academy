"use client";

import { Badge } from "@edgecoms-academy/ui/components/badge";
import { Check } from "lucide-react";

import { completeLesson } from "@/actions/progress";
import { trackCustomEvent } from "@/lib/meta-pixel";

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
			<Badge
				className="h-9 gap-2 px-4 text-muted-foreground text-sm"
				variant="outline"
			>
				<Check />
				Completed
			</Badge>
		);
	}

	return (
		<form
			action={async (formData) => {
				trackCustomEvent("LessonComplete", {
					course: courseSlug,
					lesson: lessonSlug,
				});
				await completeLesson(formData);
			}}
		>
			<input name="courseSlug" type="hidden" value={courseSlug} />
			<input name="lessonSlug" type="hidden" value={lessonSlug} />
			<SubmitButton size="lg" variant="outline">
				Mark as complete
			</SubmitButton>
		</form>
	);
}

