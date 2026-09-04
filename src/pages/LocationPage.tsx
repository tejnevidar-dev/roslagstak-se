import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MapPin, ArrowRight, CheckCircle, Phone, Star, Home, Shield, Clock, Award } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocationBySlug, locations } from "@/data/locations";
import { generateLocationFAQs } from "@/data/location-faqs";
import NotFound from "./NotFound";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const pathname = useLocation().pathname;
  
  const resolvedSlug = slug || (pathname.startsWith("/taklaggare-") ? pathname.replace("/taklaggare-", "") : undefined);
  const location = resolvedSlug ? getLocationBySlug(resolvedSlug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resolvedSlug]);

  if (!location) return <NotFound />;

  const nearby = locations.filter((l) => location.nearbyLocations.includes(l.name));
  const prep = location.isIsland ? "på" : "i";
  const faqs = generateLocationFAQs(location.name, prep, location.isIsland, location.uniqueFAQ);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `https://roslagstak.se/taklaggare-${location.slug}#business`,
    name: "RoslagsTak",
    url: `https://roslagstak.se/taklaggare-${location.slug}`,
    telephone: "+46701543639",
    email: "info@roslagstak.se",
    image: "https://roslagstak.se/og-image.jpg",
    logo: "https://roslagstak.se/og-image.jpg",
    sameAs: [
      "https://share.google/FsdpfTq9H3amLoTPe",
    ],
    areaServed: {
      "@type": "Place",
      name: location.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.lat,
        longitude: location.lng,
      },
    },
    description: `${location.primaryKeyword} — ${location.description}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Blidö",
      addressLocality: "Norrtälje",
      postalCode: "76493",
      addressRegion: "Stockholms län",
      addressCountry: "SE",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "153",
      reviewCount: "153",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Anders L." },
        datePublished: "2025-09-15",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Proffsigt takbyte på vår stuga. Allt gick smidigt trots att det var på en ö. Rekommenderas varmt!",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Maria S." },
        datePublished: "2025-11-20",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Snabb och pålitlig service. Fick nytt plåttak till ett bra pris med ROT-avdrag. Mycket nöjd!",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Erik B." },
        datePublished: "2026-02-10",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Bästa takläggaren i Roslagen. Ärliga, punktliga och levererar hög kvalitet. 10 års utförandegaranti och 30 års materialgaranti känns tryggt.",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    priceRange: "$$",
    currenciesAccepted: "SEK",
    paymentAccepted: "Faktura, Swish, Bankgiro",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "15:00",
      },
    ],
    knowsAbout: [
      "Takbyte", "Takomläggning", "Takrenovering", "Plåttak", "TP20",
      "Dubbelfalsat plåttak", "Tegelplåt", "Pannplåt", "Takavvattning",
      "Hängrännor", "Takinspektion", "Taksäkerhet",
      "Eternitsanering", "Asbestrivning", "Takkupor", "Takfönster",
      "Taktvätt", "Takmålning",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Taktjänster ${prep} ${location.name}`,
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Takbyte ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Takrenovering ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Takinspektion ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Plåtarbeten ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Takavvattning ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Eternitsanering ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Taktvätt ${prep} ${location.name}` } },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Områden", item: "https://roslagstak.se/#omraden" },
      { "@type": "ListItem", position: 3, name: `Takläggare ${prep} ${location.name}`, item: `https://roslagstak.se/taklaggare-${location.slug}` },
    ],
  };

  // SEO-optimized meta description — under 160 chars, keyword-first
  const metaDescription = location.isIsland
    ? `${location.primaryKeyword} — takbyte & takrenovering ${prep} ${location.name}. Skärgårdsspecialist, fast pris efter besiktning, 10+30 års garanti och kostnadsfri offert.`
    : `${location.primaryKeyword} — takbyte & takrenovering ${prep} ${location.name}. Lokal takläggare, fast pris efter besiktning, 10+30 års garanti och kostnadsfri offert.`;

  // Title: keep under 60 chars for Google SERP
  const seoTitle = `Takläggare ${prep} ${location.name} — Takbyte & Takrenovering`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={metaDescription}
        canonical={`https://roslagstak.se/taklaggare-${location.slug}`}
        geoPosition={`${location.lat};${location.lng}`}
        geoPlacename={location.name}
      />
      <Header />
      <main className="pt-24 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                <Home className="w-4 h-4" />
                Startsidan
              </Link>
              <span>/</span>
              <Link to="/#omraden" className="hover:text-primary transition-colors">Områden</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{location.name}</span>
            </nav>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors hover:animate-subtle-pulse"
            >
              <Home className="w-4 h-4" />
              Till startsidan
            </Link>
          </div>

          {/* Hero */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <MapPin className="w-3 h-3" />
              {location.region}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Takläggare {prep} {location.name} — takbyte, takrenovering & plåtarbeten
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {location.description}
            </p>
            {/* Star rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.9 av 5 — baserat på 153 kundrecensioner
              </span>
            </div>
            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" /> 10+30 års garanti
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" /> Svar inom 24h
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-slate max-w-none">
                <h2 className="font-display text-2xl text-foreground mb-4">
                  Takbyte och takrenovering {prep} {location.name}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {location.longDescription}
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {location.extraContent}
                </p>

                <h3 className="font-display text-xl text-foreground mb-3">
                  Våra taktjänster {prep} {location.name}
                </h3>
                <ul className="space-y-2 mb-6">
                  {[
                    `Takomläggning och takbyte ${prep} ${location.name}`,
                    `Takrenovering och underhåll ${prep} ${location.name}`,
                    `Plåtarbeten, takavvattning och hängrännor`,
                    `TP20, dubbelfalsat, tegelplåt, pannplåt och lertegeltak`,
                    `Eternitsanering och asbestrivning`,
                    `Takkupor och takfönster (Velux)`,
                    `Taktvätt och takmålning`,
                    `Kostnadsfri takinspektion med skriftlig rapport`,
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="font-display text-xl text-foreground mb-3">
                  Vad kostar takbyte {prep} {location.name}?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Priset för ett takbyte {prep} {location.name} beror på takets storlek, lutning, materialval och underlagets skick. 
                  Som riktpris ligger TP20-plåttak från ca 1 200 kr/m² och dubbelfalsat plåttak från ca 2 000 kr/m². 
                  {location.isIsland
                    ? ` Transportkostnad till ${location.name} ingår alltid i vår offert — inga dolda tillägg.`
                    : ` Du får alltid fast pris efter besiktning — inga dolda tillägg.`}
                  {" "}Med ROT-avdrag får du 30% rabatt på arbetskostnaden (upp till 50 000 kr per person och år).
                </p>

                {/* Deep internal links */}
                <div className="bg-card border border-border rounded-lg p-5 mb-6">
                  <h3 className="font-display text-lg text-card-foreground mb-3">
                    Tjänster, priser och guider {prep} {location.name}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <Link to={`/takbyte-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takbyte {prep} {location.name}
                    </Link>
                    <Link to={`/takrenovering-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takrenovering {prep} {location.name}
                    </Link>
                    <Link to={`/takomlaggning-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takomläggning {prep} {location.name}
                    </Link>
                    <Link to={`/platttak-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Plåttak {prep} {location.name}
                    </Link>
                    <Link to={`/bandtackning-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Bandtäckning {prep} {location.name}
                    </Link>
                    <Link to={`/betongpannor-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Betongpannor {prep} {location.name}
                    </Link>
                    <Link to={`/tegeltak-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Tegeltak {prep} {location.name}
                    </Link>
                    <Link to={`/takmalning-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takmålning {prep} {location.name}
                    </Link>
                    <Link to={`/taktvatt-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Taktvätt {prep} {location.name}
                    </Link>
                    <Link to="/tjanster/eternit-asbest" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Eternitsanering & asbest
                    </Link>
                    <Link to="/tjanster/taktvatt" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Taktvätt & takmålning
                    </Link>
                    <Link to="/priser" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Se prislista för takbyte
                    </Link>
                    <Link to="/taktyper" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Taktyper & material
                    </Link>
                    <Link to="/hur-det-gar-till" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Så går ett takbyte till
                    </Link>
                    <Link to="/offert#faq" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Vanliga frågor om takarbete
                    </Link>
                    <Link to="/offert" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Räkna ut pris på ditt tak
                    </Link>
                    <Link to="/blogg/valja-ratt-tak-roslagen" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Guide: Välj rätt tak
                    </Link>
                    <Link to="/blogg/rot-avdrag-takbyte" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> ROT-avdrag vid takbyte
                    </Link>
                    <Link to="/blogg/tecken-byta-tak" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> 7 tecken att byta tak
                    </Link>
                    <Link to="/blogg/kostnad-takbyte-2026" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Vad kostar takbyte 2026?
                    </Link>
                    <Link to="/recensioner" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Läs kundrecensioner
                    </Link>
                  </div>
                </div>

                <h3 className="font-display text-xl text-foreground mb-3">
                  Varför välja RoslagsTak som {location.primaryKeyword.toLowerCase()}?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vi är en lokal takläggare med stark förankring i Roslagen.
                  {location.isIsland
                    ? ` Vi är specialiserade på takbyten på öar utan broförbindelse. Vi hanterar all materialtransport till ${location.name} sjövägen och planerar logistiken så att ditt takprojekt genomförs smidigt och effektivt.`
                    : ` Med lokal närvaro i Norrtälje når vi ${location.name} snabbt och kan ofta hålla nere kostnaden genom att samordna med andra projekt i området.`}
                  {" "}Alla arbeten utförs enligt AMA Hus med 10 års utförandegaranti och 30 års materialgaranti.
                </p>

                <h3 className="font-display text-xl text-foreground mb-3">
                  Om {location.name} och takläggning i {location.region.toLowerCase()}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {location.name} tillhör {location.region} i Roslagen — ett område där klimatet med {location.isIsland ? "havsvind, salt och fukt" : "kustnära fukt och vind"} ställer 
                  höga krav på takmaterial och utförande. Vi rekommenderar alltid material anpassat för {location.isIsland ? "skärgårdens hårda" : "det kustnära"} klimatet. 
                  Kontakta oss för en kostnadsfri takinspektion {prep} {location.name} — vi ger dig en ärlig bedömning och fast pris utan förbindelser.
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mt-8">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Vanliga frågor om takbyte {prep} {location.name}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
                      <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-primary text-primary-foreground rounded-lg p-6">
                <h3 className="font-display text-lg mb-2">Kostnadsfri offert</h3>
                <p className="text-sm opacity-90 mb-4">
                  Få en offert för ditt takprojekt {prep} {location.name}. Vi återkopplar inom 24 timmar.
                </p>
                <Link
                  to="/offert"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors hover:animate-subtle-pulse"
                >
                  Konfigurera din offert <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+46701543639"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors mt-3 hover:animate-subtle-pulse"
                >
                  <Phone className="w-4 h-4" /> Ring 070-154 36 39
                </a>
              </div>

              {nearby.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display text-lg text-card-foreground mb-4">Takläggare i närområdet</h3>
                  <div className="space-y-2">
                    {nearby.map((loc) => (
                      <Link
                        key={loc.slug}
                        to={`/taklaggare-${loc.slug}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        Takläggare {loc.isIsland ? "på" : "i"} {loc.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-3">Våra taktjänster</h3>
                <div className="space-y-2">
                  {[
                    { name: "Takomläggning", slug: "takomlaggning" },
                    { name: "Takrenovering", slug: "takrenovering" },
                    { name: "Takavvattning", slug: "takavvattning" },
                    { name: "Plåtarbeten", slug: "platarbeten" },
                    { name: "Takinspektion", slug: "takinspektion" },
                    { name: "Takkupor & takfönster", slug: "takkupor" },
                    { name: "Taktvätt & takmålning", slug: "takvard" },
                    { name: "Eternitsanering", slug: "eternit-asbest" },
                  ].map((s) => (
                    <Link
                      key={s.slug}
                      to={`/tjanster/${s.slug}`}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      <ArrowRight className="w-3 h-3" /> {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Other locations */}
          <div className="border-t border-border pt-12">
            <h2 className="font-display text-2xl text-foreground mb-6 text-center">
              Takläggare i hela Roslagen
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/taklaggare-${loc.slug}`}
                  className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    loc.slug === resolvedSlug
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LocationPage;
