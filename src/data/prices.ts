/**
 * Prisdata och juristgranskade texter för /priser. EN källa för både Prices.tsx (React) och
 * scripts/prerender-content.ts (statisk HTML), så att de aldrig kan glida isär.
 */

export const priceData = [
  {
    category: "Plåttak",
    items: [
      { name: "TP20 plåttak", priceRange: "Från 1 200 kr/m² (efter ROT, inkl. moms)", description: "Lätt profilplåt som skruvas i läkten." },
      { name: "Pannplåttak", priceRange: "Från 1 300 kr/m² (efter ROT, inkl. moms)", description: "Plåtprofil som imiterar pannor. Lägre vikt än betongpannor." },
      { name: "Dubbelfalsat plåttak", priceRange: "Ca 2 000 kr/m² (efter ROT, inkl. moms)", description: "Släta band utan synliga skruvar." },
    ],
  },
  {
    category: "Panntak",
    items: [
      { name: "Betongpannetak", priceRange: "Från 1 200 kr/m² (efter ROT, inkl. moms)", description: "Pannat tak, flera kulörer." },
      { name: "Lertegeltak", priceRange: "Från 1 300 kr/m² (efter ROT, inkl. moms)", description: "Bränd lera som åldras med patina." },
    ],
  },
  {
    category: "Övriga tjänster",
    items: [
      { name: "Takrenovering", priceRange: "Fast pris efter kostnadsfri takkontroll", description: "Beroende på skadans omfattning. Alltid fast pris efter kostnadsfri takkontroll." },
      { name: "Takavvattning (hängrännor)", priceRange: "Från ca 23 000 kr (efter ROT, inkl. moms)", description: "Komplett system med stuprör, beroende på husets storlek och våningar." },
      { name: "Takkontroll", priceRange: "Kostnadsfritt", description: "En av våra säljare tittar på taket på plats. Du får en rapport om takets skick." },
    ],
  },
  {
    category: "Tillval",
    items: [
      { name: "Råspontbyte", priceRange: "Från 300 kr/m² (efter ROT, inkl. moms)", description: "Byte av skadat underlag vid takbyte." },
      { name: "Skorstensinklädnad", priceRange: "Från 7 000 kr (efter ROT, inkl. moms)", description: "Byte av skorstenskrans eller ny hel inklädnad av skorstenen." },
      { name: "Takstege + gångbrygga", priceRange: "Från 8 000 kr (efter ROT, inkl. moms)", description: "Takstege och gångbrygga." },
      { name: "Snörasskydd", priceRange: "Från 600 kr/löpmeter (efter ROT, inkl. moms)", description: "Monteras vid takfot mot entréer och gångvägar." },
    ],
  },
];

export const priceFaqs = [
  {
    question: "Vad kostar ett takbyte i Roslagen?",
    answer: "Som riktpris, efter ROT-avdrag och inkl. moms: betongpannor och TP20-plåt från 1 200 kr/m², lertegel och pannplåt från 1 300 kr/m², dubbelfalsat plåttak ca 2 000 kr/m². Exakt pris beror på takets storlek, lutning, material och skick, och vi lämnar alltid ett fast pris efter en kostnadsfri takkontroll — aldrig innan.",
  },
  {
    question: "Ingår material i priset?",
    answer: "Riktpriserna gäller material och arbete. Byggställning ingår. Tillägg kan tillkomma vid komplex ställning, och det framgår alltid i offerten. Vad som ingår i ditt pris står i offerten. Vi arbetar endast till fast pris.",
  },
  {
    question: "Kan jag använda ROT-avdrag?",
    answer: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. Vi drar av ROT på fakturan och begär utbetalningen från Skatteverket. Priserna på den här sidan förutsätter fullt ROT-avdrag och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre.",
  },
  {
    question: "Kostar det extra på öar i skärgården?",
    answer: "Till en ö utan bilväg behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. Ditt pris står i offerten och är fast.",
  },
  {
    question: "Hur lång tid tar ett takbyte?",
    answer: "Det beror på takets storlek, underlagets skick och vädret. Tiden går vi igenom innan arbetet börjar.",
  },
];

export const PRICE_HERO_TEXT =
  "Riktpriserna nedan gäller efter ROT-avdrag och inkl. moms, med standardställning. Fast pris lämnas alltid efter en kostnadsfri takkontroll. Som privatperson kan du få ROT-avdrag (30 % på arbetskostnaden), som dras av direkt på fakturan.";

export const PRICE_NOTE =
  "Riktpriser nedan är efter ROT-avdrag och inkl. moms, med standardställning. Byggställning ingår. Tillägg kan tillkomma vid komplex ställning, och det framgår alltid i offerten. Priserna förutsätter fullt ROT-avdrag: 30 % av arbetskostnaden, högst 50 000 kr per person och år, och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre. Exakt pris för ditt tak får du alltid skriftligt efter en kostnadsfri takkontroll.";

export const PRICE_ROT_TITLE = "Så fungerar ROT-avdraget vid takarbeten";
export const PRICE_ROT_TEXT =
  "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. Vi drar av ROT på fakturan och begär utbetalningen från Skatteverket. Priserna på den här sidan förutsätter fullt ROT-avdrag och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre.";

export const PRICE_FACTORS_TITLE = "Vad avgör priset på just ditt tak?";
export const PRICE_FACTORS_TEXT =
  "Priset styrs av materialval, takets storlek och form, underlagets skick, taklutning och tillgänglighet, samt detaljer som skorstenar, plåtbeslag och hängrännor. Därför lämnar vi aldrig ett pris utan att först ha sett taket.";

/** ROT-förbehållet (juristens text, godkänd 2026-10-04). Står bara här; withRotForbehall() lägger det intill varje pristext med kr/m². */
export const ROT_FORBEHALL =
  "Priserna förutsätter fullt ROT-avdrag: 30 % av arbetskostnaden, högst 50 000 kr per person och år, och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre.";

const SHOWS_PRICE = /kr\/m²|kr\/löpmeter/;

/** Lägger ROT-förbehållet efter en pristext som visar kr/m² eller kr/löpmeter (en gång, inte på text som redan har det). */
export const withRotForbehall = (text: string): string =>
  SHOWS_PRICE.test(text) && !text.includes("Utan ROT") ? `${text.trimEnd()} ${ROT_FORBEHALL}` : text;
