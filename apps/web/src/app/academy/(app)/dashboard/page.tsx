import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/academy/app-header";
import { CourseProgressMeter } from "@/components/academy/course-progress-meter";
import { getCourse } from "@/content";
import { getCourseProgress, getResumeTarget } from "@/lib/progress";
import { requireSession } from "@/lib/session";

const COURSE_SLUG = "shopify-ecommerce";

export const metadata: Metadata = {
	robots: { follow: false, index: false },
	title: "Dashboard",
};

export default async function DashboardPage() {
	const session = await requireSession();
	const course = getCourse(COURSE_SLUG);

	if (!course) {
		notFound();
	}

	const progress = await getCourseProgress(COURSE_SLUG);
	const resume = await getResumeTarget(COURSE_SLUG);
	const started = progress.completedCount > 0 || progress.started.size > 0;

	return (
		<div className="flex min-h-svh flex-col">
			<AppHeader
				user={{ email: session.user.email, name: session.user.name }}
			/>

			<main className="mx-auto w-full max-w-4xl flex-1 px-6 py-14">
				<h1 className="text-title">
					Welcome back{session.user.name ? `, ${session.user.name}` : ""}.
				</h1>

				<section className="mt-10 border border-border p-6 sm:p-8">
					<p className="font-mono text-eyebrow text-muted-foreground uppercase">
						{started ? "Continue learning" : "Start here"}
					</p>
					<h2 className="mt-3 font-medium text-lg tracking-tight">
						{course.title}
					</h2>

					{started ? (
						<div className="mt-4 max-w-sm">
							<CourseProgressMeter
								completedCount={progress.completedCount}
								percent={progress.percent}
								totalCount={progress.totalCount}
							/>
						</div>
					) : (
						<p className="mt-2 max-w-lg text-muted-foreground text-sm leading-relaxed">
							{course.tagline}
						</p>
					)}

					{resume ? (
						<Link
							className="mt-6 inline-flex h-10 items-center bg-primary px-5 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-85"
							href={`/academy/courses/${course.slug}/${resume.lesson.slug}`}
						>
							{started ? "Continue" : "Start"} with {resume.lesson.title}
						</Link>
					) : (
						<p className="mt-6 font-medium text-sm">
							You have finished every lesson in this course.
						</p>
					)}
				</section>

				<section className="mt-12">
					<h2 className="font-mono text-eyebrow text-muted-foreground uppercase">
						Modules
					</h2>
					<div className="mt-4 border-border border-t">
						{course.modules.map((module) => (
							<article
								className="grid gap-x-8 gap-y-2 border-border border-b py-6 sm:grid-cols-[3rem_1fr_auto]"
								key={module.slug}
							>
								<p className="font-mono text-muted-foreground text-sm tabular-nums">
									{module.number}
								</p>
								<div className="max-w-lg">
									<h3 className="font-medium text-sm tracking-tight">
										{module.title}
									</h3>
									<p className="mt-1 text-muted-foreground text-sm leading-relaxed">
										{module.blurb}
									</p>
								</div>
								<p className="font-mono text-muted-foreground text-xs tabular-nums sm:text-right">
									{
										module.lessons.filter((lesson) =>
											progress.completed.has(lesson.slug)
										).length
									}
									/{module.lessons.length}
								</p>
							</article>
						))}
					</div>
					<p className="mt-4 font-mono text-muted-foreground text-xs tabular-nums">
						{progress.completedCount}/{progress.totalCount} lessons completed
					</p>
				</section>
			</main>
		</div>
	);
}
