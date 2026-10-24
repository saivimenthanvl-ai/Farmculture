# Farmculture AI Global Branding & Favicon Specification

## Brand Icon Standard
The global brand emblem across all application surfaces, desktop browser tabs, mobile devices, and PWA manifests is standardized to the signature **Green Rounded Square with Letter F**:
- **Background**: Bright Agricultural Lime (`#9BE564`)
- **Corner Radius**: 11px on a 48x48 grid (rounded square silhouette)
- **Letter Mark**: Uppercase `F` in Forest Deep (`#0F2E24`), font-weight 900, centered at `(24, 33.5)`

## Generated Assets
All assets are deployed in the `public/` directory:
- `farmculture.svg`: Scalable vector emblem for modern browsers supporting SVG favicons.
- `favicon.ico`: 32x32 multi-browser compatible embedded container.
- `favicon-16x16.png`: Crisp 16x16 raster favicon.
- `favicon-32x32.png`: Standard 32x32 raster favicon.
- `favicon-48x48.png`: 48x48 high-DPI desktop favicon.
- `apple-touch-icon.png`: 180x180 iOS and iPadOS home-screen touch icon.
- `android-chrome-192x192.png`: 192x192 Android manifest icon.
- `android-chrome-512x512.png`: 512x512 high-resolution splash icon.
- `site.webmanifest`: Progressive Web App manifest configuring theme color (`#0F2E24`).

## Global Integration
Linked globally inside `index.html` head and reused across:
- Homepage (`/`)
- Login / Authentication (`/auth/login`)
- Main Farmer Dashboard (`/dashboard`)
- Profile & Account Settings (`/profile`)
- Voice Assistant (`/assistant`)
- Crop Health & Drones (`/crop-health`, `/drones`)
- Mandi Rates & Weather (`/market-prices`, `/weather`)
- Informational & Legal pages (`/about`, `/services`, `/privacy-policy`, `/disclaimer`, `/contact`)
