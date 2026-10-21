/**
 * Paket 165 (Marknadschefens ord 2026-10-21 22:08, Vidars svar på rad 9): /tjanster/taktvatt får ny text (guidetexter/bc-underlag-tjanstesida-taktvatt.md) och sex taktvätt × ort-sidor
 * (Vaxholm, Vallentuna, Täby, Lidingö, Sollentuna, Haninge; ortstexter/taktvatt-*.md) blir indexerbara. Metod och taktyper får stå, men inga belopp, ingen garanti på tvätten och inget om
 * lertegel, eternit, högtryck, rännrensning, efterbehandling, AMA eller ROT.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { comboOverrides } from "../data/combo-overrides";
import { locations } from "../data/locations";
import { isThinCombo } from "../data/thin-combos";
import { COMBO_LINK_TILL_TJANST, comboDefaultH1 } from "../data/service-location-combos";
import { TAKTVATT_META, TAKTVATT_SIDA_TITLE, TAKTVATT_SIDA_META, TAKTVATT_SIDA_SECTIONS, TAKTVATT_SIDA_FAQS } from "../data/taktvatt-text";
import { prerenderContent } from "../../scripts/prerender-content";

const ORTER = ["vaxholm", "vallentuna", "taby", "lidingo", "sollentuna", "haninge"];
const FORBJUDET = /lertegel|eternit|asbest|högtryck|rännrensning|efterbehandling|\bAMA\b|ROT-avdrag|garanti|skonsam|\d\s?kr\b/i;

describe("paket 165: taktvätt × ort", () => {
  const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
  for (const s of ORTER) {
    it(`/taktvatt-${s}: egen text, indexerbar, i sajtkartan, länkar till ortssidan och till /tjanster/taktvatt, och inga förbjudna ord`, () => {
      const o = comboOverrides[`taktvatt-${s}`];
      expect(o, s).toBeTruthy();
      expect([...o.title].length).toBeLessThanOrEqual(60);
      expect([...o.description].length).toBeLessThanOrEqual(160);
      expect(o.content.length).toBeGreaterThanOrEqual(12);
      const loc = locations.find((l) => l.slug === s)!;
      expect(isThinCombo("taktvatt", loc)).toBe(false);
      expect(COMBO_LINK_TILL_TJANST[`/taktvatt-${s}`]).toBeUndefined();
      expect(sitemap).toContain(`<loc>https://roslagstak.se/taktvatt-${s}</loc>`);
      const text = [o.title, o.description, ...o.content].join(" ");
      expect(text).not.toMatch(FORBJUDET);
      expect(o.content.join(" ")).toContain(`](/taklaggare-${s})`);
      expect(o.content.join(" ")).toMatch(/hetvatten/);
      const c = prerenderContent(`/taktvatt-${s}`)!;
      expect(c.h1).toMatch(/^Taktvätt (i|på) /);
      expect(c.links.map((l) => l.href)).toContain(`/taklaggare-${s}`);
    });
  }
  it("länkar från ortssidorna går till de nya taktvätt-sidorna (inte längre till /tjanster/taktvatt)", () => {
    for (const s of ORTER) expect(prerenderContent(`/taklaggare-${s}`)!.links.map((l) => l.href), s).toContain(`/taktvatt-${s}`);
  });
});

describe("paket 165: /tjanster/taktvatt", () => {
  it("ny titel, meta, fem avsnitt och fyra frågor, inom gränserna och utan förbjudna ord", () => {
    expect(TAKTVATT_SIDA_TITLE).toBe("Taktvätt av betongpannetak och plåttak – fast pris");
    expect([...TAKTVATT_SIDA_META].length).toBeLessThanOrEqual(160);
    expect(TAKTVATT_SIDA_SECTIONS.map((s) => s.heading)).toEqual(["Vilka tak vi tvättar", "Så tvättar vi taket", "Vad kostar en taktvätt?", "När räcker det inte med tvätt?", "Så går det till"]);
    expect(TAKTVATT_SIDA_FAQS.length).toBe(4);
    expect(JSON.stringify([TAKTVATT_SIDA_TITLE, TAKTVATT_SIDA_META, TAKTVATT_SIDA_SECTIONS, TAKTVATT_SIDA_FAQS])).not.toMatch(FORBJUDET);
    const c = prerenderContent("/tjanster/taktvatt")!;
    expect(c.title).toBe(TAKTVATT_SIDA_TITLE);
    expect(JSON.stringify(c.paragraphs)).toContain("Taket tvättas med hetvatten");
  });
  it("de tre äldre indexerade taktvätt-sidorna (Ljusterö, Norrtälje, Yxlan) behåller korttexten", () => {
    for (const s of ["ljustero", "norrtalje", "yxlan"]) expect(comboOverrides[`taktvatt-${s}`].description).toBe(TAKTVATT_META);
    expect(comboDefaultH1({ serviceSlug: "taktvatt", serviceName: "Taktvätt", prep: "i", locationName: "Vaxholm" })).toBe("Taktvätt i Vaxholm");
  });
});
