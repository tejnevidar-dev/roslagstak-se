/**
 * Materialbibliotek (SEO-programmet Phase 2.5). Innehåll granskat och godkänt av Marknadschefen,
 * källa: ledning/marknad/innehall/materialbibliotek-utkast.md. Bara allmänt belagd takkunskap —
 * inga livslängdssiffror eller priser (kostnadsdrivare länkar till /priser, som Vidar godkänt).
 *
 * Lertegel och dubbelfalsat plåttak har redan egna, live sidor (/tjanster/tegeltak och
 * /tjanster/platarbeten#falsat) — de får INTE en dubblettsida här, bara ett hubbkort som länkar dit.
 * Bara betongpannor och TP20 är nya sidor (`href` pekar internt, `detail` är satt).
 */

export interface MaterialDetail {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  funktion: string;
  anvandning: string;
  livslangd: string;
  fordelar: string;
  nackdelar: string;
  passarNar: string;
  underhall: string;
  vanligaFel: string;
  kostnadsdrivare: string;
  delAvTaksystemet: string;
  hosOss?: string;
  hallIsar?: string;
}

export interface Material {
  slug: string;
  href: string;
  title: string;
  hubDescription: string;
  weight: "Tungt" | "Lätt";
  visibleScrews: "Nej" | "Ja";
  minLutning: string;
  detail?: MaterialDetail;
}

