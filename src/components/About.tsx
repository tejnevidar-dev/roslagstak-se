import { CheckCircle, Heart, ShieldCheck, Award, Zap } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import rooferImg from "@/assets/roofer-work.jpg";

const coreValues = [
  {
    icon: Heart,
    title: "Servicemind",
    description: "Vi sätter alltid kunden i centrum. Oavsett om det gäller en snabb fråga om ditt tak eller ett omfattande projekt, möter vi dig med lyhördhet och engagemang.",
  },
  {
    icon: ShieldCheck,
    title: "Ansvar",
    description: "Vi står bakom varje takpanna, varje plåtskiva och varje skarv vi lägger. Med 10 års utförandegaranti, 30 års materialgaranti och tydliga avtal tar vi fullt ansvar för resultatet.",
  },
  {
    icon: Award,
    title: "Professionalism",
    description: "Våra takläggare är certifierade och löpande utbildade. Vi arbetar efter branschens bästa praxis med rätt verktyg, rätt material och rätt metod — varje gång.",
  },
  {
    icon: Zap,
    title: "Effektivitet",
    description: "Vi vet att ett takprojekt påverkar din vardag. Därför planerar vi noggrant, håller tidsplanen och minimerar störningarna i ditt hem.",
  },
];

const benefits = [
  "Certifierade och försäkrade takläggare",
  "Fast pris utan dolda kostnader",
  "10 års utförandegaranti, 30 års materialgaranti",
  "Verksamma i hela Roslagens skärgård",
  "Kostnadsfri besiktning och offert",
  "Hjälp med ROT-avdrag",
];

const About = () => {
  const reduce = useReducedMotion();
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <section id="om-oss" className="bg-background py-24 md:py-32" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 md:mb-24">
          <div className="lg:col-span-7">
            <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-primary">
              04 — Om RoslagsTak
            </p>
            <h2
              id="about-heading"
              className="mt-4 font-display text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.03] tracking-[-0.038em] text-foreground text-balance"
            >
              Ditt tak i trygga händer — från kust till ö
            </h2>
            <div className="space-y-5 text-[19px] text-muted-foreground leading-relaxed mt-8">
              <p>
                RoslagsTak har sina rötter i Norrtälje och Roslagens skärgård. Vi lägger tak
                i hela Roslagen — på Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn och Ingmarsö,
                liksom i Vaxholm, Norrtälje, Väddö och Rådmansö. Vi levererar
                takprojekt av högsta kvalitet, alltid enligt branschens AMA-standard.
              </p>
              <p>
                Vi vet hur det är att bo och verka i skärgården. Många av oss har själva vuxit upp med båtar, 
                bryggor och röda stugor. Den kunskapen genomsyrar allt vi gör — från materialval till logistik. 
                Vi tar oss ut till Högmarsö, Svartlöga, Söderöra, Norröra, Humlö och Gräskö — öar dit 
                andra takfirmor inte når.
              </p>
              <p>
                Vare sig du är året-runt-boende i Norrtälje, har en sommarstuga på Blidö, eller äger en fastighet 
                på Arholma — vi ser till att ditt tak håller i årtionden. Vi erbjuder 
                alltid kostnadsfri besiktning och offert, och vi hjälper dig med ROT-avdraget så att du får ut maximalt 
                av din investering.
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-10">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-[17px] text-foreground py-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div ref={imgWrap} className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-3xl border border-border aspect-[4/5] shadow-[var(--shadow-elevated)]">
              <motion.img
                src={rooferImg}
                alt="Professionell takläggare arbetar på tak vid Roslagens kust"
                width={800}
                height={1000}
                loading="lazy"
                className="w-full h-[112%] object-cover"
                style={reduce ? undefined : { y: imgY }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
              <div className="absolute left-6 bottom-6 right-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
                  Blidö · Roslagens skärgård
                </p>
                <p className="font-display text-white text-xl tracking-[-0.02em] mt-1.5">Hantverk på plats</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core values — ledger med hairlines i stället för fyra likadana kort */}
        <div className="border-t border-border pt-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-primary">Våra ledord</p>
              <h3 className="mt-4 font-display text-[clamp(1.7rem,2.6vw,2.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-foreground text-balance">
                Fyra ledord som genomsyrar allt vi gör
              </h3>
              <p className="mt-5 text-[18px] leading-relaxed text-muted-foreground">
                De styr hur vi bemöter kunder, planerar projekt och utför varje takläggning.
              </p>
            </div>

            <ul className="lg:col-span-8">
              {coreValues.map((value, i) => (
                <li key={value.title} className="border-t border-border first:border-t-0 lg:first:border-t">
                  <Reveal delay={i * 0.06}>
                    <div className="group flex flex-col gap-3 py-8 md:flex-row md:gap-8">
                      <span className="flex w-full shrink-0 items-center gap-3 md:w-[13rem]">
                        <span className="text-[12px] font-bold tabular-nums tracking-[0.2em] text-muted-foreground/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <value.icon className="h-5 w-5 text-accent transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden="true" />
                        <span className="font-display text-xl font-bold tracking-[-0.025em] text-foreground">
                          {value.title}
                        </span>
                      </span>
                      <p className="flex-1 text-[17px] leading-relaxed text-muted-foreground">
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
