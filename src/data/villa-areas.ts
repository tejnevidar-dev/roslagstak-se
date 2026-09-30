/**
 * Villaområden per kommun (SEO-programmet, villaområden våg 0, backlog #1m).
 * Källa: ledning/marknad/villaomraden/alla.csv (rangordnat underlag, Marknadschefens plan
 * seo-plan-omraden.md). Bara belagda fält: områdesnamn, hustyper och byggperiod med källa
 * (kommunen, Wikipedia, hitta.se). Aldrig postnummer (ej kartkontrollerade), inkomst/köpkraft,
 * taktyp eller påståenden om egna jobb. Områden med egen sida länkas, övriga står utan länk.
 * Renderas på kommunsidan (LocationPage / RegionPage) och speglas i scripts/prerender-content.ts.
 */
export interface VillaArea {
  name: string;
  types: string;
  period: string;
  /** Egen sida på sajten, t.ex. "/taklaggare-ella-gard". Bara sidor som finns. */
  href?: string;
}

export interface MunicipalityVillaAreas {
  municipality: string;
  areas: VillaArea[];
}

export const VILLA_AREAS_SOURCE =
  "Byggperioder enligt kommunernas områdesbeskrivningar, Wikipedia och hitta.se. Urvalet bygger på områden med många ägda småhus enligt SCB.";

