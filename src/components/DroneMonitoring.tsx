import React, { useState, useEffect } from 'react';
import { Plane, Camera, MapPin, Zap, Activity, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();

  const [drones, setDrones] = useState<DroneData[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<DroneData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    fetchDroneData();
  }, []);

  const fetchDroneData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockDrones: DroneData[] = [
      {
        id: '1',
        name: 'Drone A55',
        status: 'active',
        battery: 78,
        location: { lat: 10.1448, lng: 71.8311 },
        currentTask: 'Crop health monitoring - North Field',
        coverage: 65,
        lastUpdate: '2 minutes ago',
        findings: [
          {
            type: 'pest',
            severity: 'medium',
            location: 'North Field - Section A3',
            description: 'Infection detected on tomato plants',
            image: 'images/pest-detection.png'
          },
          {
            type: 'irrigation',
            severity: 'high',
            location: 'North Field - Section B2',
            description: 'Dry patches detected, irrigation needed',
            image: 'images/irrigation.jpg'
          }
        ]
      },
      {
        id: '2',
        name: 'Farm A55',
        status: 'charging',
        battery: 15,
        location: { lat: 19.0988, lng: 72.8311 },
        currentTask: 'Charging at base station',
        coverage: 100,
        lastUpdate: '30 minutes ago',
        findings: [
          {
            type: 'growth',
            severity: 'low',
            location: 'North Field - Section C1',
            description: 'Optimal growth patterns observed',
            image: 'images/irrigation growth.jpeg'
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
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setDrones(drones.map(drone => 
      drone.id === droneId 
        ? { ...drone, status: 'active' as const, currentTask: 'Launching for field survey' }
        : drone
    ));
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
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // (kept for future use)
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pest': return '🐛';
      case 'disease': return '☣️';
      case 'irrigation': return '💧';
      case 'growth': return '🌿';
      default: return '🌾📈';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600">Connecting to drone fleet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl shadow-lg">
      <div className="mb-6">
        {/* i18n header + subtitle */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("drone.title")}</h2>
        <p className="text-gray-600">{t("drone.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drone Fleet */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("drone.activeDrone")}</h3>
          <div className="space-y-4">
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
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">{drone.name}</h4>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(drone.status)}`}>
                    {drone.status}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Battery:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            drone.battery > 50 ? 'bg-green-500' : 
                            drone.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${drone.battery}%` }}
                        />
                      </div>
                      <span className="font-medium">{drone.battery}%</span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-gray-600">Task:</span>
                    <p className="font-medium text-gray-800">{drone.currentTask}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Coverage:</span>
                    <span className="font-medium">{drone.coverage}%</span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Last update: {drone.lastUpdate}
                  </div>
                </div>
                
                {drone.status !== 'active' && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      launchDrone(drone.id);
                    }}
                    disabled={isLaunching || drone.battery < 20}
                    className="btn-secondary w-full mt-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLaunching ? 'Launching...' : t("drone.launch")}
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
              {/* Live Feed Simulation */}
              <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t("drone.liveFeed")} — {selectedDrone.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">LIVE</span>
                  </div>
                </div>
                
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img 
                    src="images/Drones-1.jpg"
                    alt="Drone aerial view"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>12.2958°N, 76.6394°E</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="w-4 h-4" />
                        <span>Altitude: 50m</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Camera className="w-4 h-4" />
                        <span>4K Recording</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Findings */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{t("drone.recentFindings")}</h3>
                
                {selectedDrone.findings.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDrone.findings.map((finding, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg border ${getSeverityColor(finding.severity)}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="text-2xl">
                            {finding.type === 'pest' ? <AlertTriangle /> :
                             finding.type === 'disease' ? <AlertTriangle /> :
                             finding.type === 'irrigation' ? <Zap /> :
                             finding.type === 'growth' ? <Activity /> : null}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold capitalize">{finding.type} Detection</h4>
                              <span className="text-xs font-medium uppercase">{finding.severity} Priority</span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{finding.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{finding.location}</span>
                            </div>
                          </div>
                          <img 
                            src={finding.image}
                            alt="Finding"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No issues detected. All systems normal!</p>
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
