import { buttonVariants } from "@edgecoms-academy/ui/components/button";
import { cn } from "@edgecoms-academy/ui/lib/utils";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import Link from "next/link";

interface Mentor {
	name: string;
	role: string;
	highlight: string;
	image: string;
}

const MENTORS: Mentor[] = [
	{
		highlight: "Top Amazon & Shopify Founder with $50M+ Lifetime Sales",
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
		name: "Zeeshan M.",
		role: "Ecom Growth Mentor",
	},
	{
		highlight: "7+ Years Fractional CMO With $200M+ Generated Globally",
		image:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
		name: "Alex Myatt",
		role: "Creative Mentor",
	},
	{
		highlight: "10+ Yrs Of Experience Scaling Ad Accounts From <$100K - $500K+",
		image:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
		name: "Nick Melcher",
		role: "Facebook Ads Mentor",
	},
	{
		highlight: "Founder of Imprint Genius, Sourcing Agency Running 7+ Yrs",
		image:
			"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
		name: "Isaac Hetzroni",
		role: "Sourcing & Product Mentor",
	},
	{
		highlight: "Former CFO & COO of Guardian Bikes (Mark Cuban company)",
		image:
			"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80",
		name: "Marcus Vance",
		role: "Operations & Finance",
	},
	{
		highlight:
			"Prev. Head of Operations @ Gymshark, scaling global fulfillment",
		image:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
		name: "Sarah Chen",
		role: "Supply Chain Leader",
	},
];

const STATS = [
	{
		label: "In Combined Shopify Sales",
		number: "$2+",
		unit: "Billion",
	},
	{
		label: "Units Collectively Sold",
		number: "50+",
		unit: "Million",
	},
	{
		label: "Collectively Spent on Ads",
		number: "$400+",
		unit: "Million",
	},
	{
		label: "In Combined Ecom Experience",
		number: "150+",
		unit: "Years",
	},
];

export function MentorsSection() {
	return (
		<section
			className="relative overflow-hidden border-border/60 border-t bg-background py-20 sm:py-28 lg:py-32"
			id="mentors"
		>
			{/* Ambient background glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 dark:opacity-60 mix-blend-screen"
			>
				<div className="size-[30rem] sm:size-[45rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,rgba(147,51,234,0.06)_50%,transparent_75%)] blur-3xl" />
			</div>

			<div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 text-center">
				{/* Section Header */}
				<div className="mx-auto max-w-3xl">
					<h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.18]">
						The Fastest Way to Grow is By{" "}
						<span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 dark:from-purple-400 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent block sm:inline">
							Learning From Mentors Who&apos;ve Done It Before You
						</span>
					</h2>
					<p className="mt-5 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
						Edgecoms Academy gives brands direct eCommerce mentorship from
						$100M+ founders and subject matter experts inside a community of
						other elite brands.
					</p>
				</div>

				{/* Mentors Cards Grid / Horizontal Scroll */}
				<div className="mt-12 sm:mt-16 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-4 pt-2 [scrollbar-width:none] [-ms-overflow-style:none]">
					<div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 min-w-max sm:min-w-0">
						{MENTORS.map((mentor) => (
							<div
								className="group relative flex h-80 w-60 sm:w-auto flex-col justify-end overflow-hidden rounded-2xl border border-purple-800/30 dark:border-purple-800/40 bg-gradient-to-b from-[#2a0c4e] to-[#16042a] p-4 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-600/50 hover:shadow-purple-950/30"
								key={mentor.name}
							>
								{/* Mentor Image with gradient mesh & duotone */}
								<img
									alt={mentor.name}
									className="absolute inset-0 size-full object-cover grayscale contrast-110 opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90 mix-blend-luminosity"
									src={mentor.image}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#140226] via-[#1c0638]/70 to-transparent" />

								{/* Content info overlay */}
								<div className="relative z-10">
									<h3 className="font-bold text-base text-white tracking-tight">
										{mentor.name}
									</h3>
									<p className="text-purple-300 font-medium text-xs mt-0.5">
										{mentor.role}
									</p>
									<p className="mt-2 text-[11px] text-purple-200/80 line-clamp-2 leading-relaxed">
										{mentor.highlight}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Mentors Subtext & Link */}
				<div className="mt-8 flex flex-col items-center gap-2">
					<p className="text-muted-foreground text-xs sm:text-sm font-medium">
						26 Eight and Nine Figure Ecom Founders and Subject Matter Experts
					</p>
					<Link
						className="inline-flex items-center gap-1 font-semibold text-xs sm:text-sm text-primary hover:underline underline-offset-4"
						href="/academy/access"
					>
						<span>View Mentors</span>
						<ExternalLink className="size-3.5" />
					</Link>
				</div>

				{/* Big 4 Stats Row */}
				<div className="mt-16 sm:mt-20 grid grid-cols-2 gap-y-10 gap-x-4 sm:grid-cols-4 sm:gap-6 lg:gap-8 border-y border-border/60 py-10 sm:py-14">
					{STATS.map((stat) => (
						<div
							className="flex flex-col items-center text-center px-2"
							key={stat.label}
						>
							<span className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 dark:from-purple-300 dark:via-purple-200 dark:to-indigo-300 bg-clip-text text-transparent tabular-nums leading-none">
								{stat.number}
							</span>
							<span className="mt-1.5 font-bold text-lg sm:text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 dark:from-purple-300 dark:via-purple-200 dark:to-indigo-300 bg-clip-text text-transparent">
								{stat.unit}
							</span>
							<span className="mt-2 text-xs sm:text-sm font-medium text-muted-foreground">
								{stat.label}
							</span>
						</div>
					))}
				</div>

				{/* Testimonial Capsule */}
				<div className="mt-14 sm:mt-16 mx-auto max-w-2xl">
					<div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-800/50 bg-gradient-to-r from-[#200440] via-[#2c0856] to-[#1b0336] p-6 sm:p-7 shadow-2xl text-left text-white">
						<div className="flex items-center gap-4 sm:gap-5">
							{/* Testimonial Author Avatar */}
							<img
								alt="Fameez, co-founder of OTAA"
								className="size-14 sm:size-16 shrink-0 rounded-full border-2 border-purple-500/40 object-cover shadow-md"
								src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
							/>
							<div className="flex-1 min-w-0">
								{/* 5 Stars */}
								<div className="flex items-center gap-1 text-amber-400 mb-2">
									<Star className="size-4 fill-amber-400 text-amber-400" />
									<Star className="size-4 fill-amber-400 text-amber-400" />
									<Star className="size-4 fill-amber-400 text-amber-400" />
									<Star className="size-4 fill-amber-400 text-amber-400" />
									<Star className="size-4 fill-amber-400 text-amber-400" />
								</div>
								{/* Quote */}
								<blockquote className="font-semibold text-sm sm:text-base text-purple-100 leading-snug">
									&ldquo;They&apos;ve created the Avengers of Ecommerce.&rdquo;
								</blockquote>
								{/* Author */}
								<p className="mt-1.5 text-xs text-purple-300/80 font-medium">
									— Fameez, co-founder of OTAA
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Apply Now CTA Button */}
				<div className="mt-8 flex justify-center">
					<Link
						className="inline-flex items-center gap-2 rounded-xl bg-[#281347] hover:bg-[#341a5b] text-white border border-purple-500/30 px-8 py-3.5 font-bold text-sm sm:text-base shadow-xl shadow-purple-950/20 transition-all hover:scale-[1.02] active:scale-[0.99]"
						href="/academy/access"
					>
						<span>Apply Now</span>
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
