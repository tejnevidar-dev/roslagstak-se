/**
 * Paket 74b (huvudbiten): QueryClientProvider och TooltipProvider låg monterade i App.tsx fast ingen sida använder dem. Testet håller sökningen som
 * motiverade borttagningen: ingen fil i src/ använder react-query (hooks eller klient), och ingen fil utanför ui-mappen använder <Tooltip>.
 * Fäller det här, lägg tillbaka respektive provider i App.tsx tillsammans med den nya användningen.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const filer = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? filer(p) : /\.(tsx?|jsx?|mjs)$/.test(f) ? [p] : [];
  });
const kallor = filer("src").filter((f) => !f.includes(join("src", "test")));
const text = (f: string) => readFileSync(f, "utf8");

describe("paket 74b: oanvända providers", () => {
  it("App.tsx monterar varken QueryClientProvider eller TooltipProvider", () => {
    const app = text("src/App.tsx");
    expect(app).not.toMatch(/QueryClient|@tanstack\/react-query/);
    expect(app).not.toMatch(/TooltipProvider|ui\/tooltip/);
  });
  it("ingen fil i src/ använder react-query", () => {
    const traffar = kallor.filter((f) => /@tanstack\/react-query|useQuery\(|useMutation\(|useQueryClient\(|useInfiniteQuery\(/.test(text(f)));
    expect(traffar).toEqual([]);
  });
  it("ingen fil utanför src/components/ui/ importerar tooltip-komponenterna eller sidebar/chart som bär dem", () => {
    const utanfor = kallor.filter((f) => !f.includes(join("components", "ui")));
    const traffar = utanfor.filter((f) => /components\/ui\/(tooltip|sidebar|chart)["']|<Tooltip[ >]|<TooltipProvider/.test(text(f)));
    expect(traffar).toEqual([]);
  });
  it("sidebar har sin egen TooltipProvider, så den fungerar om den tas i bruk", () => {
    expect(text("src/components/ui/sidebar.tsx")).toContain("<TooltipProvider");
  });
});
