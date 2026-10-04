/**
 * Villaområden per kommun (SEO-programmet, villaområden våg 0, backlog #1m).
 * Källa: ledning/marknad/villaomraden/alla.csv (rangordnat underlag, Marknadschefens plan
 * seo-plan-omraden.md). Bara belagda fält: områdesnamn, hustyper och byggperiod med källa
 * (kommunen, Wikipedia, hitta.se). Aldrig postnummer (ej kartkontrollerade), inkomst/köpkraft,
 * taktyp eller påståenden om egna jobb. Områden med egen sida länkas, övriga står utan länk.
 * Renderas på kommunsidan (LocationPage / RegionPage) och speglas i scripts/prerender-content.ts.
 */
export interface VillaArea {
  name: string;
  types: string;
  period: string;
  /** Godkänd kommunrad från Innehåll (områden utan egen sida). Visas i stället för hustyper + byggperiod. */
  note?: string;
  /** Egen sida på sajten, t.ex. "/taklaggare-ella-gard". Bara sidor som finns. */
  href?: string;
}

export interface MunicipalityVillaAreas {
  municipality: string;
  areas: VillaArea[];
}

export const VILLA_AREAS_SOURCE =
  "Byggperioder enligt kommunernas områdesbeskrivningar, Wikipedia och hitta.se. Urvalet bygger på områden med många ägda småhus enligt SCB.";

