/**
 * Annonssidornas (/offert/<ort>, AdLandingPage.tsx) fasta texter, delade med scripts/prerender-content.ts (statisk HTML) så att
 * besökaren och sökmotorn får samma ord (AD3). Texterna är oförändrade; de flyttades hit från AdLandingPage.tsx.
 */

export const AD_TRUST = [
  "10 års utförandegaranti",
  "30 års tätskiktsgaranti via MATAKI",
  "Arbete enligt AMA",
];


export const AD_STEPS = [
  {
    title: "Kostnadsfri takkontroll",
    text: "Vi svarar inom 24 timmar och bokar en tid. En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar.",
  },
  {
    title: "Offert med fast pris",
    text: "Du får en offert med fast pris. Tillägg bara efter ditt godkännande.",
  },
  {
    title: "Vi utför jobbet",
    text: "Vi utför arbetet enligt AMA. När taket är klart går vi igenom det tillsammans med dig.",
  },
];


export const AD_FAQS = [
  {
    q: "Vad kostar ett takbyte?",
    a: "Priset beror på takets storlek, lutning, material och skick. Efter den kostnadsfria takkontrollen får du en offert med fast pris. Tillägg görs bara efter ditt godkännande.",
  },
  {
    q: "Vad ingår i priset?",
    a: "Vad som ingår står i offerten. Ett komplett takbyte omfattar normalt nytt underlag, ny läkt, nytt ytmaterial och nya plåtdetaljer, och byggställning ingår. Skadad råspont syns först när det gamla taket är rivet. Hittar vi något visar vi dig omfattningen och lämnar ett skriftligt pris på tillägget innan vi fortsätter. Inget extraarbete görs utan ditt godkännande. Det enda undantaget är om något akut måste skyddas mot skada, till exempel ett öppet tak inför regn, och vi inte får tag på dig. Då gör vi bara det som är nödvändigt.",
  },
  {
    q: "Hur fungerar ROT-avdraget?",
    a: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. ROT-avdraget dras direkt på fakturan.",
  },
  {
    q: "Vilken garanti får jag?",
    a: "Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Vilka garantier som gäller för ditt tak står i offerten.",
  },
  {
    q: "Behöver jag bygglov?",
    a: "För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
  },
];

export const AD_TEXT = {
  stepsHeading: "Så går det till",
  priceHeading: "Vad kostar ett takbyte?",
  priceText:
    "Fast pris efter kostnadsfri takkontroll — utan förpliktelser. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. ROT-avdraget dras direkt på fakturan.",
  faqHeading: "Vanliga frågor",
  finalHeading: "Redo att få ett fast pris på ditt tak?",
};
