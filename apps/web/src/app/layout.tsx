import { env } from "@edgecoms-academy/env/web";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { MetaPixelProvider } from "@/components/meta-pixel-provider";
import Providers from "@/components/providers";
import "../index.css";

const inter = localFont({
	display: "swap",
	src: "../assets/fonts/InterVariable.woff2",
	style: "normal",
	variable: "--font-inter",
	weight: "100 900",
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
		<html
			className={`${inter.variable} ${geistMono.variable}`}
			lang="en"
			suppressHydrationWarning
		>
			{/* extensions such as ColorZilla add attributes to body before hydration */}
			<body suppressHydrationWarning>
				<Providers>{children}</Providers>
				<MetaPixelProvider />
			</body>
		</html>
	);
}
