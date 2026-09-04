import { locationIndex as locations } from "@/data/location-index";

/**
 * Central JSON-LD-byggare. Alla noder delar samma @id:n så att Google slår ihop
 * dem till en enda kunskapsgraf över företaget, tjänsterna och orterna.
 */
export const SITE_URL = "https://roslagstak.se";
export const ORG_ID = `${SITE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

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

/** Tjänsterna vi vill att Google kopplar till företaget. */
export const services: { slug: string; name: string; description: string }[] = [
  {
    slug: "takomlaggning",
    name: "Takomläggning",
    description:
      "Komplett omläggning av taket med ny underlagspapp, ny läkt och nytt takmaterial. Fast pris efter besiktning.",
  },
  {
    slug: "takrenovering",
    name: "Takrenovering",
    description:
      "Riktade åtgärder på befintligt tak: byte av skadade pannor, tätning av genomföringar och nya plåtbeslag.",
  },
  {
    slug: "takavvattning",
    name: "Takavvattning, hängrännor och stuprör",
    description:
      "Dimensionering och montering av hängrännor, stuprör och snörasskydd anpassat efter takyta och lutning.",
  },
  {
    slug: "takkupor",
    name: "Takkupor och takfönster",
    description: "Nya takkupor och takfönster med tät anslutning mot underlagspapp och plåt.",
  },
  {
    slug: "takinspektion",
    name: "Takinspektion",
    description: "Kostnadsfri besiktning av tak, underlagspapp, råspont, avvattning och taksäkerhet med skriftlig rapport.",
  },
  {
    slug: "platarbeten",
    name: "Plåtarbeten och bandtäckning",
    description: "Fotplåt, vindskivor, skorstensbeslag och dubbelfalsad bandtäckning utförd enligt AMA Hus.",
  },
  {
    slug: "takvard",
    name: "Takvård, taktvätt och takmålning",
    description: "Skonsam taktvätt, biocidbehandling och takmålning på betongpannor, tegel och plåttak.",
  },
  {
    slug: "eternit-asbest",
    name: "Eternitsanering och asbestrivning",
    description: "Rivning och omhändertagande av eternittak enligt AFS 2006:1, inklusive transport till godkänd deponi.",
  },
];

/** Unika regioner i ortsdatan — används som areaServed på områdesnivå. */
export const serviceRegions = Array.from(new Set(locations.map((l) => l.region)));

/**
 * LocalBusiness (RoofingContractor) för hela sajten — tjänstekatalog,
 * orter/områden, öppettider och kontaktuppgifter.
 */
export const buildLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": LOCAL_BUSINESS_ID,
  name: NAP.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/og-image.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: NAP.telephone,
  email: NAP.email,
  priceRange: "$$",
  currenciesAccepted: "SEK",
  paymentAccepted: "Faktura",
  parentOrganization: { "@id": ORG_ID },
  description:
    "Takläggare i Roslagen och Storstockholm. Takbyte, takomläggning, takrenovering, plåtarbeten, takvård och eternitsanering med fast pris efter besiktning, 10 års utförandegaranti och 30 års materialgaranti.",
  address: {
    "@type": "PostalAddress",
    addressLocality: NAP.addressLocality,
    addressRegion: NAP.addressRegion,
    addressCountry: NAP.addressCountry,
  },
  geo: { "@type": "GeoCoordinates", latitude: NAP.lat, longitude: NAP.lng },
  areaServed: [
    ...serviceRegions.map((region) => ({ "@type": "AdministrativeArea", name: region })),
    ...locations.map((loc) => ({ "@type": "Place", name: loc.name })),
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "20:00",
    },
  ],
  knowsAbout: [
    "Takbyte",
    "Takomläggning",
    "Takrenovering",
    "Plåttak",
    "TP20",
    "Dubbelfalsat plåttak",
    "Tegelplåt",
    "Betongpannor",
    "Takavvattning",
    "Takinspektion",
    "Taksäkerhet",
    "Eternitsanering",
    "Takkupor",
    "Takfönster",
    "Taktvätt",
    "Takmålning",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Takarbeten i Roslagen och Storstockholm",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_URL}/tjanster/${service.slug}#service`,
        name: service.name,
        description: service.description,
        serviceType: service.name,
        provider: { "@id": LOCAL_BUSINESS_ID },
        areaServed: serviceRegions.map((region) => ({ "@type": "AdministrativeArea", name: region })),
      },
    })),
  },
  sameAs: [
    "https://www.google.com/search?q=RoslagsTak+recensioner",
    "https://www.hitta.se/s%C3%B6k?vad=roslagstak&var=norrt%C3%A4lje",
    "https://www.eniro.se/q/roslagstak",
  ],
});

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage — måste alltid spegla frågor som syns på sidan. */
export const buildFaqSchema = (faqs: FaqItem[], pageUrl?: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  ...(pageUrl ? { "@id": `${pageUrl}#faq` } : {}),
  ...(pageUrl ? { url: pageUrl } : {}),
  inLanguage: "sv-SE",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

/** BreadcrumbList från en lista med [namn, sökväg]. */
export const buildBreadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.path.startsWith("http") ? item.path : `${SITE_URL}${item.path}`,
  })),
});
