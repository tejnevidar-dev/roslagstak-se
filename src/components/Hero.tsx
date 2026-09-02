import { ArrowRight, Phone, PlayCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero-cinematic.jpg";
import craftImg from "@/assets/roofer-work.jpg";

/* Nautisk asymmetri: helformatsbild med marinblå slöja, vit textpanel som bryter
   rutnätet och ett roterat hantverksfoto med garantiplakett. */
const Hero = () => {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-primary"
      aria-label="Huvudsektion"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Skärgårdsvilla i Roslagen med nylagt falsat plåttak"
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-8 px-6 pb-20 pt-32 lg:pb-28 lg:pt-36">
        <motion.div className="col-span-12 lg:col-span-7" {...fade(0)}>
          <div className="relative inline-block bg-card/95 p-9 shadow-[0_40px_90px_-40px_rgba(12,35,64,0.8)] backdrop-blur-sm sm:p-12 lg:p-16">
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-12 w-12 bg-seafoam"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Takläggare i Roslagen och skärgården
            </p>
            <h1 className="mt-6 max-w-[36rem] font-display text-[clamp(2.2rem,4.6vw,3.9rem)] font-bold leading-[1.08] text-foreground">
              Vi lägger tak som tål{" "}
              <span className="italic text-accent">skärgårdens alla årstider.</span>
            </h1>
            <p className="mt-7 max-w-lg text-[19px] font-light leading-relaxed text-marine">
              Takbyte, takrenovering och plåtarbeten längs Roslagens kust och på öar utan
              broförbindelse. Fast pris, 10 års utförandegaranti och 30 års materialgaranti.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/offert"
                className="group inline-flex items-center gap-3 border-b-4 border-accent bg-primary px-8 py-4 text-[17px] font-semibold text-primary-foreground transition-colors hover:bg-marine animate-subtle-pulse"
              >
                Få kostnadsfri offert
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="tel:0701543639"
                className="inline-flex items-center gap-3 border-2 border-marine px-8 py-4 text-[17px] font-semibold text-marine transition-colors hover:bg-marine hover:text-marine-foreground"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                070-154 36 39
              </a>
            </div>
            <a
              href="/hur-det-gar-till"
              className="group mt-8 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              Se hur ett takbyte går till
              <span
                aria-hidden="true"
                className="h-px w-8 bg-accent transition-all group-hover:w-14"
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative col-span-5 hidden lg:block"
          initial={reduce ? undefined : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <figure className="relative m-0 aspect-[3/4] rotate-2 overflow-hidden border-[12px] border-card bg-secondary shadow-2xl">
            <img
              src={craftImg}
              alt="Takläggare från RoslagsTak monterar takpannor på hus vid kusten"
              width={900}
              height={1200}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </figure>
          <div className="absolute -bottom-6 -right-6 z-20 -rotate-2 bg-accent p-8 text-accent-foreground shadow-xl">
            <span className="block font-display text-4xl font-bold">10 år</span>
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.24em]">
              Garanterat utförande
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
