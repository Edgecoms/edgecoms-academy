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
				<nav className="flex items-center gap-6">
					<Link
						className="hidden text-muted-foreground text-sm transition-colors hover:text-foreground sm:block"
						href="/academy/courses/shopify-ecommerce"
					>
						Curriculum
					</Link>
					<Link
						className="inline-flex h-8 items-center bg-primary px-3 font-medium text-primary-foreground text-sm transition-opacity hover:opacity-85"
						href="/academy/access"
					>
						Start learning
					</Link>
				</nav>
			</div>
		</header>
	);
}
