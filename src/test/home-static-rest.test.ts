/**
 * Paritet för startsidans övriga sektioner (AC4): referensjobb, Om RoslagsTak, Så jobbar vi, Vart finns vi och Guider & råd.
 * Komponenterna (ReferenceCases, About, ServiceArea, GuidesTeaser) och den statiska HTML:en (scripts/prerender-content.ts) hämtar
 * texten ur samma datamoduler; testet kontrollerar att varje text finns i den statiska sidan och att sektionerna kommer i samma
 * ordning som på sidan. H1 (HeroSection) ingår inte och är orörd.
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";
import { HOME_ABOUT_BENEFITS, HOME_ABOUT_CAPTION, HOME_ABOUT_INTRO, HOME_ABOUT_P1, HOME_ABOUT_P2, HOME_CORE_VALUES, HOME_WORKFLOW, homeAboutP3Text } from "@/data/home-about";
import { HOME_AREA_INTRO, HOME_AREA_PANEL, HOME_AREA_SEO_HEADING, HOME_AREA_SEO_PARAGRAPHS, homeAreaIntroText, stripBold } from "@/data/home-area";
import { HOME_GUIDES, HOME_GUIDES_COUNT, homeGuideLeadCaption, homeGuideReadTime } from "@/data/home-guides";
import { HOME_REFERENS, HOME_REFERENS_ORDER } from "@/data/home-referens";
import { projectTexts } from "@/data/project-texts";
import { regionIntros, regionOrder } from "@/data/regions";
import { locationIndex } from "@/data/location-index";
import { prerenderContent } from "../../scripts/prerender-content";

const page = prerenderContent("/")!;
const lista = page.paragraphs;
const index = (text: string, från = 0) => lista.findIndex((p, i) => i >= från && p === text);

describe("startsidans statiska text: övriga sektioner", () => {
  it("referensjobben har rubrik, kort med etiketter och länkar", () => {
    for (const t of [HOME_REFERENS.eyebrow, HOME_REFERENS.heading, HOME_REFERENS.intro, HOME_REFERENS.readMore, HOME_REFERENS.allLink, HOME_REFERENS.nearLink]) expect(lista, t).toContain(t);
    for (const slug of HOME_REFERENS_ORDER) {
      const c = projectTexts.find((p) => p.slug === slug)!;
      for (const t of [c.locationName, c.title, c.serviceName, c.material, c.metaDescription ?? c.summary, ...(c.area ? [c.area] : []), ...(c.period ? [c.period] : [])]) expect(lista, `${slug}: ${t}`).toContain(t);
    }
  });

  it("Om RoslagsTak och Så jobbar vi", () => {
    const rad = [HOME_ABOUT_CAPTION.eyebrow, HOME_ABOUT_CAPTION.text, HOME_ABOUT_INTRO.eyebrow, `${HOME_ABOUT_INTRO.headingA} ${HOME_ABOUT_INTRO.headingB}`, HOME_ABOUT_P1, HOME_ABOUT_P2, homeAboutP3Text(), ...HOME_ABOUT_BENEFITS, HOME_WORKFLOW.eyebrow, HOME_WORKFLOW.heading, HOME_WORKFLOW.intro, ...HOME_CORE_VALUES.flatMap((v) => [v.title, v.description])];
    for (const t of rad) expect(lista, t.slice(0, 50)).toContain(t);
  });

  it("Vart finns vi: rubrik, panel, varje region med beskrivning och SEO-texten utan fetstilsmarkering", () => {
    const regioner = regionOrder.filter((r) => locationIndex.some((l) => l.region === r));
    const rad = [HOME_AREA_INTRO.eyebrow, `${HOME_AREA_INTRO.headingA} ${HOME_AREA_INTRO.headingB}`, homeAreaIntroText(regioner.length), HOME_AREA_PANEL.label, HOME_AREA_PANEL.unit, HOME_AREA_PANEL.workflow, `${HOME_AREA_PANEL.islandLead} ${HOME_AREA_PANEL.islandText}`, HOME_AREA_PANEL.allLink, HOME_AREA_SEO_HEADING, ...regioner.flatMap((r) => [r, regionIntros[r] ?? ""]), ...HOME_AREA_SEO_PARAGRAPHS.map(stripBold)];
    for (const t of rad) expect(lista, t.slice(0, 50)).toContain(t);
    for (const p of HOME_AREA_SEO_PARAGRAPHS) expect(stripBold(p)).not.toContain("**");
  });

  it("Guider & råd: de sex första inläggen med titel, ingress och lästid", () => {
    const f = blogPosts.slice(0, HOME_GUIDES_COUNT);
    for (const t of [HOME_GUIDES.eyebrow, `${HOME_GUIDES.headingA} ${HOME_GUIDES.headingB}`, HOME_GUIDES.allLink, HOME_GUIDES.leadReadMore, homeGuideLeadCaption(f[0]), ...f.flatMap((p) => [p.title, p.excerpt]), ...f.slice(1).map(homeGuideReadTime)]) expect(lista, t.slice(0, 50)).toContain(t);
  });

  it("sektionerna kommer i samma ordning som på sidan", () => {
    const ordning = [HOME_REFERENS.eyebrow, "Våra tjänster", HOME_ABOUT_CAPTION.eyebrow, HOME_AREA_INTRO.eyebrow, HOME_GUIDES.eyebrow].map((t) => index(t));
    expect(ordning.every((i) => i >= 0), `hittade ${JSON.stringify(ordning)}`).toBe(true);
    expect([...ordning].sort((a, b) => a - b)).toEqual(ordning);
  });
});

describe("startsidans områdestext: länkar (design/startsida-lankar)", () => {
  it("de fyra länkarna står som text utan länksyntax i den statiska texten och som länkar i länklistan", () => {
    const sida = prerenderContent("/")!;
    const text = sida.paragraphs.join("\n");
    expect(text).not.toContain("](/");
    for (const t of ["takläggare i Stockholm", "takomläggning i Norrtälje", "takbyte i Solna", "takbyte i Stockholm"]) expect(text).toContain(t);
    const href = sida.links.map((l) => l.href);
    for (const h of ["/taklaggare-stockholm", "/takomlaggning-norrtalje", "/takbyte-solna", "/takbyte-stockholm"]) expect(href).toContain(h);
  });
});
