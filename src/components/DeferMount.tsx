import { useEffect, useState, type ReactNode } from "react";

/**
 * Monterar en sektion först när webbläsaren är ledig, en sektion per ledig stund (blockeringstid på mobil).
 * Förut renderades hela startsidan i en enda uppgift (ca 600 ms på mobil i Lighthouse); nu delas den i flera korta.
 * Platsen reserveras med minHeight så att inget hoppar, och sektionerna ligger under första skärmen.
 * Finns en #-ankare i adressen (t.ex. /#faq) monteras allt direkt, så att målet finns när sidan skrollar dit.
 */
const queue: Array<() => void> = [];
let running = false;

const idle = (fn: () => void) => {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
  if (w.requestIdleCallback) w.requestIdleCallback(fn, { timeout: 300 });
  else setTimeout(fn, 50);
};

const runNext = () => {
  const job = queue.shift();
  if (!job) {
    running = false;
    return;
  }
  job();
  // Nästa sektion först efter att React har hunnit rendera den förra.
  idle(() => setTimeout(runNext, 0));
};

const enqueue = (job: () => void) => {
  queue.push(job);
  if (!running) {
    running = true;
    idle(runNext);
  }
};

const DeferMount = ({ children, minHeight = 900 }: { children: ReactNode; minHeight?: number }) => {
  const [ready, setReady] = useState(() => typeof window === "undefined" || window.location.hash !== "");

  useEffect(() => {
    if (ready) return;
    let cancelled = false;
    enqueue(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [ready]);

  if (!ready) return <div aria-hidden="true" style={{ minHeight }} />;
  return <>{children}</>;
};

export default DeferMount;
