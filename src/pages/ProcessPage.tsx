import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import PageHero from "@/components/PageHero";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

const processFaqs = [
  {
    question: "Hur lång tid tar ett takbyte?",
    answer:
      "Det beror på takets storlek, underlagets skick, antalet genomföringar och kupor och på vädret. Förutsättningarna för ditt tak går vi igenom vid takkontrollen.",
  },
  {
    question: "Behöver jag bygglov för takbyte?",
    answer:
      "För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
  },
  {
    question: "Vilka lager består ett tak av?",
    answer:
      "Underifrån: takstolar, råspont, underlagspapp, ströläkt och bärläkt, därefter takmaterialet — plåt, betongpannor eller tegel. Till det kommer plåtdetaljer som fotplåt, vindskivebeslag, skorstensbeslag samt hängrännor och stuprör.",
  },
  {
    question: "Kan jag bo kvar under takbytet?",
    answer:
      "Ja, i de allra flesta fall bor du kvar. Hur arbetet läggs upp går vi igenom innan start, och du har en kontaktperson genom hela processen.",
  },
  {
    question: "Vad händer om ni hittar röta i råsponten?",
    answer:
      "Skadad råspont syns först när det gamla taket är rivet. Hittar vi något visar vi dig omfattningen och lämnar ett skriftligt pris på tillägget innan vi fortsätter. Inget extraarbete görs utan ditt godkännande. Det enda undantaget är om något akut måste skyddas mot skada, till exempel ett öppet tak inför regn, och vi inte får tag på dig. Då gör vi bara det som är nödvändigt.",
  },
  {
    question: "Vad ingår i slutgenomgången?",
    answer:
      "Vi går igenom taket tillsammans med dig. Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Vilka garantier som gäller för ditt tak står i offerten.",
  },
];


const LayerIntro = lazy(() => import("@/components/LayerIntro"));
const RoofBuildAnimation = lazy(() => import("@/components/RoofBuildAnimation"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const ProcessPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const t = window.setTimeout(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <SEOHead
        title="Så går ett takbyte till — steg för steg | RoslagsTak"
        description="Följ ett takbyte steg för steg: råspont, underlagspapp, hängrännor, vindskivor, läkt, pannor och plåtbeslag. Se filmen och lär dig takets uppbyggnad."
        canonical="https://roslagstak.se/hur-det-gar-till"
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Så går det till", path: "/hur-det-gar-till" },
        ])}
      />
      <Header />
      <main>
        <div className="pt-24">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Så går det till", path: "/hur-det-gar-till" }]} withSchema={false} />
        </div>
        <PageHero
          eyebrow="Så går det till"
          title="Ett takbyte, steg för steg"
          text="Från råspont till färdigt plåtbeslag — se hur vi bygger upp ditt tak lager för lager."
        />
        <Suspense fallback={null}>
          <LayerIntro />
          <RoofBuildAnimation />
          <Testimonials />
        </Suspense>
        <FaqSection
          title="Frågor om hur ett takbyte går till"
          intro="Tid, bygglov, boende under arbetet och vad som händer när vi hittar skador under det gamla taket."
          faqs={processFaqs}
          path="/hur-det-gar-till"
        />
        <RelatedLinks currentPath="/hur-det-gar-till" title="Nästa steg" />
      </main>
      <Footer />
    </>
  );
};

export default ProcessPage;
