/**
 * Build-time content model for the static prerender.
 *
 * The app is a client-rendered SPA, so crawlers that do not execute JS see an
 * empty <div id="root">. This module returns the *important* text for every
 * route (H1, intro, body paragraphs, key internal links) so the build can put
 * it straight into the initial HTML. React clears #root on mount, so the same
 * content is then rendered by the app itself — no duplication, no cloaking:
 * the prerendered text is the same text the visitor sees.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../src/data/locations";
import { generateCombos } from "../src/data/service-location-combos";
import { blogPosts } from "../src/data/blog-posts";
import { regionBySlug, regionIntros, regionLongText, regionSlugs } from "../src/data/regions";

export interface PrerenderPage {
  h1: string;
  intro: string;
  paragraphs: string[];
  links: { href: string; label: string }[];
  /** Unique <title> for the static HTML (before JS runs). Mirrors SEOHead. */
  title?: string;
  /** Unique meta description for the static HTML. */
  description?: string;
}

/* Services live in a React component; read the data with a regex so the
   prerender never has to bundle JSX or lucide-react. */
const servicesSource = readFileSync(resolve("src/components/Services.tsx"), "utf8");
const services = [
  ...servicesSource.matchAll(
    /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",[\s\S]*?description:\s*\n?\s*"([^"]+)"/g,
  ),
].map((m) => ({ slug: m[1], title: m[2], description: m[3] }));

const PHONE = "070-154 36 39";

const primaryLinks = [
  { href: "/", label: "Hem" },
  { href: "/priser", label: "Priser för takarbeten" },
  { href: "/blogg", label: "Guider om tak" },
  { href: "/recensioner", label: "Recensioner" },
  { href: "/kontakt", label: "Boka kostnadsfri rådgivning" },
];

const serviceLinks = services.map((s) => ({
  href: `/tjanster/${s.slug}`,
  label: s.title,
}));

const locationLinks = locations.map((l) => ({
  href: `/taklaggare-${l.slug}`,
  label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
}));

const combos = generateCombos();
const comboByUrl = new Map(combos.map((c) => [c.url, c]));

const home: PrerenderPage = {
  h1: "Takläggare i Roslagen — takbyte & takrenovering",
  intro:
    "RoslagsTak är takläggare i Roslagen med bas på Blidö. Vi utför takbyte, takrenovering, takomläggning, plåtarbeten och taktvätt i hela Roslagen och Stockholms norra skärgård — 10 års garanti och ROT-avdrag.",
    paragraphs: [
      "Vi arbetar med TP20 plåttak, dubbelfalsat plåttak (bandtäckning), tegelplåt, pannplåt, betongpannor, lertegel och papptak. Allt arbete utförs enligt AMA-standard av certifierade och försäkrade takläggare.",
      "Som skärgårdsspecialister hanterar vi all materialtransport och logistik till öar utan broförbindelse — från Blidö, Yxlan och Ljusterö till Husarö, Finnhamn, Ingmarsö, Svartlöga och Arholma.",
      "Sedan 2026 arbetar vi även i hela Storstockholm — från Täby, Danderyd och Sollentuna i norr till Nacka, Huddinge och Södertälje i söder. Samma fasta priser, samma garanti och samma kontaktperson genom hela projektet.",
      "Ett komplett takbyte hos oss innehåller allt: rivning av gamla taket, byte av råspont och underlagspapp vid behov, ny läkt, tätskikt, plåtbeslag kring skorsten och genomföringar, taksäkerhet samt städning och bortforsling. Du får en kontaktperson som följer projektet från besiktning till slutgenomgång.",
      "Varje moment dokumenteras med foton som du får ta del av. Efter slutförd besiktning får du garantihandlingar: 10 års utförandegaranti och 30 års materialgaranti på plåttak.",
      `Begär kostnadsfri besiktning och offert. Vi återkopplar inom 24 timmar. Ring ${PHONE} eller boka rådgivning på /kontakt.`,
    ],
  links: [...primaryLinks, ...serviceLinks, ...locationLinks],
};

const staticPages: Record<string, PrerenderPage> = {
  "/": home,
  "/offert": {
    title: "Offert på takbyte — fast pris efter besiktning",
    description:
      "Räkna fram ett prisförslag på takbyte direkt, eller boka kostnadsfri besiktning. Fast pris, 10 års utförandegaranti och återkoppling inom 24 timmar.",
    h1: "Få offert på takbyte i Roslagen",
    intro:
      "Räkna fram ett prisförslag på ditt takbyte direkt i konfiguratorn, eller boka kostnadsfri rådgivning och besiktning på plats.",
    paragraphs: [
      "Välj taktyp, ange takets yta och lutning och få ett riktpris direkt. Vi lämnar alltid fast pris efter kostnadsfri besiktning — med 10 års utförandegaranti och 30 års materialgaranti.",
      "I offerten ingår allt som behövs för ett komplett takbyte: rivning och bortforsling av gamla taket, kontroll och byte av råspont och underlagspapp, ny strö- och bärläkt, valt tätskikt, kompletta plåtbeslag kring skorsten, ventiler och genomföringar, samt taksäkerhet i form av takstege, gångbrygga och nockfästen.",
      "Så går det till: du skickar in förfrågan, vi återkopplar inom 24 timmar och bokar en kostnadsfri besiktning. På plats mäter vi taket, kontrollerar underlaget och pratar igenom materialval. Därefter får du en skriftlig offert med fast pris — det priset gäller, utan tillägg.",
      "När du accepterat offerten planerar vi startdatum, beställer material och håller dig uppdaterad genom hela projektet. Efter slutbesiktning får du garantihandlingar och foton från varje moment.",
      "Vanliga frågor om offerten: Är besiktningen verkligen gratis? Ja, besiktning och offert är alltid kostnadsfria och du förbinder dig inte till något. Hur länge gäller offerten? Normalt 30 dagar. Kan jag ändra materialval efter offerten? Ja, fram tills materialet är beställt justerar vi kostnadsfritt.",
      "Vi tar uppdrag i hela Roslagen och Storstockholm — från Norrtälje, Vaxholm och Österåker till Täby, Sollentuna, Nacka och öarna i skärgården. Även öar utan broförbindelse ingår, vi löser båttransporten som en del av projektet.",
      "Offerten specificerar alltid arbetskostnaden separat så att ROT-avdraget är tydligt. Vi sköter ansökan åt dig och drar av beloppet direkt på fakturan.",
      "Hur lång tid tar ett takbyte? Ett normalt villatak tar 1–3 veckor från att ställningen resas tills slutbesiktningen är klar, beroende på storlek, väder och underlagets skick. Fritidshus och enklare tak går ofta snabbare. Du får en tidsplan i offerten och löpande uppdateringar om något ändras.",
      "Vad händer om vi hittar skador under arbetet? Om råspont eller takstolar visar sig vara skadade stannar vi upp, dokumenterar med foton och återkommer med ett fast pris på tillägget innan vi fortsätter. Du får aldrig en överraskning på slutfakturan.",
      `Föredrar du att prata? Ring ${PHONE} och beskriv ditt takprojekt, vi återkopplar inom 24 timmar.`,
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/taktyper": {
    title: "Taktyper — plåttak, tegel och betongpannor",
    description:
      "Jämför TP20, pannplåt, tegelplåt, dubbelfalsat plåttak, lertegel, betongpannor och papptak — livslängd, kostnad och vad som passar ditt hus.",
    h1: "Taktyper — plåttak, tegel och betongpannor",
    intro:
      "Jämför taktyper inför ditt takbyte: TP20, pannplåt, tegelplåt, dubbelfalsat plåttak (bandtäckning), lertegel, betongpannor, glaserade pannor och papptak.",
    paragraphs: [
      "Plåttak är lätt, snabbt att montera och passar de flesta hus i kustnära klimat. Dubbelfalsad bandtäckning har längst livslängd (50+ år). Betongpannor och lertegel ger klassisk karaktär men kräver bärande konstruktion för högre vikt.",
      "Vi hjälper dig välja material utifrån husets konstruktion, taklutning, väderutsatthet och budget — och sköter transport till öar utan broförbindelse.",
      "TP20-plåttak: det populäraste valet för fritidshus och villor i Roslagen. Prisvärt, lätt (4–5 kg/m²) och håller 30–40 år med minimalt underhåll. Finns i många kulörer och monteras snabbt.",
      "Dubbelfalsat plåttak (bandtäckning): premiumvalet med falsade fogar utan synliga skruvar. Helt vattentätt även i storm och slagregn. Livslängd 50–70 år i stål, längre i aluminium och koppar.",
      "Tegelplåt och pannplåt: plåtprofiler som imiterar tegel och pannor. Traditionellt utseende med plåtens fördelar — lägre vikt, lägre pris och enklare transport till öar.",
      "Betongpannor: beprövat och prisvärt med 30–50 års livslängd. Passar de flesta hustyper på fastlandet. Kräver minst 22 graders taklutning och en konstruktion som tål 40–50 kg/m².",
      "Lertegel: det klassiska valet för äldre hus och kulturbyggnader. Kan hålla över 100 år och ger husets karaktär ett oersättligt uttryck.",
      "Papptak: för platta och låglutande tak på garage, tillbyggnader och funkishus. Modern SBS-papp håller 25–35 år när den läggs rätt.",
      "Osäker på vad som passar ditt hus? Boka en kostnadsfri besiktning — vi tittar på konstruktion, lutning och läge och ger dig en ärlig rekommendation med fast pris.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/hur-det-gar-till": {
    title: "Så går ett takbyte till — steg för steg",
    description:
      "Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager, med dokumentation och slutbesiktning.",
    h1: "Så går ett takbyte till — steg för steg",
    intro:
      "Från råspont till färdigt plåtbeslag: se hur ett komplett takbyte byggs upp lager för lager.",
    paragraphs: [
      "Ordningen är råspont, underlagspapp, hängrännor och stuprör, vindskivor, ströläkt och bärläkt, takpannor eller plåt, samt avslutande plåtbeslag kring skorsten och genomföringar.",
      "Varje moment dokumenteras och kontrolleras. Du får löpande återkoppling under projektet och slutbesiktning innan vi lämnar arbetsplatsen.",
      "Steg 1 — besiktning och offert: vi inspekterar taket på plats, dokumenterar med foton och lämnar en skriftlig offert med fast pris inom några dagar. Kostnadsfritt och utan förbindelser.",
      "Steg 2 — planering och material: när du accepterat offerten bokar vi startdatum och beställer materialet. Du får en tidplan och en fast kontaktperson.",
      "Steg 3 — ställning och skydd: vi reser ställning, skyddar fasad, rabatter och utemöbler med presenningar och skyddsplast.",
      "Steg 4 — rivning: gamla taket rivs och sorteras för återvinning. Råsponten inspekteras — skador dokumenteras och prisas separat innan vi fortsätter.",
      "Steg 5 — underlag: ny underlagspapp, ströläkt och bärläkt läggs. Ventilationen kontrolleras och åtgärdas vid behov.",
      "Steg 6 — tätskikt och beslag: det nya taket monteras tillsammans med plåtbeslag kring skorsten, ventiler och genomföringar, plus taksäkerhet och takavvattning.",
      "Steg 7 — städning och slutbesiktning: vi städar tomten, går igenom hela arbetet tillsammans med dig och lämnar över garantihandlingar och fotodokumentation.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/priser": {
    title: "Priser för takbyte och takrenovering",
    description:
      "Riktpriser för takarbeten: plåttak från 1 200 kr/m², bandtäckning från 2 000 kr/m², taktvätt 80–150 kr/m². Fast pris efter kostnadsfri besiktning.",
    h1: "Vad kostar takbyte och takrenovering i Roslagen?",
    intro:
      "Riktpriser för alla typer av takarbeten i Roslagen. Alla priser inkluderar material och arbete, och ROT-avdrag ger 30 % rabatt på arbetskostnaden.",
    paragraphs: [
      "TP20 plåttak från ca 1 200 kr/m². Tegelprofilerad plåt och betongpannor från ca 1 300–1 400 kr/m². Dubbelfalsat plåttak (bandtäckning) från ca 2 000 kr/m². Taktvätt 80–150 kr/m² och takmålning från ca 150 kr/m².",
      "Priset styrs av takets storlek, lutning, antal genomföringar samt underlagets skick. Vi lämnar alltid fast pris efter kostnadsfri besiktning — inga dolda kostnader.",
      "Exempel: ett TP20-tak på 100 m² kostar från cirka 120 000 kr, 130 m² från cirka 156 000 kr och 160 m² från cirka 192 000 kr. Ett dubbelfalsat tak på 130 m² kostar från cirka 260 000 kr. Priserna är riktpriser — exakt pris får du efter besiktning.",
      "ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi sköter hela ansökan och drar av beloppet direkt på fakturan, så du behöver aldrig ligga ute med pengarna.",
      "Faktorer som påverkar priset: takets lutning och komplexitet, antal genomföringar som skorstenar och takkupor, underlagets skick, samt logistik — på öar utan bro tillkommer båttransport. Allt specificeras i offerten innan arbetet börjar.",
      "Vill du jämföra taktyper? På sidan Taktyper ser du livslängd, underhållsbehov och vad som passar just ditt hus. I bloggen hittar du fördjupande prisguider för 2026.",
      "Så budgeterar du smart: boka besiktningen tidigt så hinner du jämföra materialalternativ i lugn takt. Överväg att samordna takbytet med byte av vindskivor, hängrännor eller taksäkerhet — marginalkostnaden blir lägre när ställningen ändå står uppe. Och glöm inte att ROT-avdraget gäller per person, två delägare kan alltså få upp till 100 000 kr tillsammans.",
      "Alla priser på sidan är riktpriser baserade på våra utförda projekt i Roslagen och Storstockholm. Exakt pris för ditt tak får du alltid skriftligt efter den kostnadsfria besiktningen.",
      "Vad ingår i kvadratmeterpriset? Rivning och bortforsling av gamla taket, underlagspapp, strö- och bärläkt, tätskikt i valt material, plåtbeslag kring skorsten och genomföringar, taksäkerhet och städning. Det enda som kan tillkomma är skador på råspont eller takstolar som inte går att se förrän gamla taket är rivet — då stannar vi upp och prisar tillägget separat innan vi fortsätter.",
      "Jämför du offerter från flera firmor? Titta på vad som faktiskt ingår, inte bara totalsumman. Fråga efter garantitider, om beslag och taksäkerhet ingår, och om priset är fast eller ett ungefärligt upplägg.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
  "/recensioner": {
    title: "Recensioner — läs kundernas omdömen på Google",
    description:
      "Läs vad kunder i Roslagen och Stockholms skärgård säger om RoslagsTak — alla omdömen finns att läsa direkt på Google.",
    h1: "Recensioner från takprojekt i Roslagen",
    intro:
      "Omdömen från kunder i Roslagens skärgård — Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn, Ingmarsö och fler orter.",
    paragraphs: [
      "Vi samlar våra omdömen på Google istället för att publicera egenskrivna recensioner här på sajten. Det gör att du kan läsa omdömena i original, skrivna av verifierade kunder, direkt i vår Google-företagsprofil.",
      "Följ länken till Google för att se aktuella omdömen, stjärnbetyg och bilder från utförda takprojekt. Har du själv anlitat oss får du gärna lämna ett omdöme — det hjälper andra husägare i Roslagen att välja takläggare.",
      "Det vi hör oftast från kunderna: att kommunikationen är tydlig från första kontakten, att priset som avtalats är det som faktureras, och att plåtarbetet utförs med noggrannhet. Många lyfter också att vi löser materialtransport till öar utan broförbindelse som en självklar del av projektet.",
      "Vi utför takbyte, takrenovering, plåtarbeten och takvård i hela Roslagen och Storstockholm. Besiktning och offert är alltid kostnadsfria, och du får 10 års utförandegaranti på allt arbete.",
      "Så kan du själv bedöma en takfirma: be om referenser från projekt i din närhet, kontrollera att företaget har ansvarsförsäkring och F-skatt, och be att få garantierna skriftligt i offerten. Ett seriöst företag lämnar alltid fast pris efter besiktning — aldrig ett pris per telefon.",
      "Vill du veta mer om hur vi arbetar innan du bestämmer dig? Läs om vår process steg för steg, våra riktpriser eller boka en kostnadsfri rådgivning där vi går igenom ditt tak tillsammans.",
      "Därför väljer vi att länka till Google istället för att skriva egna omdömen: omdömen på Google kan inte redigeras eller plockas bort av oss, vilket gör dem mer trovärdiga än citat på en egen hemsida. Där ser du hela bilden — både betyg, texter och hur vi svarar.",
      "Vi bygger kontinuerligt upp våra omdömen i takt med att projekt slutförs. Varje kund får efter slutbesiktningen en förfrågan om att dela sin upplevelse — helt frivilligt och utan någon form av ersättning.",
    ],
    links: [...primaryLinks, ...locationLinks.slice(0, 24)],
  },
  "/blogg": {
    title: "Guider om tak — takbyte, priser och underhåll",
    description:
      "Fördjupande guider om taktyper, kostnader, ROT-avdrag, taksäkerhet, asbestsanering och underhåll av tak i kustnära klimat.",
    h1: "Allt om tak i Roslagen",
    intro:
      "Tips, guider och nyheter om takbyte, takrenovering och takläggning i Roslagens skärgård.",
    paragraphs: [
      "Här hittar du fördjupande guider om taktyper, kostnader, ROT-avdrag, taksäkerhet, asbestsanering, taktvätt och underhåll av tak i kustnära klimat.",
    ],
    links: [
      ...primaryLinks,
      ...blogPosts.map((p) => ({ href: `/blogg/${p.slug}`, label: p.title })),
    ],
  },
  "/kontakt": {
    title: "Kontakt och kostnadsfri takrådgivning",
    description:
      "Ring 070-154 36 39 eller fyll i formuläret — kostnadsfri takinspektion och offert i hela Roslagen och Storstockholm. Återkoppling inom 24 timmar.",
    h1: "Boka rådgivning med en takexpert",
    intro: `Ring ${PHONE} eller fyll i formuläret. Vi återkopplar inom 24 timmar — helt kostnadsfritt och utan förbindelser.`,
    paragraphs: [
      "Vi erbjuder kostnadsfri takinspektion och offert i hela Roslagen och Storstockholm, inklusive öar utan broförbindelse. Du når oss enklast på telefon eller via formuläret — beskriv gärna takets storlek, material och vad du vill ha hjälp med.",
      "När du hör av dig får du svar inom 24 timmar. Vi bokar en tid för besiktning som passar dig, tittar på taket tillsammans med dig om du vill, och lämnar därefter en skriftlig offert med fast pris.",
      "Vi tar uppdrag i hela Roslagen — Norrtälje, Österåker, Vaxholm, Östhammar och alla öar — samt i hela Storstockholm från Täby och Sollentuna till Nacka och Södertälje.",
      "Vanliga frågor vid första kontakten: vad kostar ett takbyte (se vår prissida för riktpriser), hur lång tid tar det (normalt 1–3 veckor beroende på storlek och väder) och kan man bo kvar under arbetet (ja, i de flesta fall).",
      `Telefon: ${PHONE}. Du kan också mejla via formuläret på sidan — ange adress så återkommer vi med förslag på besiktningstid.`,
      "Inför besiktningen behöver du inte förbereda något särskilt, men det underlättar om du vet ungefär hur stort taket är, vilket material det har idag och om du märkt några specifika problem som fläckar eller läckage. Vi tar med all mätutrustning och dokumenterar taket med foton som du får ta del av.",
      "Efter besiktningen får du en skriftlig offert med fast pris och tydlig specifikation av vad som ingår — rivning, underlag, tätskikt, beslag, taksäkerhet och städning. Du bestämmer i din egen takt, utan påtryckningar.",
      "Välkommen att höra av dig oavsett om du planerar ett takbyte i år, funderar på taktvätt eller bara vill ha en bedömning av takets skick.",
      "För dig på en ö utan bro: vi besöker regelbundet Blidö, Yxlan, Ljusterö, Husarö, Finnhamn, Ingmarsö, Svartlöga, Arholma och fler öar. Berätta var fastigheten ligger och hur den nås så planerar vi besiktningen därefter — båttransport är en del av vår vardag.",
      "Akta läckage? Om taket läcker just nu — ring direkt istället för att fylla i formuläret. Vi prioriterar akuta läckage och kan ofta komma ut för en provisorisk tätning inom kort.",
    ],
    links: primaryLinks,
  },
  "/tjanster/taktvatt": {
    title: "Taktvätt och takmålning — bort med mossa och lav",
    description:
      "Professionell taktvätt och takmålning som förlänger takets livslängd. Skonsamma metoder för betongpannor, tegel, eternit och plåttak.",
    h1: "Taktvätt i Roslagen — bort med mossa, lavar och alger",
    intro:
      "Professionell taktvätt och takmålning som förlänger takets livslängd med upp till 15 år. Skonsamma metoder för betongpannor, tegel, eternit och plåttak.",
    paragraphs: [
      "Vi rengör taket med lågtryckstvätt eller manuell borstning och behandlar därefter med miljögodkänt biocidmedel som dödar mossa, alger och lavar i rotsystemet.",
      "Taktvätt kostar normalt 80–150 kr/m² och takmålning från ca 150 kr/m² inklusive grundning och två strykningar. ROT-avdrag ger 30 % rabatt på arbetskostnaden.",
    ],
    links: [...primaryLinks, ...serviceLinks],
  },
};

const serviceIntro = (title: string, description: string): PrerenderPage => ({
  title: `${title} i Roslagen & Storstockholm`,
  description:
    `${description} Fast pris efter kostnadsfri besiktning, 10 års garanti. Ring ${PHONE}.`.slice(
      0,
      158,
    ),
  h1: `${title} i Roslagen`,
  intro: description,
  paragraphs: [
    `RoslagsTak utför ${title.toLowerCase()} i hela Roslagen och Stockholms norra skärgård. Allt arbete utförs enligt AMA-standard av certifierade takläggare, med 10 års garanti.`,
    "Vi lämnar fast pris efter kostnadsfri besiktning och hanterar all logistik — även till öar utan broförbindelse. ROT-avdrag ger 30 % rabatt på arbetskostnaden.",
    `Ring ${PHONE} eller begär kostnadsfri offert — vi återkopplar inom 24 timmar.`,
  ],
  links: [...primaryLinks, ...serviceLinks, ...locationLinks.slice(0, 24)],
});

/** Important on-page text for a route, or null when the route has no prerender. */
export const prerenderContent = (path: string): PrerenderPage | null => {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "").toLowerCase();

  if (staticPages[clean]) return staticPages[clean];

  if (clean.startsWith("/tjanster/")) {
    const slug = clean.slice("/tjanster/".length);
    const service = services.find((s) => s.slug === slug);
    return service ? serviceIntro(service.title, service.description) : null;
  }

  if (clean.startsWith("/blogg/")) {
    const post = blogPosts.find((p) => p.slug === clean.slice("/blogg/".length));
    if (!post) return null;
    return {
      title: post.title,
      description: post.excerpt,
      h1: post.title,
      intro: post.excerpt,
      paragraphs: post.content,
      links: [
        ...primaryLinks,
        ...blogPosts
          .filter((p) => p.slug !== post.slug)
          .slice(0, 8)
          .map((p) => ({ href: `/blogg/${p.slug}`, label: p.title })),
      ],
    };
  }

  if (clean === "/omraden") {
    return {
      title: "Våra områden — Roslagen och hela Storstockholm",
      description: `RoslagsTak utför takbyte, takrenovering och plåtarbeten i ${locations.length} orter — från ytterskärgårdens öar till Stockholms innerstad. Hitta din ort här.`,
      h1: "Takläggare i Roslagen och hela Storstockholm",
      intro: `RoslagsTak utför takbyte, takomläggning, takrenovering, plåtarbeten och takvård i ${locations.length} orter — från ytterskärgårdens öar till Stockholms innerstad.`,
      paragraphs: [
        "Välj ditt område nedan för lokala priser, vanliga taktyper och hur ett takprojekt går till just där.",
        `Ring ${PHONE} för kostnadsfri besiktning och fast pris.`,
      ],
      links: [
        ...primaryLinks,
        ...Object.entries(regionSlugs).map(([region, slug]) => ({
          href: `/omraden/${slug}`,
          label: `Takläggare i ${region}`,
        })),
        ...locationLinks,
      ],
    };
  }

  if (clean.startsWith("/omraden/")) {
    const region = regionBySlug(clean.slice("/omraden/".length));
    if (!region) return null;
    const places = locations.filter((l) => l.region === region);
    return {
      title: `Takläggare i ${region}`,
      description: `Takbyte, takrenovering och plåtarbeten i ${region} — ${places.length} orter. Fast pris efter kostnadsfri besiktning, 10 års garanti. Ring ${PHONE}.`,
      h1: `Takläggare i ${region}`,
      intro: regionIntros[region] ?? `Takbyte, takrenovering och plåtarbeten i ${region}.`,
      paragraphs: [
        ...(regionLongText[region] ?? []),
        `Vi arbetar i ${places.length} orter i ${region}. Ring ${PHONE} för kostnadsfri besiktning och fast pris.`,
      ],
      links: [
        ...primaryLinks,
        { href: "/omraden", label: "Alla områden i Roslagen och Storstockholm" },
        ...places.map((l) => ({
          href: `/taklaggare-${l.slug}`,
          label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
        })),
      ],
    };
  }

  if (clean.startsWith("/taklaggare-")) {
    const loc = locations.find((l) => l.slug === clean.slice("/taklaggare-".length));
    if (!loc) return null;
    const prep = loc.isIsland ? "på" : "i";
    return {
      title: `Takläggare ${prep} ${loc.name} — Takbyte & Takrenovering`,
      description: loc.isIsland
        ? `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Skärgårdsspecialist, fast pris efter besiktning, 10+30 års garanti och kostnadsfri offert.`
        : `${loc.primaryKeyword} — takbyte & takrenovering ${prep} ${loc.name}. Lokal takläggare, fast pris efter besiktning, 10+30 års garanti och kostnadsfri offert.`,
      h1: `Takläggare ${prep} ${loc.name} — takbyte, takrenovering & plåtarbeten`,
      intro: loc.description,
      paragraphs: [
        loc.longDescription,
        loc.extraContent,
        `${loc.uniqueFAQ.question} ${loc.uniqueFAQ.answer}`,
        `Ring ${PHONE} för kostnadsfri besiktning och offert ${prep} ${loc.name}.`,
      ],
      links: [
        ...primaryLinks,
        ...combos
          .filter((c) => c.locationSlug === loc.slug)
          .map((c) => ({ href: c.url, label: `${c.serviceName} ${c.prep} ${c.locationName}` })),
        ...loc.nearbyLocations
          .map((name) => locations.find((l) => l.name === name))
          .filter((l): l is (typeof locations)[number] => Boolean(l))
          .map((l) => ({
            href: `/taklaggare-${l.slug}`,
            label: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
          })),
      ],
    };
  }

  const combo = comboByUrl.get(clean);
  if (combo) {
    return {
      title: `${combo.serviceName} ${combo.prep} ${combo.locationName} — Fast pris & garanti`,
      description: combo.description,
      h1: `${combo.serviceName} ${combo.prep} ${combo.locationName} — fast pris & 10 års garanti`,
      intro: combo.description,
      paragraphs: combo.content,
      links: [
        ...primaryLinks,
        {
          href: `/taklaggare-${combo.locationSlug}`,
          label: `Takläggare ${combo.prep} ${combo.locationName}`,
        },
        ...combos
          .filter(
            (c) => c.locationSlug === combo.locationSlug && c.serviceSlug !== combo.serviceSlug,
          )
          .map((c) => ({ href: c.url, label: `${c.serviceName} ${c.prep} ${c.locationName}` })),
      ],
    };
  }

  return null;
};