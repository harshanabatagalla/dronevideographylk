import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { servicePath } from "@/lib/services";
import { PERMIT_PATH, RULES_PATH } from "@/lib/drone-rules";

const services: { icon: IconName; title: string; text: string; href: string }[] = [
  {
    icon: "travel-film",
    title: "Travel videos",
    text: "A drone video of your Sri Lanka trip or honeymoon, or aerial shots for your travel content.",
    href: servicePath("travel-drone-videography"),
  },
  {
    icon: "wedding",
    title: "Weddings and events",
    text: "Wide shots of your venue, ceremony and couple session, at a beach, a hotel or in the hills.",
    href: servicePath("wedding-drone-videography"),
  },
  {
    icon: "resort",
    title: "Hotels and resorts",
    text: "Video and photos that show your hotel, its setting and the view, for your website and booking pages.",
    href: servicePath("hotel-resort-drone-videography"),
  },
  {
    icon: "surf",
    title: "Surf and outdoor trips",
    text: "The drone follows you while you surf, hike or drive, at places where drones are allowed to fly.",
    href: servicePath("travel-drone-videography"),
  },
  {
    icon: "estate",
    title: "Property and land",
    text: "Clear aerial photos and video of villas, houses and land for sale or rent.",
    href: servicePath("property-drone-photography"),
  },
  {
    icon: "landscape",
    title: "Drone photography",
    text: "High resolution aerial photos of places, hotels and your trip, like the ones in our portfolio.",
    href: servicePath("drone-photography"),
  },
];

export function WhatWeFilm() {
  return (
    <Section className="py-20 sm:py-24">
      <SectionHeading
        title="Drone filming for travellers, hotels and weddings"
        subtitle="Choose the kind of shoot you need. Each page explains what we film, what you get and how to book."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 60} variant="scale">
            <Link
              href={s.href}
              className="block h-full rounded-2xl border border-night/10 bg-white p-6 transition-colors hover:border-ocean/40"
            >
              <span className="text-ocean">
                <Icon name={s.icon} size={28} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-night">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-night/65">{s.text}</p>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Drone permits: what we do, and where to read the rules */}
      <Reveal>
        <div className="mt-14 rounded-3xl bg-night p-7 text-white sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Drone permits in Sri Lanka
              </h2>
              <p className="mt-3 max-w-xl text-white/80">
                Every outdoor drone flight in Sri Lanka needs approval from the Civil Aviation Authority. When
                we fly for you, we handle that approval as the operator. Some places, such as Sigiriya, national
                parks and restricted areas, need extra approvals, and a few cannot be flown. We tell you early.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href={RULES_PATH} className="inline-flex items-center gap-1 text-sunset hover:text-amber-300">
                  Sri Lanka drone rules for tourists <Icon name="arrow-right" size={14} />
                </Link>
                <Link href={PERMIT_PATH} className="inline-flex items-center gap-1 text-white/80 hover:text-white">
                  How to get a drone permit <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                "CAASL flight approval for your shoot",
                "Letters from hotels, venues and land owners",
                "Extra approvals where a place needs them",
                "Insurance papers for our drones",
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
    </Section>
  );
}
