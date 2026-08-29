"use client";

import { Button } from "@edgecoms-academy/ui/components/button";
import { Input } from "@edgecoms-academy/ui/components/input";
import { Label } from "@edgecoms-academy/ui/components/label";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";

const RESEND_COOLDOWN_SECONDS = 45;
const CODE_LENGTH = 6;
const MIN_PHONE_DIGITS = 8;

interface Requested {
	email: string;
	name: string;
	phone: string;
}

export function AccessForm() {
	const [requested, setRequested] = useState<Requested | null>(null);
	const clearRequested = useCallback(() => setRequested(null), []);

	if (requested) {
		return <CodeStep onBack={clearRequested} requested={requested} />;
	}
	return <EmailStep onRequested={setRequested} />;
}

function EmailStep({
	onRequested,
}: {
	onRequested: (requested: Requested) => void;
}) {
	const [error, submit, pending] = useActionState(
		async (_: string | null, form: FormData) => {
			const email = String(form.get("email")).trim().toLowerCase();
			const name = String(form.get("name")).trim();
			const phone = String(form.get("phone")).trim();

			const { error: sendError } =
				await authClient.emailOtp.sendVerificationOtp({
					email,
					type: "sign-in",
				});
			if (sendError) {
				return (
					sendError.message ??
					"We could not send that code. Try again in a moment."
				);
			}

			onRequested({ email, name, phone });
			return null;
		},
		null
	);

	return (
		<form action={submit} className="flex flex-col gap-6">
			<header className="flex flex-col gap-2">
				<h1 className="font-semibold text-2xl tracking-tight">
					Get your access
				</h1>
				<p className="text-muted-foreground text-sm leading-relaxed">
					Every course is free. Enter your details and we will email you a six
					digit code.
				</p>
			</header>

			<div className="flex flex-col gap-4">
				<Field htmlFor="name" label="First name">
					<Input
						autoComplete="given-name"
						className="h-10 text-sm"
						disabled={pending}
						id="name"
						minLength={2}
						name="name"
						placeholder="Alex"
						required
					/>
				</Field>

				<Field htmlFor="email" label="Email">
					<Input
						autoComplete="email"
						className="h-10 text-sm"
						disabled={pending}
						id="email"
						name="email"
						placeholder="you@example.com"
						required
						type="email"
					/>
				</Field>

				<Field htmlFor="phone" label="Phone number">
					<Input
						autoComplete="tel"
						className="h-10 text-sm"
						disabled={pending}
						id="phone"
						inputMode="tel"
						minLength={MIN_PHONE_DIGITS}
						name="phone"
						placeholder="+91 98765 43210"
						required
						type="tel"
					/>
				</Field>
			</div>

			<FormError message={error} />

			<Button
				className="h-10 w-full text-sm"
				disabled={pending}
				size="lg"
				type="submit"
			>
				{pending ? <Loader2 className="animate-spin" /> : null}
				Email me a code
				{pending ? null : <ArrowRight data-icon="inline-end" />}
			</Button>

			<p className="text-muted-foreground text-xs leading-relaxed">
				No password, no credit card. We use your email to save your progress and
				send course updates.
			</p>
		</form>
	);
}

function CodeStep({
	requested,
	onBack,
}: {
	requested: Requested;
	onBack: () => void;
}) {
	const router = useRouter();
	const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
	const [resendNotice, setResendNotice] = useState<string | null>(null);

	useEffect(() => {
		if (cooldown <= 0) {
			return;
		}
		const timer = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000);
		return () => clearTimeout(timer);
	}, [cooldown]);

	const [error, submit, pending] = useActionState(
		async (_: string | null, form: FormData) => {
			const otp = String(form.get("otp")).trim();

			const { error: verifyError } = await authClient.signIn.emailOtp({
				email: requested.email,
				name: requested.name,
				otp,
				phone: requested.phone,
			});
			if (verifyError) {
				return (
					verifyError.message ??
					"That code did not work. Check it and try again."
				);
			}

			router.push("/academy/courses/shopify-ecommerce");
			router.refresh();
			return null;
		},
		null
	);

	const resend = useCallback(async () => {
		setResendNotice(null);
		const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
			email: requested.email,
			type: "sign-in",
		});
		setCooldown(RESEND_COOLDOWN_SECONDS);
		setResendNotice(
			sendError ? (sendError.message ?? "Could not resend.") : "New code sent."
		);
	}, [requested.email]);

	return (
		<form action={submit} className="flex flex-col gap-6">
			<header className="flex flex-col gap-2">
				<h1 className="font-semibold text-2xl tracking-tight">
					Check your email
				</h1>
				<p className="text-muted-foreground text-sm leading-relaxed">
					We sent a six digit code to{" "}
					<span className="text-foreground">{requested.email}</span>. It expires
					in 10 minutes.
				</p>
			</header>

			<Field htmlFor="otp" label="Access code">
				<Input
					autoComplete="one-time-code"
					autoFocus
					className="h-12 text-center font-mono text-lg tracking-[0.4em]"
					disabled={pending}
					id="otp"
					inputMode="numeric"
					maxLength={CODE_LENGTH}
					minLength={CODE_LENGTH}
					name="otp"
					pattern="[0-9]*"
					placeholder="000000"
					required
				/>
			</Field>

			<FormError message={error} />

			<Button
				className="h-10 w-full text-sm"
				disabled={pending}
				size="lg"
				type="submit"
			>
				{pending ? <Loader2 className="animate-spin" /> : null}
				Start learning
			</Button>

			<div className="flex flex-col gap-3 border-border border-t pt-5">
				<p className="text-muted-foreground text-xs leading-relaxed">
					Nothing yet? Check your spam folder. Codes usually arrive within a few
					seconds.
				</p>
				<div className="flex items-center gap-4">
					<button
						className="text-foreground text-xs underline underline-offset-4 disabled:text-muted-foreground disabled:no-underline"
						disabled={cooldown > 0}
						onClick={resend}
						type="button"
					>
						{cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
					</button>
					<button
						className="flex items-center gap-1.5 text-muted-foreground text-xs hover:text-foreground"
						onClick={onBack}
						type="button"
					>
						<ArrowLeft className="size-3" />
						Use a different email
					</button>
				</div>
				{resendNotice ? (
					<p className="text-muted-foreground text-xs">{resendNotice}</p>
				) : null}
			</div>
		</form>
	);
}

function Field({
	label,
	htmlFor,
	children,
}: {
	label: string;
	htmlFor: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-2">
			<Label className="text-muted-foreground text-xs" htmlFor={htmlFor}>
				{label}
			</Label>
			{children}
		</div>
	);
}

function FormError({ message }: { message: string | null }) {
	if (!message) {
		return null;
	}
	return (
		<p className="text-destructive text-xs leading-relaxed" role="alert">
			{message}
		</p>
	);
}
