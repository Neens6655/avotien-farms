# Tasks — Avotien

## Phase 1: Foundation
- [x] Write PRD
- [x] Write Architecture
- [x] Write Design Spec
- [x] Generate CLAUDE.md
- [ ] Scaffold Next.js 15 project with bun
- [ ] Install dependencies (tailwind v4, framer-motion, lenis, clerk, shadcn/ui)
- [ ] Configure Tailwind v4 with design tokens in globals.css
- [ ] Set up root layout (fonts, Clerk provider, Lenis)
- [ ] Build Navbar (sticky, responsive, mobile drawer)
- [ ] Build Footer (4-col, newsletter, socials)
- [ ] Verify: site loads, nav + footer render at 375px + 1440px

## Phase 2: Marketing Sections
- [ ] Hero section (parallax bg, CTAs, trust bar)
- [ ] Why Avotien (4 benefit cards, scroll animations)
- [ ] How It Works (3-step flow)
- [ ] Investment Plans (3 pricing cards)
- [ ] Team section (grid, photos, bios)
- [ ] Testimonials (quotes + activity feed)
- [ ] FAQ accordion (categorized, expandable)
- [ ] Newsletter signup form
- [ ] Verify: full page scrolls, all sections render

## Phase 3: Interactive Features
- [ ] ROI Calculator (sliders, real-time output, scenarios)
- [ ] Investment Quiz (3-4 questions → recommendation)
- [ ] Calendly embed (Book a Call)
- [ ] Crisp chat widget embed
- [ ] Verify: calculator works, quiz completes, email saves

## Phase 4: Project Pages + Blog
- [ ] Project page template (dynamic route)
- [ ] Sample project data (Mukono Hass Orchard)
- [ ] Blog listing page
- [ ] 3 MDX blog posts
- [ ] Verify: project page loads, blog renders

## Phase 5: Auth + Dashboard
- [ ] Clerk sign-in/sign-up pages
- [ ] Protected dashboard layout
- [ ] Dashboard overview (stats cards)
- [ ] Tree portfolio grid
- [ ] Payout history table
- [ ] Documents list
- [ ] Verify: register, login, dashboard with mock data

## Phase 6: Checkout + Payments
- [ ] Stripe checkout API route
- [ ] Plan selection → checkout flow
- [ ] Success/cancel pages
- [ ] Webhook handler (save purchase to Supabase)
- [ ] Verify: test payment completes end-to-end

## Phase 7: Polish + Ship
- [ ] SEO (meta tags, OG image, sitemap)
- [ ] Performance audit
- [ ] Playwright smoke test 375px + 1440px
- [ ] Deploy to Vercel
- [ ] Verify: live URL loads, all sections work
