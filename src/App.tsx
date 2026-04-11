import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import Reviews from "./pages/Reviews.tsx";
import LocationPage from "./pages/LocationPage.tsx";
import ServiceLocationPage from "./pages/ServiceLocationPage.tsx";
import Prices from "./pages/Prices.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import NotFound from "./pages/NotFound.tsx";
import StickyMobileCTA from "./components/StickyMobileCTA";
import { locations } from "./data/locations";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tjanster/:slug" element={<ServiceDetail />} />
            <Route path="/recensioner" element={<Reviews />} />
            <Route path="/priser" element={<Prices />} />
            {locations.map((loc) => (
              <Route key={loc.slug} path={`/taklaggare-${loc.slug}`} element={<LocationPage />} />
            ))}
            {locations.map((loc) => (
              <Route key={`takbyte-${loc.slug}`} path={`/takbyte-${loc.slug}`} element={<ServiceLocationPage />} />
            ))}
            {locations.map((loc) => (
              <Route key={`takrenovering-${loc.slug}`} path={`/takrenovering-${loc.slug}`} element={<ServiceLocationPage />} />
            ))}
            <Route path="/blogg" element={<Blog />} />
            <Route path="/blogg/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <StickyMobileCTA />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
