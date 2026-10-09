/**
 * Tjänstesidornas text (/tjanster/<slug>), enda källan för React (src/pages/ServiceDetail.tsx) OCH
 * den statiska HTML:en (scripts/prerender-content.ts). Fas 2.50 P0 (Marknadschefen 2026-10-03):
 * speglingen ska vara lika fullständig som den synliga sidan. Bara relativa importer (esbuild-bundlad
 * utan "@"-alias). Parity mot den renderade sidan testas i src/test/service-page-parity.test.ts.
 */
import { ROT_FORBEHALL, STALLNING_MENING, belopp, beloppLopande, withRotForbehall } from "./prices";
import { GARANTI_ETERNIT, GARANTI_RENOVERING, GARANTI_RENOVERING_CHIP, GARANTI_UTFORANDE, NO_GARANTI_SERVICE_SLUGS, NO_TATSKIKT_CHIP_SERVICE_SLUGS, NO_TATSKIKT_SERVICE_SLUGS, RENOVERING_SERVICE_SLUGS } from "./guarantee";
import { TAKSAKERHET_SLUG, taksakerhetDetails, taksakerhetMeta } from "./service-taksakerhet";
import { serviceExtra } from "./service-extra-sections";
import { serviceBlocks, type SpecificBlock } from "./service-blocks";
import { serviceAreaLinks } from "./service-area-links";
import { eternitFaqs, eternitLocal, eternitSections, ETERNIT_FAQ_HEADING } from "./eternit-content";
import { SERVICE_EXTRAS, type ExtraItem } from "./page-extras";
import { stripInlineMd } from "../lib/inline-md";
import { canonicalPath } from "../lib/canonical";
import { buildBody, type BodyItem } from "../lib/body-items";
import { LOCAL_BUSINESS_ID, SITE_URL, buildBreadcrumbNode } from "../lib/schema-graph";

export type ServiceMeta = {
  /** Tecken direkt efter tjänstens namn i H1, t.ex. ":" (H1 = namn + h1Sep + blanksteg + accentLine). */
  h1Sep?: string;
  accentLine: string;
  specs: { k: string; v: string }[];
  specHeading: string;
  lead: string;
  craftLine: string;
  photoNote: string;
};

