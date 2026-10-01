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

/*
 * Regel 5 (Marknadschefen 2026-09-30): svaren lovar bara det som är belagt — kostnadsfri
 * takkontroll utan förpliktelser (ca 1–2 timmar, en av våra säljare), fast pris, AMA,
 * 10 års utförandegaranti, 30 års tätskiktsgaranti via MATAKI, ROT direkt på fakturan och
 * svar inom 24 timmar. Inga tidsåtgångar, starttider, livslängder i år, transportlöften
 * eller påståenden om lokal närvaro.
 */
const PRICE = (prep: string, name: string) =>
  `Priset för ett takbyte ${prep} ${name} beror på takets storlek, lutning, materialval och underlagets skick. Som riktpris, efter ROT-avdrag och inkl. moms, ligger betongpannor och TP20-plåt från 1 200 kr/m², lertegel och pannplåt från 1 300 kr/m² och dubbelfalsat plåttak kring 2 000 kr/m². Du får alltid fast pris efter en kostnadsfri takkontroll, och ROT-avdraget på 30 % av arbetskostnaden dras direkt på fakturan. Vi återkommer inom 24 timmar.`;
const TIME = (what: string) =>
  `Hur lång tid ${what} tar beror på takets storlek, underlagets skick och vädret. Vid takkontrollen går vi igenom förutsättningarna för ditt tak, och i offerten framgår vad som ingår.`;
const MATERIALS = (isIsland: boolean) =>
  `Vi lägger betongpannor, lertegel, TP20-plåt, dubbelfalsat plåttak och papptak. Vilket som passar beror på huset, takets lutning, konstruktionen och vilket uttryck du vill ha, och det går vi igenom vid takkontrollen.${isIsland ? " I skärgården sliter salt, vind och fukt på taket, och det påverkar materialvalet." : ""}`;
const GUARANTEE = "Ja, vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Arbetet utförs enligt AMA.";
const ROT = (what: string, prep: string, name: string) =>
  `Ja, ROT-avdrag gäller för ${what} ${prep} ${name}: 30 % av arbetskostnaden, högst 50 000 kr per person och år. Vi drar avdraget direkt på fakturan, så att du bara betalar din del.`;

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
      answer: PRICE(prep, name),
    },
    {
      question: `Hur lång tid tar ett takbyte ${prep} ${name}?`,
      answer: TIME("ett takbyte"),
    },
    {
      question: `Vilka takmaterial rekommenderar ni ${prep} ${name}?`,
      answer: MATERIALS(isIsland),
    },
    {
      question: `Erbjuder ni garanti på takarbeten ${prep} ${name}?`,
      answer: GUARANTEE,
    },
    {
      question: `Kan jag använda ROT-avdrag för takbyte ${prep} ${name}?`,
      answer: ROT("takbyte och takrenovering", prep, name),
    },
    {
      question: `Hur bokar jag en kostnadsfri takkontroll ${prep} ${name}?`,
      answer: `Ring oss på 070-154 36 39 eller fyll i formuläret. En av våra säljare tittar på taket på plats ${prep} ${name}, det tar ungefär 1–2 timmar, och du får en rapport om takets skick. Takkontrollen är kostnadsfri och utan förpliktelser.${isIsland ? " Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö." : ""}`,
    },
    {
      question: `Behöver jag byta hela taket eller räcker en renovering ${prep} ${name}?`,
      answer: `Det beror på takets skick, framför allt underlaget. Vid den kostnadsfria takkontrollen ${prep} ${name} bedömer vi om en reparation räcker eller om taket behöver läggas om. Du bestämmer själv om och när du vill gå vidare.`,
    },
    {
      question: `Har ni erfarenhet av eternittak och asbest ${prep} ${name}?`,
      answer: `Vi utför inte asbestsanering själva. Saneringen samordnar vi med ett företag som har tillstånd från Arbetsmiljöverket, och därefter lägger vi det nya taket. Misstänker du att taket innehåller asbest kan du boka en kostnadsfri takkontroll.`,
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
  const service = serviceName.toLowerCase();

  if (isTaktvatt) {
    return tidy([
      {
        question: `Vad kostar taktvätt ${prep} ${locationName}?`,
        answer: `Priset för taktvätt ${prep} ${locationName} beror på takets storlek, lutning och hur mycket påväxt det finns. Du får fast pris efter kostnadsfri takkontroll, och ROT-avdraget på 30 % av arbetskostnaden dras direkt på fakturan.`,
      },
      {
        question: `Hur ofta behöver jag tvätta taket ${prep} ${locationName}?`,
        answer: `Det beror på hur utsatt taket är. Tak på norrsidor, under träd eller nära vatten får ofta mer mossa och alger.${isIsland ? " Det fuktiga skärgårdsklimatet gör att påväxten kan komma snabbare." : ""} Vid den kostnadsfria takkontrollen bedömer vi takets skick.`,
      },
      {
        question: `Vilken metod använder ni för taktvätt ${prep} ${locationName}?`,
        answer: `Vi väljer metod efter takmaterialet. Högtryckstvätt från taket rekommenderas inte på betong- och tegelpannor, eftersom det kan skada ytskiktet. Vad som passar ditt tak går vi igenom vid takkontrollen.`,
      },
      {
        question: `Kan ni utföra både taktvätt och takmålning ${prep} ${locationName}?`,
        answer: `Ja, vi gör både taktvätt och takmålning ${prep} ${locationName}, med fast pris efter kostnadsfri takkontroll.`,
      },
      {
        question: `Ingår ROT-avdrag vid taktvätt ${prep} ${locationName}?`,
        answer: ROT("taktvätt", prep, locationName),
      },
      {
        question: `När är bästa tiden för taktvätt ${prep} ${locationName}?`,
        answer: `Taktvätt görs när det är torrt och plusgrader, vanligtvis från vår till höst. Vi planerar arbetet efter väderprognosen.`,
      },
    ]);
  }

  return tidy([
    {
      question: `Vad kostar ${service} ${prep} ${locationName}?`,
      answer: isTakbyte
        ? PRICE(prep, locationName)
        : `Priset för en takrenovering ${prep} ${locationName} beror på vad som behöver åtgärdas. Du får fast pris efter kostnadsfri takkontroll, och ROT-avdraget på 30 % av arbetskostnaden dras direkt på fakturan.`,
    },
    {
      question: `Hur lång tid tar ${service} ${prep} ${locationName}?`,
      answer: TIME(isTakbyte ? "ett takbyte" : "en takrenovering"),
    },
    {
      question: `Vilka material används vid ${service} ${prep} ${locationName}?`,
      answer: MATERIALS(isIsland),
    },
    {
      question: `Ingår ROT-avdrag vid ${service} ${prep} ${locationName}?`,
      answer: ROT(service, prep, locationName),
    },
    {
      question: `Erbjuder ni garanti på ${service} ${prep} ${locationName}?`,
      answer: GUARANTEE,
    },
  ]);
};
