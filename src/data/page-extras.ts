/**
 * Förstärkningsavsnitt och FAQ för /tjanster/tegeltak, /material/betongpannor och /material/tp20-plattak
 * (Marknadschefens åtgärdslista, backlog 1bx, 2026-10-04). Texten är ordagrant ur Innehålls godkända underlag
 * (innehall/underlag-forstark-tegeltak-2026-10-04.md och underlag-forstark-betongpannor-tp20-2026-10-04.md).
 * Belopp hämtas ur prices.ts (aldrig för hand). Tilläggens belopp visas inte på de här sidorna: de står på /priser.
 * Delas av React-sidorna och scripts/prerender-content.ts (statisk HTML) via de rena datastrukturerna.
 */
import { beloppLopande, prisPost, ROT_FORBEHALL, STALLNING_MENING } from "./prices";

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
  "Vad som ingår står i offerten. Ett komplett takbyte omfattar normalt nytt underlag, ny läkt, nytt ytmaterial och nya plåtdetaljer, och byggställning ingår. Tillägg kan tillkomma vid komplex ställning, och det framgår i offerten.";

/** Juristens mening vid belopp som i prislistan är tillägg vid takbyte (backlog 1by, tills Vidar har svarat på 10y). */
const TILLAGG_MENING = "Priserna gäller när arbetet görs i samband med ett takbyte. Som eget arbete sätts priset efter takkontrollen.";

/** Samma juristmening som TILLAGG_MENING, i singular (sidor med ett enda belopp). */
const TILLAGG_MENING_SG = "Priset gäller när arbetet görs i samband med ett takbyte. Som eget arbete sätts priset efter takkontrollen.";

