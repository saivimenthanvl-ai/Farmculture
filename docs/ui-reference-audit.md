# UI/UX Reference Audit & Benchmark Patterns

## Overview
As mandated by the Farmculture AI Industrial V6 Specification, this document captures interaction conventions, visual design tokens, component architecture, and accessibility considerations studied from leading industry design systems and application platforms prior to implementation.

---

## 1. Reference Sources & Benchmark Analysis

| Reference | Component / Pattern | Reason for Selection | Accessibility Considerations (WCAG 2.2 AA) | Relevance to Farmculture Workflows | Dependencies & Licensing |
|:---|:---|:---|:---|:---|:---|
| **[ui.shadcn.com](https://ui.shadcn.com/)** | Accessible Primitives (`Tabs`, `Dialog`, `Select`, `Table`, `Badge`) | High-contrast token-based styling without monolithic library overhead; standard semantic HTML with ARIA hooks. | Full keyboard navigation (`Tab`, `Space`, `Enter`, `Escape`), focus visible rings, screen reader labels. | Unifies fragmented form fields, modal dialogues (crop photo inspection, farm registration), and responsive tables. | Radix-ui compatible, MIT licensed, zero proprietary lock-in. |
| **[linear.app](https://linear.app/)** | Density & Categorized Sidebar Hierarchy | Clear progressive disclosure: `OVERVIEW`, `MY FARM`, `INTELLIGENCE`, `SERVICES`, `EXPERIMENTAL`, `ACCOUNT`. | 44px min touch targets on mobile, high-contrast active states (`#0F2E24` on `#9BE564`), semantic heading levels. | Directly replaces the flat "demo collection" navigation where experimental features were mixed with core tools. | Proprietary inspiration only; custom Tailwind implementation. |
| **[vercel.com](https://vercel.com/)** | Metric Cards & Telemetry Status Badges | Clean hairline 1px borders (`#E7E3D8`), neutral paper backdrops (`#F6F4EE`), unambiguous badge states. | Text contrast >= 4.5:1 on light/dark modes, color is never the sole carrier of status (includes text & icons). | Provides honest operational states: distinguishing real Agmarknet/Open-Meteo feeds from heuristic prototypes. | Zero dependencies; pure Tailwind tokens. |
| **[21st.dev](https://21st.dev/)** | Micro-interactions & Accessible Tables | Tabular numerals (`tabular-nums`), sticky column headers, clean empty/error states with retry actions. | Screen-reader compliant table headers (`scope="col"`), non-blocking loading skeletons, prefers-reduced-motion support. | Essential for Mandi rate comparison, 7-day spray windows, and crop disease diagnosis logs. | MIT / Public community patterns. |
| **[mobbin.com](https://www.mobbin.com/)** | Mobile Bottom Tab Bar & Drawer Navigation | Touch-first ergonomics for agricultural operators using mobile devices in outdoor field conditions. | Target sizing >= 44x44px, safe-area inset padding for iOS/Android home bars, swipe gesture dismissals. | Enables cultivators to swiftly toggle between Crop Scanner, Mandi Rates, Farm Overview, and Weather Telemetry. | Design pattern analysis; independent clean-room code. |

---

## 2. Instagram Reels Media Audit
- **Status**: **NOT REVIEWED** (Media files / external Instagram URLs are not accessible in this isolated environment).
- **Rule Enforced**: Per project prompt instructions, no synthetic or speculative descriptions of their interfaces are created.

---

## 3. Translation & Design Token Alignment
- **Primary Ink**: `#0F2E24` (Deep Forest) & `#1C4A3A` (Mid Forest).
- **Surface Neutrals**: `#F6F4EE` (Warm Paper), `#FFFFFF` (Card), `#FAF9F5` (Subtle Tile).
- **Accents**: `#9BE564` (Lime-Leaf Highlight), `#E9A23B` (Saffron Harvest), `#C8553D` (Terracotta Alert).
- **Strict Color Rules**: NO blue, violet, purple, or indigo anywhere. All interactive focus rings use `#3E8E8A` (Teal).
