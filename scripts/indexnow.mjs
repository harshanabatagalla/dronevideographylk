// Tells IndexNow (Bing, Yandex, Seznam, Naver; Bing also feeds DuckDuckGo, Yahoo
// and ChatGPT search) that every page in the sitemap is ready to crawl. Runs on
// the server after each deploy. It never fails the deploy: errors are logged only.
//
// The key below must match the file public/<key>.txt, which IndexNow fetches to
// confirm the request comes from the site owner.
import { existsSync } from "node:fs";

const KEY = "a21bc98118581d082032c3667657b665";
const HOST = "dronevideography.lk";
const SITEMAP = process.env.INDEXNOW_SITEMAP_URL ?? "http://127.0.0.1:4101/sitemap.xml";

async function sitemapUrls() {
  // The app restarts just before this runs, so give it a few tries to come up.
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      const res = await fetch(SITEMAP);
      if (res.ok) {
        const xml = await res.text();
        // Page URLs only: <image:loc> entries are images, not pages.
        return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      }
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`sitemap not reachable at ${SITEMAP}`);
}

try {
  if (!existsSync(new URL(`../public/${KEY}.txt`, import.meta.url))) throw new Error("IndexNow key file is missing");
  const urlList = (await sitemapUrls()).filter((u) => new URL(u).hostname === HOST);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  // 200 and 202 both mean accepted.
  console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status}`);
} catch (err) {
  console.log(`IndexNow: skipped (${err instanceof Error ? err.message : err})`);
}
