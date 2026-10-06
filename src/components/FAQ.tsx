import { homeFaqs as faqs } from "@/data/home-faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/schema";


const FAQ = () => {

  return (
    <section id="faq" className="border-b border-border bg-background py-24 md:py-36" aria-labelledby="faq-heading">
      <JsonLd data={buildFaqSchema(faqs)} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHeading
              meta="Vanliga frågor"
              id="faq-heading"
              title="Frågor om takbyte i Roslagen"
              intro="Svar på de vanligaste frågorna om takbyte, takrenovering och takläggning i skärgården."
            />
          </div>

          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-6 text-left font-display text-lg font-semibold tracking-[-0.02em] text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-7 text-[15px] leading-relaxed text-muted-foreground">
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
};

export default FAQ;
