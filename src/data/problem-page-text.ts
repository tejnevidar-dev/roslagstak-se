/**
 * Takproblemsidornas fasta texter (ProblemPage.tsx): delas av sidan (React) och av scripts/prerender-content.ts (statisk HTML),
 * så att besökaren och sökmotorn får samma ord (AG1, paket 25). Ändra texten här.
 */
export const PROBLEM_PAGE_TEXT = {
  exampleHeading: "Exempel på ett komplett takbyte",
  exampleText: (material: string) =>
    `Vi påstår inte att det här projektet hade just det här problemet — men det visar hur ett komplett takbyte kan se ut: ${material}.`,
  ctaText:
    "Osäker på hur allvarligt det är? Boka en kostnadsfri takkontroll utan förpliktelser. En av våra säljare tittar på taket på plats, och behöver något göras får du en offert med fast pris. Vi svarar inom 24 timmar.",
  areasHeading: "Vi tar uppdrag i dessa områden",
  relatedTitle: "Fler takproblem",
};
