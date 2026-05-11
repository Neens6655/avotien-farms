# PRD — Avotien Admin CRM & Investor Management System

**Version:** 1.0
**Date:** 2026-03-21
**Status:** Approved
**Author:** ZGNAL Studio

---

## 1. Problem Statement

Avotien has a marketing site that converts visitors into leads, but **zero backend infrastructure** to manage investors, track investments, process payouts, monitor crops, or run the business. The team currently has no way to:

- See who signed up or what they bought
- Track which trees belong to which investor
- Record bank transfers or payout distributions
- Monitor crop yields, health, or harvest schedules
- Communicate with investors (updates, reports, alerts)
- Generate compliance reports or investor statements
- Upload farm photos or progress documentation

Without an admin system, Avotien is a brochure — not a business.

---

## 2. Target Users

### Primary: Admin Team (3-5 people)

| Role | Needs |
|------|-------|
| **CEO / Founder** | Overview dashboard: total AUM, investor count, tree count, upcoming payouts, revenue |
| **Operations Manager** | Farm management: planting schedules, irrigation logs, harvest tracking, worker assignments |
| **Investor Relations** | Investor CRM: communication log, support tickets, document delivery, onboarding status |
| **Finance / Accountant** | Payouts: bank transfer records, payout calculations, tax documents, revenue tracking |
| **Agronomist** | Crop monitoring: yield data per block, soil/weather, pest reports, photo evidence |

### Secondary: Investors (via enhanced investor portal)

| Need | Current State | Target State |
|------|--------------|--------------|
| See my trees | Mock grid of emojis | Real tree map with GPS, photos, health status |
| Track payouts | Hardcoded table | Real payout history from DB with bank details |
| Download documents | Non-functional buttons | Real PDF generation (certificates, statements, tax docs) |
| Get updates | Nothing | Push notifications, email updates, farm photo gallery |
| Contact admin | Nothing | Support ticket system, live chat |

---

## 3. Customer Journey (Investor)

```
AWARENESS                    CONSIDERATION                 PURCHASE
Landing page → ROI calc → Plan selection → Sign up (Clerk) → KYC form → Stripe checkout
                                                                            ↓
ONBOARDING                                                          Payment confirmed
Welcome email → Tree assignment → GPS coordinates → Certificate PDF → Dashboard access
                                                                            ↓
OWNERSHIP                                                          Monthly updates
Dashboard → Tree health photos → Quarterly reports → Annual payout → Tax statement
                                                                            ↓
GROWTH                                                              Repeat purchase
Upgrade plan → Buy more trees → Refer friends → Legacy planning → Exit/transfer
```

---

## 4. Admin Journey

```
DAILY
Login → Dashboard (KPIs) → New signups → Pending KYC → Support tickets
                                                                            ↓
WEEKLY
Farm updates → Upload photos → Update crop status → Send investor update
                                                                            ↓
MONTHLY
Revenue report → Expense tracking → Investor growth metrics
                                                                            ↓
QUARTERLY
Generate investor reports → Harvest data → Yield analysis → Payout prep
                                                                            ↓
ANNUALLY
Process payouts → Generate tax docs → Annual report → Audit prep
```

---

## 5. Core Features (v1 — MVP)

### 5.1 Database Schema (Supabase)

**Tables:**

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `investors` | Investor profiles | id, clerk_id, email, name, phone, country, kyc_status, joined_at |
| `trees` | Individual tree records | id, project_id, investor_id, gps_lat, gps_lng, block, row, variety, planted_at, status, health |
| `purchases` | Transaction records | id, investor_id, plan_id, trees_count, amount_usd, stripe_payment_id, status, created_at |
| `payouts` | Payout distributions | id, investor_id, amount_usd, trees_count, harvest_season, bank_ref, status, paid_at |
| `projects` | Farm/plantation data | id, slug, name, location, total_trees, sold_trees, status, created_at |
| `crop_reports` | Yield & health tracking | id, project_id, block, date, yield_kg, health_score, notes, photos |
| `farm_photos` | Photo documentation | id, project_id, crop_report_id, url, caption, taken_at |
| `communications` | Investor comms log | id, investor_id, type (email/sms/notification), subject, body, sent_at, read_at |
| `support_tickets` | Investor support | id, investor_id, subject, status, priority, messages (jsonb), created_at |
| `bank_transfers` | Bank transfer records | id, investor_id, payout_id, bank_name, account_last4, swift, amount, currency, status, ref_number |
| `documents` | Generated documents | id, investor_id, type (certificate/statement/tax), url, generated_at |
| `admin_users` | Admin team access | id, clerk_id, email, name, role, permissions |
| `activity_log` | Audit trail | id, admin_id, action, entity_type, entity_id, details, timestamp |

### 5.2 Admin Dashboard (Protected — `/admin`)

**A1: Overview Dashboard**
- KPI cards: Total AUM, Active Investors, Trees Planted, Trees Available, Pending Payouts, Open Tickets
- Revenue chart (monthly, last 12 months)
- New investors this week/month
- Recent activity log (last 20 actions)
- Quick actions: "Send Update", "Process Payout", "Upload Photos"
- Success: Dashboard loads in <2s with real data from Supabase

