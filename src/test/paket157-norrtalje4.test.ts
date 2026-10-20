/**
 * Paket 157 (Marknadschefens grind 2026-10-21): Åkersberga, Spillersboda, Väddö och Vätö vässas ur innehall/norrtalje4-vassa-briefrader-2026-10-21.md
 * (Österåkers kyrka, Väddö kyrka, stycket "Det här gör vi i/på <ort>", länkar med ortsnamn). Varje länkmål ska finnas i sajtkartan.
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
const KRAV: Record<string, { rubrik?: string; lankar: string[] }> = {
  akersberga: { lankar: [] },
  spillersboda: { rubrik: "Det här gör vi i Spillersboda", lankar: ["/taklaggare-frotuna", "/takbyte-norrtalje", "/taklaggare-norrtalje"] },
  vaddo: { rubrik: "Det här gör vi på Väddö", lankar: ["/taklaggare-almsta", "/taklaggare-grisslehamn", "/takbyte-norrtalje"] },
  vato: { rubrik: "Det här gör vi på Vätö", lankar: ["/taklaggare-arholma", "/takbyte-norrtalje"] },
};

describe("paket 157: Åkersberga, Spillersboda, Väddö och Vätö", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  for (const [slug, k] of Object.entries(KRAV)) {
    it(`${slug}: stycket finns, länkarna ritas i serverns HTML och varje länkmål finns i sajtkartan`, () => {
      const t = text(slug);
      if (k.rubrik) expect(locations.find((l) => l.slug === slug)!.extraSections.some((x) => x.heading === k.rubrik), k.rubrik).toBe(true);
      const hrefs = prerenderContent(`/taklaggare-${slug}`)!.links.map((l) => l.href);
      for (const l of k.lankar) {
        expect(hrefs, l).toContain(l);
        expect(sitemap, l).toContain(`<loc>https://roslagstak.se${l}</loc>`);
      }
      expect(t).not.toMatch(/plåtarbeten|platarbeten/i);
      expect(t, slug).not.toMatch(/\bofta (har|blir|ser|finns)/);
    });
  }
  it("Åkersberga har sökorden och kyrkan, och Vätö har källan till bilvägen", () => {
    const a = text("akersberga");
    for (const o of ["byta tak", "takläggning", "takrenovering", "kyrka"]) expect(a, o).toContain(o);
    expect(text("vato")).toContain("Sedan 1993 nås Vätö enligt Wikipedia med bil över Vätöbron");
    expect(text("vaddo")).toMatch(/Väddö kyrka/);
  });
});