export const serviceMeta: Record<string, ServiceMeta> = {
  takomlaggning: {
    accentLine: "",
    specs: [
      { k: "Tätskikt", v: "30 års garanti via MATAKI, på tillverkarens villkor" },
      { k: "Utförande", v: "AMA-standard" },
    ],
    specHeading: "Teknisk specifikation och utförande",
    lead: "Varje omläggning börjar med en kostnadsfri takkontroll.",
    craftLine: "Rätt underlag, rätt beslag, rätt ventilation — det är där ett tak avgörs.",
    photoNote: "Ny läkt.",
  },
  takrenovering: {
    accentLine: "utan helt takbyte.",
    specs: [
      { k: "Åtgärd", v: "Punktinsats" },
      { k: "Underlag", v: "Papp och råspont" },
      { k: "Pris", v: "Fast efter takkontroll" },
    ],
    specHeading: "Vad vi åtgärdar — och vad vi låter vara",
    lead: "Renovering handlar om att byta det som är skadat: underlagspapp, skadad råspont och trasiga pannor.",
    craftLine: "Vi byter det som behöver bytas.",
    photoNote: "Tak med underlagspapp.",
  },
  takavvattning: {
    accentLine: "rännor och stuprör.",
    specs: [
      { k: "Material", v: "Lackerad plåt" },
      { k: "Ränndalar", v: "I plåt" },
      { k: "Takkontroll", v: "Kostnadsfri" },
    ],
    specHeading: "Montage av avvattning",
    lead: "Hängrännor och stuprör leder bort vattnet från taket.",
    craftLine: "Hängrännor, stuprör och fotplåt hör ihop med taket.",
    photoNote: "",
  },
  takkupor: {
    accentLine: "med kostnadsfri takkontroll.",
    specs: [{ k: "Takkontroll", v: "Kostnadsfri" }],
    specHeading: "Takkupor och takfönster",
    lead: "Takkupor och takfönster hör till de tjänster vi erbjuder.",
    craftLine: "Runt kupor och genomföringar avgörs om taket håller tätt.",
    photoNote: "",
  },
  takinspektion: {
    accentLine: "utan förpliktelser.",
    specs: [
      { k: "Pris", v: "Kostnadsfri" },
      { k: "Tid på plats", v: "Ca 1–2 timmar" },
    ],
    specHeading: "Så går en takkontroll till",
    lead: "En av våra säljare tittar på taket på plats.",
    craftLine: "Det som avgör takets skick ligger under pannorna.",
    photoNote: "Tak med nylagd råspont.",
  },
  platarbeten: {
    accentLine: "beslag och bandtäckning.",
    specs: [
      { k: "Material", v: "Lackerad stålplåt" },
      { k: "Teknik", v: "Falsat och profilerat" },
      { k: "Detaljer", v: "Skorsten och genomföring" },
    ],
    specHeading: "Plåtdetaljer: material och utförande",
    lead: "Plåtdetaljerna anpassas efter taket.",
    craftLine: "Det är i plåtdetaljerna ett tak hålls tätt.",
    photoNote: "",
  },
  takvard: {
    accentLine: "med kostnadsfri takkontroll.",
    specs: [
      { k: "Takkontroll", v: "Kostnadsfri" },
      { k: "Pris", v: "Fast i offerten" },
      { k: "Svar", v: "Inom 24 timmar" },
    ],
    specHeading: "Så går det till",
    lead: "Vi börjar med en kostnadsfri takkontroll utan förpliktelser.",
    craftLine: "En av våra säljare tittar på taket på plats.",
    photoNote: "Tak med mörka pannor.",
  },
  "eternit-asbest": {
    h1Sep: ":",
    accentLine: "saneringen görs av en firma med tillstånd",
    specs: [
      { k: "Sanering", v: "Görs av en firma med tillstånd från Arbetsmiljöverket" },
      { k: "Takkontroll", v: "Kostnadsfri" },
    ],
    specHeading: "Vem gör vad?",
    lead: "Vi river inte asbest och har inget tillstånd för det. Vi samordnar med en behörig saneringsfirma, som river det gamla taket. Vi lägger det nya.",
    craftLine: "Borra, såga, slipa eller bryt inte i skivorna själv, och gå inte upp på taket.",
    photoNote: "",
  },
  tegeltak: {
    accentLine: "nytt tak med fast pris.",
    specs: [
      { k: "Material", v: "Lertegel" },
      { k: "Livslängd", v: "Enligt tillverkaren" },
      { k: "Pris", v: belopp("Lertegeltak") },
    ],
    specHeading: "Lertegel jämfört med andra taktyper",
    lead: "Lertegel är det klassiska valet som passar både äldre och nyare hus.",
    craftLine: "Lertegel åldras med patina i stället för att se slitet ut.",
    photoNote: "Lertegel.",
  },
};



