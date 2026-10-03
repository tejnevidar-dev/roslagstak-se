/**
 * Text på eternit-/asbestsidan (/tjanster/eternit-asbest), enda källan för EternitSEOContent.tsx och för den
 * statiska HTML:en (scripts/prerender-content.ts via data/service-page.ts). Ordagrant flyttad ur komponenten
 * 2026-10-03 (fas 2.50 P0). 10i: texterna är inte ändrade i sak.
 */
export type EternitFaq = { question: string; answer: string };

export const eternitFaqs: EternitFaq[] = [
  {
    question: "Vad kostar det att riva ett eternittak?",
    answer: "Kostnaden beror på takets storlek, mängden asbesthaltigt material och åtkomligheten, och sätts av den saneringsfirma vi samordnar med. Vi tar fram en offert på hela projektet — sanering och nytt tak — efter en kostnadsfri takkontroll.",
  },
  {
    question: "Får man riva eternittak själv?",
    answer: "Nej. Rivning av asbesthaltigt material, till exempel eternitplattor, kräver tillstånd från Arbetsmiljöverket och särskild utbildning. Asbesten är farligt avfall. Anlita alltid ett företag som har Arbetsmiljöverkets tillstånd för asbestrivning.",
  },
  {
    question: "Hur vet jag om mitt eternittak innehåller asbest?",
    answer: "Eternitplattor tillverkade före 1977 innehåller nästan alltid asbest. Plattor från 1977–1986 kan innehålla asbest. Är du osäker kan vi ta ett materialprov och skicka det till laboratorium för analys — helt kostnadsfritt vid takkontroll.",
  },
  {
    question: "Kan ni hjälpa till med eternitsanering på öar i skärgården?",
    answer: "Ja, på till exempel Blidö, Ljusterö, Svartlöga, Ingmarsö och Finnhamn. Vi samordnar hela projektet — takkontroll, sanering via ett företag med Arbetsmiljöverkets tillstånd och sjötransport av nytt material — och håller ihop det som en kontaktperson.",
  },
  {
    question: "Vad händer med det rivna eternitmaterialet?",
    answer: "Allt asbestinnehållande material emballeras i godkända säckar och märks som farligt avfall. Saneringsfirman transporterar materialet till en godkänd deponi, och du får dokumentation på att saneringen utförts enligt gällande regler.",
  },
  {
    question: "Kan jag få ROT-avdrag för eternitsanering?",
    answer: "Ja, arbetskostnaden för både sanering och nytt tak berättigar till ROT-avdrag (30% skattereduktion, max 50 000 kr per person och år). Avdraget dras direkt på fakturan.",
  },
  {
    question: "Hur lång tid tar det att sanera och byta ett eternittak?",
    answer: "Det beror på takets storlek, hur saneringen behöver göras och vädret. Saneringen utförs av ett företag med tillstånd från Arbetsmiljöverket, och hur arbetet planeras går vi igenom innan offerten.",
  },
  {
    question: "Vilka hälsorisker innebär eternittak med asbest?",
    answer: "Asbest är cancerframkallande vid inandning av fibrer. Intakta eternitplattor är inte farliga, men vid rivning, borrning eller slipning frigörs mikroskopiska fibrer. Därför måste allt arbete ske med fullständig skyddsutrustning, slussystem och undertryck.",
  },
];

export const eternitSections: { heading: string; level: 2 | 3; paragraphs: string[] }[] = [
  {
    "heading": "Eternittak och asbest — vad behöver du veta?",
    "level": 2,
    "paragraphs": [
      "Eternit är ett byggmaterial som var mycket vanligt i Sverige mellan 1930- och 1970-talet. Eternitplattor användes som takbeläggning på villor, fritidshus och ekonomibyggnader — inte minst i Roslagen och skärgården. Materialet består av cement blandat med asbestfibrer, vilket gör det extremt hållbart men också hälsofarligt vid rivning.",
      "Om ditt hus är byggt före 1977 och har plattbeläggning på taket är sannolikheten stor att det är eternitplattor med asbest. Från 1977 ersattes asbesten successivt med andra fibrer, men plattor tillverkade fram till 1986 kan fortfarande innehålla asbest. Det enda sättet att vara helt säker är att låta ett laboratorium analysera ett materialprov."
    ]
  },
  {
    "heading": "Varför ska man byta eternittak?",
    "level": 3,
    "paragraphs": [
      "Många eternittak i Roslagen är nu 50–70 år gamla och börjar bli porösa, spruckna eller mossbevuxna. Ett åldrat eternittak läcker ofta vid genomföringar och nockbeslag. Dessutom sänker ett eternittak husets marknadsvärde, och försäkringsbolag kan ha synpunkter på byggnader med asbesthaltigt material. Genom att sanera och byta till modernt takmaterial — exempelvis plåttak, betongpannor eller tegeltak — får du ett säkrare, tätare och snyggare tak med 30–50 års livslängd."
    ]
  },
  {
    "heading": "Eternitsanering i skärgården — specialkompetens krävs",
    "level": 3,
    "paragraphs": [
      "Att sanera eternittak på en ö kräver extra planering. Farligt avfall måste emballeras säkert och transporteras till godkänd deponi, och det görs av saneringsföretaget med tillstånd. Förutsättningarna för just ditt tak går vi igenom vid takkontrollen."
    ]
  },
  {
    "heading": "Sanering görs alltid av ett företag med tillstånd",
    "level": 3,
    "paragraphs": [
      "Rivning av eternit som innehåller asbest får bara göras av ett företag med tillstånd från Arbetsmiljöverket. Vi utför inte asbestsanering själva. Vi hjälper dig att planera hela takbytet och samordnar saneringen med ett företag som har rätt tillstånd, så att rivning, emballering, transport och deponering sker enligt gällande regler. Du som kund får en enda kontaktperson hos oss genom hela processen."
    ]
  }
];

export const ETERNIT_FAQ_HEADING = "Vanliga frågor om eternittak och asbestsanering";

export const eternitLocal = {
  heading: "Eternittak i din kommun",
  text: "Vi hjälper dig med eternittak i hela Roslagen — från Vaxholm till Arholma — och samordnar saneringen.",
  links: [
  {
    "to": "/taklaggare-blido",
    "label": "Eternittak Blidö"
  },
  {
    "to": "/taklaggare-ljustero",
    "label": "Eternittak Ljusterö"
  },
  {
    "to": "/taklaggare-norrtalje",
    "label": "Eternittak Norrtälje"
  },
  {
    "to": "/taklaggare-vaxholm",
    "label": "Eternittak Vaxholm"
  },
  {
    "to": "/taklaggare-furusund",
    "label": "Eternittak Furusund"
  },
  {
    "to": "/taklaggare-husaro",
    "label": "Eternittak Husarö"
  }
],
};
