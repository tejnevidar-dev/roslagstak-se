/**
 * Paket 151 (Marknadschefens grind 2026-10-21): kommunsidorna Sollentuna, Huddinge, Danderyd och Täby vässas ur innehall/storkommuner-vassa-briefrader-2026-10-21.md
 * ("byta tak", "nytt tak", "takläggning", "takläggare i Danderyd", ett avsnitt om kommunens kyrka, nya länkar med ortsnamn). Plåtarbeten är struket (Vidars rad 5).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const text = (s: string) => {
  const l = locations.find((x) => x.slug === s)!;
  return JSON.stringify([l.description, l.longDescription, l.extraSections]);
};
const KRAV: Record<string, { ord: string[]; lankar: string[] }> = {
  sollentuna: { ord: ["byta tak", "nytt tak", "Kyrkan vid Norrviken", "fler kommundelar"], lankar: ["/taklaggare-edsviken", "/taklaggare-edsberg", "/taklaggare-vaxmora"] },
  huddinge: { ord: ["byta tak", "Kyrkan vid Trehörningen"], lankar: ["/taklaggare-kasta", "/takomlaggning-huddinge", "/takrenovering-huddinge"] },
  danderyd: { ord: ["takläggare i Danderyd", "byta tak", "Kyrkan vid E18"], lankar: [] },
  taby: { ord: ["takläggning", "byta tak"], lankar: ["/taklaggare-taby-kyrkby", "/taklaggare-vallatorp-visinge"] },
};

describe("paket 151: de fyra stora kommunsidorna", () => {
  for (const [slug, k] of Object.entries(KRAV)) {
    it(`${slug}: sökorden och avsnitten finns, länkarna ritas i serverns HTML och texten har ingen länk eller omnämnande av plåtarbeten`, () => {
      const t = text(slug);
      for (const o of k.ord) expect(t, o).toContain(o);
      const c = prerenderContent(`/taklaggare-${slug}`)!;
      const hrefs = c.links.map((l) => l.href);
      for (const l of k.lankar) expect(hrefs, l).toContain(l);
      expect(t).not.toMatch(/plåtarbeten|platarbeten/i);
    });
  }
  it("länkmålen finns som ortssidor eller tjänstesidor", () => {
    for (const s of ["edsviken", "edsberg", "vaxmora", "kasta", "taby-kyrkby", "vallatorp-visinge"]) expect(locations.some((l) => l.slug === s), s).toBe(true);
  });
  it("'ofta' är bytt mot 'kan' i de fyra sidornas O-meningar", () => {
    for (const slug of Object.keys(KRAV)) expect(text(slug), slug).not.toMatch(/\bofta (har|blir|ser|finns)/);
  });
});
