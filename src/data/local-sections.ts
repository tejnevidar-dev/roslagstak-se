import type { LocationData } from "./locations";
import { distanceFromBaseKm } from "./service-reach";

/**
 * Unikt lokalt innehåll per ort för hubbsidorna (/taklaggare-<ort>).
 *
 * Texten byggs av ortens egna data (region, ö/fastland, grannorter, koordinater)
 * kombinerat med regionspecifika fakta och en variantnyckel som räknas fram ur
 * ortens slug. Det ger olika formuleringar per ort och överlappar inte med
 * tjänstesidornas texter — här handlar det om platsen: byggnadsbestånd, framkomlighet och
 * praktiska förutsättningar. Inga påståenden om väder eller klimat (regel 5: obelagda lokala diagnoser, driftbeslut 2026-10-03).
 */

export interface LocalSectionBlock {
  heading: string;
  paragraphs: string[];
}

export interface LocalFact {
  label: string;
  value: string;
}

export interface LocalSections {
  intro: string;
  blocks: LocalSectionBlock[];
  facts: LocalFact[];
}

/** Stabil variantnyckel ur ortens slug (samma ort ⇒ alltid samma text). */
const variantOf = (slug: string, buckets: number) => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 100003;
  return h % buckets;
};

interface RegionProfile {
  /** Typiskt byggnadsbestånd. */
  buildings: string;
  /** Vanligaste takmaterialen vi möter. */
  materials: string;
  /** Framkomlighet och etablering. */
  access: string;
}

const REGION_PROFILES: Record<string, RegionProfile> = {
  "Norra skärgården": {
    buildings: "sommarstugor från 1950–70-talet, sjöbodar och några få permanentbebodda gårdar",
    materials: "ojämnt lagd korrugerad plåt, äldre pannplåt och tegel som lagts om i etapper",
    access: "material och utrustning går sjövägen, och det påverkar hur ett takbyte planeras",
  },
  "Mellersta skärgården": {
    buildings: "skärgårdsstugor med rödfärgad panel blandat med nybyggda permanenthus",
    materials: "dubbelfalsad plåt, TP20 och betongpannor på hus från 1970- och 80-talet",
    access: "färjeled och begränsad uppställningsplats gör att vi förbereder etableringen i detalj",
  },
  Kusten: {
    buildings: "villor från 1960-talet och framåt tillsammans med äldre trähus nära vattnet",
    materials: "betongpannor, tegelpannor och plåt på tillbyggnader och uthus",
    access: "god väg fram till fastigheten, vilket håller etableringstiden nere",
  },
  "Rådmansöhalvön": {
    buildings: "gårdar, ombyggda ekonomibyggnader och friliggande villor på stora tomter",
    materials: "plåt på ekonomibyggnader och tegel eller betongpannor på bostadshusen",
    access: "grusvägar och grindar kräver framkörning med mindre fordon vid leverans",
  },
  "Norra Roslagen": {
    buildings: "äldre trähus, byggnader från sekelskiftet och nyare enplansvillor",
    materials: "lertegel, pannplåt och plåttak lagda i flera generationer",
    access: "längre transportsträckor som vi samordnar med andra projekt i området",
  },
  "Roslagens inland": {
    buildings: "villaområden från 1970- och 80-talet blandat med lantbruksfastigheter",
    materials: "betongpannor, tegel och plåt på garage och förråd",
    access: "asfalterad väg fram och normalt gott om plats för container och lift",
  },
  Österåker: {
    buildings: "villor, radhus och fritidshus som byggts om till permanentboende",
    materials: "betongpannor från 70-talet, tegel och tidiga plåttak",
    access: "korta avstånd och enkel framkomlighet, ofta trånga tomtgränser",
  },
  "Stockholms stad": {
    buildings: "flerbostadshus, radhus och stadsvillor med brutna tak och många genomföringar",
    materials: "bandtäckt plåt, falsad zink och tegel på äldre fastigheter",
    access: "avspärrning, upplåtelse av gata och tidsfönster för lyft behöver bokas i förväg",
  },
  "Norra Stockholm": {
    buildings: "villor från 1930–70-talet, radhuslängor och nybyggda parhus",
    materials: "betongpannor, tegel och plåt på tillbyggda delar",
    access: "smala villagator där uppställning och lyft behöver planeras med grannarna",
  },
  "Nordvästra Stockholm": {
    buildings: "villamattor från 60- och 70-talet samt nyare grupphusbebyggelse",
    materials: "betongpannor och plåt, ofta med underdimensionerad avvattning",
    access: "bra tillfart och normalt enkel etablering på egen uppfart",
  },
  Västerort: {
    buildings: "småhusområden, radhus och egnahem från mellankrigstiden",
    materials: "tegel, betongpannor och äldre bandtäckt plåt",
    access: "trånga gaturum där material lyfts in från gatan under kort tid",
  },
  "Östra Stockholm": {
    buildings: "villor på höjdlägen, sekelskifteshus och moderna arkitektritade hus",
    materials: "falsad plåt, zink och tegel med komplicerade takfall",
    access: "branta uppfarter och nivåskillnader som kräver extra säkring vid arbetet",
  },
  "Sydöstra Stockholm": {
    buildings: "villor, kedjehus och fritidshus i sjönära lägen",
    materials: "betongpannor, plåt och papptak på låglutande delar",
    access: "smala vägar nära vattnet och begränsad plats för avfallshantering",
  },
  "Södra Stockholm": {
    buildings: "villaområden från 1940–70-talet med många tillbyggnader",
    materials: "tegel, betongpannor och plåt på uthus och garage",
    access: "kuperad terräng där lift och materialplacering planeras på plats",
  },
  "Sydvästra Stockholm": {
    buildings: "villor, radhus och nyare grupphus med enkla sadeltak",
    materials: "betongpannor och plåt, ofta med tidigare lagningar runt genomföringar",
    access: "goda tillfarter men trånga tomter mellan husen",
  },
};

