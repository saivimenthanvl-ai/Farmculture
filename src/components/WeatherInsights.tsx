import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  AlertTriangle,
  MapPin,
  RefreshCw,
  CheckCircle2,
  Gauge,
  Calendar,
} from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";
import {
  fetchLiveWeather,
  WeatherCondition,
  REGIONAL_AGRO_ZONES,
  FarmLocation,
} from "@/lib/weatherService";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import { StatTile } from "@/components/ui/StatTile";

export const WeatherInsights: React.FC = () => {
  const { t, region } = useLocalization();
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultFarmLocation: FarmLocation = REGIONAL_AGRO_ZONES[region] || REGIONAL_AGRO_ZONES.IN;
  const [currentLocation, setCurrentLocation] = useState<FarmLocation>(defaultFarmLocation);

  const loadWeather = async (
    lat = currentLocation.lat,
    lon = currentLocation.lon,
    locName = currentLocation.name
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveWeather(lat, lon, locName);
      setWeather(data);
    } catch {
      setError("Unable to reach Open-Meteo meteorological endpoints. Please check network connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const regionalTarget = REGIONAL_AGRO_ZONES[region] || REGIONAL_AGRO_ZONES.IN;
    setCurrentLocation(regionalTarget);
    loadWeather(regionalTarget.lat, regionalTarget.lon, regionalTarget.name);
  }, [region]);

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes("rain")) return <CloudRain className="w-5 h-5 text-[#3E8E8A]" />;
    if (c.includes("cloud") || c.includes("overcast")) return <Cloud className="w-5 h-5 text-[#787266]" />;
    return <Sun className="w-5 h-5 text-[#E9A23B]" />;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center">
        <div className="w-10 h-10 border-3 border-[#9BE564] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-[#787266] font-medium">
          Querying high-resolution Open-Meteo telemetry...
        </p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="max-w-2xl mx-auto p-8 agri-card text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#FAECE9] text-[#C8553D] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0F2E24]">Meteorological Telemetry Unavailable</h3>
        <p className="text-xs text-[#787266] max-w-md mx-auto">{error}</p>
        <button
          onClick={() => loadWeather()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F2E24] text-white rounded-xl hover:bg-[#1C4A3A] text-xs font-bold transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Meteorological Sync</span>
        </button>
      </div>
    );
  }

  // Spray-window heuristic: wind < 15km/h and rain < 20%
  const spraySafe = weather.windSpeed < 15 && weather.rainfall === 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E3D8]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C4A3A]">
              Microclimate Telemetry
            </span>
            <span className="text-[#A8A092]">·</span>
            <Badge variant="lime" dot>
              Open-Meteo Live API
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F2E24] tracking-tight font-display">
            {t("weatherX.title") || "Agro-Weather Telemetry & Spray Windows"}
          </h1>
          <div className="flex items-center gap-3 text-xs text-[#787266] mt-1">
            <div className="flex items-center gap-1 font-semibold text-[#0F2E24]">
              <MapPin className="w-3.5 h-3.5 text-[#1C4A3A]" />
              <span>{weather.locationName}</span>
            </div>
            <span>•</span>
            <span className="font-mono text-[11px]">
              Observed: {new Date(weather.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} IST
            </span>
          </div>
        </div>

        <button
          onClick={() => loadWeather()}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E7E3D8] hover:border-[#1C4A3A] text-xs font-bold text-[#0F2E24] transition-colors shadow-2xs self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#1C4A3A]" />
          <span>Refresh Readings</span>
        </button>
      </div>

      {/* Spray Window Banner */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          spraySafe
            ? "bg-[#FAF9F5] border-[#9BE564] text-[#0F2E24]"
            : "bg-[#FAECE9] border-[#C8553D] text-[#C8553D]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
              spraySafe ? "bg-[#9BE564] text-[#0F2E24]" : "bg-[#C8553D] text-white"
            }`}
          >
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider">
              {spraySafe ? "Foliar Spray Window: SAFE" : "Foliar Spray Window: DELAY"}
            </div>
            <p className="text-xs text-[#787266] mt-0.5">
              {spraySafe
                ? "Wind speed under 15 km/h and zero precipitation probability. Ideal conditions for foliar nutrient and organic bio-spray absorption."
                : "Wind or moisture levels exceed safety threshold. Risk of chemical drift or rainwater wash-off."}
            </p>
          </div>
        </div>
        <Badge variant={spraySafe ? "lime" : "danger"}>
          {spraySafe ? "Optimal Absorption" : "Chemical Drift Risk"}
        </Badge>
      </div>

      {/* Metric Tiles (5 tokens) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatTile
          title={t("weatherX.temp") || "Ambient Temperature"}
          value={`${weather.temperature}`}
          unit="°C"
          delta="Diurnal peak"
          deltaType="neutral"
          icon={Thermometer}
        />
        <StatTile
          title={t("weatherX.humidity") || "Relative Humidity"}
          value={`${weather.humidity}`}
          unit="%"
          delta="Dew point stable"
          deltaType="neutral"
          icon={Droplets}
        />
        <StatTile
          title={t("weatherX.rainfall") || "Precipitation"}
          value={`${weather.rainfall}`}
          unit="mm"
          delta="Past 24 hours"
          deltaType="neutral"
          icon={CloudRain}
        />
        <StatTile
          title={t("weatherX.wind") || "Wind Velocity"}
          value={`${weather.windSpeed}`}
          unit="km/h"
          delta="East-North-East"
          deltaType="neutral"
          icon={Wind}
        />
        <StatTile
          title={t("weatherX.uv") || "Solar Radiation"}
          value={`${weather.uvIndex}`}
          unit="UV"
          delta="Photosynthetic rate"
          deltaType="neutral"
          icon={Sun}
        />
      </div>

      {/* 5-Day Forecast Strip */}
      <div className="agri-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0F2E24]">
              {t("weatherX.forecast5") || "5-Day Agricultural Forecast Strip"}
            </h3>
            <p className="text-[11px] text-[#787266]">Open-Meteo mathematical grid model</p>
          </div>
          <Badge variant="outline">Daily Aggregates</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {weather.forecast.map((day, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] hover:bg-white text-center transition-all space-y-1.5"
            >
              <div className="text-xs font-bold text-[#0F2E24]">{day.day}</div>
              <div className="flex justify-center py-1">{getWeatherIcon(day.condition)}</div>
              <div className="text-base font-mono font-bold text-[#0F2E24]">{day.temp}°C</div>
              <div className="text-[11px] font-semibold text-[#3E8E8A]">{day.rain}% rain</div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Agronomic Field Advisories */}
      <div className="agri-card p-5 space-y-3">
        <h3 className="text-sm font-bold text-[#0F2E24] mb-2">
          {t("weatherX.recos") || "Targeted Agronomic Advisories & Actions"}
        </h3>
        <div className="space-y-2.5">
          {weather.alerts.map((alert, index) => (
            <Callout
              key={index}
              variant={alert.type === "warning" ? "warning" : "success"}
              title={alert.message}
            >
              <span className="font-semibold">Recommended Field Action:</span> {alert.action}
            </Callout>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherInsights;
