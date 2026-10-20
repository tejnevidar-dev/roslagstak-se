/**
 * Paket 154 (Marknadschefens grind 2026-10-21): kommunsidorna Haninge, Ekerö, Sundbyberg och Solna vässas ur innehall/kommuner4-vassa-briefrader-2026-10-21.md
 * (kyrkavsnitt, "byta tak", avsnittet Vega och Muskö, länkar med ortsnamn). Varje länkmål ska finnas som sida och i sajtkartan.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const text = (s: string) => {
  const l = locations.find((x) => x.slug === s)!;
  return JSON.stringify([l.description, l.longDescription, l.extraSections]);
};
const KRAV: Record<string, { ord: string[]; lankar: string[] }> = {
  haninge: { ord: ["Västerhaninge kyrka", "Vega och Muskö", "byta tak"], lankar: ["/taklaggare-vega", "/taklaggare-musko"] },
  ekero: { ord: ["Ekerö kyrka", "byta tak"], lankar: ["/taklaggare-trakvista", "/taklaggare-alvnas", "/taklaggare-ekero-sommarstad", "/taklaggare-kungsberga", "/taklaggare-svartsjo"] },
  sundbyberg: { ord: ["Duvbo kyrka", "byta tak"], lankar: [] },
  solna: { ord: ["Solna kyrka", "byta tak"], lankar: [] },
};

describe("paket 154: Haninge, Ekerö, Sundbyberg och Solna", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  for (const [slug, k] of Object.entries(KRAV)) {
    it(`${slug}: avsnitten och sökorden finns, länkarna ritas i serverns HTML och varje länkmål finns i sajtkartan`, () => {
      const t = text(slug);
      for (const o of k.ord) expect(t, o).toContain(o);
      const hrefs = prerenderContent(`/taklaggare-${slug}`)!.links.map((l) => l.href);
      for (const l of k.lankar) {
        expect(hrefs, l).toContain(l);
        expect(sitemap, l).toContain(`<loc>https://roslagstak.se${l}</loc>`);
      }
      expect(t).not.toMatch(/plåtarbeten|platarbeten/i);
      expect(t, slug).not.toMatch(/\bofta (har|blir|ser|finns)/);
    });
  }
});
