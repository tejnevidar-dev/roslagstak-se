import { CheckCircle, Heart, ShieldCheck, Award, Zap } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
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
    description: "Vi står bakom varje takpanna, varje plåtskiva och varje skarv vi lägger. Med 10 års garanti och tydliga avtal tar vi fullt ansvar för resultatet.",
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
  "10 års garanti på allt arbete",
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
    <section id="om-oss" className="py-24 md:py-36 bg-warm" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 md:mb-32">
          <div className="lg:col-span-7">
            <SectionHeading
              meta="Om RoslagsTak"
              index="04 / 04"
              id="about-heading"
              title={<>Ditt tak i trygga händer — <em className="font-normal italic text-primary">från kust till ö</em></>}
            />
            <div className="space-y-5 text-muted-foreground leading-relaxed mt-8">
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

            <ul className="grid sm:grid-cols-2 gap-x-8 mt-10 border-t border-foreground/10">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm text-foreground py-3.5 border-b border-foreground/10"
                >
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div ref={imgWrap} className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[1.75rem] aspect-[4/5]">
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

        {/* Core values */}
        <SectionHeading
          meta="Våra ledord"
          title="Fyra ledord som genomsyrar allt vi gör"
          intro="Alla i vår organisation arbetar under samma fyra ledord. De styr hur vi bemöter kunder, planerar projekt och utför varje takläggning."
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-foreground/10">
          {coreValues.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.07}>
              <div
                className={`group h-full py-9 sm:px-7 border-b border-foreground/10 ${
                  i > 0 ? "lg:border-l lg:border-foreground/10" : ""
                } ${i === 0 ? "sm:pl-0" : ""}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-semibold tabular-nums tracking-[0.2em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <value.icon className="w-4 h-4 text-primary transition-transform duration-500 group-hover:-translate-y-0.5" />
                </div>
                <h4 className="font-display text-xl tracking-[-0.02em] text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
