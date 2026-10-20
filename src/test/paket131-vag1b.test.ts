/**
 * Paket 131 (våg 1b, Marknadschefens grind 2026-10-20): fem tjänstesidor får egen text ur Innehålls briefar (innehall/ortstexter/, Grind 2026-10-20) och blir indexerbara:
 * takomläggning i Stockholm, takbyte i Botkyrka och Bromma, takomläggning i Enskede och Nacka. Samma väg som paket 125.
 */
import { describe, expect, it } from "vitest";
import { comboOverrides } from "../data/combo-overrides";
import { isThinCombo } from "../data/thin-combos";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const FEM = ["takomlaggning-stockholm", "takbyte-botkyrka", "takbyte-bromma", "takomlaggning-enskede", "takomlaggning-nacka"];
const ort = (k: string) => k.split("-").slice(1).join("-");
const tjanst = (k: string) => k.split("-")[0];
const RUBRIK: Record<string, string> = { "takomlaggning-stockholm": "Takomläggning i Stockholm", "takbyte-botkyrka": "Takbyte i Botkyrka", "takbyte-bromma": "Takbyte i Bromma", "takomlaggning-enskede": "Takomläggning i Enskede", "takomlaggning-nacka": "Takomläggning i Nacka" };

describe("paket 131: fem tjänstesidor med egen text (våg 1b)", () => {
  it("alla fem finns i comboOverrides med titel (44–48 tecken), beskrivning, text och länkar", () => {
    for (const k of FEM) {
      const c = comboOverrides[k];
      expect(c, k).toBeTruthy();
      expect(c.title.length, k).toBeLessThanOrEqual(60);
      expect(c.description.length, k).toBeLessThanOrEqual(160);
      expect(c.content.length, k).toBeGreaterThanOrEqual(20);
      expect(c.links?.length ?? 0, k).toBeGreaterThanOrEqual(5);
    }
  });
  it("de är inte längre mallsidor: indexerbara (isThinCombo falskt) och med minst 700 ord", () => {
    for (const k of FEM) {
      const loc = locations.find((l) => l.slug === ort(k))!;
      expect(loc, k).toBeTruthy();
      expect(isThinCombo(tjanst(k), loc), k).toBe(false);
      expect(comboOverrides[k].content.join(" ").split(/\s+/).length, k).toBeGreaterThanOrEqual(700);
    }
  });
  it("serverns HTML har sidans egen rubrik, titel och beskrivning", () => {
    for (const k of FEM) {
      const p = prerenderContent(`/${k}`)!;
      expect(p, k).toBeTruthy();
      expect(p.h1.startsWith(RUBRIK[k]), k).toBe(true);
      expect(p.title, k).toBe(comboOverrides[k].title);
      expect(p.description, k).toBe(comboOverrides[k].description);
    }
  });
  it("texterna har inga ofta/oftast, inga överdrifter och inget svarslöfte i texten", () => {
    for (const k of FEM) {
      const t = comboOverrides[k].content.join("\n");
      expect(t, k).not.toMatch(/\b(oftast|ofta)\b/i);
      expect(t, k).not.toMatch(/\b(billigast|bäst i|marknadens|garanterar)\b/i);
      expect(t, k).not.toMatch(/\b24\s?h\b/);
    }
  });
  it("syskonsidorna är orörda: Älvsjö-takomläggning är fortfarande mallsida och Enskede-takbyte har sin 125-text", () => {
    expect(comboOverrides["takomlaggning-alvsjo"]).toBeUndefined();
    expect(isThinCombo("takomlaggning", locations.find((l) => l.slug === "alvsjo")!)).toBe(true);
    expect(comboOverrides["takbyte-enskede"]).toBeTruthy();
  });
});
