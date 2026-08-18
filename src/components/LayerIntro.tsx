import { ArrowDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import macroImg from "@/assets/roof-layers-macro.jpg";

const layers = [
  "Råspont & underlagstak",
  "Underlagspapp — Mataki Haloten PRO",
  "Fotplåt & hängrännor",
  "Vindskivor & gavelbeslag",
  "Ströläkt & bärläkt",
  "Takpannor eller falsad plåt",
  "Nock, beslag & snörasskydd",
];

/** Light, technical lead-in to the layer-by-layer roof film. */
const LayerIntro = () => {
  return (
    <section className="border-b border-border bg-background py-20 md:py-28" aria-labelledby="layers-heading">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative overflow-hidden border border-border">
              <img
                src={macroImg}
                alt="Närbild på takets uppbyggnad med råspont, papp, läkt och betongpannor"
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="rule-label">Konstruktion</p>
            <h2
              id="layers-heading"
              className="mt-5 max-w-2xl font-display text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground text-balance"
            >
              Sju lager mellan dig och skärgårdens väder
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ett tak är inte ett skikt utan en konstruktion. Så här bygger vi upp den — i den ordning
              momenten faktiskt utförs på taket.
            </p>
          </Reveal>

          <ol className="mt-10 border-t border-border">
            {layers.map((layer, i) => (
              <li key={layer} className="flex items-baseline gap-5 border-b border-border py-4">
                <span className="text-[11px] font-bold tabular-nums tracking-[0.24em] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-medium text-foreground">{layer}</span>
              </li>
            ))}
          </ol>

          <a
            href="#hur-det-gar-till"
            className="group mt-10 inline-flex items-center gap-4 bg-accent px-8 py-5 text-base font-semibold text-accent-foreground transition-colors hover:bg-primary"
          >
            Se hela arbetsgången i bild
            <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LayerIntro;
