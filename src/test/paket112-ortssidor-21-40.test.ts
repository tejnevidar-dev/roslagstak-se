/**
 * Paket 112: ortssidorna 21–40 enligt Innehålls passrapport 168 (innehall/ortssidor-21-40-lasning-2026-10-15.md):
 * J1 på Hallstavik och Högmarsö (briefens jobbmening struken), M6 (rätt preposition i referensmeningen), M7 (ingen referensmening på /taklaggare-norrtalje) och O1, O3, O4, O6, O7.
 * Yxlan och Blidö (samma text) rörs inte här.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { referensMening } from "../data/location-referens";
import { prerenderContent } from "../../scripts/prerender-content";

const ort = (slug: string) => {
  const l = locations.find((x) => x.slug === slug);
  expect(l, slug).toBeTruthy();
  return JSON.stringify(l);
};
const sida = (slug: string) => JSON.stringify(prerenderContent(`/taklaggare-${slug}`));

describe("paket 112: den ortsegna texten", () => {
  it("O1, O3, O4, O6, O7: nya meningar står och gamla är borta", () => {
    expect(ort("upplands-vasby")).toContain("kan ha ett hus från årtiondena efter 1950, en äldre gård eller ett hus i ett nytt kvarter.");
    expect(ort("upplands-vasby")).not.toContain("har oftast ett hus som byggdes");
    expect(ort("hallstavik")).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
    expect(ort("grasko")).toContain("Ett fritidshus kan ha byggts till i efterhand,");
    expect(ort("ljustero")).toContain("skarvarna är värda en extra titt.");
    expect(ort("vaddo")).toContain("skarvarna är värda en extra titt.");
    expect(ort("ljustero")).not.toContain("hör till det första som ses över");
    expect(ort("bergshamra")).toContain("och den är värd en extra titt.");
    expect(ort("bergshamra")).not.toContain("det är där en takkontroll börjar");
  });
  it("J1: Hallstavik och Högmarsö nämner inte jobben i sin egen text (mallens mening räcker)", () => {
    expect(ort("hallstavik")).not.toContain("Ett komplett takbyte i närheten finns att se under projekt");
    expect(ort("hogmarso")).not.toContain("Två kompletta takbyten i kommunen finns att se under projekt");
  });
  it("serverns HTML har samma text", () => {
    expect(sida("hallstavik")).toContain("Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
    expect(sida("hallstavik")).not.toContain("i samma kommun.");
  });
});

describe("paket 112: referensmeningen (M6, M7)", () => {
  const l = (slug: string) => locations.find((x) => x.slug === slug)!;
  it("M6: 'på' i stället för 'i' på Rådmansö, Svartnö och Väddö", () => {
    for (const slug of ["radmanso", "svartno", "vaddo"]) {
      const m = referensMening(l(slug), "i");
      if (m) {
        expect(m, slug).toContain(`gjordes inte på ${l(slug).name}`);
        expect(m, slug).not.toContain(`gjordes inte i ${l(slug).name}`);
      }
    }
  });
  it("M6: övriga orter är oförändrade (prepositionen från sidan)", () => {
    const m = referensMening(l("taby"), "i");
    if (m) expect(m).toContain("gjordes inte i Täby");
  });
  it("M7: ingen referensmening på /taklaggare-norrtalje", () => {
    expect(referensMening(l("norrtalje"), "i")).toBeNull();
    expect(sida("norrtalje")).not.toContain("Det jobbet gjordes inte i Norrtälje");
  });
});
