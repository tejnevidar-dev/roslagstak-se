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
    <section
      className="relative flex min-h-[88vh] flex-col overflow-hidden bg-primary text-primary-foreground lg:min-h-screen"
      aria-label="Huvudsektion"
    >
      {/* Bakgrundsbild — fullbredd med filmisk vignett */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Skärgårdsvilla i Roslagen med nylagt falsat plåttak"
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, hsl(var(--primary)) 100%)",
          }}
        />
      </div>

      {/* Tekniskt punkt-rutnät — diskret textur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Innehåll */}
      <div className="relative z-20 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
          <div className="grid grid-cols-12 items-center gap-8">
            <motion.div
              className="col-span-12 space-y-8 lg:col-span-8 xl:col-span-7"
              {...fade(0)}
            >
              {/* Regel-label */}
              <p className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em] text-seafoam-light">
                <span aria-hidden="true" className="h-px w-10 bg-seafoam-light/60" />
                Takläggare i Roslagen och skärgården
              </p>

              {/* Rubrik med överdimensionerad index */}
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-12 top-0 hidden select-none font-display text-9xl font-black leading-none text-accent/30 lg:block"
                >
                  01
                </span>
                <h1 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold leading-[0.88] tracking-[-0.04em]">
                  Takbyten byggda för
                  <br />
                  <span className="text-seafoam-light">skärgårdens väder</span>
                </h1>
              </div>

              {/* Glass-kort med innehåll */}
              <motion.div
                className="relative max-w-2xl overflow-hidden rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-xl"
                {...fade(0.12)}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 p-2 font-mono text-[10px] tracking-[0.2em] text-seafoam/70"
                >
                  RT · 2026
                </span>

                <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/80">
                  Vi byter, renoverar och plåtar tak längs Roslagens kust och på
                  öarna — med premiummaterial, fast pris, 10 års
                  utförandegaranti och 30 års materialgaranti.
                </p>

                <ul className="mt-7 mb-8 space-y-3">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-[15px] text-primary-foreground/90"
                    >
                      <Check
                        className="h-4 w-4 shrink-0 text-seafoam-light"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <motion.div
                  className="flex flex-wrap items-center gap-5"
                  {...fade(0.18)}
                >
                  <a
                    href="#offert"
                    className="group inline-flex items-center gap-3 bg-seafoam px-9 py-4 text-sm font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-seafoam-light animate-subtle-pulse"
                  >
                    Begär kostnadsfri offert
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="tel:0701543639"
                    className="group inline-flex items-center gap-3 font-semibold text-primary-foreground transition-colors hover:text-seafoam-light"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent transition-colors group-hover:border-seafoam-light">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    070-154 36 39
                  </a>
                </motion.div>
              </motion.div>

              <motion.a
                href="#hur-det-gar-till"
                className="inline-flex items-center gap-2 border-b border-seafoam/60 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-seafoam-light"
                {...fade(0.24)}
              >
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                Se hur ett takbyte går till
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Botten — spec-stripp */}
      <dl className="relative z-30 border-t border-accent/50 bg-primary/90 py-9 backdrop-blur-md">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-8 gap-y-6 px-6 md:grid-cols-4 lg:px-12">
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className={`space-y-1.5 ${
                index !== 3 ? "md:border-r md:border-primary-foreground/15 md:pr-8" : ""
              }`}
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-seafoam">
                {fact.label}
              </dt>
              <dd className="font-display text-lg font-bold uppercase italic tracking-[-0.02em]">
                {fact.value}
              </dd>
            </div>
          ))}
        </div>
      </dl>

      {/* Vertikal index-rail (xl+) */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-6 opacity-40 xl:flex"
      >
        <span className="rotate-180 text-[10px] font-bold tracking-[0.2em] [writing-mode:vertical-rl]">
          RT_2026
        </span>
        <div className="h-10 w-px bg-accent" />
        <span className="text-[10px] font-bold tracking-[0.2em]">01</span>
        <div className="h-3 w-px bg-seafoam-light" />
        <span className="text-[10px] font-bold tracking-[0.2em] text-seafoam-light">02</span>
        <div className="h-3 w-px bg-accent" />
        <span className="text-[10px] font-bold tracking-[0.2em]">03</span>
      </div>
    </section>
  );
};

export default Hero;
