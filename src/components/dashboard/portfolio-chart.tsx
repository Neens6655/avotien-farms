'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
  { month: 'Mar 25', value: 1250, invested: 1250 },
  { month: 'Jun 25', value: 1280, invested: 1250 },
  { month: 'Sep 25', value: 1350, invested: 1250 },
  { month: 'Dec 25', value: 1497, invested: 1250 },
  { month: 'Mar 26', value: 1620, invested: 1375 },
  { month: 'Jun 26', value: 1720, invested: 1375 },
  { month: 'Sep 26', value: 1780, invested: 1375 },
  { month: 'Dec 26', value: 1820, invested: 1375 },
]

export function PortfolioChart() {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <p className="text-2xl font-bold text-charcoal">$1,820</p>
          <p className="text-xs text-forest font-medium">+$445 (+32.4%)</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-forest rounded" /> Value</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-gray/30 rounded" /> Invested</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1B4332" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1B4332" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5EDE0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#4B5563' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: '#4B5563' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(1)}k`} domain={['dataMin - 100', 'dataMax + 100']} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFF8F0', border: '1px solid #F5EDE0', borderRadius: '8px', fontSize: '11px' }}
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            formatter={((value: any) => `$${Number(value).toLocaleString()}`) as any}
          />
          <Area type="monotone" dataKey="invested" stroke="#4B5563" strokeWidth={1} strokeDasharray="4 4" fill="none" />
          <Area type="monotone" dataKey="value" stroke="#1B4332" strokeWidth={2} fill="url(#valueGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
