# Architecture — Avotien Admin CRM & Investor Management

## Stack Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Admin routes | `/admin/*` (same Next.js app) | Share auth, tokens, components — no separate deploy |
| Auth roles | Clerk organizations + metadata | `publicMetadata.role = "admin" | "investor"` |
| Data tables | @tanstack/react-table v8 | Sorting, filtering, pagination, type-safe, headless |
| Charts | Recharts | Lightweight, React-native, composable |
| PDF generation | @react-pdf/renderer | Server-side PDF with React components |
| File upload | Supabase Storage + presigned URLs | Direct upload from browser, no API bottleneck |
| Email | Resend + react-email templates | JSX email templates, 100/day free tier |
| Middleware | Next.js middleware.ts + Clerk | Route protection before page loads |
| RLS | Supabase Row-Level Security | DB-level multi-tenancy, not app-level |

## File Map (New Files Only)

```
avotien/src/
├── middleware.ts                           # NEW — Clerk + role-based route protection
├── app/
│   ├── layout.tsx                          # MODIFIED — add ClerkProvider
│   ├── admin/
│   │   ├── layout.tsx                      # Admin shell (sidebar, breadcrumbs, role guard)
│   │   ├── page.tsx                        # Overview dashboard (KPIs, charts, activity)
│   │   ├── investors/
│   │   │   ├── page.tsx                    # CRM table (search, filter, paginate)
│   │   │   └── [id]/page.tsx              # Investor detail (profile, trees, payouts, comms)
│   │   ├── trees/
│   │   │   ├── page.tsx                    # Tree inventory table
│   │   │   └── assign/page.tsx            # Bulk tree assignment wizard
│   │   ├── farms/
│   │   │   ├── page.tsx                    # Project overview cards
│   │   │   ├── [slug]/page.tsx            # Farm detail + crop reports
│   │   │   └── [slug]/report/page.tsx     # New crop report form
│   │   ├── finance/
│   │   │   ├── page.tsx                    # Revenue dashboard + charts
│   │   │   ├── payouts/page.tsx           # Payout calculator + status board
│   │   │   └── transfers/page.tsx         # Bank transfer records
│   │   ├── communications/
│   │   │   ├── page.tsx                    # Email composer + log
│   │   │   └── templates/page.tsx         # Email template manager
│   │   ├── documents/page.tsx             # Bulk document generator
│   │   ├── support/
│   │   │   ├── page.tsx                    # Ticket list
│   │   │   └── [id]/page.tsx              # Ticket detail + reply
│   │   └── settings/page.tsx              # Admin settings, team management
│   ├── dashboard/                          # MODIFIED — replace mock data with Supabase
│   │   ├── layout.tsx                      # MODIFIED — add auth guard
│   │   ├── page.tsx                        # MODIFIED — real data queries
│   │   ├── trees/page.tsx                  # MODIFIED — real tree data
│   │   ├── payouts/page.tsx                # MODIFIED — real payout data
│   │   ├── documents/page.tsx              # MODIFIED — real downloadable docs
│   │   ├── updates/page.tsx                # NEW — farm photos/updates timeline
│   │   └── support/page.tsx                # NEW — submit/view support tickets
│   ├── api/
│   │   ├── newsletter/route.ts             # MODIFIED — save to Supabase
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts           # NEW — create Checkout Session
│   │   │   └── webhook/route.ts            # NEW — handle Stripe events
│   │   ├── clerk/webhook/route.ts          # NEW — sync Clerk users to DB
│   │   ├── admin/
│   │   │   ├── payouts/calculate/route.ts  # NEW — bulk payout calculation
│   │   │   ├── trees/assign/route.ts       # NEW — bulk tree assignment
│   │   │   ├── documents/generate/route.ts # NEW — PDF generation
│   │   │   └── email/send/route.ts         # NEW — send email via Resend
│   │   └── upload/presign/route.ts         # NEW — get presigned upload URL
│   ├── checkout/
│   │   ├── page.tsx                        # NEW — plan selection + Stripe redirect
│   │   ├── success/page.tsx                # NEW — payment confirmation
│   │   └── cancel/page.tsx                 # NEW — payment cancelled
├── components/
│   ├── admin/
│   │   ├── admin-sidebar.tsx               # Admin navigation sidebar
│   │   ├── kpi-cards.tsx                   # KPI stat cards (reusable)
│   │   ├── revenue-chart.tsx               # Monthly revenue Recharts
│   │   ├── activity-feed.tsx               # Recent admin actions
│   │   ├── investor-table.tsx              # CRM data table
│   │   ├── investor-detail.tsx             # Investor profile card
│   │   ├── tree-table.tsx                  # Tree inventory data table
│   │   ├── tree-assign-wizard.tsx          # Multi-step tree assignment
│   │   ├── crop-report-form.tsx            # Crop report + photo upload
│   │   ├── photo-gallery.tsx               # Farm photo grid
│   │   ├── payout-calculator.tsx           # Payout computation UI
│   │   ├── payout-board.tsx                # Kanban status board
│   │   ├── bank-transfer-form.tsx          # Record bank transfer
│   │   ├── email-composer.tsx              # Rich email editor
│   │   ├── document-generator.tsx          # PDF generation UI
│   │   ├── ticket-list.tsx                 # Support ticket table
│   │   └── ticket-thread.tsx               # Ticket conversation
│   ├── dashboard/                          # MODIFIED — real data components
│   │   ├── overview-cards.tsx              # MODIFIED — Supabase queries
│   │   ├── tree-grid.tsx                   # MODIFIED — real tree data
│   │   ├── payout-table.tsx                # MODIFIED — real payout data
│   │   ├── document-list.tsx               # MODIFIED — downloadable docs
│   │   ├── farm-timeline.tsx               # NEW — photo/update timeline
│   │   └── support-form.tsx                # NEW — submit ticket
│   └── ui/                                 # shadcn/ui components
│       ├── data-table.tsx                  # NEW — generic data table wrapper
│       ├── file-upload.tsx                 # NEW — drag-drop file upload
│       ├── date-picker.tsx                 # NEW — date selection
│       ├── badge.tsx                       # NEW — status badges
│       ├── tabs.tsx                        # NEW — tab navigation
│       ├── dialog.tsx                      # NEW — modal dialogs
│       ├── dropdown-menu.tsx               # NEW — action menus
│       ├── toast.tsx                       # NEW — notifications
│       ├── skeleton.tsx                    # NEW — loading skeletons
│       └── empty-state.tsx                 # NEW — empty data states
├── lib/
│   ├── supabase/
│   │   ├── client.ts                       # NEW — browser Supabase client
│   │   ├── server.ts                       # NEW — server Supabase client (with cookies)
│   │   ├── admin.ts                        # NEW — service role client (admin operations)
│   │   └── types.ts                        # NEW — generated DB types
│   ├── stripe.ts                           # NEW — Stripe helpers
│   ├── resend.ts                           # NEW — Resend email client
│   ├── pdf/
│   │   ├── certificate.tsx                 # NEW — ownership certificate template
│   │   ├── payout-statement.tsx            # NEW — payout statement template
│   │   └── tax-summary.tsx                 # NEW — annual tax summary template
│   └── utils/
│       ├── payout-calc.ts                  # NEW — payout calculation logic
│       └── seed.ts                         # NEW — seed data generator
├── types/
│   ├── database.ts                         # NEW — Supabase table types
│   ├── admin.ts                            # NEW — admin-specific types
│   └── investor.ts                         # NEW — investor-specific types
└── supabase/
    ├── migrations/
    │   └── 001_initial_schema.sql          # NEW — all 13 tables + RLS policies
    └── seed.sql                            # NEW — sample data for development
```

