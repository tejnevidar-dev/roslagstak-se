/**
 * Ersättningstext för ortssidor med gammal data (Marknadschefens Grind 2026-10-04, backlog 1bs).
 * Källa: ledning/marknad/innehall/ortsmall-ersattningstext-gammal-data.md. Ordagrant ur mallen, tre varianter per stycke.
 * Mallen gäller varje ort som saknar en riktig områdestext (ingen faktaruta, se usesMall) och ersätts ort för ort
 * när Innehåll har skrivit en områdestext (import-omrade sätter factBox).
 *
 * Variantvalet är en fast regel som bara beror på ortens ordningsnummer i locations.ts (aldrig på namn eller region):
 * stycke k får variant (nummer + k) modulo 3. Samma ort får därför alltid samma text, och grannorter får olika.
 * Kommunen finns inte i datan, så mallens reservform används ("{ort} hör till {region} i vår områdesindelning").
 * Delas av LocationPage.tsx, scripts/prerender-content.ts och scripts/schema-fixtures.ts.
 */
import { locations, type LocationData } from "./locations";
import { projectTexts as projects } from "./project-texts";
import { distanceFromBaseKm, distanceKm } from "./service-reach";

const NEARBY_PROJECT_MAX_KM = 30;

/**
 * Nav-sidor och ortssidor med över 100 visningar på 28 dagar får aldrig mallen (Marknadschefen 2026-10-04, backlog 1bt):
 * de behåller sin egen text, där bara meningar som bryter mot regel 5 är strukna. Fyra av dem har pågående titelmätningar.
 * Mallen är för orter utan trafik. Underlag: ledning/marknad/innehall/ortslista-gammal-data-2026-10-04.md.
 */
export const MALL_UNDANTAG: readonly string[] = ["taby", "vallentuna", "akersberga", "danderyd", "norrtalje", "vaxholm"];

/**
 * Öar som bara nås med båt (ingen belagd bilväg i datan). Mallens stycke 3, ingressen och avslutningen lovar där inte
 * "kostnadsfri" takkontroll, eftersom frågan om takkontroll utan bilväg (10o) är obesvarad (Marknadschefen, backlog 1bu).
 */
export const OAR_UTAN_BILVAG: readonly string[] = [
  "hogmarso", "husaro", "ingmarso", "finnhamn", "humlo", "svartloga", "sodorora", "norrora", "grasko", "arholma",
];

/** Orten har ingen riktig områdestext (import-omrade sätter alltid factBox) och är inte undantagen. */
export const usesMall = (loc: LocationData): boolean => !loc.factBox && !MALL_UNDANTAG.includes(loc.slug);

const pick = <T,>(variants: [T, T, T], index: number, offset: number): T => variants[(index + offset) % 3];

const refProject = (loc: LocationData) => {
  if (projects.some((p) => p.locationSlug === loc.slug)) return undefined;
  for (const p of projects) {
    const projectLoc = locations.find((l) => l.slug === p.locationSlug);
    if (projectLoc && distanceKm(loc, projectLoc) <= NEARBY_PROJECT_MAX_KM) {
      return { title: p.title, km: Math.round(distanceKm(loc, projectLoc)) };
    }
  }
  return undefined;
};

