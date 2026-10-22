import { describe, it, expect } from 'vitest';
import { getSafeReturnUrl } from '../app/auth/login/page';

describe('PHASE 6 & 7 — Safe Login Redirection and ReturnTo Sanitization', () => {
  it('returns target path for safe relative URLs', () => {
    expect(getSafeReturnUrl('?returnTo=/contact')).toBe('/contact');
    expect(getSafeReturnUrl('?returnTo=/crop-diagnosis')).toBe('/crop-diagnosis');
    expect(getSafeReturnUrl('?returnTo=/dashboard')).toBe('/dashboard');
  });

  it('defaults to /dashboard when returnTo is missing', () => {
    expect(getSafeReturnUrl('')).toBe('/dashboard');
    expect(getSafeReturnUrl('?other=123')).toBe('/dashboard');
  });

  it('rejects protocol-relative open redirect attacks (e.g. //evil.com)', () => {
    expect(getSafeReturnUrl('?returnTo=//evil.com')).toBe('/dashboard');
    expect(getSafeReturnUrl('?returnTo=//attacker.org/steal')).toBe('/dashboard');
  });

  it('rejects external absolute URLs (e.g. https://evil.com)', () => {
    expect(getSafeReturnUrl('?returnTo=https://evil.com')).toBe('/dashboard');
    expect(getSafeReturnUrl('?returnTo=javascript:alert(1)')).toBe('/dashboard');
  });

  it('rejects backslash directory traversal tricks (e.g. /\\evil.com)', () => {
    expect(getSafeReturnUrl('?returnTo=/\\evil.com')).toBe('/dashboard');
  });

  it('guarantees auth.log_in, auth.log_out, auth.signin_sub, and auth.forgot_password exist across all supported locales', async () => {
    const { dict, pathGet } = await import('../contexts/LanguageContext');
    const locales = ['en', 'hi', 'ta', 'de', 'pl', 'fr', 'es', 'te', 'ar'] as const;
    const requiredKeys = [
      'auth.log_in',
      'auth.log_out',
      'auth.signin_sub',
      'auth.forgot_password',
      'auth.reset_password',
      'auth.signed_in',
      'auth.profile',
    ];

    for (const loc of locales) {
      const table = dict[loc];
      expect(table, `Locale ${loc} must exist in dict`).toBeDefined();
      for (const key of requiredKeys) {
        const val = pathGet(table, key);
        expect(
          typeof val === 'string' && val.length > 0,
          `Key "${key}" must be a translated non-empty string in locale "${loc}", got "${val}"`
        ).toBe(true);
      }
    }
  });
});
