import Link from "next/link";

export function SiteFooter() {
	return (
		<footer className="mt-auto border-border border-t">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-muted-foreground text-sm">
					Edgecoms Academy. Free ecommerce education from{" "}
					<a
						className="text-foreground underline underline-offset-4 hover:opacity-70"
						href="https://edgecoms.com"
						rel="noopener"
					>
						Edgecoms
					</a>
					.
				</p>
				<Link
					className="text-muted-foreground text-sm transition-colors hover:text-foreground"
					href="/academy/courses/shopify-ecommerce"
				>
					Browse the curriculum
				</Link>
			</div>
		</footer>
	);
}
