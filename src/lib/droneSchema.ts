import { z } from "zod";

/**
 * Operational Connection State
 */
export const DroneConnectionModeSchema = z.enum([
  "DEMONSTRATION",
  "DISCONNECTED",
  "CONNECTING",
  "CONNECTED",
  "ERROR",
]);
export type DroneConnectionMode = z.infer<typeof DroneConnectionModeSchema>;

/**
 * Operating status of a drone device
 */
export const DroneDeviceStatusSchema = z.enum(["active", "charging", "docked", "maintenance"]);
export type DroneDeviceStatus = z.infer<typeof DroneDeviceStatusSchema>;

/**
 * Severity and finding types
 */
export const FindingSeveritySchema = z.enum(["low", "medium", "high"]);
export type FindingSeverity = z.infer<typeof FindingSeveritySchema>;

export const FindingTypeSchema = z.enum(["pest", "disease", "irrigation", "growth"]);
export type FindingType = z.infer<typeof FindingTypeSchema>;

/**
 * Telemetry Finding Record
 */
export const DroneFindingSchema = z.object({
  id: z.string(),
  type: FindingTypeSchema,
  severity: FindingSeveritySchema,
  location: z.string(),
  description: z.string(),
  image: z.string().optional(),
  detectedAtIso: z.string(),
  affectedAreaPercent: z.number().min(0).max(100).optional(),
});
export type DroneFinding = z.infer<typeof DroneFindingSchema>;

/**
 * Telemetry Drone Device Schema
 */
export const DroneDeviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: DroneDeviceStatusSchema,
  batteryPercent: z.number().min(0).max(100),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  currentTask: z.string(),
  coveragePercent: z.number().min(0).max(100),
  lastUpdateIso: z.string(),
  altitudeMeters: z.number().nonnegative(),
  cameraResolution: z.string(),
  isDemonstrationData: z.boolean().default(true),
  findings: z.array(DroneFindingSchema),
});
export type DroneDevice = z.infer<typeof DroneDeviceSchema>;

/**
 * Service State Summary
 */
export const DroneFleetStateSchema = z.object({
  mode: DroneConnectionModeSchema,
  connectedDevices: z.array(DroneDeviceSchema),
  activeDeviceId: z.string().nullable(),
  errorMessage: z.string().nullable(),
  isLiveFeedAvailable: z.boolean().default(false),
  lastHeartbeatIso: z.string(),
});
export type DroneFleetState = z.infer<typeof DroneFleetStateSchema>;
