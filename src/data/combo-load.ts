/**
 * Gren 192: laddar en tjänst × ort-sidas egen text (src/data/combos/<nyckel>.ts, genererade av scripts/generate-location-split.ts) när sidan öppnas.
 * useCombo kastar ett löfte tills texten är laddad (React Suspense, som useOrt i location-load.ts). Bara för webbläsaren (import.meta.glob).
 */
import type { ComboOverride } from "./combo-overrides";
import { harComboOverride } from "./combo-keys";

const moduler = import.meta.glob<{ default: ComboOverride }>("./combos/*.ts");
const cache = new Map<string, ComboOverride>();
const vantar = new Map<string, Promise<void>>();

/** Sidans egen text, eller undefined när den saknar egen text. Kastar ett löfte medan texten laddas. */
export const useCombo = (key: string): ComboOverride | undefined => {
  if (!harComboOverride(key)) return undefined;
  const klar = cache.get(key);
  if (klar) return klar;
  const lader = moduler[`./combos/${key}.ts`];
  if (!lader) return undefined;
  let p = vantar.get(key);
  if (!p) {
    p = lader().then((m) => {
      cache.set(key, m.default);
    });
    vantar.set(key, p);
  }
  throw p;
};
