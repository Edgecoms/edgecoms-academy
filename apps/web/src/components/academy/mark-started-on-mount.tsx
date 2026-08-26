"use client";

import { useEffect, useRef } from "react";

import { markLessonStarted } from "@/actions/progress";

export function MarkStartedOnMount({
	courseSlug,
	lessonSlug,
}: {
	courseSlug: string;
	lessonSlug: string;
}) {
	const sent = useRef<string | null>(null);

	useEffect(() => {
		const key = `${courseSlug}/${lessonSlug}`;
		if (sent.current === key) {
			return;
		}
		sent.current = key;
		markLessonStarted({ courseSlug, lessonSlug }).catch(() => {
			// progress is best effort; a failed ping must not break playback
		});
	}, [courseSlug, lessonSlug]);

	return null;
}
