import { env } from "@edgecoms-academy/env/web";
import type { MetadataRoute } from "next";

import { getCourses } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = env.NEXT_PUBLIC_APP_URL;

	return [
		{
			changeFrequency: "weekly",
			priority: 1,
			url: `${base}/academy`,
		},
		...getCourses().map((course) => ({
			changeFrequency: "weekly" as const,
			priority: 0.8,
			url: `${base}/academy/courses/${course.slug}`,
		})),
	];
}
