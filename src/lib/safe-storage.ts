/**
 * Lagring som aldrig kastar (paket 45). Med alla kakor blockerade (Chrome) kastar själva åtkomsten `window.localStorage` och `window.sessionStorage`
 * ett SecurityError. Koden i appen läser lagringen i try/catch, men bibliotek gör det inte: Supabase-klientens realtimedel (@supabase/phoenix) läser
 * `global.sessionStorage` när klienten skapas, och då kunde ingen formulärinlämning ens ladda databasklienten. Besökaren kunde inte lämna en förfrågan.
 *
 * `installSafeStorage()` provar åtkomsten en gång vid start. Kastar den ersätts just det lagret på `window` av ett lager i minnet: läsning ger "inget sparat",
 * skrivning gäller bara medan sidan är öppen och försvinner vid omladdning (inget lämnar webbläsaren). Då beter sig sajten som med "Endast nödvändiga":
 * inget sparas, formulären skickar tomma attributionsfält, och kakrutan visas vid varje sidvisning eftersom valet inte kan sparas. Fungerar lagringen
 * rör funktionen ingenting.
 *
 * Körs som allra första import i main.tsx (safe-storage-init.ts), före alla bibliotek.
 */
export const minneslager = (): Storage => {
  const m = new Map<string, string>();
  return {
    get length() {
      return m.size;
    },
    clear: () => m.clear(),
    getItem: (k: string) => (m.has(k) ? (m.get(k) as string) : null),
    key: (i: number) => [...m.keys()][i] ?? null,
    removeItem: (k: string) => void m.delete(k),
    setItem: (k: string, v: string) => void m.set(String(k), String(v)),
  } as Storage;
};

/** Ersätter de lager på `w` vars åtkomst kastar, och returnerar namnen på dem som ersattes. */
export const installSafeStorage = (w: Window = window): string[] => {
  const ersatta: string[] = [];
  for (const namn of ["localStorage", "sessionStorage"] as const) {
    let kastar = false;
    try {
      void w[namn];
    } catch {
      kastar = true;
    }
    if (!kastar) continue;
    try {
      Object.defineProperty(w, namn, { configurable: true, enumerable: true, value: minneslager() });
      ersatta.push(namn);
    } catch {
      /* egenskapen går inte att ersätta: då gäller de befintliga skydden i koden */
    }
  }
  return ersatta;
};
