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
import { locations } from "../src/data/locations";
import { generateCombos } from "../src/data/service-location-combos";
import { blogPosts } from "../src/data/blog-posts";
import { regionBySlug, regionIntros, regionLongText, regionSlugs } from "../src/data/regions";

export interface PrerenderPage {
  h1: string;
  intro: string;
  paragraphs: string[];
  links: { href: string; label: string }[];
}

/* Services live in a React component; read the data with a regex so the
   prerender never has to bundle JSX or lucide-react. */
const servicesSource = readFileSync(resolve("src/components/Services.tsx"), "utf8");
const services = [
  ...servicesSource.matchAll(
    /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*description:\s*"([^"]+)"/g,
  ),
].map((m) => ({ slug: m[1], title: m[2], description: m[3] }));

const PHONE = "070-154 36 39";

const primaryLinks = [
  { href: "/", label: "Hem" },
  { href: "/priser", label: "Priser för takarbeten" },
  { href: "/blogg", label: "Guider om tak" },
  { href: "/recensioner", label: "Recensioner" },
  { href: "/kontakt", label: "Boka kostnadsfri rådgivning" },
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

const home: PrerenderPage = {
  h1: "Takläggare i Roslagen — takbyte & takrenovering",
  intro:
    "RoslagsTak är takläggare i Roslagen med bas på Blidö. Vi utför takbyte, takrenovering, takomläggning, plåtarbeten och taktvätt i hela Roslagen och Stockholms norra skärgård — 10 års garanti och ROT-avdrag.",
  paragraphs: [
    "Vi arbetar med TP20 plåttak, dubbelfalsat plåttak (bandtäckning), tegelplåt, pannplåt, betongpannor, lertegel och papptak. Allt arbete utförs enligt AMA-standard av certifierade och försäkrade takläggare.",
    "Som skärgårdsspecialister hanterar vi all materialtransport och logistik till öar utan broförbindelse — från Blidö, Yxlan och Ljusterö till Husarö, Finnhamn, Ingmarsö, Svartlöga och Arholma.",
    `Begär kostnadsfri besiktning och offert. Vi återkopplar inom 24 timmar. Ring ${PHONE} eller boka rådgivning på /kontakt.`,
  ],
  links: [...primaryLinks, ...serviceLinks, ...locationLinks],
};

const staticPages: Record<string, PrerenderPage> = {
  "/": home,
  "/offert": {
    h1: "Få offert på takbyte i Roslagen",
    intro:
      "Räkna fram ett prisförslag på ditt takbyte direkt i konfiguratorn, eller boka kostnadsfri rådgivning och besiktning på plats.",
    paragraphs: [
      "Välj taktyp, ange takets yta och lutning och få ett riktpris direkt. Vi lämnar alltid fast pris efter kostnadsfri besiktning — med 10 års utförandegaranti och 30 års materialgaranti.",
      `Föredrar du att prata? Ring ${PHONE} och beskriv ditt takprojekt, vi återkopplar inom 24 timmar.`,
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/taktyper": {
    h1: "Taktyper — plåttak, tegel och betongpannor",
    intro:
      "Jämför taktyper inför ditt takbyte: TP20, pannplåt, tegelplåt, dubbelfalsat plåttak (bandtäckning), lertegel, betongpannor, glaserade pannor och papptak.",
    paragraphs: [
      "Plåttak är lätt, snabbt att montera och passar de flesta hus i kustnära klimat. Dubbelfalsad bandtäckning har längst livslängd (50+ år). Betongpannor och lertegel ger klassisk karaktär men kräver bärande konstruktion för högre vikt.",
      "Vi hjälper dig välja material utifrån husets konstruktion, taklutning, väderutsatthet och budget — och sköter transport till öar utan broförbindelse.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/hur-det-gar-till": {
    h1: "Så går ett takbyte till — steg för steg",
    intro:
      "Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager.",
    paragraphs: [
      "Ordningen är råspont, underlagspapp, hängrännor och stuprör, vindskivor, ströläkt och bärläkt, takpannor eller plåt, samt avslutande plåtbeslag kring skorsten och genomföringar.",
      "Varje moment dokumenteras och kontrolleras. Du får löpande återkoppling under projektet och slutbesiktning innan vi lämnar arbetsplatsen.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/priser": {
    h1: "Vad kostar takbyte och takrenovering i Roslagen?",
    intro:
      "Riktpriser för alla typer av takarbeten i Roslagen. Alla priser inkluderar material och arbete, och ROT-avdrag ger 30 % rabatt på arbetskostnaden.",
    paragraphs: [
      "TP20 plåttak från ca 1 200 kr/m². Tegelprofilerad plåt och betongpannor från ca 1 300–1 400 kr/m². Dubbelfalsat plåttak (bandtäckning) från ca 2 000 kr/m². Taktvätt 80–150 kr/m² och takmålning från ca 150 kr/m².",
      "Priset styrs av takets storlek, lutning, antal genomföringar samt underlagets skick. Vi lämnar alltid fast pris efter kostnadsfri besiktning — inga dolda kostnader.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/recensioner": {
    h1: "Recensioner från takprojekt i Roslagen",
    intro:
      "Omdömen från kunder i Roslagens skärgård — Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn, Ingmarsö och fler orter.",
    paragraphs: [
      "Kunderna lyfter framför allt fram tydlig kommunikation, fast pris, noggrant utfört plåtarbete och vår vana att lösa materialtransport till öar utan broförbindelse.",
    ],
    links: [...primaryLinks, ...locationLinks.slice(0, 24)],
  },
  "/blogg": {
    h1: "Allt om tak i Roslagen",
    intro:
      "Tips, guider och nyheter om takbyte, takrenovering och takläggning i Roslagens skärgård.",
    paragraphs: [
      "Här hittar du fördjupande guider om taktyper, kostnader, ROT-avdrag, taksäkerhet, asbestsanering, taktvätt och underhåll av tak i kustnära klimat.",
    ],
    links: [
      ...primaryLinks,
      ...blogPosts.map((p) => ({ href: `/blogg/${p.slug}`, label: p.title })),
    ],
  },
  "/kontakt": {
    h1: "Boka rådgivning med en takexpert",
    intro: `Ring ${PHONE} eller fyll i formuläret. Vi återkopplar inom 24 timmar — helt kostnadsfritt och utan förbindelser.`,
    paragraphs: [
      "Vi erbjuder kostnadsfri takinspektion och offert i hela Roslagen och Stockholms norra skärgård, inklusive öar utan broförbindelse.",
    ],
    links: primaryLinks,
  },
  "/tjanster/taktvatt": {
    h1: "Taktvätt i Roslagen — bort med mossa, lavar och alger",
    intro:
      "Professionell taktvätt och takmålning som förlänger takets livslängd med upp till 15 år. Skonsamma metoder för betongpannor, tegel, eternit och plåttak.",
    paragraphs: [
      "Vi rengör taket med lågtryckstvätt eller manuell borstning och behandlar därefter med miljögodkänt biocidmedel som dödar mossa, alger och lavar i rotsystemet.",
      "Taktvätt kostar normalt 80–150 kr/m² och takmålning från ca 150 kr/m² inklusive grundning och två strykningar. ROT-avdrag ger 30 % rabatt på arbetskostnaden.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
};

const serviceIntro = (title: string, description: string): PrerenderPage => ({
  h1: `${title} i Roslagen`,
  intro: description,
  paragraphs: [
    `RoslagsTak utför ${title.toLowerCase()} i hela Roslagen och Stockholms norra skärgård. Allt arbete utförs enligt AMA-standard av certifierade takläggare, med 10 års garanti.`,
    "Vi lämnar fast pris efter kostnadsfri besiktning och hanterar all logistik — även till öar utan broförbindelse. ROT-avdrag ger 30 % rabatt på arbetskostnaden.",
    `Ring ${PHONE} eller begär kostnadsfri offert — vi återkopplar inom 24 timmar.`,
  ],
  links: [...primaryLinks, ...serviceLinks, ...locationLinks.slice(0, 24)],
});

/** Important on-page text for a route, or null when the route has no prerender. */
export const prerenderContent = (path: string): PrerenderPage | null => {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "").toLowerCase();

  if (staticPages[clean]) return staticPages[clean];

  if (clean.startsWith("/tjanster/")) {
    const slug = clean.slice("/tjanster/".length);
    const service = services.find((s) => s.slug === slug);
    return service ? serviceIntro(service.title, service.description) : null;
  }

  if (clean.startsWith("/blogg/")) {
    const post = blogPosts.find((p) => p.slug === clean.slice("/blogg/".length));
    if (!post) return null;
    return {
      h1: post.title,
      intro: post.excerpt,
      paragraphs: post.content,
      links: [
        ...primaryLinks,
        ...blogPosts
          .filter((p) => p.slug !== post.slug)
          .slice(0, 8)
          .map((p) => ({ href: `/blogg/${p.slug}`, label: p.title })),
      ],
    };
  }

  if (clean === "/omraden") {
    return {
      h1: "Takläggare i Roslagen och hela Storstockholm",
      intro: `RoslagsTak utför takbyte, takomläggning, takrenovering, plåtarbeten och takvård i ${locations.length} orter — från ytterskärgårdens öar till Stockholms innerstad.`,
      paragraphs: [
        "Välj ditt område nedan för lokala priser, vanliga taktyper och hur ett takprojekt går till just där.",
        `Ring ${PHONE} för kostnadsfri besiktning och fast pris.`,
      ],
      links: [
        ...primaryLinks,
        ...Object.entries(regionSlugs).map(([region, slug]) => ({
          href: `/omraden/${slug}`,
          label: `Takläggare i ${region}`,
        })),
        ...locationLinks,
      ],
    };
  }

  if (clean.startsWith("/omraden/")) {
    const region = regionBySlug(clean.slice("/omraden/".length));
    if (!region) return null;
    const places = locations.filter((l) => l.region === region);
    return {
      h1: `Takläggare i ${region}`,
      intro: regionIntros[region] ?? `Takbyte, takrenovering och plåtarbeten i ${region}.`,
      paragraphs: [
        ...(regionLongText[region] ?? []),
        `Vi arbetar i ${places.length} orter i ${region}. Ring ${PHONE} för kostnadsfri besiktning och fast pris.`,
      ],
      links: [
        ...primaryLinks,
        { href: "/omraden", label: "Alla områden i Roslagen och Storstockholm" },
        ...places.map((l) => ({
          href: `/taklaggare-${l.slug}`,
          label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
        })),
      ],
    };
  }

  if (clean.startsWith("/taklaggare-")) {
    const loc = locations.find((l) => l.slug === clean.slice("/taklaggare-".length));
    if (!loc) return null;
    const prep = loc.isIsland ? "på" : "i";
    return {
      h1: `Takläggare ${prep} ${loc.name} — takbyte, takrenovering & plåtarbeten`,
      intro: loc.description,
      paragraphs: [
        loc.longDescription,
        loc.extraContent,
        `${loc.uniqueFAQ.question} ${loc.uniqueFAQ.answer}`,
        `Ring ${PHONE} för kostnadsfri besiktning och offert ${prep} ${loc.name}.`,
      ],
      links: [
        ...primaryLinks,
        ...combos
          .filter((c) => c.locationSlug === loc.slug)
          .map((c) => ({ href: c.url, label: `${c.serviceName} ${c.prep} ${c.locationName}` })),
        ...loc.nearbyLocations
          .map((name) => locations.find((l) => l.name === name))
          .filter((l): l is (typeof locations)[number] => Boolean(l))
          .map((l) => ({
            href: `/taklaggare-${l.slug}`,
            label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
          })),
      ],
    };
  }

  const combo = comboByUrl.get(clean);
  if (combo) {
    return {
      h1: `${combo.serviceName} ${combo.prep} ${combo.locationName} — fast pris & 10 års garanti`,
      intro: combo.description,
      paragraphs: combo.content,
      links: [
        ...primaryLinks,
        {
          href: `/taklaggare-${combo.locationSlug}`,
          label: `Takläggare ${combo.prep} ${combo.locationName}`,
        },
        ...combos
          .filter(
            (c) => c.locationSlug === combo.locationSlug && c.serviceSlug !== combo.serviceSlug,
          )
          .map((c) => ({ href: c.url, label: `${c.serviceName} ${c.prep} ${c.locationName}` })),
      ],
    };
  }

  return null;
};