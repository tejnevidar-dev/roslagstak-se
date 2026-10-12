/**
 * Startsidans avsnitt "Var finns vi" (ServiceArea.tsx): texterna delas av komponenten (React) och av
 * scripts/prerender-content.ts (statisk HTML), så att besökaren och sökmotorn får samma ord (AC4). Ändra texten här, inte i komponenten.
 * Fetstil i SEO-texten är markerad med ** (renderas som <strong className="font-semibold"> i komponenten, tas bort i den statiska texten).
 */
export const HOME_AREA_INTRO = {
  eyebrow: "Var finns vi",
  headingA: "Från Roslagen till",
  headingB: "Storstockholm.",
};

/** Antalet områden sätts av komponenten (regionerna med orter). */
export const homeAreaIntroText = (antal: number) =>
  `Vi utför takbyte, takomläggning och takrenovering och tar uppdrag i ${antal} områden i Roslagen och Storstockholm. Vi tar också uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.`;

export const HOME_AREA_PANEL = {
  label: "Verksamhetsområde",
  unit: "områden",
  workflow: "Samma arbetssätt: kostnadsfri takkontroll och fast pris i offerten.",
  islandLead: "Hus på en ö?",
  islandText: "Vi tar uppdrag i skärgården. Förutsättningarna går vi igenom vid den kostnadsfria takkontrollen.",
  allLink: "Se alla orter vi arbetar i",
};

export const HOME_AREA_SEO_HEADING = "Takläggare i Roslagen";

export const HOME_AREA_SEO_PARAGRAPHS: string[] = [
  "Behöver du en **takläggare i Roslagen** eller [takläggare i Stockholm](/taklaggare-stockholm)? Vi är en takfirma med bas i Norrtälje och tar uppdrag i Roslagen och Storstockholm. Vi har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn.",
  "Vi tar uppdrag för **takbyte på öar i skärgården**, till exempel på Husarö och Ingmarsö, liksom Svartlöga, Söderöra, Norröra, Humlö och Gräskö. Högmarsö och Arholma tillhör också vårt verksamhetsområde, liksom Furusund, Rådmansö och Vätö.",
  "Längs kusten tar vi uppdrag i Spillersboda, Bergshamra och Svartnö. På Väddö och upp mot Singö, Grisslehamn och Arholma tar vi också uppdrag. I Vaxholm och Norrtälje tar vi uppdrag på villor, fritidshus och radhus.",
  "I Storstockholm tar vi uppdrag från [Solna](/takbyte-solna) och Danderyd i norr till Nacka och Södertälje i söder. Vi tar uppdrag i Stockholm stad och Södermalm, Östermalm, Kungsholmen och Vasastan; norrort i Solna, Sundbyberg, Danderyd, Sollentuna och Upplands Väsby; nordväst i Järfälla, Upplands-Bro och Sigtuna; västerort i Bromma, Hässelby, Vällingby och Spånga; österut på Lidingö, i Nacka och Värmdö; sydöst i Tyresö, Haninge, Vendelsö, Vega och Nynäshamn; söderut i Huddinge, Älvsjö, Enskede, Farsta, Skarpnäck och Skärholmen; samt sydväst på Ekerö och i Botkyrka, Salem och Södertälje.",
  "Oavsett om du söker [takbyte i Stockholm](/takbyte-stockholm), [takomläggning i Norrtälje](/takomlaggning-norrtalje), **takbyte i Roslagen** eller **takrenovering på Väddö**, kontakta oss för en kostnadsfri takkontroll. Har ditt hus ingen bilväg: berätta var det ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas. Vi svarar inom 24 timmar."
];

/** Samma text utan fetstilsmarkeringen och länksyntaxen ([text](/länk) blir text), för den statiska HTML:en. */
export const stripBold = (s: string) => s.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*\*/g, "");
/** Interna länkar i texten ([text](/länk)), för länklistan i den statiska HTML:en. */
export const homeAreaLinks = (): { href: string; label: string }[] =>
  HOME_AREA_SEO_PARAGRAPHS.flatMap((p) => [...p.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)].map((m) => ({ href: m[2], label: m[1] })));
