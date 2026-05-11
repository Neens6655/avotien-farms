import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Earnings & Payouts — Avotien',
}

const earningsSummary = [
  { label: 'Lifetime Earnings', value: '$445', icon: '\u{1F4B0}' },
  { label: 'Next Payout (Est.)', value: '$302', icon: '\u{1F4C5}' },
  { label: 'Avg per Tree', value: '$5.49', icon: '\u{1F333}' },
  { label: 'Yield per Season', value: '8.1 kg/tree', icon: '\u{1F951}' },
]

const payouts = [
  { season: 'Q4 2025', date: '2025-12-20', trees: 45, yieldKg: 360, pricePerKg: 0.69, amount: 247, bank: 'Chase ****4521', ref: 'BT-20251220-001', status: 'confirmed' as const },
  { season: 'Q4 2024', date: '2024-12-18', trees: 40, yieldKg: 280, pricePerKg: 0.71, amount: 198, bank: 'Chase ****4521', ref: 'BT-20241218-003', status: 'confirmed' as const },
]

const projections = [
  { season: 'Q4 2026', trees: 55, estYield: '445 kg', estAmount: '$302', status: 'scheduled' },
  { season: 'Q4 2027', trees: 55, estYield: '522 kg', estAmount: '$365', status: 'projected' },
  { season: 'Q4 2028', trees: 55, estYield: '605 kg', estAmount: '$435', status: 'projected' },
]

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal">Earnings & Payouts</h1>
        <p className="text-sm text-gray mt-1">Track your harvest earnings and upcoming distributions</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {earningsSummary.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-cream-dark/50">
            <div className="flex items-center gap-2 mb-1">
              <span>{s.icon}</span>
              <p className="text-[10px] font-semibold text-gray uppercase tracking-wider">{s.label}</p>
            </div>
            <p className="text-xl font-bold text-charcoal">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Completed Payouts */}
      <div className="bg-white rounded-xl shadow-sm border border-cream-dark/50 overflow-hidden">
        <div className="px-5 py-4 border-b border-cream-dark/50">
          <h2 className="text-sm font-bold text-charcoal">Completed Payouts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-dark bg-cream-dark/30">
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase">Season</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase">Date</th>
                <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-gray uppercase">Trees</th>
                <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-gray uppercase">Yield</th>
                <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-gray uppercase">Price/kg</th>
                <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-gray uppercase">Amount</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase">Bank</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.ref} className="border-b border-cream-dark/30 last:border-0">
                  <td className="px-4 py-3 text-xs font-bold text-charcoal">{p.season}</td>
                  <td className="px-4 py-3 text-xs text-charcoal">{p.date}</td>
                  <td className="px-4 py-3 text-xs text-right text-charcoal">{p.trees}</td>
                  <td className="px-4 py-3 text-xs text-right text-charcoal">{p.yieldKg} kg</td>
                  <td className="px-4 py-3 text-xs text-right text-charcoal">${p.pricePerKg}</td>
                  <td className="px-4 py-3 text-sm text-right font-bold text-forest">${p.amount}</td>
                  <td className="px-4 py-3 text-[10px] text-gray font-mono">{p.bank}</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-semibold bg-forest/10 text-forest px-2 py-0.5 rounded-full">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Projections */}
      <div className="bg-white rounded-xl shadow-sm border border-cream-dark/50 overflow-hidden">
        <div className="px-5 py-4 border-b border-cream-dark/50">
          <h2 className="text-sm font-bold text-charcoal">Earnings Projections</h2>
          <p className="text-[10px] text-gray mt-0.5">Based on moderate yield scenario \u2014 actual results may vary</p>
        </div>
        <div className="p-5 space-y-3">
          {projections.map((p) => (
            <div key={p.season} className="flex items-center justify-between py-3 border-b border-cream-dark/30 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${p.status === 'scheduled' ? 'bg-terra/10' : 'bg-cream-dark'}`}>
                  {p.status === 'scheduled' ? '\u{1F4C5}' : '\u{1F52E}'}
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal">{p.season}</p>
                  <p className="text-[10px] text-gray">{p.trees} trees \u00B7 {p.estYield} estimated</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-charcoal">{p.estAmount}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.status === 'scheduled' ? 'bg-terra/10 text-terra' : 'bg-cream-dark text-gray'}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
