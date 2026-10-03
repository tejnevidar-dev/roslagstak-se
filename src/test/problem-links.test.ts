import { describe, expect, it } from "vitest";
import { problems } from "@/data/problems";
import { problemIndex } from "@/data/problems-index";
import { locationIndex } from "@/data/location-index";
import { problemsForLocation, regionLinksForProblems, PROBLEMS_PER_LOCATION } from "@/data/problem-links";

describe("länkplan ortssida ↔ problemsida (G12)", () => {
  it("problems-index.ts är identisk med problems.ts", () => {
    expect(problemIndex).toEqual(problems.map((p) => ({ slug: p.slug, title: p.title })));
  });
  it("varje ortssida länkar till exakt tre olika problemsidor som finns", () => {
    const slugs = new Set(problems.map((p) => `/takproblem/${p.slug}`));
    for (const loc of locationIndex) {
      const links = problemsForLocation(loc.slug);
      expect(links).toHaveLength(PROBLEMS_PER_LOCATION);
      expect(new Set(links.map((l) => l.to)).size).toBe(PROBLEMS_PER_LOCATION);
      for (const l of links) expect(slugs.has(l.to)).toBe(true);
    }
  });
  it("inlänkarna sprids jämnt över alla problemsidor", () => {
    const counts = new Map<string, number>();
    for (const loc of locationIndex) for (const l of problemsForLocation(loc.slug)) counts.set(l.to, (counts.get(l.to) ?? 0) + 1);
    expect(counts.size).toBe(problems.length);
    const values = [...counts.values()];
    expect(Math.max(...values) - Math.min(...values)).toBeLessThanOrEqual(1);
  });
  it("planen är deterministisk", () => {
    expect(problemsForLocation("taby")).toEqual(problemsForLocation("taby"));
  });
  it("problemsidor länkar till alla 16 regionsidor", () => {
    expect(regionLinksForProblems()).toHaveLength(16);
  });
});
