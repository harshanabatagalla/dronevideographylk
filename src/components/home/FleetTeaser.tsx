import { Section, Button } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { DroneCard } from "@/components/fleet/DroneCard";
import { getDrones } from "@/lib/db";

export async function FleetTeaser() {
  const drones = await getDrones();
  return (
    <div className="bg-night py-24 sm:py-28">
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold text-white text-balance sm:text-5xl">
            The drones we use
          </h2>
          <p className="mt-4 text-lg text-white/70">
            We use different drones depending on the place, the weather and the shots you want. Each one is
            explained in plain words.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {drones.map((d, i) => (
            <Reveal key={d.slug} delay={i * 90} variant="scale">
              <DroneCard drone={d} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/fleet" icon>
            See all our drones
          </Button>
        </div>
      </Section>
    </div>
  );
}
