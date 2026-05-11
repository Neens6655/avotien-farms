# PRD — Avotien: Avocado Tree Investment Platform

**Version:** 1.0
**Date:** 2026-03-21
**Status:** Draft
**Author:** ZGNAL Studio

---

## 1. Problem Statement

Investors seeking tangible, alternative assets have limited options outside traditional real estate and stocks. Agricultural investments — specifically avocado orchards in East Africa — offer 15-25% annual returns, environmental impact, and generational wealth. But there's no modern, trustworthy digital platform connecting global investors to Ugandan avocado farming opportunities.

**The Walnut Fund** (thewalnutfund.com) proved the model works for walnut trees in Serbia/Croatia. Avotien replicates and surpasses it for **Hass avocado trees in Uganda**, with superior UX, modern tech, and a more compelling investor experience.

---

## 2. Target Users

| Persona | Description |
|---------|-------------|
| **Diaspora Investor** | Ugandan/East African diaspora (US, UK, UAE) seeking homeland investment. Age 28-50, $5K-50K to deploy. |
| **Impact Investor** | Global ESG-conscious investor wanting tangible environmental + social returns. |
| **Alternative Asset Seeker** | Anyone diversifying beyond stocks/crypto. Attracted by "own a real tree" tangibility. |
| **High-Net-Worth Planter** | Wants a full orchard (500+ trees), land title, and legacy asset. |

**Current behavior:** These users invest in REITs, farmland crowdfunding (FarmFundr, AcreTrader), or do nothing because they don't trust opaque agricultural schemes.

---

## 3. Product Vision

**Avotien is the Robinhood of avocado farming** — a sleek, trust-first investment platform where anyone can buy avocado trees starting at $25, track their orchard's growth in real-time, and receive annual USD payouts from harvests.

**Superiority over The Walnut Fund:**

| Dimension | Walnut Fund | Avotien |
|-----------|------------|---------|
| Design | WordPress + WooCommerce, dated | Next.js 15, cinematic scroll experience |
| Calculator | Basic slider | Interactive 3D orchard visualizer + ROI projector |
| Trust | Static testimonials | Live orchard drone feeds, blockchain harvest receipts |
| Onboarding | Form → checkout | Guided quiz → personalized plan → checkout |
| Dashboard | None (just buy) | Investor portal: tree tracker, payout history, documents |
| Pricing | EUR only, starts €180 | USD, starts $25 (micro-investment tier) |
| Mobile | Responsive WordPress | Mobile-first, PWA-capable |
| Payments | PayPal + WooCommerce | Stripe, M-Pesa, crypto (USDC) |
| Content | Static blog | AI-generated orchard updates + photo reports |
| Social proof | Video testimonials | Live investor count, real-time activity feed |

---

## 4. Core Features (v1 — MVP)

### 4.1 Marketing Site (Public)

**F1: Cinematic Hero**
- Full-viewport video/image hero with parallax
- Headline: "Own Avocado Trees in Uganda. Earn Every Harvest."
- CTAs: "Start Investing" / "Calculate Returns" / "Book a Call"
- Trust bar: media logos (if available), "X trees planted" live counter
- Success: Hero loads in <2s, CTAs visible above fold at 375px and 1440px

**F2: Why Avotien Section**
- 4 benefit cards with scroll-triggered animations:
  1. Returns (15-25% annually)
  2. Tangibility ("Your trees have GPS coordinates")
  3. Impact (carbon offset, local jobs)
  4. Legacy (generational wealth, land ownership option)
- Success: Each card animates on scroll, respects prefers-reduced-motion

**F3: Interactive ROI Calculator**
- Inputs: number of trees (slider 1-1000), investment horizon (5-30 years), scenario (conservative/moderate/optimistic)
- Outputs: total investment, annual payout, cumulative return, ROI %, CO2 offset
- Real-time updates as sliders move
- Shareable results (URL params or screenshot)
- Success: Calculator renders in <500ms, outputs update within 100ms of input change

**F4: How It Works**
- 3-step visual flow with illustrations:
  1. Choose your trees → 2. We plant & manage → 3. You earn every harvest
- Success: Flow is understandable without reading body text (icons alone convey meaning)

**F5: Investment Plans**
- 3 tiers displayed as pricing cards:
  | Plan | Trees | Price | Perks |
  |------|-------|-------|-------|
  | Seedling | 1 tree | $25 | Annual payout, digital certificate |
  | Grove | 50 trees (+5 free) | $1,250 | Priority support, quarterly reports |
  | Orchard | 500+ trees | Custom | Land title option, site visits, dedicated manager |
