import { describe, expect, it } from "vitest";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
  services,
  SITE_URL,
} from "@/lib/schema";
import { CANONICAL_ALIASES, canonicalUrl, canonicalPath } from "@/lib/canonical";

/** Rich-result-krav: inga tomma värden, inga relativa URL:er, korrekta @type. */
const isAbsoluteUrl = (value: unknown) =>
  typeof value === "string" && /^https:\/\//.test(value);

const collectStrings = (node: unknown): string[] => {
  if (typeof node === "string") return [node];
  if (Array.isArray(node)) return node.flatMap(collectStrings);
  if (node && typeof node === "object") return Object.values(node).flatMap(collectStrings);
  return [];
};

describe("LocalBusiness-schema", () => {
  const schema = buildLocalBusinessSchema() as Record<string, any>;

  it("har obligatoriska fält för lokalt företag", () => {
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("RoofingContractor");
    expect(schema.name).toBeTruthy();
    expect(schema.telephone).toMatch(/^\+46\d{6,}$/);
    expect(isAbsoluteUrl(schema.url)).toBe(true);
    expect(isAbsoluteUrl(schema.image)).toBe(true);
    expect(schema.address["@type"]).toBe("PostalAddress");
    expect(schema.address.addressCountry).toBe("SE");
    expect(typeof schema.geo.latitude).toBe("number");
    expect(typeof schema.geo.longitude).toBe("number");
  });

  it("har giltiga öppettider", () => {
    for (const spec of schema.openingHoursSpecification) {
      expect(spec["@type"]).toBe("OpeningHoursSpecification");
      expect(spec.opens).toMatch(/^\d{2}:\d{2}$/);
      expect(spec.closes).toMatch(/^\d{2}:\d{2}$/);
    }
  });

  it("listar alla tjänster med absoluta @id:n och beskrivning", () => {
    const offers = schema.hasOfferCatalog.itemListElement;
    expect(offers).toHaveLength(services.length);
    for (const offer of offers) {
      expect(offer["@type"]).toBe("Offer");
      expect(offer.itemOffered["@type"]).toBe("Service");
      expect(isAbsoluteUrl(offer.itemOffered["@id"])).toBe(true);
      expect(offer.itemOffered.name.length).toBeGreaterThan(2);
      expect(offer.itemOffered.description.length).toBeGreaterThan(20);
      expect(offer.itemOffered.provider["@id"]).toBe(schema["@id"]);
    }
  });

  it("anger areaServed utan dubbletter eller tomma namn", () => {
    const names = schema.areaServed.map((a: any) => a.name);
    expect(names.length).toBeGreaterThan(50);
    expect(new Set(names).size).toBe(names.length);
    expect(names.every((n: string) => n && n.trim() === n)).toBe(true);
  });

  it("innehåller inga tomma strängar någonstans", () => {
    expect(collectStrings(schema).some((s) => s.trim() === "")).toBe(false);
  });

  it("kan serialiseras till giltig JSON-LD", () => {
    expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
  });
});

describe("FAQPage-schema", () => {
  const faqs = [
    { question: "Vad kostar ett takbyte?", answer: "Priset sätts efter besiktning av taket." },
    { question: "Hur lång tid tar det?", answer: "Ett normalt villatak tar 1–2 veckor." },
  ];

  it("speglar frågorna som visas på sidan", () => {
    const schema = buildFaqSchema(faqs, `${SITE_URL}/offert`) as Record<string, any>;
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema["@id"]).toBe(`${SITE_URL}/offert#faq`);
    expect(schema.inLanguage).toBe("sv-SE");
    expect(schema.mainEntity).toHaveLength(faqs.length);
    schema.mainEntity.forEach((q: any, i: number) => {
      expect(q["@type"]).toBe("Question");
      expect(q.name).toBe(faqs[i].question);
      expect(q.acceptedAnswer["@type"]).toBe("Answer");
      expect(q.acceptedAnswer.text).toBe(faqs[i].answer);
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(10);
    });
  });

  it("utelämnar @id när ingen sidsökväg anges", () => {
    const schema = buildFaqSchema(faqs) as Record<string, any>;
    expect(schema["@id"]).toBeUndefined();
    expect(schema.url).toBeUndefined();
  });
});

describe("BreadcrumbList-schema", () => {
  const pages: { name: string; path: string }[][] = [
    [
      { name: "Hem", path: "/" },
      { name: "Tjänster", path: "/tjanster/takomlaggning" },
    ],
    [
      { name: "Hem", path: "/" },
      { name: "Priser", path: "/priser" },
    ],
    [
      { name: "Hem", path: "/" },
      { name: "Offert & rådgivning", path: "/offert" },
    ],
    [
      { name: "Hem", path: "/" },
      { name: "Taktyper", path: "/taktyper" },
    ],
    [
      { name: "Hem", path: "/" },
      { name: "Så går det till", path: "/hur-det-gar-till" },
    ],
  ];

  it.each(pages)("bygger giltig kedja för %s", (...items) => {
    const schema = buildBreadcrumbSchema(items) as Record<string, any>;
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement.length).toBe(items.length);
    schema.itemListElement.forEach((entry: any, i: number) => {
      expect(entry["@type"]).toBe("ListItem");
      expect(entry.position).toBe(i + 1);
      expect(entry.name).toBeTruthy();
      expect(isAbsoluteUrl(entry.item)).toBe(true);
    });
    // Första steget ska alltid vara startsidan, sista steget aktuell sida.
    expect(schema.itemListElement[0].item).toBe(`${SITE_URL}/`);
  });

  it("pekar alltid på kanoniska URL:er, aldrig på alias", () => {
    for (const alias of Object.keys(CANONICAL_ALIASES)) {
      const schema = buildBreadcrumbSchema([
        { name: "Hem", path: "/" },
        { name: "Sida", path: canonicalPath(alias) },
      ]) as Record<string, any>;
      const last = schema.itemListElement[1].item;
      expect(last).toBe(canonicalUrl(alias));
      expect(last).not.toBe(`${SITE_URL}${alias}`);
    }
  });
});
