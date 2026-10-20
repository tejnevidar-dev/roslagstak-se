/**
 * Paket 128h (Marknadschefens grind 2026-10-20): ny områdessida /taklaggare-ekero-sommarstad (Sundby, Ekerö sommarstad och Nibbla på Ekerön) ur villaomraden/texter/sundby-ekero-sommarstad-ekero.md.
 * Egna koordinater (Wikipedia, Ekerö sommarstad, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-20) och källänk till Wikipedia-artikeln. Helgö och Kaggeholm är strukna ur texten.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "ekero-sommarstad")!;

describe("paket 128h: Ekerö sommarstad och Sundby", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "ekero-sommarstad").length).toBe(1);
    expect(locations.filter((l) => l.slug === "ekero").length).toBe(1);
    expect(locations.some((l) => l.slug === "sundby" || l.slug === "nibbla" || l.slug === "helgo" || l.slug === "kaggeholm")).toBe(false);
  });
  it("posten har egen text, faktaruta, Wikipedia som källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Ekerö sommarstad");
    expect(l.parentLocation?.slug).toBe("ekero");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink).toEqual({ label: "Wikipedia, Ekerö sommarstad", url: "https://sv.wikipedia.org/wiki/Ekerö_sommarstad" });
    expect(ortSeoOverrides["ekero-sommarstad"].title).toBe("Takbyte i Ekerö sommarstad och Sundby – fast pris");
    expect(ortSeoOverrides["ekero-sommarstad"].title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides["ekero-sommarstad"].description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Ekerö sommarstad och Sundby");
    expect(l.uniqueFAQ?.question).toBe("När byggdes husen i Ekerö sommarstad?");
    expect(l.lat).toBe(59.27611);
    expect(l.lng).toBe(17.73139);
    expect(locationIndex.some((x) => x.slug === "ekero-sommarstad" && x.name === "Ekerö sommarstad")).toBe(true);
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och texten följer briefen utan Helgö och Kaggeholm", () => {
    const c = prerenderContent("/taklaggare-ekero-sommarstad")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Ekerö sommarstad och Sundby");
    expect(c.title).toBe("Takbyte i Ekerö sommarstad och Sundby – fast pris");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(c.paragraphs).toContain("Källa: Wikipedia, Ekerö sommarstad");
    expect(alla).toContain("Sundby och Ekerö sommarstad är två tätorter på Ekerön i Mälaren, i Ekerö kommun.");
    expect(alla).toContain("som enligt SCB hade 133 fritidshus år 2010");
    expect(alla).not.toMatch(/Helgö|Kaggeholm/);
  });
  it("kommunsidan på Ekerö länkar till sidan (kommunraden Sundby och Ekerö sommarstad)", () => {
    expect(prerenderContent("/taklaggare-ekero")!.links.map((l) => l.href)).toContain("/taklaggare-ekero-sommarstad");
  });
});
