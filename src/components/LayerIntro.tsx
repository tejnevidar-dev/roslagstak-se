import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import macroImg from "@/assets/roof-layers-macro.jpg";

/** Dark indigo editorial band that introduces the layer-by-layer roof animation. */
const LayerIntro = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="bg-accent text-accent-foreground py-24 md:py-36 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-foreground/45">
              Metodik
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl md:text-6xl xl:text-7xl font-medium tracking-tighter leading-[0.9] mt-6 mb-8">
              En konstruktion som tål skärgården.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg md:text-2xl font-light leading-relaxed text-accent-foreground/60 max-w-xl mb-12">
              Vi bygger lager för lager — råspont, papp, hängrännor, vindskivor, läkt, pannor och
              plåtbeslag — med material valda för Blidös och Norrtäljes klimat.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <a href="#hur-det-gar-till" className="group inline-flex items-center gap-6">
              <span className="text-lg md:text-xl font-medium border-b-2 border-accent-foreground/20 pb-1 group-hover:border-accent-foreground transition-colors">
                Hur går det till?
              </span>
              <span className="w-14 h-14 rounded-full border border-accent-foreground/20 flex items-center justify-center transition-all duration-500 group-hover:bg-accent-foreground group-hover:text-accent">
                <ArrowDown className="w-5 h-5" aria-hidden="true" />
              </span>
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-5 w-full" ref={ref}>
          <Reveal delay={0.12}>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-accent-foreground/10 group">
              <motion.img
                src={macroImg}
                alt="Närbild på takets uppbyggnad med råspont, papp, läkt och betongpannor"
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-[112%] object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                style={reduce ? undefined : { y }}
              />
              <div className="absolute inset-0 bg-accent/25" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-foreground/70">
                  7 skikt av totalt skydd
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default LayerIntro;
