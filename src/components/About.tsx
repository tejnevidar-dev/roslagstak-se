import { CheckCircle, Anchor, Heart, ShieldCheck, Award, Zap } from "lucide-react";
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
  return (
    <section id="om-oss" className="py-20 md:py-28 bg-warm" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        {/* Intro */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Om RoslagsTak</p>
            <h2 id="about-heading" className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Ditt tak i trygga händer — från kust till ö
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                RoslagsTak har sina rötter i Norrtälje och Roslagens skärgård. Vi har lagt tak på hundratals hem 
                i hela Roslagen — på Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn och Ingmarsö, 
                liksom i Vaxholm, Norrtälje, Väddö och Rådmansö. Med en samlad 
                erfarenhet på över 70 år i organisationen har vi den kompetens som krävs för att leverera 
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

            <ul className="grid sm:grid-cols-2 gap-3 mt-8">
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
              <p className="font-display text-3xl">11</p>
              <p className="text-sm opacity-90">Öar & kuststäder</p>
            </div>
          </div>
        </div>

        {/* Core values */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Våra ledord</p>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            Fyra ledord som genomsyrar allt vi gör
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Alla i vår organisation arbetar under samma fyra ledord. De styr hur vi bemöter kunder, 
            planerar projekt och utför varje takläggning.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value) => (
            <div
              key={value.title}
              className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-display text-lg text-card-foreground mb-2">{value.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
