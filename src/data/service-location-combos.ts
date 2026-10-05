import { withRotForbehall } from "./prices";
import { locations, type LocationData } from "./locations";
import { allServiceSlugs, hasServiceCombos } from "./service-slugs";
import { byDistance } from "./service-reach";
import { OAR_UTAN_BILVAG } from "./location-mall";

export interface ServiceLocationCombo {
  serviceSlug: string;
  serviceName: string;
  serviceVerb: string;
  locationSlug: string;
  locationName: string;
  isIsland: boolean;
  prep: string;
  url: string;
  title: string;
  description: string;
  content: string[];
}

/**
 * Standardtexter för tjänst × ort-sidor utan egen text (combo-overrides.ts). Regel 5 (Marknadschefen 2026-10-04): bara
 * belagt, inga livslängder i år, inga superlativ, inga processlöften och inga påståenden om vad vi kontrollerar eller
 * "alltid" gör. Priser per material finns på /priser: sidorna har en mening med länk i stället för prisrader.
 */
const PRIS_RAD = (what: string) =>
  `Riktpriser per material finns på [prissidan](/priser). ${what} Du får fast pris efter kostnadsfri takkontroll, och som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.`;

/** Öar utan bilväg (10o): ö-lydelsen i stället för texten om skärgården. */
const oarText = (loc: { slug: string }, text: string) => (OAR_UTAN_BILVAG.includes(loc.slug) ? "Har ditt hus ingen bilväg: berätta var det ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas." : text);

