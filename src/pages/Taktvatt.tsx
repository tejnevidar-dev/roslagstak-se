import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone, Star, Shield, Award, Droplets, Sparkles, Leaf, MapPin } from "lucide-react";
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
    question: "Vad kostar taktvätt i Roslagen?",
    answer:
      "Taktvätt kostar normalt 80–150 kr/m² beroende på takets storlek, lutning, material och nedsmutsningsgrad. För ett villatak på 150 m² hamnar totalpriset oftast mellan 12 000 och 22 000 kr inklusive behandling med biocidmedel mot mossa och alger. Med ROT-avdrag får du 30% rabatt på arbetskostnaden direkt på fakturan.",
  },
  {
    question: "Hur ofta behöver man tvätta taket?",
    answer:
      "Vi rekommenderar taktvätt vart 5:e till 10:e år beroende på takets exponering. Tak på norrsidor, under träd eller nära hav och sjöar drabbas hårdare av mossa och alger och behöver tvättas oftare. I Roslagens fuktiga skärgårdsklimat är 5–7 år en bra riktlinje för många hus.",
  },
  {
    question: "Är högtryckstvätt skadligt för taket?",
    answer:
      "Ja, högtryckstvätt med för högt tryck kan skada ytskiktet på betong- och tegelpannor och förkorta takets livslängd. Vi använder därför skonsam lågtryckstvätt eller manuell borstning beroende på takmaterial. På plåttak används metoder som inte skadar ytbehandlingen.",
  },
  {
    question: "Vilket biocidmedel använder ni?",
    answer:
      "Vi använder miljögodkända biocidmedel som dödar mossa, alger och lavar i rotsystemet. Behandlingen ger ca 5 års skydd mot återväxt. Medlet är godkänt av Kemikalieinspektionen och bryts ner naturligt.",
  },
  {
    question: "Måste taket målas efter tvätt?",
    answer:
      "Nej, taktvätt och takmålning är två separata tjänster. Många nöjer sig med taktvätt och biocidbehandling, vilket räcker för att förlänga takets livslängd och fräscha upp utseendet. Om färgen är blekt eller taket har börjat åldras kan takmålning däremot vara ett bra komplement.",
  },
  {
    question: "Kan taktvätt göras på vintern?",
    answer:
      "Nej, taktvätt kräver torr väderlek och plusgrader. Bäst tid är från april till oktober. Vi planerar arbetet efter väderprognos för bästa resultat.",
  },
  {
    question: "Förlänger taktvätt verkligen takets livslängd?",
    answer:
      "Ja, regelbunden taktvätt kan förlänga takets livslängd med 10–15 år. Mossa och alger håller fukt mot takmaterialet, vilket leder till frostsprängning på betong- och tegelpannor samt rost och rötskador på underlaget. Genom att hålla taket rent slipper du dyra reparationer och takbyten i förtid.",
  },
  {
    question: "Ingår ROT-avdrag vid taktvätt?",
    answer:
      "Ja, ROT-avdrag gäller för taktvätt. Du får 30% skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Vi sköter all administration — du betalar bara din del direkt på fakturan.",
  },
];

