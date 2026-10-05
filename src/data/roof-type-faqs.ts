import { beloppLopande, withRotForbehall } from "./prices";

/** Frågorna på /taktyper. Delas av sidan och den statiska HTML:en (FAQPage). */
export const roofTypeFaqs = [
  {
    question: "Vad avgör hur länge ett tak fungerar?",
    answer:
      "Det som oftast avgör är underlaget, läkten och detaljerna runt skorsten och genomföringar, inte bara ytmaterialet. Tillverkarens uppgifter gäller för själva materialet.",
  },
  {
    question: "Vad kostar de olika taktyperna per kvadratmeter?",
    answer: withRotForbehall(
      `Som riktpris, efter ROT-avdrag och inkl. moms: papptak ${beloppLopande("Papptak")}, TP20-plåt ${beloppLopande("TP20 plåttak")}, betongpannor ${beloppLopande("Betongpannetak")}, lertegel ${beloppLopande("Lertegeltak")}, pannplåt ${beloppLopande("Pannplåttak")}, dubbelfalsat plåttak ${beloppLopande("Dubbelfalsat plåttak")}. Exakt pris beror på takets storlek, lutning och underlagets skick. Du får ett fast pris i offerten efter en kostnadsfri takkontroll.`,
    ),
  },
  {
    question: "Vilket material passar mitt hus?",
    answer:
      "Det beror på taket, lutningen, huset och uttrycket du vill ha. Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.",
  },
  {
    question: "Kan jag lägga plåttak direkt på gamla betongpannor?",
    answer:
      "Det gör vi inte. Vid ett takbyte rivs det gamla takmaterialet, och skadad råspont syns först när det gamla taket är rivet.",
  },
  {
    question: "Vilken taklutning krävs för de olika materialen?",
    answer:
      "Det beror på materialet och modellen. Varje tillverkare anger en lägsta lutning för sina produkter. Papptak är ett av få material som fungerar på riktigt flacka tak.",
  },
  {
    question: "Hur låter ett plåttak vid regn?",
    answer:
      "Det går vi igenom i guiden [plåttak och ljud vid regn](/blogg/platttak-ljud-regn-skargardshus).",
  },
];
