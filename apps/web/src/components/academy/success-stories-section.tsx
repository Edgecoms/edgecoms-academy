import { ArrowRight, ExternalLink, Star, TrendingUp } from "lucide-react";
import Link from "next/link";

export function SuccessStoriesSection() {
	return (
		<section
			className="relative overflow-hidden border-purple-900/40 border-t bg-gradient-to-b from-hero-bg-to via-[#240845] to-hero-bg-to py-20 text-hero-foreground sm:py-28 lg:py-32"
			id="stories"
		>
			{/* Ambient Purple Glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-50 mix-blend-screen"
			>
				<div className="size-[35rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.25)_0%,rgba(147,51,234,0.1)_45%,transparent_75%)] blur-3xl sm:size-[50rem]" />
			</div>

			<div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
				{/* Top Social Proof Header */}
				<div className="mx-auto flex max-w-3xl flex-col items-center text-center">
					{/* Avatars Stack + Stars */}
					<div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-hero-border bg-hero-badge-bg px-4 py-1.5 shadow-md backdrop-blur-md">
						<div className="flex -space-x-2 overflow-hidden">
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border-2 border-purple-900 object-cover sm:size-7"
								src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
							/>
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border-2 border-purple-900 object-cover sm:size-7"
								src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
							/>
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border-2 border-purple-900 object-cover sm:size-7"
								src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
							/>
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border-2 border-purple-900 object-cover sm:size-7"
								src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
							/>
							<img
								alt="Member avatar"
								className="inline-block size-6 rounded-full border-2 border-purple-900 object-cover sm:size-7"
								src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
							/>
						</div>
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

					{/* Headline */}
					<h2 className="mt-8 font-extrabold text-3xl text-white leading-[1.14] tracking-tight sm:text-5xl">
						We&apos;ve Helped Hundreds of Brands Like Yours and Want You to be
						Our Next Success Story
					</h2>

					{/* Subhead */}
					<p className="mt-4 text-purple-200/85 text-sm leading-relaxed sm:text-base">
						Join the hundreds of other founders who&apos;ve unlocked explosive
						growth inside Edgecoms Academy.
					</p>

					{/* Yellow Action CTA Button */}
					<div className="mt-8 flex flex-col items-center gap-3">
						<Link
							className="group inline-flex items-center gap-2.5 rounded-xl bg-hero-cta-bg px-8 py-3.5 font-bold text-hero-cta-fg text-sm shadow-xl shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:bg-hero-cta-hover active:scale-[0.99] sm:text-base"
							href="/academy/access"
						>
							<span>Apply Now</span>
							<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
						</Link>

						<Link
							className="inline-flex items-center gap-1 font-medium text-purple-200/80 text-xs transition-colors hover:text-white sm:text-sm"
							href="/academy/access"
						>
							<span>See All Member Feedback</span>
							<ExternalLink className="size-3.5" />
						</Link>
					</div>
				</div>

				{/* Bento / Masonry Success Stories Grid */}
				<div className="mt-16 grid grid-cols-1 items-start gap-5 sm:mt-20 md:grid-cols-3">
					{/* Column 1 */}
					<div className="flex flex-col gap-5">
						{/* James Card */}
						<div className="rounded-2xl border border-purple-800/40 bg-gradient-to-b from-[#240a43]/90 to-[#17032c]/95 p-6 shadow-xl backdrop-blur-md transition-all hover:border-purple-600/50">
							<div className="mb-4 flex items-center gap-1 text-amber-400">
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
							</div>

							<blockquote className="font-medium text-purple-100/90 text-xs italic leading-relaxed sm:text-sm">
								&ldquo;Just ticked past our best month ever! Numbers up on last
								year too:
								<br />
								<span className="mt-2 block font-semibold text-white not-italic">
									• Sales: +355%
									<br />• Traffic: +374%
									<br />• Orders: +334%
									<br />• AOV: +9% | COGS: -4%
								</span>
								<span className="mt-1 block">
									All whilst maintaining target MER.&rdquo;
								</span>
							</blockquote>

							<div className="mt-5 flex items-center gap-3 border-purple-800/40 border-t pt-4">
								<img
									alt="James"
									className="size-10 rounded-full border border-purple-500/40 object-cover"
									src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
								/>
								<div>
									<h3 className="font-bold text-sm text-white">James</h3>
									<p className="text-purple-300/80 text-xs">
										Cofounder of The Neighbors Cellar
									</p>
								</div>
							</div>
						</div>

						{/* Member Spotlight Card 1 */}
						<div className="group relative overflow-hidden rounded-2xl border border-purple-800/40 bg-gradient-to-b from-[#240a43] to-[#150228] shadow-xl">
							<div className="relative aspect-video overflow-hidden">
								<img
									alt="Member operations snapshot"
									className="size-full object-cover opacity-85 contrast-110 grayscale transition-transform duration-500 group-hover:scale-105"
									src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#16032d] via-transparent to-black/20" />
							</div>
							<div className="p-4">
								<p className="font-semibold text-white text-xs">
									🚨 &ldquo;This is what 12 months inside has done to our
									business&rdquo;
								</p>
							</div>
						</div>

						{/* Isabella Card */}
						<div className="rounded-2xl border border-purple-800/40 bg-gradient-to-b from-[#240a43]/90 to-[#17032c]/95 p-6 shadow-xl backdrop-blur-md transition-all hover:border-purple-600/50">
							<div className="mb-4 flex items-center gap-1 text-amber-400">
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
							</div>

							<blockquote className="font-medium text-purple-100/90 text-xs italic leading-relaxed sm:text-sm">
								&ldquo;Now with Black Friday officially over, very happy to
								share we&apos;ve{" "}
								<strong className="font-bold text-white not-italic">
									DOUBLED our 2023 Black Friday
								</strong>
								. Special thanks to the mentors for holding my hand the whole
								way and always being so responsive.&rdquo;
							</blockquote>

							<div className="mt-5 flex items-center gap-3 border-purple-800/40 border-t pt-4">
								<img
									alt="Isabella"
									className="size-10 rounded-full border border-purple-500/40 object-cover"
									src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
								/>
								<div>
									<h3 className="font-bold text-sm text-white">Isabella</h3>
									<p className="text-purple-300/80 text-xs">Co-owner of OiOi</p>
								</div>
							</div>
						</div>
					</div>

					{/* Column 2 */}
					<div className="flex flex-col gap-5">
						{/* 6-Figure Day Revenue Chart Card */}
						<div className="rounded-2xl border border-purple-800/40 bg-gradient-to-b from-[#240a43]/90 to-[#17032c]/95 p-5 shadow-xl backdrop-blur-md">
							<div className="mb-4 border-purple-800/40 border-b pb-3">
								<p className="font-semibold text-white text-xs">
									&ldquo;First 6 fig day guys! Tyvm for helping us plan our
									business. The advice is golden.&rdquo;
								</p>
								<span className="font-mono text-[10px] text-purple-300/70">
									Verified Member Win · analytics.png
								</span>
							</div>

							{/* Simulated Chart Container */}
							<div className="rounded-xl border border-purple-700/30 bg-black/40 p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<TrendingUp className="size-4 text-emerald-400" />
										<span className="font-bold text-emerald-400 text-sm">
											$108,492.14
										</span>
									</div>
									<span className="rounded border border-emerald-800/40 bg-emerald-950/60 px-1.5 py-0.5 font-mono text-[10px] text-emerald-400">
										+412% vs last mo
									</span>
								</div>
								{/* Stylized SVG Growth Curve */}
								<div className="mt-4 h-28 w-full">
									<svg
										className="size-full overflow-visible"
										preserveAspectRatio="none"
										viewBox="0 0 100 40"
									>
										<defs>
											<linearGradient
												id="chartGrad"
												x1="0"
												x2="0"
												y1="0"
												y2="1"
											>
												<stop
													offset="0%"
													stopColor="#38bdf8"
													stopOpacity="0.4"
												/>
												<stop
													offset="100%"
													stopColor="#38bdf8"
													stopOpacity="0"
												/>
											</linearGradient>
										</defs>
										<path
											d="M 0 35 Q 15 32, 30 30 T 60 18 T 80 8 T 100 2 L 100 40 L 0 40 Z"
											fill="url(#chartGrad)"
										/>
										<path
											d="M 0 35 Q 15 32, 30 30 T 60 18 T 80 8 T 100 2"
											fill="none"
											stroke="#38bdf8"
											strokeWidth="2.5"
										/>
									</svg>
								</div>
								<div className="mt-2 flex justify-between font-mono text-[9px] text-purple-300/50">
									<span>Week 1</span>
									<span>Week 2</span>
									<span>Week 3</span>
									<span>Week 4</span>
								</div>
							</div>
						</div>

						{/* Long Form Community Post Card */}
						<div className="rounded-2xl border border-purple-800/40 bg-gradient-to-b from-[#240a43]/90 to-[#17032c]/95 p-6 shadow-xl backdrop-blur-md">
							<div className="mb-3 flex items-center gap-1 text-amber-400">
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
							</div>

							<h4 className="mb-2 font-bold text-white text-xs sm:text-sm">
								&ldquo;Shoutout to the team for helping me structure my Facebook
								ad strategy!&rdquo;
							</h4>

							<p className="space-y-2 text-[11px] text-purple-200/80 leading-relaxed sm:text-xs">
								<span>
									We had our <strong>BIGGEST month in June</strong> after one
									year of virtually no growth. 🎉{" "}
									<strong>40% revenue gains in month #1</strong> of implementing
									the playbook! No promos, no extra discounts. Everything the
									same, only ad strategy and product offer changed.
								</span>
								<span className="mt-2 block">
									The best part is the ad accounts performed so well that I
									didn&apos;t have to touch them for 5 entire weeks while on
									holiday with my family. Truly life-changing!
								</span>
							</p>
						</div>
					</div>

					{/* Column 3 */}
					<div className="flex flex-col gap-5">
						{/* Gemma Card */}
						<div className="rounded-2xl border border-purple-800/40 bg-gradient-to-b from-[#240a43]/90 to-[#17032c]/95 p-6 shadow-xl backdrop-blur-md transition-all hover:border-purple-600/50">
							<div className="mb-4 flex items-center gap-1 text-amber-400">
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
								<Star className="size-3.5 fill-amber-400 text-amber-400" />
							</div>

							<blockquote className="font-medium text-purple-100/90 text-xs italic leading-relaxed sm:text-sm">
								&ldquo;I was struggling to find the right place for me in the
								ecom world, but I&apos;ve found that within Edgecoms
								Academy.&rdquo;
							</blockquote>

							<div className="mt-5 flex items-center gap-3 border-purple-800/40 border-t pt-4">
								<img
									alt="Gemma"
									className="size-10 rounded-full border border-purple-500/40 object-cover"
									src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
								/>
								<div>
									<h3 className="font-bold text-sm text-white">Gemma</h3>
									<p className="text-purple-300/80 text-xs">
										Founder of Luscious Living Co
									</p>
								</div>
							</div>
						</div>

						{/* George Card (Results + Quote) */}
						<div className="rounded-2xl border border-purple-800/40 bg-gradient-to-b from-[#240a43]/90 to-[#17032c]/95 p-6 shadow-xl backdrop-blur-md">
							<p className="mb-3 font-mono font-semibold text-[11px] text-purple-300/70 uppercase tracking-wider">
								Verified Results:
							</p>
							<ul className="mb-4 space-y-1.5 text-purple-100 text-xs">
								<li>1. Conversion rate increased by 50% 🚀</li>
								<li>2. Averaging 4.5 ROAS across all ads</li>
								<li>3. Became profitable company-wide</li>
							</ul>

							<blockquote className="border-purple-800/40 border-t pt-3 text-purple-200/90 text-xs italic leading-relaxed">
								&ldquo;...from operating out of our parents&apos; garage to
								moving into the 2-story warehouse we&apos;re in now.&rdquo;
							</blockquote>

							<div className="mt-4 flex items-center gap-3">
								<img
									alt="George"
									className="size-9 rounded-full border border-purple-500/40 object-cover"
									src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
								/>
								<div>
									<h3 className="font-bold text-white text-xs">George</h3>
									<p className="text-[10px] text-purple-300/80">
										Cofounder of The Neighbors Cellar
									</p>
								</div>
							</div>
						</div>

						{/* Member Spotlight Card 2 */}
						<div className="group relative overflow-hidden rounded-2xl border border-purple-800/40 bg-gradient-to-b from-[#240a43] to-[#150228] shadow-xl">
							<div className="relative aspect-video overflow-hidden">
								<img
									alt="Warehouse and operations expansion"
									className="size-full object-cover opacity-85 contrast-110 grayscale transition-transform duration-500 group-hover:scale-105"
									src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-[#16032d] via-transparent to-black/20" />
							</div>
							<div className="p-4">
								<p className="font-semibold text-white text-xs">
									📦 &ldquo;How we scaled from zero to our first 2-story
									warehouse&rdquo;
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom 'See more' Button */}
				<div className="mt-14 flex justify-center sm:mt-16">
					<Link
						className="inline-flex items-center gap-2 rounded-xl border border-purple-600/40 bg-purple-900/60 px-8 py-3 font-semibold text-sm text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-purple-800/80"
						href="/academy/access"
					>
						<span>See more success stories</span>
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