const Taktvatt = () => {
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
    name: "Taktvätt Roslagen",
    description:
      "Professionell taktvätt i hela Roslagen och skärgården — borttagning av mossa, alger och lavar med skonsam metod. Fast pris, 10 års garanti och ROT-avdrag.",
    url: "https://roslagstak.se/taktvatt",
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
      description: "Taktvätt från 80 kr/m². Takmålning från 150 kr/m². ROT-avdrag tillkommer.",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Taktvätt", item: "https://roslagstak.se/taktvatt" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Taktvätt Roslagen — Mossborttagning & Takmålning | RoslagsTak"
        description="Professionell taktvätt i Roslagen och skärgården. Borttagning av mossa, alger och lavar. Skonsam metod, fast pris från 80 kr/m², ROT-avdrag och 10 års garanti."
        canonical="https://roslagstak.se/taktvatt"
      />
      <Header />
      <main className="pt-24 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Taktvätt</span>
          </nav>

          {/* Hero */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Droplets className="w-3 h-3" /> Taktvätt & mossborttagning
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Taktvätt i Roslagen — professionell mossborttagning & takmålning
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              RoslagsTak utför professionell taktvätt i hela Roslagen och skärgården. Vi tar bort mossa, alger och lavar med skonsam metod som inte skadar takmaterialet — och förlänger takets livslängd med upp till 15 år. Fast pris från 80 kr/m², ROT-avdrag och 10 års garanti.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9 av 5 — 153 kundrecensioner</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" /> 10 års garanti
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Leaf className="w-4 h-4 text-primary" /> Miljögodkänt biocidmedel
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-primary" /> 70 års samlad erfarenhet
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                to="/#offert"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Få offert på taktvätt <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+46701543639"
                className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" /> Ring 070-154 36 39
              </a>
            </div>
          </div>

          {/* Main content + sidebar */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-10">
              {/* Why */}
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Varför är taktvätt så viktigt i Roslagen?</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Roslagens närhet till Östersjön, Mälaren och tusentals sjöar och vikar skapar ett fuktigt klimat där mossa, alger och lavar trivs särskilt bra. Tak i kustnära områden som Norrtälje, Östhammar, Vaxholm och hela skärgården drabbas snabbare än tak längre inland — och utan regelbunden taktvätt riskerar du dyra konsekvenser.
                  </p>
                  <p>
                    Mossa fungerar som en tvättsvamp som suger åt sig regnvatten och håller fukten kvar mot takmaterialet. På betong- och tegelpannor leder detta till frostsprängning när vattnet fryser i porerna. På plåttak förstör fukten ytbehandlingen och accelererar rostbildningen. Underliggande råspont börjar ruttna, underlagspappen åldras snabbare och hela takkonstruktionen försvagas.
                  </p>
                  <p>
                    En professionell taktvätt avlägsnar mossa, alger och smuts — och en efterföljande biocidbehandling förhindrar återväxt i 5+ år. Investeringen tjänar du snabbt in: ett villatak som tvättas regelbundet håller 40–60 år, medan ett otvättat tak ofta behöver bytas efter 25–30 år.
                  </p>
                </div>
              </section>

              {/* Process */}
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Så går taktvätten till — steg för steg</h2>
                <ol className="space-y-4">
                  {[
                    {
                      title: "Kostnadsfri besiktning",
                      desc: "Vi besöker din fastighet, bedömer takets skick och nedsmutsningsgrad samt rekommenderar rätt metod. Du får skriftlig offert med fast pris.",
                    },
                    {
                      title: "Förberedelser och säkerhet",
                      desc: "Vi täcker fasad, fönster och rabatter. All personal arbetar med fallskydd och säkerhetslina enligt Arbetsmiljöverkets krav.",
                    },
                    {
                      title: "Skonsam rengöring",
                      desc: "Vi använder lågtryckstvätt eller manuell borstning beroende på takmaterial. Aldrig högtryck på betong- eller tegelpannor — det skadar ytskiktet.",
                    },
                    {
                      title: "Borttagning av mossa och rester",
                      desc: "All mossa, alger och växtrester samlas upp och fraktas bort. Hängrännor och stuprör rengörs i samma arbete.",
                    },
                    {
                      title: "Biocidbehandling",
                      desc: "Vi sprayar taket med ett miljögodkänt biocidmedel som dödar kvarvarande mossa, alger och lavar i rotsystemet. Skydd i ca 5 år.",
                    },
                    {
                      title: "Slutkontroll och dokumentation",
                      desc: "Vi går igenom resultatet med dig på plats och dokumenterar arbetet med foton. ROT-avdraget hanteras av oss på fakturan.",
                    },
                  ].map((step, i) => (
                    <li key={step.title} className="flex gap-4 bg-card border border-border rounded-lg p-5">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Materials */}
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Taktvätt på alla typer av tak</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "Betongpannor", desc: "Skonsam lågtryckstvätt + biocid. Vanligast i Roslagen — drabbas hårt av mossa." },
                    { name: "Tegelpannor (lertegel)", desc: "Manuell rengöring och biocidbehandling. Tål inte högtryck." },
                    { name: "Plåttak (TP20, pannplåt)", desc: "Skonsam tvätt med rengöringsmedel som inte skadar ytbehandlingen." },
                    { name: "Dubbelfalsat plåttak", desc: "Specialmetod som bevarar falsar och ytskikt — vanligt på äldre hus." },
                    { name: "Eternittak", desc: "Försiktig rengöring utan tryckspolning. OBS: aldrig på asbesthaltiga tak — de ska saneras." },
                    { name: "Papptak / låglutande tak", desc: "Manuell borstning och milda kemikalier. Vi inspekterar samtidigt papptätningen." },
                  ].map((mat) => (
                    <div key={mat.name} className="bg-card border border-border rounded-lg p-5">
                      <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" /> {mat.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{mat.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Pricing */}
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Vad kostar taktvätt i Roslagen?</h2>
                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-foreground">Taktvätt (rengöring + uppsamling)</span>
                    <span className="font-semibold text-foreground">från 80 kr/m²</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-foreground">Biocidbehandling mot mossa & alger</span>
                    <span className="font-semibold text-foreground">från 30 kr/m²</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-foreground">Komplett paket (tvätt + biocid)</span>
                    <span className="font-semibold text-foreground">från 110 kr/m²</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-foreground">Takmålning (grundning + 2 strykningar)</span>
                    <span className="font-semibold text-foreground">från 150 kr/m²</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">Rengöring av hängrännor & stuprör</span>
                    <span className="font-semibold text-foreground">från 25 kr/löpmeter</span>
                  </div>
                </div>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2">Räkneexempel: villa 150 m²</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Komplett taktvätt + biocid: <strong className="text-foreground">ca 16 500 kr</strong>. Efter ROT-avdrag (30% av arbetskostnaden): <strong className="text-foreground">ca 11 550 kr</strong>.
                    </p>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2">Räkneexempel: kustvilla 100 m²</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Komplett taktvätt + biocid: <strong className="text-foreground">ca 11 000 kr</strong>. Efter ROT-avdrag: <strong className="text-foreground">ca 7 700 kr</strong>.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  * Riktpriser. Slutpris beror på takets lutning, åtkomlighet, höjd och nedsmutsningsgrad. Vi lämnar alltid fast pris efter kostnadsfri besiktning.
                </p>
              </section>

              {/* Local */}
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Taktvätt i hela Roslagen — välj din ort</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vi utför taktvätt över hela Roslagen — från Norrtälje och Östhammar till skärgårdsöarna Blidö, Ljusterö, Möja och Singö. Klicka på din ort för lokal information om taktvätt och mossborttagning:
                </p>
                <div className="flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <Link
                      key={l.slug}
                      to={`/taktvatt-${l.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <MapPin className="w-3 h-3" /> Taktvätt {l.isIsland ? "på" : "i"} {l.name}
                    </Link>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Vanliga frågor om taktvätt</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
                      <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                        {f.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {f.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-primary text-primary-foreground rounded-lg p-6 lg:sticky lg:top-28">
                <h3 className="font-display text-lg mb-2">Kostnadsfri offert</h3>
                <p className="text-sm opacity-90 mb-4">
                  Få fast pris på taktvätt inom 24 timmar. Helt utan förbindelser.
                </p>
                <Link
                  to="/#offert"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Få offert <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+46701543639"
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors mt-3"
                >
                  <Phone className="w-4 h-4" /> 070-154 36 39
                </a>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">Ingår i taktvätt</h3>
                <ul className="space-y-2">
                  {[
                    "Skonsam lågtryckstvätt",
                    "Borttagning av mossa & lavar",
                    "Biocidbehandling 5 års skydd",
                    "Rengöring av hängrännor",
                    "Skydd av fasad & rabatter",
                    "Bortforsling av växtrester",
                    "Fotodokumentation",
                    "ROT-avdrag på fakturan",
                  ].map((u) => (
                    <li key={u} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> {u}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">Relaterade tjänster</h3>
                <div className="space-y-2">
                  <Link to="/tjanster/takvard" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Takvård & takmålning
                  </Link>
                  <Link to="/tjanster/takinspektion" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Kostnadsfri takinspektion
                  </Link>
                  <Link to="/tjanster/takrenovering" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Takrenovering
                  </Link>
                  <Link to="/priser" className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <ArrowRight className="w-3 h-3" /> Se prislista
                  </Link>
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

export default Taktvatt;
