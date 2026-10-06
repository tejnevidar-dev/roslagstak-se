import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
    <Helmet>
      <title>Sidan hittades inte | RoslagsTak</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Sidan kunde inte hittas</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Till startsidan
        </a>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/takkontroll"
            className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
          >
            Kostnadsfri takkontroll
          </a>
          <a
            href="tel:+46701543639"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            070-154 36 39
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default NotFound;
