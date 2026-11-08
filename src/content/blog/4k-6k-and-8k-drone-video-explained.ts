import type { BlogPost } from "@/lib/blog";

export const resolution: BlogPost = {
  slug: "4k-6k-and-8k-drone-video-explained",
  title: "4K, 6K and 8K drone video explained",
  seoTitle: "4K, 6K and 8K Drone Video Explained",
  description:
    "What 4K, 6K and 8K mean for drone video, what fps means, when higher resolution helps and when it does not, and which of our drones film in which quality.",
  excerpt:
    "A plain explanation of resolution and frame rate for drone video, and how to choose the quality for your project.",
  category: "Drones",
  published: "2026-11-09",
  updated: "2026-11-09",
  cover: "sigiriya-sunset",
  keywords: [
    "4K 6K 8K drone video",
    "drone video resolution explained",
    "what is 6K drone video",
    "drone video quality Sri Lanka",
  ],
  intro: [
    "When you book drone video, you will see numbers such as 4K, 6K and 8K, and 60 fps. They sound technical, and they are easy to understand once you know what each one counts.",
    "This guide explains them in plain words and says when a higher number helps. The short answer: most videos need less than you think, and a few jobs need more.",
  ],
  blocks: [
    { type: "h2", id: "resolution", text: "What 4K, 6K and 8K mean" },
    {
      type: "p",
      text: "A video is a stream of pictures. Resolution counts how many tiny dots, called pixels, are in each picture. More pixels mean more detail, if the camera and the light can use them.",
    },
    {
      type: "ul",
      items: [
        "**4K** is 3840 pixels wide and 2160 tall, about 8 million pixels in every picture. It is the normal quality for good video today.",
        "**6K** is about 6000 pixels wide. There is no single standard for 6K, so the exact size depends on the camera.",
        "**8K** is 7680 pixels wide and 4320 tall, about 33 million pixels, which is four times the pixels of 4K.",
      ],
    },
    {
      type: "p",
      text: "Higher numbers also mean bigger files, and the files need more storage and a stronger computer to edit.",
    },

    { type: "h2", id: "fps", text: "What fps means" },
    {
      type: "p",
      text: "The letters fps stand for frames per second, which is how many pictures the camera takes every second. A film usually shows 24 or 30 of them. A camera that records 60 fps takes twice as many, which gives smoother motion and allows slow motion when the video is slowed down.",
    },
    {
      type: "p",
      text: "Most of our drones film 4K at 60 fps. The DJI Mini 2 films 4K at 30 fps, which suits travel clips.",
    },

    { type: "h2", id: "when-more", text: "When a higher resolution helps" },
    {
      type: "ul",
      items: [
        "**Cropping.** With more pixels you can zoom into part of the picture in editing and keep it sharp. That helps when one clip must give a wide shot and a close shot.",
        "**Big screens.** On a cinema screen or a large display, detail shows more than on a phone.",
        "**Client work.** A brand or a production often asks for the highest quality, so it can use the footage in many places later.",
        "**Reframing.** A 360 camera records every direction, and the high pixel count lets you choose a view after the flight.",
      ],
    },
    { type: "photo", id: "sigiriya-sunset", caption: "Sigiriya at sunset, taken by our team. Detail in a photo like this is what a high resolution camera records." },

    { type: "h2", id: "when-less", text: "When 4K is enough" },
    {
      type: "p",
      text: "Most people watch video on a phone or a laptop. For a honeymoon film, a travel video, a hotel page or social media, 4K has more detail than the screen can show. A higher resolution will not make those videos look better, and it will make the files slower to send. If you are not sure, ask for 4K.",
    },

    { type: "h2", id: "our-drones", text: "Which of our drones film in which quality" },
    {
      type: "ul",
      items: [
        "**DJI Mavic 4 Pro:** 6K at 60 fps, with a 100 MP Hasselblad camera for photos",
        "**DJI Avata 360:** 360 degree video in 8K at 60 fps, or 4K at 60 fps on one lens",
        "**DJI Air 3S:** 4K at 60 fps, with a 1 inch main camera",
        "**DJI Air 3:** 4K at 60 fps, with two cameras",
        "**DJI Avata 2 and DJI Avata:** 4K at 60 fps with a very wide view",
        "**DJI Mavic Air 2:** 4K at 60 fps, with 48 MP photos",
        "**DJI Mini 2:** 4K at 30 fps",
      ],
    },
    {
      type: "p",
      text: "All of our drones film in 4K or higher. For a side by side of three of them, read [DJI Air 3, Mavic 4 Pro or Mini 2 for travel video](/blog/dji-air-3-vs-mavic-4-pro-vs-mini-2-for-travel-video). For what you get at the end of a shoot, see [drone videography in Sri Lanka](/blog/drone-videography-in-sri-lanka).",
    },
  ],
  faqs: [
    {
      q: "What video quality do your drones film in?",
      a: "All our drones film in 4K or higher. The DJI Mavic 4 Pro films in 6K, and the DJI Avata 360 films 360 degree video in 8K.",
    },
    {
      q: "Is 8K drone video better than 4K?",
      a: "It has more pixels, so it holds more detail and allows more cropping. On a phone or a laptop you will not see the difference, and the files are much bigger. For most projects 4K is enough.",
    },
    {
      q: "What does 60 fps do?",
      a: "It means 60 pictures every second. Motion looks smoother, and you can slow the video down for slow motion without it looking choppy.",
    },
    {
      q: "Can I choose the quality when I book?",
      a: "You can. Tell us where the video will be shown and we suggest the quality in the plan. The files you receive are agreed before the shoot.",
    },
  ],
  related: ["dji-air-3-vs-mavic-4-pro-vs-mini-2-for-travel-video", "360-degree-drone-video-in-sri-lanka", "drone-videography-in-sri-lanka"],
  ctaMessage: "Hi! I'd like drone video in Sri Lanka and need advice on the quality. My project is: ",
};
