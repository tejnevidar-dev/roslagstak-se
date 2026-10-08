/**
 * Text på eternitsidan (/tjanster/eternit-asbest), enda källan för EternitSEOContent.tsx och för den statiska
 * HTML:en (scripts/prerender-content.ts via data/service-page.ts).
 *
 * Underlag ad (ledning/marknad/innehall/guidetexter/ad-underlag-tjanstesida-eternit.md, Marknadschefens Grind 2026-10-04,
 * juristens A1–A8, E1–E6 och N1–N2). Ersätter rättelseversionen från 2026-10-03. Vår roll är bara att samordna med en
 * behörig saneringsfirma och lägga det nya taket. Inga årtal utan källa, inga tider, inga saneringspriser, inga
 * beskrivningar av saneringsfirmans metod, inget prov som vi tar.
 */
export type EternitFaq = { question: string; answer: string };

const ROT_ETERNIT =
  "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. Saneringsfirmans faktura använder också ditt ROT-utrymme. Då kan det bli mindre kvar till det nya taket, och vårt pris blir högre än riktpriset på prissidan, som förutsätter fullt ROT-avdrag.";

export const eternitFaqs: EternitFaq[] = [
  {
    question: "Hur vet jag om taket innehåller asbest?",
    answer: "Det går inte att se på skivorna. Behöver du veta säkert kan ett prov analyseras av ett laboratorium. Bryt inte loss en bit själv.",
  },
  {
    question: "Får man riva eternittak själv?",
    answer:
      "Ett företag som river asbest måste ha tillstånd från Arbetsmiljöverket. Borra, såga, slipa eller bryt inte i skivorna själv, och gå inte upp på taket.",
  },
  {
    question: "Kan ni riva eternittaket?",
    answer: "Nej. Vi samordnar med en behörig saneringsfirma som river det. Vi lägger det nya taket.",
  },
  {
    question: "Vad kostar det att byta ett eternittak?",
    answer: "Det nya taket får du fast pris på i vår offert. Hur saneringen prissätts framgår av offerten.",
  },
  { question: "Får jag ROT-avdrag?", answer: ROT_ETERNIT },
];

export const eternitSections: { heading: string; level: 2 | 3; paragraphs: string[] }[] = [
  {
    heading: "Byta eternittak: saneringen görs av en firma med tillstånd",
    level: 2,
    paragraphs: [
      "Eternit är skivor av asbestcement. Ska ett sådant tak bytas är arbetet delat mellan två företag: en saneringsfirma river det gamla taket, och vi lägger det nya.",
    ],
  },
  {
    heading: "Pris",
    level: 3,
    paragraphs: [
      "Hur saneringen prissätts, och vem du får fakturan från, framgår av offerten. Vårt fasta pris gäller det som står i vår offert.",
      "Riktpriser per takmaterial för det nya taket finns på prissidan. " + ROT_ETERNIT,
    ],
  },
  {
    heading: "Rör inte skivorna själv",
    level: 3,
    paragraphs: [
      "Borra, såga, slipa eller bryt inte i skivorna själv, och gå inte upp på taket. Varför, och vad Arbetsmiljöverket skriver om asbest, står i guiden om eternittak och asbest.",
    ],
  },
  {
    heading: "Vilket tak efteråt?",
    level: 3,
    paragraphs: [
      "Ett hus som har haft lätta skivor på taket är inte säkert byggt för tunga pannor. Vad takstolarna klarar kan behöva bedömas av en konstruktör innan ett tyngre material väljs. Alternativen går vi igenom vid takkontrollen.",
    ],
  },
];

export const ETERNIT_FAQ_HEADING = "Vanliga frågor";

export const eternitLocal = {
  heading: "Läs vidare",
  text: "Guiden om eternittak och asbest, riktpriser och hur ett takbyte går till.",
  links: [
    { to: "/blogg/eternittak-asbest-sanering", label: "Eternittak och asbest: det här gäller inför takbyte" },
    { to: "/priser", label: "Riktpriser för nytt tak" },
    { to: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
    { to: "/projekt", label: "Våra projekt" },
  ],
};
