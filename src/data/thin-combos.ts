import { isNearBase } from "./service-reach";
import { comboOverrides } from "./combo-overrides";

/**
 * Tjänst+ort-sidor (t.ex. /takbyte-taby) har bara några få unika texter per tjänst och
 * blir nästan dubbletter över många orter. Vi indexerar dem bara där det finns en
 * verklig lokal förankring: orter inom 50 km från Norrtälje samt orter vi annonserar i.
 * Övriga sidor finns kvar (URL:erna raderas inte) men får noindex och ligger utanför sitemap.
 */
const INDEXED_EXTRA_SLUGS: readonly string[] = ["taby"];

export const isThinComboLocation = (loc: { slug: string; lat: number; lng: number }) =>
  !isNearBase(loc) && !INDEXED_EXTRA_SLUGS.includes(loc.slug);

/**
 * /takbyte-<ort> för Storstockholms största kommuner (sprint-offensiv-2026-09-28 punkt 3) har
 * fått egen, unik text (se combo-overrides.ts) och ska indexeras trots att orten i övrigt räknas
 * som "tunn" — men BARA takbyte-kombinationen, inte ortens övriga tjänstesidor
 * (betongpannor-nacka m.fl. är fortfarande generiska och förblir noindex).
 */
export const isThinCombo = (serviceSlug: string, loc: { slug: string; lat: number; lng: number }): boolean => {
  if (serviceSlug === "takbyte" && loc.slug in comboOverrides) return false;
  return isThinComboLocation(loc);
};
