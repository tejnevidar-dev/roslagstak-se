/**
 * P0-2 (seo-audit/06-atgardslista.md): sajtkartan börjar med de 32 sidor som betyder mest (Vidars ja 2026-10-24 16:57, gren 230) för förfrågningar och lokal synlighet, i den här ordningen, och resten följer i den ordning generatorn ger.
 * Listan står i beslut.md och Projektledarens meddelande: pengasidorna och tjänsterna, nav (/brf, /projekt), sexton ortssidor i kärnområdet och tre tjänst × ort-sidor.
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
  "/brf",
  "/projekt",
  "/tjanster/takomlaggning",
  "/tjanster/takrenovering",
  "/tjanster/platarbeten",
  "/tjanster/taktvatt",
  "/taklaggare-norrtalje",
  "/taklaggare-taby",
  "/taklaggare-akersberga",
  "/taklaggare-vallentuna",
  "/taklaggare-danderyd",
  "/taklaggare-vaxholm",
  "/taklaggare-lidingo",
  "/taklaggare-stockholm",
  "/taklaggare-sollentuna",
  "/taklaggare-nacka",
  "/taklaggare-huddinge",
  "/taklaggare-rimbo",
  "/taklaggare-hallstavik",
  "/taklaggare-botkyrka",
  "/taklaggare-sundbyberg",
  "/taklaggare-jarfalla",
  "/takbyte-norrtalje",
  "/takbyte-stockholm",
  "/takrenovering-stockholm",
];

/** Lägger de prioriterade sidorna först (i listans ordning) och behåller övriga i sin ordning. Sidor i listan som inte finns bland posterna hoppas över. */
export const ordnaEfterPrioritet = <T extends { path: string }>(poster: readonly T[]): T[] => {
  const perPath = new Map(poster.map((p) => [p.path, p]));
  const forst = SITEMAP_PRIORITET.map((p) => perPath.get(p)).filter((p): p is T => Boolean(p));
  const prio = new Set(forst.map((p) => p.path));
  return [...forst, ...poster.filter((p) => !prio.has(p.path))];
};
