import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, PlayCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { services } from "@/components/Services";
import EternitSEOContent from "@/components/EternitSEOContent";
import imgRoofProject from "@/assets/roof-project.jpg";
import imgRooferWork from "@/assets/roofer-work.jpg";
import imgRannor from "@/assets/roof-build-03-rannor.jpg";

import imgBeslag from "@/assets/roof-build-07-beslag.jpg";
import imgLayers from "@/assets/roof-layers-macro.jpg";
import imgAfter from "@/assets/after-roof-1.jpg";
import imgCottage from "@/assets/project-coastal-cottage.jpg";
import imgCabin from "@/assets/project-island-cabin.jpg";
import imgVilla from "@/assets/project-villa-copper.jpg";
import imgLakt from "@/assets/roof-build-05-lakt.jpg";
import imgPannor from "@/assets/roof-build-06-pannor.jpg";
import imgCinematic from "@/assets/hero-cinematic.jpg";

const serviceImages: Record<string, string> = {
  takomlaggning: imgRoofProject,
  takrenovering: imgRooferWork,
  takavvattning: imgRannor,
  takkupor: imgCottage,
  takinspektion: imgLayers,
  platarbeten: imgBeslag,
  takvard: imgAfter,
  "eternit-asbest": imgCabin,
};

/** Närbild i översiktssektionen — alltid en annan bild än heron. */
const detailImages: Record<string, string> = {
  takomlaggning: imgLakt,
  takrenovering: imgLayers,
  takavvattning: imgBeslag,
  takkupor: imgVilla,
  takinspektion: imgRooferWork,
  platarbeten: imgLayers,
  takvard: imgPannor,
  "eternit-asbest": imgRooferWork,
};


