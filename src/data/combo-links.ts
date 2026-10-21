import { locations } from "./locations";
import { COMBO_LINK_LABEL, COMBO_SERVICE_PAGE, MATERIAL_OWN_PAGE } from "./service-location-combos";
import { isThinCombo } from "./thin-combos";
import { arOmpekad } from "./ompekade";
import { allServiceSlugs } from "./service-slugs";

/**
 * H2 (Marknadschefens natt 2026-10-21, analysen seo-analys-2026-10-21/2-live-kontroll.md): indexerbara sidor länkar inte till adresser utanför sajtkartan.
 * Tjänst × ort-sidor som är noindex (thin-combos.ts) eller ompekade (301, ompekade.ts) länkas därför inte själva. Länken går i stället till tjänstens egen
 * indexerbara sida, med den länktext som sidan har, eller utelämnas om tjänsten saknar indexerbar sida (takmålning). Material har sedan tidigare sin egen sida
 * (MATERIAL_OWN_PAGE). EN regel för React och statisk HTML (delas av LocationPage.tsx, ServiceLocationPage.tsx och scripts/prerender-content.ts). Bara relativa importer.
 */
export const TJANST_AGARSIDA: Record<string, { to: string; label: string }> = {
  takbyte: COMBO_SERVICE_PAGE.takbyte,
  takomlaggning: COMBO_SERVICE_PAGE.takomlaggning,
  takrenovering: COMBO_SERVICE_PAGE.takrenovering,
  taktvatt: { to: "/tjanster/taktvatt", label: "Taktvätt" },
};

interface ComboRef {
  serviceSlug: string;
  locationSlug: string;
  serviceName: string;
  prep: string;
  locationName: string;
}

/** Länken till en tjänst × ort-sida: sidan själv om den är indexerbar, annars tjänstens egen sida, och annars ingen länk (null). */
export const comboLink = (c: ComboRef): { href: string; label: string } | null => {
  const own = MATERIAL_OWN_PAGE[c.serviceSlug];
  if (own) return { href: own.to, label: own.label };
  const loc = locations.find((l) => l.slug === c.locationSlug);
  const url = `/${c.serviceSlug}-${c.locationSlug}`;
  if (!loc || isThinCombo(c.serviceSlug, loc) || arOmpekad(url)) {
    const agare = TJANST_AGARSIDA[c.serviceSlug];
    return agare ? { href: agare.to, label: agare.label } : null;
  }
  return { href: url, label: COMBO_LINK_LABEL[url] ?? `${c.serviceName} ${c.prep} ${c.locationName}` };
};

/** En adress på formen /<tjänst>-<ort> som är en noindex-kombination eller ompekad (länkas inte från indexerbara sidor, t.ex. från en sidas egna länkar i combo-overrides.ts). */
export const arTunnLankAdress = (url: string): boolean => {
  if (arOmpekad(url)) return true;
  const m = [...allServiceSlugs].sort((a, b) => b.length - a.length).find((s) => url.startsWith(`/${s}-`));
  if (!m) return false;
  const loc = locations.find((l) => l.slug === url.slice(m.length + 2));
  return loc ? isThinCombo(m, loc) : false;
};

/** Tar bort tomma länkar och länkar med samma mål (första gäller). */
export const dedupeLinks = <T extends { href: string }>(links: (T | null)[]): T[] => {
  const seen = new Set<string>();
  return links.filter((l): l is T => l !== null && (seen.has(l.href) ? false : (seen.add(l.href), true)));
};

/**
 * Närliggande orter på en tjänst × ort-sida: samma tjänst i grannorten om den sidan är indexerbar och inte ompekad, annars grannortens ortssida
 * (som är indexerbar om orten inte är avindexerad, vilket anroparen redan har filtrerat).
 */
export const nearbyComboLink = (
  serviceSlug: string,
  serviceName: string,
  n: { slug: string; name: string; isIsland: boolean; lat: number; lng: number },
): { href: string; label: string } => {
  const prep = n.isIsland ? "på" : "i";
  return isThinCombo(serviceSlug, n) || arOmpekad(`/${serviceSlug}-${n.slug}`)
    ? { href: `/taklaggare-${n.slug}`, label: `Takläggare ${prep} ${n.name}` }
    : { href: `/${serviceSlug}-${n.slug}`, label: `${serviceName} ${prep} ${n.name}` };
};
