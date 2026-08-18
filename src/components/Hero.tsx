import { ArrowRight, Phone, PlayCircle, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero-cinematic.jpg";

const facts = [
  { label: "Garanti", value: "10 år" },
  { label: "Avdrag", value: "ROT" },
  { label: "Pris", value: "Fast pris" },
  { label: "Område", value: "Hela Roslagen" },
];

const points = [
  "Kostnadsfri besiktning och offert",
  "Certifierade takläggare, F-skatt och full försäkring",
  "Vana att arbeta på öar utan broförbindelse",
];

const Hero = () => {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative border-b border-border bg-background" aria-label="Huvudsektion">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-fine opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-6">
          <motion.p className="rule-label" {...fade(0)}>
            Takläggare i Roslagen sedan generationer
          </motion.p>

          <motion.h1
            className="mt-6 font-display text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground text-balance"
            {...fade(0.06)}
          >
            Takbyte och takrenovering — utfört rätt från första lagret.
          </motion.h1>

          <motion.p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground" {...fade(0.12)}>
            Vi byter, renoverar och plåtar tak längs Roslagens kust och i skärgården. Fast pris,
            tydlig tidsplan och 10 års garanti på allt arbete.
          </motion.p>

          <motion.ul className="mt-8 space-y-3" {...fade(0.18)}>
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[15px] text-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </motion.ul>

          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" {...fade(0.24)}>
            <a
              href="#offert"
              className="group inline-flex items-center justify-center gap-3 whitespace-nowrap bg-primary px-7 py-5 text-base font-semibold text-primary-foreground transition-colors hover:bg-accent animate-subtle-pulse"
            >
              Begär kostnadsfri offert
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="tel:0701543639"
              className="inline-flex items-center justify-center gap-3 whitespace-nowrap border border-border px-7 py-5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              070-154 36 39
            </a>
          </motion.div>

          <motion.a
            href="#hur-det-gar-till"
            className="group mt-8 inline-flex items-center gap-3 text-base font-semibold text-foreground"
            {...fade(0.3)}
          >
            <PlayCircle className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="border-b border-foreground/25 pb-0.5 group-hover:border-primary">
              Se hur ett takbyte går till, steg för steg
            </span>
          </motion.a>
        </div>

        <motion.div
          className="lg:col-span-6"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <figure className="m-0 h-full">
            <div className="relative h-full min-h-[320px] overflow-hidden border border-border">
              <img
                src={heroImg}
                alt="Skärgårdsvilla i Roslagen med nylagt falsat plåttak"
                width={1920}
                height={1088}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-accent/92 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-accent-foreground">
                <span>Falsat plåttak — Roslagens kust</span>
                <span className="text-accent-foreground/60">RT</span>
              </figcaption>
            </div>
          </figure>
        </motion.div>
      </div>

      <div className="relative border-t border-border">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-border px-6 sm:divide-x lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="px-0 py-6 sm:px-8 sm:first:pl-0">
              <dt className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">{fact.label}</dt>
              <dd className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
