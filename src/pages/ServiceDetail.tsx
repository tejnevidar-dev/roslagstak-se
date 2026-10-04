import { useScrollToHash } from "@/lib/use-scroll-to-hash";
import { withRotForbehall } from "@/data/prices";
import {
  SERVICE_COPY,
  SERVICE_DETAIL_PHOTO_SLUGS,
  serviceRelatedLinks,
  serviceSchemaNodes,
  goodToKnowBoxes,
  serviceDetails,
  serviceMeta,
  tatskiktChip,
  showsUtforandeChip,
  NO_HOW_LINK_SERVICE_SLUGS,
  type ServiceMeta,
} from "@/data/service-page";
import { RENOVERING_SERVICE_SLUGS } from "@/data/guarantee";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Award, Clock, Phone, PlayCircle, Shield } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleReviews from "@/components/GoogleReviews";
import Reveal from "@/components/Reveal";
import { services } from "@/components/Services";
import Breadcrumbs from "@/components/Breadcrumbs";
import EternitSEOContent from "@/components/EternitSEOContent";
import ServiceSpecificBlock from "@/components/ServiceSpecificBlock";
import ServiceExtraSections from "@/components/ServiceExtraSections";
import { serviceExtra } from "@/data/service-extra-sections";
import { serviceBlocks } from "@/data/service-blocks";
import imgRaspont from "@/assets/roof-build-01-raspont.jpg";
import imgPapp from "@/assets/roof-build-02-papp.jpg";
import imgRannor from "@/assets/roof-build-03-rannor.jpg";
import imgVindskivor from "@/assets/roof-build-04-vindskivor.jpg";
import imgBeslag from "@/assets/roof-build-07-beslag.jpg";
import imgSnoras from "@/assets/roof-build-08-snorasskydd.jpg";
import imgLakt from "@/assets/roof-build-05-lakt.jpg";
import imgPannor from "@/assets/roof-build-06-pannor.jpg";
import imgDronePoster from "@/assets/hero-drone-poster.jpg";
import imgBlidoLakeview from "@/assets/project-blido-lakeview.webp";
import imgLertegel from "@/assets/roof-type-lertegel.jpg";

/** Hero-foto per tjänst — dokumentära bilder från eget arbete. */
const serviceImages: Record<string, string> = {
  takomlaggning: imgPannor,
  takrenovering: imgPapp,
  takavvattning: imgRannor,
  takkupor: imgVindskivor,
  takinspektion: imgRaspont,
  taksakerhet: imgSnoras,
  platarbeten: imgBeslag,
  takvard: imgDronePoster,
  tegeltak: imgLertegel,
};

/** Närbild i specifikationskolumnen — alltid en annan bild än heron. Tjänster utan riktig bild visar ingen närbild. */
const detailImages: Partial<Record<string, string>> = {
  takomlaggning: imgLakt,
  takavvattning: imgBeslag,
  platarbeten: imgSnoras,
  takvard: imgPannor,
  "eternit-asbest": imgRaspont,
};

