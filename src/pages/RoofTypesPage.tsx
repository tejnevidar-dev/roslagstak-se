import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

const RoofTypes = lazy(() => import("@/components/RoofTypes"));
const IslandSpecialist = lazy(() => import("@/components/IslandSpecialist"));

const RoofTypesPage = () => {
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
        title="Taktyper — plåttak, tegel & betongpannor | RoslagsTak"
        description="Jämför taktyper: TP20, pannplåt, tegelplåt, dubbelfalsad bandtäckning, lertegel, betongpannor och papptak. Livslängd, för- och nackdelar och pris per m²."
        canonical="https://roslagstak.se/taktyper"
      />
      <Header />
      <main>
        <PageHero
          eyebrow="Taktyper"
          title="Vilket tak passar ditt hus?"
          text="Vi arbetar med alla vanliga taktyper i Roslagen och skärgården. Här jämför du material, livslängd och kostnad."
        />
        <Suspense fallback={null}>
          <RoofTypes />
          <IslandSpecialist />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default RoofTypesPage;
