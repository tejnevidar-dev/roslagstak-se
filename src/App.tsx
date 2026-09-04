import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import StickyMobileCTA from "./components/StickyMobileCTA";
import JsonLd from "./components/JsonLd";
import { buildLocalBusinessSchema } from "./lib/schema";
import { locationIndex } from "./data/location-index";
import { allServiceSlugs } from "./data/service-slugs";
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
const AreasPage = lazy(() => import("./pages/AreasPage.tsx"));

const queryClient = new QueryClient();

/** Neutral platshållare medan en sidchunk hämtas — ingen layoutförskjutning. */
const RouteFallback = () => <div className="min-h-screen bg-background" aria-busy="true" />;

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <JsonLd data={buildLocalBusinessSchema()} />
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tjanster/taktvatt" element={<Taktvatt />} />
              <Route path="/offert" element={<QuotePage />} />
              <Route path="/taktyper" element={<RoofTypesPage />} />
              <Route path="/hur-det-gar-till" element={<ProcessPage />} />
              <Route path="/tjanster/:slug" element={<ServiceDetail />} />

              <Route path="/recensioner" element={<Reviews />} />
              <Route path="/priser" element={<Prices />} />
              {locationIndex.map((loc) => (
                <Route key={loc.slug} path={`/taklaggare-${loc.slug}`} element={<LocationPage />} />
              ))}
              {allServiceSlugs.flatMap((service) =>
                locationIndex.map((loc) => (
                  <Route
                    key={`${service}-${loc.slug}`}
                    path={`/${service}-${loc.slug}`}
                    element={<ServiceLocationPage />}
                  />
                )),
              )}
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
          <StickyMobileCTA />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
