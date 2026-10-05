import { roofTypeFaqs } from "@/data/roof-type-faqs";
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
