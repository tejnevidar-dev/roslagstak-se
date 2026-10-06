/** Frågor och svar på /brf och /brf/<ort> (pages/BrfPage.tsx). Egen modul så att den statiska HTML:en kan använda samma text. */
export const brfFaqs = [
  {
    question: "Hur går ett takbyte till för en bostadsrättsförening?",
    answer:
      "Det börjar med en kostnadsfri takkontroll, därefter får föreningen en offert med fast pris som styrelsen och stämman kan besluta på. När beslutet är taget planerar vi start, ställning och tidplan tillsammans med styrelsen. Arbetet avslutas med en slutgenomgång.",
  },
  {
    question: "Behöver föreningen en takkontroll före ett takbyte?",
    answer:
      "Vi rekommenderar det. En takkontroll visar takets skick, om det räcker med reparation eller om taket behöver bytas, och ger styrelsen ett underlag för underhållsplan och budget. Vår takkontroll är kostnadsfri och förpliktar inte till något.",
  },
  {
    question: "Vad kostar ett takbyte för en BRF?",
    answer:
      "Priset beror på takyta, taktyp, lutning, antal genomföringar och underlagets skick. Du får fast pris i offerten efter kostnadsfri takkontroll, så att styrelsen har ett konkret underlag att besluta på. Riktpriser per material finns på sidan Priser.",
  },
  {
    question: "Vilken garanti får föreningen?",
    answer:
      "Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Vilka garantier som gäller för ert tak står i offerten.",
  },
  {
    question: "Hur minimerar ni störningen för de boende?",
    answer:
      "Vi planerar ställning och tidplan tillsammans med styrelsen, skyddar fasad och mark, städar löpande och ger föreningen en fast kontaktperson under hela projektet.",
  },
  {
    question: "Vilka områden arbetar ni i?",
    answer:
      "Vi arbetar i Storstockholm och Roslagen. På sidan Områden ser du de orter vi arbetar i.",
  },
];

/** Frågorna för /brf (utan ort) eller /brf/<ort>: orten får en egen första fråga. */
export const brfFaqsFor = (place?: { name: string; prep: string }) => {
  if (!place) return brfFaqs;
  const inPlace = ` ${place.prep} ${place.name}`;
  return [
    {
      question: `Tar ni uppdrag från bostadsrättsföreningar${inPlace}?`,
      answer: `Ja. Vi tar uppdrag från bostadsrättsföreningar${inPlace} och närområdet. Vi börjar med en kostnadsfri takkontroll och lämnar ett underlag med fast pris som styrelsen kan besluta på. Vilka garantier som gäller för ert tak står i offerten.`,
    },
    ...brfFaqs,
  ];
};
