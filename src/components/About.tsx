import { CheckCircle } from "lucide-react";
import rooferImg from "@/assets/roofer-work.jpg";

const benefits = [
  "Certifierade och försäkrade takläggare",
  "Fast pris utan dolda kostnader",
  "10 års garanti på allt arbete",
  "Lokalt företag i Roslagen sedan 2004",
  "Kostnadsfri besiktning och offert",
  "Hjälp med ROT-avdrag",
];

const About = () => {
  return (
    <section id="om-oss" className="py-20 md:py-28 bg-warm" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Om Roslagstak</p>
            <h2 id="about-heading" className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Ditt tak i trygga händer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Roslagstak är ett familjeföretag med rötter i Norrtälje. Vi har lagt tak på hundratals hem i 
              Roslagen — från sommarställen i skärgården till villor i Täby och Vallentuna. Vårt löfte är 
              enkelt: kvalitet, pålitlighet och ett resultat som håller i årtionden.
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
              alt="Professionell takläggare arbetar på tegeltak i Roslagen"
              width={800}
              height={600}
              loading="lazy"
              className="rounded-lg shadow-xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg hidden md:block">
              <p className="font-display text-3xl">20+</p>
              <p className="text-sm opacity-90">Års erfarenhet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
