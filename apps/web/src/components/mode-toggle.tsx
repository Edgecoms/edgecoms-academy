"use client";

import { Button } from "@edgecoms-academy/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@edgecoms-academy/ui/components/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";

const THEMES = ["light", "dark", "system"] as const;

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button size="icon" variant="outline" />}>
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<span className="sr-only">Toggle theme</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{THEMES.map((theme) => (
					<ThemeItem key={theme} onSelect={setTheme} theme={theme} />
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function ThemeItem({
	theme,
	onSelect,
}: {
	theme: (typeof THEMES)[number];
	onSelect: (theme: string) => void;
}) {
	const select = useCallback(() => onSelect(theme), [onSelect, theme]);

	return (
		<DropdownMenuItem className="capitalize" onClick={select}>
			{theme}
		</DropdownMenuItem>
	);
}
