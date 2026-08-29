import { buttonVariants } from "@edgecoms-academy/ui/components/button";
import { cn } from "@edgecoms-academy/ui/lib/utils";
import Link from "next/link";

export function SiteFooter() {
	return (
		<footer className="mt-auto border-border/60 border-t bg-card/40 transition-colors">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-col gap-1.5">
					<div className="flex items-center gap-2">
						<span className="flex size-6 items-center justify-center rounded bg-primary font-bold text-primary-foreground text-[11px]">
							EA
						</span>
						<span className="font-semibold text-sm tracking-tight text-foreground">
							Edgecoms Academy
						</span>
					</div>
					<p className="text-muted-foreground text-xs sm:text-sm">
						Free, practical ecommerce education from{" "}
						<a
							className="text-foreground underline underline-offset-4 hover:opacity-80 font-medium"
							href="https://edgecoms.app"
							rel="noopener"
							target="_blank"
						>
							Edgecoms
						</a>
						. Build your Shopify business from zero.
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
					<Link
						className="transition-colors hover:text-foreground"
						href="/academy/courses/shopify-ecommerce"
					>
						Browse Curriculum
					</Link>
					<span className="text-border">·</span>
					<a
						className="transition-colors hover:text-foreground"
						href="https://calendly.com/anurag-edgecoms/book-a-free-call"
						rel="noopener"
						target="_blank"
					>
						Book Free Audit
					</a>
					<span className="text-border">·</span>
					<Link
						className="transition-colors hover:text-foreground"
						href="/academy/access"
					>
						Access Course
					</Link>
				</div>
			</div>
		</footer>
	);
}
