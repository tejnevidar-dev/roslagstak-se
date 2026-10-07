/**
 * Paritet för ortssidornas två avsnitt (AA3): samma funktion ger texten till React (LocationPage.tsx) och till den statiska HTML:en
 * (scripts/prerender-content.ts). Testet kontrollerar att varje ortssida har båda avsnitten i den statiska texten, ordagrant.
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { locationWhySections } from "@/data/location-sections";
import { isNearBase } from "@/data/service-reach";
import { prerenderContent } from "../../scripts/prerender-content";

describe("ortssidornas avsnitt Varför välja RoslagsTak och Om <ort>", () => {
  it("ger rätt lydelse för ö, tätort nära basen, långt från basen och Mälardalen", () => {
    const ö = locations.find((l) => l.isIsland)!;
    const [a, b] = locationWhySections(ö, "på", false);
    expect(a.heading).toBe(`Varför välja RoslagsTak som ${ö.primaryKeyword}?`);
    expect(a.paragraph).toContain(`Vi tar uppdrag på ${ö.name} och i Roslagen och Storstockholm`);
    expect(a.paragraph).toContain("Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.");
    expect(a.paragraph).toContain("Vi arbetar enligt AMA.");
    expect(b.heading).toBe(`Om ${ö.name} och takläggning i ${ö.region.toLowerCase()}`);
    expect(b.paragraph).toContain(`Kontakta oss för en kostnadsfri takkontroll på ${ö.name}, utan förpliktelser.`);
    const långt = locationWhySections(locations.find((l) => !l.isIsland && !isNearBase(l))!, "i", true)[0];
    expect(långt.paragraph).toContain("och närområdet, för både villaägare och bostadsrättsföreningar");
    const mälar = locations.find((l) => l.region === "Mälardalen");
    if (mälar) expect(locationWhySections(mälar, "i", true)[1].paragraph).toContain(`${mälar.name} ligger i Mälardalen.`);
  });

  it("alla ortssidor har båda avsnitten, rubrik och stycke, i den statiska texten", () => {
    const saknas: string[] = [];
    for (const l of locations) {
      const page = prerenderContent(`/taklaggare-${l.slug}`);
      if (!page) { saknas.push(`${l.slug}: ingen statisk sida`); continue; }
      const prep = l.isIsland ? "på" : "i";
      const text = page.paragraphs.map((p) => (typeof p === "string" ? p : (p as { h: string }).h ?? "")).join("\n");
      for (const s of locationWhySections(l, prep, !l.isIsland && !isNearBase(l))) {
        if (!text.includes(s.heading) || !text.includes(s.paragraph)) saknas.push(`${l.slug}: ${s.heading}`);
      }
    }
    expect(saknas.slice(0, 10)).toEqual([]);
  });
});
