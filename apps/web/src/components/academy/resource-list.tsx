import { ArrowUpRight, Download, FileText } from "lucide-react";
import type { LessonResource } from "@/content/types";

const ICONS = {
	download: Download,
	link: ArrowUpRight,
	template: FileText,
} as const;

export function ResourceList({ resources }: { resources: LessonResource[] }) {
	return (
		<section aria-labelledby="resources-heading">
			<h2 className="font-medium text-sm tracking-tight" id="resources-heading">
				Resources
			</h2>
			<ul className="mt-4 border-border border-t">
				{resources.map((resource) => {
					const Icon = ICONS[resource.kind];
					return (
						<li className="border-border border-b" key={resource.href}>
							<a
								className="group flex items-center gap-3 py-3 text-sm transition-colors hover:text-foreground"
								href={resource.href}
								rel="noopener"
								target="_blank"
							>
								<Icon className="size-4 shrink-0 text-muted-foreground" />
								<span className="text-foreground">{resource.label}</span>
								<ArrowUpRight className="ml-auto size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
							</a>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
