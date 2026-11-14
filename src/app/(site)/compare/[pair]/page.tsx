import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { ComparePicker } from "@/components/compare/ComparePicker";
import { AreaExplorer, type DiffItem } from "@/components/compare/AreaExplorer";
import { AddToCompare } from "@/components/compare/CompareTray";
import { CreditLine, DroneThumb } from "@/components/compare/DroneThumb";
import { ScoreRing } from "@/components/compare/ScoreRing";
import { SpecRecord } from "@/components/compare/SpecRecord";
import { VisualCompare } from "@/components/compare/Visuals";
import { DroneMini, PairCards, fleetHref, pickerOptions, shopInfo } from "@/components/compare/parts";
import {
  AREAS,
  COMPARE_PATH,
  SENSORS,
  SOURCE_CHECKED,
  SOURCE_URL,
  advantages,
  areaScores,
  biggestDifferences,
  comparePath,
  drones,
  pairPath,
  parsePair,
  pickIf,
  popularPair,
  popularWith,
  POPULAR,
  rankOf,
  reasonText,
  ruling,
  score,
  similarTo,
  under250,
  weightLabel,
  type CompareDrone,
  type Row,
} from "@/lib/compare";
import { RULES_PATH } from "@/lib/drone-rules";
import { whatsappHref } from "@/lib/site";
import { fitDescription, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ pair: string }> };

/** Popular pairs are built ahead; any other pair is built on its first visit. */
export function generateStaticParams() {
  return POPULAR.map(([a, b]) => ({ pair: `${a}-vs-${b}` }));
}

function titleFor(a: CompareDrone, b: CompareDrone): string {
  const base = `${a.name} vs ${b.name}`;
  // pageMetadata adds " | Drone Videography LK" (23 characters).
  return `${base}: Specs Compared`.length + 23 <= 66 ? `${base}: Specs Compared` : base;
}

export async function generateMetadata({ params }: Params) {
  const { pair } = await params;
  const found = parsePair(pair);
  if (!found) return pageMetadata({ title: "Comparison not found", path: `${COMPARE_PATH}/${pair}` });
  const [a, b] = found;
  const meta = pageMetadata({
    title: titleFor(a, b),
    description: fitDescription([
      `${a.name} vs ${b.name}, spec by spec: camera, video, flight time, wind, obstacle sensors and weight.`,
      ruling(a, b).text,
      "Includes the 250 g insurance rule in Sri Lanka.",
    ]),
    path: pairPath(a.slug, b.slug),
  });
  // Only the popular pairs are open to search engines; the rest exist for visitors.
  return popularPair(a.slug, b.slug) ? meta : { ...meta, robots: { index: false, follow: true } };
}

