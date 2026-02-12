# Specification

## Summary
**Goal:** Replace the current VS logo and favicon with new transparent PNG assets that match the newly uploaded logo image (IMG_20260212_214859~4.png) exactly.

**Planned changes:**
- Create new transparent PNG logo assets (horizontal header sizes, square logo, and favicon sizes) derived from IMG_20260212_214859~4.png and save them under `frontend/public/assets/generated` using the `.dim_WxH.png` naming convention.
- Update `frontend/src/App.tsx` to use the newly generated horizontal logo asset in the site header, preserving responsive sizing/aspect ratio and keeping the existing English alt text.
- Update `frontend/index.html` to reference the newly generated favicon asset(s) instead of the currently referenced uploaded favicon.

**User-visible outcome:** The site header logo and browser tab favicon display the newly uploaded VS logo across mobile and desktop.
