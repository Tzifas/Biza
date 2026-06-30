# Biza App

Mobile-first learning platform for legitimate online income — **Learn it. Earn it.**

Target domain: [getbiza.co.ke](https://getbiza.co.ke)

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with Stitch brand tokens (`app/globals.css`)
- Content from `lib/content/content-map.json` (mirrors `Docs/content-map.json`)

## Quick start

```bash
cd biza-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## Project layout

```
biza-app/
  app/
    page.tsx              Landing (Footer here only)
    courses/              Public browse + opportunity cards + learn flow
    app/                  Authenticated shell (3-tab bottom nav)
    onboarding/           4-phase mock onboarding
    scam-radar/           Scam pattern library
  components/
    layouts/              SiteLayout · AppShell · LearnShell
    ui/                   Button, Card, Input, Chip, ProgressBar
    learn/                Chapter reader, quiz, breadcrumbs
  lib/content/            Typed content-map loaders
  lib/user/storage.ts     localStorage mock user state (Phase 2 → Supabase)
  public/avatars/         10 avatar SVGs
```

## Layout shells

| Shell | Routes | Navigation |
|-------|--------|------------|
| `SiteLayout` | `/courses`, `/scam-radar`, legal, login | Top Navbar |
| `SiteLayout footer` | `/` only | Navbar + Footer |
| `AppShell` | `/app`, `/app/courses`, `/app/profile` | Header + **Home · Courses · Profile** bottom tabs |
| `LearnShell` | `/courses/.../learn/*` | Compact header + Back \| Progress \| Continue bar |

## Mock user state (Phase 1)

Onboarding and profile data persist in `localStorage` under key `biza_user`:

- Persona, avatar, name, PRO tier
- Completed chapters (for dashboard progress)

Reset in browser DevTools: `localStorage.removeItem('biza_user')`

## Content updates

1. Edit `Docs/content-map.json` (source of truth for product)
2. Copy/sync to `biza-app/lib/content/content-map.json`
3. Types in `lib/content/types.ts` — extend if schema changes

Regenerate avatar placeholders:

```bash
node scripts/generate-avatars.mjs
```

## Docs (repo root)

| File | Purpose |
|------|---------|
| `Docs/content-map.md` | Human-readable product/content spec |
| `Docs/BUILD-TRACKER.md` | Phase progress (1A–1E, Phase 2) |
| `Docs/Biza-PRD-v6-Final.docx` | Product requirements (behavior, legal) |

## Deploy (Vercel)

- Root directory: `biza-app`
- Branch `develop` → preview deployments
- No env vars required for Phase 1 UI mock

## Phase 2 (deferred)

Supabase auth, server progress, M-Pesa Daraja STK Push, admin panel — see `Docs/BUILD-TRACKER.md`.
