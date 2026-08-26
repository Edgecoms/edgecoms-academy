import "server-only";
import { auth } from "@edgecoms-academy/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getOptionalSession() {
	return await auth.api.getSession({ headers: await headers() });
}

export async function requireSession() {
	const session = await getOptionalSession();
	if (!session) {
		redirect("/academy/access");
	}
	return session;
}
