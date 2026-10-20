/**
 * Paket 142 (Marknadschefens grind 2026-10-20): ny områdessida /taklaggare-stromma (Strömma och Fågelbro, Värmdö) ur villaomraden/texter/stromma-fagelbro-varmdo.md.
 * Egna koordinater (Wikipedia, Skeppsdalsström, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-20) och källänk till Wikipedia-artikeln.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "stromma")!;

describe("paket 142: Strömma och Fågelbro", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "stromma").length).toBe(1);
    expect(locations.some((l) => l.slug === "fagelbro" || l.slug === "skeppsdalsstrom")).toBe(false);
  });
  it("posten har egen text, faktaruta, Wikipedia som källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Strömma");
    expect(l.parentLocation?.slug).toBe("varmdo");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink).toEqual({ label: "Wikipedia, Strömma, Värmdö kommun", url: "https://sv.wikipedia.org/wiki/Strömma,_Värmdö_kommun" });
    expect(ortSeoOverrides.stromma.title).toBe("Takbyte i Strömma och Fågelbro, Värmdö – fast pris");
    expect(ortSeoOverrides.stromma.title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides.stromma.description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Strömma och Fågelbro, Värmdö");
    expect(l.lat).toBe(59.3);
    expect(l.lng).toBe(18.48333);
    expect(l.lat).not.toBe(locations.find((x) => x.slug === "varmdo")!.lat);
    expect(locationIndex.some((x) => x.slug === "stromma" && x.name === "Strömma")).toBe(true);
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och inga husåldrar utöver källans årtal", () => {
    const c = prerenderContent("/taklaggare-stromma")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Strömma och Fågelbro, Värmdö");
    expect(c.title).toBe("Takbyte i Strömma och Fågelbro, Värmdö – fast pris");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(c.paragraphs).toContain("Källa: Wikipedia, Strömma, Värmdö kommun");
    expect(alla).not.toMatch(/\b(oftast|ofta)\b/i);
  });
  it("kommunsidan på Värmdö länkar till sidan (kommunradens Strömma, Fågelbro och Lillström)", () => {
    expect(prerenderContent("/taklaggare-varmdo")!.links.map((l) => l.href)).toContain("/taklaggare-stromma");
  });
});
