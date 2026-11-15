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
    onboarding/           4-phase profile-backed onboarding
    scam-radar/           Scam pattern library
  components/
    layouts/              SiteLayout · AppShell · LearnShell
    ui/                   Button, Card, Input, Chip, ProgressBar
    learn/                Chapter reader, quiz, breadcrumbs
  lib/content/            Typed content-map loaders and chapter renderer
  lib/supabase/           Browser, server and session-refresh clients
  lib/user/               Learner profile and RLS-scoped progress hooks
  public/avatars/         10 avatar SVGs
```

## Layout shells

| Shell | Routes | Navigation |
|-------|--------|------------|
| `SiteLayout` | `/courses`, `/scam-radar`, legal, login | Top Navbar |
| `SiteLayout footer` | `/` only | Navbar + Footer |
| `AppShell` | `/app`, `/app/courses`, `/app/profile` | Header + **Home · Courses · Profile** bottom tabs |
| `LearnShell` | `/courses/.../learn/*` | Compact header + Back \| Progress \| Continue bar |

## Accounts and learner progress

Supabase Auth handles email/password accounts and email confirmation. Learner profiles and completed chapters are stored in `public.profiles` and `public.chapter_progress`, protected by owner-scoped RLS. The app uses the connected Supabase URL and publishable key from environment variables; never place a service-role key in browser code.

Paid upgrades are intentionally disabled. Do not enable PRO access or accept payments until a real provider callback is verified server-side.

## Content updates

1. Edit `Docs/content-map.json` (canonical machine-readable content source)
2. Copy/sync it to `biza-app/lib/content/content-map.json`
3. Extend types in `lib/content/types.ts` when the schema changes
4. Run `npm run validate:content` to verify parity, chapter gating and authored assessments

Regenerate avatar placeholders:

```bash
node scripts/generate-avatars.mjs
```

## Docs (repo root)

| File | Purpose |
|------|---------|
| `Docs/content-map.md` | Human-readable product/content spec |
| `Docs/BUILD-TRACKER.md` | Phase progress (1A–1F, Phase 2) |
| `Docs/Biza-PRD-v6-Final.docx` | Product requirements (behavior, legal) |

## Deploy (Vercel)

- Root directory: `biza-app`
- Branch `develop` → preview deployments
- Configure the connected Supabase integration for the Vercel project environment
- Production email-confirmation delivery and callback URLs must be tested before public signup

## Remaining MVP work

Complete a real-account auth/progress smoke test, author and review the remaining course lessons, then implement a verified payment provider and launch controls. See `Docs/BUILD-TRACKER.md` for current status.
