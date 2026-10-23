/**
 * Navlänkar från ortssidor till de sidor som ska äga de mest efterfrågade sökorden (fynd ur GSC-analysen 2026-10-03):
 *  - "takbyte norrtälje", "byta tak norrtälje" och "takläggning norrtälje" landade på startsidan, eftersom
 *    /takbyte-norrtalje bara hade 4 inlänkar. Orter i Norra Roslagen, Roslagens inland, Kusten och Norra skärgården
 *    länkar dit.
 *  - "takrenovering täby" (210 visningar, position 30) hade 3 inlänkar till /takrenovering-taby. Orter i Norra Stockholm
 *    och på Rådmansöhalvön länkar dit.
 * Gren 176 (#5, F3): "Takrenovering i Stockholm" pekar på /takrenovering-stockholm (förut guiden /blogg/takrenovering-stockholm-guide); Stockholms egen sida har den bland sina vanliga länkar.
 * EN regel för React och statisk HTML. Bara relativa importer.
 */
import { locationIndex } from "./location-index";
import { locationsLight as locations } from "./locations-light";
import { comboLink } from "./combo-links";
import { ortPrep } from "./ort-prep";
import { hasServiceCombos } from "./service-slugs";

export interface HubLink {
  href: string;
  label: string;
  /** Kort beskrivning på regionsidans länkruta (gren 172). */
  description?: string;
}
interface Hub extends HubLink {
  /** Ortens slug: själva hubben får ingen länk till sig själv. */
  slug: string;
  /** Regioner vars ortssidor länkar till hubben. */
  regioner: string[];
  /** Enskilda ortssidor som länkar till hubben (grannarna, ur nearbyLocations), utöver regionerna. */
  orter?: string[];
}

const HUBS: Hub[] = [
  { slug: "norrtalje", href: "/takbyte-norrtalje", label: "Takbyte i Norrtälje", regioner: ["Norra Roslagen", "Roslagens inland", "Kusten", "Norra skärgården"] },
  // GSC 2026-10-03: "takomläggning norrtälje" 99 visningar på position 10,1 med bara 4 inlänkar till sidan
  { slug: "norrtalje", href: "/takomlaggning-norrtalje", label: "Takomläggning i Norrtälje", regioner: ["Norra Roslagen", "Roslagens inland", "Kusten", "Norra skärgården"] },
  // Gren 134 (Norrtälje först, seo-forslag-norrtalje-lankar-2026-10-20.md): /takrenovering-norrtalje hade 9 inlänkar och ingen från Norrtälje-områdets ortssidor; takbyte och takomläggning saknades på några av dem.
  { slug: "norrtalje", href: "/takrenovering-norrtalje", label: "Takrenovering i Norrtälje", regioner: [], orter: ["blido", "yxlan", "spillersboda", "radmanso", "bergshamra", "vaddo", "vato", "vaxholm", "rimbo", "herrang", "edsbro", "riala", "graddo", "kapellskar", "vallentuna", "loharad"] },
  { slug: "norrtalje", href: "/takbyte-norrtalje", label: "Takbyte i Norrtälje", regioner: [], orter: ["blido", "yxlan", "graddo", "kapellskar"] },
  { slug: "norrtalje", href: "/takomlaggning-norrtalje", label: "Takomläggning i Norrtälje", regioner: [], orter: ["blido", "yxlan", "graddo", "kapellskar"] },
  // Takbyte-sidor med visningar men bara en inlänk (GSC 2026-10-03): /takbyte-stockholm (66), /takbyte-jarfalla (18), /takbyte-huddinge (15), /takbyte-taby (26)
  // SEO-genomgången 2026-10-18 (T2): /takomlaggning-taby hade 9 inlänkar mot 33 för /takbyte-taby och /takrenovering-taby
  // SEO-genomgången Roslagen 2026-10-18 (RL1, RL2): tjänstesidorna för Vallentuna och Åkersberga hade 9 inlänkar vardera. Ortssidor som har orten som granne (nearbyLocations) länkar dit.
  { slug: "vallentuna", href: "/takbyte-vallentuna", label: "Takbyte i Vallentuna", regioner: [], orter: ["taby", "ella-gard", "skarpang", "ormsta", "lindholmen"] },
  { slug: "vallentuna", href: "/takrenovering-vallentuna", label: "Takrenovering i Vallentuna", regioner: [], orter: ["taby", "ella-gard", "skarpang", "ormsta", "lindholmen"] },
  { slug: "akersberga", href: "/takbyte-akersberga", label: "Takbyte i Åkersberga", regioner: [], orter: ["riala", "osterskar", "vallentuna", "taby", "ella-gard", "brevik", "ormsta"] },
  { slug: "akersberga", href: "/takrenovering-akersberga", label: "Takrenovering i Åkersberga", regioner: [], orter: ["riala", "osterskar", "vallentuna", "taby", "ella-gard", "brevik", "ormsta"] },
  // Svagast länkade ägarsidor (agarsidor-lankar-2026-10-07.md): /taklaggare-bro hade 5 indexerbara inlänkar, Stockholmsguiden 9.
  // Grannorter i Nordvästra Stockholm länkar till Bro, orter i Stockholmsregionerna till guiden. Länktexterna används redan på sajten.
  { slug: "bro", href: "/taklaggare-bro", label: "Takläggare i Bro", regioner: ["Nordvästra Stockholm"] },
  { slug: "stockholm", href: "/takrenovering-stockholm", label: "Takrenovering i Stockholm", regioner: ["Stockholms stad", "Södra Stockholm", "Västerort", "Östra Stockholm", "Norra Stockholm", "Nordvästra Stockholm", "Sydvästra Stockholm", "Sydöstra Stockholm"] },
];

