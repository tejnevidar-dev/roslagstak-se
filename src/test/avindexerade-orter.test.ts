/**
 * AJ5: avindexerade ortssidor (src/data/avindexerade-orter.ts) länkas inte från sidor som listar orter, i den statiska HTML:en.
 * Med en tom lista är testet tomt; det blir skarpt när listan fylls.
 */
import { describe, expect, it } from "vitest";
import { AVINDEXERADE_ORTER, avindexeradeOrtsvagar, ortAvindexerad, synligaOrter } from "@/data/avindexerade-orter";
import { locations } from "@/data/locations";
import { regionSlugs } from "@/data/regions";
import { hasServiceCombos } from "@/data/service-slugs";
import { generateCombos } from "@/data/service-location-combos";
import { isThinCombo } from "@/data/thin-combos";
import { prerenderContent } from "../../scripts/prerender-content";

const vagar = new Set(avindexeradeOrtsvagar());

describe("avindexerade ortssidor", () => {
  it("varje slug i listan är en riktig ort", () => {
    for (const s of AVINDEXERADE_ORTER) expect(locations.some((l) => l.slug === s), s).toBe(true);
  });

  it("synligaOrter tar bort exakt de avindexerade", () => {
    const kvar = synligaOrter(locations);
    expect(kvar.length).toBe(locations.length - AVINDEXERADE_ORTER.length);
    for (const l of kvar) expect(ortAvindexerad(l.slug)).toBe(false);
  });

  it("ingen annan sida länkar till en avindexerad ortssida i den statiska HTML:en", () => {
    if (vagar.size === 0) return;
    const sidor = [
      "/", "/omraden", "/brf", "/offert", "/recensioner", "/priser",
      ...Object.values(regionSlugs).map((s) => `/omraden/${s}`),
      ...locations.filter((l) => !ortAvindexerad(l.slug)).map((l) => `/taklaggare-${l.slug}`),
      // bara indexerbara tjänst × ort-sidor: länkar från noindex-sidor spelar ingen roll
      ...generateCombos().filter((c) => { const l = locations.find((x) => x.slug === c.locationSlug)!; return hasServiceCombos(l.region) && !isThinCombo(c.serviceSlug, l); }).map((c) => c.url),
    ];
    const fel: string[] = [];
    for (const s of sidor) for (const länk of prerenderContent(s)?.links ?? []) if (vagar.has(länk.href)) fel.push(`${s} -> ${länk.href}`);
    expect(fel.slice(0, 10)).toEqual([]);
  });
});
