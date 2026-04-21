import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone, Star, Shield, Award, Wrench, MapPin } from "lucide-react";
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
    question: "Vad är skillnaden mellan takrenovering och takbyte?",
    answer:
      "Takbyte innebär att hela det befintliga takmaterialet rivs och ersätts med nytt. Takrenovering innebär att vi åtgärdar specifika problem — byter trasiga pannor, lagar läckor, byter underlagspapp eller reparerar plåtbeslag — utan att byta hela taket. Renovering är ofta hälften så dyrt och kan förlänga takets livslängd 15–20 år.",
  },
  {
    question: "Hur vet jag om jag behöver renovera eller byta taket?",
    answer:
      "Vi rekommenderar att börja med en kostnadsfri takinspektion. Vi bedömer takmaterialets skick, underlagets kondition, eventuella läckor och takets återstående livslängd. Om mer än 30% av materialet är skadat brukar takbyte vara mer ekonomiskt. Vid mindre skador räcker oftast en renovering.",
  },
  {
    question: "Vad kostar en takrenovering?",
    answer:
      "Priset varierar mellan 300 och 1 000 kr/m² beroende på åtgärdens omfattning. Byte av enstaka pannor och tätning av läckor från ca 5 000 kr. Byte av underlagspapp på halva taket ca 600 kr/m². Lagning av rötskador ca 800–1 200 kr/m² inkl. nytt material. Vi lämnar alltid fast pris efter besiktning.",
  },
  {
    question: "Hur lång tid tar en takrenovering?",
    answer:
      "Mindre reparationer (enstaka pannor, läckor, beslag) tar 1–2 dagar. Byte av underlagspapp på halva taket tar 3–5 dagar. Större renoveringar med rötskador kan ta 1–2 veckor. Du får alltid en tidplan i offerten.",
  },
  {
    question: "Kan ROT-avdrag användas för takrenovering?",
    answer:
      "Ja, ROT-avdrag gäller för all takrenovering. Du får 30% skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi sköter administrationen och drar av direkt på fakturan.",
  },
  {
    question: "Vad ingår i en takrenovering?",
    answer:
      "Det beror på åtgärden, men typiskt ingår: besiktning, rivning av skadat material, byte av underlagspapp och rötskadat virke, tätning av läckor, byte av enstaka pannor eller plåtsektioner, reparation av plåtbeslag runt skorstenar och genomföringar, samt slutkontroll. Allt med 10 års garanti.",
  },
  {
    question: "Erbjuder ni garanti på takrenovering?",
    answer:
      "Ja, vi lämnar 10 års garanti på allt arbete och nya material. Renoveringen utförs enligt AMA Hus — branschstandarden i Sverige. Du får skriftligt garantibevis efter slutbesiktning.",
  },
  {
    question: "Kan ni renovera tak i skärgården?",
    answer:
      "Absolut. Vi har stor erfarenhet av takarbeten på öar i Roslagens skärgård och hanterar all logistik — materialtransport med båt, planering kring väder och samordning med ön. Många öhus behöver renovering snarare än byte, vilket håller kostnaderna nere.",
  },
];

