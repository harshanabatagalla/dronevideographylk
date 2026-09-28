import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Faq } from "@/components/ui/Faq";
import { EnquiryCta } from "@/components/booking/EnquiryCta";
import { Bullets, Ext, GuideSection, OfficialSources, ReviewedNote, Toc } from "@/components/guides/GuideParts";
import { OFFICIAL, PERMIT_PATH, RULES_PATH, RULES_PUBLISHED, RULES_REVIEWED } from "@/lib/drone-rules";
import { SERVICES_PATH } from "@/lib/services";
import { articleJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

const TITLE = "How to Get a Drone Permit in Sri Lanka";
const DESCRIPTION =
  "Apply for drone approval in Sri Lanka step by step: the CAASL portal, documents for leisure and commercial flights, and extra approvals for protected places.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PERMIT_PATH, type: "article" });

const TOC = [
  { id: "short-answer", title: "The short answer" },
  { id: "before-you-apply", title: "Before you apply" },
  { id: "step-1", title: "Step 1: Check the drone zone map" },
  { id: "step-2", title: "Step 2: Get any extra approvals" },
  { id: "step-3", title: "Step 3: Prepare your documents" },
  { id: "step-4", title: "Step 4: Apply on the CAASL portal" },
  { id: "step-5", title: "Step 5: Wait for security clearance" },
  { id: "step-6", title: "Step 6: On the day" },
  { id: "contacts", title: "Who to contact" },
  { id: "questions", title: "Questions" },
  { id: "sources", title: "Official sources" },
];

export default function DronePermitPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: TITLE,
          description: DESCRIPTION,
          path: PERMIT_PATH,
          datePublished: RULES_PUBLISHED,
          dateModified: RULES_REVIEWED,
        })}
      />
      <PageHero
        crumbs={[
          { name: "Sri Lanka Drone Rules", path: RULES_PATH },
          { name: "How to Get a Drone Permit", path: PERMIT_PATH },
        ]}
        eyebrow="Drone guide"
        title="How to get a drone permit in Sri Lanka"
        intro={
          <p>
            The steps to get approval for a drone flight in Sri Lanka, and the documents you need for leisure
            and commercial flights.
          </p>
        }
      >
        <ReviewedNote />
      </PageHero>

      <Section className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <article className="space-y-14">
            <section id="short-answer" className="scroll-mt-28 rounded-3xl border border-sunset/40 bg-sunset/10 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-night">The short answer</h2>
              <p className="mt-3 text-lg leading-relaxed text-night/80">
                You apply online on the CAASL Drone Flight Approval Portal, with your pilot details, your drone
                details and the documents listed below. CAASL forwards the application to the Ministry of Defence
                for security clearance. If you want to fly in a restricted area, an archaeological site or a
                wildlife area, you need extra approvals as well.
              </p>
            </section>

            <GuideSection id="before-you-apply" title="Before you apply">
              <p>The current CAASL standard also asks for these, so sort them out first:</p>
              <Bullets
                items={[
                  "You are registered with CAASL as a drone pilot and hold a Flyer ID, which you get by passing its online training and theory exam. This applies to visitors too.",
                  "Your drone is registered with CAASL. Drones with a camera need registration even under 250 g.",
                  "Your drone has public liability insurance if it weighs 250 g or more.",
                  "You know the exact places you want to fly, with an address or GPS location for each.",
                ]}
              />
              <p>
                <Link href={RULES_PATH} className="font-semibold text-ocean hover:underline">
                  Read the full Sri Lanka drone rules
                </Link>{" "}
                for the details behind each point.
              </p>
            </GuideSection>

            <GuideSection id="step-1" title="Step 1: Check the drone zone map">
              <p>
                Open the <Ext href={OFFICIAL.zoneMap}>CAASL drone zone map</Ext> and look up every place you plan
                to fly. It shows restricted, authorisation, altitude and warning areas. This tells you if you
                need extra approvals in step 2, or if a place cannot be flown at all.
              </p>
            </GuideSection>

            <GuideSection id="step-2" title="Step 2: Get any extra approvals">
              <Bullets
                items={[
                  "Restricted areas: no drone may fly there on a normal clearance. For a real need, ask the Ministry of Defence for special clearance at least 14 days before the flight.",
                  <>Archaeological sites, such as Sigiriya: get a special approval or no objection letter from the relevant authority, such as the <Ext href={OFFICIAL.archaeology}>Department of Archaeology</Ext>.</>,
                  "Wildlife sanctuaries, national parks and forest reserves: get approval and a no objection letter from the authority that manages the area.",
                  "Airports: flights inside an airport zone on the map need approval from that airport's air traffic control.",
                  "Private property, hotels and venues: get permission from the owner or management.",
                  "Public areas, for commercial flights: get a no objection letter from the police.",
                ]}
              />
              <p>
                Approval letters should show the dates, times and the drone operator&apos;s details. The Ministry
                of Defence publishes a <Ext href="https://www.defence.lk/upload/doc/Standard_NOL_Form.pdf">sample no objection form</Ext>.
              </p>
            </GuideSection>

            <GuideSection id="step-3" title="Step 3: Prepare your documents">
              <h3 className="font-semibold text-night">For a leisure flight (holiday, personal use)</h3>
              <Bullets
                items={[
                  "The completed online application",
                  "A copy of your passport biodata page (Sri Lankans can use their National Identity Card or driving licence)",
                  "Your full name without initials, exactly as it appears in your passport",
                  "The address or GPS location of each flight",
                ]}
              />
              <h3 className="pt-2 font-semibold text-night">For a commercial flight (paid work, clients, brands)</h3>
              <Bullets
                items={[
                  "The completed online application",
                  "A request letter from the client on company letterhead, with the location, date and time of the flight and the drone operator's details",
                  "A copy of the operator's passport biodata page, National Identity Card or driving licence",
                  "Approvals or no objection letters from the relevant authorities, such as the property owner or management, and the police for public areas",
                  "The details of every pilot and every drone taking part, all in one application",
                ]}
              />
              <p>
                The Ministry of Defence says a commercial flight must never be declared as a leisure flight.
              </p>
            </GuideSection>

            <GuideSection id="step-4" title="Step 4: Apply on the CAASL portal">
              <p>
                Go to the <Ext href={OFFICIAL.portal}>CAASL Drone Flight Approval Portal</Ext>. The portal asks
                you to check the map, fill in the application with pilot and drone details, then upload your
                documents and wait for CAASL approval.
              </p>
            </GuideSection>

            <GuideSection id="step-5" title="Step 5: Wait for security clearance">
              <p>
                You do not apply to the Ministry of Defence yourself. It only gives security clearance for
                applications that CAASL forwards through the portal. The Ministry&apos;s drone section works on
                working days, Monday to Friday from 08:30 to 16:15, and not on government holidays. Applications
                sent at the weekend are handled on the next working day. If other government bodies must approve,
                it takes longer.
              </p>
              <p>
                There is no published processing time, so apply as early as you can. Do not fly until your
                approval arrives.
              </p>
            </GuideSection>

            <GuideSection id="step-6" title="Step 6: On the day">
              <Bullets
                items={[
                  "Carry your approval, proof of drone registration and your Flyer ID.",
                  "Fly only at the places and times in your approval.",
                  "Follow the flying rules: 120 m maximum height, keep the drone in sight, daylight only, no flying over crowds, and no flying in rain or strong wind.",
                ]}
              />
              <p>
                Special operations, such as drone swarms, follow CAASL publication SLCAP 4620 and must reach the
                Ministry of Defence at least three weeks before the flight.
              </p>
            </GuideSection>

            <GuideSection id="contacts" title="Who to contact">
              <Bullets
                items={[
                  <>CAASL: the <Ext href={OFFICIAL.caaslDrones}>drones page</Ext> has forms, contact details and updates.</>,
                  <>Ministry of Defence drone section: <a href="tel:+94112808961" className="font-semibold text-ocean hover:underline">+94 11 280 8961</a>, or see its <Ext href={OFFICIAL.modDrone}>drone clearance page</Ext>.</>,
                ]}
              />
            </GuideSection>

            <section id="questions" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold text-night sm:text-3xl">Questions</h2>
              <div className="mt-6">
                <Faq
                  items={[
                    {
                      q: "Is there a fee?",
                      a: (
                        <p>
                          The standard says drone registration and the Flyer ID are issued on payment of a set fee.
                          Check the current fees on the <Ext href={OFFICIAL.caaslDrones}>CAASL website</Ext>, as
                          they can change.
                        </p>
                      ),
                    },
                    {
                      q: "How early should I apply?",
                      a: (
                        <p>
                          As early as you can. There is no published processing time, approvals are handled on
                          working days, and clearance for restricted areas must be requested at least 14 days before
                          the flight.
                        </p>
                      ),
                    },
                    {
                      q: "Do I need a permit to fly indoors?",
                      a: (
                        <p>
                          The standard says its approval requirement does not apply to flights inside a building
                          or private home. You still need the owner&apos;s permission.
                        </p>
                      ),
                    },
                    {
                      q: "Can someone else fly for me instead?",
                      a: (
                        <p>
                          Yes. A local operator with registered drones can fly for you and handle the approval as
                          the operator.{" "}
                          <Link href={SERVICES_PATH} className="font-semibold text-ocean hover:underline">
                            See our drone filming services
                          </Link>
                          .
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
          </aside>
        </div>
      </Section>

      <EnquiryCta
        title="Rather we handle the permit?"
        text="When we fly for you, we are the operator and we apply for the approval. Send us your date and location on WhatsApp."
        message="Hi! I read your drone permit guide. I'd like you to film for me in Sri Lanka. My dates and places are: "
      />
    </>
  );
}
