import type { Metadata } from "next";

import { SignOutButton } from "@/components/academy/sign-out-button";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
	robots: { follow: false, index: false },
	title: "Dashboard",
};

export default async function DashboardPage() {
	const session = await requireSession();

	return (
		<main className="mx-auto flex min-h-svh w-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
			<p className="text-eyebrow text-muted-foreground uppercase">
				Edgecoms Academy
			</p>
			<h1 className="text-title">
				Welcome back{session.user.name ? `, ${session.user.name}` : ""}.
			</h1>
			<p className="text-muted-foreground text-sm">
				Signed in as {session.user.email}. Courses land in Phase 4.
			</p>
			<div>
				<SignOutButton />
			</div>
		</main>
	);
}
