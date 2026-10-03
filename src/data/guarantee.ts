/**
 * Garantimeningar. Marknadschefens beslut 2026-10-05: "30 års tätskiktsgaranti via MATAKI" gäller bara när
 * nytt tätskikt läggs (takbyte, takomläggning). På renoverings-, reparations-, hängrännesidor och takproblem
 * används GARANTI_RENOVERING (samma mening överallt). Takbyte-, takomläggnings-, områdes- och regionsidor
 * behåller den vanliga meningen.
 */
export const GARANTI_RENOVERING =
  "Vi lämnar 10 års utförandegaranti på det arbete vi utför. När ett nytt tätskikt läggs, som vid takbyte och takomläggning, gäller dessutom 30 års tätskiktsgaranti via MATAKI.";

/** Kort variant för trygghetsrader (chips). */
export const GARANTI_RENOVERING_CHIP = "30 års tätskiktsgaranti när nytt tätskikt läggs (MATAKI)";

/** Tjänste-slugs i /tjanster/<slug> som handlar om renovering, reparation eller hängrännor. */
export const RENOVERING_SERVICE_SLUGS: readonly string[] = ["takrenovering", "takavvattning"];

/** Landningssidor (/takreparation, /akut-lackage, /hangrannor) som handlar om reparation och hängrännor. */
export const RENOVERING_LANDING_SLUGS: readonly string[] = ["takreparation", "akut-lackage", "hangrannor"];
