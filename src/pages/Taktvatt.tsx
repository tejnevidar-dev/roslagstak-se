import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Paintbrush,
  CheckCircle,
  ShieldCheck,
  Sprout,
  Droplets,
  Sun,
  Clock,
  Wrench,
  ArrowRight,
  Star,
  AlertTriangle,
  MapPin,
  Award,
  Phone,
  FileCheck,
  Leaf,
  Snowflake,
  Home,
  TrendingUp,
  BookOpen,
  Hammer,
  Thermometer,
  CloudRain,
  Anchor,
  ListChecks,
  Scale,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";
import { Helmet } from "react-helmet-async";

const benefits = [
  {
    icon: Clock,
    title: "Förlänger takets livslängd med 10–15 år",
    desc: "Mossa, lavar och alger bryter ner ytskiktet. Regelbunden taktvätt skyddar pannor och plåt och skjuter upp ett dyrt takbyte.",
  },
  {
    icon: Droplets,
    title: "Förebygger fukt- och frostskador",
    desc: "Mossa suger åt sig vatten som fryser och spräcker pannor. En ren takyta leder bort vatten som den ska.",
  },
  {
    icon: Sun,
    title: "Snyggare hus och högre värde",
    desc: "Ett rent, fräscht tak höjer husets marknadsvärde och första intryck markant — perfekt inför försäljning.",
  },
  {
    icon: ShieldCheck,
    title: "Försäkringsvänligt underhåll",
    desc: "Många försäkringsbolag kräver löpande takunderhåll. Vi dokumenterar arbetet med före- och efterbilder.",
  },
];

const roofTypes = [
  { name: "Betongpannor", desc: "Vanligaste taket att tvätta. Mossan trivs i porerna — vi rengör och behandlar effektivt." },
  { name: "Tegelpannor", desc: "Skonsam tvätt med rätt tryck för att inte skada det glaserade ytskiktet." },
  { name: "Plåttak (TP20, pannplåt)", desc: "Tvätt och vid behov ommålning med UV-beständig takfärg som håller i 10+ år." },
  { name: "Eternittak", desc: "OBS! Eternittak får aldrig högtryckstvättas — vi hjälper dig med säker hantering istället." },
];

const process = [
  { step: "1", title: "Kostnadsfri besiktning", desc: "Vi inspekterar takets skick, mängd mossa/lavar och bedömer om tvätt räcker eller om målning behövs." },
  { step: "2", title: "Skriftlig offert", desc: "Tydligt fast pris med ROT-avdrag inräknat. Inga överraskningar." },
  { step: "3", title: "Skyddsåtgärder", desc: "Vi täcker fasad, fönster och växtlighet runt huset innan arbetet påbörjas." },
  { step: "4", title: "Borttagning av mossa", desc: "Manuell borstning och skrapning av tjocka mosskuddar — skonsamt mot pannorna." },
  { step: "5", title: "Tvätt med rätt tryck", desc: "Lågtrycks- eller mellantryckstvätt anpassad efter takmaterial. Aldrig högtryck på pannor." },
  { step: "6", title: "Biocidbehandling", desc: "Miljögodkänt medel som dödar sporer och hindrar mossa från att komma tillbaka snabbt." },
  { step: "7", title: "Rengöring av hängrännor", desc: "Vi tömmer och spolar ur rännor och stuprör så takavvattningen fungerar." },
  { step: "8", title: "Eventuell takmålning", desc: "Två strykningar med UV-beständig takfärg om du valt målning i offerten." },
  { step: "9", title: "Slutbesiktning & dokumentation", desc: "Genomgång på plats samt före- och efterbilder för ditt arkiv och försäkring." },
];

const guarantees = [
  { icon: ShieldCheck, title: "10 års garanti", desc: "På utfört arbete — branschens längsta garanti. Trygghet för dig som husägare i Roslagen. 30 års materialgaranti vid takvård med utbyte." },
  { icon: Award, title: "Fast pris efter besiktning", desc: "Inga timdebiteringar eller överraskningar. Du vet exakt vad taktvätten kostar innan vi börjar." },
  { icon: FileCheck, title: "F-skatt & fullt försäkrade", desc: "Vi har ansvarsförsäkring och hanterar all ROT-administration åt dig." },
  { icon: Phone, title: "Personlig kontakt hela vägen", desc: "Du har en dedikerad kontaktperson från offert till slutbesiktning — alltid samma person att ringa." },
];

