/**
 * Texten på /tjanster/taktvatt och på de tre indexerade taktvätt × ort-sidorna (Ljusterö, Norrtälje, Yxlan).
 * Ersätter den gamla handskrivna sidan tills Vidar har svarat på 10i. Ordagrant ur
 * ledning/marknad/innehall/underlag-taktvatt-ersattning-2026-10-05.md (Grind: godkänd av Marknadschefen 2026-10-04 natt).
 * Bara påståenden ur tillåtna-listan: V1, K1–K3, P1, P2, S1, T1, U1, B1, B2. Inga belopp, ingen metod, ingen garanti.
 * Delas av React-sidan, den statiska HTML:en och combo-overrides.ts. Bara relativa importer.
 */
export const TAKTVATT_TITLE = "Taktvätt – kostnadsfri takkontroll och fast pris";
export const TAKTVATT_META =
  "Taktvätt: vi börjar med en kostnadsfri takkontroll utan förpliktelser. Du får en rapport om takets skick och fast pris i offerten. Svar inom 24 timmar.";
export const TAKTVATT_H1 = "Taktvätt";

export const TAKTVATT_INTRO =
  "Taktvätt är en av de tjänster vi erbjuder. Vad som behöver göras på just ditt tak går inte att säga på avstånd. Därför börjar vi med en kostnadsfri takkontroll utan förpliktelser.";

export interface TaktvattSection {
  heading: string;
  /** Stycken; [text](/länk) renderas av inline-md. */
  paragraphs: string[];
}

export const TAKTVATT_SECTIONS: TaktvattSection[] = [
  {
    heading: "Så går det till",
    paragraphs: [
      "En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
      "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris, kostnadsfritt och utan förpliktelser. Tillägg görs bara efter ditt godkännande.",
      "Visar takkontrollen att taket behöver något annat än en tvätt står det i rapporten, och du bestämmer själv hur du vill gå vidare. Mer om de större åtgärderna finns på sidorna om [takrenovering](/tjanster/takrenovering) och [takomläggning](/tjanster/takomlaggning).",
    ],
  },
  {
    heading: "Vilka vi är",
    paragraphs: ["Vi är en takfirma med bas i Norrtälje och tar uppdrag i Roslagen och Storstockholm. Du har en kontaktperson genom hela processen."],
  },
  {
    heading: "Boka",
    paragraphs: [
      "Takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19. Boka på [roslagstak.se/takkontroll](/takkontroll) eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
    ],
  },
];

export const TAKTVATT_FAQS: { question: string; answer: string }[] = [
  {
    question: "Vad kostar en taktvätt?",
    answer:
      "Priset beror på taket, och det går inte att säga innan någon har tittat på det. Efter den kostnadsfria takkontrollen får du en offert med fast pris. Tillägg görs bara efter ditt godkännande.",
  },
  {
    question: "Måste jag bestämma mig vid takkontrollen?",
    answer: "Nej. Takkontrollen är kostnadsfri och utan förpliktelser. Du betalar inget och binder dig inte.",
  },
  {
    question: "Hur bokar jag?",
    answer: "Fyll i formuläret eller ring 070-154 36 39. Vi svarar inom 24 timmar. Takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19.",
  },
];

/** Titel för en taktvätt × ort-sida (de tre indexerade). */
export const taktvattComboTitle = (prep: string, locationName: string) => `Taktvätt ${prep} ${locationName} – kostnadsfri takkontroll och fast pris`;

/** Brödtexten som combo-override-innehåll: "## Rubrik" och stycken, samma form som övriga briefimporter. */
export const TAKTVATT_COMBO_CONTENT: string[] = [
  TAKTVATT_INTRO,
  ...TAKTVATT_SECTIONS.flatMap((s) => [`## ${s.heading}`, ...s.paragraphs]),
];