- Success: Plans render as responsive cards, CTA per card leads to checkout

**F6: Project/Farm Pages**
- Individual pages per plantation/project
- Content: location map, photos, tree count, availability, soil data, climate info
- Progress bar: trees sold / total available
- Success: At least 1 project page live with real or realistic data

**F7: Team Section**
- Grid of team photos + roles + short bios
- Success: Renders without layout shift, images lazy-loaded

**F8: Testimonials / Social Proof**
- Investor quotes with name, location, photo
- Live activity feed: "John from Texas just purchased 10 trees" (can be simulated for v1)
- Success: At least 6 testimonials displayed, activity feed animates smoothly

**F9: FAQ Accordion**
- 10-15 common questions with expand/collapse
- Grouped by category: Investment, Returns, Legal, Environment
- Success: Smooth accordion animation, all answers render markdown

**F10: News/Blog Section**
- Latest 3-6 posts as cards with image, title, date, excerpt
- Links to full post pages
- Success: Posts load from MDX or CMS

**F11: Footer**
- Company info, Uganda office address, US/UK contact
- Legal links: Terms, Privacy, Risk Disclosure
- Social media links
- Newsletter signup (email input + submit)
- Success: Footer renders correctly at all breakpoints

### 4.2 Interactive Elements

**F12: Guided Investment Quiz**
- 3-4 question flow: "What's your goal?" → "How much to invest?" → "Risk tolerance?" → Personalized plan recommendation
- Success: Quiz completes in <60s, outputs a recommended plan

**F13: Calendly Integration**
- "Book a Call" CTA opens Calendly embed/popup
- Success: Calendly loads without layout shift

**F14: Live Chat**
- Crisp or Intercom widget
- Success: Chat widget loads, does not block page render

**F15: Newsletter Signup**
- Email capture → stored in database
- Success: Submission returns confirmation, email stored

### 4.3 Investor Portal (Authenticated)

**F16: Registration & Login**
- Email/password + Google OAuth
- Email verification
- Success: User can register, verify email, and log in within 2 minutes

**F17: Investor Dashboard**
- Overview: total trees owned, total invested, estimated next payout, portfolio value
- Tree map: visual grid of owned trees with status (planted/growing/harvesting)
- Payout history: table of past payouts with dates and amounts
- Documents: downloadable certificates, contracts
- Success: Dashboard loads in <3s with real or mock data

### 4.4 Checkout & Payments

**F18: Stripe Checkout**
- Select plan → enter details → Stripe payment → confirmation
- USD pricing
- Success: End-to-end purchase completes, payment captured in Stripe test mode

---

## 5. Non-Goals (NOT v1)

- Mobile native app (PWA is sufficient)
- Blockchain harvest receipts (v2)
- Drone live feeds (v2)
- M-Pesa / crypto payments (v2 — Stripe only for v1)
- AI-generated orchard updates (v2)
- Multi-language (English only for v1)
- Admin panel for farm management (v2)
- Referral/affiliate program (v2)
- KYC/AML compliance automation (manual for v1)
- 3D orchard visualizer (v2 — static illustrations for v1)

---

## 6. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 15** (App Router) | SSR for SEO, Server Components, best React DX |
| Styling | **Tailwind v4** | Utility-first, fast iteration, v4 CSS-first config |
| UI Components | **shadcn/ui** | Headless, accessible, composable |
| Animations | **Framer Motion** + **Lenis** (smooth scroll) | Cinematic scroll experience, parallax |
| Auth | **Clerk** | Drop-in auth, Google OAuth, email verification |
| Database | **Supabase** (Postgres) | Real-time, auth fallback, storage for images |
| Payments | **Stripe** | Industry standard, USD, test mode |
| CMS/Blog | **MDX** (local files) | Simple, version-controlled, no external CMS |
| Forms | **React Hook Form** + **Zod** | Validation, type-safe |
| Analytics | **Vercel Analytics** + **Plausible** | Privacy-friendly, no cookie banner needed |
| Deploy | **Vercel** | Next.js native, edge functions, preview deploys |
| Chat | **Crisp** | Free tier, easy embed |
| Booking | **Calendly** | Embed widget, no build needed |
| Email | **Resend** | Transactional emails (verification, receipts) |
| Package Manager | **bun** | Fast installs |

---

## 7. Design Direction

