"use client";

import { Button } from "@edgecoms-academy/ui/components/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@edgecoms-academy/ui/components/sheet";
import { PanelLeft } from "lucide-react";

export function MobileNavSheet({
	courseTitle,
	children,
}: {
	courseTitle: string;
	children: React.ReactNode;
}) {
	return (
		<Sheet>
			<SheetTrigger
				render={
					<Button
						aria-label="Open lesson navigation"
						size="icon-sm"
						variant="outline"
					/>
				}
			>
				<PanelLeft className="size-4" />
			</SheetTrigger>
			<SheetContent className="w-[19rem] overflow-y-auto" side="left">
				<SheetHeader className="border-border border-b">
					<SheetTitle className="text-sm">{courseTitle}</SheetTitle>
					<SheetDescription className="sr-only">
						Lessons in this course
					</SheetDescription>
				</SheetHeader>
				<div className="px-4 py-5">{children}</div>
			</SheetContent>
		</Sheet>
	);
}
