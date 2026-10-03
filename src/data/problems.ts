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
      { to: "/akut-lackage", label: "Läckage i taket" },
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
      { to: "/blogg/hangrannor-stupror-skargard", label: "Hängrännor & stuprör: material och underhåll" },
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
  {
    slug: "stormskador-pa-taket",
    title: "Stormskador på taket",
    metaTitle: "Stormskador på taket – vad du gör efter blåsten",
    metaDescription:
      "Lösa eller avblåsta pannor och plåt efter en storm? Så bedömer du läget från marken, dokumenterar skadan och får taket kontrollerat.",
    intro:
      "Efter en storm är det lätt att se om ett träd har fallit, men skador på taket syns inte alltid lika tydligt. En panna som har flyttat sig några centimeter eller en plåt som har lyft i kanten kan släppa in vatten redan vid nästa regn. Här går vi igenom vad du kan titta efter från marken, vad du gör själv och när taket behöver kontrolleras.",
    symptom:
      "Pannor som saknas, ligger snett eller har glidit ner mot takfoten, och bitar av pannor eller plåt på marken runt huset. Nockpannor som har lossnat. Plåt som har lyft, vikts upp eller släppt i kanten, till exempel vid vindskivor, fotplåt eller runt skorstenen. Hängrännor eller stuprör som har lossnat eller böjts. Grenar som ligger kvar på taket. Inomhus kan det synas som nya fuktfläckar i taket eller droppar på vinden efter nästa regn.",
    orsaker:
      "Kraftig vind skapar ett sug på taket, särskilt vid kanter, hörn och nock, som kan lyfta pannor och plåt som redan sitter löst. Pannor som är spruckna, dåligt fästa eller ligger på en åldrad läkt ger lättare vika. Lösa plåtdetaljer kan fånga vinden och vikas upp. Nedfallande grenar och föremål kan också slå sönder pannor eller skada plåtens ytbehandling.",
    akut:
      "När vatten kommer in, när pannor eller plåt hänger löst och kan falla ner mot gång, uteplats eller bil, eller när taket har fått hål. Då gäller det att begränsa skadan: håll dig och andra borta från området under takkanten, samla upp vatten inomhus, flytta undan det som kan ta skada och kontakta en takläggare. En skada som ser liten ut ska ändå kontrolleras innan nästa regn.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: vilka pannor och plåtdetaljer som har rört sig eller skadats, om nock, fotplåt och vindskivor sitter som de ska, och om vatten har kommit in till underlaget. Där vinden går att komma åt syns därifrån om råspont och isolering har blivit fuktiga. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
    atgarder:
      "Byte eller omläggning av lösa och trasiga pannor, nya eller omfästa nockpannor, nya plåtdetaljer där plåten har skadats och omfästning eller byte av hängrännor. Har vatten kommit in kan skadade delar av underlaget behöva bytas. Är taket i övrigt uttjänt, med åldrad läkt och slitet underlag, kan ett takbyte vara en bättre lösning än att laga det som blåste loss.",
    gorInteSjalv:
      "Gå inte upp på taket, varken under eller direkt efter stormen. Taket kan vara halt, pannor kan sitta löst och vinden kan fortfarande vara byig. Du kan fotografera skadorna från marken och från vinden, gärna med datum, spara bitar som har blåst ner och anteckna när stormen var. Kontakta ditt försäkringsbolag om du vill anmäla skadan. Det är försäkringsbolaget som avgör om och hur mycket som ersätts, och det kan vi inte lova något om. Dina egna bilder kan du ha nytta av när du anmäler.",
    related: [
      { to: "/takproblem/trasiga-takpannor", label: "Trasiga eller förskjutna takpannor" },
      { to: "/takproblem/rostig-plat", label: "Rostig plåt och rostiga beslag" },
      { to: "/takproblem/igensatta-hangrannor", label: "Igensatta hängrännor" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/takomlaggning", label: "Takomläggning" },
    ],
  },
  {
    slug: "lackage-vid-takfonster-och-genomforingar",
    title: "Läckage vid takfönster och genomföringar",
    metaTitle: "Läckage vid takfönster, ventilation och avluftning",
    metaDescription:
      "Fukt runt takfönstret eller vid ventilationsröret? Så hittar du var vattnet kommer in, vad du gör själv och när anslutningen mot taket behöver ses över.",
    intro:
      "Överallt där något går igenom taket finns en skarv som ska vara tät: runt takfönster, ventilationshuvar, avluftning för avloppet, antennfästen och andra rör. De här anslutningarna är utsatta, eftersom vatten, snö och is samlas just där taket bryts. Här går vi igenom hur ett sådant läckage brukar visa sig, vad det kan bero på och vad du kan göra innan taket kontrolleras.",
    symptom:
      "Fuktfläckar eller missfärgning i innertaket runt ett takfönster eller under ett ventilationsdon. Droppar eller fuktränder på karmen eller fönsternischen när det regnar eller när snön smälter. På vinden syns fukt, mörka ränder eller droppmärken på råsponten och isoleringen runt rör och kanaler som går upp genom taket. Ibland märks läckaget bara vid kraftigt slagregn eller vind från ett visst håll.",
    orsaker:
      "Plåten eller manschetten som sluter tätt mellan genomföringen och takytan har släppt, rostat eller spruckit. Tätningar och fogar har åldrats. Pannorna närmast genomföringen ligger fel eller har flyttats, så att vatten leds in under dem i stället för förbi. Runt takfönster kan anslutningsplåten (inklädnaden) vara fel monterad eller skadad. Snö och is som ligger kvar ovanför fönstret eller huven kan tvinga smältvatten in under pannorna. På vinden kan det också vara kondens från en dåligt isolerad ventilationskanal, som ser ut som ett läckage men har en annan orsak.",
    akut:
      "När vatten droppar in, eller när fukten når isolering, elinstallationer eller ett innertak som börjar ge vika. Då ska det åtgärdas snarast: samla upp vattnet, flytta undan det som kan ta skada, fota och kontakta en takläggare. Enstaka fläckar som inte växer bör ändå kontrolleras, eftersom fukt som pågår länge kan skada råspont och isolering.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: plåtarna och tätningarna runt varje genomföring, anslutningen runt takfönstret och pannorna närmast. Där vinden går att komma åt följs fuktspåren därifrån för att se var vattnet kommer in, eftersom det kan rinna en bit längs råsponten innan det syns. Om fukten beror på kondens från en kanal snarare än på taket blir det tydligt här.",
    atgarder:
      "Ny eller omlagd plåt och tätning runt genomföringen, omläggning av pannorna närmast och ny anslutningsplåt runt takfönstret där den är skadad. Har vatten kommit in kan skadade delar av underlaget behöva bytas. Är taket i övrigt uttjänt, med slitet underlag och flera svaga punkter, kan ett takbyte vara bättre än att laga en genomföring i taget. Vid ett takbyte görs alla anslutningar om.",
    gorInteSjalv:
      "Arbete uppe på taket och ingrepp i takfönstret eller i tätningarna. Du kan fota fläckarna och vinden, lägga något under som samlar upp vattnet och notera när det läcker: vid regn, snösmältning, blåst eller kyla. Det hjälper till att skilja ett läckage från kondens.",
    related: [
      { to: "/takproblem/lackage-vid-skorsten", label: "Läckage vid skorstenen" },
      { to: "/takproblem/kondens-pa-vinden", label: "Kondens på vinden" },
      { to: "/takproblem/fukt-pa-vinden", label: "Fukt eller mögel på vinden" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/takomlaggning", label: "Takomläggning" },
    ],
  },
  {
    slug: "svackor-i-taket",
    title: "Svackor eller buktande tak",
    metaTitle: "Svackor i taket – vad buktande takytor kan tyda på",
    metaDescription:
      "Syns en svacka eller en buktning i takytan? Så kan den uppstå, varför den ska kontrolleras och vad du kan titta efter från marken och från vinden.",
    intro:
      "Ett tak ska ha raka linjer: en rak nock, jämna takfall och raka takfötter. När takytan i stället sjunker in i en svacka, buktar eller när nocken inte längre är rak, är det ett tecken på att något under ytmaterialet har förändrats. Det behöver inte vara akut, men det ska alltid kontrolleras, eftersom orsaken kan finnas i underlaget eller i själva bärande konstruktionen.",
    symptom:
      "En synlig svacka eller våg i takytan, ofta tydligast i motljus eller när snö ligger kvar ojämnt. En nock som sjunker på mitten eller en takfot som inte längre är rak. Pannor som har glidit isär eller ligger ojämnt i ett parti. På vinden kan det synas böjda, spruckna eller fuktskadade takstolar och brädor, mjuk eller mörk råspont, eller att takstolar eller läkt har rört sig. Inomhus kan sprickor i innertaket eller dörrar som börjar kärva på övervåningen ibland höra ihop med samma sak.",
    orsaker:
      "Råspont eller läkt som har blivit mjuk av fukt under lång tid, till exempel efter ett läckage som inte har upptäckts. Takstolar som har skadats av fukt eller som har belastats hårdare än de är gjorda för, till exempel av ett tyngre takmaterial eller av mycket snö. Äldre ombyggnader där bärande delar har tagits bort eller ändrats. Ibland handlar det bara om att underlaget har satt sig ojämnt, men det går inte att veta säkert utan att titta.",
    akut:
      "När svackan växer snabbt, när det knakar i konstruktionen, när taket sviktar eller när mycket snö ligger på ett tak som redan buktar. Håll dig då borta från taket och från utrymmet direkt under, och kontakta en takläggare. Är det tecken på att bärande delar har gett vika kan en konstruktör behöva bedöma huset.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: hur takytan, nocken och takfötterna ligger, och, där vinden går att komma åt, hur råspont, läkt och takstolar ser ut därifrån och om det finns fuktspår. Syftet är att skilja ett underlag som har tagit skada av fukt från problem i den bärande konstruktionen. Pekar något mot takstolarna kan en konstruktörs bedömning behövas innan taket åtgärdas.",
    atgarder:
      "Beror helt på orsaken. Är det underlaget som har tagit skada kan skadade delar av råsponten och läkten bytas, ofta i samband med ett takbyte när taket ändå är öppet. Fuktkällan ska alltid åtgärdas samtidigt. Är det takstolarna kan de behöva förstärkas eller bytas efter en konstruktörs bedömning. Vid byte till ett tyngre material, till exempel från plåt till pannor, måste konstruktionen klara den nya vikten.",
    gorInteSjalv:
      "Gå inte upp på ett tak som buktar eller sviktar, och gör inga ingrepp i takstolarna. Du kan fota svackan från marken, gärna från samma ställe vid olika tillfällen så att du ser om den växer, och fota eventuella fuktspår på vinden.",
    related: [
      { to: "/takproblem/rutten-raspont", label: "Rutten eller skadad råspont" },
      { to: "/takproblem/fukt-pa-vinden", label: "Fukt eller mögel på vinden" },
      { to: "/takproblem/dalig-underlagspapp", label: "Dålig underlagspapp" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/takomlaggning", label: "Takomläggning" },
    ],
    relatedProject: "takbyte-singo",
  },
  {
    slug: "lackande-ranndal",
    title: "Läckande ränndal",
    metaTitle: "Läckande ränndal – tecken, orsaker och vad du gör",
    metaDescription:
      "Fukt där två takfall möts? Så känner du igen ett läckage i ränndalen, vad det kan bero på och när ränndalen behöver göras om. Kostnadsfri takkontroll.",
    intro:
      "En ränndal är den inåtvända vinkeln där två takfall möts, till exempel där en tillbyggnad eller en kupa ansluter mot huvudtaket. Allt vatten från båda takfallen samlas där och rinner ner längs ränndalen, och därför är den en av takets mest belastade delar. Här går vi igenom hur ett läckage i ränndalen visar sig, vad det kan bero på och vad du kan göra innan taket kontrolleras.",
    symptom:
      "Fuktfläckar i innertaket eller på väggen under den del av taket där två takfall möts. På vinden syns mörka ränder, droppmärken eller fukt på råsponten längs ränndalens linje. Utifrån kan du se löv, barr och mossa som har samlats i ränndalen, pannor som ligger snett eller har glidit ner i den, eller plåt som ser rostig, bucklig eller lös ut. Läckaget märks ofta mest vid kraftigt regn eller när snö och is smälter, eftersom vattenmängden i ränndalen då är som störst.",
    orsaker:
      "Ränndalsplåten har rostat, spruckit eller fått hål, eller skarvarna i den har släppt. Löv, barr och skräp har bildat en damm som tvingar vattnet åt sidan och in under pannorna. Pannorna närmast ränndalen är fel kapade eller ligger för långt ut eller för långt in, så att vattnet inte leds ner i plåten. Is som bildas i ränndalen kan lyfta vatten över plåtens kant. Under plåten kan underlaget ha åldrats, så att vatten som tar sig förbi inte längre stoppas.",
    akut:
      "När vatten droppar in, när fukten når isolering eller elinstallationer, eller när fläckarna växer för varje regn. Samla då upp vattnet, flytta undan det som kan ta skada, fota och kontakta en takläggare. Ett läckage i ränndalen fortsätter ofta att växa, eftersom så mycket vatten passerar just där, så även en liten fläck ska kontrolleras.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: ränndalsplåtens skick och skarvar, hur pannorna närmast ränndalen ligger och om skräp eller is hindrar vattnet. Där vinden går att komma åt följs fuktspåren längs ränndalen därifrån, eftersom vattnet kan rinna en bit innan det syns. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
    atgarder:
      "Rensning av ränndalen när det bara är skräp som dämmer. Justering eller omläggning av pannorna närmast ränndalen. Ny ränndalsplåt när den gamla har rostat eller spruckit, och då ofta även nytt underlag i ränndalen, eftersom pannorna ändå måste lyftas. Är taket i övrigt uttjänt, med slitet underlag och flera svaga punkter, kan ett takbyte vara bättre än att göra om ränndalen för sig. Vid ett takbyte görs alla ränndalar om.",
    gorInteSjalv:
      "Gå inte upp på taket för att rensa eller laga ränndalen. Den ligger ofta högt och i en vinkel där det är lätt att halka, och pannorna runt den kan sitta löst. Du kan titta från marken, med kikare eller mobilkamerans zoom, fota fuktspåren på vinden och notera när det läcker: vid regn, snösmältning eller blåst.",
    related: [
      { to: "/takproblem/igensatta-hangrannor", label: "Igensatta hängrännor" },
      { to: "/takproblem/lackage-vid-takfonster-och-genomforingar", label: "Läckage vid takfönster och genomföringar" },
      { to: "/takproblem/dalig-underlagspapp", label: "Dålig underlagspapp" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten" },
    ],
  },
  {
    slug: "ruttna-vindskivor-och-takfot",
    title: "Ruttna vindskivor eller takfotsbrädor",
    metaTitle: "Ruttna vindskivor och takfot – tecken och åtgärder",
    metaDescription:
      "Flagnande färg, mjukt trä eller mörka fläckar på vindskivor och takfot? Så hittar du orsaken, vad du gör själv och när det hänger ihop med taket.",
    intro:
      "Vindskivorna sitter längs takets gavlar och takfotsbrädorna längs takets nedre kant. De skyddar takets kanter mot väder och vind och ger huset dess avslutning. Eftersom de sitter ytterst får de ta emot mycket regn, sol och fukt. När träet börjar ruttna är det ofta ett tecken på att vatten har kommit dit det inte ska, och ibland ligger orsaken uppe på taket.",
    symptom:
      "Färg som flagnar eller släpper i flagor, trä som har mörknat, spruckit eller känns mjukt där du säkert når det från marken eller från ett fönster. Brädor som har släppt, bågnar eller har glipor i skarvarna. Mossa, alger eller svarta fläckar på träet. Under takfoten kan du ibland se droppmärken eller fuktränder på fasaden. På vinden kan det finnas fukt eller mörk råspont närmast takfoten eller gaveln.",
    orsaker:
      "Vatten som rinner över kanten när hängrännorna är igensatta eller lutar fel. Fotplåt eller vindskiveplåt som saknas, har släppt eller är för kort, så att vatten kommer åt träets ändar. Ett läckage längre upp på taket där vattnet följer underlaget ner till takfoten. Is som bildas vid takfoten och tvingar smältvatten in under pannorna. Färg som har åldrats så att träet inte längre skyddas, eller kontakt med växtlighet som håller kvar fukten.",
    akut:
      "När brädor har släppt och kan falla ner, när vatten kommer in på vinden eller i väggen, eller när rötan har gått så långt att takets kant inte längre sitter stadigt. Spärra då av under den skadade delen och kontakta en takläggare. En vindskiva som bara har flagnande färg är sällan akut, men den ska målas eller ses över innan träet hinner ta skada.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: vindskivor och takfotsbrädor, fotplåt och vindskiveplåt, hängrännornas skick och lutning och om pannorna närmast kanten ligger som de ska. Där vinden går att komma åt syns därifrån om råspont eller takfot har blivit fuktig. Syftet är att hitta var vattnet kommer ifrån, så att inte bara brädan byts medan orsaken finns kvar.",
    atgarder:
      "Byte av ruttna vindskivor och takfotsbrädor, gärna med ny vindskiveplåt eller fotplåt som skyddar träets kanter. Rensning, justering eller byte av hängrännor om de är orsaken. Om vatten kommer från taket ska det läckaget åtgärdas samtidigt, och skadad råspont närmast kanten kan behöva bytas. Vid ett takbyte ses vindskivor, takfot och plåtdetaljer över som en del av arbetet.",
    gorInteSjalv:
      "Arbete på hög stege eller uppe på taket vid takfoten. Kanten är den plats där fallrisken är störst, och ruttet trä kan släppa när du belastar det. Du kan fota skadorna från marken, hålla hängrännorna fria där du säkert når dem från marken och notera var på huset rötan sitter. Det hjälper till att hitta orsaken.",
    related: [
      { to: "/takproblem/igensatta-hangrannor", label: "Igensatta hängrännor" },
      { to: "/takproblem/istappar-pa-taket", label: "Istappar och isbildning vid takfoten" },
      { to: "/takproblem/rutten-raspont", label: "Rutten eller skadad råspont" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten" },
    ],
  },
  {
    slug: "lackande-plattak",
    title: "Läckande plåttak",
    metaTitle: "Läckande plåttak – vanliga orsaker och vad du gör",
    metaDescription:
      "Läcker plåttaket? Så känner du igen läckage vid skruvar, skarvar och falsar, vad du kan göra själv och när taket behöver kontrolleras.",
    intro:
      "Ett plåttak är tätt så länge plåten, skarvarna och infästningarna är hela. När det börjar läcka sitter orsaken sällan mitt i en plåt, utan där plåtarna möts, där de är fästa eller där något går igenom taket. Här går vi igenom hur läckaget brukar visa sig på skruvad profilplåt och på falsat plåttak, och vad du kan göra innan taket kontrolleras.",
    symptom:
      "Fuktfläckar i innertaket som ofta följer en rak linje, längs en skarv eller en rad av skruvar. Droppar eller fuktränder på undersidan av taket på vinden, i ett garage eller ett uthus där plåten syns inifrån. Utifrån kan du se skruvar som står upp, saknas eller har rostiga brickor, plåtar som har glidit isär i en skarv, en fals som har öppnat sig, rost i kanter och skarvar eller plåt som har bucklats av en gren eller av snö och is.",
    orsaker:
      "På skruvad plåt har tätningsbrickan under skruven åldrats, eller skruven har släppt eller dragits snett så att vatten följer med in. Skarvarna mellan plåtarna överlappar för lite eller har öppnats. På falsat plåttak har en fals öppnat sig eller ett fäste släppt. Nockplåt, fotplåt eller anslutningar mot skorsten, vägg och genomföringar har släppt eller rostat. Plåten har fått hål av rost eller av en mekanisk skada. Under plåten kan det också vara kondens som droppar, vilket ser ut som ett läckage men har en annan orsak.",
    akut:
      "När vatten droppar in, när fukten når isolering eller el, eller när en plåt har lossnat och kan blåsa av. Samla då upp vattnet, flytta undan det som kan ta skada, fota och kontakta en takläggare. En plåt som fladdrar i blåsten ska åtgärdas snabbt, eftersom den både kan släppa in vatten och falla ner.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: skruvar och brickor, skarvar och falsar, nock, fotplåt och alla anslutningar, och om plåtens ytbehandling är hel. Där undersidan går att komma åt följs fuktspåren därifrån, och det brukar också visa om det handlar om läckage eller kondens. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
    atgarder:
      "Byte av skruvar och brickor där de har släppt. Nya eller omlagda plåtdetaljer vid nock, fot och anslutningar. Byte av enstaka plåtar som har fått hål eller bucklats. Omfalsning eller lagning av en öppen fals på falsat tak. Är plåten genomrostad på flera ställen, eller är underlaget skadat, kan ett nytt plåttak vara en bättre lösning än att laga ett läckage i taget.",
    gorInteSjalv:
      "Gå inte upp på plåttaket. Plåt är hal, särskilt när den är fuktig, frostig eller sned, och den kan bucklas om man kliver fel. Täta inte skarvar och skruvar på måfå med fogmassa, eftersom det kan stänga in fukt och göra det svårare att hitta orsaken. Du kan fota fläckarna, titta från marken med kikare och notera när det läcker: vid regn, snösmältning eller kalla, klara nätter.",
    related: [
      { to: "/takproblem/rostig-plat", label: "Rostig plåt och rostiga beslag" },
      { to: "/takproblem/kondens-pa-vinden", label: "Kondens på vinden" },
      { to: "/takproblem/stormskador-pa-taket", label: "Stormskador på taket" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten" },
    ],
  },
  {
    slug: "skadad-takpapp-pa-papptak",
    title: "Blåsor och sprickor i takpappen",
    metaTitle: "Blåsor och sprickor i takpapp – tecken och åtgärder",
    metaDescription:
      "Blåsor, sprickor, släppta skarvar eller stående vatten på papptaket? Så känner du igen skadorna och vet när taket behöver kontrolleras.",
    intro:
      "På ett papptak är pappen själva tätskiktet. Det finns inga pannor ovanför som tar det mesta av vädret, så en skada i pappen kan släppa in vatten direkt. Papptak ligger ofta på flacka tak, som garage, uthus, tillbyggnader och låglutande villatak, där vattnet rinner av långsamt. Här går vi igenom de tecken du kan se och vad de kan betyda.",
    symptom:
      "Blåsor eller bubblor i pappen, sprickor i ytan, skarvar som har släppt eller rest sig, och kanter som har lossnat vid takfot, vindskivor eller uppvik mot en vägg. Ytan kan ha tappat sitt skyddande strö så att den svarta pappen syns, eller ha fått veck och ojämnheter. Vatten som står kvar i pölar långt efter att det har slutat regna. Inomhus visar det sig som fuktfläckar i innertaket, ofta en bit från det ställe där vattnet faktiskt kommer in.",
    orsaker:
      "Pappen har åldrats av sol, kyla och värme och blivit spröd. Skarvar har inte svetsats eller klistrats tätt, eller har släppt med tiden. Blåsor kan uppstå när fukt har stängts in under pappen. Taket har för lite fall eller har satt sig, så att vatten blir stående, och då prövas varje skarv hårdare. Takbrunnar och utlopp är igensatta av löv. Plåtdetaljer vid kanter och uppvik har släppt, eller pappen har skadats av grenar, snöskottning eller av att någon har gått på taket.",
    akut:
      "När vatten kommer in, när en skarv har öppnat sig helt eller när pappen har lossnat i en kant så att vinden kan ta tag i den. Samla då upp vattnet inomhus, flytta undan det som kan ta skada, fota och kontakta en takläggare. Stående vatten på ett tak som inte läcker är inte akut, men det ska ses över.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: pappens yta och skarvar, kanter och uppvik, plåtdetaljer, brunnar och utlopp och hur vattnet rinner av. Där undersidan går att komma åt syns det om underlaget har blivit fuktigt. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
    atgarder:
      "Lagning av enstaka skador och skarvar när pappen i övrigt är i gott skick. Rensning av brunnar och utlopp. Nya plåtdetaljer vid kanter och anslutningar. Är pappen sliten över stora ytor, eller har underlaget tagit skada, läggs ett nytt papptak, och då byts också skadade delar av underlaget. Om taket har för lite fall kan det behöva rättas till samtidigt.",
    gorInteSjalv:
      "Gå inte på ett papptak som har blåsor, sprickor eller mjuka partier. Det kan skada pappen ytterligare, och ett fuktskadat underlag kan ge vika. Stick inte hål på blåsor. Du kan fota skadorna från en säker plats, hålla utlopp och stuprör rena där du når dem från marken och notera var vattnet blir stående.",
    related: [
      { to: "/takproblem/dalig-underlagspapp", label: "Dålig underlagspapp" },
      { to: "/takproblem/rutten-raspont", label: "Rutten eller skadad råspont" },
      { to: "/takproblem/igensatta-hangrannor", label: "Igensatta hängrännor" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/material/papptak", label: "Papptak" },
    ],
  },
  {
    slug: "losa-nockpannor",
    title: "Lösa eller spruckna nockpannor",
    metaTitle: "Lösa nockpannor – tecken, orsaker och åtgärder",
    metaDescription:
      "Har nockpannorna flyttat sig, spruckit eller ramlat ner? Så ser du det från marken, varför det händer och när nocken behöver läggas om.",
    intro:
      "Nocken är takets högsta linje, där de två takfallen möts. Där ligger nockpannorna som ett lock över skarven. De sitter mest utsatt av allt på taket, eftersom vinden tar som hårdast just där. När en nockpanna släpper eller spricker öppnas en springa rakt ner mot underlaget, på det ställe där taket har minst skydd.",
    symptom:
      "Nockpannor som ligger snett, har glidit isär eller saknas, så att nocklinjen inte längre är rak och jämn. Bitar av pannor på marken efter en blåsig natt. Bruk eller tätning som har ramlat ner i hängrännan eller ligger på marken längs husets långsida. På vinden kan du se ljus eller fukt längs nocken, och efter regn eller snöfall kan det ligga fukt eller snö på isoleringen rakt under nocken.",
    orsaker:
      "Fästena som håller nockpannorna har rostat eller släppt, eller pannorna är lagda i bruk som har spruckit och vittrat. Nockbrädan som pannorna vilar på har blivit fuktig och mjuk. Kraftig vind har lyft pannor som redan satt löst. Frost har sprängt pannor som har fått sprickor. Nocktätningen under pannorna har åldrats, så att vatten och snö kan blåsa in även när pannorna ligger kvar.",
    akut:
      "När nockpannor har ramlat ner eller ligger så löst att de kan falla mot gång, uteplats eller bil, och när vatten kommer in på vinden. Håll dig då borta från området under takkanten, samla upp vatten inomhus och kontakta en takläggare. En nockpanna som ligger lite snett är inte akut, men den ska åtgärdas före nästa storm.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: hur nockpannorna ligger och är fästa, i vilket skick nocktätningen och nockbrädan är och om pannorna närmast nocken har rört sig. Där vinden går att komma åt syns det därifrån om fukt har kommit in längs nocken. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
    atgarder:
      "Omläggning av nocken med nya fästen och ny nocktätning, och byte av spruckna nockpannor. Byte av nockbrädan där den har tagit skada. Är pannorna och underlaget i övrigt uttjänta kan ett takbyte vara en bättre lösning, och då görs nocken om som en del av arbetet.",
    gorInteSjalv:
      "Gå inte upp till nocken. Det är den högsta och mest utsatta platsen på taket, och lösa pannor kan glida under fötterna. Du kan titta längs nocklinjen från marken eller med kikare, fota det du ser, spara bitar som har ramlat ner och titta efter fukt på vinden under nocken.",
    related: [
      { to: "/takproblem/trasiga-takpannor", label: "Trasiga eller förskjutna takpannor" },
      { to: "/takproblem/stormskador-pa-taket", label: "Stormskador på taket" },
      { to: "/takproblem/fukt-pa-vinden", label: "Fukt eller mögel på vinden" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/takomlaggning", label: "Takomläggning" },
    ],
  },
  {
    slug: "porosa-betongpannor",
    title: "Porösa eller vittrade betongpannor",
    metaTitle: "Porösa betongpannor – tecken på att ytan är sliten",
    metaDescription:
      "Har betongpannorna tappat färgen, blivit sträva eller börjat släppa sand? Så känner du igen slitna pannor och vet när taket bör kontrolleras.",
    intro:
      "Betongpannor har ett ytskikt som ger kulören och skyddar betongen under. Med tiden slits det av sol, regn och frost. När ytskiktet är borta blir pannan sträv och suger åt sig mer vatten, och då får mossa och lav lättare fäste. Det behöver inte betyda att taket läcker, men det är ett tecken på att pannorna har åldrats och att taket bör ses över.",
    symptom:
      "Pannor som har bleknat, blivit grå och flammiga eller har tappat sin ursprungliga kulör. En sträv, sandig yta, och sand eller grus från pannorna som samlas i hängrännorna och vid stuprörens utlopp. Mycket mossa och lav, särskilt i skuggiga lägen. Kanter som har vittrat eller flagnat, och enstaka pannor som har spruckit. Pannorna torkar långsamt efter regn och ser mörka ut länge.",
    orsaker:
      "Ytskiktet har slitits bort av väder och vind. Frost spränger ytan när pannan har sugit åt sig vatten. Mossa och lav håller kvar fukt och påskyndar slitaget. Hård rengöring, till exempel med högtryck på nära håll, kan ta bort ytskiktet i förtid. Slitaget går ofta fortare på den sida av taket som ligger i skugga eller under träd.",
    akut:
      "Sällan. Porösa pannor är ett långsamt förlopp, och det som skyddar huset om en panna släpper igenom lite fukt är underlaget under pannorna. Det blir bråttom först när pannor spricker och faller sönder, eller när underlaget samtidigt är slitet så att vatten kommer in. Då ska taket kontrolleras snarast.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: pannornas yta och kanter, hur mycket påväxt det finns, om pannor har spruckit och hur nock, plåtdetaljer och hängrännor ser ut. Där vinden går att komma åt ser vi därifrån hur underlaget mår, eftersom det avgör hur bråttom det är. Efter bedömningen får du veta vad som behöver göras och ett fast pris.",
    atgarder:
      "Byte av enstaka spruckna pannor och skonsam borttagning av mossa när pannorna i övrigt håller. Är pannorna slitna över hela taket, och underlaget har åldrats, är en takomläggning med nytt underlag, ny läkt och nya pannor det som håller i längden. Vilket som är rätt beror på underlagets skick, inte bara på hur pannorna ser ut.",
    gorInteSjalv:
      "Gå inte upp på taket, och tvätta inte pannorna med högtryck på nära håll. Sköra pannor kan spricka under fötterna, och hård tvätt kan skada ytan ytterligare. Du kan titta från marken, fota taket i släpljus, hålla hängrännorna rena där du säkert når dem och lägga märke till om det samlas sand i dem.",
    related: [
      { to: "/takproblem/mossa-pa-taket", label: "Mossa och påväxt på taket" },
      { to: "/takproblem/trasiga-takpannor", label: "Trasiga eller förskjutna takpannor" },
      { to: "/takproblem/dalig-underlagspapp", label: "Dålig underlagspapp" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/material/betongpannor", label: "Betongpannor" },
    ],
    relatedProject: "takrenovering-blido",
  },
  {
    slug: "lackage-vid-takkupa",
    title: "Läckage vid takkupa",
    metaTitle: "Läckage vid takkupa – var det brukar läcka och varför",
    metaDescription:
      "Fukt i taket eller väggen vid takkupan? Så hittar du var vattnet kan komma in, vad du kan göra själv och när kupans anslutningar behöver ses över.",
    intro:
      "En takkupa bryter takfallet och ger ljus och ståhöjd, men den ger också taket flera nya skarvar. Kupan har egna väggar, ett eget litet tak och två ränndalar eller vinklar där den möter huvudtaket. Varje sådan anslutning ska vara tät, och det är oftast där, inte i själva kupan, som ett läckage börjar.",
    symptom:
      "Fuktfläckar eller missfärgning i innertaket intill kupan, i kupans sidoväggar eller under fönstret. Färg som bubblar eller flagnar på kupans insida. Fukt eller mörka ränder på råsponten runt kupan på vinden. Utifrån kan du se löv och barr som har samlats i vinklarna vid kupans sidor, plåt som ser rostig eller lös ut, pannor som ligger snett intill kupan eller trä på kupans sidor som har mörknat.",
    orsaker:
      "Plåten i vinklarna mellan kupan och huvudtaket har rostat, spruckit eller släppt. Anslutningen mellan kupans väggar och taket är otät, eller plåten bakom kupans panel är för låg så att snö och slagregn tar sig över. Löv, snö och is blir liggande vid kupans sidor och dämmer vattnet. Pannorna närmast kupan är fel kapade eller har flyttat sig. Kupans eget tak, fönsterbleck eller fönsteranslutning läcker. Underlaget runt kupan kan också ha åldrats.",
    akut:
      "När vatten droppar in, när fukten når isolering eller el, eller när fläckarna växer för varje regn. Samla då upp vattnet, flytta undan det som kan ta skada, fota och kontakta en takläggare. Fukt som pågår länge vid en kupa kan skada både råsponten och kupans egen stomme.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: plåten i kupans vinklar, anslutningarna mot kupans väggar, kupans eget tak och fönsterbleck och hur pannorna närmast ligger. Där vinden går att komma åt följs fuktspåren därifrån, eftersom vattnet kan rinna en bit innan det syns. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
    atgarder:
      "Ny plåt i vinklarna och nya anslutningar mot kupans väggar, omläggning av pannorna närmast och nytt underlag runt kupan där det är skadat. Rensning när det bara är skräp som dämmer. Skadat trä i kupan kan behöva bytas. Vid ett takbyte görs alla anslutningar runt kupan om.",
    gorInteSjalv:
      "Arbete uppe på taket vid kupan. Vinklarna intill en kupa är trånga och hala, och det är lätt att trampa sönder plåt eller pannor. Du kan fota fuktfläckarna, titta på kupan från marken och notera när det läcker: vid slagregn från ett visst håll, vid snösmältning eller efter att löv har samlats.",
    related: [
      { to: "/takproblem/lackande-ranndal", label: "Läckande ränndal" },
      { to: "/takproblem/lackage-vid-takfonster-och-genomforingar", label: "Läckage vid takfönster och genomföringar" },
      { to: "/takproblem/rutten-raspont", label: "Rutten eller skadad råspont" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/takkupor", label: "Takkupor" },
    ],
  },
  {
    slug: "lackande-hangrannor",
    title: "Hängrännor som läcker eller har släppt",
    metaTitle: "Läckande hängrännor – skarvar, krokar och fel lutning",
    metaDescription:
      "Droppar hängrännan i en skarv, har den släppt från krokarna eller rinner vattnet åt fel håll? Så ser du felet och vet när rännan behöver bytas.",
    intro:
      "En hängränna ska göra en enda sak: ta emot vattnet från taket och leda det till stupröret. När den läcker, hänger snett eller har släppt från takfoten hamnar vattnet i stället på fasaden, i takfoten eller vid husgrunden. Det syns sällan som ett läckage inomhus, och därför får felet ofta pågå länge.",
    symptom:
      "Vatten som droppar från en skarv eller ett hörn även när rännan inte är full. Rännan hänger ner, buktar eller har släppt från en eller flera krokar. Vatten som blir stående i rännan i stället för att rinna mot stupröret. Stuprör som har glidit isär i en skarv eller lossnat från väggen. Mörka ränder, flagnande färg eller grön påväxt på fasaden under rännan, och jord som har spolats bort eller står blöt vid husgrunden.",
    orsaker:
      "Skarvar och gavlar har blivit otäta med tiden. Is och snö har tyngt ner rännan så att krokarna har böjts eller släppt. Rännan har från början för lite fall, eller har satt sig så att vattnet rinner åt fel håll. Rost har gått igenom plåten. Fotplåten, som ska leda vattnet från taket ner i rännan, saknas eller sitter fel, så att vattnet rinner bakom rännan. Takfotsbrädan som krokarna sitter i kan ha blivit mjuk av fukt.",
    akut:
      "När rännan hänger så löst att den kan falla ner, eller när vatten rinner in i takfoten eller väggen. Håll då undan under rännan och kontakta en takläggare. En skarv som droppar är inte akut, men vatten som rinner på samma ställe på fasaden år efter år ger till slut skador.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: rännornas lutning och infästning, skarvar och gavlar, stuprören och deras fästen, fotplåten och takfotens trä. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
    atgarder:
      "Justering av lutningen och nya eller kompletterade krokar. Tätning eller byte av skarvar och gavlar. Byte av de delar som har rostat eller bucklats. Ny fotplåt där den saknas eller sitter fel, och byte av takfotsbräda där träet har tagit skada. Är rännorna slitna längs hela huset byts de i sin helhet, och det görs ofta i samband med ett takbyte.",
    gorInteSjalv:
      "Arbete från hög stege vid takfoten. Luta inte stegen mot rännan, eftersom den inte är gjord för att bära en människa. Du kan titta på rännorna från marken när det regnar, vilket är det bästa tillfället att se var vattnet tar vägen, och fota det du ser.",
    related: [
      { to: "/takproblem/igensatta-hangrannor", label: "Igensatta hängrännor" },
      { to: "/takproblem/ruttna-vindskivor-och-takfot", label: "Ruttna vindskivor eller takfotsbrädor" },
      { to: "/takproblem/istappar-pa-taket", label: "Istappar och isbildning vid takfoten" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/hangrannor", label: "Hängrännor" },
    ],
  },
  {
    slug: "lackage-mellan-tak-och-vagg",
    title: "Läckage där taket möter en vägg",
    metaTitle: "Läckage mellan tak och vägg – orsaker och åtgärder",
    metaDescription:
      "Fukt där ett lägre tak möter en högre vägg, till exempel vid en tillbyggnad eller ett garage? Så hittar du orsaken och vet när plåten behöver göras om.",
    intro:
      "På många hus möter ett tak en vägg: en tillbyggnad mot huvudhuset, ett garage mot gaveln, ett farstutak eller ett altantak mot fasaden. I den vinkeln ska en plåt leda vattnet från väggen ut på taket. Det är en av de anslutningar som oftast ger problem, eftersom två byggnadsdelar som rör sig olika ska hållas täta mot varandra.",
    symptom:
      "Fuktfläckar i innertaket eller högst upp på väggen i tillbyggnaden, längs den sida som ligger mot det högre huset. Färg som bubblar, tapet som släpper eller en mörk rand längs vinkeln. Utifrån kan du se plåt som har släppt från väggen, en fog som har spruckit, panel som har mörknat närmast taket eller löv och snö som blir liggande i vinkeln. Läckaget märks ofta vid slagregn mot väggen eller när snö smälter.",
    orsaker:
      "Plåten i vinkeln har släppt, rostat eller går för kort upp på väggen. Fogen mellan plåt och vägg har åldrats och spruckit. Fasadens panel eller puts går ner bakom plåten på fel sätt, så att vatten som rinner längs väggen hamnar innanför. Snö som ligger kvar i vinkeln smälter och når över plåtens kant. Tillbyggnaden har satt sig något, så att anslutningen har öppnats. Pannorna eller pappen närmast väggen ligger fel.",
    akut:
      "När vatten droppar in, når isolering eller el, eller när fläckarna växer för varje regn. Samla då upp vattnet, flytta undan det som kan ta skada, fota och kontakta en takläggare. Fukt som pågår länge i den här vinkeln kan skada både takets underlag och väggens stomme.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: plåten i vinkeln och hur högt den går, fogen mot väggen, hur fasaden ansluter och hur takets ytmaterial ligger närmast väggen. Där undersidan går att komma åt följs fuktspåren därifrån. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
    atgarder:
      "Ny plåt i vinkeln, uppdragen tillräckligt högt på väggen och rätt ansluten mot fasaden. Omläggning av pannorna eller pappen närmast väggen. Byte av skadat underlag. Ibland behöver också fasadens nedersta del ses över, så att vattnet leds ut över plåten och inte bakom den. Vid ett takbyte görs anslutningen mot väggen om.",
    gorInteSjalv:
      "Arbete uppe på taket, och att stryka på tätningsmassa över plåt och fog. Det döljer felet och gör det svårare att åtgärda ordentligt. Du kan fota fläckarna, titta på vinkeln från marken och notera vid vilket väder det läcker.",
    related: [
      { to: "/takproblem/lackage-vid-takkupa", label: "Läckage vid takkupa" },
      { to: "/takproblem/lackande-ranndal", label: "Läckande ränndal" },
      { to: "/takproblem/lackage-vid-skorsten", label: "Läckage vid skorstenen" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/platarbeten", label: "Plåtarbeten" },
    ],
  },
  {
    slug: "rutten-lakt",
    title: "Rutten läkt och pannor som glider",
    metaTitle: "Rutten läkt – när pannorna börjar glida",
    metaDescription:
      "Glider pannorna ner eller ligger raderna ojämnt? Det kan vara läkten under som har ruttnat. Så känner du igen det och vet vad som behöver göras.",
    intro:
      "Takpannor ligger inte direkt på underlaget. De hänger på bärläkt, vågräta reglar som sitter på ströläkt ovanpå underlagspappen. Läkten syns aldrig utifrån, men den bär hela taket. När den blir fuktig och ruttnar tappar pannorna sitt fäste, och då börjar de glida, sjunka eller ligga ojämnt.",
    symptom:
      "Pannor som har glidit ner mot takfoten, så att det uppstår glipor högre upp. Rader av pannor som inte längre ligger rakt, eller ett parti där pannorna har sjunkit ner. Pannor som ligger löst och rör sig i blåst. Pannor som har hamnat i hängrännan. På vinden syns det inte alltid, eftersom läkten ligger ovanpå underlagspappen, men fukt eller ljus på ställen där pannor har flyttat sig är ett tecken.",
    orsaker:
      "Vatten som under lång tid har tagit sig in under pannorna, till exempel genom spruckna pannor, och blivit stående mot läkten. Ströläkt som saknas eller är för tunn, så att vatten och fukt inte kan rinna och vädras bort under bärläkten. Löv och skräp som har samlats under pannorna och håller kvar fukt. Läkt som helt enkelt har åldrats tillsammans med resten av taket. Spikar och fästen som har rostat av.",
    akut:
      "När pannor har glidit så att underlaget ligger öppet, eller när pannor ligger löst och kan falla ner mot gång, uteplats eller bil. Håll då undan under takkanten och kontakta en takläggare. Enstaka pannor som har flyttat sig lite är inte akut, men det ska undersökas varför.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: hur pannraderna ligger, om pannor är lösa, och hur läkten och underlaget ser ut där det går att se in under pannorna. Rutten läkt på ett ställe betyder ofta att läkten är i samma skick på fler ställen, eftersom den är lika gammal över hela taket. Efter bedömningen får du veta vad som behöver åtgärdas och ett fast pris.",
    atgarder:
      "Är skadan avgränsad kan pannorna lyftas, läkten bytas på den delen och pannorna läggas tillbaka. Är läkten dålig över större delar av taket är en takomläggning den lösning som håller: det gamla ytmaterialet tas av, underlag och läkt byts, och taket läggs på nytt. Hela och friska pannor kan ibland återanvändas, annars läggs nya.",
    gorInteSjalv:
      "Gå inte upp på ett tak där pannorna glider. Läkten kan ge vika under foten, och lösa pannor ger inget fäste. Skjut inte tillbaka pannor från en stege. Du kan fota taket från marken, gärna i släpljus då ojämna rader syns tydligast, och spara pannor som har ramlat ner.",
    related: [
      { to: "/takproblem/trasiga-takpannor", label: "Trasiga eller förskjutna takpannor" },
      { to: "/takproblem/dalig-underlagspapp", label: "Dålig underlagspapp" },
      { to: "/takproblem/rutten-raspont", label: "Rutten eller skadad råspont" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/takomlaggning", label: "Takomläggning" },
    ],
    relatedProject: "takrenovering-blido",
  },
  {
    slug: "alger-och-svarta-rander",
    title: "Svarta ränder och alger på taket",
    metaTitle: "Svarta ränder och alger på taket – vad det betyder",
    metaDescription:
      "Mörka strimmor, grön hinna eller fläckar på taket? Så skiljer du alger från mossa och skador, och vet när taket bör kontrolleras.",
    intro:
      "Mörka strimmor som rinner ner längs takfallet, en grön hinna på norrsidan eller svarta fläckar på pannorna är oftast alger och annan påväxt. Det ser tråkigt ut, men det är sällan ett läckage i sig. Däremot visar det var taket håller sig fuktigt längst, och det kan dölja skador som behöver ses över.",
    symptom:
      "Svarta eller mörkgrå strimmor som följer vattnets väg ner längs taket. En grön eller gröngrå hinna, främst på den sida som ligger i skugga eller under träd. Fläckar som är mörka när taket är blött och ljusnar när det torkar. Missfärgningen är ofta tydligast nedanför skorstenar, takfönster och andra ställen där vatten rinner långsamt.",
    orsaker:
      "Alger och annan påväxt trivs där ytan är fuktig länge: i skugga, i norrläge, under träd och nära vatten. En sträv och porös yta, till exempel på äldre betongpannor, ger bättre fäste än en slät. Löv och barr som blir liggande håller kvar fukt. Mörka ränder kan också vara smuts och sot som har följt med regnvattnet, eller rost som rinner från en plåtdetalj eller ett fäste högre upp.",
    akut:
      "Nej, inte i sig. Det som kan vara bråttom är det som påväxten döljer eller pekar på: en plåt som rostar, pannor som har blivit porösa eller ett ställe där vatten blir stående. Rostfärgade ränder från ett beslag ska ses över tidigare än en grön hinna.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats: vad missfärgningen består av, hur pannornas eller plåtens yta ser ut under den, om plåtdetaljer rostar och hur hängrännor och ränndalar fungerar. Efter bedömningen får du veta om något behöver göras och i så fall ett fast pris.",
    atgarder:
      "Ofta behövs ingenting annat än att taket hålls rent från löv och att rännorna fungerar. Är det rost åtgärdas eller byts den plåtdetalj som rostar. Är pannorna porösa och underlaget slitet kan en takomläggning vara det som löser grundproblemet. Vi erbjuder också taktvätt, och vid takkontrollen går vi igenom om det är rätt åtgärd för ditt tak.",
    gorInteSjalv:
      "Gå inte upp på ett tak med alger. En grön hinna är mycket hal, särskilt när den är fuktig. Tvätta inte taket med högtryck på nära håll, eftersom det kan skada ytan och pressa in vatten under pannorna. Du kan fota taket, hålla undan grenar som hänger över det och rensa hängrännorna där du säkert når dem från marken.",
    related: [
      { to: "/takproblem/mossa-pa-taket", label: "Mossa och påväxt på taket" },
      { to: "/takproblem/porosa-betongpannor", label: "Porösa eller vittrade betongpannor" },
      { to: "/takproblem/rostig-plat", label: "Rostig plåt och rostiga beslag" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
      { to: "/tjanster/taktvatt", label: "Taktvätt" },
    ],
  },
  {
    slug: "fuktflack-i-innertaket",
    title: "Fuktfläck i innertaket",
    metaTitle: "Fuktfläck i innertaket – var kommer vattnet ifrån?",
    metaDescription:
      "En gul eller mörk fläck i innertaket? Så ringar du in var vattnet kommer ifrån, vad du gör direkt och när taket behöver kontrolleras. Kostnadsfri takkontroll.",
    intro:
      "En fuktfläck i innertaket är ofta det första tecknet på att vatten har tagit sig in någonstans ovanför. Fläcken säger att något är fel, men sällan var. Vatten som kommer in genom taket kan rinna flera meter längs underlag, takstolar och isolering innan det syns i ett rum. Här går vi igenom hur du läser av fläcken, vilka orsaker som finns och hur du ringar in var vattnet kommer ifrån innan taket kontrolleras.",
    symptom:
      "En gulaktig eller brun fläck i innertaket, ofta med en mörkare kant. Färg som bubblar eller flagnar, tapet som släpper uppe vid taket, eller en taklist som har missfärgats. Fläcken kan växa efter regn eller när snö smälter och blekna däremellan. Ibland känns ytan fuktig eller mjuk, och i värsta fall droppar det. En unken lukt i rummet eller på vinden ovanför hör ofta ihop med fläcken. Lägg märke till var den sitter: nära en yttervägg, under en skorsten, under ett takfönster eller mitt i rummet.",
    orsaker:
      "En vanlig källa är en otät anslutning i taket snarare än själva takytan. Under en skorsten pekar fläcken mot beslaget runt den. Under eller intill ett takfönster, en ventilationshuv eller ett avloppsrör pekar den mot genomföringen. Längs en linje där två takfall möts pekar den mot ränndalen, och intill en kupa eller en tillbyggnad mot anslutningen mellan tak och vägg. En fläck vid ytterväggen kan komma från takfoten eller från hängrännor som svämmar över. En fläck mitt i takfallet tyder oftare på trasiga pannor, skadad plåt eller ett underlag som har åldrats. Alla fläckar är inte läckage utifrån: kondens på vinden, eller en vattenledning eller ett våtrum på våningen ovanför, kan ge samma bild.",
    akut:
      "När det droppar, när fläcken växer snabbt, när innertaket buktar eller när fukten är nära en lampa, ett eluttag eller annan el. Bryt då strömmen till det som berörs, ställ ett kärl under, flytta undan möbler och textilier och fotografera fläcken. Buktar innertaket står det vatten ovanför: håll dig undan från den delen av rummet. Hör sedan av dig till en takläggare, och kontakta ditt försäkringsbolag om skadan är stor.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats. Berätta var fläcken sitter, när du såg den första gången och i vilket väder den växer, eftersom det ringar in var på taket vattnet kommer in. Där vinden går att komma åt följs fuktspåren därifrån, uppåt och bakåt från platsen ovanför fläcken, eftersom vattnet ofta har runnit en bit. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.",
    atgarder:
      "Åtgärden beror på var vattnet kommer in. Ett otätt beslag eller en genomföring kan tätas eller göras om. Enstaka trasiga pannor byts, och en ränndal som har rostat får ny plåt. Visar det sig att underlaget har åldrats på stora delar av taket, eller att det finns flera läckage, är ett takbyte ofta bättre än att laga ett ställe i taget. Innertaket ska torka ut helt innan det spacklas och målas om, annars kommer fläcken tillbaka genom färgen. Är orsaken kondens eller en ledning inne i huset är det inte ett takarbete, och då säger vi det.",
    gorInteSjalv:
      "Gå inte upp på taket för att leta efter läckan, och försök inte täta från utsidan med fogmassa eller presenning på egen hand. Måla inte över fläcken förrän orsaken är åtgärdad: då döljs spåret som visar om läckaget fortsätter. Det du kan göra är att fotografera fläcken med datum, rita en tunn blyertslinje runt den för att se om den växer, och titta på vinden med ficklampa efter mörka ränder eller blöt isolering ovanför fläcken.",
    related: [
      { to: "/akut-lackage", label: "Läckage i taket" },
      { to: "/takproblem/lackage-vid-skorsten", label: "Läckage vid skorsten" },
      { to: "/takproblem/lackage-vid-takfonster-och-genomforingar", label: "Läckage vid takfönster och genomföringar" },
      { to: "/takproblem/lackande-ranndal", label: "Läckande ränndal" },
      { to: "/takproblem/lackage-mellan-tak-och-vagg", label: "Läckage mellan tak och vägg" },
      { to: "/takproblem/fukt-pa-vinden", label: "Fukt och mögel på vinden" },
      { to: "/takproblem/kondens-pa-vinden", label: "Kondens på vinden" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
    ],
  },
  {
    slug: "yrsno-pa-vinden",
    title: "Snö som yr in på vinden",
    metaTitle: "Snö på vinden – därför yr den in och så gör du",
    metaDescription:
      "Har det yrt in snö på vinden? Så tar du hand om den innan den smälter, var snön brukar komma in och när taket behöver ses över. Kostnadsfri takkontroll.",
    intro:
      "Efter ett snöfall med hård vind kan det ligga snö på vinden, som små drivor på isoleringen eller som ett tunt lager längs takfoten. Det är finkornig snö som vinden har tryckt in genom öppningar i taket. Lite yrsnö vid ett enstaka oväder är inget ovanligt på en kall, ventilerad vind. Kommer det mycket, eller på samma ställe varje gång, finns det en öppning som är värd att se över.",
    symptom:
      "Snö på isoleringen eller på vindsgolvet, ofta i en sträng längs takfoten, vid gavlarna eller under nocken. Snön kan också ligga runt en genomföring eller under ett ställe där en panna har flyttat sig. Efter några dagar syns i stället blöta fläckar i isoleringen, och ibland en fuktfläck i innertaket under. Ser du frost eller droppar på hela undersidan av taket och inte bara snö på vissa ställen är det oftare kondens.",
    orsaker:
      "En kall vind ska ventileras, och luften kommer in vid takfoten och går ut vid nock eller gavlar. Vid finkornig snö och hård vind kan snön följa med samma väg. Mer snö än så kommer in där det finns en större öppning: pannor som har glidit isär eller spruckit, en nockpanna som sitter löst, en gavelventil utan galler eller skydd, en otät anslutning runt en genomföring eller ett underlag som har gått sönder. På ett tak med pannor är det underlaget som ska hålla tätt mot snö som blåser in under pannorna.",
    akut:
      "När det ligger så mycket snö att den inte går att ta bort innan den smälter, när vatten redan har runnit ner i innertaket, eller när snön ligger nära el på vinden. Kommer det in stora mängder vid varje oväder har taket en öppning som behöver åtgärdas före nästa snöfall.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats. Berätta var på vinden snön låg och hur mycket det var, och fotografera gärna innan du tar bort den, eftersom det visar var den kom in. Där vinden går att komma åt jämförs platsen med taket utifrån: pannor, nock, gavlar, genomföringar och takfot. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.",
    atgarder:
      "Lite yrsnö vid takfoten efter ett ovanligt hårt oväder kräver ofta ingen annan åtgärd än att snön tas bort. Kommer snön in genom en öppning rättas den till: pannor läggs tillbaka eller byts, nockpannor fästs, och en otät genomföring eller anslutning görs om. Är underlaget skadat på en begränsad yta kan det lagas där. Är underlaget dåligt på stora delar av taket är ett takbyte ofta bättre än att laga ett ställe i taget. Ventilationen vid takfot och nock ska inte täppas igen för att stänga ute snön, eftersom vinden då får problem med fukt i stället.",
    gorInteSjalv:
      "Gå inte upp på ett snöigt eller isigt tak. Täta inte ventilationsöppningar med skum, tyg eller plast. Det du kan göra är att ta bort snön från vinden medan den är torr: skyffla den försiktigt i en hink eller en säck och bär ut den. Gå bara på bjälkarna eller på landgången, inte på isoleringen. Har snön redan smält, lyft undan blöt lösull eller blöta skivor så att de får torka, och håll koll på innertaket under de närmaste dagarna.",
    related: [
      { to: "/takproblem/kondens-pa-vinden", label: "Kondens på vinden" },
      { to: "/takproblem/fukt-pa-vinden", label: "Fukt och mögel på vinden" },
      { to: "/takproblem/fuktflack-i-innertaket", label: "Fuktfläck i innertaket" },
      { to: "/takproblem/trasiga-takpannor", label: "Trasiga takpannor" },
      { to: "/takproblem/losa-nockpannor", label: "Lösa nockpannor" },
      { to: "/takproblem/dalig-underlagspapp", label: "Dålig underlagspapp" },
      { to: "/blogg/takkontroll-fore-vintern", label: "Takkontroll före vintern" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
    ],
  },
  {
    slug: "is-i-ranndalen",
    title: "Is i ränndalen",
    metaTitle: "Is i ränndalen – därför dämmer den och det här gör du",
    metaDescription:
      "Is som bygger upp i ränndalen kan dämma smältvatten så att det tar sig in i taket. Så känner du igen det, vad du ska låta bli och när taket bör ses över.",
    intro:
      "Ränndalen är rännan där två takfall möts, och dit leds vatten från båda sidor. På vintern samlas också snö där. När snön smälter på dagen och fryser igen på natten kan det byggas upp is i ränndalen. Isen blir en damm, och smältvattnet bakom den blir stående i stället för att rinna av. En ränndal är gjord för vatten som rinner, inte för vatten som står.",
    symptom:
      "En tjock iskaka eller en isvall i ränndalen, ofta längst ner mot takfoten. Istappar där ränndalen slutar. Efter några dagars töväder kan det synas fukt på vinden under ränndalen eller en fuktfläck i innertaket längs linjen där takfallen möts. Läcker det bara vid tö efter en kall period och inte vid vanligt regn pekar det mot is snarare än mot ett hål i plåten.",
    orsaker:
      "Is bildas när snö smälter på en varmare del av taket och vattnet fryser igen på en kallare. Värme som läcker upp från huset till vinden värmer takytan, medan takfoten utanför ytterväggen är kall. Ränndalen tar emot smältvatten från två takfall och har ofta mer snö än resten av taket, så där går det fortast. Löv och barr som ligger kvar sedan hösten håller kvar vatten och gör det värre. När vattnet blir stående kan det ta sig över plåtens uppvikta kanter eller in i skarvar som är täta mot rinnande vatten.",
    akut:
      "När det droppar inne, när en fuktfläck växer under ränndalen eller när is och snö hänger ut över en entré, en gångväg eller en altan. Spärra av under taket där något kan falla ner. Läcker det inne, ställ ett kärl under, flytta undan det som kan ta skada och fotografera. Hör sedan av dig till en takläggare.",
    undersokning:
      "Vid takkontrollen tittar vi på taket på plats. Det går bäst att bedöma ränndalen när den är fri från snö och is, så en kontroll kan behöva vänta tills det har tinat. Berätta var det har läckt eller var isen brukar bygga upp, och fotografera gärna medan isen ligger kvar. På plats bedöms ränndalens plåt, hur pannorna eller plåten ansluter mot den, underlaget intill och om det ligger skräp i rännan. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.",
    atgarder:
      "Vad som hjälper beror på vad som finns under isen. En ränndal som är full av löv och barr rensas, helst före vintern. Är plåten rostig, för smal eller otät i skarvarna läggs en ny ränndal, och underlaget intill ses över samtidigt. Läcker värme upp från huset är det tilläggsisolering och tätning av vindsbjälklaget som minskar smältningen, och det är inte ett takarbete. Vid ett takbyte görs ränndalarna om tillsammans med resten av plåtarbetet.",
    gorInteSjalv:
      "Hugg inte bort is ur ränndalen med yxa, spett eller hammare: plåten under går lätt sönder, och då läcker ränndalen också när isen är borta. Strö inte vägsalt på taket. Gå inte upp på ett isigt tak. Det du kan göra är att rensa ränndalar och hängrännor på hösten om de går att nå säkert, och att hålla koll på vinden och innertaket under ränndalen när det töar.",
    related: [
      { to: "/takproblem/istappar-pa-taket", label: "Istappar och isbildning vid takfoten" },
      { to: "/takproblem/lackande-ranndal", label: "Läckande ränndal" },
      { to: "/takproblem/igensatta-hangrannor", label: "Igensatta hängrännor" },
      { to: "/takproblem/fuktflack-i-innertaket", label: "Fuktfläck i innertaket" },
      { to: "/takproblem/kondens-pa-vinden", label: "Kondens på vinden" },
      { to: "/blogg/takkontroll-fore-vintern", label: "Takkontroll före vintern" },
      { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" },
    ],
  },
];

export const getProblem = (slug: string) => problems.find((p) => p.slug === slug);
export const SAKERHETSRUTA = SAKERHET;
