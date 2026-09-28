import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/ui/Faq";
import { EnquiryCta, WhatsAppLink } from "@/components/booking/EnquiryCta";
import { BookingSteps, DroneList, PhotoGrid } from "@/components/services/ServiceBlocks";
import { getService, services, servicePath, SERVICES_PATH } from "@/lib/services";
import { RULES_PATH } from "@/lib/drone-rules";
import { pageMetadata, serviceJsonLd, JsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.description, path: servicePath(s.slug) });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = s.related.map((r) => getService(r)).filter((r) => r !== undefined);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: s.title,
          serviceType: s.serviceType,
          description: s.description,
          path: servicePath(s.slug),
        })}
      />
      <PageHero
        crumbs={[
          { name: "Drone Services", path: SERVICES_PATH },
          { name: s.title.replace(" in Sri Lanka", ""), path: servicePath(s.slug) },
        ]}
        eyebrow="Drone service"
        title={s.h1}
        intro={s.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      >
        <div className="flex flex-wrap items-center gap-4">
          <WhatsAppLink message={s.message}>Check availability on WhatsApp</WhatsAppLink>
          <Link
            href={RULES_PATH}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
          >
            Drone rules in Sri Lanka <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </PageHero>

      <Section className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <article className="space-y-12">
            {s.sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="font-display text-2xl font-semibold text-night sm:text-3xl">{sec.heading}</h2>
                {sec.body?.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-night/75">
                    {p}
                  </p>
                ))}
                {sec.list && (
                  <ul className="mt-5 space-y-3">
                    {sec.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-night/75">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/15 text-teal">
                          <Icon name="check" size={12} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-night/10 bg-sand/60 p-6">
              <h2 className="font-display text-xl font-semibold text-night">Drone permits</h2>
              <p className="mt-2 text-sm leading-relaxed text-night/70">
                When we fly for you, we handle the drone approval as the operator. Some places need extra
                letters or approvals, and a few cannot be flown.
              </p>
              <Link href={RULES_PATH} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ocean hover:underline">
                Read the Sri Lanka drone rules <Icon name="arrow-right" size={14} />
              </Link>
            </div>
            <div className="rounded-3xl border border-night/10 bg-white p-6">
              <h2 className="font-display text-xl font-semibold text-night">Where we film</h2>
              <p className="mt-2 text-sm leading-relaxed text-night/70">
                We are based in Colombo and film across the island, from the coasts to the hill country.
              </p>
              <Link href="/locations" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ocean hover:underline">
                See our filming locations <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="pb-16">
        <h2 className="font-display text-2xl font-semibold text-night sm:text-3xl">The drones we use for this</h2>
        <p className="mt-3 max-w-2xl text-night/70">
          We choose the drone for the place, the weather and the shots you want. These are the ones we usually
          pick for this kind of shoot.
        </p>
        <div className="mt-6">
          <DroneList slugs={s.drones} />
        </div>
      </Section>

      <Section className="pb-16">
        <h2 className="font-display text-2xl font-semibold text-night sm:text-3xl">Photos from our portfolio</h2>
        <p className="mt-3 max-w-2xl text-night/70">
          A few places we have photographed with our own drones.{" "}
          <Link href="/portfolio" className="font-semibold text-ocean hover:underline">
            See the full portfolio
          </Link>
          .
        </p>
        <div className="mt-6">
          <PhotoGrid ids={s.photos} />
        </div>
      </Section>

      <div className="bg-sand py-16">
        <Section>
          <h2 className="font-display text-2xl font-semibold text-night sm:text-3xl">How booking works</h2>
          <div className="mt-8">
            <BookingSteps />
          </div>
        </Section>
      </div>

      <Section className="py-16">
        <h2 className="font-display text-2xl font-semibold text-night sm:text-3xl">Questions people ask</h2>
        <div className="mt-8">
          <Faq
            items={s.faqs.map((f) => ({
              q: f.q,
              a: f.a.map((p) => <p key={p}>{p}</p>),
            }))}
          />
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-semibold text-night">Related services</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={servicePath(r.slug)}
                    className="block h-full rounded-2xl border border-night/10 bg-white p-5 transition hover:border-ocean/40"
                  >
                    <span className="font-semibold text-night">{r.h1}</span>
                    <span className="mt-1 block text-sm text-night/65">{r.cardText}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <EnquiryCta message={s.message} />
    </>
  );
}
