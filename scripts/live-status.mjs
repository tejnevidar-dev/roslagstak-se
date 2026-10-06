/**
 * Live-status för alla adresser i sajtkartan (S6): statuskod, eventuell omdirigering och slutadress, noindex och canonical
 * på sig själv. En adress i taget med 250 ms mellanrum. Läser bara.
 * Körning: bun scripts/live-status.mjs [https://roslagstak.se] [<fil.md>]   (skriver också <fil>.json med råresultatet)
 */
import { writeFileSync } from "node:fs";

const base = process.argv[2] ?? "https://roslagstak.se";
const ut = process.argv[3] ?? "../ledning/marknad/live-status-2026-10-07.md";
const sm = await (await fetch(base + "/sitemap.xml")).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const UA = { "user-agent": "RoslagsTak-egenkontroll/1.0" };
const res = [];
for (const u of urls) {
  const url = u.replace("https://roslagstak.se", base);
  let status = 0, plats = null, slut = url, fel = null, noindex = null, canonical = null;
  try {
    const r = await fetch(url, { redirect: "manual", headers: UA });
    status = r.status;
    plats = r.headers.get("location");
    if (status >= 300 && status < 400 && plats) {
      const r2 = await fetch(new URL(plats, url), { redirect: "follow", headers: UA });
      slut = r2.url;
      status = status + "→" + r2.status;
    } else if (status === 200) {
      const html = await r.text();
      noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
      canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? null;
    }
  } catch (e) {
    fel = String(e).slice(0, 80);
  }
  res.push({ url: u, status, slut, plats, fel, noindex, canonical });
  await new Promise((ok) => setTimeout(ok, 250));
}
const perStatus = new Map();
for (const r of res) perStatus.set(String(r.status), (perStatus.get(String(r.status)) ?? 0) + 1);
const sjalv = (r) => r.canonical && r.canonical.replace(/\/$/, "") === r.url.replace(/\/$/, "");
const avv = res.filter((r) => r.fel || String(r.status) !== "200" || r.noindex || !sjalv(r));
const md = [
  `# Live-status för alla adresser i sajtkartan, ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`,
  "",
  `**Källa:** ${base}/sitemap.xml, ${urls.length} adresser, hämtade en i taget med 250 ms mellanrum, omdirigeringar följs en gång för slutadressen. Per adress: statuskod, omdirigering, noindex, canonical på sig själv. Ändrar ingenting.`,
  "",
  "## Antal per statuskod",
  "",
  "| Status | Antal |",
  "|---|---|",
  ...[...perStatus.entries()].sort().map(([k, v]) => `| ${k} | ${v} |`),
  "",
  `## Avvikelser (${avv.length})`,
  "",
];
if (!avv.length) md.push("Inga: alla adresser svarar 200, är indexerbara och har canonical på sig själv.");
else
  for (const r of avv)
    md.push(`- ${r.url}: status ${r.status}${r.fel ? ", fel: " + r.fel : ""}${r.plats ? ", till " + r.slut : ""}${r.noindex ? ", NOINDEX" : ""}${r.status === 200 && !r.canonical ? ", canonical saknas" : r.canonical && !sjalv(r) ? ", canonical " + r.canonical : ""}`);
writeFileSync(ut, md.join("\n") + "\n");
writeFileSync(ut.replace(/\.md$/, ".json"), JSON.stringify(res));
console.log([...perStatus.entries()].join(" | "), "avvikelser:", avv.length);
