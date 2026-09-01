import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { TrackedCalendlyLink } from "@/components/tracked-calendly-link";

export function SiteFooter() {
	return (
		<footer className="mt-auto border-t border-border/80 bg-card/60 backdrop-blur-md transition-colors text-card-foreground">
			{/* Main Footer Content */}
			<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
					{/* Brand Column */}
					<div className="flex flex-col gap-4 md:col-span-4">
						<Link
							className="group inline-flex items-center transition-transform hover:scale-[1.02] w-fit"
							href="/academy"
						>
							<div className="relative flex flex-col items-start border-2 border-foreground px-2.5 py-1 text-foreground font-mono font-black uppercase leading-none tracking-tighter">
								<span className="text-[10px] font-extrabold tracking-widest leading-tight">
									EDGECOMS
								</span>
								<span className="text-xs font-black tracking-wider leading-tight">
									ACADEMY
								</span>
							</div>
						</Link>

						<p className="max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
							Practical, battle-tested ecommerce education and operating
							frameworks. Learn to validate products, build high-converting
							Shopify stores, and scale Meta Ads profitably.
						</p>

						<div className="mt-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
							<span className="inline-flex size-2 rounded-full bg-emerald-500 animate-pulse" />
							<span>100% Free · No Credit Card Required</span>
						</div>
					</div>

					{/* Navigation Links Column */}
					<div className="flex flex-col gap-3 md:col-span-3">
						<p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
							Curriculum
						</p>
						<ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-muted-foreground">
							<li>
								<Link
									className="transition-colors hover:text-foreground inline-flex items-center gap-1"
									href="/academy/courses/shopify-ecommerce"
								>
									Browse All Lessons
								</Link>
							</li>
							<li>
								<Link
									className="transition-colors hover:text-foreground"
									href="/academy#the-model"
								>
									The Operating Model
								</Link>
							</li>
							<li>
								<Link
									className="transition-colors hover:text-foreground"
									href="/academy#mentors"
								>
									Mentors &amp; Operators
								</Link>
							</li>
							<li>
								<Link
									className="transition-colors hover:text-foreground"
									href="/academy#stories"
								>
									Founder Case Studies
								</Link>
							</li>
							<li>
								<Link
									className="transition-colors hover:text-foreground"
									href="/academy#faq"
								>
									Frequently Asked Questions
								</Link>
							</li>
						</ul>
					</div>

					{/* Programs & Platform Column */}
					<div className="flex flex-col gap-3 md:col-span-3">
						<p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
							Programs &amp; Platform
						</p>
						<ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-muted-foreground">
							<li>
								<Link
									className="font-medium text-foreground transition-colors hover:text-primary"
									href="/academy/access"
								>
									Apply for Instant Access →
								</Link>
							</li>
							<li>
								<TrackedCalendlyLink
									className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
									href="https://calendly.com/anurag-edgecoms/book-a-free-call"
								>
									<span>Book Free 1-on-1 Audit</span>
									<ArrowUpRight className="size-3.5 text-muted-foreground" />
								</TrackedCalendlyLink>
							</li>
							<li>
								<a
									className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
									href="https://edgecoms.app"
									rel="noopener noreferrer"
									target="_blank"
								>
									<span>Edgecoms App</span>
									<ArrowUpRight className="size-3.5 text-muted-foreground" />
								</a>
							</li>
						</ul>
					</div>

					{/* Directives & Pillars Column */}
					<div className="flex flex-col gap-3 md:col-span-2">
						<p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
							Core Directives
						</p>
						<ul className="flex flex-col gap-2 text-xs text-muted-foreground">
							<li className="flex items-center gap-1.5">
								<span className="size-1 rounded-full bg-purple-500" />
								<span>Sell First, Buy Second</span>
							</li>
							<li className="flex items-center gap-1.5">
								<span className="size-1 rounded-full bg-purple-500" />
								<span>Unit Economics First</span>
							</li>
							<li className="flex items-center gap-1.5">
								<span className="size-1 rounded-full bg-purple-500" />
								<span>Creative-Led Scale</span>
							</li>
							<li className="flex items-center gap-1.5">
								<span className="size-1 rounded-full bg-purple-500" />
								<span>Operator Mentorship</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row">
					<p>
						© {new Date().getFullYear()} Edgecoms Academy. All rights reserved.
					</p>
					<p className="flex items-center gap-1">
						Built for high-growth ecommerce founders by{" "}
						<a
							className="font-medium text-foreground underline underline-offset-4 transition-colors hover:opacity-80"
							href="https://edgecoms.app"
							rel="noopener noreferrer"
							target="_blank"
						>
							Edgecoms
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
