export interface LocationFAQ {
  question: string;
  answer: string;
}

/** Städar bort dubbla blanksteg som uppstår när villkorade meningar utgår. */
const tidy = (faqs: LocationFAQ[]): LocationFAQ[] =>
  faqs.map((f) => ({
    question: f.question.replace(/\s{2,}/g, " ").trim(),
    answer: f.answer.replace(/\s{2,}/g, " ").trim(),
  }));

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
      answer: `Priset för ett takbyte ${prep} ${name} beror på takets storlek, lutning och materialval. Som riktpris ligger TP20-plåttak från ca 1 200 kr/m² och dubbelfalsat plåttak från ca 2 000 kr/m². ${isIsland ? "Transportkostnad till ön ingår alltid i vår offert." : "Du får alltid fast pris efter besiktning."} ROT-avdrag ger ytterligare 30% rabatt på arbetskostnaden. Kontakta oss för en kostnadsfri offert — vi återkommer inom 24 timmar.`,
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
      answer: `Ja, vi lämnar 10 års garanti på alla våra takarbeten ${prep} ${name}. Garantin täcker både material och utförande. Alla arbeten utförs enligt AMA Hus — branschstandarden för kvalitetssäkring av byggarbeten i Sverige.`,
    },
    {
      question: `Kan jag använda ROT-avdrag för takbyte ${prep} ${name}?`,
      answer: `Ja, du kan använda ROT-avdrag för takbyte och takrenovering ${prep} ${name}. Under 2026 får du 30% skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi hanterar all administration åt dig — du betalar bara din del direkt på fakturan.`,
    },
    {
      question: `Hur bokar jag en kostnadsfri takinspektion ${prep} ${name}?`,
      answer: `Ring oss på 070-154 36 39 eller fyll i formuläret på vår hemsida. Vi gör en kostnadsfri takinspektion ${prep} ${name} där vi bedömer takets skick och ger en skriftlig rapport med rekommendation. ${isIsland ? "Vi samordnar ofta inspektioner med pågående arbeten i skärgården." : "Vi kan ofta vara på plats inom en vecka."}`,
    },
    {
      question: `Behöver jag byta hela taket eller räcker en renovering ${prep} ${name}?`,
      answer: `Det beror på takets skick. Vid vår kostnadsfria takinspektion ${prep} ${name} bedömer vi om en renovering räcker eller om det behövs ett komplett takbyte. Ibland kan byte av underlagspapp och beslag förlänga takets livslängd med 15–20 år. Vi ger alltid en ärlig rekommendation — vi föreslår aldrig ett takbyte om en renovering räcker.`,
    },
    {
      question: `Har ni erfarenhet av eternittak och asbest ${prep} ${name}?`,
      answer: `Ja, vi utför certifierad eternitsanering och asbestrivning enligt Arbetsmiljöverkets föreskrifter (AFS 2006:1). ${isIsland ? `Vi hanterar sanering och borttransport av eternit även på öar som ${name}.` : `Vi hanterar hela processen — från rivning och sanering till nytt tak.`} Kontakta oss för en kostnadsfri bedömning om du misstänker att ditt tak innehåller asbest.`,
    },
  );

  return tidy(faqs);
};

