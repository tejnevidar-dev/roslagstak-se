import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";
import { renderInline } from "@/lib/inline-md";
import { buildFaqSchema, SITE_URL } from "@/lib/schema";
import type { ExtraBlock, PageExtras } from "@/data/page-extras";

/** Förstärkningsavsnitten (rubrik, stycken och punktlistor) under prisavsnittet. Texten ligger i src/data/page-extras.ts. */
export const ExtraBlocks = ({ blocks, wide = false }: { blocks: ExtraBlock[]; wide?: boolean }) => {
  const inner = (
    <div className="space-y-8">
      {blocks.map((b) => (
        <div key={b.heading}>
          <h2 className="font-display text-xl text-foreground">{b.heading}</h2>
          {b.items.map((it, i) =>
            typeof it === "string" ? (
              <p key={i} className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {renderInline(it)}
              </p>
            ) : (
              <ul key={i} className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
                {it.list.map((li) => (
                  <li key={li}>{renderInline(li)}</li>
                ))}
              </ul>
            ),
          )}
        </div>
      ))}
    </div>
  );
  return wide ? (
    <section className="bg-background pb-8 lg:pb-12">
      <div className="mx-auto max-w-3xl px-6">{inner}</div>
    </section>
  ) : (
    <div className="mt-10">{inner}</div>
  );
};

/**
 * FAQ med FAQPage-schema som ett inbäddat script, på samma sätt som eternitsidan (inget Helmet, så att sidan
 * kan renderas i paritetstestet). Svaren är stängda tills besökaren öppnar dem och finns i schemat.
 */
export const ExtraFaq = ({ extras, path }: { extras: PageExtras; path: string }) => (
  <section className="border-b border-border bg-background py-20 lg:py-24" aria-labelledby="extra-faq-heading">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(extras.faqs, `${SITE_URL}${path}`)) }}
    />
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading meta="Vanliga frågor" id="extra-faq-heading" title={extras.faqHeading} />
        </div>
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="border-t border-border">
            {extras.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`extra-faq-${index}`} className="border-b border-border">
                <AccordionTrigger className="py-5 text-left font-display text-lg text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </section>
);
