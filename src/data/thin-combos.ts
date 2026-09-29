import { comboOverrides } from "./combo-overrides";

/**
 * Tjänst+ort-sidor (t.ex. /takbyte-taby) genereras av EN mallfunktion per tjänst
 * (service.generateContent i service-location-combos.ts) och blir därför i praktiken
 * dubbletter över alla orter — bekräftat av content-depth-check.ts 2026-09-29: efter maskering
 * av ortsnamnet är sidorna inom samma tjänst Jaccard=1.000 mot varandra (doorway-page-mönster).
 *
 * Marknadschefens beslut 2026-09-29 (steg 12-granskningen), punkt A/B: en tjänst+ort-sida
 * indexeras BARA om den har egen, riktig text — via comboOverrides (redan klart för 7 orter)
 * eller genom att stå på den prioriterade annonsort-listan (väntar på att Innehåll skriver
 * texterna, se ledning/marknad/backlog.md). Den gamla "isNearBase inom 50 km"-regeln räckte
 * inte: den höll för många mallgenererade sidor indexerade. Alla övriga blir noindex,follow och
 * ligger utanför sitemap (URL:erna raderas inte, reversibelt).
 */
const PRIORITY_AD_SLUGS: readonly string[] = ["taby", "vallentuna", "akersberga", "rimbo", "hallstavik", "norrtalje"];
const PRIORITY_SERVICES: readonly string[] = ["takbyte", "takomlaggning", "takrenovering"];

/**
 * Enskilda tjänst+ort-sidor som Marknadschefen undantagit trots att de inte är på prioritetslistan
 * ovan, eftersom Search Console (nollmätningen 2026-09-27, 28 dagar t.o.m. 2026-09-24) visar
 * riktiga klick på dem. Bekräftat: ingen tidigare "behåll vid klick"-lista fanns i Fas 1
 * (commit 1a2776d) eller på annat håll — det här är den första.
 */
const CLICK_CONFIRMED_EXEMPTIONS: ReadonlySet<string> = new Set([
  "taktvatt:ljustero",
  "taktvatt:norrtalje",
  "taktvatt:yxlan",
]);

export const isThinCombo = (serviceSlug: string, loc: { slug: string; lat: number; lng: number }): boolean => {
  if (serviceSlug === "takbyte" && loc.slug in comboOverrides) return false;
  if (PRIORITY_SERVICES.includes(serviceSlug) && PRIORITY_AD_SLUGS.includes(loc.slug)) return false;
  if (CLICK_CONFIRMED_EXEMPTIONS.has(`${serviceSlug}:${loc.slug}`)) return false;
  return true;
};
