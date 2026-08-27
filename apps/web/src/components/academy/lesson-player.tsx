"use client";

import { cn } from "@edgecoms-academy/ui/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { LessonVideo } from "@/content/types";

const TELLA_ORIGIN = "https://www.tella.tv";
const TELLA_PARAMS = "b=0&title=0&wt=0&loop=0";
const DEFAULT_POSTER_RESOLUTION = "1920x1080";

/**
 * The embed's own page is `background:#fff` and its poster is fetched after the
 * document loads, so `onLoad` fires while Tella is still showing a blank white
 * page. There is no event published from inside the frame to wait on, so settle
 * briefly before uncovering. Erring long only means holding our own first frame
 * a moment longer, which is invisible; erring short shows the white flash.
 */
const REVEAL_DELAY_MS = 600;

function embedUrl(video: LessonVideo) {
	return `${TELLA_ORIGIN}/video/${video.id}/embed?${TELLA_PARAMS}`;
}

function posterUrl(video: LessonVideo) {
	const resolution = video.posterResolution ?? DEFAULT_POSTER_RESOLUTION;
	return `${TELLA_ORIGIN}/api/stories/${video.id}/thumb.webp?resolution=${resolution}`;
}

interface LessonPlayerProps {
	title: string;
	video: LessonVideo;
}

export function LessonPlayer({ video, title }: LessonPlayerProps) {
	const [revealed, setRevealed] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const onLoad = useCallback(() => {
		timer.current = setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
	}, []);

	useEffect(() => () => clearTimeout(timer.current), []);

	return (
		<>
			{/* hoisted by React; the handshake overlaps the rest of the render */}
			<link href={TELLA_ORIGIN} rel="preconnect" />
			<link href={TELLA_ORIGIN} rel="dns-prefetch" />

			<div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-neutral-950">
				{/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: onLoad is a resource lifecycle event, not a user interaction */}
				<iframe
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="absolute inset-0 h-full w-full"
					onLoad={onLoad}
					src={embedUrl(video)}
					title={title}
				/>

				{/* covers the embed while it paints; clicks pass straight through */}
				<Image
					alt=""
					aria-hidden="true"
					className={cn(
						"pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
						revealed ? "opacity-0" : "opacity-100"
					)}
					fill
					priority
					sizes="(max-width: 1024px) 100vw, 1024px"
					src={posterUrl(video)}
				/>
			</div>
		</>
	);
}
