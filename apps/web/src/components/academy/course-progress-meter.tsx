import { Progress } from "@edgecoms-academy/ui/components/progress";

interface CourseProgressMeterProps {
	completedCount: number;
	label?: string;
	percent: number;
	totalCount: number;
}

export function CourseProgressMeter({
	completedCount,
	totalCount,
	percent,
	label = "Course progress",
}: CourseProgressMeterProps) {
	return (
		<Progress
			aria-label={label}
			aria-valuetext={`${percent} percent, ${completedCount} of ${totalCount} lessons`}
			// column-reverse keeps the bar above its caption
			className="flex-col-reverse gap-2"
			value={percent}
		>
			<p className="font-mono text-muted-foreground text-xs tabular-nums">
				{percent}% · {completedCount}/{totalCount} lessons
			</p>
		</Progress>
	);
}