// FAQs for service+location combo pages (takbyte-X, takrenovering-X)
export const generateServiceLocationFAQs = (
  serviceName: string,
  locationName: string,
  prep: string,
  isIsland: boolean,
): LocationFAQ[] => {
  const isTakbyte = serviceName.toLowerCase() === "takbyte";
  const isTaktvatt = serviceName.toLowerCase() === "taktvätt";

  if (isTaktvatt) {
    return tidy([
      {
        question: `Vad kostar taktvätt ${prep} ${locationName}?`,
        answer: `Priset för taktvätt ${prep} ${locationName} ligger normalt mellan 80–150 kr/m² beroende på takets storlek, lutning och nedsmutsningsgrad. För ett villatak på 150 m² hamnar totalpriset oftast mellan 12 000 och 22 000 kr inkl. behandling med biocidmedel mot mossa och alger. Med ROT-avdrag får du 30% rabatt på arbetskostnaden direkt på fakturan. ${isIsland ? "Transport av utrustning till ön ingår alltid i vår offert." : "Vi lämnar alltid fast pris efter kostnadsfri besiktning."}`,
      },
      {
        question: `Hur ofta behöver jag tvätta taket ${prep} ${locationName}?`,
        answer: `Vi rekommenderar taktvätt vart 5:e till 10:e år ${prep} ${locationName}, beroende på takets exponering. Tak på norrsidor, under träd eller nära vatten drabbas hårdare av mossa och alger och behöver tvättas oftare. ${isIsland ? `Det fuktiga skärgårdsklimatet ${prep} ${locationName} gör att mossan växer snabbt — många hus behöver taktvätt vart 5:e år.` : ""} Boka kostnadsfri besiktning så bedömer vi takets skick.`,
      },
      {
        question: `Vilken metod använder ni för taktvätt ${prep} ${locationName}?`,
        answer: `Vi använder skonsam lågtryckstvätt eller manuell borstning beroende på takmaterial. Högtryckstvätt rekommenderas inte på betong- och tegelpannor eftersom det kan skada ytskiktet och förkorta takets livslängd. Efter rengöring behandlar vi taket med ett miljögodkänt biocidmedel som dödar mossa, alger och lavar i rotsystemet. Behandlingen ger ca 5 års skydd.`,
      },
      {
        question: `Kan ni utföra både taktvätt och takmålning ${prep} ${locationName}?`,
        answer: `Ja, vi erbjuder komplett takvård ${prep} ${locationName} — både taktvätt och takmålning. När taket är rent och torrt kan vi måla med specialfärg för tak (akrylat eller silikonbaserad) som ger UV-skydd, fuktskydd och ett fräscht utseende i 10–15 år. Takmålning kostar från ca 150 kr/m² inklusive grundning och två strykningar.`,
      },
      {
        question: `Ingår ROT-avdrag vid taktvätt ${prep} ${locationName}?`,
        answer: `Ja, ROT-avdrag gäller för taktvätt ${prep} ${locationName}. Du får 30% skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi sköter all administration — du betalar bara din del direkt på fakturan.`,
      },
      {
        question: `När är bästa tiden för taktvätt ${prep} ${locationName}?`,
        answer: `Bästa tid för taktvätt ${prep} ${locationName} är från april till oktober när det är torrt och plusgrader. Vi planerar arbetet efter väderprognos för bästa resultat. ${isIsland ? "På öar planerar vi extra noga eftersom transport av utrustning kräver bra väder." : "Vi kan oftast utföra taktvätt inom 1–2 veckor från beställning."}`,
      },
    ]);
  }

  return tidy([
    {
      question: `Vad kostar ${serviceName.toLowerCase()} ${prep} ${locationName}?`,
      answer: isTakbyte
        ? `Priset för takbyte ${prep} ${locationName} beror på takets storlek, material och underlag. Riktpriser: TP20 från ca 1 200 kr/m², dubbelfalsat plåttak från ca 2 000 kr/m². ${isIsland ? "Transport till ön ingår i priset." : "Du får alltid fast pris efter besiktning."} ROT-avdrag ger 30% rabatt på arbetskostnaden.`
        : `En takrenovering ${prep} ${locationName} kostar från ca 300 kr/m² beroende på åtgärd. ${isIsland ? "Transport till ön ingår." : "Fast pris efter besiktning."} ROT-avdrag ger 30% rabatt på arbetskostnaden.`,
    },
    {
      question: `Hur lång tid tar ${serviceName.toLowerCase()} ${prep} ${locationName}?`,
      answer: isTakbyte
        ? `Ett komplett takbyte ${prep} ${locationName} tar normalt 3–7 arbetsdagar. ${isIsland ? "Vi planerar materialtransport i förväg för att minimera projekttiden." : "Vi kan ofta starta inom 2–4 veckor."} Tidsplan ingår alltid i offerten.`
        : `En takrenovering ${prep} ${locationName} tar vanligtvis 1–4 arbetsdagar beroende på omfattning. ${isIsland ? "Vi samordnar transport med andra projekt." : "Vi kan ofta påbörja arbetet snabbt."} Exakt tidsplan ges i offerten.`,
    },
    {
      question: `Vilka material används vid ${serviceName.toLowerCase()} ${prep} ${locationName}?`,
      answer: `${prep.charAt(0).toUpperCase() + prep.slice(1)} ${locationName} rekommenderar vi material anpassat för ${isIsland ? "skärgårdsklimat — salt, vind och fukt" : "det kustnära klimatet"}. Populära val: TP20-plåttak, dubbelfalsat plåttak, tegelplåt och pannplåt. Vi hjälper dig välja utifrån hus, budget och takets lutning.`,
    },
    {
      question: `Ingår ROT-avdrag vid ${serviceName.toLowerCase()} ${prep} ${locationName}?`,
      answer: `Ja, ROT-avdrag gäller för ${serviceName.toLowerCase()} ${prep} ${locationName}. Du får 30% skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi sköter all administration — du betalar bara din del.`,
    },
    {
      question: `Erbjuder ni garanti på ${serviceName.toLowerCase()} ${prep} ${locationName}?`,
      answer: `Ja, alla våra ${isTakbyte ? "takbyten" : "takrenoveringar"} ${prep} ${locationName} utförs med 10 års garanti på material och utförande. Alla arbeten följer AMA Hus — branschstandarden i Sverige.`,
    },
  ]);
};
