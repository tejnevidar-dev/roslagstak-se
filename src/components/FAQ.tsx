import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Vad kostar ett takbyte i Roslagen?",
    answer: "Priset beror på taktyp, storlek och materialval. Ett takbyte med TP20-plåt kostar vanligtvis från ca 1200-1300 kr/m², medan dubbelfalsat plåttak ligger högre. Vi erbjuder alltid kostnadsfri offert — konfigurera din offert direkt på sidan eller kontakta oss för rådgivning.",
  },
  {
    question: "Lägger ni tak på öar i skärgården?",
    answer: "Ja! Vi utför takprojekt på öar och kuststäder i Roslagen — från Blidö, Ljusterö och Yxlan till Husarö, Finnhamn, Ingmarsö, Svartlöga och Arholma. Vi ordnar all materialtransport och logistik.",
  },
  {
    question: "Vilka taktyper erbjuder ni?",
    answer: "Vi arbetar med TP20 plåttak, dubbelfalsat plåttak (bandtäckning), tegelplåttak, pannplåttak, betongpannetak, lertegeltak och papptak. Vi hjälper dig välja rätt material baserat på ditt hus och din budget.",
  },
  {
    question: "Hur lång garanti ger ni på takarbeten?",
    answer: "Vi ger 10 års garanti på allt arbete vi utför. Alla våra takläggare är certifierade och försäkrade, och vi arbetar alltid enligt AMA-standard.",
  },
  {
    question: "Kan jag använda ROT-avdrag för takbyte?",
    answer: "Ja, takbyte och takrenovering berättigar till ROT-avdrag. Du kan få 30% skattereduktion på arbetskostnaden (max 50 000 kr per person och år). Vi hjälper dig med allt pappersarbete.",
  },
  {
    question: "Hur snabbt kan ni påbörja mitt takprojekt?",
    answer: "Vi återkopplar inom 24 timmar efter att du skickat in din förfrågan. Beroende på säsong och projektets storlek kan vi ofta påbörja arbetet inom 2–4 veckor. Akuta ärenden prioriteras.",
  },
  {
    question: "Utför ni takinspektion?",
    answer: "Ja, vi erbjuder kostnadsfri takinspektion med en detaljerad rapport och åtgärdsförslag. Vi besiktigar taket, underlagspapp, råspont, avvattning och taksäkerhet.",
  },
  {
    question: "Vilka områden i Roslagen täcker ni?",
    answer: "Vi verkar i hela Roslagen — från Vaxholm i söder till Arholma i norr. Det inkluderar Norrtälje, Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn, Ingmarsö, Högmarsö, Svartlöga, Söderöra, Norröra, Humlö, Gräskö, Spillersboda, Rådmansö, Bergshamra, Svartnö, Väddö, Vätö, Singö och Grisslehamn.",
  },
  {
    question: "Kan ni riva eternittak med asbest?",
    answer: "Ja, vi utför certifierad asbestsanering enligt Arbetsmiljöverkets föreskrifter (AFS 2006:1). Vi hanterar allt från materialprovstagning och anmälan till säker rivning, emballering och transport till godkänd deponi — inklusive på öar i skärgården. Efter saneringen lägger vi ett nytt, modernt tak. Kontakta oss för kostnadsfri besiktning.",
  },
];

const FAQ = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-background" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Vanliga frågor</p>
          <h2 id="faq-heading" className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Frågor om takbyte och takläggare i Roslagen
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Här hittar du svar på de vanligaste frågorna om takbyte, takrenovering och takläggning i Roslagens skärgård.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
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
      </div>
    </section>
  );
};

export default FAQ;
