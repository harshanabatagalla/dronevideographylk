import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { EnquiryCta, WhatsAppLink } from "@/components/booking/EnquiryCta";
import { PhotoGrid } from "@/components/services/ServiceBlocks";
import { RULES_PATH } from "@/lib/drone-rules";
import { SERVICES_PATH } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

const PATH = "/locations";

export const metadata = pageMetadata({
  title: "Drone Filming Locations in Sri Lanka",
  description:
    "Where we film with drones in Sri Lanka: Sigiriya, Kandy, the Knuckles, Ella, the waterfalls and the coast. Real photos from our portfolio and planning notes.",
  path: PATH,
});

/**
 * Only places the team has actually photographed (portfolio photos, located by
 * GPS). Notes stick to facts that are either common knowledge about the place
 * or checked in lib/drone-rules.ts. Add a region only with real photos.
 */
const REGIONS: {
  id: string;
  title: string;
  photos: string[];
  text: string[];
  notes: string[];
}[] = [
  {
    id: "sigiriya-and-the-cultural-triangle",
    title: "Sigiriya, Dambulla and the Cultural Triangle",
    photos: ["sigiriya-rock-pidurangala", "sigiriya-sunset", "kandalama-reservoir", "moragahakanda-reservoir", "mahaweli-river-somawathiya"],
    text: [
      "The flat forest around Sigiriya is broken by huge rocks. From the air you see the Sigiriya rock fortress with Pidurangala rock beside it, and big reservoirs such as Kandalama near Dambulla and Moragahakanda further east. The Mahaweli River winds through the forest near Somawathiya.",
    ],
    notes: [
      "Sigiriya and the Dambulla cave temple are protected archaeological sites. Flying over them needs a special approval from the heritage authorities as well as the normal drone approval, and it is not always given.",
      "Many hotels in this area sit close to these sites, so check the exact spot on the official drone map before planning a hotel shoot.",
    ],
  },
  {
    id: "kandy-and-the-knuckles",
    title: "Kandy and the Knuckles range",
    photos: ["kandy-lake-dusk", "knuckles-rice-terraces", "lakegala-peak-meemure", "theppukulama-mountain", "mahaweli-reservoir-hills"],
    text: [
      "Kandy is a lake city in the hills. East of it, the Knuckles range has sharp peaks, forest, old rice terraces and remote villages such as Meemure, below the steep peak of Lakegala.",
    ],
    notes: [
      "Kandy Lake is next to the Temple of the Tooth, one of the most important Buddhist sites in the country, and the area is busy with people.",
      "Much of the Knuckles range is protected forest. Check each spot before you plan a flight there.",
    ],
  },
  {
    id: "hill-country-and-ella",
    title: "Ella and the hill country",
    photos: ["hills-around-ella", "sea-of-clouds-sunrise"],
    text: [
      "Around Ella the hills are covered in tea estates, with the Nine Arch Bridge close to town. Early mornings in the central hills can bring a sea of clouds below the peaks, which is one of the best sights from a drone.",
    ],
    notes: [
      "Mist and low cloud are common in the hills. The rules do not allow drone flights in low visibility, so we plan around clear windows.",
      "The Nine Arch Bridge is crowded at train times. Drones must keep a safe distance from people and never fly over a crowd.",
    ],
  },
  {
    id: "waterfalls",
    title: "Waterfalls of the central hills",
    photos: ["bambarakanda-falls", "aberdeen-falls", "gartmore-falls", "lakshapana-falls", "bomburu-ella"],
    text: [
      "The central hills have some of the tallest waterfalls in Sri Lanka. Bambarakanda is the tallest in the country. Aberdeen, Gartmore and Lakshapana are in the tea country near Hatton and Maskeliya, and Bomburu Ella is in Uva Province.",
    ],
    notes: [
      "Waterfalls are fullest during and after the rains, but drones cannot fly in rain, so a shoot needs a dry window.",
    ],
  },
  {
    id: "south-coast",
    title: "The south coast",
    photos: ["hiriketiya-bay"],
    text: [
      "Hiriketiya is a small horseshoe bay near Dickwella, popular with surfers. Bays like this show well from above: the shape of the beach, the reef and the surf breaks.",
    ],
    notes: [
      "The south and west coasts get most of their rain from May to September, during the southwest monsoon.",
      "Beaches are public places, so the drone keeps away from other people and never flies over a crowd.",
    ],
  },
  {
    id: "west-and-northwest-coast",
    title: "Kalpitiya and the northwest coast",
    photos: ["kalpitiya-sand-islands", "kalpitiya-lagoon-island", "arippu-doric-sunset"],
    text: [
      "Kalpitiya has a long lagoon and sand islands off the coast, with clear shallow water that shows its colours from the air. Further north, at Arippu in Mannar, the ruins of the Doric, an old colonial house, stand on the sea cliff.",
    ],
    notes: [
      "We check each spot on the official drone map before we plan a shoot on this coast.",
    ],
  },
  {
    id: "east-coast",
    title: "Arugam Bay and the east coast",
    photos: ["arugam-bay-lagoon"],
    text: [
      "Arugam Bay has lagoons, rocks and long beaches. It is one of the best known surf spots in Sri Lanka.",
    ],
    notes: [
      "The east coast is usually drier from May to September, when the southwest monsoon brings rain to the other side of the island. From December to February the northeast monsoon brings rain here.",
    ],
  },
];

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Filming Locations", path: PATH }]}
        eyebrow="Where we film"
        title="Drone filming locations in Sri Lanka"
        intro={
          <p>
            These are places we have flown and photographed ourselves. Every photo on this page was taken with our
            own drones. We film in many other places too, so ask about yours.
          </p>
        }
      >
        <WhatsAppLink message="Hi! Can you film at this place in Sri Lanka? The place is: ">
          Ask about your location
        </WhatsAppLink>
      </PageHero>

      <Section className="py-10">
        <nav aria-label="Regions" className="flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <a
              key={r.id}
              href={`#${r.id}`}
              className="rounded-full border border-night/15 px-4 py-2 text-sm font-medium text-night/75 transition hover:border-ocean/40 hover:text-ocean"
            >
              {r.title}
            </a>
          ))}
        </nav>
      </Section>

      <div className="space-y-4 pb-10">
        {REGIONS.map((r) => (
          <Section key={r.id} className="py-10">
            <section id={r.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold text-night sm:text-3xl">{r.title}</h2>
              <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                <div className="space-y-4 leading-relaxed text-night/75">
                  {r.text.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <div className="rounded-2xl border border-night/10 bg-sand/60 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-night/60">
                    <Icon name="shield" size={14} /> Planning notes
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-night/75">
                    {r.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <PhotoGrid ids={r.photos} />
              </div>
            </section>
          </Section>
        ))}
      </div>

      <Section className="pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href={RULES_PATH}
            className="rounded-3xl border border-night/10 bg-white p-6 transition hover:border-ocean/40"
          >
            <h2 className="font-display text-xl font-semibold text-night">Drone rules in Sri Lanka</h2>
            <p className="mt-2 text-sm text-night/65">
              Which places need extra approval, and the flying rules for every location.
            </p>
          </Link>
          <Link
            href={SERVICES_PATH}
            className="rounded-3xl border border-night/10 bg-white p-6 transition hover:border-ocean/40"
          >
            <h2 className="font-display text-xl font-semibold text-night">Our drone services</h2>
            <p className="mt-2 text-sm text-night/65">Travel, wedding, hotel, property and photo shoots across the island.</p>
          </Link>
        </div>
      </Section>

      <EnquiryCta message="Hi! I'd like drone filming in Sri Lanka. The place and date are: " />
    </>
  );
}
