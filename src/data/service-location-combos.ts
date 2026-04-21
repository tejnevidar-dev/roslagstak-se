import { locations, type LocationData } from "./locations";

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

const serviceTypes = [
  {
    slug: "takbyte",
    name: "Takbyte",
    verb: "byta tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Planerar du ett takbyte ${prep} ${loc.name}? RoslagsTak är din lokala takläggare med över 70 års samlad erfarenhet av takbyten i Roslagen. Vi utför kompletta takbyten med alla typer av material — TP20 plåttak, dubbelfalsat plåttak, tegelplåt, pannplåt, betongpannor och lertegeltak.`,
      `Ett takbyte ${prep} ${loc.name} innebär att vi river det gamla takmaterialet, inspekterar och vid behov byter råspont och underlagspapp, och sedan monterar nytt takmaterial. Vi installerar alltid ny taksäkerhet (takstege, gångbrygga, snörasskydd) och ser till att takavvattningen fungerar optimalt.`,
      loc.isIsland
        ? `${loc.name} nås ${loc.region === "Norra skärgården" ? "med båt" : "via väg eller färja"}, och vi har lång erfarenhet av att hantera materialtransport och logistik till ön. Vi planerar varje takbyte noggrant för att minimera kostnader och störningar.`
        : `Med vår bas i Norrtälje når vi ${loc.name} snabbt och effektivt. Vi erbjuder konkurrenskraftiga priser och snabb leverans på alla takbyten i området.`,
      `Priset för ett takbyte ${prep} ${loc.name} beror på takets storlek, material och underlagets skick. Som riktpris ligger ett takbyte med TP20-plåt från ca 1 200 kr/m² och dubbelfalsat plåttak från ca 2 000 kr/m². ROT-avdrag ger dig 30% rabatt på arbetskostnaden.`,
      `Kontakta oss för en kostnadsfri besiktning och offert för takbyte ${prep} ${loc.name}. Vi återkopplar inom 24 timmar.`,
    ],
  },
  {
    slug: "takrenovering",
    name: "Takrenovering",
    verb: "renovera tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Behöver ditt tak ${prep} ${loc.name} renoveras? RoslagsTak utför takrenoveringar i hela Roslagen — från byte av enstaka pannor och lagning av läckor till omfattande renovering med nytt underlag och ny underlagspapp.`,
      `En takrenovering ${prep} ${loc.name} är ofta ett billigare alternativ till komplett takbyte. Vi åtgärdar de problem som finns utan att byta hela taket. Det kan handla om att byta trasiga pannor, reparera plåtbeslag runt skorstenar, laga fuktskador i råsponten eller byta sliten underlagspapp.`,
      loc.isIsland
        ? `Vi har erfarenhet av takrenoveringar på öar i Roslagens skärgård och hanterar all logistik — inklusive materialtransport till ${loc.name}.`
        : `Vi utför regelbundet takrenoveringar ${prep} ${loc.name} och kan ofta påbörja arbetet inom 2–4 veckor.`,
      `Priset för en takrenovering ${prep} ${loc.name} varierar beroende på skadans omfattning — från ca 300 kr/m² för enklare åtgärder. Vi ger alltid fast pris efter besiktning. ROT-avdrag tillkommer.`,
      `Boka en kostnadsfri takinspektion ${prep} ${loc.name}. Vi bedömer takets skick och ger dig en ärlig rekommendation — renovering eller takbyte. Kontakta oss så återkopplar vi inom 24 timmar.`,
    ],
  },
  {
    slug: "takomlaggning",
    name: "Takomläggning",
    verb: "lägga om tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Behöver du takomläggning ${prep} ${loc.name}? RoslagsTak utför professionell takomläggning i hela Roslagen — vi lägger om tak med TP20, dubbelfalsat plåttak, tegelplåt, pannplåt och betongpannor. Med över 70 års samlad erfarenhet är vi det självklara valet för fastighetsägare ${prep} ${loc.name}.`,
      `Takomläggning ${prep} ${loc.name} innebär att befintligt takmaterial byts ut mot nytt. Vi inspekterar underlaget, byter råspont och underlagspapp vid behov, och monterar det nya takmaterialet. Vi ser alltid till att taksäkerhet, ventilation och takavvattning uppfyller gällande krav.`,
      loc.isIsland
        ? `Som specialister på takarbeten i skärgården hanterar vi all materialtransport till ${loc.name}. Vi samordnar logistik och planerar projektet noggrant — du behöver inte arrangera något själv.`
        : `Vår bas i Norrtälje gör att vi når ${loc.name} snabbt. Vi samordnar ofta flera projekt i området, vilket ger dig ett konkurrenskraftigt pris på din takomläggning.`,
      `Kostnaden för takomläggning ${prep} ${loc.name} varierar beroende på takets storlek, lutning och materialval. TP20-plåttak från ca 1 200 kr/m², dubbelfalsat från ca 2 000 kr/m². Med ROT-avdrag får du 30% rabatt på arbetskostnaden (upp till 50 000 kr/person/år).`,
      `Vi erbjuder kostnadsfri besiktning och offert för takomläggning ${prep} ${loc.name}. Ring 070-154 36 39 eller fyll i vårt offertformulär — vi återkopplar inom 24 timmar.`,
    ],
  },
];