**A2: Investor CRM**
- Searchable/filterable investor table: name, email, country, plan, trees owned, total invested, KYC status, last activity
- Investor detail page: profile, purchase history, payout history, tree portfolio, communications log, support tickets, documents
- Inline actions: send email, assign trees, generate certificate, change KYC status, add note
- Bulk actions: send mass update, export CSV, filter by segment
- Success: Table handles 10,000+ investors with pagination, search returns in <500ms

**A3: Tree Management**
- Tree inventory table: tree ID, project, block/row, investor, status (available/assigned/producing/retired), health, planted date
- Bulk assign: select trees → assign to investor → auto-generate certificate
- Tree health update: select tree(s) → update health score, add notes/photos
- Map view: visual grid showing tree blocks, colored by status
- Success: Admin can assign 50 trees to an investor in <30s

**A4: Farm & Crop Management**
- Project overview cards: each farm with tree count, sold/available, latest yield, last photo update
- Crop report form: select project → select block → enter yield (kg), health score (1-10), notes, upload photos
- Harvest log: season-by-season yield data per block
- Photo gallery: all farm photos organized by project → date → block
- Weather integration: display current conditions for farm location (API)
- Success: Crop report with 5 photos uploads in <30s

**A5: Financial Management**
- Payout processor: select harvest season → auto-calculate per-investor payouts based on trees owned × yield × price
- Bank transfer tracker: record bank transfer details (ref number, bank, amount, date, status)
- Payout status board: Kanban-style (Calculated → Approved → Sent → Confirmed → Reconciled)
- Revenue dashboard: income (tree sales), expenses (farming costs), net, per-project
- Export: CSV/PDF for accounting
- Success: Payout calculation for 1,000 investors completes in <5s

**A6: Communications**
- Send email to individual investor or segment (all, by project, by plan, by country)
- Email templates: welcome, quarterly update, payout notification, photo update, custom
- Communication log: all sent emails/notifications per investor
- Scheduled sends: compose now, send later
- Success: Mass email to 1,000 investors queues in <10s

**A7: Document Generator**
- Auto-generate: ownership certificates, payout statements, annual tax summaries, quarterly reports
- PDF templates with Avotien branding
- Bulk generate: all investors for a given period
- Store in Supabase Storage, link to investor profile
- Success: Generate 100 certificates in <60s

**A8: Support Tickets**
- Ticket list: filterable by status (open/in-progress/resolved), priority, investor
- Ticket detail: conversation thread (investor messages + admin replies)
- Auto-create ticket when investor submits contact form
- Assign to admin team member
- Success: Admin can respond to ticket in <2 clicks

### 5.3 Enhanced Investor Portal (Protected — `/dashboard`)

**I1: Real Dashboard**
- Replace mock data with real Supabase queries
- Live stats: trees owned, total invested, next payout estimate, portfolio value
- Activity feed from real `activity_log` / `communications` tables
- Success: Dashboard shows real investor-specific data

**I2: Tree Portfolio**
- Real tree grid from `trees` table
- Each tree shows: ID, GPS coordinates, health status, planted date, latest photo
- Click tree → detail with health history, photos over time
- Success: Investor sees their actual assigned trees with real data

**I3: Payout History**
- Real payout table from `payouts` + `bank_transfers` tables
- Shows: date, amount, trees, bank ref, status
- Download payout statement PDF
- Success: Shows real payout data with downloadable statements

**I4: Documents**
- Real document list from `documents` table
- Download certificates, statements, tax docs as PDF
- Success: All documents downloadable with real content

**I5: Farm Updates**
- Photo gallery: latest farm photos from `farm_photos` table
- Crop reports: simplified view of yield data
- Timeline: chronological updates (photos, reports, milestones)
- Success: Investor sees real farm progress

**I6: Support**
- Submit support ticket from dashboard
- View ticket history and responses
- Success: Investor can create and track support tickets

### 5.4 Backend Integrations

**B1: Clerk Auth (Full Integration)**
- ClerkProvider in root layout
- Middleware for route protection (`/admin/*`, `/dashboard/*`)
- Role-based access: `admin` role for `/admin` routes, `investor` role for `/dashboard`
- Sync Clerk users to `investors` / `admin_users` tables via webhook
- Success: Auth works end-to-end, roles enforce access

**B2: Stripe Payments (Full Integration)**
- Checkout Session creation for each plan
- Webhook handler: `checkout.session.completed` → create purchase record → assign trees → send welcome email
- Success: End-to-end purchase flow works in test mode

**B3: Supabase (Full Integration)**
- Client initialization (server + client components)
- Row-Level Security: investors see only their data, admins see all
- Storage buckets: `farm-photos`, `documents`
- Realtime subscriptions for dashboard updates
- Success: All CRUD operations work with RLS enforced

**B4: Resend Email**
- Transactional emails: welcome, payout notification, farm update, certificate delivery
- Email templates with Avotien branding
- Success: Emails send and render correctly

---

## 6. Non-Goals (NOT v1)