const ServiceDetail = () => {
  useScrollToHash();
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);
  const details = slug ? serviceDetails[slug] : null;
  const serviceImage = (slug && serviceImages[slug]) || imgDronePoster;
  const detailImage = slug && SERVICE_DETAIL_PHOTO_SLUGS.includes(slug) ? detailImages[slug] : undefined;
  const bandImage = imgBlidoLakeview;
  const meta: ServiceMeta = (slug && serviceMeta[slug]) || serviceMeta.takomlaggning;
  const blocks = (slug && serviceBlocks[slug]) || serviceBlocks.takomlaggning;
  const specificBlock = <ServiceSpecificBlock block={blocks.block} />;



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

  const { breadcrumb: breadcrumbJsonLd, service: serviceJsonLd, howTo: howToJsonLd } = serviceSchemaNodes(service.slug, services);

  return (
    <>
      <SEOHead
        title={blocks.seoTitle}
        description={blocks.seoDescription}
        canonical={`https://roslagstak.se/tjanster/${slug}`}
      />
      <Header />
      <main>
        <div className="pt-24">
          <Breadcrumbs
            items={[
              { name: "Hem", path: "/" },
              { name: "Tjänster", path: "/#tjanster" },
              { name: service.title, path: `/tjanster/${slug}` },
            ]}
            withSchema={false}
          />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

        {/* Hero — asymmetriskt dokumentärt rutnät */}
        <section className="bg-background pb-16 pt-12 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-4 lg:gap-8">
              <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
                <span aria-hidden="true" className="h-px w-10 bg-primary" />
                {SERVICE_COPY.heroEyebrow}
              </p>

              <h1 className="font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-foreground">
                {service.title}{meta.h1Sep}
                {meta.accentLine && (
                  <>
                    <br />
                    <span className="text-accent">{meta.accentLine}</span>
                  </>
                )}
              </h1>

              <p className="max-w-xl text-[19px] font-light leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-5">
                {meta.specs.map((s) => (
                  <div key={s.k} className="flex flex-col border-l-2 border-accent py-1 pl-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{s.k}</span>
                    <span className="text-[15px] font-medium text-foreground">{s.v}</span>
                  </div>
                ))}
              </div>

              <div>
                <Link
                  to="/takkontroll"
                  className="text-[14px] font-semibold text-accent underline-offset-4 hover:underline"
                >
                  {SERVICE_COPY.takkontrollLink}
                </Link>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground" aria-label="Fakta om RoslagsTak">
                  {showsUtforandeChip(service.slug) && (
                    <li className="inline-flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {SERVICE_COPY.chipUtforande}
                    </li>
                  )}
                  {tatskiktChip(service.slug) && (
                    <li className="inline-flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {tatskiktChip(service.slug)}
                    </li>
                  )}
                  <li className="inline-flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {SERVICE_COPY.chipFastPris}
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {SERVICE_COPY.chipSvar}
                  </li>
                </ul>
              </div>

              <div className="mt-2 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/takkontroll"
                  className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-primary px-9 py-5 text-[18px] font-bold text-primary-foreground shadow-[var(--shadow-elevated)] transition-all hover:-translate-y-0.5 hover:bg-accent animate-subtle-pulse"
                >
                  {SERVICE_COPY.offertButton}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <a
                  href="tel:0701543639"
                  className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-border px-9 py-5 text-[18px] font-bold text-foreground transition-colors hover:bg-secondary"
                >
                  <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                  {SERVICE_COPY.phone}
                </a>
              </div>

              {!NO_HOW_LINK_SERVICE_SLUGS.includes(service.slug) && (
                <Link
                  to="/hur-det-gar-till"
                  className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-primary"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  {SERVICE_COPY.howLink}
                  <span aria-hidden="true" className="h-px w-8 bg-primary transition-all group-hover:w-14" />
                </Link>
              )}
            </div>

            {/* Dokumentärt foto */}
            <figure className="relative m-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-[var(--shadow-elevated)]">
                <img
                  src={serviceImage}
                  alt={slug === "eternit-asbest" ? "Drönarfoto av nylagt tak på Blidö, Roslagens skärgård" : `${service.title} i Roslagen`}
                  width={1200}
                  height={1500}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </figure>
          </div>
        </section>

        {/* Faktaband — tjänstspecifika nyckeltal */}
        <section aria-label="Snabbfakta" className="bg-background pb-20 lg:pb-24">
          <dl className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-4">
            {blocks.factCards.map((f) => {
              const tone =
                f.tone === "primary"
                  ? "bg-primary text-primary-foreground"
                  : f.tone === "accent"
                    ? "bg-accent text-accent-foreground"
                    : f.tone === "outline"
                      ? "border-2 border-primary bg-card"
                      : "border border-border bg-card";
              const label =
                f.tone === "primary"
                  ? "text-accent"
                  : f.tone === "accent"
                    ? "text-accent-foreground/80"
                    : f.tone === "outline"
                      ? "text-primary"
                      : "text-muted-foreground";
              const body =
                f.tone === "primary"
                  ? "text-primary-foreground/70"
                  : f.tone === "accent"
                    ? "opacity-90"
                    : "text-muted-foreground";
              return (
                <div key={f.label} className={`flex min-h-[11.5rem] flex-col justify-between rounded-2xl p-8 ${tone}`}>
                  <dt className={`text-[10px] font-bold uppercase tracking-[0.2em] ${label}`}>{f.label}</dt>
                  <dd>
                    <span className="mb-1.5 block font-display text-[1.6rem] font-extrabold leading-none tracking-[-0.03em]">
                      {f.value}
                    </span>
                    <p className={`text-[13px] leading-relaxed ${body}`}>{f.text}</p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        {blocks.blockPlacement === "before-spec" && specificBlock}






        {/* Teknisk specifikation — redaktionell text, arbetsgång och offertkolumn */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.9fr_1fr] lg:gap-20">
            <div className="space-y-16">
              <Reveal>
                <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                  <span aria-hidden="true" className="h-px w-12 bg-primary" />
                  {SERVICE_COPY.specEyebrow}
                </p>
                <h2 className="mt-6 max-w-[24ch] font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-foreground">
                  {meta.specHeading}
                </h2>
                <p className="mt-8 max-w-[46ch] font-display text-[1.15rem] font-semibold leading-[1.5] tracking-[-0.02em] text-foreground">
                  {meta.lead}
                </p>
                <div className="mt-8 gap-12 text-[15px] leading-[1.85] text-muted-foreground md:columns-2 [&>p]:mb-6">
                  <p>{details.longDesc}</p>
                </div>
              </Reveal>

              <Reveal>
                <div className="border-y border-border py-12">
                  <h3 className="font-display text-[1.35rem] font-extrabold uppercase tracking-[0.16em] text-foreground">
                    {SERVICE_COPY.processHeading(details.process.length)}
                  </h3>
                  <ol className="mt-8 grid gap-x-12 md:grid-cols-2">
                    {details.process.map((step, i) => (
                      <li
                        key={step}
                        id={`steg-${i + 1}`}
                        className="group flex items-start gap-4 border-b border-border/70 py-3.5"
                      >
                        <span className="mt-px font-mono text-[13px] tabular-nums text-primary transition-all group-hover:pl-1.5">
                          {String(i + 1).padStart(2, "0")}.
                        </span>
                        <span className="text-[15px] font-medium leading-[1.6] text-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>

            {/* Offertkolumn */}
            <aside className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
              <div className="flex flex-col gap-6 rounded-2xl bg-primary p-9 text-primary-foreground">
                <h3 className="font-display text-[1.55rem] font-extrabold tracking-[-0.03em]">{SERVICE_COPY.asideTitle}</h3>
                <p className="text-[15px] font-light leading-relaxed text-primary-foreground/75">
                  {SERVICE_COPY.asideText}
                </p>
                <Link
                  to="/takkontroll"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-cta px-6 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-cta-foreground transition-colors hover:bg-primary-foreground hover:text-primary animate-subtle-pulse"
                >
                  {SERVICE_COPY.asideCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="tel:0701543639"
                  className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-primary-foreground/90 transition-colors hover:text-primary-foreground"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {SERVICE_COPY.phone}
                </a>
              </div>

              {detailImage && (
              <figure className="m-0 space-y-5">
                <div className="overflow-hidden rounded-2xl bg-secondary">
                  <img
                    src={detailImage}
                    alt={`Detalj: ${service.title.toLowerCase()}`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                </div>
                <figcaption className="flex items-start gap-3 border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
                  <span className="mt-px text-[10px] font-bold uppercase tracking-[0.24em] text-primary">{SERVICE_COPY.photoLabel}</span>
                  {meta.photoNote}
                </figcaption>
              </figure>
              )}

              <p className="border-l-2 border-accent pl-6 text-[15px] leading-relaxed text-muted-foreground">
                {SERVICE_COPY.asideNote}
              </p>
            </aside>
          </div>
        </section>

        {blocks.blockPlacement === "after-spec" && specificBlock}

        {slug === "platarbeten" && (
          <section id="falsat" className="scroll-mt-24 border-b border-border bg-background py-20 lg:py-28">
            <div className="mx-auto max-w-3xl px-6">
              <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                <span aria-hidden="true" className="h-px w-12 bg-primary" />
                {SERVICE_COPY.falsat.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.6rem,2.3vw,2.2rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-foreground">
                {SERVICE_COPY.falsat.heading}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
                {SERVICE_COPY.falsat.text}
              </p>
            </div>
          </section>
        )}

        {/* Vad ingår — faktarutor */}
        <section className="border-y border-border bg-secondary/40 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
                  <span aria-hidden="true" className="h-px w-12 bg-primary" />
                  {SERVICE_COPY.scopeEyebrow}
                </p>
                <h2 className="mt-5 font-display text-[clamp(1.6rem,2.3vw,2.2rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-foreground">
                  {SERVICE_COPY.scopeHeading}
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {SERVICE_COPY.scopeNote}
              </p>
            </div>

            <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {details.benefits.map((b, i) => (
                <li key={b} className="bg-background">
                  <Reveal delay={(i % 3) * 0.05}>
                    <div className="flex h-full flex-col gap-3 p-7">
                      <span className="font-display text-[11px] font-bold tabular-nums tracking-[0.24em] text-primary">
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

        {blocks.blockPlacement === "after-scope" && specificBlock}



        {/* Fullbreddsfoto — dokumentärt band */}
        <section aria-label="Hantverket" className="relative h-[38vh] min-h-[280px] overflow-hidden lg:h-[46vh]">
          <img
            src={bandImage}
            alt=""
            width={2000}
            height={1000}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/45 to-primary/10"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6">
              <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-primary-foreground">
                <span aria-hidden="true" className="h-px w-12 bg-primary-foreground/60" />
                {SERVICE_COPY.craftEyebrow}
              </p>
              <p className="mt-5 max-w-2xl font-display text-[clamp(1.3rem,2.4vw,2.1rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-primary-foreground">
                {meta.craftLine}
              </p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-primary/85 px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground backdrop-blur-sm">
            <span>{SERVICE_COPY.craftCaption(service.title, service.slug)}</span>
          </div>
        </section>


        {/* Bra att veta — faktarutor */}
        <section className="bg-background py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              <span aria-hidden="true" className="h-px w-12 bg-primary" />
              {SERVICE_COPY.goodToKnowEyebrow}
            </p>
            <div className="mt-12 grid gap-px border-y border-border bg-border md:grid-cols-3">
              {goodToKnowBoxes(service.slug).map((f, i) => (
                <Reveal key={f.t} delay={i * 0.06}>
                  <div id={i === 0 ? "pris" : undefined} className="h-full scroll-mt-28 bg-card p-8">
                    <h3 className="font-display text-[1.05rem] font-bold tracking-[-0.02em] text-foreground">{f.t}</h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-muted-foreground">{f.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {slug && serviceExtra[slug] && <ServiceExtraSections extra={serviceExtra[slug]} />}

        {slug === "eternit-asbest" && (
          <section className="border-t border-border bg-secondary/40 py-20">
            <div className="mx-auto max-w-7xl px-6">
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
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="max-w-2xl">
                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
                  {SERVICE_COPY.ctaHeading(service.slug, service.title)}
                </h2>
                <p className="mt-4 text-[17px] leading-[1.7] text-primary-foreground/75">
                  {SERVICE_COPY.ctaText(service.slug)}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                {slug !== "eternit-asbest" && (
                  <Link
                    to="/takkontroll"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-card px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-secondary animate-subtle-pulse"
                  >
                    {SERVICE_COPY.ctaOffert}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                )}
                <Link
                  to="/takkontroll"
                  className={`inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] transition-colors ${
                    slug === "eternit-asbest"
                      ? "rounded-full bg-card text-primary hover:bg-secondary animate-subtle-pulse"
                      : "rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  {SERVICE_COPY.ctaAdvice}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Relaterat innehåll */}
        <section className="bg-background py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <p className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              <span aria-hidden="true" className="h-px w-12 bg-primary" />
              {SERVICE_COPY.relatedEyebrow}
            </p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(1.5rem,2.1vw,2rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-foreground">
              {SERVICE_COPY.relatedHeading}
            </h2>
            <ul className="mt-10 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
              {serviceRelatedLinks(service.slug, services).map((link) => (
                <li key={link.to} className="border-b border-border sm:border-r sm:last:border-r-0">
                  <Link
                    to={link.to}
                    className="group flex h-full items-center justify-between gap-4 px-1 py-5 text-[15px] font-semibold text-foreground transition-colors hover:text-primary sm:px-6"
                  >
                    {link.label}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-14 border-t border-border pt-8">
              <Link
                to="/#tjanster"
                className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                {SERVICE_COPY.backToServices}
              </Link>
            </div>
          </div>
        </section>

        <GoogleReviews variant="band" />
      </main>
      <Footer />
    </>
  );
};


export default ServiceDetail;
