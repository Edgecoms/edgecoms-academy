import { env } from "@edgecoms-academy/env/web";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			allow: "/",
			disallow: ["/api/", "/academy/access"],
			userAgent: "*",
		},
		sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
	};
}
