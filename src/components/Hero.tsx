import { ArrowRight, Phone, PlayCircle, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero-cinematic.jpg";

const points = [
  "Kostnadsfri besiktning & konsultation",
  "Certifierade takläggare, F-skatt",
  "Vana vid öar utan broförbindelse",
];

const Hero = () => {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      className="relative overflow-hidden bg-secondary pt-28 pb-24 lg:pt-36 lg:pb-32"
      aria-label="Huvudsektion"
    >
      {/* Abstrakt skärgårdsform i bakgrunden */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 hidden h-full w-1/2 opacity-20 lg:block"
      >
        <svg viewBox="0 0 500 500" className="h-full w-full text-primary">
          <path
            fill="currentColor"
            d="M414.5,329Q380,408,294.5,431Q209,454,127,404Q45,354,49.5,252Q54,150,131.5,93Q209,36,299,63.5Q389,91,419,170.5Q449,250,414.5,329Z"
          />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/15 bg-card/80 px-4 py-2 text-[13px] font-bold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur-sm"
            {...fade(0)}
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            Takläggare i Roslagen och skärgården
          </motion.p>

          <motion.h1
            className="mt-7 font-display text-[clamp(2.6rem,5.4vw,4.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-foreground"
            {...fade(0.06)}
          >
            Hållbara tak för <span className="text-primary">skärgårdslivet</span>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-[19px] leading-relaxed text-muted-foreground"
            {...fade(0.12)}
          >
            Vi byter, renoverar och plåtar tak längs Roslagens kust och på öarna — med
            premiummaterial, fast pris, 10 års utförandegaranti och 30 års materialgaranti.
          </motion.p>

          <motion.ul className="mt-8 space-y-3" {...fade(0.18)}>
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[17px] text-foreground/85">
                <Check className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </motion.ul>

          <motion.div className="mt-10 flex flex-col gap-4 sm:flex-row" {...fade(0.24)}>
            <a
              href="/offert"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-8 py-5 text-[18px] font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-accent animate-subtle-pulse"
            >
              Få kostnadsfri offert
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="tel:0701543639"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-border bg-card px-8 py-5 text-[18px] font-bold text-foreground transition-colors hover:border-accent/40 hover:text-primary"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Ring oss: 070-154 36 39
            </a>
          </motion.div>

          <motion.a
            href="/hur-det-gar-till"
            className="mt-8 inline-flex items-center gap-2 border-b border-accent/50 pb-1 text-[13px] font-bold uppercase tracking-[0.16em] text-primary"
            {...fade(0.3)}
          >
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
            Se hur ett takbyte går till
          </motion.a>
        </div>

        {/* Bild */}
        <motion.figure
          className="relative m-0 overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-elevated)]"
          initial={reduce ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={heroImg}
            alt="Skärgårdsvilla i Roslagen med nylagt falsat plåttak"
            width={1920}
            height={1088}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/3] h-full w-full object-cover"
          />
          <figcaption className="flex items-center justify-between gap-4 bg-card px-6 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-primary">
            <span>Falsat plåttak — Roslagens kust</span>
            <span className="text-muted-foreground">RT</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default Hero;
