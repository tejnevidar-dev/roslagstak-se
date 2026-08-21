import { Link } from "react-router-dom";
import { ArrowUpRight, Phone, Home, Wrench, Droplets, Sun, ShieldCheck, Ruler, Sparkles, AlertTriangle } from "lucide-react";
import Reveal from "@/components/Reveal";
import roofProject from "@/assets/roof-project.jpg";

export const services = [
  {
    icon: Home,
    slug: "takomlaggning",
    title: "Takomläggning",
    short: "Komplett takbyte",
    description:
      "Komplett byte av takmaterial med moderna lösningar. Allt arbete utförs enligt AMA-standard.",
  },
  {
    icon: Wrench,
    slug: "takrenovering",
    title: "Takrenovering",
    short: "Laga & förlänga",
    description:
      "Vi renoverar och förlänger livslängden på ditt befintliga tak — även på svåråtkomliga öar.",
  },
  {
    icon: Droplets,
    slug: "takavvattning",
    title: "Takavvattning",
    short: "Rännor & stuprör",
    description:
      "Installation och byte av hängrännor, stuprör och kompletta takavvattningssystem.",
  },
  {
    icon: Sun,
    slug: "takkupor",
    title: "Takkupor & fönster",
    short: "Ljus på vinden",
    description:
      "Montering av takkupor och takfönster för mer ljus och bättre utnyttjande av vinden.",
  },
  {
    icon: ShieldCheck,
    slug: "takinspektion",
    title: "Takinspektion",
    short: "Besiktning & rapport",
    description:
      "Grundlig besiktning av ditt tak med kostnadsfri rapport och åtgärdsförslag.",
  },
  {
    icon: Ruler,
    slug: "platarbeten",
    title: "Plåtarbeten",
    short: "Plåtslagare",
    description:
      "Taktäckning, beslag och plåtdetaljer utförda av certifierade plåtslagare.",
  },
  {
    icon: Sparkles,
    slug: "takvard",
    title: "Takvård",
    short: "Tvätt & målning",
    description:
      "Professionell taktvätt och takmålning som förlänger livslängden och fräschar upp ditt tak.",
  },
  {
    icon: AlertTriangle,
    slug: "eternit-asbest",
    title: "Eternit & asbestsanering",
    short: "Säker rivning",
    description:
      "Säker rivning och sanering av eternit- och asbesttak enligt Arbetsmiljöverkets regler. Vi hanterar allt från sanering till nytt tak.",
  },
];

const Services = () => {
  return (
    <section id="tjanster" className="bg-background py-20 lg:py-28" aria-labelledby="services-heading">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-16">
        {/* Sticky vänsterkolumn — rubrik, bild och CTA följer med i scrollen */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-primary">
              02 — Tjänster
            </p>
            <h2
              id="services-heading"
              className="mt-4 font-display text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.03] tracking-[-0.038em] text-foreground text-balance"
            >
              Allt inom tak — från kust till ytterskärgård
            </h2>
            <p className="mt-6 text-[18px] leading-relaxed text-muted-foreground">
              Vi hjälper dig hela vägen, oavsett om huset står vid vägen eller bakom en båttur.
            </p>

            <div className="mt-9 overflow-hidden rounded-3xl border border-border">
              <img
                src={roofProject}
                alt="Nylagt tak på hus i Roslagens skärgård"
                width={800}
                height={600}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href="/offert"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-4 text-[17px] font-bold text-primary-foreground transition-colors hover:bg-accent animate-subtle-pulse"
              >
                Räkna på ditt tak
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="tel:0701543639"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-border px-6 py-4 text-[17px] font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                070-154 36 39
              </a>
            </div>
          </div>
        </div>

        {/* Tjänstelista — hairline-rader i stället för kortrutnät */}
        <ul className="lg:col-span-8">
          {services.map((service, i) => (
            <li key={service.slug} className="border-t border-border last:border-b">
              <Reveal delay={Math.min(i, 5) * 0.04}>
                <Link
                  to={`/tjanster/${service.slug}`}
                  className="group relative flex flex-col gap-4 overflow-hidden py-8 md:flex-row md:items-baseline md:gap-8 md:py-9"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0 bg-secondary/60 transition-[width] duration-500 ease-out group-hover:w-full"
                  />
                  <span className="relative w-16 shrink-0 text-[12px] font-bold tabular-nums tracking-[0.2em] text-muted-foreground/70 md:pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative md:w-[15rem] md:shrink-0">
                    <span className="flex items-center gap-3">
                      <service.icon className="h-5 w-5 text-primary md:hidden" aria-hidden="true" />
                      <span className="block font-display text-[clamp(1.4rem,2vw,1.85rem)] font-bold leading-tight tracking-[-0.028em] text-foreground transition-colors group-hover:text-primary">
                        {service.title}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[13px] font-semibold uppercase tracking-[0.16em] text-accent">
                      {service.short}
                    </span>
                  </span>
                  <span className="relative flex-1 text-[17px] leading-relaxed text-muted-foreground">
                    {service.description}
                  </span>
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
