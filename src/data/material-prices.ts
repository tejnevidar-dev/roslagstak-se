/**
 * Prisavsnittet "Vad kostar <material>?" på materialsidorna (Marknadschefens ändrade beslut 2026-10-04,
 * sokordsagare-2026-10-04.md avsnitt 4: materialets egen sida äger "<material> pris").
 * Beloppen hämtas ur prices.ts (aldrig skrivna för hand), med märkningen "efter ROT-avdrag, inkl. moms" från
 * prislistan, ROT-förbehållet och ställningsmeningen ordagrant som på /priser. Delas av MaterialPage.tsx och
 * scripts/prerender-content.ts. Inga räkneexempel, inga totalsummor, inga normalspann.
 */
import { prisPost, ROT_FORBEHALL, STALLNING_MENING } from "./prices";

export interface PrisRad {
  namn: string;
  belopp: string;
  /** Länk till materialets egen sida, för raderna pannplåt och dubbelfalsat på plåttakssidan. */
  to?: string;
}

export interface PrisAvsnitt {
  rubrik: string;
  rader: PrisRad[];
}

const rad = (post: string, to?: string): PrisRad => ({ namn: post, belopp: prisPost(post).priceRange, to });

export const MATERIAL_PRISAVSNITT: Record<string, PrisAvsnitt> = {
  betongpannor: { rubrik: "Vad kostar betongpannor?", rader: [rad("Betongpannetak")] },
  "tp20-plattak": {
    rubrik: "Vad kostar plåttak?",
    rader: [rad("TP20 plåttak"), rad("Pannplåttak", "/material/pannplat"), rad("Dubbelfalsat plåttak", "/tjanster/platarbeten#pris")],
  },
  pannplat: { rubrik: "Vad kostar pannplåt?", rader: [rad("Pannplåttak")] },
  papptak: { rubrik: "Vad kostar papptak?", rader: [rad("Papptak")] },
};

/** Ankaret på prisavsnittet (och på prisrutan på tjänstesidorna): /material/<slug>#pris. */
export const PRIS_ANKARE = "pris";

/** Texten under raderna, i visningsordning: ROT-förbehållet, ställningsmeningen och offertmeningen. */
export const PRIS_STYCKEN: string[] = [ROT_FORBEHALL, STALLNING_MENING, "Ditt pris står i offerten och är fast."];

/** Prisavsnittet som stycken för den statiska HTML:en. */
export const prisAvsnittForSpegel = (a: PrisAvsnitt): string[] => [
  ...a.rader.map((r) => `${r.namn}: ${r.belopp}.`),
  ...PRIS_STYCKEN,
];
