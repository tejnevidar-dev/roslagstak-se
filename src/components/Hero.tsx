import { ArrowRight, Phone, PlayCircle, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero-cinematic.jpg";

const points = [
  "Kostnadsfri besiktning & konsultation",
  "Certifierade takläggare, F-skatt",
  "Vana vid öar utan broförbindelse",
];

/* Arkitektonisk premium: vit textpanel mot helformatsbild, hairlines och rak typografi */
const Hero = () => {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      className="relative grid min-h-[46rem] border-b border-border bg-card lg:grid-cols-[1.02fr_0.98fr]"
      aria-label="Huvudsektion"
    >
      {/* Textpanel */}
      <div className="flex flex-col justify-center px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
        <motion.p
          className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-primary"
          {...fade(0)}
        >
          <span aria-hidden="true" className="h-px w-12 bg-primary" />
          Takläggare i Roslagen och skärgården
        </motion.p>

        <motion.h1
          className="mt-8 max-w-[38rem] font-display text-[clamp(2.7rem,5.6vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-foreground"
          {...fade(0.06)}
        >
          Hållbara tak för{" "}
          <span className="text-primary">skärgårdslivet</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-lg text-[19px] font-light leading-relaxed text-muted-foreground"
          {...fade(0.12)}
        >
          Vi byter, renoverar och plåtar tak längs Roslagens kust och på öarna — med
          premiummaterial, fast pris, 10 års utförandegaranti och 30 års materialgaranti.
        </motion.p>

        <motion.ul className="mt-10 grid gap-px border-y border-border bg-border" {...fade(0.18)}>
          {points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-4 bg-card py-4 text-[17px] text-foreground"
            >
              <Check className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              {point}
            </li>
          ))}
        </motion.ul>

        <motion.div className="mt-10 flex flex-col gap-4 sm:flex-row" {...fade(0.24)}>
          <a
            href="/offert"
            className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-sm bg-primary px-9 py-5 text-[18px] font-bold text-primary-foreground shadow-[var(--shadow-elevated)] transition-all hover:-translate-y-0.5 hover:bg-accent animate-subtle-pulse"
          >
            Få kostnadsfri offert
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a
            href="tel:0701543639"
            className="inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-sm border border-border px-9 py-5 text-[18px] font-bold text-foreground transition-colors hover:bg-secondary"
          >
            <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
            070-154 36 39
          </a>
        </motion.div>

        <motion.a
          href="/hur-det-gar-till"
          className="group mt-10 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-primary"
          {...fade(0.3)}
        >
          <PlayCircle className="h-4 w-4" aria-hidden="true" />
          Se hur ett takbyte går till
          <span aria-hidden="true" className="h-px w-8 bg-primary transition-all group-hover:w-14" />
        </motion.a>
      </div>

      {/* Bildpanel — helformat */}
      <motion.figure
        className="relative m-0 min-h-[22rem] overflow-hidden bg-secondary lg:min-h-full"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={heroImg}
          alt="Skärgårdsvilla i Roslagen med nylagt falsat plåttak"
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-card px-6 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-primary ">
          <span>Falsat plåttak — Roslagens kust</span>
          <span className="text-muted-foreground">RT</span>
        </figcaption>
      </motion.figure>
    </section>
  );
};

export default Hero;
