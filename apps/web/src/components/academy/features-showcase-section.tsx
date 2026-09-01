import {
	ArrowRight,
	Bot,
	Brain,
	Calendar,
	Check,
	ExternalLink,
	Hash,
	Lightbulb,
	MessageSquare,
	Play,
	Sparkles,
	Star,
	TrendingUp,
	Users,
	Video,
} from "lucide-react";
import Link from "next/link";

const TOPICS = [
	"Ad Creative",
	"Brand Strategy",
	"Copywriting",
	"CRO",
	"Email & SMS",
	"Facebook Ads",
	"Landing Pages",
	"Licensing",
	"Ops & Logistics",
	"Organic Social",
	"Product & Sourcing",
	"+ More",
];

const RESOURCE_CARDS = [
	{
		duration: "14m",
		image:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80",
		name: "Product Validation Framework",
		tag: "RESEARCH",
	},
	{
		duration: "18m",
		image:
			"https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80",
		name: "Shopify Store Architecture",
		tag: "SHOPIFY",
	},
	{
		duration: "22m",
		image:
			"https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&auto=format&fit=crop&q=80",
		name: "Meta Ads Scaling Blueprint",
		tag: "META ADS",
	},
	{
		duration: "16m",
		image:
			"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop&q=80",
		name: "High-Converting UGC Creative",
		tag: "CREATIVE",
	},
	{
		duration: "12m",
		image:
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80",
		name: "Offer Strategy & Bundling",
		tag: "CONVERSION",
	},
	{
		duration: "20m",
		image:
			"https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=400&auto=format&fit=crop&q=80",
		name: "Creative Testing Matrix",
		tag: "TESTING",
	},
	{
		duration: "15m",
		image:
			"https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80",
		name: "High-Converting Landing Pages",
		tag: "CRO",
	},
	{
		duration: "25m",
		image:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
		name: "Unit Economics & Profit Margin",
		tag: "FINANCE",
	},
	{
		duration: "19m",
		image:
			"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80",
		name: "BFCM & Q4 Scale Playbook",
		tag: "SCALING",
	},
];

