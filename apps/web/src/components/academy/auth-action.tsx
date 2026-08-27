"use client";

import { buttonVariants } from "@edgecoms-academy/ui/components/button";
import { cn } from "@edgecoms-academy/ui/lib/utils";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { UserMenu } from "./user-menu";

/**
 * The course overview is statically prerendered, so the session cannot be read
 * on the server without turning the whole route dynamic. Resolving it on the
 * client keeps the page static and still gives signed-in readers their menu.
 */
export function AuthAction() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		// same footprint as the resolved control, so the bar does not jump
		return <div aria-hidden="true" className="size-8" />;
	}

	if (session) {
		return (
			<UserMenu email={session.user.email} name={session.user.name ?? ""} />
		);
	}

	return (
		<Link
			className={cn(buttonVariants({ size: "sm" }), "rounded-full px-4")}
			href="/academy/access"
		>
			Start learning
		</Link>
	);
}
