import { locations } from "./locations";
import { COMBO_LINK_LABEL, COMBO_SERVICE_PAGE, MATERIAL_OWN_PAGE } from "./service-location-combos";
import { isThinCombo } from "./thin-combos";
import { arOmpekad } from "./ompekade";
import { allServiceSlugs } from "./service-slugs";

/**
 * H2 (Marknadschefens natt 2026-10-21, analysen seo-analys-2026-10-21/2-live-kontroll.md), rättad efter grinden 23:22: indexerbara sidor länkar inte till noindex-sidor, men inget synligt
 * innehåll tas bort. Varje rad behåller sin etikett ("Takrenovering i Täby"); en tjänst × ort-sida som är noindex (thin-combos.ts) får i stället tjänstens egen indexerbara sida som mål,
 * så att flera rader kan peka på samma tjänstesida. Ompekade (301) adresser visas inte alls, som förut. Takmålning har ingen indexerbar tjänstesida och behåller sitt nuvarande mål
 * (väntar på Vidar). Material har sedan tidigare sin egen sida (MATERIAL_OWN_PAGE). EN regel för React och statisk HTML (delas av LocationPage.tsx, ServiceLocationPage.tsx och
 * scripts/prerender-content.ts). Bara relativa importer.
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

/**
 * Länken till en tjänst × ort-sida med sin vanliga etikett: sidan själv om den är indexerbar, tjänstens egen sida om sidan är noindex och tjänsten har en indexerbar sida,
 * annars sidan själv (takmålning). null bara för ompekade (301) adresser.
 */
export const comboLink = (c: ComboRef): { href: string; label: string } | null => {
  const own = MATERIAL_OWN_PAGE[c.serviceSlug];
  if (own) return { href: own.to, label: own.label };
  const url = `/${c.serviceSlug}-${c.locationSlug}`;
  if (arOmpekad(url)) return null;
  const label = COMBO_LINK_LABEL[url] ?? `${c.serviceName} ${c.prep} ${c.locationName}`;
  const loc = locations.find((l) => l.slug === c.locationSlug);
  const agare = TJANST_AGARSIDA[c.serviceSlug];
  if (agare && (!loc || isThinCombo(c.serviceSlug, loc))) return { href: agare.to, label };
  return { href: url, label };
};

/** Målet för en länk som en sida har i sin egen länklista (combo-overrides.ts): tjänstesidan om länken pekar på en noindex-kombination med indexerbar tjänstesida, annars oförändrat. null för ompekade adresser. */
export const overrideLankMal = (url: string): string | null => {
  if (arOmpekad(url)) return null;
  const m = [...allServiceSlugs].sort((a, b) => b.length - a.length).find((s) => url.startsWith(`/${s}-`));
  if (!m || !TJANST_AGARSIDA[m]) return url;
  const loc = locations.find((l) => l.slug === url.slice(m.length + 2));
  return loc && isThinCombo(m, loc) ? TJANST_AGARSIDA[m].to : url;
};

/** Länkarna som tas bort om de pekar på en ompekad adress (som förut) och annars får tjänstesidan som mål; etiketten är oförändrad. */
export const mapOverrideLinks = <T extends { to: string }>(links: readonly T[]): T[] =>
  links.flatMap((l) => {
    const mal = overrideLankMal(l.to);
    return mal === null ? [] : [{ ...l, to: mal }];
  });

/**
 * Närliggande orter på en tjänst × ort-sida: samma tjänst i grannorten med sin vanliga etikett. Är grannortens sida noindex pekar länken på tjänstens egen indexerbara sida
 * (etiketten är oförändrad), och takmålning behåller sin adress. Ompekade grannar filtreras av anroparen, som förut.
 */
export const nearbyComboLink = (
  serviceSlug: string,
  serviceName: string,
  n: { slug: string; name: string; isIsland: boolean; lat: number; lng: number },
): { href: string; label: string } => {
  const prep = n.isIsland ? "på" : "i";
  const label = `${serviceName} ${prep} ${n.name}`;
  const agare = TJANST_AGARSIDA[serviceSlug];
  return agare && isThinCombo(serviceSlug, n) ? { href: agare.to, label } : { href: `/${serviceSlug}-${n.slug}`, label };
};
