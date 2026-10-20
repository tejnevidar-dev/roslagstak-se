/**
 * Raden under rubriken på /taklaggare-norrtalje (paket 72a, bara Norrtälje, Vidars ja till "Norrtälje först" 2026-10-20): "Takläggare i Norrtälje: takfirma med bas i Norrtälje.
 * Takbyte, takomläggning och takrenovering. Kostnadsfri takkontroll och fast pris i offerten." Bara lydelser ur tillåtna-listan (B1 ordagrant, de tre tjänsterna, K1, fast pris).
 * Alla andra ortssidor behåller sin rad (beskrivningen): variant C på övriga ortssidor är inte beslutad. Raden är inte metabeskrivningen: den ändras inte här.
 * Delas av LocationPage.tsx och scripts/prerender-content.ts. Bara relativa importer.
 */
export const radUnderRubrik = (loc: { slug: string; name: string; description: string }, prep: string, mall: boolean): string => {
  if (mall || loc.slug !== "norrtalje") return loc.description;
  return `Takläggare ${prep} ${loc.name}: takfirma med bas i Norrtälje. Takbyte, takomläggning och takrenovering. Kostnadsfri takkontroll och fast pris i offerten.`;
};
