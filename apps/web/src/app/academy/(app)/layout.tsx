import { requireSession } from "@/lib/session";

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireSession();
	return <>{children}</>;
}
