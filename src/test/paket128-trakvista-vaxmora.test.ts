/**
 * Paket 128 (Marknadschefens grind 2026-10-19 "bygg"): två nya områdessidor ur villaomraden/texter/ (Träkvista i Ekerö, Vaxmora i Sollentuna).
 * Områdenas egna koordinater (Wikipedia, sv.wikipedia.org, prop=coordinates, hämtade 2026-10-18) och källänk till Wikipedia-artikeln.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationIndex } from "../data/location-index";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const NYA = [
  { slug: "trakvista", name: "Träkvista", h1: "Takläggare i Träkvista, Ekerö", parent: "ekero", titel: "Takbyte i Träkvista och Ekebyhov, Ekerö – fast pris", lat: 59.27389, lng: 17.77944, wiki: "https://sv.wikipedia.org/wiki/Träkvista", faq: "När byggdes husen i Träkvista?" },
  { slug: "vaxmora", name: "Vaxmora", h1: "Takläggare i Vaxmora, Sollentuna", parent: "sollentuna", titel: "Takbyte i Vaxmora och Väsjön, Sollentuna – fast pris", lat: 59.45528, lng: 17.94944, wiki: "https://sv.wikipedia.org/wiki/Vaxmora", faq: "När byggdes husen i Vaxmora?" },
] as const;
const loc = (s: string) => locations.find((l) => l.slug === s)!;

describe("paket 128: två nya områdessidor", () => {
  it("adresserna är nya och krockar inte med någon annan ort", () => {
    for (const n of NYA) expect(locations.filter((l) => l.slug === n.slug).length, n.slug).toBe(1);
    expect(locations.some((l) => l.slug === "ekebyhov" || l.slug === "vasby" || l.slug === "vasjon")).toBe(false);
  });
  it("posterna har egen text, faktaruta, Wikipedia som källa, överordnad ort och egen titel", () => {
    for (const n of NYA) {
      const l = loc(n.slug);
      expect(l.name, n.slug).toBe(n.name);
      expect(l.parentLocation?.slug, n.slug).toBe(n.parent);
      expect(l.isIsland, n.slug).toBe(false);
      expect(l.longDescription.length, n.slug).toBeGreaterThan(300);
      expect(l.factBox?.length ?? 0, n.slug).toBeGreaterThanOrEqual(4);
      expect(l.sourceLink, n.slug).toEqual({ label: `Wikipedia, ${n.name}`, url: n.wiki });
      expect(ortSeoOverrides[n.slug].title, n.slug).toBe(n.titel);
      expect(ortSeoOverrides[n.slug].title.length, n.slug).toBeLessThanOrEqual(60);
      expect(ortSeoOverrides[n.slug].description.length, n.slug).toBeLessThanOrEqual(160);
      expect(l.h1Override, n.slug).toBe(n.h1);
      expect(l.uniqueFAQ?.question, n.slug).toBe(n.faq);
    }
  });
  it("områdenas egna koordinater (Wikipedia), inte den överordnade ortens", () => {
    for (const n of NYA) {
      expect(loc(n.slug).lat, n.slug).toBe(n.lat);
      expect(loc(n.slug).lng, n.slug).toBe(n.lng);
      expect(loc(n.slug).lat, n.slug).not.toBe(loc(n.parent).lat);
    }
  });
  it("faktarutans och FAQ:ns egennamn har stor bokstav i början av värdet (Vaxmora)", () => {
    expect(loc("vaxmora").uniqueFAQ!.answer).toContain("Byggperiod enligt källorna: Vaxmora främst 1960- och 1970-tal");
    expect(loc("vaxmora").uniqueFAQ!.answer).not.toContain("vaxmora");
  });
  it("ortsindexet har de två", () => {
    for (const n of NYA) expect(locationIndex.some((l) => l.slug === n.slug && l.name === n.name), n.slug).toBe(true);
  });
});

describe("paket 128: sidorna i serverns HTML och länkarna dit", () => {
  it("rubrik, titel och faktaruta finns, och 400 unika ord klaras", () => {
    for (const n of NYA) {
      const c = prerenderContent(`/taklaggare-${n.slug}`)!;
      expect(c, n.slug).toBeTruthy();
      expect(c.h1, n.slug).toBe(n.h1);
      expect(c.title, n.slug).toBe(n.titel);
      const ord = new Set([c.intro, ...c.paragraphs].join(" ").toLowerCase().split(/\s+/).filter(Boolean));
      expect(ord.size, n.slug).toBeGreaterThanOrEqual(400);
      expect(c.paragraphs.some((p) => p.startsWith(`${n.faq}`)), n.slug).toBe(true);
      expect(c.paragraphs, n.slug).toContain(`Källa: Wikipedia, ${n.name}`);
    }
  });
  it("kommunsidorna länkar till de nya områdena (villaområdesraderna)", () => {
    const lank = (p: string) => prerenderContent(p)!.links.map((l) => l.href);
    expect(lank("/taklaggare-ekero")).toContain("/taklaggare-trakvista");
    expect(lank("/taklaggare-sollentuna")).toContain("/taklaggare-vaxmora");
  });
  it("texterna följer briefarna: inga personnamn, Väsby nämns bara som delområde och Väsjön har bara årtal", () => {
    const t = prerenderContent("/taklaggare-trakvista")!;
    const alla = [t.intro, ...t.paragraphs].join(" ");
    expect(alla).toContain("Ekebyhov, Träkvista och Väsby ligger på Ekerön i Mälaren");
    expect(alla).toContain("Parkens bokskog är enligt Wikipedia troligen Sveriges nordligaste självförnyande bokskog.");
    const v = prerenderContent("/taklaggare-vaxmora")!;
    const allv = [v.intro, ...v.paragraphs].join(" ");
    expect(allv).toContain("Där tomterna gränsar till skogen kan löv och barr samlas i hängrännor och ränndalar.");
    expect(allv).toContain("Kring sjön har ett nytt bostadsområde vuxit fram sedan slutet av 2010-talet.");
  });
});
