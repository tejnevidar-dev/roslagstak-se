/**
 * Tjänstesidornas text (/tjanster/<slug>), enda källan för React (src/pages/ServiceDetail.tsx) OCH
 * den statiska HTML:en (scripts/prerender-content.ts). Fas 2.50 P0 (Marknadschefen 2026-10-03):
 * speglingen ska vara lika fullständig som den synliga sidan. Bara relativa importer (esbuild-bundlad
 * utan "@"-alias). Parity mot den renderade sidan testas i src/test/service-page-parity.test.ts.
 */
import { withRotForbehall } from "./prices";
import { GARANTI_RENOVERING, GARANTI_RENOVERING_CHIP, RENOVERING_SERVICE_SLUGS } from "./guarantee";
import { serviceBlocks, type SpecificBlock } from "./service-blocks";
import { serviceAreaLinks } from "./service-area-links";
import { eternitFaqs, eternitLocal, eternitSections, ETERNIT_FAQ_HEADING } from "./eternit-content";
import { canonicalPath } from "../lib/canonical";
import { LOCAL_BUSINESS_ID, SITE_URL, buildBreadcrumbNode } from "../lib/schema-graph";

export type ServiceMeta = {
  accentLine: string;
  specs: { k: string; v: string }[];
  specHeading: string;
  lead: string;
  craftLine: string;
  photoNote: string;
};

