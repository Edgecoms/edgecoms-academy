import { cn } from "@edgecoms-academy/ui/lib/utils";
import { Check, Play } from "lucide-react";
import Link from "next/link";

import { lessonIcon } from "./lesson-icon";

const LESSON_THUMBNAILS: Record<string, string> = {
	"introduction-to-dropshipping":
		"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
	"ecommerce-business-models":
		"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
	"choosing-your-niche":
		"https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
	"finding-winning-products":
		"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
	"shopify-account-setup":
		"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
	"us-business-entity":
		"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
	"store-build-introduction":
		"https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
	"shopify-backend-setup":
		"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
	"products-and-themes":
		"https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
	"product-hero-images":
		"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80",
	"installing-conversion-apps":
		"https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&auto=format&fit=crop&q=80",
	"configuring-conversion-apps":
		"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
	"install-trackproof":
		"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
	"meta-ads-account-setup":
		"https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=600&auto=format&fit=crop&q=80",
	"meta-ads-fundamentals":
		"https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&auto=format&fit=crop&q=80",
	"launching-your-first-campaign":
		"https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
	"monitor-and-analyze-meta-ads":
		"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
};

const DEFAULT_THUMBNAIL =
	"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80";

interface LessonCardProps {
	completed?: boolean;
	courseSlug: string;
	slug: string;
	summary: string;
	title: string;
}

export function LessonCard({
	completed,
	courseSlug,
	slug,
	summary,
	title,
}: LessonCardProps) {
	const Icon = lessonIcon(slug);
	const thumbnail = LESSON_THUMBNAILS[slug] ?? DEFAULT_THUMBNAIL;

	return (
		<Link
			className={cn(
				"group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-xs transition-all duration-300",
				"hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/15 dark:hover:shadow-purple-950/30",
				"focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
			)}
			href={`/academy/courses/${courseSlug}/${slug}`}
		>
			{/* Top Video Thumbnail Box */}
			<div className="relative flex h-36 sm:h-40 items-start justify-between overflow-hidden border-border/60 border-b bg-muted/40 p-4">
				{/* Thumbnail Image with Greyscale to Bloom Transition */}
				<img
					alt={title}
					className="absolute inset-0 size-full object-cover grayscale opacity-35 dark:opacity-25 transition-all duration-500 group-hover:scale-110 group-hover:opacity-85 group-hover:grayscale-0"
					src={thumbnail}
				/>

				{/* Default Overlay & Light Greying / Frosted Hover Gradient */}
				<div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-800/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[1px]" />

				{/* Top-Left Category Badge */}
				<div className="relative z-10 flex items-center gap-1.5 rounded-lg bg-background/85 dark:bg-black/70 px-2.5 py-1 backdrop-blur-md border border-border/60 text-muted-foreground group-hover:border-purple-400/40 group-hover:text-foreground transition-all">
					<Icon
						aria-hidden="true"
						className="size-3.5 text-purple-600 dark:text-purple-400"
						strokeWidth={2}
					/>
					<span className="font-mono text-[10px] font-semibold tracking-wide uppercase">
						Lesson
					</span>
				</div>

				{/* Center Play Button Floating on Hover */}
				<div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
					<div className="flex size-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/60 text-white shadow-xl shadow-black/40">
						<Play className="size-4 fill-white translate-x-0.5" />
					</div>
				</div>

				{/* Top-Right Completed Badge */}
				{completed ? (
					<span
						className="relative z-10 flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md"
						title="Completed"
					>
						<Check className="size-3 text-white" strokeWidth={3} />
					</span>
				) : null}
			</div>

			{/* Bottom Content Info */}
			<div className="flex flex-1 flex-col p-4 sm:p-5">
				<h3 className="font-bold text-sm tracking-tight text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
					{title}
				</h3>
				<p className="mt-2 line-clamp-2 text-muted-foreground text-xs sm:text-sm leading-relaxed">
					{summary}
				</p>
			</div>
		</Link>
	);
}
