/** Annonssidor för privatkund (/offert/<ort>). Endast geografi, inga påståenden om tidigare arbeten. */
export interface AdLanding {
  slug: string;
  name: string;
  prep: "i" | "på";
  /** Närliggande orter som nämns i texten. */
  areas: string;
}

export const adLandings: AdLanding[] = [
  { slug: "taby", name: "Täby", prep: "i", areas: "Täby, Vallentuna, Danderyd, Åkersberga och närområdet" },
  { slug: "norrtalje", name: "Norrtälje", prep: "i", areas: "Norrtälje, Rimbo, Hallstavik, Vätö, Blidö, Singö, Grisslehamn och närområdet" },
  { slug: "vallentuna", name: "Vallentuna", prep: "i", areas: "Vallentuna, Täby, Åkersberga, Rimbo och närområdet" },
  { slug: "akersberga", name: "Åkersberga", prep: "i", areas: "Åkersberga, Österåker, Vallentuna, Täby och närområdet" },
  { slug: "danderyd", name: "Danderyd", prep: "i", areas: "Danderyd, Djursholm, Stocksund, Täby, Sollentuna, Lidingö och närområdet" },
  { slug: "sollentuna", name: "Sollentuna", prep: "i", areas: "Sollentuna, Danderyd, Täby, Vallentuna och närområdet" },
  { slug: "rimbo", name: "Rimbo", prep: "i", areas: "Rimbo, Norrtälje, Edsbro, Vallentuna och närområdet" },
  { slug: "hallstavik", name: "Hallstavik", prep: "i", areas: "Hallstavik, Norrtälje, Rimbo, Väddö och närområdet" },
  { slug: "tyreso", name: "Tyresö", prep: "i", areas: "Tyresö, Trollbäcken, Haninge, Nacka och närområdet" },
  { slug: "salem", name: "Salem", prep: "i", areas: "Salem, Rönninge, Botkyrka, Södertälje och närområdet" },
];

export const adLandingSlugs = adLandings.map((l) => l.slug);

export const getAdLanding = (slug: string) => adLandings.find((l) => l.slug === slug);

/** Rubrik och ingress på /offert/<ort>. Delas av sidan och den statiska HTML:en (generate-static-heads), så att texten
 *  före och efter att React tar över är ordagrant densamma. */
export const adLandingCopy = (l: AdLanding) => {
  const inPlace = `${l.prep} ${l.name}`;
  return {
    h1Lead: `Nytt tak ${inPlace}?`,
    h1Accent: "Fast pris efter kostnadsfri takkontroll.",
    intro: `Kostnadsfri takkontroll utan förpliktelser, en kontaktperson genom hela processen och fast pris i offerten. Takfirma med bas i Norrtälje. Vi lägger betongpannor, lertegel, TP20 och dubbelfalsat plåttak (bandtäckning). Vi tar uppdrag i ${l.areas}.`,
  };
};

/** Rubrik och ingress på /boka-takkontroll (delas av sidan och den statiska HTML:en). */
export const bookingCopy = {
  h1Lead: "Boka kostnadsfri takkontroll.",
  h1Accent: "Välj dag, eller be oss ringa.",
  intro:
    "En av våra säljare tittar på taket på plats. Du får en rapport om takets skick, och behöver taket åtgärdas får du en offert med fast pris. Kostnadsfritt och utan förpliktelser. Vi svarar inom 24 timmar.",
};