export const applyMall = (loc: LocationData): LocationData => {
  if (!usesMall(loc)) return loc;
  const index = locations.findIndex((l) => l.slug === loc.slug);
  const n = index < 0 ? 0 : index;
  const ort = loc.name;
  const prep = loc.isIsland ? "på" : "i";
  const region = loc.region;
  const km = Math.round(distanceFromBaseKm(loc));
  const grannar = loc.nearbyLocations.join(", ");

  const p1 = pick<string>(
    [
      `${ort} hör till ${region} i vår områdesindelning. Vi tar uppdrag här med takbyte, takomläggning och takrenovering på villor och fritidshus.`,
      `Vi tar uppdrag ${prep} ${ort}. Det gäller takbyte, takomläggning och takrenovering på villor och fritidshus. Mer om området finns på sidan ${region}.`,
      `Har du hus ${prep} ${ort} och funderar på taket? Vi tar uppdrag ${prep} ${ort} med takbyte, takomläggning och takrenovering på villor och fritidshus. Orten hör till ${region}.`,
    ],
    n,
    0,
  );
  const p2 = pick<string>(
    [
      "Två hus på samma gata kan ha tak i helt olika skick. Vad ditt tak behöver går inte att säga utan att se det. Därför börjar varje jobb med att en av våra säljare tittar på taket på plats.",
      "Hur ett tak mår går inte att avgöra på adressen eller på husets ålder. Ett tak kan ha lagts om, och ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. Därför börjar vi med att titta på taket på plats.",
      `Varje hus får en egen takkontroll och ett eget pris. Vi utgår inte från hur husen ${prep} ${ort} brukar se ut, utan från ditt tak. En av våra säljare tittar på det på plats.`,
    ],
    n,
    1,
  );
  const utanBilvag = OAR_UTAN_BILVAG.includes(loc.slug);
  const p3 = utanBilvag
    ? "Berätta var huset ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris."
    : pick<string>(
    [
      "Takkontrollen är kostnadsfri och utan förpliktelser, och den tar ungefär 1–2 timmar. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.",
      "Du betalar inget för takkontrollen och binder dig inte till något. Den tar ungefär 1–2 timmar. Efteråt får du en rapport om takets skick, och om något behöver åtgärdas en offert med fast pris.",
      "En takkontroll tar ungefär 1–2 timmar och är kostnadsfri och utan förpliktelser. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris. Du bestämmer själv om och när något ska göras.",
    ],
    n,
    2,
  );
  const p4 = pick<string>(
    [
      `Vi har vår bas i Norrtälje, ungefär ${km} km från ${ort}, och tar uppdrag i Roslagen och Storstockholm. Närmaste orter i vårt område: ${grannar}.`,
      `${ort} ligger ungefär ${km} km från Norrtälje, där vi har vår bas. Vi tar uppdrag i Roslagen och Storstockholm. I närheten finns också ${grannar}.`,
      `Från vår bas i Norrtälje är det ungefär ${km} km till ${ort}. Vi tar uppdrag i Roslagen och Storstockholm, bland annat i ${grannar}.`,
    ],
    n,
    3,
  );
  const ref = refProject(loc);
  const p5 = ref
    ? pick<string>(
        [
          `Ett referensjobb i närområdet: ${ref.title}, ungefär ${ref.km} km härifrån. Det jobbet gjordes inte ${prep} ${ort}, men det visar hur ett komplett takbyte kan se ut.`,
          `Vi har inget referensjobb ${prep} ${ort} att visa. Närmast ligger ${ref.title}, ungefär ${ref.km} km bort, med bilder och uppgifter om vad som gjordes.`,
          `Vill du se ett tak vi har bytt? Närmast ${ort} ligger ${ref.title}, ungefär ${ref.km} km bort. Jobbet gjordes inte här, men bilderna visar ett komplett takbyte.`,
        ],
        n,
        4,
      )
    : "Vi har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn. Bilder och uppgifter finns under våra projekt.";
  const p6 = pick<string>(
    [
      "Riktpriser per takmaterial finns på prissidan. Ditt pris står i offerten och är fast, och tillägg görs bara efter ditt godkännande. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden. Vi arbetar enligt AMA och lämnar 10 års utförandegaranti på det arbete vi utför.",
      "Priset i offerten är fast. Tillägg görs bara efter ditt godkännande. Riktpriser per material hittar du på prissidan, och som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden. Arbetet utförs enligt AMA, och vi lämnar 10 års utförandegaranti på det arbete vi utför.",
      "Vi arbetar enligt AMA och lämnar 10 års utförandegaranti på det arbete vi utför. Priset i offerten är fast, och tillägg görs bara efter ditt godkännande. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden. Riktpriser per material finns på prissidan.",
    ],
    n,
    5,
  );
  const faq = pick<{ question: string; answer: string }>(
    [
      {
        question: `Vad kostar ett takbyte ${prep} ${ort}?`,
        answer:
          "Det beror på takets storlek, form, material och underlagets skick. Riktpriser per material finns på prissidan, och ditt pris står i offerten och är fast.",
      },
      {
        question: `Behövs bygglov för att byta tak ${prep} ${ort}?`,
        answer:
          "För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
      },
      {
        question: `Hur bokar jag en takkontroll ${prep} ${ort}?`,
        answer:
          "På roslagstak.se/takkontroll eller på 070-154 36 39. Vi svarar inom 24 timmar. Takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19.",
      },
    ],
    n,
    6,
  );

  return {
    ...loc,
    description: utanBilvag
      ? `Takbyte, takomläggning och takrenovering ${prep} ${ort}. Takkontroll utan förpliktelser och fast pris i offerten.`
      : `Takbyte, takomläggning och takrenovering ${prep} ${ort}. Kostnadsfri takkontroll utan förpliktelser och fast pris i offerten.`,
    longDescription: p1,
    extraContent: "",
    extraSections: [
      { heading: "Därför börjar vi med att titta på taket", text: p2 },
      { heading: "Takkontrollen", text: p3 },
      { heading: "Var vi finns", text: `${p4} ${p5}` },
      { heading: "Pris, ROT och villkor", text: p6 },
      { heading: "Boka takkontroll", text: `Boka en ${utanBilvag ? "" : "kostnadsfri "}takkontroll ${prep} ${ort} på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.` },
    ],
    uniqueFAQ: faq,
  };
};

export const getLocationWithMall = (slug: string): LocationData | undefined => {
  const loc = locations.find((l) => l.slug === slug);
  return loc ? applyMall(loc) : undefined;
};
