import SectionHeading from "@/components/SectionHeading";
import type { ServiceExtra } from "@/data/service-extra-sections";

/**
 * Extra textavsnitt under tjänstesidans nuvarande innehåll (Grind-godkända materialtexter utan egen URL, se
 * src/data/service-extra-sections.ts). Samma text finns i den statiska HTML:en (serviceStaticPage).
 */
const ServiceExtraSections = ({ extra }: { extra: ServiceExtra }) => (
  <section className="border-t border-border bg-background py-20 lg:py-24" aria-labelledby="service-extra-heading">
    <div className="mx-auto max-w-3xl px-6">
      <SectionHeading meta={extra.eyebrow} id="service-extra-heading" title={extra.heading} intro={extra.intro} />
      <div className="mt-10 space-y-8">
        {extra.sections.map((s) => (
          <div key={s.heading}>
            <h3 className="font-display text-xl text-foreground">{s.heading}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceExtraSections;
