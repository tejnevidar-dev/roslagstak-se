/**
 * Egna FAQ-svar per ortssida (gren 180, #13), tre per sida. Genererad av scripts/import-egna-faq.ts ur ledning/marknad/innehall/faq-egna-2026-10-22.md (steg 1–22, godkända av
 * Marknadschefen). Ändra inte för hand: ändra briefen och kör importen. De tre ersätter mallens frågor om tidsåtgång, takmaterial och "byta eller renovera" (location-faqs.ts).
 * Bara relativa importer.
 */
export interface EgenFAQ {
  question: string;
  answer: string;
}

export const EGNA_FAQ: Record<string, readonly EgenFAQ[]> = {
  "uppsala": [
    { question: "Vilka delar av Uppsala tar ni uppdrag i?", answer: "Vi tar uppdrag i hela Uppsala, bland annat i villastaden i Kåbo, egnahemsområdet i Ekeby, Sunnersta, Årsta, Valsätra, Nåntuna, Bergsbrunna och Stenhagen. Det börjar med en kostnadsfri takkontroll på plats." },
    { question: "När kom villorna till Kåbo och Ekeby?", answer: "Planerna för villaförstäderna på Kåbo gärde började byggas på 1910-talet, och Kåbo gärde byggdes som en villastad mellan universitetsområdena. Egnahemsområdet i Ekeby uppfördes med början 1922." },
    { question: "Vad är värt att tänka på med taket i en stadsdel som Sunnersta?", answer: "I Sunnersta står hus från hela 1900-talet sida vid sida, eftersom avstyckningen började 1906–1907 och fortsatte länge. Grannens tak säger därför inte mycket om ditt eget, och varje hus får en egen takkontroll och ett eget pris." },
  ],
  "danderyd": [
    { question: "Vilka delar av Danderyd tar ni uppdrag i?", answer: "Vi tar uppdrag i alla fyra delarna: Djursholm med Ösby och Svalnäs, Stocksund, Enebyberg och Danderyd med Nora, Klingsta och Kevinge. Det börjar med en kostnadsfri takkontroll på plats." },
    { question: "Hur gamla är villastäderna i Danderyd?", answer: "Djursholm anlades som villastad 1889, och i Stocksund såldes den första tomten 1890. Enebyberg började som villastad 1906, och Nora tog fart 1926. Villorna är alltså till stor del mellan 80 och 135 år gamla." },
    { question: "Vad är värt att tänka på med taket på en äldre villa i Danderyd?", answer: "Villor från 1890-talet och 1900-talets början kan ha torn, kupor, burspråk och flera takfall. Varje anslutning ska vara tät. På en äldre villa är takets form, material och kulör en del av husets karaktär, och delar av kommunen har bebyggelse som kommunen enligt Wikipedia har pekat ut som kulturhistoriskt värdefull." },
  ],
  "taby": [
    { question: "Vilka delar av Täby tar ni uppdrag i?", answer: "Vi tar uppdrag i hela Täby, bland annat i Roslags-Näsby, Täby kyrkby, Viggbyholm, Näsbypark, Ensta, Lahäll, Gribbylund, Skarpäng och Vallabrink. Det börjar med en kostnadsfri takkontroll på plats." },
    { question: "Varför ligger så många villaområden längs Roslagsbanan i Täby?", answer: "Täby blev villaort med järnvägen. Roslagsbanan drogs fram på 1880-talet, och enligt Täby kommun växte villaområdena fram kring stationerna, till exempel Roslags-Näsby, Viggbyholm och Ensta." },
    { question: "Vad är värt att tänka på med taket i ett typhusområde i Täby?", answer: "I Skarpäng och Gribbylund präglas bebyggelsen av typhus från 1970- och 1980-talen. Där husen byggdes samtidigt ser taken lika ut från gatan, men de kan ha skötts och lagts om var för sig, så varje hus får en egen takkontroll och ett eget pris." },
  ],
  "norrtalje": [
    { question: "Vilka orter i Norrtälje kommun tar ni uppdrag i?", answer: "Vi har vår bas i Norrtälje och tar uppdrag i hela kommunen, bland annat i staden, Rimbo, Hallstavik, Älmsta, Grisslehamn, Herräng, Rådmansö och på Vätö. Till Yxlan och Blidö går vägfärja." },
    { question: "Vad skiljer orterna i Norrtälje kommun åt?", answer: "Rimbo växte fram kring järnvägen, som kom 1884, och Hallstavik blev brukssamhälle när pappersbruket grundades 1915. Herräng är ett gruvsamhälle, och Grisslehamn fick ett uppsving som sommarort i slutet av 1800-talet." },
    { question: "Vad är värt att tänka på med ett fritidshus i Norrtälje kommun?", answer: "Ett fritidshus som har blivit åretruntbostad kan ha byggts om och till, och då kan det finnas takdelar av olika ålder på samma hus. Det kan också vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs." },
  ],
  "akersberga": [
    { question: "Vilka delar av Åkersberga tar ni uppdrag i?", answer: "Vi tar uppdrag i hela Åkersberga och resten av Österåker, bland annat i Österskär, Stora Stava, Svinninge, Täljö, Margretelund, Rydbo, Brevik, Lervik, Flaxenvik och Skärgårdsstad, och på Ljusterö." },
    { question: "Hur kom Åkersberga och Österskär till?", answer: "Åkersberga började som en järnvägsstation på ett gärde 1901. Roslagsbanan förlängdes till Österskär 1906, där stora trävillor hade byggts vid sekelskiftet. På 1930-talet räknades Åkersberga och Österskär som två tätorter, och sedan 1950 anses de sammanvuxna." },
    { question: "Tar ni uppdrag på Ljusterö?", answer: "Ja. Till Ljusterö går vägfärjan från Östanå, så material och ställning kan köras fram som på fastlandet. Har ditt hus ingen bilväg: berätta var det ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas." },
  ],
  "spillersboda": [
    { question: "Var ligger Spillersboda?", answer: "Spillersboda ligger i Frötuna socken i Norrtälje kommun, vid kusten sydost om Norrtälje. Wikipedia beskriver det som ett skärgårdssamhälle som har gått från fiskar- och jordbrukartiden, via pensionatens och ångbåtarnas tid, till dagens samhälle." },
    { question: "Hur många bor i Spillersboda?", answer: "Drygt 300 personer bor här året om, och därtill kommer omkring 1 500 fritidsboende. Andelen fritidshus är så hög att Spillersboda under en period inte räknades som tätort." },
    { question: "Vad är värt att tänka på med ett fritidshus i Spillersboda?", answer: "Ett fritidshus som har byggts till eller används året om kan ha takdelar av olika ålder, och skarven mellan dem är värd en extra titt. Det kan också vara byggt med klenare takstolar, och då kan bärigheten behöva bedömas av en konstruktör innan ett tyngre material väljs." },
  ],
  "vallentuna": [
    { question: "Vilka delar av Vallentuna tar ni uppdrag i?", answer: "Vi tar uppdrag i hela Vallentuna, bland annat i Ormsta, Bällsta, Molnby, Snapptuna, Rickeby, Kragstalund, Uthamra, Lindholmen, Kårsta och Brottby, och på landsbygden." },
    { question: "Hur växte Vallentuna fram?", answer: "Vallentuna fick en station när järnvägen Stockholm–Rimbo invigdes 1885, och tätorten har vuxit fram längs Roslagsbanan. Mellan 1944 och 1952 ökade befolkningen från omkring 2 300 till nästan 5 900, och utbyggnaden har skett i etapper." },
    { question: "Hur gammal är Vallentuna kyrka?", answer: "Vallentuna kyrka ligger vid Vallentunasjöns norra strand och har varit sockenkyrka sedan medeltiden. Den första kyrkan av gråsten byggdes enligt Wikipedia på 1190-talet. I dag täcks alla byggnadsdelar av sadeltak, utom gravkoret, som har en spetsig takspira." },
  ],
  "upplands-vasby": [
    { question: "Vilka delar av Upplands Väsby tar ni uppdrag i?", answer: "Vi tar uppdrag i hela kommunen, bland annat i Bollstanäs, Odenslunda, Vilunda, Brunnby Vik och på landsbygden kring Hammarby och Vaxmyra." },
    { question: "Hur växte Upplands Väsby fram?", answer: "Järnvägen mellan Stockholm och Uppsala byggdes 1863–1866, och stationen fick namnet Väsby efter slottet Stora Väsby. Orten växte mycket snabbt kring 1970, och Väsby centrum öppnade 1972 på det som tidigare var åkermark." },
    { question: "Vad är värt att tänka på med taket i ett kvarter som byggdes samtidigt?", answer: "Där husen byggdes samtidigt ser taken lika ut från gatan, men de kan ha skötts och lagts om var för sig. Grannens tak säger därför inte mycket om ditt eget, och varje hus får en egen takkontroll och ett eget pris." },
  ],
  "alvsjo": [
    { question: "När byggdes Älvsjö villastad?", answer: "Åren 1908 och 1911 köptes stora delar av Älvsjö gårds marker och styckades till villatomter. Den första stadsplanen fastställdes 1921, och enligt Stockholms stad byggde den på samma grundprinciper som de tidiga trädgårdsstäderna." },
    { question: "Hur stora är tomterna i Älvsjö?", answer: "Tomterna var från början 1 500–3 000 kvadratmeter. När nya planer gjordes på 1930-talet blev de 700–1 000 kvadratmeter, och senare har hus tillkommit på avstyckade tomter kring 600 kvadratmeter." },
    { question: "Vad är värt att tänka på med taket i Älvsjö?", answer: "Där tomter har delats i omgångar kan grannhusen vara byggda med många årtiondens mellanrum, så det går inte att dra slutsatser från grannens tak till det egna. I lummiga trädgårdar samlas löv i hängrännor och ränndalar." },
  ],
  "tullinge": [
    { question: "Vilka delar av Tullinge tar ni uppdrag i?", answer: "Vi tar uppdrag i hela Tullinge, bland annat i Tullinge villastad, Brantbrink, Tullinge skog och Tullinge parkhem. Det börjar med en kostnadsfri takkontroll på plats." },
    { question: "Hur växte Tullinge villastad fram?", answer: "Stambanan gick genom Tullinge redan 1859, men en hållplats kom först 1903, och den blev station 1917. Planerna för villastaden fullföljdes inte helt, och villastaden har vuxit fram i flera omgångar, med en stor del av husen från 1950-talet och en nyare årgång från 2000-talet." },
    { question: "Vad är värt att tänka på med en äldre villa i Tullinge?", answer: "Äldre villor kan ha fler vinklar, kupor och skorstenar, och varje anslutning ska vara tät. I en villastad som har förtätats i omgångar säger grannens tak inte mycket om ditt eget." },
  ],
  "stuvsta": [
    { question: "När började villorna byggas i Stuvsta?", answer: "När Stuvsta gård såldes 1908 köptes marken av privata exploatörer, och 1910 bildades ett fastighetsbolag som styckade tomter för egnahem. Tomtförsäljningen tog fart efter 1918, när stationen vid Västra stambanan öppnade." },
    { question: "Vilka områden räknas till Stuvsta?", answer: "Till Stuvsta hör bland annat Solfagra, Kynäs, Segersminne och Stensängen, och i Myrängen byggdes rad- och kedjehus under 1980- och 1990-talen. Vi tar uppdrag i alla delarna." },
    { question: "Vad finns kvar från Stuvstas första tid?", answer: "Stationshuset från 1917–1918 står kvar med ortens namn på gaveln, och Stuvstakyrkan från 1954 byggdes av tegel från en riven kyrka i Stockholm." },
  ],
  "djursholm": [
    { question: "När anlades villastaden Djursholm?", answer: "Djursholm anlades som villastad 1889. Enligt Wikipedia köpte det nybildade Djursholms AB egendomen i juni det året, och redan i oktober hade bolaget sålt 58 tomter." },
    { question: "Var byggdes de första villorna i Djursholm?", answer: "Den ursprungliga villastaden styckades av kring nuvarande Djursholms torg, vid slottet och längs strandlinjen mot Värtan. Det höglänta, kuperade området sydöst om slottet var ett av de första som bebyggdes." },
    { question: "Varför ser villorna i Djursholm så olika ut?", answer: "Enligt Wikipedia uppfördes de flesta villorna var för sig, oberoende av grannhusen, och därför präglas den äldre bebyggelsen av en blandning av stilar, från det första årets enkla trävillor till nationalromantik och jugend." },
  ],
  "trangsund": [
    { question: "Vilka delområden finns i Trångsund?", answer: "Trångsund består av åtta delområden: Sjöängen, Nytorp, Stortorp, Hammartorp, Fållan, Mellansjö, Orlångsjö och Svartvik. Vi tar uppdrag i alla." },
    { question: "Hur växte Trångsund fram?", answer: "Nynäsbanan blev klar 1901, med egen station i Trångsund. I Stortorp skapades över 600 tomter mellan 1911 och 1928, byggandet ökade under 1930- och 1940-talen, och i början av 1960-talet byggdes både flerbostadshus och småhus." },
    { question: "Var kommer namnet Trångsund ifrån?", answer: "Namnet kommer från det trånga sundet i Drevviken. Trångsund nämns första gången 1636 som ett torp, som med tiden blev en mindre herrgård." },
  ],
  "vaddo": [
    { question: "Hur tar man sig till Väddö?", answer: "Väddö kanal och Väddöviken skiljer ön från fastlandet, och tre broar leder över: Trästabron i norr, Älmstabron i mitten och Bagghusbron i söder. Kanalen invigdes 1840." },
    { question: "Vilka orter ligger på Väddö?", answer: "Mitt på ön ligger Älmsta, som delvis ligger på fastlandet, och nära öns nordspets ligger Grisslehamn. Sydost om Kasberget ligger Kista hembygdsgård, med byggnader från 1700- och 1800-talen." },
    { question: "Vad är Roslags-Bro?", answer: "Roslags-Bro är socknen nordost om Norrtälje, på fastlandet mittemot Väddö. Namnet skrevs Bro år 1322 och syftar på en bro över Broströmmen vid kyrkan. I socknen finns 50 gravfält från järnåldern, en fornborg och fem runstenar." },
  ],
  "skarholmen": [
    { question: "Vilka stadsdelar hör till Skärholmen?", answer: "Skärholmens stadsdelsområde består av Skärholmen, Sätra, Bredäng och Vårberg. Vi tar uppdrag på radhus, kedjehus och villor i alla fyra." },
    { question: "När byggdes radhusen och villorna i Sätra?", answer: "I Sätra började man bygga 1964, och fyra år senare var stadsdelen i det närmaste färdig. Enligt Wikipedia uppfördes bland annat 267 radhus, 174 kedjehus och 107 villor." },
    { question: "Vad är Domarringen i Skärholmen?", answer: "Domarringen är ett gravfält från bronsåldern och järnåldern söder om Skärholmens centrum. Det undersöktes 1966–1967, och den yttre stenkransen återuppfördes, medan resten fick ge plats åt radhusbebyggelse." },
  ],
  "norrviken": [
    { question: "När började Norrviken byggas?", answer: "Villasamhället började byggas 1906, när ett villastadsbolag köpte en gårds ägor och styckade dem i egnahemstomter. Stationen öppnade den 1 maj 1907, och 1929 blev Norrviken municipalsamhälle." },
    { question: "Vilka områden gränsar till Norrviken?", answer: "Norrviken gränsar till Rotebro, Vaxmora, Häggvik och Viby i Sollentuna. Vi tar uppdrag i alla dem." },
    { question: "Varför står hus av olika ålder nära varandra i Norrviken?", answer: "Många äldre villor byggdes med stora trädgårdar, som i många fall senare har styckats och bebyggts, främst under 1960- till 1980-talen. Där en gammal trädgårdstomt har styckats säger grannens tak därför inte mycket om ditt eget." },
  ],
  "vato": [
    { question: "Hur tar man sig till Vätö?", answer: "Fram till 1993 tog man sig över med färja från fastlandet. Då ersattes den av Vätöbron, så i dag går det att köra bil hit." },
    { question: "Vad har Vätö levt på?", answer: "Enligt Wikipedia var brytning och försäljning av sandsten en betydande näring under 1600- och 1700-talen, och sedan tog bondeseglationen över. Granitbrytningen började 1892, och den röda graniten användes bland annat till Riksdagshuset och Kungliga Operan." },
    { question: "Vilka hus finns på Vätö?", answer: "Wikipedia beskriver en stor andel äldre bebyggelse, mest torp och gårdar från 1800-talets andra hälft, och stenhuggartorp. Stenhuggarna lät också bygga små villor med hög stenfot. Den norra delen av ön har fritidshus från 1960- och 1970-talen." },
  ],
  "vaxholm": [
    { question: "Vilka öar i Vaxholm tar ni uppdrag på?", answer: "Vi tar uppdrag i hela Vaxholm, bland annat på Vaxön, Resarö, Rindö, Skarpö och Tynningö. Till ett hus med bilväg, också över bro eller med vägfärja, kommer vi som på fastlandet." },
    { question: "När började villorna byggas på Resarö?", answer: "Villabebyggelsen på Resarö började med Ytterbystrand, ett villaområde som grundades 1903. I slutet av 1900-talet förvandlades ön enligt Wikipedia från sommarö till villaförort." },
    { question: "Hur gammal är staden Vaxholm?", answer: "Centralorten ligger på Vaxön och fick stadsprivilegier 1652, med fästningen på holmen utanför som nav i försvaret av inloppet till Stockholm." },
  ],
  "hallstavik": [
    { question: "Hur växte Hallstavik fram?", answer: "Fram till början av 1900-talet var Hallsta en by. Hallsta pappersbruk grundades 1915 på byns utmarker vid Edeboviken, och bruket expanderade snabbt, så att Hallstavik växte till ett brukssamhälle." },
    { question: "När byggdes husen i Hallstavik?", answer: "Enligt hitta.se är husen i tätorten mest byggda på 1950- och 1960-talen, medan delar är från sekelskiftet 1900 till 1920-talet. Bebyggelsen består av både villor och flerbostadshus." },
    { question: "Vilka gamla socknar ligger Hallstavik i?", answer: "Hallstavik ligger där Edebo och Häverö socknar möts, och gränsen går längs Skeboån och Edeboviken. De södra delarna, Hallstalund, Gottsta och Häverödal, ligger i Häverö. Båda socknarna hör sedan 1971 till Norrtälje kommun." },
  ],
  "svartloga": [
    { question: "Var ligger Svartlöga?", answer: "Svartlöga är en ö i Blidö socken, i Stockholms ytterskärgård. Ön är enligt Wikipedia låglänt och når som högst 12 meter över havet, och den är riksintresse för naturvård, kulturmiljö och friluftsliv." },
    { question: "Hur gammal är bebyggelsen på Svartlöga?", answer: "Den första fasta bosättningen kom i slutet av 1400-talet. Svartlöga hörde enligt Wikipedia till de få öar i Roslagen som klarade sig undan rysshärjningarna 1719, och kapellet är från 1916." },
    { question: "Vad är värt att tänka på med ett sommarhus på Svartlöga?", answer: "Ett hus som står tomt större delen av året har ingen som ser en läcka när den börjar. Titta på vinden och i innertaket när huset öppnas för säsongen." },
  ],
  "furusund": [
    { question: "Hur tar man sig till Furusund?", answer: "Sedan 1953 går det enligt Wikipedia att köra bil hit. Då byggdes en vägbank från Eknö på Svartnö till Furusund, som en del av Sju strömmars väg från fastlandet." },
    { question: "När blev Furusund badort?", answer: "Badorten kom till vid mitten av 1800-talet. Ön köptes 1842 och fick hotell och kägelbana, och 1855 byggdes ett varmbadhus vid viken. Från 1907 började tomter säljas av." },
    { question: "Vad finns kvar från Furusunds tid som tullplats?", answer: "År 1811 inrättades en tullkammare här, och tullhuset från 1811–1812, byggt för 15 tullmän med familjer, är i dag värdshus. I berget finns en inristad kompassros som troligen är från 1463." },
  ],
  "osterskar": [
    { question: "Var kommer namnet Österskär ifrån?", answer: "Namnet kom till genom en pristävling vid förra sekelskiftet, när ett trettiotal tomter vid Trälhavet och Tunaviken styckades av från Tuna gård. Tidigare hette platsen Tunanäs eller Biskopsudden." },
    { question: "När kom Roslagsbanan till Österskär?", answer: "År 1906 förlängdes Roslagsbanan till Österskär, och 1919 tillkom stationen Tunagård. Ångbåtsbryggan stod klar 1912." },
    { question: "Hur blev Österskär ett område med permanentboende?", answer: "Under 1920- och 1930-talen byggdes allt fler fritidshus. När Österskärsskolan byggdes 1968 tog den stora bofasta expansionen fart, med nya hus och sommarstugor som byggdes om till permanentbostäder." },
  ],
  "skogas": [
    { question: "Vilka delar består Skogås av?", answer: "Kommundelen består från norr till söder av Mörtvik, Östra Skogås, Västra Skogås, Länna och Gräsvreten. Vi tar uppdrag i alla delarna." },
    { question: "Var kommer namnet Skogås ifrån?", answer: "Enligt Wikipedia saknar namnet historisk anknytning och skapades troligen av stadsplanerare på 1930-talet, efter landskapets skog och åsar. Skogås fick egen station på Nynäsbanan 1932." },
    { question: "Vilka hus finns i Länna?", answer: "När Nynäsbanan hade gjort området mer attraktivt styckades mark av 1937 för sommarstugor och permanenta bostäder. Bebyggelsen i Länna består enligt Wikipedia huvudsakligen av villor och fritidshus." },
  ],
  "blido": [
    { question: "Hur tar man sig till Blidö?", answer: "Ingen av öarna Yxlan och Blidö har bro. En vägfärja går mellan Furusund och Köpmanholm på Yxlan, och en annan mellan Larshamn på Yxlan och Norrsund på Blidö." },
    { question: "När kom sommargästerna till Blidö?", answer: "Sommargäster har funnits på Blidö sedan slutet av 1800-talet, och reguljär ångbåtstrafik genom Blidösund började 1876. I början av 1950-talet började tomter säljas till sportstugor på Norrskogen." },
    { question: "Hur många bor på Blidö och Yxlan?", answer: "År 2020 hade Blidö 597 bofasta invånare och Yxlan 357. Kyrkan mitt på Blidö är från 1859." },
  ],
  "rimbo": [
    { question: "Hur växte Rimbo fram?", answer: "Banan mellan Länna och Norrtälje öppnades via Rimbo 1884, året efter kom järnvägen från Stockholm, och 1898 togs sträckan mot Hallstavik i bruk. Runt den knutpunkten växte samhället upp, och 1914 blev Rimbo municipalsamhälle." },
    { question: "Hur ser Rimbos gamla stadsplan ut?", answer: "Under 1920-talet antogs Rimbos första stadsplan. Enligt Norrtälje kommun var den påverkad av trädgårdsstadens ideal, med boulevarder, gator med alléer och villor i lummiga kvarter med stora trädgårdar." },
    { question: "Hur gammal är Rimbo kyrka?", answer: "Kyrkan är en stenkyrka från 1400-talets senare hälft. Den har enligt Wikipedia murar av gråsten med tegel i gavelrösena, och alla byggnadsdelar täcks av skifferklädda sadeltak." },
  ],
  "norrora": [
    { question: "Varför är Norröra känt?", answer: "Norröra blev känt under 1960-talet genom filmerna om Saltkråkan. Ön är enligt Wikipedia befolkad året runt, och i dag bor ett par familjer där." },
    { question: "Hur gammal är byn på Norröra?", answer: "Den gamla byn låg norr om dagens bebyggelse och brändes 1719. Efter det byggdes byn upp i sitt nuvarande läge, och öns äldsta stuga uppfördes enligt Wikipedia kort efter återuppbyggnaden." },
    { question: "Kommer husen på Norröra från andra öar?", answer: "Ja, flera av de äldsta husen är flyttade hit från Svartlöga, bland dem \"Snickargården\" från filmerna, som kom till ön i början av 1800-talet." },
  ],
  "sjoberg": [
    { question: "Vilka delar består Sjöberg av?", answer: "Sjöberg delas in i Östra Sjöberg, Västra Sjöberg och Falkberget och ligger mellan Edsviken, Rösjön och Rinkebyskogen i östra Sollentuna. Vi tar uppdrag i alla delarna." },
    { question: "När byggdes husen i Sjöberg?", answer: "Under 1930-talet var Sjöberg ett stort sportstugeområde. Den nuvarande bebyggelsen i Östra och Västra Sjöberg är huvudsakligen uppförd under 1970-talet, och mot slutet av 1990-talet började Falkberget bebyggas med villor." },
    { question: "Vad är Sjöbergs fornborg?", answer: "Fornborgen ligger på en hög platå och är omkring 210 gånger 100 meter stor. Enligt Wikipedia har borgmuren daterats till 400–550 e.Kr., och den har gett namn åt Borgvägen längs Edsvikens strand." },
  ],
  "enskede": [
    { question: "När byggdes Gamla Enskede?", answer: "Stockholms stad köpte Enskede gårds kvarvarande 606 hektar 1904 och planerade marken för egnahem. Stadsplanen är från 1907, och den 26 juni 1908 togs det första spadtaget. Enligt Wikipedia stod området i huvudsak färdigt redan 1913." },
    { question: "Vad är Enskedestugan?", answer: "Den som köpte en tomt kunde bygga ett helt eget hus eller välja något av de typhus som staden hade tagit fram. Ett av dem, typhus IV, kallas Enskedestugan och är ett friliggande trähus i en och en halv våning." },
    { question: "Vilka hus finns i Gamla Enskede?", answer: "Området utgörs enligt Wikipedia främst av parhus och enfamiljshus. Vid Margaretavägen står sex radhuslängor från 1908–1909, och på 1930- och 1940-talen byggdes Svampområdet söder om Sockenvägen med småhus." },
  ],
  "flysta": [
    { question: "När började Flysta villastad byggas?", answer: "År 1905 började marken styckas till villatomter, och under det följande årtiondet blev ett hundratal familjer bofasta i Flysta Villastad. År 1915 bildades Flysta municipalsamhälle." },
    { question: "Var kommer namnet Flysta ifrån?", answer: "Namnet är belagt 1375, i formen \"flyastum\". Förleden kan enligt Wikipedia vara det fornsvenska namnet Fly, men också ordet fly, som betyder sumpmark." },
    { question: "Vilka hus finns i Flysta?", answer: "Enligt Wikipedia är Flysta i huvudsak bebyggt med villor, men utmed Spångavägen finns också ett antal hyreshus." },
  ],
  "skarsatra": [
    { question: "När byggdes villorna i Skärsätra?", answer: "Villabebyggelsen började enligt Wikipedia uppföras 1909. År 1907 köpte ett konsortium egendomen för att bygga Skärsätra Villastad, och 1910 hade omkring 300 tomter sålts." },
    { question: "Vem byggde husen i Skärsätra?", answer: "Köparna var enligt Wikipedia huvudsakligen händiga hantverkare som blev sina egna byggherrar och byggmästare. Resultatet blev ett stort antal mindre trävillor, några av sommarstugekaraktär." },
    { question: "Hur gammal är Skärsätra gård?", answer: "Gården omnämns redan 1366. Av gårdsbebyggelsen från slutet av 1700-talet finns mangårdsbyggnaden och en flygel kvar, i ombyggt skick." },
  ],
  "svartno": [
    { question: "Hur tar man sig till Svartnö?", answer: "År 1945 invigdes vägen från fastlandet till Svartnö, som en del av Sju strömmars väg, med Svartnöbron. År 1953 förlängdes den med en vägbank från Eknö till Furusund, och en ny bro invigdes 1986." },
    { question: "Vad är Eknö?", answer: "Eknö är den östra halvan av Svartnö. Den var förr en egen ö, men landhöjningen har fått de två att växa ihop. Där finns små jord- och skogsbruk, en fritidsbåtshamn och ett mindre varv." },
    { question: "Hur gammal är byskolan på Svartnö?", answer: "Byskolan i Svartnö by är från 1879. Den står kvar och är enligt Wikipedia i stort sett orörd sedan den sista eleven gick ut 1939." },
  ],
  "svedmyra": [
    { question: "Var kommer namnet Svedmyra ifrån?", answer: "Namnet går tillbaka på torpet Svinmyra, som är känt sedan 1300-talet och lydde under Östberga gård. När Stockholms stad förvärvade marken 1905 ändrades namnet till Svedmyra." },
    { question: "Vem byggde småstugorna i Svedmyra?", answer: "När Örbybanan öppnade 1930 började enligt Wikipedia småstugor att byggas av självbyggare. Husen byggdes efter typhusritningar från stadens fastighetsbyrå, och den som saknade eget kapital kunde låna upp till 90 procent av byggkostnaden." },
    { question: "Var i Svedmyra ligger villorna?", answer: "Småhusen och villorna från 1930–1950 ligger enligt Wikipedia mellan Handelsvägen, Enskedevägen–Herrhagsvägen och Torögatan, i den östra delen av stadsdelen. Gatorna där har namn efter orter på Södertörn och i skärgården." },
  ],
  "saltsjo-boo": [
    { question: "Vilka områden hör till Saltsjö-Boo?", answer: "Boo är Nacka kommuns område öster om Skurusundet, med omkring 36 000 invånare. Här ligger bland annat Björknäs, Orminge, Kummelnäs och Lännersta. Vi tar uppdrag i alla delarna." },
    { question: "Hur gammal är Boo gård?", answer: "Länge bestod trakten mest av gårdarna Boo, Kummelnäs och Velamsund och ett antal mindre torp och hemman. Boo gård brändes ner 1719 och byggdes sedan upp igen, och herrgårdsbyggnaden finns kvar." },
    { question: "Hur blev sommarhusen i Boo villor?", answer: "I slutet av 1800-talet styckades stora markområden av från Kummelnäs gård, främst för sommarhus, och 1907 köpte en egnahemsförening ett stort område där. De flesta husen var trähus som ägarna byggde själva, och enligt Wikipedia består Kummelnäs i dag av villaområden som från början var sommarstugeområden." },
  ],
  "ulvsunda": [
    { question: "Hur gammalt är Ulvsunda?", answer: "Namnet står enligt Wikipedia på en runsten från 1000-talet, och Ulvsunda slott uppfördes 1644–1645. Villastaden började med sommarnöjen på Lillsjönäs ägor under 1800-talet." },
    { question: "Vad är Ulvsunda trädgårdsstad?", answer: "Stockholms stad köpte Lillsjönäs 1908 och planerade 1912 Ulvsunda trädgårdsstad. Planen fastställdes 1914, samma år som spårvagnen och elektriciteten drogs hit, och tomterna uppläts med tomträtt." },
    { question: "Vad tillät stadsplanen från 1922?", answer: "Stadsplanen från december 1922 tillät öppen eller kopplad bebyggelse i högst två våningar och reglerade både utseende och avstånd till granne och gata. Från 1940-talet byggdes i stället flerbostadshus." },
  ],
  "sodorora": [
    { question: "Vad var Söderöra känt för?", answer: "Söderöra var känt för sina båtbyggare och fraktseglare. Nordiska museet dokumenterade båtbyggeriet 1948, och då fanns en yrkesverksam båtbyggare kvar på ön. Bönhuset uppfördes 1908–1909." },
    { question: "Hur många bor på Söderöra?", answer: "Ön fick enligt Wikipedia sin första bofasta befolkning på 1500-talet, och som mest bodde 50 till 60 personer här, vid sekelskiftet 1900. I dag bor ett tjugotal på ön året runt, och här finns omkring 180 fritidshus." },
    { question: "Hur tar man sig till Söderöra?", answer: "Waxholmsbolaget trafikerar ön dagligen från Furusund, Östernäs och Bromskär, och på sommaren går det också båt direkt från Stockholm." },
  ],
  "ljustero": [
    { question: "Hur tar man sig till Ljusterö?", answer: "Vägfärjan Ljusteröleden går sedan 1955 mellan Östanå på fastlandet och Småskärsudden på ön. År 2020 hade Ljusterö enligt Wikipedia 1 663 bofasta invånare." },
    { question: "Vad är Ljusterö Villastad?", answer: "I Linanäs på södra ön styckades 75 tomter av år 1901 under namnet Ljusterö Villastad. Österåkers kommun beskriver samhället som en blandning av äldre sommarvillor och nyare hus." },
    { question: "Vad är Laggarsvik?", answer: "Laggarsvik, strax norr om Linanäs, var enligt Wikipedia bara ett torp vid sekelskiftet 1900. Mellan 1910 och 1920 anlades ett fiskeläge där, och samtidigt började tomter styckas av för både sommargäster och bofasta. Kommunens planprogram beskriver rödfärgade stugor på fyrkantiga tomter i ett rutnät av vägar." },
  ],
  "ingmarso": [
    { question: "Hur tar man sig till Ingmarsö?", answer: "Ön saknar vägförbindelse med fastlandet. Den trafikeras enligt Wikipedia av skärgårdsbåtar och båttaxi till två bryggor, Ingmarsö Södra och Ingmarsö Norra." },
    { question: "Vad finns kvar från Ingmarsös äldre historia?", answer: "Ön nämns första gången i jordeboken 1539, då fyra bönder bodde här. Båtsmanstorpet från 1694 finns fortfarande kvar vid Norrgården, och skolhuset från 1901 rymmer i dag förskola och bibliotek. Affären öppnade 1887 och har varit i gång sedan dess." },
    { question: "När kom sommargästerna till Ingmarsö?", answer: "Sommargästerna började komma på 1930-talet. Enligt Wikipedia hyrde de rum av de bofasta, bodde på pensionatet eller byggde egna hus." },
  ],
  "vidja": [
    { question: "Var kommer namnet Vidja ifrån?", answer: "Vidja var från början ett torp, och namnet är belagt sedan 1535, då det skrevs Viddia. Gården var känd för sina stora ekskogar." },
    { question: "Hur blev Vidja ett villaområde?", answer: "År 1910 styckades egendomen, 215 hektar, upp i 36 lotter, och genom vidare styckning blev det omkring 500 tomter. Vidja blev ett utpräglat sommarstugeområde, och andelen fritidshus var länge så hög att Vidja räknades som tätort först 1995. I dag är majoriteten av fastigheterna permanentbebodda." },
    { question: "Vad finns i Ågesta?", answer: "Ågesta är mest skogbevuxet, och där ligger Ågesta gård, med en huvudbyggnad i sten från 1600-talet. Bilväg till Vidja finns enligt Wikipedia bara norrifrån, genom Ågesta." },
  ],
  "yxlan": [
    { question: "Hur tar man sig till Yxlan?", answer: "Sedan 1954 har ön färjeförbindelse, mot Furusund i väster och mot Blidö i öster. Färjan till Furusund går från Köpmanholm, på öns norra del." },
    { question: "Vilken är Yxlans äldsta by?", answer: "Yxlö, mitt på ön, är enligt Wikipedia Yxlans äldsta by. Byn brändes 1719 och byggdes upp igen, och prästgården från 1752 hör till Blidö sockens äldsta byggnader." },
    { question: "Vad är Köpmanholm?", answer: "Köpmanholm, på öns norra del, fick sin bebyggelse i början av 1800-talet och blev lotssamhälle 1828. Här ligger öns skola och lanthandel." },
  ],
  "almsta": [
    { question: "Ligger Älmsta på Väddö eller på fastlandet?", answer: "Både och. Den södra delen, Elmsta by, ligger på fastlandet, och den norra, med byarna Hammarby och Norrsundet, ligger på Väddö. Väddö kanal mynnar här i Väddöviken." },
    { question: "Hur gammal är Älmsta?", answer: "När Elmsta nämns första gången, 1557, var det enligt Wikipedia redan en stor by med sju gårdar, och flera forngravar visar att bygden är äldre än så." },
    { question: "Vad är Älmstabron?", answer: "Älmstabron går över Väddö kanal, som började anläggas 1819 och invigdes 1840. Bron är en klaffbro som öppnas för båtarna, och länsväg 283 går genom orten vidare mot Grisslehamn." },
  ],
  "arholma": [
    { question: "Hur tar man sig till Arholma?", answer: "Hit kommer man med passagerarbåt från Simpnäs på Björkö. Ön har enligt Wikipedia omkring 50 bofasta, och på sommaren omkring 500." },
    { question: "Hur ser en redargård på Arholma ut?", answer: "När fraktseglingen växte under 1800-talet fick de flesta gårdarna sina parstugor påbyggda med en våning. Norrtälje kommun beskriver redargårdarna som huvudbyggnader i två våningar under sadeltak, med timmerstomme klädd med panel och en veranda eller farstukvist vid entrén." },
    { question: "När kom sommargästerna till Arholma?", answer: "Från slutet av 1800-talet minskade den bofasta befolkningen, och sommargästerna kom. De hyrde in sig på öns sex pensionat, flyttade in i övergivna bostadshus eller byggde nya fritidshus." },
  ],
  "bergshamra": [
    { question: "Vilka delar består Bergshamra av?", answer: "Orten består enligt Wikipedia av två delar: Hästängen, där sågverket, livsmedelsbutiken och vårdcentralen ligger, och Gamla Bergshamra, som är den ursprungliga orten. Vi tar uppdrag i båda." },
    { question: "Vad är Morastugan?", answer: "Morastugan i Mora är en timrad parstuga med faluröd panel, byggd omkring 1815–1817 efter storskiftet i Mora by. Den är byggnadsminne sedan 1980." },
    { question: "Hur ska Bergshamra växa?", answer: "Enligt Norrtälje kommuns Översiktsplan 2050 har befolkningen ökat kraftigt de senaste decennierna, i huvudsak därför att fritidshus har blivit permanentbostäder. Planen pekar ut ett område vid Mora för cirka 70 småhus och ett vid Lingonvägen för 60–70 bostäder." },
  ],
  "edsbro": [
    { question: "Vad tillverkades i Edsbro?", answer: "Edsbro är enligt Wikipedia en gammal bruksort, där det tillverkades råjärn från 1686 till 1919." },
    { question: "Vad finns kvar från bruket i Edsbro?", answer: "Ruinerna efter masugnen och klensmedjan är enligt Wikipedia välbevarade." },
    { question: "Hur gammal är Edsbro kyrka?", answer: "Edsbro är kyrkby i Edsbro socken, och kyrkan är från 1200-talet." },
  ],
  "herrang": [
    { question: "Hur länge bröts malm i Herräng?", answer: "Järnmalm bröts här från slutet av 1500-talet till början av 1960-talet, och järnverket vid hamnen var i drift till 1969. Orten är riksintresse för kulturmiljövården." },
    { question: "Vilka hus byggde gruvbolaget i Herräng?", answer: "Vid Udden står enligt Norrtälje kommun fem parhus i gult tegel från omkring 1905 och tre arbetarbostäder i trä med rödfärgad panel, byggda för fem hushåll vardera. I Hensvik lät gruvbolaget 1906 bygga disponentbostaden, ingenjörsbostaden och fyra arbetarbostäder." },
    { question: "Var ligger egnahemmen i Herräng?", answer: "Egnahemmen ligger enligt kommunens kulturmiljöutredning främst söder om järnverket, öster om Herrängsvägen, på förhållandevis stora trädgårdstomter med uthus, och gatunätet följer terrängen." },
  ],
  "kapellskar": [
    { question: "Var ligger Kapellskär?", answer: "Kapellskär är en udde längst ut på Rådmansö i Norrtälje kommun, omkring 90 kilometer nordost om Stockholm. Här slutar E18 sin sträckning i Sverige, vid Kapellskärs hamn." },
    { question: "När kom färjehamnen till Kapellskär?", answer: "Den moderna hamnen kom till 1960, när färjetrafiken flyttades hit från Gräddö. Året innan hade färjetrafiken till Mariehamn startat från Gräddö." },
    { question: "Hur länge har det funnits sjöfart från Kapellskär?", answer: "Enligt Wikipedia har sjöfart på Åland och Finland bedrivits härifrån sedan medeltiden." },
  ],
  "radmanso": [
    { question: "Vilka orter ligger på Rådmansö?", answer: "Rådmansö är en halvö omkring en mil öster om Norrtälje, där bland annat Kapellskär, Gräddö och Räfsnäs ligger. År 2015 avgränsade SCB för första gången en tätort här, med Nabbo, Gräddö och Räfsnäs." },
    { question: "När blev Gräddö ett turistmål?", answer: "Vid slutet av 1800-talet. Enligt Wikipedia byggdes då en mängd tornförsedda sommarhus, och flera pensionat startades. Gräddö båtvarv grundades 1924 och byggde motorkryssare och segelbåtar." },
    { question: "Hur gammal är Rådmansö församling?", answer: "Församlingen bildades i slutet av 1500-talet som ett kapellag utbrutet ur Frötuna. Socknen blev egen landskommun 1862 och ingår sedan 1971 i Norrtälje kommun." },
  ],
  "upplands-bro": [
    { question: "Vilka orter ligger i Upplands-Bro?", answer: "Kommunen har Kungsängen som centralort, och den andra stora orten är Bro. Båda är stationssamhällen vid samma järnväg, och till Bro hör i dag också villaområdena Österhagen och Bergliden. Vi tar uppdrag i hela kommunen." },
    { question: "När bildades Upplands-Bro kommun?", answer: "Kommunen bildades 1971 och fördes samtidigt över från Uppsala län till Stockholms län." },
    { question: "När kom pendeltågen till Upplands-Bro?", answer: "Pendeltågen började gå till Kungsängen 1968. Bros gamla station lades ner 1972, och persontrafiken dit kom tillbaka när pendeltågsstationen öppnade 2001." },
  ],
  "botkyrka": [
    { question: "Vilka kommundelar finns i Botkyrka?", answer: "Kommunen delas in i Alby, Fittja, Hallunda-Norsborg, Tullinge och Tumba-Grödinge, med Tumba som centralort. Enligt Wikipedia är den norra delen till stor del bebyggd, medan den södra består av mycket skog och äng." },
    { question: "Hur gammal är Botkyrka kyrka?", answer: "Den första kyrkan på platsen var enligt Wikipedia en träkyrka från 1129, och den nuvarande stenkyrkan invigdes 1176. På 1400-talet fick kyrkorummet fyra stjärnvalv av tegel." },
    { question: "Vad finns i Grödinge?", answer: "Grödinge är den södra delen av kommunen, en gammal socken på Södertörn med kuperade dalgångsbygder innanför Hallsfjärden, Järnafjärden och Kaggfjärden. Vid Kaggfjärden ligger Kagghamra fritidsområde med ungefär 200 fritidshus." },
  ],
  "sundbyberg": [
    { question: "Var finns villorna i Sundbyberg?", answer: "Villorna ligger i Duvbo och Lilla Ursvik, två villasamhällen som kom till staden först 1949. Den äldre bebyggelsen ligger i Centrala Sundbyberg. Vi tar uppdrag i båda villasamhällena." },
    { question: "När blev Sundbyberg stad?", answer: "Sundbyberg blev köping 1888 och stad 1927. Staden gränsar till Stockholm i söder, väster och norr och till Solna i öster." },
    { question: "Hur kom Lilla Ursvik till?", answer: "År 1907 stod 14 likadana villor klara vid Egnahemsvägen, byggda åt arbetarna vid en fabrik på gårdens mark. Senare styckades resten av marken, och ett villasamhälle växte fram." },
  ],
  "nynashamn": [
    { question: "Hur växte staden Nynäshamn fram?", answer: "Fram till slutet av 1800-talet var Nynäshamn ett mindre fiskeläge, där omkring 100 personer bodde 1899. Järnvägen till Stockholm invigdes 1901, året därpå började den reguljära trafiken till Gotland, och 1920 bodde 3 672 personer här." },
    { question: "Hur planerades staden Nynäshamn?", answer: "Staden planerades i tre delar: industrier och arbetarbostäder längst i norr, handel, service och bostäder i mitten och villor och badhotell längst söderut. Planerna för den södra delen genomfördes enligt Wikipedia inte fullt ut." },
    { question: "Hur gammal är Ösmo kyrka?", answer: "Ösmo kyrka ligger på krönet av en höjd i den gamla kyrkbyn. Dess äldsta delar är enligt Wikipedia från 1100-talet, och den känns igen på de ljust gulfärgade fasaderna och de branta, spånklädda sadeltaken." },
  ],
  "ekero": [
    { question: "Vilka öar hör till Ekerö kommun?", answer: "Kommunen består av en grupp öar i Mälaren, Mälaröarna. Enligt Wikipedia rymmer ögruppen 140 öar, kobbar och skär, och bland de större finns Lovön, Färingsö, Adelsö, Ekerön och Munsö." },
    { question: "Var bor man i Ekerö kommun?", answer: "Enligt Wikipedia finns större koncentrationer av bebyggelse bara på Ekerön och i Stenhamra. Resten av kommunen är till stor del jordbruksmark, skog och mindre samhällen." },
    { question: "Hur gammal är Ekerö kyrka?", answer: "Ekerö kyrka vid Kyrkfjärden uppfördes enligt Wikipedia under 1100-talets senare hälft och byggdes ut åt öster kring år 1300. Tornet tillkom under 1400-talet, och korsarmarna kring 1680." },
  ],
  "stockholm": [
    { question: "Var ligger villorna i Stockholm?", answer: "Villorna ligger i ytterstaden, i väster kring Bromma, Spånga och Hässelby och i söder kring Enskede, Älvsjö och Hägersten. Vi tar uppdrag i alla stadsdelarna." },
    { question: "Vad är stadens trädgårdsstäder?", answer: "År 1904 beslöt stadsfullmäktige att köpa Enskede gårds mark, 606 hektar, för att anlägga en trädgårdsstad. Staden planerade sedan fler trädgårdsstäder på mark den hade köpt, bland dem Äppelviken, Enskededalen, Stureby, Smedslätten och Ålsten." },
    { question: "Vad var småstugebyrån?", answer: "År 1927 bildades stadens småstugebyrå, och de första självbyggarna reste sina hus. På Enskedefältet restes över 400 småstugor mellan 1930 och 1932, och i Tallkrogen omkring 950 stugor fram till 1945." },
  ],
  "huddinge": [
    { question: "Var ligger villaområdena i Huddinge?", answer: "Centrum består enligt Wikipedia mest av flerbostadshus, och runt det ligger villaområden i de flesta väderstrecken: villastäder vid stambanan, områden längs Nynäsbanan och gamla sommarstugeområden. Vi tar uppdrag i hela kommunen." },
    { question: "Vilka villastäder i Huddinge blev municipalsamhällen?", answer: "Stuvsta, Fullersta och Segeltorp blev municipalsamhällen 1924 och Snättringe 1928. I Fullersta började tomter säljas redan 1902, under namnet Huddinge villastad." },
    { question: "Hur gammal är Huddinge kyrka?", answer: "Kyrkan byggdes enligt Wikipedia omkring år 1200, som en liten gråstenskyrka med tjocka murar vid Kyrksjön. Tornet rasade 1645, och det nuvarande tornet uppfördes 1877–1878." },
  ],
  "nacka": [
    { question: "Hur bildades Nacka kommun?", answer: "Kommunen bildades 1971 av Nacka stad, Saltsjöbadens köping och Boo landskommun. Den ligger öster om Stockholm, mellan Saltsjön i norr och Baggensfjärden i söder." },
    { question: "Vilka områden i Nacka är riksintresse för kulturmiljövården?", answer: "Saltsjöbaden, som grundades på 1890-talet som villa- och badort, och Storängen, som grundades 1904 av en egnahemsförening, är båda riksintresse för kulturmiljövården." },
    { question: "Hur gammal är Boo kyrka?", answer: "Boo kyrka på Ormingelandet invigdes 1923. Den ersatte delvis träkapellet från 1724 vid Boo gård och har enligt Wikipedia en stomme av tegel med putsade, svagt gulfärgade ytterväggar." },
  ],
  "haninge": [
    { question: "Hur många öar har Haninge?", answer: "Haninge är enligt Wikipedia både en skärgårdskommun och en förort. Kommunen bildades 1971 och omfattar över 860 öar." },
    { question: "Hur växte villaområdena i Haninge fram?", answer: "Flera började som egnahemsområden. Omkring 1908 började ett egnahemsbolag stycka Vendelsö gårds ägor för villor och fritidshus, och samma år började tomter för egnahem och handelsträdgårdar säljas i Tungelsta, som hade fått station på Nynäsbanan 1901." },
    { question: "Hur blev Dalarö badort?", answer: "Dalarö blev tullstation på 1630-talet. När garnisonen lades ner 1854 blev orten badort, med hotell och badhus." },
  ],
  "sollentuna": [
    { question: "Vilka kommundelar i Sollentuna har villor?", answer: "Villorna ligger i kommundelarna längs järnvägen och vid Edsviken, bland andra Häggvik, Viby, Sjöberg, Norrviken, Helenelund, Rotebro, Edsviken, Edsberg och Vaxmora. Vi tar uppdrag i alla." },
    { question: "När bildades Sollentuna kommun?", answer: "Kommunen bildades 1971 ur Sollentuna köping. Den ligger norr om Stockholm, mellan Järfälla i väster och Danderyd och Täby i öster." },
    { question: "Hur gammal är Sollentuna kyrka?", answer: "Kyrkan byggdes av gråsten i slutet av 1100-talet och har enligt Wikipedia funnits i mer än 800 år. Kryssvalven i tegel tillkom troligen under 1300-talets första hälft, och på 1400-talet höjdes tornet." },
  ],
  "varmdo": [
    { question: "Vilka delar av Värmdö tar ni uppdrag i?", answer: "Kommunen består enligt Wikipedia helt och hållet av öar och omfattar stora delar av Stockholms södra skärgård. Vi tar uppdrag bland annat i Gustavsberg och Hemmesta, på Ingarö, ute mot Stavsnäs och på Djurö. Till ett hus med bilväg, också över bro eller med vägfärja, kommer vi som på fastlandet." },
    { question: "När fick Djurö fast landförbindelse?", answer: "Djurö och Vindö nåddes länge bara med båt. En bilfärja öppnade 1938, och när Djuröbron invigdes 1962 fick öarna enligt Wikipedia fast landförbindelse." },
    { question: "Hur gammal är Värmdö kyrka?", answer: "Värmdö kyrka, på nordöstra Värmdölandet, är en stenkyrka från 1300-talet som har utvidgats flera gånger. Den kallas ibland \"Skärgårdens katedral\"." },
  ],
  "sodertalje": [
    { question: "När öppnade Södertälje kanal?", answer: "Kanalen, som förbinder Mälaren i norr med Östersjön i sydöst, öppnade 1819, och därefter kom järnvägen. Kommunen bildades 1971 av staden och flera landskommuner." },
    { question: "Vad är Mariekälla?", answer: "Mariekälla är en stadsdel i centrala Södertälje med namn efter en källa vid Mariekällgatan. Området planerades enligt Wikipedia 1880 med framför allt villor och flera badvillor, och i slutet av 1800-talet blev Södertälje känt som badort." },
    { question: "Vilka villaområden finns i Södertälje?", answer: "Bland andra Östertälje, Pershagen, Järna, Hölö, Sandviken i Enhörna och Viksberg. De har vuxit fram som villastäder vid järnvägen, stationssamhällen på landet och fritidshusområden vid vattnet. Vi tar uppdrag i hela kommunen." },
  ],
  "jarfalla": [
    { question: "Vilka villaområden finns i Järfälla?", answer: "Bland andra Barkarby och Skälby i söder, Jakobsberg, Kallhälls villastad, Stäket längst i norr och Viksjö. Vi tar uppdrag i hela kommunen." },
    { question: "Hur snabbt byggdes Viksjö?", answer: "Exploateringen inleddes 1963, och när byggandet pågick som mest intensivt stod enligt Wikipedia ett hus klart om dagen. Det färdiga Viksjö omfattade omkring 5 500 bostäder, varav 70 procent i småhus." },
    { question: "Hur gammal är Järfälla kyrka?", answer: "Kyrkan byggdes enligt Wikipedia i romansk stil under 1100-talet, och delar av långhuset och koret finns kvar. Sitt nuvarande utseende fick den i huvudsak under 1400-talet, och fönsterindelningen är från en ombyggnad 1825." },
  ],
  "tyreso": [
    { question: "Vilka kommundelar finns i Tyresö?", answer: "Tyresö delas enligt Wikipedia in i Bollmora i nordväst, Trollbäcken i väst, Tyresö strand i öst och Östra Tyresö i sydost. Kommunen bildades 1971." },
    { question: "Hur blev fritidshusen i Tyresö villor?", answer: "I början av 1900-talet började Tyresögodsets stora marker styckas upp, och sommarstugor byggdes. Från 1950-talet byggdes fritidshusen enligt Wikipedia om till åretruntboende i rask takt." },
    { question: "Hur gammal är Tyresö kyrka?", answer: "Kyrkan invigdes 1641. Den är enligt Wikipedia en salkyrka i rött murtegel, byggd 1638–1640 som gravkyrka och slottskyrka. År 1740 brann tornet och kyrktaket, och tornet har i dag ett lågt, pyramidformat tak." },
  ],
  "lidingo": [
    { question: "När blev Lidingö stad?", answer: "Lidingö blev köping 1910 och stad 1926. Ön ligger i Stockholms inre skärgård, öster om staden, med Lilla Värtan mellan ön och fastlandet." },
    { question: "Vad är Lidingö villastad?", answer: "Lidingö villastad bildades 1906, och Hersby, mitt på ön, utgör enligt Wikipedia dess kärna. Stadsplanen från 1907 har ett oregelbundet gatunät som är anpassat efter terrängen." },
    { question: "Hur gammal är Lidingö kyrka?", answer: "Lidingö kyrka, på en höjd söder om Kyrkviken i Hersby, stod enligt Wikipedia färdig 1623 och har byggts om och till flera gånger, bland annat åt väster 1756." },
  ],
  "sigtuna": [
    { question: "När bildades Sigtuna kommun?", answer: "Kommunen bildades 1971 av Sigtuna stad och Märsta landskommun, och centralort är Märsta. Den ligger vid Mälaren och gränsar bland annat till Norrtälje, Vallentuna och Upplands Väsby." },
    { question: "Vad fick Märsta att växa?", answer: "Flygplatsen. År 1960, när Arlanda just hade tagits i bruk, bodde omkring 3 000 personer i Märsta, och 1990 var de 20 000." },
    { question: "Hur gammal är Mariakyrkan i Sigtuna?", answer: "Mariakyrkan är den äldsta byggnaden i Sigtuna som fortfarande är i bruk. Bygget påbörjades enligt Wikipedia i mitten av 1230-talet, och omkring 1255 var kyrkan färdig." },
  ],
  "salem": [
    { question: "När bildades Salems kommun?", answer: "Kommunen som den ser ut i dag bildades 1983. Bebyggelsen ligger enligt Wikipedia främst i Rönninge, Salem och Söderby, och Rönninge är centralort." },
    { question: "Vad är Söderby park?", answer: "I Söderby park, i kommunens sydöstra del, står det tidigare Söderby sjukhus, som uppfördes 1907–1910 och enligt Salems kommun är ombyggt till bostäder sedan 2007. I övriga Söderby park finns främst villor." },
    { question: "Hur byggdes kommundelen Salem?", answer: "Kommundelen Salem byggdes enligt Salems kommun i huvudsak ut i slutet av 1960-talet, med flerbostadshus och en del friliggande villor." },
  ],
  "solna": [
    { question: "Var finns villorna i Solna?", answer: "Småhusen ligger samlade i några villaområden i Råsunda: Södra, Västra och Norra villaområdet och Östra villaområdet, som också kallas Vasalund. Vi tar uppdrag i alla." },
    { question: "Hur kom Södra villaområdet i Råsunda till?", answer: "Det bestod från början av villor som byggdes i samband med de olympiska sommarspelen 1912 och utökades sedan med fler egnahem och villor. Området ligger vid platsen för den gamla fotbollsstadion." },
    { question: "Hur gammal är Solna kyrka?", answer: "Solna kyrka är enligt Wikipedia en av åtta svenska medeltida rundkyrkor. Den äldsta delen, rundhuset, är från senare delen av 1180-talet, och den nuvarande tornhuven kom till efter en brand 1723." },
  ],
  "hasselby": [
    { question: "Hur kom Hässelby villastad till?", answer: "Stockholms stad köpte egendomarna 1885 och byggde en sopstation vid Mälaren, som togs i bruk 1889. De som arbetade där behövde bostäder, och år 1900 började tomter säljas, både till arbetare och till trädgårdsmästare." },
    { question: "Varför fanns det så många handelsträdgårdar i Hässelby?", answer: "Trädgårdsmästarna lockades av god tillgång på gödsel från sopstationen. Enligt Wikipedia präglade handelsträdgårdarna med sina drivbänkar och växthus stadsdelen under större delen av 1900-talet." },
    { question: "När blev Hässelby villastad en del av Stockholm?", answer: "Orten, som tidigare kallades Riddersvik, blev municipalsamhälle 1913 och egen köping 1926. Den införlivades med Stockholms stad 1949." },
  ],
  "riala": [
    { question: "Vilka socknar hör till Riala-området?", answer: "Söder och sydväst om Norrtälje ligger de tre socknarna Riala, Länna och Rö, som alla sedan 1971 hör till Norrtälje kommun. Vi tar uppdrag i alla tre." },
    { question: "Hur gammal är Riala kyrka?", answer: "Sockennamnet nämns första gången i ett medeltida brev från 1228, och kyrkans långhus dateras till slutet av 1200-talet. Riala är både tätort och kyrkby." },
    { question: "Vad är Penningby slott?", answer: "Penningby slott i Länna socken har ett gods som är känt sedan 1339. På 1400-talet byggdes en borg på platsen, vid Penningbyån och Väsbysjön. Slottet eldhärjades 1831 och är byggnadsminne sedan 1980." },
  ],
  "snattringe": [
    { question: "Var kommer namnet Snättringe ifrån?", answer: "Namnet stavades i äldre handlingar Snettingen eller Snättingen, som 1628. Enligt en teori syftade det från början på Långsjöns smala form med spetsiga ändar." },
    { question: "Varför gick tomtförsäljningen trögt i Snättringe?", answer: "Villabebyggelsen började i början av 1900-talet med en första styckningskarta på 142 tomter. Enligt Wikipedia var kommunikationerna dåliga, och marken mot Stuvsta var sank och ibland översvämmad, så att man fick lägga ut plankor för att komma fram." },
    { question: "Vad är kvarteret Assessorn?", answer: "Längs Tranvägen ligger kvarteret Assessorn, 36 radhus i rött tegel från början av 1960-talet. Enligt Huddinge kommun är kvarteret en särskilt värdefull kulturmiljö." },
  ],
  "alta": [
    { question: "Hur gammal är Älta gård?", answer: "Älta gård nämns enligt Wikipedia redan 1397, i ett köpebrev där namnet skrivs Elpta. Den äldsta bevarade byggnaden är Lovisedalstorpet från senare delen av 1700-talet, som på 1990-talet flyttades till gården." },
    { question: "Hur stora var tomterna i Älta?", answer: "En byggnadsordning från 1928 bestämde att en tomt för ett enfamiljshus skulle vara minst 1 500 kvadratmeter. År 1925 var omkring 1 000 tomter bebyggda, och en stor del av husen var sommarhus." },
    { question: "Varför byggdes det inte i Älta på 1940- och 1950-talen?", answer: "I början av 1940-talet infördes ett nybyggnadsförbud, bland annat på grund av problem med vatten och avlopp, och det gällde in på 1960-talet. Efter förbudet byggdes Stensö, 1965–1971." },
  ],
  "saltsjobaden": [
    { question: "Vilka områden hör till Saltsjöbaden?", answer: "Saltsjöbaden omfattar Neglingeön, en halvö på cirka 75 hektar mellan Baggensfjärden och Neglingeviken, och områdena väster om viken, med bland annat Igelboda, Neglinge, Tattby och Solsidan. Vi tar uppdrag i alla delarna." },
    { question: "Vad hette Saltsjöbaden tidigare?", answer: "Det gamla namnet var Rösunda, efter ett fiskartorp. Marken köptes 1889 från godset Erstavik, och från den lantliga bebyggelsen finns Neglinge gårds tre hus kvar, i dag hembygdsgård." },
    { question: "Var byggdes de första villorna i Saltsjöbaden?", answer: "Villabebyggelsen började på Neglingeön. Enligt Wikipedia visar en tomtkarta från 1892 120 avstyckade tomter, och 1896 var minst 64 av dem bebyggda med villor, främst längs Ringvägens östra del och vid Saltsjöpromenaden." },
  ],
  "lannersta": [
    { question: "Var kommer namnet Lännersta ifrån?", answer: "Namnet kommer från Lännersta gård, som är dokumenterad redan på 1430-talet. Det kommer från \"Landesta\" eller \"Landestow\", som betyder landningsställe, eftersom en av Lännerstasundets gamla hamnplatser låg här." },
    { question: "Vem byggde vägarna i Lännersta?", answer: "År 1931 bildades Lännersta Villaägareförening. Till en början var medlemskap i föreningen obligatoriskt, och fastighetsägarna anlade vägnätet på egen bekostnad. År 1937 var egendomen styckad i 925 tomter." },
    { question: "Finns det skyddsbestämmelser i Lännersta?", answer: "Ja. Större delen av Lännersta är detaljplanelagd med skyddsbestämmelser för kulturhistoriskt intressant bebyggelse, så fråga byggnadsnämnden innan du väljer material eller kulör på taket." },
  ],
  "solhem-lunda": [
    { question: "Vilka regler gällde för husen i Solhem?", answer: "Bolaget som sålde tomterna från 1904 ville ge området en enhetlig stil och tillhandahöll typritningar. Husen fick till exempel bara ha ett kök, så att ägarna inte skulle hyra ut delar av dem." },
    { question: "Hur såg de första husen i Solhem ut?", answer: "Enligt Wikipedia har de flesta av de första husen träfasader och plankstomme och spröjsade fönster, och de flesta målades faluröda med vita knutar. År 1907 fanns 160 hus och flera butiker." },
    { question: "När blev Solhem en del av Stockholm?", answer: "Solhem blev municipalsamhälle 1908 och en del av Stockholms stad 1949. Eftersom Spånga station låg i Solhem blev området något av en centralort i Spånga socken." },
  ],
  "brevik": [
    { question: "Vilka delar består området kring Brevik av?", answer: "Öster om Åkersberga, ut mot kusten, ligger Brevik, Lervik, Flaxenvik, Ekhammar, Gröndal, Tråsättra, Skärgårdsstad, Översättra och södra Margretelund. Tillsammans bildar de ett stort sammanhängande småhusområde, och vi tar uppdrag i alla delarna." },
    { question: "Hur kom Skärgårdsstad till?", answer: "Här fanns tidigare gruvhantering, och när den lades ned togs en detaljplan fram för bostäder. Skärgårdsstad bebyggdes främst under 1980- och 90-talen, och gatorna är uppkallade efter bönderna som ägde marken eller efter gruvdriften." },
    { question: "Vilka hus finns i Tråsättra?", answer: "I Tråsättra finns enligt hitta.se kedjehus och radhus från 1970- och 1980-talen." },
  ],
  "ronninge": [
    { question: "Hur blev Rönninge ett villasamhälle?", answer: "Sedan stationen vid stambanan öppnat 1888 blev marken intressant för tomtstyckning, och 1896 styckades egendomen upp i 151 större och mindre tomter. Tomterna såldes snabbt, men byggandet tog fart först efter sekelskiftet 1900." },
    { question: "Hur gammal är Rönninge gård?", answer: "Namnet nämns första gången i slutet av 1500-talet, som namn på ett torp under Uttringe. Gården blev säteri på 1600-talet, och huvudbyggnaden från 1662 står kvar." },
    { question: "Vilka områden hör till Rönninge?", answer: "Kommundelen rymmer i dag också områden som Mölleskogen, Garnudden, Skogsängen och Säbyholm. Vi tar uppdrag i alla delarna." },
  ],
  "viksjo": [
    { question: "Hur många hus skulle byggas i Viksjö?", answer: "Enligt dispositionsplanen från 1965 skulle här byggas 2 750 småhus och 900 lägenheter i flerfamiljshus för 12 000 invånare. Folkmängden ökade från 4 992 till 12 947 mellan 1970 och 1980." },
    { question: "Vilka områden byggdes först i Viksjö?", answer: "Fastebol, i den östligaste delen, var ett av de första. Där stod de första kedjehusen och radhusen klara 1967–1970, och i Andeboda byggdes samtidigt 186 radhus i 31 längor om sex hus vardera." },
    { question: "Vad är souterrängvillorna vid Avstyckningsvägen?", answer: "År 1972–73 byggdes 86 souterrängvillor i två till tre våningar vid Avstyckningsvägen, där planen lades om för att spara ekdungarna." },
  ],
  "segeltorp": [
    { question: "Vilka delområden finns i Segeltorp?", answer: "Segeltorp består från norr till söder av Jakobslund, Smista, Juringe, Kråkvik och Kolartorp. Vi tar uppdrag i alla delarna." },
    { question: "Var kommer namnet Segeltorp ifrån?", answer: "Namnet kommer från gården Segerstorp, som 1751 står som dagsverkstorp under Vårby säteri. När tomter började styckas av för villor i början av 1900-talet ändrades namnet till Segeltorp." },
    { question: "Hur gammal är bebyggelsen i Segeltorp?", answer: "Mitt i området ligger Juringe gård, där ett gravfält vittnar om bebyggelse redan under yngre järnåldern. Altartorp har rötter från 1540-talet och finns kvar, ombyggt." },
  ],
  "fullersta": [
    { question: "Hur gammal är Fullersta?", answer: "Fullersta nämns i skrift första gången 1356, då byn bestod av fyra hemman, och fynd tyder på att det har funnits en bosättning här sedan folkvandringstiden." },
    { question: "Vad var stadsplanen från 1918?", answer: "År 1918 gjordes en stadsplan för 52 hektar och 208 tomter, som enligt Wikipedia tog stor hänsyn till terrängen och den befintliga miljön. Planen genomfördes dock inte helt." },
    { question: "Finns det k-märkta villor i Fullersta?", answer: "Nära Huddinge centrum finns äldre villabebyggelse från Huddinge villastad och Hörningsnäs villastad, med några k-märkta villor i nationalromantisk stil." },
  ],
  "ella-gard": [
    { question: "Hur många hus finns i Ella gård?", answer: "Bygget började 1955, bara ett år efter att jordbruket på den gamla gården hade lagts ned, och under en period på femton år växte cirka 500 hus fram. Först byggdes den norra delen, sedan den södra." },
    { question: "Hur ser husen i Ella gård ut?", answer: "Det är prefabricerade trähus på betongplatta, ordnade i grupper längs slingrande gator. Enligt Täby kommun kännetecknas bebyggelsen av sadeltak med tegelpannor, stående träpanel och vita fönsterfoder, och de ursprungliga takkuporna är inramade av svart plåt." },
    { question: "Finns det regler för att ändra husen i Ella gård?", answer: "Ja. Täby kommun beskriver området som mycket välbevarat, och i kommunens kulturmiljöprogram finns riktlinjer för hur husen ska förändras. Fråga byggnadsnämnden innan du väljer material eller kulör på taket." },
  ],
  "kalvesta": [
    { question: "Vad är Kälvesta gravhögar?", answer: "Det är ett gravfält med omkring 145 fornlämningar: högar, runda och rektangulära stensättningar, treuddar och skeppsformiga stensättningar. Kälvesta gamla by i Spånga socken har anor från medeltiden." },
    { question: "Vad menas med att Kälvesta är ett horisontellt miljonprogramsområde?", answer: "Stadsdelen byggdes med radhus och villor i stället för höga hus. Enligt Wikipedia finns här omkring 2 000 enfamiljsbostäder: radhus, kedjehus, atriumhus och fristående villor längs Sörgårdsvägen, och flertalet bor i radhus om fyra rum och kök." },
    { question: "Var kommer namnet Kälvesta ifrån?", answer: "Namnet kommer från byn, och ändelsen -sta betyder plats. Stockholms stad köpte området 1949, när större delen av Spånga införlivades med Stockholm, och stadsdelen bildades 1953." },
  ],
  "angby": [
    { question: "Hur byggde man husen i Norra Ängby?", answer: "De flesta husen byggdes genom självbyggeri, organiserat av stadens småstugebyrå och fastighetskontoret. Den blivande husägaren betalade ingen kontantinsats, utan gjorde i stället eget byggarbete motsvarande en del av byggkostnaden." },
    { question: "Vad är Ängbystenen?", answer: "Vid Runstensvägen står Ängbystenen kvar på den plats där den restes på 1100-talet. I Björklunds hage finns ett gravfält med 68 gravar från järnåldern." },
    { question: "Äger man tomten i Norra Ängby?", answer: "Marken upplåts med tomträtt, och i dag kan husägare också köpa sin tomt." },
  ],
  "brevikshalvon": [
    { question: "Vilka områden finns på Brevikshalvön?", answer: "Brevikshalvön i östra Tyresö omfattar bland annat Raksta, Bergholm, Solberga, Dyvik och Ällmora. Vi tar uppdrag i alla delarna." },
    { question: "Vad var Finnborgs tegelbruk?", answer: "Vid Trinntorp intill Kalvfjärden låg Finnborgs tegelbruk, som ursprungligen tillhörde Tyresögodset och fanns i olika former från början av 1600-talet fram till 1913." },
    { question: "Hur tar man sig till Brevikshalvön?", answer: "Waxholmsbolagets båtlinjer går hit från bland annat Stavsnäs, Dalarö och Utö, och bussar går till Tyresö centrum, Trollbäcken och, i högtrafik, Gullmarsplan." },
  ],
  "enebyberg": [
    { question: "Hur blev Enebyberg en villastad?", answer: "År 1906 började ägaren av Enebybergs gård stycka av mark vid det som i dag är Roslagsbanan, och året därpå kom tomtförsäljningen i gång. År 1914 var bebyggelsen så omfattande att Enebyberg blev municipalsamhälle." },
    { question: "Hur många tomter hade stadsplanen från 1923?", answer: "Stadsplanen från 1923 omfattade omkring 550 tomter. Villorna byggdes först i de östra delarna längs järnvägen, och under 1940-talet var enligt Wikipedia alla tomter bebyggda." },
    { question: "Hur gammal är Enebybergs gård?", answer: "Huvudbyggnaden uppfördes på 1770-talet. Gården stod länge övergiven och var rivningshotad, men 1975 beslutade kommunen att den skulle restaureras." },
  ],
  "ingaro": [
    { question: "Hur länge har det bott folk på Ingarö?", answer: "Enligt Wikipedia har det funnits bofast befolkning på ön sedan bronsåldern, vilket hällristningar vittnar om. Ön är drygt 62 kvadratkilometer stor och skiljs från Värmdö i norr av sundet Kolström." },
    { question: "Hur många bor på Ingarö?", answer: "År 1995 bodde omkring 3 500 personer fast på ön, 1999 omkring 4 500 och 2012 över 9 000. Enligt Wikipedia beror ökningen på att allt fler fritidshus har byggts om till villor och att vägarna gör det möjligt att pendla till Stockholm." },
    { question: "Hur högt får man bygga i Ingarös omvandlingsområden?", answer: "Enligt Värmdö kommuns riktlinjer bör detaljplanerna i de prioriterade förändringsområdena, bland annat Återvall och Fågelvik-Nykvarn, tillåta endast friliggande enbostadshus, med en högsta nockhöjd på 9,0 meter för huvudbyggnaden." },
  ],
  "langbro": [
    { question: "Var kommer namnet Långbro ifrån?", answer: "Namnet kommer från den medeltida kavelbro som gjorde det möjligt att ta sig över det sanka området längs Göta landsväg. Den första skriftliga källan är från 1477." },
    { question: "Vilka hustyper byggdes i Långbro?", answer: "Enligt Wikipedia var de vanligaste hustyperna under 1940-talets utbyggnad \"Typ XIV\", ett hus i en våning på cirka 70 kvadratmeter, och \"Typ X\", ett hus i två våningar på cirka 85 kvadratmeter. Stadens småstugebyrå hade ett centrallager i Långbro." },
    { question: "Vad är Linboda?", answer: "Linboda är ett annat namn på Långbro villasamhälle, som började byggas 1903 närmare Långbro gård. Redan 1899 hade tomter börjat styckas av från gården i det som fick namnet Långbrodal." },
  ],
  "viby": [
    { question: "Vad är runristningen i Viby?", answer: "Vid nuvarande Rävgärdsvägen finns en runristning i berghällen från mitten av 1000-talet, som räknas som det äldsta kända skriftliga meddelandet från trakten." },
    { question: "Hur gammal är Viby gård?", answer: "Viby gård, ett tidigare säteri, är känt i skrift sedan 1409. Herrgården från 1820-talet står kvar och ägs i dag av Sollentuna hembygdsförening." },
    { question: "Vilka områden finns i Viby?", answer: "Bebyggelsen består enligt Wikipedia huvudsakligen av villor och radhus, fördelade på Lilla Viby, Östra Viby, Viby gård och Södra Viby. Vi tar uppdrag i alla delarna." },
  ],
  "brevik-kappala-gashaga": [
    { question: "Vad betyder namnet Brevik?", answer: "Brevik betyder \"breda viken\". Breviks gård nämns 1498 som Bredewijk, och Käppala finns med som Kiepla på den äldsta kända kartan över Lidingön, från 1661." },
    { question: "Vilka villor i Brevik är byggnadsminnen?", answer: "Tre villor i Brevik är byggnadsminnen: Villa Högudden från 1876, Villa Klippudden från 1910 och Högberga gård från 1916." },
    { question: "Vad var den vita villastaden vid segelleden?", answer: "Så kallades villastaden när marken styckades 1906–1907, med Halvkakssundet och Lilla Värtan utanför. Storhetstiden kom på 1910-talet, då villor i jugendstil byggdes." },
  ],
  "bollstanas": [
    { question: "Var kommer namnet Bollstanäs ifrån?", answer: "Historien går tillbaka till en förhistorisk by, Grimsta. År 1789 köptes den av en kamrer som lät bygga en herrgård, och från 1794 kallades gården Bollstanäs, efter ägaren." },
    { question: "Hur blev Bollstanäs en villastad?", answer: "År 1907 köptes gården av ett småbruksbolag, som styckade av tomter. I mitten av 1910-talet fanns ett fyrtiotal egnahem och handelsträdgårdar i Bollstanäs." },
    { question: "Hur många bor i Bollstanäs?", answer: "År 1950 bodde knappt 1 000 personer i Bollstanäs och Odenslunda tillsammans, och i dag har kommundelen omkring 10 000 invånare." },
  ],
  "nora-kevinge": [
    { question: "Hur gammal är Nora gård?", answer: "Nora gård, en knapp kilometer väster om Danderyds kyrka, nämns i skrift första gången 1310. Namnet kommer från ordet nor, ett smalt sund som fanns söder om gården, och i berget finns Norahällen, en runristning från 1000-talet." },
    { question: "Hur snabbt växte villasamhället i Nora?", answer: "Villasamhället tog fart 1926, när tomter började styckas av från Nora gård. År 1930 hade Nora omkring 250 villor och 1 000 invånare, och Nora torg var centrum för hela kommundelen fram till 1960-talet." },
    { question: "Vad finns kvar av Kevinge gård?", answer: "Den nuvarande huvudbyggnaden i sten uppfördes efter 1791. Gården tros ha varit befolkad sedan vikingatiden, och ovanför stranden vid Edsviken finns ett gravfält med sju stensättningar." },
  ],
  "orby": [
    { question: "Varför ser husen i Örby så olika ut?", answer: "Det fanns ingen stadsplan när tomterna såldes, och de såldes med äganderätt. Köparna kunde bygga efter eget tycke på stora tomter, och det gav enligt Wikipedia en stor variation av hustyper och storlekar, bland annat flera större villor med snickarglädje." },
    { question: "Hur stora var tomterna i Örby?", answer: "Ursprungligen styckades 1 187 tomter av, mellan 1 500 och 4 000 kvadratmeter stora. De har sedan styckats i omgångar, och i dag är de flesta villatomterna på 600–1 000 kvadratmeter." },
    { question: "Vem byggde gatorna i Örby?", answer: "Utan stadsplan dröjde gator, el och vatten. De första gångbanorna av plank och 42 gatlampor ordnade invånarna själva genom insamling på 1910-talet, och först på 1940-talet var vägar, vatten och avlopp fullt utbyggda." },
  ],
  "barkarby": [
    { question: "Var kommer namnet Skälby ifrån?", answer: "Skälby finns belagt i jordeböckerna 1535, med stavningar som Skelby och Skelleby. En teori som Järfälla kommun återger är att namnet syftar på en gräns, eftersom Skälby låg vid gränsen mot grannsocknen Spånga." },
    { question: "Hur blev Skälby ett villaområde?", answer: "År 1921 köptes Skälby gård av ett bolag som styckade 680 tomter för både villor och trädgårdsbruk. Vid början av 1930-talet ska ett hundratal villor ha byggts, främst kring Skälby station." },
    { question: "Varför heter gatorna i Skälby som de gör?", answer: "Enligt Wikipedia har gatorna namn med anknytning till rymden, som Plutovägen. Till Skälby räknas också Neptuni-, Orgona- och Aniaraområdena." },
  ],
  "skarpang": [
    { question: "Var kommer namnet Skarpäng ifrån?", answer: "Namnet kommer från ängen Skarpängen, som finns med på en karta över Ella från 1715. Där beskrivs den som en skarp och torr äng, alltså en mark med mager och torr jord." },
    { question: "Hur ser husen i Skarpäng ut?", answer: "Enligt Täby kommun präglas området helt av typhus från 1970- och 80-talen, med fasader i mexitegel och trä. Ett kännetecken är 1970-talets medvetna markutnyttjande med skafttomter." },
    { question: "Vad gäller för taken i kvarteret Knäpparen?", answer: "Husen i Knäpparen uppfördes 1978–1979. Täby kommuns råd och riktlinjer för kvarteret är att behålla bruna fönstersnickerier, ursprungliga tegelfasader och svarta tak, så det är klokt att ta hänsyn till det redan när materialet väljs." },
  ],
  "storangen": [
    { question: "Hur ordnades vägar och vatten i Storängen?", answer: "Egnahemsföreningen skrev kontrakt med bolaget bakom Saltsjöbanan, som ordnade stadsplan, vägar, vatten och avlopp och så småningom en järnvägsstation. Huvudvägarna drogs så att de strålade samman vid stationen." },
    { question: "Hur många villor finns i Storängen?", answer: "Redan 1909 var 107 av omkring 160 tomter bebyggda, och 2013 fanns drygt 150 villor i området. De flesta är arkitektritade trävillor i nationalromantisk stil." },
    { question: "Vad kom fram vid inventeringen 1979?", answer: "Vid en kulturhistorisk inventering 1979 bedömdes 18 av 156 undersökta byggnader som \"omistliga\" och 35 som \"värdefulla\", och hela området bedömdes som en omistlig kulturmiljö." },
  ],
  "vaxmora": [
    { question: "Var kommer namnet Vaxmora ifrån?", answer: "Namnet kommer enligt Wikipedia från ett torp i Törnskogen, på mark som hörde till Sollentunaholm. Torpet har hållits i stånd av de boende i området, och en förening arbetar för att återställa det till ursprungligt skick." },
    { question: "Vad är Södra Törnskogen?", answer: "Södra Törnskogen blev naturreservat 2012 och omfattar 480 hektar, med torpplatserna Vaxmora, Törntorp och Grönan." },
    { question: "Vad har byggts vid Väsjön?", answer: "Kring Väsjön, intill Väsjöbacken, har ett nytt bostadsområde vuxit fram sedan slutet av 2010-talet. Sjön har två badplatser, och vattnet rinner vidare till Mälaren, bland annat genom Norrviken och Edssjön." },
  ],
  "stocksund": [
    { question: "Hur gammal är Stockby gård?", answer: "Stockby gård har enligt Wikipedia sannolikt rötter i slutet av 1200-talet, och namnet Stockby förekommer första gången i en offentlig handling 1361. Den nuvarande gårdsbyggnaden uppfördes 1740." },
    { question: "Hur växte villasamhället i Stocksund?", answer: "Den första tomten i Stocksunds Villaparker såldes 1890. Samhället växte relativt långsamt de första åren: vid slutet av 1905 fanns 95 villor, och 1910 hade 350 villatomter sålts." },
    { question: "Är Stocksund kulturhistoriskt värdefullt?", answer: "Ja. Kommunen betraktar området kring Alpstigen, Donnerstigen, Bergstigen och Sturevägen som särskilt värdefullt från kulturhistorisk synpunkt, och det är av riksintresse. Villa Tallom på Långängen, uppförd 1904–1906, är byggnadsminne sedan 1979." },
  ],
  "skondal": [
    { question: "Hur gammalt är namnet Sköndal?", answer: "Det äldsta belägget är från 1397, då gården skrevs Siondæ, och enligt Wikipedia ändrades namnet till Sköndal på 1600-talet. Gårdarna Stora Sköndal, Skönstavik och Sköndalsbro finns kvar vid Drevvikens strand." },
    { question: "Vad var småstugeområdet i Sköndal?", answer: "Den första stadsplanen fastställdes 1947 och omfattade ett småstugeområde med omkring 160 hus för självbyggeri i västra Sköndal, mot Nynäsvägen. Stadens småstugebyrå tillhandahöll typritningar för tre varianter av stugor." },
    { question: "Vad kännetecknar Norra Sköndal?", answer: "Norra Sköndal fick sin stadsplan 1968, med radhus och kedjehus och garagelängor mellan husen. Området känns igen på gatunamnen efter hundar, som Vinthundsvägen, Terriergränd och Gråhundsvägen." },
  ],
  "herrangen": [
    { question: "Var kommer namnet Herrängen ifrån?", answer: "Namnet kommer från Herrängens gård, som uppfördes under senare delen av 1700-talet." },
    { question: "Varför växte Herrängen långsamt?", answer: "Främst på grund av dåliga förbindelser med Stockholms innerstad. År 1913 bodde här bara knappt 100 personer, och först när Stockholms stad köpte marken 1930 ordnades en bussförbindelse till Södermalm." },
    { question: "Vem byggde villorna i Herrängen?", answer: "De flesta villorna kom till på 1940- och 1950-talen. Enligt Wikipedia byggdes de av ägarna själva, genom eget arbete men med instruktioner och material från staden." },
  ],
  "frotuna": [
    { question: "Vilka byar finns i Frötuna?", answer: "Bland de större byarna i Frötuna socken finns Spraggarboda, Nodsta, Kaggeboda, Baltora, Björknäs och Björnösund. Sidan gäller landsbygden och byarna, inte stadsdelen Frötuna i Norrtälje." },
    { question: "Var kommer namnet Frötuna ifrån?", answer: "Namnet skrevs Frøtunum år 1311 och innehåller gudanamnet Fröja och ordet tuna, inhägnad. Socknen är äldre än staden: Norrtälje stad bröts ut ur Frötuna 1622." },
    { question: "Vad är Björnö?", answer: "Herrgården Björnö ligger vid den innersta delen av Norrtäljeviken, omkring tre kilometer från Norrtälje. Godset var länge stort, men efter 1833 bytte det ägare flera gånger och styckades." },
  ],
  "sticklinge": [
    { question: "Vad var Rödstugan?", answer: "I slutet av 1480-talet ordnades en roddfärja mellan Rödstuguviken och Ekudden på Djursholmssidan. Färjehållaren bodde i Rödstugan, som har gett viken dess namn, och färjan användes av bönderna, för postgången och för att hämta prästen till högmässan." },
    { question: "När blev Norra Sticklinge villaområde?", answer: "Området började som ett sommarstugeområde tidigt på 1930-talet. Först 1978 beslutade Lidingö stad att det skulle stadsplaneras, och då fick det kommunalt vatten och avlopp, ny elförsörjning, upprustade vägar och gatubelysning." },
    { question: "Hur många villor finns i Sticklinge?", answer: "År 2009 fanns omkring 600 fristående villafastigheter i området. Till Sticklinge hör också Kyttinge, med ett fyrtiotal villor, och Trolldalen, ett sportstugeområde." },
  ],
  "gribbylund": [
    { question: "Hur gammal är Gribbylund?", answer: "Från bronsåldern och järnåldern finns flera gravfält, bland annat ett med en så kallad domarring. På 1400-talet hade byn Gribby fyra gårdar, och gårdens huvudbyggnad från 1880-talet står kvar vid en allé från Gribbylundsvägen." },
    { question: "Hur blev Gribbylund ett villaområde?", answer: "Villabebyggelsen började 1919, när en egnahemsförening köpte gården och började stycka marken till sommarstugetomter. Enligt Täby kommun förblev kommundelen glest bebyggd fram till 1970-talet, då planeringen av dagens täta villakvarter tog fart." },
    { question: "Vad är kvarteret Kammaren?", answer: "Kammaren är ett välbevarat kedjehuskvarter från 1976, med tegel i bottenvåningen, branta tak med röda betongpannor, gavlar i brunmålad träpanel och tomter på cirka 300 kvadratmeter." },
  ],
  "jakobsberg": [
    { question: "Var kommer namnet Jakobsberg ifrån?", answer: "Säteriet anlades på 1650-talet på Vibble bys mark. När ägaren dog 1657, bara ett halvår efter bröllopet, gav hans änka gården namnet Jakobsberg till hans minne." },
    { question: "Vad finns i Jakobsbergs gamla huvudbyggnad?", answer: "Sedan 1919 finns Jakobsbergs folkhögskola i gårdens huvudbyggnad, och vid folkhögskolan står en runsten från 1000-talet." },
    { question: "Var ligger villorna i västra Jakobsberg?", answer: "Villaområdena ligger kring Alpvägen, Folkhögskolevägen, Mälarvägen och månadsgatorna från Aprilvägen till Decembervägen, med villor, kedjehus och radhus." },
  ],
  "alvnas": [
    { question: "Vad är kastalen i Älvnäs?", answer: "Älvnäs gårds föregångare kan dateras till 1100-talet, då det fanns en kastal här, ett försvars- eller bevakningstorn vid Långtarmen. Vid bussens ändhållplats syns fortfarande grunden, omkring 16 gånger 12 meter, med grundmurar av natursten." },
    { question: "Hur tar man sig till Älvnäs?", answer: "Den enda vägen in, förutom vattenvägen, är Älvnäsvägen över Brunna gärde. Närmaste service finns i Träkvista, omkring 1,5 kilometer bort." },
    { question: "Hur gammalt är namnet Älvnäs?", answer: "Det äldsta skriftliga belägget är från 1476, då namnet skrevs Elffwenäs i Stockholms stads tänkeböcker. På en ägoavmätning från 1737 ligger gårdens tun i stort sett på samma plats som i dag." },
  ],
  "viksberg": [
    { question: "Hur gammal är Viksbergs gård?", answer: "Viksbergs gård är ett tidigare säteri som fick sina säterirättigheter 1681. Söder om gården låg ett tegelbruk som finns i räkenskaper från 1765, och kapellet intill uppfördes 1901." },
    { question: "Hur har Viksäter förändrats?", answer: "Viksäter bebyggdes under 1960-talet som fritidshusområde. Under 1990-talet flyttade allt fler dit för gott, och 2007 kom en ny detaljplan med större byggrätter. Kommunen vill ändå att Viksäter ska behålla sin karaktär av \"hus i skog\"." },
    { question: "Hur många fastigheter finns i Viksberg och Viksäter?", answer: "När Södertälje kommuns förstudie skrevs 2016 fanns ungefär 800 bebyggda fastigheter i Viksberg, Viksäter, Talbystrand och Holmen." },
  ],
  "uttran": [
    { question: "Varför fanns det en station i Uttran?", answer: "I början av 1900-talet anlades två sanatorier vid sjön, och för dem inrättades en egen hållplats för lokaltåg. Stationen drogs in i början av 1970-talet, och två av de gamla stationsbyggnaderna i trä används enligt Wikipedia som bostäder." },
    { question: "Vad var Broängen förr?", answer: "Broängen är känt sedan medeltiden och var utmark till Skrävsta gård. Fram till 1920-talet var det huvudsakligen jordbruksbygd, och flera vägnamn minner om soldattorpen Slätten och Soltorp." },
    { question: "Hur ser landskapet i Uttran ut?", answer: "Enligt Wikipedia är Uttran främst ett villasamhälle i ett kuperat landskap med flera bäckraviner. I söder och sydväst ligger Vinterskogens naturreservat." },
  ],
  "stenhamra": [
    { question: "Vad bröts i stenbrottet i Stenhamra?", answer: "Enligt Wikipedia bröts här en stor del av Stockholms gat- och kantsten, från 1884 fram till 1919 med full styrka. Stenen fraktades på pråmar, och driften lades ner 1937." },
    { question: "Vad är riksintresset i Stenhamra?", answer: "Stenbrottet, stenhuggarnas tjänstebostäder, skolan och konsumbutiken är tillsammans klassade som riksintresse för kulturmiljövården." },
    { question: "Varför heter vägarna i Stenhamra som de gör?", answer: "Åren 1968–1970 byggdes ett villaområde på mark som tidigare var fruktodling, med 10 000 fruktträd på 1940-talet. Fruktträd finns fortfarande kvar, och många vägnamn påminner om odlingarna, som Apelvägen." },
  ],
  "glomsta": [
    { question: "Hur gammal är Glömsta gård?", answer: "Glömsta gård nämns i skrift första gången 1437. I Glömsta finns enligt Wikipedia gravfält från yngre järnåldern, och på Glömstahällen finns en runristning om en bro." },
    { question: "Varför byggdes det lite i Glömsta på 1950-talet?", answer: "Byggandet dämpades, eftersom frågan om vatten och avlopp inte var löst. Sedan kommunen på 1990-talet hade anlagt vägar och kommunalt vatten och avlopp uppfördes nya enfamiljshus i snabb takt." },
    { question: "Vad ligger norr om Glömsta?", answer: "Den norra delen är naturmark med en del av sjön Gömmaren och Gömmarens naturreservat. Diagonalt genom området går Gamla Stockholmsvägen, som har sin föregångare i Göta landsväg." },
  ],
  "kummelnas": [
    { question: "Hur gammal är Kummelnäs gård?", answer: "Gården är känd sedan 1600-talet. Huvudbyggnaden från 1698 var den sista byggnaden i Boo socken som stod kvar från tiden före rysshärjningarna 1719. Den revs 1993 och ersattes av en snarlik kopia." },
    { question: "Vad är Vita Längan?", answer: "På 1820-talet uppfördes en kemisk fabrik vid Kummelnäs, Vita Längan, vars mest spridda produkt var ättika. Tillverkningen upphörde 1851, och byggnaden används i dag som förskola." },
    { question: "Varför heter det Telegrafberget?", answer: "Här fanns en optisk telegrafstation, invigd 1795, som har gett namn åt Telegrafberget vid Halvkakssundet." },
  ],
  "hersby": [
    { question: "Var kommer namnet Hersby ifrån?", answer: "Namnet kommer från Hersby gård, ett lantbruk med anor från 1400-talet. I början av 1900-talet såldes stora delar av marken för att styckas till villatomter." },
    { question: "Vad är kvarteret Holmia?", answer: "I kvarteret Holmia, som bebyggdes efter 1906, har villorna enligt Wikipedia till stor del kvar sina ursprungliga exteriörer i nationalromantik, jugendstil och jugendbarock. Radhusen i kvarteret Tegen större och mindre uppfördes 1908–1909." },
    { question: "Vad är Islinge villasamhälle?", answer: "Islinge villasamhälle bildades 1905 av ägaren till Islinge gård. Området norr om Norra Kungsvägen fick stadsplan 1932 och delen söder om vägen 1969, och husen ligger enligt Wikipedia huvudsakligen högt, på de två kullar som omger Islingeviken." },
  ],
  "loharad": [
    { question: "Var kommer namnet Lohärad ifrån?", answer: "Namnet skrevs Lohärrädhe år 1337. Förleden lo betyder öppen plats eller glänta, och namnet syftar på det öppna området vid kyrkan." },
    { question: "Hur gammal är Lohärads kyrka?", answer: "Den första kyrkan byggdes under första delen av 1200-talet. Kyrkan ligger omkring tolv kilometer från Norrtälje, och på 1670-talet rasade tornet och krossade vapenhuset." },
    { question: "Vilka gårdar ligger vid Erken i Estuna?", answer: "Vid Erken ligger Stjärnholm, där huvudbyggnaden uppfördes i början av 1700-talet, och Norra Malma, en herrgård som 1928 donerades till Uppsala universitet. Åren 1950–1951 byggdes forskningsstationen Erkenlaboratoriet ett stycke väster om gården." },
  ],
  "trakvista": [
    { question: "Hur gammal är Ekebyhov?", answer: "Byn Ekeby nämns i skrift första gången 1356, och säteriet bildades på 1620-talet. Dagens huvudbyggnad i karolinsk stil uppfördes i slutet av 1600-talet och fullbordades i början av 1700-talet." },
    { question: "Vad är bokskogen vid Ekebyhov?", answer: "Huvudbyggnaden, parken och den så kallade Citadellet är byggnadsminne sedan 1970. Parkens bokskog är enligt Wikipedia troligen Sveriges nordligaste självförnyande bokskog." },
    { question: "Hur växte Träkvista?", answer: "Tätorten Ekerö har vuxit fram ur Tappström och Träkvista, som sedan 1975 räknas som sammanvuxna, och enligt Wikipedia växte den snabbast under första halvan av 1970-talet. Träkvista var kommunens mittpunkt fram till 1990, då Ekerö centrum invigdes." },
  ],
  "mosstorp": [
    { question: "Var kommer namnet Mosstorp ifrån?", answer: "Namnet kommer från den stora mosse som bredde ut sig söder om torpet Mosstorp och som finns med på en karta över Lidingö från 1774. Torpet låg vid Mossbergets västra sluttning." },
    { question: "Vad är Trasthagen?", answer: "År 1885 började Stockby gårds mark styckas till tomter för sommarstugor, och det gav upphov till Trasthagen vid Kottlasjöns norra strand. Till en början fanns ingen väg dit, och sommargästerna kom med båt över sjön. Vägen anlades först på 1930-talet." },
    { question: "Hur gammal är bebyggelsen i Stockby?", answer: "Stockby räknas som en av de tidigast fast bebodda platserna på Lidingö, och här har flera stora gravlämningar från yngre järnåldern hittats. Vid Stockby gård bedrevs jordbruk ända in på 1950-talet." },
  ],
  "malarhojden": [
    { question: "Varför heter det Mälarhöjden?", answer: "Samhället kallades först Fridhems villastad, efter lägenheten Fridhem. Den 1 januari 1914 fastställdes Mälarhöjden som postadress, eftersom Fridhem var ett ortnamn som fanns på flera håll i landet." },
    { question: "Hur tog man sig till Mälarhöjden förr?", answer: "Till och från innerstaden reste man med ångbåt till Fridhemsbryggan, tills en spårvägslinje öppnades 1913." },
    { question: "Vad är visningshusen vid Båtsmansklevet?", answer: "På 1930-talet flyttades enligt Wikipedia tre visningshus från Stockholmsutställningen 1930 till Båtsmansklevet och Båtsmanskroken. Samtidigt byggdes en rad hus i funkisstil vid Pettersbergsvägens västra del." },
  ],
  "stureby": [
    { question: "Varför heter det Stureby?", answer: "Området började bebyggas 1921 och kallades då Ersta Villastad. Diakonissorna på Ersta diakonissanstalt protesterade mot namnet, och 1925 valdes i stället Stureby, efter slaget vid Brännkyrka." },
    { question: "Vem byggde de första villorna i Stureby?", answer: "Längs Tussmötevägen, som anlades 1918, restes de första villorna enligt Wikipedia som självbyggen, av hantverkare för sig själva och sina familjer." },
    { question: "Är radhusen i Stureby kulturhistoriskt klassade?", answer: "Radhusen vid Vivstavarvsvägen och Husumsgränd kom till i början av 1950-talet och är enligt Wikipedia blåmärkta av Stadsmuseet i Stockholm. I sydvästra Stureby ligger ett radhusområde vid Långåkersvägen, uppfört 1964–1970." },
  ],
  "hagersten": [
    { question: "Var kommer namnet Hägersten ifrån?", answer: "Namnet går tillbaka på torpet Haegrasteen, som nämns första gången i ett brev från 1432. Området hörde till Hägerstens gård, vars nuvarande byggnad vid Hägerstensbrinken uppfördes omkring 1755." },
    { question: "När kom villorna till Hägersten?", answer: "Från 1860-talet blev det vanligt att ha sommarnöje här. Den första stadsplanen kom 1923, men enligt Wikipedia fanns det då redan en stor mängd villor i stadsdelens västra del." },
    { question: "Vad är radhusen vid Hägerstensbrinken?", answer: "De 59 radhusen från 1967–1971 ligger i tre kvarter norr och väster om Hägerstens gård, högt över småbåtshamnen. Marken är så kuperad att husen i den brantaste delen fick tre våningar mot Mälaren och en mot gatan, och Stadsmuseet har grönklassat dem." },
  ],
  "bjorknas": [
    { question: "Hur gammalt är Björknäs?", answer: "Området har sitt namn efter Stora Björknäs gård och nämns i skrift redan 1436. Eknäs gård avsöndrades från Stora Björknäs 1818." },
    { question: "Varför ser villorna i Björknäs så olika ut?", answer: "Villorna i den centrala delen byggdes enligt Wikipedia utan byggnadsplan, vilket tidigt gav en varierad bebyggelse. Flera av de nya Björknäsborna var hantverkare eller småföretagare som både ritade och byggde sina hus själva." },
    { question: "Vad har hänt i Lilla Björknäs?", answer: "Lilla Björknäs, norrut längs sundet, bebyggdes under slutet av 1800-talet med sommarvillor och blev senare ett sportstugeområde på brant kuperade tomter. Efter en ny detaljplan 2002 har det enligt Wikipedia fått nybyggda hus i nyfunkisstil." },
  ],
  "tallkrogen": [
    { question: "Var kommer namnet Tallkrogen ifrån?", answer: "Namnet kommer från en krog vid den gamla landsvägen mot Dalarö, som nämns redan 1668." },
    { question: "Vad är Olympiaområdet?", answer: "Gatorna lades enligt Wikipedia ut som löparbanor runt en idrottsarena. Den delen kallas Olympiaområdet, byggdes 1933–1934 och har gatunamn som Maratonvägen, Kulstötarvägen och Diskusvägen." },
    { question: "Hur stora är stugorna i Tallkrogen?", answer: "De flesta stugorna i Olympiaområdet hade bara två rum, och det finns ungefär tio hustyper. Tomterna uppläts med tomträtt." },
  ],
  "svalnas-osby": [
    { question: "Hur gammal är Svalnäs gård?", answer: "Svalnäs, längst i norr, är en gammal gård som nämns första gången i ett pergamentbrev från 1312. Resten av Svalnäs införlivades i Djursholm 1934." },
    { question: "Vad var Djursholms Ösby?", answer: "Vid stationen Djursholms Ösby, som öppnade 1890, anslöt Djursholmsbanan till Roslagsbanan, och det gav villastaden en fast förbindelse med Stockholm. Mellan 1912 och 1934 var Svalnäs slutstation på Djursholmsbanan." },
    { question: "Vilka stilar har villorna i Svalnäs?", answer: "Enligt Wikipedia byggdes Svalnäs snabbt ut under 1900-talets första decennium, och villornas förhärskande stilar är nationalromantik och jugend. Norr om Ösbysjön präglas bebyggelsen i stället av 1920-talets klassicism." },
  ],
  "bromsten": [
    { question: "Var kommer namnet Bromsten ifrån?", answer: "Enligt Wikipedia syftar \"Brom\" troligen på Bällstaåns vatten som brummade när det forsade om våren, medan \"sten\" pekar på en samling stenblock, sannolikt den fornborg som finns i stadsdelen." },
    { question: "När blev Bromsten villasamhälle?", answer: "Villasamhället började växa fram 1899, när Bromstens gårds ägor styckades i villatomter. Den 10 juni 1904 blev Bromsten ett municipalsamhälle inom Spånga landskommun, och den 1 januari 1949 blev det en del av Stockholms stad." },
    { question: "Vad finns kvar av gamla Bromsten?", answer: "Bromstensskolan grundades 1905, och skolhuset från den tiden används fortfarande. Fristad från 1902 har varit både ålderdomshem och kommunalkontor och rymmer i dag en skola." },
  ],
  "jarna": [
    { question: "Hur blev Järna en villastad?", answer: "Järnvägen till Stockholm kom 1861, och kring stationen växte ett samhälle fram. Marken mellan stationen och kyrkan planlades för Järna villastad, och där anlades enligt Södertälje kommun stora villor på luftiga tomter fram till 1920-talet." },
    { question: "Vilka gamla hus står kvar i Järna?", answer: "Affärshuset Birka från 1903 och konsumbutiken Kullen från 1917 står kvar. Längs Södra Järnvägsgatan och Tavestavägen finns småhus av egnahemskaraktär från 1930- och 1940-talen, med panelade fasader." },
    { question: "Vad är Eneområdet?", answer: "Eneområdet nedanför åsen bebyggdes med typhusvillor under sent 1960-tal och tidigt 1970-tal." },
  ],
  "langsjo": [
    { question: "Var kommer namnet Långsjö ifrån?", answer: "Stadsdelen har fått sitt namn efter Långsjö gård vid Långsjön, sjön som avgränsar stadsdelen åt sydost och bildar kommungräns mot Huddinge. Gården har två identiska huvudbyggnader från 1882." },
    { question: "Hur tog man sig till Långsjö förr?", answer: "Till en början var järnvägen från Älvsjö station den enda förbindelsen in till Stockholm. År 1922 kom en busslinje mellan Midsommarkransen och Långsjö, som 1930 togs över av Stockholms Spårvägar och blev linje 64." },
    { question: "Vad är Långsjöhöjden?", answer: "Långsjöhöjden tillkom under senare delen av 1960-talet på mark som dittills inte var planlagd. År 1966 byggdes 63 kedjehus, enligt Wikipedia modernistiska hus med fasader i rött tegel, på båda sidor om en gata som bildar en slinga." },
  ],
  "bo-rudboda": [
    { question: "Vad är Canadahusen?", answer: "I kvarteret Canada i Bo står enligt Wikipedia Sveriges äldsta radhusområde, Canadahusen, som byggdes 1907–1908 efter engelsk förebild." },
    { question: "Hur gammal är bebyggelsen i Bo?", answer: "Platsen var bebodd redan under forntiden. Vid Askrikevägen finns ett gravfält med omkring 55 fornlämningar, och där upptäcktes 1984 en runristning från vikingatiden." },
    { question: "Vad är Östra Rudboda?", answer: "I mitten av 1970-talet byggdes Östra Rudboda radhusområde, med drygt 450 radhus som ritades efter en arkitekttävling. Husen är grupperade kring små gårdstun, som Apeltunet, Hasseltunet, Grantunet och Lärktunet." },
  ],
  "alsten": [
    { question: "Hur gammal är Ålstens gård?", answer: "Ålstens gård var en kungsgård som uppfördes på 1500-talet. Namnet är enligt Wikipedia först belagt som Asunda, 1339, och först 1568 blev namnet Ålsten allmänt använt." },
    { question: "Vem byggde villorna i Ålsten?", answer: "De flesta villorna uppfördes av byggmästare och ritades av arkitekter som var knutna till Fastighetskontorets egnahemsbyrå. Flertalet byggdes mot slutet av 1920-talet, och omkring 1934 var de sista färdiga." },
    { question: "Vilka radhus finns i Ålsten?", answer: "Längs Ålstensgatan ligger radhus som byggdes 1932–1933. Enligt Wikipedia såldes de som bostadsrätter, och Stadsmuseet i Stockholm har blåmärkt dem." },
  ],
  "grodinge": [
    { question: "Vad är Svalsta?", answer: "Svalsta är socknens tidigaste centrum, med den medeltida Grödinge kyrka och en välbevarad prästgård från 1700-talet." },
    { question: "Vad finns kvar av kvarnarna vid Norrgaån?", answer: "Vid Norrgaån fanns vattenkvarnar åtminstone sedan 1500-talet. Kvarnhuset som står kvar byggdes 1847 som mjölkvarn och var i drift till 1980-talet." },
    { question: "Hur stora är tomterna i Kagghamra?", answer: "Tomterna är mellan 2 000 och 3 000 kvadratmeter, och området har kommunalt vatten och avlopp. Omkring 250 personer bor här året om." },
  ],
  "bromma-kyrka": [
    { question: "När bildades stadsdelen Bromma Kyrka?", answer: "Stadsdelen bildades 1932, och 1940 bröts den norra delen ut till en egen stadsdel, Eneby." },
    { question: "Hur stora är tomterna i Bromma Kyrka?", answer: "Enligt Wikipedia låg tomterna från början på mellan 4 000 och 7 000 kvadratmeter. Efter hand har de delats, så att tomterna nu är mellan 300 och 3 500 kvadratmeter." },
    { question: "Varför har gatorna kyrkliga namn?", answer: "En stor del av Bromma kyrkojord såldes 1918 för att bebyggas, och flera gatunamn syftar på kyrkliga företeelser, som Prebendet, Annexet och Vapenhuset. Fjorton vägar fick sina namn redan 1924." },
  ],
  "djuro": [
    { question: "Vad betyder namnet Djurö?", answer: "Namnet Djurö betyder hjortön. Djurö by är belagd från 1538." },
    { question: "Vad var Djurhamn?", answer: "På Djurös södra sida fanns redan under forntiden en lagunhamn, Djurhamn, som omnämns i skrift på 1450-talet. Den användes av både danska och svenska örlogsflottor fram till omkring 1700." },
    { question: "Hur gammal är Djurö kyrka?", answer: "På grund av hamnen och det långa avståndet till Värmdö kyrka bildades 1683 en egen församling, och samma år fick Djurö sin kyrka." },
  ],
  "ursvik": [
    { question: "Vilka stadsdelar hör till Ursvik?", answer: "Ursvik består av Lilla Ursvik, som är den äldre delen, och Stora Ursvik, som började bebyggas 2006 på mark som länge användes av försvaret. Vi tar uppdrag i båda." },
    { question: "Hur ser villasamhället i Lilla Ursvik ut?", answer: "Enligt stadens antikvariska kunskapsunderlag är gatunätet organiskt format i kuperad terräng, och bebyggelsen är blandad och främst från 1900-talets första hälft, med 1940-talets kataloghus som dominerande." },
    { question: "När kom Lilla Ursvik till Sundbyberg?", answer: "En byggnadsplan antogs 1938, och 1949 kom området till Sundbyberg, när Spånga landskommun upplöstes." },
  ],
  "staket": [
    { question: "Hur gammalt är Stäket som samhälle?", answer: "I början av 1600-talet slog sig hantverkare som skomakare, smeder och skräddare ner här, och 1628 fanns som mest omkring 30 hushåll vid det som kallades Stäketfläcken." },
    { question: "Varför stannade utbyggnaden av i Stäket?", answer: "Ett trettiotal villor och sommarstugor kom till under 1900-talets första årtionden, men sedan stannade utbyggnaden av. Wikipedia pekar på avståndet till centrala Stockholm, de glesa tågförbindelserna och konkurrensen från mer etablerade samhällen." },
    { question: "Vilka villor i Stäket är äldst?", answer: "De första villorna byggdes 1904 på branten öster om järnvägsstationen. Villa Pardala uppfördes 1906 och Villa Ekeliden 1907." },
  ],
  "kungsberga": [
    { question: "Hur gammal är Färentuna kyrka?", answer: "Färentuna kyrka uppfördes under slutet av 1100-talet på Kungsberga kungsgårds mark. Ett par kilometer nordväst om kyrkan finns ruinen efter en borg som anlades omkring 1276–1290." },
    { question: "Var kommer namnet Färentuna ifrån?", answer: "Socknen omtalas första gången 1298, och namnet syftar enligt Wikipedia på de farleder till det inre av Mälaren som gick mellan öarna här." },
    { question: "Vad är Hillersjöhällen?", answer: "I Hilleshögs socken har fem runristningar påträffats, bland dem Hillersjöhällen, som är känd för sin långa text. Hilleshögs kyrka har delar från 1100-talets senare hälft." },
  ],
  "svartsjo": [
    { question: "Hur stor är Färingsö?", answer: "Med sina 82 kvadratkilometer är Färingsö, eller Svartsjölandet, enligt Wikipedia Sveriges näst största insjö-ö. Den största tätorten på ön är Stenhamra." },
    { question: "Hur gammalt är Svartsjö slott?", answer: "Ett renässansslott med en rund inre borggård stod färdigt 1580 och förstördes av eld 1687, och ruinen finns kvar. Det nuvarande slottets mittparti uppfördes 1734–1739 som kungligt jaktslott." },
    { question: "Varför heter det Färjstaden?", answer: "Färjstaden, på öns östra sida, har fått sitt namn av att det en gång gick en färja härifrån till andra sidan Mälaren." },
  ],
  "molna": [
    { question: "Var kommer namnet Mölna ifrån?", answer: "Namnet kommer av \"mölla\", som betyder kvarn. Mölna gård har långa traditioner av både vattenkvarn och väderkvarn, som går tillbaka till 1500-talet, och vid gården finns kvarndammen och stenkantade vattenrännor kvar." },
    { question: "Vad är Östra Mölna radhusområde?", answer: "I början av 1960-talet bebyggdes skogsområdet i östra delen av gårdens ägor med 52 radhus och sex villor. Genom Lidingö stads kulturinventering 1995 har området fått officiell status som kulturhistoriskt omistlig miljö." },
    { question: "Hur gammal är Mölna gård?", answer: "Gårdens nuvarande huvudbyggnad är från 1814 och paviljongen från 1876. Mölnaängen, mellan gården och radhusområdet, förblev obebyggd." },
  ],
  "vasterhaninge": [
    { question: "Hur gammalt är namnet Västerhaninge?", answer: "Det första kända belägget är från omkring 1314, då namnet skrevs Westrahanunge. Även Ribby, Nedersta och Fors är enligt Wikipedia skriftligt kända sedan 1300-talet." },
    { question: "När kom järnvägen till Västerhaninge?", answer: "Nynäsbanan invigdes den 28 december 1901, och vid kyrkan fanns då stationshus, gästgiveri, handelsbod och apotek. Pendeltågen kom i gång 1973." },
    { question: "Vilka nya bostadsområden finns i Västerhaninge?", answer: "Under senare år har nya bostadsområden tillkommit, som Ribby ängar, Skarplöt och Nedersta. Det första vägnätet för villabebyggelsen sydväst om kyrkan tillkom 1933–34." },
  ],
  "pershagen": [
    { question: "Var kommer namnet Pershagen ifrån?", answer: "Den norra delen av Bränninge gårds ägor kallades Pers hagen. Bränninge är ett gods med rötter i 1300-talet, där ett bruk anlades vid mitten av 1600-talet." },
    { question: "Vilka bodde i Pershagen förr?", answer: "Enligt Södertälje kommun var det framför allt arbetare vid järnvägen och ortens verkstäder som bodde här. Tomterna gick trögt att sälja, och omkring 1910 bodde bara 40 personer i Pershagen." },
    { question: "Hur gammalt är Pershagens kapell?", answer: "Kapellet kom till efter att en av ägarna hade donerat en tomt 1931, och det invigdes 1936." },
  ],
  "midgard-byle": [
    { question: "Vad var Hemberga brunn?", answer: "I Byle upptäcktes på 1920-talet en källa med mineralhaltigt vatten, och Hemberga brunn med pensionat blev ett utflyktsmål för storstadsbor som ville bada. Brunnen utvecklades sedan till en mineralvattenkälla med samma namn." },
    { question: "Hur ser radhusen i Midgård ut?", answer: "Midgård är ett radhusområde med 231 bostäder i 32 längor, byggt 1972–1973. Enligt Täby kommun är det tvåvåningshus med flacka pulpettak med takband, stående panel och fönster utan foder och spröjs." },
    { question: "Vad finns kvar från Byle villastad?", answer: "Enligt Täby kommun finns många av egnahemshusen från början av 1900-talet kvar, särskilt vid de gamla stationslägena. Torpet Runborg från omkring 1800 är skyddat i detaljplan." },
  ],
  "glado-kvarn": [
    { question: "Hur gammalt är namnet Gladö kvarn?", answer: "En vattenkvarn som hette Gladö Kvarn nämns redan 1331 i en förteckning över Strängnäs domkyrkas tillgångar. Mjölkvarnen, som kom senare, revs på 1940-talet, och fundamentet sitter kvar i bäckfåran." },
    { question: "Hur många hus i Gladö kvarn är permanentbostäder?", answer: "År 2015 fanns 442 fastigheter: 269 var permanent bebodda, 158 var fritidshus och 15 stod obebodda. Enligt Huddinge kommun har omvandlingen hittills gett omkring 100 nya bostäder." },
    { question: "Vad är Lissma?", answer: "Lissma är en by och gård i kommunens sydöstra del, och bynamnet är känt sedan 1462. År 1916 styckades egendomen till småbruk, och norr om byn ligger Kvarntorp, ett småhusområde för permanent- och fritidsboende." },
  ],
  "dalaro": [
    { question: "Hur gammalt är tullhuset på Dalarö?", answer: "Ett första tullhus inrättades 1636. Det tullhus som står kvar byggdes 1788 och är byggnadsminne sedan 1935." },
    { question: "Vad är Societetshuset på Dalarö?", answer: "Societetshuset är uppfört i timmer i två våningar och fick enligt Wikipedia troligen sitt nuvarande utseende på 1860-talet, med en fasad i schweizerstil. Tullvaktstugan vid vattnet är från 1861 och ritad i samma stil." },
    { question: "Vad är Schweizerdalen?", answer: "Schweizerdalen, väster om Dalarö, exploaterades enligt Wikipedia i början av 1950-talet för havsbad och fritidsbebyggelse. Av de 328 fastigheterna där bebos i dag drygt hälften permanent." },
  ],
  "roslags-nasby": [
    { question: "Varför är Roslags-Näsby en knutpunkt?", answer: "Roslagsbanan drogs fram hit på 1880-talet, och här passerade också Stockholmsvägen, landsvägen mellan Stockholm, Vaxholm och Norrtälje. Villaområdet växte fram vid stationen, på mark som då hörde till Näsby slott." },
    { question: "Hur gammal är Ytterbyskolan?", answer: "Ytterbyskolans första byggnad uppfördes 1906, och de nuvarande skolbyggnaderna är från 1926 och 1944." },
    { question: "Vad finns kvar av det gamla kommuncentrumet?", answer: "När Täby blev köping 1948 blev Roslags-Näsby kommuncentrum. Det gamla kommunhuset från 1950, en tegelbyggnad med valmat sadeltak, finns kvar och är i dag ombyggt till bostäder." },
  ],
  "vendelso": [
    { question: "Hur gammal är Vendelsö gård?", answer: "Namnet är belagt 1460, och 1467 sålde Tyska orden egendomen. Vendelsö blev säteri före 1610." },
    { question: "Vad finns kvar av Vendelsö gård?", answer: "Huvudbyggnaden revs 1984, och 1998 uppfördes ett bostadsområde på platsen, med namn efter gården. Den södra flygeln finns kvar som bygdegård." },
    { question: "Vad är Norrbystenen?", answer: "På Norrby gärde, söder om Drevviken, står Norrbystenen, en runsten från 1000-talet. Ett planprogram för Norrby antogs 2010." },
  ],
  "taby-kyrkby": [
    { question: "Var kommer namnet Täby ifrån?", answer: "Namnet kommer från tä, som betyder bro eller belagd väg men också fägata." },
    { question: "Vad är fornstigen i Täby kyrkby?", answer: "Söder om prästgården slingrar sig en fornstig förbi husterrasser, gravar, stenmurar och gamla fägator från den tid då järnålderns bönder brukade marken. Täby kyrka är från mitten av 1200-talet." },
    { question: "Varför heter det Täby kyrkby?", answer: "Utbyggnaden började i början av 1900-talet under namnet Täby villastad. Namnet Täby kyrkby lanserades av kommunen på 1960-talet, för att skilja den gamla byn från resten av köpingen." },
  ],
  "tegelhagen-silverdal": [
    { question: "Var kommer namnet Tegelhagen ifrån?", answer: "Torpet Tegelhagen är känt sedan 1666, då det kallades Tegelslagaren efter en tegelslagare som bodde där och troligen arbetade vid Ulriksdals tegelbruk." },
    { question: "Hur byggdes Silverdal?", answer: "Silverdal byggdes som en trädgårdsstad med omkring 1 000 bostäder, skolor och arbetsplatser, i etapper från 2002, och 2023 ansågs den ursprungliga planen vara genomförd. Det blev möjligt sedan Sollentuna kommun hade köpt Rådan 1989." },
    { question: "Hur ser bostadsområdet Tegelhagen ut?", answer: "Bostadsområdet byggdes på 1970-talet, med kedjehus, parvillor och radhus i två våningar. Enligt Wikipedia domineras det av stora bilfria områden med kedjehus." },
  ],
  "nockebyhov": [
    { question: "Hur byggdes småstugorna i Olovslund?", answer: "Olovslund kom till under andra hälften av 1920-talet, huvudsakligen genom självbyggeri på initiativ av stadens småstugebyrå. Byggarnas insats var det egna arbetet, som skulle motsvara 10 procent av byggkostnaden." },
    { question: "Är Olovslund riksintresse?", answer: "Ja, år 1986 blev Olovslund riksintresse för kulturminnesvården." },
    { question: "Vad är Mälarblick?", answer: "Mälarblick är ett rad- och kedjehusområde i Nockebyhov med 36 radhus och 14 kedjehus, uppfört 1961–1968. Det är, liksom radhusområdet vid Rastvägen, blåmärkt av Stadsmuseet." },
  ],
  "erikslund": [
    { question: "Hur många bostäder finns i Erikslund?", answer: "Ett skogbeklätt och glest bebyggt torplandskap omvandlades på kort tid till en tät låghusstad med över 300 bostäder. Området byggdes 1972–1973." },
    { question: "Varför är gatorna i Erikslund bilfria?", answer: "Planeringen följde tidens ideal om grannskapsenheter. Husen ligger utmed bilfria gaturum och runt gårdar, medan infarter, parkering och garage är samlade i områdets ytterkanter." },
    { question: "Vad är Täby kommuns råd för husen i Erikslund?", answer: "Kommunens råd är att värna grupphusområdets tidstypiska uttryck och karaktärsdrag, och att behålla kvarterens enhetliga färgsättning och ursprungliga fönsterformat. Husen har enkla, raka former utan takfot, med bara en bockad plåt i övergången mellan tak och vägg." },
  ],
  "enhorna-sandviken": [
    { question: "Hur växte Sandviken fram?", answer: "Enligt Södertälje kommun är dagens Sandviken uppbyggt kring ångbåtsbryggan, som kom till under 1870-talet. I samband med den började stora villor byggas, i första hand som sommarnöjen." },
    { question: "Vad är sportstugorna i norra Sandviken?", answer: "Kring 1930-talet och årtiondena därefter kom småskaliga sportstugor i funktionalistisk stil. Kommunen kopplar dem till tidens syn på friluftsliv och till semesterlagstiftningen i slutet av 1930-talet." },
    { question: "När blev Sandviken tätort?", answer: "Sandviken hade 204 invånare 1995 men räknades ändå inte som tätort, eftersom andelen fritidshus var för hög. Sedan år 2000 är den tätort." },
  ],
  "nockeby": [
    { question: "Var kommer namnet Nockeby ifrån?", answer: "Namnet nämns första gången år 1400, som Nokkaby. Ur den byn växte säteriet Åkeshov fram under 1600-talet, och 1932 fick stadsdelen sitt namn efter byn." },
    { question: "Varför heter gatorna i Nockeby som de gör?", answer: "De flesta fick sina namn 1929 och 1930, dels efter orter i Dalarna, som Leksandsvägen och Orsavägen, dels efter nordiska hjältesagor, som Sigurdsvägen och Brynhildsvägen." },
    { question: "Vad sa planbeskrivningen från 1930?", answer: "Husen skulle vara fristående eller sammanbyggda två och två i tomtgränsen, och hus som kopplas ihop på det sättet skulle ges ett enhetligt utseende." },
  ],
  "vallabrink": [
    { question: "Hur gammal är Täbyvägen genom Vallabrink?", answer: "Täbyvägen följer den ursprungliga vägen norrut mot Täby kyrka. Enligt Täby kommun var vägen, tillsammans med den gamla Hagbyvägen, länge en anhalt med en vägkrog, omtalad en bit in på 1700-talet." },
    { question: "Vad är skillnaden mellan Östra och Västra Vallabrink?", answer: "Östra Vallabrink, mot Ella park, byggdes först. Där planlades i början av 1960-talet ett fyrtiotal kedjehus och minst lika många villor. Västra Vallabrink kom senare och präglas enligt kommunen främst av 1970-talets typhus." },
    { question: "Hur ser villorna i Vallabrink ut?", answer: "Kommunen beskriver typvillor från framför allt 1960- och 70-talen, från 1960-talets putsade tegelhus till 1970-talets villor i en och en halv plan, med sadeltak och djupa takutsprång." },
  ],
  "kungsangen": [
    { question: "Varför heter det Kungsängen?", answer: "Namnet kom med järnvägen 1876, när bolaget kallade stationen Kungsängen. Den nuvarande idrottsplatsen hade enligt Wikipedia varit en kungsäng sedan slutet av 1500-talet. Socknen och kyrkan har hetat Näs sedan medeltiden." },
    { question: "Hur gammal är Kungsängens kyrka?", answer: "Kyrkan har delar från 1200-talet. Enligt Wikipedia har den vitputsade väggar med en stomme av gråsten, gavlar av tegel och spånklädda sadeltak." },
    { question: "Vilka villor är typiska för Kungsängen?", answer: "Wikipedia nämner Rankhusvägen som ett välbevarat exempel på 1950- och 1960-talens enplansvillor och Ekhammarsvägen som ett exempel på kedjehus. Kring Prästhagsvägen ligger flera villor från 1910-talet." },
  ],
  "duvbo": [
    { question: "Hur grundades Duvbo?", answer: "Ett bolag köpte Dufvebols gård, styckade marken i tomter på cirka 1 000–1 200 kvadratmeter och började sälja dem sommaren 1899. Den 3 juli 1903 blev Duvbo ett eget municipalsamhälle." },
    { question: "Varför är gatorna i Duvbo smala?", answer: "Enligt Wikipedia byggdes Duvbo före privatbilismens genombrott. Många gator är smala och slingrande, och både gatunätet och villornas placering på tomterna följer terrängen." },
    { question: "Är Duvbo riksintresse?", answer: "Ja. Riksantikvarieämbetet utsåg 1987 Duvbo till ett bostadsområde av riksintresse." },
  ],
  "ensta": [
    { question: "Vad var Ensta krog?", answer: "Ensta krog har sitt ursprung på 1600-talet och var det första gästgiveriet för den som reste från Stockholm mot Roslagen längs Roslagsvägen. Från 1780-talet fram till 1844 var Ensta också tingsplats för Danderyds skeppslag." },
    { question: "Vad är banvaktarstugan i Ensta?", answer: "Drygt 500 meter söder om stationen står en av de få kvarvarande banvaktarstugorna, från 1885, där banvaktaren sänkte grindarna vid landsvägen när tåget skulle passera." },
    { question: "Vad gäller för villorna vid Hjortvägen?", answer: "Täby kommun lyfter fram villor från 1950- och 60-talen vid östra Hjortvägen med en hög andel ursprungliga material och detaljer. Kommunens råd är bland annat att behålla ursprungliga entrépartier, tegelfasader och nätta takutsprång." },
  ],
  "karlslund": [
    { question: "Hur ser husen i Karlslund ut?", answer: "Enligt Täby kommun uppfördes parhus och kedjehus i ett och ett halvt plan här åren 1975–76. De svarta sadeltaken är uppbrutna av takkupor och balkonger, och fasaderna i träpanel är målade gula eller röda." },
    { question: "Vad är Miklagård?", answer: "Miklagård är ett radhusområde i närheten från 1975–76, med spetsiga sadeltak av röda betongpannor." },
    { question: "Hur växte Täby kyrkby kring Karlslund?", answer: "När Roslagsbanan öppnade 1885 ökade byggandet, och med avstyckningsplanen från 1907 bebyggdes odlingsmarkerna kring gårdarna Täby och Byle med en ny villastad. År 1925 bodde 1 250 personer i kyrkbyn." },
  ],
  "nasbypark": [
    { question: "Hur gammalt är Näsby slott?", answer: "Slottet är, med park och alléer, byggnadsminne. Det brann 1897 och byggdes upp igen efter att det hade köpts av en ny ägare 1902." },
    { question: "Hur blev Näsbypark ett villaområde?", answer: "År 1907 började tomter styckas av. Det strandnära området Näsby slottspark planlades först, och enligt Täby kommun var över 200 tomter bebyggda redan 1933. En stadsplan från 1953 gjorde Näsbypark till en modern stadsdel med eget centrum, som invigdes 1961." },
    { question: "Vad är de engelska radhusen i Näsbypark?", answer: "De \"engelska radhusen\" är enligt Täby kommun egentligen kedjehus i rött tegel från 1955. I Norskogen finns 197 bostäder i villor, parhus och radhus från 1957–59, med flacka tak och fasader av finprofilerad aluminiumplåt." },
  ],
  "tungelsta": [
    { question: "Vilka områden hör till Tungelsta?", answer: "Hit räknas områden som Krigslida, Hammarängen och Lillgården. Nynäsbanan har två stationer här: Tungelsta från 1901 och Krigslida från 1980." },
    { question: "Varför fanns det så många växthus i Tungelsta?", answer: "Rocklösaån gav vatten och järnvägen snabba transporter till Stockholm. I början av 1940-talet fanns enligt Haninge kommun över 100 trädgårdsanläggningar, och växthusen och deras skorstenar präglade orten under en stor del av 1900-talet." },
    { question: "Hur byggdes Krigslida?", answer: "Under 1940-talet gjordes tre byggnadsplaner för den östra delen, kring Krigslida, på mark som inte hade varit bebyggd. Tomterna var avsedda för trädgårdsbruk och egna hem, och bostäderna blev nästan bara småhus." },
  ],
  "vallatorp-visinge": [
    { question: "Hur planerades Vallatorp?", answer: "Vallatorp byggdes i slutet av 1970-talet och planerades enligt Täby kommun som grannskapsenheter med en liten centrummiljö, bostadskvarter, återvändsgator och bilfria gårdar. Kommunens råd är att behålla kvarterens enhetliga färgsättning och ursprungliga fönsterformat." },
    { question: "Vad är Lövbrunna?", answer: "Lövbrunna var tidigare en gårdsmiljö, där en gles villabebyggelse växte fram under 2000-talets första decennium. Den gamla gården revs 2005, men den trädkantade infarten finns kvar som gång- och cykelväg." },
    { question: "Hur blev Visinge ett villaområde?", answer: "Visinge var till en början ett sommarstugeområde som med tiden har förtätats. När området fick en station på Roslagsbanan på 1980-talet började grupphusområden byggas, med småskaliga trähus i samstämmig färgskala." },
  ],
  "resaro": [
    { question: "Vad är Ytterby gruva?", answer: "På Resarö ligger Ytterby gruva. Ur gruvans mineral har enligt Wikipedia nio grundämnen isolerats och identifierats, och fyra av dem har namn efter platsen: yttrium, ytterbium, terbium och erbium. Brytningen av fältspat upphörde 1933." },
    { question: "Hur gammalt är namnet Resarö?", answer: "Namnet är belagt sedan 1303, då en källa på latin nämner \"in risarnum\", på Resarö." },
    { question: "Vad finns kvar av Ytterbystrand?", answer: "I villaområdet byggdes tennisbanor, ett badhus med hopptorn, ett societetshus och en kinesisk paviljong. Av dem finns bara paviljongen kvar, och den används som biograf." },
  ],
  "enskededalen": [
    { question: "Hur skiljer sig Enskededalen från Gamla Enskede?", answer: "Enligt Wikipedia lämnade man här de engelska och tyska förebilderna från Enskede trädgårdsstad och utgick i stället från den svenska trästaden, med husen lagda i gatulinjen." },
    { question: "Vad var Hem genom eget arbete?", answer: "En grupp arbetare och hantverkare föreslog 1919 att eget arbete skulle få ersätta kontantinsatsen. År 1920 bildade de föreningen Hem genom eget arbete, och fram till 1922 uppförde de 29 byggnader." },
    { question: "Vad är Kärringstan?", answer: "Kärringstan är ett inofficiellt namn på ett område mot Kärrtorp med fristående villor, som enligt Wikipedia huvudsakligen byggdes på 1920- och 1930-talen. Gatorna har namn efter kända kvinnor, och stadsplanen från 1924 angav att husen fick byggas i trä, i en våning med vind." },
  ],
  "smedslatten": [
    { question: "Hur planerades Smedslätten?", answer: "Stadsplanen från 1922 ville enligt Wikipedia efterlikna en småstadsgata: husen ställdes längs gatulinjen, så att trädgårdarna på baksidan tillsammans bildade en grön mitt i varje kvarter." },
    { question: "Finns det typhus kvar i Smedslätten?", answer: "Ja. En arkitekt vid stadsbyggnadskontoret ritade 20 typhus för Smedslätten 1922–1924, och enligt Wikipedia står några av dem kvar i ursprunglig utformning. Ett trettiotal av de tidiga villorna uppfördes av monteringsfärdiga byggelement." },
    { question: "Vilka radhus finns i Smedslätten?", answer: "Åren 1962–1964 uppfördes 83 radhus kring Smedslättens gård, vid Skogsfrugränd och Flädermorsbacken. Vid Bergviksvägen blev 33 fastigheter av kedje- och radhustyp färdiga 1962." },
  ],
  "sodra-angby": [
    { question: "Varför kallas Södra Ängby Den vita staden?", answer: "De flesta husen har enligt Wikipedia trästomme och fasad av vitmålad kalkputs, och den ljusa färgsättningen gav området namnet Den vita staden." },
    { question: "Vem byggde villorna i Södra Ängby?", answer: "Till skillnad från självbyggarna i Norra Ängby uppfördes villorna här av enskilda byggmästare, som sålde dem nyckelfärdiga. Den första detaljplanen kom 1933 och gällde 525 tomter." },
    { question: "Är husen i Södra Ängby skyddade?", answer: "Bebyggelsen är sedan 1987 riksintresse för kulturmiljövården, och en detaljplan som vann laga kraft 1995 skyddar enligt Wikipedia fasader och byggnadsdetaljer." },
  ],
  "stavsnas": [
    { question: "Vilka delar består Stavsnäs av?", answer: "Stavsnäs består enligt Wikipedia av tre delar med olika karaktär: Stavsnäs by, Stavsnäs vinterhamn och Stavsnäs gärde. Vi tar uppdrag i alla." },
    { question: "När kom sommargästerna till Stavsnäs?", answer: "År 1865 fick Stavsnäs reguljär ångbåtstrafik från Stockholm. Då började stockholmare bygga sommarvillor med glasverandor och utsirade snickerier, och 1877 kom en lanthandel." },
    { question: "Får man bygga nytt i Stavsnäs by?", answer: "I själva byn har bara ett fåtal modernare hus byggts, på avstyckade tomter, och enligt Wikipedia reglerar detaljplanen den befintliga bebyggelsen långtgående." },
  ],
  "ekero-sommarstad": [
    { question: "Hur stor är Ekerö sommarstad?", answer: "Ekerö sommarstad består enligt Wikipedia huvudsakligen av nyare villabebyggelse, på omkring 37 hektar." },
    { question: "Finns det fritidshus kvar i Ekerö sommarstad?", answer: "Ja. I det nordvästra hörnet finns fortfarande ett fritidshusområde, som enligt SCB hade 133 fritidshus år 2010." },
    { question: "När blev Ekerö sommarstad tätort?", answer: "Den västra delen var 1995 en egen småort med 52 invånare, och till år 2000 hade tätorten vuxit så att den också omfattade den." },
  ],
  "ostertalje": [
    { question: "Hur växte Östertälje villasamhälle fram?", answer: "År 1859 etablerades en ångsåg på järnvägens södra sida, och kring den växte villasamhället fram under 1800-talets andra hälft och in på 1900-talet. Igelsta station tillkom 1887 och heter i dag Östertälje station." },
    { question: "Vad är kvarteret Apollofjärilen?", answer: "Södertälje kommun lyfter fram de 32 radhusen i kvarteret Apollofjärilen, uppförda 1959–60 med fasader i gult tegel och placerade efter gatan och den sluttande terrängen." },
    { question: "När blev Östertälje en del av Södertälje?", answer: "Igelsta municipalsamhälle bildades 1924, och en stadsplan upprättades 1927. Sedan 1963 hör området till Södertälje." },
  ],
  "viggbyholm": [
    { question: "Hur gammal är Viggbyholm?", answer: "Viggbyholm har vuxit fram ur en av Täbys gamla byar, med ett namn, Vighby, som är dokumenterat sedan 1200-talet. Byn hade tre gårdar och skulle tillsammans med grannbyn Kjula utrusta en roddare för ledungsflottan." },
    { question: "Vad var mönsterboken från 1919?", answer: "År 1919 togs en mönsterbok med villor och sportstugor fram, med ritningar av flera arkitekter. Målet var en enhetlig karaktär med klassicerande villor och nationalromantiska sportstugor." },
    { question: "Finns det gamla stationshuset i Viggbyholm kvar?", answer: "Ja. En hållplats anordnades vid Viggbyholm 1903, och stationshuset från 1908 finns kvar och är välbevarat." },
  ],
  "holo": [
    { question: "Hur blev Hölö ett stationssamhälle?", answer: "Enligt Södertälje kommun anlades Hölö kring järnvägslinjen som öppnade 1913, och tyngdpunkten flyttade då västerut från det gamla sockencentrumet vid kyrkan. Stationen revs 1969, när tågen slutade stanna." },
    { question: "Var ligger Hölö kyrka?", answer: "Söder om samhället ligger Lillsjön och Kyrksjön, och Hölö kyrka står vid Kyrksjöns östra strand." },
    { question: "Hur ser husen i centrala Hölö ut?", answer: "I centrala Hölö står enligt kommunen trävillor från 1910- och 1920-talen med stora, anlagda trädgårdar. Längre upp i backarna ligger småhus från tiden kring 1900-talets mitt, inpassade på mindre naturtomter." },
  ],
  "enskede-gard": [
    { question: "Vilka var de första husen i Enskede gård?", answer: "Den första bebyggelsen ligger enligt Wikipedia öster om gården. År 1907 sålde Stockholms stad 49 tomter kring Lindevägen med full äganderätt, och bygget började med tio dubbelhus och åtta enkelhus. Året därpå infördes lagen om tomträtt." },
    { question: "Hur ser 1920-talets småvillor i Enskede gård ut?", answer: "På 1920-talet byggdes småvillor i trädgårdsmiljö mellan Herrgårdsvägen och Lindevägen. Enligt Wikipedia är husen på Dammtrappgatan tidstypiska, med fasader i träpanel och locklister, spröjsade fönster och fönsterluckor." },
    { question: "Hur gammal är huvudbyggnaden på Enskede gård?", answer: "Den nuvarande huvudbyggnaden vid Enskede gårdsväg är från 1805. Stadsplanen från 1929 slog fast att gården och parken skulle bevaras." },
  ],
  "lindholmen": [
    { question: "Hur kom Lindholmens trädgårdsstad till?", answer: "Enligt Wikipedia började trädgårdsstaden anläggas i början av 1950-talet, på båda sidor om stationen på Roslagsbanan. De första husen byggdes på moränbackar och annan mark som inte gick att odla." },
    { question: "Vad var Slumsta?", answer: "Nära stationen låg byn Slumsta, som 1706 beskrevs som en by med två gårdar. Sedan dess har stora delar av Slumstas ägor bebyggts, och där finns 55 villor från 1978." },
    { question: "Planeras det fler bostäder i Lindholmen?", answer: "Ja. Vallentuna kommun planerar för 400 till 600 nya bostäder i Lindholmen." },
  ],
  "enskedefaltet": [
    { question: "Varför heter kvarteren i Enskedefältet efter grönsaker?", answer: "Marken var åker direkt söder om Enskede gårds huvudbyggnad. Stadsplanen från 1928 följer ett symmetriskt rutnät, och kvarteren fick namn efter grönsaker, som Blomkålen och Rödbetan, och gatorna efter trakter runt Östersjön." },
    { question: "Vilken färg ska husen i Enskedefältet ha?", answer: "Fasaderna kläddes med locklistpanel i pastellfärger som staden hade bestämt, och enligt Wikipedia begär stadsbyggnadskontoret fortfarande att ursprunglig färgsättning ska eftersträvas." },
    { question: "Varför ser gatorna i Enskedefältet enhetliga ut?", answer: "De flesta stugorna har enligt Wikipedia byggts till mot trädgårdssidan, eftersom det saknades plats mot gatan. Därför ger området från gatan fortfarande ett enhetligt intryck." },
  ],
  "lahall": [
    { question: "Var kommer namnet Lahäll ifrån?", answer: "Namnet kommer enligt Wikipedia av \"häll där man lastar\", men var den platsen låg är i dag okänt. På 1600-talet var Lahäll ett dagsverkstorp under Svalnäs." },
    { question: "Varför hör Lahäll till Täby och inte till Djursholm?", answer: "Fastighetsägarna ville att området skulle föras över till Djursholms stad, men enligt Wikipedia blev avloppsfrågan avgörande: Täby kunde erbjuda kommunalt vatten och avlopp. År 1947 fördes Lahäll över till Täby." },
    { question: "Var Lahäll slutstation på järnvägen?", answer: "Ja. År 1928 blev järnvägslinjen mellan Altorp och Lahäll klar, och Lahälls station var slutstation i nio år, innan banan 1937 förlängdes till Näsbypark." },
  ],
  "appelviken": [
    { question: "Var kommer namnet Äppelviken ifrån?", answer: "Namnet går tillbaka på torpet Äppelviken, som utvecklades till en gård där det på 1860-talet anlades en äppelträdgård. Gårdens huvudbyggnad står kvar vid Äppelviksvägen." },
    { question: "Vad skiljer östra och västra Äppelviken?", answer: "Den östra delen byggdes 1913–1919, med större villor i olika stilar. I den västra delen ändrades planen 1920, och husen blev enligt Wikipedia mindre och ställdes nära gatan, med fasader i träpanel, spröjsade fönster och öppen förstukvist." },
    { question: "Vad är kvarteret Drivbänken?", answer: "Vid Alléparken ligger de engelska radhusen i kvarteret Drivbänken: 43 radhus i fyra längor runt en gemensam gård, byggda 1919–1920 och blåmärkta av Stadsmuseet i Stockholm." },
  ],
  "haggvik": [
    { question: "Vilka delar består Häggvik av?", answer: "Häggvik delas enligt Wikipedia in i Häggviks centrum, Skälby, Södra Häggvik och Klasro. Vi tar uppdrag i alla delarna." },
    { question: "Hur fick Häggvik sin station?", answer: "Någon station var från början inte tänkt mellan Tureberg och Norrviken. Tomtägarna gjorde då en insamling, och pengarna fick SJ att gå med på att bygga en. Stationen stod klar 1932 och blev Sollentunas femte och sista." },
    { question: "Vad är Klasroskolan?", answer: "Klasroskolan i Klasro byggdes 1804 och var fram till 1871 Sollentunas enda skola." },
  ],
  "hoglandet": [
    { question: "Vad är Grönvik?", answer: "Grönvik ligger närmast vattnet. Där började tomter säljas 1902, och marken ingick inte i stadens markköp. Längs Grönviksvägen står enligt Wikipedia stugor från 1800-talet, några byggnader från slutet av 1700-talet och annars mest funkisvillor från 1930-talet." },
    { question: "Varför heter det Höglandet?", answer: "Fram till 1934 hette området Västra Ålsten. När Ålsten delades längs Djupdalsvägen lånades namnet från Höglandstorget, som hade fått sitt namn 1925 efter den höglänta terrängen." },
    { question: "Varför har villorna i Höglandet två våningar?", answer: "Den backiga marken fick enligt Wikipedia många att bygga så kallade dalahus, och många av villorna fick två fulla våningar." },
  ],
  "stora-mossen": [
    { question: "Vad var bostadsutställningen 1927?", answer: "Sommaren 1927 hölls en bostadsutställning här, med 29 nybyggda villor av sju arkitekter längs Ekorrvägen och angränsande delar av Mårdvägen och Stavgårdsgatan." },
    { question: "Vilka gatunamn finns i Stora Mossen?", answer: "Gatorna fick namn efter djur under utbyggnaden: efter Ekorrvägen och Mårdvägen följde Mullvadsvägen 1930, Gripvägen 1935 och Bävervägen och Utterstigen 1936. År 1939 var stadsdelen nästan färdigbyggd." },
    { question: "Varför ser villorna i Stora Mossen så lika ut?", answer: "Enligt Wikipedia är stadsdelens utformning mycket enhetlig, eftersom två tredjedelar av villorna ritades av en och samma arkitekt vid stadens fastighetskontor." },
  ],
  "marsta": [
    { question: "Var kommer namnet Märsta ifrån?", answer: "Namnet kommer enligt Wikipedia av ett ord som betyder platsen för mjärdfisket. Trakten har många fornlämningar: runstenar, gravfält och fornborgar." },
    { question: "Varför fick bara två av Märstas kullar bostäder?", answer: "Märsta var tänkt att byggas på fyra kullar, men bara Norrbacka och Valsta fick bostäder. De andra två låg för nära inflygningen när flygplatsen byggdes ut från 1970-talet." },
    { question: "Vad var Märsta gästgivaregård?", answer: "Märsta gästgivaregård var en viktig anhalt för postdiligensen mellan Uppsala och Stockholm. Järnvägen kom 1866." },
  ],
  "tumba": [
    { question: "Hur gammalt är Tumba?", answer: "Namnet går tillbaka på en kvarn, som nämns 1488, och det moderna Tumbas historia började 1755, när pappersbruket grundades. Bruket var länge närmast ett eget litet samhälle." },
    { question: "När blev Tumba municipalsamhälle?", answer: "I början av 1900-talet avsöndrades mark från två gårdar söder om järnvägen till villatomter, och den 28 oktober 1904 blev Tumba municipalsamhälle." },
    { question: "Vad byggdes i Tumba skog?", answer: "På 1940-talet byggdes det i Tumba skog, längs nuvarande Kyrkvärdsvägen, och ett vattentorn restes där 1946." },
  ],
  "edsberg": [
    { question: "Vilka områden hör till Edsberg?", answer: "Hit hör bland annat Edsbacka, Landsnora, Kvarnskogen, Edsbergs centrum, Östra Edsberg och Edsängen, och här ligger Edsbergs slott. Vi tar uppdrag i alla delarna." },
    { question: "Var ligger villorna i Edsberg?", answer: "Landsnora beskrivs av Wikipedia som ett lite äldre villaområde längs Edsviken, österut från Edsbergsparken. Edsängen är det första området längs Frestavägen mot Täby, och i Kvarnskogen söder om Danderydsvägen finns också villor." },
    { question: "Finns det sommarstugor i Edsberg?", answer: "Ja. Till kommundelen hör sommarstugeområdena Norrsättra och Södersättra bortom Väsjön, och några få hus på andra sidan Rösjön, som bara kan nås med väg genom Danderyd." },
  ],
  "gustavsberg": [
    { question: "Var kommer namnet Gustavsberg ifrån?", answer: "Namnet kommer från ett tegelbruk, som fick namnet Gustafsberg 1661. Tegelbruket revs, och i december 1826 stod en porslinsfabrik färdig på platsen." },
    { question: "Vad hände med porslinsfabriken i Gustavsberg?", answer: "Fabriken såldes 1937, med bostäder och lantbruk, och växte efter andra världskriget. De sista delarna lades ner under 2000-talet, och delar av fabriksområdet har byggts om till kontor och bostäder." },
    { question: "Vilka bostadsområden finns i Gustavsberg?", answer: "Bland bostadsområdena nämner Wikipedia Höjdhagen, Hästhagen, Munkmora, Lugnet, Björnkärret, Holmviksskogen och Ösbydalen. Orter som Mörtnäs, Hemmesta, Torsby och Grisslinge har vuxit ihop med Gustavsberg." },
  ],
  "spanga": [
    { question: "Vilka stadsdelar räknas till Spånga?", answer: "Spånga är enligt Wikipedia ett informellt område i Västerort, som ungefär motsvarar Bromsten, Flysta, Solhem, Lunda och Sundby. Vi tar uppdrag i alla." },
    { question: "Hur gammalt är namnet Spånga?", answer: "Namnet kommer från den gamla kyrkbyn och finns i skrift år 1300." },
    { question: "När blev Spånga en del av Stockholm?", answer: "Spånga var länge en egen landskommun. Den 1 januari 1949 införlivades den med Stockholm." },
  ],
  "edsviken": [
    { question: "Vad var Edsvikens villastad?", answer: "År 1918 köpte ett bolag ägorna till Edsbergs gods för att stycka dem till egnahem. Marken vid Edsviken var enligt Wikipedia tänkt som en förstad för tjänstemän, och en stadsplan gjordes för 350 tomter." },
    { question: "Hur stora är de ursprungliga villorna i Edsviken?", answer: "Många av de ursprungliga villorna är byggda i funkisstil och uppfördes med en byggyta på 70 till 90 kvadratmeter. Vissa av dem har fått en andra våning under 2000-talet." },
    { question: "Vad är Kummelby?", answer: "Kummelby är grannområdet till Edsviken. Enligt hitta.se är husen där från 1930- och 1950-talen." },
  ],
  "rotebro": [
    { question: "Var kommer namnet Rotebro ifrån?", answer: "Namnet kommer av att här fanns en bro över ett sund, och Rotebro nämns första gången 1464. Vid bron, intill landsvägen mellan Stockholm och Uppsala, låg en gästgivargård som fick sitt tillstånd 1647." },
    { question: "Hur gammal är Rotsunda gård?", answer: "Rotsunda gård nämns första gången 1409. Huvudbyggnaden från slutet av 1800-talet står kvar, liksom en flygel och ett stall från 1700-talet och ett litet rödmålat vapenhus från 1600-talet." },
    { question: "Vilka delar består Rotebro av?", answer: "Rotebro delas enligt Wikipedia in i Rotebro centrum, Rotsunda, Rotsunda gård, Gillbo, Gillberga och ett industriområde. Villorna ligger i Gillbo, Gillberga och Rotsunda." },
  ],
  "graddo": [
    { question: "Hur gammal är Gräddö by?", answer: "Byn nämns första gången 1547. Härifrån gick svenska trupper ombord 1739, och 1809 avseglade en expeditionskår från Gräddö mot Västerbotten." },
    { question: "Vad är missionshuset i Gräddö?", answer: "Missionshuset uppfördes 1868 vid Nabbo och flyttades till sin nuvarande plats 1933. Ortens varmbadhus flyttades 1920 till Gräddö-Asken." },
    { question: "Har Gräddö butik?", answer: "Ja. För dem som bor på Gräskö, strax utanför, är Gräddö enligt Wikipedia en av de två närmaste platserna med butik." },
  ],
  "farsta": [
    { question: "När köpte staden Farsta gård?", answer: "Marken hörde till Farsta gård, som Stockholms stad köpte 1912." },
    { question: "Hur planerades Farsta?", answer: "Enligt Wikipedia började det moderna Farsta planläggas på 1940-talet och byggdes under 1950-talets senare hälft, efter en generalplan från 1955, med flerfamiljshus kring ett centrum som invigdes 1960." },
    { question: "Var finns småhusen kring Farsta?", answer: "Villorna och småstugorna ligger i stadsdelarna runt omkring, som Tallkrogen, Svedmyra och Sköndal, och de är äldre än centrumet. Vi tar uppdrag i alla." },
  ],
  "helenelund": [
    { question: "Vilka delar består Helenelund av?", answer: "Helenelund består enligt Wikipedia av Helenelunds centrum, Kummelby, Edsviken, Tegelhagen, Silverdal och Eriksberg. Vi tar uppdrag i alla delarna." },
    { question: "Var kommer namnet Helenelund ifrån?", answer: "Namnet kommer från ett torp, och den lilla stugan som har gett kommundelen dess namn står kvar." },
    { question: "Vad är Eriksberg?", answer: "Eriksberg ligger på en remsa mellan E4 och Ostkustbanan och har fått sitt namn efter ett torp som byggdes 1819. Vid mitten av 1940-talet fanns här både sommar- och åretruntboende, och efter hand gjordes sommarstugorna om till åretruntbostäder." },
  ],
  "trollbacken": [
    { question: "Varför bytte Kumla namn till Trollbäcken?", answer: "Namnet byttes 1947, för att orten inte skulle förväxlas med Kumla i Närke. Det var Hanvikens och Kumlas villaområden som då fick det gemensamma namnet Trollbäcken." },
    { question: "Hur gammal är Kumla gård?", answer: "Kumla gård har rötter i medeltiden och är stamfastighet för stora delar av västra Tyresö. Huvudbyggnaden från 1700-talet står kvar, och Kumla allé är omkring 850 meter lång." },
    { question: "Hur många bor i Trollbäcken?", answer: "År 2016 bodde 12 910 personer i Trollbäcken. Bebyggelsen är mest småhus, och omkring hundra fritidshus finns kvar." },
  ],
  "knivsta": [
    { question: "Vad fick Knivsta att växa?", answer: "Ett sågverk som uppfördes öster om järnvägen år 1900 och ett tegelbruk som kom 1906. Sågverket började stycka av och sälja tomter till sina arbetare för egnahem, och 1930 hade enligt Wikipedia ett femtiotal tomter sålts och bebyggts." },
    { question: "Vad är Knivstahusen?", answer: "I Knivsta tillverkades monteringsfärdiga hus, de så kallade Knivstahusen. På 1920-talet anlade sågverket också ett arbetarområde på västra sidan av spåret." },
    { question: "Vad finns på den gamla sågverkstomten?", answer: "Sågverket lades ner 1999, och åren 2013–2015 byggdes nya bostäder och ett kommunhus på den gamla sågverkstomten." },
  ],
  "grisslehamn": [
    { question: "Hur gammalt är posthuset i Grisslehamn?", answer: "Poststationen flyttades hit 1754 från Gamla Grisslehamn, och posthuset på Tullberget är från 1756. Efter 1809 blev orten gränspost mot Finland." },
    { question: "När blev Grisslehamn sommarort?", answer: "I slutet av 1800-talet fick Grisslehamn ett uppsving som sommarort, och under glansperioden i början av 1900-talet fanns fem pensionat. Ett hotell vid hamnens inlopp stod klart 1903." },
    { question: "Går det färja från Grisslehamn?", answer: "Ja. Sedan 1960 går färjan till Eckerö på Åland härifrån. I hamnens inre del finns fiskebodar, bryggor och en småbåtshamn." },
  ],
  "vega": [
    { question: "Varför heter det Vega?", answer: "Ägaren till en villa i området hade i april 1880 sett fartyget Vega komma till Dalarö och gav huset samma namn. Senare fick vägarna namn med anknytning till Vegaexpeditionen." },
    { question: "Hur stora är tomterna i Kolartorp?", answer: "En byggnadsplan från december 1940 tillät en huvudbyggnad i högst två våningar på varje tomt, och tomterna blev enligt Wikipedia stora, i regel omkring 1 700 kvadratmeter. Senare planer har gjort det möjligt att dela tomterna." },
    { question: "Vad är Vegastaden?", answer: "Vegastaden är ett stadsbyggnadsprojekt med omkring 3 000 nya bostäder. Det första spadtaget togs den 3 december 2012." },
  ],
  "bro": [
    { question: "Hur gammal är Bro kyrka?", answer: "Bro kyrka ligger i lantlig miljö någon kilometer sydväst om samhället. Den är enligt Wikipedia murad av kluven gråsten, de äldsta delarna är troligen från 1100-talets slut, och taket är ett spånklätt mansardtak." },
    { question: "Var låg Bros gamla centrum?", answer: "Bygdens centrum låg från början vid Bro kyrka. År 1876 byggdes en järnvägsstation i byn Härnevi, och centrum flyttade sedan långsamt över till stationssamhället." },
    { question: "Vad hände med Bro centrum 1992?", answer: "Centrum förstördes helt av en brand 1992, och knappt två år senare invigdes ett nytt, med bostäder, butiker, bibliotek och kommunal service." },
  ],
  "singo": [
    { question: "Hur tar man sig till Singö?", answer: "Bron invigdes 1955, och sedan dess går vägen över Väddö och Fogdö. Innan dess kom man med båt, och den sista turen till Singö brygga gick 1951." },
    { question: "Hur gammal är Singö kyrka?", answer: "Kyrkan byggdes 1753 på samma plats som en äldre kyrka. Ön nämns första gången i ett pantbrev från 1334, och sex byar är kända sedan medeltiden." },
    { question: "Har ni bytt tak på Singö?", answer: "Ja. I september 2026 fick ett hus med utsikt över fjärden röda betongpannor på huvudtaket och röd TP20-plåt på de lägre delarna, och delar av råsponten byttes. Bilder från jobbet finns under våra projekt." },
  ],
  "stromma": [
    { question: "Hur blev Strömma ett villaområde?", answer: "Enligt Wikipedia består bebyggelsen i stort sett bara av villor, och de flesta av dem var från början sommarstugor men bebos nu permanent. Sedan 2015 räknas också Skeppsdalsström till tätorten." },
    { question: "Var kommer namnet Fågelbrolandet ifrån?", answer: "Fågelbrolandet har fått sitt namn efter herrgården Fågelbro. Byn hette Ffuglabrocke 1544 och bestod 1551 av tre gårdar, och herrgårdens huvudbyggnad från 1700-talet är i dag klubbhus för en golfklubb." },
    { question: "Vad finns vid Strömma kanal?", answer: "Strömma ligger runt bron där Värmdöleden går över Strömma kanal. Vid kanalen finns restauranger, butiker, ett varv för fritidsbåtar och en sjömack." },
  ],
  "ormsta": [
    { question: "Var ligger Ormsta?", answer: "Ormsta ligger i Vallentuna tätorts nordligaste del och gränsar till Åby i söder, Lingsberg i öster och Ubby i norr. Området fick sin station på Roslagsbanan 1957." },
    { question: "Hur snabbt växte Vallentuna efter kriget?", answer: "Befolkningen växte snabbt: från omkring 2 300 invånare 1944 till nästan 5 900 år 1952. På 1930- och 40-talen fanns bland annat två tegelbruk i centralorten." },
    { question: "Vilka bostadsområden finns i östra Vallentuna?", answer: "I de östra och norra delarna ligger bland annat Ormsta, Bällsta, Västra Bällsta och Molnby, med villor, kedjehus och radhus. Vi tar uppdrag i alla." },
  ],
  "kasta": [
    { question: "Vad var Post-Kästa?", answer: "År 1753 blev Kästa ett posthemman, Post-Kästa. Bonden där skulle se till att posten skickades vidare så fort som möjligt, natt och dag, tills järnvägen tog över postbefordran 1862." },
    { question: "Hänger Kästa ihop med Tullinge?", answer: "Ja. Geografiskt hänger Kästa ihop med Tullinge villastad, eftersom kommungränsen mot Botkyrka skär genom det sammanhängande området. Torpet Kästadal ligger på Tullinge-sidan av gränsen." },
    { question: "Hur många hushåll finns i Kästa?", answer: "Kästa är i dag ett villaområde med drygt 400 hushåll, med en förskola och en skola." },
  ],
  "kil": [
    { question: "Vad är Kils gård?", answer: "Kil har sitt namn efter Kils gård, en välbevarad herrgård vid Graningevägen, där huvudbyggnaden och flyglarna fick sitt utseende i empir på 1820-talet. Enligt Stockholms läns museum har gården ett stort kulturhistoriskt värde." },
    { question: "Vad är Boo torn?", answer: "På Boo kvarnberg väster om Boo gård stod en väderkvarn från 1850 till 1950, och utsiktstornet Boo torn från 1996 liknar den." },
    { question: "Hur blev Kil ett villaområde?", answer: "År 1906 bildade arvingarna till Boo gård ett fastighetsbolag, och enligt Wikipedia började därefter en omfattande styckning av marken för villabebyggelse." },
  ],
  "alvsala": [
    { question: "Vilka orter hör till Älvsala?", answer: "Sedan 2015 räknar SCB fyra tidigare småorter som en tätort: Älvsala, Fagerdala, Bullandö och Björkvik. Vi tar uppdrag i alla fyra." },
    { question: "Hur gammalt är Bullandö?", answer: "Bullandö nämns redan 1535, och namnet kan komma av terrängen med runda berg. Under 1600-talet bestod Bullandö av två skattehemman." },
    { question: "Vad hände på Bullandö på 1970-talet?", answer: "Bullandövägen breddades, marinan byggdes ut och omkring 140 tomter styckades av, de flesta för fritidshus. Kring millennieskiftet anlades Seglarbyn med 39 fastigheter." },
  ],
  "rosersberg": [
    { question: "Hur gammalt är Rosersbergs slott?", answer: "Rosersbergs slott uppfördes 1634–1638. Staten löste in godset 1757, och fem år senare blev det ett kungligt slott. Huvudbyggnaden visas i dag som museum." },
    { question: "Hur många bor i Rosersberg?", answer: "År 1950 bodde 322 personer här, 1970 var de 1 476 och 2020 var de 1 829." },
    { question: "Ska Rosersberg byggas ut?", answer: "Ja. Kommunstyrelsen antog 2021 ett underlag för detaljplaner för västra Rosersberg, där målet är att ortens bebyggelse ska fördubblas. Enligt Wikipedia byggs villastaden fortfarande ut." },
  ],
  "bromma": [
    { question: "När blev Bromma en del av Stockholm?", answer: "Bromma var en egen socken och kommun fram till 1916, då den uppgick i Stockholms stad." },
    { question: "Vilket var Brommas första villaområde?", answer: "Enligt Wikipedia började ett villaområde byggas redan på 1880-talet, när mark styckades av från Mariehälls gård. Omkring 1905 bebyggdes delar av Ulvsunda och områden kring Bromma kyrka med villor på privat initiativ." },
    { question: "Vad är Gamla Bromma trädgårdsstad?", answer: "I början av 1900-talet köpte Stockholms stad de stora godsen i Bromma och började bygga trädgårdsstäder, från Äppelviken 1913 och vidare ut mot Nockeby. Under 1910-, 1920- och 1930-talen växte det som kallas Gamla Bromma trädgårdsstad fram." },
  ],
  "solgard-sorskogen": [
    { question: "Vad finns i norra Solgård?", answer: "Runt Sördalavägen finns villastadshus från början av 1900-talet i nationalromantisk stil, och här ligger också Solgårds fornborg, en av Huddinges åtta fornborgar." },
    { question: "Hur planerades Sörskogen?", answer: "Stadsplanen ritades i två etapper: Sörskogen I 1962 och Sörskogen II 1972. Den äldre delen har villor och kedjehus från 1960-talet, och den nyare delen har radhus från 1970-talet med fasader i rött tegel." },
    { question: "Vilka gatunamn finns i Sörskogen?", answer: "Vägarna är uppkallade efter svampar: villorna och kedjehusen ligger längs Champinjon- och Musseronvägen, radhusen längs Bläcksvamps-, Flugsvamps- och Taggsvampsvägen, och området binds samman av Tryffelvägen." },
  ],
  "tynningo": [
    { question: "Hur tar man sig till Tynningö?", answer: "Enligt Wikipedia går det reguljära båtar hit från Vaxholm och Stockholm, och en bilfärja mellan östra Tynningö och Norra Lagnö." },
    { question: "Hur gammal är bebyggelsen på Tynningö?", answer: "Ön nämns första gången 1322, och en flygel av säterigården står kvar från tidigt 1700-tal. På 1800-talet styckades ön i mindre bondejordbruk, och jordbruket pågick enligt Wikipedia fram till 1980-talet." },
    { question: "När kom sommargästerna till Tynningö?", answer: "I början av 1900-talet styckades delar av ön i mindre tomter, som såldes till sommargäster som tog sig hit med ångbåt. Landsvägen över ön byggdes först på 1940-talet." },
  ],
  "eneby": [
    { question: "Var kommer namnet Eneby ifrån?", answer: "Namnet kommer av ene, som i enbackar, och finns enligt Wikipedia i ett fastebrev från 1347. Stadsdelen bildades 1940 och fick sitt namn efter Eneby gård." },
    { question: "Vilka gatunamn finns i Eneby?", answer: "Småstugeområdet började byggas 1939, och samma år fick gatorna sina namn efter bär och frukter: Hallonvägen, Hjortronvägen, Jordgubbsvägen, Krusbärsvägen, Plommonvägen, Päronvägen och flera andra." },
    { question: "Hur gammal är bebyggelsen i Eneby?", answer: "Inom stadsdelen finns flera gravfält från järnåldern, och de gravar som har undersökts visar enligt Wikipedia att här fanns bebyggelse redan omkring år 400. På en av högarna står en bautasten." },
  ],
  "hogmarso": [
    { question: "Hur många bor på Högmarsö?", answer: "Enligt Wikipedia är ön två kvadratkilometer stor och har en fast befolkning på 40 personer. På sommaren växer befolkningen till drygt 1 000." },
    { question: "Vad är Högmarsö varv?", answer: "År 1876 startades ett varv här, på initiativ av flera redare i trakten, och 1918 började varvet bygga stålfartyg. I dag finns en restaurang i varvets lokaler." },
    { question: "Hur gammal är frikyrkan på Högmarsö?", answer: "Ett samhälle växte fram i anslutning till varvet, med skolbyggnad och en frikyrka som uppfördes 1913." },
  ],
  "skarpnack": [
    { question: "Vad är Skarpnäcks trädgårdsstad?", answer: "Stockholms stad köpte Skarpnäcks egendom 1922, och redan året därpå kom den första stadsplanen, med småhus kring Riksrådsvägen och Kanslervägen. Området fick namnet Skarpnäcks trädgårdsstad." },
    { question: "Vad är Pungpinan?", answer: "Pungpinan är uppkallat efter ett torp som i sin tur har namn efter en krog som fanns här från 1600-talet till 1800-talet. Här började småstugor byggas 1927, och i dag finns enligt Wikipedia omkring 240 stugor." },
    { question: "Vilka radhus finns i Skarpnäck?", answer: "Kring Riksrådsvägen uppfördes drygt hundra radhus 1953–1956, i starkt kuperad terräng där längorna enligt Wikipedia grupperades kring fyra gröna gårdar. Stadsmuseet har blåklassat området." },
  ],
  "ballsta-bromma": [
    { question: "Vad var Bällsta villastad?", answer: "Bällsta gård såldes 1904 till ett exploateringsbolag, och mellan 1905 och 1908 styckades de första tomterna av till det som kallades Bällsta villastad. Det skedde enligt Wikipedia på privat initiativ." },
    { question: "Vem byggde stugorna i Bällsta?", answer: "Omkring 200 stugor byggdes av ägarna själva, i stadens regi: småstugebyrån stod för material och instruktioner. Därutöver såldes 20 stugor färdigbyggda, och de flesta husen är enplansstugor." },
    { question: "Varför har tomterna i Bällsta inte styckats?", answer: "Tomterna är mindre än 1 000 kvadratmeter och har därför inte styckats. I Stockholms översiktsplan redovisas Bällsta enligt Wikipedia som värdefull kulturmiljö." },
  ],
  "rindo": [
    { question: "Hur tar man sig till Rindö?", answer: "Det går att köra bil hit. Länsväg 274 går över ön, med vägfärja till Vaxholm i väster och till Värmdö i öster. Från Rindö leder en bro vidare till Skarpö." },
    { question: "Varför har det funnits militär på Rindö?", answer: "Rindö har länge varit en försvarsö, med befästningar sedan 1500-talet för att bevaka farlederna in mot Stockholm. Ett regemente låg på ön fram till hösten 2005." },
    { question: "Hur många bor på Rindö?", answer: "Enligt Wikipedia bodde 1 522 personer på ön året om 2020. Ön är ungefär fem kilometer lång och hör till Vaxholm sedan 1913." },
  ],
  "husaro": [
    { question: "Varför kallas Husarö en lotsplats?", answer: "Lotsar har funnits här sedan 1400-talet, och 1740 blev Husarö officiell lotsplats. På 1800-talet arbetade som mest femton lotsar här, och 1912 lades lotsplatsen ner. I dag finns ett lotsmuseum i en av de gamla lotsgårdarna." },
    { question: "Hur tar man sig till Husarö?", answer: "Ön nås med båt: Waxholmsbolagets fartyg lägger till vid ångbåtsbryggan. Ön ligger ungefär en distansminut norr om Finnhamn." },
    { question: "Hur många sommarstugor finns på Husarö?", answer: "Enligt Wikipedia har Husarö bara ett fåtal åretruntboende men ett hundratal sommarstugor. Sommargästerna kom när ångbåtarna började gå i reguljär trafik 1881." },
  ],
  "kallhall": [
    { question: "Varför byggde arbetarna i Björkliden?", answer: "Fabriken i Kallhäll upplät enligt Järfälla kommuns kulturmiljöplan ingen mark åt anställda som ville bygga eget, och därför sökte sig arbetarna över gränsen till Björkliden. Där byggde de enligt Wikipedia enkla trävillor." },
    { question: "När kom Kallhälls villastad till Järfälla?", answer: "Området hörde länge till Sollentuna. Först den 1 januari 1955 fördes Björkliden över till Järfälla, och då bodde 295 personer här." },
    { question: "Hur stora var tomterna i Kallhälls villastad?", answer: "Enligt kommunen var tomterna från början stora, 1 500–2 000 kvadratmeter, men flera har styckats sedan dess. Bostadshusen står mitt på tomterna." },
  ],
  "musko": [
    { question: "Hur tar man sig till Muskö?", answer: "Ön nås med bil genom en tunnel under fjärden. Tunneln öppnades för allmän trafik den 15 mars 1964, är 2 895 meter lång och ligger som djupast 66 meter under fjärden. Buss går till ön." },
    { question: "Varför byggdes Muskötunneln?", answer: "Tunneln byggdes för försvaret, som behövde en fast förbindelse till den örlogsbas på ön som stod färdig 1969. Fram till 1960-talet gick ingen väg till ön." },
    { question: "Hur många fritidshus finns på Muskö?", answer: "Omkring 900 personer bor på Muskö, och enligt Wikipedia finns cirka 1 500 fritidshus, de flesta på öns nordöstra del. Där ligger också Hoppet, öns andra tätort." },
  ],
  "grasko": [
    { question: "Hur gammal är bebyggelsen på Gräskö?", answer: "Gräskö nämns första gången i skrift 1405. På 1600-talet kom en torpare hit, under 1700-talet bosatte sig flera lotsar på ön, och 1838 köpte två torpare loss ön och delade den mellan sig." },
    { question: "När kom fritidshusen till Gräskö?", answer: "Sommargästerna började komma i slutet av 1800-talet och hyrde in sig hos de fastboende. Under mellankrigstiden byggdes de första fritidshusen, och under 1960-talet skedde enligt Wikipedia en storskalig exploatering av öns norra delar." },
    { question: "Hur många bor på Gräskö?", answer: "På ön finns enligt Wikipedia mest sommarhus, men också en fast befolkning på 28 personer. I början av 2000-talet fanns 140 fastigheter på ön." },
  ],
  "krusboda": [
    { question: "Vad är Krusboda?", answer: "Krusboda byggdes enligt Tyresö kommun 1969–1974 som ett grupphusområde, med 1 400 bostäder i form av radhus, atriumhus och friliggande villor, som ett alternativ till höghusen." },
    { question: "Varför heter gatorna i Krusboda gångar?", answer: "Delområdena kallas gångar, som Björktickegången, Lummergången och Musserongången, och namnen är också adresser. Barnen kunde springa på de labyrintliknande gågatorna, medan bilarna parkerades i garagelängor i områdets utkant." },
    { question: "Hur mycket av Krusboda är samfälld mark?", answer: "Enligt Wikipedia är omkring 400 000 av områdets 840 000 kvadratmeter samfälld mark." },
  ],
  "slagsta": [
    { question: "Varför ligger husen i Slagsta i terrasser?", answer: "Området ligger där tegelbrukets lertäkt fanns. Leran togs ut i skikt som var två och en halv meter djupa, och husen står på de avsatser som blev kvar." },
    { question: "Hur gammal är Slagsta gård?", answer: "Slagsta gård har enligt Wikipedia anor från 1300-talet och blev säteri på 1650-talet. Huvudbyggnaden, ett stenhus med ljusgul putsad fasad, uppfördes på 1850-talet." },
    { question: "Vad var Slagsta tegelbruk?", answer: "Under gården lydde två tegelbruk vid Mälaren. År 1885 levererades en miljon tegelstenar från Slagsta till Stockholm, och bruket lades ner 1914." },
  ],
  "bagarmossen": [
    { question: "Var kommer namnet Bagarmossen ifrån?", answer: "Namnet finns på en karta från 1846, som Bagaremossen, och går tillbaka på en hovbagare som på 1790-talet arrenderade mossen av ägaren till Skarpnäcks gård." },
    { question: "Vilka småhus finns i Bagarmossen?", answer: "I den södra och sydöstra delen byggdes enligt Wikipedia radhus och fristående småhus, de flesta i två våningar. Stadens småstugebyrå uppförde 362 småhus av tio olika typer med självbyggeri." },
    { question: "Är Bagarmossen kulturhistoriskt klassat?", answer: "Stockholms stadsmuseum har gulmarkerat hela sydöstra Bagarmossen, vilket avser bebyggelse av positiv betydelse för stadsbilden eller av visst kulturhistoriskt värde." },
  ],
  "fardala": [
    { question: "Hur gammalt är torpet Fårdala?", answer: "Enligt Tyresö kommun ligger torpet Fårdala, från 1780-talet, fortfarande kvar mitt i ridskolans område. Jordbruket fanns kvar ända fram till 1960-talet." },
    { question: "Hur byggdes Fårdala?", answer: "Enligt kommunen planerades och byggdes Fårdala 1963–67 av Tyresö kommun. I väster byggdes rad- och kedjehus i typhusgrupper, och i öster friliggande villor i privat regi." },
    { question: "Vilka vägnamn finns i Fårdala?", answer: "Slåttervägen, som slingrar i en loop genom området, påminner om ängsmarkerna i dalgången, och de övriga vägarna har namn efter bär. Slåttervägen och Rönnbärsvägen gränsar till det som en gång var torpets åkermark." },
  ],
  "soderby": [
    { question: "Hur gammal är Söderby gård?", answer: "Gården omnämns 1425 och ligger fortfarande på sin gamla tomt. Huvudbyggnaden brann omkring 1750 och byggdes aldrig upp igen, och sedan dess har den södra flygeln fungerat som mangård." },
    { question: "Vad är Söderbystenen?", answer: "Bakom en av gårdens flygelbyggnader står Söderbystenen, en runsten från 1000-talet." },
    { question: "Vad har Söderby gård med Handen att göra?", answer: "Gårdens mark började exploateras från 1920, och ur den växte villasamhället Handen fram. Flera av torpen under Söderby har gett namn åt bostadsområden i kommunen." },
  ],
  "varberg": [
    { question: "Vad är Johannesdal?", answer: "Johannesdal är villaområdet nere vid Mälaren. På 1790-talet byggdes ett torp om till sommarnöjet Johannesdal, och herrgården från den tiden står kvar." },
    { question: "När blev Vårberg en del av Stockholm?", answer: "Stadsdelen fick sitt namn 1961 och fördes till Stockholm 1963. Ännu i början av 1960-talet var Vårberg landsbygd i utkanten av staden." },
    { question: "Hur planerades Vårberg?", answer: "Mellan 1965 och 1968 gjordes fjorton stadsplaner för lika många delområden. Eftersom terrängen är starkt kuperad lades höga hus på höjderna och lägre hus längre ner." },
  ],
};

export const egnaFaqFor = (slug: string): readonly EgenFAQ[] | undefined => EGNA_FAQ[slug];
