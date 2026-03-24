import { CheckCircle, Anchor } from "lucide-react";
import rooferImg from "@/assets/roofer-work.jpg";

const benefits = [
  "Certifierade och försäkrade takläggare",
  "Fast pris utan dolda kostnader",
  "10 års garanti på allt arbete",
  "Verksamma i hela Roslagens skärgård",
  "Kostnadsfri besiktning och offert",
  "Hjälp med ROT-avdrag",
];

const About = () => {
  return (
    <section id="om-oss" className="py-20 md:py-28 bg-warm" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Om RoslagsTak</p>
            <h2 id="about-heading" className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Ditt tak i trygga händer — från kust till ö
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              RoslagsTak är ett familjeföretag med rötter i Norrtälje. Vi har lagt tak på hundratals hem längs 
              Roslagens kustlinje — från Vaxholm och Ljusterö till Singö, Grisslehamn och Arholma. Vi når alla öar 
              och kuststäder i Stockholms norra skärgård. Vårt löfte är enkelt: kvalitet, trygghet och ett tak som 
              håller i årtionden, oavsett hur nära havet du bor.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <img
              src={rooferImg}
              alt="Professionell takläggare arbetar på tak vid Roslagens kust"
              width={800}
              height={600}
              loading="lazy"
              className="rounded-lg shadow-xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg hidden md:block">
              <Anchor className="w-6 h-6 mb-1 opacity-80" />
              <p className="font-display text-3xl">100+</p>
              <p className="text-sm opacity-90">Öar & kuststäder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;