const faqs = [
  {
    q: "Vad kostar taktvätt i Roslagen?",
    a: "Taktvätt i Roslagen kostar 80–150 kr/m² inklusive biocidbehandling — med ROT-avdrag blir nettopriset 56–105 kr/m². För en normalvilla på 130 m² takyta landar totalpriset oftast på 10 400–19 500 kr brutto, eller 7 280–13 650 kr efter ROT. Vill du även ha takmålning kostar det 200–320 kr/m² (140–224 kr/m² efter ROT). Vi lämnar alltid skriftlig offert med fast pris efter kostnadsfri besiktning.",
  },
  {
    q: "Hur ofta bör man tvätta taket?",
    a: "Vi rekommenderar taktvätt vart 5:e till 10:e år beroende på läge. Hus i skuggiga lägen, nära skog, hav eller på öar i Roslagens skärgård behöver tvättas vart 5:e–7:e år, medan soliga tak inåt land klarar sig 8–10 år mellan tvättarna. Efter en taktvätt med biocidbehandling håller taket sig rent i 5–8 år, och med kompletterande takmålning förlängs intervallet till 10–15 år.",
  },
  {
    q: "Är högtryckstvätt skadligt för taket?",
    a: "Ja, fel använt högtryck (över 100 bar) kan slå sönder ytskiktet på betong- och tegelpannor, blåsa bort ytbehandlingen och pressa in vatten under pannorna. Vi använder lågtryckstvätt med 30–80 bar anpassad för varje takmaterial, kombinerat med manuell borstning av tjocka mosskuddar och avslutande biocidbehandling. På eternittak används aldrig tryck — endast manuella metoder enligt AFS 2006:1.",
  },
  {
    q: "Ingår ROT-avdrag på taktvätt?",
    a: "Ja, både taktvätt, mossborttagning och takmålning är ROT-berättigade tjänster. Du får 30 % rabatt på arbetskostnaden direkt på fakturan upp till 50 000 kr per person och år. Vi sköter all administration mot Skatteverket — du behöver bara uppge personnummer och fastighetsbeteckning. Materialkostnader (biocid, färg) omfattas inte av ROT.",
  },
  {
    q: "När på året är det bäst att tvätta taket?",
    a: "Bästa säsongen för taktvätt i Roslagen är april–oktober när det är torrt och temperaturen är över +5 °C. Våren (april–maj) är optimal för biocidbehandling som hinner verka hela sommaren, medan sommaren (juni–augusti) ger bäst torktid för efterföljande takmålning. Höstmånaderna september–oktober används för rensning av hängrännor och sista tvätten innan vintern. Vi tar emot bokningar året runt men utför inte taktvätt vid frost.",
  },
  {
    q: "Hur länge håller en taktvätt?",
    a: "Efter en taktvätt med biocidbehandling håller sig taket rent i 5–8 år innan ny mosspåväxt börjar synas. Lägger man dessutom på två strykningar UV-beständig takfärg får man ytterligare skydd och 10–15 års hållbarhet. I skärgårdsmiljö med saltluft och hög luftfuktighet kan intervallet vara något kortare — vi rekommenderar då en lättare uppfräschning vart 5:e år.",
  },
  {
    q: "Kan ni tvätta tak på öar utan broförbindelse?",
    a: "Ja, vi är specialister på skärgårdsmiljö och utför taktvätt på fritidshus och permanentbostäder på öar i hela Roslagens skärgård — Husarö, Ingmarsö, Möja, Arholma, Fejan, Svartlöga, Söderöra, Norröra, Gräskö och fler. Vi tar med all utrustning, biocid och fallskydd med egen båt från Blidö och behöver bara att du anger en brygga eller landningsplats. Båttransport ingår i offerten utan extra kostnad upp till 30 minuters körtid från Blidö.",
  },
  {
    q: "Hur lång tid tar en taktvätt?",
    a: "En normalstor villa (120–150 m² takyta) tar 1–2 dagar inklusive biocidbehandling och rensning av hängrännor. Större fastigheter eller tak med tjock mosspåväxt kan ta upp till 3 dagar. Inkluderar offerten även takmålning tar arbetet 3–5 dagar totalt med 24 timmars torktid mellan grundstrykning och toppstrykning. Vi planerar arbetet efter väderprognosen för att undvika regn under torktiden.",
  },
  {
    q: "Vilka kemikalier använder ni vid taktvätt?",
    a: "Vi använder endast biocider som är godkända av Kemikalieinspektionen (KemI) och registrerade för taktvätt — främst medel baserade på kvartära ammoniumföreningar som bryts ned naturligt inom några veckor. Innan arbetet täcker vi rabatter, uteplatser och växtlighet runt huset. Vi använder aldrig klor, ättika eller starka syror som kan skada pannor, fasad eller grundvatten.",
  },
  {
    q: "Kan ni måla taket samtidigt som ni tvättar det?",
    a: "Ja, takmålning utförs alltid efter en grundlig taktvätt — färgen fäster inte på smutsiga eller mossiga pannor. Vi rekommenderar takmålning på äldre betongpannor där ytskiktet börjat vittra eller färgen flagnar — det förlänger takets livslängd med ytterligare 10–15 år. Vi målar med två strykningar UV-beständig akrylfärg i valfri kulör (oftast tegelröd, svart eller grafitgrå). Plåttak målas med särskild plåtfärg, och tegelpannor målas oftast inte alls eftersom det glaserade ytskiktet är beständigt.",
  },
  {
    q: "Behöver jag vara hemma när ni utför taktvätten?",
    a: "Nej, du behöver inte vara hemma. Många av våra kunder med fritidshus på Blidö, Ljusterö, Yxlan och i skärgården anlitar oss helt på distans. Vi behöver bara tillgång till vatten (utomhuskran eller motsvarande) och en parkeringsplats för servicebilen. Vi dokumenterar arbetet med före- och efterbilder och skickar en utförlig rapport via e-post eller sms när jobbet är klart.",
  },
  {
    q: "Hur tar man bort mossa på taket?",
    a: "Mossa på taket tas bort i tre steg: först manuell borstning av tjocka mosskuddar med mjuka borstar — aldrig metallskrapor som skadar ytskiktet. Därefter lågtryckstvätt (30–80 bar) uppifrån och ned så vatten inte pressas in under pannorna. Slutligen biocidbehandling med KemI-godkänt medel som dödar kvarvarande sporer och förhindrar återväxt i 5–8 år. Försök inte själv — fall från tak är en av Sveriges vanligaste arbetsplatsolyckor.",
  },
  {
    q: "Vad är skillnaden på taktvätt och takvård?",
    a: "Taktvätt är själva rengöringen av taket — borttagning av mossa, lavar och alger med tvätt och biocidbehandling. Takvård är ett bredare begrepp som även inkluderar förebyggande underhåll: rensning av hängrännor och stuprör, kontroll av plåtbeslag, takfot och vindskivor, samt eventuell takmålning. Vi erbjuder båda — många kunder bokar ett kombinerat takvårdspaket vart 5:e år för att hålla taket i toppskick.",
  },
  {
    q: "Är taktvätt verkligen lönsamt jämfört med takbyte?",
    a: "Ja, om taket är helt och underliggande konstruktion är frisk är taktvätt 10–20 gånger billigare än ett takbyte. En taktvätt på en normalvilla kostar 10 400–19 500 kr (brutto) och förlänger livslängden med 10–15 år. Ett komplett takbyte kostar 156 000–260 000 kr för samma yta. Vi gör alltid en ärlig bedömning vid besiktningen — om pannorna är vittrade eller underlagspappen är dålig rekommenderar vi takomläggning istället.",
  },
  {
    q: "Tvättar ni även hängrännor och stuprör?",
    a: "Ja, rensning och spolning av hängrännor och stuprör ingår alltid i vår taktvätt utan extra kostnad. Tilltäppta hängrännor är en av de vanligaste orsakerna till fukt- och fasadskador i Roslagen — särskilt på hus med löv- eller björkbestånd nära taket. Vi tar bort löv, grus och mossa, kontrollerar att stuprören är fria och justerar fall vid behov.",
  },
  {
    q: "Kan svart algpåväxt försvinna helt efter taktvätt?",
    a: "Ja, svarta strimmor från cyanobakterier (Gloeocapsa magma) försvinner helt efter taktvätt med biocidbehandling. Algerna lossnar dock inte direkt — det tar 2–6 veckor efter biocidbehandlingen innan regn och vind har spolat bort de döda kolonierna och taket ser helt rent ut. Vi förklarar detta vid slutbesiktningen så du vet vad du ska förvänta dig.",
  },
  {
    q: "Erbjuder ni serviceavtal för regelbunden takvård?",
    a: "Ja, vi erbjuder skräddarsydda serviceavtal för villaägare, bostadsrättsföreningar och näringsfastigheter i Roslagen. Avtalet inkluderar årlig okulärbesiktning, rensning av hängrännor en gång per år och taktvätt vart 5:e–7:e år till rabatterat pris. Perfekt för fritidshusägare som vill slippa tänka på underhåll — vi rapporterar löpande med bilder och text.",
  },
];

