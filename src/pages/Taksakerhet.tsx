import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone, Star, Shield, Award, MapPin, AlertTriangle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locations } from "@/data/locations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Vad är taksäkerhet och varför behövs det?",
    answer:
      "Taksäkerhet är ett samlingsbegrepp för produkter som skyddar både personer som arbetar på taket (sotare, takläggare, antennmontörer) och människor som vistas under taket (skydd mot snöras). Enligt Boverkets byggregler (BBR) och Plan- och bygglagen är fastighetsägaren ansvarig för att taksäkerheten är godkänd och fungerande. Saknas eller är taksäkerheten i dåligt skick kan ägaren bli ersättningsskyldig vid olycka.",
  },
  {
    question: "Vad ingår i taksäkerhet?",
    answer:
      "Komplett taksäkerhet består av flera komponenter: takstege (för åtkomst från fasaden), gångbrygga (för säker rörelse på taket), nockräcke (skydd mot fall från takets högsta punkt), snörasskydd (skydd mot snö och is som rasar ned), glidskydd för stege samt fästöglor för säkerhetslina. Vi monterar allt enligt Boverkets BBR och SS-EN 516/517.",
  },
  {
    question: "Vad kostar taksäkerhet för en villa?",
    answer:
      "Komplett taksäkerhet för en normalvilla kostar mellan 25 000 och 60 000 kr beroende på takets längd, lutning och vilka produkter som behövs. Snörasskydd kostar från ca 800 kr/löpmeter, gångbrygga från ca 1 500 kr/löpmeter, takstege från ca 4 500 kr och nockräcke från ca 1 200 kr/löpmeter. ROT-avdrag ger 30% rabatt på arbetskostnaden.",
  },
  {
    question: "När är snörasskydd lagstadgat?",
    answer:
      "Snörasskydd krävs på alla tak med taklutning över 12° där snö kan rasa ned över allmän plats — entré, trottoar, gångväg, lekplats eller parkering. Det är fastighetsägarens ansvar och försummelse kan leda till skadeståndsansvar och böter. I Roslagen med rikligt med snö under vintern är snörasskydd nästan alltid nödvändigt.",
  },
  {
    question: "Hur ofta ska taksäkerheten kontrolleras?",
    answer:
      "Vi rekommenderar besiktning av taksäkerheten vart 5:e år, samt vid alla takbyten och takrenoveringar. Sotaren har också rätt att vägra utföra arbete om taksäkerheten är bristfällig — då måste du åtgärda innan nästa sotning. Vi erbjuder kostnadsfri besiktning av befintlig taksäkerhet.",
  },
  {
    question: "Behöver jag nya snörasskydd vid takbyte?",
    answer:
      "Ja, vid takbyte ska all taksäkerhet kontrolleras och oftast bytas ut. Gamla snörasskydd är ofta rostiga eller har lossnat från det gamla taket. Vid montering på nytt tak krävs nya infästningar som passar takmaterialet. Vi inkluderar alltid ny taksäkerhet i våra offerter på takbyten.",
  },
  {
    question: "Kan jag använda ROT-avdrag på taksäkerhet?",
    answer:
      "Ja, ROT-avdrag gäller för installation av taksäkerhet på din egen bostad eller fritidshus. Du får 30% skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi sköter all administration på fakturan.",
  },
  {
    question: "Vilka produkter använder ni?",
    answer:
      "Vi monterar taksäkerhet från etablerade svenska tillverkare som CW Lundberg, Weland Stål och Lindab — alla godkända enligt SS-EN 516 och 517. Materialet är varmförzinkat eller pulverlackerat stål för långsiktig korrosionsbeständighet i Roslagens kustklimat. Färg och utförande anpassas efter taket.",
  },
];