export const serviceDetails: Record<string, { longDesc: string; benefits: string[]; process: string[]; priceRange?: string }> = {
  takomlaggning: {
    longDesc: "En takomläggning innebär att hela det befintliga takmaterialet rivs och ersätts med nytt. Skadad råspont syns först när det gamla taket är rivet. Då får du besked och pris innan vi går vidare. Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen. Allt arbete utförs enligt AMA. Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor.",
    priceRange: `Riktpris, efter ROT-avdrag och inkl. moms: TP20-plåt och betongpannor ${beloppLopande("TP20 plåttak")}, lertegel och pannplåt ${beloppLopande("Lertegeltak")}, dubbelfalsat ${beloppLopande("Dubbelfalsat plåttak")}. Exakt pris beror på takets storlek, material och underlag.`,
    benefits: [
      "Rivning av befintligt yttertak",
      "Nytt underlagspapp, fotplåtar och underbeslag runt genomföringar",
      "Ny läkt och nya plåtdetaljer",
      "Byggställning",
    ],
    process: [
      "Kostnadsfri takkontroll",
      "Offert godkänns av kund",
      "Byggställning monteras",
      "Rivning av befintligt yttertak",
      "Montering av nytt takmaterial",
      "Taksäkerhet och hängrännor, om de ingår i offerten",
      "Slutgenomgång",
      "Ställningen tas ner",
    ],
  },
  takrenovering: {
    longDesc: "En takrenovering innebär att vi åtgärdar problem på ditt befintliga tak utan att byta hela takmaterialet. Det kan handla om att byta enstaka trasiga pannor, laga läckor, byta underlagspapp på en del av taket, reparera plåtbeslag eller byta skadad råspont.",
    priceRange: "Fast pris efter kostnadsfri takkontroll, beroende på skadans omfattning. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
    benefits: [
      "Fast pris efter kostnadsfri takkontroll",
      "Lagning av läckor",
      "Byte av enstaka pannor eller plåtsektioner",
      "Byte av skadad råspont",
    ],
    process: [
      "Kostnadsfri takkontroll",
      "Offert med fast pris",
      "Byte av skadad råspont",
      "Byte av trasiga pannor/plåtsektioner",
      "Lagning av det som står i offerten",
      "Slutgenomgång",
    ],
  },
  takavvattning: {
    longDesc: "Hängrännor och stuprör leder bort vattnet från taket. Vi installerar och byter hängrännor, stuprör, ränndalar och plåtbeslag i lackerad plåt. Hur hängrännor och stuprör läggs upp på ditt hus går vi igenom vid takkontrollen.",
    priceRange: `Riktpris, efter ROT-avdrag och inkl. moms: komplett system med stuprör ${beloppLopande("Takavvattning (hängrännor)")}, beroende på husets storlek och våningar. Priset gäller när arbetet görs i samband med ett takbyte. Som eget arbete sätts priset efter takkontrollen. ${ROT_FORBEHALL}`,
    benefits: [
      "Hängrännor och stuprör i lackerad plåt",
      "Ränndalar och fotplåt",
      "Byte av befintligt system",
    ],
    process: [
      "Takkontroll av befintligt system",
      "Demontering av gammalt system",
      "Montering av nya hängrännor",
      "Installation av stuprör och anslutningar",
      "Slutgenomgång",
    ],
  },
  takkupor: {
    longDesc: "Takkupor och takfönster hör till de tjänster vi erbjuder. Vad som går att göra på just ditt tak går inte att säga på avstånd. Därför börjar vi med en kostnadsfri takkontroll utan förpliktelser.",
    priceRange: "Fast pris i offerten efter kostnadsfri takkontroll.",
    benefits: [
      "Kostnadsfri takkontroll utan förpliktelser",
      "Offert med fast pris",
      "Tillägg bara efter ditt godkännande",
    ],
    process: [
      "Kostnadsfri takkontroll: en av våra säljare tittar på taket på plats",
      "Rapport om takets skick och offert med fast pris",
      "Tillägg bara efter ditt godkännande",
    ],
  },
  takinspektion: {
    longDesc: "En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris – kostnadsfritt och utan förpliktelser.",
    priceRange: "Takkontrollen är kostnadsfri och utan förpliktelser.",
    benefits: [
      "Kostnadsfri och utan förpliktelser",
      "En av våra säljare tittar på taket på plats",
      "Rapport om takets skick",
      "Fast pris i offerten om något behöver åtgärdas",
    ],
    process: [
      "Boka takkontroll (telefon eller formulär)",
      "Vi tittar på taket på plats, ungefär 1–2 timmar",
      "Du får en rapport om takets skick",
      "Behöver taket åtgärdas får du en offert med fast pris",
    ],
  },
  platarbeten: {
    longDesc: "Vi lägger plåttak och gör plåtdetaljer: beslag runt skorstenar, genomföringar och ränndalar.",
    priceRange: `Riktpris, efter ROT-avdrag och inkl. moms: taktäckning med plåt ${beloppLopande("TP20 plåttak")} (TP20) till ${beloppLopande("Dubbelfalsat plåttak")} (dubbelfalsat). Beslag och detaljer prissätts efter omfattning i offerten.`,
    benefits: [
      "En kontaktperson hela vägen, från takkontroll till färdigt tak",
      "Taktäckning med TP20, pannplåt eller dubbelfalsad plåt",
      "Ränndalar och vindskiveplåt",
    ],
    process: [
      "Takkontroll",
      "Material och kulör bestäms",
      "Plåtdetaljerna monteras",
      "Slutgenomgång",
    ],
  },
  takvard: {
    longDesc: "Taktvätt är en av de tjänster vi erbjuder. Vad som behöver göras på just ditt tak går inte att säga på avstånd. Därför börjar vi med en kostnadsfri takkontroll utan förpliktelser. Takmålning är en av de tjänster vi erbjuder. Om taket går att måla, och vad som behöver göras först, går inte att säga på avstånd. Därför börjar vi med en kostnadsfri takkontroll utan förpliktelser, där en av våra säljare tittar på taket på plats.",
    priceRange: "Fast pris i offerten efter kostnadsfri takkontroll.",
    benefits: [
      "Kostnadsfri takkontroll utan förpliktelser",
      "Offert med fast pris",
      "Tillägg bara efter ditt godkännande",
    ],
    process: [
      "Kostnadsfri takkontroll: en av våra säljare tittar på taket på plats",
      "Rapport om takets skick och offert med fast pris",
      "Tillägg bara efter ditt godkännande",
    ],
  },
  "eternit-asbest": {
    longDesc:
      "Saneringsfirman: river det gamla taket och tar hand om materialet. Vi: takkontrollen, offerten på det nya taket, samordningen med saneringsfirman och det nya taket.",
    priceRange:
      "Hur saneringen prissätts, och vem du får fakturan från, framgår av offerten. Vårt fasta pris gäller det som står i vår offert. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar.",
    benefits: [
      "Kostnadsfri takkontroll utan förpliktelser",
      "Rapport och offert med fast pris för det nya taket",
      "Samordning med saneringsfirman, som river det gamla taket",
      "Vi lägger det nya taket, enligt AMA",
    ],
    process: [
      "Boka en kostnadsfri takkontroll utan förpliktelser: säg till när du bokar att taket är av eternit. En av våra säljare tittar på taket på plats, ungefär 1–2 timmar.",
      "Rapport och offert: efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris för det nya taket.",
      "Saneringsfirman river det gamla taket och tar hand om materialet.",
      "Vi lägger det nya taket, enligt AMA.",
    ],
  },
  tegeltak: {
    longDesc: "Vi lägger tegeltak i lertegel — det klassiska materialvalet som passar både äldre och nyare hus, med ett uttryck som många vill behålla. Materialet åldras med patina i stället för att se slitet ut, och enskilda pannor som spricker kan bytas utan att hela taket behöver göras om. Pannorna är tunga. Takstolarna behöver klara vikten, och tillverkaren anger vilken lutning pannan kräver. Lertegel är något annat än pannplåt (plåt som är pressad för att likna pannor), som vi också lägger. De är olika material med olika pris och vikt.",
    priceRange: `Riktpris, efter ROT-avdrag och inkl. moms: lertegel och pannplåt ${beloppLopande("Lertegeltak")}. Exakt pris beror på takets storlek, lutning och underlagets skick. ${STALLNING_MENING} Ditt pris står i offerten och är fast.`,
    benefits: [
      "Rivning av befintligt tak",
      "Nytt underlag och ny läkt",
      "Lertegel",
      "Plåtdetaljer kring skorsten och genomföringar",
      "Fast pris efter kostnadsfri takkontroll",
      "Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor.",
    ],
    process: [
      "Kostnadsfri takkontroll",
      "Offert med fast pris",
      "Rivning av befintligt tak",
      "Nytt underlag och ny läkt",
      "Montering av lertegel samt plåtbeslag kring skorsten och genomföringar",
      "Taksäkerhet och hängrännor, om de ingår i offerten",
      "Slutgenomgång",
    ],
  },
};


