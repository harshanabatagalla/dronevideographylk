import { NextResponse } from "next/server";
import { addEnquiry } from "@/lib/db";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  country?: string;
  dates?: string;
  locations?: string;
  shootType?: string;
  message?: string;
  /** honeypot — must stay empty */
  company?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2 || !isEmail(email) || message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, a valid email and a short message." },
      { status: 422 },
    );
  }

  const enquiry = {
    name,
    email,
    country: body.country?.trim() ?? "",
    dates: body.dates?.trim() ?? "",
    locations: body.locations?.trim() ?? "",
    shootType: body.shootType?.trim() ?? "",
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

  // Delivery: if RESEND_API_KEY is set, email the enquiry; otherwise log it.
  // In Phase 2 this also writes to the Supabase `enquiries` table for the
  // admin dashboard inbox.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (apiKey && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "dronevideography.lk <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject: `New enquiry from ${name} (${enquiry.country || "unknown"})`,
          text: Object.entries(enquiry)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n"),
        }),
      });
    } catch (err) {
      console.error("Failed to send enquiry email", err);
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please WhatsApp us instead." },
        { status: 502 },
      );
    }
  } else {
    console.info("New enquiry (email delivery not configured):", enquiry);
  }

  return NextResponse.json({ ok: true });
}
