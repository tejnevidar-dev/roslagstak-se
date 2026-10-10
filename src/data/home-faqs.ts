import { beloppLopande, withRotForbehall } from "./prices";

/** Frågor och svar på startsidan och /offert (components/FAQ.tsx). Egen modul så att den statiska HTML:en kan använda samma text. */
export const homeFaqs = [
  {
    question: "Vad kostar ett takbyte i Roslagen?",
    answer: withRotForbehall(
      `Som riktpris, efter ROT-avdrag och inkl. moms: betongpannor och TP20-plåt ${beloppLopande("TP20 plåttak")}, lertegel och pannplåt ${beloppLopande("Lertegeltak")}, dubbelfalsat plåttak ${beloppLopande("Dubbelfalsat plåttak")}. Exakt pris beror på takets storlek, lutning och underlagets skick. Du får ett fast pris i offerten efter en kostnadsfri takkontroll.`,
    ),
  },
  {
    question: "Lägger ni tak på öar i skärgården?",
    answer: "Ja. På Blidö och Singö har vi gjort kompletta takbyten, se Projekt. Till öar med vägfärja eller bro, som Blidö, Yxlan, Ljusterö och Singö, kör vi material och ställning som på fastlandet. Har ditt hus ingen bilväg: berätta var det ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas.",
  },
  {
    question: "Vilka taktyper erbjuder ni?",
    answer: "Vi arbetar med TP20 plåttak, dubbelfalsat plåttak (bandtäckning), pannplåttak, betongpannetak, lertegeltak och papptak. Vi hjälper dig välja rätt material baserat på ditt hus och din budget.",
  },
  {
    question: "Hur lång garanti ger ni på takarbeten?",
    answer: "Vi lämnar 10 års utförandegaranti på det arbete vi utför. När ett nytt tätskikt läggs, som vid takbyte och takomläggning, gäller dessutom 30 års tätskiktsgaranti via MATAKI. Vi arbetar enligt AMA.",
  },
  {
    question: "Kan jag använda ROT-avdrag för takbyte?",
    answer: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. Har du rätt till ROT-avdrag drar vi av det på fakturan och begär utbetalningen från Skatteverket.",
  },
  {
    question: "Hur snabbt får jag svar på min förfrågan?",
    answer: "Vi återkopplar inom 24 timmar efter att du skickat in din förfrågan. Därefter kommer vi överens om en kostnadsfri takkontroll, och startdatum för arbetet bestäms tillsammans med dig i offerten.",
  },
  {
    question: "Utför ni takkontroll?",
    answer: "Ja, vi erbjuder en kostnadsfri takkontroll. En av våra säljare tittar på taket på plats, ungefär 1–2 timmar, bland annat på takmaterial, plåtdetaljer och avvattning, och på vinden när den går att komma åt. Efteråt får du en rapport om takets skick, och behöver taket åtgärdas får du en offert med fast pris.",
  },
  {
    question: "Vilka områden i Roslagen täcker ni?",
    answer: "Vi verkar i hela Roslagen — från Vaxholm i söder till Arholma i norr. Det inkluderar Norrtälje, Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn, Ingmarsö, Högmarsö, Svartlöga, Söderöra, Norröra, Humlö, Gräskö, Spillersboda, Rådmansö, Bergshamra, Svartnö, Väddö, Vätö, Singö och Grisslehamn.",
  },
  {
    question: "Kan ni riva eternittak med asbest?",
    answer: "Nej. Vi river inte asbest och har inget tillstånd för det. Vi samordnar med en behörig saneringsfirma, som river det gamla taket. Vi lägger det nya. Boka en kostnadsfri takkontroll så går vi igenom ditt tak.",
  },
];
