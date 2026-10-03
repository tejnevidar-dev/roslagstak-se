/**
 * Central schema-graf (fas 2.19). ENDA källan för @id:n och för de noder som hör ihop per sida:
 * Organization ↔ WebSite ↔ WebPage ↔ BreadcrumbList ↔ BlogPosting. Importeras av React-sidorna
 * (lib/schema.ts, lib/blog-schema.ts) och av prerender/static-heads, så att statisk HTML och
 * klientrenderad HTML bär identiska id:n. Bara relativa importer: modulen paketeras av esbuild
 * utan "@"-alias.
 */
export const SITE_URL = "https://roslagstak.se";
export const ORG_ID = `${SITE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolut URL för en sökväg ("/" ger startsidan med avslutande snedstreck). */
export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

export const webPageId = (url: string) => `${url}#webpage`;
export const breadcrumbId = (url: string) => `${url}#breadcrumb`;
export const articleId = (url: string) => `${url}#article`;

/** Referens till organisationen med namn, så att en parser som bara ser noden ändå får namnet. */
export const organizationRef = () => ({ "@type": "Organization", "@id": ORG_ID, name: "RoslagsTak" });

/** WebPage-undertyp per sidmall. Allt som inte är listat är en vanlig WebPage. */
const COLLECTION_PATHS = new Set([
  "/blogg",
  "/omraden",
  "/projekt",
  "/problem",
  "/material",
  "/tjanster",
  "/orter",
]);
export const webPageTypeFor = (path: string): "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" => {
  if (path === "/om-oss") return "AboutPage";
  if (path === "/kontakt") return "ContactPage";
  if (COLLECTION_PATHS.has(path)) return "CollectionPage";
  return "WebPage";
};

export interface WebPageInput {
  path: string;
  name: string;
  description?: string;
  /** Sidans delningsbild (sökväg under public/), blir primaryImageOfPage. */
  image?: string;
  /** Sant om sidan har en BreadcrumbList med breadcrumbId(url) i grafen. */
  hasBreadcrumb?: boolean;
}

/**
 * En egen WebPage-nod per sida. Startsidan är isPartOf WebSite och handlar om organisationen;
 * övriga sidor är isPartOf WebSite och pekar på sin brödsmula. Inga påståenden utöver det sidan
 * redan visar (titel, beskrivning, bild).
 */
export const buildWebPageNode = ({ path, name, description, image, hasBreadcrumb }: WebPageInput) => {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": webPageTypeFor(path),
    "@id": webPageId(url),
    url,
    name,
    ...(description ? { description } : {}),
    inLanguage: "sv-SE",
    isPartOf: { "@id": WEBSITE_ID },
    ...(path === "/" ? { about: { "@id": ORG_ID } } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { "@id": breadcrumbId(url) } } : {}),
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) } } : {}),
  };
};

/** BreadcrumbList med @id från sista stegets URL (= sidans egen URL). */
export const buildBreadcrumbNode = (items: { name: string; path: string }[]) => {
  const last = items[items.length - 1];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(last ? { "@id": breadcrumbId(absoluteUrl(last.path)) } : {}),
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
};

/** Företagets kontaktuppgifter (NAP). Enda källan; lib/schema.ts re-exporterar den. */
export const NAP = {
  name: "RoslagsTak",
  telephone: "+46701543639",
  email: "info@roslagstak.se",
  addressLocality: "Norrtälje",
  addressRegion: "Stockholms län",
  addressCountry: "SE",
  lat: 59.765,
  lng: 18.705,
};

export const SAME_AS = [
  "https://www.google.com/search?q=RoslagsTak+recensioner",
  "https://www.hitta.se/s%C3%B6k?vad=roslagstak&var=norrt%C3%A4lje",
  "https://www.eniro.se/q/roslagstak",
];

/**
 * Organization-noden, byggd från NAP. Beslut 2026-10-04 (Marknadschefen): inget alternateName
 * "RoslagsTak AB" (bolaget är inte bildat, avtalspart är VT6 Invest AB), ingen foundingLocation
 * och inget annat som inte står synligt på sajten. Basen i Norrtälje anges som postadress.
 */
export const buildOrganizationNode = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: NAP.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/og-image.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: NAP.telephone,
  email: NAP.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: NAP.addressLocality,
    addressRegion: NAP.addressRegion,
    addressCountry: NAP.addressCountry,
  },
  sameAs: SAME_AS,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: NAP.telephone,
    contactType: "customer service",
    areaServed: NAP.addressCountry,
    availableLanguage: ["Swedish"],
  },
});

export const buildWebSiteNode = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: NAP.name,
  inLanguage: "sv-SE",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blogg?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});
