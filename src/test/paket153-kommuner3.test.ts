/**
 * Paket 153 (Marknadschefens grind 2026-10-21): kommunsidorna Järfälla, Lidingö, Värmdö och Tyresö vässas ur innehall/kommuner3-vassa-briefrader-2026-10-21.md
 * (kyrkavsnitt, "byta tak", länkar med ortsnamn). Varje länkmål ska finnas som sida och i sajtkartan.
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
  jarfalla: { ord: ["Järfälla kyrka", "byta tak"], lankar: [] },
  lidingo: { ord: ["Lidingö kyrka", "Mosstorp och Stockby", "byta tak"], lankar: ["/taklaggare-mosstorp", "/takomlaggning-lidingo"] },
  varmdo: { ord: ["Djurö och Älvsala", "Värmdö kyrka", "byta tak"], lankar: ["/taklaggare-stromma", "/taklaggare-djuro", "/taklaggare-alvsala", "/takrenovering-varmdo"] },
  tyreso: { ord: ["Tyresö kyrka", "byta tak"], lankar: ["/taklaggare-brevikshalvon"] },
};

describe("paket 153: Järfälla, Lidingö, Värmdö och Tyresö", () => {
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
