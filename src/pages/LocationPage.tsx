import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MapPin, ArrowRight, CheckCircle, Phone, Star, ChevronDown, Home } from "lucide-react";
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
  const faqs = generateLocationFAQs(location.name, prep, location.isIsland);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: "RoslagsTak",
    url: `https://roslagstak.se/taklaggare-${location.slug}`,
    telephone: "+46730849772",
    email: "info@roslagstak.se",
    areaServed: {
      "@type": "Place",
      name: location.name,
    },
    description: location.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Norrtälje",
      addressRegion: "Stockholms län",
      addressCountry: "SE",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "153",
      reviewCount: "153",
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

  return (
    <>
      <SEOHead
        title={`Takläggare ${prep} ${location.name} — Takbyte & Takrenovering`}
        description={location.description}
        canonical={`https://roslagstak.se/taklaggare-${location.slug}`}
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

        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link to="/" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              Startsidan
            </Link>
            <span>/</span>
            <Link to="/#omraden" className="hover:text-primary transition-colors">Områden</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{location.name}</span>
          </nav>

          {/* Hero */}
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <MapPin className="w-3 h-3" />
              {location.region}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Takläggare {prep} {location.name} — takbyte & takrenovering
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

                <h3 className="font-display text-xl text-foreground mb-3">
                  Våra taktjänster {prep} {location.name}
                </h3>
                <ul className="space-y-2 mb-6">
                  {[
                    `Takomläggning ${prep} ${location.name}`,
                    `Takrenovering ${prep} ${location.name}`,
                    `Plåtarbeten och takavvattning`,
                    `TP20, dubbelfalsat, tegelplåt, pannplåt och lertegeltak`,
                    `Takinspektion med kostnadsfri rapport`,
                    `Hjälp med ROT-avdrag`,
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Deep internal links */}
                <div className="bg-card border border-border rounded-lg p-5 mb-6">
                  <h3 className="font-display text-lg text-card-foreground mb-3">
                    Populära tjänster {prep} {location.name}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <Link to={`/takbyte-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takbyte {prep} {location.name}
                    </Link>
                    <Link to={`/takrenovering-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takrenovering {prep} {location.name}
                    </Link>
                    <Link to="/priser" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Se prislista
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
                  </div>
                </div>

                <h3 className="font-display text-xl text-foreground mb-3">
                  Varför välja RoslagsTak {prep} {location.name}?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vi har 70 års samlad erfarenhet och har genomfört 150+ takprojekt i Roslagen. 
                  {location.isIsland
                    ? ` Vi hanterar all materialtransport till ${location.name} och planerar logistiken så att ditt takprojekt genomförs smidigt och effektivt.`
                    : ` Med lokal närvaro i Norrtälje når vi ${location.name} snabbt och erbjuder konkurrenskraftiga priser.`}
                  {" "}Alla arbeten utförs enligt AMA-standard med 10 års garanti.
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
                  to="/#offert"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Konfigurera din offert <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+46730849772"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors mt-3"
                >
                  <Phone className="w-4 h-4" /> Ring 073-084 97 72
                </a>
              </div>

              {/* Nearby locations */}
              {nearby.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-display text-lg text-card-foreground mb-4">Närliggande områden</h3>
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
                <h3 className="font-display text-lg text-card-foreground mb-3">Våra tjänster</h3>
                <div className="space-y-2">
                  {["Takomläggning", "Takrenovering", "Takavvattning", "Plåtarbeten", "Takinspektion"].map((s) => (
                    <Link
                      key={s}
                      to={`/tjanster/${s.toLowerCase().replace("ö", "o").replace("å", "a")}`}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      <ArrowRight className="w-3 h-3" /> {s}
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
