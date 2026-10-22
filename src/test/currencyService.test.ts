import { describe, it, expect } from 'vitest';
import {
  convertMarketPrice,
  formatCurrencyAmount,
  FALLBACK_RATES,
  CurrencyRate,
} from '../lib/currencyService';

describe('PHASE 2 — Live Currency Conversion & Deterministic Test Fixtures', () => {
  it('converts 34.50 INR to USD using test fixture (1 USD = 94.45 INR)', () => {
    const rateInfo: CurrencyRate = {
      baseCurrency: 'INR',
      quoteCurrency: 'USD',
      rate: 94.45,
      retrievedAt: '2026-10-21T00:00:00Z',
      effectiveDate: '2026-10-21',
      provider: 'Test Benchmark',
      sourceStatus: 'live',
    };

    const result = convertMarketPrice(34.50, 'INR', 'kg', 'USD', rateInfo);
    expect(result.conversionStatus).toBe('converted');
    expect(result.amount).not.toBeNull();
    // 34.50 / 94.45 = ~0.36527
    expect(result.amount).toBeCloseTo(0.3653, 3);

    // Formatted in en-US: $0.37
    const formatted = formatCurrencyAmount(result.amount!, 'USD', 'en-US');
    expect(formatted).toBe('$0.37');
  });

  it('converts INR to EUR using test fixture (1 EUR = 106.00 INR)', () => {
    const rateInfo: CurrencyRate = {
      baseCurrency: 'INR',
      quoteCurrency: 'EUR',
      rate: 106.00,
      retrievedAt: '2026-10-21T00:00:00Z',
      effectiveDate: '2026-10-21',
      provider: 'Test Benchmark',
      sourceStatus: 'live',
    };

    const result = convertMarketPrice(42.00, 'INR', 'kg', 'EUR', rateInfo);
    expect(result.conversionStatus).toBe('converted');
    expect(result.amount).toBeCloseTo(42.00 / 106.00, 3);
  });

  it('converts INR to GBP using test fixture (1 GBP = 126.53 INR)', () => {
    const rateInfo: CurrencyRate = {
      baseCurrency: 'INR',
      quoteCurrency: 'GBP',
      rate: 126.53,
      retrievedAt: '2026-10-21T00:00:00Z',
      effectiveDate: '2026-10-21',
      provider: 'Test Benchmark',
      sourceStatus: 'live',
    };

    const result = convertMarketPrice(34.50, 'INR', 'kg', 'GBP', rateInfo);
    expect(result.conversionStatus).toBe('converted');
    // 34.50 / 126.53 = ~0.27266
    expect(result.amount).toBeCloseTo(0.2727, 3);
    const formatted = formatCurrencyAmount(result.amount!, 'GBP', 'en-GB');
    expect(formatted).toBe('£0.27');
  });

  it('respects ISO minor units (3 decimals) for Dinar currencies (KWD, BHD, JOD)', () => {
    // 100 INR to KWD (rate 308.20)
    const rateInfo: CurrencyRate = {
      baseCurrency: 'INR',
      quoteCurrency: 'KWD',
      rate: 308.20,
      retrievedAt: '2026-10-21T00:00:00Z',
      effectiveDate: '2026-10-21',
      provider: 'Test Benchmark',
      sourceStatus: 'live',
    };

    const result = convertMarketPrice(100, 'INR', 'kg', 'KWD', rateInfo);
    expect(result.conversionStatus).toBe('converted');
    // 100 / 308.20 = 0.32446...
    expect(result.amount).toBeCloseTo(0.3245, 3);

    const formattedKwd = formatCurrencyAmount(result.amount!, 'KWD', 'en-US');
    // Must have 3 decimal places (e.g. KWD 0.324 or similar depending on ICU symbol format)
    expect(formattedKwd).toMatch(/\.32[45]/);
  });

  it('retains original price and sets unavailable status if rate is invalid or missing', () => {
    const invalidRate: CurrencyRate = {
      baseCurrency: 'INR',
      quoteCurrency: 'USD',
      rate: 0,
      retrievedAt: '2026-10-21T00:00:00Z',
      effectiveDate: '2026-10-21',
      provider: 'Test Broken',
      sourceStatus: 'fallback',
    };

    const result = convertMarketPrice(50, 'INR', 'kg', 'USD', invalidRate);
    expect(result.amount).toBe(50);
    expect(result.conversionStatus).toBe('exact_original');
  });

  it('includes explicit disclaimer clarifying price is an INR conversion and not a local market quote', () => {
    const rateInfo: CurrencyRate = {
      baseCurrency: 'INR',
      quoteCurrency: 'USD',
      rate: 94.45,
      retrievedAt: '2026-10-21T00:00:00Z',
      effectiveDate: '2026-10-21',
      provider: 'Test Benchmark',
      sourceStatus: 'live',
    };

    const result = convertMarketPrice(34.50, 'INR', 'kg', 'USD', rateInfo);
    expect(result.disclaimer).toContain('Converted from INR — not a USD local market quote');
  });
});
