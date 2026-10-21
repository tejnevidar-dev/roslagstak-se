/**
 * Gren 183 (briefrundan 2026-10-22, Marknadschefens grindsvar 283): Edsbro och Kapellskär får nya stycken, Kista, Jordbro, Hemmesta och Bålsta får sina ortstexter (briefarna fick Grind-rad),
 * och Alby och Gröndal får nya briefar. Texterna kommer ur arbetskopian som gren183-arbetskopia.mjs bygger och import-omrade.ts läser; briefens länkar är tillbakalagda (gren-lankar-tillbaka.mjs).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const ort = (slug: string) => locations.find((l) => l.slug === slug)!;
const html = (slug: string) => JSON.stringify(prerenderContent(`/taklaggare-${slug}`));

describe("gren 183: briefrundan", () => {
  it("Kista, Jordbro, Hemmesta, Bålsta, Alby och Gröndal har sina ortstexter, och nya länkar står som länkar", () => {
    expect(ort("kista").longDescription).toContain("kan ha ett av de radhus eller småhus som byggdes när stadsdelen kom till på 1970-talet");
    expect(ort("jordbro").longDescription).toContain("kan ha ett av de radhus, kedjehus eller småhus");
    expect(ort("hemmesta").longDescription).toContain("en ort som har vuxit i flera omgångar sedan 1960-talet");
    expect(ort("balsta").longDescription).toContain("började som stationssamhälle");
    expect(ort("alby").longDescription).toContain("Alby är en kommundel i Botkyrka");
    expect(ort("grondal").longDescription).toContain("Gröndal är en stadsdel i Söderort i Stockholm");
    for (const [slug, mal] of [["kista", "/taklaggare-spanga"], ["jordbro", "/taklaggare-vasterhaninge"], ["hemmesta", "/taklaggare-gustavsberg"], ["balsta", "/taklaggare-uppsala"], ["alby", "/taklaggare-fittja"], ["grondal", "/taklaggare-liljeholmen"]]) {
      expect(JSON.stringify(ort(slug)), slug).toContain(`](${mal})`);
      expect(html(slug), slug).toContain(mal);
    }
  });

  it("titel och meta finns för de sex, och sidorna har K2-lydelsen (underlagsformen), inget 'ofta'/'oftast' och inget internt arbetsnamn", () => {
    for (const s of ["kista", "jordbro", "hemmesta", "balsta", "alby", "grondal"]) {
      expect(ortSeoOverrides[s]?.title, s).toBeTruthy();
      expect(ortSeoOverrides[s]?.description, s).toBeTruthy();
      const j = JSON.stringify(ort(s));
      expect(j, s).not.toMatch(/\.csv\b|RegSO|ej kontrollerat live/);
      expect(j, s).not.toMatch(/\boftast\b|\b(har|finns det|används) ofta\b/);
      expect(j, s).not.toContain("ett slitet underlag");
    }
    expect(JSON.stringify(ort("kista"))).toContain("hur underlaget ser ut i dag går inte att se från gatan. Därför börjar vi med en takkontroll, där en av våra säljare tittar på taket på plats.");
  });

  it("Alby: faktarutan har inte radens interna arbetsanteckning (RegSO, alla.csv)", () => {
    expect(ort("alby").factBox?.map((f) => f.label)).toEqual(["Kommun", "Hustyper", "Byggperiod"]);
  });

  it("Edsbro och Kapellskär: de nya styckena står i datan och i serverns HTML", () => {
    expect(ort("edsbro").longDescription + JSON.stringify(ort("edsbro").extraSections)).toContain("Hæsabro");
    expect(html("edsbro")).toContain("Hæsabro");
    expect(html("kapellskar")).toContain("Långön");
  });
});
