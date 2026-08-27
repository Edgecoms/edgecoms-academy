import { notFound } from "next/navigation";

import { LearnShell } from "@/components/academy/learn-shell";
import { UserMenu } from "@/components/academy/user-menu";
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

	return (
		<LearnShell
			// the session is already resolved here, so no client round trip
			action={
				<UserMenu email={session.user.email} name={session.user.name ?? ""} />
			}
			completed={progress.completed}
			course={course}
			currentLessonSlug={lessonSlug}
			progress={progress}
			trail={[course.title, location.module.title, location.lesson.title]}
		>
			{children}
		</LearnShell>
	);
}
