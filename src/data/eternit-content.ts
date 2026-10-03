/**
 * Text på eternitsidan (/tjanster/eternit-asbest), enda källan för EternitSEOContent.tsx och för den statiska
 * HTML:en (scripts/prerender-content.ts via data/service-page.ts).
 *
 * Skriven om 2026-10-03 efter juristens granskning (ledning/jurist/tjanstesida-eternit-granskning.md, A1–A8):
 * utgår från guiden r (/blogg/eternittak-asbest-sanering, juristens E1–E6) och använder Arbetsmiljöverkets meningar
 * ordagrant. Vår roll är bara att samordna med en behörig saneringsfirma och lägga det nya taket. Inga årtal utan
 * källa, inga tider, inga saneringspriser, inga beskrivningar av saneringsfirmans metod, inget prov som vi tar.
 */
export type EternitFaq = { question: string; answer: string };

export const eternitFaqs: EternitFaq[] = [
  {
    question: "Vad kostar det att byta ett eternittak?",
    answer: "Det nya taket får du fast pris på i vår offert. Hur saneringen prissätts framgår av offerten.",
  },
  {
    question: "Får man riva eternittak själv?",
    answer:
      "Ett företag som river asbest måste ha tillstånd från Arbetsmiljöverket. Borra, såga, slipa eller bryt inte i skivorna själv, och gå inte upp på taket.",
  },
  {
    question: "Hur vet jag om mitt eternittak innehåller asbest?",
    answer:
      "Det går inte att se på skivorna. Arbetsmiljöverket skriver att asbest är förbjudet sedan 1982 men finns kvar i äldre byggnader, och att det ibland finns också i yngre. Behöver du veta säkert kan ett prov analyseras av ett laboratorium. Bryt inte loss en bit själv.",
  },
  {
    question: "Kan ni riva eternittaket?",
    answer: "Nej. Vi samordnar med en behörig saneringsfirma som river det. Vi lägger det nya taket.",
  },
  {
    question: "Kan jag få ROT-avdrag när jag byter eternittak?",
    answer:
      "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar.",
  },
  {
    question: "Vilka hälsorisker finns med asbest?",
    answer:
      "Det är farligt att andas in asbestfibrer, eftersom fibrerna kan orsaka flera allvarliga lungsjukdomar, till exempel cancer. Borra, såga, slipa eller bryt inte i skivorna själv, och gå inte upp på taket.",
  },
];

export const eternitSections: { heading: string; level: 2 | 3; paragraphs: string[] }[] = [
  {
    heading: "Eternittak och asbest — vad behöver du veta?",
    level: 2,
    paragraphs: [
      "Eternit är ett namn på skivor av asbestcement, som länge användes på tak och fasader.",
      "Det här säger Arbetsmiljöverket: asbest är förbjudet att använda i Sverige sedan 1982, men finns ofta kvar i äldre byggnader. Asbesthaltiga material kan ibland finnas även i yngre byggnader, eftersom produkter kan ha lagerhållits eller importerats efter förbudet. Det är farligt att andas in asbestfibrer, eftersom fibrerna kan orsaka flera allvarliga lungsjukdomar, till exempel cancer.",
      "Vi återger vad myndigheten skriver. Vad som gäller för just ditt hus och ditt tak kan Arbetsmiljöverket och kommunen svara på.",
    ],
  },
  {
    heading: "Vi sanerar inte själva",
    level: 3,
    paragraphs: [
      "Vi river inte asbest och har inget tillstånd för det. När ett tak med eternit ska bytas samordnar vi med en behörig saneringsfirma. Saneringsfirman river och tar hand om det gamla materialet. När det är gjort lägger vi det nya taket.",
      "Hur saneringen prissätts, och vem du får fakturan från, framgår av offerten. Vårt fasta pris gäller det som står i vår offert.",
    ],
  },
];

export const ETERNIT_FAQ_HEADING = "Vanliga frågor om eternittak och asbest";

export const eternitLocal = {
  heading: "Eternittak i din kommun",
  text: "Vi samordnar med en saneringsfirma och lägger det nya taket.",
  links: [
    { to: "/taklaggare-blido", label: "Eternittak Blidö" },
    { to: "/taklaggare-norrtalje", label: "Eternittak Norrtälje" },
    { to: "/taklaggare-vaxholm", label: "Eternittak Vaxholm" },
    { to: "/taklaggare-furusund", label: "Eternittak Furusund" },
  ],
};