const serviceTypes = [
  {
    slug: "takbyte",
    name: "Takbyte",
    verb: "byta tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Planerar du ett takbyte ${prep} ${loc.name}? RoslagsTak är en takfirma med bas i Norrtälje och tar uppdrag ${prep} ${loc.name}. Vi utför kompletta takbyten med TP20 plåttak, dubbelfalsat plåttak, pannplåt, betongpannor och lertegeltak.`,
      `Ett takbyte ${prep} ${loc.name} innebär att det gamla takmaterialet rivs och att nytt takmaterial monteras. Skadad råspont syns först när det gamla taket är rivet. Då får du besked och pris innan vi går vidare. Taksäkerhet och hängrännor, om de ingår, står i offerten.`,
      loc.isIsland
        ? oarText(loc, `Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Förutsättningarna för ${loc.name} går vi igenom vid takkontrollen.`)
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi uppdrag ${prep} ${loc.name}.`,
            `Vi tar uppdrag ${prep} ${loc.name}.`,
          ),
      `Priset för ett takbyte ${prep} ${loc.name} beror på takets storlek, material och underlagets skick. ${PRIS_RAD("")}`.replace("  ", " "),
      `Kontakta oss för en kostnadsfri takkontroll för takbyte ${prep} ${loc.name}. Vi återkopplar inom 24 timmar.`,
    ],
  },
  {
    slug: "takrenovering",
    name: "Takrenovering",
    verb: "renovera tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Behöver ditt tak ${prep} ${loc.name} renoveras? RoslagsTak utför takrenoveringar ${prep} ${loc.name}, från byte av enstaka pannor och lagning av läckor till byte av underlag och underlagspapp.`,
      `En takrenovering ${prep} ${loc.name} innebär att vi åtgärdar avgränsade skador utan att byta hela taket. Det kan handla om trasiga pannor, plåtbeslag runt skorstenar, skadad råspont eller sliten underlagspapp.`,
      loc.isIsland
        ? oarText(loc, `Vi tar uppdrag för takrenoveringar på öar i skärgården, också ${prep} ${loc.name}. Förutsättningarna går vi igenom vid takkontrollen.`)
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi uppdrag för takrenovering ${prep} ${loc.name}.`,
            `Vi tar uppdrag för takrenovering ${prep} ${loc.name}.`,
          ),
      `Priset för en takrenovering ${prep} ${loc.name} varierar beroende på skadans omfattning. Du får fast pris efter kostnadsfri takkontroll. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.`,
      `Boka en kostnadsfri takkontroll ${prep} ${loc.name}. Kontakta oss så återkopplar vi inom 24 timmar.`,
    ],
  },
  {
    slug: "takomlaggning",
    name: "Takomläggning",
    verb: "lägga om tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Behöver du takomläggning ${prep} ${loc.name}? RoslagsTak lägger om tak med TP20, dubbelfalsat plåttak, pannplåt och betongpannor. Du får fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.`,
      `Takomläggning ${prep} ${loc.name} innebär att befintligt takmaterial byts ut mot nytt. Skadad råspont syns först när det gamla taket är rivet. Då får du besked och pris innan vi går vidare. Taksäkerhet och hängrännor, om de ingår, står i offerten.`,
      loc.isIsland
        ? oarText(loc, `Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Förutsättningarna för ${loc.name} går vi igenom vid takkontrollen.`)
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi uppdrag ${prep} ${loc.name}.`,
            `Vi tar uppdrag ${prep} ${loc.name}.`,
          ),
      `Kostnaden för takomläggning ${prep} ${loc.name} varierar beroende på takets storlek, lutning och materialval. ${PRIS_RAD("")}`.replace("  ", " "),
      `Boka en kostnadsfri takkontroll för takomläggning ${prep} ${loc.name}. Ring 070-154 36 39. Vi återkopplar inom 24 timmar.`,
    ],
  },
];

const taktvattService = {
  slug: "taktvatt",
  name: "Taktvätt",
  verb: "tvätta tak",
  generateContent: (loc: LocationData, prep: string) => [
    `Taktvätt är en av de tjänster vi erbjuder. Vad som behöver göras på just ditt tak ${prep} ${loc.name} går inte att säga på avstånd. Därför börjar vi med en kostnadsfri takkontroll utan förpliktelser.`,
    `En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.`,
    loc.isIsland
      ? oarText(loc, `Vi tar uppdrag i Roslagen och Storstockholm, också ${prep} ${loc.name}.`)
      : byDistance(loc, `Med vår bas i Norrtälje tar vi uppdrag ${prep} ${loc.name}.`, `Vi tar uppdrag ${prep} ${loc.name}.`),
    `Du får ett fast pris i offerten. Tillägg görs bara efter ditt godkännande.`,
    `Boka en kostnadsfri takkontroll ${prep} ${loc.name} på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.`,
  ],
};

serviceTypes.push(taktvattService);

const specialistServices = [
  {
    slug: "bandtackning",
    name: "Bandtäckning",
    verb: "bandtäcka tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Söker du bandtäckning ${prep} ${loc.name}? RoslagsTak lägger dubbelfalsat plåttak, bandtäckning. Taket täcks med plåtbanor som fogas ihop med ett dubbelt fals i stället för synliga skruvhål.`,
      `Bandtäckning ${prep} ${loc.name} är ett av de material vi lägger vid takbyte. Plåtdetaljerna runt skorsten och genomföringar anpassas efter taket.`,
      loc.isIsland
        ? oarText(loc, `Att bandtäcka ett tak ${prep} ${loc.name} kräver planering, eftersom plåtbanden är långa. Förutsättningarna går vi igenom vid takkontrollen.`)
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi uppdrag för bandtäckning ${prep} ${loc.name}.`,
            `Vi tar uppdrag för bandtäckning ${prep} ${loc.name}.`,
          ),
      `Bandtäckning ${prep} ${loc.name} är dubbelfalsat plåttak. ${PRIS_RAD("")}`.replace("  ", " "),
      `Vill du veta vad bandtäckning ${prep} ${loc.name} kostar för just ditt tak? Ring 070-154 36 39 eller boka en kostnadsfri takkontroll. Vi återkopplar inom 24 timmar.`,
    ],
  },
  {
    slug: "platttak",
    name: "Plåttak",
    verb: "lägga plåttak",
    generateContent: (loc: LocationData, prep: string) => [
      `Plåttak ${prep} ${loc.name}: RoslagsTak lägger TP20 trapetsprofil, pannplåt och dubbelfalsat plåttak på villor och fritidshus.`,
      `Vid ett takbyte med plåttak ${prep} ${loc.name} görs nockbeslag, vindskiveplåt och fotplåt om. Skadad råspont syns först när det gamla taket är rivet. Då får du besked och pris innan vi går vidare.`,
      loc.isIsland
        ? oarText(loc, `Plåttak är ett lätt material. Vilket material som passar ${prep} ${loc.name} går vi igenom vid takkontrollen.`)
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi uppdrag för plåttak ${prep} ${loc.name}.`,
            `Vi tar uppdrag för plåttak ${prep} ${loc.name}.`,
          ),
      `Ett plåttak ${prep} ${loc.name} kan vara TP20, pannplåt eller dubbelfalsat. ${PRIS_RAD("")}`.replace("  ", " "),
      `Boka kostnadsfri takkontroll för plåttak ${prep} ${loc.name}. Ring 070-154 36 39.`,
    ],
  },
  {
    slug: "betongpannor",
    name: "Betongpannor",
    verb: "lägga betongpannor",
    generateContent: (loc: LocationData, prep: string) => [
      `Ska du byta till eller lägga om betongpannor ${prep} ${loc.name}? RoslagsTak lägger betongpannetak ${prep} ${loc.name}, vid komplett takbyte. Om de gamla pannorna kan läggas tillbaka beror på hur de mår och bedöms vid takkontrollen.`,
      `Betongpannor ${prep} ${loc.name} är tunga. Vad takstolarna klarar kan behöva bedömas av en konstruktör om huset har haft ett lättare tak.`,
      loc.isIsland
        ? oarText(loc, `Betongpannor är tunga, och på en ö påverkar det planeringen av arbetet ${prep} ${loc.name}. Förutsättningarna går vi igenom vid takkontrollen.`)
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi uppdrag ${prep} ${loc.name} och lägger om eller lagar tak med betongpannor.`,
            `Vi tar uppdrag ${prep} ${loc.name} och lägger om eller lagar tak med betongpannor.`,
          ),
      `Ett tak med betongpannor ${prep} ${loc.name}, vid nyläggning eller omläggning av befintliga pannor med ny papp och läkt. ${PRIS_RAD("")}`.replace("  ", " "),
      `Osäker på om ditt betongpannetak ${prep} ${loc.name} ska renoveras eller bytas? Boka en kostnadsfri takkontroll. Ring 070-154 36 39.`,
    ],
  },
  {
    slug: "tegeltak",
    name: "Tegeltak",
    verb: "lägga tegeltak",
    generateContent: (loc: LocationData, prep: string) => [
      `Tegeltak ${prep} ${loc.name}: RoslagsTak lägger både lertegel och pannplåt ${prep} ${loc.name}. Vilket som passar ditt tak går vi igenom vid takkontrollen.`,
      `Vid ett tegeltak ${prep} ${loc.name} rivs det gamla taket, underlag och läkt görs om och nytt tegel läggs. Lertegel är tungt. Vad takstolarna klarar kan behöva bedömas av en konstruktör om huset har haft ett lättare tak.`,
      loc.isIsland
        ? oarText(loc, `På ${loc.name} lägger vi lertegel och pannplåt, och vilket som passar ditt tak går vi igenom vid takkontrollen.`)
        : `Vi lägger tegeltak ${prep} ${loc.name}, både i lertegel och pannplåt.`,
      `Tegeltak ${prep} ${loc.name} i lertegel eller pannplåt. ${PRIS_RAD("")}`.replace("  ", " "),
      `Boka kostnadsfri takkontroll för tegeltak ${prep} ${loc.name}. Ring 070-154 36 39.`,
    ],
  },
  {
    slug: "takmalning",
    name: "Takmålning",
    verb: "måla tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Takmålning är en av de tjänster vi erbjuder. Vad som behöver göras på just ditt tak ${prep} ${loc.name} går inte att säga på avstånd. Därför börjar vi med en kostnadsfri takkontroll utan förpliktelser.`,
      `En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.`,
      loc.isIsland
        ? oarText(loc, `Vi tar uppdrag i Roslagen och Storstockholm, också ${prep} ${loc.name}.`)
        : byDistance(loc, `Med vår bas i Norrtälje tar vi uppdrag ${prep} ${loc.name}.`, `Vi tar uppdrag ${prep} ${loc.name}.`),
      `Du får ett fast pris i offerten. Tillägg görs bara efter ditt godkännande.`,
      `Boka en kostnadsfri takkontroll ${prep} ${loc.name} på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.`,
    ],
  },
];

