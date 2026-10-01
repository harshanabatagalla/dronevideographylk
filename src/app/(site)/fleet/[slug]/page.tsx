import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Button } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WhatsAppLink } from "@/components/booking/EnquiryCta";
import { getDrone, getDrones } from "@/lib/db";
import { getProduct } from "@/lib/shop";
import { getService, servicePath, type Service } from "@/lib/services";
import { fitDescription, pageMetadata } from "@/lib/seo";
import { PhotoCredit } from "@/components/shop/PhotoCredit";

/** Which service page fits each "best for" tag on a drone. */
const TAG_TO_SERVICE: Record<string, string> = {
  weddings: "wedding-drone-videography",
  events: "wedding-drone-videography",
  hotels: "hotel-resort-drone-videography",
  indoor: "hotel-resort-drone-videography",
  "venue tours": "hotel-resort-drone-videography",
  "360 video": "hotel-resort-drone-videography",
  property: "property-drone-photography",
  landscapes: "drone-photography",
  photography: "drone-photography",
  "low light": "drone-photography",
  travel: "travel-drone-videography",
  tourism: "travel-drone-videography",
  beaches: "travel-drone-videography",
  action: "travel-drone-videography",
  "long flights": "travel-drone-videography",
  "time lapse": "travel-drone-videography",
  "quiet shoots": "travel-drone-videography",
  "tight spaces": "hotel-resort-drone-videography",
  tours: "hotel-resort-drone-videography",
};

export async function generateStaticParams() {
  const drones = await getDrones();
  return drones.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drone = await getDrone(slug);
  if (!drone) return {};
  // Kept for visitors, but not indexed: each page is a short spec card that repeats
  // /fleet (the indexed hub) and would compete with /shop/<model> for "<model> Sri Lanka".
  return {
    ...droneMeta(drone),
    robots: { index: false, follow: true },
  };
}

function droneMeta(drone: { name: string; tagline: string; bestFor: string[]; slug: string; image: string }) {
  const uses = drone.bestFor.map((t) => t.toLowerCase());
  const usesText = uses.length > 1 ? `${uses.slice(0, -1).join(", ")} and ${uses[uses.length - 1]}` : uses[0];
  return pageMetadata({
    title: `${drone.name} Drone Filming in Sri Lanka`,
    description: fitDescription([
      drone.tagline,
      `We fly it in Sri Lanka for ${usesText}.`,
      "Book a shoot with a licensed pilot.",
    ]),
    path: `/fleet/${drone.slug}`,
    image: drone.image,
  });
}

export default async function DroneDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drone = await getDrone(slug);
  if (!drone) notFound();

  const serviceSlugs = Array.from(
    new Set(drone.bestFor.map((t) => TAG_TO_SERVICE[t.toLowerCase()]).filter(Boolean)),
  );
  const relatedServices = serviceSlugs.map((s) => getService(s)).filter((s): s is Service => s !== undefined);
  const product = getProduct(drone.slug);

  return (
    <>
      <div className="bg-skyline pb-10 pt-28">
        <Section>
          <Breadcrumbs
            items={[
              { name: "Our Drones", path: "/fleet" },
              { name: drone.name, path: `/fleet/${drone.slug}` },
            ]}
          />
        </Section>
      </div>

      <Section className="py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="cinematic-frame relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={drone.image}
                alt={`${drone.name} camera drone`}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <PhotoCredit slug={drone.slug} className="mt-2" />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ocean">One of our drones</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-night">Filming with the {drone.name}</h1>
            <p className="mt-3 text-lg text-night/70">{drone.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {drone.bestFor.map((tag) => (
                <span key={tag} className="rounded-full bg-sand px-3 py-1 text-sm font-medium text-night/70">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="mt-8 font-display text-xl font-semibold text-night">What it can do</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
              <WhatsAppLink
                message={`Hi! I'd like to book a shoot with the ${drone.name} in Sri Lanka. My date and place are: `}
                className="inline-flex items-center gap-2 rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-night transition hover:bg-amber-400"
              >
                Book a shoot with this drone
              </WhatsAppLink>
              <Button href="/contact" variant="ghost">
                Contact form
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {(relatedServices.length > 0 || product) && (
        <Section className="pb-16">
          <div className="grid gap-6 md:grid-cols-2">
            {relatedServices.length > 0 && (
              <div className="rounded-3xl border border-night/10 bg-white p-6">
                <h2 className="font-display text-xl font-semibold text-night">
                  Shoots we use the {drone.name} for
                </h2>
                <ul className="mt-4 space-y-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={servicePath(s.slug)}
                        className="inline-flex items-center gap-1 font-semibold text-ocean hover:underline"
                      >
                        {s.h1} <Icon name="arrow-right" size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product && (
              <div className="rounded-3xl border border-night/10 bg-sand/60 p-6">
                <h2 className="font-display text-xl font-semibold text-night">Want your own {drone.name}?</h2>
                <p className="mt-2 text-sm text-night/70">
                  This page is about filming with our drone. If you want to buy one, see the price, the kit and
                  the common problems in our shop.
                </p>
                <Link
                  href={`/shop/${product.slug}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ocean hover:underline"
                >
                  {product.name} in our shop <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            )}
          </div>
        </Section>
      )}
    </>
  );
}
