import { withRotForbehall } from "@/data/prices";
import { SERVICE_LOCATION_TEXT } from "@/data/service-location-text";
import { isHeading, renderInline } from "@/lib/inline-md";
import { isThinCombo } from "@/data/thin-combos";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MapPin, ArrowRight, CheckCircle, Phone, Shield, Clock, Award } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoogleReviews from "@/components/GoogleReviews";
import { getCombo, allServiceSlugs, COMBO_SERVICE_PAGE, COMBO_LINK_LABEL, MATERIAL_OWN_PAGE, comboDefaultTitle, comboDefaultH1 } from "@/data/service-location-combos";
import { comboOverrides } from "@/data/combo-overrides";
import { locations } from "@/data/locations";
import { generateServiceLocationFAQs } from "@/data/location-faqs";
import NotFound from "./NotFound";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** Inga belopp i strukturerade data på tjänst × ort-sidor (regel 5, Marknadschefen 2026-10-04): riktpriser står på /priser. check-prisfrasing.ts fäller bygget om ett belopp hamnar här. */
const PRIS_UTAN_BELOPP = "Fast pris i offerten efter kostnadsfri takkontroll. Riktpriser per material finns på roslagstak.se/priser.";

const servicePriceDescriptionsRaw: Record<string, string> = {
  takbyte: PRIS_UTAN_BELOPP,
  takomlaggning: PRIS_UTAN_BELOPP,
  takrenovering: "Fast pris efter kostnadsfri takkontroll, beroende på åtgärdens omfattning. Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden.",
  taktvatt: "Fast pris i offerten efter kostnadsfri takkontroll.",
  takmalning: "Fast pris i offerten efter kostnadsfri takkontroll.",
  bandtackning: PRIS_UTAN_BELOPP,
  platttak: PRIS_UTAN_BELOPP,
  betongpannor: PRIS_UTAN_BELOPP,
  tegeltak: PRIS_UTAN_BELOPP,
};
const servicePriceDescriptions: Record<string, string> = Object.fromEntries(
  Object.entries(servicePriceDescriptionsRaw).map(([k, v]) => [k, withRotForbehall(v)]),
);


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

  /* Egen, längre och unik text för vissa tjänst×ort-kombinationer i stället för den korta
     mallgenererade combo-texten (sprint-offensiv-2026-09-28 punkt 3, #14/#1r 2026-09-29). */
  const override = comboOverrides[`${combo.serviceSlug}-${combo.locationSlug}`];

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
    description: override?.description ?? combo.description,
    url: `https://roslagstak.se${combo.url}`,
    provider: {
      "@type": "RoofingContractor",
      name: "RoslagsTak",
      url: "https://roslagstak.se",
      telephone: "+46701543639",
      image: "https://roslagstak.se/og-image.jpg",
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
    ...(loc && isThinCombo(combo.serviceSlug, loc)
      ? {}
      : {
          offers: {
            "@type": "Offer",
            description: servicePriceDescriptions[combo.serviceSlug] ?? "Fast pris i offerten efter kostnadsfri takkontroll.",
          },
        }),
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
  const metaDescription = override?.description ?? combo.description;

  // Title under 60 chars
  const seoTitle = override?.title ?? comboDefaultTitle(combo);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={metaDescription}
        canonical={`https://roslagstak.se${combo.url}`}
        geoPosition={loc ? `${loc.lat};${loc.lng}` : undefined}
        geoPlacename={combo.locationName}
        noindex={loc && isThinCombo(combo.serviceSlug, loc) ? "follow" : undefined}
      />
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        <div className="pt-24">
          <Breadcrumbs
            items={[
              { name: "Hem", path: "/" },
              { name: `Takläggare ${combo.prep} ${combo.locationName}`, path: `/taklaggare-${combo.locationSlug}` },
              { name: combo.serviceName },
            ]}
            withSchema={false}
          />
        </div>

        <div className="container mx-auto px-4 pt-10 pb-20">
          {/* Hero */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <MapPin className="w-3 h-3" />
              {loc?.region || "Roslagen"}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              {comboDefaultH1(combo)}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {override?.description ?? combo.description}
            </p>
            <div className="mt-4">
              <a
                href="https://www.google.com/search?q=RoslagsTak+recensioner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              >
                Läs våra omdömen på Google
              </a>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" /> 10 års utförandegaranti
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" /> Svar inom 24h
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-primary" /> Arbete enligt AMA
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" /> En kontaktperson hela vägen
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <a
                href="tel:0701543639"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              >
                <Phone className="w-4 h-4 text-primary" /> Ring 070-154 36 39
              </a>
              <Link
                to="/takkontroll"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Boka kostnadsfri takkontroll — utan förpliktelser <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-6">
              {(override?.content ?? combo.content).map((paragraph, i) =>
                isHeading(paragraph) ? (
                  <h2 key={i} className="font-display text-xl text-foreground pt-2">{paragraph.slice(3)}</h2>
                ) : (
                  <p key={i} className="text-muted-foreground leading-relaxed">{renderInline(paragraph)}</p>
                ),
              )}

              {/* Internal links to related services */}
              <div className="bg-card border border-border rounded-2xl p-6 mt-8">
                <h2 className="font-display text-lg text-card-foreground mb-4">
                  {SERVICE_LOCATION_TEXT.relatedHeading(combo.prep, combo.locationName)}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Link
                    to={`/taklaggare-${combo.locationSlug}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ArrowRight className="w-3 h-3" /> Takläggare {combo.prep} {combo.locationName}
                  </Link>
                  {(override?.links ?? []).map((l) => (
                    <Link key={l.to} to={l.to} className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> {l.label}
                    </Link>
                  ))}
                  {COMBO_SERVICE_PAGE[combo.serviceSlug] && (
                    <Link
                      to={COMBO_SERVICE_PAGE[combo.serviceSlug].to}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ArrowRight className="w-3 h-3" /> {COMBO_SERVICE_PAGE[combo.serviceSlug].label}
                    </Link>
                  )}
                  {otherServices.map((os) => (
                    <Link
                      key={os.slug}
                      to={MATERIAL_OWN_PAGE[os.slug]?.to ?? `/${os.slug}-${combo.locationSlug}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ArrowRight className="w-3 h-3" /> {MATERIAL_OWN_PAGE[os.slug]?.label ?? COMBO_LINK_LABEL[`/${os.slug}-${combo.locationSlug}`] ?? `${os.name} ${combo.prep} ${combo.locationName}`}
                    </Link>
                  ))}
                  <Link to="/tjanster/takavvattning" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Takavvattning
                  </Link>
                  <Link to="/tjanster/takinspektion" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Kostnadsfri takkontroll
                  </Link>
                  <Link to="/tjanster/eternit-asbest" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Byta eternittak
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
                    <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-2xl px-4">
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
              <div className="bg-primary text-primary-foreground rounded-2xl p-6">
                <h3 className="font-display text-lg mb-2">{SERVICE_LOCATION_TEXT.asideHeading}</h3>
                <p className="text-sm opacity-90 mb-4">
                  {SERVICE_LOCATION_TEXT.asideText(combo.serviceName, combo.prep, combo.locationName)}
                </p>
                <Link
                  to="/takkontroll"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary w-full px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors hover:animate-subtle-pulse"
                >
                  Boka kostnadsfri takkontroll <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+46701543639"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white w-full px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors mt-3 hover:animate-subtle-pulse"
                >
                  <Phone className="w-4 h-4" /> Ring 070-154 36 39
                </a>
              </div>

              {/* USPs */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">{SERVICE_LOCATION_TEXT.uspHeading}</h3>
                <ul className="space-y-2">
                  {SERVICE_LOCATION_TEXT.usps(combo.serviceSlug).map((usp) => (
                    <li key={usp} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {usp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nearby combos */}
              {nearbyInService.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="font-display text-lg text-card-foreground mb-4">
                    {SERVICE_LOCATION_TEXT.nearbyHeading(combo.serviceName)}
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
              {SERVICE_LOCATION_TEXT.allLocationsHeading(combo.serviceName)}
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
        <GoogleReviews variant="band" />
      </main>
      <Footer />
    </>
  );
};

export default ServiceLocationPage;
