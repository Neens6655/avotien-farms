'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Confirmed', value: 42, color: '#1B4332' },
  { name: 'Sent', value: 18, color: '#2D6A4F' },
  { name: 'Approved', value: 12, color: '#D4A84B' },
  { name: 'Calculated', value: 17, color: '#C65D3E' },
]

export function PayoutDistributionChart() {
  return (
    <div className="flex items-center gap-6">
      <ResponsiveContainer width={160} height={160}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFF8F0',
              border: '1px solid #F5EDE0',
              borderRadius: '12px',
              fontSize: '12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-charcoal">{item.name}</span>
            <span className="text-xs font-bold text-charcoal ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
