import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Phone, Star, Shield, Award, Hammer, MapPin, Clock } from "lucide-react";
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
    question: "Vad kostar ett takbyte i Roslagen?",
    answer:
      "Priset varierar beroende på material och takets storlek. TP20-plåttak från ca 1 200 kr/m², pannplåt och plegelplåt från ca 1 200 kr/m², lertegel från ca 1 300 kr/m² och dubbelfalsat plåttak från ca 2 000 kr/m². För ett villatak på 150 m² hamnar totalpriset ofta mellan 180 000 och 350 000 kr inklusive material, arbete, byggställning och avfallshantering. Med ROT-avdrag får du 30% rabatt på arbetskostnaden.",
  },
  {
    question: "Hur lång tid tar ett takbyte?",
    answer:
      "Ett normalt villatakbyte tar 3–7 arbetsdagar beroende på takets storlek, lutning och komplexitet. Skärgårdsprojekt kan ta något längre tid på grund av materialtransport. Vi planerar varje projekt noggrant så att arbetet flyter på utan onödiga uppehåll.",
  },
  {
    question: "Vilket takmaterial ska jag välja?",
    answer:
      "Det beror på huset, budgeten och estetiken du vill ha. TP20 är prisvärt och hållbart. Dubbelfalsat plåttak är det dyraste men håller 60+ år och passar äldre hus. Lertegel passar traditionella hus och håller mycket länge. Vi hjälper dig välja vid den kostnadsfria besiktningen.",
  },
  {
    question: "Vad ingår i ett takbyte?",
    answer:
      "Vi levererar ett komplett takbyte: rivning av befintligt yttertak, ny råspont och ventilation vid behov, ny underlagspapp, fotplåtar och underbeslag runt genomföringar, ny läkt och vindskivor, ny avvattning, plåtdetaljer som stoss och skorstensinklädnad, byggställning och avfallshantering. Allt med 10 års garanti.",
  },
  {
    question: "Behöver jag bygglov för takbyte?",
    answer:
      "Vanligtvis krävs inget bygglov om du byter till samma typ av material och takfärg. Byter du takfärg eller material som väsentligt ändrar utseendet kan bygglov eller anmälan krävas. Vi hjälper dig kontrollera med kommunen.",
  },
  {
    question: "Kan jag använda ROT-avdrag?",
    answer:
      "Ja, ROT-avdrag gäller för takbyte. Du får 30% skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år (max 100 000 kr för par som äger huset tillsammans). Vi sköter all administration och drar av direkt på fakturan.",
  },
  {
    question: "Hur ofta behöver tak bytas?",
    answer:
      "Det beror helt på material och underhåll. Ett dubbelfalsat plåttak kan hålla 60+ år, betongpannor 30–50 år, lertegel 50–100 år och TP20 ca 40 år. Regelbunden taktvätt och inspektion förlänger livslängden avsevärt.",
  },
  {
    question: "Erbjuder ni garanti?",
    answer:
      "Ja, alla takbyten utförs med 10 års garanti på material och utförande. Vi följer AMA Hus — branschstandarden för byggarbeten i Sverige. Du får skriftligt garantibevis efter slutbesiktning.",
  },
];

