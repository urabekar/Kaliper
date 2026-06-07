# Kaliper website

A single-page, static site (HTML/CSS/JS) for Kaliper. No build step, no dependencies — open `index.html` in a browser or host the folder anywhere (Squarespace replacement, Netlify, Vercel, S3, GitHub Pages, etc.).

## Direction (as approved)
- **Look & feel:** bold architectural / industrial, monochrome (black / concrete-white / gray).
- **Positioning:** founder-led; team implied.
- **Claims:** aspirational tone anchored to specific, verified figures.
- **Scope:** broad mission-critical facilities.
- **Naming:** only the founder's own track record and honors are named. Developer partners, pharma/biotech clients, and specific current projects are described generically.

## Files
- `index.html` — all content/sections.
- `styles.css` — design system.
- `script.js` — sticky header, mobile nav, scroll reveal.
- `assets/` — monochrome Kaliper logo (svg + png, black + white).

## Before going live — to do
1. **Photos (done):** the founder portrait (`assets/amrit-headshot.jpg`) and a facility band (`assets/lab-space.jpg`) are pulled from the personal-site image library and already placed in the Leadership section. Swap for higher-res or alternate shots anytime.
2. **Contact form:** the form posts to a Formspree placeholder (`your-form-id`). Create a free Formspree (or similar) endpoint and replace it, or wire it to your own handler.
3. **Contact email:** `hello@kaliperco.com` is a placeholder — set the real address.
4. **More facility imagery (optional):** additional sector or hero photography can be dropped in; more shots are available in the personal-site `image-archive/`.
5. **Stats:** the bar reflects the founder's verified career record (single, non-overlapping scope). A separate, clearly labeled leadership-team stat block can be added if you want to show firm-wide scale.

## Notes
- Fonts (Archivo, Inter) load from Google Fonts; needs internet at view time. Can be self-hosted if you prefer fully offline.
- Fully responsive (desktop / tablet / mobile).
