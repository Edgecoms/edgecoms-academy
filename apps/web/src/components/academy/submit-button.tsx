"use client";

import { Button } from "@edgecoms-academy/ui/components/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = React.ComponentProps<typeof Button>;

export function SubmitButton({
	children,
	disabled,
	...props
}: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending || disabled} type="submit" {...props}>
			{pending ? <Loader2 className="animate-spin" /> : null}
			{children}
		</Button>
	);
}
