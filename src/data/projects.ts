/**
 * Riktiga referensjobb (projektarkiv, SEO-programmet avsnitt 10/backlog #3) — samtidigt "motorn"
 * för projekt↔tjänst↔ort↔material (SEO-programmet Phase II steg 9). Endast belagda fakta från
 * Vidar, med kundens samtycke till marknadsföring (dokumenterat i
 * ledning/marknad/innehall/material/<mapp>/fakta.md). Aldrig kundens namn eller adress/väg —
 * bara "<plats>, <kommun>". Gissa aldrig yta, tidsåtgång eller pris där det inte är angivet.
 *
 * serviceSlug, locationSlug och materialSlugs driver de automatiska länkarna:
 * - ProjectPage länkar till /tjanster/<serviceSlug>, /taklaggare-<locationSlug> och en /material-
 *   sida per materialSlug (getMaterial i src/data/materials.ts).
 * - MaterialPage (src/pages/MaterialPage.tsx) visar automatiskt "Hos oss"-länkar till alla projekt
 *   som har det materialet, via getProjectsByMaterial nedan — inga länkar hårdkodas där.
 * Lägg alltid till nya materialSlugs i src/data/materials.ts FÖRST, annars blir länken tom.
 *
 * MALL FÖR NYA JOBB — fält från ledning/marknad/innehall/jobbformular.md → Project-schemat:
 *   1. ORT                          → locationName ("<ort>, <kommun>"), locationSlug (slugifierat)
 *   2. NÄR JOBBET BLEV KLART        → period (t.ex. "oktober 2026")
 *   3. KUNDENS SAMTYCKE             → krav: bara JA går in i projects.ts. NEJ → inget projekt.
 *   4. VAD GJORDES                  → serviceName/serviceSlug (välj matchande tjänst i src/components/Services.tsx)
 *   5. MATERIAL                     → material (fritext för visning) + materialSlugs (slugs från materials.ts)
 *   6. BILDER/FILM                  → heroImage/heroAlt + gallery (efter Innehålls bildkontroll, se punkt 7)
 *   7. SYNS NÅGOT SOM MÅSTE BORT    → måste vara åtgärdat (suddat/beskuret) INNAN bilden läggs in här
 *   8. NÅGOT SÄRSKILT               → vävs in i description där det är relevant, aldrig gissat
 * summary/description skrivs av SEO utifrån 1, 2, 4, 5, 8 — bara det som är ifyllt, inget hittat på.
 */
import imgBlidoHero from "@/assets/project-blido-hero.jpg";
import imgBlidoDetail1 from "@/assets/project-blido-detail-1.jpg";
import imgBlidoDetail2 from "@/assets/project-blido-detail-2.jpg";
import imgSingoHero from "@/assets/project-singo-hero.jpg";
import imgSingoDetail1 from "@/assets/project-singo-detail-1.jpg";
import type { MaterialSlug } from "@/data/materials";
import { locations, type LocationData } from "@/data/locations";

export interface Project {
  slug: string;
  title: string;
  locationName: string;
  locationSlug: string;
  serviceName: string;
  serviceSlug: string;
  material: string;
  materialSlugs: MaterialSlug[];
  period: string;
  summary: string;
  description: string[];
  heroImage: string;
  heroAlt: string;
  gallery: { src: string; alt: string }[];
}

