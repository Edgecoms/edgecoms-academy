import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AuthAction } from "@/components/academy/auth-action";
import { LearnShell } from "@/components/academy/learn-shell";
import { LessonCard } from "@/components/academy/lesson-card";
import { TrackViewContent } from "@/components/track-view-content";
import { getCourse, getCourses } from "@/content";

export const dynamicParams = false;

interface PageProps {
	params: Promise<{ courseSlug: string }>;
}

export function generateStaticParams() {
	return getCourses().map((course) => ({ courseSlug: course.slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { courseSlug } = await params;
	const course = getCourse(courseSlug);

	if (!course) {
		return {};
	}

	return {
		alternates: { canonical: `/academy/courses/${course.slug}` },
		description: course.description,
		title: course.title,
	};
}

export default async function CoursePage({ params }: PageProps) {
	const { courseSlug } = await params;
	const course = getCourse(courseSlug);

	if (!course) {
		notFound();
	}

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Course",
		description: course.description,
		hasCourseInstance: course.modules.map((module) => ({
			"@type": "CourseInstance",
			courseMode: "online",
			description: module.blurb,
			name: module.title,
		})),
		isAccessibleForFree: true,
		name: course.title,
		provider: {
			"@type": "Organization",
			name: "Edgecoms",
			url: "https://edgecoms.app",
		},
	};

	return (
		<>
			<TrackViewContent content_name={course.title} content_type="course" />
			<LearnShell
				action={<AuthAction />}
				course={course}
				trail={["Academy", course.title]}
			>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be inlined as a script payload
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
					type="application/ld+json"
				/>

				<div className="mx-auto w-full max-w-5xl flex-1 px-6 py-14 sm:px-10">
					<h1 className="max-w-3xl text-display">{course.tagline}</h1>
					<p className="mt-4 max-w-2xl text-muted-foreground text-prose">
						{course.description}
					</p>

					{course.modules.map((module) => (
						<section className="mt-14" key={module.slug}>
							<h2 className="text-title">{module.title}</h2>
							<p className="mt-2 max-w-2xl text-muted-foreground text-sm leading-relaxed">
								{module.blurb}
							</p>

							<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
								{module.lessons.map((lesson) => (
									<LessonCard
										courseSlug={course.slug}
										key={lesson.slug}
										slug={lesson.slug}
										summary={lesson.summary}
										title={lesson.title}
									/>
								))}
							</div>
						</section>
					))}
				</div>
			</LearnShell>
		</>
	);
}
