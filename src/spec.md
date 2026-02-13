# Specification

## Summary
**Goal:** Replace the Services section visuals for AC, Washing Machine, Refrigerator, and Electrical with static image assets instead of icon components.

**Planned changes:**
- Update the Services section in `frontend/src/App.tsx` so each of the four service cards renders an `<img>` (not a React icon component).
- Set appropriate English `alt` text for each service image (AC Service, Washing Machine, Refrigerator, Electrical Service).
- Ensure the four required image files are present under `frontend/public/assets/generated` and referenced via `/assets/generated/...` so they load correctly at runtime.

**User-visible outcome:** In the Services section, the AC, Washing Machine, Refrigerator, and Electrical cards show image illustrations (with proper alt text) instead of icons, with no broken images on desktop or mobile.
