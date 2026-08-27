import { SidebarTrigger } from "@edgecoms-academy/ui/components/sidebar";

import { ModeToggle } from "@/components/mode-toggle";

interface LearnTopBarProps {
	action: React.ReactNode;
	trail: React.ReactNode;
}

export function LearnTopBar({ action, trail }: LearnTopBarProps) {
	return (
		<header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-border border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
			<SidebarTrigger className="md:hidden" />
			<div className="min-w-0 flex-1">{trail}</div>
			<div className="flex shrink-0 items-center gap-2">
				<ModeToggle />
				{action}
			</div>
		</header>
	);
}
