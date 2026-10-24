/**
 * P0-2 (seo-audit/06-atgardslista.md): sajtkartan börjar med de cirka 30 sidor som betyder mest för förfrågningar och lokal synlighet, i den här ordningen, och resten följer i den ordning generatorn ger.
 * Listan är: pengasidorna och tjänsterna (01 §2 rad 1), de fjorton ortsidor som revisionen pekar ut som ägarsidor i kärnområdet (01 §2 och 06 P1-4), och några tjänst × ort-sidor och nav.
 * Ordningen i en sajtkarta är ingen rankingsignal; syftet är att Google ser de starka sidorna först och att "Begär indexering" (Vidar, tio per dag) följer samma lista. Bara relativa importer.
 */
export const SITEMAP_PRIORITET: readonly string[] = [
  "/",
  "/offert",
  "/takkontroll",
  "/rot-avdrag",
  "/takreparation",
  "/hangrannor",
  "/priser",
  "/tjanster/takomlaggning",
  "/tjanster/takrenovering",
  "/tjanster/platarbeten",
  "/taklaggare-norrtalje",
  "/taklaggare-taby",
  "/taklaggare-akersberga",
  "/taklaggare-vallentuna",
  "/taklaggare-danderyd",
  "/taklaggare-vaxholm",
  "/taklaggare-lidingo",
  "/taklaggare-stockholm",
  "/taklaggare-nacka",
  "/taklaggare-sundbyberg",
  "/taklaggare-huddinge",
  "/taklaggare-sollentuna",
  "/taklaggare-botkyrka",
  "/taklaggare-jarfalla",
  "/takrenovering-stockholm",
  "/takbyte-norrtalje",
  "/takbyte-taby",
  "/material/tp20-plattak",
  "/brf",
  "/recensioner",
];

/** Lägger de prioriterade sidorna först (i listans ordning) och behåller övriga i sin ordning. Sidor i listan som inte finns bland posterna hoppas över. */
export const ordnaEfterPrioritet = <T extends { path: string }>(poster: readonly T[]): T[] => {
  const perPath = new Map(poster.map((p) => [p.path, p]));
  const forst = SITEMAP_PRIORITET.map((p) => perPath.get(p)).filter((p): p is T => Boolean(p));
  const prio = new Set(forst.map((p) => p.path));
  return [...forst, ...poster.filter((p) => !prio.has(p.path))];
};