const Takbyte = () => {
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
    name: "Takbyte Roslagen",
    description:
      "Komplett takbyte i Roslagen och skärgården. TP20, dubbelfalsat plåttak, tegel och betongpannor. Fast pris, 10 års garanti och ROT-avdrag.",
    url: "https://roslagstak.se/takbyte",
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
      description: "Takbyte från 1 200 kr/m² (TP20) till 2 000 kr/m² (dubbelfalsat). ROT-avdrag tillkommer.",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Takbyte", item: "https://roslagstak.se/takbyte" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Takbyte Roslagen — TP20, Dubbelfalsat & Tegel | RoslagsTak"
        description="Komplett takbyte i Roslagen och skärgården. TP20 från 1 200 kr/m², dubbelfalsat från 2 000 kr/m². Fast pris, 10 års garanti och ROT-avdrag. Kostnadsfri offert."
        canonical="https://roslagstak.se/takbyte"
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
            <span className="text-foreground font-medium">Takbyte</span>
          </nav>

          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Hammer className="w-3 h-3" /> Takbyte & takomläggning
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Takbyte i Roslagen — komplett takomläggning med 10 års garanti
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              RoslagsTak utför kompletta takbyten i hela Roslagen och skärgården. Vi byter alla typer av tak — TP20, pannplåt, plegelplåt, dubbelfalsat plåttak, betongpannor och lertegel. Fast pris, 10 års garanti och ROT-avdrag på arbetskostnaden.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-sm text-muted-foreground">4.9 av 5 — 153 kundrecensioner</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Shield className="w-4 h-4 text-primary" /> 10 års garanti</div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Clock className="w-4 h-4 text-primary" /> 3–7 arbetsdagar</div>
              <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Award className="w-4 h-4 text-primary" /> 70 års samlad erfarenhet</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/#offert" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors">
                Få offert på takbyte <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:+46701543639" className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" /> Ring 070-154 36 39
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Välj rätt takmaterial för ditt hus</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "TP20-plåttak", price: "från 1 200 kr/m²", desc: "Profilerad plåt, prisvärt och hållbart i 40+ år. Vanligast i Sverige." },
                    { name: "Pannplåt / Plegelplåt", price: "från 1 200 kr/m²", desc: "Plåt formad som tegelpannor — kombinerar utseende och hållbarhet." },
                    { name: "Dubbelfalsat plåttak", price: "från 2 000 kr/m²", desc: "Klassiskt och elegant. Håller 60+ år och passar både gamla och nya hus." },
                    { name: "Lertegel", price: "från 1 300 kr/m²", desc: "Traditionellt material som åldras vackert. Livslängd 50–100 år." },
                    { name: "Betongpannor", price: "från 1 100 kr/m²", desc: "Vanligast på 1970–2000-talets villor. Bra pris-prestanda." },
                    { name: "Papptak / låglutande", price: "från 800 kr/m²", desc: "För platta och låglutande tak — utbyggnader, garage och stora ytor." },
                  ].map((m) => (
                    <div key={m.name} className="bg-card border border-border rounded-lg p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{m.name}</h3>
                        <span className="text-xs font-semibold text-primary whitespace-nowrap">{m.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">* Riktpriser inkl. material och arbete. Slutpris efter besiktning.</p>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Så går takbytet till — 10 steg</h2>
                <ol className="space-y-3">
                  {[
                    "Kostnadsfri besiktning och offert",
                    "Offert godkänns av kund",
                    "Logistikplanering och materialbeställning",
                    "Byggställning monteras",
                    "Rivning av befintligt yttertak",
                    "Inspektion och byte av råspont vid behov",
                    "Ny underlagspapp och beslag",
                    "Montering av nytt takmaterial",
                    "Installation av taksäkerhet och avvattning",
                    "Slutbesiktning, garantibevis och avetablering",
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
                    <h3 className="font-semibold text-foreground mb-2">Bostadshus 150 m² (TP20)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Komplett takbyte med TP20-plåt: <strong className="text-foreground">ca 195 000 kr</strong> inkl. material, arbete, ställning och avfall. Efter ROT-avdrag (30% av arbetskostnaden ca 60 000 kr): <strong className="text-foreground">ca 177 000 kr</strong>.
                    </p>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                    <h3 className="font-semibold text-foreground mb-2">Kustvilla 100 m² (dubbelfalsat)</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Komplett takbyte med dubbelfalsat plåttak: <strong className="text-foreground">ca 215 000 kr</strong>. Efter ROT-avdrag: <strong className="text-foreground">ca 196 000 kr</strong>.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Takbyte i hela Roslagen — välj din ort</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vi utför takbyten i hela Roslagen — från Norrtälje och Östhammar till skärgårdsöarna. Klicka på din ort för lokal information:
                </p>
                <div className="flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <Link key={l.slug} to={`/takbyte-${l.slug}`} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      <MapPin className="w-3 h-3" /> Takbyte {l.isIsland ? "på" : "i"} {l.name}
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-2xl text-foreground mb-4">Vanliga frågor om takbyte</h2>
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
                <h3 className="font-display text-lg mb-2">Kostnadsfri offert</h3>
                <p className="text-sm opacity-90 mb-4">Få fast pris på takbyte inom 24 timmar.</p>
                <Link to="/#offert" className="inline-flex items-center justify-center gap-2 bg-white text-primary w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/90 transition-colors">
                  Få offert <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+46701543639" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white w-full px-6 py-3 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors mt-3">
                  <Phone className="w-4 h-4" /> 070-154 36 39
                </a>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">Vad ingår</h3>
                <ul className="space-y-2">
                  {["Rivning av yttertak", "Ny råspont vid behov", "Ny underlagspapp", "Nytt takmaterial", "Taksäkerhet & avvattning", "Byggställning", "Avfallshantering", "10 års garanti"].map((u) => (
                    <li key={u} className="flex items-start gap-2 text-sm text-muted-foreground"><CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> {u}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-lg text-card-foreground mb-4">Relaterade tjänster</h3>
                <div className="space-y-2">
                  <Link to="/takrenovering" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Takrenovering</Link>
                  <Link to="/taktvatt" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Taktvätt & takvård</Link>
                  <Link to="/taksakerhet" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Taksäkerhet</Link>
                  <Link to="/priser" className="flex items-center gap-2 text-sm text-primary hover:underline"><ArrowRight className="w-3 h-3" /> Se prislista</Link>
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

export default Takbyte;
