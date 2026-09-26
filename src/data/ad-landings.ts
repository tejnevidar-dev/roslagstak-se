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
  { slug: "norrtalje", name: "Norrtälje", prep: "i", areas: "Norrtälje, Rimbo, Hallstavik, Vätö och närområdet" },
  { slug: "vallentuna", name: "Vallentuna", prep: "i", areas: "Vallentuna, Täby, Åkersberga, Rimbo och närområdet" },
  { slug: "akersberga", name: "Åkersberga", prep: "i", areas: "Åkersberga, Österåker, Vallentuna, Täby och närområdet" },
  { slug: "danderyd", name: "Danderyd", prep: "i", areas: "Danderyd, Täby, Sollentuna, Lidingö och närområdet" },
  { slug: "sollentuna", name: "Sollentuna", prep: "i", areas: "Sollentuna, Danderyd, Täby, Vallentuna och närområdet" },
  { slug: "rimbo", name: "Rimbo", prep: "i", areas: "Rimbo, Norrtälje, Edsbro, Vallentuna och närområdet" },
  { slug: "hallstavik", name: "Hallstavik", prep: "i", areas: "Hallstavik, Norrtälje, Rimbo, Väddö och närområdet" },
];

export const adLandingSlugs = adLandings.map((l) => l.slug);

export const getAdLanding = (slug: string) => adLandings.find((l) => l.slug === slug);
