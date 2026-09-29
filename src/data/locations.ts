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
      "Takläggare på Blidö — takbyte, takrenovering och takomläggning. Vi tar oss ut med material och utrustning för alla typer av takprojekt i skärgården.",
    longDescription:
      "Blidö utsätts för kraftig vind och saltluft året runt — förhållanden som sliter hårt på tak. Många fastighetsägare på Blidö upptäcker för sent att underlagspappen gett vika eller att plåtbeslagen rostat. Oavsett om din fastighet ligger vid bryggan eller djupt inne på ön — vi når dig och levererar ett tak som står emot Roslagens väder i decennier.",
    extraContent:
      "Vi planerar materialtransporten till Blidö via Blidöleden som en del av offerten, så du behöver inte arrangera något själv.",
    uniqueFAQ: {
      question: "Hur når RoslagsTak Blidö med material för takbyte?",
      answer:
        "Material levereras till ön via Blidöleden. All logistik ingår i offerten — du behöver inte arrangera något själv.",
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
      "Ljusterö är Roslagens största ö, med allt från moderna permanentboenden till äldre sommarstugor med originaltak från 60-talet. Klimatet här är påfrestande — saltstänk, höststormar och fuktiga vintrar bryter ner takmaterial snabbare än på fastlandet. Dubbelfalsat plåttak eller TP20 med rätt underlag ger dig ett tak som håller i 40+ år, även i det tuffa skärgårdsklimatet. Vi sköter hela projektet — från takkontroll till färdigt tak — utan att du behöver koordinera materialtransporter.",
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
      "Takläggare på Yxlan — vi utför takbyte och takrenovering med transport av material direkt till Yxlan. TP20, pannplåt och dubbelfalsat.",
    longDescription:
      "Yxlan och Blidö hänger ihop via Blidöleden, men känslan av ytterskärgård är påtaglig. Här finns många charmiga äldre stugor med tak som börjat åldras — spruckna pannor, sliten underlagspapp och rostiga beslag. Vår styrka är att vi förstår skärgårdens förutsättningar: vi planerar materialtransport, anpassar tidsplanen efter väder och levererar ett resultat som håller mot vind och salt i årtionden.",
    extraContent:
      "På Yxlan finns många fritidshus som ägs av familjer som besöker ön under sommarhalvåret.",
    uniqueFAQ: {
      question: "Kan ni byta tak på Yxlan om jag inte är på plats?",
      answer:
        "Ja, vi utför ofta takbyten på Yxlan när fastighetsägaren inte är på plats. Vi dokumenterar arbetet med bilder och håller dig uppdaterad löpande. Takkontroll och offert kan göras vid ett separat besök, och nycklar kan överlämnas på plats.",
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
      "Furusund har anor som skärgårdsort och bebyggelsen speglar det — sekelskifteshus, klassiska sommarstugor och nyare villor. Många tak i Furusund har nått sin livslängd och behöver bytas eller renoveras. Vi finns regelbundet i Furusundsområdet och kan ofta kombinera projekt i närområdet, vilket ger dig ett fördelaktigt pris. Med vår kunskap om lokala förhållanden — från de salta vindarna till den fuktiga hösten — väljer vi material som verkligen håller. RoslagsTak är det självklara valet för fastighetsägare i Furusund som vill ha ett tak utan kompromisser.",
    extraContent:
      "Furusund fungerar som knutpunkt för öarna i mellersta skärgården, och vi passerar dagligen genom Furusund på väg ut till Blidö, Yxlan och öarna i ytterskärgården. Det innebär att vi ofta kan erbjuda fastighetsägare i Furusund ett förmånligt pris genom att samordna med pågående projekt i närheten. Kontakta oss för en kostnadsfri takkontroll i Furusund.",
    uniqueFAQ: {
      question: "Hur snabbt kan ni påbörja ett takbyte i Furusund?",
      answer:
        "Eftersom vi arbetar regelbundet i Furusundsområdet kan vi ofta påbörja arbetet inom 1–3 veckor efter beställning. Vi samordnar gärna med andra projekt i närheten, vilket kan ge ett förmånligt pris. Ring oss för att diskutera ditt projekt — vi ger alltid en realistisk tidsplan.",
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
      "Takläggare på Husarö — vi tar oss ut till Husarö med båt för takbyte och takrenovering med full utrustning. Specialister på öar utan bro.",
    longDescription:
      "Husarö nås med båt, och just därför drar sig många takfirmor för att ta sig hit. Inte vi. Öns exponerade läge gör att taken utsätts för extremt väder, vilket ställer höga krav på både material och utförande. Vi använder enbart beprövade lösningar som tål skärgårdens hårda påfrestningar. Får du en offert av oss ingår allt — transport, material, arbete och en garanti på 10 år.",
    extraContent:
      "Husarö är ett typexempel på vår specialisering — takbyten på öar som saknar vägförbindelse och bara nås med båt. Vi har utvecklat logistiklösningar för att transportera allt material sjövägen, från plåt och råspont till underlagspapp och beslag. Det innebär att du som fastighetsägare på Husarö slipper oroa dig för hur materialet ska komma fram. Vi löser allt — och priset du får i offerten är fast och komplett.",
    uniqueFAQ: {
      question: "Hur transporterar ni takmaterial till Husarö?",
      answer:
        "Vi transporterar allt material till Husarö sjövägen med egna logistiklösningar. Plåt, råspont, underlagspapp och verktyg — allt levereras direkt till ön. Transportkostnaden ingår i vår offert. Vi planerar leveranser noggrant för att minimera antalet transporter och hålla nere kostnaderna.",
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
      "Takläggare på Finnhamn — professionell takläggning i ytterskärgården. Vi når Finnhamn med båt för takbyte, TP20 och plåtarbeten.",
    longDescription:
      "Finnhamn är en av Stockholms skärgårds mest älskade öar — och de fastigheter som finns här förtjänar tak i toppskick. Det exponerade läget innebär att taken slits hårdare av vind, regn och saltluft. Resultatet blir ett tak som inte bara skyddar — det håller i generationer.",
    extraContent:
      "Finnhamn är populärt som naturhamn och utflyktsmål, men de bofasta och fritidshusägare som finns här behöver en takläggare som vågar ta sig ut. Vi når Finnhamn med båt och har gjort takbyten här med allt från TP20-plåt till pannplåt. Den speciella skärgårdsmiljön kräver extra omsorg i materialval — vi rekommenderar alltid korrosionsbeständig plåt och dimensionerade infästningar för att tåla de starka vindarna.",
    uniqueFAQ: {
      question:
        "Går det att byta tak på Finnhamn trots att ön saknar vägförbindelse?",
      answer:
        "Absolut. Vi tar uppdrag för takbyten på öar utan broförbindelse, även på Finnhamn. Allt material transporteras sjövägen och vi planerar arbetet för att minimera logistikkostnader. Resultatet blir ett tak av samma kvalitet som på fastlandet — med full garanti.",
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
      "Takläggare på Ingmarsö — takomläggning och takbyte med erfarenhet av öns logistik. Transport av material sjövägen ingår.",
    longDescription:
      "Ingmarsö har en aktiv skärgårdsgemenskap med både året-runt-boende och sommarfirare. Bebyggelsen varierar från äldre röda stugor till nyare fritidshus — och alla behöver tak som klarar skärgårdens klimat. Vi tar hand om hela processen åt dig — från takkontroll till färdigt tak, med fast pris och utan överraskningar.",
    extraContent:
      "Ingmarsö har ett levande samhälle med både permanentboende och säsongsboende. Vi ser ofta att äldre tak på Ingmarsö har betongpannor eller eternitplattor som behöver bytas ut. Vid takbyte på Ingmarsö rekommenderar vi ofta TP20 eller pannplåt — lätta material som ger lägre transportkostnad och lång livslängd. Vi hanterar även rivning och borttransport av gammalt takmaterial från ön.",
    uniqueFAQ: {
      question:
        "Hanterar ni bortforsling av gammalt takmaterial från Ingmarsö?",
      answer:
        "Ja, vi tar hand om allt — inklusive rivning, bortforsling och miljöriktig avfallshantering av gammalt takmaterial. Detta gäller även på öar som Ingmarsö dit vi transporterar material sjövägen. Allt ingår i det fasta priset du får i offerten.",
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
      "Takläggare på Högmarsö — takbyte, takrenovering och plåtarbeten. Vi når Högmarsö och hanterar all logistik för ditt takprojekt.",
    longDescription:
      "Högmarsö är en lugnare ö i mellersta Roslagen, men klimatet är lika krävande som i resten av skärgården. Fukt, mossa och salt bryter långsamt ner takmaterial som inte är anpassat för miljön. TP20-plåttak med rätt underlag är ofta det optimala valet här — hållbart, underhållsfritt och estetiskt tilltalande. Vi ordnar transport och logistik, du får ett tak som håller.",
    extraContent:
      "Högmarsö ligger nära Ljusterö och vi kombinerar ofta projekt på de två öarna. Det innebär att fastighetsägare på Högmarsö kan dra nytta av samordning och få ett förmånligt pris. Oavsett om du har en sommarstuga eller ett permanentboende rekommenderar vi en kostnadsfri takinspektion som utgångspunkt.",
    uniqueFAQ: {
      question:
        "Är det dyrare att byta tak på Högmarsö jämfört med fastlandet?",
      answer:
        "Inte nödvändigtvis. Vi samordnar ofta projekt på Högmarsö med andra jobb i skärgården, vilket håller nere logistikkostnaden. Transporttillägget för material är relativt litet tack vare Högmarsös närhet till Ljusterö. Begär en offert så ser du exakt vad det kostar — inga dolda tillägg.",
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
      "Takläggare på Svartlöga — vi tar oss ut till ytterskärgården med båt för takbyte och takrenovering. Specialist på öar utan broförbindelse.",
    longDescription:
      "Svartlöga ligger i ytterskärgården och nås med Waxholmsbåt — ett läge som avskräcker de flesta takfirmor. Men för oss på RoslagsTak är det vardag. Ditt tak på Svartlöga förtjänar samma kvalitet som på fastlandet — och det är precis vad vi levererar.",
    extraContent:
      "Svartlöga är en av de mer avlägsna öarna vi arbetar på, men avståndet avskräcker oss inte. Vi har utvecklat effektiva transportlösningar för att få ut plåt, råspont och verktyg till Svartlöga. Flera fastighetsägare på Svartlöga har valt oss just för att vi faktiskt tar oss dit.",
    uniqueFAQ: {
      question: "Finns det takläggare som verkligen tar sig ut till Svartlöga?",
      answer:
        "Ja — vi på RoslagsTak är specialiserade på takbyten på öar utan vägförbindelse, och Svartlöga är en av de platser vi regelbundet arbetar på. Vi transporterar allt material sjövägen och planerar projektet så att arbetet kan genomföras effektivt, oavsett väder. Ring oss så berättar vi mer.",
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
      "Takläggare på Söderöra — takbyte och takrenovering i norra skärgården. Vi når Söderöra med båt och hanterar all logistik.",
    longDescription:
      "Söderöra i norra skärgården är en ö med genuint skärgårdsliv och äldre bebyggelse som kräver takläggare med rätt erfarenhet. Den öppna havsmiljön gör att taken exponeras för starka vindar och salt stänk, vilket påskyndar slitage. Med oss får du en takläggare som tar sig dit andra inte vågar — och som levererar ett tak byggt för att hålla.",
    extraContent:
      "Söderöra tillhör de öar i norra Roslagen som saknar bro och bara nås med båt. Vi tar uppdrag här och planerar materialtransporter noggrant och kombinerar gärna med arbete på närliggande öar som Norröra och Svartlöga för att optimera logistiken. Kontakta oss om du har en fastighet på Söderöra som behöver nytt tak.",
    uniqueFAQ: {
      question: "Kan ni byta tak på Söderöra trots att det bara nås med båt?",
      answer:
        "Ja, det är vår specialitet. Vi har utvecklat logistiklösningar för att transportera material sjövägen till öar som Söderöra. Vi samordnar ofta med projekt på närliggande öar för att hålla nere kostnaderna. Allt ingår i det fasta priset i offerten.",
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
      "Takläggare på Humlö — professionellt takbyte och takrenovering i norra Roslagens skärgård. Material transporteras sjövägen.",
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
      "Takläggare på Norröra (Saltkråkan) — takbyte och takrenovering med respekt för öns karaktär. Vi når Norröra med båt.",
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
      "Takläggare på Gräskö — vi utför takbyte och takrenovering i norra Roslagens skärgård. Materialtransport sjövägen ingår.",
    longDescription:
      "Gräskö i norra Roslagens skärgård har ett klimat som testar alla byggnaders uthållighet — och taken tar stryk först. Fukt, frost och den ständiga havsvinden kräver taklösningar som är genomtänkta från grunden. Oavsett om du vill byta till plåttak, renovera befintligt tak eller bara få en professionell bedömning av takets skick — kontakta oss så ordnar vi resten.",
    extraContent:
      "Gräskö är en av de norra skärgårdsöarna där vi regelbundet utför takarbeten. Vi rekommenderar korrosionsbeständig plåt och dimensionerade infästningar som tål hårda vindar. Boka en takinspektion på Gräskö — vi dokumenterar skicket och ger dig en rekommendation.",
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
      "Takläggare i Spillersboda — takbyte, takrenovering och plåtarbeten längs Roslagens kust. Lokal takläggare med snabb service.",
    longDescription:
      "Spillersboda ligger vackert längs Roslagens kustlinje, där den fuktiga havsluften påverkar taken mer än vad många tror. Mossa, fukt i råsponten och slitna beslag är vanliga problem vi åtgärdar hos fastighetsägare i Spillersboda. Med vår lokala närvaro kan vi ofta vara på plats inom kort och erbjuda en kostnadsfri takkontroll. Vi rekommenderar alltid den lösning som ger bäst värde — ibland räcker en renovering, ibland behövs ett komplett byte. Ärlighet och kvalitet är våra ledord.",
    extraContent:
      "Spillersboda är en av de platser längs Roslagskusten där vi ofta arbetar. Fastighetsägare i Spillersboda uppskattar vår ärlighet — vi rekommenderar aldrig ett takbyte om en renovering räcker. Den lokala närvaron ger korta restider och snabb återkoppling.",
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
    description:
      "Takläggare på Rådmansö — takbyte, tegelplåt och takrenovering nära Norrtälje. Fast pris och kostnadsfri takkontroll.",
    longDescription:
      "Rådmansö är porten till skärgården, med kort väg till Norrtälje. Vi utför takbyte, takrenovering och plåtarbeten på Rådmansö till fast pris — kontakta oss så bokar vi in en kostnadsfri takkontroll.",
    extraContent:
      "Rådmansö har en blandning av permanentboenden och fritidshus. Vi utför takbyten, takomläggningar och mindre arbeten som byte av hängrännor, stuprör och vindskivor, och lämnar alltid fast pris efter kostnadsfri takkontroll.",
    uniqueFAQ: {
      question: "Hur snabbt kan ni komma till Rådmansö för en takkontroll?",
      answer:
        "Ring oss på 070-154 36 39 eller boka via formuläret, så hittar vi en tid som passar. Vi svarar alltid inom 24 timmar och ger dig en bedömning och ett prisförslag vid takkontrollen.",
    },
    primaryKeyword: "takläggare Rådmansö",
    lat: 59.6667,
    lng: 18.85,
    nearbyLocations: ["Norrtälje", "Blidö", "Furusund"],
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
      "I Bergshamra ser vi ofta tak med äldre betongpannor eller eternitskivor som behöver bytas. Vi hanterar rivning och avfallshantering. Innehåller eterniten asbest samordnar vi saneringen med en behörig saneringsfirma innan nytt tak läggs. Om du har en fastighet i Bergshamra och undrar över takets skick, gör vi en kostnadsfri inspektion. Vi ger alltid en rak och ärlig bedömning.",
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
        "De flesta tak i kustmiljö som Svartnö håller 25–40 år beroende på material. Tecken på att det är dags: mossa, fuktfläckar i underlaget, rostiga beslag eller spruckna pannor. Vi gör kostnadsfri takinspektion och ger dig en ärlig bedömning — ibland räcker det med en renovering istället för ett komplett byte.",
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
      "Takläggare på Väddö — takbyte, lertegeltak och takrenovering nära Grisslehamn. Lokal takläggare med erfarenhet av Väddö.",
    longDescription:
      "Väddö sträcker sig från Norrtälje norrut mot Grisslehamn och rymmer en varierad bebyggelse — från jordbruksfastigheter med stora takytor till sommarstugor nära vattnet. Du får en takläggare som förstår Väddös förhållanden: de kalla vintrarna, den fuktiga havsluften och vikten av att välja material som klarar det. Ring oss — vi ger dig en offert inom 24 timmar.",
    extraContent:
      "Väddö har många jordbruksfastigheter med stora takytor — ladugårdar, lador och ekonomibyggnader som behöver tak i gott skick. Vi hanterar även äldre gårdar med lertegel och tradition att bevara. Kontakta oss för ett hembesök och offert.",
    uniqueFAQ: {
      question: "Kan ni lägga tak på stora lantbruksbyggnader på Väddö?",
      answer:
        "Ja, vi har erfarenhet av att lägga tak på ladugårdar, lador och andra lantbruksbyggnader på Väddö. TP20-plåttak är ofta det mest kostnadseffektiva valet för stora takytor. Vi lämnar fast pris och kan påbörja arbetet med kort ledtid.",
    },
    primaryKeyword: "takläggare Väddö",
    lat: 59.95,
    lng: 18.95,
    nearbyLocations: ["Grisslehamn", "Singö", "Norrtälje"],
  },
  {
    slug: "vato",
    name: "Vätö",
    region: "Kusten",
    isIsland: false,
    description:
      "Takläggare på Vätö — takbyte och takrenovering mellan Norrtälje och skärgården. Ofta förmånliga priser tack vare samordning.",
    longDescription:
      "Vätö ligger strategiskt mellan Norrtälje och skärgården — ett område vi passerar dagligen på väg till projekt ute på öarna. Det gör att vi ofta kan erbjuda förmånliga priser till fastighetsägare på Vätö. Här finns många villor och fritidshus med tak som behöver ses över. Oavsett om det handlar om ett komplett takbyte eller en mindre renovering, finns vi nära och kan agera snabbt. Vi ger alltid fast pris efter kostnadsfri takkontroll — inga överraskningar på fakturan.",
    extraContent:
      "Vätö är en av de platser vi passerar allra mest — och det märks i priserna vi kan erbjuda. Genom att kombinera arbete på Vätö med pågående projekt i skärgården minskar vi restidskostnaderna. Fastighetsägare på Vätö får därför ofta ett förmånligt pris utan att kompromissa på kvaliteten.",
    uniqueFAQ: {
      question: "Varför är takbyte på Vätö ofta billigare än på öarna?",
      answer:
        "Vätö ligger längs vår dagliga färdväg ut till skärgården. Det innebär att vi kan samordna projekt och minska restidskostnaderna, vilket ger ett förmånligare pris. Du får samma kvalitet och garanti som på alla andra platser vi arbetar.",
    },
    primaryKeyword: "takläggare Vätö",
    lat: 59.7,
    lng: 18.7833,
    nearbyLocations: ["Rådmansö", "Blidö", "Norrtälje"],
  },
  {
    slug: "norrtalje",
    name: "Norrtälje",
    region: "Kusten",
    isIsland: false,
    description:
      "Takläggare i Norrtälje — din lokala partner för takbyte, takrenovering och plåtarbeten i Norrtäljeområdet.",
    longDescription:
      "Vi arbetar i Norrtälje stad och i hela kommunen: takbyte, takrenovering, takreparation och plåtarbeten på villor och andra byggnader. Du får en kostnadsfri takkontroll och ett skriftligt fast pris innan något påbörjas. Ring oss så bokar vi tid för takkontroll.",
    extraContent:
      "Vi utför komplett takservice i Norrtälje med omnejd, från Rimbo och Hallstavik till Grisslehamn: takomläggning, takrenovering, plåtarbeten och takavvattning med hängrännor och stuprör. Allt arbete utförs enligt AMA. Vi lämnar 10 års utförandegaranti och, för tätskiktet, 30 års garanti genom MATAKI. Begär en offert så återkommer vi inom 24 timmar. Processen är densamma för alla jobb i Norrtälje: kostnadsfri takkontroll, fast pris i offerten utan löpande timpris och utförande enligt AMA. Som privatperson kan du använda ROT-avdrag på arbetskostnaden, 30 % upp till 50 000 kr per person och år.",
    uniqueFAQ: {
      question: "Är RoslagsTak en lokal takläggare i Norrtälje?",
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
      "Vaxholm är porten till Stockholms skärgård och har en unik blandning av kulturhistoriska trähus och moderna villor. Taken i Vaxholm utsätts för havsfukt och vind, samtidigt som estetiken är viktig — särskilt i de äldre delarna av staden. Pannplåt som matchar äldre arkitektur, dubbelfalsat plåt för moderna hus, eller lertegel för den som vill bevara originallook — vi har lösningen.",
    extraContent:
      "Vaxholm ställer höga krav på estetik, särskilt i de kulturhistoriskt värdefulla områdena. Vi arbetar med material och metoder som respekterar Vaxholms arkitektur — från handfalsat plåtbeslag till pannplåt i rätt kulör. Om du bor i Vaxholm och funderar på att byta tak, bokar vi in en kostnadsfri genomgång där vi diskuterar materialval som passar just ditt hus.",
    uniqueFAQ: {
      question:
        "Tar RoslagsTak hänsyn till Vaxholms kulturhistoriska bebyggelse vid takbyte?",
      answer:
        "Absolut. Vi anpassar materialval och utförande efter husets ålder och stil — pannplåt i traditionella kulörer, lertegel eller handfalsat beslag. Vi kan även hjälpa till med kontakt med kommunen om bygglov krävs.",
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
      "Takläggare på Arholma — vi tar oss ut till ytterskärgården med båt för professionellt takbyte och takrenovering. Specialist på ö-logistik.",
    longDescription:
      "Arholma är en av de nordligaste öarna i Stockholms skärgård — avlägset, vackert och med ett klimat som ställer extrema krav på byggnaders tak. Vi planerar materialtransport, anpassar tidsplanen efter väder och sjöförhållanden, och levererar ett tak byggt för att stå emot Arholmas tuffa förhållanden i årtionden. Ditt tak på Arholma förtjänar en takläggare som verkligen förstår skärgården.",
    extraContent:
      "Vi planerar logistiken noggrant — material transporteras sjövägen och vi anpassar tidsplanen efter väderprognoser. Fastighetsägare på Arholma väljer oss för att vi faktiskt tar oss ut — och levererar samma kvalitet som på fastlandet.",
    uniqueFAQ: {
      question: "Hur långt i förväg behöver jag boka takbyte på Arholma?",
      answer:
        "Vi rekommenderar att boka 4–8 veckor i förväg för takbyte på Arholma, så att vi kan planera materialtransport och samordna med väder. Under högsäsong (maj–september) kan det vara fördelaktigt att boka ännu tidigare. Ring oss så ger vi en realistisk tidsplan.",
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
      "Takläggare i Rimbo — takbyte, takomläggning och takrenovering med fast pris. Lokal takläggare i Roslagen med kostnadsfri takkontroll.",
    longDescription:
      "Rimbo är en av Roslagens största tätorter och här finns allt från 70-talsvillor med betongpannor till äldre gårdar med lertegel och plåttak. Inlandsklimatet i Rimbo innebär stora temperatursvängningar och mycket snölast under vintern — vilket sliter på pannor, läkt och infästningar. Vi utför takbyten och takomläggningar i Rimbo året runt och bedömer behovet av taksäkerhet och snörasskydd efter fastighetens läge vid takkontrollen.",
    extraContent:
      "I Rimbo möter vi ofta villatak från 60- och 70-talet där betongpannorna börjat frostspränga och underlagspappen torkat sönder. I de fallen är takomläggning med ny papp, ny läkt och nytt takmaterial oftast den mest ekonomiska lösningen på sikt. Vi lämnar alltid fast pris efter kostnadsfri takkontroll i Rimbo.",
    uniqueFAQ: {
      question: "Hur snabbt kan ni starta ett takbyte i Rimbo?",
      answer:
        "Vi utför arbeten i Rimbo året runt — plåttak kan monteras även under vintern så länge underlaget är torrt och isfritt. Exakt startdatum får du i offerten efter takkontrollen, och vi svarar alltid inom 24 timmar på din förfrågan.",
    },
    primaryKeyword: "takläggare Rimbo",
    lat: 59.7469,
    lng: 18.3639,
    nearbyLocations: ["Norrtälje", "Edsbro", "Riala"],
  },
  {
    slug: "hallstavik",
    name: "Hallstavik",
    region: "Norra Roslagen",
    isIsland: false,
    description:
      "Takläggare i Hallstavik — takbyte, plåttak och takrenovering i norra Roslagen. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Hallstavik i norra Roslagen har en tät villabebyggelse med hus från flera decennier. Många äldre tak har nått slutet av sin förväntade livslängd, då betongpannor och plåt med tiden tappar sin funktion. Vi utför takbyten, takomläggningar och takrenoveringar i Hallstavik och rekommenderar oftast TP20-plåt eller dubbelfalsat plåttak — lätt, tåligt och underhållsfritt. Vi hanterar allt från byggställning och rivning till ny taksäkerhet och avvattning, och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Många fastigheter i Hallstavik ligger nära skog och vegetation, vilket kan ge snabbare mossbildning på norrsidan av taket. Där rekommenderar vi taktvätt som förebyggande åtgärd innan påväxten hinner skada takytan. Vi utför både taktvätt, takmålning och kompletta takbyten i Hallstavik.",
    uniqueFAQ: {
      question: "Vilket takmaterial passar bäst på villor i Hallstavik?",
      answer:
        "På villor i Hallstavik rekommenderar vi oftast plåttak — TP20 för budget eller dubbelfalsat för maximal livslängd. Plåt är lätt, klarar snölast och kräver minimalt underhåll. Har du redan betongpannor kan omläggning med ny papp och läkt vara ett prisvärt alternativ.",
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
      "I Älmsta ser vi ofta äldre pannplåttak och tegeltak där beslagen runt skorsten och genomföringar rostat. Det är oftast där läckage börjar — inte i själva takytan. Vid varje takkontroll i Älmsta kontrollerar vi beslag, ränndalar och underlagspapp innan vi rekommenderar renovering eller komplett takbyte.",
    uniqueFAQ: {
      question: "Kan ni kombinera takarbete i Älmsta med projekt på Väddö?",
      answer:
        "Ja, vi samordnar ofta projekt i Älmsta med uppdrag på Väddö, Singö och Grisslehamn. Delade etablerings- och transportkostnader innebär att du kan få ett lägre pris. Hör av dig och berätta var fastigheten ligger, så ser vi om vi har pågående projekt i närheten.",
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
      "Många hus i Herräng har eternit- eller pannplåttak från mitten av 1900-talet. Har du eternittak hanterar vi asbestsanering enligt Arbetsmiljöverkets föreskrifter via behörig partner innan nytt tak monteras. Vi guidar dig genom hela processen och tar hand om dokumentation och avfallshantering.",
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
      "Takläggare i Riala — takbyte, takrenovering och taktvätt. Lokal takläggare i Roslagen med kostnadsfri takkontroll.",
    longDescription:
      "Riala ligger mellan Norrtälje och Åkersberga med gles bebyggelse, skogstomter och många sjönära hus. Skuggiga tomter och fuktig luft gör att mossa och alger växer snabbt på taken i Riala — särskilt på betongpannor. Vi utför taktvätt, biocidbehandling, takmålning och kompletta takbyten i Riala med fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Ett vanligt scenario i Riala är att taket ser sämre ut än det är: under mossan finns ofta fullt fungerande pannor. Då räcker taktvätt och behandling, kanske kompletterat med byte av enstaka pannor. Vi säger alltid som det är — om taket kan räddas rekommenderar vi inte ett onödigt takbyte.",
    uniqueFAQ: {
      question: "Behöver mitt tak i Riala tvättas eller bytas?",
      answer:
        "Det avgörs av underlaget. Är pannorna hela och underlagspappen tät räcker taktvätt med biocidbehandling. Har frostsprängning börjat eller pappen torkat sönder är omläggning bättre ekonomi. Vi gör en kostnadsfri takkontroll i Riala och ger en ärlig rekommendation.",
    },
    primaryKeyword: "takläggare Riala",
    lat: 59.6167,
    lng: 18.4,
    nearbyLocations: ["Norrtälje", "Åkersberga", "Rimbo"],
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
      "I Gräddö arbetar vi ofta med dubbelfalsat plåttak eftersom det saknar genomgående skruvhål och därmed är extremt tätt — en stor fördel i vindutsatta kustlägen. Vi passerar Gräddö regelbundet på väg ut till öarna, vilket gör att vi kan hålla nere transportkostnaden i offerten.",
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
      "I Åkersberga arbetar vi mycket med både betongpannor och tegelprofilerad plåt. Många kunder väljer plåt vid omläggning eftersom vikten blir lägre och underhållet minimalt. Vi hjälper dig jämföra totalkostnad över 30 år, inte bara pris per kvadratmeter idag.",
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
    description:
      "Takläggare i Österskär — takbyte, bandtäckning och takrenovering i sjönära läge. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Österskär är ett sjönära villaområde i Österåker med många äldre, arkitektoniskt påkostade hus — brutna tak, torn, kupor och valmade takfall. Sådana tak kräver skicklig plåtslagning snarare än snabb takläggning. Vi utför bandtäckning, plåtarbeten och kompletta takbyten i Österskär och plåtslår beslag kring skorstenar, kupor och takfönster för hand.",
    extraContent:
      "På äldre hus i Österskär är det viktigt att bevara takets uttryck. Vi arbetar med dubbelfalsad bandtäckning i förzinkad eller färgbelagd plåt, och i koppar eller zink när kunden vill ha ett exklusivt och patinerande resultat. Kostnadsfri takkontroll och fast pris ingår alltid.",
    uniqueFAQ: {
      question: "Klarar ni komplicerade tak med torn och kupor i Österskär?",
      answer:
        "Ja. Många hus i Österskär har brutna takfall, torn och kupor. Vi använder dubbelfalsad bandtäckning som formas efter takets geometri och plåtslår alla beslag på plats. Det är hantverksmässigt mer krävande, men ger både bättre täthet och rätt utseende.",
    },
    primaryKeyword: "takläggare Österskär",
    lat: 59.4667,
    lng: 18.35,
    nearbyLocations: ["Åkersberga", "Vaxholm", "Ljusterö"],
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
    description:
      "Takbyte och takomläggning i Ella gård i Täby. Kostnadsfri takkontroll utan förpliktelser, fast pris och hänsyn till kommunens riktlinjer för kulturmiljön.",
    longDescription:
      "Ella gård i Täby är ett av Sveriges första kedjehusområden. Bygget började 1955, bara ett år efter att jordbruket på den gamla gården hade lagts ned, och under en period på femton år växte cirka 500 hus fram. Först byggdes den norra delen, sedan den södra. I början av 1970-talet kompletterades området västerut med två delområden med låga grupphus. Husen är byggda efter 1950-talets ideal om grannskap och rationellt byggande: prefabricerade trähus på betongplatta, ordnade i grupper längs slingrande gator och omgivna av stora gröna ytor. Enligt kommunens beskrivning kännetecknas bebyggelsen av sadeltak med tegelpannor, stående träpanel och vita fönsterfoder, och de ursprungliga takkuporna är inramade av svart plåt. Området beskrivs av Täby kommun som mycket välbevarat, och i kommunens kulturmiljöprogram finns riktlinjer för hur husen ska förändras.",
    extraContent:
      "Den som byter tak i Ella gård behöver ta hänsyn till kulturmiljön. Enligt Täby kommuns råd och riktlinjer för Ella gård bör takpannor av lertegel användas, och större förändringar av husens tidstypiska arkitektur bör undvikas. Det gäller alltså inte bara vilket material som läggs, utan också detaljer som takkupornas plåtinklädnad och hur taket ansluter till fasaden. Om ett konkret takbyte kräver lov eller anmälan avgör kommunen. Många av husen byggdes under 1950- och 60-talen — tak från den tiden kan redan ha lagts om en gång, men där det inte har skett är underlagspapp, läkt och plåtdetaljer ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. Eftersom husen i ett kvarter ofta är likadana och byggda samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris.",
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
    parentLocation: { name: "Täby", slug: "taby" },
    uniqueFAQ: {
      question: "Måste jag använda lertegel om jag byter tak i Ella gård?",
      answer:
        "Täby kommun har en riktlinje för Ella gård om att takpannor av lertegel bör användas, för att bevara områdets tidstypiska karaktär, men det är en rekommendation, inte ett krav. Om ett konkret takbyte kräver lov eller anmälan avgör kommunen. Vi tar med riktlinjerna i underlaget när vi tar fram offerten.",
    },
    primaryKeyword: "takläggare Ella gård",
    lat: 59.4447,
    lng: 18.0539,
    nearbyLocations: ["Täby", "Vallentuna", "Åkersberga"],
  },
  {
    slug: "skarpang",
    name: "Skarpäng",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Skarpäng i Täby, ett villaområde med typhus från 1970- och 80-talen. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Skarpäng ligger i kuperad terräng i sydvästra Täby, på gränsen mot Sollentuna och Danderyd. Namnet kommer från ängen Skarpängen, som finns med på en karta över Ella från 1715. Där beskrivs den som en skarp och torr äng, alltså en mark med mager och torr jord. Längst i söder finns torpet Skarpäng, anlagt vid mitten av 1700-talet, som har gett kommundelen dess namn. Liksom flera andra villaområden i Täby började Skarpäng som en gles bebyggelse på stora tomter, främst sommarstugor. Förvandlingen till tätt villaområde tog fart med 1960-talets förnyelseplanering och 1970-talets nya stadsplaner. Enligt Täby kommuns beskrivning präglas området i dag helt av typhus från 1970- och 80-talen, med fasader i mexitegel och trä. I norr finns enligt kommunen flera grupphusområden med radhus och friliggande hus.",
    extraContent:
      "Ett kvarter sticker ut: i Knäpparen uppfördes husen 1978–1979 efter ritningar av arkitekten Gustaf Lettström, med fasader av rödbrunt eller sandfärgat tegel och mörkbruna vindskivor och fönstersnickerier. Täby kommuns råd och riktlinjer för Knäpparen är att behålla bruna fönstersnickerier, ursprungliga tegelfasader och svarta tak — det gäller bara det kvarteret, inte hela Skarpäng. Vid ett takbyte i kvarteret är det klokt att ta hänsyn till det redan när materialet väljs. De flesta husen i Skarpäng är i dag runt 40–50 år gamla. Taken kan redan ha lagts om, men där det inte har skett är det ofta dags att se över underlagspapp, läkt, plåtdetaljer och hängrännor. I grupphusområdena är husen ofta likadana och byggda samtidigt, och då kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Täby kommun.",
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
    parentLocation: { name: "Täby", slug: "taby" },
    h1Override: "Takläggare i Skarpäng, Täby",
    uniqueFAQ: {
      question: "Gäller kulturmiljöriktlinjerna hela Skarpäng?",
      answer:
        "Nej. Täby kommuns riktlinje om att behålla bruna fönstersnickerier, ursprungliga tegelfasader och svarta tak gäller specifikt kvarteret Knäpparen, inte hela Skarpäng. Vi tar med riktlinjerna i underlaget när vi tar fram offerten om ditt hus ligger i Knäpparen.",
    },
    primaryKeyword: "takläggare Skarpäng",
    lat: 59.4440,
    lng: 18.0194,
    nearbyLocations: ["Täby", "Sollentuna", "Vallentuna"],
  },
  {
    slug: "viby",
    name: "Viby",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Viby i Sollentuna, med villor, radhus och kedjehus från 1960- till 1980-talet. Kostnadsfri takkontroll utan förpliktelser.",
    longDescription:
      "Viby i norra Sollentuna har en historia som sträcker sig långt före villaområdena. Här finns gravfält och boplatser från yngre järnåldern, och vid nuvarande Rävgärdsvägen finns en runristning i berghällen från mitten av 1000-talet, som räknas som det äldsta kända skriftliga meddelandet från trakten. Namnet kommer från Viby gård, ett tidigare säteri som är känt i skrift sedan 1409. På en karta från 1687 sträcker sig gårdens ägor från sjön Ravalen och dagens Uppsalavägen i öster till Översjön i väster, med flera torp under sig. Herrgården från 1820-talet står kvar och ägs i dag av Sollentuna hembygdsförening. Den moderna bebyggelsen växte fram när gårdens ekonomibyggnader revs på 1960-talet. Enligt beskrivningar av kommundelen består bebyggelsen i dag huvudsakligen av villor och radhus, fördelade på områdena Lilla Viby, Östra Viby, Viby gård och Södra Viby. Enligt hitta.se är husen främst byggda på 1960- och 1980-talen.",
    extraContent:
      "Kommundelen gränsar till Rotebro, Norrviken, Häggvik och Järvafältet, och med knappt 5 700 invånare är Viby den femte största kommundelen i Sollentuna sett till invånarantal. De flesta husen i Viby är i dag runt 40–60 år gamla. Taken kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och hängrännor ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag, och därför börjar vi alltid med att titta på taket på plats. I radhus- och kedjehusområdena är husen ofta likadana och byggda samtidigt. Där kan grannar ibland ha nytta av att planera takbyten i samma veva, även om varje hus alltid får en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Sollentuna kommun.",
    factBox: [
      { label: "Kommun", value: "Sollentuna" },
      { label: "Delområden", value: "Lilla Viby, Östra Viby, Viby gård, Södra Viby" },
      { label: "Hustyper", value: "Villor, kedjehus, radhus" },
      { label: "Byggperiod", value: "1960- och 1980-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 300" },
    ],
    parentLocation: { name: "Sollentuna", slug: "sollentuna" },
    h1Override: "Takläggare i Viby, Sollentuna",
    uniqueFAQ: {
      question: "Hur gammal är bebyggelsen i Viby?",
      answer:
        "Enligt hitta.se är husen i Viby främst byggda på 1960- och 1980-talen. Taken kan redan ha lagts om en eller flera gånger, så vi kan inte säga något generellt om skicket — vi tittar alltid på ditt tak på plats vid en kostnadsfri takkontroll.",
    },
    primaryKeyword: "takläggare Viby",
    lat: 59.4578,
    lng: 17.8952,
    nearbyLocations: ["Sollentuna", "Täby", "Upplands Väsby"],
  },
  {
    slug: "brevik",
    name: "Brevik",
    region: "Österåker",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Brevik, Lervik, Flaxenvik och Skärgårdsstad i Österåker. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Öster om Åkersberga, ut mot kusten, ligger ett område med flera mindre delar: Brevik, Lervik, Flaxenvik, Ekhammar, Gröndal, Tråsättra, Skärgårdsstad, Översättra och södra Margretelund. Tillsammans bildar de ett stort sammanhängande småhusområde. Bebyggelsen har vuxit fram under lång tid. Enligt hitta.se är villorna i Brevik och Gröndal främst byggda på 1950- och 1960-talen, och villorna i Lervik på 1930- och 1970-talen. I Tråsättra finns kedjehus och radhus från 1970- och 1980-talen. Skärgårdsstad har en egen historia: området ligger vid kusten, mellan Solbergasjön, Bosjön och Isättraviken, cirka sju kilometer från Åkersberga och till stor del omgivet av skog. Här fanns tidigare gruvhantering, och när den lades ned togs en detaljplan fram för bostäder. Skärgårdsstad bebyggdes främst under 1980- och 90-talen, och gatorna är uppkallade efter de bönder som ursprungligen ägde marken eller efter gruvdriften. Området har en egen samfällighetsförening. Närheten till Åkersberga har präglat hela området sedan järnvägen kom — Åkersberga station öppnade 1901 vid den dåvarande kustbanan, och orten är i dag centralort i Österåkers kommun.",
    extraContent:
      "I ett område med hus från 1930-talet till 1990-talet finns ingen typisk takålder. Villorna från 1950- och 60-talen är i dag runt 60–70 år gamla, kedjehusen och radhusen i Tråsättra runt 40–50 år, och husen i Skärgårdsstad runt 30–40 år. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Det enda säkra sättet att veta vad taket behöver är att titta på det på plats. I Tråsättra och Skärgårdsstad, där husen ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Österåkers kommun.",
    factBox: [
      { label: "Kommun", value: "Österåker" },
      { label: "Delområden", value: "Brevik, Lervik, Flaxenvik, Ekhammar, Gröndal, Tråsättra, Skärgårdsstad, Översättra, södra Margretelund" },
      { label: "Hustyper", value: "Villor, kedjehus och radhus (Tråsättra)" },
      { label: "Byggperiod", value: "Brevik/Gröndal 1950–60-tal, Lervik 1930- och 70-tal, Tråsättra 1970–80-tal, Skärgårdsstad 1980–90-tal" },
      { label: "Ägda småhus i SCB:s statistikområde (RegSO, 2025)", value: "Ca 1 800" },
    ],
    parentLocation: { name: "Österåker", slug: "akersberga" },
    h1Override: "Takläggare i Brevik, Lervik och Flaxenvik, Österåker",
    uniqueFAQ: {
      question: "Är bebyggelsen i Brevik-området enhetlig?",
      answer:
        "Nej. Området spänner från 1930-talsvillor i Lervik till 1980–90-talsbebyggelse i Skärgårdsstad, så det går inte att säga något generellt om takens skick. Vi tittar alltid på ditt tak på plats vid en kostnadsfri takkontroll innan vi lämnar ett fast pris.",
    },
    primaryKeyword: "takläggare Brevik",
    lat: 59.4593,
    lng: 18.3624,
    nearbyLocations: ["Åkersberga", "Vaxholm", "Ljusterö"],
  },
  {
    slug: "ormsta",
    name: "Ormsta",
    region: "Roslagens inland",
    isIsland: false,
    description:
      "Takbyte och takomläggning i Ormsta, Bällsta, Västra Bällsta och Molnby i Vallentuna. Kostnadsfri takkontroll utan förpliktelser och fast pris.",
    longDescription:
      "Vallentuna tätort har vuxit fram längs Roslagsbanan, där mindre samhällen i södra delen av kommunen gradvis har vuxit ihop. I norr sträcker sig tätorten upp till Ormsta, och i de östra och norra delarna ligger bostadsområden som Ormsta, Bällsta, Västra Bällsta och, enligt hitta.se, Molnby. Enligt beskrivningar av ortens historia fanns det på 1930- och 40-talen bland annat två tegelbruk i centralorten, och befolkningen växte snabbt efter kriget: från omkring 2 300 invånare 1944 till nästan 5 900 år 1952. Ormsta, i tätortens nordligaste del, gränsar till Åby i söder, Lingsberg i öster och Ubby i norr. Området fick sin station på Roslagsbanan 1957. Enligt hitta.se är husen i Ormsta främst byggda på 1950- och 1970-talen, i Bällsta på 1960- och 2000-talen, i Västra Bällsta på 1970- och 1980-talen och i Molnby på 1980- och 2000-talen.",
    extraContent:
      "Det gör östra Vallentuna till ett område där hus från fem decennier ligger nära varandra, från de tidiga villorna i Ormsta till de nyare kvarteren i Bällsta och Molnby. De äldsta villorna från 1950- och 60-talen är i dag runt 60–70 år gamla, husen från 1970- och 80-talen runt 40–50 år, och de nyare husen från 2000-talet är i regel betydligt yngre. Taken kan redan ha lagts om, och därför går det inte att säga något generellt om skicket. Där taket inte har bytts på länge är underlagspapp, läkt, plåtdetaljer och hängrännor ofta det som behöver ses över. I kedjehusområdena, där husen byggdes samtidigt och ofta är likadana, kan grannar ibland ha nytta av att planera takbyten i samma veva. Varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör Vallentuna kommun.",
    factBox: [
      { label: "Kommun", value: "Vallentuna" },
      { label: "Delområden", value: "Ormsta, Bällsta, Västra Bällsta, Molnby" },
      { label: "Hustyper", value: "Villor, kedjehus, radhus" },
      { label: "Byggperiod", value: "Ormsta 1950–70-tal, Bällsta 1960- och 2000-tal, V. Bällsta 1970–80-tal, Molnby 1980- och 2000-tal" },
    ],
    parentLocation: { name: "Vallentuna", slug: "vallentuna" },
    h1Override: "Takläggare i Vallentuna – Ormsta, Bällsta och Molnby",
    uniqueFAQ: {
      question: "Är husen i Ormsta, Bällsta och Molnby från samma tid?",
      answer:
        "Nej. Enligt hitta.se är husen i Ormsta främst byggda på 1950- och 1970-talen, i Bällsta på 1960- och 2000-talen och i Molnby på 1980- och 2000-talen. Vi tittar alltid på ditt tak på plats vid en kostnadsfri takkontroll, oavsett hur gammalt huset är.",
    },
    primaryKeyword: "takläggare Ormsta",
    lat: 59.5413,
    lng: 18.0881,
    nearbyLocations: ["Vallentuna", "Täby", "Åkersberga"],
  },
  // =================== STORSTOCKHOLM ===================
  {
    slug: "stockholm",
    name: "Stockholm",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare i Stockholm — takbyte, takrenovering och plåtarbeten i hela Stockholms kommun. Takläggare med fast pris och 10 års utförandegaranti.",
    longDescription:
      "Stockholms bebyggelse sträcker sig från medeltida tegelhus i Gamla stan till funktionalistvillor från 30-talet och moderna nybyggen i Hammarby sjöstad. Den spridda bebyggelsen innebär lika många taktyper som stadsdelar — tegeltak i innerstaden, plåttak i industriområdena och betongpannor i miljonprogramsområdena. RoslagsTak utför takbyten, takomläggningar, bandtäckning och plåtarbeten i hela Stockholm med material valt för stadens klimat: fuktiga vintrar, stor snölast och tät bebyggelse där logistik på trånga tomter är en del av projektet. Vi lämnar alltid fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Att byta tak i Stockholm ställer särskilda krav på logistik. Trånga gator, parkeringsregler och grannhänsyn gör att materialupplag, ställning och avfallshantering måste planeras i detalj. Vi arbetar i tätbebyggda områden från Södermalm till Bromma och anpassar alltid logistikplanen efter just din fastighet och kvarter.",
    uniqueFAQ: {
      question:
        "Kan ni byta tak på en fastighet i tätbebyggt område i Stockholm?",
      answer:
        "Ja, vi utför takbyten i tätbebyggda stockholmsområden där ställning, materialupplag och avfall måste planeras med hänsyn till grannar och trånga tomter. Vi lägger alltid upp en logistikplan innan start så att arbetet flyter utan onödiga störningar. Kontakta oss så berättar vi hur vi skulle lösa ditt projekt.",
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
      "På Östermalm är estetiken lika viktig som funktionen. Vi plåtslår alla beslag runt skorstenar, takfönster och nockar för hand och väljer plåtkvaliteter och kulörer som passar husets arkitektur. Många fastigheter här har tak där originalmaterialet kan vara svårt att ersätta med modern standardplåt — vi hittar lösningar som bevarar utseendet med modern prestanda. Kontakta oss för en kostnadsfri konsultation.",
    uniqueFAQ: {
      question: "Arbetar ni med koppar- och zinkplåt på Östermalm?",
      answer:
        "Ja, vi arbetar med koppar, zink och förzinkad stålplåt på exklusiva tak på Östermalm. Koppar ger ett patinerat utseende som passar klassiska stenstadshus, medan zink är ett slagtåligt och elegant alternativ. Vi plåtslår alla beslag för hand. Kontakta oss så diskuterar vi rätt material för din fastighet.",
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
      "Takläggare i Bromma — takbyte, takrenovering och plåtarbeten i västra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Bromma har en varierad bebyggelse — från 1920-talsvillor i Bromma trädgårdsstad till radhus och 70-talsvillor i Blackeberg och Riksby. På hus av den åldern är det vanligt att taket förr eller senare blir moget för omläggning eller byte. Vi utför takbyten och takomläggningar i Bromma med både plåttak (TP20, dubbelfalsat) och betongpannor, alltid med ny taksäkerhet, fungerande ventilation och avvattning. Vi går igenom pris och tidsplan i förväg, så att offerten blir realistisk för Brommas villaområden.",
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
      "På Kungsholmen arbetar vi ofta med bostadsrättsföreningar där takbytet måste planeras tillsammans med styrelse och fastighetsägare. Vi ger offert, tidsplan och dokumentation som passar en bostadsrättsförenings beslutsprocess. Vi arbetar i innerstadsmiljö där hänsyn till boende och trafik är avgörande.",
    uniqueFAQ: {
      question:
        "Kan ni utföra takbyte för en bostadsrättsförening på Kungsholmen?",
      answer:
        "Ja, vi utför takbyten på bostadsrättsfastigheter på Kungsholmen. Vi ger offert, tidsplan och dokumentation anpassad för en bostadsrättsförenings beslutsprocess, och samordnar arbetet så att boende störas så lite som möjligt. Kontakta oss så presenterar vi en plan för er fastighet.",
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
      "Många tak i Vasastan har plåtbeslag och hängrännor från tidigt 1900-tal som rostat och börjar läcka. I de fallen kan en renovering med nya beslag och rännor förlänga takets liv med 15–20 år utan komplett byte. Vi gör alltid en ärlig bedömning — vi föreslår inte ett takbyte om en renovering räcker. Boka en kostnadsfri takkontroll i Vasastan.",
    uniqueFAQ: {
      question:
        "Kan ni renovera plåtbeslag och hängrännor på ett äldre tak i Vasastan?",
      answer:
        "Ja, vi plåtslår och byter rostiga beslag, vindskivor, nockbeslag och hängrännor på äldre tak i Vasastan. Ofta räcker en riktad renovering för att förlänga takets livslängd med 15–20 år. Vi ger en ärlig bedömning vid kostnadsfri takkontroll — om ett helt takbyte inte behövs säger vi det.",
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
      "Takläggare i Skärholmen — takbyte, takrenovering och plåtarbeten i sydvästra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Skärholmen och omgivande stadsdelar har en stor andel miljonprogrambebyggelse med stora bostadshus, radhus och centrumanläggningar. Taken är ofta plåttak och papptak från 1960- och 70-talet som nu nått sin livslängd. Vi utför takbyten och takrenoveringar i Skärholmen med material som passar både bostadshus och kommersiella fastigheter — TP20-plåt, bandtäckning och membrantak för flacka ytor. Vi hanterar stora takytor effektivt och kostnadseffektivt.",
    extraContent:
      "Stora takytor i Skärholmen, som bostadshus och centrumanläggningar, kräver noggrann planering av ställning, materialleverans och avfall. Vi tar uppdrag på både stora bostadsrättsfastigheter och kommersiella byggnader i området. För stora ytor är TP20-plåt ofta det mest kostnadseffektiva valet — snabbt att montera och lång livslängd. Kontakta oss för offert på större takprojekt i Skärholmen.",
    uniqueFAQ: {
      question: "Kan ni byta tak på stora bostadshus i Skärholmen?",
      answer:
        "Ja, vi utför takbyten på stora bostadshus och radhus i Skärholmen. Stora takytor monteras effektivt med TP20-plåt eller bandtäckning. Vi planerar ställning, material och avfall för att minimera störningar för boende. Kontakta oss för offert och tidsplan anpassad för er fastighet.",
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
      "Takläggare i Farsta — takbyte, takrenovering och plåtarbeten i södra Stockholm. Fast pris, kostnadsfri takkontroll.",
    longDescription:
      "Farsta och stadsdelarna runt Farsta strand har en blandning av 50-talsvillor, 70-talsradhus och nyare bostadsområden. En del av bebyggelsen har tak från den perioden, där betongpannor kan börja frostspränga och underlagspapp torka och spricka med åren. Vi utför takbyten och takomläggningar i Farsta med både plåt och pannor, och lämnar alltid fast pris efter kostnadsfri takkontroll. Vi bedömer behovet av snörasskydd och ser till att taksäkerheten uppfyller svenska krav.",
    extraContent:
      "I Farsta ser vi ofta tak där mossbildningen på norrsidan är kraftig, särskilt nära grönområden och vatten. Regelbunden taktvätt kan förlänga takets liv, men när pannorna börjat frostspränga är omläggning bättre ekonomi. Vi ger en ärlig rekommendation vid varje takkontroll.",
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
      "I Solnas nybyggda områden, som Arenastaden, arbetar vi med moderna taklösningar — plåttak med hög korrosionsklass, membrantak på flacka ytor och system för grön takbeklädnad. För de äldre villaområdena rekommenderar vi oftast dubbelfalsat plåt eller tegelprofilerad plåt vid omläggning. Vi lämnar alltid fast pris efter kostnadsfri takkontroll.",
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
      "Takläggare i Sundbyberg — takbyte, takrenovering och plåtarbeten. Takläggare med fast pris och 10 års utförandegaranti.",
    longDescription:
      "Sundbyberg är en tät kommun med en blandning av tidiga villaområden, bostadsrättsfastigheter och nyare bostadsbebyggelse kring stationerna. Många äldre villatak har betongpannor eller tegel från 50- och 60-talet som behöver omläggning. Vi utför takbyten och takrenoveringar i Sundbyberg med material som passar både äldre villor och moderna bostadshus. Vi planerar logistiken i den täta bebyggelsen så att grannar och trafik påverkas minimalt.",
    extraContent:
      "I Sundbybergs bostadsrättsområden arbetar vi ofta med styrelser och fastighetsägare för att planera takbyten över flera fastigheter. Genom att samordna projekt kan vi hålla nere kostnaden och korta ledtiderna. Vi lämnar offert och tidsplan anpassad för en bostadsrättsförenings beslutsprocess.",
    uniqueFAQ: {
      question: "Kan ni samordna takbyte för flera fastigheter i Sundbyberg?",
      answer:
        "Ja, vi samordnar gärna takbyten för bostadsrättsföreningar eller grannfastigheter i Sundbyberg. Genom att dela etablerings- och transportkostnader kan vi erbjuda ett bättre pris. Vi ger offert och tidsplan anpassad för en bostadsrättsförenings beslutsprocess. Kontakta oss för att diskutera ert projekt.",
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
      "På stora villor i Danderyd med brutna takfall är dubbelfalsad bandtäckning ofta det bästa valet — det formas efter takets geometri, saknar genomgående skruvhål och håller 60–80 år. Vi plåtslår alla beslag runt skorstenar, kupor och takfönster för hand. Kostnadsfri takkontroll och fast pris ingår alltid.",
    uniqueFAQ: {
      question: "Vilket takmaterial passar brutna tak i Danderyd?",
      answer:
        "För brutna takfall, torn och kupor i Danderyd rekommenderar vi dubbelfalsad bandtäckning — den formas efter takets geometri och ger bäst täthet. Koppar eller zink ger ett exklusivt, patinerande uttryck. Vi plåtslår alla beslag för hand. Boka en kostnadsfri takkontroll så rekommenderar vi rätt material för ditt hus.",
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
      "Sollentuna har en varierad bebyggelse — från villor i Edsberg och Tureberg till radhus och bostadsrättsfastigheter. Många tak från 70- och 80-talet är nu mogna för omläggning eller byte. Vi utför takbyten och takomläggningar i Sollentuna med både plåttak och betongpannor, alltid med ny taksäkerhet och fungerande ventilation. Vi lämnar fast pris efter kostnadsfri takkontroll och kan ofta starta inom några veckor.",
    extraContent:
      "I Sollentuna ser vi ofta villatak med betongpannor där frostsprängning börjat och underlagspapp torkat sönder. I de fallen är omläggning med ny papp, ny läkt och antingen nya pannor eller plåt oftast bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
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
      "Takläggare på Lidingö — takbyte, takrenovering och plåtarbeten på en ö nära Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Lidingö är en ö med exklusiv villabebyggelse, strandnära hus och bostadsrättsfastigheter — allt samlar på en ö med broförbindelse men ändå ö-karaktär. Taken utsätts för fukt från omgivande vatten och vind. Vi utför takbyten, bandtäckning och takrenoveringar på Lidingö med material som tål det fuktiga läget. Många hus har komplexa tak med brutna fall och kupor som kräver skicklig plåtslagning.",
    extraContent:
      "På Lidingö har många hus tak med tegelpannor eller plåt från 1920–1950-talet. Vid takbyte bevarar vi husens karaktär med material som matchar originalet — tegelprofilerad plåt för tegelutseende, eller dubbelfalsad plåt i klassiska kulörer. Vi plåtslår beslag runt skorstenar och kupor för hand. Kostnadsfri takkontroll och fast pris ingår.",
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
      "Takläggare i Nacka — takbyte, takrenovering och plåtarbeten i östra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Nacka kommun sträcker sig från tät bebyggelse vid Järla och Sicklaö till skogsnära villor i Saltsjöbaden och Älta. Taken varierar från industribyggnaders plåttak till exklusiva villatak i Saltsjöbaden. Vi utför takbyten, takomläggningar och plåtarbeten i hela Nacka kommun med material anpassat för varje stadsdel. Många tak i Älta och Nackanäs är nu 30–40 år och mogna för omläggning.",
    extraContent:
      "I Saltsjöbaden och Älta arbetar vi med villatak där estetiken är viktig — tegelpannor, dubbelfalsad plåt och kopparbeslag. I industriområdena vid Sickla lägger vi TP20 och membrantak på flacka ytor. Vi lämnar alltid fast pris efter kostnadsfri takkontroll och anpassar logistiken efter varje stadsdel.",
    uniqueFAQ: {
      question: "Kan ni byta tak på både villor och industribyggnader i Nacka?",
      answer:
        "Ja, vi utför takbyten på både villor, bostadsrättsfastigheter och kommersiella byggnader i Nacka. I villaområdena som Saltsjöbaden arbetar vi med tegel och bandtäckning, i industriområdena med TP20 och membrantak. Kontakta oss så rekommenderar vi rätt lösning för din fastighet.",
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
      "Takläggare i Värmdö — takbyte, takrenovering och plåtarbeten i Stockholms södra skärgård. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Värmdö är en stor kommun som sträcker sig från tätorten Gustavsberg ut genom södra skärgården till öar som Sandhamn och Möja. Bebyggelsen varierar från villaområden till fritidshus och skärgårdsgårdar. Taken utsätts för samma salt och vind som i norra skärgården — och vi tar uppdrag i hela Värmdö, inklusive öar som nås med båt. Vi utför takbyten, takomläggningar och plåtarbeten med material valt för skärgårdsklimatet.",
    extraContent:
      "I Värmdös skärgårdsdelar — Sandhamn, Möja, Runmarö och Nämdö — arbetar vi med takbyten där all material transporteras sjövägen, precis som i norra skärgården. I Gustavsberg och tätorten är det fastlandsförhållanden. Vi anpassar logistik och material efter varje läge. Kostnadsfri takkontroll och fast pris ingår alltid.",
    uniqueFAQ: {
      question: "Tar ni er ut till öarna i Värmdö skärgård för takbyte?",
      answer:
        "Ja, vi är specialister på takbyten på öar utan broförbindelse och arbetar i hela Värmdö skärgård — Sandhamn, Möja, Runmarö, Nämdö med flera. Allt material transporteras sjövägen och logistiken planeras noggrant. Kontakta oss så berättar vi hur vi skulle lösa ditt projekt.",
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
      "Takläggare i Tyresö — takbyte, takrenovering och plåtarbeten i södra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Tyresö sträcker sig från villabebyggelse i Bollmora till skog- och sjönära hus vid Tyresö slott och ut mot Älvudden. Bebyggelsen är en blandning av äldre villor, 70-talsradhus och nyare bostadsområden. Många tak är nu mogna för omläggning. Vi utför takbyten och takrenoveringar i Tyresö med både plåt och pannor, och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Tyresö ser vi ofta tak nära skog och vatten där mossbildningen är kraftig. Regelbunden taktvätt kan förlänga takets liv, men när pannorna frostsprängt är omläggning bättre ekonomi. Vi bedömer alltid behovet av snörasskydd över entréer.",
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
      "Takläggare i Haninge — takbyte, takrenovering och plåtarbeten söder om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Haninge kommun omfattar Handen, Vendelsö, Dalarö och skärgårdsöarna ut mot Ornö och Utö. Bebyggelsen är varierad — villaområden, fritidshus och skärgårdsgårdar. Vi utför takbyten, takomläggningar och plåtarbeten i hela Haninge, inklusive öarna i södra skärgården där vi transporterar material sjövägen. Vi anpassar material efter det fuktiga, salta klimatet nära havet.",
    extraContent:
      "I Haninges skärgårdsdelar — Ornö, Utö, Muskö — arbetar vi med takbyten där all logistik sköts sjövägen, precis som i norra skärgården. I tätorterna Handen och Vendelsö är det fastlandsförhållanden med villatak som behöver omläggning. Vi lämnar fast pris efter kostnadsfri takkontroll i hela kommunen.",
    uniqueFAQ: {
      question: "Arbetar ni på öarna i Haninge skärgård?",
      answer:
        "Ja, vi tar oss ut till öarna i Haninge skärgård — Ornö, Utö, Muskö med flera — och transporterar allt material sjövägen. Vi är specialister på takbyten på öar utan broförbindelse. Kontakta oss så berättar vi hur vi skulle lösa ditt projekt på ön.",
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
      "Takläggare på Ekerö — takbyte, takrenovering och plåtarbeten på en ö i Mälaren. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Ekerö är en ö i Mälaren med en varierad bebyggelse — från kungsgårdshistoria i Drottningholm till villor i Mälarstrand och fritidshus ut mot ön. Taken utsätts för fukt och vind från Mälaren. Vi utför takbyten, takomläggningar och plåtarbeten på Ekerö med material valt för det sjönära klimatet. Många hus har tegeltak eller plåttak från 1950-talet som nu behöver omläggning.",
    extraContent:
      "På Ekerö arbetar vi både med kulturhistoriska tak nära Drottningholm och med vanliga villatak i områdena runt om. Vid takbyte nära kulturhistorisk bebyggelse anpassar vi material och utförande efter husens karaktär. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    uniqueFAQ: {
      question: "Ställer Ekerös läge i Mälaren särskilda krav på tak?",
      answer:
        "Ekerö omges av Mälaren vilket ger fuktigare luft än på fastlandet. Vi rekommenderar material med hög korrosionsklass på plåt och noggrann hantering av ventilation och underlagspapp. Tegelpannor och dubbelfalsad plåt är bra val. Boka en kostnadsfri takkontroll så ger vi en rekommendation för ditt hus.",
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
      "I Järfällas bostadsrättsområden arbetar vi ofta med styrelser för att planera takbyten över flera fastigheter. Stora takytor monteras effektivt med TP20-plåt. Vi planerar ställning, material och avfall så att boende störas minimalt.",
    uniqueFAQ: {
      question: "Kan ni byta tak på bostadsrättsfastigheter i Järfälla?",
      answer:
        "Ja, vi utför takbyten på bostadsrättsfastigheter och radhus i Järfälla. Vi ger offert och tidsplan anpassad för en bostadsrättsförenings beslutsprocess och planerar arbetet så att boende störas minimalt. Stora ytor monteras effektivt med TP20-plåt. Kontakta oss för offert.",
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
      "Takläggare i Huddinge — takbyte, takrenovering och plåtarbeten söder om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Huddinge har en stor villabebyggelse och bostadsrättsområden i Flemingsberg, Fullregatorp och Stuvsta. Många tak från 60- och 70-talet är nu mogna för omläggning eller byte. Vi utför takbyten, takomläggningar och plåtarbeten i Huddinge med både plåttak och betongpannor. Vi lämnar fast pris efter kostnadsfri takkontroll och kan ofta starta inom några veckor.",
    extraContent:
      "I Huddinge ser vi ofta villatak med betongpannor där frostsprängning börjat. Omläggning med ny papp, ny läkt och plåt är då oftast bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
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
      "Takläggare i Sigtuna — takbyte, takrenovering och plåtarbeten i en av Sveriges äldsta städer. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Sigtuna är en av Sveriges äldsta städer med medeltida gaturum, tegelhus och en kulturmiljö som ställer höga krav på takläggning. Taken i centrala Sigtuna är ofta tegeltak och plåttak från tidigt 1900-tal. Vi utför takbyten, takrenoveringar och plåtarbeten i Sigtuna med respekt för den kulturhistoriska bebyggelsen — tegelpannor, dubbelfalsad plåt och handfalsade beslag. I nyare områden som Märsta arbetar vi med moderna plåttak.",
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
      "I Upplands Väsby ser vi ofta villatak där omläggning med ny papp, ny läkt och plåt är bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
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
      "Takläggare i Nynäshamn — takbyte, takrenovering och plåtarbeten i kustläge söder om Stockholm. Fast pris och 10 års utförandegaranti.",
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
    description:
      "Takläggare i Hässelby — takbyte, takrenovering och plåtarbeten i västra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Hässelby har en av Stockholms mest välbevarade trädgårdsstadsbebyggelse, med villor från 1920- och 30-talet längs Hässelby strandstigen och radhus från miljonprogramtiden i Hässelby gård. Taken varierar från tegelpannor på äldre villor till plåttak på nyare hus. Många tak i Hässelby är nu 40–60 år gamla och mogna för omläggning eller byte. Vi utför takbyten och takrenoveringar i Hässelby med material som bevarar trädgårdsstadens karaktär — dubbelfalsad plåt i klassiska kulörer och tegelpannor där originalet fanns.",
    extraContent:
      "I Hässelby trädgårdsstad är hänsyn till den kulturhistoriska bebyggelsen avgörande. Vid takbyte väljer vi material och kulörer som passar husens arkitektur och bevarar detaljer som vindskivor och plåtbeslag. I Hässelby gård arbetar vi med mer standardiserade villatak. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    uniqueFAQ: {
      question: "Ställer Hässelby trädgårdsstad särskilda krav på takbyte?",
      answer:
        "Ja, Hässelby trädgårdsstad är kulturhistoriskt värdefull och taklösningen bör anpassas till husens karaktär. Vi väljer material och kulörer som passar originalet — ofta dubbelfalsad plåt eller tegelpannor — och bevarar detaljer som vindskivor och beslag. Boka en kostnadsfri takkontroll så ger vi en rekommendation för din fastighet.",
    },
    primaryKeyword: "takläggare Hässelby",
    lat: 59.3764,
    lng: 17.8667,
    nearbyLocations: ["Vällingby", "Bromma", "Spånga"],
  },
  {
    slug: "vallingby",
    name: "Vällingby",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Vällingby — takbyte, takrenovering och plåtarbeten i västra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vällingby växte fram som en av Europas mest uppmärksammade ABC-städer på 1950-talet, med en blandning av centrumanläggning, bostadshus och villabebyggelse. Taken i Vällingby speglar denna period — plåttak och tegeltak från 50- och 60-talet som nu nått sin livslängd. Vi utför takbyten, takomläggningar och plåtarbeten i Vällingby med material valt för den äldre bebyggelsens karaktär. Många tak har betongpannor som frostsprängt och underlagspapp som torkat sönder.",
    extraContent:
      "I Vällingby ser vi ofta tak från 50- och 60-talet där omläggning med ny papp, ny läkt och plåt är bäst ekonomi över 30 år. För bostadsrättsfastigheterna runt centrum planerar vi ställning och avfall så att boende störas minimalt. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
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
      "Takläggare i Spånga — takbyte, takrenovering och plåtarbeten i västra Stockholm. Fast pris och 10 års utförandegaranti.",
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
      "Takläggare i Vendelsö — takbyte, takrenovering och plåtarbeten i Haninge kommun. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vendelsö är en villamilstolpe i Haninge kommun, med 70- och 80-talsvillor och radhus i skogsnära läge. Många tak är nu 30–40 år gamla med betongpannor som frostspränger och underlagspapp som torkat sönder. Vi utför takbyten och takomläggningar i Vendelsö med både plåttak och betongpannor, alltid med ny taksäkerhet och fungerande ventilation. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Vendelsö ser vi ofta tak nära skog där mossbildningen är kraftig. Regelbunden taktvätt kan förlänga takets liv, men när pannorna börjat frostspränga är omläggning bättre ekonomi. Vi hjälper dig jämföra totalkostnad över 30 år, inte bara pris per kvadratmeter idag.",
    uniqueFAQ: {
      question: "När bör jag byta tak på min villa i Vendelsö?",
      answer:
        "Tecken på att det är dags: frostsprängda betongpannor, sliten underlagspapp, mossa som inte går bort vid tvätt eller rostiga plåtbeslag. Många tak i Vendelsö från 70- och 80-talet är nu mogna för byte eller omläggning. Boka en kostnadsfri takkontroll så bedömer vi takets skick.",
    },
    primaryKeyword: "takläggare Vendelsö",
    lat: 59.1397,
    lng: 18.2006,
    nearbyLocations: ["Vega", "Haninge", "Tyresö"],
  },
  {
    slug: "vega",
    name: "Vega",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Vega — takbyte, takrenovering och plåtarbeten i Haninge kommun. Fast pris och 10 års utförandegaranti.",
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
      "Takläggare i Älvsjö — takbyte, takrenovering och plåtarbeten i södra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Älvsjö har en blandning av villabebyggelse från tidigt 1900-tal och bostadsrättsfastigheter från miljonprogramtiden. Taken varierar från tegeltak på äldre villor till plåttak på bostadshus. En del av bebyggelsen från miljonprogramtiden har tak som med åren blir mogna för omläggning eller byte. Vi utför takbyten och takrenoveringar i Älvsjö med både plåttak och betongpannor, och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Älvsjö ser vi ofta tak där underlagspappen torkat sönder och betongpannor börjat frostspränga — ett typiskt förlopp för tak i denna ålder. Omläggning med ny papp, ny läkt och plåt är då oftast bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag.",
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
      "Takläggare i Enskede — takbyte, takrenovering och plåtarbeten i södra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Enskede är en av Stockholms äldsta trädgårdsstäder med villabebyggelse från 1900- och 1910-talen, blandat med nyare bostadsområden. Taken på de äldsta husen är ofta tegeltak och plåttak från tidigt 1900-tal. Vi utför takbyten och takrenoveringar i Enskede med respekt för trädgårdsstadens kulturhistoriska värden — tegelpannor, dubbelfalsad plåt och handfalsade beslag. Många tak är nu mogna för omläggning.",
    extraContent:
      "I Enskede trädgårdsstad anpassar vi material och kulörer till husens ålder och arkitektur. Vi bevarar gärna ursprungliga detaljer när de går att renovera och föreslår inte ett helt takbyte om en riktad renovering räcker. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    uniqueFAQ: {
      question: "Behöver jag bygglov för takbyte i Enskede trädgårdsstad?",
      answer:
        "Ett takbyte med samma material och kulör kräver oftast inget bygglov, men Enskede är en kulturhistoriskt värdefull trädgårdsstad där materialval kan behöva anpassas. Vi hjälper dig kontrollera vad som gäller för din fastighet och anpassar utförandet. Boka en kostnadsfri takkontroll så vägleder vi dig.",
    },
    primaryKeyword: "takläggare Enskede",
    lat: 59.2917,
    lng: 18.0867,
    nearbyLocations: ["Stockholm", "Älvsjö", "Skarpnäck"],
  },
  {
    slug: "skarpnack",
    name: "Skarpnäck",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Skarpnäck — takbyte, takrenovering och plåtarbeten i södra Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Skarpnäck har en blandning av småhusbebyggelse, bostadsrättsområden och 70-talsradhus. Taken varierar från plåttak på bostadshus till betongpannor på villor och radhus. Många tak är nu 30–40 år gamla och mogna för omläggning. Vi utför takbyten och takrenoveringar i Skarpnäck med både plåttak och betongpannor, och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Skarpnäck ser vi ofta tak nära grönområden där mossbildningen är kraftig. Regelbunden taktvätt kan förlänga takets liv, men när pannorna frostsprängt är omläggning bättre ekonomi. Vi bedömer alltid behovet av snörasskydd över entréer. Vi hjälper dig jämföra totalkostnad över 30 år.",
    uniqueFAQ: {
      question: "Räcker taktvätt eller behöver jag omlägga taket i Skarpnäck?",
      answer:
        "Det avgörs av underlaget. Är pannorna hela och underlagspappen tät räcker taktvätt med biocidbehandling. Har frostsprängning börjat eller pappen torkat sönder är omläggning bättre ekonomi. Vi gör en kostnadsfri takkontroll i Skarpnäck och ger en ärlig rekommendation.",
    },
    primaryKeyword: "takläggare Skarpnäck",
    lat: 59.2731,
    lng: 18.1219,
    nearbyLocations: ["Stockholm", "Enskede", "Farsta"],
  },
  // ---- Sydvästra Stockholm ----
  {
    slug: "botkyrka",
    name: "Botkyrka",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Botkyrka — takbyte, takrenovering och plåtarbeten sydväst om Stockholm. Fast pris och 10 års utförandegaranti.",
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
      "Takläggare i Salem — takbyte, takrenovering och plåtarbeten sydväst om Stockholm. Fast pris och 10 års utförandegaranti.",
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
      "Takläggare i Södertälje — takbyte, takrenovering och plåtarbeten sydväst om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Södertälje är en industri- och hamnstad vid Södertäljeviken och Mälaren, med en blandning av innerstadsbebyggelse, villaområden och bostadsrättsfastigheter. Taken varierar från tegeltak i centrum till plåttak på industribyggnader. Vi utför takbyten, takomläggningar och plåtarbeten i Södertälje för både villatak och större fastigheter. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Södertäljes industri- och hamnområden arbetar vi med plåttak och membrantak på flacka ytor, medan villaområdena oftast får betongpannor eller dubbelfalsad plåt. Vi bedömer behovet av snörasskydd och ser till att taksäkerheten uppfyller svenska krav.",
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
      "Takläggare i Upplands-Bro — takbyte, takrenovering och plåtarbeten nordväst om Stockholm. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Upplands-Bro kommun omfattar Kungsängen, Bro och Brunna, med villabebyggelse och bostadsrättsområden i ett sjö- och skogsnära läge. Taken varierar från betongpannor på 70-talsvillor till plåttak på nyare hus. Vi utför takbyten, takomläggningar och plåtarbeten i Upplands-Bro med material valt för det varierade klimatet. Vi lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "I Upplands-Bro ser vi ofta villatak där omläggning med ny papp, ny läkt och plåt är bäst ekonomi över 30 år. Vi hjälper dig jämföra totalkostnad, inte bara pris per kvadratmeter idag. Vi bedömer alltid behovet av snörasskydd över entréer.",
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
      "Takläggare i Hammarby Sjöstad — takbyte, takrenovering och plåtarbeten i Hammarby Sjöstad. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Hammarby Sjöstad är modern sjönära stadsdel med flacka tak och stora takterrasser. Bebyggelsen består till stor del av moderna flerbostadshus med papp-, duk- och plåttak från 2000-talet, och det är just åldern på taken som gör att många fastighetsägare i Hammarby Sjöstad hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Hammarby Sjöstad med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll, ett fast pris och en tidplan vi håller oss till. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Hammarby Sjöstad — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Hammarby Sjöstad.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Hammarby Sjöstad?",
      answer:
        "Priset för ett takbyte i Hammarby Sjöstad beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
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
      "Takläggare i Liljeholmen — takbyte, takrenovering och plåtarbeten i Liljeholmen. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi utför takbyte, takomläggning och plåtarbeten i Liljeholmen, tät stadsdel i södra innerstaden med blandad bebyggelse. Bebyggelsen består till stor del av bostadsrättsfastigheter från 1930-tal blandat med nyproduktion, och de skador vi oftast hittar vid takkontroll är spröd underlagspapp, rostiga beslag och otäta genomföringar kring skorsten och ventilation. Vi går igenom hela takkonstruktionen innan vi lämnar fast pris, och du har samma kontaktperson från takkontroll till slutgenomgång.",
    extraContent:
      "Vi går igenom förutsättningarna i Liljeholmen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Liljeholmen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Liljeholmen?",
      answer:
        "Priset för ett takbyte i Liljeholmen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
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
      "Takläggare i Årsta — takbyte, takrenovering och plåtarbeten i Årsta. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Årsta — klassisk folkhemsstadsdel med stora sammanhängande takytor — har ett fastighetsbestånd med lamellhus från 1940–50-tal och villor i Årsta villastad. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Årsta: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris och tydlig tidplan, och tar hand om hela processen från takkontroll till bortforslat avfall.",
    extraContent:
      "Vi går igenom förutsättningarna i Årsta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Årsta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Årsta?",
      answer:
        "Priset för ett takbyte i Årsta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
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
      "Takläggare i Hägersten — takbyte, takrenovering och plåtarbeten i Hägersten. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Hägersten är grönt villa- och flerfamiljsområde sydväst om innerstaden. Bebyggelsen består till stor del av villor från 1930-talet och trevåningshus med tegel- och plåttak, och det är just åldern på taken som gör att många fastighetsägare i Hägersten hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Hägersten med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Takkontroll och offert är kostnadsfria, och priset vi lämnar är det du betalar. Ställning, leveranser, avfall och slutstädning ingår i vårt ansvar.",
    extraContent:
      "Vi går igenom förutsättningarna i Hägersten — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Hägersten.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Hägersten?",
      answer:
        "Priset för ett takbyte i Hägersten beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
    },
    primaryKeyword: "takläggare Hägersten",
    lat: 59.3006,
    lng: 17.9856,
    nearbyLocations: ["Aspudden", "Liljeholmen", "Skärholmen"],
  },
  {
    slug: "grondal",
    name: "Gröndal",
    region: "Stockholms stad",
    isIsland: false,
    description:
      "Takläggare i Gröndal — takbyte, takrenovering och plåtarbeten i Gröndal. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "I Gröndal, kuperad stadsdel vid Mälaren med branta tak arbetar vi löpande med tak på stjärnhus och funkisfastigheter från 1940-talet. Vid en kostnadsfri takkontroll kontrollerar vi underlagspapp, läkt, råspont, plåtbeslag och ventilation under taket — det är där ett takbyte avgörs. Du får en skriftlig bedömning och ett fast pris innan något arbete påbörjas.",
    extraContent:
      "Vi går igenom förutsättningarna i Gröndal — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Gröndal.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Gröndal?",
      answer:
        "Priset för ett takbyte i Gröndal beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
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
      "Takläggare i Aspudden — takbyte, takrenovering och plåtarbeten i Aspudden. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Aspudden — småskalig stadsdel med tät kvartersbebyggelse — har ett fastighetsbestånd med 1920–30-talsfastigheter med tegel- och plåttak. En stor del av taken här är från samma byggår, vilket innebär att de nu behöver läggas om. RoslagsTak utför kompletta takprojekt i Aspudden: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Hela projektet hålls samman av oss — takkontroll, materialval, ställning, takarbete och bortforsling.",
    extraContent:
      "Vi går igenom förutsättningarna i Aspudden — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Aspudden.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Aspudden?",
      answer:
        "Priset för ett takbyte i Aspudden beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
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
      "Takläggare i Häggvik — takbyte, takrenovering och plåtarbeten i Häggvik. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Häggvik är villa- och radhusområde i södra Sollentuna. Bebyggelsen består till stor del av villor och radhus från 1960–70-tal med betongpannor, och det är just åldern på taken som gör att många fastighetsägare i Häggvik hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Häggvik med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Vi börjar alltid med en kostnadsfri takkontroll på plats och en skriftlig offert med fast pris. Vi sköter ställning, transporter och bortforsling — du behöver inte hyra eller beställa något själv.",
    extraContent:
      "Vi går igenom förutsättningarna i Häggvik — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Häggvik.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Häggvik?",
      answer:
        "Priset för ett takbyte i Häggvik beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
    },
    primaryKeyword: "takläggare Häggvik",
    lat: 59.3856,
    lng: 18.0361,
    nearbyLocations: ["Sollentuna", "Helenelund", "Norrviken"],
  },
  {
    slug: "helenelund",
    name: "Helenelund",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Helenelund — takbyte, takrenovering och plåtarbeten i Helenelund. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi lägger tak i Helenelund, pendlingsnära del av Sollentuna, där villor och radhus från 1960–70-tal dominerar. Äldre tak i området har ofta samma problem under pannorna: sliten papp, uttorkade tätningar och beslag som börjat rosta. Vi byter det som behöver bytas, säkerställer rätt ventilation och lämnar 10 års utförandegaranti på arbetet.",
    extraContent:
      "Vi går igenom förutsättningarna i Helenelund — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Helenelund.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Helenelund?",
      answer:
        "Priset för ett takbyte i Helenelund beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
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
      "Takläggare i Edsberg — takbyte, takrenovering och plåtarbeten i Edsberg. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Edsberg — villa- och flerfamiljsområde vid Edsviken — har ett fastighetsbestånd med 1970-talsbebyggelse med flacka tak och äldre villor. Taken börjar närma sig slutet av sin livslängd, och då är omläggning oftast bättre ekonomi än lappning. RoslagsTak utför kompletta takprojekt i Edsberg: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Edsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Edsberg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Edsberg?",
      answer:
        "Priset för ett takbyte i Edsberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
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
      "Takläggare i Rotebro — takbyte, takrenovering och plåtarbeten i Rotebro. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Rotebro är norra delen av Sollentuna kommun. Bebyggelsen består till stor del av villaområden och radhuslängor med betongpannor, och det är just åldern på taken som gör att många fastighetsägare i Rotebro hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Rotebro med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll, ett fast pris och en tidplan vi håller oss till. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Rotebro — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Rotebro.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Rotebro?",
      answer:
        "Priset för ett takbyte i Rotebro beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
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
      "Takläggare i Norrviken — takbyte, takrenovering och plåtarbeten i Norrviken. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Vi tar uppdrag för takbyte och takrenovering i Norrviken (sjönära villaområde i Sollentuna). Här handlar det oftast om äldre villor med tegel- och plåttak, och vi anpassar material, infästning och plåtdetaljer efter husets ålder och läge. Efter takkontrollen får du ett fast pris, en tidplan och besked om vad som ingår — inga tillägg i efterhand.",
    extraContent:
      "Vi går igenom förutsättningarna i Norrviken — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Norrviken.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Norrviken?",
      answer:
        "Priset för ett takbyte i Norrviken beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
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
      "Takläggare i Stocksund — takbyte, takrenovering och plåtarbeten i Stocksund. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Stocksund — exklusivt villaområde i Danderyd — har ett fastighetsbestånd med sekelskiftesvillor med brant taklutning och plåtdetaljer. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Stocksund: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris och tydlig tidplan, och tar hand om hela processen från takkontroll till bortforslat avfall.",
    extraContent:
      "Vi går igenom förutsättningarna i Stocksund — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Stocksund.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Stocksund?",
      answer:
        "Priset för ett takbyte i Stocksund beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
    },
    primaryKeyword: "takläggare Stocksund",
    lat: 59.3931,
    lng: 18.085,
    nearbyLocations: ["Danderyd", "Bergshamra", "Enebyberg"],
  },
  {
    slug: "enebyberg",
    name: "Enebyberg",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Enebyberg — takbyte, takrenovering och plåtarbeten i Enebyberg. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Enebyberg är ett villasamhälle som till stor del präglas av bebyggelse från 1900-talets första hälft. Historien som villastad börjar 1906, när ägaren av Enebybergs gård började stycka av mark i anslutning till det som i dag är Roslagsbanan. Året därpå bildades AB Enebybergs villastad och tomtförsäljningen kom igång, och 1914 var bebyggelsen så omfattande att Enebyberg blev municipalsamhälle. Stadsplanen från 1923 omfattade omkring 550 tomter. Villorna byggdes först i de östra delarna längs järnvägen, och på 1930-talet växte samhället väster om Breda vägen. Under 1940-talet var alla tomter bebyggda, och ny mark togs i anspråk först i slutet av 1960-talet, då rad- och kedjehusområden tillkom i västra Enebyberg, bland annat vid Eneby gård. Namnet går tillbaka på Enebybergs gård, vars huvudbyggnad från 1770-talet ligger i västra Enebyberg, intill Rinkebyskogen. Det ger Enebyberg två tydliga generationer av hus: den tidiga villastaden i öster och rad- och kedjehusen från 1960- och 70-talen i väster.",
    extraContent:
      "I den äldre villastaden har taken i regel bytts eller lagts om, ibland flera gånger, och skicket skiljer sig mycket mellan husen. Äldre villor kan ha brantare takfall, takkupor, skorstenar och plåtdetaljer som behöver hanteras med omsorg för att husets karaktär ska finnas kvar efter ett byte. Kedjehusen och radhusen från 1960- och 70-talen är i dag runt femtio år gamla — där taket inte har lagts om är underlagspapp, läkt och plåtdetaljer ofta i den ålder där det är dags att se över dem. Eftersom husen i ett kedjehusområde oftast är likadana och byggdes samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva, men varje hus får ändå en egen takkontroll och ett eget pris. Om ett takbyte kräver lov eller anmälan, till exempel vid byte av material eller kulör, avgör Danderyds kommun. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Enebyberg.",
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
        "Priset för ett takbyte i Enebyberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
    },
    primaryKeyword: "takläggare Enebyberg",
    lat: 59.4225,
    lng: 18.0294,
    nearbyLocations: ["Danderyd", "Täby", "Stocksund"],
  },
  {
    slug: "jakobsberg",
    name: "Jakobsberg",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Jakobsberg — takbyte, takrenovering och plåtarbeten i Jakobsberg. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Bland flerbostadshus från miljonprogrammet och villaområden ser vi ofta att underlagspappen tjänat ut långt före själva taktäckningen — då räcker det sällan att byta enstaka pannor. Vi går igenom konstruktionen, föreslår den lösning som ger bäst ekonomi över 30 år och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Jakobsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Jakobsberg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Jakobsberg?",
      answer:
        "Priset för ett takbyte i Jakobsberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
    },
    primaryKeyword: "takläggare Jakobsberg",
    lat: 59.4231,
    lng: 17.8342,
    nearbyLocations: ["Järfälla", "Barkarby", "Viksjö"],
  },
  {
    slug: "barkarby",
    name: "Barkarby",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Barkarby — takbyte, takrenovering och plåtarbeten i Barkarby. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Barkarby — expansiv stadsdel i Järfälla — har ett fastighetsbestånd med nyproduktion med flacka tak blandat med äldre villor. En stor del av taken här är från samma byggår, vilket innebär att de nu behöver läggas om. RoslagsTak utför kompletta takprojekt i Barkarby: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Hela projektet hålls samman av oss — takkontroll, materialval, ställning, takarbete och bortforsling.",
    extraContent:
      "Vi går igenom förutsättningarna i Barkarby — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Barkarby.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Barkarby?",
      answer:
        "Priset för ett takbyte i Barkarby beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
    },
    primaryKeyword: "takläggare Barkarby",
    lat: 59.4103,
    lng: 17.8664,
    nearbyLocations: ["Jakobsberg", "Järfälla", "Spånga"],
  },
  {
    slug: "kallhall",
    name: "Kallhäll",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Kallhäll — takbyte, takrenovering och plåtarbeten i Kallhäll. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Kallhäll är norra Järfälla vid Mälaren. Bebyggelsen består till stor del av villor och radhus från 1960–80-tal, och det är just åldern på taken som gör att många fastighetsägare i Kallhäll hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Kallhäll med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Vi börjar alltid med en kostnadsfri takkontroll på plats och en skriftlig offert med fast pris. Vi sköter ställning, transporter och bortforsling — du behöver inte hyra eller beställa något själv.",
    extraContent:
      "Vi går igenom förutsättningarna i Kallhäll — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Kallhäll.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Kallhäll?",
      answer:
        "Priset för ett takbyte i Kallhäll beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
    },
    primaryKeyword: "takläggare Kallhäll",
    lat: 59.4553,
    lng: 17.8125,
    nearbyLocations: ["Jakobsberg", "Bro", "Järfälla"],
  },
  {
    slug: "viksjo",
    name: "Viksjö",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Viksjö — takbyte, takrenovering och plåtarbeten i Viksjö. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi utför takbyte, takomläggning och plåtarbeten i Viksjö, stort villaområde i västra Järfälla. Bebyggelsen består till stor del av 1970-talsvillor med betongpannor och låglutande tak, och de skador vi oftast hittar vid takkontroll är spröd underlagspapp, rostiga beslag och otäta genomföringar kring skorsten och ventilation. Vi går igenom hela takkonstruktionen innan vi lämnar fast pris, och du har samma kontaktperson från takkontroll till slutgenomgång.",
    extraContent:
      "Vi går igenom förutsättningarna i Viksjö — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Viksjö.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Viksjö?",
      answer:
        "Priset för ett takbyte i Viksjö beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
    },
    primaryKeyword: "takläggare Viksjö",
    lat: 59.4192,
    lng: 17.8006,
    nearbyLocations: ["Jakobsberg", "Kallhäll", "Barkarby"],
  },
  {
    slug: "bro",
    name: "Bro",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Bro — takbyte, takrenovering och plåtarbeten i Bro. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Bro — tätort i Upplands-Bro — har ett fastighetsbestånd med villor, radhus och lantbruksfastigheter. Taken börjar närma sig slutet av sin livslängd, och då är omläggning oftast bättre ekonomi än lappning. RoslagsTak utför kompletta takprojekt i Bro: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Bro — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Bro.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Bro?",
      answer:
        "Priset för ett takbyte i Bro beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
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
      "Takläggare i Kungsängen — takbyte, takrenovering och plåtarbeten i Kungsängen. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Kungsängen är Upplands-Bros centralort vid Mälaren. Bebyggelsen består till stor del av villaområden och flerbostadshus, och det är just åldern på taken som gör att många fastighetsägare i Kungsängen hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Kungsängen med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll, ett fast pris och en tidplan vi håller oss till. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Kungsängen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Kungsängen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Kungsängen?",
      answer:
        "Priset för ett takbyte i Kungsängen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
    },
    primaryKeyword: "takläggare Kungsängen",
    lat: 59.4783,
    lng: 17.7472,
    nearbyLocations: ["Bro", "Upplands-Bro", "Kallhäll"],
  },
  {
    slug: "marsta",
    name: "Märsta",
    region: "Nordvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Märsta — takbyte, takrenovering och plåtarbeten i Märsta. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "I Märsta, Sigtuna kommuns största tätort arbetar vi löpande med tak på radhus och flerbostadshus från 1970-talet. Vid en kostnadsfri takkontroll kontrollerar vi underlagspapp, läkt, råspont, plåtbeslag och ventilation under taket — det är där ett takbyte avgörs. Du får en skriftlig bedömning och ett fast pris innan något arbete påbörjas.",
    extraContent:
      "Vi går igenom förutsättningarna i Märsta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Märsta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Märsta?",
      answer:
        "Priset för ett takbyte i Märsta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
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
      "Takläggare i Blackeberg — takbyte, takrenovering och plåtarbeten i Blackeberg. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Blackeberg — funkisstadsdel i västra Bromma — har ett fastighetsbestånd med smalhus från 1950-talet och villor. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Blackeberg: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris och tydlig tidplan, och tar hand om hela processen från takkontroll till bortforslat avfall.",
    extraContent:
      "Vi går igenom förutsättningarna i Blackeberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Blackeberg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Blackeberg?",
      answer:
        "Priset för ett takbyte i Blackeberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
    },
    primaryKeyword: "takläggare Blackeberg",
    lat: 59.3378,
    lng: 17.8664,
    nearbyLocations: ["Vällingby", "Bromma", "Ängby"],
  },
  {
    slug: "nockeby",
    name: "Nockeby",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Nockeby — takbyte, takrenovering och plåtarbeten i Nockeby. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Nockeby är exklusivt villaområde vid Mälaren. Bebyggelsen består till stor del av stora villor med tegel- och plåttak, och det är just åldern på taken som gör att många fastighetsägare i Nockeby hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Nockeby med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Takkontroll och offert är kostnadsfria, och priset vi lämnar är det du betalar. Ställning, leveranser, avfall och slutstädning ingår i vårt ansvar.",
    extraContent:
      "Vi går igenom förutsättningarna i Nockeby — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Nockeby.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Nockeby?",
      answer:
        "Priset för ett takbyte i Nockeby beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
    },
    primaryKeyword: "takläggare Nockeby",
    lat: 59.3283,
    lng: 17.9036,
    nearbyLocations: ["Bromma", "Ängby", "Hässelby"],
  },
  {
    slug: "abrahamsberg",
    name: "Abrahamsberg",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Abrahamsberg — takbyte, takrenovering och plåtarbeten i Abrahamsberg. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi lägger tak i Abrahamsberg, trädgårdsstad i Bromma, där funkisvillor och trevåningshus från 1930–40-tal dominerar. Äldre tak i området har ofta samma problem under pannorna: sliten papp, uttorkade tätningar och beslag som börjat rosta. Vi byter det som behöver bytas, säkerställer rätt ventilation och lämnar 10 års utförandegaranti på arbetet.",
    extraContent:
      "Vi går igenom förutsättningarna i Abrahamsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Abrahamsberg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Abrahamsberg?",
      answer:
        "Priset för ett takbyte i Abrahamsberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
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
    description:
      "Takläggare i Ängby — takbyte, takrenovering och plåtarbeten i Ängby. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Ängby — klassisk villastad i Bromma — har ett fastighetsbestånd med funkisvillor från 1930-talet med brant tak. En stor del av taken här är från samma byggår, vilket innebär att de nu behöver läggas om. RoslagsTak utför kompletta takprojekt i Ängby: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Hela projektet hålls samman av oss — takkontroll, materialval, ställning, takarbete och bortforsling.",
    extraContent:
      "Vi går igenom förutsättningarna i Ängby — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Ängby.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Ängby?",
      answer:
        "Priset för ett takbyte i Ängby beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
    },
    primaryKeyword: "takläggare Ängby",
    lat: 59.3372,
    lng: 17.8981,
    nearbyLocations: ["Blackeberg", "Abrahamsberg", "Bromma"],
  },
  {
    slug: "kista",
    name: "Kista",
    region: "Västerort",
    isIsland: false,
    description:
      "Takläggare i Kista — takbyte, takrenovering och plåtarbeten i Kista. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Kista är kontors- och bostadsstadsdel i nordvästra Stockholm. Bebyggelsen består till stor del av flacka tak på kontorsfastigheter och flerbostadshus, och det är just åldern på taken som gör att många fastighetsägare i Kista hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Kista med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Vi börjar alltid med en kostnadsfri takkontroll på plats och en skriftlig offert med fast pris. Vi sköter ställning, transporter och bortforsling — du behöver inte hyra eller beställa något själv.",
    extraContent:
      "Vi går igenom förutsättningarna i Kista — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Kista.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Kista?",
      answer:
        "Priset för ett takbyte i Kista beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
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
      "Takläggare i Akalla — takbyte, takrenovering och plåtarbeten i Akalla. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Vi tar uppdrag för takbyte och takrenovering i Akalla (norra Järvaområdet). Här handlar det oftast om miljonprogramsbebyggelse med papp- och plåttak, och vi anpassar material, infästning och plåtdetaljer efter husets ålder och läge. Efter takkontrollen får du ett fast pris, en tidplan och besked om vad som ingår — inga tillägg i efterhand.",
    extraContent:
      "Vi går igenom förutsättningarna i Akalla — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Akalla.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Akalla?",
      answer:
        "Priset för ett takbyte i Akalla beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
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
      "Takläggare i Tensta — takbyte, takrenovering och plåtarbeten i Tensta. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Tensta — del av Järvafältet — har ett fastighetsbestånd med flerbostadshus från 1970-talet med stora takytor. Taken börjar närma sig slutet av sin livslängd, och då är omläggning oftast bättre ekonomi än lappning. RoslagsTak utför kompletta takprojekt i Tensta: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Tensta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Tensta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Tensta?",
      answer:
        "Priset för ett takbyte i Tensta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
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
    description:
      "Takläggare i Saltsjöbaden — takbyte, takrenovering och plåtarbeten i Saltsjöbaden. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Saltsjöbaden är kustnära villasamhälle i Nacka. Bebyggelsen består till stor del av sekelskiftesvillor med komplexa tak och plåtdetaljer, och det är just åldern på taken som gör att många fastighetsägare i Saltsjöbaden hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Saltsjöbaden med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll, ett fast pris och en tidplan vi håller oss till. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Saltsjöbaden — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Saltsjöbaden.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Saltsjöbaden?",
      answer:
        "Priset för ett takbyte i Saltsjöbaden beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
    },
    primaryKeyword: "takläggare Saltsjöbaden",
    lat: 59.2828,
    lng: 18.3078,
    nearbyLocations: ["Fisksätra", "Nacka", "Saltsjö-Boo"],
  },
  {
    slug: "fisksatra",
    name: "Fisksätra",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Fisksätra — takbyte, takrenovering och plåtarbeten i Fisksätra. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Bland flerbostadshus från 1970-talet ser vi ofta att underlagspappen tjänat ut långt före själva taktäckningen — då räcker det sällan att byta enstaka pannor. Vi går igenom konstruktionen, föreslår den lösning som ger bäst ekonomi över 30 år och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Fisksätra — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Fisksätra.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Fisksätra?",
      answer:
        "Priset för ett takbyte i Fisksätra beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
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
      "Takläggare i Saltsjö-Boo — takbyte, takrenovering och plåtarbeten i Saltsjö-Boo. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Saltsjö-Boo — sjönära villaområde i norra Nacka — har ett fastighetsbestånd med villor från 1950-tal till nyproduktion. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Saltsjö-Boo: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris och tydlig tidplan, och tar hand om hela processen från takkontroll till bortforslat avfall.",
    extraContent:
      "Vi går igenom förutsättningarna i Saltsjö-Boo — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Saltsjö-Boo.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Saltsjö-Boo?",
      answer:
        "Priset för ett takbyte i Saltsjö-Boo beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
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
      "Takläggare i Älta — takbyte, takrenovering och plåtarbeten i Älta. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Älta är tätort mellan Nacka och Tyresö. Bebyggelsen består till stor del av radhus, villor och flerbostadshus, och det är just åldern på taken som gör att många fastighetsägare i Älta hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Älta med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Takkontroll och offert är kostnadsfria, och priset vi lämnar är det du betalar. Ställning, leveranser, avfall och slutstädning ingår i vårt ansvar.",
    extraContent:
      "Vi går igenom förutsättningarna i Älta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Älta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Älta?",
      answer:
        "Priset för ett takbyte i Älta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
    },
    primaryKeyword: "takläggare Älta",
    lat: 59.2681,
    lng: 18.1725,
    nearbyLocations: ["Nacka", "Tyresö", "Fisksätra"],
  },
  {
    slug: "gustavsberg",
    name: "Gustavsberg",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Gustavsberg — takbyte, takrenovering och plåtarbeten i Gustavsberg. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi utför takbyte, takomläggning och plåtarbeten i Gustavsberg, Värmdös centralort med bruksbebyggelse. Bebyggelsen består till stor del av äldre bruksbostäder, villor och nyproduktion, och de skador vi oftast hittar vid takkontroll är spröd underlagspapp, rostiga beslag och otäta genomföringar kring skorsten och ventilation. Vi går igenom hela takkonstruktionen innan vi lämnar fast pris, och du har samma kontaktperson från takkontroll till slutgenomgång.",
    extraContent:
      "Vi går igenom förutsättningarna i Gustavsberg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Gustavsberg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Gustavsberg?",
      answer:
        "Priset för ett takbyte i Gustavsberg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
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
    isIsland: false,
    description:
      "Takläggare på Ingarö — takbyte, takrenovering och plåtarbeten på Ingarö. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Ingarö — skärgårdsnära ö i Värmdö kommun — har ett fastighetsbestånd med fritidshus och permanentboenden i utsatt läge. En stor del av taken här är från samma byggår, vilket innebär att de nu behöver läggas om. RoslagsTak utför kompletta takprojekt på Ingarö: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Hela projektet hålls samman av oss — takkontroll, materialval, ställning, takarbete och bortforsling.",
    extraContent:
      "Vi går igenom förutsättningarna på Ingarö — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll på Ingarö.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak på Ingarö?",
      answer:
        "Priset för ett takbyte på Ingarö beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
    },
    primaryKeyword: "takläggare Ingarö",
    lat: 59.2839,
    lng: 18.4667,
    nearbyLocations: ["Värmdö", "Gustavsberg", "Hemmesta"],
  },
  {
    slug: "hemmesta",
    name: "Hemmesta",
    region: "Östra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Hemmesta — takbyte, takrenovering och plåtarbeten i Hemmesta. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Hemmesta är tätort i centrala Värmdö. Bebyggelsen består till stor del av villaområden och radhus, och det är just åldern på taken som gör att många fastighetsägare i Hemmesta hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Hemmesta med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Vi börjar alltid med en kostnadsfri takkontroll på plats och en skriftlig offert med fast pris. Vi sköter ställning, transporter och bortforsling — du behöver inte hyra eller beställa något själv.",
    extraContent:
      "Vi går igenom förutsättningarna i Hemmesta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Hemmesta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Hemmesta?",
      answer:
        "Priset för ett takbyte i Hemmesta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
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
      "Takläggare i Trollbäcken — takbyte, takrenovering och plåtarbeten i Trollbäcken. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "I Trollbäcken, stort villaområde i Tyresö arbetar vi löpande med tak på villor från 1950–70-tal med betongpannor. Vid en kostnadsfri takkontroll kontrollerar vi underlagspapp, läkt, råspont, plåtbeslag och ventilation under taket — det är där ett takbyte avgörs. Du får en skriftlig bedömning och ett fast pris innan något arbete påbörjas.",
    extraContent:
      "Vi går igenom förutsättningarna i Trollbäcken — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Trollbäcken.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Trollbäcken?",
      answer:
        "Priset för ett takbyte i Trollbäcken beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
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
      "Takläggare i Brandbergen — takbyte, takrenovering och plåtarbeten i Brandbergen. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Brandbergen — bostadsområde i Haninge — har ett fastighetsbestånd med flerbostadshus med stora flacka takytor. Taken börjar närma sig slutet av sin livslängd, och då är omläggning oftast bättre ekonomi än lappning. RoslagsTak utför kompletta takprojekt i Brandbergen: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Brandbergen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Brandbergen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Brandbergen?",
      answer:
        "Priset för ett takbyte i Brandbergen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
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
      "Takläggare i Handen — takbyte, takrenovering och plåtarbeten i Handen. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Handen är Haninges centralort. Bebyggelsen består till stor del av blandad bebyggelse med villor och bostadsrättsfastigheter, och det är just åldern på taken som gör att många fastighetsägare i Handen hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Handen med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll, ett fast pris och en tidplan vi håller oss till. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Handen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Handen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Handen?",
      answer:
        "Priset för ett takbyte i Handen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
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
      "Takläggare i Jordbro — takbyte, takrenovering och plåtarbeten i Jordbro. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi lägger tak i Jordbro, södra Haninge, där radhus och flerbostadshus från 1970-talet dominerar. Äldre tak i området har ofta samma problem under pannorna: sliten papp, uttorkade tätningar och beslag som börjat rosta. Vi byter det som behöver bytas, säkerställer rätt ventilation och lämnar 10 års utförandegaranti på arbetet.",
    extraContent:
      "Vi går igenom förutsättningarna i Jordbro — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Jordbro.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Jordbro?",
      answer:
        "Priset för ett takbyte i Jordbro beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
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
      "Takläggare i Västerhaninge — takbyte, takrenovering och plåtarbeten i Västerhaninge. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Västerhaninge — tätort i södra Haninge — har ett fastighetsbestånd med villor, radhus och äldre gårdsbebyggelse. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Västerhaninge: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris och tydlig tidplan, och tar hand om hela processen från takkontroll till bortforslat avfall.",
    extraContent:
      "Vi går igenom förutsättningarna i Västerhaninge — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Västerhaninge.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Västerhaninge?",
      answer:
        "Priset för ett takbyte i Västerhaninge beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
    },
    primaryKeyword: "takläggare Västerhaninge",
    lat: 59.12,
    lng: 18.0964,
    nearbyLocations: ["Jordbro", "Tungelsta", "Handen"],
  },
  {
    slug: "tungelsta",
    name: "Tungelsta",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Tungelsta — takbyte, takrenovering och plåtarbeten i Tungelsta. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Tungelsta är trädgårdssamhälle söder om Västerhaninge. Bebyggelsen består till stor del av äldre villor och handelsträdgårdsbebyggelse, och det är just åldern på taken som gör att många fastighetsägare i Tungelsta hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Tungelsta med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Takkontroll och offert är kostnadsfria, och priset vi lämnar är det du betalar. Ställning, leveranser, avfall och slutstädning ingår i vårt ansvar.",
    extraContent:
      "Vi går igenom förutsättningarna i Tungelsta — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Tungelsta.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Tungelsta?",
      answer:
        "Priset för ett takbyte i Tungelsta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
    },
    primaryKeyword: "takläggare Tungelsta",
    lat: 59.1,
    lng: 18.045,
    nearbyLocations: ["Västerhaninge", "Nynäshamn", "Jordbro"],
  },
  {
    slug: "dalaro",
    name: "Dalarö",
    region: "Sydöstra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Dalarö — takbyte, takrenovering och plåtarbeten i Dalarö. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Vi tar uppdrag för takbyte och takrenovering i Dalarö (kustsamhälle med skärgårdsklimat). Här handlar det oftast om trävillor och sommarhus i saltutsatt läge, och vi anpassar material, infästning och plåtdetaljer efter husets ålder och läge. Efter takkontrollen får du ett fast pris, en tidplan och besked om vad som ingår — inga tillägg i efterhand.",
    extraContent:
      "Vi går igenom förutsättningarna i Dalarö — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Dalarö.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Dalarö?",
      answer:
        "Priset för ett takbyte i Dalarö beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
    },
    primaryKeyword: "takläggare Dalarö",
    lat: 59.1339,
    lng: 18.4064,
    nearbyLocations: ["Haninge", "Handen", "Nynäshamn"],
  },
  {
    slug: "stuvsta",
    name: "Stuvsta",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Stuvsta — takbyte, takrenovering och plåtarbeten i Stuvsta. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Stuvsta växte fram kring järnvägen. När Stuvsta gård såldes 1908 köptes marken av privata exploatörer, och 1910 bildades ett fastighetsbolag som styckade tomter för egnahem. Tomtförsäljningen tog fart efter 1918, när stationen vid Västra stambanan öppnade. En tomtstyckningsplan kom 1926, och först 1947 fastställdes en stadsplan för området. Spåren av den tiden syns fortfarande: stationshuset från 1917–1918, ritat av arkitekten Folke Zetterwall, står kvar med ortens namn på gaveln, och Stuvstakyrkan från 1954 byggdes av tegel från en riven kyrka i Stockholm. I dag består Stuvsta till stor del av småhus, många av dem äldre friliggande villor. Rad- och kedjehus i Myrängen byggdes under 1980- och 1990-talen, och inom Stuvsta finns också områden som Solfagra, Kynäs, Segersminne och Stensängen — en ovanligt blandad kommundel, där en hundraårig villa och ett trettio år gammalt kedjehus kan ligga några kvarter från varandra.",
    extraContent:
      "För de äldre villorna från 1920- och 1930-talen har taket ofta bytts eller lagts om minst en gång sedan huset byggdes, men det är inte alltid känt när eller hur — ett äldre tak kan dessutom ha detaljer som kräver omsorg vid ett byte, till exempel takkupor, skorstenar och äldre plåtarbeten. Rad- och kedjehusen i Myrängen från 1980- och 90-talen har kommit upp i en ålder där många ägare börjar fundera på takets underlag, plåtdetaljer och hängrännor. Eftersom husen i en länga oftast är likadana och byggdes samtidigt kan grannar ibland ha nytta av att planera takbyten i samma veva — varje hus får ändå alltid en egen takkontroll och ett eget pris. Om ett konkret takbyte kräver lov eller anmälan, till exempel vid byte av material eller kulör, avgör Huddinge kommun. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Stuvsta.",
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
        "Priset för ett takbyte i Stuvsta beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
    },
    primaryKeyword: "takläggare Stuvsta",
    lat: 59.2444,
    lng: 17.9928,
    nearbyLocations: ["Huddinge", "Segeltorp", "Trångsund"],
  },
  {
    slug: "trangsund",
    name: "Trångsund",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Trångsund — takbyte, takrenovering och plåtarbeten i Trångsund. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Mellan sjöarna Drevviken och Magelungen i nordöstra Huddinge ligger Trångsund. Namnet kommer från det trånga sundet i Drevviken. Trångsund nämns första gången 1636 som ett torp, som med tiden blev en mindre herrgård. År 1762 köpte arkitekten Carl Fredrik Adelcrantz Trångsunds gård och lät uppföra en ny mangårdsbyggnad. I samband med 1960-talets utbyggnad fick kommundelen sitt centrum, och Tacksägelsekyrkan, ritad av arkitekten Sture Frölén, invigdes 1957. Kommundelen består av åtta delområden: Sjöängen, Nytorp, Stortorp, Hammartorp, Fållan, Mellansjö, Orlångsjö och Svartvik. Bebyggelsen har vuxit fram i etapper: Nynäsbanan blev klar 1901, med egen station i Trångsund, men styckningsplanerna omsattes först i slutet av 1920-talet. I Stortorp skapades mellan 1911 och 1928 över 600 tomter, och i Sjöängen styckades fastigheter av från Trångsunds herrgård. Resultatet är ett område där villor från olika decennier ligger sida vid sida: tidiga hus på styckningstomterna längs järnvägen och en stor våg av småhus från 1960-talet.",
    extraContent:
      "Ett hus från 1960-talet är i dag över sextio år gammalt. Tak från den tiden kan redan ha lagts om, men där det inte har skett är underlagspapp, läkt, plåtdetaljer och avvattning ofta i den ålder där det är dags att se över dem. Ett tak kan se helt ut från gatan och ändå ha ett slitet underlag. De äldre husen från styckningsåren har ofta byggts om och renoverats i flera omgångar, och skicket varierar därför mycket — där kan det också finnas äldre detaljer som skorstenar, takkupor och plåtarbeten som behöver hanteras med omsorg vid ett byte. Om ett takbyte med nytt material eller ny kulör kräver lov eller anmälan avgör Huddinge kommun. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Trångsund.",
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
        "Priset för ett takbyte i Trångsund beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
    },
    primaryKeyword: "takläggare Trångsund",
    lat: 59.2258,
    lng: 18.1069,
    nearbyLocations: ["Skogås", "Huddinge", "Farsta"],
  },
  {
    slug: "skogas",
    name: "Skogås",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Skogås — takbyte, takrenovering och plåtarbeten i Skogås. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Bland flerbostadshus och radhus ser vi ofta att underlagspappen tjänat ut långt före själva taktäckningen — då räcker det sällan att byta enstaka pannor. Vi går igenom konstruktionen, föreslår den lösning som ger bäst ekonomi över 30 år och lämnar fast pris efter kostnadsfri takkontroll.",
    extraContent:
      "Vi går igenom förutsättningarna i Skogås — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Skogås.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Skogås?",
      answer:
        "Priset för ett takbyte i Skogås beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
    },
    primaryKeyword: "takläggare Skogås",
    lat: 59.2286,
    lng: 18.1428,
    nearbyLocations: ["Trångsund", "Farsta", "Huddinge"],
  },
  {
    slug: "segeltorp",
    name: "Segeltorp",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Segeltorp — takbyte, takrenovering och plåtarbeten i Segeltorp. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Segeltorp — villaområde mellan Huddinge och Skärholmen — har ett fastighetsbestånd med villor från 1940–70-tal. Taken börjar närma sig slutet av sin livslängd, och då är omläggning oftast bättre ekonomi än lappning. RoslagsTak utför kompletta takprojekt i Segeltorp: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi håller samma kontaktväg genom hela projektet, från takkontrollen till slutgenomgången på plats.",
    extraContent:
      "Vi går igenom förutsättningarna i Segeltorp — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Segeltorp.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Segeltorp?",
      answer:
        "Priset för ett takbyte i Segeltorp beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
    },
    primaryKeyword: "takläggare Segeltorp",
    lat: 59.2794,
    lng: 17.945,
    nearbyLocations: ["Huddinge", "Skärholmen", "Stuvsta"],
  },
  {
    slug: "bandhagen",
    name: "Bandhagen",
    region: "Södra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Bandhagen — takbyte, takrenovering och plåtarbeten i Bandhagen. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Bandhagen är söderförort med grön karaktär. Bebyggelsen består till stor del av smalhus och radhus från 1950-talet, och det är just åldern på taken som gör att många fastighetsägare i Bandhagen hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Bandhagen med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll, ett fast pris och en tidplan vi håller oss till. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Bandhagen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Bandhagen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Bandhagen?",
      answer:
        "Priset för ett takbyte i Bandhagen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
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
      "Takläggare i Högdalen — takbyte, takrenovering och plåtarbeten i Högdalen. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi utför takbyte, takomläggning och plåtarbeten i Högdalen, stadsdel i söderort. Bebyggelsen består till stor del av flerbostadshus från 1950-talet med plåt- och papptak, och de skador vi oftast hittar vid takkontroll är spröd underlagspapp, rostiga beslag och otäta genomföringar kring skorsten och ventilation. Vi går igenom hela takkonstruktionen innan vi lämnar fast pris, och du har samma kontaktperson från takkontroll till slutgenomgång.",
    extraContent:
      "Vi går igenom förutsättningarna i Högdalen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Högdalen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Högdalen?",
      answer:
        "Priset för ett takbyte i Högdalen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
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
      "Takläggare i Hökarängen — takbyte, takrenovering och plåtarbeten i Hökarängen. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Hökarängen — klassisk söderförort — har ett fastighetsbestånd med trevåningshus och radhus från 1940–50-tal. Många tak i området har passerat sin tekniska livslängd, och takomläggning är därför en vanlig åtgärd här. RoslagsTak utför kompletta takprojekt i Hökarängen: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Vi arbetar med fast pris och tydlig tidplan, och tar hand om hela processen från takkontroll till bortforslat avfall.",
    extraContent:
      "Vi går igenom förutsättningarna i Hökarängen — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Hökarängen.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Hökarängen?",
      answer:
        "Priset för ett takbyte i Hökarängen beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
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
      "Takläggare i Tumba — takbyte, takrenovering och plåtarbeten i Tumba. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Tumba är Botkyrkas största tätort. Bebyggelsen består till stor del av villaområden, radhus och flerbostadshus, och det är just åldern på taken som gör att många fastighetsägare i Tumba hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Tumba med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Takkontroll och offert är kostnadsfria, och priset vi lämnar är det du betalar. Ställning, leveranser, avfall och slutstädning ingår i vårt ansvar.",
    extraContent:
      "Vi går igenom förutsättningarna i Tumba — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Efter takkontrollen får du en specificerad offert där material, arbete, ställning och avfall står var för sig. Vi tar gärna flera projekt i samma kvarter samtidigt, vilket håller nere kostnaden för ställning och transporter. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Tumba.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Tumba?",
      answer:
        "Priset för ett takbyte i Tumba beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
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
      "Takläggare i Tullinge — takbyte, takrenovering och plåtarbeten i Tullinge. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "I Tullinge, populärt villaområde i Botkyrka arbetar vi löpande med tak på villor från 1960–80-tal med betongpannor. Vid en kostnadsfri takkontroll kontrollerar vi underlagspapp, läkt, råspont, plåtbeslag och ventilation under taket — det är där ett takbyte avgörs. Du får en skriftlig bedömning och ett fast pris innan något arbete påbörjas.",
    extraContent:
      "Vi går igenom förutsättningarna i Tullinge — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Tullinge.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Tullinge?",
      answer:
        "Priset för ett takbyte i Tullinge beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
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
      "Takläggare i Norsborg — takbyte, takrenovering och plåtarbeten i Norsborg. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Norsborg — norra Botkyrka vid Mälaren — har ett fastighetsbestånd med miljonprogramsbebyggelse och radhus. En stor del av taken här är från samma byggår, vilket innebär att de nu behöver läggas om. RoslagsTak utför kompletta takprojekt i Norsborg: rivning av gammalt taktäckningsmaterial, kontroll av läkt och råspont, ny underlagsduk, nytt yttertak samt alla plåtdetaljer som hängrännor, stuprör, vindskivor och fotplåt. Hela projektet hålls samman av oss — takkontroll, materialval, ställning, takarbete och bortforsling.",
    extraContent:
      "Vi går igenom förutsättningarna i Norsborg — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Därför kan vi lämna ett konkret pris direkt efter takkontrollen i stället för ett brett prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Norsborg.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Norsborg?",
      answer:
        "Priset för ett takbyte i Norsborg beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
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
      "Takläggare i Alby — takbyte, takrenovering och plåtarbeten i Alby. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Alby är del av norra Botkyrka. Bebyggelsen består till stor del av flerbostadshus från 1970-talet med stora takytor, och det är just åldern på taken som gör att många fastighetsägare i Alby hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Alby med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Vi börjar alltid med en kostnadsfri takkontroll på plats och en skriftlig offert med fast pris. Vi sköter ställning, transporter och bortforsling — du behöver inte hyra eller beställa något själv.",
    extraContent:
      "Vi går igenom förutsättningarna i Alby — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Det gör att offerten bygger på vad vi faktiskt sett på ditt tak, inte på schablonpriser. Vi kan samordna flera takbyten i samma område och dela kostnaden för ställning och etablering. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Alby.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Alby?",
      answer:
        "Priset för ett takbyte i Alby beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Vi kontrollerar taket kostnadsfritt och lämnar därefter ett fast pris med rivning, material, ställning och avfall inräknat. ROT-avdraget sänker arbetskostnaden med 30 %.",
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
      "Takläggare i Fittja — takbyte, takrenovering och plåtarbeten i Fittja. Erfarna takläggare, fast pris och 10 års utförandegaranti.",
    longDescription:
      "Vi lägger tak i Fittja, nordöstra Botkyrka, där miljonprogramshus med flacka papp- och duktak dominerar. Äldre tak i området har ofta samma problem under pannorna: sliten papp, uttorkade tätningar och beslag som börjat rosta. Vi byter det som behöver bytas, säkerställer rätt ventilation och lämnar 10 års utförandegaranti på arbetet.",
    extraContent:
      "Vi går igenom förutsättningarna i Fittja — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Du får ett fast pris som är räknat på ditt tak — inte ett uppskattat spann. Bor du granne med någon som också ska byta tak går det ofta att samordna arbetena och sänka etableringskostnaden. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Fittja.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Fittja?",
      answer:
        "Priset för ett takbyte i Fittja beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Priset sätts efter takkontroll på plats och innehåller rivning, material, ställning, arbete och bortforsling av avfall. På arbetskostnaden gäller ROT-avdrag med 30 %.",
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
    description:
      "Takläggare i Rönninge — takbyte, takrenovering och plåtarbeten i Rönninge. Fast pris utan dolda tillägg och 10 års utförandegaranti.",
    longDescription:
      "Rönninge är ett av de äldre villasamhällena söder om Stockholm. Sedan järnvägsstationen vid stambanan öppnat 1888 blev marken intressant för tomtstyckning, och 1896 styckades egendomen upp i 151 större och mindre tomter av ett nybildat villatomtbolag. Byggandet tog fart först efter sekelskiftet 1900, och resultatet blev en blandad villabebyggelse med både enklare och mer påkostade hus, med stationen som samhällets naturliga mittpunkt. Samhället har äldre rötter än villastaden — namnet nämns första gången i slutet av 1500-talet, som namn på ett torp under Uttringe, och Rönninge gård blev säteri på 1600-talet med en huvudbyggnad från 1662 som står kvar än i dag. År 1915 blev Rönninge municipalsamhälle, och när Salem åter blev en egen kommun 1983 blev Rönninge dess centralort. I dag rymmer kommundelen också områden som Mölleskogen, Garnudden, Skogsängen och Säbyholm, med hus främst byggda på 1960- och 1990-talen och blandade utbyggnadsår.",
    extraContent:
      "I ett samhälle som byggts ut under mer än hundra år finns ingen typisk takålder. Ett hus från 1960-talet är i dag över sextio år gammalt, och har taket inte lagts om är underlagspapp, läkt och plåtdetaljer ofta i den ålder där det är dags att se över dem. Hus från 1990-talet närmar sig åldern där hängrännor, beslag och genomföringar brukar behöva kontrolleras. I de äldsta villorna har taket i regel bytts, ibland flera gånger, och där kan det finnas äldre detaljer som behöver hanteras varsamt. Om just ditt hus har särskilda kulturhistoriska värden, eller om ett byte av material eller kulör kräver lov eller anmälan, avgör kommunen. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Rönninge.",
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
        "Priset för ett takbyte i Rönninge beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Du får ett fast pris efter takkontrollen, med rivning, material, ställning, arbete och avfallshantering specificerat. Arbetskostnaden är ROT-berättigad.",
    },
    primaryKeyword: "takläggare Rönninge",
    lat: 59.2011,
    lng: 17.7367,
    nearbyLocations: ["Salem", "Tumba", "Södertälje"],
  },
  {
    slug: "jarna",
    name: "Järna",
    region: "Sydvästra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Järna — takbyte, takrenovering och plåtarbeten i Järna. Kostnadsfri takkontroll och fast pris innan arbetet startar.",
    longDescription:
      "Järna är tätort i Södertälje kommun. Bebyggelsen består till stor del av villor, gårdar och äldre trähusbebyggelse, och det är just åldern på taken som gör att många fastighetsägare i Järna hör av sig till oss. Vi utför takbyte, takrenovering och takomläggning i Järna med material anpassat efter husets ålder, taklutning och stil — allt från dubbelfalsad plåt och TP20 till tegel och betongpannor. Du får en kostnadsfri takkontroll, ett fast pris och en tidplan vi håller oss till. Vi ordnar ställning, materialleverans, bortforsling av avfall och städning efter oss.",
    extraContent:
      "Vi går igenom förutsättningarna i Järna — hur tomterna ser ut, hur ställning och kranbil kan placeras och vilka material som fungerar bäst på husen här. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Järna.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Järna?",
      answer:
        "Priset för ett takbyte i Järna beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter takkontrollen får du en skriftlig offert med fast pris — rivning, material, ställning, arbete och bortforsling ingår. Arbetsdelen ger 30 % ROT-avdrag.",
    },
    primaryKeyword: "takläggare Järna",
    lat: 59.0928,
    lng: 17.5658,
    nearbyLocations: ["Södertälje", "Rönninge", "Salem"],
  },
  {
    slug: "edsviken",
    name: "Edsviken",
    region: "Norra Stockholm",
    isIsland: false,
    description:
      "Takläggare i Edsviken — takbyte, takrenovering och plåtarbeten i Edsviken. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Edsviken är villaområdet kring viken med samma namn, på gränsen mellan Sollentuna, Danderyd och Solna. Här finns allt från sekelskiftesvillor och funkishus till nyare enfamiljshus, ofta med sadeltak i tegel, betongpannor eller falsad plåt. Det sjönära läget innebär mer vind och fukt än längre in i landet, vilket sliter extra på plåtdetaljer, hängrännor och underlagspapp. Vi utför takbyte, takrenovering och takomläggning i Edsviken med material anpassat efter husets ålder och stil, kostnadsfri takkontroll, fast pris och en tidsplan som håller. Ställning, materialleverans, avfallshantering och slutstädning ingår alltid.",
    extraContent:
      "Vi går igenom förutsättningarna i Edsviken — smala villagator, stora tomter med träd och hus nära vattnet där väderpåfrestningen är större. Det påverkar både val av material och hur vi planerar ställning och kranbil, och gör att vi kan lämna en realistisk offert direkt efter takkontrollen istället för luddiga prisintervall. Ska flera hus i samma kvarter byta tak samordnar vi gärna projekten — ställning och etablering blir billigare för alla. Ring 070-154 36 39 eller begär offert online så bokar vi en kostnadsfri takkontroll i Edsviken.",
    uniqueFAQ: {
      question: "Vad kostar det att byta tak i Edsviken?",
      answer:
        "Priset för ett takbyte i Edsviken beror på material, taklutning, antal genomföringar och skicket på underliggande konstruktion. Efter en kostnadsfri takkontroll lämnar vi ett fast pris där rivning, material, ställning, arbete och bortforsling är specificerade. ROT-avdraget ger 30 % skattereduktion på arbetskostnaden.",
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
      "Takläggare i Uppsala — takbyte, takrenovering och plåtarbeten för villor och bostadsrättsföreningar. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Uppsala är en av landets äldsta universitetsstäder, med bebyggelse som sträcker sig från äldre kvarter längs Fyrisån till villaområden i Luthagen och Kvarngärdet och flerbostadshus från 60- och 70-talen i Gottsunda och Sunnersta. Staden ligger på den öppna Uppsalaslätten, där vind och snö får fritt spelrum över taken. Vi tar uppdrag i Uppsala med takbyte, takrenovering och plåtarbeten, både för villaägare och för bostadsrättsföreningar. Alla uppdrag börjar med en kostnadsfri takkontroll och slutar med ett fast pris.",
    extraContent:
      "För en bostadsrättsförening i Uppsala är ett takbyte ett beslut som ska hålla för både styrelse och stämma. Därför lämnar vi ett skriftligt underlag med foton och ett fast pris, och skriftlig garanti när arbetet är klart. Äldre kvarter kan ha tegel- eller plåttak med många genomföringar och trånga takytor, medan nyare områden oftast har enklare sadeltak. Boka en kostnadsfri takkontroll så går vi igenom vad som passar just ert tak.",
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
      "Takläggare i Knivsta — takbyte, takrenovering och plåtarbeten. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
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
      "Takläggare i Bålsta — takbyte, takrenovering och plåtarbeten i Håbo. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
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
      "Takläggare i Enköping — takbyte, takrenovering och plåtarbeten. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
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
      "Takläggare i Västerås — takbyte, takrenovering och plåtarbeten för villor och bostadsrättsföreningar. Fast pris och 10 års utförandegaranti.",
    longDescription:
      "Västerås är Mälardalens största stad, belägen vid Mälaren och Svartån, med en blandning av äldre stadsbebyggelse, villaområden och stora bostadsrättsföreningar och flerbostadshus. Storleken ger en stor variation av taktyper, från tegeltak på äldre hus till plåt och papp på flacka tak. Vi tar uppdrag i Västerås med takbyte, takrenovering och plåtarbeten, både för villaägare och för föreningar.",
    extraContent:
      "För större fastigheter och bostadsrättsföreningar planerar vi arbetet tillsammans med styrelsen: takkontroll, fast offert, tidplan och en fast kontaktperson under hela projektet. Vi lämnar skriftlig garanti när arbetet är klart. Kontakta oss för en kostnadsfri takkontroll i Västerås.",
    uniqueFAQ: {
      question: "Kan ni ta uppdrag åt större bostadsrättsföreningar i Västerås?",
      answer:
        "Ja, vi tar uppdrag från bostadsrättsföreningar i Västerås. Vi börjar med en kostnadsfri takkontroll och lämnar ett fast pris och en tidplan som styrelsen kan besluta på. Hör av dig så går vi igenom fastigheten och vilken omfattning som passar.",
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
      "Takläggare i Eskilstuna — takbyte, takrenovering och plåtarbeten. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
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
      "Takläggare i Strängnäs — takbyte, takrenovering och plåtarbeten vid Mälaren. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
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
      "Takläggare i Mariefred — takbyte, takrenovering och plåtarbeten. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
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
      "Takläggare i Nykvarn — takbyte, takrenovering och plåtarbeten. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
    longDescription:
      "Nykvarn är en mindre kommun nära Södertälje med villaområden, radhus och lantbruksfastigheter. Bebyggelsen är blandad, från äldre gårdar till villor byggda i olika omgångar, och taken ser därefter ut. Vi tar uppdrag i Nykvarn med takbyte, takrenovering, takavvattning och plåtarbeten.",
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
      "Takläggare i Gnesta — takbyte, takrenovering och plåtarbeten. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
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
      "Takläggare i Nyköping — takbyte, takrenovering och plåtarbeten. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
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
      "Takläggare i Trosa — takbyte, takrenovering och plåtarbeten. Fast pris efter kostnadsfri takkontroll och 10 års utförandegaranti.",
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
];

export const getLocationBySlug = (slug: string) =>
  locations.find((l) => l.slug === slug);
