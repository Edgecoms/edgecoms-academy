"use client";

import { cn } from "@edgecoms-academy/ui/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface FAQItem {
	answer: string;
	question: string;
}

const FAQS: FAQItem[] = [
	{
		answer:
			"Edgecoms Academy is a free, practical ecommerce education platform created by active operators who build and scale Shopify brands. We teach you step-by-step how to find products worth selling, build a high-converting store, and run profitable Meta Ads without fluff or generic theory.",
		question: "What Is Edgecoms Academy?",
	},
	{
		answer:
			"Edgecoms Academy is built for two types of founders. First, aspiring entrepreneurs looking to start their first ecommerce store with a structured, step-by-step roadmap. Second, existing store owners who want to diagnose bottlenecks, fix low conversion rates, and scale their Meta Ads profitably.",
		question: "Who Are We For?",
	},
	{
		answer:
			"Most students complete the 3 core modules within 1 to 2 weeks of dedicated study and implementation. Because our frameworks focus on validating product demand before investing in inventory, you can have your Shopify store live and your first Meta Ads campaign running within days.",
		question: "How Long Will It Take to See Results?",
	},
	{
		answer:
			"Yes. In addition to the step-by-step lessons and frameworks, you get direct mentorship through our private Discord channel and 1-on-1 growth sessions with our founders and senior operators.",
		question: "Will I Have Direct Access to the Mentors?",
	},
	{
		answer:
			"Most traditional coaching programs charge thousands of dollars for generic courses or hide their best content behind high-ticket paywalls. Edgecoms Academy provides our complete, end-to-end operating playbook for free. These are the exact systems and frameworks we use to launch and scale 7-figure DTC brands.",
		question:
			"What Makes Edgecoms Academy Different from Other Coaching Programs?",
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
				<div className="mb-12 text-center sm:mb-16">
					<h2 className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 bg-clip-text font-extrabold text-3xl text-transparent tracking-tight sm:text-4xl md:text-5xl dark:from-purple-300 dark:via-purple-200 dark:to-indigo-300">
						Frequently Asked Questions
					</h2>
					<p className="mt-3 text-muted-foreground text-sm sm:text-base">
						Everything you need to know about the course and mentorship.
					</p>
				</div>

				{/* Accordion List */}
				<div className="divide-y divide-border/60 border-border/60 border-y">
					{FAQS.map((faq, index) => {
						const isOpen = openIndex === index;
						return (
							<div
								className="py-5 transition-colors sm:py-6"
								key={faq.question}
							>
								<button
									aria-expanded={isOpen}
									className="group flex w-full cursor-pointer items-center justify-between gap-4 text-left font-semibold text-base text-foreground transition-colors hover:text-purple-600 sm:text-lg dark:hover:text-purple-300"
									onClick={() => toggle(index)}
									type="button"
								>
									<span
										className={cn(
											isOpen && "font-bold text-purple-600 dark:text-purple-300"
										)}
									>
										{faq.question}
									</span>
									<span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors group-hover:border-purple-500/50 group-hover:text-purple-600 dark:group-hover:text-purple-300">
										{isOpen ? (
											<Minus className="size-4" />
										) : (
											<Plus className="size-4" />
										)}
									</span>
								</button>
								{isOpen && (
									<div className="fade-in-50 mt-4 animate-in pr-10 text-muted-foreground text-xs leading-relaxed duration-200 sm:text-sm">
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
