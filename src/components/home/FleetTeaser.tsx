import Link from "next/link";
import { Section, SectionHeading, Button } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { DroneCard } from "@/components/fleet/DroneCard";
import { getDrones } from "@/lib/db";

/** The three main drones as full cards, then every other drone as a short list with a link. */
const FEATURED_COUNT = 3;

export async function FleetTeaser() {
  const drones = await getDrones();
  const main = drones.slice(0, FEATURED_COUNT);
  const more = drones.slice(FEATURED_COUNT);
  return (
    <div className="bg-night py-20 sm:py-28">
      <Section>
        <SectionHeading
          light
          title="The drones we use"
          subtitle="We use different drones depending on the place, the weather and the shots you want. Each one is explained in plain words."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {main.map((d, i) => (
            <Reveal key={d.slug} delay={i * 60}>
              <DroneCard drone={d} />
            </Reveal>
          ))}
        </div>

        {more.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-2xl font-medium text-white">More of our drones</h3>
            <ul className="mt-5 grid border-b border-white/15 md:grid-cols-2 md:gap-x-14">
              {more.map((d) => (
                <li key={d.slug} className="border-t border-white/15">
                  <Link href={`/fleet/${d.slug}`} className="group flex items-center justify-between gap-6 py-4">
                    <span>
                      <span className="block font-display text-xl font-medium text-white transition-colors duration-150 group-hover:text-sunset">
                        {d.name}
                      </span>
                      <span className="mt-0.5 block text-sm text-white/65">{d.tagline}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-white/40 transition-[color,transform] duration-200 ease-out-strong group-hover:translate-x-1 group-hover:text-sunset"
                    >
                      <Icon name="arrow-right" size={20} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12">
          <Button href="/fleet" icon>
            See all our drones
          </Button>
        </div>
      </Section>
    </div>
  );
}
