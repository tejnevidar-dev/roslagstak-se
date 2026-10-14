import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LazyMotion } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index.tsx";
import StickyMobileCTA from "./components/StickyMobileCTA";
import CookieBanner from "./components/CookieBanner";
import DeferMount from "./components/DeferMount";
import TakkontrollAnkare from "./components/TakkontrollAnkare";
import PixelPageViewTracker from "./components/PixelPageViewTracker";
import { resolveTopLevelSlug, resolveOffertSlug, resolveBrfSlug } from "./lib/route-resolve";
import { CANONICAL_ALIASES } from "./lib/canonical";

/* Alla sidor utom startsidan laddas som egna chunkar — startsidans JS blir mindre
   och varje undersida hämtar bara sin egen kod (bättre LCP/INP på mobil). */
const ServiceDetail = lazy(() => import("./pages/ServiceDetail.tsx"));
const Reviews = lazy(() => import("./pages/Reviews.tsx"));
const LocationPage = lazy(() => import("./pages/LocationPage.tsx"));
const ServiceLocationPage = lazy(() => import("./pages/ServiceLocationPage.tsx"));
const Prices = lazy(() => import("./pages/Prices.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Taktvatt = lazy(() => import("./pages/Taktvatt.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.tsx"));
const AdminSeo = lazy(() => import("./pages/AdminSeo.tsx"));
const ContactLanding = lazy(() => import("./pages/ContactLanding.tsx"));
const QuotePage = lazy(() => import("./pages/QuotePage.tsx"));
const RoofTypesPage = lazy(() => import("./pages/RoofTypesPage.tsx"));
const ProcessPage = lazy(() => import("./pages/ProcessPage.tsx"));
const BrfPage = lazy(() => import("./pages/BrfPage.tsx"));
const BrfLocationPage = lazy(() => import("./pages/BrfLocationPage.tsx"));
const AdLandingPage = lazy(() => import("./pages/AdLandingPage.tsx"));
const CookiesPage = lazy(() => import("./pages/CookiesPage.tsx"));
const ServiceLandingPage = lazy(() => import("./pages/ServiceLandingPage.tsx"));
const AreasPage = lazy(() => import("./pages/AreasPage.tsx"));
const RegionPage = lazy(() => import("./pages/RegionPage.tsx"));
const BookingPage = lazy(() => import("./pages/BookingPage.tsx"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage.tsx"));
const ProjectPage = lazy(() => import("./pages/ProjectPage.tsx"));
const ProblemsPage = lazy(() => import("./pages/ProblemsPage.tsx"));
const ProblemPage = lazy(() => import("./pages/ProblemPage.tsx"));
const MaterialsPage = lazy(() => import("./pages/MaterialsPage.tsx"));
const MaterialPage = lazy(() => import("./pages/MaterialPage.tsx"));

/** Animationsfunktionerna (layout, gester) hämtas i en egen chunk efter första målningen i stället för att ligga i huvudbunten. */
/* Hämtas när webbläsaren är ledig, så att de ~83 kB inte konkurrerar med sidans första rendering (TBT). */
const whenIdle = (fn: () => void) =>
  typeof window !== "undefined" && "requestIdleCallback" in window
    ? (window as Window & { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback(fn, { timeout: 2500 })
    : setTimeout(fn, 800);
const loadMotionFeatures = () =>
  new Promise<typeof import("./lib/motion-features").default>((resolve) =>
    whenIdle(() => import("./lib/motion-features").then((mod) => resolve(mod.default))),
  );

/* Ruttabellen (paket 89): i stället för drygt 2 100 egna rutter (en per ort, en per tjänst × ort, en per annonssida och BRF-ort) finns tre parameterrutter.
   Vilken sida en adress ger avgörs av lib/route-resolve.ts med samma listor som förut, och en okänd adress ger samma NotFound som "*" gav. */
const TopLevelRoute = () => {
  const { slug = "" } = useParams();
  const sida = resolveTopLevelSlug(slug);
  return sida === "ort" ? <LocationPage /> : sida === "tjanst-ort" ? <ServiceLocationPage /> : <NotFound />;
};
const OffertRoute = () => (resolveOffertSlug(useParams().slug ?? "") ? <AdLandingPage /> : <NotFound />);
const BrfRoute = () => (resolveBrfSlug(useParams().slug ?? "") ? <BrfLocationPage /> : <NotFound />);

/** Neutral platshållare medan en sidchunk hämtas — ingen layoutförskjutning. */
const RouteFallback = () => <div className="min-h-screen bg-background" aria-busy="true" />;

const App = () => (
  <HelmetProvider>
    <LazyMotion features={loadMotionFeatures} strict>
        {/* Toasts syns först efter en användaråtgärd: de monteras när webbläsaren är ledig, inte i första renderingen. */}
        <DeferMount minHeight={0}>
          <Toaster />
          <Sonner />
        </DeferMount>
        {/* Fas 2.19: LocalBusiness, Organization, WebSite och WebPage skrivs i den statiska <head> av generate-static-heads.mjs (en källa, lib/schema-graph.ts + lib/schema.ts). */}
        <BrowserRouter>
          <TakkontrollAnkare />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tjanster/taktvatt" element={<Taktvatt />} />
              <Route path="/offert" element={<QuotePage />} />
              <Route path="/taktyper" element={<RoofTypesPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/takreparation" element={<ServiceLandingPage slug="takreparation" />} />
              <Route path="/takkontroll" element={<ServiceLandingPage slug="takkontroll" />} />
              <Route path="/rot-avdrag" element={<ServiceLandingPage slug="rot-avdrag" />} />
              <Route path="/akut-lackage" element={<ServiceLandingPage slug="akut-lackage" />} />
              <Route path="/hangrannor" element={<ServiceLandingPage slug="hangrannor" />} />
              <Route path="/platslagare" element={<ServiceLandingPage slug="platslagare" />} />
              <Route path="/takbyte-var-2027" element={<ServiceLandingPage slug="takbyte-var-2027" />} />
              <Route path="/boka-takkontroll" element={<BookingPage />} />
              <Route path="/projekt" element={<ProjectsPage />} />
              <Route path="/projekt/:slug" element={<ProjectPage />} />
              <Route path="/takproblem" element={<ProblemsPage />} />
              <Route path="/takproblem/:slug" element={<ProblemPage />} />
              <Route path="/material" element={<MaterialsPage />} />
              <Route path="/material/:slug" element={<MaterialPage />} />
              <Route path="/brf" element={<BrfPage />} />
              <Route path="/offert/:slug" element={<OffertRoute />} />
              <Route path="/brf/:slug" element={<BrfRoute />} />
              <Route path="/hur-det-gar-till" element={<ProcessPage />} />
              <Route path="/omraden" element={<AreasPage />} />
              <Route path="/omraden/:region" element={<RegionPage />} />
              <Route path="/tjanster/:slug" element={<ServiceDetail />} />

              <Route path="/recensioner" element={<Reviews />} />
              <Route path="/priser" element={<Prices />} />
              <Route path="/:slug" element={<TopLevelRoute />} />
              <Route path="/blogg" element={<Blog />} />
              <Route path="/blogg/:slug" element={<BlogPost />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/seo" element={<AdminSeo />} />
              <Route path="/kontakt" element={<ContactLanding />} />
              {/* Dubblett-/gamla URL:er pekas om till kanonisk version (replace = ingen historik-loop). */}
              {Object.entries(CANONICAL_ALIASES).map(([alias, target]) => (
                <Route key={alias} path={alias} element={<Navigate to={target} replace />} />
              ))}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <DeferMount minHeight={0}>
            <StickyMobileCTA />
          </DeferMount>
          <CookieBanner />
          <PixelPageViewTracker />
        </BrowserRouter>
    </LazyMotion>
  </HelmetProvider>
);

export default App;
