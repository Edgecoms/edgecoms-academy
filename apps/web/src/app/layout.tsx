import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import Providers from "@/components/providers";
import "../index.css";

const inter = Inter({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-inter",
});

const geistMono = Geist_Mono({
	display: "swap",
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	description:
		"Free, practical ecommerce education. Build your Shopify business from zero.",
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
			<body className={`${inter.variable} ${geistMono.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