- Mobile native app
- Automated KYC verification (manual review for v1)
- Multi-currency support (USD only)
- Investor-to-investor tree transfers
- Referral/affiliate tracking
- Weather API integration (manual weather notes for v1)
- Video content management
- AI-powered yield forecasting
- Investor chat/messaging (support tickets only)
- Automated payout via bank API (manual bank transfer recording for v1)

---

## 7. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) — same as marketing site |
| Styling | Tailwind v4 — same tokens |
| UI Components | shadcn/ui (data tables, forms, dialogs, tabs, tooltips) |
| Auth | Clerk (roles: admin, investor) |
| Database | Supabase (Postgres + RLS + Storage + Realtime) |
| Payments | Stripe (Checkout Sessions + Webhooks) |
| Email | Resend (transactional) |
| PDF Generation | @react-pdf/renderer (certificates, statements) |
| Charts | Recharts (admin dashboards) |
| File Upload | Supabase Storage + presigned URLs |
| Forms | React Hook Form + Zod |
| Data Tables | @tanstack/react-table (sortable, filterable, paginated) |
| Deploy | Vercel |

---

## 8. Phases

### Phase 1: Database & Auth Foundation
- Supabase project setup + schema migration (all 13 tables)
- Row-Level Security policies
- Clerk integration (ClerkProvider, middleware, webhooks)
- Role-based routing (`/admin` → admin only, `/dashboard` → investors only)
- **Checkpoint:** Auth works, RLS enforced, user syncs to DB

### Phase 2: Admin Dashboard Core
- Admin layout (sidebar, breadcrumbs, role guard)
- Overview dashboard (KPI cards + charts from real data)
- Investor CRM (table + detail page + actions)
- Activity log
- **Checkpoint:** Admin can view real investor data, search, filter

### Phase 3: Tree & Farm Management
- Tree inventory table + bulk assign
- Crop report form + photo upload to Supabase Storage
- Farm photo gallery
- Project management (CRUD)
- **Checkpoint:** Admin can assign trees, upload farm photos, enter crop data

### Phase 4: Financial Management
- Payout calculator (trees × yield × price per investor)
- Bank transfer recording
- Payout status board
- Revenue dashboard + charts
- Export CSV/PDF
- **Checkpoint:** Admin can calculate + record payouts for all investors

### Phase 5: Communications & Documents
- Email composer (individual + bulk)
- Email templates
- Communication log
- PDF certificate generator
- Payout statement generator
- Document storage + delivery
- **Checkpoint:** Admin can send emails and generate PDFs for investors

### Phase 6: Enhanced Investor Portal
- Replace mock dashboard data with real Supabase queries
- Tree portfolio with real data + photos
- Real payout history + downloadable statements
- Farm update timeline
- Support ticket submission
- **Checkpoint:** Investor sees real data, can download docs, submit tickets

### Phase 7: Stripe Integration + Checkout
- Stripe Checkout Session API route
- Webhook handler (payment → purchase → tree assignment → email)
- Success/cancel pages
- **Checkpoint:** End-to-end purchase flow in test mode

### Phase 8: Support & Polish
- Support ticket system (investor creates, admin responds)
- Loading states, error boundaries, empty states across all pages
- SEO + performance audit
- Playwright smoke test at 375px + 1440px
- **Checkpoint:** All features work, no console errors, responsive

---

## 9. Success Criteria

| # | Criteria | Verification |
|---|----------|-------------|
| 1 | Admin dashboard loads in <2s with real data | Lighthouse + manual |
| 2 | CRM table handles 10K+ rows with pagination | Load test with seed data |
| 3 | Tree assignment (50 trees) completes in <30s | Manual timing |
| 4 | Crop report with 5 photos uploads in <30s | Manual timing |
| 5 | Payout calculation for 1K investors in <5s | Console timing |
| 6 | Mass email to 1K investors queues in <10s | Console timing |
| 7 | PDF certificate generates in <3s | Manual timing |
| 8 | Auth blocks unauthorized access to admin/dashboard | Playwright test |
| 9 | Investor dashboard shows real data from Supabase | Manual verification |
| 10 | Stripe test payment creates purchase + assigns trees | End-to-end test |
| 11 | All pages render at 375px and 1440px | Playwright screenshots |
| 12 | No console errors on any page | Playwright console check |
| 13 | RLS prevents investor A from seeing investor B's data | SQL test |
| 14 | Admin activity log records all actions | DB verification |

---

## 10. Open Questions

1. **Supabase project:** Do you have an existing Supabase project, or should we create one?
2. **Stripe account:** Is Stripe already configured, or test mode only?
3. **Clerk:** Do you have Clerk keys, or should we use development mode?
4. **Resend:** Do you have a Resend API key?
5. **Seed data:** Should we generate realistic seed data (100 investors, 5000 trees)?
6. **Domain:** Will admin be at admin.avotien.com or avotien.com/admin?

---

## DO NOT CHANGE

Once approved, the following are locked:
- Database schema (Section 5.1)
- Phase order (Section 8)
- Tech stack (Section 7)
- Core feature list (Section 5)
- Non-goals (Section 6)