const seasonGuide = [
  { season: "Vår (april–maj)", icon: Sprout, desc: "Bästa starten på säsongen. Tjälen har gått ur marken och taket är torrt — perfekt för biocidbehandling som hinner verka hela sommaren." },
  { season: "Sommar (juni–augusti)", icon: Sun, desc: "Högsäsong för taktvätt. Torrt väder, långa dagar och optimal torktid för takmålning. Boka tidigt — kötiderna är längst nu." },
  { season: "Höst (september–oktober)", icon: Leaf, desc: "Sista chansen innan vintern. Vi rensar hängrännor och tvättar bort sommarens algpåväxt så taket är rustat för vintern." },
  { season: "Vinter (november–mars)", icon: Snowflake, desc: "Vi utför inte taktvätt vintertid, men tar emot bokningar för våren. Boka i god tid för bästa pris och datum." },
];

const comparison = [
  { aspect: "Kostnad", clean: "80–150 kr/m²", replace: "1 200–2 000 kr/m²", winner: "clean" },
  { aspect: "Tidsåtgång", clean: "1–2 dagar", replace: "1–3 veckor", winner: "clean" },
  { aspect: "Förlängd livslängd", clean: "10–15 år", replace: "30–50 år", winner: "replace" },
  { aspect: "ROT-avdrag", clean: "Ja, 30 %", replace: "Ja, 30 %", winner: "tie" },
  { aspect: "Störning för boende", clean: "Minimal", replace: "Stor — riv & bygg", winner: "clean" },
  { aspect: "Garanti", clean: "10 år", replace: "10–15 år", winner: "tie" },
];

const checklist = [
  "Inspektera takets norrsida — där växer mossan först",
  "Kolla efter gröna strimmor från algpåväxt",
  "Lyssna efter ljud i hängrännorna när det regnar (löv & grus)",
  "Notera om takpannor ser mörkare ut än tidigare",
  "Kontrollera takfoten och vindskivor för fuktskador",
  "Mät hur länge det är sedan senaste taktvätten — över 5 år är dags",
  "Be om en kostnadsfri besiktning från oss om du är osäker",
];

