import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsappHref } from "@/lib/site";
import { getSettings } from "@/lib/db";

export const WHAT_TO_SEND = [
  "Your travel or shoot date",
  "The place or places in Sri Lanka",
  "The type of shoot, for example a trip, wedding, hotel or property",
  "How many hours or days you need",
  "What you want in the final video or photos",
];

/** WhatsApp link that uses the number from admin settings. */
export async function WhatsAppLink({
  message,
  children,
  className,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  const settings = await getSettings();
  return (
    <a
      href={buildWhatsappHref(settings.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "glow-sunset inline-flex items-center gap-2 rounded-full bg-sunset px-7 py-3.5 text-sm font-semibold text-night transition hover:-translate-y-0.5 hover:bg-amber-400"
      }
    >
      <Icon name="whatsapp" size={18} /> {children}
    </a>
  );
}

/** Closing call to action for service and guide pages: what to send, then WhatsApp. */
export async function EnquiryCta({
  title = "Ask about your shoot",
  text = "Send us a message on WhatsApp. We reply within 24 hours, and often within minutes.",
  message,
}: {
  title?: string;
  text?: string;
  message: string;
}) {
  return (
    <section className="relative overflow-hidden bg-cinema noise">
      <div className="aurora opacity-70" />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-semibold text-white text-balance sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-lg text-lg text-white/75">{text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WhatsAppLink message={message}>Send your date and location</WhatsAppLink>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
            >
              Use the contact form
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          <h3 className="font-semibold text-white">What to send us</h3>
          <ul className="mt-4 space-y-3">
            {WHAT_TO_SEND.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal/90 text-white">
                  <Icon name="check" size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
