import React, { useState, useEffect } from 'react';
import { Plane, Camera, MapPin, Zap, Activity, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocalization } from '../contexts/LocalizationContext';

interface DroneData {
  id: string;
  name: string;
  status: 'active' | 'charging' | 'maintenance';
  battery: number;
  location: { lat: number; lng: number };
  currentTask: string;
  coverage: number;
  lastUpdate: string;
  findings: Array<{
    type: 'pest' | 'disease' | 'irrigation' | 'growth';
    severity: 'low' | 'medium' | 'high';
    location: string;
    description: string;
    image: string;
  }>;
}

export const DroneMonitoring: React.FC = () => {
  const { t } = useLocalization();

  const [drones, setDrones] = useState<DroneData[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<DroneData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    fetchDroneData();
  }, []);

  const fetchDroneData = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockDrones: DroneData[] = [
      {
        id: '1',
        name: 'Drone A55',
        status: 'active',
        battery: 78,
        location: { lat: 10.1448, lng: 71.8311 },
        currentTask: `${t("health.cropIssues") || "Crop monitoring"} - ${t("health.fieldNorth") || "North Field"}`,
        coverage: 65,
        lastUpdate: `2 ${t("drone.minAgo") || "minutes ago"}`,
        findings: [
          {
            type: 'pest',
            severity: 'medium',
            location: `${t("health.fieldNorth") || "North Field"} - Section A3`,
            description: t("drone.pestInfectionDesc") || 'Infection detected on tomato plants',
            image: 'images/pest-detection.png'
          },
          {
            type: 'irrigation',
            severity: 'high',
            location: `${t("health.fieldNorth") || "North Field"} - Section B2`,
            description: t("drone.irrigationDryDesc") || 'Low soil moisture detected in sector',
            image: 'images/irrigation-detection.png'
          }
        ]
      },
      {
        id: '2',
        name: 'Drone B12',
        status: 'charging',
        battery: 45,
        location: { lat: 10.1452, lng: 71.8325 },
        currentTask: t("drone.dockedRecharge") || 'Docked at charging station',
        coverage: 100,
        lastUpdate: `15 ${t("drone.minAgo") || "minutes ago"}`,
        findings: [
          {
            type: 'growth',
            severity: 'low',
            location: `${t("health.fieldSouth") || "South Field"} - Sector C`,
            description: t("drone.growthUniformDesc") || 'Uniform vegetative canopy growth observed',
            image: 'images/pest-detection.png'
          }
        ]
      }
    ];
    
    setDrones(mockDrones);
    setSelectedDrone(mockDrones[0]);
    setLoading(false);
  };

  const launchDrone = async (droneId: string) => {
    setIsLaunching(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDrones(drones.map(drone => {
      if (drone.id === droneId) {
        return {
          ...drone,
          status: 'active',
          currentTask: t("drone.patrollingActive") || 'Aerial survey in progress',
          lastUpdate: t("health.justNow") || 'Just now'
        };
      }
      return drone;
    }));
    
    setIsLaunching(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'charging': return 'text-yellow-600 bg-yellow-100';
      case 'maintenance': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return t("drone.active") || 'Active';
      case 'charging': return t("drone.charging") || 'Charging';
      case 'maintenance': return t("drone.maintenance") || 'Maintenance';
      default: return status;
    }
  };

  const getPriorityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return t("drone.priorityHigh") || 'High Priority';
      case 'medium': return t("drone.priorityMedium") || 'Medium Priority';
      case 'low': return t("drone.priorityLow") || 'Low Priority';
      default: return `${severity} Priority`;
    }
  };

  const getDetectionTypeLabel = (type: string) => {
    switch (type) {
      case 'pest': return t("drone.detectionPest") || 'Pest Detection';
      case 'disease': return t("drone.detectionDisease") || 'Disease Detection';
      case 'irrigation': return t("drone.detectionIrrigation") || 'Irrigation Detection';
      case 'growth': return t("drone.detectionGrowth") || 'Growth Detection';
      default: return `${type} Detection`;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600 text-sm">{t("drone.connectingDrones") || "Connecting to aerial telemetry systems..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-gray-800">{t("drone.title")}</h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-300">
            {t("drone.telemetrySimulationMode")}
          </span>
        </div>
        <p className="text-gray-600 text-xs">{t("drone.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drone Fleet */}
        <div className="lg:col-span-1">
          <h3 className="text-base font-semibold text-gray-800 mb-3">{t("drone.activeDronesList")}</h3>
          <div className="space-y-3">
            {drones.map((drone, index) => (
              <motion.div
                key={drone.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedDrone?.id === drone.id
                    ? 'bg-blue-100 border-2 border-blue-300'
                    : 'bg-white border-2 border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => setSelectedDrone(drone)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-gray-800 text-sm">{drone.name}</h4>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(drone.status)}`}>
                    {getStatusLabel(drone.status)}
                  </div>
                </div>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{t("drone.battery")}:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            drone.battery > 50 ? 'bg-green-500' : 
                            drone.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${drone.battery}%` }}
                        />
                      </div>
                      <span className="font-semibold">{drone.battery}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">{t("drone.task")}: </span>
                    <span className="font-medium text-gray-800">{drone.currentTask}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">{t("drone.coverage")}:</span>
                    <span className="font-semibold">{drone.coverage}%</span>
                  </div>
                  
                  <div className="text-[11px] text-gray-400">
                    {t("drone.lastUpdate")}: {drone.lastUpdate}
                  </div>
                </div>
                
                {drone.status !== 'active' && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      launchDrone(drone.id);
                    }}
                    disabled={isLaunching || drone.battery < 20}
                    className="w-full mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors duration-200"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isLaunching ? t("drone.launching") : t("drone.launch")}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-2">
          {selectedDrone && (
            <motion.div
              key={selectedDrone.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Live Transmission Simulation */}
              <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {t("drone.liveTransmission")} — {selectedDrone.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{t("drone.recording")}</span>
                  </div>
                </div>
                
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img 
                    src="images/Drones-1.jpg"
                    alt="Drone aerial view"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white text-xs">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>{t("drone.location")}: 12.2958°N, 76.6394°E</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t("drone.altitude")}: 50m</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t("drone.recording4k")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Detections */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-base font-bold text-gray-800 mb-3">{t("drone.latestDetections")}</h3>
                
                {selectedDrone.findings.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDrone.findings.map((finding, index) => (
                      <motion.div
                        key={index}
                        className={`p-3.5 rounded-lg border ${getSeverityColor(finding.severity)}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="mt-0.5">
                            {finding.type === 'pest' || finding.type === 'disease' ? <AlertTriangle className="w-5 h-5 text-amber-600" /> :
                             finding.type === 'irrigation' ? <Zap className="w-5 h-5 text-blue-600" /> :
                             <Activity className="w-5 h-5 text-emerald-600" />}
                          </div>
                          <div className="flex-1 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-gray-900">{getDetectionTypeLabel(finding.type)}</h4>
                              <span className="text-[10px] font-bold uppercase tracking-wider">{getPriorityLabel(finding.severity)}</span>
                            </div>
                            <p className="text-gray-700 mb-1.5">{finding.description}</p>
                            <div className="flex items-center space-x-1 text-gray-500 text-[11px]">
                              <MapPin className="w-3 h-3 text-blue-500" />
                              <span>{finding.location}</span>
                            </div>
                          </div>
                          <img 
                            src={finding.image}
                            alt="Finding"
                            className="w-14 h-14 object-cover rounded-md border border-gray-200"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-gray-500">
                    <Zap className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p>{t("drone.allSystemsNormal") || "No issues detected. All systems normal!"}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DroneMonitoring;