export function FeaturesShowcaseSection() {
	return (
		<section
			className="relative overflow-hidden border-border/60 border-t bg-background py-20 sm:py-28 lg:py-32"
			id="features"
		>
			{/* Ambient Purple Background Glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-50 mix-blend-screen"
			>
				<div className="size-[40rem] sm:size-[60rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.2)_0%,rgba(147,51,234,0.06)_50%,transparent_75%)] blur-3xl" />
			</div>

			<div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
				{/* Section Header */}
				<div className="max-w-3xl">
					<h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.15]">
						<span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 dark:from-purple-300 dark:via-purple-200 dark:to-indigo-300 bg-clip-text text-transparent">
							What&apos;s Inside Edgecoms Academy
						</span>{" "}
						and How It Can Accelerate Your Success
					</h2>
					<p className="mt-3 text-muted-foreground text-base sm:text-lg font-medium">
						Nothing else like it.
					</p>
				</div>

				{/* ------------------------------------------------------------- */}
				{/* PART 1: COACHING & MENTORSHIP MEGA CARD                       */}
				{/* ------------------------------------------------------------- */}
				<div className="mt-12 sm:mt-16 overflow-hidden rounded-3xl border border-purple-800/40 bg-gradient-to-br from-[#260846] via-[#1a0432] to-[#120224] p-6 sm:p-10 lg:p-12 shadow-2xl text-white">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
						<div className="lg:col-span-6 flex flex-col items-start gap-4">
							<span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-purple-200 backdrop-blur-md border border-white/15">
								Coaching &amp; Mentorship
							</span>
							<h3 className="font-extrabold text-2xl sm:text-4xl tracking-tight text-white leading-tight">
								Learn 1-on-1 from Real Ecom Experts Who&apos;ve Built $100M+
								Brands
							</h3>
							<p className="text-purple-200/80 text-sm sm:text-base leading-relaxed">
								Personalized guidance from mentors with unmatched experience
								scaling 7, 8, and 9-figure direct-to-consumer brands.
							</p>
							<Link
								className="mt-2 inline-flex items-center gap-1.5 font-semibold text-sm text-purple-300 hover:text-white transition-colors"
								href="/academy/access"
							>
								<span>View Mentors</span>
								<ExternalLink className="size-4" />
							</Link>
						</div>

						{/* Mock Video Call UI Graphic */}
						<div className="lg:col-span-6 relative">
							<div className="relative mx-auto w-full max-w-md rounded-2xl border border-purple-500/30 bg-black/60 p-3 shadow-2xl backdrop-blur-xl">
								{/* Main Speaker Screen */}
								<div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-purple-950">
									<img
										alt="Mentor Video Call"
										className="size-full object-cover object-center opacity-95"
										src="https://media.licdn.com/dms/image/v2/D4D03AQFncQt3OloZ-A/profile-displayphoto-scale_400_400/B4DZ.3bwFVKAAk-/0/1785488934854?e=1789603200&v=beta&t=R95P7JWgl-ROqSvCvY0s3035EIyukrNW7cgzfn8FtRE"
									/>
									{/* Small Picture-in-Picture */}
									<div className="absolute top-3 left-3 size-16 sm:size-20 overflow-hidden rounded-lg border border-white/30 bg-purple-900 shadow-md">
										<img
											alt="Student in call"
											className="size-full object-cover object-center"
											src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&auto=format&fit=crop&q=80"
										/>
									</div>
									{/* Call Controls Bar */}
									<div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
										<div className="flex items-center gap-3 rounded-full bg-black/70 px-4 py-1.5 backdrop-blur-md border border-white/20 text-xs">
											<span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
											<span className="font-mono text-[11px] text-white">
												1-on-1 Growth Session
											</span>
											<Video className="size-3.5 text-white/80" />
										</div>
									</div>
								</div>

								{/* Discord Icon Float */}
								<div className="absolute -bottom-4 -right-4 flex size-14 items-center justify-center rounded-2xl border border-indigo-400/40 bg-[#5865F2] shadow-2xl">
									<span className="font-black text-2xl text-white">#</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* ------------------------------------------------------------- */}
				{/* PART 2: TWO SPLIT CARDS (Calls + Slack Support)               */}
				{/* ------------------------------------------------------------- */}
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Card 1: 1-on-1 Calls */}
					<div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all hover:border-purple-500/40">
						<div>
							<div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4">
								<Calendar className="size-5" />
							</div>
							<h4 className="font-bold text-lg sm:text-xl text-foreground">
								Schedule Weekly 1-on-1 Calls with Mentors
							</h4>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								Book in directly with our mentors and receive 1-on-1 help from
								ecom&apos;s top founders and subject matter experts.
							</p>
						</div>

						{/* Mockup Preview */}
						<div className="mt-6 rounded-2xl border border-border/60 bg-muted/30 p-4 relative overflow-hidden">
							<div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
								<div className="sm:col-span-6 rounded-xl border border-border/70 bg-card p-3 shadow-xs">
									<div className="flex items-center justify-between font-mono text-[11px] font-semibold text-muted-foreground pb-2 border-b border-border/60">
										<span>Weekly Mentor 1:1</span>
										<span className="text-primary">30 min</span>
									</div>
									<div className="mt-3 grid grid-cols-5 gap-1 text-center font-mono text-[10px]">
										<span className="p-1 rounded bg-primary/10 text-primary font-bold">
											14
										</span>
										<span className="p-1 rounded bg-primary/10 text-primary font-bold">
											15
										</span>
										<span className="p-1 rounded bg-primary text-primary-foreground font-bold">
											16
										</span>
										<span className="p-1 rounded bg-primary/10 text-primary font-bold">
											17
										</span>
										<span className="p-1 rounded bg-primary/10 text-primary font-bold">
											18
										</span>
									</div>
								</div>
								<div className="sm:col-span-6 rounded-xl overflow-hidden border border-border/70 aspect-video relative">
									<img
										alt="Mentor Call Mockup"
										className="size-full object-cover object-[center_60%]"
										src="https://media.licdn.com/dms/image/v2/D5603AQEEkS4yPwBxug/profile-displayphoto-shrink_800_800/B56ZaSMRkOHAAc-/0/1746209415394?e=1789603200&v=beta&t=u7J3VIXNIg6BCsBsbpm0uclCeqQ7DYWO7SuMObdNOIo"
									/>
									<div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-white">
										Live Call
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Card 2: Discord On-Demand Support */}
					<div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all hover:border-purple-500/40">
						<div>
							<div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-[#5865F2] mb-4">
								<MessageSquare className="size-5" />
							</div>
							<h4 className="font-bold text-lg sm:text-xl text-foreground">
								Get Support On Demand Through Discord
							</h4>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								Your private Discord channel connects you directly to our
								mentors 24/7, giving you instant access to advice, feedback, and
								solutions as you need them.
							</p>
						</div>

						{/* Discord Interface Mockup */}
						<div className="mt-6 rounded-2xl border border-border/60 bg-[#1e102d] text-white p-4 font-sans text-xs">
							<div className="flex items-center gap-2 pb-3 border-b border-purple-800/40 text-purple-200">
								<Hash className="size-3.5 text-[#5865F2]" />
								<span className="font-bold">#my-brand-private-channel</span>
								<span className="ml-auto text-[10px] text-purple-300/60 font-mono">
									24/7 Active
								</span>
							</div>
							<div className="mt-3 space-y-2.5">
								<div className="flex items-start gap-2.5">
									<span className="size-6 rounded-full bg-purple-600 font-bold flex items-center justify-center text-[10px] text-white shrink-0">
										AC
									</span>
									<div>
										<p className="font-bold text-[11px] text-purple-200">
											Anurag (Growth Mentor)
										</p>
										<p className="text-[11px] text-purple-100/90 mt-0.5">
											Reviewed your store offer! Simplified the PDP bundle
											pricing — ready to scale tests.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-2.5">
									<span className="size-6 rounded-full bg-indigo-600 font-bold flex items-center justify-center text-[10px] text-white shrink-0">
										AV
									</span>
									<div>
										<p className="font-bold text-[11px] text-purple-200">
											Avinash (Creative &amp; CRO)
										</p>
										<p className="text-[11px] text-purple-100/90 mt-0.5">
											New hook variations delivered! Push the UGC angle to broad
											audience ad set.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-2.5">
									<span className="size-6 rounded-full bg-pink-600 font-bold flex items-center justify-center text-[10px] text-white shrink-0">
										MD
									</span>
									<div>
										<p className="font-bold text-[11px] text-purple-200">
											Medha (Paid Media &amp; Meta Ads)
										</p>
										<p className="text-[11px] text-purple-100/90 mt-0.5">
											Target CPA dropped to $18.40 on winning campaign. Scaling
											budget by 30%.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* ------------------------------------------------------------- */}
				{/* PART 3: TOPICS PILLS MATRIX & TESTIMONIAL                     */}
				{/* ------------------------------------------------------------- */}
				<div className="mt-16 sm:mt-20 rounded-3xl border border-border/80 bg-card p-6 sm:p-10 lg:p-12 shadow-xs text-center">
					<div className="flex justify-center mb-3">
						<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
							<TrendingUp className="size-5" />
						</div>
					</div>
					<h3 className="font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight">
						Level Up Every Aspect of Your Brand
					</h3>
					<p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
						You&apos;ll have access to a mentor who&apos;s a subject matter
						expert in:
					</p>

					{/* 19 Purple Topic Pills */}
					<div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
						{TOPICS.map((topic) => (
							<span
								className="rounded-2xl border border-purple-600/30 dark:border-purple-500/30 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white px-5 py-3 font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-105 hover:border-purple-400 hover:shadow-purple-900/30 cursor-default select-none"
								key={topic}
							>
								{topic}
							</span>
						))}
					</div>

					{/* Testimonial Capsule (Aami from Mimi & Co) */}
					<div className="mt-12 mx-auto max-w-2xl">
						<div className="rounded-2xl border border-purple-800/50 bg-gradient-to-r from-[#200440] via-[#2c0856] to-[#1b0336] p-6 sm:p-7 shadow-2xl text-left text-white">
							<div className="flex items-center gap-4 sm:gap-5">
								<img
									alt="Aami, founder of Mimi & Co"
									className="size-14 sm:size-16 shrink-0 rounded-full border-2 border-purple-500/40 object-cover shadow-md"
									src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
								/>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-1 text-amber-400 mb-2">
										<Star className="size-4 fill-amber-400 text-amber-400" />
										<Star className="size-4 fill-amber-400 text-amber-400" />
										<Star className="size-4 fill-amber-400 text-amber-400" />
										<Star className="size-4 fill-amber-400 text-amber-400" />
										<Star className="size-4 fill-amber-400 text-amber-400" />
									</div>
									<blockquote className="font-semibold text-sm sm:text-base text-purple-100 leading-snug">
										&ldquo;The thing that&apos;s made our business grow to where
										it is now is having access to mentors in every aspect of our
										business.&rdquo;
									</blockquote>
									<p className="mt-1.5 text-xs text-purple-300/80 font-medium">
										— Aami, founder of Mimi &amp; Co
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* CTAs */}
					<div className="mt-8 flex flex-col items-center gap-2">
						<Link
							className="inline-flex items-center gap-2 rounded-xl bg-[#281347] hover:bg-[#341a5b] text-white border border-purple-500/30 px-8 py-3.5 font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-[1.02]"
							href="/academy/access"
						>
							<span>Apply Now</span>
							<ArrowRight className="size-4" />
						</Link>
						<Link
							className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline underline-offset-4 mt-2"
							href="/academy/access"
						>
							<span>View Mentors</span>
							<ExternalLink className="size-3.5" />
						</Link>
					</div>
				</div>

				{/* ------------------------------------------------------------- */}
				{/* PART 4: CONTENT & RESOURCES MEGA CARD                         */}
				{/* ------------------------------------------------------------- */}
				<div className="mt-20 sm:mt-24 overflow-hidden rounded-3xl border border-purple-800/40 bg-gradient-to-br from-[#260846] via-[#1a0432] to-[#120224] p-6 sm:p-10 lg:p-12 shadow-2xl text-white">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
						<div className="lg:col-span-6 flex flex-col items-start gap-4">
							<span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-purple-200 backdrop-blur-md border border-white/15">
								Content &amp; Resources
							</span>
							<h3 className="font-extrabold text-2xl sm:text-4xl tracking-tight text-white leading-tight">
								Copy and Paste the Strategies We&apos;re Actively Using to Scale
								7-Figure Brands
							</h3>
							<p className="text-purple-200/80 text-sm sm:text-base leading-relaxed">
								Unlock access to SOPs, frameworks, training videos, and
								resources that we use inside our own ecommerce brands.
							</p>
						</div>

						{/* Visual Grid of Resource Cards with Video Thumbnail Hover */}
						<div className="lg:col-span-6">
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/50 border border-purple-500/20 backdrop-blur-xl">
								{RESOURCE_CARDS.map((res) => (
									<div
										className="group relative flex h-28 flex-col justify-between overflow-hidden rounded-xl border border-purple-700/30 bg-gradient-to-b from-[#250a44] to-[#120224] p-3 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-950/50 cursor-pointer select-none"
										key={res.name}
									>
										{/* Video Thumbnail Image (blooms on hover) */}
										<img
											alt={res.name}
											className="absolute inset-0 size-full object-cover grayscale opacity-25 transition-all duration-500 group-hover:scale-110 group-hover:opacity-75 group-hover:grayscale-0"
											src={res.image}
										/>

										{/* Default dark overlay & light greying hover overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-[#140226]/95 via-[#1c0638]/70 to-[#140226]/40 transition-opacity duration-300 group-hover:opacity-0" />
										<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-slate-900/60 to-slate-800/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[1px]" />

										{/* Top Row: Tag & Duration Badge */}
										<div className="relative z-10 flex items-center justify-between">
											<span className="font-mono text-[8px] uppercase tracking-wider text-purple-300 font-bold px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/30 group-hover:border-purple-400/50 group-hover:text-amber-300 transition-colors">
												{res.tag}
											</span>
											<span className="font-mono text-[9px] text-purple-200/70 group-hover:text-white font-medium transition-colors">
												{res.duration}
											</span>
										</div>

										{/* Center Play Button on Hover */}
										<div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
											<div className="flex size-7 items-center justify-center rounded-full bg-white/25 backdrop-blur-md border border-white/50 text-white shadow-md">
												<Play className="size-3.5 fill-white translate-x-0.5" />
											</div>
										</div>

										{/* Bottom Row: Name */}
										<div className="relative z-10">
											<p className="font-semibold text-[11px] text-white leading-snug line-clamp-2 group-hover:text-purple-100 transition-colors">
												{res.name}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* ------------------------------------------------------------- */}
				{/* PART 5: TWO SPLIT CARDS (Strategies + 17 Lessons / 3 Modules) */}
				{/* ------------------------------------------------------------- */}
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Card 1: Battle-Tested Strategies */}
					<div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all hover:border-purple-500/40">
						<div>
							<div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4">
								<Lightbulb className="size-5" />
							</div>
							<h4 className="font-bold text-lg sm:text-xl text-foreground">
								Battle-Tested Growth Strategies
							</h4>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								Learn the exact operating frameworks and growth strategies we
								use to find winning products, build high-converting Shopify
								stores, and scale profitably.
							</p>
						</div>

						{/* Mockup Preview */}
						<div className="mt-6 rounded-2xl border border-border/60 bg-muted/30 p-4">
							<div className="grid grid-cols-2 gap-3">
								<div className="rounded-xl border border-border/70 bg-card p-3 shadow-xs">
									<p className="font-mono text-[10px] font-semibold text-primary uppercase">
										Validation Strategy
									</p>
									<p className="mt-1 text-xs font-bold text-foreground">
										Sell First, Buy Second
									</p>
									<div className="mt-2 space-y-1">
										<div className="h-1.5 w-full rounded bg-primary/20" />
										<div className="h-1.5 w-4/5 rounded bg-muted" />
									</div>
								</div>
								<div className="rounded-xl border border-border/70 bg-card p-3 shadow-xs">
									<p className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
										Scale Strategy
									</p>
									<p className="mt-1 text-xs font-bold text-foreground">
										Meta Ads Architecture
									</p>
									<div className="mt-2 space-y-1">
										<div className="h-1.5 w-full rounded bg-emerald-500/20" />
										<div className="h-1.5 w-3/4 rounded bg-muted" />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Card 2: 17 Lessons Across 3 Modules */}
					<div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs flex flex-col justify-between transition-all hover:border-purple-500/40">
						<div>
							<div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4">
								<Brain className="size-5" />
							</div>
							<h4 className="font-bold text-lg sm:text-xl text-foreground">
								17 Actionable Lessons Across 3 Core Modules
							</h4>
							<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
								From product research and high-converting store setup to
								profitable Meta Ads. Master the complete system across 3 focused
								modules and 17 step-by-step video lessons.
							</p>
						</div>

						{/* Mockup Browser Window Preview */}
						<div className="mt-6 rounded-2xl border border-border/60 bg-muted/30 p-4">
							<div className="rounded-xl border border-border/70 bg-card p-3.5 shadow-xs">
								<div className="flex items-center justify-between border-b border-border/60 pb-2">
									<div className="flex items-center gap-1.5">
										<span className="size-2 rounded-full bg-rose-400" />
										<span className="size-2 rounded-full bg-amber-400" />
										<span className="size-2 rounded-full bg-emerald-400" />
										<span className="ml-2 font-mono text-[10px] text-muted-foreground">
											Course: Shopify &amp; DTC Growth
										</span>
									</div>
									<span className="font-mono text-[10px] font-bold text-primary">
										17 Lessons
									</span>
								</div>
								<div className="mt-2.5 flex items-center gap-3">
									<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
										<Play className="size-4 fill-primary" />
									</div>
									<div className="min-w-0 flex-1">
										<p className="font-semibold text-xs text-foreground truncate">
											Shopify Ecommerce: Zero to Scale
										</p>
										<p className="text-[10px] text-muted-foreground font-mono">
											3 Core Modules · 17 Actionable Lessons
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
