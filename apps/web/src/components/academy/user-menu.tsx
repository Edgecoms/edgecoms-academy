"use client";

import { Button } from "@edgecoms-academy/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@edgecoms-academy/ui/components/dropdown-menu";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { authClient } from "@/lib/auth-client";

export function UserMenu({ name, email }: { name: string; email: string }) {
	const router = useRouter();

	const signOut = useCallback(async () => {
		await authClient.signOut();
		router.push("/academy");
		router.refresh();
	}, [router]);

	const initial = (name || email).charAt(0).toUpperCase();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						aria-label="Account menu"
						className="rounded-full font-medium"
						size="icon-sm"
						variant="outline"
					/>
				}
			>
				{initial}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56 bg-popover">
				<DropdownMenuLabel className="font-normal">
					<span className="block font-medium text-sm">
						{name || "Your account"}
					</span>
					<span className="block truncate text-muted-foreground text-xs">
						{email}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={signOut} variant="destructive">
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
