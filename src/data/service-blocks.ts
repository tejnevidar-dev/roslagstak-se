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
    seoTitle: "Takomläggning Roslagen — Fast pris & 10 års garanti",
    seoDescription:
      "Komplett takomläggning i Roslagen och skärgården: rivning, ny råspont, papp, läkt och nytt ytskikt. Fast pris efter kostnadsfri besiktning, 10 års utförandegaranti, 30 års materialgaranti.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "primary", label: "Prisbild", value: "1 200–2 000 kr/m²", text: "TP20-plåt i nedre spannet, dubbelfalsat i övre. Fast pris i offerten." },
      { tone: "outline", label: "Tidsåtgång", value: "1–3 veckor", text: "Normalvilla med ställning, rivning, nytt underlag och ytskikt." },
      { tone: "accent", label: "Livslängd", value: "40–70 år", text: "Beror på val av ytskikt, lutning och exponering mot saltluft." },
      { tone: "plain", label: "Ingrepp", value: "Ner till råspont", text: "Allt dolt material byts — papp, läkt, beslag och avvattning." },
    ],
    block: {
      kind: "matrix",
      eyebrow: "Materialval",
      heading: "Fyra ytskikt vi lägger — och vad som skiljer dem",
      intro:
        "Valet av ytskikt styr både pris, livslängd och hur taket tål Roslagens saltluft. Vi går igenom alternativen på plats innan offerten skrivs.",
      columns: ["Material", "Pris/m²", "Livslängd", "Passar"],
      rows: [
        ["Profilerad plåt (TP20)", "1 200–1 400 kr", "40–50 år", "Fritidshus, uthus, enkla sadeltak"],
        ["Betongpanna", "1 400–1 600 kr", "50–60 år", "Villor med bärkraftig konstruktion"],
        ["Tegelpanna", "1 600–1 800 kr", "60–70 år", "Äldre hus med traditionellt uttryck"],
        ["Dubbelfalsat plåttak", "1 800–2 000+ kr", "60–80 år", "Vindutsatta lägen, låg lutning, kustnära"],
      ],
      footnote: "Priser är inklusive material och arbete, före ROT-avdrag. Ställning och avfall specificeras separat i offerten.",
    },
  },

  takrenovering: {
    seoTitle: "Takrenovering Roslagen — Laga läckor & byta papp",
    seoDescription:
      "Takrenovering i Roslagen och skärgården: byte av papp, rötskadad råspont, trasiga pannor och plåtbeslag. Fast pris efter besiktning från ca 300 kr/m².",
    blockPlacement: "before-spec",
    factCards: [
      { tone: "outline", label: "Prisbild", value: "Från 300 kr/m²", text: "Punktinsats kostar en bråkdel av en komplett omläggning." },
      { tone: "primary", label: "Vanligast", value: "Underlagspapp", text: "Läckan sitter oftast i pappen eller i beslag, inte i pannan." },
      { tone: "plain", label: "Tidsåtgång", value: "1–5 dagar", text: "Beroende på skadans omfattning och åtkomst till taket." },
      { tone: "accent", label: "Vinst", value: "+10–20 år", text: "Rätt insats i tid skjuter upp hela takbytet betydligt." },
    ],
    block: {
      kind: "signals",
      eyebrow: "Skadebild",
      heading: "Läs av ditt tak innan vi kommer",
      intro:
        "De flesta takskador ger tydliga signaler långt innan taket börjar läcka in i rummet. Så tolkar vi dem vid besiktningen.",
      items: [
        { sign: "Fuktfläckar på vindens undertak", meaning: "Hål eller spricka i underlagspappen", action: "Byte av papp på berörd takfall, kontroll av råspont" },
        { sign: "Mossa i tjocka sammanhängande tuvor", meaning: "Ytskiktet håller kvar fukt permanent", action: "Rengöring, behandling och byte av vittrade pannor" },
        { sign: "Rostränder på plåt eller beslag", meaning: "Ytbehandlingen har släppt", action: "Byte av beslag eller ommålning av plåt" },
        { sign: "Glappande eller spruckna pannor", meaning: "Frostsprängning eller läktrörelse", action: "Byte av enstaka pannor och kontroll av läktavstånd" },
        { sign: "Mörka stråk längs fasaden", meaning: "Avvattningen läcker eller är underdimensionerad", action: "Justering av fall, byte av ränna eller stuprör" },
      ],
    },
  },

  takavvattning: {
    seoTitle: "Hängrännor & Stuprör Roslagen — Takavvattning",
    seoDescription:
      "Takavvattning i Roslagen: hängrännor, stuprör, ränndalar och fotplåt i aluminium, koppar eller lackerad plåt. Dimensionering efter takyta och fast pris efter besiktning.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "accent", label: "Dimension", value: "125 / 150 mm", text: "Rännstorlek väljs efter takyta, lutning och regnintensitet." },
      { tone: "primary", label: "Fall", value: "3–5 mm/m", text: "För lite fall ger stående vatten, för mycket syns på fasaden." },
      { tone: "outline", label: "Prisbild", value: "Från 250 kr/lpm", text: "Aluminium; koppar ligger högre. Komplett system från ca 15 000 kr." },
      { tone: "plain", label: "Livslängd", value: "25–50 år", text: "Lackerad plåt i nedre spannet, koppar i det övre." },
    ],
    block: {
      kind: "dimension",
      eyebrow: "Dimensionering",
      heading: "Så räknar vi fram rätt system för din takyta",
      intro:
        "Ett underdimensionerat system svämmar över vid kraftig nedbörd och skickar vattnet mot fasad och grund. Vi utgår från takets horisontella projektionsyta.",
      columns: ["Takyta per takfall", "Hängränna", "Stuprör", "Antal stuprör"],
      rows: [
        ["Upp till 40 m²", "100 mm", "75 mm", "1"],
        ["40–80 m²", "125 mm", "87 mm", "2"],
        ["80–150 m²", "125–150 mm", "100 mm", "2"],
        ["Över 150 m²", "150 mm", "100–120 mm", "3 eller fler"],
      ],
      footnote: "Ränndalar och fotplåt falsas i plåt och anpassas alltid till takets lutning och material.",
    },
  },

  takkupor: {
    seoTitle: "Takkupor & Takfönster Roslagen — Bygglov & montage",
    seoDescription:
      "Takkupor och takfönster i Roslagen: konstruktion, plåtinklädnad, tätning och invändig finish. Vi hanterar bygglovsansökan. Takkupa från ca 50 000 kr.",
    blockPlacement: "after-scope",
    factCards: [
      { tone: "primary", label: "Bygglov", value: "Krävs oftast", text: "Vi tar fram ritningar och hanterar ansökan mot kommunen." },
      { tone: "outline", label: "Prisbild", value: "Från 50 000 kr", text: "Takkupa komplett. Takfönster från ca 15 000 kr monterat." },
      { tone: "accent", label: "Handläggning", value: "4–10 veckor", text: "Kommunens tid för bygglov — planera projektet i god tid." },
      { tone: "plain", label: "Byggtid", value: "1–2 veckor", text: "Från öppning i takfall till färdig inklädnad och tätning." },
    ],
    block: {
      kind: "regulatory",
      eyebrow: "Bygglovsprocess",
      heading: "Från idé till godkänd kupa",
      intro:
        "En takkupa ändrar husets yttre och volym, vilket i de flesta kommuner kräver bygglov. Vi driver processen så att du slipper pappersarbetet.",
      steps: [
        { code: "01", title: "Platsbesök och mått", text: "Vi mäter takfall, taklutning och vindsutrymme och bedömer vad konstruktionen tillåter." },
        { code: "02", title: "Ritningar", text: "Fasad-, plan- och sektionsritning tas fram i den omfattning kommunen kräver." },
        { code: "03", title: "Bygglovsansökan", text: "Vi skickar in ansökan och kompletterar vid frågor från byggnadsnämnden." },
        { code: "04", title: "Startbesked", text: "Arbetet påbörjas först när startbesked finns — inget rivs i förväg." },
        { code: "05", title: "Utförande", text: "Öppning, bärande konstruktion, plåtinklädnad, fönster, isolering och invändig finish." },
        { code: "06", title: "Slutbesked", text: "Vi lämnar dokumentation och foton som underlag för kommunens slutbesked." },
      ],
    },
  },

  takinspektion: {
    seoTitle: "Kostnadsfri Takbesiktning Roslagen — Skriftlig rapport",
    seoDescription:
      "Kostnadsfri takinspektion i Roslagen och skärgården. Vi kontrollerar ytskikt, papp, råspont, avvattning, ventilation och taksäkerhet och lämnar skriftlig rapport med foton.",
    blockPlacement: "before-spec",
    factCards: [
      { tone: "accent", label: "Kostnad", value: "0 kr", text: "Helt kostnadsfri och utan förbindelser — även på öar." },
      { tone: "primary", label: "Tid på plats", value: "45–90 min", text: "Beroende på takets storlek, lutning och åtkomst." },
      { tone: "outline", label: "Kontrollpunkter", value: "22 punkter", text: "Från ytskikt och beslag till ventilation och taksäkerhet." },
      { tone: "plain", label: "Leverans", value: "Rapport med foto", text: "Skriftligt underlag med åtgärdsförslag och prisuppskattning." },
    ],
    block: {
      kind: "checklist",
      eyebrow: "Besiktningsprotokoll",
      heading: "Det här kontrollerar vi — punkt för punkt",
      intro:
        "Vi går igenom taket i fyra block och dokumenterar varje avvikelse med foto. Du får protokollet skriftligt oavsett om du beställer arbete eller inte.",
      groups: [
        {
          title: "Ytskikt",
          items: ["Pannor: sprickor, glapp, frostskador", "Plåt: rost, lackskador, infästningar", "Nock och valmning", "Mossa, alger och lavpåväxt"],
        },
        {
          title: "Underlag",
          items: ["Underlagspapp och skarvar", "Råspont: röta och missfärgning", "Läkt och läktavstånd", "Fuktindikation på vinden"],
        },
        {
          title: "Plåt och genomföringar",
          items: ["Skorstensbeslag och stoss", "Ventilationshuvar", "Ränndalar och fotplåt", "Vindskivor och gavelbeslag"],
        },
        {
          title: "Avvattning och säkerhet",
          items: ["Hängrännor: fall och fästen", "Stuprör och utkastare", "Snörasskydd och takstege", "Taksäkerhet enligt gällande krav"],
        },
      ],
    },
  },

  platarbeten: {
    seoTitle: "Plåtarbeten & Bandtäckning Roslagen — Certifierade",
    seoDescription:
      "Plåtarbeten i Roslagen: bandtäckning, falsat plåttak, skorstensbeslag, ränndalar och vindskiveplåt i stål, aluminium, koppar och zink. Certifierade plåtslagare, fast pris.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "primary", label: "Teknik", value: "Falsat & profilerat", text: "Dubbelfalsad bandtäckning eller profilerad plåt beroende på lutning." },
      { tone: "outline", label: "Minsta lutning", value: "3,6°", text: "Dubbelfalsat klarar låg lutning där pannor inte fungerar." },
      { tone: "accent", label: "Material", value: "4 metaller", text: "Stål, aluminium, koppar och zink — valda efter läge och uttryck." },
      { tone: "plain", label: "Detaljer", value: "Platstillverkade", text: "Beslag falsas och anpassas på plats efter husets mått." },
    ],
    block: {
      kind: "matrix",
      eyebrow: "Metallval",
      heading: "Fyra metaller — egenskaper i kustklimat",
      intro:
        "Saltluft ställer högre krav på metallval än inlandsklimat. Vi väljer material efter avstånd till öppet vatten, lutning och husets karaktär.",
      columns: ["Metall", "Livslängd", "Underhåll", "Kustnära lämplighet"],
      rows: [
        ["Lackerad stålplåt", "40–50 år", "Ommålning efter 25–30 år", "God med rätt lackkvalitet"],
        ["Aluminium", "50–60 år", "Nära noll", "Mycket god — korroderar inte"],
        ["Zink", "60–80 år", "Nära noll", "God, får jämn patina"],
        ["Koppar", "80–100 år", "Inget", "Mycket god, ädlar sig grön"],
      ],
      footnote: "Alla falsade tak utförs med rörliga klammer så att plåten kan arbeta vid temperaturväxlingar.",
    },
  },

  takvard: {
    seoTitle: "Taktvätt & Takmålning Roslagen — Skonsam takvård",
    seoDescription:
      "Takvård i Roslagen: skonsam taktvätt, borttagning av mossa och alger samt takmålning med specialfärg. Taktvätt från ca 80 kr/m², målning från ca 150 kr/m².",
    blockPlacement: "after-scope",
    factCards: [
      { tone: "outline", label: "Taktvätt", value: "Från 80 kr/m²", text: "Skonsam metod anpassad efter panna, plåt eller papp." },
      { tone: "primary", label: "Takmålning", value: "Från 150 kr/m²", text: "Grundning och två skikt specialfärg för tak." },
      { tone: "accent", label: "Intervall", value: "Var 5–8 år", text: "Beroende på trädskugga, väderstreck och takmaterial." },
      { tone: "plain", label: "Effekt", value: "+10 år", text: "Rätt underhåll förlänger ytskiktets livslängd påtagligt." },
    ],
    block: {
      kind: "season",
      eyebrow: "Årsschema",
      heading: "Takvård över året i Roslagen",
      intro:
        "Takvård är säsongsarbete. Fukt, temperatur och löv styr när varje åtgärd ger bäst resultat — det här är vår arbetskalender.",
      periods: [
        { label: "Mars–april", title: "Vinterkontroll", text: "Genomgång efter snölast och frost: lösa pannor, skadade beslag och rensning av rännor." },
        { label: "Maj–juni", title: "Tvätt och behandling", text: "Bästa tiden för taktvätt och mossbehandling — torrt underlag och stabila temperaturer." },
        { label: "Juli–augusti", title: "Målning", text: "Takmålning kräver torrt tak och plusgrader dygnet runt. Här ligger måleriets huvudsäsong." },
        { label: "September–november", title: "Lövrensning", text: "Rännor och ränndalar rensas innan hösten sätter igång för fullt." },
      ],
    },
  },

  "eternit-asbest": {
    seoTitle: "Eternitsanering & Asbestrivning Roslagen — Certifierad",
    seoDescription:
      "Certifierad eternitsanering och asbestrivning i Roslagen och skärgården. Säker rivning enligt AFS 2006:1, emballering, transport till godkänd deponi och nytt tak. Kostnadsfri besiktning.",
    blockPlacement: "before-spec",
    factCards: [
      { tone: "primary", label: "Regelverk", value: "AFS 2006:1", text: "Arbetsmiljöverkets föreskrifter styr hela hanteringen." },
      { tone: "outline", label: "Anmälan", value: "7 dagar före", text: "Anmälan till Arbetsmiljöverket görs av oss innan start." },
      { tone: "accent", label: "Sanering", value: "Från 400 kr/m²", text: "Plus nytt tak från ca 1 200 kr/m². ROT-avdrag tillkommer." },
      { tone: "plain", label: "Avfall", value: "Godkänd deponi", text: "Emballerat, märkt och transporterat med dokumenterad kvittens." },
    ],
    block: {
      kind: "regulatory",
      eyebrow: "Regelverk",
      heading: "Så hanteras asbest lagligt — och vad du aldrig ska göra själv",
      intro:
        "Eternit får inte kapas, borras, brytas eller högtryckstvättas. Fibrerna frigörs i luften och är hälsofarliga. All hantering sker enligt AFS 2006:1.",
      steps: [
        { code: "01", title: "Materialbedömning", text: "Vi identifierar eternit och bedömer skick, åtkomst och rivningsmetod på plats." },
        { code: "02", title: "Anmälan", text: "Anmälan till Arbetsmiljöverket lämnas minst sju dagar före arbetets start." },
        { code: "03", title: "Saneringsplan", text: "Skyddszon, personlig skyddsutrustning, dammbindning och avfallsflöde fastställs skriftligt." },
        { code: "04", title: "Kontrollerad rivning", text: "Plattorna lyfts hela, dammbinds och hanteras utan kapning eller brytning." },
        { code: "05", title: "Emballering och transport", text: "Materialet dubbelemballeras, märks och transporteras till godkänd deponi med kvittens." },
        { code: "06", title: "Nytt tak", text: "Underlaget kontrolleras och repareras innan nytt ytskikt monteras." },
      ],
    },
    relatedLinks: [
      { to: "/blogg/eternittak-asbest-sanering", label: "Allt om eternittak och asbest" },
      { to: "/tjanster/takomlaggning", label: "Takomläggning efter sanering" },
    ],
  },
};

