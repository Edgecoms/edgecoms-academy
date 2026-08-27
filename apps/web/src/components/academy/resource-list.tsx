import { buttonVariants } from "@edgecoms-academy/ui/components/button";
import { cn } from "@edgecoms-academy/ui/lib/utils";
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
								className={cn(
									buttonVariants({ variant: "ghost" }),
									"group h-auto w-full justify-start gap-3 whitespace-normal rounded-none px-2 py-3"
								)}
								href={resource.href}
								rel="noopener"
								target="_blank"
							>
								<Icon className="shrink-0 text-muted-foreground" />
								<span>{resource.label}</span>
								<ArrowUpRight className="ml-auto size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
							</a>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
