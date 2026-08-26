import { env } from "@edgecoms-academy/env/web";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Providers from "@/components/providers";
import "../index.css";

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	description:
		"Free, practical ecommerce education. Build your Shopify business from zero.",
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: {
		default: "Edgecoms Academy",
		template: "%s | Edgecoms Academy",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
