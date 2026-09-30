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
];

export const getProblem = (slug: string) => problems.find((p) => p.slug === slug);
export const SAKERHETSRUTA = SAKERHET;
