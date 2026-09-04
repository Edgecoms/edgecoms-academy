const PREHEADER = "Your course is ready, and the community is waiting.";

const HTML_ESCAPES: Record<string, string> = {
	"'": "&#39;",
	'"': "&quot;",
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
};
const HTML_UNSAFE = /["&'<>]/g;
const WHITESPACE = /\s+/;

function escapeHtml(value: string) {
	return value.replace(
		HTML_UNSAFE,
		(character) => HTML_ESCAPES[character] ?? character
	);
}

/** Signups ask for a first name, but people paste full names into that field. */
function firstName(name: string) {
	const [first] = name.trim().split(WHITESPACE);
	return first || "there";
}

interface WelcomeEmailOptions {
	communityUrl: string;
	courseUrl: string;
	name: string;
	supportEmail: string;
}

export function welcomeEmail({
	communityUrl,
	courseUrl,
	name,
	supportEmail,
}: WelcomeEmailOptions) {
	const greeting = escapeHtml(firstName(name));

	return {
		html: `<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Welcome onboard</title>
  </head>
  <body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#18181b">
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">${PREHEADER}</div>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="background:#fafafa">
      <tr>
        <td align="center" style="padding:40px 24px">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="max-width:480px;background:#ffffff;border:1px solid #e4e4e7;border-radius:8px">
            <tr>
              <td style="padding:32px">
                <p style="margin:0 0 28px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#71717a">Edgecoms Academy</p>

                <h1 style="margin:0 0 20px;font-size:22px;font-weight:600;line-height:1.3;color:#18181b">Welcome onboard</h1>

                <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#3f3f46">Hi ${greeting},</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#3f3f46">Welcome to Edgecoms Academy. We&#39;re so glad to have you here.</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#3f3f46">Your course is ready and waiting for you, so whenever you&#39;re ready, you can <a href="${courseUrl}" style="color:#18181b;text-decoration:underline" target="_blank">jump in and start learning</a>.</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#3f3f46">We hope you enjoy the lessons, pick up a few things that make a real difference, and most importantly, put what you learn into practice.</p>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#3f3f46">We&#39;ll be sharing course updates, reminders, and anything else you may need along the way in our WhatsApp community.</p>

                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="margin:0 0 24px">
                  <tr>
                    <td align="center">
                      <a href="${communityUrl}" style="display:inline-block;background:#18181b;color:#ffffff;font-size:15px;font-weight:600;line-height:100%;text-decoration:none;padding:14px 28px;border-radius:6px;mso-padding-alt:0px" target="_blank"><span><!--[if mso]><i style="mso-font-width:400%;mso-text-raise:21" hidden>&#8202;&#8202;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10px">Join the WhatsApp Community &rarr;</span><span><!--[if mso]><i style="mso-font-width:400%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span></a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#3f3f46">Come say hello when you&#39;re in. We&#39;ll see you there.</p>

                <p style="margin:0;font-size:15px;line-height:1.65;color:#3f3f46">Warmly,<br />Team Edgecoms</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px">
                <p style="margin:0;padding-top:20px;border-top:1px solid #e4e4e7;font-size:13px;line-height:1.6;color:#71717a">Questions? Just reply to this email, or write to <a href="mailto:${supportEmail}" style="color:#71717a" target="_blank">${supportEmail}</a>.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
		subject: "Welcome Onboard",
		text: `Hi ${firstName(name)},

Welcome to Edgecoms Academy. We're so glad to have you here.

Your course is ready and waiting for you, so whenever you're ready, you can jump in and start learning: ${courseUrl}

We hope you enjoy the lessons, pick up a few things that make a real difference, and most importantly, put what you learn into practice.

We'll be sharing course updates, reminders, and anything else you may need along the way in our WhatsApp community.

Join the WhatsApp Community: ${communityUrl}

Come say hello when you're in. We'll see you there.

Warmly,
Team Edgecoms

Questions? Just reply to this email, or write to ${supportEmail}.`,
	};
}
