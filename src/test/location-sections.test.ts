/**
 * Paritet för ortssidornas två avsnitt (AA3): samma funktion ger texten till React (LocationPage.tsx) och till den statiska HTML:en
 * (scripts/prerender-content.ts). Testet kontrollerar att varje ortssida har båda avsnitten i den statiska texten, ordagrant.
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { iRoslagen, locationWhySections, omOrtRubrik, regionIMening } from "@/data/location-sections";
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
    expect(b.heading).toBe(omOrtRubrik(ö));
    expect(b.paragraph).toContain(`Kontakta oss för en kostnadsfri takkontroll på ${ö.name}, utan förpliktelser.`);
    const långt = locationWhySections(locations.find((l) => !l.isIsland && !isNearBase(l))!, "i", true)[0];
    expect(långt.paragraph).toContain("och närområdet, för både villaägare och bostadsrättsföreningar");
    const mälar = locations.find((l) => l.region === "Mälardalen");
    if (mälar) expect(locationWhySections(mälar, "i", true)[1].paragraph).toContain(`${mälar.name} ligger i Mälardalen.`);
  });

  it("meningen om regionen säger bara 'i Roslagen' för regioner i Roslagen, och rubriken behåller regionens stavning", () => {
    const text = (ort: string) => {
      const l = locations.find((x) => x.name === ort)!;
      const [, b] = locationWhySections(l, l.isIsland ? "på" : "i", false);
      return { rubrik: b.heading, mening: b.paragraph.split(" Vilka alternativ")[0], region: l.region };
    };
    // En ort i Roslagen, en i Stockholm, en ö och en i Västerort (regionen som tidigare blev "Västerort i Roslagen")
    const r = text("Hallstavik");
    expect(r.mening).toBe("Hallstavik tillhör Norra Roslagen.");
    const s = text("Södermalm");
    expect(s.mening).toBe(`Södermalm tillhör ${s.region}.`);
    expect(s.rubrik).toBe(`Om Södermalm och takläggning i ${s.region}`);
    const v = text("Bromma");
    expect(v.mening).toBe("Bromma tillhör Västerort.");
    expect(v.rubrik).toBe("Om Bromma och takläggning i Västerort");
    const ö = text("Blidö");
    expect(ö.mening).toBe("Blidö tillhör mellersta skärgården i Roslagen.");
    const k = text("Rådmansö");
    expect(k.mening).toBe("Rådmansö tillhör kusten i Roslagen.");
    expect(ö.rubrik).toBe("Om Blidö");
    expect(text("Hallstavik").rubrik).toBe("Om Hallstavik");
    expect(text("Täby").rubrik).toBe("Om Täby");
    expect(text("Rådmansö").rubrik).toBe("Om Rådmansö");
    expect(text("Gräddö").rubrik).toBe("Om Gräddö och takläggning i Rådmansöhalvön"); // Rådmansöhalvön ingår inte i de 51 sidorna
    // Ingen mening med "i Roslagen" för en region som inte står i listan
    for (const l of locations) {
      if (l.region === "Mälardalen") continue;
      const m = locationWhySections(l, "i", false)[1].paragraph.split(" Vilka alternativ")[0];
      expect(m.endsWith(" i Roslagen."), `${l.slug} (${l.region})`).toBe(iRoslagen(l.region));
    }
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
