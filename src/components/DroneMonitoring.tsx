import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plane, 
  MapPin, 
  Zap, 
  Activity, 
  AlertTriangle, 
  Info, 
  RefreshCw, 
  Play, 
  ShieldAlert, 
  CheckCircle2, 
  WifiOff, 
  ImageOff 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalization } from '../contexts/LocalizationContext';
import { 
  DroneDevice, 
  DroneConnectionMode, 
  DroneFinding 
} from '../lib/droneSchema';
import { 
  fetchDroneFleetState, 
  triggerDemonstrationPlayback 
} from '../lib/droneService';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className = '', 
  fallbackLabel 
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-[#F4F1EA] text-[#556960] border border-[#E5E0D8] rounded-md p-2 text-center ${className}`}
        role="img"
        aria-label={`${alt} (${fallbackLabel})`}
      >
        <ImageOff className="w-5 h-5 text-[#556960] mb-1" />
        <span className="text-[10px] font-medium leading-tight">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setHasError(true)} 
    />
  );
};

export const DroneMonitoring: React.FC = () => {
  const { t } = useLocalization();

  const [connectionMode, setConnectionMode] = useState<DroneConnectionMode>('CONNECTING');
  const [drones, setDrones] = useState<DroneDevice[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<DroneDevice | null>(null);
  const [isSimulatingPlayback, setIsSimulatingPlayback] = useState(false);
  const [playbackNotification, setPlaybackNotification] = useState<string | null>(null);

  const loadFleet = useCallback(async (mode: DroneConnectionMode = 'DEMONSTRATION') => {
    setConnectionMode('CONNECTING');
    try {
      const result = await fetchDroneFleetState(mode);
      setConnectionMode(result.mode);
      setDrones(result.connectedDevices);
      setSelectedDrone(result.connectedDevices[0] || null);
    } catch {
      setConnectionMode('ERROR');
      setDrones([]);
      setSelectedDrone(null);
    }
  }, []);

  useEffect(() => {
    loadFleet('DEMONSTRATION');
  }, [loadFleet]);

  const handlePlayDemo = async (droneId: string) => {
    setIsSimulatingPlayback(true);
    setPlaybackNotification(t("drone.launchRestrictedNotice"));
    
    const updatedDevice = await triggerDemonstrationPlayback(droneId);
    if (updatedDevice) {
      setDrones((prev) => prev.map((d) => (d.id === droneId ? updatedDevice : d)));
      if (selectedDrone?.id === droneId) {
        setSelectedDrone(updatedDevice);
      }
    }

    setIsSimulatingPlayback(false);
    setTimeout(() => {
      setPlaybackNotification(null);
    }, 5000);
  };

  const getStatusColor = (status: DroneDevice['status']) => {
    switch (status) {
      case 'active': 
        return 'text-[#1C4A3A] bg-[#9BE564]/20 border border-[#9BE564]/50';
      case 'charging': 
        return 'text-[#8C6D1F] bg-[#FEF3C7] border border-[#FDE68A]';
      case 'docked': 
        return 'text-[#556960] bg-[#F4F1EA] border border-[#E5E0D8]';
      case 'maintenance': 
        return 'text-[#8B0000] bg-[#FEE2E2] border border-[#FCA5A5]';
      default: 
        return 'text-[#556960] bg-[#F4F1EA] border border-[#E5E0D8]';
    }
  };

  const getSeverityStyle = (severity: DroneFinding['severity']) => {
    switch (severity) {
      case 'high': 
        return 'text-[#8B0000] bg-[#FEF2F2] border-[#FCA5A5]';
      case 'medium': 
        return 'text-[#8C6D1F] bg-[#FFFBEB] border-[#FDE68A]';
      case 'low': 
        return 'text-[#1C4A3A] bg-[#F4FBF4] border-[#C8E6C9]';
      default: 
        return 'text-[#2D3B36] bg-[#F4F1EA] border-[#E5E0D8]';
    }
  };

  const getStatusLabel = (status: DroneDevice['status']) => {
    switch (status) {
      case 'active': return t("drone.active");
      case 'charging': return t("drone.charging");
      case 'docked': return t("drone.dockedRecharge");
      case 'maintenance': return t("drone.maintenance");
      default: return status;
    }
  };

  const getPriorityLabel = (severity: DroneFinding['severity']) => {
    switch (severity) {
      case 'high': return t("drone.priorityHigh");
      case 'medium': return t("drone.priorityMedium");
      case 'low': return t("drone.priorityLow");
      default: return `${severity} Priority`;
    }
  };

  const getDetectionTypeLabel = (type: DroneFinding['type']) => {
    switch (type) {
      case 'pest': return t("drone.detectionPest");
      case 'disease': return t("drone.detectionDisease");
      case 'irrigation': return t("drone.detectionIrrigation");
      case 'growth': return t("drone.detectionGrowth");
      default: return `${type} Detection`;
    }
  };

  if (connectionMode === 'CONNECTING') {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white border border-[#E5E0D8] rounded-xl shadow-xs text-center">
        <motion.div 
          className="h-10 w-10 border-3 border-[#1C4A3A] border-t-transparent rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <h3 className="mt-4 text-base font-semibold text-[#0F2E24]">{t("drone.connectingDrones")}</h3>
        <p className="mt-1 text-xs text-[#556960]">{t("drone.boundedTimeoutExplanation")}</p>
      </div>
    );
  }

  if (connectionMode === 'DISCONNECTED') {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white border border-[#E5E0D8] rounded-xl shadow-xs text-center">
        <WifiOff className="w-12 h-12 text-[#556960] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#0F2E24]">{t("drone.noDeviceConnected")}</h3>
        <p className="mt-2 text-xs text-[#556960] max-w-md mx-auto">{t("drone.noDeviceConnectedDesc")}</p>
        <button 
          onClick={() => loadFleet('DEMONSTRATION')}
          className="mt-4 inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-[#1C4A3A] text-white hover:bg-[#0F2E24] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          {t("drone.retryConnection")}
        </button>
      </div>
    );
  }

  if (connectionMode === 'ERROR') {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl shadow-xs text-center">
        <AlertTriangle className="w-12 h-12 text-[#8B0000] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#8B0000]">{t("drone.connectionError")}</h3>
        <p className="mt-2 text-xs text-[#601010] max-w-md mx-auto">{t("drone.connectionTimeout")}</p>
        <button 
          onClick={() => loadFleet('DEMONSTRATION')}
          className="mt-4 inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-[#8B0000] text-white hover:bg-[#601010] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          {t("drone.retryConnection")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Demonstration Banner */}
      {connectionMode === 'DEMONSTRATION' && (
        <div 
          role="status" 
          aria-live="polite"
          className="flex items-start gap-3 p-4 bg-[#F4FBF4] border border-[#C8E6C9] rounded-xl shadow-xs"
        >
          <Info className="w-5 h-5 text-[#1C4A3A] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-bold text-[#0F2E24] tracking-wide uppercase text-[11px]">
                {t("drone.telemetrySimulationMode")}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E2F0D9] text-[#1C4A3A] border border-[#9BE564]/40">
                {t("drone.telemetrySimulationMode")}
              </span>
            </div>
            <p className="text-[#2D3B36] leading-relaxed">
              {t("drone.demonstrationBanner")}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[#E5E0D8]">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-[#0F2E24] tracking-tight">{t("drone.title")}</h2>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#F4F1EA] text-[#556960] border border-[#E5E0D8]">
              {t("drone.telemetrySimulationMode")}
            </span>
          </div>
          <p className="text-[#556960] text-xs mt-1">{t("drone.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => loadFleet('DEMONSTRATION')}
            aria-label={t("drone.refreshTelemetry")}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#E5E0D8] text-[#2D3B36] hover:bg-[#F4F1EA] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-[#556960]" />
            {t("drone.refreshTelemetry")}
          </button>
        </div>
      </div>

      {/* Launch Notification Toast */}
      <AnimatePresence>
        {playbackNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-[#FFFBEB] border border-[#FDE68A] text-[#8C6D1F] rounded-lg text-xs"
          >
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#8C6D1F]" />
            <span>{playbackNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Registered Drones */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0F2E24] uppercase tracking-wider">{t("drone.activeDronesList")}</h3>
            <span className="text-[11px] font-medium text-[#556960]">
              {drones.length} {t("drone.fleetCount")}
            </span>
          </div>

          <div className="space-y-3">
            {drones.map((drone) => (
              <div
                key={drone.id}
                role="button"
                tabIndex={0}
                aria-pressed={selectedDrone?.id === drone.id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedDrone(drone);
                  }
                }}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedDrone?.id === drone.id
                    ? 'bg-white border-[#1C4A3A] shadow-md ring-1 ring-[#1C4A3A]'
                    : 'bg-white border-[#E5E0D8] hover:border-[#1C4A3A]/40'
                }`}
                onClick={() => setSelectedDrone(drone)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-[#1C4A3A]" />
                    <h4 className="font-bold text-[#0F2E24] text-sm">{drone.name}</h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${getStatusColor(drone.status)}`}>
                    {getStatusLabel(drone.status)}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#556960]">{t("drone.battery")}:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-[#E5E0D8] rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full ${
                            drone.batteryPercent > 50 ? 'bg-[#9BE564]' : 
                            drone.batteryPercent > 20 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
                          }`}
                          style={{ width: `${drone.batteryPercent}%` }}
                        />
                      </div>
                      <span className="font-semibold text-[#0F2E24]">{drone.batteryPercent}%</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[#556960]">{t("drone.task")}: </span>
                    <span className="font-medium text-[#2D3B36]">{drone.currentTask}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#556960]">{t("drone.coverage")}:</span>
                    <span className="font-semibold text-[#0F2E24]">{drone.coveragePercent}%</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#556960] pt-1 border-t border-[#E5E0D8]">
                    <span>{t("drone.lastUpdate")}: 2 {t("drone.minAgo")}</span>
                    <span className="italic">{drone.isDemonstrationData ? t("drone.sampleTelemetryBadge") : t("drone.liveTelemetryBadge")}</span>
                  </div>
                </div>

                {/* Demonstration Action Button (No real hardware launch) */}
                <div className="mt-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayDemo(drone.id);
                    }}
                    disabled={isSimulatingPlayback}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1C4A3A] hover:bg-[#0F2E24] disabled:bg-[#556960]/50 text-white py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors duration-150"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isSimulatingPlayback ? t("drone.simulatingFlight") : t("drone.playDemo")}</span>
                  </button>
                  <p className="mt-1 text-[10px] text-[#556960] text-center">
                    {t("drone.launchSafetyNotice")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Transmission & Findings */}
        <div className="lg:col-span-2 space-y-6">
          {selectedDrone ? (
            <>
              {/* Transmission Card */}
              <div className="bg-white rounded-xl p-5 border border-[#E5E0D8] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-[#0F2E24]">
                      {t("drone.liveTransmission")} — {selectedDrone.name}
                    </h3>
                    <p className="text-[11px] text-[#556960]">
                      {t("drone.canopyDemonstrationFeed")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F4F1EA] text-[#556960] border border-[#E5E0D8]">
                      {t("drone.sampleFootage")}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E2F0D9] text-[#1C4A3A] border border-[#9BE564]/50">
                      <CheckCircle2 className="w-3 h-3 text-[#1C4A3A]" />
                      {t("drone.demonstrationActive")}
                    </span>
                  </div>
                </div>

                <div className="relative bg-[#0F2E24] rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img 
                    src="/images/Drones-1.jpg"
                    alt={t("drone.sampleFootage")}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs border border-white/20">
                      {t("drone.sampleFootage")}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/60 text-[#9BE564] backdrop-blur-xs border border-white/20">
                      {selectedDrone.cameraResolution}
                    </span>
                  </div>

                  {/* Bottom Telemetry Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#9BE564]" />
                          <span>{t("drone.location")}: {selectedDrone.location.lat.toFixed(4)}°N, {selectedDrone.location.lng.toFixed(4)}°E</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#9BE564]" />
                          <span>{t("drone.altitude")}: {selectedDrone.altitudeMeters}m</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-white/80">
                        {t("drone.telemetryTrustNotice")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detections / Findings Feed */}
              <div className="bg-white rounded-xl p-5 border border-[#E5E0D8] shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-[#0F2E24]">{t("drone.latestDetections")}</h3>
                    <p className="text-[11px] text-[#556960]">{t("drone.inspectionsNotice")}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#556960]">
                    {selectedDrone.findings.length} {t("drone.findingsCount")}
                  </span>
                </div>

                {selectedDrone.findings.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDrone.findings.map((finding) => (
                      <div
                        key={finding.id}
                        className={`p-3.5 rounded-lg border ${getSeverityStyle(finding.severity)}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {finding.type === 'pest' || finding.type === 'disease' ? (
                              <AlertTriangle className="w-5 h-5 text-[#8B0000]" />
                            ) : finding.type === 'irrigation' ? (
                              <Zap className="w-5 h-5 text-[#8C6D1F]" />
                            ) : (
                              <Activity className="w-5 h-5 text-[#1C4A3A]" />
                            )}
                          </div>
                          
                          <div className="flex-1 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-[#0F2E24]">{getDetectionTypeLabel(finding.type)}</h4>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border">
                                {getPriorityLabel(finding.severity)}
                              </span>
                            </div>
                            <p className="text-[#2D3B36] mb-1.5">{finding.description}</p>
                            <div className="flex items-center space-x-1 text-[#556960] text-[11px]">
                              <MapPin className="w-3 h-3 text-[#1C4A3A]" />
                              <span>{finding.location}</span>
                            </div>
                          </div>

                          {/* Fallback-safe Detection Image */}
                          <ImageWithFallback 
                            src={finding.image}
                            alt={getDetectionTypeLabel(finding.type)}
                            fallbackLabel={t("drone.evidenceUnavailable")}
                            className="w-16 h-16 object-cover rounded-md border border-[#E5E0D8] shrink-0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs text-[#556960] bg-[#F4F1EA] rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-[#1C4A3A] mx-auto mb-2" />
                    <p className="font-medium text-[#0F2E24]">{t("drone.allSystemsNormal")}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl p-8 border border-[#E5E0D8] text-center text-[#556960] text-xs">
              {t("drone.noDeviceSelected")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DroneMonitoring;
