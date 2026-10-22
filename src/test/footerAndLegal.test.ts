import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('PHASE 4 & 5 — Footer and Legal Pages Architecture', () => {
  it('Footer.tsx does NOT render misleading corporate tech badges', () => {
    const footerPath = path.resolve(__dirname, '../components/Footer.tsx');
    const content = fs.readFileSync(footerPath, 'utf-8');

    // Corporate misleading badges must be removed from footer UI
    expect(content).not.toContain('Google AI');
    expect(content).not.toContain('Vertex AI');
  });

  it('Footer.tsx contains legitimate working links without "#" placeholders', () => {
    const footerPath = path.resolve(__dirname, '../components/Footer.tsx');
    const content = fs.readFileSync(footerPath, 'utf-8');

    expect(content).not.toContain('href="#"');
    expect(content).not.toContain('to="#"');
    expect(content).toContain('to="/about"');
    expect(content).toContain('to="/privacy-policy"');
    expect(content).toContain('to="/disclaimer"');
    expect(content).toContain('to="/contact"');
    expect(content).toContain('to="/services"');
  });

  it('all legal pages exist and contain Farmculture AI attribution without government spoofing', () => {
    const privacyPath = path.resolve(__dirname, '../pages/PrivacyPolicyPage.tsx');
    const disclaimerPath = path.resolve(__dirname, '../pages/DisclaimerPage.tsx');
    const aboutPath = path.resolve(__dirname, '../pages/AboutUsPage.tsx');

    expect(fs.existsSync(privacyPath)).toBe(true);
    expect(fs.existsSync(disclaimerPath)).toBe(true);
    expect(fs.existsSync(aboutPath)).toBe(true);

    const privacyContent = fs.readFileSync(privacyPath, 'utf-8');
    const disclaimerContent = fs.readFileSync(disclaimerPath, 'utf-8');

    // Asserts clear disavowal of false ICAR/government ownership
    expect(privacyContent).toContain('not an agency of the Indian Council of Agricultural Research');
    expect(disclaimerContent).toContain('does not imply official government sponsorship');
  });

  it('guarantees legal and contact translation keys resolve cleanly without raw string fallback', async () => {
    const { dict, pathGet } = await import('../contexts/LanguageContext');
    const legalKeys = [
      'legal.privacyBadge',
      'legal.privacyEffective',
      'legal.noticePrefix',
      'legal.privacyNotice',
      'legal.disclaimerBadge',
      'legal.disclaimerReviewed',
      'legal.disclaimerNoticeTitle',
      'legal.disclaimerNoticeBody',
      'contact.subtitle',
      'about.badge',
      'about.title',
    ];

    const enTable = dict.en;
    for (const key of legalKeys) {
      const val = pathGet(enTable, key);
      expect(typeof val === 'string' && val.length > 0, `Key ${key} must resolve in en`).toBe(true);
    }
  });
});
