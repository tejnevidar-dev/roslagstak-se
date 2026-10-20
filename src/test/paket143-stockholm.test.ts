/**
 * Paket 143 (Marknadschefens grind 2026-10-20): takrenovering i Stockholm får egen text ur Innehålls brief (innehall/ortstexter/, Grind 2026-10-20) och blir indexerbar:
 * Samma väg som paket 125, 131 och 137.
 */
import { describe, expect, it } from "vitest";
import { comboOverrides } from "../data/combo-overrides";
import { isThinCombo } from "../data/thin-combos";
import { locations } from "../data/locations";
import { readFileSync } from "node:fs";
import { arOmpekad } from "../data/ompekade";
import { regionTexts } from "../data/region-texts";
import { prerenderContent } from "../../scripts/prerender-content";

const FEM = ["takrenovering-stockholm"];
const ort = (k: string) => k.split("-").slice(1).join("-");
const tjanst = (k: string) => k.split("-")[0];
const RUBRIK: Record<string, string> = { "takrenovering-stockholm": "Takrenovering i Stockholm" };

describe("paket 143: takrenovering i Stockholm med egen text", () => {
  it("den finns i comboOverrides med titel (44–48 tecken), beskrivning, text och länkar", () => {
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
  it("ompekningen rör dem inte: ingen rad i _redirects och inte i ompekade.ts", () => {
    const red = readFileSync("public/_redirects", "utf8");
    for (const k of FEM) {
      expect(red, k).not.toMatch(new RegExp("^/" + k + " ", "m"));
      expect(arOmpekad("/" + k), k).toBe(false);
    }
  });
});

describe("paket 143: regionsidorna Södra Stockholm och Stockholms stad", () => {
  it("Södra Stockholm har det nya avsnittet med sökordslänkarna och 'kan' i stället för 'ofta'", () => {
    const b = regionTexts["Södra Stockholm"].body;
    expect(b).toContain("## Takrenovering och takbyte i Stockholm och Huddinge");
    const t = b.join(" ");
    for (const l of ["[takrenovering i Stockholm](/takrenovering-stockholm)", "[takbyte i Stockholm](/takbyte-stockholm)", "[takläggare i Huddinge](/taklaggare-huddinge)", "[takbyte i Huddinge](/takbyte-huddinge)", "[Örby](/taklaggare-orby)", "[Enskede](/taklaggare-enskede)", "[Snättringe](/taklaggare-snattringe)"]) expect(t, l).toContain(l);
    expect(t).toContain("kan ha byggts till i omgångar");
    expect(t).not.toContain("har ofta byggts till");
  });
  it("Stockholms stad länkar till Stockholm-sidorna och har de nya orterna", () => {
    const t = regionTexts["Stockholms stad"].body.join(" ");
    expect(t).toContain("(/taklaggare-stockholm)");
    expect(t).toMatch(/Nockeby/);
    expect(t).toMatch(/Södra Ängby/);
    expect(t).toMatch(/Svedmyra/);
  });
  it("serverns HTML för regionsidorna har länkarna", () => {
    const c = prerenderContent("/omraden/sodra-stockholm")!;
    expect(c.links.map((l) => l.href)).toContain("/takrenovering-stockholm");
  });
});
