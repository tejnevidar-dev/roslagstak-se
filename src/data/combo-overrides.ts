/**
 * Utökad, unik text (≥500 ord) för /takbyte-<ort> på Storstockholms största kommuner
 * (sprint-offensiv-2026-09-28 punkt 3). Ersätter den korta mallgenererade texten i
 * service-location-combos.ts bara för dessa specifika tjänst+ort-kombinationer.
 * Bara allmänt belagd kunskap om kommunernas bebyggelse och taktyper — inga påhittade
 * projekt eller referenser. Lertegel och dubbelfalsat plåttak är belagda material (Vidars
 * beslut 2026-09-28). Eternit: vi samordnar sanering via behörig partner, utför inte själva.
 */
export interface ComboOverride {
  title: string;
  description: string;
  content: string[];
}

const PROCESS =
  "Processen är densamma oavsett kommun: en kostnadsfri takkontroll där vi går igenom tak, underlag, plåtdetaljer och avvattning, en skriftlig offert med fast pris — aldrig löpande timpris — och utförande enligt AMA. Vi lämnar 10 års utförandegaranti och, för tätskiktet, 30 års garanti genom MATAKI. Du har en och samma kontaktperson genom hela processen, och du bestämmer alltid själv om och när du vill gå vidare efter takkontrollen — den är kostnadsfri och förpliktar inte till något.";

const ROT =
  "Som privatperson kan du använda ROT-avdrag på arbetskostnaden vid takbyte: 30 %, högst 50 000 kr per person och år. Äger ni bostaden tillsammans kan ni använda avdraget var för sig, så att ett par kan få upp till 100 000 kr sammanlagt om utrymmet finns kvar för året. Materialet ger inget avdrag, bara arbetskostnaden gör det, och vi drar av ROT direkt på fakturan så att du bara betalar din del.";

const INCLUDES = (name: string, prep: string) =>
  `Vad ingår i ett takbyte ${prep} ${name}? Rivning och bortforsling av det gamla takmaterialet, ny underlagspapp och ny läkt, nytt ytmaterial, nya plåtbeslag kring skorstenar och genomföringar, ny taksäkerhet (takstege och gångbrygga, samt snörasskydd där det behövs) och, om du vill, nya hängrännor och stuprör. Skadad råspont byts där den behöver bytas — det syns aldrig förrän det gamla taket är rivet, och då kontaktar vi dig och specificerar tillägget innan vi fortsätter. Allt specificeras i offerten, så du vet exakt vad som ingår innan arbetet börjar.`;

const COMPARE = (name: string, prep: string) =>
  `Jämför offerter på rätt sätt när du ska byta tak ${prep} ${name}: titta på mer än slutsumman. Är priset fast, eller kan det bli tillägg om något oväntat hittas under det gamla taket? Står det tydligt vad som ingår — underlag, läkt, plåtdetaljer, bortforsling och städning? Vilka garantier får du, och hur länge gäller de? Har du en tydlig kontaktväg genom hela processen, från takkontroll till slutgenomgång? Hos oss är svaret ja på alla fyra frågorna.`;

const CTA = (name: string, prep: string) =>
  `Boka en kostnadsfri takkontroll för ditt takbyte ${prep} ${name}. Ring 070-154 36 39 eller boka online — vi återkommer inom 24 timmar.`;

