# Farmculture AI — Design System & Design Tokens Guide

## 1. Brand Philosophy: "Modern Agronomy Lab"
The Farmculture interface follows a calm, data-forward, scientific aesthetic designed for clarity in both direct sunlight and low-light field conditions.

### Strict Color Constraints:
- **NO Blue, Violet, Indigo, or Purple**: Banned across focus rings, gradients, charts, and status indicators.
- **Primary Ink**: `#0F2E24` (Deep Forest), `#1C4A3A` (Forest Mid).
- **Accent Highlight**: `#9BE564` (Fresh Lime-Leaf), `#E8F9DC` (Soft Lime Tint).
- **Warm Secondaries**: `#E9A23B` (Saffron Harvest), `#C8553D` (Terracotta Alert).
- **Surfaces**: `#F6F4EE` (Warm Paper Background), `#FFFFFF` (Surface Card), `#FAF9F5` (Subtle Tile).
- **Focus Visible**: `#3E8E8A` (Teal focus ring with 2px offset).

---

## 2. Typography Hierarchy
- **Display Numerals & Hero Headlines**: `Bricolage Grotesque` / `font-display` (bold, expressive, tight tracking).
- **UI & Body Copy**: `Plus Jakarta Sans` / `font-sans` (clear legibility, min 15-16px body, 1.5 line-height).
- **Data & Mandi Rates**: `Geist Mono` / `tabular-nums` (uniform number alignment for tables and charts).
- **Regional Devanagari Scripts**: `Noto Sans Devanagari` (for Hindi and Marathi translations).

---

## 3. Primitives Usage Reference

### `<Button />`
Located in `src/components/ui/Button.tsx`:
```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary" size="md" loading={isSubmitting}>
  Submit Report
</Button>
<Button variant="accent" size="sm">
  Scan Specimen
</Button>
```

### `<Badge />`
Located in `src/components/ui/Badge.tsx`:
```tsx
import { Badge } from "@/components/ui/Badge";

<Badge variant="lime" dot>Live Telemetry</Badge>
<Badge variant="success">Verified APMC</Badge>
<Badge variant="warning">Moderate Risk</Badge>
```

### `<StatTile />`
Located in `src/components/ui/StatTile.tsx`:
```tsx
import { StatTile } from "@/components/ui/StatTile";
import { TrendingUp } from "lucide-react";

<StatTile
  title="Top Mandi Price"
  value="₹2,850"
  unit="/qtl"
  delta="+4.8%"
  deltaType="increase"
  icon={TrendingUp}
  subtitle="Wheat (Sharbati) · Lasalgaon"
/>
```

### `<Callout />`
Located in `src/components/ui/Callout.tsx`:
```tsx
import { Callout } from "@/components/ui/Callout";

<Callout variant="warning" title="Model Limitation">
  Agricultural commodities are subject to sudden localized arrivals.
</Callout>
```

### `<CommandPalette />`
Accessible via `Ctrl+K` or `Cmd+K` anywhere in the application shell. Allows keyboard navigation across agronomic modules.

---

## 4. Internationalization & Formatting Guidelines
- **Default Locale**: `en-IN` (Indian English) with INR (`₹`) currency.
- **Indian Number Grouping**: Use standard `12,34,567` formatting via `Intl.NumberFormat`.
- **Date Format**: `DD/MM/YYYY` via `Intl.DateTimeFormat`.
- **Zero Raw String Keys**: In dev mode, missing keys display console warnings (`[i18n] ⚠ key missing...`) rather than leaking into the user interface.
