import { Section, Button } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { DroneCard } from "@/components/fleet/DroneCard";
import { getDrones } from "@/lib/db";

export async function FleetTeaser() {
  const drones = await getDrones();
  return (
    <div className="relative overflow-hidden bg-cinema noise py-24 sm:py-28">
      <div className="aurora opacity-50" />
      <Section className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sunset/40 bg-sunset/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-sunset">
            <Icon name="camera" size={14} /> Our drone fleet
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-white text-balance sm:text-5xl">
            Our <span className="text-gradient">fly ready</span> drones
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Each drone explained in plain words. Pick the one that fits your shoot,
            or ask us to choose.
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
            Explore the full fleet
          </Button>
        </div>
      </Section>
    </div>
  );
}
