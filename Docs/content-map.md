# Biza Content Map

**Version:** 1.0  
**Last updated:** 2026-06-29  
**Status:** Locked for UI build (pre-database)  
**Canonical design:** Stitch / brand concept (`empowered_learning/DESIGN.md` + brand style guide)  
**Product behavior:** PRD v6 (flows, gating, legal, URLs — not PRD color/typography drift)

---

## 1. Purpose

This document is the **single source of truth** for categories, opportunities, courses, lessons, and chapter outlines until Supabase is live. The frontend and future seed scripts should read from `content-map.json` (companion file).

**MVP vertical slice:** Category **Selling online** → Opportunities **Dropshipping** + **Print on demand** → one course each with full lesson/chapter structure (copy can be stubbed in UI).

---

## 2. Content hierarchy

```
Platform (Biza)
  └── Category (6 launch domains)
        └── Opportunity (specific income model)
              └── Course (1:1 with opportunity)
                    └── Lesson (module)
                          └── Chapter (reading unit + optional quizzes)
```

### Rules

| Rule | Detail |
|------|--------|
| Slugs | Lowercase, hyphenated, URL-safe |
| Gating | First **2 chapters per lesson** = free; remaining = PRO or per-course purchase |
| Course count | Exactly **one course per opportunity** |
| Lesson count | Flexible — MVP uses 3 lessons per course |
| Chapter count | Flexible — MVP uses 3–4 chapters per lesson |
| Quizzes | 1–2 per chapter (mid-chapter); types: MCQ, True/False, Scenario, Fill-in-blank |
| Content depth | Titles and outlines are locked; body copy is **stub** until editorial pass |

---

## 3. URL structure (target)

| URL | Page |
|-----|------|
| `/` | Marketing homepage |
| `/courses` | All categories browse |
| `/courses/[category-slug]` | Category page (lists opportunities) |
| `/courses/[category-slug]/[opportunity-slug]` | Opportunity info card |
| `/courses/[category-slug]/[opportunity-slug]/learn` | Course shell / lesson list |
| `/courses/.../learn/[lesson-slug]/[chapter-slug]` | Chapter reader |
| `/scam-radar` | Scam Radar library (public) |
| `/onboarding` | 4-phase onboarding (mock user / localStorage until auth) |
| `/app` | Authenticated home dashboard (mock until Phase 2) |
| `/app/profile` | Profile + avatars |
| `/app/upgrade` | Pro / per-course upgrade |
| `/login` | Auth (Phase 2 — UI may exist earlier as disabled/mock) |
| `/terms`, `/privacy`, `/refunds` | Legal (PRD §19 copy) |
| `/admin` | Full admin (Phase 2+) |

**Redirect:** `/scam-warnings` → `/scam-radar` (301)

---

## 4. Launch categories (6)

| # | Name | Slug | Description |
|---|------|------|-------------|
| 1 | Freelancing & services | `freelancing-services` | Sell skills and services to clients online |
| 2 | Content & creation | `content-creation` | Build an audience and monetize through content |
| 3 | **Selling online** | `selling-online` | **MVP category** — sell products without holding inventory or with lightweight setup |
| 4 | Digital products | `digital-products` | Create once, sell repeatedly (templates, ebooks, kits) |
| 5 | Marketing & partnerships | `marketing-partnerships` | Commissions, referrals, and brand partnerships |
| 6 | Tech & AI services | `tech-ai-services` | No-code, automation, and AI-assisted client work |

### Opportunities by category (catalog — not all built at MVP)

#### 1. Freelancing & services
| Opportunity | Slug | MVP |
|-------------|------|-----|
| Writing & transcription | `writing-transcription` | Later |
| Virtual assistance | `virtual-assistance` | Later |
| Graphic design | `graphic-design` | Later |
| Web & dev freelancing | `web-dev-freelancing` | Later |

#### 2. Content & creation
| Opportunity | Slug | MVP |
|-------------|------|-----|
| YouTube monetization | `youtube-monetization` | Later |
| TikTok & short-form | `tiktok-creator` | Later |
| Newsletter & blogging | `newsletter-blogging` | Later |
| UGC for brands | `ugc-for-brands` | Later |