export const SERVICE_EXTRAS: Record<string, PageExtras> = {
  takkupor: {
    blocks: [
      {
        heading: "Så går det till",
        items: [
          "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris, kostnadsfritt och utan förpliktelser. Tillägg görs bara efter ditt godkännande.",
          "Runt en kupa eller ett takfönster möter taket en ny del, och anslutningen görs i plåt. Mer om plåten på taket finns på sidan om [plåtarbeten](/tjanster/platarbeten).",
        ],
      },
      {
        heading: "Vilka vi är",
        items: ["Vi är en takfirma med bas i Norrtälje och tar uppdrag i Roslagen och Storstockholm. Du har en kontaktperson genom hela processen."],
      },
      {
        heading: "Boka",
        items: [
          "Takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19. Boka på [roslagstak.se/takkontroll](/takkontroll) eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
        ],
      },
    ],
    faqHeading: "Vanliga frågor om takkupor och takfönster",
    faqs: [
      { question: "Vad kostar en takkupa eller ett takfönster?", answer: "Priset beror på taket, och det går inte att säga innan någon har tittat på det. Efter den kostnadsfria takkontrollen får du en offert med fast pris. Tillägg görs bara efter ditt godkännande." },
      { question: "Måste jag bestämma mig vid takkontrollen?", answer: "Nej. Takkontrollen är kostnadsfri och utan förpliktelser. Du betalar inget och binder dig inte." },
      { question: "Hur bokar jag?", answer: "Fyll i formuläret eller ring 070-154 36 39. Vi svarar inom 24 timmar. Takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19." },
    ],
    links: [
      { to: "/tjanster/platarbeten", label: "Plåtarbeten" },
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
    ],
  },
  platarbeten: {
    blocks: [
      {
        heading: "Plåtdetaljerna, en i taget",
        items: [
          "På nästan varje tak finns plåt, också på tak med pannor. Plåten sitter där två ytor möts och vattnet behöver ledas rätt.",
          {
            list: [
              "**Fotplåt.** Sitter längst ner vid takfoten och leder vattnet ner i hängrännan.",
              "**Ränndal.** Plåten i [vinkeln där två takfall möts](/takproblem/lackande-ranndal). Hit rinner vatten från två håll.",
              "**Skorstensbeslag.** Plåten runt skorstenen, där den [går igenom taket](/takproblem/lackage-vid-skorsten).",
              "**Genomföringar.** Plåt eller stosar runt rör och ventilation som går genom taket.",
              "**Vindskiveplåt.** Plåten längs takets kant på gaveln.",
            ],
          },
        ],
      },
      {
        heading: "Plåtarbeten runt skorstenen",
        items: [
          "Skorstensbeslaget är plåten runt skorstenen, där den går igenom taket. Många läckage börjar inte mitt på takytan, utan vid en anslutning: runt skorstenen, i ränndalen eller vid en genomföring. [Fuktfläckar i taket eller på väggen nära skorstenen](/takproblem/lackage-vid-skorsten) kan bero på att beslaget har släppt, rostat eller spruckit, eller på att fogen mellan beslag och murverk har släppt. När ett tak byts görs skorstensbeslaget om tillsammans med de andra plåtdetaljerna. Beslaget kan också göras om för sig, på ett tak som i övrigt ligger kvar.",
        ],
      },
      {
        heading: "Det här kan du se från marken",
        items: [
          {
            list: [
              "Plåt som har släppt, bucklat eller rostat.",
              "Mörka ränder på skorstenen eller på fasaden under takfoten.",
              "Hängrännor som svämmar över eller hänger snett.",
            ],
          },
          "Gå inte upp på taket.",
        ],
      },
      {
        heading: "Det här har ett eget pris, och var vi arbetar",
        items: [
          `Plåtdetaljerna ingår normalt i ett takbyte. Skorstensinklädnad prissätts för sig: ${beloppLopande("Skorstensinklädnad")}, efter ROT-avdrag och inkl. moms.`,
          TILLAGG_MENING_SG,
          ROT_FORBEHALL,
          "Hängrännor och stuprör beskriver vi på sidan om [takavvattning](/tjanster/takavvattning). Ditt pris står i offerten och är fast.",
          "Vi är en takfirma med bas i Norrtälje och gör plåtarbeten på tak i Roslagen och Storstockholm.",
        ],
      },
    ],
    faqHeading: "Vanliga frågor om plåtarbeten",
    faqs: [
      { question: "Kan ni göra om plåten runt skorstenen utan att byta taket?", answer: "Ja. Beslag, fotplåt och ränndalar kan göras om för sig, men pannorna närmast behöver lyftas undan under arbetet." },
      { question: "Ingår plåtdetaljerna i ett takbyte?", answer: "Plåtdetaljerna ingår normalt i ett takbyte. Vad som ingår för ditt tak står i offerten." },
      { question: "Vad är skillnaden mellan dubbelfalsat och TP20?", answer: "Dubbelfalsat har dolda klammer och uppstående falsar. TP20 är en trapetsprofilerad plåt som skruvas genom plåten." },
      { question: "Är priset fast?", answer: PRIS_FAST },
      { question: "Gäller ROT-avdraget?", answer: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar." },
      { question: "Vilken garanti gäller?", answer: "Vi lämnar 10 års utförandegaranti på det arbete vi utför. När ett nytt tätskikt läggs, som vid takbyte och takomläggning, gäller dessutom 30 års tätskiktsgaranti via MATAKI." },
    ],
    links: [
      { to: "/blogg/platslagare-norrtalje-guide", label: "Plåten på taket: detaljerna en i taget" },
      { to: "/blogg/bandtackning-tak-guide", label: "Bandtäckning: så går det till" },
      { to: "/blogg/tp20-eller-dubbelfalsat-platttak", label: "TP20 eller dubbelfalsat plåttak" },
      { to: "/blogg/korrugerad-plat-falsad-plat", label: "Korrugerad eller falsad plåt" },
      { to: "/blogg/platttak-ljud-regn-skargardshus", label: "Ljud från plåttak vid regn" },
      { to: "/material/tp20-plattak", label: "Plåttak (TP20)" },
      { to: "/material/pannplat", label: "Pannplåt" },
      { to: "/tjanster/takavvattning", label: "Takavvattning" },
    ],
  },
  taksakerhet: {
    blocks: [
      {
        heading: "När monteras taksäkerhet?",
        items: [
          "**När taket ändå görs om.** Det naturliga tillfället är ett takbyte. Fästena kan då sättas innan det nya takmaterialet läggs, och det står i samma offert.",
          "**På taket som det är.** Det går också att komplettera ett tak som inte ska bytas. Var fästena kan sitta beror på hur taket är byggt, och det går vi igenom vid takkontrollen.",
        ],
      },
      {
        heading: "Titta på det du redan har, och var vi arbetar",
        items: [
          "Har huset redan takstege, gångbrygga eller snörasskydd är det värt att titta på dem från marken efter en vinter med mycket snö: sitter fästena kvar, har något böjts, syns det rost? Gå inte upp på taket för att känna efter.",
          "Vi är en takfirma med bas i Norrtälje och monterar takstege, gångbrygga och snörasskydd i Roslagen och Storstockholm.",
        ],
      },
    ],
    faqHeading: "Vanliga frågor om takstege och snörasskydd",
    faqs: [
      { question: "Kan ni montera takstege utan att byta tak?", answer: "Ja, en takstege går att sätta upp på ett tak som ligger kvar." },
      { question: "Måste jag ha snörasskydd?", answer: "Det svarar vi inte på här. Vad som gäller för ditt hus avgör kommunens byggnadsnämnd." },
      { question: "Kan jag få ROT-avdrag?", answer: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan." },
      { question: "Vilken garanti gäller?", answer: "Vi lämnar 10 års utförandegaranti på det arbete vi utför." },
    ],
  },
  takrenovering: {
    blocks: [
      {
        heading: "Vad kostar en takrenovering?",
        items: [
          "En takrenovering har inget riktpris per kvadratmeter. Priset beror på vad som behöver åtgärdas, och det går inte att säga innan någon har tittat på taket. Därför börjar vi med en kostnadsfri takkontroll. Efter den får du en offert med fast pris, och tillägg görs bara efter ditt godkännande.",
        ],
      },
      {
        heading: "Delar som har ett riktpris",
        items: [
          "Några av de arbeten som kan ingå i en renovering har riktpriser i vår prislista, efter ROT-avdrag och inkl. moms:",
          {
            list: [
              `Byte av råspont: ${prisPost("Råspontbyte").priceRange}`,
              `Skorstensinklädnad: ${prisPost("Skorstensinklädnad").priceRange}`,
              `Hängrännor med stuprör, komplett: ${prisPost("Takavvattning (hängrännor)").priceRange}`,
            ],
          },
          TILLAGG_MENING,
          ROT_FORBEHALL,
          "Alla riktpriser finns på [prissidan](/priser). Ditt pris står i offerten och är fast.",
        ],
      },
      {
        heading: "Det här påverkar priset",
        items: [
          {
            list: [
              "**Hur mycket som är skadat.** Några pannor eller ett beslag är en liten åtgärd. Skador på flera ställen är en större.",
              "**Underlagets skick.** Hur råsponten mår syns först när ytmaterialet lyfts. Då får du besked och pris innan vi går vidare.",
              "**Detaljerna.** Skorstenar, takfönster och genomföringar tar både tid och material.",
              "**Lutning och åtkomst.** Ett brant tak kräver mer säkerhetsarbete, och ett hus som är svårt att komma åt kräver mer planering.",
            ],
          },
        ],
      },
      {
        heading: "Renovering, omläggning eller takbyte?",
        items: [
          "En reparation åtgärdar en avgränsad skada, till exempel några pannor eller plåten runt skorstenen. En takomläggning innebär att ytmaterialet lyfts av, underlaget byts och ny läkt läggs. Vid ett takbyte görs allt nytt, också ytmaterialet. När skadorna är avgränsade kan en renovering räcka. Är underlaget slitet över stora delar av taket, eller återkommer läckorna på flera ställen, kan en omläggning eller ett takbyte vara rätt åtgärd. Riktpriser för takbyte per material finns på [prissidan](/priser).",
        ],
      },
    ],
    faqHeading: "Vanliga frågor om takrenovering och pris",
    faqs: [
      { question: "Vad kostar en takrenovering?", answer: "Det beror på vad som behöver åtgärdas. Du får ett fast pris i offerten efter en kostnadsfri takkontroll." },
      { question: "Kostar takkontrollen något?", answer: "Nej. Takkontrollen är kostnadsfri och utan förpliktelser." },
      { question: "Kan ni laga bara läckan?", answer: "Ja, när skadan är avgränsad. Vad som behövs på ditt tak går vi igenom vid takkontrollen, och det står i offerten." },
      { question: "Gäller ROT-avdraget?", answer: ROT },
      { question: "Vad händer om ni hittar mer när ni börjar?", answer: "Då får du besked och pris innan vi går vidare. Inget extraarbete görs utan ditt godkännande." },
      { question: "Vilken garanti gäller?", answer: "Vi lämnar 10 års utförandegaranti på det arbete vi utför." },
    ],
    links: [
      { to: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
      { to: "/blogg/tecken-byta-tak", label: "Tecken på att taket behöver bytas" },
      { to: "/blogg/lagga-om-tak-vad-kostar-det", label: "Lägga om tak: vad kostar det?" },
      { to: "/blogg/kostnad-takbyte-2026", label: "Vad kostar takbyte 2026?" },
      { to: "/blogg/rot-avdrag-takbyte", label: "ROT-avdrag vid takbyte" },
      { to: "/blogg/takrenovering-stockholm-guide", label: "Takrenovering i Stockholm" },
    ],
  },
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
      { to: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
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
      { to: "/blogg/platttak-ljud-regn-skargardshus", label: "Ljud från plåttak vid regn" },
      { to: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
    ],
  },
};
