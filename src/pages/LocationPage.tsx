import { GARANTI_RENOVERING } from "@/data/guarantee";
import { problemsForLocation } from "@/data/problem-links";
import { hubLinksFor } from "@/data/hub-links";
import { ortSeoOverrides } from "@/data/seo-overrides";
import { useParams, Link, useLocation } from "react-router-dom";
import { hasServiceCombos } from "@/data/service-slugs";
import { generateCombos, MATERIAL_OWN_PAGE } from "@/data/service-location-combos";
import { isThinCombo } from "@/data/thin-combos";
import { isBrfLocation } from "@/data/brf-locations";
import { isNearBase } from "@/data/service-reach";
import { useEffect } from "react";
import { MapPin, ArrowRight, CheckCircle, Phone, Star, Shield, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoogleReviews from "@/components/GoogleReviews";
import { locations } from "@/data/locations";
import { getLocationWithMall, usesMall } from "@/data/location-mall";
import { generateLocationFAQs } from "@/data/location-faqs";
import { buildLocalSections } from "@/data/local-sections";
import { regionSlugs } from "@/data/regions";
import { projects, getNearbyProject } from "@/data/projects";
import NotFound from "./NotFound";
import { villaAreasByPage, VILLA_AREAS_SOURCE } from "@/data/villa-areas";
import { NAP, OPENING_HOURS, ORG_ID } from "@/lib/schema";
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
  const location = resolvedSlug ? getLocationWithMall(resolvedSlug) : undefined;
  const locationProject = resolvedSlug ? projects.find((p) => p.locationSlug === resolvedSlug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resolvedSlug]);

  if (!location) return <NotFound />;

  const nearby = locations.filter((l) => location.nearbyLocations.includes(l.name));
  /* Geografisk graf (SEO Phase 2.7): bara 2 av 139 orter har ett exakt projekt. Genom att visa ett
     referensjobb från en grannort (≤30 km, se getNearbyProject) får många fler ortssidor en riktig
     location↔project-länk — alltid med orten utskriven, aldrig bara "i närområdet" utan angiven
     plats (Marknadschefen 2026-09-29, regel 5). */
  const nearbyProject = getNearbyProject(location);
  const nearbyProjectKommun = nearbyProject?.locationName.split(",")[1]?.trim();
  /* Vilka tjänst+ort-sidor som faktiskt är indexerade här (inte alla 9 — se thin-combos.ts).
     Speglar samma beräkning som scripts/prerender-content.ts:geoFactsParagraph. */
  const indexedServiceNames = hasServiceCombos(location.region)
    ? [
        ...new Set(
          generateCombos()
            .filter((c) => c.locationSlug === location.slug && !isThinCombo(c.serviceSlug, location))
            .map((c) => c.serviceName),
        ),
      ]
    : [];
  const prep = location.isIsland ? "på" : "i";
  const localSections = buildLocalSections(location);
  const regionHref = regionSlugs[location.region] ? `/omraden/${regionSlugs[location.region]}` : "/omraden";
  const faqs = generateLocationFAQs(location.name, prep, location.isIsland, location.uniqueFAQ);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `https://roslagstak.se/taklaggare-${location.slug}#business`,
    name: "RoslagsTak",
    url: `https://roslagstak.se/taklaggare-${location.slug}`,
    telephone: NAP.telephone,
    email: NAP.email,
    parentOrganization: { "@id": ORG_ID },
    image: "https://roslagstak.se/og-image.jpg",
    logo: "https://roslagstak.se/og-image.jpg",
    sameAs: [
      "https://www.google.com/search?q=RoslagsTak+recensioner",
    ],
    areaServed: {
      "@type": "Place",
      name: location.name,
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.lat,
        longitude: location.lng,
      },
      ...(location.parentLocation
        ? { containedInPlace: { "@type": "Place", name: location.parentLocation.name, url: `https://roslagstak.se/taklaggare-${location.parentLocation.slug}` } }
        : {}),
    },
    description: `${location.primaryKeyword} — ${location.description}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: NAP.addressLocality,
      addressRegion: NAP.addressRegion,
      addressCountry: NAP.addressCountry,
    },
    priceRange: "$$",
    currenciesAccepted: "SEK",
    paymentAccepted: "Faktura",
    openingHoursSpecification: OPENING_HOURS,
    knowsAbout: [
      "Takbyte", "Takomläggning", "Takrenovering", "Plåttak", "TP20",
      "Dubbelfalsat plåttak", "Pannplåt", "Takavvattning",
      "Hängrännor", "Takkontroll", "Taksäkerhet",
      "Byta eternittak", "Takkupor", "Takfönster",
      "Taktvätt", "Takmålning",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Taktjänster ${prep} ${location.name}`,
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Takbyte ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Takrenovering ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Takkontroll ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Plåtarbeten ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Takavvattning ${prep} ${location.name}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Byta eternittak ${prep} ${location.name}` } },
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
      { "@type": "ListItem", position: 2, name: "Områden", item: "https://roslagstak.se/omraden" },
      { "@type": "ListItem", position: 3, name: location.region, item: `https://roslagstak.se${regionHref}` },
      ...(location.parentLocation
        ? [{ "@type": "ListItem", position: 4, name: `Takläggare i ${location.parentLocation.name}`, item: `https://roslagstak.se/taklaggare-${location.parentLocation.slug}` }]
        : []),
      {
        "@type": "ListItem",
        position: location.parentLocation ? 5 : 4,
        name: `Takläggare ${prep} ${location.name}`,
        item: `https://roslagstak.se/taklaggare-${location.slug}`,
      },
    ],
  };

  /* Orter långt från basen i Norrtälje beskrivs utan påståenden om lokal närvaro. */
  const far = !location.isIsland && !isNearBase(location);

  // SEO-optimized meta description — under 160 chars, keyword-first
  const metaDescription = usesMall(locations.find((l) => l.slug === location.slug) ?? location)
    ? location.description
    : location.isIsland
    ? `${location.primaryKeyword} — takbyte & takrenovering ${prep} ${location.name}. Skärgårdsspecialist, fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti.`
    : far
      ? `${location.primaryKeyword} — takbyte & takrenovering ${prep} ${location.name}. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti.`
      : `${location.primaryKeyword} — takbyte & takrenovering ${prep} ${location.name}. Fast pris efter kostnadsfri takkontroll, 10 års utförandegaranti.`;

  // Title: keep under 60 chars for Google SERP
  const override = ortSeoOverrides[location.slug];
  const seoTitle = override?.title ?? `Takläggare ${prep} ${location.name} — Takbyte & Takrenovering`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={override?.description ?? metaDescription}
        canonical={`https://roslagstak.se/taklaggare-${location.slug}`}
        geoPosition={`${location.lat};${location.lng}`}
        geoPlacename={location.name}
      />
      <Header />
      <main>
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

        <div className="pt-24">
          <Breadcrumbs
            items={[
              { name: "Startsidan", path: "/" },
              { name: "Områden", path: "/omraden" },
              { name: location.region, path: regionHref },
              ...(location.parentLocation
                ? [{ name: location.parentLocation.name, path: `/taklaggare-${location.parentLocation.slug}` }]
                : []),
              { name: location.name },
            ]}
            withSchema={false}
          />
        </div>

        <div className="container mx-auto px-4 pt-10 pb-20">
          {/* Hero */}
          <div className="max-w-4xl mb-16">
            <Link
              to={location.parentLocation ? `/taklaggare-${location.parentLocation.slug}` : regionHref}
              className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4 transition-colors hover:bg-primary/20"
            >
              <MapPin className="w-3 h-3" />
              {location.parentLocation ? `Takläggare i ${location.parentLocation.name}` : `Takläggare i ${location.region}`}
            </Link>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              {location.h1Override ??
                (location.parentLocation
                  ? `Takläggare i ${location.name}, ${location.parentLocation.name}`
                  : `Takläggare ${prep} ${location.name} — takbyte & takrenovering`)}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {location.description}
            </p>
            <div className="mt-5">
              <a
                href="https://www.google.com/search?q=RoslagsTak+recensioner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
              >
                <Star className="w-4 h-4 fill-primary text-primary" />
                Läs våra omdömen på Google
              </a>
            </div>
            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" /> 10 års utförandegaranti
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" /> Svar inom 24h
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" /> En kontaktperson hela vägen · utan förpliktelser
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
                Boka kostnadsfri takkontroll <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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

                {location.extraContent && (
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {location.extraContent}
                  </p>
                )}

                {/* Områdessidor: egna rubriker ur Innehålls text (t.ex. "Vad det betyder för taket") */}
                {location.extraSections?.map((section) => (
                  <div key={section.heading}>
                    <h3 className="font-display text-xl text-foreground mb-3">{section.heading}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{section.text}</p>
                  </div>
                ))}

                {/* Områdessidor: "Så går det till" + garanti/ROT + slutmening, samma text som i prerender */}
                {location.process && (
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Så går det till</h3>
                    <ol className="mb-4 list-decimal space-y-2 pl-5 text-muted-foreground leading-relaxed">
                      {location.process.steps.map((step) => (
                        <li key={step}>
                          {step.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                            part.startsWith("**") ? (
                              <strong key={i} className="font-semibold text-foreground">
                                {part.slice(2, -2)}
                              </strong>
                            ) : (
                              part
                            ),
                          )}
                        </li>
                      ))}
                    </ol>
                    {location.process.paragraphs.map((para) => {
                      const [before, after] = para.split("roslagstak.se/takkontroll");
                      return (
                        <p key={para} className="text-muted-foreground leading-relaxed mb-6">
                          {after === undefined ? (
                            para
                          ) : (
                            <>
                              {before}
                              <Link to="/takkontroll" className="text-primary underline underline-offset-4 hover:no-underline">
                                roslagstak.se/takkontroll
                              </Link>
                              {after}
                            </>
                          )}
                        </p>
                      );
                    })}
                  </div>
                )}

                {/* Faktaruta — villaområden med egen, källbelagd data (SEO-programmet våg 0+) */}
                {location.factBox && (
                  <dl className="mb-6 grid gap-x-6 gap-y-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2">
                    {location.factBox.map((fact) => (
                      <div key={fact.label}>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {fact.label}
                        </dt>
                        <dd className="text-sm text-muted-foreground">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {location.sourceLink && (
                  <p className="mb-6 text-xs text-muted-foreground">
                    Källa:{" "}
                    <a
                      href={location.sourceLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-4 hover:no-underline"
                    >
                      {location.sourceLink.label}
                    </a>
                  </p>
                )}

                {/* Villaområden i kommunen (villaområden våg 0, #1m) — samma <dl>-stil som faktarutan */}
                {villaAreasByPage[location.slug] && (
                  <section aria-labelledby="villaomraden">
                    <h3 id="villaomraden" className="font-display text-xl text-foreground mb-3">
                      Villaområden i {villaAreasByPage[location.slug].municipality}
                    </h3>
                    <dl className="mb-3 grid gap-x-6 gap-y-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2">
                      {villaAreasByPage[location.slug].areas.map((area) => (
                        <div key={area.name}>
                          <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                            {area.href ? (
                              <Link to={area.href} className="underline underline-offset-4 hover:no-underline">
                                {area.name}
                              </Link>
                            ) : (
                              area.name
                            )}
                          </dt>
                          <dd className="text-sm text-muted-foreground">
                            {area.note ?? `${area.types}. ${area.period}.`}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mb-6 text-xs text-muted-foreground">{VILLA_AREAS_SOURCE}</p>
                  </section>
                )}

                {/* Unikt lokalt innehåll per ort — klimat, bebyggelse och logistik */}
                {localSections.blocks.map((block) => (
                  <div key={block.heading}>
                    <h3 className="font-display text-xl text-foreground mb-3">{block.heading}</h3>
                    {block.paragraphs.map((para) => (
                      <p key={para} className="text-muted-foreground leading-relaxed mb-4">
                        {para}
                      </p>
                    ))}
                  </div>
                ))}

                <dl className="mb-6 grid gap-x-6 gap-y-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2">
                  {localSections.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {fact.label}
                      </dt>
                      <dd className="text-sm text-muted-foreground">{fact.value}</dd>
                    </div>
                  ))}
                </dl>


                <h3 className="font-display text-xl text-foreground mb-3">
                  Våra taktjänster {prep} {location.name}
                </h3>
                <ul className="space-y-2 mb-6">
                  {[
                    `Takomläggning och takbyte ${prep} ${location.name}`,
                    `Takrenovering och underhåll ${prep} ${location.name}`,
                    `Plåtarbeten, takavvattning och hängrännor`,
                    `TP20, dubbelfalsat, pannplåt och lertegeltak`,
                    `Byta eternittak, med sanering via en saneringsfirma`,
                    `Takkupor och takfönster (Velux)`,
                    `Taktvätt och takmålning`,
                    `Kostnadsfri takinspektion`,
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
                  Priset för ett takbyte {prep} {location.name} beror på takets storlek, lutning, materialval och underlagets skick, oavsett om du väljer TP20-plåttak eller dubbelfalsat plåttak.
                  {location.isIsland
                    ? ` Transportkostnad till ${location.name} ingår alltid i vår offert.`
                    : ` Du får alltid fast pris efter kostnadsfri takkontroll.`}
                  {" "}Med ROT-avdrag på 30 % av arbetskostnaden (upp till 50 000 kr per person och år).
                </p>

                {/* Deep internal links */}
                <div className="bg-card border border-border rounded-2xl p-5 mb-6">
                  <h3 className="font-display text-lg text-card-foreground mb-3">
                    Tjänster, priser och guider {prep} {location.name}
                  </h3>
                  {indexedServiceNames.length > 0 && (
                    <p className="mb-3 text-sm text-muted-foreground">
                      Vi har egna sidor för {indexedServiceNames.join(", ").toLowerCase()} {prep} {location.name}.
                    </p>
                  )}
                  <div className="grid sm:grid-cols-2 gap-2">
                    {hasServiceCombos(location.region) && (
                    <>
                    <Link to={`/takbyte-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takbyte {prep} {location.name}
                    </Link>
                    <Link to={`/takrenovering-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takrenovering {prep} {location.name}
                    </Link>
                    <Link to={`/takomlaggning-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takomläggning {prep} {location.name}
                    </Link>
                    <Link to={MATERIAL_OWN_PAGE.platttak.to} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> {MATERIAL_OWN_PAGE.platttak.label}
                    </Link>
                    <Link to={MATERIAL_OWN_PAGE.bandtackning.to} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> {MATERIAL_OWN_PAGE.bandtackning.label}
                    </Link>
                    <Link to={MATERIAL_OWN_PAGE.betongpannor.to} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> {MATERIAL_OWN_PAGE.betongpannor.label}
                    </Link>
                    <Link to={MATERIAL_OWN_PAGE.tegeltak.to} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> {MATERIAL_OWN_PAGE.tegeltak.label}
                    </Link>
                    <Link to={`/takmalning-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Takmålning {prep} {location.name}
                    </Link>
                    <Link to={`/taktvatt-${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Taktvätt {prep} {location.name}
                    </Link>
                    </>
                    )}
                    {hubLinksFor(location.slug).map((h) => (
                      <Link key={h.href} to={h.href} className="flex items-center gap-1 text-sm text-primary hover:underline">
                        <ArrowRight className="w-3 h-3" /> {h.label}
                      </Link>
                    ))}
                    {isBrfLocation(location.slug) && (
                      <Link to={`/brf/${location.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                        <ArrowRight className="w-3 h-3" /> Takbyte för BRF {prep} {location.name}
                      </Link>
                    )}
                    {locationProject && (
                      <Link to={`/projekt/${locationProject.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                        <ArrowRight className="w-3 h-3" /> Referensjobb: {locationProject.title}
                      </Link>
                    )}
                    {nearbyProject && (
                      <Link to={`/projekt/${nearbyProject.slug}`} className="flex items-center gap-1 text-sm text-primary hover:underline">
                        <ArrowRight className="w-3 h-3" /> Referensjobb i närområdet: {nearbyProject.title}
                        {nearbyProjectKommun ? `, ${nearbyProjectKommun}` : ""}
                      </Link>
                    )}
                    <Link to="/tjanster/eternit-asbest" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <ArrowRight className="w-3 h-3" /> Byta eternittak
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
                      <ArrowRight className="w-3 h-3" /> Omdömen på Google
                    </Link>
                  </div>
                </div>

                <h3 className="font-display text-xl text-foreground mb-3">
                  Varför välja RoslagsTak som {location.primaryKeyword.toLowerCase()}?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {far
                    ? `Vi tar uppdrag ${prep} ${location.name} och närområdet, för både villaägare och bostadsrättsföreningar, med kostnadsfri takkontroll och fast pris.`
                    : `Vi tar uppdrag ${prep} ${location.name} och i hela Roslagen, med kostnadsfri takkontroll och fast pris.`}
                  {far
                    ? ""
                    : location.isIsland
                    ? ` Vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.`
                    : ""}
                  {" "}Alla arbeten utförs enligt AMA Hus. {GARANTI_RENOVERING}
                </p>

                <h3 className="font-display text-xl text-foreground mb-3">
                  Om {location.name} och takläggning i {location.region.toLowerCase()}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {location.region === "Mälardalen"
                    ? `${location.name} ligger i Mälardalen. Vi rekommenderar material efter husets läge och skick.`
                    : `${location.name} tillhör ${location.region} i Roslagen. Vi rekommenderar material efter husets läge och skick.`}{" "}
                  Kontakta oss för en kostnadsfri takkontroll {prep} {location.name}, utan förpliktelser.
                </p>
              </div>

              {/* FAQ Section */}
              <div className="mt-8">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  Vanliga frågor om takbyte {prep} {location.name}
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
                <h3 className="font-display text-lg mb-2">Kostnadsfri takkontroll</h3>
                <p className="text-sm opacity-90 mb-4">
                  Boka en kostnadsfri takkontroll för ditt takprojekt {prep} {location.name}. Vi återkopplar inom 24 timmar.
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

              {nearby.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
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

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display text-lg text-card-foreground mb-3">Vanliga takproblem</h3>
                <div className="space-y-2">
                  {problemsForLocation(location.slug).map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      <ArrowRight className="w-3 h-3" /> {p.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display text-lg text-card-foreground mb-3">Våra taktjänster</h3>
                <div className="space-y-2">
                  {[
                    { name: "Takomläggning", slug: "takomlaggning" },
                    { name: "Takrenovering", slug: "takrenovering" },
                    { name: "Takavvattning", slug: "takavvattning" },
                    { name: "Plåtarbeten", slug: "platarbeten" },
                    { name: "Takkontroll", slug: "takinspektion" },
                    { name: "Takkupor & takfönster", slug: "takkupor" },
                    { name: "Taktvätt & takmålning", slug: "takvard" },
                    { name: "Byta eternittak", slug: "eternit-asbest" },
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
        <GoogleReviews variant="band" place={`i ${location.name}`} />
      </main>
      <Footer />
    </>
  );
};

export default LocationPage;
