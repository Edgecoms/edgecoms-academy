import { env } from "@edgecoms-academy/env/web";

// ---------------------------------------------------------------------------
// Global type declaration for Meta Pixel's `fbq` function
// ---------------------------------------------------------------------------
type Fbq = ((...args: unknown[]) => void) & {
	callMethod?: (...args: unknown[]) => void;
	queue?: unknown[];
	loaded?: boolean;
	version?: string;
	push?: (...args: unknown[]) => void;
};

declare global {
	interface Window {
		_fbq?: Fbq;
		fbq?: Fbq;
	}
}

// ---------------------------------------------------------------------------
// Meta Pixel standard event parameters
// ---------------------------------------------------------------------------
export interface MetaPixelContentParams {
	content_category?: string;
	content_name?: string;
	content_type?: string;
	contents?: Array<{ id: string; quantity: number }>;
	currency?: string;
	value?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const PIXEL_ID = env.NEXT_PUBLIC_META_PIXEL_ID;

/** Returns the `fbq` function if the pixel is loaded, or `undefined`. */
function getFbq(): Fbq | undefined {
	if (!PIXEL_ID || typeof window === "undefined") {
		return;
	}
	return window.fbq;
}

// ---------------------------------------------------------------------------
// Initialise the Meta Pixel (call once, on client mount)
// ---------------------------------------------------------------------------
let initialised = false;

export function initPixel(): void {
	if (!PIXEL_ID || typeof window === "undefined" || initialised) {
		return;
	}

	// Already initialised by another script
	if (window.fbq) {
		return;
	}

	// Meta Pixel base code (identical to the snippet from Events Manager)
	const n: Fbq = (...args: unknown[]) => {
		if (n.callMethod) {
			n.callMethod(...args);
		} else {
			n.queue?.push(args);
		}
	};
	n.push = n as unknown as (...args: unknown[]) => void;
	n.loaded = true;
	n.version = "2.0";
	n.queue = [];

	window.fbq = n;
	window._fbq = n;

	const s = document.createElement("script");
	s.async = true;
	s.src = "https://connect.facebook.net/en_US/fbevents.js";
	const fjs = document.getElementsByTagName("script")[0];
	fjs?.parentNode?.insertBefore(s, fjs);

	window.fbq("init", PIXEL_ID);

	initialised = true;
}

// ---------------------------------------------------------------------------
// Track a PageView (call on every route change)
// ---------------------------------------------------------------------------
export function trackPageView(): void {
	const fbq = getFbq();
	if (!fbq) {
		return;
	}
	fbq("track", "PageView");
}

// ---------------------------------------------------------------------------
// Track a standard or custom event
// ---------------------------------------------------------------------------
export function trackEvent(
	eventName: string,
	params?: MetaPixelContentParams
): void {
	const fbq = getFbq();
	if (!fbq) {
		return;
	}
	if (params) {
		fbq("track", eventName, params);
	} else {
		fbq("track", eventName);
	}
}

// ---------------------------------------------------------------------------
// Track a custom event (uses `trackCustom` instead of `track`)
// ---------------------------------------------------------------------------
export function trackCustomEvent(
	eventName: string,
	params?: Record<string, unknown>
): void {
	const fbq = getFbq();
	if (!fbq) {
		return;
	}
	if (params) {
		fbq("trackCustom", eventName, params);
	} else {
		fbq("trackCustom", eventName);
	}
}

// ---------------------------------------------------------------------------
// Expose PIXEL_ID for the noscript fallback image
// ---------------------------------------------------------------------------
export { PIXEL_ID };
