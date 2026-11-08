import { footage, type Footage } from "@/lib/content";
import { pillar } from "@/content/blog/drone-videography-in-sri-lanka";
import { places } from "@/content/blog/best-places-for-drone-videography-in-sri-lanka";
import { season } from "@/content/blog/best-time-for-drone-filming-in-sri-lanka";
import { cost } from "@/content/blog/drone-videography-cost-in-sri-lanka";
import { sigiriya } from "@/content/blog/drone-filming-at-sigiriya";
import { ella } from "@/content/blog/drone-filming-in-ella-and-the-hill-country";

/**
 * Blog posts are plain data, so every page, the sitemap and the tests read the same source.
 *
 * Text inside a block may use two kinds of markup and nothing else:
 *   [link text](/path)   an internal link, or an external one when it starts with https
 *   **bold**             bold text
 *
 * Writing rules for the whole site (see the no dash rule): plain English, no hyphens or
 * dashes of any kind, no stock AI words. The test in tests/blog.test.mjs enforces them.
 */

export type Block =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /** One of our own portfolio photos, by footage id. The caption says what the reader sees. */
  | { type: "photo"; id: string; caption: string }
  | { type: "note"; title: string; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] };

export type BlogCategory = "Guide" | "Locations" | "Planning";

export type BlogPost = {
  slug: string;
  /** The H1 on the page. */
  title: string;
  /** The <title> before the brand name. Keep it near 45 characters. */
  seoTitle: string;
  /** Meta description, 158 characters at most. */
  description: string;
  /** Short text for the blog list and the home page. */
  excerpt: string;
  category: BlogCategory;
  published: string;
  updated: string;
  /** Footage id of the cover photo. */
  cover: string;
  keywords: string[];
  /** Paragraphs before the first heading. */
  intro: string[];
  blocks: Block[];
  faqs: { q: string; a: string }[];
  /** Slugs of other posts to suggest at the end. */
  related: string[];
  /** Pre filled WhatsApp message for the call to action. */
  ctaMessage: string;
};

export const BLOG_PATH = "/blog";
export const postPath = (slug: string) => `${BLOG_PATH}/${slug}`;

export const posts: BlogPost[] = [pillar, places, season, cost, sigiriya, ella].sort((a, b) =>
  a.published === b.published ? 0 : a.published < b.published ? 1 : -1,
);

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelated(post: BlogPost): BlogPost[] {
  return post.related.map((s) => getPost(s)).filter((p): p is BlogPost => Boolean(p));
}

export function getPhoto(id: string): Footage | undefined {
  return footage.find((f) => f.id === id);
}

/** Text without the link and bold markup. Used for word counts, schema and tests. */
export function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

/** Every piece of visible text in a post, one string per paragraph, item or cell. */
export function postTexts(post: BlogPost): string[] {
  const out: string[] = [post.title, post.excerpt, ...post.intro];
  for (const b of post.blocks) {
    if (b.type === "h2" || b.type === "h3" || b.type === "p") out.push(b.text);
    else if (b.type === "ul" || b.type === "ol") out.push(...b.items);
    else if (b.type === "photo") out.push(b.caption);
    else if (b.type === "note") out.push(b.title, b.text);
    else out.push(b.caption, ...b.head, ...b.rows.flat());
  }
  for (const f of post.faqs) out.push(f.q, f.a);
  return out.map(plain);
}

export function wordCount(post: BlogPost): number {
  return postTexts(post)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(wordCount(post) / 220));
}

export function contents(post: BlogPost): { id: string; title: string }[] {
  const items = post.blocks.flatMap((b) => (b.type === "h2" ? [{ id: b.id, title: b.text }] : []));
  if (post.faqs.length) items.push({ id: "questions", title: "Questions people ask" });
  return items;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
