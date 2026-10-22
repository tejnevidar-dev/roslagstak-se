/**
 * Gren 192: laddar en orts tunga fält (src/data/orter/<slug>.ts, genererade av scripts/generate-location-split.ts) när ortens sida öppnas, i stället för att hämta alla 244 orters text i en fil.
 * useOrt kastar ett löfte tills posten är laddad (React Suspense: LocationPage ligger redan i en Suspense-gräns), så att sidan aldrig ritas utan sin text.
 * Bara för webbläsaren (import.meta.glob); Node-verktygen använder hela listan i locations.ts.
 */
import type { LocationData } from "./locations";
import type { LocationHeavy } from "./location-heavy";
import { locationsLight } from "./locations-light";

const moduler = import.meta.glob<{ default: LocationHeavy }>("./orter/*.ts");
const cache = new Map<string, LocationData>();
const vantar = new Map<string, Promise<void>>();

const sattIhop = (slug: string, tung: LocationHeavy): LocationData => {
  const { harFaktaruta: _h, kommun: _k, ...latt } = locationsLight.find((l) => l.slug === slug)!;
  return { ...latt, ...tung } as LocationData;
};

/** Ortens fulla post, eller undefined för en okänd ort. Kastar ett löfte medan den tunga delen laddas. */
export const useOrt = (slug: string | undefined): LocationData | undefined => {
  if (!slug) return undefined;
  const klar = cache.get(slug);
  if (klar) return klar;
  const lader = moduler[`./orter/${slug}.ts`];
  if (!lader || !locationsLight.some((l) => l.slug === slug)) return undefined;
  let p = vantar.get(slug);
  if (!p) {
    p = lader().then((m) => {
      cache.set(slug, sattIhop(slug, m.default));
    });
    vantar.set(slug, p);
  }
  throw p;
};
