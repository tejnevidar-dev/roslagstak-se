import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import LeadForm from "@/components/LeadForm";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { renderInline } from "@/lib/inline-md";
import {
  TAKTVATT_FAQS,
  TAKTVATT_H1,
  TAKTVATT_INTRO,
  TAKTVATT_META,
  TAKTVATT_SECTIONS,
  TAKTVATT_TITLE,
} from "@/data/taktvatt-text";

const PATH = "/tjanster/taktvatt";
const URL = `https://roslagstak.se${PATH}`;

/**
 * /tjanster/taktvatt. Kort text tills Vidar har svarat på 10i (backlog 1cl): bara takkontrollen, fast pris i offerten och
 * bokningstiderna. Ingen metod, inga belopp, ingen garanti och ingen livslängd. Texten bor i data/taktvatt-text.ts.
 */
const Taktvatt = () => {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: TAKTVATT_H1,
    serviceType: "Taktvätt",
    description: TAKTVATT_META,
    url: URL,
    provider: {
      "@type": "RoofingContractor",
      name: "RoslagsTak",
      url: "https://roslagstak.se",
      telephone: "+46701543639",
      image: "https://roslagstak.se/og-image.jpg",
      address: { "@type": "PostalAddress", addressLocality: "Norrtälje", addressRegion: "Stockholms län", addressCountry: "SE" },
    },
    areaServed: [
      { "@type": "Place", name: "Roslagen" },
      { "@type": "Place", name: "Storstockholm" },
    ],
  };

  return (
    <>
      <SEOHead title={TAKTVATT_TITLE} description={TAKTVATT_META} canonical={URL} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Taktvätt", path: PATH },
        ])}
      />
      <Header />
      <main>
        <div className="pt-24">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Taktvätt" }]} withSchema={false} />
        </div>

        <section className="border-b border-border bg-secondary" aria-labelledby="svc-heading">
          <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">Taktvätt</p>
              <h1
                id="svc-heading"
                className="max-w-[20ch] font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.025em] text-balance text-foreground"
              >
                {TAKTVATT_H1}
              </h1>
              <p className="mt-6 max-w-[54ch] text-[18px] leading-relaxed text-muted-foreground">{TAKTVATT_INTRO}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:0701543639"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-[17px] font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
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
                {["Kostnadsfri takkontroll", "Fast pris i offerten", "Utan förpliktelser", "Svar inom 24 timmar"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] text-foreground">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div id="forfragan" className="scroll-mt-24 lg:col-span-5">
              <LeadForm source={`Sida ${PATH}`} formName="taktvatt" defaultTopic="Takkontroll" title="Begär kostnadsfri takkontroll" />
            </div>
          </div>
        </section>

        {TAKTVATT_SECTIONS.map((s) => (
          <section key={s.heading} className="border-b border-border bg-background py-14 md:py-20" aria-label={s.heading}>
            <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-12 lg:gap-16">
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-foreground lg:col-span-4">
                {s.heading}
              </h2>
              <div className="space-y-5 text-[18px] leading-relaxed text-muted-foreground lg:col-span-8">
                {s.paragraphs.map((p) => (
                  <p key={p}>{renderInline(p)}</p>
                ))}
              </div>
            </div>
          </section>
        ))}

        <FaqSection title="Vanliga frågor om taktvätt" intro="Pris, takkontroll och bokning." faqs={TAKTVATT_FAQS} path={PATH} />
      </main>
      <Footer />
    </>
  );
};

export default Taktvatt;
