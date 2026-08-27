import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompleteLessonButton } from "@/components/academy/complete-lesson-button";
import { LessonChapters } from "@/components/academy/lesson-chapters";
import { LessonPagination } from "@/components/academy/lesson-pagination";
import { LessonPlayer } from "@/components/academy/lesson-player";
import { MarkStartedOnMount } from "@/components/academy/mark-started-on-mount";
import { ResourceList } from "@/components/academy/resource-list";
import { getLesson, getLessonNeighbours } from "@/content";
import { getCourseProgress } from "@/lib/progress";

interface PageProps {
	params: Promise<{ courseSlug: string; lessonSlug: string }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { courseSlug, lessonSlug } = await params;
	const location = getLesson(courseSlug, lessonSlug);

	return {
		description: location?.lesson.summary,
		robots: { follow: false, index: false },
		title: location?.lesson.title ?? "Lesson",
	};
}

export default async function LessonPage({ params }: PageProps) {
	const { courseSlug, lessonSlug } = await params;
	const location = getLesson(courseSlug, lessonSlug);

	if (!location) {
		notFound();
	}

	const { lesson, module } = location;
	const { previous, next } = getLessonNeighbours(courseSlug, lessonSlug);
	const progress = await getCourseProgress(courseSlug);
	const hasAside = Boolean(lesson.chapters?.length);

	return (
		<div className="mx-auto w-full max-w-4xl px-6 py-10 sm:py-14">
			{lesson.video ? (
				<>
					{/* the header breadcrumb carries the title; the heading stays for a11y */}
					<h1 className="sr-only">{lesson.title}</h1>
					<LessonPlayer
						courseSlug={courseSlug}
						lessonSlug={lessonSlug}
						title={lesson.title}
						video={lesson.video}
					/>
				</>
			) : (
				<>
					<p className="font-mono text-eyebrow text-muted-foreground uppercase">
						{module.number} / {module.title}
					</p>
					<h1 className="mt-4 max-w-2xl text-title">{lesson.title}</h1>
					<MarkStartedOnMount courseSlug={courseSlug} lessonSlug={lessonSlug} />
				</>
			)}

			<div
				className={
					hasAside
						? "mt-10 grid gap-10 lg:grid-cols-[1fr_14rem] lg:gap-14"
						: "mt-10 max-w-2xl"
				}
			>
				<div className="flex flex-col gap-10">
					<div className="flex flex-col gap-4">
						<p className="text-prose">{lesson.summary}</p>
						{lesson.body?.map((paragraph) => (
							<p className="text-muted-foreground text-prose" key={paragraph}>
								{paragraph}
							</p>
						))}
					</div>

					{lesson.takeaways?.length ? (
						<section aria-labelledby="takeaways-heading">
							<h2
								className="font-medium text-sm tracking-tight"
								id="takeaways-heading"
							>
								Key takeaways
							</h2>
							<ul className="mt-4 flex flex-col gap-3">
								{lesson.takeaways.map((takeaway) => (
									<li
										className="flex gap-3 text-sm leading-relaxed"
										key={takeaway}
									>
										<span
											aria-hidden="true"
											className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground"
										/>
										<span className="text-muted-foreground">{takeaway}</span>
									</li>
								))}
							</ul>
						</section>
					) : null}

					{lesson.resources?.length ? (
						<ResourceList resources={lesson.resources} />
					) : null}
				</div>

				{lesson.chapters?.length ? (
					<aside className="lg:pt-1">
						<LessonChapters chapters={lesson.chapters} />
					</aside>
				) : null}
			</div>

			<div className="mt-12 border-border border-t pt-8">
				<CompleteLessonButton
					completed={progress.completed.has(lessonSlug)}
					courseSlug={courseSlug}
					lessonSlug={lessonSlug}
				/>
			</div>

			<div className="mt-10">
				<LessonPagination
					courseSlug={courseSlug}
					lessonSlug={lessonSlug}
					next={next}
					previous={previous}
				/>
			</div>
		</div>
	);
}
