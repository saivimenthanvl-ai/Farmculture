# Voice Assistant Capability Audit

## Overview
This document records the baseline capabilities, architectural analysis, and verification of the Farmculture AI Voice Assistant module (`/assistant`).

## Initial State & Limitations (Pre-V12)
1. **No Real Speech Recognition**: The previous implementation had a mock toggle button (`onToggleListening`) in `App.tsx` that mutated a local boolean without instantiating `SpeechRecognition` or `webkitSpeechRecognition`.
2. **No Speech Synthesis**: Responses were not read aloud, and no text-to-speech fallback existed.
3. **No Agronomic Query Engine**: The component had non-functional quick command buttons that called an empty closure `() => null`.
4. **Missing Localization Keys**: Several raw camelCase keys leaked directly into the UI:
   - `bilingual_support`
   - `va_quick`
   - `language`
   - `weather`
   - `market_price`
   - `crop_health`
   - `irrigation`
   - `traceability`

## V12 Implemented Architecture
- **Speech Recognition Engine**: Utilizes native Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) with explicit locale binding derived from `VOICE_LANGUAGE_CAPABILITIES`.
- **Speech Synthesis Engine**: Uses `window.speechSynthesis` with cancellation safeguards and rate/pitch normalization.
- **Agricultural Processing Engine**: `processAgriculturalVoiceQuery` in `src/lib/voiceAssistantService.ts` integrates genuine Open-Meteo weather telemetry and verified APMC mandi prices.
- **Microphone States**: Implements distinct, accessible UI states: `READY`, `LISTENING`, `PROCESSING`, `SPEAKING`, and `ERROR`.
- **Text Fallback**: Fully functional text input bar with keyboard and screen reader accessibility for environments lacking microphone access.
- **Session Privacy**: Clear disclosure that conversation transcripts are stored in-memory during the browser session only and never logged to external servers.
