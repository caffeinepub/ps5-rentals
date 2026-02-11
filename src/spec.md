# Specification

## Summary
**Goal:** Update the global Mixpanel tracking snippet to use the provided project token and settings while keeping all other analytics snippets unchanged.

**Planned changes:**
- Replace the existing Mixpanel snippet in `frontend/index.html` with the exact user-provided script content, ensuring it calls `mixpanel.init('da58e366649ab3a9c5b1fc49681f9d76', { autocapture: true, record_sessions_percent: 100, })`.
- Ensure the Mixpanel snippet appears exactly once and remains inside the `<head>` of `frontend/index.html` (right before `</head>`), alongside the existing Google Analytics, Microsoft Clarity, Contentsquare, and Smartlook snippets.

**User-visible outcome:** The app loads with Mixpanel initialized globally using the correct token and settings, without introducing console errors.
