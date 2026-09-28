/**
 * Service pages content.
 *
 * Facts here come from three places only: what the business already states on
 * the site (services, drones, permit help, 4K/6K, social clips, reply times),
 * the drone data in content.ts, and the official rules summarised in
 * drone-rules.ts. No prices, packages, clients, turnaround times or file
 * delivery methods: the business has not published those, so do not add them
 * here without a real source.
 *
 * Copy rules: simple English (A2 to B1), no dashes or hyphens, no marketing
 * filler words. "Sri Lanka" where it helps, not in every sentence.
 */

export type ServiceSection = {
  heading: string;
  body?: string[];
  list?: string[];
};

export type ServiceFaq = { q: string; a: string[] };

export type Service = {
  slug: string;
  /** Short label for cards and menus. */
  label: string;
  /** SEO title, without the brand suffix. */
  title: string;
  h1: string;
  description: string;
  cardText: string;
  serviceType: string;
  intro: string[];
  sections: ServiceSection[];
  /** Drone slugs from content.ts that suit this shoot. */
  drones: string[];
  /** Footage ids from content.ts, used as location examples only. */
  photos: string[];
  faqs: ServiceFaq[];
  message: string;
  related: string[];
};

export const SERVICES_PATH = "/services";

export const BOOKING_STEPS = [
  {
    title: "Send your date and location",
    text: "Message us on WhatsApp or use the contact form. Tell us where and when, and what you want filmed.",
  },
  {
    title: "We check the place and the approvals",
    text: "We look at the official drone map and tell you which approvals the place needs, and if anything is not possible.",
  },
  {
    title: "We agree the plan and price",
    text: "You get a clear plan for the shoot and a price before you confirm.",
  },
  {
    title: "We film and send your files",
    text: "We fly on the agreed day, edit the footage and send you the final video and photos.",
  },
];

export const PRICE_FACTORS = [
  "How many hours or days we film",
  "Where the shoot is and how far we travel",
  "Which drone the shoot needs",
  "The approvals the place needs",
  "How much editing you want, and which files you get",
];

const WEATHER_NOTE =
  "Rain in Sri Lanka follows two monsoons. From May to September the southwest monsoon brings most of the rain to the south and west coasts and the hills, while the east coast is usually drier. From December to February the northeast monsoon brings rain to the north and east. October and November can be wet across most of the island.";