const serviceDetails: Record<string, { longDesc: string; benefits: string[]; process: string[]; priceRange?: string }> = {
  takomlaggning: {
    longDesc: "En takomläggning innebär att hela det befintliga takmaterialet rivs och ersätts med nytt. Vi inspekterar alltid underlaget (råspont) och byter ut skadat virke innan det nya materialet läggs. Vi hjälper dig välja mellan plåttak, tegelpannor, betongpannor eller papptak beroende på ditt hus, din budget och dina önskemål. Allt arbete utförs enligt AMA-standard av certifierade takläggare med 10 års utförandegaranti och 30 års materialgaranti.",
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
      "10 års utförandegaranti, 30 års materialgaranti",
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
    priceRange: "Sanering från ca 400 kr/m² + nytt tak från ca 1 200 kr/m². Exakt pris beror på takets storlek, åtkomlighet och asbesttyp. ROT-avdrag tillkommer.",
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
  const serviceImage = (slug && serviceImages[slug]) || imgRoofProject;
  const detailImage = (slug && detailImages[slug]) || imgLayers;
  const bandImage = slug === "takvard" ? imgAfter : imgCinematic;

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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Så här går ${service.title.toLowerCase()} till — steg för steg`,
    description: details.longDesc,
    totalTime: "P14D",
    ...(details.priceRange ? {
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "SEK",
        value: details.priceRange,
      },
    } : {}),
    supply: details.benefits.slice(0, 5).map((b) => ({ "@type": "HowToSupply", name: b })),
    tool: [
      { "@type": "HowToTool", name: "Byggställning" },
      { "@type": "HowToTool", name: "Säkerhetsutrustning enligt AFS" },
      { "@type": "HowToTool", name: "Plåtsax och falsverktyg" },
    ],
    step: details.process.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step,
      text: step,
      url: `https://roslagstak.se/tjanster/${slug}#steg-${i + 1}`,
    })),
  };

  return (
    <>
      <SEOHead
        title={slug === "eternit-asbest"
          ? "Eternitsanering & Asbestrivning Roslagen — Certifierad"
          : `${service.title} i Roslagen — Takläggare RoslagsTak`}
        description={slug === "eternit-asbest"
          ? "Certifierad eternitsanering och asbestrivning i Roslagen & skärgården. Säker rivning enligt AFS 2006:1, transport till deponi och nytt tak. Kostnadsfri besiktning. ROT-avdrag."
          : `${service.title} i Roslagen. ${service.description} Kostnadsfri offert, 10 års utförandegaranti och 30 års materialgaranti.`}
        canonical={`https://roslagstak.se/tjanster/${slug}`}
      />
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

        {/* Split-screen hero */}
        <section className="relative bg-primary text-primary-foreground">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative flex flex-col justify-center px-6 pb-16 pt-32 sm:px-10 lg:pb-24 lg:pt-36 xl:px-20">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.07] bg-grid-fine"
              />
              <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
                <nav aria-label="Brödsmulor" className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/55">
                  <Link to="/" className="transition-colors hover:text-seafoam-light">Startsidan</Link>
                  <span aria-hidden="true">/</span>
                  <Link to="/#tjanster" className="transition-colors hover:text-seafoam-light">Tjänster</Link>
                  <span aria-hidden="true">/</span>
                  <span className="text-seafoam-light">{service.title}</span>
                </nav>

                <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam-light">
                  <span aria-hidden="true" className="h-px w-10 bg-seafoam-light/60" />
                  Tjänst i Roslagen och skärgården
                </p>

                <h1 className="mt-7 font-display text-[clamp(2.2rem,4.4vw,3.9rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
                  {service.title}
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
                  {service.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <Link
                    to="/#offert"
                    className="group inline-flex items-center gap-3 bg-seafoam px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-seafoam-light hover:text-primary animate-subtle-pulse"
                  >
                    Begär kostnadsfri offert
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <a
                    href="tel:0701543639"
                    className="inline-flex items-center gap-2.5 border border-primary-foreground/25 px-7 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-seafoam-light hover:text-seafoam-light"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    070-154 36 39
                  </a>
                </div>

                <Link
                  to="/#hur-det-gar-till"
                  className="mt-8 inline-flex items-center gap-2 border-b border-seafoam/60 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-seafoam-light"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Se hur ett takbyte går till
                </Link>


                <ul className="mt-12 grid gap-3 border-t border-primary-foreground/15 pt-8 sm:grid-cols-2">
                  {[
                    "Kostnadsfri besiktning och fast pris",
                    "Certifierade takläggare, F-skatt",
                    "ROT-avdrag på arbetskostnaden",
                    "Vana vid öar utan broförbindelse",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[14px] text-primary-foreground/80">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-seafoam-light" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Höger panel — bild med spec-kort */}
            <figure className="relative m-0 min-h-[340px] overflow-hidden bg-accent lg:min-h-full">
              <img
                src={serviceImage}
                alt={`${service.title} i Roslagen utförd av RoslagsTak`}
                width={1600}
                height={1200}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-primary/10"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="border-t border-seafoam-light/40 bg-primary/85 p-6 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-seafoam-light/40">
                      <service.icon className="h-5 w-5 text-seafoam-light" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-seafoam-light">
                        Prisbild
                      </p>
                      <p className="mt-2 text-[14px] leading-relaxed text-primary-foreground/80">
                        {details.priceRange ?? "Fast pris efter kostnadsfri besiktning."}
                      </p>
                    </div>
                  </div>
                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-primary-foreground/15 pt-5">
                    {[
                      { label: "Utförande", value: "10 år" },
                      { label: "Material", value: "30 år" },
                      { label: "Standard", value: "AMA" },
                    ].map((fact) => (
                      <div key={fact.label}>
                        <dt className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary-foreground/50">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 font-display text-base font-bold tracking-[-0.02em]">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-primary-foreground/15 bg-primary/85 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] backdrop-blur-sm">
                  <span>{service.title} — Roslagens kust</span>
                  <span className="text-primary-foreground/55">RT</span>
                </div>
              </figcaption>

            </figure>
          </div>
        </section>

        {/* Faktarad — samma band som på startsidans hero */}
        <section aria-label="Snabbfakta" className="bg-accent text-primary-foreground">
          <dl className="grid grid-cols-2 border-t border-primary-foreground/15 md:grid-cols-4">
            {[
              { k: "Prisbild", v: details.priceRange?.split(".")[0] ?? "Fast pris efter besiktning", note: "ROT-avdrag på arbetskostnaden" },
              { k: "Garanti", v: "10 + 30 år", note: "Utförande respektive material" },
              { k: "Besiktning", v: "Kostnadsfri", note: "Skriftlig bedömning med foton" },
              { k: "Utförande", v: "AMA-standard", note: "Certifierade takläggare, F-skatt" },
            ].map((f, i) => (
              <div
                key={f.k}
                className={`group px-7 py-8 transition-colors duration-300 hover:bg-primary ${
                  i < 2 ? "border-b border-primary-foreground/15 md:border-b-0" : ""
                } ${i !== 3 ? "border-r border-primary-foreground/15" : ""}`}
              >
                <dt className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-seafoam-light">
                  {f.k}
                </dt>
                <dd className="font-display text-lg font-bold leading-tight tracking-[-0.02em]">{f.v}</dd>
                <p className="mt-2 text-[13px] leading-relaxed text-primary-foreground/60">{f.note}</p>
              </div>
            ))}
          </dl>
        </section>


        {/* Översikt — text + närbild */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <Reveal>
                <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam">
                  <span aria-hidden="true" className="h-px w-8 bg-seafoam/50" />
                  Översikt
                </p>
                <h2 className="mt-6 font-display text-[clamp(1.7rem,2.6vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground">
                  Om {service.title.toLowerCase()}
                </h2>
                <p className="mt-8 max-w-[60ch] text-[clamp(1.02rem,1.25vw,1.14rem)] leading-[1.8] text-muted-foreground">
                  {details.longDesc}
                </p>
                <div className="mt-10 border-l-2 border-seafoam pl-6">
                  <p className="font-display text-[1.05rem] font-semibold leading-relaxed tracking-[-0.02em] text-foreground">
                    "Vi jobbar med tak i Roslagen och skärgården året runt — och löser logistiken även när sista biten går med båt."
                  </p>
                  <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    RoslagsTak, Blidö
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <figure className="m-0">
                  <div className="overflow-hidden bg-secondary">
                    <img
                      src={detailImage}
                      alt={`Detaljbild från ${service.title.toLowerCase()} i Roslagen`}
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-start gap-3 border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
                    <span className="mt-px text-[10px] font-bold uppercase tracking-[0.22em] text-seafoam">Foto</span>
                    Eget arbete utfört av vårt team i Roslagen — inga lagerbilder på färdiga projekt.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Bildblock i full bredd */}
        <section aria-hidden="true" className="relative h-[38vh] min-h-[260px] overflow-hidden lg:h-[46vh]">
          <img
            src={bandImage}
            alt=""
            width={2000}
            height={1000}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/45" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8 lg:pb-12">
              <p className="max-w-2xl font-display text-[clamp(1.3rem,2.4vw,2.1rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-primary-foreground">
                Rätt underlag, rätt beslag, rätt ventilation — det är där ett tak avgörs.
              </p>
            </div>
          </div>
        </section>

        {/* Vad ingår — faktarutor */}
        <section className="border-y border-border bg-secondary/40 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam">
                  <span aria-hidden="true" className="h-px w-8 bg-seafoam/50" />
                  Omfattning
                </p>
                <h2 className="mt-5 font-display text-[clamp(1.6rem,2.3vw,2.2rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-foreground">
                  Det här ingår i arbetet
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Allt specificeras i offerten — inga tillägg i efterhand utan att du godkänt dem.
              </p>
            </div>

            <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {details.benefits.map((b, i) => (
                <li key={b} className="bg-background">
                  <Reveal delay={(i % 3) * 0.05}>
                    <div className="flex h-full flex-col gap-3 p-7">
                      <span className="font-display text-[11px] font-bold tabular-nums tracking-[0.24em] text-seafoam">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] leading-[1.6] text-foreground">{b}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Arbetsgång — mörkt band */}
        <section className="relative bg-primary py-20 text-primary-foreground lg:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07] bg-grid-fine" />
          <div className="container relative mx-auto px-4">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam-light">
                  <span aria-hidden="true" className="h-px w-8 bg-seafoam-light/50" />
                  Arbetsgång
                </p>
                <h2 className="mt-5 font-display text-[clamp(1.6rem,2.3vw,2.2rem)] font-extrabold leading-[1.12] tracking-[-0.03em]">
                  Så här går det till
                </h2>
                <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-primary-foreground/70">
                  {details.process.length} steg från första besiktning till avetablering. Du har samma kontaktperson hela vägen.
                </p>
                <a
                  href="tel:0701543639"
                  className="mt-8 inline-flex items-center gap-2.5 border border-primary-foreground/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-seafoam-light hover:text-seafoam-light"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  070-154 36 39
                </a>
              </div>

              <ol className="grid gap-px bg-primary-foreground/15 sm:grid-cols-2">
                {details.process.map((step, i) => (
                  <li key={step} id={`steg-${i + 1}`} className="bg-primary">
                    <Reveal delay={(i % 2) * 0.05}>
                      <div className="flex h-full items-start gap-4 p-6">
                        <span className="font-display text-[13px] font-bold tabular-nums text-seafoam-light">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] leading-[1.6] text-primary-foreground/85">{step}</span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Bra att veta — faktarutor */}
        <section className="bg-background py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam">
              <span aria-hidden="true" className="h-px w-8 bg-seafoam/50" />
              Bra att veta
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                {
                  t: "Pris och ROT",
                  d: details.priceRange ?? "Fast pris efter kostnadsfri besiktning.",
                },
                {
                  t: "Garanti och försäkring",
                  d: "10 års utförandegaranti och 30 års materialgaranti från tillverkaren. Vi har F-skatt och fullständigt försäkringsskydd.",
                },
                {
                  t: "Skärgård och logistik",
                  d: "Vi arbetar även på öar utan broförbindelse och planerar båttransport av material och ställning i offerten.",
                },
              ].map((f, i) => (
                <Reveal key={f.t} delay={i * 0.06}>
                  <div className="h-full border-t-2 border-seafoam bg-secondary/40 p-7">
                    <h3 className="font-display text-[1.05rem] font-bold tracking-[-0.02em] text-foreground">{f.t}</h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-muted-foreground">{f.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {slug === "eternit-asbest" && (
          <section className="border-t border-border bg-secondary/40 py-20">
            <div className="container mx-auto px-4">
              <EternitSEOContent />
            </div>
          </section>
        )}

        {/* CTA-band */}
        <section className="relative overflow-hidden py-16 text-primary-foreground lg:py-20">
          <img
            src={serviceImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-primary/90" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07] bg-grid-fine" />
          <div className="container relative mx-auto px-4">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="max-w-2xl">
                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
                  {slug === "eternit-asbest"
                    ? "Har du eternittak med asbest?"
                    : `Intresserad av ${service.title.toLowerCase()}?`}
                </h2>
                <p className="mt-4 text-[17px] leading-[1.7] text-primary-foreground/75">
                  {slug === "eternit-asbest"
                    ? "Kontakta oss för kostnadsfri rådgivning om ditt eternittak. Vi hjälper dig vidare."
                    : "Kontakta oss för en kostnadsfri besiktning och offert."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                {slug !== "eternit-asbest" && (
                  <Link
                    to="/#offert"
                    className="group inline-flex items-center justify-center gap-3 bg-seafoam px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-seafoam-light hover:text-primary animate-subtle-pulse"
                  >
                    Få offert
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                )}
                <Link
                  to="/#radgivning"
                  className={`inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] transition-colors ${
                    slug === "eternit-asbest"
                      ? "bg-seafoam text-primary-foreground hover:bg-seafoam-light hover:text-primary animate-subtle-pulse"
                      : "border border-primary-foreground/25 text-primary-foreground hover:border-seafoam-light hover:text-seafoam-light"
                  }`}
                >
                  Kostnadsfri rådgivning
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Relaterat innehåll */}
        <section className="bg-background py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam">
              <span aria-hidden="true" className="h-px w-8 bg-seafoam/50" />
              Läs vidare
            </p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.5rem,2.1vw,2rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-foreground">
              Relaterat innehåll
            </h2>
            <ul className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
              {[
                { to: "/priser", label: "Se prislista" },
                { to: "/blogg/kostnad-takbyte-2026", label: "Vad kostar takbyte 2026?" },
                { to: "/blogg/rot-avdrag-takbyte", label: "ROT-avdrag vid takbyte" },
                ...(slug === "eternit-asbest"
                  ? [{ to: "/blogg/eternittak-asbest-sanering", label: "Allt om eternittak och asbest" }]
                  : []),
                { to: "/taklaggare-blido", label: "Takläggare på Blidö" },
                { to: "/taklaggare-ljustero", label: "Takläggare på Ljusterö" },
                { to: "/recensioner", label: "Kundrecensioner" },
              ].map((link) => (
                <li key={link.to} className="border-b border-border sm:border-r sm:last:border-r-0">
                  <Link
                    to={link.to}
                    className="group flex h-full items-center justify-between gap-4 px-1 py-5 text-[15px] font-semibold text-foreground transition-colors hover:text-seafoam sm:px-6"
                  >
                    {link.label}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-seafoam transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-14 border-t border-border pt-8">
              <Link
                to="/#tjanster"
                className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-seafoam"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                Tillbaka till alla tjänster
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};


export default ServiceDetail;
