/**
 * Build-time content model for the static prerender.
 *
 * The app is a client-rendered SPA, so crawlers that do not execute JS see an
 * empty <div id="root">. This module returns the *important* text for every
 * route (H1, intro, body paragraphs, key internal links) so the build can put
 * it straight into the initial HTML. React clears #root on mount, so the same
 * content is then rendered by the app itself — no duplication, no cloaking:
 * the prerendered text is the same text the visitor sees.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ortSeoOverrides } from "../src/data/seo-overrides";
import { adLandingCopy, getAdLanding } from "../src/data/ad-landings";
import { bookingCopy } from "../src/data/ad-landings";
import { locations } from "../src/data/locations";
import { generateServiceLocationFAQs } from "../src/data/location-faqs";
import { problems, SAKERHETSRUTA } from "../src/data/problems";
import { materials, MATERIAL_PRIS_LANK } from "../src/data/materials";
import { MATERIAL_PRISAVSNITT, prisAvsnittForSpegel } from "../src/data/material-prices";
import { MATERIAL_EXTRAS, SERVICE_EXTRAS } from "../src/data/page-extras";
import { projectTexts } from "../src/data/project-texts";
import { regionTexts } from "../src/data/region-texts";
import { withRotForbehall, priceData, priceFaqs, PRICE_HERO_TEXT, PRICE_NOTE, PRICE_ROT_TITLE, PRICE_ROT_TEXT, PRICE_FACTORS_TITLE, PRICE_FACTORS_TEXT } from "../src/data/prices";
import { allServiceSlugs, generateCombos, COMBO_SERVICE_PAGE, comboDefaultTitle, comboDefaultH1, comboListLink } from "../src/data/service-location-combos";
import { blogPosts } from "../src/data/blog-posts";
import { stripInlineMd, inlineMdLinks, isHeading } from "../src/lib/inline-md";
import { buildBody, type BodyItem } from "../src/lib/body-items";
import { problemsForLocation, regionLinksForProblems, takkontrollLink } from "../src/data/problem-links";
import { hubLinksFor, REGION_EXTRA_LINKS } from "../src/data/hub-links";
import { TAKTVATT_FAQS, TAKTVATT_H1, TAKTVATT_INTRO, TAKTVATT_META, TAKTVATT_SECTIONS, TAKTVATT_TITLE } from "../src/data/taktvatt-text";
import { relatedForPost } from "../src/data/blog-related";
import { relatedPosts, guidesForTitle } from "../src/data/related-posts";
import { buildBlogPostingSchema } from "../src/lib/blog-schema";
import { guideContent } from "../src/data/blog-cta";
import { generateLocationFAQs } from "../src/data/location-faqs";
import { buildFaqSchema, SITE_URL as SCHEMA_SITE_URL } from "../src/lib/schema";
import { roofTypeFaqs } from "../src/data/roof-type-faqs";
import { eternitFaqs } from "../src/data/eternit-content";
import { homeFaqs } from "../src/data/home-faqs";
import { HOME_HERO, HOME_TRUST_ITEMS, HOME_QUICK, HOME_SERVICES_INTRO } from "../src/data/home-sections";
import { HOME_REFERENS, HOME_REFERENS_ORDER } from "../src/data/home-referens";
import { HOME_ABOUT_BENEFITS, HOME_ABOUT_CAPTION, HOME_ABOUT_INTRO, HOME_ABOUT_P1, HOME_ABOUT_P2, homeAboutP3Text, HOME_CORE_VALUES, HOME_WORKFLOW } from "../src/data/home-about";
import { HOME_AREA_INTRO, HOME_AREA_PANEL, HOME_AREA_SEO_HEADING, HOME_AREA_SEO_PARAGRAPHS, homeAreaIntroText, stripBold } from "../src/data/home-area";
import { HOME_GUIDES, HOME_GUIDES_COUNT, homeGuideLeadCaption, homeGuideReadTime } from "../src/data/home-guides";
import { locationIndex as homeLocationIndex } from "../src/data/location-index";
import { processFaqs } from "../src/data/process-faqs";
import { brfFaqs, brfFaqsFor } from "../src/data/brf-faqs";
import {
  BRF_BOENDE, BRF_ECONOMY, BRF_FACTS, BRF_FORM, BRF_HERO_CAPTION, BRF_INTRO, BRF_OFFER, BRF_PLACES_HEADING, BRF_PROCESS, BRF_RESIDENTS, BRF_STEPS,
  brfEyebrow, brfHeroIntro, brfPlaceHeading, brfPlaceLine, brfPlaceParagraphs,
} from "../src/data/brf-sections";
import { RELATED_LINKS_INTRO, RELATED_LINKS_TITLE } from "../src/data/related-links-text";

/**
 * BRF-sidornas text i den statiska HTML:en (AC5): samma block, i samma ordning och med samma ord som BrfPage.tsx, ur src/data/brf-sections.ts.
 * `place` är orten på /brf/<ort> (utelämnad på /brf); `nearby` är närliggande orter som har egen BRF-sida.
 */
const brfBody = (opts: { place?: { prep: string; name: string }; nearby?: string[]; extra: BodyItem[]; faqs: { question: string; answer: string }[] }) => {
  const { place, nearby = [], extra, faqs } = opts;
  return buildBody([
    brfEyebrow(place),
    BRF_HERO_CAPTION,
    ...BRF_FACTS.flatMap((f) => [f.label, f.value]),
    { h: BRF_INTRO.heading },
    BRF_INTRO.text,
    ...BRF_INTRO.items.flatMap(([title, text]) => [title, text]),
    ...(place ? [{ h: brfPlaceHeading(place) }, ...brfPlaceParagraphs(place), brfPlaceLine(place, nearby)] : []),
    BRF_PROCESS.eyebrow,
    { h: BRF_PROCESS.heading },
    BRF_PROCESS.intro,
    ...BRF_STEPS.flatMap((s) => [{ h: s.title, level: 3 as const }, s.text]),
    BRF_OFFER.eyebrow,
    { h: BRF_OFFER.heading },
    { h: BRF_OFFER.replace.title, level: 3 as const },
    BRF_OFFER.replace.text,
    ...BRF_OFFER.replace.items,
    BRF_OFFER.replace.link,
    { h: BRF_OFFER.check.title, level: 3 as const },
    BRF_OFFER.check.text,
    ...BRF_OFFER.check.items,
    BRF_OFFER.check.link,
    BRF_ECONOMY.eyebrow,
    { h: BRF_ECONOMY.heading },
    ...BRF_ECONOMY.paragraphs,
    BRF_RESIDENTS.eyebrow,
    { h: BRF_RESIDENTS.heading },
    ...BRF_BOENDE.flatMap((b) => [{ h: b.title, level: 3 as const }, b.text]),
    BRF_FORM.eyebrow,
    { h: BRF_FORM.heading },
    BRF_FORM.text,
    `${BRF_FORM.areaText} ${BRF_FORM.areaLink}`,
    BRF_FORM.finePrint1,
    `${BRF_FORM.finePrint2} ${BRF_FORM.finePrint2Link}.`,
    ...(place ? [] : [{ h: BRF_PLACES_HEADING }]),
    ...extra,
    { h: "Frågor från styrelser om takbyte" },
    "Process, pris, garanti och vad som händer under arbetet.",
    ...faqs.flatMap((f) => [{ h: f.question, level: 3 as const }, stripInlineMd(f.answer)]),
    { h: RELATED_LINKS_TITLE },
    RELATED_LINKS_INTRO,
  ]);
};

import { LANDING_TEXT, LEAD_FORM_SUBTITLE, landingTrust } from "../src/data/landing-text";
import { AD_FAQS, AD_STEPS, AD_TEXT, AD_TRUST } from "../src/data/ad-landing-text";
import { QUOTE_CONFIG, QUOTE_PAGE, FREE_CONSULT } from "../src/data/offert-text";
import { GOOGLE_REVIEWS_TEXT } from "../src/data/google-reviews-text";
import { SERVICE_LOCATION_TEXT } from "../src/data/service-location-text";
import { MATERIAL_PAGE_TEXT, materialPricesSentence } from "../src/data/material-page-text";
import { BLOG_TEMPLATE, blogHasAside } from "../src/data/blog-template-text";
import { ISLAND_TEXT, ROOF_PRICE_HEADING, ROOF_TYPES_HEADING, ROOF_TYPES_PAGE, ROOF_TYPE_ORDER, ROOF_TYPE_TEXTS, roofPriceText, roofTypesIntroText } from "../src/data/taktyper-text";
import { ROT_FORBEHALL as TAKTYP_ROT_FORBEHALL, STALLNING_MENING as TAKTYP_STALLNING } from "../src/data/prices";
import { RELATED_LINKS_INTRO as TAKTYP_RELATED_INTRO } from "../src/data/related-links-text";

