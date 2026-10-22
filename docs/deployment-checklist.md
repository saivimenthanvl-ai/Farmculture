# Farmculture AI — Production Deployment Checklist

## 1. Pre-Deployment Checks
- [x] Run `npm test` — all 19 automated tests pass.
- [x] Run `npm run build` — `tsc -b` and `vite build` complete cleanly without errors.
- [x] Git security hygiene — `.env` untracked from git index; `.env.example` committed.
- [x] Firebase consolidation — duplicate dummy config removed; all components use authoritative `@/lib/firebase`.
- [x] Firestore Security Rules — [firestore.rules](file:///c:/Users/saivi/Downloads/Farmculture/firestore.rules) defined with UID enforcement.
- [x] Vercel SPA Routing — [vercel.json](file:///c:/Users/saivi/Downloads/Farmculture/vercel.json) rewrite rule configured.

## 2. Firebase Rules Deployment Instructions
When deploying the Firebase backend, deploy the security rules:
```bash
firebase deploy --only firestore:rules
```

## 3. Vercel Environment Variables
Ensure the following variables are configured in the Vercel Project Settings:
- `VITE_FB_API_KEY`
- `VITE_FB_AUTH_DOMAIN`
- `VITE_FB_PROJECT_ID`
- `VITE_FB_STORAGE_BUCKET`
- `VITE_FB_MESSAGING_SENDER_ID`
- `VITE_FB_APP_ID`

## 4. Post-Deployment Smoke Test
1. **Public Navigation:** Open `/crop-diagnosis`, `/market-prices`, `/weather`, `/schemes`.
2. **Deep Linking & Refresh:** Refresh on `/crop-diagnosis` — verify page reloads directly without 404 or redirecting to home.
3. **Browser Navigation:** Click browser Back/Forward buttons and confirm state persistence.
4. **Crop Diagnosis:** Upload non-plant image — verify diagnosis abstention state triggers.
5. **Weather Insights:** Confirm live Open-Meteo weather and alerts populate.
6. **Market Prices:** Verify APMC Mandi modal prices and freshness badges render.
7. **Authentication:** Sign in via `/auth/login` and verify redirection to `/dashboard`.
8. **Protected Routes:** Log out and verify direct access to `/dashboard` redirects to `/auth/login`.
