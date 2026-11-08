import type { BlogPost } from "@/lib/blog";

export const registration: BlogPost = {
  slug: "drone-registration-and-flyer-id-in-sri-lanka",
  title: "Drone registration and Flyer ID in Sri Lanka explained",
  seoTitle: "Drone Registration and Flyer ID in Sri Lanka",
  description:
    "How drone registration and the Flyer ID work in Sri Lanka: what must be registered, the online exam, how long it lasts and what to carry.",
  excerpt:
    "Two registrations come before a flight approval in Sri Lanka: your drone and you as the pilot. Here is what each one means.",
  category: "Rules",
  published: "2026-11-09",
  updated: "2026-11-09",
  cover: "lakegala-peak-meemure",
  keywords: [
    "drone registration Sri Lanka",
    "Flyer ID Sri Lanka",
    "CAASL drone registration",
    "drone pilot licence Sri Lanka",
  ],
  intro: [
    "Before you can ask for permission to fly a drone in Sri Lanka, two things must be registered with the Civil Aviation Authority of Sri Lanka (CAASL): your drone and you. Many visitors miss this, because older guides online skip it.",
    "This guide explains both registrations in plain words. It follows the current CAASL standard, SLCAIS 053 Edition 02. Rules change, so confirm anything important on the CAASL website before you fly. Our [drone rules guide](/sri-lanka-drone-rules) lists the official sources.",
  ],
  blocks: [
    { type: "h2", id: "two", text: "Two registrations, not one" },
    {
      type: "p",
      text: "CAASL registers drones and it registers pilots. A drone registration says which drone is flying. A pilot registration says who is flying it and that the pilot has passed the theory. You need both, and visitors are not an exception.",
    },
    { type: "photo", id: "lakegala-peak-meemure", caption: "Lakegala peak above Meemure. Reaching a place like this starts long before take off, with registration and approval." },

    { type: "h2", id: "drone", text: "Registering your drone" },
    {
      type: "p",
      text: "Most camera drones must be registered. Drones in the C1, C2 and C3 classes always need registration, and smaller C0 drones need it too if they carry a camera. That includes small drones under 250 g with a camera. Registration costs a set fee and lasts five years.",
    },
    {
      type: "ul",
      items: [
        "Apply through the CAASL Drone Flight Approval Portal, which asks for your pilot and drone details. CAASL also lists a paper form on its drones page.",
        "Once the drone is registered, it must carry the identification label that CAASL issues.",
        "Carry proof of registration every time you fly.",
      ],
    },

    { type: "h2", id: "pilot", text: "Registering yourself and getting a Flyer ID" },
    {
      type: "p",
      text: "Anyone who flies a drone in Sri Lanka, apart from toys, must be registered with CAASL. For normal flights, called the open category, you complete an online training course and a theory exam. When you pass you receive a Remote Pilot Competency Certificate, which CAASL also calls a Flyer ID.",
    },
    {
      type: "p",
      text: "More complex flights need a practical test and a medical as well. The standard says people who do not live in Sri Lanka follow the same rules, so a visitor needs a Flyer ID too. Pilots must usually be over 16.",
    },

    { type: "h2", id: "foreign", text: "If you already hold a licence from another country" },
    {
      type: "p",
      text: "A licence from another country does not replace the Sri Lankan Flyer ID for normal flights. CAASL may accept a foreign licence for more advanced flights, but you still take its theory exam and medical. For a short trip, that is a lot of work before a few flights.",
    },

    { type: "h2", id: "carry", text: "What to carry when you fly" },
    {
      type: "ul",
      items: [
        "Your flight approval from the CAASL portal",
        "Proof of drone registration",
        "Your Flyer ID",
        "A copy of your passport biodata page, because the application asks for it for leisure flights",
      ],
    },
    {
      type: "p",
      text: "Fly only at the places and times in your approval, and follow the flying rules: 120 m maximum height, the drone in sight, daylight only, no flying over crowds and no flying in rain or strong wind.",
    },

    { type: "h2", id: "fees", text: "Fees and timing" },
    {
      type: "p",
      text: "The standard says drone registration and the Flyer ID are issued on payment of a set fee. Check the current fees on the CAASL website, because they can change. CAASL does not publish a fixed processing time, so start as early as you can, and never fly before the approval arrives.",
    },

    { type: "h2", id: "alternative", text: "The short trip alternative" },
    {
      type: "p",
      text: "If you only want the footage, a local operator with registered drones and a registered pilot can fly for you and handle the approval. Read [hiring a pilot or flying your own](/blog/hire-a-drone-pilot-or-fly-your-own-in-sri-lanka) to compare, and [how to get a drone permit](/sri-lanka-drone-rules/how-to-get-a-drone-permit) for the step by step.",
    },
  ],
  faqs: [
    {
      q: "Do tourists need a Flyer ID in Sri Lanka?",
      a: "Anyone who flies a drone in Sri Lanka, apart from toys, must be registered with CAASL, and the standard says people who do not live in Sri Lanka follow the same rules. For normal flights that means an online training course and a theory exam.",
    },
    {
      q: "Does a small drone under 250 g need to be registered?",
      a: "A drone with a camera needs registration even under 250 g. The insurance rule is different and starts at 250 g.",
    },
    {
      q: "How long does drone registration last?",
      a: "Registration lasts five years and is issued on payment of a set fee. Check the current fee and rules on the CAASL website.",
    },
    {
      q: "Can a foreign drone licence be used in Sri Lanka?",
      a: "CAASL may accept a foreign licence for more advanced flights, but the CAASL theory exam and medical still apply. Normal flights need the Sri Lankan Flyer ID.",
    },
  ],
  related: ["drone-insurance-in-sri-lanka", "hire-a-drone-pilot-or-fly-your-own-in-sri-lanka", "drone-no-fly-zones-in-sri-lanka"],
  ctaMessage: "Hi! I'd like drone filming in Sri Lanka without arranging the registration myself. My dates and places are: ",
};
