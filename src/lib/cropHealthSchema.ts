import { z } from "zod";

/**
 * Phenological Growth Stages Schema
 */
export const GrowthStageSchema = z.enum([
  "vegetative",
  "flowering",
  "bulb_development",
  "head_formation",
  "pod_development",
  "maturity",
]);
export type GrowthStage = z.infer<typeof GrowthStageSchema>;

/**
 * Agronomic Issue Severity & Category
 */
export const IssueSeveritySchema = z.enum(["low", "medium", "high"]);
export type IssueSeverity = z.infer<typeof IssueSeveritySchema>;

export const IssueTypeSchema = z.enum(["disease", "pest", "nutrient", "water"]);
export type IssueType = z.infer<typeof IssueTypeSchema>;

/**
 * Agronomic Observation / Flagged Condition Schema
 */
export const CropIssueSchema = z.object({
  id: z.string(),
  type: IssueTypeSchema,
  severity: IssueSeveritySchema,
  title: z.string(),
  description: z.string(),
  affectedAreaPercent: z.number().min(0).max(100),
  confidencePercent: z.number().min(0).max(100),
  recommendationCategory: z.string(), // Generic category only (e.g. "Bio-fungicide — consult KVK")
  detectedAt: z.string(), // ISO Timestamp
});
export type CropIssue = z.infer<typeof CropIssueSchema>;

/**
 * 30-Day Historical Trend Point Schema
 */
export const HealthTrendPointSchema = z.object({
  date: z.string(), // YYYY-MM-DD
  healthScore: z.number().min(0).max(100),
  ndvi: z.number().min(-1).max(1),
  ndwi: z.number().min(-1).max(1),
});
export type HealthTrendPoint = z.infer<typeof HealthTrendPointSchema>;

/**
 * Comprehensive Crop Health Plot Model
 */
export const CropHealthPlotSchema = z.object({
  fieldId: z.string(),
  fieldName: z.string(),
  cropType: z.string(),
  variety: z.string(),
  acreage: z.number().positive(),
  healthScore: z.number().min(0).max(100),
  growthStage: GrowthStageSchema,
  expectedHarvestDate: z.string(), // ISO date (e.g. 2026-11-20)
  estimatedYieldQuintals: z.number(),
  lastScannedIso: z.string(), // ISO string for accurate relative calculation
  ndviBenchmark: z.number().min(0).max(1),
  isSampleData: z.boolean().default(true),
  issues: z.array(CropIssueSchema),
  trend30Days: z.array(HealthTrendPointSchema),
});
export type CropHealthPlot = z.infer<typeof CropHealthPlotSchema>;

/**
 * AI Diagnostic Scan Request Schema
 */
export const ScanRequestSchema = z.object({
  fieldId: z.string(),
  scanType: z.enum(["multispectral_satellite", "field_photo"]),
  imageFile: z.any().optional(),
});
export type ScanRequest = z.infer<typeof ScanRequestSchema>;

/**
 * AI Diagnostic Scan Response Schema
 */
export const ScanResultSchema = z.object({
  scanId: z.string(),
  fieldId: z.string(),
  timestamp: z.string(),
  healthScore: z.number().min(0).max(100),
  ndvi: z.number(),
  issuesDetected: z.array(CropIssueSchema),
  confidenceScore: z.number(),
  disclaimer: z.string(),
});
export type ScanResult = z.infer<typeof ScanResultSchema>;
