/**
 * Guidemallens fasta texter (BlogPost.tsx): delas av sidan (React) och av scripts/prerender-content.ts (statisk HTML),
 * så att besökaren och sökmotorn får samma ord (AD4). Ändra texten här.
 */
export const BLOG_TEMPLATE = {
  asideLead: "Osäker på hur ditt tak mår?",
  asideRest: "Vi gör en kostnadsfri takkontroll på plats, utan förpliktelser.",
  linksHeading: "Läs mer om tak i Roslagen",
  ctaHeading: "Behöver du hjälp med ditt tak?",
  ctaText: "Kostnadsfri takkontroll utan förpliktelser. Vi återkopplar inom 24 timmar.",
  relatedHeading: "Relaterade artiklar om tak",
};
/** Guider med fler än sex stycken får en ruta efter tredje stycket (BlogPost.tsx). */
export const blogHasAside = (contentLength: number) => contentLength > 6;
