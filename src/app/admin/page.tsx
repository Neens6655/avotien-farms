import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Command Center — Avotien Admin',
}

const RevenueChart = dynamic(
  () => import('@/components/admin/revenue-chart').then(m => ({ default: m.RevenueChart })),
  { loading: () => <div className="h-72 bg-cream-dark rounded-xl animate-pulse" /> }
)

const InvestorGrowthChart = dynamic(
  () => import('@/components/admin/investor-growth-chart').then(m => ({ default: m.InvestorGrowthChart })),
  { loading: () => <div className="h-72 bg-cream-dark rounded-xl animate-pulse" /> }
)

const kpis = [
  { label: 'Assets Under Management', value: '$142,350', change: '+12.3%', trend: 'up', period: 'vs last month' },
  { label: 'Active Investors', value: '1,420', change: '+34', trend: 'up', period: 'this week' },
  { label: 'Trees Planted', value: '12,847', change: '+200', trend: 'up', period: 'this month' },
  { label: 'Occupancy Rate', value: '65.3%', change: '+2.1%', trend: 'up', period: '9,800 / 15,000' },
  { label: 'Avg Revenue / Tree', value: '$11.07', change: '+$0.82', trend: 'up', period: 'per annum' },
  { label: 'Open Issues', value: '7', change: '-3', trend: 'down', period: '3 high priority' },
]

const funnel = [
  { stage: 'Website Visitors', count: 12400, pct: 100, color: 'bg-forest/10' },
  { stage: 'Signed Up', count: 2840, pct: 23, color: 'bg-forest/20' },
  { stage: 'KYC Approved', count: 1890, pct: 67, color: 'bg-forest/40' },
  { stage: 'First Purchase', count: 1420, pct: 75, color: 'bg-forest/60' },
  { stage: 'Repeat Purchase', count: 380, pct: 27, color: 'bg-forest' },
]

const recentPurchases = [
  { investor: 'Jennifer Wu', plan: 'Grove', trees: 55, amount: 1375, date: '2 hours ago' },
  { investor: 'David Kim', plan: 'Seedling', trees: 10, amount: 250, date: '5 hours ago' },
  { investor: 'Kwame Asante', plan: 'Orchard', trees: 500, amount: 12500, date: 'Yesterday' },
  { investor: 'Priya Sharma', plan: 'Grove', trees: 55, amount: 1375, date: '2 days ago' },
]

const upcomingPayouts = [
  { season: 'Q4 2026', investors: 89, amount: 23400, status: 'calculating', dueDate: 'Dec 2026' },
  { season: 'Q1 2027', investors: 120, amount: 31200, status: 'scheduled', dueDate: 'Mar 2027' },
]

const alerts = [
  { type: 'urgent', message: '3 KYC reviews pending > 7 days', action: 'Review Now', href: '/admin/investors' },
  { type: 'warning', message: 'Block C irrigation sensor offline', action: 'View Farm', href: '/admin/farms' },
  { type: 'info', message: 'Monthly report ready for 1,420 investors', action: 'Send Report', href: '/admin/communications' },
  { type: 'success', message: 'Q3 2026 payouts — 89 confirmed', action: 'View', href: '/admin/finance' },
]

const activity = [
  { time: '09:42', action: 'Jennifer Wu purchased Grove plan', detail: '$1,375 — 55 trees', type: 'purchase' },
  { time: '09:15', action: 'Crop report submitted — Mukono Block A', detail: 'Health 8/10, Yield 2.3 tons', type: 'farm' },
  { time: '08:50', action: 'KYC approved for Carlos Rodriguez', detail: 'Seedling plan — Mexico', type: 'kyc' },
  { time: 'Yesterday', action: 'Bulk email sent: Q3 Harvest Update', detail: '1,420 recipients — 62.8% opened', type: 'email' },
  { time: 'Yesterday', action: 'Payout confirmed — Fatima Al-Hassan', detail: '$550 via Emirates NBD', type: 'finance' },
  { time: '2 days ago', action: '50 trees assigned to Kwame Asante', detail: 'Orchard plan — Block A', type: 'trees' },
  { time: '2 days ago', action: 'Support ticket #1045 resolved', detail: 'KYC verification issue — Carlos Rodriguez', type: 'support' },
  { time: '3 days ago', action: '12 farm photos uploaded — Mukono', detail: 'Irrigation system installation', type: 'photo' },
]

function TrendArrow({ trend }: { trend: string }) {
  return trend === 'up' ? (
    <svg className="w-4 h-4 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
  ) : (
    <svg className="w-4 h-4 text-terra" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
  )
}

