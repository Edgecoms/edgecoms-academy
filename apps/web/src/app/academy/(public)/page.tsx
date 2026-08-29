import { buttonVariants } from "@edgecoms-academy/ui/components/button";
import { cn } from "@edgecoms-academy/ui/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCourse, getCourseTotals } from "@/content";

const COURSE_SLUG = "shopify-ecommerce";

/** Reference price for the closing panel. Must be a figure Edgecoms has
 * actually charged for this process, not an invented anchor. */
const LIST_PRICE = "$999";

const AUDIT_URL = "https://calendly.com/anurag-edgecoms/book-a-free-call";

export const metadata: Metadata = {
	alternates: { canonical: "/academy" },
	description:
		"Free, practical ecommerce education covering how to find products worth selling, build a Shopify store, and run Meta Ads. No payment, no credit card.",
	title: "Build your Shopify business from zero",
};

/** The money flow from lesson 01, which is the whole model in four numbers. */
const CASH_FLOW = [
	{ label: "Customer pays you", value: "$50" },
	{ label: "You pay the supplier", value: "$15" },
	{ label: "Stays with you", value: "$35" },
	{ label: "Units you own", value: "0" },
];

/** The comparison from lesson 02. Dropshipping is the row the course argues for. */
const MODELS = [
	{
		capital: "Low",
		margin: "Thin",
		name: "Marketplaces",
		note: "Amazon, Flipkart, Etsy, eBay",
		owner: "The platform",
		risk: "Rules change, or you are banned and the business disappears",
	},
	{
		capital: "High",
		margin: "Medium",
		name: "Wholesale & retail",
		note: null,
		owner: "You",
		risk: "Capital tied up in stock, plus storage",
	},
	{
		capital: "High",
		margin: "Best",
		name: "Private label brand",
		note: null,
		owner: "You",
		risk: "One large upfront guess, paid before any feedback",
	},
	{
		capital: "Low",
		margin: "Varies",
		name: "Print on demand",
		note: "Digital, subscriptions",
		owner: "You",
		risk: "Hard to look different from everyone else",
	},
	{
		capital: "Lowest",
		margin: "Thinnest",
		name: "Dropshipping",
		note: "What this course teaches",
		owner: "You",
		risk: "Supplier quality and shipping speed",
	},
];

const MODULE_OUTCOMES: Record<string, string> = {
	"build-shopify-store":
		"A live store with products, a theme, policies, conversion apps and tracking connected.",
	"foundations-and-products":
		"A niche, a product you have actually checked, a Shopify account and a registered business.",
	"run-meta-ads":
		"A published campaign, and the ability to read whether it is working.",
};