/** Nyckel = ortsslug för kommunsidan (/taklaggare-<slug>) eller regionslug (/omraden/<slug>). */
export const villaAreasByPage: Record<string, MunicipalityVillaAreas> = {
  stockholm: {
    municipality: "Stockholm",
    areas: [
      { name: "Kälvesta", types: "Radhus, kedjehus, atriumhus och villor", period: "1966 till mitten av 1970-talet (Wikipedia)", href: "/taklaggare-kalvesta" },
    ],
  },
  "upplands-vasby": {
    municipality: "Upplands Väsby",
    areas: [
      { name: "Bollstanäs", types: "Radhus, kedjehus och villor", period: "Främst 1970- och 1980-tal (hitta.se)", href: "/taklaggare-bollstanas" },
    ],
  },
  danderyd: {
    municipality: "Danderyd",
    areas: [
      { name: "Nora och Kevinge", types: "Villor, kedjehus och radhus", period: "Nora trädgårdsstad från 1926, Kevinge 1950–60-tal (Wikipedia, hitta.se)", href: "/taklaggare-nora-kevinge" },
      { name: "Enebyberg", types: "Villor, rad- och kedjehus", period: "Villor 1906–1940-tal, rad- och kedjehus 1960–70-tal", href: "/taklaggare-enebyberg" },
    ],
  },
  taby: {
    municipality: "Täby",
    areas: [
      { name: "Ella gård", types: "Kedjehus och radhus", period: "1955 till omkring 1970 (kommunen)", href: "/taklaggare-ella-gard" },
      { name: "Skarpäng", types: "Villor, radhus och grupphus", period: "Typhus från 1970- och 1980-talet (kommunen)", href: "/taklaggare-skarpang" },
      { name: "Näsbypark", types: "Villor, kedjehus, radhus och parhus", period: "Villor 1930–40-tal, grupphus 1955–1976 (kommunen)", href: "/taklaggare-nasbypark" },
      { name: "Ensta", types: "Villor", period: "1940–1960-tal, förtätning på 1970-talet (kommunen)" },
      { name: "Erikslund", types: "Parhus, kedjehus och grupphus", period: "1972–1973 (kommunen)" },
      { name: "Ella Park", types: "Villor och kedjehus", period: "Främst 1950–60-tal (kommunen)" },
      { name: "Vallabrink", types: "Villor och kedjehus", period: "Främst 1960–70-tal (kommunen)", href: "/taklaggare-vallabrink" },
      { name: "Gribby-Myräng", types: "Villor och radhus", period: "Löttingelund 1970–80-tal (kommunen)" },
    ],
  },
  sollentuna: {
    municipality: "Sollentuna",
    areas: [
      { name: "Viby", types: "Villor, kedjehus och radhus", period: "1970-tal (Wikipedia)", href: "/taklaggare-viby" },
      { name: "Norrviken", types: "Villor och radhus", period: "Villastad 1906–1940-tal, radhus 1960–80-tal (Wikipedia)", href: "/taklaggare-norrviken" },
      { name: "Edsviken", types: "Villor, inslag av radhus", period: "Främst 1920–30-tal (Wikipedia)", href: "/taklaggare-edsviken" },
      { name: "Töjnan", types: "Villor", period: "Mest 1920- och 1970-tal (hitta.se)" },
      { name: "Tegelhagen", types: "Kedjehus och radhus", period: "Slutet av 1970-talet (hitta.se)" },
      { name: "Vaxmora", types: "Villor och radhus", period: "Mest 1960- och 1970-tal (hitta.se)" },
      { name: "Eriksberg", types: "Villor", period: "Villastad från 1920–30-talet (Wikipedia)" },
    ],
  },
  huddinge: {
    municipality: "Huddinge",
    areas: [
      { name: "Stuvsta", types: "Villor samt rad- och kedjehus", period: "Villor 1920–1930-tal, rad- och kedjehus 1980–1990-tal", href: "/taklaggare-stuvsta" },
      { name: "Trångsund", types: "Villor, småhus och radhus", period: "Styckning 1911–1928, stor småhusutbyggnad tidigt 1960-tal", href: "/taklaggare-trangsund" },
      { name: "Segeltorp", types: "Villor och radhus", period: "Villor tidigt 1900-tal, radhus främst 1950-tal", href: "/taklaggare-segeltorp" },
      { name: "Fullersta norra", types: "Villor", period: "Mest 1960–1970-tal, villor 1920–1930-tal längs Fullerstavägen", href: "/taklaggare-fullersta" },
      { name: "Snättringe", types: "Mest villor, en del radhus", period: "Villor 1920–1930-tal, radhus tidigt 1960-tal" },
      { name: "Sjödalen södra (Solgård, Sörskogen)", types: "Villor, kedjehus och radhus", period: "Sörskogen: villor och kedjehus 1960-tal, radhus 1970-tal" },
      { name: "Östra Skogås och Mörtvik", types: "Villor, radhus och kedjehus", period: "Från slutet av 1970-talet" },
    ],
  },
  lidingo: {
    municipality: "Lidingö",
    areas: [
      { name: "Brevik, Käppala och Gåshaga", types: "Villor, kedjehus och radhus", period: "Käppala villastad från 1910-talet, Brevik i huvudsak från 1960-talet, Gåshaga 2000–2020 (Wikipedia)", href: "/taklaggare-brevik-kappala-gashaga" },
      { name: "Sticklinge", types: "Villor", period: "Norra Sticklinge efter stadsplanen 1978, Södra Sticklinge tidigt 1990-tal (Wikipedia)" },
      { name: "Mölna", types: "Villor, radhus och kedjehus", period: "Främst 1950- och 1960-tal (Wikipedia)" },
      { name: "Östra Rudboda, Yttringe och Elfvik", types: "Radhus, kedjehus och villor", period: "Östra Rudboda mitten av 1970-talet (Wikipedia)" },
      { name: "Mosstorp", types: "Villor och radhus", period: "Villasamhälle, stadsplan 1913 och 1940-talet (Wikipedia)" },
      { name: "Bo och Rudboda", types: "Villor, radhus och kedjehus", period: "Rudboda från 1960-talet, Toftvägens radhus 1962–64 (Wikipedia)" },
    ],
  },
  jarfalla: {
    municipality: "Järfälla",
    areas: [
      { name: "Jakobsberg västra", types: "Villor, kedjehus och radhus", period: "Tomter styckade på 1920–30-talet (kommunen), mest 1950–1970-tal (hitta.se)", href: "/taklaggare-jakobsberg" },
      { name: "Fjällen och Fastebol (Viksjö)", types: "Kedjehus, radhus och villor", period: "Fastebol 1966–67, Andeboda 1967–70, Fjällen tidigt 1980-tal (Wikipedia)" },
      { name: "Viksjö västra", types: "Kedjehus, radhus och villor", period: "1969 till tidigt 1980-tal (Wikipedia)" },
      { name: "Barkarby västra och Skälby östra", types: "Villor, inslag av kedjehus och radhus", period: "Tomter styckade från 1926 (kommunen), mest 1950- och 1960-tal (hitta.se)" },
      { name: "Skälby västra", types: "Villor, radhus och kedjehus", period: "Tomter styckade 1921 (kommunen), mest 1950- och 1960-tal (hitta.se)" },
      { name: "Stäket", types: "Villor", period: "Villasamhälle från 1904 (Wikipedia)" },
    ],
  },
  osteraker: {
    municipality: "Österåker",
    areas: [
      { name: "Brevik, Lervik och Flaxenvik", types: "Villor, kedjehus och radhus", period: "Villor mest 1950–1970-tal, Tråsättra 1970- och 1980-tal (hitta.se)", href: "/taklaggare-brevik" },
      { name: "Österskär", types: "Villor och kedjehus", period: "Mest 1970- och 1990-tal (hitta.se), äldre trävillor från sekelskiftet (Wikipedia)", href: "/taklaggare-osterskar" },
      { name: "Stava, Smedby och Sjökarby", types: "Villor och radhus", period: "Mest 1950–1970-tal (hitta.se)" },
      { name: "Skånsta", types: "Radhus, kedjehus och villor", period: "Mest 1960- och 1980-tal (hitta.se)" },
      { name: "Margretelund", types: "Kedjehus och villor", period: "Mest 1970- och 1990-tal (hitta.se)" },
      { name: "Svinninge", types: "Villor", period: "Mest 1950- och 1960-tal (hitta.se), utbyggnad 1990–1995 (Wikipedia)" },
      { name: "Täljö och Runö", types: "Villor, radhus och kedjehus", period: "Täljö mest 1950- och 1960-tal (hitta.se)" },
    ],
  },
};

/** Platt text för förrenderingen (samma innehåll som React-sektionen). */
export const villaAreasParagraph = (key: string): string | null => {
  const data = villaAreasByPage[key];
  if (!data) return null;
  const rows = data.areas.map((a) => `${a.name}: ${a.types.toLowerCase()}, ${a.period.charAt(0).toLowerCase()}${a.period.slice(1)}.`);
  return `Villaområden i ${data.municipality}. ${rows.join(" ")} ${VILLA_AREAS_SOURCE}`;
};
