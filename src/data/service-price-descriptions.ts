import { withRotForbehall } from "./prices";

/**
 * Prisbeskrivningen i Service-noden på tjänst × ort-sidor (flyttad ur ServiceLocationPage.tsx i gren 168, så att React och den statiska headen bygger samma nod).
 * Inga belopp i strukturerade data på tjänst × ort-sidor (regel 5, Marknadschefen 2026-10-04): riktpriser står på /priser. check-prisfrasing.ts fäller bygget om ett belopp hamnar här.
 */
const PRIS_UTAN_BELOPP = "Fast pris i offerten efter kostnadsfri takkontroll. Riktpriser per material finns på roslagstak.se/priser.";

const servicePriceDescriptionsRaw: Record<string, string> = {
  takbyte: PRIS_UTAN_BELOPP,
  takomlaggning: PRIS_UTAN_BELOPP,
  takrenovering: "Fast pris efter kostnadsfri takkontroll, beroende på åtgärdens omfattning. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
  taktvatt: "Fast pris i offerten efter kostnadsfri takkontroll.",
  takmalning: "Fast pris i offerten efter kostnadsfri takkontroll.",
  bandtackning: PRIS_UTAN_BELOPP,
  platttak: PRIS_UTAN_BELOPP,
  betongpannor: PRIS_UTAN_BELOPP,
  tegeltak: PRIS_UTAN_BELOPP,
};

export const servicePriceDescriptions: Record<string, string> = Object.fromEntries(
  Object.entries(servicePriceDescriptionsRaw).map(([k, v]) => [k, withRotForbehall(v)]),
);
