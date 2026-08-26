import { env } from "@edgecoms-academy/env/server";

interface Email {
	html: string;
	subject: string;
	text: string;
	to: string;
}

const transport =
	env.EMAIL_TRANSPORT ?? (env.NODE_ENV === "production" ? "resend" : "smtp");

let smtpTransport: Promise<import("nodemailer").Transporter> | null = null;

function getSmtpTransport() {
	if (!smtpTransport) {
		smtpTransport = import("nodemailer").then((nodemailer) =>
			nodemailer.createTransport(env.SMTP_URL)
		);
	}
	return smtpTransport;
}

async function sendViaSmtp(email: Email) {
	const mailer = await getSmtpTransport();
	await mailer.sendMail({ from: env.EMAIL_FROM, ...email });
}

async function sendViaResend(email: Email) {
	if (!env.RESEND_API_KEY) {
		throw new Error(
			"RESEND_API_KEY is required when EMAIL_TRANSPORT is resend"
		);
	}

	const response = await fetch("https://api.resend.com/emails", {
		body: JSON.stringify({ from: env.EMAIL_FROM, ...email }),
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	if (!response.ok) {
		throw new Error(
			`Resend rejected the email: ${response.status} ${await response.text()}`
		);
	}
}

export function sendEmail(email: Email) {
	return transport === "resend" ? sendViaResend(email) : sendViaSmtp(email);
}
