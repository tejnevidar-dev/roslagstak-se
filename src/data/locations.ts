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
      "Takläggare på Blidö — takbyte, takrenovering och takomläggning.",
    longDescription:
      "Blidö utsätts för kraftig vind och saltluft året runt — förhållanden som sliter hårt på tak. Många fastighetsägare på Blidö upptäcker för sent att underlagspappen gett vika eller att plåtbeslagen rostat. På Blidö har vi själva gjort ett komplett takbyte med svarta betongpannor, se Projekt.",
    extraContent:
      "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    uniqueFAQ: {
      question: "Hur når RoslagsTak Blidö med material för takbyte?",
      answer:
        "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    },
    primaryKeyword: "takläggare Blidö",
    lat: 59.6167,
    lng: 18.8333,
    nearbyLocations: ["Yxlan", "Furusund", "Rådmansö"],
  },
  {
    slug: "ljustero",
    name: "Ljusterö",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takläggare på Ljusterö — professionell takläggning med erfarenhet av Ljusterös unika förhållanden. Takbyte, takrenovering, TP20 och plåtarbeten.",
    longDescription:
      "Ljusterö är Roslagens största ö, med allt från moderna permanentboenden till äldre sommarstugor med originaltak från 60-talet. Klimatet här är påfrestande — saltstänk, höststormar och fuktiga vintrar bryter ner takmaterial snabbare än på fastlandet.",
    extraContent:
      "Med sin storlek och varierade bebyggelse har Ljusterö ett brett spektrum av taktyper — från betongpannor och lertegel till äldre plåttak med ståndsfalsar. Ring oss för en kostnadsfri takinspektion på Ljusterö — vi ger dig en ärlig bedömning och fast pris.",
    uniqueFAQ: {
      question: "Vilken typ av tak är vanligast på Ljusterö?",
      answer:
        "På Ljusterö ser vi en stor variation — från äldre betongpannetak och lertegel till modernare TP20-plåttak. Många väljer att byta till dubbelfalsat plåt eller tegelplåt vid takomläggning. Vi rekommenderar material utifrån husets stil, takets lutning och din budget. Boka en kostnadsfri takkontroll så ger vi en personlig rekommendation.",
    },
    primaryKeyword: "takläggare Ljusterö",
    lat: 59.4667,
    lng: 18.5333,
    nearbyLocations: ["Svartnö", "Vaxholm", "Högmarsö"],
  },
  {
    slug: "yxlan",
    name: "Yxlan",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takläggare på Yxlan — takbyte och takrenovering med TP20, pannplåt och dubbelfalsat plåttak. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Här finns många charmiga äldre stugor med tak som börjat åldras — spruckna pannor, sliten underlagspapp och rostiga beslag.",
    extraContent:
      "På Yxlan finns många fritidshus som ägs av familjer som besöker ön under sommarhalvåret.",
    uniqueFAQ: {
      question: "Kan ni byta tak på Yxlan om jag inte är på plats?",
      answer:
        "Ja, vi utför ofta takbyten på Yxlan när fastighetsägaren inte är på plats. Vi håller dig uppdaterad löpande under arbetet. Takkontroll och offert kan göras vid ett separat besök, och nycklar kan överlämnas på plats.",
    },
    primaryKeyword: "takläggare Yxlan",
    lat: 59.6333,
    lng: 18.8167,
    nearbyLocations: ["Blidö", "Furusund", "Rådmansö"],
  },
  {
    slug: "furusund",
    name: "Furusund",
    region: "Mellersta skärgården",
    isIsland: false,
    description:
      "Takläggare i Furusund — takbyte, tegelplåttak och takrenovering.",
    longDescription:
      "Furusund har anor som skärgårdsort och bebyggelsen speglar det — sekelskifteshus, klassiska sommarstugor och nyare villor. Många tak i Furusund har nått sin livslängd och behöver bytas eller renoveras. Salta vindar och fuktiga höstar ställer krav på materialvalet, och det går vi igenom vid den kostnadsfria takkontrollen.",
    extraContent:
      "Furusund fungerar som knutpunkt för öarna i mellersta skärgården. Kontakta oss för en kostnadsfri takkontroll i Furusund, så får du ett fast pris i offerten.",
    uniqueFAQ: {
      question: "Hur snabbt kan ni påbörja ett takbyte i Furusund?",
      answer:
        "Ring oss för att diskutera ditt projekt. Takkontrollen är kostnadsfri och utan förpliktelser, och du får ett fast pris i offerten.",
    },
    primaryKeyword: "takläggare Furusund",
    lat: 59.65,
    lng: 18.9167,
    nearbyLocations: ["Blidö", "Yxlan", "Rådmansö"],
  },
  {
    slug: "husaro",
    name: "Husarö",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takläggare på Husarö — takbyte och takrenovering. Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    longDescription:
      "Öns exponerade läge gör att taken utsätts för extremt väder, vilket ställer höga krav på både material och utförande. Vi använder enbart beprövade lösningar som tål skärgårdens hårda påfrestningar.",
    extraContent:
      "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    uniqueFAQ: {
      question: "Hur transporterar ni takmaterial till Husarö?",
      answer:
        "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    },
    primaryKeyword: "takläggare Husarö",
    lat: 59.5333,
    lng: 18.6833,
    nearbyLocations: ["Ingmarsö", "Finnhamn", "Ljusterö"],
  },
  {
    slug: "finnhamn",
    name: "Finnhamn",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takläggare på Finnhamn — professionell takläggning i ytterskärgården.",
    longDescription:
      "Finnhamn är en av Stockholms skärgårds mest älskade öar — och de fastigheter som finns här förtjänar tak i toppskick. Det exponerade läget innebär att taken slits hårdare av vind, regn och saltluft. Resultatet blir ett tak som inte bara skyddar — det håller i generationer.",
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
      "Takläggare på Ingmarsö — takbyte och takrenovering. Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    longDescription:
      "Ingmarsö har en aktiv skärgårdsgemenskap med både året-runt-boende och sommarfirare. Bebyggelsen varierar från äldre röda stugor till nyare fritidshus — och alla behöver tak som klarar skärgårdens klimat. Vi tar hand om hela processen åt dig — från takkontroll till färdigt tak, med fast pris och utan överraskningar.",
    extraContent:
      "Ingmarsö har ett levande samhälle med både permanentboende och säsongsboende. Äldre tak kan ha betongpannor eller eternitplattor som behöver bytas ut.",
    uniqueFAQ: {
      question:
        "Hanterar ni bortforsling av gammalt takmaterial från Ingmarsö?",
      answer:
        "Ja, vi tar hand om allt — inklusive rivning, bortforsling och miljöriktig avfallshantering av gammalt takmaterial. Allt ingår i det fasta priset du får i offerten.",
    },
    primaryKeyword: "takläggare Ingmarsö",
    lat: 59.5,
    lng: 18.65,
    nearbyLocations: ["Husarö", "Finnhamn", "Ljusterö"],
  },
  {
    slug: "hogmarso",
    name: "Högmarsö",
    region: "Mellersta skärgården",
    isIsland: true,
    description:
      "Takläggare på Högmarsö — takbyte och takrenovering.",
    longDescription:
      "Högmarsö är en lugnare ö i mellersta Roslagen, men klimatet är lika krävande som i resten av skärgården. Fukt, mossa och salt bryter långsamt ner takmaterial som inte är anpassat för miljön. TP20-plåttak med rätt underlag är ofta det optimala valet här — hållbart, underhållsfritt och estetiskt tilltalande.",
    extraContent:
      "Högmarsö ligger nära Ljusterö och vi kombinerar ofta projekt på de två öarna. Det innebär att fastighetsägare på Högmarsö kan dra nytta av samordning och få ett förmånligt pris. Oavsett om du har en sommarstuga eller ett permanentboende rekommenderar vi en kostnadsfri takinspektion som utgångspunkt.",
    uniqueFAQ: {
      question:
        "Är det dyrare att byta tak på Högmarsö jämfört med fastlandet?",
      answer:
        "Priset beror på takets storlek, material och förutsättningarna på plats. Begär en offert så ser du exakt vad det kostar — fast pris, inga dolda tillägg.",
    },
    primaryKeyword: "takläggare Högmarsö",
    lat: 59.4833,
    lng: 18.6,
    nearbyLocations: ["Ljusterö", "Finnhamn", "Ingmarsö"],
  },
  {
    slug: "svartloga",
    name: "Svartlöga",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takläggare på Svartlöga — takbyte och takrenovering. Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    longDescription:
      "Svartlöga ligger i ytterskärgården och nås med Waxholmsbåt — ett läge som avskräcker de flesta takfirmor. Men för oss på RoslagsTak är det vardag. Ditt tak på Svartlöga förtjänar samma kvalitet som på fastlandet — och det är precis vad vi levererar.",
    extraContent:
      "Svartlöga är en av de mer avlägsna öarna i Roslagens skärgård. Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    uniqueFAQ: {
      question: "Finns det takläggare som verkligen tar sig ut till Svartlöga?",
      answer:
        "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Ring oss så berättar vi mer.",
    },
    primaryKeyword: "takläggare Svartlöga",
    lat: 59.6,
    lng: 19.05,
    nearbyLocations: ["Söderöra", "Norröra", "Humlö"],
  },
  {
    slug: "sodorora",
    name: "Söderöra",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takläggare på Söderöra — takbyte och takrenovering i norra skärgården.",
    longDescription:
      "Söderöra i norra skärgården är en ö med genuint skärgårdsliv och äldre bebyggelse som kräver takläggare med rätt erfarenhet. Den öppna havsmiljön gör att taken exponeras för starka vindar och salt stänk, vilket påskyndar slitage. Med oss får du en takläggare som tar sig dit andra inte vågar — och som levererar ett tak byggt för att hålla.",
    extraContent:
      "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Kontakta oss om du har en fastighet på Söderöra som behöver nytt tak.",
    uniqueFAQ: {
      question: "Kan ni byta tak på Söderöra trots att det bara nås med båt?",
      answer:
        "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Allt ingår i det fasta priset i offerten.",
    },
    primaryKeyword: "takläggare Söderöra",
    lat: 59.5833,
    lng: 19.0,
    nearbyLocations: ["Svartlöga", "Norröra", "Gräskö"],
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
      "Takläggare på Norröra (Saltkråkan) — takbyte och takrenovering med respekt för öns karaktär.",
    longDescription:
      "Norröra — eller Saltkråkan som många känner ön — har en unik kulturhistorisk miljö som ställer särskilda krav på takläggning. Här handlar det inte bara om att lägga ett hållbart tak, utan att göra det med respekt för öns karaktär. Vi anpassar materialval och utförande efter varje byggnads stil — pannplåt som efterliknar tegel, lertegel för de äldre husen, eller TP20 för nyare byggnader.",
    extraContent:
      "Norröra har en speciell plats i svenskarnas hjärtan tack vare Astrid Lindgrens Saltkråkan. Bebyggelsen på ön speglar en äldre skärgårdskultur som kräver takläggare med känsla för detaljer. Om du äger en fastighet på Norröra och behöver byta tak, välj en takläggare som förstår öns unika värde.",
    uniqueFAQ: {
      question:
        "Kan ni lägga tak som matchar Norröras traditionella bebyggelse?",
      answer:
        "På Norröra rekommenderar vi ofta pannplåt i traditionella kulörer eller lertegel för att bevara öns karaktär. Vi anpassar alltid utförandet efter varje byggnads stil och historia.",
    },
    primaryKeyword: "takläggare Norröra",
    lat: 59.5667,
    lng: 18.9833,
    nearbyLocations: ["Söderöra", "Svartlöga", "Humlö"],
  },
  {
    slug: "grasko",
    name: "Gräskö",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takläggare på Gräskö — vi utför takbyte och takrenovering i norra Roslagens skärgård.",
    longDescription:
      "Gräskö i norra Roslagens skärgård har ett klimat som testar alla byggnaders uthållighet — och taken tar stryk först. Fukt, frost och den ständiga havsvinden kräver taklösningar som är genomtänkta från grunden. Oavsett om du vill byta till plåttak, renovera befintligt tak eller bara få en professionell bedömning av takets skick — kontakta oss så ordnar vi resten.",
    extraContent:
      "Vi rekommenderar korrosionsbeständig plåt och dimensionerade infästningar som tål hårda vindar.",
    uniqueFAQ: {
      question: "Vilka takmaterial klarar sig bäst på Gräskö?",
      answer:
        "Gräskö ligger exponerat mot havet, så vi rekommenderar TP20-plåttak eller dubbelfalsat plåttak med korrosionsbeständig behandling. Dessa material tål salt, vind och fukt bäst. Vi undviker betongpannor på exponerade lägen i ytterskärgården — plåt ger längre livslängd och kräver minimalt underhåll.",
    },
    primaryKeyword: "takläggare Gräskö",
    lat: 59.55,
    lng: 18.95,
    nearbyLocations: ["Söderöra", "Norröra", "Furusund"],
  },
  {
    slug: "spillersboda",
    name: "Spillersboda",
    region: "Kusten",
    isIsland: false,
    description:
      "Takläggare i Spillersboda — takbyte och takrenovering längs Roslagens kust. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Spillersboda ligger vackert längs Roslagens kustlinje, där den fuktiga havsluften påverkar taken mer än vad många tror. Mossa, fukt i råsponten och slitna beslag är vanliga problem på tak längs kusten. Vi erbjuder en kostnadsfri takkontroll utan förpliktelser. Vi rekommenderar alltid den lösning som ger bäst värde — ibland räcker en renovering, ibland behövs ett komplett byte.",
    extraContent:
      "Längs Roslagskusten sliter havsluften på både pannor och plåt. Vi rekommenderar aldrig ett takbyte om en renovering räcker, och du får svar inom 24 timmar.",
    uniqueFAQ: {
      question:
        "Hur påverkar havsluften i Spillersboda takets livslängd?",
      answer:
        "Den fuktiga luften från kusten gör att mossa och alger får fäste snabbare, och att plåtbeslag och spik rostar tidigare än längre in i landet. Vid takkontrollen i Spillersboda kontrollerar vi därför beslag, infästningar och råspont extra noga, och föreslår material som klarar kustklimatet.",
    },
    primaryKeyword: "takläggare Spillersboda",
    lat: 59.7,
    lng: 18.5833,
    nearbyLocations: ["Norrtälje", "Bergshamra", "Rådmansö"],
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
    extraSections: [{ heading: "Vad det betyder för taket", text: "På Rådmansö står hus från nästan ett sekel sida vid sida, från sekelskiftets sommarhus till villor från 1970- och 80-talen. De flesta husen är i dag runt 45–75 år gamla, och taken kan redan ha lagts om en eller flera gånger. I fritidshus som har byggts om till permanentbostäder kan taket ha kompletterats vid olika tillfällen. Därför går det inte att säga något generellt om skicket. Varje hus får en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Rådmansö? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "bergshamra",
    name: "Bergshamra",
    region: "Kusten",
    isIsland: false,
    description:
      "Takläggare i Bergshamra — professionell takläggning längs Roslagens kust. Takbyte, takrenovering och dubbelfalsat plåttak.",
    longDescription:
      "Bergshamra vid Roslagens kust har en mix av villor och fritidshus, många med tak som nu nått sin livslängd. Det kustnära läget innebär att taken utsätts för mer fukt och vind än längre in på fastlandet. Ett dubbelfalsat plåttak eller TP20 med kvalitetsunderlag ger dig trygghet i 40+ år. Kontakta oss för en ärlig bedömning av ditt tak — helt utan kostnad.",
    extraContent:
      "I Bergshamra finns det ofta tak med äldre betongpannor eller eternitskivor som behöver bytas. Vi hanterar rivning och avfallshantering. Innehåller eterniten asbest samordnar vi saneringen med en behörig saneringsfirma innan nytt tak läggs. Om du har en fastighet i Bergshamra och undrar över takets skick, gör vi en kostnadsfri inspektion. Vi ger alltid en rak och ärlig bedömning.",
    uniqueFAQ: {
      question: "Kan ni hantera eternittak vid takbyte i Bergshamra?",
      answer:
        "Ja, vi samordnar rivning och bortforsling av eternittak via behörig partner enligt gällande regler. Eternit förekommer på många äldre fastigheter i Bergshamra. Vi sköter hela processen — från rivning till färdigt nytt tak — så att du slipper koordinera flera aktörer.",
    },
    primaryKeyword: "takläggare Bergshamra",
    lat: 59.7167,
    lng: 18.55,
    nearbyLocations: ["Spillersboda", "Norrtälje", "Svartnö"],
  },
  {
    slug: "svartno",
    name: "Svartnö",
    region: "Kusten",
    isIsland: false,
    description:
      "Takläggare på Svartnö — takbyte och takrenovering i Roslagens kustmiljö. TP20, dubbelfalsat och pannplåt.",
    longDescription:
      "Svartnö i Roslagens kustlandskap kombinerar havsnära boende med de utmaningar det innebär för byggnader — framför allt taken. Fukt, mossa och salt i luften bryter ner material som inte är anpassat. Med 10 års utförandegaranti på alla våra arbeten kan du känna dig trygg. Boka en kostnadsfri takinspektion — vi ger dig en ärlig bedömning och fast pris.",
    extraContent:
      "Svartnö är populärt bland fritidshusägare som vill bo nära havet, och många fastigheter här har tak som är 25–35 år gamla — en ålder då de flesta takmaterial börjar ge vika. Kontakta oss för en bedömning.",
    uniqueFAQ: {
      question: "När bör man byta tak på ett hus på Svartnö?",
      answer:
        "Tecken på att det är dags: mossa, fuktfläckar i underlaget, rostiga beslag eller spruckna pannor. Vi gör kostnadsfri takinspektion och ger dig en ärlig bedömning — ibland räcker det med en renovering istället för ett komplett byte.",
    },
    primaryKeyword: "takläggare Svartnö",
    lat: 59.45,
    lng: 18.55,
    nearbyLocations: ["Ljusterö", "Bergshamra", "Vaxholm"],
  },
  {
    slug: "vaddo",
    name: "Väddö",
    region: "Kusten",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Roslagsbro och på Väddö nordost om Norrtälje, från Brosjön till Älmsta och Grisslehamn. Kostnadsfri takkontroll.",
    longDescription:
      "Nordost om Norrtälje ligger Roslags-Bro socken, med Norrtäljeviken i söder och Brosjön i väster. I öster når socknen ut till Bagghusfjärden. Wikipedia beskriver Roslags-Bro som en kuperad trakt med mycket sjöar och skog och med odlingsbygd i dalar som en gång var fjärdar. Namnet skrevs Bro år 1322 och syftar på en bro över Broströmmen vid kyrkan. Fram till 1886 hette socknen bara Bro. Väddö är den norra delen av en ö i norra Roslagen, omkring 100 kilometer nordost om Stockholm. Väddö kanal och Väddöviken skiljer ön från fastlandet. Kanalen började anläggas 1819 och invigdes 1840. Tre broar leder över: Trästabron i norr, som invigdes 1998, Älmstabron i mitten och Bagghusbron i söder. Väddö socken beskrivs som berglänt, med en förkastningsbrant i öster och viss odlingsbygd väster om den. Mitt på ön ligger Älmsta, som delvis ligger på fastlandet och nämndes första gången 1557 med sju gårdar. Sydost om Kasberget ligger Kista hembygdsgård, enligt Wikipedia den enda gården på Väddö som klarade sig undan rysshärjningarna 1719, med byggnader från 1700- och 1800-talen. Nära öns nordspets ligger Grisslehamn, som flyttades till sin nuvarande plats efter en brand 1754. Enligt hitta.se är husen längs Roslagsbrovägen mest byggda på 1940- och 1960-talen och husen kring kyrkan på 1920-talet.",
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
        "Byggperiod enligt källorna: längs Roslagsbrovägen mest 1940- och 1960-tal, kring kyrkan 1920-tal. För Väddö-delen är byggperioden inte belagd i de källor vi använder. Hustyper: villor och småbruk, med inslag av fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun.",
    },
    primaryKeyword: "takläggare Väddö",
    lat: 59.95,
    lng: 18.95,
    nearbyLocations: ["Grisslehamn", "Singö", "Norrtälje"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen från 1920-talet är i dag runt 100 år gamla, de från 1940-talet runt 80 år och de från 1960-talet runt 60 år. På hus i de åldrarna kan taken redan ha lagts om, och det går inte att läsa av takets skick på husets byggår. Det som spelar roll är vad som gjordes senast och hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. På ett småbruk eller en gård står ofta bostadshus och ekonomibyggnader från olika tider, och varje tak bedöms för sig. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
    uniqueFAQ: {"question":"När byggdes husen på Vätö?","answer":"Byggperiod enligt källorna: torp och gårdar från 1800-talets andra hälft, fritidshus på norra delen från 1960- och 1970-talen. Hustyper: torp och gårdar, stenhuggartorp, små villor med hög stenfot och fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun."},
    primaryKeyword: "takläggare Vätö",
    lat: 59.7,
    lng: 18.7833,
    nearbyLocations: ["Rådmansö", "Blidö", "Norrtälje"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Torpen och gårdarna från 1800-talets andra hälft är i dag mellan 125 och 175 år gamla, och fritidshusen på norra Vätö mellan runt 50 och drygt 65 år. På de äldre husen kan taken redan ha lagts om, kanske flera gånger, så byggåret berättar lite om taket som ligger där nu. Det som räknas är underlaget, läkten, plåten kring skorstenen och hur vattnet leds bort. Ett fritidshus som har byggts till eller används året om kan ha fått tak i flera omgångar, och skarven mellan delarna behöver ses över. På en gård finns ofta fler tak än bostadshusets, till exempel uthus och bodar, som det kan löna sig att titta på vid samma tillfälle. Wikipedia anger att kulturlandskapet på ön har högt kulturhistoriskt värde, så ta reda på vad som gäller för ditt hus innan du väljer nytt material. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du på Vätö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "norrtalje",
    name: "Norrtälje",
    region: "Kusten",
    isIsland: false,
    description:
      "Takläggare i Norrtälje — din lokala partner för takbyte och takrenovering i Norrtäljeområdet.",
    longDescription:
      "Vi arbetar i Norrtälje stad och i hela kommunen: takbyte, takrenovering och takreparation på villor och andra byggnader. Du får en kostnadsfri takkontroll och ett skriftligt fast pris innan något påbörjas. Ring oss så bokar vi tid för takkontroll.",
    extraContent:
      "Vi utför komplett takservice i Norrtälje med omnejd, från Rimbo och Hallstavik till Grisslehamn: takomläggning, takrenovering, plåtarbeten och takavvattning med hängrännor och stuprör. Allt arbete utförs enligt AMA. Vi lämnar 10 års utförandegaranti och, för tätskiktet, 30 års garanti genom MATAKI. Begär en offert så återkommer vi inom 24 timmar. Processen är densamma för alla jobb i Norrtälje: kostnadsfri takkontroll, fast pris i offerten utan löpande timpris och utförande enligt AMA. Som privatperson kan du använda ROT-avdrag på arbetskostnaden, 30 % upp till 50 000 kr per person och år.",
    uniqueFAQ: {
      question: "Tar RoslagsTak uppdrag i Norrtälje?",
      answer:
        "Ja, vi arbetar i Norrtälje och i hela kommunen, och takkontrollen är alltid kostnadsfri. Ring oss eller boka via formuläret, så återkommer vi inom 24 timmar.",
    },
    primaryKeyword: "takläggare Norrtälje",
    lat: 59.7667,
    lng: 18.7,
    nearbyLocations: ["Rådmansö", "Vätö", "Spillersboda"],
  },
  {
    slug: "vaxholm",
    name: "Vaxholm",
    region: "Kusten",
    isIsland: false,
    description:
      "Takläggare i Vaxholm — professionell takläggning nära Stockholm. Takbyte, pannplåt och takrenovering med lokal erfarenhet.",
    longDescription:
      "Vaxholm är porten till Stockholms skärgård och har en unik blandning av kulturhistoriska trähus och moderna villor. Estetiken är ofta viktig här, särskilt i de äldre delarna av staden, och vi anpassar materialval och utförande efter husets ålder och stil. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Vaxholm ställer höga krav på estetik, särskilt i de kulturhistoriskt värdefulla områdena. Om du bor i Vaxholm och funderar på att byta tak, bokar vi in en kostnadsfri genomgång där vi diskuterar materialval som passar just ditt hus.",
    uniqueFAQ: {
      question:
        "Tar RoslagsTak hänsyn till Vaxholms kulturhistoriska bebyggelse vid takbyte?",
      answer:
        "Ja. Vi anpassar materialval och utförande efter husets ålder och stil, och går igenom alternativen med dig vid den kostnadsfria takkontrollen. Om ett byte av material eller kulör kräver lov eller anmälan avgör Vaxholms kommun.",
    },
    primaryKeyword: "takläggare Vaxholm",
    lat: 59.4,
    lng: 18.35,
    nearbyLocations: ["Ljusterö", "Norrtälje", "Svartnö"],
  },
  {
    slug: "singo",
    name: "Singö",
    region: "Norra skärgården",
    isIsland: false,
    description:
      "Takläggare på Singö — takbyte och takrenovering i norra Roslagen. TP20, pannplåt och dubbelfalsat plåttak.",
    longDescription:
      "Singö i norra Roslagen är en plats där skärgårdskänslan möter lantlig charm. Bebyggelsen varierar — äldre torp, sommarvillor och nyare fritidshus — och alla behöver tak som tål det nordliga skärgårdsklimatet.",
    extraContent:
      "Singö har en blandning av fast boende och sommarboende, och taken här speglar det — allt från klassiska tegelpannetak till enklare papptak på äldre stugor. Kontakta oss för en kostnadsfri bedömning av taket på din fastighet på Singö.",
    uniqueFAQ: {
      question: "Kan ni samordna takbyte på Singö med projekt i Grisslehamn?",
      answer:
        "Ja, vi kan samordna projekt på Singö med arbeten i Grisslehamn och på Väddö där det passar tidsmässigt, vilket kan minska restidskostnaden. Ring oss så planerar vi tillsammans.",
    },
    primaryKeyword: "takläggare Singö",
    lat: 60.0,
    lng: 18.8,
    nearbyLocations: ["Grisslehamn", "Väddö", "Arholma"],
  },
  {
    slug: "grisslehamn",
    name: "Grisslehamn",
    region: "Norra skärgården",
    isIsland: false,
    description:
      "Takläggare i Grisslehamn — takbyte och takrenovering i norra Roslagen. Dubbelfalsat plåttak och TP20 för hårda kustförhållanden.",
    longDescription:
      "Grisslehamn längst norrut i Roslagen är en kustort med direktkontakt med öppet hav — och det märks på taken. Vind, regn och salt sliter hårdare här än på de flesta andra platser i regionen. Dubbelfalsat plåttak och TP20 med rätt underlag och förstärkta infästningar är ofta det vi rekommenderar i dessa förhållanden. Kontakta oss för en kostnadsfri bedömning — vi ger dig rak och ärlig rådgivning.",
    extraContent:
      "Grisslehamn ligger exponerat mot Ålands hav och är en av de mest vindbelastade platserna i Roslagen. Taken här måste klara extrema vindlaster och salt stänk, vilket ställer högre krav på materialval och infästningar än i mer skyddade lägen. Kontakta oss om du vill ha en bedömning av vad som passar just ditt tak i Grisslehamn.",
    uniqueFAQ: {
      question:
        "Vilka speciella krav ställer Grisslehamns klimat på takmaterial?",
      answer:
        "Grisslehamn ligger exponerat mot Ålands hav med starka vindar och salt luft. Vi rekommenderar korrosionsbeständig plåt med förstärkta infästningar. Dubbelfalsat plåt eller TP20 med rätt underlag ger längst livslängd i dessa förhållanden, medan betongpannor kan vara mer utsatta för frostsprängning i det hårda klimatet.",
    },
    primaryKeyword: "takläggare Grisslehamn",
    lat: 60.1,
    lng: 18.8167,
    nearbyLocations: ["Singö", "Väddö", "Arholma"],
  },
  {
    slug: "arholma",
    name: "Arholma",
    region: "Norra skärgården",
    isIsland: true,
    description:
      "Takläggare på Arholma — takbyte och takrenovering. Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    longDescription:
      "Arholma är en av de nordligaste öarna i Stockholms skärgård. Husens ålder och skick varierar mycket mellan fastigheterna på ön, och det är därför vi alltid börjar med en kostnadsfri takkontroll på plats.",
    extraContent:
      "",
    uniqueFAQ: {
      question: "Hur långt i förväg behöver jag boka takbyte på Arholma?",
      answer:
        "Under högsäsong (maj–september) kan det vara fördelaktigt att boka ännu tidigare. Ring oss så ger vi en realistisk tidsplan.",
    },
    primaryKeyword: "takläggare Arholma",
    lat: 59.85,
    lng: 19.15,
    nearbyLocations: ["Singö", "Grisslehamn", "Svartlöga"],
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
    uniqueFAQ: {"question":"När byggdes husen i Rimbo?","answer":"Byggperiod enligt källorna: första stadsplanen under 1920-talet (villor i trädgårdsstadens anda), husen mest från 1970- och 1980-talen enligt hitta.se. Hustyper: småhus och flerbostadshus med relativt jämn fördelning. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun."},
    primaryKeyword: "takläggare Rimbo",
    lat: 59.7469,
    lng: 18.3639,
    nearbyLocations: ["Norrtälje", "Edsbro", "Riala"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Rimbo kan två grannkvarter ha kommit till med ett halvt sekel emellan. Husen från 1970- och 1980-talen är mellan runt 40 och drygt 55 år. På de äldre husen kan taken redan ha lagts om, och då är det inte husets byggår som avgör skicket, utan vad som gjordes senast och hur det gjordes. På hus från 1970- och 1980-talen som inte har fått nytt tak är det underlaget under ytskiktet som brukar bestämma om det räcker med en reparation eller om hela taket bör läggas om. Det syns sällan från marken. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Rimbo och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "hallstavik",
    name: "Hallstavik",
    region: "Norra Roslagen",
    isIsland: false,
    description:
      "Takläggare i Hallstavik — takbyte och takrenovering i norra Roslagen. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Hallstavik i norra Roslagen har en tät villabebyggelse med hus från flera decennier. Husens ålder och skick varierar mycket mellan de olika delarna av orten, och det är därför vi alltid börjar med en kostnadsfri takkontroll på plats. Vi utför takbyten, takomläggningar och takrenoveringar i Hallstavik och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "",
    uniqueFAQ: {
      question: "Vad bedömer ni vid en takkontroll i Hallstavik?",
      answer:
        "Vi går igenom takmaterial, plåtdetaljer, underlagspapp och avvattning och ger dig en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris – kostnadsfritt och utan förpliktelser. Boka en kostnadsfri takkontroll så ger vi en rekommendation för ditt hus.",
    },
    primaryKeyword: "takläggare Hallstavik",
    lat: 60.0522,
    lng: 18.5975,
    nearbyLocations: ["Herräng", "Älmsta", "Väddö"],
  },
  {
    slug: "almsta",
    name: "Älmsta",
    region: "Norra Roslagen",
    isIsland: false,
    description:
      "Takläggare i Älmsta — takbyte, takrenovering och plåttak på Väddölandet. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Älmsta är porten till Väddö och en naturlig knutpunkt i norra Roslagen. Bebyggelsen består av både permanentboenden och fritidshus, och närheten till vatten på båda sidor gör att fukt och saltstänk påverkar taken. Vi utför kompletta takbyten, takomläggningar, plåtarbeten och taktvätt i Älmsta.",
    extraContent:
      "I Älmsta finns det ofta äldre pannplåttak och tegeltak där beslagen runt skorsten och genomföringar rostat. Det är oftast där läckage börjar — inte i själva takytan. Vid varje takkontroll i Älmsta kontrollerar vi beslag, ränndalar och underlagspapp innan vi rekommenderar renovering eller komplett takbyte.",
    uniqueFAQ: {
      question: "Kan ni kombinera takarbete i Älmsta med projekt på Väddö?",
      answer:
        "Hör av dig och berätta var fastigheten ligger, så bokar vi en kostnadsfri takkontroll.",
    },
    primaryKeyword: "takläggare Älmsta",
    lat: 60.0167,
    lng: 18.7,
    nearbyLocations: ["Väddö", "Hallstavik", "Singö"],
  },
  {
    slug: "herrang",
    name: "Herräng",
    region: "Norra Roslagen",
    isIsland: false,
    description:
      "Takläggare i Herräng — takbyte, takrenovering och plåttak i kustnära läge. Fast pris efter kostnadsfri takkontroll.",
    longDescription:
      "Herräng ligger kustnära i norra Roslagen med en blandning av äldre gruvortsbebyggelse, villor och fritidshus. Saltmättad luft och vindexponering gör att billiga plåtkvaliteter och dåliga infästningar inte håller här. Vi väljer material med hög korrosionsklass och förstärkta infästningar vid takbyten i Herräng. Vi utför även takrenovering, plåtarbeten, taktvätt och takmålning — allt med fast pris och 10 års utförandegaranti.",
    extraContent:
      "Många hus i Herräng har eternit- eller pannplåttak från mitten av 1900-talet. Har du eternittak hanterar vi asbestsanering enligt Arbetsmiljöverkets föreskrifter via behörig partner innan nytt tak monteras.",
    uniqueFAQ: {
      question: "Har ni erfarenhet av eternittak i Herräng?",
      answer:
        "Ja. Många hus i Herräng har eternittak som innehåller asbest. Sanering måste utföras av behörig entreprenör enligt Arbetsmiljöverkets föreskrifter — vi samordnar detta via partner och monterar därefter nytt tak. All dokumentation och avfallshantering ingår i offerten.",
    },
    primaryKeyword: "takläggare Herräng",
    lat: 60.1167,
    lng: 18.6667,
    nearbyLocations: ["Hallstavik", "Singö", "Älmsta"],
  },
  {
    slug: "edsbro",
    name: "Edsbro",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takläggare i Edsbro — takbyte, takomläggning och takrenovering på landsbygden i Roslagen. Fast pris.",
    longDescription:
      "Edsbro är en klassisk Roslagsbygd med gårdar, äldre trähus och villor. Här finns många stora takytor — ladugårdar, uthus och huvudbyggnader — där rätt materialval får stor ekonomisk betydelse. Vi utför takbyten och takomläggningar i Edsbro med TP20-plåt, pannplåt, tegelplåt och betongpannor, och hjälper dig räkna på totalkostnaden per kvadratmeter innan du bestämmer dig.",
    extraContent:
      "På lantbruksfastigheter i Edsbro rekommenderar vi ofta TP20-plåt på uthus och ekonomibyggnader, och dubbelfalsat eller tegelprofilerad plåt på huvudbyggnaden där utseendet väger tyngre. Vi kontrollerar alltid takstolarnas skick och snölastkapacitet innan nytt material monteras.",
    uniqueFAQ: {
      question: "Utför ni takbyte på ladugårdar och uthus i Edsbro?",
      answer:
        "Ja, vi lägger tak på både bostadshus, uthus, ladugårdar och garage i Edsbro. Stora takytor i TP20-plåt blir ofta förvånansvärt prisvärda per kvadratmeter. Vi lämnar fast pris efter kostnadsfri takkontroll och kan dela upp projektet i etapper om du vill.",
    },
    primaryKeyword: "takläggare Edsbro",
    lat: 59.8667,
    lng: 18.5,
    nearbyLocations: ["Rimbo", "Norrtälje", "Bergshamra"],
  },
  {
    slug: "riala",
    name: "Riala",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Riala, Länna och Rö söder om Norrtälje, från kyrkbyn Riala till kusten vid Penningby. Kostnadsfri takkontroll.",
    longDescription:
      "Söder och sydväst om Norrtälje ligger de tre socknarna Riala, Länna och Rö, som alla sedan 1971 hör till Norrtälje kommun. Riala är både tätort och kyrkby, med Riala kyrka, en skola och en idrottshall. Enligt Wikipedia räknades orten som småort fram till år 2000, eftersom andelen fritidsbebyggelse var för hög för att den skulle klassas som tätort. Riala socken beskrivs som en kuperad skogsbygd med gott om sjöar och mossar och med odlingsbygd i smala dalgångar, mellan E18 och länsväg 276, med sjön Largen i söder. I sydväst ligger Sättra och Norrsjön, där det enligt Wikipedia finns fritidshusbebyggelse. Sockennamnet nämns första gången i ett medeltida brev från 1228, och kyrkans långhus dateras till slutet av 1200-talet. Länna socken ligger vid kusten, kring Länna kyrksjö, Rialaån och Penningbyån, och omfattar flera öar i den inre skärgården. Här ligger Penningby slott, vars gods är känt sedan 1339. På 1400-talet byggdes en borg på platsen. Slottet eldhärjades 1831 och är byggnadsminne sedan 1980. Rö socken ligger kring Norrtäljeån och sjöarna Rösjön, Sparren, Viren och Angarn, med odlad slättbygd i mitten och skogsbygd runt om. Enligt hitta.se är husen i Riala mest byggda på 1980-talet och husen vid Penningby på 1920- och 1980-talen.",
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
        "Byggperiod enligt källorna: Riala mest från 1980-talet, husen vid Penningby från 1920- och 1980-talet. Hustyper: villor, gårdar och fritidshusbebyggelse. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun.",
    },
    primaryKeyword: "takläggare Riala",
    lat: 59.6167,
    lng: 18.4,
    nearbyLocations: ["Norrtälje", "Åkersberga", "Rimbo"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen från 1980-talet är i dag runt 40 år gamla och husen från 1920-talet runt 100 år. På de äldre husen kan taken redan ha lagts om, och husets ålder säger därför lite om hur taket mår. Det som avgör är vad som finns under ytan i dag: underlagspapp, läkt, plåtdetaljer och hängrännor. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Takläggare i Gräddö — takbyte, plåttak och takrenovering i kustnära läge på Rådmansö. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Gräddö på Rådmansöhalvön är utgångspunkt för många öar i Roslagens skärgård och har en tät bebyggelse av fritidshus och permanentboenden nära vattnet. Här slår salt luft och vind hårt mot tak och plåtdetaljer. Vi utför takbyten, bandtäckning, plåtarbeten och takrenovering i Gräddö med material valt för kustklimat.",
    extraContent:
      "Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.",
    uniqueFAQ: {
      question: "Vilket tak håller längst i kustläget i Gräddö?",
      answer:
        "Dubbelfalsat plåttak (bandtäckning) håller längst i Gräddös kustklimat — 60–80 år är realistiskt eftersom det inte har genomgående infästningar. TP20 med hög korrosionsklass är ett prisvärdare alternativ med lång livslängd.",
    },
    primaryKeyword: "takläggare Gräddö",
    lat: 59.7667,
    lng: 18.9333,
    nearbyLocations: ["Rådmansö", "Norrtälje", "Blidö"],
  },
  {
    slug: "kapellskar",
    name: "Kapellskär",
    region: "Rådmansöhalvön",
    isIsland: false,
    description:
      "Takläggare i Kapellskär — takbyte, plåttak och takrenovering i hårt kustklimat. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Kapellskär ligger längst ut på Rådmansöhalvön med öppet hav och färjetrafik som närmaste grannar. Vindlasten här är bland de högsta i hela Roslagen och taken måste dimensioneras därefter. Vi utför takbyten och takrenoveringar i Kapellskär med förstärkta infästningar, hög korrosionsklass på plåten och noggrant utförda beslag runt alla genomföringar.",
    extraContent:
      "I Kapellskär är det oftast inte takytan som ger upp först, utan nockbeslag, vindskiveplåtar och fästen som lossnar i storm. Vid varje takbyte i Kapellskär ökar vi infästningstätheten i takfot, nock och gavlar utöver standard — en liten merkostnad som förhindrar stora skador.",
    uniqueFAQ: {
      question: "Hur säkrar ni tak mot storm i Kapellskär?",
      answer:
        "Vi ökar infästningstätheten vid takfot, nock och gavelkanter, använder plåt med hög korrosionsklass och monterar förstärkta nock- och vindskivebeslag. Taksäkerhet dimensioneras enligt gällande krav. Allt ingår i vår offert för takbyte i Kapellskär.",
    },
    primaryKeyword: "takläggare Kapellskär",
    lat: 59.7167,
    lng: 19.0667,
    nearbyLocations: ["Rådmansö", "Gräddö", "Norrtälje"],
  },
  {
    slug: "akersberga",
    name: "Åkersberga",
    region: "Österåker",
    isIsland: false,
    description:
      "Takläggare i Åkersberga — takbyte, takomläggning och takrenovering med fast pris. Kostnadsfri takkontroll.",
    longDescription:
      "Åkersberga i Österåkers kommun har vuxit kraftigt och har en stor blandning av villaområden från 60-talet fram till nybyggda hus. Många tak från 70- och 80-talet är nu mogna för omläggning: betongpannor som frostspränger, underlagspapp som torkat sönder och taksäkerhet som inte uppfyller dagens krav. Vi utför takbyten och takomläggningar i Åkersberga med fast pris, byggställning, rivning, ny papp, ny läkt, nytt takmaterial och ny taksäkerhet.",
    extraContent:
      "Plåt ger ett lättare tak än pannor, vilket kan vara en fördel vid omläggning. Vilket material som passar går vi igenom vid takkontrollen.",
    uniqueFAQ: {
      question: "Vad kostar ett takbyte på en villa i Åkersberga?",
      answer:
        "Priset beror på takets storlek, material och underlagets skick, oavsett om du väljer TP20-plåt eller dubbelfalsat. Vi lämnar alltid ett fast pris efter kostnadsfri takkontroll — aldrig innan.",
    },
    primaryKeyword: "takläggare Åkersberga",
    lat: 59.4794,
    lng: 18.3,
    nearbyLocations: ["Ljusterö", "Vaxholm", "Riala"],
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
    uniqueFAQ: {"question":"När byggdes husen i Österskär?","answer":"Byggperiod enligt källorna: trävillor från sekelskiftet, fritidshus 1920–30-tal, villor och kedjehus mest 1970- och 1990-tal. Hustyper: villor och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Österåkers kommun."},
    primaryKeyword: "takläggare Österskär",
    lat: 59.4667,
    lng: 18.35,
    nearbyLocations: ["Åkersberga","Brevik"],
    factBox: [{"label":"Kommun","value":"Österåker"},{"label":"Delområden","value":"Österskär, Sättra, Valhallsvägen, Geijersvägen, Lindholmen"},{"label":"Hustyper","value":"Villor och kedjehus"},{"label":"Byggperiod","value":"Trävillor från sekelskiftet, fritidshus 1920–30-tal, villor och kedjehus mest 1970- och 1990-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 810"}],
    sourceLink: {"label":"Wikipedia: Österskär","url":"https://sv.wikipedia.org/wiki/%C3%96stersk%C3%A4r"},
    parentLocation: {"name":"Österåker","slug":"akersberga"},
    h1Override: "Takläggare i Österskär, Åkersberga",
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Österskär står sekelskiftets trävillor nära fritidshus från 1920- och 30-talen och villor från 1970- till 1990-talet. De äldsta husen är över hundra år gamla, medan de flesta villorna och kedjehusen är runt 30–55 år. Taken kan redan ha lagts om en eller flera gånger, och i omvandlade sommarstugor kan taket ha byggts om eller byggts på vid olika tillfällen. Därför går det inte att säga något generellt om skicket. På de gamla trävillorna är takets form och detaljer en del av husets karaktär, och det är värt att tänka på redan när materialet väljs. Om ett byte av material eller kulör kräver lov eller anmälan avgör Österåkers kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Österskär och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "vallentuna",
    name: "Vallentuna",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takläggare i Vallentuna — takbyte, takomläggning och takrenovering med fast pris. Kostnadsfri takkontroll.",
    longDescription:
      "Vallentuna har en stor villabebyggelse med hus från flera decennier. Betongpannor kan drabbas av frostsprängning och underlagspapp torkar ut och spricker med åren, vilket är exempel på skäl till att ett tak till slut kan behöva bytas eller läggas om. Vi utför kompletta takbyten och takomläggningar i Vallentuna — rivning, ny råspont vid behov, ny papp, ny läkt, nytt takmaterial, ny avvattning och ny taksäkerhet.",
    extraContent:
      "Vallentuna ligger i inlandet med kalla vintrar och betydande snölast. Vi bedömer behovet av snörasskydd över entréer och uteplatser vid takkontrollen, och kontrollerar att takstolar och infästningar klarar lasten innan nytt material monteras.",
    uniqueFAQ: {
      question: "Hur snabbt kan ni börja ett takbyte i Vallentuna?",
      answer:
        "Det beror på säsong och vår aktuella bokningsläge — vi ger dig ett tydligt startdatum i offerten efter takkontrollen, så att du vet vad som gäller innan du beställer. Vi svarar alltid inom 24 timmar på din förfrågan.",
    },
    primaryKeyword: "takläggare Vallentuna",
    lat: 59.5342,
    lng: 18.0778,
    nearbyLocations: ["Rimbo", "Åkersberga", "Norrtälje"],
  },
  {
    slug: "taby",
    name: "Täby",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takläggare i Täby — takbyte, takomläggning, bandtäckning och takrenovering. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Täby har allt från radhusområden och 60-talsvillor till stora fristående hus med komplexa takkonstruktioner. Vi utför takbyten, takomläggningar, bandtäckning och plåtarbeten i Täby med fast pris efter kostnadsfri takkontroll. Vi arbetar enligt AMA-standard, lämnar 10 års utförandegaranti och sköter hela projektet — ställning, rivning, avfall, nytt tak, avvattning och taksäkerhet.",
    extraContent:
      "På tätbebyggda tomter i Täby måste ställning, materialupplag och avfallshantering planeras med hänsyn till grannar och trånga ytor. Det går vi igenom med dig vid takkontrollen, innan arbetet startar. Vi lämnar 10 års utförandegaranti och, för tätskiktet, 30 års garanti genom MATAKI. Processen är densamma för alla jobb i Täby: kostnadsfri takkontroll, fast pris i offerten för hela jobbet — rivning, material, arbete, ställning och bortforsling — utan löpande timpris, och utförande enligt AMA. Som privatperson kan du använda ROT-avdrag på arbetskostnaden, 30 % upp till 50 000 kr per person och år, och vi tar uppdrag i hela Täby med grannkommunerna Vallentuna, Åkersberga och Vaxholm.",
    uniqueFAQ: {
      question: "Hjälper ni med bygglov och grannhänsyn vid takbyte i Täby?",
      answer:
        "Ett vanligt takbyte med samma kulör och material kräver normalt inget bygglov, men byte av taktäckningsmaterial eller kulör kan vara anmälningspliktigt i Täby. Vi vägleder dig och planerar ställning, upplag och avfall så att arbetet stör grannar så lite som möjligt.",
    },
    primaryKeyword: "takläggare Täby",
    lat: 59.4439,
    lng: 18.0686,
    nearbyLocations: ["Vallentuna", "Åkersberga", "Vaxholm"],
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
        "Täby kommun har en riktlinje för Ella gård om att takpannor av lertegel bör användas, för att bevara områdets tidstypiska karaktär, men det är en rekommendation, inte ett krav. Om ett konkret takbyte kräver lov eller anmälan avgör kommunen. Vi tar med riktlinjerna i underlaget när vi tar fram offerten.",
    },
    primaryKeyword: "takläggare Ella gård",
    lat: 59.4447,
    lng: 18.0539,
    nearbyLocations: ["Täby", "Vallentuna", "Åkersberga"],
    h1Override: "Takläggare i Ella gård, Täby",
    extraSections: [{ heading: "Vad det betyder för taket", text: "Den som byter tak i Ella gård behöver ta hänsyn till kulturmiljön. Enligt Täby kommuns råd och riktlinjer för Ella gård bör takpannor av lertegel användas, och större förändringar av husens tidstypiska arkitektur bör undvikas. Det gäller alltså inte bara vilket material som läggs, utan också detaljer som takkupornas plåtinklädnad och hur taket ansluter till fasaden. Om ett konkret takbyte kräver lov eller anmälan avgör kommunen, och det är klokt att kontrollera det innan arbetet planeras. Många av husen byggdes under 1950- och 60-talen. Tak från den tiden kan redan ha lagts om en gång, men där det inte har skett är underlagspapp, läkt och plåtdetaljer ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. Eftersom husen i ett kvarter ofta är likadana och byggda samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Det kan göra planering och logistik enklare, men varje hus får alltid en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris.** Du får en offert med fast pris, där kommunens riktlinjer för Ella gård tas med i underlaget.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Ella gård och funderar på att byta eller lägga om taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Skarpäng är i dag runt 40–50 år gamla. Taken kan redan ha lagts om, men där det inte har skett är det ofta dags att se över underlagspapp, läkt, plåtdetaljer och hängrännor. I ett område med skafttomter och kuperad terräng kan åtkomsten till huset dessutom påverka hur ett takbyte planeras. I grupphusområdena är husen ofta likadana och byggda samtidigt, och då kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten, där kommunens riktlinjer tas med i underlaget om huset ligger i Knäpparen.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Skarpäng och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Viby är i dag runt 40–60 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. I radhus- och kedjehusområdena är husen ofta likadana och byggda samtidigt. Där kan grannar ibland ha nytta av att planera takbyten i samma veva, även om varje hus alltid får en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sollentuna kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Viby och funderar på att byta eller lägga om taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    extraSections: [{ heading: "Vad det betyder för taket", text: "I ett område med hus från 1930-talet till 1990-talet finns ingen typisk takålder. Villorna från 1950- och 60-talen är i dag runt 60–70 år gamla, kedjehusen och radhusen i Tråsättra runt 40–50 år, och husen i Skärgårdsstad runt 30–40 år. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Det enda säkra sättet att veta vad taket behöver är att titta på det på plats. I Tråsättra och Skärgårdsstad, där husen ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Österåkers kommun." }],
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
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen här spänner över ett halvt sekel. De äldsta villorna från 1950- och 60-talen är i dag runt 60–70 år gamla, husen från 1970- och 80-talen runt 40–50 år, och de nyare husen från 2000-talet är i regel betydligt yngre. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I kedjehusområdena, där husen byggdes samtidigt och ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Vallentuna kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Ormsta, Bällsta eller Molnby? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Långbro?","answer":"Byggperiod enligt källorna: villor ca 1899–1903, småstugor 1943–49. Hustyper: villor och småstugor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Långbro",
    lat: 59.276,
    lng: 18.029,
    nearbyLocations: ["Älvsjö","Hägersten","Örby"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Långbro har två tydliga generationer av småhus. Sekelskiftesvillorna är över hundra år gamla, och småstugorna från 1943–49 är i dag runt 75–80 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlag, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Eftersom många småstugor byggdes efter samma typritningar kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Långbro och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Örby?","answer":"Byggperiod enligt källorna: sent 1800-tal–1970-tal. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Örby",
    lat: 59.265,
    lng: 18.045,
    nearbyLocations: ["Älvsjö","Högdalen","Långbro"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Örby spänner husen över nästan ett sekel, och det finns ingen typisk takålder. De äldsta villorna är över hundra år gamla, medan husen från 1960- och 70-talen är runt 50–65 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På de äldsta villorna kan takets form, takfot och detaljer vara en viktig del av husets karaktär, och det är värt att tänka på redan när materialet väljs. Varje hus får en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Örby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "skondal",
    name: "Sköndal",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Sköndal i Söderort, med småstugor från 1940-talet och rad- och kedjehus från 1950- till 1970-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Sköndal är en stadsdel i Söderort, i Farsta stadsdelsområde, som gränsar till bland annat Farsta, Hökarängen, Gubbängen och Skarpnäcks gård. Stadsdelen bildades 1932, men platsen är äldre än så. Det äldsta belägget för namnet är från 1397, då gården skrevs Siondæ, och enligt Wikipedia ändrades namnet till Sköndal under drottning Kristina. De tre gårdarna Stora Sköndal, Skönstavik och Sköndalsbro finns fortfarande kvar vid Drevvikens strand. Perstorpsvägen är en del av den gamla färdvägen mellan Stockholm och Dalarö. Dagens småhusbebyggelse har kommit till i tydliga etapper. Den första stadsplanen fastställdes 1947 och omfattade ett småstugeområde med omkring 160 hus för självbyggeri i stadsdelens västra del, mot Nynäsvägen. Stockholms stads småstugebyrå tillhandahöll typritningar för tre varianter av stugor. Mellan Perstorpsvägen och Sköndalsvägen byggdes en bit in på 1950-talet radhus och flerfamiljshus, ritade av arkitekterna Ancker, Gate och Lindegren. Nästa etapp kom 1960, med radhus mot Stora Sköndal, och några år senare uppfördes 26 terrasserade radhus vid Drevviken. Norra Sköndal, norr om Tyresövägen, fick sin stadsplan 1968. Den föreskrev enligt Wikipedia radhus och kedjehus med garagelängor mellan husen. När Sköndals centrum byggdes 1969 var stadsdelen söder om Tyresövägen i huvudsak färdigbyggd.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Stockholm (Farsta stadsdelsområde)"},{"label":"Delområden","value":"Småstugeområdet i väster, Perstorpsvägen–Sköndalsvägen, norra Sköndal"},{"label":"Hustyper","value":"Småstugor, radhus, kedjehus"},{"label":"Byggperiod","value":"Småstugor från 1947, radhus 1950-tal och 1960, norra Sköndal efter 1968"},{"label":"Ägda småhus (avrundat)","value":"Ca 1 190 (Stockholms stad, Områdesfakta 2025)"}],
    sourceLink: {"label":"Wikipedia: Sköndal","url":"https://sv.wikipedia.org/wiki/Sk%C3%B6ndal"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Sköndal, Stockholm",
    uniqueFAQ: {
      question: "När byggdes husen i Sköndal?",
      answer:
        "Byggperiod enligt källorna: småstugor från 1947, radhus och flerfamiljshus från 1950-talet och 1960, norra Sköndals radhus och kedjehus efter stadsplanen 1968. Hustyper: småstugor, radhus, kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Sköndal",
    lat: 59.2552389,
    lng: 18.1123844,
    nearbyLocations: ["Farsta", "Hökarängen", "Skarpnäck"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småstugorna i västra Sköndal är i dag runt 75–80 år gamla, radhusen från 1950- och 60-talen runt 60–70 år och rad- och kedjehusen i norra Sköndal drygt 50 år. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. På radhus och kedjehus hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. Eftersom husen i en länga ofta är likadana och byggda samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Sköndal och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
        "Byggperiod enligt källorna: ett åttiotal villor på 1920-talet, de flesta villorna självbyggda på 1940- och 1950-talen, radhuslängor i början av 1950-talet, nyare villor efter 1980-talet. Hustyper: villor, småstugor, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Herrängen",
    lat: 59.2734284,
    lng: 17.9645874,
    nearbyLocations: ["Långbro", "Segeltorp", "Snättringe"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Herrängen är en stadsdel med hus i flera åldrar. De självbyggda villorna från 1940- och 1950-talen är i dag runt 70–85 år gamla, medan de villor som har ersatt äldre hus sedan 1980-talet är betydligt yngre. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Eftersom många av villorna byggdes av ägarna själva, och husen sedan har byggts om och till i olika omgångar, kan två grannhus från samma tid ha helt olika förutsättningar. Det är ett skäl till att varje tak behöver bedömas för sig. På radhusen från 1950-talet hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Herrängen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Solhem och Lunda?","answer":"Byggperiod enligt källorna: 1904–07, 1920–30-tal, 1960-tal, 2000-tal. Hustyper: villor, kedjehus, radhus, parhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Solhem och Lunda",
    lat: 59.383,
    lng: 17.898,
    nearbyLocations: ["Spånga","Kälvesta","Tensta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Solhem och Lunda spänner över mer än hundra år. De äldsta trävillorna från Solhems villastad är över hundra år gamla, husen från 1920- och 30-talen runt 90–100 år och husen från 1960-talet runt 60 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På de gamla trävillorna är taket en del av husens karaktär, och det är värt att tänka på när materialet väljs. Varje hus får en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Solhem eller Lunda? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Storängen och Saltsjö-Duvnäs?","answer":"Byggperiod enligt källorna: Storängen från 1904, funkisvillor 1930–40-tal, Duvnäs 1910–20-tal, radhus 1964–67. Hustyper: villor, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Nacka kommun."},
    primaryKeyword: "takläggare Storängen och Saltsjö-Duvnäs",
    lat: 59.311,
    lng: 18.172,
    nearbyLocations: ["Nacka","Saltsjöbaden","Saltsjö-Boo"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Trävillorna från Storängens första år är i dag över hundra år gamla, funkisvillorna runt 80–95 år och radhusen från 1960-talet runt 60 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I ett område som är riksintresse för kulturmiljövården är takets form, material och kulör en viktig del av miljön. Innan ett byte av material eller kulör är det därför extra viktigt att ta reda på vad som gäller. Det avgör Nacka kommun. I radhuslängorna, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Storängen, Lillängen eller Saltsjö-Duvnäs? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Lännersta?","answer":"Byggperiod enligt källorna: tomter styckade till 1937 (925 st), villor främst från 1930-talet och framåt. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Nacka kommun."},
    primaryKeyword: "takläggare Lännersta",
    lat: 59.31,
    lng: 18.24,
    nearbyLocations: ["Nacka","Saltsjö-Boo","Saltsjöbaden"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna i Lännersta är i dag främst mellan 50 och 95 år gamla, och de äldsta sommarvillorna är över hundra år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I omvandlade sommarstugor kan taket ha byggts om eller byggts på vid olika tillfällen. Eftersom stora delar av området har skyddsbestämmelser i detaljplanen är det klokt att ta reda på vad som gäller innan ett byte av material eller kulör. Det avgör Nacka kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Lännersta eller Boo? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Snättringe?","answer":"Byggperiod enligt källorna: villor 1920–30-tal, radhus tidigt 1960-tal, inslag till 2010-tal. Hustyper: mest villor, en del radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun."},
    primaryKeyword: "takläggare Snättringe",
    lat: 59.256,
    lng: 17.958,
    nearbyLocations: ["Huddinge","Segeltorp","Stuvsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna från 1920- och 30-talen är i dag runt 90–100 år gamla, och radhusen i kvarteret Assessorn runt 65 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I kvarteret Assessorn och i kulturmiljön kring Segersminne och Snättringe gård är det klokt att ta reda på vad som gäller innan ett byte av material eller kulör. Det avgör Huddinge kommun. I radhuslängorna, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Snättringe och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Solgård och Sörskogen?","answer":"Byggperiod enligt källorna: Solgård: villastadshus tidigt 1900-tal, Sörskogen: villor/kedjehus 1960-tal + radhus 1970-tal. Hustyper: villor, kedjehus, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun."},
    primaryKeyword: "takläggare Solgård och Sörskogen",
    lat: 59.231,
    lng: 17.99,
    nearbyLocations: ["Huddinge","Fullersta","Stuvsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villastadshusen i Solgård är i dag över hundra år gamla, kedjehusen i Sörskogen runt 60 år och radhusen runt 50 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På villor som ligger på branta tomter kan åtkomsten påverka hur ett takbyte planeras. I kedjehus- och radhusområdena i Sörskogen, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Solgård eller Sörskogen? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Mölna?","answer":"Byggperiod enligt källorna: främst 1950- och 1960-tal, Östra Mölna tidigt 1960-tal. Hustyper: villor, radhus, kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Lidingö stad."},
    primaryKeyword: "takläggare Mölna",
    lat: 59.356,
    lng: 18.172,
    nearbyLocations: ["Lidingö","Sticklinge","Brevik, Käppala och Gåshaga"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna och radhusen i Mölna är i dag främst runt 60–70 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I Östra Mölna radhusområde, som Lidingö stad klassar som kulturhistoriskt omistlig miljö, är det särskilt viktigt att ta reda på vad som gäller innan ett byte av material eller kulör. Det avgör Lidingö stad. Radhusen byggdes samtidigt, och grannar kan ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Mölna eller Östra Mölna? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Sticklinge?","answer":"Byggperiod enligt källorna: Norra Sticklinge efter stadsplanen 1978, Södra Sticklinge tidigt 1990-tal. Hustyper: villor (Södra Sticklinge även parhus och radhus). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Lidingö stad."},
    primaryKeyword: "takläggare Sticklinge",
    lat: 59.372,
    lng: 18.13,
    nearbyLocations: ["Lidingö","Mölna"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta villorna i Norra och Södra Sticklinge är i dag runt 30–45 år gamla, och enligt hitta.se är husen främst byggda på 1980- och 1990-talen. Taken kan redan ha lagts om, men där det inte har skett är det ofta dags att se över underlagspapp, plåtdetaljer och hängrännor. Varje hus får en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Lidingö stad." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Sticklinge? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Viggbyholm?","answer":"Byggperiod enligt källorna: villastad främst 1918–1935, en del 1960-tal. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Viggbyholm",
    lat: 59.446,
    lng: 18.1,
    nearbyLocations: ["Täby","Näsbypark","Vallabrink"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna i Viggbyholm är främst från 1918–1935 och i dag runt 90–105 år gamla, med inslag från 1960-talet och senare. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I en villastad med klassicerande villor och nationalromantiska sportstugor är takets form och detaljer ofta en del av husets karaktär, och det är värt att tänka på redan när materialet väljs. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Viggbyholm och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Vallatorp och Visinge?","answer":"Byggperiod enligt källorna: Vallatorp slutet av 1970-talet, Visinge grupphus 1980-tal, Lövbrunna 2007–2008. Hustyper: radhus, parhus, kedjehus, villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Vallatorp och Visinge",
    lat: 59.48,
    lng: 18.07,
    nearbyLocations: ["Täby","Karlslund","Erikslund"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Grupphusen i Vallatorp är i dag runt 45 år gamla, grupphusen i Visinge runt 40 år och husen i Lövbrunna runt 20 år. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I grupphusområdena, där husen byggdes samtidigt och är likadana, kan grannar ha nytta av att planera takbyten i samma veva. Kommunens råd om enhetlig färgsättning i Vallatorp är bra att ha med sig när materialet väljs. Varje hus får alltid en egen takkontroll och ett eget pris, och om ett byte kräver lov eller anmälan avgör Täby kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Vallatorp, Lövbrunna eller Visinge? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Tegelhagen och Silverdal?","answer":"Byggperiod enligt källorna: Tegelhagen 1970-tal, Silverdal från 2002. Hustyper: kedjehus, parvillor, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sollentuna kommun."},
    primaryKeyword: "takläggare Tegelhagen och Silverdal",
    lat: 59.39,
    lng: 17.99,
    nearbyLocations: ["Sollentuna","Viby","Edsviken","Helenelund"],
    h1Override: "Takläggare i Tegelhagen och Silverdal, Sollentuna",
    extraSections: [{ heading: "Vad det betyder för taket", text: "De två delarna har helt olika ålder. Kedjehusen, parvillorna och radhusen i Tegelhagen är i dag runt 45–55 år gamla, medan husen i Silverdal är byggda från 2002 och framåt och därför betydligt yngre. I Tegelhagen kan taken redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I Silverdal handlar det oftare om att hålla koll på detaljer och avvattning. I kedjehusområdena, där husen byggdes samtidigt och ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sollentuna kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Tegelhagen eller Silverdal? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Ensta?","answer":"Byggperiod enligt källorna: 1940–1960-tal, förtätning 1970-tal. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Ensta",
    lat: 59.4345,
    lng: 18.064,
    nearbyLocations: ["Täby","Näsbypark","Roslags-Näsby"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Ensta är i dag runt 50–85 år gamla. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. På villorna från 1950- och 60-talen är takutsprången och detaljerna en del av husens karaktär, och det är värt att tänka på redan när materialet väljs. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Ensta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Erikslund?","answer":"Byggperiod enligt källorna: 1972–1973. Hustyper: parhus i grupphusområde, över 300 bostäder. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Erikslund",
    lat: 59.455,
    lng: 18.075,
    nearbyLocations: ["Täby","Vallabrink","Gribbylund och Löttingelund"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Erikslund är i dag runt 50 år gamla. Taken kan redan ha lagts om, men där det inte har skett är det ofta dags att se över underlaget och plåtdetaljerna. På hus med flacka tak och utan takfot är övergången mellan tak och vägg, den bockade plåten, en viktig detalj, både för tätheten och för husens enhetliga uttryck. Eftersom husen byggdes samtidigt och är likadana kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. Om ett byte kräver lov eller anmälan avgör Täby kommun, och kommunens riktlinjer om enhetlighet är bra att ha med sig när materialet väljs." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Erikslund och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Gribbylund och Löttingelund?","answer":"Byggperiod enligt källorna: typhus 1970–80-tal, Löttingelund 1970–80-tal. Hustyper: villor (typhus), radhus, kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Gribbylund och Löttingelund",
    lat: 59.457,
    lng: 18.115,
    nearbyLocations: ["Täby","Erikslund","Vallabrink"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Gribbylund och Löttingelund är i dag runt 35–55 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I kedjehus- och radhuskvarteren är husen ofta likadana och byggda samtidigt, och där kan grannar ibland ha nytta av att planera takbyten i samma veva. För kvarteret Kammaren är kommunens råd att behålla originalkulörer, och det är bra att ha med sig när materialet väljs. Varje hus får alltid en egen takkontroll och ett eget pris. Om ett byte kräver lov eller anmälan avgör Täby kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Gribbylund, Myrängen eller Löttingelund? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Karlslund?","answer":"Byggperiod enligt källorna: 1975–1976. Hustyper: parhus och kedjehus i ett och ett halvt plan. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Karlslund",
    lat: 59.493,
    lng: 18.06,
    nearbyLocations: ["Täby","Midgård och Byle","Ella gård"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Parhusen och kedjehusen i Karlslund är i dag runt 50 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. På tak med takkupor är anslutningarna runt kuporna en extra punkt att ha koll på. Eftersom husen byggdes samtidigt och har samma form kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Karlslund eller Täby kyrkby? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Midgård och Byle?","answer":"Byggperiod enligt källorna: Midgård 1972–73, Byle villor 1907–1910-tal och radhus 1974. Hustyper: radhus (Midgård, 231 bostäder), villor, kedjehus, radhus (Byle). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Midgård och Byle",
    lat: 59.4965,
    lng: 18.0555,
    nearbyLocations: ["Täby","Karlslund","Ella gård"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Egnahemsvillorna i Byle är i dag över hundra år gamla, radhusen i Midgård runt 50 år och radhusen i Byle från 1974 lika gamla. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. På de flacka pulpettaken i Midgård är takbandet och anslutningarna viktiga detaljer. I Midgårds radhuslängor, där husen byggdes samtidigt och delar tak med grannen, kan grannar ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Midgård eller Byle? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Roslags-Näsby?","answer":"Byggperiod enligt källorna: villor från tidigt 1900-tal och 1930-tal, hitta.se 1960- och 1970-tal. Hustyper: villor, radhus (samt flerbostadshus). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Roslags-Näsby",
    lat: 59.439,
    lng: 18.059,
    nearbyLocations: ["Täby","Ensta","Näsbypark"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Roslags-Näsby står villor från början av 1900-talet nära hus från 1960- och 70-talen. De äldsta villorna är över hundra år gamla, 1930-talets villor runt 90 år och de yngre husen runt 50–65 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På de äldre villorna från trädgårdsstadens tid kan takets form och detaljer vara en del av husets karaktär, och det är värt att tänka på redan när materialet väljs. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Roslags-Näsby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "nasbypark",
    name: "Näsbypark",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Näsbypark i Täby: villor från 1930-talet, grupphus som Norskogen och kvarteret Hägern. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Näsbypark har vuxit fram kring Näsby slott vid Näsbyviken. Slottet uppfördes efter ritningar av Nicodemus Tessin den äldre och är, med park och alléer, Täbys enda byggnadsminne. Det brann 1897 och köptes 1902 av Carl Robert Lamm, som tillsammans med sin hustru Dora byggde upp det igen. År 1907 bildades Näsby Fastighets AB, som började stycka tomter. Det strandnära området Näsby slottspark planlades först, och enligt Täby kommun var över 200 tomter bebyggda redan 1933. Kommunen beskriver hur Lamm ville bevara parkstrukturen, och de stora tomterna, grönytorna och det slingrande vägnätet med trädkantade huvudgator som Slottsvägen och Centralvägen präglar fortfarande området. Med järnvägen på 1930-talet, Sjökrigsskolan på slottet från 1940-talet och motorvägen på 1950-talet byggdes villabeståndet gradvis ut. En stadsplan från 1953 gjorde Näsbypark till en modern stadsdel med eget centrum, som invigdes 1961. Grupphusområdena är något av ett kännetecken. Enligt kommunens beskrivning har Norskogen 197 bostäder i villor, parhus och radhus från 1957–59, ritade av Gustaf Lettström och tillverkade av Mockfjärdshus, med flacka tak och fasader av finprofilerad aluminiumplåt. De \"engelska radhusen\" är egentligen kedjehus i rött tegel från 1955, ritade av Gunnar Jacobson. Kvarteret Hägern från 1975–76 har kedjehus med branta tak täckta med svarta betongpannor och små takkupor i svartmålad plåt. Kvarteret Tranan från 1998–99 har parhus och enbostadshus med sadeltak av röda betongpannor, och två av husen har tak av svartmålad bandplåt. Längs Näsby allé, närmast Roslagsbanans station med samma namn, ligger villor från 1930- och 1940-talen. Täby kommun beskriver dem som hus i en eller två våningar med fasader i trä, puts eller tegel, placerade långt in på tomterna, och många är välbevarade. Vid Allévägen och Slottsvägen finns enligt kommunen flera bevarade egnahemshus, enkla envåningsvillor i trä, medan tvåvåningsvillor med funkisstilens ljusa fasadputs dominerar vid Slottsvägen och Parkvägen. Slottsvägens norra del har envåningsvillor från samma årtionden, ritade av Valdus Wikén. Längs Centralvägen ligger villor från olika årtionden, där en stadsplan från 1926 styr bebyggelsen så att husen hamnar långt in på tomterna.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Täby"},{"label":"Delområden","value":"Norskogen, Näsbypark östra, västra och södra, Näsby allé, Centralvägen"},{"label":"Hustyper","value":"Villor, kedjehus, radhus, parhus"},{"label":"Byggperiod","value":"Villor 1930–40-tal, grupphus 1955–1976, parhus 1998–99"},{"label":"Tak (belagt per kvarter)","value":"Hägern: svarta betongpannor · Tranan: röda betongpannor (två hus med svartmålad bandplåt) · Norskogen: flacka tak"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 520"}],
    sourceLink: {"label":"Täby kommun: Näsbypark (kulturmiljö, råd och riktlinjer)","url":"https://www.taby.se/huvudsajter/kulturmiljoer/nyfiken-pa-den-plats-du-bor/nasbypark"},
    parentLocation: {"name":"Täby","slug":"taby"},
    h1Override: "Takläggare i Näsbypark, Täby",
    uniqueFAQ: {"question":"När byggdes husen i Näsbypark?","answer":"Byggperiod enligt källorna: Villor 1930–40-tal, grupphus 1955–1976, parhus 1998–99. Hustyper: villor, kedjehus, radhus, parhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Näsbypark",
    lat: 59.4285,
    lng: 18.0965,
    nearbyLocations: ["Täby","Ella gård","Skarpäng","Vallabrink"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Näsbypark spänner över nästan hundra år. Villorna från 1930- och 40-talen är i dag runt 80–95 år gamla, grupphusen från 1955–76 runt 50–70 år och husen i Tranan runt 25 år. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. I grupphusområdena är enhetligheten en viktig del av miljön. För Norskogen finns områdesriktlinjer som syftar till att området ska behålla sin enhetlighet, och för de engelska radhusen är kommunens råd att bevara den enhetliga karaktären och den ursprungliga färgsättningen. För villorna vid Näsby allé, Centralvägen och i Näsbypark södra skriver Täby kommun att befintliga takformer, takmaterial och takfotens utformning bör behållas på husen och väljas även för tillbyggnader. Vid ett takbyte i sådana kvarter är det därför klokt att välja material och kulör i linje med kommunens riktlinjer. Grannar i samma kvarter kan ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. Om ett byte kräver lov eller anmälan avgör Täby kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Näsbypark och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Vallabrink?","answer":"Byggperiod enligt källorna: Främst 1960–70-tal (tomter från 1930-talet). Hustyper: villor och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun."},
    primaryKeyword: "takläggare Vallabrink",
    lat: 59.4555,
    lng: 18.056,
    nearbyLocations: ["Täby","Ella gård","Näsbypark"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Vallabrink är i dag runt 50–65 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. De djupa takutsprången från 1970-talet är en del av husens karaktär, och takfot och vindskivor behöver ses över i samma arbete. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. I kedjehusområdet i Östra Vallabrink är husen byggda samtidigt, och där kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Vallabrink och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Kälvesta?","answer":"Byggperiod enligt källorna: 1966 – mitten av 1970-talet (planlagt 1963–1974). Hustyper: radhus, kedjehus, atriumhus, villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Kälvesta",
    lat: 59.3705,
    lng: 17.848,
    nearbyLocations: ["Hässelby","Vällingby","Spånga"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Kälvesta är i dag runt 50–60 år gamla. Taken kan redan ha lagts om, men där det inte har skett är det ofta dags att se över underlagspapp, läkt, plåtdetaljer och hängrännor. På radhus och kedjehus hänger taken ihop med grannens, och anslutningarna mellan husen behöver då utföras så att de fungerar tillsammans med grannens tak. Eftersom husen i ett kvarter ofta är likadana och byggda samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Kälvesta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Fullersta?","answer":"Byggperiod enligt källorna: Främst 1960–70-tal, villor 1920–30-tal längs Fullerstavägen. Hustyper: villor (samt flerbostadshus i kommundelen). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun."},
    primaryKeyword: "takläggare Fullersta",
    lat: 59.2395,
    lng: 17.975,
    nearbyLocations: ["Huddinge","Stuvsta","Trångsund","Segeltorp"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Fullersta står hus från mycket olika tider nära varandra. Villorna längs Fullerstavägen är i dag runt 90–100 år gamla, medan husen från 1960- och 70-talen är runt 50–65 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På äldre villor kan takets form, takfot och detaljer vara en del av husets karaktär, och det är värt att tänka på redan när materialet väljs. Om huset är k-märkt, eller om ett byte av material eller kulör kräver lov eller anmälan, avgör Huddinge kommun. Det är klokt att ta reda på det innan materialet bestäms. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Fullersta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Brevik, Käppala och Gåshaga?","answer":"Byggperiod enligt källorna: Villor från 1910-talet, i huvudsak 1960-tal och framåt (Brevik), villastad från 1910-talet (Käppala), nya villor och radhus 2000–2020 (Gåshaga). Hustyper: villor, kedjehus, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Lidingö stad."},
    primaryKeyword: "takläggare Brevik, Käppala och Gåshaga",
    lat: 59.352,
    lng: 18.225,
    nearbyLocations: ["Lidingö"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I området står hus från tre olika sekel. Jugendvillorna är i dag över hundra år gamla, villorna från 1960- och 70-talen runt 50–65 år, och husen i Gåshaga från 2000-talet är betydligt yngre. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. På de äldre villorna är takets form, material och detaljer ofta en del av husets karaktär. Om ett hus är byggnadsminne, eller om ett byte av material eller kulör kräver lov eller anmälan, avgör Lidingö stad. Det är klokt att ta reda på det innan materialet väljs. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Brevik, Käppala eller Gåshaga? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Bollstanäs?","answer":"Byggperiod enligt källorna: Främst 1970- och 1980-tal. Hustyper: radhus, kedjehus, villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Upplands Väsby kommun."},
    primaryKeyword: "takläggare Bollstanäs",
    lat: 59.504,
    lng: 17.927,
    nearbyLocations: ["Upplands Väsby","Norrviken"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i Bollstanäs är i dag runt 40–55 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. I radhus- och kedjehusområdena är husen ofta likadana och byggda samtidigt, och taken hänger ihop med grannens. Där kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Upplands Väsby kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Bollstanäs och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Nora och Kevinge?","answer":"Byggperiod enligt källorna: Nora 1920–30-tal (trädgårdsstad från 1926), Kevinge 1950–60-tal, Kevinge strand 1930- och 1980-tal. Hustyper: villor, kedjehus, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Danderyds kommun."},
    primaryKeyword: "takläggare Nora och Kevinge",
    lat: 59.4,
    lng: 18.02,
    nearbyLocations: ["Danderyd","Enebyberg","Stocksund"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i området spänner över sextio år. Villorna i Nora trädgårdsstad är i dag runt 90–100 år gamla, husen i Kevinge runt 60–75 år. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. I en trädgårdsstad från 1920-talet är takens form och material ofta en viktig del av miljön, och det är värt att tänka på redan när materialet väljs. Om ett byte av material eller kulör kräver lov eller anmälan, eller om särskilda bevarandekrav gäller för ditt hus, avgör Danderyds kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Nora, Kevinge eller Klingsta? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
      "Takläggare i Bromma — takbyte och takrenovering i västra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Bromma har en varierad bebyggelse — från 1920-talsvillor i Bromma trädgårdsstad till radhus och 70-talsvillor i Blackeberg och Riksby. På hus av den åldern är det vanligt att taket förr eller senare blir moget för omläggning eller byte. Vi utför takbyten och takomläggningar i Bromma med både plåttak (TP20, dubbelfalsat) och betongpannor, alltid med ny taksäkerhet, fungerande ventilation och avvattning. Vi går igenom priset i förväg, så att offerten blir realistisk för Brommas villaområden.",
    extraContent:
      "På äldre villatak i Bromma kan underlagspappen torka sönder och betongpannor börja frostspränga med åren. I de fallen är omläggning med ny papp, ny läkt och antingen nya pannor eller plåt oftast bäst ekonomi. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    uniqueFAQ: {
      question: "Vad kostar takbyte på en villa i Bromma?",
      answer:
        "Priset för en villa i Bromma beror på takets storlek, material och underlagets skick, oavsett om du väljer TP20-plåt eller dubbelfalsat. Med ROT-avdrag på 30 % av arbetskostnaden. Kontakta oss för kostnadsfri takkontroll och fast pris.",
    },
    primaryKeyword: "takläggare Bromma",
    lat: 59.34,
    lng: 17.9397,
    nearbyLocations: ["Stockholm", "Solna", "Ekerö"],
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
      "Skärholmen och omgivande stadsdelar har en stor andel miljonprogrambebyggelse med stora bostadshus, radhus och centrumanläggningar. Taken är ofta plåttak och papptak från 1960- och 70-talet som nu nått sin livslängd. Vi utför takbyten och takrenoveringar i Skärholmen med material som passar både bostadshus och kommersiella fastigheter — TP20-plåt, bandtäckning och membrantak för flacka ytor. Vi hanterar stora takytor effektivt och kostnadseffektivt.",
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
      "Takläggare i Farsta — takbyte och takrenovering i södra Stockholm. Fast pris, kostnadsfri takkontroll.",
    longDescription:
      "Farsta och stadsdelarna runt Farsta strand har en blandning av 50-talsvillor, 70-talsradhus och nyare bostadsområden. En del av bebyggelsen har tak från den perioden, där betongpannor kan börja frostspränga och underlagspapp torka och spricka med åren. Vi utför takbyten och takomläggningar i Farsta med både plåt och pannor, och lämnar alltid fast pris efter kostnadsfri takkontroll. Vi bedömer behovet av snörasskydd och ser till att taksäkerheten uppfyller svenska krav.",
    extraContent:
      "I Farsta finns det ofta tak där mossbildningen på norrsidan är kraftig, särskilt nära grönområden och vatten. Regelbunden taktvätt kan förlänga takets liv, men när pannorna börjat frostspränga är omläggning bättre ekonomi. Vi ger en ärlig rekommendation vid varje takkontroll.",
    uniqueFAQ: {
      question: "När bör jag byta tak på min villa i Farsta?",
      answer:
        "Tecken på att det är dags: frostsprängda betongpannor, sliten eller torkad underlagspapp, mossa som inte går bort vid tvätt, eller rostiga plåtbeslag. Många tak i Farsta från 60- och 70-talet är nu mogna för byte. Boka en kostnadsfri takkontroll så bedömer vi om omläggning eller komplett byte är bäst.",
    },
    primaryKeyword: "takläggare Farsta",
    lat: 59.2422,
    lng: 18.0919,
    nearbyLocations: ["Stockholm", "Tyresö", "Haninge"],
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
      "Takläggare i Danderyd — takbyte, bandtäckning och takrenovering av exklusiva villatak. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Danderyd har en av regionens mest påkostade villabebyggelse — stora fristående hus med komplexa takfall, brutna tak, torn och kupor. Taken kräver skicklig plåtslagning snarare än standardläggning. Vi utför bandtäckning, plåtarbeten och kompletta takbyten i Danderyd med material som matchar husens nivå — dubbelfalsad plåt, tegelprofilerad plåt och i koppar eller zink när kunden vill ha ett exklusivt uttryck. Hantverket syns på tak som står ut i kvarteret.",
    extraContent:
      "Vid ett takbyte görs plåtdetaljerna runt skorstenar och kupor om. Kostnadsfri takkontroll och fast pris ingår alltid.",
    uniqueFAQ: {
      question: "Vilket takmaterial passar brutna tak i Danderyd?",
      answer:
        "För brutna takfall, torn och kupor i Danderyd rekommenderar vi dubbelfalsad bandtäckning — den formas efter takets geometri och ger bäst täthet. Koppar eller zink ger ett exklusivt, patinerande uttryck. Boka en kostnadsfri takkontroll så rekommenderar vi rätt material för ditt hus.",
    },
    primaryKeyword: "takläggare Danderyd",
    lat: 59.4044,
    lng: 18.0344,
    nearbyLocations: ["Solna", "Täby", "Sundbyberg"],
  },
  {
    slug: "sollentuna",
    name: "Sollentuna",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Sollentuna — takbyte, takomläggning och takrenovering med fast pris. Kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Sollentuna har en varierad bebyggelse — från villor i Edsberg och Tureberg till radhus och bostadsrättsfastigheter. Många tak från 70- och 80-talet är nu mogna för omläggning eller byte. Vi utför takbyten och takomläggningar i Sollentuna med både plåttak och betongpannor, alltid med ny taksäkerhet och fungerande ventilation.",
    extraContent:
      "I Sollentuna finns det ofta villatak med betongpannor där frostsprängning börjat och underlagspapp torkat sönder. I de fallen är omläggning med ny papp, ny läkt och antingen nya pannor eller plåt oftast bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
    uniqueFAQ: {
      question: "Vad kostar takomläggning i Sollentuna?",
      answer:
        "Takomläggning i Sollentuna med ny underlagspapp, ny läkt och nytt takmaterial i plåt eller betongpannor, till ett pris som beror på takets skick. Med ROT-avdrag på 30 % av arbetskostnaden. Kontakta oss för kostnadsfri takkontroll och fast pris.",
    },
    primaryKeyword: "takläggare Sollentuna",
    lat: 59.4289,
    lng: 17.9511,
    nearbyLocations: ["Täby", "Solna", "Upplands Väsby"],
  },
  {
    slug: "lidingo",
    name: "Lidingö",
    region: "Östra Stockholm",
    isIsland: true,
    description:
      "Takläggare på Lidingö — takbyte och takrenovering på en ö nära Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Lidingö är en ö med exklusiv villabebyggelse, strandnära hus och bostadsrättsfastigheter — allt samlar på en ö med broförbindelse men ändå ö-karaktär. Taken utsätts för fukt från omgivande vatten och vind. Vi utför takbyten, bandtäckning och takrenoveringar på Lidingö med material som tål det fuktiga läget. Många hus har komplexa tak med brutna fall och kupor som kräver skicklig plåtslagning.",
    extraContent:
      "På Lidingö har många hus tak med tegelpannor eller plåt från 1920–1950-talet. Vid takbyte bevarar vi husens karaktär med material som matchar originalet — tegelprofilerad plåt för tegelutseende, eller dubbelfalsad plåt i klassiska kulörer. Kostnadsfri takkontroll och fast pris ingår.",
    uniqueFAQ: {
      question: "Ställer Lidingös läge särskilda krav på takmaterial?",
      answer:
        "Lidingö omges av vatten vilket ger fuktigare luft än på fastlandet. Vi rekommenderar material med hög korrosionsklass på plåt och noggrann hantering av ventilation och underlagspapp. Dubbelfalsad plåt och tegelprofilerad plåt är bra val. Boka en kostnadsfri takkontroll så ger vi en rekommendation anpassad för ditt hus och läge.",
    },
    primaryKeyword: "takläggare Lidingö",
    lat: 59.3667,
    lng: 18.1333,
    nearbyLocations: ["Stockholm", "Nacka", "Danderyd"],
  },
  {
    slug: "nacka",
    name: "Nacka",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Nacka — takbyte och takrenovering i östra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Nacka kommun sträcker sig från tät bebyggelse vid Järla och Sicklaö till skogsnära villor i Saltsjöbaden och Älta. Taken varierar från industribyggnaders plåttak till exklusiva villatak i Saltsjöbaden. Vi utför takbyten, takomläggningar och plåtarbeten i hela Nacka kommun med material anpassat för varje stadsdel. Många tak i Älta och Nackanäs är nu 30–40 år och mogna för omläggning.",
    extraContent:
      "I industriområdena vid Sickla lägger vi TP20 och membrantak på flacka ytor.",
    uniqueFAQ: {
      question: "Kan ni byta tak på både villor och industribyggnader i Nacka?",
      answer:
        "Ja, vi utför takbyten på både villor, bostadsrättsfastigheter och kommersiella byggnader i Nacka. Kontakta oss så rekommenderar vi rätt lösning för din fastighet.",
    },
    primaryKeyword: "takläggare Nacka",
    lat: 59.31,
    lng: 18.1639,
    nearbyLocations: ["Stockholm", "Lidingö", "Värmdö"],
  },
  {
    slug: "varmdo",
    name: "Värmdö",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Värmdö — takbyte och takrenovering i Stockholms södra skärgård. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Värmdö är en stor kommun som sträcker sig från tätorten Gustavsberg ut genom södra skärgården till öar som Sandhamn och Möja. Bebyggelsen varierar från villaområden till fritidshus och skärgårdsgårdar. Vi utför takbyten, takomläggningar och plåtarbeten med material valt för skärgårdsklimatet.",
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
      "Tyresö sträcker sig från villabebyggelse i Bollmora till skog- och sjönära hus vid Tyresö slott och ut mot Älvudden. Bebyggelsen är en blandning av äldre villor, 70-talsradhus och nyare bostadsområden. Många tak är nu mogna för omläggning. Vi utför takbyten och takrenoveringar i Tyresö med både plåt och pannor, och lämnar fast pris efter kostnadsfri takkontroll.",
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
      "Haninge kommun omfattar Handen, Vendelsö, Dalarö och skärgårdsöarna ut mot Ornö och Utö. Bebyggelsen är varierad — villaområden, fritidshus och skärgårdsgårdar. Vi anpassar material efter det fuktiga, salta klimatet nära havet.",
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
      "Järfälla har en stor andel miljonprogrambebyggelse och villaområden från 70-talet, med bostadsrättsfastigheter i Jakobsberg och villor i Kallhäll och Stäket. En del av bebyggelsen har tak från den perioden, som med åren blir mogna för byte. Vi utför takbyten och takomläggningar i Järfälla med både plåttak och betongpannor, och hanterar stora takytor effektivt. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Stora takytor monteras effektivt med TP20-plåt. Vi planerar ställning, material och avfall så att boende störas minimalt.",
    uniqueFAQ: {
      question: "Kan ni byta tak på bostadsrättsfastigheter i Järfälla?",
      answer:
        "Ja, vi utför takbyten på bostadsrättsfastigheter och radhus i Järfälla. Vi ger offert anpassad för en bostadsrättsförenings beslutsprocess och planerar arbetet så att boende störas minimalt. Stora ytor monteras effektivt med TP20-plåt. Kontakta oss för offert.",
    },
    primaryKeyword: "takläggare Järfälla",
    lat: 59.4189,
    lng: 17.8342,
    nearbyLocations: ["Sollentuna", "Ekerö", "Upplands Väsby"],
  },
  {
    slug: "huddinge",
    name: "Huddinge",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Huddinge — takbyte och takrenovering söder om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Huddinge har en stor villabebyggelse och bostadsrättsområden i Flemingsberg, Fullregatorp och Stuvsta. Många tak från 60- och 70-talet är nu mogna för omläggning eller byte. Vi utför takbyten, takomläggningar och plåtarbeten i Huddinge med både plåttak och betongpannor.",
    extraContent:
      "I Huddinge finns det ofta villatak med betongpannor där frostsprängning börjat. Omläggning med ny papp, ny läkt och plåt är då oftast bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
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
      "Upplands Väsby har en stor villabebyggelse och bostadsrättsområden från 70- och 80-talet. Många tak är nu 30–40 år gamla med betongpannor som frostspränger och underlagspapp som torkat sönder. Vi utför takbyten, takomläggningar och plåtarbeten i Upplands Väsby med både plåttak och betongpannor, alltid med ny taksäkerhet och fungerande ventilation. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Upplands Väsby finns det ofta villatak där omläggning med ny papp, ny läkt och plåt är bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
    uniqueFAQ: {
      question: "När bör jag byta tak i Upplands Väsby?",
      answer:
        "Tecken på att det är dags: frostsprängda betongpannor, sliten underlagspapp, mossa som inte går bort vid tvätt eller rostiga beslag. Många tak i Upplands Väsby från 70- och 80-talet är nu mogna för byte eller omläggning. Boka en kostnadsfri takkontroll så bedömer vi takets skick.",
    },
    primaryKeyword: "takläggare Upplands Väsby",
    lat: 59.5167,
    lng: 17.9167,
    nearbyLocations: ["Sollentuna", "Sigtuna", "Täby"],
  },
  {
    slug: "nynashamn",
    name: "Nynäshamn",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Nynäshamn — takbyte och takrenovering i kustläge söder om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Nynäshamn ligger längst söderut i Stockholms län med direktkontakt med öppet hav — ett kustläge som sliter hårt på takmaterial med salt, vind och fukt. Bebyggelsen varierar från villor i tätorten till fritidshus ut mot kusten. Vi utför takbyten, takrenoveringar och plåtarbeten i Nynäshamn med material valt för det hårda kustklimatet — korrosionsbeständig plåt och förstärkta infästningar.",
    extraContent:
      "I Nynäshamns exponerade kustläge rekommenderar vi dubbelfalsad plåt eller TP20 med hög korrosionsklass, eftersom saltluften bryter ner billig plåt snabbt. Vi ökar infästningstätheten vid takfot, nock och gavlar utöver standard. Kostnadsfri takkontroll och fast pris ingår alltid.",
    uniqueFAQ: {
      question: "Vilket takmaterial passar kustläget i Nynäshamn?",
      answer:
        "Nynäshamn ligger exponerat mot havet med salt luft och stark vind. Vi rekommenderar dubbelfalsad plåt eller TP20 med hög korrosionsklass och förstärkta infästningar. Betongpannor riskerar frostsprängning i det hårda klimatet. Boka en kostnadsfri takkontroll så ger vi en rekommendation för ditt hus och läge.",
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
    uniqueFAQ: {"question":"När byggdes husen i Hässelby?","answer":"Byggperiod enligt källorna: villor från 1900, radhus/kedjehus 1970-tal (Backlura). Hustyper: villor, radhus, kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Hässelby",
    lat: 59.3764,
    lng: 17.8667,
    nearbyLocations: ["Vällingby","Kälvesta","Bromma"],
    factBox: [{"label":"Kommun","value":"Stockholm (Hässelby-Vällingby)"},{"label":"Delområden","value":"Hässelby villastad, Backlura, Johannelund, Loviselund, Hässelby södra villastad"},{"label":"Hustyper","value":"Villor, radhus, kedjehus"},{"label":"Byggperiod","value":"Villor från 1900, radhus/kedjehus 1970-tal (Backlura)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 4 760 (Områdesfakta 2025)"}],
    sourceLink: {"label":"Wikipedia: Hässelby villastad","url":"https://sv.wikipedia.org/wiki/H%C3%A4sselby_villastad"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Hässelby villastad",
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Hässelby villastad står hus från hela 1900-talet nära varandra. De äldsta villorna är över hundra år gamla, efterkrigstidens villor runt 60–75 år och radhusen och kedjehusen i Backlura runt 50 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. I radhus- och kedjehusområdena, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Hässelby villastad eller Backlura? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "vallingby",
    name: "Vällingby",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Vällingby — takbyte och takrenovering i västra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vällingby växte fram som en av Europas mest uppmärksammade ABC-städer på 1950-talet, med en blandning av centrumanläggning, bostadshus och villabebyggelse. Taken i Vällingby speglar denna period — plåttak och tegeltak från 50- och 60-talet som nu nått sin livslängd. Vi utför takbyten, takomläggningar och plåtarbeten i Vällingby med material valt för den äldre bebyggelsens karaktär. Många tak har betongpannor som frostsprängt och underlagspapp som torkat sönder.",
    extraContent:
      "I Vällingby finns det ofta tak från 50- och 60-talet där omläggning med ny papp, ny läkt och plåt är bäst ekonomi över 30 år. För bostadsrättsfastigheterna runt centrum planerar vi ställning och avfall så att boende störas minimalt. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
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
      "Spånga har en småortskaraktär med ursprunglig bebyggelse från tidigt 1900-tal, blandat med nyare villaområden och radhus. Taken varierar från äldre tegeltak på ursprungliga torp och villor till plåttak på 70-talsbebyggelse. Vi utför takbyten och takrenoveringar i Spånga med material som bevarar småortens karaktär. En del av 70-talsbebyggelsens tak är nu mogna för omläggning.",
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
      "Vendelsö ligger i norra Haninge, öster om Drevviken och söder om Gudöån och Långsjön, som bildar gräns mot Tyresö kommun. Den tidigare kommundelen är i dag uppdelad i Norrby, Vendelsö-Gudö och Vendelsömalm. Enligt Wikipedia gränsar Vendelsö-Gudö mot Norrby i väster, Vendelsömalm i söder och Tyresta nationalpark i öster, och kommundelens centrum ligger vid Sågen. Allt utgår från Vendelsö gård. Namnet är belagt 1460, och 1467 sålde Tyska orden egendomen till Erik Axelsson (Tott). Vendelsö blev säteri före 1610. Huvudbyggnaden, ett timrat envåningshus i karolinsk stil från slutet av 1600-talet, är enligt Wikipedia ett dokumenterat verk av arkitekten Mathias Spihler. Omkring 1908 började Mellersta Sveriges Egnahems AB stycka gårdens ägor för villor och fritidshus. Villaområdet växte fram med affär, skola, handelsträdgårdar, bageri och en telefonstation som öppnade 1909, och 1921 invigdes busslinjen mellan Vendelsö och Enskede. Jordbruket lades ner på 1910-talet. Huvudbyggnaden revs 1984, och 1998 uppfördes ett bostadsområde på platsen, med namn efter gården. Den södra flygeln finns kvar som bygdegård. Norrby, söder om Drevviken, har enligt Wikipedia en småskalig karaktär, med bitvis mycket kuperat landskap, lummighet och gles bebyggelse. Ängspartier finns kvar efter jordbruket vid Östra Täckeråkers gård, och på Norrby gärde står Norrbystenen, en runsten från 1000-talet. Ett planprogram för Norrby antogs 2010, och planarbete för tätare bebyggelse pågår sedan 2017.",
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
        "Byggperiod enligt källorna: avstyckning för villor och fritidshus från omkring 1908, med ett senare bostadsområde vid gården från 1998. Hustyper: villor, med inslag av radhus och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Haninge kommun.",
    },
    primaryKeyword: "takläggare Vendelsö",
    lat: 59.1397,
    lng: 18.2006,
    nearbyLocations: ["Vega", "Haninge", "Tyresö"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Här har det byggts i mer än hundra år, från de första avstyckningarna omkring 1908 till bostadsområdet vid gården från 1998. De äldsta villorna är alltså över hundra år gamla, medan andra hus är byggda långt senare. Taken kan redan ha lagts om, på de äldsta husen flera gånger, och husets ålder säger därför lite om takets skick. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. På kuperade och lummiga tomter, som i Norrby, hamnar löv och barr lätt i hängrännor och ränndalar. Om ett byte av material eller kulör kräver lov eller anmälan avgör Haninge kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "För nyare hus i Vega är TP20-plåt eller dubbelfalsad plåt med hög korrosionsklass ofta bäst — slitstarkt, lågt underhåll och lång livslängd. Valet styrs av takets lutning och exponering. Vi ger en rekommendation anpassad till ditt hus vid kostnadsfri takkontroll.",
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
      "Takläggare i Älvsjö — takbyte och takrenovering i södra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Älvsjö har en blandning av villabebyggelse från tidigt 1900-tal och bostadsrättsfastigheter från miljonprogramtiden. Taken varierar från tegeltak på äldre villor till plåttak på bostadshus. En del av bebyggelsen från miljonprogramtiden har tak som med åren blir mogna för omläggning eller byte. Vi utför takbyten och takrenoveringar i Älvsjö med både plåttak och betongpannor, och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Älvsjö finns det ofta tak där underlagspappen torkat sönder och betongpannor börjat frostspränga — ett typiskt förlopp för tak i denna ålder. Omläggning med ny papp, ny läkt och plåt är då oftast bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
    uniqueFAQ: {
      question: "Vad kostar takbyte på en villa i Älvsjö?",
      answer:
        "Priset för en villa i Älvsjö beror på takets storlek, material och underlag, oavsett om du väljer TP20-plåt eller dubbelfalsat. Med ROT-avdrag på 30 % av arbetskostnaden. Kontakta oss för kostnadsfri takkontroll.",
    },
    primaryKeyword: "takläggare Älvsjö",
    lat: 59.3019,
    lng: 18.0019,
    nearbyLocations: ["Stockholm", "Huddinge", "Enskede"],
  },
  {
    slug: "enskede",
    name: "Enskede",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Gamla Enskede, trädgårdsstaden i Söderort som i huvudsak stod färdig 1913. Kostnadsfri takkontroll.",
    longDescription:
      "Gamla Enskede är en stadsdel och trädgårdsstad i Söderort i Stockholm. Fram till slutet av 1800-talet var området en lantlig del av Brännkyrka socken, med åkermark som hörde till Enskede gård. Stockholms stad köpte gårdens kvarvarande 606 hektar 1904 och planerade marken för egnahem. Stadsplanen från 1907 ritades av Per Olof Hallman, och den 26 juni 1908 togs det första spadtaget. Tanken var enligt Wikipedia att vanliga människor skulle kunna skaffa sig ett hus med två rum och kök, källare och trädgård. Från början skulle stadsdelen till stor del bestå av radhus längs de svängda gatorna, men intresset var svalt, och i Hallmans bearbetade plan från 1922 fanns bara de sex längorna vid Margaretavägen kvar. De byggdes 1908–1909 efter ritningar av Victor Bodin, omfattar 37 fastigheter och är blåmärkta av Stadsmuseet i Stockholm. Enligt Wikipedia stod området i huvudsak färdigt redan 1913 och utgörs främst av parhus och enfamiljshus. På 1930- och 1940-talen byggdes Svampområdet söder om Sockenvägen med småhus, nästan alla ritade av arkitekten Edvin Engström. I östra delen av stadsdelen ligger Dalen, ett bostadsområde med 280 radhus och 20 flerfamiljshus som stod färdigt 1982.",
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
        "Byggperiod enligt källorna: 1908–1913 (i huvudsak färdigt 1913), Svampområdet 1930- till 1940-talet och Dalen färdigt 1982. Hustyper: parhus och enfamiljshus, med radhus vid Margaretavägen och i Dalen. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Enskede",
    lat: 59.2917,
    lng: 18.0867,
    nearbyLocations: ["Stockholm", "Älvsjö", "Skarpnäck"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen i trädgårdsstadens första del är i dag runt 115 år gamla, småhusen i Svampområdet mellan knappt 80 och drygt 90 år och radhusen i Dalen runt 45 år. På hus som har stått i över hundra år kan taken redan ha lagts om, och därför säger husets ålder lite om hur taket mår. Det går bara att avgöra på plats, där underlag, plåtdetaljer, skorstensanslutningar och hängrännor syns. Stadsmuseet har inventerat stadsdelens byggnader och gett nio anläggningar blå märkning och ett stort antal grön märkning. Den som tänker byta material eller kulör på ett sådant hus bör ta reda på vad som gäller innan arbetet planeras. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
    uniqueFAQ: {"question":"När byggdes husen i Skarpnäck?","answer":"Byggperiod enligt källorna: stadsplan 1923, Pungpinan från 1927, radhus 1953–1956 och tidigt 1960-tal, kedjehus 2009. Hustyper: småstugor och småhus, radhus och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Skarpnäck",
    lat: 59.2731,
    lng: 18.1219,
    nearbyLocations: ["Stockholm", "Enskede", "Farsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Här finns småhus från fyra skeden. Husen i trädgårdsstaden och Pungpinan byggdes från 1920-talet och är i dag uppemot 100 år gamla, radhusen vid Riksrådsvägen är runt 70 år, 1960-talets radhus drygt 60 år och kedjehusen från 2009 under 20 år. På de tidigaste husen kan taket ha lagts om mer än en gång, och husets ålder avgör därför inte hur taket mår i dag. På radhus och kedjehus hänger taken ihop med grannens, och ett arbete på en del av längan behöver anslutas så att det fungerar mot nästa. I miljöer som är utpekade som kulturhistoriskt värdefulla är det klokt att ta reda på vad som gäller innan material eller kulör väljs. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Skarpnäcks trädgårdsstad eller Pungpinan och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
      "Botkyrka kommun omfattar Tumba, Tullinge och Fittja, med stor andel miljonprogrambebyggelse och villaområden. Taken är ofta plåttak och papptak från 1960- och 70-talet som nu nått sin livslängd. Vi utför takbyten och takrenoveringar i Botkyrka med material som passar både bostadshus och villor — TP20-plåt, bandtäckning och membrantak för flacka ytor. Vi hanterar stora takytor effektivt.",
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
      "Salem är en liten kommun vid sjön Bornsjön med villabebyggelse i Rönninge och Salem. Taken är ofta villatak med betongpannor eller plåt från 70- och 80-talet, nu mogna för omläggning. Sjönära läge ställer krav på material med god fukttålighet. Vi utför takbyten och takrenoveringar i Salem med material valt för det sjönära klimatet, och lämnar fast pris efter kostnadsfri takkontroll.",
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
      "Upplands-Bro kommun omfattar Kungsängen, Bro och Brunna, med villabebyggelse och bostadsrättsområden i ett sjö- och skogsnära läge. Taken varierar från betongpannor på 70-talsvillor till plåttak på nyare hus. Vi utför takbyten, takomläggningar och plåtarbeten i Upplands-Bro med material valt för det varierade klimatet. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Upplands-Bro finns det ofta villatak där omläggning med ny papp, ny läkt och plåt är bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag. Vi bedömer alltid behovet av snörasskydd över entréer.",
    uniqueFAQ: {
      question: "När bör jag byta tak i Upplands-Bro?",
      answer:
        "Tecken på att det är dags: frostsprängda betongpannor, sliten underlagspapp, mossa som inte går bort vid tvätt eller rostiga plåtbeslag. Många tak i Upplands-Bro från 70-talet är nu mogna för byte eller omläggning. Boka en kostnadsfri takkontroll så bedömer vi takets skick.",
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
      "Vi går igenom förutsättningarna i Hammarby Sjöstad — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Hammarby Sjöstad.",
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
      "Vi går igenom förutsättningarna i Liljeholmen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Liljeholmen.",
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
      "Årsta — klassisk folkhemsstadsdel med stora sammanhängande takytor — har ett fastighetsbestånd med lamellhus från 1940–50-tal och villor i Årsta villastad. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Årsta: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris efter en kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Årsta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Årsta.",
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
        "Byggperiod enligt källorna: villor före 1923 och från 1930 och framåt i västra Hägersten, radhusen vid Hägerstensbrinken och Hägerstens allé 1967–1971. Hustyper: villor och radhus, med inslag av flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Hägersten",
    lat: 59.3006,
    lng: 17.9856,
    nearbyLocations: ["Aspudden", "Liljeholmen", "Skärholmen", "Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna i västra Hägersten är i dag omkring hundra år gamla eller mer, och radhusen vid Hägerstensbrinken är runt 55 år. På så gamla hus kan taken redan ha lagts om, och därför säger husets ålder inte hur taket mår. Det som avgör är när underlagspapp, läkt och plåtdetaljer senast byttes, och det ser man först på plats. På radhusen hänger taken ihop längs längan, och anslutningen mot grannens tak behöver utföras så att den fungerar för båda husen. I en klassad miljö kan också utseendet på ett nytt tak ha betydelse. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Vi går igenom förutsättningarna i Gröndal — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Gröndal.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Gröndal?",
      answer:
        "Priset för ett takbyte i Gröndal beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
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
      "Vi går igenom förutsättningarna i Aspudden — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Aspudden.",
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
    uniqueFAQ: {"question":"När byggdes husen i Häggvik?","answer":"Källorna anger när tomterna styckades (från 1917), inte när varje hus byggdes. Enligt hitta.se är husen mest från 1950- och 1980-talen. Hustyper: villor och flerbostadshus, blandat. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sollentuna kommun."},
    primaryKeyword: "takläggare Häggvik",
    lat: 59.4438,
    lng: 17.9329,
    nearbyLocations: ["Sollentuna", "Helenelund", "Norrviken"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Källorna anger när tomterna styckades, inte när varje hus byggdes. Ett hus som kom till under samhällets första år är i dag omkring hundra år gammalt, medan husen från 1950-talet är runt 70 år och de från 1980-talet runt 40 år. På de äldre husen kan taken redan ha lagts om, kanske mer än en gång, och husets ålder säger därför lite om takets skick. Det som spelar roll är vad som gjordes senast och hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. På ett hus från 1980-talet som har kvar sitt första tak är det i regel genomföringar, ränndalar och plåtanslutningar som behöver ses över först. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sollentuna kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Häggvik och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "helenelund",
    name: "Helenelund",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Helenelund — takbyte och takrenovering i Helenelund. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi lägger tak i Helenelund, pendlingsnära del av Sollentuna, där villor och radhus från 1960–70-tal dominerar. Äldre tak i området har ofta samma problem under pannorna: sliten papp, uttorkade tätningar och beslag som börjat rosta. Vi byter det som behöver bytas, säkerställer rätt ventilation och lämnar 10 års utförandegaranti på arbetet.",
    extraContent:
      "Vi går igenom förutsättningarna i Helenelund — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Helenelund.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Helenelund?",
      answer:
        "Priset för ett takbyte i Helenelund beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Helenelund",
    lat: 59.4053,
    lng: 17.9506,
    nearbyLocations: ["Sollentuna", "Kista", "Häggvik"],
  },
  {
    slug: "edsberg",
    name: "Edsberg",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Edsberg — takbyte och takrenovering i Edsberg. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Edsberg — villa- och flerfamiljsområde vid Edsviken — har ett fastighetsbestånd med 1970-talsbebyggelse med flacka tak och äldre villor. Taken börjar närma sig slutet av sin livslängd, och då är omläggning oftast bättre ekonomi än lappning. RoslagsTak utför kompletta takprojekt i Edsberg: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Edsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Edsberg.",
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
      "Takläggare i Rotebro — takbyte och takrenovering i Rotebro. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Rotebro är norra delen av Sollentuna kommun. Bebyggelsen består till stor del av villaområden och radhuslängor med betongpannor. Vi utför takbyte, takrenovering och takomläggning i Rotebro med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll och ett fast pris. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Rotebro — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Rotebro.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Rotebro?",
      answer:
        "Priset för ett takbyte i Rotebro beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Rotebro",
    lat: 59.4772,
    lng: 17.9236,
    nearbyLocations: ["Norrviken", "Upplands Väsby", "Sollentuna"],
  },
  {
    slug: "norrviken",
    name: "Norrviken",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Norrviken — takbyte och takrenovering i Norrviken. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Vi tar uppdrag för takbyte och takrenovering i Norrviken (sjönära villaområde i Sollentuna). Här handlar det oftast om äldre villor med tegel- och plåttak, och vi anpassar material, infästning och plåtdetaljer efter husets ålder och läge. Efter takkontrollen får du ett fast pris och besked om vad som ingår.",
    extraContent:
      "Vi går igenom förutsättningarna i Norrviken — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Norrviken.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Norrviken?",
      answer:
        "Priset för ett takbyte i Norrviken beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
    },
    primaryKeyword: "takläggare Norrviken",
    lat: 59.4586,
    lng: 17.9231,
    nearbyLocations: ["Rotebro", "Edsberg", "Sollentuna"],
  },
  {
    slug: "stocksund",
    name: "Stocksund",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Stocksund i Danderyd, en villastad från 1890-talet med sekelskiftesvillor. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Stocksund är en kommundel i Danderyds kommun, vid Lilla Värtan och Stocksundets norra strand. Platsen har gamla anor. Stockby gård har enligt Wikipedia sannolikt rötter i slutet av 1200-talet, och namnet Stockby förekommer första gången i en offentlig handling 1361. Den nuvarande gårdsbyggnaden uppfördes 1740. Villasamhället växte fram i slutet av 1800-talet. År 1888 grundades Stockby AB, som köpte gårdens egendom och styckade av den till tomter under namnet Stocksunds Villaparker. Den första tomten såldes 1890. Enligt Wikipedia växte samhället relativt långsamt de första åren: vid slutet av 1905 fanns 95 villor, och 1910 hade bolaget sålt sammanlagt 350 villatomter. Samma år stod Stocksunds vattentorn färdigt, ritat av arkitekten David Lundegårdh. I Mörbyområdet, öster om Roslagsbanan, byggdes ett villasamhälle avsett för statstjänstemän, och där hade 94 villor uppförts 1917. På Långängen byggdes de första villorna redan på 1880-talet, och när lantbruket där upphörde 1932 fanns ett hundratal villor. Sikreno och Inverness blev en del av Stocksunds köping 1942. Bebyggelsen domineras fortfarande av villor. I det kuperade området kring Alpstigen, Donnerstigen, Bergstigen och Sturevägen ligger enligt Wikipedia flera av gamla Stocksunds villor från tiden runt sekelskiftet 1900, som kommunen har klassat som värdefulla eller omistliga. Kommunen betraktar området som särskilt värdefullt från kulturhistorisk synpunkt, och det är av riksintresse enligt Wikipedia. Villor med torn är ett återkommande inslag, och Villa Tallom på Långängen, uppförd 1904–1906, är byggnadsminne sedan 1979.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Danderyd"},{"label":"Delområden","value":"Gamla Stocksund, Mörby villaområde, Långängen, Inverness, Sikreno"},{"label":"Hustyper","value":"Villor"},{"label":"Byggperiod","value":"Från 1890, utbyggnad under 1900-talet"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 190"}],
    sourceLink: {"label":"Wikipedia: Stocksund","url":"https://sv.wikipedia.org/wiki/Stocksund"},
    parentLocation: {"name":"Danderyd","slug":"danderyd"},
    h1Override: "Takläggare i Stocksund, Danderyd",
    uniqueFAQ: {
      question: "När byggdes husen i Stocksund?",
      answer:
        "Byggperiod enligt källorna: från 1890, med utbyggnad under hela 1900-talet. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Danderyds kommun.",
    },
    primaryKeyword: "takläggare Stocksund",
    lat: 59.3845769,
    lng: 18.0571915,
    nearbyLocations: ["Danderyd", "Djursholm", "Enebyberg"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen i Stocksund är byggda under lång tid, från 1890-talet och framåt, och många av villorna är i dag över hundra år gamla. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. På äldre villor med torn, kupor och många vinklar finns fler anslutningar än på ett enkelt sadeltak, och det är i ränndalar, kring skorstenar och vid plåtdetaljer som ett tak oftast prövas. I ett område som kommunen bedömer som kulturhistoriskt värdefullt är det klokt att tänka på material och kulör tidigt. Om ett byte av material eller kulör kräver lov eller anmälan avgör Danderyds kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Stocksund och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "djursholm",
    name: "Djursholm",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Djursholms villastad, med villor från 1890-talet och framåt. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Djursholm anlades som villastad 1889. Egendomen är känd sedan medeltiden, och namnet nämns första gången 1432. Villastaden kom till på initiativ av bankdirektören Henrik Palme. Enligt Wikipedia köpte det nybildade Djursholms AB den 1 600 hektar stora egendomen i juni 1889, och arbetet med att bygga upp villastaden började omedelbart. Redan i oktober samma år hade bolaget sålt 58 tomter. Palme beskrev i sitt prospekt 1889 hur villorna borde läggas på sluttningarna av kullarna, med fri utsikt och skydd av de parkträd som redan fanns. Bolaget ansvarade för vägar, vatten och avlopp, gatubelysning och den smalspåriga järnvägen Djursholmsbanan, och 1890 anlades Djursholms vattentorn. Det höglänta, kuperade området sydöst om slottet var ett av de första som bebyggdes, och många av villorna där är uppförda på 1890-talet och under 1900-talets första decennium. I Ekeby började marken exploateras år 1900, och området norr om Germaniaviken bebyggdes till största delen under 1900-talets första årtionden. Den första egentliga stadsplanen togs fram från 1907 av Per Olof Hallman. Enligt Wikipedia präglas den äldre bebyggelsen av en blandning av stilar, eftersom de flesta villorna uppfördes var för sig, oberoende av grannhusen. Tomterna är i allmänhet stora, och här finns allt från det första årets enkla trävillor till nationalromantik och jugend. Villan på Germaniavägen 21, från 1889, beskrivs som det bäst bevarade exemplet på det första årets villaproduktion. I andra delar av Djursholm finns 1920-talsklassicism, funkis och grupphus från andra halvan av 1900-talet.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Danderyd"},{"label":"Delområden","value":"Villastaden, Djursholms Ekeby, Germania"},{"label":"Hustyper","value":"Villor"},{"label":"Byggperiod","value":"1890-tal–1910-tal, senare inslag"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 080"}],
    sourceLink: {"label":"Wikipedia: Djursholm","url":"https://sv.wikipedia.org/wiki/Djursholm"},
    parentLocation: {"name":"Danderyd","slug":"danderyd"},
    h1Override: "Takläggare i Djursholm, Danderyd",
    uniqueFAQ: {
      question: "När byggdes husen i Djursholm?",
      answer:
        "Byggperiod enligt källorna: 1890-tal till 1910-tal, med senare inslag av 1920-talsklassicism, funkis och grupphus. Hustyper: villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Danderyds kommun.",
    },
    primaryKeyword: "takläggare Djursholm",
    lat: 59.3973535,
    lng: 18.0880625,
    nearbyLocations: ["Stocksund", "Danderyd", "Enebyberg"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Många av villorna i södra Djursholm är i dag mer än hundra år gamla. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Stora villor med torn, kupor, burspråk och flera takfall har många anslutningar, och det är där arbetet med plåtdetaljer, ränndalar och skorstensbeslag avgör hur tätt taket blir. Eftersom husen är byggda var för sig, i olika stilar, finns det sällan en lösning som passar hela kvarteret. I ett område med äldre, arkitektritade villor är det klokt att tänka på material och kulör tidigt. Om ett byte av material eller kulör kräver lov eller anmälan avgör Danderyds kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Djursholm och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "enebyberg",
    name: "Enebyberg",
    region: "Norra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Enebyberg: villor från 1900-talets första hälft och kedjehus från 1970-talet vid Eneby gård. Kostnadsfri takkontroll.",
    longDescription: "Enebyberg är ett villasamhälle som enligt beskrivningar av kommundelen till stor del präglas av bebyggelse från 1900-talets första hälft. Historien som villastad börjar 1906, när ägaren av Enebybergs gård började stycka av mark i anslutning till det som i dag är Roslagsbanan. Året därpå bildades AB Enebybergs villastad och tomtförsäljningen kom igång. 1914 var bebyggelsen så omfattande att Enebyberg blev municipalsamhälle. Stadsplanen från 1923 omfattade omkring 550 tomter. Villorna byggdes först i de östra delarna längs järnvägen, och på 1930-talet växte samhället väster om Breda vägen. Under 1940-talet var enligt uppgifterna alla tomter bebyggda. Ny mark togs i anspråk först i slutet av 1960-talet, och under 1970-talet tillkom rad- och kedjehusområden i västra Enebyberg, bland annat kedjehusen vid Eneby gård. Namnet går tillbaka på Enebybergs gård, vars huvudbyggnad uppfördes på 1770-talet. Gården stod länge övergiven och var rivningshotad, men 1975 beslutade kommunen att den skulle restaureras. Den ligger i västra Enebyberg, intill Rinkebyskogen. Det ger Enebyberg två tydliga generationer av hus: den tidiga villastaden i öster, där mycket av 1900-talets villaarkitektur finns kvar, och rad- och kedjehusen från 1960- och 70-talen i väster.",
    extraContent: "Olika tak, olika frågor: I den äldre villastaden har taken i regel bytts eller lagts om, ibland flera gånger, och skicket skiljer sig mycket mellan husen. Äldre villor kan ha brantare takfall, takkupor, skorstenar och plåtdetaljer som behöver hanteras med omsorg för att husets karaktär ska finnas kvar efter ett byte. Kedjehusen och radhusen från 1960- och 70-talen är i dag runt femtio år gamla. Där taket inte har lagts om är underlagspapp, läkt och plåtdetaljer ofta i den ålder där det är dags att se över dem. Eftersom husen i ett kedjehusområde oftast är likadana och byggdes samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå en egen takkontroll och ett eget pris. Om ett takbyte kräver lov eller anmälan, till exempel vid byte av material eller kulör, avgör Danderyds kommun.",
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
    uniqueFAQ: {"question":"När byggdes husen i Jakobsberg?","answer":"Byggperiod enligt källorna: Tomter styckade 1920–30-tal (kommunen), hus främst 1950–70-tal (hitta.se). Hustyper: villor, kedjehus, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun."},
    primaryKeyword: "takläggare Jakobsberg",
    lat: 59.4231,
    lng: 17.8342,
    nearbyLocations: ["Järfälla","Barkarby och Skälby","Viksjö","Kallhäll"],
    factBox: [{"label":"Kommun","value":"Järfälla"},{"label":"Delområde","value":"Villaområdena väster om Jakobsbergs centrum (Alpvägen, Folkhögskolevägen, Aprilvägen–Decembervägen, Mälarvägen)"},{"label":"Hustyper","value":"Villor, kedjehus, radhus"},{"label":"Byggperiod","value":"Tomter styckade 1920–30-tal (kommunen), hus främst 1950–70-tal (hitta.se)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 100"}],
    sourceLink: {"label":"Järfälla kommun: Järfällas historia","url":"https://www.jarfalla.se/kommunochpolitik/kommunarkivet/jarfallashistoria.4.49c72f5418de88c69e928ab.html"},
    parentLocation: {"name":"Järfälla","slug":"jarfalla"},
    h1Override: "Takläggare i Jakobsberg, Järfälla",
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta husen i västra Jakobsberg är i dag runt 50–75 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. På gator där kedjehus och radhus byggdes samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i västra Jakobsberg? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "barkarby",
    name: "Barkarby och Skälby",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i villaområdena Barkarby och Skälby i Järfälla, med hus främst från 1950- och 1960-talen. Kostnadsfri takkontroll och fast pris.",
    longDescription:
      "Barkarby och Skälby bildar tillsammans kommundelen Barkarby-Skälby i södra Järfälla. Bygden har lång historia. Enligt Wikipedia visar boplatslämningar, gravfält och en medeltida bytomt i Barkarby hur människor har levt här från omkring 800 f.Kr. Barkarby nämns i jordeböckerna första gången 1538, och Skälby gård, som har gett Skälby dess namn, har funnits sedan 1500-talet, med stavningar som Skelby och Skelleby i jordeböckerna från 1535. Gårdens nuvarande huvudbyggnad byggdes 1802. Villabebyggelsen har sin början i 1900-talets första år. Barkarby hemman och den intilliggande kyrkbyn köptes 1901 av Birger Svenonius, som planerade en omfattande villabebyggelse. Enligt Wikipedia blev bara en mindre del av villorna byggda, och huvuddelen av marken överläts på Barkarby villastads AB. Skälby gård köptes 1921 av AB Hem på Landet, som enligt Järfälla kommun styckade 680 tomter för både villor och trädgårdsbruk, och vid början av 1930-talet hade enligt kommunen ett hundratal villor byggts kring Skälby station. Skälby fick en egen poststation 1932. Skälby hade från slutet av 1800-talet fram till 1956 en egen hållplats på Lövstabanan, järnvägen mellan Spånga och Lövsta. I dag beskrivs Skälby som ett villaområde, och villaområdet Barkarby gränsar direkt till det. Många av gatorna i Skälby har namn med anknytning till rymden, som Plutovägen. Sydväst om pendeltågsstationen ligger radhusområdet Vålberga. Enligt hitta.se är husen kring Almvägen, Bancovägen, Brasvägen och Barsbrovägen främst byggda på 1950- och 1960-talen, med enstaka hus från 2000- och 2010-talen. På det gamla flygfältet intill växer Barkarbystaden fram, med helt ny bebyggelse.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Järfälla"},{"label":"Delområden","value":"Björkeby, Barsbro, östra Skälby, Vålberga"},{"label":"Hustyper","value":"Villor, inslag av kedjehus och radhus"},{"label":"Byggperiod","value":"Främst 1950- och 1960-tal, enstaka 2000–2010-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 100"}],
    sourceLink: {"label":"Wikipedia: Barkarby","url":"https://sv.wikipedia.org/wiki/Barkarby"},
    parentLocation: {"name":"Järfälla","slug":"jarfalla"},
    h1Override: "Takläggare i Barkarby och Skälby, Järfälla",
    uniqueFAQ: {
      question: "När byggdes husen i Barkarby och Skälby?",
      answer:
        "Byggperiod enligt källorna: främst 1950- och 1960-tal, enstaka hus från 2000- och 2010-talen. Hustyper: villor, inslag av kedjehus och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun.",
    },
    primaryKeyword: "takläggare Barkarby och Skälby",
    lat: 59.4051955,
    lng: 17.8643513,
    nearbyLocations: ["Jakobsberg", "Viksjö", "Kälvesta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta villorna i de äldre delarna av Barkarby och Skälby är i dag runt 60–75 år gamla. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Det här är ett villaområde som har byggts om och kompletterats under lång tid, och två grannhus kan därför ha tak i helt olika ålder och material. På radhusen i Vålberga hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Barkarby eller Skälby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "kallhall",
    name: "Kallhäll",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Kallhälls villastad (Björkliden) i Järfälla, där egnahemstomter började styckas av 1912. Kostnadsfri takkontroll.",
    longDescription:
      "Kallhälls villastad, som också kallas Björkliden, är ett bostadsområde i kommundelen Kallhäll-Stäket i Järfälla. Det ligger på östra sidan av E18, och enligt Wikipedia finns 210 villor här. Området hörde länge till Sollentuna. Marken låg under Viby gård, och torpet Rännarskede såldes 1905 till AB Hem på landet, som sålde det vidare året därpå. År 1912 började tomter för egnahem styckas av. Järfälla kommun beskriver i sin kulturmiljöplan varför det blev just här: Bolinders, som hade sin fabrik i Kallhäll, upplät ingen mark åt anställda som ville bygga eget, och därför sökte sig arbetarna över gränsen till Björkliden. Wikipedia skriver att de byggde enkla trävillor. Av samma skäl hamnade missionshuset och Folkets hus utanför bolagets mark. Folkets Husföreningen byggde 1912 om en stuga i Grantorp till samlingslokal och uppförde 1936–1937 ett nytt hus vid Blomstervägen i funktionalistisk stil. Först den 1 januari 1955 fördes Björkliden över till Järfälla, och då bodde 295 personer här. Enligt kommunen var tomterna från början stora, 1 500–2 000 kvadratmeter, men flera har styckats sedan dess. Bostadshusen står mitt på tomterna och är av egnahemstyp med enkel utformning, för det mesta i en våning med källare och inredd vind. Fasaderna har i regel träpanel i ljusa kulörer, och falurött förekommer. Vägarna är smala och saknar trottoarer. Enligt Järfälla kommuns kulturmiljöplan har de äldsta egnahemmen sadeltak, ofta brutna och med brant fall, och det vanligaste takmaterialet är rött lertegel. Kommunen konstaterar att många egnahem har byggts om och att nyare hus har tillkommit mellan de äldre, men att karaktären med mindre villor på lummiga trädgårdstomter fortfarande är tydlig.",
    extraContent:
      "",
    factBox: [{"label":"Kommun","value":"Järfälla (kommundelen Kallhäll-Stäket)"},{"label":"Delområden","value":"Kallhälls villastad (Björkliden)"},{"label":"Hustyper","value":"Egnahem och mindre villor, senare kompletteringsbebyggelse"},{"label":"Byggperiod","value":"Tomter styckades av från 1912, senare hus på avstyckade tomter"},{"label":"Antal villor","value":"210 enligt Wikipedia"}],
    sourceLink: {"label":"Järfälla kommun: Kulturmiljöplan för Järfälla, Kallhäll (Björkliden)","url":"https://www.jarfalla.se/download/18.68e7a727168e12dd179a407f/1550245859848/kulturmiljoplan-kallhall.pdf"},
    parentLocation: {"name":"Järfälla","slug":"jarfalla"},
    h1Override: "Takläggare i Kallhälls villastad, Järfälla",
    uniqueFAQ: {"question":"När byggdes husen i Kallhälls villastad?","answer":"Byggperiod enligt källorna: tomter styckades av från 1912, senare hus på avstyckade tomter utan angivna årtal. Hustyper: egnahem och mindre villor, med senare kompletteringsbebyggelse. Enligt Järfälla kommuns kulturmiljöplan har de äldsta egnahemmen sadeltak, ofta brutna och med brant fall, och det vanligaste takmaterialet är rött lertegel. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun."},
    primaryKeyword: "takläggare Kallhäll",
    lat: 59.4660,
    lng: 17.8290,
    nearbyLocations: ["Jakobsberg", "Bro", "Järfälla"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Egnahemmen från de första åren efter 1912 är i dag över 110 år gamla, och husen som har tillkommit på avstyckade tomter är yngre än så. På hus i den åldern kan taken redan ha lagts om, kanske flera gånger, och husets ålder säger därför inget säkert om takets skick. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. Har ett hus byggts till möts tak från olika tider, och skarven mellan dem behöver ses över särskilt. Där en vind har inretts sitter ofta takfönster eller kupor, och anslutningarna runt dem hör till det som kontrolleras först. Kommunens kulturmiljöplan föreslår utökad rådgivning vid bygglov i Björkliden, för att traditionella material och färger ska behållas. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Kallhälls villastad och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Viksjö?","answer":"Byggperiod enligt källorna: Högby 1969–70, Råstensvägen 1970–71, Arealvägen m.fl. 1972, Avstyckningsvägen 1972–73, Skulpturvägen slutet av 1970-talet, Sandvik tidigt 1980-tal. Hustyper: kedjehus, radhus, villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun."},
    primaryKeyword: "takläggare Viksjö",
    lat: 59.4192,
    lng: 17.8006,
    nearbyLocations: ["Järfälla","Jakobsberg","Kallhäll"],
    factBox: [{"label":"Kommun","value":"Järfälla"},{"label":"Delområden","value":"Högby, Råstensvägen, Lantmäterivägens förlängning, Avstyckningsvägen, Skulpturvägen, Sandvik, Tallen"},{"label":"Hustyper","value":"Kedjehus, radhus, villor"},{"label":"Byggperiod","value":"Högby 1969–70, Råstensvägen 1970–71, Arealvägen m.fl. 1972, Avstyckningsvägen 1972–73, Skulpturvägen slutet av 1970-talet, Sandvik tidigt 1980-tal"},{"label":"Tak (belagt)","value":"Högby: flacka tegeltäckta sadeltak (samma typ som Andeboda)"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 700"}],
    sourceLink: {"label":"Wikipedia: Viksjö, Järfälla kommun","url":"https://sv.wikipedia.org/wiki/Viksj%C3%B6,_J%C3%A4rf%C3%A4lla_kommun"},
    parentLocation: {"name":"Järfälla","slug":"jarfalla"},
    h1Override: "Takläggare i norra och västra Viksjö, Järfälla",
    extraSections: [{ heading: "Vad det betyder för taket", text: "Radhusen i Högby och kedjehusen vid Råstensvägen och Arealvägen är i dag runt 50–55 år gamla, villorna vid Skulpturvägen runt 45 år och husen i Sandvik runt 40–45 år. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. På souterrängvillorna i sluttning kan åtkomsten påverka hur ett takbyte planeras. I radhuslängorna och kedjehusområdena, där husen byggdes samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i norra eller västra Viksjö? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
      "Vi går igenom förutsättningarna i Bro — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Bro.",
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
      "Kungsängen är centralort i Upplands-Bro kommun. Socknen och kyrkan har hetat Näs sedan medeltiden, efter Lennartsnäshalvön, och Kungsängens kyrka har delar från 1200-talet. Namnet Kungsängen kom med järnvägen. När Stockholm-Västerås-Bergslagens Järnväg öppnade 1876 drogs linjen genom obebyggd mark, och stationen hamnade omkring två kilometer sydost om den dåvarande ortskärnan vid Tibble gård. Den nuvarande idrottsplatsen hade enligt Wikipedia varit en kungsäng sedan slutet av 1500-talet. Ny bebyggelse växte upp kring stationen och vid stranden nedanför, och 1903 anlades Ryds gjuteri vid stranden öster om stationen. Kring Prästhagsvägen ligger enligt Wikipedia flera exempel på villor från 1910-talet, som församlingens komminister lät bygga på prästgårdens mark. Under 1920-talet började det som i dag är Kungsängens centrum att bebyggas, och en av de första villorna där var Villa Skoga. År 1952 bodde 270 personer i Kungsängen. Sedan gick det fort: en stor del av villorna och höghusen uppfördes under 1950- och 1960-talen. Wikipedia nämner Rankhusvägen som ett välbevarat exempel på tidens enplansvillor och Ekhammarsvägen som ett exempel på kedjehus. De sju punkthusen på Kungshöjden byggdes 1965, och villorna vid västra delen av Strandvägen ritades av Rolf Thies och uppfördes 1967. Pendeltågen började gå hit 1968, och under 1980-talet kompletterades bebyggelsen kring stationen och torget.",
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
        "Byggperiod enligt källorna: villor från 1910-talet, centrum från 1920-talet, huvuddelen av villorna och höghusen från 1950- och 1960-talet, Strandvägens villor 1967, och komplettering under 1980-talet. Hustyper: villor, enplansvillor, kedjehus och punkthus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Upplands-Bro kommun.",
    },
    primaryKeyword: "takläggare Kungsängen",
    lat: 59.4783,
    lng: 17.7472,
    nearbyLocations: ["Bro", "Upplands-Bro", "Kallhäll"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna vid Prästhagsvägen är i dag runt 110 år gamla, och enplansvillorna och kedjehusen från 1950- och 1960-talen mellan 60 och 75 år. Villorna vid Strandvägen närmar sig 60. Taken kan redan ha lagts om, och husets ålder säger därför inget säkert om takets skick. Där taket inte har bytts på länge är det underlagspapp, läkt, plåtdetaljer och hängrännor som behöver ses över först. På kedjehus möter taket grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. Om ett byte av material eller kulör kräver lov eller anmälan avgör Upplands-Bro kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Vi går igenom förutsättningarna i Märsta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Märsta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Märsta?",
      answer:
        "Priset för ett takbyte i Märsta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
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
      "Blackeberg — funkisstadsdel i västra Bromma — har ett fastighetsbestånd med smalhus från 1950-talet och villor. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Blackeberg: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris efter en kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Blackeberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Blackeberg.",
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
      "Nockeby är en stadsdel i Västerort i Stockholm och hör till Bromma trädgårdsstad, tillsammans med bland annat Höglandet, Ålsten och Smedslätten. Spårvagnen på Nockebybanan går hit från Alvik, och hållplatsen Nockeby är banans slutpunkt. Namnet nämns första gången år 1400, som Nokkaby. Ur den byn växte säteriet Åkeshov fram under 1600-talet. Stockholms stad köpte Åkeshov 1904, och 1932 fick stadsdelen sitt namn efter byn. Vid Nockebybron fanns bebyggelse långt tidigare: den första bron blev färdig 1787, och enligt Wikipedia uppfördes flera sommarhus bortåt bron vid slutet av 1800-talet. Stadsdelen stadsplanerades och byggdes på 1930-talet, efter en plan av Albert Lilienberg. De flesta tomterna uppläts för villabyggande mellan 1926 och 1933, och spårvagnen förlängdes hit 1929. Wikipedia skriver att området planerades för villor och domineras av villor, och att husen ofta har två fulla våningar. Gatorna följer den kuperade terrängen. I planbeskrivningen från den 8 augusti 1930 står att husen ska vara fristående eller sammanbyggda två och två i tomtgränsen, och att hus som kopplas ihop på det sättet ska ges ett enhetligt utseende. Nockeby torg anlades i början av 1930-talet med flerfamiljshus och butiker i bottenvåningen. Husen vid torget har enligt Wikipedia slätputsade fasader och ritades av Edvin Engström. Sankta Birgitta kyrka, ritad av Rolf Bergh, invigdes 1962.",
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
        "Byggperiod enligt källorna: till övervägande del 1930-tal, med tomter upplåtna för villabyggande 1926–1933, och enstaka sommarhus vid Nockebybron från slutet av 1800-talet. Hustyper: villor, fristående eller sammanbyggda två och två, samt flerfamiljshus vid Nockeby torg. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Nockeby",
    lat: 59.3283,
    lng: 17.9036,
    nearbyLocations: ["Bromma", "Ängby", "Hässelby"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna i Nockeby är till övervägande del från 1930-talet och är i dag runt 90 år gamla. På hus i den åldern kan taket redan ha lagts om, och husets ålder säger därför lite om takets skick. Det som spelar roll är vad som gjordes senast och hur plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag. På hus som är sammanbyggda två och två möts taken i tomtgränsen, och arbetet vid anslutningen behöver fungera ihop med grannens tak. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Vi går igenom förutsättningarna i Abrahamsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Abrahamsberg.",
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
    uniqueFAQ: {"question":"När byggdes husen i Ängby?","answer":"Byggperiod enligt källorna: 1930–1941 (huvuddelen 1931–38), enplansvillor 1948–49. Hustyper: småstugor/villor i trä (1–2 plan), radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Ängby",
    lat: 59.3372,
    lng: 17.8981,
    nearbyLocations: ["Bromma","Nockeby","Blackeberg"],
    factBox: [{"label":"Kommun","value":"Stockholm (Bromma)"},{"label":"Hustyper","value":"Småstugor/villor i trä (1–2 plan), radhus"},{"label":"Byggperiod","value":"1930–1941 (huvuddelen 1931–38), enplansvillor 1948–49"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 500 (Områdesfakta 2025)"}],
    sourceLink: {"label":"Wikipedia: Norra Ängby","url":"https://sv.wikipedia.org/wiki/Norra_%C3%84ngby"},
    parentLocation: {"name":"Stockholm","slug":"stockholm"},
    h1Override: "Takläggare i Norra Ängby, Bromma",
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småstugorna och radhusen i Norra Ängby är i dag runt 85–95 år gamla, och enplansvillorna från 1948–49 är runt 75 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlag, läkt och plåtdetaljer ofta det som behöver ses över. Eftersom många hus byggdes efter samma typritningar kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad, och i en trädgårdsstad är det klokt att ta reda på det innan materialet väljs." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Norra Ängby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
      "Vi går igenom förutsättningarna i Kista — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Kista.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Kista?",
      answer:
        "Priset för ett takbyte i Kista beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
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
      "Vi går igenom förutsättningarna i Akalla — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Akalla.",
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
      "Tensta — del av Järvafältet — har ett fastighetsbestånd med flerbostadshus från 1970-talet med stora takytor. Taken börjar närma sig slutet av sin livslängd, och då är omläggning oftast bättre ekonomi än lappning. RoslagsTak utför kompletta takprojekt i Tensta: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Tensta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Tensta.",
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
    uniqueFAQ: {"question":"När byggdes husen i Saltsjöbaden?","answer":"Byggperiod enligt källorna: villastad 1891–1912, utbyggnad efter andra världskriget. Hustyper: villor (villastad). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Nacka kommun."},
    primaryKeyword: "takläggare Saltsjöbaden",
    lat: 59.2828,
    lng: 18.3078,
    nearbyLocations: ["Nacka","Fisksätra","Storängen och Saltsjö-Duvnäs"],
    factBox: [{"label":"Kommun","value":"Nacka"},{"label":"Delområden","value":"Neglinge, Tattby, Igelboda, Solsidan, Rösunda, Pålnäs, Skogsö, Ljuskärr, Älgö"},{"label":"Hustyper","value":"Villor (villastad)"},{"label":"Byggperiod","value":"Villastad 1891–1912, utbyggnad efter andra världskriget"},{"label":"Kulturmiljö","value":"Riksintresse för kulturmiljövården"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 2 100"}],
    sourceLink: {"label":"Wikipedia: Saltsjöbaden","url":"https://sv.wikipedia.org/wiki/Saltsj%C3%B6baden"},
    parentLocation: {"name":"Nacka","slug":"nacka"},
    h1Override: "Takläggare i Saltsjöbaden, Nacka",
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Saltsjöbaden står villor från 1890-talet sida vid sida med hus från efterkrigstiden och senare. De äldsta villorna är över hundra år gamla, medan efterkrigstidens hus är runt 60–75 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. På de äldre arkitektritade villorna är takets form, material och detaljer ofta en viktig del av husets uttryck. Eftersom Saltsjöbaden är riksintresse för kulturmiljövården är det extra viktigt att ta reda på vad som gäller innan ett byte av material eller kulör. Om det kräver lov eller anmälan avgör Nacka kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Saltsjöbaden och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "fisksatra",
    name: "Fisksätra",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Fisksätra — takbyte och takrenovering i Fisksätra. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Bland flerbostadshus från 1970-talet är det vanligt att underlagspappen tjänat ut långt före själva taktäckningen — då räcker det sällan att byta enstaka pannor. Vi går igenom konstruktionen, föreslår den lösning som ger bäst ekonomi över 30 år och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Fisksätra — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Fisksätra.",
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
      "Saltsjö-Boo — sjönära villaområde i norra Nacka — har ett fastighetsbestånd med villor från 1950-tal till nyproduktion. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Saltsjö-Boo: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris efter en kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Saltsjö-Boo — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Saltsjö-Boo.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Saltsjö-Boo?",
      answer:
        "Priset för ett takbyte i Saltsjö-Boo beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
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
      "Älta ligger i den sydvästra delen av Nacka kommun. Älta gård nämns enligt Wikipedia redan 1397, i ett köpebrev där namnet skrivs Elpta, och gården har under århundradena lytt under både Tyresö slott och Erstavik. Den äldsta bevarade byggnaden är Lovisedalstorpet från senare delen av 1700-talet, som på 1990-talet flyttades till Älta gård. Dagens bebyggelse började med Franz Witte, som köpte Älta gård 1880 och i slutet av 1800-talet började stycka marken för fritidshus och villor. År 1908 tog AB Witte & Co över tomtförsäljningen, som fortsatte in på 1930-talet, och Wittes väg i Lovisedal har namn efter honom. År 1925 var enligt Wikipedia omkring 1 000 tomter bebyggda, de flesta med en- eller tvåfamiljshus, och en stor del av dem var sommarhus. Elektricitet kom först 1926. En byggnadsordning från 1928 bestämde att en tomt för ett enfamiljshus skulle vara minst 1 500 kvadratmeter. I början av 1940-talet infördes ett nybyggnadsförbud, bland annat på grund av problem med vatten och avlopp, och det gällde in på 1960-talet. Efter förbudet byggdes Stensö, 1965–1971. Kolarängen, på ömse sidor om Ältavägen i norra Älta, har enligt Wikipedia bebyggelse huvudsakligen från 1950- till 1970-talen, mest villor men också radhus och parhus. Norra Hedvigslund bebyggdes på 1920-talet, först med sommarstugor och senare huvudsakligen med villor. I södra Hedvigslund byggdes från 2008 ett nytt område med småhus, parhus, radhus och mindre flerbostadshus, och i den gamla grustäkten Ältadalen planerades omkring 220 bostäder i småhus, med en detaljplan som vann laga kraft 2015.",
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
        "Byggperiod enligt källorna: tomtförsäljning från slutet av 1800-talet till 1930-talet, Kolarängen 1950- till 1970-tal, Stensö 1965–1971, södra Hedvigslund från 2008 och Ältadalen med detaljplan från 2015. Hustyper: villor, radhus, parhus och flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Nacka kommun.",
    },
    primaryKeyword: "takläggare Älta",
    lat: 59.2681,
    lng: 18.1725,
    nearbyLocations: ["Nacka", "Tyresö", "Fisksätra"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Älta skiljer det ett sekel mellan de äldsta och de nyaste husen. Villorna från tomtförsäljningens tid är i dag runt hundra år gamla, husen i Kolarängen runt 55–75 år och husen i södra Hedvigslund och Ältadalen högst 20 år. Taken på de äldre husen kan redan ha lagts om, och i de nya områdena är ett takbyte inte aktuellt. Det är därför huset och inte adressen som avgör. På radhusen och parhusen i Kolarängen och södra Hedvigslund delar taket anslutning med grannens, och den behöver planeras ihop med grannen. Om ett byte av material eller kulör kräver lov eller anmälan avgör Nacka kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Vi går igenom förutsättningarna i Gustavsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Gustavsberg.",
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
      "Ingarö är en ö i Värmdö kommun, skild från grannön Värmdö i norr genom det smala sundet Kolström. Ön är drygt 62 kvadratkilometer stor, och enligt Wikipedia har här funnits bofast befolkning sedan bronsåldern, vilket hällristningar vittnar om. Det som har format dagens bebyggelse är fritidshusen. Under de senaste hundra åren ökade antalet fritidsboende, medan de bofasta under en period blev färre. Sedan vände det: enligt Wikipedia har allt fler fritidshus byggts om till villor, och fler permanentbostäder har byggts, vilket förklaras med att vägarna gör det möjligt att pendla till Stockholm. År 1995 bodde omkring 3 500 personer fast på ön, 1999 omkring 4 500 och 2012 över 9 000. Brunn är öns huvudort, med skola, mataffär och idrottsplats, och är enligt SCB sammanvuxen med Fågelvikshöjden. Bland de övriga orterna finns Långvik, Återvall, Ingaröstrand och Lugnet och Skälsmara, som Wikipedia beskriver som två småhusområden. Björnömalmen och Klacknäset, längst ut på ön, beskrivs som två fritidshusområden. Omvandlingen pågår fortfarande. Värmdö kommun skriver att den arbetar för att förbättra boendemiljön för dem som vill bosätta sig permanent i tidigare fritidshusområden, och har pekat ut prioriterade förändringsområden där kommunalt vatten och avlopp och detaljplaner ska komma först.",
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
        "Enligt källorna finns här villor, fritidshus som har byggts om till villor och kvarvarande fritidshus, i orter som Brunn, Fågelvikshöjden, Långvik och Återvall. En exakt byggperiod för husen är inte belagd i de källor vi använder. Taken kan vara allt från nylagda till mycket gamla, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Värmdö kommun.",
    },
    primaryKeyword: "takläggare Ingarö",
    lat: 59.2839,
    lng: 18.4667,
    nearbyLocations: ["Värmdö", "Gustavsberg", "Hemmesta"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Källorna anger ingen byggperiod för husen på Ingarö, och det går inte att säga hur gamla de är i allmänhet. Här finns fritidshus, fritidshus som har byggts om till villor och nybyggda permanentbostäder sida vid sida, och taken kan ha lagts om vid helt olika tillfällen. När ett fritidshus görs om till åretruntbostad byggs det ofta till, och då hamnar tak från olika tider på samma hus. Det är i mötet mellan dem som en takkontroll gör mest nytta: i ränndalar, vid anslutningar mot vägg och runt genomföringar. Underlagspapp, läkt, plåtdetaljer och hängrännor bedöms på plats, oavsett när huset byggdes. Om ett byte av material eller kulör kräver lov eller anmälan avgör Värmdö kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Vi går igenom förutsättningarna i Hemmesta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Hemmesta.",
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
      "Vi går igenom förutsättningarna i Trollbäcken — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Trollbäcken.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Trollbäcken?",
      answer:
        "Priset för ett takbyte i Trollbäcken beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
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
      "Brandbergen — bostadsområde i Haninge — har ett fastighetsbestånd med flerbostadshus med stora flacka takytor. Taken börjar närma sig slutet av sin livslängd, och då är omläggning oftast bättre ekonomi än lappning. RoslagsTak utför kompletta takprojekt i Brandbergen: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Brandbergen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Brandbergen.",
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
      "Vi går igenom förutsättningarna i Handen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Handen.",
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
      "Vi går igenom förutsättningarna i Jordbro — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Jordbro.",
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
      "Västerhaninge är en tätort och kommundel i Haninge kommun på Södertörn, omkring 25 kilometer från Stockholms innerstad. Bygden är gammal. Västerhaninge kyrka uppfördes på 1200-talet, och det första kända belägget för ortnamnet är från omkring 1314, då det skrevs Westrahanunge. Även Ribby, Nedersta och Fors är enligt Wikipedia skriftligt kända sedan 1300-talet. Tillsammans med Jordbrogravfältet bildar Åbygravfältet, som till stor del sannolikt ligger under den gamla kyrkbyn, Nordens största kända gravfält från äldre järnåldern. Stationssamhället kom till efter att Nynäsbanan invigdes den 28 december 1901. Vid kyrkan fanns då stationshus, gästgiveri, handelsbod och apotek. Järnvägen blev enligt Wikipedia avgörande för utvecklingen under 1900-talet, särskilt efter 1950, då befolkningen ökade och nya bostadsområden byggdes. Åren 1933–34 rätades Nynäsvägen, och då tillkom också det första finförgrenade vägnätet för den nya villabebyggelsen sydväst om kyrkan. Mellan 1953 och 1970 uppfördes de flesta av ortens flerfamiljshus, 1969 invigdes Västerhaninge köpcentrum och 1973 kom pendeltågen i gång. I dag finns enligt Wikipedia både bostadsrätter, hyresrätter och flera områden med villor och grupphus, där de äldsta är från mitten av 1940-talet. Under senare år har nya bostadsområden tillkommit, som Ribby ängar, Skarplöt och Nedersta. Närbutiker finns ute i bostadsområdena, bland annat i Åby och Ribby, och i norr tar Hanvedens skogar vid. Väster om järnvägen ligger Norrskogen och Jägartorp. Enligt Haninge kommuns kulturmiljöinventering köpte bolaget AB Hem på landet omkring 1919 cirka 100 hektar av gårdarna Ribbys mark, för att stycka den till små jordbruk och villatomter och främja egnahemsbyggandet. En villa från 1921, byggd av en snickare som kallades Millimeter-Kalle, räknas till de första husen i Norrskogen. Vid mitten av 1940-talet fanns ungefär 90 bostads- och trädgårdslägenheter på Ribbys tidigare marker. Byggandet av egnahem, villor och småhus ökade från 1940-talet och tog fart under 1950- och 1960-talen, då de befintliga villaområdena förtätades och ny mark bebyggdes vid Ribbylund, Jägartorp och norra Norrskogen.",
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
        "Byggperiod enligt källorna: de äldsta villorna och grupphusen från mitten av 1940-talet, mest av småhusbebyggelsen från decennierna efter 1950. Hustyper: villor, egnahem, radhus och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Haninge kommun.",
    },
    primaryKeyword: "takläggare Västerhaninge",
    lat: 59.1222,
    lng: 18.1086,
    nearbyLocations: ["Haninge", "Jordbro", "Tungelsta", "Handen"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De äldsta villorna och grupphusen i centrala Västerhaninge är i dag runt 80 år gamla, och mycket av småhusbebyggelsen kom till under decennierna efter 1950. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I de nyaste områdena är taken betydligt yngre. I grupphusområden, där husen är byggda samtidigt och ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Haninge kommun, och det är klokt att kontrollera det innan materialet väljs.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
    uniqueFAQ: {"question":"När byggdes husen i Tungelsta?","answer":"Byggperiod enligt källorna: egnahem från 1908 till 1920-talet, småhus efter 1940-talets byggnadsplaner, radhus och småhus efter 1960-talets planer. Hustyper: egnahem och villor, radhus, kedjehus, flerbostadshus centralt och i Lillgården. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Haninge kommun."},
    primaryKeyword: "takläggare Tungelsta",
    lat: 59.1,
    lng: 18.045,
    nearbyLocations: ["Västerhaninge", "Nynäshamn", "Jordbro"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Tungelsta står hus från tre skeden. Egnahemmen från trädgårdsstädernas tid, 1908 till 1920-talet, är i dag runt 100 år eller äldre. Småhusen från 1940-talets planer är runt 80 år och husen från 1960-talet runt 60 år. Taken kan redan ha lagts om, på de första egnahemmen kanske flera gånger, och husets ålder säger därför inget säkert om takets skick. Det som avgör är underlagspapp, läkt, plåtdetaljer och hängrännor som de ser ut i dag. På radhus hänger taken ihop med grannens, och anslutningen behöver fungera åt båda håll. Kommunens inventering pekar ut särskilt värdefulla kulturmiljöer och skriver att anmälan kan krävas innan åtgärder utförs på byggnader där. Om ett byte av material eller kulör kräver lov eller anmälan avgör Haninge kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Tungelsta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "dalaro",
    name: "Dalarö",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Dalarö, skärgårdsorten i Haninge med hus från badortstiden på 1800-talet och fritidshus från 1950-talet. Kostnadsfri takkontroll.",
    longDescription:
      "Dalarö är en tätort i Haninge kommun och en skärgårdsort i Stockholms södra skärgård. Orten ligger vid den stora farleden söderifrån in mot Stockholm, och Wikipedia beskriver socknen som en kuperad bergs- och skogsbygd. Samhället har anor från 1630-talet. Ett första tullhus inrättades 1636, när Dalarö blev yttre tullstation för Stockholm. Det tullhus som står kvar byggdes 1788 efter ritningar av Erik Palmstedt och är byggnadsminne sedan 1935. När garnisonen lades ner 1854 blev Dalarö i stället badort, med hotell, restauranger och småbåtshamn. Ett kallbadhus hade öppnat 1849, och ett par år senare kom ett varmbadhus. Societetshuset är uppfört i timmer i två våningar och fick enligt Wikipedia troligen sitt nuvarande utseende på 1860-talet, med en fasad i schweizerstil. Tullvaktstugan vid vattnet är från 1861 och ritad i samma stil. Mellan 1876 och utgången av 1951 var Dalarö ett municipalsamhälle. Väster om Dalarö ligger Schweizerdalen, som 1937 var ett villaområde i municipalsamhället. Enligt Wikipedia exploaterades området i början av 1950-talet för havsbad och fritidsbebyggelse, och av de 328 fastigheterna där bebos i dag drygt hälften permanent. Sedan 2015 räknas Schweizerdalen, Smådalarö och Malmen-Kolbotten till tätorten Dalarö.",
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
        "Byggperiod enligt källorna: samhälle sedan 1630-talet, badort från 1854, och Schweizerdalen exploaterat i början av 1950-talet för havsbad och fritidsbebyggelse. Hustyper: bebyggelse från badortstiden, villor och fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Haninge kommun.",
    },
    primaryKeyword: "takläggare Dalarö",
    lat: 59.1339,
    lng: 18.4064,
    nearbyLocations: ["Haninge", "Handen", "Nynäshamn"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "På Dalarö står hus från mycket olika tider. Husen från badortens första årtionden, som societetshuset och tullvaktstugan, är i dag runt 160 år gamla, medan fritidshus från Schweizerdalens utbyggnad i början av 1950-talet är runt 75 år. Taken kan redan ha lagts om, och husets ålder säger därför inget säkert om takets skick. Den som vill byta material eller kulör bör ta reda på vad som gäller först. Om ett byte av material eller kulör kräver lov eller anmälan avgör Haninge kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
    extraContent: "Två generationer av tak: För de äldre villorna från 1920- och 1930-talen har taket ofta bytts eller lagts om minst en gång sedan huset byggdes, men det är inte alltid känt när eller hur. Därför är det svårt att säga något generellt om skicket. Ett äldre tak kan dessutom ha detaljer som kräver omsorg vid ett byte, till exempel takkupor, skorstenar och äldre plåtarbeten. Rad- och kedjehusen i Myrängen från 1980- och 90-talen har kommit upp i en ålder där många ägare börjar fundera på takets underlag, plåtdetaljer och hängrännor. Eftersom husen i en länga oftast är likadana och byggdes samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett konkret takbyte kräver lov eller anmälan, till exempel vid byte av material eller kulör, avgör Huddinge kommun. Det är klokt att kontrollera det innan arbetet planeras.",
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
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten, inget timpris.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Funderar du på att byta eller lägga om taket i Stuvsta? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "trangsund",
    name: "Trångsund",
    region: "Södra Stockholm",
    isIsland: false,
    description: "Takbyte och takomläggning i Trångsund vid Drevviken och Magelungen. Villor från styckningsåren och småhus från 1960-talet. Kostnadsfri takkontroll.",
    longDescription: "Mellan sjöarna Drevviken och Magelungen i nordöstra Huddinge ligger Trångsund. Namnet kommer från det trånga sundet i Drevviken. Trångsund nämns första gången 1636 som ett torp, som med tiden blev en mindre herrgård. År 1762 köpte arkitekten Carl Fredrik Adelcrantz Trångsunds gård och lät uppföra en ny mangårdsbyggnad. I samband med 1960-talets utbyggnad fick kommundelen sitt centrum, och Tacksägelsekyrkan, ritad av arkitekten Sture Frölén, invigdes 1957. Platsen har gamla anor. Vid Magelungen ligger Fållan, där stockholmare hade sommarnöjen redan på 1700-talet och där Carl Michael Bellman tillbringade sommaren 1773. Gården finns kvar än i dag. Kommundelen består av åtta delområden: Sjöängen, Nytorp, Stortorp, Hammartorp, Fållan, Mellansjö, Orlångsjö och Svartvik. Bebyggelsen har vuxit fram i etapper. Nynäsbanan blev klar 1901, med egen station i Trångsund, men de styckningsplaner som gjordes då omsattes först i slutet av 1920-talet. I Stortorp skapades mellan 1911 och 1928 över 600 tomter, och i Sjöängen styckades fastigheter av från Trångsunds herrgård. Under 1930- och 40-talen ökade byggandet, och i början av 1960-talet byggdes enligt beskrivningar av kommundelens historia för fullt, både flerbostadshus och småhus. Resultatet är ett område där villor från olika decennier ligger sida vid sida: tidiga hus på styckningstomterna längs järnvägen och en stor våg av småhus från 1960-talet.",
    extraContent: "Tak från olika tider: Ett hus från 1960-talet är i dag över sextio år gammalt. Tak från den tiden kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och avvattning ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. De äldre husen från styckningsåren har ofta byggts om och renoverats i flera omgångar, och skicket varierar därför mycket. Där kan det också finnas äldre detaljer som skorstenar, takkupor och plåtarbeten som behöver hanteras med omsorg vid ett byte. Om ett takbyte med nytt material eller ny kulör kräver lov eller anmälan avgör Huddinge kommun.",
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
    uniqueFAQ: {"question":"När byggdes husen i Skogås?","answer":"Byggperiod enligt källorna: planlagt från slutet av 1970-talet. Hustyper: radhus, kedjehus, villor (och några flerbostadshus). Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun."},
    primaryKeyword: "takläggare Skogås",
    lat: 59.2286,
    lng: 18.1428,
    nearbyLocations: ["Huddinge","Trångsund","Stuvsta"],
    factBox: [{"label":"Kommun","value":"Huddinge"},{"label":"Delområden","value":"Östra Skogås, Mörtvik"},{"label":"Hustyper","value":"Radhus, kedjehus, villor (och några flerbostadshus)"},{"label":"Byggperiod","value":"Planlagt från slutet av 1970-talet"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 300"}],
    sourceLink: {"label":"Wikipedia: Skogås","url":"https://sv.wikipedia.org/wiki/Skog%C3%A5s"},
    parentLocation: {"name":"Huddinge","slug":"huddinge"},
    h1Override: "Takläggare i Östra Skogås och Mörtvik, Huddinge",
    extraSections: [{ heading: "Vad det betyder för taket", text: "Radhusen, kedjehusen och villorna i Östra Skogås och Mörtvik är i dag runt 40–45 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. I radhus- och kedjehusområdena, där husen byggdes samtidigt och är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Östra Skogås eller Mörtvik? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Segeltorp?","answer":"Byggperiod enligt källorna: villor tidigt 1900-tal, radhus främst 1950-tal. Hustyper: villor, radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun."},
    primaryKeyword: "takläggare Segeltorp",
    lat: 59.2794,
    lng: 17.945,
    nearbyLocations: ["Huddinge","Snättringe","Fullersta"],
    factBox: [{"label":"Kommun","value":"Huddinge"},{"label":"Delområden","value":"Jakobslund, Smista, Juringe (samt Kråkvik, Kolartorp i kommundelen)"},{"label":"Hustyper","value":"Villor, radhus"},{"label":"Byggperiod","value":"Villor tidigt 1900-tal, radhus främst 1950-tal"},{"label":"Ägda småhus i SCB:s statistikområde (RegSO, 2025)","value":"Ca 1 600"}],
    sourceLink: {"label":"Wikipedia: Segeltorp (kommundel)","url":"https://sv.wikipedia.org/wiki/Segeltorp_(kommundel)"},
    parentLocation: {"name":"Huddinge","slug":"huddinge"},
    h1Override: "Takläggare i Segeltorp, Huddinge",
    extraSections: [{ heading: "Vad det betyder för taket", text: "De äldsta villorna i Segeltorp är i dag runt hundra år gamla, och radhusen från 1950- och 60-talen runt 60–75 år. Taken kan redan ha lagts om en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlag, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I radhusområdena, där husen byggdes samtidigt och är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Segeltorp och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
      "Vi går igenom förutsättningarna i Bandhagen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Bandhagen.",
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
      "Vi går igenom förutsättningarna i Högdalen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Högdalen.",
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
      "Hökarängen — klassisk söderförort — har ett fastighetsbestånd med trevåningshus och radhus från 1940–50-tal. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Hökarängen: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris efter en kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Hökarängen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Hökarängen.",
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
      "Vi går igenom förutsättningarna i Tumba — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Tumba.",
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
      "Vi går igenom förutsättningarna i Tullinge — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Tullinge.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Tullinge?",
      answer:
        "Priset för ett takbyte i Tullinge beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag. Som riktpris, efter ROT-avdrag och inkl. moms, ligger ett takbyte mellan 1 200 kr/m² (betongpannor, TP20-plåt) och ca 2 000 kr/m² (dubbelfalsat plåttak).",
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
      "Vi går igenom förutsättningarna i Norsborg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Norsborg.",
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
      "Vi går igenom förutsättningarna i Alby — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Alby.",
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
      "Vi går igenom förutsättningarna i Fittja — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Fittja.",
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
    extraContent: "Vad blandningen betyder för taket: I ett samhälle som byggts ut under mer än hundra år finns ingen typisk takålder. Ett hus från 1960-talet är i dag över sextio år gammalt, och har taket inte lagts om är underlagspapp, läkt och plåtdetaljer ofta i den ålder där det är dags att se över dem. Hus från 1990-talet närmar sig åldern där hängrännor, beslag och genomföringar brukar behöva kontrolleras. I de äldsta villorna har taket i regel bytts, ibland flera gånger, och där kan det finnas äldre detaljer som behöver hanteras varsamt. Om just ditt hus har särskilda kulturhistoriska värden, eller om ett byte av material eller kulör kräver lov eller anmälan, avgör kommunen. Det är klokt att kontrollera det innan arbetet planeras.",
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
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris**, inget löpande timpris.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Har du hus i Rönninge och vill veta vad taket behöver? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
  {
    slug: "jarna",
    name: "Järna",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Järna, med villastaden vid stationen, egnahem från 1930- och 1940-talen och villor från 1950–1970-talen. Kostnadsfri takkontroll.",
    longDescription:
      "Järna är en tätort i Södertälje kommun. Enligt Södertälje kommuns kulturmiljöinventering ligger orten högt på en ås, med den flacka Järnaslätten nedanför i öster, och järnvägen delar den i två delar med en bro emellan. Fram till sent 1800-tal var området obebyggt, med undantag av några torpstugor, kyrkan och skolan. Järnvägen till Stockholm kom 1861, och kring stationen växte ett samhälle fram. Marken mellan stationen och kyrkan ägdes av grevinnan Löwen på Kallfors gård. På initiativ av församlingens klockare Carl Johan Wadström, som kallades Järnakungen, planlades den för Järna villastad, och tomter såldes. Där anlades enligt kommunen stora villor på luftiga tomter fram till 1920-talet. Affärshuset Birka från 1903 och konsumbutiken Kullen från 1917 står kvar, och 1913 öppnades Nyköpingsbanan. Kommunen beskriver också småhus av egnahemskaraktär från 1930- och 1940-talen, indragna på små tomter med förgårdsmark och med panelade fasader. Stadsplanen som antogs 1941 hade arkitekten Cyrillus Johansson upprättat redan 1924, och under samma period styckades egnahemsområdet Epagärdet av. Södra Starrbäcken består enligt kommunen till stor del av friliggande småhus från 1950- och 1960-talen på relativt små tomter. Eneområdet nedanför åsen bebyggdes med typhusvillor under sent 1960-tal och tidigt 1970-tal.",
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
        "Byggperiod enligt källorna: villastaden fram till 1920-talet, egnahem från 1930- och 1940-talen, Södra Starrbäcken från 1950- och 1960-talen och Ene från sent 1960-tal till tidigt 1970-tal. Hustyper: villor, egnahem och friliggande småhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Södertälje kommun.",
    },
    primaryKeyword: "takläggare Järna",
    lat: 59.0928,
    lng: 17.5658,
    nearbyLocations: ["Södertälje", "Rönninge", "Salem"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Järna står hus från drygt hundra år sida vid sida. Villorna i villastaden är i dag runt 100–120 år gamla, egnahemmen från 1930- och 1940-talen runt 80–95 år, småhusen i Södra Starrbäcken runt 60–75 år och typhusvillorna i Ene mellan 50 och 60 år. Taken kan redan ha lagts om, och husets ålder räcker därför inte för att bedöma taket. Det avgörande är underlagspapp, läkt, plåtdetaljer och hängrännor, och i vilket skick de är i dag. Om ett byte av material eller kulör kräver lov eller anmälan avgör Södertälje kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Edsviken är villaområdet kring viken med samma namn, på gränsen mellan Sollentuna, Danderyd och Solna. Här finns allt från sekelskiftesvillor och funkishus till nyare enfamiljshus, ofta med sadeltak i tegel, betongpannor eller falsad plåt. Det sjönära läget innebär mer vind och fukt än längre in i landet, vilket sliter extra på plåtdetaljer, hängrännor och underlagspapp. Vi utför takbyte, takrenovering och takomläggning i Edsviken med material anpassat efter husets ålder och stil, kostnadsfri takkontroll och fast pris.",
    extraContent:
      "Vi går igenom förutsättningarna i Edsviken — smala villagator, stora tomter med träd och hus nära vattnet där väderpåfrestningen är större. Det påverkar både val av material och hur vi planerar ställning och kranbil, och gör att vi kan lämna en realistisk offert direkt efter takkontrollen istället för luddiga prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Edsviken.",
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
        "Ja. Vi tar uppdrag från både bostadsrättsföreningar och villaägare i Uppsala. För föreningar börjar vi med en kostnadsfri takkontroll och lämnar ett fast pris som styrelsen kan besluta på. När arbetet är klart får föreningen skriftlig garanti.",
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
      "Många flerbostadshus från 1950–70-talet har tak som närmar sig slutet av sin livslängd. För bostadsrättsföreningar lämnar vi ett skriftligt underlag efter en kostnadsfri takkontroll, med fast pris och tydlig specifikation, så att styrelsen kan planera och besluta. Även villaägare är välkomna att boka takkontroll.",
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
        "Plåt med hög korrosionsklass, dubbelfalsad bandtäckning eller lertegel klarar kustklimat väl. Viktigast är rätt infästningar och beslag. Vi rekommenderar material vid en kostnadsfri takkontroll.",
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
      "Trosa är en kuststad vid Trosaån med välbevarad småstadsmiljö, sommarhus och villor i kustnära lägen. Salt luft, fukt och vind från Östersjön slits på beslag, vindskivor och underlagspapp, och äldre träbebyggelse kräver rätt detaljer. Vi tar uppdrag i Trosa med takbyte, takrenovering, bandtäckning och plåtarbeten.",
    extraContent:
      "Fritidshus och permanentbostäder nära vattnet har samma krav: material och infästningar som tål kustklimat. Vi går igenom takets skick vid en kostnadsfri takkontroll och lämnar ett fast pris. Kontakta oss så bokar vi en tid.",
    uniqueFAQ: {
      question: "Tar ni uppdrag på fritidshus i Trosa?",
      answer:
        "Ja, vi tar uppdrag på både permanentbostäder och fritidshus i Trosa. Vi bedömer takets skick vid en kostnadsfri takkontroll och lämnar ett fast pris, med material som klarar kustklimat.",
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
      "Norra Djursholm växte fram när den ursprungliga villastaden kring slottet och Värtan byggdes ut mot norr och väster. Enligt Wikipedia började Ösby-området bebyggas under andra halvan av 1890-talet, men byggandet tog fart först 1910. Där anslöt Djursholmsbanan till Roslagsbanan vid stationen Djursholms Ösby, som öppnade 1890 och gav villastaden en fast förbindelse med Stockholm. Svalnäs, längst i norr, är en gammal gård som nämns första gången i ett pergamentbrev från 1312. Egendomen köptes 1883 av bankdirektören Henrik Palme, som sex år senare blev den drivande kraften bakom Djursholms villastad. Han lät bygga en ny huvudbyggnad, ritad av arkitekten Fredrik Lilljekvist, och bodde där till sin död 1932. År 1897 sålde han 122 tunnland i Svalnässkogen, längs stranden norr om Framnäsviken, till Djursholms AB, som styckade av strandtomter för villor. Resten av Svalnäs införlivades i Djursholm 1934. Mellan 1912 och 1934 var Svalnäs slutstation på Djursholmsbanan. Enligt Wikipedia byggdes Svalnäs snabbt ut under 1900-talets första decennium och fick då en högborgerlig prägel. Villornas förhärskande stilar är nationalromantik och jugend, och bland arkitekterna fanns Lars Israel Wahlman, Axel Viktor Forsberg och Elis Benckert. Benckerts Villa Lagercrantz på Svalnäsvägen är byggnadsminne sedan 1979. Norr om Ösbysjön präglas bebyggelsen i stället av 1920-talets klassicism. I området ligger också Svalnäsgravfältet, från omkring 500 till 1000 e.Kr., och Djursholms golfbana.",
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
        "Byggperiod enligt källorna: Ösby från 1890-talet med fart från 1910, Svalnäs under 1900-talets första decennium, och 1920-talsklassicism norr om Ösbysjön. Hustyper: villor i bland annat nationalromantik och jugend. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Danderyds kommun.",
    },
    primaryKeyword: "takläggare Svalnäs",
    lat: 59.4124,
    lng: 18.0872,
    nearbyLocations: ["Djursholm", "Danderyd", "Stocksund"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Många av villorna i Svalnäs och Ösby är i dag runt hundra år gamla eller mer. Taken kan redan ha lagts om, en eller flera gånger, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Villor i nationalromantik och jugend har ofta branta takfall, kupor, burspråk och torn, och varje sådan del ger taket fler anslutningar. Det är i ränndalar, runt skorstenar och vid plåtdetaljer som ett sådant tak prövas, och där är hantverket avgörande. I ett område med äldre, arkitektritade villor är det klokt att tänka på material och kulör tidigt. Om ett byte av material eller kulör kräver lov eller anmälan avgör Danderyds kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "Byggperiod enligt källorna: trädgårdsstaden från tidigt 1950-tal, Slumsta från 1978, och inslag från 1970- till 2010-talet. Hustyper: villor, med inslag av flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Vallentuna kommun.",
    },
    primaryKeyword: "takläggare Lindholmen",
    lat: 59.5844,
    lng: 18.1052,
    nearbyLocations: ["Vallentuna", "Ormsta"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen i Lindholmen är byggda under mer än sjuttio år. De äldsta villorna i trädgårdsstaden är i dag runt 70–75 år gamla, villorna i Slumsta närmare 50 år, och en stor del av bebyggelsen är yngre än så. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I ett område som Slumsta, där husen är ritade och byggda samtidigt, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Vallentuna kommun.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "Byggperiod enligt källorna: Östra och Västra Sjöberg huvudsakligen under 1970-talet, Falkberget från slutet av 1990-talet. Hustyper: villor och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sollentuna kommun.",
    },
    primaryKeyword: "takläggare Sjöberg",
    lat: 59.4261,
    lng: 17.9947,
    nearbyLocations: ["Sollentuna", "Edsviken", "Skarpäng"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De flesta villorna och radhusen i Östra och Västra Sjöberg är i dag runt 50 år gamla, medan villorna på Falkberget är runt 20–30 år. Taken i de äldre delarna kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. På Falkberget är taken yngre. På radhus hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. Eftersom husen i en länga oftast är likadana och byggda samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Med skog och vatten nära inpå samlas löv och barr lätt i hängrännor och ränndalar, och det är värt att hålla dem rena. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sollentuna kommun.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "Byggperiod enligt källorna: från slutet av 1920-talet, med ökat byggande efter 1947 och husen i dag främst från 1960- och 2000-talet. Hustyper: villor och flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun.",
    },
    primaryKeyword: "takläggare Lahäll",
    lat: 59.4265,
    lng: 18.0711,
    nearbyLocations: ["Täby", "Näsbypark", "Roslags-Näsby"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Lahäll har byggts ut och om under snart hundra år, från sommarstugor till villor, och husen är därför i mycket olika åldrar. En stor del av villorna är i dag runt 60 år gamla, medan andra är byggda eller ersatta under 2000-talet. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. När äldre hus har byggts till i flera omgångar möts ofta tak från olika tider på samma hus. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Stenhamra är en tätort i Ekerö kommun, på västra sidan av Färingsö i Mälaren. Orten är mest känd för sitt stenbrott. Enligt Wikipedia bröts här en stor del av Stockholms gat- och kantsten, från 1884 fram till 1919 med full styrka, och omkring 100 arbetare sysselsattes året runt. Den enda förbindelsen med Stockholm var sjövägen, så stenen fraktades på pråmar. Driften lades ner 1937. Tjänstebostäderna som Stockholms stad höll med för stenhuggarnas familjer finns kvar, och stenbrottet, bostäderna, skolan och konsumbutiken är tillsammans klassade som riksintresse för kulturmiljövården. I det delvis vattenfyllda stenbrottet har flera filmer spelats in, bland annat Pippi Långstrump och Bröderna Lejonhjärta. Det moderna Stenhamra har en annan historia. Bär- och fruktdryckestillverkaren Stockmos har haft sin fabrik här sedan 1932, och på 1940-talet omfattade odlingarna 10 000 fruktträd. Enligt Wikipedia var det Sveriges största fruktodling norr om Skåne. Åren 1968–1970 byggdes ett villaområde på markerna. Fruktträd finns fortfarande kvar i området. Enligt hitta.se är husen byggda i flera omgångar: kring Dalbovägen och Alvikens gårdsväg främst på 1950- och 1960-talen, kring Apelvägen och Silvavägen på 1960- och 1970-talen, kring Fållvägen och Ramundvägen på 1970- och 1980-talen och vid Stockby strand på 1990- och 2000-talen. Bebyggelsen består av villor, kedjehus och radhus. I Stenhamra med omgivning bor omkring 3 600 personer, och de flesta som arbetar pendlar inom Stockholmsområdet.",
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
        "Byggperiod enligt källorna: villaområdet på den gamla fruktodlingen 1968–1970, övrig bebyggelse 1950- till 1980-talet, och vid Stockby strand 1990- till 2000-talet. Hustyper: villor, kedjehus och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Ekerö kommun.",
    },
    primaryKeyword: "takläggare Stenhamra",
    lat: 59.3347,
    lng: 17.6874,
    nearbyLocations: ["Ekerö"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De flesta husen i Stenhamra är i dag runt 40–65 år gamla, och villorna på den gamla fruktodlingen drygt 55 år. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. Husen vid Stockby strand är betydligt yngre. På kedjehus och radhus hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. I områden med många fruktträd och annan växtlighet nära husen samlas löv lätt i hängrännor och ränndalar, och det är värt att hålla dem rena. Om ett byte av material eller kulör kräver lov eller anmälan avgör Ekerö kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Uttran ligger i Botkyrka kommun, vid den östra delen av sjön Uttran, på gränsen mot Salems kommun. Området räknas i dag som sammanvuxet med Tumba. I början av 1900-talet anlades två sanatorier vid sjön, Söderby sjukhus och Uttrans sjukhus, och för dem inrättades en egen hållplats för lokaltåg. Stationen drogs in i början av 1970-talet. Två av de gamla stationsbyggnaderna i trä används enligt Wikipedia som bostäder, och gångtunneln under spåren finns kvar. Uttran hörde till Grödinge kommun fram till 1971, då den blev en del av Botkyrka. Enligt Wikipedia är Uttran till största delen ett villasamhälle i ett kuperat landskap med flera bäckraviner, vid sjöns sydöstra sida. I söder och sydväst ligger Vinterskogens naturreservat, och i sydost tar Broängen vid. Broängen är ett mindre bostadsområde i södra Tumba. Området är känt sedan medeltiden och var utmark till Skrävsta gård, och fram till 1920-talet var det huvudsakligen jordbruksbygd under Broängens gård. I dag består Broängen huvudsakligen av villor och radhus. Enligt hitta.se är husen i Uttran främst byggda på 1960- och 1980-talen och i Broängen på 1950- och 1960-talen. Bebyggelsen är en blandning av villor, kedjehus och radhus.",
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
        "Byggperiod enligt källorna: Uttran främst 1960- och 1980-tal, Broängen 1950- och 1960-tal. Hustyper: villor, kedjehus och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Botkyrka kommun.",
    },
    primaryKeyword: "takläggare Uttran",
    lat: 59.1921,
    lng: 17.8052,
    nearbyLocations: ["Tumba", "Rönninge"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen i Broängen är i dag runt 60–75 år gamla och i Uttran runt 40–65 år. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I ett kuperat område med raviner och mycket skog nära husen samlas löv och barr lätt i hängrännor och ränndalar, och åtkomsten till huset kan påverka hur ett takbyte planeras. På kedjehus och radhus hänger taken ihop med grannens, och anslutningarna mellan husen behöver utföras så att de fungerar tillsammans med grannens tak. Om ett byte av material eller kulör kräver lov eller anmälan avgör Botkyrka kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "Byggperiod enligt källorna: sommarvillor från 1870-talet, villatomter från sekelskiftet 1900, ett egnahemsområde från 1920-talet och förtätning under de senaste decennierna. Hustyper: villor, med inslag av radhus och små flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Nacka kommun.",
    },
    primaryKeyword: "takläggare Björknäs",
    lat: 59.3209,
    lng: 18.2408,
    nearbyLocations: ["Nacka"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Björknäs står hus från mycket olika tider sida vid sida: sommarvillor från 1800-talets slut, egnahem som är runt hundra år gamla och villor byggda efter 2002. Det går därför inte att säga något gemensamt om taken. På de äldre husen kan taket ha lagts om flera gånger, och det som betyder något är när underlagspapp, läkt och plåtdetaljer senast byttes. Med gamla tallar och ekar nära husen samlas barr och löv lätt i hängrännor och ränndalar, och det är värt att hålla dem rena. Om ett byte av material eller kulör kräver lov eller anmälan avgör Nacka kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Långsjö är en stadsdel i Söderort i Stockholm. Den har fått sitt namn efter Långsjö gård vid Långsjön, sjön som avgränsar stadsdelen åt sydost och bildar kommungräns mot Huddinge. Gården, med sina två identiska huvudbyggnader, lät affärsmannen Robert Ditzinger uppföra åt sina båda söner 1882. År 1908 kom gårdens marker i AB Billiga Tomters ägo, på samma sätt som Herrängens gårds ägor. Gator och kvarter planerades i början av 1900-talet, och när den första stadsplanen för Långsjö fastställdes 1938 följde den enligt Wikipedia i stort sett det som redan fanns. Till en början var järnvägen från Älvsjö station den enda förbindelsen in till Stockholm. År 1922 kom en busslinje mellan Midsommarkransen och Långsjö, som 1930 togs över av Stockholms Spårvägar och blev linje 64. Bland de äldre villorna nämner Wikipedia en vid Strandängsstigen, ritad 1924 av arkitekten Rolf Solin, och en vid Myrvägen, ritad 1928 av Sten Westholm. Långsjöbadet invigdes 1938. Under senare delen av 1960-talet tillkom Långsjöhöjden. Marken var dittills inte planlagd, och där fanns bara skog och en del sommarstugor. År 1966 byggdes 63 kedjehus efter ritningar av arkitekterna Gösta Nordin och Hans Alfont, enligt Wikipedia modernistiska hus med fasader i rött tegel, på båda sidor om en gata som bildar en slinga. I dag beskrivs Långsjö som ett renodlat villaområde med omkring 900 bostäder.",
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
        "Byggperiod enligt källorna: villor från 1920-talet (stadsplanen fastställdes 1938), kedjehusen på Långsjöhöjden 1966. Hustyper: villor och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Långsjö",
    lat: 59.2675,
    lng: 17.9789,
    nearbyLocations: ["Stockholm", "Herrängen"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Långsjö har två tydliga årgångar. Villorna från 1920-talet är i dag runt hundra år gamla, och kedjehusen på Långsjöhöjden är 60 år. På villorna från 1920-talet kan taket redan ha lagts om, och frågan är då hur länge sedan det var och vad som byttes under ytan: underlagspapp, läkt, plåt och hängrännor. Kedjehus är sammanbyggda med grannhuset. Där taken eller mellandelarna möts behöver anslutningen göras så att den håller tätt åt båda håll, och det är klokt att prata med grannen innan arbetet planeras. Eftersom de 63 husen är ritade och byggda på en gång har de samma förutsättningar, och grannar kan ibland ha nytta av att lägga om taken i samma veva. Varje hus får ändå en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "Byggperiod enligt källorna: villor från början av 1920-talet till 1938, flertalet mot slutet av 1920-talet, och radhusen längs Ålstensgatan 1932–1933. Hustyper: villor, radhus och enstaka flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Ålsten",
    lat: 59.3235,
    lng: 17.9509,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna i Ålsten kom till under knappt två decennier och är i dag mellan knappt 90 och omkring 100 år gamla. På hus i den åldern kan taket redan ha lagts om, och husets ålder säger därför lite om takets skick. Det som spelar roll är vad som gjordes vid den senaste omläggningen och hur plåtdetaljer, skorstensanslutningar och hängrännor ser ut i dag. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Där skogen går nära tomterna hamnar barr och löv i hängrännor och ränndalar, som behöver hållas rena. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "Byggperiod enligt källorna: första villorna 1904, villasamhället i Norra Stäket från 1940-talet, kedjehus vid Biskop Olovs väg 1960, och utbyggnad under 1980-talet. Hustyper: friliggande villor, sommarbostäder och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun.",
    },
    primaryKeyword: "takläggare Stäket",
    lat: 59.4725,
    lng: 17.7951,
    nearbyLocations: ["Järfälla"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Stäket står hus från fyra skeden nära varandra. Villorna från seklets början är i dag runt 120 år gamla, husen från 1940-talets villasamhälle runt 80 år, kedjehusen vid Biskop Olovs väg drygt 65 år och 1980-talets hus runt 40 år. Taken kan redan ha lagts om, och husets ålder säger därför inget säkert om takets skick. Det som avgör är vad som finns under ytan i dag: underlagspapp, läkt, plåtdetaljer och hängrännor. På kedjehus möter taket grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. Om ett byte av material eller kulör kräver lov eller anmälan avgör Järfälla kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "Byggperiod enligt källorna: Olovslunds småstugor 1927–1928 och 1938–1939, Nockebyhovs småstugeområde från 1930-talet, bostadshus från 1948–1949 och Mälarblick 1961–1968. Hustyper: småstugor, villor, radhus och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Nockebyhov",
    lat: 59.3345,
    lng: 17.9086,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Småstugorna i Olovslund är i dag nära hundra år gamla, och 1930-talets småstugor runt 90 år. Rad- och kedjehusen från efterkrigstiden är mellan knappt 60 och drygt 75 år. Så gamla hus har i regel fått taket omlagt minst en gång, och det går inte att utläsa takets skick ur byggåret. På rad- och kedjehus hänger taket ihop med grannens, och anslutningarna behöver utföras så att de fungerar tillsammans med grannens tak. Grannar i samma länga kan ibland ha nytta av att planera i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. I Olovslund, som är riksintresse, och i de blåmärkta rad- och kedjehusområdena är det klokt att stämma av med staden innan något ändras. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Bromma Kyrka är en stadsdel i Västerort i Stockholm, kring kyrkan som har gett den dess namn. Den gränsar till Norra Ängby, Beckomberga, Eneby och Riksby. Stadsdelen bildades 1932, och 1940 bröts den norra delen ut till en egen stadsdel, Eneby. I början av 1900-talet ägdes marken enligt Wikipedia av Eneby gård, kyrkoherdebostället vid Bromma kyrka och Beckomberga gård. Eneby gårds dåvarande ägare började 1905 sälja tomter för villabebyggelse. En stor del av Bromma kyrkojord såldes 1918 för att bebyggas, och för det ändamålet bildades Föreningen Bromma Trädgårdar, som fanns kvar till 1946. År 1938 köpte staden återstoden av fastigheten, som bebyggdes med småstugor. Tomterna var från början mycket stora. Enligt Wikipedia låg de på mellan 4 000 och 7 000 kvadratmeter, och efter hand har de delats, så att tomterna nu är mellan 300 och 3 500 kvadratmeter. Gatunamnen berättar om ursprunget: flera vägar har namn efter kyrkoherdar och godsägare, till exempel Doktor Abrahams väg och Stierncronas väg, och andra namn syftar på kyrkliga företeelser, som Prebendet, Annexet och Vapenhuset. Fjorton vägar fick sina namn redan 1924. Spångavägen, som går från Brommaplan till Spånga, fick sitt namn 1938.",
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
        "Byggperiod enligt källorna: tomtförsäljning från 1905, Bromma Trädgårdar från 1918, och småstugor på den mark staden köpte 1938. Hustyper: villor och småstugor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Bromma Kyrka",
    lat: 59.3544,
    lng: 17.9208,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Att tomter har sålts i omgångar och sedan delats betyder att hus från olika tider står sida vid sida. De villor som byggdes på de första tomterna efter 1905 är i dag över hundra år gamla, och småstugorna som kom till efter 1938 är över 80 år. På de avstyckade tomterna kan husen vara yngre. Det går därför inte att säga något gemensamt om taken i stadsdelen, och på de äldre husen kan taken ha lagts om mer än en gång. Vid en takkontroll är det underlagspapp, läkt, plåtdetaljer, skorstensanslutningar och hängrännor som visar hur taket mår, oavsett när huset byggdes. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Flysta är en stadsdel i den södra delen av Järva stadsdelsområde i Stockholms västerort. Enligt Wikipedia är den i huvudsak bebyggd med villor, men utmed Spångavägen finns också ett antal hyreshus. Platsen har varit bebodd länge. På Flystaberget finns ett röse, troligen från bronsåldern, och vid Skogslöparvägen ligger gravfält från vikingatiden. Namnet är belagt 1375, då en bonde vid namn Gunnar nämns i \"flyastum\". På den tidigaste kända kartan, från 1636, är en gårdsbyggnad markerad söder om Flystaberget, och vid storskiftet 1794 bestod byn av fyra gårdar med torp. År 1905 började marken styckas till villatomter. Enligt Spånga Egnahemsförening hade den förste nybyggaren sitt hus klart samma år, och under det följande årtiondet blev ett hundratal familjer bofasta i Flysta Villastad. År 1915 bildades Flysta municipalsamhälle, som gav ett visst självstyre inom Spånga landskommun. På 1920-talet hade samhället enligt föreningen omkring 600 invånare. Den 1 januari 1949 införlivades Spånga landskommun, och därmed Flysta, med Stockholm. Samhället hade då drygt 2 000 invånare. Året därpå blev Flysta en egen stadsdel.",
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
        "Byggperiod enligt källorna: villatomterna började styckas 1905, och samhället växte till drygt 2 000 invånare fram till 1949. Hustyper: villor, med hyreshus utmed Spångavägen. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Flysta",
    lat: 59.3679,
    lng: 17.905,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Flysta växte från ett hus 1905 till ett samhälle med drygt 2 000 invånare 1949, och husen från de åren är i dag mellan ungefär 75 och 120 år gamla. På hus i den åldern har taket som regel lagts om, och byggåret säger därför lite om skicket. Det som går att bedöma på plats är underlagspapp, läkt, plåtdetaljer, skorstensanslutningar och hängrännor. Därför får varje hus en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Vidja, Högmora och Ågesta ligger i Huddinge kommun, kring sjöarna Magelungen, Ågestasjön och Orlången. Högmora gränsar i nordväst mot Magelungen och Stockholms kommun och i sydost mot kommundelen Vidja-Ågesta. Ågesta avgränsas i norr av Magelungen och i väster av Ågestasjön, och Vidja ligger söder om Ågesta, vid Orlångens östra sida. Bilväg till Vidja finns enligt Wikipedia bara norrifrån, genom Ågesta. Vidja var från början ett torp, och namnet är belagt sedan 1535, då det skrevs Viddia. Gården var känd för sina stora ekskogar. År 1910 styckades egendomen, som då omfattade 215 hektar, upp i 36 lotter, och genom vidare styckning blev det omkring 500 tomter. En av exploatörerna var AB Hem på landet, som enligt Wikipedia sålde tomterna till arbetare och lägre tjänstemän. Utbyggnaden skedde huvudsakligen på 1940-talet, och Vidja blev ett utpräglat sommarstugeområde. I dag är majoriteten av fastigheterna permanentbebodda, men andelen fritidshus var länge så hög att Vidja räknades som tätort först 1995. Högmora har sitt namn efter torpen Stora och Lilla Högmora, som båda nämns i husförhörslängden sedan 1689. Kommundelen består enligt Wikipedia huvudsakligen av fritidshus, nybyggda villor och parhus. Ågesta är mest skogbevuxet, och där ligger Ågesta gård, med en huvudbyggnad i sten från 1600-talet.",
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
        "Byggperiod enligt källorna: Vidja styckat från 1910 med utbyggnad huvudsakligen på 1940-talet, i dag även nybyggda villor. Hustyper: villor och fritidshus, i Högmora även parhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun.",
    },
    primaryKeyword: "takläggare Vidja",
    lat: 59.1972,
    lng: 18.0597,
    nearbyLocations: ["Huddinge", "Stuvsta", "Trångsund"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I ett område som går från fritidshus till åretruntbostäder står hus av mycket olika ålder sida vid sida. En stuga från 1940-talets utbyggnad i Vidja är i dag runt 80 år gammal, medan villan på granntomten kan vara nybyggd. Det går därför inte att säga något generellt om taken här: en del är nya, andra kan ha lagts om en eller flera gånger, och på en del hus har taket inte bytts på länge. Där det är fallet är underlagspapp, läkt, plåtdetaljer och hängrännor det som oftast behöver ses över. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Glömsta är en kommundel i norra Huddinge. Den omges av Vårby, Kungens kurva och Segeltorp i norr, Snättringe och Fullersta i öster, Flemingsberg i söder och Vårby och Loviseberg i väster. De södra och västra delarna är bebyggda, medan den norra delen är naturmark med en del av sjön Gömmaren och Gömmarens naturreservat. Diagonalt genom området går Gamla Stockholmsvägen, som har sin föregångare i Göta landsväg. Glömsta hör enligt Wikipedia till Huddinges äldre bosättningar, med gravfält från yngre järnåldern. Glömsta gård, som har gett området dess namn, nämns i skrift första gången 1437. Tomtexploateringen började med ryttmästaren Hjalmar Carlsson, och på 1930- och 1940-talen styckades och byggdes området ut i stor omfattning. I norr, mot Gömmaren, blev det mest sommarstugor, medan småhus för permanentboende kom till längre söderut. På 1950-talet dämpades byggandet, eftersom frågan om vatten och avlopp inte var löst. Sedan kommunen på 1990-talet hade anlagt vägar och kommunalt vatten och avlopp uppfördes nya enfamiljshus i snabb takt. Bebyggelsen består enligt Wikipedia huvudsakligen av villor från slutet av 1990-talet och början av 2000-talet, och Huddinge kommun beskriver Glömsta som till stor del ett gammalt fritidshusområde som har förtätats genom nya detaljplaner.",
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
        "Byggperiod enligt källorna: styckning och utbyggnad på 1930- och 1940-talen, och huvudsakligen villor från slutet av 1990-talet och början av 2000-talet. Hustyper: enfamiljshus och kvarvarande fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun.",
    },
    primaryKeyword: "takläggare Glömsta",
    lat: 59.2397,
    lng: 17.9192,
    nearbyLocations: ["Huddinge", "Segeltorp", "Snättringe"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De flesta villorna i Glömsta är i dag runt 20–30 år gamla. Mellan de nyare villorna står hus från 1930- och 1940-talens utbyggnad, som i dag är runt 80–90 år gamla, och stugor som har blivit åretruntbostäder. Deras tak kan redan ha lagts om, men där det inte har skett är det underlagspapp och läkt som behöver bedömas, inte bara ytan. Två hus på samma gata kan alltså ha helt olika förutsättningar, och det enda sättet att veta är att se på just det taket. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Kummelnäs utgör den nordöstra delen av Boo i Nacka kommun och består enligt Wikipedia av villaområden som från början var sommarstugeområden, tillsammans med några mindre industriområden. Namnet kommer från Kummelnäs gård, som är känd sedan 1600-talet. Gårdens huvudbyggnad från 1698 var den sista byggnaden i Boo socken som stod kvar från tiden före rysshärjningarna 1719. Den revs 1993 och ersattes av en snarlik kopia. På 1820-talet uppfördes en kemisk fabrik vid Kummelnäs, Vita Längan, vars mest spridda produkt var ättika. Tillverkningen upphörde 1851, och byggnaden används i dag som förskola. Mot slutet av 1800-talet styckades stora markområden av från godset, främst för sommarhus. Kristna Egnahemsföreningen, bildad 1899 med byggmästaren Kaspar Höglund som ordförande, köpte 1907 ett stort markområde som planlades med vägar och tomter för medlemmarnas villor. Enligt Wikipedia var de flesta husen träbyggnader och självbyggen, och man räknade då med en järnvägsförbindelse till Stockholm som aldrig blev av. Villa Vinterbo, uppförd 1912–1915 norr om Kummelnäsviken, är ett av områdets få stenhus. På 1930-talet tomtindelades stora områden för sportstugor. Också vid Velamsund, den gamla lantegendomen vid Insjön, såldes tomtmark till sommarbebyggelse sedan grosshandlaren Emil Egnell hade köpt godset 1880. Kommunen köpte gården 1964, och området hör i dag till stor del till Velamsunds naturreservat.",
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
        "Byggperiod enligt källorna: sommarhus från slutet av 1800-talet, egnahemsvillor från markköpet 1907, och sportstugor från 1930-talet. Hustyper: villor, ursprungligen sommarstugeområden. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Nacka kommun.",
    },
    primaryKeyword: "takläggare Kummelnäs",
    lat: 59.3496,
    lng: 18.2799,
    nearbyLocations: ["Nacka", "Lännersta"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Kummelnäs har byggts i flera omgångar och till stor del av dem som själva skulle bo i husen. De tidigaste egnahemsvillorna är i dag över 100 år gamla och sportstugorna från 1930-talet runt 90 år, och sommarstugeområdena har sedan dess blivit villaområden. Taken kan därför vara allt från nylagda till mycket gamla, och en del kan redan ha lagts om. Där taket inte har bytts på länge är det oftast underlagspapp, läkt, plåtdetaljer och hängrännor som behöver ses över. Om ett byte av material eller kulör kräver lov eller anmälan avgör Nacka kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Hersby ligger på centrala Lidingö och utgör enligt Wikipedia kärnan i Lidingö villastad, som bildades 1906. Väster om Hersby ligger Herserud, Torsvik och Islinge, i norr Näset, i öster Kyrkviken och Koltorp och i söder Stockby, Gångsätra och Mosstorp. Namnet kommer från Hersby gård, ett lantbruk med anor från 1400-talet. I början av 1900-talet såldes stora delar av marken till Lidingö villastad, som styckade upp den och sålde tomterna för villor. Arkitekten Per Olof Hallman upprättade stadsplanen 1907, och efter bearbetning antogs den officiellt 1913. Det oregelbundna gatunätet, anpassat efter terrängen, var enligt Wikipedia en nyhet för tiden. Tomterna styckades stora, med boningshuset mitt på fastigheten, och nästan alla vägar och villor ligger än i dag kvar enligt den ursprungliga planen. I kvarteret Holmia, som bebyggdes efter 1906, har villorna enligt Wikipedia till stor del kvar sina ursprungliga exteriörer i nationalromantik, jugendstil och jugendbarock. Radhusen i kvarteret Tegen större och mindre uppfördes 1908–1909. Herserud köptes på tidigt 1900-tal av ett bolag och styckades i villatomter, som började säljas 1906. Den förste köparen var skulptören Carl Milles. Islinge villasamhälle bildades 1905 av bergsingenjören Carl Gustaf Dahlerus, ägare till Islinge gård, och ingick inte i Hallmans plan. Området norr om Norra Kungsvägen fick stadsplan 1932 och delen söder om vägen 1969, för fritt liggande hus i högst två våningar. Husen ligger enligt Wikipedia huvudsakligen högt, på de två kullar som omger Islingeviken.",
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
        "Byggperiod enligt källorna: Hersby villor från 1906 (stadsplan 1907/1913), Herserud tomtförsäljning från 1906, Islinge villasamhälle från 1905 med stadsplaner 1932 och 1969. Hustyper: villor, i Hersby även radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Lidingö stad.",
    },
    primaryKeyword: "takläggare Hersby",
    lat: 59.3637,
    lng: 18.1485,
    nearbyLocations: ["Lidingö", "Sticklinge", "Mölna"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "De tidigaste villorna i Hersby och Herserud är i dag omkring 110–120 år gamla. På så gamla hus kan taket ha lagts om flera gånger, och hur underlaget ser ut i dag går inte att se från gatan. I Islinge och i de kvarter som bebyggdes senare är husen yngre, och åldern skiljer sig från tomt till tomt. Radhus delar anslutningar med grannens tak, och de behöver utföras så att taken fungerar ihop. Om ett byte av material eller kulör kräver lov eller anmälan avgör Lidingö stad. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Mälarhöjden är en stadsdel i Söderort i Stockholm. Den ligger vid Mälaren, ingår i Hägersten-Älvsjö stadsdelsområde och gränsar till Hägersten, Västertorp, Fruängen och Bredäng, med vattengräns mot Ekerö kommun. Stadsdelen är enligt Wikipedia mycket kuperad, och den högsta punkten, vid Backvindeln, ligger knappt 72 meter över havet. Långt in på 1940-talet fanns här flera äldre gårdar, bland dem Pettersbergsgården, Johannisdalsgården och Slättens gård. Pettersberg var en sjökrog vid Mälaren, känd från 1772. Från 1890-talet byggdes sommarhus i området, och samhället som växte fram kallades Fridhems villastad, efter lägenheten Fridhem som hade styckats av redan 1880. Till och från innerstaden reste man med ångbåt till Fridhemsbryggan, tills en spårvägslinje öppnades 1913. Den 1 januari 1914 fastställdes Mälarhöjden som postadress, eftersom Fridhem var ett ortnamn som fanns på flera håll i landet. Byggandet var särskilt omfattande på 1920-talet, då en stor del av Johannisdalsgårdens tidigare mark bebyggdes. Området söder om Mälarhöjdsvägen och öster om Ugglemossvägen började bebyggas då, och samtidigt uppfördes ett trettiotal småstugor kring Johannisdals gård. På 1930-talet byggdes enligt Wikipedia en rad hus i funkisstil vid Pettersbergsvägens västra del, och tre visningshus från Stockholmsutställningen 1930 flyttades till Båtsmansklevet och Båtsmanskroken. Området strax väster om Ugglemossvägen började byggas på 1960-talet.",
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
        "Byggperiod enligt källorna: sommarhus från 1890-talet, särskilt omfattande byggande på 1920-talet, funkishus på 1930-talet, och området väster om Ugglemossvägen från 1960-talet. Hustyper: villor, småstugor och enstaka flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Mälarhöjden",
    lat: 59.3005,
    lng: 17.9557,
    nearbyLocations: ["Stockholm", "Hägersten"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "I Mälarhöjden står hus från fyra skeden: sommarvillor från tiden kring sekelskiftet 1900, som i dag är runt 120–130 år gamla, villor och småstugor från 1920-talet, runt 100 år, funkishus från 1930-talet, runt 90 år, och hus från 1960-talet, runt 60 år. På hus som är hundra år eller mer kan taket ha lagts om flera gånger. Det som avgör skicket är när det senast gjordes och hur underlaget ser ut i dag, inte när huset byggdes. I den kuperade terrängen ligger tomterna dessutom på olika höjd, så åtkomsten till taket skiljer sig från hus till hus. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "Byggperiod enligt källorna: villor från 1910-talet, med en majoritet från 1920- till 1960-talet. Radhusen vid Vivstavarvsvägen från tidigt 1950-tal, radhusen vid Långåkersvägen 1964–1970. Hustyper: villor, radhus och flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Stureby",
    lat: 59.2746,
    lng: 18.0558,
    nearbyLocations: ["Stockholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Flertalet villor i Stureby är i dag mellan runt 60 och 100 år gamla, radhusen vid Vivstavarvsvägen runt 75 år och radhusen vid Långåkersvägen runt 55–60 år. I ett villasamhälle som har vuxit fram hus för hus säger gatans ålder lite om det enskilda taket. Två grannhus från samma decennium kan ha helt olika tak i dag, det ena omlagt och det andra inte. Där taket inte har bytts på länge är det underlagspapp, läkt, plåtdetaljer och hängrännor som brukar behöva ses över. I en radhuslänga ligger taken i ett sammanhang, och ett takbyte på ett hus berör anslutningarna mot grannarna på båda sidor. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Resarö är en omkring fyra kilometer lång ö och en tätort i Vaxholms kommun. Namnet är belagt sedan 1303, då en källa på latin nämner \"in risarnum\", på Resarö. På ön ligger Ytterby gruva. År 1787 hittade löjtnanten Carl Axel Arrhenius, som var förlagd vid Vaxholms fästning, en ovanligt tung svart sten här, och den fick senare namnet gadolinit. Ur gruvans mineral har enligt Wikipedia nio grundämnen isolerats och identifierats, och fyra av dem har namn efter platsen: yttrium, ytterbium, terbium och erbium. Brytningen av fältspat upphörde 1933. Villabebyggelsen började med Ytterbystrand, ett villaområde som häradshövdingen och advokaten Birger Svenonius grundade 1903. Resarö kapell, en monteringsfärdig vandringskyrka, invigdes på ön 1968. I slutet av 1900-talet förvandlades Resarö enligt Wikipedia från sommarö till villaförort, med allt fler permanentboende. Så sent som 1990 räknade SCB bebyggelsen på öns västra del som en egen småort, med 263 invånare, men fem år senare hade den vuxit ihop med tätorten. Enligt hitta.se är villorna och kedjehusen vid Ytterbyvägen främst byggda på 1970- och 1980-talen, husen vid Björkviksvägen på 1920- och 2000-talen och husen på Resarö i övrigt på 1980- och 2000-talen.",
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
        "Byggperiod enligt källorna: Ytterbystrand från 1903, villorna och kedjehusen vid Ytterbyvägen främst 1970- och 1980-tal, Björkviksvägen 1920- och 2000-tal, och övriga Resarö 1980- och 2000-tal. Hustyper: villor och kedjehus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Vaxholms kommun.",
    },
    primaryKeyword: "takläggare Resarö",
    lat: 59.4308,
    lng: 18.3333,
    nearbyLocations: ["Vaxholm"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Byggåren visar att Resarö har hus från tre skeden bredvid varandra: sommarvillornas tid, 1970- och 1980-talens villor och kedjehus och 2000-talets hus. Villorna och kedjehusen vid Ytterbyvägen är i dag runt 40–55 år gamla, de äldsta husen vid Björkviksvägen runt hundra år och 2000-talets hus runt 20 år. Taken kan redan ha lagts om, på de äldsta husen flera gånger, och på de yngsta är det för tidigt att tala om takbyte. Vad som behöver göras går bara att säga hus för hus. På kedjehus ligger taket dikt an mot grannens, och den anslutningen behöver planeras ihop med grannens del. Om ett byte av material eller kulör kräver lov eller anmälan avgör Vaxholms kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
        "Bor du på Resarö och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
      ],
    },
  },
  {
    slug: "duvbo",
    name: "Duvbo",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Duvbo, Hästhagen och Tulemarken i Sundbyberg, där tomterna började säljas 1899. Kostnadsfri takkontroll.",
    longDescription:
      "Duvbo är en stadsdel i Sundbyberg som enligt Wikipedia domineras av cirka 300 äldre villor, med en mindre andel flerbostadshus. I öster ligger Centrala Sundbyberg och i väster Rissne, och i norr skiljer ett grönområde Duvbo från flerbostadshusen i Hallonbergen. Samhället grundades som en förstad till Stockholm längs Västeråsbanan. Bolaget AB Hem på landet, med Carl Alm som verkställande direktör, köpte Dufvebols gård, lät kartlägga marken och styckade den i tomter på cirka 1 000–1 200 kvadratmeter. Sommaren 1899 började tomterna säljas, och den 3 juli 1903 blev Duvbo ett eget municipalsamhälle i dåvarande Spånga landskommun. År 1923 köpte municipalfullmäktige mark från Rissne ägor, och öster om det gamla Duvbo växte Nya Duvbo fram på 98 tomter. Vid nyåret 1949 fördes Duvbo över till Sundbybergs stad. Enligt Wikipedia byggdes Duvbo före privatbilismens genombrott, med smala och slingrande gator. Nästan alla villor har fått omfattande tillbyggnader, några ursprungliga hus har rivits och ersatts av nya, och en del tomter har styckats. Riksantikvarieämbetet utsåg 1987 Duvbo till ett bostadsområde av riksintresse. Till Duvbo räknas ofta de cirka 50 villorna i Hästhagen, åtta kvarter med namn efter träd som stadsplanelades 1925. Norr om Tulegatan ligger Tulemarken, som enligt Wikipedia i första hand bebyggdes med funkisvillor under 1930-talet.",
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
        "Byggperiod enligt källorna: tomtförsäljning från 1899, Nya Duvbo från 1923, Hästhagen stadsplanelagt 1925 och Tulemarken under 1930-talet. Hustyper: äldre villor, en mindre andel flerbostadshus och funkisvillor i Tulemarken. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sundbybergs stad.",
    },
    primaryKeyword: "takläggare Duvbo",
    lat: 59.3676,
    lng: 17.9643,
    nearbyLocations: ["Sundbyberg"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Tomterna i det gamla Duvbo började säljas 1899, och de tidigaste husen kan därför vara drygt 120 år gamla. Husen i Nya Duvbo och Hästhagen hör hemma i 1920-talet och är i dag runt 100 år, medan funkisvillorna i Tulemarken är runt 90 år. Efter så lång tid kan taken redan ha lagts om, och årtalet på huset räcker inte för att bedöma hur taket mår. På ett hus som har byggts till möts takytor från olika tider. Skarvarna, ränndalarna och plåten där tillbyggnaden ansluter till det ursprungliga huset är ställen som är värda en noggrann titt, liksom skorstenar och hängrännor. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sundbybergs stad. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Smedslätten i Bromma har sitt namn efter Smedslättens gård nära Mälaren. Stadsdelen hör till Bromma trädgårdsstad och ligger sydväst om Äppelviken och öster om Ålsten, med Nyängsvägen som gräns i norr och Alviksvägen som huvudväg genom området. En stor del av stadsdelen är enligt Wikipedia tät blandskog, och Nockebybanan stannar vid Klövervägen och Smedslätten. År 1922 köpte Stockholms stad en stor del av gårdens mark av Magna Sunnerdahl, och samma år byggdes de första villorna. Stadsplanen från 1922 ville enligt Wikipedia efterlikna en småstadsgata: husen ställdes längs gatulinjen, så att trädgårdarna på baksidan tillsammans bildade en grön mitt i varje kvarter. Ett trettiotal av de tidiga villorna uppfördes av monteringsfärdiga byggelement. Stadsbyggnadskontorets arkitekt Thure Bergentz ritade 20 typhus för Smedslätten 1922–1924, och enligt Wikipedia står några av dem kvar i ursprunglig utformning. Flertalet av de övriga husen ritades av Edvin Engström och Gustaf Pettersson vid stadens egnahemsbyrå. Spårvägen förlängdes hit den 1 oktober 1923. Marken närmast gården bebyggdes senare. Från 1938 kom hyreshus och radhus längs Havsfruvägen, innan kriget avbröt byggandet. Åren 1962–1964 uppfördes 83 radhus kring gården, vid Skogsfrugränd och Flädermorsbacken, efter ritningar av Jon Höjer och Sture Ljungqvist. Vid Bergviksvägen blev 33 fastigheter av kedje- och radhustyp färdiga 1962.",
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
        "Byggperiod enligt källorna: villor från 1922 och under 1920-talet, hyreshus och radhus från 1938, och radhus/kedjehus 1962–1964. Hustyper: villor (bland dem typhus), radhus, kedjehus och enstaka hyreshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad.",
    },
    primaryKeyword: "takläggare Smedslätten",
    lat: 59.3208,
    lng: 17.9646,
    nearbyLocations: ["Stockholm", "Ålsten"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Villorna från 1920-talets första år är i dag runt 100 år gamla, radhusen från 1938 närmar sig 90 och husen från 1960-talets första hälft är drygt 60 år. På hundraåriga hus kan taken redan ha lagts om, och då är det den senaste omläggningen som avgör skicket, inte byggåret. På hus från 1960-talet är det underlagspapp, läkt, plåtdetaljer och hängrännor som brukar behöva ses över, om det inte redan är gjort. På radhus och kedjehus hänger taken ihop med grannens, och anslutningen mellan husen behöver utföras så att den fungerar åt båda håll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
        "Byggperiod enligt källorna: egnahem 1905–1912, en andra expansion på 1920- och 1930-talen, och förtätning sedan 1950-talet. Hustyper: villor (egnahem), med några få flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Södertälje kommun.",
    },
    primaryKeyword: "takläggare Pershagen",
    lat: 59.1528,
    lng: 17.6563,
    nearbyLocations: ["Södertälje"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Egnahemmen från 1905–1912 är i dag runt 115–120 år gamla, och husen från den andra expansionen runt 90–105 år. Mellan dem står yngre hus på tomter som har styckats av sedan 1950-talet, och därför kan två grannhus i Pershagen skilja sig åt med flera decennier. På de tidigaste husen kan taken redan ha lagts om. Husets byggår berättar alltså inte hur taket mår i dag. Det gör underlaget, plåten kring skorsten och genomföringar och hängrännornas skick. Om ett byte av material eller kulör kräver lov eller anmälan avgör Södertälje kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Gladö kvarn är en tätort i Huddinge kommun, på norra sidan av Kvarnsjön. Enligt Wikipedia består den huvudsakligen av villa- och fritidshusbebyggelse. Lissma är en by och gård i kommunens sydöstra del, och norr om byn och Lissmasjön ligger Kvarntorp, som Wikipedia beskriver som ett småhusområde för permanent- och fritidsboende. Huddinge kommun kallar kommundelsområdet Gladö-Lissma och skriver att det innefattar en stor del skog och naturmark. Namnet är gammalt. En vattenkvarn som hette Gladö Kvarn nämns redan 1331 i en förteckning över Strängnäs domkyrkas tillgångar. På 1500-talet anlades en vattendriven såg här, och 1527 gav Gustav Vasa gården till fogden Erik Larsson mot hundra tolfter sågade bräder om året. Mjölkvarnen, som kom senare, revs på 1940-talet, och fundamentet sitter kvar i bäckfåran. Bynamnet Lissma är känt sedan 1462, och 1916 styckades egendomen där till småbruk. På 1950-talet styckades marken norr om Kvarnsjön och på Hästvretens halvö till tomter för fritidshus. Sedan dess har enligt Wikipedia allt fler fritidshus blivit permanentbostäder. År 2015 fanns 442 fastigheter i Gladö kvarn: 269 var permanent bebodda, 158 var fritidshus och 15 stod obebodda. En detaljplan vann laga kraft i oktober 2013, och kommunen bygger ut vatten och avlopp och bygger om vägnätet i etapper. Huddinge kommun skriver i dag att omvandlingen fortsätter och att den hittills har gett omkring 100 nya bostäder.",
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
        "Byggperiod enligt källorna: tomter för fritidshus styckades på 1950-talet, och omvandlingen till permanentboende har pågått sedan dess med en detaljplan från 2013. Hustyper: villor och fritidshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun.",
    },
    primaryKeyword: "takläggare Gladö kvarn",
    lat: 59.1942,
    lng: 17.9855,
    nearbyLocations: ["Huddinge"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Fritidshus som byggdes när tomterna styckades på 1950-talet är i dag runt 70 år gamla, medan husen som har kommit till under omvandlingen är betydligt yngre. Taken kan redan ha lagts om, och husets ålder säger därför inget säkert om takets skick. När ett fritidshus byggs till eller byggs om för att bo i året om möts tak från olika tider, och skarvarna mellan dem är värda en extra titt. Om ett byte av material eller kulör kräver lov eller anmälan avgör Huddinge kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
      "Lohärad och Estuna är två socknar nordväst om Norrtälje, på var sin sida om sjön Erken. Båda har medeltida ursprung och hör sedan 1971 till Norrtälje kommun. Lohärads socken beskrivs i Wikipedia som en småkuperad skogsbygd med mindre slättområden i sydost och nordväst. Här finns 19 mindre byar, bland dem Gribby, Hållsta, Nyckelby och Söderby, och fem sjöar: Alsnaren, Falken, Fyrsjön, Trehörningen och Viksjön. Namnet skrevs Lohärrädhe år 1337. Lohärads kyrka ligger omkring tolv kilometer från Norrtälje. Den första kyrkan byggdes under första delen av 1200-talet, och på 1670-talet rasade tornet och krossade vapenhuset. Estuna socken är enligt Wikipedia en kuperad slättbygd med kalkrik moränlera och inslag av skog. Söder om Erken breder ett starkt uppodlat slättlandskap ut sig. När socknen kartlades på 1600-talet bestod den av 28 byar. Vid Erken ligger Stjärnholm, där huvudbyggnaden uppfördes i början av 1700-talet, och Norra Malma, en herrgård som 1928 donerades till Uppsala universitet. Åren 1950–1951 byggdes forskningsstationen Erkenlaboratoriet ett stycke väster om gården. Tätorten Svanberga ligger vid Erken, tio kilometer norr om Norrtälje, där riksväg 76 passerar. Här fanns en gästgivargård från 1600-talet. Enligt hitta.se är husen i Lohärad mest byggda på 1980- och 2000-talen och husen vid Svanbergavägen på 1970- och 1980-talen.",
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
        "Byggperiod enligt källorna: Lohärad mest från 1980- och 2000-talet, och husen vid Svanbergavägen från 1970- och 1980-talet. Hustyper: villor och lantbruk. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun.",
    },
    primaryKeyword: "takläggare Lohärad",
    lat: 59.808,
    lng: 18.5597,
    nearbyLocations: ["Norrtälje"],
    extraSections: [
      {
        heading: "Vad det betyder för taket",
        text: "Husen från 1970- och 1980-talen är i dag runt 40–55 år gamla, medan husen från 2000-talet är runt 20 år. På ett hus från 1970-talet kan taket redan ha lagts om. Har det inte skett är det underlagspapp, läkt, genomföringar och plåtanslutningar som behöver ses över först, eftersom det är där ett tak brukar släppa in vatten. På ett hus från 2000-talet handlar det oftare om tillsyn: rensa hängrännor, se över plåt och tätningar kring skorsten och ventilation. På ett lantbruk står bostadshus, ladugård och uthus ofta med tak från olika år, och varje tak får sin egen bedömning. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun. Varje hus får en egen takkontroll och ett eget pris.",
      },
    ],
    process: {
      steps: [
        "**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
        "**Fast pris** i offerten.",
        "**Utförande enligt AMA.**",
      ],
      paragraphs: [
        "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
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
    uniqueFAQ: {"question":"När byggdes husen i Höglandet?","answer":"Byggperiod enligt källorna: stadens mark 1925–1930, funkisvillor vid Grönviksvägen 1930-tal, äldre hus i Grönvik. Hustyper: villor, ofta med två fulla våningar, och äldre stugor i Grönvik. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Höglandet",
    lat: 59.3235,
    lng: 17.9369,
    nearbyLocations: ["Ålsten","Nockeby","Smedslätten"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Husen på stadens mark i Höglandet är i dag mellan 96 och drygt 100 år gamla, och funkisvillorna längs Grönviksvägen runt 90 år. Stugorna i Grönvik är ännu äldre. Så gamla hus har i regel fått taket omlagt, ibland flera gånger, och byggåret berättar därför inget om hur taket mår. Svaret finns i underlaget, i plåtarbetet runt skorstenar och takkupor och i hur vattnet leds bort. På en brant tomt behöver ställning och materialtransport planeras för just det huset, och ett tvåvåningshus kräver högre ställning än ett envåningshus. Där hus från olika sekler står längs samma väg skiljer sig förutsättningarna mycket från tomt till tomt. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Höglandet och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Skärsätra?","answer":"Byggperiod enligt källorna: villor från 1909 (ett 70-tal fanns redan 1907), flerbostadshus 1962–1966, Törnrosvägen 1940- och 1990-tal, Dalénum från 2010. Hustyper: mindre trävillor, flerbostadshus och nya bostäder i Dalénum. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Lidingö stad."},
    primaryKeyword: "takläggare Skärsätra",
    lat: 59.3460,
    lng: 18.1693,
    nearbyLocations: ["Lidingö","Mölna","Brevik, Käppala och Gåshaga"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villastadens första hus har stått i upp till 115 år, och en del hus är äldre än så. Husen från 1940-talet är omkring 80 år och de från 1990-talet omkring 30. Ett hus som har hunnit bli hundra år har nästan alltid fått nytt tak någon gång på vägen. Vad som ligger där nu, och hur det mår, går bara att avgöra genom att titta på just det taket. En liten stuga som har vuxit till villa i flera steg har ofta tak från olika tider. Där en tillbyggnad möter den ursprungliga huskroppen bildas vinklar och anslutningar, och det är ställen där vatten gärna letar sig in om plåt och underlag inte hänger ihop. Om ett byte av material eller kulör kräver lov eller anmälan avgör Lidingö stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Skärsätra och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Stora Mossen?","answer":"Byggperiod enligt källorna: 1922–1939, drygt hälften 1928–1929, tillskott 1951–1952 och 2005–2006. Hustyper: villor (nästan två tredjedelar av bebyggelsen), parhus och flerfamiljshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Stora Mossen",
    lat: 59.3346,
    lng: 17.9661,
    nearbyLocations: ["Ålsten","Smedslätten"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De tidigaste villorna i Stora Mossen har passerat 100 år, den stora gruppen från 1928–1929 är i dag 97–98 år och husen från 1930-talets andra hälft runt 90 år. Husen vid Mosskroken är omkring 20 år. På de äldre villorna kan taket ha bytts både en och två gånger, så det är dagens skick som räknas, inte byggåret: hur underlaget ser ut, om plåten runt skorsten och kupor är tät och om rännorna för bort vattnet. I en stadsdel som källan beskriver som mycket enhetlig påverkar valet av material och kulör hur huset passar in bland grannhusen. Stäm därför av vad som gäller innan du bestämmer dig. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. På parhus delas taket med grannen, och arbetet vid skarven behöver planeras tillsammans. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Stora Mossen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Södra Ängby?","answer":"Byggperiod enligt källorna: 1933–1939, där delen öster om Zornvägen var utbyggd 1938 och den västra delen klar senare. Hustyper: villor i funktionalistisk stil. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Södra Ängby",
    lat: 59.3412,
    lng: 17.8958,
    nearbyLocations: ["Ängby","Blackeberg"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna i Södra Ängby byggdes under sju år och är i dag mellan 87 och 93 år gamla. På hus i den åldern kan taket ha lagts om mer än en gång, och husets ålder säger därför lite om hur taket mår. Det avgörande är när den senaste omläggningen gjordes, hur den utfördes och hur avvattning, plåtdetaljer och anslutningar mot skorsten och vägg ser ut i dag. I ett område med skyddsbestämmelser lönar det sig att ta reda på vad detaljplanen säger innan något bestäms. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Där tallar står nära husen samlas barr i hängrännor och stuprör, och de behöver rensas för att vattnet ska rinna undan. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Södra Ängby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Enskededalen?","answer":"Byggperiod enligt källorna: från 1920 (självbyggeri 1920–1922), Kärringstan huvudsakligen 1920- och 1930-tal, radhusen i kvarteret Barnmorskan 2008–2010. Hustyper: småhus (egnahem), dubbelhus, små sammanbyggda flerfamiljshus, fristående villor i Kärringstan och radhus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Enskededalen",
    lat: 59.2818,
    lng: 18.1055,
    nearbyLocations: ["Enskede","Skarpnäck"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småhusen från 1920-talets början är i dag drygt 100 år gamla, och villorna i Kärringstan mellan knappt 90 och drygt 100 år. Radhusen i kvarteret Barnmorskan är runt 16–18 år. På de äldre husen kan taket ha lagts om flera gånger, så husets ålder avslöjar inte hur taket mår. Det som räknas är vad som finns under ytan i dag och hur plåtdetaljer, skorstensanslutningar och hängrännor har klarat sig sedan senaste omläggningen. I ett dubbelhus delar två hushåll på samma tak, och det som görs på den ena halvan behöver anslutas till den andra. Då är det ofta enklast att grannarna planerar tillsammans. På hus med inredd vind går takfönster, kupor och skorstenar genom taket, och varje sådan genomföring behöver kontrolleras. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Enskededalen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Tallkrogen?","answer":"Byggperiod enligt källorna: småstugorna 1933–1945 (Olympiaområdet 1933–1934, kring Tallkrogsvägen 1935), hyreshusen kring Torögatan 1949–1952. Hustyper: småstugor från självbyggeri i ungefär tio hustyper, samt hyreshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Tallkrogen",
    lat: 59.2715,
    lng: 18.0861,
    nearbyLocations: ["Enskede","Skarpnäck"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småstugorna i Tallkrogen byggdes mellan 1933 och 1945 och är i dag mellan drygt 80 och drygt 90 år gamla. Taken kan redan ha lagts om, och husets ålder säger därför lite om hur taket mår. Det går bara att avgöra på plats, genom att se på underlag, läkt, plåtdetaljer, skorstensanslutning och hängrännor. En stuga som från början hade två rum kan ha fått en tillbyggnad eller en inredd övervåning längre fram. Då möts tak från olika tider, och skarven mellan gammalt och nytt är ett ställe som är värt att se över. Takkupor och takfönster som har satts in i efterhand är andra sådana ställen. När ett tiotal hustyper återkommer gata efter gata syns ett nytt tak bredvid grannarnas. Ta därför reda på vad som gäller innan du bestämmer dig. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Tallkrogen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Viksberg och Viksäter?","answer":"Byggperiod enligt källorna: egnahemsbildningar 1914, sportstugor på Holmen från 1930-talet, Viksäter 1960-talet, småhusplaner 2004 och 2013–2015. Hustyper: egnahem, fritidshus som blivit åretruntbostäder, villor, samt småhus och radhus i de senaste planerna. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Södertälje kommun."},
    primaryKeyword: "takläggare Viksberg",
    lat: 59.2498,
    lng: 17.6142,
    nearbyLocations: ["Södertälje","Järna"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Här ligger hus från ett helt sekel sida vid sida. Egnahemmen kan vara drygt 100 år, sportstugorna på Holmen upp emot 90 år och fritidshusen i Viksäter runt 60 år, medan husen längs Viksbergsvägen är högst ett tjugotal år. På de äldre husen kan taken redan ha lagts om, så det är dagens skick som räknas och inte byggåret. Ett fritidshus som har byggts ut för att bo i året om har ofta fått tak i etapper. Där den nya delen möter den gamla behöver underlag och plåt höra ihop, och det stället bör ses över noga. Om ett byte av material eller kulör kräver lov eller anmälan avgör Södertälje kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Viksberg eller Viksäter och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Äppelviken?","answer":"Byggperiod enligt källorna: villor huvudsakligen 1913–1922 (östra delen 1913–1919, västra 1917–1923), radhusen i kvarteret Drivbänken 1919–1920. Hustyper: villor, 43 radhus samt flerbostads- och affärshus längs Alviksvägen och Västerled. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Äppelviken",
    lat: 59.3262,
    lng: 17.9711,
    nearbyLocations: ["Ålsten","Smedslätten"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Villorna i Äppelviken är i dag mellan drygt 100 och 113 år gamla, och radhusen i Drivbänken drygt 105 år. På hus i den åldern kan taken redan ha lagts om, på en del kanske flera gånger, och husets ålder säger därför lite om vad som ligger där i dag. Det som går att bedöma är hur underlag, läkt, plåtdetaljer, skorstensanslutningar och hängrännor ser ut nu. Enligt Wikipedia har många av villorna fått tillbyggnader. Där en tillbyggnad möter det ursprungliga huset finns skarvar mellan takdelar från olika tider, och de är värda en extra titt. På radhus hänger taken ihop med grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. När Stadsmuseet har klassat ett kvarter bör den som tänker byta material eller kulör först ta reda på vad som gäller. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Äppelviken och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Östertälje?","answer":"Byggperiod enligt källorna: villor från sekelskiftet och 1960-talet, radhus i Apollofjärilen 1959–60, Lugnet från 2005. Hustyper: mest villor, radhus och ett mindre antal flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Södertälje kommun."},
    primaryKeyword: "takläggare Östertälje",
    lat: 59.1851,
    lng: 17.6585,
    nearbyLocations: ["Södertälje","Järna"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "I Östertälje står hus från flera skeden nära varandra. Villorna från sekelskiftet är i dag runt 125 år gamla, radhusen i Apollofjärilen drygt 65 år, 1960-talets villor runt 60 år och husen i Lugnet runt 20 år. På de tidiga villorna kan taken redan ha lagts om, kanske mer än en gång, och inte heller på ett hus från 1960-talet går det att utgå från byggåret. Det som räknas är när taket senast lades om och hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag. På radhus hänger taken ihop med grannens, och anslutningen behöver utföras så att den fungerar ihop med grannens tak. Om ett byte av material eller kulör kräver lov eller anmälan avgör Södertälje kommun. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Östertälje och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Bromsten?","answer":"Källorna anger när villatomterna började säljas (1899), inte byggår för de enskilda husen. Hustyper: villor, radhus, bostadsrätter och hyreslägenheter. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Bromsten",
    lat: 59.3828,
    lng: 17.9156,
    nearbyLocations: ["Spånga","Bällsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De första villatomterna såldes 1899, och hus från municipalsamhällets första år är i dag runt 120 år gamla. Källorna anger inga byggår för de övriga husen, men villor har tillkommit långt senare, bland annat på de gamla kyrktomterna. Hus av mycket olika ålder kan alltså stå intill varandra, och grannens tak säger lite om ditt eget. På ett hus med många år bakom sig kan taket redan ha lagts om, och husets ålder säger därför lite om takets skick. Villor som har byggts till i omgångar får skarvar där takytor från olika tider möts, och sådana möten, liksom ränndalar och anslutningar mot skorsten, är värda en noggrann titt. På radhus hänger taken ihop med grannens. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Bromsten och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Svedmyra?","answer":"Byggperiod enligt källorna: småhus 1930–1950, flerfamiljshus 1940- och 1950-tal. Hustyper: småstugor och villor (typhus) i öster, flerfamiljshus väster och öster om Enskedevägen. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Svedmyra",
    lat: 59.2775,
    lng: 18.0671,
    nearbyLocations: ["Stureby","Tallkrogen"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småhusen i Svedmyra byggdes mellan 1930 och 1950 och är i dag mellan 75 och 95 år gamla. Taken kan redan ha lagts om, och det som avgör skicket är vad som gjordes vid det tillfället, inte husets byggår. Underlagspapp, läkt och plåtdetaljer åldras olika fort beroende på material och utförande. En småstuga som byggdes efter en typritning har sällan sett likadan ut sedan dess. Har huset genom åren fått takkupor, takfönster eller en tillbyggnad ger varje sådan ändring nya anslutningar i taket. Det är vid kupornas sidor, runt takfönster och där tillbyggnaden möter det ursprungliga huset som en takkontroll behöver vara noggrann. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Svedmyra och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Eneby?","answer":"Byggperiod enligt källorna: villatomter 1904–1914, småstugeområdet från 1939, sex villatomter efter 1968. Hustyper: småstugor och villor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Eneby",
    lat: 59.3599,
    lng: 17.9084,
    nearbyLocations: ["Spånga","Bällsta"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Småstugorna i Eneby började byggas 1939 och är i dag runt 85 år gamla. Står det kvar hus från tomtförsäljningen 1904–1914 är de över 110 år, och villorna på gårdstomten är från tiden efter 1968, alltså högst knappt 60 år. Taken kan redan ha lagts om, på de tidigaste husen kanske flera gånger, och därför går det inte att läsa av takets skick i husets byggår. En takkontroll handlar i stället om det som finns i dag: hur underlaget ser ut, om plåten kring skorsten och ventilation sluter tätt och om hängrännor och stuprör leder bort vattnet. På ett litet hus märks en tillbyggnad eller en ny kupa tydligt i taket, och där nytt möter gammalt behöver anslutningen vara rätt gjord. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Eneby och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Bällsta?","answer":"Byggperiod enligt källorna: 1940-tal (stadens köp 1938), villastadens tomter 1905–1908. Hustyper: små trähus, mest enplansstugor. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Bällsta",
    lat: 59.3633,
    lng: 17.9257,
    nearbyLocations: ["Eneby","Ulvsunda"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "Stugorna i Bällsta byggdes på 1940-talet och är i dag runt 80 år gamla. Taken kan redan ha lagts om, och husets ålder säger därför inget säkert om hur taket mår. Det gör däremot underlaget, läkten, plåten runt skorstenen och hängrännorna, och dem går det att bedöma vid en takkontroll. När husen i ett område står i rak linje med samma sida mot gatan syns varje tak tydligt från trottoaren. Eftersom området dessutom är utpekat som värdefull kulturmiljö är det klokt att ta reda på vad som gäller innan material eller kulör väljs. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Bällsta och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
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
    uniqueFAQ: {"question":"När byggdes husen i Ulvsunda?","answer":"Byggperiod enligt källorna: villatomter från 1902–1903, de flesta egna hemmen på 1920-talet, fortsatt på 1930-talet, flerbostadshus från 1940-talet. Hustyper: egna hem (öppen eller kopplad bebyggelse i högst två våningar) och flerbostadshus. Taken kan redan ha lagts om, så skicket bedöms alltid vid en kostnadsfri takkontroll. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad."},
    primaryKeyword: "takläggare Ulvsunda",
    lat: 59.3374,
    lng: 17.9601,
    nearbyLocations: ["Ålsten","Stora Mossen"],
    extraSections: [{ heading: "Vad det betyder för taket", text: "De flesta egna hemmen i Ulvsunda är från 1920-talet och i dag runt 100 år gamla, medan husen från 1930-talet är omkring 90 år. Finns det hus kvar från villastadens tid före 1908 har de passerat 115 år. På så gamla hus kan taket ha lagts om mer än en gång, och det säger mer om skicket när och hur det senast gjordes än när huset byggdes. På hus med verandor, torn eller andra utbyggnader består taket av flera ytor som möts i vinklar, och det är i vinklarna, vid ränndalar och plåtanslutningar, som en kontroll behöver vara noggrann. Är huset kopplat med grannens behöver arbetet vid skarven fungera ihop med grannens tak. Om ett byte av material eller kulör kräver lov eller anmälan avgör Stockholms stad. Varje hus får en egen takkontroll och ett eget pris." }],
    process: { steps: ["**Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.","**Fast pris** i offerten.","**Utförande enligt AMA.**"], paragraphs: ["Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.","Bor du i Ulvsunda och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar."] },
  },
];

export const getLocationBySlug = (slug: string) =>
  locations.find((l) => l.slug === slug);
