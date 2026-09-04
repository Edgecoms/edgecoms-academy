import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const PILLARS = [
	{
		text: 'We identify what\'s keeping founders "stuck" and what they need to do to fix it.',
	},
	{
		text: "We give founders the strategies and skillsets they need to accelerate growth, increase cash flow, and improve profitability.",
	},
	{
		text: "We guide founders in avoiding the costly, inevitable mistakes most make while scaling.",
	},
	{
		text: 'We teach founders how to build a "moat" and establish a brand that\'ll stand the test of time.',
	},
];

export function ValuePillarsSection() {
	return (
		<section className="relative overflow-hidden border-purple-900/40 border-t bg-gradient-to-b from-hero-bg-to via-[#260848] to-hero-bg-to py-20 text-hero-foreground sm:py-28 lg:py-32">
			{/* Ambient Radial Glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen"
			>
				<div className="size-[35rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.22)_0%,rgba(147,51,234,0.08)_50%,transparent_75%)] blur-3xl sm:size-[50rem]" />
			</div>

			<div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
					{/* Left Column: Headline, 4 Pillars Grid & Yellow CTA */}
					<div className="flex flex-col items-start lg:col-span-7">
						{/* Main Headline */}
						<h2 className="max-w-xl font-extrabold text-3xl text-white leading-[1.16] tracking-tight sm:text-4xl md:text-5xl">
							We Help Founders Unlock their Brand&apos;s{" "}
							<span className="relative underline decoration-from-font decoration-purple-400 decoration-wavy">
								True Potential
							</span>
						</h2>

						{/* 2x2 Pillars Grid */}
						<div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							{PILLARS.map((pillar, idx) => (
								<div
									className="border-purple-400/50 border-l-2 py-1 pl-4"
									key={idx}
								>
									<p className="font-medium text-purple-100/90 text-xs leading-relaxed sm:text-sm">
										{pillar.text}
									</p>
								</div>
							))}
						</div>

						{/* Yellow Action CTA */}
						<div className="mt-10">
							<Link
								className="group inline-flex items-center gap-2.5 rounded-xl bg-hero-cta-bg px-8 py-3.5 font-bold text-hero-cta-fg text-sm shadow-xl shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:bg-hero-cta-hover active:scale-[0.99] sm:text-base"
								href="/academy/access"
							>
								<span>Apply Now</span>
								<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</div>
					</div>

					{/* Right Column: Testimonial Card (Sam - Ecoy) */}
					<div className="flex justify-center lg:col-span-5 lg:justify-end">
						<div className="relative w-full max-w-md rounded-3xl border border-purple-700/40 bg-gradient-to-b from-[#2c0d54]/95 to-[#190432]/95 p-7 shadow-2xl backdrop-blur-md transition-all hover:border-purple-500/50 sm:p-9">
							{/* 5 Stars */}
							<div className="mb-4 flex items-center gap-1 text-amber-400">
								<Star className="size-4 fill-amber-400 text-amber-400" />
								<Star className="size-4 fill-amber-400 text-amber-400" />
								<Star className="size-4 fill-amber-400 text-amber-400" />
								<Star className="size-4 fill-amber-400 text-amber-400" />
								<Star className="size-4 fill-amber-400 text-amber-400" />
							</div>

							{/* Testimonial Quote */}
							<blockquote className="font-medium text-purple-100 text-xs italic leading-relaxed sm:text-sm">
								&ldquo;Edgecoms Academy has been instrumental in our{" "}
								<strong className="font-bold text-white not-italic">
									162% growth year to date
								</strong>
								. We&apos;ve collaboratively established great processes around
								finance, inventory and marketing to put our business in the best
								position to grow.&rdquo;
							</blockquote>

							{/* Author Info */}
							<div className="mt-6 flex items-center gap-3.5 border-purple-800/40 border-t pt-5">
								<img
									alt="Sam, Co-founder of Ecoy"
									className="size-12 rounded-full border-2 border-purple-500/50 object-cover shadow-md"
									src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
								/>
								<div>
									<h3 className="font-bold text-sm text-white">Sam</h3>
									<p className="text-purple-300/80 text-xs">
										Co-founder of Ecoy
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
