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
        : `Med vår bas i Norrtälje når vi ${loc.name} snabbt och effektivt. Korta resvägar gör att vi kan hålla nere etableringskostnaden vid takbyten i området.`,
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
      `Besiktning och offert för takomläggning är kostnadsfria ${prep} ${loc.name}. Ring 070-154 36 39 eller fyll i vårt offertformulär — vi återkopplar inom 24 timmar.`,
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
    `Förutom taktvätt utför vi även takmålning ${prep} ${loc.name}. När taket är rent och torrt målar vi med specialfärg för tak (akrylat eller silikonbaserad) som ger UV-skydd, fuktskydd och ett fräscht utseende i 10–15 år. Takmålning kostar från ca 150 kr/m² inklusive grundning och två strykningar. Vi målar i alla standardfärger — tegelröd, svart, mörkgrå, brun eller efter eget val.`,
    `Bäst tid för taktvätt ${prep} ${loc.name} är från april till oktober när det är torrt och plusgrader. Vi rekommenderar taktvätt vart 5:e till 10:e år beroende på takets exponering. Boka en kostnadsfri besiktning så bedömer vi takets skick och ger dig en ärlig rekommendation. Ring 070-154 36 39 eller fyll i offertformuläret — vi återkopplar inom 24 timmar.`,
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
        ? `Att bandtäcka ett tak ${prep} ${loc.name} kräver planering — plåtbanden är långa och måste hanteras varsamt vid båttransport. Vi har rutiner för detta och tillverkar delar av banden på plats när logistiken kräver det.`
        : `Från vår bas i Norrtälje når vi ${loc.name} enkelt med plåtband och falsutrustning, vilket håller nere transportkostnaden för din bandtäckning.`,
      `Bandtäckning ${prep} ${loc.name} kostar normalt från ca 2 000 kr/m² i förzinkad eller färgbelagd plåt. Koppar och zink ligger högre. Priset styrs av takets komplexitet — antal vinklar, kupor och genomföringar. ROT-avdrag ger 30% rabatt på arbetskostnaden.`,
      `Vill du veta vad bandtäckning ${prep} ${loc.name} skulle kosta för just ditt tak? Ring 070-154 36 39 eller begär kostnadsfri offert — vi kommer ut, mäter och lämnar fast pris inom 24 timmar.`,
    ],
  },
  {
    slug: "platttak",
    name: "Plåttak",
    verb: "lägga plåttak",
    generateContent: (loc: LocationData, prep: string) => [
      `Plåttak ${prep} ${loc.name} är det vanligaste och mest prisvärda valet i Roslagen. RoslagsTak monterar alla typer av plåttak: TP20 trapetsprofil, pannplåt, tegelprofilerad plåt och dubbelfalsat plåttak. Plåt är lätt, tåligt mot salt och vind och kräver minimalt underhåll — perfekt för hus ${prep} ${loc.name}.`,
      `Vid montering av plåttak ${prep} ${loc.name} kontrollerar vi alltid råspont, underlagspapp och läkt innan den nya plåten läggs. Vi använder färgbelagd stålplåt med hög korrosionsklass, monterar nya nockbeslag, vindskivebeslag och fotplåtar samt kompletterar med taksäkerhet enligt gällande krav.`,
      loc.isIsland
        ? `Plåttak är extra lämpligt ${prep} ${loc.name} eftersom materialet är lätt att transportera med båt och tål saltluft bättre än betongpannor, som frostspränger när mossa håller kvar fukt.`
        : `Vi lägger plåttak ${prep} ${loc.name} året runt och kan ofta starta inom några veckor efter besiktning.`,
      `Ett plåttak ${prep} ${loc.name} kostar från ca 1 200 kr/m² för TP20 och från ca 2 000 kr/m² för dubbelfalsat. Tegelprofilerad plåt ligger däremellan. Alla priser inkluderar montage, beslag och bortforsling av gammalt material. ROT-avdrag tillkommer.`,
      `Begär kostnadsfri offert på plåttak ${prep} ${loc.name} — vi hjälper dig välja profil, kulör och rätt korrosionsklass för läget. Ring 070-154 36 39.`,
    ],
  },
  {
    slug: "betongpannor",
    name: "Betongpannor",
    verb: "lägga betongpannor",
    generateContent: (loc: LocationData, prep: string) => [
      `Ska du byta till eller lägga om betongpannor ${prep} ${loc.name}? RoslagsTak lägger betongpannetak i hela Roslagen — både vid komplett takbyte och vid omläggning där befintliga pannor läggs tillbaka på ny underlagspapp och ny läkt.`,
      `Betongpannor ${prep} ${loc.name} har lång livslängd men blir känsliga när mossa och alger håller kvar fukt i ytan, vilket leder till frostsprängning. Vi byter alltid trasiga pannor, ser över nock- och valmpannor, kontrollerar att underlagspappen är hel och att ventilationen under pannorna fungerar.`,
      loc.isIsland
        ? `Betongpannor är tunga, vilket gör transporten till ${loc.name} till en central del av projektet. Vi räknar alltid in båt- eller färjelogistik i offerten och bedömer om takstolarna klarar lasten.`
        : `Vi når ${loc.name} snabbt från Norrtälje och har alltid tillgång till både nya pannor och matchande begagnade pannor för lagning.`,
      `Ett tak med betongpannor ${prep} ${loc.name} kostar från ca 1 300 kr/m² vid nyläggning. Omläggning av befintliga pannor med ny papp och läkt ligger normalt lägre. Vi lämnar fast pris efter kostnadsfri besiktning. ROT-avdrag ger 30% på arbetskostnaden.`,
      `Osäker på om ditt betongpannetak ${prep} ${loc.name} ska renoveras eller bytas? Boka en kostnadsfri takinspektion — vi ger en ärlig rekommendation. Ring 070-154 36 39.`,
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
        : `Vi utför tegeltaksarbeten regelbundet ${prep} ${loc.name} och har god tillgång till både nytt och kulörmatchat äldre tegel.`,
      `Tegeltak ${prep} ${loc.name} kostar från ca 1 400 kr/m² i lertegel och från ca 1 400 kr/m² i tegelprofilerad plåt inklusive montage och beslag. ROT-avdrag ger 30% rabatt på arbetskostnaden.`,
      `Begär kostnadsfri offert på tegeltak ${prep} ${loc.name} — vi mäter, fotograferar och lämnar fast pris inom 24 timmar. Ring 070-154 36 39.`,
    ],
  },
  {
    slug: "takmalning",
    name: "Takmålning",
    verb: "måla tak",
    generateContent: (loc: LocationData, prep: string) => [
      `Takmålning ${prep} ${loc.name} är det billigaste sättet att förlänga takets liv och få tillbaka ett fräscht utseende. RoslagsTak målar plåttak, betongpannetak och eternittak ${prep} ${loc.name} — alltid efter grundlig rengöring och rostbehandling.`,
      `Vi börjar med tvätt och borttagning av mossa och alger, skrapar och rostskyddsbehandlar där det behövs, grundar och stryker sedan två gånger med takfärg avsedd för utsatta lägen. Nära kusten ${prep} ${loc.name} är rätt färgsystem avgörande — saltluft bryter ner billig färg på några år.`,
      loc.isIsland
        ? `Vi tar med tvättutrustning, färg och skyddsutrustning till ${loc.name} och planerar arbetet efter väderfönstret — takfärg behöver torrt väder och plusgrader.`
        : `Vi målar tak ${prep} ${loc.name} från april till oktober och kan oftast boka in dig inom några veckor.`,
      `Takmålning ${prep} ${loc.name} kostar från ca 150 kr/m² inklusive tvätt, grundning och två strykningar. Ett målat tak håller normalt 10–15 år innan det behöver göras om. ROT-avdrag ger 30% rabatt på arbetskostnaden.`,
      `Undrar du om ditt tak ${prep} ${loc.name} går att måla eller om det är dags för byte? Boka kostnadsfri besiktning — vi säger som det är. Ring 070-154 36 39.`,
    ],
  },
];

serviceTypes.push(...specialistServices);

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
        description: `${service.name} ${prep} ${loc.name}. Professionell takläggare i Roslagen. Fast pris efter besiktning, 10 års garanti och kostnadsfri offert.`,
        content: service.generateContent(loc, prep),
      });
    }
  }
  return combos;
};

export const getCombo = (serviceSlug: string, locationSlug: string) =>
  generateCombos().find((c) => c.serviceSlug === serviceSlug && c.locationSlug === locationSlug);

export const allServiceSlugs = serviceTypes.map((s) => s.slug);
