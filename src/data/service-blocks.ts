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
    seoTitle: "Takomläggning Roslagen — Fast pris & 10 års utförandegaranti",
    seoDescription:
      "Komplett takomläggning i Roslagen och skärgården: rivning, ny råspont, papp, läkt och nytt ytskikt. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti, 30 års tätskiktsgaranti genom MATAKI.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "primary", label: "Prisbild", value: "1 200–2 000 kr/m²", text: "TP20-plåt från 1 200 kr/m², dubbelfalsat ca 2 000 kr/m² — efter ROT-avdrag, inkl. moms." },
      { tone: "outline", label: "Tidsåtgång", value: "Efter takets storlek", text: "Beror på takets storlek, underlagets skick och väder." },
      { tone: "accent", label: "Garanti", value: "10 år på utförandet", text: "30 års tätskiktsgaranti via MATAKI." },
      { tone: "plain", label: "Ingrepp", value: "Ner till råspont", text: "Allt dolt material byts — papp, läkt, beslag och avvattning." },
    ],
    block: {
      kind: "matrix",
      eyebrow: "Materialval",
      heading: "Fyra ytskikt vi lägger — och vad som skiljer dem",
      intro:
        "Valet av ytskikt styr både pris, livslängd och hur taket tål Roslagens saltluft. Vi går igenom alternativen på plats innan offerten skrivs.",
      columns: ["Material", "Pris", "Kännetecken", "Passar"],
      rows: [
        ["Profilerad plåt (TP20)", "Från 1 200 kr/m²", "Lätt, skruvad profilplåt", "Fritidshus, uthus, enkla sadeltak"],
        ["Betongpanna", "Från 1 200 kr/m²", "Tung, flera kulörer", "Villor med bärkraftig konstruktion"],
        ["Tegelpanna", "Från 1 300 kr/m²", "Tung, åldras med patina", "Äldre hus med traditionellt uttryck"],
        ["Dubbelfalsat plåttak", "Ca 2 000 kr/m²", "Lätt, inga synliga skruvar", "Klassiskt, stramt uttryck och tak med kupor och ränndalar"],
      ],
      footnote: "Riktpriser, efter ROT-avdrag och inkl. moms, med standardställning. Priset sätts efter kostnadsfri takkontroll. Komplex ställning kan tillkomma och framgår i så fall i offerten.",
    },
  },

  takrenovering: {
    seoTitle: "Takrenovering Roslagen — Laga läckor & byta papp",
    seoDescription:
      "Takrenovering i Roslagen och skärgården: byte av papp, rötskadad råspont, trasiga pannor och plåtbeslag. Fast pris efter kostnadsfri takkontroll.",
    blockPlacement: "before-spec",
    factCards: [
      { tone: "outline", label: "Prisbild", value: "Fast pris efter takkontroll", text: "Punktinsats kostar en bråkdel av en komplett omläggning." },
      { tone: "primary", label: "Vanligast", value: "Underlagspapp", text: "Läckan sitter oftast i pappen eller i beslag, inte i pannan." },
      { tone: "plain", label: "Tidsåtgång", value: "Efter skadans omfattning", text: "Beror på skadans omfattning och åtkomst till taket." },
      { tone: "accent", label: "Vinst", value: "Rätt insats i tid", text: "Kan skjuta upp ett helt takbyte." },
    ],
    block: {
      kind: "signals",
      eyebrow: "Skadebild",
      heading: "Läs av ditt tak innan vi kommer",
      intro:
        "De flesta takskador ger tydliga signaler långt innan taket börjar läcka in i rummet. Så tolkar vi dem vid takkontrollen.",
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
      "Takavvattning i Roslagen: hängrännor, stuprör, ränndalar och fotplåt i aluminium, koppar eller lackerad plåt. Dimensionering efter takyta och fast pris efter kostnadsfri takkontroll.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "accent", label: "Dimension", value: "125 / 150 mm", text: "Rännstorlek väljs efter takyta, lutning och regnintensitet." },
      { tone: "primary", label: "Fall", value: "3–5 mm/m", text: "För lite fall ger stående vatten, för mycket syns på fasaden." },
      { tone: "outline", label: "Prisbild", value: "Från ca 23 000 kr", text: "Komplett system med stuprör, efter ROT-avdrag och inkl. moms. Koppar ligger högre." },
      { tone: "plain", label: "Takkontroll", value: "Kostnadsfri", text: "Vi tittar på rännor, stuprör och avvattning på plats, utan förpliktelser." },
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
      "Takkupor och takfönster i Roslagen: konstruktion, plåtinklädnad, tätning och invändig finish. Vi hanterar bygglovsansökan och lämnar fast pris efter kostnadsfri takkontroll.",
    blockPlacement: "after-scope",
    factCards: [
      { tone: "primary", label: "Bygglov", value: "Krävs oftast", text: "Vi tar fram ritningar och hanterar ansökan mot kommunen." },
      { tone: "outline", label: "Prisbild", value: "Fast pris efter takkontroll", text: "Takkupa komplett, inklusive bygglovsansökan. Samma för takfönster, monterat." },
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
    seoTitle: "Kostnadsfri Takinspektion Roslagen — Fast pris",
    seoDescription:
      "Kostnadsfri takinspektion i Roslagen och skärgården. En av våra säljare tittar på taket på plats, ca 1–2 timmar, och du får ett fast pris om något behöver åtgärdas.",
    blockPlacement: "before-spec",
    factCards: [
      { tone: "accent", label: "Kostnad", value: "0 kr", text: "Helt kostnadsfri och utan förbindelser — även på öar." },
      { tone: "primary", label: "Tid på plats", value: "Ca 1–2 timmar", text: "Beroende på takets storlek, lutning och åtkomst." },
      { tone: "outline", label: "Genomgång", value: "Hela taket", text: "Från ytskikt och beslag till ventilation och taksäkerhet." },
      { tone: "plain", label: "Efteråt", value: "Fast pris", text: "Behöver taket åtgärdas får du ett fast pris i offerten." },
    ],
    block: {
      kind: "checklist",
      eyebrow: "Vad vi tittar på",
      heading: "Det här går vi igenom",
      intro:
        "Vi går igenom taket i fyra block: ytskikt, underlag, plåt och genomföringar samt avvattning och säkerhet.",
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
          items: ["Hängrännor: fall och fästen", "Stuprör och utkastare", "Takstege", "Taksäkerhet enligt gällande krav"],
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
      columns: ["Metall", "Kännetecken", "Underhåll", "Kustnära lägen"],
      rows: [
        ["Lackerad stålplåt", "Vanligast, många kulörer", "Håll lacken hel, åtgärda repor tidigt", "Lackkvaliteten avgör"],
        ["Aluminium", "Lätt", "Kontrollera fogar och anslutningar", "Rostar inte som stål"],
        ["Zink", "Får patina med tiden", "Kontrollera fogar och anslutningar", "Tillverkarens anvisningar gäller"],
        ["Koppar", "Blir grön med tiden", "Kontrollera fogar och anslutningar", "Tillverkarens anvisningar gäller"],
      ],
      footnote: "Alla falsade tak utförs med rörliga klammer så att plåten kan arbeta vid temperaturväxlingar.",
    },
  },

  takvard: {
    seoTitle: "Taktvätt & Takmålning Roslagen — Skonsam takvård",
    seoDescription:
      "Takvård i Roslagen: skonsam taktvätt, borttagning av mossa och alger samt takmålning med specialfärg. Fast pris efter kostnadsfri takkontroll.",
    blockPlacement: "after-scope",
    factCards: [
      { tone: "outline", label: "Taktvätt", value: "Fast pris efter takkontroll", text: "Skonsam metod anpassad efter panna, plåt eller papp." },
      { tone: "primary", label: "Takmålning", value: "Fast pris efter takkontroll", text: "Grundning och två skikt specialfärg för tak." },
      { tone: "accent", label: "Intervall", value: "Var 5–8 år", text: "Beroende på trädskugga, väderstreck och takmaterial." },
      { tone: "plain", label: "Effekt", value: "Friskare yta", text: "Rätt underhåll skyddar ytskiktet mot påväxt och fukt." },
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
    seoTitle: "Eternitsanering & Asbestrivning Roslagen",
    seoDescription:
      "Eternitsanering och asbestrivning i Roslagen och skärgården, samordnat med ett företag som har Arbetsmiljöverkets tillstånd. Emballering, transport till godkänd deponi och nytt tak. Kostnadsfri takkontroll.",
    blockPlacement: "before-spec",
    factCards: [
      { tone: "primary", label: "Regelverk", value: "Arbetsmiljöverket", text: "Arbetsmiljöverkets föreskrifter styr hela hanteringen." },
      { tone: "outline", label: "Tillstånd", value: "Krävs, ca 8 veckor", text: "Saneringsfirman söker tillstånd hos Arbetsmiljöverket innan rivning får starta." },
      { tone: "accent", label: "Sanering", value: "Fast pris efter takkontroll", text: "Sanering (via saneringsfirman) plus nytt tak. ROT-avdrag tillkommer på takarbetet." },
      { tone: "plain", label: "Avfall", value: "Godkänd deponi", text: "Emballerat, märkt och transporterat med dokumenterad kvittens." },
    ],
    block: {
      kind: "regulatory",
      eyebrow: "Regelverk",
      heading: "Så hanteras asbest lagligt — och vad du aldrig ska göra själv",
      intro:
        "Eternit får inte kapas, borras, brytas eller högtryckstvättas. Fibrerna frigörs i luften och är hälsofarliga. All hantering sker enligt Arbetsmiljöverkets föreskrifter.",
      steps: [
        { code: "01", title: "Materialbedömning", text: "Vi identifierar eternit och bedömer skick, åtkomst och rivningsmetod på plats." },
        { code: "02", title: "Tillstånd", text: "Saneringsfirman söker tillstånd hos Arbetsmiljöverket, vanligtvis cirka 8 veckor före rivning." },
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

  tegeltak: {
    seoTitle: "Tegeltak i lertegel – byte till fast pris",
    seoDescription:
      "Byta till eller lägga om tegeltak? Kostnadsfri takkontroll utan förpliktelser, fast pris och 10 års utförandegaranti. Svar inom 24 h.",
    blockPlacement: "after-spec",
    factCards: [
      { tone: "primary", label: "Material", value: "Lertegel", text: "Det klassiska valet som passar både äldre och nyare hus — inte att förväxla med tegelplåt." },
      { tone: "outline", label: "Uttryck", value: "Åldras med patina", text: "Enskilda pannor som spricker kan bytas utan att hela taket görs om." },
      { tone: "accent", label: "Bärighet", value: "Kontrolleras alltid", text: "Lertegel väger mer än plåt — vi kontrollerar konstruktionen vid takkontrollen." },
      { tone: "plain", label: "Pris", value: "Från 1 300 kr/m²", text: "Efter ROT-avdrag, inkl. moms. Fast pris i offerten." },
    ],
    block: {
      kind: "matrix",
      eyebrow: "Materialval",
      heading: "Lertegel jämfört med betong och tegelplåt",
      intro:
        "Tegel eller betong? Och vad är egentligen skillnaden mellan lertegel och tegelplåt? Vi går igenom alternativen på plats innan offerten skrivs.",
      columns: ["Material", "Pris", "Kännetecken", "Passar"],
      rows: [
        ["Lertegel", "Från 1 300 kr/m²", "Bränd lera, åldras med patina", "Äldre och nyare hus som ska behålla sin karaktär"],
        ["Betongpannor", "Från 1 200 kr/m²", "Gjuten betong, flera kulörer", "De flesta villor på fastlandet, kräver bärkraftig konstruktion"],
        ["Tegelplåt (profilerad plåt)", "Från 1 300 kr/m²", "Plåt pressad för att likna tegel", "Tegelutseende till lägre vikt och pris än lertegel"],
        ["Dubbelfalsat plåttak", "Ca 2 000 kr/m²", "Plåtbanor utan synliga skruvar", "Klassiskt, stramt uttryck"],
      ],
      footnote: "Riktpriser, efter ROT-avdrag och inkl. moms. Priset sätts efter kostnadsfri takkontroll. Exakt pris beror på takets storlek, lutning och underlag.",
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
    { to: "/taktyper", label: "Jämför taktyper och material" },
    { to: "/hur-det-gar-till", label: "Se hur ett takbyte går till" },
    { to: "/projekt/takbyte-singo", label: "Referensjobb: takbyte på Singö" },
  ],
  takrenovering: [
    { to: "/tjanster/takinspektion", label: "Boka kostnadsfri takkontroll" },
    { to: "/tjanster/takomlaggning", label: "När räcker inte renovering?" },
    { to: "/takreparation", label: "Takreparation vid läckage och skador" },
    { to: "/akut-lackage", label: "Akut läckage i taket" },
    { to: "/projekt/takrenovering-blido", label: "Referensjobb: takrenovering på Blidö" },
  ],
  takavvattning: [
    { to: "/tjanster/platarbeten", label: "Plåtarbeten och beslag" },
    { to: "/hangrannor", label: "Nya hängrännor och stuprör" },
  ],
  takkupor: [{ to: "/tjanster/platarbeten", label: "Plåtinklädnad runt kupor" }],
  takinspektion: [
    { to: "/tjanster/takrenovering", label: "Vanliga åtgärder efter takkontroll" },
    { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
  ],
  platarbeten: [
    { to: "/platslagare", label: "Plåtslagare för ditt tak" },
    { to: "/tjanster/tegeltak", label: "Tegeltak i lertegel" },
  ],
  takvard: [{ to: "/tjanster/takinspektion", label: "Kontroll före takvård" }],
  tegeltak: [{ to: "/tjanster/platarbeten#falsat", label: "Dubbelfalsat plåttak (bandtäckning)" }],
};

for (const [slug, links] of Object.entries(extraRelated)) {
  const entry = serviceBlocks[slug];
  if (entry) entry.relatedLinks = [...(entry.relatedLinks ?? []), ...links];
}
