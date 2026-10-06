import { describe, expect, it } from "vitest";
import { ankareMal } from "@/lib/takkontroll-ankare";

describe("länkar till /takkontroll landar vid formuläret", () => {
  it("lägger ankaret på från sidor utan eget formulär", () => {
    for (const sida of ["/", "/taklaggare-taby", "/takbyte-taby", "/projekt/takbyte-singo", "/blogg/mala-plattak-guide-pris", "/offert", "/takreparation"]) {
      expect(ankareMal("/takkontroll", sida)).toBe("/takkontroll#forfragan");
    }
  });
  it("rör inte sidor med eget takkontrollformulär", () => {
    for (const sida of ["/takkontroll", "/boka-takkontroll", "/offert/taby", "/offert/norrtalje"]) {
      expect(ankareMal("/takkontroll", sida)).toBeNull();
    }
  });
  it("rör bara länken exakt till /takkontroll", () => {
    for (const href of [null, "", "/takkontroll#forfragan", "/takkontroll/", "/takkontrollen", "/tjanster/takinspektion", "https://roslagstak.se/takkontroll", "tel:0701543639"]) {
      expect(ankareMal(href, "/")).toBeNull();
    }
  });
});
