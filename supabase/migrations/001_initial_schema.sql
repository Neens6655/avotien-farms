-- Avotien Admin CRM — Initial Schema
-- Run via Supabase Dashboard > SQL Editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ADMIN USERS
-- ============================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin','admin','finance','operations','support')),
  permissions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_admin_users_clerk_id ON admin_users(clerk_id);

-- ============================================
-- INVESTORS
-- ============================================
CREATE TABLE investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending','submitted','approved','rejected')),
  plan TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_investors_clerk_id ON investors(clerk_id);
CREATE INDEX idx_investors_email ON investors(email);
CREATE INDEX idx_investors_kyc ON investors(kyc_status);

-- ============================================
-- PROJECTS (Farms/Plantations)
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  location TEXT,
  country TEXT DEFAULT 'Uganda',
  coordinates JSONB, -- {lat, lng}
  total_trees INT DEFAULT 0,
  sold_trees INT DEFAULT 0,
  tree_variety TEXT DEFAULT 'Hass',
  altitude TEXT,
  rainfall TEXT,
  soil_type TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('planning','planting','active','harvesting','retired')),
  planting_date DATE,
  first_harvest_date DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_projects_slug ON projects(slug);

-- ============================================
-- TREES
-- ============================================
CREATE TABLE trees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tree_code TEXT UNIQUE NOT NULL, -- e.g., MKN-0001
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  investor_id UUID REFERENCES investors(id) ON DELETE SET NULL,
  gps_lat DECIMAL(10,6),
  gps_lng DECIMAL(10,6),
  block TEXT,
  row_num INT,
  variety TEXT DEFAULT 'Hass',
  status TEXT DEFAULT 'available' CHECK (status IN ('available','assigned','growing','producing','retired')),
  health_score INT CHECK (health_score BETWEEN 1 AND 10),
  planted_at DATE,
  assigned_at TIMESTAMPTZ,
  last_inspected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_trees_project ON trees(project_id);
CREATE INDEX idx_trees_investor ON trees(investor_id);
CREATE INDEX idx_trees_status ON trees(status);
CREATE INDEX idx_trees_code ON trees(tree_code);

-- ============================================
-- PURCHASES
-- ============================================
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  trees_count INT NOT NULL,
  amount_usd DECIMAL(12,2) NOT NULL,
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','completed','failed','refunded')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_purchases_investor ON purchases(investor_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_purchases_stripe ON purchases(stripe_session_id);

-- ============================================
-- PAYOUTS
-- ============================================
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  harvest_season TEXT NOT NULL, -- e.g., '2026-Q4'
  trees_count INT NOT NULL,
  yield_per_tree_kg DECIMAL(8,2),
  price_per_kg_usd DECIMAL(8,2),
  amount_usd DECIMAL(12,2) NOT NULL,
  status TEXT DEFAULT 'calculated' CHECK (status IN ('calculated','approved','sent','confirmed','reconciled')),
  calculated_at TIMESTAMPTZ DEFAULT now(),
  approved_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  notes TEXT
);

CREATE INDEX idx_payouts_investor ON payouts(investor_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_season ON payouts(harvest_season);

-- ============================================
-- BANK TRANSFERS
-- ============================================
CREATE TABLE bank_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payout_id UUID REFERENCES payouts(id) ON DELETE SET NULL,
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  bank_name TEXT,
  account_last4 TEXT,
  swift_code TEXT,
  amount_usd DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  reference_number TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','sent','confirmed','failed')),
  sent_at TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_bank_transfers_investor ON bank_transfers(investor_id);
CREATE INDEX idx_bank_transfers_payout ON bank_transfers(payout_id);

-- ============================================
-- CROP REPORTS
-- ============================================
CREATE TABLE crop_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
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

CREATE INDEX idx_crop_reports_project ON crop_reports(project_id);
CREATE INDEX idx_crop_reports_date ON crop_reports(report_date);

-- ============================================
-- FARM PHOTOS
-- ============================================
CREATE TABLE farm_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  crop_report_id UUID REFERENCES crop_reports(id) ON DELETE SET NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  caption TEXT,
  taken_at DATE,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_farm_photos_project ON farm_photos(project_id);
CREATE INDEX idx_farm_photos_report ON farm_photos(crop_report_id);

-- ============================================
-- COMMUNICATIONS
-- ============================================
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID REFERENCES investors(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('email','sms','notification','system')),
  subject TEXT,
  body TEXT,
  template_id TEXT,
  sent_by UUID REFERENCES admin_users(id),
  sent_at TIMESTAMPTZ DEFAULT now(),
  read_at TIMESTAMPTZ
);

CREATE INDEX idx_communications_investor ON communications(investor_id);
CREATE INDEX idx_communications_type ON communications(type);

-- ============================================
-- SUPPORT TICKETS
-- ============================================
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved','closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent')),
  assigned_to UUID REFERENCES admin_users(id),
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_support_tickets_investor ON support_tickets(investor_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);

-- ============================================
-- DOCUMENTS
-- ============================================
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID NOT NULL REFERENCES investors(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('certificate','payout_statement','tax_summary','quarterly_report','agreement')),
  title TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  file_size_bytes INT,
  generated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_documents_investor ON documents(investor_id);
