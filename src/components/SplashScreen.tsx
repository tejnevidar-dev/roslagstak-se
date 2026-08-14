import { useState, useEffect } from "react";
import splashBg from "@/assets/splash-bg.jpg";
import logoWhite from "@/assets/roslagstak-logo-white.png.asset.json";

const HOLD_BEFORE_FADE = 1800;
const FADE_DURATION = 1000;
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes

function shouldShowSplash(): boolean {
  const last = localStorage.getItem("roslagstak_splash_ts");
  if (!last) return true;
  return Date.now() - Number(last) > COOLDOWN_MS;
}

function markSplashShown() {
  localStorage.setItem("roslagstak_splash_ts", String(Date.now()));
}

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reveal = setTimeout(() => setRevealed(true), 60);
    const holdTimeout = setTimeout(() => {
      setFadingOut(true);
      markSplashShown();
      setTimeout(onDone, FADE_DURATION);
    }, HOLD_BEFORE_FADE);
    return () => {
      clearTimeout(reveal);
      clearTimeout(holdTimeout);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        opacity: fadingOut ? 0 : 1,
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
      }}
    >
      <img
        src={splashBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/40" />

      <img
        src={logoWhite.url}
        alt="RoslagsTak logotyp"
        width={1437}
        height={535}
        fetchPriority="high"
        className="relative z-10 w-[78%] max-w-2xl select-none transition-all duration-700 ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1)" : "scale(0.94)",
        }}
      />
    </div>
  );
};

export { shouldShowSplash };
export default SplashScreen;
