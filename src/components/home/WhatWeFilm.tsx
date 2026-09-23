import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

const services: { icon: IconName; title: string; text: string }[] = [
  { icon: "travel-film", title: "Travel Films", text: "A short video of your Sri Lanka trip to keep and share." },
  { icon: "wedding", title: "Weddings & Events", text: "Wide shots from the sky of your big day at a beach, fort or villa." },
  { icon: "resort", title: "Resorts & Hotels", text: "Videos that show off your hotel and help you get more bookings." },
  { icon: "surf", title: "Adventure & Surf", text: "The drone follows you while you surf, hike or go on safari." },
  { icon: "estate", title: "Real Estate", text: "Clear photos and videos from above of villas and land for sale." },
  { icon: "landscape", title: "Landscapes", text: "Tea country, waterfalls and quiet beaches, seen from above." },
];

export function WhatWeFilm() {
  return (
    <Section className="py-20 sm:py-24">
      <SectionHeading
        eyebrow="What we film"
        title="Your story, filmed from the sky"
        subtitle="We film honeymoons, weddings, hotels and more."
      />

      {/* Highlighted service — legal permits handled for you */}
      <Reveal>
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-sunset/30 bg-gradient-to-br from-night via-night-700 to-ocean p-7 text-white shadow-xl shadow-night/10 sm:p-10">
          <div className="aurora opacity-30" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sunset px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-night">
                <Icon name="shield" size={14} /> We do the paperwork
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                We get all the drone permits and CAA approvals
              </h3>
              <p className="mt-3 max-w-xl text-white/80">
                You need permits to fly a drone in Sri Lanka. Our licensed and insured
                pilots get them for you. You just come to the shoot.
              </p>
            </div>
            <ul className="grid gap-3">
              {[
                "CAA drone registration and flight permits",
                "Permission for restricted areas and heritage sites",
                "Permission from land and property owners",
                "Full insurance papers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal/90 text-white">
                    <Icon name="check" size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 60} variant="scale">
            <article className="hover-lift group relative h-full overflow-hidden rounded-2xl border border-night/10 bg-white p-6 hover:border-ocean/30 hover:shadow-xl hover:shadow-night/5">
              <span className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-sunset to-coral transition-transform duration-500 group-hover:scale-x-100" />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-ocean/15 to-teal/15 text-ocean transition group-hover:from-ocean group-hover:to-teal group-hover:text-white">
                <Icon name={s.icon} size={26} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-night">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-night/65">{s.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
