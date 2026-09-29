/**
 * Problembibliotek (SEO-programmet Phase 2.4). Innehåll granskat och godkänt av Marknadschefen,
 * källa: ledning/marknad/innehall/problembibliotek-utkast.md. Bara allmänt belagd takkunskap —
 * inga livslängdssiffror, priser eller påhittade fall. "Relaterat projekt" visas bara på sidor där
 * ett komplett takbyte är en av åtgärderna, och påstår aldrig att just det jobbet hade problemet.
 */

export interface Problem {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  symptom: string;
  orsaker: string;
  akut: string;
  undersokning: string;
  atgarder: string;
  gorInteSjalv: string;
  related: { to: string; label: string }[];
  relatedProject?: "takrenovering-blido" | "takbyte-singo";
}

const SAKERHET =
  "Gå aldrig upp på taket själv. Taket är halt och fallrisken stor, särskilt när det är vått, frostigt eller mossigt. Titta från marken, med kikare eller mobilkamerans zoom, och från vinden inifrån.";

export const problems: Problem[] = [
  {
    slug: "lackage-vid-skorsten",
    title: "Läckage vid skorstenen",
    metaTitle: "Läckage vid skorstenen – orsaker och vad du gör",
    metaDescription:
      "Fuktfläck i taket nära skorstenen? Så hittar du orsaken, när det är akut och när du behöver en takläggare. Kostnadsfri takkontroll.",
    intro:
      "Fuktfläckar nära skorstenen är ett av de vanligaste takproblemen — oftast handlar det om beslaget runt skorstenen, inte om själva murverket.",
    symptom:
      "Fuktfläckar eller droppmärken i taket eller på väggen nära skorstenen, fukt eller mörka ränder på råsponten runt skorstenen på vinden, flagnande färg eller fuktskador på skorstenens murverk inomhus.",
    orsaker:
      "Skorstensbeslaget (plåten runt skorstenen) har släppt, rostat eller spruckit. Fogen mellan beslag och murverk har släppt. Skadat murverk eller skadad skorstenshuv. Pannor närmast skorstenen ligger fel.",
    akut:
      "När vatten droppar in, eller om fukten når isolering eller elinstallationer. Då ska det åtgärdas snarast: samla upp vattnet, fota och kontakta en takläggare.",
    undersokning:
      "En takläggare tittar på beslag, fogar och pannor runt skorstenen uppe på taket och följer fuktspåren inifrån vinden.",
    atgarder:
      "Nytt eller omlagt skorstensbeslag, ny fog, byte av pannor runt skorstenen. Är taket i övrigt uttjänt kan ett takbyte vara bättre än att laga en detalj.",
    gorInteSjalv:
      "Arbete på taket och vid skorstenen. Du kan fota fläckarna, lägga något under som samlar upp vattnet och notera när det läcker (vid regn, snösmältning eller blåst).",
    related: [
      { to: "/akut-lackage", label: "Akut läckage i taket" },
      { to: "/platslagare", label: "Plåtslagare för ditt tak" },
      { to: "/takreparation", label: "Takreparation vid läckage och skador" },
    ],
  },
  {
    slug: "trasiga-takpannor",
    title: "Trasiga eller förskjutna takpannor",
    metaTitle: "Trasiga eller förskjutna takpannor – vad gör man?",
    metaDescription:
      "Spruckna, lösa eller förskjutna takpannor släpper in vatten i underlaget. Så ser du det från marken och så åtgärdas det.",
    intro:
      "Pannor som glidit eller spruckit — ofta efter storm — släpper snabbt in vatten i underlaget om de inte åtgärdas.",
    symptom:
      "Pannor som ligger snett, har glidit ner, har spruckit eller saknas, ofta efter storm. Mörka partier eller glipor i takytan. Senare kan fukt synas på vinden.",
    orsaker:
      "Storm och kraftig vind, frostsprängning, att någon har gått på taket, lösa eller rostade fästen, eller att läkten under har gett efter.",
    akut:
      "När en panna saknas eller glipan är stor, särskilt inför regn eller vinter, eftersom vatten då når underlaget direkt.",
    undersokning:
      "En takläggare kontrollerar pannorna, fästena och underlaget runt skadan och ser om fler pannor sitter löst.",
    atgarder:
      "Byte av enstaka pannor och omfästning. Vid många skador, eller om underlaget är skadat, kan omläggning eller takbyte vara rätt.",
    gorInteSjalv:
      "Gå inte upp för att lägga tillbaka pannor. Du kan fota från marken och notera var skadan sitter.",
    related: [
      { to: "/takreparation", label: "Takreparation vid läckage och skador" },
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/blogg/tecken-byta-tak", label: "Tecken på att det är dags att byta tak" },
    ],
  },
  {
    slug: "mossa-pa-taket",
    title: "Mossa och påväxt på taket",
    metaTitle: "Mossa på taket – farligt eller bara fult?",
    metaDescription:
      "När mossa och påväxt blir ett problem för taket, vad du kan göra själv och när det är dags att kontakta en takläggare.",
    intro:
      "Lite mossa är oftast bara estetiskt. Tjocka mattor håller däremot kvar fukt och kan skada taket över tid.",
    symptom:
      "Gröna eller mörka mattor av mossa, lav och alger, oftast på norrsidan och under träd. Mossrester i hängrännorna.",
    orsaker:
      "Skugga och fukt, träd nära huset, ett tak som torkar långsamt. Porösa ytor binder mer påväxt.",
    akut:
      "Lite lav är främst estetiskt. Tjocka mattor håller kvar fukt, kan lyfta pannor och täppa till hängrännor, och bör åtgärdas.",
    undersokning:
      "En takläggare bedömer hur påväxten påverkar pannor, underlag och avvattning och om ytan är skadad under.",
    atgarder:
      "Skonsam rengöring och behandling av taket, rensning av hängrännor. Är ytan skadad kan fler åtgärder behövas.",
    gorInteSjalv:
      "Högtryckstvätt från taket, som både är farlig och kan skada pannorna. Du kan hålla hängrännorna rena från marken med rätt verktyg, och beskära träd.",
    related: [
      { to: "/tjanster/taktvatt", label: "Taktvätt och takmålning" },
      { to: "/hangrannor", label: "Nya hängrännor och stuprör" },
      { to: "/blogg/ta-bort-mossa-fran-tak", label: "Ta bort mossa från taket — hela guiden" },
    ],
  },
  {
    slug: "rostig-plat",
    title: "Rostig plåt och rostiga beslag",
    metaTitle: "Rost på plåttak och beslag – när behöver det åtgärdas?",
    metaDescription:
      "Rostig takplåt, fotplåt eller skorstensbeslag? Så bedömer du läget, vad som händer om du väntar och vilka åtgärder som finns.",
    intro:
      "Rost börjar oftast ytligt och går att åtgärda enkelt — men obehandlad kan den till slut gå igenom plåten.",
    symptom:
      "Rostfläckar eller flagnande färg på plåttak, fotplåt, vindskiveplåt, ränndalar eller skorstensbeslag. Rostränder på fasaden under plåten.",
    orsaker:
      "Skadad eller sliten ytbehandling, repor, stående vatten, saltluft i kustnära lägen, felaktiga material i kontakt med varandra.",
    akut: "När rosten har gått igenom (hål) eller när plåten släpper i skarvar och vatten kan tränga in.",
    undersokning:
      "En takläggare eller plåtslagare kontrollerar hur djup rosten är, skarvarna och fästena, och om underlaget har tagit fukt.",
    atgarder:
      "Rengöring och ny ytbehandling när rosten är ytlig, byte av enskilda plåtdetaljer, eller nytt plåttak när plåten är uttjänt.",
    gorInteSjalv: "Arbete uppe på plåttaket. Du kan fota rostpartierna från marken.",
    related: [
      { to: "/platslagare", label: "Plåtslagare för ditt tak" },
      { to: "/takreparation", label: "Takreparation vid läckage och skador" },
      { to: "/blogg/mala-plattak-guide-pris", label: "Måla plåttak — guide och pris" },
    ],
  },
  {
    slug: "fukt-pa-vinden",
    title: "Fukt eller mögel på vinden",
    metaTitle: "Fukt eller mögel på vinden – läcka eller kondens?",
    metaDescription:
      "Mörka fläckar, droppar eller mögellukt på vinden? Så skiljer du läckage från kondens och vad som behöver göras.",
    intro:
      "Fukt på vinden beror antingen på ett läckage genom yttertaket eller på kondens från inomhusluft — åtgärden skiljer sig helt åt.",
    symptom:
      "Mörka fläckar eller ränder på råsponten, droppar eller frost på undersidan av taket en kall morgon, fuktig isolering, mögellukt.",
    orsaker:
      "Läckage genom yttertaket (pannor, beslag, genomföringar) eller kondens, när varm fuktig inomhusluft når den kalla vinden och ventilationen i takfot och nock inte räcker.",
    akut:
      "Vid aktivt läckage, blöt isolering eller mögel som sprider sig. Mögel på vinden ska utredas, eftersom det kan påverka virket och inomhusmiljön.",
    undersokning:
      "En takläggare kontrollerar yttertaket och vindens ventilation (takfot, nock, genomföringar) för att skilja läckage från kondens.",
    atgarder:
      "Åtgärd av läckan, förbättrad ventilation, tätning mot varm inomhusluft (till exempel vindsluckan), och byte av skadat underlag eller råspont när det krävs.",
    gorInteSjalv:
      "Sanering av mögel och ingrepp i takkonstruktionen. Du kan fota fläckarna, notera när fukten syns och kontrollera att vindsluckan är tät.",
    related: [
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/takreparation", label: "Takreparation vid läckage och skador" },
      { to: "/blogg/hur-lange-haller-tak", label: "Hur länge håller ett tak?" },
    ],
    relatedProject: "takbyte-singo",
  },
  {
    slug: "igensatta-hangrannor",
    title: "Igensatta hängrännor",
    metaTitle: "Igensatta hängrännor – därför ska du rensa före vintern",
    metaDescription:
      "Löv och barr i hängrännan fryser och får vatten att rinna över. Så ser du problemet och när rännorna behöver lagas eller bytas.",
    intro:
      "Igensatta hängrännor är ett litet problem som blir stort på vintern, när vattnet som rinner över fryser vid takfoten.",
    symptom:
      "Vatten som rinner över kanten när det regnar, växter eller löv i rännan, fuktfläckar eller påväxt på fasaden, istappar längs takfoten på vintern.",
    orsaker:
      "Löv, barr och mossa, fel lutning mot stupröret, hängrännor som har släppt eller läcker i skarvarna.",
    akut:
      "Inför vintern, eftersom vatten som fryser i rännan kan rinna in under takfoten och skada fasad och grund.",
    undersokning: "Rännans lutning, fästen, skarvar och stupröret kontrolleras, liksom takfoten bakom rännan.",
    atgarder:
      "Rensning, justering av lutning och fästen, tätning av skarvar, eller nya hängrännor och stuprör när de är uttjänta.",
    gorInteSjalv:
      "Arbete på hög stege utan säkerhet. Från marken kan du rensa med förlängningsverktyg och spola stupröret.",
    related: [
      { to: "/hangrannor", label: "Nya hängrännor och stuprör" },
      { to: "/takreparation", label: "Takreparation vid läckage och skador" },
      { to: "/blogg/hangrannor-stupror-skargard", label: "Hängrännor & stuprör i skärgårdsklimat" },
    ],
  },
  {
    slug: "rutten-raspont",
    title: "Rutten eller skadad råspont",
    metaTitle: "Rutten råspont – tecken, orsaker och åtgärder",
    metaDescription:
      "Mjuk, mörk eller rutten råspont syns ofta först på vinden. Så känner du igen den, varför den uppstår och vad som görs åt det.",
    intro:
      "Råsponten är takets bärande underlag. När den ruttnar syns det oftast först som mjuka, mörka brädor på vinden.",
    symptom:
      "Mörka, mjuka eller svampangripna brädor på vinden, sviktande takyta, gamla fuktränder som återkommer, mögellukt.",
    orsaker:
      "Fukt över lång tid från ett läckage, kondens på grund av dålig ventilation eller ett underlag som har slutat skydda.",
    akut:
      "När virket är mjukt eller taket sviktar, eller när fukten fortfarande tillförs. Då behöver orsaken och det skadade virket åtgärdas.",
    undersokning:
      "En takläggare bedömer inifrån vinden hur stor del av råsponten som är påverkad och letar upp fuktkällan uppifrån taket.",
    atgarder:
      "Byte av skadade delar av råsponten (ofta i samband med takbyte, när underlaget ändå är öppet) och åtgärd av fuktkällan.",
    gorInteSjalv:
      "Ingrepp i takkonstruktionen eller att gå på en sviktande takyta. Du kan fota och markera fläckarna på vinden.",
    related: [
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/tjanster/takomlaggning", label: "Takomläggning" },
      { to: "/takreparation", label: "Takreparation vid läckage och skador" },
      { to: "/takproblem/fukt-pa-vinden", label: "Fukt eller mögel på vinden" },
    ],
    relatedProject: "takbyte-singo",
  },
  {
    slug: "kondens-pa-vinden",
    title: "Kondens på vinden",
    metaTitle: "Kondens på vinden – därför bildas den och så åtgärdas den",
    metaDescription:
      "Droppar eller frost på undersidan av taket en kall morgon är ofta kondens, inte läckage. Så skiljer du dem åt och vad som hjälper.",
    intro:
      "Kondens sprids ofta över stora ytor på vinden, till skillnad från ett läckage som brukar ha en tydlig punkt.",
    symptom:
      "Droppar, rimfrost eller fukt på undersidan av yttertaket, särskilt kalla, klara morgnar, med fukt spridd över stora ytor och inte en tydlig läckpunkt.",
    orsaker:
      "Varm, fuktig inomhusluft som läcker upp till den kalla vinden (otät vindslucka, genomföringar), för lite ventilation genom takfot och nock, eller igensatta ventilationsspalter.",
    akut: "När fukten återkommer ofta, när isoleringen blir blöt eller när mögel börjar växa.",
    undersokning:
      "Ventilationen i takfot och nock och tätheten mot bostaden kontrolleras, liksom om det i stället finns en läcka i yttertaket.",
    atgarder:
      "Tätning mot bostaden (vindslucka, genomföringar), förbättrad ventilation i takfot och nock. Vid omfattande fuktskador även åtgärder på underlaget.",
    gorInteSjalv:
      "Ändringar i takets ventilation och konstruktion. Du kan kontrollera att vindsluckan sluter tätt och att takfotens ventilation inte är igensatt.",
    related: [
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/takproblem/fukt-pa-vinden", label: "Fukt eller mögel på vinden" },
    ],
  },
  {
    slug: "dalig-underlagspapp",
    title: "Dålig underlagspapp eller undertak",
    metaTitle: "Dålig underlagspapp – därför är den takets viktigaste skydd",
    metaDescription:
      "Underlagspappen är takets andra skydd mot vatten. Så märker du när den har slutat fungera och vad som krävs för att byta den.",
    intro:
      "Underlagspappen är takets reservskydd. När den slutar fungera märks det ofta som läckage på flera ställen samtidigt.",
    symptom:
      "Läckage som inte går att härleda till en enskild trasig panna, fuktfläckar på flera ställen på vinden, synligt spröd, sprucken eller trasig papp där den syns från vinden.",
    orsaker: "Åldrad papp som har blivit spröd, skador vid tidigare arbeten på taket, fukt som har stått kvar.",
    akut:
      "När vatten tar sig igenom på flera ställen, eftersom underlaget då inte längre fungerar som reserv när yttertaket släpper igenom vatten.",
    undersokning:
      "Underlagets skick bedöms från vinden och, där det går, uppifrån taket när pannor eller plåt lyfts.",
    atgarder:
      "Nytt underlag kräver normalt att yttertaket tas bort, och görs därför vanligen som en omläggning eller ett takbyte med nytt underlag och ny läkt.",
    gorInteSjalv: "Allt arbete med underlaget. Du kan fota fuktfläckarna på vinden.",
    related: [
      { to: "/tjanster/takomlaggning", label: "Takomläggning" },
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/blogg/takpapp-byte-livslangd", label: "Takpapp — byte, livslängd och tecken på skador" },
    ],
    relatedProject: "takrenovering-blido",
  },
  {
    slug: "istappar-pa-taket",
    title: "Istappar och isbildning vid takfoten",
    metaTitle: "Istappar och is vid takfoten – vad beror det på?",
    metaDescription:
      "Stora istappar och isvallar vid takfoten kan tyda på värmeläckage eller igensatta hängrännor. Så minskar du risken och när du ska kontakta en takläggare.",
    intro:
      "Stora istappar är ofta ett tecken på att värme läcker upp genom taket och smälter snön ojämnt.",
    symptom:
      "Stora istappar längs takfoten, isvallar i hängrännorna, vatten som tränger in vid takfoten under töväder.",
    orsaker:
      "Värme från bostaden som smälter snön på taket, så att vattnet fryser vid den kalla takfoten. Igensatta hängrännor. Otillräcklig ventilation.",
    akut:
      "När istappar hänger över gångvägar eller entréer (fallrisk för människor), eller när smältvatten tränger in under takfoten.",
    undersokning: "Hängrännornas skick och lutning, takfotens ventilation och tätheten mot vinden kontrolleras.",
    atgarder:
      "Rensning eller byte av hängrännor, förbättrad ventilation och tätning mot vinden så att mindre värme når yttertaket.",
    gorInteSjalv:
      "Att slå ner istappar från stege eller gå upp på ett istäckt tak. Spärra av ytan under och kontakta hjälp om istapparna är stora.",
    related: [
      { to: "/hangrannor", label: "Nya hängrännor och stuprör" },
      { to: "/takkontroll", label: "Kostnadsfri takkontroll" },
      { to: "/takproblem/igensatta-hangrannor", label: "Igensatta hängrännor" },
      { to: "/takproblem/kondens-pa-vinden", label: "Kondens på vinden" },
    ],
  },
];

export const getProblem = (slug: string) => problems.find((p) => p.slug === slug);
export const SAKERHETSRUTA = SAKERHET;
