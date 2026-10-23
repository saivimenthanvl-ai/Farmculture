import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Zap,
  Info,
  ShieldAlert,
  Sparkles,
  X,
  Clock,
  Layers,
  Leaf,
} from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import {
  CropHealthPlot,
  CropIssue,
} from '../lib/cropHealthSchema';
import {
  getCropHealthPlots,
  runCropHealthScan,
} from '../lib/cropHealthService';
import {
  formatDate,
  formatRelativeTime,
  pluralizeIssues,
} from '../lib/formatters';

export const CropHealthMonitor: React.FC = () => {
  const { t, interfaceLocale } = useLocalization();

  const [plots, setPlots] = useState<CropHealthPlot[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<CropHealthPlot | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [showNoticeBanner, setShowNoticeBanner] = useState(true);

  useEffect(() => {
    loadPlots();
  }, []);

  const loadPlots = async () => {
    setLoading(true);
    try {
      const data = await getCropHealthPlots();
      setPlots(data);
      if (data.length > 0) {
        setSelectedPlot(data[0]);
      }
    } catch (err) {
      console.error('Failed to load crop health plots', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunScan = async () => {
    if (!selectedPlot) return;
    setScanning(true);
    try {
      const result = await runCropHealthScan({
        fieldId: selectedPlot.fieldId,
        scanType: 'multispectral_satellite',
      });

      // Update plot in state with new timestamp and validated scan response
      setPlots((prev) =>
        prev.map((plot) =>
          plot.fieldId === selectedPlot.fieldId
            ? {
                ...plot,
                lastScannedIso: result.timestamp,
                healthScore: result.healthScore,
              }
            : plot
        )
      );

      setSelectedPlot((prev) =>
        prev
          ? {
              ...prev,
              lastScannedIso: result.timestamp,
              healthScore: result.healthScore,
            }
          : prev
      );
    } catch (err) {
      console.error('Scan failed', err);
    } finally {
      setScanning(false);
    }
  };

  const getHealthBadge = (score: number) => {
    if (score >= 90)
      return (
        <Badge variant="lime" dot>
          {score}% Optimal
        </Badge>
      );
    if (score >= 75)
      return (
        <Badge variant="warning" dot>
          {score}% Moderate
        </Badge>
      );
    return (
      <Badge variant="danger" dot>
        {score}% Under Stress
      </Badge>
    );
  };

  const getSeverityBadge = (severity: 'low' | 'medium' | 'high') => {
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
      <div className="max-w-4xl mx-auto p-12 bg-white rounded-2xl shadow-sm text-center space-y-4 border border-[#E7E3D8]">
        <div className="animate-spin rounded-full h-9 w-9 border-2 border-[#1C4A3A] border-t-transparent mx-auto" />
        <p className="text-xs text-[#787266] font-medium">
          Loading crop health data…
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-[#0F2E24] py-2">
      {/* Dismissible Page-Level Notice: Replaces individual 'simulationMode' tags */}
      {showNoticeBanner && (
        <div
          role="region"
          aria-label="Sample data notice"
          className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E7E3D8] shadow-xs flex items-start justify-between gap-3 animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E9A23B]/15 text-[#E9A23B] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C4A3A]">
                  Sample Data Environment
                </span>
                <span className="text-xs text-[#A8A092]">·</span>
                <span className="text-[11px] text-[#787266]">
                  Demonstration Prototypes
                </span>
              </div>
              <p className="text-xs text-[#575249] leading-relaxed max-w-4xl">
                Sample data — connect a field to see live results. The observations, growth stages, and health scores shown below are pre-computed demonstration benchmark samples. Do not apply chemical pesticides or fertilizers without physical in-field inspection and laboratory verification.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowNoticeBanner(false)}
            className="p-1 rounded-lg text-[#787266] hover:text-[#0F2E24] hover:bg-[#E7E3D8]/50 transition-colors"
            title="Dismiss notice"
            aria-label="Dismiss sample data banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Page Header */}
      <div className="agri-card p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E3D8]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Field Health Index</Badge>
              <span className="text-xs text-[#787266]">·</span>
              <span className="text-xs text-[#787266] font-medium">
                Remote Sensing Benchmark
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-[#0F2E24]">
              {t('health.title') || 'Crop Health Monitor'}
            </h1>
            <p className="text-xs sm:text-sm text-[#787266] max-w-2xl">
              {t('health.subtitle') ||
                'Remote sensing vegetation indices and educational pest/nutrient patterns.'}
            </p>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={handleRunScan}
            disabled={scanning}
            loading={scanning}
            icon={<Zap className="w-4 h-4" />}
            className="self-start sm:self-auto shrink-0"
          >
            {scanning ? 'Running Multispectral Scan…' : 'Run Sample Simulation Scan'}
          </Button>
        </div>
      </div>

      {/* 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sample Field List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-sm font-bold text-[#0F2E24] px-1 flex items-center justify-between">
            <span>{t('health.yourFields') || 'Your Field Plots'}</span>
            <span className="text-xs text-[#787266] font-normal">
              {plots.length} plots
            </span>
          </h2>

          <div className="space-y-2.5">
            {plots.map((plot) => {
              const isSelected = selectedPlot?.fieldId === plot.fieldId;
              const relativeScanTime = formatRelativeTime(
                plot.lastScannedIso,
                interfaceLocale
              );
              const pluralizedIssueText = pluralizeIssues(
                plot.issues.length,
                interfaceLocale,
                {
                  one: 'issue flagged',
                  other: 'issues flagged',
                  zero: 'no issues flagged',
                }
              );

              return (
                <div
                  key={plot.fieldId}
                  onClick={() => setSelectedPlot(plot)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPlot(plot);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E8E8A] ${
                    isSelected
                      ? 'bg-white border-[#1C4A3A] shadow-sm ring-1 ring-[#1C4A3A]'
                      : 'bg-[#FAF9F5] border-[#E7E3D8] hover:bg-white hover:border-[#D3CDC0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs text-[#0F2E24]">
                      {plot.fieldName}
                    </h3>
                    {getHealthBadge(plot.healthScore)}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#787266]">
                    <span>{plot.cropType}</span>
                    <span className="font-mono text-[10px] text-[#A8A092] flex items-center gap-1">
                      <Clock className="w-3 h-3 inline" />
                      <span>{relativeScanTime}</span>
                    </span>
                  </div>

                  {plot.issues.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1 border-t border-[#E7E3D8] text-[11px] font-semibold text-[#E9A23B]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{pluralizedIssueText}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Demonstration View */}
        <div className="lg:col-span-2">
          {selectedPlot && (
            <div className="agri-card p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E3D8]">
                <div>
                  <h3 className="text-base font-bold text-[#0F2E24] font-display">
                    {selectedPlot.fieldName}
                  </h3>
                  <p className="text-xs text-[#787266] mt-0.5">
                    {selectedPlot.cropType} · {selectedPlot.variety} ({selectedPlot.acreage} Acres)
                  </p>
                </div>
                {getHealthBadge(selectedPlot.healthScore)}
              </div>

              {/* KPI Benchmark Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-center space-y-1">
                  <Activity className="w-4 h-4 text-[#1C4A3A] mx-auto" />
                  <div className="text-xs font-mono font-bold text-[#0F2E24]">
                    {selectedPlot.growthStage.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="text-[10px] text-[#787266]">Growth Stage</div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-center space-y-1">
                  <TrendingUp className="w-4 h-4 text-[#1C4A3A] mx-auto" />
                  <div className="text-xs font-mono font-bold text-[#0F2E24]">
                    {selectedPlot.estimatedYieldQuintals} Qtl
                  </div>
                  <div className="text-[10px] text-[#787266]">Estimated Yield</div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-center space-y-1">
                  <Leaf className="w-4 h-4 text-[#1C4A3A] mx-auto" />
                  <div className="text-xs font-mono font-bold text-[#0F2E24]">
                    {selectedPlot.ndviBenchmark}
                  </div>
                  <div className="text-[10px] text-[#787266]">NDVI Index</div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-center space-y-1">
                  <Calendar className="w-4 h-4 text-[#1C4A3A] mx-auto" />
                  <div className="text-xs font-mono font-bold text-[#0F2E24]">
                    {formatDate(selectedPlot.expectedHarvestDate, interfaceLocale)}
                  </div>
                  <div className="text-[10px] text-[#787266]">Target Harvest</div>
                </div>
              </div>

              {/* Agronomic Observations Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#787266] flex items-center justify-between">
                  <span>Flagged Observations & Advisory</span>
                  <span className="text-[11px] font-mono text-[#A8A092]">
                    {pluralizeIssues(selectedPlot.issues.length, interfaceLocale)}
                  </span>
                </h4>

                {selectedPlot.issues.length > 0 ? (
                  <div className="space-y-3">
                    {selectedPlot.issues.map((issue) => (
                      <div
                        key={issue.id}
                        className="p-4 rounded-xl border border-[#E7E3D8] bg-[#FAF9F5] space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#0F2E24] uppercase tracking-wide">
                            {issue.title}
                          </span>
                          {getSeverityBadge(issue.severity)}
                        </div>

                        <p className="text-xs text-[#787266] leading-relaxed">
                          {issue.description}
                        </p>

                        <div className="p-3 rounded-lg bg-white border border-[#E7E3D8] text-xs text-[#0F2E24] space-y-1">
                          <span className="font-bold text-[#1C4A3A] block text-[11px] uppercase tracking-wide">
                            Generic Agronomic Guidance:
                          </span>
                          <p className="text-[#787266] leading-relaxed">
                            {issue.recommendationCategory}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] space-y-2">
                    <CheckCircle className="w-8 h-8 text-[#2F9E6B] mx-auto" />
                    <h5 className="font-bold text-sm text-[#0F2E24]">
                      {t('health.allGood') || 'Nominal Benchmark Status'}
                    </h5>
                    <p className="text-xs text-[#787266] max-w-md mx-auto">
                      {t('health.noIssuesDetected') ||
                        'No anomalies detected in sample baseline dataset.'}
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
