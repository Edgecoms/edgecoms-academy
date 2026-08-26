"use client";

import { Button } from "@edgecoms-academy/ui/components/button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
	const router = useRouter();

	const signOut = useCallback(async () => {
		await authClient.signOut();
		router.push("/academy");
		router.refresh();
	}, [router]);

	return (
		<Button onClick={signOut} variant="outline">
			Sign out
		</Button>
	);
}
