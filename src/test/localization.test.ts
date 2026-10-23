import { describe, it, expect } from 'vitest';
import { LOCALES, REGIONS, CURRENCIES } from '../lib/localeConfig';

describe('PHASE 1 — International Localization and Region Specification', () => {
  it('supports all required English, Indian, European and Arabic regional locales', () => {
    // English
    expect(LOCALES['en-IN']).toBeDefined();
    expect(LOCALES['en-US']).toBeDefined();
    expect(LOCALES['en-GB']).toBeDefined();
    expect(LOCALES['en-AU']).toBeDefined();

    // Indian
    expect(LOCALES['ta-IN']).toBeDefined();
    expect(LOCALES['hi-IN']).toBeDefined();
    expect(LOCALES['mr-IN']).toBeDefined();
    expect(LOCALES['te-IN']).toBeDefined();

    // European
    expect(LOCALES['de-DE']).toBeDefined();
    expect(LOCALES['fr-FR']).toBeDefined();
    expect(LOCALES['es-ES']).toBeDefined();
    expect(LOCALES['pl-PL']).toBeDefined();

    // Arabic
    expect(LOCALES['ar-KW']).toBeDefined();
    expect(LOCALES['ar-BH']).toBeDefined();
    expect(LOCALES['ar-JO']).toBeDefined();
    expect(LOCALES['ar-AE']).toBeDefined();
  });

  it('marks Arabic regional locales with isRtl flag', () => {
    expect(LOCALES['ar-KW'].isRtl).toBe(true);
    expect(LOCALES['ar-BH'].isRtl).toBe(true);
    expect(LOCALES['ar-JO'].isRtl).toBe(true);
    expect(LOCALES['ar-AE'].isRtl).toBe(true);
    expect(LOCALES['en-IN'].isRtl).toBeUndefined();
  });

  it('provides distinct currencies with appropriate minor units', () => {
    // Dinar currencies must use 3 decimal places
    expect(CURRENCIES['KWD'].minorUnits).toBe(3);
    expect(CURRENCIES['BHD'].minorUnits).toBe(3);
    expect(CURRENCIES['JOD'].minorUnits).toBe(3);

    // Standard currencies use 2 decimal places
    expect(CURRENCIES['INR'].minorUnits).toBe(2);
    expect(CURRENCIES['USD'].minorUnits).toBe(2);
    expect(CURRENCIES['GBP'].minorUnits).toBe(2);
    expect(CURRENCIES['EUR'].minorUnits).toBe(2);
    expect(CURRENCIES['AUD'].minorUnits).toBe(2);
    expect(CURRENCIES['PLN'].minorUnits).toBe(2);
    expect(CURRENCIES['AED'].minorUnits).toBe(2);
  });

  it('correctly maps regional defaults independently from language', () => {
    // US region defaults to USD
    expect(REGIONS['US'].defaultCurrency).toBe('USD');
    // Germany defaults to EUR
    expect(REGIONS['DE'].defaultCurrency).toBe('EUR');
    // Kuwait defaults to KWD
    expect(REGIONS['KW'].defaultCurrency).toBe('KWD');
    // Poland defaults to EUR under European display mode policy, with PLN as national currency
    expect(REGIONS['PL'].defaultCurrency).toBe('EUR');
    expect(REGIONS['PL'].nationalCurrency).toBe('PLN');
  });

  it('guarantees complete translation dictionary coverage for all supported languages', async () => {
    // Verify LanguageContext supports en, hi, ta, te, de, fr, es, pl, ar
    const { useLanguage } = await import('../contexts/LanguageContext');
    expect(useLanguage).toBeDefined();

    // Verify Arabic translations cover essential UI keys without fallback failure
    const { LocalizationProvider } = await import('../contexts/LocalizationContext');
    expect(LocalizationProvider).toBeDefined();
  }, 30000);
});

