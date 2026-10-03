/**
 * Hämtar bara sitemap-URL:er (publika, robots.txt respekteras, en förfrågan per sekund) för konkurrenterna i
 * konkurrentanalys.ts och sparar sökvägarna (inga texter) i ledning/marknad/.konkurrent-urler-2026-10.json.
 * Kör: bun scripts/konkurrent-urler.ts
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const UA = "Mozilla/5.0 (compatible; RoslagsTak-research; +https://roslagstak.se)";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const get = async (url: string) => {
  try {
    const r = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" });
    return { status: r.status, text: r.ok ? await r.text() : "" };
  } catch {
    return { status: 0, text: "" };
  }
};
const DOMAINS = ["vertextak.se", "beckmansbygg.se", "villatakexperten.se", "www.modernatak.se", "www.besttak.se", "taklaggarennorrtalje.se", "taklaggning-norrtalje.se", "www.daasbygg.se", "takfirma-stockholm.se"];
const out: Record<string, string[] | string> = {};
for (const d of DOMAINS) {
  const base = `https://${d}`;
  const robots = await get(`${base}/robots.txt`);
  await sleep(1000);
  if (/user-agent:\s*\*[\s\S]*?^disallow:\s*\/\s*$/im.test(robots.text)) {
    out[d] = "blockerad av robots.txt";
    continue;
  }
  const roots = [...robots.text.matchAll(/^sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (!roots.length) roots.push(`${base}/sitemap.xml`, `${base}/sitemap_index.xml`, `${base}/wp-sitemap.xml`);
  const paths = new Set<string>();
  const queue = [...roots];
  let n = 0;
  while (queue.length && n < 16) {
    const r = await get(queue.shift()!);
    n++;
    await sleep(1000);
    for (const m of r.text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
      if (/\.xml($|\?)/.test(m[1])) queue.push(m[1]);
      else {
        try {
          paths.add(new URL(m[1]).pathname);
        } catch {
          /* hoppa */
        }
      }
    }
  }
  out[d] = paths.size ? [...paths] : "okänt (ingen läsbar sitemap)";
  console.error(d, paths.size);
}
writeFileSync(resolve("../ledning/marknad/.konkurrent-urler-2026-10.json"), JSON.stringify(out, null, 1));
console.error("klart →");
