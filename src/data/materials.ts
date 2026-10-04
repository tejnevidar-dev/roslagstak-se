/**
 * Materialbibliotek (SEO-programmet Phase 2.5). Innehåll granskat och godkänt av Marknadschefen,
 * källa: ledning/marknad/innehall/materialbibliotek-utkast.md. Bara allmänt belagd takkunskap —
 * inga livslängdssiffror eller priser (kostnadsdrivare länkar till /priser, som Vidar godkänt).
 *
 * Lertegel och dubbelfalsat plåttak har redan egna, live sidor (/tjanster/tegeltak och
 * /tjanster/platarbeten#falsat) — de får INTE en dubblettsida här, bara ett hubbkort som länkar dit.
 * Betongpannor, TP20, papptak och underlagstak (underlagspapp/råspont) är egna sidor
 * (`href` pekar internt, `detail` är satt).
 */

export interface MaterialDetail {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  funktion: string;
  anvandning: string;
  livslangd: string;
  fordelar: string;
  nackdelar: string;
  passarNar: string;
  underhall: string;
  vanligaFel: string;
  kostnadsdrivare: string;
  delAvTaksystemet: string;
  hosOss?: string;
  hallIsar?: string;
}

export interface Material {
  slug: string;
  href: string;
  title: string;
  hubDescription: string;
  weight: "Tungt" | "Lätt";
  visibleScrews: "Nej" | "Ja";
  minLutning: string;
  detail?: MaterialDetail;
}

