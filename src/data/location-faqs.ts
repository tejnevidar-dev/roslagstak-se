export interface LocationFAQ {
  question: string;
  answer: string;
}

// Generic FAQs used as base, with location name injected
export const generateLocationFAQs = (
  name: string,
  prep: string,
  isIsland: boolean
): LocationFAQ[] => [
  {
    question: `Vad kostar ett takbyte ${prep} ${name}?`,
    answer: `Priset för ett takbyte ${prep} ${name} beror på takets storlek och materialval. Som riktpris ligger TP20-plåttak från ca 800 kr/m² och dubbelfalsat plåttak från ca 1 500 kr/m². ${isIsland ? "Transportkostnad till ön ingår i offerten." : ""} ROT-avdrag ger ytterligare 30% rabatt på arbetskostnaden. Kontakta oss för en kostnadsfri offert.`,
  },
  {
    question: `Hur lång tid tar ett takbyte ${prep} ${name}?`,
    answer: `Ett normalt takbyte ${prep} ${name} tar 3–7 arbetsdagar beroende på takets storlek och komplexitet. ${isIsland ? "Vi planerar materialtransport i förväg så att arbetet kan genomföras effektivt utan onödiga uppehåll." : "Vi påbörjar ofta arbetet inom 2–4 veckor efter beställning."} Vi ger alltid en tidsplan i samband med offerten.`,
  },
  {
    question: `Vilka takmaterial rekommenderar ni ${prep} ${name}?`,
    answer: `${prep.charAt(0).toUpperCase() + prep.slice(1)} ${name} rekommenderar vi material som tål ${isIsland ? "skärgårdens hårda klimat med salt, vind och fukt" : "det kustnära klimatet"}. TP20-plåttak och dubbelfalsat plåttak är populära val som håller 40+ år. Pannplåt och tegelplåt ger ett traditionellt utseende. Vi hjälper dig välja rätt utifrån ditt hus och din budget.`,
  },
  {
    question: `Erbjuder ni garanti på takarbeten ${prep} ${name}?`,
    answer: `Ja, vi erbjuder 10 års garanti på alla våra takarbeten ${prep} ${name}. Garantin täcker både material och utförande. Alla arbeten utförs enligt AMA-standard för att säkerställa högsta kvalitet.`,
  },
  {
    question: `Kan jag använda ROT-avdrag för takbyte ${prep} ${name}?`,
    answer: `Ja, du kan använda ROT-avdrag för takbyte och takrenovering ${prep} ${name}. Under 2026 får du 30% skattereduktion på arbetskostnaden, upp till 50 000 kr per person. Vi hanterar all administration — du betalar bara din del direkt.`,
  },
];
