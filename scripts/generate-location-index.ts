/**
 * Genererar src/data/location-index.ts — en lättviktig ortslista (slug, namn,
 * region, ö-flagga) som routing, schema och områdeslistor kan importera utan att
 * dra in hela src/data/locations.ts (~230 kB text) i startbundlen.
 *
 * Körs automatiskt via `predev`/`prebuild`.
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { locations } from "../src/data/locations";

const rows = locations
  .map(
    (l) =>
      `  { slug: ${JSON.stringify(l.slug)}, name: ${JSON.stringify(l.name)}, region: ${JSON.stringify(
        l.region,
      )}, isIsland: ${l.isIsland} },`,
  )
  .join("\n");

const file = `/* AUTO-GENERERAD av scripts/generate-location-index.ts — redigera inte manuellt.
   Kör "npm run location-index" (eller npm run dev/build) för att uppdatera. */

export interface LocationSummary {
  slug: string;
  name: string;
  region: string;
  isIsland: boolean;
}

export const locationIndex: LocationSummary[] = [
${rows}
];

export const locationRegions = Array.from(new Set(locationIndex.map((l) => l.region)));
`;

const out = resolve("src/data/location-index.ts");
writeFileSync(out, file);
console.log(`[location-index] wrote ${locations.length} orter to src/data/location-index.ts`);
