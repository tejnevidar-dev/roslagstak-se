import { ArrowRight, Anchor, ShieldCheck, Receipt, FileCheck2, Search } from "lucide-react";
import heroImg from "@/assets/hero-roof.jpg";

const trustChips = [
  { icon: ShieldCheck, label: "10 års garanti" },
  { icon: Receipt, label: "ROT-avdrag" },
  { icon: FileCheck2, label: "F-skatt & försäkring" },
  { icon: Search, label: "Kostnadsfri besiktning" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center" aria-label="Huvudsektion">
      <img
        src={heroImg}
        alt="Svenskt hus med nylagt tak längs Roslagens kustlinje"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-accent/50 backdrop-blur-sm px-4 py-2 text-primary-foreground text-xs sm:text-sm font-semibold uppercase tracking-widest">
            <Anchor className="w-4 h-4 text-primary" />
            Skärgårdens takläggare — från Norrtälje till yttersta skärgården
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-tight text-balance drop-shadow-lg">
            Takläggare i Roslagen — takbyte & takrenovering
          </h1>

          <p className="text-lg text-primary-foreground/90 max-w-xl leading-relaxed">
            Vi lägger tak på Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn, Ingmarsö, Vaxholm, 
            Norrtälje och fler platser i Roslagens skärgård. Kostnadsfri offert.
          </p>

          <ul className="flex flex-wrap gap-2 pt-1">
            {trustChips.map((chip) => (
              <li
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm px-3.5 py-1.5 text-sm font-medium text-primary-foreground"
              >
                <chip.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                {chip.label}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#offert"
              className="inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-md text-base font-semibold shadow-lg hover:brightness-110 transition-all animate-subtle-pulse"
            >
              Konfigurera din offert
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#radgivning"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/40 bg-accent/30 backdrop-blur-sm text-primary-foreground px-8 py-4 rounded-md text-base font-semibold hover:bg-primary-foreground/10 transition-colors hover:animate-subtle-pulse"
            >
              Kostnadsfri rådgivning
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