/* ---------------------------------------------------------------------------------------------
 * Text som tidigare låg hårdkodad i ServiceDetail.tsx. React och den statiska HTML:en läser samma
 * strängar härifrån; paritetstestet (src/test/service-page-parity.test.ts) renderar sidan och
 * jämför mot speglingen i båda riktningarna.
 * ------------------------------------------------------------------------------------------- */
const CAPTION_OWN_JOB_SLUGS: readonly string[] = ["takomlaggning"];

export const SERVICE_COPY = {
  heroEyebrow: "Tjänstebeskrivning / Roslagen",
  takkontrollLink: "Boka kostnadsfri takkontroll",
  chipUtforande: "10 års utförandegaranti",
  chipTatskikt: "30 års tätskiktsgaranti via MATAKI",
  chipFastPris: "Fast pris",
  chipSvar: "Svar inom 24 h",
  offertButton: "Boka kostnadsfri takkontroll",
  phone: "070-154 36 39",
  howLink: "Se hur ett takbyte går till",
  specEyebrow: "Teknisk specifikation",
  processHeading: (n: number) => `Arbetsgång i ${n} steg`,
  asideTitle: "Boka takkontroll",
  asideText: "Vi återkommer med ett fast pris för ditt projekt efter kostnadsfri takkontroll.",
  asideCta: "Boka takkontroll",
  photoLabel: "Foto",
  asideNote:
    "Vi tar uppdrag i Roslagen och Storstockholm och har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn.",
  falsat: {
    eyebrow: "Bandtäckning",
    heading: "Dubbelfalsat plåttak – bandtäckning med fast pris",
    text:
      "Vi lägger dubbelfalsade plåttak (bandtäckning) vid takbyte, med fast pris efter kostnadsfri takkontroll. Bandtäckning är plåtbanor som fogas ihop med ett dubbelt fals i stället för synliga skruvhål — en tät skarv, men mer hantverk och arbetstid än skruvad profilplåt som TP20. Banorna hålls på plats av dolda klammer som fästs i underlaget, så att plåten kan röra sig med temperaturen utan att skarvarna tar skada. Tekniken kan formas efter kupor, ränndalar och andra detaljer på taket.",
  },
  scopeEyebrow: "Omfattning",
  scopeHeading: "Det här omfattar arbetet normalt",
  scopeNote: "Tillägg bara efter ditt godkännande.",
  craftEyebrow: "Hantverket",
  // "utfört i Roslagen" bara där vi har belagda egna jobb (takbyte på Blidö och Singö). Övriga tjänster: bara tjänstens namn (juristen A1, regel 5).
  craftCaption: (title: string, slug?: string) => (slug && CAPTION_OWN_JOB_SLUGS.includes(slug) ? "Takbyte på Blidö" : title),
  goodToKnowEyebrow: "Bra att veta",
  skargardenTitle: "Uppdragsområde",
  skargardenText: "Vi tar uppdrag i Roslagen och Storstockholm och har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn.",
  priceTitle: "Pris och ROT",
  priceFallback: "Fast pris efter kostnadsfri takkontroll.",
  addonsNote: " Tillägg bara efter ditt godkännande.",
  guaranteeTitle: "Garanti",
  guaranteeStandard: "Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor.",
  ctaHeading: (slug: string, title: string) =>
    slug === "eternit-asbest" ? "Har du eternittak med asbest?" : `Intresserad av ${title.toLowerCase()}?`,
  ctaText: (slug: string) =>
    slug === "eternit-asbest"
      ? "Boka en kostnadsfri takkontroll så går vi igenom ditt eternittak."
      : "Kontakta oss för en kostnadsfri takkontroll.",
  ctaOffert: "Boka takkontroll",
  ctaAdvice: "Boka kostnadsfri takkontroll",
  relatedEyebrow: "Läs vidare",
  relatedHeading: "Relaterat innehåll",
  backToServices: "Tillbaka till alla tjänster",
};

