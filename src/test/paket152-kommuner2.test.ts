/**
 * Paket 152 (Marknadschefens grind 2026-10-21): kommunsidorna Botkyrka, Bromma, Upplands Väsby och Nacka vässas ur innehall/kommuner2-vassa-briefrader-2026-10-21.md
 * (avsnitt om kommunens kyrka, länkar med ortsnamn, "takläggare i Bromma", stycket "Det här gör vi i Bromma"). Varje länkmål ska finnas som sida och i sajtkartan.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";
import { stripInlineMd, inlineMdLinks, INLINE_MD } from "../lib/inline-md";

const text = (s: string) => {
  const l = locations.find((x) => x.slug === s)!;
  return JSON.stringify([l.description, l.longDescription, l.extraSections]);
};
const BROMMA_DELAR = ["alsten", "hoglandet", "smedslatten", "stora-mossen", "nockebyhov", "eneby", "ballsta-bromma", "ulvsunda", "bromma-kyrka", "appelviken", "nockeby", "angby", "sodra-angby"];
const KRAV: Record<string, { ord: string[]; lankar: string[] }> = {
  botkyrka: { ord: ["Grödinge", "Botkyrka kyrka"], lankar: ["/taklaggare-grodinge", "/takbyte-botkyrka"] },
  bromma: { ord: ["takläggare i Bromma", "Det här gör vi i Bromma"], lankar: ["/takbyte-bromma", "/takrenovering-bromma", ...BROMMA_DELAR.map((d) => `/taklaggare-${d}`)] },
  "upplands-vasby": { ord: ["Fresta kyrka"], lankar: [] },
  nacka: { ord: ["Boo kyrka", "Saltsjö-Boo: Björknäs, Kummelnäs, Lännersta och Kil"], lankar: ["/taklaggare-saltsjo-boo", "/taklaggare-kil", "/takomlaggning-nacka"] },
};

describe("paket 152: Botkyrka, Bromma, Upplands Väsby och Nacka", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  for (const [slug, k] of Object.entries(KRAV)) {
    it(`${slug}: avsnitten och meningarna finns, länkarna ritas i serverns HTML och varje länkmål finns i sajtkartan`, () => {
      const t = text(slug);
      for (const o of k.ord) expect(t, o).toContain(o);
      const hrefs = prerenderContent(`/taklaggare-${slug}`)!.links.map((l) => l.href);
      for (const l of k.lankar) {
        expect(hrefs, l).toContain(l);
        expect(sitemap, l).toContain(`<loc>https://roslagstak.se${l}</loc>`);
      }
      expect(t).not.toMatch(/plåtarbeten|platarbeten/i);
    });
  }
  it("de tretton stadsdelarna i Bromma är sidor som finns", () => {
    for (const d of BROMMA_DELAR) expect(locations.some((l) => l.slug === d), d).toBe(true);
  });
  it("paritet: LocationPage ritar longDescription med renderInline, och de sidor som har markdown i den har länkar som finns, så alla andra sidor ritas exakt som förut (samma text i React och i serverns HTML)", () => {
    const medMd = locations.filter((l) => inlineMdLinks(l.longDescription).length > 0 || new RegExp(INLINE_MD.source).test(l.longDescription)).map((l) => l.slug);
    expect(medMd).toContain("bromma");
    // sidorna som har länkar i longDescription (Bromma i 152, Älmsta och Grisslehamn i 156 m.fl.) har bara länkar till sidor som finns i sajtkartan
    for (const s of medMd) for (const h of inlineMdLinks(locations.find((l) => l.slug === s)!.longDescription).map((x) => x.href)) expect(sitemap, `${s} -> ${h}`).toContain(`<loc>https://roslagstak.se${h}</loc>`);
    // alla övriga sidor har ingen markdown i longDescription och ritas därför exakt som förut
    for (const l of locations) if (!medMd.includes(l.slug)) expect(stripInlineMd(l.longDescription), l.slug).toBe(l.longDescription);
    // serverns HTML har Brommas text utan markdown-tecken, och texten är densamma som renderInline ger (länktexten utan adressen)
    const bromma = locations.find((l) => l.slug === "bromma")!;
    expect(stripInlineMd(bromma.longDescription)).not.toMatch(/\]\(\//);
    expect(stripInlineMd(bromma.longDescription)).toContain("Ulvsunda och områden kring Bromma kyrka");
  });
  it("avsnittet 'Det här gör vi i Bromma' har länkarna till takbyte och takrenovering i Bromma", () => {
    const s = locations.find((l) => l.slug === "bromma")!.extraSections.find((x) => x.heading === "Det här gör vi i Bromma");
    expect(s?.text).toContain("(/takbyte-bromma)");
    expect(s?.text).toContain("(/takrenovering-bromma)");
  });
});
