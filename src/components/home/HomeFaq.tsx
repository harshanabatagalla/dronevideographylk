import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { RULES_PATH } from "@/lib/drone-rules";
import { SERVICES_PATH } from "@/lib/services";

const link = "font-semibold text-ocean hover:underline";

export function HomeFaq() {
  return (
    <Section className="py-20 sm:py-24">
      <SectionHeading eyebrow="Questions" title="Questions travellers ask us" />
      <div className="mx-auto mt-12 max-w-3xl">
        <Faq
          items={[
            {
              q: "Can tourists fly drones in Sri Lanka?",
              a: (
                <p>
                  Yes, with approval. Before any outdoor flight you apply to the Civil Aviation Authority of Sri
                  Lanka (CAASL) on its online portal, and you must follow the flying rules. Protected places need
                  extra approval.{" "}
                  <Link href={RULES_PATH} className={link}>
                    Read our Sri Lanka drone rules guide
                  </Link>
                  .
                </p>
              ),
            },
            {
              q: "Can you get the drone permits for my shoot?",
              a: (
                <p>
                  When we fly for you, we handle the drone approval as the operator. Hotels, venues and land owners
                  need to give permission, usually as a short letter. Some places need extra approvals, and a few
                  cannot be flown. We tell you early.
                </p>
              ),
            },
            {
              q: "Can I book before I arrive in Sri Lanka?",
              a: (
                <p>
                  Yes. You can book from home on WhatsApp or by email. Contact us early, because approvals are
                  processed on working days and some places need extra time.
                </p>
              ),
            },
            {
              q: "Can I hire you for one day?",
              a: (
                <p>
                  Yes. We film half days, full days and events. Tell us what you need and we will plan the time
                  with you.
                </p>
              ),
            },
            {
              q: "What happens if it rains on the day?",
              a: (
                <p>
                  Drones are not allowed to fly in rain, gusty wind, thunder or poor visibility. If the weather is
                  bad, the flight has to wait, and we talk with you about another time or day.
                </p>
              ),
            },
            {
              q: "Can you film in 4K?",
              a: (
                <p>
                  Yes. All our drones film in 4K or higher. The DJI Mavic 4 Pro films in 6K, and the DJI Avata 360
                  films 360 degree video in 8K.
                </p>
              ),
            },
            {
              q: "Where in Sri Lanka do you film?",
              a: (
                <p>
                  We are based in Colombo and film across the island, from Sigiriya, Kandy and the tea country to
                  the south, west and east coasts.{" "}
                  <Link href="/locations" className={link}>
                    See our filming locations
                  </Link>
                  .
                </p>
              ),
            },
            {
              q: "How much does drone filming cost?",
              a: (
                <p>
                  It depends on the hours, the place, the drone, the approvals and the editing. Send us your plan
                  and we will send you a price before you book.{" "}
                  <Link href={SERVICES_PATH} className={link}>
                    See what changes the price
                  </Link>
                  .
                </p>
              ),
            },
          ]}
        />
      </div>
    </Section>
  );
}
