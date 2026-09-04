import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import PageHero from "@/components/PageHero";

const QuoteConfigurator = lazy(() => import("@/components/QuoteConfigurator"));
const FreeConsultation = lazy(() => import("@/components/FreeConsultation"));
const FAQ = lazy(() => import("@/components/FAQ"));

const QuotePage = () => {
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
        title="Få offert på takbyte — RoslagsTak"
        description="Räkna fram ett prisförslag på ditt takbyte direkt, eller boka kostnadsfri rådgivning och besiktning i Roslagen och skärgården. 10 års utförandegaranti."
        canonical="https://roslagstak.se/offert"
      />
      <Header />
      <main>
        <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Offert & rådgivning", path: "/offert" }]} withSchema={true} />
        <PageHero
          eyebrow="Offert & rådgivning"
          title="Få pris på ditt takprojekt"
          text="Konfigurera ditt tak själv och få ett prisförslag direkt — eller låt oss ringa upp och boka en kostnadsfri besiktning."
        />
        <Suspense fallback={null}>
          <QuoteConfigurator />
          <FreeConsultation />
          <FAQ />
        </Suspense>
        <RelatedLinks currentPath="/offert" title="Läs vidare innan du bestämmer dig" />
      </main>
      <Footer />
    </>
  );
};

export default QuotePage;
