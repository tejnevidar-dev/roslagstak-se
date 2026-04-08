export interface LocationFAQ {
  question: string;
  answer: string;
}

// Generic FAQs used as base, with location name injected
export const generateLocationFAQs = (
  name: string,
  prep: string,
  isIsland: boolean,
  uniqueFAQ?: { question: string; answer: string }
): LocationFAQ[] => {
  const faqs: LocationFAQ[] = [];

  // Add unique FAQ first for prominence
  if (uniqueFAQ) {
    faqs.push(uniqueFAQ);
  }

  faqs.push(
    {
      question: `Vad kostar ett takbyte ${prep} ${name}?`,
      answer: `Priset för ett takbyte ${prep} ${name} beror på takets storlek, lutning och materialval. Som riktpris ligger TP20-plåttak från ca 800 kr/m² och dubbelfalsat plåttak från ca 1 500 kr/m². ${isIsland ? "Transportkostnad till ön ingår alltid i vår offert." : "Vi erbjuder alltid fast pris efter besiktning."} ROT-avdrag ger ytterligare 30% rabatt på arbetskostnaden. Kontakta oss för en kostnadsfri offert — vi återkommer inom 24 timmar.`,
    },
    {
      question: `Hur lång tid tar ett takbyte ${prep} ${name}?`,
      answer: `Ett normalt takbyte ${prep} ${name} tar 3–7 arbetsdagar beroende på takets storlek och komplexitet. ${isIsland ? "Vi planerar materialtransport i förväg så att arbetet kan genomföras effektivt utan onödiga uppehåll." : "Vi påbörjar ofta arbetet inom 2–4 veckor efter beställning."} Du får alltid en detaljerad tidsplan i samband med offerten.`,
    },
    {
      question: `Vilka takmaterial rekommenderar ni ${prep} ${name}?`,
      answer: `${prep.charAt(0).toUpperCase() + prep.slice(1)} ${name} rekommenderar vi material som tål ${isIsland ? "skärgårdens hårda klimat med salt, vind och fukt" : "det kustnära klimatet"}. TP20-plåttak och dubbelfalsat plåttak är populära val som håller 40+ år. Pannplåt och tegelplåt ger ett traditionellt utseende. Vi hjälper dig välja rätt material utifrån ditt hus, takets lutning och din budget.`,
    },
    {
      question: `Erbjuder ni garanti på takarbeten ${prep} ${name}?`,
      answer: `Ja, vi erbjuder 10 års garanti på alla våra takarbeten ${prep} ${name}. Garantin täcker både material och utförande. Alla arbeten utförs enligt AMA Hus — branschstandarden för kvalitetssäkring av byggarbeten i Sverige.`,
    },
    {
      question: `Kan jag använda ROT-avdrag för takbyte ${prep} ${name}?`,
      answer: `Ja, du kan använda ROT-avdrag för takbyte och takrenovering ${prep} ${name}. Under 2026 får du 30% skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi hanterar all administration åt dig — du betalar bara din del direkt på fakturan.`,
    },
    {
      question: `Hur bokar jag en kostnadsfri takinspektion ${prep} ${name}?`,
      answer: `Ring oss på 070-154 36 39 eller fyll i formuläret på vår hemsida. Vi erbjuder kostnadsfri takinspektion ${prep} ${name} där vi bedömer takets skick och ger en skriftlig rapport med rekommendation. ${isIsland ? "Vi samordnar ofta inspektioner med pågående arbeten i skärgården." : "Vi kan ofta vara på plats inom en vecka."}`,
    },
  );

  return faqs;
};
