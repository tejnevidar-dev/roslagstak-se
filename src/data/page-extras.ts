/**
 * Förstärkningsavsnitt och FAQ för /tjanster/tegeltak, /material/betongpannor och /material/tp20-plattak
 * (Marknadschefens åtgärdslista, backlog 1bx, 2026-10-04). Texten är ordagrant ur Innehålls godkända underlag
 * (innehall/underlag-forstark-tegeltak-2026-10-04.md och underlag-forstark-betongpannor-tp20-2026-10-04.md).
 * Belopp hämtas ur prices.ts (aldrig för hand). Tilläggens belopp visas inte på de här sidorna: de står på /priser.
 * Delas av React-sidorna och scripts/prerender-content.ts (statisk HTML) via de rena datastrukturerna.
 */
import { beloppLopande, STALLNING_MENING } from "./prices";

export type ExtraItem = string | { list: string[] };
export interface ExtraBlock {
  heading: string;
  items: ExtraItem[];
}
export interface ExtraFaq {
  question: string;
  answer: string;
}
export interface PageExtras {
  blocks: ExtraBlock[];
  faqHeading: string;
  faqs: ExtraFaq[];
  /** Internlänkar som läggs i "Relaterat innehåll" (tjänstesidor). */
  links?: { to: string; label: string }[];
}

const FRAN = '"Från" är det enklaste fallet: ett tak med enkel form och god åtkomst. Riktpriset är efter ROT-avdrag och inkl. moms. Ditt pris står i offerten och är fast.';
const ROT = "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar.";
const PRIS_FAST = "Ja. Priset i offerten är fast, och tillägg görs bara efter ditt godkännande.";
const BYGGLOV =
  "För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.";
const FOUND = "Skadad råspont syns först när det gamla taket är rivet. Då får du besked och pris innan vi går vidare, och inget extraarbete görs utan ditt godkännande.";
const BARIGHET = "Takstolarna behöver klara vikten, och har huset haft ett lättare tak kan bärigheten behöva bedömas av en konstruktör.";
const INGAR =
  "Vad som ingår står alltid i offerten. Ett komplett takbyte omfattar normalt nytt underlag, ny läkt, nytt ytmaterial och nya plåtdetaljer, och byggställning ingår. Tillägg kan tillkomma vid komplex ställning, och det framgår alltid i offerten.";

export const SERVICE_EXTRAS: Record<string, PageExtras> = {
  tegeltak: {
    blocks: [
      { heading: 'Vad betyder "från"?', items: [FRAN] },
      {
        heading: "Vad påverkar priset på ett tegeltak?",
        items: [
          {
            list: [
              "**Takets storlek och form.** Fler kvadratmeter betyder mer material och mer arbete. Ett rakt sadeltak är enklare än ett tak med vinklar, ränndalar, kupor och flera nivåer.",
              "**Underlagets skick.** Hur råsponten mår syns först när det gamla taket är av.",
              "**Detaljerna.** Skorstenar, takfönster, genomföringar, hängrännor och stuprör, snörasskydd och takstege tar både tid och material.",
              "**Lutning och åtkomst.** Ett brant tak kräver mer säkerhetsarbete, och ett hus som är svårt att komma åt kräver mer planering.",
              "**Pannorna.** Vid en omläggning kan hela tegelpannor ibland läggas tillbaka. Det beror på pannornas skick, och vad som gäller för ditt tak står i offerten.",
            ],
          },
        ],
      },
      {
        heading: "Det här ingår, och det här kan tillkomma",
        items: [
          INGAR,
          "Råspont som behöver bytas, skorstensinklädnad, takstege, snörasskydd och hängrännor prissätts för sig och står i offerten om de ingår. Riktpriserna för dem finns på [prissidan](/priser).",
          FOUND,
        ],
      },
      {
        heading: "Lertegel, betongpannor eller pannplåt?",
        items: [
          "Lertegel och betongpannor ger båda ett pannat tak. Lertegel är bränd lera, betongpannor är gjutna av betong, och pannplåt är plåt som är pressad för att likna pannor. Riktpriserna står i tabellen ovan. Lertegel och betongpannor är tunga, och pannplåt väger mindre. Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.",
        ],
      },
    ],
    faqHeading: "Vanliga frågor om pris på tegeltak",
    faqs: [
      {
        question: "Vad kostar ett tegeltak?",
        answer: `Riktpriset för lertegel är ${beloppLopande("Lertegeltak")}, efter ROT-avdrag och inkl. moms. Exakt pris beror på takets storlek, lutning och underlagets skick. Ditt pris står i offerten och är fast.`,
      },
      { question: "Är priset fast?", answer: PRIS_FAST },
      { question: "Ingår byggställning?", answer: STALLNING_MENING },
      { question: "Gäller ROT-avdraget?", answer: ROT },
      {
        question: "Kan de gamla tegelpannorna läggas tillbaka?",
        answer: "Ibland. Det beror på pannornas skick, och det går inte att lova i förväg. Vad som gäller för ditt tak står i offerten.",
      },
      {
        question: "Klarar mitt hus ett tegeltak?",
        answer: "Lertegel är tungt. " + BARIGHET,
      },
      { question: "Behövs bygglov för att byta till tegel?", answer: BYGGLOV },
      {
        question: "Vad händer om ni hittar något när taket är rivet?",
        answer: "Då får du besked och pris innan vi går vidare. Inget extraarbete görs utan ditt godkännande.",
      },
    ],
    links: [
      { to: "/blogg/betongpannor-eller-lertegel", label: "Betongpannor eller lertegel?" },
      { to: "/blogg/kostnad-takbyte-2026", label: "Vad kostar takbyte 2026?" },
      { to: "/blogg/lagga-om-tak-vad-kostar-det", label: "Lägga om tak: vad kostar det?" },
      { to: "/blogg/jamfora-offerter-takbyte", label: "Jämföra offerter för takbyte" },
      { to: "/blogg/rot-avdrag-takbyte", label: "ROT-avdrag vid takbyte" },
      { to: "/blogg/skota-taket-betongpannor-tegel-plat", label: "Sköta taket: betongpannor, tegel och plåt" },
      { to: "/blogg/bygglov-byta-tak", label: "Bygglov vid takbyte" },
    ],
  },
};

