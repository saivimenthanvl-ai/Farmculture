# Product Status & Truthful Data Transparency Matrix

## Overview
In accordance with Farmculture AI Industrial V6 requirements, every badge and telemetry indicator must be backed by verified backend data or clearly labeled as simulation/prototype. Prerecorded or synthetic data must never claim to be "LIVE" or "VERIFIED".

---

## 1. Status Definitions & Conditions

| Badge / Status Label | Backend Preconditions Required | Applied Modules | Audit Outcome & Enforcement Rule |
|:---|:---|:---|:---|
| **`LIVE APMC` / `LIVE FEED`** | Active network connection to Open-Meteo or Agmarknet returning current day observation timestamp. | Weather Telemetry (`/weather`), Mandi Prices (`/market-prices`) | Only render when observation timestamp is within 24 hours. If offline or reading cached records, display `CACHED` or `RECORDED`. |
| **`BENCHMARK VERIFIED`** | Price or record is verified against official state agricultural boards (DMI Agmarknet, FranceAgriMer, BLE Germany, MAPA Spain). | Market Prices (`/market-prices`) | Show official source attribution (e.g. `Agmarknet / DMI`, `FranceAgriMer Rungis`) with observation date. |
| **`SIMULATED FORECAST`** | Empirical or econometric model without full historical backtesting. | Market Predictor (`/predictor`) | Must show honest model disclosure chip: `Model: Seasonal heuristic · not yet backtested`. Never claim guaranteed future rates. |
| **`PROTOTYPE / DEMO`** | Static sample data or experimental smart contract preview. | Traceability Passport (`/traceability`), Smart Irrigation (`/irrigation`), Drones (`/drones`), Crop Health (`/crop-health`) | Label clearly under `EXPERIMENTAL` category in sidebar. Display subtle dismissible disclaimer banner explaining that the data is an illustrative batch passport. |
| **`DIAGNOSTIC ABSTENTION`** | Uploaded image does not meet botanical foliage quality criteria. | Crop Disease Diagnosis (`/crop-diagnosis`) | Vision engine abstains with detailed explanation rather than fabricating false diagnoses. |

---

## 2. Market Data Provenance Requirements
Every commodity record displayed in `/market-prices` or `/dashboard` must expose:
1. **Provider**: (e.g., `Directorate of Marketing & Inspection (DMI)`)
2. **Market Location & State**: (e.g., `Azadpur Mandi, Delhi, IN`)
3. **Observation Date**: ISO format (`YYYY-MM-DD`)
4. **Currency & Unit**: Explicitly formatted (e.g. `₹34.50 / kg`)
5. **Freshness Flag**: `live` (today), `recent` (< 48 hrs), or `historical`

---

## 3. Weather Telemetry Requirements
1. Query location coordinates strictly tied to user's selected farm or regional agro-zone.
2. Display observation time in local farmer format (e.g., `10:42 AM IST`).
3. Spray-window recommendation must expose the exact threshold: `Wind < 15 km/h` and `Precipitation = 0 mm`.
