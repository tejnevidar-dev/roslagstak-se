/**
 * Prisdata och juristgranskade texter för /priser. EN källa för både Prices.tsx (React) och
 * scripts/prerender-content.ts (statisk HTML), så att de aldrig kan glida isär.
 */

export const priceData = [
  {
    category: "Plåttak",
    items: [
      { anchor: "plattak", name: "TP20 plåttak", priceRange: "Från 1 200 kr/m² (efter ROT, inkl. moms)", description: "Lätt profilplåt som skruvas i läkten." },
      { name: "Pannplåttak", priceRange: "Från 1 300 kr/m² (efter ROT, inkl. moms)", description: "Plåtprofil som imiterar pannor. Lägre vikt än betongpannor." },
      { name: "Dubbelfalsat plåttak", priceRange: "Ca 2 000 kr/m² (efter ROT, inkl. moms)", description: "Släta band utan synliga skruvar." },
    ],
  },
  {
    category: "Panntak",
    items: [
      { anchor: "betongpannor", name: "Betongpannetak", priceRange: "Från 1 200 kr/m² (efter ROT, inkl. moms)", description: "Pannat tak, flera kulörer." },
      { anchor: "tegeltak", name: "Lertegeltak", priceRange: "Från 1 300 kr/m² (efter ROT, inkl. moms)", description: "Bränd lera som åldras med patina." },
    ],
  },
  {
    category: "Övriga tjänster",
    items: [
      { name: "Takrenovering", priceRange: "Fast pris efter kostnadsfri takkontroll", description: "Beroende på skadans omfattning. Fast pris i offerten efter kostnadsfri takkontroll." },
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
    answer: "Som riktpris, efter ROT-avdrag och inkl. moms: betongpannor och TP20-plåt från 1 200 kr/m², lertegel och pannplåt från 1 300 kr/m², dubbelfalsat plåttak ca 2 000 kr/m². Exakt pris beror på takets storlek, lutning, material och skick. Du får ett fast pris i offerten efter en kostnadsfri takkontroll.",
  },
  {
    question: "Ingår material i priset?",
    answer: "Riktpriserna gäller material och arbete. Byggställning ingår. Tillägg kan tillkomma vid komplex ställning, och det framgår i offerten. Vad som ingår i ditt pris står i offerten. Vi arbetar endast till fast pris.",
  },
  {
    question: "Kan jag använda ROT-avdrag?",
    answer: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. Har du rätt till ROT-avdrag drar vi av det på fakturan och begär utbetalningen från Skatteverket. Priserna på den här sidan förutsätter fullt ROT-avdrag och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre.",
  },
  {
    question: "Kostar det extra på öar i skärgården?",
    answer: "Har ditt hus ingen bilväg: berätta var det ligger när du hör av dig. Ditt pris står i offerten och är fast.",
  },
  {
    question: "Hur lång tid tar ett takbyte?",
    answer: "Det beror på takets storlek, underlagets skick och vädret. Tiden går vi igenom innan arbetet börjar.",
  },
];

export const PRICE_HERO_TEXT =
  "Riktpriserna nedan gäller efter ROT-avdrag och inkl. moms, med standardställning. Fast pris i offerten efter en kostnadsfri takkontroll. Som privatperson kan du få ROT-avdrag (30 % på arbetskostnaden), som dras av direkt på fakturan.";

/** Ställningsmeningen, ordagrant som på /priser. Används också på material- och tjänstesidornas prisavsnitt. */
export const STALLNING_MENING = "Byggställning ingår. Tillägg kan tillkomma vid komplex ställning, och det framgår i offerten.";

/** Papptak finns inte i prislistan på /priser. Riktpriset är CRM:s standardpris (900 kr/m² efter ROT, inkl. moms) och visas bara på materialsidan. */
export const PAPPTAK_RIKTPRIS = {
  name: "Papptak",
  priceRange: "Ca 900 kr/m² (efter ROT, inkl. moms)",
  description: "Papptak med underlag och underlagspapp.",
};

const alla = [...priceData.flatMap((c) => c.items), PAPPTAK_RIKTPRIS];

/** Prisposten med det namnet i prislistan. Kastar om den saknas, så att en omdöpt post aldrig tyst tappar sitt belopp. */
export const prisPost = (name: string): { name: string; priceRange: string; description: string } => {
  const post = alla.find((i) => i.name === name);
  if (!post) throw new Error(`Prisposten "${name}" finns inte i prices.ts`);
  return post;
};

/** Beloppet med inledande versal och utan märkningen, t.ex. "Från 1 200 kr/m²". */
export const belopp = (name: string): string => prisPost(name).priceRange.replace(/\s*\(efter ROT, inkl\. moms\)/, "");

/** Beloppet för löpande text, t.ex. "från 1 200 kr/m²" eller "ca 2 000 kr/m²". */
export const beloppLopande = (name: string): string => {
  const b = belopp(name);
  return b.charAt(0).toLowerCase() + b.slice(1);
};

export const PRICE_NOTE =
  "Riktpriser nedan är efter ROT-avdrag och inkl. moms, med standardställning. " +
  STALLNING_MENING +
  " Priserna förutsätter fullt ROT-avdrag: 30 % av arbetskostnaden, högst 50 000 kr per person och år, och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre. Du får ett fast pris i offerten efter en kostnadsfri takkontroll.";

export const PRICE_ROT_TITLE = "Så fungerar ROT-avdraget vid takarbeten";
export const PRICE_ROT_TEXT =
  "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. Har du rätt till ROT-avdrag drar vi av det på fakturan och begär utbetalningen från Skatteverket. Priserna på den här sidan förutsätter fullt ROT-avdrag och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre.";

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
