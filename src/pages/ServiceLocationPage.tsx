import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MapPin, ArrowRight, CheckCircle, Phone, Star, Shield, Clock, Award } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCombo, allServiceSlugs } from "@/data/service-location-combos";
import { locations } from "@/data/locations";
import { generateServiceLocationFAQs } from "@/data/location-faqs";
import NotFound from "./NotFound";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ServiceLocationPage = () => {
  const pathname = useLocation().pathname;
  const serviceSlug =
    allServiceSlugs.find((s) => pathname.startsWith(`/${s}-`)) ?? "";
  const prefix = serviceSlug ? `/${serviceSlug}-` : "";
  const locSlug = prefix ? pathname.replace(prefix, "") : undefined;
  const combo = serviceSlug && locSlug ? getCombo(serviceSlug, locSlug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug, locSlug]);

  if (!combo) return <NotFound />;

  const loc = locations.find((l) => l.slug === combo.locationSlug);
  const nearbyInService = loc?.nearbyLocations
    .map((name) => {
      const nearby = locations.find((l) => l.name === name);
      return nearby ? { ...nearby, comboUrl: `/${combo.serviceSlug}-${nearby.slug}` } : null;
    })
    .filter(Boolean) || [];

  const otherServices = [
    { slug: "takbyte", name: "Takbyte" },
    { slug: "takrenovering", name: "Takrenovering" },
    { slug: "takomlaggning", name: "Takomläggning" },
    { slug: "platttak", name: "Plåttak" },
    { slug: "bandtackning", name: "Bandtäckning" },
    { slug: "betongpannor", name: "Betongpannor" },
    { slug: "tegeltak", name: "Tegeltak" },
    { slug: "takmalning", name: "Takmålning" },
    { slug: "taktvatt", name: "Taktvätt" },
  ].filter((s) => s.slug !== combo.serviceSlug);

  const faqs = generateServiceLocationFAQs(
    combo.serviceName,
    combo.locationName,
    combo.prep,
    loc?.isIsland || false,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${combo.serviceName} ${combo.prep} ${combo.locationName}`,
    description: combo.description,
    url: `https://roslagstak.se${combo.url}`,
    provider: {
      "@type": "RoofingContractor",
      name: "RoslagsTak",
      url: "https://roslagstak.se",
      telephone: "+46701543639",
      image: "https://roslagstak.se/og-image.jpg",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "153",
        reviewCount: "153",
      },
    },
    areaServed: {
      "@type": "Place",
      name: combo.locationName,
      geo: loc ? {
        "@type": "GeoCoordinates",
        latitude: loc.lat,
        longitude: loc.lng,
      } : undefined,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "SEK",
      description: combo.serviceSlug === "takbyte"
        ? "Från ca 1 200 kr/m² (TP20) till 2 000+ kr/m² (dubbelfalsat). ROT-avdrag tillkommer."
        : "Från ca 300 kr/m² beroende på åtgärd. ROT-avdrag tillkommer.",
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
      { "@type": "ListItem", position: 2, name: `Takläggare ${combo.prep} ${combo.locationName}`, item: `https://roslagstak.se/taklaggare-${combo.locationSlug}` },
      { "@type": "ListItem", position: 3, name: combo.serviceName, item: `https://roslagstak.se${combo.url}` },
    ],
  };

  // Richer meta description
  const metaDescription = loc?.isIsland
    ? `${combo.serviceName} ${combo.prep} ${combo.locationName} — specialist på öar i Roslagen. Fast pris ✓ 10 års garanti ✓ ROT-avdrag ✓ Kostnadsfri besiktning. Ring 070-154 36 39.`
    : `${combo.serviceName} ${combo.prep} ${combo.locationName} — lokal takläggare. Fast pris ✓ 10 års garanti ✓ ROT-avdrag ✓ Kostnadsfri besiktning och offert.`;

  // Title under 60 chars
  const seoTitle = `${combo.serviceName} ${combo.prep} ${combo.locationName} — Fast pris | RoslagsTak`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={metaDescription}
        canonical={`https://roslagstak.se${combo.url}`}
        geoPosition={loc ? `${loc.lat};${loc.lng}` : undefined}
        geoPlacename={combo.locationName}
      />
      <Header />
      <main className="pt-24 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span>/</span>
            <Link to={`/taklaggare-${combo.locationSlug}`} className="hover:text-primary transition-colors">Takläggare {combo.prep} {combo.locationName}</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{combo.serviceName}</span>
          </nav>

          {/* Hero */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <MapPin className="w-3 h-3" />
              {loc?.region || "Roslagen"}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              {combo.serviceName} {combo.prep} {combo.locationName} — fast pris & 10 års garanti
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {combo.description}
            </p>
            {/* Star rating + trust */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.9 av 5 — 153 kundrecensioner
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" /> 10 års garanti
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" /> Svar inom 24h
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-primary" /> AMA-standard
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-6">
              {combo.content.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>
              ))}

              {/* Internal links to related services */}
              <div className="bg-card border border-border rounded-lg p-6 mt-8">
                <h2 className="font-display text-lg text-card-foreground mb-4">
                  Relaterade tjänster {combo.prep} {combo.locationName}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link
                    to={`/taklaggare-${combo.locationSlug}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ArrowRight className="w-3 h-3" /> Takläggare {combo.prep} {combo.locationName}
                  </Link>
                  {otherServices.map((os) => (
                    <Link
                      key={os.slug}
                      to={`/${os.slug}-${combo.locationSlug}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ArrowRight className="w-3 h-3" /> {os.name} {combo.prep} {combo.locationName}
                    </Link>
                  ))}
                  <Link to="/tjanster/takavvattning" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Takavvattning
                  </Link>
                  <Link to="/tjanster/takinspektion" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Kostnadsfri takinspektion
                  </Link>
                  <Link to="/tjanster/eternit-asbest" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Eternitsanering & asbest
                  </Link>
                  <Link to="/blogg/rot-avdrag-takbyte" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> ROT-avdrag vid takbyte
                  </Link>
                  <Link to="/blogg/kostnad-takbyte-2026" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Vad kostar takbyte 2026?
                  </Link>
                  <Link to="/priser" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Se vår prislista
                  </Link>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-8">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Vanliga frågor om {combo.serviceName.toLowerCase()} {combo.prep} {combo.locationName}
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
                  Få en offert för {combo.serviceName.toLowerCase()} {combo.prep} {combo.locationName}. Vi återkopplar inom 24 timmar.
                </p>
                <Link
                  to="/#offert"
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

              {/* USPs */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">Varför RoslagsTak?</h3>
                <ul className="space-y-2">
                  {[
                    "10 års garanti",
                    "Fast pris utan dolda kostnader",
                    "Hjälp med ROT-avdrag",
                    "Kostnadsfri besiktning",
                  ].map((usp) => (
                    <li key={usp} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {usp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nearby combos */}
              {nearbyInService.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display text-lg text-card-foreground mb-4">
                    {combo.serviceName} i närheten
                  </h3>
                  <div className="space-y-2">
                    {nearbyInService.map((n: any) => (
                      <Link
                        key={n.slug}
                        to={n.comboUrl}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        {combo.serviceName} {n.isIsland ? "på" : "i"} {n.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* All locations for this service */}
          <div className="border-t border-border pt-12">
            <h2 className="font-display text-2xl text-foreground mb-6 text-center">
              {combo.serviceName} i hela Roslagen
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {locations.map((l) => (
                <Link
                  key={l.slug}
                  to={`/${combo.serviceSlug}-${l.slug}`}
                  className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    l.slug === combo.locationSlug
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  {l.name}
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

export default ServiceLocationPage;
