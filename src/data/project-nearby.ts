/**
 * Referensjobb nära en ort. Ligger separat från projects.ts, eftersom den kräver hela orts-datan (locations.ts, ca 925 kB):
 * projektsidorna och startsidan ska inte behöva hämta den bara för att visa ett jobb (LCP på /projekt/<jobb>, 2026-10-06).
 */
import { locations, type LocationData } from "@/data/locations";
import { distanceKm } from "@/data/service-reach";
import { projects } from "@/data/projects";

const NEARBY_PROJECT_MAX_KM = 30;

/**
 * Ett referensjobb att visa på en ortssida som saknar ett eget projekt — men bara om det verkligen
 * ligger nära (Marknadschefen 2026-09-29, regel 5: aldrig ett vilseledande "i närområdet"). Kräver
 * ≤30 km fågelvägen. Bara avstånd, inte "samma region" — några av de namngivna regionerna
 * (t.ex. Norra skärgården, 57 km mellan ytterpunkterna) är för stora för att räknas som närområde
 * på egen hand. Länktexten på anropsstället ska alltid skriva ut projektets egen ort (locationName),
 * aldrig bara "i närområdet" utan angiven plats.
 */
export const getNearbyProject = (location: LocationData) => {
  if (projects.some((p) => p.locationSlug === location.slug)) return undefined;
  return projects.find((p) => {
    const projectLocation = locations.find((l) => l.slug === p.locationSlug);
    if (!projectLocation) return false;
    return distanceKm(location, projectLocation) <= NEARBY_PROJECT_MAX_KM;
  });
};
