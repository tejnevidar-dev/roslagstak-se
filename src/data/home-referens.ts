/**
 * Startsidans avsnitt "Referensjobb" (ReferenceCases.tsx): texterna delas av komponenten (React) och av
 * scripts/prerender-content.ts (statisk HTML), så att besökaren och sökmotorn får samma ord (AC4). Ändra texten här, inte i komponenten.
 */
export const HOME_REFERENS = {
  eyebrow: "Referensjobb",
  heading: "Tre tak vi har lagt, med bilder från jobben",
  intro: "Alla tre är utförda av RoslagsTak och visas med kundens samtycke. Varje jobb har en egen sida med fler bilder.",
  labels: { job: "Jobb", area: "Yta", material: "Material", period: "Utfört" },
  readMore: "Läs hela caset",
  allLink: "Se alla referensjobb",
  nearLink: "Byta tak i Norrtälje",
};

/** Nyaste jobbet först. */
export const HOME_REFERENS_ORDER = ["takbyte-grisslehamn", "takbyte-singo", "takrenovering-blido"];
