/**
 * Gren 192 (plan-js-uppdelning.md): delar ortsdatan i en lättviktig lista och en fil per ort, så att en ortssida i webbläsaren hämtar bara sin egen text i stället för alla 244 orters text (1,06 MB).
 *
 *  - src/data/locations-light.ts: alla orter med de fält som listor, länkar och mallar behöver (slug, namn, region, ö-flagga, koordinater, grannar, förälder, H1, sökord)
 *    plus två förberäknade fält som ersätter läsning av tunga fält: harFaktaruta (location-mall: "ort utan faktaruta = mallsida") och kommun (kommunens namn ur parentLocation eller faktarutans rad "Kommun").
 *  - src/data/orter/<slug>.ts: ortens tunga fält (description, longDescription, extraContent, extraSections, process, uniqueFAQ, factBox, sourceLink), laddade lat med import.meta.glob.
 *
 * src/data/locations.ts är fortfarande källan (importverktygen skriver dit) och används av Node-verktygen (förrenderingen, sajtkartan, proven). Körs automatiskt via predev/prebuild.
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";

const LATT = ["slug", "name", "region", "isIsland", "nearbyLocations", "primaryKeyword", "lat", "lng", "parentLocation", "h1Override"] as const;
const TUNG = ["description", "longDescription", "extraContent", "extraSections", "process", "uniqueFAQ", "factBox", "sourceLink"] as const;
const byNamn = new Map(locations.map((l) => [l.name, l.slug]));
const kommunNamn = (l: (typeof locations)[number]): string | undefined => {
  if (l.parentLocation) return l.parentLocation.name;
  const k = l.factBox?.find((f) => f.label === "Kommun")?.value.replace(/\s*\(.*\)/, "").trim();
  return k && byNamn.has(k) ? k : undefined;
};

const poster = locations.map((l) => {
  const o: Record<string, unknown> = {};
  for (const k of LATT) if (l[k] !== undefined) o[k] = l[k];
  o.harFaktaruta = !!l.factBox;
  const k = kommunNamn(l);
  if (k) o.kommun = k;
  return o;
});

const rubrik = `/* AUTO-GENERERAD av scripts/generate-location-split.ts — redigera inte manuellt. Källan är src/data/locations.ts.
   Kör "bun scripts/generate-location-split.ts" (eller npm run dev/build) för att uppdatera. */\n`;

const lightFil = `${rubrik}
export interface LocationLight {
  slug: string;
  name: string;
  region: string;
  isIsland: boolean;
  nearbyLocations: string[];
  primaryKeyword: string;
  lat: number;
  lng: number;
  parentLocation?: { name: string; slug: string };
  h1Override?: string;
  /** Ortens post i locations.ts har en faktaruta (förberäknat; location-mall.ts: ort utan faktaruta är en mallsida). */
  harFaktaruta: boolean;
  /** Kommunens namn: förälderns namn eller faktarutans rad "Kommun" när den är en ort på sajten (förberäknat; hub-links.ts). */
  kommun?: string;
}

export const locationsLight: LocationLight[] = [
${poster.map((p) => "  " + JSON.stringify(p) + ",").join("\n")}
];
`;
writeFileSync(resolve("src/data/locations-light.ts"), lightFil);

const dir = resolve("src/data/orter");
mkdirSync(dir, { recursive: true });
for (const f of readdirSync(dir)) if (f.endsWith(".ts")) rmSync(resolve(dir, f));
for (const l of locations) {
  const tung: Record<string, unknown> = {};
  for (const k of TUNG) if (l[k] !== undefined) tung[k] = l[k];
  writeFileSync(
    resolve(dir, `${l.slug}.ts`),
    `${rubrik}import type { LocationHeavy } from "../location-heavy";\n\nconst ort: LocationHeavy = ${JSON.stringify(tung, null, 2)};\n\nexport default ort;\n`,
  );
}
console.log(`[location-split] ${locations.length} orter: src/data/locations-light.ts och src/data/orter/<slug>.ts`);

/* ---- combo-texterna (src/data/combo-overrides.ts, ca 413 kB): thin-combos.ts behöver bara vilka nycklar som har egen text, ServiceLocationPage laddar sin egen text per sida ---- */
import { comboOverrides } from "../src/data/combo-overrides";
const nycklar = Object.keys(comboOverrides);
writeFileSync(
  resolve("src/data/combo-keys.ts"),
  `${rubrik}
/** Tjänst × ort-sidor som har egen text i combo-overrides.ts (nyckel "<tjänst>-<ort>"). thin-combos.ts läser bara den här listan, så att inte alla combotexter hamnar i ortssidornas JS. */
export const COMBO_OVERRIDE_KEYS: readonly string[] = ${JSON.stringify(nycklar)};
const KEYS = new Set(COMBO_OVERRIDE_KEYS);
export const harComboOverride = (key: string): boolean => KEYS.has(key);
`,
);
const cdir = resolve("src/data/combos");
mkdirSync(cdir, { recursive: true });
for (const f of readdirSync(cdir)) if (f.endsWith(".ts")) rmSync(resolve(cdir, f));
for (const k of nycklar) {
  writeFileSync(
    resolve(cdir, `${k}.ts`),
    `${rubrik}import type { ComboOverride } from "../combo-overrides";\n\nconst combo: ComboOverride = ${JSON.stringify(comboOverrides[k], null, 2)};\n\nexport default combo;\n`,
  );
}
console.log(`[location-split] ${nycklar.length} combotexter: src/data/combo-keys.ts och src/data/combos/<nyckel>.ts`);
