import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ConsentChoice, OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/consent";
import { cookieBannerContent as c } from "@/lib/cookie-banner-content";

/** Samtyckesruta: tre val. Statistik och marknadsföring är avstängt tills besökaren godkänner.
 *  Läser samtycket synkront vid första render (inte i en useEffect) så att rutan inte blinkar
 *  till när React tar över från den statiska kopian (se generate-static-heads.mjs). */
const CookieBanner = () => {
  const [open, setOpen] = useState(() => readConsent() === null);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
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
        {c.title}
      </h2>
      <p id="cookie-text" className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
        {c.text}{" "}
        <Link to={c.linkHref} className="font-medium text-primary underline underline-offset-4">
          {c.linkLabel}
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => choose({ analytics: true, marketing: true })}
          className="w-full rounded-full bg-primary px-4 py-3 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {c.acceptAll}
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => choose({ analytics: false, marketing: false })}
            className="rounded-full border-2 border-primary/25 px-4 py-3 text-[14px] font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            {c.necessaryOnly}
          </button>
          <button
            type="button"
            onClick={() => choose({ analytics: true, marketing: false })}
            className="rounded-full border-2 border-primary/25 px-4 py-3 text-[14px] font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            {c.analyticsOnly}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
