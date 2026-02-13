# Specification

## Summary
**Goal:** Replace specific `lucide-react` icons with static image assets while preserving sizing, alignment, and accessibility.

**Planned changes:**
- Update `frontend/src/App.tsx` to remove `lucide-react` imports for `Phone`, `Mail`, and `MapPin`, and render equivalent `<img>` icons from `/assets/generated/` in the header/mobile header and Contact section.
- Update `frontend/src/components/BookServiceDialog.tsx` to remove `lucide-react` imports for `Loader2` and `CheckCircle2`, and render equivalent `<img>` icons from `/assets/generated/` for the submitting and success states.
- Add the required icon image files to `frontend/public/assets/generated/` with the exact required filenames so the app can load them via `/assets/generated/...`.
- Ensure all replacement images keep the same apparent icon sizes (matching existing Tailwind sizing usage) and include non-empty English `alt` text.

**User-visible outcome:** The site displays image-based icons (phone/email/location, loading spinner, and success check) that look and align like the previous icons, with accessible alt text.