export const serviceMeta: Record<string, ServiceMeta> = {
  takomlaggning: {
    accentLine: "i skärgårdsmiljö.",
    specs: [
      { k: "Tätskikt", v: "30 års garanti (MATAKI)" },
      { k: "Utförande", v: "AMA-standard" },
      { k: "Läkt", v: "25 × 38 mm" },
    ],
    specHeading: "Teknisk specifikation och utförande",
    lead: "Varje omläggning inleds med en fullständig analys av råspont, ventilation och avvattning.",
    craftLine: "Rätt underlag, rätt beslag, rätt ventilation — det är där ett tak avgörs.",
    photoNote: "Ny läkt monterad på diffusionsöppen underlagsduk — eget arbete i Roslagen.",
  },
  takrenovering: {
    accentLine: "utan helt takbyte.",
    specs: [
      { k: "Åtgärd", v: "Punktinsats" },
      { k: "Underlag", v: "Papp och råspont" },
      { k: "Pris", v: "Fast efter takkontroll" },
    ],
    specHeading: "Vad vi åtgärdar — och vad vi låter vara",
    lead: "Renovering handlar om att byta rätt delar: skadad papp, rötat virke och trasiga pannor.",
    craftLine: "Ett tak dör sällan överallt samtidigt — vi byter det som behöver bytas.",
    photoNote: "Skadat, mossbevuxet tegeltak — exakt den typ av skador vi bedömer och åtgärdar.",
  },
  takavvattning: {
    accentLine: "rännor och stuprör.",
    specs: [
      { k: "Material", v: "Aluminium, koppar, plåt" },
      { k: "Dimension", v: "Beräknad per takyta" },
      { k: "Ränndalar", v: "Falsade i plåt" },
    ],
    specHeading: "Dimensionering och montage av avvattning",
    lead: "Vattnet ska bort från fasad och grund — dimension och fall avgör om systemet fungerar.",
    craftLine: "Fel fall på rännan syns inte första året. Det syns på fasaden fem år senare.",
    photoNote: "Nymonterade hängrännor med fotplåt och korrekt fall.",
  },
  takkupor: {
    accentLine: "mer ljus på vinden.",
    specs: [
      { k: "Bygglov", v: "Vi hanterar ansökan" },
      { k: "Fönster", v: "Velux eller motsvarande" },
      { k: "Tätning", v: "Plåtbeslag runt kupa" },
    ],
    specHeading: "Konstruktion, tätning och invändig finish",
    lead: "En kupa är lika mycket plåtarbete som snickeri — tätningen avgör resultatet.",
    craftLine: "Runt kupor och genomföringar avgörs om taket håller tätt.",
    photoNote: "Färdigt tak med två takkupor — tätt inklätt i plåt runt varje kupa.",
  },
  takinspektion: {
    accentLine: "innan skadan kostar.",
    specs: [
      { k: "Pris", v: "Kostnadsfri" },
      { k: "Tid på plats", v: "Ca 1–2 timmar" },
      { k: "Omfattning", v: "Tak, plåt, avvattning" },
    ],
    specHeading: "Vad vi tittar på vid en takkontroll",
    lead: "Vi går igenom taket på plats — inte bara hur det ser ut från marken.",
    craftLine: "Det som avgör takets skick ligger under pannorna.",
    photoNote: "Sprucken plåt och lossnande pannor — exempel på skador vi upptäcker vid en takkontroll.",
  },
  platarbeten: {
    accentLine: "beslag och bandtäckning.",
    specs: [
      { k: "Material", v: "Stål, alu, koppar, zink" },
      { k: "Teknik", v: "Falsning på plats" },
      { k: "Detaljer", v: "Skorsten och genomföring" },
    ],
    specHeading: "Plåtdetaljer som håller mot kustklimat",
    lead: "Plåtarbetet är takets tätning — beslagen tillverkas och falsas efter ditt hus.",
    craftLine: "Plåtslageri är millimeterarbete. Salt och vind förlåter ingenting.",
    photoNote: "Snörasskydd och plåtdetaljer monterade efter taktäckning.",
  },
  takvard: {
    accentLine: "tvätt och målning.",
    specs: [
      { k: "Metod", v: "Skonsam rengöring" },
      { k: "Färg", v: "Specialfärg för tak" },
      { k: "Effekt", v: "Förlängd livslängd" },
    ],
    specHeading: "Rengöring, behandling och målning",
    lead: "Mossa håller fukt mot ytskiktet — rätt metod tar bort den utan att skada materialet.",
    craftLine: "Ett välskött tak håller år längre än ett tak som lämnas åt mossan.",
    photoNote: "Rengjorda och behandlade betongpannor efter avslutat arbete.",
  },
  "eternit-asbest": {
    accentLine: "säkert och enligt regelverk.",
    specs: [
      { k: "Regelverk", v: "Arbetsmiljöverkets föreskrifter" },
      { k: "Tillstånd", v: "Krävs, söks av saneringsfirman" },
      { k: "Deponi", v: "Godkänd transport" },
    ],
    specHeading: "Sanering enligt Arbetsmiljöverkets föreskrifter — steg för steg",
    lead: "Asbest kräver skyddsutrustning, emballering och dokumenterad transport till deponi.",
    craftLine: "Eternit ska inte kapas, brytas eller högtryckstvättas. Den ska saneras.",
    photoNote: "Arbete på plats med full skyddsutrustning enligt regelverket.",
  },
  tegeltak: {
    accentLine: "nytt tak med fast pris.",
    specs: [
      { k: "Material", v: "Lertegel" },
      { k: "Livslängd", v: "Enligt tillverkaren" },
      { k: "Pris", v: "Från 1 300 kr/m²" },
    ],
    specHeading: "Lertegel jämfört med andra taktyper",
    lead: "Lertegel är det klassiska valet som passar både äldre och nyare hus — och håller mycket länge.",
    craftLine: "Lertegel kräver en konstruktion som tål vikten. Vi kontrollerar bärigheten innan vi offererar.",
    photoNote: "Lertegeltak — det klassiska materialvalet som passar både äldre och nyare hus.",
  },
};



