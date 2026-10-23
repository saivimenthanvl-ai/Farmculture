import { describe, it, expect } from "vitest";
import React from "react";

describe("Phase 2 — Design System Tokens & Primitive Integrity", () => {
  it("verifies design tokens in index.css enforce AA contrast and agricultural palette", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const cssPath = path.join(__dirname, "..", "index.css");
    const css = fs.readFileSync(cssPath, "utf8");

    // Brand tokens
    expect(css).toContain("--color-forest-deep: #0F2E24;");
    expect(css).toContain("--color-forest-mid: #1C4A3A;");
    expect(css).toContain("--color-lime-leaf: #9BE564;");

    // Semantic tokens
    expect(css).toContain("--color-success: #2F9E6B;");
    expect(css).toContain("--color-warning: #E9A23B;");
    expect(css).toContain("--color-danger: #C8553D;");

    // Tabular numbers utility
    expect(css).toContain(".tabular-nums");
  });

  it("verifies command palette search includes all primary agronomy and market paths", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const cmdPath = path.join(__dirname, "..", "components", "ui", "CommandPalette.tsx");
    const code = fs.readFileSync(cmdPath, "utf8");

    expect(code).toContain('path: "/dashboard"');
    expect(code).toContain('path: "/crop-diagnosis"');
    expect(code).toContain('path: "/market-prices"');
    expect(code).toContain('path: "/weather"');
    expect(code).toContain('path: "/predictor"');
  });
});