/** Sidor där länken "Se hur ett takbyte går till" inte hör hemma. */
export const NO_HOW_LINK_SERVICE_SLUGS: readonly string[] = ["takavvattning", "takinspektion"];

/** Visas chipet "10 års utförandegaranti"? Inte på takkontrollen, som inte har någon garanti. */
export const showsUtforandeChip = (slug: string): boolean => !NO_GARANTI_SERVICE_SLUGS.includes(slug);

/** Fasta länkar i "Relaterat innehåll" (före systertjänster och tjänstens egna länkar). */
export const SERVICE_RELATED_FIXED: { to: string; label: string }[] = [
  { to: "/priser", label: "Se prislista" },
  { to: "/blogg/kostnad-takbyte-2026", label: "Vad kostar takbyte 2026?" },
  { to: "/blogg/rot-avdrag-takbyte", label: "ROT-avdrag vid takbyte" },
  { to: "/taktyper", label: "Taktyper & material" },
  { to: "/hur-det-gar-till", label: "Så går ett takbyte till" },
  { to: "/offert#faq", label: "Vanliga frågor om takarbete" },
];
export const SERVICE_RELATED_TAIL: { to: string; label: string }[] = [{ to: "/recensioner", label: "Omdömen på Google" }];

/** Tjänster där prisrutan (första "Bra att veta"-rutan) står som ett eget H2-avsnitt över de övriga rutorna, som på materialsidorna. */
export const PRIS_SOM_AVSNITT: string[] = ["tegeltak"];

