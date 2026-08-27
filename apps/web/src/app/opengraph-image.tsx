import { ImageResponse } from "next/og";

import { getCourseTotals } from "@/content";

const COURSE_SLUG = "shopify-ecommerce";

export const alt = "Edgecoms Academy: build your Shopify business from zero";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default function OpengraphImage() {
	const totals = getCourseTotals(COURSE_SLUG);

	return new ImageResponse(
		<div
			style={{
				background: "#0a0a0a",
				color: "#fafafa",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "space-between",
				padding: "80px",
				width: "100%",
			}}
		>
			<div style={{ color: "#a1a1aa", fontSize: 24, letterSpacing: "0.16em" }}>
				EDGECOMS ACADEMY
			</div>
			<div
				style={{
					fontSize: 76,
					letterSpacing: "-0.03em",
					lineHeight: 1.1,
					maxWidth: 900,
				}}
			>
				Build your Shopify business from zero.
			</div>
			<div
				style={{ color: "#a1a1aa", display: "flex", fontSize: 24, gap: "32px" }}
			>
				<span>{totals.lessons} lessons</span>
				<span>{totals.modules} modules</span>
				<span>Free</span>
			</div>
		</div>,
		size
	);
}
