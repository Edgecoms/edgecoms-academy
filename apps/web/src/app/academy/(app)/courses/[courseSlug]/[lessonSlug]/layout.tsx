import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@edgecoms-academy/ui/components/breadcrumb";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@edgecoms-academy/ui/components/sidebar";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/academy/app-header";
import { CourseSidebar } from "@/components/academy/course-sidebar";
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

	const breadcrumb = (
		<Breadcrumb className="min-w-0">
			<BreadcrumbList className="flex-nowrap gap-1.5 text-xs">
				<BreadcrumbItem className="min-w-0">
					<span className="truncate">{location.module.title}</span>
				</BreadcrumbItem>
				<BreadcrumbSeparator className="text-muted-foreground/50">
					/
				</BreadcrumbSeparator>
				<BreadcrumbItem className="min-w-0">
					<BreadcrumbPage className="truncate">
						{location.lesson.title}
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);

	return (
		<SidebarProvider
			style={{ "--sidebar-width": "17rem" } as React.CSSProperties}
		>
			<CourseSidebar
				completed={progress.completed}
				course={course}
				currentLessonSlug={lessonSlug}
				progress={progress}
			/>
			<SidebarInset>
				<AppHeader
					breadcrumb={breadcrumb}
					nav={<SidebarTrigger />}
					user={{ email: session.user.email, name: session.user.name }}
				/>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
