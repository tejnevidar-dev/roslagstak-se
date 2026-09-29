import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import RelatedLinks from "@/components/RelatedLinks";
import GoogleReviews from "@/components/GoogleReviews";
import QuickContactFacts from "@/components/QuickContactFacts";
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
      { name: "TP20 plåttak", priceRange: "Fast pris efter takkontroll", description: "Prisvärt och populärt val för fritidshus och enklare byggnader." },
      { name: "Pannplåttak", priceRange: "Fast pris efter takkontroll", description: "Plåtprofil som imiterar pannor. Lägre vikt än betongpannor." },
      { name: "Plegelplåttak", priceRange: "Fast pris efter takkontroll", description: "Plåtprofil som imiterar tegel. Stilrent och underhållsfritt." },
      { name: "Dubbelfalsat plåttak", priceRange: "Fast pris efter takkontroll", description: "Premiumprodukten. Helt vattentätt, extremt långlivat (50+ år)." },
    ],
  },
  {
    category: "Panntak",
    items: [
      { name: "Betongpannetak", priceRange: "Fast pris efter takkontroll", description: "Beprövat och prisvärt. 30–50 års livslängd." },
      { name: "Lertegeltak", priceRange: "Fast pris efter takkontroll", description: "Klassiskt och traditionellt. Perfekt för äldre hus." },
    ],
  },
  {
    category: "Övriga tjänster",
    items: [
      { name: "Takrenovering", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Beroende på skadans omfattning. Alltid fast pris efter besiktning." },
      { name: "Takavvattning (hängrännor)", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Komplett system med stuprör, fast pris i offerten." },
      { name: "Takkupa", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Inklusive konstruktion, taktäckning och plåtarbete." },
      { name: "Takfönster (Velux)", priceRange: "Kontakta oss för skräddarsydd rådgivning!", description: "Inklusive montering och vattenavledning." },
      { name: "Takinspektion", priceRange: "Kostnadsfritt", description: "Grundlig besiktning med skriftlig rapport och åtgärdsförslag." },
    ],
  },
  {
    category: "Tillval",
    items: [
      { name: "Råspontbyte", priceRange: "Fast pris efter takkontroll", description: "Byte av skadat underlag vid takbyte." },
      { name: "Skorstensinklädnad", priceRange: "Pris efter takkontroll", description: "Byte av skorstenskrans eller ny hel inklädnad av skorstenet. " },
      { name: "Takstege + gångbrygga", priceRange: "Pris efter takkontroll", description: "Komplett taksäkerhet enligt BBR." },
      { name: "Snörasskydd", priceRange: "Fast pris efter bedömning", description: "Monteras vid takfot mot entréer och gångvägar." },
    ],
  },
];

const priceFaqs = [
  {
    question: "Vad kostar ett takbyte i Roslagen?",
    answer: "Priset beror på takets storlek, lutning, material och skick. Vi lämnar alltid ett fast pris efter en kostnadsfri takkontroll — aldrig innan. Med ROT-avdrag (30% på arbetskostnaden) blir det avsevärt billigare.",
  },
  {
    question: "Ingår material i priset?",
    answer: "Ja, alla våra priser inkluderar material, arbete, logistik och avfallshantering. Byggställning specificeras separat i offerten. Vi arbetar alltid med fasta priser utan dolda kostnader.",
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
        title="Vad kostar takbyte? Fast pris 2026 — Roslagen"
        description="Vad kostar ett takbyte i Roslagen? Fast pris efter kostnadsfri takkontroll, oavsett material — TP20, betongpannor, tegel eller dubbelfalsat plåttak."
        canonical="https://roslagstak.se/priser"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <div className="pt-20">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Priser" }]} />
        </div>
        <PageHero
          compact
          eyebrow="Priser 2026"
          title="Vad kostar takbyte och takrenovering i Roslagen?"
          text="Fast pris efter kostnadsfri takkontroll, oavsett material. Alla priser inkluderar material och arbete, inkl. moms och före ROT-avdrag. ROT-avdrag (30% på arbetskostnaden) dras av direkt på fakturan."
        />

        <div className="container mx-auto px-4 pt-2 pb-20">
          <div className="max-w-4xl mx-auto mb-12">
            <QuickContactFacts />
          </div>
          {/* Price tables */}
          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            {priceData.map((category) => (
              <div key={category.category} className="bg-card border border-border rounded-2xl overflow-hidden">
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
          <div className="max-w-4xl mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-16">
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

          {/* Vad påverkar priset */}
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 mb-16">
            <h2 className="font-display text-xl text-foreground mb-4">
              Vad avgör priset på just ditt tak?
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Priset styrs av materialval, takets storlek och form, underlagets skick, taklutning och
              tillgänglighet, samt detaljer som skorstenar, plåtbeslag och hängrännor. Därför lämnar vi
              aldrig ett pris utan att först ha sett taket.
            </p>
            <Link
              to="/blogg/kostnad-takbyte-2026"
              className="inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
            >
              Läs hela guiden: Vad kostar ett takbyte? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-2xl text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" /> Vanliga frågor om priser
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {priceFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-2xl px-6">
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
            <div className="bg-accent rounded-2xl p-8">
              <h2 className="font-display text-2xl text-accent-foreground mb-2">
                Vill du veta exakt vad ditt tak kostar?
              </h2>
              <p className="text-accent-foreground/70 text-sm mb-6">
                Konfigurera din offert eller kontakta oss för kostnadsfri takkontroll.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/offert"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors hover:animate-subtle-pulse"
                >
                  Konfigurera din offert <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+46701543639"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors hover:animate-subtle-pulse"
                >
                  Ring 070-154 36 39
                </a>
              </div>
            </div>
          </div>
        </div>
        <GoogleReviews variant="band" />
        <RelatedLinks currentPath="/priser" title="Relaterat till pris" />
      </main>
      <Footer />
    </>
  );
};

export default Prices;
