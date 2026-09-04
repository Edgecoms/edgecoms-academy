import { cn } from "@edgecoms-academy/ui/lib/utils";
import {
	DollarSign,
	PackageCheck,
	ShieldCheck,
	Sparkles,
	TrendingUp,
} from "lucide-react";

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
			className="relative overflow-hidden border-purple-900/40 border-t bg-gradient-to-b from-hero-bg-to via-[#240845] to-hero-bg-to py-20 text-hero-foreground sm:py-28 lg:py-32"
			id="the-model"
		>
			{/* Ambient Glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen"
			>
				<div className="size-[35rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.22)_0%,rgba(147,51,234,0.08)_50%,transparent_75%)] blur-3xl sm:size-[50rem]" />
			</div>

			<div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
				{/* Section Header */}
				<div className="max-w-3xl">
					<span className="inline-block rounded-full border border-white/15 bg-white/10 px-3.5 py-1 font-mono font-semibold text-[11px] text-purple-200 uppercase tracking-wider backdrop-blur-md">
						Lesson 01 · The Model
					</span>
					<h2 className="mt-4 font-extrabold text-3xl text-white leading-tight tracking-tight sm:text-4xl md:text-5xl">
						Sell first. Buy second.
					</h2>
					<p className="mt-4 text-purple-200/80 text-sm leading-relaxed sm:text-base">
						Every other retail model buys inventory and then hopes. Dropshipping
						reverses the order: the customer pays you first, you pay the
						supplier second, and the supplier ships direct. That reversal is the
						entire business.
					</p>
				</div>

				{/* 4-Step Cash Flow Cards Grid */}
				<div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{CASH_FLOW.map((step) => {
						const IconComponent = step.icon;
						return (
							<div
								className={cn(
									"relative overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-all duration-300",
									step.highlight
										? "border-amber-400/50 bg-gradient-to-b from-amber-500/15 via-[#2a133f] to-[#1a042e] shadow-amber-500/10 shadow-xl ring-1 ring-amber-400/30"
										: "border-purple-800/40 bg-gradient-to-b from-[#240a43]/90 to-[#17032c]/95 shadow-lg hover:border-purple-600/50"
								)}
								key={step.label}
							>
								<div className="flex items-center justify-between">
									<span
										className={cn(
											"font-bold font-mono text-[11px] tracking-wider",
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

								<h3 className="mt-4 font-semibold text-purple-200/80 text-xs uppercase tracking-wide">
									{step.label}
								</h3>

								<div
									className={cn(
										"mt-2 font-extrabold text-3xl tabular-nums tracking-tight sm:text-4xl",
										step.highlight ? "text-amber-400" : "text-white"
									)}
								>
									{step.value}
								</div>

								<p className="mt-3 text-purple-200/70 text-xs leading-relaxed">
									{step.desc}
								</p>
							</div>
						);
					})}
				</div>

				{/* Risk Transfer Callout Box */}
				<div className="mt-8 rounded-2xl border border-purple-700/40 bg-gradient-to-r from-[#200440] via-[#2a0752] to-[#1b0336] p-6 text-white shadow-2xl sm:p-8">
					<div className="flex items-start gap-4">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/20 text-purple-300">
							<Sparkles className="size-5" />
						</div>
						<div>
							<h3 className="font-bold text-base text-white sm:text-lg">
								The Core Advantage: Risk Transfer
							</h3>
							<p className="mt-2 text-purple-200/85 text-xs leading-relaxed sm:text-sm">
								The reversal is not convenience, it is a{" "}
								<strong className="font-bold text-white">risk transfer</strong>.
								Inventory risk that would sit on your balance sheet sits on the
								supplier&apos;s instead. You do not get that for free, you pay
								for it in margin—which is why product selection and unit
								economics carry so much weight.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