const MONEY_LINKS = [
  { href: "/takkontroll", label: "Kostnadsfri takkontroll" },
  { href: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
];
import { brfLocationSlugs } from "../src/data/brf-locations";
import { applyMall, OAR_UTAN_BILVAG, usesMall } from "../src/data/location-mall";
import { isNearBase, distanceFromBaseKm, distanceKm } from "../src/data/service-reach";
import { locationWhySections } from "../src/data/location-sections";
import { hasServiceCombos } from "../src/data/service-slugs";
import { isThinCombo } from "../src/data/thin-combos";
import { comboOverrides } from "../src/data/combo-overrides";
import { villaAreasParagraph, villaAreasByPage, villaAreasBlocks } from "../src/data/villa-areas";
import { LOCATION_PAGE_TEXT } from "../src/data/location-page-text";
import { buildLocalSections } from "../src/data/local-sections";
import { serviceStaticPage, serviceSchemaNodes } from "../src/data/service-page";

const villaAreaLinks = (key: string) =>
  (villaAreasByPage[key]?.areas ?? [])
    .filter((a) => a.href)
    .map((a) => ({ href: a.href!, label: `Takläggare i ${a.name}` }));
import { landingServices } from "../src/data/landing-services";
import { fitDescription, fitTitle } from "../src/lib/seo-fit";
import { CANONICAL_ALIASES } from "../src/lib/canonical";
import { regionBySlug, regionIntros, regionNeighbors, regionOrder, regionSlugs } from "../src/data/regions";

// Fas 2.19: samma schemanoder som React-sidorna, exponerade för generate-static-heads.mjs.
export { buildOrganizationNode, buildWebSiteNode, buildWebPageNode, buildBreadcrumbNode } from "../src/lib/schema-graph";
export { buildLocalBusinessSchema, buildLocalBusinessLeanSchema } from "../src/lib/schema";

/** Inline-CSS för rubrik och ingress i den statiska HTML:en, spegling av Reacts hero (ServiceLandingPage, AdLandingPage, BookingPage).
 *  Karla/Fraunces är samma webbtypsnitt som sajten. Den statiska textrutan ska aldrig vara mindre än Reacts, annars blir Reacts
 *  text en större LCP-kandidat vid hydrering: ingressen har därför lite större radavstånd (1.7 mot 1.625) och rubriken samma
 *  teckenstorlek men full bredd och radavstånd 1.25 (Reacts rubrik är balanserad till 20ch och 1.07; mätt på /takreparation). */
export const HERO_STYLES = {
  service: {
    h1: "font-family:Fraunces,Georgia,serif;font-weight:600;font-size:clamp(2.1rem,4.6vw,3.5rem);line-height:1.25;color:#1a365d;margin:0",
    intro: "font-family:Karla,sans-serif;font-size:18px;line-height:1.7;max-width:54ch;margin:24px 0 0;color:#4b5563",
  },
  ad: {
    h1: "font-family:Fraunces,Georgia,serif;font-weight:600;font-size:clamp(2.1rem,6vw,3.4rem);line-height:1.25;color:#1a365d;margin:0",
    intro: "font-family:Karla,sans-serif;font-size:18px;line-height:1.7;max-width:50ch;margin:20px 0 0;color:#4b5563",
  },
} as const;

export interface PrerenderPage {
  h1: string;
  intro: string;
  paragraphs: string[];
  links: { href: string; label: string }[];
  /** Unique <title> for the static HTML (before JS runs). Mirrors SEOHead. */
  title?: string;
  /** Unique meta description for the static HTML. */
  description?: string;
  /** Sidspecifik delningsbild för den statiska HTML:en (og:image/twitter:image), t.ex. ett
   *  projektfoto eller en materialbild — en STABIL sökväg under public/ (aldrig en Vite-import,
   *  det här scriptet körs via esbuild utan Vite:s tillgångsupplösning). Mirrors SEOHead. */
  ogImage?: string;
  /** Brödsmulor: samma stigar som sidans egen <Breadcrumbs>. `name` används för BreadcrumbList-
   *  schemat (position = index+1, item = SITE_URL+path för varje steg); `visibleName` (om satt)
   *  används i den synliga navigeringen i stället, för sidor där de skiljer sig åt (t.ex.
   *  ortssidans schema säger "Takläggare på Blidö" men den synliga texten bara "Blidö").
   *  Sista steget har alltid sin egen path (behövs för schemats sista item), men renderas aldrig
   *  som länk i den synliga navigeringen (mirrors Breadcrumbs.tsx: sista steget är alltid text). */
  breadcrumbs?: { name: string; path: string; visibleName?: string }[];
  /** Extra JSON-LD-objekt som skrivs som <script type="application/ld+json"> i den statiska HTML:en (t.ex. BlogPosting). */
  jsonLd?: Record<string, unknown>[];
  ogImageAlt?: string;
  /** Sidor vars React-hero har egen typografi: den statiska rubriken och ingressen skrivs då med samma storlek, radavstånd och
   *  bredd som Reacts, så att den statiska texten är LCP-elementet och Reacts text inte blir en större kandidat vid hydrering
   *  (LCP-utredning /akut-lackage, /hangrannor 2026-10-05). Se HERO_STYLES. */
  hero?: keyof typeof HERO_STYLES;
  /** Bilder i den statiska HTML:en, per styckeindex: bilden skrivs rakt före stycket. Bara stabila sökvägar under public/ (aldrig Vite-importer). */
  images?: Record<number, { src: string; alt: string; width: number; height: number; eager?: boolean }>;
  /** Rubriknivå per styckeindex (2 eller 3). Stycken som står här skrivs som <h2>/<h3> i den statiska HTML:en
   *  (G1 i konkurrentanalysen: crawlers utan JS ska se samma rubrikstruktur som besökaren). Texten i
   *  paragraphs är oförändrad, så ordräkning och meningsgrind påverkas inte. */
  headingAt?: Record<number, 2 | 3>;
}

export { buildBody, type BodyItem } from "../src/lib/body-items";
// SEO Command Center (S0): samma meta-funktion och beskärning som SEOHead, för generate-static-heads.mjs.
export { resolveMeta } from "../src/data/overrides";
import { buildOverrideBlocks } from "../src/data/overrides";
import { applyOverrideBlocks } from "../src/lib/innehall-apply";
export { fitTitle, fitDescription, withSuffix } from "../src/lib/seo-fit";

/* Services live in a React component; read the data with a regex so the
   prerender never has to bundle JSX or lucide-react. */
const servicesSource = readFileSync(resolve("src/components/Services.tsx"), "utf8");
const services = [
  ...servicesSource.matchAll(
    /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",[\s\S]*?description:\s*\n?\s*"([^"]+)"/g,
  ),
].map((m) => ({ slug: m[1], title: m[2], description: m[3] }));

/** Referensjobbens text kommer direkt ur src/data/project-texts.ts (ren data, ingen spegling). */
const projectSummaries = projectTexts.map((t) => ({ ...t, ogImageAlt: t.heroAlt }));


const PHONE = "070-154 36 39";

const primaryLinks = [
  { href: "/", label: "Hem" },
  { href: "/priser", label: "Priser för takarbeten" },
  { href: "/blogg", label: "Guider om tak" },
  { href: "/recensioner", label: "Recensioner" },
  { href: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
  { href: "/kontakt", label: "Kontakt" },
];

const serviceLinks = services.map((s) => ({
  href: `/tjanster/${s.slug}`,
  label: s.title,
}));

const locationLinks = locations.map((l) => ({
  href: `/taklaggare-${l.slug}`,
  label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
}));

const combos = generateCombos();
const comboByUrl = new Map(combos.map((c) => [c.url, c]));

/** Startsidans sektion "Referensjobb" (components/ReferenceCases.tsx): samma rubrik, kort, bild, text och länk i den statiska HTML:en. */
const referensCases = HOME_REFERENS_ORDER.map((slug) => projectTexts.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => !!p);

const home: PrerenderPage = {
  h1: "Takläggare i Roslagen — takbyte & takrenovering",
  intro:
    "RoslagsTak är takläggare i Roslagen med bas i Norrtälje. Vi utför takbyte, takrenovering, takomläggning, plåtarbeten och taktvätt i hela Roslagen och Stockholms norra skärgård — 10 års utförandegaranti och ROT-avdrag.",
    paragraphs: [
      "Vi arbetar med TP20 plåttak, dubbelfalsat plåttak (bandtäckning), pannplåt, betongpannor, lertegel och papptak. Allt arbete utförs enligt AMA.",
      "Vi tar också uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Båda finns med bilder under Projekt.",
      "Sedan 2026 arbetar vi även i hela Storstockholm — från Täby, Danderyd och Sollentuna i norr till Nacka, Huddinge och Södertälje i söder. Samma fasta priser, samma garanti och samma kontaktperson genom hela projektet.",
      "Ett komplett takbyte hos oss innehåller allt: rivning av gamla taket, byte av råspont och underlagspapp vid behov, ny läkt, tätskikt, plåtbeslag kring skorsten och genomföringar, taksäkerhet. Du får en kontaktperson som följer projektet från takkontroll till slutgenomgång.",
      "Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor.",
      `Boka en kostnadsfri takkontroll. Vi återkopplar inom 24 timmar. Ring ${PHONE} eller boka på /kontakt.`,
    ],
  links: [...primaryLinks, { href: "/projekt", label: "Projekt" }, { href: "/takbyte-norrtalje", label: "Byta tak i Norrtälje" }, ...referensCases.map((c) => ({ href: `/projekt/${c.slug}`, label: c.title })), { href: "/recensioner", label: "Recensioner" }, { href: "/takomlaggning-norrtalje", label: "Takomläggning i Norrtälje" }, ...serviceLinks, ...locationLinks],
};

/** Interna länkar som står som [text](/länk) i FAQ-svar: i den statiska HTML:en blir de riktiga länkar i länklistan, texten och schemat är rena. */
const faqLinks = (faqs: { answer: string }[]) => faqs.flatMap((f) => inlineMdLinks(f.answer));
/**
 * Startsidans förtroende- och tjänstesektioner i den statiska HTML:en (R4): hero-texten och faktarutan, förtroenderaden
 * (TrustBar), snabbvalen (QuickAccess) och tjänstekorten (Services). Texterna kommer ur src/data/home-sections.ts och
 * services-arrayen i Services.tsx, samma strängar som React visar; src/test/home-static-parity.test.ts kontrollerar det.
 * Ordning som på sidan: hero, förtroende, snabbval, referensjobb, tjänster, resten.
 */
const homeServiceCards = [
  ...servicesSource.matchAll(
    /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*short:\s*"([^"]+)",\s*\n\s*description:\s*\n?\s*"([^"]+)",(\s*\n\s*hideOnHome:\s*true,)?/g,
  ),
]
  .map((m) => ({ slug: m[1], title: m[2], short: m[3], description: m[4], hide: !!m[5] }))
  .filter((c) => !c.hide);
{
  type Delar = { paragraphs: string[]; headingAt: Record<number, 2 | 3> };
  const old = home.paragraphs;
  const para0 = old[0];
  const extras = old.slice(1, -1); // text som bara finns i den statiska HTML:en (ingen motsvarighet i React)
  const slut = old[old.length - 1];
  const pre = buildBody([
    HOME_HERO.eyebrow,
    HOME_HERO.text,
    ...HOME_HERO.chips,
    ...HOME_TRUST_ITEMS.flatMap((i) => [i.value, i.label]),
    HOME_QUICK.eyebrow,
    { h: HOME_QUICK.heading },
    HOME_QUICK.phone,
    ...HOME_QUICK.cards.flatMap((c) => [c.label, { h: c.title, level: 3 as const }, c.text, c.cta]),
  ]);
  // Referensjobb (ReferenceCases.tsx): blocken i samma ordning som sidan; bilden hör till platsetiketten överst i varje kort
  const refItems: BodyItem[] = [HOME_REFERENS.eyebrow, { h: HOME_REFERENS.heading }, HOME_REFERENS.intro];
  const refImagePos: number[] = [];
  for (const c of referensCases) {
    refImagePos.push(refItems.length);
    refItems.push(
      c.locationName,
      { h: c.title, level: 3 as const },
      HOME_REFERENS.labels.job,
      c.serviceName,
      ...(c.area ? [HOME_REFERENS.labels.area, c.area] : []),
      HOME_REFERENS.labels.material,
      c.material,
      ...(c.period ? [HOME_REFERENS.labels.period, c.period] : []),
      c.metaDescription ?? c.summary,
      HOME_REFERENS.readMore,
    );
  }
  refItems.push(HOME_REFERENS.allLink, HOME_REFERENS.nearLink);
  const ref = buildBody(refItems);
  const svc = buildBody([
    HOME_SERVICES_INTRO.eyebrow,
    { h: `${HOME_SERVICES_INTRO.headingA} ${HOME_SERVICES_INTRO.headingB}` },
    HOME_SERVICES_INTRO.text,
    ...homeServiceCards.flatMap((c, i) => [`${String(i + 1).padStart(2, "0")} — ${c.short}`, { h: c.title, level: 3 as const }, c.description, "Läs mer"]),
  ]);
  // Om RoslagsTak och Så jobbar vi (About.tsx)
  const about = buildBody([
    HOME_ABOUT_CAPTION.eyebrow,
    HOME_ABOUT_CAPTION.text,
    HOME_ABOUT_INTRO.eyebrow,
    { h: `${HOME_ABOUT_INTRO.headingA} ${HOME_ABOUT_INTRO.headingB}` },
    HOME_ABOUT_P1,
    HOME_ABOUT_P2,
    homeAboutP3Text(),
    ...HOME_ABOUT_BENEFITS,
    HOME_WORKFLOW.eyebrow,
    { h: HOME_WORKFLOW.heading, level: 3 as const },
    HOME_WORKFLOW.intro,
    ...HOME_CORE_VALUES.flatMap((v, i) => [String(i + 1).padStart(2, "0"), v.title, v.description]),
  ]);
  // Vart finns vi (ServiceArea.tsx): regionerna med orter, samma ordning och samma beskrivningar som React
  const areas = regionOrder
    .filter((region) => homeLocationIndex.some((l) => l.region === region))
    .map((region) => ({ region, description: regionIntros[region] ?? "" }));
  const area = buildBody([
    HOME_AREA_INTRO.eyebrow,
    { h: `${HOME_AREA_INTRO.headingA} ${HOME_AREA_INTRO.headingB}` },
    homeAreaIntroText(areas.length),
    HOME_AREA_PANEL.label,
    String(areas.length),
    HOME_AREA_PANEL.unit,
    HOME_AREA_PANEL.workflow,
    `${HOME_AREA_PANEL.islandLead} ${HOME_AREA_PANEL.islandText}`,
    ...areas.flatMap((a, i) => [String(i + 1).padStart(2, "0"), { h: a.region, level: 3 as const }, a.description]),
    HOME_AREA_PANEL.allLink,
    { h: HOME_AREA_SEO_HEADING, level: 3 as const },
    ...HOME_AREA_SEO_PARAGRAPHS.map(stripBold),
  ]);
  // Guider & råd (GuidesTeaser.tsx): de första sex inläggen i blog-posts.ts
  const featured = blogPosts.slice(0, HOME_GUIDES_COUNT);
  const guides = buildBody([
    HOME_GUIDES.eyebrow,
    { h: `${HOME_GUIDES.headingA} ${HOME_GUIDES.headingB}` },
    HOME_GUIDES.allLink,
    ...featured.flatMap((post, i) =>
      i === 0
        ? [homeGuideLeadCaption(post), { h: post.title, level: 3 as const }, post.excerpt, HOME_GUIDES.leadReadMore]
        : [String(i + 1).padStart(2, "0"), { h: post.title, level: 3 as const }, post.excerpt, homeGuideReadTime(post)],
    ),
  ]);
  const delar: Delar[] = [{ paragraphs: [para0], headingAt: {} }, pre, ref, svc, { paragraphs: extras, headingAt: {} }, about, area, guides, { paragraphs: [slut], headingAt: {} }];
  const paragraphs: string[] = [];
  const headingAt: Record<number, 2 | 3> = {};
  const images: NonNullable<PrerenderPage["images"]> = {};
  let refStart = -1;
  for (const d of delar) {
    if (d === ref) refStart = paragraphs.length;
    for (const [k, v] of Object.entries(d.headingAt)) headingAt[Number(k) + paragraphs.length] = v;
    paragraphs.push(...d.paragraphs);
  }
  referensCases.forEach((c, k) => {
    images[refStart + refImagePos[k]] = { src: `/cases/${c.slug.replace(/^takbyte-|^takrenovering-/, "")}-480.webp`, alt: c.heroAlt, width: 480, height: 360 };
  });
  home.paragraphs = paragraphs;
  home.headingAt = headingAt;
  home.images = images;
}

/** FAQPage-nod för den statiska HTML:en (samma frågor och svar som sidan visar). */
const faqLd = (faqs: { question: string; answer: string }[], path: string): Record<string, unknown> =>
  buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: stripInlineMd(f.answer) })), `${SCHEMA_SITE_URL}${path}`) as Record<string, unknown>;

