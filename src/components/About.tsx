import { CheckCircle, Heart, ShieldCheck, Award, Zap } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import rooferImg from "@/assets/roofer-work.jpg";

const coreValues = [
  {
    icon: Heart,
    title: "Tillgänglighet",
    description:
      "Du ska aldrig behöva jaga din takläggare. Vi svarar i telefon, återkommer inom 24 timmar och håller dig uppdaterad genom hela projektet — oavsett om det gäller en snabb fråga eller ett komplett takbyte.",
  },
  {
    icon: ShieldCheck,
    title: "Ansvar",
    description:
      "Vi står bakom varje takpanna, plåtskiva och skarv vi lägger. Med skriftligt avtal, 10 års utförandegaranti och 30 års materialgaranti vet du exakt vad som gäller — även flera år efter att vi lämnat tomten.",
  },
  {
    icon: Award,
    title: "Hantverk",
    description:
      "Våra takläggare och plåtslagare är utbildade, försäkrade och arbetar enligt AMA och branschens säkerhetskrav. Rätt underlagspapp, rätt infästning och rätt plåtdetaljer — det är där ett tak avgörs.",
  },
  {
    icon: Zap,
    title: "Ordning på arbetsplatsen",
    description:
      "Ett takprojekt påverkar din vardag. Därför planerar vi noga, håller tidplanen, täcker in vad som behöver skyddas och lämnar tomten städad och fri från spik och avfall.",
  },
];


const benefits = [
  "Certifierade och försäkrade takläggare",
  "Fast pris — inga dolda kostnader",
  "10 års utförandegaranti, 30 års materialgaranti",
  "Roslagen och hela Storstockholm",
  "Kostnadsfritt hembesök och offert",
  "Vi sköter ROT-avdraget åt dig",
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
        <div className="grid grid-cols-12 items-start gap-10 lg:gap-16">
          {/* Roterat foto med garantiplakett — samma språk som hero */}
          <div ref={imgWrap} className="col-span-12 lg:col-span-5">
            <div className="relative">
              <figure className="relative m-0 aspect-[4/5] -rotate-2 overflow-hidden border-[12px] border-card bg-secondary shadow-[0_50px_100px_-50px_rgba(12,35,64,0.75)]">
                <motion.img
                  src={rooferImg}
                  alt="Professionell takläggare arbetar på tak vid Roslagens kust"
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="h-[112%] w-full object-cover"
                  style={reduce ? undefined : { y: imgY }}
                />
              </figure>
              <figcaption className="absolute -bottom-5 left-6 z-10 rotate-2 bg-primary px-6 py-4 text-primary-foreground shadow-xl">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.26em] text-seafoam">
                  Roslagen &amp; Storstockholm
                </span>
                <span className="mt-1 block font-display text-xl">Egna takläggare på plats</span>

              </figcaption>
              <span aria-hidden="true" className="absolute -right-4 -top-4 h-12 w-12 bg-seafoam" />
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
              Ett tak som håller —{" "}
              <span className="italic text-accent">och en firma som svarar.</span>
            </h2>
            <div className="mt-8 space-y-6 text-[18px] font-light leading-relaxed text-marine">
              <p>
                RoslagsTak är en takfirma med rötterna i Norrtälje och Roslagens skärgård. Idag
                utför vi takbyte, takrenovering, takvård och plåtarbeten i hela Roslagen och i
                hela Storstockholm — allt arbete enligt branschstandard AMA och av erfarna,
                försäkrade takläggare.
              </p>
              <p>
                Vi tar hand om hela projektet: besiktning, materialval, bygglov när det behövs,
                ställning, rivning, nytt tak och bortforsling av allt avfall. Du har samma
                kontaktperson från första besöket till slutbesiktningen, och du får veta vad som
                händer varje dag arbetet pågår.
              </p>
              <p>
                Vi är dessutom vana vid lägen där andra tvekar — öar utan broförbindelse, smala
                infarter och tak nära vatten och saltluft. Oavsett om du har en villa i Stockholm,
                ett radhus i Täby eller en sommarstuga på Blidö får du kostnadsfritt hembesök,
                fast pris och hjälp med ROT-avdraget innan du bestämmer dig.
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
          <div className="grid grid-cols-12 gap-10 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-seafoam">
                Våra ledord
              </p>
              <h3 className="mt-6 font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-bold leading-[1.16]">
                Så jobbar vi — varje projekt, varje tak
              </h3>
              <p className="mt-5 text-[17px] font-light leading-relaxed text-primary-foreground/75">
                Fyra löften som styr hur vi bemöter dig, planerar projektet och utför själva
                takläggningen.
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
                        <span className="font-display text-[12px] tabular-nums tracking-[0.24em] text-seafoam">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <value.icon
                          className="h-5 w-5 text-seafoam transition-transform duration-500 group-hover:-translate-y-0.5"
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