const glossary = [
  { term: "Biocid", def: "Miljögodkänt bekämpningsmedel som dödar mossa, lavar och alger samt förhindrar återväxt i 5–8 år." },
  { term: "Lågtryckstvätt", def: "Tvättmetod med 30–80 bar tryck, anpassad för takpannor. Skadar inte ytskiktet som högtryck gör." },
  { term: "Mosskuddar", def: "Tjocka ansamlingar av mossa mellan takpannor som suger åt sig vatten och spräcker pannorna vid frost." },
  { term: "Lavar", def: "Långsamväxande symbios mellan svamp och alg. Vita eller grå fläckar främst på takets norrsida." },
  { term: "Algpåväxt", def: "Svarta eller mörkgröna strimmor från cyanobakterier. Indikerar fuktigt mikroklimat på taket — vanligt nära havet." },
  { term: "Takmålning", def: "Två strykningar med UV-beständig akrylfärg som skyddar pannor och ger taket nytt utseende i 10–15 år." },
  { term: "ROT-avdrag", def: "Skattereduktion på 30 % av arbetskostnaden för reparation och underhåll i bostad. Gäller taktvätt och takmålning." },
  { term: "Fallskydd", def: "Personlig skyddsutrustning (sele, lina, förankring) som krävs vid takarbete enligt Arbetsmiljöverket." },
];

const climateFactors = [
  { icon: CloudRain, title: "Hög nederbörd & havsluft", desc: "Roslagens kustklimat med fukt från Östersjön accelererar nedbrytningen av takets ytskikt och ger snabbare algpåväxt." },
  { icon: Snowflake, title: "Långa snöperioder", desc: "Snö som ligger flera månader skapar fukt under smältningen — perfekt grogrund för mossa och lavar på taket." },
  { icon: Anchor, title: "Skärgårdsläge", desc: "Hus på öar och nära vattnet utsätts för konstant fukt och saltluft som sliter på pannor och plåt extra hårt." },
  { icon: Thermometer, title: "Frost-tö-cykler", desc: "Stora temperaturskillnader mellan dag och natt orsakar frostsprängning i porösa pannor med mossa." },
];

const tabs = [
  { id: "villatak", label: "Villatak", icon: Home },
  { id: "skargardshus", label: "Skärgårdshus", icon: Anchor },
  { id: "fritidshus", label: "Fritidshus", icon: Sun },
  { id: "naringsfastighet", label: "Näringsfastighet", icon: TrendingUp },
];

const tabContent: Record<string, { title: string; desc: string; bullets: string[] }> = {
  villatak: {
    title: "Taktvätt på villatak",
    desc: "Det vanligaste uppdraget vi får. En typisk villa i Roslagen har 120–180 m² takyta och behöver tvättas vart 5:e till 8:e år beroende på läge, takmaterial och omgivning.",
    bullets: [
      "Komplett tvätt och biocidbehandling på 1–2 dagar",
      "Vi täcker fasad, fönster och rabatter innan vi börjar",
      "Hängrännor och stuprör rensas och spolas",
      "Före- och efterbilder för försäkringsbolag och eget arkiv",
    ],
  },
  skargardshus: {
    title: "Taktvätt på skärgårdshus & ö-bostäder",
    desc: "Hus på Blidö, Ljusterö, Yxlan, Husarö, Möja och andra öar i Roslagens skärgård har ofta extra tjock mosspåväxt på grund av hög luftfuktighet och saltluft. Vi är specialister på ö-logistik och tar med utrustning på båt.",
    bullets: [
      "Båttransport till öar utan broförbindelse",
      "Anpassad metodik för takpannor i kustklimat",
      "Vi kan utföra arbetet medan du är hemma — perfekt för fritidshus",
      "Säsongsservice — vi samordnar med dina besök på ön",
    ],
  },
  fritidshus: {
    title: "Taktvätt på fritidshus",
    desc: "Äger du ett fritidshus i Roslagen och vill slippa tänka på underhåll? Vi tar fullt ansvar för taktvätten — inspekterar, tvättar och dokumenterar utan att du behöver vara på plats.",
    bullets: [
      "Nyckelfri service med digital återrapportering",
      "Bilder och rapport skickas direkt till din e-post",
      "Avtalsbaserad service för regelbundet underhåll",
      "Samordning med andra hantverkare vid behov",
    ],
  },
  naringsfastighet: {
    title: "Taktvätt på näringsfastigheter",
    desc: "Vi utför taktvätt på hotell, restauranger, vandrarhem och kommersiella fastigheter i hela Roslagen. Avdragsgillt som driftkostnad och kan utföras med minimal störning för verksamheten.",
    bullets: [
      "Arbete utanför öppettider eller säsong",
      "F-skatt, fullt försäkrade och referenser från besöksnäringen",
      "Skriftliga avtal med servicenivåer (SLA)",
      "Volymrabatt vid flera fastigheter",
    ],
  },
};

