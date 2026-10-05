import { ROT_FORBEHALL, belopp, beloppLopande } from "./prices";
import { GARANTI_RENOVERING, GARANTI_UTFORANDE } from "./guarantee";
import { TAKSAKERHET_SLUG, taksakerhetBlocks } from "./service-taksakerhet";
/**
 * Tjänstspecifika block, faktakort och metadata.
 * Varje tjänstesida får egen struktur — inte bara egna färger:
 * eget SEO-huvud, egna faktakort, eget specialblock och egen placering av blocket.
 */

export type FactTone = "primary" | "outline" | "accent" | "plain";

export type FactCard = {
  label: string;
  value: string;
  text: string;
  tone: FactTone;
};

export type SpecificBlock =
  /** Jämförelsetabell (material, plåttyper) */
  | {
      kind: "matrix";
      eyebrow: string;
      heading: string;
      intro: string;
      columns: string[];
      rows: string[][];
      footnote?: string;
    }
  /** Symptom → orsak → åtgärd */
  | {
      kind: "signals";
      eyebrow: string;
      heading: string;
      intro: string;
      items: { sign: string; meaning: string; action: string }[];
    }
  /** Vad du ser → länk till den problemsida som förklarar det (utan diagnos och åtgärd) */
  | {
      kind: "lookup";
      eyebrow: string;
      heading: string;
      intro: string;
      columns: [string, string];
      items: { sign: string; label: string; to: string }[];
    }
  /** Dimensioneringsguide med talvärden */
  | {
      kind: "dimension";
      eyebrow: string;
      heading: string;
      intro: string;
      columns: string[];
      rows: string[][];
      footnote?: string;
    }
  /** Regelverk / myndighetsprocess i numrerade kort */
  | {
      kind: "regulatory";
      eyebrow: string;
      heading: string;
      intro: string;
      steps: { code: string; title: string; text: string }[];
    }
  /** Protokoll — grupperad checklista */
  | {
      kind: "checklist";
      eyebrow: string;
      heading: string;
      intro: string;
      groups: { title: string; items: string[] }[];
    }
  /** Årsschema / säsongsband */
  | {
      kind: "season";
      eyebrow: string;
      heading: string;
      intro: string;
      periods: { label: string; title: string; text: string }[];
    };

export type ServiceBlocks = {
  seoTitle: string;
  seoDescription: string;
  /** Placering av specialblocket relativt den tekniska specifikationen. */
  blockPlacement: "before-spec" | "after-spec" | "after-scope";
  factCards: FactCard[];
  block: SpecificBlock;
  relatedLinks?: { to: string; label: string }[];
};

