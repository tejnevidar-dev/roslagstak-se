/**
 * Mallavsnitt som utelämnas på en enskild ortssida (paket 72, Marknadschefens nattordning 2026-10-14): den starkare Norrtälje-sidan har egen text som redan säger det mallavsnitten
 * säger, så de visas inte där. En lista per sida delas av LocationPage.tsx (React) och scripts/prerender-content.ts (serverns HTML), så att de inte kan skilja sig.
 * Sidor som inte står här är oförändrade. Bara relativa importer.
 */
export interface LocationSlim {
  /** Meningen om referensjobbet i närområdet (location-referens.ts): jobben har ett eget avsnitt (J1, högst en mening om egna jobb per sida). */
  utanReferensmening?: boolean;
  /** Listan "Våra taktjänster i <ort>" och motsvarande hasOfferCatalog i sidans JSON-LD. */
  utanTaktjanster?: boolean;
  /** Stycket "Vad kostar takbyte i <ort>?". */
  utanPris?: boolean;
  /** Avsnittet "Om <ort>" (id "om-ort" i location-sections.ts; stängs av med nyckeln, inte med plats i listan). */
  utanOmOrt?: boolean;
  /** Rutan "Område" (läge och närmaste orter, local-sections.ts): säger inget på basens egen sida. */
  utanOmrade?: boolean;
  /** Stycket "<Ort> tillhör <region>. Närmaste orter … Vi har egna sidor för …" (bara i serverns HTML). */
  utanGeoFakta?: boolean;
  /** Frågor som texten redan besvarar, som början av frågan. Tas bort ur den synliga listan och ur FAQPage (samma lista driver båda). */
  utelamnaFragor?: string[];
}

export const LOCATION_SLIM: Record<string, LocationSlim> = {
  norrtalje: {
    utanReferensmening: true,
    utanTaktjanster: true,
    utanPris: true,
    utanOmOrt: true,
    utanOmrade: true,
    utanGeoFakta: true,
    utelamnaFragor: [
      "Vad kostar ett takbyte",
      "Erbjuder ni garanti på takarbeten",
      "Kan jag använda ROT-avdrag för takbyte",
      "Hur bokar jag en kostnadsfri takkontroll",
    ],
  },
};

export const slimFor = (slug: string): LocationSlim => LOCATION_SLIM[slug] ?? {};

/** Frågelistan utan de frågor som sidans text redan besvarar. Sidor utan post får samma lista tillbaka. */
export const slimFragor = <T extends { question: string }>(slug: string, faqs: T[]): T[] => {
  const bort = slimFor(slug).utelamnaFragor;
  return bort ? faqs.filter((f) => !bort.some((b) => f.question.startsWith(b))) : faqs;
};
