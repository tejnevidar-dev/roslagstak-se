/**
 * Gren 197c, våg 2 (Marknadschefens ord 2026-10-24, Innehålls `innehall/agarorter2-2026-10-24.md`): nya källbelagda stycken på Vaxholms och Sigtunas ortssidor,
 * som nya stycken efter första stycket i områdestexten. Raderna är tillämpade av _verktyg/gren182-rader.mjs (2 rader, en träff var). Standardblocken är orörda.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** [slug, antal nya stycken, början på varje nytt stycke] */
const NYA: [string, number, string[]][] = [
  [
    "vaxholm",
    2,
    [
      "Vaxholmslinjen gick enligt Wikipedia mellan Resarö, Vaxön, Rindö och V",
      "När staden bildades bröts den ut ur Östra Ryds socken, och 1690 fastst"
    ]
  ],
  [
    "sigtuna",
    3,
    [
      "Från en rak gata 30 meter från stranden stakades tomter ut, åtta meter",
      "Mariakyrkan invigdes sent på hösten 1247, när bara koret var färdigt. ",
      "På kyrkogården ligger en kyrkoruin, vars första delar, centraltornet, "
    ]
  ]
];
const utanLankar = (t: string) => t.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");

describe("gren 197c våg 2: nya stycken på Vaxholms och Sigtunas ortssidor", () => {
  it("två sidor", () => expect(NYA.length).toBe(2));
  for (const [slug, antal, borjan] of NYA) {
    it(`/taklaggare-${slug}: ${antal} nya stycken står i datan och i serverns HTML`, () => {
      const l = locations.find((x) => x.slug === slug)!;
      const data = utanLankar(l.longDescription) + JSON.stringify(l.extraSections ?? []);
      const html = JSON.stringify(prerenderContent(`/taklaggare-${slug}`)!.paragraphs);
      expect(borjan.length, slug).toBe(antal);
      for (const b of borjan) {
        expect(data, `${slug}: ${b}`).toContain(b);
        expect(html, `${slug} (serverns HTML): ${b}`).toContain(JSON.stringify(b).slice(1, -1));
      }
    });
  }
});
