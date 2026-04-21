import { useState, useEffect } from "react";

const FULL_TEXT = "RoslagsTak";
const SPLIT_INDEX = 7;
const CHAR_DELAY = 200;
const HOLD_AFTER_TYPED = 1200;
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
  const [displayCount, setDisplayCount] = useState(0);
  const [flashIndex, setFlashIndex] = useState(-1);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (displayCount < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setFlashIndex(displayCount);
        setDisplayCount((c) => c + 1);
        setTimeout(() => setFlashIndex(-1), 150);
      }, CHAR_DELAY);
      return () => clearTimeout(timeout);
    } else {
      // Text fully typed — hold, then fade out
      const holdTimeout = setTimeout(() => {
        setFadingOut(true);
        markSplashShown();
        setTimeout(onDone, FADE_DURATION);
      }, HOLD_AFTER_TYPED);
      return () => clearTimeout(holdTimeout);
    }
  }, [displayCount, onDone]);

  const visibleText = FULL_TEXT.slice(0, displayCount);
  const prefix = visibleText.slice(0, SPLIT_INDEX);
  const suffix = visibleText.slice(SPLIT_INDEX);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        opacity: fadingOut ? 0 : 1,
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <h1 className="relative z-10 font-display text-6xl sm:text-8xl lg:text-9xl tracking-tight select-none">
        {prefix.split("").map((ch, i) => (
          <span
            key={i}
            className={
              i === flashIndex && flashIndex < SPLIT_INDEX
                ? "text-primary transition-colors duration-150"
                : "text-white"
            }
          >
            {ch}
          </span>
        ))}
        <span className="text-primary">
          {suffix.split("").map((ch, i) => {
            const globalIndex = SPLIT_INDEX + i;
            return (
              <span
                key={globalIndex}
                className={
                  globalIndex === flashIndex
                    ? "text-white transition-colors duration-150"
                    : ""
                }
              >
                {ch}
              </span>
            );
          })}
        </span>
        {displayCount < FULL_TEXT.length && (
          <span className="animate-pulse text-primary">|</span>
        )}
      </h1>
    </div>
  );
};

export { shouldShowSplash };
export default SplashScreen;
