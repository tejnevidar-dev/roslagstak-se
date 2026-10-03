/**
 * Prisdata och juristgranskade texter för /priser. EN källa för både Prices.tsx (React) och
 * scripts/prerender-content.ts (statisk HTML), så att de aldrig kan glida isär.
 */

export const priceData = [
  {
    category: "Plåttak",
    items: [
      { name: "TP20 plåttak", priceRange: "Från 1 200 kr/m² (efter ROT, inkl. moms)", description: "Prisvärt och populärt val för fritidshus och enklare byggnader." },
      { name: "Pannplåttak", priceRange: "Från 1 300 kr/m² (efter ROT, inkl. moms)", description: "Plåtprofil som imiterar pannor. Lägre vikt än betongpannor." },
      { name: "Plegelplåttak", priceRange: "Från 1 300 kr/m² (efter ROT, inkl. moms)", description: "Plåtprofil som imiterar tegel. Stilrent uttryck." },
      { name: "Dubbelfalsat plåttak", priceRange: "Ca 2 000 kr/m² (efter ROT, inkl. moms)", description: "Premiumprodukten, mycket lång livslängd." },
    ],
  },
  {
    category: "Panntak",
    items: [
      { name: "Betongpannetak", priceRange: "Från 1 200 kr/m² (efter ROT, inkl. moms)", description: "Beprövat och prisvärt, lång livslängd." },
      { name: "Lertegeltak", priceRange: "Från 1 300 kr/m² (efter ROT, inkl. moms)", description: "Klassiskt och traditionellt. Perfekt för äldre hus." },
    ],
  },
  {
    category: "Övriga tjänster",
    items: [
      { name: "Takrenovering", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Beroende på skadans omfattning. Alltid fast pris efter kostnadsfri takkontroll." },
      { name: "Takavvattning (hängrännor)", priceRange: "Från ca 23 000 kr (efter ROT, inkl. moms)", description: "Komplett system med stuprör, beroende på husets storlek och våningar." },
      { name: "Takkupa", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Inklusive konstruktion, taktäckning och plåtarbete." },
      { name: "Takfönster (Velux)", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Inklusive montering och vattenavledning." },
      { name: "Takinspektion", priceRange: "Kostnadsfritt", description: "Grundlig genomgång av taket med en rapport om takets skick." },
    ],
  },
  {
    category: "Tillval",
    items: [
      { name: "Råspontbyte", priceRange: "Från 300 kr/m² (efter ROT, inkl. moms)", description: "Byte av skadat underlag vid takbyte." },
      { name: "Skorstensinklädnad", priceRange: "Från 7 000 kr (efter ROT, inkl. moms)", description: "Byte av skorstenskrans eller ny hel inklädnad av skorstenet. " },
      { name: "Takstege + gångbrygga", priceRange: "Från 8 000 kr (efter ROT, inkl. moms)", description: "Komplett taksäkerhet enligt BBR." },
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
    answer: "Ja, alla våra priser inkluderar material, arbete, logistik och avfallshantering. Byggställning ingår. Tillägg kan tillkomma vid komplex ställning, och det framgår alltid i offerten. Vi arbetar alltid med fasta priser utan dolda kostnader.",
  },
  {
    question: "Kan jag använda ROT-avdrag?",
    answer: "Ja, takbyte och takrenovering är ROT-berättigade. Du får 30% skattereduktion på arbetskostnaden, max 50 000 kr per person och år. Avdraget syns direkt på fakturan och vi sköter ansökan mot Skatteverket. Priserna på den här sidan förutsätter fullt ROT-avdrag och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre.",
  },
  {
    question: "Kostar det extra på öar i skärgården?",
    answer: "Priset kan variera något beroende på logistik och tillgänglighet. Vi ger alltid ett fast pris i offerten som inkluderar eventuella transportkostnader.",
  },
  {
    question: "Hur lång tid tar ett takbyte?",
    answer: "Ett typiskt takbyte på ett villahus tar 3–7 arbetsdagar beroende på storlek och komplexitet. Vi tar effektivitet med största allvar för att minimera störningarna i er vardag.",
  },
];

export const PRICE_HERO_TEXT =
  "Riktpriserna nedan gäller efter ROT-avdrag och inkl. moms, med standardställning. Fast pris lämnas alltid efter en kostnadsfri takkontroll. ROT-avdraget (30 % på arbetskostnaden) dras av direkt på fakturan.";

export const PRICE_NOTE =
  "Riktpriser nedan är efter ROT-avdrag och inkl. moms, med standardställning. Byggställning ingår. Tillägg kan tillkomma vid komplex ställning, och det framgår alltid i offerten. Priserna förutsätter fullt ROT-avdrag: 30 % av arbetskostnaden, högst 50 000 kr per person och år, och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre. Exakt pris för ditt tak får du alltid skriftligt efter en kostnadsfri takkontroll.";

export const PRICE_ROT_TITLE = "Så fungerar ROT-avdraget vid takarbeten";
export const PRICE_ROT_TEXT =
  "Takbyte och takrenovering berättigar till ROT-avdrag. Du får 30% skattereduktion på arbetskostnaden, max 50 000 kr per person och år. Vi drar av ROT-avdraget direkt på fakturan — du betalar bara din del. Priserna på den här sidan förutsätter fullt ROT-avdrag och att du har betalat tillräckligt med skatt. Utan ROT, eller med mindre ROT kvar, blir priset högre.";

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
