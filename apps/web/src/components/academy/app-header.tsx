import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "./user-menu";

interface AppHeaderProps {
	breadcrumb?: React.ReactNode;
	nav?: React.ReactNode;
	user: { name: string; email: string };
}

export function AppHeader({ user, breadcrumb, nav }: AppHeaderProps) {
	return (
		<header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-border border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
			{nav ? <div className="lg:hidden">{nav}</div> : null}
			{breadcrumb}
			<div className="ml-auto flex items-center gap-2">
				<ModeToggle />
				<UserMenu email={user.email} name={user.name} />
			</div>
		</header>
	);
}
