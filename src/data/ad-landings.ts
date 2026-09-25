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
];

export const adLandingSlugs = adLandings.map((l) => l.slug);

export const getAdLanding = (slug: string) => adLandings.find((l) => l.slug === slug);
