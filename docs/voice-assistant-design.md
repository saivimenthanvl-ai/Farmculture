# Voice Assistant Design & Interface Specification

## Design References
- **Radix UI Primitives**: Accessible dialogs, focus rings, keyboard navigation, and aria-live announcements.
- **shadcn/ui**: Structured card layouts, neutral surfaces, compact toolbars, and responsive flex grids.
- **21st.dev**: Contemporary audio interaction patterns, waveform indicators, and speech streaming states.

## Color Tokens & Brand System
- **Primary Brand**: Forest Deep (`#0F2E24`), Deep Green (`#1C4A3A`)
- **Primary Action**: Bright Lime (`#9BE564`, hover `#8BD454`)
- **Active Recording Pulse**: Clay Red (`#C8553D`) with `ring-[#C8553D]/20`
- **Surfaces & Backgrounds**: Warm Sand Neutral (`#FAF9F5`), Workspace Card White (`#FFFFFF`), Border Neutral (`#E7E3D8`), Subtle Fill (`#F4F1EA`)
- **Typography**: Display Header (`Bricolage Grotesque`), Body & Mono (`Plus Jakarta Sans`)

## Interaction Layout & Hierarchy
1. **Header**: Title, bilingual status badge, and language selector dropdown.
2. **Left Panel**:
   - Large prominent circular microphone button with live recording pulse.
   - Status indicators (`LISTENING`, `PROCESSING`, `READY`).
   - Recommended Agricultural Quick Actions with distinct agronomic icons (`CloudSun`, `TrendingUp`, `Leaf`, `Droplets`, `QrCode`).
3. **Right Panel**:
   - Live conversation stream with distinct styling for farmer and assistant bubbles.
   - Live speech interim recognition display.
   - Read Aloud (`Volume2`) trigger for speech synthesis playback.
   - Text input fallback bar with immediate keyboard submit.
