import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Course } from "@/content/types";

interface CourseNavigationProps {
	completed: Set<string>;
	course: Course;
	currentLessonSlug: string;
}

export function CourseNavigation({
	course,
	currentLessonSlug,
	completed,
}: CourseNavigationProps) {
	return (
		<nav aria-label="Course lessons" className="flex flex-col gap-6">
			{course.modules.map((module) => {
				const isCurrentModule = module.lessons.some(
					(lesson) => lesson.slug === currentLessonSlug
				);

				return (
					<details
						className="group/module"
						key={module.slug}
						open={isCurrentModule || undefined}
					>
						<summary className="flex cursor-pointer list-none items-center gap-2 py-1 text-sm">
							<ChevronRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-open/module:rotate-90" />
							<span className="font-mono text-muted-foreground text-xs tabular-nums">
								{module.number}
							</span>
							<span className="font-medium tracking-tight">{module.title}</span>
							<span className="ml-auto font-mono text-[0.6875rem] text-muted-foreground tabular-nums">
								{
									module.lessons.filter((lesson) => completed.has(lesson.slug))
										.length
								}
								/{module.lessons.length}
							</span>
						</summary>

						<ul className="mt-1 ml-[0.65rem] border-border border-l pl-3">
							{module.lessons.map((lesson) => {
								const isCurrent = lesson.slug === currentLessonSlug;
								const isComplete = completed.has(lesson.slug);
								return (
									<li key={lesson.slug}>
										<Link
											aria-current={isCurrent ? "page" : undefined}
											className={`flex items-center gap-2 py-1.5 text-sm transition-colors ${
												isCurrent
													? "font-medium text-foreground"
													: "text-muted-foreground hover:text-foreground"
											}`}
											href={`/academy/courses/${course.slug}/${lesson.slug}`}
										>
											<span
												aria-hidden="true"
												className="flex size-3 shrink-0 items-center justify-center"
											>
												{isComplete ? (
													<Check className="size-3 text-foreground" />
												) : (
													<span
														className={`size-1.5 rounded-full ${
															isCurrent ? "bg-foreground" : "bg-transparent"
														}`}
													/>
												)}
											</span>
											<span
												className={
													isComplete && !isCurrent
														? "text-muted-foreground"
														: ""
												}
											>
												{lesson.title}
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</details>
				);
			})}
		</nav>
	);
}
