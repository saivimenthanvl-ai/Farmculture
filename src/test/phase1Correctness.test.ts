import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatRelativeTime,
  formatCurrencyINR,
  pluralizeIssues,
} from "../lib/formatters";
import {
  CropHealthPlotSchema,
  CropIssueSchema,
} from "../lib/cropHealthSchema";
import {
  SAMPLE_CROP_PLOTS,
  getCropHealthPlots,
  runCropHealthScan,
} from "../lib/cropHealthService";

describe("Phase 1 Correctness — Formatters & Typed Service Layer", () => {
  it("formats dates correctly using Intl.DateTimeFormat", () => {
    const formatted = formatDate("2026-11-20", "en-IN");
    expect(formatted).toContain("2026");
    expect(formatted).toMatch(/20\s+Nov|Nov\s+20/);
  });

  it("formats relative time using Intl.RelativeTimeFormat without camelCase leaks", () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 3600 * 1000).toISOString();
    const rel = formatRelativeTime(twoHoursAgo, "en-IN");
    expect(rel).toMatch(/2 hours? ago/);
    expect(rel).not.toContain("hoursAgo");

    const oneDayAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const relDay = formatRelativeTime(oneDayAgo, "en-IN");
    expect(relDay).toMatch(/yesterday|1 day ago/i);
    expect(relDay).not.toContain("dayAgo");
  });

  it("formats INR currency with proper symbol and formatting", () => {
    const inr = formatCurrencyINR(250000, "en-IN", "INR");
    expect(inr).toMatch(/₹\s*2,50,000/);
  });

  it("handles pluralization cleanly without '1 issuesFound' syntax", () => {
    const one = pluralizeIssues(1, "en-IN", {
      one: "issue flagged",
      other: "issues flagged",
    });
    expect(one).toBe("1 issue flagged");

    const two = pluralizeIssues(2, "en-IN", {
      one: "issue flagged",
      other: "issues flagged",
    });
    expect(two).toBe("2 issues flagged");

    const zero = pluralizeIssues(0, "en-IN", {
      one: "issue flagged",
      other: "issues flagged",
      zero: "no issues flagged",
    });
    expect(zero).toBe("no issues flagged");
  });

  it("validates crop health models against Zod schemas without data leakage", async () => {
    const plots = await getCropHealthPlots();
    expect(plots.length).toBeGreaterThan(0);

    for (const plot of plots) {
      const validated = CropHealthPlotSchema.parse(plot);
      expect(validated.isSampleData).toBe(true);
      expect(typeof validated.healthScore).toBe("number");
      expect(validated.healthScore).toBeGreaterThanOrEqual(0);
      expect(validated.healthScore).toBeLessThanOrEqual(100);

      // Verify no camelCase keys in issues
      for (const issue of validated.issues) {
        CropIssueSchema.parse(issue);
        expect(issue.recommendationCategory).not.toContain("hoursAgo");
        expect(issue.title).toBeDefined();
      }
    }
  });

  it("executes simulated scan via typed service interface", async () => {
    const scanResult = await runCropHealthScan({
      fieldId: "field-plot-1",
      scanType: "multispectral_satellite",
    });

    expect(scanResult.scanId).toBeDefined();
    expect(scanResult.healthScore).toBeGreaterThanOrEqual(0);
    expect(scanResult.disclaimer).toContain("decision-support estimate");
  });
});
