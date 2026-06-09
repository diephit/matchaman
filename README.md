# Matcha Latte Gamification Web App

Mobile-first QR landing app for a matcha cup campaign. It lets visitors open a gift, receive a healing/tarot quote and voucher, save lead info, watch an ASMR section, browse the secret menu, and share the reward.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run lint
npm run build
```

## Deploy to Vercel

This app is ready for Vercel as a static Vite app.

1. Push the project to GitHub.
2. In Vercel, choose **Add New Project** and import the repo.
3. Keep these settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. Deploy, then open the Vercel URL on your phone or put that URL into a QR code.

`vercel.json` already configures SPA fallback to `index.html` and long-term caching for files in `/assets/`.

For phone testing before production, run:

```bash
npm run build
npm run preview
```

Then open the preview URL on a mobile browser. For LAN phone testing, run Vite with a LAN host:

```bash
npm run dev -- --host 0.0.0.0
```

## Assets

Real Lottie/video assets are optional right now. The app runs with lightweight placeholders.

- Replace `/public/assets/asmr-matcha.mp4` with the real 9:16 ASMR video when ready.
- `/public/assets/asmr-placeholder.svg` is the current fallback visual.
- `/public/assets/gift-lottie-placeholder.json` is reserved for a future small Lottie gift animation. The current gift animation uses CSS for performance.

The video component checks for `/assets/asmr-matcha.mp4`; if the file is missing, it displays the placeholder instead.

## Integration TODO

- Replace the mock `saveLead()` in `src/services/leadService.ts` with a real `POST /api/leads`.
- Replace `ZALO_OA_DEEPLINK_PLACEHOLDER` with the production Zalo OA deep link.
- Replace `GOOGLE_LOGIN_PLACEHOLDER` with the production Google login entry point.
