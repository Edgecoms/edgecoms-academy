const BODY_TEXT =
	"Enter this code to get into Edgecoms Academy. It expires in 10 minutes and can only be used once.";
const PREHEADER = "Your code expires in 10 minutes.";

export function accessCodeEmail(otp: string, supportEmail: string) {
	return {
		html: `<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Your access code</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;-webkit-font-smoothing:antialiased">
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">${PREHEADER}</div>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="background:#ffffff">
      <tr>
        <td align="center" style="padding:48px 20px">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="max-width:500px">
            <tr>
              <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto 32px">
                  <tr>
                    <td style="border:2px solid #111213;padding:4px 10px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,'Courier New',monospace">
                      <div style="font-size:10px;font-weight:800;letter-spacing:1px;line-height:13px;color:#111213">EDGECOMS</div>
                      <div style="font-size:12px;font-weight:900;letter-spacing:0.6px;line-height:15px;color:#111213">ACADEMY</div>
                    </td>
                  </tr>
                </table>

                <h1 style="margin:0 0 16px;font-size:22px;font-weight:600;line-height:1.3;letter-spacing:-0.02em;text-align:center;color:#18181b">Your access code</h1>

                <p style="margin:0;font-size:14px;line-height:1.7;text-align:center;color:#18181b">${BODY_TEXT}</p>

                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin:32px 0">
                  <tr>
                    <td align="center" style="background:#fafafa;border:1px solid #e5e5e5;border-radius:10px;padding:22px 16px">
                      <span style="display:inline-block;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,'Courier New',monospace;font-size:32px;font-weight:700;line-height:1.1;letter-spacing:0.3em;margin-right:-0.3em;color:#18181b">${otp}</span>
                    </td>
                  </tr>
                </table>

                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin:32px 0 0">
                  <tr>
                    <td style="border-top:1px solid #e5e5e5;padding-top:20px">
                      <p style="margin:0;font-size:12px;line-height:1.6;text-align:center;color:#737373">Did not request this? Ignore this email, or reply to <a href="mailto:${supportEmail}" style="color:#737373;text-decoration:underline" target="_blank">${supportEmail}</a>.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
		subject: `${otp} is your Edgecoms Academy code`,
		text: `${otp}\n\n${BODY_TEXT}\n\nDid not request this? Ignore this email or reply to ${supportEmail}.`,
	};
}
