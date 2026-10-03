/** Regionindelning som används av områdeshubben och ServiceArea-sektionen. */

import { regionDescriptions } from "./region-descriptions";

export const regionOrder = [
  "Norra skärgården",
  "Mellersta skärgården",
  "Kusten",
  "Rådmansöhalvön",
  "Norra Roslagen",
  "Roslagens inland",
  "Österåker",
  "Stockholms stad",
  "Norra Stockholm",
  "Nordvästra Stockholm",
  "Västerort",
  "Östra Stockholm",
  "Sydöstra Stockholm",
  "Södra Stockholm",
  "Sydvästra Stockholm",
  "Mälardalen",
] as const;

/**
 * Kort text per region (korten på /omraden). Kommer ur de godkända regiontexterna (region-descriptions.ts,
 * genererad av import-region.ts), så att det bara finns EN källa per region. Regel 5: de gamla
 * handskrivna intron med klimatdiagnoser ("hårt kustklimat", "saltluft ställer högsta krav") är borta.
 */
export const regionIntros: Record<string, string> = Object.fromEntries(
  regionOrder.map((region) => [region, regionDescriptions[region] ?? ""]),
);

/** URL-slug per region — används av områdeshubbarna (/omraden/<slug>). */
export const regionSlugs: Record<string, string> = {
  "Norra skärgården": "norra-skargarden",
  "Mellersta skärgården": "mellersta-skargarden",
  Kusten: "kusten",
  Rådmansöhalvön: "radmansohalvon",
  "Norra Roslagen": "norra-roslagen",
  "Roslagens inland": "roslagens-inland",
  Österåker: "osteraker",
  "Stockholms stad": "stockholms-stad",
  "Norra Stockholm": "norra-stockholm",
  "Nordvästra Stockholm": "nordvastra-stockholm",
  Västerort: "vasterort",
  "Östra Stockholm": "ostra-stockholm",
  "Sydöstra Stockholm": "sydostra-stockholm",
  "Södra Stockholm": "sodra-stockholm",
  "Sydvästra Stockholm": "sydvastra-stockholm",
  Mälardalen: "malardalen",
};

export const regionBySlug = (slug: string): string | undefined =>
  Object.keys(regionSlugs).find((r) => regionSlugs[r] === slug);

export const regionPath = (region: string): string | undefined =>
  regionSlugs[region] ? `/omraden/${regionSlugs[region]}` : undefined;

/** Närliggande regioner (geografiskt), för länkar mellan regionsidor (fas 2.15). */
export const regionNeighbors: Record<string, string[]> = {
  "Norra skärgården": ["Rådmansöhalvön", "Mellersta skärgården", "Norra Roslagen"],
  "Mellersta skärgården": ["Norra skärgården", "Kusten", "Österåker"],
  Kusten: ["Norra Roslagen", "Rådmansöhalvön", "Roslagens inland", "Mellersta skärgården"],
  "Rådmansöhalvön": ["Kusten", "Norra skärgården", "Mellersta skärgården"],
  "Norra Roslagen": ["Kusten", "Roslagens inland", "Norra skärgården"],
  "Roslagens inland": ["Norra Roslagen", "Österåker", "Norra Stockholm"],
  Österåker: ["Roslagens inland", "Mellersta skärgården", "Norra Stockholm"],
  "Stockholms stad": ["Norra Stockholm", "Östra Stockholm", "Södra Stockholm", "Västerort"],
  "Norra Stockholm": ["Österåker", "Nordvästra Stockholm", "Stockholms stad"],
  "Nordvästra Stockholm": ["Norra Stockholm", "Västerort", "Mälardalen"],
  Västerort: ["Nordvästra Stockholm", "Stockholms stad", "Sydvästra Stockholm"],
  "Östra Stockholm": ["Stockholms stad", "Sydöstra Stockholm", "Österåker"],
  "Sydöstra Stockholm": ["Södra Stockholm", "Östra Stockholm"],
  "Södra Stockholm": ["Stockholms stad", "Sydöstra Stockholm", "Sydvästra Stockholm"],
  "Sydvästra Stockholm": ["Södra Stockholm", "Västerort", "Mälardalen"],
  Mälardalen: ["Nordvästra Stockholm", "Sydvästra Stockholm", "Roslagens inland"],
};
