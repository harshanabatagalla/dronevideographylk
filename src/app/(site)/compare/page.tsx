import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { ComparePicker } from "@/components/compare/ComparePicker";
import { RankingList, type RankRow } from "@/components/compare/RankingList";
import { PairCards, pickerOptions, seriesList } from "@/components/compare/parts";
import {
  AREA_WEIGHTS,
  AREAS,
  COMPARE_PATH,
  SENSORS,
  SOURCE_CHECKED,
  SOURCE_URL,
  areaScores,
  comparePath,
  drones,
  getCompareDrone,
  joinList,
  popularWith,
  POPULAR,
  ranking,
  score,
  similarTo,
  under250,
  weightLabel,
} from "@/lib/compare";
import { getDrone } from "@/lib/content";
import { RULES_PATH } from "@/lib/drone-rules";
import { fitDescription, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Compare DJI Drones: Specs Side by Side",
  description: fitDescription([
    `Compare any two of ${drones.length} DJI drones: camera, video, flight time, wind, obstacle sensors and weight, with a score for each.`,
    "Includes the 250 g insurance rule in Sri Lanka.",
  ]),
  path: COMPARE_PATH,
});

const FEATURED = 9;

export default function ComparePage() {
  const rankRows: RankRow[] = ranking().map((d) => {
    const pair = popularWith(d.slug)[0];
    const other = pair ? (pair[0] === d.slug ? pair[1] : pair[0]) : similarTo(d)[0].slug;
    const a = areaScores(d);
    return {
      slug: d.slug,
      name: d.name,
      short: d.short,
      series: d.series,
      released: d.released,
      current: d.current,
      under250: under250(d),
      score: score(d),
      areas: AREAS.map((x) => ({ id: x.id, label: x.label, value: a[x.id] })),
      weight: weightLabel(d),
      weightG: d.weightG,
      flight: d.flightMin,
      sensor: SENSORS[d.sensor].label,
      image: d.image,
      href: comparePath(d.slug, other),
      versus: getCompareDrone(other)?.short ?? "",
    };
  });

  const light = drones.filter((d) => d.current && under250(d)).sort((x, y) => score(y) - score(x));
  const longest = [...drones].sort((x, y) => y.flightMin - x.flightMin)[0];
  const longestPlus = [...drones]
    .filter((d) => d.flightMinPlus)
    .sort((x, y) => (y.flightMinPlus ?? 0) - (x.flightMinPlus ?? 0));
  const plusTop = longestPlus.filter((d) => d.flightMinPlus === longestPlus[0]?.flightMinPlus);
  const ours = drones.filter((d) => getDrone(d.slug));
  const top = ranking()[0];

  return (
    <>
      <PageHero
        crumbs={[{ name: "Compare drones", path: COMPARE_PATH }]}
        title="Compare DJI drones side by side"
        intro={
          <p>
            Pick any two of {drones.length} DJI drones and see every spec next to each other, with a score for
            camera, video, flight, safety and travel. The specs come from DJI. The notes on weight and insurance
            follow the rules in Sri Lanka.
          </p>
        }
      >
        <div className="max-w-4xl">
          <ComparePicker options={pickerOptions()} a="dji-mini-5-pro" b="dji-air-3s" />
        </div>
      </PageHero>

      <Section className="py-14 sm:py-16">
        <SectionHeading
          title="Popular comparisons"
          subtitle="The drones people weigh up most often before they buy."
        />
        <div className="mt-8">
          <PairCards pairs={POPULAR.slice(0, FEATURED)} />
        </div>
        <h3 className="mt-10 font-display text-xl font-semibold text-night">More comparisons</h3>
        <ul className="mt-3 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR.slice(FEATURED).map(([x, y]) => {
            const a = getCompareDrone(x);
            const b = getCompareDrone(y);
            if (!a || !b) return null;
            return (
              <li key={`${x}|${y}`} className="border-b border-night/10">
                <Link href={comparePath(x, y)} className="tap block py-2.5 text-night/80 hover:text-ocean">
                  {a.name} vs {b.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="ranking" className="bg-sand py-14 sm:py-16">
        <SectionHeading
          title="The full ranking"
          subtitle="Every drone on our list, scored out of 100 in five areas. Tap Compare on any two to put them side by side."
        />
        <div className="mt-8">
          <RankingList rows={rankRows} series={seriesList()} />
        </div>
      </Section>

      <Section className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-medium text-night sm:text-4xl">How the score works</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-night/75">
              <p>
                For each spec we place every drone on a line from the weakest to the best on this page. The best
                gets full marks, the weakest gets none, and the rest fall in between. Specs that matter more, like
                sensor size, flight time and obstacle sensing, count for more in their area.
              </p>
              <p>
                The overall score is the average of the five areas. Camera counts a little more and travel a
                little less, because picture quality is why most people buy a camera drone.
              </p>
              <p>
                The scores compare these drones with each other. A score of 50 is not a bad drone; it sits in the
                middle of DJI&apos;s own range, old and new.
              </p>
            </div>
          </div>
          <div>
            <ul className="divide-y divide-night/15 border-y border-night/15">
              {AREAS.map((a) => (
                <li key={a.id} className="flex items-baseline justify-between gap-6 py-4">
                  <span>
                    <span className="font-semibold text-night">{a.label}</span>
                    <span className="block text-sm text-night/70">{a.blurb}</span>
                  </span>
                  <span className="num shrink-0 text-sm text-night/70">
                    counts {AREA_WEIGHTS[a.id] === 1 ? "once" : `${AREA_WEIGHTS[a.id]} times`}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-night/70">
              Specs from{" "}
              <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-ocean hover:underline">
                DJI&apos;s drone comparison page
              </a>
              , checked {SOURCE_CHECKED}. The top score right now belongs to the {top.name}, with {score(top)}.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pb-16 sm:pb-20">
        <SectionHeading title="Questions" align="left" />
        <div className="mt-6">
          <Faq
            items={[
              {
                q: "Where do these specs come from?",
                a: (
                  <p>
                    From DJI&apos;s own comparison page for its camera drones, checked on {SOURCE_CHECKED}. We use the
                    figures for the standard drone with its standard battery. Where a Plus battery or a Cine version
                    changes something, the page says so next to the number.
                  </p>
                ),
              },
              {
                q: "Which DJI drones weigh under 250 g?",
                a: (
                  <p>
                    Of the drones DJI still makes: the {joinList(light.map((d) => d.short))}. In Sri Lanka a drone under
                    250 g does not need public liability insurance, but every camera drone must still be registered
                    with CAASL. The larger Plus batteries take these drones over 250 g.{" "}
                    <Link href={RULES_PATH} className="font-semibold text-ocean hover:underline">
                      Read the Sri Lanka drone rules
                    </Link>
                    .
                  </p>
                ),
              },
              {
                q: "Which DJI drone flies the longest?",
                a: (
                  <p>
                    On a standard battery the {longest.name}, at {longest.flightMin} minutes. With the larger Plus
                    battery, the {joinList(plusTop.map((d) => d.short))} reach {plusTop[0]?.flightMinPlus} minutes,
                    but the Plus battery takes them over 250 g.
                  </p>
                ),
              },
              {
                q: "Is a higher score always the better buy?",
                a: (
                  <p>
                    No. The score adds up specs. A beginner who travels light may be happier with a small drone that
                    scores lower, and a wedding filmmaker may need the zoom camera on a bigger one. Use the area
                    scores and the &quot;Pick it if&quot; lines on each comparison to match a drone to what you film.
                  </p>
                ),
              },
              {
                q: "Which drones do you fly on your own shoots?",
                a: (
                  <p>
                    Of the drones on this page, we fly the {joinList(ours.map((d) => d.short))}.{" "}
                    <Link href="/fleet" className="font-semibold text-ocean hover:underline">
                      See our drones
                    </Link>{" "}
                    or{" "}
                    <Link href="/shop" className="font-semibold text-ocean hover:underline">
                      buy one from our shop
                    </Link>
                    .
                  </p>
                ),
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
