/**
 * Tjänste-slugar för service+ort-URL:erna. Egen liten modul så att routingen i
 * App.tsx kan bygga rutterna utan att importera hela combo-generatorn (som drar
 * in all ortstext). Testas mot serviceTypes i service-location-combos.ts.
 */
export const allServiceSlugs = [
  "takbyte",
  "takrenovering",
  "takomlaggning",
  "bandtackning",
  "platttak",
  "betongpannor",
  "tegeltak",
  "takmalning",
  "taktvatt",
] as const satisfies readonly string[];

export type ServiceSlug = (typeof allServiceSlugs)[number];

/** Regioner där vi bara har en ortssida och ingen tjänst+ort-kombination (nytt verksamhetsområde utan egen lokal historik). */
export const NO_COMBO_REGIONS: readonly string[] = ["Mälardalen"];

export const hasServiceCombos = (region: string) => !NO_COMBO_REGIONS.includes(region);
