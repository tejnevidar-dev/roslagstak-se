import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Beskrivning */}
        <section className="bg-background py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-[68ch]">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam">
                <span aria-hidden="true" className="h-px w-8 bg-seafoam/50" />
                Översikt
              </p>
              <h2 className="mt-6 font-display text-[clamp(1.7rem,2.6vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground">
                Om {service.title.toLowerCase()}
              </h2>
              <p className="mt-8 text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.8] text-muted-foreground">
                {details.longDesc}
              </p>
            </div>
          </div>
        </section>



        {slug === "eternit-asbest" && (
          <section className="bg-secondary/40 py-20">
            <div className="container mx-auto px-4">
              <EternitSEOContent />
            </div>
          </section>
        )}

        {/* Vad ingår + process */}
        <section className="border-y border-border bg-secondary/40 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="grid gap-px bg-border md:grid-cols-2">
              <div className="bg-background p-8 lg:p-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-seafoam">01</p>
                <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.02em] text-foreground">
                  Vad ingår
                </h2>
                <ul className="mt-8 space-y-4">
                  {details.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-seafoam" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-background p-8 lg:p-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-seafoam">02</p>
                <h2 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.02em] text-foreground">
                  Så här går det till
                </h2>
                <ol className="mt-8 space-y-5">
                  {details.process.map((step, i) => (
                    <li
                      key={step}
                      id={`steg-${i + 1}`}
                      className="flex items-start gap-4 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-seafoam/40 font-display text-xs font-bold text-seafoam">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* CTA-band */}
        <section className="relative bg-primary py-20 text-primary-foreground lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07] bg-grid-fine" />
          <div className="container relative mx-auto px-4">
            <div className="grid items-center gap-10 lg:grid-cols-[0.6fr_0.4fr]">
              <div>
                <h2 className="font-display text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
                  {slug === "eternit-asbest"
                    ? "Har du eternittak med asbest?"
                    : `Intresserad av ${service.title.toLowerCase()}?`}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
                  {slug === "eternit-asbest"
                    ? "Kontakta oss för kostnadsfri rådgivning om ditt eternittak. Vi hjälper dig vidare."
                    : "Kontakta oss för en kostnadsfri besiktning och offert."}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {slug !== "eternit-asbest" && (
                  <Link
                    to="/#offert"
                    className="group inline-flex items-center justify-between gap-3 bg-seafoam px-8 py-5 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-seafoam-light hover:text-primary animate-subtle-pulse"
                  >
                    Få offert
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                )}
                <Link
                  to="/#radgivning"
                  className={`inline-flex items-center justify-between gap-3 px-8 py-5 text-sm font-bold uppercase tracking-[0.14em] transition-colors ${
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
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
              <h2 className="font-display text-[clamp(1.5rem,2.2vw,2.1rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground">
                Relaterat innehåll
              </h2>
              <ul className="grid gap-px bg-border sm:grid-cols-2">
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
                  <li key={link.to} className="bg-background">
                    <Link
                      to={link.to}
                      className="group flex items-center justify-between gap-3 px-5 py-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60"
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
            </div>

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