/** "Bra att veta"-rutorna för en tjänst. */
export const goodToKnowBoxes = (slug: string): { t: string; d: string }[] => {
  const details = serviceDetails[slug];
  const renovering = RENOVERING_SERVICE_SLUGS.includes(slug);
  return [
    {
      t: slug === "tegeltak" ? "Vad kostar tegeltak?" : SERVICE_COPY.priceTitle,
      d: `${details?.priceRange ? withRotForbehall(details.priceRange) : SERVICE_COPY.priceFallback}${slug === "takinspektion" ? "" : SERVICE_COPY.addonsNote}`,
    },
    ...(NO_GARANTI_SERVICE_SLUGS.includes(slug)
      ? []
      : [
          {
            t: SERVICE_COPY.guaranteeTitle,
            d: slug === "eternit-asbest" ? GARANTI_ETERNIT : NO_TATSKIKT_SERVICE_SLUGS.includes(slug) ? GARANTI_UTFORANDE : renovering ? GARANTI_RENOVERING : SERVICE_COPY.guaranteeStandard,
          },
        ]),
    { t: SERVICE_COPY.skargardenTitle, d: SERVICE_COPY.skargardenText },
  ];
};

/** Tätskiktschipet för en tjänst, eller null för arbeten som inte lägger nytt tätskikt (taksäkerhet). */
export const tatskiktChip = (slug: string): string | null =>
  NO_GARANTI_SERVICE_SLUGS.includes(slug) || NO_TATSKIKT_SERVICE_SLUGS.includes(slug) || NO_TATSKIKT_CHIP_SERVICE_SLUGS.includes(slug)
    ? null
    : RENOVERING_SERVICE_SLUGS.includes(slug)
      ? GARANTI_RENOVERING_CHIP
      : SERVICE_COPY.chipTatskikt;

// Taksäkerhet (/tjanster/taksakerhet): texten bor i service-taksakerhet.ts
serviceMeta[TAKSAKERHET_SLUG] = taksakerhetMeta;
serviceDetails[TAKSAKERHET_SLUG] = taksakerhetDetails;

/** All synlig text i ett specialblock, i den ordning den visas. */
export const blockTexts = (block: SpecificBlock): string[] => {
  const head = [block.eyebrow, block.heading, block.intro];
  switch (block.kind) {
    case "matrix":
    case "dimension":
      return [...head, ...block.columns, ...block.rows.flat(), ...(block.footnote ? [block.footnote] : [])];
    case "signals":
      return [...head, ...SIGNALS_COLUMNS, ...block.items.flatMap((i) => [i.sign, i.meaning, i.action])];
    case "lookup":
      return [...head, ...block.columns, ...block.items.flatMap((i) => [i.sign, i.label])];
    case "regulatory":
      return [...head, ...block.steps.flatMap((s) => [s.code, s.title, s.text])];
    case "checklist":
      return [...head, ...block.groups.flatMap((g) => [g.title, ...g.items])];
    case "season":
      return [...head, ...block.periods.flatMap((p) => [p.label, p.title, p.text])];
  }
};

/** Tjänster som visar ett detaljfoto med bildtext i sidokolumnen (bilden väljs i ServiceDetail.tsx). */
export const SERVICE_DETAIL_PHOTO_SLUGS: readonly string[] = ["takomlaggning", "takavvattning", "platarbeten", "takvard"];

/** Kolumnrubriker i specialblocket "signals" (ServiceSpecificBlock.tsx). */
export const SIGNALS_COLUMNS = ["Signal på taket", "Vad det betyder", "Vår åtgärd"];

/** Specialblockets text som stycken och rubriker (h2 = blockrubriken, h3 = stegets/gruppens/periodens titel). */
export const blockItems = (block: SpecificBlock): BodyItem[] => {
  const head: BodyItem[] = [block.eyebrow, { h: block.heading }, block.intro];
  switch (block.kind) {
    case "matrix":
    case "dimension":
      return [...head, ...block.columns, ...block.rows.flat(), ...(block.footnote ? [block.footnote] : [])];
    case "signals":
      return [...head, ...SIGNALS_COLUMNS, ...block.items.flatMap((i) => [i.sign, i.meaning, i.action])];
    case "lookup":
      return [...head, ...block.columns, ...block.items.flatMap((i) => [i.sign, i.label])];
    case "regulatory":
      return [...head, ...block.steps.flatMap((st) => [st.code, { h: st.title, level: 3 as const }, st.text])];
    case "checklist":
      return [...head, ...block.groups.flatMap((g) => [{ h: g.title, level: 3 as const }, ...g.items])];
    case "season":
      return [...head, ...block.periods.flatMap((p) => [p.label, { h: p.title, level: 3 as const }, p.text])];
  }
};

