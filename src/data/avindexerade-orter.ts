/**
 * Ortssidor som är avindexerade (AJ5): sidan finns kvar på sin adress men är `noindex, follow`, står inte i sajtkartan och länkas inte
 * från sidor som listar orter (områdessidor, startsidans områdessektion, närliggande orter, ortslänkarna i den statiska HTML:en).
 * De anges inte heller som plats vi tar uppdrag på i JSON-LD på indexerbara sidor (paket 71: företagsnodens areaServed; scripts/check-avindexerade.ts fäller bygget annars).
 * Reversibelt: töm listan. Adressen raderas aldrig. EN lista för React, statisk HTML, sajtkarta och kontrollerna.
 * Bara relativa importer.
 */
export const AVINDEXERADE_ORTER: readonly string[] = [
  // Vidars ja 2026-10-11 (paket 42): Finnhamn (6 visningar). Ön har inga privata hus och guiden om Husarö nämner den inte längre.
  "finnhamn",
];

export const ortAvindexerad = (slug: string): boolean => AVINDEXERADE_ORTER.includes(slug);

/** Orter som får listas och länkas. */
export const synligaOrter = <T extends { slug: string }>(orter: readonly T[]): T[] => orter.filter((o) => !ortAvindexerad(o.slug));

/** Länkmålet för ett villaområde: undefined (ingen länk, bara namnet) om målet är en avindexerad ortssida. */
export const lankbarHref = (href?: string): string | undefined => (href && !avindexeradeOrtsvagar().includes(href) ? href : undefined);

/** Adresserna till de avindexerade ortssidorna. */
export const avindexeradeOrtsvagar = (): string[] => AVINDEXERADE_ORTER.map((s) => `/taklaggare-${s}`);
