# rosariovirtual

Vite + React + TypeScript prayer experience.

## Development

```bash
npm install
npm run dev
```

## App structure

- `src/components`
  - `AppShell`: centers the content and applies vertical rhythm
  - `PrayerCard`: the main “card” surface; clicking/tapping advances
  - `ProgressDots`: subtle progress indicator for mini-sequences
  - `Splash`: initial screen (“Hoy meditamos…”, placeholder image, “Iniciar”)
- `src/data`
  - `mystery.ts`: day-based mystery mapping
  - `intencionesDelPapa.ts`: sequence config (generated from data)
  - `prayerSteps.ts`: array of steps for the prayer flow
- `src/styles/globals.css`: Tailwind import and global theme variables

## How to add new prayer steps

Edit `src/data/prayerSteps.ts`.

- For a plain text step, add a new object with `kind: 'text'` and `paragraphs: string[]`.
- For a mini-sequence step, add a new object with `kind: 'sequence'` and a `sequence` config.

The app advances with a single `advance()` function and shows only one step at a time.

## Mystery mapping (day-based)

Edit `src/data/mystery.ts`.

`getMysteryOfDay()` currently returns **Misterios Gozosos** for every day, but the mapping is already implemented via `mysteryByDay` and can be updated later.

## Deploy to GitHub Pages

### 1) Set the Vite base path

For a project page deployment (recommended), set in `vite.config.ts`:

- `base: '/<repo-name>/'`

This project is configured for `'/rosariovirtual/'` in production.

If you deploy to a custom domain (GitHub Pages with `CNAME`) you typically want:

- `base: '/'`

### 2) Publish

This repo includes deploy scripts:

```bash
npm run deploy
```

That will build into `dist/` and publish it to the `gh-pages` branch.

### 3) GitHub Pages settings

In GitHub:

- **Settings** -> **Pages**
- **Build and deployment** -> **Source**: select `Deploy from a branch`
- Choose branch `gh-pages` and folder `/ (root)`

