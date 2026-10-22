# Farmculture AI — Known Limitations & Next Steps

## 1. Crop Disease Detection Pipeline
- **Current Capability:** Client-side image validation (type, size, zero-byte detection) + foliage chromaticity detection with truthful abstention when non-plant imagery is uploaded. Unverified heuristic assessments are clearly flagged as preliminary.
- **Future Milestone:** Integrate a trained TensorFlow.js or Vertex AI Vision model trained specifically on labeled plant pathology datasets (e.g. PlantVillage) to classify specific disease variants with validated precision and recall metrics.

## 2. Market Prices Integration
- **Current Capability:** Verified benchmark modal prices compiled with APMC Mandi provenance, observation dates, and calculated freshness tags.
- **Future Milestone:** Provision automated webhook or DTS cron fetching daily modal prices directly from the Government of India Open Data Platform (Data.gov.in) API key when API quotas are provisioned.

## 3. Advanced Simulation Components
- `MarketPredictor`, `DroneMonitoring`, `SmartIrrigation`, and `BlockchainTraceability` now feature clear simulation and demonstration badges.
- **Future Milestone:** Connect SmartIrrigation to real IoT MQTT telemetry gateways; connect BlockchainTraceability to Polygon/Ethereum testnet smart contracts when contract addresses are provisioned.

## 4. Multilingual Speech Synthesis & Recognition
- The voice assistant supports bilingual language selection and UI prompts. Genuine Web Speech API audio processing depends on browser microphone permissions and OS speech recognition capabilities.
