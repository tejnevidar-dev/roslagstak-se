import { Home, Wrench, Droplets, Sun, ShieldCheck, Ruler, Sparkles, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const services = [
  {
    icon: Home,
    slug: "takomlaggning",
    title: "Takomläggning",
    description: "Komplett byte av takmaterial med moderna lösningar. Allt arbete utförs enligt AMA-standard.",
  },
  {
    icon: Wrench,
    slug: "takrenovering",
    title: "Takrenovering",
    description: "Vi renoverar och förlänger livslängden på ditt befintliga tak — även på svåråtkomliga öar.",
  },
  {
    icon: Droplets,
    slug: "takavvattning",
    title: "Takavvattning",
    description: "Installation och byte av hängrännor, stuprör och kompletta takavvattningssystem.",
  },
  {
    icon: Sun,
    slug: "takkupor",
    title: "Takkupor & fönster",
    description: "Montering av takkupor och takfönster för mer ljus och bättre utnyttjande av vinden.",
  },
  {
    icon: ShieldCheck,
    slug: "takinspektion",
    title: "Takinspektion",
    description: "Grundlig besiktning av ditt tak med kostnadsfri rapport och åtgärdsförslag.",
  },
  {
    icon: Ruler,
    slug: "platarbeten",
    title: "Plåtarbeten",
    description: "Taktäckning, beslag och plåtdetaljer utförda av certifierade plåtslagare.",
  },
  {
    icon: Sparkles,
    slug: "takvard",
    title: "Takvård",
    description: "Professionell taktvätt och takmålning som förlänger livslängden och fräschar upp ditt tak.",
  },
  {
    icon: AlertTriangle,
    slug: "eternit-asbest",
    title: "Eternit & asbestsanering",
    description: "Säker rivning och sanering av eternit- och asbesttak enligt Arbetsmiljöverkets regler. Vi hanterar allt från sanering till nytt tak.",
  },
];

const Services = () => {
  return (
    <section id="tjanster" className="py-24 md:py-36 bg-background" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14 lg:mb-20">
          <div className="lg:col-span-8">
            <SectionHeading
              meta="Tjänster"
              index="01 / 04"
              id="services-heading"
              title={<>Allt inom tak — <em className="font-normal italic text-primary">från kust till skärgård</em></>}
              intro="Helhetslösningar för varje takprojekt längs Roslagens kustlinje och öar. Samma metodik, oavsett om huset står vid vägen eller bakom en båttur."
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href="#offert"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group"
            >
              Räkna på ditt projekt
              <span className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center transition-colors group-hover:bg-accent group-hover:text-primary-foreground group-hover:border-accent">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="border-t border-foreground/10">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={Math.min(i, 6) * 0.05}>
              <Link
                to={`/tjanster/${service.slug}`}
                className="group relative grid md:grid-cols-12 gap-4 md:gap-8 items-baseline py-7 md:py-9 border-b border-foreground/10 transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 inset-y-0 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-10"
                />
                <div className="md:col-span-1 flex items-center gap-3">
                  <span className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-muted-foreground group-hover:text-primary-foreground/60 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4 flex items-center gap-4 md:pl-2">
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary-foreground/15">
                    <service.icon className="w-5 h-5 text-primary transition-colors group-hover:text-primary-foreground" />
                  </span>
                  <h3 className="font-display text-2xl md:text-[1.75rem] tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="md:col-span-6 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-primary-foreground/75 md:pr-6">
                  {service.description}
                </p>
                <span className="md:col-span-1 md:justify-self-end inline-flex items-center text-primary transition-all group-hover:text-primary-foreground group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span>AMA-standard</span>
          <span className="w-8 h-px bg-foreground/15" aria-hidden="true" />
          <span>10 års garanti</span>
          <span className="w-8 h-px bg-foreground/15" aria-hidden="true" />
          <span>ROT-avdrag</span>
          <span className="w-8 h-px bg-foreground/15" aria-hidden="true" />
          <span>Fast pris</span>
        </div>
      </div>
    </section>
  );
};

export default Services;
