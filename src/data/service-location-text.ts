/**
 * Fasta texter på tjänst × ort- och material × ort-sidorna (ServiceLocationPage.tsx): delas av sidan (React) och av
 * scripts/prerender-content.ts (statisk HTML), så att besökaren och sökmotorn får samma ord (AG1, paket 20). Ändra texten här.
 */
import { GARANTI_RENOVERING_CHIP } from "./guarantee";

export const SERVICE_LOCATION_TEXT = {
  relatedHeading: (prep: string, locationName: string) => `Relaterade tjänster ${prep} ${locationName}`,
  asideHeading: "Kostnadsfri takkontroll",
  asideText: (serviceName: string, prep: string, locationName: string) =>
    `Boka en kostnadsfri takkontroll för ${serviceName.toLowerCase()} ${prep} ${locationName}. Vi återkopplar inom 24 timmar.`,
  uspHeading: "Varför RoslagsTak?",
  usps: (serviceSlug: string): string[] => [
    ["takmalning", "taktvatt"].includes(serviceSlug)
      ? "10 års utförandegaranti"
      : GARANTI_RENOVERING_CHIP.replace("30 års tätskiktsgaranti", "10 års utförandegaranti, 30 års tätskiktsgaranti"),
    "Fast pris i offerten",
    "En kontaktperson genom hela processen",
    "Kostnadsfri takkontroll",
  ],
  nearbyHeading: (serviceName: string) => `${serviceName} i närheten`,
  allLocationsHeading: (serviceName: string) => `${serviceName} på fler orter`,
};
