export interface LocationData {
  slug: string;
  name: string;
  region: string;
  isIsland: boolean;
  description: string;
  longDescription: string;
  nearbyLocations: string[];
  /** Extra unique paragraph for SEO depth — rendered below longDescription */
  extraContent: string;
  /** Location-specific unique FAQ (on top of generic ones) */
  uniqueFAQ: { question: string; answer: string };
  /** Primary keyword phrase for this page, used in H-tags */
  primaryKeyword: string;
  /** Geo coordinates for local SEO */
  lat: number;
  lng: number;
  /**
   * Datadriven faktaruta för villaområden (SEO-programmet, villaomraden/seo-plan-omraden.md
   * våg 0+). Bara satt för orter med egen, källbelagd områdestext från Innehåll — se
   * ledning/marknad/villaomraden/texter/. Renderas i samma stil som LocalFact-rutan.
   */
  factBox?: { label: string; value: string }[];
  /**
   * För villaområden som är en del av en ort, inte en egen ort (t.ex. Ella gård i Täby).
   * Styr brödsmula och länken högst upp på sidan (SEO-programmet villaomraden våg 1+).
   * name kan skilja sig från slugens ort (t.ex. "Österåker" som visningsnamn för
   * /taklaggare-akersberga) när området hör till en kommun utan egen ortssida.
   */
  parentLocation?: { name: string; slug: string };
  /** Manuell H1 för villaområden vars namnmönster inte passar standardmallen. */
  h1Override?: string;
  /**
   * Egna rubriker under extraContent, t.ex. "Vad det betyder för taket" (områdessidor). Texten
   * är ordagrant ur Innehålls godkända fil och visas likadant i React och i prerender.
   */
  extraSections?: { heading: string; text: string }[];
  /**
   * Blocket "Så går det till" på områdessidor: numrerade steg (med **fet** inledning) och
   * därefter garanti-/ROT-stycket och slutmeningen, ordagrant ur Innehålls godkända fil.
   */
  process?: { steps: string[]; paragraphs: string[] };
  /**
   * Källattribuering för en specifik uppgift på sidan (t.ex. en kommunal kulturmiljöriktlinje),
   * renderad som en synlig länk under faktarutan. Kontrollera källan live innan publicering.
   */
  sourceLink?: { label: string; url: string };
}

export const locations: LocationData[] = [
  {
    slug: "blido",
    name: "Blidö",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takbyte på Yxlan och Blidö: byar från 1700- och 1800-talen, sommarhus från 1900-talets början och sportstugor. Kostnadsfri takkontroll.",
    longDescription:
      "Yxlan och Blidö ligger i Blidö socken i skärgården sydost om Norrtälje, Yxlan mellan Furusund och Blidö. Yxlan är enligt Wikipedia omkring 15 kilometer lång, en dryg kilometer bred och mestadels skogklädd. Ingen av öarna har bro. Sedan 1954 går vägfärja mellan Furusund och Köpmanholm på Yxlan, och en annan färja går mellan Larshamn på Yxlan och Norrsund på Blidö. År 2020 hade Blidö 597 bofasta invånare och Yxlan 357. Byarna har lång historia. Yxlö, mitt på Yxlan, brändes av ryssarna 1719 och byggdes upp igen, och prästgården där uppfördes 1752. I Alsvik återuppfördes gårdarna efter 1719 på höjden norr om Byviken, och vid storskiftet 1780 hade byn nio gårdar. Kolsvik fick sitt nuvarande läge vid laga skiftet 1827–1833, då flera gårdar flyttades ut. Köpmanholm fick sin bebyggelse i början av 1800-talet och blev lotssamhälle 1828. På Blidö är kyrkan mitt på ön från 1859, och på Oxhalsö finns ett båtsmanstorp från 1730-talet. Sommargäster har funnits på Blidö sedan slutet av 1800-talet, och reguljär ångbåtstrafik genom Blidösund började 1876. I Kolsvik byggdes enligt Wikipedia flera sommarhus och villor i början av 1900-talet, och i början av 1950-talet började tomter säljas till sportstugor på Norrskogen. Norrtälje kommun beskriver samma mönster för hela kommunen: sommarvillor från slutet av 1800-talet, sportstugor från 1930-talet och en snabb utbyggnad av fritidshus från efterkrigstiden fram till 1970-talet. Sportstugan var enligt kommunen en enkel stuga i ett plan i kuperad terräng.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Delområden","value":"Blidö (Oxhalsö, Glyxnäs, Norrsund), Yxlan (Köpmanholm, Yxlö, Alsvik, Kolsvik, Vagnsunda)"},{"label":"Hustyper","value":"Gårdar i byarna, sommarhus och villor, sportstugor och fritidshus"},{"label":"Byggperiod","value":"Byar återuppbyggda efter 1719 och flyttade vid skiftena, sommarhus och villor i Kolsvik från 1900-talets början, sportstugetomter från början av 1950-talet"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 600 (SCB, 2025)"}],
    sourceLink: {"label":"Wikipedia: Blidö","url":"https://sv.wikipedia.org/wiki/Blid%C3%B6"},
    parentLocation: {"name":"Norrtälje","slug":"norrtalje"},
    h1Override: "Takläggare på Blidö, Norrtälje",
    uniqueFAQ: {"question":"När byggdes husen på Blidö?","answer":"Byggperiod enligt källorna: byarna återuppbyggda efter 1719 och flyttade vid skiftena, sommarhus och villor från 1900-talets början, sportstugetomter från början av 1950-talet. Hustyper: gårdar i byarna, sommarhus och villor, sportstugor och fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Blidö",
    lat: 59.6167,
    lng: 18.8333,
    nearbyLocations: ["Yxlan", "Furusund", "Rådmansö"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Sommarhusen och villorna från 1900-talets början är i dag runt 120 år gamla, och en sportstuga på en tomt som såldes i början av 1950-talet är upp emot 75 år. På så gamla hus kan taken redan ha lagts om, kanske flera gånger, och husets ålder säger därför lite om takets skick. Det som spelar roll är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. En enkel stuga som har byggts till i omgångar har tak från olika tider, och skarven mellan delarna är värd en extra titt. På en gård eller en större tomt finns ofta fler tak än bostadshusets, till exempel uthus och sjöbod, och varje tak bedöms för sig. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Yxlan eller Blidö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "ljustero",
    name: "Ljusterö",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takbyte på Ljusterö: sommarvillor från 1900-talets början, fritidshusområden från 1950- och 1960-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Ljusterö ligger i Österåkers kommun och nås med vägfärjan Ljusteröleden, som sedan 1955 går mellan Östanå på fastlandet och Småskärsudden på ön. Enligt Wikipedia hade ön 1 663 bofasta invånare år 2020. Österåkers kommun skriver i sitt planprogram för Ljusterö från 2010 att södra och mellersta ön har mycket avstyckad mark, med både permanentboende och fritidsboende och många tomter nära stranden. Sommargästerna kom tidigt. I Linanäs på södra ön styckades 75 tomter av år 1901 under namnet Ljusterö Villastad, och kommunen beskriver samhället som en blandning av äldre sommarvillor och nyare hus. Laggarsvik, strax norr om Linanäs, var enligt Wikipedia bara ett torp vid sekelskiftet 1900. Mellan 1910 och 1920 anlades ett fiskeläge där, och samtidigt började tomter styckas av för både sommargäster och bofasta. Planprogrammet beskriver rödfärgade stugor på fyrkantiga tomter i ett rutnät av vägar. Västra Lagnö by har enligt kommunen flera stora sommarvillor från tidigt 1900-tal, och i Hummelmora finns mangårdsbyggnader från sent 1800-tal och tidigt 1900-tal. Den stora utbyggnaden kom senare. Enligt planprogrammet är en majoritet av öns detaljplaner från 1950- och 1960-talen, och i princip alla från den tiden är upprättade för fritidshus och fullt utbyggda. Mitt på ön ligger ett bälte av sådana områden: Väsbystrand och Ugglan i väster, Ängsvik och Arnö i öster och Marum i söder. I Nolsjö blandas torpställen och sportstugor med småhus, och Grundvik har mest bostadshus från 1900-talets andra hälft och framåt. Kommunen skriver att fritidshusområdena på Ljusterö håller på att omvandlas till permanentboende.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Österåker"},{"label":"Delområden","value":"Linanäs, Laggarsvik, Grundvik, Marum, Arnö, Ängsvik, Väsbystrand, Ugglan, Nolsjö, Västra Lagnö, Hummelmora, öarna Siarö och Edö"},{"label":"Hustyper","value":"Sommarvillor, fritidshus och sportstugor, torp, småhus för permanentboende"},{"label":"Byggperiod","value":"Sommarvillor från 1900-talets början (Ljusterö Villastad 1901), fritidshusplaner från 1950- och 1960-talen, Grundvik 1900-talets andra hälft och framåt"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 840 (SCB, 2025)"}],
    sourceLink: {"label":"Österåkers kommun: Ljusterö planprogram (2010)","url":"https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljuster%C3%B6_planprogram_Hela_L%C3%A5guppl%C3%B6st.pdf"},
    parentLocation: {"name":"Åkersberga","slug":"akersberga"},
    h1Override: "Takläggare på Ljusterö, Österåker",
    uniqueFAQ: {"question":"När byggdes husen på Ljusterö?","answer":"Byggperiod enligt källorna: sommarvillor från 1900-talets början (Ljusterö Villastad 1901), fritidshusplaner från 1950- och 1960-talen, Grundvik från 1900-talets andra hälft och framåt. Hustyper: sommarvillor, fritidshus och sportstugor, torp och småhus för permanentboende. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Ljusterö",
    lat: 59.4667,
    lng: 18.5333,
    nearbyLocations: ["Svartnö", "Vaxholm", "Högmarsö"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Sommarvillorna från 1900-talets början är i dag över 100 år gamla. Ett fritidshus som byggdes när 1950- och 1960-talens planer var nya är mellan knappt 60 och drygt 75 år. På hus i de åldrarna kan taken redan ha lagts om, och byggåret säger därför lite om hur taket mår. Det som räknas är underlagspapp, läkt, plåtdetaljer och hängrännor som de ser ut nu. Ett hus som byggdes för sommaren och sedan har blivit bostad året om har ofta byggts till. Då möts tak från olika tider, och skarvarna hör till det första som ses över. På en tomt med gäststuga, bod eller garage finns dessutom fler tak än bostadshusets. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Ljusterö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "yxlan",
    name: "Yxlan",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takbyte på Yxlan och Blidö: byar från 1700- och 1800-talen, sommarhus från 1900-talets början och sportstugor. Kostnadsfri takkontroll.",
    longDescription:
      "Yxlan och Blidö ligger i Blidö socken i skärgården sydost om Norrtälje, Yxlan mellan Furusund och Blidö. Yxlan är enligt Wikipedia omkring 15 kilometer lång, en dryg kilometer bred och mestadels skogklädd. Ingen av öarna har bro. Sedan 1954 går vägfärja mellan Furusund och Köpmanholm på Yxlan, och en annan färja går mellan Larshamn på Yxlan och Norrsund på Blidö. År 2020 hade Blidö 597 bofasta invånare och Yxlan 357. Byarna har lång historia. Yxlö, mitt på Yxlan, brändes av ryssarna 1719 och byggdes upp igen, och prästgården där uppfördes 1752. I Alsvik återuppfördes gårdarna efter 1719 på höjden norr om Byviken, och vid storskiftet 1780 hade byn nio gårdar. Kolsvik fick sitt nuvarande läge vid laga skiftet 1827–1833, då flera gårdar flyttades ut. Köpmanholm fick sin bebyggelse i början av 1800-talet och blev lotssamhälle 1828. På Blidö är kyrkan mitt på ön från 1859, och på Oxhalsö finns ett båtsmanstorp från 1730-talet. Sommargäster har funnits på Blidö sedan slutet av 1800-talet, och reguljär ångbåtstrafik genom Blidösund började 1876. I Kolsvik byggdes enligt Wikipedia flera sommarhus och villor i början av 1900-talet, och i början av 1950-talet började tomter säljas till sportstugor på Norrskogen. Norrtälje kommun beskriver samma mönster för hela kommunen: sommarvillor från slutet av 1800-talet, sportstugor från 1930-talet och en snabb utbyggnad av fritidshus från efterkrigstiden fram till 1970-talet. Sportstugan var enligt kommunen en enkel stuga i ett plan i kuperad terräng.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Delområden","value":"Yxlan (Köpmanholm, Yxlö, Alsvik, Kolsvik, Vagnsunda), Blidö (Oxhalsö, Glyxnäs, Norrsund)"},{"label":"Hustyper","value":"Gårdar i byarna, sommarhus och villor, sportstugor och fritidshus"},{"label":"Byggperiod","value":"Byar återuppbyggda efter 1719 och flyttade vid skiftena, sommarhus och villor i Kolsvik från 1900-talets början, sportstugetomter från början av 1950-talet"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 600 (SCB, 2025)"}],
    sourceLink: {"label":"Wikipedia: Yxlan","url":"https://sv.wikipedia.org/wiki/Yxlan"},
    parentLocation: {"name":"Norrtälje","slug":"norrtalje"},
    h1Override: "Takläggare på Yxlan, Norrtälje",
    uniqueFAQ: {"question":"När byggdes husen på Yxlan?","answer":"Byggperiod enligt källorna: byarna återuppbyggda efter 1719 och flyttade vid skiftena, sommarhus och villor från 1900-talets början, sportstugetomter från början av 1950-talet. Hustyper: gårdar i byarna, sommarhus och villor, sportstugor och fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Yxlan",
    lat: 59.6333,
    lng: 18.8167,
    nearbyLocations: ["Blidö", "Furusund", "Rådmansö"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Sommarhusen och villorna från 1900-talets början är i dag runt 120 år gamla, och en sportstuga på en tomt som såldes i början av 1950-talet är upp emot 75 år. På så gamla hus kan taken redan ha lagts om, kanske flera gånger, och husets ålder säger därför lite om takets skick. Det som spelar roll är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. En enkel stuga som har byggts till i omgångar har tak från olika tider, och skarven mellan delarna är värd en extra titt. På en gård eller en större tomt finns ofta fler tak än bostadshusets, till exempel uthus och sjöbod, och varje tak bedöms för sig. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Yxlan eller Blidö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "furusund",
    name: "Furusund",
    region: "Mellersta skärgården",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Furusund, den gamla badorten i Norrtälje skärgård med bilväg sedan 1953. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Furusund är en ö och småort i Norrtälje kommun, mellan Yxlan och Eknö i Blidö socken. Ön har gett namn åt Furusundsleden, farleden in mot Stockholm, och den präglas enligt Wikipedia i dag av många fritidsboende, särskilt på sommaren. Platsen har varit hamn länge. Viken där hamnen ligger användes som naturhamn i väntan på vind över Ålands hav, och i berget finns en inristad kompassros som troligen är från 1463. År 1811 inrättades en tullkammare här, och tullhuset från 1811–1812, byggt för 15 tullmän med familjer, är i dag värdshus. En karantänsstation fanns på ön från 1831 till 1856, och det gamla karantänssjukhuset blev senare sommarvilla. Badorten kom till vid mitten av 1800-talet. Ön köptes 1842 av en fabrikör som anlade hotell och kägelbana och 1855 lät bygga ett varmbadhus vid viken. Från 1882 byggdes badorten ut av nästa ägare, som gav hus, vägar och platser italienska namn som Isola Bella och Monte Bello. Från 1907 började tomter säljas av. Stora hotellet brann ner 1915, och efter första världskriget hade Furusund enligt Wikipedia förlorat sin popularitet som badort. Sommargästerna fortsatte ändå att komma. Sedan 1953 går det att köra bil hit. Då byggdes en vägbank från Eknö på Svartnö till Furusund, som en del av Sju strömmars väg från fastlandet.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Furusund?","answer":"Byggperiod enligt källorna: tullhuset 1811–1812, badorten från 1840-talet och framför allt från 1882, tomtförsäljning från 1907. Hustyper: sommarvillor från badortstiden, fritidshus, tullhuset (värdshus). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Furusund",
    lat: 59.65,
    lng: 18.9167,
    nearbyLocations: ["Blidö","Yxlan","Rådmansö"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Sommarvillor från badortstiden, fritidshus, tullhuset (värdshus)"},{"label":"Byggperiod","value":"Tullhuset 1811–1812, badorten från 1840-talet och framför allt från 1882, tomtförsäljning från 1907"},{"label":"Väg","value":"Bilväg sedan 1953 (vägbank från Eknö)"}],
    sourceLink: {"label":"Wikipedia, Furusund","url":"https://sv.wikipedia.org/wiki/Furusund"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"På Furusund finns alltså hus från badortens tid, som i dag är över hundra år gamla, och fritidshus från senare årtionden. Husens ålder säger inte hur gammalt taket är. På ett så gammalt hus kan taket ha lagts om flera gånger, och hur underlaget ser ut i dag går inte att se från vägen. Två saker är värda att tänka på. På en sommarvilla från sekelskiftet är takets form, material och detaljer ofta en del av husets uttryck, och det nya materialet väljs efter det gamla om huset ska behålla det. Ett fritidshus kan också vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris. Eftersom bilvägen går ända fram kan material, ställning och container köras till huset som på fastlandet."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Furusund och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "husaro",
    name: "Husarö",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Husarö, lotsön i Österåkers skärgård som nås med båt. Berätta var huset ligger, så går vi igenom hur en takkontroll kan ordnas.",
    longDescription:
      "Husarö är en ö i mellersta Stockholms skärgård och hör till Österåkers kommun. Den ligger ungefär en distansminut norr om Finnhamn. Ön nås med båt: Waxholmsbolagets fartyg lägger till vid ångbåtsbryggan. Enligt Wikipedia har Husarö bara ett fåtal åretruntboende men desto fler sommargäster, och på ön finns ett hundratal sommarstugor. Husarö är en gammal lotsplats. Ön nämns redan på 1200-talet, som Husarn, i en beskrivning av en segelled. Lotsar har funnits här sedan 1400-talet, och 1740 blev Husarö officiell lotsplats. På segelfartygens tid lotsade husarölotsarna norrut till Furusund och söderut till Sandhamn. På 1800-talet arbetade som mest femton lotsar här. De blev färre efter hand, och 1912 lades lotsplatsen ner. I dag finns ett lotsmuseum i en av de gamla lotsgårdarna. Sommargästerna kom när ångbåtarna började gå i reguljär trafik 1881, och på sommaren kommer ett ångfartyg fortfarande hit på söndagar. Öns gamla skola lades ner på 1950-talet och är i dag scoutgård.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen på Husarö?","answer":"Byggperiod enligt källorna: sommargäster från 1881, lotsplats till 1912. Hustyper: lotsgårdar, ett hundratal sommarstugor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Husarö",
    lat: 59.5333,
    lng: 18.6833,
    nearbyLocations: ["Ingmarsö","Finnhamn","Ljusterö"],
    factBox: [{"label":"Kommun","value":"Österåker"},{"label":"Hustyper","value":"Lotsgårdar, ett hundratal sommarstugor"},{"label":"Byggperiod","value":"Sommargäster från 1881, lotsplats till 1912"},{"label":"Väg","value":"Ingen bilväg, ångbåtsbrygga med Waxholmsbolagets fartyg"}],
    sourceLink: {"label":"Wikipedia, Husarö","url":"https://sv.wikipedia.org/wiki/Husarö"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"På Husarö finns alltså hus från lotsarnas tid och ett hundratal sommarstugor som har kommit till sedan 1880-talet. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se utifrån. Tre saker är värda att tänka på. Ett fritidshus kan vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. En sommarstuga som har byggts till har ofta takdelar av olika ålder, och skarven mellan dem är värd en extra titt. Och till en ö utan bilväg behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. Mer om det finns i takbyte på Husarö och Finnhamn. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Takkontroll.** Berätta var huset ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Har du hus på Husarö och funderar på taket? Hör av dig på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "finnhamn",
    name: "Finnhamn",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takläggare på Finnhamn — professionell takläggning i ytterskärgården.",
    longDescription:
      "Finnhamn är en av Stockholms skärgårds mest älskade öar — och de fastigheter som finns här förtjänar tak i toppskick.",
    extraContent:
      "Den speciella skärgårdsmiljön kräver extra omsorg i materialval — vi rekommenderar alltid korrosionsbeständig plåt och dimensionerade infästningar för att tåla de starka vindarna.",
    uniqueFAQ: {
      question:
        "Går det att byta tak på Finnhamn trots att ön saknar vägförbindelse?",
      answer:
        "Ja. Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Samma villkor gäller som på fastlandet: fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    },
    primaryKeyword: "takläggare Finnhamn",
    lat: 59.5167,
    lng: 18.7167,
    nearbyLocations: ["Husarö", "Ingmarsö", "Högmarsö"],
  },
  {
    slug: "ingmarso",
    name: "Ingmarsö",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Ingmarsö i Österåkers skärgård, en ö utan vägförbindelse. Berätta var huset ligger, så går vi igenom hur en takkontroll kan ordnas.",
    longDescription:
      "Ingmarsö är en ö i Österåkers kommun i Stockholms skärgård. Enligt Wikipedia hade ön 163 bofasta invånare år 2020, på drygt sex kvadratkilometer. Ön saknar vägförbindelse med fastlandet och trafikeras av skärgårdsbåtar och båttaxi till två bryggor, Ingmarsö Södra och Ingmarsö Norra. Ön nämns första gången i jordeboken 1539, då fyra bönder bodde här och betalade skatt, bland annat i torsk. År 1694 stod öns båtsmanstorp färdigt, och det finns fortfarande kvar vid Norrgården. Befolkningen växte under 1800-talet, och 1910 var 223 personer skrivna på ön. Skolhuset invigdes 1901. Det har byggts om och till och rymmer i dag förskola och bibliotek. Affären öppnade 1887 och har varit i gång sedan dess. På 1930-talet började sommargästerna komma. Enligt Wikipedia hyrde de rum av de bofasta, bodde på pensionatet eller byggde egna hus. I dag finns ett trettiotal företag på ön, bland annat ett båtvarv, en krog och en livsmedelsbutik, och en stiftelse arbetar för att hålla jordbrukslandskapet öppet.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen på Ingmarsö?","answer":"Byggperiod enligt källorna: sommarhus från 1930-talet, skolhuset 1901. Hustyper: gårdar, båtsmanstorp (1694), sommarhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Ingmarsö",
    lat: 59.5,
    lng: 18.65,
    nearbyLocations: ["Husarö","Finnhamn","Ljusterö"],
    factBox: [{"label":"Kommun","value":"Österåker"},{"label":"Hustyper","value":"Gårdar, båtsmanstorp (1694), sommarhus"},{"label":"Byggperiod","value":"Sommarhus från 1930-talet, skolhuset 1901"},{"label":"Väg","value":"Ingen vägförbindelse med fastlandet, två reguljära bryggor"}],
    sourceLink: {"label":"Wikipedia, Ingmarsö","url":"https://sv.wikipedia.org/wiki/Ingmarsö"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"På Ingmarsö finns alltså gårdar med gamla anor, hus från 1800-talets och det tidiga 1900-talets bondesamhälle och sommarhus som har byggts sedan 1930-talet. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se utifrån. Tre saker är värda att tänka på. På en gård finns ofta fler tak än bostadshusets, till exempel uthus och bodar, som det kan löna sig att titta på vid samma tillfälle. Ett fritidshus kan vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. Och till en ö utan bilväg behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. Mer om det finns i takbyte på ö och fritidshus. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Takkontroll.** Berätta var huset ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Har du hus på Ingmarsö och funderar på taket? Hör av dig på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "hogmarso",
    name: "Högmarsö",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Högmarsö, varvsön vid Furusundsleden i Norrtälje skärgård. Berätta var huset ligger, så går vi igenom hur en takkontroll kan ordnas.",
    longDescription:
      "Högmarsö är en ö i Norrtälje kommun, längs Furusundsleden innanför Yxlan och sydväst om Furusund. Enligt Wikipedia är ön två kvadratkilometer stor och har en fast befolkning på 40 personer. På sommaren växer befolkningen till drygt 1 000. Ön har varit bebodd sedan 1500-talet, men det var varvet som formade samhället. År 1876 startades ett varv här, på initiativ av flera redare i trakten, och fartygen byggdes i en hållbarare teknik än de traditionella skroven. År 1918 började varvet bygga stålfartyg, och under 1930- och 1940-talen låg också ett mindre varv för fritidsbåtar bredvid skeppsvarvet. Enligt Wikipedia växte ett samhälle fram i anslutning till varvet, med skolbyggnad och en frikyrka som uppfördes 1913. I dag finns en restaurang i varvets lokaler, och ett mindre varv för traditionen vidare.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen på Högmarsö?","answer":"Byggperiod enligt källorna: varvet från 1876, frikyrkan 1913. Hustyper: hus från varvssamhället, fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Högmarsö",
    lat: 59.4833,
    lng: 18.6,
    nearbyLocations: ["Ljusterö","Finnhamn","Ingmarsö"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Hus från varvssamhället, fritidshus"},{"label":"Byggperiod","value":"Varvet från 1876, frikyrkan 1913"},{"label":"Invånare","value":"40 fasta, drygt 1 000 på sommaren"}],
    sourceLink: {"label":"Wikipedia, Högmarsö","url":"https://sv.wikipedia.org/wiki/Högmarsö"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"På Högmarsö finns alltså hus från varvssamhällets tid, som i dag är omkring hundra år gamla eller mer, och fritidshus. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se utifrån. Tre saker är värda att tänka på. Ett fritidshus kan vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. Ett hus som har byggts till har ofta takdelar av olika ålder, och skarven mellan dem är värd en extra titt. Och går det inte att köra bil fram till huset behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. Mer om det finns i takbyte på ö och fritidshus. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris. Två kompletta takbyten i kommunen finns att se under projekt: Nytt tak på Blidö och Nytt tak på Singö."}],
    process: {"steps":["**Takkontroll.** Berätta var huset ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Har du hus på Högmarsö och funderar på taket? Hör av dig på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "svartloga",
    name: "Svartlöga",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Svartlöga i Norrtälje ytterskärgård: en gammal by, sjöbodar och sommarhus. Kostnadsfri takkontroll, fast pris.",
    longDescription:
      "Svartlöga är en ö i Blidö socken, i Stockholms ytterskärgård. Ön är enligt Wikipedia låglänt och når som högst 12 meter över havet, och huvudön med omgivande skärgård omfattar 385 hektar. Svartlöga är riksintresse för naturvård, kulturmiljö och friluftsliv, och byn och sjövistet med sina timrade bodar pekas ut som välbevarade. Den första fasta bosättningen kom i slutet av 1400-talet, och under 1600-talet fanns fyra små gårdar. Svartlöga hörde enligt Wikipedia till de få öar i Roslagen som klarade sig undan rysshärjningarna 1719, så här kan det finnas bebyggelse som är äldre än på grannöarna. Fisket var huvudnäringen, öborna byggde båtar, och som mest fanns åtta skutor som fraktade mursand och sandsten till Stockholm. Kapellet är från 1916. År 1929 öppnade ett pensionat, och gästerna bodde i flera av husen i byn. En byggnad från sekelskiftet 1900 blev huvudbyggnad 1942, och pensionatet hade som mest omkring hundra gäster innan det lades ned 1956. De sista fastboende lämnade ön i mitten av 1960-talet. I början av 2000-talet kom fastboende tillbaka, och 2018 fanns sju bofasta. Husen används alltså mest som sommarhus. Ön har aldrig anslutits till elnätet från fastlandet. Waxholmsbolaget går hit dagligen på sommaren, och ångbåtsbryggan ligger på öns norra sida, ungefär en kilometer från byn. Under vinterhalvåret går båt från Furusund en gång i veckan så länge isen tillåter.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen på Svartlöga?","answer":"Byggperiod enligt källorna: bosättning sedan slutet av 1400-talet, byn inte bränd 1719, kapellet 1916. Hustyper: hus i byn, sjöbodar, sommarhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Svartlöga",
    lat: 59.6,
    lng: 19.05,
    nearbyLocations: ["Söderöra","Norröra","Humlö"],
    factBox: [{"label":"Kommun","value":"Norrtälje (Blidö socken)"},{"label":"Hustyper","value":"Hus i byn, sjöbodar, sommarhus"},{"label":"Byggperiod","value":"Bosättning sedan slutet av 1400-talet, byn inte bränd 1719, kapellet 1916"},{"label":"Bofasta","value":"7 (2018)"},{"label":"Förbindelse","value":"Waxholmsbolaget dagligen på sommaren, båt från Furusund veckovis på vintern, ingen bro"},{"label":"El","value":"Ingen anslutning till elnätet från fastlandet"},{"label":"Skydd","value":"Riksintresse (natur, kulturmiljö, friluftsliv)"}],
    sourceLink: {"label":"Norrtälje kommun har en kulturmiljöutredning för Svartlöga–Rödlöga (sidan https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/upptack-kulturarvet/riksintressen/riksintresseomraden/svartloga--rodloga/, hämtad live 2026-10-03). PDF:en gick inte att ladda ned i dag (anslutningen bröts tre gånger), så den är inte läst och inte använd.","url":"https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/upptack-kulturarvet/riksintressen/riksintresseomraden/svartloga--rodloga/"},
    h1Override: "Takläggare på Svartlöga",
    extraSections: [{"heading":"Vad det betyder för taket","text":"I en by som inte brändes 1719 kan husen vara mycket gamla, medan huset intill är ett sommarhus från 1900-talet. Husets ålder säger därför lite om takets skick. På ett äldre hus har taket lagts om, kanske många gånger, och det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. Ett hus som står tomt större delen av året har ingen som ser en läcka när den börjar. Titta på vinden och i innertaket när huset öppnas för säsongen. Till en ö utan bro behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. På Svartlöga behöver planeringen också ta hänsyn till att ön saknar el från fastlandet och att bryggan ligger en bit från byn. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Svartlöga eller har hus där och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "sodorora",
    name: "Söderöra",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Söderöra i Norrtälje skärgård, en ö med omkring 180 fritidshus. Kostnadsfri takkontroll utan förpliktelser, fast pris.",
    longDescription:
      "Söderöra är grannö till Norröra i Norrtälje skärgård. Ön fick enligt Wikipedia sin första bofasta befolkning på 1500-talet, och 1639 fanns två gårdar. Som mest bodde 50 till 60 personer här, vid sekelskiftet 1900. I dag bor ett tjugotal på ön året runt. Söderöra var känt för sina båtbyggare och fraktseglare. Nordiska museet dokumenterade båtbyggeriet 1948. Då fanns en yrkesverksam båtbyggare kvar, som ska ha byggt över 400 båtar, men det sades att alla på ön åtminstone kunde bygga mindre båtar. Bönhuset uppfördes 1908–1909. Många av vinterscenerna i Saltkråkan spelades in på Söderöra, och två av skådespelarna hade själva sommarhus här. Det som präglar ön i dag är fritidshusen. Enligt Wikipedia finns omkring 180 fritidshus på Söderöra, alltså många gånger fler än hushållen som bor här året om. Waxholmsbolaget trafikerar ön dagligen från Furusund, Östernäs och Bromskär, och på sommaren går det också båt direkt från Stockholm.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen på Söderöra?","answer":"Byggperiod enligt källorna: bofast befolkning sedan 1500-talet, bönhuset 1908–1909, fritidshusens byggår anges inte. Hustyper: äldre gårdar, omkring 180 fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Söderöra",
    lat: 59.5833,
    lng: 19,
    nearbyLocations: ["Svartlöga","Norröra","Gräskö"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Äldre gårdar, omkring 180 fritidshus"},{"label":"Byggperiod","value":"Bofast befolkning sedan 1500-talet, bönhuset 1908–1909, fritidshusens byggår anges inte"},{"label":"Bofasta","value":"Ett tjugotal"},{"label":"Förbindelse","value":"Waxholmsbolaget dagligen från Furusund, Östernäs och Bromskär, ingen bro"}],
    sourceLink: {"label":"Wikipedia, Söderöra","url":"https://sv.wikipedia.org/wiki/Söderöra"},
    h1Override: "Takläggare på Söderöra",
    extraSections: [{"heading":"Vad det betyder för taket","text":"På Söderöra finns både äldre gårdar och en stor mängd fritidshus. Wikipedia anger inte när fritidshusen byggdes, och de kan vara från flera olika årtionden. Husets ålder säger hur som helst lite om takets skick, eftersom taket kan ha lagts om sedan huset byggdes. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. Ett fritidshus står tomt en stor del av året, och en läcka kan pågå länge innan någon ser den. Titta på vinden och i innertaket när huset öppnas för säsongen, och ta en titt på taket från marken: pannor som har flyttat sig, plåt som har släppt, hängrännor som är fulla. Många fritidshus har byggts till i efterhand, och där tak från olika tider möts är skarven värd en extra titt. Till en ö utan bro behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Söderöra eller har hus där och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "humlo",
    name: "Humlö",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takläggare på Humlö — professionellt takbyte och takrenovering i norra Roslagens skärgård.",
    longDescription:
      "Humlö är en av de mindre öarna i norra Roslagen, men takproblemen är desamma som på de större: salt, fukt och vind sliter på material som inte är dimensionerat för skärgården. Resultatet är alltid detsamma — ett professionellt utfört tak med 10 års utförandegaranti, oavsett hur avlägsen adressen är.",
    extraContent:
      "Humlö ligger relativt nära Svartlöga och Norröra. På äldre skärgårdstak är sliten papp och rostiga beslag vanliga problem, eftersom salt och fukt bryter ner material snabbare än på fastlandet — problem som kan leda till fuktskador i underliggande konstruktion om de får sitta för länge. Kontakta oss för en kostnadsfri bedömning av taket på din fastighet på Humlö.",
    uniqueFAQ: {
      question: "Är det möjligt att få takkontroll på Humlö utan kostnad?",
      answer:
        "Ja, vi erbjuder kostnadsfri takkontroll även på öar som Humlö. Kontakta oss så bokar vi in ett besök — du får en bedömning och ett prisförslag vid takkontrollen.",
    },
    primaryKeyword: "takläggare Humlö",
    lat: 59.6167,
    lng: 19.0333,
    nearbyLocations: ["Svartlöga", "Norröra", "Gräskö"],
  },
  {
    slug: "norrora",
    name: "Norröra",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Norröra i Norrtälje skärgård: en by återuppbyggd efter 1719, med hus flyttade från Svartlöga. Kostnadsfri takkontroll.",
    longDescription:
      "Norröra är en ö i Norrtälje kommun som blev känd under 1960-talet genom filmerna om Saltkråkan. Ön är enligt Wikipedia befolkad året runt, och i dag bor ett par familjer där. Vid 1900-talets början bodde 16 familjer på ön, omkring 50 personer. På 1300-talet hörde Norröra, liksom flera andra öar i Roslagen, till godset Penningby. Den gamla byn låg norr om dagens bebyggelse, vid den uppgrundade Norrviken. Den brändes 1719, och efter det byggdes byn upp i sitt nuvarande läge. Öns äldsta stuga uppfördes enligt Wikipedia kort efter återuppbyggnaden. Flera av de äldsta husen är flyttade hit från Svartlöga, bland dem \"Snickargården\" från filmerna, som kom till ön i början av 1800-talet. I byn finns också ett båtsmanstorp från 1800-talet och ett missionshus som uppfördes 1906–1908. Waxholmsbolaget trafikerar ön dagligen året runt sedan april 2006, och på sommaren går också Blidösundsbolaget hit. Någon bro finns inte.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen på Norröra?","answer":"Byggperiod enligt källorna: byn återuppbyggd efter 1719, Snickargården ditflyttad i början av 1800-talet, missionshuset 1906–1908. Hustyper: hus i byn (flera flyttade från Svartlöga), båtsmanstorp, missionshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Norröra",
    lat: 59.5667,
    lng: 18.9833,
    nearbyLocations: ["Söderöra","Svartlöga","Humlö"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Hus i byn (flera flyttade från Svartlöga), båtsmanstorp, missionshus"},{"label":"Byggperiod","value":"Byn återuppbyggd efter 1719, Snickargården ditflyttad i början av 1800-talet, missionshuset 1906–1908"},{"label":"Bofasta","value":"Ett par familjer"},{"label":"Förbindelse","value":"Waxholmsbolaget dagligen året runt sedan 2006, ingen bro"}],
    sourceLink: {"label":"Wikipedia, Norröra","url":"https://sv.wikipedia.org/wiki/Norröra"},
    h1Override: "Takläggare på Norröra",
    extraSections: [{"heading":"Vad det betyder för taket","text":"De äldsta husen på Norröra är alltså från 1700-talet, och några av dem har dessutom tagits ned och satts upp igen på en ny plats. Ett timmerhus som har flyttats har fått sitt tak lagt minst en gång till, och sedan dess har det hunnit läggas om igen. Husets ålder säger därför lite om takets skick. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. På ett äldre hus som har byggts till i omgångar möts tak från olika tider, och skarven mellan dem är värd en extra titt. Ett hus som står tomt delar av året har ingen som ser en läcka när den börjar, så titta på vinden och i innertaket när huset öppnas för säsongen. Till en ö utan bro behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Norröra eller har hus där och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "grasko",
    name: "Gräskö",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Gräskö i Norrtälje skärgård: fritidshus från mellankrigstiden och 1960-talet. Kostnadsfri takkontroll, fast pris.",
    longDescription:
      "Gräskö är en ö i norra Stockholms skärgård, i Norrtälje kommun. På ön finns enligt Wikipedia mest sommarhus, men också en fast befolkning på 28 personer. Byn kallas Gräsken, och till den räknas några öar runt omkring, bland annat Rågören, Lilla Gåsö, Gåsö och Mäskören. Gräskö nämns första gången i skrift 1405. Under 1500-talet låg ön under Penningby och användes som betesholme. På 1600-talet kom en torpare hit, och under 1700-talet bosatte sig flera lotsar på ön. År 1838 köpte två torpare loss ön och delade den mellan sig. Det äldsta torpet låg troligen där Englundska gården ligger i Byviken, en timrad parstuga som 1867 byggdes på med en våning. Sommargästerna började komma redan i slutet av 1800-talet. Till en början hyrde de in sig hos de fastboende. Under mellankrigstiden byggdes de första fritidshusen, och under 1960-talet skedde enligt Wikipedia en storskalig exploatering av öns norra delar. I början av 2000-talet fanns 140 fastigheter på ön. Det går båt hit året runt, med daglig trafik på sommaren, och närmaste butiker finns i Furusund och i Gräddö på Rådmansö.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen på Gräskö?","answer":"Byggperiod enligt källorna: parstugan påbyggd 1867, första fritidshusen under mellankrigstiden, exploatering av norra delarna på 1960-talet. Hustyper: mest sommarhus, en äldre gård i Byviken. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Gräskö",
    lat: 59.55,
    lng: 18.95,
    nearbyLocations: ["Söderöra","Norröra","Furusund"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Mest sommarhus, en äldre gård i Byviken"},{"label":"Byggperiod","value":"Parstugan påbyggd 1867, första fritidshusen under mellankrigstiden, exploatering av norra delarna på 1960-talet"},{"label":"Fastigheter","value":"140 (början av 2000-talet)"},{"label":"Bofasta","value":"28"},{"label":"Förbindelse","value":"Båt året runt, daglig trafik på sommaren, ingen bro"}],
    sourceLink: {"label":"Wikipedia, Gräskö","url":"https://sv.wikipedia.org/wiki/Gräskö"},
    h1Override: "Takläggare på Gräskö",
    extraSections: [{"heading":"Vad det betyder för taket","text":"Fritidshusen från mellankrigstiden är i dag omkring 90 till 100 år gamla, och de från 1960-talet omkring 60 år. Gården i Byviken är äldre än så. På de äldre husen kan taket redan ha lagts om, kanske flera gånger, och husets ålder säger därför lite om taket som ligger där nu. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. Ett fritidshus står tomt en stor del av året, och en läcka kan pågå länge innan någon ser den. Titta på vinden och i innertaket när huset öppnas för säsongen. Många fritidshus har byggts till i efterhand, och där tak från olika tider möts är skarven värd en extra titt. Till en ö utan bro behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Gräskö eller har hus där och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "spillersboda",
    name: "Spillersboda",
    region: "Kusten",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Spillersboda, skärgårdssamhället i Norrtälje kommun med många fritidshus. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Spillersboda ligger i Frötuna socken i Norrtälje kommun, vid kusten sydost om Norrtälje. Wikipedia beskriver det som ett skärgårdssamhälle som har gått från fiskar- och jordbrukartiden, via pensionatens och ångbåtarnas tid, till dagens samhälle. Orten nämns första gången 1535. På 1700-talet fanns tre gårdar här, två i Mutsunda och en i Spillersboda. I slutet av 1800-talet kom ångbåtarna: 1888 öppnades en affär vid ångbåtsbryggan, och 1894–1895 byggdes en ny affär i ett gult hus som fortfarande står kvar vid bryggan. Det kallas Tornvillan och blev senare ett av många pensionat i byn. Sågen startades 1903 och varvet 1919, och varvet hade enligt Wikipedia sin storhetstid på 1930-, 1940- och 1950-talen. Fram till slutet av 1940-talet gick Vaxholmsbolagets båtar hit i reguljär trafik, och från 1932 gick bussen från Norrtälje. I dag bor drygt 300 personer här året om, och därtill kommer omkring 1 500 fritidsboende. Andelen fritidshus är så hög att Spillersboda under en period inte räknades som tätort. Orten har en affär som är öppen året om, ett varv, en bygghandel och många bryggor, och den har enligt Wikipedia stor betydelse för öbor som handlar och reser härifrån.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Spillersboda?","answer":"Byggperiod enligt källorna: inte belagt per hus (Tornvillan 1894–1895). Hustyper: äldre hus från pensionatstiden, fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Spillersboda",
    lat: 59.7,
    lng: 18.5833,
    nearbyLocations: ["Norrtälje","Bergshamra","Rådmansö"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Äldre hus från pensionatstiden, fritidshus"},{"label":"Byggperiod","value":"Inte belagt per hus (Tornvillan 1894–1895)"},{"label":"Invånare","value":"Drygt 300 fasta, omkring 1 500 fritidsboende"}],
    sourceLink: {"label":"Wikipedia, Spillersboda","url":"https://sv.wikipedia.org/wiki/Spillersboda"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Spillersboda har både äldre hus från pensionatstiden och ett stort antal fritidshus. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från vägen. Två saker är värda att tänka på. Ett fritidshus som har byggts till eller används året om har ofta takdelar av olika ålder, och skarven mellan dem är värd en extra titt. Ett fritidshus kan också vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Spillersboda och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "radmanso",
    name: "Rådmansö",
    region: "Kusten",
    isIsland: false,
    description: "Takbyte och takomläggning på Rådmansö öster om Norrtälje, i Gräddö, Räfsnäs, Nenninge och Lågarö. Villor och fritidshus. Kostnadsfri takkontroll.",
    longDescription: "Rådmansö är en halvö omkring en mil öster om Norrtälje, där bland annat Kapellskär, Gräddö och Räfsnäs ligger. Rådmansö socken omfattar den östra delen av halvön och den yttre skärgården mellan Svenska Högarna och Söderarm, och det är här E18 slutar sin sträckning i Sverige, vid Kapellskärs hamn. Socknen beskrivs som en kuperad skogsbygd med inslag av odlingsbygd, främst i väster, och kala skär ute i skärgården. Rådmansö församling bildades i slutet av 1500-talet som ett kapellag utbrutet ur Frötuna. Vid kommunreformen 1862 blev socknen en egen landskommun, som 1952 gick upp i Frötuna landskommun och sedan 1971 ingår i Norrtälje kommun. År 2000 bodde omkring 1 760 personer i socknen. Gräddö by nämns första gången 1547. Härifrån embarkerade svenska trupper 1739 inför hattarnas ryska krig, och 1809 avseglade expeditionskåren mot Ratan i Västerbotten. Vid slutet av 1800-talet blev Gräddö ett populärt turistmål. Enligt Wikipedia byggdes då en mängd tornförsedda sommarhus, och flera pensionat startades. Gräddö båtvarv grundades 1924 och byggde motorkryssare och segelbåtar, och 1959 startade Viking Line färjetrafik från Gräddö till Mariehamn, innan trafiken året därpå flyttade till Kapellskär. År 2015 avgränsade SCB för första gången en tätort här, med Nabbo, Gräddö och Räfsnäs. I dag har Rådmansö en blandning av villor, lantbruk och fritidshus. Enligt hitta.se är husen i delområden som Rådmansby, Lågarö, Nenninge, Djursnäs och Gräddö byggda under en lång period, från 1920-talet till 1980-talet, med tyngdpunkt på 1950–1980.",
    extraContent:
      "",
    factBox: [
      { label: "Kommun", value: "Norrtälje" },
      { label: "Delområden", value: "Rådmansby, Lågarö, Nenninge, Brevik, Djursnäs, Knuven, Eknö, Gräddö, Koholma" },
      { label: "Hustyper", value: "Villor, lantbruk och fritidshus" },
      { label: "Byggperiod", value: "Blandat 1920–1980-tal, mest 1950–1980" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 050" },
    ],
    uniqueFAQ: {
      question: "Hur snabbt kan ni komma till Rådmansö för en takkontroll?",
      answer:
        "Ring oss på 070-154 36 39 eller boka via formuläret, så hittar vi en tid som passar. Vi svarar inom 24 timmar, och efter takkontrollen får du en rapport om takets skick.",
    },
    primaryKeyword: "takläggare Rådmansö",
    lat: 59.6667,
    lng: 18.85,
    nearbyLocations: ["Norrtälje", "Blidö", "Furusund"],
    parentLocation: {"name":"Norrtälje","slug":"norrtalje"},
    sourceLink: {"label":"Wikipedia: Rådmansö","url":"https://sv.wikipedia.org/wiki/R%C3%A5dmans%C3%B6"},
    h1Override: "Takläggare på Rådmansö, Norrtälje",
    extraSections: [{ heading: "Vad det betyder för taket", text: "På Rådmansö står hus från nästan ett sekel sida vid sida, från sekelskiftets sommarhus till villor från 1970- och 80-talen. De flesta husen är i dag runt 45–75 år gamla, och taken kan redan ha lagts om en eller flera gånger. I fritidshus som har byggts om till permanentbostäder kan taket ha kompletterats vid olika tillfällen. Därför går det inte att säga något generellt om skicket. Varje hus får en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Rådmansö? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "bergshamra",
    name: "Bergshamra",
    region: "Kusten",
    isIsland: false,
    description:
      "Takbyte i Bergshamra söder om Norrtälje, där fritidshus blir permanentbostäder och nya småhus planeras. Kostnadsfri takkontroll.",
    longDescription:
      "Bergshamra är en tätort omkring 15 kilometer söder om Norrtälje, vid Bergshamraviken. Orten består enligt Wikipedia av två delar. Det som i dag förknippas med Bergshamra är Hästängen, där sågverket, livsmedelsbutiken och vårdcentralen ligger. Den ursprungliga orten kallas numera Gamla Bergshamra. Där fanns en gång mejeri, skola, pensionat, brandstation och en kvarn, och kvarngården är i dag hembygdsgård. Redan 1960 beskrev SCB Hästängen som tätortsliknande bebyggelse, då med 163 invånare. I Mora står Morastugan, en timrad parstuga med faluröd panel som byggdes omkring 1815–1817, efter storskiftet i Mora by. Den är byggnadsminne sedan 1980. År 1920 byggdes ett nytt och större boningshus på gården. Vid Bergshamraviken finns en båtklubb och ett större fritidshusområde, och på sommaren växer befolkningen. Norrtälje kommun skriver i Översiktsplan 2050 att Bergshamra har haft en kraftig befolkningsökning de senaste decennierna, i huvudsak därför att fritidshus har blivit permanentbostäder. Kommunen vill att den utvecklingen fortsätter och att den befintliga bebyggelsen kompletteras så att orten binds samman. Översiktsplanen pekar ut ett område vid Mora för cirka 70 småhus av olika slag, ett vid Lingonvägen för 60–70 bostäder och en mindre komplettering längs Lugnetvägen. Mer omfattande ny bebyggelse behöver enligt kommunen vänta på att reningsverket byggs ut, och kommunen avser att ta fram en fördjupad översiktsplan för Bergshamra. Enligt hitta.se är husen i ortens olika delar byggda på 1920-, 1940-, 1980- och 1990-talen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Delområden","value":"Hästängen, Gamla Bergshamra, Mora, fritidshusområdet vid Bergshamraviken"},{"label":"Hustyper","value":"Villor och fritidshus som blir permanentbostäder, inslag av radhus"},{"label":"Byggperiod","value":"1920-, 1940-, 1980- och 1990-tal"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 580 (SCB, 2025)"}],
    sourceLink: {"label":"Norrtälje kommun: Översiktsplan 2050, Bergshamra","url":"https://www.norrtalje.se/info/bygga-bo-miljo/norrtalje-vaxer/samhallsplanering/oversiktsplanering/oversiktsplan2050/mark-och-vattenanvandning/bergshamra/"},
    parentLocation: {"name":"Norrtälje","slug":"norrtalje"},
    h1Override: "Takläggare i Bergshamra, Norrtälje",
    uniqueFAQ: {"question":"När byggdes husen i Bergshamra?","answer":"Byggperiod enligt hitta.se: 1920-, 1940-, 1980- och 1990-tal. Hustyper: villor och fritidshus som blir permanentbostäder, med inslag av radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Bergshamra",
    lat: 59.7167,
    lng: 18.55,
    nearbyLocations: ["Spillersboda", "Norrtälje", "Svartnö"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen från 1920-talet är i dag runt 100 år gamla, de från 1940-talet runt 80 år och de från 1980- och 1990-talen mellan knappt 30 och drygt 45 år. På de äldre husen kan taken redan ha lagts om, och husets byggår räcker inte för att bedöma taket. Det som avgör är vad som finns där nu: underlagspapp, läkt, plåtdetaljer, genomföringar och hängrännor. När ett fritidshus blir bostad året om följer ofta en tillbyggnad, en inredd vind eller en ny skorsten med. Varje sådan ändring ger en skarv eller en genomföring i taket, och det är där en takkontroll börjar. Den som planerar att bygga till kan med fördel se över hela taket vid samma tillfälle, så att gammalt och nytt hänger ihop. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Bergshamra och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "svartno",
    name: "Svartnö",
    region: "Kusten",
    isIsland: false,
    description:
      "Takbyte och takomläggning på Svartnö och Eknö i Norrtälje skärgård, med bilväg sedan 1945. Kostnadsfri takkontroll och fast pris i offerten.",
    longDescription:
      "Svartnö är en ö i Norrtälje skärgård, mellan Humlö och Furusund. Den östra halvan heter Eknö och var förr en egen ö, men landhöjningen har fått de två att växa ihop. På den sydvästra delen ligger Svartnö by, söder om vägen ut mot Furusund. I början av 1900-talet bestod byn enligt Wikipedia av sju bebyggda brukningsdelar med åker. Byn har, trots all fritidsbebyggelse, bevarat sin karaktär av bondeland, och det finns fortfarande djur i hagarna. Wikipedia beskriver bebyggelsen som en rad byggnader som tillsammans ger en enhetlig bild, trots att de enskilda husen har byggts om och förändrats. Byskolan från 1879 står kvar och är i stort sett orörd sedan den sista eleven gick ut 1939. På Eknösidan finns små jord- och skogsbruk, en fritidsbåtshamn och ett mindre varv. Där låg tidigare ett större jordbruk, Eknö gård, vars mark har styckats av och sålts efter hand. År 1945 invigdes vägen från fastlandet till Svartnö, som en del av Sju strömmars väg, med Svartnöbron. År 1953 förlängdes den med en vägbank från Eknö till Furusund, och en ny bro invigdes 1986.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Svartnö?","answer":"Byggperiod enligt källorna: inte belagt per hus (byskolan 1879). Hustyper: gårdar och byggnader i byn (ombyggda), fritidshus, små jord- och skogsbruk. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Svartnö",
    lat: 59.45,
    lng: 18.55,
    nearbyLocations: ["Ljusterö","Bergshamra","Vaxholm"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Delar","value":"Svartnö by, Eknö"},{"label":"Hustyper","value":"Gårdar och byggnader i byn (ombyggda), fritidshus, små jord- och skogsbruk"},{"label":"Byggperiod","value":"Inte belagt per hus (byskolan 1879)"},{"label":"Väg","value":"Bilväg sedan 1945, vägbank till Furusund 1953, ny bro 1986"}],
    sourceLink: {"label":"Wikipedia, Svartnö","url":"https://sv.wikipedia.org/wiki/Svartnö"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"På Svartnö finns alltså gårdar med gamla anor, där husen har byggts om och förändrats, och fritidshus som har kommit till senare. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från vägen. Två saker är värda att tänka på. Ett hus som har byggts om och till har ofta takdelar av olika ålder, och skarven mellan dem är värd en extra titt. Och på en gård finns ofta fler tak än bostadshusets, till exempel uthus och bodar, som det kan löna sig att titta på vid samma tillfälle. Ett fritidshus kan dessutom vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris. Eftersom bilvägen går över ön kan material, ställning och container köras fram till huset som på fastlandet."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du på Svartnö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "vaddo",
    name: "Väddö",
    region: "Kusten",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Roslagsbro och på Väddö nordost om Norrtälje, från Brosjön till Älmsta och Grisslehamn. Kostnadsfri takkontroll.",
    longDescription:
      "Nordost om Norrtälje ligger Roslags-Bro socken, med Norrtäljeviken i söder och Brosjön i väster. I öster når socknen ut till Bagghusfjärden, och på andra sidan fjärden tar Väddö vid. Wikipedia beskriver Roslags-Bro som en kuperad trakt med mycket sjöar och skog och med odlingsbygd i dalar som en gång var fjärdar. Namnet skrevs Bro år 1322 och syftar på en bro över Broströmmen vid kyrkan. Fram till 1886 hette socknen bara Bro. I socknen finns 50 gravfält från järnåldern, en fornborg och fem runstenar. Väddö är den norra delen av en ö i norra Roslagen, omkring 100 kilometer nordost om Stockholm. Väddö kanal och Väddöviken skiljer ön från fastlandet. Kanalen började anläggas 1819 och invigdes 1840. Tre broar leder över: Trästabron i norr, som invigdes 1998, Älmstabron i mitten och Bagghusbron i söder. Väddö socken beskrivs som berglänt, med en förkastningsbrant i öster och viss odlingsbygd väster om den. Mitt på ön ligger Älmsta, som delvis ligger på fastlandet. När byn nämndes första gången 1557 hade den redan sju gårdar. Sydost om Kasberget ligger Kista hembygdsgård. Enligt Wikipedia var det den enda gården på Väddö som klarade sig undan rysshärjningarna 1719, och byggnaderna är från 1700- och 1800-talen. Nära öns nordspets ligger Grisslehamn, som flyttades till sin nuvarande plats efter en brand 1754. Posthuset där byggdes 1756, och 1903 öppnade Hotell Havsbaden, sedan sommargäster från Stockholm hade börjat komma med ångbåt. Enligt hitta.se är husen längs Roslagsbrovägen mest byggda på 1940- och 1960-talen och husen kring kyrkan på 1920-talet.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Norrtälje" },
      { label: "Delområden", value: "Roslagsbro, Bredsättra, Harö, Loö, Nedernäs, Väddö" },
      { label: "Hustyper", value: "Villor och småbruk, inslag av fritidshus" },
      { label: "Byggperiod", value: "Roslagsbrovägen mest 1940- och 1960-tal, kring kyrkan 1920-tal (Väddö-delen inte belagd)" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 400" },
    ],
    sourceLink: { label: "Wikipedia: Väddö", url: "https://sv.wikipedia.org/wiki/V%C3%A4dd%C3%B6" },
    parentLocation: { name: "Norrtälje", slug: "norrtalje" },
    h1Override: "Takläggare i Roslagsbro och på Väddö",
    uniqueFAQ: {
      question: "När byggdes husen i Roslagsbro och på Väddö?",
      answer:
        "Byggperiod enligt källorna: längs Roslagsbrovägen mest 1940- och 1960-tal, kring kyrkan 1920-tal. För Väddö-delen är byggperioden inte belagd i de källor vi använder. Hustyper: villor och småbruk, med inslag av fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Väddö",
    lat: 59.95,
    lng: 18.95,
    nearbyLocations: ["Grisslehamn", "Singö", "Norrtälje"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen från 1920-talet är i dag runt 100 år gamla, de från 1940-talet runt 80 år och de från 1960-talet runt 60 år. På hus i de åldrarna kan taken redan ha lagts om, och det går inte att läsa av takets skick på husets byggår. Det som spelar roll är vad som gjordes senast och hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. På ett småbruk eller en gård står ofta bostadshus och ekonomibyggnader från olika tider, och varje tak bedöms för sig. Ett hus som har byggts till i omgångar har skarvar där nytt tak möter gammalt, och skarvarna hör till det första som ses över. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Roslagsbro eller på Väddö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "vato",
    name: "Vätö",
    region: "Kusten",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Vätö: torp och gårdar från 1800-talet, stenhuggarnas små villor och fritidshus från 1960- och 1970-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Vätö är en ö i Norrtälje kommun med samhället Harg mitt på ön. Fram till 1993 tog man sig över med färja från fastlandet. Då ersattes den av Vätöbron. Kyrkan omtalas första gången på 1300-talet. Ön har levt på sten och sjöfart. Enligt Wikipedia var brytning och försäljning av sandsten en betydande näring under 1600- och 1700-talen, och när stenen började tryta tog bondeseglationen över. Rosättra Båtvarv anlades 1886. Granitbrytningen började 1892, och den röda graniten användes bland annat till Riksdagshuset och Kungliga Operan i Stockholm. Vätö stenhuggeri vid Karlsängen hade som mest 500 anställda. Många av arbetarna kom utifrån och lät enligt Wikipedia bygga små villor med hög stenfot, som fortfarande hör till öns bebyggelse. I dag består Vätö av ett inland med jordbruk, åkrar och skog och av kuster med huvudsakligen fritidshus. Wikipedia beskriver en stor andel äldre bebyggelse, mest torp och gårdar från 1800-talets andra hälft, och dessutom stenhuggartorp som kom till när stenhuggerierna skapade ett behov av bostäder. Den norra delen av ön har en annan karaktär, med fritidshus från 1960- och 1970-talen som delvis ligger i grupper. Björkö och Arholma hörde till Vätö socken fram till 1914. På södra Björkö ligger enligt Wikipedia flera redargårdar från omkring 1840, och på Arholma finns skärgårdsbebyggelse främst från 1800-talet.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Delområden i RegSO","value":"Vätö, Björkö, Arholma, del av Väddö"},{"label":"Hustyper","value":"Torp och gårdar, stenhuggartorp, små villor med hög stenfot, fritidshus"},{"label":"Byggperiod","value":"Torp och gårdar från 1800-talets andra hälft, fritidshus på norra delen från 1960- och 1970-talen"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 1 520 (SCB, 2025)"}],
    sourceLink: {"label":"Wikipedia: Vätö","url":"https://sv.wikipedia.org/wiki/V%C3%A4t%C3%B6"},
    parentLocation: {"name":"Norrtälje","slug":"norrtalje"},
    h1Override: "Takläggare på Vätö, Norrtälje",
    uniqueFAQ: {"question":"När byggdes husen på Vätö?","answer":"Byggperiod enligt källorna: torp och gårdar från 1800-talets andra hälft, fritidshus på norra delen från 1960- och 1970-talen. Hustyper: torp och gårdar, stenhuggartorp, små villor med hög stenfot och fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Vätö",
    lat: 59.7,
    lng: 18.7833,
    nearbyLocations: ["Rådmansö", "Blidö", "Norrtälje"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Torpen och gårdarna från 1800-talets andra hälft är i dag mellan 125 och 175 år gamla, och fritidshusen på norra Vätö mellan runt 50 och drygt 65 år. På de äldre husen kan taken redan ha lagts om, kanske flera gånger, så byggåret berättar lite om taket som ligger där nu. Det som räknas är underlaget, läkten, plåten kring skorstenen och hur vattnet leds bort. Två saker är värda att tänka på. Ett fritidshus som har byggts till eller används året om kan ha fått tak i flera omgångar, och skarven mellan delarna behöver ses över. Och på en gård finns ofta fler tak än bostadshusets, till exempel uthus och bodar, som det kan löna sig att titta på vid samma tillfälle. Wikipedia anger att kulturlandskapet på ön har högt kulturhistoriskt värde, så ta reda på vad som gäller för ditt hus innan du väljer nytt material. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Vätö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "norrtalje",
    name: "Norrtälje",
    region: "Kusten",
    isIsland: false,
    description:
      "Takläggare i Norrtälje — takbyte och takrenovering i Norrtäljeområdet.",
    longDescription:
      "Norrtälje ligger längst in i Norrtäljeviken och är centralort i en kommun som sträcker sig från inlandet vid Rimbo till öarna i Ålands hav. Här har vi vår bas. Den som söker takläggare i Norrtälje kan alltså ha ett hus i staden, i ett brukssamhälle, i en by på landet eller på en ö, och husen har kommit till på helt olika sätt. Här går vi igenom dem.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Norrtälje?","answer":"Byggperiod enligt källorna: från 1800-talets gårdar och sommarvillor till 2000-talets villor. Hustyper: villor, gårdar och torp, bruks- och gruvbostäder, fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Norrtälje",
    lat: 59.7667,
    lng: 18.7,
    nearbyLocations: ["Rådmansö","Vätö","Spillersboda"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Orter som nämns","value":"Staden (Kvisthamra, Gransäter, Görla, Långgarn, Frötuna), Rimbo, Hallstavik, Älmsta, Bergshamra, Herräng, Grisslehamn, Rådmansö, Vätö, Yxlan, Blidö, Singö"},{"label":"Hustyper","value":"Villor, gårdar och torp, bruks- och gruvbostäder, fritidshus"},{"label":"Byggperiod","value":"Från 1800-talets gårdar och sommarvillor till 2000-talets villor"}],
    sourceLink: {"label":"Wikipedia, Norrtälje","url":"https://sv.wikipedia.org/wiki/Norrtälje"},
    extraSections: [{"heading":"Staden","text":"Norrtälje grundades 1622. Sensommaren 1719 brändes staden av den ryska galärflottan, och enligt Wikipedia gick återuppbyggnaden långsamt. Villaområdena runt den gamla staden är betydligt yngre. Enligt hitta.se är husen i Kvisthamra mest byggda på 1940- och 1960-talen och i Gransäter på 1940- och 1960-talen, medan Görla i söder mest har hus från 1990- och 2000-talen. I öster ligger Långgarns villaområde, och i Frötuna strax utanför staden står hus från flera tider sida vid sida, från sekelskiftet 1900 till 2000-talet."},{"heading":"Tätorterna","text":"- **Rimbo** växte fram kring järnvägen, som kom 1884. Den första stadsplanen antogs på 1920-talet, och enligt Norrtälje kommun var den påverkad av trädgårdsstadens ideal, med villor i lummiga kvarter med stora trädgårdar. - **Hallstavik** var en by fram till början av 1900-talet. Pappersbruket grundades 1915, och orten växte till ett brukssamhälle. - **Älmsta** ligger vid Väddö kanal, med en del på fastlandet och en på Väddö. Enligt hitta.se är husen där byggda från 1960-talet till 1990-talet. - **Bergshamra** består enligt Wikipedia av två delar, Hästängen och Gamla Bergshamra, och har ett större fritidshusområde vid viken. - **Herräng** är ett gruvsamhälle där bolaget byggde bostäderna när järnverket anlades i början av 1900-talet. - **Grisslehamn** fick ett uppsving som sommarort i slutet av 1800-talet. Bebyggelsen beskrivs av kommunen som gles och gradvis framvuxen."},{"heading":"Halvöarna och öarna","text":"Enligt Wikipedia finns ett stort antal fritidshus i kommunen. Norrtälje kommun beskriver mönstret: sommarvillor från slutet av 1800-talet, sportstugor från 1930-talet och en snabb utbyggnad av fritidshus från efterkrigstiden fram till 1970-talet. - **Rådmansö** har en blandning av villor, lantbruk och fritidshus, byggda under en lång period från 1920-talet till 1980-talet. - **Vätö** har torp och gårdar från 1800-talets andra hälft, stenhuggarnas små villor och fritidshus från 1960- och 1970-talen. Sedan 1993 går en bro dit. - **Yxlan och Blidö** nås med vägfärja. Sommargäster har funnits på Blidö sedan slutet av 1800-talet. - **Singö** har bro sedan 1955. Två kompletta takbyten i kommunen finns att se under projekt: Nytt tak på Blidö och Nytt tak på Singö."},{"heading":"Vad det betyder för taket","text":"Husen i Norrtälje kommun är alltså allt från ett par årtionden till långt över hundra år gamla. Husens ålder säger inte hur gammalt taket är. På ett äldre hus kan taket ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från vägen. Tre saker är värda att tänka på. - **Fritidshus som har blivit åretruntbostad.** De har i regel byggts om och till, och då finns det ofta takdelar av olika ålder på samma hus. Skarven mellan dem är värd en extra titt. Ett fritidshus kan också vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. - **Gårdar med flera tak.** På en gård finns ofta fler tak än bostadshusets, till exempel uthus och bodar, som det kan löna sig att titta på vid samma tillfälle. - **Hus på en ö.** Till en ö utan bilväg behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Flera orter i kommunen, bland dem Grisslehamn och Herräng, är riksintressen för kulturmiljövården, och där är det extra viktigt att fråga först. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Norrtälje","text":"Vi är en takfirma med bas i Norrtälje. Mer om varje tjänst finns på sidorna om takbyte i Norrtälje, takomläggning i Norrtälje och takrenovering i Norrtälje."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Norrtälje och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "vaxholm",
    name: "Vaxholm",
    region: "Kusten",
    isIsland: false,
    description:
      "Takläggare i Vaxholm — takbyte, pannplåt och takrenovering nära Stockholm.",
    longDescription:
      "Vaxholm är en skärgårdskommun. Enligt Wikipedia omfattar den 70 öar, varav 57 är bebodda, tillsammans med halvön Bogesundslandet. Centralorten ligger på Vaxön och fick stadsprivilegier 1652, med fästningen på holmen utanför som nav i försvaret av inloppet till Stockholm. Den som söker takläggare i Vaxholm kan alltså ha ett hus i staden, på en ö med bro eller färja, eller på en ö som bara nås med båt. Här går vi igenom delarna.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Vaxholm?","answer":"Byggperiod enligt källorna: från sekelskiftet 1900 (Ytterbystrand 1903, Engarn) till 2000-talet. Hustyper: villor, fritidshus, i staden också flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Vaxholm",
    lat: 59.4,
    lng: 18.35,
    nearbyLocations: ["Ljusterö","Norrtälje","Svartnö"],
    factBox: [{"label":"Kommun","value":"Vaxholm"},{"label":"Delar som nämns","value":"Vaxön (Blynäs, Norrhamn), Resarö (Ytterby, Engarn), Rindö, Skarpö, Kullön, Tynningö, Bogesundslandet"},{"label":"Hustyper","value":"Villor, fritidshus, i staden också flerbostadshus"},{"label":"Byggperiod","value":"Från sekelskiftet 1900 (Ytterbystrand 1903, Engarn) till 2000-talet"}],
    sourceLink: {"label":"Wikipedia, Vaxholms kommun","url":"https://sv.wikipedia.org/wiki/Vaxholms_kommun"},
    extraSections: [{"heading":"Vaxön","text":"På Vaxön ligger staden. Enligt hitta.se är husen i den västra delen, kring Blynäs, mest byggda på 1950- och 1960-talen, och i den östra delen, kring Norrhamn, på 1950- och 1980-talen. Där finns både flerbostadshus och villor."},{"heading":"Resarö","text":"Resarö är en omkring fyra kilometer lång ö norr om Vaxön. Villabebyggelsen började med Ytterbystrand, ett villaområde som grundades 1903. I slutet av 1900-talet förvandlades ön enligt Wikipedia från sommarö till villaförort, med allt fler permanentboende. Enligt hitta.se är villorna vid Ytterbyvägen främst byggda på 1970- och 1980-talen och husen på ön i övrigt på 1980- och 2000-talen, medan Engarns by har hus från sekelskiftet 1900."},{"heading":"Rindö, Skarpö och Kullön","text":"Rindö hör till Vaxholm sedan 1913. Enligt Wikipedia går länsväg 274 över ön, med vägfärja till Vaxholm i väster och till Värmdö i öster, och en bro leder vidare till Skarpö. Ön har haft befästningar sedan 1500-talet. Enligt hitta.se är villorna på Rindö mest byggda på 1940- och 1960-talen. På Kullön är husen mest från 1950- och 2000-talen."},{"heading":"Tynningö och de mindre öarna","text":"Tynningö och Skarpö fördes till Vaxholm 1950. På Tynningö är villorna enligt hitta.se byggda på 1920- och 1950-talen, och här finns också fritidshus."},{"heading":"Vad det betyder för taket","text":"Husen i Vaxholm är alltså allt från ett par årtionden till över hundra år gamla. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från vägen. Tre saker är värda att tänka på. - **Vägen till huset.** Till ett hus med bilväg, också över bro eller med vägfärja, kan material, ställning och container köras hela vägen fram. Till en ö utan bilväg behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. Mer om det finns i takbyte i Vaxholm: fastland, bro eller båt? och i takbyte på ö och fritidshus. - **Sommarhus som har blivit åretruntbostad.** De har i regel byggts om och till, och då finns det ofta takdelar av olika ålder på samma hus. Ett fritidshus kan också vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. - **Äldre hus med eget uttryck.** På ett äldre hus är takets form, material och kulör en del av husets karaktär. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Vaxholm","text":"Vi är en takfirma med bas i Norrtälje och tar uppdrag i Vaxholm. Vad ett takbyte eller en takomläggning omfattar beskriver vi på sidan takomläggning. Fler orter längs kusten finns på sidan Kusten."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Vaxholm och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "singo",
    name: "Singö",
    region: "Norra skärgården",
    isIsland: false,
    description:
      "Takbyte och takomläggning på Singö: sex byar från medeltiden och många fritidshus. Vi har bytt tak här. Kostnadsfri takkontroll, fast pris.",
    longDescription:
      "Singö ligger i norra Roslagen, i den nordligaste delen av Stockholms län nära gränsen till Uppsala län. Ön är enligt Wikipedia omkring 25 kvadratkilometer stor och har drygt 300 bofasta invånare och mellan 3 000 och 4 000 fritidsboende. Närmaste tätort är Grisslehamn på Väddö. Ön nämns första gången i ett pantbrev från 1334, och sex byar är kända sedan medeltiden: Söderby, Tranvik, Backby, Norrvreta, Boda och Ellan. Kyrkan byggdes 1753 på samma plats som en äldre kyrka. På 1740-talet köptes hela Backby av en Östhammarsbo som anlade ett kalk- och tegelbruk, och i mitten av 1800-talet kom ett marmorbruk vid Enholmen. Länge kom man till Singö med båt. Waxholmsbolaget gick dagligen från Stockholm via Norrtälje och Väddö kanal till Singö brygga, och den sista turen gick 1951. Bron invigdes 1955, och sedan dess går vägen över Väddö och Fogdö. I dag är de fritidsboende enligt Wikipedia mer än tio gånger så många som de bofasta. Vi har själva bytt tak på Singö. I september 2026 fick ett hus med utsikt över fjärden röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna, och delar av råsponten byttes. Bilder från jobbet finns under våra projekt.",
    extraContent:
      "",
    uniqueFAQ: {"question":"Kan ni samordna takbyte på Singö med projekt i Grisslehamn?","answer":"Hör av dig och berätta var fastigheterna ligger, så tittar vi på om arbetena på Singö, i Grisslehamn och på Väddö kan planeras tillsammans."},
    primaryKeyword: "takläggare Singö",
    lat: 60,
    lng: 18.8,
    nearbyLocations: ["Grisslehamn","Väddö","Arholma"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Byar","value":"Söderby, Tranvik, Backby, Norrvreta, Boda, Ellan"},{"label":"Hustyper","value":"Gårdar i byarna, fritidshus"},{"label":"Bofasta","value":"Cirka 303 (2019)"},{"label":"Förbindelse","value":"Bro sedan 1955, väg via Väddö och Fogdö"},{"label":"Eget referensjobb","value":"Takbyte september 2026, röda betongpannor och röd TP20"}],
    sourceLink: {"label":"Wikipedia, Singö","url":"https://sv.wikipedia.org/wiki/Singö"},
    h1Override: "Takläggare på Singö",
    extraSections: [{"heading":"Vad det betyder för taket","text":"På Singö står gårdar i byar med medeltida anor bredvid fritidshus. Ett hus i en av de gamla byarna kan vara mycket äldre än sitt tak, eftersom taket kan ha lagts om flera gånger. Ett äldre fritidshus kan också ha fått taket omlagt sedan det byggdes. Husets ålder säger därför lite om takets skick. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. Ett fritidshus som står tomt delar av året har ingen som ser en läcka när den börjar, så titta på vinden och i innertaket när huset öppnas för säsongen. På en gård finns ofta fler tak än bostadshusets, till exempel uthus och sjöbod, och de kan ses över vid samma tillfälle. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Singö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "grisslehamn",
    name: "Grisslehamn",
    region: "Norra skärgården",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Grisslehamn på Väddö: äldre boningshus, sommarvillor från 1900-talets början och senare villor. Kostnadsfri takkontroll.",
    longDescription:
      "Grisslehamn ligger på Väddös nordöstra spets, drygt fyra mil norr om Norrtälje, med hamnen vänd mot Ålands hav. Orten är riksintresse för kulturmiljövården, och Norrtälje kommun har beskrivit den i en kulturmiljöutredning. Poststationen flyttades hit 1754 från Gamla Grisslehamn, och posthuset på Tullberget är från 1756. Efter 1809 blev orten gränspost mot Finland, och kasernen och tullbostäderna på berget hör till den tiden. Resten av samhället ligger enligt kommunen utmed den gamla landsvägen från Älmsta, som fortsätter upp mot Singö. Bebyggelsen beskrivs som gles och gradvis framvuxen. I slutet av 1800-talet fick Grisslehamn ett uppsving som sommarort, och under ortens glansperiod i början av 1900-talet fanns fem pensionat. Hotell Havsbaden vid hamnens inlopp stod klart 1903, och Albert Engströms ateljé vid vattnet 1907. Några av gårdarnas boningshus gjordes om till pensionat. Kommunens utredning sammanfattar bebyggelsen utmed landsvägen som äldre boningshus, sommarvillor, pensionat och yngre villor från 1900-talets senare del. Sommarvillorna ligger enligt utredningen på rad utmed vägen, på stora lummiga tomter med närhet till vattnet. I hamnens inre del finns fiskebodar, bryggor och en småbåtshamn, och sedan 1960 går färjan till Eckerö på Åland härifrån.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Grisslehamn?","answer":"Byggperiod enligt källorna: posthuset 1756, sommarvillor och pensionat i början av 1900-talet, yngre villor från 1900-talets senare del. Hustyper: äldre boningshus, sommarvillor, pensionat, yngre villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Grisslehamn",
    lat: 60.1,
    lng: 18.8167,
    nearbyLocations: ["Singö","Väddö","Arholma"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Läge","value":"Väddös nordöstra spets, drygt fyra mil norr om Norrtälje"},{"label":"Hustyper","value":"Äldre boningshus, sommarvillor, pensionat, yngre villor"},{"label":"Byggperiod","value":"Posthuset 1756, sommarvillor och pensionat i början av 1900-talet, yngre villor från 1900-talets senare del"},{"label":"Skydd","value":"Riksintresse för kulturmiljövården"}],
    sourceLink: {"label":"Norrtälje kommun, kulturmiljöutredning Grisslehamn (riksintresseområde), PDF","url":"https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/grisslehamn.pdf"},
    h1Override: "Takläggare i Grisslehamn",
    extraSections: [{"heading":"Vad det betyder för taket","text":"Sommarvillorna från 1900-talets början är i dag omkring 120 år gamla, och de äldre boningshusen är äldre än så. Villorna från 1900-talets senare del är mellan 30 och 70 år. På de äldsta husen har taket med stor sannolikhet lagts om, kanske flera gånger, och husets ålder säger därför lite om taket som ligger där nu. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. En sommarvilla eller ett pensionat från den tiden har ofta veranda, burspråk och flera takfall, och det är i anslutningarna mellan dem som plåtarbetet avgör hur tätt taket blir. Eftersom Grisslehamn är riksintresse för kulturmiljövården är det klokt att ta reda på vad som gäller för huset innan material eller kulör väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Grisslehamn och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "arholma",
    name: "Arholma",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Arholma: redargårdar från 1800-talet, pensionat och fritidshus. Kostnadsfri takkontroll utan förpliktelser, fast pris.",
    longDescription:
      "Arholma var enligt Norrtälje kommun en av de nordligaste utposterna i Stockholms skärgård längs farleden norrut. Ön är riksintresse för kulturmiljövården, och kommunen har beskrivit den i en kulturmiljöutredning. Byn ligger centralt på öns östra sida, och husen ligger tätt längs bygatan, som kantas av hamlade askar. Omkring en fjärdedel av marken och byggnaderna tillhör Skärgårdsstiftelsen. Byn brändes under rysshärjningarna 1719 och byggdes upp igen. När marken storskiftades 1768 fanns tio brukare. Enligt kommunen präglas dagens bykärna av redarböndernas satsningar under 1800-talet, när fraktseglingen växte. De flesta gårdarna fick sina parstugor påbyggda med en våning, och uthusen förstorades till långa längor. Kommunen beskriver redargårdarna som huvudbyggnader i två våningar under sadeltak, med timmerstomme klädd med panel och en veranda eller farstukvist vid entrén. Från slutet av 1800-talet minskade den bofasta befolkningen, och sommargästerna kom. De hyrde in sig på öns sex pensionat, flyttade in i övergivna bostadshus eller byggde nya fritidshus. Pensionatet Ahlmans vid Norra hamnen byggdes 1905. Många gårdar byggdes om igen under 1910- och 1920-talen, med farstukvistar, glasade verandor och frontespiser. I dag har ön enligt Wikipedia omkring 50 bofasta, och på sommaren omkring 500. Hit kommer man med passagerarbåt från Simpnäs på Björkö.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen på Arholma?","answer":"Byggperiod enligt källorna: byn återuppbyggd efter 1719, redargårdarna 1800-tal, pensionat och ombyggnader 1900–1920-tal. Hustyper: redargårdar (påbyggda parstugor), pensionat, fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Arholma",
    lat: 59.85,
    lng: 19.15,
    nearbyLocations: ["Singö","Grisslehamn","Svartlöga"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Redargårdar (påbyggda parstugor), pensionat, fritidshus"},{"label":"Byggperiod","value":"Byn återuppbyggd efter 1719, redargårdarna 1800-tal, pensionat och ombyggnader 1900–1920-tal"},{"label":"Tak (belagt)","value":"Redargårdarnas huvudbyggnader: två våningar under sadeltak (material ej angivet)"},{"label":"Bofasta","value":"Cirka 50 (2018), omkring 500 på sommaren"},{"label":"Förbindelse","value":"Passagerarbåt från Simpnäs, ingen bro"},{"label":"Skydd","value":"Riksintresse för kulturmiljövården"}],
    sourceLink: {"label":"Norrtälje kommun, kulturmiljöutredning Arholma (riksintresseområde), PDF","url":"https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/arholma.pdf"},
    h1Override: "Takläggare på Arholma",
    extraSections: [{"heading":"Vad det betyder för taket","text":"Redargårdarna är från 1800-talet och alltså 150 år gamla eller mer, och pensionaten och de första fritidshusen är omkring 100 till 120 år. På så gamla hus har taket lagts om, ofta flera gånger, och husets ålder säger därför lite om taket som ligger där nu. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. En gård som har byggts på och byggts till i flera omgångar har många anslutningar: mellan den gamla parstugan och påbyggnaden, vid verandan och vid frontespisen. Det är där plåtarbetet avgör hur tätt taket blir. Till en ö utan bro behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. Eftersom Arholma är riksintresse för kulturmiljövården är det klokt att ta reda på vad som gäller för huset innan material eller kulör väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Arholma och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "rimbo",
    name: "Rimbo",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Rimbo, järnvägssamhället som fick sin första stadsplan på 1920-talet och har vuxit i årsringar sedan dess. Kostnadsfri takkontroll.",
    longDescription:
      "Rimbo ligger längs riksväg 77, två mil väster om Norrtälje. Platsen blev enligt Wikipedia tidigt en marknadsplats, eftersom vattenled och landsväg möttes här, och namnet finns i skrift från 1303. Kyrkan är en stenkyrka från 1400-talets senare hälft. Dagens samhälle växte fram kring järnvägen. Banan mellan Länna och Norrtälje öppnades via Rimbo 1884, året efter kom järnvägen från Stockholm, och 1898 togs sträckan mot Hallstavik i bruk. Runt den knutpunkten växte samhället upp en bit från kyrkan, och 1914 blev Rimbo municipalsamhälle. Norrtälje kommun skriver att fyra av socknens byar, Håsta, Viby, Tomta och Asplund, med tiden blev stationssamhället. Under 1920-talet antogs Rimbos första stadsplan. Enligt kommunen finns gatustrukturen från den planen till stor del kvar i de centrala delarna, och planen var påverkad av trädgårdsstadens ideal: boulevarder, gator med alléer och villor i lummiga kvarter med stora trädgårdar. Järnvägarna började avvecklas under 1960-talet, och 1981 lades den sista linjen ner, när persontrafiken mellan Rimbo och Kårsta upphörde. Sedan 1971 hör orten till Norrtälje kommun. I tätorten är fördelningen mellan småhus och flerbostadshus relativt jämn, skriver kommunen, som beskriver Rimbos framväxt som årsringar. Enligt hitta.se är husen mest från 1970- och 1980-talen. Fördjupningen av översiktsplanen räknar med omkring 2 000 nya bostäder fram till 2050, som ännu en årsring.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Småhus och flerbostadshus, \"relativt jämn\" fördelning"},{"label":"Byggperiod","value":"Första stadsplanen under 1920-talet (villor i trädgårdsstadens anda), husen mest från 1970- och 1980-talen enligt hitta.se"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 920 (SCB 2025)"}],
    sourceLink: {"label":"Norrtälje kommun: Fördjupning av översiktsplanen för Rimbo","url":"https://www.norrtalje.se/info/bygga-bo-miljo/norrtalje-vaxer/samhallsplanering/oversiktsplanering/fordjupning-av-oversiktsplanen-for-rimbo/allmanna-intressen/kulturmiljo-och-landskapsbild/"},
    parentLocation: {"name":"Norrtälje","slug":"norrtalje"},
    h1Override: "Takläggare i Rimbo, Norrtälje",
    uniqueFAQ: {"question":"När byggdes husen i Rimbo?","answer":"Byggperiod enligt källorna: första stadsplanen under 1920-talet (villor i trädgårdsstadens anda), husen mest från 1970- och 1980-talen enligt hitta.se. Hustyper: småhus och flerbostadshus med relativt jämn fördelning. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Rimbo",
    lat: 59.7469,
    lng: 18.3639,
    nearbyLocations: ["Norrtälje", "Edsbro", "Riala"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Rimbo kan två grannkvarter ha kommit till med ett halvt sekel emellan. Ett hus som byggdes efter den första stadsplanen är i dag upp emot 100 år gammalt, och husen från 1970- och 1980-talen är mellan runt 40 och drygt 55 år. På de äldre husen kan taken redan ha lagts om, och då är det inte husets byggår som avgör skicket, utan vad som gjordes senast och hur det gjordes. På hus från 1970- och 1980-talen som inte har fått nytt tak är det underlaget under ytskiktet som brukar bestämma om det räcker med en reparation eller om hela taket bör läggas om. Det syns sällan från marken. I kvarter med stora trädgårdar och uppvuxna träd samlas löv i hängrännor och ränndalar, och vattnet behöver ha fri väg ner i stuprören. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Rimbo och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "hallstavik",
    name: "Hallstavik",
    region: "Norra Roslagen",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Hallstavik, brukssamhället vid Edeboviken som växte fram kring pappersbruket från 1915. Kostnadsfri takkontroll.",
    longDescription:
      "Hallstavik är en tätort i norra delen av Norrtälje kommun, omkring fyra mil från Norrtälje, där Skeboån mynnar i Edeboviken. Orten är ung. Fram till början av 1900-talet var Hallsta en by som gränsade till grannbyarna Tulka, Skärsta och Gottsta. Sedan kom pappersbruket. Enligt Wikipedia byggdes det på Hallsta bys utmarker vid Edeboviken, och Hallsta pappersbruk grundades 1915. Bruket expanderade snabbt, och Hallstavik växte till ett brukssamhälle. Bruket finns kvar och har en egen hamn och en järnväg för gods. Det syns i hur husen har kommit till. Enligt hitta.se är husen i tätorten mest byggda på 1950- och 1960-talen, medan delar är från sekelskiftet 1900 till 1920-talet. Bebyggelsen består av både villor och flerbostadshus. Tidigare gick en smalspårig järnväg till Stockholm via Rimbo. Persontrafiken upphörde 1966, och i dag går riksväg 76 strax väster om samhället.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Hallstavik?","answer":"Byggperiod enligt källorna: tätorten mest 1950- och 1960-tal, delar sekelskiftet 1900 till 1920-tal. Hustyper: villor och flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Hallstavik",
    lat: 60.0522,
    lng: 18.5975,
    nearbyLocations: ["Herräng","Älmsta","Väddö"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Villor och flerbostadshus"},{"label":"Byggperiod","value":"Tätorten mest 1950- och 1960-tal, delar sekelskiftet 1900 till 1920-tal"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 980 (SCB 2025)"}],
    sourceLink: {"label":"Wikipedia, Hallstavik","url":"https://sv.wikipedia.org/wiki/Hallstavik"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Husen från brukets första år är i dag omkring hundra år gamla eller mer, och husen från 1950- och 1960-talen mellan 60 och 75 år. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. Därför börjar vi alltid med att titta på taket på plats. Två saker är värda att tänka på. I ett samhälle som har vuxit i två omgångar står hus av olika ålder nära varandra, så grannens tak säger inte mycket om ditt eget. Och ett hus som har byggts till har ofta takdelar av olika ålder, där skarven mellan dem är värd en extra titt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris. Ett komplett takbyte i närheten finns att se under projekt: Nytt tak på Singö, i samma kommun."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Hallstavik och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "almsta",
    name: "Älmsta",
    region: "Norra Roslagen",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Älmsta, samhället vid Väddö kanal med hus på både fastlandet och Väddö. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Älmsta är en tätort i Norrtälje kommun, där Väddö kanal mynnar i Väddöviken. Orten ligger på två sidor av vattnet. Den södra delen, Elmsta by, ligger på fastlandet, och den norra, med byarna Hammarby och Norrsundet, ligger på Väddö. Enligt Wikipedia hade tätorten 1 532 invånare 2022. Många i trakten skriver fortfarande namnet Elmsta. Platsen är gammal. När Elmsta nämns första gången, 1557, var det enligt Wikipedia redan en stor by med sju gårdar, och flera forngravar visar att bygden är äldre än så. Väddö kanal, som går rakt igenom orten, började anläggas 1819 och invigdes 1840. Över kanalen går Älmstabron, en klaffbro som öppnas för båtarna. Dagens samhälle är betydligt yngre än byn. Enligt hitta.se är husen kring Lärarvägen byggda på 1960- och 1980-talen och husen kring Norrtäljevägen på 1960- och 1990-talen. Bebyggelsen består av både villor och flerbostadshus. Norrtälje kommun beskriver i sin översiktsplan hur kanalen går genom orten som ett stråk av vatten och grönska, och hur Älmsta omges av naturområden som har betydelse för både friluftslivet och kulturmiljön. Delar av orten ligger enligt kommunen inom riksintresse för kulturmiljövården. Väddö folkhögskola och Roslagens Sjöfartsmuseum ligger här, och länsväg 283 går genom orten vidare mot Grisslehamn.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Älmsta?","answer":"Byggperiod enligt källorna: kring Lärarvägen 1960- och 1980-tal, kring Norrtäljevägen 1960- och 1990-tal. Hustyper: villor och flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Älmsta",
    lat: 60.0167,
    lng: 18.7,
    nearbyLocations: ["Väddö","Hallstavik","Singö"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Delar","value":"Elmsta by (fastlandet), Hammarby och Norrsundet (Väddö)"},{"label":"Hustyper","value":"Villor och flerbostadshus"},{"label":"Byggperiod","value":"Kring Lärarvägen 1960- och 1980-tal, kring Norrtäljevägen 1960- och 1990-tal"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 360 (SCB 2025)"}],
    sourceLink: {"label":"Norrtälje kommun, Översiktsplan 2050, Älmsta","url":"https://www.norrtalje.se/info/bygga-bo-miljo/norrtalje-vaxer/samhallsplanering/oversiktsplanering/oversiktsplan2050/mark-och-vattenanvandning/almsta/"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Villorna från 1960-talet är i dag omkring 60 år gamla, och husen från 1980- och 1990-talen mellan 30 och 45 år. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om, och ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. Därför börjar vi alltid med att titta på taket på plats. Två saker är värda att tänka på. I ett samhälle som har byggts ut i omgångar står hus av olika ålder nära varandra, så grannens tak säger inte mycket om ditt eget. Och ligger huset inom den del av orten som är riksintresse för kulturmiljövården är det extra viktigt att fråga innan du väljer material eller kulör. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris. Ett komplett takbyte i närheten finns att se under projekt: Nytt tak på Singö, i samma kommun."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Älmsta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "herrang",
    name: "Herräng",
    region: "Norra Roslagen",
    isIsland: false,
    description:
      "Takbyte i Herräng: arbetarbostäder från 1905–1906, egnahem från 1920- och 1950-talen och senare villor. Kostnadsfri takkontroll.",
    longDescription:
      "Herräng ligger på en halvö vid Singöfjärden i Häverö socken, omkring 52 kilometer norr om Norrtälje. Järnmalm bröts här från slutet av 1500-talet till början av 1960-talet, och järnverket vid hamnen var i drift till 1969. Orten är riksintresse för kulturmiljövården, och Norrtälje kommun har beskrivit den i en kulturmiljöutredning från 2016. Bebyggelsen ligger enligt utredningen på båda sidor om sjön Blåkaren. Det var gruvbolaget som byggde bostäderna. När järnverket anlades i början av 1900-talet behövdes många arbetarbostäder, och de uppfördes framför allt vid Udden och i Hensvik. Vid Udden står enligt kommunen fem parhus i gult tegel från omkring 1905 och tre arbetarbostäder i trä med rödfärgad panel, byggda för fem hushåll vardera. I Hensvik lät Herrängs Gruf AB år 1906 bygga disponentbostaden, ingenjörsbostaden och fyra arbetarbostäder. Vid Udden finns också radhuslängor från 1980- och 1990-talen. Egnahemsbyggandet började enligt utredningen på 1920-talet och tog ny fart på 1950-talet. Egnahemmen ligger främst söder om järnverket, öster om Herrängsvägen, på förhållandevis stora trädgårdstomter med uthus, och gatunätet följer terrängen. Fasaderna är bland annat av tegel, träpanel och puts. Kommunen beskriver området som ett villaområde med blandad bebyggelse, från 1900-talets början fram till i dag. Enligt kommunens kulturmiljöunderlag varierar takens utformning i bebyggelsen från 1900-talets mitt, med tälttak och brutna takfall som vanliga former, och taken täcktes tidigare oftast med tvåkupigt lertegel men har i dag också shingel och plåt. Ortens centrala del domineras av hus från 1900-talets mitt, med inslag av fristående villor från åren kring sekelskiftet 1900 och av villor från 1960- till 1980-talen. Vid gruvfälten är marken enligt Wikipedia mestadels avstyckad till sommarstugetomter.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Delområden","value":"Herräng (Udden, Hensvik, egnahemsområdet söder om järnverket)"},{"label":"Hustyper","value":"Arbetarbostäder (parhus och flerhushållshus), egnahem och villor, radhus"},{"label":"Byggperiod","value":"Arbetarbostäder 1901–1908, egnahem 1920-tal och 1950-tal, villor 1960–1980-tal, radhus 1980- och 1990-tal"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 600 (SCB, 2025)"}],
    sourceLink: {"label":"Norrtälje kommun: Kulturmiljöutredning nr 21, Herräng (2016)","url":"https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/herrang.pdf"},
    parentLocation: {"name":"Norrtälje","slug":"norrtalje"},
    h1Override: "Takläggare i Herräng, Norrtälje",
    uniqueFAQ: {"question":"När byggdes husen i Herräng?","answer":"Byggperiod enligt källorna: arbetarbostäder 1901–1908, egnahem från 1920-talet och 1950-talet, villor 1960–1980-tal, radhus vid Udden 1980- och 1990-tal. Enligt Norrtälje kommuns kulturmiljöutredning är tälttak och brutna takfall vanliga på bebyggelsen från 1900-talets mitt, med tvåkupigt lertegel som tidigare vanligaste taktäckning. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Herräng",
    lat: 60.1167,
    lng: 18.6667,
    nearbyLocations: ["Hallstavik", "Singö", "Älmsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Arbetarbostäderna från 1905 och 1906 är i dag 120 år gamla. Egnahemmen från 1920-talet är runt 100 år och de från 1950-talet runt 70 år, medan radhusen vid Udden är mellan 30 och 45 år. På de äldre husen kan taken redan ha lagts om, kanske flera gånger, så byggåret berättar lite om taket som ligger där nu. Det som avgör är underlagspapp, läkt, plåtdetaljer och hängrännor. På parhus och radhus hänger taken ihop med grannens, och anslutningen behöver utföras så att den fungerar åt båda håll. På en trädgårdstomt med uthus finns fler tak än bostadshusets, och de kan ses över vid samma tillfälle. Eftersom Herräng är riksintresse för kulturmiljövården är det klokt att ta reda på vad som gäller för huset innan material eller kulör väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Herräng och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "edsbro",
    name: "Edsbro",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Edsbro, den gamla bruksorten i Norrtälje kommun. Kostnadsfri takkontroll utan förpliktelser och fast pris i offerten.",
    longDescription:
      "Edsbro är en tätort i Norrtälje kommun och kyrkby i Edsbro socken. Enligt Wikipedia är det en gammal bruksort: här fanns ett vallonbruk med masugn och klensmedja, och ruinerna efter dem är välbevarade. Bruket kom till efter en brand. När Skebo bruk brann 1686 fördes masugnsrättigheterna över till Edsbro, och en masugn uppfördes med vattenkraft som drivkälla. Här tillverkades råjärn från 1686 till 1919, och järnet fraktades i pråmar över sjön Närdingen till Skebo för att förädlas. Masugnen har byggts om och på flera gånger, senast 1905. Slaggen från ugnen användes enligt Wikipedia som byggnadsmaterial i byggnaderna runt omkring. Platsen är betydligt äldre än bruket. Vid Edsbro-Kyrksjön ligger fornborgen Lundboborg, 210 meter lång, som troligen uppfördes under folkvandringstiden. På andra sidan sjön finns enligt Wikipedia ytterligare två fornborgar, som inte är arkeologiskt undersökta. Kyrkan är från 1200-talet.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Edsbro?","answer":"Byggperiod enligt källorna: inte belagt (bruket 1686–1919, masugnen påbyggd 1905). Hustyper: inte belagt. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Edsbro",
    lat: 59.8667,
    lng: 18.5,
    nearbyLocations: ["Rimbo","Norrtälje","Bergshamra"],
    factBox: [{"label":"Kommun","value":"Norrtälje"},{"label":"Hustyper","value":"Inte belagt"},{"label":"Byggperiod","value":"Inte belagt (bruket 1686–1919, masugnen påbyggd 1905)"}],
    sourceLink: {"label":"Wikipedia, Edsbro","url":"https://sv.wikipedia.org/wiki/Edsbro"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Husets ålder säger inte hur gammalt taket är, och grannens tak säger inte mycket om ditt eget. Ett tak kan ha lagts om en eller flera gånger, och ett tak kan se helt ut från vägen och ändå ha ett slitet underlag. Därför börjar vi alltid med att titta på taket på plats. Två saker är värda att tänka på. På en gård eller en äldre fastighet finns ofta fler tak än bostadshusets, till exempel uthus och bodar, som det kan löna sig att titta på vid samma tillfälle. Och ett hus som har byggts till har ofta takdelar av olika ålder, där skarven mellan dem är värd en extra titt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Edsbro och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "riala",
    name: "Riala",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Riala, Länna och Rö söder om Norrtälje, från kyrkbyn Riala till kusten vid Penningby. Kostnadsfri takkontroll.",
    longDescription:
      "Söder och sydväst om Norrtälje ligger de tre socknarna Riala, Länna och Rö, som alla sedan 1971 hör till Norrtälje kommun. Riala är både tätort och kyrkby, med Riala kyrka, en skola och en idrottshall. Enligt Wikipedia räknades orten som småort fram till år 2000, eftersom andelen fritidsbebyggelse var för hög för att den skulle klassas som tätort. Riala socken beskrivs som en kuperad skogsbygd med gott om sjöar och mossar och med odlingsbygd i smala dalgångar. Den ligger mellan E18 och länsväg 276, har sjön Largen i söder och når fram till gränsen mot Österåkers och Vallentuna kommuner. I sydväst ligger Sättra och Norrsjön, där det enligt Wikipedia finns fritidshusbebyggelse. Sockennamnet nämns första gången i ett medeltida brev från 1228, och kyrkans långhus dateras till slutet av 1200-talet. Länna socken ligger vid kusten, kring Länna kyrksjö, Rialaån och Penningbyån, och omfattar flera öar i den inre skärgården. Här ligger Penningby slott, vars gods är känt sedan 1339. På 1400-talet byggdes en borg på platsen, vid Penningbyån och Väsbysjön. Slottet eldhärjades 1831 och är byggnadsminne sedan 1980. Bland orterna i socknen nämner Wikipedia Bergshamra, Grovstanäs och Lännaby. Rö socken ligger kring Norrtäljeån och sjöarna Rösjön, Sparren, Viren och Angarn, med odlad slättbygd i mitten och skogsbygd runt om. Förr gick järnvägen mellan Kårsta och Rimbo genom socknen, med en station vid Rö. Enligt hitta.se är husen i Riala mest byggda på 1980-talet och husen vid Penningby på 1920- och 1980-talen.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Norrtälje" },
      { label: "Delområden", value: "Riala, Riala Ekeby, Länna, Penningby, Lackavik, Grovsta, Rö, Rimbo landsbygd" },
      { label: "Hustyper", value: "Villor, gårdar, fritidshusbebyggelse" },
      { label: "Byggperiod", value: "Riala mest 1980-tal, Penningby 1920- och 1980-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 2 900" },
    ],
    sourceLink: { label: "Wikipedia: Riala", url: "https://sv.wikipedia.org/wiki/Riala" },
    parentLocation: { name: "Norrtälje", slug: "norrtalje" },
    h1Override: "Takläggare i Riala, Länna och Rö",
    uniqueFAQ: {
      question: "När byggdes husen i Riala, Länna och Rö?",
      answer:
        "Byggperiod enligt källorna: Riala mest från 1980-talet, husen vid Penningby från 1920- och 1980-talet. Hustyper: villor, gårdar och fritidshusbebyggelse. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Riala",
    lat: 59.6167,
    lng: 18.4,
    nearbyLocations: ["Norrtälje", "Åkersberga", "Rimbo"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen från 1980-talet är i dag runt 40 år gamla och husen från 1920-talet runt 100 år. På de äldre husen kan taken redan ha lagts om, kanske mer än en gång, och husets ålder säger därför lite om hur taket mår. Det som avgör är vad som finns under ytan i dag: underlagspapp, läkt, plåtdetaljer och hängrännor. Ett fritidshus som har byggts till för att bo i året om har ofta skarvar mellan tak från olika tider, och de är värda en extra titt. På en gård med flera byggnader bedöms varje tak för sig. Där skogen står nära huset samlas barr och löv i hängrännor och ränndalar, som behöver hållas rena. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Riala, Länna eller Rö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "graddo",
    name: "Gräddö",
    region: "Rådmansöhalvön",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Gräddö på Rådmansö: sommarhus från slutet av 1800-talet och senare villor. Kostnadsfri takkontroll, fast pris.",
    longDescription:
      "Gräddö ligger i Rådmansö socken, på halvön öster om Norrtälje. Byn nämns första gången 1547. Härifrån gick svenska trupper ombord 1739, och 1809 avseglade en expeditionskår från Gräddö mot Västerbotten. Vi har vår bas i Norrtälje. Vid slutet av 1800-talet blev Gräddö enligt Wikipedia ett populärt turistmål, och en mängd tornförsedda sommarhus uppfördes i området. Flera pensionat startades, och orten fick ett varmbadhus, som 1920 flyttades till Gräddö-Asken. Missionshuset uppfördes 1868 vid Nabbo och flyttades till sin nuvarande plats 1933. Gräddö båtvarv grundades 1924 och byggde motorkryssare och segelbåtar. År 1959 startade Viking Line färjetrafik från Gräddö till Mariehamn. Redan året därpå flyttades trafiken till Kapellskär, längre ut på halvön. Sedan 2015 räknar SCB Nabbo, Gräddö och Rävsnäs som en gemensam tätort, vilket betyder att bebyggelsen har vuxit ihop längs kusten. För dem som bor på Gräskö, strax utanför, är Gräddö enligt Wikipedia en av de två närmaste platserna med butik.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Gräddö?","answer":"Byggperiod enligt källorna: sommarhusen slutet av 1800-talet, missionshuset 1868 (flyttat 1933), varvet 1924. Hustyper: sommarhus från slutet av 1800-talet (tornförsedda), pensionat, senare bebyggelse. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Gräddö",
    lat: 59.7667,
    lng: 18.9333,
    nearbyLocations: ["Rådmansö","Norrtälje","Blidö"],
    factBox: [{"label":"Kommun","value":"Norrtälje (Rådmansö socken)"},{"label":"Tätort","value":"Nabbo, Gräddö och Rävsnäs (SCB sedan 2015)"},{"label":"Hustyper","value":"Sommarhus från slutet av 1800-talet (tornförsedda), pensionat, senare bebyggelse"},{"label":"Byggperiod","value":"Sommarhusen slutet av 1800-talet, missionshuset 1868 (flyttat 1933), varvet 1924"},{"label":"Förbindelse","value":"Väg (Rådmansö, E18 mot Kapellskär)"}],
    sourceLink: {"label":"Wikipedia, Gräddö","url":"https://sv.wikipedia.org/wiki/Gräddö"},
    h1Override: "Takläggare i Gräddö",
    extraSections: [{"heading":"Vad det betyder för taket","text":"Sommarhusen från slutet av 1800-talet är i dag över 120 år gamla. I en tätort som har vuxit ihop finns också hus från senare tid, men källan anger inte när de byggdes. På de äldsta husen har taket med stor sannolikhet lagts om, kanske flera gånger, och husets ålder säger därför lite om taket som ligger där nu. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. Ett hus med torn, veranda eller utbyggnad har ett tak med många vinklar och anslutningar, och det är där plåtarbetet avgör hur tätt taket blir. Har ett sommarhus byggts om för att bo i året om möts ofta tak från olika tider, och skarven mellan dem är värd en extra titt. Till Gräddö går det att köra hela vägen, så material, ställning och container kommer fram på vanligt sätt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Gräddö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "kapellskar",
    name: "Kapellskär",
    region: "Rådmansöhalvön",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Kapellskär och på yttersta Rådmansö. Kostnadsfri takkontroll utan förpliktelser och fast pris i offerten.",
    longDescription:
      "Kapellskär är en udde längst ut på Rådmansö, omkring 90 kilometer nordost om Stockholm. De flesta känner platsen som färjehamn. Vi har vår bas i Norrtälje, i andra änden av halvön. Enligt Wikipedia har sjöfart på Åland och Finland bedrivits härifrån sedan medeltiden, eftersom avståndet till Åland är kort. Platsen nämns första gången 1555. Då syftade namnet på skäret där fyren nu står, och dagens Kapellskär var en ö som hette Långön. På 1700-talet fanns en krog här, och på udden låg ett gästgiveri som stod kvar till mitten av 1800-talet. Omkring 1910 fanns planer på en järnväg från Stockholm hit, men första världskriget satte stopp för dem. Den moderna hamnen kom till 1960, när färjetrafiken flyttades hit från Gräddö. Marken hörde då till Riddersholm. En ny väg ut till hamnen invigdes 1979 och en ny terminal 1981, och sedan 1991 ägs hamnen av Stockholms Hamnar. Färjelägena är byggda på 1960- och 1980-talen.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Kapellskär?","answer":"Byggperiod enligt källorna: anges inte för bostadshus (hamnen 1960, terminalen 1981). Hustyper: anges inte i källan. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Kapellskär",
    lat: 59.7167,
    lng: 19.0667,
    nearbyLocations: ["Rådmansö","Gräddö","Norrtälje"],
    factBox: [{"label":"Kommun","value":"Norrtälje (Rådmansö)"},{"label":"Läge","value":"Udde på Rådmansö, cirka 90 km nordost om Stockholm"},{"label":"Hustyper","value":"Anges inte i källan"},{"label":"Byggperiod","value":"Anges inte för bostadshus (hamnen 1960, terminalen 1981)"},{"label":"Förbindelse","value":"Väg till hamnen (ny väg 1979)"}],
    sourceLink: {"label":"Wikipedia, Kapellskär","url":"https://sv.wikipedia.org/wiki/Kapellskär"},
    h1Override: "Takläggare i Kapellskär",
    extraSections: [{"heading":"Vad det betyder för taket","text":"Källorna beskriver hamnen och inte bostadshusen, så vi säger inget om när husen här är byggda. Det behövs inte heller för att bedöma ett tak. Husets ålder säger lite om takets skick, eftersom taket kan ha lagts om sedan huset byggdes. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag, och det går bara att se på plats. Ett fritidshus som står tomt delar av året har ingen som ser en läcka när den börjar, så titta på vinden och i innertaket när huset öppnas för säsongen. Har huset byggts till möts tak från olika tider, och skarven mellan dem är värd en extra titt. Till Kapellskär går det väg hela vägen, så material, ställning och container kommer fram på vanligt sätt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Kapellskär eller på yttersta Rådmansö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "akersberga",
    name: "Åkersberga",
    region: "Österåker",
    isIsland: false,
    description:
      "Takläggare i Åkersberga — takbyte, takomläggning och takrenovering med fast pris. Kostnadsfri takkontroll.",
    longDescription:
      "Åkersberga är centralort i Österåkers kommun, mellan Täby och Norrtälje, med Trälhavet och skärgården i öster. Orten är ung: den började som en järnvägsstation på ett gärde 1901. Den som söker takläggare i Åkersberga har i dag ett hus i något av de villaområden som sedan dess har vuxit fram runt stationen, ute vid kusten eller på öarna. Här går vi igenom dem.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Åkersberga?","answer":"Byggperiod enligt källorna: från sekelskiftet 1900 (Österskär, Linanäs) till 2000-talet. Hustyper: villor, äldre trävillor, fritidshus och sommarstugor ombyggda till permanentbostäder. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Åkersberga",
    lat: 59.4794,
    lng: 18.3,
    nearbyLocations: ["Ljusterö","Vaxholm","Riala"],
    factBox: [{"label":"Kommun","value":"Österåker"},{"label":"Delar som nämns","value":"Åkersberga, Österskär, Stora Stava, Svinninge, Täljö, Margretelund, Rydbo, Brevik, Gröndal, Lervik, Skärgårdsstad, Ljusterö (Linanäs)"},{"label":"Hustyper","value":"Villor, äldre trävillor, fritidshus och sommarstugor ombyggda till permanentbostäder"},{"label":"Byggperiod","value":"Från sekelskiftet 1900 (Österskär, Linanäs) till 2000-talet"}],
    sourceLink: {"label":"Wikipedia, Åkersberga","url":"https://sv.wikipedia.org/wiki/Åkersberga"},
    extraSections: [{"heading":"Från station till centralort","text":"Enligt Wikipedia byggdes stationen 1901 på mark som hörde till gården Berga, och den skyltades \"Åkers Berga\" för att skilja den från andra stationer med samma namn. Banan förlängdes sedan med stationerna Tunagård och Österskär, i områden som bebyggdes med villor. På 1930-talet räknades Åkersberga och Österskär som två tätorter, med 286 respektive 277 invånare år 1935, och sedan 1950 anses de sammanvuxna. I dag har Roslagsbanan fyra stationer inom tätorten."},{"heading":"Österskär","text":"Österskär är villaområdet på halvön mellan Tunaviken och Sätterfjärden. De första tomterna styckades av från Tuna gård vid förra sekelskiftet, och enligt Wikipedia byggdes då stora trävillor. Roslagsbanan förlängdes hit 1906. Under 1920- och 1930-talen byggdes allt fler fritidshus, och när skolan kom 1968 tog den bofasta utbyggnaden fart, med nya hus och sommarstugor som byggdes om till permanentbostäder."},{"heading":"Villaområdena runt tätorten","text":"Enligt hitta.se är husen i flera av villaområdena runt Åkersberga byggda under årtiondena efter kriget. I Stora Stava och i Svinninge är villorna mest från 1950- och 1960-talen, och i Täljö likaså. Svinninge byggdes enligt Wikipedia dessutom ut kraftigt västerut i början av 1990-talet. I Margretelund är husen mest från 1970- och 1990-talen, och i Rydbo från 1980- och 2000-talen."},{"heading":"Ut mot kusten","text":"Öster om tätorten ligger Brevik, Lervik och Flaxenvik med flera mindre delar, som tillsammans bildar ett stort sammanhängande småhusområde. Enligt hitta.se är villorna i Brevik och Gröndal främst från 1950- och 1960-talen och i Lervik från 1930- och 1970-talen. Skärgårdsstad, vid kusten, bebyggdes främst under 1980- och 1990-talen."},{"heading":"Ljusterö och öarna","text":"Ljusterö nås med vägfärja från Östanå. I Linanäs styckades 75 tomter av redan 1901, och Österåkers kommun beskriver ön som en blandning av permanentboende och fritidsboende, med äldre sommarvillor och nyare hus. Hur ett takbyte går till där beskriver vi i takbyte på Ljusterö."},{"heading":"Vad det betyder för taket","text":"Husen i Österåker är alltså allt från ett par årtionden till över hundra år gamla. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Tre saker är värda att tänka på. - **Sommarstugor som har blivit åretruntbostad.** De har i regel byggts om och till, och då finns det ofta takdelar av olika ålder på samma hus. Skarven mellan dem är värd en extra titt. Ett fritidshus kan också vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. - **Äldre trävillor.** På en villa från 1900-talets början är takets form, material och detaljer en del av husets uttryck. - **Hus på en ö.** Till Ljusterö går vägfärjan, så material och ställning kan köras fram som på fastlandet. Till en ö utan bilväg behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Åkersberga","text":"Vi är en takfirma med bas i Norrtälje, i grannkommunen, och tar uppdrag i Åkersberga och resten av Österåker. Mer om varje tjänst finns på sidorna om takbyte i Åkersberga, takomläggning i Åkersberga och takrenovering i Åkersberga. Fler orter i kommunen finns på sidan Österåker."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Åkersberga och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "osterskar",
    name: "Österskär",
    region: "Österåker",
    isIsland: false,
    description: "Takbyte i Österskär i Österåker: trävillor från sekelskiftet, fritidshus från 1920–30-talen och villor från 1970–90-talen. Kostnadsfri takkontroll.",
    longDescription: "Österskär är ett villaområde i tätorten Åkersberga, på en kuperad halvö mellan Trälhavets vikar Tunaviken och Sätterfjärden. Här ligger Roslagsbanans stationer Tunagård och Österskär, den senare slutstation på linjen. På halvön finns också Tunaborgen, med anor från 1200-talet. Österskär är fortfarande en egen postort, och alla fastigheter heter Tuna. Namnet kom till genom en pristävling vid förra sekelskiftet, när ett trettiotal tomter vid Trälhavet och Tunaviken styckades av från Tuna gård. Tidigare hette platsen Tunanäs eller Biskopsudden, och den enda bebyggelsen var Biskopstuna, ursprungligen från 1600-talet, och ett dragontorp. Vid sekelskiftet ägde direktören Abel Bergman större delen av det som i dag är Österskär. Han styckade av tomter och annonserade om \"välbelägna tomter i barr- och löfskog\" med goda kommunikationer med ångbåt och järnväg. Enligt Wikipedia byggdes då stora trävillor med snickarglädje och punschverandor. År 1906 förlängdes Roslagsbanan till Österskär av AB Åkersberga-Trälhavet. Generalkonsul E.W. Wallin köpte Tuna gård 1909 och styckade av ytterligare 250 tomter, och Österskärs Havsbad anlades. Ångbåtsbryggan stod klar 1912, och 1919 tillkom stationen Tunagård. Under 1920- och 30-talen byggdes allt fler fritidshus, och Österskär blev en sommarort för stockholmare. År 1935 hade Österskär 277 invånare, och från 1950 räknas det som sammanvuxet med Åkersberga. När Österskärsskolan byggdes 1968 tog den stora bofasta expansionen fart, med nya hus och sommarstugor som byggdes om till permanentbostäder. I dag är i princip hela halvön bebyggd, och enligt hitta.se är villorna och kedjehusen främst byggda på 1970- och 1990-talen.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Österskär?","answer":"Byggperiod enligt källorna: trävillor från sekelskiftet, fritidshus 1920–30-tal, villor och kedjehus mest 1970- och 1990-tal. Hustyper: villor och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Österskär",
    lat: 59.4667,
    lng: 18.35,
    nearbyLocations: ["Åkersberga","Brevik"],
    factBox: [{"label":"Kommun","value":"Österåker"},{"label":"Delområden","value":"Österskär, Sättra, Valhallsvägen, Geijersvägen, Lindholmen"},{"label":"Hustyper","value":"Villor och kedjehus"},{"label":"Byggperiod","value":"Trävillor från sekelskiftet, fritidshus 1920–30-tal, villor och kedjehus mest 1970- och 1990-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 810"}],
    sourceLink: {"label":"Wikipedia: Österskär","url":"https://sv.wikipedia.org/wiki/%C3%96stersk%C3%A4r"},
    parentLocation: {"name":"Österåker","slug":"akersberga"},
    h1Override: "Takläggare i Österskär, Åkersberga",
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Österskär står sekelskiftets trävillor nära fritidshus från 1920- och 30-talen och villor från 1970- till 1990-talet. De äldsta husen är över hundra år gamla, medan de flesta villorna och kedjehusen är runt 30–55 år. Taken kan redan ha lagts om en eller flera gånger, och i omvandlade sommarstugor kan taket ha byggts om eller byggts på vid olika tillfällen. Därför går det inte att säga något generellt om skicket. På de gamla trävillorna är takets form och detaljer en del av husets karaktär, och det är värt att tänka på redan när materialet väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Österskär och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "vallentuna",
    name: "Vallentuna",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takläggare i Vallentuna — takbyte, takomläggning och takrenovering med fast pris. Kostnadsfri takkontroll.",
    longDescription:
      "Vallentuna ligger norr om Täby, med Norrtälje, Österåker, Upplands Väsby och Sigtuna som övriga grannar. Kommunen bildades 1971 och omfattar åtta gamla socknar, från centralorten i söder till Kårsta i norr. Den som söker takläggare i Vallentuna har oftast ett hus i tätorten längs Roslagsbanan, men kommunen har också villaområden i mindre orter och gårdar på landsbygden. Här går vi igenom dem.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Vallentuna?","answer":"Byggperiod enligt källorna: 1950-talet till 2010-talet i tätorten och Lindholmen. Hustyper: villor, på landsbygden villor och lantbruk. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Vallentuna",
    lat: 59.5342,
    lng: 18.0778,
    nearbyLocations: ["Rimbo","Åkersberga","Norrtälje"],
    factBox: [{"label":"Kommun","value":"Vallentuna"},{"label":"Delar som nämns","value":"Ormsta, Bällsta, Västra Bällsta, Molnby, Snapptuna, Rickeby, Kragstalund, Uthamra, Lindholmen, Kårsta, Brottby (Karby, Sunnersta, Sundby)"},{"label":"Hustyper","value":"Villor, på landsbygden villor och lantbruk"},{"label":"Byggperiod","value":"1950-talet till 2010-talet i tätorten och Lindholmen"}],
    sourceLink: {"label":"Wikipedia, Vallentuna","url":"https://sv.wikipedia.org/wiki/Vallentuna"},
    extraSections: [{"heading":"Tätorten längs Roslagsbanan","text":"Enligt Wikipedia har Vallentuna tätort vuxit fram längs Roslagsbanan, där mindre samhällen i södra delen av kommunen gradvis har vuxit ihop. På 1930- och 1940-talen fanns bland annat två tegelbruk i centralorten. Sedan gick det fort: 1944 hade tätorten omkring 2 300 invånare och 1952 nästan 5 900. Utbyggnaden skedde i etapper, och det syns i när husen är byggda. Enligt hitta.se är husen i Ormsta, längst i norr, främst från 1950- och 1970-talen. I Bällsta är de från 1960- och 2000-talen, i Västra Bällsta från 1970- och 1980-talen och i Molnby från 1980- och 2000-talen. I väster är husen i Snapptuna från 1960- och 1970-talen och i Rickeby från 1970- och 1980-talen. I söder är husen i Kragstalund från 1970- och 1980-talen, medan Uthamra har hus från 2000- och 2010-talen."},{"heading":"Lindholmen","text":"Fem kilometer norr om tätorten ligger Lindholmen, med egen station på Roslagsbanan. Enligt Wikipedia började Lindholmens trädgårdsstad anläggas i början av 1950-talet, på båda sidor om stationen, och de första husen byggdes på moränbackar och annan mark som inte gick att odla. Sedan dess har orten byggts ut i flera omgångar, och här finns hus från 1970-talet fram till 2010-talet."},{"heading":"De mindre orterna","text":"Kårsta, i kommunens norra del, byggdes enligt Wikipedia upp när järnvägsstationen anlades där, omkring två kilometer från kyrkbyn. Stationen är en av Roslagsbanans slutstationer. I Brottby, vid E18, ligger villaområdena Karby och Sunnersta väster om motorvägen och Sundby öster om den. På landsbygden finns villor och lantbruk."},{"heading":"Vad det betyder för taket","text":"Villorna i Vallentuna är alltså mellan ett tiotal och drygt sjuttio år gamla, beroende på var huset står, och på landsbygden finns äldre gårdar. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om, och ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. Tre saker är värda att tänka på. - **Kvarter som byggdes samtidigt.** Där ser taken lika ut från gatan, men de har skötts och lagts om var för sig. Grannens tak säger inte mycket om ditt eget. - **Kvarter som har byggts ut i omgångar.** I flera delar av tätorten står hus från olika årtionden nära varandra, till exempel från 1960-talet och 2000-talet i samma område. - **Gårdar med flera tak.** På en gård finns ofta fler tak än bostadshusets, till exempel uthus och bodar, som det kan löna sig att titta på vid samma tillfälle. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Vallentuna","text":"Vi är en takfirma med bas i Norrtälje, i grannkommunen, och tar uppdrag i Vallentuna. Mer om varje tjänst finns på sidorna om takbyte i Vallentuna, takomläggning i Vallentuna och takrenovering i Vallentuna. Vallentuna hör till området Roslagens inland i vår indelning."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Vallentuna och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "taby",
    name: "Täby",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takläggare i Täby — takbyte, takomläggning, bandtäckning och takrenovering. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Täby ligger norr om Stockholm, med Stora Värtan i öster och med Danderyd, Sollentuna, Upplands Väsby, Vallentuna och Österåker som grannar. Kommunen bildades 1971 ur Täby köping och har enligt Wikipedia 29 kommundelar. Den som söker takläggare i Täby har alltså ett hus i ett av många villaområden, och de har kommit till på olika sätt och under olika årtionden. Här går vi igenom dem i den ordning de byggdes.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Täby?","answer":"Byggperiod enligt källorna: från 1880-talets järnväg och 1907 års avstyckningsplan till 1980-talets typhus. Hustyper: villor från 1900-talets första årtionden, villor från 1930–1960-talen, typhus från 1960–1980-talen, kvarvarande fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Täby",
    lat: 59.4439,
    lng: 18.0686,
    nearbyLocations: ["Vallentuna","Åkersberga","Vaxholm"],
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Kommundelar som nämns","value":"Roslags-Näsby, Täby kyrkby (Karlslund, Byle), Viggbyholm, Näsbypark, Ensta, Lahäll, Gribbylund, Skarpäng, Vallabrink"},{"label":"Hustyper","value":"Villor från 1900-talets första årtionden, villor från 1930–1960-talen, typhus från 1960–1980-talen, kvarvarande fritidshus"},{"label":"Byggperiod","value":"Från 1880-talets järnväg och 1907 års avstyckningsplan till 1980-talets typhus"}],
    sourceLink: {"label":"Wikipedia, Täby kommun","url":"https://sv.wikipedia.org/wiki/Täby_kommun"},
    extraSections: [{"heading":"Villastäderna längs Roslagsbanan","text":"Täby blev villaort med järnvägen. Roslagsbanan drogs fram på 1880-talet, och enligt Täby kommun växte villaområdena fram kring stationerna. - **Roslags-Näsby** kom till i anslutning till stationen, på mark som hörde till Näsby slott. Området planerades enligt det tidiga 1900-talets trädgårdsideal, med slingrande vägar och lummiga tomter, och från 1930-talet bredde villasamhället ut sig över den tidigare odlingsmarken. - **Täby kyrkby**, med Karlslund och Byle, fick en ny villastad med avstyckningsplanen från 1907, planerad med slingrande vägar och stora tomter. År 1925 bodde 1 250 personer i kyrkbyn. - **Viggbyholm** fick en hållplats 1903 och en station 1910. År 1919 togs en mönsterbok med villor och sportstugor fram, och enligt kommunen präglas området fortfarande av den gamla planens struktur, med villor och några kvarvarande enkla fritidshus. - **Näsbypark** växte fram kring Näsby slott. Näsby Fastighets AB bildades 1907 och började stycka tomter, och enligt kommunen var över 200 tomter bebyggda redan 1933. Näsby allé kantas av villor från 1930- och 1940-talen. - **Ensta** fick sin hållplats 1911. Villabyggandet tog fart med 1930-talets styckningsplan och var enligt kommunen särskilt intensivt under 1940- till 1960-talen."},{"heading":"Sommarstugeområdena som blev villakvarter","text":"Flera kommundelar började som glesa områden med sommarstugor på stora tomter och fick sin nuvarande form långt senare. - **Lahäll** började bebyggas i slutet av 1920-talet, mest med sommarstugor, som sedan har ersatts av åretruntbostäder. Området fördes senare över från Danderyd till Täby. - **Gribbylund** styckades till sommarstugetomter från 1919. Enligt kommunen förblev kommundelen glest bebyggd fram till 1970-talet, då planeringen av dagens villakvarter tog fart, och bebyggelsen är mest typhus från 1970- och 1980-talen. - **Skarpäng** förvandlades till tätt villaområde med 1960-talets förnyelseplanering och 1970-talets stadsplaner, och präglas enligt kommunen av typhus från 1970- och 1980-talen. - **Vallabrink** förblev glest bebyggt fram till 1960-talet. Kommunen beskriver det som dominerat av typvillor från framför allt 1960- och 1970-talen. Täby har också grupphusområden med kedjehus från 1950- och 1960-talen. Ett av dem är Ella gård, som har egna riktlinjer i kommunens kulturmiljöprogram."},{"heading":"Vad det betyder för taket","text":"Villorna i Täby är alltså mellan fyrtio och drygt hundra år gamla, beroende på var i kommunen huset står. Husens ålder säger inte hur gammalt taket är. På de äldre villorna kan taket ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Tre saker är värda att tänka på. - **Hus som har vuxit.** En sommarstuga som har blivit åretruntbostad har i regel byggts om och till, och då finns det ofta takdelar av olika ålder på samma hus. Skarven mellan dem är värd en extra titt. - **Äldre villor med eget uttryck.** På en villa från 1900-talets första årtionden är takets form, material och detaljer en del av husets karaktär. Täby kommun har råd och riktlinjer för flera av de äldre miljöerna. - **Typhus från samma år.** I ett kvarter där husen byggdes samtidigt ser taken lika ut från gatan, men de har skötts och lagts om var för sig. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Täby","text":"Vi är en takfirma med bas i Norrtälje och tar uppdrag i Täby. Mer om varje tjänst finns på sidorna om takbyte i Täby, takomläggning i Täby och takrenovering i Täby. Täby hör till området Roslagens inland i vår indelning."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Täby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "ella-gard",
    name: "Ella gård",
    region: "Roslagens inland",
    isIsland: false,
    description: "Takbyte och takomläggning i Ella gård i Täby. Kostnadsfri takkontroll utan förpliktelser, fast pris och hänsyn till kommunens riktlinjer för kulturmiljön.",
    longDescription: "Ella gård i Täby är ett av Sveriges första kedjehusområden. Bygget började 1955, bara ett år efter att jordbruket på den gamla gården hade lagts ned, och under en period på femton år växte cirka 500 hus fram. Först byggdes den norra delen, sedan den södra. I början av 1970-talet kompletterades området västerut med två delområden med låga grupphus. Husen är byggda efter 1950-talets ideal om grannskap och rationellt byggande: prefabricerade trähus på betongplatta, ordnade i grupper längs slingrande gator och omgivna av stora gröna ytor. Karaktären är tydlig och enhetlig. Enligt kommunens beskrivning kännetecknas bebyggelsen av sadeltak med tegelpannor, stående träpanel och vita fönsterfoder, och de ursprungliga takkuporna är inramade av svart plåt. Området beskrivs av Täby kommun som mycket välbevarat, och i kommunens kulturmiljöprogram finns riktlinjer för hur husen ska förändras.",
    extraContent:
      "",
    factBox: [
      { label: "Kommun", value: "Täby" },
      { label: "Hustyper", value: "Kedjehus och radhus (grupphus)" },
      { label: "Byggperiod", value: "1955–ca 1970, två delområden tidigt 1970-tal" },
      { label: "Antal hus i ursprungsplanen", value: "Ca 500" },
      { label: "Kulturmiljö", value: "Täby kommuns riktlinje: \"Takpannor av lertegel bör användas\"" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 500" },
    ],
    sourceLink: {
      label: "Täby kommun: Ella gård (kulturmiljö, råd och riktlinjer)",
      url: "https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/ella-gard",
    },
    parentLocation: {"name":"Täby","slug":"taby"},
    uniqueFAQ: {
      question: "Måste jag använda lertegel om jag byter tak i Ella gård?",
      answer:
        "Täby kommun har en riktlinje för Ella gård om att takpannor av lertegel bör användas, för att bevara områdets tidstypiska karaktär, men det är en rekommendation, inte ett krav. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Vi tar med riktlinjerna i underlaget när vi tar fram offerten.",
    },
    primaryKeyword: "takläggare Ella gård",
    lat: 59.4447,
    lng: 18.0539,
    nearbyLocations: ["Täby", "Vallentuna", "Åkersberga"],
    h1Override: "Takläggare i Ella gård, Täby",
    extraSections: [{ heading: "Vad det betyder för taket", text: "Den som byter tak i Ella gård behöver ta hänsyn till kulturmiljön. Enligt Täby kommuns råd och riktlinjer för Ella gård bör takpannor av lertegel användas, och större förändringar av husens tidstypiska arkitektur bör undvikas. Det gäller alltså inte bara vilket material som läggs, utan också detaljer som takkupornas plåtinklädnad och hur taket ansluter till fasaden. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Många av husen byggdes under 1950- och 60-talen. Tak från den tiden kan redan ha lagts om en gång, men där det inte har skett är underlagspapp, läkt och plåtdetaljer ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. Eftersom husen i ett kvarter ofta är likadana och byggda samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Det kan göra planering och logistik enklare, men varje hus får alltid en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris.** Du får en offert med fast pris, där kommunens riktlinjer för Ella gård tas med i underlaget.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Ella gård och funderar på att byta eller lägga om taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "skarpang",
    name: "Skarpäng",
    region: "Roslagens inland",
    isIsland: false,
    description: "Takbyte och takomläggning i Skarpäng i Täby, ett villaområde med typhus från 1970- och 80-talen. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription: "Skarpäng ligger i kuperad terräng i sydvästra Täby, på gränsen mot Sollentuna och Danderyd. Namnet kommer från ängen Skarpängen, som finns med på en karta över Ella från 1715. Där beskrivs den som en skarp och torr äng, alltså en mark med mager och torr jord. Längst i söder finns torpet Skarpäng, anlagt vid mitten av 1700-talet, som har gett kommundelen dess namn. Liksom flera andra villaområden i Täby började Skarpäng som en gles bebyggelse på stora tomter, främst sommarstugor. Förvandlingen till tätt villaområde tog fart med 1960-talets förnyelseplanering och 1970-talets nya stadsplaner. Enligt Täby kommuns beskrivning präglas området i dag helt av typhus från 1970- och 80-talen, med fasader i mexitegel och trä. Ett kännetecken är 1970-talets medvetna markutnyttjande med skafttomter, och husen är placerade med hänsyn till terrängen och växtligheten. I norr finns enligt kommunen flera grupphusområden med radhus och friliggande hus. Vid Rösjövägen ligger ett litet centrum från första halvan av 1980-talet.",
    extraContent:
      "Kvarteret Knäpparen: Ett kvarter sticker ut. I Knäpparen uppfördes husen 1978–1979 efter ritningar av arkitekten Gustaf Lettström, med fasader av rödbrunt eller sandfärgat tegel och mörkbruna vindskivor och fönstersnickerier. Täby kommuns råd och riktlinjer för Knäpparen är att behålla bruna fönstersnickerier, ursprungliga tegelfasader och svarta tak. Vid ett takbyte i kvarteret är det därför klokt att ta hänsyn till det redan när materialet väljs.",
    factBox: [
      { label: "Kommun", value: "Täby" },
      { label: "Hustyper", value: "Villor, radhus, grupphus" },
      { label: "Byggperiod", value: "Typhus 1970- och 80-tal, Knäpparen 1978–79" },
      { label: "Kulturmiljö", value: "Knäpparen (ett kvarter): riktlinje \"Behåll … svarta tak\"" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 200" },
    ],
    sourceLink: {
      label: "Täby kommun: Skarpäng (kulturmiljö, råd och riktlinjer)",
      url: "https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/skarpang",
    },
    parentLocation: {"name":"Täby","slug":"taby"},
    uniqueFAQ: {
      question: "Gäller kulturmiljöriktlinjerna hela Skarpäng?",
      answer:
        "Nej. Täby kommuns riktlinje om att behålla bruna fönstersnickerier, ursprungliga tegelfasader och svarta tak gäller specifikt kvarteret Knäpparen, inte hela Skarpäng. Vi tar med riktlinjerna i underlaget när vi tar fram offerten om ditt hus ligger i Knäpparen.",
    },
    primaryKeyword: "takläggare Skarpäng",
    lat: 59.4440,
    lng: 18.0194,
    nearbyLocations: ["Täby", "Sollentuna", "Vallentuna"],
    h1Override: "Takläggare i Skarpäng, Täby",
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Skarpäng är i dag runt 40–50 år gamla. Taken kan redan ha lagts om, men där det inte har skett är det ofta dags att se över underlagspapp, läkt, plåtdetaljer och hängrännor. I ett område med skafttomter och kuperad terräng kan åtkomsten till huset dessutom påverka hur ett takbyte planeras. I grupphusområdena är husen ofta likadana och byggda samtidigt, och då kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten, där kommunens riktlinjer tas med i underlaget om huset ligger i Knäpparen.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Skarpäng och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "viby",
    name: "Viby",
    region: "Norra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Viby i Sollentuna, med villor, radhus och kedjehus från 1960- till 1980-talet. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription: "Viby i norra Sollentuna har en historia som sträcker sig långt före villaområdena. Här finns gravfält och boplatser från yngre järnåldern, och vid nuvarande Rävgärdsvägen finns en runristning i berghällen från mitten av 1000-talet, som räknas som det äldsta kända skriftliga meddelandet från trakten. Namnet kommer från Viby gård, ett tidigare säteri som är känt i skrift sedan 1409. På en karta från 1687 sträcker sig gårdens ägor från sjön Ravalen och dagens Uppsalavägen i öster till Översjön i väster, med flera torp under sig. Herrgården från 1820-talet står kvar och ägs i dag av Sollentuna hembygdsförening. Den moderna bebyggelsen växte fram när gårdens ekonomibyggnader revs på 1960-talet och Vibys ägor började bebyggas med bostäder. Redan vid tätortsavgränsningen 1960 räknades den framväxande bebyggelsen som en egen tätort, och sedan 1970 räknas den som sammanvuxen med Sollentuna. Enligt beskrivningar av kommundelen består bebyggelsen i dag huvudsakligen av villor och radhus, fördelade på områdena Lilla Viby, Östra Viby, Viby gård och Södra Viby. Enligt hitta.se är husen främst byggda på 1960- och 1980-talen. Kommundelen gränsar till Rotebro, Norrviken, Häggvik och Järvafältet, och med knappt 5 700 invånare är Viby den femte största kommundelen i Sollentuna sett till invånarantal.",
    extraContent:
      "",
    factBox: [
      { label: "Kommun", value: "Sollentuna" },
      { label: "Delområden", value: "Lilla Viby, Östra Viby, Viby gård, Södra Viby" },
      { label: "Hustyper", value: "Villor, kedjehus, radhus" },
      { label: "Byggperiod", value: "1960- och 1980-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 300" },
    ],
    parentLocation: {"name":"Sollentuna","slug":"sollentuna"},
    uniqueFAQ: {
      question: "Hur gammal är bebyggelsen i Viby?",
      answer:
        "Enligt hitta.se är husen i Viby främst byggda på 1960- och 1980-talen. Taken kan redan ha lagts om en eller flera gånger, så vi kan inte säga något generellt om skicket — vi tittar alltid på ditt tak på plats vid en kostnadsfri takkontroll.",
    },
    primaryKeyword: "takläggare Viby",
    lat: 59.4578,
    lng: 17.8952,
    nearbyLocations: ["Sollentuna", "Täby", "Upplands Väsby"],
    sourceLink: {"label":"Wikipedia: Viby, Sollentuna","url":"https://sv.wikipedia.org/wiki/Viby,_Sollentuna"},
    h1Override: "Takläggare i Viby, Sollentuna",
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Viby är i dag runt 40–60 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. I radhus- och kedjehusområdena är husen ofta likadana och byggda samtidigt. Där kan grannar ibland ha nytta av att planera takbyten i samma veva, även om varje hus alltid får en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Viby och funderar på att byta eller lägga om taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "brevik",
    name: "Brevik",
    region: "Österåker",
    isIsland: false,
    description: "Takbyte och takomläggning i Brevik, Lervik, Flaxenvik och Skärgårdsstad i Österåker. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription: "Öster om Åkersberga, ut mot kusten, ligger ett område med flera mindre delar: Brevik, Lervik, Flaxenvik, Ekhammar, Gröndal, Tråsättra, Skärgårdsstad, Översättra och södra Margretelund. Tillsammans bildar de ett stort sammanhängande småhusområde. Bebyggelsen har vuxit fram under lång tid. Enligt hitta.se är villorna i Brevik och Gröndal främst byggda på 1950- och 1960-talen, och villorna i Lervik på 1930- och 1970-talen. I Tråsättra finns kedjehus och radhus från 1970- och 1980-talen. Skärgårdsstad har en egen historia. Området ligger vid kusten, mellan Solbergasjön, Bosjön och Isättraviken, cirka sju kilometer från Åkersberga och till stor del omgivet av skog. Här fanns tidigare gruvhantering, och när den lades ned togs en detaljplan fram för bostäder. Skärgårdsstad bebyggdes främst under 1980- och 90-talen, och gatorna är uppkallade efter de bönder som ursprungligen ägde marken eller efter gruvdriften. Området har en egen samfällighetsförening. Närheten till Åkersberga har präglat hela området sedan järnvägen kom. Åkersberga station öppnade 1901 vid den dåvarande kustbanan, och orten är i dag centralort i Österåkers kommun.",
    extraContent:
      "",
    factBox: [
      { label: "Kommun", value: "Österåker" },
      { label: "Delområden", value: "Brevik, Lervik, Flaxenvik, Ekhammar, Gröndal, Tråsättra, Skärgårdsstad, Översättra, södra Margretelund" },
      { label: "Hustyper", value: "Villor, kedjehus och radhus (Tråsättra)" },
      { label: "Byggperiod", value: "Brevik/Gröndal 1950–60-tal, Lervik 1930- och 70-tal, Tråsättra 1970–80-tal, Skärgårdsstad 1980–90-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 800" },
    ],
    parentLocation: {"name":"Österåker","slug":"akersberga"},
    uniqueFAQ: {
      question: "Är bebyggelsen i Brevik-området enhetlig?",
      answer:
        "Nej. Området spänner från 1930-talsvillor i Lervik till 1980–90-talsbebyggelse i Skärgårdsstad, så det går inte att säga något generellt om takens skick. Vi tittar alltid på ditt tak på plats vid en kostnadsfri takkontroll innan vi lämnar ett fast pris.",
    },
    primaryKeyword: "takläggare Brevik",
    lat: 59.4593,
    lng: 18.3624,
    nearbyLocations: ["Åkersberga", "Vaxholm", "Ljusterö"],
    sourceLink: {"label":"Wikipedia: Skärgårdsstad","url":"https://sv.wikipedia.org/wiki/Sk%C3%A4rg%C3%A5rdsstad"},
    h1Override: "Takläggare i Brevik, Lervik och Flaxenvik, Österåker",
    extraSections: [{ heading: "Vad det betyder för taket", text: "I ett område med hus från 1930-talet till 1990-talet finns ingen typisk takålder. Villorna från 1950- och 60-talen är i dag runt 60–70 år gamla, kedjehusen och radhusen i Tråsättra runt 40–50 år, och husen i Skärgårdsstad runt 30–40 år. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Det enda säkra sättet att veta vad taket behöver är att titta på det på plats. I Tråsättra och Skärgårdsstad, där husen ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. ROT-avdraget på 30 % av arbetskostnaden drar vi direkt på fakturan.","Bor du i Brevik, Lervik, Flaxenvik eller Skärgårdsstad? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "ormsta",
    name: "Ormsta",
    region: "Roslagens inland",
    isIsland: false,
    description: "Takbyte och takomläggning i Ormsta, Bällsta, Västra Bällsta och Molnby i Vallentuna. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription: "Vallentuna tätort har vuxit fram längs Roslagsbanan, där mindre samhällen i södra delen av kommunen gradvis har vuxit ihop. I norr sträcker sig tätorten upp till Ormsta, och i de östra och norra delarna ligger bostadsområden som Ormsta, Bällsta, Västra Bällsta och, enligt hitta.se, Molnby. Enligt beskrivningar av ortens historia fanns det på 1930- och 40-talen bland annat två tegelbruk i centralorten, och befolkningen växte snabbt efter kriget: från omkring 2 300 invånare 1944 till nästan 5 900 år 1952. Ormsta, i tätortens nordligaste del, gränsar till Åby i söder, Lingsberg i öster och Ubby i norr. Området fick sin station på Roslagsbanan 1957, mellan Ormsta och Snapptuna. Bebyggelsen i de olika delarna speglar ortens utbyggnad i etapper. Enligt hitta.se är husen i Ormsta främst byggda på 1950- och 1970-talen, i Bällsta på 1960- och 2000-talen, i Västra Bällsta på 1970- och 1980-talen och i Molnby på 1980- och 2000-talen. I området finns villor, kedjehus och radhus. Det gör östra Vallentuna till ett område där hus från fem decennier ligger nära varandra, från de tidiga villorna i Ormsta till de nyare kvarteren i Bällsta och Molnby.",
    extraContent:
      "",
    factBox: [
      { label: "Kommun", value: "Vallentuna" },
      { label: "Delområden", value: "Ormsta, Bällsta, Västra Bällsta, Molnby" },
      { label: "Hustyper", value: "Villor, kedjehus, radhus" },
      { label: "Byggperiod", value: "Ormsta 1950–70-tal, Bällsta 1960- och 2000-tal, V. Bällsta 1970–80-tal, Molnby 1980- och 2000-tal" },
    ],
    parentLocation: {"name":"Vallentuna","slug":"vallentuna"},
    uniqueFAQ: {
      question: "Är husen i Ormsta, Bällsta och Molnby från samma tid?",
      answer:
        "Nej. Enligt hitta.se är husen i Ormsta främst byggda på 1950- och 1970-talen, i Bällsta på 1960- och 2000-talen och i Molnby på 1980- och 2000-talen. Vi tittar alltid på ditt tak på plats vid en kostnadsfri takkontroll, oavsett hur gammalt huset är.",
    },
    primaryKeyword: "takläggare Ormsta",
    lat: 59.5413,
    lng: 18.0881,
    nearbyLocations: ["Vallentuna", "Täby", "Åkersberga"],
    sourceLink: {"label":"Wikipedia: Vallentuna","url":"https://sv.wikipedia.org/wiki/Vallentuna"},
    h1Override: "Takläggare i Vallentuna – Ormsta, Bällsta och Molnby",
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen här spänner över ett halvt sekel. De äldsta villorna från 1950- och 60-talen är i dag runt 60–70 år gamla, husen från 1970- och 80-talen runt 40–50 år, och de nyare husen från 2000-talet är i regel betydligt yngre. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I kedjehusområdena, där husen byggdes samtidigt och ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Ormsta, Bällsta eller Molnby? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "langbro",
    name: "Långbro",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Långbro i Söderort, med villor från sekelskiftet och småstugor från 1940-talet. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Långbro har fått sitt namn efter den medeltida kavelbro som gjorde det möjligt att ta sig över det sanka området längs Göta landsväg. Stadsdelen ligger i Söderort och gränsar till Solberga, Älvsjö, Långsjö, Herrängen och Fruängen. Terrängen är kuperad, och Långbro gård med Långbrogårdsparken ligger 46 meter över havet. Längs en åsrygg vid Johan Skyttes väg har det legat gravar från senare delen av vikingatiden, och den första skriftliga källan är från 1477, när en Per i Longabro nämns i Stockholms rådhusrätt. Området hörde till Brännkyrka socken och blev en del av Stockholms stad 1913. Villabebyggelsen började vid förra sekelskiftet. År 1899 började Alfred Söderlund, kallad Långbrokungen, stycka av tomter från Långbro gård, och det området fick namnet Långbrodal. År 1903 började Långbro villasamhälle, även kallat Linboda, byggas närmare gården. Långbro sjukhus togs i bruk 1910. Stadsdelen bildades 1934 och fick sina nuvarande gränser 1940. Under 1940-talet tredubblades befolkningen genom en stor utbyggnad av småhus. Stockholms stads småstugebyrå hade ett centrallager i Långbro, och husen byggdes med delvis färdiga byggelement. Enligt Wikipedia var de vanligaste hustyperna här \"Typ XIV\", ett hus i en våning på cirka 70 kvadratmeter, och \"Typ X\", ett hus i två våningar på cirka 85 kvadratmeter. Gator, belysning, vatten och avlopp saknades till en början, och även den äldre villabebyggelsen fick vatten och avlopp först i slutet av 1930-talet. I dag domineras stadsdelen av villabebyggelse med omkring 1 350 villor och småhus, kompletterad med bostadsrätter, bland annat på området kring det tidigare sjukhuset.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Hägersten-Älvsjö)"},{"label":"Hustyper","value":"Villor och småstugor"},{"label":"Byggperiod","value":"Villor ca 1899–1903, småstugor 1943–49"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 380 (Områdesfakta 2025)"}],
    sourceLink: {"label":"Wikipedia: Långbro","url":"https://sv.wikipedia.org/wiki/L%C3%A5ngbro"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Långbro, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Långbro?","answer":"Byggperiod enligt källorna: villor ca 1899–1903, småstugor 1943–49. Hustyper: villor och småstugor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Långbro",
    lat: 59.276,
    lng: 18.029,
    nearbyLocations: ["Älvsjö","Hägersten","Örby"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Långbro har två tydliga generationer av småhus. Sekelskiftesvillorna är över hundra år gamla, och småstugorna från 1943–49 är i dag runt 75–80 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlag, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Eftersom många småstugor byggdes efter samma typritningar kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Långbro och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "orby",
    name: "Örby",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Örby villastad i Söderort, med villor från 1890-talet till 1970-talet. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Örby ligger i Söderort, ungefär fem kilometer söder om Gamla stan, och gränsar till Bandhagen, Stureby, Älvsjö, Örby slott, Högdalen och Hagsätra. Villastaden började byggas i slutet av 1800-talet, när drygt 600 hektar mark från Örby slott såldes till markexploatörerna Fritz P. Dalheimer och J.E. Lignell. Enligt Wikipedia var de första nybyggarna 1898 bland annat ångfartygsmaskinister, telegrafister, smeder och målare. Ursprungligen styckades 1 187 tomter av, mellan 1 500 och 4 000 kvadratmeter stora. Örby blev municipalsamhälle 1904 och en del av Stockholms stad 1913. Till skillnad från flera andra äldre villastäder i Stockholm fanns det ingen stadsplan för Örby när tomterna såldes, och tomterna såldes med äganderätt. Köparna kunde bygga efter eget tycke på stora tomter, och det gav enligt beskrivningen av stadsdelen en stor variation av hustyper och storlekar, bland annat flera större villor med snickarglädje, av vilka många står kvar. Utan stadsplan dröjde också gator, el och vatten. De första gångbanorna av plank och 42 gatlampor ordnade invånarna själva genom insamling på 1910-talet, och först på 1940-talet var vägar, vatten och avlopp fullt utbyggda. De luftledningar som fortfarande finns kvar påminner om den tiden. De stora tomterna har sedan styckats av i omgångar. I dag är de flesta villatomterna på 600–1 000 kvadratmeter, och stadsdelen består huvudsakligen av villor från olika epoker, från slutet av 1800-talet fram till 1970-talet, med enstaka nyare inslag. Det gör att olika stilideal ofta möts i samma kvarter.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Enskede-Årsta-Vantör)"},{"label":"Hustyper","value":"Villor"},{"label":"Byggperiod","value":"Sent 1800-tal–1970-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 270 (Områdesfakta 2025)"}],
    sourceLink: {"label":"Wikipedia: Örby, Stockholms kommun","url":"https://sv.wikipedia.org/wiki/%C3%96rby,_Stockholms_kommun"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Örby, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Örby?","answer":"Byggperiod enligt källorna: sent 1800-tal–1970-tal. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Örby",
    lat: 59.265,
    lng: 18.045,
    nearbyLocations: ["Älvsjö","Högdalen","Långbro"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Örby spänner husen över nästan ett sekel, och det finns ingen typisk takålder. De äldsta villorna är över hundra år gamla, medan husen från 1960- och 70-talen är runt 50–65 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På de äldsta villorna kan takets form, takfot och detaljer vara en viktig del av husets karaktär, och det är värt att tänka på redan när materialet väljs. Varje hus får en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Örby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "skondal",
    name: "Sköndal",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Sköndal i Söderort, med småstugor från 1940-talet och rad- och kedjehus från 1950- till 1970-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Sköndal är en stadsdel i Söderort, i Farsta stadsdelsområde, som gränsar till bland annat Farsta, Hökarängen, Gubbängen och Skarpnäcks gård. Stadsdelen bildades 1932, men platsen är äldre än så. Det äldsta belägget för namnet är från 1397, då gården skrevs Siondæ, och enligt Wikipedia ändrades namnet till Sköndal under drottning Kristina. De tre gårdarna Stora Sköndal, Skönstavik och Sköndalsbro finns fortfarande kvar vid Drevvikens strand. Perstorpsvägen är en del av den gamla färdvägen mellan Stockholm och Dalarö. Dagens småhusbebyggelse har kommit till i tydliga etapper. Den första stadsplanen fastställdes 1947 och omfattade ett småstugeområde med omkring 160 hus för självbyggeri i stadsdelens västra del, mot Nynäsvägen. Stockholms stads småstugebyrå tillhandahöll typritningar för tre varianter av stugor. Mellan Perstorpsvägen och Sköndalsvägen byggdes en bit in på 1950-talet radhus och flerfamiljshus, ritade av arkitekterna Ancker, Gate och Lindegren. Nästa etapp kom 1960, med radhus mot Stora Sköndal, och några år senare uppfördes 26 terrasserade radhus vid Drevviken. Norra Sköndal, norr om Tyresövägen, fick sin stadsplan 1968. Den föreskrev enligt Wikipedia radhus och kedjehus med garagelängor mellan husen. Området känns igen på gatunamnen efter hundar, som Vinthundsvägen, Terriergränd och Gråhundsvägen. När Sköndals centrum byggdes 1969 var stadsdelen söder om Tyresövägen i huvudsak färdigbyggd.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Farsta stadsdelsområde)"},{"label":"Delområden","value":"Småstugeområdet i väster, Perstorpsvägen–Sköndalsvägen, norra Sköndal"},{"label":"Hustyper","value":"Småstugor, radhus, kedjehus"},{"label":"Byggperiod","value":"Småstugor från 1947, radhus 1950-tal och 1960, norra Sköndal efter 1968"},{"label":"Ägda småhus (avrundat)","value":"Ca 1 190 (Stockholms stad, Områdesfakta 2025)"}],
    sourceLink: {"label":"Wikipedia: Sköndal","url":"https://sv.wikipedia.org/wiki/Sk%C3%B6ndal"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Sköndal, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Sköndal?",
      answer:
        "Byggperiod enligt källorna: småstugor från 1947, radhus och flerfamiljshus från 1950-talet och 1960, norra Sköndals radhus och kedjehus efter stadsplanen 1968. Hustyper: småstugor, radhus, kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Sköndal",
    lat: 59.2552389,
    lng: 18.1123844,
    nearbyLocations: ["Farsta", "Hökarängen", "Skarpnäck"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småstugorna i västra Sköndal är i dag runt 75–80 år gamla, radhusen från 1950- och 60-talen runt 60–70 år och rad- och kedjehusen i norra Sköndal drygt 50 år. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. På radhus och kedjehus hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. Eftersom husen i en länga ofta är likadana och byggda samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Sköndal och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "herrangen",
    name: "Herrängen",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Herrängen i Söderort, med självbyggda villor från 1940- och 1950-talen och radhus från 1950-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Herrängen är en stadsdel i Söderort som gränsar till Fruängen, Långbro och Långsjö, och till Snättringe och Segeltorp i Huddinge kommun. Namnet kommer från Herrängens gård, som uppfördes under senare delen av 1700-talet. Utbyggnaden började enligt Wikipedia när brukspatron J.E. Lignell förvärvade egendomen 1901. År 1908 gick området över till fastighetsbolaget Billiga tomter. Bebyggelsen växte långsamt, främst på grund av dåliga förbindelser med Stockholms innerstad, och 1913 bodde här fortfarande bara knappt 100 personer. Stockholms stad köpte det som återstod av marken först 1930, och då ordnades också en bussförbindelse till Södermalm. Under 1920-talet byggdes ett åttiotal villor, främst vid Långsjön och kring Herrängens gård. De flesta villorna kom till på 1940- och 1950-talen. Enligt Wikipedia byggdes de av ägarna själva, genom eget arbete men med instruktioner och material från staden. I början av 1950-talet uppfördes också några radhuslängor, och 1955 byggdes Herrängens skola. Sedan 1980- och 1990-talen har de äldsta villorna och sommarstugorna rivits och ersatts av moderna, prefabricerade villor.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Hägersten-Älvsjö)"},{"label":"Hustyper","value":"Villor, småstugor, radhus"},{"label":"Byggperiod","value":"1920-tal (ett åttiotal villor), mest 1940–50-tal, radhus tidigt 1950-tal, nyare villor efter 1980"},{"label":"Ägda småhus (avrundat)","value":"Ca 1 110 (Stockholms stad, Områdesfakta 2025)"}],
    sourceLink: {"label":"Wikipedia: Herrängen","url":"https://sv.wikipedia.org/wiki/Herr%C3%A4ngen"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Herrängen, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Herrängen?",
      answer:
        "Byggperiod enligt källorna: ett åttiotal villor på 1920-talet, de flesta villorna självbyggda på 1940- och 1950-talen, radhuslängor i början av 1950-talet, nyare villor efter 1980-talet. Hustyper: villor, småstugor, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Herrängen",
    lat: 59.2734284,
    lng: 17.9645874,
    nearbyLocations: ["Långbro", "Segeltorp", "Snättringe"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Det gör Herrängen till en stadsdel med hus i flera åldrar. De självbyggda villorna från 1940- och 1950-talen är i dag runt 70–85 år gamla, medan de villor som har ersatt äldre hus sedan 1980-talet är betydligt yngre. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Eftersom många av villorna byggdes av ägarna själva, och husen sedan har byggts om och till i olika omgångar, kan två grannhus från samma tid ha helt olika förutsättningar. Det är ett skäl till att varje tak behöver bedömas för sig. På radhusen från 1950-talet hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Herrängen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "solhem-lunda",
    name: "Solhem och Lunda",
    region: "Västerort",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Solhems villastad och Lunda i Spånga, med trävillor från 1904 och hus från 1920-talet till 2000-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Solhem ligger i Västerort och hör till Järva stadsdelsområde, med Bromsten, Tensta, Lunda, Kälvesta och Sundbyberg som grannar. Marken hörde tidigare till gårdarna Värsta och Kälvesta, och bostadsbyggandet tog fart efter att järnvägen mellan Stockholm och Västerås invigdes 1876. År 1904 började AB Solhems Villastad sälja tomter. Bland grundarna fanns Lars Magnus Ericsson, grundaren av Ericsson, och John Bernström, chef för AB Separator. Namnet Solhem fastställdes samma år, sedan namnet Värsta hade förkastats. Bolaget ville ge området en enhetlig stil och tillhandahöll typritningar, och det fanns många regler att följa. Husen fick till exempel bara ha ett kök, så att ägarna inte skulle hyra ut delar av dem. Enligt Wikipedia har de flesta av de första husen träfasader och plankstomme, spröjsade fönster och ofta både öppen förstukvist och veranda, och de flesta målades faluröda med vita knutar. Bland de första invånarna fanns målare, stenarbetare, snickare, postbetjänter och skomakare. År 1907 fanns 160 hus och flera butiker. Eftersom Spånga station låg i Solhem blev området något av en centralort i Spånga socken, och stationen fick 1908 ett stationshus ritat av arkitekten Erik Lallerstedt, som revs 1975. Solhem blev municipalsamhälle 1908 och en del av Stockholms stad 1949. Under 1920- och 30-talen ökade antalet hus i något lugnare takt, och 1930 var 425 tomter bebyggda. På 1930-talet växte Spånga torg fram, med låga hyreshus och butiker i bottenvåningen. Enligt alla.csv finns i Solhem-Lunda hus från 1904–07, 1920- och 30-talen, 1960-talet och 2000-talet, med villor, kedjehus, radhus och parhus.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Järva)"},{"label":"Delområden","value":"Solhem, Lunda"},{"label":"Hustyper","value":"Villor, kedjehus, radhus, parhus"},{"label":"Byggperiod","value":"1904–07, 1920–30-tal, 1960-tal, 2000-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 2 000"}],
    sourceLink: {"label":"Wikipedia: Solhem","url":"https://sv.wikipedia.org/wiki/Solhem"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Solhem och Lunda, Spånga",
    uniqueFAQ: {"question":"När byggdes husen i Solhem och Lunda?","answer":"Byggperiod enligt källorna: 1904–07, 1920–30-tal, 1960-tal, 2000-tal. Hustyper: villor, kedjehus, radhus, parhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Solhem och Lunda",
    lat: 59.383,
    lng: 17.898,
    nearbyLocations: ["Spånga","Kälvesta","Tensta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Solhem och Lunda spänner över mer än hundra år. De äldsta trävillorna från Solhems villastad är över hundra år gamla, husen från 1920- och 30-talen runt 90–100 år och husen från 1960-talet runt 60 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På de gamla trävillorna är taket en del av husens karaktär, och det är värt att tänka på när materialet väljs. Varje hus får en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Solhem eller Lunda? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "storangen",
    name: "Storängen och Saltsjö-Duvnäs",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Storängen, Lillängen och Saltsjö-Duvnäs i Nacka, med trävillor från 1904 och radhus från 1960-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Storängen ligger vid Saltsjöbanan i centrala Nacka, mellan Lillängen och Saltsjö-Duvnäs, strax sydost om Nacka Forum. Villasamhället grundades 1904 av Tjänstemännens Egnahemsförening vid Storängen, som skrev kontrakt med Järnvägsaktiebolaget Stockholm-Saltsjön, bolaget bakom Saltsjöbanan. Bolaget ordnade stadsplan, vägar, vatten och avlopp och så småningom en järnvägsstation. Nybyggnadsområdet var en vidsträckt äng mellan Järlasjön och Värmdövägen, och huvudvägarna drogs så att de strålade samman vid stationen. Den första villan, Villa Lodén vid dagens John Lodéns väg, började byggas den 30 juni 1904. Redan 1909 var 107 av omkring 160 tomter bebyggda. En byggnadsordning från 1905 föreskrev en egen byggnadsnämnd, eftersom det ännu inte fanns någon kommunal. De flesta villorna är arkitektritade, bland annat av Ragnar Östberg, Torben Grut och Carl Westman, och flest hus, 14 stycken inklusive stationshuset, ritade Gustaf Hugo Sandberg. Villorna är stora trävillor i nationalromantisk stil. Egnahemsföreningen finns fortfarande kvar, i dag som intresseförening för de boende, och 2013 fanns drygt 150 villor i området. Vid en kulturhistorisk inventering 1979 bedömdes 18 av 156 undersökta byggnader som \"omistliga\" och 35 som \"värdefulla\", och hela området bedömdes som en omistlig kulturmiljö. År 1987 förklarades Storängen som riksintresse för kulturmiljövården. Enligt alla.csv finns i området även funkisvillor från 1930- och 40-talen, villor från 1910- och 20-talen i Saltsjö-Duvnäs och radhusen Röda och Vita raden från 1964–67.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Nacka"},{"label":"Delområden","value":"Storängen, Lillängen, Saltsjö-Duvnäs"},{"label":"Hustyper","value":"Villor, radhus"},{"label":"Byggperiod","value":"Storängen från 1904, funkisvillor 1930–40-tal, Duvnäs 1910–20-tal, radhus 1964–67"},{"label":"Kulturmiljö","value":"Riksintresse för kulturmiljövården (1987)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 200"}],
    sourceLink: {"label":"Wikipedia: Storängen","url":"https://sv.wikipedia.org/wiki/Stor%C3%A4ngen"},
    parentLocation: {"name":"Nacka","slug":"nacka"},
    h1Override: "Takläggare i Storängen och Saltsjö-Duvnäs, Nacka",
    uniqueFAQ: {"question":"När byggdes husen i Storängen och Saltsjö-Duvnäs?","answer":"Byggperiod enligt källorna: Storängen från 1904, funkisvillor 1930–40-tal, Duvnäs 1910–20-tal, radhus 1964–67. Hustyper: villor, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Storängen och Saltsjö-Duvnäs",
    lat: 59.311,
    lng: 18.172,
    nearbyLocations: ["Nacka","Saltsjöbaden","Saltsjö-Boo"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Trävillorna från Storängens första år är i dag över hundra år gamla, funkisvillorna runt 80–95 år och radhusen från 1960-talet runt 60 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I ett område som är riksintresse för kulturmiljövården är takets form, material och kulör en viktig del av miljön. Innan ett byte av material eller kulör är det därför extra viktigt att ta reda på vad som gäller. Det avgör Nacka kommun. I radhuslängorna, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Storängen, Lillängen eller Saltsjö-Duvnäs? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "lannersta",
    name: "Lännersta",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Lännersta i Boo, Nacka, med villor från 1930-talet och framåt och äldre sommarvillor. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Lännersta ligger i sydvästra delen av kommundelen Boo i Nacka, från Värmdöleden i norr till Lännerstasundet i söder. Området har fått sitt namn från Lännersta gård, som finns dokumenterad i skrift redan på 1430-talet. Namnet kommer från \"Landesta\" eller \"Landestow\", som betyder landningsställe, eftersom en av Lännerstasundets gamla hamnplatser låg här. År 1478 drogs gården in till kronan, och 1545 fick amiralen Jacob Bagge både Lännersta och Boo gård som gåva för sina förtjänster. Bagge bosatte sig på Boo gård, och Lännersta, som tidigare var ett torp, blev ladugård under Boo. Så förblev det fram till 1829, då rörelsen gick i konkurs och godset splittrades. I slutet av 1800-talet omfattade Lännersta gård 600 tunnland, och ägaren C.F. Wahlberg började stycka marken till villatomter. År 1911 beskrevs Lännersta villastad i sin egen marknadsföring som \"sällsynt vacker\" med villor som låg isolerade från varandra, så att den lantliga prägeln bevarades. AB Lännersta bildades 1918, men tomtförsäljningen gick trögt. År 1931 bildades Lännersta Villaägareförening, och 1937 var egendomen styckad i 925 tomter. Till en början var medlemskap i föreningen obligatoriskt, och fastighetsägarna anlade vägnätet på egen bekostnad. Enligt Wikipedia präglas bebyggelsen i dag huvudsakligen av villor från 1930-talet och framåt, med några enstaka större sommarvillor från slutet av 1800-talet och början av 1900-talet. Tidigare sommarstugeområden har omvandlats till permanenta villor. Den största delen av Lännersta är detaljplanelagd med skyddsbestämmelser för kulturhistoriskt intressant bebyggelse, och här finns bland annat Lännersta gård från 1700-talet och Villa Lindängen från 1870-talet.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Nacka"},{"label":"Delområde","value":"Lännersta (övriga delar av Södra Boo ej verifierade)"},{"label":"Hustyper","value":"Villor"},{"label":"Byggperiod","value":"Tomter styckade till 1937 (925 st), villor främst från 1930-talet och framåt"},{"label":"Kulturmiljö","value":"Detaljplan med skyddsbestämmelser för stora delar"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 2 050 (SCB, 2025; avser hela RegSO)"}],
    sourceLink: {"label":"Wikipedia: Lännersta","url":"https://sv.wikipedia.org/wiki/L%C3%A4nnersta"},
    parentLocation: {"name":"Nacka","slug":"nacka"},
    h1Override: "Takläggare i Lännersta, Boo",
    uniqueFAQ: {"question":"När byggdes husen i Lännersta?","answer":"Byggperiod enligt källorna: tomter styckade till 1937 (925 st), villor främst från 1930-talet och framåt. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Lännersta",
    lat: 59.31,
    lng: 18.24,
    nearbyLocations: ["Nacka","Saltsjö-Boo","Saltsjöbaden"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna i Lännersta är i dag främst mellan 50 och 95 år gamla, och de äldsta sommarvillorna är över hundra år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I omvandlade sommarstugor kan taket ha byggts om eller byggts på vid olika tillfällen. Eftersom stora delar av området har skyddsbestämmelser i detaljplanen är det klokt att ta reda på vad som gäller innan ett byte av material eller kulör. Det avgör Nacka kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Lännersta eller Boo? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "snattringe",
    name: "Snättringe",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Snättringe i Huddinge, med villor från 1920- och 30-talen och radhus från 1960-talet. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Snättringe ligger söder om Långsjön, väster om Stuvsta och öster om Segeltorp, och är sedan 2018 en egen kommundel i Huddinge. Namnet stavades i äldre handlingar Snettingen eller Snättingen, som 1628, och enligt en teori syftade det ursprungligen på Långsjöns smala form med spetsiga ändar. Snättringe var länge ett torp under Fullersta gård. På 1820-talet bodde prosten Johan Fredrik Gleisman på gården, och han lät bygga torpet Marieberg nere vid Långsjön, senare Matineholm. Konstnären Per Krafft den yngre ägde Snättringe gård 1830–1850. Gården avsöndrades från Fullersta 1854 och friköptes 1873 av Hugo Stegeman, som samtidigt byggde den nuvarande manbyggnaden. Den restaurerades i början av 1970-talet. Matineholms vitputsade huvudbyggnad är från 1888, och där tillbringade August Strindberg sin sista sommar 1911. Villabebyggelsen började i början av 1900-talet genom Snättringe Tomt AB, med en första styckningskarta på 142 tomter. Enligt Wikipedia gick försäljningen trögt: kommunikationerna var dåliga, och marken mellan Snättringe och Stuvsta var sank och ibland översvämmad, så att man fick lägga ut plankor för att komma fram. Häradsvägen anlades i mitten av 1920-talet som nödhjälpsarbete. Efter 1925 kom nya avstyckningsplaner genom Huddinge Egnahem, Snättringe blev municipalsamhälle 1928, och på 1950- och 60-talen anslöts området till kommunalt vatten och avlopp. Längs Tranvägen ligger kvarteret Assessorn, 36 radhus i rött tegel från början av 1960-talet, ritade av arkitekten Esmail Kuhang. Enligt kommunen är kvarteret en särskilt värdefull kulturmiljö. Enligt alla.csv är villorna i Snättringe främst från 1920- och 30-talen, med radhus från tidigt 1960-tal och inslag fram till 2010-talet. Delar av området ingår i kulturmiljön Segersminne–Snättringe gård.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Huddinge"},{"label":"Hustyper","value":"Mest villor, en del radhus"},{"label":"Byggperiod","value":"Villor 1920–30-tal, radhus tidigt 1960-tal, inslag till 2010-tal"},{"label":"Kulturmiljö","value":"Kv. Assessorn (särskilt värdefull), Segersminne–Snättringe gård"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 2 600"}],
    sourceLink: {"label":"Wikipedia: Snättringe","url":"https://sv.wikipedia.org/wiki/Sn%C3%A4ttringe"},
    parentLocation: {"name":"Huddinge","slug":"huddinge"},
    h1Override: "Takläggare i Snättringe, Huddinge",
    uniqueFAQ: {"question":"När byggdes husen i Snättringe?","answer":"Byggperiod enligt källorna: villor 1920–30-tal, radhus tidigt 1960-tal, inslag till 2010-tal. Hustyper: mest villor, en del radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Snättringe",
    lat: 59.256,
    lng: 17.958,
    nearbyLocations: ["Huddinge","Segeltorp","Stuvsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna från 1920- och 30-talen är i dag runt 90–100 år gamla, och radhusen i kvarteret Assessorn runt 65 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I kvarteret Assessorn och i kulturmiljön kring Segersminne och Snättringe gård är det klokt att ta reda på vad som gäller innan ett byte av material eller kulör. Det avgör Huddinge kommun. I radhuslängorna, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Snättringe och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "solgard-sorskogen",
    name: "Solgård och Sörskogen",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Solgård och Sörskogen i Huddinge, med villor från tidigt 1900-tal, kedjehus från 1960-talet och radhus från 1970-talet.",
    longDescription:
      "Solgård och Sörskogen ligger söder om Huddinge centrum, i den del av Huddinge som växte fram som stationssamhälle när järnvägen mellan Stockholm och södra Sverige byggdes ut på 1860-talet. Solgård ramas in av järnvägen och Huddingevägen, Storängsleden och sjön Orlången. Enligt Wikipedia var området tidigare främst sommarstugor men har sedan mitten av 1900-talet blivit ett område med permanentboende, där villor av olika ålder dominerar. De södra delarna ligger på kullar som når 60 meter över havet, och en del villor ligger på branta tomter längs sluttningarna. I de norra delarna, runt Sördalavägen, finns villastadshus från början av 1900-talet i nationalromantisk stil, byggda samtidigt som villorna vid Solvägen och Helgedalsvägen närmare Huddinge centrum. Författaren Karin Boye bodde en tid vid Solvägen, i Villa Björkebo, som i dag är riven. Här ligger också Solgårds fornborg, en av Huddinges åtta fornborgar. Sörskogen ligger mellan Huddinge centrum och Flemingsbergsviken, en del av Orlången. Stadsplanen ritades i två etapper av arkitekten Gösta Nordin: Sörskogen I 1962 och Sörskogen II 1972. Den äldre delen har villor och kedjehus från 1960-talet, ett hundratal meter in i skogen från Lännavägen. Kedjehusen, med panelade och gulmålade fasader, ritades av FFNS. Den nyare delen, längre upp i skogen, har radhus från 1970-talet med fasader i rött tegel, ritade av Gösta Nordin. Vägarna är uppkallade efter svampar. Villorna och kedjehusen ligger längs Champinjon- och Musseronvägen och radhusen längs Bläcksvamps-, Flugsvamps- och Taggsvampsvägen, och området binds samman av Tryffelvägen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Huddinge"},{"label":"Delområden","value":"Solgård, Sörskogen (koppling till RegSO ej verifierad)"},{"label":"Hustyper","value":"Villor, kedjehus, radhus"},{"label":"Byggperiod","value":"Solgård: villastadshus tidigt 1900-tal, Sörskogen: villor/kedjehus 1960-tal + radhus 1970-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 800 (SCB, 2025; RegSO-koppling ej verifierad)"}],
    sourceLink: {"label":"Wikipedia: Sjödalen-Fullersta","url":"https://sv.wikipedia.org/wiki/Sj%C3%B6dalen-Fullersta"},
    parentLocation: {"name":"Huddinge","slug":"huddinge"},
    h1Override: "Takläggare i Solgård och Sörskogen, Huddinge",
    uniqueFAQ: {"question":"När byggdes husen i Solgård och Sörskogen?","answer":"Byggperiod enligt källorna: Solgård: villastadshus tidigt 1900-tal, Sörskogen: villor/kedjehus 1960-tal + radhus 1970-tal. Hustyper: villor, kedjehus, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Solgård och Sörskogen",
    lat: 59.231,
    lng: 17.99,
    nearbyLocations: ["Huddinge","Fullersta","Stuvsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villastadshusen i Solgård är i dag över hundra år gamla, kedjehusen i Sörskogen runt 60 år och radhusen runt 50 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På villor som ligger på branta tomter kan åtkomsten påverka hur ett takbyte planeras. I kedjehus- och radhusområdena i Sörskogen, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Solgård eller Sörskogen? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "molna",
    name: "Mölna",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Mölna och Östra Mölna radhusområde på Lidingö, med villor och radhus från 1950- och 60-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Mölna ligger på södra Lidingö och har fått sitt namn från Mölna gård, vars ägor sträckte sig mellan Kottlasjön i norr och Lilla Värtan i söder, med Skärsätra gård i väster och Breviks stora ägor i öster. Gården har långa traditioner av både vattenkvarn och väderkvarn, som går tillbaka till 1500-talet, troligen ännu längre. Namnet Mölna kommer av \"mölla\", som betyder kvarn. Gårdens nuvarande huvudbyggnad är från 1814 och paviljongen från 1876. Vid gården finns rester av den äldre kvarnmiljön, bland annat kvarndammen och stenkantade vattenrännor, en sista rest av Mölnaån mellan Kottlasjön och Lilla Värtan. Mölna gårds ägor började bebyggas med villor och radhus huvudsakligen på 1950- och 60-talen, sedan stadsplaner hade upprättats i omgångar med början 1953. Enligt Wikipedia sparades mycket natur mellan villaområdena. I början av 1960-talet bebyggdes skogsområdet i östra delen av ägorna med Östra Mölna radhusområde, 52 radhus och sex villor ritade av arkitekten Nils Tesch. Genom Lidingö stads kulturinventering 1995 har området fått officiell status som kulturhistoriskt omistlig miljö. I strandområdet väster om gården byggdes på 1950- och 60-talen flera villor, bland dem den villa som Nils Tesch ritade åt sig själv 1959. Den stora Mölnaängen, mellan gården och radhusområdet, förblev obebyggd, och gårdens parkliknande trädgård gestaltades på 1960-talet av landskapsarkitekten Walter Bauer. Vid Lilla Värtan ligger Mölna brygga, som var den första bryggan på Lidingön som regelbundet angjordes av skärgårdsbåtar i linjetrafik, och längs stranden går en promenad till Kappsta naturreservat.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Lidingö"},{"label":"Delområden","value":"Mölna, Östra Mölna radhusområde (Stockby östra, Ekholmsnäs i RegSO)"},{"label":"Hustyper","value":"Villor, radhus, kedjehus"},{"label":"Byggperiod","value":"Främst 1950- och 1960-tal, Östra Mölna tidigt 1960-tal"},{"label":"Kulturmiljö","value":"Östra Mölna: kulturhistoriskt omistlig miljö (Lidingö stad 1995)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 680"}],
    sourceLink: {"label":"Wikipedia: Mölna","url":"https://sv.wikipedia.org/wiki/M%C3%B6lna"},
    parentLocation: {"name":"Lidingö","slug":"lidingo"},
    h1Override: "Takläggare i Mölna, Lidingö",
    uniqueFAQ: {"question":"När byggdes husen i Mölna?","answer":"Byggperiod enligt källorna: främst 1950- och 1960-tal, Östra Mölna tidigt 1960-tal. Hustyper: villor, radhus, kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Mölna",
    lat: 59.356,
    lng: 18.172,
    nearbyLocations: ["Lidingö","Sticklinge","Brevik, Käppala och Gåshaga"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna och radhusen i Mölna är i dag främst runt 60–70 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I Östra Mölna radhusområde, som Lidingö stad klassar som kulturhistoriskt omistlig miljö, är det särskilt viktigt att ta reda på vad som gäller innan ett byte av material eller kulör. Det avgör Lidingö stad. Radhusen byggdes samtidigt, och grannar kan ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Mölna eller Östra Mölna? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "sticklinge",
    name: "Sticklinge",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Norra och Södra Sticklinge och Kyttinge på Lidingö, med villor från 1980- och 1990-talen. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Sticklinge ligger på nordvästra Lidingö och har varit bebott åtminstone sedan vikingatiden. I södra Sticklinge, längs vägskälet Tyktorpsvägen och Kyttingevägen, ligger ett av Lidingös största forntida gravfält, med ett sextiotal gravar från yngre järnåldern. Väster om Sticklinge udde gick en vikingatida farled, och på en kulle norr om Rödstugan finns en så kallad farledsgrav. Sticklinge by nämns i de första texterna om Lidingö från tidigt 1600-tal. Platsen spelade en särskild roll för öns förbindelser med fastlandet. I slutet av 1480-talet, när släkten Banér på Djursholms slott tog över Lidingö, ordnades en roddfärja mellan Rödstuguviken och Ekudden på Djursholmssidan. Färjehållaren bodde i Rödstugan, som har gett viken dess namn. Färjan användes av bönderna, för postgången och för att hämta prästen från Danderyd till högmässan. Sticklinge gård ägdes på 1800-talet av Johan August Zetterberg och sedan av hans son Harald, som på 1880-talet lät bygga om huvudbyggnaden efter ritningar av Otto August Mankell. År 1926 blev huset klubbhus för Lidingö golfklubb, vars bana, Sveriges första 18-hålsbana, invigdes 1927 på gårdens marker. Huset brann 1980, och i dag påminner Patron Haralds väg om den tidigare ägaren. Villaområdet i Norra Sticklinge började som ett sommarstugeområde tidigt på 1930-talet. Först 1978 beslutade Lidingö stad att området skulle stadsplaneras, och det fick då kommunalt vatten och avlopp, ny elförsörjning, upprustade vägar och gatubelysning. Enligt beskrivningen av området bebyggdes det därefter på relativt kort tid med större villor för permanentboende. Södra Sticklinge, även kallat Sticklingehöjden, var skog och byggdes i etapper i början av 1990-talet med villor, parhus och radhus. År 2009 fanns omkring 600 fristående villafastigheter i området. I Sticklinge ligger också Kyttinge, med ett fyrtiotal villor, och Trolldalen, ett av Sveriges äldsta sportstugeområden.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Lidingö"},{"label":"Delområden","value":"Norra och Södra Sticklinge, Kyttinge"},{"label":"Hustyper","value":"Villor (Södra Sticklinge även parhus och radhus)"},{"label":"Byggperiod","value":"Norra Sticklinge efter stadsplanen 1978, Södra Sticklinge tidigt 1990-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 100"}],
    sourceLink: {"label":"Wikipedia: Sticklinge","url":"https://sv.wikipedia.org/wiki/Sticklinge"},
    parentLocation: {"name":"Lidingö","slug":"lidingo"},
    h1Override: "Takläggare i Sticklinge, Lidingö",
    uniqueFAQ: {"question":"När byggdes husen i Sticklinge?","answer":"Byggperiod enligt källorna: Norra Sticklinge efter stadsplanen 1978, Södra Sticklinge tidigt 1990-tal. Hustyper: villor (Södra Sticklinge även parhus och radhus). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Sticklinge",
    lat: 59.372,
    lng: 18.13,
    nearbyLocations: ["Lidingö","Mölna"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta villorna i Norra och Södra Sticklinge är i dag runt 30–45 år gamla, och enligt hitta.se är husen främst byggda på 1980- och 1990-talen. Taken kan redan ha lagts om, men där det inte har skett är det ofta dags att se över underlagspapp, plåtdetaljer och hängrännor. Varje hus får en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Sticklinge? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "viggbyholm",
    name: "Viggbyholm",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Viggbyholm i Täby, en villastad främst från 1918–1935 vid Roslagsbanan. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Viggbyholm har vuxit fram ur en av Täbys gamla byar, med rötter i vikingatiden och ett namn, Vighby, som är dokumenterat sedan 1200-talet. Byn hade tre gårdar och skulle tillsammans med grannbyn Kjula utrusta en roddare för ledungsflottan. På 1600-talet köpte adelsmannen Israel Lagerfeldt byarna Vikby, Kjula och Fällbro och bildade ett säteri. Den nuvarande huvudbyggnaden på Viggbyholms gård uppfördes 1907 på det äldre husets grund, flyglarna är från 1700-talet, och på gården startades 1928 internatskolan Viggbyholmsskolan. Villasamhället växte fram med Roslagsbanans förlängning till Österskär. En hållplats anordnades vid Viggbyholm 1903, och från 1910 fanns en riktig station. Enligt Täby kommun var det startskottet för en gradvis utbyggnad, från de första villorna norr om järnvägen till den mer storslagna planen för Viggbyholms Park- och Trädgårdsstad på höjderna ner mot Stora Värtan. Planens breda allékantade gator och offentliga byggnader blev aldrig av, men kvartersstrukturen genomfördes. Stationshuset från 1908 finns kvar och är välbevarat. År 1919 togs en mönsterbok med villor och sportstugor fram, med ritningar av bland andra Jacob J:son Gate, Torben A. Grut och Cyrillus Johansson. Målet var en enhetlig karaktär med klassicerande villor och nationalromantiska sportstugor. Intresset var till en början svalt, och 1918 var omkring 70 tomter bebyggda, främst med sommarstugor. Byggnadsplanen bygger på grundplanen från 1918 och fastställdes med kompletteringar 1935. Enligt kommunen präglas området fortfarande av den gamla planens grundstruktur, med villor och några kvarvarande enkla fritidshus från alla 1900-talets decennier, och med häckar och låga staket mot gatan. En av de få kvarvarande sommarstugorna, vid Bryggvägen, är från 1922.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Delområden","value":"Viggbyholm västra, norra, sydväst och sydöst"},{"label":"Hustyper","value":"Villor"},{"label":"Byggperiod","value":"Villastad främst 1918–1935, en del 1960-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 480"}],
    sourceLink: {"label":"Täby kommun: Viggbyholm (kulturmiljö)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/viggbyholm"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Viggbyholm, Täby",
    uniqueFAQ: {"question":"När byggdes husen i Viggbyholm?","answer":"Byggperiod enligt källorna: villastad främst 1918–1935, en del 1960-tal. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Viggbyholm",
    lat: 59.446,
    lng: 18.1,
    nearbyLocations: ["Täby","Näsbypark","Vallabrink"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna i Viggbyholm är främst från 1918–1935 och i dag runt 90–105 år gamla, med inslag från 1960-talet och senare. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I en villastad med klassicerande villor och nationalromantiska sportstugor är takets form och detaljer ofta en del av husets karaktär, och det är värt att tänka på redan när materialet väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Viggbyholm och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "vallatorp-visinge",
    name: "Vallatorp och Visinge",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Vallatorp, Lövbrunna och Visinge i Täby, med grupphus från 1970- och 80-talen och villor från 2000-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Vallatorp, Lövbrunna och Visinge ligger i norra Täby, tre områden med olika historia som i dag hänger ihop. Vallatorp byggdes i slutet av 1970-talet. Enligt Täby kommun planerades området på tidens typiska sätt, som grannskapsenheter med en liten centrummiljö, bostadskvarter, återvändsgator och bilfria gårdar. Här finns flerfamiljshus, radhus, parhus och kedjehus, och kommunen beskriver hur husgrupperna har var sin färgsättning men ett gemensamt formspråk och en genomtänkt trafikplanering. Det lokala centrumet består av terrasserade flerbostadshus i brunt tegel från 1980, ritade av Bertil Schröder på Höjer och Ljungqvist arkitektkontor, och kommunens råd för kvarteren är att behålla den enhetliga färgsättningen och de ursprungliga fönsterformaten. Lövbrunna var tidigare en gårdsmiljö, där en gles villabebyggelse växte fram under 2000-talets första decennium. Den gamla gården revs 2005, men spår finns kvar, bland annat den trädkantade infarten, som i dag är gång- och cykelväg. Ny bebyggelse i traditionell stil från 2007–2008 har ersatt gårdsbebyggelsen, och kvarteret där huvudbyggnaden stod har gestaltats med den gamla gårdsmiljön som förebild. Här finns villor, parhus och mindre flerfamiljshus. Villaområdet Visinge har vuxit fram sedan 1950-talet. Till en början var det ett sommarstugeområde, som med tiden har förtätats och blivit ett område med permanentboende. När området fick en station på Roslagsbanan på 1980-talet började grupphusområden byggas, och det är enligt kommunen den bebyggelsen som främst präglar Visinge i dag: småskaliga trähus i samstämmig färgskala med naturmark insprängd mellan husen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Delområden","value":"Vallatorp norra/södra, Lövbrunna, Visinge"},{"label":"Hustyper","value":"Radhus, parhus, kedjehus, villor"},{"label":"Byggperiod","value":"Vallatorp slutet av 1970-talet, Visinge grupphus 1980-tal, Lövbrunna 2007–2008"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 510 + 470"}],
    sourceLink: {"label":"Täby kommun: Vallatorp – Lövbrunna – Visinge (kulturmiljö)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/vallatorp---lovbrunna---visinge"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Vallatorp och Visinge, Täby",
    uniqueFAQ: {"question":"När byggdes husen i Vallatorp och Visinge?","answer":"Byggperiod enligt källorna: Vallatorp slutet av 1970-talet, Visinge grupphus 1980-tal, Lövbrunna 2007–2008. Hustyper: radhus, parhus, kedjehus, villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Vallatorp och Visinge",
    lat: 59.48,
    lng: 18.07,
    nearbyLocations: ["Täby","Karlslund","Erikslund"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Grupphusen i Vallatorp är i dag runt 45 år gamla, grupphusen i Visinge runt 40 år och husen i Lövbrunna runt 20 år. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I grupphusområdena, där husen byggdes samtidigt och är likadana, kan grannar ha nytta av att planera takbyten i samma veva. Kommunens råd om enhetlig färgsättning i Vallatorp är bra att ha med sig när materialet väljs. Varje hus får alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Vallatorp, Lövbrunna eller Visinge? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "tegelhagen-silverdal",
    name: "Tegelhagen och Silverdal",
    region: "Norra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Tegelhagen och Silverdal i Sollentuna, med kedjehus från 1970-talet och radhus från 2000-talet. Kostnadsfri takkontroll.",
    longDescription: "Tegelhagen och Silverdal ligger i kommundelen Helenelund i södra Sollentuna, mellan motorvägen och Edsviken. Båda har fått sina namn från gamla torp. Torpet Tegelhagen är känt sedan 1666, då det kallades Tegelslagaren efter tegelslagaren Klement som bodde där och troligen arbetade vid Ulriksdals tegelbruk. I början av 1800-talet byggdes torpet ut till sommarbostad åt stockholmsborgare, och 1884 lät grosshandlaren Carl Schnell uppföra en slottsliknande villa med 20 rum. Under andra världskriget tog krigsmakten över gården, och 1971 brann den ner. Strax intill ligger Kasby, tidigare torpet Kassverkan, känt sedan 1640-talet, där stugans äldsta delar anses vara från 1700-talet. Bostadsområdet Tegelhagen byggdes strax nordväst om det gamla torpet på 1970-talet, med kedjehus, parvillor och radhus i två våningar. Enligt beskrivningarna av området domineras det av stora bilfria områden med kedjehus. Silverdal har en ännu längre historia. Torpet Silverdal är belagt sedan 1730-talet, först under namnet Skogsdal. Legenden säger att drottning Kristinas häst tappade en silversko här under kröningståget 1650, men enligt Wikipedia är det mycket osannolikt, eftersom platsen inte låg på vägen. Silverdals gård har varit krog, tingshus och lanthandel, och i dag återstår manbyggnaden och den lilla smedjan. Grannen Rådan omnämns redan 1599 och har varit torp, rättarboställe, herrgård, internatskola, militärförläggning och polishögskola. Sollentuna kommun köpte Rådan 1989, och det gjorde det möjligt att bygga ett nytt bostadsområde väster om gården. Silverdal byggdes som en trädgårdsstad med omkring 1 000 bostäder, skolor och arbetsplatser, i etapper från 2002, och 2023 ansågs den ursprungliga planen vara genomförd.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Sollentuna"},{"label":"Delområden","value":"Tegelhagen, Silverdal"},{"label":"Hustyper","value":"Kedjehus, parvillor, radhus"},{"label":"Byggperiod","value":"Tegelhagen 1970-tal, Silverdal från 2002"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 610"}],
    sourceLink: {"label":"Wikipedia: Tegelhagen","url":"https://sv.wikipedia.org/wiki/Tegelhagen"},
    parentLocation: {"name":"Sollentuna","slug":"sollentuna"},
    uniqueFAQ: {"question":"När byggdes husen i Tegelhagen och Silverdal?","answer":"Byggperiod enligt källorna: Tegelhagen 1970-tal, Silverdal från 2002. Hustyper: kedjehus, parvillor, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Tegelhagen och Silverdal",
    lat: 59.39,
    lng: 17.99,
    nearbyLocations: ["Sollentuna","Viby","Edsviken","Helenelund"],
    h1Override: "Takläggare i Tegelhagen och Silverdal, Sollentuna",
    extraSections: [{ heading: "Vad det betyder för taket", text: "De två delarna har helt olika ålder. Kedjehusen, parvillorna och radhusen i Tegelhagen är i dag runt 45–55 år gamla, medan husen i Silverdal är byggda från 2002 och framåt och därför betydligt yngre. I Tegelhagen kan taken redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I Silverdal handlar det oftare om att hålla koll på detaljer och avvattning. I kedjehusområdena, där husen byggdes samtidigt och ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Tegelhagen eller Silverdal? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "ensta",
    name: "Ensta",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Ensta villastad i Täby, med tegel- och putsvillor från 1940- till 1960-talet. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Ensta har vuxit fram på båda sidor om Roslagsbanans hållplats, som kom till 1911. Platsen är betydligt äldre än villorna. Ensta krog har sitt ursprung på 1600-talet och var det första gästgiveriet för den som reste från Stockholm mot Roslagen längs Roslagsvägen, även kallad Postvägen, landsvägen mellan Stockholm, Norrtälje och Grisslehamn. Från 1780-talet fram till 1844 var Ensta också tingsplats för Danderyds skeppslag. Drygt 500 meter söder om stationen står en av de få kvarvarande banvaktarstugorna, från 1885, där banvaktaren sänkte grindarna vid landsvägen när tåget skulle passera. Enligt Täby kommun var villabyggandet sparsamt i början, men 1930-talets styckningsplan för Ensta villastad fick det att ta fart, och byggandet var särskilt intensivt under 1940–60-talen. På 1970-talet gjorde kommunens förnyelseplanering det möjligt att stycka befintliga villatomter till fler tomter, och nya enhetliga kvarter växte fram i det tidigare skogsområdet i norr. Kommunen beskriver ett skiftande villabestånd med både äldre villor och moderna typhus, där intrycket fortfarande domineras av efterkrigstidens varierade tegel- och putsarkitektur. Det slingrande vägnätet och de lummiga, kuperade tomterna finns kvar. Högt över husen står vattentornet från 1964. Vid den östra delen av Hjortvägen lyfter kommunen fram villor från 1950- och 60-talen med en hög andel ursprungliga material och detaljer. Husen har en eller två våningar, fasader i rött eller gult tegel och grå putsad sockel, och byggnaderna är ofta uppdelade i delar som förskjuts mot varandra. Kommunens råd är bland annat att behålla ursprungliga entrépartier, tegelfasader och nätta takutsprång. Enligt hitta.se är husen i Ensta främst byggda på 1950- och 1970-talen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Delområden","value":"Ensta villastad, Kullagränd"},{"label":"Hustyper","value":"Villor"},{"label":"Byggperiod","value":"1940–1960-tal, förtätning 1970-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 530"}],
    sourceLink: {"label":"Täby kommun: Ensta (kulturmiljö)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/ensta"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Ensta, Täby",
    uniqueFAQ: {"question":"När byggdes husen i Ensta?","answer":"Byggperiod enligt källorna: 1940–1960-tal, förtätning 1970-tal. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Ensta",
    lat: 59.4345,
    lng: 18.064,
    nearbyLocations: ["Täby","Näsbypark","Roslags-Näsby"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Ensta är i dag runt 50–85 år gamla. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. På villorna från 1950- och 60-talen är takutsprången och detaljerna en del av husens karaktär, och det är värt att tänka på redan när materialet väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Ensta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "erikslund",
    name: "Erikslund",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i grupphusområdet Erikslund i Täby, med parhus från 1972–73. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Erikslund är enligt Täby kommun ett enhetligt grupphusområde från första halvan av 1970-talet. Ett skogbeklätt och glest bebyggt torplandskap omvandlades där på kort tid till en tät låghusstad med över 300 bostäder. Området byggdes 1972–1973 av Platzer bygg, med arkitekten Bengt Börtin. Planeringen följde tidens ideal om grannskapsenheter. Husen ligger utmed intima, bilfria gaturum och runt lekvänliga gårdar, medan infarter, parkeringsytor och garage är samlade i områdets ytterkanter, ett tydligt exempel på den trafikseparering som var en viktig princip på 1970-talet. Kommunen beskriver Erikslund som ett konsekvent planerat och genomfört miljonprogramsområde med rationellt byggande i mänsklig skala. Parhusen har två våningar och flacka tak. Fasaderna är klädda med täckmålad lockpanel, med vita horisontella skivtäckta fält över fönstren på både entré- och trädgårdssidan. Fönstren är enkla, vita och utan spröjs, större mot trädgården och små och högt sittande mot entrén, och gavlarna saknar fönster. Kommunen noterar att husen har enkla, raka former utan takfot, med bara en bockad plåt i övergången mellan tak och vägg. Trädgårdarna är inhägnade av plank och låga förråd, och husgrupperna har olika färgsättning, så att de går att skilja åt. Kommunens råd för området är att värna grupphusområdets tidstypiska uttryck och karaktärsdrag, så att miljön förblir enhetlig både i arkitektur och planmönster, och att behålla kvarterens enhetliga färgsättning och ursprungliga fönsterformat.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Hustyper","value":"Parhus i grupphusområde, över 300 bostäder"},{"label":"Byggperiod","value":"1972–1973"},{"label":"Tak (belagt)","value":"Flacka tak, ingen takfot, bockad plåt mellan tak och vägg (material okänt)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 600"}],
    sourceLink: {"label":"Täby kommun: Erikslund (kulturmiljö)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/erikslund"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Erikslund, Täby",
    uniqueFAQ: {"question":"När byggdes husen i Erikslund?","answer":"Byggperiod enligt källorna: 1972–1973. Hustyper: parhus i grupphusområde, över 300 bostäder. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Erikslund",
    lat: 59.455,
    lng: 18.075,
    nearbyLocations: ["Täby","Vallabrink","Gribbylund och Löttingelund"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Erikslund är i dag runt 50 år gamla. Taken kan redan ha lagts om, men där det inte har skett är det ofta dags att se över underlaget och plåtdetaljerna. På hus med flacka tak och utan takfot är övergången mellan tak och vägg, den bockade plåten, en viktig detalj, både för tätheten och för husens enhetliga uttryck. Eftersom husen byggdes samtidigt och är likadana kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Kommunens riktlinjer om enhetlighet är bra att ha med sig när materialet väljs." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Erikslund och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "gribbylund",
    name: "Gribbylund och Löttingelund",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Gribbylund, Myrängen och Löttingelund i Täby, med typhus, radhus och kedjehus från 1970- och 80-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Gribbylund ligger vid Rönningesjön, på mark där människor har rört sig sedan stenåldern. I slutet av stenåldern låg vattnet omkring 25 meter högre än i dag, och stora delar av området stack upp som öar i ett skärgårdslandskap. Från bronsåldern och järnåldern finns flera gravfält, bland annat ett med en så kallad domarring, och vid Löttingelundsvägen finns en gammal fångstgrop för varg. Johanneskällan, en trefaldighetskälla, är dokumenterad sedan 1700-talet. På 1400-talet hade byn Gribby fyra gårdar och grannbyn Libby två. År 1793 köptes byarna av slottsbyggmästaren Abraham Robsahm, som byggde nya mangårds- och ekonomibyggnader och kallade godset Grefbylund, senare Gribbylund. Gårdens huvudbyggnad från 1880-talet står kvar vid en allé från Gribbylundsvägen. Villabebyggelsen började 1919, när Gribbylunds kristna egnahemsförening köpte gården och började stycka marken till sommarstugetomter. Enligt Täby kommun började en omvandling till permanentboende på stora tomter på 1940-talet, men kommundelen förblev glest bebyggd med villor och sommarhus fram till 1970-talet, då planeringen av dagens täta villakvarter tog fart. Löttingelund växte fram på 1970- och 80-talen, först genom att sommarstugor byggdes om och sedan genom att de stora tomterna styckades av. Där finns också dragontorpet Råstugan, som nämns redan 1772 och har skydd i detaljplan. Kommunen beskriver villabebyggelsen som till största delen typhus från 1970- och 80-talen, med flera områden med radhus och kedjehus. Ett exempel är kvarteret Kammaren, ett välbevarat kedjehuskvarter från 1976 med tegel i bottenvåningen, branta tak med röda betongpannor, gavlar i brunmålad träpanel och tomter på cirka 300 kvadratmeter. I kvarteret Soffan finns parhus och radhus i två våningar med sadeltak av röda betongpannor. Enligt hitta.se är husen i området främst byggda på 1980- och 1990-talen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Delområden","value":"Gribbylund västra, Myrängen, Löttingelund"},{"label":"Hustyper","value":"Villor (typhus), radhus, kedjehus"},{"label":"Byggperiod","value":"Typhus 1970–80-tal, Löttingelund 1970–80-tal"},{"label":"Tak (belagt per kvarter)","value":"Kammaren och Soffan: röda betongpannor"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 100"}],
    sourceLink: {"label":"Täby kommun: Gribbylund – Löttingelund – Hästängen (kulturmiljö)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/gribbylund---lottingelund---hastangen"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Gribbylund och Löttingelund, Täby",
    uniqueFAQ: {"question":"När byggdes husen i Gribbylund och Löttingelund?","answer":"Byggperiod enligt källorna: typhus 1970–80-tal, Löttingelund 1970–80-tal. Hustyper: villor (typhus), radhus, kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Gribbylund och Löttingelund",
    lat: 59.457,
    lng: 18.115,
    nearbyLocations: ["Täby","Erikslund","Vallabrink"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Gribbylund och Löttingelund är i dag runt 35–55 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I kedjehus- och radhuskvarteren är husen ofta likadana och byggda samtidigt, och där kan grannar ibland ha nytta av att planera takbyten i samma veva. För kvarteret Kammaren är kommunens råd att behålla originalkulörer, och det är bra att ha med sig när materialet väljs. Varje hus får alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Gribbylund, Myrängen eller Löttingelund? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "karlslund",
    name: "Karlslund",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Karlslund och Täby kyrkby, med parhus och kedjehus från 1975–76. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Karlslund ligger i södra delen av Täby kyrkby, en av de äldsta bebyggelserna i Täby. I norra delen av kyrkbyn, där Kyrkvägen korsar ett kärr, lät Jarlabanke bygga en bro för nästan tusen år sedan, en vägbank av risknippen och jord kantad med stenar. Runstenar restes för att visa vem som hade byggt den, och Jarlabankes bro är i dag en av Täbys mest kända sevärdheter. Den moderna kyrkbyn tog form med järnvägen. När Roslagsbanan öppnade 1885 ökade byggandet, och med avstyckningsplanen från 1907 bebyggdes odlingsmarkerna kring gårdarna Täby och Byle med en ny villastad, planerad med slingrande vägar och stora tomter. År 1925 bodde 1 250 personer i kyrkbyn, och här fanns affärer, konditori, bank, smedja, mejeri och Täbys första sjukvårdsmottagning. I området kring Byle upptäcktes på 1920-talet en mineralkälla, och Hemberga brunn blev ett utflyktsmål med bad och pensionat. Enligt kommunen bromsades utbyggnaden av första världskriget, och nästa stora våg kom på 1970-talet, då en ny stadsplan gjorde att många äldre fastigheter styckades av och både radhus och villor byggdes. Karlslund hör till den utbyggnaden. Enligt Täby kommun uppfördes parhus och kedjehus i ett och ett halvt plan här åren 1975–76. Byggnadsvolymerna är förskjutna mot varandra, de svarta sadeltaken är uppbrutna av takkupor och balkonger, och fasaderna i träpanel är målade gula eller röda. I närheten ligger radhusområdena Midgård från 1972–73, med flacka pulpettak, och Miklagård från 1975–76, med spetsiga sadeltak av röda betongpannor. Många av egnahemshusen från början av 1900-talet finns också kvar i kyrkbyn, bland annat vid Skolvägen, Lokevägen och Nannavägen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Hustyper","value":"Parhus och kedjehus i ett och ett halvt plan"},{"label":"Byggperiod","value":"1975–1976"},{"label":"Tak (belagt)","value":"Svarta sadeltak med takkupor (material ej angivet)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 520"}],
    sourceLink: {"label":"Täby kommun: Täby kyrkby (kulturmiljö)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/taby-kyrkby"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Karlslund och Täby kyrkby",
    uniqueFAQ: {"question":"När byggdes husen i Karlslund?","answer":"Byggperiod enligt källorna: 1975–1976. Hustyper: parhus och kedjehus i ett och ett halvt plan. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Karlslund",
    lat: 59.493,
    lng: 18.06,
    nearbyLocations: ["Täby","Midgård och Byle","Ella gård"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Parhusen och kedjehusen i Karlslund är i dag runt 50 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. På tak med takkupor är anslutningarna runt kuporna en extra punkt att ha koll på. Eftersom husen byggdes samtidigt och har samma form kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Karlslund eller Täby kyrkby? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "midgard-byle",
    name: "Midgård och Byle",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Byle villastad och radhusområdet Midgård i Täby kyrkby, med villor från 1900-talets början och radhus från 1970-talet.",
    longDescription:
      "Täby kyrkby och Byle var från början två separata stationslägen på Roslagsbanan, som med tiden har vuxit ihop. Enligt Täby kommun låg det andra stationsläget, i dag borttaget, i nordöstra delen av kyrkbyn, väster om gården Byle. Med de två stationerna vid de gamla gårdarna Täby och Byle blev Täby snart en av Stockholmstraktens större villastäder, och i den äldre planeringen lades villorna främst på skogsklädda höjder i söder och på jordbruksmarken i norr. I Byle upptäcktes på 1920-talet en källa med mineralhaltigt vatten, och Hemberga brunn med pensionat blev ett utflyktsmål för storstadsbor som ville bada. Brunnen utvecklades sedan till en mineralvattenkälla med samma namn. Enligt kommunen finns många av egnahemshusen från början av 1900-talet kvar, särskilt vid de gamla stationslägena. I de äldre delarna märks den tidiga villastadens planering tydligt, med stora lummiga trädgårdar, husen långt in på tomten och gröna ytor mellan kvarteren. Enligt alla.csv är villorna i Byle villastad från 1907 och 1910-talet, och där finns också radhus från 1974. Midgård, nära stationen, är kyrkbyns största radhusområde, med 231 bostäder i 32 längor, byggt 1972–1973. Kommunen beskriver radhusen som tvåvåningshus med flacka pulpettak med takband, stående panel och en horisontell list mellan våningarna, och fönster utan foder och spröjs. Formspråket är rationellt och enkelt. Andra spår av kyrkbyns historia är Täbys äldsta brandstation vid Vikingavägen från 1937, Täbys första höga hus vid stationen från 1955 och torpet Runborg från omkring 1800, byggt för en båtsman och i dag skyddat i detaljplan.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Delområden","value":"Midgård, Byle villastad, Byle allé (del av Täby kyrkby)"},{"label":"Hustyper","value":"Radhus (Midgård, 231 bostäder), villor, kedjehus, radhus (Byle)"},{"label":"Byggperiod","value":"Midgård 1972–73, Byle villor 1907–1910-tal och radhus 1974"},{"label":"Tak (belagt)","value":"Midgård: flacka pulpettak med takband"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 670 + 580"}],
    sourceLink: {"label":"Täby kommun: Täby kyrkby (kulturmiljö)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/taby-kyrkby"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Midgård och Byle, Täby kyrkby",
    uniqueFAQ: {"question":"När byggdes husen i Midgård och Byle?","answer":"Byggperiod enligt källorna: Midgård 1972–73, Byle villor 1907–1910-tal och radhus 1974. Hustyper: radhus (Midgård, 231 bostäder), villor, kedjehus, radhus (Byle). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Midgård och Byle",
    lat: 59.4965,
    lng: 18.0555,
    nearbyLocations: ["Täby","Karlslund","Ella gård"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Egnahemsvillorna i Byle är i dag över hundra år gamla, radhusen i Midgård runt 50 år och radhusen i Byle från 1974 lika gamla. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. På de flacka pulpettaken i Midgård är takbandet och anslutningarna viktiga detaljer. I Midgårds radhuslängor, där husen byggdes samtidigt och delar tak med grannen, kan grannar ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Midgård eller Byle? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "roslags-nasby",
    name: "Roslags-Näsby",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Roslags-Näsby i Täby, med villor från tidigt 1900-tal och 1930-talet och senare årsringar. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Roslags-Näsby har varit en viktig knutpunkt i Täby sedan Roslagsbanan drogs fram på 1880-talet. Här passerade också Stockholmsvägen, landsvägen mellan Stockholm, Vaxholm och Norrtälje. Enligt Täby kommun växte villaområdet fram i anslutning till stationen, på mark som då hörde till Näsby slott. Området planerades enligt det tidiga 1900-talets trädgårdsinspirerade ideal, med en planstruktur som följer terrängen, slingrande vägar och lummiga tomter. De första villorna placerades främst på höglänta skogspartier, och från 1930-talet bredde villasamhället ut sig allt mer över den tidigare odlingsmarken. Ytterbyskolan, vars första byggnad uppfördes 1906, kom till när Täby tog steget från jordbruksbygd till villastäder längs Roslagsbanan. De nuvarande skolbyggnaderna är från 1926 och 1944. När Täby blev köping 1948 fick Roslags-Näsby en ny roll som kommuncentrum. Det gamla kommunhuset från 1950, en tegelbyggnad med valmat sadeltak ritad av Sture Elmén, finns kvar och är i dag ombyggt till bostäder, och intill ligger elverkshuset från 1960. Centrumanläggningen med butiker i tvåvåningshus byggdes 1955. Norr om stationen växte ett industriområde fram längs Stockholmsvägen efter stadsplanen för Åva tomtområde 1930, med bland annat Hallbergs skruvfabrik. Kommunen beskriver villabebyggelsen i Roslags-Näsby i dag som blandad, med årsringar från flera olika tidsepoker. Väster om järnvägen finns ett område med äldre villabebyggelse bevarat intill den nya bostadsbebyggelsen. Enligt hitta.se är många av husen byggda på 1960- och 1970-talen, och enligt alla.csv finns både villor och radhus i området.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Delområden","value":"Roslags-Näsby norra/södra, Sågtorp, Mosstorp, Storstugan"},{"label":"Hustyper","value":"Villor, radhus (samt flerbostadshus)"},{"label":"Byggperiod","value":"Villor från tidigt 1900-tal och 1930-tal, hitta.se 1960- och 1970-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 660"}],
    sourceLink: {"label":"Täby kommun: Roslags-Näsby – Lahäll (kulturmiljö)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/roslags-nasby---lahall"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Roslags-Näsby, Täby",
    uniqueFAQ: {"question":"När byggdes husen i Roslags-Näsby?","answer":"Byggperiod enligt källorna: villor från tidigt 1900-tal och 1930-tal, hitta.se 1960- och 1970-tal. Hustyper: villor, radhus (samt flerbostadshus). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Roslags-Näsby",
    lat: 59.439,
    lng: 18.059,
    nearbyLocations: ["Täby","Ensta","Näsbypark"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Roslags-Näsby står villor från början av 1900-talet nära hus från 1960- och 70-talen. De äldsta villorna är över hundra år gamla, 1930-talets villor runt 90 år och de yngre husen runt 50–65 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På de äldre villorna från trädgårdsstadens tid kan takets form och detaljer vara en del av husets karaktär, och det är värt att tänka på redan när materialet väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Roslags-Näsby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "nasbypark",
    name: "Näsbypark",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Näsbypark i Täby: villor från 1930-talet, grupphus som Norskogen och kvarteret Hägern. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Näsbypark har vuxit fram kring Näsby slott vid Näsbyviken. Från Näsby slott vid Näsbyviken strålar ett system av trädrader ut i villabebyggelsen. Alléerna anlades enligt Täby kommun från 1700-talet och framåt och är äldre än husen omkring dem. Själva slottet anlades efter ritningar från 1665 och byggdes om 1731. Staten förvärvade det 1941, och från 1943 hade Sjökrigsskolan sina lokaler här. Området närmast slottet är byggnadsminne sedan 1943. Slottet uppfördes efter ritningar av Nicodemus Tessin den äldre och är, med park och alléer, Täbys enda byggnadsminne. Det brann 1897 och köptes 1902 av Carl Robert Lamm, som tillsammans med sin hustru Dora byggde upp det igen. År 1907 bildades Näsby Fastighets AB, som började stycka tomter. Det strandnära området Näsby slottspark planlades först, och enligt Täby kommun var över 200 tomter bebyggda redan 1933. Villaområdet Näsbypark södra planlades 1934 under namnet Näsby slottspark. Kommunen beskriver hur Lamm ville bevara parkstrukturen, och de stora tomterna, grönytorna och det slingrande vägnätet med trädkantade huvudgator som Slottsvägen och Centralvägen präglar fortfarande området. Med järnvägen på 1930-talet, Sjökrigsskolan på slottet från 1940-talet och motorvägen på 1950-talet byggdes villabeståndet gradvis ut. En stadsplan från 1953 gjorde Näsbypark till en modern stadsdel med eget centrum, som invigdes 1961. Grupphusområdena är något av ett kännetecken. Enligt kommunens beskrivning har Norskogen 197 bostäder i villor, parhus och radhus från 1957–59, ritade av Gustaf Lettström och tillverkade av Mockfjärdshus, med flacka tak och fasader av finprofilerad aluminiumplåt. De \"engelska radhusen\" är egentligen kedjehus i rött tegel från 1955, ritade av Gunnar Jacobson. Kvarteret Hägern från 1975–76 har kedjehus med branta tak täckta med svarta betongpannor och små takkupor i svartmålad plåt. Kvarteret Tranan från 1998–99 har parhus och enbostadshus med sadeltak av röda betongpannor, och två av husen har tak av svartmålad bandplåt. Näsby allé kantas av villor från 1930- och 1940-talen, närmast Roslagsbanans station med samma namn. Kommunen beskriver dem som hus i en eller två våningar med fasader i trä, puts eller tegel, placerade långt in på tomterna, och många är välbevarade. Vid Allévägen och Slottsvägen finns enligt kommunen flera bevarade egnahemshus, enkla envåningsvillor i trä, och vid Slottsvägen och Parkvägen dominerar tvåvåningsvillor med funkisstilens ljusa fasadputs. Vid Slottsvägens norra del står envåningsvillor från samma årtionden, ritade av Valdus Wikén. Längs Centralvägen ligger villor från olika årtionden, och en stadsplan från 1926 styr bebyggelsen där så att husen hamnar långt in på tomterna. Kvarteret Ankaret, som också kallas Långa raden, är ett radhusområde med 31 lägenheter från 1968, ritat av Lars Hellman och byggt för officerare vid Sjökrigsskolan. Vid slottet har en detaljplan som fick laga kraft 2018 gett plats för nya bostäder, uppförda 2019–2023, sedan kaserner från skolans tid hade rivits.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Delområden","value":"Norskogen, Näsbypark östra, västra och södra, Näsby allé, Centralvägen, kvarteret Ankaret"},{"label":"Hustyper","value":"Villor, kedjehus, radhus, parhus, nya bostäder vid slottet"},{"label":"Byggperiod","value":"Villor 1930–40-tal, grupphus 1955–1976, Ankaret 1968, parhus 1998–99, bostäder vid slottet 2019–2023"},{"label":"Tak (belagt per kvarter)","value":"Hägern: svarta betongpannor · Tranan: röda betongpannor (två hus med svartmålad bandplåt) · Norskogen: flacka tak"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 520"}],
    sourceLink: {"label":"Täby kommun: Näsbypark (kulturmiljö, råd och riktlinjer)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/nasbypark"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Näsbypark, Täby",
    uniqueFAQ: {"question":"När byggdes husen i Näsbypark?","answer":"Byggperiod enligt källorna: Villor 1930–40-tal, grupphus 1955–1976, parhus 1998–99. Hustyper: villor, kedjehus, radhus, parhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Näsbypark",
    lat: 59.4285,
    lng: 18.0965,
    nearbyLocations: ["Täby","Ella gård","Skarpäng","Vallabrink"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Näsbypark spänner över nästan hundra år. Villorna från 1930- och 40-talen är i dag runt 80–95 år gamla, grupphusen från 1955–76 runt 50–70 år och husen i Tranan runt 25 år. Villorna vid Näsby allé och i Näsby slottspark är i dag mellan 80 och 95 år gamla, och radhusen i Ankaret knappt 60 år. Bostäderna vid slottet är bara några år. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. På villor i den åldern har taket ofta hunnit bytas, och frågan är snarare hur det nuvarande taket mår: underlaget, plåten vid skorsten och takfot, rännor och stuprör. I grupphusområdena är enhetligheten en viktig del av miljön. För Norskogen finns områdesriktlinjer som syftar till att området ska behålla sin enhetlighet, och för de engelska radhusen är kommunens råd att bevara den enhetliga karaktären och den ursprungliga färgsättningen. För Ankaret är rådet att bevara den enhetliga karaktären. Här finns kommunala råd som rör just taken. För villorna vid Näsby allé, Centralvägen och i Näsbypark södra skriver Täby kommun att befintliga takformer, takmaterial och takfotens utformning bör behållas på husen och väljas även för tillbyggnader. Ta reda på vad som gäller för ditt hus innan du väljer nytt tak. Vid ett takbyte i sådana kvarter är det därför klokt att välja material och kulör i linje med kommunens riktlinjer. Grannar i samma kvarter kan ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. På radhus hänger taken ihop med grannens. Varje hus får en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Näsbypark och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "vallabrink",
    name: "Vallabrink",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Östra och Västra Vallabrink i Täby, med typvillor och kedjehus från 1960- och 70-talen. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Vallabrink ligger på kuperad skogsmark som tidigare hörde till den närbelägna gården Valla. Genom stadsdelen går Täbyvägen, som följer den ursprungliga vägen norrut mot Täby kyrka. Enligt Täby kommun var vägen, tillsammans med den gamla Hagbyvägen, länge en anhalt med en vägkrog, som finns omtalad en bit in på 1700-talet. Tomter började styckas av från Valla gårds utmark gradvis på 1930-talet, men bebyggelsen förblev gles fram till 1960-talet, när nya stadsplaner antogs. Planeringen skedde i två etapper med tio års mellanrum, och Täbyvägen blev gränsen mellan dem. Östra Vallabrink, mot Ella park, byggdes först. Där planlades i början av 1960-talet ett fyrtiotal kedjehus och minst lika många villor, och de enstaka äldre husen som redan fanns fick ingå i den nya planen. Västra Vallabrink, på andra sidan vägen, kom senare och präglas enligt kommunen främst av 1970-talets typhus. Kommunen beskriver Vallabrink som dominerat av typvillor från framför allt 1960- och 70-talen, med tidstypisk karaktär i tegel och trä. Det går från 1960-talets putsade tegelhus till 1970-talets villor i en och en halv plan, med sadeltak och djupa takutsprång. Som exempel nämner kommunen en suterrängvilla från 1972 vid Brinkvägen, med gavlar av mexitegel, och en villa från 1982 vid Klippvägen, med fasader av mexitegel och tak av svarta betongpannor.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Delområden","value":"Östra och Västra Vallabrink"},{"label":"Hustyper","value":"Villor och kedjehus"},{"label":"Byggperiod","value":"Främst 1960–70-tal (tomter från 1930-talet)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 570"}],
    sourceLink: {"label":"Täby kommun: Vallabrink (kulturmiljö)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/vallabrink"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Vallabrink, Täby",
    uniqueFAQ: {"question":"När byggdes husen i Vallabrink?","answer":"Byggperiod enligt källorna: Främst 1960–70-tal (tomter från 1930-talet). Hustyper: villor och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Vallabrink",
    lat: 59.4555,
    lng: 18.056,
    nearbyLocations: ["Täby","Ella gård","Näsbypark"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Vallabrink är i dag runt 50–65 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. De djupa takutsprången från 1970-talet är en del av husens karaktär, och takfot och vindskivor behöver ses över i samma arbete. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. I kedjehusområdet i Östra Vallabrink är husen byggda samtidigt, och där kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Vallabrink och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "kalvesta",
    name: "Kälvesta",
    region: "Västerort",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Kälvesta i Västerort, med radhus, kedjehus, atriumhus och villor från 1966–75. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Kälvesta i nordvästra Hässelby-Vällingby är en stadsdel med radhus och villor, som i beskrivningar av stadsdelen kallas ett \"horisontellt\" miljonprogramsområde. Stadsdelen gränsar till Vinsta i sydväst, Hässelby villastad i väster, Solhem i sydost, Lunda i nordost och Skälby i Järfälla i norr. Platsen har brukats länge. Kälvesta gravhögar är Stockholms kommuns största gravfält, med omkring 145 fornlämningar: högar, runda och rektangulära stensättningar, treuddar och skeppsformiga stensättningar. Kälvesta gamla by i Spånga socken har anor från medeltiden och delades under 1700-talet upp på flera gårdar. På 1930- och 40-talen styckades marken av till handelsträdgårdar, småbruk och villor, och några av de villorna finns fortfarande kvar. Stockholms stad köpte området 1949, när större delen av Spånga införlivades med Stockholm, och stadsdelen bildades 1953. Namnet kommer från byn, och ändelsen -sta betyder plats. Det moderna Kälvesta planerades successivt mellan 1963 och 1974, i samråd med arkitektkontoret Höjer & Ljungqvist, som ritade för radhus och kedjehus. De första husen började byggas 1966, och byggandet pågick till mitten av 1970-talet. Enligt beskrivningarna av stadsdelen finns här omkring 2 000 enfamiljsbostäder: radhus, kedjehus, atriumhus och fristående villor längs Sörgårdsvägen, där flertalet bor i radhus om fyra rum och kök.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Hässelby-Vällingby)"},{"label":"Hustyper","value":"Radhus, kedjehus, atriumhus, villor"},{"label":"Byggperiod","value":"1966 – mitten av 1970-talet (planlagt 1963–1974)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 500"}],
    sourceLink: {"label":"Wikipedia: Kälvesta","url":"https://sv.wikipedia.org/wiki/K%C3%A4lvesta"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Kälvesta, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Kälvesta?","answer":"Byggperiod enligt källorna: 1966 – mitten av 1970-talet (planlagt 1963–1974). Hustyper: radhus, kedjehus, atriumhus, villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Kälvesta",
    lat: 59.3705,
    lng: 17.848,
    nearbyLocations: ["Hässelby","Vällingby","Spånga"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Kälvesta är i dag runt 50–60 år gamla. Taken kan redan ha lagts om, men där det inte har skett är det ofta dags att se över underlagspapp, läkt, plåtdetaljer och hängrännor. På radhus och kedjehus hänger taken ihop med grannens, och anslutningarna mellan husen behöver då utföras så att de fungerar tillsammans med grannens tak. Eftersom husen i ett kvarter ofta är likadana och byggda samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. I området finns samfällighetsföreningar, och om ditt hus omfattas av gemensamma regler för fasader och tak är det bra att stämma av med föreningen innan materialet väljs. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Kälvesta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "fullersta",
    name: "Fullersta",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Fullersta i Huddinge, med villor från 1920-talet och bebyggelse från 1960- och 70-talen. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Fullersta nämns i skrift första gången 1356, då byn bestod av fyra hemman. Äldre namnformer är Fullestum från 1369 och Fullista från 1535. Enligt en tolkning kommer förleden från Fullerstaån, som på våren kunde föra stora vattenmängder från sjön Gömmaren till Trehörningen, och fynd tyder på att det har funnits en bosättning här sedan folkvandringstiden, för omkring 1 500 år sedan. Gården blev säteri 1656, och den nuvarande gårdsbyggnaden uppfördes 1850 av godsägaren Pehr Pettersson, kallad Patron Pehr. I början av 1900-talet tog exploateringen fart. Gårdens siste jordbrukande ägare, Carl-Erik Lindell, lade ner jordbruket och började 1902 sälja \"vackra tomter för villor och egna hem\" vid Huddinge järnvägsstation under namnet Huddinge villastad. Efter några ägarbyten tog AB Upplandshem över försäljningen. År 1918 gjorde arkitekten Arvid Stille en stadsplan för 52 hektar och 208 tomter, som enligt beskrivningen tog stor hänsyn till terrängen och den befintliga miljön. Planen genomfördes dock inte helt. Fullersta var eget municipalsamhälle mellan 1924 och 1946. Nära Huddinge centrum finns i dag äldre villabebyggelse från Huddinge villastad och Hörningsnäs villastad, med några k-märkta villor i nationalromantisk stil. Innan Huddinge centrum byggdes var Fullerstatorget ortens samlingspunkt. Enligt hitta.se är bebyggelsen i Fullersta främst från 1960- och 1970-talen, med villor från 1920- och 1930-talen längs Fullerstavägen. Sedan 2018 är Fullersta en egen kommundel, med drygt 7 700 invånare.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Huddinge"},{"label":"Hustyper","value":"Villor (samt flerbostadshus i kommundelen)"},{"label":"Byggperiod","value":"Främst 1960–70-tal, villor 1920–30-tal längs Fullerstavägen"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 600"}],
    sourceLink: {"label":"Wikipedia: Fullersta","url":"https://sv.wikipedia.org/wiki/Fullersta"},
    parentLocation: {"name":"Huddinge","slug":"huddinge"},
    h1Override: "Takläggare i Fullersta, Huddinge",
    uniqueFAQ: {"question":"När byggdes husen i Fullersta?","answer":"Byggperiod enligt källorna: Främst 1960–70-tal, villor 1920–30-tal längs Fullerstavägen. Hustyper: villor (samt flerbostadshus i kommundelen). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Fullersta",
    lat: 59.2395,
    lng: 17.975,
    nearbyLocations: ["Huddinge","Stuvsta","Trångsund","Segeltorp"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Fullersta står hus från mycket olika tider nära varandra. Villorna längs Fullerstavägen är i dag runt 90–100 år gamla, medan husen från 1960- och 70-talen är runt 50–65 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På äldre villor kan takets form, takfot och detaljer vara en del av husets karaktär, och det är värt att tänka på redan när materialet väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Det är klokt att ta reda på det innan materialet bestäms. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Fullersta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "brevik-kappala-gashaga",
    name: "Brevik, Käppala och Gåshaga",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Brevik, Käppala och Gåshaga på Lidingö, från 1910-talsvillor till nya radhus. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Den östra delen av södra Lidingö, med Brevik, Käppala och Gåshaga, har en gemensam historia. Här låg några av öns första större lantbruksgårdar, och namnet Brevik betyder \"breda viken\". Breviks gård nämns 1498 som Bredewijk, och Käppala finns med som Kiepla på den äldsta kända kartan över Lidingön, från 1661. Under lång tid ingick gårdarna i Djursholms gods, och när fideikommisset upplöstes 1774 blev de självständiga. Gåshaga gård fick sin fastighet lagfaren vid den stora skogsdelningen samma år. Villastaden började ta form 1906–1907, när finansmannen Allan Abenius köpte Brevik, Käppala och Gåshaga och lät stycka upp marken till \"den vita villastaden vid segelleden\", med Halvkakssundet och Lilla Värtan utanför. Storhetstiden kom på 1910-talet, då påkostade villor i jugendstil byggdes efter ritningar av kända arkitekter. Tre villor i Brevik är i dag byggnadsminnen: Villa Högudden från 1876, Villa Klippudden från 1910 och Högberga gård från 1916, ritad av Carl Westman. I Käppala planerades gatunätet på 1910-talet, men byggandet kom igång först efter första världskriget, till en början med villor och sportstugor. Under krigen och 1930-talets depression stannade byggandet nästan helt av och kom inte i gång igen förrän på 1960-talet. Enligt beskrivningen av stadsdelen består bebyggelsen i Brevik därför av en blandning av större villor från 1900-talets början och, i huvudsak, villor från 1960-talet och framåt. Gåshagas mark mot havet var länge reserverad för industrier och båtvarv men har efterhand bebyggts med radhus, villor och flerbostadshus, och enligt Wikipedia byggdes nya villor och radhus där mellan 2000 och 2020.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Lidingö"},{"label":"Delområden","value":"Brevik, Käppala, Gåshaga"},{"label":"Hustyper","value":"Villor, kedjehus, radhus"},{"label":"Byggperiod","value":"Villor från 1910-talet, i huvudsak 1960-tal och framåt (Brevik), villastad från 1910-talet (Käppala), nya villor och radhus 2000–2020 (Gåshaga)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 300"}],
    sourceLink: {"label":"Wikipedia: Brevik, Lidingö","url":"https://sv.wikipedia.org/wiki/Brevik,_Liding%C3%B6"},
    parentLocation: {"name":"Lidingö","slug":"lidingo"},
    h1Override: "Takläggare i Brevik, Käppala och Gåshaga, Lidingö",
    uniqueFAQ: {"question":"När byggdes husen i Brevik, Käppala och Gåshaga?","answer":"Byggperiod enligt källorna: Villor från 1910-talet, i huvudsak 1960-tal och framåt (Brevik), villastad från 1910-talet (Käppala), nya villor och radhus 2000–2020 (Gåshaga). Hustyper: villor, kedjehus, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Brevik, Käppala och Gåshaga",
    lat: 59.352,
    lng: 18.225,
    nearbyLocations: ["Lidingö"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I området står hus från tre olika sekel. Jugendvillorna är i dag över hundra år gamla, villorna från 1960- och 70-talen runt 50–65 år, och husen i Gåshaga från 2000-talet är betydligt yngre. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. På de äldre villorna är takets form, material och detaljer ofta en del av husets karaktär. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Det är klokt att ta reda på det innan materialet väljs. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Brevik, Käppala eller Gåshaga? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "bollstanas",
    name: "Bollstanäs",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Bollstanäs, Upplands Väsby, med radhus, kedjehus och villor från 1970- och 80-talen. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Bollstanäs ligger öster om E4 och Uppsalavägen, vid Norrvikens nordvästra strand, med Rotebro i Sollentuna i söder och Täby i sydost. Området var tidigare en del av Fresta socken, som 1952 blev Upplands-Väsby landskommun, och räknas i dag tillsammans med Odenslunda som en av Upplands Väsbys fem kommundelar. Historien går tillbaka till en förhistorisk by, Grimsta. År 1789 köptes den av kamreren Johan Henrik Boll, som lät bygga en herrgård. Från 1794 kallades gården Bollstanäs, och det är därifrån namnet kommer. Nästa stora förändring kom 1907, när gården köptes av Rotebro-Bollstanäs Småbruks AB, som styckade av tomter. I mitten av 1910-talet fanns ett fyrtiotal egnahem och handelsträdgårdar i Bollstanäs, och orten har sedan dess utvecklats som villa- och trädgårdsstad. Tillväxten har varit stor. År 1950 bodde knappt 1 000 personer i Bollstanäs och Odenslunda tillsammans, och i dag har kommundelen omkring 10 000 invånare. Enligt beskrivningen av orten domineras den i dag av modern villa- och radhusbebyggelse, och enligt hitta.se är husen främst byggda på 1970- och 1980-talen, med radhus, kedjehus och villor. I nordväst gränsar Bollstanäs till handelsområdet Bredden, och i området finns bland annat Bollstanäs skola, Breddenskolan och Grimstaskolan.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Upplands Väsby"},{"label":"Hustyper","value":"Radhus, kedjehus, villor"},{"label":"Byggperiod","value":"Främst 1970- och 1980-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 300"}],
    sourceLink: {"label":"Wikipedia: Bollstanäs","url":"https://sv.wikipedia.org/wiki/Bollstan%C3%A4s"},
    parentLocation: {"name":"Upplands Väsby","slug":"upplands-vasby"},
    h1Override: "Takläggare i Bollstanäs, Upplands Väsby",
    uniqueFAQ: {"question":"När byggdes husen i Bollstanäs?","answer":"Byggperiod enligt källorna: Främst 1970- och 1980-tal. Hustyper: radhus, kedjehus, villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Bollstanäs",
    lat: 59.504,
    lng: 17.927,
    nearbyLocations: ["Upplands Väsby","Norrviken"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Bollstanäs är i dag runt 40–55 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. I radhus- och kedjehusområdena är husen ofta likadana och byggda samtidigt, och taken hänger ihop med grannens. Där kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Bollstanäs och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "nora-kevinge",
    name: "Nora och Kevinge",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Nora trädgårdsstad, Kevinge och Klingsta i Danderyd, med villor från 1920-talet och framåt. Kostnadsfri takkontroll.",
    longDescription:
      "Den västra delen av kommundelen Danderyd, med Nora trädgårdsstad, Klingsta, Kevinge, Sätra och Rinkeby, ligger på mark som har brukats sedan vikingatiden. Nora gård, en knapp kilometer väster om Danderyds kyrka, nämns i skrift första gången 1310. Namnet kommer från ordet nor, ett smalt sund som fanns söder om gården, och i berget finns Norahällen, en runristning från 1000-talet. Författaren August Blanche var informator på gården sommaren 1827, och gårdens tidigare huvudbyggnad från 1700-talet kallas i dag Blanchegården. Vid Kvarnparken står fortfarande en vattenkvarn från 1700-talet. Villasamhället tog fart 1926, när bankiren Gunnar Kassman köpte Nora gård och började stycka av tomter. Utbyggnaden gick fort: 1930 hade Nora omkring 250 villor och 1 000 invånare, och egen bussförbindelse med Jarlaplan. Nora torg blev centrum för hela kommundelen, med affärer, post, bank och brandstation, fram till 1960-talet, när handeln flyttade till Mörby centrum. Längre västerut, vid Edsviken, ligger Kevinge gård. Gården tros ha varit befolkad sedan vikingatiden, och på en avsats ovanför stranden finns ett gravfält med sju stensättningar. Den nuvarande huvudbyggnaden i sten uppfördes efter 1791, och under 1800-talet gjorde justitierådet Gabriel Poppius Kevinge till en mönstergård. Hans dotter gifte sig med kemisten Jöns Jacob Berzelius, och på gårdens gamla ägor står den naturminnesförklarade Berzelii ek. Enligt hitta.se är villorna och kedjehusen i Nora främst byggda på 1920- och 1930-talen, villorna och radhusen i Kevinge på 1950- och 1960-talen, och husen i Kevinge strand på 1930- och 1980-talen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Danderyd"},{"label":"Delområden","value":"Nora trädgårdsstad, Klingsta, Kevinge, Sätra, Rinkeby"},{"label":"Hustyper","value":"Villor, kedjehus, radhus"},{"label":"Byggperiod","value":"Nora 1920–30-tal (trädgårdsstad från 1926), Kevinge 1950–60-tal, Kevinge strand 1930- och 1980-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 300"}],
    sourceLink: {"label":"Wikipedia: Nora, Danderyds kommun","url":"https://sv.wikipedia.org/wiki/Nora,_Danderyds_kommun"},
    parentLocation: {"name":"Danderyd","slug":"danderyd"},
    h1Override: "Takläggare i Nora och Kevinge, Danderyd",
    uniqueFAQ: {"question":"När byggdes husen i Nora och Kevinge?","answer":"Byggperiod enligt källorna: Nora 1920–30-tal (trädgårdsstad från 1926), Kevinge 1950–60-tal, Kevinge strand 1930- och 1980-tal. Hustyper: villor, kedjehus, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Nora och Kevinge",
    lat: 59.4,
    lng: 18.02,
    nearbyLocations: ["Danderyd","Enebyberg","Stocksund"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i området spänner över sextio år. Villorna i Nora trädgårdsstad är i dag runt 90–100 år gamla, husen i Kevinge runt 60–75 år. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. I en trädgårdsstad från 1920-talet är takens form och material ofta en viktig del av miljön, och det är värt att tänka på redan när materialet väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Nora, Kevinge eller Klingsta? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  // =================== STORSTOCKHOLM ===================
  {
    slug: "stockholm",
    name: "Stockholm",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare i Stockholm — takbyte och takrenovering i hela Stockholms kommun. Takläggare med fast pris och 10 års utförandegaranti.",
    longDescription:
      "Stockholms bebyggelse sträcker sig från medeltida tegelhus i Gamla stan till funktionalistvillor från 30-talet och moderna nybyggen i Hammarby sjöstad. Den spridda bebyggelsen innebär lika många taktyper som stadsdelar — tegeltak i innerstaden, plåttak i industriområdena och betongpannor i miljonprogramsområdena. Vi lämnar alltid fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Trånga gator, parkeringsregler och grannhänsyn gör att materialupplag, ställning och avfallshantering måste planeras i detalj.",
    uniqueFAQ: {
      question:
        "Kan ni byta tak på en fastighet i tätbebyggt område i Stockholm?",
      answer:
        "Ja, vi utför takbyten i tätbebyggda stockholmsområden där ställning, materialupplag och avfall måste planeras med hänsyn till grannar och trånga tomter. Kontakta oss så berättar vi hur vi skulle lösa ditt projekt.",
    },
    primaryKeyword: "takläggare Stockholm",
    lat: 59.3293,
    lng: 18.0686,
    nearbyLocations: ["Solna", "Nacka", "Sundbyberg"],
  },
  {
    slug: "sodermalm",
    name: "Södermalm",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare på Södermalm — takbyte och takrenovering av kulturhistoriska tak i centrala Stockholm. Bandtäckning, plåtarbeten och tegeltak med fast pris.",
    longDescription:
      "Södermalms bebyggelse präglas av 1800-talshus med branta takfall, byggnadsminnesmärkta fasader och tak med många kupor, skorstenar och genomföringar. Att byta tak på Södermalm handlar lika mycket om hantverksskicklighet som om materialval — plåtslagning runt skorstenar, bandtäckning på valmade takfall och anpassning till kulturhistoriska krav. Vi utför takprojekt på Södermalm med dubbelfalsad plåt, tegelpannor och handfalsade beslag. Alla arbeten utförs enligt AMA Hus med 10 års utförandegaranti.",
    extraContent:
      "Många fastigheter på Södermalm har tak från 1800- och tidigt 1900-tal där underliggande råspont och takstolar är kulturhistoriskt värdefulla. Vid takbyte på Södermalm bevarar vi så mycket av den befintliga konstruktionen som möjligt och byter endast det som behöver bytas. Vi kan vägleda kring kulturhistoriska krav och bygglov. Boka en kostnadsfri takkontroll så bedömer vi takets skick.",
    uniqueFAQ: {
      question: "Behöver jag bygglov för takbyte på Södermalm?",
      answer:
        "Ett takbyte med samma material och kulör kräver oftast inget bygglov, men många byggnader på Södermalm är kulturhistoriskt klassade vilket kan ställa särskilda krav på material och utförande. Vi hjälper dig kontrollera vad som gäller för din fastighet och anpassar utförandet efter eventuella kulturhistoriska krav.",
    },
    primaryKeyword: "takläggare Södermalm",
    lat: 59.3128,
    lng: 18.0726,
    nearbyLocations: ["Stockholm", "Kungsholmen", "Nacka"],
  },
  {
    slug: "ostermalm",
    name: "Östermalm",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare på Östermalm — takbyte och takrenovering av exklusiva tak i centrala Stockholm. Bandtäckning, kopparplåt och tegeltak med hög kvalitet.",
    longDescription:
      "Östermalm har en av Stockholms mest påkostade bebyggelse — stenstadspalats, grosshandlarvillor och ambassadbyggnader med tak som speglar både status och ålder. Taken här är ofta komplexa: brutna takfall, torn, balustrader och plåtdetaljer i koppar eller zink. Vi utför takbyten och takrenoveringar på Östermalm med material som matchar husens karaktär — från kopparplåt som patinerar vackert till dubbelfalsad stålplåt i klassiska kulörer. Hantverket är avgörande när taken syns från gatan.",
    extraContent:
      "På Östermalm är estetiken lika viktig som funktionen. Många fastigheter här har tak där originalmaterialet kan vara svårt att ersätta med modern standardplåt — vi hittar lösningar som bevarar utseendet med modern prestanda. Kontakta oss för en kostnadsfri konsultation.",
    uniqueFAQ: {
      question: "Arbetar ni med koppar- och zinkplåt på Östermalm?",
      answer:
        "Ja, vi arbetar med koppar, zink och förzinkad stålplåt på exklusiva tak på Östermalm. Koppar ger ett patinerat utseende som passar klassiska stenstadshus, medan zink är ett slagtåligt och elegant alternativ. Kontakta oss så diskuterar vi rätt material för din fastighet.",
    },
    primaryKeyword: "takläggare Östermalm",
    lat: 59.3359,
    lng: 18.0809,
    nearbyLocations: ["Stockholm", "Vasastan", "Södermalm"],
  },
  {
    slug: "bromma",
    name: "Bromma",
    region: "Västerort",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Bromma: trädgårdsstaden från 1913, egnahemmen i Norra Ängby och funkisvillorna i Södra Ängby. Kostnadsfri takkontroll.",
    longDescription:
      "Bromma är en närförort i Västerort i Stockholm. Wikipedia beskriver den som utmärkt bland annat av sin trädgårdsstad, läget nära innerstaden och närheten till Mälaren. Bromma var en egen socken och kommun fram till 1916, då den uppgick i Stockholms stad. Villorna kom i flera omgångar. Enligt Wikipedia började ett villaområde byggas redan på 1880-talet, när mark styckades av från Mariehälls gård. Omkring 1905 bebyggdes delar av Ulvsunda och områden kring Bromma kyrka med villor på privat initiativ. I början av 1900-talet köpte Stockholms stad de stora godsen i Bromma och började bygga trädgårdsstäder, från Äppelviken 1913 och vidare ut mot Nockeby. Under 1910-, 1920- och 1930-talen växte det som kallas Gamla Bromma trädgårdsstad fram. Äppelviken är ett exempel på den tidiga trädgårdsstaden. Stadsplanen från 1910 har enligt Wikipedia mjukt svängda gator som följer terrängen, och tomterna började upplåtas och bebyggas 1913. Villorna är individuellt utformade, uppförda av en byggmästare eller en snickare, och när stadsdelen byggdes ut under 1910- och 1920-talen fick husen olika förebilder, som faluröda bergsmansgårdar, gulpanelade herrgårdar och bruntjärade dalastugor. Norra Ängby kom till på ett annat sätt. Där byggdes enligt Wikipedia 1 320 egna hem under åren 1930–1941, trähus i ett eller två plan, som självbyggeri under stadens ledning efter typritningar. Den blivande husägaren gjorde själv en del av byggarbetet i stället för att betala en kontantinsats. Stadsplanen från 1930 har slingrande bostadsgator, och hustyperna grupperades så att ett kvarter eller en gatusträckning fick ett enhetligt utseende. Södra Ängby är en tredje sorts område: omkring 500 villor uppförda 1933–1939 i funktionalistisk arkitektur. De byggdes enligt Wikipedia av enskilda byggmästare som sålde dem nyckelfärdiga. Bebyggelsen är sedan 1987 riksintresse för kulturmiljövården.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Bromma?","answer":"Byggperiod enligt källorna: villor från 1880-talet (Mariehäll) och omkring 1905, trädgårdsstad från 1913, Norra Ängby 1930–1941, Södra Ängby 1933–1939. Hustyper: individuellt ritade villor, egnahem i trä i ett eller två plan, funktionalistiska villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Bromma",
    lat: 59.34,
    lng: 17.9397,
    nearbyLocations: ["Stockholm","Solna","Ekerö"],
    factBox: [{"label":"Kommun","value":"Stockholm (Västerort)"},{"label":"Stadsdelar som nämns","value":"Äppelviken, Norra Ängby, Södra Ängby, Ulvsunda, Bromma kyrka, Nockeby, Mariehäll"},{"label":"Hustyper","value":"Individuellt ritade villor, egnahem i trä i ett eller två plan, funktionalistiska villor"},{"label":"Byggperiod","value":"Villor från 1880-talet (Mariehäll) och omkring 1905, trädgårdsstad från 1913, Norra Ängby 1930–1941, Södra Ängby 1933–1939"}],
    sourceLink: {"label":"Wikipedia, Bromma","url":"https://sv.wikipedia.org/wiki/Bromma"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Husen i Bromma är alltså olika gamla beroende på var man bor. De tidigaste villorna i Äppelviken är i dag över hundra år, egnahemmen i Norra Ängby mellan 85 och 95 år och villorna i Södra Ängby omkring 90 år. Husens ålder säger inte hur gammalt taket är. På så gamla hus kan taket ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Två saker är värda att tänka på. I ett område där husen byggdes efter samma ritningar ser taken lika ut från gatan, men de har skötts och lagts om var för sig. Och på en individuellt ritad villa är takets form, material och detaljer en del av husets uttryck. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. I Södra Ängby, som är riksintresse, är det extra viktigt att fråga innan du väljer material eller kulör. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Bromma och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "kungsholmen",
    name: "Kungsholmen",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare på Kungsholmen — takbyte och takrenovering av bostadsrättsfastigheter och villor i centrala Stockholm. Plåtarbeten och bandtäckning.",
    longDescription:
      "Kungsholmen har en blandning av tidiga bostadsrättsfastigheter, äldre trähus och nyare bostadsområden. Taken varierar från plåttak på industribyggnader vid Riddarfjärden till tegeltak på äldre bostadshus. Vi utför takbyten, takrenoveringar och plåtarbeten på Kungsholmen för både stora bostadsrättsfastigheter och mindre villor. Vi samordnar ställning, avfall och materialleverans i den tätta innerstaden.",
    extraContent:
      "Vi ger offert som passar en bostadsrättsförenings beslutsprocess. Vi arbetar i innerstadsmiljö där hänsyn till boende och trafik är avgörande.",
    uniqueFAQ: {
      question:
        "Kan ni utföra takbyte för en bostadsrättsförening på Kungsholmen?",
      answer:
        "Ja, vi utför takbyten på bostadsrättsfastigheter på Kungsholmen. Vi ger offert anpassad för en bostadsrättsförenings beslutsprocess, och samordnar arbetet så att boende störas så lite som möjligt. Kontakta oss så presenterar vi en plan för er fastighet.",
    },
    primaryKeyword: "takläggare Kungsholmen",
    lat: 59.3325,
    lng: 18.0458,
    nearbyLocations: ["Stockholm", "Södermalm", "Vasastan"],
  },
  {
    slug: "vasastan",
    name: "Vasastan",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare i Vasastan — takbyte och takrenovering av stenstadstak i centrala Stockholm. Plåtarbeten, tegeltak och bandtäckning.",
    longDescription:
      "Vasastans stenstadskvarter har tak av tegel och plåt från tidigt 1900-tal, många med kupor, plåtrännor och intrikta beslag runt skorstenar. Att byta tak i Vasastan kräver både respekt för den kulturhistoriska bebyggelsen och modern hantverksskicklighet. Vi utför takrenoveringar och takbyten i Vasastan med material som bevarar husens karaktär — tegelpannor, dubbelfalsad plåt och handfalsade beslag. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Många tak i Vasastan har plåtbeslag och hängrännor från tidigt 1900-tal som rostat och börjar läcka. Vi gör alltid en ärlig bedömning — vi föreslår inte ett takbyte om en renovering räcker. Boka en kostnadsfri takkontroll i Vasastan.",
    uniqueFAQ: {
      question:
        "Kan ni renovera plåtbeslag och hängrännor på ett äldre tak i Vasastan?",
      answer:
        "Hängrännor byter vi. Plåtbeslag gör vi i första hand som en del av ett takbyte eller en takomläggning, så kontakta oss så tittar vi på taket. Vid den kostnadsfria takkontrollen får du en bedömning av vad som behöver göras.",
    },
    primaryKeyword: "takläggare Vasastan",
    lat: 59.343,
    lng: 18.0539,
    nearbyLocations: ["Stockholm", "Östermalm", "Kungsholmen"],
  },
  {
    slug: "skarholmen",
    name: "Skärholmen",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Skärholmen — takbyte och takrenovering i sydvästra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Skärholmen och omgivande stadsdelar har en stor andel miljonprogrambebyggelse med stora bostadshus, radhus och centrumanläggningar. Taken är ofta plåttak och papptak från 1960- och 70-talet. Vi utför takbyten och takrenoveringar i Skärholmen med material som passar både bostadshus och kommersiella fastigheter — TP20-plåt, bandtäckning och membrantak för flacka ytor. Vi hanterar stora takytor effektivt och kostnadseffektivt.",
    extraContent:
      "Stora takytor i Skärholmen, som bostadshus och centrumanläggningar, kräver noggrann planering av ställning, materialleverans och avfall. Vi tar uppdrag på både stora bostadsrättsfastigheter och kommersiella byggnader i området. För stora ytor är TP20-plåt ofta det mest kostnadseffektiva valet — snabbt att montera och lång livslängd. Kontakta oss för offert på större takprojekt i Skärholmen.",
    uniqueFAQ: {
      question: "Kan ni byta tak på stora bostadshus i Skärholmen?",
      answer:
        "Ja, vi utför takbyten på stora bostadshus och radhus i Skärholmen. Stora takytor monteras effektivt med TP20-plåt eller bandtäckning. Vi planerar ställning, material och avfall för att minimera störningar för boende. Kontakta oss för offert anpassad för er fastighet.",
    },
    primaryKeyword: "takläggare Skärholmen",
    lat: 59.2756,
    lng: 17.9097,
    nearbyLocations: ["Bromma", "Stockholm", "Botkyrka"],
  },
  {
    slug: "farsta",
    name: "Farsta",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Farsta med omnejd: småstugorna i Tallkrogen, Svedmyra och Sköndal, byggda från 1930-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Farsta är en stadsdel i Söderort i Stockholm, omkring åtta kilometer söder om innerstaden. Marken hörde till Farsta gård, som staden köpte 1912. Enligt Wikipedia började det moderna Farsta planläggas på 1940-talet och byggdes under 1950-talets senare hälft, efter en generalplan från 1955, med flerfamiljshus kring ett centrum som invigdes 1960. Villorna och småstugorna ligger i stadsdelarna runt omkring, och de är äldre än centrumet. I Tallkrogen består den övervägande delen av bebyggelsen av småhus. Enligt Wikipedia restes omkring 950 stugor där med självbyggeri fram till 1945. Olympiaområdet byggdes 1933–1934, och de flesta stugorna där hade bara två rum. Det finns ungefär tio hustyper, alla ritade av arkitekten Edvin Engström, och husen uppfördes i regi av Stockholms stads småstugebyrå. Svedmyra var obebyggt fram till 1930, så när som på några gårdar och torp. På 1930-talet öppnades en spårvagnslinje, och runt hållplatsen började småstugor byggas med självbyggeri. Wikipedia skriver att ett stort antal småhus uppfördes under 1930- och 1940-talen efter typhusritningar, och att den östra delen av stadsdelen mest är bebyggd med villor. I Sköndal fastställdes den första stadsplanen 1947. Den omfattade ett småstugeområde med omkring 160 hus för självbyggeri i stadsdelens västra del, där staden genom småstugebyrån tillhandahöll typritningar för tre varianter av stugor.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Farsta?","answer":"Byggperiod enligt källorna: tallkrogen 1933–1945, Svedmyra 1930- och 1940-talen, Sköndals småstugor efter stadsplanen 1947, Farsta centrum 1950-talets senare hälft. Hustyper: småstugor och villor byggda med självbyggeri efter typritningar. Stadsdelen Farsta: flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Farsta",
    lat: 59.2422,
    lng: 18.0919,
    nearbyLocations: ["Stockholm","Tyresö","Haninge"],
    factBox: [{"label":"Kommun","value":"Stockholm (Söderort)"},{"label":"Stadsdelar som nämns","value":"Farsta, Tallkrogen, Svedmyra, Sköndal"},{"label":"Hustyper","value":"Småstugor och villor byggda med självbyggeri efter typritningar. Stadsdelen Farsta: flerfamiljshus"},{"label":"Byggperiod","value":"Tallkrogen 1933–1945, Svedmyra 1930- och 1940-talen, Sköndals småstugor efter stadsplanen 1947, Farsta centrum 1950-talets senare hälft"}],
    sourceLink: {"label":"Wikipedia, Farsta","url":"https://sv.wikipedia.org/wiki/Farsta"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Småstugorna i Tallkrogen och Svedmyra är i dag mellan 80 och drygt 90 år gamla, och stugorna i Sköndal närmare 80 år. Husens ålder säger inte hur gammalt taket är. På hus i den åldern kan taket ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Två saker är värda att tänka på. Stugorna byggdes små. Har huset byggts till sedan dess finns det takdelar av olika ålder på samma hus, och skarven mellan dem är värd en extra titt. Och i ett område där husen byggdes efter samma typritningar ser taken lika ut från gatan, men de har skötts och lagts om var för sig. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Farsta, Tallkrogen, Svedmyra eller Sköndal och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "solna",
    name: "Solna",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Solna — takbyte, takomläggning och takrenovering med fast pris. Kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Solna har en snabbt växande bebyggelse — från äldre villor i Hagaparkens närhet till moderna bostadsområden i Arenastaden och stora kommersiella fastigheter. Taken varierar från tegeltak på äldre villor till plåttak och membrantak på nyare bostadshus. Vi utför takbyten, takomläggningar och plåtarbeten i Solna med fast pris, för både villatak och större fastigheter. Vår närhet till Stockholm gör att vi kan agera snabbt.",
    extraContent:
      "För de äldre villaområdena rekommenderar vi oftast dubbelfalsat plåt eller tegelprofilerad plåt vid omläggning. Vi lämnar alltid fast pris efter kostnadsfri takkontroll.",
    uniqueFAQ: {
      question: "Utför ni takarbeten på kommersiella fastigheter i Solna?",
      answer:
        "Ja, vi utför takbyten och takrenoveringar på både bostadsfastigheter och kommersiella byggnader i Solna, inklusive större bostadshus och verksamhetslokaler. Vi utför plåttak, membrantak och bandtäckning på stora ytor. Kontakta oss för offert på ditt projekt.",
    },
    primaryKeyword: "takläggare Solna",
    lat: 59.36,
    lng: 18.0009,
    nearbyLocations: ["Stockholm", "Sundbyberg", "Danderyd"],
  },
  {
    slug: "sundbyberg",
    name: "Sundbyberg",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Sundbyberg — takbyte och takrenovering. Takläggare med fast pris och 10 års utförandegaranti.",
    longDescription:
      "Sundbyberg är en tät kommun med en blandning av tidiga villaområden, bostadsrättsfastigheter och nyare bostadsbebyggelse kring stationerna. Många äldre villatak har betongpannor eller tegel från 50- och 60-talet som behöver omläggning. Vi utför takbyten och takrenoveringar i Sundbyberg med material som passar både äldre villor och moderna bostadshus.",
    extraContent:
      "Genom att samordna projekt kan vi hålla nere kostnaden och korta ledtiderna. Vi lämnar offert anpassad för en bostadsrättsförenings beslutsprocess.",
    uniqueFAQ: {
      question: "Kan ni samordna takbyte för flera fastigheter i Sundbyberg?",
      answer:
        "Ja, vi samordnar gärna takbyten för bostadsrättsföreningar eller grannfastigheter i Sundbyberg. Vi ger offert anpassad för en bostadsrättsförenings beslutsprocess. Kontakta oss för att diskutera ert projekt.",
    },
    primaryKeyword: "takläggare Sundbyberg",
    lat: 59.3612,
    lng: 17.9714,
    nearbyLocations: ["Solna", "Stockholm", "Danderyd"],
  },
  {
    slug: "danderyd",
    name: "Danderyd",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Danderyd — takbyte, bandtäckning och takrenovering. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Danderyd ligger strax norr om Stockholm, med Stora och Lilla Värtan i öster och Edsviken i väster. Kommunen bildades 1971 av Danderyds köping och Djursholms stad, och den består av fyra delar som alla började som villastäder: Djursholm, Stocksund, Enebyberg och Danderyd. Den som söker takläggare i Danderyd har därför nästan alltid en villa. Här går vi igenom de fyra delarna.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Danderyd?","answer":"Byggperiod enligt källorna: djursholm från 1889, Stocksund från 1890, Enebyberg från 1906 till 1940-talet, Nora från 1926. Hustyper: villor, de äldsta delarna med individuellt uppförda villor i olika stilar. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Danderyd",
    lat: 59.4044,
    lng: 18.0344,
    nearbyLocations: ["Solna","Täby","Sundbyberg"],
    factBox: [{"label":"Kommun","value":"Danderyd"},{"label":"Kommundelar","value":"Djursholm (med Ösby och Svalnäs), Stocksund, Enebyberg, Danderyd (med Nora, Klingsta, Kevinge)"},{"label":"Hustyper","value":"Villor, de äldsta delarna med individuellt uppförda villor i olika stilar"},{"label":"Byggperiod","value":"Djursholm från 1889, Stocksund från 1890, Enebyberg från 1906 till 1940-talet, Nora från 1926"}],
    sourceLink: {"label":"Wikipedia, Danderyds kommun","url":"https://sv.wikipedia.org/wiki/Danderyds_kommun"},
    extraSections: [{"heading":"Djursholm","text":"Djursholm anlades som villastad 1889. Enligt Wikipedia köpte det nybildade Djursholms AB egendomen i juni det året, och redan i oktober hade bolaget sålt 58 tomter. Den ursprungliga villastaden styckades av kring torget, vid slottet och längs stranden mot Värtan, och många av villorna i de först bebyggda delarna är uppförda på 1890-talet och under 1900-talets första årtionde. Villorna byggdes var för sig, och bebyggelsen beskrivs som en blandning av stilar. Mot norr och väster byggdes villastaden ut. I Ösby och Svalnäs började byggandet enligt Wikipedia under 1890-talets andra hälft och tog fart 1910. Vid Svalnäs styckades strandtomter för villor av från 1897."},{"heading":"Stocksund","text":"Stocksund ligger vid Lilla Värtan och Stocksundets norra strand. Stockby AB grundades 1888 och styckade av gårdens mark till tomter under namnet Stocksunds Villaparker. Den första tomten såldes 1890. Enligt Wikipedia växte samhället långsamt de första åren: vid slutet av 1905 fanns 95 villor, och 1910 hade bolaget sålt sammanlagt 350 villatomter. I Mörbyområdet, öster om Roslagsbanan, hade 94 villor uppförts 1917."},{"heading":"Enebyberg","text":"Enebyberg började som villastad 1906, när ägaren av Enebybergs gård började stycka av mark intill det som i dag är Roslagsbanan. Stadsplanen från 1923 omfattade omkring 550 tomter. Villorna byggdes först i de östra delarna längs järnvägen, och på 1930-talet växte samhället västerut. Under 1940-talet var enligt uppgifterna alla tomter bebyggda."},{"heading":"Danderyd med Nora och Kevinge","text":"I den västra delen av kommunen ligger Nora trädgårdsstad, Klingsta och Kevinge. Villasamhället tog fart 1926, när Nora gård köptes och började styckas i tomter. Utbyggnaden gick fort: 1930 hade Nora omkring 250 villor och 1 000 invånare."},{"heading":"Vad det betyder för taket","text":"Villorna i Danderyd är alltså till stor del mellan 80 och 135 år gamla. Husens ålder säger inte hur gammalt taket är. På så gamla hus kan taket ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Tre saker är värda att tänka på. - **Sammansatta tak.** Villor från 1890-talet och 1900-talets början har ofta torn, kupor, burspråk och flera takfall. Varje anslutning är en plats där vattnet ska ledas rätt, och ju fler detaljer ett tak har, desto större del av arbetet ligger i plåten. - **Takets uttryck.** På en äldre villa är takets form, material och kulör en del av husets karaktär. Det nya materialet väljs efter det gamla om huset ska behålla sitt uttryck. - **Utpekade miljöer.** Delar av kommunen har bebyggelse som kommunen har pekat ut som kulturhistoriskt värdefull. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Danderyd","text":"Vi är en takfirma med bas i Norrtälje och tar uppdrag i Danderyd. Mer om varje tjänst finns på sidorna om takbyte i Danderyd, takomläggning i Danderyd och takrenovering i Danderyd. Grannkommunerna finns på sidan Norra Stockholm."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Danderyd och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "sollentuna",
    name: "Sollentuna",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Sollentuna — takbyte, takomläggning och takrenovering med fast pris. Kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Sollentuna ligger norr om Stockholm, mellan Järfälla i väster och Danderyd och Täby i öster, med Edsviken som sträcker sig in i kommunen. Kommunen bildades 1971 ur Sollentuna köping. Den som söker takläggare i Sollentuna har ett hus i någon av kommundelarna längs järnvägen eller vid Edsviken, och de har byggts ut under olika årtionden. Här går vi igenom sju av dem.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Sollentuna?","answer":"Byggperiod enligt källorna: tomter från 1917 (Häggvik), mest 1950–1980-tal, Falkberget 1990–2000-tal, Silverdal från 2002. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Sollentuna",
    lat: 59.4289,
    lng: 17.9511,
    nearbyLocations: ["Täby","Solna","Upplands Väsby"],
    factBox: [{"label":"Kommun","value":"Sollentuna"},{"label":"Kommundelar som nämns","value":"Häggvik, Viby, Sjöberg (med Falkberget), Helenelund (Tegelhagen, Silverdal)"},{"label":"Hustyper","value":"Villor"},{"label":"Byggperiod","value":"Tomter från 1917 (Häggvik), mest 1950–1980-tal, Falkberget 1990–2000-tal, Silverdal från 2002"}],
    sourceLink: {"label":"Wikipedia, Sollentuna kommun","url":"https://sv.wikipedia.org/wiki/Sollentuna_kommun"},
    extraSections: [{"heading":"Häggvik","text":"Häggvik ligger i den centrala delen av kommunen. År 1911 avstyckades en del av gårdens ägor, mark som varken passade för odling eller för boskap, och från 1917 styckades den i tomter. Sollentuna kommun beskriver hur villabebyggelsen omkring 1960 växte in över det sista av jordbrukslandskapet i Södra Häggvik. Enligt hitta.se är husen i Häggvik mest från 1950- och 1980-talen."},{"heading":"Viby","text":"Viby, i norr, har sitt namn från ett säteri som är känt i skrift sedan 1409. Den moderna bebyggelsen växte fram när gårdens ekonomibyggnader revs på 1960-talet och ägorna började bebyggas med bostäder. Redan 1960 räknades den framväxande bebyggelsen som en egen tätort. Enligt hitta.se är husen främst byggda på 1960- och 1980-talen."},{"heading":"Sjöberg","text":"Sjöberg ligger i öster, mellan Edsviken, Rösjön och Rinkebyskogen. Här låg tidigare ett sommarstugeområde. Den nuvarande bebyggelsen i Östra och Västra Sjöberg är huvudsakligen uppförd under 1970-talet, och mot slutet av 1990-talet började Falkberget bebyggas med villor. Där är husen enligt hitta.se främst från 1990- och 2000-talen."},{"heading":"Tegelhagen och Silverdal","text":"Tegelhagen och Silverdal ligger i söder, mellan motorvägen och Edsviken, och har båda namn efter gamla torp. Bostadsområdet Tegelhagen byggdes på 1970-talet. Silverdal byggdes som en trädgårdsstad med omkring 1 000 bostäder, i etapper från 2002."},{"heading":"Norrviken, Helenelund och Rotebro","text":"- **Norrviken**, vid sjön med samma namn, började byggas som villasamhälle 1906 och fick sin station 1907. I de södra delarna byggdes egnahemsvillor framför allt under 1930- och 1940-talen. - **Helenelund**, längst i söder, fick egnahemstomter från 1918 och en järnvägshållplats 1922. Villastäderna där bebyggdes till stor del under 1920- och 1930-talen. - **Rotebro**, i norr, har villor i Gillbo och Rotsunda."},{"heading":"Vad det betyder för taket","text":"Husen i de här delarna av Sollentuna är alltså mellan ett tjugotal och omkring sjuttio år gamla, med enstaka äldre hus från tomtstyckningarnas första tid. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om, och ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. Tre saker är värda att tänka på. - **Kvarter som byggdes samtidigt.** Där ser taken lika ut från gatan, men de har skötts och lagts om var för sig. Grannens tak säger inte mycket om ditt eget. - **Sommarstugor som har ersatts eller byggts om.** Ett hus som har byggts om och till har ofta takdelar av olika ålder, och skarven mellan dem är värd en extra titt. - **Hus från olika årtionden i samma område.** I flera kommundelar står villor från 1950-talet nära hus från 1980-talet eller senare. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Sollentuna","text":"Vi är en takfirma med bas i Norrtälje och tar uppdrag i Sollentuna. Mer om varje tjänst finns på sidorna om takbyte i Sollentuna, takomläggning i Sollentuna och takrenovering i Sollentuna. Grannkommunerna finns på sidan Norra Stockholm."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Sollentuna och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "lidingo",
    name: "Lidingö",
    region: "Östra Stockholm",
    isIsland: true,
    description:
      "Takläggare på Lidingö — takbyte och takrenovering på en ö nära Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Lidingö är en ö i Stockholms inre skärgård, öster om staden, med Lilla Värtan mellan ön och fastlandet. Kommunen blev köping 1910 och stad 1926. Den som söker takläggare på Lidingö har ofta en villa i en av de villastäder som anlades i början av 1900-talet, men ön har också villaområden från 1950-talet och framåt. Här går vi igenom dem i den ordning de byggdes.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen på Lidingö?","answer":"Byggperiod enligt källorna: från 1906 (villastaden) till 1990-talet (Södra Sticklinge) och 2000–2020 (Gåshaga). Hustyper: villor från 1900-talets början, villor från 1950-talet och framåt. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Lidingö",
    lat: 59.3667,
    lng: 18.1333,
    nearbyLocations: ["Stockholm","Nacka","Danderyd"],
    factBox: [{"label":"Kommun","value":"Lidingö"},{"label":"Stadsdelar som nämns","value":"Hersby, Herserud, Brevik, Käppala, Gåshaga, Skärsätra, Mölna, Sticklinge"},{"label":"Hustyper","value":"Villor från 1900-talets början, villor från 1950-talet och framåt"},{"label":"Byggperiod","value":"Från 1906 (villastaden) till 1990-talet (Södra Sticklinge) och 2000–2020 (Gåshaga)"}],
    sourceLink: {"label":"Wikipedia, Lidingö kommun","url":"https://sv.wikipedia.org/wiki/Lidingö_kommun"},
    extraSections: [{"heading":"Villastaden från 1906","text":"Hersby, mitt på ön, utgör enligt Wikipedia kärnan i Lidingö villastad, som bildades 1906. Stadsplanen från 1907 har ett oregelbundet gatunät som är anpassat efter terrängen. Tomterna styckades stora, med boningshuset mitt på fastigheten, och i de först bebyggda kvarteren har villorna till stor del kvar sina ursprungliga exteriörer i nationalromantik och jugend. I Herserud, intill, började villatomter säljas 1906."},{"heading":"Brevik, Käppala och Gåshaga","text":"På den östra delen av södra ön ligger Brevik, Käppala och Gåshaga. Marken styckades 1906–1907 till en villastad vid segelleden, och storhetstiden kom på 1910-talet, då villor i jugendstil byggdes. Under krigen och 1930-talets depression stannade byggandet nästan helt av och kom i gång igen först på 1960-talet. Bebyggelsen i Brevik är därför en blandning av större villor från 1900-talets början och villor från 1960-talet och framåt. I Gåshaga byggdes nya villor mellan 2000 och 2020."},{"heading":"Skärsätra","text":"I Skärsätra, vid Lilla Värtan, började villorna uppföras 1909, och 1910 hade omkring 300 tomter sålts. Området ritades som ett kombinerat villa- och industrisamhälle, men villorna kom att dominera."},{"heading":"Mölna","text":"Mölna bebyggdes senare. Gårdens ägor började bebyggas huvudsakligen på 1950- och 1960-talen, sedan stadsplaner hade upprättats i omgångar med början 1953. Enligt Wikipedia sparades mycket natur mellan villaområdena."},{"heading":"Sticklinge","text":"Sticklinge, på nordvästra ön, började som ett sommarstugeområde tidigt på 1930-talet. År 1978 beslutade staden att området skulle stadsplaneras, och det bebyggdes därefter med villor för permanentboende. Södra Sticklinge byggdes i början av 1990-talet."},{"heading":"Vad det betyder för taket","text":"Villorna på Lidingö är alltså mellan ungefär 30 och 120 år gamla, beroende på var huset står. Husens ålder säger inte hur gammalt taket är. På de äldsta villorna kan taket ha lagts om flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Tre saker är värda att tänka på. - **Sammansatta tak.** Villor från det tidiga 1900-talet har ofta kupor, vinklar och flera anslutningar i plåt. Ju fler detaljer ett tak har, desto större del av arbetet ligger i plåten. - **Takets uttryck.** På en äldre villa är takets form, material och kulör en del av husets karaktär. Tre villor i Brevik är byggnadsminnen. - **Sommarstugor som har ersatts eller byggts om.** Ett hus som har byggts om och till har ofta takdelar av olika ålder, och skarven mellan dem är värd en extra titt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi på Lidingö","text":"Vi är en takfirma med bas i Norrtälje och tar uppdrag på Lidingö. Mer om tjänsten finns på sidan om takbyte på Lidingö. Fler orter i närheten finns på sidan Östra Stockholm."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du på Lidingö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "nacka",
    name: "Nacka",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Nacka — takbyte och takrenovering i östra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Nacka ligger öster om Stockholm, mellan Saltsjön i norr och Baggensfjärden i söder. Kommunen bildades 1971 av Nacka stad, Saltsjöbadens köping och Boo landskommun, och den har villaområden som har kommit till på mycket olika sätt. Den som söker takläggare i Nacka kan ha en villa från 1890-talet, ett egnahem från 1920-talet eller ett hus som började som sommarstuga. Här går vi igenom sex av områdena.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Nacka?","answer":"Byggperiod enligt källorna: från 1870-talets sommarvillor (Björknäs) och 1890-talet (Saltsjöbaden) till 2008 (södra Hedvigslund). Hustyper: arkitektritade villor, trävillor, egnahem, sommarhus och sportstugor som har blivit villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Nacka",
    lat: 59.31,
    lng: 18.1639,
    nearbyLocations: ["Stockholm","Lidingö","Värmdö"],
    factBox: [{"label":"Kommun","value":"Nacka"},{"label":"Delar som nämns","value":"Saltsjöbaden, Storängen, Björknäs, Kummelnäs, Lännersta, Älta (Kolarängen, södra Hedvigslund)"},{"label":"Hustyper","value":"Arkitektritade villor, trävillor, egnahem, sommarhus och sportstugor som har blivit villor"},{"label":"Byggperiod","value":"Från 1870-talets sommarvillor (Björknäs) och 1890-talet (Saltsjöbaden) till 2008 (södra Hedvigslund)"}],
    sourceLink: {"label":"Wikipedia, Nacka kommun","url":"https://sv.wikipedia.org/wiki/Nacka_kommun"},
    extraSections: [{"heading":"Saltsjöbaden","text":"Saltsjöbaden grundades på 1890-talet som villa- och badort. Enligt Wikipedia visar en tomtkarta från 1892 120 avstyckade tomter, och 1896 var minst 64 av dem bebyggda med villor. Villastaden växte fram mellan 1891 och 1912 och byggdes sedan ut efter andra världskriget. Stadsbilden präglas fortfarande av arkitektritade villor, och Saltsjöbaden är riksintresse för kulturmiljövården."},{"heading":"Storängen","text":"Storängen, vid Saltsjöbanan, grundades 1904 av en egnahemsförening. Den första villan började byggas samma år, och redan 1909 var 107 av omkring 160 tomter bebyggda. Villorna är stora trävillor i nationalromantisk stil, de flesta arkitektritade. Storängen är riksintresse för kulturmiljövården sedan 1987."},{"heading":"Björknäs, Kummelnäs och Lännersta","text":"I Boo, i kommunens östra del, började många områden med sommarhus. - I **Björknäs** började jordbruksmarken delas upp i tomter efter 1873, och sommarvillor byggdes. Vid sekelskiftet 1900 styckades villatomter av i de centrala delarna, och på 1920-talet bildades ett egnahemsområde. Villorna i den centrala delen byggdes enligt Wikipedia utan byggnadsplan, vilket gav en varierad bebyggelse. - **Kummelnäs** består enligt Wikipedia av villaområden som från början var sommarstugeområden. En egnahemsförening köpte mark här 1907 och planlade den med vägar och tomter, och på 1930-talet tomtindelades stora områden för sportstugor. - I **Lännersta** var egendomen 1937 styckad i 925 tomter. Enligt Wikipedia präglas bebyggelsen i dag huvudsakligen av villor från 1930-talet och framåt, med några enstaka större sommarvillor från slutet av 1800-talet och början av 1900-talet."},{"heading":"Älta","text":"I Älta, i sydväst, började marken styckas för fritidshus och villor i slutet av 1800-talet. År 1925 var enligt Wikipedia omkring 1 000 tomter bebyggda, och en stor del av husen var sommarhus. Kolarängen i norra Älta har bebyggelse huvudsakligen från 1950- till 1970-talen, och i södra Hedvigslund byggdes ett nytt område från 2008."},{"heading":"Vad det betyder för taket","text":"Husen i Nacka är alltså allt från ett tjugotal till över 130 år gamla. Husens ålder säger inte hur gammalt taket är. På de äldre husen kan taket ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Tre saker är värda att tänka på. - **Sommarhus som har blivit åretruntbostad.** De har i regel byggts om och till, och då finns det ofta takdelar av olika ålder på samma hus. Skarven mellan dem är värd en extra titt. Ett fritidshus kan också vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. - **Arkitektritade villor.** På en äldre villa är takets form, material och detaljer en del av husets uttryck, och det nya materialet väljs efter det gamla om huset ska behålla det. - **Riksintressen.** I Saltsjöbaden och Storängen är det extra viktigt att fråga innan du väljer material eller kulör. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Nacka","text":"Vi är en takfirma med bas i Norrtälje och tar uppdrag i Nacka. Mer om tjänsten finns på sidan om takbyte i Nacka. Fler orter i närheten finns på sidan Östra Stockholm."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Nacka och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "varmdo",
    name: "Värmdö",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Värmdö — takbyte och takrenovering i Stockholms södra skärgård. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Värmdö är en stor kommun som sträcker sig från tätorten Gustavsberg ut genom södra skärgården till öar som Sandhamn och Möja. Bebyggelsen varierar från villaområden till fritidshus och skärgårdsgårdar. Vi utför takbyten, takomläggningar och plåtarbeten.",
    extraContent:
      "I Gustavsberg och tätorten är det fastlandsförhållanden. Kostnadsfri takkontroll och fast pris ingår alltid.",
    uniqueFAQ: {
      question: "Tar ni er ut till öarna i Värmdö skärgård för takbyte?",
      answer:
        "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Kontakta oss så berättar vi hur vi skulle lösa ditt projekt.",
    },
    primaryKeyword: "takläggare Värmdö",
    lat: 59.3419,
    lng: 18.3839,
    nearbyLocations: ["Nacka", "Tyresö", "Stockholm"],
  },
  {
    slug: "tyreso",
    name: "Tyresö",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Tyresö — takbyte och takrenovering i södra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Tyresö sträcker sig från villabebyggelse i Bollmora till skog- och sjönära hus vid Tyresö slott och ut mot Älvudden. Bebyggelsen är en blandning av äldre villor, 70-talsradhus och nyare bostadsområden. Betongpannor kan drabbas av frostsprängning och underlagspapp torkar ut och spricker med åren, vilket är skäl till att ett tak till slut kan behöva bytas eller läggas om. Vi utför takbyten och takrenoveringar i Tyresö med både plåt och pannor, och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Tyresö finns det ofta tak nära skog och vatten där mossbildningen är kraftig. Regelbunden taktvätt kan förlänga takets liv, men när pannorna frostsprängt är omläggning bättre ekonomi. Vi bedömer alltid behovet av snörasskydd över entréer.",
    uniqueFAQ: {
      question: "Behöver mitt tak i Tyresö tvättas eller bytas?",
      answer:
        "Det avgörs av underlaget. Är pannorna hela och underlagspappen tät räcker taktvätt med biocidbehandling. Har frostsprängning börjat eller pappen torkat sönder är omläggning bättre ekonomi. Vi gör en kostnadsfri takkontroll i Tyresö och ger en ärlig rekommendation.",
    },
    primaryKeyword: "takläggare Tyresö",
    lat: 59.2433,
    lng: 18.2378,
    nearbyLocations: ["Nacka", "Haninge", "Stockholm"],
  },
  {
    slug: "haninge",
    name: "Haninge",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Haninge — takbyte och takrenovering söder om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Haninge kommun omfattar Handen, Vendelsö, Dalarö och skärgårdsöarna ut mot Ornö och Utö. Bebyggelsen är varierad — villaområden, fritidshus och skärgårdsgårdar. Vi anpassar material efter huset.",
    extraContent:
      "I tätorterna Handen och Vendelsö är det fastlandsförhållanden med villatak som behöver omläggning. Vi lämnar fast pris efter kostnadsfri takkontroll i hela kommunen.",
    uniqueFAQ: {
      question: "Arbetar ni på öarna i Haninge skärgård?",
      answer:
        "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Kontakta oss så berättar vi hur vi skulle lösa ditt projekt på ön.",
    },
    primaryKeyword: "takläggare Haninge",
    lat: 59.1739,
    lng: 18.15,
    nearbyLocations: ["Tyresö", "Nynäshamn", "Värmdö"],
  },
  {
    slug: "ekero",
    name: "Ekerö",
    region: "Sydvästra Stockholm",
    isIsland: true,
    description:
      "Takläggare på Ekerö — takbyte och takrenovering på en ö i Mälaren. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Ekerö är en ö i Mälaren med en varierad bebyggelse — från kungsgårdshistoria i Drottningholm till villor i Mälarstrand och fritidshus ut mot ön. Vi utför takbyten, takomläggningar och plåtarbeten på Ekerö. Husens ålder och skick varierar mycket mellan de olika delarna av ön, och det är därför vi alltid börjar med en kostnadsfri takkontroll på plats.",
    extraContent:
      "Vid takbyte nära kulturhistorisk bebyggelse anpassar vi material och utförande efter husens karaktär. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    uniqueFAQ: {
      question: "Vad bedömer ni vid en takkontroll på Ekerö?",
      answer:
        "Vi går igenom takmaterial, plåtdetaljer, underlagspapp och avvattning och ger dig en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris – kostnadsfritt och utan förpliktelser. Boka en kostnadsfri takkontroll så ger vi en rekommendation för ditt hus.",
    },
    primaryKeyword: "takläggare Ekerö",
    lat: 59.2789,
    lng: 17.8358,
    nearbyLocations: ["Bromma", "Stockholm", "Järfälla"],
  },
  {
    slug: "jarfalla",
    name: "Järfälla",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Järfälla — takbyte, takomläggning och takrenovering med fast pris. Kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Järfälla ligger nordväst om Stockholm, vid Mälarens östra strand, med Sollentuna i öster och Upplands-Bro i nordväst. Kommunen bildades 1971 och har fyra kommundelar. Den som söker takläggare i Järfälla har ett hus i ett villaområde som kan vara allt från ett egnahemsområde från 1910-talet till en småhusstad från 1970-talet. Här går vi igenom dem i den ordning de byggdes.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Järfälla?","answer":"Byggperiod enligt källorna: från 1904 (Stäket) och 1912 (Kallhäll) till Viksjös utbyggnad 1963–1980. Hustyper: villor, egnahem, sommarbostäder, småhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Järfälla",
    lat: 59.4189,
    lng: 17.8342,
    nearbyLocations: ["Sollentuna","Ekerö","Upplands Väsby"],
    factBox: [{"label":"Kommun","value":"Järfälla"},{"label":"Delar som nämns","value":"Barkarby och Skälby, Stäket, Kallhälls villastad (Björkliden), Jakobsberg, Viksjö"},{"label":"Hustyper","value":"Villor, egnahem, sommarbostäder, småhus"},{"label":"Byggperiod","value":"Från 1904 (Stäket) och 1912 (Kallhäll) till Viksjös utbyggnad 1963–1980"}],
    sourceLink: {"label":"Wikipedia, Järfälla kommun","url":"https://sv.wikipedia.org/wiki/Järfälla_kommun"},
    extraSections: [{"heading":"Barkarby och Skälby","text":"I Barkarby och Skälby, i söder, har villabebyggelsen sin början i 1900-talets första år, när mark köptes upp 1901 för en planerad villastad. Bara en mindre del av villorna blev byggda då. Enligt hitta.se är husen i flera av kvarteren främst byggda på 1950- och 1960-talen, med enstaka hus från 2000- och 2010-talen."},{"heading":"Stäket","text":"Stäket ligger längst i norr, vid Stäksundet. Tågen började stanna här år 1900, och de första villorna byggdes 1904 på branten öster om stationen. På 1940-talet började dagens villasamhälle i Norra Stäket att byggas. Enligt Wikipedia domineras bebyggelsen av friliggande villor och sommarbostäder. Området fördes över till Järfälla 1955."},{"heading":"Kallhälls villastad","text":"I Kallhälls villastad, som också kallas Björkliden, började tomter för egnahem styckas av 1912. Järfälla kommun beskriver i sin kulturmiljöplan bostadshus av egnahemstyp med enkel utformning, för det mesta i en våning med källare och inredd vind, på tomter som från början var stora. Enligt Wikipedia finns 210 villor här. Också det här området fördes över till Järfälla 1955."},{"heading":"Jakobsberg","text":"I Jakobsberg växte villasamhället enligt Järfälla kommun fram under 1920- och 1930-talen, när gårdens mark styckades i småbruk, trädgårdsbruk och villatomter. I västra Jakobsberg är husen enligt hitta.se främst byggda på 1950-, 1960- och 1970-talen."},{"heading":"Viksjö","text":"Viksjö byggdes ut på mycket kort tid. Exploateringen inleddes 1963, och när byggandet pågick som mest intensivt stod enligt Wikipedia ett hus klart om dagen. Folkmängden ökade från 4 992 till 12 947 mellan 1970 och 1980, och det färdiga Viksjö omfattade omkring 5 500 bostäder, varav 70 procent i småhus."},{"heading":"Vad det betyder för taket","text":"Villorna i Järfälla är alltså mellan ungefär 45 och drygt 110 år gamla, beroende på var huset står. Husens ålder säger inte hur gammalt taket är. På de äldre husen kan taket ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Tre saker är värda att tänka på. - **Egnahem som har byggts om.** Ett hus som har byggts om och till har ofta takdelar av olika ålder, och där de möts är skarven värd en extra titt. - **Småhusområden från samma år.** Där ser taken lika ut från gatan, men de har skötts och lagts om var för sig. - **Äldre miljöer.** Järfälla kommun har en kulturmiljöplan som beskriver flera av de äldre villaområdena. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Järfälla","text":"Vi är en takfirma med bas i Norrtälje och tar uppdrag i Järfälla. Mer om tjänsten finns på sidan om takbyte i Järfälla. Grannkommunerna finns på sidan Nordvästra Stockholm."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Järfälla och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "huddinge",
    name: "Huddinge",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Huddinge — takbyte och takrenovering söder om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Huddinge har en stor villabebyggelse och bostadsrättsområden i Flemingsberg, Fullregatorp och Stuvsta. Betongpannor kan drabbas av frostsprängning och underlagspapp torkar ut och spricker med åren, vilket är skäl till att ett tak till slut kan behöva bytas eller läggas om. Vi utför takbyten, takomläggningar och plåtarbeten i Huddinge med både plåttak och betongpannor.",
    extraContent:
      "I Huddinge finns det ofta villatak med betongpannor där frostsprängning börjat. Omläggning med ny papp, ny läkt och plåt är då ofta det rimliga valet. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
    uniqueFAQ: {
      question: "Vad kostar takbyte på en villa i Huddinge?",
      answer:
        "Priset för en villa i Huddinge beror på takets storlek, material och underlag, oavsett om du väljer TP20-plåt eller dubbelfalsat. Med ROT-avdrag på 30 % av arbetskostnaden. Kontakta oss för kostnadsfri takkontroll.",
    },
    primaryKeyword: "takläggare Huddinge",
    lat: 59.2375,
    lng: 17.9817,
    nearbyLocations: ["Stockholm", "Botkyrka", "Haninge"],
  },
  {
    slug: "sigtuna",
    name: "Sigtuna",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Sigtuna — takbyte och takrenovering i en av Sveriges äldsta städer. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Sigtuna är en av Sveriges äldsta städer med medeltida gaturum, tegelhus och en kulturmiljö som ställer höga krav på takläggning. Taken i centrala Sigtuna är ofta tegeltak och plåttak från tidigt 1900-tal. Vi utför takbyten, takrenoveringar och plåtarbeten i Sigtuna med respekt för den kulturhistoriska bebyggelsen — tegelpannor, dubbelfalsad plåt och handfalsade beslag.",
    extraContent:
      "I centrala Sigtuna kan bygglov och kulturhistoriska krav styra materialval och utförande. Vi hjälper dig kontrollera vad som gäller och anpassar taklösningen efter husets ålder och miljö. I Märsta och nyare områden är det standardvillatak med betongpannor eller plåt. Kostnadsfri takkontroll och fast pris ingår alltid.",
    uniqueFAQ: {
      question:
        "Finns det kulturhistoriska krav på takbyte i centrala Sigtuna?",
      answer:
        "Ja, centrala Sigtuna är en kulturhistorisk miljö där bygglov kan krävas och materialval kan vara reglerat. Vi hjälper dig kontrollera vad som gäller för din fastighet och anpassar material och utförande efter kraven. Tegelpannor och dubbelfalsad plåt i klassiska kulörer är vanliga val. Kontakta oss så vägleder vi dig.",
    },
    primaryKeyword: "takläggare Sigtuna",
    lat: 59.6167,
    lng: 17.7167,
    nearbyLocations: ["Upplands Väsby", "Täby", "Norrtälje"],
  },
  {
    slug: "upplands-vasby",
    name: "Upplands Väsby",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Upplands Väsby — takbyte, takomläggning och takrenovering med fast pris. Kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Upplands Väsby ligger mellan Stockholm och Uppsala, vid Mälarens östra strand, med Sollentuna i söder och Sigtuna i norr. E4 och järnvägen går rakt genom orten och delar den i en västlig, en central och en östlig del. Den som söker takläggare i Upplands Väsby har oftast ett hus som byggdes under årtiondena efter 1950, men kommunen har också äldre gårdar och helt nya kvarter. Här går vi igenom delarna.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Upplands Väsby?","answer":"Byggperiod enligt källorna: mest 1950–1980-tal, nyare kvarter från 1990-talet och 2009, äldre gårdar på landsbygden. Hustyper: villor, på landsbygden villor och lantbruk. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Upplands Väsby",
    lat: 59.5167,
    lng: 17.9167,
    nearbyLocations: ["Sollentuna","Sigtuna","Täby"],
    factBox: [{"label":"Kommun","value":"Upplands Väsby"},{"label":"Delar som nämns","value":"Bollstanäs, Odenslunda (med Ekeby), Vilunda, Brunnby Vik, Brunnby Park, Hammarby och Vaxmyra"},{"label":"Hustyper","value":"Villor, på landsbygden villor och lantbruk"},{"label":"Byggperiod","value":"Mest 1950–1980-tal, nyare kvarter från 1990-talet och 2009, äldre gårdar på landsbygden"}],
    sourceLink: {"label":"Wikipedia, Upplands Väsby","url":"https://sv.wikipedia.org/wiki/Upplands_Väsby"},
    extraSections: [{"heading":"Från station till förort","text":"Järnvägen mellan Stockholm och Uppsala byggdes 1863–1866, och stationen fick namnet Väsby efter slottet Stora Väsby, vars ägor banan gick över. Enligt Wikipedia var Upplands Väsby i början av 1900-talet ett litet stationssamhälle. Den första stora industrin, Väsby Werkstäder, etablerades 1903 och tillverkade mässings- och kopparrör. Landskommunen bildades 1952, och orten växte mycket snabbt kring 1970. Väsby centrum öppnade 1972, på det som dessförinnan var åkermark."},{"heading":"Östra Väsby","text":"Öster om E4 ligger Bollstanäs och Odenslunda. Bollstanäs har sitt namn efter en herrgård från slutet av 1700-talet. År 1907 började tomter styckas av, och i mitten av 1910-talet fanns ett fyrtiotal egnahem och handelsträdgårdar. Enligt hitta.se är husen där i dag främst byggda på 1970- och 1980-talen. I Odenslunda är husen från 1950- och 1960-talen i den södra delen och från 1960- och 2000-talen i den norra, och vid Ekebyvägen ligger villor från 1990- och 2000-talen."},{"heading":"Centrala och västra Väsby","text":"I Vilunda är husen kring Vilundavägen enligt hitta.se från 1960- och 1970-talen. I Brunnby Vik är husen från 1960- och 1970-talen, och intill ligger Brunnby Park, som har byggts från 2009 med omkring 150 hus."},{"heading":"Landsbygden","text":"I Hammarby och Vaxmyra finns villor och lantbruk, och kring Hammarby kyrkväg står enligt hitta.se hus från 1700-talet och sekelskiftet 1900."},{"heading":"Vad det betyder för taket","text":"Husen i Upplands Väsby är alltså till stor del mellan 40 och 75 år gamla, med äldre gårdar på landsbygden och nya hus i de senast byggda kvarteren. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om, och ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. Tre saker är värda att tänka på. - **Kvarter som byggdes samtidigt.** Där ser taken lika ut från gatan, men de har skötts och lagts om var för sig. Grannens tak säger inte mycket om ditt eget. - **Kvarter som har byggts ut i omgångar.** I flera delar står hus från olika årtionden nära varandra, till exempel från 1960-talet och 2000-talet i samma område. - **Gårdar med flera tak.** På en gård finns ofta fler tak än bostadshusets, till exempel uthus och bodar, som det kan löna sig att titta på vid samma tillfälle. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."},{"heading":"Det här gör vi i Upplands Väsby","text":"Vi är en takfirma med bas i Norrtälje och tar uppdrag i Upplands Väsby. Mer om tjänsten finns på sidan om takbyte i Upplands Väsby. Grannkommunerna finns på sidan Norra Stockholm."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Upplands Väsby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "nynashamn",
    name: "Nynäshamn",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Nynäshamn — takbyte och takrenovering i kustläge söder om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Nynäshamn ligger längst söderut i Stockholms län med direktkontakt med öppet hav. Bebyggelsen varierar från villor i tätorten till fritidshus ut mot kusten. Vi utför takbyten, takrenoveringar och plåtarbeten i Nynäshamn.",
    extraContent:
      "Vi ökar infästningstätheten vid takfot, nock och gavlar utöver standard. Kostnadsfri takkontroll och fast pris ingår alltid.",
    uniqueFAQ: {
      question: "Vilket takmaterial passar kustläget i Nynäshamn?",
      answer:
        "Vilket material som passar beror på huset och läget. Boka en kostnadsfri takkontroll så ger vi en rekommendation för ditt hus och läge.",
    },
    primaryKeyword: "takläggare Nynäshamn",
    lat: 58.9039,
    lng: 17.9519,
    nearbyLocations: ["Haninge", "Tyresö", "Stockholm"],
  },
  // ---- Västerort ----
  {
    slug: "hasselby",
    name: "Hässelby",
    region: "Västerort",
    isIsland: false,
    description: "Takbyte och takomläggning i Hässelby villastad, Backlura och Johannelund, med villor från 1900-talet och radhus från 1970-talet. Kostnadsfri takkontroll.",
    longDescription: "Hässelby villastad är Stockholms västligaste stadsdel och gränsar till Hässelby strand, Hässelby gård, Vinsta, Kälvesta, Järfälla och, över Mälaren, Ekerö. Området var i stort sett obebyggt fram till slutet av 1800-talet, med bara gårdarna Riddersvik och Lövsta. Stockholms stad köpte egendomarna 1885 och byggde en sopstation vid Mälaren, som togs i bruk 1889, samtidigt som Spånga–Lövsta järnväg öppnade. De som arbetade vid anläggningen behövde bostäder. Staden byggde två kaserner 1892, och ägaren till Hässelby slott, greve Carl Trolle-Bonde, arrenderade ut tomter till arbetarna. År 1900 började han sälja tomter genom AB Hässelby Egendom, både till arbetare och till trädgårdsmästare, som lockades av god tillgång på gödsel. Enligt Wikipedia präglade handelsträdgårdarna med sina drivbänkar och växthus stadsdelen under större delen av 1900-talet. Från 1910 erbjöds också byggnation av villor och sommarhus på mindre tomter. Orten, som tidigare kallades Riddersvik, blev municipalsamhälle 1913 och egen köping 1926, samma år som den första stadsplanen togs fram. Löfsta Handelsförening, bildad 1898, beskrivs som den första konsumföreningen i Storstockholm. Hässelby villastad införlivades med Stockholms stad 1949. På 1950-talet såldes många handelsträdgårdar till byggföretag, och marken bebyggdes med bostäder. Persontrafiken på järnvägen upphörde 1956, och soptågen, kallade Silverpilen, gick fram till 1970. Enligt alla.csv omfattar området också Backlura, med radhus och kedjehus från 1970-talet, Johannelund, Loviselund och Hässelby södra villastad.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Hässelby?","answer":"Byggperiod enligt källorna: villor från 1900, radhus/kedjehus 1970-tal (Backlura). Hustyper: villor, radhus, kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Hässelby",
    lat: 59.3764,
    lng: 17.8667,
    nearbyLocations: ["Vällingby","Kälvesta","Bromma"],
    factBox: [{"label":"Kommun","value":"Stockholm (Hässelby-Vällingby)"},{"label":"Delområden","value":"Hässelby villastad, Backlura, Johannelund, Loviselund, Hässelby södra villastad"},{"label":"Hustyper","value":"Villor, radhus, kedjehus"},{"label":"Byggperiod","value":"Villor från 1900, radhus/kedjehus 1970-tal (Backlura)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 4 760 (Områdesfakta 2025)"}],
    sourceLink: {"label":"Wikipedia: Hässelby villastad","url":"https://sv.wikipedia.org/wiki/H%C3%A4sselby_villastad"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Hässelby villastad",
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Hässelby villastad står hus från hela 1900-talet nära varandra. De äldsta villorna är över hundra år gamla, efterkrigstidens villor runt 60–75 år och radhusen och kedjehusen i Backlura runt 50 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I radhus- och kedjehusområdena, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Hässelby villastad eller Backlura? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "vallingby",
    name: "Vällingby",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Vällingby — takbyte och takrenovering i västra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vällingby växte fram som en av Europas mest uppmärksammade ABC-städer på 1950-talet, med en blandning av centrumanläggning, bostadshus och villabebyggelse. Taken i Vällingby speglar denna period — plåttak och tegeltak från 50- och 60-talet. Vi utför takbyten, takomläggningar och plåtarbeten i Vällingby med material valt för den äldre bebyggelsens karaktär. Betongpannor kan drabbas av frostsprängning och underlagspapp kan torka och spricka med åren.",
    extraContent:
      "I Vällingby finns det ofta tak från 50- och 60-talet där omläggning med ny papp, ny läkt och plåt är ofta det rimliga valet. För bostadsrättsfastigheterna runt centrum planerar vi ställning och avfall så att boende störas minimalt. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
    uniqueFAQ: {
      question: "Vad kostar takbyte på en villa i Vällingby?",
      answer:
        "Priset för en villa i Vällingby beror på takets storlek, material och underlagets skick, oavsett om du väljer TP20-plåt eller dubbelfalsat. Med ROT-avdrag på 30 % av arbetskostnaden. Kontakta oss för kostnadsfri takkontroll och fast pris.",
    },
    primaryKeyword: "takläggare Vällingby",
    lat: 59.3819,
    lng: 17.8747,
    nearbyLocations: ["Hässelby", "Bromma", "Spånga"],
  },
  {
    slug: "spanga",
    name: "Spånga",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Spånga — takbyte och takrenovering i västra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Spånga har en småortskaraktär med ursprunglig bebyggelse från tidigt 1900-tal, blandat med nyare villaområden och radhus. Taken varierar från äldre tegeltak på ursprungliga torp och villor till plåttak på 70-talsbebyggelse. Vi utför takbyten och takrenoveringar i Spånga med material som bevarar småortens karaktär.",
    extraContent:
      "I Spånga bevarar vi gärna ursprungliga takdetaljer när de finns — tegelpannor och handfalsade plåtbeslag på de äldsta husen. Vid omläggning lägger vi ny underlagspapp, ny läkt och plåt eller pannor efter husets stil. Vi bedömer alltid behovet av snörasskydd över entréer. Kostnadsfri takkontroll och fast pris ingår.",
    uniqueFAQ: {
      question: "Kan ni bevara originalets tegeltak vid takbyte i Spånga?",
      answer:
        "Ja, på de äldre husen i Spånga kan vi lägga tegelpannor som matchar originalet, eller välja tegelprofilerad plåt för ett tegelliknande utseende till lägre kostnad. Vi bevarar detaljer som vindskivor och plåtbeslag när de går att renovera. Boka en kostnadsfri takkontroll så bedömer vi vad som passar ditt hus.",
    },
    primaryKeyword: "takläggare Spånga",
    lat: 59.3789,
    lng: 17.9181,
    nearbyLocations: ["Hässelby", "Bromma", "Vällingby"],
  },
  // ---- Sydöstra Stockholm ----
  {
    slug: "vendelso",
    name: "Vendelsö",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Vendelsö och Norrby i norra Haninge, där villorna började byggas på Vendelsö gårds ägor omkring 1908. Kostnadsfri takkontroll.",
    longDescription:
      "Vendelsö ligger i norra Haninge, öster om Drevviken och söder om Gudöån och Långsjön, som bildar gräns mot Tyresö kommun. Den tidigare kommundelen är i dag uppdelad i Norrby, Vendelsö-Gudö och Vendelsömalm. Enligt Wikipedia gränsar Vendelsö-Gudö mot Norrby i väster, Vendelsömalm i söder och Tyresta nationalpark i öster, och kommundelens centrum ligger vid Sågen. Allt utgår från Vendelsö gård. Namnet är belagt 1460, och 1467 sålde Tyska orden egendomen till Erik Axelsson (Tott). Vendelsö blev säteri före 1610. Huvudbyggnaden, ett timrat envåningshus i karolinsk stil från slutet av 1600-talet, är enligt Wikipedia ett dokumenterat verk av arkitekten Mathias Spihler. Gården låg på en udde i Drevviken och nåddes från öster på dagens Vendelsö gårdsväg och från söder genom en omkring 600 meter lång allé, dagens Vendelsö allé. Omkring 1908 började Mellersta Sveriges Egnahems AB stycka gårdens ägor för villor och fritidshus. Villaområdet växte fram med affär, skola, handelsträdgårdar, bageri och en telefonstation som öppnade 1909, och 1921 invigdes busslinjen mellan Vendelsö och Enskede. Jordbruket lades ner på 1910-talet, och Österhaninge landskommun drev folkskola i huvudbyggnaden fram till 1939. Huvudbyggnaden revs 1984, och 1998 uppfördes ett bostadsområde på platsen, med namn efter gården. Den södra flygeln finns kvar som bygdegård, och i gårdens gamla park vid stranden ligger Gårdens bad. Norrby, söder om Drevviken, har enligt Wikipedia en småskalig karaktär, med bitvis mycket kuperat landskap, lummighet och gles bebyggelse. Ängspartier finns kvar efter jordbruket vid Östra Täckeråkers gård, och på Norrby gärde står Norrbystenen, en runsten från 1000-talet. Ett planprogram för Norrby antogs 2010, och planarbete för tätare bebyggelse pågår sedan 2017.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Haninge" },
      { label: "Delområden", value: "Norrby, Vendelsö gård" },
      { label: "Hustyper", value: "Villor, inslag av radhus och kedjehus" },
      { label: "Byggperiod", value: "Avstyckning för villor och fritidshus från omkring 1908, bostadsområdet vid gården 1998" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 650" },
    ],
    sourceLink: { label: "Wikipedia: Vendelsö gård", url: "https://sv.wikipedia.org/wiki/Vendels%C3%B6_g%C3%A5rd" },
    parentLocation: { name: "Haninge", slug: "haninge" },
    h1Override: "Takläggare i Vendelsö, Haninge",
    uniqueFAQ: {
      question: "När byggdes husen i Vendelsö och Norrby?",
      answer:
        "Byggperiod enligt källorna: avstyckning för villor och fritidshus från omkring 1908, med ett senare bostadsområde vid gården från 1998. Hustyper: villor, med inslag av radhus och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Vendelsö",
    lat: 59.1397,
    lng: 18.2006,
    nearbyLocations: ["Vega", "Haninge", "Tyresö"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Här har det byggts i mer än hundra år, från de första avstyckningarna omkring 1908 till bostadsområdet vid gården från 1998, och Norrby planeras nu för fler hus. De äldsta villorna är alltså över hundra år gamla, medan andra hus är byggda långt senare. Taken kan redan ha lagts om, på de äldsta husen flera gånger, och husets ålder säger därför lite om takets skick. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. Tomterna styckades för både villor och fritidshus. Har ett mindre hus byggts till i omgångar finns ofta takdelar från olika tider på samma hus, och skarvarna mellan dem, ränndalar och anslutningar mot vägg, är de ställen som behöver ses över först. På kuperade och lummiga tomter, som i Norrby, hamnar löv och barr lätt i hängrännor och ränndalar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Vendelsö eller Norrby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "vega",
    name: "Vega",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Vega — takbyte och takrenovering i Haninge kommun. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vega är ett expansivt bostadsområde i Haninge kommun, med nyare villor, radhus och bostadsrättsfastigheter. Taken är modernare men ställs likväl krav på avvattning, ventilation och snörasskydd enligt svenska normer. Vi utför takbyten, takomläggningar och plåtarbeten i Vega med material valt för lång livslängd. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "För nyare hus i Vega rekommenderar vi ofta TP20-plåt eller dubbelfalsad plåt med hög korrosionsklass — slitstarkt och lågt underhåll. Vi bedömer alltid behovet av snörasskydd över entréer och garageramp. Vi hjälper dig välja material utifrån takets lutning och exponering.",
    uniqueFAQ: {
      question: "Vilket takmaterial passar bäst för ett nyare hus i Vega?",
      answer:
        "För nyare hus i Vega är TP20-plåt eller dubbelfalsad plåt med hög korrosionsklass ofta bäst. Valet styrs av takets lutning och exponering. Vi ger en rekommendation anpassad till ditt hus vid kostnadsfri takkontroll.",
    },
    primaryKeyword: "takläggare Vega",
    lat: 59.1597,
    lng: 18.1997,
    nearbyLocations: ["Vendelsö", "Haninge", "Tyresö"],
  },
  // ---- Södra Stockholm ----
  {
    slug: "alvsjo",
    name: "Älvsjö",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte i Älvsjö villastad, Stockholm, där villatomterna styckades 1908 och 1911 och stadsplanen kom 1921. Kostnadsfri takkontroll.",
    longDescription:
      "Älvsjö är en stadsdel i Söderort i Stockholm. Den gränsar enligt Wikipedia till Långsjö, Långbro, Solberga, Liseberg, Örby slott, Örby och Hagsätra, och till Snättringe i Huddinge kommun. Namnet skrevs Elffuesio år 1461. Efterleden syftar på Brännkyrkasjön, som låg öster om Älvsjö gård och som sedan dess har dikats ut. Villorna kom med järnvägen. En provisorisk hållplats fanns från 1864, och den 1 november 1879 öppnade Älvsjö station. Åren 1908 och 1911 köpte AB Hem på landet stora delar av gårdens marker och styckade dem till villatomter. Den första stadsplanen ritades av Per Olof Hallman och fastställdes 1921. Enligt Stockholms stads vägledning Varsam utveckling byggde Hallmans plan för Älvsjö villastad på samma grundprinciper som hans planer för de tidiga trädgårdsstäderna, och Älvsjö hörde till de stationssamhällen som fick egen förvaltning som municipalsamhälle. Staden beskriver villastäderna från den här tiden som fritt liggande hus i trädgårdar, med avstånd till tomtgränsen och med en grön förgård mot gatan. Tomterna var från början 1 500–3 000 kvadratmeter. När nya planer gjordes på 1930-talet blev de mindre, 700–1 000 kvadratmeter, och senare har hus tillkommit på avstyckade tomter kring 600 kvadratmeter. Staden nämner Älvsjö bland de stadsdelar där äldre stadsplaner medger stora byggrätter och där förtätningen har tagit ny fart under 2010-talet. Stadsdelen bildades 1932. Det sista av gårdens mark, utom parken och huvudbyggnaden, såldes till Stockholms stad 1930, och gatunamn som Johan Skyttes väg, Lagerbielkes väg och Fru Marias väg minner om gårdens tidigare ägare.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Hägersten-Älvsjö)"},{"label":"Hustyper","value":"Villor (staden: fritt liggande hus i trädgårdar, senare kompletterade på avstyckade tomter)"},{"label":"Byggperiod","value":"Villatomter styckade 1908 och 1911, stadsplan 1921, senare förtätning"},{"label":"Småhus","value":"214, varav 191 med äganderätt (164 bostäder i flerbostadshus)"}],
    sourceLink: {"label":"Stockholms stad: Varsam utveckling (villastäderna)","url":"https://vaxer.stockholm/siteassets/stockholm-vaxer/tema/stockholms-arkitektur/varsam-utveckling-ta.pdf"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Älvsjö, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Älvsjö?","answer":"Byggperiod enligt källorna: villatomter styckade 1908 och 1911, stadsplan 1921, senare förtätning på avstyckade tomter. Hustyper: villor i villastaden, senare kompletterade på avstyckade tomter. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Älvsjö",
    lat: 59.3019,
    lng: 18.0019,
    nearbyLocations: ["Stockholm", "Huddinge", "Enskede"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Hus som byggdes på de första tomterna efter 1908 är i dag över 110 år gamla, och hus från tiden kring stadsplanen 1921 är runt 100 år. Taken kan redan ha lagts om, på de tidigaste villorna kanske flera gånger, och husets ålder säger därför lite om takets skick. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. I ett område där tomter har delats i omgångar kan grannhusen vara byggda med många årtiondens mellanrum. Två tak på samma gata kan därför behöva helt olika åtgärder, och det går inte att dra slutsatser från grannens tak till det egna. I lummiga trädgårdar samlas löv i hängrännor och ränndalar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Älvsjö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "enskede",
    name: "Enskede",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Gamla Enskede, trädgårdsstaden i Söderort som i huvudsak stod färdig 1913. Kostnadsfri takkontroll.",
    longDescription:
      "Gamla Enskede är en stadsdel och trädgårdsstad i Söderort i Stockholm. Fram till slutet av 1800-talet var området en lantlig del av Brännkyrka socken, med åkermark som hörde till Enskede gård. Stockholms stad köpte gårdens kvarvarande 606 hektar 1904 och planerade marken för egnahem. Stadsplanen från 1907 ritades av Per Olof Hallman, och den 26 juni 1908 togs det första spadtaget. Tanken var enligt Wikipedia att vanliga människor skulle kunna skaffa sig ett hus med två rum och kök, källare och trädgård. Den som köpte en tomt kunde bygga ett helt eget hus eller välja något av de typhus som Stockholms lantegendomsnämnd hade tagit fram. Ett av dem, typhus IV, kallas Enskedestugan och är ett friliggande trähus i en och en halv våning. Från början skulle stadsdelen till stor del bestå av radhus längs de svängda gatorna, men intresset var svalt, och i Hallmans bearbetade plan från 1922 fanns bara de sex längorna vid Margaretavägen kvar. De byggdes 1908–1909 efter ritningar av Victor Bodin, omfattar 37 fastigheter och är blåmärkta av Stadsmuseet i Stockholm. Enligt Wikipedia stod området i huvudsak färdigt redan 1913 och utgörs främst av parhus och enfamiljshus. På 1930- och 1940-talen byggdes Svampområdet söder om Sockenvägen med småhus, nästan alla ritade av arkitekten Edvin Engström. I östra delen av stadsdelen ligger Dalen, ett bostadsområde med 280 radhus och 20 flerfamiljshus som stod färdigt 1982.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Enskede-Årsta-Vantör)" },
      { label: "Hustyper", value: "Parhus och enfamiljshus, radhus vid Margaretavägen och i Dalen, småhus i Svampområdet" },
      { label: "Byggperiod", value: "1908–1913 (i huvudsak färdigt 1913), Svampområdet 1930–1940-tal, Dalen färdigt 1982" },
      { label: "Ägda småhus (avrundat)", value: "Ca 900" },
    ],
    sourceLink: { label: "Wikipedia: Gamla Enskede", url: "https://sv.wikipedia.org/wiki/Gamla_Enskede" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Gamla Enskede, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Gamla Enskede?",
      answer:
        "Byggperiod enligt källorna: 1908–1913 (i huvudsak färdigt 1913), Svampområdet 1930- till 1940-talet och Dalen färdigt 1982. Hustyper: parhus och enfamiljshus, med radhus vid Margaretavägen och i Dalen. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Enskede",
    lat: 59.2917,
    lng: 18.0867,
    nearbyLocations: ["Stockholm", "Älvsjö", "Skarpnäck", "Enskede gård", "Enskedefältet"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen i trädgårdsstadens första del är i dag runt 115 år gamla, småhusen i Svampområdet mellan knappt 80 och drygt 90 år och radhusen i Dalen runt 45 år. På hus som har stått i över hundra år kan taken redan ha lagts om, kanske mer än en gång, och därför säger husets ålder lite om hur taket mår. Det går bara att avgöra på plats, där underlag, plåtdetaljer, skorstensanslutningar och hängrännor syns. På parhus och radhus hänger taket ihop med grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. Stadsmuseet har inventerat stadsdelens byggnader och gett nio anläggningar blå märkning och ett stort antal grön märkning. Den som tänker byta material eller kulör på ett sådant hus bör ta reda på vad som gäller innan arbetet planeras. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Gamla Enskede och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "skarpnack",
    name: "Skarpnäck",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Skarpnäcks trädgårdsstad och Pungpinan, småstugeområden från 1920-talet. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Skarpnäcks gård är en stadsdel i Söderort i Stockholm. Den gränsar bland annat till Sköndal, Gubbängen, Gamla Enskede, Enskededalen, Kärrtorp och Bagarmossen och bildades 1963 av de tidigare stadsdelarna Pungpinan och Skarpnäck. Småhusen ligger i den norra delen. Längre söderut, på det gamla flygfältet, byggdes Skarpnäcksstaden med 3 400 lägenheter från mitten av 1980-talet. Säteriet Skarpnäck bildades 1660, och gårdens nuvarande huvudbyggnad uppfördes 1865–1867. Stockholms stad köpte egendomen 1922. Redan året därpå ritade Per Olof Hallman den första stadsplanen, med småhus kring Riksrådsvägen och Kanslervägen. Området fick namnet Skarpnäcks trädgårdsstad. Lite längre söderut ligger Pungpinan, uppkallat efter ett torp som i sin tur har namn efter en krog som fanns här från 1600-talet till 1800-talet. Här började småstugor byggas 1927. Enligt Wikipedia hörde Pungpinan till de områden där Stockholms stads småstugebyrå först organiserade självbyggeri: samma år sattes 200 stugor i gång här och i Olovslund i Västerort. I dag finns enligt Wikipedia omkring 240 stugor, och Pungpinan redovisas i Stockholms översiktsplan som värdefull kulturmiljö av riksintresse. Radhusen kom senare. Kring Riksrådsvägen uppfördes drygt hundra radhus 1953–1956 efter ritningar av Léonie och Charles-Edouard Geisendorf, i starkt kuperad terräng där längorna enligt Wikipedia grupperades kring fyra gröna gårdar. Stadsmuseet har blåklassat området. I början av 1960-talet byggdes fler radhus vid Nämndemansbacken och Sekreterarbacken, ritade av Höjer & Ljungqvist, och 2009 tillkom kedjehus längs Gamla Tyresövägen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Skarpnäck)"},{"label":"Delområden","value":"Skarpnäcks trädgårdsstad, Pungpinan, Riksrådsvägen, Nämndemansbacken och Sekreterarbacken"},{"label":"Hustyper","value":"Småstugor och småhus, radhus, kedjehus"},{"label":"Byggperiod","value":"Stadsplan 1923, Pungpinan från 1927, radhus 1953–1956 och tidigt 1960-tal, kedjehus 2009"},{"label":"Bostäder med äganderätt i RegSO (avrundat)","value":"Ca 480 (SCB, 2025)"}],
    sourceLink: {"label":"Wikipedia: Skarpnäcks gård (stadsdel)","url":"https://sv.wikipedia.org/wiki/Skarpn%C3%A4cks_g%C3%A5rd_(stadsdel)"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Skarpnäck, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Skarpnäck?","answer":"Byggperiod enligt källorna: stadsplan 1923, Pungpinan från 1927, radhus 1953–1956 och tidigt 1960-tal, kedjehus 2009. Hustyper: småstugor och småhus, radhus och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Skarpnäck",
    lat: 59.2731,
    lng: 18.1219,
    nearbyLocations: ["Stockholm", "Enskede", "Farsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Här finns småhus från fyra skeden. Husen i trädgårdsstaden och Pungpinan byggdes från 1920-talet och är i dag uppemot 100 år gamla, radhusen vid Riksrådsvägen är runt 70 år, 1960-talets radhus drygt 60 år och kedjehusen från 2009 under 20 år. På de tidigaste husen kan taket ha lagts om mer än en gång, och husets ålder avgör därför inte hur taket mår i dag. På radhus och kedjehus hänger taken ihop med grannens, och ett arbete på en del av längan behöver anslutas så att det fungerar mot nästa. I miljöer som är utpekade som kulturhistoriskt värdefulla är det klokt att ta reda på vad som gäller innan material eller kulör väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Skarpnäcks trädgårdsstad eller Pungpinan och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  // ---- Sydvästra Stockholm ----
  {
    slug: "botkyrka",
    name: "Botkyrka",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Botkyrka — takbyte och takrenovering sydväst om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Botkyrka kommun omfattar Tumba, Tullinge och Fittja, med stor andel miljonprogrambebyggelse och villaområden. Taken är ofta plåttak och papptak från 1960- och 70-talet. Vi utför takbyten och takrenoveringar i Botkyrka med material som passar både bostadshus och villor — TP20-plåt, bandtäckning och membrantak för flacka ytor. Vi hanterar stora takytor effektivt.",
    extraContent:
      "Stora takytor i Botkyrka, som bostadshus i Tumba och Fittja, kräver noggrann planering av ställning, materialleverans och avfall. Vi tar uppdrag på både bostadsrättsfastigheter och villor. För stora ytor är TP20-plåt ofta det mest kostnadseffektiva valet — snabbt att montera och lång livslängd.",
    uniqueFAQ: {
      question: "Kan ni byta tak på stora bostadshus i Botkyrka?",
      answer:
        "Ja, vi utför takbyten på bostadsrättsfastigheter och radhus i Botkyrka. Stora takytor monteras effektivt med TP20-plåt eller bandtäckning. Vi planerar ställning, material och avfall för att minimera störningar för boende. Kontakta oss för offert och tidsplan.",
    },
    primaryKeyword: "takläggare Botkyrka",
    lat: 59.2497,
    lng: 17.8347,
    nearbyLocations: ["Huddinge", "Salem", "Södertälje"],
  },
  {
    slug: "salem",
    name: "Salem",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Salem — takbyte och takrenovering sydväst om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Salem är en liten kommun vid sjön Bornsjön med villabebyggelse i Rönninge och Salem. Taken är ofta villatak med betongpannor eller plåt från 70- och 80-talet. Vi utför takbyten och takrenoveringar i Salem och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Salems sjönära villor rekommenderar vi material med hög korrosionsklass på plåt och noggrann hantering av ventilation och underlagspapp. Vid omläggning lägger vi ny papp, ny läkt och plåt eller pannor. Vi hjälper dig jämföra totalkostnad över 30 år.",
    uniqueFAQ: {
      question: "Ställer Salems sjönära läge särskilda krav på takmaterial?",
      answer:
        "Salem ligger vid sjön Bornsjön vilket ger fuktigare luft. Vi rekommenderar plåt med hög korrosionsklass och noggrann hantering av ventilation och underlagspapp. Dubbelfalsad plåt och tegelprofilerad plåt är bra val. Boka en kostnadsfri takkontroll så ger vi en rekommendation för ditt hus.",
    },
    primaryKeyword: "takläggare Salem",
    lat: 59.2214,
    lng: 17.7836,
    nearbyLocations: ["Botkyrka", "Södertälje", "Huddinge"],
  },
  {
    slug: "sodertalje",
    name: "Södertälje",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Södertälje — takbyte och takrenovering sydväst om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Södertälje är en industri- och hamnstad vid Södertäljeviken och Mälaren, med en blandning av innerstadsbebyggelse, villaområden och bostadsrättsfastigheter. Taken varierar från tegeltak i centrum till plåttak på industribyggnader. Vi utför takbyten, takomläggningar och plåtarbeten i Södertälje för både villatak och större fastigheter. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Vi bedömer behovet av snörasskydd och ser till att taksäkerheten uppfyller svenska krav.",
    uniqueFAQ: {
      question: "Utför ni takarbeten på industribyggnader i Södertälje?",
      answer:
        "Ja, vi utför takbyten och takrenoveringar på både bostadsfastigheter och kommersiella byggnader i Södertälje, inklusive industri- och hamnbyggnader. Vi utför plåttak, membrantak och bandtäckning på stora ytor. Kontakta oss för offert på ditt projekt.",
    },
    primaryKeyword: "takläggare Södertälje",
    lat: 59.1955,
    lng: 17.6253,
    nearbyLocations: ["Salem", "Botkyrka", "Ekerö"],
  },
  // ---- Nordvästra Stockholm ----
  {
    slug: "upplands-bro",
    name: "Upplands-Bro",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Upplands-Bro — takbyte och takrenovering nordväst om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Upplands-Bro kommun omfattar Kungsängen, Bro och Brunna, med villabebyggelse och bostadsrättsområden i ett sjö- och skogsnära läge. Taken varierar från betongpannor på 70-talsvillor till plåttak på nyare hus. Vi utför takbyten, takomläggningar och plåtarbeten i Upplands-Bro. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Upplands-Bro finns det ofta villatak där omläggning med ny papp, ny läkt och plåt är ofta det rimliga valet. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag. Vi bedömer alltid behovet av snörasskydd över entréer.",
    uniqueFAQ: {
      question: "När bör jag byta tak i Upplands-Bro?",
      answer:
        "Tecken på att det är dags: frostsprängda betongpannor, sliten underlagspapp, mossa som inte går bort vid tvätt eller rostiga plåtbeslag. Boka en kostnadsfri takkontroll så bedömer vi takets skick på ditt hus.",
    },
    primaryKeyword: "takläggare Upplands-Bro",
    lat: 59.4347,
    lng: 17.6333,
    nearbyLocations: ["Järfälla", "Sigtuna", "Sollentuna"],
  },

  {
    slug: "hammarby-sjostad",
    name: "Hammarby Sjöstad",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare i Hammarby Sjöstad — takbyte och takrenovering i Hammarby Sjöstad. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Hammarby Sjöstad är modern sjönära stadsdel med flacka tak och stora takterrasser. Bebyggelsen består till stor del av moderna flerbostadshus med papp-, duk- och plåttak från 2000-talet. Vi utför takbyte, takrenovering och takomläggning i Hammarby Sjöstad med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll och ett fast pris. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Hammarby Sjöstad — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Hammarby Sjöstad.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Hammarby Sjöstad?",
      answer:
        "Priset för ett takbyte i Hammarby Sjöstad beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Hammarby Sjöstad",
    lat: 59.3033,
    lng: 18.0947,
    nearbyLocations: ["Södermalm", "Årsta", "Enskede"],
  },
  {
    slug: "liljeholmen",
    name: "Liljeholmen",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare i Liljeholmen — takbyte och takrenovering i Liljeholmen. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi utför takbyte och takomläggning i Liljeholmen, tät stadsdel i södra innerstaden med blandad bebyggelse. Bebyggelsen består till stor del av bostadsrättsfastigheter från 1930-tal blandat med nyproduktion, och de skador vi oftast hittar vid takkontroll är spröd underlagspapp, rostiga beslag och otäta genomföringar kring skorsten och ventilation. Vi går igenom hela takkonstruktionen innan vi lämnar fast pris, och du har samma kontaktperson från takkontroll till slutgenomgång.",
    extraContent:
      "Vi går igenom förutsättningarna i Liljeholmen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Liljeholmen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Liljeholmen?",
      answer:
        "Priset för ett takbyte i Liljeholmen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Liljeholmen",
    lat: 59.3103,
    lng: 18.0222,
    nearbyLocations: ["Hägersten", "Gröndal", "Årsta"],
  },
  {
    slug: "arsta",
    name: "Årsta",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare i Årsta — takbyte och takrenovering i Årsta. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Årsta — klassisk folkhemsstadsdel med stora sammanhängande takytor — har ett fastighetsbestånd med lamellhus från 1940–50-tal och villor i Årsta villastad. Betongpannor kan drabbas av frostsprängning och underlagspapp torkar ut och spricker med åren, vilket är skäl till att ett tak till slut kan behöva bytas eller läggas om. RoslagsTak utför kompletta takprojekt i Årsta: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris efter en kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Årsta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Årsta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Årsta?",
      answer:
        "Priset för ett takbyte i Årsta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Årsta",
    lat: 59.2986,
    lng: 18.0508,
    nearbyLocations: ["Enskede", "Liljeholmen", "Älvsjö"],
  },
  {
    slug: "hagersten",
    name: "Hägersten",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Hägersten vid Mälaren, med äldre villor i väster och radhus från 1967–1971 vid Hägerstensbrinken. Kostnadsfri takkontroll.",
    longDescription:
      "Hägersten är en stadsdel i Söderort i Stockholm, vid Mälaren. Den gränsar enligt Wikipedia till bland annat Mälarhöjden, Västertorp, Hägerstensåsen, Aspudden och Gröndal. Namnet går tillbaka på torpet Haegrasteen, som nämns första gången i ett brev från 1432. Området hörde till Hägerstens gård, som avsöndrades från Årsta gård 1763, och gårdens nuvarande byggnad vid Hägerstensbrinken uppfördes omkring 1755. Vid stranden låg Fader Höks krog, känd sedan slutet av 1600-talet och omskriven av Bellman i två epistlar. Från 1860-talet blev det populärt att ha sommarnöje här. Wikipedia nämner Gunnarsberg vid Eolshällsvägen som det första, och Sagatun vid Brådstupsvägen, uppförd i fornnordisk stil 1881. Den första stadsplanen kom 1923 och gällde ett område väster om Storsvängen, men enligt Wikipedia fanns det då redan en stor mängd villor i stadsdelens västra del. År 1930 utökades planen, och villor byggdes också öster om Storsvängen och söder om S:t Mickelsgatan. Åren 1967–1971 uppfördes ett åttiotal radhus längs Hägerstensbrinken och Hägerstens allé, ritade av arkitektgruppen FFNS. De 59 radhusen vid Hägerstensbrinken ligger enligt Wikipedia i tre kvarter norr och väster om Hägerstens gård, högt över småbåtshamnen, och marken är så kuperad att husen i den brantaste delen fick tre våningar mot Mälaren och en mot gatan. Stadsmuseet i Stockholm har grönklassat dem. De 22 radhusen i kvarteret intill, vid Hägerstens allé, är gulklassade.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Hägersten-Älvsjö)" },
      { label: "Hustyper", value: "Villor, radhus (och flerbostadshus)" },
      { label: "Byggperiod", value: "Villor före 1923 och efter 1930, radhus vid Hägerstensbrinken 1967–1971" },
      { label: "Ägda småhus (avrundat)", value: "Ca 950" },
    ],
    sourceLink: { label: "Wikipedia: Hägersten", url: "https://sv.wikipedia.org/wiki/H%C3%A4gersten" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Hägersten, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Hägersten?",
      answer:
        "Byggperiod enligt källorna: villor före 1923 och från 1930 och framåt i västra Hägersten, radhusen vid Hägerstensbrinken och Hägerstens allé 1967–1971. Hustyper: villor och radhus, med inslag av flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Hägersten",
    lat: 59.3006,
    lng: 17.9856,
    nearbyLocations: ["Aspudden", "Liljeholmen", "Skärholmen", "Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna i västra Hägersten är i dag omkring hundra år gamla eller mer, och radhusen vid Hägerstensbrinken är runt 55 år. På så gamla hus kan taken redan ha lagts om, kanske mer än en gång, och därför säger husets ålder inte hur taket mår. Det som avgör är när underlagspapp, läkt och plåtdetaljer senast byttes, och det ser man först på plats. Där ett hus har tre våningar på ena sidan och en på den andra blir höjden mot sluttningen stor, och ställning och åtkomst behöver planeras efter det. På radhusen hänger taken ihop längs längan, och anslutningen mot grannens tak behöver utföras så att den fungerar för båda husen. I en klassad miljö kan också utseendet på ett nytt tak ha betydelse. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Hägersten och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "grondal",
    name: "Gröndal",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare i Gröndal — takbyte och takrenovering i Gröndal. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Gröndal är en kuperad stadsdel vid Mälaren, med branta tak på stjärnhus och funkisfastigheter från 1940-talet. Vid en kostnadsfri takkontroll kontrollerar vi underlagspapp, läkt, råspont, plåtbeslag och ventilation under taket — det är där ett takbyte avgörs. Du får en skriftlig bedömning och ett fast pris innan något arbete påbörjas.",
    extraContent:
      "Vi går igenom förutsättningarna i Gröndal — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Gröndal.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Gröndal?",
      answer:
        "Priset för ett takbyte i Gröndal beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Gröndal",
    lat: 59.3131,
    lng: 18.0006,
    nearbyLocations: ["Liljeholmen", "Hägersten", "Bromma"],
  },
  {
    slug: "aspudden",
    name: "Aspudden",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare i Aspudden — takbyte och takrenovering i Aspudden. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Aspudden — småskalig stadsdel med tät kvartersbebyggelse — har ett fastighetsbestånd med 1920–30-talsfastigheter med tegel- och plåttak. En stor del av taken här är från samma byggår, vilket innebär att de nu behöver läggas om. RoslagsTak utför kompletta takprojekt i Aspudden: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Hela projektet hålls samman av oss — takkontroll, materialval, ställning, takarbete och bortforsling.",
    extraContent:
      "Vi går igenom förutsättningarna i Aspudden — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Aspudden.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Aspudden?",
      answer:
        "Priset för ett takbyte i Aspudden beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Aspudden",
    lat: 59.3081,
    lng: 18.0006,
    nearbyLocations: ["Hägersten", "Gröndal", "Liljeholmen"],
  },
  {
    slug: "haggvik",
    name: "Häggvik",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Häggvik i Sollentuna, ett samhälle som växte fram på tomter som styckades av från 1917. Kostnadsfri takkontroll.",
    longDescription:
      "Häggvik är en kommundel i den centrala delen av Sollentuna. Enligt Wikipedia gränsar den till Norrviken i norr, Järvafältet i väster, Tureberg i söder, Edsberg i öster och Vaxmora i nordost, och den delas in i Häggviks centrum, Skälby, Södra Häggvik och Klasro. Byn på platsen hette Skälby. På 1500-talet fanns här fyra gårdar, som köptes av Gabriel Bengtsson Oxenstierna och lades under Edsbergs gods. Vid Hagvägen ligger ett gravfält med 28 gravhögar från järnåldern. I Klasro står Klasroskolan, som byggdes 1804 och fram till 1871 var Sollentunas enda skola. Namnet Häggvik kommer enligt Wikipedia från J A O Häggberg, ägare till Väderholmens gård, som kom till Skälby 1896 och med tiden ägde båda gårdarna. År 1911 avstyckades en del av ägorna, mark som varken passade för odling eller för boskap, och från 1917 styckades den i tomter. Redan 1919 beskrevs Häggvik som ett nybyggarsamhälle. Någon järnvägsstation var från början inte tänkt mellan Tureberg och Norrviken. Tomtägarna gjorde då en insamling, och pengarna fick SJ att gå med på att bygga en. Stationen stod klar 1932 och blev Sollentunas femte och sista. Villorna fortsatte att bli fler. I en lägesrapport om Södra Häggvik skriver Sollentuna kommun att villabebyggelsen omkring 1960 växte in över det sista av jordbrukslandskapet där, och att samma del av Häggvik femton år senare präglades av lager, kontor och industri. Enligt hitta.se är husen i Häggvik mest från 1950- och 1980-talen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Sollentuna"},{"label":"Delområden","value":"Häggviks centrum, Skälby, Södra Häggvik, Klasro"},{"label":"Hustyper","value":"Villor och flerbostadshus (blandat)"},{"label":"Byggperiod","value":"Tomter från 1917, enligt hitta.se mest 1950- och 1980-tal"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 370 (SCB, 2025)"}],
    sourceLink: {"label":"Wikipedia: Häggvik, Sollentuna kommun","url":"https://sv.wikipedia.org/wiki/H%C3%A4ggvik,_Sollentuna_kommun"},
    parentLocation: {"name":"Sollentuna","slug":"sollentuna"},
    h1Override: "Takläggare i Häggvik, Sollentuna",
    uniqueFAQ: {"question":"När byggdes husen i Häggvik?","answer":"Källorna anger när tomterna styckades (från 1917), inte när varje hus byggdes. Enligt hitta.se är husen mest från 1950- och 1980-talen. Hustyper: villor och flerbostadshus, blandat. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Häggvik",
    lat: 59.4438,
    lng: 17.9329,
    nearbyLocations: ["Sollentuna", "Helenelund", "Norrviken"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Källorna anger när tomterna styckades, inte när varje hus byggdes. Ett hus som kom till under samhällets första år är i dag omkring hundra år gammalt, medan husen från 1950-talet är runt 70 år och de från 1980-talet runt 40 år. På de äldre husen kan taken redan ha lagts om, kanske mer än en gång, och husets ålder säger därför lite om takets skick. Det som spelar roll är vad som gjordes senast och hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. På ett hus från 1980-talet som har kvar sitt första tak är det i regel genomföringar, ränndalar och plåtanslutningar som behöver ses över först. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Häggvik och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "helenelund",
    name: "Helenelund",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Helenelund, Sollentunas sydligaste kommundel med villastäder från 1920- och 1930-talen. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Helenelund är den sydligaste kommundelen i Sollentuna. Den består enligt Wikipedia av Helenelunds centrum, Kummelby, Edsviken, Tegelhagen, Silverdal och Eriksberg. Namnet kommer från ett torp, och den lilla stugan som har gett kommundelen dess namn står kvar. Villorna kom med egnahemsrörelsen och järnvägen. År 1918 köpte ett egnahemsbolag ett gods ägor för att stycka dem och sälja egnahemstomter. År 1922 fick Helenelund sin första järnvägshållplats, och då tog villabyggandet fart. Marken vid Edsviken fick namnet Edsviken villastad, och området väster om järnvägen fick namnet Eriksbergs villastad. Området mellan de två villastäderna bebyggdes till stor del under 1920- och 1930-talen och var i stort sett färdigbyggt på 1940-talet. På 1960-talet tog byggandet fart igen, då med flerfamiljshus väster om stationen och ett centrum som började byggas 1967. Enligt hitta.se är husen i Kummelby byggda på 1930- och 1950-talen. Mer om de två yngre områdena i kommundelen finns på sidan Tegelhagen och Silverdal.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Helenelund?","answer":"Byggperiod enligt källorna: egnahemstomter från 1918, villor mest 1920–1940-tal, Kummelby 1930- och 1950-tal. Hustyper: egnahem och villor, i centrum flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Helenelund",
    lat: 59.4053,
    lng: 17.9506,
    nearbyLocations: ["Sollentuna","Kista","Häggvik"],
    factBox: [{"label":"Kommun","value":"Sollentuna"},{"label":"Delar","value":"Helenelunds centrum, Kummelby, Edsviken, Tegelhagen, Silverdal, Eriksberg"},{"label":"Hustyper","value":"Egnahem och villor, i centrum flerfamiljshus"},{"label":"Byggperiod","value":"Egnahemstomter från 1918, villor mest 1920–1940-tal, Kummelby 1930- och 1950-tal"}],
    sourceLink: {"label":"Wikipedia, Helenelund","url":"https://sv.wikipedia.org/wiki/Helenelund"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Villorna i Eriksberg och Kummelby är i dag mellan 70 och drygt 100 år gamla. Husens ålder säger inte hur gammalt taket är. På hus i den åldern kan taket ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Två saker är värda att tänka på. Ett egnahem som har byggts om och till har ofta takdelar av olika ålder, och skarven mellan dem är värd en extra titt. Och i ett område som byggdes ut under ett par årtionden står hus från olika år nära varandra, så grannens tak säger inte mycket om ditt eget. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Helenelund och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "edsberg",
    name: "Edsberg",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Edsberg — takbyte och takrenovering i Edsberg. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Edsberg — villa- och flerfamiljsområde vid Edsviken — har ett fastighetsbestånd med 1970-talsbebyggelse med flacka tak och äldre villor. RoslagsTak utför kompletta takprojekt i Edsberg: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Edsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Edsberg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Edsberg?",
      answer:
        "Priset för ett takbyte i Edsberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Edsberg",
    lat: 59.4408,
    lng: 17.9425,
    nearbyLocations: ["Sollentuna", "Norrviken", "Rotebro"],
  },
  {
    slug: "rotebro",
    name: "Rotebro",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Rotebro i norra Sollentuna, med villorna i Gillbo och Rotsunda. Kostnadsfri takkontroll och fast pris i offerten.",
    longDescription:
      "Rotebro är en kommundel i norra Sollentuna. Den delas enligt Wikipedia in i Rotebro centrum, Rotsunda, Rotsunda gård, Gillbo, Gillberga och ett industriområde. Platsen är gammal. Namnet kommer av att här fanns en bro över ett sund, och Rotebro nämns första gången 1464. Vid bron, intill landsvägen mellan Stockholm och Uppsala, låg en gästgivargård som fick sitt tillstånd 1647. Ån som går här förbinder Edssjön med sjön Norrviken och är i dag en grävd kanal, sedan sjön sänktes i mitten av 1800-talet. På 1890-talet flyttade en jästfabrik hit, och fler industrier följde. På 1960-talet utvecklades Rotebro till ett av kommunens stora arbetsplatsområden, och centrum vid stationen byggdes på 1970-talet. I Gillbo finns en skola sedan början av 1900-talet. År 1960 räknades Rotebro som en egen tätort, och sedan 1970 räknas den som sammanvuxen med Sollentuna. Villorna ligger i Gillbo, Gillberga och Rotsunda. Enligt hitta.se är husen i Gillbo mest byggda på 1970- och 1980-talen.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Rotebro?","answer":"Byggperiod enligt källorna: rotsunda villor mitten av 1940-talet, Gillbo mest 1970- och 1980-tal. Hustyper: villor (Gillbo, Rotsunda), i centrum flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Rotebro",
    lat: 59.4772,
    lng: 17.9236,
    nearbyLocations: ["Norrviken","Upplands Väsby","Sollentuna"],
    factBox: [{"label":"Kommun","value":"Sollentuna"},{"label":"Delar","value":"Rotebro centrum, Rotsunda, Rotsunda gård, Gillbo, Gillberga"},{"label":"Hustyper","value":"Villor (Gillbo, Rotsunda), i centrum flerbostadshus"},{"label":"Byggperiod","value":"Rotsunda villor mitten av 1940-talet, Gillbo mest 1970- och 1980-tal"}],
    sourceLink: {"label":"Wikipedia, Rotebro","url":"https://sv.wikipedia.org/wiki/Rotebro"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Husen i Gillbo är i dag mellan 40 och 55 år gamla. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om, och ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. Därför börjar vi alltid med att titta på taket på plats. Två saker är värda att tänka på. I ett kvarter där husen byggdes samtidigt ser taken lika ut från gatan, men de har skötts och lagts om var för sig. Och ett hus som har byggts om och till har ofta takdelar av olika ålder, där skarven mellan dem är värd en extra titt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Rotebro och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "norrviken",
    name: "Norrviken",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Norrviken, Sollentunas villastad från 1906 med egnahem från 1930- och 1940-talen. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Norrviken är en kommundel i Sollentuna, vid sjön med samma namn. Den gränsar till Rotebro, Vaxmora, Häggvik och Viby. Fram till slutet av 1800-talet bestod trakten enligt Wikipedia av kyrkan, ett säteri och ett antal gårdar och torp. Villasamhället började byggas 1906, när ett villastadsbolag köpte en gårds ägor och började stycka dem i egnahemstomter. Året därpå byggde bolaget på egen bekostnad den första stationsbyggnaden, och när Norrviken hade fått en egen station tog tomtförsäljningen fart på allvar. Stationen öppnade den 1 maj 1907. År 1929 blev Norrviken municipalsamhälle. Utbyggnaden fortsatte i omgångar. I de södra delarna byggdes egnahemsvillor framför allt under 1930- och 1940-talen. Många äldre villor byggdes med stora trädgårdar, som i många fall senare har styckats och bebyggts, främst under 1960- till 1980-talen. Wikipedia beskriver Norrviken som en till stor del sammanhållen sekelskiftesbebyggelse, med ett stort antal tidstypiska villor med arkitekturhistoriskt värde och inslag av nyare villor.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Norrviken?","answer":"Byggperiod enligt källorna: från 1906, egnahem 1930- och 1940-tal, förtätning 1960–1980-tal. Hustyper: villor från 1900-talets början, egnahemsvillor, nyare villor på styckade tomter. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Norrviken",
    lat: 59.4586,
    lng: 17.9231,
    nearbyLocations: ["Rotebro","Edsberg","Sollentuna"],
    factBox: [{"label":"Kommun","value":"Sollentuna"},{"label":"Hustyper","value":"Villor från 1900-talets början, egnahemsvillor, nyare villor på styckade tomter"},{"label":"Byggperiod","value":"Från 1906, egnahem 1930- och 1940-tal, förtätning 1960–1980-tal"}],
    sourceLink: {"label":"Wikipedia, Norrviken","url":"https://sv.wikipedia.org/wiki/Norrviken"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"De tidigaste villorna i Norrviken är i dag omkring 110–120 år gamla, och egnahemmen från 1930- och 1940-talen mellan 80 och 95 år. Husens ålder säger inte hur gammalt taket är. På så gamla hus kan taket ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Två saker är värda att tänka på. Villor från det tidiga 1900-talet har ofta sammansatta tak, med kupor, vinklar och flera anslutningar i plåt, och ju fler detaljer ett tak har, desto större del av arbetet ligger i plåten. Och där en gammal trädgårdstomt har styckats står hus av olika ålder nära varandra, så grannens tak säger inte mycket om ditt eget. På en äldre villa är takets form, material och kulör en del av husets uttryck. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du i Norrviken och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "stocksund",
    name: "Stocksund",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Stocksund i Danderyd, en villastad från 1890-talet med sekelskiftesvillor. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Stocksund är en kommundel i Danderyds kommun, vid Lilla Värtan och Stocksundets norra strand. Platsen har gamla anor. Stockby gård har enligt Wikipedia sannolikt rötter i slutet av 1200-talet, och namnet Stockby förekommer första gången i en offentlig handling 1361. Den nuvarande gårdsbyggnaden uppfördes 1740. Villasamhället växte fram i slutet av 1800-talet. År 1888 grundades Stockby AB, som köpte gårdens egendom och styckade av den till tomter under namnet Stocksunds Villaparker. Den första tomten såldes 1890. Enligt Wikipedia växte samhället relativt långsamt de första åren: vid slutet av 1905 fanns 95 villor, och 1910 hade bolaget sålt sammanlagt 350 villatomter. Samma år stod Stocksunds vattentorn färdigt, ritat av arkitekten David Lundegårdh. I Mörbyområdet, öster om Roslagsbanan, byggdes ett villasamhälle avsett för statstjänstemän, och där hade 94 villor uppförts 1917. På Långängen byggdes de första villorna redan på 1880-talet, och när lantbruket där upphörde 1932 fanns ett hundratal villor. Sikreno och Inverness blev en del av Stocksunds köping 1942. Bebyggelsen domineras fortfarande av villor. I det kuperade området kring Alpstigen, Donnerstigen, Bergstigen och Sturevägen ligger enligt Wikipedia flera av gamla Stocksunds villor från tiden runt sekelskiftet 1900, som kommunen har klassat som värdefulla eller omistliga. Kommunen betraktar området som särskilt värdefullt från kulturhistorisk synpunkt, och det är av riksintresse. Roslagsbanan har två hållplatser här, Stocksund och Mörby. Villor med torn är ett återkommande inslag, och Villa Tallom på Långängen, uppförd 1904–1906, är byggnadsminne sedan 1979.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Danderyd"},{"label":"Delområden","value":"Gamla Stocksund, Mörby villaområde, Långängen, Inverness, Sikreno"},{"label":"Hustyper","value":"Villor"},{"label":"Byggperiod","value":"Från 1890, utbyggnad under 1900-talet"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 190"}],
    sourceLink: {"label":"Wikipedia: Stocksund","url":"https://sv.wikipedia.org/wiki/Stocksund"},
    parentLocation: {"name":"Danderyd","slug":"danderyd"},
    h1Override: "Takläggare i Stocksund, Danderyd",
    uniqueFAQ: {
      question: "När byggdes husen i Stocksund?",
      answer:
        "Byggperiod enligt källorna: från 1890, med utbyggnad under hela 1900-talet. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Stocksund",
    lat: 59.3845769,
    lng: 18.0571915,
    nearbyLocations: ["Danderyd", "Djursholm", "Enebyberg"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Stocksund är byggda under lång tid, från 1890-talet och framåt, och många av villorna är i dag över hundra år gamla. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. På äldre villor med torn, kupor och många vinklar finns fler anslutningar än på ett enkelt sadeltak, och det är i ränndalar, kring skorstenar och vid plåtdetaljer som ett tak oftast prövas. I ett område som kommunen bedömer som kulturhistoriskt värdefullt är det klokt att tänka på material och kulör tidigt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Stocksund och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "djursholm",
    name: "Djursholm",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Djursholms villastad, med villor från 1890-talet och framåt. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Djursholm anlades som villastad 1889. Egendomen är känd sedan medeltiden, och namnet nämns första gången 1432. Villastaden kom till på initiativ av bankdirektören Henrik Palme. Enligt Wikipedia köpte det nybildade Djursholms AB den 1 600 hektar stora egendomen i juni 1889, och arbetet med att bygga upp villastaden började omedelbart. Redan i oktober samma år hade bolaget sålt 58 tomter. Den ursprungliga villastaden styckades av kring nuvarande Djursholms torg, vid slottet och längs strandlinjen mot Värtan. Palme beskrev i sitt prospekt 1889 hur villorna borde läggas på sluttningarna av kullarna, med fri utsikt och skydd av de parkträd som redan fanns. Bolaget ansvarade för vägar, vatten och avlopp, gatubelysning och den smalspåriga järnvägen Djursholmsbanan, och 1890 anlades Djursholms vattentorn. Det höglänta, kuperade området sydöst om slottet var ett av de första som bebyggdes, och många av villorna där är uppförda på 1890-talet och under 1900-talets första decennium. I Ekeby började marken exploateras år 1900, och området norr om Germaniaviken bebyggdes till största delen under 1900-talets första årtionden. Den första egentliga stadsplanen togs fram från 1907 av Per Olof Hallman. Enligt Wikipedia präglas den äldre bebyggelsen av en blandning av stilar, eftersom de flesta villorna uppfördes var för sig, oberoende av grannhusen. Tomterna är i allmänhet stora, och här finns allt från det första årets enkla trävillor till nationalromantik och jugend. Villan på Germaniavägen 21, från 1889, beskrivs som det bäst bevarade exemplet på det första årets villaproduktion. I andra delar av Djursholm finns 1920-talsklassicism, funkis och grupphus från andra halvan av 1900-talet.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Danderyd"},{"label":"Delområden","value":"Villastaden, Djursholms Ekeby, Germania"},{"label":"Hustyper","value":"Villor"},{"label":"Byggperiod","value":"1890-tal–1910-tal, senare inslag"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 080"}],
    sourceLink: {"label":"Wikipedia: Djursholm","url":"https://sv.wikipedia.org/wiki/Djursholm"},
    parentLocation: {"name":"Danderyd","slug":"danderyd"},
    h1Override: "Takläggare i Djursholm, Danderyd",
    uniqueFAQ: {
      question: "När byggdes husen i Djursholm?",
      answer:
        "Byggperiod enligt källorna: 1890-tal till 1910-tal, med senare inslag av 1920-talsklassicism, funkis och grupphus. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Djursholm",
    lat: 59.3973535,
    lng: 18.0880625,
    nearbyLocations: ["Stocksund", "Danderyd", "Enebyberg"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Många av villorna i södra Djursholm är i dag mer än hundra år gamla. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Stora villor med torn, kupor, burspråk och flera takfall har många anslutningar, och det är där arbetet med plåtdetaljer, ränndalar och skorstensbeslag avgör hur tätt taket blir. Eftersom husen är byggda var för sig, i olika stilar, finns det sällan en lösning som passar hela kvarteret. I ett område med äldre, arkitektritade villor är det klokt att tänka på material och kulör tidigt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Djursholm och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "enebyberg",
    name: "Enebyberg",
    region: "Norra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Enebyberg: villor från 1900-talets första hälft och kedjehus från 1970-talet vid Eneby gård. Kostnadsfri takkontroll.",
    longDescription: "Enebyberg är ett villasamhälle som enligt beskrivningar av kommundelen till stor del präglas av bebyggelse från 1900-talets första hälft. Historien som villastad börjar 1906, när ägaren av Enebybergs gård började stycka av mark i anslutning till det som i dag är Roslagsbanan. Året därpå bildades AB Enebybergs villastad och tomtförsäljningen kom igång. 1914 var bebyggelsen så omfattande att Enebyberg blev municipalsamhälle. Stadsplanen från 1923 omfattade omkring 550 tomter. Villorna byggdes först i de östra delarna längs järnvägen, och på 1930-talet växte samhället väster om Breda vägen. Under 1940-talet var enligt uppgifterna alla tomter bebyggda. Ny mark togs i anspråk först i slutet av 1960-talet, och under 1970-talet tillkom rad- och kedjehusområden i västra Enebyberg, bland annat kedjehusen vid Eneby gård. Namnet går tillbaka på Enebybergs gård, vars huvudbyggnad uppfördes på 1770-talet. Gården stod länge övergiven och var rivningshotad, men 1975 beslutade kommunen att den skulle restaureras. Den ligger i västra Enebyberg, intill Rinkebyskogen. Det ger Enebyberg två tydliga generationer av hus: den tidiga villastaden i öster, där mycket av 1900-talets villaarkitektur finns kvar, och rad- och kedjehusen från 1960- och 70-talen i väster.",
    extraContent: "Olika tak, olika frågor: I den äldre villastaden har taken i regel bytts eller lagts om, ibland flera gånger, och skicket skiljer sig mycket mellan husen. Äldre villor kan ha brantare takfall, takkupor, skorstenar och plåtdetaljer som behöver hanteras med omsorg för att husets karaktär ska finnas kvar efter ett byte. Kedjehusen och radhusen från 1960- och 70-talen är i dag runt femtio år gamla. Där taket inte har lagts om är underlagspapp, läkt och plåtdetaljer ofta i den ålder där det är dags att se över dem. Eftersom husen i ett kedjehusområde oftast är likadana och byggdes samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    factBox: [
      { label: "Kommun", value: "Danderyd" },
      { label: "Delområden", value: "Östra/västra Enebyberg, Eneby gård" },
      { label: "Hustyper", value: "Villor, rad- och kedjehus" },
      { label: "Byggperiod", value: "Villor 1906–1940-tal, rad-/kedjehus 1960–70-tal" },
      { label: "Ägda småhus i området", value: "Ca 1 450 (SCB, 2025)" },
    ],
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Enebyberg?",
      answer:
        "Priset för ett takbyte i Enebyberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Enebyberg",
    lat: 59.4225,
    lng: 18.0294,
    nearbyLocations: ["Danderyd", "Täby", "Stocksund"],
    parentLocation: {"name":"Danderyd","slug":"danderyd"},
    sourceLink: {"label":"Wikipedia: Enebyberg","url":"https://sv.wikipedia.org/wiki/Enebyberg"},
    h1Override: "Takläggare i Enebyberg, Danderyd",
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. ROT-avdraget på 30 % av arbetskostnaden dras direkt på fakturan.","Bor du i Enebyberg och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "jakobsberg",
    name: "Jakobsberg",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i villaområdena i västra Jakobsberg, Järfälla, med hus från 1950- till 1970-talet. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription: "Jakobsberg har fått sitt namn från en gård. Säteriet anlades på 1650-talet på Vibble bys mark, och när majoren Jakob Lilliehöök dog 1657, bara ett halvår efter bröllopet, gav hans änka Brita Cruus gården namnet Jakobsberg till hans minne. Hon bodde kvar som änka i nästan sextio år. Sedan 1919 finns Jakobsbergs folkhögskola i gårdens huvudbyggnad, och vid folkhögskolan står en runsten från 1000-talet. Bygden är betydligt äldre än gården. Vid Kvarnbackens sluttning ligger kommunens största järnåldersgravfält, med ett nittiotal synliga högar och stensättningar. Högst upp på backen har det stått en väderkvarn sedan 1780-talet. Kvarnen brann 1980 och de två kopior som byggdes brann 1997 och 2005, och i dag finns bara grunden kvar. Villasamhället växte fram under 1920- och 30-talen. Enligt Järfälla kommuns beskrivning av ortens historia styckade Mälareprovinsernas Egnahem AB, senare AB Upplands-hem, då upp Jakobsbergs gård i småbruk, trädgårdsbruk och villatomter. I västra Jakobsberg ligger villaområdena kring Alpvägen, Folkhögskolevägen, Mälarvägen och månadsgatorna från Aprilvägen till Decembervägen, med villor, kedjehus och radhus. Enligt hitta.se är husen här främst byggda på 1950- och 1960-talen, till exempel kring Alpvägen och Åsvägen, och på 1960- och 1970-talen, kring bland annat Backvägen, Vintervägen och Vårvägen. Jakobsberg ligger drygt en och en halv mil norr om centrala Stockholm och är i dag Järfällas kommersiella och administrativa centrum, med ett köpcentrum från 1962 och pendeltågsstation.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Jakobsberg?","answer":"Byggperiod enligt källorna: Tomter styckade 1920–30-tal (kommunen), hus främst 1950–70-tal (hitta.se). Hustyper: villor, kedjehus, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Jakobsberg",
    lat: 59.4231,
    lng: 17.8342,
    nearbyLocations: ["Järfälla","Barkarby och Skälby","Viksjö","Kallhäll"],
    factBox: [{"label":"Kommun","value":"Järfälla"},{"label":"Delområde","value":"Villaområdena väster om Jakobsbergs centrum (Alpvägen, Folkhögskolevägen, Aprilvägen–Decembervägen, Mälarvägen)"},{"label":"Hustyper","value":"Villor, kedjehus, radhus"},{"label":"Byggperiod","value":"Tomter styckade 1920–30-tal (kommunen), hus främst 1950–70-tal (hitta.se)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 100"}],
    sourceLink: {"label":"Järfälla kommun: Järfällas historia","url":"https://www.jarfalla.se/kommunochpolitik/kommunarkivet/jarfallashistoria.4.49c72f5418de88c69e928ab.html"},
    parentLocation: {"name":"Järfälla","slug":"jarfalla"},
    h1Override: "Takläggare i Jakobsberg, Järfälla",
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i västra Jakobsberg är i dag runt 50–75 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. På gator där kedjehus och radhus byggdes samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i västra Jakobsberg? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "barkarby",
    name: "Barkarby och Skälby",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i villaområdena Barkarby och Skälby i Järfälla, med hus främst från 1950- och 1960-talen. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Barkarby och Skälby bildar tillsammans kommundelen Barkarby-Skälby i södra Järfälla. Skälby ligger i södra Järfälla och hör till kommundelen Barkarby-Skälby. Bygden har lång historia. Enligt Wikipedia visar boplatslämningar, gravfält och en medeltida bytomt i Barkarby hur människor har levt här från omkring 800 f.Kr. Barkarby nämns i jordeböckerna första gången 1538, och Skälby gård, som har gett Skälby dess namn, har funnits sedan 1500-talet. Enligt Järfälla kommun finns Skälby i Järfälla belagt i jordeböckerna 1535, med stavningar som Skelby och Skelleby. En teori som kommunen återger är att namnet syftar på en gräns: Skälby låg förr vid gränsen mot grannsocknen Spånga. På 1500-talet var Skälby en by med två gårdar, Östergården och Västergården. Skälby gård har funnits som gårdsnamn sedan dess, och den nuvarande huvudbyggnaden uppfördes 1802. Gårdens nuvarande huvudbyggnad byggdes 1802. Enligt Wikipedia köpte Järfälla kommun huvudbyggnaden 1949, och gården används i dag av bygdegårdsföreningen. Kvarnen på Vårdkaseberget, nordväst om gården, brann ner påsken 1939. Villabebyggelsen har sin början i 1900-talets första år. Barkarby hemman och den intilliggande kyrkbyn köptes 1901 av Birger Svenonius, som planerade en omfattande villabebyggelse. Enligt Wikipedia blev bara en mindre del av villorna byggda, och huvuddelen av marken överläts på Barkarby villastads AB. Villaområdet har ett tydligt startår. Enligt kommunen köptes Skälby gård 1921 av bolaget AB Hem på Landet, som styckade 680 tomter för både villor och trädgårdsbruk. Vid början av 1930-talet ska ett hundratal villor ha byggts, främst kring Skälby station på järnvägen mellan Spånga, Hässelby och Lövsta. Skälby hade från slutet av 1800-talet fram till 1956 en egen hållplats på Lövstabanan, järnvägen mellan Spånga och Lövsta. Skälby fick en egen poststation 1932, och 1947 började vatten- och avloppsledningar byggas ut i Järfälla. Persontrafiken till hållplatsen upphörde 1956. Vårterminen 1959 öppnade Skälbyskolan, sedan behovet av skollokaler i Skälby hade funnits sedan mitten av 1940-talet. I dag beskrivs Skälby som ett villaområde, och villaområdet Barkarby gränsar direkt till det. Wikipedia beskriver Skälby som ett villaområde, där gatorna har namn med anknytning till rymden, som Plutovägen. Många av gatorna i Skälby har namn med anknytning till rymden, som Plutovägen. Till Skälby räknas också Neptuni-, Orgona- och Aniaraområdena. Sydväst om pendeltågsstationen ligger radhusområdet Vålberga. Enligt hitta.se är husen kring Almvägen, Bancovägen, Brasvägen och Barsbrovägen främst byggda på 1950- och 1960-talen, med enstaka hus från 2000- och 2010-talen. Enligt hitta.se är husen i Skälby främst byggda på 1950- och 1960-talen, med delar från 1960- till 1980-talen och från 1990- och 2000-talen. På det gamla flygfältet intill växer Barkarbystaden fram, med helt ny bebyggelse.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Järfälla"},{"label":"Delområden","value":"Björkeby, Barsbro, östra Skälby, Vålberga"},{"label":"Hustyper","value":"Villor, inslag av kedjehus och radhus"},{"label":"Byggperiod","value":"Främst 1950- och 1960-tal, enstaka 2000–2010-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 100"}],
    sourceLink: {"label":"Wikipedia: Barkarby","url":"https://sv.wikipedia.org/wiki/Barkarby"},
    parentLocation: {"name":"Järfälla","slug":"jarfalla"},
    h1Override: "Takläggare i Barkarby och Skälby, Järfälla",
    uniqueFAQ: {
      question: "När byggdes husen i Barkarby och Skälby?",
      answer:
        "Byggperiod enligt källorna: främst 1950- och 1960-tal, enstaka hus från 2000- och 2010-talen. Hustyper: villor, inslag av kedjehus och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Barkarby och Skälby",
    lat: 59.4051955,
    lng: 17.8643513,
    nearbyLocations: ["Jakobsberg", "Viksjö", "Kälvesta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta villorna i de äldre delarna av Barkarby och Skälby är i dag runt 60–75 år gamla. Tomterna i Skälby styckades på en gång, men husen kom till under flera årtionden. Villorna från de första åren kring stationen är i dag runt 90–100 år gamla, och de hus som enligt hitta.se utgör huvuddelen, från 1950- och 1960-talen, är runt 60–75 år. Därtill kommer yngre delar. Taken kan redan ha lagts om, på de äldsta villorna kanske mer än en gång, och åldern på huset räcker därför inte för att bedöma taket. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Det här är ett villaområde som har byggts om och kompletterats under lång tid, och två grannhus kan därför ha tak i helt olika ålder och material. Tomterna styckades för både villor och trädgårdsbruk, och ett hus som har stått länge på samma tomt har ofta hunnit få både tillbyggnad och garage under åren. Varje sådan utbyggnad ger en ny anslutning i taket, och det är i ränndalar, vid anslutningar mot vägg och kring skorstenar som underlagspapp och plåt bör kontrolleras först. Hängrännor och stuprör hör till samma genomgång. På radhusen i Vålberga hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Barkarby eller Skälby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "kallhall",
    name: "Kallhäll",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Kallhälls villastad (Björkliden) i Järfälla, där egnahemstomter började styckas av 1912. Kostnadsfri takkontroll.",
    longDescription:
      "Kallhälls villastad, som också kallas Björkliden, är ett bostadsområde i kommundelen Kallhäll-Stäket i Järfälla. Det ligger på östra sidan av E18, och enligt Wikipedia finns 210 villor här. Området hörde länge till Sollentuna. Marken låg under Viby gård, och torpet Rännarskede såldes 1905 till AB Hem på landet, som sålde det vidare året därpå. År 1912 började tomter för egnahem styckas av. Järfälla kommun beskriver i sin kulturmiljöplan varför det blev just här: Bolinders, som hade sin fabrik i Kallhäll, upplät ingen mark åt anställda som ville bygga eget, och därför sökte sig arbetarna över gränsen till Björkliden. Wikipedia skriver att de byggde enkla trävillor. Av samma skäl hamnade missionshuset och Folkets hus utanför bolagets mark. Folkets Husföreningen byggde 1912 om en stuga i Grantorp till samlingslokal och uppförde 1936–1937 ett nytt hus vid Blomstervägen i funktionalistisk stil. Först den 1 januari 1955 fördes Björkliden över till Järfälla, och då bodde 295 personer här. Enligt kommunen var tomterna från början stora, 1 500–2 000 kvadratmeter, men flera har styckats sedan dess. Bostadshusen står mitt på tomterna och är av egnahemstyp med enkel utformning, för det mesta i en våning med källare och inredd vind. Fasaderna har i regel träpanel i ljusa kulörer, och falurött förekommer. Vägarna är smala och saknar trottoarer. Enligt kommunens kulturmiljöplan har de äldsta egnahemmen sadeltak, ofta brutna och med brant fall, och det vanligaste takmaterialet är rött lertegel. Kommunen konstaterar att många egnahem har byggts om och att nyare hus har tillkommit mellan de äldre, men att karaktären med mindre villor på lummiga trädgårdstomter fortfarande är tydlig.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Järfälla (kommundelen Kallhäll-Stäket)"},{"label":"Delområden","value":"Kallhälls villastad (Björkliden)"},{"label":"Hustyper","value":"Egnahem och mindre villor, senare kompletteringsbebyggelse"},{"label":"Byggperiod","value":"Tomter styckades av från 1912, senare hus på avstyckade tomter"},{"label":"Antal villor","value":"210 enligt Wikipedia"}],
    sourceLink: {"label":"Järfälla kommun: Kulturmiljöplan för Järfälla, Kallhäll (Björkliden)","url":"https://www.jarfalla.se/download/18.68e7a727168e12dd179a407f/1550245859848/kulturmiljoplan-kallhall.pdf"},
    parentLocation: {"name":"Järfälla","slug":"jarfalla"},
    h1Override: "Takläggare i Kallhälls villastad, Järfälla",
    uniqueFAQ: {"question":"När byggdes husen i Kallhälls villastad?","answer":"Byggperiod enligt källorna: tomter styckades av från 1912, senare hus på avstyckade tomter utan angivna årtal. Hustyper: egnahem och mindre villor, med senare kompletteringsbebyggelse. Enligt Järfälla kommuns kulturmiljöplan har de äldsta egnahemmen sadeltak, ofta brutna och med brant fall, och det vanligaste takmaterialet är rött lertegel. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Kallhäll",
    lat: 59.4660,
    lng: 17.8290,
    nearbyLocations: ["Jakobsberg", "Bro", "Järfälla"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Egnahemmen från de första åren efter 1912 är i dag över 110 år gamla, och husen som har tillkommit på avstyckade tomter är yngre än så. På hus i den åldern kan taken redan ha lagts om, kanske flera gånger, och husets ålder säger därför inget säkert om takets skick. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. Har ett hus byggts till möts tak från olika tider, och skarven mellan dem behöver ses över särskilt. Där en vind har inretts sitter ofta takfönster eller kupor, och anslutningarna runt dem hör till det som kontrolleras först. Kommunens kulturmiljöplan föreslår utökad rådgivning vid bygglov i Björkliden, för att traditionella material och färger ska behållas. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Kallhälls villastad och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "viksjo",
    name: "Viksjö",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Högby, Råstensvägen, Avstyckningsvägen, Skulpturvägen och Sandvik i Viksjö, med hus från 1969–1982. Kostnadsfri takkontroll.",
    longDescription: "Viksjö byggdes ut på mycket kort tid. Enligt dispositionsplanen från 1965 skulle här byggas 2 750 småhus och 900 lägenheter i flerfamiljshus för 12 000 invånare. När byggandet pågick som mest intensivt stod enligt Wikipedia ett hus klart om dagen, och folkmängden ökade från 4 992 till 12 947 mellan 1970 och 1980. Det färdiga Viksjö omfattade omkring 5 500 bostäder, varav 70 procent i småhus. Wikipedia beskriver också hur området rymmer en rik variation av 1960- och 70-talens vanligaste hustyper. I norra och västra Viksjö byggdes flera enhetliga områden efter varandra. I Högby, längs Högbyvägen, uppfördes 180 radhus i 30 längor om sex hus, 1969 och 1970. De är av samma typ som i Andeboda: radhus i två plan med flacka tegeltäckta sadeltak. Nära platsen för det gamla torpet Högby, vid gränsen till det som 1995 blev Görvälns naturreservat, byggdes 1970–71 kedjehusen vid Råstensvägen, sammanlagt 157 småhus, bland dem souterrängvillor vid Triangelvägen och Polygonvägen. År 1972 byggdes 72 kedjehus i ett plan vid Gränsvägen, Tunnlandsvägen och Arealvägen, och 1972–73 kom 86 souterrängvillor i två till tre våningar vid Avstyckningsvägen, där planen lades om för att spara ekdungarna. I slutet av 1970-talet byggdes villorna vid Skulpturvägen, med Krokivägen, Statyvägen och Reliefvägen, helt utan statliga lån, på tomter som delvis har kvar den ursprungliga vegetationen. Därefter fortsatte utbyggnaden sydväst om Hummelmoravägen i Sandvik, med en blandning av hustyper och upplåtelseformer i början av 1980-talet.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Viksjö?","answer":"Byggperiod enligt källorna: Högby 1969–70, Råstensvägen 1970–71, Arealvägen m.fl. 1972, Avstyckningsvägen 1972–73, Skulpturvägen slutet av 1970-talet, Sandvik tidigt 1980-tal. Hustyper: kedjehus, radhus, villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Viksjö",
    lat: 59.4192,
    lng: 17.8006,
    nearbyLocations: ["Järfälla","Jakobsberg","Kallhäll"],
    factBox: [{"label":"Kommun","value":"Järfälla"},{"label":"Delområden","value":"Högby, Råstensvägen, Lantmäterivägens förlängning, Avstyckningsvägen, Skulpturvägen, Sandvik, Tallen"},{"label":"Hustyper","value":"Kedjehus, radhus, villor"},{"label":"Byggperiod","value":"Högby 1969–70, Råstensvägen 1970–71, Arealvägen m.fl. 1972, Avstyckningsvägen 1972–73, Skulpturvägen slutet av 1970-talet, Sandvik tidigt 1980-tal"},{"label":"Tak (belagt)","value":"Högby: flacka tegeltäckta sadeltak (samma typ som Andeboda)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 700"}],
    sourceLink: {"label":"Wikipedia: Viksjö, Järfälla kommun","url":"https://sv.wikipedia.org/wiki/Viksj%C3%B6,_J%C3%A4rf%C3%A4lla_kommun"},
    parentLocation: {"name":"Järfälla","slug":"jarfalla"},
    h1Override: "Takläggare i norra och västra Viksjö, Järfälla",
    extraSections: [{ heading: "Vad det betyder för taket", text: "Radhusen i Högby och kedjehusen vid Råstensvägen och Arealvägen är i dag runt 50–55 år gamla, villorna vid Skulpturvägen runt 45 år och husen i Sandvik runt 40–45 år. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. På souterrängvillorna i sluttning kan åtkomsten påverka hur ett takbyte planeras. I radhuslängorna och kedjehusområdena, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i norra eller västra Viksjö? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "bro",
    name: "Bro",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Bro — takbyte och takrenovering i Bro. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Bro — tätort i Upplands-Bro — har ett fastighetsbestånd med villor, radhus och lantbruksfastigheter. Takens ålder och skick varierar mycket mellan husen, och vid en takkontroll bedömer vi om en renovering räcker eller om det är dags för omläggning. RoslagsTak utför kompletta takprojekt i Bro: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Bro — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Bro.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Bro?",
      answer:
        "Priset för ett takbyte i Bro beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Bro",
    lat: 59.5147,
    lng: 17.6389,
    nearbyLocations: ["Kungsängen", "Upplands-Bro", "Kallhäll"],
  },
  {
    slug: "kungsangen",
    name: "Kungsängen",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Kungsängen, med villor från 1910-talet och framåt och enplansvillor och kedjehus från 1950- och 1960-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Kungsängen är centralort i Upplands-Bro kommun. Socknen och kyrkan har hetat Näs sedan medeltiden, efter Lennartsnäshalvön, och Kungsängens kyrka har delar från 1200-talet. Namnet Kungsängen kom med järnvägen. När Stockholm-Västerås-Bergslagens Järnväg öppnade 1876 drogs linjen genom obebyggd mark, och stationen hamnade omkring två kilometer sydost om den dåvarande ortskärnan vid Tibble gård. Bolaget kallade stationen Kungsängen. Resan till Stockholm tog då en timme och fyrtio minuter. Den nuvarande idrottsplatsen hade enligt Wikipedia varit en kungsäng sedan slutet av 1500-talet. Ny bebyggelse växte upp kring stationen och vid stranden nedanför, och 1903 anlades Ryds gjuteri vid stranden öster om stationen. Kring Prästhagsvägen ligger enligt Wikipedia flera exempel på villor från 1910-talet, som församlingens komminister lät bygga på prästgårdens mark. Under 1920-talet började det som i dag är Kungsängens centrum att bebyggas, och en av de första villorna där var Villa Skoga. År 1952 bodde 270 personer i Kungsängen. Sedan gick det fort: en stor del av villorna och höghusen uppfördes under 1950- och 1960-talen. Wikipedia nämner Rankhusvägen som ett välbevarat exempel på tidens enplansvillor och Ekhammarsvägen som ett exempel på kedjehus. De sju punkthusen på Kungshöjden byggdes 1965, och villorna vid västra delen av Strandvägen ritades av Rolf Thies och uppfördes 1967. Pendeltågen började gå hit 1968, och under 1980-talet kompletterades bebyggelsen kring stationen och torget.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Upplands-Bro" },
      { label: "Delområden", value: "Prästhagsvägen, Rankhusvägen, Ekhammarsvägen, Strandvägen, centrum" },
      { label: "Hustyper", value: "Villor, enplansvillor, kedjehus, punkthus" },
      { label: "Byggperiod", value: "Villor från 1910-talet, centrum från 1920-talet, huvuddelen 1950- och 1960-tal, Strandvägen 1967, komplettering 1980-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 570" },
    ],
    sourceLink: { label: "Wikipedia: Kungsängen", url: "https://sv.wikipedia.org/wiki/Kungs%C3%A4ngen" },
    parentLocation: { name: "Upplands-Bro", slug: "upplands-bro" },
    h1Override: "Takläggare i Kungsängen, Upplands-Bro",
    uniqueFAQ: {
      question: "När byggdes husen i Kungsängen?",
      answer:
        "Byggperiod enligt källorna: villor från 1910-talet, centrum från 1920-talet, huvuddelen av villorna och höghusen från 1950- och 1960-talet, Strandvägens villor 1967, och komplettering under 1980-talet. Hustyper: villor, enplansvillor, kedjehus och punkthus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Kungsängen",
    lat: 59.4783,
    lng: 17.7472,
    nearbyLocations: ["Bro", "Upplands-Bro", "Kallhäll"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna vid Prästhagsvägen är i dag runt 110 år gamla, och enplansvillorna och kedjehusen från 1950- och 1960-talen mellan 60 och 75 år. Villorna vid Strandvägen närmar sig 60. Taken kan redan ha lagts om, och husets ålder säger därför inget säkert om takets skick. Där taket inte har bytts på länge är det underlagspapp, läkt, plåtdetaljer och hängrännor som behöver ses över först. På kedjehus möter taket grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. När husen längs en gata är byggda samtidigt och liknar varandra syns ett nytt tak i gatubilden, så ta reda på vad som gäller innan du byter material eller kulör. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i centrala Kungsängen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "marsta",
    name: "Märsta",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Märsta — takbyte och takrenovering i Märsta. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Märsta är Sigtuna kommuns största tätort med radhus och flerbostadshus från 1970-talet. Vid en kostnadsfri takkontroll kontrollerar vi underlagspapp, läkt, råspont, plåtbeslag och ventilation under taket — det är där ett takbyte avgörs. Du får en skriftlig bedömning och ett fast pris innan något arbete påbörjas.",
    extraContent:
      "Vi går igenom förutsättningarna i Märsta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Märsta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Märsta?",
      answer:
        "Priset för ett takbyte i Märsta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Märsta",
    lat: 59.6206,
    lng: 17.8547,
    nearbyLocations: ["Sigtuna", "Upplands Väsby", "Rotebro"],
  },
  {
    slug: "blackeberg",
    name: "Blackeberg",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Blackeberg — takbyte och takrenovering i Blackeberg. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Blackeberg — funkisstadsdel i västra Bromma — har ett fastighetsbestånd med smalhus från 1950-talet och villor. Betongpannor kan drabbas av frostsprängning och underlagspapp torkar ut och spricker med åren, vilket är skäl till att ett tak till slut kan behöva bytas eller läggas om. RoslagsTak utför kompletta takprojekt i Blackeberg: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris efter en kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Blackeberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Blackeberg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Blackeberg?",
      answer:
        "Priset för ett takbyte i Blackeberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Blackeberg",
    lat: 59.3378,
    lng: 17.8664,
    nearbyLocations: ["Vällingby", "Bromma", "Ängby"],
  },
  {
    slug: "nockeby",
    name: "Nockeby",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Nockeby i Bromma, en villastadsdel som planerades och byggdes på 1930-talet. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Nockeby är en stadsdel i Västerort i Stockholm och hör till Bromma trädgårdsstad, tillsammans med bland annat Höglandet, Ålsten och Smedslätten. Spårvagnen på Nockebybanan går hit från Alvik, och hållplatsen Nockeby är banans slutpunkt. Namnet nämns första gången år 1400, som Nokkaby. Ur den byn växte säteriet Åkeshov fram under 1600-talet. Stockholms stad köpte Åkeshov 1904, och 1932 fick stadsdelen sitt namn efter byn. Vid Nockebybron fanns bebyggelse långt tidigare: den första bron blev färdig 1787, och enligt Wikipedia uppfördes flera sommarhus bortåt bron vid slutet av 1800-talet. Stadsdelen stadsplanerades och byggdes på 1930-talet, efter en plan av Albert Lilienberg. De flesta tomterna uppläts för villabyggande mellan 1926 och 1933, och spårvagnen förlängdes hit 1929. Wikipedia skriver att området planerades för villor och domineras av villor, och att husen ofta har två fulla våningar. Gatorna följer den kuperade terrängen. De flesta fick sina namn 1929 och 1930, dels efter orter i Dalarna, som Leksandsvägen och Orsavägen, dels efter nordiska hjältesagor, som Sigurdsvägen och Brynhildsvägen. I planbeskrivningen från den 8 augusti 1930 står att husen ska vara fristående eller sammanbyggda två och två i tomtgränsen, och att hus som kopplas ihop på det sättet ska ges ett enhetligt utseende. Nockeby torg anlades i början av 1930-talet med flerfamiljshus och butiker i bottenvåningen. Husen vid torget har enligt Wikipedia slätputsade fasader och ritades av Edvin Engström. Sankta Birgitta kyrka, ritad av Rolf Bergh, invigdes 1962.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Bromma)" },
      { label: "Hustyper", value: "Villor (fristående eller sammanbyggda två och två), flerfamiljshus vid Nockeby torg" },
      { label: "Byggperiod", value: "1930-tal (tomter upplåtna 1926–1933), sommarhus vid Nockebybron från slutet av 1800-talet" },
      { label: "Ägda småhus (avrundat)", value: "Ca 590" },
    ],
    sourceLink: { label: "Wikipedia: Nockeby", url: "https://sv.wikipedia.org/wiki/Nockeby" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Nockeby, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Nockeby?",
      answer:
        "Byggperiod enligt källorna: till övervägande del 1930-tal, med tomter upplåtna för villabyggande 1926–1933, och enstaka sommarhus vid Nockebybron från slutet av 1800-talet. Hustyper: villor, fristående eller sammanbyggda två och två, samt flerfamiljshus vid Nockeby torg. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Nockeby",
    lat: 59.3283,
    lng: 17.9036,
    nearbyLocations: ["Bromma", "Ängby", "Hässelby"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna i Nockeby är till övervägande del från 1930-talet och är i dag runt 90 år gamla. På hus i den åldern kan taket redan ha lagts om, kanske mer än en gång, och husets ålder säger därför lite om takets skick. Det som spelar roll är vad som gjordes senast och hur plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag. På hus som är sammanbyggda två och två möts taken i tomtgränsen, och arbetet vid anslutningen behöver fungera ihop med grannens tak. Eftersom 1930 års plan ställde krav på ett enhetligt utseende för sådana hus är det klokt att ta reda på vad som gäller innan material eller kulör väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Nockeby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "abrahamsberg",
    name: "Abrahamsberg",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Abrahamsberg — takbyte och takrenovering i Abrahamsberg. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi lägger tak i Abrahamsberg, trädgårdsstad i Bromma, där funkisvillor och trevåningshus från 1930–40-tal dominerar. Äldre tak i området har ofta samma problem under pannorna: sliten papp, uttorkade tätningar och beslag som börjat rosta. Vi byter det som behöver bytas, säkerställer rätt ventilation och lämnar 10 års utförandegaranti på arbetet.",
    extraContent:
      "Vi går igenom förutsättningarna i Abrahamsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Abrahamsberg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Abrahamsberg?",
      answer:
        "Priset för ett takbyte i Abrahamsberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Abrahamsberg",
    lat: 59.3372,
    lng: 17.9394,
    nearbyLocations: ["Bromma", "Ängby", "Blackeberg"],
  },
  {
    slug: "angby",
    name: "Ängby",
    region: "Västerort",
    isIsland: false,
    description: "Takbyte och takomläggning i Norra Ängby i Bromma, med småstugor och radhus från 1930-talet. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription: "Norra Ängby i Västerort räknas till Stockholms trädgårdsstäder och gränsar bland annat till Bromma kyrka, Åkeshov, Södra Ängby, Blackeberg och Beckomberga. I östra delen ligger Kyrksjölötens naturreservat. Marken har brukats sedan länge: i Björklunds hage finns ett gravfält med 68 gravar från järnåldern, och vid Runstensvägen står Ängbystenen kvar på den plats där den restes på 1100-talet. Karsviks Östergård vid Tegnebyvägen är en kvarleva från de gamla bondebyarnas tid. Stockholms stad köpte redan 1904 bland annat egendomarna Åkeshov och Stora Ängby för framtida bebyggelse, men arbetet med vägar, vatten och avlopp började först hösten 1930. Stadsplanen från 1930 signerades av stadsplanedirektören Albert Lilienberg och arkitekten Thure Bergentz. Enligt Wikipedia byggdes här 1 320 egna hem under åren 1930–1941: trähus i ett eller två plan samt ett radhusområde. De flesta husen byggdes genom självbyggeri, organiserat av Stockholms stads småstugebyrå och fastighetskontoret, med fastighetsdirektören Axel Dahlberg som drivande kraft och Edvin Engström som arkitekt. Den blivande husägaren betalade ingen kontantinsats, utan gjorde i stället eget byggarbete motsvarande en del av byggkostnaden. År 1931 stod de första 201 husen klara, huvudsakligen i ett och ett halvt plan, och byggandet fortsatte under hela 1930-talet. Marken upplåts med tomträtt, och i dag kan husägare också köpa sin tomt. Utmed Bällstavägen uppförde HSB radhus 1931, och i områdets mitt ligger Ängby torg, ett typiskt trädgårdsstadstorg vars första hus stod klara 1930. År 1956 besökte drottning Elizabeth II en småstuga på Anundsvägen under sitt statsbesök.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Ängby?","answer":"Byggperiod enligt källorna: 1930–1941 (huvuddelen 1931–38), enplansvillor 1948–49. Hustyper: småstugor/villor i trä (1–2 plan), radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Ängby",
    lat: 59.3372,
    lng: 17.8981,
    nearbyLocations: ["Bromma","Nockeby","Blackeberg"],
    factBox: [{"label":"Kommun","value":"Stockholm (Bromma)"},{"label":"Hustyper","value":"Småstugor/villor i trä (1–2 plan), radhus"},{"label":"Byggperiod","value":"1930–1941 (huvuddelen 1931–38), enplansvillor 1948–49"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 500 (Områdesfakta 2025)"}],
    sourceLink: {"label":"Wikipedia: Norra Ängby","url":"https://sv.wikipedia.org/wiki/Norra_%C3%84ngby"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Norra Ängby, Bromma",
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småstugorna och radhusen i Norra Ängby är i dag runt 85–95 år gamla, och enplansvillorna från 1948–49 är runt 75 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlag, läkt och plåtdetaljer ofta det som behöver ses över. Eftersom många hus byggdes efter samma typritningar kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Norra Ängby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "kista",
    name: "Kista",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Kista — takbyte och takrenovering i Kista. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Kista är kontors- och bostadsstadsdel i nordvästra Stockholm. Bebyggelsen består till stor del av flacka tak på kontorsfastigheter och flerbostadshus. Vi utför takbyte, takrenovering och takomläggning i Kista med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Vi börjar alltid med en kostnadsfri takkontroll på plats och en skriftlig offert med fast pris.",
    extraContent:
      "Vi går igenom förutsättningarna i Kista — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Kista.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Kista?",
      answer:
        "Priset för ett takbyte i Kista beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Kista",
    lat: 59.4033,
    lng: 17.9444,
    nearbyLocations: ["Akalla", "Spånga", "Helenelund"],
  },
  {
    slug: "akalla",
    name: "Akalla",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Akalla — takbyte och takrenovering i Akalla. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Vi tar uppdrag för takbyte och takrenovering i Akalla (norra Järvaområdet). Här handlar det oftast om miljonprogramsbebyggelse med papp- och plåttak, och vi anpassar material, infästning och plåtdetaljer efter husets ålder och läge. Efter takkontrollen får du ett fast pris och besked om vad som ingår.",
    extraContent:
      "Vi går igenom förutsättningarna i Akalla — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Akalla.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Akalla?",
      answer:
        "Priset för ett takbyte i Akalla beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Akalla",
    lat: 59.4147,
    lng: 17.9161,
    nearbyLocations: ["Kista", "Tensta", "Spånga"],
  },
  {
    slug: "tensta",
    name: "Tensta",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Tensta — takbyte och takrenovering i Tensta. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Tensta — del av Järvafältet — har ett fastighetsbestånd med flerbostadshus från 1970-talet med stora takytor. RoslagsTak utför kompletta takprojekt i Tensta: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Tensta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Tensta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Tensta?",
      answer:
        "Priset för ett takbyte i Tensta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Tensta",
    lat: 59.3944,
    lng: 17.9017,
    nearbyLocations: ["Spånga", "Akalla", "Kista"],
  },
  {
    slug: "saltsjobaden",
    name: "Saltsjöbaden",
    region: "Östra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Saltsjöbaden, med villastaden på Neglingeön från 1890-talet och senare villakvarter. Kostnadsfri takkontroll och fast pris.",
    longDescription: "Saltsjöbaden ligger i Nacka, ungefär en och en halv mil från Stockholm, och omfattar Neglingeön, en halvö på cirka 75 hektar mellan Baggensfjärden och Neglingeviken, samt områdena väster om viken med bland annat Igelboda, Neglinge, Tattby och Solsidan. Orten grundades på 1890-talet på initiativ av K.A. Wallenberg och Ernest Thiel, som ville skapa en villa- och badort vid Östersjökusten nära Stockholm. Idén föddes under en resa till badorten Trouville-sur-Mer i Normandie, och marken köptes 1889 från godset Erstavik. Grand Hotel Saltsjöbaden stod färdigt 1893, och här slöts Saltsjöbadsavtalet mellan LO och SAF 1938. Det gamla namnet Rösunda, efter ett fiskartorp, byttes mot Saltsjöbaden. Från den tidigare lantliga bebyggelsen finns Neglinge gårds tre hus kvar, i dag hembygdsgård, och de räknas tillsammans med fiskartorpet Rösunda som ortens äldsta bevarade byggnader. Villabebyggelsen började på Neglingeön. Enligt Wikipedia visar en tomtkarta från 1892 120 avstyckade tomter, och 1896 var minst 64 av dem bebyggda med villor, främst längs Ringvägens östra del och vid Saltsjöpromenaden. Enligt alla.csv, som bygger på Wikipedia, växte villastaden fram mellan 1891 och 1912, då en stadsplan kom till, och den byggdes sedan ut efter andra världskriget. Stadsbilden präglas fortfarande av arkitektritade villor, och Saltsjöbaden är i dag riksintresse för kulturmiljövården.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Saltsjöbaden?","answer":"Byggperiod enligt källorna: villastad 1891–1912, utbyggnad efter andra världskriget. Hustyper: villor (villastad). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Saltsjöbaden",
    lat: 59.2828,
    lng: 18.3078,
    nearbyLocations: ["Nacka","Fisksätra","Storängen och Saltsjö-Duvnäs"],
    factBox: [{"label":"Kommun","value":"Nacka"},{"label":"Delområden","value":"Neglinge, Tattby, Igelboda, Solsidan, Rösunda, Pålnäs, Skogsö, Ljuskärr, Älgö"},{"label":"Hustyper","value":"Villor (villastad)"},{"label":"Byggperiod","value":"Villastad 1891–1912, utbyggnad efter andra världskriget"},{"label":"Kulturmiljö","value":"Riksintresse för kulturmiljövården"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 2 100"}],
    sourceLink: {"label":"Wikipedia: Saltsjöbaden","url":"https://sv.wikipedia.org/wiki/Saltsj%C3%B6baden"},
    parentLocation: {"name":"Nacka","slug":"nacka"},
    h1Override: "Takläggare i Saltsjöbaden, Nacka",
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Saltsjöbaden står villor från 1890-talet sida vid sida med hus från efterkrigstiden och senare. De äldsta villorna är över hundra år gamla, medan efterkrigstidens hus är runt 60–75 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På de äldre arkitektritade villorna är takets form, material och detaljer ofta en viktig del av husets uttryck. Eftersom Saltsjöbaden är riksintresse för kulturmiljövården är det extra viktigt att ta reda på vad som gäller innan ett byte av material eller kulör. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Saltsjöbaden och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "fisksatra",
    name: "Fisksätra",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Fisksätra — takbyte och takrenovering i Fisksätra. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Bland flerbostadshus från 1970-talet är det vanligt att underlagspappen tjänat ut långt före själva taktäckningen — då räcker det sällan att byta enstaka pannor. Vi går igenom konstruktionen, föreslår en lösning som passar taket och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Fisksätra — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Fisksätra.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Fisksätra?",
      answer:
        "Priset för ett takbyte i Fisksätra beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Fisksätra",
    lat: 59.2925,
    lng: 18.2306,
    nearbyLocations: ["Saltsjöbaden", "Nacka", "Älta"],
  },
  {
    slug: "saltsjo-boo",
    name: "Saltsjö-Boo",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Saltsjö-Boo — takbyte och takrenovering i Saltsjö-Boo. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Saltsjö-Boo — sjönära villaområde i norra Nacka — har ett fastighetsbestånd med villor från 1950-tal till nyproduktion. Betongpannor kan drabbas av frostsprängning och underlagspapp torkar ut och spricker med åren, vilket är exempel på skäl till att ett tak till slut kan behöva bytas eller läggas om. RoslagsTak utför kompletta takprojekt i Saltsjö-Boo: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris efter en kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Saltsjö-Boo — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Saltsjö-Boo.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Saltsjö-Boo?",
      answer:
        "Priset för ett takbyte i Saltsjö-Boo beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Saltsjö-Boo",
    lat: 59.3319,
    lng: 18.2422,
    nearbyLocations: ["Nacka", "Saltsjöbaden", "Gustavsberg"],
  },
  {
    slug: "alta",
    name: "Älta",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Älta i Nacka: Kolarängen, Hedvigslund, Lovisedal och Ältadalen, med hus från 1900-talets början till i dag. Kostnadsfri takkontroll.",
    longDescription:
      "Älta ligger i den sydvästra delen av Nacka kommun. Älta gård nämns enligt Wikipedia redan 1397, i ett köpebrev där namnet skrivs Elpta, och gården har under århundradena lytt under både Tyresö slott och Erstavik. Den äldsta bevarade byggnaden är Lovisedalstorpet från senare delen av 1700-talet, som på 1990-talet flyttades till Älta gård. Dagens bebyggelse började med Franz Witte, som köpte Älta gård 1880 och i slutet av 1800-talet började stycka marken för fritidshus och villor. År 1908 tog AB Witte & Co över tomtförsäljningen, som fortsatte in på 1930-talet, och Wittes väg i Lovisedal har namn efter honom. År 1925 var enligt Wikipedia omkring 1 000 tomter bebyggda, de flesta med en- eller tvåfamiljshus, och en stor del av dem var sommarhus. Elektricitet kom först 1926. En byggnadsordning från 1928 bestämde att en tomt för ett enfamiljshus skulle vara minst 1 500 kvadratmeter. I början av 1940-talet infördes ett nybyggnadsförbud, bland annat på grund av problem med vatten och avlopp, och det gällde in på 1960-talet. Efter förbudet byggdes Stensö, 1965–1971. Kolarängen, på ömse sidor om Ältavägen i norra Älta, har enligt Wikipedia bebyggelse huvudsakligen från 1950- till 1970-talen, mest villor men också radhus och parhus. Norra Hedvigslund bebyggdes på 1920-talet, först med sommarstugor och senare huvudsakligen med villor, och har kvar sitt slingrande, småskaliga vägnät. I södra Hedvigslund byggdes från 2008 ett nytt område med småhus, parhus, radhus och mindre flerbostadshus, och i den gamla grustäkten Ältadalen planerades omkring 220 bostäder i småhus, med en detaljplan som vann laga kraft 2015.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Nacka" },
      { label: "Delområden", value: "Kolarängen, Hedvigslund, Lovisedal, Ältadalen, Älta gård, Stensö" },
      { label: "Hustyper", value: "Villor, radhus, parhus, flerbostadshus" },
      { label: "Byggperiod", value: "Tomtförsäljning slutet av 1800-talet till 1930-talet, Kolarängen 1950–1970-tal, Stensö 1965–1971, södra Hedvigslund från 2008, Ältadalen (detaljplan 2015)" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 2 350" },
    ],
    sourceLink: { label: "Wikipedia: Älta", url: "https://sv.wikipedia.org/wiki/%C3%84lta" },
    parentLocation: { name: "Nacka", slug: "nacka" },
    h1Override: "Takläggare i Älta, Nacka",
    uniqueFAQ: {
      question: "När byggdes husen i Älta?",
      answer:
        "Byggperiod enligt källorna: tomtförsäljning från slutet av 1800-talet till 1930-talet, Kolarängen 1950- till 1970-tal, Stensö 1965–1971, södra Hedvigslund från 2008 och Ältadalen med detaljplan från 2015. Hustyper: villor, radhus, parhus och flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Älta",
    lat: 59.2681,
    lng: 18.1725,
    nearbyLocations: ["Nacka", "Tyresö", "Fisksätra"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Älta skiljer det ett sekel mellan de äldsta och de nyaste husen. Villorna från tomtförsäljningens tid är i dag runt hundra år gamla, husen i Kolarängen runt 55–75 år och husen i södra Hedvigslund och Ältadalen högst 20 år. Taken på de äldre husen kan redan ha lagts om, kanske mer än en gång, och i de nya områdena är ett takbyte inte aktuellt. Det är därför huset och inte adressen som avgör. En stor del av de tidiga husen var sommarhus. Ett sommarhus som har blivit åretruntbostad har i regel byggts om och till, och då finns det ofta takdelar av olika ålder på samma hus. Skarvarna mellan dem, ränndalarna och genomföringarna är det som behöver granskas noga, tillsammans med underlagspapp, läkt och plåtdetaljer. På radhusen och parhusen i Kolarängen och södra Hedvigslund delar taket anslutning med grannens, och den behöver planeras ihop med grannen. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Älta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "gustavsberg",
    name: "Gustavsberg",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Gustavsberg — takbyte och takrenovering i Gustavsberg. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi utför takbyte och takomläggning i Gustavsberg, Värmdös centralort med bruksbebyggelse. Bebyggelsen består till stor del av äldre bruksbostäder, villor och nyproduktion, och de skador vi oftast hittar vid takkontroll är spröd underlagspapp, rostiga beslag och otäta genomföringar kring skorsten och ventilation. Vi går igenom hela takkonstruktionen innan vi lämnar fast pris, och du har samma kontaktperson från takkontroll till slutgenomgång.",
    extraContent:
      "Vi går igenom förutsättningarna i Gustavsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Gustavsberg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Gustavsberg?",
      answer:
        "Priset för ett takbyte i Gustavsberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Gustavsberg",
    lat: 59.3269,
    lng: 18.3906,
    nearbyLocations: ["Värmdö", "Hemmesta", "Ingarö"],
  },
  {
    slug: "ingaro",
    name: "Ingarö",
    region: "Östra Stockholm",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Ingarö i Värmdö, där fritidshus har byggts om till villor: Brunn, Fågelvikshöjden, Långvik med flera. Kostnadsfri takkontroll.",
    longDescription:
      "Ingarö är en ö i Värmdö kommun, skild från grannön Värmdö i norr genom det smala sundet Kolström. Ön är drygt 62 kvadratkilometer stor, och enligt Wikipedia har här funnits bofast befolkning sedan bronsåldern, vilket hällristningar vittnar om. Det som har format dagens bebyggelse är fritidshusen. Under de senaste hundra åren ökade antalet fritidsboende, medan de bofasta under en period blev färre. Sedan vände det: enligt Wikipedia har allt fler fritidshus byggts om till villor, och fler permanentbostäder har byggts, vilket förklaras med att vägarna gör det möjligt att pendla till Stockholm. År 1995 bodde omkring 3 500 personer fast på ön, 1999 omkring 4 500 och 2012 över 9 000. Brunn är öns huvudort, med skola, mataffär och idrottsplats, och är enligt SCB sammanvuxen med Fågelvikshöjden. På Ingarö kyrkogård ligger flygpionjären Carl Cederström begravd, och två vägar i Brunn har namn efter honom. Bland de övriga orterna finns Långvik, Återvall, Ingaröstrand och Lugnet och Skälsmara, som Wikipedia beskriver som två småhusområden. Björnömalmen och Klacknäset, längst ut på ön, beskrivs som två fritidshusområden. Omvandlingen pågår fortfarande. Värmdö kommun skriver att den arbetar för att förbättra boendemiljön för dem som vill bosätta sig permanent i tidigare fritidshusområden, och har pekat ut prioriterade förändringsområden där kommunalt vatten och avlopp och detaljplaner ska komma först. På kommunens lista finns bland annat Återvall och Fågelvik-Nykvarn. Enligt kommunens riktlinjer bör detaljplanerna där tillåta endast friliggande enbostadshus, med en högsta nockhöjd på 9,0 meter för huvudbyggnaden.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Värmdö" },
      { label: "Delområden", value: "Brunn, Fågelvikshöjden, Återvall, Långvik, Lugnet och Skälsmara, Ingaröstrand, Björnömalmen och Klacknäset med flera" },
      { label: "Hustyper", value: "Villor, fritidshus ombyggda till villor, fritidshus" },
      { label: "Byggperiod", value: "Inte belagd i källorna" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 400 (Ingarö söder) + ca 1 290 (Ingarö norr)" },
    ],
    sourceLink: { label: "Wikipedia: Ingarö", url: "https://sv.wikipedia.org/wiki/Ingar%C3%B6" },
    parentLocation: { name: "Värmdö", slug: "varmdo" },
    h1Override: "Takläggare på Ingarö, Värmdö",
    uniqueFAQ: {
      question: "Vilka hustyper finns på Ingarö?",
      answer:
        "Enligt källorna finns här villor, fritidshus som har byggts om till villor och kvarvarande fritidshus, i orter som Brunn, Fågelvikshöjden, Långvik och Återvall. En exakt byggperiod för husen är inte belagd i de källor vi använder. Taken kan vara allt från nylagda till mycket gamla, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Ingarö",
    lat: 59.2839,
    lng: 18.4667,
    nearbyLocations: ["Värmdö", "Gustavsberg", "Hemmesta"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Källorna anger ingen byggperiod för husen på Ingarö, och det går inte att säga hur gamla de är i allmänhet. Här finns fritidshus, fritidshus som har byggts om till villor och nybyggda permanentbostäder sida vid sida, och taken kan ha lagts om vid helt olika tillfällen. När ett fritidshus görs om till åretruntbostad byggs det ofta till, och då hamnar tak från olika tider på samma hus. Det är i mötet mellan dem som en takkontroll gör mest nytta: i ränndalar, vid anslutningar mot vägg och runt genomföringar. Underlagspapp, läkt, plåtdetaljer och hängrännor bedöms på plats, oavsett när huset byggdes. Där träd står nära huset fylls hängrännor och ränndalar lätt med barr och löv, och det är värt att hålla dem rena. Ligger huset i ett område där en ny detaljplan är på väg kan det vara bra att känna till det innan en större ombyggnad planeras. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du på Ingarö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "hemmesta",
    name: "Hemmesta",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Hemmesta — takbyte och takrenovering i Hemmesta. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Hemmesta är tätort i centrala Värmdö. Bebyggelsen består till stor del av villaområden och radhus. Vi utför takbyte, takrenovering och takomläggning i Hemmesta med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Vi börjar alltid med en kostnadsfri takkontroll på plats och en skriftlig offert med fast pris.",
    extraContent:
      "Vi går igenom förutsättningarna i Hemmesta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Hemmesta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Hemmesta?",
      answer:
        "Priset för ett takbyte i Hemmesta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Hemmesta",
    lat: 59.3175,
    lng: 18.5194,
    nearbyLocations: ["Värmdö", "Gustavsberg", "Ingarö"],
  },
  {
    slug: "trollbacken",
    name: "Trollbäcken",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Trollbäcken — takbyte och takrenovering i Trollbäcken. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Trollbäcken är ett stort villaområde i Tyresö med villor från 1950–70-tal med betongpannor. Vid en kostnadsfri takkontroll kontrollerar vi underlagspapp, läkt, råspont, plåtbeslag och ventilation under taket — det är där ett takbyte avgörs. Du får en skriftlig bedömning och ett fast pris innan något arbete påbörjas.",
    extraContent:
      "Vi går igenom förutsättningarna i Trollbäcken — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Trollbäcken.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Trollbäcken?",
      answer:
        "Priset för ett takbyte i Trollbäcken beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Trollbäcken",
    lat: 59.2542,
    lng: 18.2064,
    nearbyLocations: ["Tyresö", "Älta", "Vendelsö"],
  },
  {
    slug: "brandbergen",
    name: "Brandbergen",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Brandbergen — takbyte och takrenovering i Brandbergen. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Brandbergen — bostadsområde i Haninge — har ett fastighetsbestånd med flerbostadshus med stora flacka takytor. RoslagsTak utför kompletta takprojekt i Brandbergen: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Brandbergen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Brandbergen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Brandbergen?",
      answer:
        "Priset för ett takbyte i Brandbergen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Brandbergen",
    lat: 59.1614,
    lng: 18.1547,
    nearbyLocations: ["Handen", "Haninge", "Vendelsö"],
  },
  {
    slug: "handen",
    name: "Handen",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Handen — takbyte och takrenovering i Handen. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Handen är Haninges centralort. Bebyggelsen består till stor del av blandad bebyggelse med villor och bostadsrättsfastigheter. Vi utför takbyte, takrenovering och takomläggning i Handen med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll och ett fast pris. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Handen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Handen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Handen?",
      answer:
        "Priset för ett takbyte i Handen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Handen",
    lat: 59.1686,
    lng: 18.1367,
    nearbyLocations: ["Haninge", "Brandbergen", "Jordbro"],
  },
  {
    slug: "jordbro",
    name: "Jordbro",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Jordbro — takbyte och takrenovering i Jordbro. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi lägger tak i Jordbro, södra Haninge, där radhus och flerbostadshus från 1970-talet dominerar. Äldre tak i området har ofta samma problem under pannorna: sliten papp, uttorkade tätningar och beslag som börjat rosta. Vi byter det som behöver bytas, säkerställer rätt ventilation och lämnar 10 års utförandegaranti på arbetet.",
    extraContent:
      "Vi går igenom förutsättningarna i Jordbro — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Jordbro.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Jordbro?",
      answer:
        "Priset för ett takbyte i Jordbro beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Jordbro",
    lat: 59.1381,
    lng: 18.1272,
    nearbyLocations: ["Handen", "Västerhaninge", "Haninge"],
  },
  {
    slug: "vasterhaninge",
    name: "Västerhaninge",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Västerhaninge, med villor och grupphus från 1940-talet och framåt. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Västerhaninge är en tätort och kommundel i Haninge kommun på Södertörn, omkring 25 kilometer från Stockholms innerstad. Bygden är gammal. Västerhaninge kyrka uppfördes på 1200-talet, och det första kända belägget för ortnamnet är från omkring 1314, då det skrevs Westrahanunge. Även Ribby, Nedersta och Fors är enligt Wikipedia skriftligt kända sedan 1300-talet. Tillsammans med Jordbrogravfältet bildar Åbygravfältet, som till stor del sannolikt ligger under den gamla kyrkbyn, Nordens största kända gravfält från äldre järnåldern. Stationssamhället kom till efter att Nynäsbanan invigdes den 28 december 1901. Vid kyrkan fanns då stationshus, gästgiveri, handelsbod och apotek. Järnvägen blev enligt Wikipedia avgörande för utvecklingen under 1900-talet, särskilt efter 1950, då befolkningen ökade och nya bostadsområden byggdes. Åren 1933–34 rätades Nynäsvägen, och då tillkom också det första finförgrenade vägnätet för den nya villabebyggelsen sydväst om kyrkan. Mellan 1953 och 1970 uppfördes de flesta av ortens flerfamiljshus, 1969 invigdes Västerhaninge köpcentrum och 1973 kom pendeltågen i gång. I dag finns enligt Wikipedia både bostadsrätter, hyresrätter och flera områden med villor och grupphus, där de äldsta är från mitten av 1940-talet. Under senare år har nya bostadsområden tillkommit, som Ribby ängar, Skarplöt och Nedersta. Närbutiker finns ute i bostadsområdena, bland annat i Åby och Ribby, och i norr tar Hanvedens skogar vid. Järnvägen delar Västerhaninge i två delar, och närmast väster om spåren ligger enligt Wikipedia Åbylund, Norrskogen och Jägartorp. I nordväst tar Hanvedens skogar vid. Hur villakvarteren här kom till beskrivs i den kulturmiljöinventering som Stiftelsen Kulturmiljövård gjorde på uppdrag av Haninge kommun. Nynäsbanan blev klar 1901, men enligt inventeringen byggdes det till en början lite. Det mesta av marken ägdes av gårdarna i Ribby och Nödesta, och Ribbys ägor sträckte sig från Jägartorp i norr till Ribbylund i söder. Omkring 1919 köpte bolaget AB Hem på landet ungefär 100 hektar av Ribbys mark för att stycka den till små jordbruk och villatomter. Bolaget ville främja egnahemsbyggandet och småjordbruket och motverka utvandringen till Amerika. Tre områden med småhus planerades, och enligt inventeringen anpassades hus och gator till terrängen, med friliggande hus i grönska. En villa från 1921 räknas i inventeringen till de första nya husen i Norrskogen. Den byggdes av en snickare som kallades Millimeter-Kalle och som var känd för sin noggrannhet. Vid mitten av 1940-talet fanns ungefär 90 bostads- och trädgårdslägenheter på Ribbys tidigare marker, främst i Norrskogen och kring Nynäsvägen. Från 1940-talet ökade byggandet av egnahem, villor och småhus, och takten steg under 1950- och 1960-talen. Enligt inventeringen förtätades de befintliga villaområdena, särskilt väster om Nynäsvägen, och ny mark bebyggdes vid Ribbylund, Jägartorp och i norra Norrskogen. Garaget blev under 1950-talet en del av bostadshuset, och planlagda grupphusområden hör till 1970-talet.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Haninge" },
      { label: "Delområden", value: "Ribby, Nödesta, Norrskogen, Jägartorp (centrala och västra Västerhaninge)" },
      { label: "Hustyper", value: "Villor, egnahem, radhus, kedjehus" },
      { label: "Byggperiod", value: "Från mitten av 1940-talet, mest efter 1950" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 680" },
    ],
    sourceLink: { label: "Wikipedia: Västerhaninge", url: "https://sv.wikipedia.org/wiki/V%C3%A4sterhaninge" },
    parentLocation: { name: "Haninge", slug: "haninge" },
    h1Override: "Takläggare i Västerhaninge, Haninge",
    uniqueFAQ: {
      question: "När byggdes husen i Västerhaninge?",
      answer:
        "Byggperiod enligt källorna: de äldsta villorna och grupphusen från mitten av 1940-talet, mest av småhusbebyggelsen från decennierna efter 1950. Hustyper: villor, egnahem, radhus och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Västerhaninge",
    lat: 59.1222,
    lng: 18.1086,
    nearbyLocations: ["Haninge", "Jordbro", "Tungelsta", "Handen"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De äldsta villorna och grupphusen i centrala Västerhaninge är i dag runt 80 år gamla, och mycket av småhusbebyggelsen kom till under decennierna efter 1950. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Egnahemmen från 1920-talet är i dag runt 100 år gamla, och villorna från 1950- och 1960-talen mellan 60 och 75 år. Taken kan redan ha lagts om, på de tidiga husen kanske mer än en gång, och husets ålder säger därför inget säkert om takets skick. Det som avgör är vad som finns under ytan i dag: underlagspapp, läkt, plåtdetaljer och hängrännor. I de nyaste områdena är taken betydligt yngre. Där ett garage eller en tillbyggnad har satts ihop med bostadshuset möts två tak, och anslutningen är värd en extra titt. För de miljöer som inventeringen pekar ut som särskilt värdefulla är riktlinjen att husens ursprungliga fasad- och takmaterial behålls, så ta reda på vad som gäller ditt hus innan du väljer material. I grupphusområden, där husen är byggda samtidigt och ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får en egen takkontroll och ett eget pris. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Västerhaninge och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "tungelsta",
    name: "Tungelsta",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Tungelsta, trädgårdsstaden vid Nynäsbanan med egnahem från 1908 och småhus från 1940- och 1960-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Tungelsta är en kommundel i Haninge och en del av tätorten Västerhaninge. Enligt Wikipedia gränsar den i nordväst mot Hanvedens skogar, i nordost mot övriga Västerhaninge och i söder och väster mot jordbrukslandskap. Hit räknas områden som Krigslida, Hammarängen och Lillgården. Nynäsbanan har två stationer här: Tungelsta från 1901 och Krigslida från 1980. Före järnvägen var bygden jordbruksmark med byar och gårdar som Tungelsta by, Ålsta, Skogs-Ekeby, Mulsta och Välsta. Det framgår av Haninge kommuns kulturmiljöinventering från 2017. Från 1908 köpte bolaget Hem på Landet mark från bland annat Skogs-Ekeby och Ålstagårdarna och sålde tomter för egnahem och handelsträdgårdar i det som blev Skogs-Ekeby, Ålsta och Tungelsta trädgårdsstad. I Skogs-Ekeby såldes tomter fram till 1920-talet. Rocklösaån gav vatten och järnvägen snabba transporter till Stockholm, och det första trädgårdsmästeriet, Rosgården, startade 1908. I början av 1940-talet fanns enligt kommunen över 100 anläggningar, och växthusen och deras skorstenar präglade orten under en stor del av 1900-talet. Under 1940-talet gjordes tre byggnadsplaner för den östra delen, kring Krigslida, på mark som inte hade varit bebyggd. Tomterna var avsedda för trädgårdsbruk och egna hem, och bostäderna blev enligt inventeringen nästan bara småhus, byggda efter hand under åren som följde. På 1960-talet kom fler planer på tidigare åkermark, och då byggdes främst radhus och småhus. När handelsträdgårdarna blev färre revs många växthus och ersattes av bostäder. Norr om järnvägen har bebyggelsen enligt kommunen tonvikt på småhus, och söder om den har nya hus byggts bland annat i Lillgården.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Haninge"},{"label":"Delområden","value":"Krigslida, Hammarängen, Lillgården, Skogs-Ekeby, Ålsta"},{"label":"Hustyper","value":"Egnahem och villor, radhus, kedjehus, flerbostadshus centralt och i Lillgården"},{"label":"Byggperiod","value":"Egnahem från 1908 till 1920-talet, småhus efter 1940-talets byggnadsplaner, radhus och småhus efter 1960-talets planer"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 520 i Tungelsta centrala och ca 1 220 i Tungelsta norra (SCB, 2025)"}],
    sourceLink: {"label":"Haninge kommun: Kulturmiljöinventering Tungelsta (2017/2018, PDF)","url":"https://www.haninge.se/contentassets/a0ac2055bd474a83a51e4fbe339913fe/tungelsta_tillganglig.pdf"},
    parentLocation: {"name":"Haninge","slug":"haninge"},
    h1Override: "Takläggare i Tungelsta, Haninge",
    uniqueFAQ: {"question":"När byggdes husen i Tungelsta?","answer":"Byggperiod enligt källorna: egnahem från 1908 till 1920-talet, småhus efter 1940-talets byggnadsplaner, radhus och småhus efter 1960-talets planer. Hustyper: egnahem och villor, radhus, kedjehus, flerbostadshus centralt och i Lillgården. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Tungelsta",
    lat: 59.1,
    lng: 18.045,
    nearbyLocations: ["Västerhaninge", "Nynäshamn", "Jordbro"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Tungelsta står hus från tre skeden. Egnahemmen från trädgårdsstädernas tid, 1908 till 1920-talet, är i dag runt 100 år eller äldre. Småhusen från 1940-talets planer är runt 80 år och husen från 1960-talet runt 60 år. Taken kan redan ha lagts om, på de första egnahemmen kanske flera gånger, och husets ålder säger därför inget säkert om takets skick. Det som avgör är underlagspapp, läkt, plåtdetaljer och hängrännor som de ser ut i dag. På radhus hänger taken ihop med grannens, och anslutningen behöver fungera åt båda håll. Kommunens inventering pekar ut särskilt värdefulla kulturmiljöer och skriver att anmälan kan krävas innan åtgärder utförs på byggnader där. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Tungelsta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "dalaro",
    name: "Dalarö",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Dalarö, skärgårdsorten i Haninge med hus från badortstiden på 1800-talet och fritidshus från 1950-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Dalarö är en tätort i Haninge kommun och en skärgårdsort i Stockholms södra skärgård. Orten ligger vid den stora farleden söderifrån in mot Stockholm, och Wikipedia beskriver socknen som en kuperad bergs- och skogsbygd. Samhället har anor från 1630-talet. Ett första tullhus inrättades 1636, när Dalarö blev yttre tullstation för Stockholm, och kring det växte orten upp. Under stormaktstiden kom flottan regelbundet hit, och en garnison låg vid Dalarö skans. Det tullhus som står kvar byggdes 1788 efter ritningar av Erik Palmstedt och är byggnadsminne sedan 1935. När garnisonen lades ner 1854 blev Dalarö i stället badort, med hotell, restauranger och småbåtshamn. Ett kallbadhus hade öppnat 1849, och ett par år senare kom ett varmbadhus. Societetshuset är uppfört i timmer i två våningar och fick enligt Wikipedia troligen sitt nuvarande utseende på 1860-talet, med en fasad i schweizerstil. Tullvaktstugan vid vattnet är från 1861 och ritad i samma stil. Till sommargästerna hörde Anders Zorn, Carl Larsson och August Strindberg. Mellan 1876 och utgången av 1951 var Dalarö ett municipalsamhälle. Väster om Dalarö ligger Schweizerdalen, som 1937 var ett villaområde i municipalsamhället. Enligt Wikipedia exploaterades området i början av 1950-talet för havsbad och fritidsbebyggelse, och av de 328 fastigheterna där bebos i dag drygt hälften permanent. Sedan 2015 räknas Schweizerdalen, Smådalarö och Malmen-Kolbotten till tätorten Dalarö.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Haninge" },
      { label: "Delområden", value: "Dalarö, Schweizerdalen, Smådalarö, Malmen-Kolbotten" },
      { label: "Hustyper", value: "Bebyggelse från badortstiden, villor, fritidshus" },
      { label: "Byggperiod", value: "Samhälle sedan 1630-talet, badort från 1854, Schweizerdalen exploaterat i början av 1950-talet" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 660" },
    ],
    sourceLink: { label: "Wikipedia: Dalarö", url: "https://sv.wikipedia.org/wiki/Dalar%C3%B6" },
    parentLocation: { name: "Haninge", slug: "haninge" },
    h1Override: "Takläggare i Dalarö, Haninge",
    uniqueFAQ: {
      question: "När byggdes husen på Dalarö?",
      answer:
        "Byggperiod enligt källorna: samhälle sedan 1630-talet, badort från 1854, och Schweizerdalen exploaterat i början av 1950-talet för havsbad och fritidsbebyggelse. Hustyper: bebyggelse från badortstiden, villor och fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Dalarö",
    lat: 59.1339,
    lng: 18.4064,
    nearbyLocations: ["Haninge", "Handen", "Nynäshamn"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "På Dalarö står hus från mycket olika tider. Husen från badortens första årtionden, som societetshuset och tullvaktstugan, är i dag runt 160 år gamla, medan fritidshus från Schweizerdalens utbyggnad i början av 1950-talet är runt 75 år. Taken kan redan ha lagts om, på de tidiga husen kanske flera gånger, och husets ålder säger därför inget säkert om takets skick. På hus med verandor, burspråk och utbyggnader finns många vinklar och anslutningar, och det är där plåtarbetet avgör hur tätt taket blir. Har ett fritidshus byggts om eller byggts till för att bo i året om möts tak från olika tider, och de skarvarna är värda en extra titt. Den som vill byta material eller kulör bör ta reda på vad som gäller först. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du på Dalarö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "stuvsta",
    name: "Stuvsta",
    region: "Södra Stockholm",
    isIsland: false,
    description: "Takbyte i Stuvsta i Huddinge, från 1920-talsvillor till rad- och kedjehus i Myrängen. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription: "Stuvsta växte fram kring järnvägen. När Stuvsta gård såldes 1908 köptes marken av privata exploatörer, och 1910 bildades ett fastighetsbolag som styckade tomter för egnahem. Tomtförsäljningen tog fart efter 1918, när stationen vid Västra stambanan öppnade. Närheten till tåget gjorde tomterna attraktiva för pendlare. En tomtstyckningsplan kom 1926, och först 1947 fastställdes en stadsplan för området. Spåren av den tiden syns fortfarande. Stationshuset från 1917–1918, ritat av arkitekten Folke Zetterwall, står kvar med ortens namn på gaveln, och Stuvstakyrkan från 1954 byggdes av tegel från en riven kyrka i Stockholm. Det är en påminnelse om att Stuvsta är ett samhälle med lång historia. I dag består Stuvsta till stor del av småhus, många av dem äldre friliggande villor. Enligt beskrivningar av kommundelen byggdes dessutom rad- och kedjehus i Myrängen under 1980- och 1990-talen. Inom Stuvsta finns också områden som Solfagra, Kynäs, Segersminne och Stensängen. Det gör Stuvsta till en ovanligt blandad kommundel, där en hundraårig villa och ett trettio år gammalt kedjehus kan ligga några kvarter från varandra.",
    extraContent: "Två generationer av tak: För de äldre villorna från 1920- och 1930-talen har taket ofta bytts eller lagts om minst en gång sedan huset byggdes, men det är inte alltid känt när eller hur. Därför är det svårt att säga något generellt om skicket. Ett äldre tak kan dessutom ha detaljer som kräver omsorg vid ett byte, till exempel takkupor, skorstenar och äldre plåtarbeten. Rad- och kedjehusen i Myrängen från 1980- och 90-talen har kommit upp i en ålder där många ägare börjar fundera på takets underlag, plåtdetaljer och hängrännor. Eftersom husen i en länga oftast är likadana och byggdes samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Det är klokt att kontrollera det innan arbetet planeras.",
    factBox: [
      { label: "Kommun", value: "Huddinge" },
      { label: "Delområden", value: "Myrängen, Solfagra, Kynäs, Segersminne, Stensängen" },
      { label: "Hustyper", value: "Villor + rad-/kedjehus" },
      { label: "Byggperiod", value: "Villor 1920–1930-tal, rad-/kedjehus 1980–1990-tal (Myrängen)" },
      { label: "Ägda småhus i området", value: "Ca 2 300 (SCB, 2025)" },
    ],
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Stuvsta?",
      answer:
        "Priset för ett takbyte i Stuvsta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Stuvsta",
    lat: 59.2444,
    lng: 17.9928,
    nearbyLocations: ["Huddinge", "Segeltorp", "Trångsund"],
    parentLocation: {"name":"Huddinge","slug":"huddinge"},
    sourceLink: {"label":"Wikipedia: Stuvsta","url":"https://sv.wikipedia.org/wiki/Stuvsta"},
    h1Override: "Takläggare i Stuvsta, Huddinge",
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten, inget timpris.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Funderar du på att byta eller lägga om taket i Stuvsta? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "trangsund",
    name: "Trångsund",
    region: "Södra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Trångsund vid Drevviken och Magelungen. Villor från styckningsåren och småhus från 1960-talet. Kostnadsfri takkontroll.",
    longDescription: "Mellan sjöarna Drevviken och Magelungen i nordöstra Huddinge ligger Trångsund. Namnet kommer från det trånga sundet i Drevviken. Trångsund nämns första gången 1636 som ett torp, som med tiden blev en mindre herrgård. År 1762 köpte arkitekten Carl Fredrik Adelcrantz Trångsunds gård och lät uppföra en ny mangårdsbyggnad. I samband med 1960-talets utbyggnad fick kommundelen sitt centrum, och Tacksägelsekyrkan, ritad av arkitekten Sture Frölén, invigdes 1957. Platsen har gamla anor. Vid Magelungen ligger Fållan, där stockholmare hade sommarnöjen redan på 1700-talet och där Carl Michael Bellman tillbringade sommaren 1773. Gården finns kvar än i dag. Kommundelen består av åtta delområden: Sjöängen, Nytorp, Stortorp, Hammartorp, Fållan, Mellansjö, Orlångsjö och Svartvik. Bebyggelsen har vuxit fram i etapper. Nynäsbanan blev klar 1901, med egen station i Trångsund, men de styckningsplaner som gjordes då omsattes först i slutet av 1920-talet. I Stortorp skapades mellan 1911 och 1928 över 600 tomter, och i Sjöängen styckades fastigheter av från Trångsunds herrgård. Under 1930- och 40-talen ökade byggandet, och i början av 1960-talet byggdes enligt beskrivningar av kommundelens historia för fullt, både flerbostadshus och småhus. Resultatet är ett område där villor från olika decennier ligger sida vid sida: tidiga hus på styckningstomterna längs järnvägen och en stor våg av småhus från 1960-talet.",
    extraContent: "Tak från olika tider: Ett hus från 1960-talet är i dag över sextio år gammalt. Tak från den tiden kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och avvattning ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. De äldre husen från styckningsåren har ofta byggts om och renoverats i flera omgångar, och skicket varierar därför mycket. Där kan det också finnas äldre detaljer som skorstenar, takkupor och plåtarbeten som behöver hanteras med omsorg vid ett byte. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    factBox: [
      { label: "Kommun", value: "Huddinge" },
      { label: "Delområden", value: "Sjöängen, Nytorp, Stortorp, Hammartorp, Fållan, Mellansjö, Orlångsjö, Svartvik" },
      { label: "Hustyper", value: "Villor, småhus, radhus" },
      { label: "Byggperiod", value: "Styckning 1911–1928 (Stortorp), stor småhusutbyggnad tidigt 1960-tal" },
      { label: "Ägda småhus i området", value: "Ca 1 650 (SCB, 2025)" },
    ],
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Trångsund?",
      answer:
        "Priset för ett takbyte i Trångsund beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Trångsund",
    lat: 59.2258,
    lng: 18.1069,
    nearbyLocations: ["Skogås", "Huddinge", "Farsta"],
    parentLocation: {"name":"Huddinge","slug":"huddinge"},
    sourceLink: {"label":"Wikipedia: Trångsund","url":"https://sv.wikipedia.org/wiki/Tr%C3%A5ngsund"},
    h1Override: "Takläggare i Trångsund, Huddinge",
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. ROT-avdraget på 30 % av arbetskostnaden drar vi direkt på fakturan.","Bor du i Trångsund och undrar hur taket mår? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "skogas",
    name: "Skogås",
    region: "Södra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Östra Skogås och Mörtvik i Huddinge, med radhus, kedjehus och villor från slutet av 1970-talet. Kostnadsfri takkontroll.",
    longDescription: "Skogås ligger i Huddinges nordöstra del, med Trångsund i norr och väster och sjön Drevviken i öster. Kommundelen består från norr till söder av Mörtvik, Östra Skogås, Västra Skogås, Länna och Gräsvreten. Enligt Wikipedia saknar namnet Skogås historisk anknytning och skapades troligen av stadsplanerare på 1930-talet, efter landskapets skog och åsar. Trakten har ändå en lång historia. Redan under vikingatiden användes Drevviken som transportväg, med en färdled ut till Östersjön, och Länna var en av angöringsplatserna. Söder om Länna gård finns ett gravfält från yngre järnåldern. Länna gästgivaregård, i drift från 1630-talet till 1902, låg vid Dalarövägen, en av Stockholms viktiga färdvägar söderut. Före och under första världskriget var området en del av Södra fronten, en försvarslinje genom Huddinge och Tyresö, och rester som Lännafortet och Magelungsfortet finns kvar. Skogås har vuxit fram på utmarker som i norr hörde till Trångsunds gård och i söder till Länna gård. Nynäsbanan drogs fram 1901, men Skogås fick egen station först 1932. Mörtviks gård nämns första gången i början av 1700-talet och var ett torp under Trångsund, som efterhand blev en självständig gård. I början av 1940-talet styckades marken av till sommarstugetomter. De första stadsplanerna för Skogås kom 1961 och 1964, med punkthus och lamellhus kring centrum. Östra Skogås och Mörtvik började planläggas under senare delen av 1970-talet, och målet var enligt Wikipedia ett område med några få flerbostadshus och i övrigt en småskalig bebyggelse med radhus, kedjehus och villor. I Mörtvik finns också en badplats och entrén till Trångsundsskogens naturreservat.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Skogås?","answer":"Byggperiod enligt källorna: planlagt från slutet av 1970-talet. Hustyper: radhus, kedjehus, villor (och några flerbostadshus). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Skogås",
    lat: 59.2286,
    lng: 18.1428,
    nearbyLocations: ["Huddinge","Trångsund","Stuvsta"],
    factBox: [{"label":"Kommun","value":"Huddinge"},{"label":"Delområden","value":"Östra Skogås, Mörtvik"},{"label":"Hustyper","value":"Radhus, kedjehus, villor (och några flerbostadshus)"},{"label":"Byggperiod","value":"Planlagt från slutet av 1970-talet"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 300"}],
    sourceLink: {"label":"Wikipedia: Skogås","url":"https://sv.wikipedia.org/wiki/Skog%C3%A5s"},
    parentLocation: {"name":"Huddinge","slug":"huddinge"},
    h1Override: "Takläggare i Östra Skogås och Mörtvik, Huddinge",
    extraSections: [{ heading: "Vad det betyder för taket", text: "Radhusen, kedjehusen och villorna i Östra Skogås och Mörtvik är i dag runt 40–45 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I radhus- och kedjehusområdena, där husen byggdes samtidigt och är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Östra Skogås eller Mörtvik? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "segeltorp",
    name: "Segeltorp",
    region: "Södra Stockholm",
    isIsland: false,
    description: "Takbyte i Segeltorp, Jakobslund, Smista och Juringe i Huddinge, med villor från 1900-talet och radhus från 1950-talet. Kostnadsfri takkontroll.",
    longDescription: "Segeltorp ligger i Huddinges nordvästra del, på gränsen mot Stockholm, och består från norr till söder av delområdena Jakobslund, Smista, Juringe, Kråkvik och Kolartorp. Namnet kommer från gården Segerstorp, som i husförhörslängderna från 1751 står som dagsverkstorp under Vårby säteri. Enligt en tolkning kommer förleden från ett gammalt ord för vattensjuk mark. Området har en lång historia. På en karta över Vårby sätegård från 1703 finns flera torp vid sockengränsen, och landsvägen till Södertälje, i dag Gamla Södertäljevägen, som färdigställdes 1670, går genom området. Altartorp har rötter från 1540-talet och finns kvar, ombyggt. Kolartorp har använts av Vårby gårds kolare och blev senare soldattorp, och Fullersta kvarn var i bruk från 1689 till slutet av 1800-talet. Mitt i området ligger Juringe gård, där ett gravfält vittnar om bebyggelse redan under yngre järnåldern. Namnet Juringe finns belagt från 1538 och kommer troligen från ett gammalt ord för vildsvin. I början av 1900-talet började tomter styckas av för villor, och namnet ändrades då från Segerstorp till Segeltorp. Segeltorp blev municipalsamhälle 1924 och var det sista i Huddinge att gå upp i den gemensamma organisationen, 1953. Enligt Wikipedia berodde dröjsmålet på försök att bli en del av Stockholms stad, som misslyckades. År 1952 bodde 2 850 personer här. Själva gården Segeltorp, vid dagens Dalvägen, revs 1964, när radhusbebyggelsen växte fram i området. Enligt alla.csv består bebyggelsen av villor från tidigt 1900-tal och radhus främst från 1950-talet.",
    extraContent:
      "",
    uniqueFAQ: {"question":"När byggdes husen i Segeltorp?","answer":"Byggperiod enligt källorna: villor tidigt 1900-tal, radhus främst 1950-tal. Hustyper: villor, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Segeltorp",
    lat: 59.2794,
    lng: 17.945,
    nearbyLocations: ["Huddinge","Snättringe","Fullersta"],
    factBox: [{"label":"Kommun","value":"Huddinge"},{"label":"Delområden","value":"Jakobslund, Smista, Juringe (samt Kråkvik, Kolartorp i kommundelen)"},{"label":"Hustyper","value":"Villor, radhus"},{"label":"Byggperiod","value":"Villor tidigt 1900-tal, radhus främst 1950-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 600"}],
    sourceLink: {"label":"Wikipedia: Segeltorp (kommundel)","url":"https://sv.wikipedia.org/wiki/Segeltorp_(kommundel)"},
    parentLocation: {"name":"Huddinge","slug":"huddinge"},
    h1Override: "Takläggare i Segeltorp, Huddinge",
    extraSections: [{ heading: "Vad det betyder för taket", text: "De äldsta villorna i Segeltorp är i dag runt hundra år gamla, och radhusen från 1950- och 60-talen runt 60–75 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlag, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I radhusområdena, där husen byggdes samtidigt och är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Segeltorp och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "bandhagen",
    name: "Bandhagen",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Bandhagen — takbyte och takrenovering i Bandhagen. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Bandhagen är söderförort med grön karaktär. Bebyggelsen består till stor del av smalhus och radhus från 1950-talet. Vi utför takbyte, takrenovering och takomläggning i Bandhagen med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll och ett fast pris. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Bandhagen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Bandhagen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Bandhagen?",
      answer:
        "Priset för ett takbyte i Bandhagen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Bandhagen",
    lat: 59.2703,
    lng: 18.0475,
    nearbyLocations: ["Högdalen", "Enskede", "Älvsjö"],
  },
  {
    slug: "hogdalen",
    name: "Högdalen",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Högdalen — takbyte och takrenovering i Högdalen. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi utför takbyte och takomläggning i Högdalen, stadsdel i söderort. Bebyggelsen består till stor del av flerbostadshus från 1950-talet med plåt- och papptak, och de skador vi oftast hittar vid takkontroll är spröd underlagspapp, rostiga beslag och otäta genomföringar kring skorsten och ventilation. Vi går igenom hela takkonstruktionen innan vi lämnar fast pris, och du har samma kontaktperson från takkontroll till slutgenomgång.",
    extraContent:
      "Vi går igenom förutsättningarna i Högdalen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Högdalen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Högdalen?",
      answer:
        "Priset för ett takbyte i Högdalen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Högdalen",
    lat: 59.265,
    lng: 18.0433,
    nearbyLocations: ["Bandhagen", "Hökarängen", "Farsta"],
  },
  {
    slug: "hokarangen",
    name: "Hökarängen",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Hökarängen — takbyte och takrenovering i Hökarängen. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Hökarängen — klassisk söderförort — har ett fastighetsbestånd med trevåningshus och radhus från 1940–50-tal. Betongpannor kan drabbas av frostsprängning och underlagspapp torkar ut och spricker med åren, vilket är skäl till att ett tak till slut kan behöva bytas eller läggas om. RoslagsTak utför kompletta takprojekt i Hökarängen: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris efter en kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Hökarängen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Hökarängen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Hökarängen?",
      answer:
        "Priset för ett takbyte i Hökarängen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Hökarängen",
    lat: 59.2569,
    lng: 18.0819,
    nearbyLocations: ["Farsta", "Högdalen", "Skarpnäck"],
  },
  {
    slug: "tumba",
    name: "Tumba",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Tumba — takbyte och takrenovering i Tumba. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Tumba är Botkyrkas största tätort. Bebyggelsen består till stor del av villaområden, radhus och flerbostadshus. Vi utför takbyte, takrenovering och takomläggning i Tumba med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Takkontroll och offert är kostnadsfria, och priset vi lämnar är det du betalar.",
    extraContent:
      "Vi går igenom förutsättningarna i Tumba — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Tumba.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Tumba?",
      answer:
        "Priset för ett takbyte i Tumba beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Tumba",
    lat: 59.1994,
    lng: 17.8342,
    nearbyLocations: ["Tullinge", "Botkyrka", "Salem"],
  },
  {
    slug: "tullinge",
    name: "Tullinge",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Tullinge — takbyte och takrenovering i Tullinge. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Tullinge är ett villaområde i Botkyrka med villor från 1960–80-tal med betongpannor. Vid en kostnadsfri takkontroll kontrollerar vi underlagspapp, läkt, råspont, plåtbeslag och ventilation under taket — det är där ett takbyte avgörs. Du får en skriftlig bedömning och ett fast pris innan något arbete påbörjas.",
    extraContent:
      "Vi går igenom förutsättningarna i Tullinge — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Tullinge.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Tullinge?",
      answer:
        "Priset för ett takbyte i Tullinge beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Tullinge",
    lat: 59.2028,
    lng: 17.9047,
    nearbyLocations: ["Tumba", "Botkyrka", "Huddinge"],
  },
  {
    slug: "norsborg",
    name: "Norsborg",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Norsborg — takbyte och takrenovering i Norsborg. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Norsborg — norra Botkyrka vid Mälaren — har ett fastighetsbestånd med miljonprogramsbebyggelse och radhus. En stor del av taken här är från samma byggår, vilket innebär att de nu behöver läggas om. RoslagsTak utför kompletta takprojekt i Norsborg: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Hela projektet hålls samman av oss — takkontroll, materialval, ställning, takarbete och bortforsling.",
    extraContent:
      "Vi går igenom förutsättningarna i Norsborg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Norsborg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Norsborg?",
      answer:
        "Priset för ett takbyte i Norsborg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Norsborg",
    lat: 59.2439,
    lng: 17.8092,
    nearbyLocations: ["Alby", "Fittja", "Botkyrka"],
  },
  {
    slug: "alby",
    name: "Alby",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Alby — takbyte och takrenovering i Alby. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Alby är del av norra Botkyrka. Bebyggelsen består till stor del av flerbostadshus från 1970-talet med stora takytor. Vi utför takbyte, takrenovering och takomläggning i Alby med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Vi börjar alltid med en kostnadsfri takkontroll på plats och en skriftlig offert med fast pris.",
    extraContent:
      "Vi går igenom förutsättningarna i Alby — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Alby.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Alby?",
      answer:
        "Priset för ett takbyte i Alby beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Alby",
    lat: 59.24,
    lng: 17.8531,
    nearbyLocations: ["Fittja", "Norsborg", "Botkyrka"],
  },
  {
    slug: "fittja",
    name: "Fittja",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Fittja — takbyte och takrenovering i Fittja. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi lägger tak i Fittja, nordöstra Botkyrka, där miljonprogramshus med flacka papp- och duktak dominerar. Äldre tak i området har ofta samma problem under pannorna: sliten papp, uttorkade tätningar och beslag som börjat rosta. Vi byter det som behöver bytas, säkerställer rätt ventilation och lämnar 10 års utförandegaranti på arbetet.",
    extraContent:
      "Vi går igenom förutsättningarna i Fittja — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilket material som passar huset. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Fittja.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Fittja?",
      answer:
        "Priset för ett takbyte i Fittja beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Fittja",
    lat: 59.2453,
    lng: 17.8628,
    nearbyLocations: ["Alby", "Norsborg", "Botkyrka"],
  },
  {
    slug: "ronninge",
    name: "Rönninge",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Rönninge i Salems kommun, ett villasamhälle från 1896 med blandad bebyggelse. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription: "Rönninge är ett av de äldre villasamhällena söder om Stockholm. Sedan järnvägsstationen vid stambanan öppnat 1888 blev marken intressant för tomtstyckning, och 1896 styckades egendomen upp i 151 större och mindre tomter av ett nybildat villatomtbolag. Tomterna såldes snabbt, men byggandet tog fart först efter sekelskiftet 1900. Resultatet blev, enligt beskrivningar av ortens historia, en blandad villabebyggelse med både enklare och mer påkostade hus, med stationen som samhällets naturliga mittpunkt. Samhället har äldre rötter än villastaden. Namnet nämns första gången i slutet av 1500-talet, som namn på ett torp under Uttringe. Rönninge gård blev säteri på 1600-talet, och huvudbyggnaden från 1662 står kvar än i dag. Den köptes 1904 av Frälsningsarmén och är i dag en kursgård i privat regi. År 1915 blev Rönninge municipalsamhälle, och när Salem åter blev en egen kommun 1983 blev Rönninge dess centralort. Stationen har fortsatt att vara ortens nav, och sedan 1968 går pendeltågen härifrån mot Stockholm och Södertälje. Sedan dess har Rönninge fortsatt att växa i etapper, och i dag rymmer kommundelen också områden som Mölleskogen, Garnudden, Skogsängen och Säbyholm. Enligt hitta.se är husen i Rönninge främst byggda på 1960- och 1990-talen, med blandade utbyggnadsår. Rönninge är centralort i Salems kommun och har den största samlingen småhus i kommunen.",
    extraContent: "Vad blandningen betyder för taket: I ett samhälle som byggts ut under mer än hundra år finns ingen typisk takålder. Ett hus från 1960-talet är i dag över sextio år gammalt, och har taket inte lagts om är underlagspapp, läkt och plåtdetaljer ofta i den ålder där det är dags att se över dem. Hus från 1990-talet närmar sig åldern där hängrännor, beslag och genomföringar brukar behöva kontrolleras. I de äldsta villorna har taket i regel bytts, ibland flera gånger, och där kan det finnas äldre detaljer som behöver hanteras varsamt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Det är klokt att kontrollera det innan arbetet planeras.",
    factBox: [
      { label: "Kommun", value: "Salem" },
      { label: "Delområden", value: "Mölleskogen, Garnudden, Skogsängen, Säbyholm" },
      { label: "Hustyper", value: "Villor + kedjehus" },
      { label: "Byggperiod", value: "Villasamhälle från 1896, mest 1960- och 1990-tal" },
      { label: "Ägda småhus i området", value: "Ca 1 700 (SCB, 2025)" },
    ],
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Rönninge?",
      answer:
        "Priset för ett takbyte i Rönninge beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Rönninge",
    lat: 59.2011,
    lng: 17.7367,
    nearbyLocations: ["Salem", "Tumba", "Södertälje"],
    parentLocation: {"name":"Salem","slug":"salem"},
    sourceLink: {"label":"Wikipedia: Rönninge, Salems kommun","url":"https://sv.wikipedia.org/wiki/R%C3%B6nninge,_Salems_kommun"},
    h1Override: "Takläggare i Rönninge, Salem",
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris**, inget löpande timpris.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Har du hus i Rönninge och vill veta vad taket behöver? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "jarna",
    name: "Järna",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Järna, med villastaden vid stationen, egnahem från 1930- och 1940-talen och villor från 1950–1970-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Järna är en tätort i Södertälje kommun. Enligt Södertälje kommuns kulturmiljöinventering ligger orten högt på en ås, med den flacka Järnaslätten nedanför i öster, och järnvägen delar den i två delar med en bro emellan. Fram till sent 1800-tal var området obebyggt, med undantag av några torpstugor, kyrkan och skolan. Järnvägen till Stockholm kom 1861, och kring stationen växte ett samhälle fram. Marken mellan stationen och kyrkan ägdes av grevinnan Löwen på Kallfors gård. På initiativ av församlingens klockare Carl Johan Wadström, som kallades Järnakungen, planlades den för Järna villastad, och tomter såldes. Där anlades enligt kommunen stora villor på luftiga tomter fram till 1920-talet. Affärshuset Birka från 1903 och konsumbutiken Kullen från 1917 står kvar, och 1913 öppnades Nyköpingsbanan. Kommunen beskriver också småhus av egnahemskaraktär från 1930- och 1940-talen, indragna på små tomter med förgårdsmark och med panelade fasader. Sådana hus finns bland annat längs Södra Järnvägsgatan och Tavestavägen. Stadsplanen som antogs 1941 hade arkitekten Cyrillus Johansson upprättat redan 1924, och under samma period styckades egnahemsområdet Epagärdet av. Södra Starrbäcken består enligt kommunen till stor del av friliggande småhus från 1950- och 1960-talen på relativt små tomter, ofta i ett plan och med fasad av tegel och träpanel. Eneområdet nedanför åsen bebyggdes med typhusvillor under sent 1960-tal och tidigt 1970-tal.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Södertälje" },
      { label: "Delområden", value: "Villastaden mellan stationen och kyrkan, Epagärdet, Södra Starrbäcken, Ene" },
      { label: "Hustyper", value: "Villor, egnahem, friliggande småhus" },
      { label: "Byggperiod", value: "Villastaden till 1920-talet, egnahem 1930–1940-tal, Södra Starrbäcken 1950–1960-tal, Ene sent 1960-tal och tidigt 1970-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 850" },
    ],
    sourceLink: { label: "Södertälje kommun: kulturmiljöinventering, Järna", url: "https://www.sodertalje.se/contentassets/801b52a57aed44f592a5d6bf3ff8bb96/3-jarna.pdf" },
    parentLocation: { name: "Södertälje", slug: "sodertalje" },
    h1Override: "Takläggare i Järna, Södertälje",
    uniqueFAQ: {
      question: "När byggdes husen i Järna?",
      answer:
        "Byggperiod enligt källorna: villastaden fram till 1920-talet, egnahem från 1930- och 1940-talen, Södra Starrbäcken från 1950- och 1960-talen och Ene från sent 1960-tal till tidigt 1970-tal. Hustyper: villor, egnahem och friliggande småhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Järna",
    lat: 59.0928,
    lng: 17.5658,
    nearbyLocations: ["Södertälje", "Rönninge", "Salem"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Järna står hus från drygt hundra år sida vid sida. Villorna i villastaden är i dag runt 100–120 år gamla, egnahemmen från 1930- och 1940-talen runt 80–95 år, småhusen i Södra Starrbäcken runt 60–75 år och typhusvillorna i Ene mellan 50 och 60 år. Taken kan redan ha lagts om, och på de tidigaste villorna kan det ha skett flera gånger. Husets ålder räcker därför inte för att bedöma taket. Det avgörande är underlagspapp, läkt, plåtdetaljer och hängrännor, och i vilket skick de är i dag. Enligt kommunen har de äldre villatomterna ofta höga träd och fruktträd. Träd nära huset fäller löv och kvistar i hängrännor och ränndalar, som behöver rensas för att vattnet ska rinna undan. Har ett hus byggts till i omgångar möts tak från olika tider, och skarvarna mellan dem är värda en extra titt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Järna och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "edsviken",
    name: "Edsviken",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Edsviken — takbyte och takrenovering i Edsviken. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Edsviken är villaområdet kring viken med samma namn, på gränsen mellan Sollentuna, Danderyd och Solna. Här finns allt från sekelskiftesvillor och funkishus till nyare enfamiljshus. Vi utför takbyte, takrenovering och takomläggning i Edsviken med material anpassat efter husets ålder och stil, kostnadsfri takkontroll och fast pris.",
    extraContent:
      "Vi går igenom förutsättningarna i Edsviken — smala villagator, stora tomter med träd och hus nära vattnet. Det påverkar både val av material och hur vi planerar ställning och kranbil, och gör att vi kan lämna en realistisk offert direkt efter takkontrollen istället för luddiga prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller boka online, så gör vi en kostnadsfri takkontroll i Edsviken.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Edsviken?",
      answer:
        "Priset för ett takbyte i Edsviken beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Edsviken",
    lat: 59.4014,
    lng: 18.0122,
    nearbyLocations: ["Edsberg", "Danderyd", "Sollentuna"],
  },
  // ---- Mälardalen ----
  {
    slug: "uppsala",
    name: "Uppsala",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Uppsala — takbyte och takrenovering för villor och bostadsrättsföreningar. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Uppsala är en av landets äldsta universitetsstäder, med bebyggelse som sträcker sig från äldre kvarter längs Fyrisån till villaområden i Luthagen och Kvarngärdet och flerbostadshus från 60- och 70-talen i Gottsunda och Sunnersta. Staden ligger på den öppna Uppsalaslätten, där vind och snö får fritt spelrum över taken. Vi tar uppdrag i Uppsala med takbyte och takrenovering, både för villaägare och för bostadsrättsföreningar. Alla uppdrag börjar med en kostnadsfri takkontroll och slutar med ett fast pris.",
    extraContent:
      "För en bostadsrättsförening i Uppsala är ett takbyte ett beslut som ska hålla för både styrelse och stämma. Därför lämnar vi en offert med fast pris, och garantin står skriftligt i avtalet. Äldre kvarter kan ha tegel- eller plåttak med många genomföringar och trånga takytor, medan nyare områden oftast har enklare sadeltak. Boka en kostnadsfri takkontroll så går vi igenom vad som passar just ert tak.",
    uniqueFAQ: {
      question: "Tar ni uppdrag från bostadsrättsföreningar i Uppsala?",
      answer:
        "Ja. Vi tar uppdrag från både bostadsrättsföreningar och villaägare i Uppsala. För föreningar börjar vi med en kostnadsfri takkontroll och lämnar ett fast pris som styrelsen kan besluta på.",
    },
    primaryKeyword: "takläggare Uppsala",
    lat: 59.8586,
    lng: 17.6389,
    nearbyLocations: ["Knivsta", "Märsta", "Sigtuna"],
  },
  {
    slug: "knivsta",
    name: "Knivsta",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Knivsta — takbyte och takrenovering. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Knivsta ligger mellan Stockholm och Uppsala och har vuxit snabbt med nya villaområden och radhus intill den äldre bebyggelsen kring centrum. Nybyggda hus har oftast enkla sadeltak i betongpannor eller plåt, medan äldre villor kan behöva ny underlagspapp, läkt och beslag. Vi tar uppdrag i Knivsta med takbyte, takrenovering, takavvattning och plåtarbeten, med kostnadsfri takkontroll och fast pris.",
    extraContent:
      "Öppna lägen på slätten gör att vindskivor, nockbeslag och takfot slits först. Vid takkontrollen tittar vi särskilt på infästningar, genomföringar och rännor, och lämnar ett skriftligt prisunderlag utan dolda tillägg. Även bostadsrättsföreningar och radhusföreningar i Knivsta är välkomna att höra av sig.",
    uniqueFAQ: {
      question: "Kommer ni ut till Knivsta för takkontroll?",
      answer:
        "Ja, vi tar uppdrag i Knivsta. Takkontroll och offert är kostnadsfria och förpliktar inte till något. Vi går igenom takets skick, ger en ärlig rekommendation mellan renovering och byte och lämnar ett fast pris.",
    },
    primaryKeyword: "takläggare Knivsta",
    lat: 59.7246,
    lng: 17.7867,
    nearbyLocations: ["Uppsala", "Märsta", "Sigtuna"],
  },
  {
    slug: "balsta",
    name: "Bålsta",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Bålsta — takbyte och takrenovering i Håbo. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Bålsta är centralort i Håbo kommun vid Mälaren, med villaområden, radhus och flerbostadshus från olika decennier. Närheten till vatten och skog innebär fukt, mossa på nordsidor och löv som samlas i rännor och bakom skorstenar. Vi tar uppdrag i Bålsta med takbyte, takrenovering, takavvattning och taktvätt, för både villaägare och bostadsrättsföreningar.",
    extraContent:
      "Vid takkontrollen börjar vi i takfot, rännor och genomföringar, eftersom det är där fukt och läckage oftast visar sig först. Är taket i gott skick räcker det ibland med renovering eller taktvätt, och det säger vi som det är. Behövs ett takbyte lämnar vi ett fast pris med specificerade moment.",
    uniqueFAQ: {
      question: "Vilka takproblem är vanligast i Bålsta?",
      answer:
        "I Bålsta med omnejd är mossa och alger på skuggiga takytor, löv i rännor och slitna beslag runt skorstenar vanligast. Vi bedömer vid en kostnadsfri takkontroll om det räcker med renovering eller taktvätt eller om taket behöver bytas.",
    },
    primaryKeyword: "takläggare Bålsta",
    lat: 59.5689,
    lng: 17.5275,
    nearbyLocations: ["Upplands-Bro", "Kungsängen", "Enköping"],
  },
  {
    slug: "enkoping",
    name: "Enköping",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Enköping — takbyte och takrenovering. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Enköping är en mälarstad med en välbevarad stadskärna och villaområden som ligger utspridda över slättlandskapet runt staden. Äldre trähus och tegelbyggnader i centrum har ofta tak med många detaljer, medan nyare områden har enklare tak i betongpannor eller plåt. Vi tar uppdrag i Enköping med takbyte, takrenovering, bandtäckning och plåtarbeten.",
    extraContent:
      "Äldre tak i tegel eller falsad plåt kräver ofta en försiktig hantering och rätt beslagsdetaljer, medan nyare tak främst behöver kontroll av underlag och avvattning. Vi bedömer vad som gäller vid en kostnadsfri takkontroll och lämnar ett fast pris. Bostadsrättsföreningar i Enköping får ett skriftligt underlag som styrelsen kan ta med till beslut.",
    uniqueFAQ: {
      question: "Hur går en takkontroll till i Enköping?",
      answer:
        "Vi besöker fastigheten, går igenom taket och bedömer skicket på takmaterial, underlag, beslag och avvattning. Efter takkontrollen får du en rekommendation och ett fast pris. Takkontrollen är kostnadsfri och förpliktar inte till något.",
    },
    primaryKeyword: "takläggare Enköping",
    lat: 59.6361,
    lng: 17.0777,
    nearbyLocations: ["Bålsta", "Västerås", "Uppsala"],
  },
  {
    slug: "vasteras",
    name: "Västerås",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Västerås — takbyte och takrenovering för villor och bostadsrättsföreningar. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Västerås är Mälardalens största stad, belägen vid Mälaren och Svartån, med en blandning av äldre stadsbebyggelse, villaområden och stora bostadsrättsföreningar och flerbostadshus. Storleken ger en stor variation av taktyper, från tegeltak på äldre hus till plåt och papp på flacka tak. Vi tar uppdrag i Västerås med takbyte och takrenovering, både för villaägare och för föreningar.",
    extraContent:
      "För större fastigheter och bostadsrättsföreningar planerar vi arbetet tillsammans med styrelsen: takkontroll, fast offert och en fast kontaktperson under hela projektet. Vi lämnar skriftlig garanti när arbetet är klart. Kontakta oss för en kostnadsfri takkontroll i Västerås.",
    uniqueFAQ: {
      question: "Kan ni ta uppdrag åt större bostadsrättsföreningar i Västerås?",
      answer:
        "Ja, vi tar uppdrag från bostadsrättsföreningar i Västerås. Vi börjar med en kostnadsfri takkontroll och lämnar ett fast pris som styrelsen kan besluta på. Hör av dig så går vi igenom fastigheten och vilken omfattning som passar.",
    },
    primaryKeyword: "takläggare Västerås",
    lat: 59.6099,
    lng: 16.5448,
    nearbyLocations: ["Enköping", "Eskilstuna", "Strängnäs"],
  },
  {
    slug: "eskilstuna",
    name: "Eskilstuna",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Eskilstuna — takbyte och takrenovering. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Eskilstuna ligger vid Eskilstunaån med en gammal industri- och verkstadsstad i botten. Bebyggelsen spänner från äldre kvarter nära ån till villaområden och flerbostadshus från efterkrigstiden. Taken varierar därefter, med tegel och plåt på äldre byggnader och betongpannor och papp på senare bebyggelse. Vi tar uppdrag i Eskilstuna med takbyte, takrenovering, plåtarbeten och takavvattning.",
    extraContent:
      "Många flerbostadshus från 1950–70-talet har tak som kan behöva ses över. För bostadsrättsföreningar lämnar vi ett skriftligt underlag efter en kostnadsfri takkontroll, med fast pris och tydlig specifikation, så att styrelsen kan planera och besluta. Även villaägare är välkomna att boka takkontroll.",
    uniqueFAQ: {
      question: "När bör en förening i Eskilstuna se över taket?",
      answer:
        "Som riktvärde bör äldre tak besiktas var femte till tionde år, och senast när ni ser läckage, uppdykande mossa eller trasiga pannor. En takkontroll ger styrelsen ett underlag för underhållsplan och budget innan problemen blir akuta.",
    },
    primaryKeyword: "takläggare Eskilstuna",
    lat: 59.3666,
    lng: 16.5077,
    nearbyLocations: ["Strängnäs", "Västerås", "Mariefred"],
  },
  {
    slug: "strangnas",
    name: "Strängnäs",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Strängnäs — takbyte och takrenovering vid Mälaren. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Strängnäs är en gammal domkyrkostad på en halvö i Mälaren, med välbevarade kvarter, sjönära villor och nyare områden längre från centrum. Läget vid vattnet ger fuktig luft och vind som slits på beslag, vindskivor och underlagspapp. Vi tar uppdrag i Strängnäs med takbyte, takrenovering, bandtäckning och plåtarbeten.",
    extraContent:
      "På äldre byggnader i stadskärnan är rätt beslag och detaljer avgörande, medan nyare hus främst behöver kontroll av läkt, papp och avvattning. Vi går igenom takets skick vid en kostnadsfri takkontroll och lämnar ett fast pris. Bostadsrättsföreningar och privatpersoner är lika välkomna.",
    uniqueFAQ: {
      question: "Passar plåttak vid Mälaren i Strängnäs?",
      answer:
        "Ja, plåttak är ett vanligt och hållbart val nära vatten. Välj färgbelagd plåt med hög korrosionsklass och korrekt monterade beslag. Vi går igenom material, profil och kulör vid takkontrollen och lämnar ett fast pris.",
    },
    primaryKeyword: "takläggare Strängnäs",
    lat: 59.3777,
    lng: 17.0313,
    nearbyLocations: ["Mariefred", "Eskilstuna", "Nykvarn"],
  },
  {
    slug: "mariefred",
    name: "Mariefred",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Mariefred — takbyte och takrenovering. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Mariefred är en liten stad vid Mälaren med välbevarad trähusbebyggelse och tegeltak, och med villor och fritidshus i sjönära lägen runt omkring. Äldre hus kräver ofta varsamhet vid takarbete, medan sjönära villor mest slits av fukt och vind. Vi tar uppdrag i Mariefred med takbyte, takrenovering, plåtarbeten och takavvattning.",
    extraContent:
      "Vid takkontrollen bedömer vi om taket kan renoveras eller om ett byte är mer ekonomiskt över tid, och vi går igenom material som passar husets stil och läge. Vi lämnar ett fast pris med specificerade moment. Kontakta oss för en kostnadsfri takkontroll i Mariefred.",
    uniqueFAQ: {
      question: "Kan ni lägga tegel eller falsad plåt på äldre hus i Mariefred?",
      answer:
        "Ja, vi arbetar med både tegel, tegelprofilerad plåt och dubbelfalsad bandtäckning. Vi rekommenderar material utifrån husets ålder, stil och taklutning, och går igenom alternativen vid en kostnadsfri takkontroll.",
    },
    primaryKeyword: "takläggare Mariefred",
    lat: 59.2578,
    lng: 17.2158,
    nearbyLocations: ["Strängnäs", "Nykvarn", "Södertälje"],
  },
  {
    slug: "nykvarn",
    name: "Nykvarn",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Nykvarn — takbyte och takrenovering. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Nykvarn är en mindre kommun nära Södertälje med villaområden, radhus och lantbruksfastigheter. Enligt Wikipedia grundades orten på 1500-talet, när ett nytt bruk anlades på platsen, och ligger 15 kilometer väster om Södertälje. Sedan 1997 genomkorsas Nykvarn av Svealandsbanan, och enligt hitta.se är husen i tätorten främst byggda på 1980- och 2000-talen. Bebyggelsen är i övrigt blandad, från äldre gårdar till villor byggda i olika omgångar, och taken ser därefter ut. Vi tar uppdrag i Nykvarn med takbyte, takrenovering, takavvattning och plåtarbeten.",
    extraContent:
      "Lantbruks- och ekonomibyggnader har ofta stora takytor i plåt eller papp, medan bostadshusen vanligen har betongpannor eller tegel. Vi lämnar ett fast pris efter kostnadsfri takkontroll, oavsett om det gäller bostadshus, uthus eller större byggnader.",
    uniqueFAQ: {
      question: "Tar ni uppdrag på uthus och ekonomibyggnader i Nykvarn?",
      answer:
        "Ja. Vi tar uppdrag på både bostadshus och uthus, garage och ekonomibyggnader i Nykvarn. Vi går igenom takets skick vid en kostnadsfri takkontroll och lämnar ett fast pris.",
    },
    primaryKeyword: "takläggare Nykvarn",
    lat: 59.1775,
    lng: 17.4353,
    nearbyLocations: ["Södertälje", "Mariefred", "Gnesta"],
  },
  {
    slug: "gnesta",
    name: "Gnesta",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Gnesta — takbyte och takrenovering. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Gnesta är en mindre ort i Södermanland med villor, radhus och äldre gårdar, omgiven av skog och öppna landskap. Snölast, lövfall och fukt i skogsnära lägen påverkar taken, särskilt rännor, takfot och nordsidor. Vi tar uppdrag i Gnesta med takbyte, takrenovering, takavvattning och plåtarbeten.",
    extraContent:
      "Vid takkontrollen kontrollerar vi underlag, läkt, beslag och avvattning och ger en ärlig rekommendation mellan renovering och byte. Vi lämnar ett fast pris med tydligt vad som ingår, och kan även erbjuda taktvätt när taket i övrigt är i gott skick.",
    uniqueFAQ: {
      question: "Vilket takmaterial passar skogsnära hus i Gnesta?",
      answer:
        "I skogsnära lägen samlas löv och barr i rännor och på takytan, och mossa trivs på skuggiga sidor. Plåt med släta ytor och god avvattning är ofta lättskött, medan betongpannor och tegel kräver regelbunden rengöring. Vi går igenom alternativen vid en kostnadsfri takkontroll och lämnar ett fast pris.",
    },
    primaryKeyword: "takläggare Gnesta",
    lat: 59.0486,
    lng: 17.3133,
    nearbyLocations: ["Nykvarn", "Trosa", "Södertälje"],
  },
  {
    slug: "nykoping",
    name: "Nyköping",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Nyköping — takbyte och takrenovering. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Nyköping ligger vid Nyköpingsån nära Östersjön, med äldre stadskvarter, villaområden och flerbostadshus. Kustnära läge ger fukt, vind och saltpåverkan som slitar på beslag och plåtdetaljer, och mossa etablerar sig lätt på skuggiga takytor. Vi tar uppdrag i Nyköping med takbyte, takrenovering, plåtarbeten och takavvattning.",
    extraContent:
      "Nära kusten rekommenderar vi ofta plåt med hög korrosionsklass och rostfria infästningar. Vi går igenom material och detaljer vid en kostnadsfri takkontroll och lämnar ett fast pris. Bostadsrättsföreningar får ett underlag som styrelsen kan besluta på.",
    uniqueFAQ: {
      question: "Vilket takmaterial passar nära kusten i Nyköping?",
      answer:
        "Viktigast är rätt infästningar och beslag. Vi rekommenderar material vid en kostnadsfri takkontroll.",
    },
    primaryKeyword: "takläggare Nyköping",
    lat: 58.7531,
    lng: 17.0079,
    nearbyLocations: ["Trosa", "Gnesta", "Strängnäs"],
  },
  {
    slug: "trosa",
    name: "Trosa",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takläggare i Trosa — takbyte och takrenovering. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Trosa är en kuststad vid Trosaån med välbevarad småstadsmiljö, sommarhus och villor i kustnära lägen. Vi tar uppdrag i Trosa med takbyte, takrenovering, bandtäckning och plåtarbeten.",
    extraContent:
      "Vi går igenom takets skick vid en kostnadsfri takkontroll och lämnar ett fast pris. Kontakta oss så bokar vi en tid.",
    uniqueFAQ: {
      question: "Tar ni uppdrag på fritidshus i Trosa?",
      answer:
        "Ja, vi tar uppdrag på både permanentbostäder och fritidshus i Trosa. Vi bedömer takets skick vid en kostnadsfri takkontroll och lämnar ett fast pris.",
    },
    primaryKeyword: "takläggare Trosa",
    lat: 58.8973,
    lng: 17.5525,
    nearbyLocations: ["Nyköping", "Gnesta", "Nynäshamn"],
  },
  {
    slug: "svalnas-osby",
    name: "Svalnäs och Ösby",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i norra Djursholm, med villor i nationalromantik och jugend från 1900-talets första årtionden. Kostnadsfri takkontroll.",
    longDescription:
      "Norra Djursholm växte fram när den ursprungliga villastaden kring slottet och Värtan byggdes ut mot norr och väster. Enligt Wikipedia började Ösby-området bebyggas under andra halvan av 1890-talet, men byggandet tog fart först 1910. Där anslöt Djursholmsbanan till Roslagsbanan vid stationen Djursholms Ösby, som öppnade 1890 och gav villastaden en fast förbindelse med Stockholm. Svalnäs, längst i norr, är en gammal gård som nämns första gången i ett pergamentbrev från 1312. Egendomen köptes 1883 av bankdirektören Henrik Palme, som sex år senare blev den drivande kraften bakom Djursholms villastad. Han lät bygga en ny huvudbyggnad, ritad av arkitekten Fredrik Lilljekvist, och bodde där till sin död 1932. År 1897 sålde han 122 tunnland i Svalnässkogen, längs stranden norr om Framnäsviken, till Djursholms AB, som styckade av strandtomter för villor. Resten av Svalnäs införlivades i Djursholm 1934. Mellan 1912 och 1934 var Svalnäs slutstation på Djursholmsbanan. Enligt Wikipedia byggdes Svalnäs snabbt ut under 1900-talets första decennium och fick då en högborgerlig prägel. Villornas förhärskande stilar är nationalromantik och jugend, och bland arkitekterna fanns Lars Israel Wahlman, Axel Viktor Forsberg och Elis Benckert. Benckerts Villa Lagercrantz på Svalnäsvägen är byggnadsminne sedan 1979. Norr om Ösbysjön präglas bebyggelsen i stället av 1920-talets klassicism. I området ligger också Svalnäsgravfältet, från omkring 500 till 1000 e.Kr., som hör till Danderyds största gravfält, och Djursholms golfbana.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Danderyd" },
      { label: "Delområden", value: "Svalnäs, Djursholms Ösby" },
      { label: "Hustyper", value: "Villor" },
      { label: "Byggperiod", value: "Ösby från 1890-talet (fart 1910), Svalnäs 1900-talets första decennium, 1920-tal norr om Ösbysjön" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 920" },
    ],
    sourceLink: { label: "Wikipedia: Svalnäs", url: "https://sv.wikipedia.org/wiki/Svaln%C3%A4s" },
    parentLocation: { name: "Danderyd", slug: "danderyd" },
    h1Override: "Takläggare i Svalnäs och Ösby, Djursholm",
    uniqueFAQ: {
      question: "När byggdes husen i Svalnäs och Ösby?",
      answer:
        "Byggperiod enligt källorna: Ösby från 1890-talet med fart från 1910, Svalnäs under 1900-talets första decennium, och 1920-talsklassicism norr om Ösbysjön. Hustyper: villor i bland annat nationalromantik och jugend. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Svalnäs",
    lat: 59.4124,
    lng: 18.0872,
    nearbyLocations: ["Djursholm", "Danderyd", "Stocksund"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Många av villorna i Svalnäs och Ösby är i dag runt hundra år gamla eller mer. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Villor i nationalromantik och jugend har ofta branta takfall, kupor, burspråk och torn, och varje sådan del ger taket fler anslutningar. Det är i ränndalar, runt skorstenar och vid plåtdetaljer som ett sådant tak prövas, och där är hantverket avgörande. I ett område med äldre, arkitektritade villor är det klokt att tänka på material och kulör tidigt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Svalnäs eller Ösby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "lindholmen",
    name: "Lindholmen",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Lindholmen norr om Vallentuna, en trädgårdsstad vid Roslagsbanan med villor från 1950-talet och framåt. Kostnadsfri takkontroll.",
    longDescription:
      "Lindholmen är en tätort i Vallentuna kommun, fem kilometer norr om Vallentuna, med egen station på Roslagsbanan. Platsen har en lång historia. Lindholmens gårds gamla stenhus, som numera är rivet, har enligt Wikipedia ansetts vara Gustav Vasas födelseplats, och ortens skola heter Gustav Vasa-skolan. Nära stationen låg byn Slumsta, som 1706 beskrevs som en by med två gårdar. På 1903 års karta syns att Roslagsbanan hade dragits genom den västra delen av Lindholmens ägor, med stationen knappt 300 meter från Slumsta. Enligt Wikipedia började Lindholmens trädgårdsstad anläggas i början av 1950-talet, på båda sidor om stationen. De första husen byggdes på traditionellt sätt på moränbackar och annan mark som inte gick att odla. Den östra delen anlades i det som kallades Djurgården, som en gång var tänkt som jaktpark till sätesgården. Sedan dess har stora delar av Slumstas ägor bebyggts. I Slumsta finns 55 villor från 1978, ritade av Bertil Engstrand, och 2007 byggdes Stockholms läns första passivhus i Lindholmen. Enligt hitta.se finns här hus från 1970- och 80-talen, 1990- och 2000-talen och 2010-talet, och kring Lindholmens gårds väg från 1920- och 1990-talen. Stationshuset står kvar, och öster om järnvägen ligger Vasakullen, Lindholmens gård, Storsjön och Lillsjön. Vallentuna kommun planerar för 400 till 600 nya bostäder i Lindholmen.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Vallentuna" },
      { label: "Delområden", value: "Trädgårdsstaden, Slumsta, Djurgården" },
      { label: "Hustyper", value: "Villor, inslag av flerbostadshus" },
      { label: "Byggperiod", value: "Från tidigt 1950-tal, Slumsta 1978, delar 1970–2010-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 400" },
    ],
    sourceLink: { label: "Wikipedia: Lindholmen, Vallentuna kommun", url: "https://sv.wikipedia.org/wiki/Lindholmen,_Vallentuna_kommun" },
    parentLocation: { name: "Vallentuna", slug: "vallentuna" },
    h1Override: "Takläggare i Lindholmen, Vallentuna",
    uniqueFAQ: {
      question: "När byggdes husen i Lindholmen?",
      answer:
        "Byggperiod enligt källorna: trädgårdsstaden från tidigt 1950-tal, Slumsta från 1978, och inslag från 1970- till 2010-talet. Hustyper: villor, med inslag av flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Lindholmen",
    lat: 59.5844,
    lng: 18.1052,
    nearbyLocations: ["Vallentuna", "Ormsta"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen i Lindholmen är byggda under mer än sjuttio år. De äldsta villorna i trädgårdsstaden är i dag runt 70–75 år gamla, villorna i Slumsta närmare 50 år, och en stor del av bebyggelsen är yngre än så. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I ett område som Slumsta, där husen är ritade och byggda samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Lindholmen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "sjoberg",
    name: "Sjöberg",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Sjöberg i Sollentuna, med villor och radhus främst från 1970-talet och nyare villor på Falkberget. Kostnadsfri takkontroll.",
    longDescription:
      "Sjöberg är en kommundel i östra Sollentuna, mellan Edsviken, Rösjön och Rinkebyskogen. Den gränsar till Edsberg, Tureberg och Helenelund, till Danderyds kommun och till Skarpäng i Täby, och delas in i Östra Sjöberg, Västra Sjöberg och Falkberget. Trakten var bebodd redan under forntiden. Sjöbergs fornborg ligger på en hög platå och är omkring 210 gånger 100 meter stor, och enligt Wikipedia har borgmuren daterats till 400–550 e.Kr. Fornborgen har gett namn åt Borgvägen längs Edsvikens strand. Kommundelen har sitt namn efter Sjöbergs gård, intill fornborgen, där det ursprungligen låg ett torp under Hersby. Gårdens nuvarande huvudbyggnad uppfördes på 1850-talet. Under 1930-talet var Sjöberg ett stort sportstugeområde. Enligt Wikipedia gick en buss från Norra Bantorget till Edsviken, och därifrån en passbåt över till Sjöberg. Den nuvarande bebyggelsen i Östra och Västra Sjöberg är huvudsakligen uppförd under 1970-talet, då kommunen ersatte sommarstugeområdet med villor, radhus och bostadsrätter. Mot slutet av 1990-talet började Falkberget bebyggas med villor, och enligt hitta.se är husen där främst från 1990- och 2000-talen. I området finns Sjöbergs centrum, två skolor och Rösjöbadet.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Sollentuna" },
      { label: "Delområden", value: "Östra Sjöberg, Västra Sjöberg, Falkberget, Kärrdal" },
      { label: "Hustyper", value: "Villor, radhus" },
      { label: "Byggperiod", value: "Huvudsakligen 1970-tal, Falkberget från slutet av 1990-talet" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 800 (RegSO Falkberget-Södra Sjöberg)" },
    ],
    sourceLink: { label: "Wikipedia: Sjöberg, Sollentuna kommun", url: "https://sv.wikipedia.org/wiki/Sj%C3%B6berg,_Sollentuna_kommun" },
    parentLocation: { name: "Sollentuna", slug: "sollentuna" },
    h1Override: "Takläggare i Sjöberg, Sollentuna",
    uniqueFAQ: {
      question: "När byggdes husen i Sjöberg?",
      answer:
        "Byggperiod enligt källorna: Östra och Västra Sjöberg huvudsakligen under 1970-talet, Falkberget från slutet av 1990-talet. Hustyper: villor och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Sjöberg",
    lat: 59.4261,
    lng: 17.9947,
    nearbyLocations: ["Sollentuna", "Edsviken", "Skarpäng"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De flesta villorna och radhusen i Östra och Västra Sjöberg är i dag runt 50 år gamla, medan villorna på Falkberget är runt 20–30 år. Taken i de äldre delarna kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. På Falkberget är taken yngre. På radhus hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. Eftersom husen i en länga oftast är likadana och byggda samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Med skog och vatten nära inpå samlas löv och barr lätt i hängrännor och ränndalar, och det är värt att hålla dem rena. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Sjöberg eller på Falkberget och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "lahall",
    name: "Lahäll",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i villaområdet Lahäll i södra Täby, vid Näsbyviken och gränsen mot Djursholm. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Lahäll ligger i den sydöstra delen av Täby kommun. Kommundelen gränsar i söder till Djursholm i Danderyd, i väster till Roslags-Näsby och i norr och öster till Näsbypark. Namnet kommer enligt Wikipedia av \"häll där man lastar\", men var den platsen låg är i dag okänt. På 1600-talet var Lahäll ett dagsverkstorp under Svalnäs, och 1723 blev torpet en del av Näsby säteri. Området började bebyggas i slutet av 1920-talet av Näsby fastighetsaktiebolag, och det kallades då Näsby västra park. I början byggdes mest sommarstugor, som sedan har ersatts av åretruntbostäder. År 1928 blev järnvägslinjen mellan Altorp och Lahäll klar, och Lahälls station var slutstation i nio år, innan banan 1937 förlängdes till Näsbypark. Lahäll hörde först till Danderyd. Fastighetsägarna ville egentligen att området skulle föras över till Djursholms stad, men enligt Wikipedia blev avloppsfrågan avgörande: Täby kunde erbjuda kommunalt vatten och avlopp, vilket Djursholm inte kunde. År 1947 fördes Lahäll över till Täby. Efter det ökade byggandet, och tillsammans med Näsbypark utvecklades området till ett grönskande villaområde. Vid Näsbyviken finns en småbåtshamn. Enligt hitta.se är husen i Lahäll främst byggda på 1960- och 2000-talen.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Täby" },
      { label: "Delområden", value: "Lahäll, Näsbygård" },
      { label: "Hustyper", value: "Villor och flerbostadshus" },
      { label: "Byggperiod", value: "Från slutet av 1920-talet, ökat byggande efter 1947, främst 1960- och 2000-tal enligt hitta.se" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 390" },
    ],
    sourceLink: { label: "Wikipedia: Lahäll", url: "https://sv.wikipedia.org/wiki/Lah%C3%A4ll" },
    parentLocation: { name: "Täby", slug: "taby" },
    h1Override: "Takläggare i Lahäll, Täby",
    uniqueFAQ: {
      question: "När byggdes husen i Lahäll?",
      answer:
        "Byggperiod enligt källorna: från slutet av 1920-talet, med ökat byggande efter 1947 och husen i dag främst från 1960- och 2000-talet. Hustyper: villor och flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Lahäll",
    lat: 59.4265,
    lng: 18.0711,
    nearbyLocations: ["Täby", "Näsbypark", "Roslags-Näsby"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Lahäll har byggts ut och om under snart hundra år, från sommarstugor till villor, och husen är därför i mycket olika åldrar. En stor del av villorna är i dag runt 60 år gamla, medan andra är byggda eller ersatta under 2000-talet. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. När äldre hus har byggts till i flera omgångar möts ofta tak från olika tider på samma hus, och det är i skarvarna mellan dem, i ränndalar och vid anslutningar, som ett läckage oftast börjar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Lahäll och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "stenhamra",
    name: "Stenhamra",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Stenhamra på Färingsö, med villor, kedjehus och radhus främst från 1960- till 1980-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Stenhamra är en tätort i Ekerö kommun, på västra sidan av Färingsö i Mälaren. Orten är mest känd för sitt stenbrott. Enligt Wikipedia bröts här en stor del av Stockholms gat- och kantsten, från 1884 fram till 1919 med full styrka, och omkring 100 arbetare sysselsattes året runt. Den enda förbindelsen med Stockholm var sjövägen, så stenen fraktades på pråmar. Driften lades ner 1937. Tjänstebostäderna som Stockholms stad höll med för stenhuggarnas familjer finns kvar, och stenbrottet, bostäderna, skolan och konsumbutiken är tillsammans klassade som riksintresse för kulturmiljövården. I det delvis vattenfyllda stenbrottet har flera filmer spelats in, bland annat Pippi Långstrump och Bröderna Lejonhjärta. Det moderna Stenhamra har en annan historia. Bär- och fruktdryckestillverkaren Stockmos har haft sin fabrik här sedan 1932, och på 1940-talet omfattade odlingarna 10 000 fruktträd. Enligt Wikipedia var det Sveriges största fruktodling norr om Skåne. Åren 1968–1970 byggdes ett villaområde på markerna. Fruktträd finns fortfarande kvar i området, och många vägnamn påminner om odlingarna, som Apelvägen. Enligt hitta.se är husen byggda i flera omgångar: kring Dalbovägen och Alvikens gårdsväg främst på 1950- och 1960-talen, kring Apelvägen och Silvavägen på 1960- och 1970-talen, kring Fållvägen och Ramundvägen på 1970- och 1980-talen och vid Stockby strand på 1990- och 2000-talen. Bebyggelsen består av villor, kedjehus och radhus. I Stenhamra med omgivning bor omkring 3 600 personer, och de flesta som arbetar pendlar inom Stockholmsområdet.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Ekerö" },
      { label: "Hustyper", value: "Villor, kedjehus, radhus" },
      { label: "Byggperiod", value: "Villaområdet 1968–1970, övrigt 1950–1980-tal, Stockby strand 1990–2000-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 050" },
    ],
    sourceLink: { label: "Wikipedia: Stenhamra", url: "https://sv.wikipedia.org/wiki/Stenhamra" },
    parentLocation: { name: "Ekerö", slug: "ekero" },
    h1Override: "Takläggare i Stenhamra, Ekerö",
    uniqueFAQ: {
      question: "När byggdes husen i Stenhamra?",
      answer:
        "Byggperiod enligt källorna: villaområdet på den gamla fruktodlingen 1968–1970, övrig bebyggelse 1950- till 1980-talet, och vid Stockby strand 1990- till 2000-talet. Hustyper: villor, kedjehus och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Stenhamra",
    lat: 59.3347,
    lng: 17.6874,
    nearbyLocations: ["Ekerö"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De flesta husen i Stenhamra är i dag runt 40–65 år gamla, och villorna på den gamla fruktodlingen drygt 55 år. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Husen vid Stockby strand är betydligt yngre. På kedjehus och radhus hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. I områden med många fruktträd och annan växtlighet nära husen samlas löv lätt i hängrännor och ränndalar, och det är värt att hålla dem rena. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Stenhamra och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "uttran",
    name: "Uttran och Broängen",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i villasamhället Uttran och i Broängen i Tumba, med hus främst från 1950- till 1980-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Uttran ligger i Botkyrka kommun, vid den östra delen av sjön Uttran, på gränsen mot Salems kommun. Området räknas i dag som sammanvuxet med Tumba. I början av 1900-talet anlades två sanatorier vid sjön, Söderby sjukhus och Uttrans sjukhus, och för dem inrättades en egen hållplats för lokaltåg. Stationen drogs in i början av 1970-talet. Två av de gamla stationsbyggnaderna i trä används enligt Wikipedia som bostäder, och gångtunneln under spåren finns kvar. Uttran hörde till Grödinge kommun fram till 1971, då den blev en del av Botkyrka. Enligt Wikipedia är Uttran till största delen ett villasamhälle i ett kuperat landskap med flera bäckraviner, vid sjöns sydöstra sida. I söder och sydväst ligger Vinterskogens naturreservat, och i sydost tar Broängen vid. Broängen är ett mindre bostadsområde i södra Tumba. Området är känt sedan medeltiden och var utmark till Skrävsta gård, och fram till 1920-talet var det huvudsakligen jordbruksbygd under Broängens gård. Flera vägnamn har historisk anknytning: Slättvägen efter soldattorpet Slätten och Soltorpsvägen efter soldattorpet Soltorp, som enligt Wikipedia är det äldsta huset i Broängen. I dag består Broängen huvudsakligen av villor och radhus. Enligt hitta.se är husen i Uttran främst byggda på 1960- och 1980-talen och i Broängen på 1950- och 1960-talen. Bebyggelsen är en blandning av villor, kedjehus och radhus.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Botkyrka" },
      { label: "Hustyper", value: "Villor, kedjehus, radhus" },
      { label: "Byggperiod", value: "Uttran 1960- och 1980-tal, Broängen 1950–1960-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 060" },
    ],
    sourceLink: { label: "Wikipedia: Uttran", url: "https://sv.wikipedia.org/wiki/Uttran" },
    parentLocation: { name: "Tumba", slug: "tumba" },
    h1Override: "Takläggare i Uttran och Broängen, Tumba",
    uniqueFAQ: {
      question: "När byggdes husen i Uttran och Broängen?",
      answer:
        "Byggperiod enligt källorna: Uttran främst 1960- och 1980-tal, Broängen 1950- och 1960-tal. Hustyper: villor, kedjehus och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Uttran",
    lat: 59.1921,
    lng: 17.8052,
    nearbyLocations: ["Tumba", "Rönninge"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen i Broängen är i dag runt 60–75 år gamla och i Uttran runt 40–65 år. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I ett kuperat område med raviner och mycket skog nära husen samlas löv och barr lätt i hängrännor och ränndalar, och åtkomsten till huset kan påverka hur ett takbyte planeras. På kedjehus och radhus hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Uttran eller Broängen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "bjorknas",
    name: "Björknäs och Eknäs",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Björknäs vid Skurusundet i Nacka, med villor från sekelskiftet 1900 och framåt i kuperad terräng. Kostnadsfri takkontroll.",
    longDescription:
      "Björknäs ligger i västra Saltsjö-Boo i Nacka kommun, intill Skurusundet vid Skurubroarnas östra landfäste. Området har sitt namn efter Stora Björknäs gård och nämns i skrift redan 1436. Marken har historiskt hört till gårdarna Stora och Lilla Björknäs, och Eknäs gård avsöndrades från Stora Björknäs 1818. Enligt Wikipedia började jordbruksmarken delas upp i tomter efter 1873, då byggmästaren Carl Henrik Hallström flyttade in på Stora Björknäs och lät uppföra ett antal sommarvillor. Ångbåtarna gjorde stränderna vid Skurusundet tillgängliga, och mot slutet av 1800-talet började villor byggas också för permanentboende. Vid sekelskiftet 1900 styckades villatomter av i de centrala delarna, och 1915 invigdes Skurubron, som förbättrade landsvägen mellan Stockholm och Värmdö. På 1920-talet bildades Björknäs egnahemsområde. Villorna i den centrala delen byggdes enligt Wikipedia utan byggnadsplan, vilket tidigt gav en varierad bebyggelse som fortfarande präglar området. Flera av de nya Björknäsborna var hantverkare eller småföretagare som både ritade och byggde sina hus själva. Lilla Björknäs, norrut längs sundet, bebyggdes under slutet av 1800-talet med sommarvillor och blev senare ett sportstugeområde på brant kuperade tomter. Efter en ny detaljplan 2002 har det enligt Wikipedia ändrat karaktär, med nybyggda hus i nyfunkisstil. Under de senaste decennierna har Björknäs förtätats med nya villor, radhus och små flerbostadshus. Landskapet beskrivs som starkt kuperat, med gamla tallar, ekar och berghällar kvar mellan husen.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Nacka" },
      { label: "Delområden", value: "Björknäs (Stora och Lilla Björknäs), Eknäs" },
      { label: "Hustyper", value: "Villor, med inslag av radhus och små flerbostadshus" },
      { label: "Byggperiod", value: "Sommarvillor från 1870-talet, villatomter från sekelskiftet 1900, egnahemsområde på 1920-talet, förtätning senaste decennierna" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 950" },
    ],
    sourceLink: { label: "Wikipedia: Björknäs, Nacka kommun", url: "https://sv.wikipedia.org/wiki/Bj%C3%B6rkn%C3%A4s,_Nacka_kommun" },
    parentLocation: { name: "Nacka", slug: "nacka" },
    h1Override: "Takläggare i Björknäs, Nacka",
    uniqueFAQ: {
      question: "När byggdes husen i Björknäs?",
      answer:
        "Byggperiod enligt källorna: sommarvillor från 1870-talet, villatomter från sekelskiftet 1900, ett egnahemsområde från 1920-talet och förtätning under de senaste decennierna. Hustyper: villor, med inslag av radhus och små flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Björknäs",
    lat: 59.3209,
    lng: 18.2408,
    nearbyLocations: ["Nacka"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Björknäs står hus från mycket olika tider sida vid sida: sommarvillor från 1800-talets slut, egnahem som är runt hundra år gamla och villor byggda efter 2002. Det går därför inte att säga något gemensamt om taken. På de äldre husen kan taket ha lagts om flera gånger, och det som betyder något är när underlagspapp, läkt och plåtdetaljer senast byttes. Hus som en gång ritades och byggdes av ägaren själv, och som sedan har byggts till, har ofta egna lösningar vid takfot, vinklar och genomföringar. Sådana ställen behöver ses över ett och ett. På branta tomter kan taket ligga högt över marken på ena sidan av huset, och då behöver ställning och åtkomst planeras efter tomten. Med gamla tallar och ekar nära husen samlas barr och löv lätt i hängrännor och ränndalar, och det är värt att hålla dem rena. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Björknäs eller Eknäs och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "langsjo",
    name: "Långsjö",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i villaområdet Långsjö i Söderort, med villor från 1920-talet och framåt och kedjehusen på Långsjöhöjden. Kostnadsfri takkontroll.",
    longDescription:
      "Långsjö är en stadsdel i Söderort i Stockholm. Den har fått sitt namn efter Långsjö gård vid Långsjön, sjön som avgränsar stadsdelen åt sydost och bildar kommungräns mot Huddinge. Gården, med sina två identiska huvudbyggnader, lät affärsmannen Robert Ditzinger uppföra åt sina båda söner 1882. År 1908 kom gårdens marker i AB Billiga Tomters ägo, på samma sätt som Herrängens gårds ägor. Gator och kvarter planerades i början av 1900-talet, och när den första stadsplanen för Långsjö fastställdes 1938 följde den enligt Wikipedia i stort sett det som redan fanns. Till en början var järnvägen från Älvsjö station den enda förbindelsen in till Stockholm. År 1922 kom en busslinje mellan Midsommarkransen och Långsjö, som 1930 togs över av Stockholms Spårvägar och blev linje 64. Bland de äldre villorna nämner Wikipedia en vid Strandängsstigen, ritad 1924 av arkitekten Rolf Solin, och en vid Myrvägen, ritad 1928 av Sten Westholm. Långsjöbadet invigdes 1938. Under senare delen av 1960-talet tillkom Långsjöhöjden. Höjden når 73 meter över havet. Marken var dittills inte planlagd, och där fanns bara skog och en del sommarstugor. År 1966 byggdes 63 kedjehus efter ritningar av arkitekterna Gösta Nordin och Hans Alfont, enligt Wikipedia modernistiska hus med fasader i rött tegel, på båda sidor om en gata som bildar en slinga. I dag beskrivs Långsjö som ett renodlat villaområde med omkring 900 bostäder.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Hägersten-Älvsjö)" },
      { label: "Delområden", value: "Långsjö, Långsjöhöjden" },
      { label: "Hustyper", value: "Villor, kedjehus" },
      { label: "Byggperiod", value: "Villor från 1920-talet (stadsplan 1938), kedjehusen på Långsjöhöjden 1966" },
      { label: "Ägda småhus (avrundat)", value: "Ca 840" },
    ],
    sourceLink: { label: "Wikipedia: Långsjö", url: "https://sv.wikipedia.org/wiki/L%C3%A5ngsj%C3%B6" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Långsjö, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Långsjö?",
      answer:
        "Byggperiod enligt källorna: villor från 1920-talet (stadsplanen fastställdes 1938), kedjehusen på Långsjöhöjden 1966. Hustyper: villor och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Långsjö",
    lat: 59.2675,
    lng: 17.9789,
    nearbyLocations: ["Stockholm", "Herrängen"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Långsjö har två tydliga årgångar. Villorna från 1920-talet är i dag runt hundra år gamla, och kedjehusen på Långsjöhöjden är 60 år. På villorna från 1920-talet kan taket redan ha lagts om, och frågan är då hur länge sedan det var och vad som byttes under ytan: underlagspapp, läkt, plåt och hängrännor. Kedjehus är sammanbyggda med grannhuset. Där taken eller mellandelarna möts behöver anslutningen göras så att den håller tätt åt båda håll, och det är klokt att prata med grannen innan arbetet planeras. Eftersom de 63 husen är ritade och byggda på en gång har de samma förutsättningar, och grannar kan ibland ha nytta av att lägga om taken i samma veva. Varje hus får ändå en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Långsjö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "alsten",
    name: "Ålsten",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Ålsten i Bromma, ett villaområde vid Mälaren där de flesta villorna byggdes mot slutet av 1920-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Ålsten är en stadsdel i Västerort i Stockholm och en del av Bromma trädgårdsstad. Den ligger vid Mälaren och gränsar till Höglandet i väster och till Smedslätten och Äppelviken i öster. I norr går gränsen vid vägen Västerled, mot Stora Mossen och Abrahamsberg. Ålstens gård, på en klippa väster om Ålstensängen, var en kungsgård som Gustav Vasa lät uppföra på 1500-talet. Gårdens namn är enligt Wikipedia först belagt som Asunda, omnämnt 1339, och först 1568 blev namnet Ålsten allmänt använt. Stockholms stad köpte egendomen 1905. I början av 1920-talet styckades området i tomter, stadsplanen fastställdes 1923, och 1926 lades jordbruket ner. Spårvägen drogs fram till hållplatsen Ålstens gård 1924. Flertalet villor byggdes enligt Wikipedia mot slutet av 1920-talet, och omkring 1934 var de sista färdiga. Området mellan Västerled och Nyängsvägen fick sina villor först 1938. De flesta uppfördes av byggmästare och ritades av arkitekterna Edvin Engström och Gustaf Pettersson, som var knutna till Fastighetskontorets egnahemsbyrå. Längs Ålstensgatan ligger radhusen som byggdes 1932–1933 av byggmästaren Olle Engkvist efter ritningar av Paul Hedqvist. De kallas Per Albin-radhusen efter statsminister Per Albin Hansson, som bodde i ett av dem. Enligt Wikipedia såldes radhusen som bostadsrätter, och Stadsmuseet i Stockholm har blåmärkt dem. Terrängen beskrivs som kuperad, med blandskog och mycket berg i dagen.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Bromma)" },
      { label: "Hustyper", value: "Villor, radhus och flerfamiljshus längs Ålstensgatan" },
      { label: "Byggperiod", value: "Villor från 1920-talets början till 1938 (flertalet mot slutet av 1920-talet), radhusen 1932–1933" },
      { label: "Ägda småhus (avrundat)", value: "Ca 810" },
    ],
    sourceLink: { label: "Wikipedia: Ålsten", url: "https://sv.wikipedia.org/wiki/%C3%85lsten" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Ålsten, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Ålsten?",
      answer:
        "Byggperiod enligt källorna: villor från början av 1920-talet till 1938, flertalet mot slutet av 1920-talet, och radhusen längs Ålstensgatan 1932–1933. Hustyper: villor, radhus och enstaka flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Ålsten",
    lat: 59.3235,
    lng: 17.9509,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna i Ålsten kom till under knappt två decennier och är i dag mellan knappt 90 och omkring 100 år gamla. På hus i den åldern kan taket redan ha lagts om, kanske mer än en gång, och husets ålder säger därför lite om takets skick. Det som spelar roll är vad som gjordes vid den senaste omläggningen och hur plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag. När husen i ett område har ritats av samma arkitekter under samma år liknar de ofta varandra i form och proportioner, och ett nytt tak syns i gatubilden. Den som vill byta material eller kulör bör därför ta reda på vad som gäller först. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Där skogen går nära tomterna hamnar barr och löv i hängrännor och ränndalar, som behöver hållas rena. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Ålsten och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "staket",
    name: "Stäket",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Stäket längst norrut i Järfälla, med villor från 1904 och framåt och 1980-talets utbyggnad. Kostnadsfri takkontroll.",
    longDescription:
      "Stäket ligger längst norrut i Järfälla kommun, på östra sidan av Stäksundet, och hör till kommundelen Kallhäll-Stäket. Motorvägen E18 delar området i Norra Stäket och Södra Stäket. Enligt Wikipedia domineras bebyggelsen av friliggande villor och sommarbostäder. Platsen har länge varit en knutpunkt mellan land och vatten. I början av 1600-talet slog sig hantverkare som skomakare, smeder och skräddare ner här, och 1628 fanns som mest omkring 30 hushåll vid det som kallades Stäketfläcken. Den första järnvägsbron över sundet invigdes 1876, och från år 1900 stannade tågen i Stäket. När stationen hade kommit väcktes enligt Wikipedia idén om ett villasamhälle med Djursholm som förebild. Ägaren till Almare-Stäket, greve Gustaf Magnus Björnstjerna, lät stycka av tomter, och de första villorna byggdes 1904 på branten öster om järnvägsstationen. Villa Pardala uppfördes 1906 och Villa Ekeliden 1907. Ett trettiotal villor och sommarstugor kom till under 1900-talets första årtionden, men sedan stannade utbyggnaden av. Wikipedia pekar på avståndet till centrala Stockholm, de glesa tågförbindelserna och konkurrensen från mer etablerade samhällen. På 1940-talet började dagens villasamhälle i Norra Stäket att byggas, sedan AB Tomtcentralen hade köpt och styckat området. Vid Biskop Olovs väg uppfördes 28 kedjehus 1960. Stationen lades ner 1968, när pendeltågstrafiken startade på linjen. År 1982 antogs en stadsplan, och enligt Wikipedia präglas Norra Stäket i dag nästan helt av utbyggnaden under 1980-talet.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Järfälla" },
      { label: "Delområden", value: "Norra Stäket, Södra Stäket" },
      { label: "Hustyper", value: "Friliggande villor, sommarbostäder, kedjehus" },
      { label: "Byggperiod", value: "Första villorna 1904, villasamhället i Norra Stäket från 1940-talet, kedjehus 1960, utbyggnad under 1980-talet" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 700" },
    ],
    sourceLink: { label: "Wikipedia: Stäket", url: "https://sv.wikipedia.org/wiki/St%C3%A4ket" },
    parentLocation: { name: "Järfälla", slug: "jarfalla" },
    h1Override: "Takläggare i Stäket, Järfälla",
    uniqueFAQ: {
      question: "När byggdes husen i Stäket?",
      answer:
        "Byggperiod enligt källorna: första villorna 1904, villasamhället i Norra Stäket från 1940-talet, kedjehus vid Biskop Olovs väg 1960, och utbyggnad under 1980-talet. Hustyper: friliggande villor, sommarbostäder och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Stäket",
    lat: 59.4725,
    lng: 17.7951,
    nearbyLocations: ["Järfälla"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Stäket står hus från fyra skeden nära varandra. Villorna från seklets början är i dag runt 120 år gamla, husen från 1940-talets villasamhälle runt 80 år, kedjehusen vid Biskop Olovs väg drygt 65 år och 1980-talets hus runt 40 år. Taken kan redan ha lagts om, på de tidigaste villorna kanske flera gånger, och husets ålder säger därför inget säkert om takets skick. Det som avgör är vad som finns under ytan i dag: underlagspapp, läkt, plåtdetaljer och hängrännor. På hus från 1980-talet som har kvar sitt första tak är det ofta genomföringar, ränndalar och plåtanslutningar som behöver ses över först. Har en tidigare sommarstuga byggts om eller byggts till för att bo i året om finns det skarvar mellan tak från olika tider, och de är värda en extra titt. På kedjehus möter taket grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Stäket och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "nockebyhov",
    name: "Nockebyhov och Olovslund",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Nockebyhov och Olovslund i Bromma, med småstugor från 1920- och 1930-talen och radhus från efterkrigstiden. Kostnadsfri takkontroll.",
    longDescription:
      "Olovslund och Nockebyhov är två stadsdelar i Bromma i Stockholms västerort. Olovslund gränsar till Åkeslund i norr, Abrahamsberg i öster, Ålsten och Höglandet i söder och Nockeby i väster. Nockebyhov ligger nordväst om Nockeby och sträcker sig från Ängbybadet i väster till Drottningholmsvägen och Nockebybron i söder och till Åkeshov i nordost. Olovslund har sitt namn efter jordbrukaren Johannes Olsson, som byggde en stuga, Olovslunds torp, på mark som han arrenderade av Åkeshovs slott. Stadsdelen kom enligt Wikipedia till som en trädgårdsstad under andra hälften av 1920-talet, huvudsakligen genom självbyggeri på initiativ av Stockholms stads småstugebyrå. Byggarnas insats var det egna arbetet, som skulle motsvara 10 procent av byggkostnaden. Den första stommen restes den 21 maj 1927, och den 10 juli flyttade den första familjen in. Sammanlagt byggdes 135 småstugor 1927–1928. Husen vid Tapetserarvägen kom till 1938 och 1939 och målades genomgående vita. År 1986 blev Olovslund riksintresse för kulturminnesvården. Nockebyhov ligger på mark som Stockholms stad förvärvade 1904. Bebyggelsen är enligt Wikipedia blandad, med småhus från 1930-talet och radhus, kedjehus, punkthus och lamellhus från efterkrigstiden. Norr om Drottningholmsvägen anlades på 1930-talet ett småstugeområde med omkring 200 hus, som till övervägande del byggdes av ägarna själva, ofta efter ritningar av arkitekten Edvin Engström. Mellan Nockeby backe och Södra Ängby började bostadshusen byggas 1948–1949. Radhusområdet vid Rastvägen och rad- och kedjehusområdet Mälarblick är blåmärkta av Stadsmuseet. Mälarblick, med 36 radhus och 14 kedjehus, uppfördes 1961–1968. I sydväst gränsar Nockebyhov till Mälaren.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Bromma)" },
      { label: "Delområden", value: "Olovslund, Nockebyhov (småstugeområdet norr om Drottningholmsvägen, Rastvägen, Mälarblick)" },
      { label: "Hustyper", value: "Småstugor, villor, radhus, kedjehus" },
      { label: "Byggperiod", value: "Olovslund 1927–28 och 1938–39, småstugor i Nockebyhov 1930-tal, bostadshus från 1948–49, Mälarblick 1961–68" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 610" },
    ],
    sourceLink: { label: "Wikipedia: Nockebyhov", url: "https://sv.wikipedia.org/wiki/Nockebyhov" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Nockebyhov och Olovslund, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Nockebyhov och Olovslund?",
      answer:
        "Byggperiod enligt källorna: Olovslunds småstugor 1927–1928 och 1938–1939, Nockebyhovs småstugeområde från 1930-talet, bostadshus från 1948–1949 och Mälarblick 1961–1968. Hustyper: småstugor, villor, radhus och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Nockebyhov",
    lat: 59.3345,
    lng: 17.9086,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Småstugorna i Olovslund är i dag nära hundra år gamla, och 1930-talets småstugor runt 90 år. Rad- och kedjehusen från efterkrigstiden är mellan knappt 60 och drygt 75 år. Så gamla hus har i regel fått taket omlagt minst en gång, och det går inte att utläsa takets skick ur byggåret. Stugor som restes efter samma ritningar har dessutom haft olika ägare och olika underhåll sedan dess, så två grannhus som ser likadana ut kan ha tak i helt olika skick. På rad- och kedjehus hänger taket ihop med grannens, och anslutningarna behöver utföras så att de fungerar tillsammans med grannens tak. Grannar i samma länga kan ibland ha nytta av att planera i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. I Olovslund, som är riksintresse, och i de blåmärkta rad- och kedjehusområdena är det klokt att stämma av med staden innan något ändras. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Nockebyhov eller Olovslund och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "bromma-kyrka",
    name: "Bromma Kyrka",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i stadsdelen Bromma Kyrka, där villatomter började säljas 1905 och småstugor byggdes efter 1938. Kostnadsfri takkontroll.",
    longDescription:
      "Bromma Kyrka är en stadsdel i Västerort i Stockholm, kring kyrkan som har gett den dess namn. Den gränsar till Norra Ängby, Beckomberga, Eneby och Riksby. Stadsdelen bildades 1932, och 1940 bröts den norra delen ut till en egen stadsdel, Eneby. I början av 1900-talet ägdes marken enligt Wikipedia av Eneby gård, kyrkoherdebostället vid Bromma kyrka och Beckomberga gård. Eneby gårds dåvarande ägare började 1905 sälja tomter för villabebyggelse. En stor del av Bromma kyrkojord såldes 1918 för att bebyggas, och för det ändamålet bildades Föreningen Bromma Trädgårdar, som fanns kvar till 1946. År 1938 köpte staden återstoden av fastigheten, som bebyggdes med småstugor. Tomterna var från början mycket stora. Enligt Wikipedia låg de på mellan 4 000 och 7 000 kvadratmeter, och efter hand har de delats, så att tomterna nu är mellan 300 och 3 500 kvadratmeter. På de avstyckade tomterna kan husen vara betydligt yngre. Gatunamnen berättar om ursprunget: flera vägar har namn efter kyrkoherdar och godsägare, till exempel Doktor Abrahams väg och Stierncronas väg, och andra namn syftar på kyrkliga företeelser, som Prebendet, Annexet och Vapenhuset. Fjorton vägar fick sina namn redan 1924. Spångavägen, som går från Brommaplan till Spånga, fick sitt namn 1938.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Bromma)" },
      { label: "Hustyper", value: "Villor, småstugor" },
      { label: "Byggperiod", value: "Tomtförsäljning från 1905, Bromma Trädgårdar från 1918, småstugor efter 1938" },
      { label: "Ägda småhus (avrundat)", value: "Ca 740" },
    ],
    sourceLink: { label: "Wikipedia: Bromma kyrka (stadsdel)", url: "https://sv.wikipedia.org/wiki/Bromma_kyrka_(stadsdel)" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Bromma Kyrka, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Bromma Kyrka?",
      answer:
        "Byggperiod enligt källorna: tomtförsäljning från 1905, Bromma Trädgårdar från 1918, och småstugor på den mark staden köpte 1938. Hustyper: villor och småstugor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Bromma Kyrka",
    lat: 59.3544,
    lng: 17.9208,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Att tomter har sålts i omgångar och sedan delats betyder att hus från olika tider står sida vid sida. De villor som byggdes på de första tomterna efter 1905 är i dag över hundra år gamla, och småstugorna som kom till efter 1938 är över 80 år. På de avstyckade tomterna kan husen vara yngre. Det går därför inte att säga något gemensamt om taken i stadsdelen, och på de äldre husen kan taken ha lagts om mer än en gång. Vid en takkontroll är det underlagspapp, läkt, plåtdetaljer, skorstensanslutningar och hängrännor som visar hur taket mår, oavsett när huset byggdes. På en villa som har byggts till under årens lopp är det dessutom värt att se efter där nyare och äldre takdelar möts, eftersom skarvar och ränndalar är känsliga ställen. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Bromma Kyrka och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "flysta",
    name: "Flysta",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i villastadsdelen Flysta i Västerort, där tomterna började styckas 1905. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Flysta är en stadsdel i den södra delen av Järva stadsdelsområde i Stockholms västerort. Enligt Wikipedia är den i huvudsak bebyggd med villor, men utmed Spångavägen finns också ett antal hyreshus. Platsen har varit bebodd länge. På Flystaberget finns ett röse, troligen från bronsåldern, och vid Skogslöparvägen ligger gravfält från vikingatiden. Namnet är belagt 1375, då en bonde vid namn Gunnar nämns i \"flyastum\". Förleden kan enligt Wikipedia vara det fornsvenska namnet Fly, men också ordet fly, som betyder sumpmark. På den tidigaste kända kartan, från 1636, är en gårdsbyggnad markerad söder om Flystaberget, och vid storskiftet 1794 bestod byn av fyra gårdar med torp. År 1905 började marken styckas till villatomter. Enligt Spånga Egnahemsförening hade den förste nybyggaren sitt hus klart samma år, och under det följande årtiondet blev ett hundratal familjer bofasta i Flysta Villastad. År 1915 bildades Flysta municipalsamhälle, som gav ett visst självstyre inom Spånga landskommun. På 1920-talet hade samhället enligt föreningen omkring 600 invånare. Då rustades vägarna upp och fick belysning, och Flysta fick en egen brandstation, som också rymde municipalnämndens expedition. Den 1 januari 1949 införlivades Spånga landskommun, och därmed Flysta, med Stockholm. Samhället hade då drygt 2 000 invånare. Året därpå blev Flysta en egen stadsdel.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Järva)" },
      { label: "Hustyper", value: "Villor, hyreshus utmed Spångavägen" },
      { label: "Byggperiod", value: "Från 1905" },
      { label: "Ägda småhus (avrundat)", value: "Ca 660" },
    ],
    sourceLink: { label: "Wikipedia: Flysta", url: "https://sv.wikipedia.org/wiki/Flysta" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Flysta, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Flysta?",
      answer:
        "Byggperiod enligt källorna: villatomterna började styckas 1905, och samhället växte till drygt 2 000 invånare fram till 1949. Hustyper: villor, med hyreshus utmed Spångavägen. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Flysta",
    lat: 59.3679,
    lng: 17.905,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Flysta växte från ett hus 1905 till ett samhälle med drygt 2 000 invånare 1949, och husen från de åren är i dag mellan ungefär 75 och 120 år gamla. Hur gamla de hus är som har byggts senare framgår inte av källorna. På hus i den åldern har taket som regel lagts om, ibland mer än en gång, och byggåret säger därför lite om skicket. En omläggning som gjordes för flera årtionden sedan kan i sin tur vara på väg att bli gammal. Det som går att bedöma på plats är underlagspapp, läkt, plåtdetaljer, skorstensanslutningar och hängrännor. I en villastad som har byggts av enskilda nybyggare, hus för hus, ser inget tak ut som grannens: takvinklar, kupor och tillbyggnader skiljer sig åt, och det gör också arbetet. Därför får varje hus en egen takkontroll och ett eget pris. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Flysta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "vidja",
    name: "Vidja och Högmora",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Vidja, Högmora och Ågesta i Huddinge, fritidshusområden som blir åretruntbostäder. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Vidja, Högmora och Ågesta ligger i Huddinge kommun, kring sjöarna Magelungen, Ågestasjön och Orlången. Högmora gränsar i nordväst mot Magelungen och Stockholms kommun och i sydost mot kommundelen Vidja-Ågesta. Ågesta avgränsas i norr av Magelungen och i väster av Ågestasjön, och Vidja ligger söder om Ågesta, vid Orlångens östra sida. Bilväg till Vidja finns enligt Wikipedia bara norrifrån, genom Ågesta. Vidja var från början ett torp, och namnet är belagt sedan 1535, då det skrevs Viddia. Gården var känd för sina stora ekskogar. År 1910 styckades egendomen, som då omfattade 215 hektar, upp i 36 lotter, och genom vidare styckning blev det omkring 500 tomter. En av exploatörerna var AB Hem på landet, som enligt Wikipedia sålde tomterna till arbetare och lägre tjänstemän. Utbyggnaden skedde huvudsakligen på 1940-talet, och Vidja blev ett utpräglat sommarstugeområde. I dag är majoriteten av fastigheterna permanentbebodda, men andelen fritidshus var länge så hög att Vidja räknades som tätort först 1995. Högmora har sitt namn efter torpen Stora och Lilla Högmora, som båda nämns i husförhörslängden sedan 1689. Kommundelen består enligt Wikipedia huvudsakligen av fritidshus, nybyggda villor och parhus. En stor del av den obebyggda marken i Högmora är naturmark som hör till Orlångens naturreservat. Både i Högmora och i Vidja pågick 2022 en utbyggnad av gator, vatten och avlopp och en omvandling till permanentboende. Ågesta är mest skogbevuxet, och där ligger Ågesta gård, med en huvudbyggnad i sten från 1600-talet.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Huddinge" },
      { label: "Delområden", value: "Vidja, Högmora, Ågesta" },
      { label: "Hustyper", value: "Villor och fritidshus, i Högmora även parhus" },
      { label: "Byggperiod", value: "Vidja: styckning från 1910, utbyggnad huvudsakligen 1940-tal, i dag även nybyggda villor" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 160" },
    ],
    sourceLink: { label: "Wikipedia: Vidja, Huddinge kommun", url: "https://sv.wikipedia.org/wiki/Vidja,_Huddinge_kommun" },
    parentLocation: { name: "Huddinge", slug: "huddinge" },
    h1Override: "Takläggare i Vidja och Högmora, Huddinge",
    uniqueFAQ: {
      question: "När byggdes husen i Vidja och Högmora?",
      answer:
        "Byggperiod enligt källorna: Vidja styckat från 1910 med utbyggnad huvudsakligen på 1940-talet, i dag även nybyggda villor. Hustyper: villor och fritidshus, i Högmora även parhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Vidja",
    lat: 59.1972,
    lng: 18.0597,
    nearbyLocations: ["Huddinge", "Stuvsta", "Trångsund"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I ett område som går från fritidshus till åretruntbostäder står hus av mycket olika ålder sida vid sida. En stuga från 1940-talets utbyggnad i Vidja är i dag runt 80 år gammal, medan villan på granntomten kan vara nybyggd. Det går därför inte att säga något generellt om taken här: en del är nya, andra kan ha lagts om en eller flera gånger, och på en del hus har taket inte bytts på länge. Där det är fallet är underlagspapp, läkt, plåtdetaljer och hängrännor det som oftast behöver ses över. När en sommarstuga byggs ut för att bli bostad året runt får den ofta nya takytor som ansluter till det gamla taket, och skarvarna mellan gammalt och nytt är värda att se efter. Med skog nära inpå hamnar barr och löv lätt i hängrännor och ränndalar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Vidja, Högmora eller Ågesta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "glomsta",
    name: "Glömsta",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Glömsta i norra Huddinge, ett tidigare fritidshusområde med villor från 1990- och 2000-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Glömsta är en kommundel i norra Huddinge. Den omges av Vårby, Kungens kurva och Segeltorp i norr, Snättringe och Fullersta i öster, Flemingsberg i söder och Vårby och Loviseberg i väster. De södra och västra delarna är bebyggda, medan den norra delen är naturmark med en del av sjön Gömmaren och Gömmarens naturreservat. Diagonalt genom området går Gamla Stockholmsvägen, som har sin föregångare i Göta landsväg. Glömsta hör enligt Wikipedia till Huddinges äldre bosättningar, med gravfält från yngre järnåldern. På Glömstahällen, söder om Glömstavägen, finns en ristning om en bro som Sverker lät göra efter sin mor Ärengunn. Glömsta gård, som har gett området dess namn, nämns i skrift första gången 1437. Tomtexploateringen började med ryttmästaren Hjalmar Carlsson, och på 1930- och 1940-talen styckades och byggdes området ut i stor omfattning. I norr, mot Gömmaren, blev det mest sommarstugor, medan småhus för permanentboende kom till längre söderut. På 1950-talet dämpades byggandet, eftersom frågan om vatten och avlopp inte var löst. Sedan kommunen på 1990-talet hade anlagt vägar och kommunalt vatten och avlopp uppfördes nya enfamiljshus i snabb takt. Bebyggelsen består enligt Wikipedia huvudsakligen av villor från slutet av 1990-talet och början av 2000-talet, och Huddinge kommun beskriver Glömsta som till stor del ett gammalt fritidshusområde som har förtätats genom nya detaljplaner. Bostadsområdet Gretas backe belönades 2017 med Huddinges byggnadspris. Enligt kommunen planeras ett nytt lokalt centrum i Loviseberg, i Glömstadalen.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Huddinge" },
      { label: "Delområden", value: "Glömsta, Loviseberg" },
      { label: "Hustyper", value: "Enfamiljshus (villor), kvarvarande fritidshus" },
      { label: "Byggperiod", value: "Styckning och utbyggnad 1930–1940-tal, huvudsakligen villor från slutet av 1990-talet och början av 2000-talet" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 040" },
    ],
    sourceLink: { label: "Wikipedia: Glömsta (kommundel)", url: "https://sv.wikipedia.org/wiki/Gl%C3%B6msta_(kommundel)" },
    parentLocation: { name: "Huddinge", slug: "huddinge" },
    h1Override: "Takläggare i Glömsta, Huddinge",
    uniqueFAQ: {
      question: "När byggdes husen i Glömsta?",
      answer:
        "Byggperiod enligt källorna: styckning och utbyggnad på 1930- och 1940-talen, och huvudsakligen villor från slutet av 1990-talet och början av 2000-talet. Hustyper: enfamiljshus och kvarvarande fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Glömsta",
    lat: 59.2397,
    lng: 17.9192,
    nearbyLocations: ["Huddinge", "Segeltorp", "Snättringe"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De flesta villorna i Glömsta är i dag runt 20–30 år gamla. På hus i den åldern handlar en takkontroll mer sällan om hela taket och oftare om detaljerna: genomföringar för ventilation, plåtbeslag kring skorsten och takfönster, ränndalar och hängrännor. Det är också där ett läckage oftast börjar, oavsett husets ålder. Mellan de nyare villorna står hus från 1930- och 1940-talens utbyggnad, som i dag är runt 80–90 år gamla, och stugor som har blivit åretruntbostäder. Deras tak kan redan ha lagts om, men där det inte har skett är det underlagspapp och läkt som behöver bedömas, inte bara ytan. Två hus på samma gata kan alltså ha helt olika förutsättningar, och det enda sättet att veta är att se på just det taket. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Glömsta eller Loviseberg och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "kummelnas",
    name: "Kummelnäs",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Kummelnäs och Velamsund i nordöstra Boo, villaområden som började som egnahem och sommarstugor. Kostnadsfri takkontroll.",
    longDescription:
      "Kummelnäs utgör den nordöstra delen av Boo i Nacka kommun och består enligt Wikipedia av villaområden som från början var sommarstugeområden, tillsammans med några mindre industriområden. Namnet kommer från Kummelnäs gård, som är känd sedan 1600-talet. Gårdens huvudbyggnad från 1698 var den sista byggnaden i Boo socken som stod kvar från tiden före rysshärjningarna 1719. Den revs 1993 och ersattes av en snarlik kopia. Här fanns också en optisk telegrafstation, invigd 1795, som har gett namn åt Telegrafberget vid Halvkakssundet. På 1820-talet uppfördes en kemisk fabrik vid Kummelnäs, Vita Längan, vars mest spridda produkt var ättika. Tillverkningen upphörde 1851, och byggnaden används i dag som förskola. Mot slutet av 1800-talet styckades stora markområden av från godset, främst för sommarhus. Kristna Egnahemsföreningen, bildad 1899 med byggmästaren Kaspar Höglund som ordförande, köpte 1907 ett stort markområde som planlades med vägar och tomter för medlemmarnas villor. Enligt Wikipedia var de flesta husen träbyggnader och självbyggen, och man räknade då med en järnvägsförbindelse till Stockholm som aldrig blev av. Villa Vinterbo, uppförd 1912–1915 norr om Kummelnäsviken, är ett av områdets få stenhus. På 1930-talet tomtindelades stora områden för sportstugor. Också vid Velamsund, den gamla lantegendomen vid Insjön, såldes tomtmark till sommarbebyggelse sedan grosshandlaren Emil Egnell hade köpt godset 1880. Kommunen köpte gården 1964, och området hör i dag till stor del till Velamsunds naturreservat.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Nacka" },
      { label: "Delområden", value: "Kummelnäs, Velamsund" },
      { label: "Hustyper", value: "Villor (tidigare sommarstugeområden)" },
      { label: "Byggperiod", value: "Sommarhus från slutet av 1800-talet, egnahemsvillor från 1907, sportstugor på 1930-talet" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 000" },
    ],
    sourceLink: { label: "Wikipedia: Kummelnäs", url: "https://sv.wikipedia.org/wiki/Kummeln%C3%A4s" },
    parentLocation: { name: "Nacka", slug: "nacka" },
    h1Override: "Takläggare i Kummelnäs, Nacka",
    uniqueFAQ: {
      question: "När byggdes husen i Kummelnäs?",
      answer:
        "Byggperiod enligt källorna: sommarhus från slutet av 1800-talet, egnahemsvillor från markköpet 1907, och sportstugor från 1930-talet. Hustyper: villor, ursprungligen sommarstugeområden. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Kummelnäs",
    lat: 59.3496,
    lng: 18.2799,
    nearbyLocations: ["Nacka", "Lännersta"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Kummelnäs har alltså byggts i flera omgångar och till stor del av dem som själva skulle bo i husen. De tidigaste egnahemsvillorna är i dag över 100 år gamla och sportstugorna från 1930-talet runt 90 år, och sommarstugeområdena har sedan dess blivit villaområden. Taken kan därför vara allt från nylagda till mycket gamla, och en del kan redan ha lagts om. Där taket inte har bytts på länge är det oftast underlagspapp, läkt, plåtdetaljer och hängrännor som behöver ses över. På självbyggda hus följer taket sällan en gemensam ritning. Taklutning, takstolar och underlag kan skilja sig från hus till hus, och en lösning som passar på ett tak passar inte alltid på grannens. Därför går det inte att bedöma ett tak här utan att se det. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Kummelnäs eller vid Velamsund och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "hersby",
    name: "Hersby och Herserud",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Hersby, Herserud och Islinge på Lidingö, villastäder från 1900-talets början. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Hersby ligger på centrala Lidingö och utgör enligt Wikipedia kärnan i Lidingö villastad, som bildades 1906. Väster om Hersby ligger Herserud, Torsvik och Islinge, i norr Näset, i öster Kyrkviken och Koltorp och i söder Stockby, Gångsätra och Mosstorp. Namnet kommer från Hersby gård, ett lantbruk med anor från 1400-talet. I början av 1900-talet såldes stora delar av marken till Lidingö villastad, som styckade upp den och sålde tomterna för villor. Arkitekten Per Olof Hallman upprättade stadsplanen 1907, och efter bearbetning antogs den officiellt 1913. Det oregelbundna gatunätet, anpassat efter terrängen, var enligt Wikipedia en nyhet för tiden. Tomterna styckades stora, med boningshuset mitt på fastigheten, och nästan alla vägar och villor ligger än i dag kvar enligt den ursprungliga planen. I kvarteret Holmia, som bebyggdes efter 1906, har villorna enligt Wikipedia till stor del kvar sina ursprungliga exteriörer i nationalromantik, jugendstil och jugendbarock. Radhusen i kvarteret Tegen större och mindre uppfördes 1908–1909. Herserud köptes på tidigt 1900-tal av ett bolag och styckades i villatomter, som började säljas 1906. Den förste köparen var skulptören Carl Milles. Herserud och Islinge gränsar båda i väster till Lilla Värtan. Islinge villasamhälle bildades 1905 av bergsingenjören Carl Gustaf Dahlerus, ägare till Islinge gård, och ingick inte i Hallmans plan. Området norr om Norra Kungsvägen fick stadsplan 1932 och delen söder om vägen 1969, för fritt liggande hus i högst två våningar. Husen ligger enligt Wikipedia huvudsakligen högt, på de två kullar som omger Islingeviken.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Lidingö" },
      { label: "Delområden", value: "Hersby, Herserud, Islinge (södra)" },
      { label: "Hustyper", value: "Villor, i Hersby även radhus" },
      { label: "Byggperiod", value: "Hersby: villor från 1906, stadsplan 1907/1913. Herserud: tomtförsäljning från 1906. Islinge: villasamhälle 1905, stadsplaner 1932 och 1969" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 000" },
    ],
    sourceLink: { label: "Wikipedia: Hersby", url: "https://sv.wikipedia.org/wiki/Hersby" },
    parentLocation: { name: "Lidingö", slug: "lidingo" },
    h1Override: "Takläggare i Hersby och Herserud, Lidingö",
    uniqueFAQ: {
      question: "När byggdes husen i Hersby och Herserud?",
      answer:
        "Byggperiod enligt källorna: Hersby villor från 1906 (stadsplan 1907/1913), Herserud tomtförsäljning från 1906, Islinge villasamhälle från 1905 med stadsplaner 1932 och 1969. Hustyper: villor, i Hersby även radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Hersby",
    lat: 59.3637,
    lng: 18.1485,
    nearbyLocations: ["Lidingö", "Sticklinge", "Mölna"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De tidigaste villorna i Hersby och Herserud är i dag omkring 110–120 år gamla. På så gamla hus kan taket ha lagts om flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. Villor från det tidiga 1900-talet har ofta sammansatta tak, med kupor, vinklar och flera anslutningar i plåt, och det är i ränndalar, kring skorstenar och vid sådana anslutningar som ett läckage oftast börjar. Ju fler detaljer ett tak har, desto större del av arbetet ligger i plåten. I Islinge och i de kvarter som bebyggdes senare är husen yngre, och åldern skiljer sig från tomt till tomt. Radhus delar anslutningar med grannens tak, och de behöver utföras så att taken fungerar ihop. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Hersby, Herserud eller Islinge och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "malarhojden",
    name: "Mälarhöjden",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Mälarhöjden vid Mälaren, med villor från sekelskiftet, 1920-talet och funkisåren. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Mälarhöjden är en stadsdel i Söderort i Stockholm. Den ligger vid Mälaren, ingår i Hägersten-Älvsjö stadsdelsområde och gränsar till Hägersten, Västertorp, Fruängen och Bredäng, med vattengräns mot Ekerö kommun. Stadsdelen är enligt Wikipedia mycket kuperad, och den högsta punkten, vid Backvindeln, ligger knappt 72 meter över havet. Långt in på 1940-talet fanns här flera äldre gårdar, bland dem Pettersbergsgården, Johannisdalsgården och Slättens gård. Pettersberg var en sjökrog vid Mälaren, känd från 1772. Från 1890-talet byggdes sommarhus i området, och samhället som växte fram kallades Fridhems villastad, efter lägenheten Fridhem som hade styckats av redan 1880. Till och från innerstaden reste man med ångbåt till Fridhemsbryggan, tills en spårvägslinje öppnades 1913. Den 1 januari 1914 fastställdes Mälarhöjden som postadress, eftersom Fridhem var ett ortnamn som fanns på flera håll i landet. Enligt Wikipedia kom namnförslaget från Emma Hedin, hushållerska hos grosshandlaren Nils Sandberg på Johannisdalsgården. Byggandet var särskilt omfattande på 1920-talet, då en stor del av Johannisdalsgårdens tidigare mark bebyggdes. Området söder om Mälarhöjdsvägen och öster om Ugglemossvägen började bebyggas då, och samtidigt uppfördes ett trettiotal småstugor kring Johannisdals gård. På 1930-talet byggdes enligt Wikipedia en rad hus i funkisstil vid Pettersbergsvägens västra del, och tre visningshus från Stockholmsutställningen 1930 flyttades till Båtsmansklevet och Båtsmanskroken. Området strax väster om Ugglemossvägen började byggas på 1960-talet.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Hägersten-Älvsjö)" },
      { label: "Delområden", value: "Mälarhöjden (tidigare Fridhems villastad)" },
      { label: "Hustyper", value: "Villor, småstugor, enstaka flerfamiljshus" },
      { label: "Byggperiod", value: "Sommarhus från 1890-talet, omfattande byggande 1920-tal, funkishus 1930-tal, väster om Ugglemossvägen från 1960-talet" },
      { label: "Ägda småhus (avrundat)", value: "Ca 990" },
    ],
    sourceLink: { label: "Wikipedia: Mälarhöjden", url: "https://sv.wikipedia.org/wiki/M%C3%A4larh%C3%B6jden" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Mälarhöjden, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Mälarhöjden?",
      answer:
        "Byggperiod enligt källorna: sommarhus från 1890-talet, särskilt omfattande byggande på 1920-talet, funkishus på 1930-talet, och området väster om Ugglemossvägen från 1960-talet. Hustyper: villor, småstugor och enstaka flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Mälarhöjden",
    lat: 59.3005,
    lng: 17.9557,
    nearbyLocations: ["Stockholm", "Hägersten"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Mälarhöjden står alltså hus från fyra skeden: sommarvillor från tiden kring sekelskiftet 1900, som i dag är runt 120–130 år gamla, villor och småstugor från 1920-talet, runt 100 år, funkishus från 1930-talet, runt 90 år, och hus från 1960-talet, runt 60 år. På hus som är hundra år eller mer kan taket ha lagts om flera gånger. Det som avgör skicket är när det senast gjordes och hur underlaget ser ut i dag, inte när huset byggdes. Husens stilar skiljer sig också åt, och därmed takens form och lutning. Ett tak med flera kupor och vinklar har fler ränndalar och plåtanslutningar att se över än ett enkelt sadeltak, och på ett tak med låg lutning ställs högre krav på tätskiktet. I den kuperade terrängen ligger tomterna dessutom på olika höjd, så åtkomsten till taket skiljer sig från hus till hus. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Mälarhöjden och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "stureby",
    name: "Stureby",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Stureby i Söderort, med villor främst från 1920–1960-talen och radhus från 1950- och 1960-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Stureby är en stadsdel i Söderort i Stockholm och gränsar till Östberga, Enskedefältet, Örby slott, Bandhagen och Svedmyra. Marken hörde tidigare till Örby säteri, Ersta gård och Östberga gård. Till gårdarna hörde åtta torp, som alla är rivna i dag. Ett av dem, Tussmötetorpet, har gett namn åt Tussmötevägen. Området började bebyggas 1921 och kallades då Ersta Villastad. Diakonissorna på Ersta diakonissanstalt på Södermalm protesterade mot namnet, och 1925 valdes i stället Stureby, efter Sten Sture den yngre och slaget vid Brännkyrka. Redan 1907 hade Fastighets AB Villahem köpt mark från Ersta gård, och längs Tussmötevägen, som anlades 1918, restes de första villorna enligt Wikipedia som självbyggen, av hantverkare för sig själva och sina familjer. Från 1923 gick en privat busslinje till Ringvägen på Södermalm, vilket satte igång villabyggandet, och 1930 ersattes bussen av en spårvägslinje. Den första stadsplanen, från 1929, gällde den östra delen och omfattade 36 kvarter för villor med trädgård. I slutet av 1930-talet var Stureby ett väl utbyggt villasamhälle. Enligt Wikipedia är villorna från 1910-talet fram till i dag, med en majoritet från 1920–1960-talen. Radhusen vid Vivstavarvsvägen och Husumsgränd kom till i början av 1950-talet. De är ritade av arkitekten Erik F. Dahl och enligt Wikipedia blåmärkta av Stadsmuseet i Stockholm. I sydvästra Stureby ligger ytterligare ett radhusområde, vid Långåkersvägen, uppfört 1964–1970.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Enskede-Årsta-Vantör)" },
      { label: "Delområden", value: "Stureby (tidigare Ersta Villastad)" },
      { label: "Hustyper", value: "Villor, radhus, flerfamiljshus" },
      { label: "Byggperiod", value: "Villor från 1910-talet, majoriteten 1920–1960-tal. Radhus tidigt 1950-tal (Vivstavarvsvägen) och 1964–1970 (Långåkersvägen)" },
      { label: "Ägda småhus (avrundat)", value: "Ca 980" },
    ],
    sourceLink: { label: "Wikipedia: Stureby", url: "https://sv.wikipedia.org/wiki/Stureby" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Stureby, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Stureby?",
      answer:
        "Byggperiod enligt källorna: villor från 1910-talet, med en majoritet från 1920- till 1960-talet. Radhusen vid Vivstavarvsvägen från tidigt 1950-tal, radhusen vid Långåkersvägen 1964–1970. Hustyper: villor, radhus och flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Stureby",
    lat: 59.2746,
    lng: 18.0558,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Flertalet villor i Stureby är i dag mellan runt 60 och 100 år gamla, radhusen vid Vivstavarvsvägen runt 75 år och radhusen vid Långåkersvägen runt 55–60 år. I ett villasamhälle som har vuxit fram hus för hus säger gatans ålder lite om det enskilda taket. Två grannhus från samma decennium kan ha helt olika tak i dag, det ena omlagt och det andra inte. Där taket inte har bytts på länge är det underlagspapp, läkt, plåtdetaljer och hängrännor som brukar behöva ses över. I en radhuslänga ligger taken i ett sammanhang. Ett takbyte på ett hus berör anslutningarna mot grannarna på båda sidor, och de behöver utföras så att längans tak fortsätter att fungera ihop. Hus i samma länga är byggda samtidigt, och grannar kan därför ha nytta av att stämma av sina planer med varandra. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Stureby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "resaro",
    name: "Resarö",
    region: "Kusten",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Resarö i Vaxholm, sommarön som blev villaförort, med Ytterby och Björkvik. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Resarö är en omkring fyra kilometer lång ö och en tätort i Vaxholms kommun. Namnet är belagt sedan 1303, då en källa på latin nämner \"in risarnum\", på Resarö. På ön ligger Ytterby gruva. År 1787 hittade löjtnanten Carl Axel Arrhenius, som var förlagd vid Vaxholms fästning, en ovanligt tung svart sten här, och den fick senare namnet gadolinit. Ur gruvans mineral har enligt Wikipedia nio grundämnen isolerats och identifierats, och fyra av dem har namn efter platsen: yttrium, ytterbium, terbium och erbium. Brytningen av fältspat upphörde 1933, och 1989 sattes en minnesplakett upp vid gruvans ingång. Villabebyggelsen började med Ytterbystrand, ett villaområde som häradshövdingen och advokaten Birger Svenonius grundade 1903. Där byggdes också tennisbanor, ett badhus med hopptorn, ett societetshus och en kinesisk paviljong. Av dem finns bara paviljongen kvar, och den används som biograf. Resarö kapell, en monteringsfärdig vandringskyrka, invigdes på ön 1968. I slutet av 1900-talet förvandlades Resarö enligt Wikipedia från sommarö till villaförort, med allt fler permanentboende. Så sent som 1990 räknade SCB bebyggelsen på öns västra del som en egen småort, med 263 invånare, men fem år senare hade den vuxit ihop med tätorten. Enligt hitta.se är villorna och kedjehusen vid Ytterbyvägen främst byggda på 1970- och 1980-talen, husen vid Björkviksvägen på 1920- och 2000-talen och husen på Resarö i övrigt på 1980- och 2000-talen.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Vaxholm" },
      { label: "Delområden", value: "Ytterby, Björkvik" },
      { label: "Hustyper", value: "Villor och kedjehus" },
      { label: "Byggperiod", value: "Ytterbystrand från 1903, Ytterbyvägen främst 1970- och 1980-tal, Björkviksvägen 1920- och 2000-tal, övrigt 1980- och 2000-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 510" },
    ],
    sourceLink: { label: "Wikipedia: Resarö", url: "https://sv.wikipedia.org/wiki/Resar%C3%B6" },
    parentLocation: { name: "Vaxholm", slug: "vaxholm" },
    h1Override: "Takläggare på Resarö, Vaxholm",
    uniqueFAQ: {
      question: "När byggdes husen på Resarö?",
      answer:
        "Byggperiod enligt källorna: Ytterbystrand från 1903, villorna och kedjehusen vid Ytterbyvägen främst 1970- och 1980-tal, Björkviksvägen 1920- och 2000-tal, och övriga Resarö 1980- och 2000-tal. Hustyper: villor och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Resarö",
    lat: 59.4308,
    lng: 18.3333,
    nearbyLocations: ["Vaxholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Byggåren visar att Resarö har hus från tre skeden bredvid varandra: sommarvillornas tid, 1970- och 1980-talens villor och kedjehus och 2000-talets hus. Villorna och kedjehusen vid Ytterbyvägen är i dag runt 40–55 år gamla, de äldsta husen vid Björkviksvägen runt hundra år och 2000-talets hus runt 20 år. Taken kan redan ha lagts om, på de äldsta husen flera gånger, och på de yngsta är det för tidigt att tala om takbyte. Vad som behöver göras går bara att säga hus för hus. På en ö som har gått från sommarboende till åretruntboende finns det hus som har byggts om och till i flera steg. Där är det övergångarna som ska granskas: där en tillbyggnads tak möter det ursprungliga, runt takkupor och i ränndalar. På kedjehus ligger taket dikt an mot grannens, och den anslutningen behöver planeras ihop med grannens del. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du på Resarö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "rindo",
    name: "Rindö",
    region: "Kusten",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Rindö och Skarpö i Vaxholm, öar med vägfärja och bro. Kostnadsfri takkontroll utan förpliktelser och fast pris i offerten.",
    longDescription:
      "Rindö är en ö i Vaxholms kommun, strax öster om Vaxholm. Enligt Wikipedia är den ungefär fem kilometer lång och drygt en kilometer bred, och 2020 bodde 1 522 personer här året om. Ön hör till Vaxholm sedan 1913. Det går att köra bil hit. Länsväg 274 går över ön, med vägfärja till Vaxholm i väster och till Värmdö i öster, och en buss går tvärs över ön mellan färjelägena. Från Rindö leder en bro vidare till Skarpö, som fördes till Vaxholm 1950. På ön finns en tätort, Rindö, och småorten Rindöby. Rindö har länge varit en försvarsö. Här har funnits befästningar sedan 1500-talet, med försvarsverk på både den östra och den västra sidan, anlagda för att bevaka farlederna in mot Stockholm. Ett regemente låg på ön fram till hösten 2005, och sedan dess har kommunen planlagt nya bostadsområden och ombyggnad av de gamla försvarsbyggnaderna på Rindö och Skarpö. Enligt hitta.se är villorna på Rindö mest byggda på 1940- och 1960-talen.",
    extraContent:
      "",
    parentLocation: {"name":"Vaxholm","slug":"vaxholm"},
    uniqueFAQ: {"question":"När byggdes husen på Rindö?","answer":"Byggperiod enligt källorna: villor mest 1940- och 1960-tal, nybyggnation efter 2005. Hustyper: villor, nya bostadsområden, ombyggda försvarsbyggnader. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Rindö",
    lat: 59.3986,
    lng: 18.4017,
    nearbyLocations: ["Vaxholm","Resarö"],
    factBox: [{"label":"Kommun","value":"Vaxholm"},{"label":"Delar","value":"Rindö (tätort), Rindöby, Skarpö (bro)"},{"label":"Hustyper","value":"Villor, nya bostadsområden, ombyggda försvarsbyggnader"},{"label":"Byggperiod","value":"Villor mest 1940- och 1960-tal, nybyggnation efter 2005"},{"label":"Väg","value":"Länsväg 274, vägfärja till Vaxholm och Värmdö, bro till Skarpö"}],
    sourceLink: {"label":"Wikipedia, Rindö","url":"https://sv.wikipedia.org/wiki/Rindö"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Villorna från 1940- och 1960-talen är i dag mellan 60 och 85 år gamla. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och ett tak kan se helt ut från vägen och ändå ha ett slitet underlag. Därför börjar vi alltid med att titta på taket på plats. Två saker är värda att tänka på. På en ö där det har byggts i omgångar står hus av olika ålder nära varandra, så grannens tak säger inte mycket om ditt eget. Och ett hus som har byggts om och till har ofta takdelar av olika ålder, där skarven mellan dem är värd en extra titt. Eftersom vägfärjan tar bilar kan material, ställning och container köras fram till huset som på fastlandet. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du på Rindö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "tynningo",
    name: "Tynningö",
    region: "Kusten",
    isIsland: true,
    description:
      "Takbyte och takomläggning på Tynningö i Vaxholm, sommarön med bilfärja. Kostnadsfri takkontroll utan förpliktelser och fast pris i offerten.",
    longDescription:
      "Tynningö är en ö vid Södra Vaxholmsfjärden, strax söder om Vaxholm, och hör till Vaxholms kommun sedan 1950. Sedan 2015 räknas ön som tätort. Enligt Wikipedia går det reguljära båtar hit från Vaxholm och Stockholm, och en bilfärja mellan östra Tynningö och Norra Lagnö. Ön nämns första gången 1322. Under 1600- och 1700-talen bytte den ägare flera gånger, och en flygel av säterigården står kvar från tidigt 1700-tal. På 1800-talet styckades ön i mindre bondejordbruk. Jordbruket levde kvar länge: enligt Wikipedia pågick det fram till 1980-talet. Sommargästerna kom i början av 1900-talet. Då styckades delar av ön i mindre tomter, som såldes till sommargäster som tog sig hit med ångbåt. Vägarna var länge smala och backiga. Först på 1940-talet byggdes landsvägen över ön, och på 1950-talet blev det väg fram till Norra Tynningö brygga. År 1951 fick ön en av de tidiga självbetjäningsbutikerna. Enligt hitta.se är villorna på Tynningö byggda på 1920- och 1950-talen, och här finns också fritidshus.",
    extraContent:
      "",
    parentLocation: {"name":"Vaxholm","slug":"vaxholm"},
    uniqueFAQ: {"question":"När byggdes husen på Tynningö?","answer":"Byggperiod enligt källorna: tomter från början av 1900-talet, villor 1920- och 1950-tal. Hustyper: villor, fritidshus, sommarhus på tomter från 1900-talets början. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Tynningö",
    lat: 59.37,
    lng: 18.4108,
    nearbyLocations: ["Vaxholm","Rindö"],
    factBox: [{"label":"Kommun","value":"Vaxholm"},{"label":"Hustyper","value":"Villor, fritidshus, sommarhus på tomter från 1900-talets början"},{"label":"Byggperiod","value":"Tomter från början av 1900-talet, villor 1920- och 1950-tal"},{"label":"Väg","value":"Bilfärja mellan östra Tynningö och Norra Lagnö, landsväg från 1940-talet"}],
    sourceLink: {"label":"Wikipedia, Tynningö","url":"https://sv.wikipedia.org/wiki/Tynningö"},
    extraSections: [{"heading":"Vad det betyder för taket","text":"Husen från tomtstyckningarnas tid är i dag omkring hundra år gamla, och villorna från 1950-talet omkring 70 år. Husens ålder säger inte hur gammalt taket är. Ett tak kan ha lagts om en eller flera gånger, och hur underlaget ser ut i dag går inte att se från vägen. Tre saker är värda att tänka på. Ett sommarhus som har blivit åretruntbostad har i regel byggts om och till, och då finns det ofta takdelar av olika ålder på samma hus. Skarven mellan dem är värd en extra titt. Ett fritidshus kan också vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs. Och eftersom bilfärjan går hit kan material och ställning köras över till ön. Hur det ser ut vid just ditt hus går vi igenom innan arbetet börjar. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris."}],
    process: {"steps":["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"],"paragraphs":["Vi lämnar 10 års utförandegaranti på det arbete vi utför. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.","Bor du på Tynningö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."]},
  },
  {
    slug: "duvbo",
    name: "Duvbo",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Duvbo, Hästhagen och Tulemarken i Sundbyberg, där tomterna började säljas 1899. Kostnadsfri takkontroll.",
    longDescription:
      "Duvbo är en stadsdel i Sundbyberg som enligt Wikipedia domineras av cirka 300 äldre villor, med en mindre andel flerbostadshus. I öster ligger Centrala Sundbyberg och i väster Rissne, och i norr skiljer ett grönområde Duvbo från flerbostadshusen i Hallonbergen. Samhället grundades som en förstad till Stockholm längs Västeråsbanan. Bolaget AB Hem på landet, med Carl Alm som verkställande direktör, köpte Dufvebols gård, lät kartlägga marken och styckade den i tomter på cirka 1 000–1 200 kvadratmeter. Sommaren 1899 började tomterna säljas, och den 3 juli 1903 blev Duvbo ett eget municipalsamhälle i dåvarande Spånga landskommun. Här fanns en egen hållplats på järnvägen, skola, kyrka och flera speceriaffärer. År 1923 köpte municipalfullmäktige mark från Rissne ägor, och öster om det gamla Duvbo växte Nya Duvbo fram på 98 tomter. Vid nyåret 1949 fördes Duvbo över till Sundbybergs stad. Enligt Wikipedia byggdes Duvbo före privatbilismens genombrott. Många gator är smala och slingrande, och både gatunätet och villornas placering på tomterna följer terrängen. Nästan alla villor har fått omfattande tillbyggnader, några ursprungliga hus har rivits och ersatts av nya, och en del tomter har styckats. Riksantikvarieämbetet utsåg 1987 Duvbo till ett bostadsområde av riksintresse. Till Duvbo räknas ofta de cirka 50 villorna i Hästhagen, åtta kvarter med namn efter träd som stadsplanelades 1925. Norr om Tulegatan ligger Tulemarken, som enligt Wikipedia i första hand bebyggdes med funkisvillor under 1930-talet.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Sundbyberg" },
      { label: "Delområden", value: "Duvbo (gamla och nya), Hästhagen, Tulemarken" },
      { label: "Hustyper", value: "Äldre villor, en mindre andel flerbostadshus, funkisvillor i Tulemarken" },
      { label: "Byggperiod", value: "Tomtförsäljning från 1899, Nya Duvbo från 1923, Hästhagen planlagt 1925, Tulemarken 1930-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 560" },
    ],
    sourceLink: { label: "Wikipedia: Duvbo", url: "https://sv.wikipedia.org/wiki/Duvbo" },
    parentLocation: { name: "Sundbyberg", slug: "sundbyberg" },
    h1Override: "Takläggare i Duvbo, Sundbyberg",
    uniqueFAQ: {
      question: "När byggdes husen i Duvbo?",
      answer:
        "Byggperiod enligt källorna: tomtförsäljning från 1899, Nya Duvbo från 1923, Hästhagen stadsplanelagt 1925 och Tulemarken under 1930-talet. Hustyper: äldre villor, en mindre andel flerbostadshus och funkisvillor i Tulemarken. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Duvbo",
    lat: 59.3676,
    lng: 17.9643,
    nearbyLocations: ["Sundbyberg"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Tomterna i det gamla Duvbo började säljas 1899, och de tidigaste husen kan därför vara drygt 120 år gamla. Husen i Nya Duvbo och Hästhagen hör hemma i 1920-talet och är i dag runt 100 år, medan funkisvillorna i Tulemarken är runt 90 år. Efter så lång tid kan taken redan ha lagts om, och årtalet på huset räcker inte för att bedöma hur taket mår. På ett hus som har byggts till möts takytor från olika tider. Skarvarna, ränndalarna och plåten där tillbyggnaden ansluter till det ursprungliga huset är ställen som är värda en noggrann titt, liksom skorstenar och hängrännor. På smala gator behöver ställning, container och materialleveranser planeras i förväg. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Duvbo, Hästhagen eller Tulemarken och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "smedslatten",
    name: "Smedslätten",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Smedslätten i Bromma, där de första villorna byggdes 1922 och radhusen vid gården kom 1962–1964. Kostnadsfri takkontroll.",
    longDescription:
      "Smedslätten i Bromma har sitt namn efter Smedslättens gård nära Mälaren. Stadsdelen hör till Bromma trädgårdsstad och ligger sydväst om Äppelviken och öster om Ålsten, med Nyängsvägen som gräns i norr och Alviksvägen som huvudväg genom området. En stor del av stadsdelen är enligt Wikipedia tät blandskog, och Nockebybanan stannar vid Klövervägen och Smedslätten. År 1922 köpte Stockholms stad en stor del av gårdens mark av Magna Sunnerdahl, och samma år byggdes de första villorna. Stadsplanen från 1922 ville enligt Wikipedia efterlikna en småstadsgata: husen ställdes längs gatulinjen, så att trädgårdarna på baksidan tillsammans bildade en grön mitt i varje kvarter. Ett trettiotal av de tidiga villorna uppfördes av monteringsfärdiga byggelement. Stadsbyggnadskontorets arkitekt Thure Bergentz ritade 20 typhus för Smedslätten 1922–1924, och enligt Wikipedia står några av dem kvar i ursprunglig utformning. Flertalet av de övriga husen ritades av Edvin Engström och Gustaf Pettersson vid stadens egnahemsbyrå. Spårvägen förlängdes hit den 1 oktober 1923, och terrängen beskrivs som kraftigt kuperad, med slingrande gator och oregelbundna kvarter. Marken närmast gården bebyggdes senare. Från 1938 kom hyreshus och radhus längs Havsfruvägen, innan kriget avbröt byggandet. Åren 1962–1964 uppfördes 83 radhus kring gården, vid Skogsfrugränd och Flädermorsbacken, efter ritningar av Jon Höjer och Sture Ljungqvist. Vid Bergviksvägen blev 33 fastigheter av kedje- och radhustyp färdiga 1962.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Stockholm (Bromma)" },
      { label: "Hustyper", value: "Villor (bland dem typhus), radhus, kedjehus, hyreshus vid Smedslättstorget och Alviksvägen" },
      { label: "Byggperiod", value: "Villor från 1922 och under 1920-talet, hyreshus och radhus 1938–1940, radhus och kedjehus 1962–1964" },
      { label: "Ägda småhus (avrundat)", value: "Ca 500" },
    ],
    sourceLink: { label: "Wikipedia: Smedslätten", url: "https://sv.wikipedia.org/wiki/Smedsl%C3%A4tten" },
    parentLocation: { name: "Stockholm", slug: "stockholm" },
    h1Override: "Takläggare i Smedslätten, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Smedslätten?",
      answer:
        "Byggperiod enligt källorna: villor från 1922 och under 1920-talet, hyreshus och radhus från 1938, och radhus/kedjehus 1962–1964. Hustyper: villor (bland dem typhus), radhus, kedjehus och enstaka hyreshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Smedslätten",
    lat: 59.3208,
    lng: 17.9646,
    nearbyLocations: ["Stockholm", "Ålsten"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna från 1920-talets första år är i dag runt 100 år gamla, radhusen från 1938 närmar sig 90 och husen från 1960-talets första hälft är drygt 60 år. På hundraåriga hus kan taken redan ha lagts om, och då är det den senaste omläggningen som avgör skicket, inte byggåret. På hus från 1960-talet är det underlagspapp, läkt, plåtdetaljer och hängrännor som brukar behöva ses över, om det inte redan är gjort. Typhus som byggts efter samma ritning ser likadana ut från början, och ett nytt tak märks därför bland grannhusen. Där skog står tätt intill bebyggelsen fylls hängrännor och ränndalar lätt med barr och löv. På radhus och kedjehus hänger taken ihop med grannens, och anslutningen mellan husen behöver utföras så att den fungerar åt båda håll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Smedslätten och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "pershagen",
    name: "Pershagen",
    region: "Mälardalen",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Pershagen söder om Södertälje, ett villasamhälle som började styckas 1905 och växte på 1920- och 1930-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Pershagen är en tätort i Södertälje kommun, omedelbart söder om centralorten och vid Hallsfjärdens västra strand. Genom orten går Nyköpingsvägen, gamla Riksettan, som tidigare var huvudvägen mellan Stockholm och Malmö. Enligt Wikipedia domineras orten av villabebyggelse, med några få flerfamiljshus i kvarteret Agnet. Ortens tillkomst hänger ihop med Bränninge gård, ett gods med rötter i 1300-talet där ett bruk anlades vid mitten av 1600-talet. Den norra delen av gårdens ägor kallades Pers hagen efter en Per som bodde där i slutet av 1800-talet. Marken såldes till godsägaren Justus Hellsten, som 1905 började exploatera den. Tomterna gick trögt att sälja, och omkring 1910 bodde bara 40 personer här. Senare ägare, bland dem direktören Karl Wilhelm Hagelin och ingenjören Henrik Hallström, fortsatte att stycka och sälja tomter på 1920- och 1930-talen. Södertälje kommuns kulturmiljöinventering beskriver hur området avstyckades som egnahemstomter och bebyggdes 1905–1912, och hur en andra expansion följde på 1920- och 1930-talen. Det var framför allt arbetare vid Vabis, järnvägen och Södertelge Verkstäder som bodde här. Bränningestrand, söder om Pershagen, blev främst ett område med sommarstugor, och först på 1920- och 1930-talen byggdes de två områdena samman. Enligt kommunen har den ursprungliga sekelskifteskaraktären förändrats kraftigt sedan 1950-talet, när de stora tomterna styckades av och bebyggelsen förtätades. Pershagens kapell, ritat av Martin Westerberg, kom till efter att Hallström hade donerat en tomt 1931, och det invigdes 1936.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Södertälje" },
      { label: "Hustyper", value: "Villor (egnahem), några få flerfamiljshus" },
      { label: "Byggperiod", value: "1905–1912, andra expansion 1920–1930-tal, förtätning sedan 1950-talet" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 680" },
    ],
    sourceLink: { label: "Wikipedia: Pershagen", url: "https://sv.wikipedia.org/wiki/Pershagen" },
    parentLocation: { name: "Södertälje", slug: "sodertalje" },
    h1Override: "Takläggare i Pershagen, Södertälje",
    uniqueFAQ: {
      question: "När byggdes husen i Pershagen?",
      answer:
        "Byggperiod enligt källorna: egnahem 1905–1912, en andra expansion på 1920- och 1930-talen, och förtätning sedan 1950-talet. Hustyper: villor (egnahem), med några få flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Pershagen",
    lat: 59.1528,
    lng: 17.6563,
    nearbyLocations: ["Södertälje"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Egnahemmen från 1905–1912 är i dag runt 115–120 år gamla, och husen från den andra expansionen runt 90–105 år. Mellan dem står yngre hus på tomter som har styckats av sedan 1950-talet, och därför kan två grannhus i Pershagen skilja sig åt med flera decennier. På de tidigaste husen kan taken redan ha lagts om, kanske mer än en gång. Husets byggår berättar alltså inte hur taket mår i dag. Det gör underlaget, plåten kring skorsten och genomföringar och hängrännornas skick. Har en sommarstuga byggts om för att bo i året om, eller har ett egnahem byggts till, finns det skarvar mellan tak från olika tider. Där är det klokt att titta extra noga, eftersom anslutningar är känsliga ställen på alla tak. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Pershagen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "glado-kvarn",
    name: "Gladö kvarn och Lissma",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Gladö kvarn och Lissma i Huddinge, där fritidshus från 1950-talet och framåt blir åretruntbostäder. Kostnadsfri takkontroll.",
    longDescription:
      "Gladö kvarn är en tätort i Huddinge kommun, på norra sidan av Kvarnsjön. Enligt Wikipedia består den huvudsakligen av villa- och fritidshusbebyggelse. Lissma är en by och gård i kommunens sydöstra del, och norr om byn och Lissmasjön ligger Kvarntorp, som Wikipedia beskriver som ett småhusområde för permanent- och fritidsboende. Huddinge kommun kallar kommundelsområdet Gladö-Lissma och skriver att det innefattar en stor del skog och naturmark. Namnet är gammalt. En vattenkvarn som hette Gladö Kvarn nämns redan 1331 i en förteckning över Strängnäs domkyrkas tillgångar. På 1500-talet anlades en vattendriven såg här, och 1527 gav Gustav Vasa gården till fogden Erik Larsson mot hundra tolfter sågade bräder om året. Mjölkvarnen, som kom senare, revs på 1940-talet, och fundamentet sitter kvar i bäckfåran. Av torpen som hörde till Gladö finns Kvarnvreten, Hästvreten, Nytorp och Mellanberg bevarade. Bynamnet Lissma är känt sedan 1462, och 1916 styckades egendomen där till småbruk. På 1950-talet styckades marken norr om Kvarnsjön och på Hästvretens halvö till tomter för fritidshus. Sedan dess har enligt Wikipedia allt fler fritidshus blivit permanentbostäder. År 2015 fanns 442 fastigheter i Gladö kvarn: 269 var permanent bebodda, 158 var fritidshus och 15 stod obebodda. En detaljplan vann laga kraft i oktober 2013, och kommunen bygger ut vatten och avlopp och bygger om vägnätet i etapper. Huddinge kommun skriver i dag att omvandlingen fortsätter och att den hittills har gett omkring 100 nya bostäder.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Huddinge" },
      { label: "Delområden", value: "Gladö kvarn, Lissma, Kvarntorp" },
      { label: "Hustyper", value: "Villor och fritidshus, småhus för permanent- och fritidsboende" },
      { label: "Byggperiod", value: "Tomter för fritidshus styckade på 1950-talet, omvandling till permanentboende pågår (detaljplan 2013)" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 670" },
    ],
    sourceLink: { label: "Wikipedia: Gladö kvarn (ort)", url: "https://sv.wikipedia.org/wiki/Glad%C3%B6_kvarn_(ort)" },
    parentLocation: { name: "Huddinge", slug: "huddinge" },
    h1Override: "Takläggare i Gladö kvarn, Huddinge",
    uniqueFAQ: {
      question: "När byggdes husen i Gladö kvarn och Lissma?",
      answer:
        "Byggperiod enligt källorna: tomter för fritidshus styckades på 1950-talet, och omvandlingen till permanentboende har pågått sedan dess med en detaljplan från 2013. Hustyper: villor och fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Gladö kvarn",
    lat: 59.1942,
    lng: 17.9855,
    nearbyLocations: ["Huddinge"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Fritidshus som byggdes när tomterna styckades på 1950-talet är i dag runt 70 år gamla, medan husen som har kommit till under omvandlingen är betydligt yngre. Taken kan redan ha lagts om, och husets ålder säger därför inget säkert om takets skick. Ett hus som värms hela vintern ställer också delvis andra krav på hur taket är uppbyggt än ett hus som bara används på sommaren. När ett fritidshus byggs till eller byggs om för att bo i året om möts tak från olika tider, och skarvarna mellan dem är värda en extra titt. Där skog står nära tomten hamnar barr och löv i hängrännor och ränndalar, som behöver hållas rena. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Gladö kvarn eller Lissma och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "loharad",
    name: "Lohärad och Estuna",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Lohärad och Estuna nordväst om Norrtälje, i bygden kring sjön Erken och Svanberga. Kostnadsfri takkontroll.",
    longDescription:
      "Lohärad och Estuna är två socknar nordväst om Norrtälje, på var sin sida om sjön Erken. Båda har medeltida ursprung och hör sedan 1971 till Norrtälje kommun. Lohärads socken beskrivs i Wikipedia som en småkuperad skogsbygd med mindre slättområden i sydost och nordväst. Här finns 19 mindre byar, bland dem Gribby, Hållsta, Nyckelby och Söderby, och fem sjöar: Alsnaren, Falken, Fyrsjön, Trehörningen och Viksjön. Namnet skrevs Lohärrädhe år 1337. Förleden lo betyder öppen plats eller glänta, och namnet syftar på det öppna området vid kyrkan. Lohärads kyrka ligger omkring tolv kilometer från Norrtälje. Den första kyrkan byggdes under första delen av 1200-talet, och på 1670-talet rasade tornet och krossade vapenhuset. Estuna socken är enligt Wikipedia en kuperad slättbygd med kalkrik moränlera och inslag av skog. Söder om Erken breder ett starkt uppodlat slättlandskap ut sig. När socknen kartlades på 1600-talet bestod den av 28 byar. Vid Erken ligger Stjärnholm, där huvudbyggnaden uppfördes i början av 1700-talet, och Norra Malma, en herrgård som 1928 donerades till Uppsala universitet. Huvudbyggnaden på Vämlinge brann ner 2015 och byggdes upp igen i ursprunglig stil. Åren 1950–1951 byggdes forskningsstationen Erkenlaboratoriet ett stycke väster om gården. Tätorten Svanberga ligger vid Erken, tio kilometer norr om Norrtälje, där riksväg 76 passerar. Här fanns en gästgivargård från 1600-talet, och här ligger Svanberga skola. Enligt hitta.se är husen i Lohärad mest byggda på 1980- och 2000-talen och husen vid Svanbergavägen på 1970- och 1980-talen.",
    extraContent: "",
    factBox: [
      { label: "Kommun", value: "Norrtälje" },
      { label: "Delområden", value: "Lohärad, Estuna, Vämlinge, Stjärnholm, Svanberga" },
      { label: "Hustyper", value: "Villor och lantbruk" },
      { label: "Byggperiod", value: "Lohärad mest 1980- och 2000-tal, Svanbergavägen 1970–80-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 000" },
    ],
    sourceLink: { label: "Wikipedia: Lohärads socken", url: "https://sv.wikipedia.org/wiki/Loh%C3%A4rads_socken" },
    parentLocation: { name: "Norrtälje", slug: "norrtalje" },
    h1Override: "Takläggare i Lohärad och Estuna, Norrtälje",
    uniqueFAQ: {
      question: "När byggdes husen i Lohärad och Estuna?",
      answer:
        "Byggperiod enligt källorna: Lohärad mest från 1980- och 2000-talet, och husen vid Svanbergavägen från 1970- och 1980-talet. Hustyper: villor och lantbruk. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
    },
    primaryKeyword: "takläggare Lohärad",
    lat: 59.808,
    lng: 18.5597,
    nearbyLocations: ["Norrtälje"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen från 1970- och 1980-talen är i dag runt 40–55 år gamla, medan husen från 2000-talet är runt 20 år. På ett hus från 1970-talet kan taket redan ha lagts om. Har det inte skett är det underlagspapp, läkt, genomföringar och plåtanslutningar som behöver ses över först, eftersom det är där ett tak brukar släppa in vatten. På ett hus från 2000-talet handlar det oftare om tillsyn: rensa hängrännor, se över plåt och tätningar kring skorsten och ventilation. På ett lantbruk står bostadshus, ladugård och uthus ofta med tak från olika år, och varje tak får sin egen bedömning. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du i Lohärad, Estuna eller Svanberga och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "hoglandet",
    name: "Höglandet",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Höglandet i Bromma, med villor från 1920- och 1930-talen och äldre hus i Grönvik vid Mälaren. Kostnadsfri takkontroll.",
    longDescription:
      "Höglandet är en stadsdel i Bromma i Stockholms västerort, och namnet står för området mellan Ålsten och Nockeby. Stadsdelen ligger utmed Mälarstranden, i regel 30 till 44 meter över havet, och landytan är 44 hektar. Enligt Wikipedia planerades området för villor och domineras av villor. Bebyggelsen har två ursprung. Närmast vattnet ligger Grönvik, där tomter började säljas 1902 och där försäljningen var avslutad 1924. Den marken ingick inte i stadens markköp, och Grönviksvägen, som följer stranden i drygt två kilometer fram till Nockebybron, har därför en särställning bland Brommas trädgårdsstäder. Wikipedia beskriver vägen som en blandning av gammalt och nytt: stugor från 1800-talet, några byggnader från slutet av 1700-talet och annars mest villor i funkisstil från 1930-talet. Många av villorna längs vägen ritades av Edvin Engström, och Sven Markelius byggde 1930 sitt eget hus här, i betong. Sedan 1934 räknas Grönvik till Höglandet. På stadens mark ovanför antogs stadsplanen 1925, och husen där uppfördes enligt Wikipedia under åren 1925–1930. Fram till 1934 hette området Västra Ålsten. Ålsten hade blivit betydligt större än de andra stadsdelarna i trädgårdsstaden och delades därför längs Djupdalsvägen. Namnet lånades från Höglandstorget, som hade fått sitt namn 1925 efter den höglänta terrängen. Den backiga marken fick enligt Wikipedia många att bygga så kallade dalahus, och villorna fick ofta två fulla våningar. Gatunamnen kom till mellan 1924 och 1930 och hämtades från författarkonsten, som Rimmargatan och Journalistgränd, från orter i Dalarna, som Sollerövägen och Våmhusvägen, och från fåglar, som Domherrevägen.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Bromma)"},{"label":"Delområden","value":"Höglandet på stadens mark, Grönvik vid Mälaren"},{"label":"Hustyper","value":"Villor (ofta två fulla våningar), stugor från 1800-talet i Grönvik"},{"label":"Byggperiod","value":"Stadens mark 1925–1930, funkisvillor vid Grönviksvägen 1930-tal, äldre hus i Grönvik"},{"label":"Ägda småhus (avrundat)","value":"Ca 370"}],
    sourceLink: {"label":"Wikipedia: Höglandet","url":"https://sv.wikipedia.org/wiki/H%C3%B6glandet"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Höglandet, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Höglandet?","answer":"Byggperiod enligt källorna: stadens mark 1925–1930, funkisvillor vid Grönviksvägen 1930-tal, äldre hus i Grönvik. Hustyper: villor, ofta med två fulla våningar, och äldre stugor i Grönvik. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Höglandet",
    lat: 59.3235,
    lng: 17.9369,
    nearbyLocations: ["Ålsten","Nockeby","Smedslätten"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen på stadens mark i Höglandet är i dag mellan 96 och drygt 100 år gamla, och funkisvillorna längs Grönviksvägen runt 90 år. Stugorna i Grönvik är ännu äldre. Så gamla hus har i regel fått taket omlagt, ibland flera gånger, och byggåret berättar därför inget om hur taket mår. Svaret finns i underlaget, i plåtarbetet runt skorstenar och takkupor och i hur vattnet leds bort. På en brant tomt behöver ställning och materialtransport planeras för just det huset, och ett tvåvåningshus kräver högre ställning än ett envåningshus. Där hus från olika sekler står längs samma väg skiljer sig förutsättningarna mycket från tomt till tomt. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Höglandet och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "skarsatra",
    name: "Skärsätra",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Skärsätra på södra Lidingö, en villastad som började byggas 1909 med mindre trävillor. Kostnadsfri takkontroll.",
    longDescription:
      "Skärsätra är en stadsdel på södra Lidingö. Mitt i stadsdelen står flerbostadshusen längs Pyrolavägen, uppförda 1962–1966, och öster och väster om dem breder en äldre villabebyggelse ut sig som enligt Wikipedia började uppföras 1909. Lidingöbanan har tre hållplatser här: AGA, Skärsätra och Kottla. Namnet kommer från Skärsätra gård, omnämnd redan 1366. Av gårdsbebyggelsen från slutet av 1700-talet finns mangårdsbyggnaden och en flygel kvar, i ombyggt skick, och gårdens allé ner mot Lilla Värtan motsvaras i dag av Näckrosstigen. År 1907 köpte ett konsortium egendomen på 300 tunnland för att bygga Skärsätra Villastad. Då fanns redan ett 70-tal villor i området. Till skillnad från andra villasamhällen på ön ritades Skärsätra som ett kombinerat villa- och industrisamhälle, men villorna kom att dominera. År 1910 hade omkring 300 tomter sålts. Köparna var enligt Wikipedia huvudsakligen händiga hantverkare som blev sina egna byggherrar och byggmästare, och resultatet blev ett stort antal mindre trävillor, några av sommarstugekaraktär. Villabolaget sålde byggnadsritningar från sina egna arkitekter till låg taxa. Typritningarna sträckte sig från en stuga med ett rum och kök och utbyggbar vind till en villa med åtta rum och kök. Gustaf Dalén köpte två tomter 1907 och lät 1912–1913 bygga Villa Ekbacken efter ritningar av Erik Hahr. Enligt hitta.se är husen vid Törnrosvägen mest från 1940- och 1990-talen. Dalénum, ett tidigare industriområde, har byggts om till bostäder sedan 2010, och de första flyttade in 2012.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Lidingö"},{"label":"Delområden (RegSO)","value":"Dalénum, Skärsätra södra"},{"label":"Hustyper","value":"Mindre trävillor (villastaden), flerbostadshus längs Pyrolavägen, nya bostäder i Dalénum"},{"label":"Byggperiod","value":"Villor från 1909 (ett 70-tal fanns redan 1907), flerbostadshus 1962–1966, Törnrosvägen 1940- och 1990-tal, Dalénum från 2010"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 320 (SCB, 2025)"}],
    sourceLink: {"label":"Wikipedia: Skärsätra","url":"https://sv.wikipedia.org/wiki/Sk%C3%A4rs%C3%A4tra"},
    parentLocation: {"name":"Lidingö","slug":"lidingo"},
    h1Override: "Takläggare i Skärsätra, Lidingö",
    uniqueFAQ: {"question":"När byggdes husen i Skärsätra?","answer":"Byggperiod enligt källorna: villor från 1909 (ett 70-tal fanns redan 1907), flerbostadshus 1962–1966, Törnrosvägen 1940- och 1990-tal, Dalénum från 2010. Hustyper: mindre trävillor, flerbostadshus och nya bostäder i Dalénum. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Skärsätra",
    lat: 59.3460,
    lng: 18.1693,
    nearbyLocations: ["Lidingö","Mölna","Brevik, Käppala och Gåshaga"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villastadens första hus har stått i upp till 115 år, och en del hus är äldre än så. Husen från 1940-talet är omkring 80 år och de från 1990-talet omkring 30. Ett hus som har hunnit bli hundra år har nästan alltid fått nytt tak någon gång på vägen. Vad som ligger där nu, och hur det mår, går bara att avgöra genom att titta på just det taket. En liten stuga som har vuxit till villa i flera steg har ofta tak från olika tider. Där en tillbyggnad möter den ursprungliga huskroppen bildas vinklar och anslutningar, och det är ställen där vatten gärna letar sig in om plåt och underlag inte hänger ihop. På hus från 1990-talet som inte har lagts om är det genomföringar och plåtdetaljer som brukar behöva ses över först. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Skärsätra och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "stora-mossen",
    name: "Stora Mossen",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Stora Mossen i Bromma, där drygt hälften av stadsdelen byggdes 1928–1929. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Stora Mossen är en stadsdel i Bromma i Stockholm och hör till Gamla Bromma trädgårdsstad. Nästan två tredjedelar av bebyggelsen består enligt Wikipedia av villor. Namnet kommer från gården Stora Mossen, som byggdes omkring 1780 vid en stor mosse. Mangårdsbyggnaden låg där Bromma gymnasium står i dag och revs 1936. Väster om skolan ligger koloniområdet, med 192 lotter, på det som en gång var gårdens åkrar och beteshagar. De östligaste kvarteren fick villor redan 1922–1923, de flesta i traditionell egnahemsstil. Den första stadsplanen antogs 1926, tomterna uppläts mellan 1925 och 1930, och drygt hälften av stadsdelen byggdes under de två åren 1928–1929. Gatorna fick namn efter djur. Efter Ekorrvägen och Mårdvägen följde Mullvadsvägen 1930, Gripvägen 1935 och Bävervägen och Utterstigen 1936. År 1939 var stadsdelen nästan färdigbyggd. Sommaren 1927 hölls en bostadsutställning här, arrangerad av Bygge och Bo. Den omfattade 29 nybyggda villor av sju arkitekter längs Ekorrvägen och angränsande delar av Mårdvägen och Stavgårdsgatan. Uno Åhrén ritade samma år tre villor på Stavgårdsgatan i tjugotalsklassicistisk stil. Wikipedia beskriver ändå stadsdelens utformning som mycket enhetlig, eftersom två tredjedelar av villorna ritades av en och samma arkitekt, Edvin Engström vid stadens fastighetskontor. Han bodde själv på Igelkottsvägen. Sven Markelius ritade 1937 Villa Myrdal på Nyängsvägen. Senare tillskott finns också. Nära tunnelbanan byggdes några bostadshus 1951–1952, och vid Mosskroken och Enhörningsgränd tillkom 2005–2006 parhus, flerfamiljshus och enfamiljshus efter ritningar av Kjell Forshed.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Bromma)"},{"label":"Hustyper","value":"Villor (nästan två tredjedelar av bebyggelsen), parhus, flerfamiljshus"},{"label":"Byggperiod","value":"1922–1939, drygt hälften 1928–1929, tillskott 1951–1952 och 2005–2006"},{"label":"Ägda småhus (avrundat)","value":"Ca 310"}],
    sourceLink: {"label":"Wikipedia: Stora mossen","url":"https://sv.wikipedia.org/wiki/Stora_mossen"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Stora Mossen, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Stora Mossen?","answer":"Byggperiod enligt källorna: 1922–1939, drygt hälften 1928–1929, tillskott 1951–1952 och 2005–2006. Hustyper: villor (nästan två tredjedelar av bebyggelsen), parhus och flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Stora Mossen",
    lat: 59.3346,
    lng: 17.9661,
    nearbyLocations: ["Ålsten","Smedslätten"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De tidigaste villorna i Stora Mossen har passerat 100 år, den stora gruppen från 1928–1929 är i dag 97–98 år och husen från 1930-talets andra hälft runt 90 år. Husen vid Mosskroken är omkring 20 år. På de äldre villorna kan taket ha bytts både en och två gånger, så det är dagens skick som räknas, inte byggåret: hur underlaget ser ut, om plåten runt skorsten och kupor är tät och om rännorna för bort vattnet. I en stadsdel som källan beskriver som mycket enhetlig påverkar valet av material och kulör hur huset passar in bland grannhusen. Stäm därför av vad som gäller innan du bestämmer dig. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. På parhus delas taket med grannen, och arbetet vid skarven behöver planeras tillsammans. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Stora Mossen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "sodra-angby",
    name: "Södra Ängby",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Södra Ängby i Bromma, med omkring 500 funkisvillor uppförda 1933–1939. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Södra Ängby är en stadsdel i Västerort i Stockholm, på omkring 1,1 kvadratkilometer mellan Blackebergsvägen i väster, Färjestadsvägen i sydost och Bergslagsvägen i nordost. Norr om stadsdelen ligger Norra Ängby, i väster Blackeberg och Grimsta naturreservat och i öster Judarskogens naturreservat. I söder når den fram till Ängbybadet och Mälaren. Enligt Wikipedia består stadsdelen av cirka 500 villor som uppfördes 1933–1939 i funktionalistisk stil. Den första detaljplanen kom 1933 och gällde 525 tomter. Ansvarig var stadsbyggnadsdirektören Albert Lilienberg, planen ritades av Thure Bergentz på stadsplanekontoret, och fastighetsdirektören Axel Dahlberg räknas som den som tog initiativet. Delen öster om Zornvägen var utbyggd 1938, den västra blev klar senare. Till skillnad från självbyggarna i Norra Ängby uppfördes villorna här av enskilda byggmästare, som sålde dem nyckelfärdiga. En av dem var Einar Mattsson, som byggde sin första villa på Ängbyhöjden 1935. Ungefär 95 procent av villorna ritades enligt Wikipedia av Edvin Engström, föreståndare för Egnahemsbyrån. Gatorna lades slingrande efter terrängen, så att man behövde spränga så lite som möjligt, och mycket av tallskogen sparades. Husen placerades i gatulinjen med planterade förgårdar, och eftersom bara trådnätsstaket tilläts beskriver Wikipedia området som en stor sammanhängande park. De flesta husen har enligt samma källa trästomme och fasad av vitmålad kalkputs, några har träpanel. Den ljusa färgsättningen gav området namnet Den vita staden. De flesta gatorna har namn efter konstnärer, som Zornvägen och Carl Larssons väg. Bebyggelsen är sedan 1987 riksintresse för kulturmiljövården, och en detaljplan som vann laga kraft 1995 skyddar enligt Wikipedia fasader och byggnadsdetaljer.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Bromma)"},{"label":"Hustyper","value":"Villor i funktionalistisk stil"},{"label":"Byggperiod","value":"1933–1939 (öster om Zornvägen utbyggt 1938, västra delen senare)"},{"label":"Ägda småhus (avrundat)","value":"Ca 500"}],
    sourceLink: {"label":"Wikipedia: Södra Ängby","url":"https://sv.wikipedia.org/wiki/S%C3%B6dra_%C3%84ngby"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Södra Ängby, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Södra Ängby?","answer":"Byggperiod enligt källorna: 1933–1939, där delen öster om Zornvägen var utbyggd 1938 och den västra delen klar senare. Hustyper: villor i funktionalistisk stil. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Södra Ängby",
    lat: 59.3412,
    lng: 17.8958,
    nearbyLocations: ["Ängby","Blackeberg"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna i Södra Ängby byggdes under sju år och är i dag mellan 87 och 93 år gamla. På hus i den åldern kan taket ha lagts om mer än en gång, och husets ålder säger därför lite om hur taket mår. Det avgörande är när den senaste omläggningen gjordes, hur den utfördes och hur avvattning, plåtdetaljer och anslutningar mot skorsten och vägg ser ut i dag. I ett område med skyddsbestämmelser lönar det sig att ta reda på vad detaljplanen säger innan något bestäms. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Där tallar står nära husen samlas barr i hängrännor och stuprör, och de behöver rensas för att vattnet ska rinna undan. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Södra Ängby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "enskededalen",
    name: "Enskededalen",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Enskededalen, en trädgårdsstad i Söderort med småhus, dubbelhus och villor från 1920- och 1930-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Enskededalen är en stadsdel i Söderort i Stockholm och hör till Skarpnäcks stadsdelsområde. Den består enligt Wikipedia huvudsakligen av småhus som byggdes som en trädgårdsstad på 1920-talet. Tunnelbanestationerna Sandsborg, Skogskyrkogården och Kärrtorp ligger alla inom några hundra meter från stadsdelens gränser. Utbyggnaden började 1920. Wikipedia beskriver hur man här lämnade de engelska och tyska förebilderna från Enskede trädgårdsstad och i stället utgick från den svenska trästaden, med husen lagda i gatulinjen. Stadsplanen ritades av Axel Dahlberg och Gustaf Pettersson och föreskrev en blandning av små sammanbyggda flerfamiljshus, friliggande enfamiljshus och dubbelhus. Många av småhusen kom till som egnahemsbyggen, där staden stod för typritningar och ägaren byggde själv. De uppfördes enligt Wikipedia normalt i en och en halv våning med entrén mot gårdssidan. Idén kom från en grupp arbetare och hantverkare som 1919 föreslog att eget arbete skulle få ersätta kontantinsatsen. År 1920 bildade de föreningen Hem genom eget arbete, och fram till 1922 uppförde de 29 byggnader. Mot Kärrtorp och Gamla Tyresövägen ligger Kärringstan, ett inofficiellt namn på ett område med fristående villor som enligt Wikipedia huvudsakligen byggdes på 1920- och 1930-talen. Gatorna där har namn efter kända kvinnor, som Cajsa Wargs väg och Karin Månsdotters väg. Stadsplanen upprättades 1924, och bestämmelserna angav bland annat att husen fick byggas i trä, i en våning med vind, och att sammanbyggda hus skulle ges ett enhetligt utseende. I kvarteret Barnmorskan, längst i norr i Kärringstan, tillkom 22 radhus mellan 2008 och 2010.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Skarpnäck)"},{"label":"Hustyper","value":"Småhus (egnahem), dubbelhus, små sammanbyggda flerfamiljshus, fristående villor i Kärringstan, 22 radhus i kvarteret Barnmorskan"},{"label":"Byggperiod","value":"Från 1920 (självbyggeri 1920–1922), Kärringstan huvudsakligen 1920- och 1930-tal, radhusen 2008–2010"},{"label":"Ägda småhus (avrundat)","value":"Ca 510"}],
    sourceLink: {"label":"Wikipedia: Enskededalen","url":"https://sv.wikipedia.org/wiki/Enskededalen"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Enskededalen, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Enskededalen?","answer":"Byggperiod enligt källorna: från 1920 (självbyggeri 1920–1922), Kärringstan huvudsakligen 1920- och 1930-tal, radhusen i kvarteret Barnmorskan 2008–2010. Hustyper: småhus (egnahem), dubbelhus, små sammanbyggda flerfamiljshus, fristående villor i Kärringstan och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Enskededalen",
    lat: 59.2818,
    lng: 18.1055,
    nearbyLocations: ["Enskede","Skarpnäck"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småhusen från 1920-talets början är i dag drygt 100 år gamla, och villorna i Kärringstan mellan knappt 90 och drygt 100 år. Radhusen i kvarteret Barnmorskan är runt 16–18 år. På de äldre husen kan taket ha lagts om flera gånger, så husets ålder avslöjar inte hur taket mår. Det som räknas är vad som finns under ytan i dag och hur plåtdetaljer, skorstensanslutningar och hängrännor har klarat sig sedan senaste omläggningen. I ett dubbelhus delar två hushåll på samma tak, och det som görs på den ena halvan behöver anslutas till den andra. Då är det ofta enklast att grannarna planerar tillsammans. På hus med inredd vind går takfönster, kupor och skorstenar genom taket, och varje sådan genomföring behöver kontrolleras. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Enskededalen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "tallkrogen",
    name: "Tallkrogen",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Tallkrogen i Söderort, där omkring 950 småstugor byggdes av ägarna själva 1933–1945. Kostnadsfri takkontroll.",
    longDescription:
      "Tallkrogen är en stadsdel i Söderort i Stockholm som gränsar till Gamla Enskede, Gubbängen och Svedmyra. Enligt Wikipedia räknas den till Stockholms trädgårdsstäder. Namnet kommer från en krog vid den gamla landsvägen mot Dalarö, som nämns redan 1668. Marken hörde en gång till Östberga gård, och här låg torpen Mossens gård och Lövlund. Stockholms stad köpte Mossens mark 1905, men det dröjde till 1930-talet innan något byggdes. Stadsdelen bildades 1933, och samma år ritade stadsplaneraren Albert Lilienberg den första stadsplanen. Gatorna lades enligt Wikipedia ut som löparbanor runt en idrottsarena. Den delen kallas Olympiaområdet och har gatunamn som Maratonvägen, Kulstötarvägen och Diskusvägen. Bebyggelsen består enligt Wikipedia till övervägande del av småhus. Omkring 950 stugor restes med självbyggeri fram till 1945. Olympiaområdet byggdes 1933–1934, och de flesta stugorna där hade bara två rum. Det finns ungefär tio hustyper, alla ritade av arkitekten Edvin Engström, och den första stugan byggdes på Kulstötarvägen 14. Husen uppfördes i regi av Stockholms stads småstugebyrå, och tomterna uppläts med tomträtt. Enligt Stockholmskällan bildades småstugebyrån 1927 som en avdelning inom stadens fastighetskontor, och ägarna deltog själva i bygget för att hålla kostnaderna nere. Området kring Tallkrogsvägen byggdes 1935, centrumet vid Tallkrogsplan invigdes 1943 och tunnelbanestationen öppnade 1950. Wikipedia anger också att ungefär hälften av bostäderna, räknat till antalet, är hyreslägenheter, bland annat i husen kring Torögatan från 1949–1952.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Farsta stadsdelsområde)"},{"label":"Hustyper","value":"Småstugor (självbyggeri, ungefär tio hustyper), hyreshus"},{"label":"Byggperiod","value":"Småstugorna 1933–1945 (Olympiaområdet 1933–1934, kring Tallkrogsvägen 1935), hyreshusen kring Torögatan 1949–1952"},{"label":"Ägda småhus (avrundat)","value":"Ca 940"}],
    sourceLink: {"label":"Wikipedia: Tallkrogen","url":"https://sv.wikipedia.org/wiki/Tallkrogen"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Tallkrogen, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Tallkrogen?","answer":"Byggperiod enligt källorna: småstugorna 1933–1945 (Olympiaområdet 1933–1934, kring Tallkrogsvägen 1935), hyreshusen kring Torögatan 1949–1952. Hustyper: småstugor från självbyggeri i ungefär tio hustyper, samt hyreshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Tallkrogen",
    lat: 59.2715,
    lng: 18.0861,
    nearbyLocations: ["Enskede","Skarpnäck"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småstugorna i Tallkrogen byggdes mellan 1933 och 1945 och är i dag mellan drygt 80 och drygt 90 år gamla. Taken kan redan ha lagts om, och husets ålder säger därför lite om hur taket mår. Det går bara att avgöra på plats, genom att se på underlag, läkt, plåtdetaljer, skorstensanslutning och hängrännor. En stuga som från början hade två rum kan ha fått en tillbyggnad eller en inredd övervåning längre fram. Då möts tak från olika tider, och skarven mellan gammalt och nytt är ett ställe som är värt att se över. Takkupor och takfönster som har satts in i efterhand är andra sådana ställen. När ett tiotal hustyper återkommer gata efter gata syns ett nytt tak bredvid grannarnas. Ta därför reda på vad som gäller innan du bestämmer dig. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Tallkrogen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "viksberg",
    name: "Viksberg och Viksäter",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Viksberg, Viksäter och Ragnhildsborg norr om Södertälje, där fritidshus har blivit åretruntboende. Kostnadsfri takkontroll.",
    longDescription:
      "Norr om Södertälje, mellan Mälaren och gränsen mot Salem, ligger Viksberg och Viksäter. Sedan 2015 räknas de enligt Wikipedia som en gemensam tätort, och fram till 1974 hörde trakten till Salems socken. Södertälje kommun beskriver landskapet i en förstudie från 2016: höjdryggar med skog, och däremellan dalgångar med åkrar, hagar och golfbanor. Viksbergs gård är ett tidigare säteri som fick sina säterirättigheter 1681. Söder om gården låg ett tegelbruk som finns i räkenskaper från 1765 och som lades ner efter en brand i början av 1940-talet. Kapellet intill uppfördes 1901. Kommunen skriver att trakten norr och öster om gården präglas av småbruk och egnahem som bildades 1914, och att det i sydost finns spridda små hus av tidig egnahemskaraktär. Sedan kom fritidshusen. Halvön Holmen har enligt kommunen ett stort antal små fritidshus som har placerats efter terrängen, från 1930-talets sportstugor och framåt. Viksäter bebyggdes under 1960-talet som fritidshusområde. Under 1990-talet flyttade allt fler dit för gott, och 2007 kom en ny detaljplan med större byggrätter. Kommunen vill ändå att Viksäter ska behålla sin karaktär av \"hus i skog\". När förstudien skrevs fanns ungefär 800 bebyggda fastigheter i Viksberg, Viksäter, Talbystrand och Holmen. De nyaste husen ligger längs Viksbergsvägen. Ekgårdens småhusområde, nordväst om Ritorp, fick sin första detaljplan 2004, och fler områden för småhus och radhus planlades 2013–2015. Vid Ragnhildsborg, intill Linasundet närmast staden, finns enligt kommunen både gammal och ny villabebyggelse i kuperad terräng.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Södertälje"},{"label":"Delområden","value":"Viksberg, Viksäter, Holmen, Talbystrand, Ekgården, Ragnhildsborg"},{"label":"Hustyper","value":"Egnahem, fritidshus som blivit åretruntbostäder, villor, småhus och radhus i de senaste planerna"},{"label":"Byggperiod","value":"Egnahemsbildningar 1914, sportstugor på Holmen från 1930-talet, Viksäter 1960-talet, småhusplaner 2004 och 2013–2015"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 1 070 (SCB, 2025)"}],
    sourceLink: {"label":"Södertälje kommun: Förstudie Viksberg (2016)","url":"https://www.sodertalje.se/globalassets/politiska-dokument/stadsbyggnadsnamnden/2017-sammantradeshandlingar/2017-05-30/arende-11.pdf"},
    parentLocation: {"name":"Södertälje","slug":"sodertalje"},
    h1Override: "Takläggare i Viksberg och Viksäter, Södertälje",
    uniqueFAQ: {"question":"När byggdes husen i Viksberg och Viksäter?","answer":"Byggperiod enligt källorna: egnahemsbildningar 1914, sportstugor på Holmen från 1930-talet, Viksäter 1960-talet, småhusplaner 2004 och 2013–2015. Hustyper: egnahem, fritidshus som blivit åretruntbostäder, villor, samt småhus och radhus i de senaste planerna. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Viksberg",
    lat: 59.2498,
    lng: 17.6142,
    nearbyLocations: ["Södertälje","Järna"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Här ligger hus från ett helt sekel sida vid sida. Egnahemmen kan vara drygt 100 år, sportstugorna på Holmen upp emot 90 år och fritidshusen i Viksäter runt 60 år, medan husen längs Viksbergsvägen är högst ett tjugotal år. På de äldre husen kan taken redan ha lagts om, så det är dagens skick som räknas och inte byggåret. Ett fritidshus som har byggts ut för att bo i året om har ofta fått tak i etapper. Där den nya delen möter den gamla behöver underlag och plåt höra ihop, och det stället bör ses över noga. På en tomt med träd tätt inpå huset samlas barr och löv i rännor och vinklar, som behöver hållas rena för att vattnet ska rinna undan. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Viksberg eller Viksäter och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "appelviken",
    name: "Äppelviken",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Äppelviken i Bromma, trädgårdsstaden vid Mälaren där villorna huvudsakligen byggdes 1913–1922. Kostnadsfri takkontroll.",
    longDescription:
      "Äppelviken är en stadsdel i Västerort i Stockholm och en del av Bromma trädgårdsstad. Den ligger utmed Mälaren, med utsikt mot Stora Essingen. Namnet går tillbaka på torpet Äppelviken, som bryggaren Lars Fredrik Blackstadius utvecklade till en gård och där han på 1860-talet anlade en äppelträdgård. Gårdens huvudbyggnad står kvar på Äppelviksvägen 31. Husen nere vid viken var från början sommarbostäder, byggda vid 1900-talets början. Stockholms stad köpte egendomarna Alvik och Äppelviken 1908, och den första stadsplanen fastställdes 1910, med vägar lagda där terrängen gav bäst förutsättningar. År 1913 började tomterna upplåtas med tomträtt och bebyggas, och 1914 blev pontonbron från Kungsholmen klar och spårvägen drogs till Alléparken. Enligt Wikipedia kom villorna huvudsakligen till 1913–1922. Den östra delen byggdes 1913–1919, med större villor i olika stilar, och arkitekterna Gustaf Pettersson och Edvin Engström ritade nästan hundra villor vardera. Den västra delen, väster om spårvägen, bebyggdes 1917–1923. Där ändrades planen 1920, och husen blev enligt Wikipedia mindre och ställdes nära gatan på samma linje, med fasader i träpanel, spröjsade fönster och öppen förstukvist. Vid Alléparken ligger de engelska radhusen i kvarteret Drivbänken: 43 radhus i fyra längor runt en gemensam gård, byggda 1919–1920 efter ritningar av Gunnar Wetterling och blåmärkta av Stadsmuseet i Stockholm. Wikipedia beskriver deras fasader som slammade och putsade, i gult, rosa och beige.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Bromma)"},{"label":"Hustyper","value":"Villor, 43 radhus i kvarteret Drivbänken, flerbostads- och affärshus längs Alviksvägen och Västerled"},{"label":"Byggperiod","value":"Villor huvudsakligen 1913–1922 (östra delen 1913–1919, västra 1917–1923), radhusen 1919–1920"},{"label":"Ägda småhus (avrundat)","value":"Ca 390"}],
    sourceLink: {"label":"Wikipedia: Äppelviken","url":"https://sv.wikipedia.org/wiki/%C3%84ppelviken"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Äppelviken, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Äppelviken?","answer":"Byggperiod enligt källorna: villor huvudsakligen 1913–1922 (östra delen 1913–1919, västra 1917–1923), radhusen i kvarteret Drivbänken 1919–1920. Hustyper: villor, 43 radhus samt flerbostads- och affärshus längs Alviksvägen och Västerled. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Äppelviken",
    lat: 59.3262,
    lng: 17.9711,
    nearbyLocations: ["Ålsten","Smedslätten"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna i Äppelviken är i dag mellan drygt 100 och 113 år gamla, och radhusen i Drivbänken drygt 105 år. På hus i den åldern kan taken redan ha lagts om, på en del kanske flera gånger, och husets ålder säger därför lite om vad som ligger där i dag. Det som går att bedöma är hur underlag, läkt, plåtdetaljer, skorstensanslutningar och hängrännor ser ut nu. Enligt Wikipedia har många av villorna fått tillbyggnader. Där en tillbyggnad möter det ursprungliga huset finns skarvar mellan takdelar från olika tider, och de är värda en extra titt. På radhus hänger taken ihop med grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. När Stadsmuseet har klassat ett kvarter bör den som tänker byta material eller kulör först ta reda på vad som gäller. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Äppelviken och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "ostertalje",
    name: "Östertälje",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Östertälje, stadsdelen i sluttningen mot Södertälje kanal med villor från sekelskiftet och 1960-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Östertälje är en stadsdel i Södertälje med namn efter Östertälje socken, marken öster om Tälje. Enligt Wikipedia är stadsdelen byggd på sluttningen från Fornhöjden ner mot Södertälje kanal och Östersjön, i en terräng som till stor del är brant och klippig och täckt av barrskog där marken inte har bebyggts. Fram till 1920-talet var Östertälje enligt Södertälje kommuns kulturmiljöinventering till stora delar landsbygd, dominerad av gårdar som Igelsta, Glasberga, Brunnsäng, Rosenborg och Hall. År 1859 etablerades en ångsåg på järnvägens södra sida, och kring den växte Östertälje villasamhälle fram under 1800-talets andra hälft och in på 1900-talet. Igelsta station tillkom 1887 och heter i dag Östertälje station. Kring 1908 styckades Igelsta gård i tomter, vilket blev början på Igelsta municipalsamhälle, som bildades 1924. Stadsarkitekten Cyrillus Johansson upprättade en stadsplan 1927, och gårdens utkanter bebyggdes enligt kommunen med trävillor. Sedan 1963 hör området till Södertälje. Wikipedia beskriver bebyggelsen som mest villor från sekelskiftet och 1960-talet, med ett mindre antal flerfamiljshus längs Grödingevägen och ett höghusområde nere vid båtklubben. Kommunen skriver att mark från Igelsta gård såldes för bostadsområden på 1960-talet och lyfter fram de 32 radhusen i kvarteret Apollofjärilen, uppförda 1959–60 med fasader i gult tegel och placerade efter gatan och den sluttande terrängen. Bostadsområdet Lugnet kom till när Glasbergavägen förlängdes 2005, enligt Wikipedia med radhus och 23 friliggande villor.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Södertälje"},{"label":"Delområden","value":"Östertälje, Igelsta, Lugnet (RegSO: Östertälje-Gärtuna)"},{"label":"Hustyper","value":"Mest villor, radhus (Apollofjärilen, Lugnet), ett mindre antal flerbostadshus"},{"label":"Byggperiod","value":"Villor från sekelskiftet och 1960-talet, radhus 1959–60, Lugnet från 2005"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 490 (SCB, 2025)"}],
    sourceLink: {"label":"Södertälje kommun: Inventering av kulturmiljöer, del 6 (Södertälje med omgivande land)","url":"https://www.sodertalje.se/contentassets/801b52a57aed44f592a5d6bf3ff8bb96/6-sodertalje-med-omgivande-land.pdf"},
    parentLocation: {"name":"Södertälje","slug":"sodertalje"},
    h1Override: "Takläggare i Östertälje, Södertälje",
    uniqueFAQ: {"question":"När byggdes husen i Östertälje?","answer":"Byggperiod enligt källorna: villor från sekelskiftet och 1960-talet, radhus i Apollofjärilen 1959–60, Lugnet från 2005. Hustyper: mest villor, radhus och ett mindre antal flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Östertälje",
    lat: 59.1851,
    lng: 17.6585,
    nearbyLocations: ["Södertälje","Järna"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Östertälje står hus från flera skeden nära varandra. Villorna från sekelskiftet är i dag runt 125 år gamla, radhusen i Apollofjärilen drygt 65 år, 1960-talets villor runt 60 år och husen i Lugnet runt 20 år. På de tidiga villorna kan taken redan ha lagts om, kanske mer än en gång, och inte heller på ett hus från 1960-talet går det att utgå från byggåret. Det som räknas är när taket senast lades om och hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. På radhus hänger taken ihop med grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. På en brant tomt behöver ställning och transporter planeras efter marken. Där barrskog står nära husen hamnar barr i hängrännor och ränndalar, som behöver hållas rena. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Östertälje och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "bromsten",
    name: "Bromsten",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Bromsten i Västerort, där gårdens mark styckades i villatomter från 1899. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Bromsten är en stadsdel i Västerort i Stockholm och hör till Järva stadsdelsområde. Genom stadsdelen rinner Bällstaån. Ån har troligen också gett namnet dess första led: enligt Wikipedia syftar \"Brom\" på vattnet som brummade när det forsade om våren, medan \"sten\" pekar på en samling stenblock, sannolikt fornborgen sydväst om korsningen mellan Duvbovägen och Cervins väg. Den förste kände ägaren är adelsmannen Johannes Ingevaldsson, år 1291. I 1539 års jordebok finns tre gårdar i byn, och lika många syns på kartan från 1706, den tidigaste som finns över Bromsten. Villasamhället började växa fram 1899, när Bromstens gårds ägor styckades i villatomter. Tomtbolaget AB Billiga tomter var enligt Wikipedia aktivt i försäljningen. Redan den 10 juni 1904 blev Bromsten ett municipalsamhälle inom Spånga landskommun, och vid folkräkningen 1920 bodde 2 096 personer på dess 1,32 kvadratkilometer. Bromstensskolan grundades 1905, och skolhuset från den tiden används fortfarande. Fristad från 1902, ritad av Fritz Eckert, har varit både ålderdomshem och kommunalkontor och rymmer i dag en waldorfskola. Den 1 januari 1949 upplöstes municipalsamhället, och Bromsten blev en del av Stockholms stad. Gårdens huvudbyggnad revs sommaren 1964 för att ge plats åt trafiken på Duvbovägen, och järnvägsstationen på linjen mot Västerås lades ner i februari 1968. Missionskyrkan och Baptistkapellet är också borta, och på deras tomter står enligt Wikipedia villor. Spånga Egnahemsförening beskriver dagens Bromsten som en blandad bebyggelse där villor, radhus, bostadsrätter och hyreslägenheter samsas med småföretag.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Järva)"},{"label":"Hustyper","value":"Villor, radhus, bostadsrätter och hyreslägenheter"},{"label":"Byggperiod","value":"Villatomter från 1899, byggår för husen anges inte i källorna"},{"label":"Ägda småhus (avrundat)","value":"Ca 920"}],
    sourceLink: {"label":"Wikipedia: Bromsten","url":"https://sv.wikipedia.org/wiki/Bromsten"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Bromsten, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Bromsten?","answer":"Källorna anger när villatomterna började säljas (1899), inte byggår för de enskilda husen. Hustyper: villor, radhus, bostadsrätter och hyreslägenheter. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Bromsten",
    lat: 59.3828,
    lng: 17.9156,
    nearbyLocations: ["Spånga","Bällsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De första villatomterna såldes 1899, och hus från municipalsamhällets första år är i dag runt 120 år gamla. Källorna anger inga byggår för de övriga husen, men villor har tillkommit långt senare, bland annat på de gamla kyrktomterna. Hus av mycket olika ålder kan alltså stå intill varandra, och grannens tak säger lite om ditt eget. På ett hus med många år bakom sig kan taket redan ha lagts om, och husets ålder säger därför lite om takets skick. Villor som har byggts till i omgångar får skarvar där takytor från olika tider möts, och sådana möten, liksom ränndalar och anslutningar mot skorsten, är värda en noggrann titt. På radhus hänger taken ihop med grannens. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Bromsten och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "svedmyra",
    name: "Svedmyra",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Svedmyra, där småhusen byggdes efter typritningar under 1930- och 1940-talen. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Svedmyra är en stadsdel i Söderort i Stockholm, mellan Stureby och Tallkrogen, och omfattar ungefär 92 hektar. Namnet går tillbaka på torpet Svinmyra, som är känt sedan 1300-talet och lydde under Östberga gård. När Stockholms stad förvärvade marken 1905 ändrades namnet till Svedmyra. Fram till 1930 var området obebyggt, bortsett från några gårdar och torp. Då öppnade spårvagnslinjen Örbybanan mellan Slussen och Örby, med hållplatsen Svedmyran, och runt den började enligt Wikipedia småstugor att byggas av självbyggare. Planerna utökades 1932 med parker och idrottsplats, och under 1930- och 1940-talen uppfördes ett stort antal småhus. De byggdes efter typhusritningar, de flesta signerade Edvin Engström på stadens fastighetsbyrå, och den som saknade eget kapital kunde låna upp till 90 procent av byggkostnaden. Småhusen och villorna från 1930–1950 ligger enligt Wikipedia mellan Handelsvägen, Enskedevägen–Herrhagsvägen och Torögatan, i den östra delen av stadsdelen. Gatorna där har namn efter orter på Södertörn och i skärgården utanför. Väster om Enskedevägen byggdes flerfamiljshus under 1940-talet, med gatunamn från postväsendet, och öster om vägen fortsatte utbyggnaden med lamellhus och punkthus under 1950-talets första hälft. Spårvagnen ersattes efter 21 år av tunnelbanan, vars station Svedmyra egentligen ligger strax över gränsen till Stureby. Svedmyraskogen ligger vid gränsen mot Gamla Enskede och Tallkrogen, och Majroskogen i söder utgör 40 procent av stadsdelens yta.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Farsta)"},{"label":"Hustyper","value":"Småstugor och villor (typhus) i öster, flerfamiljshus väster och öster om Enskedevägen"},{"label":"Byggperiod","value":"Småhus 1930–1950, flerfamiljshus 1940- och 1950-tal"},{"label":"Ägda småhus (avrundat)","value":"Ca 330"}],
    sourceLink: {"label":"Wikipedia: Svedmyra","url":"https://sv.wikipedia.org/wiki/Svedmyra"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Svedmyra, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Svedmyra?","answer":"Byggperiod enligt källorna: småhus 1930–1950, flerfamiljshus 1940- och 1950-tal. Hustyper: småstugor och villor (typhus) i öster, flerfamiljshus väster och öster om Enskedevägen. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Svedmyra",
    lat: 59.2775,
    lng: 18.0671,
    nearbyLocations: ["Stureby","Tallkrogen"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småhusen i Svedmyra byggdes mellan 1930 och 1950 och är i dag mellan 75 och 95 år gamla. Taken kan redan ha lagts om, och det som avgör skicket är vad som gjordes vid det tillfället, inte husets byggår. Underlagspapp, läkt och plåtdetaljer åldras olika fort beroende på material och utförande. En småstuga som byggdes efter en typritning har sällan sett likadan ut sedan dess. Har huset genom åren fått takkupor, takfönster eller en tillbyggnad ger varje sådan ändring nya anslutningar i taket. Det är vid kupornas sidor, runt takfönster och där tillbyggnaden möter det ursprungliga huset som en takkontroll behöver vara noggrann. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Svedmyra och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "eneby",
    name: "Eneby",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Eneby i Bromma, ett småstugeområde som började byggas 1939 på Eneby gårds mark. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Eneby är en stadsdel i Västerort i Stockholm och ingår i Bromma stadsdelsområde. Den ligger nära Spånga, Norra Ängby, Bromma Kyrka och Beckomberga. Stadsdelen bildades 1940 och fick sitt namn efter Eneby gård. Namnet kommer av ene, som i enbackar, och finns enligt Wikipedia i ett fastebrev från 1347, där också byns förste kände bonde, Ingemar, nämns. På 1600-talet fanns bara en gård kvar i byn, och på 1690-talet blev Eneby säteri. Vid hörnet av Bällstavägen och Spångavägen låg en mangårdsbyggnad med två flyglar från slutet av 1700-talet. Gårdens ägare började 1904 stycka av villatomter öster om Bällstavägen, ett sextiotal, i ett område som han kallade Bromma villastad. Försäljningen pågick i tio år men blev enligt Wikipedia inte särskilt omfattande. Mellan 1907 och 1938 ägdes gården av Sundbyberg, som drev lantbruk här med sex hästar, ett tiotal kor och grisuppfödning och dessutom hade sin sopstation i Plommonvägens förlängning. Stockholms stad köpte återstoden av fastigheten 1938. Lantbruket avvecklades 1939, och samma år började småstugeområdet byggas. Det syns i gatunamnen: Hallonvägen, Hjortronvägen, Jordgubbsvägen, Krusbärsvägen, Plommonvägen, Päronvägen och flera andra vägar med namn efter bär och frukter fick sina namn just 1939. Gården revs 1968, och på dess plats väster om Bällstavägen blev det sex villatomter. Inom stadsdelen finns flera gravfält från järnåldern. På en av högarna står en bautasten, och de gravar som har undersökts visar enligt Wikipedia att här fanns bebyggelse redan omkring år 400.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Bromma)"},{"label":"Hustyper","value":"Småstugor, villor"},{"label":"Byggperiod","value":"Villatomter 1904–1914, småstugeområdet från 1939, sex villatomter efter 1968"},{"label":"Bostäder med äganderätt i RegSO (avrundat)","value":"Ca 270"}],
    sourceLink: {"label":"Wikipedia: Eneby, Stockholm","url":"https://sv.wikipedia.org/wiki/Eneby,_Stockholm"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Eneby, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Eneby?","answer":"Byggperiod enligt källorna: villatomter 1904–1914, småstugeområdet från 1939, sex villatomter efter 1968. Hustyper: småstugor och villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Eneby",
    lat: 59.3599,
    lng: 17.9084,
    nearbyLocations: ["Spånga","Bällsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småstugorna i Eneby började byggas 1939 och är i dag runt 85 år gamla. Står det kvar hus från tomtförsäljningen 1904–1914 är de över 110 år, och villorna på gårdstomten är från tiden efter 1968, alltså högst knappt 60 år. Taken kan redan ha lagts om, på de tidigaste husen kanske flera gånger, och därför går det inte att läsa av takets skick i husets byggår. En takkontroll handlar i stället om det som finns i dag: hur underlaget ser ut, om plåten kring skorsten och ventilation sluter tätt och om hängrännor och stuprör leder bort vattnet. På ett litet hus märks en tillbyggnad eller en ny kupa tydligt i taket, och där nytt möter gammalt behöver anslutningen vara rätt gjord. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Eneby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "ballsta-bromma",
    name: "Bällsta",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Bällsta i Bromma, ett småstugeområde med omkring 220 stugor från 1940-talet. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Bällsta är en stadsdel i Västerort i Stockholm. Den bildades 1932 men krympte några år senare, när den obebyggda södra delen intill det nyanlagda Bromma flygfält fördes över till stadsdelen Riksby. Här ligger också travbanan Solvalla, som invigdes 1927. Marken hörde till Bällsta gård. Gården såldes 1904 till ett exploateringsbolag, Råsunda Förstads AB, och mellan 1905 och 1908 styckades de första tomterna av till det som kallades Bällsta villastad. Det skedde enligt Wikipedia på privat initiativ. Först 1938 köpte Stockholms stad resten av egendomen, och sedan byggdes området ut med småstugor. Gårdens väderkvarn från 1855 flyttades på 1930-talet, när flygplatsen anlades, och står nu norr om Lillsjön under namnet Ulvsunda kvarn. Bebyggelsen domineras enligt Wikipedia av små trähus i en trädgårdsstad från 1940-talet. Omkring 200 stugor byggdes av ägarna själva, i stadens regi: Stockholms stads småstugebyrå, som hade funnits sedan 1927, stod för material och instruktioner. Därutöver såldes 20 stugor färdigbyggda. De flesta husen är enplansstugor. Stadsplanen är strikt, med långa raka gator, och husen står regelbundet placerade med långsidan mot gatan. Fasaderna har träpanel med locklist. Wikipedia lyfter fram trädgårdarna och planteringarna längs gatorna som viktiga delar av miljön och förklarar varför området ser ut som det gör: tomterna är mindre än 1 000 kvadratmeter och har därför inte styckats. I Stockholms översiktsplan redovisas Bällsta enligt samma källa som värdefull kulturmiljö.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Bromma)"},{"label":"Hustyper","value":"Små trähus, mest enplansstugor (ca 200 självbyggda och 20 färdigbyggda)"},{"label":"Byggperiod","value":"1940-tal (stadens köp 1938), villastadens tomter 1905–1908"},{"label":"Bostäder med äganderätt i RegSO (avrundat)","value":"Ca 240"}],
    sourceLink: {"label":"Wikipedia: Bällsta","url":"https://sv.wikipedia.org/wiki/B%C3%A4llsta"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Bällsta, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Bällsta?","answer":"Byggperiod enligt källorna: 1940-tal (stadens köp 1938), villastadens tomter 1905–1908. Hustyper: små trähus, mest enplansstugor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Bällsta",
    lat: 59.3633,
    lng: 17.9257,
    nearbyLocations: ["Eneby","Ulvsunda"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Stugorna i Bällsta byggdes på 1940-talet och är i dag runt 80 år gamla. Taken kan redan ha lagts om, och husets ålder säger därför inget säkert om hur taket mår. Det gör däremot underlaget, läkten, plåten runt skorstenen och hängrännorna, och dem går det att bedöma vid en takkontroll. När husen i ett område står i rak linje med samma sida mot gatan syns varje tak tydligt från trottoaren. Eftersom området dessutom är utpekat som värdefull kulturmiljö är det klokt att ta reda på vad som gäller innan material eller kulör väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. På en enplansstuga är takytan liten och enkel att överblicka, men de detaljer som ska hålla tätt är lika många som på ett större hus. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Bällsta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "ulvsunda",
    name: "Ulvsunda",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Ulvsunda trädgårdsstad i Bromma, där de flesta egna hemmen byggdes på 1920-talet. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Ulvsunda är en stadsdel i Västerort i Stockholm. Den gränsar till Ulvsunda industriområde i norr, Ulvsundasjön och Traneberg i öster, Alvik och Stora Mossen i söder och Riksby i väster. Ulvsundavägen går rakt igenom stadsdelen, och den sydöstra delen av Lillsjön hör hit. Namnet står enligt Wikipedia på en runsten från 1000-talet, och Ulvsunda slott uppfördes 1644–1645 av fältmarskalken Lennart Torstenson. Villastaden började med sommarnöjen på Lillsjönäs ägor under 1800-talet. Åren 1902–1903 styckade slottets ägare av villatomter, och från 1906 såldes tomter genom AB Kungsholms Villastad. Husen var enligt Wikipedia dels enkla hyresvillor, dels egna hem, detaljrikt utformade med glasverandor och torn. Tomtbolaget anlade dock varken vägar eller avlopp. Stockholms stad köpte Lillsjönäs 1908, rev delar av den äldre villastaden och planerade 1912 Ulvsunda trädgårdsstad. Planen fastställdes 1914, samma år som spårvagnen och elektriciteten drogs hit, och tomterna uppläts med tomträtt. Det gick trögt i början men tog fart efter första världskriget. De flesta egna hemmen kom till på 1920-talet, ofta genom att den blivande ägaren själv anlitade en entreprenör. Bland arkitekterna nämner Wikipedia Gustaf Pettersson, Gustaf Larson och Edvin Engström vid stadens egnahemsbyrå. Per Olof Hallmans stadsplan från december 1922 tillät öppen eller kopplad bebyggelse i högst två våningar och reglerade både utseende och avstånd till granne och gata. Utbyggnaden med egna hem fortsatte under 1930-talet. Från 1940-talet byggdes i stället flerbostadshus, vilket enligt Wikipedia har gett en varierad men ändå sammanhållen bebyggelse.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Bromma)"},{"label":"Hustyper","value":"Egna hem (öppen eller kopplad bebyggelse i högst två våningar), flerbostadshus"},{"label":"Byggperiod","value":"Villatomter från 1902–1903, de flesta egna hemmen på 1920-talet, fortsatt på 1930-talet, flerbostadshus från 1940-talet"},{"label":"Ägda småhus (avrundat)","value":"Ca 240"}],
    sourceLink: {"label":"Wikipedia: Ulvsunda","url":"https://sv.wikipedia.org/wiki/Ulvsunda"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Ulvsunda, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Ulvsunda?","answer":"Byggperiod enligt källorna: villatomter från 1902–1903, de flesta egna hemmen på 1920-talet, fortsatt på 1930-talet, flerbostadshus från 1940-talet. Hustyper: egna hem (öppen eller kopplad bebyggelse i högst två våningar) och flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Ulvsunda",
    lat: 59.3374,
    lng: 17.9601,
    nearbyLocations: ["Ålsten","Stora Mossen"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta egna hemmen i Ulvsunda är från 1920-talet och i dag runt 100 år gamla, medan husen från 1930-talet är omkring 90 år. Finns det hus kvar från villastadens tid före 1908 har de passerat 115 år. På så gamla hus kan taket ha lagts om mer än en gång, och det säger mer om skicket när och hur det senast gjordes än när huset byggdes. På hus med verandor, torn eller andra utbyggnader består taket av flera ytor som möts i vinklar, och det är i vinklarna, vid ränndalar och plåtanslutningar, som en kontroll behöver vara noggrann. Är huset kopplat med grannens behöver arbetet vid skarven fungera ihop med grannens tak. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Ulvsunda och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "holo",
    name: "Hölö",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte i Hölö söder om Södertälje, ett stationssamhälle från 1913 med trävillor från 1910-talet och villaområden från 1960–1980-talen.",
    longDescription:
      "Hölö är en tätort i Södertälje kommun. Enligt Wikipedia ligger orten söder om Södertälje, strax norr om Vagnhärad, mellan järnvägen Nyköpingsbanan i väster och E4 i öster. Söder om samhället ligger Lillsjön och Kyrksjön, den senare med Hölö kyrka vid sin östra strand. Samhället är yngre än socknen. Södertälje kommuns kulturmiljöinventering beskriver hur Hölö anlades som stationssamhälle kring järnvägslinjen som öppnade 1913. Tyngdpunkten flyttade då västerut från det gamla sockencentrumet vid kyrkan. Vid stationen byggdes stationshus och magasin, och på andra sidan järnvägen uppfördes villor med namn som Rosenhill och Laxne, med affär och handel. Flera av byggnaderna var enligt kommunen av egnahemskaraktär. Kommunen delar in bebyggelsen efter ålder. I centrala Hölö står trävillor från 1910- och 1920-talen med stora, anlagda trädgårdar. Kring 1930-talet tillkom enskilda små villor, flerfamiljshus kring stationen, samlingslokaler och dansbana. Längre upp i backarna ligger småhus från tiden kring 1900-talets mitt, inpassade på mindre naturtomter och indragna från gatan så att en förgård bildas, ibland med tallar. Därefter har samhället vuxit utåt med villaområden från perioden 1960–1980-talet, som kommunen beskriver som likartade enfamiljshus på generösa tomter. I ytterkanterna finns också radhusområden. Stationen revs 1969, när tågen slutade stanna. Kommunen skriver att orten i dag växer igen, med flera typhusområden i anslutning till tätorten.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Södertälje"},{"label":"Hustyper","value":"Trävillor, små enskilda villor, småhus, enfamiljshus i villaområden, radhusområden i ytterkanterna, några flerbostadshus"},{"label":"Byggperiod","value":"1910–1920-tal (centrum), 1930-tal, kring 1900-talets mitt, villaområden 1960–1980-tal, senare typhusområden"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 480 (SCB, 2025)"}],
    sourceLink: {"label":"Södertälje kommun: Inventering av kulturmiljöer, Hölö socken","url":"https://www.sodertalje.se/contentassets/801b52a57aed44f592a5d6bf3ff8bb96/2-holo.pdf"},
    parentLocation: {"name":"Södertälje","slug":"sodertalje"},
    h1Override: "Takläggare i Hölö, Södertälje",
    uniqueFAQ: {"question":"När byggdes husen i Hölö?","answer":"Byggperiod enligt källorna: 1910–1920-tal i centrum, 1930-tal, kring 1900-talets mitt längre upp i backarna, villaområden 1960–1980-tal och senare typhusområden. Hustyper: trävillor, små enskilda villor, småhus, enfamiljshus och radhusområden i ytterkanterna. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Hölö",
    lat: 59.0255,
    lng: 17.5356,
    nearbyLocations: ["Södertälje","Järna"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Hölö har hus från fyra skeden. Trävillorna i centrum är i dag runt 100 till 115 år gamla, de små villorna från 1930-talet runt 90 år, småhusen i backarna runt 75 år och husen i villaområdena från 1960–1980-talen mellan drygt 40 och 65 år. Taken kan redan ha lagts om, på trävillorna kanske flera gånger, och husets ålder säger därför inget säkert om takets skick. På hus från 1970- och 1980-talen som har kvar sitt första tak är det ofta underlagspapp, genomföringar och plåtanslutningar som behöver ses över först. På radhus hänger taken ihop med grannens, och anslutningen behöver fungera åt båda håll. Kommunens inventering råder till försiktighet när fasadmaterial och takfall ändras på de små villorna från tiden kring 1900-talets mitt, och till att det tidiga 1900-talets hus vårdas med hänsyn till sin karaktär. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Hölö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "stavsnas",
    name: "Stavsnäs",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takbyte i Stavsnäs på Fågelbrolandet, med sommarvillor från 1800-talets slut och villor på Stavsnäs gärde från 1960-talet och framåt.",
    longDescription:
      "Stavsnäs är en tätort i Värmdö kommun, omkring 40 kilometer öster om Stockholm. Enligt Wikipedia ligger den längst ut på Fågelbrolandets nordöstra udde och består av tre delar med olika karaktär: Stavsnäs by, Stavsnäs vinterhamn och Stavsnäs gärde. Byn nämns första gången i skrift 1410 och var då sannolikt bara ett par gårdar vid den skyddade hamnen i Byviken. Invånarna levde av fiske och jordbruk, och några var lotsar. I början av 1600-talet hade byn vuxit längs den nuvarande Allévägen. År 1865 fick Stavsnäs reguljär ångbåtstrafik från Stockholm. Då började stockholmare bygga sommarvillor, som enligt Wikipedia hade glasverandor och utsirade snickerier och blev ett annorlunda inslag bland den äldre allmogebebyggelsen. En lanthandel kom 1877 och senare ett varmbadhus och två pensionat. Varmbadhuset och pensionaten är i dag ombyggda till privatbostäder. Wikipedia beskriver byn som en blandning av permanentboende och fritidsbebyggelse från tiden kring sekelskiftet 1900, utefter smala, slingrande grusvägar. Landsvägen blev klar i början av 1930-talet, och vinterhamnen anlades under samma årtionde. Under efterkrigstiden byggdes allt fler sommarhus i och kring Stavsnäs. Ett köpcentrum uppfördes 1967 på Stavsnäs gärde, söder om länsväg 222, och där växte en nyare del fram med villor, kedjehus och hyreshus för permanentboende, uppförda från 1960-talet och framåt. Bebyggelsen har sedan utvidgats söderut mot Höl. I själva byn har bara ett fåtal modernare hus byggts, på avstyckade tomter, och enligt Wikipedia reglerar detaljplanen den befintliga bebyggelsen långtgående.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Värmdö"},{"label":"Delområden","value":"Stavsnäs by, Stavsnäs vinterhamn, Stavsnäs gärde (sammanvuxet med Höl)"},{"label":"Hustyper","value":"Sommarvillor, fritidshus och permanentbostäder i byn, villor, kedjehus och hyreshus på Stavsnäs gärde"},{"label":"Byggperiod","value":"Sommarvillor från 1865 och framåt, sommarhus under efterkrigstiden, Stavsnäs gärde från 1960-talet och framåt"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 500 (SCB, 2025; fritidshus ingår inte)"}],
    sourceLink: {"label":"Wikipedia: Stavsnäs","url":"https://sv.wikipedia.org/wiki/Stavsn%C3%A4s"},
    parentLocation: {"name":"Värmdö","slug":"varmdo"},
    h1Override: "Takläggare i Stavsnäs, Värmdö",
    uniqueFAQ: {"question":"När byggdes husen i Stavsnäs?","answer":"Byggperiod enligt källorna: sommarvillor från 1865 och framåt (1800-talets senare del, sekelskiftet 1900), sommarhus under efterkrigstiden, Stavsnäs gärde från 1960-talet och framåt. Hustyper: sommarvillor, fritidshus och permanentbostäder i byn, samt villor, kedjehus och hyreshus på Stavsnäs gärde. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Stavsnäs",
    lat: 59.2882,
    lng: 18.6918,
    nearbyLocations: ["Värmdö"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Stavsnäs skiljer det mer än hundra år mellan husen. Sommarvillorna i byn från 1800-talets senare del och sekelskiftet är i dag mellan 125 och 150 år gamla, efterkrigstidens sommarhus upp till 80 år och husen på Stavsnäs gärde upp till drygt 60 år. Taken kan redan ha lagts om, på byns villor kanske flera gånger, och husets ålder säger därför lite om takets skick. På kedjehus möter taket grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. Har ett sommarhus byggts om för att bo i året om finns det ofta skarvar mellan tak från olika tider, och de är värda en extra titt. I en by där detaljplanen reglerar bebyggelsen är det klokt att ta reda på vad som gäller innan material eller kulör väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Stavsnäs och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "enhorna-sandviken",
    name: "Sandviken",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte i Sandviken på Enhörnalandet, med sommarvillor från sekelskiftet 1900 och sportstugor från 1930-talet och framåt. Kostnadsfri takkontroll.",
    longDescription:
      "Sandviken är en tätort på Enhörnalandet, norr om Södertälje. Tillsammans med Vattubrinken, Ekeby och byarna Tuna, Stjärna och Aska brukar orten enligt Wikipedia kallas Enhörna. Södertälje kommuns kulturmiljöinventering placerar Sandviken intill Mälaren i den östra delen av Ytterenhörna socken. Enligt kommunen är dagens Sandviken uppbyggt kring ångbåtsbryggan, som kom till under 1870-talet. I samband med den började stora villor byggas, i första hand som sommarnöjen. Mellersta Sandviken bebyggdes kring sekelskiftet 1900. Kommunen beskriver stora tomter med fruktträdgårdar längs Sandviksvägen ned mot Mälaren, och hus som ligger indragna från vägen och utnyttjar den sluttande terrängen. Husen har panelade fasader, inslag av snickarglädje och glasade verandor. Längs stranden i nordöst ligger villor från 1910- och 1920-talen på båda sidor om en smal grusväg. Kring 1930-talet och årtiondena därefter kom en ny sorts bebyggelse: småskaliga sportstugor i funktionalistisk stil. Kommunen kopplar dem till tidens syn på friluftsliv och till semesterlagstiftningen i slutet av 1930-talet. De ligger nedanför berget i norra Sandviken och i Axviken öster om Sandviksvägen, på små tomter, och är ofta uppförda av ägaren själv. Den södra delen domineras av fritidshus från 1960-talet och framåt, glest placerade på bergknallar i tallskog. Länge räknades orten som fritidshusområde. Enligt Wikipedia hade Sandviken 204 invånare 1995 men räknades ändå inte som tätort, eftersom andelen fritidshus var för hög. Sedan år 2000 är den tätort, och kommunen skriver att sommarstugeområden som Sandviken och Vattubrinken delvis har omvandlats till permanentboende.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Södertälje (Enhörna kommundel)"},{"label":"Delområden","value":"Mellersta Sandviken (Sandviksvägen), norra Sandviken och Axviken, södra Sandviken"},{"label":"Hustyper","value":"Sommarvillor, villor, sportstugor och fritidshus, delvis omvandlade till permanentboende"},{"label":"Byggperiod","value":"Sommarvillor kring sekelskiftet 1900, villor 1910–1920-tal, sportstugor från 1930-talet till tidigt 1960-tal, fritidshus från 1960-talet och framåt"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 600 (SCB, 2025)"}],
    sourceLink: {"label":"Södertälje kommun: Inventering av kulturmiljöer, Ytterenhörna och Överenhörna socknar","url":"https://www.sodertalje.se/contentassets/801b52a57aed44f592a5d6bf3ff8bb96/4-enhorna.pdf"},
    parentLocation: {"name":"Södertälje","slug":"sodertalje"},
    h1Override: "Takläggare i Sandviken, Enhörna",
    uniqueFAQ: {"question":"När byggdes husen i Sandviken?","answer":"Byggperiod enligt källorna: sommarvillor kring sekelskiftet 1900, villor 1910–1920-tal, sportstugor från 1930-talet till tidigt 1960-tal, fritidshus från 1960-talet och framåt. Hustyper: sommarvillor, villor, sportstugor och fritidshus, delvis omvandlade till permanentboende. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Sandviken",
    lat: 59.2663,
    lng: 17.5033,
    nearbyLocations: ["Södertälje"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Sandviken har kommit till i tydliga omgångar. Sommarvillorna från sekelskiftet är i dag runt 125 år gamla, villorna vid stranden runt 100 år, sportstugorna mellan 65 och 95 år och fritidshusen i söder upp till drygt 60 år. Taken kan redan ha lagts om, och husets ålder säger därför lite om takets skick. När ett hus som byggdes för sommarbruk blir bostad året om ställs andra krav på taket. Har huset byggts till i etapper finns det skarvar mellan tak från olika tider, och de är värda en extra titt. Där tallskogen går nära huset hamnar barr i hängrännor och ränndalar. Kommunens inventering anger att sekelskifteshusens formspråk och sportstugornas enkla uttryck bör värnas. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Sandviken och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "ursvik",
    name: "Ursvik",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte i Ursvik i Sundbyberg, med villasamhället i Lilla Ursvik där 1940-talets kataloghus dominerar. Kostnadsfri takkontroll.",
    longDescription:
      "Ursvik ligger i norra Sundbyberg och består av stadsdelarna Lilla Ursvik och Stora Ursvik. Lilla Ursvik är den äldre delen. Den gränsar enligt Wikipedia till Stora Ursvik i väster, Kymlinge i norr, Brotorp i öster och Hallonbergen i söder. Lilla Ursvik och Stora Ursvik var två av fyra stora gårdar som har funnits i norra Sundbyberg sedan medeltiden. Lilla Ursviks gård köptes 1894 av uppfinnaren Gustav de Laval och såldes 1906 vidare till Graham, som anlade en hissfabrik på gårdens mark. Åt fabrikens arbetare byggdes 14 likadana villor vid Egnahemsvägen, som stod klara 1907. När fabriken senare fick sämre ekonomi började resten av marken styckas och säljas, och ett villasamhälle växte fram. En byggnadsplan av arkitekten Gunnar Wetterling antogs 1938, och 1949 kom området till Sundbyberg, när Spånga landskommun upplöstes. Stadens antikvariska kunskapsunderlag, skrivet av Stockholms läns museum, beskriver villasamhället så här: gatunätet är organiskt format i kuperad terräng, bebyggelsen är blandad och främst från 1900-talets första hälft, och 1940-talets kataloghus dominerar. Villor från 1910-, 1920- och 1930-talen finns främst närmast fabriksområdet och längst österut. Villorna vid Egnahemsvägen är byggda i nationalromantisk stil och har enligt underlaget byggts om mycket. Längs Gamla Enköpingsvägen ligger tre radhuslängor. Runt villasamhället har nya stadsdelar vuxit upp på mark som länge användes av försvaret. Stora Ursvik började bebyggas 2006. Brotorp, som är Sundbybergs del av Järvastaden, fick sina första invånare 2007 och består enligt Wikipedia av radhus, parhus och flerfamiljshus.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Sundbyberg"},{"label":"Delområden","value":"Lilla Ursvik, Stora Ursvik, Brotorp"},{"label":"Hustyper","value":"Villor (kataloghus dominerar i Lilla Ursvik), tre radhuslängor, några flerbostadshus. Brotorp: radhus, parhus, flerfamiljshus"},{"label":"Byggperiod","value":"Egnahemsvägen 1906–1907, villasamhället främst 1900-talets första hälft (1940-talet dominerar), Stora Ursvik från 2006, Brotorp från 2007"},{"label":"Ägda småhus i RegSO (avrundat)","value":"Ca 730 (SCB, 2025)"}],
    sourceLink: {"label":"Sundbybergs stad: Antikvariskt kunskapsunderlag för Sundbybergs bebyggelse (2016)","url":"https://www.sundbyberg.se/download/18.2e6195c8190a64a78d4166d1/1722330773238/Antikvarisk%20utredning%20f%C3%B6r%20Sundbybergs%20bebyggelse.pdf"},
    parentLocation: {"name":"Sundbyberg","slug":"sundbyberg"},
    h1Override: "Takläggare i Lilla Ursvik, Sundbyberg",
    uniqueFAQ: {"question":"När byggdes husen i Ursvik?","answer":"Byggperiod enligt källorna: Egnahemsvägen 1906–1907, villasamhället i Lilla Ursvik främst från 1900-talets första hälft med 1940-talets kataloghus som dominerande inslag, Stora Ursvik från 2006 och Brotorp från 2007. Hustyper: villor, tre radhuslängor och enstaka flerbostadshus i Lilla Ursvik, radhus/parhus/flerfamiljshus i Brotorp. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Ursvik",
    lat: 59.3828,
    lng: 17.9622,
    nearbyLocations: ["Sundbyberg"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Ursvik är av mycket olika ålder. Villorna vid Egnahemsvägen är i dag närmare 120 år gamla, kataloghusen från 1940-talet runt 80 år, och husen i Stora Ursvik och Brotorp högst 20 år. På de äldre villorna kan taken redan ha lagts om, kanske mer än en gång, och husets ålder säger därför lite om takets skick. Det som spelar roll är vad som gjordes senast och hur underlagspapp, plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag. På hus som har byggts om eller byggts till möts tak från olika tider, och skarvarna hör till det som ses över först. På radhus och parhus hänger taken ihop med grannens, och arbetet vid anslutningen behöver fungera tillsammans med grannens tak. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Ursvik och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "enskede-gard",
    name: "Enskede gård",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte i Enskede gård i Söderort, med Palmeska villastaden från 1907 och småvillor från 1920-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Enskede gård är en stadsdel i Söderort i Stockholm som gränsar till Johanneshov, Gamla Enskede, Enskedefältet och Årsta. Namnet kommer från säteriet Enskede gård vid Enskede gårdsväg, där den nuvarande huvudbyggnaden är från 1805. Stockholms stad köpte gårdens ägor på 600 hektar 1904. Den första bebyggelsen ligger enligt Wikipedia öster om gården. År 1907 sålde staden 49 tomter kring Lindevägen till ingenjören Lennart Palme, med full äganderätt, och bygget började med tio dubbelhus och åtta enkelhus ritade av Rudolf Arborelius. Området kom att kallas Palmeska villastaden. Året därpå infördes lagen om tomträtt, och sedan dess upplåter staden mark på det sättet. På 1920-talet byggdes småvillor i trädgårdsmiljö mellan Herrgårdsvägen och Lindevägen. Wikipedia nämner husen på Dammtrappgatan 16–26 som tidstypiska, med fasader i träpanel och locklister, spröjsade fönster och fönsterluckor. Huset på nummer 20 ritades av Sven Wallander 1925. Stadsplanen för området fastställdes 1929, och i den stod att gården och parken skulle bevaras. Norr om Sockenvägen ledde Stockholms stads småstugebyrå bygget av egnahem, som de boende uppförde själva efter något av fyra typhus. Där stadens trädskola en gång låg, längs Drivhusvägen och Planterarvägen, står radhus i två våningar ritade av Kjell Forshed, med fasader som enligt Wikipedia har inspirerats av 20-talshusen intill. Stadsmuseet inventerade stadsdelens byggnader 2004–2007 och gav fem av dem blå märkning.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Enskede-Årsta-Vantör)"},{"label":"Hustyper","value":"Dubbelhus och enkelhus (Palmeska villastaden), småvillor, egnahem, radhus, smalhus"},{"label":"Byggperiod","value":"Palmeska villastaden från 1907, småvillor på 1920-talet, stadsplan 1929; inget byggår i källan för egnahemmen och radhusen"},{"label":"Ägda småhus (avrundat)","value":"Ca 420"}],
    sourceLink: {"label":"Wikipedia: Enskede gård (stadsdel)","url":"https://sv.wikipedia.org/wiki/Enskede_g%C3%A5rd_(stadsdel)"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Enskede gård, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen i Enskede gård?","answer":"Byggperiod enligt källorna: Palmeska villastaden från 1907, småvillor på 1920-talet, stadsplan 1929; inget byggår anges för egnahemmen norr om Sockenvägen eller för radhusen vid Drivhusvägen. Hustyper: dubbelhus och enkelhus, småvillor, egnahem och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Enskede gård",
    lat: 59.2893,
    lng: 18.0702,
    nearbyLocations: ["Enskede","Enskedefältet"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Palmeska villastaden är i dag nära 120 år gamla och småvillorna från 1920-talet runt 100 år. För egnahemmen norr om Sockenvägen och för radhusen vid Drivhusvägen anger källan inget byggår. När ett hus har stått i hundra år kan taket redan ha lagts om, kanske flera gånger, och husets ålder berättar därför inte vad som ligger där nu. Svaret finns i hur underlag, läkt, plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag. På dubbelhus och radhus delar två eller flera hushåll samma takfall. Byter den ena sidan tak behöver anslutningen mot grannens del utföras så att den fungerar ihop med grannens tak, och det nya syns intill det gamla. I en stadsdel där Stadsmuseet har klassat byggnader lönar det sig att ta reda på vad som gäller innan material eller kulör väljs. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Enskede gård och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "enskedefaltet",
    name: "Enskedefältet",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte på Enskedefältet i Söderort, småstugestadsdelen som byggdes av de boende själva 1930–1932. Kostnadsfri takkontroll.",
    longDescription:
      "Enskedefältet är en stadsdel i Söderort i Stockholm, mellan Enskede gård i norr och Stureby i söder. Marken hörde till godset Enskede gård, som Stockholms stad köpte 1904, och var åker direkt söder om gårdens huvudbyggnad. Stadsplanen fastställdes 1928. Den följer ett symmetriskt rutnät med Vårflodsparken som ett grönt stråk i mitten, där Valla å en gång rann fram. Kvarteren fick namn efter grönsaker, som Blomkålen och Rödbetan, och gatorna efter trakter runt Östersjön, som Estlandsgatan och Pommerska gatan. I januari 1930 beslöt stadsfullmäktige att 200 småstugor skulle uppföras som självbyggeri i Enskede, och fler följde 1931 och 1932. Enligt Wikipedia restes över 400 småstugor på det platta och trädlösa gärdet mellan 1930 och 1932, i Stockholms stads småstugebyrås regi, medan staden anlade gator och ledningar. De boende hjälptes åt att gräva och mura källarna och att resa de prefabricerade väggarna. Det fanns fyra hustyper, alla med källare och en liten täppa, och fasaderna kläddes med locklistpanel i pastellfärger som staden hade bestämt. Stockholms stadsbyggnadskontor begär enligt Wikipedia fortfarande att ursprunglig färgsättning ska eftersträvas. Av stadsdelens omkring 500 bostäder är cirka 80 procent småhus från de åren. De flesta stugorna har enligt Wikipedia byggts till mot trädgårdssidan, eftersom det saknades plats mot gatan, och därför ger området från gatan fortfarande ett enhetligt intryck.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Enskede-Årsta-Vantör)"},{"label":"Hustyper","value":"Friliggande småstugor (fyra typer), några flerfamiljshus längs Sockenvägen"},{"label":"Byggperiod","value":"Småstugorna 1930–1932"},{"label":"Ägda småhus (avrundat)","value":"Ca 400"}],
    sourceLink: {"label":"Wikipedia: Enskedefältet","url":"https://sv.wikipedia.org/wiki/Enskedef%C3%A4ltet"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare på Enskedefältet, Stockholm",
    uniqueFAQ: {"question":"När byggdes husen på Enskedefältet?","answer":"Byggperiod enligt källorna: småstugorna 1930–1932. Hustyper: friliggande småstugor i fyra typer, med några flerfamiljshus längs Sockenvägen. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker."},
    primaryKeyword: "takläggare Enskedefältet",
    lat: 59.2844,
    lng: 18.0603,
    nearbyLocations: ["Enskede","Enskede gård"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småstugorna på Enskedefältet är i dag mellan 94 och 96 år gamla. Under så lång tid kan taken redan ha lagts om, kanske mer än en gång, och två grannhus som byggdes samma sommar kan i dag ha helt olika tak ovanför sig. Därför går det inte att läsa av skicket på byggåret. Det som avgör är hur underlagspapp, läkt, plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag. När en stuga byggs till mot trädgården möter tillbyggnadens tak det ursprungliga. Sådana möten, alltså ränndalar, vinklar och anslutningar mot vägg, är allmänt de ställen på ett tak som först behöver ses över. Där husen liknar varandra syns också ett nytt tak tydligt från gatan. Eftersom staden enligt källan har önskemål om fasadernas färgsättning är det klokt att fråga vad som gäller innan material eller kulör på taket bestäms. För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Enskedefältet och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
];

export const getLocationBySlug = (slug: string) =>
  locations.find((l) => l.slug === slug);