serviceTypes.push(...specialistServices);

export const generateCombos = (): ServiceLocationCombo[] => {
  const combos: ServiceLocationCombo[] = [];
  for (const service of serviceTypes) {
    for (const loc of locations.filter((l) => hasServiceCombos(l.region))) {
      const prep = loc.isIsland ? "på" : "i";
      combos.push({
        serviceSlug: service.slug,
        serviceName: service.name,
        serviceVerb: service.verb,
        locationSlug: loc.slug,
        locationName: loc.name,
        isIsland: loc.isIsland,
        prep,
        url: `/${service.slug}-${loc.slug}`,
        title: `${service.name} ${prep} ${loc.name} — Takläggare RoslagsTak`,
        description: comboDefaultMeta({ serviceName: service.name, prep, locationName: loc.name, locationSlug: loc.slug, serviceSlug: service.slug }),
        content: service.generateContent(loc, prep).map(withRotForbehall),
      });
    }
  }
  return combos;
};

/** Tjänster som är ett material: titel, H1 och H2 får inte ha "pris" eller "kostnad" (prissökord per material ägs av /priser). */
export const MATERIAL_COMBO_SLUGS: readonly string[] = ["tegeltak", "betongpannor", "platttak", "bandtackning"];

/**
 * Standardtitel och H1 för en tjänst × ort-sida utan egen text (Marknadschefen, backlog 1ci del 2): samma form för alla
 * tjänster. Går titeln över 60 tecken står "10 års garanti" i stället för "10 års utförandegaranti".
 */
