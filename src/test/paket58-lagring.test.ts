/**
 * Paket 58: lagringen får aldrig fälla startsidan. SplashScreen läser och skriver localStorage i try/catch.
 */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { shouldShowSplash } from "@/components/SplashScreen";

const kastande = () =>
  ({
    getItem: () => {
      throw new DOMException("blockerad", "SecurityError");
    },
    setItem: () => {
      throw new DOMException("full", "QuotaExceededError");
    },
  }) as unknown as Storage;

describe("paket 58: SplashScreen och lagring", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("shouldShowSplash kastar inte när lagringen kastar, och visar splashen", () => {
    vi.stubGlobal("localStorage", kastande());
    expect(() => shouldShowSplash()).not.toThrow();
    expect(shouldShowSplash()).toBe(true);
  });
  it("shouldShowSplash gör som förut när lagringen fungerar: ny besökare visas, nyligen visad döljs, gammal visas", () => {
    const m = new Map<string, string>();
    vi.stubGlobal("localStorage", { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) });
    expect(shouldShowSplash()).toBe(true);
    m.set("roslagstak_splash_ts", String(Date.now() - 60_000));
    expect(shouldShowSplash()).toBe(false);
    m.set("roslagstak_splash_ts", String(Date.now() - 11 * 60_000));
    expect(shouldShowSplash()).toBe(true);
  });
  it("skrivningen markSplashShown ligger i try/catch", () => {
    const k = readFileSync("src/components/SplashScreen.tsx", "utf8").replace(/\r\n/g, "\n");
    expect(k).toMatch(/function markSplashShown\(\) \{\n  try \{\n    localStorage\.setItem\([^\n]*\n  \} catch \{/);
  });
});
