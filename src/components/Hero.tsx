import { useEffect, useRef } from "react";
import { GARANTI_RENOVERING_CHIP } from "@/data/guarantee";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { m, useReducedMotion } from "framer-motion";
import heroDroneVideo from "@/assets/hero-drone.mp4";
import heroDronePoster from "@/assets/hero-drone-poster.jpg";
import heroDronePosterAvif480 from "@/assets/hero-drone-poster-480.avif";
import heroDronePosterAvif768 from "@/assets/hero-drone-poster-768.avif";
import heroDronePosterAvif1080 from "@/assets/hero-drone-poster-1080.avif";
import heroDronePosterWebp480 from "@/assets/hero-drone-poster-480.webp";
import heroDronePosterWebp768 from "@/assets/hero-drone-poster-768.webp";
import heroDronePosterWebp1080 from "@/assets/hero-drone-poster-1080.webp";

/* Startsidans LCP-element på mobil sedan cookie-bannern slutade blockera paint (#1ag punkt 1,
   Marknadschefen 2026-10-01) — srcset/sizes + moderna format håller nere bytes för just den
   skärmstorlek som faktiskt visar bilden. */
export const heroPosterSrcSet = {
  avif: `${heroDronePosterAvif480} 480w, ${heroDronePosterAvif768} 768w, ${heroDronePosterAvif1080} 1080w`,
  webp: `${heroDronePosterWebp480} 480w, ${heroDronePosterWebp768} 768w, ${heroDronePosterWebp1080} 1080w`,
  sizes: "100vw",
};

/* Äkta drönarfoto/video från ett genomfört RoslagsTak-jobb (Singö: betongpannor och TP20-plåt) —
   inte längre en platshållare. Videon (tyst, loopad, 10s) visas på md+ skärmar;
   mobil och "minska rörelse" faller tillbaka på stillbilden för att spara data. */

const areaTeaser = ["Norrtälje", "Vaxholm", "Ljusterö", "Blidö", "Väddö"];

/* Fältrapport: fullbild-video med mörk slöja, rubrik nedåtankrad i Fraunces,
   liten ortlista som länkar vidare till hela områdeshubben. */
const Hero = () => {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Filmen (4–5 MB) hämtas bara på skärmar där den visas (md och uppåt). Förut låg <source> i markupen och
     webbläsaren hämtade filmen också på mobil, där elementet är dolt. Stillbilden (poster) syns oförändrat tills filmen startar. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const start = () => {
      if (mq.matches && !v.src) {
        v.src = heroDroneVideo;
        v.load();
        v.play().catch(() => undefined);
      }
    };
    start();
    mq.addEventListener("change", start);
    return () => mq.removeEventListener("change", start);
  }, [reduce]);
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
        <picture>
          <source type="image/avif" srcSet={heroPosterSrcSet.avif} sizes={heroPosterSrcSet.sizes} />
          <source type="image/webp" srcSet={heroPosterSrcSet.webp} sizes={heroPosterSrcSet.sizes} />
          <img
            src={heroDronePoster}
            alt="Drönarfoto rakt uppifrån av ett hus på Singö med röda betongpannor på huvudtaket och röd TP20-plåt på de lägre takdelarna"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className={`h-full w-full object-cover ${reduce ? "" : "md:hidden"}`}
          />
        </picture>
        {!reduce && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            poster={heroDronePoster}
            preload="none"
            aria-hidden="true"
            className="hidden h-full w-full object-cover md:block"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-primary/15"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-24 lg:pb-14 lg:pt-48">
        <m.div className="max-w-[38rem]" {...fade(0)}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            Takläggare i Roslagen &amp; Stockholm
          </p>
          <h1 className="mt-3 max-w-[20ch] font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-primary-foreground">
            Ett tak du kan lita på —{" "}
            <span className="italic text-accent">i decennier framöver.</span>
          </h1>
          <p className="mt-3 max-w-[46ch] text-[17px] leading-[1.65] text-primary-foreground/80 lg:mt-6">
            Vi tar hand om hela processen — från första takkontrollen till sista plåtdetaljen.
            Takbyte, takrenovering och takreparation för villor, BRF:er och företag i hela
            Roslagen och Storstockholm.
          </p>

          <p className="mt-3 text-[14px] text-primary-foreground/80 lg:mt-4">
            <Link to="/takkontroll" className="font-semibold text-accent underline-offset-4 hover:underline">
              Boka kostnadsfri takkontroll
            </Link>
            <span aria-hidden="true"> · </span>
            <Link to="/rot-avdrag" className="underline-offset-4 hover:underline">
              ROT-avdrag på tak
            </Link>
          </p>
          <ul className="mt-3 flex max-w-[46ch] flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-primary-foreground/75 lg:mt-6" aria-label="Fakta om RoslagsTak">
            {["10 års utförandegaranti", GARANTI_RENOVERING_CHIP, "Fast pris", "Arbete enligt AMA", "Svar inom 24 h"].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-4 lg:mt-8">
            <a
              href="/takkontroll"
              className="hero-offer-pulse group inline-flex items-center gap-3 bg-cta px-8 py-4 text-[17px] font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
            >
              Boka kostnadsfri takkontroll
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
              Ring 070-154 36 39
            </a>
          </div>
        </m.div>
      </div>

      <m.div
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
      </m.div>
    </section>
  );
};

export default Hero;
