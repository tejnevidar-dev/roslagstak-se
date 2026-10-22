/**
 * Gren 192: den delade ortsdatan (locations-light.ts och orter/<slug>.ts, genererade av scripts/generate-location-split.ts) är exakt locations.ts: samma orter i samma ordning, lätta fält lika,
 * tunga fält lika, och de förberäknade fälten stämmer. Provet fäller om filerna är gamla (kör "bun scripts/generate-location-split.ts").
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { locationsLight } from "../data/locations-light";

const orter = import.meta.glob<{ default: Record<string, unknown> }>("../data/orter/*.ts", { eager: true });
const LATT = ["slug", "name", "region", "isIsland", "nearbyLocations", "primaryKeyword", "lat", "lng", "parentLocation", "h1Override"] as const;
const TUNG = ["description", "longDescription", "extraContent", "extraSections", "process", "uniqueFAQ", "factBox", "sourceLink"] as const;

describe("gren 192: delad ortsdata", () => {
  it("lika många orter i samma ordning, och en fil per ort", () => {
    expect(locationsLight.map((l) => l.slug)).toEqual(locations.map((l) => l.slug));
    expect(Object.keys(orter).length).toBe(locations.length);
  });
  it("lätta och tunga fält är exakt de i locations.ts", () => {
    for (const [i, l] of locations.entries()) {
      const lite = locationsLight[i] as unknown as Record<string, unknown>;
      for (const k of LATT) expect(lite[k], `${l.slug}.${k}`).toEqual((l as unknown as Record<string, unknown>)[k]);
      const tung = orter[`../data/orter/${l.slug}.ts`].default;
      for (const k of TUNG) expect(tung[k], `${l.slug}.${k}`).toEqual((l as unknown as Record<string, unknown>)[k]);
      expect(lite.harFaktaruta, l.slug).toBe(!!l.factBox);
    }
  });
  it("kommun: förälderns namn eller faktarutans kommunrad när den är en ort på sajten", () => {
    const namn = new Set(locations.map((l) => l.name));
    for (const [i, l] of locations.entries()) {
      const k = l.parentLocation?.name ?? l.factBox?.find((f) => f.label === "Kommun")?.value.replace(/\s*\(.*\)/, "").trim();
      const forvantat = l.parentLocation ? k : k && namn.has(k) ? k : undefined;
      expect((locationsLight[i] as { kommun?: string }).kommun, l.slug).toBe(forvantat);
    }
  });
});

describe("gren 192: delade combotexter", () => {
  it("combo-keys.ts och combos/<nyckel>.ts är exakt comboOverrides", async () => {
    const { comboOverrides } = await import("../data/combo-overrides");
    const { COMBO_OVERRIDE_KEYS, harComboOverride } = await import("../data/combo-keys");
    const filer = import.meta.glob<{ default: unknown }>("../data/combos/*.ts", { eager: true });
    expect([...COMBO_OVERRIDE_KEYS]).toEqual(Object.keys(comboOverrides));
    expect(Object.keys(filer).length).toBe(Object.keys(comboOverrides).length);
    for (const k of Object.keys(comboOverrides)) {
      expect(harComboOverride(k), k).toBe(true);
      expect(filer[`../data/combos/${k}.ts`].default, k).toEqual((comboOverrides as Record<string, unknown>)[k]);
    }
    expect(harComboOverride("takbyte-finnhamn-finns-inte")).toBe(false);
  });
});
