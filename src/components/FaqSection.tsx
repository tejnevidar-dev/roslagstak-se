import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { buildFaqSchema, type FaqItem, SITE_URL } from "@/lib/schema";

interface FaqSectionProps {
  title: string;
  intro?: string;
  faqs: FaqItem[];
  /** Sökväg till sidan, används som @id i FAQPage-schemat */
  path?: string;
}

/** Synlig FAQ + matchande FAQPage-schema (schemat speglar alltid det som visas). */
const FaqSection = ({ title, intro, faqs, path }: FaqSectionProps) => (
  <section id="faq" className="border-b border-border bg-background py-24 md:py-32" aria-labelledby="faq-section-heading">
    <JsonLd data={buildFaqSchema(faqs, path ? `${SITE_URL}${path}` : undefined)} />
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <SectionHeading meta="Vanliga frågor" id="faq-section-heading" title={title} intro={intro} />
        </div>
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="py-6 text-left font-display text-lg text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </section>
);

export default FaqSection;
