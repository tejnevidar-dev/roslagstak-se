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