const AUDIENCE = {
	no: [
		"Anyone who wants a guaranteed number by a guaranteed date. Nobody can give you that.",
		"Anyone who wants to skip to ads without a product or a store behind them.",
		"Anyone looking for a tool that does the work while they watch.",
	],
	yes: [
		"You have not started, and you want the whole path in one place rather than forty tabs.",
		"You have a store that is not converting, and you want to see what you skipped.",
		"You would rather be told what quietly kills new stores than sold a dream.",
	],
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

function Eyebrow({ children }: { children: React.ReactNode }) {
	return (
		<p className="font-mono text-eyebrow text-muted-foreground uppercase">
			{children}
		</p>
	);
}

export default function AcademyPage() {
	const course = getCourse(COURSE_SLUG);
	const totals = getCourseTotals(COURSE_SLUG);

	if (!course) {
		notFound();
	}

	let lessonNumber = 0;

	return (
		<main className="flex-1">
			{/* Hero */}
			<section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
				<div className="rise" style={{ animationDelay: "0ms" }}>
					<Eyebrow>Free ecommerce education</Eyebrow>
				</div>
				<h1
					className="rise mt-6 max-w-3xl text-display sm:text-[3.25rem]"
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
					{totals.modules} modules, in the order you actually need them.
				</p>
				<div
					className="rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
					style={{ animationDelay: "180ms" }}
				>
					<Link
						className={buttonVariants({ size: "lg" })}
						href="/academy/access"
					>
						Start learning
					</Link>
					<a
						className={cn(
							buttonVariants({ size: "lg", variant: "outline" }),
							"hidden sm:inline-flex"
						)}
						href={AUDIT_URL}
						rel="noopener"
						target="_blank"
					>
						Book a free store audit
					</a>
					<span className="font-mono text-muted-foreground text-xs">
						No payment. No credit card.
					</span>
				</div>
			</section>

			{/* The model, taught rather than promised */}
			<section className="border-border border-t bg-muted/30">
				<div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
					<Eyebrow>Lesson 01 / the model</Eyebrow>
					<h2 className="mt-6 max-w-2xl text-title">Sell first. Buy second.</h2>
					<p className="mt-5 max-w-2xl text-muted-foreground text-prose">
						Every other retail model buys inventory and then hopes. Dropshipping
						reverses the order: the customer pays you first, you pay the
						supplier second, and the supplier ships direct. That reversal is the
						entire business.
					</p>

					<dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
						{CASH_FLOW.map((step) => (
							<div className="bg-background p-5 sm:p-6" key={step.label}>
								<dt className="font-mono text-eyebrow text-muted-foreground uppercase">
									{step.label}
								</dt>
								<dd className="mt-3 font-medium text-3xl tabular-nums tracking-tight">
									{step.value}
								</dd>
							</div>
						))}
					</dl>

					<p className="mt-8 max-w-2xl border-border border-l-2 pl-5 font-medium text-sm italic leading-relaxed">
						The reversal is not convenience, it is a risk transfer. Inventory
						risk that would sit on your balance sheet sits on the supplier's
						instead. You do not get that for free, you pay for it in margin.
					</p>
				</div>
			</section>

			{/* The map */}
			<section className="border-border border-t">
				<div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
					<Eyebrow>Lesson 02 / the map</Eyebrow>
					<h2 className="mt-6 max-w-2xl text-title">
						One industry. Five ways to play it.
					</h2>
					<p className="mt-5 max-w-2xl text-muted-foreground text-prose">
						Dropshipping is not the alternative to ecommerce. It is one method
						sitting inside it, alongside four others. The course compares them
						on the things that decide whether you can start at all.
					</p>

					<div className="-mx-6 mt-10 overflow-x-auto px-6">
						<table className="w-full min-w-[46rem] border-collapse text-left text-sm">
							<thead>
								<tr className="border-border border-b">
									{[
										"Model",
										"Capital",
										"Margin",
										"Owns the customer",
										"Main risk",
									].map((heading) => (
										<th
											className="py-3 pr-6 font-mono text-eyebrow text-muted-foreground uppercase"
											key={heading}
											scope="col"
										>
											{heading}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{MODELS.map((model) => {
									const isCourse = model.name === "Dropshipping";
									return (
										<tr
											className={cn(
												"border-border border-b align-top",
												isCourse && "bg-muted/60"
											)}
											key={model.name}
										>
											<th
												className="py-4 pr-6 font-medium text-foreground"
												scope="row"
											>
												{model.name}
												{model.note ? (
													<span className="mt-0.5 block font-normal text-muted-foreground text-xs">
														{model.note}
													</span>
												) : null}
											</th>
											<td className="py-4 pr-6 text-muted-foreground">
												{model.capital}
											</td>
											<td className="py-4 pr-6 text-muted-foreground">
												{model.margin}
											</td>
											<td className="py-4 pr-6 text-muted-foreground">
												{model.owner}
											</td>
											<td className="py-4 pr-6 text-muted-foreground">
												{model.risk}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					<p className="mt-8 max-w-2xl border-border border-l-2 pl-5 font-medium text-sm italic leading-relaxed">
						Dropshipping is the only row that is lowest on capital and still
						owns the customer. That combination is the entire reason it is the
						entry point.
					</p>
				</div>
			</section>

			{/* Modules */}
			<section className="border-border border-t bg-muted/30">
				<div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
					<Eyebrow>What you build</Eyebrow>
					<h2 className="mt-6 max-w-2xl text-title">
						Three modules, in the order that works.
					</h2>

					<div className="mt-12 flex flex-col">
						{course.modules.map((module) => (
							<article
								className="grid gap-x-10 gap-y-4 border-border border-t py-10 sm:grid-cols-[3rem_1fr_16rem] sm:py-12"
								key={module.slug}
							>
								<p className="font-mono text-2xl text-muted-foreground tabular-nums">
									{module.number}
								</p>
								<div className="max-w-lg">
									<h3 className="font-medium text-lg tracking-tight">
										{module.title}
									</h3>
									<p className="mt-2 text-muted-foreground text-sm leading-relaxed">
										{module.blurb}
									</p>
									<p className="mt-3 font-mono text-muted-foreground text-xs">
										{module.lessons.length} lessons
									</p>
								</div>
								<div className="border-border border-l pl-5 sm:pl-6">
									<p className="font-mono text-eyebrow text-muted-foreground uppercase">
										You finish with
									</p>
									<p className="mt-2 text-sm leading-relaxed">
										{MODULE_OUTCOMES[module.slug]}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Full curriculum, in the open */}
			<section className="border-border border-t">
				<div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
					<Eyebrow>The whole thing, before you sign up</Eyebrow>
					<h2 className="mt-6 max-w-2xl text-title">
						All {totals.lessons} lessons, listed.
					</h2>
					<p className="mt-5 max-w-2xl text-muted-foreground text-prose">
						No teaser curriculum. Every lesson in the course, in order, with
						what it covers.
					</p>

					<div className="mt-12 flex flex-col gap-12">
						{course.modules.map((module) => (
							<div key={module.slug}>
								<h3 className="flex items-baseline gap-3 border-border border-b pb-3">
									<span className="font-mono text-muted-foreground text-xs tabular-nums">
										{module.number}
									</span>
									<span className="font-medium text-sm tracking-tight">
										{module.title}
									</span>
								</h3>
								<ol className="grid sm:grid-cols-2 sm:gap-x-10">
									{module.lessons.map((lesson) => {
										lessonNumber += 1;
										return (
											<li
												className="flex gap-4 border-border border-b py-4"
												key={lesson.slug}
											>
												<span className="w-6 shrink-0 font-mono text-muted-foreground text-xs tabular-nums">
													{String(lessonNumber).padStart(2, "0")}
												</span>
												<div className="min-w-0">
													<p className="font-medium text-sm">{lesson.title}</p>
													<p className="mt-1 text-muted-foreground text-sm leading-relaxed">
														{lesson.summary}
													</p>
												</div>
											</li>
										);
									})}
								</ol>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Honest qualification */}
			<section className="border-border border-t bg-muted/30">
				<div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-16 sm:grid-cols-2 sm:py-24">
					<div>
						<Eyebrow>Worth your time if</Eyebrow>
						<ul className="mt-6 flex flex-col gap-4">
							{AUDIENCE.yes.map((line) => (
								<li className="text-prose leading-relaxed" key={line}>
									{line}
								</li>
							))}
						</ul>
					</div>
					<div>
						<Eyebrow>Not for you if</Eyebrow>
						<ul className="mt-6 flex flex-col gap-4">
							{AUDIENCE.no.map((line) => (
								<li
									className="text-muted-foreground text-prose leading-relaxed"
									key={line}
								>
									{line}
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* Principles */}
			<section className="border-border border-t">
				<div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
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
				</div>
			</section>

			{/* Close */}
			<section className="border-border border-t">
				<div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
					<h2 className="max-w-3xl text-display">
						The last course you need to start in ecommerce.
					</h2>
					<p className="mt-5 max-w-xl text-muted-foreground text-prose">
						Product research, the store build, and the ads that bring customers
						to it. All {totals.lessons} lessons, in order, with nothing behind a
						paywall.
					</p>

					<dl className="mt-12 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
						<div className="bg-background p-5 sm:p-6">
							<dt className="font-mono text-eyebrow text-muted-foreground uppercase">
								What this process costs
							</dt>
							<dd className="mt-3 font-medium text-3xl text-muted-foreground tabular-nums tracking-tight line-through">
								{LIST_PRICE}
							</dd>
						</div>
						<div className="bg-background p-5 sm:p-6">
							<dt className="font-mono text-eyebrow text-muted-foreground uppercase">
								What you pay
							</dt>
							<dd className="mt-3 font-medium text-3xl tabular-nums tracking-tight">
								$0
							</dd>
						</div>
					</dl>

					<p className="mt-8 max-w-xl text-muted-foreground text-prose">
						There is no cohort, no waitlist and no start date. The only thing
						waiting costs you is the time you could have spent finding out
						whether your product sells.
					</p>

					<div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
						<Link
							className={buttonVariants({ size: "lg" })}
							href="/academy/access"
						>
							Start learning
						</Link>
						<span className="font-mono text-muted-foreground text-xs">
							No payment. No credit card.
						</span>
					</div>
				</div>
			</section>
		</main>
	);
}
