import { ArrowRight, Star, ShieldCheck, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
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
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="pt-24">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Omdömen" }]} withSchema={false} />
        </div>
        <PageHero
          eyebrow="Omdömen"
          title="Omdömen om RoslagsTak"
          text="Alla våra omdömen finns på Google, där de är kopplade till riktiga konton och inte kan ändras av oss. Vi har medvetet tagit bort egenskrivna kundcitat från sajten — det säger ingenting om hur vi faktiskt jobbar."
        />
        <div className="container mx-auto px-4 pt-16 pb-20">
          <div className="max-w-4xl">
            <GoogleReviews />
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mt-14">
            {points.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-2xl p-6">
                <p.icon className="w-6 h-6 text-primary mb-4" />
                <h2 className="font-display text-lg text-card-foreground mb-2">{p.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-16">
            <div className="bg-accent rounded-2xl p-8">
              <h2 className="font-display text-2xl text-accent-foreground mb-2">
                Vill du ha ett pris på ditt tak?
              </h2>
              <p className="text-accent-foreground/70 text-sm mb-6">
                Vi kommer ut, tittar på taket och lämnar ett fast pris. Kostnadsfritt.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/offert"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors hover:animate-subtle-pulse"
                >
                  Få offert <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/offert#radgivning"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors hover:animate-subtle-pulse"
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
