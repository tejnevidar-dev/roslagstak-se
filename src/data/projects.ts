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
import { distanceKm } from "@/data/service-reach";

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
    title: "Nytt tak på Blidö",
    locationName: "Blidö, Norrtälje",
    locationSlug: "blido",
    serviceName: "Takrenovering",
    serviceSlug: "takrenovering",
    material: "Betongpannor (Benders, svart)",
    materialSlugs: ["betongpannor"],
    period: "sommaren 2026",
    summary:
      "Komplett takbyte på ett hus på Blidö i Norrtälje kommun, med svarta betongpannor från Benders, nytt underlag, ny läkt, nya plåtdetaljer och nya hängrännor. Befintlig råspont behölls.",
    description: [
      "Huset ligger i skogen på Blidö i Norrtälje kommun. Uppdraget var ett komplett takbyte, från underlag till avvattning.",
      "Nytt ytmaterial är betongpannor från Benders i svart.",
      "Nytt underlag, ny läkt, nya betongpannor, nya plåtdetaljer, nya skorstensbeslag och nya hängrännor. Den befintliga råsponten behölls.",
      "Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser, där vi tittar på taket på plats. Därefter får kunden ett fast pris, arbetet utförs enligt AMA och kunden har en kontaktperson genom hela processen. Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI, och ROT-avdraget dras direkt på fakturan.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke.",
    ],
    heroImage: imgBlidoHero,
    heroAlt: "Nylagt tak med svarta betongpannor från Benders på ett mörkbrunt trähus på Blidö, sett snett ovanifrån från altansidan med lövskog runt omkring.",
    gallery: [
      {
        src: imgBlidoDetail1,
        alt: "Närbild snett ovanifrån av nocken och de svarta betongpannorna på huset på Blidö, med skorstenar och nya plåtbeslag.",
      },
      {
        src: imgBlidoDetail2,
        alt: "Taket med svarta betongpannor på huset på Blidö sett från baksidan, med skorsten, altan och skog runt tomten.",
      },
    ],
  },
  {
    slug: "takbyte-singo",
    title: "Nytt tak på Singö",
    locationName: "Singö, Grisslehamn",
    locationSlug: "singo",
    serviceName: "Takbyte",
    serviceSlug: "takomlaggning",
    material: "Betongpannor på huvudtaket, TP20-plåt på de lägre delarna (båda röda)",
    materialSlugs: ["betongpannor", "tp20-plattak"],
    period: "september 2026",
    summary:
      "Komplett takbyte på ett hus på Singö i Grisslehamn, med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna. Delar av råsponten byttes.",
    description: [
      "Huset ligger på Singö i Grisslehamn, Norrtälje kommun, med utsikt över fjärden. Uppdraget var ett komplett takbyte.",
      "Två material i samma röda kulör: betongpannor på huvudtaket och TP20, en trapetsprofilerad plåt, på de lägre delarna.",
      "Komplett takbyte, inklusive byte av delar av råsponten. Resten av råsponten behölls.",
      "Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser, där vi tittar på taket på plats. Därefter får kunden ett fast pris, arbetet utförs enligt AMA och kunden har en kontaktperson genom hela processen. Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI, och ROT-avdraget dras direkt på fakturan.",
      "Jobbet är utfört av RoslagsTak, och bilderna publiceras med kundens samtycke, även på startsidan.",
    ],
    heroImage: imgSingoHero,
    heroAlt: "Nytt tak på Singö i Grisslehamn med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna, med utsikt över fjärden.",
    gallery: [
      {
        src: imgSingoDetail1,
        alt: "Taket på huset på Singö sett rakt ovanifrån, med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre takdelarna.",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectsByMaterial = (materialSlug: MaterialSlug) =>
  projects.filter((p) => p.materialSlugs.includes(materialSlug));

const NEARBY_PROJECT_MAX_KM = 30;

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
