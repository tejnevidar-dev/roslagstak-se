/**
 * Egen titel/beskrivning för ortssidor som har många visningar men få klick i Search Console
 * (mall för övriga orter finns i LocationPage). Logga varje ändring i ledning/seo-vecka.md.
 * Bara belagda uppgifter: takkontroll, fast pris, 10 års utförandegaranti, svar inom 24 h.
 */
export const ortSeoOverrides: Record<string, { title: string; description: string }> = {
  taby: {
    title: "Takrenovering och takbyte i Täby — fast pris",
    description:
      "Takrenovering, takbyte och plåtarbeten i Täby. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti. Ring 070-154 36 39 eller boka online.",
  },
  norrtalje: {
    title: "Takläggare i Norrtälje: byta tak, fast pris",
    description:
      "Takläggare i Norrtälje för dig som ska byta tak. Kostnadsfri takkontroll, skriftligt fast pris och 10 års utförandegaranti. Svar inom 24 timmar.",
  },
};