const landingPages: Record<string, PrerenderPage> = Object.fromEntries(
  landingServices.map((s) => [
    s.path,
    {
      title: s.seoTitle,
      description: s.seoDescription,
      h1: `${s.h1} ${s.h1Accent}`,
      intro: s.intro,
      ...buildBody([
        s.eyebrow,
        ...landingTrust(s.slug),
        s.formTitle,
        LEAD_FORM_SUBTITLE,
        ...(s.slug === "takkontroll" ? [LANDING_TEXT.takkontrollNote] : []),
        { h: s.listHeading },
        s.listIntro,
        ...s.list.flatMap((i) => [{ h: i.title, level: 3 as const }, i.text]),
        { h: s.stepsHeading },
        ...s.steps.flatMap((st) => [{ h: st.title, level: 3 as const }, st.text]),
        { h: s.extraHeading },
        ...s.extraParagraphs,
        s.priceNote,
        { h: s.faqTitle },
        LANDING_TEXT.faqIntro,
        ...s.faqs.flatMap((f) => [{ h: f.question, level: 3 as const }, stripInlineMd(f.answer)]),
        { h: LANDING_TEXT.relatedHeading },
        `Ring ${PHONE} eller skicka en förfrågan på ${s.path}. Vi återkommer inom 24 timmar.`,
      ]),
      links: [...primaryLinks, ...s.related.map((r) => ({ href: r.to, label: r.label }))],
      breadcrumbs: [
        { name: "Hem", path: "/" },
        { name: s.breadcrumb, path: s.path },
      ],
      jsonLd: [faqLd(s.faqs, s.path)],
      hero: "service",
    } satisfies PrerenderPage,
  ]),
);

