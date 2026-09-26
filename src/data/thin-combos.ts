import { isNearBase } from "./service-reach";

/**
 * Tjänst+ort-sidor (t.ex. /takbyte-taby) har bara några få unika texter per tjänst och
 * blir nästan dubbletter över många orter. Vi indexerar dem bara där det finns en
 * verklig lokal förankring: orter inom 50 km från Norrtälje samt orter vi annonserar i.
 * Övriga sidor finns kvar (URL:erna raderas inte) men får noindex och ligger utanför sitemap.
 */
const INDEXED_EXTRA_SLUGS: readonly string[] = ["taby"];

export const isThinComboLocation = (loc: { slug: string; lat: number; lng: number }) =>
  !isNearBase(loc) && !INDEXED_EXTRA_SLUGS.includes(loc.slug);