export const comboDefaultTitle = (c: { serviceSlug: string; serviceName: string; prep: string; locationName: string }) => {
  const bas = `${c.serviceName} ${c.prep} ${c.locationName}`;
  // Taktvätt och takmålning: ingen garanti i titeln (Marknadschefen, backlog 1ct)
  if (c.serviceSlug === "taktvatt" || c.serviceSlug === "takmalning") {
    const lang = `${bas} – kostnadsfri takkontroll`;
    if (lang.length <= 60) return lang;
    const kort = `${bas} – takkontroll`;
    return kort.length <= 60 ? kort : bas;
  }
  const lang = `${bas} — 10 års utförandegaranti`;
  if (lang.length <= 60) return lang;
  const kort = `${bas} — 10 års garanti`;
  return kort.length <= 60 ? kort : bas;
};
export const comboDefaultH1 = (c: { serviceSlug: string; serviceName: string; prep: string; locationName: string }) =>
  c.serviceSlug === "taktvatt" || c.serviceSlug === "takmalning" ? `${c.serviceName} ${c.prep} ${c.locationName}` : comboDefaultTitle(c);

/** Standardmeta för en tjänst × ort-sida utan egen text. Öar utan bilväg (OAR_UTAN_BILVAG, inte isIsland) lovar ingen kostnadsfri takkontroll (10o). */
export const comboDefaultMeta = (c: { serviceName: string; prep: string; locationName: string; locationSlug: string; serviceSlug?: string }): string => {
  if (c.serviceSlug === "taktvatt" || c.serviceSlug === "takmalning") {
    const oar = OAR_UTAN_BILVAG.includes(c.locationSlug);
    return oar
      ? `${c.serviceName} ${c.prep} ${c.locationName}. Takfirma med bas i Norrtälje. Fast pris i offerten. Berätta var huset ligger när du hör av dig.`
      : `${c.serviceName} ${c.prep} ${c.locationName}: vi börjar med en kostnadsfri takkontroll utan förpliktelser. Fast pris i offerten. Takfirma med bas i Norrtälje.`;
  }
  const bas = `${c.serviceName} ${c.prep} ${c.locationName}. Takfirma med bas i Norrtälje.`;
  const varianter = OAR_UTAN_BILVAG.includes(c.locationSlug)
    ? [
        `${bas} Fast pris i offerten och 10 års utförandegaranti. Berätta var huset ligger när du hör av dig.`,
        `${bas} Fast pris i offerten och 10 års utförandegaranti.`,
      ]
    : [
        `${bas} Kostnadsfri takkontroll utan förpliktelser, fast pris i offerten och 10 års utförandegaranti.`,
        `${bas} Kostnadsfri takkontroll, fast pris i offerten och 10 års utförandegaranti.`,
        `${bas} Fast pris i offerten och 10 års utförandegaranti.`,
      ];
  return varianter.find((v) => v.length <= 160) ?? varianter[varianter.length - 1];
};

