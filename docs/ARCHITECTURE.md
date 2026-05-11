# Architecture — Avotien

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Server Components) |
| Styling | Tailwind v4 (CSS-first `@theme`) |
| UI | shadcn/ui (headless, accessible) |
| Animations | Framer Motion + Lenis (smooth scroll) |
| Auth | Clerk |
| Database | Supabase (Postgres + Storage) |
| Payments | Stripe (Checkout Sessions) |
| Blog | MDX (local) |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Chat | Crisp (embed) |
| Booking | Calendly (embed) |
| Deploy | Vercel |
| Package Manager | bun |

## File Map

```
avotien/
├── CLAUDE.md
├── .claude/settings.json
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   └── TASKS.md
├── public/
│   ├── images/          # Farm photos, team, icons
│   ├── og-image.jpg
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (fonts, Clerk, Lenis)
│   │   ├── page.tsx             # Homepage (marketing)
│   │   ├── globals.css          # Tailwind + design tokens
│   │   ├── projects/
│   │   │   └── [slug]/page.tsx  # Dynamic project pages
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog listing
│   │   │   └── [slug]/page.tsx  # Blog post
│   │   ├── faq/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx         # Stripe checkout
│   │   ├── dashboard/
│   │   │   ├── layout.tsx       # Clerk-protected layout
│   │   │   ├── page.tsx         # Overview
│   │   │   ├── trees/page.tsx   # Tree portfolio
│   │   │   ├── payouts/page.tsx # Payout history
│   │   │   └── documents/page.tsx
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   ├── sign-up/[[...sign-up]]/page.tsx
│   │   └── api/
│   │       ├── stripe/webhook/route.ts
│   │       └── newsletter/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── mobile-nav.tsx
│   │   ├── marketing/
│   │   │   ├── hero.tsx
│   │   │   ├── why-avotien.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── investment-plans.tsx
│   │   │   ├── roi-calculator.tsx
│   │   │   ├── team-section.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── activity-feed.tsx
│   │   │   ├── faq-accordion.tsx
│   │   │   ├── newsletter-form.tsx
│   │   │   └── trust-bar.tsx
│   │   ├── interactive/
│   │   │   └── investment-quiz.tsx
│   │   ├── dashboard/
│   │   │   ├── overview-cards.tsx
│   │   │   ├── tree-grid.tsx
│   │   │   ├── payout-table.tsx
│   │   │   └── document-list.tsx
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   ├── stripe.ts            # Stripe helpers
│   │   ├── calculator.ts        # ROI calculation logic
│   │   ├── constants.ts         # Plans, pricing, config
│   │   └── utils.ts             # cn() helper
│   ├── content/
│   │   └── blog/                # MDX blog posts
│   │       ├── first-planting.mdx
│   │       ├── why-avocados.mdx
│   │       └── uganda-agriculture.mdx
│   └── data/
│       ├── projects.ts          # Farm/project data
│       ├── team.ts              # Team members
│       ├── testimonials.ts      # Investor testimonials
│       └── faq.ts               # FAQ items
├── next.config.ts
├── tailwind.config.ts           # Minimal — most config in CSS
├── tsconfig.json
├── package.json
├── .env.local.example
└── .gitignore
```

## Data Flow

```
User visits site → Next.js SSR (SEO) → Client hydration (animations)
                                    ↓
User clicks "Invest" → Plan selection → Stripe Checkout Session (API route)
                                                    ↓
Stripe webhook → API route → Supabase (save purchase) → Resend (receipt email)
                                    ↓
User logs in (Clerk) → Dashboard → Supabase query (trees, payouts)
                                    ↓
Newsletter signup → API route → Supabase (email table)
```

## Key Decisions

1. **Server Components by default** — only `"use client"` for interactive components (calculator, quiz, animations)
2. **No barrel imports** — direct imports from component files
3. **Supabase over Prisma** — simpler setup, real-time ready, built-in storage
4. **MDX for blog** — no external CMS dependency, version-controlled
5. **Lenis for smooth scroll** — better than native for parallax experience
6. **Stripe Checkout Sessions** — redirect flow, not embedded (simpler, more trusted)
