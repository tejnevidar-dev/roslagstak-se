/**
 * Paket 128f (Marknadschefens grind 2026-10-20): ny områdessida /taklaggare-svartsjo (Svartsjö, Skå, Hilleshögby och Färjstaden på Färingsö i Ekerö) ur villaomraden/texter/faringso-omland-ekero.md.
 * Egna koordinater (Wikipedia, Svartsjö slott, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-20) och källänk till Wikipedia-artikeln om Färingsö.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const loc = () => locations.find((l) => l.slug === "svartsjo")!;

describe("paket 128f: Svartsjö, Skå, Hilleshögby och Färjstaden", () => {
  it("adressen är ny och krockar inte med någon annan ort", () => {
    expect(locations.filter((l) => l.slug === "svartsjo").length).toBe(1);
    expect(locations.some((l) => l.slug === "ska" || l.slug === "hilleshogby" || l.slug === "farjstaden")).toBe(false);
  });
  it("posten har egen text, faktaruta, Wikipedia som källa, överordnad ort, egen titel och egna koordinater", () => {
    const l = loc();
    expect(l.name).toBe("Svartsjö");
    expect(l.parentLocation?.slug).toBe("ekero");
    expect(l.isIsland).toBe(false);
    expect(l.longDescription.length).toBeGreaterThan(300);
    expect(l.factBox?.length ?? 0).toBeGreaterThanOrEqual(4);
    expect(l.sourceLink).toEqual({ label: "Wikipedia, Färingsö", url: "https://sv.wikipedia.org/wiki/Färingsö" });
    expect(ortSeoOverrides.svartsjo.title).toBe("Takbyte i Svartsjö och Skå på Färingsö – fast pris");
    expect(ortSeoOverrides.svartsjo.title.length).toBeLessThanOrEqual(60);
    expect(ortSeoOverrides.svartsjo.description.length).toBeLessThanOrEqual(160);
    expect(l.h1Override).toBe("Takläggare i Svartsjö och Skå, Färingsö");
    expect(l.uniqueFAQ?.question).toBe("När byggdes husen i Svartsjö?");
    expect(l.lat).toBe(59.36267);
    expect(l.lng).toBe(17.72781);
    expect(l.lat).not.toBe(locations.find((x) => x.slug === "ekero")!.lat);
    expect(locationIndex.some((x) => x.slug === "svartsjo" && x.name === "Svartsjö")).toBe(true);
  });
  it("serverns HTML har rubrik, titel, källa och 400 unika ord, och texten följer briefen", () => {
    const c = prerenderContent("/taklaggare-svartsjo")!;
    expect(c).toBeTruthy();
    expect(c.h1).toBe("Takläggare i Svartsjö och Skå, Färingsö");
    expect(c.title).toBe("Takbyte i Svartsjö och Skå på Färingsö – fast pris");
    const alla = [c.intro, ...c.paragraphs].join(" ");
    expect(new Set(alla.toLowerCase().split(/\s+/).filter(Boolean)).size).toBeGreaterThanOrEqual(400);
    expect(c.paragraphs).toContain("Källa: Wikipedia, Färingsö");
    expect(alla).toContain("Färingsö, eller Svartsjölandet, är en ö i Mälaren i Ekerö kommun.");
    expect(alla).toContain("Nära slottet och kyrkorna finns äldre miljöer");
    expect(alla).toContain("går inte att se från vägen");
    expect(alla.split("Svartsjö har en lång historia som kunglig plats.").length).toBe(2); // stycket står en gång
  });
  it("kommunsidan på Ekerö länkar till sidan (ny områdesrad)", () => {
    expect(prerenderContent("/taklaggare-ekero")!.links.map((l) => l.href)).toContain("/taklaggare-svartsjo");
  });
});
