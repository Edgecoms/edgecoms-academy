import { SiteFooter } from "@/components/academy/site-footer";
import { SiteHeader } from "@/components/academy/site-header";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-svh flex-col">
			<SiteHeader />
			{children}
			<SiteFooter />
		</div>
	);
}
