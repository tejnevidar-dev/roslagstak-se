import { ortAvindexerad } from "./avindexerade-orter";
import { hasServiceCombos } from "./service-slugs";
import { isThinCombo } from "./thin-combos";
import { arOmpekad } from "./ompekade";

/**
 * Gren 205b: länkmålet för en ort i listan "<tjänst> i alla orter" på tjänst × ort-sidorna. Sidan själv och orter med egen, indexerbar text länkar till sin tjänst × ort-sida, övriga (tunn, ompekad
 * eller saknad sida) till ortssidan, som är 301-målet, och en avindexerad ort (Finnhamn) till Husarö-sidan, som täcker den. Raden och etiketten står kvar, bara målet byts, så att ingen intern länk
 * går via en omdirigering eller till en noindex-sida. Bara relativa importer.
 */
export const comboOrtHref = (serviceSlug: string, egenOrt: string, l: { slug: string; region: string; lat: number; lng: number }): string => {
  if (l.slug === egenOrt) return `/${serviceSlug}-${l.slug}`;
  if (ortAvindexerad(l.slug)) return "/taklaggare-husaro";
  if (hasServiceCombos(l.region) && !isThinCombo(serviceSlug, l) && !arOmpekad(`/${serviceSlug}-${l.slug}`)) return `/${serviceSlug}-${l.slug}`;
  return `/taklaggare-${l.slug}`;
};
