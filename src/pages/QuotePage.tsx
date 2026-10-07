import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import GoogleReviews from "@/components/GoogleReviews";
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
        title="Offert på takbyte — fast pris efter kostnadsfri takkontroll"
        description="Beskriv ditt tak i några steg, så svarar vi inom 24 timmar, eller boka kostnadsfri takkontroll i Roslagen och Storstockholm. 10 års utförandegaranti."
        canonical="https://roslagstak.se/offert"
      />
      <Header />
      <main>
        <div className="pt-24">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Offert & rådgivning", path: "/offert" }]} withSchema={true} />
        </div>
        <PageHero
          eyebrow="Offert & rådgivning"
          title="Få pris på ditt takprojekt"
          text="Beskriv ditt tak i några steg, så svarar vi inom 24 timmar — eller låt oss ringa upp och boka en kostnadsfri takkontroll."
        />
        <Suspense fallback={null}>
          <QuoteConfigurator />
          <FreeConsultation />
          <FAQ />
        </Suspense>
        <GoogleReviews variant="band" />
        <RelatedLinks currentPath="/offert" title="Läs vidare innan du bestämmer dig" />
      </main>
      <Footer />
    </>
  );
};

export default QuotePage;
