export type KycStatus = 'pending' | 'submitted' | 'approved' | 'rejected'
export type TreeStatus = 'available' | 'assigned' | 'growing' | 'producing' | 'retired'
export type PurchaseStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type PayoutStatus = 'calculated' | 'approved' | 'sent' | 'confirmed' | 'reconciled'
export type TransferStatus = 'pending' | 'sent' | 'confirmed' | 'failed'
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent'
export type DocumentType = 'certificate' | 'payout_statement' | 'tax_summary' | 'quarterly_report' | 'agreement'
export type AdminRole = 'super_admin' | 'admin' | 'finance' | 'operations' | 'support'
export type ProjectStatus = 'planning' | 'planting' | 'active' | 'harvesting' | 'retired'
export type CommType = 'email' | 'sms' | 'notification' | 'system'

export interface Investor {
  id: string
  clerk_id: string
  email: string
  full_name: string
  phone: string | null
  country: string | null
  kyc_status: KycStatus
  plan: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  slug: string
  name: string
  location: string | null
  country: string
  coordinates: { lat: number; lng: number } | null
  total_trees: number
  sold_trees: number
  tree_variety: string
  altitude: string | null
  rainfall: string | null
  soil_type: string | null
  status: ProjectStatus
  planting_date: string | null
  first_harvest_date: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface Tree {
  id: string
  tree_code: string
  project_id: string
  investor_id: string | null
  gps_lat: number | null
  gps_lng: number | null
  block: string | null
  row_num: number | null
  variety: string
  status: TreeStatus
  health_score: number | null
  planted_at: string | null
  assigned_at: string | null
  last_inspected_at: string | null
  created_at: string
}

export interface Purchase {
  id: string
  investor_id: string
  plan_id: string
  trees_count: number
  amount_usd: number
  stripe_session_id: string | null
  stripe_payment_intent: string | null
  status: PurchaseStatus
  metadata: Record<string, unknown>
  created_at: string
}

export interface Payout {
  id: string
  investor_id: string
  harvest_season: string
  trees_count: number
  yield_per_tree_kg: number | null
  price_per_kg_usd: number | null
  amount_usd: number
  status: PayoutStatus
  calculated_at: string
  approved_at: string | null
  paid_at: string | null
  notes: string | null
}

export interface BankTransfer {
  id: string
  payout_id: string | null
  investor_id: string
  bank_name: string | null
  account_last4: string | null
  swift_code: string | null
  amount_usd: number
  currency: string
  reference_number: string | null
  status: TransferStatus
  sent_at: string | null
  confirmed_at: string | null
  created_at: string
}

export interface CropReport {
  id: string
  project_id: string
  block: string | null
  report_date: string
  yield_kg: number | null
  health_score: number | null
  weather_notes: string | null
  pest_notes: string | null
  notes: string | null
  created_by: string | null
  created_at: string
}

export interface FarmPhoto {
  id: string
  project_id: string
  crop_report_id: string | null
  storage_path: string
  url: string
  caption: string | null
  taken_at: string | null
  uploaded_at: string
}

export interface Communication {
  id: string
  investor_id: string | null
  type: CommType
  subject: string | null
  body: string | null
  template_id: string | null
  sent_by: string | null
  sent_at: string
  read_at: string | null
}

export interface SupportTicket {
  id: string
  investor_id: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  assigned_to: string | null
  messages: TicketMessage[]
  created_at: string
  updated_at: string
}

export interface TicketMessage {
  id: string
  sender: 'investor' | 'admin'
  sender_name: string
  body: string
  timestamp: string
}

export interface Document {
  id: string
  investor_id: string
  type: DocumentType
  title: string
  storage_path: string
  url: string
  file_size_bytes: number | null
  generated_at: string
}

export interface AdminUser {
  id: string
  clerk_id: string
  email: string
  full_name: string
  role: AdminRole
  permissions: string[]
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  admin_id: string | null
  investor_id: string | null
  action: string
  entity_type: string | null
  entity_id: string | null
  details: Record<string, unknown> | null
  created_at: string
}
