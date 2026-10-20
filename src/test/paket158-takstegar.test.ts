/**
 * Paket 158 (Marknadschefens grind 2026-10-20, innehall/takstege-briefrader-2026-10-20.md): takstegarna, "takstege … roslagen".
 * Taksäkerhetssidan (ingress, avsnitt, fråga), guiden (avsnitt med länk, fråga) och en fråga med länk på /takbyte-norrtalje. Inga priser, produktnamn, mått eller regler i de nya meningarna.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { taksakerhetBlocks } from "../data/service-taksakerhet";
import { blogPosts } from "../data/blog-posts";
import { comboOverrides } from "../data/combo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const services = readFileSync(resolve(__dirname, "../components/Services.tsx"), "utf8");

describe("paket 158: takstegarna", () => {
  it("taksäkerhetssidan: Roslagen i ingressen, avsnittet om tegeltak, pannor och plåt, och frågan om plåttak och tegeltak", () => {
    expect(services).toContain("antingen i samband med ett takbyte eller som ett eget arbete. Vi har vår bas i Norrtälje och tar uppdrag i Roslagen och Storstockholm.");
    const grupper = taksakerhetBlocks.block.groups;
    const g = grupper.find((x) => x.title === "Takstege på tegeltak, pannor och plåt");
    expect(g?.items[0]).toContain("När huset i Grisslehamn fick ett nytt tak med svarta betongpannor monterades taksteg i samma arbete.");
    expect(grupper.flatMap((x) => x.items).some((i) => i.startsWith("Kan ni sätta takstege på ett plåttak eller ett tegeltak? Hur takstegen kan fästas beror på takmaterialet"))).toBe(true);
    const c = prerenderContent("/tjanster/taksakerhet")!;
    const text = JSON.stringify(c.paragraphs);
    expect(text).toContain("Takstege på tegeltak, pannor och plåt");
    expect(text).toContain("tar uppdrag i Roslagen och Storstockholm");
  });
  it("guiden: avsnittet med länk till tjänstesidan och frågan om plåttak", () => {
    const p = blogPosts.find((b) => b.slug === "takstege-takbrygga-sakerhet")!;
    const i = p.content.indexOf("## På tegeltak, pannor och plåt");
    expect(i).toBeGreaterThan(-1);
    expect(p.content[i + 1]).toContain("[takstege, gångbrygga och snörasskydd](/tjanster/taksakerhet)");
    expect(p.content.some((x) => x.startsWith("**Går det att sätta takstege på ett plåttak?**"))).toBe(true);
  });
  it("/takbyte-norrtalje: frågan om takstege vid takbyte, med länk till tjänstesidan, direkt efter frågan om fast pris", () => {
    const c = comboOverrides["takbyte-norrtalje"].content;
    const i = c.findIndex((x) => x.startsWith("**Är priset fast?**"));
    expect(c[i + 1]).toContain("**Kan takstege monteras samtidigt som taket byts?**");
    expect(c[i + 1]).toContain("(/tjanster/taksakerhet)");
    expect(JSON.stringify(prerenderContent("/takbyte-norrtalje")!.paragraphs)).toContain("Kan takstege monteras samtidigt som taket byts?"); // länken ritas i React (renderInline); serverns text är utan markdown
  });
  it("inga belopp i de nya meningarna", () => {
    const nya = [taksakerhetBlocks.block.groups[0].items[0], "Kan ni sätta takstege på ett plåttak eller ett tegeltak? Hur takstegen kan fästas beror på takmaterialet", comboOverrides["takbyte-norrtalje"].content.find((x) => x.startsWith("**Kan takstege monteras"))!];
    for (const t of nya) expect(t).not.toMatch(/ds?kr|ds?000/);
  });
});
