import type { LessonChapter } from "@/content/types";

export function LessonChapters({ chapters }: { chapters: LessonChapter[] }) {
	return (
		<section aria-labelledby="chapters-heading">
			{/* the reference column carries no visible heading; keep one for screen readers */}
			<h2 className="sr-only" id="chapters-heading">
				Chapters
			</h2>
			<ul className="flex flex-col gap-4">
				{chapters.map((chapter) => (
					<li
						className="flex gap-4 text-sm"
						key={`${chapter.at}-${chapter.label}`}
					>
						<span className="w-11 shrink-0 text-muted-foreground tabular-nums">
							{chapter.at}
						</span>
						{/* the column is narrow, so long labels clip like the reference */}
						<span className="truncate text-foreground" title={chapter.label}>
							{chapter.label}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
