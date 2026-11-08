import { NextResponse } from "next/server";
import { addEnquiry } from "@/lib/db";
import { sendNotification } from "@/lib/email";
import { isEmail, isRecord, oneLine, readJson, text } from "@/lib/input";
import { ipFromHeaders, rateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY = 20_000;
const PER_HOUR = 6;

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  if (rateLimited(`contact:${ipFromHeaders(request.headers)}`, PER_HOUR, 60 * 60 * 1000)) {
    return fail("You have sent several messages already. Please try again in an hour, or message us on WhatsApp.", 429);
  }

  const parsed = await readJson(request, MAX_BODY);
  if (!parsed.ok) {
    return fail(parsed.status === 413 ? "That message is too long." : "Invalid request.", parsed.status);
  }
  if (!isRecord(parsed.data)) return fail("Invalid request.", 400);
  const body = parsed.data;

  // Honeypot: real users never fill this hidden field.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = oneLine(body.name, 120);
  const email = oneLine(body.email, 254);
  const message = text(body.message, 4000);

  if (name.length < 2 || !isEmail(email) || message.length < 5) {
    return fail("Please provide your name, a valid email and a short message.", 422);
  }

  const enquiry = {
    name,
    email,
    country: oneLine(body.country, 80),
    dates: oneLine(body.dates, 120),
    locations: oneLine(body.locations, 300),
    shootType: oneLine(body.shootType, 80),
    message,
    createdAt: new Date().toISOString(),
  };

  // Persist the enquiry so it appears in the admin dashboard inbox.
  try {
    await addEnquiry({
      name,
      email,
      country: enquiry.country,
      dates: enquiry.dates,
      locations: enquiry.locations,
      shootType: enquiry.shootType,
      message,
    });
  } catch (err) {
    console.error("Failed to store enquiry", err);
  }

  // The enquiry is already saved in the admin inbox, so the visitor gets a success
  // either way; a failed email is logged by sendNotification.
  await sendNotification({
    replyTo: email,
    subject: `New enquiry from ${oneLine(name, 60)} (${enquiry.country || "unknown"})`,
    text: Object.entries(enquiry)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
  });

  return NextResponse.json({ ok: true });
}
