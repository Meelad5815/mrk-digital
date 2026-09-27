MRK Digital WordPress Theme
==========================
Version 1.0.0

This folder is a classic WordPress theme converted from the MRK Digital React/Vite design.

Install:
1. Zip the folder named "mrk-digital".
2. WordPress Admin -> Appearance -> Themes -> Add New -> Upload Theme.
3. Upload the ZIP and activate.
4. Set a static homepage if needed: Settings -> Reading.
5. Create WordPress Posts for the Guides & Blog section.
6. Add a Primary Menu under Appearance -> Menus; the theme also provides a fallback menu.

The theme keeps the existing React application in the repository. The WordPress conversion is isolated under wordpress-theme/mrk-digital so the existing Vite deployment is not broken.

Notes:
- Quote form opens WhatsApp with the submitted details.
- No paid plugin is required for the base theme.
- The Gemini server endpoint from the React application is not copied into the theme because API credentials should not be exposed in browser-side theme code.
