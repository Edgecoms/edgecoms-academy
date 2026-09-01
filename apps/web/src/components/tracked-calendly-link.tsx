"use client";

import { trackEvent } from "@/lib/meta-pixel";

/**
 * External link that fires a Meta Pixel `Schedule` event on click.
 * Used for Calendly "book a call" links.
 */
export function TrackedCalendlyLink({
	children,
	className,
	href,
}: {
	children: React.ReactNode;
	className?: string;
	href: string;
}) {
	return (
		<a
			className={className}
			href={href}
			onClick={() => trackEvent("Schedule")}
			rel="noopener noreferrer"
			target="_blank"
		>
			{children}
		</a>
	);
}