export const services: Service[] = [
  {
    slug: "travel-drone-videography",
    label: "Travel videos",
    title: "Travel Drone Videography in Sri Lanka",
    h1: "Travel drone videography in Sri Lanka",
    description:
      "Hire a local drone team to film your Sri Lanka trip, honeymoon or travel content. We handle the drone approval and plan flights around your route and the weather.",
    cardText: "Drone video of your trip, honeymoon or travel content, filmed at the places on your route.",
    serviceType: "Travel drone videography",
    intro: [
      "Want drone footage of your Sri Lanka trip, but do not want to bring a drone or apply for drone approval yourself? We fly for you. You enjoy the place, and we film it from above.",
      "We film couples, families, solo travellers and content creators. Send us your route and dates, and we tell you which places work for drone filming and which need extra permission.",
    ],
    sections: [
      {
        heading: "Who books a travel drone shoot",
        list: [
          "Couples on honeymoon or celebrating an anniversary",
          "Families and groups who want a video of the trip",
          "YouTubers, travel creators and influencers who need aerial shots",
          "Surfers, hikers and road trippers who want to be filmed in action",
        ],
      },
      {
        heading: "What we can film",
        body: [
          "Most travel shoots happen at viewpoints, beaches, tea country, lakes and waterfalls. We can film you walking, driving, swimming or surfing. We can also film your hotel or villa if the owner agrees.",
          "The drone can follow you as you move, for example along a beach or a quiet road. Sri Lankan rules say the pilot must keep the drone in sight, so we plan where the pilot stands before we take off.",
        ],
      },
      {
        heading: "Places that need extra permission",
        body: [
          "Some famous places are protected. Sigiriya and other archaeological sites, national parks and wildlife areas need a special approval on top of the normal drone approval, and it is not always given. Restricted areas on the official drone map need a security clearance that must be requested at least 14 days before the flight.",
          "Send us your route early. We check each place and tell you what is possible before you book.",
        ],
      },
      {
        heading: "What you get",
        list: [
          "An edited video of your trip",
          "Short clips for social media",
          "Drone photos, if you want them",
          "Video in 4K, or in 6K with our DJI Mavic 4 Pro",
        ],
      },
      {
        heading: "Light and weather",
        body: [
          "Drones may only fly in daylight, from the start of civil twilight in the morning to its end in the evening. Sunrise and the last hour before sunset usually give the softest light.",
          "The rules also stop drone flights in rain, gusty wind, thunder and low visibility. If the weather turns, we talk with you about moving the flight.",
          WEATHER_NOTE,
        ],
      },
    ],
    drones: ["dji-mini-2", "dji-air-3", "dji-mavic-air-2", "dji-avata-2"],
    photos: ["hiriketiya-bay", "hills-around-ella", "kalpitiya-sand-islands", "lakegala-peak-meemure"],
    faqs: [
      {
        q: "Can I book before I arrive in Sri Lanka?",
        a: [
          "Yes. You can book from home on WhatsApp or by email. Contact us early, because drone approvals are processed on working days and some places need extra time.",
        ],
      },
      {
        q: "Do I need my own drone permit if you film me?",
        a: [
          "No. When we fly our drones for you, we are the operator and we handle the drone approval. For some places we also need a letter from the property owner or another authority. We tell you early if that is the case.",
        ],
      },
      {
        q: "Can you film at Sigiriya?",
        a: [
          "Sigiriya is a protected archaeological site. Flying there needs a special approval from the heritage authorities as well as the normal CAASL approval, and it may not be given. Ask us before you plan your day there and we will tell you what is possible.",
        ],
      },
      {
        q: "What happens if it rains on the day?",
        a: [
          "Drones are not allowed to fly in rain, gusty wind, thunder or poor visibility. If the weather is bad, the flight has to wait. We will talk with you about another time or day that fits your plans.",
        ],
      },
      {
        q: "Do I get clips for social media?",
        a: ["Yes. Along with the main video, you also get short clips for social media."],
      },
    ],
    message: "Hi! I'm planning a trip to Sri Lanka and would like a drone video of my trip. My dates and places are: ",
    related: ["drone-photography", "wedding-drone-videography"],
  },
  {
    slug: "wedding-drone-videography",
    label: "Weddings and events",
    title: "Wedding Drone Videography in Sri Lanka",
    h1: "Wedding drone videography in Sri Lanka",
    description:
      "Drone filming for weddings, elopements and destination weddings in Sri Lanka. Aerial shots of your venue, ceremony and couple session, within the drone rules.",
    cardText: "Aerial shots of your venue, ceremony and couple session, for local and destination weddings.",
    serviceType: "Wedding drone videography",
    intro: [
      "A drone shows what a ground camera cannot: the beach or hills around your venue, the setting of the ceremony, and the two of you in the middle of it.",
      "We film weddings, elopements and events across Sri Lanka, including destination weddings for couples who live abroad. We can work alongside your photographer and videographer on the day.",
    ],
    sections: [
      {
        heading: "What a wedding drone shoot covers",
        list: [
          "Wide shots of the venue and the place around it",
          "The couple walking on the beach, in a garden or at a viewpoint",
          "Arrivals and the ceremony area, filmed from a safe distance",
          "Indoor venue shots with our small drones that have covered propellers",
        ],
      },
      {
        heading: "Drone rules that shape a wedding shoot",
        list: [
          "Normal drone flights over crowds are not allowed. We film the ceremony and the guests from the side and from a safe distance, not straight above them.",
          "Outdoor flights are only allowed in daylight, until the end of civil twilight after sunset. Plan the aerial shots for the ceremony, the couple session or sunset, not the evening party.",
          "People filmed close to the drone should know it is flying and agree to it. We explain this to you and your planner before the day.",
          "The venue must agree to the flight. For paid shoots the approval process asks for a letter from the property owner or manager.",
          "Flights inside a building do not need a CAASL flight approval under the current standard, so indoor shots are easier to arrange.",
        ],
      },
      {
        heading: "Planning a destination wedding from abroad",
        body: [
          "You can plan everything with us on WhatsApp or by email. Send us the date, the venue and the plan for the day. We check the venue on the official drone map, tell you which approvals it needs and how early to start, and agree the shots with you and your planner.",
        ],
      },
      {
        heading: "What you get",
        list: [
          "An edited drone video of your day",
          "Short clips for social media",
          "Drone photos of the venue and the couple, if you want them",
        ],
      },
      {
        heading: "Weather on the day",
        body: [
          "Drones cannot fly in rain, gusty wind or thunder, so the aerial plan depends on the weather on the day.",
          WEATHER_NOTE,
        ],
      },
    ],
    drones: ["dji-air-3", "dji-air-3s", "dji-mavic-4-pro", "dji-avata-360", "dji-avata-2"],
    photos: ["hiriketiya-bay", "kandy-lake-dusk", "sigiriya-sunset"],
    faqs: [
      {
        q: "Can the drone fly over our guests?",
        a: [
          "No. Sri Lankan rules do not allow normal drone flights over groups of people. We film the ceremony and the guests from the side and from a safe distance.",
        ],
      },
      {
        q: "Can you film our evening reception?",
        a: [
          "Outdoor drone flights must end at the end of civil twilight, shortly after sunset. In the evening we can film inside the venue with a small drone that has covered propellers, if the venue agrees.",
        ],
      },
      {
        q: "Our wedding is at a hotel. What do you need from the hotel?",
        a: [
          "The hotel must agree to the flight. For the approval we usually need a short letter from the hotel with the date, time and place of the shoot.",
        ],
      },
      {
        q: "How early should we book?",
        a: [
          "As early as you can. Your date is fixed, and some approvals, such as flights in restricted areas, must be requested at least 14 days before the flight.",
        ],
      },
    ],
    message: "Hi! We are getting married in Sri Lanka and would like drone filming. Our date and venue are: ",
    related: ["hotel-resort-drone-videography", "travel-drone-videography"],
  },
  {
    slug: "hotel-resort-drone-videography",
    label: "Hotels and resorts",
    title: "Hotel and Resort Drone Videography in Sri Lanka",
    h1: "Hotel and resort drone videography in Sri Lanka",
    description:
      "Drone video and aerial photos for hotels, resorts and villas in Sri Lanka. Show guests your setting, pool and view, plus indoor fly through tours with small drones.",
    cardText: "Aerial video and photos that show your hotel, its setting and the view, for your website and booking pages.",
    serviceType: "Hotel and resort drone videography",
    intro: [
      "Guests want to see where they will stay before they book. A drone shows your hotel in one shot: the building, the pool, the garden, the beach or hills around it, and how close it is to the sights.",
      "We film hotels, resorts, villas and guest houses for websites, booking pages, social media and advertising.",
    ],
    sections: [
      {
        heading: "Shots we can film for you",
        list: [
          "The property and its setting, from high and wide",
          "Pool, garden, beach and view shots at the best time of day",
          "Indoor fly through tours of the lobby, restaurant and rooms",
          "Drone photos for your website and booking pages",
        ],
      },
      {
        heading: "Indoor tours with small drones",
        body: [
          "Our DJI Avata 360 and DJI Avata 2 have covers around the propellers, so they can fly close to walls and furniture. The Avata 360 films in every direction at once, so the angle can be chosen after the flight.",
          "Under the current CAASL standard, flights inside a building do not need a CAASL flight approval. We still need your permission and a quiet time to fly.",
        ],
      },
      {
        heading: "What we need from the hotel",
        list: [
          "Permission from the owner or management for the flight",
          "A request letter on your letterhead with the date, time and place of the shoot, for the drone approval",
          "A contact person on the day",
          "A time when the areas we film are quiet, or guests who agree to be filmed",
        ],
      },
      {
        heading: "When to film",
        body: [
          "Outdoor drone flights are only allowed in daylight, so we plan the aerial shots for the morning and afternoon. Early morning and late afternoon usually give the softest light.",
          WEATHER_NOTE,
        ],
      },
      {
        heading: "Where we film hotels",
        body: [
          "We are based in Colombo and travel to shoots across the island, from the south and east coasts to the hills and the area around Sigiriya and Dambulla. Some hotels sit near protected sites or airports, which adds approval steps. We check this on the official drone map before we plan the shoot.",
        ],
      },
    ],
    drones: ["dji-air-3s", "dji-avata-360", "dji-avata-2", "dji-avata", "dji-mavic-4-pro"],
    photos: ["kandalama-reservoir", "hiriketiya-bay", "sea-of-clouds-sunrise"],
    faqs: [
      {
        q: "Do guests need to leave the area while you fly?",
        a: [
          "Not always. We keep the drone at a safe distance from people who are not part of the shoot, and anyone filmed close up should agree to it. Early mornings are often easiest.",
        ],
      },
      {
        q: "Can you fly inside the hotel?",
        a: [
          "Yes. We use small drones with covered propellers for indoor tours. Under the current CAASL standard, flying inside a building does not need a CAASL flight approval, but we still need your permission.",
        ],
      },
      {
        q: "Do you film outside Colombo?",
        a: ["Yes. We are based in Colombo and travel to shoots across Sri Lanka."],
      },
    ],
    message: "Hi! I'd like a drone video for our hotel in Sri Lanka. The hotel and location are: ",
    related: ["property-drone-photography", "drone-photography"],
  },
  {
    slug: "property-drone-photography",
    label: "Property and land",
    title: "Property Drone Photography in Sri Lanka",
    h1: "Property and land drone photography in Sri Lanka",
    description:
      "Aerial photos and video of villas, houses and land for sale or rent in Sri Lanka. Show the size of the plot, the view and what is around it.",
    cardText: "Clear aerial photos and video of villas, houses and land for sale, rent or planning.",
    serviceType: "Property drone photography",
    intro: [
      "From the ground it is hard to show the size of a plot, the view, or how close it is to the beach or the main road. From the air it takes one photo.",
      "We photograph and film villas, houses, land and building sites for owners and agents. It also helps buyers who live abroad and cannot see the place in person.",
    ],
    sections: [
      {
        heading: "What we can photograph and film",
        list: [
          "The whole plot from above, to show its size and shape",
          "The house, pool and garden",
          "What the view would look like from an upper floor",
          "Access roads, the beach or the nearest town",
          "A short video tour for listing pages",
        ],
      },
      {
        heading: "Privacy and neighbours",
        body: [
          "The rules ask drone operators to film only what they planned to film and to respect other people's privacy. We keep the camera on your property and avoid filming into neighbours' homes and gardens.",
        ],
      },
      {
        heading: "What we need from you",
        list: [
          "Permission from the owner to fly over the property",
          "The address or GPS location",
          "For paid work, a request letter or no objection letter from the owner for the drone approval",
        ],
      },
      {
        heading: "Buying from abroad",
        body: [
          "If you are buying from abroad, a drone video helps you look at the land before you travel. Send us the location and tell us what you want to see. We still need the owner's permission to fly over it.",
        ],
      },
    ],
    drones: ["dji-air-3s", "dji-mavic-4-pro", "dji-air-3"],
    photos: ["knuckles-rice-terraces", "kalpitiya-lagoon-island", "mahaweli-reservoir-hills"],
    faqs: [
      {
        q: "Can you film land I want to buy?",
        a: ["Yes, if the owner agrees to the flight. Send us the location and we will tell you what is possible."],
      },
      {
        q: "Is a drone photo the same as a land survey?",
        a: [
          "No. Our photos and videos are for showing a property. For boundaries and measurements you still need a licensed surveyor.",
        ],
      },
      {
        q: "What if the land is near a protected area?",
        a: [
          "Places inside restricted areas, protected forests or archaeological sites need extra approvals, and some cannot be flown. We check the location on the official drone map first.",
        ],
      },
    ],
    message: "Hi! I'd like drone photos or video of a property in Sri Lanka. The location is: ",
    related: ["hotel-resort-drone-videography", "drone-photography"],
  },
  {
    slug: "drone-photography",
    label: "Drone photography",
    title: "Drone Photography in Sri Lanka",
    h1: "Drone photography in Sri Lanka",
    description:
      "Aerial photos of places, hotels, property and your trip in Sri Lanka, taken with our own DJI drones. See our photos of Sigiriya, Kandy, the hills and the coast.",
    cardText: "High resolution aerial photos of places, hotels, property and your trip.",
    serviceType: "Drone photography",
    intro: [
      "Every photo in our portfolio was taken by our own team with our own drones, at real places in Sri Lanka. We checked the location of each one by GPS and edited the colours ourselves.",
      "We take drone photos for travellers, hotels, property owners and anyone who needs aerial pictures of a place on the island.",
    ],
    sections: [
      {
        heading: "Cameras we use for photos",
        list: [
          "DJI Mavic 4 Pro: 100 MP Hasselblad camera and two zoom cameras",
          "DJI Air 3S: 1 inch main camera with 50 MP photos",
          "DJI Mavic Air 2: 48 MP photos",
        ],
      },
      {
        heading: "What people use drone photos for",
        list: [
          "Travel memories and prints",
          "Hotel websites and booking pages",
          "Property listings",
          "Social media and articles",
        ],
      },
      {
        heading: "Photos and video on the same shoot",
        body: [
          "Most shoots can include both photos and video. Tell us which matters more to you, so we plan the time and the light around it.",
        ],
      },
      {
        heading: "Light and weather",
        body: [
          "Drones may only fly in daylight, and not in rain, gusty wind or low visibility. Sunrise and the last hour before sunset usually give the softest light. In the hills, early mornings can bring a sea of clouds below the peaks, like our sunrise photo from the central hills.",
          WEATHER_NOTE,
        ],
      },
    ],
    drones: ["dji-mavic-4-pro", "dji-air-3s", "dji-air-3", "dji-mavic-air-2"],
    photos: [
      "sea-of-clouds-sunrise",
      "sigiriya-rock-pidurangala",
      "arippu-doric-sunset",
      "gartmore-falls",
      "kandy-lake-dusk",
      "hiriketiya-bay",
    ],
    faqs: [
      {
        q: "Are your portfolio photos real?",
        a: [
          "Yes. Every photo in our portfolio was taken by our own team with our own drones in Sri Lanka. We do not use stock images.",
        ],
      },
      {
        q: "Can I get photos and video on the same day?",
        a: ["Yes. Most shoots can include both. Tell us what you need most."],
      },
      {
        q: "Can you photograph a place I choose?",
        a: [
          "Yes, if drones are allowed to fly there. Some places need extra approval, and some cannot be flown at all. Ask us about your place and we will check it.",
        ],
      },
    ],
    message: "Hi! I'd like drone photos in Sri Lanka. The place and date are: ",
    related: ["travel-drone-videography", "property-drone-photography"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicePath(slug: string): string {
  return `${SERVICES_PATH}/${slug}`;
}
