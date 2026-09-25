import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/consent";

/** Samtyckesruta: två lika stora val, statistik är avstängd tills besökaren godkänner. */
const CookieBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (analytics: boolean) => {
    saveConsent({ analytics, marketing: false });
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-border bg-card p-5 shadow-[0_24px_60px_-20px_rgba(12,35,64,0.45)] md:inset-x-auto md:bottom-5 md:left-5 md:max-w-md"
    >
      <h2 id="cookie-title" className="font-display text-lg text-foreground">
        Cookies på roslagstak.se
      </h2>
      <p id="cookie-text" className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
        Vi använder nödvändig lagring för att sajten ska fungera. Om du godkänner använder vi också statistik från
        Google Analytics för att förstå hur sajten används. Du kan ändra ditt val när som helst.{" "}
        <Link to="/cookies" className="font-medium text-primary underline underline-offset-4">
          Läs mer
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => choose(false)}
          className="rounded-full border-2 border-primary/25 px-4 py-3 text-[14px] font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Endast nödvändiga
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="rounded-full bg-primary px-4 py-3 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Godkänn statistik
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