const Taktvatt = () => {
  const [activeTab, setActiveTab] = useState("villatak");
  const pageUrl = "https://roslagstak.se/tjanster/taktvatt";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Taktvätt och takvård i Roslagen",
    url: pageUrl,
    serviceType: "Taktvätt och takvård",
    provider: {
      "@type": "RoofingContractor",
      "@id": "https://roslagstak.se/#organization",
      name: "RoslagsTak",
      url: "https://roslagstak.se/",
      areaServed: "Roslagen, Blidö, Ljusterö, Yxlan, Furusund, Vaxholm, Norrtälje, Skärgården",
      telephone: "+46-70-154-36-39",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Blidö",
        addressRegion: "Stockholms län",
        addressCountry: "SE",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "150",
      },
    },
    areaServed: [
      { "@type": "Place", name: "Roslagen" },
      { "@type": "Place", name: "Norrtälje" },
      { "@type": "Place", name: "Blidö" },
      { "@type": "Place", name: "Ljusterö" },
      { "@type": "Place", name: "Vaxholm" },
      { "@type": "Place", name: "Stockholms skärgård" },
    ],
    description:
      "Professionell taktvätt med borttagning av mossa, lavar och alger. Skonsam tvätt, biocidbehandling och takmålning på betongpannor, tegelpannor och plåttak i hela Roslagen.",
    category: "Roof cleaning",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Taktvätt-tjänster",
      itemListElement: [
        { "@type": "Offer", name: "Taktvätt + biocidbehandling", priceSpecification: { "@type": "UnitPriceSpecification", price: "80-150", priceCurrency: "SEK", unitText: "per kvadratmeter" } },
        { "@type": "Offer", name: "Taktvätt + takmålning", priceSpecification: { "@type": "UnitPriceSpecification", price: "200-320", priceCurrency: "SEK", unitText: "per kvadratmeter" } },
        { "@type": "Offer", name: "Endast mossborttagning", priceSpecification: { "@type": "UnitPriceSpecification", price: "50-90", priceCurrency: "SEK", unitText: "per kvadratmeter" } },
      ],
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "SEK",
      availability: "https://schema.org/InStock",
      url: pageUrl,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "80-150",
        priceCurrency: "SEK",
        unitText: "per kvadratmeter",
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Tjänster", item: "https://roslagstak.se/#tjanster" },
      { "@type": "ListItem", position: 3, name: "Taktvätt", item: pageUrl },
    ],
  };

  return (
    <>
      <SEOHead
        title="Taktvätt Roslagen — Bort med mossa, lavar & alger"
        description="Taktvätt i Roslagen från 80 kr/m². Vi tar bort mossa, lavar och alger på betong-, tegel- och plåttak. Fast pris, ROT-avdrag 30 % och 10 års utförandegaranti. Kostnadsfri offert."
        canonical={pageUrl}
        type="article"
        geoPosition="59.6237;18.8842"
        geoPlacename="Blidö, Norrtälje, Roslagen"
      />
      <Helmet>
        <meta name="keywords" content="taktvätt Roslagen, taktvätt Norrtälje, taktvätt Blidö, mossa på taket, takvård, takmålning, biocidbehandling, ta bort mossa tak, taktvätt skärgården" />
        <meta name="author" content="RoslagsTak" />
        <meta property="article:section" content="Takvård" />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <Header />
      <main>
        {/* HERO — full bildbakgrund */}
        <section className="relative min-h-screen flex items-end overflow-hidden pt-16">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary) / 0.9) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/20" />
          <div className="relative z-10 container mx-auto px-4 pb-16 pt-24">
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Paintbrush className="h-4 w-4" />
                Taktvätt & takvård i hela Roslagen
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                Taktvätt i Roslagen — bort med mossa, lavar och alger
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-2xl">
                Professionell taktvätt och takmålning som förlänger takets livslängd med upp till 15 år.
                Vi tvättar betongpannor, tegelpannor och plåttak skonsamt — med ROT-avdrag, fast pris och 10 års utförandegaranti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="/#offert" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors animate-subtle-pulse">
                  Få kostnadsfri offert <ArrowRight className="h-4 w-4" />
                </a>
                <a href="tel:0701543639" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md border border-foreground/30 text-foreground font-medium hover:bg-foreground/5 transition-colors">
                  <Phone className="h-4 w-4" /> Ring oss direkt
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {[
                  { num: "500+", label: "Tvättade tak" },
                  { num: "10 år", label: "Garanti på arbetet" },
                  { num: "30 %", label: "ROT-avdrag" },
                  { num: "24+", label: "Orter & öar" },
                ].map((s, i) => (
                  <div key={s.label} className={`pr-8 ${i > 0 ? "pl-8 border-l border-foreground/20" : ""}`}>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">{s.num}</div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sticky snabbnavigation */}
        <nav aria-label="Sektioner på sidan" className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4">
            <ul className="flex gap-6 overflow-x-auto py-4 text-sm whitespace-nowrap">
              <li><a href="#fordelar" className="text-muted-foreground hover:text-primary transition-colors">Fördelar</a></li>
              <li><a href="#fastighetstyper" className="text-muted-foreground hover:text-primary transition-colors">För din fastighet</a></li>
              <li><a href="#fore-efter" className="text-muted-foreground hover:text-primary transition-colors">Före & efter</a></li>
              <li><a href="#klimat" className="text-muted-foreground hover:text-primary transition-colors">Skärgårdsklimat</a></li>
              <li><a href="#process" className="text-muted-foreground hover:text-primary transition-colors">Vår process</a></li>
              <li><a href="#taktyper" className="text-muted-foreground hover:text-primary transition-colors">Taktyper</a></li>
              <li><a href="#jamforelse" className="text-muted-foreground hover:text-primary transition-colors">Tvätt vs takbyte</a></li>
              <li><a href="#sasong" className="text-muted-foreground hover:text-primary transition-colors">Säsongsguide</a></li>
              <li><a href="#checklista" className="text-muted-foreground hover:text-primary transition-colors">Checklista</a></li>
              <li><a href="#pris" className="text-muted-foreground hover:text-primary transition-colors">Pris & ROT</a></li>
              <li><a href="#omraden" className="text-muted-foreground hover:text-primary transition-colors">Områden</a></li>
              <li><a href="#garantier" className="text-muted-foreground hover:text-primary transition-colors">Garantier</a></li>
              <li><a href="#ordlista" className="text-muted-foreground hover:text-primary transition-colors">Ordlista</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">Vanliga frågor</a></li>
              <li><a href="/#offert" className="text-primary font-semibold hover:underline">Få offert →</a></li>
            </ul>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav aria-label="Brödsmulor" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Startsidan</Link>
            <span>/</span>
            <a href="/#tjanster" className="hover:text-foreground transition-colors">Tjänster</a>
            <span>/</span>
            <span className="text-foreground">Taktvätt</span>
          </nav>
        </div>

        {/* Intro-text */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Vad är taktvätt?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Taktvätt — det viktigaste underhållet för ditt tak
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Taktvätt innebär att vi rengör ditt tak från mossa, lavar, alger och smuts som med åren bryter ner takets ytskikt.
              I Roslagens fuktiga skärgårdsklimat — med havsluft, regn och långa vintrar — växer mossan snabbt på betong- och tegelpannor.
              En obehandlad mosspåväxt kan halvera takets livslängd och leda till läckage, frostsprängning och fuktskador.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Vi på <strong className="text-foreground">RoslagsTak</strong> är specialister på taktvätt och takvård i hela Roslagen och skärgården.
              Med rätt teknik, miljögodkända medel och 10 års utförandegaranti får ditt tak ett nytt liv — till en bråkdel av priset för ett{" "}
              <Link to="/tjanster/takomlaggning" className="text-primary hover:underline font-medium">takbyte</Link>.
              Se vår fullständiga <Link to="/priser" className="text-primary hover:underline font-medium">prislista för taktjänster</Link> eller läs mer om hur vi jobbar på{" "}
              <Link to="/taktvatt-blido" className="text-primary hover:underline font-medium">Blidö</Link>,{" "}
              <Link to="/taktvatt-ljustero" className="text-primary hover:underline font-medium">Ljusterö</Link> och{" "}
              <Link to="/taktvatt-norrtalje" className="text-primary hover:underline font-medium">Norrtälje</Link>.
            </p>
          </div>
        </section>

        {/* Varför taktvätt */}
        <section id="fordelar" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Därför ska du tvätta taket</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              Varför taktvätt är en av de bästa investeringarna för ditt hus
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Mossa och lavar är inte bara fult — de bryter aktivt ner ditt tak. Här är fyra konkreta skäl att boka taktvätt i tid.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="bg-card border border-border rounded-xl p-6">
                  <b.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fastighetstyper — Tabs/flikar */}
        <section id="fastighetstyper" className="container mx-auto px-4 py-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">För alla typer av fastigheter</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Taktvätt anpassad efter din fastighet
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Klicka på fliken som passar dig — vi anpassar taktvätten efter villatak, skärgårdshus, fritidshus eller näringsfastighet.
          </p>
          <div className="max-w-4xl mx-auto">
            <div role="tablist" className="flex flex-wrap gap-2 mb-8 border-b border-border">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeTab === t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === t.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              ))}
            </div>
            <div role="tabpanel" className="bg-card border border-border rounded-xl p-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">{tabContent[activeTab].title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{tabContent[activeTab].desc}</p>
              <ul className="space-y-3">
                {tabContent[activeTab].bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Före & efter */}
        <section id="fore-efter" className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Före & efter taktvätt</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Skillnaden är som natt och dag
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Innan vi börjar är taket täckt av tjocka mosskuddar, vita lavar och svarta algstrimmor.
                Efter vår taktvätt med biocidbehandling är taket helt rent och skyddat i 5–8 år framåt.
                Vi dokumenterar alltid arbetet med riktiga före- och efterbilder från ditt eget tak.
              </p>
              <ul className="space-y-3">
                {[
                  "Mossan borstas bort manuellt — inte högtrycksspolad",
                  "Biocidbehandling dödar sporer och förhindrar återväxt",
                  "Hängrännor rengörs så takavvattningen fungerar",
                  "Allt arbete dokumenteras med före- och efterbilder",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-border aspect-[16/10] grid grid-cols-2">
              <div className="bg-muted/40 flex items-center justify-center p-6 text-center">
                <div>
                  <div className="bg-destructive/90 text-destructive-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3">Före</div>
                  <p className="text-sm text-muted-foreground">Mossa, lavar och alger på taket</p>
                </div>
              </div>
              <div className="bg-primary/10 flex items-center justify-center p-6 text-center border-l border-border">
                <div>
                  <div className="bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3">Efter</div>
                  <p className="text-sm text-foreground font-medium">Rent, skyddat tak i 5–8 år</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skärgårdsklimat */}
        <section id="klimat" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Skärgårdsklimat & taket</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              Varför Roslagens klimat ställer extra höga krav
            </h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              Roslagens skärgårdsklimat — med fukt från havet, höga nederbördsmängder och stora temperaturskillnader — gör att tak åldras snabbare här än på de flesta andra platser i Sverige. Därför är regelbunden taktvätt ett måste.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {climateFactors.map((c) => (
                <div key={c.title} className="bg-card border border-border rounded-xl p-6">
                  <c.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tecken på att taket behöver tvättas */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">När är det dags?</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  7 tecken på att ditt tak behöver tvättas
                </h2>
                <p className="text-muted-foreground mb-6">
                  Många väntar för länge med taktvätt — och då blir skadorna både större och dyrare att åtgärda.
                  Titta upp på taket och kolla efter dessa varningstecken:
                </p>
                <ul className="space-y-3">
                  {[
                    "Tjocka gröna eller svarta mosskuddar mellan pannorna",
                    "Vita eller grå lavar på takets norrsida",
                    "Mörka strimmor från algpåväxt",
                    "Hängrännor fulla med grus från nedbrutet ytskikt",
                    "Pannor som ser porösa eller flagnande ut",
                    "Synliga sprickor i pannor som vatten kan tränga in i",
                    "Det är 5+ år sedan taket senast tvättades",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Sprout className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="h-8 w-8 text-destructive shrink-0" />
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Varning: gör inte taktvätten själv
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Att tvätta taket själv är både farligt och kan göra mer skada än nytta. Vanliga misstag vi ser:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-destructive">✗</span> För högt tryck som spräcker pannor och blåser bort ytskiktet</li>
                  <li className="flex items-start gap-2"><span className="text-destructive">✗</span> Kemikalier som rinner ner i hängrännor och dödar växtlighet</li>
                  <li className="flex items-start gap-2"><span className="text-destructive">✗</span> Felaktig fallskyddsutrustning — fall från tak är en av de vanligaste arbetsplatsolyckorna</li>
                  <li className="flex items-start gap-2"><span className="text-destructive">✗</span> Tvätt nedifrån och upp — pressar in vatten under pannorna</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="container mx-auto px-4 py-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Så går det till</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Vår taktvättsprocess steg för steg
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Vi följer en beprövad process för att ge dig ett rent, skyddat tak — utan att skada taket eller huset.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((p) => (
              <div key={p.step} className="bg-card border border-border rounded-xl p-6">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                  {p.step}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Taktyper */}
        <section id="taktyper" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Alla takmaterial</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              Vi tvättar alla typer av tak
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Olika takmaterial kräver olika metoder. Vi har erfarenhet av alla vanliga taktyper i Roslagen.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roofTypes.map((r) => (
                <div key={r.name} className="bg-card border border-border rounded-xl p-6">
                  <Wrench className="h-7 w-7 text-primary mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{r.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pris & ROT */}
        <section id="pris" className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Pris & ROT-avdrag</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-6">
              Vad kostar taktvätt?
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              Priset för taktvätt varierar beroende på takets storlek, lutning, mängd mossa och tillgänglighet.
              Här är våra ungefärliga priser inklusive ROT-avdrag.
            </p>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Tjänst</th>
                    <th className="text-left p-4 font-semibold text-foreground">Pris/m²</th>
                    <th className="text-left p-4 font-semibold text-foreground">Med ROT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-4 text-muted-foreground">Taktvätt + biocidbehandling</td>
                    <td className="p-4 text-muted-foreground">80–150 kr</td>
                    <td className="p-4 text-foreground font-medium">56–105 kr</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">Taktvätt + takmålning</td>
                    <td className="p-4 text-muted-foreground">200–320 kr</td>
                    <td className="p-4 text-foreground font-medium">140–224 kr</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">Endast mossborttagning</td>
                    <td className="p-4 text-muted-foreground">50–90 kr</td>
                    <td className="p-4 text-foreground font-medium">35–63 kr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Priserna är ungefärliga. Vi lämnar alltid skriftlig offert med fast pris efter besiktning.
            </p>
          </div>
        </section>

        {/* Jämförelse: tvätt vs takbyte */}
        <section id="jamforelse" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Tvätt eller byte?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              Taktvätt jämfört med takbyte
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Är taket helt? Då räcker oftast en taktvätt — det är 10–20 gånger billigare än ett takbyte och kan förlänga takets livslängd med uppåt 15 år.
            </p>
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground"><Scale className="inline h-4 w-4 mr-2" />Aspekt</th>
                    <th className="text-left p-4 font-semibold text-foreground">Taktvätt</th>
                    <th className="text-left p-4 font-semibold text-foreground">Takbyte</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparison.map((c) => (
                    <tr key={c.aspect}>
                      <td className="p-4 text-foreground font-medium">{c.aspect}</td>
                      <td className={`p-4 ${c.winner === "clean" ? "text-primary font-semibold" : "text-muted-foreground"}`}>{c.clean}</td>
                      <td className={`p-4 ${c.winner === "replace" ? "text-primary font-semibold" : "text-muted-foreground"}`}>{c.replace}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-muted-foreground mt-6 max-w-2xl mx-auto text-sm">
              <strong className="text-foreground">Vår rekommendation:</strong> Boka alltid kostnadsfri besiktning först — vi säger ärligt om det räcker med taktvätt eller om ett takbyte är bättre investering.
            </p>
          </div>
        </section>

        {/* Säsongsguide */}
        <section id="sasong" className="container mx-auto px-4 py-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">När på året?</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Säsongsguide för taktvätt i Roslagen
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Tidpunkten på året påverkar både resultat och pris. Här är vår säsongsguide för taktvätt i skärgårdsmiljö.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {seasonGuide.map((s) => (
              <div key={s.season} className="bg-card border border-border rounded-xl p-6">
                <s.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.season}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Områden */}
        <section id="omraden" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Områden vi servar</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              Taktvätt i hela Roslagen
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Vi utför taktvätt på villor, fritidshus och skärgårdshus i alla orter i Roslagen — även på öar utan broförbindelse.
              Klicka på din ort för att läsa mer om våra taktjänster där.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/taktvatt-${loc.slug}`}
                  className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 text-foreground hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm font-medium">Taktvätt {loc.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Garantier */}
        <section id="garantier" className="container mx-auto px-4 py-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Trygghet hela vägen</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Våra garantier till dig
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            När du anlitar oss för taktvätt får du fyra konkreta löften — inget krångel, inga överraskningar.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((g) => (
              <div key={g.title} className="bg-card border border-border rounded-xl p-6">
                <g.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Vad våra kunder säger</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Nöjda taktvätt-kunder i hela Roslagen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Anna L., Blidö", text: "Helt otroligt vilken skillnad! Taket ser ut som nytt och vi sparade ett dyrt takbyte. Proffsigt från början till slut." },
                { name: "Per J., Norrtälje", text: "De tog hand om allt — täckte växterna, dokumenterade med bilder och allt blev pinsamt rent. ROT-avdraget skötte de också." },
                { name: "Maria K., Ljusterö", text: "Vårt skärgårdshus hade tjock mossa efter 15 år. Nu är det som nytt. Rekommenderas varmt till alla med hus i skärgården." },
              ].map((t) => (
                <div key={t.name} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">"{t.text}"</p>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklista */}
        <section id="checklista" className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Gör-själv-inspektion</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              Checklista: behöver ditt tak tvättas?
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              Gå igenom listan från marken med en kikare — du behöver inte klättra upp på taket. Bockar du av 2 eller fler punkter är det dags att boka taktvätt.
            </p>
            <div className="bg-card border border-border rounded-xl p-8">
              <ul className="space-y-4">
                {checklist.map((item, i) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0">{i + 1}</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border text-center">
                <ListChecks className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">Osäker? Vi gör en kostnadsfri besiktning på plats.</p>
                <a href="/#offert" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors animate-subtle-pulse">
                  Boka kostnadsfri besiktning <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Ordlista */}
        <section id="ordlista" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Lär dig branschord</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
                <BookOpen className="inline h-7 w-7 mr-2 mb-1 text-primary" />
                Ordlista — taktvätt från A till Ö
              </h2>
              <p className="text-muted-foreground text-center mb-12">
                Här förklarar vi de vanligaste begreppen kring taktvätt, takvård och takmålning så du kan jämföra offerter på lika villkor.
              </p>
              <dl className="grid md:grid-cols-2 gap-6">
                {glossary.map((g) => (
                  <div key={g.term} className="bg-card border border-border rounded-xl p-6">
                    <dt className="font-display text-lg font-semibold text-foreground mb-2">{g.term}</dt>
                    <dd className="text-sm text-muted-foreground leading-relaxed">{g.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Relaterade tjänster */}
        <section className="container mx-auto px-4 py-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Andra tjänster</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Relaterade taktjänster
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { to: "/tjanster/takomlaggning", icon: Hammer, title: "Takomläggning", desc: "När taktvätt inte räcker — vi byter ut pannor och underlagspapp." },
              { to: "/tjanster/platarbeten", icon: FileCheck, title: "Plåtarbeten", desc: "Plåttak, hängrännor och beslag i hela Roslagen — med 10 års garanti." },
              { to: "/tjanster/takrenovering", icon: Wrench, title: "Takrenovering", desc: "Reparation och uppfräschning av äldre tak utan komplett byte." },
            ].map((s) => (
              <Link
                key={s.title}
                to={s.to}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
              >
                <s.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                  Läs mer <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider text-center mb-2">Vanliga frågor</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Frågor och svar om taktvätt
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.q} className="bg-card border border-border rounded-xl p-6 group">
                  <summary className="font-display text-lg font-semibold text-foreground cursor-pointer list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-primary group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                  </summary>
                  <p className="text-muted-foreground mt-4 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Offert */}
        <section id="offert" className="bg-secondary py-20">
          <div className="container mx-auto px-4">
            <div className="bg-card border border-border rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto">
              <Paintbrush className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Boka taktvätt i Roslagen idag
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                Vi erbjuder kostnadsfri besiktning och offert med fast pris. ROT-avdrag och 10 års garanti ingår alltid.
                Verksamma i hela Roslagen — Blidö, Ljusterö, Yxlan, Furusund, Vaxholm, Norrtälje och skärgården.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="/#offert" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors animate-subtle-pulse">
                  Få kostnadsfri offert <ArrowRight className="h-4 w-4" />
                </a>
                <a href="tel:0701543639" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md border border-foreground/30 text-foreground font-medium hover:bg-foreground/5 transition-colors">
                  <Phone className="h-4 w-4" /> Ring oss direkt
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Svar inom 24h</span>
                <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Fast pris</span>
                <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> ROT-avdrag 30 %</span>
                <span className="inline-flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 10 års garanti</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <a href="/#tjanster" className="text-sm text-primary font-medium hover:underline">
            ← Tillbaka till alla tjänster
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Taktvatt;
