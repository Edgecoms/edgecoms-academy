import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

interface AcademyHeroProps {
	totalLessons: number;
	totalModules: number;
	auditUrl?: string;
}

const BRAND_LOGOS = [
	{ name: "Mimi & Co.", style: "font-serif italic tracking-wide text-lg" },
	{ name: "contour cube®", style: "font-bold tracking-tight text-base lowercase" },
	{ name: "35MM CO.", style: "font-mono font-black tracking-wider text-base" },
	{ name: "tropeaka", style: "font-sans font-light tracking-widest text-base lowercase" },
	{ name: "DAILYPUZZLES", style: "font-black tracking-tight text-sm uppercase flex items-center gap-1.5" },
	{ name: "Comfrt", style: "font-semibold tracking-normal text-base" },
	{ name: "HOTSNAP", style: "font-black tracking-widest text-sm uppercase" },
	{ name: "OiO", style: "font-extrabold tracking-tight text-lg" },
];

export function AcademyHero({
	totalLessons,
	totalModules,
}: AcademyHeroProps) {
	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-hero-bg-from via-hero-bg-via to-hero-bg-to text-hero-foreground pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-28">
			{/* Ambient Purple Glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-60 mix-blend-screen"
			>
				<div className="size-[32rem] sm:size-[45rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,rgba(147,51,234,0.15)_45%,transparent_70%)] blur-3xl" />
			</div>

			{/* Soft background grid pattern for subtle depth */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
			/>

			<div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
				{/* Social proof badge: Avatars + 5 Stars + Text */}
				<div className="rise flex flex-wrap items-center justify-center gap-3 rounded-full border border-hero-border bg-hero-badge-bg px-4 py-1.5 backdrop-blur-md shadow-lg shadow-black/20">
					{/* Stack of founder avatars */}
					<div className="flex -space-x-2 overflow-hidden">
						<img
							alt="Founder avatar"
							className="inline-block size-7 rounded-full border-2 border-purple-900 object-cover"
							src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
						/>
						<img
							alt="Founder avatar"
							className="inline-block size-7 rounded-full border-2 border-purple-900 object-cover"
							src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
						/>
						<img
							alt="Founder avatar"
							className="inline-block size-7 rounded-full border-2 border-purple-900 object-cover"
							src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
						/>
						<img
							alt="Founder avatar"
							className="inline-block size-7 rounded-full border-2 border-purple-900 object-cover"
							src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
						/>
						<img
							alt="Founder avatar"
							className="inline-block size-7 rounded-full border-2 border-purple-900 object-cover"
							src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
						/>
					</div>

					{/* 5 Stars and Text */}
					<div className="flex items-center gap-1.5">
						<div className="flex items-center text-amber-400">
							<Star className="size-3.5 fill-amber-400 text-amber-400" />
							<Star className="size-3.5 fill-amber-400 text-amber-400" />
							<Star className="size-3.5 fill-amber-400 text-amber-400" />
							<Star className="size-3.5 fill-amber-400 text-amber-400" />
							<Star className="size-3.5 fill-amber-400 text-amber-400" />
						</div>
						<span className="font-medium text-hero-muted text-xs tracking-tight">
							Join Over 300+ Founders
						</span>
					</div>
				</div>

				{/* Main Headline */}
				<h1
					className="rise mt-8 max-w-4xl font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]"
					style={{ animationDelay: "60ms" }}
				>
					Fast Track Your Growth Inside
					<br className="hidden sm:inline" />{" "}
					<span className="bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
						Ecom&apos;s Most Powerful Academy
					</span>
				</h1>

				{/* Sub-headline */}
				<p
					className="rise mt-5 font-semibold text-purple-200/95 text-base sm:text-lg tracking-tight"
					style={{ animationDelay: "100ms" }}
				>
					eCommerce Education &amp; Systems Trusted by 300+ Six, Seven &amp; Eight Figure Founders
				</p>

				{/* Body copy */}
				<p
					className="rise mt-3 max-w-2xl text-purple-200/80 text-sm sm:text-base leading-relaxed"
					style={{ animationDelay: "140ms" }}
				>
					Edgecoms Academy is where ecom founders go to get &ldquo;unstuck&rdquo; and unlock real explosive growth.
					Master product research, high-converting store architecture, and profitable Meta Ads across {totalLessons} actionable lessons.
				</p>

				{/* CTA Section */}
				<div
					className="rise mt-8 flex flex-col items-center gap-6"
					style={{ animationDelay: "180ms" }}
				>
					<Link
						className="group inline-flex items-center gap-2.5 rounded-xl bg-hero-cta-bg px-8 py-3.5 font-bold text-hero-cta-fg text-sm sm:text-base shadow-xl shadow-yellow-500/20 transition-all hover:bg-hero-cta-hover hover:shadow-yellow-500/30 hover:scale-[1.02] active:scale-[0.99]"
						href="/academy/access"
					>
						<span>Apply Now</span>
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
					</Link>
					<span className="font-mono text-purple-200/70 text-xs tracking-wider uppercase">
						100% Free · No Payment · No Credit Card Required
					</span>
				</div>

				{/* Brand Logos Bar */}
				<div
					className="rise mt-16 sm:mt-20 w-full pt-10 border-t border-white/10"
					style={{ animationDelay: "220ms" }}
				>
					<p className="font-mono text-[11px] uppercase tracking-widest text-purple-200/50 mb-6">
						Proven systems powering high-growth direct-to-consumer brands
					</p>
					<div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
						<div className="flex w-max animate-marquee py-2 opacity-75 grayscale contrast-125 transition-opacity hover:opacity-95">
							{/* Group 1 */}
							<div className="flex shrink-0 items-center justify-around gap-10 sm:gap-14 pr-10 sm:pr-14">
								{BRAND_LOGOS.map((brand) => (
									<span
										className={`${brand.style} text-white/85 select-none transition-colors hover:text-white shrink-0`}
										key={brand.name}
									>
										{brand.name === "DAILYPUZZLES" ? (
											<>
												<span className="inline-flex size-3.5 bg-gradient-to-br from-amber-400 via-rose-500 to-cyan-400 rounded-xs" />
												<span>DAILYPUZZLES</span>
											</>
										) : (
											brand.name
										)}
									</span>
								))}
							</div>
							{/* Group 2 (identical duplicate for seamless infinite loop) */}
							<div
								aria-hidden="true"
								className="flex shrink-0 items-center justify-around gap-10 sm:gap-14 pr-10 sm:pr-14"
							>
								{BRAND_LOGOS.map((brand, idx) => (
									<span
										className={`${brand.style} text-white/85 select-none transition-colors hover:text-white shrink-0`}
										key={`${brand.name}-duplicate-${idx}`}
									>
										{brand.name === "DAILYPUZZLES" ? (
											<>
												<span className="inline-flex size-3.5 bg-gradient-to-br from-amber-400 via-rose-500 to-cyan-400 rounded-xs" />
												<span>DAILYPUZZLES</span>
											</>
										) : (
											brand.name
										)}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