export const serviceDetails: Record<string, { longDesc: string; benefits: string[]; process: string[]; priceRange?: string }> = {
  takomlaggning: {
    longDesc: "En takomläggning innebär att hela det befintliga takmaterialet rivs och ersätts med nytt. Vi inspekterar alltid underlaget (råspont) och byter ut skadat virke innan det nya materialet läggs. Vi hjälper dig välja mellan plåttak, tegelpannor, betongpannor eller papptak beroende på ditt hus, din budget och dina önskemål. Allt arbete utförs enligt AMA av våra takläggare med 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI.",
    priceRange: "Riktpris, efter ROT-avdrag och inkl. moms: TP20-plåt och betongpannor från 1 200 kr/m², lertegel och pannplåt från 1 300 kr/m², dubbelfalsat ca 2 000 kr/m². Exakt pris beror på takets storlek, material och underlag.",
    benefits: [
      "Rivning av befintligt yttertak",
      "Ny råspont och ventilation vid behov",
      "Nytt underlagspapp, fotplåtar och underbeslag runt genomföringar",
      "Ny läkt, vindskivor, vindskiveplåtar och ny avvattning",
      "Plåtdetaljer såsom stoss och skorstensinklädnad",
      "Byggställning",
      "Avfallshantering",
    ],
    process: [
      "Kostnadsfri takkontroll och offert",
      "Offert godkänns av kund",
      "Logistikplanering påbörjas",
      "Byggställning monteras",
      "Rivning av befintligt yttertak",
      "Montering av nytt takmaterial",
      "Installation av ny taksäkerhet och avvattning",
      "Slutsamråd med kund och ansvarig säljare för att säkerställa att allt är korrekt utfört enligt offert",
      "Slutgenomgång och skriftlig garanti",
      "Rivning av byggställning och avetablering från fastigheten",
    ],
  },
  takrenovering: {
    longDesc: "En takrenovering innebär att vi åtgärdar problem och förlänger livslängden på ditt befintliga tak utan att byta hela takmaterialet. Det kan handla om att byta enstaka trasiga pannor, laga läckor, byta underlagspapp, reparera plåtbeslag eller åtgärda röta i råsponten.",
    priceRange: "Fast pris efter kostnadsfri takkontroll, beroende på skadans omfattning. ROT-avdrag tillkommer.",
    benefits: [
      "Lägre kostnad än komplett takomläggning",
      "Fast pris efter kostnadsfri takkontroll",
      "Förlänger befintligt taks livslängd",
      "Åtgärdar läckor och fuktskador",
      "Byte av enstaka pannor eller plåtsektioner",
      "Reparation av rötskadat virke",
    ],
    process: [
      "Takkontroll och skadebedömning",
      "Offert med tydlig åtgärdslista",
      "Reparation av skadat underlag",
      "Byte av trasiga pannor/plåtsektioner",
      "Tätning och lagning av läckor",
      "Slutkontroll och dokumentation",
    ],
  },
  takavvattning: {
    longDesc: "Ett fungerande takavvattningssystem är avgörande för att skydda husets fasad, grund och konstruktion. Vi installerar och byter hängrännor, stuprör, ränndalar och plåtbeslag i aluminium, koppar eller lackerad plåt. Vi dimensionerar systemet efter takets storlek och lutning för optimal vattenavrinning.",
    priceRange: "Riktpris, efter ROT-avdrag och inkl. moms: komplett system med stuprör från ca 23 000 kr, beroende på husets storlek och våningar. Koppar ligger högre än aluminium.",
    benefits: [
      "Skyddar fasad och grund mot vattenskador",
      "Hängrännor i aluminium, koppar eller lackerad plåt",
      "Stuprör med korrekt dimensionering",
      "Lövinsamlare och galler vid behov",
      "Material i aluminium, koppar eller lackerad plåt",
      "Prydligt och hållbart resultat",
    ],
    process: [
      "Takkontroll av befintligt system",
      "Dimensionering och materialval",
      "Demontering av gammalt system",
      "Montering av nya hängrännor",
      "Installation av stuprör och anslutningar",
      "Funktionskontroll",
    ],
  },
  takkupor: {
    longDesc: "Takkupor och takfönster är ett utmärkt sätt att utnyttja vindsutrymmet och släppa in mer ljus. Vi bygger nya takkupor och monterar takfönster (t.ex. Velux) med korrekt vattenavledning och isolering. Med en eller flera takkupor kan du skapa sovrum, kontor eller hobbyrum och öka boendeytan avsevärt.",
    priceRange: "Fast pris efter kostnadsfri takkontroll, för både takkupa och takfönster (Velux) inkl. montering. ROT-avdrag tillkommer.",
    benefits: [
      "Mer dagsljus på vindsvåningen",
      "Ökat boendeyta och husvärde",
      "Bättre ventilation",
      "Karaktär och charm till huset",
      "Korrekt vattenavledning runt kupa/fönster",
      "Energieffektiva takfönster",
    ],
    process: [
      "Platsbesök och planering",
      "Bygglovsansökan vid behov",
      "Konstruktionsberäkning",
      "Uppbyggnad av takkupa/fönsteröppning",
      "Taktäckning och plåtarbete",
      "Isolering och invändig finishing",
    ],
  },
  takinspektion: {
    longDesc: "En regelbunden takinspektion förebygger dyra skador. En av våra säljare tittar på taket på plats, ca 1–2 timmar, bland annat på takmaterial, plåtdetaljer och avvattning, och på vinden när den går att komma åt. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris – kostnadsfritt och utan förpliktelser.",
    priceRange: "Helt kostnadsfritt — inga dolda avgifter.",
    benefits: [
      "Helt kostnadsfri och utan förbindelser",
      "En av våra säljare tittar på taket på plats",
      "Identifierar problem innan de blir dyra",
      "Tittar på takmaterial, plåtdetaljer och avvattning",
      "Rapport om takets skick",
      "Fast pris i offerten om något behöver åtgärdas",
    ],
    process: [
      "Boka takkontroll (telefon eller formulär)",
      "Vi besöker din fastighet",
      "Grundlig inspektion av tak, underlag och avvattning",
      "Genomgång av resultat och rekommendationer på plats",
      "Skriftligt fast pris i offerten",
    ],
  },
  platarbeten: {
    longDesc: "Plåtarbeten är en central del av alla takprojekt. Vi utför allt från taktäckning med profilerad plåt och bandtäckning till beslag runt skorstenar, ventilationsgenomföringar, takfönster och ränndalar.",
    priceRange: "Riktpris, efter ROT-avdrag och inkl. moms: taktäckning med plåt från 1 200 kr/m² (TP20) till ca 2 000 kr/m² (dubbelfalsat). Beslag och detaljer prissätts efter omfattning i offerten.",
    benefits: [
      "En kontaktperson hela vägen",
      "Taktäckning med alla typer av plåt",
      "Beslag runt skorstenar och genomföringar",
      "Ränndalar och vindskivor i plåt",
      "Material i stål, aluminium, koppar och zink",
      "10 års utförandegaranti på utfört arbete, 30 års tätskiktsgaranti via MATAKI när nytt tätskikt läggs",
    ],
    process: [
      "Takkontroll och uppmätning",
      "Materialval och färgval",
      "Tillverkning av specialbeslag",
      "Montering och falsning",
      "Täthetskontroll",
      "Slutgenomgång",
    ],
  },
  takvard: {
    longDesc: "Takvård handlar om att underhålla och skydda ditt tak för att förlänga dess livslängd och bevara husets utseende. Vi utför taktvätt där vi tar bort mossa, alger och smuts med skonsamma metoder som inte skadar takmaterialet. Vi utför även takmålning med specialfärger anpassade för tak — oavsett om det är betongpannor, tegelpannor eller plåttak. Ett välskött tak håller längre, ser bättre ut och skyddar bättre mot väder och vind.",
    priceRange: "Fast pris efter kostnadsfri takkontroll, för både taktvätt och takmålning. ROT-avdrag tillkommer.",
    benefits: [
      "Professionell taktvätt med skonsam metod",
      "Borttagning av mossa, alger och lavar",
      "Takmålning med specialfärg för tak",
      "Förlänger takets livslängd avsevärt",
      "Fräschar upp husets utseende",
      "Skyddar takmaterialet mot fukt och UV",
    ],
    process: [
      "Kostnadsfri takkontroll av takets skick",
      "Offert med tydlig beskrivning av åtgärder",
      "Skonsam högtryckstvätt eller manuell rengöring",
      "Behandling mot mossa och alger",
      "Grundning och takmålning vid behov",
      "Slutkontroll och dokumentation",
    ],
  },
  "eternit-asbest": {
    longDesc: "Många äldre hus i Roslagen och skärgården har tak av eternitplattor som innehåller asbest — ett hälsofarligt material som kräver specialhantering vid rivning. Vi samordnar saneringen med en behörig saneringsfirma, som utför rivningen enligt Arbetsmiljöverkets föreskrifter med skyddsutrustning, slussystem och godkänd emballering, och transporterar materialet till godkänd deponi. Vi utför inte asbestsanering själva. Därefter utför vi komplett takomläggning med modernt material så att du får ett säkert, hållbart och vackert tak.",
    priceRange: "Fast pris efter kostnadsfri takkontroll — sanering (via saneringsfirman) plus nytt tak. Exakt pris beror på takets storlek, åtkomlighet och asbesttyp. ROT-avdrag tillkommer på takarbetet.",
    benefits: [
      "Sanering av behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter",
      "Vi samordnar hela processen åt dig",
      "Tillstånd hos Arbetsmiljöverket söks och hanteras av saneringsfirman",
      "Komplett takomläggning efter sanering",
      "Fast pris efter kostnadsfri takkontroll",
    ],
    process: [
      "Kostnadsfri takkontroll och materialprovtagning",
      "Vi samordnar sanering med behörig saneringsfirma",
      "Saneringsfirman söker tillstånd hos Arbetsmiljöverket före rivningen och river med skyddsåtgärder",
      "Emballering och transport till godkänd deponi (saneringsfirman)",
      "Inspektion av underlag och eventuell reparation",
      "Montering av nytt takmaterial",
      "Slutgenomgång",
    ],
  },
  tegeltak: {
    longDesc: "Vi lägger tegeltak i lertegel — det klassiska materialvalet som passar både äldre och nyare hus, med ett uttryck som plåt eller betong inte kan ersätta. Materialet åldras med patina i stället för att se slitet ut, och enskilda pannor som spricker kan bytas utan att hela taket behöver göras om. Pannorna är tunga, så takstolarna måste vara dimensionerade för vikten, och taket måste ha minst den lutning som tillverkaren anger för pannmodellen. Bärigheten bedöms vid takkontrollen innan vi lämnar offert. Lertegel ska inte förväxlas med tegelplåt (profilerad plåt som imiterar tegel) — vi lägger båda, men de är olika material med olika pris, vikt och livslängd.",
    priceRange: "Riktpris, efter ROT-avdrag och inkl. moms: lertegel och tegelprofilerad plåt från 1 300 kr/m². Exakt pris beror på takets storlek, lutning och underlagets skick.",
    benefits: [
      "Klassiskt uttryck som håller husets karaktär",
      "Åldras med patina och passar både äldre och nyare hus",
      "Fast pris efter kostnadsfri takkontroll",
      "10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI",
    ],
    process: [
      "Kostnadsfri takkontroll — vi bedömer konstruktion, bärighet och taklutning",
      "Skriftlig offert med fast pris",
      "Rivning av befintligt tak och kontroll av råspont",
      "Ny underlagspapp, ströläkt och bärläkt dimensionerad för tegelvikten",
      "Montering av lertegel samt plåtbeslag kring skorsten och genomföringar",
      "Taksäkerhet och takavvattning",
      "Slutgenomgång och skriftlig garanti",
    ],
  },
};


