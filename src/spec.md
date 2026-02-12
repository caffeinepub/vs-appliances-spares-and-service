# Specification

## Summary
**Goal:** Fix the complaint registration flow so the brand selection step shows only brands relevant to the user’s selected appliance icon, using English-only user-facing text.

**Planned changes:**
- Update the appliance icon → brand selection step to filter the displayed brand list by the currently selected appliance (AC, Washing Machine, Refrigerator, Electrical Service).
- Represent brands-per-appliance as a single, maintainable mapping keyed by an appliance identifier, and ensure the brand-selection UI derives its list only from the selected key.
- Add an English empty-state message when an appliance has no configured brands, without falling back to a combined/all-brands list.

**User-visible outcome:** After selecting an appliance icon, the user sees only the brands for that appliance; if none exist, they see a clear English message indicating no brands are available.
