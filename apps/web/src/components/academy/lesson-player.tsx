"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

import { markLessonStarted } from "@/actions/progress";
import type { LessonVideo } from "@/content/types";

const TELLA_PARAMS = "b=0&title=0&wt=0&loop=0";
const DEFAULT_POSTER_RESOLUTION = "1920x1080";

function embedUrl(video: LessonVideo) {
	return `https://www.tella.tv/video/${video.id}/embed?${TELLA_PARAMS}`;
}

function posterUrl(video: LessonVideo) {
	const resolution = video.posterResolution ?? DEFAULT_POSTER_RESOLUTION;
	return `https://www.tella.tv/api/stories/${video.id}/thumb.webp?resolution=${resolution}`;
}

interface LessonPlayerProps {
	courseSlug: string;
	lessonSlug: string;
	title: string;
	video: LessonVideo;
}

export function LessonPlayer({
	video,
	title,
	courseSlug,
	lessonSlug,
}: LessonPlayerProps) {
	const [playing, setPlaying] = useState(false);

	const start = useCallback(() => {
		setPlaying(true);
		markLessonStarted({ courseSlug, lessonSlug }).catch(() => {
			// progress is best effort; a failed ping must not break playback
		});
	}, [courseSlug, lessonSlug]);

	if (playing) {
		return (
			<div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
				<iframe
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className="absolute inset-0 h-full w-full"
					src={embedUrl(video)}
					title={title}
				/>
			</div>
		);
	}

	return (
		<button
			aria-label={`Play: ${title}`}
			className="group relative flex aspect-video w-full items-end overflow-hidden rounded-lg border border-border bg-neutral-950 text-left"
			onClick={start}
			type="button"
		>
			<Image
				alt=""
				className="absolute inset-0 h-full w-full object-cover"
				fill
				sizes="(max-width: 1024px) 100vw, 720px"
				src={posterUrl(video)}
			/>

			<span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

			<span className="relative flex w-full items-end justify-between gap-6 p-6 sm:p-8">
				<span className="max-w-lg font-medium text-2xl text-neutral-50 tracking-tight sm:text-3xl">
					{title}
				</span>
				<span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-neutral-50/95 text-neutral-950 transition-transform duration-200 group-hover:scale-105">
					<Play className="size-5 translate-x-px fill-current" />
				</span>
			</span>
		</button>
	);
}
