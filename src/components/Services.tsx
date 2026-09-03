import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import roofProject from "@/assets/roof-project.jpg";
import {
  IconRoofNew,
  IconRoofRepair,
  IconGutter,
  IconDormer,
  IconInspection,
  IconSheetMetal,
  IconRoofCare,
  IconAsbestos,
} from "@/components/icons/RoofIcons";

export const services = [
  {
    icon: IconRoofNew,
    slug: "takomlaggning",
    title: "Takomläggning",
    short: "Komplett takbyte",
    description:
      "Komplett byte av takmaterial med moderna lösningar. Allt arbete utförs enligt AMA-standard.",
  },
  {
    icon: IconRoofRepair,
    slug: "takrenovering",
    title: "Takrenovering",
    short: "Laga & förlänga",
    description:
      "Vi renoverar och förlänger livslängden på ditt befintliga tak — även på svåråtkomliga öar.",
  },
  {
    icon: IconGutter,
    slug: "takavvattning",
    title: "Takavvattning",
    short: "Rännor & stuprör",
    description:
      "Installation och byte av hängrännor, stuprör och kompletta takavvattningssystem.",
  },
  {
    icon: IconDormer,
    slug: "takkupor",
    title: "Takkupor & fönster",
    short: "Ljus på vinden",
    description:
      "Montering av takkupor och takfönster för mer ljus och bättre utnyttjande av vinden.",
  },
  {
    icon: IconInspection,
    slug: "takinspektion",
    title: "Takinspektion",
    short: "Besiktning & rapport",
    description:
      "Grundlig besiktning av ditt tak med kostnadsfri rapport och åtgärdsförslag.",
  },
  {
    icon: IconSheetMetal,
    slug: "platarbeten",
    title: "Plåtarbeten",
    short: "Plåtslagare",
    description:
      "Taktäckning, beslag och plåtdetaljer utförda av certifierade plåtslagare.",
  },
  {
    icon: IconRoofCare,
    slug: "takvard",
    title: "Takvård",
    short: "Tvätt & målning",
    description:
      "Professionell taktvätt och takmålning som förlänger livslängden och fräschar upp ditt tak.",
  },
  {
    icon: IconAsbestos,
    slug: "eternit-asbest",
    title: "Eternit & asbestsanering",
    short: "Säker rivning",
    description:
      "Säker rivning och sanering av eternit- och asbesttak enligt Arbetsmiljöverkets regler. Vi hanterar allt från sanering till nytt tak.",
  },
];

const Services = () => {
  return (
    <section id="tjanster" className="bg-card pt-20 lg:pt-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-6">
        {/* Förskjuten rubrikkomposition */}
        <div className="mb-14 grid grid-cols-12 items-end gap-x-8 gap-y-10 lg:mb-18">
          <div className="col-span-12 lg:col-span-6">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-accent"><span aria-hidden="true" className="h-px w-12 bg-accent/50" />Våra tjänster</p>
            <h2
              id="services-heading"
              className="max-w-[24ch] font-display text-[clamp(1.95rem,3.4vw,2.9rem)] font-bold leading-[1.14] tracking-[-0.02em] text-foreground"
            >
              Vi bygger för kustklimatets{" "}
              <span className="text-accent">tuffaste utmaningar.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="max-w-[46ch] text-[17px] font-light leading-[1.68] text-muted-foreground">
              Från minsta sjöstuga till större fastigheter — traditionellt hantverk kombinerat
              med material valt för väderutsatta lägen i Roslagen.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/offert"
                className="inline-flex items-center justify-center gap-3 border-b-4 border-accent bg-primary px-7 py-4 text-[17px] font-semibold text-primary-foreground transition-colors duration-500 hover:bg-marine animate-subtle-pulse"
              >
                Räkna på ditt tak
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="tel:0701543639"
                className="inline-flex items-center justify-center gap-2.5 border-2 border-primary/15 px-6 py-4 text-[17px] font-semibold text-foreground transition-colors duration-500 hover:bg-secondary"
              >
                <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
                070-154 36 39
              </a>
            </div>
          </div>
        </div>

        {/* Fast rutnät med hårstreck — gemensam baslinje för alla kort */}
        <ul className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <li
              key={service.slug}
              className="border-b border-r border-border"
            >
              <Reveal delay={Math.min(i, 5) * 0.05}>
                <Link
                  to={`/tjanster/${service.slug}`}
                  className="group relative flex h-full min-h-[19rem] flex-col p-8 transition-colors duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-secondary/70 lg:p-9"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] w-0 bg-accent transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                  />
                  <service.icon
                    className="h-9 w-9 text-accent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                  <span className="mt-7 block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} — {service.short}
                  </span>
                  <h3 className="mt-3 font-display text-[1.28rem] font-bold leading-[1.28] tracking-[-0.015em] text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[15.5px] font-light leading-[1.62] text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
                    Läs mer
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-bredds referensbild som sektionsavskiljare mot nästa mörka paus */}
      <figure className="relative m-0 mt-24 overflow-hidden">
        <img
          src={roofProject}
          alt="Nylagt falsat plåttak på hus i Roslagens skärgård"
          width={1920}
          height={720}
          loading="lazy"
          decoding="async"
          className="aspect-[16/7] w-full object-cover md:aspect-[16/5]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent"
        />
        <figcaption className="absolute bottom-0 left-0 right-0 mx-auto flex max-w-7xl flex-wrap items-baseline gap-x-6 gap-y-1 px-6 pb-7 text-primary-foreground">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-seafoam">
            Referens
          </span>
          <span className="font-display text-[15px] italic">
            Falsat plåttak, Roslagens kust
          </span>
        </figcaption>
      </figure>
    </section>
  );
};

export default Services;
