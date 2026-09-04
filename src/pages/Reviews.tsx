import { ArrowRight, Star, ShieldCheck, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedLinks from "@/components/RelatedLinks";
import GoogleReviews from "@/components/GoogleReviews";

const points = [
  {
    icon: ShieldCheck,
    title: "Bara verifierade omdömen",
    text: "Vi publicerar inga omdömen som vi själva har skrivit. Det du läser på Google är lämnat av kunder, med namn och datum, och kan inte redigeras av oss.",
  },
  {
    icon: MessageSquare,
    title: "Läs dem i original",
    text: "Google visar hela recensionen, när den skrevs och vilket svar vi har lämnat. Det är enklare att bedöma än citat plockade ur sitt sammanhang.",
  },
  {
    icon: Star,
    title: "Har vi jobbat hos dig?",
    text: "Ett omdöme på Google hjälper nästa husägare att välja rätt takläggare. Skriv gärna vilken ort jobbet utfördes på och vilken typ av tak du fick.",
  },
];

const Reviews = () => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Omdömen", item: "https://roslagstak.se/recensioner" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Omdömen — takläggare i Roslagen & Storstockholm | RoslagsTak"
        description="Läs omdömen om RoslagsTak direkt på vår Google-företagsprofil. Vi publicerar inga egenskrivna recensioner — bara verifierade omdömen från kunder."
        canonical="https://roslagstak.se/recensioner"
      />
      <Header />
      <main className="pt-24 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="container mx-auto px-4">
          <nav aria-label="Brödsmulor" className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground font-medium" aria-current="page">Omdömen</span>
          </nav>

          <div className="max-w-3xl mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Omdömen</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Omdömen om RoslagsTak
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Alla våra omdömen finns på Google, där de är kopplade till riktiga konton och inte kan ändras av oss.
              Vi har medvetet tagit bort egenskrivna kundcitat från sajten — det säger ingenting om hur vi faktiskt jobbar.
            </p>
          </div>

          <div className="max-w-4xl">
            <GoogleReviews />
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mt-14">
            {points.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-lg p-6">
                <p.icon className="w-6 h-6 text-primary mb-4" />
                <h2 className="font-display text-lg text-card-foreground mb-2">{p.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-16">
            <div className="bg-accent rounded-lg p-8">
              <h2 className="font-display text-2xl text-accent-foreground mb-2">
                Vill du ha ett pris på ditt tak?
              </h2>
              <p className="text-accent-foreground/70 text-sm mb-6">
                Vi kommer ut, tittar på taket och lämnar ett fast pris. Kostnadsfritt.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/offert"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors hover:animate-subtle-pulse"
                >
                  Få offert <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/offert#radgivning"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors hover:animate-subtle-pulse"
                >
                  Kostnadsfri rådgivning
                </Link>
              </div>
            </div>
          </div>
        </div>
        <RelatedLinks currentPath="/recensioner" title="Läs vidare" />
      </main>
      <Footer />
    </>
  );
};

export default Reviews;
