import { Star, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const allReviews = [
  { name: "Anna Lindberg", location: "Ljusterö", rating: 5, roofType: "TP20 Plåttak", text: "Fantastiskt jobb med vårt tak på ön! Trots att vi bor på en ö fixade de allt smidigt med materialtransport och logistik. Snyggt, snabbt och till det pris som utlovades. Vi rekommenderar varmt." },
  { name: "Erik Johansson", location: "Vaxholm", rating: 5, roofType: "Betongpannetak", text: "Professionellt från start till slut. Hjälpte oss med ROT-avdraget och städade fint efter sig. Offerten stämde på kronan och taket blev precis som vi önskade." },
  { name: "Maria Karlsson", location: "Grisslehamn", rating: 5, roofType: "Dubbelfalsat plåttak", text: "Bästa takläggarna vi har anlitat. De levererade ett dubbelfalsat koppartak som verkligen håller. Otroligt fint hantverk och professionellt bemötande." },
  { name: "Lars Eriksson", location: "Arholma", rating: 5, roofType: "TP20 Plåttak", text: "Att hitta takläggare som tar sig ut till Arholma var inte lätt — men RoslagsTak löste allt, inklusive båttransport av material. Riktigt nöjda med resultatet." },
  { name: "Karin Svensson", location: "Blidö", rating: 5, roofType: "Lertegeltak", text: "Vi ville behålla den klassiska känslan på vår stuga och valde lertegel. Takläggarna var noggranna och resultatet blev fantastiskt. Rekommenderas!" },
  { name: "Johan Bergström", location: "Singö", rating: 5, roofType: "Pannplåttak", text: "Snabb och smidig takomläggning från papptak till pannplåt. Huset ser helt förvandlat ut. Tack för ett jättebra jobb!" },
  { name: "Ingrid Holm", location: "Furusund", rating: 5, roofType: "Tegelplåttak", text: "Vi valde tegelplåt för att få tegellook utan vikten. Monteringen gick snabbt och resultatet ser ut precis som riktigt tegel. Mycket nöjd." },
  { name: "Peter Nordin", location: "Norrtälje", rating: 5, roofType: "Betongpannetak", text: "Komplett takomläggning med nya betongpannor, råspontbyte och ny avvattning. Allt klart på en vecka. Fast pris utan överraskningar." },
  { name: "Helena Åberg", location: "Spillersboda", rating: 5, roofType: "TP20 Plåttak", text: "Från offert till färdigt tak på tre veckor. Kommunikationen var utmärkt hela vägen. Vi fick exakt det vi beställde." },
  { name: "Lena Forsberg", location: "Yxlan", rating: 5, roofType: "Pannplåttak", text: "Vi hade svårt att hitta någon som ville ta sig till Yxlan, men RoslagsTak ställde upp. Nytt pannplåttak och ny avvattning. Riktigt bra!" },
  { name: "Ulf Sandberg", location: "Rådmansö", rating: 5, roofType: "Tegelplåttak", text: "Takomläggning med tegelplåt och komplett råspontbyte. Jobbet var rent och prydligt varje dag. Tack för ett fantastiskt resultat!" },
  { name: "Göran Hedström", location: "Väddö", rating: 5, roofType: "Lertegeltak", text: "Tredje generationens hus fick äntligen ett nytt lertegeltak. RoslagsTak förstod precis vilken känsla vi var ute efter. Ovärderligt." },
  { name: "Anders Nyström", location: "Högmarsö", rating: 5, roofType: "TP20 Plåttak", text: "Nytt TP20-tak på sommarstugan. Snabb leverans trots att vi bor på ö. Professionellt och smidigt från första kontakt till färdigt tak." },
  { name: "Margareta Lind", location: "Svartlöga", rating: 5, roofType: "Dubbelfalsat plåttak", text: "Att få takläggare hela vägen ut till Svartlöga var oväntat smidigt. Dubbelfalsat plåttak som ser fantastiskt ut. Tack RoslagsTak!" },
  { name: "Rickard Sjöberg", location: "Söderöra", rating: 5, roofType: "Betongpannetak", text: "Nytt betongpannetak på vårt sommarhus på Söderöra. Hantverkarna var punktliga och noggranna. Riktigt nöjda med slutresultatet." },
  { name: "Kristina Wallin", location: "Humlö", rating: 5, roofType: "TP20 Plåttak", text: "Vi jämförde flera offerter men RoslagsTak hade bäst pris och bäst villkor. Takbytet gick snabbt och smidigt. Rekommenderar varmt." },
  { name: "Patrik Gren", location: "Norröra", rating: 5, roofType: "Pannplåttak", text: "Nytt pannplåttak på Norröra — mitt i Saltkråkan-miljö. Takläggarna var respektfulla mot miljön och levererade ett fantastiskt resultat." },
  { name: "Camilla Ek", location: "Gräskö", rating: 5, roofType: "Lertegeltak", text: "Lertegeltak på vår gamla stuga. Perfekt matchning med husets karaktär. RoslagsTak förstod precis vad vi ville ha." },
  { name: "Bengt Olsson", location: "Bergshamra", rating: 5, roofType: "Dubbelfalsat plåttak", text: "Förstklassigt hantverk! Dubbelfalsat aluminiumtak som verkligen håller toppklass. Alla som ser huset kommenterar taket." },
  { name: "Annika Palm", location: "Husarö", rating: 5, roofType: "Tegelplåttak", text: "Tegelplåt på Husarö — vi fick ett vackert tak som ser ut som riktigt tegel. Smidig logistik trots öläge. Mycket professionellt." },
  { name: "Stefan Blom", location: "Finnhamn", rating: 5, roofType: "TP20 Plåttak", text: "TP20 i mörkgrå på vår stuga vid Finnhamn. Takläggarna ordnade all transport och arbetet var klart på tre dagar. Toppen!" },
  { name: "Eva Strand", location: "Ingmarsö", rating: 5, roofType: "Pannplåttak", text: "Takomläggning med pannplåt på Ingmarsö. Snabb offert, tydlig kommunikation och ett resultat som överträffade förväntningarna." },
  { name: "Thomas Wikström", location: "Svartnö", rating: 5, roofType: "Dubbelfalsat plåttak", text: "Bandtäckning i koppar på vårt fritidshus. Exklusivt resultat och professionellt genomfört. Värt varenda krona." },
  { name: "Susanne Dahl", location: "Vätö", rating: 5, roofType: "Betongpannetak", text: "Nytt betongpannetak på Vätö. Bra pris, snabbt utfört och fint resultat. Takstege och gångbrygga installerades samtidigt." },
];

const locations = [...new Set(allReviews.map(r => r.location))];

const Reviews = () => {
  const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);

  const reviewSchemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: "RoslagsTak",
    url: "https://roslagstak.se",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: allReviews.length,
      bestRating: "5",
    },
    review: allReviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Recensioner", item: "https://roslagstak.se/recensioner" },
    ],
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchemaJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Recensioner</span>
          </div>

          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Kundrecensioner</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Recensioner från takprojekt i Roslagen
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {allReviews.length} omdömen från kunder på {locations.length} platser i Roslagens skärgård — Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn, Ingmarsö och fler.
            </p>
            <div className="inline-flex items-center gap-3 bg-card border border-border rounded-lg px-6 py-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-display text-2xl text-foreground">{avgRating}</span>
              <span className="text-muted-foreground text-sm">/ 5 i snitt</span>
            </div>
          </div>

          {/* Locations overview */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {locations.map(loc => (
              <span key={loc} className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
                <MapPin className="w-3 h-3" />
                {loc}
              </span>
            ))}
          </div>

          {/* Reviews grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {allReviews.map((review, index) => (
              <blockquote
                key={index}
                className="bg-card border border-border rounded-lg p-6 flex flex-col"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                  "{review.text}"
                </p>
                <footer className="border-t border-border pt-3 mt-auto">
                  <cite className="not-italic font-semibold text-sm text-card-foreground">{review.name}</cite>
                  <div className="flex items-center justify-between mt-1">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {review.location}
                    </span>
                    <span className="text-xs text-primary font-medium">{review.roofType}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center mt-16">
            <div className="bg-accent rounded-lg p-8">
              <h2 className="font-display text-2xl text-accent-foreground mb-2">
                Redo att bli nästa nöjda kund?
              </h2>
              <p className="text-accent-foreground/70 text-sm mb-6">
                Få en kostnadsfri offert eller boka rådgivning — vi återkopplar inom 24 timmar.
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Reviews;