# Team Pokédex

Pokemon TCG–style team cards for the AI PM Workshop crew. Hover for holographic foil, click for full profile.

## Run locally

```bash
npm install
npm run dev
```

Opens at <http://localhost:5173>.

## Add yourself to the team

1. Copy `src/data/team/_template.json.example` to `src/data/team/<your-slug>.json` (e.g. `alice.json`). The slug matches the filename and becomes your shareable URL: `?member=alice`.
2. Fill in every field. Pick your `type` from the list at the bottom of the template — it controls your card's color scheme.
3. Drop a square avatar PNG at `public/avatars/<your-slug>.png`. If missing, the card shows your initials as a fallback.
4. Save. The dev server hot-reloads.

## Build & deploy

```bash
npm run build   # outputs to dist/
```

Vercel auto-detects Vite. Connect the GitHub repo and push to main — that's it.

## Stack

- React + Vite + TypeScript
- CSS Modules + CSS custom properties for per-type theming
- framer-motion for modal transitions
- `import.meta.glob` loads team JSONs automatically — no manual index
