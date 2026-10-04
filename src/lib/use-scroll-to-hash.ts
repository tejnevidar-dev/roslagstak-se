import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrollar till ankaret i adressen (t.ex. /material/betongpannor#pris) när sidan har ritats. Webbläsarens egen
 * ankarscroll sker före React har ritat avsnittet, så den missar sidor som renderas på klienten. Sidor med
 * lazy-laddade delar ändrar höjd medan de ritas, så scrollen provas några gånger tills ankaret ligger överst.
 */
export const useScrollToHash = (): void => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    let försök = 0;
    const timers: number[] = [];
    const prova = () => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top < 0 || top > 160) el.scrollIntoView({ behavior: "auto", block: "start" });
        else return;
      }
      if (++försök < 6) timers.push(window.setTimeout(prova, 400));
    };
    timers.push(window.setTimeout(prova, 250));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [hash, pathname]);
};
