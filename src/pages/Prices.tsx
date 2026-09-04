import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import RelatedLinks from "@/components/RelatedLinks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const priceData = [
  {
    category: "Plåttak",
    items: [
      { name: "TP20 plåttak", priceRange: "Från ca 1200 kr/m²", description: "Prisvärt och populärt val för fritidshus och enklare byggnader." },
      { name: "Pannplåttak", priceRange: "Från ca 1200 kr/m²", description: "Plåtprofil som imiterar pannor. Lägre vikt än betongpannor." },
      { name: "Plegelplåttak", priceRange: "Från ca 1200 kr/m²", description: "Plåtprofil som imiterar tegel. Stilrent och underhållsfritt." },
      { name: "Dubbelfalsat plåttak", priceRange: "Från ca 2000 kr/m²", description: "Premiumprodukten. Helt vattentätt, extremt långlivat (50+ år)." },
    ],
  },
  {
    category: "Panntak",
    items: [
      { name: "Betongpannetak", priceRange: "Från ca 1200 kr/m²", description: "Beprövat och prisvärt. 30–50 års livslängd." },
      { name: "Lertegeltak", priceRange: "Från ca 1 300 kr/m²", description: "Klassiskt och traditionellt. Perfekt för äldre hus." },
    ],
  },
  {
    category: "Övriga tjänster",
    items: [
      { name: "Takrenovering", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Beroende på skadans omfattning. Alltid fast pris efter besiktning." },
      { name: "Takavvattning (hängrännor)", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Komplett system med stuprör från ca 15 000 kr." },
      { name: "Takkupa", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Inklusive konstruktion, taktäckning och plåtarbete." },
      { name: "Takfönster (Velux)", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Inklusive montering och vattenavledning." },
      { name: "Takinspektion", priceRange: "Kostnadsfritt", description: "Grundlig besiktning med skriftlig rapport och åtgärdsförslag." },
    ],
  },
  {
    category: "Tillval",
    items: [
      { name: "Råspontbyte", priceRange: "Från ca 300 kr/m²", description: "Byte av skadat underlag vid takbyte." },
      { name: "Skorstensinklädnad", priceRange: "Från ca 7000 kr ", description: "Byte av skorstenskrans eller ny hel inklädnad av skorstenet. " },
      { name: "Takstege + gångbrygga", priceRange: "Från ca 8000 kr", description: "Komplett taksäkerhet enligt BBR." },
      { name: "Snörasskydd", priceRange: "Från ca 1000 kr/löpmeter", description: "Monteras vid takfot mot entréer och gångvägar." },
    ],
  },
];

const priceFaqs = [
  {
    question: "Vad kostar ett takbyte i Roslagen?",
    answer: "Ett takbyte kostar vanligtvis mellan 1200–2000 kr/m² beroende på materialval. Med ROT-avdrag (30% på arbetskostnaden) blir det avsevärt billigare. Ett typiskt hus på 120 m² tak kostar ca 144 000 kr–240 000 kr före ROT-avdrag.",
  },
  {
    question: "Ingår material i priset?",
    answer: "Ja, alla våra priser inkluderar material, arbete, byggställning, logistik och avfallshantering. Vi arbetar alltid med fasta priser utan dolda kostnader.",
  },
  {
    question: "Kan jag använda ROT-avdrag?",
    answer: "Ja, takbyte och takrenovering är ROT-berättigade. Du får 30% skattereduktion på arbetskostnaden, max 50 000 kr per person och år. Avdraget syns direkt på fakturan och vi sköter ansökan mot Skatteverket.",
  },
  {
    question: "Kostar det extra på öar i skärgården?",
    answer: "Priset kan variera något beroende på logistik och tillgänglighet. Vi ger alltid ett fast pris i offerten som inkluderar eventuella transportkostnader.",
  },
  {
    question: "Hur lång tid tar ett takbyte?",
    answer: "Ett typiskt takbyte på ett villahus tar 3–7 arbetsdagar beroende på storlek och komplexitet. Vi tar effektivitet med största allvar för att minimera störningarna i er vardag.",
  },
];

const Prices = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: priceFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <SEOHead
        title="Priser takbyte & takrenovering Roslagen — Prislista 2026"
        description="Vad kostar takbyte i Roslagen? Prislista för TP20, dubbelfalsat, tegelplåt, betongpannor och takrenovering. Fast pris efter besiktning och kostnadsfri offert."
        canonical="https://roslagstak.se/priser"
      />
      <Header />
      <main className="pt-24 pb-20">
        <JsonLd
          data={buildBreadcrumbSchema([
            { name: "Hem", path: "/" },
            { name: "Priser", path: "/priser" },
          ])}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Priser</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Prislista 2026</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Vad kostar takbyte och takrenovering i Roslagen?
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Riktpriser för alla typer av takarbeten. Alla priser inkluderar material och arbete. 
              ROT-avdrag (30% på arbetskostnaden) tillkommer. Kostnadsfri offert med exakt pris.
            </p>
          </div>

          {/* Price tables */}
          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            {priceData.map((category) => (
              <div key={category.category} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-primary/5 px-6 py-4 border-b border-border">
                  <h2 className="font-display text-lg text-foreground">{category.category}</h2>
                </div>
                <div className="divide-y divide-border">
                  {category.items.map((item) => (
                    <div key={item.name} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-sm text-card-foreground">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="text-primary font-display text-lg whitespace-nowrap">{item.priceRange}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ROT info */}
          <div className="max-w-4xl mx-auto bg-primary/5 border border-primary/20 rounded-lg p-8 mb-16">
            <h2 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" /> Så fungerar ROT-avdraget vid takarbeten
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Takbyte och takrenovering berättigar till ROT-avdrag. Du får 30% skattereduktion på arbetskostnaden, 
              max 50 000 kr per person och år. Vi drar av ROT-avdraget direkt på fakturan — du betalar bara din del.
            </p>
            <Link
              to="/blogg/rot-avdrag-takbyte"
              className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
            >
              Läs mer om ROT-avdrag <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-2xl text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" /> Vanliga frågor om priser
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {priceFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-sm text-card-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-accent rounded-lg p-8">
              <h2 className="font-display text-2xl text-accent-foreground mb-2">
                Vill du veta exakt vad ditt tak kostar?
              </h2>
              <p className="text-accent-foreground/70 text-sm mb-6">
                Konfigurera din offert eller kontakta oss för kostnadsfri besiktning.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/offert"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors hover:animate-subtle-pulse"
                >
                  Konfigurera din offert <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+46701543639"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors hover:animate-subtle-pulse"
                >
                  Ring 070-154 36 39
                </a>
              </div>
            </div>
          </div>
        </div>
        <RelatedLinks currentPath="/priser" title="Relaterat till pris" />
      </main>
      <Footer />
    </>
  );
};

export default Prices;
