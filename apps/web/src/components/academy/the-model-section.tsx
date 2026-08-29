import { cn } from "@edgecoms-academy/ui/lib/utils";
import { DollarSign, PackageCheck, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

const CASH_FLOW = [
	{
		badge: "STEP 01",
		desc: "Revenue collected upfront before any spend",
		icon: DollarSign,
		label: "Customer pays you",
		value: "$50",
	},
	{
		badge: "STEP 02",
		desc: "Fulfillment paid only after order is secured",
		icon: PackageCheck,
		label: "You pay supplier",
		value: "$15",
	},
	{
		badge: "STEP 03",
		desc: "Net gross profit to keep and reinvest in ads",
		highlight: true,
		icon: TrendingUp,
		label: "Stays with you",
		value: "$35",
	},
	{
		badge: "STEP 04",
		desc: "Zero capital tied up in warehouses or unsold goods",
		icon: ShieldCheck,
		label: "Units you own",
		value: "0",
	},
];

export function TheModelSection() {
	return (
		<section
			className="relative overflow-hidden bg-gradient-to-b from-hero-bg-to via-[#240845] to-hero-bg-to text-hero-foreground py-20 sm:py-28 lg:py-32 border-t border-purple-900/40"
			id="the-model"
		>
			{/* Ambient Glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen"
			>
				<div className="size-[35rem] sm:size-[50rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.22)_0%,rgba(147,51,234,0.08)_50%,transparent_75%)] blur-3xl" />
			</div>

			<div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
				{/* Section Header */}
				<div className="max-w-3xl">
					<span className="inline-block rounded-full bg-white/10 px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-purple-200 border border-white/15 backdrop-blur-md">
						Lesson 01 · The Model
					</span>
					<h2 className="mt-4 font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white leading-tight">
						Sell first. Buy second.
					</h2>
					<p className="mt-4 text-purple-200/80 text-sm sm:text-base leading-relaxed">
						Every other retail model buys inventory and then hopes. Dropshipping reverses the order: the customer pays you first, you pay the supplier second, and the supplier ships direct. That reversal is the entire business.
					</p>
				</div>

				{/* 4-Step Cash Flow Cards Grid */}
				<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
					{CASH_FLOW.map((step) => {
						const IconComponent = step.icon;
						return (
							<div
								className={cn(
									"relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 backdrop-blur-md",
									step.highlight
										? "border-amber-400/50 bg-gradient-to-b from-amber-500/15 via-[#2a133f] to-[#1a042e] shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/30"
										: "border-purple-800/40 bg-gradient-to-b from-[#240a43]/90 to-[#17032c]/95 shadow-lg hover:border-purple-600/50"
								)}
								key={step.label}
							>
								<div className="flex items-center justify-between">
									<span
										className={cn(
											"font-mono text-[11px] font-bold tracking-wider",
											step.highlight ? "text-amber-400" : "text-purple-300/70"
										)}
									>
										{step.badge}
									</span>
									<div
										className={cn(
											"flex size-8 items-center justify-center rounded-lg",
											step.highlight
												? "bg-amber-400/20 text-amber-400"
												: "bg-purple-900/60 text-purple-300"
										)}
									>
										<IconComponent className="size-4" />
									</div>
								</div>

								<h3 className="mt-4 text-xs font-semibold text-purple-200/80 uppercase tracking-wide">
									{step.label}
								</h3>

								<div
									className={cn(
										"mt-2 font-extrabold text-3xl sm:text-4xl tabular-nums tracking-tight",
										step.highlight ? "text-amber-400" : "text-white"
									)}
								>
									{step.value}
								</div>

								<p className="mt-3 text-xs text-purple-200/70 leading-relaxed">
									{step.desc}
								</p>
							</div>
						);
					})}
				</div>

				{/* Risk Transfer Callout Box */}
				<div className="mt-8 rounded-2xl border border-purple-700/40 bg-gradient-to-r from-[#200440] via-[#2a0752] to-[#1b0336] p-6 sm:p-8 shadow-2xl text-white">
					<div className="flex items-start gap-4">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300">
							<Sparkles className="size-5" />
						</div>
						<div>
							<h3 className="font-bold text-base sm:text-lg text-white">
								The Core Advantage: Risk Transfer
							</h3>
							<p className="mt-2 text-xs sm:text-sm text-purple-200/85 leading-relaxed">
								The reversal is not convenience, it is a{" "}
								<strong className="text-white font-bold">risk transfer</strong>. Inventory risk that would sit on your balance sheet sits on the supplier&apos;s instead. You do not get that for free, you pay for it in margin—which is why product selection and unit economics carry so much weight.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
