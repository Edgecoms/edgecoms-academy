"use client";

import { cn } from "@edgecoms-academy/ui/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface FAQItem {
	question: string;
	answer: string;
}

const FAQS: FAQItem[] = [
	{
		answer:
			"Edgecoms Academy is a free, practical ecommerce education platform created by active operators who build and scale Shopify brands. We teach you step-by-step how to find products worth selling, build a high-converting store, and run profitable Meta Ads without fluff or generic theory.",
		question: "What Is Edgecoms Academy?",
	},
	{
		answer:
			"Edgecoms Academy is built for ambitious founders starting their first ecommerce business who want an unbroken, chronological roadmap—as well as existing brand owners who are stuck and want to diagnose why their store isn't converting or their ads aren't scaling.",
		question: "Who Are We For?",
	},
	{
		answer:
			"Most students complete the 3 core modules within 1 to 2 weeks of dedicated study and implementation. Because the model allows you to validate demand with zero upfront inventory risk, you can have your store live and running your first Meta Ad campaign within days.",
		question: "How Long Will It Take to See Results?",
	},
	{
		answer:
			"Yes. In addition to the comprehensive video lessons, SOPs, and financial templates, you can book free 1-on-1 store audits with our senior operators and access our member resources.",
		question: "Will I Have Direct Access to the Mentors?",
	},
	{
		answer:
			"Most 'gurus' charge $2,000 to $10,000 for recycled courses or use free content as a teaser funnel. Edgecoms Academy gives away the complete, unbroken operating playbook for free—the exact systems we execute for our 7-figure agency clients—with zero upsells or hidden paywalls.",
		question: "What Makes Edgecoms Academy Different from Other Coaching Programs?",
	},
	{
		answer:
			"Edgecoms operates as an active ecommerce agency managing 7 and 8-figure brands. The academy is our way of giving back, elevating industry standards, and building long-term relationships with top founders who may collaborate with us as their stores scale.",
		question: "How Is Edgecoms Academy Completely Free?",
	},
];

export function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section
			className="relative overflow-hidden border-border/60 border-t bg-background py-20 sm:py-28 lg:py-32"
			id="faq"
		>
			<div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
				{/* Section Title */}
				<div className="text-center mb-12 sm:mb-16">
					<h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 dark:from-purple-300 dark:via-purple-200 dark:to-indigo-300 bg-clip-text text-transparent">
						Frequently Asked Questions
					</h2>
					<p className="mt-3 text-muted-foreground text-sm sm:text-base">
						Everything you need to know about the course and mentorship.
					</p>
				</div>

				{/* Accordion List */}
				<div className="divide-y divide-border/60 border-y border-border/60">
					{FAQS.map((faq, index) => {
						const isOpen = openIndex === index;
						return (
							<div className="py-5 sm:py-6 transition-colors" key={faq.question}>
								<button
									aria-expanded={isOpen}
									className="flex w-full items-center justify-between gap-4 text-left font-semibold text-base sm:text-lg text-foreground hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer group"
									onClick={() => toggle(index)}
									type="button"
								>
									<span className={cn(isOpen && "text-purple-600 dark:text-purple-300 font-bold")}>
										{faq.question}
									</span>
									<span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border/80 text-muted-foreground group-hover:border-purple-500/50 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
										{isOpen ? (
											<Minus className="size-4" />
										) : (
											<Plus className="size-4" />
										)}
									</span>
								</button>
								{isOpen && (
									<div className="mt-4 pr-10 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in-50 duration-200">
										<p>{faq.answer}</p>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
