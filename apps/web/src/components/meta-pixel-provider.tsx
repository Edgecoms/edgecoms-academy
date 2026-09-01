"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { PIXEL_ID, initPixel, trackPageView } from "@/lib/meta-pixel";

/**
 * Initialises the Meta Pixel on mount and fires a `PageView` event on every
 * client-side route change. Place in the root layout alongside `<Providers>`.
 *
 * When `NEXT_PUBLIC_META_PIXEL_ID` is not set, this component renders nothing
 * and does nothing — safe for dev / preview environments.
 */
export function MetaPixelProvider() {
	const pathname = usePathname();
	const lastPathname = useRef(pathname);

	// Initialise pixel once on mount
	useEffect(() => {
		initPixel();
		trackPageView(); // first page load
	}, []);

	// Track subsequent client-side navigations
	useEffect(() => {
		if (pathname !== lastPathname.current) {
			trackPageView();
			lastPathname.current = pathname;
		}
	}, [pathname]);

	// noscript fallback for JS-disabled browsers
	if (!PIXEL_ID) {
		return null;
	}

	return (
		<noscript>
			{/* biome-ignore lint: noscript pixel fallback requires img with empty alt */}
			<img
				alt=""
				height="1"
				src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
				style={{ display: "none" }}
				width="1"
			/>
		</noscript>
	);
}
