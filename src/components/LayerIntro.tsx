import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const layers = [
  {
    name: "Råspont & underlagstak",
    detail: "Vi river det gamla, kontrollerar takstolarna och lägger ny råspont där virket är skadat.",
  },
  {
    name: "Underlagspapp — Mataki Haloten PRO",
    detail: "Vattentätt underlagstak lagt i förband över hela ytan — det som håller vattnet ute.",
  },
  {
    name: "Fotplåt & hängrännor",
    detail: "Fotplåt, rännkrokar och hängrännor som leder vattnet bort från fasad och grund.",
  },
  {
    name: "Vindskivor & gavelbeslag",
    detail: "Takets kanter skyddas mot vind, regn och röta med nya vindskivor och gavelbeslag.",
  },
  {
    name: "Ströläkt & bärläkt",
    detail: "Ströläkt ger luftspalten, bärläkten sätts på exakt centrumavstånd för din pannmodell.",
  },
  {
    name: "Takpannor eller falsad plåt",
    detail: "Betongpannor, tegel eller falsad plåt läggs rad för rad med stormklammer i utsatta lägen.",
  },
  {
    name: "Nock, beslag & snörasskydd",
    detail: "Nock, valmar, skorstensbeslag tätas — sist monteras snörasskydden ovanför takfoten.",
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
          title="Sju lager mellan dig och skärgårdens väder"
          intro="Ett tak är inte ett skikt utan en konstruktion. Så här bygger vi upp den — i den ordning momenten faktiskt utförs på taket."
          id="layers-heading"
        />

        <ol className="mt-12 space-y-px">
          {layers.map((layer, i) => {
            const isLast = i === layers.length - 1;
            return (
              <motion.li
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
              </motion.li>
            );
          })}
        </ol>

        <motion.a
          href="/hur-det-gar-till"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group mt-12 inline-flex items-center gap-3 bg-ink px-9 py-4 text-base font-semibold tracking-tight text-ink-foreground transition-all duration-300 hover:bg-primary hover:shadow-elevated"
        >
          Se hela arbetsgången i bild
          <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
};

export default LayerIntro;
