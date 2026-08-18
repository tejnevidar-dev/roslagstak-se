import { ArrowRight, Phone, PlayCircle, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import heroImg from "@/assets/hero-cinematic.jpg";

const facts = [
  { label: "Trygghet", value: "10 års garanti" },
  { label: "Ekonomi", value: "ROT-avdrag" },
  { label: "Prissättning", value: "Fast pris" },
  { label: "Täckning", value: "Hela Roslagen" },
];

const points = [
  { text: "Kostnadsfri besiktning", wide: false },
  { text: "Certifierade takläggare, F-skatt", wide: false },
  { text: "Vana vid öar utan broförbindelse", wide: true },
];

const Hero = () => {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative bg-background" aria-label="Huvudsektion">
      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-12 lg:py-20">
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:gap-20">
          {/* Innehåll — 60 % */}
          <div className="flex flex-col justify-center lg:w-[60%]">
            <motion.p className="rule-label" {...fade(0)}>
              Takläggare i Roslagen och skärgården
            </motion.p>

            <motion.h1
              className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-foreground"
              {...fade(0.06)}
            >
              Hantverksdrivna
              <br />
              <span className="text-accent">takbyten</span> i
              <br />
              skärgården
            </motion.h1>

            <motion.p className="mt-7 max-w-xl text-xl leading-relaxed text-muted-foreground" {...fade(0.12)}>
              Vi byter, renoverar och plåtar tak längs Roslagens kust och på öarna — med
              premiummaterial, fast pris och 10 års garanti på allt arbete.
            </motion.p>

            <motion.ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2" {...fade(0.18)}>
              {points.map((point) => (
                <li
                  key={point.text}
                  className={`flex items-start gap-3 ${point.wide ? "sm:col-span-2" : ""}`}
                >
                  <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-seafoam-light" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-foreground">{point.text}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div className="mt-12 flex flex-wrap items-center gap-8" {...fade(0.24)}>
              <a
                href="#offert"
                className="group inline-flex items-center gap-3 bg-primary px-10 py-5 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-elevated transition-all hover:-translate-y-1 hover:bg-accent animate-subtle-pulse"
              >
                Begär kostnadsfri offert
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <div className="flex flex-col">
                <a
                  href="tel:0701543639"
                  className="inline-flex items-center gap-2 font-display text-2xl text-foreground transition-colors hover:text-seafoam"
                >
                  <Phone className="h-5 w-5 text-seafoam" aria-hidden="true" />
                  070-154 36 39
                </a>
                <a
                  href="#hur-det-gar-till"
                  className="mt-1 inline-flex items-center gap-2 border-b border-seafoam pb-0.5 text-[11px] font-bold uppercase tracking-[0.2em] text-seafoam"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Se hur ett takbyte går till
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bild — 40 % */}
          <motion.div
            className="relative min-h-[420px] lg:w-[40%]"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div aria-hidden="true" className="absolute -inset-4 z-0 border border-seafoam/25" />
            <figure className="relative z-10 m-0 h-full overflow-hidden bg-muted shadow-elevated">
              <img
                src={heroImg}
                alt="Skärgårdsvilla i Roslagen med nylagt falsat plåttak"
                width={1920}
                height={1088}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute right-0 top-8 bg-primary p-6 text-primary-foreground">
                <p className="font-display text-3xl leading-none">10 ÅR</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-seafoam-light">
                  Totalgaranti
                </p>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-primary/90 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-primary-foreground">
                <span>Falsat plåttak — Roslagens kust</span>
                <span className="text-primary-foreground/60">RT</span>
              </figcaption>
            </figure>
          </motion.div>
        </div>

        <dl className="mt-20 grid grid-cols-2 border border-primary/10 md:grid-cols-4">
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className={`group p-8 transition-colors duration-300 hover:bg-primary hover:text-primary-foreground ${
                index < 2 ? "border-b border-primary/10 md:border-b-0" : ""
              } ${index !== 3 ? "border-r border-primary/10" : ""}`}
            >
              <dt className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-seafoam group-hover:text-seafoam-light">
                {fact.label}
              </dt>
              <dd className="font-display text-base uppercase leading-tight">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
