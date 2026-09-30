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
  /** Godkänd kommunrad från Innehåll (områden utan egen sida). Visas i stället för hustyper + byggperiod. */
  note?: string;
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
  ekero: {
    municipality: "Ekerö",
    areas: [
      { name: "Träkvista", types: "Villor, kedjehus och radhus", period: "Främst 1960- och 1980-tal (hitta.se)", note: "Träkvista på Ekerön har mest villor, kedjehus och radhus och var Ekerö kommuns mittpunkt fram till 1990, då Ekerö centrum invigdes. Enligt hitta.se är husen i Träkvista främst byggda på 1960- och 1980-talen." },
    ],
  },
  tyreso: {
    municipality: "Tyresö",
    areas: [
      { name: "Brevikshalvön (Raksta, Bergholm, Solberga, Dyvik, Ällmora)", types: "Villor", period: "Villaområde sedan 1930-talet", note: "På Brevikshalvön, som före 1930 ingick i Tyresögodset, bebyggdes skogs- och jordbruksmarken under 1900-talet med sommarnöjen och fritidshus, och sedan 1930-talet har halvön utvecklats till ett villaområde. Raksta omtalas första gången 1562, som ett torp under Tyresö slott." },
      { name: "Hanviken och Skälsätra (Trollbäcken)", types: "Småhus", period: "Avstyckat från Kumla gård", note: "Hanviken och Skälsätra styckades av från Kumla gård, stamfastigheten för stora delar av västra Tyresö, vars huvudbyggnad från 1700-talet och allé fortfarande finns kvar. Trollbäcken hette Kumla fram till 1947, och bebyggelsen består mest av småhus." },
    ],
  },
  nacka: {
    municipality: "Nacka",
    areas: [
      { name: "Saltsjöbaden", types: "Villor (villastad)", period: "Villastad 1891–1912, utbyggnad efter andra världskriget", href: "/taklaggare-saltsjobaden" },
      { name: "Storängen och Saltsjö-Duvnäs", types: "Villor, radhus", period: "Storängen från 1904, funkisvillor 1930–40-tal, Duvnäs 1910–20-tal, radhus 1964–67", href: "/taklaggare-storangen" },
      { name: "Lännersta", types: "Villor", period: "Tomter styckade till 1937 (925 st), villor främst från 1930-talet och framåt", href: "/taklaggare-lannersta" },
    ],
  },
  stockholm: {
    municipality: "Stockholm",
    areas: [
      { name: "Kälvesta", types: "Radhus, kedjehus, atriumhus och villor", period: "1966 till mitten av 1970-talet (Wikipedia)", href: "/taklaggare-kalvesta" },
      { name: "Norra Ängby", types: "Småstugor/villor i trä (1–2 plan), radhus", period: "1930–1941 (huvuddelen 1931–38), enplansvillor 1948–49", href: "/taklaggare-angby" },
      { name: "Hässelby villastad", types: "Villor, radhus, kedjehus", period: "Villor från 1900, radhus/kedjehus 1970-tal (Backlura)", href: "/taklaggare-hasselby" },
      { name: "Långbro", types: "Villor och småstugor", period: "Villor ca 1899–1903, småstugor 1943–49", href: "/taklaggare-langbro" },
      { name: "Örby", types: "Villor", period: "Sent 1800-tal–1970-tal", href: "/taklaggare-orby" },
      { name: "Solhem och Lunda", types: "Villor, kedjehus, radhus, parhus", period: "1904–07, 1920–30-tal, 1960-tal, 2000-tal", href: "/taklaggare-solhem-lunda" },
      { name: "Nälsta", types: "Villor, radhus och flerfamiljshus", period: "Stadsdel från 1953", note: "Nälsta by är känd sedan 1300-talet, och namnet, skrivet Nærdharstaff 1354, kommer enligt Wikipedia från gudomsnamnet Njärd. Området köptes av Stockholms stad 1931, och stadsdelen bildades 1953, med blandad bebyggelse av villor, radhus och flerfamiljshus." },
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
      { name: "Ensta", types: "Villor", period: "1940–1960-tal, förtätning på 1970-talet (kommunen)", href: "/taklaggare-ensta" },
      { name: "Erikslund", types: "Parhus, kedjehus och grupphus", period: "1972–1973 (kommunen)", href: "/taklaggare-erikslund" },
      { name: "Ella Park", types: "Villor och kedjehus", period: "Främst 1950–60-tal (kommunen)", note: "Enligt Täby kommun styckades skogsmarken som hörde till gården Ellas utmarker av för villor i slutet av 1920-talet, först längs dagens Täbyvägen, och området präglas i dag av villor från 1930-talet och framåt, med ett tydligt inslag av 1950- och 60-talens tegel- och putsarkitektur." },
      { name: "Vallabrink", types: "Villor och kedjehus", period: "Främst 1960–70-tal (kommunen)", href: "/taklaggare-vallabrink" },
      { name: "Gribby-Myräng", types: "Villor och radhus", period: "Löttingelund 1970–80-tal (kommunen)", href: "/taklaggare-gribbylund" },
      { name: "Karlslund", types: "Parhus och kedjehus i ett och ett halvt plan", period: "1975–1976", href: "/taklaggare-karlslund" },
      { name: "Midgård och Byle", types: "Radhus (Midgård, 231 bostäder), villor, kedjehus, radhus (Byle)", period: "Midgård 1972–73, Byle villor 1907–1910-tal och radhus 1974", href: "/taklaggare-midgard-byle" },
      { name: "Roslags-Näsby", types: "Villor, radhus (samt flerbostadshus)", period: "Villor från tidigt 1900-tal och 1930-tal, hitta.se 1960- och 1970-tal", href: "/taklaggare-roslags-nasby" },
      { name: "Viggbyholm", types: "Villor", period: "Villastad främst 1918–1935, en del 1960-tal", href: "/taklaggare-viggbyholm" },
      { name: "Vallatorp och Visinge", types: "Radhus, parhus, kedjehus, villor", period: "Vallatorp slutet av 1970-talet, Visinge grupphus 1980-tal, Lövbrunna 2007–2008", href: "/taklaggare-vallatorp-visinge" },
    ],
  },
  sollentuna: {
    municipality: "Sollentuna",
    areas: [
      { name: "Viby", types: "Villor, kedjehus och radhus", period: "1970-tal (Wikipedia)", href: "/taklaggare-viby" },
      { name: "Norrviken", types: "Villor och radhus", period: "Villastad 1906–1940-tal, radhus 1960–80-tal (Wikipedia)", href: "/taklaggare-norrviken" },
      { name: "Edsviken", types: "Villor, inslag av radhus", period: "Främst 1920–30-tal (Wikipedia)", href: "/taklaggare-edsviken" },
      { name: "Töjnan", types: "Villor", period: "Mest 1920- och 1970-tal (hitta.se)", note: "Töjnan är ett namnsatt område i västra delen av kommundelen Tureberg, som gränsar till bland annat Fågelsången, Bagarby, Knista och Häggvik. Enligt hitta.se är husen främst byggda på 1920- och 1970-talen." },
      { name: "Tegelhagen", types: "Kedjehus och radhus", period: "Slutet av 1970-talet (hitta.se)", href: "/taklaggare-tegelhagen-silverdal" },
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
      { name: "Snättringe", types: "Mest villor, en del radhus", period: "Villor 1920–1930-tal, radhus tidigt 1960-tal", href: "/taklaggare-snattringe" },
      { name: "Sjödalen södra (Solgård, Sörskogen)", types: "Villor, kedjehus och radhus", period: "Sörskogen: villor och kedjehus 1960-tal, radhus 1970-tal", href: "/taklaggare-solgard-sorskogen" },
      { name: "Östra Skogås och Mörtvik", types: "Villor, radhus och kedjehus", period: "Från slutet av 1970-talet", href: "/taklaggare-skogas" },
    ],
  },
  lidingo: {
    municipality: "Lidingö",
    areas: [
      { name: "Brevik, Käppala och Gåshaga", types: "Villor, kedjehus och radhus", period: "Käppala villastad från 1910-talet, Brevik i huvudsak från 1960-talet, Gåshaga 2000–2020 (Wikipedia)", href: "/taklaggare-brevik-kappala-gashaga" },
      { name: "Sticklinge", types: "Villor", period: "Norra Sticklinge efter stadsplanen 1978, Södra Sticklinge tidigt 1990-tal (Wikipedia)", href: "/taklaggare-sticklinge" },
      { name: "Mölna", types: "Villor, radhus och kedjehus", period: "Främst 1950- och 1960-tal (Wikipedia)", href: "/taklaggare-molna" },
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
      { name: "Viksjö västra", types: "Kedjehus, radhus och villor", period: "1969 till tidigt 1980-tal (Wikipedia)", href: "/taklaggare-viksjo" },
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
      { name: "Stava, Smedby och Sjökarby", types: "Villor och radhus", period: "Mest 1950–1970-tal (hitta.se)", note: "Stava gård nämns i skrift redan på 1200-talet och ägdes under 1500-talet av Clas Eriksson Fleming, som senare blev amiral. Enligt hitta.se är villorna i Stora Stava främst byggda på 1950- och 1960-talen, och radhusen och villorna vid Smedby skolväg på 1960- och 1970-talen." },
      { name: "Skånsta", types: "Radhus, kedjehus och villor", period: "Mest 1960- och 1980-tal (hitta.se)" },
      { name: "Margretelund", types: "Kedjehus och villor", period: "Mest 1970- och 1990-tal (hitta.se)" },
      { name: "Svinninge", types: "Villor", period: "Mest 1950- och 1960-tal (hitta.se), utbyggnad 1990–1995 (Wikipedia)", note: "Svinninge ligger mellan Åkersberga och Vaxholm och växte kraftigt västerut mellan 1990 och 1995, då småorterna Svinninge och Hästängsudd blev en del av tätorten. Enligt hitta.se är villorna i Svinninge främst byggda på 1950- och 1960-talen." },
      { name: "Täljö och Runö", types: "Villor, radhus och kedjehus", period: "Täljö mest 1950- och 1960-tal (hitta.se)" },
    ],
  },
};

/** Platt text för förrenderingen (samma innehåll som React-sektionen). */
export const villaAreasParagraph = (key: string): string | null => {
  const data = villaAreasByPage[key];
  if (!data) return null;
  const rows = data.areas.map((a) =>
    a.note ? `${a.name}: ${a.note}` : `${a.name}: ${a.types.toLowerCase()}, ${a.period.charAt(0).toLowerCase()}${a.period.slice(1)}.`,
  );
  return `Villaområden i ${data.municipality}. ${rows.join(" ")} ${VILLA_AREAS_SOURCE}`;
};
