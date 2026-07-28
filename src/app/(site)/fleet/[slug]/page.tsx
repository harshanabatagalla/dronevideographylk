import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Button } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { getDrone, getDrones } from "@/lib/db";
import { whatsappHref } from "@/lib/site";
import { pageMetadata, JsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const drones = await getDrones();
  return drones.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drone = await getDrone(slug);
  if (!drone) return pageMetadata({ title: "Drone not found", path: `/fleet/${slug}` });
  return pageMetadata({
    title: `${drone.name} — Drone Hire in Sri Lanka`,
    description: `${drone.tagline} ${drone.specs.map((s) => `${s.label}: ${s.value}.`).join(" ")}`,
    path: `/fleet/${drone.slug}`,
    image: drone.image,
  });
}

export default async function DroneDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drone = await getDrone(slug);
  if (!drone) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: drone.name,
    description: drone.tagline,
    image: drone.image,
    brand: { "@type": "Brand", name: "dronevideography.lk" },
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <div className="bg-skyline pb-10 pt-28">
        <Section>
          <Link href="/fleet" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-sunset">
            ← Back to fleet
          </Link>
        </Section>
      </div>

      <Section className="py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="cinematic-frame relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src={drone.image}
              alt={`${drone.name} camera drone`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="font-display text-4xl font-semibold text-night">{drone.name}</h1>
            <p className="mt-3 text-lg text-night/70">{drone.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {drone.bestFor.map((tag) => (
                <span key={tag} className="rounded-full bg-sand px-3 py-1 text-sm font-medium text-night/70">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {drone.specs.map((s) => (
                <div key={s.label} className="rounded-2xl border border-night/10 bg-white p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-night">{s.label}</p>
                  <p className="mt-1 text-sm text-night/60">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappHref(`Hi! I'd like to book the ${drone.name} drone for my Sri Lanka trip.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-night transition hover:bg-amber-400"
              >
                <Icon name="whatsapp" size={18} /> Enquire about this drone
              </a>
              <Button href="/contact" variant="ghost">
                Contact form
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
