import { CheckCircle, Heart, ShieldCheck, Award, Zap } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import aboutImg from "@/assets/project-blido-hero.jpg";
import aboutImgAvif from "@/assets/project-blido-hero-1080.avif";
import aboutImgWebp from "@/assets/project-blido-hero-1080.webp";

const coreValues = [
  {
    icon: Heart,
    title: "Tillgänglighet",
    description:
      "Du ska aldrig behöva jaga din takfirma. Vi svarar inom 24 timmar, och takkontrollen kan bokas måndag–fredag 07–20 och lördag–söndag 09–19.",
  },
  {
    icon: ShieldCheck,
    title: "En kontaktperson",
    description:
      "Samma person tar hand om dig från första kontakten till färdigt tak. Du behöver inte förklara ditt tak för någon ny på vägen.",
  },
  {
    icon: Award,
    title: "Tydliga villkor",
    description:
      "Fast pris i offerten, där det framgår vad som ingår. 10 års utförandegaranti på det arbete vi utför, och 30 års tätskiktsgaranti via MATAKI när ett nytt tätskikt läggs. ROT-avdraget på 30 % av arbetskostnaden dras direkt på fakturan.",
  },
  {
    icon: Zap,
    title: "Hantverk enligt AMA",
    description:
      "Vi arbetar enligt AMA, branschens gemensamma beskrivning av hur material och utförande ska vara. Det är i underlaget, infästningen och plåtdetaljerna som ett tak avgörs.",
  },
];


const benefits = [
  "En kontaktperson genom hela processen",
  "Fast pris efter kostnadsfri takkontroll",
  "10 års utförandegaranti",
  "30 års tätskiktsgaranti via MATAKI",
  "ROT-avdraget dras direkt på fakturan",
  "Roslagen, Storstockholm och Mälardalen",
];


/* Nautisk asymmetri: roterat foto som bryter ut i vänsterkant, texten i en
   förskjuten spalt, ledorden som mörk marinlista. */
const About = () => {
  const reduce = useReducedMotion();
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

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
                <motion.img
                  src={aboutImg}
                  alt="Nylagt tak med svarta betongpannor från Benders på ett mörkbrunt trähus på Blidö, sett snett ovanifrån från altansidan med lövskog runt omkring."
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="h-[112%] w-full object-cover"
                  style={reduce ? undefined : { y: imgY }}
                />
                </picture>
              </figure>
              <figcaption className="absolute -bottom-5 left-6 z-10 rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-xl">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
                  Bas i Norrtälje
                </span>
                <span className="mt-1 block font-display text-xl">Riktiga tak, riktiga bilder</span>

              </figcaption>
            </div>
          </div>

          {/* Text i förskjuten spalt */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Om RoslagsTak
            </p>
            <h2
              id="about-heading"
              className="mt-6 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.14] text-foreground"
            >
              Ett tak som håller,{" "}
              <span className="italic text-accent">och en kontaktperson som svarar.</span>
            </h2>
            <div className="mt-8 space-y-6 text-[18px] font-light leading-relaxed text-marine">
              <p>
                RoslagsTak har sin bas i Norrtälje och byter och lägger om tak på villor och fritidshus
                i Roslagen, Storstockholm och Mälardalen. Vi lägger betongpannor, lertegel, TP20-plåt,
                dubbelfalsat plåttak och papptak, och gör takomläggningar, takreparationer och
                plåtarbeten. Allt arbete utförs enligt AMA, och du får alltid ett fast pris.
              </p>
              <p>
                Det som gör skillnad för dig som kund är att du har en och samma kontaktperson genom
                hela processen, från takkontrollen till färdigt tak. Takkontrollen är kostnadsfri och
                utan förpliktelser: en av våra säljare tittar på taket på plats, det tar ungefär 1–2
                timmar. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas
                får du också en offert med fast pris – kostnadsfritt och utan förpliktelser. Du
                bestämmer själv om och när.
              </p>
              <p>
                Vi visar bara riktiga jobb. På Blidö i Norrtälje fick ett hus sommaren 2026 ett
                komplett takbyte med nytt underlag, ny läkt, svarta betongpannor från Benders, nya
                plåtdetaljer, skorstensbeslag och hängrännor. På Singö i Grisslehamn blev ett takbyte
                klart i september 2026, med röda betongpannor på huvudtaket, röd TP20-plåt på de lägre
                delarna och delvis ny råspont. Båda jobben finns med bilder under{" "}
                <Link to="/projekt" className="text-accent underline underline-offset-4 hover:no-underline">
                  Projekt
                </Link>
                , och våra omdömen från Google finns under{" "}
                <Link to="/recensioner" className="text-accent underline underline-offset-4 hover:no-underline">
                  Recensioner
                </Link>
                .
              </p>
            </div>


            <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
              {benefits.map((benefit) => (
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
                Så jobbar vi
              </p>
              <h3 className="mt-6 font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-bold leading-[1.16]">
                Så jobbar vi
              </h3>
              <p className="mt-5 text-[17px] font-light leading-relaxed text-primary-foreground/75">
                Fyra saker som styr hur vi tar hand om dig och ditt tak.
              </p>

            </div>

            <ul className="col-span-12 lg:col-span-7 lg:col-start-6">
              {coreValues.map((value, i) => (
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
                        <value.icon
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
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
