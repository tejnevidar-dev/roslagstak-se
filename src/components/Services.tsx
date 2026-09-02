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
    <section id="tjanster" className="bg-card py-24 lg:py-32" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-6">
        {/* Förskjuten rubrikkomposition */}
        <div className="mb-16 grid grid-cols-12 items-end gap-8 lg:mb-20">
          <div className="col-span-12 lg:col-span-6">
            <h2
              id="services-heading"
              className="font-display text-[clamp(2rem,3.8vw,3.1rem)] font-bold leading-[1.12] text-foreground"
            >
              Vi bygger för kustklimatets{" "}
              <span className="text-accent">tuffaste utmaningar.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="text-[18px] font-light leading-relaxed text-muted-foreground">
              Från minsta sjöstuga till större fastigheter — traditionellt hantverk kombinerat
              med material valt för väderutsatta lägen i Roslagen.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/offert"
                className="inline-flex items-center justify-center gap-3 border-b-4 border-accent bg-primary px-7 py-4 text-[17px] font-semibold text-primary-foreground transition-colors hover:bg-marine animate-subtle-pulse"
              >
                Räkna på ditt tak
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="tel:0701543639"
                className="inline-flex items-center justify-center gap-2.5 border-2 border-primary/15 px-6 py-4 text-[17px] font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <Phone className="h-5 w-5 text-accent" aria-hidden="true" />
                070-154 36 39
              </a>
            </div>
          </div>
        </div>

        {/* Förskjutna tjänsteblock — varannan spalt nedskjuten */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <li key={service.slug} className={i % 2 === 1 ? "lg:mt-14" : undefined}>
              <Reveal delay={Math.min(i, 5) * 0.04}>
                <Link
                  to={`/tjanster/${service.slug}`}
                  className="group flex h-full flex-col bg-background p-10 transition-colors duration-300 hover:bg-marine hover:text-marine-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="mb-8 block h-1 w-10 bg-seafoam transition-all duration-500 group-hover:w-full"
                  />
                  <service.icon
                    className="mb-6 h-6 w-6 text-accent transition-colors group-hover:text-seafoam"
                    aria-hidden="true"
                  />
                  <span className="font-display text-[1.35rem] font-bold leading-snug">
                    {service.title}
                  </span>
                  <span className="mt-4 block flex-1 text-[15px] font-light leading-relaxed opacity-70">
                    {service.description}
                  </span>
                  <span className="mt-8 inline-flex items-center gap-2 font-display text-[15px] italic text-accent transition-colors group-hover:text-seafoam">
                    Läs mer <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Full-bredds referensbild som sektionsavskiljare */}
        <figure className="relative m-0 mt-20 overflow-hidden">
          <img
            src={roofProject}
            alt="Nylagt tak på hus i Roslagens skärgård"
            width={1600}
            height={600}
            loading="lazy"
            className="aspect-[16/6] w-full object-cover"
          />
          <figcaption className="absolute bottom-0 left-0 bg-primary px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-seafoam">
            Referens — falsat plåttak, Roslagens kust
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Services;

