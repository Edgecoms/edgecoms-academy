import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCourse, getCourseTotals } from "@/content";

const COURSE_SLUG = "shopify-ecommerce";

export const metadata: Metadata = {
	alternates: { canonical: "/academy" },
	description:
		"Free, practical ecommerce education covering how to find products worth selling, build a Shopify store, and run Meta Ads. No payment, no credit card.",
	title: "Build your Shopify business from zero",
};

const PRINCIPLES = [
	{
		body: "Every lesson is free. There is no paid tier, no upsell at lesson nine, and nothing held back for a premium version that does not exist.",
		title: "Free, and not a funnel",
	},
	{
		body: "Edgecoms runs Shopify stores for a living. This is the process we actually use, not theory assembled from other people's courses.",
		title: "Built from client work",
	},
	{
		body: "Three modules in the order you need them: find a product worth selling, build the store, then buy traffic. Skipping ahead is how stores fail.",
		title: "Ordered, not a playlist",
	},
];

export default function AcademyPage() {
	const course = getCourse(COURSE_SLUG);
	const totals = getCourseTotals(COURSE_SLUG);

	if (!course) {
		notFound();
	}

	return (
		<main className="flex-1">
			<section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
				<p
					className="rise font-mono text-eyebrow text-muted-foreground uppercase"
					style={{ animationDelay: "0ms" }}
				>
					Free ecommerce education
				</p>
				<h1
					className="rise mt-6 max-w-3xl text-display"
					style={{ animationDelay: "60ms" }}
				>
					Build your Shopify business from zero.
				</h1>
				<p
					className="rise mt-6 max-w-xl text-muted-foreground text-prose"
					style={{ animationDelay: "120ms" }}
				>
					Find products worth selling, build a store that converts, and run Meta
					Ads that acquire customers. {totals.lessons} lessons across{" "}
					{totals.modules} modules, start to finish.
				</p>
				<div
					className="rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
					style={{ animationDelay: "180ms" }}
				>
					<Link
						className="inline-flex h-10 items-center bg-primary px-5 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-85"
						href="/academy/access"
					>
						Start learning
					</Link>
					<span className="font-mono text-muted-foreground text-xs">
						No payment. No credit card.
					</span>
				</div>
			</section>

			<section className="border-border border-t">
				<div className="mx-auto w-full max-w-5xl px-6">
					<h2 className="sr-only">Modules</h2>
					{course.modules.map((module) => (
						<article
							className="grid gap-x-10 gap-y-3 border-border border-b py-10 sm:grid-cols-[4rem_1fr_auto] sm:py-12"
							key={module.slug}
						>
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
							<p className="font-mono text-muted-foreground text-xs sm:text-right">
								{module.lessons.length} lessons
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
				<div className="grid gap-10 sm:grid-cols-3 sm:gap-12">
					{PRINCIPLES.map((principle) => (
						<div key={principle.title}>
							<h3 className="font-medium text-sm tracking-tight">
								{principle.title}
							</h3>
							<p className="mt-2 text-muted-foreground text-sm leading-relaxed">
								{principle.body}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="border-border border-t">
				<div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-16 sm:flex-row sm:items-end sm:justify-between sm:py-20">
					<div className="max-w-xl">
						<h2 className="text-title">Read the whole curriculum first.</h2>
						<p className="mt-3 text-muted-foreground text-prose">
							Every lesson and what it covers, listed in full before you sign
							up.
						</p>
					</div>
					<Link
						className="inline-flex h-10 shrink-0 items-center border border-border px-5 font-medium text-sm transition-colors hover:bg-muted"
						href="/academy/courses/shopify-ecommerce"
					>
						View all {totals.lessons} lessons
					</Link>
				</div>
			</section>
		</main>
	);
}
