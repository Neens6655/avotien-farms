'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'

const data = [
  { year: '2025', payout: 247, status: 'received' },
  { year: '2026', payout: 302, status: 'estimated' },
  { year: '2027', payout: 580, status: 'projected' },
  { year: '2028', payout: 946, status: 'projected' },
  { year: '2029', payout: 1716, status: 'projected' },
  { year: '2030', payout: 1716, status: 'projected' },
]

const colors = {
  received: '#1B4332',
  estimated: '#2D6A4F',
  projected: '#2D6A4F40',
}

export function PayoutForecast() {
  const totalProjected = data.reduce((sum, d) => sum + d.payout, 0)

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider">Payout Forecast</h3>
          <p className="text-xs text-gray mt-0.5">Projected earnings over 6 years</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-charcoal">${totalProjected.toLocaleString()}</p>
          <p className="text-[10px] text-gray">Total projected</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5EDE0" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#4B5563' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#4B5563' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFF8F0', border: '1px solid #F5EDE0', borderRadius: '8px', fontSize: '11px' }}
            formatter={((v: any) => `$${Number(v).toLocaleString()}`) as any}
          />
          <Bar dataKey="payout" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.status as keyof typeof colors]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-3 text-[10px] text-gray">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-forest" /> Received</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-forest-light" /> Estimated</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-forest-light/25" /> Projected</span>
      </div>
    </div>
  )
}
