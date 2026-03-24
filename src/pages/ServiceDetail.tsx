import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/components/Services";

const serviceDetails: Record<string, { longDesc: string; benefits: string[]; process: string[] }> = {
  takomlaggning: {
    longDesc: "En takomläggning innebär att hela det befintliga takmaterialet rivs och ersätts med nytt. Vi inspekterar alltid underlaget (råspont) och byter ut skadat virke innan det nya materialet läggs. Vi hjälper dig välja mellan plåttak, tegelpannor, betongpannor eller papptak beroende på ditt hus, din budget och dina önskemål. Allt arbete utförs enligt AMA-standard av certifierade takläggare med 10 års garanti.",
    benefits: [
      "Komplett borttagning av gammalt takmaterial",
      "Inspektion och byte av skadat underlag",
      "Nytt takmaterial anpassat för din byggnad",
      "Installation av underlagspapp och ventilation",
      "Ny taksäkerhet (gångbrygga, takstege, snörasskydd)",
      "10 års garanti på arbete och material",
    ],
    process: [
      "Kostnadsfri besiktning och offert",
      "Materialval och planering",
      "Rivning av befintligt tak",
      "Inspektion och reparation av underlag",
      "Montering av nytt takmaterial",
      "Installation av taksäkerhet och avvattning",
      "Slutbesiktning och garantibevis",
    ],
  },
  takrenovering: {
    longDesc: "En takrenovering innebär att vi åtgärdar problem och förlänger livslängden på ditt befintliga tak utan att byta hela takmaterialet. Det kan handla om att byta enstaka trasiga pannor, laga läckor, byta underlagspapp, reparera plåtbeslag eller åtgärda röta i råsponten. Vi har erfarenhet av att renovera tak på öar med begränsad tillgänglighet och löser logistiken oavsett plats.",
    benefits: [
      "Lägre kostnad än komplett takomläggning",
      "Snabbare genomförande",
      "Förlänger befintligt taks livslängd",
      "Åtgärdar läckor och fuktskador",
      "Byte av enstaka pannor eller plåtsektioner",
      "Reparation av rötskadat virke",
    ],
    process: [
      "Besiktning och skadebedömning",
      "Offert med tydlig åtgärdslista",
      "Reparation av skadat underlag",
      "Byte av trasiga pannor/plåtsektioner",
      "Tätning och lagning av läckor",
      "Slutkontroll och dokumentation",
    ],
  },
  takavvattning: {
    longDesc: "Ett fungerande takavvattningssystem är avgörande för att skydda husets fasad, grund och konstruktion. Vi installerar och byter hängrännor, stuprör, ränndalar och plåtbeslag i aluminium, koppar eller lackerad plåt. Vi dimensionerar systemet efter takets storlek och lutning för optimal vattenavrinning.",
    benefits: [
      "Skyddar fasad och grund mot vattenskador",
      "Hängrännor i aluminium, koppar eller lackerad plåt",
      "Stuprör med korrekt dimensionering",
      "Lövinsamlare och galler vid behov",
      "Material som tål saltstänkt havsmiljö",
      "Prydligt och hållbart resultat",
    ],
    process: [
      "Besiktning av befintligt system",
      "Dimensionering och materialval",
      "Demontering av gammalt system",
      "Montering av nya hängrännor",
      "Installation av stuprör och anslutningar",
      "Funktionskontroll",
    ],
  },
  takkupor: {
    longDesc: "Takkupor och takfönster är ett utmärkt sätt att utnyttja vindsutrymmet och släppa in mer ljus. Vi bygger nya takkupor och monterar takfönster (t.ex. Velux) med korrekt vattenavledning och isolering. I skärgårdshusen är det vanligt att vindsplanet är oinrett — med en eller flera takkupor kan du skapa sovrum, kontor eller hobbyrum med havsutsikt.",
    benefits: [
      "Mer dagsljus på vindsvåningen",
      "Ökat boendeyta och husvärde",
      "Bättre ventilation",
      "Karaktär och charm till huset",
      "Korrekt vattenavledning runt kupa/fönster",
      "Energieffektiva takfönster",
    ],
    process: [
      "Platsbesök och planering",
      "Bygglovsansökan vid behov",
      "Konstruktionsberäkning",
      "Uppbyggnad av takkupa/fönsteröppning",
      "Taktäckning och plåtarbete",
      "Isolering och invändig finishing",
    ],
  },
  takinspektion: {
    longDesc: "En regelbunden takinspektion förebygger dyra skador. Vi utför grundliga besiktningar där vi kontrollerar takmaterialets skick, underlagspapp, råspont, taksäkerhet, avvattningssystem och ventilation. Du får en skriftlig rapport med foton och tydliga åtgärdsförslag. Vår inspektion är helt kostnadsfri och utan förbindelser.",
    benefits: [
      "Helt kostnadsfri och utan förbindelser",
      "Skriftlig rapport med foton",
      "Identifierar problem innan de blir dyra",
      "Kontrollerar takmaterial, underlag och ventilation",
      "Bedömer återstående livslängd",
      "Tydliga åtgärdsförslag med prisuppskattning",
    ],
    process: [
      "Boka besiktning (telefon eller formulär)",
      "Vi besöker din fastighet",
      "Grundlig inspektion av tak, underlag och avvattning",
      "Fotografering och dokumentation",
      "Skriftlig rapport skickas till dig",
      "Genomgång av resultat och rekommendationer",
    ],
  },
  platarbeten: {
    longDesc: "Plåtarbeten är en central del av alla takprojekt. Vi utför allt från taktäckning med profilerad plåt och bandtäckning till beslag runt skorstenar, ventilationsgenomföringar, takfönster och ränndalar. Våra plåtslagare är certifierade och har lång erfarenhet av att arbeta med både stål, aluminium, koppar och zink. I havsmiljöer rekommenderar vi aluminium framför galvad stålplåt för bättre korrosionsbeständighet.",
    benefits: [
      "Certifierade plåtslagare",
      "Taktäckning med alla typer av plåt",
      "Beslag runt skorstenar och genomföringar",
      "Ränndalar och vindskivor i plåt",
      "Material anpassat för kustklimat",
      "Koppar, zink, aluminium och stål",
    ],
    process: [
      "Besiktning och uppmätning",
      "Materialval och färgval",
      "Tillverkning av specialbeslag",
      "Montering och falsning",
      "Täthetskontroll",
      "Slutbesiktning",
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);
  const details = slug ? serviceDetails[slug] : null;

  if (!service || !details) {
    return (
      <>
        <Header />
        <main className="py-32 text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Tjänsten hittades inte</h1>
          <Link to="/" className="text-primary underline">Tillbaka till startsidan</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span>/</span>
            <Link to="/#tjanster" className="hover:text-primary transition-colors">Tjänster</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{service.title}</span>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                {service.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>

            {/* Long description */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-foreground leading-relaxed">{details.longDesc}</p>
            </div>

            {/* Benefits & Process */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-display text-xl text-card-foreground mb-4">Vad ingår</h2>
                <ul className="space-y-3">
                  {details.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="font-display text-xl text-card-foreground mb-4">Så här går det till</h2>
                <ol className="space-y-3">
                  {details.process.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-accent rounded-lg p-8 text-center">
              <h2 className="font-display text-2xl text-accent-foreground mb-2">
                Intresserad av {service.title.toLowerCase()}?
              </h2>
              <p className="text-accent-foreground/70 text-sm mb-6">
                Kontakta oss för en kostnadsfri besiktning och offert.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/#offert"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Få offert <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/#radgivning"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Kostnadsfri rådgivning
                </Link>
              </div>
            </div>

            {/* Back */}
            <div className="mt-8">
              <Link to="/#tjanster" className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" />
                Tillbaka till alla tjänster
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetail;
