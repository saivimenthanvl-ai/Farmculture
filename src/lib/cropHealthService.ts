import {
  CropHealthPlot,
  CropHealthPlotSchema,
  ScanRequest,
  ScanResult,
  ScanResultSchema,
  HealthTrendPoint,
} from "./cropHealthSchema";

/**
 * Generate 30-day realistic historical trend data ending today
 */
function generate30DayTrend(baseScore: number, baseNdvi: number): HealthTrendPoint[] {
  const points: HealthTrendPoint[] = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);

    // Natural vegetation variation curve
    const variance = Math.sin((30 - i) / 5) * 4 + ((i % 3) - 1) * 1.5;
    const score = Math.min(99, Math.max(50, Math.round(baseScore - (i * 0.2) + variance)));
    const ndvi = Math.min(0.92, Math.max(0.2, Math.round((baseNdvi - (i * 0.003) + variance * 0.01) * 100) / 100));
    const ndwi = Math.min(0.7, Math.max(0.1, Math.round((ndvi * 0.65) * 100) / 100));

    points.push({
      date: dateStr,
      healthScore: score,
      ndvi,
      ndwi,
    });
  }
  return points;
}

/**
 * Isolated Sample Datasets (Clearly flagged as sample data)
 */
export const SAMPLE_CROP_PLOTS: CropHealthPlot[] = [
  {
    fieldId: "field-plot-1",
    fieldName: "North Valley Plot — Sector A",
    cropType: "Tomato (Hybrid Shivam)",
    variety: "Lycopersicon esculentum",
    acreage: 3.5,
    healthScore: 84,
    growthStage: "flowering",
    expectedHarvestDate: new Date(Date.now() + 25 * 86400000).toISOString().slice(0, 10),
    estimatedYieldQuintals: 125,
    lastScannedIso: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    ndviBenchmark: 0.78,
    isSampleData: true,
    issues: [
      {
        id: "issue-101",
        type: "disease",
        severity: "medium",
        title: "Early Blight Indicator (Alternaria solani)",
        description: "Dark brown foliar concentric rings detected on lower canopy leaves.",
        affectedAreaPercent: 12,
        confidencePercent: 78,
        recommendationCategory: "Bio-fungicide or Copper Oxychloride spray — Consult local KVK / Agronomist for micro-culture confirmation",
        detectedAt: new Date(Date.now() - 48 * 3600000).toISOString(),
      },
    ],
    trend30Days: generate30DayTrend(84, 0.78),
  },
  {
    fieldId: "field-plot-2",
    fieldName: "South Terrace Plot — Sector B",
    cropType: "Onion (Nashik Red)",
    variety: "Allium cepa",
    acreage: 2.2,
    healthScore: 93,
    growthStage: "bulb_development",
    expectedHarvestDate: new Date(Date.now() + 40 * 86400000).toISOString().slice(0, 10),
    estimatedYieldQuintals: 88,
    lastScannedIso: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
    ndviBenchmark: 0.86,
    isSampleData: true,
    issues: [],
    trend30Days: generate30DayTrend(93, 0.86),
  },
  {
    fieldId: "field-plot-3",
    fieldName: "East Orchard Plot — Sector C",
    cropType: "Cabbage (Golden Acre)",
    variety: "Brassica oleracea",
    acreage: 1.8,
    healthScore: 74,
    growthStage: "head_formation",
    expectedHarvestDate: new Date(Date.now() + 18 * 86400000).toISOString().slice(0, 10),
    estimatedYieldQuintals: 62,
    lastScannedIso: new Date(Date.now() - 6 * 3600000).toISOString(), // 6 hours ago
    ndviBenchmark: 0.69,
    isSampleData: true,
    issues: [
      {
        id: "issue-301",
        type: "pest",
        severity: "high",
        title: "Aphid Cluster Signature (Brevicoryne brassicae)",
        description: "Foliar chlorosis and curling detected on central leaf heads.",
        affectedAreaPercent: 22,
        confidencePercent: 82,
        recommendationCategory: "Neem Seed Kernel Extract (NSKE 5%) or yellow sticky traps — Consult local agricultural officer",
        detectedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
      },
      {
        id: "issue-302",
        type: "nutrient",
        severity: "low",
        title: "Nitrogen Variance Pattern",
        description: "Mild general pale-green chlorosis on outer baseline foliage.",
        affectedAreaPercent: 8,
        confidencePercent: 65,
        recommendationCategory: "Soil mineral conductivity verification before split nitrogen top-dressing",
        detectedAt: new Date(Date.now() - 72 * 3600000).toISOString(),
      },
    ],
    trend30Days: generate30DayTrend(74, 0.69),
  },
];

/**
 * Service to fetch crop health plots with validation
 */
export async function getCropHealthPlots(): Promise<CropHealthPlot[]> {
  // Simulate standard async API service call
  await new Promise((resolve) => setTimeout(resolve, 250));

  return SAMPLE_CROP_PLOTS.map((plot) => CropHealthPlotSchema.parse(plot));
}

/**
 * Service to execute an AI scan flow (mocked behind service interface)
 */
export async function runCropHealthScan(request: ScanRequest): Promise<ScanResult> {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const targetPlot = SAMPLE_CROP_PLOTS.find((p) => p.fieldId === request.fieldId) || SAMPLE_CROP_PLOTS[0];

  const result: ScanResult = {
    scanId: `scan-${Date.now().toString(36)}`,
    fieldId: targetPlot.fieldId,
    timestamp: new Date().toISOString(),
    healthScore: targetPlot.healthScore,
    ndvi: targetPlot.ndviBenchmark,
    issuesDetected: targetPlot.issues,
    confidenceScore: 84,
    disclaimer:
      "This analysis is an educational and diagnostic decision-support estimate. Field inspection and lab culture are mandatory before applying chemical remedies.",
  };

  return ScanResultSchema.parse(result);
}
