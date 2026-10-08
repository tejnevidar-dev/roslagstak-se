/**
 * Landningssidornas (ServiceLandingPage.tsx: /takkontroll, /takreparation m.fl.) och formulärets fasta texter, delade med
 * scripts/prerender-content.ts (statisk HTML) så att besökaren och sökmotorn får samma ord (AD2). Ändra texten här.
 */
import { GARANTI_RENOVERING_CHIP, RENOVERING_LANDING_SLUGS } from "@/data/guarantee";

/** Korta jobb där inget nytt tätskikt läggs: tätskiktschipet visas inte (Marknadschefen och juristen, backlog 1ce). */
const NO_TATSKIKT_CHIP_LANDING = ["takreparation", "hangrannor", "akut-lackage"];

export const landingTrust = (slug: string): string[] => [
  "10 års utförandegaranti",
  ...(NO_TATSKIKT_CHIP_LANDING.includes(slug)
    ? []
    : [RENOVERING_LANDING_SLUGS.includes(slug) ? GARANTI_RENOVERING_CHIP : "30 års tätskiktsgaranti via MATAKI"]),
  "Fast pris efter takkontroll",
  "Arbete enligt AMA",
  "Svar inom 24 timmar",
];

export const LANDING_TEXT = {
  takkontrollNote: "En kontaktperson · Fast pris · Utan förpliktelser",
  faqIntro: "Pris, garanti, ROT och hur det går till.",
  relatedHeading: "Läs vidare",
};

/** Raden under formulärets rubrik (LeadForm.tsx). */
export const LEAD_FORM_SUBTITLE = "Svar inom 24 timmar. Utan förpliktelser.";