#### 3. Selling online *(MVP)*
| Opportunity | Slug | MVP |
|-------------|------|-----|
| **Dropshipping** | `dropshipping` | **Yes — P1** |
| **Print on demand** | `print-on-demand` | **Yes — P1** |
| Social commerce (TikTok Shop / Instagram) | `social-commerce` | Later |
| Jumia / marketplace selling | `marketplace-selling` | Later |

#### 4. Digital products
| Opportunity | Slug | MVP |
|-------------|------|-----|
| Notion / Canva templates | `templates-kits` | Later |
| Ebooks & guides | `ebooks-guides` | Later |
| Mini-courses | `mini-courses` | Later |

#### 5. Marketing & partnerships
| Opportunity | Slug | MVP |
|-------------|------|-----|
| Affiliate marketing | `affiliate-marketing` | Later (was v4 free course — re-home here) |
| Social media management (SMMA) | `smma` | Later |
| Influencer brand deals | `brand-deals` | Later |

#### 6. Tech & AI services
| Opportunity | Slug | MVP |
|-------------|------|-----|
| AI prompting for clients | `ai-prompting-services` | Later |
| No-code automations | `no-code-automation` | Later |
| Simple web tools for SMEs | `micro-saas-services` | Later |

> **Note:** Forex, crypto, and trading are **not** top-level categories. If added later, they live under a dedicated opportunity with heavy Scam Radar integration — not as a broad “Trading” category.

---

## 5. MVP opportunity cards (full metadata)

### 5.1 Dropshipping

| Field | Value |
|-------|--------|
| **Category** | Selling online |
| **Slug** | `dropshipping` |
| **Course title** | Dropshipping — Complete Course |
| **Course slug** | `dropshipping-course` |
| **Difficulty** | Intermediate |
| **Estimated hours** | 8–12 |
| **Skills needed** | Product research · Basic marketing · Customer support · Patience |
| **Startup cost (KES)** | 0 – 5,000 (domain/hosting/initial ad tests) |
| **Devices** | Phone or laptop (laptop recommended for store setup) |
| **Platforms** | Shopify · TikTok Shop · Meta Ads · AliExpress / CJ Dropshipping |
| **Timeline to first income** | 1 – 3 months |
| **Earnings — Starting** | KES 0 – 15,000 / month |
| **Earnings — Growing** | KES 15,000 – 80,000 / month |
| **Earnings — Established** | KES 80,000 – 300,000+ / month |
| **Success rate note** | ~30% stay consistent past month 3 |
| **Risk — Financial** | 2/5 |
| **Risk — Time** | 4/5 |
| **Risk — Scam** | 3/5 |
| **Recommended path** | 1. This course · 2. Digital marketing basics · 3. Paid ads fundamentals |
| **Scam alert** | Legitimate dropshipping suppliers never charge you before you make a sale. If a “supplier” or “mentor” asks for upfront membership fees — walk away. |
| **Pricing** | Free chapters 1–2 per lesson · Full course unlock KES 350 · or Pro Pass |

### 5.2 Print on demand

| Field | Value |
|-------|--------|
| **Category** | Selling online |
| **Slug** | `print-on-demand` |
| **Course title** | Print on Demand — Complete Course |
| **Course slug** | `print-on-demand-course` |
| **Difficulty** | Beginner |
| **Estimated hours** | 6–10 |
| **Skills needed** | Basic design · Niche research · Social marketing |
| **Startup cost (KES)** | 0 – 3,000 (optional design tools / sample orders) |
| **Devices** | Phone or laptop |
| **Platforms** | Printful · Printify · Etsy · Shopify · Canva |
| **Timeline to first income** | 2 – 8 weeks |
| **Earnings — Starting** | KES 0 – 10,000 / month |
| **Earnings — Growing** | KES 10,000 – 60,000 / month |
| **Earnings — Established** | KES 60,000 – 200,000+ / month |
| **Success rate note** | ~35% publish 10+ designs and keep going |
| **Risk — Financial** | 1/5 |
| **Risk — Time** | 3/5 |
| **Risk — Scam** | 2/5 |
| **Recommended path** | 1. This course · 2. Canva for sellers · 3. Etsy / social traffic |
| **Scam alert** | Avoid “done-for-you POD stores” sold for KES 20,000+. Real POD starts with your designs and free platform accounts. |
| **Pricing** | Free chapters 1–2 per lesson · Full course unlock KES 250 · or Pro Pass |