/* ---------------------------------------------------------------------------------------------
 * Text som tidigare låg hårdkodad i ServiceDetail.tsx. React och den statiska HTML:en läser samma
 * strängar härifrån; paritetstestet (src/test/service-page-parity.test.ts) renderar sidan och
 * jämför mot speglingen i båda riktningarna.
 * ------------------------------------------------------------------------------------------- */
export const SERVICE_COPY = {
  heroEyebrow: "Tjänstebeskrivning / Roslagen",
  takkontrollLink: "Boka kostnadsfri takkontroll",
  chipUtforande: "10 års utförandegaranti",
  chipTatskikt: "30 års tätskiktsgaranti via MATAKI",
  chipFastPris: "Fast pris",
  chipSvar: "Svar inom 24 h",
  offertButton: "Begär kostnadsfri offert",
  phone: "070-154 36 39",
  howLink: "Se hur ett takbyte går till",
  specEyebrow: "Teknisk specifikation",
  processHeading: (n: number) => `Arbetsgång i ${n} steg`,
  asideTitle: "Begär offert",
  asideText: "Vi återkommer med ett fast pris för ditt projekt efter kostnadsfri takkontroll.",
  asideCta: "Starta förfrågan",
  photoLabel: "Foto",
  asideNote:
    "Vi tar uppdrag i Roslagen, Storstockholm och skärgården, och har gjort kompletta takbyten på Blidö och Singö.",
  falsat: {
    eyebrow: "Bandtäckning",
    heading: "Dubbelfalsat plåttak – bandtäckning med fast pris",
    text:
      "Vi lägger dubbelfalsade plåttak (bandtäckning) vid takbyte, med fast pris efter kostnadsfri takkontroll. Bandtäckning är plåtbanor som fogas ihop med ett dubbelt fals i stället för synliga skruvhål — en tät skarv, men mer hantverk och arbetstid än skruvad profilplåt som TP20. Banorna hålls på plats av dolda klammer som fästs i underlaget, så att plåten kan röra sig med temperaturen utan att skarvarna tar skada. Tekniken passar både äldre hus och moderna villor, och kan formas efter kupor, ränndalar och andra detaljer på taket.",
  },
  scopeEyebrow: "Omfattning",
  scopeHeading: "Det här ingår i arbetet",
  scopeNote: "Allt specificeras i offerten — inga tillägg i efterhand utan att du godkänt dem.",
  craftEyebrow: "Hantverket",
  craftCaption: (title: string) => `${title} — utfört i Roslagen`,
  goodToKnowEyebrow: "Bra att veta",
  skargardenTitle: "Skärgården",
  skargardenText: "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
  priceTitle: "Pris och ROT",
  priceFallback: "Fast pris efter kostnadsfri takkontroll.",
  addonsNote: " Tillägg bara efter ditt godkännande.",
  guaranteeTitle: "Garanti",
  guaranteeStandard: "10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI.",
  ctaHeading: (slug: string, title: string) =>
    slug === "eternit-asbest" ? "Har du eternittak med asbest?" : `Intresserad av ${title.toLowerCase()}?`,
  ctaText: (slug: string) =>
    slug === "eternit-asbest"
      ? "Kontakta oss för kostnadsfri rådgivning om ditt eternittak. Vi hjälper dig vidare."
      : "Kontakta oss för en kostnadsfri takkontroll och offert.",
  ctaOffert: "Få offert",
  ctaAdvice: "Kostnadsfri rådgivning",
  relatedEyebrow: "Läs vidare",
  relatedHeading: "Relaterat innehåll",
  backToServices: "Tillbaka till alla tjänster",
};

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

