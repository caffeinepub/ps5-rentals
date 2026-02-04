# Specification

## Summary
**Goal:** Add the Contentsquare tracking script to the app so it loads on all pages, and provide a simple install verification that reports load success/failure.

**Planned changes:**
- Insert the Contentsquare tracking script tag into `frontend/index.html` within the `<head>` so it applies to all routes/pages.
- Add a lightweight verification check that logs an English success message to the browser console when the script loads and an English warning when it fails/gets blocked, without breaking the app.
- Ensure existing Google Analytics instrumentation in `frontend/index.html` remains unchanged.

**User-visible outcome:** The site includes Contentsquare tracking on all pages, and developers can confirm installation via clear console messages indicating whether the Contentsquare script loaded successfully.
