# Biza — Build Progress Tracker

**Version:** 2.4  
**Last updated:** 2026-06-29  
**Branch strategy:** `develop` → Vercel preview  
**Content source:** [`content-map.md`](./content-map.md) · [`content-map.json`](./content-map.json)  
**Design source:** Stitch / brand concept + [`empowered_learning/DESIGN.md`](./stitch_biza%20[DESIGN%20REF]/empowered_learning/DESIGN.md)  
**Product source:** PRD v6 (behavior, legal, gating — not color/type drift)

**Legend:** `[ ]` Not started · `[/]` In progress · `[x]` Done · `[-]` Deferred (Phase 2+)

---

## Live progress summary

| Phase | Status | Progress | Notes |
|-------|--------|----------|-------|
| **1A** Design system + TS | **Done** | 10/10 | |
| **1B** Wider cleanup | **Done** | 8/8 | All legacy `.js` pages migrated |
| **1C** Content map wiring | **Done** | 6/6 | Pulled forward with 1B |
| **1D** Core learning UI | **Done** | 18/18 | |
| **1E** Polish & review | **In progress** | 4/6 | README, mobile polish, favicon; Vercel pending |
| **2** Backend & auth | Deferred | — | |

**Overall UI refactor:** ~90% complete (Phase 1E finishing)

### Document roles (your three docs + this tracker)

| File | Role |
|------|------|
| [`content-map.md`](./content-map.md) | **What to build** — categories, courses, chapters, copy rules |
| [`content-map.json`](./content-map.json) | **Machine-readable** same data for code + future DB seed |
| **`BUILD-TRACKER.md` (this file)** | **Task progress** — phases, checkboxes, exit criteria, update after each session |

> Update this tracker at the end of every work session: change `[ ]` → `[/]` → `[x]` and bump **Last updated**.

---

## Decisions locked (2026-06-29)

| Decision | Choice |
|----------|--------|
| Design | Stitch palette + DM Sans / Inter |
| MVP category | Selling online |
| MVP opportunities | Dropshipping + Print on demand |
| Categories (6) | See content map |
| DB / Auth | Phase 2 — UI first |
| Onboarding | Full 4-phase UI with localStorage mock |
| Language | TypeScript (migrate during Phase 1A) |
| Scam URL | `/scam-radar` |
| Phase 1 scope | Wider (tokens + all pages + routes + legal) |
| Analytics | Google Analytics (PostHog optional later) |
| Admin | Full platform admin (Phase 2+) |
| Payments UI | M-Pesa mock first; Stripe/Flutterwave Phase 2+ |

---

## Phase 1A — Design system & TypeScript foundation

| Task | Status | Notes |
|------|--------|-------|
| Add TypeScript (`tsconfig`, rename pipeline) | `[x]` | `tsconfig.json`; core shell migrated; `allowJs` for remaining pages |
| `globals.css` Stitch tokens (Forest, Gold, Cream, Leaf, Ink) | `[x]` | PRD v6 palette replaced |
| DM Sans headlines + Inter body globally | `[x]` | `layout.tsx` + `h1–h6` rule |
| Tailwind `@theme` semantic aliases | `[x]` | `forest`, `gold`, `cream`, `leaf`, `ink`, `border`, etc. |
| `components/ui/Button.tsx` (primary/secondary/outline) | `[x]` | 25px pill, 44px min height |
| `components/ui/Card.tsx` | `[x]` | White, 12px radius, 0.5px border, no shadow |
| `components/ui/Input.tsx`, `Chip.tsx`, `ProgressBar.tsx` | `[x]` | `components/ui/index.ts` barrel export |
| Logo usage doc implemented in code | `[x]` | `components/Logo.tsx` + favicon in metadata |
| Remove drop shadows project-wide | `[x]` | Homepage + shell; remaining pages in 1B |
| Remove `.babelrc` if no longer needed | `[x]` | Deleted; build passes without it |

**Exit criteria:** Dev server runs; homepage + nav/footer use shared components and correct tokens. **Met.**

**New files:** `lib/utils/cn.ts`, `lib/design/tokens.ts`, `lib/content/categories.ts`, `components/Logo.tsx`

---

## Phase 1B — Wider cleanup (existing routes)