const Taksakerhet = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Taksäkerhet Roslagen",
    description:
      "Montering av taksäkerhet i Roslagen — snörasskydd, takstege, gångbrygga och nockräcke. Godkänt enligt Boverkets BBR. ROT-avdrag och 10 års garanti.",
    url: "https://roslagstak.se/taksakerhet",
    provider: {
      "@type": "RoofingContractor",
      name: "RoslagsTak",
      url: "https://roslagstak.se",
      telephone: "+46701543639",
      image: "https://roslagstak.se/og-image.jpg",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "153",
        reviewCount: "153",
      },
    },
    areaServed: { "@type": "Place", name: "Roslagen" },
    offers: {
      "@type": "Offer",
      priceCurrency: "SEK",
      description: "Snörasskydd från 800 kr/löpmeter. Takstege från 4 500 kr. ROT-avdrag tillkommer.",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Taksäkerhet", item: "https://roslagstak.se/taksakerhet" },
    ],
  };

  const products = [
    { name: "Snörasskydd", price: "från 800 kr/löpmeter", desc: "Lagstadgat skydd mot snö- och israss där tak vetter mot allmän plats. Olika modeller för plåttak, tegel och betongpannor." },
    { name: "Takstege", price: "från 4 500 kr", desc: "Säker åtkomst till taket från fasaden. Krav från sotare och vid arbete på tak. Levereras i 1,5–6 m längder." },
    { name: "Gångbrygga", price: "från 1 500 kr/löpmeter", desc: "Säker gångväg på taket för sotare, antennarbeten och inspektion. Halksäker yta i varmförzinkat stål." },
    { name: "Nockräcke", price: "från 1 200 kr/löpmeter", desc: "Skydd mot fall vid takets högsta punkt. Krav vid arbete på branta tak (>18°)." },
    { name: "Glidskydd för stege", price: "från 1 800 kr", desc: "Förankring för portabel stege — krav vid arbete på taket enligt Arbetsmiljöverket." },
    { name: "Säkerhetsöglor & lina", price: "från 600 kr/st", desc: "Fästpunkter för personlig fallskyddsutrustning. Monteras i bärande konstruktion." },
  ];

  return (
    <>
      <SEOHead
        title="Taksäkerhet Roslagen — Snörasskydd, Takstege & Gångbrygga | RoslagsTak"
        description="Montering av taksäkerhet i Roslagen och skärgården. Snörasskydd från 800 kr/löpmeter, takstege från 4 500 kr. Godkänt enligt BBR. ROT-avdrag och 10 års garanti."
        canonical="https://roslagstak.se/taksakerhet"
      />
      <Header />
      <main className="pt-32 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Taksäkerhet</span>
          </nav>

          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Shield className="w-3 h-3" /> Taksäkerhet & snörasskydd
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Taksäkerhet i Roslagen — snörasskydd, takstegar & gångbryggor
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              RoslagsTak monterar komplett taksäkerhet i hela Roslagen och skärgården enligt Boverkets byggregler (BBR) och svensk standard SS-EN 516/517. Som fastighetsägare är du juridiskt ansvarig för att taksäkerheten är godkänd — vi hjälper dig hela vägen från besiktning till montering.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">{[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
              <span className="text-sm text-muted-foreground">4.9 av 5 — 153 kundrecensioner</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Shield className="w-4 h-4 text-primary" /> Godkänt enligt BBR</div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Award className="w-4 h-4 text-primary" /> Svenska kvalitetsmärken</div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-primary" /> 10 års garanti</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/#offert" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors">
                Få offert på taksäkerhet <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+46701543639" className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" /> Ring 070-154 36 39
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-display text-xl text-foreground mb-2">Du är ansvarig som fastighetsägare</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Enligt Plan- och bygglagen och Boverkets BBR är fastighetsägaren ansvarig för att taksäkerheten är godkänd och fungerande. Saknas snörasskydd där det krävs — eller är produkterna i dåligt skick — kan du bli ersättningsskyldig vid olycka. Sotaren har dessutom rätt att vägra utföra arbete vid bristfällig taksäkerhet.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Våra taksäkerhetsprodukter</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <div key={p.name} className="bg-card border border-border rounded-lg p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{p.name}</h3>
                        <span className="text-xs font-semibold text-primary whitespace-nowrap">{p.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">* Riktpriser inkl. material och montering. ROT-avdrag tillkommer.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Så går monteringen till</h2>
                <ol className="space-y-3">
                  {[
                    "Kostnadsfri besiktning av befintlig taksäkerhet",
                    "Bedömning av krav enligt BBR och kommunens regler",
                    "Offert med fast pris och tydlig produktlista",
                    "Materialleverans till fastigheten",
                    "Montering av byggställning vid behov",
                    "Installation av takstege, gångbrygga och nockräcke",
                    "Montering av snörasskydd där det krävs",
                    "Slutkontroll och dokumentation med foton",
                    "Skriftligt garantibevis och underhållsschema",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground bg-card border border-border rounded-lg p-4">
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Räkneexempel</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2">Villa 150 m² (komplett paket)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Takstege + gångbrygga + snörasskydd + glidskydd: <strong className="text-foreground">ca 38 000 kr</strong>. Efter ROT-avdrag: <strong className="text-foreground">ca 32 000 kr</strong>.
                    </p>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2">Endast snörasskydd 12 m</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Snörasskydd för entré-/gatusida: <strong className="text-foreground">ca 12 500 kr</strong>. Efter ROT-avdrag: <strong className="text-foreground">ca 10 000 kr</strong>.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Vi monterar taksäkerhet i hela Roslagen</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vi monterar taksäkerhet i hela Roslagen — från Norrtälje och Vaxholm till skärgårdsöar som Blidö, Ljusterö och Husarö. Vi når din fastighet snabbt och samordnar gärna med pågående takarbeten.
                </p>
                <div className="flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <Link key={l.slug} to={`/taklaggare-${l.slug}`} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      <MapPin className="w-3 h-3" /> {l.isIsland ? "På" : "I"} {l.name}
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Vanliga frågor om taksäkerhet</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
                      <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">{f.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="bg-primary text-primary-foreground rounded-lg p-6 lg:sticky lg:top-36">
                <h3 className="font-display text-lg mb-2">Kostnadsfri besiktning</h3>
                <p className="text-sm opacity-90 mb-4">Vi besiktar din befintliga taksäkerhet utan kostnad och ger förslag på vad som behöver åtgärdas.</p>
                <Link to="/#offert" className="inline-flex items-center justify-center gap-2 bg-white text-primary w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors">
                  Boka besiktning <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+46701543639" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors mt-3">
                  <Phone className="w-4 h-4" /> 070-154 36 39
                </a>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">Vi monterar enligt</h3>
                <ul className="space-y-2">
                  {["Boverkets byggregler (BBR)", "SS-EN 516 (gångbryggor)", "SS-EN 517 (säkerhetshakar)", "Arbetsmiljöverkets föreskrifter", "Plan- och bygglagen", "10 års garanti på arbete"].map((u) => (
                    <li key={u} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> {u}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">Relaterat</h3>
                <div className="space-y-2">
                  <Link to="/takbyte" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Takbyte</Link>
                  <Link to="/takrenovering" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Takrenovering</Link>
                  <Link to="/taktvatt" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Taktvätt & takvård</Link>
                  <Link to="/tjanster/takinspektion" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Kostnadsfri takinspektion</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Taksakerhet;