const staticPages: Record<string, PrerenderPage> = {
  ...landingPages,
  "/": home,
  "/offert": {
    title: "Offert på takbyte — fast pris efter kostnadsfri takkontroll",
    description:
      "Beskriv ditt tak i några steg, så svarar vi inom 24 timmar, eller boka kostnadsfri takkontroll. Fast pris och 10 års utförandegaranti.",
    h1: "Få offert på takbyte i Roslagen",
    intro:
      "Beskriv ditt tak i några steg, så svarar vi inom 24 timmar, eller boka kostnadsfri takkontroll.",
    ...buildBody([
      // Sidans block i samma ordning och med samma ord som QuotePage, QuoteConfigurator och FreeConsultation (AD3; H1 orörd)
      QUOTE_PAGE.eyebrow,
      QUOTE_PAGE.text,
      QUOTE_CONFIG.eyebrow,
      { h: QUOTE_CONFIG.heading },
      QUOTE_CONFIG.intro,
      QUOTE_CONFIG.bannerTitle,
      QUOTE_CONFIG.bannerText,
      QUOTE_CONFIG.finePrintConfigure,
      `${QUOTE_CONFIG.privacy} ${QUOTE_CONFIG.privacyLink}.`,
      FREE_CONSULT.eyebrow,
      { h: FREE_CONSULT.heading },
      FREE_CONSULT.text,
      ...FREE_CONSULT.items.flatMap((i) => [{ h: i.title, level: 3 as const }, i.text]),
      GOOGLE_REVIEWS_TEXT.bandEyebrow,
      { h: GOOGLE_REVIEWS_TEXT.title },
      GOOGLE_REVIEWS_TEXT.ingress,
      { h: QUOTE_PAGE.relatedTitle },
      RELATED_LINKS_INTRO,
      // Text som bara finns i den statiska HTML:en (ingen motsvarighet som eget block i React)
      "Välj taktyp, ange takets yta och lutning och få ett riktpris direkt. Du får ett fast pris i offerten efter kostnadsfri takkontroll, och vi lämnar 10 års utförandegaranti på det arbete vi utför.",
      "Vad som ingår står i offerten. Ett komplett takbyte omfattar normalt nytt underlag, ny läkt, nytt ytmaterial och nya plåtdetaljer, och byggställning ingår.",
      "Så går det till: du skickar in förfrågan, vi återkopplar inom 24 timmar och bokar en kostnadsfri takkontroll. En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Efter takkontrollen får du en offert med fast pris. Tillägg görs bara efter ditt godkännande.",
      "När du accepterat offerten planerar vi arbetet tillsammans med dig och beställer material. Du har en kontaktperson genom hela processen.",
      "Vanliga frågor om offerten: Är takkontrollen verkligen gratis? Ja, takkontrollen är kostnadsfri och du förbinder dig inte till något.",
      "Vi tar uppdrag i Roslagen och Storstockholm.",
      "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
      "Vad händer om vi hittar skador under arbetet? Skadad råspont syns först när det gamla taket är rivet. Hittar vi något visar vi dig omfattningen och lämnar ett skriftligt pris på tillägget innan vi fortsätter. Inget extraarbete görs utan ditt godkännande. Det enda undantaget är om något akut måste skyddas mot skada, till exempel ett öppet tak inför regn, och vi inte får tag på dig. Då gör vi bara det som är nödvändigt.",
      `Föredrar du att prata? Ring ${PHONE} och beskriv ditt takprojekt, vi återkopplar inom 24 timmar.`,
    ]),
    links: [...primaryLinks, ...serviceLinks],
    breadcrumbs: [{ name: "Hem", path: "/" }, { name: "Offert & rådgivning", path: "/offert" }],
  },
  "/taktyper": {
    title: "Taktyper – jämför takmaterial för villa",
    description:
      "Jämför taktyper: betongpannor, lertegel, TP20-plåt, pannplåt, dubbelfalsad plåt och papptak. Riktpriser efter ROT och mer om varje material.",
    h1: "Vilket tak passar ditt hus?",
    intro:
      "Vi lägger betongpannor, lertegel, TP20-plåt, pannplåt, dubbelfalsad plåt (bandtäckning) och papptak. Här ser du materialen sida vid sida, med riktpris och länk till mer om vart och ett.",
    ...buildBody([
      // Sidans block i samma ordning och med samma ord som RoofTypes, IslandSpecialist och RoofTypesPage (AD4; H1 och hero-text orörda)
      ROOF_TYPES_PAGE.eyebrow,
      ROOF_TYPES_HEADING.meta,
      { h: `${ROOF_TYPES_HEADING.titleA} ${ROOF_TYPES_HEADING.titleB}` },
      roofTypesIntroText(),
      ...ROOF_TYPE_ORDER.flatMap((id) => [{ h: ROOF_TYPE_TEXTS[id].name, level: 3 as const }, ROOF_TYPE_TEXTS[id].sentence]),
      { h: ROOF_PRICE_HEADING, level: 3 as const },
      roofPriceText(TAKTYP_STALLNING, TAKTYP_ROT_FORBEHALL),
      ISLAND_TEXT.eyebrow,
      { h: ISLAND_TEXT.heading },
      ...ISLAND_TEXT.highlights.flatMap((h) => [{ h: h.title, level: 3 as const }, h.description]),
      ISLAND_TEXT.note,
      { h: ROOF_TYPES_PAGE.relatedTitle },
      TAKTYP_RELATED_INTRO,
      // Frågorna och svaren som FaqSection visar på sidan (samma data som FAQPage-schemat nedan)
      { h: "Frågor om taktyper och material" },
      "Pris, taklutning och vad som avgör valet av material.",
      ...roofTypeFaqs.flatMap((f) => [{ h: f.question, level: 3 as const }, stripInlineMd(f.answer)]),
    ]),
    links: [...primaryLinks, ...serviceLinks],
    breadcrumbs: [{ name: "Hem", path: "/" }, { name: "Taktyper", path: "/taktyper" }],
    jsonLd: [faqLd(roofTypeFaqs, "/taktyper")],
  },
  "/brf": {
    title: "Takbyte för BRF — bostadsrättsföreningar",
    description:
      "Takbyte och takkontroll för bostadsrättsföreningar i Storstockholm och Roslagen. Fast pris och 10 års utförandegaranti.",
    h1: "Takbyte för bostadsrättsföreningar, med underlag styrelsen kan besluta på",
    intro: brfHeroIntro(),
    ...brfBody({
      extra: [
        // Text som bara finns i den statiska HTML:en: garantiformuleringen och uppmaningen (ingen motsvarighet som eget block i React)
        "Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor.",
        `Boka en kostnadsfri takkontroll på /brf eller ring ${PHONE}. Vi återkommer inom 24 timmar.`,
      ],
      faqs: brfFaqs,
    }),
    jsonLd: [faqLd(brfFaqs, "/brf")],
    links: [
      ...primaryLinks,
      ...serviceLinks,
      ...(brfLocationSlugs as readonly string[])
        .map((slug) => locations.find((l) => l.slug === slug))
        .filter((l): l is NonNullable<typeof l> => !!l)
        .map((l) => ({ href: `/brf/${l.slug}`, label: `BRF ${l.isIsland ? "på" : "i"} ${l.name}` })),
    ],
  },
  "/hur-det-gar-till": {
    title: "Så går ett takbyte till — steg för steg",
    description:
      "Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager.",
    h1: "Så går ett takbyte till — steg för steg",
    intro:
      "Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager.",
    paragraphs: [
      "Ordningen är underlag, läkt, takmaterial och plåtdetaljer.",
      "Du har en kontaktperson genom hela processen, och arbetet avslutas med en slutgenomgång.",
      "Steg 1 — takkontroll, rapport och offert: vi går igenom taket på plats, och du får en rapport om takets skick. Behöver taket åtgärdas lämnar vi också en skriftlig offert med fast pris. Kostnadsfritt och utan förpliktelser.",
      "Steg 2 — planering: när du har accepterat offerten går vi igenom hur arbetet läggs upp innan vi börjar.",
      "Steg 3 — ställning: ställningen reses innan arbetet börjar.",
      "Steg 4 — rivning: gamla taket rivs. Skadad råspont syns först när det gamla taket är rivet. Då får du besked och pris innan vi går vidare, och inget extraarbete görs utan ditt godkännande.",
      "Steg 5 — underlag: ny underlagspapp, ströläkt och bärläkt läggs.",
      "Steg 6 — tätskikt och beslag: det nya taket monteras tillsammans med plåtbeslag kring skorsten, ventiler och genomföringar, och taksäkerhet och hängrännor, om de ingår i offerten.",
      "Steg 7 — slutgenomgång: vi går igenom hela arbetet tillsammans med dig. Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Vilka garantier som gäller för ditt tak står i offerten.",
    ],
    links: [...primaryLinks, ...serviceLinks],
    breadcrumbs: [{ name: "Hem", path: "/" }, { name: "Så går det till", path: "/hur-det-gar-till" }],
  },
  "/priser": {
    title: "Vad kostar takbyte? Priser 2026, efter ROT — Roslagen",
    description:
      "Vad kostar ett takbyte? Riktpriser per material efter ROT-avdrag, inkl. moms, och vad som påverkar priset. Fast pris i offerten efter kostnadsfri takkontroll.",
    h1: "Vad kostar takbyte och takrenovering i Roslagen?",
    intro: PRICE_HERO_TEXT,
    paragraphs: [
      PRICE_NOTE,
      ...priceData.flatMap((cat) => [
        `${cat.category}.`,
        ...cat.items.map((it) => `${it.name}: ${it.priceRange}. ${it.description.trim()}`),
      ]),
      `${PRICE_ROT_TITLE}. ${PRICE_ROT_TEXT}`,
      `${PRICE_FACTORS_TITLE} ${PRICE_FACTORS_TEXT}`,
      ...priceFaqs.map((faq) => `${faq.question} ${stripInlineMd(faq.answer)}`),
    ],
    jsonLd: [faqLd(priceFaqs, "/priser")],
    links: [
      { href: "/blogg/kostnad-takbyte-2026", label: "Vad kostar ett takbyte? Hela guiden" },
      ...primaryLinks,
      ...serviceLinks,
      ...faqLinks(priceFaqs),
    ],
  },
  "/recensioner": {
    title: "Recensioner — läs kundernas omdömen på Google",
    description:
      "Läs RoslagsTaks omdömen direkt på Google, hämtade i original. Vi kan inte kontrollera vem som skriver dem på Google.",
    h1: "Recensioner från takprojekt i Roslagen",
    intro:
      "Våra omdömen finns på Google, där du kan läsa dem i original.",
    paragraphs: [
      "Vi samlar våra omdömen på Google istället för att publicera egenskrivna recensioner här på sajten. Omdömena är hämtade från Google i original. Vi ber alla kunder med avslutat jobb om ett omdöme, men vi kan inte kontrollera vem som skriver på Google.",
      "Följ länken till Google för att se aktuella omdömen och stjärnbetyg. Har du själv anlitat oss får du gärna lämna ett omdöme — det hjälper andra husägare i Roslagen att välja takläggare.",
      "Vi utför takbyte, takrenovering, plåtarbeten och takvård i hela Roslagen och Storstockholm. Takkontroll och offert är alltid kostnadsfria, och du får 10 års utförandegaranti på allt arbete.",
      "Så kan du själv bedöma en takfirma: be om referenser från projekt i din närhet och be att få garantierna skriftligt i offerten. Ett seriöst företag lämnar alltid fast pris efter kostnadsfri takkontroll — aldrig ett pris per telefon.",
      "Vill du veta mer om hur vi arbetar innan du bestämmer dig? Läs om vår process steg för steg, våra riktpriser eller boka en kostnadsfri rådgivning där vi går igenom ditt tak tillsammans.",
      "Därför väljer vi att länka till Google istället för att skriva egna omdömen: omdömen på Google kan inte redigeras eller plockas bort av oss, vilket gör dem mer trovärdiga än citat på en egen hemsida. Där ser du hela bilden — både betyg, texter och hur vi svarar.",
      "Vi bygger kontinuerligt upp våra omdömen i takt med att projekt slutförs. Att lämna ett omdöme är helt frivilligt och sker utan någon form av ersättning.",
    ],
    links: [...primaryLinks, ...locationLinks.slice(0, 24)],
    breadcrumbs: [{ name: "Startsidan", path: "/", visibleName: "Hem" }, { name: "Omdömen", path: "/recensioner" }],
  },
  "/blogg": {
    title: "Guider om tak — takbyte, priser och underhåll",
    description:
      "Fördjupande guider om taktyper, kostnader, ROT-avdrag, taksäkerhet, eternittak och underhåll av tak.",
    h1: "Allt om tak i Roslagen",
    intro:
      "Tips, guider och nyheter om takbyte, takrenovering och takläggning i Roslagens skärgård.",
    paragraphs: [
      "Här hittar du fördjupande guider om taktyper, kostnader, ROT-avdrag, taksäkerhet, eternittak, taktvätt och underhåll av tak.",
    ],
    links: [
      ...primaryLinks,
      ...blogPosts.map((p) => ({ href: `/blogg/${p.slug}`, label: p.title })),
    ],
  },
  "/kontakt": {
    title: "Kontakt och kostnadsfri takkontroll",
    description:
      "Ring 070-154 36 39 eller fyll i formuläret — kostnadsfri takkontroll i hela Roslagen och Storstockholm. Återkoppling inom 24 timmar.",
    h1: "Boka kostnadsfri takkontroll",
    intro: `Ring ${PHONE} eller fyll i formuläret. Vi återkopplar inom 24 timmar — kostnadsfritt och utan förpliktelser.`,
    paragraphs: [
      "Vi erbjuder kostnadsfri takkontroll i hela Roslagen och Storstockholm. Du når oss enklast på telefon eller via formuläret — beskriv gärna takets storlek, material och vad du vill ha hjälp med.",
      "När du hör av dig får du svar inom 24 timmar. Vi bokar en tid för takkontroll som passar dig, tittar på taket tillsammans med dig om du vill, och lämnar därefter en skriftlig offert med fast pris.",
      "Vi tar uppdrag i hela Roslagen — Norrtälje, Österåker, Vaxholm, Östhammar och alla öar — samt i hela Storstockholm från Täby och Sollentuna till Nacka och Södertälje.",
      "Vanliga frågor vid första kontakten: vad kostar ett takbyte (se vår prissida för riktpriser), hur lång tid tar det (det beror på takets storlek, underlagets skick och väder) och kan man bo kvar under arbetet (ja, i de flesta fall).",
      `Telefon: ${PHONE}. Du kan också mejla via formuläret på sidan — ange adress så återkommer vi med förslag på tid för takkontroll.`,
      "Inför takkontrollen behöver du inte förbereda något särskilt, men det underlättar om du vet ungefär hur stort taket är, vilket material det har idag och om du märkt några specifika problem som fläckar eller läckage. Vi tar med all mätutrustning.",
      "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en skriftlig offert med fast pris och tydlig specifikation av vad som ingår — rivning, underlag, tätskikt, beslag, taksäkerhet och städning. Du bestämmer i din egen takt, utan påtryckningar.",
      "Välkommen att höra av dig oavsett om du planerar ett takbyte i år, funderar på taktvätt eller bara vill ha en bedömning av takets skick.",
      "För dig på en ö: vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Berätta var fastigheten ligger och hur den nås, så planerar vi takkontrollen därefter.",
      "Akta läckage? Om taket läcker just nu — ring direkt istället för att fylla i formuläret. Vi prioriterar akuta läckage och kan ofta komma ut för en provisorisk tätning inom kort.",
    ],
    links: primaryLinks,
    breadcrumbs: [{ name: "Hem", path: "/" }, { name: "Kontakt", path: "/kontakt" }],
  },
  "/cookies": {
    title: "Cookies och integritet",
    description:
      "Så använder roslagstak.se cookies och vilka uppgifter vi sparar när du kontaktar oss. Du väljer själv om statistik och marknadsföring ska vara på.",
    h1: "Cookies och integritet",
    intro: "Här ser du vad vi sparar, varför, och hur du ändrar ditt val.",
    paragraphs: [
      "Nödvändig lagring krävs inget samtycke för. Statistik (Google Analytics) och marknadsföring (Google Ads och Meta) laddas bara efter att du godkänt dem, och du kan ändra ditt val när som helst.",
      "Personuppgiftsansvarig är VT6 Invest AB, som driver RoslagsTak. Läs mer om vilka uppgifter vi sparar, varför, hur länge och vilka rättigheter du har längre ned på sidan.",
    ],
    links: primaryLinks,
  },
  "/projekt": {
    title: "Referensjobb — riktiga takprojekt i Roslagen",
    description:
      "Se riktiga takprojekt vi utfört i Roslagen och Storstockholm, med bilder och fakta om material, omfattning och plats.",
    h1: "Riktiga takprojekt i Roslagen",
    intro: "Här visar vi jobb vi har utfört, med kundens samtycke. Riktiga bilder, riktiga material.",
    paragraphs: [
      "Nytt tak på Blidö: nya betongpannor från Benders i svart, sommaren 2026.",
      "Nytt tak på Singö i Norrtälje kommun: betongpannor på huvudtaket och TP20-plåt på de lägre takdelarna, september 2026.",
    ],
    links: [...primaryLinks, { href: "/projekt/takrenovering-blido", label: "Nytt tak på Blidö" }, { href: "/projekt/takbyte-singo", label: "Nytt tak på Singö" }, { href: "/projekt/takbyte-grisslehamn", label: "Nytt tak i Grisslehamn" }],
    breadcrumbs: [{ name: "Startsidan", path: "/", visibleName: "Hem" }, { name: "Referensjobb", path: "/projekt" }],
  },
  "/takproblem": {
    title: "Takproblem – tecken, orsaker och vad du gör",
    description:
      "Läcker taket, mossa, fukt på vinden eller istappar? Här är de vanligaste takproblemen, hur du känner igen dem och när det är dags att ringa en takläggare.",
    h1: "Vanliga takproblem – så känner du igen dem",
    intro:
      "Ett tak säger sällan ifrån förrän skadan har pågått ett tag. Här har vi samlat de vanligaste takproblemen villaägare upptäcker.",
    paragraphs: problems.map((p) => `${p.title}: ${p.intro}`),
    links: [...primaryLinks, ...problems.map((p) => ({ href: `/takproblem/${p.slug}`, label: p.title }))],
    breadcrumbs: [
      { name: "Startsidan", path: "/", visibleName: "Hem" },
      { name: "Takproblem", path: "/takproblem" },
    ],
  },
  "/material": {
    title: "Takmaterial – betongpannor, lertegel, plåt och falsat",
    description:
      "Jämför takmaterial: betongpannor, lertegel, TP20-plåt och dubbelfalsat plåttak. Vikt, synliga skruvar och vad som passar ditt hus.",
    h1: "Takmaterial – vad passar ditt hus?",
    intro:
      "Betongpannor, lertegel, plåt eller falsat — materialet avgör utseende, vikt och underhåll. Här går vi igenom vad som skiljer dem åt.",
    paragraphs: [
      ...materials.map((m) => `${m.title}: ${m.hubDescription}`),
      "Vilket material som passar ditt hus beror på taket, lutningen, huset och uttrycket du vill ha. Boka en kostnadsfri takkontroll utan förpliktelser. En av våra säljare tittar på taket på plats, och behöver taket åtgärdas får du en offert med fast pris.",
    ],
    links: [...primaryLinks, ...materials.map((m) => ({ href: m.href, label: m.title }))],
    breadcrumbs: [
      { name: "Startsidan", path: "/", visibleName: "Hem" },
      { name: "Material", path: "/material" },
    ],
  },
  "/tjanster/taktvatt": {
    title: TAKTVATT_TITLE,
    description: TAKTVATT_META,
    h1: TAKTVATT_H1,
    intro: TAKTVATT_INTRO,
    paragraphs: [],
    links: [...primaryLinks, ...serviceLinks, { href: "/taklaggare-bollstanas", label: "Takläggare i Bollstanäs" }],
  },
};

