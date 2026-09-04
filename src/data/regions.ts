/** Regionindelning som används av områdeshubben och ServiceArea-sektionen. */

export const regionOrder = [
  "Norra skärgården",
  "Mellersta skärgården",
  "Kusten",
  "Rådmansöhalvön",
  "Norra Roslagen",
  "Roslagens inland",
  "Österåker",
  "Stockholms stad",
  "Norra Stockholm",
  "Nordvästra Stockholm",
  "Västerort",
  "Östra Stockholm",
  "Sydöstra Stockholm",
  "Södra Stockholm",
  "Sydvästra Stockholm",
] as const;

export const regionIntros: Record<string, string> = {
  "Norra skärgården":
    "Takbyte och takrenovering i ytterskärgården. Vi tar oss ut till öar dit andra inte når — med material, verktyg och erfarenhet.",
  "Mellersta skärgården":
    "Takläggare med lång erfarenhet av takprojekt på öar i mellersta Roslagen. Från sommarstugor till permanentboenden.",
  Kusten:
    "Takomläggning, takrenovering och plåtarbeten längs hela Roslagens kustlinje och på fastlandet runt Norrtälje.",
  "Norra Roslagen":
    "Takbyte, plåttak och takrenovering i Hallstavik, Älmsta, Herräng och norra Roslagen — material valt för hårt kustklimat.",
  Rådmansöhalvön:
    "Bandtäckning, plåttak och takbyte i Gräddö och Kapellskär, där vind och saltluft ställer högsta krav på infästningar.",
  "Roslagens inland":
    "Takomläggning och takbyte i Rimbo, Edsbro, Riala, Vallentuna och Täby — snölast, ventilation och taksäkerhet enligt gällande krav.",
  Österåker:
    "Takbyte, takomläggning och bandtäckning i Åkersberga och Österskär — från 70-talsvillor till komplexa tak med kupor och torn.",
  "Stockholms stad":
    "Takarbeten på kulturhistoriska tak och bostadsrättsfastigheter i innerstadens tätbebyggda kvarter.",
  "Norra Stockholm":
    "Takbyte, takrenovering och plåtarbeten i norra Stockholms villabälte och bostadsrättsområden.",
  "Nordvästra Stockholm":
    "Från miljonprogramstak till villatak och kulturhistorisk bebyggelse i Sigtuna, Järfälla och Upplands-Bro.",
  Västerort:
    "Takbyte och takrenovering i västra Stockholms trädgårdsstäder och villaområden.",
  "Östra Stockholm":
    "Ö- och skärgårdskommuner öster om staden, där fukt och vind styr val av takmaterial.",
  "Sydöstra Stockholm":
    "Takbyte och takrenovering i sydöstra Stockholms kust- och skärgårdsområden.",
  "Södra Stockholm":
    "Villor, radhus och bostadsrättsfastigheter i södra Stockholm — plåt, tegel och betongpannor.",
  "Sydvästra Stockholm":
    "Sjönära villatak och kommunala takprojekt sydväst om Stockholm.",
};

/** URL-slug per region — används av områdeshubbarna (/omraden/<slug>). */
export const regionSlugs: Record<string, string> = {
  "Norra skärgården": "norra-skargarden",
  "Mellersta skärgården": "mellersta-skargarden",
  Kusten: "kusten",
  Rådmansöhalvön: "radmansohalvon",
  "Norra Roslagen": "norra-roslagen",
  "Roslagens inland": "roslagens-inland",
  Österåker: "osteraker",
  "Stockholms stad": "stockholms-stad",
  "Norra Stockholm": "norra-stockholm",
  "Nordvästra Stockholm": "nordvastra-stockholm",
  Västerort: "vasterort",
  "Östra Stockholm": "ostra-stockholm",
  "Sydöstra Stockholm": "sydostra-stockholm",
  "Södra Stockholm": "sodra-stockholm",
  "Sydvästra Stockholm": "sydvastra-stockholm",
};

export const regionBySlug = (slug: string): string | undefined =>
  Object.keys(regionSlugs).find((r) => regionSlugs[r] === slug);

export const regionPath = (region: string): string | undefined =>
  regionSlugs[region] ? `/omraden/${regionSlugs[region]}` : undefined;

/**
 * Längre, unik brödtext per region för hubbsidan. Handlar om områdets
 * förutsättningar (klimat, bebyggelse, logistik) — inte om tjänsterna.
 */
