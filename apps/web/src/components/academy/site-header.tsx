import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 border-border/60 border-b bg-background/90 backdrop-blur-md transition-colors">
			<div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
				{/* Left: Boxed Logo Emblem */}
				<Link
					className="group flex items-center transition-transform hover:scale-[1.02]"
					href="/academy"
				>
					<div className="relative flex flex-col items-start border-2 border-foreground px-2.5 py-1 font-black font-mono text-foreground uppercase leading-none tracking-tighter">
						<span className="font-extrabold text-[10px] leading-tight tracking-widest">
							EDGECOMS
						</span>
						<span className="font-black text-xs leading-tight tracking-wider">
							ACADEMY
						</span>
					</div>
				</Link>

				{/* Center: Navigation Links */}
				<nav className="hidden items-center gap-7 font-medium text-sm md:flex">
					<Link
						className="font-semibold text-foreground underline decoration-2 decoration-purple-600 underline-offset-8 transition-colors"
						href="/academy"
					>
						Home
					</Link>
					<Link
						className="text-muted-foreground transition-colors hover:text-foreground"
						href="#the-model"
					>
						About
					</Link>
					<Link
						className="text-muted-foreground transition-colors hover:text-foreground"
						href="#mentors"
					>
						Mentors
					</Link>
					<Link
						className="text-muted-foreground transition-colors hover:text-foreground"
						href="#stories"
					>
						Community
					</Link>
					<Link
						className="text-muted-foreground transition-colors hover:text-foreground"
						href="#faq"
					>
						FAQ
					</Link>
					<Link
						className="text-muted-foreground transition-colors hover:text-foreground"
						href="/academy/courses/shopify-ecommerce"
					>
						Curriculum
					</Link>
				</nav>

				{/* Right: Mode Toggle + Apply Now Button */}
				<div className="flex items-center gap-3">
					<ModeToggle />
					<Link
						className="inline-flex items-center gap-2 rounded-xl bg-[#281347] px-5 py-2 font-semibold text-white text-xs shadow-md transition-all hover:scale-[1.02] hover:bg-[#361960] active:scale-[0.99] sm:text-sm"
						href="/academy/access"
					>
						<span>Apply Now</span>
						<ArrowRight className="size-3.5" />
					</Link>
				</div>
			</div>
		</header>
	);
}
