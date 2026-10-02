# moods 🦋

A little website for Ishu: she picks how she's feeling, and gets a page made for that mood.

- **Edit any words:** `src/data/moods.js` (every mood, note, joke, question) and `src/data/content.js` (WhatsApp number, start date, password hint).
- **Password:** butterflies (stored only as a hash in `src/components/PasswordGate.jsx`).
- **Run locally:** `npm install` then `npm run dev`.
- **Publish:** every push to `main` builds and deploys to GitHub Pages automatically (Settings → Pages → Source: GitHub Actions).