export const projects: Project[] = [
  {
    slug: "takrenovering-blido",
    title: "Takrenovering på Blidö",
    locationName: "Blidö, Norrtälje",
    locationSlug: "blido",
    serviceName: "Takrenovering",
    serviceSlug: "takrenovering",
    material: "Betongpannor (Benders, svart)",
    materialSlugs: ["betongpannor"],
    period: "sommaren 2026",
    summary:
      "Komplett takrenovering på ett fritidshus på Blidö, med nya betongpannor i svart. Befintlig råspont behölls.",
    description: [
      "Ett fritidshus på Blidö i Norrtälje kommun, omgärdat av skog med utsikt mot fjärden, fick sommaren 2026 en komplett takrenovering. Nytt underlag, ny läkt, nya plåtdetaljer kring skorstenar och genomföringar samt nya hängrännor lades hela vägen — den befintliga råsponten var i så pass gott skick att den kunde behållas.",
      "Nytt ytmaterial blev betongpannor från Benders i svart, ett robust och prisvärt val som är vanligt på fritidshus i Roslagens skärgård.",
      "Jobbet är utfört av RoslagsTak med kundens samtycke till att bilderna publiceras i marknadsföring.",
    ],
    heroImage: imgBlidoHero,
    heroAlt: "Nylagt svart betongpannetak på fritidshus på Blidö, sett från altansidan med skog runtomkring",
    gallery: [
      {
        src: imgBlidoDetail1,
        alt: "Nock och skorstensbeslag på det nylagda betongpannetaket på Blidö",
      },
      {
        src: imgBlidoDetail2,
        alt: "Färdigt betongpannetak på fritidshuset på Blidö, sett snett ovanifrån",
      },
    ],
  },
  {
    slug: "takbyte-singo",
    title: "Takbyte på Singö",
    locationName: "Singö, Grisslehamn",
    locationSlug: "singo",
    serviceName: "Takomläggning",
    serviceSlug: "takomlaggning",
    material: "Betongpannor på huvudtaket, TP20-plåt på de lägre delarna (båda röda)",
    materialSlugs: ["betongpannor", "tp20-plattak"],
    period: "september 2026",
    summary:
      "Komplett takbyte på ett hus på Singö med utsikt över fjärden — röda betongpannor på huvudtaket och röd TP20-plåt på de lägre takdelarna.",
    description: [
      "På Singö i Grisslehamn, Norrtälje kommun, genomförde RoslagsTak i september 2026 ett komplett takbyte på ett hus med utsikt över fjärden. Delar av råsponten byttes ut där den var skadad, resten behölls.",
      "Taket har två material: röda betongpannor på huvudbyggnadens tak, och röd TP20-plåt (trapetsprofilerad plåt) på de lägre takdelarna — ett vanligt sätt att hålla nere vikten och kostnaden på tillbyggnader utan att tumma på utseendet.",
      "Jobbet är utfört av RoslagsTak med kundens samtycke till att bilderna publiceras i marknadsföring, inklusive startsidans hero-bild.",
    ],
    heroImage: imgSingoHero,
    heroAlt: "Rött tak på hus på Singö i Grisslehamn med utsikt över fjärden, drönarbild snett ovanifrån",
    gallery: [
      {
        src: imgSingoDetail1,
        alt: "Rakt ovanifrån: röda betongpannor på huvudtaket och röd TP20-plåt på de lägre takdelarna, Singö",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectsByMaterial = (materialSlug: MaterialSlug) =>
  projects.filter((p) => p.materialSlugs.includes(materialSlug));

const NEARBY_PROJECT_MAX_KM = 30;

const distanceKm = (a: LocationData, b: LocationData) => {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
};

/**
 * Ett referensjobb att visa på en ortssida som saknar ett eget projekt — men bara om det verkligen
 * ligger nära (Marknadschefen 2026-09-29, regel 5: aldrig ett vilseledande "i närområdet"). Kräver
 * ≤30 km fågelvägen. Bara avstånd, inte "samma region" — några av de namngivna regionerna
 * (t.ex. Norra skärgården, 57 km mellan ytterpunkterna) är för stora för att räknas som närområde
 * på egen hand. Länktexten på anropsstället ska alltid skriva ut projektets egen ort (locationName),
 * aldrig bara "i närområdet" utan angiven plats.
 */
export const getNearbyProject = (location: LocationData) => {
  if (projects.some((p) => p.locationSlug === location.slug)) return undefined;
  return projects.find((p) => {
    const projectLocation = locations.find((l) => l.slug === p.locationSlug);
    if (!projectLocation) return false;
    return distanceKm(location, projectLocation) <= NEARBY_PROJECT_MAX_KM;
  });
};
