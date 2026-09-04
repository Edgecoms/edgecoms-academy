"use client";

import { useEffect } from "react";

import { type MetaPixelContentParams, trackEvent } from "@/lib/meta-pixel";

/**
 * Invisible client component that fires a Meta Pixel `ViewContent` event once
 * on mount. Drop it into any server-rendered page to track content views.
 */
export function TrackViewContent(props: MetaPixelContentParams) {
	useEffect(() => {
		trackEvent("ViewContent", props);
		// Fire once on mount — props are stable from the server
		// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally fire once on mount with initial props
	}, []);

	return null;
}
