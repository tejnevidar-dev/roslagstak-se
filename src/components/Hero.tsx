import { ArrowRight, Phone } from "lucide-react";
import heroImg from "@/assets/hero-roof.jpg";

const orter = ["Blidö", "Ljusterö", "Vaxholm", "Norrtälje"];

const Hero = () => {
  return (
    <section className="bg-background pt-16 md:pt-20" aria-label="Huvudsektion">
      <div className="grid lg:grid-cols-12 min-h-[640px] lg:min-h-[760px]">
        <div className="lg:col-span-7 px-6 py-14 lg:px-20 lg:py-24 flex flex-col justify-center relative z-10">
          <ul className="flex flex-wrap gap-2 mb-8 lg:mb-10">
            {orter.map((ort) => (
              <li
                key={ort}
                className="px-4 py-1.5 bg-card border border-border text-accent text-[11px] font-bold uppercase tracking-widest rounded-full shadow-sm"
              >
                {ort}
              </li>
            ))}
          </ul>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] lg:leading-[0.9] text-accent text-balance mb-6 lg:mb-8">
            Takläggare i Roslagen — <span className="text-primary">takbyte</span> &amp; renovering
          </h1>

          <p className="text-lg text-accent/70 max-w-lg leading-relaxed mb-10 lg:mb-12">
            Vi skyddar ditt hem mot skärgårdens tuffaste väderförhållanden — med rätt material,
            erfarna takläggare och 10 års garanti på arbetet.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <a
              href="#offert"
              className="inline-flex items-center justify-center gap-2 px-8 lg:px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-elevated transition-transform hover:scale-[1.02] active:scale-95 animate-subtle-pulse"
            >
              Konfigurera din offert
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#radgivning"
              className="inline-flex items-center justify-center px-8 lg:px-10 py-5 bg-card border border-border text-accent font-bold rounded-2xl hover:bg-secondary transition-colors hover:animate-subtle-pulse"
            >
              Kostnadsfri rådgivning
            </a>
          </div>

          <a href="tel:0701543639" className="mt-12 lg:mt-16 inline-flex items-center gap-4 w-fit group">
            <span className="w-11 h-11 rounded-full bg-secondary border border-border flex items-center justify-center text-primary shrink-0">
              <Phone className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="text-sm text-left">
              <span className="block font-bold text-accent group-hover:text-primary transition-colors">070-154 36 39</span>
              <span className="block text-accent/50">Ring oss för snabb hjälp</span>
            </span>
          </a>
        </div>

        <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full overflow-hidden">
          <img
            src={heroImg}
            alt="Svenskt hus med nylagt tak längs Roslagens kustlinje"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-background via-transparent to-transparent" />
          <div className="absolute bottom-8 left-6 right-6 lg:left-auto lg:right-10 lg:max-w-sm bg-accent/90 backdrop-blur-xl p-6 rounded-3xl border border-primary-foreground/10 text-primary-foreground shadow-elevated">
            <p className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Referensprojekt</span>
            </p>
            <p className="text-sm font-medium leading-relaxed">
              Falsat plåttak på fritidshus i skärgården — komplett takbyte inklusive båttransport av material.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