/** Tjänstspecifika fördjupningslänkar som läggs till i "Läs vidare". */
const extraRelated: Record<string, { to: string; label: string }[]> = {
  takomlaggning: [
    { to: "/taktyper", label: "Jämför taktyper och material" },
    { to: "/hur-det-gar-till", label: "Se hur ett takbyte går till" },
  ],
  takrenovering: [
    { to: "/tjanster/takinspektion", label: "Boka kostnadsfri takbesiktning" },
    { to: "/tjanster/takomlaggning", label: "När räcker inte renovering?" },
  ],
  takavvattning: [{ to: "/tjanster/platarbeten", label: "Plåtarbeten och beslag" }],
  takkupor: [{ to: "/tjanster/platarbeten", label: "Plåtinklädnad runt kupor" }],
  takinspektion: [{ to: "/tjanster/takrenovering", label: "Vanliga åtgärder efter besiktning" }],
  platarbeten: [{ to: "/taktyper", label: "Falsat plåttak och bandtäckning" }],
  takvard: [{ to: "/tjanster/takinspektion", label: "Kontroll före takvård" }],
};

for (const [slug, links] of Object.entries(extraRelated)) {
  const entry = serviceBlocks[slug];
  if (entry) entry.relatedLinks = [...(entry.relatedLinks ?? []), ...links];
}