export const materials: Material[] = [
  {
    slug: "betongpannor",
    href: "/material/betongpannor",
    title: "Betongpannor",
    hubDescription: "Klassiskt pannat tak, tungt.",
    weight: "Tungt",
    visibleScrews: "Nej",
    minLutning: "Enligt tillverkaren",
    detail: {
      metaTitle: "Betongpannor – egenskaper, för- och nackdelar",
      metaDescription:
        "Betongpannor är ett vanligt val på svenska villatak. Så fungerar de, vad som talar för och emot och vad du ska tänka på vid ett takbyte.",
      intro:
        "Betongpannor är gjutna pannor som ger ett klassiskt pannat tak. De är tunga, så konstruktionen behöver klara vikten.",
      funktion:
        "Pannor av betong som läggs på bärläkt över ströläkt och underlag. Pannorna leder bort vattnet, och underlaget är det andra skyddet.",
      anvandning:
        "Sadeltak och andra lutande tak på villor och fritidshus. Kräver en viss minsta taklutning, som tillverkaren anger.",
      livslangd:
        "Lång vid rätt montage och skötsel. Ytskiktet kan åldras och bli poröst med tiden. Tillverkarens uppgifter och garantier gäller.",
      fordelar:
        "Klassiskt pannat utseende, finns i flera kulörer (till exempel svart eller rött), enskilda pannor kan bytas.",
      nackdelar:
        "Tunga, så takstolarna behöver klara vikten. Har huset haft ett lättare tak kan bärigheten behöva bedömas av en konstruktör. Ytan kan få påväxt av mossa och lav i skuggiga, fuktiga lägen.",
      passarNar:
        "Du vill ha ett traditionellt pannat tak och huset tål vikten.",
      underhall:
        "Håll hängrännor och ränndalar rena, ta hand om mossa skonsamt och byt enstaka trasiga pannor.",
      vanligaFel:
        "Spruckna eller förskjutna pannor efter storm eller frost, lösa nockpannor, felaktigt lagda pannor runt genomföringar.",
      kostnadsdrivare:
        "Takets storlek och form, antal genomföringar och detaljer, underlagets skick, ställning och åtkomst.",
      delAvTaksystemet:
        "Underlag, ströläkt, bärläkt, pannor, nockpannor, plåtdetaljer (fotplåt, vindskivor, skorstensbeslag) och avvattning.",
      hosOss: "Svarta betongpannor från Benders på Blidö, Norrtälje, och röda betongpannor på Singö, Grisslehamn.",
    },
  },
  {
    slug: "lertegel",
    href: "/tjanster/tegeltak",
    title: "Lertegel",
    hubDescription: "Det klassiska teglet, åldras med patina.",
    weight: "Tungt",
    visibleScrews: "Nej",
    minLutning: "Enligt tillverkaren",
  },
  {
    slug: "tp20-plattak",
    href: "/material/tp20-plattak",
    title: "TP20-plåttak",
    hubDescription: "Lätt profilplåt som läggs i långa längder.",
    weight: "Lätt",
    visibleScrews: "Ja",
    minLutning: "Enligt tillverkaren",
    detail: {
      metaTitle: "TP20 plåttak – egenskaper, för- och nackdelar",
      metaDescription:
        "TP20 är en trapetsprofilerad takplåt. Så fungerar den, var den passar och vad du ska tänka på jämfört med pannor och falsat.",
      intro:
        "TP20 är en trapetsprofilerad takplåt. Den är lätt och läggs i långa längder.",
      funktion:
        "Trapetsprofilerad plåt i långa längder som skruvas på läkt över underlag. Profilen ger styvhet och leder bort vattnet.",
      anvandning:
        "Villor, fritidshus, garage och uthus, samt lägre takdelar och tillbyggnader. Klarar lägre lutningar än pannor (tillverkarens anvisning gäller).",
      livslangd:
        "Beror främst på ytbehandlingen. Tillverkarens uppgifter gäller.",
      fordelar:
        "Lätt jämfört med pannor, läggs i långa längder, finns i flera kulörer, fungerar på lägre lutningar.",
      nackdelar:
        "Skruvarna går igenom plåten och är synliga. Rostskydd och skarvar är avgörande. Hur mycket ett plåttak [hörs när det regnar](/blogg/platttak-ljud-regn-skargardshus) beror på vad som finns under plåten.",
      passarNar:
        "Du vill ha ett lätt tak, har låg lutning eller vill ha plåttakets uttryck, eller på lägre takdelar i kombination med pannor.",
      underhall: "Kontrollera skruvar, skarvar och ytbehandling, och åtgärda repor och rost tidigt.",
      vanligaFel: "Lösa eller felmonterade skruvar, rost i skarvar och kanter, skadad ytbehandling.",
      kostnadsdrivare: "Takyta, detaljer och genomföringar, plåtdetaljer, underlag och åtkomst.",
      delAvTaksystemet: "Underlag, läkt, TP20-plåt, nockplåt, fotplåt, vindskiveplåt och avvattning.",
      hosOss:
        "Röd TP20-plåt på de lägre delarna av huset på Singö, Grisslehamn, i kombination med röda betongpannor på huvudtaket.",
      hallIsar:
        "TP20 (trapetsprofilerad plåt) är inte samma sak som dubbelfalsat plåttak (bandtäckning) — falsat har dolda fästen i stället för synliga skruvar.",
    },
  },
  {
    slug: "dubbelfalsat",
    href: "/tjanster/platarbeten#falsat",
    title: "Dubbelfalsat plåttak",
    hubDescription: "Bandtäckning utan synliga skruvar.",
    weight: "Lätt",
    visibleScrews: "Nej",
    minLutning: "Enligt tillverkaren",
  },
  {
    slug: "papptak",
    href: "/material/papptak",
    title: "Papptak",
    hubDescription: "Tätt och lätt, för låglutande tak.",
    weight: "Lätt",
    visibleScrews: "Nej",
    minLutning: "Enligt tillverkaren",
    detail: {
      metaTitle: "Papptak – takpapp för låglutande tak, för- och nackdelar",
      metaDescription:
        "Papptak är ett lätt och tätt tak för flacka och låglutande tak. Så fungerar takpapp, när den passar och vad du ska tänka på vid omläggning.",
      intro:
        "Papptak är ett tätt, lätt tak av takpapp och ett av få material som fungerar på riktigt flacka tak. Du hittar det på garage, carportar, uthus och tillbyggnader, men också på hela villor med låg taklutning. Till skillnad från pannor och profilplåt bygger papptaket på att hela ytan är ett sammanhängande tätskikt.",
      funktion:
        "Takpapp är en duk av glasfiber eller polyester som har impregnerats och belagts med bitumen. Den läggs direkt på ett fast underlag, oftast råspont, i våder som överlappar varandra. Skarvarna fogas så att ytan blir tät. Beroende på system läggs taket i ett eller flera lager, med en underpapp under en ytpapp. Ytpappen har ofta ett skikt av skiffer eller granulat på ovansidan, som skyddar mot solens UV-ljus och ger taket dess färg.",
      anvandning:
        "Flacka och låglutande tak, där pannor inte kan läggas för att vattnet inte rinner av tillräckligt snabbt. Papptak används på garage, carportar, förråd, uthus och tillbyggnader, och på bostadshus med låg lutning. Vilka lutningar ett visst papptakssystem är gjort för anger tillverkaren.",
      livslangd:
        "Beror på pappens kvalitet, antal lager, taklutning, sol och hur väl avvattningen fungerar. Ytpapp åldras främst av solljus och av vatten som blir stående. Tillverkarens uppgifter och garantier gäller.",
      fordelar:
        "Lätt material som inte belastar takstolarna som pannor gör. Fungerar på flacka tak där andra material inte kan användas. Ytan blir sammanhängande utan fogar mellan pannor eller skruvar genom materialet. Enklare byggnader och tillbyggnader kan få ett tätt tak utan en tung konstruktion.",
      nackdelar:
        "Hela tätheten hänger på skarvarna och anslutningarna, så arbetet måste vara noggrant utfört. Solen och vatten som blir stående sliter på ytan. Uttrycket är enklare än ett pannat tak eller ett falsat plåttak. Skador på ytan, till exempel från nedfallna grenar, behöver åtgärdas tidigt.",
      passarNar:
        "Taket är flackt eller har låg lutning, byggnaden är lätt i konstruktionen (garage, carport, uthus, tillbyggnad), eller huset har papptak i dag och ska få ett nytt tätt tak av samma slag.",
      underhall:
        "Se till att vatten inte blir stående på taket: rensa hängrännor, brunnar och utkastare, och ta bort löv och grenar. Titta efter blåsor, sprickor, lösa skarvar och partier där skiffret har släppt. Mossa tas bort skonsamt, aldrig med högtryckstvätt. Läs mer om igensatta hängrännor.",
      vanligaFel:
        "Läckage vid skarvar och vid anslutningar mot vägg, skorsten och genomföringar. Stående vatten på flacka partier. Åldrad ytpapp med sprickor eller blåsor. Fuktskador i råsponten under när läckaget har pågått länge, se rutten råspont och dålig underlagspapp.",
      kostnadsdrivare:
        "Takets storlek, antal lager, anslutningar och genomföringar, avvattningen, råspontens skick och om ställning behövs.",
      delAvTaksystemet:
        "Råspont, underpapp och ytpapp (beroende på system), anslutningar och plåtdetaljer (fotplåt, vindskivor) och avvattning. Vid ett takbyte kan råsponten ses över när den gamla pappen är borta.",
      hallIsar:
        "Ytpapp på ett papptak är det synliga tätskiktet. Underlagspapp under pannor eller plåt är ett dolt andra skydd på andra taktyper, se betongpannor och TP20.",
    },
  },
  {
    slug: "underlagstak",
    href: "/material/underlagstak",
    title: "Underlagspapp och råspont",
    hubDescription: "Takets andra skydd, under pannorna och plåten.",
    weight: "Lätt",
    visibleScrews: "Nej",
    minLutning: "–",
    detail: {
      metaTitle: "Underlagspapp och råspont – takets underlag förklarat",
      metaDescription:
        "Under pannor och plåt ligger takets andra skydd: råspont och underlagspapp. Så fungerar underlaget, när det byts och varför det avgör om taket håller tätt.",
      intro:
        "Det du ser av ett tak är pannorna eller plåten. Det som håller huset torrt när en panna spricker, när snö blåser in eller när kondens bildas på undersidan är lagret under: underlaget. På de flesta villatak består det av råspont med en underlagspapp eller underlagsduk ovanpå. Underlaget syns aldrig från marken, men det är det som avgör om ett tak behöver lagas, läggas om eller bytas.",
      funktion:
        "Råsponten är ett sammanhängande brädgolv av spontade brädor som spikas på takstolarna. Den bär upp resten av taket och ger något att fästa i. Ovanpå den ligger underlagspappen eller underlagsduken, som är takets vattentäta skikt. På den spikas ströläkt i takfallets riktning, så att vatten som tar sig förbi ytmaterialet kan rinna ner mot takfoten, och på ströläkten ligger bärläkten som pannorna eller plåten fästs i. Ytmaterialet tar det mesta av vädret. Underlaget tar hand om resten.",
      anvandning:
        "Under betongpannor, lertegel och profilerad plåt på lutande tak. Falsat plåttak läggs också på ett fast underlag med ett underlagsmaterial under plåten. På ett papptak fungerar det annorlunda: där ligger takpappen direkt på råsponten och är själv det synliga tätskiktet. Vilket underlagsmaterial som passar beror på ytmaterialet och taklutningen, och tillverkarens anvisningar gäller.",
      livslangd:
        "Underlaget ligger skyddat under ytmaterialet, men det åldras ändå av värme, kyla och fukt. Hur länge det håller beror på materialet, på hur väl taket är ventilerat och på om ytmaterialet har släppt igenom vatten under lång tid. Ofta är det underlaget, inte pannorna, som avgör när ett tak behöver göras om. Tillverkarens uppgifter och garantier gäller.",
      fordelar:
        "Ett helt underlag ger taket två skydd i stället för ett. En sprucken panna eller en plåt som har släppt behöver då inte betyda att vatten kommer in i huset. Råsponten ger ett fast underlag att arbeta på och fästa i, och den ger taket stadga.",
      nackdelar:
        "Underlaget går inte att se eller bedöma från marken, och skador upptäcks ofta sent, först när fukt syns på vinden eller i innertaket. Det går inte att byta underlagspappen utan att lyfta bort ytmaterialet och läkten. Därför görs det normalt i samband med en omläggning eller ett takbyte, inte som en egen åtgärd.",
      passarNar:
        "Frågan är sällan om taket ska ha ett underlag, utan om det befintliga håller. Underlagspapp och läkt byts när taket läggs om. Råsponten bedöms när taket är öppet: är den torr och frisk kan den ligga kvar, är den fuktskadad byts de delar som har tagit skada. På Blidö i Norrtälje behölls den befintliga råsponten när huset fick nytt underlag, ny läkt och nya betongpannor. På Singö i Grisslehamn byttes delar av råsponten.",
      underhall:
        "Underlaget sköts genom att resten av taket sköts. Byt trasiga pannor innan vatten hinner rinna in under lång tid, håll hängrännor och ränndalar rena och se till att vinden är ventilerad så att fukt kan vädras ut. Titta på vinden någon gång om året, gärna efter regn: mörka fläckar, droppmärken eller mjukt trä på råspontens undersida är tecken som ska tas på allvar.",
      vanligaFel:
        "Underlagspapp som har blivit spröd och spruckit, vilket ofta märks som läckage på flera ställen samtidigt. Läs mer om dålig underlagspapp. Råspont som har blivit mörk, mjuk eller rutten efter ett läckage som har pågått länge, se rutten råspont. Läkt som har ruttnat så att pannorna inte längre ligger stadigt. Kondens på råspontens undersida när vinden är dåligt ventilerad.",
      kostnadsdrivare:
        "Takets storlek och form, hur mycket av råsponten som behöver bytas, antalet genomföringar och anslutningar och åtkomsten. Hur mycket råspont som måste bytas syns ofta först när taket är öppet.",
      delAvTaksystemet:
        "Takstolar, råspont, underlagspapp eller underlagsduk, ströläkt, bärläkt och sedan ytmaterialet, med plåtdetaljer och avvattning. Vid en takomläggning eller ett takbyte byts underlagspapp och läkt, och råsponten ses över när det gamla taket är borta.",
      hosOss:
        "Vid ett takbyte byts underlag och läkt, och råsponten bedöms när taket är öppet. På Blidö behölls den, och på Singö byttes delar av den. Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
      hallIsar:
        "Underlagspapp ligger dold under pannor eller plåt och är takets andra skydd. Takpapp (ytpapp) på ett papptak är själva det synliga taket. Råspont är brädlagret under pappen, och läkt är reglarna ovanpå som pannorna vilar på.",
    },
  },
  {
    slug: "pannplat",
    href: "/material/pannplat",
    title: "Pannplåt",
    hubDescription: "Plåt med pannans form, lätt.",
    weight: "Lätt",
    visibleScrews: "Ja",
    minLutning: "Enligt tillverkaren",
    detail: {
      metaTitle: "Pannplåt – tegelprofilerad plåt, för- och nackdelar",
      metaDescription: "Pannplåt är stålplåt pressad i takpannans form. Så fungerar materialet, när det passar, vad som skiljer det från lertegel och vad du ska tänka på.",
      intro: "Pannplåt är takplåt av stål som har pressats så att den ser ut som ett tak av takpannor. Den kallas också tegelprofilerad plåt eller tegelplåt. Materialet ger ett tak med pannans vågiga form och skuggor, men med plåtens låga vikt. Det gör pannplåt till ett alternativ när man vill behålla uttrycket av ett pannat tak utan att belasta konstruktionen som pannor gör.",
      funktion: "Plåten levereras i skivor som täcker flera pannrader och flera pannor i bredd på en gång. Skivorna läggs på läkt över ett underlagstak och skruvas fast genom plåten med skruvar som har tätningsbricka. Skivorna överlappar varandra i sidled och i längsled, så att vattnet rinner från skiva till skiva ner mot takfoten. Vid nock, takfot, gavlar, ränndalar och genomföringar ansluts plåten med beslag som är anpassade efter profilen. Plåten har en ytbeläggning som ger färgen och skyddar stålet.",
      anvandning: "Lutande tak på villor, fritidshus, garage och uthus. Pannplåt används både vid nybyggnad och när ett äldre tak ska bytas, särskilt när huset har haft pannor och man vill ha kvar samma uttryck. Vilka taklutningar en viss profil är gjord för anger tillverkaren.",
      livslangd: "Beror på plåtens ytbeläggning, läget, hur infästningar och beslag är utförda och hur taket sköts. Det är ytbeläggningen som skyddar stålet, så skador i den bör åtgärdas innan rost får fäste. Tillverkarens uppgifter och garantier gäller.",
      fordelar: "Lätt material som inte belastar takstolarna som betongpannor eller lertegel gör. Stora skivor gör att takytan täcks snabbt. Formen liknar ett pannat tak, vilket passar hus där ett slätt plåttak skulle ge ett annat uttryck. Det finns inga lösa pannor som kan glida eller blåsa av en och en. Ytan är slät, vilket ger mossa sämre fäste än på en sträv panna.",
      nackdelar: "Skruvarna går igenom plåten, och varje skruv är en punkt som måste vara rätt dragen och tät. Kapade kanter och repor i ytbeläggningen är känsliga för rost. Regn och hagel hörs mer mot plåt än mot pannor, hur mycket beror på underlaget och isoleringen. På nära håll syns att det är plåt och inte pannor. En skadad skiva byts som en hel skiva, inte panna för panna.",
      passarNar: "Du vill ha ett tak som ser ut som ett pannat tak men väger lite, till exempel när konstruktionen inte är byggd för tunga pannor. Du byter från pannor och vill behålla husets uttryck. Taket har en enkel form med få vinklar och genomföringar, där de stora skivorna kommer till sin rätt.",
      underhall: "Titta över taket från marken en gång om året och efter hårt väder: lösa eller saknade skruvar, beslag som har rört sig, repor och begynnande rost. Håll taket fritt från löv och grenar som blir liggande i profilens dalar. Rensa hängrännorna så att vattnet kommer undan, se igensatta hängrännor. Gå inte på taket själv: plåten är hal och profilen kan bucklas av felaktig belastning.",
      vanligaFel: "Läckage vid skruvar som har dragits snett, för hårt eller för löst, eller där tätningsbrickan har åldrats. Rost vid kapade kanter, repor och runt infästningar, se rostig plåt. Otäta anslutningar mot skorsten, vägg och genomföringar, där profilen gör tätningen svårare än på en plan yta. Läs mer om läckande plåttak.",
      kostnadsdrivare: "Takets storlek och form, antalet vinklar, ränndalar och genomföringar, val av ytbeläggning, underlagets skick och om hängrännor och plåtdetaljer byts samtidigt.",
      delAvTaksystemet: "Underlagstak, läkt, pannplåt, skruv med tätningsbricka, nock- och gavelbeslag, fotplåt, ränndalar, genomföringar och avvattning. Vid ett takbyte byts underlag och läkt, och råsponten kan ses över när det gamla taket är borta.",
      hallIsar: "Pannplåt (tegelprofilerad plåt) är plåt som är pressad för att likna takpannor. Lertegel är pannor av bränd lera, läs mer på tegeltak. Betongpannor är gjutna pannor, se betongpannor. TP20 är trapetsprofilerad plåt med raka åsar i stället för pannform, se TP20. Dubbelfalsat plåttak har dolda infästningar och inga synliga skruvar, se plåtarbeten.",
    },
  },
];

/** Länk till prisankaret på /priser för ett material, med länktexten "<material> pris" (sökordsägare, Marknadschefen 2026-10-04). */
export const MATERIAL_PRIS_LANK: Record<string, { label: string; to: string }> = {
  betongpannor: { label: "Betongpannor pris", to: "/material/betongpannor#pris" },
  lertegel: { label: "Tegeltak pris", to: "/tjanster/tegeltak#pris" },
  "tp20-plattak": { label: "Plåttak pris", to: "/material/tp20-plattak#pris" },
  pannplat: { label: "Pannplåt pris", to: "/material/pannplat#pris" },
  dubbelfalsat: { label: "Dubbelfalsat pris", to: "/tjanster/platarbeten#pris" },
  papptak: { label: "Papptak pris", to: "/material/papptak#pris" },
};

export const getMaterial = (slug: string) => materials.find((m) => m.slug === slug && m.detail);

/** Giltiga material-slugs, för att typa Project.materialSlugs i src/data/projects.ts. */
export type MaterialSlug = (typeof materials)[number]["slug"];