export const materials: Material[] = [
  {
    slug: "betongpannor",
    href: "/material/betongpannor",
    title: "Betongpannor",
    hubDescription: "Klassiskt pannat tak, tåligt men tungt.",
    weight: "Tungt",
    visibleScrews: "Nej",
    minLutning: "Enligt tillverkaren",
    detail: {
      metaTitle: "Betongpannor – egenskaper, för- och nackdelar",
      metaDescription:
        "Betongpannor är ett vanligt val på svenska villatak. Så fungerar de, vad som talar för och emot och vad du ska tänka på vid ett takbyte.",
      intro:
        "Betongpannor är ett av de vanligaste takmaterialen på svenska villor — tåliga och klassiska i uttrycket, men tunga nog att kräva en konstruktion som klarar vikten.",
      funktion:
        "Pannor av betong som läggs på bärläkt över ströläkt och underlag. Pannorna leder bort vattnet, och underlaget är det andra skyddet.",
      anvandning:
        "Sadeltak och andra lutande tak på villor och fritidshus. Kräver en viss minsta taklutning, som tillverkaren anger.",
      livslangd:
        "Lång vid rätt montage och skötsel. Ytskiktet kan åldras och bli poröst med tiden. Tillverkarens uppgifter och garantier gäller.",
      fordelar:
        "Klassiskt pannat utseende, finns i flera kulörer (till exempel svart eller rött), tåligt material, enskilda pannor kan bytas.",
      nackdelar:
        "Tunga, så takstolarna måste klara vikten. Ytan kan få påväxt av mossa och lav i skuggiga, fuktiga lägen.",
      passarNar:
        "Du vill ha ett traditionellt pannat tak och huset tål vikten. Vanligt vid byte från äldre pannor.",
      underhall:
        "Håll hängrännor och ränndalar rena, ta hand om mossa skonsamt och byt enstaka trasiga pannor.",
      vanligaFel:
        "Spruckna eller förskjutna pannor efter storm eller frost, lösa nockpannor, felaktigt lagda pannor runt genomföringar.",
      kostnadsdrivare:
        "Takets storlek och form, antal genomföringar och detaljer, underlagets skick, ställning och åtkomst.",
      delAvTaksystemet:
        "Underlag, ströläkt, bärläkt, pannor, nockpannor, plåtdetaljer (fotplåt, vindskivor, skorstensbeslag) och avvattning.",
      hosOss: "Svarta betongpannor från Benders på Blidö, Norrtälje, och röda betongpannor på Singö, Grisslehamn.",
    },
  },
  {
    slug: "lertegel",
    href: "/tjanster/tegeltak",
    title: "Lertegel",
    hubDescription: "Det klassiska teglet, åldras med patina.",
    weight: "Tungt",
    visibleScrews: "Nej",
    minLutning: "Enligt tillverkaren",
  },
  {
    slug: "tp20-plattak",
    href: "/material/tp20-plattak",
    title: "TP20-plåttak",
    hubDescription: "Lätt profilplåt, snabb att lägga.",
    weight: "Lätt",
    visibleScrews: "Ja",
    minLutning: "Enligt tillverkaren",
    detail: {
      metaTitle: "TP20 plåttak – egenskaper, för- och nackdelar",
      metaDescription:
        "TP20 är en trapetsprofilerad takplåt. Så fungerar den, var den passar och vad du ska tänka på jämfört med pannor och falsat.",
      intro:
        "TP20 är en trapetsprofilerad takplåt — lätt, snabb att lägga och ett vanligt val på villor, fritidshus och lägre takdelar.",
      funktion:
        "Trapetsprofilerad plåt i långa längder som skruvas på läkt över underlag. Profilen ger styvhet och leder bort vattnet.",
      anvandning:
        "Villor, fritidshus, garage och uthus, samt lägre takdelar och tillbyggnader. Klarar lägre lutningar än pannor (tillverkarens anvisning gäller).",
      livslangd:
        "Beror främst på ytbehandlingen och miljön (till exempel saltluft vid kusten). Tillverkarens uppgifter gäller.",
      fordelar:
        "Lätt jämfört med pannor, snabb att lägga i långa längder, finns i flera kulörer, fungerar på lägre lutningar.",
      nackdelar:
        "Skruvarna genom plåten måste sitta rätt och kontrolleras. Rostskydd och skarvar är avgörande. Kan upplevas som ljudligare vid regn om taket inte är rätt uppbyggt.",
      passarNar:
        "Du vill ha ett lätt tak, har låg lutning eller vill ha plåttakets uttryck, eller på lägre takdelar i kombination med pannor.",
      underhall: "Kontrollera skruvar, skarvar och ytbehandling, och åtgärda repor och rost tidigt.",
      vanligaFel: "Lösa eller felmonterade skruvar, rost i skarvar och kanter, skadad ytbehandling.",
      kostnadsdrivare: "Takyta, detaljer och genomföringar, plåtdetaljer, underlag och åtkomst.",
      delAvTaksystemet: "Underlag, läkt, TP20-plåt, nockplåt, fotplåt, vindskiveplåt och avvattning.",
      hosOss:
        "Röd TP20-plåt på de lägre delarna av huset på Singö, Grisslehamn, i kombination med röda betongpannor på huvudtaket.",
      hallIsar:
        "TP20 (trapetsprofilerad plåt) är inte samma sak som dubbelfalsat plåttak (bandtäckning) — falsat har dolda fästen i stället för synliga skruvar.",
    },
  },
  {
    slug: "dubbelfalsat",
    href: "/tjanster/platarbeten#falsat",
    title: "Dubbelfalsat plåttak",
    hubDescription: "Bandtäckning utan synliga skruvar.",
    weight: "Lätt",
    visibleScrews: "Nej",
    minLutning: "Enligt tillverkaren",
  },
  {
    slug: "papptak",
    href: "/material/papptak",
    title: "Papptak",
    hubDescription: "Tätt och lätt, för låglutande tak.",
    weight: "Lätt",
    visibleScrews: "Nej",
    minLutning: "Enligt tillverkaren",
    detail: {
      metaTitle: "Papptak – takpapp för låglutande tak, för- och nackdelar",
      metaDescription:
        "Papptak är ett lätt och tätt tak för flacka och låglutande tak. Så fungerar takpapp, när den passar och vad du ska tänka på vid omläggning.",
      intro:
        "Papptak är ett tätt, lätt tak av takpapp och ett av få material som fungerar på riktigt flacka tak. Du hittar det på garage, carportar, uthus och tillbyggnader, men också på hus med låg taklutning. Till skillnad från pannor och profilplåt bygger papptaket på att hela ytan är ett sammanhängande tätskikt.",
      funktion:
        "Takpapp är en duk av glasfiber eller polyester som har impregnerats och belagts med bitumen. Den läggs direkt på ett fast underlag, oftast råspont, i våder som överlappar varandra. Skarvarna fogas så att ytan blir tät. Beroende på system läggs taket i ett eller flera lager, med en underpapp under en ytpapp. Ytpappen har ofta ett skikt av skiffer eller granulat på ovansidan, som skyddar mot solens UV-ljus och ger taket dess färg.",
      anvandning:
        "Flacka och låglutande tak, där pannor inte kan läggas för att vattnet inte rinner av tillräckligt snabbt. Papptak används på garage, carportar, förråd, uthus och tillbyggnader, och på bostadshus med låg lutning. Vilka lutningar ett visst papptakssystem är gjort för anger tillverkaren.",
      livslangd:
        "Beror på pappens kvalitet, antal lager, taklutning, sol och hur väl avvattningen fungerar. Ytpapp åldras främst av solljus och av vatten som blir stående. Tillverkarens uppgifter och garantier gäller.",
      fordelar:
        "Lätt material som inte belastar takstolarna som pannor gör. Fungerar på flacka tak där andra material inte kan användas. Ytan blir sammanhängande utan fogar mellan pannor eller skruvar genom materialet.",
      nackdelar:
        "Hela tätheten hänger på skarvarna och anslutningarna, så arbetet måste vara noggrant utfört. Solen och vatten som blir stående sliter på ytan. Uttrycket är enklare än ett pannat tak eller ett falsat plåttak.",
      passarNar:
        "Taket är flackt eller har låg lutning, byggnaden är lätt i konstruktionen (garage, carport, uthus, tillbyggnad), eller huset har papptak i dag och ska få ett nytt tätt tak av samma slag.",
      underhall:
        "Se till att vatten inte blir stående på taket: rensa hängrännor, brunnar och utkastare, och ta bort löv och grenar. Titta efter blåsor, sprickor, lösa skarvar och partier där skiffret har släppt. Mossa tas bort skonsamt, aldrig med högtryckstvätt.",
      vanligaFel:
        "Läckage vid skarvar och vid anslutningar mot vägg, skorsten och genomföringar. Stående vatten på flacka partier. Åldrad ytpapp med sprickor eller blåsor.",
      kostnadsdrivare:
        "Takets storlek, antal lager, anslutningar och genomföringar, avvattningen, råspontens skick och om ställning behövs.",
      delAvTaksystemet:
        "Råspont, underpapp och ytpapp (beroende på system), anslutningar och plåtdetaljer (fotplåt, vindskivor) och avvattning. Vid ett takbyte kan råsponten ses över när den gamla pappen är borta.",
      hallIsar:
        "Ytpapp på ett papptak är det synliga tätskiktet. Underlagspapp under pannor eller plåt är ett dolt andra skydd på andra taktyper.",
    },
  },
];

export const getMaterial = (slug: string) => materials.find((m) => m.slug === slug && m.detail);

/** Giltiga material-slugs, för att typa Project.materialSlugs i src/data/projects.ts. */
export type MaterialSlug = (typeof materials)[number]["slug"];
