import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	description:
		"Free, practical ecommerce education covering product research, Shopify stores, and Meta Ads.",
	title: "Build your Shopify business from zero",
};

export default function AcademyPage() {
	return (
		<main className="mx-auto flex min-h-svh w-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
			<p className="text-eyebrow text-muted-foreground uppercase">
				Edgecoms Academy
			</p>
			<h1 className="text-display">Build your Shopify business from zero.</h1>
			<p className="max-w-xl text-muted-foreground text-prose">
				Free, practical ecommerce education covering how to find products worth
				selling, build a Shopify store, and run Meta Ads that acquire customers.
			</p>
			<div>
				<Link
					className="inline-flex h-10 items-center bg-primary px-4 text-primary-foreground text-sm hover:bg-primary/80"
					href="/academy/access"
				>
					Start learning
				</Link>
			</div>
		</main>
	);
}