/** "Bra att veta"-rutorna för en tjänst. */
export const goodToKnowBoxes = (slug: string): { t: string; d: string }[] => {
  const details = serviceDetails[slug];
  const renovering = RENOVERING_SERVICE_SLUGS.includes(slug);
  return [
    {
      t: SERVICE_COPY.priceTitle,
      d: `${details?.priceRange ? withRotForbehall(details.priceRange) : SERVICE_COPY.priceFallback}${slug === "takinspektion" ? "" : SERVICE_COPY.addonsNote}`,
    },
    { t: SERVICE_COPY.guaranteeTitle, d: renovering ? GARANTI_RENOVERING : SERVICE_COPY.guaranteeStandard },
    { t: SERVICE_COPY.skargardenTitle, d: SERVICE_COPY.skargardenText },
  ];
};

export const tatskiktChip = (slug: string) =>
  RENOVERING_SERVICE_SLUGS.includes(slug) ? GARANTI_RENOVERING_CHIP : SERVICE_COPY.chipTatskikt;

/** All synlig text i ett specialblock, i den ordning den visas. */
export const blockTexts = (block: SpecificBlock): string[] => {
  const head = [block.eyebrow, block.heading, block.intro];
  switch (block.kind) {
    case "matrix":
    case "dimension":
      return [...head, ...block.columns, ...block.rows.flat(), ...(block.footnote ? [block.footnote] : [])];
    case "signals":
      return [...head, ...SIGNALS_COLUMNS, ...block.items.flatMap((i) => [i.sign, i.meaning, i.action])];
    case "regulatory":
      return [...head, ...block.steps.flatMap((s) => [s.code, s.title, s.text])];
    case "checklist":
      return [...head, ...block.groups.flatMap((g) => [g.title, ...g.items])];
    case "season":
      return [...head, ...block.periods.flatMap((p) => [p.label, p.title, p.text])];
  }
};

