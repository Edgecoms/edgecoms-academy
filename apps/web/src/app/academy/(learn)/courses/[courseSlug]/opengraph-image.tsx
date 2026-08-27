import { ImageResponse } from "next/og";

import { getCourse, getCourses, getCourseTotals } from "@/content";

export const alt = "Edgecoms Academy course";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export function generateStaticParams() {
	return getCourses().map((course) => ({ courseSlug: course.slug }));
}

export default async function CourseOpengraphImage({
	params,
}: {
	params: Promise<{ courseSlug: string }>;
}) {
	const { courseSlug } = await params;
	const course = getCourse(courseSlug);
	const totals = getCourseTotals(courseSlug);

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
					fontSize: 72,
					letterSpacing: "-0.03em",
					lineHeight: 1.1,
					maxWidth: 900,
				}}
			>
				{course?.tagline ?? "Free ecommerce education"}
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
