import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Phase 4 — SEO & Public Route Quality Verification", () => {
  it("verifies public robots.txt exists and contains valid crawler directives", () => {
    const robotsPath = path.join(__dirname, "..", "..", "public", "robots.txt");
    expect(fs.existsSync(robotsPath)).toBe(true);

    const content = fs.readFileSync(robotsPath, "utf8");
    expect(content).toContain("User-agent: *");
    expect(content).toContain("Allow: /about");
    expect(content).toContain("Allow: /services");
    expect(content).toContain("Disallow: /dashboard");
    expect(content).toContain("Disallow: /settings/");
    expect(content).toContain("Sitemap: https://farmculture.ai/sitemap.xml");
  });

  it("verifies public sitemap.xml exists and includes canonical URLs", () => {
    const sitemapPath = path.join(__dirname, "..", "..", "public", "sitemap.xml");
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const content = fs.readFileSync(sitemapPath, "utf8");
    expect(content).toContain("<loc>https://farmculture.ai/</loc>");
    expect(content).toContain("<loc>https://farmculture.ai/about</loc>");
    expect(content).toContain("<loc>https://farmculture.ai/services</loc>");
    expect(content).toContain("<loc>https://farmculture.ai/privacy-policy</loc>");
    expect(content).toContain("<loc>https://farmculture.ai/disclaimer</loc>");
    expect(content).toContain("<loc>https://farmculture.ai/contact</loc>");
    // Should NOT include private dashboard paths
    expect(content).not.toContain("/dashboard");
    expect(content).not.toContain("/profile");
  });

  it("verifies index.html has canonical, open graph, and twitter metadata", () => {
    const indexPath = path.join(__dirname, "..", "..", "index.html");
    const content = fs.readFileSync(indexPath, "utf8");

    expect(content).toContain('<link rel="canonical" href="https://farmculture.ai/"');
    expect(content).toContain('<meta property="og:site_name" content="Farmculture AI"');
    expect(content).toContain('<meta property="og:title"');
    expect(content).toContain('<meta name="twitter:card" content="summary_large_image"');
    expect(content).toContain('<link rel="icon" type="image/svg+xml" href="/farmculture.svg"');
  });

  it("verifies farmculture.svg favicon exists in public directory", () => {
    const svgPath = path.join(__dirname, "..", "..", "public", "farmculture.svg");
    expect(fs.existsSync(svgPath)).toBe(true);
    const svgContent = fs.readFileSync(svgPath, "utf8");
    expect(svgContent).toContain("<svg");
    expect(svgContent).toContain("#0F2E24");
  });
});
