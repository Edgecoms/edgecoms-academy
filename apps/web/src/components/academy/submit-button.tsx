"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
	children,
	className,
}: {
	children: React.ReactNode;
	className: string;
}) {
	const { pending } = useFormStatus();

	return (
		<button className={className} disabled={pending} type="submit">
			{pending ? <Loader2 className="size-4 animate-spin" /> : null}
			{children}
		</button>
	);
}
