/**
 * Paket 128d (Marknadschefens grind 2026-10-18): ny områdessida /taklaggare-kungsberga (Kungsberga, Färentuna och Hilleshög på Färingsö i Ekerö) ur villaomraden/texter/kungsberga-farentuna-ekero.md.
 * Egna koordinater (Wikipedia, Kungsberga, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-18) och källänk till Wikipedia-artikeln.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "kungsberga")!;

describe("paket 128d: Kungsberga, Färentuna och Hilleshög", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "kungsberga").length).toBe(1);
    expect(locations.some((l) => l.slug === "farentuna" || l.slug === "hilleshog")).toBe(false);
  });
  it("posten har egen text, faktaruta, Wikipedia som källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Kungsberga");
    expect(l.parentLocation?.slug).toBe("ekero");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink).toEqual({ label: "Wikipedia, Kungsberga", url: "https://sv.wikipedia.org/wiki/Kungsberga" });
    expect(ortSeoOverrides.kungsberga.title).toBe("Takbyte i Kungsberga och Färentuna, Ekerö – fast pris");
    expect(ortSeoOverrides.kungsberga.title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides.kungsberga.description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Kungsberga och Färentuna, Ekerö");
    expect(l.uniqueFAQ?.question).toBe("När byggdes husen i Kungsberga?");
    expect(l.lat).toBe(59.40472);
    expect(l.lng).toBe(17.62917);
    expect(l.lat).not.toBe(locations.find((x) => x.slug === "ekero")!.lat);
    expect(locationIndex.some((x) => x.slug === "kungsberga" && x.name === "Kungsberga")).toBe(true);
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och texten följer briefen", () => {
    const c = prerenderContent("/taklaggare-kungsberga")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Kungsberga och Färentuna, Ekerö");
    expect(c.title).toBe("Takbyte i Kungsberga och Färentuna, Ekerö – fast pris");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(c.paragraphs).toContain("Källa: Wikipedia, Kungsberga");
    expect(alla).toContain("Kungsberga, Färentuna och Hilleshög ligger på Färingsö i Mälaren, i Ekerö kommun.");
    expect(alla).toContain("Båda socknarna blev 1971 en del av Ekerö kommun.");
    expect(alla).toContain("går inte att se från vägen");
  });
  it("kommunsidan på Ekerö länkar till sidan (kommunraden)", () => {
    expect(prerenderContent("/taklaggare-ekero")!.links.map((l) => l.href)).toContain("/taklaggare-kungsberga");
  });
});
