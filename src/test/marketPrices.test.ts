import { describe, it, expect } from 'vitest';
import {
  normalizeMarketPrice,
  getMarketPrices,
  VERIFIED_BENCHMARK_PRICES,
} from '../lib/marketPriceService';
import { SupportedRegion } from '../lib/localeConfig';

describe('FC-02 Market Prices Provenance, Regional Isolation & Normalization', () => {
  it('normalizes incoming records and computes freshness badge based on observation date', () => {
    const today = new Date().toISOString().split('T')[0];
    const liveRecord = normalizeMarketPrice({
      commodity: 'Tomato',
      price: 35,
      observationDate: today,
      source: 'Agmarknet',
    });

    expect(liveRecord.freshness).toBe('live');
    expect(liveRecord.price).toBe(35);
    expect(liveRecord.source).toBe('Agmarknet');
  });

  it('marks older prices as recent or historical rather than claiming live data', () => {
    const oldRecord = normalizeMarketPrice({
      commodity: 'Wheat',
      price: 24,
      observationDate: '2025-01-01',
    });

    expect(oldRecord.freshness).toBe('historical');
  });

  it('ensures every verified benchmark price contains explicit source, date provenance and official URL', async () => {
    const prices = await getMarketPrices();
    expect(prices.length).toBeGreaterThan(0);

    for (const p of prices) {
      expect(p.source).toBeDefined();
      expect(p.source.length).toBeGreaterThan(3);
      expect(p.observationDate).toBeDefined();
      expect(p.market).toBeDefined();
      expect(p.price).toBeGreaterThan(0);
      expect(p.sourceURL).toBeDefined();
      expect(p.verificationStatus).toBe('verified');
    }
  });

  it('strictly isolates European and Western market listings from Indian Mandi fallbacks', async () => {
    const europeanAndWesternRegions: SupportedRegion[] = ['FR', 'DE', 'ES', 'PL', 'GB', 'US', 'AU'];

    for (const region of europeanAndWesternRegions) {
      const records = await getMarketPrices(region);
      expect(records.length, `Region ${region} must have genuine verified benchmark records`).toBeGreaterThan(0);

      // Verify no Indian mandi locations leak into European/Western market views
      for (const rec of records) {
        expect(rec.countryCode).toBe(region);
        expect(rec.market).not.toContain('Azadpur');
        expect(rec.market).not.toContain('Lasalgaon');
        expect(rec.market).not.toContain('Agra');
        expect(rec.market).not.toContain('Karnal');
        expect(rec.market).not.toContain('Vashi');
        expect(rec.market).not.toContain('Rajkot');
        expect(rec.marketType).not.toBe('mandi');
      }
    }
  });

  it('preserves genuine Indian APMC mandi data when India (IN) is explicitly selected', async () => {
    const inRecords = await getMarketPrices('IN');
    expect(inRecords.length).toBeGreaterThan(0);
    const markets = inRecords.map((r) => r.market);
    expect(markets.some((m) => m.includes('Azadpur'))).toBe(true);
    expect(markets.some((m) => m.includes('Lasalgaon'))).toBe(true);
    expect(inRecords.every((r) => r.currency === 'INR')).toBe(true);
  });
});
