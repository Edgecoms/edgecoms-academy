import { buttonVariants } from "@edgecoms-academy/ui/components/button";
import { cn } from "@edgecoms-academy/ui/lib/utils";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import Link from "next/link";

interface Mentor {
	highlight: string;
	image: string;
	name: string;
	role: string;
}

const MENTORS: Mentor[] = [
	{
		highlight:
			"Scaling DTC brands from zero to 7-figures through high-converting store architecture and product validation.",
		image:
			"https://media.licdn.com/dms/image/v2/D4D03AQFncQt3OloZ-A/profile-displayphoto-scale_400_400/B4DZ.3bwFVKAAk-/0/1785488934854?e=1789603200&v=beta&t=R95P7JWgl-ROqSvCvY0s3035EIyukrNW7cgzfn8FtRE",
		name: "Anurag",
		role: "Ecom Growth & Strategy",
	},
	{
		highlight:
			"Specialist in high-converting ad creatives, store architecture, brand positioning, and CRO systems.",
		image:
			"https://media.licdn.com/dms/image/v2/D5603AQEwgeHktU-ZYw/profile-displayphoto-crop_800_800/B56Z584HaYK4AI-/0/1780211547226?e=1789603200&v=beta&t=XwgIFgisBd-UvblRySaUS6eOot4apCa-2JVDk0vAUb8",
		name: "Avinash",
		role: "Creative Strategy & CRO",
	},
	{
		highlight:
			"Meta Ads scaling specialist, media buying architecture, and profitable customer acquisition systems.",
		image:
			"https://media.licdn.com/dms/image/v2/D5603AQEEkS4yPwBxug/profile-displayphoto-shrink_800_800/B56ZaSMRkOHAAc-/0/1746209415394?e=1789603200&v=beta&t=u7J3VIXNIg6BCsBsbpm0uclCeqQ7DYWO7SuMObdNOIo",
		name: "Medha",
		role: "Paid Media & Meta Ads",
	},
];

const STATS = [
	{
		label: "In Combined DTC Sales",
		number: "$10+",
		unit: "Million",
	},
	{
		label: "Orders Delivered Globally",
		number: "150+",
		unit: "Thousand",
	},
	{
		label: "Spent on Meta Ads",
		number: "$2+",
		unit: "Million",
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
				className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen dark:opacity-60"
			>
				<div className="size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,rgba(147,51,234,0.06)_50%,transparent_75%)] blur-3xl sm:size-[45rem]" />
			</div>

			<div className="relative mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
				{/* Section Header */}
				<div className="mx-auto max-w-3xl">
					<h2 className="font-extrabold text-3xl text-foreground leading-[1.18] tracking-tight sm:text-4xl md:text-5xl">
						The Fastest Way to Grow is By{" "}
						<span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent sm:inline dark:from-purple-400 dark:via-purple-300 dark:to-indigo-300">
							Learning From Mentors Who&apos;ve Done It Before You
						</span>
					</h2>
					<p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base">
						Edgecoms Academy gives brands direct eCommerce mentorship from
						experienced founders and operators inside an elite community.
					</p>
				</div>

				{/* Mentors Cards Grid (3-column layout) */}
				<div className="mx-auto mt-12 max-w-4xl sm:mt-16">
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
						{MENTORS.map((mentor) => (
							<div
								className="group relative flex h-88 flex-col justify-end overflow-hidden rounded-2xl border border-purple-800/30 bg-gradient-to-b from-[#2a0c4e] to-[#16042a] p-5 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-purple-950/40 sm:h-96 dark:border-purple-800/40"
								key={mentor.name}
							>
								{/* Mentor Image with gradient mesh & duotone */}
								<img
									alt={mentor.name}
									className="absolute inset-0 size-full object-cover object-top opacity-80 mix-blend-luminosity contrast-110 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-95"
									src={mentor.image}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#140226] via-[#1c0638]/70 to-transparent" />

								{/* Content info overlay */}
								<div className="relative z-10">
									<h3 className="font-bold text-lg text-white tracking-tight">
										{mentor.name}
									</h3>
									<p className="mt-0.5 font-semibold text-purple-300 text-xs">
										{mentor.role}
									</p>
									<p className="mt-2 text-purple-200/85 text-xs leading-relaxed">
										{mentor.highlight}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Mentors Subtext & Link */}
				<div className="mt-8 flex flex-col items-center gap-2">
					<p className="font-medium text-muted-foreground text-xs sm:text-sm">
						Direct 1-on-1 access to our dedicated mentors and operators
					</p>
					<Link
						className="inline-flex items-center gap-1 font-semibold text-primary text-xs underline-offset-4 hover:underline sm:text-sm"
						href="/academy/access"
					>
						<span>View Mentors</span>
						<ExternalLink className="size-3.5" />
					</Link>
				</div>

				{/* 3 Stats Row */}
				<div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-6 gap-y-10 border-border/60 border-y py-10 sm:mt-20 sm:grid-cols-3 sm:gap-8 sm:py-14">
					{STATS.map((stat) => (
						<div
							className="flex flex-col items-center px-2 text-center"
							key={stat.label}
						>
							<span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 bg-clip-text font-extrabold text-3xl text-transparent tabular-nums leading-none tracking-tight sm:text-4xl lg:text-5xl dark:from-purple-300 dark:via-purple-200 dark:to-indigo-300">
								{stat.number}
							</span>
							<span className="mt-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 bg-clip-text font-bold text-lg text-transparent tracking-tight sm:text-xl lg:text-2xl dark:from-purple-300 dark:via-purple-200 dark:to-indigo-300">
								{stat.unit}
							</span>
							<span className="mt-2 font-medium text-muted-foreground text-xs sm:text-sm">
								{stat.label}
							</span>
						</div>
					))}
				</div>

				{/* Testimonial Capsule */}
				<div className="mx-auto mt-14 max-w-2xl sm:mt-16">
					<div className="relative overflow-hidden rounded-2xl border border-purple-800/50 bg-gradient-to-r from-[#200440] via-[#2c0856] to-[#1b0336] p-6 text-left text-white shadow-2xl sm:rounded-3xl sm:p-7">
						<div className="flex items-center gap-4 sm:gap-5">
							{/* Testimonial Author Avatar */}
							<img
								alt="Fameez, co-founder of OTAA"
								className="size-14 shrink-0 rounded-full border-2 border-purple-500/40 object-cover shadow-md sm:size-16"
								src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80"
							/>
							<div className="min-w-0 flex-1">
								{/* 5 Stars */}
								<div className="mb-2 flex items-center gap-1 text-amber-400">
									<Star className="size-4 fill-amber-400 text-amber-400" />
									<Star className="size-4 fill-amber-400 text-amber-400" />
									<Star className="size-4 fill-amber-400 text-amber-400" />
									<Star className="size-4 fill-amber-400 text-amber-400" />
									<Star className="size-4 fill-amber-400 text-amber-400" />
								</div>
								{/* Quote */}
								<blockquote className="font-semibold text-purple-100 text-sm leading-snug sm:text-base">
									&ldquo;They&apos;ve created the Avengers of Ecommerce.&rdquo;
								</blockquote>
								{/* Author */}
								<p className="mt-1.5 font-medium text-purple-300/80 text-xs">
									— Fameez, co-founder of OTAA
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Apply Now CTA Button */}
				<div className="mt-8 flex justify-center">
					<Link
						className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-[#281347] px-8 py-3.5 font-bold text-sm text-white shadow-purple-950/20 shadow-xl transition-all hover:scale-[1.02] hover:bg-[#341a5b] active:scale-[0.99] sm:text-base"
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
