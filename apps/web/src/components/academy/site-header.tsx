import { buttonVariants } from "@edgecoms-academy/ui/components/button";
import Link from "next/link";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-border border-b bg-background/80 backdrop-blur-sm">
			<div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
				<Link
					className="font-medium text-sm tracking-tight transition-opacity hover:opacity-70"
					href="/academy"
				>
					Edgecoms Academy
				</Link>
				<nav className="flex items-center gap-2">
					<Link className={buttonVariants()} href="/academy/access">
						Start learning
					</Link>
				</nav>
			</div>
		</header>
	);
}