export type ServiceListItem = { slug: string; title: string; description: string };

const dedupeByTo = <T extends { to: string }>(links: T[]): T[] => {
  const seen = new Set<string>();
  return links.filter((l) => (seen.has(l.to) ? false : (seen.add(l.to), true)));
};

/** Länkarna i "Relaterat innehåll" (samma lista som React renderar). */
export const serviceRelatedLinks = (slug: string, services: ServiceListItem[]): { to: string; label: string }[] => {
  const index = services.findIndex((s) => s.slug === slug);
  const sisters =
    index === -1 ? [] : Array.from({ length: 4 }, (_, i) => services[(index + 1 + i) % services.length]);
  const blocks = serviceBlocks[slug] ?? serviceBlocks.takomlaggning;
  return dedupeByTo([
    ...SERVICE_RELATED_FIXED,
    ...sisters.map((s) => ({ to: canonicalPath(`/tjanster/${s.slug}`), label: s.title })),
    ...(blocks.relatedLinks ?? []),
    ...(SERVICE_EXTRAS[slug]?.links ?? []),
    ...(serviceAreaLinks[slug] ?? []),
    ...SERVICE_RELATED_TAIL,
  ]);
};

/**
 * Hela den synliga texten på /tjanster/<slug> för den statiska HTML:en, i visningsordning. Motsvarar
 * ServiceDetail.tsx; paritetstestet renderar sidan och jämför båda riktningarna.
 */
export const serviceStaticPage = (slug: string, services: ServiceListItem[]) => {
  const service = services.find((s) => s.slug === slug);
  const details = serviceDetails[slug];
  if (!service || !details) return null;
  const meta = serviceMeta[slug] ?? serviceMeta.takomlaggning;
  const blocks = serviceBlocks[slug] ?? serviceBlocks.takomlaggning;
  const block = blockItems(blocks.block);
  const specific = (placement: "before-spec" | "after-spec" | "after-scope") =>
    blocks.blockPlacement === placement ? block : [];
  const items: BodyItem[] = [
    SERVICE_COPY.heroEyebrow,
    ...meta.specs.map((sp) => `${sp.k}: ${sp.v}`),
    SERVICE_COPY.takkontrollLink,
    ...(showsUtforandeChip(slug) ? [SERVICE_COPY.chipUtforande] : []),
    ...(tatskiktChip(slug) ? [tatskiktChip(slug)!] : []),
    SERVICE_COPY.chipFastPris,
    SERVICE_COPY.chipSvar,
    SERVICE_COPY.offertButton,
    SERVICE_COPY.phone,
    ...(NO_HOW_LINK_SERVICE_SLUGS.includes(slug) ? [] : [SERVICE_COPY.howLink]),
    ...blocks.factCards.flatMap((c) => [c.label, c.value, c.text]),
    ...specific("before-spec"),
    SERVICE_COPY.specEyebrow,
    { h: meta.specHeading },
    meta.lead,
    details.longDesc,
    { h: SERVICE_COPY.processHeading(details.process.length), level: 3 },
    ...details.process,
    { h: SERVICE_COPY.asideTitle, level: 3 },
    SERVICE_COPY.asideText,
    SERVICE_COPY.asideCta,
    ...(SERVICE_DETAIL_PHOTO_SLUGS.includes(slug) && meta.photoNote ? [SERVICE_COPY.photoLabel, meta.photoNote] : []),
    SERVICE_COPY.asideNote,
    ...specific("after-spec"),
    ...(slug === "platarbeten" ? [SERVICE_COPY.falsat.eyebrow, { h: SERVICE_COPY.falsat.heading }, SERVICE_COPY.falsat.text] : []),
    SERVICE_COPY.scopeEyebrow,
    { h: SERVICE_COPY.scopeHeading },
    SERVICE_COPY.scopeNote,
    ...details.benefits,
    ...specific("after-scope"),
    SERVICE_COPY.craftEyebrow,
    meta.craftLine,
    SERVICE_COPY.craftCaption(service.title, slug),
    SERVICE_COPY.goodToKnowEyebrow,
    ...goodToKnowBoxes(slug).flatMap((b, i) => [{ h: b.t, level: (i === 0 && PRIS_SOM_AVSNITT.includes(slug) ? 2 : 3) as 2 | 3 }, b.d]),
    ...(SERVICE_EXTRAS[slug]
      ? SERVICE_EXTRAS[slug].blocks.flatMap((b) => [
          { h: b.heading },
          ...b.items.flatMap((it: ExtraItem) => (typeof it === "string" ? [stripInlineMd(it)] : it.list.map(stripInlineMd))),
        ])
      : []),
    ...(serviceExtra[slug]
      ? [
          serviceExtra[slug].eyebrow,
          { h: serviceExtra[slug].heading },
          serviceExtra[slug].intro,
          ...serviceExtra[slug].sections.flatMap((s) => [{ h: s.heading, level: 3 as const }, s.text]),
        ]
      : []),
    ...(slug === "eternit-asbest"
      ? [
          ...eternitSections.flatMap((sec) => [{ h: sec.heading, level: sec.level }, ...sec.paragraphs]),
          { h: ETERNIT_FAQ_HEADING },
          ...eternitFaqs.flatMap((f) => [{ h: f.question, level: 3 as const }, stripInlineMd(f.answer)]),
          { h: eternitLocal.heading },
          eternitLocal.text,
          ...eternitLocal.links.map((l) => l.label),
        ]
      : []),
    ...(SERVICE_EXTRAS[slug]
      ? [
          "Vanliga frågor",
          { h: SERVICE_EXTRAS[slug].faqHeading },
          ...SERVICE_EXTRAS[slug].faqs.flatMap((f) => [{ h: f.question, level: 3 as const }, stripInlineMd(f.answer)]),
        ]
      : []),
    { h: SERVICE_COPY.ctaHeading(slug, service.title) },
    SERVICE_COPY.ctaText(slug),
    ...(slug === "eternit-asbest" ? [] : [SERVICE_COPY.ctaOffert]),
    SERVICE_COPY.ctaAdvice,
    SERVICE_COPY.relatedEyebrow,
    { h: SERVICE_COPY.relatedHeading },
    SERVICE_COPY.backToServices,
  ];
  const { paragraphs, headingAt } = buildBody(items);
  return {
    title: blocks.seoTitle,
    description: blocks.seoDescription,
    h1: `${service.title}${meta.h1Sep ?? ""} ${meta.accentLine}`.trim(),
    intro: service.description,
    paragraphs,
    headingAt,
    relatedLinks: serviceRelatedLinks(slug, services),
    /** Svar som bara syns när besökaren öppnar en dragspelsfråga (finns även i FAQPage-schemat). */
    hiddenAnswers:
      slug === "eternit-asbest"
        ? eternitFaqs.map((f) => stripInlineMd(f.answer))
        : SERVICE_EXTRAS[slug]
          ? SERVICE_EXTRAS[slug].faqs.map((f) => stripInlineMd(f.answer))
          : [],
  };
};

