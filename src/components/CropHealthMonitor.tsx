import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Camera, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocalization } from '../contexts/LocalizationContext';

interface CropHealth {
  fieldId: string;
  fieldName: string;
  cropType: string;
  healthScore: number;
  issues: Array<{
    type: 'disease' | 'pest' | 'nutrient' | 'water';
    severity: 'low' | 'medium' | 'high';
    description: string;
    recommendation: string;
    confidence: number;
  }>;
  growthStage: string;
  expectedHarvest: string;
  yieldPrediction: number;
  lastScanned: string;
}

export const CropHealthMonitor: React.FC = () => {
  const { t } = useLocalization();

  const [crops, setCrops] = useState<CropHealth[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<CropHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    fetchCropHealth();
  }, []);

  const fetchCropHealth = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockCrops: CropHealth[] = [
      {
        fieldId: '1',
        fieldName: t("health.fieldNorth") || 'North Field',
        cropType: t("market.commodities.tomato") || 'Tomato',
        healthScore: 85,
        issues: [
          {
            type: 'disease',
            severity: 'medium',
            description: t("health.issueLeafBlight") || 'Simulated pattern: Early foliar spots',
            recommendation: t("health.recoFungicide") || 'Educational advisory: Consult local extension officer for lab verification before treating.',
            confidence: 0 // Unverified simulation
          }
        ],
        growthStage: t("health.stageFlowering") || 'Flowering',
        expectedHarvest: '2025-02-15',
        yieldPrediction: 12.5,
        lastScanned: `2 ${t("health.hoursAgo") || "hours ago"}`
      },
      {
        fieldId: '2',
        fieldName: t("health.fieldSouth") || 'South Field',
        cropType: t("market.commodities.onion") || 'Onion',
        healthScore: 92,
        issues: [],
        growthStage: t("health.stageBulbDev") || 'Bulb Development',
        expectedHarvest: '2025-03-01',
        yieldPrediction: 8.2,
        lastScanned: `1 ${t("health.dayAgo") || "day ago"}`
      },
      {
        fieldId: '3',
        fieldName: t("health.fieldEast") || 'East Field',
        cropType: t("health.cropCabbage") || 'Cabbage',
        healthScore: 78,
        issues: [
          {
            type: 'pest',
            severity: 'high',
            description: t("health.issueAphids") || 'Simulated pattern: Foliage aphid clustering',
            recommendation: t("health.recoNeem") || 'Educational advisory: Inspect underside of leaves and consult agricultural officer.',
            confidence: 0
          },
          {
            type: 'nutrient',
            severity: 'low',
            description: t("health.issueNitrogen") || 'Simulated pattern: Chlorosis pattern',
            recommendation: t("health.recoUrea") || 'Educational advisory: Perform soil testing before nutrient supplementation.',
            confidence: 0
          }
        ],
        growthStage: t("health.stageHeadFormation") || 'Head Formation',
        expectedHarvest: '2025-02-28',
        yieldPrediction: 15.8,
        lastScanned: `6 ${t("health.hoursAgo") || "hours ago"}`
      }
    ];
    
    setCrops(mockCrops);
    setSelectedCrop(mockCrops[0]);
    setLoading(false);
  };

  const startAIScan = async () => {
    setScanning(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedCrops = crops.map(crop => ({
      ...crop,
      lastScanned: t("health.justNow") || 'Just now',
      healthScore: Math.min(100, crop.healthScore + Math.floor(Math.random() * 5))
    }));
    
    setCrops(updatedCrops);
    setScanning(false);
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600 text-sm">{t("health.analyzingSat") || "Analyzing crop health with satellite imagery..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-800">{t("health.title")}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {t("health.simulationMode")}
              </span>
            </div>
            <p className="text-gray-600 text-xs">{t("health.subtitle")}</p>
          </div>
          <motion.button
            onClick={startAIScan}
            disabled={scanning}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 self-start sm:self-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {scanning ? (
              <>
                <motion.div 
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>{t("health.scanning") || "Scanning..."}</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>{t("health.aiScan")}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop List */}
        <div className="lg:col-span-1">
          <h3 className="text-base font-semibold text-gray-800 mb-3">{t("health.yourFields")}</h3>
          <div className="space-y-3">
            {crops.map((crop, index) => (
              <motion.div
                key={crop.fieldId}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedCrop?.fieldId === crop.fieldId
                    ? 'bg-green-100 border-2 border-green-300'
                    : 'bg-white border-2 border-gray-200 hover:border-green-200'
                }`}
                onClick={() => setSelectedCrop(crop)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{crop.fieldName}</h4>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getHealthColor(crop.healthScore)}`}>
                    {crop.healthScore}%
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">{crop.cropType}</p>
                <p className="text-[11px] text-gray-400">{t("health.lastScan")}: {crop.lastScanned}</p>
                {crop.issues.length > 0 && (
                  <div className="flex items-center space-x-1 mt-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-600" />
                    <span className="text-xs font-medium text-yellow-700">{crop.issues.length} {t("health.issuesFound") || "issue(s)"}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-2">
          {selectedCrop && (
            <motion.div
              key={selectedCrop.fieldId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{selectedCrop.fieldName}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getHealthColor(selectedCrop.healthScore)}`}>
                    {selectedCrop.healthScore}% {t("health.healthy") || "Healthy"}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Activity className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-gray-800">{selectedCrop.cropType}</div>
                    <div className="text-[11px] text-gray-500">{t("health.cropType")}</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-gray-800">{selectedCrop.growthStage}</div>
                    <div className="text-[11px] text-gray-500">{t("health.growthStage")}</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-gray-800">{selectedCrop.yieldPrediction} tons</div>
                    <div className="text-[11px] text-gray-500">{t("health.predictedYield")}</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Camera className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                    <div className="text-xs font-bold text-gray-800">{selectedCrop.expectedHarvest}</div>
                    <div className="text-[11px] text-gray-500">{t("health.expectedHarvest")}</div>
                  </div>
                </div>

                {/* Issues */}
                {selectedCrop.issues.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-3">{t("health.cropIssues")}</h4>
                    <div className="space-y-3">
                      {selectedCrop.issues.map((issue, index) => (
                        <motion.div
                          key={index}
                          className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-xs capitalize">
                              {issue.type === 'disease' ? t("health.diseaseIssue") || 'Disease Health Issue' :
                               issue.type === 'pest' ? t("health.pestIssue") || 'Pest Health Issue' :
                               t("health.nutrientIssue") || 'Nutrient Issue'}
                            </h5>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider">{issue.severity}</span>
                              {issue.confidence > 0 ? (
                                <span className="text-[10px]">({issue.confidence}% {t("health.confidence") || "confidence"})</span>
                              ) : (
                                <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-medium">Educational Pattern</span>
                              )}
                            </div>
                          </div>
                          <p className="text-xs mb-2 text-gray-700">{issue.description}</p>
                          <div className="bg-white/80 rounded p-2 text-xs">
                            <p className="font-semibold text-gray-800 mb-0.5">{t("health.recommendation") || "Recommendation"}:</p>
                            <p className="text-gray-600">{issue.recommendation}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <h4 className="text-base font-semibold text-green-800 mb-1">{t("health.allGood") || "Crops Healthy"}</h4>
                    <p className="text-xs text-green-600">{t("health.noIssuesDetected") || "No issues detected in this field. Your crops are healthy!"}</p>
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

export default CropHealthMonitor;
