/**
 * Sends a notification email through Resend. Returns true only when Resend
 * accepted it. Any refusal (bad key, blocked recipient, rate limit) is logged
 * with Resend's own error, because fetch() does not throw on HTTP errors and a
 * failed send would otherwise look like a success.
 */
export async function sendNotification({
  replyTo,
  subject,
  text,
}: {
  replyTo?: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.warn(`Email not sent (RESEND_API_KEY or CONTACT_TO_EMAIL missing): ${subject}`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "dronevideography.lk <onboarding@resend.dev>",
        to: [to],
        ...(replyTo ? { reply_to: replyTo } : {}),
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error(`Email refused by Resend (${res.status}): ${await res.text()} | ${subject}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Email could not reach Resend: ${subject}`, err);
    return false;
  }
}
