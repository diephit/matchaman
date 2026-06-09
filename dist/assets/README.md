# Asset placeholders

Replace these files with production assets when ready:

- `asmr-matcha.mp4`: real 9:16 ASMR video, autoplay muted loop playsinline.
- `asmr-placeholder.svg`: lightweight visual fallback used while the video file is missing.
- `gift-lottie-placeholder.json`: optional placeholder for a future lightweight Lottie gift animation.

The app already runs without a real video. `AsmrVideoSection` checks for `/assets/asmr-matcha.mp4`; if it is not available, it shows the SVG/CSS placeholder instead.
