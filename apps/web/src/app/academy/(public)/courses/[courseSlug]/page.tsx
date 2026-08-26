import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCourse, getCourses, getCourseTotals } from "@/content";

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

	const totals = getCourseTotals(course.slug);
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
			url: "https://edgecoms.com",
		},
	};

	return (
		<main className="flex-1">
			<script
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be inlined as a script payload
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				type="application/ld+json"
			/>

			<section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-12 sm:pt-20">
				<nav
					aria-label="Breadcrumb"
					className="font-mono text-eyebrow uppercase"
				>
					<Link
						className="text-muted-foreground hover:text-foreground"
						href="/academy"
					>
						Academy
					</Link>
					<span className="text-muted-foreground/50"> / </span>
					<span className="text-foreground">{course.title}</span>
				</nav>

				<h1 className="mt-8 max-w-3xl text-display">{course.tagline}</h1>
				<p className="mt-6 max-w-xl text-muted-foreground text-prose">
					{course.description}
				</p>

				<dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-border border-y py-5 font-mono text-xs">
					<div className="flex gap-2">
						<dt className="text-muted-foreground">Modules</dt>
						<dd className="tabular-nums">{totals.modules}</dd>
					</div>
					<div className="flex gap-2">
						<dt className="text-muted-foreground">Lessons</dt>
						<dd className="tabular-nums">{totals.lessons}</dd>
					</div>
					<div className="flex gap-2">
						<dt className="text-muted-foreground">Price</dt>
						<dd>Free</dd>
					</div>
				</dl>

				<div className="mt-10">
					<Link
						className="inline-flex h-10 items-center bg-primary px-5 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-85"
						href="/academy/access"
					>
						Start learning
					</Link>
				</div>
			</section>

			<section className="mx-auto w-full max-w-5xl px-6 pb-24">
				<h2 className="sr-only">Curriculum</h2>

				{course.modules.map((module) => (
					<div
						className="border-border border-t pt-10 pb-4 sm:pt-12"
						key={module.slug}
					>
						<div className="grid gap-x-10 gap-y-3 sm:grid-cols-[4rem_1fr]">
							<p className="font-mono text-2xl text-muted-foreground tabular-nums">
								{module.number}
							</p>
							<div className="max-w-xl">
								<h3 className="font-medium text-lg tracking-tight">
									{module.title}
								</h3>
								<p className="mt-2 text-muted-foreground text-sm leading-relaxed">
									{module.blurb}
								</p>
							</div>
						</div>

						<ol className="mt-8 sm:ml-[4.5rem]">
							{module.lessons.map((lesson, position) => (
								<li
									className="flex gap-5 border-border border-t py-4 first:border-t-0 first:pt-0"
									key={lesson.slug}
								>
									<span className="mt-0.5 w-5 shrink-0 font-mono text-muted-foreground text-xs tabular-nums">
										{String(position + 1).padStart(2, "0")}
									</span>
									<div className="max-w-2xl">
										<h4 className="font-medium text-sm">
											<Link
												className="transition-colors hover:text-muted-foreground"
												href={`/academy/courses/${course.slug}/${lesson.slug}`}
											>
												{lesson.title}
											</Link>
										</h4>
										<p className="mt-1 text-muted-foreground text-sm leading-relaxed">
											{lesson.summary}
										</p>
									</div>
								</li>
							))}
						</ol>
					</div>
				))}
			</section>
		</main>
	);
}