function AlertIcon({ type }: { type: string }) {
  const icons: Record<string, { bg: string; icon: string }> = {
    urgent: { bg: 'bg-red-50', icon: '\u{1F534}' },
    warning: { bg: 'bg-yellow-50', icon: '\u{1F7E1}' },
    info: { bg: 'bg-blue-50', icon: '\u{1F535}' },
    success: { bg: 'bg-green-50', icon: '\u{1F7E2}' },
  }
  const style = icons[type] || icons.info
  return <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center text-sm`}>{style.icon}</div>
}

function ActivityIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    purchase: '\u{1F4B3}', farm: '\u{1F33F}', kyc: '\u2705', email: '\u{1F4E7}', finance: '\u{1F4B0}', trees: '\u{1F333}', support: '\u{1F3AB}', photo: '\u{1F4F8}',
  }
  return <span className="text-sm">{icons[type] || '\u{1F4CB}'}</span>
}

export default function AdminDashboard() {
  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening'
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">{greeting}, David</h1>
          <p className="text-sm text-gray mt-0.5">{dateStr}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/communications" className="bg-terra hover:bg-terra-light text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
            Broadcast to Investors
          </Link>
          <Link href="/admin/farms/mukono-hass/report" className="bg-forest hover:bg-forest-light text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            + Crop Report
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm border border-cream-dark/50">
            <p className="text-[10px] font-semibold text-gray uppercase tracking-wider leading-tight">{kpi.label}</p>
            <p className="text-xl font-bold text-charcoal mt-1.5">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendArrow trend={kpi.trend} />
              <span className={`text-xs font-medium ${kpi.trend === 'up' ? 'text-forest' : 'text-terra'}`}>{kpi.change}</span>
              <span className="text-[10px] text-gray ml-auto">{kpi.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Funnel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-charcoal">Revenue & Expenses</h2>
              <p className="text-xs text-gray mt-0.5">Last 12 months — $115,400 net revenue</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-forest" />Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-terra" />Expenses</span>
            </div>
          </div>
          <RevenueChart />
        </div>

        {/* Investor Funnel */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
          <h2 className="text-sm font-bold text-charcoal mb-1">Investor Funnel</h2>
          <p className="text-xs text-gray mb-4">Conversion pipeline — last 30 days</p>
          <div className="space-y-2.5">
            {funnel.map((stage, i) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-charcoal font-medium">{stage.stage}</span>
                  <span className="text-xs font-bold text-charcoal">{stage.count.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-cream-dark rounded-full overflow-hidden">
                  <div className={`h-full ${stage.color} rounded-full transition-all`} style={{ width: `${i === 0 ? 100 : stage.pct}%` }} />
                </div>
                {i > 0 && <p className="text-[10px] text-gray mt-0.5">{stage.pct}% conversion</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3-col: Purchases + Payouts + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Purchases */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-charcoal">Recent Purchases</h2>
            <Link href="/admin/investors" className="text-xs text-forest font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentPurchases.map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-cream-dark/50 last:border-0">
                <div>
                  <p className="text-xs font-medium text-charcoal">{p.investor}</p>
                  <p className="text-[10px] text-gray">{p.plan} · {p.trees} trees · {p.date}</p>
                </div>
                <span className="text-sm font-bold text-charcoal">${p.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Payouts */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-charcoal">Upcoming Payouts</h2>
            <Link href="/admin/finance" className="text-xs text-forest font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingPayouts.map((p, i) => (
              <div key={i} className="bg-cream-dark/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-charcoal">{p.season}</span>
                  <span className="text-sm font-bold text-terra">${p.amount.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray">{p.investors} investors · Due {p.dueDate}</p>
                <div className="mt-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.status === 'calculating' ? 'bg-gold/20 text-charcoal' : 'bg-forest/10 text-forest'}`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
          <h2 className="text-sm font-bold text-charcoal mb-3">Alerts & Actions</h2>
          <div className="space-y-2.5">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-cream-dark/20">
                <AlertIcon type={alert.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-charcoal leading-snug">{alert.message}</p>
                  <Link href={alert.href} className="text-[10px] text-forest font-semibold hover:underline mt-0.5 inline-block">
                    {alert.action} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investor Growth Chart */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-charcoal">Investor Growth</h2>
            <p className="text-xs text-gray mt-0.5">Monthly new registrations — 1,510 total (12 months)</p>
          </div>
        </div>
        <InvestorGrowthChart />
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
        <h2 className="text-sm font-bold text-charcoal mb-3">Activity Timeline</h2>
        <div className="space-y-0">
          {activity.map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-cream-dark/30 last:border-0">
              <div className="w-7 h-7 rounded-lg bg-cream-dark flex items-center justify-center flex-shrink-0 mt-0.5">
                <ActivityIcon type={item.type} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-charcoal">{item.action}</p>
                <p className="text-[10px] text-gray mt-0.5">{item.detail}</p>
              </div>
              <span className="text-[10px] text-gray whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
