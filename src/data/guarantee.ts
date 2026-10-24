/**
 * Garantimeningar. Juristens lydelse 2026-10-25 (ledning/jurist/mataki-utan-behorighet-2026-10-25.md, Rättelse 2): vi lämnar 10 års utförandegaranti, och som standard lägger vi underlagstak från MATAKI
 * (Haloten PRO eller Haloten STEEL) med 30 års produktgaranti från tillverkaren. Aldrig "tätskiktsgaranti", aldrig "upp till 30 år" och aldrig "30 års garanti" utan produktgaranti och MATAKI. Garantin nämns bara där nytt underlagstak läggs (takbyte, takomläggning); inte på papptak. På renoverings-, reparations-, hängrännesidor och takproblem
 * används GARANTI_RENOVERING (samma mening överallt). Takbyte-, takomläggnings-, områdes- och regionsidor
 * behåller den vanliga meningen.
 */
export const GARANTI_RENOVERING =
  "Vi lämnar 10 års utförandegaranti på det arbete vi utför. Vid takbyte och takomläggning lägger vi som standard underlagstak från MATAKI (Haloten PRO eller Haloten STEEL), med 30 års produktgaranti från tillverkaren på MATAKI:s villkor. Önskar du ett annat underlagstak står garantin för det i offerten.";

/** Bara utförandegaranti, för arbeten som inte lägger nytt tätskikt (t.ex. montering av taksäkerhet, juristens T1). */
export const GARANTI_UTFORANDE = "Vi lämnar 10 års utförandegaranti på det arbete vi utför.";

/** Garantirutan på eternitsidan (juristen 2026-10-03): garantierna gäller vårt arbete, inte saneringen. */
export const GARANTI_ETERNIT =
  "Vi lämnar 10 års garanti på utförandet av det nya taket. Underlagstaket har som standard 30 års produktgaranti från tillverkaren MATAKI, på MATAKI:s villkor. Saneringen utförs av saneringsfirman.";

/** Tjänste-slugs i /tjanster/<slug> som aldrig ska nämna produktgarantin från MATAKI eftersom inget nytt tätskikt läggs. */
export const NO_TATSKIKT_SERVICE_SLUGS: readonly string[] = ["taksakerhet", "takavvattning"];

/** Tjänster som inte har någon garanti att nämna (en takkontroll har ingen garanti). Varken garantirutan eller chipsen visas. */
export const NO_GARANTI_SERVICE_SLUGS: readonly string[] = ["takinspektion"];

/** Tjänster där chipet om produktgarantin utelämnas (bara chipet "10 års utförandegaranti" visas). */
export const NO_TATSKIKT_CHIP_SERVICE_SLUGS: readonly string[] = ["takrenovering", "takkupor"];

/** Kort variant för trygghetsrader (chips). */
export const GARANTI_RENOVERING_CHIP = "30 års produktgaranti från MATAKI på underlagstaket, som standard";

/** Tjänste-slugs i /tjanster/<slug> som handlar om renovering, reparation eller hängrännor. */
export const RENOVERING_SERVICE_SLUGS: readonly string[] = ["takrenovering", "takavvattning", "platarbeten"];

/** Landningssidor (/takreparation, /akut-lackage, /hangrannor) som handlar om reparation och hängrännor. */
export const RENOVERING_LANDING_SLUGS: readonly string[] = ["takreparation", "akut-lackage", "hangrannor", "platslagare"];
