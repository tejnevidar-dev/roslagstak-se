/**
 * Meningen om referensjobbet på ortssidor med egen text (paket 79, Marknadschefen 2026-10-13, förslag B): den står direkt efter områdestextens första stycke, lika i React och i serverns HTML.
 * Förut stod den bara i serverns HTML (geoFactsParagraph i prerender-content.ts), mitt på sidan; React visade bara en länk i länkrutan. Lydelsen och urvalet är oförändrade:
 * ett eget jobb på orten, annars det första jobbet inom 30 km (fågelvägen), och aldrig ett "i närområdet" utan att jobbets ort står utskriven.
 * Jobbets namn är en länk till projektsidan (markdown, [namn](/projekt/<slug>); React ritar den med renderInline, serverns HTML har texten utan syntax och länken i länklistan).
 * Öar utan eget jobb får ingen referensmening (de har J1 i "så arbetar vi"); öar med eget jobb (Blidö) får den och har då ingen J1. Mallsidor har sin egen mening (location-mall.ts), som är avstängd på öar. Bara relativa importer.
 */
import { locations } from "./locations";
import { projectTexts } from "./project-texts";
import { distanceKm } from "./service-reach";

const NEARBY_PROJECT_MAX_KM = 30;

/** Orter där sidans rubrik säger "på" men ortens data inte är en ö (paket 112, M6): referensmeningen använder samma preposition som rubriken. */
const PA_ORTER = new Set(["radmanso", "svartno", "vaddo"]);

export const referensMening = (loc: { slug: string; name: string; lat: number; lng: number; isIsland?: boolean }, prep: string): string | null => {
  // Paket 112 (M7): kommunsidan /taklaggare-norrtalje nämner alla tre jobben i sin egen text och har ingen referensmening (Blidö ligger i kommunen).
  if (loc.slug === "norrtalje") return null;
  const exact = projectTexts.find((p) => p.locationSlug === loc.slug);
  if (exact) return `Vi har utfört ett dokumenterat referensjobb här: [${exact.title}](/projekt/${exact.slug}).`;
  // En ö-sida har redan J1 i "så arbetar vi" (en mening om egna jobb per sida), och avståndet till ett jobb över vatten säger inte mycket om en ö (Marknadschefens val 2026-10-13).
  if (loc.isIsland) return null;
  const near = projectTexts.find((p) => {
    const projectLoc = locations.find((l) => l.slug === p.locationSlug);
    return !!projectLoc && distanceKm(loc, projectLoc) <= NEARBY_PROJECT_MAX_KM;
  });
  if (!near) return null;
  const projectLoc = locations.find((l) => l.slug === near.locationSlug)!;
  return `Ett referensjobb i närområdet: [${near.title}](/projekt/${near.slug}), ungefär ${Math.round(distanceKm(loc, projectLoc))} km härifrån. Det jobbet gjordes inte ${PA_ORTER.has(loc.slug) ? "på" : prep} ${loc.name}, men det visar hur ett komplett takbyte kan se ut.`;
};
