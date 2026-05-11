import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const PayoutDistributionChart = dynamic(() => import('@/components/admin/payout-distribution-chart').then(m => ({ default: m.PayoutDistributionChart })), {
  loading: () => <div className="h-40 bg-cream-dark rounded-lg animate-pulse" />
})

export const metadata: Metadata = {
  title: 'Finance — Avotien Admin',
}

const stats = [
  { label: 'Total Revenue', value: '$142,350', change: '+$12,500 this month' },
  { label: 'Pending Payouts', value: '$23,400', change: 'Q4 2026 — 89 investors' },
  { label: 'Completed Payouts', value: '$67,200', change: 'Lifetime total' },
  { label: 'Avg Payout/Investor', value: '$47.30', change: 'Per season' },
]

const recentPayouts = [
  { investor: 'Kwame Asante', season: 'Q3 2026', trees: 500, amount: 2750, status: 'approved' },
  { investor: 'Amara Kiggundu', season: 'Q3 2026', trees: 200, amount: 1100, status: 'sent' },
  { investor: 'Fatima Al-Hassan', season: 'Q3 2026', trees: 100, amount: 550, status: 'confirmed' },
  { investor: 'Michael Johnson', season: 'Q3 2026', trees: 55, amount: 302, status: 'calculated' },
  { investor: 'Jennifer Wu', season: 'Q3 2026', trees: 75, amount: 412, status: 'calculated' },
]

const recentTransfers = [
  { ref: 'BT-20260315-001', investor: 'Fatima Al-Hassan', bank: 'Emirates NBD', amount: 550, status: 'confirmed', date: '2026-03-15' },
  { ref: 'BT-20260315-002', investor: 'Amara Kiggundu', bank: 'Barclays UK', amount: 1100, status: 'sent', date: '2026-03-15' },
  { ref: 'BT-20260310-001', investor: 'Michael Johnson', bank: 'Chase', amount: 247, status: 'confirmed', date: '2026-03-10' },
]

function PayoutBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    calculated: 'bg-cream-dark text-gray',
    approved: 'bg-gold/20 text-charcoal',
    sent: 'bg-forest/10 text-forest',
    confirmed: 'bg-forest/20 text-forest',
    reconciled: 'bg-forest/30 text-forest',
  }
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || ''}`}>{status}</span>
}

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Finance</h1>
          <p className="text-sm text-gray mt-1">Revenue, payouts, and bank transfers</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-forest hover:bg-forest-light text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Calculate Payouts
          </button>
          <button className="bg-cream-dark hover:bg-cream text-charcoal px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-charcoal mt-2">{stat.value}</p>
            <p className="text-xs text-forest mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Payout Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-charcoal mb-4">Payout Distribution</h2>
        <PayoutDistributionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payouts */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-charcoal mb-4">Pending Payouts</h2>
          <div className="space-y-3">
            {recentPayouts.map((p, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-cream-dark last:border-0">
                <div>
                  <p className="text-sm font-medium text-charcoal">{p.investor}</p>
                  <p className="text-xs text-gray">{p.season} &middot; {p.trees} trees</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-charcoal">${p.amount}</span>
                  <PayoutBadge status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Transfers */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-charcoal mb-4">Recent Bank Transfers</h2>
          <div className="space-y-3">
            {recentTransfers.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-cream-dark last:border-0">
                <div>
                  <p className="text-sm font-medium text-charcoal">{t.investor}</p>
                  <p className="text-xs text-gray">{t.bank} &middot; Ref: {t.ref}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-charcoal">${t.amount}</span>
                  <PayoutBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
