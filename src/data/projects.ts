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
import imgBlidoHeroAvif480 from "@/assets/project-blido-hero-480.avif";
import imgBlidoHeroAvif768 from "@/assets/project-blido-hero-768.avif";
import imgBlidoHeroAvif1080 from "@/assets/project-blido-hero-1080.avif";
import imgBlidoHeroWebp480 from "@/assets/project-blido-hero-480.webp";
import imgBlidoHeroWebp768 from "@/assets/project-blido-hero-768.webp";
import imgBlidoHeroWebp1080 from "@/assets/project-blido-hero-1080.webp";
import imgBlidoDetail1 from "@/assets/project-blido-detail-1.jpg";
import imgBlidoDetail1Webp from "@/assets/project-blido-detail-1-1080.webp";
import imgBlidoDetail2 from "@/assets/project-blido-detail-2.jpg";
import imgBlidoDetail2Webp from "@/assets/project-blido-detail-2-1080.webp";
import imgSingoHero from "@/assets/project-singo-hero.jpg";
import imgSingoHeroAvif480 from "@/assets/project-singo-hero-480.avif";
import imgSingoHeroAvif768 from "@/assets/project-singo-hero-768.avif";
import imgSingoHeroAvif1080 from "@/assets/project-singo-hero-1080.avif";
import imgSingoHeroAvif1440 from "@/assets/project-singo-hero-1440.avif";
import imgSingoHeroWebp480 from "@/assets/project-singo-hero-480.webp";
import imgSingoHeroWebp768 from "@/assets/project-singo-hero-768.webp";
import imgSingoHeroWebp1080 from "@/assets/project-singo-hero-1080.webp";
import imgSingoHeroWebp1440 from "@/assets/project-singo-hero-1440.webp";
import imgSingoDetail1 from "@/assets/project-singo-detail-1.jpg";
import imgSingoDetail1Webp from "@/assets/project-singo-detail-1-1080.webp";
import imgGrisslehamnHero from "@/assets/project-grisslehamn-hero.jpg";
import imgGrisslehamnHeroAvif480 from "@/assets/project-grisslehamn-hero-480.avif";
import imgGrisslehamnHeroAvif768 from "@/assets/project-grisslehamn-hero-768.avif";
import imgGrisslehamnHeroWebp480 from "@/assets/project-grisslehamn-hero-480.webp";
import imgGrisslehamnHeroWebp768 from "@/assets/project-grisslehamn-hero-768.webp";
import imgGrisslehamnDetail1 from "@/assets/project-grisslehamn-detail-1.jpg";
import type { MaterialSlug } from "@/data/materials";
import { projectTexts } from "@/data/project-texts";
import { locations, type LocationData } from "@/data/locations";
import { distanceKm } from "@/data/service-reach";

/* Responsiva hero-varianter (AVIF/WebP, genererade av scripts/gen-responsive-hero.mjs från
   källbilderna i src/assets/), SEO-fynd #1h/#1k: /projekt/takbyte-singo hade LCP 8,9 s på en
   692 kB ooptimerad JPEG. heroImage (originalet) är alltid sista fallback i <picture>. */
export interface ResponsiveHero {
  avifSrcSet: string;
  webpSrcSet: string;
  width: number;
  height: number;
}

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
  heroResponsive: ResponsiveHero;
  /** webp = 1080 px bred WebP-variant (scripts/gen-gallery-webp.mjs), width/height = originalets mått. */
  gallery: { src: string; alt: string; webp?: string; width?: number; height?: number }[];
}

type ProjectImages = Pick<Project, "heroImage" | "heroResponsive" | "gallery">;

/** Bilder per projekt-slug. Texten kommer från src/data/project-texts.ts. */
const projectImages: Record<string, ProjectImages> = {
  "takrenovering-blido": {
    heroImage: imgBlidoHero,
    heroResponsive: {
      avifSrcSet: `${imgBlidoHeroAvif480} 480w, ${imgBlidoHeroAvif768} 768w, ${imgBlidoHeroAvif1080} 1080w`,
      webpSrcSet: `${imgBlidoHeroWebp480} 480w, ${imgBlidoHeroWebp768} 768w, ${imgBlidoHeroWebp1080} 1080w`,
      width: 1125,
      height: 844,
    },
    gallery: [
      {
        src: imgBlidoDetail1,
        webp: imgBlidoDetail1Webp,
        width: 1440,
        height: 1080,
        alt: "Närbild snett ovanifrån av nocken och de svarta betongpannorna på huset på Blidö, med skorstenar och nya plåtbeslag.",
      },
      {
        src: imgBlidoDetail2,
        webp: imgBlidoDetail2Webp,
        width: 1440,
        height: 1080,
        alt: "Taket med svarta betongpannor på huset på Blidö sett från baksidan, med skorsten, altan och skog runt tomten.",
      },
    ],
  },
  "takbyte-singo": {
    heroImage: imgSingoHero,
    heroResponsive: {
      avifSrcSet: `${imgSingoHeroAvif480} 480w, ${imgSingoHeroAvif768} 768w, ${imgSingoHeroAvif1080} 1080w, ${imgSingoHeroAvif1440} 1440w`,
      webpSrcSet: `${imgSingoHeroWebp480} 480w, ${imgSingoHeroWebp768} 768w, ${imgSingoHeroWebp1080} 1080w, ${imgSingoHeroWebp1440} 1440w`,
      width: 1440,
      height: 1080,
    },
    gallery: [
      {
        src: imgSingoDetail1,
        webp: imgSingoDetail1Webp,
        width: 1280,
        height: 720,
        alt: "Taket på huset på Singö sett rakt ovanifrån, med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre takdelarna.",
      },
    ],
  },
  // Stillbilder ur Vidars film (832×464, ingen metadata, ingen person i bild). Bara små bilder tills originalfilerna kommer.
  "takbyte-grisslehamn": {
    heroImage: imgGrisslehamnHero,
    heroResponsive: {
      avifSrcSet: `${imgGrisslehamnHeroAvif480} 480w, ${imgGrisslehamnHeroAvif768} 768w`,
      webpSrcSet: `${imgGrisslehamnHeroWebp480} 480w, ${imgGrisslehamnHeroWebp768} 768w`,
      width: 832,
      height: 464,
    },
    gallery: [
      {
        src: imgGrisslehamnDetail1,
        width: 832,
        height: 464,
        alt: "Taket i Grisslehamn efter takbytet.",
      },
    ],
  },
};

export const projects: Project[] = projectTexts.map((t) => {
  const images = projectImages[t.slug];
  if (!images) throw new Error(`Projektet ${t.slug} saknar bilder i projects.ts (projectImages)`);
  return { ...t, ...images };
});

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
