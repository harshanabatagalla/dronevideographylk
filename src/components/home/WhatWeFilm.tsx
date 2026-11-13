import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { servicePath } from "@/lib/services";
import { PERMIT_PATH, RULES_PATH } from "@/lib/drone-rules";

const services: { title: string; text: string; href: string }[] = [
  {
    title: "Travel videos",
    text: "A drone video of your Sri Lanka trip or honeymoon, or aerial shots for your travel content.",
    href: servicePath("travel-drone-videography"),
  },
  {
    title: "Weddings and events",
    text: "Wide shots of your venue, ceremony and couple session, at a beach, a hotel or in the hills.",
    href: servicePath("wedding-drone-videography"),
  },
  {
    title: "Hotels and resorts",
    text: "Video and photos that show your hotel, its setting and the view, for your website and booking pages.",
    href: servicePath("hotel-resort-drone-videography"),
  },
  {
    title: "Surf and outdoor trips",
    text: "The drone follows you while you surf, hike or drive, at places where drones are allowed to fly.",
    href: servicePath("travel-drone-videography"),
  },
  {
    title: "Property and land",
    text: "Clear aerial photos and video of villas, houses and land for sale or rent.",
    href: servicePath("property-drone-photography"),
  },
  {
    title: "Drone photography",
    text: "High resolution aerial photos of places, hotels and your trip, like the ones in our portfolio.",
    href: servicePath("drone-photography"),
  },
];

const permitList = [
  "CAASL flight approval for your shoot",
  "Letters from hotels, venues and land owners",
  "Extra approvals where a place needs them",
  "Insurance papers for our drones",
];

export function WhatWeFilm() {
  return (
    <Section className="cv py-20 [--cv-d:1420px] [--cv-m:2090px] sm:py-28">
      <SectionHeading
        title="Drone filming for travellers, hotels and weddings"
        subtitle="Choose the kind of shoot you need. Each page explains what we film, what you get and how to book."
      />

      {/* An index, not a card grid: one ruled row per kind of shoot. */}
      <ul className="mt-12 border-t border-night/20">
        {services.map((s, i) => (
          <Reveal key={s.title} as="li" delay={i * 40} className="border-b border-night/15">
            <Link
              href={s.href}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] sm:gap-x-10 sm:py-7"
            >
              <h3 className="font-display text-2xl font-medium text-night transition-colors duration-150 group-hover:text-ocean sm:text-[1.7rem]">
                {s.title}
              </h3>
              <p className="col-span-2 row-start-2 max-w-xl leading-relaxed text-night/70 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                {s.text}
              </p>
              <span
                aria-hidden="true"
                className="col-start-2 row-start-1 text-night/40 transition-[color,transform] duration-200 ease-out-strong group-hover:translate-x-1 group-hover:text-ocean sm:col-start-3"
              >
                <Icon name="arrow-right" size={22} />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      {/* Drone permits: what we do, and where to read the rules */}
      <Reveal>
        <div className="mt-16 rounded-3xl bg-night p-7 text-white sm:p-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
            <div>
              <h2 className="font-display text-2xl font-medium sm:text-3xl">Drone permits in Sri Lanka</h2>
              <p className="mt-3 max-w-xl text-white/80">
                Every outdoor drone flight in Sri Lanka needs approval from the Civil Aviation Authority. When
                we fly for you, we handle that approval as the operator. Some places, such as Sigiriya, national
                parks and restricted areas, need extra approvals, and a few cannot be flown. We tell you early.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href={RULES_PATH} className="tap inline-flex items-center gap-1 text-sunset hover:text-amber-300">
                  Sri Lanka drone rules for tourists <Icon name="arrow-right" size={14} />
                </Link>
                <Link href={PERMIT_PATH} className="tap inline-flex items-center gap-1 text-white/80 hover:text-white">
                  How to get a drone permit <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </div>
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {permitList.map((item) => (
                <li key={item} className="flex items-start gap-3 py-3 text-sm text-white/90">
                  <span className="mt-0.5 text-sunset">
                    <Icon name="check" size={16} />
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
