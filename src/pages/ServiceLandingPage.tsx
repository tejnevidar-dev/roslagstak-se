import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Phone, ShieldCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { getLandingService } from "@/data/landing-services";
import NotFound from "@/pages/NotFound";

const trust = [
  "F-skatt och ansvarsförsäkring",
  "10 års utförandegaranti",
  "Fast pris efter besiktning",
  "Arbete enligt AMA",
];

/** Indexerbar landningssida för en tjänst med formulär: /takreparation och /takkontroll. */
const ServiceLandingPage = ({ slug }: { slug: string }) => {
  const service = getLandingService(slug);
  if (!service) return <NotFound />;

  return (
    <>
      <SEOHead
        title={service.seoTitle}
        description={service.seoDescription}
        canonical={`https://roslagstak.se${service.path}`}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: service.breadcrumb, path: service.path },
        ])}
      />
      <Header />
      <main>
        <div className="pt-24">
          <Breadcrumbs
            items={[{ name: "Hem", path: "/" }, { name: service.breadcrumb }]}
            withSchema={false}
          />
        </div>

        <section className="border-b border-border bg-secondary" aria-labelledby="svc-heading">
          <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">{service.eyebrow}</p>
              <h1
                id="svc-heading"
                className="max-w-[20ch] font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.025em] text-balance text-foreground"
              >
                {service.h1} <span className="italic text-accent">{service.h1Accent}</span>
              </h1>
              <p className="mt-6 max-w-[54ch] text-[18px] leading-relaxed text-muted-foreground">{service.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:0701543639"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[17px] font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" /> Ring 070-154 36 39
                </a>
                <a
                  href="#forfragan"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/20 px-7 py-4 text-[17px] font-semibold text-foreground transition-colors hover:bg-background"
                >
                  Skicka förfrågan <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <ul className="mt-9 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {trust.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] text-foreground">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div id="forfragan" className="scroll-mt-24 lg:col-span-5">
              <LeadForm
                source={`Sida ${service.path}`}
                formName={service.slug}
                defaultTopic={service.defaultTopic}
                title={service.formTitle}
              />
            </div>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28" aria-labelledby="svc-list-heading">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <h2
                id="svc-list-heading"
                className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-foreground"
              >
                {service.listHeading}
              </h2>
              <p className="mt-5 max-w-[36ch] text-[17px] leading-relaxed text-muted-foreground">{service.listIntro}</p>
            </Reveal>
            <ul className="border-t border-border lg:col-span-8">
              {service.list.map((item) => (
                <li key={item.title} className="grid gap-1 border-b border-border py-5 sm:grid-cols-[15rem_1fr] sm:gap-8">
                  <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-border bg-secondary py-20 md:py-28" aria-labelledby="svc-steps-heading">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-16">
            <h2
              id="svc-steps-heading"
              className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-foreground lg:col-span-4"
            >
              {service.stepsHeading}
            </h2>
            <ol className="lg:col-span-8">
              {service.steps.map((step, i) => (
                <li key={step.title} className="border-t border-foreground/15 last:border-b">
                  <div className="grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[3.5rem_1fr]">
                    <span className="font-display text-3xl leading-none text-accent tabular-nums">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-[1.3rem] leading-snug text-foreground">{step.title}</h3>
                      <p className="mt-2 max-w-[56ch] leading-relaxed text-muted-foreground">{step.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-background py-20 md:py-28" aria-labelledby="svc-extra-heading">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-16">
            <h2
              id="svc-extra-heading"
              className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-foreground lg:col-span-5"
            >
              {service.extraHeading}
            </h2>
            <div className="space-y-5 text-[18px] leading-relaxed text-muted-foreground lg:col-span-7">
              {service.extraParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="rounded-2xl border border-border bg-card p-6 text-[16px]">{service.priceNote}</p>
            </div>
          </div>
        </section>

        <FaqSection
          title={service.faqTitle}
          intro="Pris, garanti, ROT och hur det går till."
          faqs={service.faqs}
          path={service.path}
        />

        <section className="border-b border-border bg-muted/30 py-16 md:py-20" aria-label="Relaterade sidor">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-2xl text-foreground md:text-3xl">Läs vidare</h2>
            <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {service.related.map((link) => (
                <li key={link.to} className="bg-background">
                  <Link
                    to={link.to}
                    className="group flex items-center justify-between gap-4 p-5 font-display text-lg text-foreground transition-colors hover:bg-muted/50 hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceLandingPage;