/** Extra länkar på regionsidor (backlog 1cn): Kusten länkar till takomläggningssidan för Norrtälje. */
const REGION_EXTRA_STATISKA: Record<string, HubLink[]> = {
  Kusten: [{ href: "/takomlaggning-norrtalje", label: "Takomläggning i Norrtälje" }],
  // Svagast länkade ägarsidor: regionsidorna i Stockholm länkar till Stockholmsguiden, Nordvästra Stockholm även till Bro
  "Nordvästra Stockholm": [{ href: "/taklaggare-bro", label: "Takläggare i Bro" }, { href: "/takrenovering-stockholm", label: "Takrenovering i Stockholm" }],
  "Stockholms stad": [{ href: "/takrenovering-stockholm", label: "Takrenovering i Stockholm" }],
  "Södra Stockholm": [{ href: "/takrenovering-stockholm", label: "Takrenovering i Stockholm" }],
  Västerort: [{ href: "/takrenovering-stockholm", label: "Takrenovering i Stockholm" }],
  "Östra Stockholm": [{ href: "/takrenovering-stockholm", label: "Takrenovering i Stockholm" }],
  "Norra Stockholm": [{ href: "/takrenovering-stockholm", label: "Takrenovering i Stockholm" }],
  "Sydvästra Stockholm": [{ href: "/takrenovering-stockholm", label: "Takrenovering i Stockholm" }],
  "Sydöstra Stockholm": [{ href: "/takrenovering-stockholm", label: "Takrenovering i Stockholm" }],
};

/**
 * Gren 172 (#15, seo-analys-2026-10-21/3-ort-for-ort.md, vinst 4): kommunerna med lägst konkurrens (Sundbyberg, Botkyrka, Tumba, Nynäshamn, Ekerö, Upplands-Bro) länkas från sin regionsida
 * med sina indexerbara tjänst × ort-sidor, och Södra Stockholm, Nordvästra Stockholm och Västerort länkar till Stockholms ortssida med de befintliga orden "Takläggare i Stockholm".
 * Bara egna, indexerbara sidor (ingen länk via tjänstesida eller till en ompekad adress). Etiketterna är de vanliga ("Takbyte i Sundbyberg").
 */
