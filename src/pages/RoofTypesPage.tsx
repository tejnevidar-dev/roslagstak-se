import { beloppLopande, withRotForbehall } from "@/data/prices";
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

const roofTypeFaqs = [
  {
    question: "Vad avgör hur länge ett tak fungerar?",
    answer:
      "Det som oftast avgör är underlaget, läkten och detaljerna runt skorsten och genomföringar, inte bara ytmaterialet. Tillverkarens uppgifter gäller för själva materialet.",
  },
  {
    question: "Vad kostar de olika taktyperna per kvadratmeter?",
    answer: withRotForbehall(
      `Som riktpris, efter ROT-avdrag och inkl. moms: papptak ${beloppLopande("Papptak")}, TP20-plåt ${beloppLopande("TP20 plåttak")}, betongpannor ${beloppLopande("Betongpannetak")}, lertegel ${beloppLopande("Lertegeltak")}, pannplåt ${beloppLopande("Pannplåttak")}, dubbelfalsat plåttak ${beloppLopande("Dubbelfalsat plåttak")}. Exakt pris beror på takets storlek, lutning och underlagets skick. Du får ett fast pris i offerten efter en kostnadsfri takkontroll.`,
    ),
  },
  {
    question: "Vilket material passar mitt hus?",
    answer:
      "Det beror på taket, lutningen, huset och uttrycket du vill ha. Vilka alternativ som finns för ditt tak går vi igenom vid takkontrollen.",
  },
  {
    question: "Kan jag lägga plåttak direkt på gamla betongpannor?",
    answer:
      "Det gör vi inte. Vid ett takbyte rivs det gamla takmaterialet, och skadad råspont syns först när det gamla taket är rivet.",
  },
  {
    question: "Vilken taklutning krävs för de olika materialen?",
    answer:
      "Det beror på materialet och modellen. Varje tillverkare anger en lägsta lutning för sina produkter. Papptak är ett av få material som fungerar på riktigt flacka tak.",
  },
  {
    question: "Hur låter ett plåttak vid regn?",
    answer:
      "Det går vi igenom i guiden [plåttak och ljud vid regn](/blogg/platttak-ljud-regn-skargardshus).",
  },
];

const RoofTypes = lazy(() => import("@/components/RoofTypes"));
const IslandSpecialist = lazy(() => import("@/components/IslandSpecialist"));

const RoofTypesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const t = window.setTimeout(() => {
      document
        .querySelector(location.hash)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <SEOHead
        title="Taktyper – jämför takmaterial för villa"
        description="Jämför taktyper: betongpannor, lertegel, TP20-plåt, pannplåt, dubbelfalsad plåt och papptak. Riktpriser efter ROT och mer om varje material."
        canonical="https://roslagstak.se/taktyper"
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Taktyper", path: "/taktyper" },
        ])}
      />
      <Header />
      <main>
        <div className="pt-24">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Taktyper", path: "/taktyper" }]} withSchema={false} />
        </div>
        <PageHero
          eyebrow="Taktyper"
          title="Vilket tak passar ditt hus?"
          text="Vi lägger betongpannor, lertegel, TP20-plåt, pannplåt, dubbelfalsad plåt (bandtäckning) och papptak. Här ser du materialen sida vid sida, med riktpris och länk till mer om vart och ett."
        />
        <Suspense fallback={null}>
          <RoofTypes />
          <IslandSpecialist />
        </Suspense>
        <FaqSection
          title="Frågor om taktyper och material"
          intro="Pris, taklutning och vad som avgör valet av material."
          faqs={roofTypeFaqs}
          path="/taktyper"
        />
        <RelatedLinks currentPath="/taktyper" title="Mer om tak och pris" />
      </main>
      <Footer />
    </>
  );
};

export default RoofTypesPage;