| Task | Status | Notes |
|------|--------|-------|
| Fix broken Tailwind classes on all pages | `[x]` | All pages use Stitch tokens + UI kit |
| Rename `/scam-warnings` → `/scam-radar` + redirect | `[x]` | `next.config.mjs` permanent redirect |
| Update pricing copy (999/mo, 7999/yr) | `[x]` | `/app`, `/app/upgrade`, STK demo |
| Legal pages — full PRD §19 copy | `[x]` | terms, privacy, refunds |
| Footer email/domain copy (`getbiza.co.ke`) | `[x]` | Done in Phase 1A Footer |
| Deprecate `lib/data.js` (7-step model) | `[x]` | Deleted; legacy URLs in `next.config` |
| Add `lib/content/` typed loader from JSON | `[x]` | `content-map.json` + types + getters |
| Production build passes | `[x]` | 13 routes, TypeScript clean |

**Exit criteria:** All current routes render with consistent design; no v4 7-step roadmap as primary UX. **Met.**

**Also shipped:** `/app` dashboard, `/app/upgrade`, `/onboarding` placeholder, category + opportunity pages, `/learn` placeholder

---

## Phase 1C — Content map integration

| Task | Status | Notes |
|------|--------|-------|
| Publish `content-map.md` + `content-map.json` | `[x]` | Docs + `lib/content/content-map.json` |
| Wire categories to `/courses` browse | `[x]` | Sidebar + MVP opportunity cards |
| Category page `/courses/[categorySlug]` | `[x]` | Live + coming soon refs |
| Opportunity info card `/courses/.../[opportunitySlug]` | `[x]` | Full 9-field card for MVP opps |
| Stub non-MVP opportunities as “Coming soon” | `[x]` | On category + courses browse |
| Scam alert on each opportunity card | `[x]` | Coral alert box on info card |

**Exit criteria:** User can browse 6 categories and open full info cards for Dropshipping + POD. **Met.**

**Next:** Phase 1D — chapter reader, onboarding flow, avatars

---

## Phase 1D — Core learning UI (mock state)

| Task | Status | Stitch ref |
|------|--------|------------|
| Course lesson list `/learn` | `[x]` | `course_roadmap_updated` |
| Chapter reader (hook → body → visual → quiz → takeaway) | `[x]` | `lesson_reader_biza` |
| Quiz feedback (correct / wrong + explanation) | `[x]` | `quiz_feedback_biza` |
| Chapter completion screen (persona-aware copy) | `[x]` | PRD §5.3 |
| Free vs PRO gating UI (first 2 chapters free) | `[x]` | Lock + full-screen upgrade |
| Fixed bottom nav (Back \| Progress \| Continue) | `[x]` | Mobile — learn flow only |
| Breadcrumb (Category > Course > Lesson > Chapter) | `[x]` | `LearnBreadcrumb` in chapter reader |
| Onboarding Phase 1–4 UI | `[x]` | `onboarding_*` screens |
| Onboarding localStorage persistence | `[x]` | Key: `biza_user` |
| Persona quiz → mock home recommendations | `[x]` | |
| App home `/app` (Hi name, Continue, Progress) | `[x]` | `my_dashboard_biza` |
| Profile `/app/profile` + avatar picker | `[x]` | `my_profile_biza` |
| 10 avatar SVGs in `public/avatars/` | `[x]` | `scripts/generate-avatars.mjs` |
| Upgrade screen `/app/upgrade` | `[x]` | `payment_biza` |
| Payment confirmed UI | `[x]` | `payment_confirmed_biza` |
| Scam Radar page (8 patterns from JSON) | `[x]` | Expand current 3-card page |
| 3-tab bottom nav (Home · Courses · Profile) | `[x]` | `AppShell` — no Footer |
| Footer **landing only** (`/`); app uses bottom nav | `[x]` | User feedback 2026-06-29 |
| `/app/courses` browse inside app shell | `[x]` | Shared `CoursesCatalogContent` |

**Exit criteria:** Full happy path without backend: onboarding → browse → opportunity card → free chapters → hit PRO lock → upgrade UI → dashboard shows mock progress. **Met.**

**Layout shells:**
- `SiteLayout` — Navbar; Footer only when `footer` prop (homepage `/`)
- `AppShell` — compact header + 3-tab bottom nav (`/app/*`); no Footer
- `LearnShell` — in-course header; Back \| Progress \| Continue bar; no Footer, no tab nav

---

## Phase 1E — Polish & review

