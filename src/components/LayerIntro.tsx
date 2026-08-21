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
    <section className="border-b border-border bg-warm py-20 md:py-28" aria-labelledby="layers-heading">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <div className="overflow-hidden border border-border">
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

        <div>
          <Reveal>
            <h2
              id="layers-heading"
              className="font-display text-3xl font-extrabold tracking-[-0.025em] text-foreground sm:text-4xl"
            >
              Sju lager mellan dig och skärgårdens väder
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Ett tak är inte ett skikt utan en konstruktion. Så här bygger vi upp den — i den ordning
              momenten faktiskt utförs på taket.
            </p>
          </Reveal>

          <ol className="mt-8 space-y-3">
            {layers.map((layer, i) => (
              <li key={layer} className="flex items-start gap-4 border border-border bg-card px-5 py-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary text-sm font-bold tabular-nums text-primary-foreground">
                  {i + 1}
                </span>
                <span className="text-base font-semibold leading-snug text-foreground">{layer}</span>
              </li>
            ))}
          </ol>

          <a
            href="#hur-det-gar-till"
            className="group mt-8 inline-flex items-center gap-3 bg-primary px-8 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-accent"
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
