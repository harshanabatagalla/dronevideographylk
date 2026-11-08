import type { BlogPost } from "@/lib/blog";

export const waterfalls: BlogPost = {
  slug: "drone-filming-at-sri-lankan-waterfalls",
  title: "Drone filming at Sri Lankan waterfalls: heights, seasons and rules",
  seoTitle: "Drone Filming at Waterfalls in Sri Lanka",
  description:
    "Drone filming at Sri Lankan waterfalls: the tallest falls and their heights, why rain decides the shoot and how the 120 m height rule works on a cliff.",
  excerpt:
    "Bambarakanda, Diyaluma, Laxapana, Aberdeen and more: heights, where they are and what to plan for when you film them from above.",
  category: "Places",
  published: "2026-11-09",
  updated: "2026-11-09",
  cover: "bambarakanda-falls",
  keywords: [
    "waterfall drone Sri Lanka",
    "Bambarakanda Falls drone",
    "Diyaluma Falls aerial",
    "best waterfalls Sri Lanka",
  ],
  intro: [
    "Sri Lanka has waterfalls of every size, from small cascades by the road to falls that drop for hundreds of metres. A drone is the best way to show scale, because it can start at the base and rise along the cliff.",
    "This guide lists the main falls with their heights, then covers what a waterfall shoot needs: a dry window, a safe place for the pilot and a clear view of the height rule.",
  ],
  blocks: [
    { type: "h2", id: "heights", text: "The main waterfalls and their heights" },
    {
      type: "table",
      caption: "Heights as listed for each waterfall. Treat them as a guide.",
      head: ["Waterfall", "Height", "Where"],
      rows: [
        ["Bambarakanda Falls", "263 m", "Badulla District, Uva Province"],
        ["Diyaluma Falls", "220 m", "Badulla District, Uva Province"],
        ["Laxapana Falls", "129 m", "Nuwara Eliya District, Central Province"],
        ["Aberdeen Falls", "98 m", "Central Province"],
        ["Devon Falls", "97 m", "Central Province"],
        ["St. Clair's Falls", "80 m", "Central Province"],
        ["Dunhinda Falls", "63 m", "Badulla District, Uva Province"],
        ["Bomburu Ella", "50 m", "Uva Province"],
        ["Ravana Ella", "25 m", "Badulla District, Uva Province"],
      ],
    },
    {
      type: "p",
      text: "Bambarakanda is the tallest waterfall in Sri Lanka, and Diyaluma is the second highest. We have photographed Bambarakanda, Aberdeen, Lakshapana, Gartmore and Bomburu Ella ourselves.",
    },
    { type: "photo", id: "bambarakanda-falls", caption: "Bambarakanda Falls, the tallest waterfall in Sri Lanka. Our team took this photo." },

    { type: "h2", id: "rain", text: "Rain makes the falls, and stops the drone" },
    {
      type: "p",
      text: "Waterfalls are fullest during and after the rains. Drones cannot fly in rain, gusty wind, thunder or low visibility. So a waterfall shoot needs a dry window after a wet spell, and that is hard to promise. Keep a spare day, and plan more than one fall in the area.",
    },
    {
      type: "p",
      text: "Mist and spray also hang in the gorge after rain, and visibility can drop fast. Read [the best time for drone filming in Sri Lanka](/blog/best-time-for-drone-filming-in-sri-lanka) to pick the month.",
    },

    { type: "h2", id: "height-rule", text: "The 120 m rule on a tall cliff" },
    {
      type: "p",
      text: "A drone may fly no higher than 120 m above the ground. In the hills, the standard measures this from the closest point of the ground below the drone. That helps on a cliff face: the drone can follow the fall while the ground stays close below it. It also means a pilot must watch the height carefully against a wall of rock, and keep the drone in sight.",
    },
    { type: "photo", id: "aberdeen-falls", caption: "Aberdeen Falls in the central hills. Our team took this photo." },

    { type: "h2", id: "pilot", text: "Where the pilot stands" },
    {
      type: "p",
      text: "The drone must stay in the pilot's sight. For a fall in a gorge, that means the pilot needs a safe spot with a clear line to the water and the cliff. At busy falls, people stand at the viewpoints, and the drone never flies over them. We plan the pilot's position and the flight line before take off.",
    },

    { type: "h2", id: "rules", text: "Rules and permissions" },
    {
      type: "ul",
      items: [
        "Every outdoor flight needs CAASL approval, and each spot needs a check on the official drone zone map.",
        "Some falls sit in or beside forest reserves or protected land, which need extra approval from the authority that manages them.",
        "The land around a fall can be private. Ask the owner or the estate for permission.",
        "Never fly over people at the viewpoint or the pool.",
      ],
    },
    {
      type: "p",
      text: "For the tea country around Hatton and Maskeliya, read [drone filming in the tea country](/blog/drone-filming-in-the-tea-country). For Ella, see [drone filming in Ella and the hill country](/blog/drone-filming-in-ella-and-the-hill-country).",
    },

    { type: "h2", id: "drones", text: "Which drone for waterfalls" },
    {
      type: "p",
      text: "Wind in a gorge is unpredictable, so we pick a drone that holds steady. The DJI Air 3 and the DJI Mavic 4 Pro both hold steady in wind up to 12 m/s, and their zoom cameras let us frame a tall fall without flying too close to the spray. Our [drone fleet](/fleet) page lists them.",
    },
  ],
  faqs: [
    {
      q: "What is the tallest waterfall in Sri Lanka?",
      a: "Bambarakanda Falls, at 263 m, in Badulla District. Diyaluma Falls, at 220 m, is the second highest.",
    },
    {
      q: "Can you fly a drone at a waterfall in Sri Lanka?",
      a: "With CAASL approval, yes, at places where drones are allowed. Check each spot on the drone zone map, and keep away from people at the viewpoint.",
    },
    {
      q: "Why do waterfall shoots get postponed?",
      a: "Falls are fullest after rain, but drones cannot fly in rain, gusty wind or low visibility. A shoot needs a dry window, so a spare day helps.",
    },
    {
      q: "How does the 120 m limit work on a tall waterfall?",
      a: "In the hills the limit is measured from the closest point of the ground below the drone, so a drone can follow a cliff face while staying within 120 m of the ground beneath it.",
    },
  ],
  related: ["drone-filming-in-the-tea-country", "drone-filming-in-ella-and-the-hill-country", "best-time-for-drone-filming-in-sri-lanka"],
  ctaMessage: "Hi! I'd like drone filming at waterfalls in Sri Lanka. My dates and places are: ",
};
