import Link from "next/link";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/academy/app-header";
import { CourseNavigation } from "@/components/academy/course-navigation";
import { CourseProgressMeter } from "@/components/academy/course-progress-meter";
import { MobileNavSheet } from "@/components/academy/mobile-nav-sheet";
import { getCourse, getLesson } from "@/content";
import { getCourseProgress } from "@/lib/progress";
import { requireSession } from "@/lib/session";

interface LayoutProps {
	children: React.ReactNode;
	params: Promise<{ courseSlug: string; lessonSlug: string }>;
}

export default async function LessonLayout({ children, params }: LayoutProps) {
	const session = await requireSession();
	const { courseSlug, lessonSlug } = await params;
	const course = getCourse(courseSlug);
	const location = getLesson(courseSlug, lessonSlug);

	if (!(course && location)) {
		notFound();
	}

	const progress = await getCourseProgress(courseSlug);
	const navigation = (
		<CourseNavigation
			completed={progress.completed}
			course={course}
			currentLessonSlug={lessonSlug}
		/>
	);

	const breadcrumb = (
		<p className="truncate font-mono text-eyebrow uppercase">
			<span className="text-muted-foreground">{location.module.title}</span>
			<span className="text-muted-foreground/50"> / </span>
			<span className="text-foreground">{location.lesson.title}</span>
		</p>
	);

	return (
		<div className="lg:grid lg:grid-cols-[17rem_1fr]">
			<aside className="hidden border-border border-r lg:block">
				<div className="sticky top-0 flex h-svh flex-col">
					<div className="border-border border-b px-5 py-4">
						<Link
							className="font-medium text-sm tracking-tight transition-opacity hover:opacity-70"
							href="/academy/dashboard"
						>
							Edgecoms Academy
						</Link>
						<p className="mt-3 mb-3 text-muted-foreground text-xs">
							{course.title}
						</p>
						<CourseProgressMeter
							completedCount={progress.completedCount}
							percent={progress.percent}
							totalCount={progress.totalCount}
						/>
					</div>
					<div className="flex-1 overflow-y-auto px-5 py-5">{navigation}</div>
				</div>
			</aside>

			<div className="flex min-h-svh flex-col">
				<AppHeader
					breadcrumb={breadcrumb}
					nav={
						<MobileNavSheet courseTitle={course.title}>
							{navigation}
						</MobileNavSheet>
					}
					user={{ email: session.user.email, name: session.user.name }}
				/>
				{children}
			</div>
		</div>
	);
}
