/**
 * Paket 138 (Marknadschefens grind 2026-10-20): ny områdessida /taklaggare-frotuna (landsbygden och byarna i Frötuna socken sydost om Norrtälje) ur villaomraden/texter/frotuna-norrtalje.md.
 * Egna koordinater (Wikipedia, Frötuna socken, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-20) och källänk till Wikipedia-artikeln.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "frotuna")!;

describe("paket 138: Frötuna", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "frotuna").length).toBe(1);
    expect(locations.some((l) => l.slug === "bjorno" || l.slug === "rosa")).toBe(false);
  });
  it("posten har egen text, faktaruta, Wikipedia som källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Frötuna");
    expect(l.parentLocation?.slug).toBe("norrtalje");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink).toEqual({ label: "Wikipedia, Frötuna socken", url: "https://sv.wikipedia.org/wiki/Frötuna_socken" });
    expect(ortSeoOverrides.frotuna.title).toBe("Takbyte i Frötuna, Norrtälje – fast pris");
    expect(ortSeoOverrides.frotuna.title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides.frotuna.description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Frötuna, Norrtälje");
    expect(l.lat).toBe(59.74139);
    expect(l.lng).toBe(18.675);
    expect(l.lat).not.toBe(locations.find((x) => x.slug === "norrtalje")!.lat);
    expect(locationIndex.some((x) => x.slug === "frotuna" && x.name === "Frötuna")).toBe(true);
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och inga husåldrar utöver källans årtal", () => {
    const c = prerenderContent("/taklaggare-frotuna")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Frötuna, Norrtälje");
    expect(c.title).toBe("Takbyte i Frötuna, Norrtälje – fast pris");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(c.paragraphs).toContain("Källa: Wikipedia, Frötuna socken");
    expect(alla).not.toMatch(/\b(oftast|ofta)\b/i);
  });
  it("kommunsidan på Norrtälje länkar till sidan (kommunradens Frötuna)", () => {
    expect(prerenderContent("/taklaggare-norrtalje")!.links.map((l) => l.href)).toContain("/taklaggare-frotuna");
  });
});