const LAG_KONKURRENS = ["sundbyberg", "botkyrka", "tumba", "nynashamn", "ekero", "upplands-bro", "bro", "kungsangen"];
const STOCKHOLM_ORTSSIDA = ["Södra Stockholm", "Nordvästra Stockholm", "Västerort"];
const regionExtra = (): Record<string, HubLink[]> => {
  const ut: Record<string, HubLink[]> = Object.fromEntries(Object.entries(REGION_EXTRA_STATISKA).map(([r, l]) => [r, [...l]]));
  const lagg = (region: string, l: HubLink) => {
    const lista = (ut[region] ??= []);
    if (!lista.some((x) => x.href === l.href && x.label === l.label)) lista.push(l);
  };
  for (const r of STOCKHOLM_ORTSSIDA) lagg(r, { href: "/taklaggare-stockholm", label: "Takläggare i Stockholm", description: "Takläggare i Stockholms stad." });
  for (const slug of LAG_KONKURRENS) {
    const ort = locations.find((l) => l.slug === slug);
    if (!ort) continue;
    for (const [serviceSlug, serviceName] of KOMMUN_TJANSTER) {
      const l = comboLink({ serviceSlug, serviceName, locationSlug: ort.slug, prep: ortPrep(ort), locationName: ort.name });
      if (l && l.href === `/${serviceSlug}-${ort.slug}`) lagg(ort.region, { ...l, description: `${serviceName} ${ortPrep(ort)} ${ort.name}.` });
    }
  }
  return ut;
};

/** Länkar som bara gäller en enda ortssida (paket 73): Norrtälje-sidan länkar till guiden "Välja takfirma i Norrtälje" i länkrutan, med guidens egen titel. */
const ENSKILDA_LANKAR: Record<string, HubLink[]> = {
  norrtalje: [{ href: "/blogg/taklaggare-norrtalje-guide", label: "Välja takfirma i Norrtälje: sex frågor att ställa" }],
  // SEO-genomgången 2026-10-18 (U1): /taklaggare-uppsala hade 6 inlänkar. Uppsala länkar till Märsta och Sigtuna men de länkade inte tillbaka, och Enköping länkar hit men Uppsala inte dit.
  marsta: [{ href: "/taklaggare-uppsala", label: "Takläggare i Uppsala" }],
  sigtuna: [{ href: "/taklaggare-uppsala", label: "Takläggare i Uppsala" }],
  uppsala: [{ href: "/taklaggare-enkoping", label: "Takläggare i Enköping" }],
};

/**
 * Gren 188 (svaga-toppsidor-2026-10-22.md): ortssidorna i Norra Stockholm, Stockholms stad, Nordvästra Stockholm, Södra Stockholm och Västerort (de sista hade inga tjänst × ort-länkar alls) länkade till en grannkommuns tjänst × ort-sidor
 * (16 sidor i Sollentuna, Danderyd, Väsby och Sundbyberg till Täby, Södra Stockholm till Huddinge, Märsta och Rosersberg till Järfälla) och Stockholmssidorna bara till takbyte-stockholm.
 * Nu länkar sidan till den egna kommunens tre tjänstesidor (takbyte, takrenovering, takomläggning), med etiketten "<tjänst> i <kommun>". Är kommunens sida noindex går länken till tjänstens
 * egna indexerbara sida, och ompekade adresser visas inte (combo-links.ts, samma regel som övriga länkar). Kommunen är ortens parentLocation, annars raden "Kommun" i faktarutan.
 */
const KOMMUN_REGIONER = ["Norra Stockholm", "Stockholms stad", "Nordvästra Stockholm", "Södra Stockholm", "Västerort"];
/** Orter som varken har parentLocation eller kommunrad i faktarutan. */
/** Kommuner vars orter länkar till kommunens tjänstesidor oavsett region: Täbys orter ligger i Roslagens inland och hade förut inga länkar till Täbys tre sidor, som har många visningar (hub-länkarna i regionen gick till Norrtälje). */
const KOMMUN_ALLA_REGIONER = ["taby"];
const KOMMUN_FALLBACK: Record<string, string> = { bandhagen: "stockholm", hogdalen: "stockholm", hokarangen: "stockholm" };
const KOMMUN_TJANSTER: readonly (readonly [string, string])[] = [["takbyte", "Takbyte"], ["takrenovering", "Takrenovering"], ["takomlaggning", "Takomläggning"]];

