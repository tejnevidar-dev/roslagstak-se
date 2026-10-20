/**
 * Navlänkar från ortssidor till de sidor som ska äga de mest efterfrågade sökorden (fynd ur GSC-analysen 2026-10-03):
 *  - "takbyte norrtälje", "byta tak norrtälje" och "takläggning norrtälje" landade på startsidan, eftersom
 *    /takbyte-norrtalje bara hade 4 inlänkar. Orter i Norra Roslagen, Roslagens inland, Kusten och Norra skärgården
 *    länkar dit.
 *  - "takrenovering täby" (210 visningar, position 30) hade 3 inlänkar till /takrenovering-taby. Orter i Norra Stockholm
 *    och på Rådmansöhalvön länkar dit.
 * EN regel för React och statisk HTML. Bara relativa importer.
 */
import { locationIndex } from "./location-index";

export interface HubLink {
  href: string;
  label: string;
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
  { slug: "taby", href: "/takrenovering-taby", label: "Takrenovering i Täby", regioner: ["Norra Stockholm", "Rådmansöhalvön"] },
  // Takbyte-sidor med visningar men bara en inlänk (GSC 2026-10-03): /takbyte-stockholm (66), /takbyte-jarfalla (18), /takbyte-huddinge (15), /takbyte-taby (26)
  { slug: "taby", href: "/takbyte-taby", label: "Takbyte i Täby", regioner: ["Norra Stockholm", "Rådmansöhalvön"] },
  // SEO-genomgången 2026-10-18 (T2): /takomlaggning-taby hade 9 inlänkar mot 33 för /takbyte-taby och /takrenovering-taby
  { slug: "taby", href: "/takomlaggning-taby", label: "Takomläggning i Täby", regioner: ["Norra Stockholm", "Rådmansöhalvön"] },
  // SEO-genomgången Roslagen 2026-10-18 (RL1, RL2): tjänstesidorna för Vallentuna och Åkersberga hade 9 inlänkar vardera. Ortssidor som har orten som granne (nearbyLocations) länkar dit.
  { slug: "vallentuna", href: "/takbyte-vallentuna", label: "Takbyte i Vallentuna", regioner: [], orter: ["taby", "ella-gard", "skarpang", "ormsta", "lindholmen"] },
  { slug: "vallentuna", href: "/takrenovering-vallentuna", label: "Takrenovering i Vallentuna", regioner: [], orter: ["taby", "ella-gard", "skarpang", "ormsta", "lindholmen"] },
  { slug: "akersberga", href: "/takbyte-akersberga", label: "Takbyte i Åkersberga", regioner: [], orter: ["riala", "osterskar", "vallentuna", "taby", "ella-gard", "brevik", "ormsta"] },
  { slug: "akersberga", href: "/takrenovering-akersberga", label: "Takrenovering i Åkersberga", regioner: [], orter: ["riala", "osterskar", "vallentuna", "taby", "ella-gard", "brevik", "ormsta"] },
  { slug: "stockholm", href: "/takbyte-stockholm", label: "Takbyte i Stockholm", regioner: ["Stockholms stad"] },
  { slug: "jarfalla", href: "/takbyte-jarfalla", label: "Takbyte i Järfälla", regioner: ["Nordvästra Stockholm"] },
  { slug: "huddinge", href: "/takbyte-huddinge", label: "Takbyte i Huddinge", regioner: ["Södra Stockholm"] },
  // Svagast länkade ägarsidor (agarsidor-lankar-2026-10-07.md): /taklaggare-bro hade 5 indexerbara inlänkar, Stockholmsguiden 9.
  // Grannorter i Nordvästra Stockholm länkar till Bro, orter i Stockholmsregionerna till guiden. Länktexterna används redan på sajten.
  { slug: "bro", href: "/taklaggare-bro", label: "Takläggare i Bro", regioner: ["Nordvästra Stockholm"] },
  { slug: "", href: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm", regioner: ["Stockholms stad", "Södra Stockholm", "Västerort", "Östra Stockholm", "Norra Stockholm", "Nordvästra Stockholm", "Sydvästra Stockholm", "Sydöstra Stockholm"] },
];

/** Extra länkar på regionsidor (backlog 1cn): Kusten länkar till takomläggningssidan för Norrtälje. */
export const REGION_EXTRA_LINKS: Record<string, HubLink[]> = {
  Kusten: [{ href: "/takomlaggning-norrtalje", label: "Takomläggning i Norrtälje" }],
  // Svagast länkade ägarsidor: regionsidorna i Stockholm länkar till Stockholmsguiden, Nordvästra Stockholm även till Bro
  "Nordvästra Stockholm": [{ href: "/taklaggare-bro", label: "Takläggare i Bro" }, { href: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm" }],
  "Stockholms stad": [{ href: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm" }],
  "Södra Stockholm": [{ href: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm" }],
  Västerort: [{ href: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm" }],
  "Östra Stockholm": [{ href: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm" }],
  "Norra Stockholm": [{ href: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm" }],
  "Sydvästra Stockholm": [{ href: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm" }],
  "Sydöstra Stockholm": [{ href: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm" }],
};

/** Länkar som bara gäller en enda ortssida (paket 73): Norrtälje-sidan länkar till guiden "Välja takfirma i Norrtälje" i länkrutan, med guidens egen titel. */
const ENSKILDA_LANKAR: Record<string, HubLink[]> = {
  norrtalje: [{ href: "/blogg/taklaggare-norrtalje-guide", label: "Välja takfirma i Norrtälje: sex frågor att ställa" }],
  // SEO-genomgången 2026-10-18 (U1): /taklaggare-uppsala hade 6 inlänkar. Uppsala länkar till Märsta och Sigtuna men de länkade inte tillbaka, och Enköping länkar hit men Uppsala inte dit.
  marsta: [{ href: "/taklaggare-uppsala", label: "Takläggare i Uppsala" }],
  sigtuna: [{ href: "/taklaggare-uppsala", label: "Takläggare i Uppsala" }],
  uppsala: [{ href: "/taklaggare-enkoping", label: "Takläggare i Enköping" }],
};

/** Hubblänkarna för en ort (tom lista för hubbens egen sida och för orter utanför hubbens regioner), plus länkar som bara gäller den orten. */
export const hubLinksFor = (slug: string): HubLink[] => {
  const loc = locationIndex.find((l) => l.slug === slug);
  if (!loc) return [];
  return [...HUBS.filter((h) => h.slug !== slug && (h.regioner.includes(loc.region) || (h.orter ?? []).includes(slug))).map(({ href, label }) => ({ href, label })), ...(ENSKILDA_LANKAR[slug] ?? [])];
};
