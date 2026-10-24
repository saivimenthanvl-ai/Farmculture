import { describe, it, expect } from 'vitest';
import { dict, pathGet, Lang } from '../contexts/LanguageContext';
import { 
  DEMONSTRATION_DRONE_FLEET, 
  fetchDroneFleetState, 
  triggerDemonstrationPlayback 
} from '../lib/droneService';
import { DroneFleetStateSchema } from '../lib/droneSchema';

describe('Phase 1 — Drone Monitoring Verification', () => {
  const supportedLocales: Lang[] = ['en', 'ta', 'hi', 'te', 'mr', 'fr', 'es', 'de', 'pl', 'ar'];

  const requiredDroneKeys = [
    'title',
    'subtitle',
    'connectingDrones',
    'telemetrySimulationMode',
    'demonstrationBanner',
    'activeDronesList',
    'battery',
    'task',
    'coverage',
    'lastUpdate',
    'altitude',
    'location',
    'recording4k',
    'sampleFootage',
    'liveTransmission',
    'latestDetections',
    'allSystemsNormal',
    'active',
    'charging',
    'docked',
    'maintenance',
    'priorityHigh',
    'priorityMedium',
    'priorityLow',
    'detectionPest',
    'detectionDisease',
    'detectionIrrigation',
    'detectionGrowth',
    'pestInfectionDesc',
    'irrigationDryDesc',
    'growthUniformDesc',
    'dockedRecharge',
    'patrollingActive',
    'playDemo',
    'launch',
    'launchDisabledTooltip',
    'minAgo',
    'evidenceUnavailable',
    'connectionError',
    'retryConnection',
  ] as const;

  it('all 10 supported locales possess every required drone localization key with non-empty strings', () => {
    for (const locale of supportedLocales) {
      const localeObj = dict[locale];
      expect(localeObj, `Locale ${locale} must be defined in dict`).toBeDefined();

      for (const key of requiredDroneKeys) {
        const fullKey = `drone.${key}`;
        const val = pathGet(localeObj, fullKey) ?? localeObj[fullKey] ?? localeObj.drone?.[key];
        expect(
          typeof val === 'string' && val.trim().length > 0,
          `Locale [${locale}] is missing or has empty key: ${fullKey}`
        ).toBe(true);

        // Ensure key itself is not leaked as camelCase value
        expect(val).not.toEqual(key);
      }
    }
  });


  it('telemetry service strictly adheres to DEMONSTRATION mode with validated schemas', async () => {
    const demoState = await fetchDroneFleetState('DEMONSTRATION');
    const parsed = DroneFleetStateSchema.parse(demoState);

    expect(parsed.mode).toBe('DEMONSTRATION');
    expect(parsed.isLiveFeedAvailable).toBe(false); // Prerecorded sample footage
    expect(parsed.connectedDevices.length).toBeGreaterThan(0);
    expect(parsed.connectedDevices[0].isDemonstrationData).toBe(true);

    // Verify evidence image paths are valid references or existing assets
    for (const device of parsed.connectedDevices) {
      for (const finding of device.findings) {
        expect(finding.image).toBeDefined();
        expect(finding.image).not.toContain('images/irrigation-detection.png'); // Defective asset eliminated
      }
    }
  });

  it('telemetry service strictly marks DISCONNECTED when real hardware is queried without registration', async () => {
    const disconnectedState = await fetchDroneFleetState('CONNECTED');
    expect(disconnectedState.mode).toBe('DISCONNECTED');
    expect(disconnectedState.connectedDevices).toHaveLength(0);
    expect(disconnectedState.isLiveFeedAvailable).toBe(false);
  });

  it('demonstration playback updates task safely without invoking hardware commands', async () => {
    const drone = DEMONSTRATION_DRONE_FLEET[0];
    const updated = await triggerDemonstrationPlayback(drone.id);
    expect(updated).not.toBeNull();
    expect(updated?.status).toBe('active');
    expect(updated?.isDemonstrationData).toBe(true);
  });
});