## Database Schema

```sql
-- Core tables (simplified — full migration in supabase/migrations/)

CREATE TABLE investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending','submitted','approved','rejected')),
  plan TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  location TEXT,
  total_trees INT DEFAULT 0,
  sold_trees INT DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE trees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tree_code TEXT UNIQUE NOT NULL, -- e.g., MKN-0001
  project_id UUID REFERENCES projects(id),
  investor_id UUID REFERENCES investors(id),
  gps_lat DECIMAL(10,6),
  gps_lng DECIMAL(10,6),
  block TEXT,
  row_num INT,
  variety TEXT DEFAULT 'Hass',
  status TEXT DEFAULT 'available' CHECK (status IN ('available','assigned','growing','producing','retired')),
  health_score INT CHECK (health_score BETWEEN 1 AND 10),
  planted_at DATE,
  assigned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES investors(id) NOT NULL,
  plan_id TEXT NOT NULL,
  trees_count INT NOT NULL,
  amount_usd DECIMAL(12,2) NOT NULL,
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','completed','failed','refunded')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES investors(id) NOT NULL,
  harvest_season TEXT NOT NULL, -- e.g., '2026-Q4'
  trees_count INT NOT NULL,
  yield_per_tree_kg DECIMAL(8,2),
  price_per_kg_usd DECIMAL(8,2),
  amount_usd DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'calculated' CHECK (status IN ('calculated','approved','sent','confirmed','reconciled')),
  calculated_at TIMESTAMPTZ DEFAULT now(),
  paid_at TIMESTAMPTZ
);

CREATE TABLE bank_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payout_id UUID REFERENCES payouts(id),
  investor_id UUID REFERENCES investors(id) NOT NULL,
  bank_name TEXT,
  account_last4 TEXT,
  swift_code TEXT,
  amount_usd DECIMAL(12,2) NOT NULL,
  reference_number TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','sent','confirmed','failed')),
  sent_at TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ
);

CREATE TABLE crop_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) NOT NULL,
  block TEXT,
  report_date DATE NOT NULL,
  yield_kg DECIMAL(10,2),
  health_score INT CHECK (health_score BETWEEN 1 AND 10),
  weather_notes TEXT,
  pest_notes TEXT,
  notes TEXT,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE farm_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) NOT NULL,
  crop_report_id UUID REFERENCES crop_reports(id),
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  caption TEXT,
  taken_at DATE,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES investors(id),
  type TEXT CHECK (type IN ('email','sms','notification','system')),
  subject TEXT,
  body TEXT,
  template_id TEXT,
  sent_by UUID REFERENCES admin_users(id),
  sent_at TIMESTAMPTZ DEFAULT now(),
  read_at TIMESTAMPTZ
);

CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES investors(id) NOT NULL,
  subject TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved','closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent')),
  assigned_to UUID REFERENCES admin_users(id),
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES investors(id) NOT NULL,
  type TEXT CHECK (type IN ('certificate','payout_statement','tax_summary','quarterly_report','agreement')),
  title TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('super_admin','admin','finance','operations','support')),
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## RLS Policies (Key Rules)

```sql
-- Investors can only see their own data
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
CREATE POLICY investors_own ON investors FOR SELECT USING (clerk_id = auth.jwt()->>'sub');

