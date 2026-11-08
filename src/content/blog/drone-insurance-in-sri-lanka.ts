import type { BlogPost } from "@/lib/blog";

export const insurance: BlogPost = {
  slug: "drone-insurance-in-sri-lanka",
  title: "Drone insurance in Sri Lanka: the 250 g rule and what to ask",
  seoTitle: "Drone Insurance in Sri Lanka: The 250 g Rule",
  description:
    "Drone insurance in Sri Lanka: which drones need public liability cover, where CAASL lists the minimum by weight and what to ask an insurer.",
  excerpt:
    "Any drone of 250 g or more needs public liability insurance in Sri Lanka. Here is what that means and how to check your cover.",
  category: "Rules",
  published: "2026-11-09",
  updated: "2026-11-09",
  cover: "kalpitiya-sand-islands",
  keywords: [
    "drone insurance Sri Lanka",
    "public liability drone Sri Lanka",
    "CAASL drone insurance",
    "drone 250 g rule Sri Lanka",
  ],
  intro: [
    "Insurance is the part of drone rules that people skip, until something goes wrong. In Sri Lanka it is also part of the rules, not only a good idea.",
    "This guide explains the 250 g rule, what public liability insurance covers, and what to ask when you buy a policy or hire a pilot. It follows the current CAASL standard. Confirm the details on the CAASL website, because the rules and the table of cover can change.",
  ],
  blocks: [
    { type: "h2", id: "rule", text: "The 250 g rule" },
    {
      type: "p",
      text: "Any drone of 250 g or more needs valid public liability insurance. CAASL lists the minimum cover by drone weight on its [drones page](https://www.caa.lk/en/drones). Look up your drone's weight in that table before you buy a policy, so the cover matches what CAASL asks for.",
    },
    {
      type: "p",
      text: "The registration rule is different. A drone with a camera must be registered with CAASL even if it weighs less than 250 g, but the insurance rule starts at 250 g. Our guide to [drone registration and the Flyer ID](/blog/drone-registration-and-flyer-id-in-sri-lanka) covers registration.",
    },

    { type: "h2", id: "what", text: "What public liability cover means" },
    {
      type: "p",
      text: "Public liability, also called third party insurance, pays for injury or damage that your drone causes to other people or their property. It does not repair your own drone, and it does not cover a lost one. If a drone falls on a car or a person, this is the cover that responds.",
    },
    { type: "photo", id: "kalpitiya-sand-islands", caption: "Sand islands off Kalpitiya. Boats and kitesurfers share the water here, which is why cover for other people matters." },

    { type: "h2", id: "accident", text: "What happens after an accident" },
    {
      type: "p",
      text: "If your drone is in an accident that hurts someone or damages property, the standard asks you to report it to the nearest police station, and to CAASL within 24 hours. Insurance and a quick report go together. Keep your approval, your registration and your policy with you when you fly, so you can show them.",
    },

    { type: "h2", id: "mini", text: "A note on small drones" },
    {
      type: "p",
      text: "The DJI Mini 2 weighs 249 g. By the 250 g line as the standard states it, that is under the insurance rule, but the drone still needs registration and a flight approval. Do not treat the line as a reason to fly carelessly. A 249 g drone can still hurt a person. If you fly a small drone, check the current weight rules with CAASL before you travel.",
    },

    { type: "h2", id: "ask-an-insurer", text: "Questions to ask an insurer" },
    {
      type: "ul",
      items: [
        "Does the policy cover drone flights in Sri Lanka, and not only in my home country?",
        "Does it meet the minimum cover CAASL lists for my drone's weight?",
        "Does it cover commercial flights, or only personal flights?",
        "Does it cover me as a visitor, with a foreign address?",
        "Can you send the policy in writing, so I can show it to CAASL if asked?",
      ],
    },
    {
      type: "p",
      text: "Do not assume your travel policy or home policy covers a drone. Many policies exclude drones, so ask in writing before you fly.",
    },

    { type: "h2", id: "pilot", text: "If you hire a pilot" },
    {
      type: "p",
      text: "A pilot who flies for you should carry insurance for their drones and say so. Ask to see it. We fly registered drones with insured pilots, and the plan we send before you book says who is the operator and who applies for the approval. For the wider list of questions, read [how much drone videography costs in Sri Lanka](/blog/drone-videography-cost-in-sri-lanka).",
    },
    {
      type: "p",
      text: "If you would rather not arrange insurance and registration for a short trip, see [hiring a pilot or flying your own](/blog/hire-a-drone-pilot-or-fly-your-own-in-sri-lanka).",
    },
  ],
  faqs: [
    {
      q: "Do I need insurance to fly a drone in Sri Lanka?",
      a: "Any drone of 250 g or more needs valid public liability insurance. CAASL lists the minimum cover by weight on its drones page.",
    },
    {
      q: "What is public liability insurance for a drone?",
      a: "It pays for injury or damage your drone causes to other people or their property. It does not pay to repair or replace your own drone.",
    },
    {
      q: "Does my travel insurance cover a drone?",
      a: "Do not assume it does. Many policies exclude drones. Ask the insurer in writing whether it covers drone flights in Sri Lanka and meets the CAASL minimum.",
    },
    {
      q: "What do I do if my drone hurts someone or damages property?",
      a: "Report it to the nearest police station, and to CAASL within 24 hours, as the standard requires. Tell your insurer too.",
    },
  ],
  related: ["drone-registration-and-flyer-id-in-sri-lanka", "hire-a-drone-pilot-or-fly-your-own-in-sri-lanka", "what-happens-if-you-fly-a-drone-without-approval-in-sri-lanka"],
  ctaMessage: "Hi! I'd like a drone pilot with insurance for my trip to Sri Lanka. My dates and places are: ",
};
