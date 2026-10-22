# CHANGELOG — Farmculture AI Enterprise Transformation

All notable changes to the Farmculture presentation layer, design system, internationalization, and agronomic telemetry modules are documented in this file.

## [2.2.0] — 2026-10-22

### Phase 1 — Internationalization (i18n) & Regional Currency Defaults
- **Marathi (`mr-IN`) Locale Support**: Added comprehensive Marathi translation dictionary covering agronomy tools, legal policies, commodities, units, and notifications with full parity across all 9 regional languages.
- **Dev-only Translation Warnings**: Eliminated all raw string fallback leaks in the UI (`trace.prototypeBadge`, `legal.privacyBadge`, `predictor.simulationBadge`, etc.). In development mode, missing keys log `console.warn('[i18n] ⚠ key missing...')` while rendering clean fallback copy in production.
- **Indian National Defaults**: Configured default locale to `en-IN` (Indian English), national currency INR (`₹`), Indian numbering grouping (e.g. `12,34,567`), and standard calendar format (`DD/MM/YYYY`). International displays (GBP/EUR/USD) are rendered as indicative conversions based on daily benchmark exchange rates.
- **CI Build Enforcement**: Configured `npm run i18n:check` validating all translation keys against supported language dictionaries in CI pipeline.

### Phase 2 — Modern Agronomy Lab Design System
- **Color Token System**: Replaced arbitrary gradient palettes with high-contrast, WCAG AA compliant CSS variables:
  - Deep forest primary: `#0F2E24`, mid-tone `#1C4A3A`
  - Fresh lime-leaf accent: `#9BE564`, soft tint `#E8F9DC`
  - Saffron harvest: `#E9A23B`, terracotta alert: `#C8553D`
  - Warm paper surfaces: `#F6F4EE`, pure card surfaces `#FFFFFF`
  - Neutral stone scale: `#FAF9F5` through `#1B1F1C`
  - Eliminated blue, violet, indigo, and purple across focus rings, gradients, and badges.
- **Typography**: Replaced default fonts with **Bricolage Grotesque** (display headlines), **Plus Jakarta Sans** (body & UI), **Geist Mono** (tabular numbers), and **Noto Sans Devanagari** (for Hindi and Marathi scripts).
- **Accessible Primitives**: Built core reusable components in `src/components/ui/`:
  - `Button`: Primary, secondary, ghost, danger, accent variants with loading spinners.
  - `Badge`: Semantic status indicators with live animated telemetry dots.
  - `StatTile`: Metric display with units, tabular numerals, delta trends, and contextual subtitles.
  - `Callout`: High-contrast informational and warning advisories with hairline borders.
  - `CommandPalette`: Keyboard-accessible module navigation via `Ctrl+K` / `Cmd+K`.

### Phase 3 — App Shell & Persistent Navigation
- **Collapsible Desktop Sidebar (`AppSidebar`)**: 64px collapsed / 256px expanded navigation with active module tracking, telemetry status pill, and brand badge.
- **Mobile Bottom Tab Bar (`MobileTabBar`)**: Fixed bottom navigation bar for touchscreens with quick links to Dashboard, Diagnosis, Prices, Predictor, and Weather.
- **Sticky Glassmorphic Header**: 64px header with breadcrumb navigation, backdrop blur, `InternationalSelector`, voice assistant toggle, and authenticated user profile menu.

### Phase 4 — Screen Redesigns & Agronomic Data-Viz
- **Overview Dashboard (`/dashboard`)**: Replaced duplicate feature cards with role-aware KPI StatTiles (today's weather, top mandi price + delta, crops at risk, optimal harvest sell window), 7-day microclimate strip, live mandi watchlist, and recent foliar inspection history.
- **Price Predictor (`/predictor`)**: Implemented 2-column simulation workspace with interactive forecast chart, 80% confidence band, transparent model status chip ("Seasonal heuristic · not yet backtested"), and ranked macroeconomic sensitivity bars.
- **Product Passport Traceability (`/traceability`)**: Transformed mock blockchain badges into a scannable agricultural passport with vertical timeline, cryptographic transaction hash copying (`0x...`), external ledger block explorer links, and printable QR batch dialog.
- **Legal Compliance Pages (`/privacy-policy`, `/disclaimer`)**: Replaced unstructured text walls with 2-column layouts featuring sticky scrollspy tables of contents, plain-language summary callouts, and clean print styles.
- **Crop Disease Diagnosis (`/crop-diagnosis`)**: Drag-and-drop foliar photograph upload zone with diagnostic abstention rules, confidence meter, severity classification, and direct "Call Kisan Helpline / KVK" emergency action.
- **Agro-Weather Telemetry (`/weather`)**: Open-Meteo live meteorological feed featuring foliar spray-window safety indicators (wind < 15 km/h, rain = 0mm), UV index, and 5-day agro-forecast strip.

### Phase 5 — Quality Bar & Offline Resilience
- **Offline PWA Banner (`OfflineBanner`)**: Automatic network drop detection displaying offline cached mode indicator for rural connectivity.
- **Accessibility**: Visible teal focus rings (`#3E8E8A`), WCAG AA compliant contrast ratios, and complete keyboard accessibility.
