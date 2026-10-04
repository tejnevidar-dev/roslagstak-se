import { useScrollToHash } from "@/lib/use-scroll-to-hash";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import RelatedLinks from "@/components/RelatedLinks";
import GoogleReviews from "@/components/GoogleReviews";
import QuickContactFacts from "@/components/QuickContactFacts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  priceData,
  priceFaqs,
  PRICE_HERO_TEXT,
  PRICE_NOTE,
  PRICE_ROT_TITLE,
  PRICE_ROT_TEXT,
  PRICE_FACTORS_TITLE,
  PRICE_FACTORS_TEXT,
} from "@/data/prices";

const Prices = () => {
  useScrollToHash();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: priceFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <SEOHead
        title="Vad kostar takbyte? Priser 2026, efter ROT — Roslagen"
        description="Vad kostar ett takbyte? Riktpriser per material efter ROT-avdrag, inkl. moms, och vad som påverkar priset. Fast pris i offerten efter kostnadsfri takkontroll."
        canonical="https://roslagstak.se/priser"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <div className="pt-20">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Priser" }]} />
        </div>
        <PageHero
          compact
          eyebrow="Priser 2026"
          title="Vad kostar takbyte och takrenovering i Roslagen?"
          text={PRICE_HERO_TEXT}
        />

        <div className="container mx-auto px-4 pt-2 pb-20">
          <div className="max-w-4xl mx-auto mb-12">
            <QuickContactFacts />
          </div>
          {/* Price tables */}
          <p className="max-w-4xl mx-auto text-xs text-muted-foreground mb-4">
            {PRICE_NOTE}
          </p>
          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            {priceData.map((category) => (
              <div key={category.category} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="bg-primary/5 px-6 py-4 border-b border-border">
                  <h2 className="font-display text-lg text-foreground">{category.category}</h2>
                </div>
                <div className="divide-y divide-border">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      id={"anchor" in item ? (item as { anchor: string }).anchor : undefined}
                      className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 scroll-mt-28"
                    >
                      <div>
                        <h3 className="font-semibold text-sm text-card-foreground">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="text-primary font-display text-lg whitespace-nowrap">{item.priceRange}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ROT info */}
          <div className="max-w-4xl mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-16">
            <h2 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" /> {PRICE_ROT_TITLE}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {PRICE_ROT_TEXT}
            </p>
            <Link
              to="/blogg/rot-avdrag-takbyte"
              className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
            >
              Läs mer om ROT-avdrag <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Vad påverkar priset */}
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 mb-16">
            <h2 className="font-display text-xl text-foreground mb-4">
              {PRICE_FACTORS_TITLE}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {PRICE_FACTORS_TEXT}
            </p>
            <Link
              to="/blogg/kostnad-takbyte-2026"
              className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
            >
              Läs hela guiden: Vad kostar ett takbyte? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-2xl text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" /> Vanliga frågor om priser
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {priceFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-2xl px-6">
                  <AccordionTrigger className="text-left font-semibold text-sm text-card-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-accent rounded-2xl p-8">
              <h2 className="font-display text-2xl text-accent-foreground mb-2">
                Vill du veta exakt vad ditt tak kostar?
              </h2>
              <p className="text-accent-foreground/70 text-sm mb-6">
                Konfigurera din offert eller kontakta oss för kostnadsfri takkontroll.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/offert"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors hover:animate-subtle-pulse"
                >
                  Konfigurera din offert <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+46701543639"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors hover:animate-subtle-pulse"
                >
                  Ring 070-154 36 39
                </a>
              </div>
            </div>
          </div>
        </div>
        <GoogleReviews variant="band" />
        <RelatedLinks currentPath="/priser" title="Relaterat till pris" />
      </main>
      <Footer />
    </>
  );
};

export default Prices;
