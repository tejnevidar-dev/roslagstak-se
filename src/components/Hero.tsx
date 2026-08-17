import { ArrowRight, Phone, PlayCircle } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-cinematic.jpg";

const orter = ["Blidö", "Ljusterö", "Vaxholm", "Norrtälje"];

const Hero = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const line = (delay: number) => ({
    initial: reduce ? {} : { y: "110%" },
    animate: { y: "0%" },
    transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });
  const fade = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-accent"
      aria-label="Huvudsektion"
    >
      <motion.div className="absolute inset-0 z-0" style={reduce ? undefined : { y: imgY, scale: imgScale }}>
        <img
          src={heroImg}
          alt="Modern skärgårdsvilla i Roslagen med falsat plåttak i gryningsljus"
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-accent/15 mix-blend-multiply" />
      </motion.div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-20 pt-32 pb-14 md:pb-20"
        style={reduce ? undefined : { opacity: contentOpacity }}
      >
        <div className="max-w-7xl w-full mx-auto text-primary-foreground">
          <motion.div className="overflow-hidden mb-6" initial={false}>
            <motion.p
              className="text-[11px] md:text-xs font-bold uppercase tracking-[0.4em] text-primary-foreground/70"
              {...line(0.15)}
            >
              Takläggare i Roslagen — sedan generationer
            </motion.p>
          </motion.div>

          <h1 className="font-display font-medium tracking-tighter leading-[0.85] text-balance text-5xl sm:text-7xl lg:text-8xl xl:text-[8.5rem] mb-8 md:mb-12">
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" {...line(0.25)}>
                Taket för
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block font-light italic text-primary-foreground/90" {...line(0.35)}>
                generationer.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="max-w-xl text-base md:text-xl text-primary-foreground/75 leading-relaxed mb-10"
            {...fade(0.6)}
          >
            Takbyte, takrenovering och plåtarbeten längs Roslagens kust och öar — utfört med
            hantverksmässig precision och 10 års garanti.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 mb-10" {...fade(0.72)}>
            <a
              href="#offert"
              className="group inline-flex items-center justify-between gap-6 px-8 md:px-10 py-5 bg-primary text-primary-foreground font-semibold tracking-tight rounded-xl shadow-elevated transition-all hover:shadow-[0_0_50px_hsl(var(--primary)/0.45)] active:scale-[0.98] sm:min-w-[320px]"
            >
              Konfigurera din offert
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#hur-det-gar-till"
              className="group inline-flex items-center justify-center gap-3 px-8 md:px-10 py-5 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/25 text-primary-foreground font-semibold rounded-xl hover:bg-primary-foreground hover:text-accent transition-colors"
            >
              <PlayCircle className="w-5 h-5 transition-transform group-hover:scale-110" aria-hidden="true" />
              Hur går det till
            </a>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-primary-foreground/15"
            {...fade(0.85)}
          >
            <a href="tel:0701543639" className="group inline-flex items-center gap-3">
              <span className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="text-sm">
                <span className="block font-bold tracking-tight group-hover:text-primary transition-colors">
                  070-154 36 39
                </span>
                <span className="block text-primary-foreground/50">Ring för snabb hjälp</span>
              </span>
            </a>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {orter.map((ort) => (
                <li
                  key={ort}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground/55"
                >
                  {ort}
                </li>
              ))}
            </ul>
            <a
              href="#radgivning"
              className="text-sm font-semibold underline decoration-primary-foreground/30 underline-offset-4 hover:decoration-primary-foreground transition-colors"
            >
              Boka kostnadsfri rådgivning
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
