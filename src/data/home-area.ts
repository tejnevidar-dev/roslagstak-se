/**
 * Startsidans avsnitt "Vart finns vi" (ServiceArea.tsx): texterna delas av komponenten (React) och av
 * scripts/prerender-content.ts (statisk HTML), så att besökaren och sökmotorn får samma ord (AC4). Ändra texten här, inte i komponenten.
 * Fetstil i SEO-texten är markerad med ** (renderas som <strong className="font-semibold"> i komponenten, tas bort i den statiska texten).
 */
export const HOME_AREA_INTRO = {
  eyebrow: "Vart finns vi",
  headingA: "Från Stockholms innerstad till",
  headingB: "ytterskärgårdens öar.",
};

/** Antalet områden sätts av komponenten (regionerna med orter). */
export const homeAreaIntroText = (antal: number) =>
  `Vi utför takbyte, takrenovering och plåtarbeten i ${antal} områden i Roslagen och hela Storstockholm. Vi tar också uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.`;

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
  "Behöver du en **takläggare i Roslagen** eller **takläggare i Stockholm**? RoslagsTak utför alla typer av takarbeten — från** takbyte på Blidö** och **takrenovering på Ljusterö** till** takomläggning i Norrtälje** och **plåttak på Yxlan**. Vi tar också uppdrag på **öar i norra skärgården**.",
  "Vi tar uppdrag för **takbyte på öar i skärgården**, till exempel på Husarö, Finnhamn och Ingmarsö, liksom Svartlöga, Söderöra, Norröra, Humlö och Gräskö. Högmarsö och Arholma tillhör också vårt verksamhetsområde, liksom Furusund, Rådmansö och Vätö.",
  "Längs kusten arbetar vi i Spillersboda, Bergshamra och Svartnö. På Väddö och upp mot Singö, Grisslehamn och Arholma tar vi också uppdrag. I Vaxholm och Norrtälje tar vi uppdrag på villor, fritidshus och radhus.",
  "I **hela Storstockholm** — från **takbyte i Solna** och **bandtäckning i Danderyd** till** takrenovering i Nacka** och **plåttak i Bromma** — är vi din takläggare. Vi arbetar i Stockholm stad och Södermalm, Östermalm, Kungsholmen och Vasastan; norrort i Solna, Sundbyberg, Danderyd, Sollentuna och Upplands Väsby; nordväst i Järfälla, Upplands-Bro och Sigtuna; västerort i Bromma, Hässelby, Vällingby och Spånga; österut på Lidingö, i Nacka och Värmdö; sydöst i Tyresö, Haninge, Vendelsö, Vega och Nynäshamn; söderut i Huddinge, Älvsjö, Enskede, Farsta, Skarpnäck och Skärholmen; samt sydväst på Ekerö och i Botkyrka, Salem och Södertälje.",
  "Oavsett om du söker **takbyte i Stockholm**, **takbyte i Roslagen**, behöver en **takläggare på en ö utan bro** eller vill ha en **takrenovering på Väddö** — kontakta oss för en kostnadsfri takkontroll. Vi återkopplar inom 24 timmar."
];

/** Samma text utan fetstilsmarkeringen, för den statiska HTML:en. */
export const stripBold = (s: string) => s.replace(/\*\*/g, "");