-- Trees: investors see their trees, admins see all
ALTER TABLE trees ENABLE ROW LEVEL SECURITY;
CREATE POLICY trees_own ON trees FOR SELECT USING (
  investor_id IN (SELECT id FROM investors WHERE clerk_id = auth.jwt()->>'sub')
  OR auth.jwt()->>'role' = 'admin'
);

-- Admin-only tables
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY admin_only ON activity_log FOR ALL USING (auth.jwt()->>'role' = 'admin');
```

## Data Flow

```
PURCHASE FLOW:
Investor → Select Plan → Stripe Checkout Session (API) → Stripe Payment
  → Webhook → Create Purchase → Auto-Assign Trees → Generate Certificate → Send Welcome Email
  → Investor Dashboard shows real trees

PAYOUT FLOW:
Admin → Select Season → Calculate Payouts (trees × yield × price) → Review → Approve
  → Record Bank Transfers → Mark as Sent → Investor confirms → Reconciled
  → Investor sees payout in dashboard, downloads statement

CROP REPORTING:
Admin → Select Farm → Enter Yield + Health → Upload Photos → Save to Supabase
  → Photos visible in investor portal → Crop data feeds payout calculator

COMMUNICATION:
Admin → Select Template → Choose Recipients → Compose → Send via Resend
  → Logged in communications table → Investor sees in dashboard activity feed
```

## Key Architectural Decisions

1. **Same app, not microservice** — Admin is `/admin/*` routes in the existing Next.js app. Shares auth, tokens, deploy pipeline. No extra infrastructure.

2. **Server Components for data pages** — Admin tables and dashboards are Server Components that query Supabase directly. Only interactive elements (forms, modals, data table controls) are Client Components.

3. **Supabase RLS over app-level auth** — Multi-tenancy enforced at database level. Even if app code has a bug, investors can't see each other's data.

4. **Presigned uploads** — Photos upload directly from browser to Supabase Storage via presigned URLs. No file goes through the Next.js API (avoids Lambda size limits).

5. **PDF generation on server** — `@react-pdf/renderer` runs in API routes (Node.js), not in browser. Generated PDFs stored in Supabase Storage.

6. **Seed data for development** — Generate 100 investors, 5000 trees, 50 crop reports, 200 payouts for realistic development experience.
