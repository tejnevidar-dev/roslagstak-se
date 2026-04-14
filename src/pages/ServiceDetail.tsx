import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/components/Services";
import EternitSEOContent from "@/components/EternitSEOContent";

const serviceDetails: Record<string, { longDesc: string; benefits: string[]; process: string[]; priceRange?: string }> = {
  takomlaggning: {
    longDesc: "En takomläggning innebär att hela det befintliga takmaterialet rivs och ersätts med nytt. Vi inspekterar alltid underlaget (råspont) och byter ut skadat virke innan det nya materialet läggs. Vi hjälper dig välja mellan plåttak, tegelpannor, betongpannor eller papptak beroende på ditt hus, din budget och dina önskemål. Allt arbete utförs enligt AMA-standard av certifierade takläggare med 10 års garanti.",
    priceRange: "Från ca 1 200 kr/m² (TP20) till 2 000+ kr/m² (dubbelfalsat). Exakt pris beror på takets storlek, material och underlag. ROT-avdrag tillkommer.",
    benefits: [
      "Rivning av befintligt yttertak",
      "Ny råspont och ventilation vid behov",
      "Nytt underlagspapp, fotplåtar och underbeslag runt genomföringar",
      "Ny läkt, vindskivor, vindskiveplåtar och ny avvattning",
      "Plåtdetaljer såsom stoss och skorstensinklädnad",
      "Byggställning",
      "Avfallshantering",
    ],
    process: [
      "Kostnadsfri besiktning och offert",
      "Offert godkänns av kund",
      "Logistikplanering påbörjas",
      "Byggställning monteras",
      "Rivning av befintligt yttertak",
      "Montering av nytt takmaterial",
      "Installation av ny taksäkerhet och avvattning",
      "Slutsamråd med kund och ansvarig säljare för att säkerställa att allt är korrekt utfört enligt offert",
      "Slutbesiktning och garantibevis",
      "Rivning av byggställning och avetablering från fastigheten",
    ],
  },
  takrenovering: {
    longDesc: "En takrenovering innebär att vi åtgärdar problem och förlänger livslängden på ditt befintliga tak utan att byta hela takmaterialet. Det kan handla om att byta enstaka trasiga pannor, laga läckor, byta underlagspapp, reparera plåtbeslag eller åtgärda röta i råsponten. Vi har erfarenhet av att renovera tak på öar med begränsad tillgänglighet och löser logistiken oavsett plats.",
    priceRange: "Från ca 300 kr/m² beroende på skadans omfattning. Alltid fast pris efter besiktning. ROT-avdrag tillkommer.",
    benefits: [
      "Lägre kostnad än komplett takomläggning",
      "Snabbare genomförande",
      "Förlänger befintligt taks livslängd",
      "Åtgärdar läckor och fuktskador",
      "Byte av enstaka pannor eller plåtsektioner",
      "Reparation av rötskadat virke",
    ],
    process: [
      "Besiktning och skadebedömning",
      "Offert med tydlig åtgärdslista",
      "Reparation av skadat underlag",
      "Byte av trasiga pannor/plåtsektioner",
      "Tätning och lagning av läckor",
      "Slutkontroll och dokumentation",
    ],
  },
  takavvattning: {
    longDesc: "Ett fungerande takavvattningssystem är avgörande för att skydda husets fasad, grund och konstruktion. Vi installerar och byter hängrännor, stuprör, ränndalar och plåtbeslag i aluminium, koppar eller lackerad plåt. Vi dimensionerar systemet efter takets storlek och lutning för optimal vattenavrinning.",
    priceRange: "Från ca 250 kr/löpmeter för hängrännor i aluminium. Komplett system med stuprör från ca 15 000 kr. ROT-avdrag tillkommer.",
    benefits: [
      "Skyddar fasad och grund mot vattenskador",
      "Hängrännor i aluminium, koppar eller lackerad plåt",
      "Stuprör med korrekt dimensionering",
      "Lövinsamlare och galler vid behov",
      "Material i aluminium, koppar eller lackerad plåt",
      "Prydligt och hållbart resultat",
    ],
    process: [
      "Besiktning av befintligt system",
      "Dimensionering och materialval",
      "Demontering av gammalt system",
      "Montering av nya hängrännor",
      "Installation av stuprör och anslutningar",
      "Funktionskontroll",
    ],
  },
  takkupor: {
    longDesc: "Takkupor och takfönster är ett utmärkt sätt att utnyttja vindsutrymmet och släppa in mer ljus. Vi bygger nya takkupor och monterar takfönster (t.ex. Velux) med korrekt vattenavledning och isolering. Med en eller flera takkupor kan du skapa sovrum, kontor eller hobbyrum och öka boendeytan avsevärt.",
    priceRange: "Takkupa från ca 50 000 kr. Takfönster (Velux) från ca 15 000 kr inkl. montering. ROT-avdrag tillkommer.",
    benefits: [
      "Mer dagsljus på vindsvåningen",
      "Ökat boendeyta och husvärde",
      "Bättre ventilation",
      "Karaktär och charm till huset",
      "Korrekt vattenavledning runt kupa/fönster",
      "Energieffektiva takfönster",
    ],
    process: [
      "Platsbesök och planering",
      "Bygglovsansökan vid behov",
      "Konstruktionsberäkning",
      "Uppbyggnad av takkupa/fönsteröppning",
      "Taktäckning och plåtarbete",
      "Isolering och invändig finishing",
    ],
  },
  takinspektion: {
    longDesc: "En regelbunden takinspektion förebygger dyra skador. Vi utför grundliga besiktningar där vi kontrollerar takmaterialets skick, underlagspapp, råspont, taksäkerhet, avvattningssystem och ventilation. Du får en skriftlig rapport med foton och tydliga åtgärdsförslag. Vår inspektion är helt kostnadsfri och utan förbindelser.",
    priceRange: "Helt kostnadsfritt — inga dolda avgifter.",
    benefits: [
      "Helt kostnadsfri och utan förbindelser",
      "Skriftlig rapport med foton",
      "Identifierar problem innan de blir dyra",
      "Kontrollerar takmaterial, underlag och ventilation",
      "Bedömer återstående livslängd",
      "Tydliga åtgärdsförslag med prisuppskattning",
    ],
    process: [
      "Boka besiktning (telefon eller formulär)",
      "Vi besöker din fastighet",
      "Grundlig inspektion av tak, underlag och avvattning",
      "Fotografering och dokumentation",
      "Skriftlig rapport skickas till dig",
      "Genomgång av resultat och rekommendationer",
    ],
  },
  platarbeten: {
    longDesc: "Plåtarbeten är en central del av alla takprojekt. Vi utför allt från taktäckning med profilerad plåt och bandtäckning till beslag runt skorstenar, ventilationsgenomföringar, takfönster och ränndalar. Våra plåtslagare är certifierade och har lång erfarenhet av att arbeta med både stål, aluminium, koppar och zink.",
    priceRange: "Beslag och detaljer från ca 2 000 kr. Taktäckning med plåt från ca 1 200 kr/m². ROT-avdrag tillkommer.",
    benefits: [
      "Certifierade plåtslagare",
      "Taktäckning med alla typer av plåt",
      "Beslag runt skorstenar och genomföringar",
      "Ränndalar och vindskivor i plåt",
      "Material i stål, aluminium, koppar och zink",
      "10 års garanti",
    ],
    process: [
      "Besiktning och uppmätning",
      "Materialval och färgval",
      "Tillverkning av specialbeslag",
      "Montering och falsning",
      "Täthetskontroll",
      "Slutbesiktning",
    ],
  },
  takvard: {
    longDesc: "Takvård handlar om att underhålla och skydda ditt tak för att förlänga dess livslängd och bevara husets utseende. Vi erbjuder professionell taktvätt där vi tar bort mossa, alger och smuts med skonsamma metoder som inte skadar takmaterialet. Vi utför även takmålning med specialfärger anpassade för tak — oavsett om det är betongpannor, tegelpannor eller plåttak. Ett välskött tak håller längre, ser bättre ut och skyddar bättre mot väder och vind.",
    priceRange: "Taktvätt från ca 80 kr/m². Takmålning från ca 150 kr/m². ROT-avdrag tillkommer.",
    benefits: [
      "Professionell taktvätt med skonsam metod",
      "Borttagning av mossa, alger och lavar",
      "Takmålning med specialfärg för tak",
      "Förlänger takets livslängd avsevärt",
      "Fräschar upp husets utseende",
      "Skyddar takmaterialet mot fukt och UV",
    ],
    process: [
      "Kostnadsfri besiktning av takets skick",
      "Offert med tydlig beskrivning av åtgärder",
      "Skonsam högtryckstvätt eller manuell rengöring",
      "Behandling mot mossa och alger",
      "Grundning och takmålning vid behov",
      "Slutkontroll och dokumentation",
    ],
  },
  "eternit-asbest": {
    longDesc: "Många äldre hus i Roslagen och skärgården har tak av eternitplattor som innehåller asbest — ett hälsofarligt material som kräver specialhantering vid rivning. Vi utför professionell asbestsanering enligt Arbetsmiljöverkets föreskrifter (AFS 2006:1). Vårt team har utbildning i asbesthantering och använder skyddsutrustning, slussystem och godkänd emballering. Efter rivning transporteras materialet till godkänd deponi. Vi erbjuder sedan komplett takomläggning med modernt material så att du får ett säkert, hållbart och vackert tak. Vi har lång erfarenhet av att sanera eternittak på öar utan broförbindelse i Roslagens skärgård.",
    priceRange: "Sanering från ca 400 kr/m² + nytt tak från ca 800 kr/m². Exakt pris beror på takets storlek, åtkomlighet och asbesttyp. ROT-avdrag tillkommer.",
    benefits: [
      "Certifierad asbestsanering enligt AFS 2006:1",
      "Säker rivning med fullständig skyddsutrustning",
      "Godkänd emballering och transport till deponi",
      "Anmälan till Arbetsmiljöverket hanteras av oss",
      "Komplett takomläggning efter sanering",
      "Erfarenhet av eternittak på skärgårdsöar",
    ],
    process: [
      "Kostnadsfri besiktning och materialprovtagning",
      "Anmälan till Arbetsmiljöverket (minst 7 dagar före)",
      "Upprättande av saneringsplan",
      "Säker rivning med skyddsåtgärder",
      "Emballering och transport till godkänd deponi",
      "Inspektion av underlag och eventuell reparation",
      "Montering av nytt takmaterial",
      "Slutbesiktning och dokumentation",
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);
  const details = slug ? serviceDetails[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service || !details) {
    return (
      <>
        <Header />
        <main className="py-32 text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Tjänsten hittades inte</h1>
          <Link to="/" className="text-primary underline">Tillbaka till startsidan</Link>
        </main>
        <Footer />
      </>
    );
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Tjänster", item: "https://roslagstak.se/#tjanster" },
      { "@type": "ListItem", position: 3, name: service.title, item: `https://roslagstak.se/tjanster/${slug}` },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: details.longDesc,
    ...(details.priceRange ? { offers: { "@type": "Offer", priceSpecification: { "@type": "UnitPriceSpecification", priceCurrency: "SEK", description: details.priceRange } } } : {}),
    provider: {
      "@type": "RoofingContractor",
      name: "RoslagsTak",
      url: "https://roslagstak.se",
      telephone: "+46701543639",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        ratingCount: "153",
        reviewCount: "153",
      },
    },
    areaServed: { "@type": "Place", name: "Roslagen" },
  };

  return (
    <>
      <SEOHead
        title={slug === "eternit-asbest"
          ? "Eternitsanering & Asbestrivning Roslagen — Certifierad"
          : `${service.title} i Roslagen — Takläggare RoslagsTak`}
        description={slug === "eternit-asbest"
          ? "Certifierad eternitsanering och asbestrivning i Roslagen & skärgården. Säker rivning enligt AFS 2006:1, transport till deponi och nytt tak. Kostnadsfri besiktning. ROT-avdrag."
          : `${service.title} i Roslagen. ${service.description} Kostnadsfri offert och 10 års garanti.`}
        canonical={`https://roslagstak.se/tjanster/${slug}`}
      />
      <Header />
      <main className="pt-24 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span>/</span>
            <Link to="/#tjanster" className="hover:text-primary transition-colors">Tjänster</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{service.title}</span>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>

            {/* Long description */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-foreground leading-relaxed">{details.longDesc}</p>
            </div>

            {/* Eternit-specific SEO content */}
            {slug === "eternit-asbest" && <EternitSEOContent />}


            {/* Benefits & Process */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-display text-xl text-card-foreground mb-4">Vad ingår</h2>
                <ul className="space-y-3">
                  {details.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-display text-xl text-card-foreground mb-4">Så här går det till</h2>
                <ol className="space-y-3">
                  {details.process.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-accent rounded-lg p-8 text-center">
              <h2 className="font-display text-2xl text-accent-foreground mb-2">
                {slug === "eternit-asbest"
                  ? "Har du eternittak med asbest?"
                  : `Intresserad av ${service.title.toLowerCase()}?`}
              </h2>
              <p className="text-accent-foreground/70 text-sm mb-6">
                {slug === "eternit-asbest"
                  ? "Kontakta oss för kostnadsfri rådgivning om ditt eternittak. Vi hjälper dig vidare."
                  : "Kontakta oss för en kostnadsfri besiktning och offert."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {slug !== "eternit-asbest" && (
                  <Link
                    to="/#offert"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors animate-subtle-pulse"
                  >
                    Få offert <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  to="/#radgivning"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-md text-sm font-semibold transition-colors animate-subtle-pulse ${
                    slug === "eternit-asbest"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Kostnadsfri rådgivning
                </Link>
              </div>
            </div>

            {/* Internal links */}
            <div className="bg-card border border-border rounded-lg p-6 mt-8">
              <h2 className="font-display text-lg text-card-foreground mb-3">Relaterat innehåll</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                <Link to="/priser" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Se prislista
                </Link>
                <Link to="/blogg/kostnad-takbyte-2026" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Vad kostar takbyte 2026?
                </Link>
                <Link to="/blogg/rot-avdrag-takbyte" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> ROT-avdrag vid takbyte
                </Link>
                {slug === "eternit-asbest" && (
                  <Link to="/blogg/eternittak-asbest-sanering" className="flex items-center gap-1 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Allt om eternittak och asbest
                  </Link>
                )}
                <Link to="/taklaggare-blido" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takläggare på Blidö
                </Link>
                <Link to="/taklaggare-ljustero" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takläggare på Ljusterö
                </Link>
                <Link to="/recensioner" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Kundrecensioner
                </Link>
              </div>
            </div>

            {/* Back */}
            <div className="mt-8">
              <Link to="/#tjanster" className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" />
                Tillbaka till alla tjänster
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetail;
