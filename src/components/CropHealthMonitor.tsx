import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Zap,
  ShieldAlert,
  Sparkles,
  X,
  Clock,
  Layers,
  Leaf,
  MapPin,
  Camera,
  Satellite,
  ChevronRight,
  Upload,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card';
import { DataTable, Column } from './ui/DataTable';
import {
  CropHealthPlot,
  CropIssue,
  HealthTrendPoint,
  GrowthStage,
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

const PHENOLOGICAL_STAGES: { key: GrowthStage; label: string }[] = [
  { key: 'vegetative', label: 'Vegetative' },
  { key: 'flowering', label: 'Flowering' },
  { key: 'bulb_development', label: 'Bulb Dev' },
  { key: 'head_formation', label: 'Head Form' },
  { key: 'maturity', label: 'Maturity' },
];

export const CropHealthMonitor: React.FC = () => {
  const { t, interfaceLocale } = useLocalization();

  const [plots, setPlots] = useState<CropHealthPlot[]>([]);
  const [selectedPlotId, setSelectedPlotId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState<'ndvi' | 'moisture' | 'rgb'>('ndvi');
  const [showNoticeBanner, setShowNoticeBanner] = useState(true);

  // Scan modal state
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scanType, setScanType] = useState<'multispectral_satellite' | 'field_photo'>('multispectral_satellite');
  const [scanning, setScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  useEffect(() => {
    loadPlots();
  }, []);

  const loadPlots = async () => {
    setLoading(true);
    try {
      const data = await getCropHealthPlots();
      setPlots(data);
      if (data.length > 0) {
        setSelectedPlotId(data[0].fieldId);
      }
    } catch (err) {
      console.error('Failed to load crop health plots', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedPlot = plots.find((p) => p.fieldId === selectedPlotId) || plots[0];

  const handleExecuteScan = async () => {
    if (!selectedPlot) return;
    setScanning(true);
    setScanSuccess(false);

    try {
      const result = await runCropHealthScan({
        fieldId: selectedPlot.fieldId,
        scanType,
      });

      // Update plots with fresh scan data
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

      setScanSuccess(true);
      setTimeout(() => {
        setScanModalOpen(false);
        setScanning(false);
        setScanSuccess(false);
      }, 1500);
    } catch (err) {
      console.error('Scan error', err);
      setScanning(false);
    }
  };

  const getSeverityBadge = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return (
          <Badge variant="danger" dot>
            HIGH SEVERITY
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="warning" dot>
            MEDIUM SEVERITY
          </Badge>
        );
      default:
        return (
          <Badge variant="default" dot>
            LOW / MINOR
          </Badge>
        );
    }
  };

  // Issues Table columns
  const issueColumns: Column<CropIssue>[] = [
    {
      header: 'Severity',
      cell: (issue) => getSeverityBadge(issue.severity),
      className: 'w-36',
    },
    {
      header: 'Observation / Diagnosis',
      cell: (issue) => (
        <div className="space-y-0.5">
          <div className="font-bold text-[#0F2E24] text-xs uppercase tracking-wide">
            {issue.title}
          </div>
          <p className="text-[11px] text-[#787266] leading-relaxed">
            {issue.description}
          </p>
        </div>
      ),
    },
    {
      header: 'Impact & Confidence',
      cell: (issue) => (
        <div className="text-[11px] font-mono text-[#575249] space-y-0.5 tabular-nums">
          <div>Area: {issue.affectedAreaPercent}%</div>
          <div className="text-[10px] text-[#A8A092]">Conf: {issue.confidencePercent}%</div>
        </div>
      ),
      className: 'w-36',
    },
    {
      header: 'Recommended Action',
      cell: (issue) => (
        <div className="text-xs text-[#0F2E24] p-2.5 rounded-lg bg-[#FAF9F5] border border-[#E7E3D8] leading-relaxed">
          <span className="font-semibold text-[#1C4A3A] block text-[10px] uppercase tracking-wider mb-0.5">
            Advisory:
          </span>
          {issue.recommendationCategory}
        </div>
      ),
    },
  ];

  if (loading || !selectedPlot) {
    return (
      <div className="max-w-4xl mx-auto p-12 bg-white rounded-2xl shadow-sm text-center space-y-4 border border-[#E7E3D8]">
        <div className="animate-spin rounded-full h-9 w-9 border-2 border-[#1C4A3A] border-t-transparent mx-auto" />
        <p className="text-xs text-[#787266] font-medium">Loading field health telemetry…</p>
      </div>
    );
  }

  // Health Score SVG geometry
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (selectedPlot.healthScore / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-[#0F2E24] py-2">
      {/* Dismissible Sample Data Notice Banner */}
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
                <span className="text-[11px] text-[#787266]">Demonstration Prototypes</span>
              </div>
              <p className="text-xs text-[#575249] leading-relaxed max-w-4xl">
                Sample data — connect a field to see live results. The observations, growth stages, and health scores shown below are pre-computed demonstration benchmark samples. Do not apply chemical pesticides or fertilizers without physical in-field inspection and laboratory verification.{' '}
                <Link to="/disclaimer" className="text-[#1C4A3A] underline font-semibold hover:text-[#0F2E24]">
                  Read Agricultural Disclaimer
                </Link>.
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

      {/* Main Page Header & Field Switcher */}
      <div className="agri-card p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E3D8]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C4A3A]">
                Agronomic Remote Sensing
              </span>
              <span className="text-xs text-[#A8A092]">·</span>
              <Badge variant="outline">Field Health Index</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-[#0F2E24]">
              {t('health.title') || 'Crop Health Monitor'}
            </h1>
            <p className="text-xs sm:text-sm text-[#787266]">
              {t('health.subtitle') || 'Multispectral vegetation indices, growth phenology, and flagged conditions.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="accent"
              size="md"
              onClick={() => setScanModalOpen(true)}
              icon={<Zap className="w-4 h-4" />}
            >
              Run Diagnostic Scan
            </Button>
          </div>
        </div>

        {/* Field Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:thin] [scrollbar-color:#D3CDC0_transparent]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#787266] shrink-0 mr-2">
            Select Field Plot:
          </span>
          {plots.map((plot) => (
            <button
              key={plot.fieldId}
              onClick={() => setSelectedPlotId(plot.fieldId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedPlotId === plot.fieldId
                  ? 'bg-[#0F2E24] text-white shadow-xs'
                  : 'bg-[#FAF9F5] text-[#575249] hover:bg-[#E7E3D8] border border-[#E7E3D8]'
              }`}
            >
              {plot.fieldName} ({plot.acreage} ac)
            </button>
          ))}
        </div>
      </div>

      {/* Top Workspace Grid: Map & Field Boundary View + Health Score Ring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map / Field Boundary Simulation (8 cols) */}
        <div className="lg:col-span-8 agri-card p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E7E3D8]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#1C4A3A]" />
              <h2 className="font-bold text-sm text-[#0F2E24] font-display">
                Field Boundary & Multispectral Canopy View
              </h2>
            </div>

            {/* Layer Toggles */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F5] p-1 rounded-xl border border-[#E7E3D8] text-xs">
              <button
                onClick={() => setActiveLayer('ndvi')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeLayer === 'ndvi'
                    ? 'bg-[#1C4A3A] text-white shadow-2xs'
                    : 'text-[#787266] hover:text-[#0F2E24]'
                }`}
              >
                NDVI Index
              </button>
              <button
                onClick={() => setActiveLayer('moisture')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeLayer === 'moisture'
                    ? 'bg-[#1C4A3A] text-white shadow-2xs'
                    : 'text-[#787266] hover:text-[#0F2E24]'
                }`}
              >
                Moisture (NDWI)
              </button>
              <button
                onClick={() => setActiveLayer('rgb')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeLayer === 'rgb'
                    ? 'bg-[#1C4A3A] text-white shadow-2xs'
                    : 'text-[#787266] hover:text-[#0F2E24]'
                }`}
              >
                Natural RGB
              </button>
            </div>
          </div>

          {/* Simulated Satellite Canvas */}
          <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-[#1B2920] border border-[#2B3E31] flex items-center justify-center">
            {/* Grid coordinate overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#9BE564_1px,transparent_1px)] opacity-15 [background-size:24px_24px]" />

            {/* Simulated Field Polygon */}
            <svg viewBox="0 0 400 240" className="w-full h-full select-none">
              <defs>
                <linearGradient id="ndviGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2F9E6B" stopOpacity="0.75" />
                  <stop offset="60%" stopColor="#9BE564" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E9A23B" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="moistureGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3E8E8A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1C4A3A" stopOpacity="0.85" />
                </linearGradient>
              </defs>

              {/* Simulated Plot Perimeter Polygon */}
              <polygon
                points="60,40 340,30 360,190 290,210 90,200 40,110"
                fill={activeLayer === 'moisture' ? 'url(#moistureGrad)' : 'url(#ndviGrad)'}
                stroke="#9BE564"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />

              {/* Stress zone highlight indicator */}
              {selectedPlot.issues.length > 0 && (
                <g>
                  <circle cx="280" cy="140" r="28" fill="#C8553D" fillOpacity="0.4" stroke="#C8553D" strokeWidth="1.5" />
                  <text x="280" y="144" textAnchor="middle" className="fill-white text-[10px] font-bold font-mono">
                    Stress Zone
                  </text>
                </g>
              )}

              {/* Sector text marker */}
              <text x="75" y="65" className="fill-white/80 text-[11px] font-mono font-bold">
                {selectedPlot.fieldName}
              </text>
              <text x="75" y="80" className="fill-white/60 text-[9px] font-mono">
                {selectedPlot.variety} · {selectedPlot.acreage} ha
              </text>
            </svg>

            {/* Bottom telemetry overlay pill */}
            <div className="absolute bottom-3 left-3 bg-[#0F2E24]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#2B3E31] text-[11px] font-mono text-white flex items-center gap-3">
              <span>NDVI: {selectedPlot.ndviBenchmark}</span>
              <span>•</span>
              <span>Resolution: 10m/px</span>
              <span>•</span>
              <span>Pass: Sentinel-2 Benchmark</span>
            </div>
          </div>
        </div>

        {/* Health Score Ring & Key KPI Readout (4 cols) */}
        <div className="lg:col-span-4 agri-card p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-[#0F2E24] font-display">
              Canopy Vigor Score
            </h3>
            <p className="text-xs text-[#787266]">
              Aggregated multispectral vegetative index
            </p>
          </div>

          {/* SVG Circular Progress Meter */}
          <div className="flex items-center justify-center py-2">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-[#E7E3D8]"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-[#1C4A3A] transition-all duration-500 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-[#0F2E24] font-mono tabular-nums">
                  {selectedPlot.healthScore}%
                </span>
                <span className="text-[10px] text-[#787266] uppercase font-bold tracking-wider">
                  Health Index
                </span>
              </div>
            </div>
          </div>

          {/* Summary KPIs */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E7E3D8] text-xs">
            <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8]">
              <div className="text-[10px] text-[#787266] font-medium">Est. Yield</div>
              <div className="text-sm font-bold text-[#0F2E24] font-mono mt-0.5">
                {selectedPlot.estimatedYieldQuintals} Qtl
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8]">
              <div className="text-[10px] text-[#787266] font-medium">Last Scan</div>
              <div className="text-sm font-bold text-[#0F2E24] font-mono mt-0.5 truncate">
                {formatRelativeTime(selectedPlot.lastScannedIso, interfaceLocale)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phenological Growth Stage Stepper */}
      <div className="agri-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#0F2E24] font-display">
            Phenological Growth Progress
          </h3>
          <span className="text-xs text-[#1C4A3A] font-bold font-mono uppercase">
            Target Harvest: {formatDate(selectedPlot.expectedHarvestDate, interfaceLocale)}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 pt-2">
          {PHENOLOGICAL_STAGES.map((stage, idx) => {
            const isCompleted = PHENOLOGICAL_STAGES.findIndex((s) => s.key === selectedPlot.growthStage) >= idx;
            const isCurrent = stage.key === selectedPlot.growthStage;

            return (
              <div key={stage.key} className="space-y-2 text-center">
                <div
                  className={`h-2 rounded-full transition-all ${
                    isCurrent
                      ? 'bg-[#9BE564] ring-2 ring-[#1C4A3A]'
                      : isCompleted
                      ? 'bg-[#1C4A3A]'
                      : 'bg-[#E7E3D8]'
                  }`}
                />
                <span
                  className={`text-[11px] block truncate ${
                    isCurrent
                      ? 'font-bold text-[#0F2E24]'
                      : isCompleted
                      ? 'font-semibold text-[#1C4A3A]'
                      : 'text-[#A8A092]'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 30-Day Health Trend Sparkline */}
      <div className="agri-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E7E3D8]">
          <div className="space-y-0.5">
            <h3 className="font-bold text-sm text-[#0F2E24] font-display">
              30-Day Vegetation Index Trend
            </h3>
            <p className="text-xs text-[#787266]">
              Historical NDVI reflectance curve across current crop cycle
            </p>
          </div>
          <span className="text-xs font-mono text-[#787266]">
            30 Data Points
          </span>
        </div>

        {/* SVG Sparkline Curve */}
        <div className="w-full h-44 select-none">
          <svg viewBox="0 0 600 140" className="w-full h-full overflow-visible">
            {/* Baseline gridlines */}
            <line x1="0" y1="20" x2="600" y2="20" stroke="#E7E3D8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="70" x2="600" y2="70" stroke="#E7E3D8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="#E7E3D8" strokeWidth="1" strokeDasharray="3 3" />

            {/* Sparkline Path */}
            {selectedPlot.trend30Days.length > 1 && (
              <path
                d={selectedPlot.trend30Days
                  .map((point, i) => {
                    const x = (i / (selectedPlot.trend30Days.length - 1)) * 600;
                    const y = 130 - ((point.healthScore - 40) / 60) * 110;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#1C4A3A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>
        <div className="flex items-center justify-between text-[11px] text-[#787266] pt-1 border-t border-[#F3F1E9]">
          <span>30 Days Ago</span>
          <span>15 Days Ago</span>
          <span>Today (Score: {selectedPlot.healthScore}%)</span>
        </div>
      </div>

      {/* Flagged Issues Data Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-sm text-[#0F2E24] font-display">
            Flagged Anomalies & Agronomic Guidance
          </h3>
          <span className="text-xs font-mono text-[#787266]">
            {pluralizeIssues(selectedPlot.issues.length, interfaceLocale)}
          </span>
        </div>

        <DataTable
          data={selectedPlot.issues}
          columns={issueColumns}
          keyExtractor={(issue) => issue.id}
          emptyMessage="No anomalies or fungal stress detected in current observation benchmark."
        />
      </div>

      {/* Interactive Scan Modal Flow */}
      {scanModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => !scanning && setScanModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl border border-[#E7E3D8] shadow-2xl w-full max-w-md p-6 space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E3D8]">
              <div className="flex items-center gap-2">
                <Satellite className="w-5 h-5 text-[#1C4A3A]" />
                <h3 className="font-bold text-base text-[#0F2E24] font-display">
                  Initiate Field Diagnostic Scan
                </h3>
              </div>
              {!scanning && (
                <button
                  onClick={() => setScanModalOpen(false)}
                  className="p-1 rounded-lg text-[#787266] hover:text-[#0F2E24]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {scanSuccess ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#2F9E6B] mx-auto animate-bounce" />
                <h4 className="font-bold text-base text-[#0F2E24]">Scan Telemetry Updated</h4>
                <p className="text-xs text-[#787266] max-w-xs mx-auto">
                  Benchmark multispectral reflectance successfully processed and calibrated.
                </p>
              </div>
            ) : scanning ? (
              <div className="py-8 text-center space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-3 border-[#1C4A3A] border-t-transparent mx-auto" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#0F2E24]">
                    Processing Multispectral Bands…
                  </h4>
                  <p className="text-xs text-[#787266]">
                    Calibrating Sentinel-2 vegetation indices and anomaly thresholds.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0F2E24] uppercase tracking-wider block">
                    Diagnostic Mode:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setScanType('multispectral_satellite')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        scanType === 'multispectral_satellite'
                          ? 'border-[#1C4A3A] bg-[#EDF4F0] text-[#0F2E24] font-bold ring-1 ring-[#1C4A3A]'
                          : 'border-[#E7E3D8] bg-[#FAF9F5] text-[#575249]'
                      }`}
                    >
                      <Satellite className="w-4 h-4 mb-1 text-[#1C4A3A]" />
                      Satellite Pass
                    </button>
                    <button
                      onClick={() => setScanType('field_photo')}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        scanType === 'field_photo'
                          ? 'border-[#1C4A3A] bg-[#EDF4F0] text-[#0F2E24] font-bold ring-1 ring-[#1C4A3A]'
                          : 'border-[#E7E3D8] bg-[#FAF9F5] text-[#575249]'
                      }`}
                    >
                      <Camera className="w-4 h-4 mb-1 text-[#1C4A3A]" />
                      Leaf Photo
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E7E3D8] text-xs text-[#575249] space-y-1">
                  <span className="font-bold text-[#1C4A3A] block text-[11px] uppercase">
                    Verification Advisory:
                  </span>
                  <p className="leading-relaxed text-[11px]">
                    This simulated diagnostic pipeline produces educational estimates. Never purchase chemical remedies based solely on synthetic model results without agricultural officer confirmation.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={handleExecuteScan}
                  icon={<Zap className="w-4 h-4" />}
                >
                  Start Scan Sequence
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropHealthMonitor;