/** Brödsmula, Service och HowTo för en tjänstesida. Samma noder i React och i den statiska HTML:en. */
export const serviceSchemaNodes = (slug: string, services: ServiceListItem[]) => {
  const service = services.find((s) => s.slug === slug);
  const details = serviceDetails[slug];
  if (!service || !details) throw new Error(`Okänd tjänst: ${slug}`);
  const url = `${SITE_URL}/tjanster/${slug}`;
  return {
    breadcrumb: buildBreadcrumbNode([
      { name: "Startsidan", path: "/" },
      { name: "Tjänster", path: "/#tjanster" },
      { name: service.title, path: url },
    ]),
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: service.title,
      description: details.longDesc,
      ...(details.priceRange
        ? {
            offers: {
              "@type": "Offer",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceCurrency: "SEK",
                description: withRotForbehall(details.priceRange),
              },
            },
          }
        : {}),
      provider: { "@id": LOCAL_BUSINESS_ID },
      areaServed: { "@type": "Place", name: "Roslagen" },
    },
    howTo: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `Så här går ${service.title.toLowerCase()} till — steg för steg`,
      description: details.longDesc,
      ...(details.priceRange
        ? { estimatedCost: { "@type": "MonetaryAmount", currency: "SEK", value: withRotForbehall(details.priceRange) } }
        : {}),
      supply: details.benefits.slice(0, 5).map((b) => ({ "@type": "HowToSupply", name: b })),
      step: details.process.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step,
        text: step,
        url: `${url}#steg-${i + 1}`,
      })),
    },
  };
};
