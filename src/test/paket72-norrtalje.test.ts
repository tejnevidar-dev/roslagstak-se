/**
 * Paket 72 (Marknadschefens nattordning 2026-10-14, Innehålls utkast `norrtalje-kommun-utkast.md` version 2): den starkare Norrtälje-sidan. Texten är utkastets, mallavsnitt som den ersätter är
 * borta på just den sidan (location-slim.ts) och ingen annan ortssida ändras. Inga belopp, ingen tätskiktsgaranti på nytt ställe.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { LOCATION_SLIM, slimFor, slimFragor } from "@/data/location-slim";
import { generateLocationFAQs } from "@/data/location-faqs";
import { sektionsBitar, sektionsStycken } from "@/lib/sektionstext";
import { locationWhySections } from "@/data/location-sections";
import { prerenderContent } from "../../scripts/prerender-content";

const sida = (slug: string) => prerenderContent("/taklaggare-" + slug)!;
const text = (slug: string) => sida(slug).paragraphs.map((p) => (typeof p === "string" ? p : "")).join("\n");
const norr = () => locations.find((l) => l.slug === "norrtalje")!;

describe("paket 72: Norrtälje-sidan", () => {
  it("bara norrtalje har en post i location-slim.ts; alla andra sidor får tomt resultat och oförändrad frågelista", () => {
    expect(Object.keys(LOCATION_SLIM)).toEqual(["norrtalje"]);
    for (const l of locations.filter((x) => x.slug !== "norrtalje")) {
      expect(slimFor(l.slug), l.slug).toEqual({});
      const f = generateLocationFAQs(l.name, l.isIsland ? "på" : "i", l.isIsland, l.uniqueFAQ);
      expect(slimFragor(l.slug, f), l.slug).toBe(f);
    }
  });
  it("sidans egna avsnitt står i utkastets ordning, med 'Tre tak vi har bytt i kommunen' som enda stället för jobben", () => {
    const rubriker = (norr().extraSections ?? []).map((s) => s.heading);
    expect(rubriker).toEqual(["Det här gör vi i Norrtälje", "Tre tak vi har bytt i kommunen", "Så går en takkontroll till", "Pris och ROT", "Husen i Norrtälje", "Vad det betyder för taket"]);
    expect(norr().longDescription.startsWith("RoslagsTak är en takfirma med bas i Norrtälje.")).toBe(true);
    expect(norr().process).toBeUndefined();
    const t = text("norrtalje");
    expect(t).not.toMatch(/Ett referensjobb i närområdet|Vi har utfört ett dokumenterat referensjobb här/);
  });
  it("mallavsnitten som texten ersätter är borta, i serverns HTML och i FAQPage", () => {
    const t = text("norrtalje");
    expect(t).not.toContain("Våra taktjänster i Norrtälje");
    expect(t).not.toContain("Vad kostar takbyte i Norrtälje?");
    expect(t).not.toContain("Om Norrtälje");
    expect(t).not.toContain("Norrtälje tillhör Kusten");
    const fragor = (sida("norrtalje").jsonLd as { mainEntity?: { name: string }[] }[]).flatMap((n) => n.mainEntity ?? []).map((q) => q.name);
    expect(fragor.length).toBe(5);
    expect(fragor.some((q) => /Vad kostar ett takbyte|Erbjuder ni garanti|ROT-avdrag för takbyte|Hur bokar jag en kostnadsfri takkontroll/.test(q))).toBe(false);
    for (const q of fragor) expect(t, q).toContain(q);
  });
  it("det som ska stå kvar står kvar: så arbetar vi med garantilydelsen, faktarutan, de fem övriga frågorna", () => {
    const t = text("norrtalje");
    expect(t).toContain("Takläggare i Norrtälje: så arbetar vi");
    expect(t).toContain("Vi arbetar enligt AMA");
    expect(t).toMatch(/Kommun\nNorrtälje/);
    for (const q of ["När byggdes husen i Norrtälje?", "Hur lång tid tar ett takbyte i Norrtälje?", "Vilka takmaterial lägger ni i Norrtälje?", "Behöver jag byta hela taket eller räcker en renovering i Norrtälje?", "Kan ni byta ett eternittak i Norrtälje?"]) expect(t, q).toContain(q);
  });
  it("inga belopp och ingen tätskiktsgaranti på nytt ställe", () => {
    const t = text("norrtalje");
    expect(t).not.toMatch(/\d[\d  ]*\s?kr\b/);
    expect(t).not.toMatch(/riktpris(er)?\s+(från|på)\s+\d/i);
    expect(t.split("MATAKI").length - 1).toBeLessThanOrEqual(1);
    const nyaDelar = [norr().longDescription, ...(norr().extraSections ?? []).map((s) => s.text)].join("\n");
    expect(nyaDelar).not.toMatch(/MATAKI|tätskikt|30 års/i);
  });
  it("Om <ort> stängs av med nyckel: varje sida som stänger av det har exakt ett avsnitt med id \"om-ort\", och \"så arbetar vi\" står kvar (testet fäller om nyckeln inte hittas)", () => {
    for (const [slug, slim] of Object.entries(LOCATION_SLIM)) {
      if (!slim.utanOmOrt) continue;
      const l = locations.find((x) => x.slug === slug)!;
      const avsnitt = locationWhySections(l, l.isIsland ? "på" : "i", false);
      expect(avsnitt.filter((a) => a.id === "om-ort").length, slug).toBe(1);
      expect(avsnitt.filter((a) => a.id === "sa-arbetar-vi").length, slug).toBe(1);
      expect(text(slug)).toContain(avsnitt.find((a) => a.id === "sa-arbetar-vi")!.heading);
      expect(text(slug)).not.toContain(avsnitt.find((a) => a.id === "om-ort")!.heading);
    }
  });
  it("rutan Område (läge och närmaste orter) är borta på Norrtälje men står kvar på de andra sidorna", () => {
    expect(LOCATION_SLIM.norrtalje.utanOmrade).toBe(true);
    expect(text("norrtalje")).not.toMatch(/Närmaste orter/);
    for (const slug of ["rimbo", "hallstavik", "taby", "grisslehamn"]) expect(text(slug), slug).toContain("Närmaste orter");
  });
  it("andra ortssidor har sina mallavsnitt kvar", () => {
    for (const slug of ["rimbo", "hallstavik", "taby", "grisslehamn"]) {
      const t = text(slug);
      expect(t, slug).toContain("Våra taktjänster i");
      expect(t, slug).toContain("Vad kostar takbyte i");
    }
  });
  it("länkarna i listorna finns i serverns länklista (de är markdown-länkar i texten)", () => {
    const href = sida("norrtalje").links.map((l) => l.href);
    for (const h of ["/takbyte-norrtalje", "/takomlaggning-norrtalje", "/takrenovering-norrtalje", "/projekt/takbyte-singo", "/taklaggare-rimbo", "/taklaggare-radmanso"]) expect(href, h).toContain(h);
  });
  it("React ritar sektionernas listor ur samma hjälpfunktion och mallavsnitten ur samma lista", () => {
    const k = readFileSync("src/pages/LocationPage.tsx", "utf8");
    expect(k).toContain("sektionsBitar(section.text)");
    for (const t of ["slim.utanReferensmening", "slim.utanTaktjanster", "slim.utanPris", "slim.utanOmOrt", "slimFragor(location.slug"]) expect(k, t).toContain(t);
    const p = readFileSync("scripts/prerender-content.ts", "utf8");
    for (const t of ["slim.utanReferensmening", "slim.utanTaktjanster", "slim.utanPris", "slim.utanOmOrt", "slim.utanGeoFakta", "slimFragor(loc.slug"]) expect(p, t).toContain(t);
  });
});

describe("paket 72: sektionstext (listor i extraSections)", () => {
  it("en text utan radbrytning är ett stycke, som förut (inga andra sidor ändras)", () => {
    expect(sektionsBitar("- **Rimbo** växte. - **Hallstavik** var en by.")).toEqual([{ typ: "p", text: "- **Rimbo** växte. - **Hallstavik** var en by." }]);
    expect(sektionsStycken("En text.")).toEqual(["En text."]);
    for (const l of locations.filter((x) => x.slug !== "norrtalje")) for (const s of l.extraSections ?? []) expect(s.text.includes("\n"), l.slug + " " + s.heading).toBe(false);
  });
  it("rader med '- ' blir punktlista, '1. ' numrerad lista och övriga rader egna stycken", () => {
    expect(sektionsBitar("Inledning.\n- a\n- b\n1. ett\n2. två\nSlut.")).toEqual([
      { typ: "p", text: "Inledning." },
      { typ: "ul", rader: ["a", "b"] },
      { typ: "ol", rader: ["ett", "två"] },
      { typ: "p", text: "Slut." },
    ]);
    expect(sektionsStycken("Inledning.\n- a\n- b\n1. ett\n2. två\nSlut.")).toEqual(["Inledning.", "- a", "- b", "1. ett", "2. två", "Slut."]);
  });
});
