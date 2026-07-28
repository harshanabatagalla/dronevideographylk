import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { buildWhatsappHref } from "@/lib/site";
import { getSettings } from "@/lib/db";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact — Book Your Aerial Film",
  description:
    "Get a drone videography quote for your Sri Lanka trip, wedding or event. Message us on WhatsApp or send an enquiry — we reply within 24 hours.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSettings();
  const waHref = buildWhatsappHref(settings.whatsapp, settings.whatsappMessage);
  const telHref = `tel:${settings.phone.replace(/[^0-9+]/g, "")}`;
  const socialLinks = (
    [
      { name: "instagram", href: settings.socials.instagram, label: "Instagram" },
      { name: "youtube", href: settings.socials.youtube, label: "YouTube" },
      { name: "facebook", href: settings.socials.facebook, label: "Facebook" },
      { name: "tiktok", href: settings.socials.tiktok, label: "TikTok" },
    ] as const
  ).filter((s) => s.href);
  return (
    <>
      <div className="bg-skyline pb-16 pt-32">
        <Section>
          <SectionHeading
            light
            eyebrow="Contact us"
            title="Let's plan your aerial film"
            subtitle="Tell us your dates and dream shots. Prefer chatting? WhatsApp is the fastest way to reach us."
          />
        </Section>
      </div>

      <Section className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-night">Reach us directly</h2>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-night/10 bg-white p-4 transition hover:border-teal/40"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25D366]/15 text-[#128C3E]">
                    <Icon name="whatsapp" size={22} />
                  </span>
                  <span>
                    <span className="block font-semibold text-night">WhatsApp</span>
                    <span className="text-sm text-night/60">Fastest reply — usually within minutes</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={telHref}
                  className="flex items-center gap-4 rounded-2xl border border-night/10 bg-white p-4 transition hover:border-ocean/40"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon name="phone" size={22} />
                  </span>
                  <span>
                    <span className="block font-semibold text-night">Call us</span>
                    <span className="text-sm text-night/60">{settings.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-night/10 bg-white p-4 transition hover:border-ocean/40"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon name="arrow-right" size={22} />
                  </span>
                  <span>
                    <span className="block font-semibold text-night">Email</span>
                    <span className="text-sm text-night/60">{settings.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-night/10 bg-white p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-sunset/15 text-sunset">
                  <Icon name="map-pin" size={22} />
                </span>
                <span>
                  <span className="block font-semibold text-night">Based in</span>
                  <span className="text-sm text-night/60">{settings.address} · filming island-wide</span>
                </span>
              </li>
            </ul>

            {socialLinks.length > 0 && (
              <div className="mt-8">
                <h3 className="font-display text-lg font-semibold text-night">Follow our flights</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-night/10 bg-white text-night/70 transition hover:-translate-y-0.5 hover:border-ocean/40 hover:text-ocean"
                    >
                      <Icon name={s.name} size={20} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-night/10 bg-sand/60 p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
