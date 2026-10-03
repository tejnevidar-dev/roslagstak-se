import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { eternitFaqs, eternitLocal, eternitSections, ETERNIT_FAQ_HEADING } from "@/data/eternit-content";

/** Texten ligger i src/data/eternit-content.ts (delas med den statiska HTML:en). */
const EternitSEOContent = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eternitFaqs.map((faq) => ({
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
      {/* Extended SEO content */}
      <div className="prose prose-lg max-w-none mb-12">
        {eternitSections.map((section) => (
          <div key={section.heading}>
            {section.level === 2 ? (
              <h2 className="font-display text-2xl text-foreground mb-4">{section.heading}</h2>
            ) : (
              <h3 className="font-display text-xl text-foreground mb-3 mt-8">{section.heading}</h3>
            )}
            {section.paragraphs.map((p) => (
              <p key={p} className="text-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* FAQ section with JSON-LD */}
      <div className="mb-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <h2 className="font-display text-2xl text-foreground mb-6">{ETERNIT_FAQ_HEADING}</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {eternitFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`eternit-faq-${index}`}
              className="bg-card border border-border rounded-2xl px-6"
            >
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

      {/* Extra internal links specific to eternit */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8">
        <h2 className="font-display text-lg text-card-foreground mb-3">{eternitLocal.heading}</h2>
        <p className="text-sm text-muted-foreground mb-4">{eternitLocal.text}</p>
        <div className="grid sm:grid-cols-3 gap-2">
          {eternitLocal.links.map((l) => (
            <Link key={l.to} to={l.to} className="flex items-center gap-1 text-sm text-primary hover:underline">
              <ArrowRight className="w-3 h-3" /> {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default EternitSEOContent;