/** Lägger sidans FAQ-avsnitt (rubrik, ingress, frågor som H3 och svar) sist i den statiska texten, plus FAQPage-schema. */
const withFaqSection = (page: PrerenderPage, path: string, heading: string, intro: string, faqs: { question: string; answer: string }[]): PrerenderPage => {
  const start = page.paragraphs.length;
  const headingAt: Record<number, 2 | 3> = { ...(page.headingAt ?? {}), [start]: 2 };
  faqs.forEach((_, k) => { headingAt[start + 2 + 2 * k] = 3; });
  return {
    ...page,
    paragraphs: [...page.paragraphs, heading, intro, ...faqs.flatMap((f) => [f.question, stripInlineMd(f.answer)])],
    headingAt,
    jsonLd: [...(page.jsonLd ?? []), faqLd(faqs, path)],
  };
};
const HOME_FAQ_HEADING = "Frågor om takbyte i Roslagen";
const HOME_FAQ_INTRO = "Svar på de vanligaste frågorna om takbyte, takrenovering och takläggning i skärgården.";
// Samma FAQ som components/FAQ.tsx visar på startsidan och på /offert, och som ProcessPage.tsx visar på /hur-det-gar-till.
staticPages["/"] = withFaqSection(staticPages["/"], "/", HOME_FAQ_HEADING, HOME_FAQ_INTRO, homeFaqs);
staticPages["/offert"] = withFaqSection(staticPages["/offert"], "/offert", HOME_FAQ_HEADING, HOME_FAQ_INTRO, homeFaqs);
staticPages["/hur-det-gar-till"] = withFaqSection(
  staticPages["/hur-det-gar-till"],
  "/hur-det-gar-till",
  "Frågor om hur ett takbyte går till",
  "Tid, bygglov, boende under arbetet och vad som händer när vi hittar skador under det gamla taket.",
  processFaqs,
);

const truncateAtWord = (text: string, maxLen: number): string =>
  text.length <= maxLen ? text : `${text.slice(0, maxLen).replace(/\s+\S*$/, "")}…`;

const serviceIntro = (title: string, description: string): PrerenderPage => ({
  title: `${title} i Roslagen & Storstockholm`,
  description: truncateAtWord(
    `${description} Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti. Ring ${PHONE}.`,
    158,
  ),
  h1: `${title} i Roslagen`,
  intro: description,
  paragraphs: [
    `RoslagsTak utför ${title.toLowerCase()} i hela Roslagen och Stockholms norra skärgård. Allt arbete utförs enligt AMA, med 10 års utförandegaranti.`,
    "Vi lämnar fast pris efter kostnadsfri takkontroll. ROT-avdraget på 30 % av arbetskostnaden dras direkt på fakturan.",
    `Ring ${PHONE} eller begär kostnadsfri offert — vi återkopplar inom 24 timmar.`,
  ],
  links: [...primaryLinks, ...serviceLinks, ...locationLinks.slice(0, 24)],
});

const NEARBY_PROJECT_MAX_KM = 30;

/**
 * Datadriven stycke för LOCATION-sidor (Marknadschefens beslut 2026-09-29, efter fyndet att 25
 * ortspar hade Jaccard > 0,8 efter maskering av ortsnamnet): avstånd till Norrtälje/Täby, region
 * och grannorter, ev. referensjobb, och vilka tjänst+ort-sidor som faktiskt är indexerade här.
 * Byggt av riktig data (locations.ts, projectSummaries, thin-combos.ts) — aldrig malltext med bara
 * ortnamnet bytt, vilket var precis vad som orsakade dubbletterna.
 */
const geoFactsParagraph = (loc: (typeof locations)[number]): string => {
  const prep = loc.isIsland ? "på" : "i";
  const parts: string[] = [
    `${loc.name} tillhör ${loc.region} och ligger cirka ${Math.round(distanceFromBaseKm(loc))} km från vår bas i Norrtälje. Närmaste orter i vårt område: ${loc.nearbyLocations.join(", ")}.`,
  ];

  const exactProject = projectSummaries.find((p) => p.locationSlug === loc.slug);
  if (exactProject) {
    parts.push(`Vi har utfört ett dokumenterat referensjobb här: ${exactProject.title}.`);
  } else {
    const nearbyProject = projectSummaries.find((p) => {
      const projectLoc = locations.find((l) => l.slug === p.locationSlug);
      return projectLoc && distanceKm(loc, projectLoc) <= NEARBY_PROJECT_MAX_KM;
    });
    if (nearbyProject) {
      const projectLoc = locations.find((l) => l.slug === nearbyProject.locationSlug)!;
      parts.push(
        `Vi påstår inte att det jobbet gjordes här, men ett referensjobb i närområdet — ${nearbyProject.title} (cirka ${Math.round(distanceKm(loc, projectLoc))} km bort) — visar hur ett komplett takbyte kan se ut.`,
      );
    }
  }

  const indexedServiceNames = hasServiceCombos(loc.region)
    ? [...new Set(combos.filter((c) => c.locationSlug === loc.slug && !isThinCombo(c.serviceSlug, loc)).map((c) => c.serviceName))]
    : [];
  if (indexedServiceNames.length > 0) {
    parts.push(`Vi har egna sidor för ${indexedServiceNames.join(", ")} ${prep} ${loc.name}.`);
  }

  return parts.join(" ");
};

