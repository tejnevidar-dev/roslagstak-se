/**
 * Riktiga referensjobb (projektarkiv, SEO-programmet avsnitt 10/backlog #3).
 * Endast belagda fakta från Vidar, med kundens samtycke till marknadsföring (dokumenterat i
 * ledning/marknad/innehall/material/<mapp>/fakta.md). Aldrig kundens namn eller adress/väg —
 * bara "<plats>, <kommun>". Gissa aldrig yta, tidsåtgång eller pris där det inte är angivet.
 */
import imgBlidoHero from "@/assets/project-blido-hero.jpg";
import imgBlidoDetail1 from "@/assets/project-blido-detail-1.jpg";
import imgBlidoDetail2 from "@/assets/project-blido-detail-2.jpg";
import imgSingoHero from "@/assets/project-singo-hero.jpg";
import imgSingoDetail1 from "@/assets/project-singo-detail-1.jpg";

export interface Project {
  slug: string;
  title: string;
  locationName: string;
  locationSlug: string;
  serviceName: string;
  serviceSlug: string;
  material: string;
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
