import {
	SidebarInset,
	SidebarProvider,
} from "@edgecoms-academy/ui/components/sidebar";

import type { Course } from "@/content/types";
import { CourseSidebar } from "./course-sidebar";
import { LearnTopBar } from "./learn-top-bar";
import { LearnTrail } from "./learn-trail";

interface LearnShellProps {
	/** Top-right control: the client `AuthAction`, or a server-known user menu. */
	action: React.ReactNode;
	children: React.ReactNode;
	completed?: Set<string>;
	course: Course;
	currentLessonSlug?: string;
	progress?: { completedCount: number; percent: number; totalCount: number };
	trail: string[];
}

const SIDEBAR_WIDTH = "17rem";

export function LearnShell({
	action,
	children,
	completed,
	course,
	currentLessonSlug,
	progress,
	trail,
}: LearnShellProps) {
	return (
		<SidebarProvider
			style={{ "--sidebar-width": SIDEBAR_WIDTH } as React.CSSProperties}
		>
			<CourseSidebar
				completed={completed}
				course={course}
				currentLessonSlug={currentLessonSlug}
				progress={progress}
			/>
			<SidebarInset>
				<LearnTopBar action={action} trail={<LearnTrail segments={trail} />} />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