/** Important on-page text for a route, or null when the route has no prerender. */
/** Sidans innehåll utan SEO CC-tillägg (innehall.json): basen som tilläggen kontrolleras mot. */
export const prerenderContentRaw = (path: string): PrerenderPage | null => {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "").toLowerCase();

  if (clean === "/tjanster/taktvatt") {
    // Kort text tills Vidar har svarat på 10i (backlog 1cl): rubriker, stycken och FAQ ur data/taktvatt-text.ts
    return {
      ...staticPages[clean],
      ...buildBody([
        ...TAKTVATT_SECTIONS.flatMap((s) => [{ h: s.heading }, ...s.paragraphs.map(stripInlineMd)]),
        { h: "Vanliga frågor om taktvätt" },
        ...TAKTVATT_FAQS.flatMap((f) => [{ h: f.question, level: 3 as const }, stripInlineMd(f.answer)]),
      ]),
      links: [...staticPages[clean].links, ...faqLinks(TAKTVATT_FAQS)],
      jsonLd: [faqLd(TAKTVATT_FAQS, "/tjanster/taktvatt")],
    };
  }
  if (staticPages[clean]) return staticPages[clean];

  if (clean.startsWith("/tjanster/")) {
    const slug = clean.slice("/tjanster/".length);
    const service = services.find((s) => s.slug === slug);
    if (!service) return null;
    // Hela den synliga texten ur samma datamodul som ServiceDetail.tsx (fas 2.50 P0, paritetstestat).
    const sp = serviceStaticPage(slug, services);
    if (!sp) return null;
    const schemas = serviceSchemaNodes(slug, services);
    return {
      title: sp.title,
      description: sp.description,
      h1: sp.h1,
      intro: sp.intro,
      // Omdömesbandet sist (GoogleReviews i ServiceDetail.tsx), utanför serviceStaticPage eftersom paritetstestet renderar sidan utan omdömesbandet (AG1, paket 21)
      ...(() => {
        const rev = buildBody([GOOGLE_REVIEWS_TEXT.bandEyebrow, { h: GOOGLE_REVIEWS_TEXT.title }, GOOGLE_REVIEWS_TEXT.ingress]);
        const n = sp.paragraphs.length;
        return {
          paragraphs: [...sp.paragraphs, ...rev.paragraphs],
          headingAt: { ...sp.headingAt, ...Object.fromEntries(Object.entries(rev.headingAt).map(([k, v]) => [Number(k) + n, v])) },
        };
      })(),
      links: [
        ...primaryLinks,
        ...serviceLinks,
        ...locationLinks.slice(0, 24),
        ...sp.relatedLinks.map((l) => ({ href: l.to, label: l.label })),
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: "Tjänster", path: "/#tjanster" },
        { name: service.title, path: `/tjanster/${slug}` },
      ],
      jsonLd: [schemas.service, schemas.howTo, ...(SERVICE_EXTRAS[slug] ? [faqLd(SERVICE_EXTRAS[slug].faqs, clean)] : slug === "eternit-asbest" ? [faqLd(eternitFaqs, clean)] : [])],
    };
  }

  if (clean.startsWith("/takproblem/")) {
    const problem = problems.find((p) => p.slug === clean.slice("/takproblem/".length));
    if (!problem) return null;
    const problemSections: { key: keyof typeof problem; heading: string }[] = [
      { key: "symptom", heading: "Symptom" },
      { key: "orsaker", heading: "Vanliga orsaker" },
      { key: "akut", heading: "När är det akut?" },
      { key: "undersokning", heading: "Så undersöks det" },
      { key: "atgarder", heading: "Åtgärder som används" },
      { key: "gorInteSjalv", heading: "Gör inte själv" },
    ];
    return {
      title: problem.metaTitle,
      description: problem.metaDescription,
      h1: problem.title,
      intro: problem.intro,
      ...buildBody([
        ...problemSections.flatMap((s) => [
          { h: s.heading, suffix: s.heading.endsWith("?") ? "" : ":" },
          problem[s.key] as string,
        ]),
        SAKERHETSRUTA,
      ]),
      links: [
        ...primaryLinks,
        { href: "/takproblem", label: "Alla takproblem" },
        ...problem.related.map((r) => ({ href: r.to, label: r.label })),
        { href: takkontrollLink.to, label: takkontrollLink.label },
        ...regionLinksForProblems().map((r) => ({ href: r.to, label: r.label })),
        ...guidesForTitle(problem.title, 2).map((g) => ({ href: `/blogg/${g.slug}`, label: g.title })),
        ...MONEY_LINKS,
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/" },
        { name: "Takproblem", path: "/takproblem" },
        { name: problem.title, path: `/takproblem/${problem.slug}` },
      ],
    };
  }

  if (clean.startsWith("/material/")) {
    const material = materials.find((m) => m.slug === clean.slice("/material/".length) && m.detail);
    if (!material || !material.detail) return null;
    const d = material.detail;
    const materialSections: { key: keyof typeof d; heading: string }[] = [
      { key: "funktion", heading: "Funktion" },
      { key: "anvandning", heading: "Användning" },
      { key: "livslangd", heading: "Livslängd" },
      { key: "fordelar", heading: "Fördelar" },
      { key: "nackdelar", heading: "Nackdelar" },
      { key: "passarNar", heading: "Passar när" },
      { key: "underhall", heading: "Underhåll" },
      { key: "vanligaFel", heading: "Vanliga fel" },
      { key: "delAvTaksystemet", heading: "Del av taksystemet" },
    ];
    const MATERIAL_OG_IMAGES: Record<string, { src: string; alt: string }> = {
      betongpannor: { src: "/og/material-betongpannor.jpg", alt: "Närbild på svart betongpannetak med vågprofil" },
      "tp20-plattak": { src: "/og/material-tp20-plattak.jpg", alt: "Närbild på trapetsprofilerad TP20-plåt" },
    };
    const og = MATERIAL_OG_IMAGES[material.slug];
    return {
      title: d.metaTitle,
      description: d.metaDescription,
      h1: material.title,
      intro: d.intro,
      ...buildBody([
        ...materialSections.flatMap((s) => [{ h: s.heading, suffix: ":" }, stripInlineMd(d[s.key] as string)]),
        ...(MATERIAL_EXTRAS[material.slug] ? [] : [{ h: "Kostnadsdrivare", suffix: ":" }, d.kostnadsdrivare]),
        ...(MATERIAL_PRISAVSNITT[material.slug]
          ? [{ h: MATERIAL_PRISAVSNITT[material.slug].rubrik }, ...prisAvsnittForSpegel(MATERIAL_PRISAVSNITT[material.slug]), materialPricesSentence()]
          : []),
        ...(MATERIAL_EXTRAS[material.slug]
          ? [
              ...MATERIAL_EXTRAS[material.slug].blocks.flatMap((b) => [
                { h: b.heading },
                ...b.items.flatMap((it) => (typeof it === "string" ? [stripInlineMd(it)] : it.list.map(stripInlineMd))),
              ]),
              { h: MATERIAL_PAGE_TEXT.readMoreHeading },
              MATERIAL_PAGE_TEXT.ctaText,
              { h: MATERIAL_EXTRAS[material.slug].faqHeading },
              ...MATERIAL_EXTRAS[material.slug].faqs.flatMap((f) => [{ h: f.question, level: 3 as const }, stripInlineMd(f.answer)]),
            ]
          : []),
        ...(d.hallIsar ? [`Håll isär: ${d.hallIsar}`] : []),
        ...(d.hosOss && !MATERIAL_EXTRAS[material.slug] ? [`Hos oss: ${d.hosOss}`] : []),
        // Uppmaningen och "Fler material" i samma ordning som MaterialPage.tsx (AG1, paket 22)
        ...(MATERIAL_EXTRAS[material.slug] ? [] : [MATERIAL_PAGE_TEXT.ctaText]),
        { h: MATERIAL_PAGE_TEXT.relatedTitle },
        RELATED_LINKS_INTRO,
      ]),
      ogImage: og?.src,
      ogImageAlt: og?.alt,
      jsonLd: MATERIAL_EXTRAS[material.slug] ? [faqLd(MATERIAL_EXTRAS[material.slug].faqs, clean)] : undefined,
      links: [
        ...primaryLinks,
        { href: "/material", label: "Alla material" },
        { href: "/priser", label: "Priser för takarbeten" },
        ...(!MATERIAL_PRISAVSNITT[material.slug] && MATERIAL_PRIS_LANK[material.slug]
          ? [{ href: MATERIAL_PRIS_LANK[material.slug].to, label: MATERIAL_PRIS_LANK[material.slug].label }]
          : []),
        ...(MATERIAL_PRISAVSNITT[material.slug]?.rader.filter((r) => r.to).map((r) => ({ href: r.to!, label: r.namn })) ?? []),
        ...(MATERIAL_EXTRAS[material.slug]?.blocks.flatMap((b) => b.items.flatMap((it) => (typeof it === "string" ? [it] : it.list)).flatMap(inlineMdLinks)) ?? []),
        ...(MATERIAL_EXTRAS[material.slug]?.links?.map((l) => ({ href: l.to, label: l.label })) ?? []),
        ...faqLinks(MATERIAL_EXTRAS[material.slug]?.faqs ?? []),
        ...projectSummaries.filter((p) => (p.materialSlugs as string[]).includes(material.slug)).map((p) => ({ href: `/projekt/${p.slug}`, label: p.title })),
        ...guidesForTitle(material.title, 2).map((g) => ({ href: `/blogg/${g.slug}`, label: g.title })),
        ...MONEY_LINKS,
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: "Material", path: "/material" },
        { name: material.title, path: material.href },
      ],
    };
  }

  if (clean.startsWith("/projekt/")) {
    const projectSlug = clean.slice("/projekt/".length);
    const project = projectSummaries.find((p) => p.slug === projectSlug);
    if (!project) return null;
    // Samma sektionsindelning som src/pages/ProjectPage.tsx: beskrivningen delas efter fetstilta ledord.
    const parts = project.description.map((p) => {
      const m = p.match(/^\*\*(.+?)\.\*\*\s*([\s\S]*)$/);
      return m ? { lead: m[1] as string | null, body: m[2] } : { lead: null as string | null, body: p };
    });
    const intro = parts[0] && parts[0].lead === null ? parts[0] : null;
    const rest = parts.slice(intro ? 1 : 0);
    const SPECIAL = new Set(["Så jobbar vi", "Så arbetar vi", "Tre jobb att jämföra", "Fler jobb", "Vad som ingick"]);
    const included = rest.filter((p) => p.lead && !SPECIAL.has(p.lead));
    const includedNote = rest.find((p) => p.lead === "Vad som ingick");
    const compare = rest.find((p) => p.lead === "Tre jobb att jämföra");
    const process = rest.find((p) => p.lead === "Så jobbar vi" || p.lead === "Så arbetar vi");
    const moreJobs = rest.find((p) => p.lead === "Fler jobb");
    const closing = rest.filter((p) => !p.lead);
    const paragraphs: string[] = [];
    const headingAt: Record<number, 2 | 3> = {};
    const h = (text: string, level: 2 | 3) => {
      headingAt[paragraphs.length] = level;
      paragraphs.push(text);
    };
    const heroCaption = (project as { heroCaption?: string }).heroCaption ?? project.heroAlt;
    const facts = (project as { facts?: { label: string; value: string }[] }).facts ?? [];
    const area = (project as { area?: string }).area;
    const images: NonNullable<PrerenderPage["images"]> = {
    };
    paragraphs.push(heroCaption);
    paragraphs.push(
      [
        `Ort: ${project.locationName}, Norrtälje kommun.`,
        `Jobb: ${project.serviceName}.`,
        area ? `Yta: ${area}.` : "",
        `Material: ${project.material}.`,
        ...facts.map((x) => `${x.label}: ${x.value}.`),
        project.period ? `Utfört: ${project.period}.` : "",
      ]
        .filter(Boolean)
        .join(" "),
    );
    if (intro) {
      h("Om jobbet", 2);
      paragraphs.push(stripInlineMd(intro.body));
    }
    if (included.length > 0 || includedNote) {
      h("Vad som ingick", 2);
      if (includedNote) paragraphs.push(stripInlineMd(includedNote.body));
      for (const p of included) {
        h(p.lead as string, 3);
        paragraphs.push(stripInlineMd(p.body));
      }
    }
    if (compare) {
      h(compare.lead as string, 2);
      paragraphs.push(stripInlineMd(compare.body));
    }
    if (process) {
      h(process.lead as string, 2);
      for (const para of process.body.split("\n\n")) paragraphs.push(stripInlineMd(para));
    }
    if (moreJobs) {
      h(moreJobs.lead as string, 2);
      paragraphs.push(stripInlineMd(moreJobs.body));
    }
    for (const p of closing) paragraphs.push(stripInlineMd(p.body));
    h("Boka en kostnadsfri takkontroll utan förpliktelser", 2);
    paragraphs.push("Svar inom 24 timmar.");
    return {
      title: `${project.title} — referensjobb`,
      description: (project as { metaDescription?: string }).metaDescription ?? project.summary,
      h1: project.title,
      intro: project.summary,
      paragraphs,
      headingAt,
      images,
      links: [
        ...primaryLinks,
        { href: "/projekt", label: "Alla referensjobb" },
        { href: `/tjanster/${project.serviceSlug}`, label: project.serviceName },
        { href: `/taklaggare-${project.locationSlug}`, label: `Takläggare i ${project.locationName}` },
        { href: "/takbyte-norrtalje", label: "Byta tak i Norrtälje" },
        ...project.description.flatMap(inlineMdLinks),
      ],
      ogImage: project.ogImage,
      ogImageAlt: project.ogImageAlt,
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: "Referensjobb", path: "/projekt" },
        { name: project.title, path: `/projekt/${project.slug}` },
      ],
    };
  }

  if (clean.startsWith("/blogg/")) {
    const post = blogPosts.find((p) => p.slug === clean.slice("/blogg/".length));
    if (!post) return null;
    return {
      title: post.title,
      description: post.excerpt,
      h1: post.title,
      intro: post.excerpt,
      // Guidens text, därefter mallens fasta block i BlogPost.tsx ordning (AD4): rutan, länkrubriken, uppmaningen och relaterade guider
      ...buildBody([
        ...guideContent(post).map((p) => (isHeading(p) ? { h: stripInlineMd(p) } : stripInlineMd(p))),
        ...(blogHasAside(post.content.length) ? [`${BLOG_TEMPLATE.asideLead} ${BLOG_TEMPLATE.asideRest}`] : []),
        { h: BLOG_TEMPLATE.linksHeading },
        { h: BLOG_TEMPLATE.ctaHeading },
        BLOG_TEMPLATE.ctaText,
        ...(relatedPosts(post, 4).length ? [{ h: BLOG_TEMPLATE.relatedHeading }] : []),
        ...relatedPosts(post, 4).flatMap((p) => [{ h: p.title, level: 3 as const }, p.excerpt]),
      ]),
      links: [
        ...primaryLinks,
        ...guideContent(post).flatMap(inlineMdLinks),
        ...relatedForPost(post).map((r) => ({ href: r.to, label: r.label })),
        ...MONEY_LINKS,
        ...relatedPosts(post, 4).map((p) => ({ href: `/blogg/${p.slug}`, label: p.title })),
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/" },
        { name: "Blogg", path: "/blogg" },
        { name: post.title, path: `/blogg/${post.slug}` },
      ],
      jsonLd: [buildBlogPostingSchema(post)],
    };
  }

  if (clean === "/omraden") {
    return {
      title: "Våra områden — Roslagen och hela Storstockholm",
      description: "Takbyte, takomläggning, takrenovering och plåtarbeten i Roslagen, Storstockholm och Mälardalen. Välj din ort och boka kostnadsfri takkontroll.",
      h1: "Takläggare i Roslagen och hela Storstockholm",
      intro: "RoslagsTak tar uppdrag med takbyte, takomläggning, takrenovering och plåtarbeten i Roslagen, Storstockholm och Mälardalen.",
      paragraphs: [
        "Välj ditt område nedan för att läsa om husen där och hur du bokar en takkontroll.",
        `Ring ${PHONE} för kostnadsfri takkontroll och fast pris.`,
      ],
      links: [
        ...primaryLinks,
        ...Object.entries(regionSlugs).map(([region, slug]) => ({
          href: `/omraden/${slug}`,
          label: `Takläggare i ${region}`,
        })),
        ...locationLinks,
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/" },
        { name: "Områden", path: "/omraden" },
      ],
    };
  }

  if (clean.startsWith("/omraden/")) {
    const region = regionBySlug(clean.slice("/omraden/".length));
    if (!region) return null;
    const places = locations.filter((l) => l.region === region);
    const rt = regionTexts[region];
    return {
      title: rt?.title ?? `Takläggare i ${region}`,
      description: rt?.description ?? `Takbyte, takrenovering och plåtarbeten i ${region} — ${places.length} orter. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti. Ring ${PHONE}.`,
      h1: rt?.h1 ?? `Takläggare i ${region}`,
      intro: rt?.intro ?? regionIntros[region] ?? `Takbyte, takrenovering och plåtarbeten i ${region}.`,
      ...buildBody([
        ...(rt ? rt.body.map((p) => (isHeading(p) ? { h: stripInlineMd(p) } : stripInlineMd(p))) : []),
        ...(villaAreasParagraph(regionSlugs[region]) ? [villaAreasParagraph(regionSlugs[region])!] : []),
        `Vi arbetar i ${places.length} orter i ${region}. Ring ${PHONE} för kostnadsfri takkontroll och fast pris.`,
      ]),
      links: [
        ...primaryLinks,
        { href: "/omraden", label: "Alla områden i Roslagen och Storstockholm" },
        ...villaAreaLinks(regionSlugs[region]),
        ...(rt ? rt.body.flatMap(inlineMdLinks) : []),
        ...(regionNeighbors[region] ?? []).map((n) => ({ href: `/omraden/${regionSlugs[n]}`, label: `Takläggare i ${n}` })),
        ...(REGION_EXTRA_LINKS[region] ?? []),
        ...places.map((l) => ({
          href: `/taklaggare-${l.slug}`,
          label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
        })),
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/" },
        { name: "Områden", path: "/omraden" },
        { name: region, path: clean },
      ],
    };
  }

  if (clean.startsWith("/brf/")) {
    const slug = clean.slice("/brf/".length);
    const loc = (brfLocationSlugs as readonly string[]).includes(slug)
      ? locations.find((l) => l.slug === slug)
      : undefined;
    if (!loc) return null;
    const prep = loc.isIsland ? "på" : "i";
    const brfPlaceFaqs = brfFaqsFor({ name: loc.name, prep });
    return {
      title: `Takbyte BRF ${prep} ${loc.name} — bostadsrättsföreningar`,
      description: `Takbyte och takkontroll för bostadsrättsföreningar ${prep} ${loc.name}. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.`,
      h1: `Takbyte för bostadsrättsföreningar ${prep} ${loc.name}, med underlag styrelsen kan besluta på`,
      intro: brfHeroIntro({ name: loc.name }),
      ...brfBody({
        place: { prep, name: loc.name },
        nearby: loc.nearbyLocations
          .map((name) => locations.find((l) => l.name === name))
          .filter((l): l is NonNullable<typeof l> => !!l)
          .filter((l) => (brfLocationSlugs as readonly string[]).includes(l.slug))
          .map((l) => l.name),
        extra: [`Ring ${PHONE} eller boka takkontroll på /brf/${loc.slug}. Vi återkommer inom 24 timmar.`],
        faqs: brfPlaceFaqs,
      }),
      jsonLd: [faqLd(brfPlaceFaqs, clean)],
      links: [
        ...primaryLinks,
        { href: "/brf", label: "BRF & fastigheter" },
        { href: `/taklaggare-${loc.slug}`, label: `Takläggare ${prep} ${loc.name}` },
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: "BRF & fastigheter", path: "/brf" },
        { name: `BRF ${prep} ${loc.name}`, path: clean },
      ],
    };
  }

  if (clean.startsWith("/taklaggare-")) {
    const rawLoc = locations.find((l) => l.slug === clean.slice("/taklaggare-".length));
    if (!rawLoc) return null;
    const mall = usesMall(rawLoc);
    const loc = applyMall(rawLoc);
    const prep = loc.isIsland ? "på" : "i";
    const locationFaqs = generateLocationFAQs(loc.name, prep, loc.isIsland, loc.uniqueFAQ);
    const regionHref = regionSlugs[loc.region] ? `/omraden/${regionSlugs[loc.region]}` : "/omraden";
    return {
      title: ortSeoOverrides[loc.slug]?.title ?? `Takläggare ${prep} ${loc.name} — Takbyte & Takrenovering`,
      description: ortSeoOverrides[loc.slug]?.description ?? (mall ? loc.description : loc.isIsland
        ? OAR_UTAN_BILVAG.includes(loc.slug)
          ? `Takläggare ${prep} ${loc.name}. Takfirma med bas i Norrtälje. Fast pris i offerten och 10 års utförandegaranti. Berätta var huset ligger när du hör av dig.`
          : `Takläggare ${prep} ${loc.name}. Takfirma med bas i Norrtälje. Kostnadsfri takkontroll utan förpliktelser, fast pris i offerten och 10 års utförandegaranti.`
        : isNearBase(loc)
          ? `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti.`
          : `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti.`),
      h1: loc.h1Override ??
        (loc.parentLocation
          ? `Takläggare i ${loc.name}, ${loc.parentLocation.name}`
          : `Takläggare ${prep} ${loc.name} — takbyte & takrenovering`),
      intro: loc.description,
      ...buildBody([
        loc.longDescription,
        ...(loc.extraContent ? [loc.extraContent] : []),
        ...(loc.extraSections ?? []).flatMap((sec) => [{ h: sec.heading, level: 3 as const, suffix: "." }, stripInlineMd(sec.text)]),
        ...(loc.process
          ? [
              { h: "Så går det till", level: 3 as const, suffix: "." },
              // En rad per steg (som listpunkterna i LocationPage.tsx), utan siffra: ordningen är textens ordning
              ...loc.process.steps.map((st) => st.replace(/\*\*/g, "")),
              ...loc.process.paragraphs,
            ]
          : []),
        // Faktarutan: etikett och värde som egna stycken (dt/dd i LocationPage.tsx)
        ...(loc.factBox ? loc.factBox.flatMap((f) => [f.label, f.value]) : []),
        ...(loc.sourceLink ? [`Källa: ${loc.sourceLink.label} — ${loc.sourceLink.url}`] : []),
        ...villaAreasBlocks(loc.slug),
        ...(mall ? [] : [geoFactsParagraph(loc)]),
        // Lokala fakta (dt/dd), taktjänster, pris och länkrubrik i samma ordning som LocationPage.tsx (AD5)
        ...buildLocalSections(loc).facts.flatMap((f) => [f.label, f.value]),
        { h: LOCATION_PAGE_TEXT.servicesHeading(prep, loc.name), level: 3 as const },
        ...LOCATION_PAGE_TEXT.serviceItems(prep, loc.name),
        { h: LOCATION_PAGE_TEXT.priceHeading(prep, loc.name), level: 3 as const },
        LOCATION_PAGE_TEXT.priceText(prep, loc.name, loc.isIsland),
        { h: LOCATION_PAGE_TEXT.linksHeading(prep, loc.name), level: 3 as const },
        // Avsnitten "Varför välja RoslagsTak …" och "Om <ort> och takläggning i <region>" (samma funktion som LocationPage.tsx, AA3).
        ...locationWhySections(loc, prep, !loc.isIsland && !isNearBase(loc)).flatMap((s) => [{ h: s.heading, level: 3 as const }, s.paragraph]),
        // Hela FAQ:n som sidan visar (samma funktion som LocationPage.tsx), med rubriker, och FAQPage-schema nedan.
        { h: `Vanliga frågor om takbyte ${prep} ${loc.name}`, level: 2 as const },
        ...locationFaqs.flatMap((f) => [{ h: f.question, level: 3 as const }, stripInlineMd(f.answer)]),
        `Ring ${PHONE} för en kostnadsfri takkontroll ${prep} ${loc.name}.`,
        // Sidokolumnen och sidans fot i LocationPage.tsx (AD5)
        { h: LOCATION_PAGE_TEXT.asideHeading, level: 3 as const },
        LOCATION_PAGE_TEXT.asideText(prep, loc.name),
        ...(locations.some((l) => loc.nearbyLocations.includes(l.name)) ? [{ h: LOCATION_PAGE_TEXT.nearbyHeading, level: 3 as const }] : []),
        { h: LOCATION_PAGE_TEXT.problemsHeading, level: 3 as const },
        { h: LOCATION_PAGE_TEXT.sidebarServicesHeading, level: 3 as const },
        { h: LOCATION_PAGE_TEXT.allLocationsHeading },
        GOOGLE_REVIEWS_TEXT.bandEyebrow,
        { h: GOOGLE_REVIEWS_TEXT.title },
        GOOGLE_REVIEWS_TEXT.ingress,
      ]),
      jsonLd: [faqLd(locationFaqs, `/taklaggare-${loc.slug}`)],
      links: [
        ...primaryLinks,
        ...MONEY_LINKS,
        // Samma länk som länkraden "Tjänster, priser och guider" i LocationPage.tsx: ägarsidan för "takrenovering pris"
        { href: "/tjanster/takrenovering", label: "Takrenovering" },
        ...faqLinks(locationFaqs),
        { href: regionHref, label: `Takläggare i ${loc.region}` },
        ...(loc.parentLocation ? [{ href: `/taklaggare-${loc.parentLocation.slug}`, label: `Takläggare i ${loc.parentLocation.name}` }] : []),
        ...problemsForLocation(loc.slug).map((p) => ({ href: p.to, label: p.label })),
        ...villaAreaLinks(loc.slug),
        ...projectSummaries.filter((p) => p.locationSlug === loc.slug).map((p) => ({ href: `/projekt/${p.slug}`, label: `Referensjobb: ${p.title}` })),
        ...combos
          .filter((c) => c.locationSlug === loc.slug)
          .map(comboListLink),
        ...hubLinksFor(loc.slug),
        ...loc.nearbyLocations
          .map((name) => locations.find((l) => l.name === name))
          .filter((l): l is (typeof locations)[number] => Boolean(l))
          .map((l) => ({
            href: `/taklaggare-${l.slug}`,
            label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
          })),
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/" },
        { name: "Områden", path: "/omraden" },
        { name: loc.region, path: regionHref },
        ...(loc.parentLocation
          ? [{ name: `Takläggare i ${loc.parentLocation.name}`, path: `/taklaggare-${loc.parentLocation.slug}` }]
          : []),
        { name: `Takläggare ${prep} ${loc.name}`, path: `/taklaggare-${loc.slug}`, visibleName: loc.name },
      ],
    };
  }

  const combo = comboByUrl.get(clean);
  if (combo) {
    const override = comboOverrides[`${combo.serviceSlug}-${combo.locationSlug}`];
    // Frågorna och svaren som ServiceLocationPage visar (samma funktion), med rubriker, och FAQPage-schema.
    const comboFaqs = generateServiceLocationFAQs(
      combo.serviceName,
      combo.locationName,
      combo.prep,
      locations.find((l) => l.slug === combo.locationSlug)?.isIsland || false,
    );
    return {
      title: override?.title ?? comboDefaultTitle(combo),
      description: override?.description ?? combo.description,
      h1: comboDefaultH1(combo),
      intro: override?.description ?? combo.description,
      ...buildBody([
        ...(override?.content ?? combo.content).map(stripInlineMd),
        // Relaterade tjänster-rubriken ligger före frågorna, precis som i ServiceLocationPage.tsx (AG1)
        { h: SERVICE_LOCATION_TEXT.relatedHeading(combo.prep, combo.locationName) },
        { h: `Vanliga frågor om ${combo.serviceName.toLowerCase()} ${combo.prep} ${combo.locationName}` },
        ...comboFaqs.flatMap((f) => [{ h: f.question, level: 3 as const }, stripInlineMd(f.answer)]),
        // Sidokolumnen, ortlistans rubrik och omdömesbandet i samma ordning som på sidan
        { h: SERVICE_LOCATION_TEXT.asideHeading, level: 3 as const },
        SERVICE_LOCATION_TEXT.asideText(combo.serviceName, combo.prep, combo.locationName),
        { h: SERVICE_LOCATION_TEXT.uspHeading, level: 3 as const },
        ...SERVICE_LOCATION_TEXT.usps(combo.serviceSlug),
        ...(locations.find((l) => l.slug === combo.locationSlug)?.nearbyLocations.some((n) => locations.some((l) => l.name === n))
          ? [{ h: SERVICE_LOCATION_TEXT.nearbyHeading(combo.serviceName), level: 3 as const }]
          : []),
        { h: SERVICE_LOCATION_TEXT.allLocationsHeading(combo.serviceName) },
        GOOGLE_REVIEWS_TEXT.bandEyebrow,
        { h: GOOGLE_REVIEWS_TEXT.title },
        GOOGLE_REVIEWS_TEXT.ingress,
      ]),
      jsonLd: [faqLd(comboFaqs, clean)],
      links: [
        ...primaryLinks,
        {
          href: `/taklaggare-${combo.locationSlug}`,
          label: `Takläggare ${combo.prep} ${combo.locationName}`,
        },
        ...(override?.links ?? []).map((l) => ({ href: l.to, label: l.label })),
        ...(COMBO_SERVICE_PAGE[combo.serviceSlug]
          ? [{ href: COMBO_SERVICE_PAGE[combo.serviceSlug].to, label: COMBO_SERVICE_PAGE[combo.serviceSlug].label }]
          : []),
        ...combos
          .filter(
            (c) => c.locationSlug === combo.locationSlug && c.serviceSlug !== combo.serviceSlug,
          )
          .map(comboListLink),
      ],
      breadcrumbs: [
        { name: "Startsidan", path: "/", visibleName: "Hem" },
        { name: `Takläggare ${combo.prep} ${combo.locationName}`, path: `/taklaggare-${combo.locationSlug}` },
        { name: combo.serviceName, path: combo.url },
      ],
    };
  }

  return null;
};
const aliasToCanonical = (href: string): string => {
  const [pathPart, ...rest] = href.split("#");
  const target = CANONICAL_ALIASES[pathPart.replace(/\/$/, "")];
  return target ? [target, ...rest].join("#") : href;
};
/**
 * Titel och beskrivning för noindex-sidor utan prerenderad brödtext: annonssidorna /offert/<ort> och /boka-takkontroll.
 * Samma lydelser som SEOHead på sidorna, så att fliktiteln i den statiska HTML:en inte är startsidans (Innehålls fynd L2).
 */
