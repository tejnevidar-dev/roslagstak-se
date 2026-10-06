/**
 * Kontextuella internlänkar från bloggartiklar till problem-, material- och tjänstesidor
 * (SEO del 2, fas 2.15, Marknadschefen 2026-10-01). Väljs efter artikelns ämne (slug) och ges
 * bara till artiklar UTAN prisuppgifter — artiklar med kronor väntar på prisgenomgången (#1o).
 * Bara indexerade sidor som mål (aldrig noindex). Används av BlogPost.tsx och prerender.
 */
export interface RelatedLink {
  to: string;
  label: string;
}

const RULES: [RegExp, RelatedLink[]][] = [
  [/mossa|takmalning|tvatt|alger/, [{ to: "/takproblem/mossa-pa-taket", label: "Mossa på taket" }]],
  [
    /plat|bandtack|falsad|tp20|korrugerad|klicktak/,
    [
      { to: "/material/tp20-plattak", label: "TP20-plåttak" },
      { to: "/takproblem/rostig-plat", label: "Rostig plåt" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten" },
    ],
  ],
  [
    /betong|panna|pannor|tegel/,
    [
      { to: "/material/betongpannor", label: "Betongpannor" },
      { to: "/takproblem/trasiga-takpannor", label: "Trasiga eller förskjutna takpannor" },
      { to: "/tjanster/tegeltak", label: "Tegeltak i lertegel" },
    ],
  ],
  [
    /papp|epdm|platt-tak|platta/,
    [
      { to: "/material/papptak", label: "Papptak" },
      { to: "/takproblem/dalig-underlagspapp", label: "Dålig underlagspapp" },
    ],
  ],
  [
    /hangrann|stupror|avrinning|ranndal|avvattning/,
    [
      { to: "/takproblem/igensatta-hangrannor", label: "Igensatta hängrännor" },
      { to: "/takproblem/lackande-ranndal", label: "Läckande ränndal" },
      { to: "/tjanster/takavvattning", label: "Takavvattning" },
    ],
  ],
  [/vindskiv|takfot/, [{ to: "/takproblem/ruttna-vindskivor-och-takfot", label: "Ruttna vindskivor eller takfotsbrädor" }]],
  [
    /ventilation|kondens|fukt|mogel/,
    [
      { to: "/takproblem/kondens-pa-vinden", label: "Kondens på vinden" },
      { to: "/takproblem/fukt-pa-vinden", label: "Fukt eller mögel på vinden" },
    ],
  ],
  [/sno|skotta|istapp|vinter/, [{ to: "/takproblem/istappar-pa-taket", label: "Istappar och isbildning vid takfoten" }]],
  [/storm|forsakring/, [{ to: "/takproblem/stormskador-pa-taket", label: "Stormskador på taket" }]],
  [/skorsten|lackage|lacker/, [{ to: "/takproblem/lackage-vid-skorsten", label: "Läckage vid skorstenen" }]],
  [/raspont|underlag|rota/, [{ to: "/takproblem/rutten-raspont", label: "Rutten eller skadad råspont" }]],
];

const FALLBACK: RelatedLink[] = [
  { to: "/takproblem", label: "Vanliga takproblem" },
  { to: "/material", label: "Takmaterial" },
  { to: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
];

const hasPrices = (content: string[]) => content.some((p) => /\d[\d\s]*(kr\b|kronor|kr\/m)/i.test(p));

/** Länkar som läggs först i länkraden oavsett om artikeln har priser (åtgärdslistan 2026-10-06, rad 7: "dubbelfalsat plåttak pris"). */
const EXTRA: Record<string, RelatedLink[]> = {
  "bandtackt-plat-vs-klicktak": [{ to: "/tjanster/platarbeten#falsat", label: "pris för dubbelfalsat plåttak" }],
};

export const relatedForPost = (post: { slug: string; content: string[] }): RelatedLink[] => {
  const extra = EXTRA[post.slug] ?? [];
  if (hasPrices(post.content)) return extra;
  const inBody = new Set(post.content.flatMap((p) => [...p.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1])));
  const picked: RelatedLink[] = [];
  for (const [re, links] of RULES) {
    if (!re.test(post.slug)) continue;
    for (const l of links) if (!inBody.has(l.to) && !picked.some((p) => p.to === l.to)) picked.push(l);
  }
  for (const l of FALLBACK) if (picked.length < 2 && !picked.some((p) => p.to === l.to)) picked.push(l);
  return [...extra, ...picked].slice(0, 3);
};
