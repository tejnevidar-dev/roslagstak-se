/**
 * Paket 148 (Marknadschefens grind 2026-10-20, ägarkartan A och C): 55 tjänstesidor länkar "takläggare i <ort>" till ortssidan (och fyra "takrenovering i <ort>" till takrenoveringssidan),
 * ordagrant ur innehall/agarkarta-A-briefrader-2026-10-20.md.
 */
import { describe, expect, it } from "vitest";
import { comboOverrides } from "../data/combo-overrides";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

/** De 55 tjänstesidor som fick länkmeningen. */
const SIDOR = Object.keys(comboOverrides).filter((k) => comboOverrides[k].content.some((p) => /Mer om orten finns på sidan om \[takläggare (?:i|på) [^\]]+\]\(\/taklaggare-[a-z0-9-]+\)\./.test(p)));
const ortAv = (k: string) => {
  const m = comboOverrides[k].content.join(" ").match(/Mer om orten finns på sidan om \[takläggare (?:i|på) [^\]]+\]\(\/taklaggare-([a-z0-9-]+)\)\./)!;
  return m[1];
};

describe("paket 148: länkarna 'takläggare i <ort>' från tjänstesidorna", () => {
  it("55 sidor har meningen, och den länkar till en ortssida som finns", () => {
    expect(SIDOR.length).toBeGreaterThanOrEqual(55); // 55 i gren 148, plus 12 i gren 150
    for (const k of SIDOR) expect(locations.some((l) => l.slug === ortAv(k)), k).toBe(true);
  });
  it("meningen står en gång per sida och sidorna länkar med sökordet i serverns HTML", () => {
    for (const k of SIDOR) {
      expect(comboOverrides[k].content.join(" ").split(/Mer om orten finns på sidan om \[takläggare (?:i|på) /).length - 1, k).toBe(1); // Hallstavik och Rimbo hade redan en äldre mening utan länk
      const c = prerenderContent(`/${k}`)!;
      expect(c.links.some((l) => l.href === `/taklaggare-${ortAv(k)}`), k).toBe(true);
    }
  });
  it("de fyra takbyte-sidorna länkar också till takrenoveringssidan (C)", () => {
    for (const o of ["sollentuna", "danderyd", "sodertalje", "akersberga"]) {
      expect(comboOverrides[`takbyte-${o}`].content.join(" "), o).toContain(`](/takrenovering-${o})`);
    }
  });
  it("inget 'ofta' i länkmeningarna", () => {
    for (const k of SIDOR) expect(comboOverrides[k].content.join(" ").match(/Mer om orten finns på sidan om[^.]*\./)![0], k).not.toMatch(/\bofta\b/);
  });
});
