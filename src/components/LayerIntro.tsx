import { ArrowDown } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const layers = [
  {
    name: "Råspont",
    detail: "Brädlagret som resten av taket vilar på. Skadad råspont syns först när det gamla taket är rivet.",
  },
  {
    name: "Underlagspapp",
    detail: "Takets andra skydd, som tar hand om det vatten som kan ta sig förbi ytmaterialet.",
  },
  {
    name: "Fotplåt och hängrännor",
    detail: "Fotplåten leder vattnet ner i hängrännan. Hängrännor byts om de ingår i offerten.",
  },
  {
    name: "Vindskivor",
    detail: "Vindskivorna och plåten på gavlarna är takets kanter.",
  },
  {
    name: "Läkt",
    detail: "Ströläkt och bärläkt läggs ovanpå underlaget. Läkten bär takmaterialet.",
  },
  {
    name: "Takmaterial",
    detail: "Pannor eller plåt: det material som står i offerten.",
  },
  {
    name: "Plåtdetaljer",
    detail: "Plåtbeslag kring skorsten, ventiler och genomföringar. Taksäkerhet monteras om den ingår i offerten.",
  },
];

/** Light, technical lead-in to the layer-by-layer roof film. */
const LayerIntro = () => {
  const reduce = Boolean(useReducedMotion());

  return (
    <section className="relative border-b border-border bg-warm py-20 md:py-28" aria-labelledby="layers-heading">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          meta="Konstruktion"
          index="01 / 04"
          title="Ett tak byggs upp i sju lager"
          intro="Ett tak är inte ett skikt utan flera. Ordningen är underlag, läkt, takmaterial och plåtdetaljer."
          id="layers-heading"
        />

        <ol className="mt-12 space-y-px">
          {layers.map((layer, i) => {
            const isLast = i === layers.length - 1;
            return (
              <m.li
                key={layer.name}
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-start gap-5 border-t border-border bg-card px-5 py-5 transition-colors duration-300 hover:border-border/0 hover:bg-secondary sm:gap-7 sm:px-7 sm:py-6"
              >
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-ink text-sm font-bold tabular-nums text-ink-foreground transition-colors duration-300 group-hover:bg-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {!isLast && (
                    <span aria-hidden="true" className="mt-1 h-[calc(100%-2.5rem)] w-px bg-border" />
                  )}
                </div>
                <div className="pt-1 pb-2">
                  <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-foreground sm:text-xl">
                    {layer.name}
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] font-light leading-relaxed text-muted-foreground">
                    {layer.detail}
                  </p>
                </div>
              </m.li>
            );
          })}
        </ol>

        <m.a
          href="#hur-det-gar-till"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group mt-12 inline-flex items-center gap-3 bg-ink px-9 py-4 text-base font-semibold tracking-tight text-ink-foreground transition-all duration-300 hover:bg-primary hover:shadow-elevated"
        >
          Se hela arbetsgången i bild
          <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
        </m.a>
      </div>
    </section>
  );
};

export default LayerIntro;