export const noindexPageMeta = (path: string): { title: string; description: string } | null => {
  const clean = path.replace(/\/$/, "");
  /* Interna sidor: egen titel, så att de inte ärver startsidans titel och beskrivning från index.html (noindex). */
  if (clean === "/admin" || clean === "/admin/login" || clean === "/admin/seo") {
    return { title: "Administration", description: "Intern sida för RoslagsTak. Inte avsedd för allmänheten." };
  }
  if (clean === "/boka-takkontroll") {
    return {
      title: "Boka kostnadsfri takkontroll",
      description: "Boka en kostnadsfri takkontroll: välj dag och tid. Vi ringer upp så snart vi kan. Fast pris, utan förpliktelser.",
    };
  }
  const m = clean.match(/^\/offert\/([a-z0-9-]+)$/);
  const landing = m ? getAdLanding(m[1]) : undefined;
  if (!landing) return null;
  const inPlace = `${landing.prep} ${landing.name}`;
  return {
    title: `Takbyte ${inPlace} — fast pris efter takkontroll`,
    description: `Nytt tak ${inPlace}? Kostnadsfri takkontroll och fast pris. 10 års utförandegaranti. Svar inom 24 timmar.`,
  };
};

/**
 * Rubrik och ingress för noindex-annonssidorna (/offert/<ort>, /boka-takkontroll) i den statiska HTML:en. Samma strängar som
 * React-sidorna visar (delas via src/data/ad-landings.ts), så att första målningen och LCP-elementet är ordagrant detsamma
 * före och efter hydrering. Sidorna är noindex och ingår inte i prerenderContent (inga schemanoder, ingen sitemap, inga textkontroller).
 */
