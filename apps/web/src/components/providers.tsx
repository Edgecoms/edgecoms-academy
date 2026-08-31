"use client";

import { Toaster } from "@edgecoms-academy/ui/components/sonner";

import { TooltipProvider } from "@edgecoms-academy/ui/components/tooltip";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			disableTransitionOnChange
			enableSystem
		>
			<TooltipProvider>{children}</TooltipProvider>
			<Toaster position="top-center" richColors />
		</ThemeProvider>
	);
}
