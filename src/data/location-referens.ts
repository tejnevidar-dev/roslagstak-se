/**
 * Meningen om referensjobbet på ortssidor med egen text (paket 79, Marknadschefen 2026-10-13, förslag B): den står direkt efter områdestextens första stycke, lika i React och i serverns HTML.
 * Förut stod den bara i serverns HTML (geoFactsParagraph i prerender-content.ts), mitt på sidan; React visade bara en länk i länkrutan. Lydelsen och urvalet är oförändrade:
 * ett eget jobb på orten, annars det första jobbet inom 30 km (fågelvägen), och aldrig ett "i närområdet" utan att jobbets ort står utskriven.
 * Sidor som använder mallen har sin egen mening (location-mall.ts) och berörs inte. Bara relativa importer.
 */
import { locations } from "./locations";
import { projectTexts } from "./project-texts";
import { distanceKm } from "./service-reach";

const NEARBY_PROJECT_MAX_KM = 30;

export const referensMening = (loc: { slug: string; name: string; lat: number; lng: number }, prep: string): string | null => {
  const exact = projectTexts.find((p) => p.locationSlug === loc.slug);
  if (exact) return `Vi har utfört ett dokumenterat referensjobb här: ${exact.title}.`;
  const near = projectTexts.find((p) => {
    const projectLoc = locations.find((l) => l.slug === p.locationSlug);
    return !!projectLoc && distanceKm(loc, projectLoc) <= NEARBY_PROJECT_MAX_KM;
  });
  if (!near) return null;
  const projectLoc = locations.find((l) => l.slug === near.locationSlug)!;
  return `Ett referensjobb i närområdet: ${near.title}, ungefär ${Math.round(distanceKm(loc, projectLoc))} km härifrån. Det jobbet gjordes inte ${prep} ${loc.name}, men det visar hur ett komplett takbyte kan se ut.`;
};
