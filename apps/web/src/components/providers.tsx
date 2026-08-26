"use client";

import { Toaster } from "@edgecoms-academy/ui/components/sonner";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			disableTransitionOnChange
			enableSystem
		>
			{children}
			<Toaster position="top-center" richColors />
		</ThemeProvider>
	);
}