/** Tjänster som visar ett detaljfoto med bildtext i sidokolumnen (bilden väljs i ServiceDetail.tsx). */
export const SERVICE_DETAIL_PHOTO_SLUGS: readonly string[] = ["takomlaggning", "takavvattning", "platarbeten", "takvard", "eternit-asbest"];

/** Kolumnrubriker i specialblocket "signals" (ServiceSpecificBlock.tsx). */
export const SIGNALS_COLUMNS = ["Signal på taket", "Vad det betyder", "Vår åtgärd"];

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
  const block = blockTexts(blocks.block);
  const specific = (placement: "before-spec" | "after-spec" | "after-scope") =>
    blocks.blockPlacement === placement ? block : [];
  const paragraphs: string[] = [
    SERVICE_COPY.heroEyebrow,
    ...meta.specs.map((sp) => `${sp.k}: ${sp.v}`),
    SERVICE_COPY.takkontrollLink,
    SERVICE_COPY.chipUtforande,
    tatskiktChip(slug),
    SERVICE_COPY.chipFastPris,
    SERVICE_COPY.chipSvar,
    SERVICE_COPY.offertButton,
    SERVICE_COPY.phone,
    SERVICE_COPY.howLink,
    ...blocks.factCards.flatMap((c) => [c.label, c.value, c.text]),
    ...specific("before-spec"),
    SERVICE_COPY.specEyebrow,
    meta.specHeading,
    meta.lead,
    details.longDesc,
    SERVICE_COPY.processHeading(details.process.length),
    ...details.process,
    SERVICE_COPY.asideTitle,
    SERVICE_COPY.asideText,
    SERVICE_COPY.asideCta,
    ...(SERVICE_DETAIL_PHOTO_SLUGS.includes(slug) ? [SERVICE_COPY.photoLabel, meta.photoNote] : []),
    SERVICE_COPY.asideNote,
    ...specific("after-spec"),
    ...(slug === "platarbeten" ? [SERVICE_COPY.falsat.eyebrow, SERVICE_COPY.falsat.heading, SERVICE_COPY.falsat.text] : []),
    SERVICE_COPY.scopeEyebrow,
    SERVICE_COPY.scopeHeading,
    SERVICE_COPY.scopeNote,
    ...details.benefits,
    ...specific("after-scope"),
    SERVICE_COPY.craftEyebrow,
    meta.craftLine,
    SERVICE_COPY.craftCaption(service.title),
    SERVICE_COPY.goodToKnowEyebrow,
    ...goodToKnowBoxes(slug).flatMap((b) => [b.t, b.d]),
    ...(slug === "eternit-asbest"
      ? [
          ...eternitSections.flatMap((sec) => [sec.heading, ...sec.paragraphs]),
          ETERNIT_FAQ_HEADING,
          ...eternitFaqs.map((f) => f.question),
          eternitLocal.heading,
          eternitLocal.text,
          ...eternitLocal.links.map((l) => l.label),
        ]
      : []),
    SERVICE_COPY.ctaHeading(slug, service.title),
    SERVICE_COPY.ctaText(slug),
    ...(slug === "eternit-asbest" ? [] : [SERVICE_COPY.ctaOffert]),
    SERVICE_COPY.ctaAdvice,
    SERVICE_COPY.relatedEyebrow,
    SERVICE_COPY.relatedHeading,
    SERVICE_COPY.backToServices,
  ];
  return {
    title: blocks.seoTitle,
    description: blocks.seoDescription,
    h1: `${service.title} ${meta.accentLine}`,
    intro: service.description,
    paragraphs,
    relatedLinks: serviceRelatedLinks(slug, services),
    /** Svar som bara syns när besökaren öppnar en dragspelsfråga (finns även i FAQPage-schemat). */
    hiddenAnswers: slug === "eternit-asbest" ? eternitFaqs.map((f) => f.answer) : [],
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
