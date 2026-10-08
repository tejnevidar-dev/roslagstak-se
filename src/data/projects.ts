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
import imgGrisslehamnHeroAvif1080 from "@/assets/project-grisslehamn-hero-1080.avif";
import imgGrisslehamnHeroAvif1440 from "@/assets/project-grisslehamn-hero-1440.avif";
import imgGrisslehamnHeroWebp480 from "@/assets/project-grisslehamn-hero-480.webp";
import imgGrisslehamnHeroWebp768 from "@/assets/project-grisslehamn-hero-768.webp";
import imgGrisslehamnHeroWebp1080 from "@/assets/project-grisslehamn-hero-1080.webp";
import imgGrisslehamnHeroWebp1440 from "@/assets/project-grisslehamn-hero-1440.webp";
import imgGrisslehamnDetail1 from "@/assets/project-grisslehamn-detail-1.jpg";
import imgGrisslehamnDetail1Webp from "@/assets/project-grisslehamn-detail-1-1080.webp";
import imgGrisslehamnDetail2 from "@/assets/project-grisslehamn-detail-2.jpg";
import imgGrisslehamnDetail2Webp from "@/assets/project-grisslehamn-detail-2-1080.webp";
import imgGrisslehamnDetail3 from "@/assets/project-grisslehamn-detail-3.jpg";
import imgGrisslehamnDetail3Webp from "@/assets/project-grisslehamn-detail-3-1080.webp";
import type { MaterialSlug } from "@/data/materials";
import { projectTexts } from "@/data/project-texts";

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
  /** Takets yta när den är uppgiven, se project-texts.ts. */
  area?: string;
  facts?: { label: string; value: string }[];
  summary: string;
  metaDescription?: string;
  heroCaption?: string;
  description: string[];
  heroImage: string;
  heroAlt: string;
  heroResponsive: ResponsiveHero;
  /** webp = 1080 px bred WebP-variant (scripts/gen-gallery-webp.mjs), width/height = originalets mått. */
  gallery: { src: string; alt: string; webp?: string; width?: number; height?: number }[];
}

/** Bildtexterna (alt) står i project-texts.ts (galleryAlts), så att den statiska HTML:en kan läsa dem utan bildimporter (AG1, paket 24). */
type ProjectImages = Pick<Project, "heroImage" | "heroResponsive"> & { gallery: Omit<Project["gallery"][number], "alt">[] };

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
      },
      {
        src: imgBlidoDetail2,
        webp: imgBlidoDetail2Webp,
        width: 1440,
        height: 1080,
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
      },
    ],
  },
  // Vidars originalbilder (Dropbox 2026-10-06, 1440×1080, ingen metadata): scripts/gen-grisslehamn-images.mjs.
  "takbyte-grisslehamn": {
    heroImage: imgGrisslehamnHero,
    heroResponsive: {
      avifSrcSet: `${imgGrisslehamnHeroAvif480} 480w, ${imgGrisslehamnHeroAvif768} 768w, ${imgGrisslehamnHeroAvif1080} 1080w, ${imgGrisslehamnHeroAvif1440} 1440w`,
      webpSrcSet: `${imgGrisslehamnHeroWebp480} 480w, ${imgGrisslehamnHeroWebp768} 768w, ${imgGrisslehamnHeroWebp1080} 1080w, ${imgGrisslehamnHeroWebp1440} 1440w`,
      width: 1440,
      height: 1080,
    },
    gallery: [
      {
        src: imgGrisslehamnDetail2,
        webp: imgGrisslehamnDetail2Webp,
        width: 1440,
        height: 1080,
      },
      {
        src: imgGrisslehamnDetail1,
        webp: imgGrisslehamnDetail1Webp,
        width: 1440,
        height: 1080,
      },
      {
        src: imgGrisslehamnDetail3,
        webp: imgGrisslehamnDetail3Webp,
        width: 1440,
        height: 1080,
      },
    ],
  },
};

export const projects: Project[] = projectTexts.map((t) => {
  const images = projectImages[t.slug];
  if (!images) throw new Error(`Projektet ${t.slug} saknar bilder i projects.ts (projectImages)`);
  return { ...t, ...images, gallery: images.gallery.map((g, i) => ({ ...g, alt: t.galleryAlts[i] ?? "" })) };
});

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getProjectsByMaterial = (materialSlug: MaterialSlug) =>
  projects.filter((p) => p.materialSlugs.includes(materialSlug));