const taktvattService = {
  slug: "taktvatt",
  name: "Taktvätt",
  verb: "tvätta tak",
  generateContent: (loc: LocationData, prep: string) => [
    `Behöver du taktvätt ${prep} ${loc.name}? RoslagsTak utför professionell taktvätt i hela Roslagen och skärgården. Vi tar bort mossa, alger, lavar och smuts från ditt tak med skonsamma metoder som inte skadar takmaterialet — oavsett om du har betongpannor, tegelpannor, eternit eller plåttak. En regelbunden taktvätt ${prep} ${loc.name} förlänger takets livslängd med upp till 10–15 år och sparar dig tiotusentals kronor i framtida takbyten.`,
    `Mossa och alger trivs särskilt bra ${prep} ${loc.name} på grund av närheten till hav, sjöar och skog som ger fuktig luft. När mossan växer på taket håller den kvar fukten mot takmaterialet, vilket leder till frostsprängning på betong- och tegelpannor samt rost på plåttak. Vår taktvätt ${prep} ${loc.name} börjar med en grundlig rengöring där vi använder lågtryckstvätt eller manuell borstning beroende på takmaterial. Därefter behandlar vi taket med ett miljögodkänt biocidmedel som dödar mossa, alger och lavar i rotsystemet.`,
    loc.isIsland
      ? `Vi har stor erfarenhet av taktvätt på öar i Roslagens skärgård. Vi samordnar transport av utrustning, vatten och kemikalier till ${loc.name} och planerar arbetet noggrant så att det går smidigt — även om ön saknar broförbindelse. Många hus ${prep} ${loc.name} har problem med kraftig mossbildning på grund av det fuktiga skärgårdsklimatet, och regelbunden taktvätt är ofta avgörande för att undvika dyra takbyten.`
      : `Med vår bas i Norrtälje når vi ${loc.name} snabbt och kan ofta utföra taktvätt inom 1–2 veckor. Vi har lång erfarenhet av de specifika problem som drabbar tak ${prep} ${loc.name} — främst mossa på norrsidor och alger nära träd och vegetation.`,
    `Priset för taktvätt ${prep} ${loc.name} ligger normalt mellan 80–150 kr/m² beroende på takets storlek, lutning, material och nedsmutsningsgrad. För ett villatak på 150 m² hamnar totalpriset oftast mellan 12 000 och 22 000 kr inkl. behandling med biocid. Med ROT-avdrag får du 30% rabatt på arbetskostnaden direkt på fakturan. Vi lämnar alltid fast pris efter kostnadsfri besiktning — inga dolda kostnader.`,
    `Förutom taktvätt erbjuder vi även takmålning ${prep} ${loc.name}. När taket är rent och torrt målar vi med specialfärg för tak (akrylat eller silikonbaserad) som ger UV-skydd, fuktskydd och ett fräscht utseende i 10–15 år. Takmålning kostar från ca 150 kr/m² inklusive grundning och två strykningar. Vi erbjuder takmålning i alla standardfärger — tegelröd, svart, mörkgrå, brun eller efter eget val.`,
    `Bäst tid för taktvätt ${prep} ${loc.name} är från april till oktober när det är torrt och plusgrader. Vi rekommenderar taktvätt vart 5:e till 10:e år beroende på takets exponering. Boka en kostnadsfri besiktning så bedömer vi takets skick och ger dig en ärlig rekommendation. Ring 070-154 36 39 eller fyll i offertformuläret — vi återkopplar inom 24 timmar.`,
  ],
};

serviceTypes.push(taktvattService);

export const generateCombos = (): ServiceLocationCombo[] => {
  const combos: ServiceLocationCombo[] = [];
  for (const service of serviceTypes) {
    for (const loc of locations) {
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
        description: `${service.name} ${prep} ${loc.name}. Professionell takläggare i Roslagen. Fast pris, 10 års garanti och kostnadsfri offert. ROT-avdrag.`,
        content: service.generateContent(loc, prep),
      });
    }
  }
  return combos;
};

export const getCombo = (serviceSlug: string, locationSlug: string) =>
  generateCombos().find((c) => c.serviceSlug === serviceSlug && c.locationSlug === locationSlug);

export const allServiceSlugs = serviceTypes.map((s) => s.slug);
