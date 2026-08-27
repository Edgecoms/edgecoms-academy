import { cn } from "@edgecoms-academy/ui/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";

import { lessonIcon } from "./lesson-icon";

interface LessonCardProps {
	completed?: boolean;
	courseSlug: string;
	slug: string;
	summary: string;
	title: string;
}

export function LessonCard({
	completed,
	courseSlug,
	slug,
	summary,
	title,
}: LessonCardProps) {
	const Icon = lessonIcon(slug);

	return (
		<Link
			className={cn(
				"group flex flex-col overflow-hidden rounded-lg border border-border bg-muted/40 transition-colors",
				"hover:border-border hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
			)}
			href={`/academy/courses/${courseSlug}/${slug}`}
		>
			<div className="relative flex h-32 items-start border-border border-b p-5">
				<Icon
					aria-hidden="true"
					className="size-5 text-muted-foreground transition-colors group-hover:text-foreground"
					strokeWidth={1.75}
				/>
				{completed ? (
					<span
						className="absolute top-5 right-5 flex size-4 items-center justify-center rounded-full bg-foreground"
						title="Completed"
					>
						<Check className="size-2.5 text-background" strokeWidth={3} />
					</span>
				) : null}
			</div>

			<div className="flex flex-1 flex-col p-5">
				<h3 className="font-medium text-sm tracking-tight">{title}</h3>
				<p className="mt-2 line-clamp-3 text-muted-foreground text-sm leading-relaxed">
					{summary}
				</p>
			</div>
		</Link>
	);
}
