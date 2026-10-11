/**
 * Guider som är avindexerade (paket 42, Vidars ja 2026-10-11): sidan finns kvar på sin adress men är `noindex, follow`, står inte i sajtkartan och länkas inte
 * från indexerbara sidor (bloggens lista, startsidans guideblock, relaterade guider, länklistor). Inga texter ändras på sidorna själva.
 * Reversibelt: töm listan. Adressen raderas aldrig. EN lista för React, statisk HTML, sajtkarta och kontrollerna.
 * Bara relativa importer.
 */
export const AVINDEXERADE_GUIDER: readonly string[] = [
  "takmalning-betongpannor",
  "tak-pa-carport-hallbart",
  "byta-tak-radhus-guide",
  "platta-tak-lackage-avrinning",
  "epdm-gummiduk-tak-tatskikt",
  "snorasskydd-tak-krav-placering-pris",
];

export const guideAvindexerad = (slug: string): boolean => AVINDEXERADE_GUIDER.includes(slug);

/** Guider som får listas och länkas. */
export const synligaGuider = <T extends { slug: string }>(guider: readonly T[]): T[] => guider.filter((g) => !guideAvindexerad(g.slug));

/** Adresserna till de avindexerade guiderna. */
export const avindexeradeGuidevagar = (): string[] => AVINDEXERADE_GUIDER.map((s) => `/blogg/${s}`);
