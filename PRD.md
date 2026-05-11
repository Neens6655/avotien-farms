# Avotien Farms — Full Product Requirements Document

**Version:** 2.0  
**Date:** 2026-05-11  
**Live site:** https://avotien.vercel.app  
**Company:** Avotein Farms Ltd.  
**Contact:** hani@avoteinfarms.earth · +256 75 437 0246  
**Website:** www.avoteinfarms.earth

---

## Table of Contents

1. [What Is Avotien?](#1-what-is-avotien)
2. [The Business Model](#2-the-business-model)
3. [Who Is It For?](#3-who-is-it-for)
4. [Investment Plans](#4-investment-plans)
5. [The ROI Calculator — Full Math Explained](#5-the-roi-calculator--full-math-explained)
6. [Complete Site Map](#6-complete-site-map)
7. [User Journeys — Step by Step](#7-user-journeys--step-by-step)
8. [Investor Dashboard — Every Screen](#8-investor-dashboard--every-screen)
9. [Admin Panel — Every Screen](#9-admin-panel--every-screen)
10. [Data Models](#10-data-models)
11. [Tech Stack](#11-tech-stack)
12. [API Endpoints](#12-api-endpoints)
13. [Design System](#13-design-system)
14. [Completion Status](#14-completion-status)
15. [What Needs to Be Built Next](#15-what-needs-to-be-built-next)
16. [File Structure](#16-file-structure)

---

## 1. What Is Avotien?

Avotien Farms is an **agricultural investment platform** where anyone in the world can buy Hass avocado trees on managed farms in Uganda and earn annual USD payouts from harvests.

**The core promise is simple:**

> Pay $19.50 per tree. We plant it, manage it, harvest it, and export it for 20 years. Starting Year 4, you receive your share of the harvest income in USD every year.

Avotien owns the entire chain — from the nursery where seedlings are grown, to the farm where trees are cultivated, to the export logistics, all the way to retail shelves in Uganda's Carrefour stores under their own brand **"I Feel Pretty"**. Avocado waste is also converted to eco-friendly charcoal under the **BRIQUEEN** brand, adding a sustainability layer.

**The comparable:** This is modelled on [The Walnut Fund](https://thewalnutfund.com) — applied to Uganda's Hass avocado sector.

---

## 2. The Business Model

### Supply Chain (owned end-to-end)

```
[Nursery] → [Farm] → [Harvest] → [Export] → [Retail]
   ↓            ↓          ↓           ↓          ↓
10,000        200       Annual      Dubai,     Carrefour
seedlings    acres      payout     Jeddah,     Uganda
                       to         Kuwait,    (7 branches)
                      investor    London
```

### Revenue Sharing

- Investor buys trees at $19.50/tree
- Avotien plants and manages those specific trees for 20 years
- Every harvest season, income from those trees (minus operations cost) is paid to the investor in USD via bank transfer
- Investors hold a **digital ownership certificate** for their exact trees (identified by GPS coordinates and unique codes like `MKN-0001`)

### Secondary Revenue

- Bio-charcoal from avocado waste (BRIQUEEN brand)
- Smallholder farmer partnerships (1,000+ farmers in the region)
- Export containers: 24 containers exported to date

---

## 3. Who Is It For?

| Investor Type | Location | Typical Investment | Why Avotien |
|---|---|---|---|
| **East African Diaspora** | US, UK, UAE | $975 – $5,000 | Home-connected investment, USD returns |
| **Impact Investors** | Global | $5,000 – $20,000 | ESG, tangible environment + social returns |
| **Alternative Asset Seekers** | Global | $975 – $20,000 | Diversify from stocks and crypto |
| **High-Net-Worth / Orchard Partners** | Global | $20,000+ | Land partnership, dedicated manager |

---

## 4. Investment Plans

There are 3 plans. All are priced at **$19.50 per tree**.

### Plan 1: Seedling — $975

- **50 trees**
- No bonus trees
- What you get:
  - 20-year managed farm agreement
  - Annual USD payout starting from Year 4
  - Projected ~40% ROI per year at maturity
  - Digital ownership certificate (PDF with your tree codes)
  - Quarterly farm reports with photos
- **Best for:** First-time investors, diaspora wanting a small stake

### Plan 2: Grove — $4,875 *(Most Popular)*

- **250 trees + 25 bonus trees = 275 trees total**
- 10% bonus trees free
- What you get (everything in Seedling, plus):
  - 25 bonus trees (10% extra, free)
  - Priority investor support
  - Monthly growth reports (instead of quarterly)
  - Annual farm visit invitation
  - Dedicated account manager
- **Best for:** Serious investors who want meaningful passive income

### Plan 3: Orchard — $19,500+

- **1,000+ trees**
- Custom scale
- What you get (everything in Grove, plus):
  - Land partnership option (own part of the land)
  - Dedicated farm manager assigned to your trees
  - Custom planting schedule
  - Bi-annual site visits (twice a year)
  - Export revenue participation
  - Legacy transfer planning
- **Best for:** HNW investors treating this as a long-term family asset

---

## 5. The ROI Calculator — Full Math Explained

This is the most important interactive feature on the site. It lives at `src/lib/calculator.ts` and is displayed by `src/components/marketing/roi-calculator.tsx`.

### Inputs

| Input | Range | Default | How to change |
|---|---|---|---|
| Number of trees | 1 – 5,000 | 50 | Drag slider |
| Investment horizon | 5 – 30 years | 15 years | Drag slider |
| Scenario | Conservative / Moderate / Optimistic | Moderate | Click button |

### The Yield Model (USD per tree per year)

This is the core assumption. These numbers represent what each tree earns per year in USD, based on Hass avocado market prices and farm projections.

| Year | Conservative | Moderate | Optimistic |
|---|---|---|---|
| Year 1 | $0 | $0 | $0 |
| Year 2 | $0 | $0 | $0 |
| Year 3 | $0 | $0 | $0 |
| Year 4 | $3.50 | $6.20 | $9.00 |
| Year 5 | $10.00 | $17.20 | $24.00 |
| Year 6 onwards | $18.00 | $31.20 | $42.00 |

**Why years 1–3 are zero:** Hass avocado trees take 3–4 years after planting before producing their first fruit. This is a real agricultural fact, not a conservative estimate.

**Why Year 4 is lower:** The first harvest is usually smaller as the tree is still maturing.

**Why Year 6+ is the "steady state":** From Year 6, the tree is fully mature and producing at its full capacity. This is the number that drives the long-term ROI.

### The Calculation (step by step)

```
Step 1: Total Investment
  = trees × $19.50

Step 2: For each year from 1 to [horizon]:
  - If year ≤ 3:  annual payout = trees × $0
  - If year = 4:  annual payout = trees × yield.year4
  - If year = 5:  annual payout = trees × yield.year5
  - If year ≥ 6:  annual payout = trees × yield.year6plus
  - Add to cumulative return

Step 3: Final Annual Payout
  = the annual payout in the LAST year of the horizon
  (this is the "steady state" income you'll be earning per year)

Step 4: ROI %
  = ((cumulative return − total investment) / total investment) × 100

Step 5: CO₂ Offset
  = trees × 0.022 tons × years
  (each Hass avocado tree sequesters approximately 0.022 tons of CO₂ per year)
```

### Example: 50 trees, 15 years, Moderate scenario

```
Total Investment = 50 × $19.50 = $975

Year 1:  $0
Year 2:  $0
Year 3:  $0
Year 4:  50 × $6.20  = $310
Year 5:  50 × $17.20 = $860
Year 6:  50 × $31.20 = $1,560
Year 7:  50 × $31.20 = $1,560
...
Year 15: 50 × $31.20 = $1,560

Cumulative Return = $310 + $860 + ($1,560 × 10) = $16,770
Annual Payout (year 15) = $1,560
ROI = ((16,770 − 975) / 975) × 100 = 1,620%
CO₂ Offset = 50 × 0.022 × 15 = 16.5 tons
```

### Where to adjust the math

The file to edit is: **`src/lib/calculator.ts`**

The key numbers are at the top:

```typescript
const TREE_PRICE = 19.50  // ← change this to update price per tree

const YIELD_PER_TREE = {
  conservative: { year1to3: 0, year4: 3.5,  year5: 10,   year6plus: 18   },
  moderate:     { year1to3: 0, year4: 6.2,  year5: 17.2, year6plus: 31.2 },
  optimistic:   { year1to3: 0, year4: 9,    year5: 24,   year6plus: 42   },
}

const CO2_PER_TREE_PER_YEAR = 0.022  // ← change this to update carbon offset
```

**To add a 4th scenario:** Add a new key to `YIELD_PER_TREE`, add a new button in `roi-calculator.tsx`, and update the TypeScript type in `CalculatorInput`.

**To change when payouts start:** The `if (y <= 3)` check in the loop controls the "dead years". Change `3` to `4` to delay by one year.

**To add year-by-year growth (instead of flat year6plus):** Replace `year6plus: 31.2` with a function or array that calculates yield based on the year number.

---

## 6. Complete Site Map

### Public Pages (no login required)

| URL | What it is |
|---|---|
| `/` | Homepage — full marketing page with all sections |
| `/blog` | Knowledge Hub — 11 articles on avocado farming and investment |
| `/blog/[slug]` | Individual blog article page |
| `/projects` | Farm Explorer — interactive map + all 8 farm plots |
| `/projects/[slug]` | Individual farm detail page |
| `/faq` | Frequently Asked Questions — 13 questions, 4 categories |
| `/contact` | Contact info, office address, booking form |
| `/checkout` | Plan selection + redirect to Stripe payment |
| `/checkout/success` | Payment confirmation page |
| `/checkout/cancel` | Payment cancelled page |
| `/sign-in` | Login page (powered by Clerk) |
| `/sign-up` | Registration page (powered by Clerk) |

### Investor Dashboard (login required)

| URL | What it is |
|---|---|
| `/dashboard` | Overview: portfolio stats, farm photos, charts, timeline |
| `/dashboard/trees` | My Trees: visual grid of all owned trees + searchable table |
| `/dashboard/payouts` | Earnings & Payouts: history, projections, yield data |
| `/dashboard/documents` | Ownership certificates, agreements, tax summaries |
| `/dashboard/updates` | Farm Updates: monthly photos, crop reports, bio facts |
| `/dashboard/support` | Support tickets: open new ticket, view history |

### Admin Panel (login required + admin role)

| URL | What it is |
|---|---|
| `/admin` | Command centre: KPIs, charts, activity feed |
| `/admin/investors` | Investor CRM: list, search, filter, email compose |
| `/admin/investors/[id]` | Individual investor profile |
| `/admin/trees` | Tree inventory management |
| `/admin/farms` | Farm management overview |
| `/admin/farms/[slug]` | Individual farm detail + management |
| `/admin/farms/[slug]/report` | Create new crop report |
| `/admin/finance` | Revenue, expenses, payout processing |
| `/admin/communications` | Email campaigns, SMS, notifications |
| `/admin/documents` | Certificate generation, document storage |
| `/admin/support` | Support ticket queue |
| `/admin/settings` | Platform settings, roles, permissions |

### API Endpoints

| URL | Method | What it does |
|---|---|---|
| `/api/stripe/checkout` | POST | Creates a Stripe payment session |
| `/api/stripe/webhook` | POST | Receives payment confirmation from Stripe |
| `/api/newsletter` | POST | Saves newsletter email subscription |
| `/api/clerk/webhook` | POST | Syncs new user from Clerk to database |

---

## 7. User Journeys — Step by Step

---

### Journey 1: Visitor Arrives and Explores the Homepage

**What they see (scrolling top to bottom):**

#### Section 1 — Hero Banner
- Full-screen farm background image with dark overlay
- Large headline: *"Invest in Uganda's Avocado Future"*
- Subtitle explaining the 20-year managed model
- Two buttons:
  - **"Join the HASS Fund"** → goes to `/checkout`
  - **"Calculate Returns"** → smooth-scrolls down to the calculator
- Four statistics that animate (count up) when the user scrolls to them:
  - 200 Acres Cultivated
  - 10,000 Nursery Seedlings
  - ~40% Annual ROI (from Year 4)
  - 20-Year Management Agreement
- A small bouncing arrow at the bottom encouraging scrolling

#### Section 2 — Why Avotien
- Four cards explaining the value proposition
- Cards lift and scale slightly when hovered

#### Section 3 — Supply Chain
- Visual 5-step flow showing the journey from nursery to consumer:
  **Plant → Cultivate → Harvest → Export → Retail**

#### Section 4 — How It Works
- Three steps with icons and descriptions:
  1. Purchase your trees
  2. We manage everything
  3. You receive annual payouts

#### Section 5 — ROI Calculator
*(See Section 5 above for the full math explanation)*

- Three sliders for trees, years, and scenario
- Five output cards that update instantly as you drag:
  - Total Investment
  - Annual Payout (at the end of your horizon)
  - Cumulative Return
  - ROI %
  - CO₂ Offset
- All animations fade in when this section scrolls into view

#### Section 6 — Impact Stats
- Four metric cards showing what Avotien has achieved

#### Section 7 — Investment Plans
- Three plan cards side by side
- Grove card is highlighted with a "Most Popular" badge
- Each card has a "Get Started" button → goes to `/checkout`
- Cards fade in with a staggered animation

#### Section 8 — Farm Gallery
- Photo grid of actual farm images
- Images zoom slightly on hover

#### Section 9 — Testimonials
- Six investor quote cards
- Each shows: name, country, which plan they bought, their quote

#### Section 10 — Team
- Seven team member cards in a 3-column grid
- Each has name, role, and bio

#### Section 11 — FAQ Accordion
- 13 questions grouped in 4 categories
- Click any question → it expands to show the answer
- Click again → it collapses

#### Section 12 — Newsletter
- Email input and subscribe button
- On submit: validates email format, posts to `/api/newsletter`, shows success message

---

### Journey 2: Visitor Explores the Farm Explorer

**URL:** `/projects`

1. Page loads showing all plots with a region filter dropdown at the top
2. Filter options: **All / Central Uganda / Western Uganda**
3. Eight farm plot cards are shown, each displaying:
   - Plot name and status (Producing / Growing / Planted / Available)
   - Number of acres
   - Trees available for purchase
   - Health score
   - Price per tree ($19.50)
   - Estimated years to first harvest
4. A **SVG map of Uganda** on the right side shows pins for each plot location
5. **Hover a plot card** → the corresponding map pin highlights
6. **Click a plot card** → it expands to show a year-by-year yield projection table
7. **Click a map pin** → selects and expands the matching plot card

**The two active farms:**

| Farm | Location | Total Trees | Sold | Available | First Harvest |
|---|---|---|---|---|---|
| Avotein Farm One | Central Uganda (1,200m altitude) | 15,000 | 8,500 | 6,500 | 2027 |
| Avotein Farm Two | Western Uganda (1,400m altitude) | 12,000 | 5,200 | 6,800 | 2028 |

---

### Journey 3: Visitor Reads the Blog

**URL:** `/blog`

1. Hero section with the heading "Knowledge Hub"
2. Two **featured articles** shown large at the top (2 columns)
3. Nine remaining articles in a 3-column grid below
4. Each card shows: image with category badge, title, excerpt, date, reading time
5. Hover a card → image zooms, title turns gold
6. Click a card → goes to `/blog/[slug]` for the full article

**11 articles cover:**
- Investor Education (how the model works)
- Market Research (global avocado demand trends)
- Market Intelligence (Uganda export data)
- Farm Science (Hass avocado cultivation, altitude, soil)
- Impact (carbon sequestration, smallholder partnerships)

---

### Journey 4: Visitor Buys a Plan (Checkout Flow)

**URL:** `/checkout`

**Step 1 — Choose a Plan**
- Three plan cards are shown side by side
- Click any card → it gets selected (highlighted border, checkmark appears, card scales up slightly)
- "Proceed to Payment" button at the bottom stays greyed out until a plan is selected
- Once selected, the button turns active and shows the plan name and price

**Step 2 — Click "Proceed to Payment"**
- Button changes to "Redirecting to Stripe..." (loading state, disabled to prevent double-click)
- App sends a request to `/api/stripe/checkout` with the selected plan ID
- Server creates a Stripe Checkout Session and returns the payment URL

**Step 3 — Stripe Checkout (external)**
- User is redirected to Stripe's hosted payment page
- Enters card details, billing address
- Stripe handles all PCI compliance

**Step 4a — Payment Succeeds**
- Stripe redirects back to `/checkout/success`
- Page shows: "Welcome to the Orchard"
- Two links: Go to Dashboard · Go Home

**Step 4b — Payment Cancelled**
- Stripe redirects back to `/checkout/cancel`
- Page shows: "No worries — come back when you're ready"
- Two links: Try Again · Go Home

**⚠️ Known issue — pricing mismatch:**
The plan cards show the correct prices ($975, $4,875, $19,500) but the Stripe API route currently uses test/placeholder amounts ($25, $1,250, $12,500). This must be fixed before going live.

---

### Journey 5: Visitor Reads FAQ

**URL:** `/faq`

Standalone page with the same accordion component used on the homepage.

**4 categories, 13 questions:**

| Category | Questions include |
|---|---|
| HASS Fund | What is the HASS Fund? How does tree ownership work? |
| Returns | When do payouts start? What are the projections? |
| Operations | Who manages the farm? What happens if a tree dies? |
| Impact | How does this help Uganda? What is the carbon offset? |

---

### Journey 6: Visitor Contacts the Team

**URL:** `/contact`

- Office address and contact details
- Email, phone, website
- Contact form (name, email, message)
- Calendly booking link (placeholder — not yet live)

---

## 8. Investor Dashboard — Every Screen

These screens are only visible after logging in. All data is currently mock/demo data — real database connections are still to be built.

---

### Screen 1: Overview (`/dashboard`)

This is the main landing page after login. It gives the investor a complete picture of their portfolio.

**Notification Bar (top)**
Two alerts are shown until dismissed:
- "Please update your bank details for upcoming payouts" → links to Documents
- "Complete your KYC verification" → links to verification flow

**Farm Hero Banner**
- Large background farm image with a forest-green overlay
- Shows "55 Trees Growing" as the headline stat
- "+ Expand Orchard" button → goes to `/checkout` to buy more trees

**Four KPI Cards**
| Metric | Current Value | What it means |
|---|---|---|
| Total Invested | $1,375 | What you paid |
| Earned to Date | $445 | Total payouts received |
| Portfolio Value | $1,820 | Estimated current market value (+32.4%) |
| Next Payout | $302 | Estimated income in December 2026 |

**Your Farm Section**
- Farm photo gallery (6 photos from the actual farm)
- Two block cards:
  - **Block A**: 45 trees, status: Producing, health: 8.2/10, planted March 2023, altitude 1,200m
  - **Block C**: 10 trees, status: Growing, health: 7.9/10, planted June 2024, altitude 1,200m
- Each block card shows a progress bar: "X of Y trees producing"

**Financial Charts** *(loaded dynamically to keep page fast)*
- Portfolio value over time (line chart)
- Payout forecast over the next 5 years (bar chart)
- Both charts use Recharts library

**Orchard Status — Tree Growth Stage**
Five-stage visual showing where your trees are in their lifecycle:
1. Sapling (years 0–1)
2. Young (years 1–2)
3. Flowering (years 2–3)
4. **Fruiting** ← current stage (year 3–4)
5. Mature (year 4+)

The current stage is shown in forest green. Past stages are faded green. Future stages are cream.

**Investment Timeline**
A chronological log of all major events related to your investment.  
Shows 4 events by default, "Show all" expands to show all 10:
- Purchase confirmation (when you bought)
- Tree assignment (when specific trees were assigned to you)
- Planting confirmation (when trees were planted)
- First inspection report
- Growth milestone updates
- First payout received
- Next payout scheduled
- ...etc.

**Bottom Cards**
- **Ownership Certificate**: A card with a "Download Certificate" button (PDF of your tree ownership)
- **Refer a Friend**: Your personal referral link to share. Copy-to-clipboard button.

---

### Screen 2: My Trees (`/dashboard/trees`)

This screen lets you see every single tree you own.

**Block Summary Cards (2 cards)**
- Block A: 45 trees · Producing · Health 8.2/10 · Planted March 2023 · 1,200m altitude
- Block C: 10 trees · Growing · Health 7.9/10 · Planted June 2024 · 1,200m altitude

**Visual Tree Grid**
- 55 tree emojis arranged in a responsive grid (8 columns on mobile, 20 on wide screens)
- 🌳 = Producing trees (forest green background) — 45 trees
- 🌱 = Growing trees (gold background) — 10 trees
- **Hover any tree** → tooltip appears showing:
  - Tree code (e.g. MKN-0034)
  - Block (A or C)
  - Health score (e.g. 8.4/10)
  - Height (e.g. 142 cm)
- Hovered tree scales up to 1.25× size

**Searchable Tree Table**
- Search box at the top: type any tree code to filter
- Columns: Code · Block · Status · Health (with colour bar) · Height · Date Planted
- Shows first 20 of 55 trees (table is scrollable)
- Sticky header stays visible while scrolling through long list
- Footer: "Showing 20 of 55 trees · 45 Producing · 10 Growing"

**Tree codes are formatted:** `MKN-0001` through `MKN-0055`  
(MKN = Mukono, the district where Farm One is located)

---

### Screen 3: Earnings & Payouts (`/dashboard/payouts`)

**Four Summary Cards**
| Metric | Value | What it means |
|---|---|---|
| Lifetime Earnings | $445 | Total USD received from all payouts |
| Next Payout (Est.) | $302 | Expected amount in the next harvest season |
| Avg per Tree | $5.49 | Average USD earned per tree across all payouts |
| Yield per Season | 8.1 kg/tree | Average avocado yield per tree per harvest |

**Completed Payouts Table**

| Season | Amount | Trees | Total Yield | Price/kg | Date Paid | Bank Reference | Status |
|---|---|---|---|---|---|---|---|
| Q4 2025 | $247 | 45 trees | 360 kg | $0.69/kg | Dec 2025 | WIRE-2025-12 | ✅ Confirmed |
| Q4 2024 | $198 | 40 trees | 280 kg | $0.71/kg | Dec 2024 | WIRE-2024-12 | ✅ Confirmed |

**Upcoming Payout Projections**

| Season | Estimated Amount | Status |
|---|---|---|
| Q4 2026 | $302 | 🔵 Scheduled |
| Q4 2027 | $365 | 🟡 Projected |
| Q4 2028 | $435 | 🟡 Projected |

Projections use the moderate yield scenario from the calculator.

---

### Screen 4: Documents (`/dashboard/documents`)

Five documents listed with download buttons:

| Document | Type | Date | Size |
|---|---|---|---|
| Ownership Certificate | Certificate (PDF) | March 2023 | 245 KB |
| Investment Agreement | Agreement (PDF) | March 2023 | 180 KB |
| Payout Statement Q4 2025 | Payout Statement (PDF) | December 2025 | 95 KB |
| Farm Progress Report Q3 2025 | Quarterly Report (PDF) | October 2025 | 1.2 MB |
| Tax Summary 2025 | Tax Summary (PDF) | February 2026 | 88 KB |

Status: UI is complete. PDF generation and file storage (Supabase Storage) are not yet built.

---

### Screen 5: Farm Updates (`/dashboard/updates`)

**Hero Banner**
Stats overview: 15,000 trees · 60 hectares · 3 blocks

**Bio Facts Grid (12 fact cards)**

| Fact | Value |
|---|---|
| Location | Mukono District, Central Uganda |
| Altitude | 1,200m above sea level |
| Soil Type | Volcanic clay loam |
| Annual Rainfall | 1,200–1,500mm |
| Tree Variety | Hass Avocado |
| Tree Density | 240 trees/hectare |
| Tree Lifespan | 30–40 years |
| First Fruit | Year 3–4 |
| Annual Production | Up to 80 kg/tree (mature) |
| Export Destinations | Dubai, Jeddah, Kuwait, London |
| CO₂ Captured | 0.022 tons/tree/year |
| Local Workers | 200+ employed |

**Monthly Update Sections (4 months shown)**

Each month shows:
- Health score for that period
- Production metrics (kg harvested, trees active)
- Photo grid (farm photos by category: canopy, irrigation, roads, harvest, team)

---

### Screen 6: Support (`/dashboard/support`)

**New Ticket Button**
- Click → form expands below the button
- Form fields: Subject (text input), Message (large text area)
- Submit button

**Existing Tickets Table**

| Ticket | Subject | Status | Date |
|---|---|---|---|
| #001 | "When will my trees be planted?" | ✅ Resolved | Feb 2024 |
| #002 | "Can I visit the farm?" | 🔵 In Progress | Jan 2025 |

---

## 9. Admin Panel — Every Screen

These screens are only accessible to the internal Avotien operations team.

---

### Screen 1: Command Centre (`/admin`)

The main admin overview. Shows everything happening on the platform.

**Header**
- Dynamic greeting based on time of day ("Good morning, David")
- Today's date
- Two quick-action buttons:
  - "Broadcast to Investors" → communications flow
  - "+ Crop Report" → farm report creation

**Six KPI Cards**

| Metric | Value | Change | Meaning |
|---|---|---|---|
| AUM (Assets Under Management) | $142,350 | +12.3% | Total money invested by all investors |
| Active Investors | 1,420 | +34 | Investors who have completed at least one purchase |
| Trees Planted | 12,847 | +200 | Total trees in the ground |
| Occupancy Rate | 65.3% | +2.1% | % of available trees that have been sold |
| Avg Revenue/Tree | $11.07 | +$0.82 | Average revenue generated per tree this season |
| Open Issues | 7 | −3 | Support tickets or alerts needing attention |

Green arrow = going up (good). Red arrow = going down (could be good or bad depending on context).

**Revenue & Expenses Chart**
12-month line chart showing:
- Monthly revenue (forest green line)
- Monthly expenses (terra/orange line)
Lazy-loaded (only renders when page is fully interactive).

**Investor Conversion Funnel**
Shows how visitors become investors. 5 stages with conversion rates:

```
Visitors      12,400  ─────────────────────────────
Signups        2,840  ──────────────────── (23% of visitors)
KYC Approved   1,890  ──────────────── (67% of signups)
First Purchase 1,420  ───────────── (75% of KYC approved)
Repeat Investor  380  ───── (27% of first-time buyers)
```

**Three-Column Lower Section**

Left column — Recent Purchases (4 latest):
- Investor name, plan, trees bought, amount, date

Centre column — Upcoming Payouts (2 seasons):
- Season name, total payout amount, investor count, status

Right column — Alerts & Actions (4 items):
- 🔴 Urgent: e.g. "3 investors have outstanding KYC"
- 🟡 Warning: e.g. "Stripe webhook not responding"
- 🔵 Info: e.g. "New crop report available for review"
- ✅ Success: e.g. "Payout batch Q4 2025 completed"

**Activity Timeline (8 entries)**

Chronological feed of everything that happened on the platform:
- 💰 New purchase (investor name · plan · amount)
- 🌿 Farm inspection report filed (farm name · block)
- ✅ KYC approved (investor name)
- 📧 Email campaign sent (subject · recipient count)
- 💸 Payout batch processed (season · total amount)
- 🌳 New trees assigned (count · investor name)
- 🎫 Support ticket resolved (ticket ID)
- 📸 Farm photos uploaded (count · farm name)

---

### Screen 2: Investor CRM (`/admin/investors`)

The most complex screen in the admin panel. Manages all investor relationships.

**Four Summary Cards**
- Total AUM, Outstanding Balance, Overdue Count, Average Investment

**Search & Filter Bar**
- Search input: type investor name or email to filter the table instantly
- Four status filter tabs with counts:
  - All | Active (forest green) | Partial (gold) | Overdue (red)

**Investor Table**

Columns: Investor (photo + name + email) · Plan/Trees · Amount Paid · Outstanding · KYC Status · Account Status · Actions

Each row has two action buttons:
- ✉️ Email icon → opens compose modal for that investor
- 👤 Profile icon → goes to `/admin/investors/[id]`

**Click any row** → it expands inline to show:

1. Payment History card:
   - Total invested · Amount paid · Outstanding balance · Date of last payment

2. Payouts Sent list:
   - Each payout with season, amount, date

3. Quick Action buttons (5):
   - Send Payment Reminder
   - Upload Document
   - Record Manual Payment
   - Add Internal Note
   - (one more)

4. Internal Notes:
   - Any notes the admin team has written about this investor

**Email Compose Modal**

When you click the email icon, a modal overlay appears with:
- **To:** pre-filled with investor's email
- **Template selector** (dropdown with 7 options):
  1. Payment Reminder — Friendly tone
  2. Payment Reminder — Urgent tone
  3. Welcome Letter (for new investors)
  4. Payout Notification (when a payout has been sent)
  5. KYC Request (asking investor to complete verification)
  6. Quarterly Report cover email
  7. Custom (blank template)
- **Subject:** pre-filled based on selected template
- **Message body:** pre-filled with investor-specific content (name, amount, plan are automatically inserted)
- **Send** button (currently shows an alert — real email sending via Resend not yet built)
- **Cancel** button

---

### Screens 3–11: Admin Sub-Pages (Stubs)

These pages have their navigation and layout wired up but their content is not yet built:

| Page | What it will do when built |
|---|---|
| `/admin/trees` | View and manage all 12,847+ trees by farm, block, health, investor |
| `/admin/farms/[slug]` | Full farm detail: map, blocks, health scores, irrigation status |
| `/admin/farms/[slug]/report` | Form to file a new crop report (yield, health, weather, photos) |
| `/admin/finance` | Revenue dashboard, expense tracking, payout batch processing |
| `/admin/communications` | Email campaign builder, SMS broadcasts, notification history |
| `/admin/documents` | Generate investor certificates, upload tax documents |
| `/admin/support` | All support tickets, assign to team members, reply |
| `/admin/settings` | Platform settings, team roles, permissions, webhook config |

---

## 10. Data Models

These are all the database tables. Defined in `src/types/database.ts`.

### Investor
The person who owns trees.
```
id                UUID (primary key)
clerk_id          string — links to Clerk auth account
email             string
full_name         string
phone             string | null
country           string | null
kyc_status        pending | submitted | approved | rejected
plan              seedling | grove | orchard | null
notes             string | null (internal admin notes)
created_at        timestamp
updated_at        timestamp
```

### Tree
One individual Hass avocado tree.
```
id                UUID
tree_code         string — e.g. "MKN-0042" (unique identifier)
project_id        UUID → Project
investor_id       UUID → Investor | null (null = unsold)
gps_lat           number | null
gps_lng           number | null
block             string | null — e.g. "A", "B", "C"
row_num           number | null
variety           string — "Hass Avocado"
status            available | assigned | growing | producing | retired
health_score      number | null — 0 to 10
planted_at        timestamp | null
assigned_at       timestamp | null — when sold to investor
last_inspected_at timestamp | null
created_at        timestamp
```

### Project
A farm or farm block.
```
id                UUID
slug              string — e.g. "farm-one"
name              string — e.g. "Avotein Farm One"
location          string | null
country           string
coordinates       { lat, lng } | null
total_trees       number
sold_trees        number
tree_variety      string
altitude          string | null — e.g. "1200m above sea level"
rainfall          string | null
soil_type         string | null
status            planning | planting | active | harvesting | retired
planting_date     string | null
first_harvest_date string | null
description       string | null
created_at        timestamp
updated_at        timestamp
```

### Purchase
A completed or pending payment.
```
id                UUID
investor_id       UUID → Investor
plan_id           string — seedling | grove | orchard
trees_count       number
amount_usd        number
stripe_session_id string | null
stripe_payment_intent string | null
status            pending | completed | failed | refunded
metadata          JSON
created_at        timestamp
```

### Payout
An annual harvest payment to an investor.
```
id                UUID
investor_id       UUID → Investor
harvest_season    string — e.g. "Q4 2025"
trees_count       number — how many of their trees produced this season
yield_per_tree_kg number | null — kg of avocados per tree this season
price_per_kg_usd  number | null — what the harvest sold for
amount_usd        number — total payout amount
status            calculated | approved | sent | confirmed | reconciled
calculated_at     timestamp
approved_at       timestamp | null
paid_at           timestamp | null
notes             string | null
```

### BankTransfer
The actual wire transfer record.
```
id                UUID
payout_id         UUID → Payout | null
investor_id       UUID → Investor
bank_name         string | null
account_last4     string | null
swift_code        string | null
amount_usd        number
currency          string
reference_number  string | null — e.g. "WIRE-2025-12"
status            pending | sent | confirmed | failed
sent_at           timestamp | null
confirmed_at      timestamp | null
created_at        timestamp
```

### CropReport
A farm inspection report filed by operations.
```
id                UUID
project_id        UUID → Project
block             string | null
report_date       date
yield_kg          number | null — total kg harvested this report
health_score      number | null — 0 to 10
weather_notes     string | null
pest_notes        string | null
notes             string | null
created_by        UUID → AdminUser | null
created_at        timestamp
```

### Document
A PDF file stored for an investor.
```
id                UUID
investor_id       UUID → Investor
type              certificate | payout_statement | tax_summary | quarterly_report | agreement
title             string
storage_path      string — path in Supabase Storage
url               string — public download URL
file_size_bytes   number | null
generated_at      timestamp
```

### SupportTicket
A message thread between investor and support team.
```
id                UUID
investor_id       UUID → Investor
subject           string
status            open | in_progress | resolved | closed
priority          low | normal | high | urgent
assigned_to       UUID → AdminUser | null
messages          TicketMessage[] — array of messages
created_at        timestamp
updated_at        timestamp
```

### AdminUser
An internal team member with platform access.
```
id                UUID
clerk_id          string
email             string
full_name         string
role              super_admin | admin | finance | operations | support
permissions       string[] — specific permission flags
created_at        timestamp
updated_at        timestamp
```

---

## 11. Tech Stack

| Layer | Technology | Why it was chosen |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Server-side rendering, great SEO for marketing pages, React server components |
| **Styling** | Tailwind CSS v4 | Fast styling, mobile-first, uses `@theme {}` in CSS |
| **UI Components** | shadcn/ui | Accessible, unstyled base components |
| **Animations** | Framer Motion | Scroll animations, section reveals, modal transitions |
| **Smooth Scroll** | Lenis | Buttery-smooth page scrolling |
| **Authentication** | Clerk | Drop-in auth with email + Google login, webhooks |
| **Database** | Supabase (Postgres) | Open-source Firebase alternative, real-time, file storage |
| **Payments** | Stripe | Industry standard, handles PCI compliance |
| **Email** | Resend | Modern transactional email API |
| **Charts** | Recharts | React-based charts for dashboard |
| **Blog** | MDX (local files) | Markdown with React components, no CMS needed |
| **Forms** | React Hook Form + Zod | Type-safe form validation |
| **Deployment** | Vercel | One-click Next.js deployment, preview URLs |
| **Package Manager** | Bun | Fast installs (replacement for npm) |

---

## 12. API Endpoints

### POST `/api/stripe/checkout`

**Purpose:** Creates a Stripe payment session when a user clicks "Proceed to Payment"

**Input (JSON body):**
```json
{ "planId": "seedling" }
```

**What it does:**
1. Validates that `planId` is one of: `seedling`, `grove`, `orchard`
2. Checks that the `STRIPE_SECRET_KEY` environment variable is set
3. Creates a Stripe Checkout Session with:
   - The plan name and description as the product
   - The price in cents
   - Redirect URLs for success and cancel
   - Metadata: `plan_id` and `trees_count`
4. Returns the Stripe-hosted payment URL

**Output:**
```json
{ "url": "https://checkout.stripe.com/..." }
```

**Error responses:**
- `400` — invalid plan ID
- `503` — Stripe not configured (demo mode)

---

### POST `/api/stripe/webhook`

**Purpose:** Stripe calls this after a payment is completed

**What it currently does:** Logs the event to the server console

**What it needs to do (not built yet):**
1. Verify the Stripe webhook signature (security check)
2. Extract investor ID, plan, and tree count from the payment metadata
3. Save a `Purchase` record to Supabase
4. Find available trees of the right quantity and assign them to the investor
5. Generate an ownership certificate PDF and upload to Supabase Storage
6. Send a welcome email via Resend with the certificate attached

---

### POST `/api/newsletter`

**Purpose:** Save an email address from the newsletter signup form

**Input:**
```json
{ "email": "investor@example.com" }
```

**Currently:** Logs the email to console

**Needs:** Save to a `subscribers` table in Supabase

---

### POST `/api/clerk/webhook`

**Purpose:** Runs when a new user creates an account on Avotien

**Currently:** Template with no logic

**Needs:** Create a new row in the Supabase `investors` table, linked to the Clerk user ID

---

## 13. Design System

Avotien has its own custom design tokens (different from any parent design system).

### Colour Palette

| Token | Hex Value | Usage |
|---|---|---|
| `--av-forest` | `#1B3829` | Primary brand colour. Buttons, headings, borders, dark backgrounds |
| `--av-terra` | `#D4735F` | Accent colour. "Most Popular" badge, alerts, urgent actions, CTA variants |
| `--av-gold` | `#D4A84B` | Decoration ONLY. ⚠️ Never use as text on light backgrounds — fails WCAG AA accessibility |
| `--av-cream` | `#F5F1ED` | Page background, card backgrounds |
| `--av-charcoal` | `#2A2A2A` | Primary body text |
| `--av-gray` | `#6B6B6B` | Secondary text, captions, metadata |

### Typography
- Primary font: **IBM Plex Mono** (headings, labels)
- Secondary font: **IBM Plex Sans** (body text, descriptions)
- No other fonts are used

### Spacing and Shape
- Border radius: 0 (sharp corners — Bauhaus aesthetic)
- Borders: 2px solid
- Cards: cream background, forest border

### Accessibility Rules
- All text meets WCAG AA contrast (4.5:1 for normal text, 3:1 for large text)
- Gold (`--av-gold`) **cannot** be used as text on cream/white — use forest green instead
- Every animated element **must** have a `prefers-reduced-motion` fallback
- All images have `alt` attributes

---

## 14. Completion Status

| Feature Area | % Done | Current state | What's missing |
|---|---|---|---|
| Homepage (12 sections) | **95%** | Fully built, animations work | Real farm photos (using Unsplash placeholders) |
| ROI Calculator | **100%** | Fully built | Nothing — works perfectly |
| Blog / Knowledge Hub | **100%** | 11 articles, listing + detail pages | — |
| Farm Explorer | **95%** | 8 plots, map, expand/collapse | Real farm photos per plot |
| Investment Plans section | **100%** | All 3 plans, CTAs work | — |
| FAQ page | **100%** | 13 questions, 4 categories | — |
| Contact page | **80%** | Form built | Calendly embed needs to be wired |
| Checkout flow (UI) | **100%** | Plan selection, Stripe redirect | — |
| **Stripe pricing** | **⚠️ 50%** | Demo prices ($25/$1,250/$12,500) | **Must fix to real prices before launch** |
| Stripe webhook | **20%** | Logs event only | Save purchase, assign trees, generate cert, send email |
| Auth (Clerk) | **30%** | Template ready | Enable env vars, test login flow |
| Investor dashboard (UI) | **90%** | All 6 screens built with mock data | Live Supabase data queries |
| Admin command centre (UI) | **90%** | All sections built with mock data | Live Supabase data queries |
| Admin investor CRM (UI) | **85%** | Table, search, filter, email compose | Real email sending via Resend |
| Supabase integration | **10%** | Schema and types defined | All actual database queries |
| Transactional email (Resend) | **0%** | Not started | Everything |
| PDF certificate generation | **0%** | Not started | Everything |
| Support ticket backend | **0%** | Not started | Everything |
| Admin: all other pages | **5%** | Layout wired, content stubs | All functionality |

---

## 15. What Needs to Be Built Next

Listed in priority order (what blocks everything else comes first):

### Priority 1 — Must do before any real user can use the platform

1. **Fix Stripe pricing mismatch**
   - File: `src/app/api/stripe/checkout/route.ts`
   - Change the amounts from ($25, $1,250, $12,500) to ($975, $4,875, $19,500)
   - All prices are in cents for Stripe: $975 = 97500 cents

2. **Enable Clerk authentication**
   - Add environment variables to `.env.local`
   - Uncomment the middleware in `src/middleware.ts`
   - Test sign-up and sign-in flows

3. **Complete the Stripe webhook**
   - File: `src/app/api/stripe/webhook/route.ts`
   - Add: save purchase to Supabase
   - Add: auto-assign trees from available pool
   - Add: generate certificate PDF
   - Add: send welcome email

4. **Connect dashboard to real Supabase data**
   - Replace all hardcoded mock data with real database queries

### Priority 2 — Core investor experience

5. **Resend transactional emails**
   - Welcome email on purchase (with certificate attached)
   - Payout notification emails
   - KYC request emails

6. **Ownership certificate PDF generation**
   - Generate a PDF with investor name, tree codes, farm location, date
   - Upload to Supabase Storage
   - Link from investor dashboard Documents page

7. **Clerk webhook → create investor in database**
   - File: `src/app/api/clerk/webhook/route.ts`
   - When new user signs up, create a row in Supabase `investors` table

### Priority 3 — Operations and admin tooling

8. **Newsletter Supabase save**
   - File: `src/app/api/newsletter/route.ts`
   - Save email + timestamp to a `subscribers` table

9. **Admin CRM live data**
   - Connect investor list to real Supabase data
   - Wire up email sending in the compose modal

10. **Payout processing workflow**
    - Admin marks a payout as approved
    - System records the bank transfer
    - Sends notification email to investor

### Priority 4 — Nice to have

11. **KYC verification workflow** — investor submits ID, admin reviews
12. **Crop report creation form** — operations team files reports from the admin panel
13. **Calendly embed** — wire up the booking widget on the contact page
14. **Farm photos** — replace Unsplash placeholders with real farm photography

---

## 16. File Structure

```
avotien/
├── src/
│   ├── app/                          ← All pages (Next.js App Router)
│   │   ├── page.tsx                  ← Homepage
│   │   ├── layout.tsx                ← Root layout (navbar, footer, Lenis)
│   │   ├── globals.css               ← Design tokens + global styles
│   │   ├── blog/
│   │   │   ├── page.tsx              ← Blog listing
│   │   │   └── [slug]/page.tsx       ← Individual blog post
│   │   ├── projects/
│   │   │   └── [slug]/page.tsx       ← Farm explorer
│   │   ├── faq/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── checkout/
│   │   │   ├── page.tsx              ← Plan selection
│   │   │   ├── success/page.tsx
│   │   │   └── cancel/page.tsx
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   ├── sign-up/[[...sign-up]]/page.tsx
│   │   ├── dashboard/                ← Investor portal (protected)
│   │   │   ├── page.tsx              ← Overview
│   │   │   ├── trees/page.tsx
│   │   │   ├── payouts/page.tsx
│   │   │   ├── documents/page.tsx
│   │   │   ├── updates/page.tsx
│   │   │   └── support/page.tsx
│   │   ├── admin/                    ← Admin panel (protected)
│   │   │   ├── page.tsx              ← Command centre
│   │   │   ├── investors/page.tsx
│   │   │   ├── investors/[id]/page.tsx
│   │   │   ├── trees/page.tsx
│   │   │   ├── farms/page.tsx
│   │   │   ├── farms/[slug]/page.tsx
│   │   │   ├── finance/page.tsx
│   │   │   ├── communications/page.tsx
│   │   │   ├── documents/page.tsx
│   │   │   ├── support/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── stripe/checkout/route.ts   ← Create payment session
│   │       ├── stripe/webhook/route.ts    ← Handle payment completed
│   │       ├── newsletter/route.ts
│   │       └── clerk/webhook/route.ts
│   │
│   ├── components/
│   │   ├── marketing/                ← All homepage/public page components
│   │   │   ├── hero.tsx              ← Hero banner with animated counters
│   │   │   ├── roi-calculator.tsx    ← Interactive ROI calculator
│   │   │   ├── investment-plans.tsx  ← Three plan cards
│   │   │   ├── supply-chain.tsx      ← 5-step supply chain visual
│   │   │   ├── how-it-works.tsx      ← 3-step explainer
│   │   │   ├── why-avotien.tsx       ← 4 value propositions
│   │   │   ├── impact-stats.tsx      ← Platform metrics
│   │   │   ├── testimonials.tsx      ← 6 investor quotes
│   │   │   ├── team-section.tsx      ← 7 team members
│   │   │   ├── faq-accordion.tsx     ← FAQ accordion
│   │   │   ├── farm-gallery.tsx      ← Photo grid
│   │   │   └── newsletter-form.tsx   ← Email signup
│   │   ├── dashboard/                ← Investor dashboard components
│   │   │   ├── tree-growth.tsx       ← 5-stage growth visual
│   │   │   ├── farm-photos.tsx       ← Photo gallery
│   │   │   ├── portfolio-chart.tsx   ← Portfolio value chart
│   │   │   ├── payout-forecast.tsx   ← Payout forecast chart
│   │   │   └── weather-widget.tsx    ← Farm weather data
│   │   ├── admin/                    ← Admin panel components
│   │   │   ├── revenue-chart.tsx
│   │   │   ├── investor-growth-chart.tsx
│   │   │   └── payout-distribution-chart.tsx
│   │   └── layout/
│   │       ├── navbar.tsx            ← Top navigation
│   │       ├── footer.tsx            ← Site footer
│   │       ├── lenis-provider.tsx    ← Smooth scroll wrapper
│   │       └── chatbot.tsx           ← Crisp chat embed
│   │
│   ├── lib/
│   │   ├── calculator.ts             ← ⭐ ROI CALCULATOR MATH (edit this!)
│   │   ├── constants.ts              ← Plans, pricing, site config
│   │   ├── utils.ts                  ← Utility functions
│   │   └── supabase/
│   │       ├── client.ts             ← Browser-side Supabase client
│   │       └── server.ts             ← Server-side Supabase client
│   │
│   ├── data/
│   │   ├── projects.ts               ← Farm data (2 farms)
│   │   ├── team.ts                   ← Team member data
│   │   ├── testimonials.ts           ← Investor testimonials
│   │   └── faq.ts                    ← FAQ questions and answers
│   │
│   ├── types/
│   │   └── database.ts               ← All TypeScript types for the database
│   │
│   └── middleware.ts                 ← Auth route protection (Clerk)
│
├── package.json                      ← Dependencies and scripts
├── tsconfig.json                     ← TypeScript configuration
├── next.config.ts                    ← Next.js configuration
├── postcss.config.mjs                ← PostCSS (Tailwind)
├── .env.local.example                ← List of required environment variables
├── .gitignore
└── PRD.md                            ← This document
```

---

*This PRD reflects the codebase as of 2026-05-11. The platform is ~70% complete. All frontend pages are production-grade. Remaining work is backend integration: Clerk auth → Supabase data → Stripe webhook completion → Resend email.*
