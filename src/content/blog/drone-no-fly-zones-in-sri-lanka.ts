import type { BlogPost } from "@/lib/blog";

export const noFly: BlogPost = {
  slug: "drone-no-fly-zones-in-sri-lanka",
  title: "Drone no fly zones in Sri Lanka and how to check them",
  seoTitle: "Drone No Fly Zones in Sri Lanka",
  description:
    "Drone no fly zones in Sri Lanka: restricted areas, airports, heritage sites, parks and forests, and how to check any place on the CAASL map.",
  excerpt:
    "Where drones may not fly in Sri Lanka, which places need extra approval, and how to check any spot on the official zone map.",
  category: "Rules",
  published: "2026-11-09",
  updated: "2026-11-09",
  cover: "sigiriya-rock-pidurangala",
  keywords: [
    "drone no fly zone Sri Lanka",
    "CAASL drone zone map",
    "where can I fly a drone in Sri Lanka",
    "restricted areas drone Sri Lanka",
  ],
  intro: [
    "Sri Lanka is small, and many of its best views sit close to something a drone must avoid: an airport, a military area, an ancient site, a park. A place can be on a list of famous spots and still be closed to drones.",
    "This guide explains the main kinds of no fly zone, which places need extra approval, and how to check a spot before you plan a flight. It follows the current CAASL standard and the official sources in our [drone rules guide](/sri-lanka-drone-rules).",
  ],
  blocks: [
    { type: "h2", id: "map", text: "Start with the official map" },
    {
      type: "p",
      text: "CAASL publishes a [drone zone map](https://portal.caa.lk/drone/map.html) that shows restricted, authorisation, altitude and warning areas across the island. Look up every place you plan to fly. The map tells you if you need extra approvals, and if a place cannot be flown at all.",
    },
    {
      type: "p",
      text: "Check the exact spot, not only the town. A hotel can sit just outside a zone, and the next field can be inside one.",
    },

    { type: "h2", id: "restricted", text: "Restricted areas" },
    {
      type: "p",
      text: "No drone may fly in the restricted areas on the map, and a normal security clearance is not valid there. If you have a real need to fly in one, you must ask the Ministry of Defence for special clearance at least 14 days before the flight.",
    },

    { type: "h2", id: "airports", text: "Airports" },
    {
      type: "p",
      text: "You may not fly inside the airport zones shown on the map without approval from that airport's air traffic control. A hotel near an airport can still be filmed, but the approval has one more step, and we plan for it early.",
    },

    { type: "h2", id: "heritage", text: "Archaeological sites" },
    {
      type: "p",
      text: "No drone may fly over an archaeological site without prior approval. You need a special approval or a no objection letter from the relevant government authority, such as the Department of Archaeology, on top of your CAASL approval. Sigiriya is a protected archaeological site and a UNESCO World Heritage Site, so this applies there, and at places such as Dambulla, Polonnaruwa, Anuradhapura and Galle Fort. Approval is not guaranteed.",
    },
    { type: "photo", id: "sigiriya-rock-pidurangala", caption: "Sigiriya rock with Pidurangala beside it. Our team took this photo." },
    {
      type: "p",
      text: "Read our guides to [drone filming at Sigiriya](/blog/drone-filming-at-sigiriya) and [drone filming at Galle Fort](/blog/drone-filming-at-galle-fort) for the steps.",
    },

    { type: "h2", id: "parks", text: "National parks, wildlife sanctuaries and forests" },
    {
      type: "p",
      text: "The Ministry of Defence says no drone may fly in wildlife sanctuaries without prior approval and a no objection letter from the relevant authority. National parks such as Yala, Udawalawe and Wilpattu are run by the Department of Wildlife Conservation, and forest reserves by the Forest Department. Ask them before you plan any flight inside a park or reserve. Our guide to [drone filming in Sri Lankan national parks](/blog/drone-filming-in-sri-lankan-national-parks) explains more.",
    },

    { type: "h2", id: "rules", text: "Rules that apply everywhere" },
    {
      type: "p",
      text: "Some limits are not about a place. They apply on every flight:",
    },
    {
      type: "ul",
      items: [
        "Fly no higher than 120 m above the ground, and keep the drone in sight",
        "Never fly over crowds, and keep a safe distance from people who are not involved",
        "Fly only in daylight, and not in rain, gusty wind, thunder or low visibility",
        "In the open category, goggle drones follow the stricter A3 rules, which keep you at least 150 m from homes, businesses, factories and recreation areas",
      ],
    },
    {
      type: "p",
      text: "Events can close the sky for a while, too. During the 2025 Kandy Esala Perahera, CAASL suspended all drone operations over the procession route for the whole Perahera period. See [drone filming in Kandy](/blog/drone-filming-in-kandy).",
    },

    { type: "h2", id: "check", text: "A simple check before every plan" },
    {
      type: "ol",
      items: [
        "Put the exact spot on the CAASL zone map.",
        "Ask if it is a restricted area, an airport zone, a heritage site, a park or a reserve.",
        "If yes, find who gives the extra approval, and ask early.",
        "Ask the owner of the land or the hotel for permission.",
        "Apply on the CAASL portal and wait for approval before you fly.",
      ],
    },
    {
      type: "p",
      text: "When we plan a shoot, we do these checks for you, and we tell you early if a place is not possible. See [the best places for drone videography](/blog/best-places-for-drone-videography-in-sri-lanka) for each region.",
    },
  ],
  faqs: [
    {
      q: "Where can I not fly a drone in Sri Lanka?",
      a: "No drone may fly in restricted areas on the CAASL map. Airports, archaeological sites, wildlife sanctuaries, national parks and forest reserves need extra approval, and some places cannot be flown at all.",
    },
    {
      q: "How do I check if a place is a no fly zone?",
      a: "Open the CAASL drone zone map and look up the exact spot. It shows restricted, authorisation, altitude and warning areas.",
    },
    {
      q: "How early do I ask for a restricted area?",
      a: "Special clearance for a restricted area must be requested from the Ministry of Defence at least 14 days before the flight.",
    },
    {
      q: "Can I fly near an airport in Sri Lanka?",
      a: "Not inside an airport zone without approval from that airport's air traffic control.",
    },
  ],
  related: ["drone-filming-in-sri-lankan-national-parks", "drone-filming-at-sigiriya", "what-happens-if-you-fly-a-drone-without-approval-in-sri-lanka"],
  ctaMessage: "Hi! Could you check if I can film at a place in Sri Lanka? The place and date are: ",
};