export const MATERIAL_EXTRAS: Record<string, PageExtras> = {
  betongpannor: {
    blocks: [
      { heading: 'Vad betyder "från"?', items: [FRAN] },
      {
        heading: "Det här påverkar priset på ett tak med betongpannor",
        items: [
          {
            list: [
              "**Takets storlek och form.** Fler kvadratmeter betyder mer material och mer arbete. Ett rakt sadeltak är enklare än ett tak med vinklar, ränndalar, kupor och flera nivåer.",
              "**Underlagets skick.** Hur råsponten mår syns först när det gamla taket är av. På vårt takbyte på Blidö kunde den befintliga råsponten sitta kvar. På Singö byttes delar av den.",
              "**Detaljerna.** Skorstenar, takfönster, genomföringar, hängrännor och stuprör, snörasskydd och takstege tar både tid och material.",
              "**Lutning och åtkomst.** Ett brant tak kräver mer säkerhetsarbete, och ett hus som är svårt att komma åt kräver mer planering.",
            ],
          },
        ],
      },
      {
        heading: "Det här ingår, och det här kan tillkomma",
        items: [
          INGAR + " Råspont som behöver bytas, skorstensinklädnad, takstege, snörasskydd och hängrännor prissätts för sig och står i offerten om de ingår. Riktpriserna för dem finns på [prissidan](/priser).",
          FOUND,
        ],
      },
      {
        heading: "Två tak med betongpannor som vi har lagt",
        items: [
          "På Blidö lade vi svarta betongpannor från Benders, med nytt underlag, ny läkt, nya plåtdetaljer, skorstensbeslag och hängrännor. På Singö lade vi röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna. Bilder och uppgifter finns under [våra projekt](/projekt).",
        ],
      },
      {
        heading: "Betongpannor, lertegel eller plåt?",
        items: [
          "Betongpannor och lertegel ger båda ett pannat tak. Betongpannor är gjutna av betong och finns i flera kulörer, lertegel är bränd lera. Båda är tunga. Plåt väger mindre: TP20 är profilerad plåt med synliga skruvar, och pannplåt är plåt som är pressad för att likna pannor. Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.",
        ],
      },
    ],
    faqHeading: "Vanliga frågor om pris på betongpannor",
    faqs: [
      {
        question: "Vad kostar ett tak med betongpannor?",
        answer: `Riktpriset är ${beloppLopande("Betongpannetak")}, efter ROT-avdrag och inkl. moms. Exakt pris beror på takets storlek, lutning och underlagets skick. Ditt pris står i offerten och är fast.`,
      },
      { question: "Är priset fast?", answer: PRIS_FAST },
      { question: "Ingår byggställning?", answer: STALLNING_MENING },
      { question: "Gäller ROT-avdraget?", answer: ROT },
      {
        question: "Kan jag byta från plåt eller papp till betongpannor?",
        answer: "Betongpannor är tunga. " + BARIGHET,
      },
      { question: "Behövs bygglov för att byta takmaterial?", answer: BYGGLOV },
    ],
    links: [
      { to: "/blogg/betongpannor-eller-lertegel", label: "Betongpannor eller lertegel?" },
      { to: "/blogg/plattak-vs-betongpannor", label: "Plåttak eller betongpannor?" },
      { to: "/blogg/kostnad-takbyte-2026", label: "Vad kostar takbyte 2026?" },
      { to: "/blogg/takmalning-betongpannor", label: "Takmålning på betongpannor" },
      { to: "/blogg/skota-taket-betongpannor-tegel-plat", label: "Sköta taket: betongpannor, tegel och plåt" },
      { to: "/projekt/takbyte-singo", label: "Takbyte på Singö" },
      { to: "/projekt/takrenovering-blido", label: "Takbyte på Blidö" },
      { to: "/tjanster/tegeltak", label: "Tegeltak" },
      { to: "/material/tp20-plattak", label: "Plåttak" },
      { to: "/material/pannplat", label: "Pannplåt" },
    ],
  },
  "tp20-plattak": {
    blocks: [
      {
        heading: "Tre sorters plåttak",
        items: [
          "Plåttak är inte en sak. TP20 är trapetsprofilerad plåt i stora skivor som skruvas i läkten, med synliga skruvar. Pannplåt är plåt som är pressad för att likna pannor. Dubbelfalsad plåt läggs i banor som falsas ihop, utan synliga skruvar, och kräver mer hantverk i utförandet. Riktpriset för var och en står i prisavsnittet här ovanför. Mer om pannplåt finns på sidan om [pannplåt](/material/pannplat) och om dubbelfalsat under [plåtarbeten](/tjanster/platarbeten).",
        ],
      },
      {
        heading: 'Vad betyder "från" och "ca"?',
        items: [
          '"Från" är det enklaste fallet: ett tak med enkel form och god åtkomst. "Ca" är ett normalpris. Riktpriserna är efter ROT-avdrag och inkl. moms. Ditt pris står i offerten och är fast.',
        ],
      },
      {
        heading: "Det här påverkar priset på ett plåttak",
        items: [
          {
            list: [
              "**Takets storlek och form.** Fler kvadratmeter betyder mer material och mer arbete. Ett rakt sadeltak är enklare än ett tak med vinklar, ränndalar, kupor och flera nivåer.",
              "**Vilken plåt.** De tre sorterna har olika riktpris, se ovan.",
              "**Underlagets skick.** Hur råsponten mår syns först när det gamla taket är av.",
              "**Detaljerna.** Skorstenar, takfönster, genomföringar, hängrännor och stuprör, snörasskydd och takstege tar både tid och material.",
              "**Lutning och åtkomst.** Ett brant tak kräver mer säkerhetsarbete, och ett hus som är svårt att komma åt kräver mer planering.",
            ],
          },
        ],
      },
      {
        heading: "Det här ingår, och det här kan tillkomma",
        items: [
          INGAR + " Råspont som behöver bytas, skorstensinklädnad, takstege, snörasskydd och hängrännor prissätts för sig och står i offerten om de ingår. Riktpriserna för dem finns på [prissidan](/priser).",
          FOUND,
        ],
      },
      {
        heading: "TP20 på Singö",
        items: [
          "På Singö lade vi röd TP20-plåt på de lägre delarna av huset och röda betongpannor på huvudtaket. Bilder och uppgifter finns under [takbytet på Singö](/projekt/takbyte-singo).",
        ],
      },
    ],
    faqHeading: "Vanliga frågor om pris på plåttak",
    faqs: [
      {
        question: "Vad kostar ett plåttak?",
        answer: `Det beror på vilken plåt. Riktpriset för TP20 är ${beloppLopande("TP20 plåttak")}, för pannplåt ${beloppLopande("Pannplåttak")} och för dubbelfalsad plåt ${beloppLopande("Dubbelfalsat plåttak")}, efter ROT-avdrag och inkl. moms. Ditt pris står i offerten och är fast.`,
      },
      {
        question: "Vad är skillnaden mellan TP20 och dubbelfalsat?",
        answer: "TP20 skruvas fast med synliga skruvar. Dubbelfalsad plåt falsas ihop och har inga synliga skruvar.",
      },
      {
        question: "Kan plåt läggas på ett hus som har haft pannor?",
        answer: "Plåt väger mindre än pannor. Om taket och lutningen passar för plåt går vi igenom vid takkontrollen, och materialet står i offerten.",
      },
      { question: "Är priset fast?", answer: PRIS_FAST },
      { question: "Ingår byggställning?", answer: STALLNING_MENING },
      { question: "Gäller ROT-avdraget?", answer: ROT },
      { question: "Behövs bygglov för att byta till plåt?", answer: BYGGLOV },
    ],
    links: [
      { to: "/blogg/plattak-vs-betongpannor", label: "Plåttak eller betongpannor?" },
      { to: "/blogg/kostnad-takbyte-2026", label: "Vad kostar takbyte 2026?" },
      { to: "/blogg/mala-plattak-guide-pris", label: "Måla plåttak" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten" },
      { to: "/material/pannplat", label: "Pannplåt" },
      { to: "/projekt/takbyte-singo", label: "Takbyte på Singö" },
    ],
  },
};