---

## 6. MVP course outlines

### 6.1 Dropshipping course

**Course ID:** `course-dropshipping`  
**Lessons:** 3 · **Chapters:** 10 total

#### Lesson 1 — Understand the model (`lesson-1-model`)
| Ch | Slug | Title | Free? | Quiz |
|----|------|-------|-------|------|
| 1 | `what-is-dropshipping` | What dropshipping actually is | Yes | MCQ: who holds inventory? |
| 2 | `money-flow-margin` | How money flows and where margin comes from | Yes | True/False: supplier ships to customer |
| 3 | `kenya-context` | Dropshipping from Kenya — payments and reality | PRO | Scenario: choosing a payment setup |
| 4 | `when-it-fails` | Why most stores fail in 90 days | PRO | MCQ: top failure reason |

#### Lesson 2 — Setup & suppliers (`lesson-2-setup`)
| Ch | Slug | Title | Free? | Quiz |
|----|------|-------|-------|------|
| 1 | `store-platform` | Choosing Shopify vs alternatives | Yes | MCQ: best MVP platform |
| 2 | `supplier-vetting` | Finding and vetting suppliers | Yes | Scenario: red-flag supplier message |
| 3 | `product-research` | Product research without hype | PRO | Fill-in-blank: validation metric |
| 4 | `store-basics` | Store pages that convert (basics) | PRO | — |

#### Lesson 3 — Traffic, ops & scams (`lesson-3-traffic`)
| Ch | Slug | Title | Free? | Quiz |
|----|------|-------|-------|------|
| 1 | `organic-vs-paid` | Organic vs paid traffic — honest expectations | Yes | True/False: ads guarantee sales |
| 2 | `customer-support` | Support, refunds, and chargebacks | Yes | Scenario: angry customer template |
| 3 | `scam-patterns` | Dropshipping scams and guru traps | PRO | MCQ: identify the scam offer |
| 4 | `next-steps` | Your 30-day action plan | PRO | — |

---

### 6.2 Print on demand course

**Course ID:** `course-print-on-demand`  
**Lessons:** 3 · **Chapters:** 9 total

#### Lesson 1 — POD fundamentals (`lesson-1-pod-basics`)
| Ch | Slug | Title | Free? | Quiz |
|----|------|-------|-------|------|
| 1 | `what-is-pod` | What print on demand is (and is not) | Yes | MCQ: who prints the product? |
| 2 | `pod-vs-dropshipping` | POD vs dropshipping — pick your path | Yes | Scenario: which model for a designer? |
| 3 | `niches-that-work` | Niches that work for Kenyan creators | PRO | MCQ: niche validation |

#### Lesson 2 — Design & publish (`lesson-2-design`)
| Ch | Slug | Title | Free? | Quiz |
|----|------|-------|-------|------|
| 1 | `design-tools` | Canva and simple design rules | Yes | True/False: you need a graphics degree |
| 2 | `platform-setup` | Printful / Printify + Etsy or Shopify | Yes | Fill-in-blank: listing element |
| 3 | `first-listings` | Publishing your first 5 products | PRO | — |
| 4 | `pricing-margins` | Pricing for margin in KES terms | PRO | MCQ: healthy margin range |

#### Lesson 3 — Traffic & growth (`lesson-3-growth`)
| Ch | Slug | Title | Free? | Quiz |
|----|------|-------|-------|------|
| 1 | `social-traffic` | TikTok & Instagram for POD | Yes | Scenario: hook for a product video |
| 2 | `avoid-scams` | POD scams and fake mentors | Yes | MCQ: spot the fake store offer |
| 3 | `scale-plan` | 30-day POD launch plan | PRO | — |

---

## 7. Onboarding (UI — mock user until Phase 2)

Four phases after account creation UI (stored in `localStorage` key `biza_onboarding`):

