import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const BOTTOM_BRANDS = [
	{
		name: "DAILYPUZZLES",
		style:
			"font-black tracking-tight text-xs uppercase flex items-center gap-1",
	},
	{ name: "Comfrt", style: "font-semibold tracking-normal text-sm" },
	{ name: "HOTSNAP", style: "font-black tracking-widest text-xs uppercase" },
	{ name: "OiOi", style: "font-extrabold tracking-tight text-base" },
	{ name: "Otaa", style: "font-serif italic font-bold tracking-tight text-lg" },
	{ name: "Mimi & Co.", style: "font-serif italic tracking-wide text-sm" },
	{
		name: "contour cube®",
		style: "font-bold tracking-tight text-xs lowercase",
	},
	{ name: "35MM CO.", style: "font-mono font-black tracking-wider text-xs" },
];

export function EnrollmentCtaSection() {
	return (
		<section className="relative overflow-hidden border-purple-900/40 border-t bg-gradient-to-b from-[#220743] via-[#1a0434] to-[#100220] py-20 text-hero-foreground sm:py-28 lg:py-32">
			{/* Ambient Purple Glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-60 mix-blend-screen"
			>
				<div className="size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.3)_0%,rgba(147,51,234,0.12)_45%,transparent_70%)] blur-3xl sm:size-[48rem]" />
			</div>

			<div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6">
				{/* Headline */}
				<h2 className="max-w-3xl font-extrabold text-3xl text-white leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
					Applications for Enrollment Now Open
				</h2>

				{/* Subheadline */}
				<p className="mt-4 max-w-xl font-medium text-purple-200/80 text-sm sm:text-base">
					Schedule your Welcome Call now to apply, or get instant access to the
					curriculum.
				</p>

				{/* Yellow CTA Button */}
				<div className="mt-8 flex flex-col items-center gap-4">
					<Link
						className="group inline-flex items-center gap-2.5 rounded-xl bg-hero-cta-bg px-8 py-3.5 font-bold text-hero-cta-fg text-sm shadow-xl shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:bg-hero-cta-hover active:scale-[0.99] sm:text-base"
						href="/academy/access"
					>
						<span>Apply Now</span>
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
					</Link>

					{/* Social Proof Pill below CTA */}
					<div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
						{/* Avatar stack */}
						<div className="flex -space-x-1.5 overflow-hidden">
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border border-purple-900 object-cover"
								src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
							/>
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border border-purple-900 object-cover"
								src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
							/>
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border border-purple-900 object-cover"
								src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
							/>
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border border-purple-900 object-cover"
								src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
							/>
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border border-purple-900 object-cover"
								src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
							/>
						</div>
						{/* 5 Stars + Text */}
						<div className="flex items-center gap-1">
							<div className="flex items-center text-amber-400">
								<Star className="size-3 fill-amber-400 text-amber-400" />
								<Star className="size-3 fill-amber-400 text-amber-400" />
								<Star className="size-3 fill-amber-400 text-amber-400" />
								<Star className="size-3 fill-amber-400 text-amber-400" />
								<Star className="size-3 fill-amber-400 text-amber-400" />
							</div>
							<span className="font-medium text-purple-200/80 text-xs">
								Join Over 300+ Founders
							</span>
						</div>
					</div>
				</div>

				{/* Brand Logos Bar */}
				<div className="mt-14 w-full border-white/10 border-t pt-10 sm:mt-18">
					<div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-75 contrast-125 grayscale transition-opacity hover:opacity-95 sm:gap-x-12">
						{BOTTOM_BRANDS.map((brand) => (
							<span
								className={`${brand.style} select-none text-white/80 transition-colors hover:text-white`}
								key={brand.name}
							>
								{brand.name === "DAILYPUZZLES" ? (
									<>
										<span className="inline-flex size-3 rounded-xs bg-gradient-to-br from-amber-400 via-rose-500 to-cyan-400" />
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
		</section>
	);
}
