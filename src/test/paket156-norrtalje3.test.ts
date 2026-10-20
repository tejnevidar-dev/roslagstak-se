/**
 * Paket 156 (Marknadschefens grind 2026-10-21): ortssidorna Rimbo, Älmsta och Grisslehamn vässas ur innehall/norrtalje3-vassa-briefrader-2026-10-21.md
 * (stycket "Det här gör vi i <ort>", länkar till tjänstesidorna och Norrtälje-sidorna, Rimbo kyrkas skiffertak). Varje länkmål ska finnas i sajtkartan.
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
const KRAV: Record<string, { rubrik: string; lankar: string[] }> = {
  rimbo: { rubrik: "Det här gör vi i Rimbo", lankar: ["/takbyte-rimbo", "/takomlaggning-rimbo", "/takrenovering-rimbo", "/taklaggare-norrtalje"] },
  almsta: { rubrik: "Det här gör vi i Älmsta", lankar: ["/takbyte-norrtalje", "/taklaggare-norrtalje"] },
  grisslehamn: { rubrik: "Det här gör vi i Grisslehamn", lankar: ["/taklaggare-vaddo", "/takbyte-norrtalje"] },
};

describe("paket 156: Rimbo, Älmsta och Grisslehamn", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  for (const [slug, k] of Object.entries(KRAV)) {
    it(`${slug}: stycket finns, länkarna ritas i serverns HTML och varje länkmål finns i sajtkartan`, () => {
      const t = text(slug);
      expect(locations.find((l) => l.slug === slug)!.extraSections.some((x) => x.heading === k.rubrik), k.rubrik).toBe(true);
      const hrefs = prerenderContent(`/taklaggare-${slug}`)!.links.map((l) => l.href);
      for (const l of k.lankar) {
        expect(hrefs, l).toContain(l);
        expect(sitemap, l).toContain(`<loc>https://roslagstak.se${l}</loc>`);
      }
      expect(t).not.toMatch(/plåtarbeten|platarbeten/i);
      expect(t, slug).not.toMatch(/\bofta (har|blir|ser|finns)/);
    });
  }
  it("Rimbo: kyrkans skiffertak finns i texten", () => {
    expect(text("rimbo")).toMatch(/skiffer/i);
  });
});