export const serviceBlocks: Record<string, ServiceBlocks> = {
  takomlaggning: {
    seoTitle: "Takbyte och takomläggning – fast pris efter takkontroll",
    seoDescription:
      "Takbyte och takomläggning i Roslagen och Storstockholm. Kostnadsfri takkontroll, fast pris i offerten och 10 års utförandegaranti. Svar inom 24 timmar.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "primary", label: "Prisbild", value: `${belopp("TP20 plåttak").replace("Från ", "").replace(" kr/m²", "")}–${belopp("Dubbelfalsat plåttak").replace("Ca ", "")}`, text: `TP20-plåt ${beloppLopande("TP20 plåttak")}, dubbelfalsat ${beloppLopande("Dubbelfalsat plåttak")} — efter ROT-avdrag, inkl. moms.` },
      { tone: "outline", label: "Tidsåtgång", value: "Efter takets storlek", text: "Beror på takets storlek, underlagets skick och väder." },
      { tone: "accent", label: "Garanti", value: "10 år på utförandet", text: "Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor." },
      { tone: "plain", label: "Ingrepp", value: "Ner till råspont", text: "Papp, läkt och plåtdetaljer byts." },
    ],
    block: {
      kind: "matrix",
      eyebrow: "Materialval",
      heading: "Fyra ytskikt vi lägger — och vad som skiljer dem",
      intro:
        "Valet av ytskikt styr både pris och utseende. Vi går igenom alternativen på plats innan offerten skrivs.",
      columns: ["Material", "Pris", "Kännetecken", "Passar"],
      rows: [
        ["Profilerad plåt (TP20)", belopp("TP20 plåttak"), "Lätt, skruvad profilplåt", "Enkla takformer"],
        ["Betongpanna", belopp("Betongpannetak"), "Tung, flera kulörer", "Kräver konstruktion som bär vikten"],
        ["Tegelpanna", belopp("Lertegeltak"), "Tung, åldras med patina", "Kräver konstruktion som bär vikten"],
        ["Dubbelfalsat plåttak", belopp("Dubbelfalsat plåttak"), "Lätt, inga synliga skruvar", "Tak med kupor och ränndalar"],
      ],
      footnote: `Riktpriser, efter ROT-avdrag och inkl. moms, med standardställning. Priset sätts efter kostnadsfri takkontroll. Komplex ställning kan tillkomma och framgår i så fall i offerten. ${ROT_FORBEHALL}`,
    },
  },

  takrenovering: {
    seoTitle: "Takrenovering i Roslagen – pris och vad som ingår",
    seoDescription:
      "Takrenovering: laga läckor, byta pannor, plåtdetaljer och skadad råspont. Vad som påverkar priset och hur du får fast pris efter kostnadsfri takkontroll.",
    blockPlacement: "before-spec",
    factCards: [
      { tone: "outline", label: "Prisbild", value: "Fast pris efter takkontroll", text: "Du får det fasta priset i offerten." },
      { tone: "plain", label: "Tidsåtgång", value: "Efter skadans omfattning", text: "Beror på skadans omfattning och åtkomst till taket." },
      { tone: "primary", label: "Takkontroll", value: "Kostnadsfri", text: "En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte." },
    ],
    block: {
      kind: "lookup",
      eyebrow: "Skadebild",
      heading: "Så kan skador se ut",
      intro: "En del takskador syns innan det läcker in. Det här kan du titta efter.",
      columns: ["Det du ser", "Läs mer"],
      items: [
        { sign: "Fuktfläckar på vindens undertak", label: "Fukt på vinden", to: "/takproblem/fukt-pa-vinden" },
        { sign: "Mossa i tjocka sammanhängande tuvor", label: "Mossa på taket", to: "/takproblem/mossa-pa-taket" },
        { sign: "Rostränder på plåt eller beslag", label: "Rostig plåt", to: "/takproblem/rostig-plat" },
        { sign: "Glappande eller spruckna pannor", label: "Trasiga takpannor", to: "/takproblem/trasiga-takpannor" },
        { sign: "Mörka stråk längs fasaden", label: "Läckande hängrännor", to: "/takproblem/lackande-hangrannor" },
      ],
    },
  },

  takavvattning: {
    seoTitle: "Hängrännor & Stuprör Roslagen — Takavvattning",
    seoDescription:
      "Takavvattning i Roslagen: hängrännor, stuprör, ränndalar och fotplåt i lackerad plåt. Fast pris efter kostnadsfri takkontroll.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "outline", label: "Prisbild", value: belopp("Takavvattning (hängrännor)").replace("Från ca ", "Från ca "), text: "Komplett system med stuprör, efter ROT-avdrag och inkl. moms. Priset gäller när arbetet görs i samband med ett takbyte. Som eget arbete sätts priset efter takkontrollen. " + ROT_FORBEHALL },
      { tone: "plain", label: "Takkontroll", value: "Kostnadsfri", text: "Vi tittar på rännor, stuprör och avvattning på plats, utan förpliktelser." },
      { tone: "accent", label: "Garanti", value: "10 år på utförandet", text: GARANTI_UTFORANDE },
    ],
    block: {
      kind: "lookup",
      eyebrow: "Läs mer",
      heading: "Problem med hängrännor och stuprör",
      intro: "Det här kan du titta efter. Vill du ha hjälp med ditt hus börjar vi med en kostnadsfri takkontroll.",
      columns: ["Det du ser", "Läs mer"],
      items: [
        { sign: "Vatten rinner över rännans kant", label: "Igensatta hängrännor", to: "/takproblem/igensatta-hangrannor" },
        { sign: "Det droppar eller rinner vid skarvarna", label: "Läckande hängrännor", to: "/takproblem/lackande-hangrannor" },
        { sign: "Istappar vid takfoten", label: "Istappar på taket", to: "/takproblem/istappar-pa-taket" },
      ],
    },
  },

  takkupor: {
    seoTitle: "Takkupor & Takfönster Roslagen — Fast pris",
    seoDescription:
      "Takkupor och takfönster i Roslagen med fast pris efter kostnadsfri takkontroll. En av våra säljare tittar på taket på plats och du får en rapport om takets skick.",
    blockPlacement: "after-scope",
    factCards: [
      { tone: "primary", label: "Prisbild", value: "Fast pris efter takkontroll", text: "Gäller både takkupa och takfönster (Velux), inklusive montering." },
      { tone: "outline", label: "Takkontroll", value: "Kostnadsfri", text: "En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte." },
      { tone: "accent", label: "Garanti", value: "10 år på utförandet", text: GARANTI_RENOVERING },
    ],
    block: {
      kind: "checklist",
      eyebrow: "Takkontroll",
      heading: "Det här tittar vi på vid takkontrollen",
      intro:
        "Takkontrollen är kostnadsfri och utan förpliktelser. Efteråt får du en rapport om takets skick, och behöver taket åtgärdas får du också en offert med fast pris.",
      groups: [
        {
          title: "Vid takkontrollen",
          items: ["Takmaterial", "Plåtdetaljer", "Avvattning", "Vinden, när den går att komma åt"],
        },
      ],
    },
  },

  takinspektion: {
    seoTitle: "Kostnadsfri Takkontroll Roslagen — Fast pris",
    seoDescription:
      "Kostnadsfri takkontroll i Roslagen och Storstockholm. En av våra säljare tittar på taket på plats, ca 1–2 timmar, och du får ett fast pris om något behöver åtgärdas.",
    blockPlacement: "before-spec",
    factCards: [
      { tone: "accent", label: "Kostnad", value: "0 kr", text: "Kostnadsfri och utan förpliktelser." },
      { tone: "primary", label: "Tid på plats", value: "Ca 1–2 timmar", text: "Beroende på takets storlek, lutning och åtkomst." },
      { tone: "outline", label: "Rapport", value: "Om takets skick", text: "Du får en rapport om takets skick efter besöket." },
      { tone: "plain", label: "Efteråt", value: "Fast pris", text: "Behöver taket åtgärdas får du ett fast pris i offerten." },
    ],
    block: {
      kind: "checklist",
      eyebrow: "Vad vi tittar på",
      heading: "Det här tittar vi på",
      intro:
        "En av våra säljare tittar på taket på plats, med blotta ögat och utan ingrepp i taket.",
      groups: [
        {
          title: "Vid takkontrollen",
          items: [
            "Ytmaterial",
            "Nock",
            "Plåtdetaljer och beslag",
            "Genomföringar",
            "Hängrännor och stuprör",
            "Vindskivor och takfot",
            "Underlaget där det går att se",
            "Vinden, om den går att komma åt",
          ],
        },
      ],
    },
  },

  platarbeten: {
    seoTitle: "Plåtarbeten på tak i Roslagen: skorstensbeslag, ränndalar",
    seoDescription:
      "Plåtarbeten på taket i Roslagen och Storstockholm: skorstensbeslag, ränndalar, fotplåt och vindskiveplåt. Kostnadsfri takkontroll och fast pris i offerten.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "primary", label: "Teknik", value: "Falsat & profilerat", text: "Dubbelfalsad bandtäckning eller profilerad plåt. Vilken lutning plåten kräver anger tillverkaren." },
      { tone: "outline", label: "Takkontroll", value: "Kostnadsfri", text: "En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte." },
      { tone: "accent", label: "Garanti", value: "10 år på utförandet", text: GARANTI_RENOVERING },
    ],
    block: {
      kind: "lookup",
      eyebrow: "Plåtdetaljer",
      heading: "Där många läckage börjar",
      intro: "Bandtäckning, skorstensinklädnad, fotplåt och beslag. Det här kan du titta efter.",
      columns: ["Det du ser", "Läs mer"],
      items: [
        { sign: "Rostränder på plåt eller beslag", label: "Rostig plåt", to: "/takproblem/rostig-plat" },
        { sign: "Fuktfläckar vid skorstenen", label: "Läckage vid skorsten", to: "/takproblem/lackage-vid-skorsten" },
        { sign: "Vatten som läcker vid ränndalen", label: "Läckande ränndal", to: "/takproblem/lackande-ranndal" },
        { sign: "Mörka eller ruttna vindskivor och takfot", label: "Ruttna vindskivor och takfot", to: "/takproblem/ruttna-vindskivor-och-takfot" },
      ],
    },
  },

  takvard: {
    seoTitle: "Taktvätt – kostnadsfri takkontroll och fast pris",
    seoDescription:
      "Taktvätt: vi börjar med en kostnadsfri takkontroll utan förpliktelser. Du får en rapport om takets skick och fast pris i offerten. Svar inom 24 timmar.",
    blockPlacement: "after-scope",
    factCards: [
      { tone: "primary", label: "Takkontroll", value: "Kostnadsfri", text: "En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte." },
      { tone: "outline", label: "Pris", value: "Fast i offerten", text: "Behöver taket åtgärdas får du en offert med fast pris. Tillägg görs bara efter ditt godkännande." },
    ],
    block: {
      kind: "checklist",
      eyebrow: "Bra att veta",
      heading: "Så går det till",
      intro: "Taktvätt är en av de tjänster vi erbjuder.",
      groups: [
        {
          title: "Takkontrollen",
          items: [
            "En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar.",
            "Efter takkontrollen får du en rapport om takets skick.",
            "Visar takkontrollen att taket behöver något annat än en tvätt står det i rapporten, och du bestämmer själv hur du vill gå vidare.",
          ],
        },
      ],
    },
  },

  "eternit-asbest": {
    seoTitle: "Byta eternittak – sanering via behörig firma",
    seoDescription:
      "Har du eternittak? En firma med tillstånd river det gamla taket, vi lägger det nya. Fast pris på det nya taket i offerten. Kostnadsfri takkontroll.",
    blockPlacement: "before-spec",
    factCards: [
      { tone: "primary", label: "Sanering", value: "Görs av en firma med tillstånd", text: "Sanering: görs av en firma med tillstånd från Arbetsmiljöverket." },
      { tone: "outline", label: "Takkontroll", value: "Kostnadsfri", text: "En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte." },
    ],
    block: {
      kind: "regulatory",
      eyebrow: "Vem gör vad",
      heading: "Saneringen görs av en annan firma, det nya taket gör vi",
      intro: "Vi river inte asbest och har inget tillstånd för det. Vi samordnar med en behörig saneringsfirma.",
      steps: [
        { code: "01", title: "Vi", text: "Vi gör takkontrollen och lägger det nya taket: nytt underlag, ny läkt och nytt takmaterial." },
        { code: "02", title: "Saneringsfirman", text: "Saneringsfirman river det gamla taket och tar hand om materialet." },
        { code: "03", title: "Du", text: "Borra, såga, slipa eller bryt inte i skivorna själv, och gå inte upp på taket." },
      ],
    },
    relatedLinks: [
      { to: "/blogg/eternittak-asbest-sanering", label: "Allt om eternittak och asbest" },
      { to: "/tjanster/takomlaggning", label: "Takomläggning efter sanering" },
    ],
  },

  tegeltak: {
    seoTitle: "Tegeltak – pris, lertegel och fast pris i offerten",
    seoDescription:
      "Tegeltak i lertegel: riktpris efter ROT-avdrag, vad som påverkar priset och vad som ingår. Kostnadsfri takkontroll och fast pris i offerten.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "primary", label: "Material", value: "Lertegel", text: "Det klassiska valet som passar både äldre och nyare hus." },
      { tone: "outline", label: "Uttryck", value: "Åldras med patina", text: "Enskilda pannor som spricker kan bytas utan att hela taket görs om." },
      { tone: "accent", label: "Tungt material", value: "Lertegel väger mer", text: "Vad takstolarna klarar kan behöva bedömas av en konstruktör om huset har haft ett lättare tak." },
      { tone: "plain", label: "Pris", value: belopp("Lertegeltak"), text: "Efter ROT-avdrag, inkl. moms. Fast pris i offerten." },
    ],
    block: {
      kind: "matrix",
      eyebrow: "Materialval",
      heading: "Lertegel jämfört med betong och pannplåt",
      intro:
        "Tegel eller betong? Eller pannplåt, som ser ut som pannor men är plåt? Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.",
      columns: ["Material", "Pris", "Kännetecken"],
      rows: [
        ["Lertegel", belopp("Lertegeltak"), "Bränd lera, åldras med patina"],
        ["Betongpannor", belopp("Betongpannetak"), "Gjuten betong, flera kulörer"],
        ["Pannplåt", belopp("Pannplåttak"), "Plåt pressad för att likna pannor"],
        ["Dubbelfalsat plåttak", belopp("Dubbelfalsat plåttak"), "Plåtbanor utan synliga skruvar"],
      ],
      footnote: `Riktpriser, efter ROT-avdrag och inkl. moms. Priset sätts efter kostnadsfri takkontroll. Exakt pris beror på takets storlek, lutning och underlag. ${ROT_FORBEHALL}`,
    },
    relatedLinks: [
      { to: "/blogg/plattak-vs-betongpannor", label: "Plåttak jämfört med betongpannor" },
      { to: "/blogg/valja-ratt-tak-roslagen", label: "Välja rätt tak i Roslagen" },
    ],
  },
};

