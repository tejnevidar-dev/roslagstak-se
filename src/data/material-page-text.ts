/**
 * Materialsidornas fasta texter (MaterialPage.tsx): delas av sidan (React) och av scripts/prerender-content.ts (statisk HTML),
 * så att besökaren och sökmotorn får samma ord (AG1, paket 22). Ändra texten här.
 */
export const MATERIAL_PAGE_TEXT = {
  pricesLead: "Alla riktpriser finns på",
  pricesLink: "prissidan",
  readMoreHeading: "Läs vidare",
  ctaText:
    "Vilket material som passar ditt hus beror på taket, lutningen, huset och uttrycket du vill ha. Boka en kostnadsfri takkontroll utan förpliktelser. En av våra säljare tittar på taket på plats, och behöver taket åtgärdas får du en offert med fast pris.",
  relatedTitle: "Fler material",
};
/** Meningen med länken till prissidan, som ett stycke i den statiska HTML:en. */
export const materialPricesSentence = () => `${MATERIAL_PAGE_TEXT.pricesLead} ${MATERIAL_PAGE_TEXT.pricesLink}.`;