/** Nyckel = ortsslug för kommunsidan (/taklaggare-<slug>) eller regionslug (/omraden/<slug>). */
export const villaAreasByPage: Record<string, MunicipalityVillaAreas> = {
  salem: {
    municipality: "Salem",
    areas: [
      { name: "Rönninge", types: "Villor och kedjehus", period: "Villasamhälle från 1896, mest 1960- och 1990-tal", href: "/taklaggare-ronninge" },
    ],
  },
  vallentuna: {
    municipality: "Vallentuna",
    areas: [
      { name: "Vallentuna östra (Ormsta, Bällsta, Molnby)", types: "Villor, kedjehus och radhus", period: "Ormsta 1950–70-tal, Bällsta 1960- och 2000-tal, Molnby 1980- och 2000-tal", href: "/taklaggare-ormsta" },
      { name: "Västra tätorten (Snapptuna, Rickeby)", types: "", period: "", note: "Enligt hitta.se är husen i Snapptuna främst byggda på 1960- och 1970-talen och i Rickeby på 1970- och 1980-talen. Båda är bostadsområden i Vallentuna tätort, som har vuxit fram längs Roslagsbanan." },
      { name: "Södra tätorten (Uthamra, Kragstalund)", types: "", period: "", note: "Kragstalund har en egen hållplats på Roslagsbanan, och enligt hitta.se är husen där främst från 1970- och 1980-talen, medan Uthamra är byggt på 2000- och 2010-talen." },
    ],
  },
  norrtalje: {
    municipality: "Norrtälje",
    areas: [
      { name: "Rådmansö", types: "Villor, lantbruk och fritidshus", period: "Blandat 1920–1980-tal, mest 1950–1980", href: "/taklaggare-radmanso" },
      { name: "Frötuna (Frötuna, Rösa, Björnövägen, Frötuna Hammarby, Norrboda, Björnösund)", types: "", period: "", note: "Frötuna socken har medeltida ursprung och ligger sydost om Norrtälje, på västra delen av Rådmansöhalvön, en sjörik och kuperad skogsbygd med odlingsbygd i norr. Enligt hitta.se är husen här byggda under flera perioder, från sekelskiftet via 1950- och 1970-talen till 2000-talet." },
      { name: "Kvisthamra", types: "", period: "", note: "Kvisthamra är en stadsdel i Norrtälje. Enligt Norrtälje kommun hör Kvisthamra, tillsammans med Gransäter, till de egnahems- och villaområden som växte fram i stadens utkanter vid 1900-talets början. Kommunens riktlinje i den fördjupade översiktsplanen är att stadsdelarnas ursprungliga stadsplaneideal ska värnas vid förtätning, och Granparken intill ingår sedan 2022 i riksintresset för kulturmiljövården Norrtälje. De första husen här är i dag över hundra år gamla, och taken kan redan ha lagts om." },
      { name: "Gransäter och Långgarn", types: "", period: "", note: "Gransäter hör enligt Norrtälje kommun, tillsammans med Kvisthamra, till de egnahems- och villaområden som växte fram i stadens utkanter vid 1900-talets början. Långgarn ligger i jordbrukslandskapet nordost om stadskärnan, och kommunen beskriver det som ett särskilt välbevarat odlingslandskap med eklundar, slingrande landsvägar, ekonomibyggnader från sekelskiftet och småskaliga enbostadshus. De första husen i Gransäter är i dag över hundra år gamla, och taken kan redan ha lagts om. Kommunen skriver att de utpekade gårds- och bymiljöerna i Långgarn inte ska förvanskas vid ändringar och tillägg, så det är klokt att ta reda på vad som gäller för huset innan material eller kulör väljs." },
      { name: "Görla och Bolkadalen, södra staden", types: "", period: "", note: "I södra Norrtälje, norr om E18 och väster om Kvisthamra, ligger bostadsområdena Görla och Bolkadalen. Bolkadalen började enligt Wikipedia byggas senhösten 2005: 22 villor stod klara före midsommar 2006, och 31 parhus följde till våren 2008. Husen i Görla är enligt hitta.se mest från 1990- och 2000-talen. Husen här är alltså mellan knappt 20 och drygt 35 år gamla, och på parhus hänger taket ihop med grannens." },
    ],
  },
  ekero: {
    municipality: "Ekerö",
    areas: [
      { name: "Träkvista", types: "Villor, kedjehus och radhus", period: "Främst 1960- och 1980-tal (hitta.se)", note: "Träkvista på Ekerön har mest villor, kedjehus och radhus och var Ekerö kommuns mittpunkt fram till 1990, då Ekerö centrum invigdes. Enligt hitta.se är husen i Träkvista främst byggda på 1960- och 1980-talen." },
      { name: "Älvnäs, Brunna och Närlunda", types: "Kedjehus och villor", period: "Främst 1960- och 1970-tal (hitta.se)", note: "Älvnäs ligger på Ekerön vid Långtarmen, och namnet finns belagt sedan 1476, då det skrevs Elffwenäs i Stockholms stads tänkeböcker. Enligt hitta.se är husen i Älvnäs, Brunna och Närlunda, som består av kedjehus och villor, främst byggda på 1960- och 1970-talen." },
      { name: "Kungsberga, Färentuna och Hilleshög", types: "", period: "", note: "Kungsberga är en tätort på Färingsö, omkring 35 kilometer från Stockholms innerstad, och i Färentuna finns Färentuna kyrka, som byggdes på 1100-talet. Enligt hitta.se är husen vid Ölstavägen främst byggda på 1960-talet och vid Furuvägen på 1950- och 1960-talen." },
      { name: "Sundby och Ekerö sommarstad", types: "", period: "", note: "Ekerö sommarstad är en tätort i Ekerö kommun som enligt Wikipedia huvudsakligen består av nyare villabebyggelse. I den västra delen finns fortfarande ett fritidshusområde, som enligt SCB hade 133 fritidshus år 2010. Enligt hitta.se är husen vid Liljedalsvägen och Backvägen främst från 1950- och 1960-talen." },
      { name: "Adelsö, Munsö och Ekeby tomtområde", types: "", period: "", note: "Adelsö är en ö i östra Mälaren utan fast vägförbindelse, och med bil nås den bara med färjan på Adelsöleden från Munsön. Ekeby tomtområde i Munsö socken omfattar enligt Wikipedia den gamla byn Ekeby och ett större småhusområde norr om den, och 2010 fanns 133 fritidshus i området. Enligt hitta.se är husen vid Adelsö Hovgården främst från 1960- och 1980-talen och på Munsö från 1930- och 1980-talen." },
    ],
  },
  tyreso: {
    municipality: "Tyresö",
    areas: [
      { name: "Brevikshalvön (Raksta, Bergholm, Solberga, Dyvik, Ällmora)", types: "Villor", period: "Villaområde sedan 1930-talet", note: "På Brevikshalvön, som före 1930 ingick i Tyresögodset, bebyggdes skogs- och jordbruksmarken under 1900-talet med sommarnöjen och fritidshus, och sedan 1930-talet har halvön utvecklats till ett villaområde. Raksta omtalas första gången 1562, som ett torp under Tyresö slott." },
      { name: "Hanviken och Skälsätra (Trollbäcken)", types: "Småhus", period: "Avstyckat från Kumla gård", note: "Hanviken och Skälsätra styckades av från Kumla gård, stamfastigheten för stora delar av västra Tyresö, vars huvudbyggnad från 1700-talet och allé fortfarande finns kvar. Trollbäcken hette Kumla fram till 1947, och bebyggelsen består mest av småhus." },
      { name: "Fornudden, Persudde och Sofieberg (Trollbäcken, vid Drevviken)", types: "", period: "", note: "Fornudden, Persudde och Sofieberg i Trollbäcken styckades enligt Wikipedia av från Kumla gård, vars huvudbyggnad från 1700-talet och allé finns kvar. Fornudden ligger vid sjön Drevviken, och där finns ett gravfält från yngre järnåldern med ett tjugofemtal gravar. Enligt Tyresö kommun har villaområdet vuxit fram främst under 1900-talet." },
      { name: "Tyresö Strand (Gamla Tyresö, Alby, Gimmersta, Slumnäs, Strandtorget)", types: "", period: "", note: "Tyresö Strand ligger i kommundelen Gamla Tyresö, där också Tyresö slott och Tyresö kyrka från 1600-talet finns. Området kring Tyresö Strand har enligt Wikipedia bebyggts med villor, parhus och radhus sedan mitten av 1990-talet, och kring Strandtorget finns ett mindre antal lägenheter och kommersiella verksamheter." },
    ],
  },
  nacka: {
    municipality: "Nacka",
    areas: [
      { name: "Saltsjöbaden", types: "Villor (villastad)", period: "Villastad 1891–1912, utbyggnad efter andra världskriget", href: "/taklaggare-saltsjobaden" },
      { name: "Storängen och Saltsjö-Duvnäs", types: "Villor, radhus", period: "Storängen från 1904, funkisvillor 1930–40-tal, Duvnäs 1910–20-tal, radhus 1964–67", href: "/taklaggare-storangen" },
      { name: "Lännersta", types: "Villor", period: "Tomter styckade till 1937 (925 st), villor främst från 1930-talet och framåt", href: "/taklaggare-lannersta" },
      { name: "Skuru (Ektorp-Skuru)", types: "", period: "", note: "Skuru på Sicklaön ramas enligt Wikipedia in av naturreservatet Nyckelviken i väster, Skurusundet i öster, Värmdöleden i söder och Duvnäs utskog i norr. Bebyggelsen består nästan uteslutande av enfamiljshus och parhus, och centralt i området ligger Solsunda, tidigare Skuru gård, med rötter från 1600-talet." },
    ],
  },
  stockholm: {
    municipality: "Stockholm",
    areas: [
      { name: "Kälvesta", types: "Radhus, kedjehus, atriumhus och villor", period: "1966 till mitten av 1970-talet (Wikipedia)", href: "/taklaggare-kalvesta" },
      { name: "Norra Ängby", types: "Småstugor/villor i trä (1–2 plan), radhus", period: "1930–1941 (huvuddelen 1931–38), enplansvillor 1948–49", href: "/taklaggare-angby" },
      { name: "Hässelby villastad", types: "Villor, radhus, kedjehus", period: "Villor från 1900, radhus/kedjehus 1970-tal (Backlura)", href: "/taklaggare-hasselby" },
      { name: "Långbro", types: "Villor och småstugor", period: "Villor ca 1899–1903, småstugor 1943–49", href: "/taklaggare-langbro" },
      { name: "Örby", types: "Villor", period: "Sent 1800-tal–1970-tal", href: "/taklaggare-orby" },
      { name: "Solhem och Lunda", types: "Villor, kedjehus, radhus, parhus", period: "1904–07, 1920–30-tal, 1960-tal, 2000-tal", href: "/taklaggare-solhem-lunda" },
      { name: "Nälsta", types: "Villor, radhus och flerfamiljshus", period: "Stadsdel från 1953", note: "Nälsta by är känd sedan 1300-talet, och namnet, skrivet Nærdharstaff 1354, kommer enligt Wikipedia från gudomsnamnet Njärd. Området köptes av Stockholms stad 1931, och stadsdelen bildades 1953, med blandad bebyggelse av villor, radhus och flerfamiljshus." },
      { name: "Vinsta", types: "", period: "", note: "Vinsta är en stadsdel i Västerort som inrättades 1953, på mark som Stockholms stad hade köpt från Spånga 1949, och som har sitt namn efter byn Vinsta. Den norra delen är enligt Wikipedia ett radhus- och villaområde med inslag av flerfamiljshus, medan den sydöstra delen är företagspark. Enligt Stockholms stads Områdesfakta finns 866 småhus i stadsdelen, varav 826 med äganderätt." },
      { name: "Solberga", types: "", period: "", note: "Solberga i Söderort ligger på mark som hörde till Västberga gård och som Stockholms stad förvärvade i mitten av 1930-talet. Den första stadsplanen ritades då och omfattade småstugeområdet i stadsdelens nordvästra del, och efter andra världskriget byggdes Solberga enligt Wikipedia ut med villor. Villa Elfhem vid Götalandsvägen, byggd 1904, hör till de första husen i det som i dag är Solberga." },
      { name: "Mariehäll", types: "", period: "", note: "I Mariehäll i Bromma började bostadsbyggandet 1881, när området Margretero mellan Mariehälls gård och Bällstaån styckades av och enkla hyresvillor i trä uppfördes. På 1890-talet tillkom enligt Wikipedia ytterligare 40–50 tomter, bland annat norr om Bällstavägen. När stadsdelen fick sin första stadsplan 1931 lades de sydvästra delarna, den tidigare Bällsta villastad, ut som egnahemsområde." },
      { name: "Västberga", types: "", period: "", note: "Västberga i Söderort domineras enligt Wikipedia av industriområdet söder om Södertäljevägen, men här finns också flera bostadsområden. Stockholms stad köpte Västberga gård 1935 och började planera för småstugor i Hökmossen, och en stadsplan togs fram 1938. Från 1939 byggdes småhus längs Korpmossevägen, och 1942 stod radhus klara för inflyttning." },
      { name: "Fagersjö", types: "", period: "", note: "Fagersjö ligger utmed Magelungens norra strand och var enligt Wikipedia, tillsammans med dagens Farsta strand, en del av Södertörns villastad, som började anläggas i början av 1900-talet. De flesta villorna i Fagersjö byggdes norr om järnvägen. Den första, Villa Edvardshäll vid Fagersjövägen, uppfördes 1903. Wikipedia skriver att många av villorna sedan dess har rivits och att de som står kvar är förändrade, och att stadsplanen från 1960 skilde den äldre villamiljön från de nya hyreshusen. De tidigaste villorna är i dag runt 120 år gamla, och taken kan redan ha lagts om." },
    ],
  },
  "upplands-vasby": {
    municipality: "Upplands Väsby",
    areas: [
      { name: "Bollstanäs", types: "Radhus, kedjehus och villor", period: "Främst 1970- och 1980-tal (hitta.se)", href: "/taklaggare-bollstanas" },
    ],
  },
  danderyd: {
    municipality: "Danderyd",
    areas: [
      { name: "Nora och Kevinge", types: "Villor, kedjehus och radhus", period: "Nora trädgårdsstad från 1926, Kevinge 1950–60-tal (Wikipedia, hitta.se)", href: "/taklaggare-nora-kevinge" },
      { name: "Enebyberg", types: "Villor, rad- och kedjehus", period: "Villor 1906–1940-tal, rad- och kedjehus 1960–70-tal", href: "/taklaggare-enebyberg" },
    ],
  },
  taby: {
    municipality: "Täby",
    areas: [
      { name: "Ella gård", types: "Kedjehus och radhus", period: "1955 till omkring 1970 (kommunen)", href: "/taklaggare-ella-gard" },
      { name: "Skarpäng", types: "Villor, radhus och grupphus", period: "Typhus från 1970- och 1980-talet (kommunen)", href: "/taklaggare-skarpang" },
      { name: "Näsbypark", types: "Villor, kedjehus, radhus och parhus", period: "Villor 1930–40-tal, grupphus 1955–1976 (kommunen)", href: "/taklaggare-nasbypark" },
      { name: "Ensta", types: "Villor", period: "1940–1960-tal, förtätning på 1970-talet (kommunen)", href: "/taklaggare-ensta" },
      { name: "Erikslund", types: "Parhus, kedjehus och grupphus", period: "1972–1973 (kommunen)", href: "/taklaggare-erikslund" },
      { name: "Ella Park", types: "Villor och kedjehus", period: "Främst 1950–60-tal (kommunen)", note: "Enligt Täby kommun styckades skogsmarken som hörde till gården Ellas utmarker av för villor i slutet av 1920-talet, först längs dagens Täbyvägen, och området präglas i dag av villor från 1930-talet och framåt, med ett tydligt inslag av 1950- och 60-talens tegel- och putsarkitektur." },
      { name: "Vallabrink", types: "Villor och kedjehus", period: "Främst 1960–70-tal (kommunen)", href: "/taklaggare-vallabrink" },
      { name: "Gribby-Myräng", types: "Villor och radhus", period: "Löttingelund 1970–80-tal (kommunen)", href: "/taklaggare-gribbylund" },
      { name: "Karlslund", types: "Parhus och kedjehus i ett och ett halvt plan", period: "1975–1976", href: "/taklaggare-karlslund" },
      { name: "Midgård och Byle", types: "Radhus (Midgård, 231 bostäder), villor, kedjehus, radhus (Byle)", period: "Midgård 1972–73, Byle villor 1907–1910-tal och radhus 1974", href: "/taklaggare-midgard-byle" },
      { name: "Roslags-Näsby", types: "Villor, radhus (samt flerbostadshus)", period: "Villor från tidigt 1900-tal och 1930-tal, hitta.se 1960- och 1970-tal", href: "/taklaggare-roslags-nasby" },
      { name: "Viggbyholm", types: "Villor", period: "Villastad främst 1918–1935, en del 1960-tal", href: "/taklaggare-viggbyholm" },
      { name: "Vallatorp och Visinge", types: "Radhus, parhus, kedjehus, villor", period: "Vallatorp slutet av 1970-talet, Visinge grupphus 1980-tal, Lövbrunna 2007–2008", href: "/taklaggare-vallatorp-visinge" },
    ],
  },
  sollentuna: {
    municipality: "Sollentuna",
    areas: [
      { name: "Viby", types: "Villor, kedjehus och radhus", period: "1970-tal (Wikipedia)", href: "/taklaggare-viby" },
      { name: "Norrviken", types: "Villor och radhus", period: "Villastad 1906–1940-tal, radhus 1960–80-tal (Wikipedia)", href: "/taklaggare-norrviken" },
      { name: "Edsviken", types: "Villor, inslag av radhus", period: "Främst 1920–30-tal (Wikipedia)", href: "/taklaggare-edsviken" },
      { name: "Töjnan", types: "Villor", period: "Mest 1920- och 1970-tal (hitta.se)", note: "Töjnan är ett namnsatt område i västra delen av kommundelen Tureberg, som gränsar till bland annat Fågelsången, Bagarby, Knista och Häggvik. Enligt hitta.se är husen främst byggda på 1920- och 1970-talen." },
      { name: "Tegelhagen", types: "Kedjehus och radhus", period: "Slutet av 1970-talet (hitta.se)", href: "/taklaggare-tegelhagen-silverdal" },
      { name: "Vaxmora", types: "Villor och radhus", period: "Mest 1960- och 1970-tal (hitta.se)", note: "Vaxmora i nordöstra Sollentuna är uppkallat efter ett torp i Törnskogen. Enligt hitta.se är villorna och radhusen främst byggda på 1960- och 1970-talen." },
      { name: "Eriksberg", types: "Villor", period: "Villastad från 1920–30-talet (Wikipedia)", note: "Eriksberg i Helenelund har fått sitt namn från torpet Eriksberg från 1819. Marken köptes upp för tomter 1918, villabyggandet tog enligt Wikipedia fart när Helenelund fick sin järnvägshållplats 1922, och 1926 upprättades stadsplanen för Eriksbergs villastad, ritad av arkitekten Arvid Stille. Enligt hitta.se är husen i dag främst från 1950- och 1960-talen." },
      { name: "Kummelby", types: "Villor", period: "Mest 1930- och 1950-tal (hitta.se)", note: "Kummelby var en gård redan i förhistorisk tid. Marken köptes upp 1918 och bostadshus började byggas, och enligt hitta.se är husen främst från 1930- och 1950-talen. Gårdens byggnader revs 1953." },
    ],
  },
  huddinge: {
    municipality: "Huddinge",
    areas: [
      { name: "Stuvsta", types: "Villor samt rad- och kedjehus", period: "Villor 1920–1930-tal, rad- och kedjehus 1980–1990-tal", href: "/taklaggare-stuvsta" },
      { name: "Trångsund", types: "Villor, småhus och radhus", period: "Styckning 1911–1928, stor småhusutbyggnad tidigt 1960-tal", href: "/taklaggare-trangsund" },
      { name: "Segeltorp", types: "Villor och radhus", period: "Villor tidigt 1900-tal, radhus främst 1950-tal", href: "/taklaggare-segeltorp" },
      { name: "Fullersta norra", types: "Villor", period: "Mest 1960–1970-tal, villor 1920–1930-tal längs Fullerstavägen", href: "/taklaggare-fullersta" },
      { name: "Snättringe", types: "Mest villor, en del radhus", period: "Villor 1920–1930-tal, radhus tidigt 1960-tal", href: "/taklaggare-snattringe" },
      { name: "Sjödalen södra (Solgård, Sörskogen)", types: "Villor, kedjehus och radhus", period: "Sörskogen: villor och kedjehus 1960-tal, radhus 1970-tal", href: "/taklaggare-solgard-sorskogen" },
      { name: "Östra Skogås och Mörtvik", types: "Villor, radhus och kedjehus", period: "Från slutet av 1970-talet", href: "/taklaggare-skogas" },
    ],
  },
  lidingo: {
    municipality: "Lidingö",
    areas: [
      { name: "Brevik, Käppala och Gåshaga", types: "Villor, kedjehus och radhus", period: "Käppala villastad från 1910-talet, Brevik i huvudsak från 1960-talet, Gåshaga 2000–2020 (Wikipedia)", href: "/taklaggare-brevik-kappala-gashaga" },
      { name: "Sticklinge", types: "Villor", period: "Norra Sticklinge efter stadsplanen 1978, Södra Sticklinge tidigt 1990-tal (Wikipedia)", href: "/taklaggare-sticklinge" },
      { name: "Mölna", types: "Villor, radhus och kedjehus", period: "Främst 1950- och 1960-tal (Wikipedia)", href: "/taklaggare-molna" },
      { name: "Östra Rudboda, Yttringe och Elfvik", types: "Radhus, kedjehus och villor", period: "Östra Rudboda mitten av 1970-talet (Wikipedia)" },
      { name: "Mosstorp", types: "Villor och radhus", period: "Villasamhälle, stadsplan 1913 och 1940-talet (Wikipedia)", note: "Mosstorp är enligt Wikipedia ett utpräglat villasamhälle som började stadsplaneras redan 1907 av Per Olof Hallman, på uppdrag av Lidingö villastad. Stadsplanen för den norra delen fastställdes 1913, och på 1940-talet tillkom planer för de södra delarna." },
      { name: "Bo och Rudboda", types: "Villor, radhus och kedjehus", period: "Rudboda från 1960-talet, Toftvägens radhus 1962–64 (Wikipedia)" },
    ],
  },
  jarfalla: {
    municipality: "Järfälla",
    areas: [
      { name: "Jakobsberg västra", types: "Villor, kedjehus och radhus", period: "Tomter styckade på 1920–30-talet (kommunen), mest 1950–1970-tal (hitta.se)", href: "/taklaggare-jakobsberg" },
      { name: "Fjällen och Fastebol (Viksjö)", types: "Kedjehus, radhus och villor", period: "Fastebol 1966–67, Andeboda 1967–70, Fjällen tidigt 1980-tal (Wikipedia)" },
      { name: "Viksjö västra", types: "Kedjehus, radhus och villor", period: "1969 till tidigt 1980-tal (Wikipedia)", href: "/taklaggare-viksjo" },
      { name: "Barkarby västra och Skälby östra", types: "Villor, inslag av kedjehus och radhus", period: "Tomter styckade från 1926 (kommunen), mest 1950- och 1960-tal (hitta.se)", href: "/taklaggare-barkarby" },
      { name: "Skälby västra", types: "Villor, radhus och kedjehus", period: "Tomter styckade 1921 (kommunen), mest 1950- och 1960-tal (hitta.se)" },
      { name: "Stäket", types: "Villor", period: "Villasamhälle från 1904 (Wikipedia)" },
    ],
  },
  osteraker: {
    municipality: "Österåker",
    areas: [
      { name: "Brevik, Lervik och Flaxenvik", types: "Villor, kedjehus och radhus", period: "Villor mest 1950–1970-tal, Tråsättra 1970- och 1980-tal (hitta.se)", href: "/taklaggare-brevik" },
      { name: "Österskär", types: "Villor och kedjehus", period: "Mest 1970- och 1990-tal (hitta.se), äldre trävillor från sekelskiftet (Wikipedia)", href: "/taklaggare-osterskar" },
      { name: "Stava, Smedby och Sjökarby", types: "Villor och radhus", period: "Mest 1950–1970-tal (hitta.se)", note: "Stava gård nämns i skrift redan på 1200-talet och ägdes under 1500-talet av Clas Eriksson Fleming, som senare blev amiral. Enligt hitta.se är villorna i Stora Stava främst byggda på 1950- och 1960-talen, och radhusen och villorna vid Smedby skolväg på 1960- och 1970-talen." },
      { name: "Skånsta", types: "Radhus, kedjehus och villor", period: "Mest 1960- och 1980-tal (hitta.se)" },
      { name: "Margretelund", types: "Kedjehus och villor", period: "Mest 1970- och 1990-tal (hitta.se)" },
      { name: "Svinninge", types: "Villor", period: "Mest 1950- och 1960-tal (hitta.se), utbyggnad 1990–1995 (Wikipedia)", note: "Svinninge ligger mellan Åkersberga och Vaxholm och växte kraftigt västerut mellan 1990 och 1995, då småorterna Svinninge och Hästängsudd blev en del av tätorten. Enligt hitta.se är villorna i Svinninge främst byggda på 1950- och 1960-talen." },
      { name: "Täljö och Runö", types: "Villor, radhus och kedjehus", period: "Täljö mest 1950- och 1960-tal (hitta.se)" },
      { name: "Rydbo", types: "Villor och radhus", period: "Radhus 1958–59 och 1980-tal (Wikipedia)", note: "Rydbo är en tätort vid Roslagsbanan, omkring tio kilometer från Åkersberga. Enligt Wikipedia består bostäderna av villor i blandade åldrar och två radhusområden, ett från 1958–59 vid Vasavägen och Brahevägen och ett från 1980-talet vid Brovallsvägen." },
      { name: "Söra", types: "Villor och radhus", period: "1970-, 1980- och 1990-tal (Wikipedia)", note: "Söra i Åkersberga består enligt Wikipedia mestadels av villor och radhus byggda på 1970-, 1980- och 1990-talen, en till tre kilometer från Åkersberga centrum." },
      { name: "Tuna (Tunagård)", types: "Villor, inslag av flerbostadshus", period: "Mest 1960- och 1970-tal (hitta.se)", note: "Tunagård är en av två stationer som AB Åkersberga-Trälhavet förlängde järnvägen med, tillsammans med Österskär, och enligt Wikipedia bebyggdes områdena med villor. Enligt hitta.se är flerbostadshusen och villorna kring Uranusvägen främst byggda på 1960- och 1970-talen." },
      { name: "Roslags-Kulla", types: "", period: "", note: "Roslags-Kulla är en småort och kyrkby vid länsväg 276, strax söder om Losjön. I socknen ligger Östanå slott, där huvudbyggnaden uppfördes 1791–1794, och Vira bruk, som anlades omkring 1630 och där större delen av den svenska arméns värjor smiddes fram till 1775. Socknen beskrivs i Wikipedia som en starkt kuperad skogsbygd med sjöar, mossar och odlingsbygd i dalsänkor." },
    ],
  },
  haninge: {
    municipality: "Haninge",
    areas: [
      { name: "Tungelsta", types: "Villor", period: "Station på Nynäsbanan 1901 (Wikipedia)", note: "Tungelsta, en del av Västerhaninge tätort, har enligt Wikipedia traditioner inom trädgårdsnäring med flera handelsträdgårdar, och i utkanterna är bebyggelsen gles med äldre villor på stora tomter. Stationen på Nynäsbanan invigdes 1901." },
      { name: "Vega norra", types: "", period: "", note: "Vega i norra Haninge består enligt Wikipedia huvudsakligen av villor. Namnet kommer från en villa, som ägaren döpte efter fartyget Vega sedan han i april 1880 hade sett det komma till Dalarö, och vägarna fick senare namn med anknytning till Vegaexpeditionen. Enligt Haninge kommun dominerar villor och radhus i utkanten av stadsdelen, medan de höga flerfamiljshusen står närmast pendeltågsstationen." },
      { name: "Årsta havsbad och Gålö", types: "", period: "", note: "Årsta havsbad vid Horsfjärden kom till 1929 som en sommarstad och har enligt Wikipedia omkring 850 stugor. De flesta är sommarstugor, men ett betydande antal har byggts om till eller ersatts av villor, och en del är permanentbostäder. Gålö, nordost om Horsfjärden, är en halvö där nästan hela ytan sedan 2006 är naturreservat." },
    ],
  },
  // Kommuner med godkända områdessidor men utan kommunpost tidigare (2.35, 2026-10-04). Fält ur alla.csv, bara områden med egen sida och känd byggperiod, ingen ny text.
  sundbyberg: {
    municipality: "Sundbyberg",
    areas: [
      { name: "Duvbo, Hästhagen och Tulemarken", types: "Villor", period: "Äldre villor i Duvbo och Hästhagen, funkisvillor i Tulemarken från 1930-talet", href: "/taklaggare-duvbo" },
      { name: "Ursvik och Brotorp", types: "Villor, radhus och nybyggda villor", period: "Lilla Ursvik 1930- och 1950-tal, Brotorp från 2007", href: "/taklaggare-ursvik" },
    ],
  },
  sodertalje: {
    municipality: "Södertälje",
    areas: [
      { name: "Järna centrum och södra delarna", types: "Villor, egnahem och radhus", period: "Sekelskiftet, egnahem 1930–1940-tal, villor 1950–1970-tal, radhus 1980–1990-tal", href: "/taklaggare-jarna" },
      { name: "Pershagen", types: "Villor", period: "Avstyckning från 1905, utbyggnad 1920–1930-tal", href: "/taklaggare-pershagen" },
      { name: "Östertälje", types: "Villor", period: "Till största delen från sekelskiftet och 1960-talet", href: "/taklaggare-ostertalje" },
      { name: "Ragnhildsborg, Ritorp och Viksberg", types: "Villor och radhus", period: "Ritorp kring millennieskiftet, Viksberg mest 2000-tal", href: "/taklaggare-viksberg" },
      { name: "Hölö", types: "Villor", period: "Trävillor från 1910–1920-tal", href: "/taklaggare-holo" },
      { name: "Enhörna: Sandviken", types: "Villor och omvandlade sommarvillor", period: "Sommarvillor från 1890-talet", href: "/taklaggare-enhorna-sandviken" },
    ],
  },
  varmdo: {
    municipality: "Värmdö",
    areas: [
      { name: "Stavsnäs", types: "Villor och fritidshus", period: "Sommarvillor från sent 1800-tal, sommarhus under efterkrigstiden", href: "/taklaggare-stavsnas" },
      { name: "Hemmesta", types: "Villor och radhus", period: "Tätort från 1965, utbyggnad från 1960-talet till 2010", href: "/taklaggare-hemmesta" },
      { name: "Mörtnäs, Korpholmen och Grisslinge", types: "", period: "", note: "Mörtnäs ligger enligt Wikipedia i kuperad terräng med en tydlig dalgång, och bebyggelsen är en blandning av fritidshus och permanentbebodda villor. Sedan 2015 ingår orten i tätorten Gustavsberg. Värmdö kommun har Centrala Mörtnäs och Korpholmen bland sina prioriterade förändringsområden, där kommunalt vatten och avlopp byggs ut och detaljplaner tas fram." },
      { name: "Kopparmora, Evlinge, Älvsala och Bullandö", types: "", period: "", note: "Evlinge, som ingår i tätorten Kopparmora, är enligt Wikipedia från början ett sommarstugeområde från 1950-talet med 330 fastigheter. På halvön Bullandö styckades omkring 140 tomter av under 1970-talet, de flesta för fritidshus, och runt millennieskiftet anlades Seglarbyn med 39 fastigheter. Värmdö kommun har Björkvik, Fagerdala och Bullandö bland sina prioriterade förändringsområden, där kommunalt vatten och avlopp byggs ut och detaljplaner tas fram." },
      { name: "Strömma, Fågelbro och Lillström", types: "", period: "", note: "Strömma ligger runt bron där Värmdöleden går över Strömma kanal, mellan Värmdölandet och Fågelbrolandet. Enligt Wikipedia består bebyggelsen i stort sett bara av villor, och de flesta var från början sommarstugor som nu bebos året om. Värmdö kommun har Lillströmsudd, Hästhagsudd och Gamla Fågelbrovägen bland sina prioriterade förändringsområden, där kommunalt vatten och avlopp byggs ut och detaljplaner tas fram." },
      { name: "Älvsala, Skärmarö och Saltarö", types: "", period: "", note: "Älvsala är en tätort runt Älvsalaviken på den sydöstra delen av Värmdölandet, och Saltarö beskrivs av Wikipedia som ett småhus- och sommarstugeområde. Värmdö kommun planlägger Norra Älvsala i etapper för boende året runt. I etappen Norra Älvsala 2 finns enligt kommunen 115 bostadsfastigheter, där nära hälften har permanentboende, och planen ska bevara karaktären med stora tomter och bostadshus som är inpassade i den kuperade terrängen." },
      { name: "Torsby", types: "", period: "", note: "Torsby ligger vid Torsbyfjärden och räknas sedan 2015 till tätorten Gustavsberg. Länsväg 274 går genom orten, västerut mot Gustavsberg och norrut mot Vaxholm. Värmdö kommun har Torsby bland sina prioriterade förändringsområden. Detaljplanen för delområdet Torsby T3 upphävdes av mark- och miljööverdomstolen 2019, och kommunen prövar därför bygglov där utanför detaljplan, efter riktlinjer från 2022." },
      { name: "Djurö och Vindö", types: "", period: "", note: "Djurö är en tätort i Värmdö kommun på ön med samma namn, med postorten Djurhamn. Kyrkbyn Djurö by är enligt Wikipedia belagd från 1538 och räknas sedan 2015 till tätorten. Djuröbron från Ramsmora vid Stavsnäs blev färdig 1962, och dessförinnan gick en bilfärja från 1932. Genom landhöjningen hänger Djurö ihop med Vindö, som Wikipedia beskriver som en större, ganska tätt bebyggd ö." },
    ],
  },
  "upplands-bro": {
    municipality: "Upplands-Bro",
    areas: [
      { name: "Centrala Kungsängen", types: "Villor, kedjehus och flerbostadshus", period: "Huvudsakligen 1950- och 1960-tal", href: "/taklaggare-kungsangen" },
      { name: "Brunna, Kungsängen", types: "", period: "", note: "Brunna ligger omkring tre kilometer norr om Kungsängens centrum och består enligt Wikipedia till större delen av bostadshus byggda från 1970-talet och framåt, öster om Granhammarsvägen. De norra delarna har huvudsakligen villor och radhus, medan punkthusen står i söder. Enligt hitta.se är husen vid Glasyrvägen och Yllevägen byggda på 1970- och 1980-talen." },
    ],
  },
  vaxholm: {
    municipality: "Vaxholm",
    areas: [
      { name: "Resarö", types: "Villor och kedjehus", period: "Mest 1970-, 1980- och 2000-tal, enstaka från 1920-talet och sekelskiftet", href: "/taklaggare-resaro" },
      { name: "Kullö och Edholma", types: "", period: "", note: "Kullö är en ö och stadsdel i Vaxholm där det enligt Wikipedia finns en ekostadsdel, och den västra delen av ön är sedan 2004 naturreservat. På grannön Edholma började sommarhus byggas 1908, och enligt Wikipedia har ön cirka 100 fritidsboende och fem bofasta." },
    ],
  },
  botkyrka: {
    municipality: "Botkyrka",
    areas: [
      { name: "Tullinge", types: "Villor och radhus", period: "Villastad kring sekelskiftet 1900, radhus mest 1965–1975 (Wikipedia)", note: "Tullinge planerades enligt Wikipedia som villastad kring sekelskiftet 1900, med Jacob Tegnér som drivande, och fick en egen hållplats 1903 när stambanan byggdes ut till dubbelspår. De flesta av dagens radhusområden byggdes mellan 1965 och 1975." },
      { name: "Grödinge och Kagghamra", types: "", period: "", note: "Grödinge ligger på Södertörn, med Hallsfjärden och Järnafjärden i väster och Kaggfjärden i söder, och beskrivs i Wikipedia som dalgångsbygd omgiven av sjörik och kuperad skogsbygd. Kagghamra tomtområde vid Kaggfjärden består enligt Wikipedia av ungefär 200 fritidshus på tomter om 2 000–3 000 kvadratmeter, där några på senare år har blivit bostäder av mer permanent karaktär. Enligt hitta.se är husen i Kagghamra främst från 1960- och 2000-talen." },
      { name: "Vårsta", types: "", period: "", note: "Vårsta ligger vid Malmsjön i Grödinge, i den sydligaste delen av tätorten Tumba. Bostadsområdet bildades enligt Wikipedia under 1950- och 1960-talen, då främst med småhus, och under senare delen av 1960-talet växte området Bremora fram i nordväst med radhus, kedjehus och lägenheter. Husen är alltså i dag omkring 55–75 år gamla, och taken kan redan ha lagts om." },
    ],
  },
  sigtuna: {
    municipality: "Sigtuna",
    areas: [
      { name: "Til och Munkholmen", types: "", period: "", note: "Til är en stadsdel i Sigtuna, öster om Garnsviken, som enligt Wikipedia mest består av villaområden. Söder om Til ligger bostadsområdet Munkholmen, med ett naturreservat på fyra hektar vid Sigtunafjärden som har varit skyddat sedan 1965. Enligt hitta.se är husen i Til främst från 1960- och 1970-talen." },
    ],
  },
  solna: {
    municipality: "Solna",
    areas: [
      { name: "Råsunda södra villastad", types: "", period: "", note: "Råsunda södra villastad ligger invid platsen för den gamla Råsundastadion. Enligt Wikipedia bestod området från början av villor som byggdes i samband med de olympiska sommarspelen 1912, och det utökades senare med fler egnahems- och direktörsvillor. Det avgränsas i söder av Ekensbergskyrkan och i norr av Råsundaskolan och kvarteret Bollen. De första villorna är i dag närmare 115 år gamla, och taken kan redan ha lagts om, kanske flera gånger." },
    ],
  },
};

/** Platt text för förrenderingen (samma innehåll som React-sektionen). */
export const villaAreasParagraph = (key: string): string | null => {
  const data = villaAreasByPage[key];
  if (!data) return null;
  const rows = data.areas.map((a) =>
    a.note ? `${a.name}: ${a.note}` : `${a.name}: ${a.types.toLowerCase()}, ${a.period.charAt(0).toLowerCase()}${a.period.slice(1)}.`,
  );
  return `Villaområden i ${data.municipality}. ${rows.join(" ")} ${VILLA_AREAS_SOURCE}`;
};
