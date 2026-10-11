/**
 * Paket 50: "Singö i Grisslehamn" och "på Singö, Grisslehamn" i löpande text blir "Singö". Singö är en ö och Grisslehamn en ort på Väddö.
 * Uppräkningar där de är två platser ändras inte.
 */
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";
import { comboOverrides } from "@/data/combo-overrides";
import { materials } from "@/data/materials";

const alla = () => JSON.stringify({ blogPosts, comboOverrides, materials });

describe("paket 50: Singö och Grisslehamn är två platser", () => {
  it("frasen finns inte i löpande text", () => {
    expect(alla()).not.toMatch(/Singö\s+i\s+Grisslehamn/);
    expect(alla()).not.toMatch(/på\s+Singö,\s+Grisslehamn/);
  });

  it("de ändrade meningarna är de beställda", () => {
    const t = alla();
    expect(t).toContain("Singö ligger drygt en mil bort.");
    expect(t).toContain("röda betongpannor på Singö.");
    expect(t).toContain("På Singö byttes delar av råsponten.");
    expect(t).toContain("takbyte på Singö, med röda betongpannor på huvudtaket");
  });

  it("uppräkningar med Singö och Grisslehamn som två platser står kvar", () => {
    expect(readUppraknade()).toBe(true);
  });
});

import { readFileSync } from "node:fs";
function readUppraknade(): boolean {
  const t = readFileSync("src/data/region-descriptions.ts", "utf8");
  return t.includes("Singö, Grisslehamn, Arholma");
}