/** Tjänstspecifika fördjupningslänkar som läggs till i "Läs vidare". */
const extraRelated: Record<string, { to: string; label: string }[]> = {
  takomlaggning: [
    { to: "/tjanster/tegeltak#pris", label: "Tegeltak pris" },
    { to: "/material/betongpannor#pris", label: "Betongpannor pris" },
    { to: "/material/tp20-plattak#pris", label: "Plåttak pris" },
    { to: "/blogg/takpapp-byte-livslangd", label: "Takpapp: laga eller byta?" },
    { to: "/taktyper", label: "Jämför taktyper och material" },
    { to: "/hur-det-gar-till", label: "Se hur ett takbyte går till" },
    { to: "/projekt/takbyte-singo", label: "Referensjobb: takbyte på Singö" },
    { to: "/projekt/takbyte-grisslehamn", label: "Referensjobb: nytt tak i Grisslehamn" },
    { to: "/takomlaggning-norrtalje", label: "Takomläggning i Norrtälje" },
  ],
  takrenovering: [
    { to: "/blogg/takpapp-byte-livslangd", label: "Takpapp: laga eller byta?" },
    { to: "/tjanster/takinspektion", label: "Boka kostnadsfri takkontroll" },
    { to: "/tjanster/takomlaggning", label: "När räcker inte renovering?" },
    { to: "/takreparation", label: "Takreparation vid läckage och skador" },
    { to: "/akut-lackage", label: "Läckage i taket" },
    { to: "/projekt/takrenovering-blido", label: "Referensjobb: takrenovering på Blidö" },
  ],
  takavvattning: [
    { to: "/blogg/hangrannor-stupror-skargard", label: "Hängrännor och stuprör: material och underhåll" },
    { to: "/tjanster/platarbeten", label: "Plåtarbeten och beslag" },
    { to: "/hangrannor", label: "Nya hängrännor och stuprör" },
  ],
  takkupor: [{ to: "/tjanster/platarbeten", label: "Plåtinklädnad runt kupor" }],
  takinspektion: [
    { to: "/blogg/takinspektion-guide", label: "Takinspektion: när, varför och hur det går till" },
    { to: "/tjanster/takrenovering", label: "Vanliga åtgärder efter takkontroll" },
    { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
  ],
  platarbeten: [
    { to: "/material/tp20-plattak#pris", label: "Plåttak pris" },
    { to: "/blogg/bandtackt-plat-vs-klicktak", label: "Bandtäckt plåt eller klicktak" },
    { to: "/blogg/bandtackning-tak-guide", label: "Bandtäckning: så går det till" },
    { to: "/platslagare", label: "Plåtslagare för ditt tak" },
    { to: "/tjanster/tegeltak", label: "Tegeltak i lertegel" },
  ],
  takvard: [
    { to: "/tjanster/takrenovering", label: "Takrenovering" },
    { to: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
    { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
  ],
  tegeltak: [
    { to: "/tjanster/platarbeten#falsat", label: "Dubbelfalsat plåttak (bandtäckning)" },
    { to: "/material/pannplat", label: "Pannplåt" },
  ],
};

serviceBlocks[TAKSAKERHET_SLUG] = taksakerhetBlocks;

for (const [slug, links] of Object.entries(extraRelated)) {
  const entry = serviceBlocks[slug];
  if (entry) entry.relatedLinks = [...(entry.relatedLinks ?? []), ...links];
}
