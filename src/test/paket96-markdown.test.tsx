/**
 * Paket 96: markdown-syntax ska aldrig synas som text för besökaren. Fet text kan innehålla en länk ("**[TP20-plåt](/material/tp20-plattak):** från …"); renderInline ritade förut hela det feta
 * som ren text, så hakparenteser och adress syntes på bloggen (sedan importen av guiderna 2026-10-03). Provet ritar all text som går genom renderInline och kräver att ingen syntax är kvar.
 */
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { describe, expect, it } from "vitest";
import { renderInline, stripInlineMd } from "@/lib/inline-md";
import { blogPosts } from "@/data/blog-posts";
import { guideContent } from "@/data/blog-cta";
import { projectTexts } from "@/data/project-texts";

const html = (text: string) => renderToStaticMarkup(<StaticRouter location="/"><p>{renderInline(text)}</p></StaticRouter>);
const synlig = (h: string) => h.replace(/<[^>]+>/g, "").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

describe("paket 96: renderInline ritar länkar inuti fet text", () => {
  it("**[text](/länk):** blir fet text med en länk, inte rå syntax", () => {
    const h = html("**[TP20-plåt](/material/tp20-plattak):** från 1 200 kr/m², efter ROT-avdrag.");
    expect(h).toContain('<strong class="font-semibold text-foreground"><a ');
    expect(h).toContain('href="/material/tp20-plattak"');
    expect(synlig(h)).toBe("TP20-plåt: från 1 200 kr/m², efter ROT-avdrag.");
    expect(synlig(h)).not.toMatch(/\]\(|\*\*/);
  });
  it("vanlig fet text, vanlig länk och blandning är som förut", () => {
    expect(synlig(html("**Fet** och [länk](/x) och text."))).toBe("Fet och länk och text.");
    expect(html("**Fet**")).toContain("<strong");
    expect(html("[länk](/x)")).toContain('href="/x"');
    expect(synlig(html("En [extern](https://example.com) länk."))).toBe("En extern länk.");
  });
  it("fet text med flera delar (text och länk) ritas i ett fett element", () => {
    const h = html("**Så arbetar vi, se [takkontroll](/takkontroll).** Mer text.");
    expect(h).toMatch(/<strong[^>]*>Så arbetar vi, se <a [^>]*href="\/takkontroll"[^>]*>takkontroll<\/a>\.<\/strong>/);
  });
});

describe("paket 96: ingen markdown-syntax syns i bloggens och projektens texter", () => {
  it("varje stycke i varje blogginlägg (som BlogPost ritar dem) är fritt från ](, [ och **", () => {
    const fel: string[] = [];
    for (const post of blogPosts) {
      for (const p of guideContent(post)) {
        if (p.startsWith("## ")) continue;
        const t = synlig(html(p));
        if (/\]\(|\*\*|\[[^\]]+\]/.test(t)) fel.push(`${post.slug}: ${t.slice(0, 80)}`);
      }
    }
    expect(fel).toEqual([]);
  });
  it("varje stycke i projektens beskrivning är fritt från syntax", () => {
    const fel: string[] = [];
    for (const pr of projectTexts) for (const p of pr.description) { const t = synlig(html(p)); if (/\]\(|\*\*/.test(t)) fel.push(`${pr.slug}: ${t.slice(0, 80)}`); }
    expect(fel).toEqual([]);
  });
  it("serverns text (stripInlineMd) och besökarens text är samma för varje blogginlägg", () => {
    const fel: string[] = [];
    for (const post of blogPosts) for (const p of guideContent(post)) {
      if (p.startsWith("## ")) continue;
      if (synlig(html(p)).replace(/\s+/g, " ").trim() !== stripInlineMd(p).replace(/\s+/g, " ").trim()) fel.push(`${post.slug}: ${p.slice(0, 60)}`);
    }
    expect(fel).toEqual([]);
  });
});
