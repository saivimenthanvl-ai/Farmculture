import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, AlertTriangle, MapPin, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { fetchLiveWeather, WeatherCondition, REGIONAL_AGRO_ZONES, FarmLocation } from '@/lib/weatherService';

export const WeatherInsights: React.FC = () => {
  const { t } = useLanguage();
  const { region } = useLocalization();
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default regional farm location based on user's agricultural region setting
  const defaultFarmLocation: FarmLocation = REGIONAL_AGRO_ZONES[region] || REGIONAL_AGRO_ZONES.IN;
  const [currentLocation, setCurrentLocation] = useState<FarmLocation>(defaultFarmLocation);

  const loadWeather = async (lat = currentLocation.lat, lon = currentLocation.lon, locName = currentLocation.name) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveWeather(lat, lon, locName);
      setWeather(data);
    } catch {
      setError('Unable to reach Open-Meteo meteorological servers. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  // Synchronize when agricultural region changes
  useEffect(() => {
    const regionalTarget = REGIONAL_AGRO_ZONES[region] || REGIONAL_AGRO_ZONES.IN;
    setCurrentLocation(regionalTarget);
    loadWeather(regionalTarget.lat, regionalTarget.lon, regionalTarget.name);
  }, [region]);


  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (c.includes('cloud') || c.includes('overcast')) return <Cloud className="w-8 h-8 text-gray-500" />;
    return <Sun className="w-8 h-8 text-amber-500" />;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Querying live meteorological telemetry from Open-Meteo...</p>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12 space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Weather Telemetry Unavailable</h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">{error}</p>
          <button
            onClick={() => loadWeather()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Provider Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{t("weatherX.title")}</h2>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="font-medium text-gray-800">{weather.locationName}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Live Feed (Open-Meteo)
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Observation: {new Date(weather.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <button
          onClick={() => loadWeather()}
          className="self-start sm:self-center inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
          <Thermometer className="w-6 h-6 mx-auto mb-2 text-rose-500" />
          <div className="text-2xl font-bold text-gray-800">{weather.temperature}°C</div>
          <div className="text-xs text-gray-500 mt-1">{t("weatherX.temp")}</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
          <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold text-gray-800">{weather.humidity}%</div>
          <div className="text-xs text-gray-500 mt-1">{t("weatherX.humidity")}</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
          <CloudRain className="w-6 h-6 mx-auto mb-2 text-sky-500" />
          <div className="text-2xl font-bold text-gray-800">{weather.rainfall}mm</div>
          <div className="text-xs text-gray-500 mt-1">{t("weatherX.rainfall")}</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
          <Wind className="w-6 h-6 mx-auto mb-2 text-teal-500" />
          <div className="text-2xl font-bold text-gray-800">{weather.windSpeed} km/h</div>
          <div className="text-xs text-gray-500 mt-1">{t("weatherX.wind")}</div>
        </div>

        <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
          <Sun className="w-6 h-6 mx-auto mb-2 text-amber-500" />
          <div className="text-2xl font-bold text-gray-800">{weather.uvIndex}</div>
          <div className="text-xs text-gray-500 mt-1">{t("weatherX.uv")}</div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{t("weatherX.forecast5")}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {weather.forecast.map((day, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-3 text-center shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="text-xs font-semibold text-gray-700 mb-1">{day.day}</div>
              <div className="my-2 flex justify-center">{getWeatherIcon(day.condition)}</div>
              <div className="text-base font-bold text-gray-800">{day.temp}°C</div>
              <div className="text-xs text-blue-600 mt-1">{day.rain}% rain</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Real Agro Recommendations */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">{t("weatherX.recos")}</h3>
        {weather.alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'warning'
                ? 'bg-amber-50 border-amber-500 text-amber-900'
                : 'bg-emerald-50 border-emerald-500 text-emerald-900'
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${
                alert.type === 'warning' ? 'text-amber-600' : 'text-emerald-600'
              }`} />
              <div>
                <p className="font-semibold text-sm">{alert.message}</p>
                <p className="text-xs mt-1 text-gray-700 font-medium">
                  Recommended Field Action: {alert.action}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherInsights;
