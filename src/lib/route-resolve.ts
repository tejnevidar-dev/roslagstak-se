/**
 * Vilken sida en adress ger (paket 89). App.tsx hade förut en egen rutt per ort, per tjänst × ort, per annonssida och per BRF-ort (drygt 2 100 stycken), och
 * React Router bygger och rankar hela tabellen vid första renderingen (ca 127 ms på en långsam telefon). Nu finns tre parameterrutter, och de här funktionerna
 * avgör med samma listor som förut om adressen är en riktig sida. Samma adresser ger samma sidor; en okänd adress ger NotFound som "*" gjorde.
 */
import { locationIndex } from "../data/location-index";
import { allServiceSlugs, hasServiceCombos } from "../data/service-slugs";
import { adLandingSlugs } from "../data/ad-landings";
import { brfLocationSlugs } from "../data/brf-locations";

export type TopLevelSida = "ort" | "tjanst-ort" | null;

/** `taklaggare-<ort>` är en ortssida; `<tjänst>-<ort>` är en tjänstesida, men bara för orter i regioner som har tjänst × ort. */
export const resolveTopLevelSlug = (slug: string): TopLevelSida => {
  if (slug.startsWith("taklaggare-")) {
    const ort = slug.slice("taklaggare-".length);
    if (locationIndex.some((l) => l.slug === ort)) return "ort";
  }
  for (const tjanst of allServiceSlugs) {
    if (!slug.startsWith(`${tjanst}-`)) continue;
    const ort = slug.slice(tjanst.length + 1);
    const loc = locationIndex.find((l) => l.slug === ort);
    if (loc && hasServiceCombos(loc.region)) return "tjanst-ort";
  }
  return null;
};

/** `/offert/<slug>`: bara de annonssidor som finns i ad-landings.ts. */
export const resolveOffertSlug = (slug: string): boolean => (adLandingSlugs as readonly string[]).includes(slug);

/** `/brf/<slug>`: bara de BRF-orter som finns i brf-locations.ts. */
export const resolveBrfSlug = (slug: string): boolean => (brfLocationSlugs as readonly string[]).includes(slug);
