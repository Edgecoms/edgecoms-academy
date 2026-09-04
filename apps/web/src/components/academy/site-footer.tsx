import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { TrackedCalendlyLink } from "@/components/tracked-calendly-link";

export function SiteFooter() {
	return (
		<footer className="mt-auto border-border/80 border-t bg-card/60 text-card-foreground backdrop-blur-md transition-colors">
			{/* Main Footer Content */}
			<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
					{/* Brand Column */}
					<div className="flex flex-col gap-4 md:col-span-4">
						<Link
							className="group inline-flex w-fit items-center transition-transform hover:scale-[1.02]"
							href="/academy"
						>
							<div className="relative flex flex-col items-start border-2 border-foreground px-2.5 py-1 font-black font-mono text-foreground uppercase leading-none tracking-tighter">
								<span className="font-extrabold text-[10px] leading-tight tracking-widest">
									EDGECOMS
								</span>
								<span className="font-black text-xs leading-tight tracking-wider">
									ACADEMY
								</span>
							</div>
						</Link>

						<p className="max-w-sm text-muted-foreground text-xs leading-relaxed sm:text-sm">
							Practical, battle-tested ecommerce education and operating
							frameworks. Learn to validate products, build high-converting
							Shopify stores, and scale Meta Ads profitably.
						</p>

						<div className="mt-1 flex items-center gap-2 font-medium text-muted-foreground text-xs">
							<span className="inline-flex size-2 animate-pulse rounded-full bg-emerald-500" />
							<span>100% Free · No Credit Card Required</span>
						</div>
					</div>

					{/* Navigation Links Column */}
					<div className="flex flex-col gap-3 md:col-span-3">
						<p className="font-mono font-semibold text-foreground text-xs uppercase tracking-wider">
							Curriculum
						</p>
						<ul className="flex flex-col gap-2.5 text-muted-foreground text-xs sm:text-sm">
							<li>
								<Link
									className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
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
						<p className="font-mono font-semibold text-foreground text-xs uppercase tracking-wider">
							Programs &amp; Platform
						</p>
						<ul className="flex flex-col gap-2.5 text-muted-foreground text-xs sm:text-sm">
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
						<p className="font-mono font-semibold text-foreground text-xs uppercase tracking-wider">
							Core Directives
						</p>
						<ul className="flex flex-col gap-2 text-muted-foreground text-xs">
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
				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-border/60 border-t pt-8 text-muted-foreground text-xs sm:flex-row">
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
