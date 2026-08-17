import { useState, useEffect, useRef } from "react";
import logoWhite from "@/assets/roslagstak-logo-white.png";

const COUNT_DURATION = 1600;
const FADE_DURATION = 900;
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

function shouldShowSplash(): boolean {
  const last = localStorage.getItem("roslagstak_splash_ts");
  if (!last) return true;
  return Date.now() - Number(last) > COOLDOWN_MS;
}

function markSplashShown() {
  localStorage.setItem("roslagstak_splash_ts", String(Date.now()));
}

/** Cinematic black preloader with a counting percentage and a thin progress rule. */
const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [pct, setPct] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        setFadingOut(true);
        markSplashShown();
        setTimeout(onDone, FADE_DURATION);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black px-8"
      style={{ opacity: fadingOut ? 0 : 1, transition: `opacity ${FADE_DURATION}ms ease-in-out` }}
      aria-hidden="true"
    >
      <img
        src={logoWhite}
        alt=""
        width={1437}
        height={535}
        fetchPriority="high"
        className="w-[62%] max-w-md select-none mb-16 transition-opacity duration-700"
        style={{ opacity: 0.95 }}
      />

      <div className="font-display text-6xl md:text-8xl font-light tracking-tighter text-primary-foreground tabular-nums">
        {pct}
        <span className="text-2xl md:text-4xl align-top">%</span>
      </div>

      <div className="mt-6 w-56 md:w-72 h-px bg-primary-foreground/20 overflow-hidden">
        <div
          className="h-full bg-primary-foreground transition-[width] duration-100 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export { shouldShowSplash };
export default SplashScreen;
