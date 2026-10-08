/**
 * Startsidans avsnitt "Om RoslagsTak" och "Så jobbar vi" (About.tsx): texterna delas av komponenten (React) och av
 * scripts/prerender-content.ts (statisk HTML), så att besökaren och sökmotorn får samma ord (AC4). Ändra texten här, inte i komponenten.
 */
import { GARANTI_RENOVERING_CHIP } from "@/data/guarantee";

export const HOME_ABOUT_CAPTION = { eyebrow: "Bas i Norrtälje", text: "Riktiga tak, riktiga bilder" };

export const HOME_ABOUT_INTRO = {
  eyebrow: "Om RoslagsTak",
  headingA: "Ett tak som håller,",
  headingB: "och en kontaktperson som svarar.",
};

export const HOME_ABOUT_P1 =
  "RoslagsTak har sin bas i Norrtälje och byter och lägger om tak på villor och fritidshus i Roslagen, Storstockholm och Mälardalen. Vi lägger betongpannor, lertegel, TP20-plåt, dubbelfalsat plåttak och papptak, och gör takomläggningar, takreparationer och plåtarbeten. Allt arbete utförs enligt AMA, och du får alltid ett fast pris.";
export const HOME_ABOUT_P2 =
  "Det som gör skillnad för dig som kund är att du har en och samma kontaktperson genom hela processen, från takkontrollen till färdigt tak. Takkontrollen är kostnadsfri och utan förpliktelser: en av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris – kostnadsfritt och utan förpliktelser. Du bestämmer själv om och när.";
/** Tredje stycket har två länkar i React ("Projekt" och "Recensioner"); delarna ligger var för sig så att länkarna kan ritas. */
export const HOME_ABOUT_P3 = {
  before:
    "Vi visar bara riktiga jobb. På Blidö i Norrtälje fick ett hus sommaren 2026 ett komplett takbyte med nytt underlag, ny läkt, svarta betongpannor från Benders, nya plåtdetaljer, skorstensbeslag och hängrännor. På Singö i Norrtälje kommun blev ett takbyte klart i september 2026, med röda betongpannor på huvudtaket, röd TP20-plåt på de lägre delarna och delvis ny råspont. I Grisslehamn fick ett hus i september 2026 ett komplett takbyte med svarta betongpannor från Benders. Alla tre jobben finns med bilder under ",
  linkProjects: "Projekt",
  middle: ", och våra omdömen från Google finns under ",
  linkReviews: "Recensioner",
  after: ".",
};
export const homeAboutP3Text = () =>
  `${HOME_ABOUT_P3.before}${HOME_ABOUT_P3.linkProjects}${HOME_ABOUT_P3.middle}${HOME_ABOUT_P3.linkReviews}${HOME_ABOUT_P3.after}`;

export const HOME_ABOUT_BENEFITS = [
  "En kontaktperson genom hela processen",
  "Fast pris efter kostnadsfri takkontroll",
  "10 års utförandegaranti",
  GARANTI_RENOVERING_CHIP,
  "ROT-avdraget dras direkt på fakturan",
  "Roslagen, Storstockholm och Mälardalen",
];

export const HOME_WORKFLOW = {
  eyebrow: "Så jobbar vi",
  heading: "Så jobbar vi",
  intro: "Fyra saker som styr hur vi tar hand om dig och ditt tak.",
};

/** Ikonen väljs i komponenten (About.tsx) efter ordningen. */
export const HOME_CORE_VALUES = [
  {
    title: "Tillgänglighet",
    description:
      "Du ska aldrig behöva jaga din takfirma. Vi svarar inom 24 timmar, och takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19.",
  },
  {
    title: "En kontaktperson",
    description:
      "Samma person tar hand om dig från första kontakten till färdigt tak. Du behöver inte förklara ditt tak för någon ny på vägen.",
  },
  {
    title: "Tydliga villkor",
    description:
      "Fast pris i offerten, där det framgår vad som ingår. 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. ROT-avdraget på 30 % av arbetskostnaden dras direkt på fakturan.",
  },
  {
    title: "Hantverk enligt AMA",
    description:
      "Vi arbetar enligt AMA, branschens gemensamma beskrivning av hur material och utförande ska vara. Det är i underlaget, infästningen och plåtdetaljerna som ett tak avgörs.",
  },
];
