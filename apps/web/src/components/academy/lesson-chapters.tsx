import type { LessonChapter } from "@/content/types";

export function LessonChapters({ chapters }: { chapters: LessonChapter[] }) {
	return (
		<section aria-labelledby="chapters-heading">
			<h2
				className="font-mono text-eyebrow text-muted-foreground uppercase"
				id="chapters-heading"
			>
				Chapters
			</h2>
			<ul className="mt-4 space-y-3">
				{chapters.map((chapter) => (
					<li
						className="flex gap-4 text-sm"
						key={`${chapter.at}-${chapter.label}`}
					>
						<span className="shrink-0 font-mono text-muted-foreground text-xs tabular-nums">
							{chapter.at}
						</span>
						<span className="text-foreground">{chapter.label}</span>
					</li>
				))}
			</ul>
		</section>
	);
}
