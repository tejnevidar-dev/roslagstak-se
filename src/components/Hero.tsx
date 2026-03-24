import { ArrowRight, Shield } from "lucide-react";
import heroImg from "@/assets/hero-roof.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center" aria-label="Huvudsektion">
      <img
        src={heroImg}
        alt="Svenskt hus med nylagt tak i Roslagen vid gyllene timmen"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            Certifierade takläggare i Roslagen
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight text-balance">
            Kvalitetstak som skyddar ditt hem i generationer
          </h1>

          <p className="text-lg text-white/80 max-w-xl leading-relaxed">
            Med över 20 års erfarenhet levererar vi takläggning, takrenovering och takbyte i hela Roslagen. 
            Alltid med garanti och till fast pris.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md text-base font-semibold hover:bg-primary/90 transition-colors"
            >
              Begär offert
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#tjanster"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-md text-base font-semibold hover:bg-white/10 transition-colors"
            >
              Våra tjänster
            </a>
          </div>

          <div className="flex items-center gap-8 pt-6 text-white/70 text-sm">
            <div><span className="text-white font-bold text-2xl font-display">500+</span><br />Nöjda kunder</div>
            <div className="w-px h-10 bg-white/20" />
            <div><span className="text-white font-bold text-2xl font-display">20+</span><br />Års erfarenhet</div>
            <div className="w-px h-10 bg-white/20" />
            <div><span className="text-white font-bold text-2xl font-display">10</span><br />Års garanti</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
