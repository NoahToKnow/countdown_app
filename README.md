# countdown_app

A 100% client-side React + TypeScript + Vite countdown widget app. No backend, no database, no API calls. Countdowns are stored in `localStorage` under the key `countdown-events`.

Intended for personal countdown widgets, screenshots, screen recordings, and local browser-source usage.

## Stack

- React 18 + TypeScript
- Vite
- React Router (HashRouter, so it works on GitHub Pages)
- `localStorage` for persistence

## Routes

- `/` — dashboard (create / edit / delete / view countdowns)
- `/widget/:id` — standalone widget view for iframes / OBS browser sources / screenshots
- `*` — 404

Because `HashRouter` is used, live URLs look like:
`https://<user>.github.io/<repo>/#/widget/<eventId>`

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview  # local preview of the production build
```

## Deploy to GitHub Pages

1. Push the repo to GitHub.
2. Update the base path in `vite.config.ts` if your repo name isn't `countdown_app`:
   ```ts
   base: "/YOUR_REPO_NAME/",
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```
   This runs `predeploy` (build) then publishes `dist/` to the `gh-pages` branch via the `gh-pages` package.
4. In the repo settings on GitHub, enable Pages → branch `gh-pages` / root `/`.

## v1 caveats

- Data lives in the user's browser only. Widgets embedded in another browser, another profile, or another origin will show "Countdown not found".
- No auth, no cloud sync, no sharing across users — by design for v1.

## Project layout

```
src/
  main.tsx
  App.tsx
  index.css
  types.ts
  utils/storage.ts
  pages/
    Dashboard.tsx
    Widget.tsx
    NotFound.tsx
  components/
    CountdownTimer.tsx
    CountdownForm.tsx
    CountdownCard.tsx
    EmbedCode.tsx
```