export default async function PairPage({ params }: Params) {
  const { pair } = await params;
  const found = parsePair(pair);
  if (!found) notFound();
  const [a, b] = found;
  const popular = popularPair(a.slug, b.slug);
  if (popular && popular[0] !== a.slug) permanentRedirect(pairPath(popular[0], popular[1]));

  const verdict = ruling(a, b);
  const sa = areaScores(a);
  const sb = areaScores(b);
  const toItem = (r: Row): DiffItem => ({
    label: r.spec.label,
    a: r.a,
    b: r.b,
    winner: r.winner as "a" | "b",
    margin: r.margin,
  });
  const lists: Record<string, DiffItem[]> = { all: biggestDifferences(a, b).map(toItem) };
  for (const x of AREAS) lists[x.id] = biggestDifferences(a, b, x.id).map(toItem);

  const others = similarTo(a, [b.slug], 4);
  const othersB = similarTo(b, [a.slug, ...others.map((d) => d.slug)], 2);
  const related = [...popularWith(a.slug), ...popularWith(b.slug)]
    .filter(([x, y], i, all) => !(x === a.slug && y === b.slug) && all.findIndex(([p, q]) => p === x && q === y) === i)
    .slice(0, 6);

  return (
    <>
      <header className="bg-night pb-12 pt-28 sm:pb-14 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { name: "Compare drones", path: COMPARE_PATH },
              { name: `${a.short} vs ${b.short}`, path: pairPath(a.slug, b.slug) },
            ]}
          />
          <h1 className="mx-auto mt-8 max-w-4xl text-center font-display text-3xl font-medium leading-tight text-white text-balance sm:text-5xl">
            <span className="text-ocean-light">{a.name}</span> <span className="text-white/70">vs</span>{" "}
            <span className="text-sunset">{b.name}</span>
          </h1>
          <p className="mt-3 text-center text-sm text-white/65">
            Specs from DJI, checked {SOURCE_CHECKED}. Scores are out of 100, against all {drones.length} drones on our
            list.
          </p>

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3 sm:gap-8">
            <Side d={a} side="a" />
            <div className="flex flex-col items-center" aria-hidden="true">
              <span className="w-px flex-1 bg-white/15" />
              <span className="py-3 font-display text-sm text-white/60">vs</span>
              <span className="w-px flex-1 bg-white/15" />
            </div>
            <Side d={b} side="b" />
          </div>

          <div className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-sm font-semibold text-white/60">Our verdict</p>
            <p className="mt-2 font-display text-2xl font-medium leading-snug text-white text-balance sm:text-3xl">
              <Verdict a={a} text={verdict.text} winner={verdict.winner} />
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl border-t border-white/10 pt-8">
            <p className="mb-4 text-sm font-semibold text-white/70">Compare other drones</p>
            <ComparePicker options={pickerOptions()} a={a.slug} b={b.slug} />
          </div>
        </div>
      </header>

      <Section className="py-14 sm:py-16">
        <SectionHeading
          title={`Where the ${a.short} and ${b.short} differ`}
          subtitle="Scores by area, out of 100. Tap an area to see the specs behind it."
        />
        <div className="mt-10">
          <AreaExplorer
            aName={a.short}
            bName={b.short}
            areas={AREAS.map((x) => ({ id: x.id, label: x.label, a: sa[x.id], b: sb[x.id] }))}
            lists={lists}
          />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <WhyList a={a} b={b} side="a" />
          <WhyList a={a} b={b} side="b" />
        </div>
      </Section>

      <Section className="bg-sand py-14 sm:py-16">
        <SectionHeading title="See the difference" subtitle="The specs that matter most when you travel, drawn to scale where we can." />
        <div className="mt-8">
          <VisualCompare a={a} b={b} />
        </div>
      </Section>

      <Section className="py-14 sm:py-16">
        <SectionHeading
          title={`Other drones to compare with the ${a.short}`}
          subtitle={`Close in size or score. Tap Compare on any two drones to add them to your list.`}
        />
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-6">
          {[...others, ...othersB].map((d, i) => {
            const base = i < others.length ? a : b;
            return (
              <li key={d.slug} className="flex flex-col gap-2">
                <DroneMini d={d} href={comparePath(base.slug, d.slug)} cta={`Compare with the ${base.short}`} />
                <AddToCompare slug={d.slug} name={d.name} className="justify-center" />
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="record" className="bg-sand py-14 sm:py-16">
        <SectionHeading
          title="Every spec, side by side"
          subtitle="Tap a spec name to see why it matters. The better value is in bold, and the bar shows how far apart the two are."
        />
        <div className="mt-8">
          <SpecRecord a={a} b={b} />
        </div>
        <div className="mt-6 space-y-2 text-sm text-night/70">
          {[a, b].map((d) => d.note && <p key={d.slug}>{d.note}</p>)}
          <p>
            Source:{" "}
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-ocean hover:underline">
              DJI&apos;s drone comparison page
            </a>
            , checked {SOURCE_CHECKED}. Flight times and ranges are DJI&apos;s test figures, without wind or interference.
          </p>
        </div>
      </Section>

      <Section className="py-14 sm:py-16">
        <SectionHeading title="Buy one, or let us fly" align="left" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[a, b].map((d, i) => (
            <GetCard key={d.slug} d={d} side={i === 0 ? "a" : "b"} />
          ))}
          <div className="flex flex-col rounded-3xl bg-night p-6 text-white">
            <h3 className="font-display text-xl font-semibold">Need the footage, not the drone?</h3>
            <p className="mt-2 flex-1 text-white/75">
              We film travel, weddings, hotels and property across Sri Lanka, and we handle the drone permits.
            </p>
            <a
              href={whatsappHref(`Hi! I was comparing the ${a.name} and the ${b.name}. Can you film for me instead?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp mt-5"
            >
              <Icon name="whatsapp" size={18} /> Ask us on WhatsApp
            </a>
          </div>
        </div>
      </Section>

      <Section className="pb-14 sm:pb-16">
        <SectionHeading title="Questions" align="left" />
        <div className="mt-6">
          <Faq items={faqs(a, b)} />
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="bg-sand py-14 sm:py-16">
          <SectionHeading title="Popular comparisons" subtitle="Other drones people weigh up against these two." />
          <div className="mt-8">
            <PairCards pairs={related} />
          </div>
          <p className="mt-8">
            <Link href={`${COMPARE_PATH}#ranking`} className="font-semibold text-ocean hover:underline">
              See the full ranking of all {drones.length} drones
            </Link>
          </p>
        </Section>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */

function Side({ d, side }: { d: CompareDrone; side: "a" | "b" }) {
  const shop = shopInfo(d);
  const fleet = fleetHref(d);
  const tone = side === "a" ? "text-ocean-light" : "text-sunset";
  return (
    <div className="min-w-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <DroneThumb drone={d} sizes="(max-width: 640px) 45vw, 480px" priority={side === "a"} />
      </div>
      <div className="mt-2">
        <CreditLine drone={d} dark />
      </div>
      <div className="mt-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
        <ScoreRing value={score(d)} tone={side} dark size={60} label={`${d.name} score`} />
        <div className="min-w-0">
          <p className={`font-display text-lg font-semibold leading-tight sm:text-2xl ${tone}`}>{d.short}</p>
          <p className="text-sm text-white/65">
            Ranked {rankOf(d)} of {drones.length}, released {d.released}
            {d.current ? "" : ", no longer made"}
          </p>
        </div>
      </div>
      <p className="mt-3 hidden text-white/75 sm:block">{d.headline}</p>
      <ul className="mt-3 space-y-1 text-sm">
        {shop && (
          <li>
            <Link href={shop.href} className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              In our shop, {shop.price}
            </Link>
          </li>
        )}
        {fleet && (
          <li>
            <Link href={fleet} className="text-white/75 underline decoration-white/30 underline-offset-4 hover:text-white">
              We fly this drone on our shoots
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

function Verdict({ a, text, winner }: { a: CompareDrone; text: string; winner: CompareDrone | null }) {
  if (!winner) return <>{text}</>;
  const cut = text.indexOf(". ");
  const rest = text.slice(cut + 2);
  const tone = winner.slug === a.slug ? "text-ocean-light" : "text-sunset";
  return (
    <>
      Get the <span className={tone}>{winner.name}</span>. <span className="text-white/80">{rest}</span>
    </>
  );
}

function WhyList({ a, b, side }: { a: CompareDrone; b: CompareDrone; side: "a" | "b" }) {
  const d = side === "a" ? a : b;
  const other = side === "a" ? b : a;
  const list = advantages(a, b, side).slice(0, 6);
  const tone = side === "a" ? "text-ocean" : "text-sunset-ink";
  return (
    <div className="rounded-3xl border border-night/10 bg-white p-6">
      <h3 className="font-display text-xl font-semibold text-night">
        Why pick the <span className={tone}>{d.short}</span>
      </h3>
      <p className="mt-2 text-night/75">{pickIf(a, b, side)}</p>
      {list.length > 0 ? (
        <ul className="mt-5 divide-y divide-night/10 border-t border-night/10">
          {list.map((r) => (
            <li key={r.spec.id} className="py-3">
              <p className="flex items-baseline justify-between gap-4">
                <span className="font-semibold text-night">{reasonText(r, a, b)}</span>
                {r.margin && <span className={`shrink-0 text-sm font-semibold ${tone}`}>{r.margin}</span>}
              </p>
              <p className="mt-0.5 text-sm text-night/70">
                {r.spec.yesNo
                  ? `${d.short}: ${r[side]}. ${other.short}: ${r[side === "a" ? "b" : "a"]}.`
                  : `${r[side]} against ${r[side === "a" ? "b" : "a"]} on the ${other.short}`}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-night/70">It does not win any spec we score against the {other.short}.</p>
      )}
    </div>
  );
}

function GetCard({ d, side }: { d: CompareDrone; side: "a" | "b" }) {
  const shop = shopInfo(d);
  const fleet = fleetHref(d);
  const tone = side === "a" ? "text-ocean" : "text-sunset-ink";
  return (
    <div className="flex flex-col rounded-3xl border border-night/10 bg-white p-6">
      <h3 className={`font-display text-xl font-semibold ${tone}`}>{d.name}</h3>
      <p className="mt-2 flex-1 text-night/75">
        {shop
          ? `We sell the ${d.short}, ${shop.price}. Prices are in Sri Lankan rupees.`
          : `We do not sell the ${d.short} in our shop. Ask us and we will tell you where to find one.`}
        {fleet && ` We also fly it on our own shoots.`}
      </p>
      {shop ? (
        <Link href={shop.href} className="btn btn-primary mt-5">
          View in our shop
        </Link>
      ) : (
        <a
          href={whatsappHref(`Hi! Where can I buy the ${d.name} in Sri Lanka?`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost mt-5"
        >
          Ask us about it
        </a>
      )}
    </div>
  );
}

function faqs(a: CompareDrone, b: CompareDrone): { q: string; a: ReactNode }[] {
  const v = ruling(a, b);
  const longer = a.flightMin === b.flightMin ? null : a.flightMin > b.flightMin ? a : b;
  const plus = [a, b].filter((d) => d.flightMinPlus);
  const windier = a.windMs === b.windMs ? null : a.windMs > b.windMs ? a : b;
  const sensorBig = a.sensor === b.sensor ? null : SENSORS[a.sensor].w * SENSORS[a.sensor].h > SENSORS[b.sensor].w * SENSORS[b.sensor].h ? a : b;
  const kmh = (ms: number) => Math.round(ms * 3.6);
  const light = [a, b].filter(under250);
  return [
    {
      q: `Which is better, the ${a.name} or the ${b.name}?`,
      a: (
        <>
          <p>{v.text}</p>
          <p>
            {pickIf(a, b, "a")} {pickIf(a, b, "b")}
          </p>
        </>
      ),
    },
    {
      q: `Which flies longer, the ${a.short} or the ${b.short}?`,
      a: (
        <p>
          {longer
            ? `The ${longer.short}: ${longer.flightMin} minutes on one battery, against ${longer === a ? b.flightMin : a.flightMin} minutes for the ${longer === a ? b.short : a.short}.`
            : `They are level at ${a.flightMin} minutes on one battery.`}{" "}
          {plus.map((d) => `With the Plus battery the ${d.short} flies for ${d.flightMinPlus} minutes, but weighs 250 g or more.`).join(" ")}{" "}
          These are DJI&apos;s figures with no wind, so plan on about three quarters of them.
        </p>
      ),
    },
    {
      q: `Which has the better camera?`,
      a: (
        <p>
          {sensorBig
            ? `The ${sensorBig.short} has the bigger main sensor (${SENSORS[sensorBig.sensor].label} against ${SENSORS[sensorBig === a ? b.sensor : a.sensor].label}), which gives cleaner pictures in low light.`
            : `Both use a ${SENSORS[a.sensor].label} main sensor.`}{" "}
          The {a.short} records up to {a.videoLabel} and the {b.short} up to {b.videoLabel}.{" "}
          {a.zoomMm || b.zoomMm
            ? [a, b]
                .filter((d) => d.zoomMm)
                .map((d) => `The ${d.short} has a zoom camera up to ${d.zoomMm} mm.`)
                .join(" ")
            : "Neither has a zoom camera."}
        </p>
      ),
    },
    {
      q: `Which handles wind better?`,
      a: (
        <p>
          {windier
            ? `The ${windier.short}, rated for ${windier.windMs} m/s (${kmh(windier.windMs)} km/h) against ${windier === a ? b.windMs : a.windMs} m/s.`
            : `They have the same rating, ${a.windMs} m/s (${kmh(a.windMs)} km/h).`}{" "}
          Beaches and hill country in Sri Lanka often get strong afternoon wind, so plan coastal and mountain flights for the
          morning.
        </p>
      ),
    },
    {
      q: `Do I need drone insurance for the ${a.short} or the ${b.short} in Sri Lanka?`,
      a: (
        <p>
          {light.length === 2
            ? `Not with the standard battery. Both weigh under 250 g (${weightLabel(a)} and ${weightLabel(b)}).`
            : light.length === 1
              ? `The ${light[0].short} (${weightLabel(light[0])}) does not with its standard battery. The ${light[0] === a ? b.short : a.short} (${weightLabel(light[0] === a ? b : a)}) does, because it weighs 250 g or more.`
              : `Yes, both. They weigh ${weightLabel(a)} and ${weightLabel(b)}, and every drone of 250 g or more needs public liability insurance.`}{" "}
          Every camera drone must be registered with CAASL whatever it weighs, and each flight needs approval.{" "}
          <Link href={RULES_PATH} className="font-semibold text-ocean hover:underline">
            Read the Sri Lanka drone rules
          </Link>
          .
        </p>
      ),
    },
  ];
}