const kommunSlug = (slug: string, region: string): string | undefined => {
  const l = locations.find((x) => x.slug === slug);
  if (!l) return undefined;
  // gren 197: Upplands-Bro-sidans tjänstesidor pekas om till /taklaggare-bro, så ortens kommunlänkar går till Bro, där takbytessidan har egen text
  if (l.parentLocation) return l.parentLocation.slug === "upplands-bro" ? "bro" : l.parentLocation.slug;
  const k = l.kommun ? locations.find((x) => x.name === l.kommun) : undefined; // förberäknat ur faktarutans rad "Kommun" (generate-location-split.ts)
  if (k) return k.slug;
  return KOMMUN_FALLBACK[slug] ?? (region === "Stockholms stad" || region === "Västerort" ? "stockholm" : undefined);
};

/** Den egna kommunens tre tjänstesidor för en ort i de fyra regionerna (och för Täbys orter) (tom för kommunens egen sida, vars länkar redan är de vanliga tjänst × ort-länkarna). */
export const kommunLankar = (slug: string): HubLink[] => {
  const loc = locations.find((l) => l.slug === slug);
  if (!loc) return [];
  const k = kommunSlug(slug, loc.region);
  if (!k || !(KOMMUN_REGIONER.includes(loc.region) || KOMMUN_ALLA_REGIONER.includes(k))) return [];
  const kommun = locations.find((x) => x.slug === k);
  if (!kommun || kommun.slug === slug) return [];
  return KOMMUN_TJANSTER.flatMap(([serviceSlug, serviceName]) => comboLink({ serviceSlug, serviceName, locationSlug: kommun.slug, prep: ortPrep(kommun), locationName: kommun.name }) ?? []);
};

/**
 * Gren 188b (Marknadschefens ja 2026-10-22 01:17): Norrtälje-hubbarna (takbyte, takomläggning, takrenovering i Norrtälje) ges till orter i regionerna runt Norrtälje, men också till
 * orter i andra kommuner (Täby, Vallentuna, Vaxholm). De raderna pekar nu om till den egna kommunens motsvarighet ("Takbyte i Täby"), och inget tas bort: en rad blir en rad. Är orten
 * själv kommunen har den redan raden bland sina vanliga tjänst × ort-länkar, så Norrtälje-raden utgår. Okänd kommun eller kommun utan tjänst × ort-sidor lämnar raden som den är.
 */
const NORRTALJE_TJANST = /^\/(takbyte|takomlaggning|takrenovering)-norrtalje$/;
const tillEgenKommun = (h: HubLink, slug: string, region: string): HubLink | null | undefined => {
  const t = h.href.match(NORRTALJE_TJANST);
  if (!t) return undefined;
  const k = kommunSlug(slug, region);
  if (!k || k === "norrtalje") return undefined;
  if (k === slug) return null;
  const kommun = locations.find((x) => x.slug === k);
  if (!kommun || !hasServiceCombos(kommun.region)) return undefined;
  const namn = { takbyte: "Takbyte", takomlaggning: "Takomläggning", takrenovering: "Takrenovering" }[t[1] as "takbyte"];
  return comboLink({ serviceSlug: t[1], serviceName: namn, locationSlug: kommun.slug, prep: ortPrep(kommun), locationName: kommun.name }) ?? undefined; // ompekad adress hos kommunen: raden står kvar som den är (inget tas bort)
};

/** Hubblänkarna för en ort (tom lista för hubbens egen sida och för orter utanför hubbens regioner), plus länkar som bara gäller den orten. */
export const hubLinksFor = (slug: string): HubLink[] => {
  const loc = locationIndex.find((l) => l.slug === slug) ?? locations.find((l) => l.slug === slug);
  if (!loc) return [];
  const hubbar = HUBS.filter((h) => h.slug !== slug && (h.regioner.includes(loc.region) || (h.orter ?? []).includes(slug))).flatMap(({ href, label }) => {
    const byt = tillEgenKommun({ href, label }, slug, loc.region);
    return byt === undefined ? [{ href, label }] : byt ? [byt] : [];
  });
  const alla = [...hubbar, ...kommunLankar(slug), ...(ENSKILDA_LANKAR[slug] ?? [])];
  return alla.filter((l, i) => alla.findIndex((x) => x.href === l.href && x.label === l.label) === i);
};

/** Extra länkar på regionsidor (backlog 1cn, gren 172). */
export const REGION_EXTRA_LINKS: Record<string, HubLink[]> = regionExtra();
