import { withRotForbehall } from "./prices";
import { locations, type LocationData } from "./locations";
import { allServiceSlugs, hasServiceCombos } from "./service-slugs";
import { byDistance } from "./service-reach";

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
      `Planerar du ett takbyte ${prep} ${loc.name}? RoslagsTak är din takläggare för takbyte ${prep} ${loc.name}. Vi utför kompletta takbyten med alla typer av material — TP20 plåttak, dubbelfalsat plåttak, tegelplåt, pannplåt, betongpannor och lertegeltak.`,
      `Ett takbyte ${prep} ${loc.name} innebär att vi river det gamla takmaterialet, inspekterar och vid behov byter råspont och underlagspapp, och sedan monterar nytt takmaterial. Vi installerar alltid ny taksäkerhet (takstege, gångbrygga, snörasskydd) och ser till att takavvattningen fungerar optimalt.`,
      loc.isIsland
        ? `Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Förutsättningarna för ${loc.name} går vi igenom vid takkontrollen.`
        : byDistance(
            loc,
            `Med vår bas i Norrtälje når vi ${loc.name} snabbt, och vi planerar resor, etablering och materialleverans i förväg, så att offerten blir tydlig.`,
            `Vi tar uppdrag ${prep} ${loc.name} och planerar resor, etablering och materialleverans i förväg, så att offerten blir tydlig.`,
          ),
      `Priset för ett takbyte ${prep} ${loc.name} beror på takets storlek, material och underlagets skick. Som riktpris, efter ROT-avdrag och inkl. moms: TP20-plåt från 1 200 kr/m², dubbelfalsat plåttak ca 2 000 kr/m². Vi lämnar alltid fast pris efter kostnadsfri takkontroll. ROT-avdrag på 30 % av arbetskostnaden.`,
      `Kontakta oss för en kostnadsfri takkontroll och offert för takbyte ${prep} ${loc.name}. Vi återkopplar inom 24 timmar.`,
    ],
  },
  {
    slug: "takrenovering",
    name: "Takrenovering",
    verb: "renovera tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Behöver ditt tak ${prep} ${loc.name} renoveras? RoslagsTak utför takrenoveringar ${prep} ${loc.name} — från byte av enstaka pannor och lagning av läckor till omfattande renovering med nytt underlag och ny underlagspapp.`,
      `En takrenovering ${prep} ${loc.name} är ofta ett billigare alternativ till komplett takbyte. Vi åtgärdar de problem som finns utan att byta hela taket. Det kan handla om att byta trasiga pannor, reparera plåtbeslag runt skorstenar, laga fuktskador i råsponten eller byta sliten underlagspapp.`,
      loc.isIsland
        ? `Vi tar uppdrag för takrenoveringar på öar i skärgården, också ${prep} ${loc.name}. Förutsättningarna går vi igenom vid takkontrollen.`
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi uppdrag för takrenovering ${prep} ${loc.name} och bokar in takkontroll och start efter överenskommelse.`,
            `Vi tar uppdrag för takrenovering ${prep} ${loc.name} och bokar in takkontroll och start efter överenskommelse.`,
          ),
      `Priset för en takrenovering ${prep} ${loc.name} varierar beroende på skadans omfattning. Vi ger alltid fast pris efter kostnadsfri takkontroll. ROT-avdrag tillkommer.`,
      `Boka en kostnadsfri takkontroll ${prep} ${loc.name}. Vi bedömer takets skick och ger dig en ärlig rekommendation — renovering eller takbyte. Kontakta oss så återkopplar vi inom 24 timmar.`,
    ],
  },
  {
    slug: "takomlaggning",
    name: "Takomläggning",
    verb: "lägga om tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Behöver du takomläggning ${prep} ${loc.name}? RoslagsTak utför professionell takomläggning ${prep} ${loc.name} — vi lägger om tak med TP20, dubbelfalsat plåttak, tegelplåt, pannplåt och betongpannor. Vi ger fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti till fastighetsägare ${prep} ${loc.name}.`,
      `Takomläggning ${prep} ${loc.name} innebär att befintligt takmaterial byts ut mot nytt. Vi inspekterar underlaget, byter råspont och underlagspapp vid behov, och monterar det nya takmaterialet. Vi ser alltid till att taksäkerhet, ventilation och takavvattning uppfyller gällande krav.`,
      loc.isIsland
        ? `Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Förutsättningarna för ${loc.name} går vi igenom vid takkontrollen.`
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi uppdrag ${prep} ${loc.name} och samordnar gärna flera tak i samma område, vilket kan ge ett konkurrenskraftigt pris på din takomläggning.`,
            `Vi tar uppdrag ${prep} ${loc.name} och samordnar gärna flera tak i samma område, vilket kan ge ett konkurrenskraftigt pris på din takomläggning.`,
          ),
      `Kostnaden för takomläggning ${prep} ${loc.name} varierar beroende på takets storlek, lutning och materialval. Som riktpris, efter ROT-avdrag och inkl. moms: TP20-plåttak från 1 200 kr/m², dubbelfalsat ca 2 000 kr/m². Vi lämnar alltid fast pris efter kostnadsfri takkontroll. Med ROT-avdrag på 30 % av arbetskostnaden (upp till 50 000 kr/person/år).`,
      `Takkontroll och offert för takomläggning är kostnadsfria ${prep} ${loc.name}. Ring 070-154 36 39 eller fyll i vårt offertformulär — vi återkopplar inom 24 timmar.`,
    ],
  },
];

const taktvattService = {
  slug: "taktvatt",
  name: "Taktvätt",
  verb: "tvätta tak",
  generateContent: (loc: LocationData, prep: string) => [
    `Behöver du taktvätt ${prep} ${loc.name}? RoslagsTak utför professionell taktvätt ${prep} ${loc.name}. Vi tar bort mossa, alger, lavar och smuts från ditt tak med skonsamma metoder som inte skadar takmaterialet — oavsett om du har betongpannor, tegelpannor, eternit eller plåttak. En regelbunden taktvätt ${prep} ${loc.name} förlänger takets livslängd med upp till 10–15 år och sparar dig tiotusentals kronor i framtida takbyten.`,
    `Mossa och alger trivs särskilt bra ${prep} ${loc.name} på grund av närheten till hav, sjöar och skog som ger fuktig luft. När mossan växer på taket håller den kvar fukten mot takmaterialet, vilket leder till frostsprängning på betong- och tegelpannor samt rost på plåttak. Vår taktvätt ${prep} ${loc.name} börjar med en grundlig rengöring där vi använder lågtryckstvätt eller manuell borstning beroende på takmaterial. Därefter behandlar vi taket med ett miljögodkänt biocidmedel som dödar mossa, alger och lavar i rotsystemet.`,
    loc.isIsland
      ? `Vi utför taktvätt på öar i skärgården, också ${prep} ${loc.name}. Takets skick går vi igenom vid den kostnadsfria takkontrollen.`
      : byDistance(
          loc,
          `Med vår bas i Norrtälje tar vi uppdrag för taktvätt ${prep} ${loc.name} och bokar in arbetet efter överenskommelse. De vanligaste problemen på tak ${prep} ${loc.name} är mossa på norrsidor och alger nära träd och vegetation.`,
          `Vi tar uppdrag för taktvätt ${prep} ${loc.name} och bokar in arbetet efter överenskommelse. De vanligaste problemen på tak ${prep} ${loc.name} är mossa på norrsidor och alger nära träd och vegetation.`,
        ),
    `Priset för taktvätt ${prep} ${loc.name} beror på takets storlek, lutning, material och nedsmutsningsgrad, inkl. behandling med biocid. Med ROT-avdrag på 30 % av arbetskostnaden direkt på fakturan. Vi lämnar alltid fast pris efter kostnadsfri takkontroll — inga dolda kostnader.`,
    `Förutom taktvätt utför vi även takmålning ${prep} ${loc.name}. När taket är rent och torrt målar vi med specialfärg för tak (akrylat eller silikonbaserad) som ger UV-skydd, fuktskydd och ett fräscht utseende i 10–15 år. Takmålning inkluderar grundning och två strykningar, fast pris efter takkontroll. Vi målar i alla standardfärger — tegelröd, svart, mörkgrå, brun eller efter eget val.`,
    `Bäst tid för taktvätt ${prep} ${loc.name} är från april till oktober när det är torrt och plusgrader. Vi rekommenderar taktvätt vart 5:e till 10:e år beroende på takets exponering. Boka en kostnadsfri takkontroll så bedömer vi takets skick och ger dig en ärlig rekommendation. Ring 070-154 36 39 eller fyll i offertformuläret — vi återkopplar inom 24 timmar.`,
  ],
};

serviceTypes.push(taktvattService);

const specialistServices = [
  {
    slug: "bandtackning",
    name: "Bandtäckning",
    verb: "bandtäcka tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Söker du bandtäckning ${prep} ${loc.name}? RoslagsTak utför dubbelfalsad bandtäckning — den mest hållbara takläggningen som finns för kustnära hus. Vi täcker taket med långa plåtband som falsas ihop två gånger, vilket ger en helt tät yta utan genomgående skruvhål. Resultatet är ett tak som klarar 60–80 år ${prep} ${loc.name}.`,
      `Bandtäckning ${prep} ${loc.name} passar särskilt bra på tak med låg lutning, valmade tak, torn och tak med många vinklar. Vi arbetar med förzinkad stålplåt, färgbelagd plåt samt koppar och zink när kunden vill ha ett exklusivt uttryck. Falsarna görs på plats med falsmaskin, och alla beslag kring skorsten, takfönster och ventilation plåtslås för hand.`,
      loc.isIsland
        ? `Att bandtäcka ett tak ${prep} ${loc.name} kräver planering, eftersom plåtbanden är långa. Förutsättningarna går vi igenom vid takkontrollen.`
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi med plåtband och falsutrustning till ${loc.name} och planerar transport och etablering i förväg, så att kostnaden för din bandtäckning blir tydlig i offerten.`,
            `Vi tar med plåtband och falsutrustning till ${loc.name} och planerar transport och etablering i förväg, så att kostnaden för din bandtäckning blir tydlig i offerten.`,
          ),
      `Bandtäckning ${prep} ${loc.name} i förzinkad eller färgbelagd plåt, koppar eller zink. Som riktpris, efter ROT-avdrag och inkl. moms, ligger dubbelfalsat/bandtäckt plåt på ca 2 000 kr/m², beroende på materialval och takets komplexitet — antal vinklar, kupor och genomföringar. Vi lämnar alltid fast pris efter kostnadsfri takkontroll. ROT-avdrag på 30 % av arbetskostnaden.`,
      `Vill du veta vad bandtäckning ${prep} ${loc.name} skulle kosta för just ditt tak? Ring 070-154 36 39 eller boka en kostnadsfri takkontroll — vi kommer ut, mäter och lämnar fast pris inom 24 timmar.`,
    ],
  },
  {
    slug: "platttak",
    name: "Plåttak",
    verb: "lägga plåttak",
    generateContent: (loc: LocationData, prep: string) => [
      `Plåttak ${prep} ${loc.name} är ett vanligt och prisvärt val för både villor och flerbostadshus. RoslagsTak monterar alla typer av plåttak: TP20 trapetsprofil, pannplåt, tegelprofilerad plåt och dubbelfalsat plåttak. Plåt är lätt, tåligt mot salt och vind och kräver minimalt underhåll — perfekt för hus ${prep} ${loc.name}.`,
      `Vid montering av plåttak ${prep} ${loc.name} kontrollerar vi alltid råspont, underlagspapp och läkt innan den nya plåten läggs. Vi använder färgbelagd stålplåt med hög korrosionsklass, monterar nya nockbeslag, vindskivebeslag och fotplåtar samt kompletterar med taksäkerhet enligt gällande krav.`,
      loc.isIsland
        ? `Plåttak är ett lätt material. Vilket material som passar ${prep} ${loc.name} går vi igenom vid takkontrollen.`
        : byDistance(
            loc,
            `Med vår bas i Norrtälje lägger vi plåttak ${prep} ${loc.name} och bokar in start efter takkontroll och överenskommelse.`,
            `Vi lägger plåttak ${prep} ${loc.name} och bokar in start efter takkontroll och överenskommelse.`,
          ),
      `Ett plåttak ${prep} ${loc.name} — TP20, tegelprofilerad plåt eller dubbelfalsat. Som riktpris, efter ROT-avdrag och inkl. moms: TP20 från 1 200 kr/m², tegelprofilerad plåt från 1 300 kr/m², dubbelfalsat ca 2 000 kr/m². Fast pris efter kostnadsfri takkontroll, som inkluderar montage, beslag och bortforsling av gammalt material. ROT-avdrag tillkommer.`,
      `Boka kostnadsfri takkontroll för plåttak ${prep} ${loc.name} — vi hjälper dig välja profil, kulör och rätt korrosionsklass för läget. Ring 070-154 36 39.`,
    ],
  },
  {
    slug: "betongpannor",
    name: "Betongpannor",
    verb: "lägga betongpannor",
    generateContent: (loc: LocationData, prep: string) => [
      `Ska du byta till eller lägga om betongpannor ${prep} ${loc.name}? RoslagsTak lägger betongpannetak ${prep} ${loc.name} — både vid komplett takbyte och vid omläggning där befintliga pannor läggs tillbaka på ny underlagspapp och ny läkt.`,
      `Betongpannor ${prep} ${loc.name} kan bli känsliga när mossa och alger håller kvar fukt i ytan, vilket leder till frostsprängning. Vi byter alltid trasiga pannor, ser över nock- och valmpannor, kontrollerar att underlagspappen är hel och att ventilationen under pannorna fungerar.`,
      loc.isIsland
        ? `Betongpannor är tunga, och på en ö påverkar det planeringen av arbetet ${prep} ${loc.name}. Vid takkontrollen bedömer vi också om takstolarna klarar lasten.`
        : byDistance(
            loc,
            `Med vår bas i Norrtälje tar vi uppdrag ${prep} ${loc.name} och lägger om eller lagar tak med betongpannor.`,
            `Vi tar uppdrag ${prep} ${loc.name} och lägger om eller lagar tak med betongpannor.`,
          ),
      `Ett tak med betongpannor ${prep} ${loc.name}, vid nyläggning eller omläggning av befintliga pannor med ny papp och läkt. Som riktpris ligger betongpannor från 1 200 kr/m², efter ROT-avdrag och inkl. moms. Vi lämnar fast pris efter kostnadsfri takkontroll. ROT-avdrag ger 30% på arbetskostnaden.`,
      `Osäker på om ditt betongpannetak ${prep} ${loc.name} ska renoveras eller bytas? Boka en kostnadsfri takkontroll — vi ger en ärlig rekommendation. Ring 070-154 36 39.`,
    ],
  },
  {
    slug: "tegeltak",
    name: "Tegeltak",
    verb: "lägga tegeltak",
    generateContent: (loc: LocationData, prep: string) => [
      `Tegeltak ${prep} ${loc.name} ger den klassiska röda skärgårdskaraktären. RoslagsTak lägger både lertegel och tegelprofilerad plåt ${prep} ${loc.name} — och hjälper dig välja utifrån husets stil, takets lutning och budget.`,
      `Vid arbete med tegeltak ${prep} ${loc.name} river vi gammalt tegel varsamt, byter underlagspapp och läkt, och lägger sedan nytt eller återanvänt tegel med korrekt överlapp. Vi plåtslår runt skorsten och genomföringar och ser till att luftspalten under teglet är fri så taket kan torka.`,
      loc.isIsland
        ? `På ${loc.name} rekommenderar vi ofta tegelprofilerad plåt istället för lertegel — samma utseende men en bråkdel av vikten, vilket sänker transportkostnaden och belastningen på takstolarna.`
        : `Vi lägger tegeltak ${prep} ${loc.name}, både i lertegel och tegelprofilerad plåt.`,
      `Tegeltak ${prep} ${loc.name} i lertegel eller tegelprofilerad plåt, inklusive montage och beslag. Som riktpris, efter ROT-avdrag och inkl. moms: lertegel från 1 300 kr/m², tegelprofilerad plåt från 1 300 kr/m². Fast pris efter kostnadsfri takkontroll. ROT-avdrag på 30 % av arbetskostnaden.`,
      `Boka kostnadsfri takkontroll för tegeltak ${prep} ${loc.name} — vi mäter och lämnar fast pris inom 24 timmar. Ring 070-154 36 39.`,
    ],
  },
  {
    slug: "takmalning",
    name: "Takmålning",
    verb: "måla tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Takmålning ${prep} ${loc.name} är det billigaste sättet att förlänga takets liv och få tillbaka ett fräscht utseende. RoslagsTak målar plåttak, betongpannetak och eternittak ${prep} ${loc.name} — alltid efter grundlig rengöring och rostbehandling.`,
      `Vi börjar med tvätt och borttagning av mossa och alger, skrapar och rostskyddsbehandlar där det behövs, grundar och stryker sedan två gånger med takfärg avsedd för utsatta lägen.`,
      loc.isIsland
        ? `Vi tar med tvättutrustning, färg och skyddsutrustning till ${loc.name} och planerar arbetet efter väderfönstret — takfärg behöver torrt väder och plusgrader.`
        : `Vi målar tak ${prep} ${loc.name} från april till oktober och bokar in arbetet efter överenskommelse.`,
      `Takmålning ${prep} ${loc.name}, inklusive tvätt, grundning och två strykningar, fast pris efter takkontroll. Ett målat tak håller normalt 10–15 år innan det behöver göras om. ROT-avdrag på 30 % av arbetskostnaden.`,
      `Undrar du om ditt tak ${prep} ${loc.name} går att måla eller om det är dags för byte? Boka kostnadsfri takkontroll — vi säger som det är. Ring 070-154 36 39.`,
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
        description: `${service.name} ${prep} ${loc.name}. Professionell takläggare. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti och kostnadsfri offert, utan förpliktelser.`,
        content: service.generateContent(loc, prep).map(withRotForbehall),
      });
    }
  }
  return combos;
};

export const getCombo = (serviceSlug: string, locationSlug: string) =>
  generateCombos().find((c) => c.serviceSlug === serviceSlug && c.locationSlug === locationSlug);

export { allServiceSlugs };

/** Skyddsnät: den statiska sluglistan måste matcha serviceTypes. */
export const serviceSlugsFromTypes = serviceTypes.map((s) => s.slug);