| Phase | Screens | Skippable on return? |
|-------|---------|----------------------|
| 1 — Welcome | Splash (B-P[1]) · Create account form · Email verify mock | No (first time) |
| 2 — Persona quiz | 3 questions → persona | Yes |
| 3 — Mindset & fraud | 3 screens + reflective quiz (not graded) | No within phase |
| 4 — App walkthrough | Learning path · Explore · Free vs PRO · Progress preview | Yes |

### Personas (from PRD — unchanged)

| Persona | Trigger (simplified) | Home emphasis |
|---------|----------------------|---------------|
| `starter` | New / exploring | Low-cost, beginner-friendly |
| `side-hustler` | Wants supplemental income | Time-efficient paths |
| `skilled` | Has skill to monetise | Freelancing & content first |
| `returning-learner` | Failed or scammed before | Fraud awareness + structure |

**MVP home recommendation logic (mock):**

- Default persona: `starter`
- `starter` / `side-hustler` → recommend **Print on demand** first
- `skilled` → recommend **Freelancing** catalog (placeholder card until built)
- `returning-learner` → surface **Scam Radar** + **Dropshipping** (scam lesson emphasis)

---

## 8. Scam Radar — initial pattern library

| ID | Name | Slug | Category tag |
|----|------|------|--------------|
| 1 | Activation fee job scam | `activation-fee-job` | Freelancing |
| 2 | Telegram escrow bypass | `telegram-escrow-bypass` | Freelancing |
| 3 | MLM masterclass guru | `mlm-masterclass` | Marketing |
| 4 | Forex guaranteed signals | `forex-signals-scam` | Markets |
| 5 | Fake POD / prebuilt store | `fake-pod-store` | Selling online |
| 6 | Fake dropshipping supplier fee | `fake-supplier-fee` | Selling online |
| 7 | Crypto doubling scheme | `crypto-doubling` | Markets |
| 8 | Fake freelance platform fee | `fake-platform-fee` | Freelancing |

Per-opportunity alerts: see §5.1 and §5.2.

---

## 9. Avatars (UI phase — unlock rules for mock)

| ID | Name | Default unlock | Condition |
|----|------|----------------|-----------|
| lion | The Lion | Yes | — |
| leopard | The Leopard | Yes | — |
| eagle | The Eagle | Yes | — |
| elephant | The Elephant | Yes | — |
| zebra | The Zebra | Yes | — |
| compass | The Compass | Yes | — |
| flame | The Flame | Yes | — |
| mountain | The Mountain | Yes | — |
| crown | The Crown | Locked | Complete 5 courses (mock: manual toggle in dev) |
| rocket | The Rocket | Locked | PRO member |

Assets: SVG set to be created in `biza-app/public/avatars/` during Phase 1D.

---

## 10. Pricing (UI copy — locked)

| Plan | Price (KES) | Notes |
|------|-------------|-------|
| Free | 0 | First 2 chapters per lesson |
| Per-course | 250 – 500 | Dropshipping 350 · POD 250 |
| Pro Pass Monthly | 999 | All courses |
| Pro Pass Annual | 7,999 | ~33% saving |

Payment UI: M-Pesa STK mock first · Flutterwave/Stripe Phase 2+.

---

## 11. Logo placement reference

| Context | Asset | Notes |
|---------|-------|-------|
| Forest nav / footer | `B-H[2].png` | Primary in-app |
| Cream / white marketing sections | `B-H[1].png` | |
| Onboarding splash | `B-P[1].png` or `B-P[2].png` | Tagline visible |
| Favicon / PWA | `B-B[1].png` → export 32, 180, 192, 512 | |
| Social / OG square | `B-S[1].png` | |
| Email (future) | `B-H[3].png` light · `B-H[4].png` dark | |

---

## 12. Change log

| Date | Change |
|------|--------|
| 2026-06-29 | v1.0 — Initial locked map: 6 categories, MVP Selling online (Dropshipping + POD), URL structure, onboarding/scam/avatar/pricing rules |

---

## 13. Next file

Machine-readable mirror: **`content-map.json`** (same data for seed scripts and `lib/content` imports after TS migration).
