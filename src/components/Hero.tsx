import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import heroDroneVideo from "@/assets/hero-drone.mp4";
import heroDronePoster from "@/assets/hero-drone-poster.jpg";

/* Äkta drönarfoto/video från ett genomfört RoslagsTak-jobb (falsat plåttak, Blidö) —
   inte längre en platshållare. Videon (tyst, loopad, 10s) visas på md+ skärmar;
   mobil och "minska rörelse" faller tillbaka på stillbilden för att spara data. */

const areaTeaser = ["Norrtälje", "Vaxholm", "Ljusterö", "Blidö", "Väddö"];

/* Fältrapport: fullbild-video med mörk slöja, rubrik nedåtankrad i Fraunces,
   liten ortlista som länkar vidare till hela områdeshubben. */
const Hero = () => {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      className="relative flex min-h-[620px] items-end overflow-hidden bg-primary lg:min-h-[min(80vh,900px)]"
      aria-label="Huvudsektion"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroDronePoster}
          alt="Drönarfoto av nylagt falsat plåttak på skärgårdsvilla, Blidö"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className={`h-full w-full object-cover ${reduce ? "" : "md:hidden"}`}
        />
        {!reduce && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroDronePoster}
            preload="none"
            aria-hidden="true"
            className="hidden h-full w-full object-cover md:block"
          >
            <source src={heroDroneVideo} type="video/mp4" />
          </video>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/15"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-40 lg:pb-14 lg:pt-48">
        <motion.div className="max-w-[38rem]" {...fade(0)}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            Takläggare i Roslagen &amp; Stockholm
          </p>
          <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-primary-foreground">
            Ett tak du kan lita på —{" "}
            <span className="italic text-accent">i decennier framöver.</span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.65] text-primary-foreground/80">
            Vi tar hand om hela processen — från första besiktningen till sista plåtdetaljen.
            Takbyte, takrenovering och akut takläckage för villor, BRF:er och företag i hela
            Roslagen och Storstockholm.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/offert"
              className="hero-offer-pulse group inline-flex items-center gap-3 bg-accent px-8 py-4 text-[17px] font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Få kostnadsfri offert
              <ArrowRight
                className="h-5 w-5 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="tel:0701543639"
              className="inline-flex items-center gap-3 border-2 border-primary-foreground/40 px-8 py-4 text-[17px] font-semibold text-primary-foreground transition-colors duration-500 hover:bg-primary-foreground/10"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Ring vid akut läckage
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 w-full border-t border-primary-foreground/15 bg-primary/70 backdrop-blur-sm"
        {...fade(0.15)}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-baseline gap-x-3 gap-y-2 px-6 py-4">
          <span className="text-[13px] font-semibold text-primary-foreground">Vi finns här</span>
          <span className="text-[13px] leading-relaxed text-primary-foreground/70">
            {areaTeaser.join(" · ")} · och hela Storstockholm —{" "}
            <Link to="/omraden" className="font-semibold text-accent underline-offset-4 hover:underline">
              se alla områden
            </Link>
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
