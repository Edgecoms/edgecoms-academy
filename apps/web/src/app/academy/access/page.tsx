import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AccessForm } from "@/components/academy/access-form";
import { getOptionalSession } from "@/lib/session";

export const metadata: Metadata = {
	robots: { follow: false, index: false },
	title: "Get access",
};

export default async function AccessPage() {
	const session = await getOptionalSession();
	if (session) {
		redirect("/academy/dashboard");
	}

	return (
		<main className="mx-auto flex min-h-svh w-full max-w-sm flex-col justify-center gap-10 px-6 py-16">
			<Link
				className="text-eyebrow text-muted-foreground uppercase hover:text-foreground"
				href="/academy"
			>
				Edgecoms Academy
			</Link>
			<AccessForm />
		</main>
	);
}