/**
 * Material × ort-sidorna är noindex, så sökord som "tegeltak täby" ägs av materialets egen sida (Marknadschefen, backlog 1cd).
 * Ortssidor och syskonlänkar pekar därför på materialsidan i stället för på material × ort-sidan.
 */
export const MATERIAL_OWN_PAGE: Record<string, { to: string; label: string }> = {
  tegeltak: { to: "/tjanster/tegeltak", label: "Tegeltak" },
  betongpannor: { to: "/material/betongpannor", label: "Betongpannor" },
  platttak: { to: "/material/tp20-plattak", label: "Plåttak (TP20)" },
  bandtackning: { to: "/tjanster/platarbeten", label: "Bandtäckning och plåtarbeten" },
};

/**
 * Länktext som avviker från "<tjänst> i <ort>" (backlog #1bz punkt 1): /takbyte-norrtalje ska ta emot
 * "byta tak norrtälje", så Norrtälje-sidorna länkar dit med den lydelsen. EN regel för React och statisk HTML.
 */
export const COMBO_LINK_LABEL: Record<string, string> = {
  "/takbyte-norrtalje": "Byta tak i Norrtälje",
};

/** Länkmålet för en tjänst × ort-sida i listor på andra sidor: materialets egen sida för material, annars sidan själv. */
export const comboListLink = (c: { serviceSlug: string; url: string; serviceName: string; prep: string; locationName: string }): { href: string; label: string } =>
  MATERIAL_OWN_PAGE[c.serviceSlug]
    ? { href: MATERIAL_OWN_PAGE[c.serviceSlug].to, label: MATERIAL_OWN_PAGE[c.serviceSlug].label }
    : { href: c.url, label: COMBO_LINK_LABEL[c.url] ?? `${c.serviceName} ${c.prep} ${c.locationName}` };

/** Tjänstesidan som en tjänst × ort-sida länkar upp till. "takbyte" ägs av /tjanster/takomlaggning. */
export const COMBO_SERVICE_PAGE: Record<string, { to: string; label: string }> = {
  takbyte: { to: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
  takomlaggning: { to: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" },
  takrenovering: { to: "/tjanster/takrenovering", label: "Takrenovering" },
  tegeltak: { to: "/tjanster/tegeltak", label: "Tegeltak" },
};

export const getCombo = (serviceSlug: string, locationSlug: string) =>
  generateCombos().find((c) => c.serviceSlug === serviceSlug && c.locationSlug === locationSlug);

export { allServiceSlugs };

/** Skyddsnät: den statiska sluglistan måste matcha serviceTypes. */
export const serviceSlugsFromTypes = serviceTypes.map((s) => s.slug);
