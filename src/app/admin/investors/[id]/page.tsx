import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investor Detail — Avotien Admin',
}

export default function InvestorDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/investors" className="text-sm text-forest hover:underline">← Investors</Link>
        <span className="text-gray">/</span>
        <span className="text-sm text-charcoal font-medium">Michael Johnson</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center">
              <span className="text-xl font-display font-bold text-forest">MJ</span>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-charcoal">Michael Johnson</h2>
              <p className="text-sm text-gray">michael@example.com</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray">Country</span>
              <span className="text-charcoal font-medium">United States</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Plan</span>
              <span className="text-xs font-medium text-forest bg-forest/10 px-2 py-1 rounded-full">Grove</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">KYC Status</span>
              <span className="text-xs font-semibold text-forest bg-forest/10 px-2 py-1 rounded-full">approved</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Joined</span>
              <span className="text-charcoal">2025-03-15</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Phone</span>
              <span className="text-charcoal">+1 555-0123</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <button className="w-full bg-forest hover:bg-forest-light text-white py-2 rounded-lg text-sm font-medium transition-colors">Send Email</button>
            <button className="w-full bg-cream-dark hover:bg-cream text-charcoal py-2 rounded-lg text-sm font-medium transition-colors">Generate Certificate</button>
            <button className="w-full bg-cream-dark hover:bg-cream text-charcoal py-2 rounded-lg text-sm font-medium transition-colors">Change KYC Status</button>
          </div>
        </div>

        {/* Stats + Portfolio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Trees Owned', value: '55' },
              { label: 'Total Invested', value: '$1,375' },
              { label: 'Total Payouts', value: '$445' },
              { label: 'Portfolio Value', value: '$1,650' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-charcoal mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Purchase History */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-charcoal mb-4">Purchase History</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="text-left pb-3 text-xs font-semibold text-gray uppercase">Date</th>
                  <th className="text-left pb-3 text-xs font-semibold text-gray uppercase">Plan</th>
                  <th className="text-right pb-3 text-xs font-semibold text-gray uppercase">Trees</th>
                  <th className="text-right pb-3 text-xs font-semibold text-gray uppercase">Amount</th>
                  <th className="text-left pb-3 text-xs font-semibold text-gray uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2025-03-15', plan: 'Grove', trees: 50, amount: 1250, status: 'completed' },
                  { date: '2026-03-01', plan: 'Seedling', trees: 5, amount: 125, status: 'completed' },
                ].map((p, i) => (
                  <tr key={i} className="border-b border-cream-dark last:border-0">
                    <td className="py-3 text-sm text-charcoal">{p.date}</td>
                    <td className="py-3 text-sm text-charcoal">{p.plan}</td>
                    <td className="py-3 text-sm text-right text-charcoal">{p.trees}</td>
                    <td className="py-3 text-sm text-right font-semibold text-charcoal">${p.amount.toLocaleString()}</td>
                    <td className="py-3"><span className="text-xs font-semibold text-forest bg-forest/10 px-2 py-1 rounded-full">{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payout History */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-display text-lg font-bold text-charcoal mb-4">Payout History</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="text-left pb-3 text-xs font-semibold text-gray uppercase">Season</th>
                  <th className="text-right pb-3 text-xs font-semibold text-gray uppercase">Trees</th>
                  <th className="text-right pb-3 text-xs font-semibold text-gray uppercase">Amount</th>
                  <th className="text-left pb-3 text-xs font-semibold text-gray uppercase">Bank Ref</th>
                  <th className="text-left pb-3 text-xs font-semibold text-gray uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { season: 'Q4 2025', trees: 45, amount: 247, ref: 'BT-20251220-001', status: 'confirmed' },
                  { season: 'Q4 2024', trees: 40, amount: 198, ref: 'BT-20241218-003', status: 'confirmed' },
                ].map((p, i) => (
                  <tr key={i} className="border-b border-cream-dark last:border-0">
                    <td className="py-3 text-sm text-charcoal">{p.season}</td>
                    <td className="py-3 text-sm text-right text-charcoal">{p.trees}</td>
                    <td className="py-3 text-sm text-right font-semibold text-charcoal">${p.amount}</td>
                    <td className="py-3 text-xs text-gray font-mono">{p.ref}</td>
                    <td className="py-3"><span className="text-xs font-semibold text-forest bg-forest/10 px-2 py-1 rounded-full">{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
