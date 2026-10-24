import {
  DroneConnectionMode,
  DroneDevice,
  DroneDeviceSchema,
  DroneFleetState,
  DroneFleetStateSchema,
} from "./droneSchema";

/**
 * Isolated Demonstration Telemetry Datasets
 * Validated against existing local assets (e.g., /images/pest-detection.png, /images/irrigation.jpg)
 */
export const DEMONSTRATION_DRONE_FLEET: DroneDevice[] = [
  {
    id: "demo-drone-a55",
    name: "Survey Hexacopter A55",
    status: "active",
    batteryPercent: 78,
    location: { lat: 10.1448, lng: 71.8311 },
    currentTask: "Canopy vigor survey over North Plot",
    coveragePercent: 65,
    lastUpdateIso: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    altitudeMeters: 45,
    cameraResolution: "4K Multispectral (Prerecorded)",
    isDemonstrationData: true,
    findings: [
      {
        id: "finding-001",
        type: "pest",
        severity: "medium",
        location: "North Field — Sector A3",
        description: "Foliar chlorosis and suspected aphid clusters on upper canopy.",
        image: "/images/pest-detection.png",
        detectedAtIso: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        affectedAreaPercent: 14,
      },
      {
        id: "finding-002",
        type: "irrigation",
        severity: "high",
        location: "North Field — Sector B2",
        description: "Thermal moisture deficiency detected in root-zone soil quadrant.",
        image: "/images/irrigation.jpg", // Valid existing asset in /images
        detectedAtIso: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
        affectedAreaPercent: 28,
      },
    ],
  },
  {
    id: "demo-drone-b12",
    name: "Quadcopter Rover B12",
    status: "docked",
    batteryPercent: 42,
    location: { lat: 10.1452, lng: 71.8325 },
    currentTask: "Docked at ground telemetry charging pad",
    coveragePercent: 100,
    lastUpdateIso: new Date(Date.now() - 18 * 60 * 1000).toISOString(), // 18 minutes ago
    altitudeMeters: 0,
    cameraResolution: "HD RGB Optical (Standby)",
    isDemonstrationData: true,
    findings: [
      {
        id: "finding-003",
        type: "growth",
        severity: "low",
        location: "South Terrace — Sector C",
        description: "Uniform vegetative canopy growth observed across brassica plots.",
        image: "/images/pest-detection.png",
        detectedAtIso: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        affectedAreaPercent: 5,
      },
    ],
  },
];

/**
 * Fetch Drone fleet state with bounded connection timeout
 */
export async function fetchDroneFleetState(requestedMode: DroneConnectionMode = "DEMONSTRATION"): Promise<DroneFleetState> {
  // Bounded simulated network fetch (never hangs indefinitely)
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (requestedMode === "DEMONSTRATION") {
    const devices = DEMONSTRATION_DRONE_FLEET.map((d) => DroneDeviceSchema.parse(d));
    return DroneFleetStateSchema.parse({
      mode: "DEMONSTRATION",
      connectedDevices: devices,
      activeDeviceId: devices[0]?.id || null,
      errorMessage: null,
      isLiveFeedAvailable: false, // Prerecorded sample footage in demo mode
      lastHeartbeatIso: new Date().toISOString(),
    });
  }

  // Real device connection check: Since no physical drone API credentials exist, return DISCONNECTED
  return DroneFleetStateSchema.parse({
    mode: "DISCONNECTED",
    connectedDevices: [],
    activeDeviceId: null,
    errorMessage: "No physical drone hardware or telemetry ground station registered to this account.",
    isLiveFeedAvailable: false,
    lastHeartbeatIso: new Date().toISOString(),
  });
}

/**
 * Trigger demonstration playback / telemetry simulation
 */
export async function triggerDemonstrationPlayback(droneId: string): Promise<DroneDevice | null> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const found = DEMONSTRATION_DRONE_FLEET.find((d) => d.id === droneId);
  if (!found) return null;

  return {
    ...found,
    status: "active",
    currentTask: "Demonstration aerial pass in progress",
    lastUpdateIso: new Date().toISOString(),
  };
}
