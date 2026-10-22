/**
 * Weather Service integrating Open-Meteo free public meteorological API
 * 
 * Provides real temperature, humidity, precipitation, wind speed, UV index,
 * and genuine agronomic alerts derived from real weather variables.
 */

export interface FarmLocation {
  lat: number;
  lon: number;
  name: string;
  region: string;
}

export const REGIONAL_AGRO_ZONES: Record<string, FarmLocation> = {
  IN: { lat: 28.6139, lon: 77.2090, name: 'Northern Plains Agro-Zone (New Delhi)', region: 'IN' },
  GB: { lat: 52.2053, lon: 0.1218, name: 'East Anglia Agricultural Lowlands (Cambridge)', region: 'GB' },
  FR: { lat: 48.8566, lon: 2.3522, name: 'Bassin Parisien Agricultural Basin (Île-de-France)', region: 'FR' },
  DE: { lat: 48.1351, lon: 11.5820, name: 'Bavarian Agrarian Region (München)', region: 'DE' },
  ES: { lat: 40.4168, lon: -3.7038, name: 'Meseta Central Agricultural Zone (Madrid)', region: 'ES' },
  PL: { lat: 52.2297, lon: 21.0122, name: 'Mazovian Agricultural Lowlands (Warszawa)', region: 'PL' },
  US: { lat: 41.8781, lon: -87.6298, name: 'Midwest Corn & Grain Belt (Chicago)', region: 'US' },
  AU: { lat: -33.8688, lon: 151.2093, name: 'New South Wales Agri-Basin (Sydney)', region: 'AU' },
  KW: { lat: 29.3759, lon: 47.9774, name: 'Al-Wafra Agricultural Area (Kuwait)', region: 'KW' },
  AE: { lat: 24.2075, lon: 55.7447, name: 'Al Ain Agricultural Oasis (Abu Dhabi)', region: 'AE' },
};

export interface WeatherCondition {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  uvIndex: number;
  weatherCode: number;
  locationName: string;
  isLive: boolean;
  timestamp: string;
  forecast: Array<{
    day: string;
    condition: string;
    temp: number;
    rain: number;
  }>;
  alerts: Array<{
    type: 'warning' | 'info';
    message: string;
    action: string;
  }>;
}

export function decodeWmoCode(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code === 1 || code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 65) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Cloudy';
}

/**
 * Derives genuine agricultural recommendations based on actual meteorological thresholds.
 */
export function deriveAgroAlerts(
  temp: number,
  rainProb: number,
  windSpeed: number,
  humidity: number
): Array<{ type: 'warning' | 'info'; message: string; action: string }> {
  const alerts: Array<{ type: 'warning' | 'info'; message: string; action: string }> = [];

  if (rainProb >= 70) {
    alerts.push({
      type: 'warning',
      message: `High likelihood of rainfall (${rainProb}%).`,
      action: 'Postpone pesticide spraying and ensure drainage channels are unobstructed.',
    });
  } else if (windSpeed > 20) {
    alerts.push({
      type: 'warning',
      message: `Elevated wind speeds detected (${windSpeed} km/h).`,
      action: 'Avoid foliar sprays to eliminate drift and secure delicate young saplings.',
    });
  } else if (humidity > 80 && temp > 25) {
    alerts.push({
      type: 'info',
      message: `High relative humidity (${humidity}%) and warm ambient temperatures.`,
      action: 'Monitor crop foliage closely for fungal germination.',
    });
  } else {
    alerts.push({
      type: 'info',
      message: 'Favorable atmospheric conditions for standard agronomic activities.',
      action: 'Conduct field scouting and scheduled irrigation according to crop lifecycle.',
    });
  }

  return alerts;
}

/**
 * Fetches real weather from Open-Meteo API.
 */
export async function fetchLiveWeather(
  lat = 28.6139,
  lon = 77.2090,
  locationName = 'New Delhi'
): Promise<WeatherCondition> {
  // Validate coordinate boundaries
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    throw new Error(`Invalid geographic coordinates: latitude ${lat}, longitude ${lon}`);
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,precipitation_probability_max,uv_index_max&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Open-Meteo returned status ${res.status}`);
  }

  const data = await res.json();
  const current = data.current;
  const daily = data.daily;

  const temp = Math.round(current.temperature_2m);
  const humidity = Math.round(current.relative_humidity_2m);
  const rainfall = Number(current.precipitation) || 0;
  const windSpeed = Math.round(current.wind_speed_10m);
  const uvIndex = daily?.uv_index_max?.[0] ? Math.round(daily.uv_index_max[0]) : 5;
  const rainProb = daily?.precipitation_probability_max?.[0] || 0;

  const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];
  const forecast = (daily?.time || []).slice(0, 5).map((_: string, idx: number) => ({
    day: days[idx] || `Day ${idx + 1}`,
    condition: decodeWmoCode(daily.weather_code[idx] || 0),
    temp: Math.round(daily.temperature_2m_max[idx] || temp),
    rain: Math.round(daily.precipitation_probability_max[idx] || 0),
  }));

  const alerts = deriveAgroAlerts(temp, rainProb, windSpeed, humidity);

  return {
    temperature: temp,
    humidity,
    rainfall,
    windSpeed,
    uvIndex,
    weatherCode: current.weather_code,
    locationName,
    isLive: true,
    timestamp: current.time ? new Date(current.time).toISOString() : new Date().toISOString(),
    forecast,
    alerts,
  };
}