export const regionLongText: Record<string, string[]> = {
  "Norra skärgården": [
    "Ytterskärgården norr om Blidö är den mest krävande miljön vi arbetar i. Öppet läge mot Ålands hav ger saltdimma, sidvind och isbildning i takfoten, och det är nästan alltid beslag, infästningar och nockplåt som ger upp först — inte själva takytan.",
    "Nästan allt material går ut med båt eller pråm. Vi bokar transport och lossningsplats innan arbetet startar, så att rivningsavfall och nya plåtar inte behöver ligga och vänta på tomten. Det gör att ett takbyte här kräver mer planering, men lika många arbetsdagar på plats som på fastlandet.",
  ],
  "Mellersta skärgården": [
    "I mellersta skärgården blandas rödfärgade skärgårdsstugor med nybyggda permanenthus. Saltluft året runt och kraftiga vindbyar över öppna fjärdar sliter framför allt på beslag, vindskivor och nockplåt.",
    "Färjeleder och begränsad uppställningsplats styr hur vi lägger upp arbetet. Vi förbereder etableringen i detalj och samordnar gärna flera tak på samma ö eller i samma vik, vilket kortar tiden på plats.",
  ],
  Kusten: [
    "Längs Roslagens kust står villor från 1960-talet och framåt tillsammans med äldre trähus nära vattnet. Fuktig kustluft och slagregn från öster gör att underlagspappen åldras snabbare än inåt land.",
    "Framkomligheten är god, så etableringen går fort. Vi börjar besiktningen i rännor, genomföringar och på nordsidan — det är där skadorna brukar visa sig först.",
  ],
  Rådmansöhalvön: [
    "På Rådmansöhalvön möter vi gårdar, ombyggda ekonomibyggnader och friliggande villor på stora tomter. Vind från flera väderstreck och snölast i skogsläge påverkar både nock och takfot.",
    "Grusvägar och grindar innebär att leveranser ofta måste köras fram med mindre fordon. Vi går igenom var container, lift och materialupplägg ska stå innan första arbetsdagen.",
  ],
  "Norra Roslagen": [
    "Norra Roslagen har längre vintrar, mer snö och tydligare temperaturväxlingar som rör på plåtfalsar. Bebyggelsen är en blandning av äldre trähus, sekelskifteshus och nyare enplansvillor.",
    "Lertegel, pannplåt och plåttak lagda i flera generationer är vanligt här. Vi samordnar längre transportsträckor med andra projekt i området för att hålla nere kostnaden.",
  ],
  "Roslagens inland": [
    "I inlandet är snölast och lövfall från omgivande skog de största orsakerna till problem — löv samlas i rännor och bakom skorstenen och håller fukten kvar mot plåten.",
    "Villaområden från 1970- och 80-talet dominerar, ofta med betongpannor som närmar sig slutet av sin livslängd. Asfalterad väg fram och gott om plats för container gör etableringen enkel.",
  ],
  Österåker: [
    "Kustnära fukt, mossa på nordsidan och snabb algpåväxt på pannor i skuggigt läge präglar taken i Åkersberga och Österskär. Många hus är fritidshus som byggts om till permanentboende, med tillbyggnader som behöver egna lösningar.",
    "Avstånden är korta, men tomtgränserna ofta trånga. Vi planerar lyft och materialplacering tillsammans med dig innan arbetet startar.",
  ],
  "Stockholms stad": [
    "I innerstaden arbetar vi på flerbostadshus, radhus och stadsvillor med brutna tak, många genomföringar och trånga takytor mellan brandgavlar. Bandtäckt plåt, falsad zink och tegel dominerar.",
    "Avspärrning, upplåtelse av gata och tidsfönster för lyft behöver bokas i förväg. Vi tar hand om den planeringen och håller kontakten med förening eller fastighetsägare under hela projektet.",
  ],
  "Norra Stockholm": [
    "Norra Stockholms villabälte består till stor del av hus från 1930–70-talet, radhuslängor och nybyggda parhus. Fuktiga vintrar, mycket lövfall och isbildning där taket möter kall vind är de vanligaste orsakerna till läckage.",
    "Smala villagator gör att uppställning och lyft behöver planeras med grannarna. Vi meddelar alltid i förväg vad som kommer att stå på gatan och hur länge.",
  ],
  "Nordvästra Stockholm": [
    "Här möter vi villamattor från 60- och 70-talet samt nyare grupphusbebyggelse. Snölast och blåst över öppna fält, plus vårsol som rör på gamla falsar, är de faktorer som styr materialvalet.",
    "Avvattningen är ofta underdimensionerad på hus från den tiden. Vi räknar om rännor och stuprör i samband med takbytet i stället för att återanvända för små dimensioner.",
  ],
  Västerort: [
    "Västerorts trädgårdsstäder och egnahem från mellankrigstiden har tegel, betongpannor och äldre bandtäckt plåt. Skugga från högre bebyggelse och stadsnära fukt ger snabb algpåväxt på nordsidan.",
    "Gaturummen är trånga, så material lyfts in från gatan under ett kort tidsfönster. Det planerar vi in i tidsplanen från början.",
  ],
  "Östra Stockholm": [
    "Östra Stockholm har villor i höjdlägen, sekelskifteshus och moderna arkitektritade hus med komplicerade takfall. Saltbemängd luft från Saltsjön och hård vind mot fasader i öppet läge sliter hårt på falsad plåt och zink.",
    "Branta uppfarter och nivåskillnader kräver extra säkring vid arbetet. Vi går igenom fallskydd och etablering på plats innan vi lämnar offert.",
  ],
  "Sydöstra Stockholm": [
    "I sydöstra Stockholm ligger många hus nära vikar och sjöar. Fukt, mossa i skugga och stående vatten i flacka takfall är de återkommande problemen — särskilt på låglutande papptak.",
    "Smala vägar nära vattnet och begränsad plats för avfallshantering gör att vi planerar container och transporter noga innan arbetet börjar.",
  ],
  "Södra Stockholm": [
    "Villaområden från 1940–70-talet med många tillbyggnader dominerar södra Stockholm. Växlande vinterväder som fryser och tinar ger isproppar i rännorna och skador i takfoten.",
    "Kuperad terräng betyder att lift och materialplacering ofta måste bestämmas på plats. Det gör vi vid den kostnadsfria besiktningen.",
  ],
  "Sydvästra Stockholm": [
    "Sydväst om staden ligger sjönära villor, radhus och nyare grupphus med enkla sadeltak. Blåsiga lägen mot Mälaren sliter på vindskivor och nockplåt.",
    "Tillfarterna är goda men tomterna trånga mellan husen. Vi håller etableringen kompakt och städar löpande under arbetet.",
  ],
};