CREATE INDEX idx_documents_type ON documents(type);

-- ============================================
-- ACTIVITY LOG
-- ============================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_users(id),
  investor_id UUID REFERENCES investors(id),
  action TEXT NOT NULL,
  entity_type TEXT, -- 'investor', 'tree', 'payout', etc.
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_activity_log_admin ON activity_log(admin_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at DESC);

-- ============================================
-- UPDATED_AT TRIGGERS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_investors_updated BEFORE UPDATE ON investors FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_admin_users_updated BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_projects_updated BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_support_tickets_updated BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
-- NOTE: These policies use Supabase auth.jwt(). Since we use Clerk for auth,
-- these will need to be updated once Clerk JWT integration is configured.
-- For now, RLS is enabled but policies are basic placeholders.
-- In production: Clerk JWT custom claims should include clerk_id and role,
-- then policies check (auth.jwt() ->> 'clerk_id') against table rows.

ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE trees ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS, so server-side calls work.
-- These policies are for anon/authenticated direct access.

-- Investors can read their own data
CREATE POLICY investors_self_read ON investors FOR SELECT
  USING (clerk_id = (auth.jwt() ->> 'clerk_id'));

-- Admins can read all investors (check role claim)
CREATE POLICY investors_admin_read ON investors FOR SELECT
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','finance','operations','support'));

-- Admins can modify investors
CREATE POLICY investors_admin_write ON investors FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','finance','operations'));

-- Investors see own trees
CREATE POLICY trees_investor_read ON trees FOR SELECT
  USING (investor_id IN (SELECT id FROM investors WHERE clerk_id = (auth.jwt() ->> 'clerk_id')));

-- Admins see all trees
CREATE POLICY trees_admin_read ON trees FOR SELECT
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','finance','operations','support'));

CREATE POLICY trees_admin_write ON trees FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','operations'));

-- Investors see own purchases
CREATE POLICY purchases_investor_read ON purchases FOR SELECT
  USING (investor_id IN (SELECT id FROM investors WHERE clerk_id = (auth.jwt() ->> 'clerk_id')));

CREATE POLICY purchases_admin_all ON purchases FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','finance'));

-- Investors see own payouts
CREATE POLICY payouts_investor_read ON payouts FOR SELECT
  USING (investor_id IN (SELECT id FROM investors WHERE clerk_id = (auth.jwt() ->> 'clerk_id')));

CREATE POLICY payouts_admin_all ON payouts FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','finance'));

-- Bank transfers — investor read own, admin all
CREATE POLICY bank_transfers_investor_read ON bank_transfers FOR SELECT
  USING (investor_id IN (SELECT id FROM investors WHERE clerk_id = (auth.jwt() ->> 'clerk_id')));

CREATE POLICY bank_transfers_admin_all ON bank_transfers FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','finance'));

-- Documents — investor read own, admin all
CREATE POLICY documents_investor_read ON documents FOR SELECT
  USING (investor_id IN (SELECT id FROM investors WHERE clerk_id = (auth.jwt() ->> 'clerk_id')));

CREATE POLICY documents_admin_all ON documents FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','finance'));

-- Communications — investor read own, admin all
CREATE POLICY communications_investor_read ON communications FOR SELECT
  USING (investor_id IN (SELECT id FROM investors WHERE clerk_id = (auth.jwt() ->> 'clerk_id')));

CREATE POLICY communications_admin_all ON communications FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin'));

-- Support tickets — investor read own, admin all
CREATE POLICY support_tickets_investor_read ON support_tickets FOR SELECT
  USING (investor_id IN (SELECT id FROM investors WHERE clerk_id = (auth.jwt() ->> 'clerk_id')));

CREATE POLICY support_tickets_admin_all ON support_tickets FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','support'));

-- Projects — public read, admin write
CREATE POLICY projects_public_read ON projects FOR SELECT USING (true);

CREATE POLICY projects_admin_write ON projects FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','operations'));

-- Crop reports — public read, admin write
CREATE POLICY crop_reports_public_read ON crop_reports FOR SELECT USING (true);

CREATE POLICY crop_reports_admin_write ON crop_reports FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','operations'));

-- Farm photos — public read, admin write
CREATE POLICY farm_photos_public_read ON farm_photos FOR SELECT USING (true);

CREATE POLICY farm_photos_admin_write ON farm_photos FOR ALL
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin','operations'));

-- Admin users — only super_admin manages, admins read own
CREATE POLICY admin_users_self_read ON admin_users FOR SELECT
  USING (clerk_id = (auth.jwt() ->> 'clerk_id'));

CREATE POLICY admin_users_super_all ON admin_users FOR ALL
  USING ((auth.jwt() ->> 'role') = 'super_admin');

-- Activity log — admins read, system writes
CREATE POLICY activity_log_admin_read ON activity_log FOR SELECT
  USING ((auth.jwt() ->> 'role') IN ('super_admin','admin'));

CREATE POLICY activity_log_insert ON activity_log FOR INSERT
  WITH CHECK (true); -- allow service role inserts
