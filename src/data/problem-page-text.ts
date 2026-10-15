/**
 * Takproblemsidornas fasta texter (ProblemPage.tsx): delas av sidan (React) och av scripts/prerender-content.ts (statisk HTML),
 * så att besökaren och sökmotorn får samma ord (AG1, paket 25). Ändra texten här.
 */
export const PROBLEM_PAGE_TEXT = {
  exampleHeading: "Exempel på ett komplett takbyte",
  exampleText: (material: string) =>
    `Jobbet hade inte det här problemet, men det visar hur ett komplett takbyte kan se ut: ${material}.`,
  ctaText:
    "Osäker på hur allvarligt det är? Boka en kostnadsfri takkontroll utan förpliktelser. En av våra säljare tittar på taket på plats, och behöver något göras får du en offert med fast pris. Vi svarar inom 24 timmar.",
  areasHeading: "Vi tar uppdrag i dessa områden",
  relatedTitle: "Fler takproblem",
  relatedIntro: "Fler takproblem och guider som hör ihop med det här.",
  /** Hubben /takproblem: ingress och metabeskrivning, samma ord i React och i serverns HTML (paket 101, H1–H3). */
  hubIntro:
    "Ett tak visar inte alltid att något är fel förrän skadan har pågått ett tag. Här har vi samlat takproblem som villaägare kan upptäcka: hur de visar sig, vad de kan bero på, vad du kan göra själv och när det är dags att låta en takläggare titta. Gå aldrig upp på taket själv, titta från marken och från vinden.",
  hubMeta:
    "Läcker taket, mossa, fukt på vinden eller istappar? Takproblem som villaägare kan upptäcka, hur du känner igen dem och när det är dags att ringa en takläggare.",
};
