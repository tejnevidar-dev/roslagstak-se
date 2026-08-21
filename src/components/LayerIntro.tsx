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
    <section className="border-b border-border bg-secondary py-24 md:py-36" aria-labelledby="layers-heading">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-6 lg:grid-cols-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <Reveal>
            <div className="relative overflow-hidden border border-border">
              <img
                src={macroImg}
                alt="Närbild på takets uppbyggnad med råspont, papp, läkt och betongpannor"
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="border border-t-0 border-border bg-background px-7 py-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-seafoam">Så byggs taket</p>
              <p className="mt-3 text-[16px] leading-[1.7] text-muted-foreground">
                Varje lager har en uppgift. Hoppar man över ett av dem syns det först flera år senare —
                därför gör vi alla sju, varje gång.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="rule-label">Konstruktion</p>
            <h2
              id="layers-heading"
              className="mt-7 max-w-2xl font-display text-[clamp(2.1rem,3.8vw,3.25rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-foreground text-balance"
            >
              Sju lager mellan dig och skärgårdens väder
            </h2>
            <p className="mt-7 max-w-xl text-[19px] leading-[1.7] text-muted-foreground">
              Ett tak är inte ett skikt utan en konstruktion. Så här bygger vi upp den — i den ordning
              momenten faktiskt utförs på taket.
            </p>
          </Reveal>

          <ol className="mt-12 border-t border-border">
            {layers.map((layer, i) => (
              <li
                key={layer}
                className="group flex items-baseline gap-6 border-b border-border py-6 transition-colors hover:bg-background"
              >
                <span className="text-[12px] font-bold tabular-nums tracking-[0.24em] text-seafoam">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[17px] font-semibold leading-snug text-foreground">{layer}</span>
              </li>
            ))}
          </ol>

          <a
            href="#hur-det-gar-till"
            className="group mt-12 inline-flex items-center gap-4 bg-primary px-9 py-5 text-[15px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-accent"
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