REGION_PROFILES["Mälardalen"] = {
  buildings: "äldre stadskvarter, villaområden och flerbostadshus från efterkrigstiden",
  materials: "tegel, betongpannor och plåt, samt papp på flacka tak",
  access: "goda tillfarter i de flesta lägen, men trånga stadskärnor kräver planerad etablering",
};

const FALLBACK_PROFILE: RegionProfile = {
  buildings: "villor och fritidshus av blandad ålder",
  materials: "betongpannor, tegel och plåt",
  access: "normal framkomlighet med bil och släp fram till fastigheten",
};

/** Bygger de unika lokala sektionerna för en ort. */
export const buildLocalSections = (loc: LocationData): LocalSections => {
  const prep = loc.isIsland ? "på" : "i";
  const p = REGION_PROFILES[loc.region] ?? FALLBACK_PROFILE;
  const v = variantOf(loc.slug, 3);
  const neighbours = loc.nearbyLocations.slice(0, 3);
  const neighbourText =
    neighbours.length > 1
      ? `${neighbours.slice(0, -1).join(", ")} och ${neighbours[neighbours.length - 1]}`
      : neighbours[0] ?? loc.region;

  const buildingIntro = [
    `Husen vi arbetar med här är främst ${p.buildings}, och på dem möter vi oftast ${p.materials}.`,
    `Bebyggelsen ${prep} ${loc.name} består till stor del av ${p.buildings}. Takmaterialen är därför ofta ${p.materials}.`,
    `${p.buildings.charAt(0).toUpperCase() + p.buildings.slice(1)} dominerar ${prep} ${loc.name}, med ${p.materials} på taken.`,
  ][v];

  const inspectNote = loc.isIsland
    ? `Vid takkontrollen ${prep} ${loc.name} lägger vi extra vikt på beslag, infästningar och takfot.`
    : `Vid takkontrollen ${prep} ${loc.name} börjar vi i rännor, genomföringar och nordsidan — det är där skadorna brukar visa sig först.`;

  const accessPara = loc.isIsland
    ? `${p.access.charAt(0).toUpperCase() + p.access.slice(1)}. Vi bokar transport och lossningsplats innan arbetet startar, så att rivningsavfall och nytt material inte behöver ligga och vänta på tomten ${prep} ${loc.name}.`
    : `${p.access.charAt(0).toUpperCase() + p.access.slice(1)}. Vi går igenom var container, lift och materialupplägg står innan första dagen ${prep} ${loc.name}, så att du vet exakt vad som händer på tomten.`;

  const neighbourPara = `Vi tar uppdrag ${prep} ${loc.name} och i närområdet — ${neighbourText}. När flera tak ligger nära varandra kan vi samordna transporter och etablering, vilket kortar tiden på plats.`;

  return {
    intro: inspectNote,
    blocks: [
      // Hustyper, byggår och material per ort visas bara där orten har en angiven källa (sourceLink), annars döljs blocket.
      ...(loc.sourceLink
        ? [
            {
              heading: `Takens förutsättningar ${prep} ${loc.name}`,
              paragraphs: [buildingIntro, inspectNote],
            },
          ]
        : []),
      {
        heading: `Så planerar vi arbetet ${prep} ${loc.name}`,
        paragraphs: [accessPara, neighbourPara],
      },
    ],
    facts: [
      { label: "Område", value: loc.region },
      { label: "Läge", value: loc.isIsland ? "Ö i skärgården" : "Fastland" },
      { label: "Närmaste orter", value: neighbourText },
      { label: "Avstånd till vår bas i Norrtälje", value: `${Math.round(distanceFromBaseKm(loc))} km` },
      { label: "Koordinater", value: `${loc.lat.toFixed(3)}, ${loc.lng.toFixed(3)}` },
      ...(loc.sourceLink ? [{ label: "Vanliga takmaterial", value: p.materials }] : []),
    ],
  };
};
