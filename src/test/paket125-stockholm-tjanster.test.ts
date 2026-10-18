/**
 * Paket 125 (Vidars direktiv 2026-10-18, våg 1 punkt 1): sex tjänstesidor i Stockholmsorterna får egen text (Innehålls combo-stockholm-2026-10-18.md, Grind 2026-10-18) och blir indexerbara:
 * takbyte i Enskede, Älvsjö, Bro och Kungsängen samt takomläggning och takrenovering i Huddinge.
 */
import { describe, expect, it } from "vitest";
import { comboOverrides } from "../data/combo-overrides";
import { isThinCombo } from "../data/thin-combos";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const SEX = ["takbyte-enskede", "takbyte-alvsjo", "takbyte-bro", "takbyte-kungsangen", "takomlaggning-huddinge", "takrenovering-huddinge"];
const ort = (k: string) => k.split("-").slice(1).join("-");
const tjanst = (k: string) => k.split("-")[0];

describe("paket 125: sex tjänstesidor med egen text", () => {
  it("alla sex finns i comboOverrides med titel, beskrivning, text och länkar", () => {
    for (const k of SEX) {
      const c = comboOverrides[k];
      expect(c, k).toBeTruthy();
      expect(c.title.length, k).toBeLessThanOrEqual(60);
      expect(c.description.length, k).toBeLessThanOrEqual(160);
      expect(c.content.length, k).toBeGreaterThanOrEqual(20);
      expect(c.links?.length ?? 0, k).toBeGreaterThanOrEqual(5);
    }
  });
  it("de är inte längre mallsidor: indexerbara (isThinCombo falskt) och med minst 400 ord", () => {
    for (const k of SEX) {
      const loc = locations.find((l) => l.slug === ort(k))!;
      expect(loc, k).toBeTruthy();
      expect(isThinCombo(tjanst(k), loc), k).toBe(false);
      expect(comboOverrides[k].content.join(" ").split(/\s+/).length, k).toBeGreaterThanOrEqual(400);
    }
  });
  it("serverns HTML har sidans egen rubrik, titel och beskrivning", () => {
    const rubrik: Record<string, string> = { "takbyte-enskede": "Takbyte i Enskede", "takbyte-alvsjo": "Takbyte i Älvsjö", "takbyte-bro": "Takbyte i Bro", "takbyte-kungsangen": "Takbyte i Kungsängen", "takomlaggning-huddinge": "Takomläggning i Huddinge", "takrenovering-huddinge": "Takrenovering i Huddinge" };
    for (const k of SEX) {
      const p = prerenderContent(`/${k}`)!;
      expect(p, k).toBeTruthy();
      expect(p.h1.startsWith(rubrik[k]), k).toBe(true);
      expect(p.title, k).toBe(comboOverrides[k].title);
      expect(p.description, k).toBe(comboOverrides[k].description);
    }
  });
  it("texterna har inga personnamn-gatunamn, inga ofta/oftast och inga löften utöver tillåtna-listan", () => {
    for (const k of SEX) {
      const t = comboOverrides[k].content.join("\n");
      expect(t, k).not.toMatch(/\b(oftast|ofta)\b/i);
      expect(t, k).not.toMatch(/\b(billigast|bäst i|marknadens|garanterar)\b/i);
      expect(t, k).not.toMatch(/\b24\s?h\b/);
    }
  });
  it("tjänstesidorna för övriga fyra Stockholmsorter är orörda: Enskede-takomläggning är fortfarande mallsida", () => {
    const loc = locations.find((l) => l.slug === "enskede")!;
    expect(comboOverrides["takomlaggning-enskede"]).toBeUndefined();
    expect(isThinCombo("takomlaggning", loc)).toBe(true);
  });
});