**NOT using ZGNAL Design System** — Avotien needs its own warm, organic, trust-building brand.

| Element | Direction |
|---------|-----------|
| Palette | Deep forest green (#1B4332), warm cream (#FFF8F0), terracotta accent (#C65D3E), gold highlights (#D4A84B), charcoal text (#1A1A1A) |
| Typography | **Playfair Display** (headings — premium feel) + **Inter** (body — clean readability) |
| Radius | Soft: 8px cards, 24px buttons (approachable, not corporate) |
| Imagery | Lush Uganda landscapes, close-up avocados, smiling farmers, aerial orchard shots |
| Layout | Full-bleed sections, generous whitespace, max-w-7xl content |
| Motion | Scroll-triggered fade-ups, parallax hero, smooth section transitions |
| Mobile | Mobile-first, bottom-sticky CTA bar on scroll |
| Trust signals | Everywhere — numbers, faces, locations, media logos, live counters |

---

## 8. Phases

### Phase 1: Foundation (scaffold + layout + hero)
- Project scaffold (Next.js 15 + Tailwind v4 + shadcn/ui)
- Global layout (nav, footer, responsive shell)
- Hero section with parallax
- Trust bar
- **Checkpoint:** Site loads, hero renders correctly at 375px + 1440px

### Phase 2: Marketing Sections
- Why Avotien (4 cards + scroll animations)
- How It Works (3-step flow)
- Investment Plans (3 pricing cards)
- Team section
- Testimonials + activity feed
- FAQ accordion
- **Checkpoint:** Full marketing page scrolls top to bottom, all sections render

### Phase 3: Interactive Features
- ROI Calculator (sliders + real-time output)
- Investment Quiz (guided flow)
- Newsletter signup (form + Supabase storage)
- Calendly embed
- Crisp chat widget
- **Checkpoint:** Calculator works, quiz completes, email saves to DB

### Phase 4: Project Pages + Blog
- Dynamic project/farm page template
- At least 1 project page with data
- Blog/news section with 3 MDX posts
- **Checkpoint:** Project page loads with map + stats, blog renders

### Phase 5: Auth + Dashboard
- Clerk integration (register, login, Google OAuth)
- Investor dashboard (overview, tree map, payout history, documents)
- Protected routes
- **Checkpoint:** User can register, log in, see dashboard with mock data

### Phase 6: Checkout + Payments
- Stripe integration (test mode)
- Plan selection → checkout flow → confirmation page
- Purchase stored in Supabase
- Email receipt via Resend
- **Checkpoint:** End-to-end purchase completes in test mode

### Phase 7: Polish + Ship
- SEO (meta tags, OG images, sitemap)
- Performance audit (Core Web Vitals)
- Playwright smoke test at 375px + 1440px
- Deploy to Vercel
- **Checkpoint:** Live URL loads, all sections work, Lighthouse >90

---

## 9. Success Criteria (Machine-Verifiable)

| # | Criteria | Verification |
|---|----------|-------------|
| 1 | Homepage loads in <2s on 4G | Lighthouse performance >90 |
| 2 | All sections visible at 375px and 1440px | Playwright screenshots |
| 3 | Calculator updates within 100ms of input | Manual test + console timing |
| 4 | Quiz produces recommendation in <60s | Manual test |
| 5 | User can register + log in via Clerk | E2E test |
| 6 | Stripe test payment completes end-to-end | Stripe dashboard verification |
| 7 | Newsletter email saves to Supabase | DB query verification |
| 8 | Blog posts render from MDX | Page loads with content |
| 9 | No console errors on page load | Playwright console check |
| 10 | prefers-reduced-motion disables animations | CSS media query test |

---

## 10. Open Questions (Need User Input)

1. **Brand assets:** Do you have a logo, photos of Uganda farms, or team photos? Or should we use stock/AI-generated imagery for v1?
2. **Real pricing:** Are the $25/tree and plan tiers correct, or do you have actual pricing?
3. **Farm data:** Do you have real project/plantation data (location, tree count, availability)?
4. **Legal:** Do you have Terms of Service, Privacy Policy, Risk Disclosure ready?
5. **Domain:** Do you have a domain (avotien.com or similar)?
6. **Calendly:** Do you have a Calendly account for "Book a Call"?

---

## DO NOT CHANGE

Once approved, the following are locked:
- Tech stack (Section 6)
- Phase order (Section 8)
- Core feature list (Section 4)
- Non-goals (Section 5)
