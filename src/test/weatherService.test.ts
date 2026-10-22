import { describe, it, expect, vi } from 'vitest';
import {
  decodeWmoCode,
  deriveAgroAlerts,
  fetchLiveWeather,
} from '../lib/weatherService';

describe('FC-03 Weather Service & Meteorological Verification', () => {
  it('decodes WMO weather codes accurately', () => {
    expect(decodeWmoCode(0)).toBe('Clear Sky');
    expect(decodeWmoCode(1)).toBe('Partly Cloudy');
    expect(decodeWmoCode(61)).toBe('Rain');
    expect(decodeWmoCode(95)).toBe('Thunderstorm');
  });

  it('generates high rainfall alert when rain probability exceeds 70%', () => {
    const alerts = deriveAgroAlerts(25, 85, 10, 60);
    expect(alerts.some((a) => a.type === 'warning' && a.message.includes('rainfall'))).toBe(true);
    expect(alerts[0].action).toContain('Postpone pesticide spraying');
  });

  it('generates wind drift warning when wind speed exceeds 20 km/h', () => {
    const alerts = deriveAgroAlerts(28, 10, 26, 50);
    expect(alerts.some((a) => a.type === 'warning' && a.message.includes('wind speeds'))).toBe(true);
    expect(alerts[0].action).toContain('Avoid foliar sprays');
  });

  it('fetches and parses live Open-Meteo weather payload', async () => {
    // Mock global fetch to test network resilience
    const mockData = {
      current: {
        temperature_2m: 29.4,
        relative_humidity_2m: 62,
        precipitation: 0.0,
        wind_speed_10m: 11.2,
        weather_code: 0,
      },
      daily: {
        time: ['2026-10-21', '2026-10-22'],
        weather_code: [0, 1],
        temperature_2m_max: [30.1, 29.5],
        precipitation_probability_max: [10, 20],
        uv_index_max: [6.5, 7.0],
      },
    };

    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    }) as any;

    try {
      const weather = await fetchLiveWeather(28.6139, 77.209, 'New Delhi');
      expect(weather.isLive).toBe(true);
      expect(weather.temperature).toBe(29);
      expect(weather.humidity).toBe(62);
      expect(weather.forecast.length).toBe(2);
      expect(weather.forecast[0].condition).toBe('Clear Sky');
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('handles provider HTTP failures gracefully without falling back to synthetic fake data', async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
    }) as any;

    try {
      await expect(fetchLiveWeather(0, 0)).rejects.toThrow('Open-Meteo returned status 503');
    } finally {
      global.fetch = originalFetch;
    }
  });

  it('rejects invalid latitude/longitude out-of-bounds coordinates', async () => {
    await expect(fetchLiveWeather(95, 0)).rejects.toThrow('Invalid geographic coordinates');
    await expect(fetchLiveWeather(-100, 50)).rejects.toThrow('Invalid geographic coordinates');
    await expect(fetchLiveWeather(20, 200)).rejects.toThrow('Invalid geographic coordinates');
  });

  it('provides verified regional agro zones for supported countries', async () => {
    const { REGIONAL_AGRO_ZONES } = await import('../lib/weatherService');
    expect(REGIONAL_AGRO_ZONES.IN.name).toContain('Northern Plains');
    expect(REGIONAL_AGRO_ZONES.GB.name).toContain('East Anglia');
    expect(REGIONAL_AGRO_ZONES.FR.name).toContain('Bassin Parisien');
    expect(REGIONAL_AGRO_ZONES.DE.name).toContain('Bavarian');
    expect(REGIONAL_AGRO_ZONES.ES.name).toContain('Meseta Central');
    expect(REGIONAL_AGRO_ZONES.PL.name).toContain('Mazovian');
  });
});