export const comboOverrides: Record<string, ComboOverride> = {
  "takbyte-nacka": {
    title: "Takbyte i Nacka — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Nacka: villor, radhus och skärgårdsfastigheter. Kostnadsfri takkontroll utan förpliktelser, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Nacka sträcker sig från tätbebyggda delar nära Stockholms innerstad till skärgårdsnära villaområden mot Saltsjön och Baggensfjärden. Bebyggelsen är blandad: villor och radhus från 1950- till 1980-talet i områden som Fisksätra, Saltsjö-Duvnäs och Älta, sekelskifteshus i de äldre delarna, och nyare flerbostadshus i centrala Nacka och Sickla. Den variationen gör att vi möter allt från enkla sadeltak till mer komplicerade tak med flera takfall, kupor och burspråk.",
      "Vi tar uppdrag i hela Nacka kommun, bland annat i villaområdena i Saltsjöbaden. Takkontrollen är kostnadsfri och förpliktar inte till något.",
      "Kustnära läge mot Saltsjön innebär att salt luft och slagregn från öster sliter mer på takmaterial och plåtbeslag än i inlandet. I kustnära lägen kan frostsprängning i betongpannor och korrosion i beslag uppstå snabbare på äldre villatak, särskilt på tak som vetter mot vattnet. Rätt materialval och korrekt utförda anslutningar vid skorstenar och genomföringar är avgörande för hur länge ett tak håller i det klimatet.",
      "Vi utför takbyte i Nacka med samtliga vanliga material: TP20-plåttak för fritidshus och enklare byggnader, dubbelfalsat plåttak (bandtäckning) för permanentboenden i exponerade lägen, betongpannor och tegelplåt för villor där ett traditionellt utseende är viktigt, samt lertegel för äldre och kulturhistoriskt intressanta hus. Materialvalet avgörs av takets lutning, husets karaktär och budget, och vi går igenom alternativen vid takkontrollen.",
      "Har fastigheten i Nacka ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Nacka", "i"),
      PROCESS,
      ROT,
      "Vad kostar ett takbyte i Nacka? Priset beror på takets storlek, lutning, material och underlagets skick — vi lämnar aldrig ett pris utan att först ha sett taket. Riktpriserna på vår prislista är en bra utgångspunkt inför budgeteringen.",
      COMPARE("Nacka", "i"),
      CTA("Nacka", "i"),
    ],
  },
  "takbyte-lidingo": {
    title: "Takbyte på Lidingö — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte på Lidingö: villor och skärgårdsfastigheter nära vatten. Kostnadsfri takkontroll utan förpliktelser, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Lidingö är en ö strax utanför Stockholms innerstad, med en villabebyggelse som sträcker sig från representativa sekelskifteshus i Gångsätra och Bodal till modernistiska villor från 1930- och 1940-talet och senare tillbyggda hus i Käppala, Larsberg och Högsätra. Många fastigheter har stora, väl synliga tak, vilket gör att takets material och utförande syns tydligt i gatubilden.",
      "Vi tar uppdrag på hela Lidingö, bland annat i villaområdet Sticklinge. Takkontrollen är kostnadsfri och förpliktar inte till något.",
      "Öns läge mellan Lilla Värtan och Kyrkviken innebär att husen på Lidingö utsätts för salt luft och kraftiga vindar från flera väderstreck, särskilt i de yttre delarna mot Elfvik och Käppala. Det ställer högre krav på plåtbeslag, infästningar och ventilation under takmaterialet än vid inlandsläge, och det är ofta beslag och anslutningar — inte själva takytan — som ger vika först på äldre tak.",
      "Vi utför takbyte på Lidingö med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel. På de äldre villorna i de kulturhistoriskt värdefulla delarna av Lidingö används ofta lertegel eller falsad plåt för att bevara husets ursprungliga karaktär, medan nyare byggnader oftare får TP20 eller dubbelfalsat plåttak. Vi går igenom vad som passar just ditt hus vid takkontrollen.",
      "Byte av taktäckningsmaterial eller kulör kan i vissa fall vara anmälningspliktigt på Lidingö, särskilt i områden med kulturhistoriska värden. Vi hjälper dig kontrollera vad som gäller för din fastighet innan arbetet påbörjas.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Lidingö", "på"),
      PROCESS,
      ROT,
      COMPARE("Lidingö", "på"),
      CTA("Lidingö", "på"),
    ],
  },
  "takbyte-solna": {
    title: "Takbyte i Solna — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Solna: från Råsunda och Bergshamra till Arenastaden. Kostnadsfri takkontroll utan förpliktelser, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Solna är en av Stockholms mest tätbebyggda kommuner, med allt från flerbostadshus i Råsunda och Bergshamra till villaområden i Huvudsta och Ulriksdal och moderna nybyggnationer i Arenastaden. Den äldre bebyggelsen har ofta plåttak eller tegelpannor från 1900-talets första hälft, medan villaområdena från 1950- och 60-talet oftast har betongpannor eller äldre bandtäckt plåt.",
      "I Solnas tätbebyggda kvarter är det ofta logistiken snarare än själva takarbetet som avgör hur ett projekt planeras: ställning, materialupplag och avfallshantering måste samordnas med parkeringsregler, gårdsutrymmen och grannars behov. Vi går igenom logistikplanen med dig innan arbetet startar, så att projektet stör så lite som möjligt.",
      "Vi utför takbyte i Solna med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel. På äldre flerbostadshus och villor i Råsunda och Huvudsta väljer många dubbelfalsad bandtäckning eller lertegel för att matcha den ursprungliga arkitekturen, medan nyare byggnation i Arenastaden och Ulriksdal oftare får moderna plåtlösningar med hög korrosionsklass.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Solna", "i"),
      PROCESS,
      ROT,
      "Vad kostar ett takbyte i Solna? Priset beror på takets storlek, lutning, material och underlagets skick. Riktpriserna på vår prislista är en bra utgångspunkt, men vi lämnar alltid ett fast pris efter kostnadsfri takkontroll.",
      COMPARE("Solna", "i"),
      CTA("Solna", "i"),
    ],
  },
  "takbyte-huddinge": {
    title: "Takbyte i Huddinge — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Huddinge: villaområden och flerbostadshus från flera decennier. Kostnadsfri takkontroll utan förpliktelser, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Huddinge har en varierad bebyggelse, från villaområden i Segeltorp och Snättringe med hus från 1950- till 1970-talet, till flerbostadshus från miljonprogramsåren i Flemingsberg och Vårby, och nyare bostadsområden i Storängen och Skogås. Den stora variationen i husens ålder gör att vi möter allt från originaltak som närmar sig slutet av sin livslängd till relativt nya tak som bara behöver punktinsatser.",
      "Vi tar uppdrag i hela Huddinge kommun, bland annat i villaområdena Stuvsta, Trångsund och Snättringe. Takkontrollen är kostnadsfri och förpliktar inte till något.",
      "På villor från 1950- och 60-talet i Huddinge kan betongpannorna börja frostspränga och underlagspappen torka ut, vilket gör en takomläggning till bättre ekonomi över tid än att fortsätta laga punktvis. Vi går igenom underlagets skick noggrant vid takkontrollen, eftersom det ofta är avgörande för om en renovering räcker eller om ett komplett takbyte är rätt val.",
      "Vi utför takbyte i Huddinge med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel, och anpassar materialvalet efter husets ålder, taklutning och din budget. På villaområdena med enklare sadeltak är TP20 eller betongpannor ofta det mest kostnadseffektiva valet, medan dubbelfalsat plåttak passar bra på tak med mer komplicerad geometri.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Huddinge", "i"),
      PROCESS,
      ROT,
      COMPARE("Huddinge", "i"),
      CTA("Huddinge", "i"),
    ],
  },
  "takbyte-jarfalla": {
    title: "Takbyte i Järfälla — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Järfälla: villaområden i Jakobsberg, Kallhäll och Barkarby. Kostnadsfri takkontroll utan förpliktelser, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Järfälla har vuxit fram kring flera villa- och radhusområden — Jakobsberg, Kallhäll, Viksjö och det snabbt växande Barkarbystaden — med bebyggelse som spänner från 1960-talsvillor till helt nybyggda kvarter. De äldre villaområdena har ofta betongpannor eller äldre plåttak som nu närmar sig eller passerat sin förväntade livslängd, medan nyare områden som Barkarbystaden har moderna taklösningar från start.",
      "I Mälardalens inlandsklimat, som Järfälla tillhör, är det framför allt snölast och temperaturväxlingar mellan årstiderna som sliter på tak — snölast ställer krav på takstolarnas dimensionering och på snörasskyddens placering, medan upprepade frysningar och upptiningar påskyndar frostsprängning i äldre betongpannor. Vi kontrollerar alltid takstolarnas skick och bedömer behovet av snörasskydd när vi byter tak i Järfälla.",
      "Vi utför takbyte i Järfälla med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel. På villaområdena i Jakobsberg och Kallhäll är betongpannor och TP20 vanligast, medan dubbelfalsat plåttak eller lertegel oftare väljs på hus där ett mer exklusivt eller traditionellt utseende är prioriterat.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Järfälla", "i"),
      PROCESS,
      ROT,
      COMPARE("Järfälla", "i"),
      CTA("Järfälla", "i"),
    ],
  },
  "takbyte-upplands-vasby": {
    title: "Takbyte i Upplands Väsby — fast pris & garanti",
    description:
      "Takbyte i Upplands Väsby: villor och radhus från 1970- och 80-talet. Kostnadsfri takkontroll utan förpliktelser, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Upplands Väsby har en stor andel villa- och radhusbebyggelse från 1970- och 80-talet, samt nyare bostadsområden kring Väsby centrum och Runby. På hus från den perioden kan betongpannor börja frostspränga och underlagspappen torka ut och spricka med åren — tecken på att det är dags att planera ett takbyte.",
      "Som inlandskommun i norra Storstockholm får Upplands Väsby framför allt sliten av snölast och temperaturväxlingar snarare än salt luft. Vi bedömer alltid behovet av snörasskydd över entréer och uteplatser och kontrollerar takstolarnas bärförmåga innan nytt, tyngre material som betongpannor monteras.",
      "Vi utför takbyte i Upplands Väsby med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel. På den typiska villa- och radhusbebyggelsen från 1970- och 80-talet är betongpannor och TP20-plåt de vanligaste valen, och vi ger dig en ärlig rekommendation utifrån husets ålder, taklutning och budget.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Upplands Väsby", "i"),
      PROCESS,
      ROT,
      COMPARE("Upplands Väsby", "i"),
      CTA("Upplands Väsby", "i"),
    ],
  },
  "takbyte-stockholm": {
    title: "Takbyte i Stockholm — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Stockholm: från innerstadens fastigheter till villaförorterna. Kostnadsfri takkontroll utan förpliktelser, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Stockholm rymmer en stor spännvidd av bebyggelse: sekelskiftesfastigheter med bandtäckt plåt eller tegel i innerstadskvarteren, funktionalistiska flerbostadshus från 1930- och 40-talet, villaförorter från efterkrigstiden och moderna nyproduktionsområden. Ett takbyte i Stockholm handlar därför sällan om ett standardtak — takets historia, husets skyddsvärde och den omgivande bebyggelsen påverkar ofta materialval och utförande.",
      "Vi tar uppdrag i hela Stockholms kommun, bland annat i villaområdena i Sköndal och Solhem. Takkontrollen är kostnadsfri och förpliktar inte till något.",
      "Att byta tak i tätbebyggda delar av Stockholm ställer särskilda krav på logistik. Trånga gator, parkeringsregler, avspärrningar och grannhänsyn gör att ställning, materialupplag och avfallshantering måste planeras i detalj och ofta bokas i förväg med fastighetsägare eller bostadsrättsförening. Vi tar hand om den planeringen och håller löpande kontakt med dig genom hela projektet.",
      "Vi utför takbyte i Stockholm med samtliga vanliga material: TP20-plåttak, dubbelfalsat plåttak (bandtäckning), betongpannor, tegelplåt och lertegel. På äldre fastigheter i innerstaden och i kulturhistoriskt värdefulla villaområden används ofta dubbelfalsad bandtäckning eller lertegel för att bevara byggnadens ursprungliga uttryck, medan villaförorterna oftare har betongpannor eller TP20 från tidigare takbyten.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Stockholm", "i"),
      PROCESS,
      ROT,
      "Vad kostar ett takbyte i Stockholm? Priset beror på takets storlek, lutning, material, underlagets skick och fastighetens tillgänglighet. Riktpriserna på vår prislista är en bra utgångspunkt, men vi lämnar alltid ett fast pris efter kostnadsfri takkontroll.",
      COMPARE("Stockholm", "i"),
      CTA("Stockholm", "i"),
    ],
  },
  // #14/#1r — 18 godkända tjänst×ort-texter, Agent – Innehåll 2026-09-29 (ledning/marknad/innehall/ortstexter/).
  // Källor och grindnoteringar i respektive .md-fil. Boilerplate (INCLUDES/PROCESS/ROT/COMPARE/CTA) återanvänds
  // som i övriga overrides ovan; FAQ genereras separat (location-faqs.ts), inte upprepad här.
  "takbyte-taby": {
    title: "Takbyte i Täby – fast pris efter takkontroll",
    description:
      "Takbyte i Täby med lertegel, betongpannor eller plåt. Kostnadsfri takkontroll utan förpliktelser, fast pris och utförande enligt AMA.",
    content: [
      "Bor du i ett villakvarter eller ett grupphusområde i Täby är ditt tak en del av en större helhet, som syns tydligt från gatan. När taket ska bytas handlar det därför inte bara om att det ska vara tätt, utan också om hur huset ser ut efteråt. Här går vi igenom vad ett takbyte i Täby innebär, vilka material som är aktuella och hur du får ett fast pris innan något arbete börjar.",
      "Området som i dag är Täby var havsbotten fram till bronsåldern. Därefter har bygden lämnat rikligt med spår, bland annat ett stort antal runstenar och Jarlabankes bro vid Vallentunasjön. Den stora förändringen kom med järnvägen. Enligt beskrivningar av kommunens historia ledde stationerna vid Viggbyholm, Roslags Näsby och Täby kyrkby till ökad bebyggelse, och Roslagsbanan har haft stor betydelse för Täbys utveckling. Kring fyra tiondelar av kommunens yta är i dag bebyggd.",
      "I Täby finns bland annat grupphusområden med kedjehus och radhus, som Ella gård och Skarpäng. I ett grupphusområde är husen ofta likadana, och då kan ett tak som byts till ett helt annat material eller en annan kulör sticka ut. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun, och det är klokt att ta reda på det innan materialet väljs.",
      "Lertegel är bränd lera och ger det klassiska tegeltaket, som åldras med patina. Betongpannor har ett liknande pannat uttryck och finns i flera kulörer. Båda är tunga material, och takstolarna måste klara vikten, något som kontrolleras vid takkontrollen. Ska taket se ut ungefär som i dag är det ofta enklast att välja samma typ av panna. Vill du byta uttryck är dubbelfalsad plåt ett stramare alternativ utan synliga skruvar. Blanda inte ihop lertegel med tegelplåt, som är plåt pressad för att likna tegel.",
      "Täby ligger ungefär fem mil sydväst om Norrtälje, mellan Sollentuna, Danderyd, Österåker och Vallentuna.",
      "Vid ett takbyte ersätts hela taket, inte bara ytan. Det gamla ytmaterialet rivs, underlaget byts, ny läkt läggs och därefter kommer det nya ytmaterialet. Plåtdetaljer som fotplåt, vindskivor och skorstensbeslag byts eller anpassas, och avvattningen ses över. Ett takbyte planeras bäst i god tid, så att material och kulör är bestämda innan arbetet börjar.",
      INCLUDES("Täby", "i"),
      PROCESS,
      ROT,
      COMPARE("Täby", "i"),
      CTA("Täby", "i"),
    ],
  },
  "takbyte-vallentuna": {
    title: "Takbyte i Vallentuna – kostnadsfri takkontroll",
    description:
      "Byta tak i Vallentuna? Vi byter till betongpannor, lertegel eller plåt till fast pris efter en kostnadsfri takkontroll. Utförande enligt AMA.",
    content: [
      "Funderar du på att byta tak i Vallentuna? Då är det bra att veta vad ett takbyte faktiskt innebär, vilka material som passar ditt hus och hur du får ett pris som gäller från början. Ett nytt tak är ett stort beslut för ett hus, och ju tidigare det planeras, desto lättare blir det att välja rätt utan att behöva stressa.",
      "Vallentuna tätort har vuxit fram längs Roslagsbanan, där mindre samhällen successivt har vuxit ihop. Enligt ortens historia fanns det på 1930- och 40-talen två tegelbruk i centralorten, och befolkningen mer än fördubblades mellan 1944 och 1952. Bostadsområdena, bland dem Bällsta, Ormsta, Rickeby, Åby, Snapptuna och Ekeby, har byggts ut i etapper, och enligt hitta.se finns villor, kedjehus och radhus från 1950-talet och framåt. Det betyder att taken i samma område kan ha helt olika ålder och skick.",
      "Ett tak utsätts för allt det svenska klimatet har att erbjuda: regn, snö som ligger kvar, frost och sol. I allmänhet torkar ett tak i skugga eller på norrsidan långsammare, vilket gynnar mossa och påväxt, och snö som ligger länge belastar både pannor och avvattning. Vilka förhållanden som gäller för just ditt hus ser vi först vid takkontrollen.",
      "Vallentuna ligger ungefär fyra och en halv mil sydväst om Norrtälje, med Täby i söder och Åkersberga och Rimbo som grannorter.",
      "Många villatak har betongpannor, och vid ett takbyte väljer många samma material igen. Betongpannor ger ett traditionellt pannat tak, finns i flera kulörer, till exempel svart och rött, och enskilda pannor går att byta om någon skadas. Pannorna är tunga, så takstolarna måste klara vikten. Står huset på ett område där kedjehusen ser likadana ut, är det också värt att tänka på helheten. Vill du ha ett lättare tak är TP20-plåt ett alternativ som klarar lägre lutningar.",
      "Ett takbyte är ett nytt tak från underlaget och uppåt. Vi river det gamla ytmaterialet, lägger nytt underlag och ny läkt och monterar sedan pannor eller plåt. Fotplåt, vindskivor, nockar och genomföringar ses över, och hängrännor och stuprör anpassas till det nya taket. Allt detta står i offerten, så att du vet vad du betalar för.",
      INCLUDES("Vallentuna", "i"),
      PROCESS,
      ROT,
      COMPARE("Vallentuna", "i"),
      CTA("Vallentuna", "i"),
    ],
  },
  "takbyte-akersberga": {
    title: "Takbyte i Åkersberga – fast pris och AMA",
    description:
      "Takbyte i Åkersberga och Österåker: plåt, betongpannor eller lertegel till fast pris. Boka en kostnadsfri takkontroll utan förpliktelser.",
    content: [
      "Mellan Stockholm och skärgården ligger Åkersberga, centralorten i Österåkers kommun. Här finns allt från äldre villor nära stationerna till senare villaområden och radhus. Står du inför ett takbyte vill du veta vad som ingår, vilket material som passar huset och vad det kostar. Därför börjar vi alltid med en kostnadsfri takkontroll och lämnar sedan ett fast pris.",
      "Ett tak ska klara regn, vind, snö och sol under många år. I allmänhet är det detaljerna som avgör hur väl det klarar sig: att plåten runt skorsten och genomföringar sitter rätt, att fotplåt och vindskivor är ordentligt fästa och att vattnet leds bort utan att bli stående. Vid ett takbyte går därför lika mycket tid åt detaljerna som åt själva ytan.",
      "Åkersberga ligger ungefär fyra mil sydväst om Norrtälje och genomkorsas av Roslagsbanan, med fyra stationer inom tätorten. Grannorter är bland annat Täby och Vallentuna.",
      "Åkersberga fick sitt namn av en järnvägsstation. Stationen byggdes 1901 vid Södra Roslags Kustbana, på ett gärde som hörde till gården Berga, och skyltades först \"Åkers Berga\". Banan förlängdes sedan till Tunagård och Österskär, och enligt ortens historia bebyggdes de områdena med villor. På 1930-talet räknades både Åkersberga och Österskär som tätorter, och sedan 1950 anses de vara sammanvuxna. Resultatet är en ort där villor från olika decennier ligger sida vid sida.",
      "Ett takbyte betyder att hela taket byts: gammalt ytmaterial rivs, nytt underlag och ny läkt läggs, och det nya ytmaterialet monteras. Fotplåt, vindskivor, nock och skorstensbeslag byts eller anpassas, och avvattningen ses över. Du får veta i offerten exakt vad som ingår i just ditt tak.",
      "Dubbelfalsad plåt, även kallad bandtäckning, ger ett stramt tak utan synliga skruvar, eftersom banorna fogas ihop i långsidan och fästs med dolda klammer. Det kräver hantverksmässigt plåtslageri och passar både villor och äldre hus, även på lägre lutningar. TP20 är en skruvad profilplåt som är snabbare att lägga. Den som vill behålla ett pannat uttryck väljer i stället betongpannor eller lertegel, som är tyngre och kräver att takstolarna klarar vikten.",
      INCLUDES("Åkersberga", "i"),
      PROCESS,
      ROT,
      COMPARE("Åkersberga", "i"),
      CTA("Åkersberga", "i"),
    ],
  },
  "takbyte-rimbo": {
    title: "Takbyte i Rimbo – fast pris efter takkontroll",
    description:
      "Takbyte i Rimbo med TP20-plåt, betongpannor eller lertegel. Kostnadsfri takkontroll utan förpliktelser, fast pris och utförande enligt AMA.",
    content: [
      "Två mil väster om Norrtälje, längs riksväg 77, ligger Rimbo. Orten har en lång historia som mötesplats och är i dag en tätort i Norrtälje kommun. Ska taket bytas vill du veta vad arbetet omfattar, vilket material som passar huset och vad det kostar. Hos oss får du svar på det efter en kostnadsfri takkontroll, med ett fast pris i offerten.",
      "Svenska vintrar sätter taket på prov. I allmänhet belastar snö som ligger kvar länge både ytmaterialet och takstolarna, och frost kan skada pannor som redan har sprickor. Ett tak som ska hålla i många år behöver därför ett underlag i gott skick, rätt läkt och plåtdetaljer som sluter tätt. Vid ett takbyte byggs hela den kedjan upp på nytt.",
      "Rimbo blev tidigt en marknadsplats, där vattenled och landsväg möttes, och Rimbo marknad hålls fortfarande den första torsdagen i oktober. Samhället växte fram kring Rimbo station när järnvägen Länna–Norrtälje öppnade via Rimbo 1884, och året efter kom banan från Stockholm. Järnvägsepoken varade i cirka 80 år, och 1981 lades den sista linjen ned. Bebyggelsen har vuxit fram runt den gamla järnvägsknuten, en bit från kyrkan från 1400-talet.",
      "TP20 är en trapetsprofilerad plåt som läggs i långa längder och skruvas på läkt. Den är lätt jämfört med pannor, klarar lägre lutningar och finns i flera kulörer. Det gör den till ett vanligt val på villor, fritidshus, garage och tillbyggnader, eller på lägre takdelar i kombination med pannor. Vill du ha ett pannat tak är betongpannor eller lertegel alternativen. De är tyngre, och vid takkontrollen ser vi om takstolarna klarar vikten.",
      "Från Rimbo går bussar till Norrtälje, Stockholm, Uppsala och Hallstavik, och grannorter är bland annat Vallentuna och Edsbro.",
      "Ett takbyte innebär att allt från underlaget och uppåt byts. Det gamla taket rivs, nytt underlag och ny läkt läggs, och sedan monteras plåten eller pannorna. Nock, fotplåt, vindskivor och beslag kring skorsten och genomföringar görs om, och hängrännor och stuprör anpassas. I offerten står allt som ingår.",
      INCLUDES("Rimbo", "i"),
      PROCESS,
      ROT,
      COMPARE("Rimbo", "i"),
      CTA("Rimbo", "i"),
    ],
  },
  "takbyte-hallstavik": {
    title: "Takbyte i Hallstavik – kostnadsfri takkontroll",
    description:
      "Takbyte i Hallstavik och norra Roslagen: betongpannor, plåt eller lertegel till fast pris efter en kostnadsfri takkontroll. Utförande enligt AMA.",
    content: [
      "Ett tak som har börjat släppa in fukt, har spruckna pannor eller ett underlag som har gjort sitt, blir sällan bättre av att vänta. För dig som bor i Hallstavik eller i norra Roslagen går vi här igenom vad ett takbyte innebär, vilka material som är aktuella och hur du får ett fast pris innan arbetet börjar.",
      "Hallstavik ligger där Skeboån mynnar i Edeboviken, mitt i Roslagen. Fram till början av 1900-talet var Hallsta en by bland grannbyarna Tulka, Skärsta och Gottsta. Pappersbruket byggdes på byns utmarker vid viken, och när bruket expanderade växte Hallstavik till ett brukssamhälle. Bruket präglar fortfarande orten, med egen hamn och godsjärnväg.",
      "Ett tak utsätts under åren för regn, snö, frost och sol. I allmänhet får ett tak som ligger i skugga av träd eller vetter mot norr lättare mossa och påväxt, eftersom det torkar långsammare. Löv och barr kan också sätta igen hängrännor och ränndalar. Vid takkontrollen ser vi hur just ditt tak ligger till.",
      "Hallstavik ligger cirka fyra mil nordnordväst om Norrtälje, med riksväg 76 strax väster om orten. Ett exempel från närområdet är ett takbyte på Singö i Grisslehamn, med röda betongpannor på huvudtaket, röd TP20-plåt på de lägre delarna och byte av delar av råsponten, som blev klart i september 2026.",
      "Betongpannor är ett traditionellt val på villatak och finns i flera kulörer, till exempel rött och svart. Enskilda pannor kan bytas om någon skadas. Pannorna är tunga, så vid takkontrollen ser vi att takstolarna klarar vikten. På lägre takdelar, som tillbyggnader och garage, kan TP20-plåt vara ett bra komplement, precis som på Singö. Den som föredrar ett lättare tak kan välja plåt på hela huset.",
      "Ett takbyte är mer än nya pannor. Det gamla ytmaterialet rivs, underlaget byts och ny läkt läggs innan pannorna kommer på plats. Ibland behöver delar av råsponten bytas, vilket bedöms när taket är öppnat. Plåtdetaljer som fotplåt, vindskivor och skorstensbeslag görs om, och avvattningen anpassas till det nya taket.",
      INCLUDES("Hallstavik", "i"),
      PROCESS,
      ROT,
      COMPARE("Hallstavik", "i"),
      CTA("Hallstavik", "i"),
    ],
  },
  "takbyte-norrtalje": {
    title: "Takbyte i Norrtälje – fast pris och AMA",
    description:
      "Takbyte i Norrtälje och Roslagen: lertegel, betongpannor eller plåt till fast pris. Boka en kostnadsfri takkontroll utan förpliktelser.",
    content: [
      "Inför vintern, eller när våren närmar sig, börjar många fundera på taket. Ett takbyte är lättast att genomföra när det är planerat i god tid, med material, kulör och pris klara innan arbetet börjar. Här går vi igenom vad ett takbyte i Norrtälje innebär och hur du kommer igång med en kostnadsfri takkontroll.",
      "Ett tak ska klara allt från höstregn och blötsnö till frost och sommarsol. I allmänhet är det underlaget och detaljerna som avgör hur länge taket håller: ett tätt underlag, rätt läkt, plåt som sluter tätt runt skorsten och genomföringar och en avvattning som leder bort vattnet. Hur ditt tak ligger till ser vi vid takkontrollen.",
      "Två exempel från närområdet är ett takbyte på Blidö, med svarta betongpannor från Benders, nytt underlag och ny läkt, och ett takbyte på Singö i Grisslehamn, där huset fick röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna, och delar av råsponten byttes. Norrtälje ligger längst in i Norrtäljeviken, cirka sju mil nordost om Stockholm.",
      "Norrtälje grundades som stad av Gustav II Adolf 1622, men redan på 1200-talet ska det ha funnits en handelsplats i viken. Staden brändes 1719 och byggdes långsamt upp igen, och enligt stadens historia uppfördes då mest små stugor med torvtak. Efter 1844 växte ett kurortsliv fram, och när järnvägen Länna–Norrtälje öppnade 1884 fick staden ett uppsving som industriort.",
      "Lertegel är bränd lera och ger det klassiska tegeltaket, som åldras med patina. Det passar särskilt bra där huset redan har tegeltak och uttrycket är viktigt. Betongpannor har ett liknande utseende, finns i flera kulörer och kan vara ett alternativ. Båda är tunga, så takstolarna måste klara vikten. För ett lättare tak finns TP20 och dubbelfalsad plåt.",
      "Vid ett takbyte byts hela taket. Det gamla ytmaterialet rivs, nytt underlag och ny läkt läggs, och därefter monteras det nya materialet. Fotplåt, vindskivor, nock och beslag runt skorsten och genomföringar görs om, och hängrännorna anpassas. Behöver delar av råsponten bytas, som på Singö, framgår det när taket är öppnat.",
      INCLUDES("Norrtälje", "i"),
      PROCESS,
      ROT,
      COMPARE("Norrtälje", "i"),
      CTA("Norrtälje", "i"),
    ],
  },
  "takomlaggning-taby": {
    title: "Takomläggning i Täby – fast pris efter takkontroll",
    description:
      "Lägga om taket i Täby? Vi lägger om med betongpannor, lertegel eller plåt till fast pris efter en kostnadsfri takkontroll. Utförande enligt AMA.",
    content: [
      "Till skillnad från en mindre reparation, där enstaka pannor eller en plåtdetalj åtgärdas, innebär en takomläggning att taket byggs upp på nytt från underlaget. Ordet takomläggning är vanligt när man letar efter hjälp med ett gammalt tak. Här förklarar vi, för dig som bor i Täby, vad det innebär, när det är rätt åtgärd och hur du får ett fast pris.",
      "Takomläggning och takbyte beskriver i stort sett samma arbete. Ytmaterialet tas bort, underlaget och läkten byts, och därefter läggs taket på nytt. Skillnaden ligger mest i hur ordet används: vid en omläggning väljer man ofta samma typ av material som tidigare, till exempel betongpannor igen. Plåtdetaljer, nock och avvattning ses över i samma arbete.",
      "Täby kyrka uppfördes när kristendomen kom, och kring den växte Täby kyrkby fram. Under samma århundrade byggdes Näsby slott, vars första kände ägare var riddaren Karl Estridsson Natt och Dag. Karby gård kan spåras till 1300-talet, då Heliga Birgittas far ägde den. Enligt kommunens historia återfinns medeltidens gårdsnamn i dag som namn på stadsdelar. Täby blev köping 1948 och kommun 1971.",
      "Täby gränsar till Vallentuna i norr, Österåker i öster, Danderyd i söder och Sollentuna och Upplands Väsby i väster, ungefär fem mil sydväst om Norrtälje.",
      "Har huset betongpannor i dag är det vanligt att lägga om med nya betongpannor. Taket får då samma pannade uttryck som tidigare, och i ett område där grannarnas tak ser likadana ut smälter det nya taket in. Betongpannor finns i flera kulörer, till exempel svart och rött, och enskilda pannor kan bytas om någon skadas. De är tunga, men har huset haft betongpannor förut har takstolarna redan burit liknande vikt. Det kontrolleras ändå vid takkontrollen. Lertegel och plåt är alternativ om du vill byta uttryck.",
      "En reparation räcker när skadan är begränsad, till exempel några spruckna pannor eller ett skadat beslag. När underlaget är slitet över stora delar av taket, eller när skadorna återkommer på flera ställen, är en omläggning ofta det som ger ett tak att lita på. Vilket som gäller för ditt tak ser vi först på plats.",
      INCLUDES("Täby", "i"),
      PROCESS,
      ROT,
      COMPARE("Täby", "i"),
      CTA("Täby", "i"),
    ],
  },
  "takomlaggning-vallentuna": {
    title: "Takomläggning i Vallentuna – kostnadsfri takkontroll",
    description:
      "Takomläggning i Vallentuna med lertegel, betongpannor eller plåt. Fast pris efter en kostnadsfri takkontroll utan förpliktelser. Utförande enligt AMA.",
    content: [
      "Har taket på ditt hus i Vallentuna börjat visa sin ålder är en omläggning ett av alternativen att överväga. En takomläggning är ett stort men avgränsat projekt: taket byggs upp på nytt, ofta med samma sorts material som förut. Här går vi igenom vad omläggningen innebär och hur du kommer igång.",
      "När ett tak läggs om rivs det gamla ytmaterialet, och underlaget och läkten byts innan nytt material läggs på. Arbetet omfattar alltså lika mycket som ett takbyte, och orden används ofta om varandra. Omläggning säger man gärna när taket får samma typ av material igen, till exempel tegel mot tegel. Nock, fotplåt, vindskivor och beslag ingår i samma arbete.",
      "Vallentuna tätort sträcker sig från Täby kyrkby i söder upp till Ormsta i norr. Ett grönstråk från Vallentunasjön genom Karby mot Ullnasjön skiljer fortfarande tätorten från Täby. En av de första skolorna, Veda skola, togs i bruk redan 1884 och hette då Ubby skola. I dag har Roslagsbanan fyra hållplatser i Vallentunadelen av tätorten: Ormsta, Vallentuna, Bällsta och Kragstalund.",
      "I Vallentuna finns villor, kedjehus och radhus från flera decennier, och därför kan taken se mycket olika ut även inom samma område. Ett tak som redan har lagts om en gång kan vara i gott skick, medan grannhuset har kvar sitt första tak. Hur ditt tak mår syns inte alltid från marken. Tecken som fukt på vinden, lösa pannor eller rostig plåt är skäl att låta någon titta närmare.",
      "Har huset tegeltak i dag är lertegel det naturliga valet vid en omläggning. Lertegel är bränd lera, ger det klassiska tegeluttrycket och åldras med patina. Precis som betongpannor är tegel tungt, men takstolar som har burit tegel förut brukar vara byggda för det. Det kontrolleras ändå vid takkontrollen. Vill du byta uttryck kan betongpannor eller plåt vara alternativ. Tänk på att tegelplåt inte är samma sak som lertegel.",
      "Vallentuna ligger ungefär fyra och en halv mil sydväst om Norrtälje, med Täby, Åkersberga och Rimbo runt om.",
      INCLUDES("Vallentuna", "i"),
      PROCESS,
      ROT,
      COMPARE("Vallentuna", "i"),
      CTA("Vallentuna", "i"),
    ],
  },
  "takomlaggning-akersberga": {
    title: "Takomläggning i Åkersberga – fast pris och AMA",
    description:
      "Takomläggning i Åkersberga och Österåker med plåt, betongpannor eller lertegel. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    content: [
      "Plåt, betong eller tegel? Frågan kommer ofta upp när ett tak i Åkersberga ska läggas om. Vid en takomläggning byggs taket upp på nytt, och det är ett bra tillfälle att fundera på om samma material ska läggas igen eller om huset ska få ett annat tak. Här går vi igenom vad omläggningen innebär och hur du får ett fast pris.",
      "Vid en takomläggning tas det gamla ytmaterialet bort, och därefter byts underlaget och läkten. Sedan läggs det nya materialet, och plåtdetaljer som fotplåt, vindskivor och nock görs om. Arbetet är i stort sett detsamma som vid ett takbyte, och ordet omläggning används ofta när taket får samma typ av material som förut.",
      "Åkersberga blev centralort i Österåkers kommun när det kommunala centralortsbegreppet infördes 1971. Mellan 1974 och 1983 var orten centralort i Vaxholms kommun, och efter delningen blev den åter Österåkers centralort. Centrumet består av Skutan från 1976 och Kajutan från 1995, och på 1990-talet skapades Åkersbergatunneln genom överdäckning av en genomfartsled.",
      "TP20 är en trapetsprofilerad plåt som skruvas på läkt i långa längder. Den är lätt jämfört med pannor, klarar lägre lutningar och finns i flera kulörer. Det gör TP20 till ett vanligt val på villor, fritidshus och garage, och på lägre takdelar kombineras den ofta med pannor. Ett byte från pannor till plåt gör taket lättare, men ger också ett annat uttryck. Betongpannor och lertegel är alternativen för den som vill behålla det pannade taket, och dubbelfalsad plåt ger ett stramare plåttak utan synliga skruvar.",
      "Från Åkersberga station går bussar till bland annat Danderyd, Ljusterö, Norrtälje och Kista. Åkersberga ligger ungefär fyra mil sydväst om Norrtälje.",
      "Ett tak behöver inte alltid läggas om. Är skadorna begränsade kan en reparation räcka. När underlaget är slitet på stora delar av taket, när läckorna återkommer eller när ytmaterialet har åldrats över hela taket, är en omläggning ofta den åtgärd som håller. Vilket som gäller ser vi vid takkontrollen.",
      INCLUDES("Åkersberga", "i"),
      PROCESS,
      ROT,
      COMPARE("Åkersberga", "i"),
      CTA("Åkersberga", "i"),
    ],
  },
  "takomlaggning-rimbo": {
    title: "Takomläggning i Rimbo – kostnadsfri takkontroll",
    description:
      "Takomläggning i Rimbo med dubbelfalsad plåt, TP20, betongpannor eller lertegel. Fast pris efter en kostnadsfri takkontroll utan förpliktelser.",
    content: [
      "Bor du i Rimbo eller i byarna runt omkring och undrar om taket behöver läggas om? En takomläggning är ett stort beslut, men inte svårt om du vet vad som ingår. Här förklarar vi vad omläggningen innebär, vilka material som passar och hur du får ett fast pris innan något arbete börjar.",
      "Rimbo är en tätort i Norrtälje kommun, med bebyggelse som har vuxit fram runt den gamla järnvägsknuten. Behoven ser olika ut från tak till tak. Ett tak som redan har lagts om kan ha många år kvar, medan ett annat har nått den punkt där en omläggning är det rimliga. Det avgörs bäst på plats.",
      "Vid en omläggning tas det gamla ytmaterialet bort, underlaget och läkten byts och taket läggs på nytt. Omfattningen är densamma som vid ett takbyte. Ordet används ofta när samma typ av material läggs igen, men det går också att byta material i samma arbete. Plåtdetaljer, nock och hängrännor ses över samtidigt.",
      "Orten nämns i skrift redan 1303, som ecclesie Ringboheredhi, och 1498 som Rimbo sochn. Tingsstället för Sjuhundra härad flyttade 1870, och i stället för gästgiveriet kom järnvägsstation och hotell. Rimbo blev municipalsamhälle 1914 och ingår sedan 1971 i Norrtälje kommun. År 1898 öppnade järnvägssträckan från Rimbo mot Hallstavik. Stenkyrkan, invigd åt aposteln Andreas, uppfördes under 1400-talets senare hälft.",
      "Dubbelfalsad plåt, eller bandtäckning, består av plåtbanor som fogas ihop i långsidan och fästs med dolda klammer. Taket får ett stramt och klassiskt uttryck utan synliga skruvar. Metoden kräver hantverksmässigt plåtslageri och passar på villor och äldre hus, även på lägre lutningar och kring kupor och ränndalar. TP20 är ett enklare plåtalternativ som skruvas, medan betongpannor och lertegel ger det pannade taket.",
      "Rimbo ligger cirka två mil väster om Norrtälje, längs riksväg 77.",
      INCLUDES("Rimbo", "i"),
      PROCESS,
      ROT,
      COMPARE("Rimbo", "i"),
      CTA("Rimbo", "i"),
    ],
  },
  "takomlaggning-hallstavik": {
    title: "Takomläggning i Hallstavik – fast pris och AMA",
    description:
      "Takomläggning i Hallstavik och norra Roslagen med plåt eller pannor. Kostnadsfri takkontroll utan förpliktelser, fast pris och utförande enligt AMA.",
    content: [
      "Behöver ditt tak läggas om? För dig som bor i Hallstavik eller i byarna runt Edeboviken förklarar vi här vad en takomläggning innebär, när den behövs och vilka material som är aktuella. Oavsett vad du väljer börjar vi med en kostnadsfri takkontroll, och därefter får du ett fast pris.",
      "TP20 är en trapetsprofilerad plåt i långa längder som skruvas fast på läkt. Den är lätt jämfört med pannor, klarar lägre lutningar och finns i flera kulörer, och den passar villor, fritidshus, garage och uthus. Den fungerar också bra på lägre takdelar tillsammans med pannor, som på ett takbyte på Singö i Grisslehamn, med röda betongpannor på huvudtaket och röd TP20 på de lägre delarna.",
      "Hallstavik har länge haft järnväg. Tidigare gick en smalspårig bana till Stockholm via Rimbo. Persontrafiken upphörde 1966 och godstrafiken 1977, när pappersbruket fick en normalspårig ersättning via Hargshamn till Örbyhus. Rälsen revs 1978, men banvallen används delvis som cykel- och vandringsled. I dag går linjen Örbyhus–Hallstavik med gods från Hallsta pappersbruk.",
      "Hallstavik ligger cirka fyra mil nordnordväst om Norrtälje och drygt sex mil ostnordost om Uppsala. Singö i Grisslehamn ligger drygt en mil bort.",
      "En takomläggning innebär att det gamla ytmaterialet rivs, att underlag och läkt byts och att taket läggs på nytt. Det är i stort sett samma arbete som ett takbyte, och ordet används ofta när samma material läggs igen. När skadorna är få och avgränsade kan en reparation räcka. Är underlaget slitet på stora delar av taket är en omläggning oftast det som håller i längden.",
      "Fukt eller fläckar på vinden, pannor som har spruckit eller flyttat sig, rostig eller lös plåt och hängrännor som svämmar över är vanliga tecken på att ett tak behöver ses över. I allmänhet torkar ett tak i skugga av träd långsammare, och löv och barr kan sätta igen rännorna.",
      INCLUDES("Hallstavik", "i"),
      PROCESS,
      ROT,
      COMPARE("Hallstavik", "i"),
      CTA("Hallstavik", "i"),
    ],
  },
  "takomlaggning-norrtalje": {
    title: "Takomläggning i Norrtälje – kostnadsfri takkontroll",
    description:
      "Takomläggning i Norrtälje med betongpannor, lertegel eller plåt. Fast pris efter en kostnadsfri takkontroll utan förpliktelser. Utförande enligt AMA.",
    content: [
      "Ett tak som läcker vid skorstenen, har pannor som har börjat spricka eller ett underlag som har blivit mjukt kan sällan lagas bit för bit i längden. Då är en takomläggning ofta det som ger ett tak att lita på igen. Här beskriver vi vad en omläggning i Norrtälje innebär och hur du får ett fast pris.",
      "Vid en takomläggning tas det gamla ytmaterialet ner. Underlaget och läkten byts, och sedan läggs taket på nytt, ofta med samma sorts material som tidigare. Nock, fotplåt, vindskivor och beslag kring skorsten och ventilation görs om, och avvattningen anpassas. Omfattningen är densamma som vid ett takbyte, och båda orden används om samma arbete.",
      "Inom den gamla stadsgränsen har man funnit omkring 225 fornlämningar, främst gravar från yngre järnåldern. Namnet skrevs 1298 Telgium och 1409 Norra Tælgha och har tolkats som \"de som bor vid den långa viken\". Gevärsfaktoriets sänksmidesverkstad står kvar och har sedan 1920-talet varit stadens museum. År 1846 fick staden ångbåtsförbindelse med Stockholm, och spannmålslagringen gav senare staden dess karaktäristiska silotorn.",
      "Betongpannor är ett vanligt val när ett pannat tak läggs om. De finns i flera kulörer och enskilda pannor kan bytas om någon skadas. Ett exempel från närområdet är ett takbyte på Blidö, med svarta betongpannor från Benders, nytt underlag och ny läkt. Pannorna är tunga, och vid takkontrollen ser vi att takstolarna klarar vikten. Lertegel och plåt är alternativ om du vill ha ett annat uttryck.",
      "Norrtälje ligger längst in i Norrtäljeviken, cirka sju mil nordost om Stockholm och drygt sju mil öster om Uppsala. Blidö ligger knappt två mil bort.",
      "En reparation räcker när skadan är avgränsad, till exempel ett skadat skorstensbeslag eller några trasiga pannor. Återkommer läckorna, eller är underlaget slitet på flera ställen, är en omläggning oftast bättre. Vad som gäller för ditt tak avgörs vid takkontrollen.",
      INCLUDES("Norrtälje", "i"),
      PROCESS,
      ROT,
      COMPARE("Norrtälje", "i"),
      CTA("Norrtälje", "i"),
    ],
  },
  "takrenovering-taby": {
    title: "Takrenovering i Täby – kostnadsfri takkontroll",
    description:
      "Takrenovering i Täby: vi bedömer om taket kan renoveras eller behöver bytas och lämnar fast pris efter en kostnadsfri takkontroll.",
    content: [
      "Ett tak som har börjat läcka vid en genomföring, har några trasiga pannor eller en plåtdetalj som har släppt behöver inte alltid bytas helt. Ofta räcker det att åtgärda det som är skadat. För dig som bor i Täby förklarar vi här vad en takrenovering kan omfatta, var gränsen mot ett takbyte går och hur du får ett fast pris.",
      "Området som i dag är Täby låg under havsytan fram till bronsåldern. För omkring 3 000 år sedan kom de första fasta bosättningarna, och vikingatiden blev bygdens första storhetstid. Enligt kommunens historia finns 37 runstenar i kommunen, liksom varggropar och kvarnstenar. I dag finns två naturreservat: Rönninge by–Skavlöten, bildat 2002, och Täby prästgård, bildat 2016. I nordost ligger Fågelsångsmossen, en av Stockholmstraktens få högmossar.",
      "En takrenovering riktar in sig på de delar av taket som behöver åtgärdas, i stället för att hela taket byggs om. Det kan handla om att byta spruckna eller förskjutna pannor, göra om beslag kring skorsten och ventilation, byta fotplåt eller vindskivor eller se över hängrännor och stuprör. Vad som behövs på just ditt tak framgår av takkontrollen, och allt som ingår står i offerten.",
      "Dubbelfalsad plåt, även kallad bandtäckning, har banor som fogas ihop i långsidan och fästs med dolda klammer. Ett sådant tak har inga synliga skruvar, men falsar, skarvar och anslutningar mot skorsten och kupor behöver vara täta. Det är ofta där en renovering sätter in, eftersom ett dubbelfalsat tak kan ha lång tid kvar även om en detalj har skadats. Arbetet kräver hantverksmässigt plåtslageri.",
      "När skadorna är avgränsade kan en renovering räcka. Om underlaget är slitet över stora delar av taket, eller om läckorna återkommer på flera ställen, är ett takbyte eller en omläggning ofta det som håller i längden. Vi bedömer det vid takkontrollen.",
      "Alla tre grenarna av Roslagsbanan går genom Täby. Kommunen ligger ungefär fem mil sydväst om Norrtälje.",
      INCLUDES("Täby", "i"),
      PROCESS,
      ROT,
      COMPARE("Täby", "i"),
      CTA("Täby", "i"),
    ],
  },
  "takrenovering-vallentuna": {
    title: "Takrenovering i Vallentuna – fast pris och AMA",
    description:
      "Takrenovering i Vallentuna: byte av pannor, plåt och avvattning när hela taket inte behöver bytas. Kostnadsfri takkontroll och fast pris.",
    content: [
      "Drygt fyra mil sydväst om Norrtälje ligger Vallentuna. För dig som bor här och har ett tak som behöver åtgärdas men kanske inte bytas helt, förklarar vi vad en takrenovering innebär. Vi går igenom vilka delar som kan åtgärdas och hur du får ett fast pris efter en kostnadsfri takkontroll.",
      "På 1930- och 40-talen fanns i kommunen folkskolorna Röda skolan, Vita skolan och Hjälmstaskolan, och i centralorten fanns bland annat ett stationshus med servering, en polisstation och en biograf. Vallentuna påverkades bara måttligt av andra världskriget. Ortsborna gjorde värnplikt, handlade med ransoneringskort och ordnade insamlingar. Fram till 1992 hade tätorten ett eget riktnummer, 0762, och ingår sedan dess i Stockholms riktnummerområde.",
      "En takrenovering är till för tak där underlaget i stort sett fortfarande håller, men där vissa delar har gjort sitt. Det kan vara pannor som har spruckit, plåtdetaljer som har släppt, en läckande anslutning vid skorstenen eller hängrännor som behöver bytas. I stället för att bygga om hela taket åtgärdas det som behövs. Vad som ingår står i offerten efter takkontrollen.",
      "Vallentuna har villor, kedjehus och radhus från flera decennier. Därför ser taken olika ut även inom samma område, och ett tak som har lagts om kan ha helt andra behov än grannens. Ett tak kan se helt ut från gatan och ändå ha skador vid genomföringar eller i ränndalar. Hur ditt tak ligger till avgörs bäst på plats.",
      "TP20 är en trapetsprofilerad plåt som skruvas på läkt. Den är lätt, klarar lägre lutningar och används på villor, garage och tillbyggnader. På ett TP20-tak är det ofta skruvarna, skarvarna och kanterna som behöver ses över. En lös skruv eller en skadad skarv kan släppa in vatten, men betyder inte alltid att hela taket måste bytas. Repor i ytbehandlingen bör åtgärdas tidigt, så att rost inte får fäste. På takkontrollen bedömer vi om en renovering räcker.",
      "Vallentuna ligger ungefär fyra och en halv mil sydväst om Norrtälje.",
      INCLUDES("Vallentuna", "i"),
      PROCESS,
      ROT,
      COMPARE("Vallentuna", "i"),
      CTA("Vallentuna", "i"),
    ],
  },
  "takrenovering-akersberga": {
    title: "Takrenovering i Åkersberga – kostnadsfri takkontroll",
    description:
      "Takrenovering i Åkersberga och Österåker: vi åtgärdar pannor, plåt och avvattning när hela taket inte behöver bytas. Fast pris efter takkontroll.",
    content: [
      "Behöver hela taket bytas, eller räcker det att åtgärda delar av det? Svaret beror på underlaget och på hur utbredda skadorna är. För dig i Åkersberga och Österåker går vi här igenom vad en takrenovering kan omfatta, när den räcker och hur du får ett fast pris.",
      "En takrenovering passar när underlaget i stort sett är i gott skick, men enskilda delar behöver åtgärdas. Det kan vara pannor som har spruckit eller flyttat sig, en läcka vid skorstenen, lösa plåtdetaljer eller hängrännor som inte längre leder bort vattnet. Är underlaget slitet på stora delar av taket, eller återkommer läckorna, är ett takbyte ofta bättre. Vi bedömer vilket som gäller vid takkontrollen.",
      "På 1930-talet hade Åkersberga 286 invånare och grannorten Österskär 277. Sedan 1950 räknas de som sammanvuxna, och 2016 hade tätorten drygt 33 000 invånare. Österskär har av gammal hävd kvar sin egen postadress, medan postorten Åkersberga omfattar större delen av kommunens fastland. Centrumet, med ett sextiotal butiker, byggdes ut med omkring 8 000 kvadratmeter butiksyta 2010.",
      "Betongpannor är vanliga på villatak och har fördelen att enskilda pannor går att byta om någon spricker eller skadas. Vid en renovering kan trasiga pannor ersättas, nockpannor fästas om och pannor runt genomföringar läggas rätt. Ytskiktet på betongpannor kan åldras med tiden, och på skuggiga delar av taket kan mossa och påväxt bli ett problem. Om ytskiktet har åldrats över hela taket kan ett byte vara det rimliga, och det ser vi vid takkontrollen. Vid en renovering kan det också vara aktuellt att fästa om läkt där pannor har legat löst och att kontrollera att fotplåten leder vattnet ut i rännan i stället för in under pannorna.",
      "Åkersberga ligger ungefär fyra mil sydväst om Norrtälje, och Roslagsbanan har fyra stationer inom tätorten.",
      INCLUDES("Åkersberga", "i"),
      PROCESS,
      ROT,
      COMPARE("Åkersberga", "i"),
      CTA("Åkersberga", "i"),
    ],
  },
  "takrenovering-rimbo": {
    title: "Takrenovering i Rimbo – fast pris efter takkontroll",
    description:
      "Takrenovering i Rimbo: byte av tegelpannor, plåtdetaljer och hängrännor när hela taket inte behöver bytas. Kostnadsfri takkontroll och fast pris.",
    content: [
      "Till skillnad från ett takbyte, där allt från underlaget och uppåt görs om, handlar en takrenovering om att åtgärda det som faktiskt är skadat. För dig som bor i Rimbo kan det vara ett sätt att få ett tätt tak utan att bygga om hela taket. Här går vi igenom vad renoveringen kan omfatta och hur du får ett fast pris.",
      "En takrenovering kan omfatta byte av spruckna eller förskjutna pannor, nya beslag kring skorsten och ventilation, ny fotplåt eller nya vindskivor och byte av hängrännor och stuprör. Ibland behöver också ränndalar göras om. Det viktiga är att underlaget i stort sett håller. Är det slitet på stora delar av taket är ett takbyte eller en omläggning oftast bättre.",
      "Järnvägarna till och från Rimbo började avvecklas under 1960-talet, när person- och godstrafiken successivt lades ned. Enligt ortens historia arbetar i dag en förening för att få tillbaka järnvägstrafiken. Rimbo marknad beskrivs som Sveriges största endagsmarknad och har sedan 1962 arrangerats av Rimbo IF. På orten finns också regionens största tvätteri, Textilia, och viss tillverkningsindustri.",
      "Lertegel är bränd lera och ger det klassiska tegeltaket, som åldras med patina. En fördel med tegel är att enskilda pannor kan bytas när någon spricker. Vid en renovering byts trasiga pannor ut, nockar fästs om och anslutningarna vid skorsten och genomföringar görs täta. Det gäller att hitta pannor som passar ihop med de befintliga, vilket vi tittar på vid takkontrollen. Är underlaget på ett tegeltak slitet över stora delar av taket är en omläggning ofta det bättre valet.",
      "Fukt eller fläckar på vinden, spruckna pannor, lösa eller rostiga plåtdetaljer och hängrännor som svämmar över är vanliga tecken. Ett tak kan se helt ut från marken och ändå ha skador vid genomföringarna. Därför börjar vi alltid med en takkontroll på plats.",
      "Rimbo ligger cirka två mil väster om Norrtälje, med busslinjer mot Stockholm, Uppsala och Hallstavik.",
      INCLUDES("Rimbo", "i"),
      PROCESS,
      ROT,
      COMPARE("Rimbo", "i"),
      CTA("Rimbo", "i"),
    ],
  },
  "takrenovering-hallstavik": {
    title: "Takrenovering i Hallstavik – kostnadsfri takkontroll",
    description:
      "Takrenovering i Hallstavik och norra Roslagen: plåt, pannor och avvattning åtgärdas när hela taket inte behöver bytas. Fast pris efter takkontroll.",
    content: [
      "Snö, frost och blöta perioder sliter på ett tak, men ett tak med skador behöver inte alltid bytas helt. Ibland räcker det att åtgärda vissa delar. För dig som bor i Hallstavik förklarar vi vad en takrenovering kan omfatta och hur du får ett fast pris efter en kostnadsfri takkontroll.",
      "Hallsta pappersbruk ägs av Holmen och har en egen hamn för export av papper och import av förnödenheter. Orten är också känd för speedwaylaget Rospiggarna, som har vunnit fem SM-guld, och för motorsportklubben MK Orion med Sipsjöbanan. Hallstavik ligger i Häverö socken, och strax utanför samhället finns en golfbana med 18 hål.",
      "Snö som ligger länge belastar ytmaterialet och avvattningen, och frost kan förvärra sprickor som redan finns. I allmänhet får ett tak i skugga av träd lättare mossa och påväxt, och löv och barr kan sätta igen rännor och ränndalar. Vilka förhållanden som gäller för ditt hus ser vi vid takkontrollen.",
      "Ett dubbelfalsat plåttak, eller bandtäckning, består av plåtbanor som viks ihop två gånger i långsidan och fästs med dolda klammer. Det ger ett stramt tak utan synliga skruvar. På den här typen av tak är det ofta anslutningar, falsar och detaljer vid skorsten, kupor och ränndalar som behöver åtgärdas. En skadad detalj betyder inte alltid att hela taket måste bytas. Arbetet kräver hantverksmässigt plåtslageri.",
      "Vid en takrenovering åtgärdas de delar som behöver det: pannor, plåtdetaljer, beslag, fotplåt, vindskivor eller hängrännor. Hängrännor och stuprör som har rostat eller lossnat kan bytas separat, liksom fotplåt och vindskivor som har skadats. Underlaget ska i stort sett hålla. Om det är slitet över stora delar av taket, eller om läckorna återkommer på flera ställen, är ett takbyte ofta bättre. Vi bedömer det vid takkontrollen.",
      "Hallstavik ligger cirka fyra mil nordnordväst om Norrtälje. Från orten går bussar till bland annat Herräng, Älmsta och Östhammar.",
      INCLUDES("Hallstavik", "i"),
      PROCESS,
      ROT,
      COMPARE("Hallstavik", "i"),
      CTA("Hallstavik", "i"),
    ],
  },
  "takrenovering-norrtalje": {
    title: "Takrenovering i Norrtälje – fast pris och AMA",
    description:
      "Takrenovering i Norrtälje: vi åtgärdar plåt, pannor och avvattning när hela taket inte behöver bytas. Kostnadsfri takkontroll och fast pris.",
    content: [
      "Plåt, pannor eller en kombination? Ett hus kan ha olika material på olika delar av taket, och ibland är det bara en del som behöver åtgärdas. För dig i Norrtälje förklarar vi här vad en takrenovering innebär, var gränsen mot ett takbyte går och hur du får ett fast pris efter en kostnadsfri takkontroll.",
      "Norrtälje grundades som stad 1622, egen församling 1643 och fick egen borgmästare 1678. Enligt stadens historia hade den omkring 200 hus år 1702. Efter branden 1719 gick återuppbyggnaden långsamt. Gevärsfaktoriet privatiserades 1757, och senare kom bland annat ett bomullsspinneri och en klädesfabrik. Under 1840-talet ersattes vapentillverkningen av ett sågverk vid Kvarnholmen i Norrtäljeån.",
      "En takrenovering riktar in sig på de delar som behöver åtgärdas: trasiga pannor, lösa eller rostiga plåtdetaljer, beslag kring skorsten och genomföringar, fotplåt, vindskivor eller hängrännor. Underlaget ska i stort sett hålla. Om det är slitet över stora delar av taket, eller om läckorna återkommer, är ett takbyte oftast bättre. Vad som gäller för ditt tak avgörs vid takkontrollen, och allt som ingår står i offerten.",
      "TP20 är en trapetsprofilerad plåt som skruvas i långa längder på läkt. Den är lätt, klarar lägre lutningar och används ofta på lägre takdelar tillsammans med pannor. Ett exempel från närområdet är ett takbyte på Singö i Grisslehamn, med röd TP20 på de lägre delarna och röda betongpannor på huvudtaket. På ett TP20-tak är det oftast skruvar, skarvar, kanter och ytbehandling som behöver åtgärdas, och rost i skarvar bör tas om hand tidigt. Enstaka betongpannor på huvudtaket kan bytas i samma arbete om några har spruckit.",
      "Norrtälje ligger längst in i Norrtäljeviken, cirka sju mil nordost om Stockholms centrum. Singö ligger knappt tre mil bort och Blidö knappt två.",
      INCLUDES("Norrtälje", "i"),
      PROCESS,
      ROT,
      COMPARE("Norrtälje", "i"),
      CTA("Norrtälje", "i"),
    ],
  },
};
