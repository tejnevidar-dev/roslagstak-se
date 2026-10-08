import {
  HOME_ABOUT_BENEFITS,
  HOME_ABOUT_CAPTION,
  HOME_ABOUT_INTRO,
  HOME_ABOUT_P1,
  HOME_ABOUT_P2,
  HOME_ABOUT_P3,
  HOME_CORE_VALUES,
  HOME_WORKFLOW,
} from "@/data/home-about";
import { CheckCircle, Heart, ShieldCheck, Award, Zap } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import aboutImg from "@/assets/project-blido-hero.jpg";
import aboutImgAvif from "@/assets/project-blido-hero-1080.avif";
import aboutImgWebp from "@/assets/project-blido-hero-1080.webp";

/* Texterna ligger i src/data/home-about.ts (delas med den statiska HTML:en). Ikonerna följer ordningen i HOME_CORE_VALUES. */
const coreIcons = [Heart, ShieldCheck, Award, Zap];

/* Nautisk asymmetri: roterat foto som bryter ut i vänsterkant, texten i en
   förskjuten spalt, ledorden som mörk marinlista. */
const About = () => {
  const reduce = useReducedMotion();
  const imgWrap = useRef<HTMLDivElement>(null);
  const imgEl = useRef<HTMLImageElement>(null);

  /* Parallaxen på bilden (−6 % → +6 % av bildens höjd medan fotot rullar förbi). Samma rörelse som framer-motions useScroll gav
     (progress 0 när fotots överkant når skärmens nederkant, 1 när dess underkant når skärmens överkant), men utan att mäta
     elementet när sektionen monteras: det tvingade fram en layout på 100–200 ms på mobil. Nu läses läget först när fotot är nära skärmen. */
  useEffect(() => {
    const wrap = imgWrap.current;
    const img = imgEl.current;
    if (!wrap || !img || reduce) return;
    img.style.transform = "translateY(-6%)";
    let raf = 0;
    let active = false;
    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      img.style.transform = `translateY(${(-6 + 12 * p).toFixed(2)}%)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          update();
        } else if (!entry.isIntersecting && active) {
          active = false;
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  return (
    <section id="om-oss" className="bg-background py-24 lg:py-32" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 items-start gap-y-10 lg:gap-16">
          {/* Roterat foto med garantiplakett — samma språk som hero */}
          <div ref={imgWrap} className="col-span-12 lg:col-span-5">
            <div className="relative">
              <figure className="relative m-0 aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-[0_50px_100px_-50px_rgba(12,35,64,0.75)]">
                {/* Bilden beskärs till 4:5 (object-cover), så höjden styr: 1080-varianten i AVIF/WebP
                    räcker och är en tredjedel av JPG-originalet (Lighthouse image-delivery, 2026-10-01). */}
                <picture className="contents">
                <source type="image/avif" srcSet={aboutImgAvif} />
                <source type="image/webp" srcSet={aboutImgWebp} />
                <img
                  ref={imgEl}
                  src={aboutImg}
                  alt="Nylagt tak med svarta betongpannor från Benders på ett mörkbrunt trähus på Blidö, sett snett ovanifrån från altansidan med lövskog runt omkring."
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="h-[112%] w-full object-cover"
                />
                </picture>
              </figure>
              <figcaption className="absolute -bottom-5 left-6 z-10 rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-xl">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
                  {HOME_ABOUT_CAPTION.eyebrow}
                </span>
                <span className="mt-1 block font-display text-xl">{HOME_ABOUT_CAPTION.text}</span>

              </figcaption>
            </div>
          </div>

          {/* Text i förskjuten spalt */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              {HOME_ABOUT_INTRO.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="mt-6 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.14] text-foreground"
            >
              {HOME_ABOUT_INTRO.headingA}{" "}
              <span className="italic text-accent">{HOME_ABOUT_INTRO.headingB}</span>
            </h2>
            <div className="mt-8 space-y-6 text-[18px] font-light leading-relaxed text-marine">
              <p>{HOME_ABOUT_P1}</p>
              <p>{HOME_ABOUT_P2}</p>
              <p>
                {HOME_ABOUT_P3.before}
                <Link to="/projekt" className="text-accent underline underline-offset-4 hover:no-underline">
                  {HOME_ABOUT_P3.linkProjects}
                </Link>
                {HOME_ABOUT_P3.middle}
                <Link to="/recensioner" className="text-accent underline underline-offset-4 hover:no-underline">
                  {HOME_ABOUT_P3.linkReviews}
                </Link>
                {HOME_ABOUT_P3.after}
              </p>
            </div>


            <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {HOME_ABOUT_BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 border-t border-border py-4 text-[16px] text-foreground"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ledord som mörk marinlista */}
        <div className="mt-24 bg-primary px-6 py-16 text-primary-foreground sm:px-12 lg:mt-28 lg:px-16 lg:py-20">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                {HOME_WORKFLOW.eyebrow}
              </p>
              <h3 className="mt-6 font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-bold leading-[1.16]">
                {HOME_WORKFLOW.heading}
              </h3>
              <p className="mt-5 text-[17px] font-light leading-relaxed text-primary-foreground/75">
                {HOME_WORKFLOW.intro}
              </p>

            </div>

            <ul className="col-span-12 lg:col-span-7 lg:col-start-6">
              {HOME_CORE_VALUES.map((value, i) => {
                const Icon = coreIcons[i];
                return (
                <li
                  key={value.title}
                  className="border-t border-primary-foreground/20 first:border-t-0"
                >
                  <Reveal delay={i * 0.06}>
                    <div className="group flex flex-col gap-4 py-8 md:flex-row md:gap-10">
                      <span className="flex w-full shrink-0 items-center gap-3 md:w-[12rem]">
                        <span className="font-display text-[12px] tabular-nums tracking-[0.24em] text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Icon
                          className="h-5 w-5 text-accent transition-transform duration-500 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                        <span className="font-display text-xl font-bold">{value.title}</span>
                      </span>
                      <p className="flex-1 text-[16px] font-light leading-relaxed text-primary-foreground/75">
                        {value.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
