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
      "Behöver taket något annat än en tvätt går vi igenom det vid takkontrollen, och du bestämmer själv hur du vill gå vidare. Mer om de större åtgärderna finns på sidorna om [takrenovering](/tjanster/takrenovering) och [takomläggning](/tjanster/takomlaggning).",
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

/**
 * /tjanster/taktvatt sedan gren 165 (Marknadschefens ord 2026-10-21 22:08, Vidars svar på rad 9): ny text ur guidetexter/bc-underlag-tjanstesida-taktvatt.md.
 * De tre indexerade ortsidorna (Ljusterö, Norrtälje, Yxlan) behåller korttexten ovan, så TAKTVATT_TITLE/META/SECTIONS/FAQS är oförändrade.
 * Metod och taktyper (betongpannetak, plåttak, hetvatten) får stå; inga belopp, ingen garanti på tvätten, ingen lertegel, eternit, högtryck, AMA eller ROT.
 */
export const TAKTVATT_SIDA_TITLE = "Taktvätt av betongpannetak och plåttak – fast pris";
export const TAKTVATT_SIDA_META = "Taktvätt av betongpannetak och plåttak i Roslagen och Storstockholm, med hetvatten och vid behov medel. Kostnadsfri takkontroll och fast pris i offerten.";
export const TAKTVATT_SIDA_H1 = "Taktvätt";
export const TAKTVATT_SIDA_INTRO = "Taktvätt är en av de tjänster vi erbjuder. Vad som behöver göras på just ditt tak går inte att säga på avstånd. Därför börjar vi med en kostnadsfri takkontroll utan förpliktelser.";
export const TAKTVATT_SIDA_SECTIONS: TaktvattSection[] = [
  {
    "heading": "Vilka tak vi tvättar",
    "paragraphs": [
      "Vi tvättar betongpannetak och plåttak. Vet du inte vad ditt tak är lagt med ser vi det vid takkontrollen."
    ]
  },
  {
    "heading": "Så tvättar vi taket",
    "paragraphs": [
      "Taket tvättas med hetvatten. Ibland räcker det med enbart hetvatten, och ibland appliceras också ett medel. Vilket som passar ditt tak bedömer vi efter att ha sett det.",
      "Vad som ingår i tvätten beror på takets behov. Det går vi igenom vid takkontrollen, och det står i offerten. Tvätten utförs av oss själva eller med hjälp av kvalificerade underentreprenörer."
    ]
  },
  {
    "heading": "Vad kostar en taktvätt?",
    "paragraphs": [
      "Priset beror på taket, och det går inte att säga innan någon har tittat på det. Efter den kostnadsfria takkontrollen får du en offert med fast pris. Tillägg görs bara efter ditt godkännande."
    ]
  },
  {
    "heading": "När räcker det inte med tvätt?",
    "paragraphs": [
      "Behöver taket något annat än en tvätt går vi igenom det vid takkontrollen, och du bestämmer själv hur du vill gå vidare. Mer om de större åtgärderna finns på sidorna om [takrenovering](/tjanster/takrenovering) och [takomläggning](/tjanster/takomlaggning)."
    ]
  },
  {
    "heading": "Så går det till",
    "paragraphs": [
      "1. **Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
      "2. **Rapport och fast pris.** Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris. Tillägg görs bara efter ditt godkännande.",
      "3. **Tvätten.** Taket tvättas med hetvatten, med eller utan medel, enligt det som står i offerten.",
      "Vi är en takfirma med bas i Norrtälje och tar uppdrag i Roslagen och Storstockholm. Du har en kontaktperson genom hela processen. Takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19. Boka på [roslagstak.se/takkontroll](/takkontroll) eller ring 070-154 36 39. Vi svarar inom 24 timmar."
    ]
  }
];
export const TAKTVATT_SIDA_FAQS: { question: string; answer: string }[] = [
  {
    "question": "Vilka tak tvättar ni?",
    "answer": "Betongpannetak och plåttak."
  },
  {
    "question": "Hur tvättar ni?",
    "answer": "Med hetvatten, och vid behov appliceras också ett medel. Vad ditt tak behöver går vi igenom vid takkontrollen."
  },
  {
    "question": "Vad kostar en taktvätt?",
    "answer": "Priset beror på taket, och det går inte att säga innan någon har tittat på det. Efter den kostnadsfria takkontrollen får du en offert med fast pris. Tillägg görs bara efter ditt godkännande."
  },
  {
    "question": "Måste jag bestämma mig vid takkontrollen?",
    "answer": "Nej. Takkontrollen är kostnadsfri och utan förpliktelser. Du betalar inget och binder dig inte."
  }
];
