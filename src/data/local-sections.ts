import type { LocationData } from "./locations";
import { distanceFromBaseKm } from "./service-reach";

/**
 * Lokala fakta per ort för hubbsidorna (/taklaggare-<ort>): region, ö/fastland, grannorter och avstånd till basen.
 *
 * Regionprofilerna (hustyper, takmaterial och framkomlighet per region) är borttagna ur filen (Marknadschefen 2026-10-05,
 * backlog 1cs): de var påståenden om egen erfarenhet och om husen i regionen utan källa, och de ska inte kunna komma
 * tillbaka. Blocken om husen, takkontrollens "början" och "Så planerar vi arbetet" är borttagna på alla ortssidor.
 * Inga påståenden om väder eller klimat (regel 5, driftbeslut 2026-10-03).
 */

export interface LocalSectionBlock {
  heading: string;
  paragraphs: string[];
}

export interface LocalFact {
  label: string;
  value: string;
}

export interface LocalSections {
  intro: string;
  blocks: LocalSectionBlock[];
  facts: LocalFact[];
}

/** Bygger de lokala fakta för en ort. */
export const buildLocalSections = (loc: LocationData): LocalSections => {
  const neighbours = loc.nearbyLocations.slice(0, 3);
  const neighbourText =
    neighbours.length > 1
      ? `${neighbours.slice(0, -1).join(", ")} och ${neighbours[neighbours.length - 1]}`
      : neighbours[0] ?? loc.region;

  return {
    intro: "En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar.",
    blocks: [],
    facts: [
      { label: "Område", value: loc.region },
      // Raden "Läge: Fastland" säger inget för en besökare (paket 49b-2, Li2): den står bara kvar för öar. Koordinaterna finns kvar i den strukturerade datan.
      ...(loc.isIsland ? [{ label: "Läge", value: "Ö i skärgården" }] : []),
      { label: "Närmaste orter", value: neighbourText },
      { label: "Avstånd till vår bas i Norrtälje (fågelvägen)", value: `${Math.round(distanceFromBaseKm(loc))} km` },
    ],
  };
};