const Takrenovering = () => {
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
    name: "Takrenovering Roslagen",
    description:
      "Takrenovering och takreparation i Roslagen och skärgården. Byte av pannor, lagning av läckor, ny underlagspapp. ROT-avdrag och 10 års garanti.",
    url: "https://roslagstak.se/takrenovering",
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
      description: "Takrenovering från 300 kr/m² beroende på åtgärd. ROT-avdrag tillkommer.",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Takrenovering", item: "https://roslagstak.se/takrenovering" },
    ],
  };

  const services = [
    { name: "Byte av enstaka pannor", price: "från 5 000 kr", desc: "Trasiga betong- eller tegelpannor byts ut. Inkl. material och arbete." },
    { name: "Lagning av läckor", price: "från 4 500 kr", desc: "Tätning runt skorsten, takfönster, ventilationshuvar och beslag." },
    { name: "Ny underlagspapp", price: "från 600 kr/m²", desc: "Byte av åldrad underlagspapp där takmaterialet behålls. Förlänger livslängden 15–20 år." },
    { name: "Reparation av rötskador", price: "från 800 kr/m²", desc: "Byte av rötskadad råspont och virke. Vanligt vid läckage som inte upptäckts i tid." },
    { name: "Plåtbeslag & ränndalar", price: "från 1 500 kr/löpmeter", desc: "Byte av rostiga eller skadade plåtbeslag. Aluminium, koppar eller lackerad plåt." },
    { name: "Skorstensrenovering", price: "från 8 000 kr", desc: "Inklädnad, beslag och tätning runt skorstenen — vanlig läckpunkt på äldre tak." },
  ];

  return (
    <>
      <SEOHead
        title="Takrenovering Roslagen — Byte av pannor & lagning av läckor | RoslagsTak"
        description="Takrenovering i Roslagen och skärgården. Byte av pannor, lagning av läckor och ny underlagspapp. Från 300 kr/m². ROT-avdrag och 10 års garanti. Kostnadsfri besiktning."
        canonical="https://roslagstak.se/takrenovering"
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
            <span className="text-foreground font-medium">Takrenovering</span>
          </nav>

          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Wrench className="w-3 h-3" /> Takrenovering & reparation
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Takrenovering i Roslagen — förläng takets livslängd 15–20 år
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Inte alla tak behöver bytas. RoslagsTak utför takrenovering i hela Roslagen och skärgården — från byte av enstaka pannor och lagning av läckor till komplett byte av underlagspapp. Ofta hälften så dyrt som takbyte och förlänger takets livslängd avsevärt. Fast pris, 10 års garanti och ROT-avdrag.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">{[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
              <span className="text-sm text-muted-foreground">4.9 av 5 — 153 kundrecensioner</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Shield className="w-4 h-4 text-primary" /> 10 års garanti</div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Award className="w-4 h-4 text-primary" /> Ärlig bedömning</div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-primary" /> Kostnadsfri besiktning</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/#offert" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors">
                Få offert på takrenovering <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+46701543639" className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" /> Ring 070-154 36 39
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Renovering eller takbyte? Vi hjälper dig välja</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Många takläggare rekommenderar takbyte även när det inte behövs. Vi gör tvärtom — vi börjar alltid med en kostnadsfri besiktning och ger en ärlig bedömning. Är taket i grunden friskt men med några skador räcker oftast en renovering. Är mer än 30% av materialet uttjänt eller råsponten genomgående rötskadad är ett komplett takbyte mer ekonomiskt på sikt.
                  </p>
                  <p>
                    En takrenovering kan förlänga ditt taks livslängd med 15–20 år, ofta för hälften av priset jämfört med ett komplett takbyte. Det är ett miljövänligt val som sparar både pengar och resurser.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Vanliga renoveringsåtgärder</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((s) => (
                    <div key={s.name} className="bg-card border border-border rounded-lg p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{s.name}</h3>
                        <span className="text-xs font-semibold text-primary whitespace-nowrap">{s.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">* Riktpriser. Slutpris efter besiktning. ROT-avdrag tillkommer.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Så går renoveringen till</h2>
                <ol className="space-y-3">
                  {[
                    "Kostnadsfri besiktning och skadebedömning",
                    "Skriftlig offert med tydlig åtgärdslista",
                    "Materialleverans och förberedelser",
                    "Reparation av skadat underlag och råspont",
                    "Byte av trasiga pannor eller plåtsektioner",
                    "Tätning och lagning av läckor",
                    "Slutkontroll, dokumentation och garantibevis",
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
                    <h3 className="font-semibold text-foreground mb-2">Villa 150 m² — ny underlagspapp</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Byte av underlagspapp + återmontering av befintliga pannor: <strong className="text-foreground">ca 95 000 kr</strong>. Efter ROT-avdrag: <strong className="text-foreground">ca 80 000 kr</strong>. Hälften av kostnaden för komplett takbyte.
                    </p>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2">Lagning av läcka + 20 pannor</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tätning runt skorsten + byte av 20 trasiga pannor: <strong className="text-foreground">ca 14 000 kr</strong>. Efter ROT-avdrag: <strong className="text-foreground">ca 11 500 kr</strong>.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Takrenovering i hela Roslagen</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vi utför takrenovering i hela Roslagen och skärgården. Klicka på din ort för lokal information:
                </p>
                <div className="flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <Link key={l.slug} to={`/takrenovering-${l.slug}`} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      <MapPin className="w-3 h-3" /> Takrenovering {l.isIsland ? "på" : "i"} {l.name}
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Vanliga frågor om takrenovering</h2>
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
                <p className="text-sm opacity-90 mb-4">Vi besiktar ditt tak utan kostnad och ger en ärlig rekommendation — renovering eller byte.</p>
                <Link to="/#offert" className="inline-flex items-center justify-center gap-2 bg-white text-primary w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors">
                  Boka besiktning <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+46701543639" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors mt-3">
                  <Phone className="w-4 h-4" /> 070-154 36 39
                </a>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">Vanliga tecken på behov</h3>
                <ul className="space-y-2">
                  {["Mossa eller alger på taket", "Trasiga eller saknade pannor", "Vattenfläckar i innertak", "Rost på plåtbeslag", "Lös eller skadad underlagspapp", "Läckage runt skorsten"].map((u) => (
                    <li key={u} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> {u}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">Relaterat</h3>
                <div className="space-y-2">
                  <Link to="/takbyte" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Takbyte</Link>
                  <Link to="/taktvatt" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Taktvätt & takvård</Link>
                  <Link to="/taksakerhet" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Taksäkerhet</Link>
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

export default Takrenovering;
