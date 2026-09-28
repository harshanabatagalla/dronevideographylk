import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/ui/Faq";
import { EnquiryCta } from "@/components/booking/EnquiryCta";
import { Bullets, Ext, GuideSection, OfficialSources, ReviewedNote, Toc } from "@/components/guides/GuideParts";
import { OFFICIAL, PERMIT_PATH, RULES_PATH, RULES_PUBLISHED, RULES_REVIEWED } from "@/lib/drone-rules";
import { servicePath } from "@/lib/services";
import { articleJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

const TITLE = "Sri Lanka Drone Rules for Tourists (2026 Guide)";
const DESCRIPTION =
  "Can tourists fly drones in Sri Lanka? Yes, with CAASL approval. A plain guide to registration, insurance, no fly zones, Sigiriya and national parks.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: RULES_PATH, type: "article" });

const TOC = [
  { id: "short-answer", title: "The short answer" },
  { id: "checklist", title: "Checklist before you fly" },
  { id: "bringing-a-drone", title: "Can you bring a drone to Sri Lanka?" },
  { id: "ministry-of-defence", title: "Do you need Ministry of Defence clearance?" },
  { id: "registration", title: "Registration, pilot test and insurance" },
  { id: "flying-rules", title: "Flying rules" },
  { id: "where-you-cannot-fly", title: "Where you cannot fly without extra approval" },
  { id: "commercial", title: "Commercial drone filming" },
  { id: "how-to-apply", title: "How to apply" },
  { id: "penalties", title: "What happens if you break the rules" },
  { id: "hire-a-pilot", title: "If you would rather not fly yourself" },
  { id: "questions", title: "Questions" },
  { id: "sources", title: "Official sources" },
];

export default function DroneRulesPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: TITLE,
          description: DESCRIPTION,
          path: RULES_PATH,
          datePublished: RULES_PUBLISHED,
          dateModified: RULES_REVIEWED,
        })}
      />
      <PageHero
        crumbs={[{ name: "Sri Lanka Drone Rules", path: RULES_PATH }]}
        eyebrow="Drone guide"
        title="Sri Lanka drone rules for tourists"
        intro={
          <p>
            What you need to fly a drone in Sri Lanka as a visitor: the approval, registration, insurance, the
            flying rules, and the places that need extra permission.
          </p>
        }
      >
        <ReviewedNote />
      </PageHero>

      <Section className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <article className="space-y-14">
            <section id="short-answer" className="scroll-mt-28 rounded-3xl border border-sunset/40 bg-sunset/10 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-night">Can tourists fly drones in Sri Lanka?</h2>
              <p className="mt-3 text-lg leading-relaxed text-night/80">
                Yes, but not without approval. Before any outdoor flight you need approval from the Civil
                Aviation Authority of Sri Lanka (CAASL). You apply on its online Drone Flight Approval Portal,
                and the Ministry of Defence gives security clearance through the same process. You must also
                follow the flying rules, and protected places such as archaeological sites and wildlife areas
                need extra approval.
              </p>
            </section>

            <GuideSection id="checklist" title="Checklist before you fly">
              <Bullets
                items={[
                  <>Apply on the <Ext href={OFFICIAL.portal}>CAASL Drone Flight Approval Portal</Ext> before you fly.</>,
                  "Your drone must be registered with CAASL. A drone with a camera needs registration even if it weighs less than 250 g.",
                  "As the pilot, you must be registered with CAASL and pass its online training and theory exam (called a Flyer ID) for normal flights. Visitors follow the same rule.",
                  "A drone of 250 g or more needs third party (public liability) insurance.",
                  "Fly no higher than 120 m (400 ft) above the ground.",
                  "Keep the drone where you can see it with your own eyes.",
                  "Fly only in daylight, between the start of civil twilight in the morning and its end in the evening.",
                  "Do not fly over crowds, and keep a safe distance from people who are not part of your flight.",
                  "Do not fly in rain, gusty wind, thunder or poor visibility.",
                  <>Check the <Ext href={OFFICIAL.zoneMap}>official drone zone map</Ext>. Restricted areas, airports, archaeological sites and wildlife areas need extra approval, and some cannot be flown.</>,
                ]}
              />
            </GuideSection>

            <GuideSection id="bringing-a-drone" title="Can you bring a drone to Sri Lanka?">
              <p>
                Yes. CAASL says its drone import process is only for drones brought into the country for
                permanent use. If you are visiting and taking your drone home again, you do not follow that
                process. Instead, you apply for flying approval on the online portal.
              </p>
              <p>
                Bringing a drone in to keep or sell is different. That needs permission from the Ministry of
                Defence, CAASL, the Telecommunications Regulatory Commission and the Import and Export Control
                Department before the drone arrives.
              </p>
              <p>
                We could not find a separate customs procedure for visitors on the official websites. If you
                are not sure what to expect at the airport, contact CAASL before you travel.
              </p>
            </GuideSection>

            <GuideSection id="ministry-of-defence" title="Do you need Ministry of Defence clearance?">
              <p>
                Security clearance is still part of the process, but you do not apply to the Ministry of Defence
                yourself. The Ministry says it only gives drone security clearance for applications that CAASL
                forwards through the Drone Flight Approval Portal. Many older guides online still tell visitors
                to email the Ministry first. That is not the current process.
              </p>
              <p>
                The Ministry processes applications on working days, Monday to Friday from 08:30 to 16:15, and
                not on weekends or government holidays. Applications sent at the weekend are handled on the
                next working day, and applications that need approval from other government bodies take longer.
              </p>
            </GuideSection>

            <GuideSection id="registration" title="Registration, pilot test and insurance">
              <h3 className="font-semibold text-night">Your drone</h3>
              <p>
                Most camera drones must be registered with CAASL, including small drones under 250 g if they
                have a camera. Registered drones must carry the identification label issued by CAASL, and the
                pilot must carry proof of registration while flying.
              </p>
              <h3 className="font-semibold text-night">You, the pilot</h3>
              <p>
                Anyone who flies a drone in Sri Lanka, apart from toys, must be registered with CAASL. For
                normal flights (the &quot;open&quot; category) you complete an online training course and a
                theory exam to get a Remote Pilot Competency Certificate, also called a Flyer ID. More complex
                flights need a practical test and a medical as well. The standard says people who do not live
                in Sri Lanka follow the same rules. Pilots must usually be over 16.
              </p>
              <p>
                If you already hold a drone licence from another country, CAASL may accept it for more advanced
                flights, but you still take its theory exam and medical.
              </p>
              <h3 className="font-semibold text-night">Insurance</h3>
              <p>
                Any drone of 250 g or more needs valid public liability insurance. CAASL lists the minimum
                cover by drone weight on its <Ext href={OFFICIAL.caaslDrones}>drones page</Ext>.
              </p>
            </GuideSection>

            <GuideSection id="flying-rules" title="Flying rules">
              <p>These rules come from Implementing Standard SLCAIS 053, Edition 02, the current CAASL drone rules.</p>
              <Bullets
                items={[
                  "Maximum height is 120 m (400 ft) above the ground. In the hills this is measured from the closest point of the ground below the drone.",
                  "Keep the drone in sight at all times. The only exceptions are follow me mode and flying with an observer.",
                  "In the open category, goggle (FPV) drones may only be flown under the stricter A3 rules, which keep you at least 150 m from homes, businesses, factories and recreation areas.",
                  "Fly only in daylight, between the start of morning civil twilight and the end of evening civil twilight.",
                  "Never fly over crowds, and keep a safe distance from people who are not involved. People you film up close should know about the drone and agree to it.",
                  "Do not fly in rain, gusty wind, thunder, lightning or low visibility.",
                  "Do not carry or drop anything from the drone.",
                  "Fly one drone at a time, and never after alcohol or drugs.",
                  "Only film what you planned to film, and respect other people's privacy.",
                  "If your drone is in an accident that hurts someone or damages property, report it to the nearest police station, and to CAASL within 24 hours.",
                ]}
              />
              <p>
                Flying inside a building is different. The standard says its approval requirement does not apply
                to flights indoors in a building or private home.
              </p>
            </GuideSection>

            <GuideSection id="where-you-cannot-fly" title="Where you cannot fly without extra approval">
              <p>
                Start with the <Ext href={OFFICIAL.zoneMap}>CAASL drone zone map</Ext>. It shows restricted,
                authorisation, altitude and warning areas across the island.
              </p>
              <h3 className="font-semibold text-night">Restricted areas</h3>
              <p>
                No drone may fly in the restricted areas on the map, and a normal security clearance is not
                valid there. If you have a real need to fly in one, you must ask the Ministry of Defence for
                special clearance at least 14 days before the flight.
              </p>
              <h3 className="font-semibold text-night">Airports</h3>
              <p>
                You may not fly inside the airport zones shown on the map without approval from that
                airport&apos;s air traffic control.
              </p>
              <h3 className="font-semibold text-night">Archaeological sites, including Sigiriya</h3>
              <p>
                No drone may fly over an archaeological site without prior approval. You need a special
                approval or a no objection letter from the relevant government authority, such as the{" "}
                <Ext href={OFFICIAL.archaeology}>Department of Archaeology</Ext>, on top of your CAASL approval.
              </p>
              <p>
                Sigiriya is a protected archaeological site and a UNESCO World Heritage Site, so this applies
                there, as well as at places like Dambulla, Polonnaruwa, Anuradhapura and Galle Fort. Approval is
                not guaranteed. If you want aerial shots of Sigiriya, plan early or ask a local operator to check
                what is possible.
              </p>
              <h3 className="font-semibold text-night">National parks, wildlife sanctuaries and forests</h3>
              <p>
                The Ministry of Defence says no drone may fly in wildlife sanctuaries without prior approval and
                a no objection letter from the relevant authority. National parks such as Yala, Udawalawe and
                Wilpattu are run by the <Ext href={OFFICIAL.wildlife}>Department of Wildlife Conservation</Ext>,
                and forest reserves by the <Ext href={OFFICIAL.forest}>Forest Department</Ext>. Ask them before
                you plan any flight inside a park or reserve.
              </p>
            </GuideSection>

            <GuideSection id="commercial" title="Commercial drone filming">
              <p>
                If you are filming for a client, a brand or paid content, you must apply as a commercial
                operation. The Ministry of Defence says a commercial flight must never be declared as a leisure
                flight. Commercial applications need more documents, such as a request letter from the client and
                no objection letters from the property owner, and from the police for public areas.
              </p>
              <p>
                <Link href={PERMIT_PATH} className="font-semibold text-ocean hover:underline">
                  See the full document list in our drone permit guide
                </Link>
                .
              </p>
            </GuideSection>

            <GuideSection id="how-to-apply" title="How to apply">
              <ol className="list-decimal space-y-2 pl-5">
                <li>Check your flying spots on the drone zone map.</li>
                <li>Make sure you have your Flyer ID, drone registration and insurance sorted.</li>
                <li>Apply on the CAASL Drone Flight Approval Portal with your pilot and drone details and documents.</li>
                <li>Wait for approval before you fly. CAASL forwards the application to the Ministry of Defence.</li>
              </ol>
              <p>
                CAASL does not publish a fixed processing time, so apply as early as you can.{" "}
                <Link href={PERMIT_PATH} className="font-semibold text-ocean hover:underline">
                  Read the step by step permit guide
                </Link>
                .
              </p>
            </GuideSection>

            <GuideSection id="penalties" title="What happens if you break the rules">
              <p>
                Breaking the drone standard is an offence under Section 103 of the Civil Aviation Act No. 14 of
                2010, with penalties under Section 104. The Ministry of Defence says anyone flying without proper
                registration and approval may face legal action.
              </p>
            </GuideSection>

            <GuideSection id="hire-a-pilot" title="If you would rather not fly yourself">
              <p>
                The approval, pilot test and insurance take time to arrange before a short trip. If you mainly want
                the footage, a local operator can fly registered drones for you and handle the approval. That is
                what we do.
              </p>
              <p>
                <Link href={servicePath("travel-drone-videography")} className="font-semibold text-ocean hover:underline">
                  See our travel drone videography service
                </Link>{" "}
                or{" "}
                <Link href="/locations" className="font-semibold text-ocean hover:underline">
                  the places we film
                </Link>
                .
              </p>
            </GuideSection>

            <section id="questions" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold text-night sm:text-3xl">Questions</h2>
              <div className="mt-6">
                <Faq
                  items={[
                    {
                      q: "Can I fly a DJI Mini in Sri Lanka without registration?",
                      a: (
                        <p>
                          Not outdoors. Under the current standard a drone with a camera must be registered even if
                          it weighs under 250 g, and you still need flight approval. Drones under 250 g do not need
                          the insurance.
                        </p>
                      ),
                    },
                    {
                      q: "How long does drone approval take?",
                      a: (
                        <p>
                          CAASL does not publish a fixed time. Applications go through CAASL and the Ministry of
                          Defence on working days, and places that need extra approvals take longer. Clearance for
                          restricted areas must be requested at least 14 days before the flight.
                        </p>
                      ),
                    },
                    {
                      q: "Can I fly my drone on the beach?",
                      a: (
                        <p>
                          It depends on the exact spot. Check it on the drone zone map, keep away from people, and
                          never fly over a crowd. Your application asks for the address or GPS location of the
                          flight, so plan your spots before you apply.
                        </p>
                      ),
                    },
                    {
                      q: "Can I fly in Ella, Kandy or Nuwara Eliya?",
                      a: (
                        <p>
                          You need the same approval as anywhere else, and the rules depend on the exact spot.
                          Check the drone zone map, and keep away from crowds at busy places such as the Nine Arch
                          Bridge or around the Temple of the Tooth in Kandy.
                        </p>
                      ),
                    },
                    {
                      q: "Where can I find the official rules?",
                      a: (
                        <p>
                          The full rules are in Implementing Standard SLCAIS 053, Edition 02, on the{" "}
                          <Ext href={OFFICIAL.standard}>CAASL website</Ext>. See the list of official sources below.
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </section>

            <section id="sources" className="scroll-mt-28 rounded-3xl border border-night/10 bg-sand/60 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-night">Official sources</h2>
              <p className="mt-3 text-night/70">
                This page is a plain English summary, not legal advice. It is based on these official pages:
              </p>
              <div className="mt-4 text-night/75">
                <OfficialSources />
              </div>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Toc items={TOC} />
            <div className="rounded-3xl border border-night/10 bg-white p-6">
              <h2 className="font-display text-lg font-semibold text-night">Next step</h2>
              <p className="mt-2 text-sm text-night/70">The documents you need and the order to apply in.</p>
              <Link href={PERMIT_PATH} className="mt-3 inline-flex text-sm font-semibold text-ocean hover:underline">
                How to get a drone permit in Sri Lanka
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <EnquiryCta
        title="Want drone footage without the paperwork?"
        text="We fly our own registered drones and handle the approval for your shoot. Send us your plan on WhatsApp."
        message="Hi! I read your drone rules guide. I'd like you to film for me in Sri Lanka. My dates and places are: "
      />
    </>
  );
}
