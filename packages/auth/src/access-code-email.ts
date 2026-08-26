const BODY_TEXT =
	"Enter this code to get into Edgecoms Academy. It expires in 10 minutes and can only be used once.";

export function accessCodeEmail(otp: string, supportEmail: string) {
	return {
		html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:40px 24px;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#18181b">
    <div style="max-width:440px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:8px;padding:32px">
      <p style="margin:0 0 24px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a">Edgecoms Academy</p>
      <h1 style="margin:0 0 12px;font-size:20px;font-weight:600;line-height:1.3">Your access code</h1>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#52525b">${BODY_TEXT}</p>
      <p style="margin:0 0 24px;padding:16px;background:#fafafa;border:1px solid #e4e4e7;border-radius:6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:32px;font-weight:600;letter-spacing:0.2em;text-align:center">${otp}</p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#71717a">Did not request this? Ignore this email, or reply to <a href="mailto:${supportEmail}" style="color:#71717a">${supportEmail}</a>.</p>
    </div>
  </body>
</html>`,
		subject: `${otp} is your Edgecoms Academy code`,
		text: `${otp}\n\n${BODY_TEXT}\n\nDid not request this? Ignore this email or reply to ${supportEmail}.`,
	};
}