| Task | Status | Notes |
|------|--------|-------|
| Mobile QA (375px – 428px) | `[x]` | Safe-area insets, horizontal category chips |
| Desktop QA (1024px+) | `[x]` | Sidebar catalog on lg+ |
| Vercel preview on `develop` | `[ ]` | Push branch to trigger preview |
| Favicon + PWA icon exports from B-B[1] | `[x]` | metadata icons + themeColor |
| README update for dev setup | `[x]` | `biza-app/README.md` |
| Archive / note stale `biza_prd_mvp_plan.md` | `[x]` | Superseded banner added |

**Exit criteria:** Stakeholder can demo full UI on phone and desktop from Vercel.

---

## Phase 2 — Backend, auth & real data

| Task | Status | Notes |
|------|--------|-------|
| Supabase project + env vars | `[-]` | User deferred |
| DB schema (5-tier + users + progress + payments) | `[-]` | Seed from `content-map.json` |
| Row-Level Security | `[-]` | |
| Supabase Auth (email + OTP) | `[-]` | Replace mock login |
| Replace localStorage onboarding with profile save | `[-]` | |
| Server-side chapter progress | `[-]` | |
| M-Pesa Daraja STK Push (server) | `[-]` | |
| Stripe or Flutterwave (optional) | `[-]` | |
| Email receipts (Resend/Brevo) | `[-]` | |

---

## Phase 2+ — Admin, analytics, launch

| Task | Status | Notes |
|------|--------|-------|
| Full admin panel (content + users + payments + calendar + scam reports) | `[-]` | Not CMS-only |
| Google Analytics | `[-]` | Preferred over PostHog for MVP |
| PostHog (optional) | `[-]` | |
| Sentry | `[-]` | |
| PWA manifest + service worker | `[-]` | |
| SEO schema + sitemap | `[-]` | |
| Domain `getbiza.co.ke` + redirect | `[-]` | |
| Chapter body copy (editorial) | `[-]` | Outlines exist in content map |

---

## Route map (target end of Phase 1D)

```
/                                          Marketing home
/courses                                   All categories
/courses/[categorySlug]                    Category browse
/courses/[categorySlug]/[opportunitySlug]  Opportunity info card
/courses/.../learn                           Lesson list
/courses/.../learn/[lesson]/[chapter]      Chapter reader
/scam-radar                                Scam Radar
/onboarding                                4-phase onboarding
/app                                       Dashboard home
/app/courses                               Courses browse (app shell)
/app/profile                               Profile + avatars
/app/upgrade                               Pricing + M-Pesa mock
/login                                     Auth UI (mock → Phase 2 live)
/terms · /privacy · /refunds               Legal
/admin                                     Phase 2+
```

---

## MVP vertical slice checklist

Use this to validate Phase 1D before starting Phase 2:

- [x] User completes onboarding (mock) and lands on `/app`
- [x] Home shows recommended course based on persona
- [x] User opens **Selling online → Dropshipping** info card (all 9 fields)
- [x] User reads chapters 1–2 of lesson 1 (free)
- [x] Chapter 3 shows PRO lock → upgrade screen
- [x] User completes a quiz with correct/wrong feedback
- [x] Scam alert visible on opportunity card + Scam Radar entry
- [x] Profile avatar can be changed (8 free + 2 locked visible)
- [x] Same flow works for **Print on demand**

---

## Current codebase snapshot

| Item | State |
|------|-------|
| Framework | Next.js 16, React 19, **TypeScript** (all routes) |
| Design system | Stitch tokens + `components/ui/*` |
| Data | `lib/content/content-map.json` + typed getters |
| Routes live | 15 (app shell + learn flow) |
| Build | Passing |

**Next coding session:** Push to Vercel preview, then **Phase 2** when ready.

---

## Change log

| Date | Version | Change |
|------|---------|--------|
| 2026-06-29 | 2.4 | Phase 1D complete; Phase 1E polish (README, mobile, avatars, metadata) |
| 2026-06-29 | 2.3 | Phase 1D: app bottom nav, learn flow, onboarding, footer landing-only |
| 2026-06-29 | 2.2 | Phase 1B complete; 1C mostly complete; 13 routes |
| 2026-06-29 | 2.1 | Phase 1A complete; live progress summary added |
| 2026-06-29 | 2.0 | Locked decisions; content map; phased 1A–1E + Phase 2 split |
| 2026-06-28 | 1.0 | Original tracker (7-step roadmap era) |
