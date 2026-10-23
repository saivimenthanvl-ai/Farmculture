import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Calendar, Zap, Info, ShieldAlert, Sparkles } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface CropHealth {
  fieldId: string;
  fieldNameKey: string;
  cropTypeKey: string;
  healthScore: number;
  issues: Array<{
    type: 'disease' | 'pest' | 'nutrient' | 'water';
    severity: 'low' | 'medium' | 'high';
    descriptionKey: string;
    recommendationKey: string;
    confidence: number;
  }>;
  growthStageKey: string;
  expectedHarvest: string;
  yieldPrediction: number;
  lastScannedTime: string;
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
    // Simulate brief initial dataset fetch
    await new Promise((resolve) => setTimeout(resolve, 400));

    const mockCrops: CropHealth[] = [
      {
        fieldId: '1',
        fieldNameKey: 'health.fieldNorth',
        cropTypeKey: 'market.commodities.tomato',
        healthScore: 85,
        issues: [
          {
            type: 'disease',
            severity: 'medium',
            descriptionKey: 'health.issueLeafBlight',
            recommendationKey: 'health.recoFungicide',
            confidence: 0,
          },
        ],
        growthStageKey: 'health.stageFlowering',
        expectedHarvest: '2025-02-15',
        yieldPrediction: 12.5,
        lastScannedTime: `2 ${t('health.hoursAgo')}`,
      },
      {
        fieldId: '2',
        fieldNameKey: 'health.fieldSouth',
        cropTypeKey: 'market.commodities.onion',
        healthScore: 92,
        issues: [],
        growthStageKey: 'health.stageBulbDev',
        expectedHarvest: '2025-03-01',
        yieldPrediction: 8.2,
        lastScannedTime: `1 ${t('health.dayAgo')}`,
      },
      {
        fieldId: '3',
        fieldNameKey: 'health.fieldEast',
        cropTypeKey: 'health.cropCabbage',
        healthScore: 78,
        issues: [
          {
            type: 'pest',
            severity: 'high',
            descriptionKey: 'health.issueAphids',
            recommendationKey: 'health.recoNeem',
            confidence: 0,
          },
          {
            type: 'nutrient',
            severity: 'low',
            descriptionKey: 'health.issueNitrogen',
            recommendationKey: 'health.recoUrea',
            confidence: 0,
          },
        ],
        growthStageKey: 'health.stageHeadFormation',
        expectedHarvest: '2025-02-28',
        yieldPrediction: 15.8,
        lastScannedTime: `6 ${t('health.hoursAgo')}`,
      },
    ];

    setCrops(mockCrops);
    setSelectedCrop(mockCrops[0]);
    setLoading(false);
  };

  const startSimulationScan = async () => {
    setScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const updatedCrops = crops.map((crop) => ({
      ...crop,
      lastScannedTime: t('health.justNow'),
      healthScore: Math.min(98, Math.max(72, crop.healthScore + (Math.random() > 0.5 ? 2 : -2))),
    }));

    setCrops(updatedCrops);
    if (selectedCrop) {
      const currentUpdated = updatedCrops.find((c) => c.fieldId === selectedCrop.fieldId);
      if (currentUpdated) setSelectedCrop(currentUpdated);
    }
    setScanning(false);
  };

  const getHealthBadge = (score: number) => {
    if (score >= 90) return <Badge variant="lime">{score}% {t('health.healthy')}</Badge>;
    if (score >= 75) return <Badge variant="warning">{score}% Moderate</Badge>;
    return <Badge variant="danger">{score}% Low</Badge>;
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="danger">HIGH SEVERITY</Badge>;
      case 'medium':
        return <Badge variant="warning">MEDIUM SEVERITY</Badge>;
      default:
        return <Badge variant="default">LOW / MINOR</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-sm text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#1C4A3A] border-t-transparent mx-auto" />
        <p className="text-xs text-[#787266]">{t('health.analyzingSat')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-[#0F2E24] py-2">
      {/* Header Banner with Honest Demonstration Badge */}
      <div className="agri-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E3D8]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="warning">{t('health.simulationMode')}</Badge>
              <span className="text-xs text-[#787266]">·</span>
              <span className="text-xs text-[#787266] font-medium">Educational Prototype</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-[#0F2E24]">
              {t('health.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#787266] max-w-2xl">
              {t('health.subtitle')}
            </p>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={startSimulationScan}
            disabled={scanning}
            loading={scanning}
            icon={<Zap className="w-4 h-4" />}
            className="self-start sm:self-auto shrink-0"
          >
            {scanning ? t('health.scanning') : t('health.aiScan')}
          </Button>
        </div>

        {/* Prominent Educational Notice Avoiding Actionable False Claims */}
        <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] flex items-start gap-2.5 text-xs text-[#787266]">
          <ShieldAlert className="w-4 h-4 text-[#E9A23B] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t('health.simulationNotice')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sample Field List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-sm font-bold text-[#0F2E24] px-1">
            {t('health.yourFields')}
          </h2>

          <div className="space-y-2.5">
            {crops.map((crop) => {
              const isSelected = selectedCrop?.fieldId === crop.fieldId;
              return (
                <div
                  key={crop.fieldId}
                  onClick={() => setSelectedCrop(crop)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-white border-[#1C4A3A] shadow-sm ring-1 ring-[#1C4A3A]'
                      : 'bg-[#FAF9F5] border-[#E7E3D8] hover:bg-white hover:border-[#D3CDC0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-[#0F2E24]">
                      {t(crop.fieldNameKey)}
                    </h3>
                    {getHealthBadge(crop.healthScore)}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#787266]">
                    <span>{t(crop.cropTypeKey)}</span>
                    <span className="font-mono text-[10px] text-[#A8A092]">
                      {t('health.lastScan')}: {crop.lastScannedTime}
                    </span>
                  </div>

                  {crop.issues.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1 border-t border-[#E7E3D8] text-[11px] font-semibold text-[#E9A23B]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{crop.issues.length} {t('health.issuesFound')}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Demonstration View */}
        <div className="lg:col-span-2">
          {selectedCrop && (
            <div className="agri-card p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E3D8]">
                <div>
                  <h3 className="text-base font-bold text-[#0F2E24] font-display">
                    {t(selectedCrop.fieldNameKey)}
                  </h3>
                  <p className="text-xs text-[#787266] mt-0.5">
                    {t(selectedCrop.cropTypeKey)} · {t(selectedCrop.growthStageKey)}
                  </p>
                </div>
                {getHealthBadge(selectedCrop.healthScore)}
              </div>

              {/* Benchmark Stat Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-center space-y-1">
                  <Activity className="w-4 h-4 text-[#1C4A3A] mx-auto" />
                  <div className="text-xs font-bold text-[#0F2E24]">{t(selectedCrop.cropTypeKey)}</div>
                  <div className="text-[10px] text-[#787266]">{t('health.cropType')}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-center space-y-1">
                  <TrendingUp className="w-4 h-4 text-[#1C4A3A] mx-auto" />
                  <div className="text-xs font-bold text-[#0F2E24]">{t(selectedCrop.growthStageKey)}</div>
                  <div className="text-[10px] text-[#787266]">{t('health.growthStage')}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-center space-y-1">
                  <Sparkles className="w-4 h-4 text-[#E9A23B] mx-auto" />
                  <div className="text-xs font-mono font-bold text-[#0F2E24]">{selectedCrop.yieldPrediction} tons</div>
                  <div className="text-[10px] text-[#787266]">{t('health.predictedYield')}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-center space-y-1">
                  <Calendar className="w-4 h-4 text-[#1C4A3A] mx-auto" />
                  <div className="text-xs font-mono font-bold text-[#0F2E24]">{selectedCrop.expectedHarvest}</div>
                  <div className="text-[10px] text-[#787266]">{t('health.expectedHarvest')}</div>
                </div>
              </div>

              {/* Agronomic Observations Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#787266]">
                  {t('health.cropIssues')}
                </h4>

                {selectedCrop.issues.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCrop.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#0F2E24]">
                            {issue.type === 'disease'
                              ? t('health.diseaseIssue')
                              : issue.type === 'pest'
                              ? t('health.pestIssue')
                              : t('health.nutrientIssue')}
                          </span>
                          {getSeverityBadge(issue.severity)}
                        </div>

                        <p className="text-xs text-[#787266] leading-relaxed">
                          {t(issue.descriptionKey)}
                        </p>

                        <div className="p-3 rounded-lg bg-white border border-[#E7E3D8] text-xs text-[#0F2E24] space-y-1">
                          <span className="font-bold text-[#1C4A3A] block text-[11px] uppercase tracking-wide">
                            {t('health.recommendations') || 'Recommendations'}:
                          </span>
                          <p className="text-[#787266] leading-relaxed">
                            {t(issue.recommendationKey)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] space-y-2">
                    <CheckCircle className="w-8 h-8 text-[#2F9E6B] mx-auto" />
                    <h5 className="font-bold text-sm text-[#0F2E24]">
                      {t('health.allGood')}
                    </h5>
                    <p className="text-xs text-[#787266] max-w-md mx-auto">
                      {t('health.noIssuesDetected')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropHealthMonitor;
