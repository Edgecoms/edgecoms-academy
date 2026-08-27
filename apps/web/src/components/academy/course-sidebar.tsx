import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@edgecoms-academy/ui/components/sidebar";
import { Check, ChevronDown, Home, ListVideo } from "lucide-react";
import Link from "next/link";

import type { Course } from "@/content/types";
import { CourseProgressMeter } from "./course-progress-meter";
import { lessonIcon } from "./lesson-icon";

interface CourseSidebarProps {
	/** Omitted on the public overview, where there is no session to read. */
	completed?: Set<string>;
	course: Course;
	currentLessonSlug?: string;
	progress?: { completedCount: number; percent: number; totalCount: number };
}

export function CourseSidebar({
	course,
	currentLessonSlug,
	completed,
	progress,
}: CourseSidebarProps) {
	return (
		<Sidebar>
			{/* h-16 must stay in step with LearnTopBar so both bottom borders align */}
			<SidebarHeader className="h-16 shrink-0 flex-row items-center gap-2 border-sidebar-border border-b px-4 py-0">
				<Link
					className="font-medium text-sm tracking-tight transition-opacity hover:opacity-70"
					href="/academy"
				>
					Edgecoms Academy
				</Link>
			</SidebarHeader>

			<SidebarContent className="gap-0 px-1 py-2">
				{course.modules.map((module) => (
					<SidebarGroup className="py-1" key={module.slug}>
						{/* <details> gives the disclosure for free; no state, no client boundary.
						    `open` is just the initial state — collapsing still works. */}
						<details className="group/module" open>
							<SidebarGroupLabel
								className="cursor-pointer list-none gap-2 text-sidebar-foreground [&::-webkit-details-marker]:hidden"
								render={<summary />}
							>
								<span className="truncate font-medium">{module.title}</span>
								<ChevronDown className="ml-auto size-3.5 -rotate-90 text-muted-foreground transition-transform group-open/module:rotate-0" />
							</SidebarGroupLabel>

							<SidebarGroupContent className="mt-1">
								<SidebarMenu>
									{module.lessons.map((lesson) => {
										const isCurrent = lesson.slug === currentLessonSlug;
										const isComplete = completed?.has(lesson.slug) ?? false;
										// same glyph the lesson's card uses, so the two views match
										const Icon = lessonIcon(lesson.slug);

										return (
											<SidebarMenuItem key={lesson.slug}>
												<SidebarMenuButton
													isActive={isCurrent}
													render={
														<Link
															href={`/academy/courses/${course.slug}/${lesson.slug}`}
														/>
													}
													{...(isCurrent ? { "aria-current": "page" } : {})}
												>
													{isComplete ? (
														<Check />
													) : (
														<Icon
															className={
																isCurrent ? undefined : "text-muted-foreground"
															}
														/>
													)}
													<span
														className={
															isCurrent ? undefined : "text-muted-foreground"
														}
													>
														{lesson.title}
													</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</details>
					</SidebarGroup>
				))}
			</SidebarContent>

			<SidebarFooter className="border-sidebar-border border-t px-1 py-2">
				{progress ? (
					<div className="px-3 pt-2 pb-1">
						<CourseProgressMeter
							completedCount={progress.completedCount}
							percent={progress.percent}
							totalCount={progress.totalCount}
						/>
					</div>
				) : null}
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							isActive={!currentLessonSlug}
							render={<Link href={`/academy/courses/${course.slug}`} />}
						>
							<ListVideo />
							<span className="text-muted-foreground">Course overview</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton render={<Link href="/academy" />}>
							<Home />
							<span className="text-muted-foreground">Academy home</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