export const noindexPageBody = (path: string): { h1: string; intro: string; hero: keyof typeof HERO_STYLES; paragraphs?: string[]; headingAt?: Record<number, 2 | 3> } | null => {
  const clean = path.replace(/\/$/, "");
  if (clean === "/boka-takkontroll") return { h1: `${bookingCopy.h1Lead} ${bookingCopy.h1Accent}`, intro: bookingCopy.intro, hero: "service" };
  const m = clean.match(/^\/offert\/([a-z0-9-]+)$/);
  const landing = m ? getAdLanding(m[1]) : undefined;
  if (!landing) return null;
  const c = adLandingCopy(landing);
  // Resten av annonssidan (AD3): trygghetsraderna, formulärets rubrik, stegen, prisnoten, frågorna och slutrubriken, ordagrant som AdLandingPage.tsx
  const body = buildBody([
    `Takläggare ${landing.prep} ${landing.name}`,
    ...AD_TRUST,
    "Boka kostnadsfri takkontroll",
    LEAD_FORM_SUBTITLE,
    { h: AD_TEXT.stepsHeading },
    ...AD_STEPS.flatMap((s) => [{ h: s.title, level: 3 as const }, s.text]),
    { h: AD_TEXT.priceHeading },
    AD_TEXT.priceText,
    { h: AD_TEXT.faqHeading },
    ...AD_FAQS.flatMap((f) => [{ h: f.q, level: 3 as const }, f.a]),
    { h: AD_TEXT.finalHeading },
  ]);
  return { h1: `${c.h1Lead} ${c.h1Accent}`, intro: c.intro, hero: "ad", paragraphs: body.paragraphs, headingAt: body.headingAt };
};

export const prerenderContent = (path: string): PrerenderPage | null => {
  const raw = prerenderContentRaw(path);
  if (!raw) return raw;
  // SEO Command Center: tilläggsblock (textblock, FAQ, internlänkar) ur src/data/overrides/innehall.json
  const page0 = applyOverrideBlocks(raw, buildOverrideBlocks(path));
  // Interna länkar pekar alltid på canonical adress, inte på ett alias (t.ex. /tjanster/takvard → /tjanster/taktvatt).
  const page = { ...page0, links: page0.links.map((l) => ({ ...l, href: aliasToCanonical(l.href) })) };
  return {
    ...page,
    title: page.title ? fitTitle(page.title) : page.title,
    description: page.description ? fitDescription(page.description) : page.description,
  };
};

/** Tjänst+ort-URL:er som ska noindexeras (se src/data/thin-combos.ts). */
export const thinComboPaths: string[] = locations
  .filter((l) => hasServiceCombos(l.region))
  .flatMap((l) => allServiceSlugs.filter((s) => isThinCombo(s, l)).map((s) => `/${s}-${l.slug}`));
