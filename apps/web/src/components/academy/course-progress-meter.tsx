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
		<div className="flex flex-col gap-2">
			<div
				aria-label={label}
				aria-valuemax={100}
				aria-valuemin={0}
				aria-valuenow={percent}
				aria-valuetext={`${percent} percent, ${completedCount} of ${totalCount} lessons`}
				className="h-1 w-full overflow-hidden bg-border"
				role="progressbar"
			>
				<div
					className="h-full bg-foreground transition-[width] duration-500"
					style={{ width: `${percent}%` }}
				/>
			</div>
			<p className="font-mono text-muted-foreground text-xs tabular-nums">
				{percent}% · {completedCount}/{totalCount} lessons
			</p>
		</div>
	);
}
