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
  regioner: string[];
}

const HUBS: Hub[] = [
  { slug: "norrtalje", href: "/takbyte-norrtalje", label: "Takbyte i Norrtälje", regioner: ["Norra Roslagen", "Roslagens inland", "Kusten", "Norra skärgården"] },
  // GSC 2026-10-03: "takomläggning norrtälje" 99 visningar på position 10,1 med bara 4 inlänkar till sidan
  { slug: "norrtalje", href: "/takomlaggning-norrtalje", label: "Takomläggning i Norrtälje", regioner: ["Norra Roslagen", "Roslagens inland", "Kusten", "Norra skärgården"] },
  { slug: "taby", href: "/takrenovering-taby", label: "Takrenovering i Täby", regioner: ["Norra Stockholm", "Rådmansöhalvön"] },
  // Takbyte-sidor med visningar men bara en inlänk (GSC 2026-10-03): /takbyte-stockholm (66), /takbyte-jarfalla (18), /takbyte-huddinge (15), /takbyte-taby (26)
  { slug: "taby", href: "/takbyte-taby", label: "Takbyte i Täby", regioner: ["Norra Stockholm", "Rådmansöhalvön"] },
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

/** Hubblänkarna för en ort (tom lista för hubbens egen sida och för orter utanför hubbens regioner). */
export const hubLinksFor = (slug: string): HubLink[] => {
  const loc = locationIndex.find((l) => l.slug === slug);
  if (!loc) return [];
  return HUBS.filter((h) => h.slug !== slug && h.regioner.includes(loc.region)).map(({ href, label }) => ({ href, label }));
};
