import { ArrowRight, Phone, PlayCircle, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero-cinematic.jpg";

const facts = [
  { label: "Utförande", value: "10 års garanti" },
  { label: "Material", value: "30 års garanti" },
  { label: "Prissättning", value: "Fast pris" },
  { label: "Täckning", value: "Hela Roslagen" },
];

const points = [
  "Kostnadsfri besiktning",
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
    <section className="relative bg-primary text-primary-foreground" aria-label="Huvudsektion">
      <div className="grid lg:grid-cols-2">
        {/* Vänster panel — innehåll */}
        <div className="relative flex flex-col justify-center bg-primary px-6 py-16 sm:px-10 lg:py-24 xl:px-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07] bg-grid-fine"
          />
          <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
            <motion.p
              className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam-light"
              {...fade(0)}
            >
              <span aria-hidden="true" className="h-px w-10 bg-seafoam-light/60" />
              Takläggare i Roslagen och skärgården
            </motion.p>

            <motion.h1
              className="mt-7 font-display text-[clamp(2.6rem,5.2vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.04em]"
              {...fade(0.06)}
            >
              Takbyten byggda för
              <span className="text-seafoam-light"> skärgårdens väder</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/75"
              {...fade(0.12)}
            >
              Vi byter, renoverar och plåtar tak längs Roslagens kust och på öarna — med
              premiummaterial, fast pris, 10 års utförandegaranti och 30 års materialgaranti.
            </motion.p>

            <motion.ul className="mt-9 space-y-3" {...fade(0.18)}>
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] text-primary-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-seafoam-light" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </motion.ul>

            <motion.div className="mt-11 flex flex-wrap items-center gap-5" {...fade(0.24)}>
              <a
                href="#offert"
                className="group inline-flex items-center gap-3 bg-seafoam px-9 py-5 text-sm font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-seafoam-light hover:text-primary animate-subtle-pulse"
              >
                Begär kostnadsfri offert
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="tel:0701543639"
                className="inline-flex items-center gap-2.5 border border-primary-foreground/25 px-7 py-5 text-sm font-semibold text-primary-foreground transition-colors hover:border-seafoam-light hover:text-seafoam-light"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                070-154 36 39
              </a>
            </motion.div>

            <motion.a
              href="#hur-det-gar-till"
              className="mt-8 inline-flex items-center gap-2 border-b border-seafoam/60 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-seafoam-light"
              {...fade(0.3)}
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              Se hur ett takbyte går till
            </motion.a>
          </div>
        </div>

        {/* Höger panel — bild */}
        <motion.figure
          className="relative m-0 min-h-[380px] overflow-hidden bg-accent lg:min-h-[720px]"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={heroImg}
            alt="Skärgårdsvilla i Roslagen med nylagt falsat plåttak"
            width={1920}
            height={1088}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/10 to-transparent"
          />
          <div className="absolute left-0 top-10 bg-primary px-7 py-5">
            <p className="font-display text-3xl font-extrabold leading-none">10+30 ÅR</p>
            <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-seafoam-light">
              Utförande + Material
            </p>
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-primary/85 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] backdrop-blur-sm">
            <span>Falsat plåttak — Roslagens kust</span>
            <span className="text-primary-foreground/55">RT</span>
          </figcaption>
        </motion.figure>
      </div>

      {/* Faktarad — full bredd under split */}
      <dl className="grid grid-cols-2 border-t border-primary-foreground/15 bg-accent md:grid-cols-4">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            className={`group px-7 py-8 transition-colors duration-300 hover:bg-primary ${
              index < 2 ? "border-b border-primary-foreground/15 md:border-b-0" : ""
            } ${index !== 3 ? "border-r border-primary-foreground/15" : ""}`}
          >
            <dt className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-seafoam-light">
              {fact.label}
            </dt>
            <dd className="font-display text-lg font-bold tracking-[-0.02em]">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
