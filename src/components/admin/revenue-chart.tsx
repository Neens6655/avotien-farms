'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Apr', revenue: 4200, expenses: 1800 },
  { month: 'May', revenue: 6800, expenses: 2100 },
  { month: 'Jun', revenue: 5400, expenses: 1900 },
  { month: 'Jul', revenue: 8200, expenses: 2400 },
  { month: 'Aug', revenue: 7100, expenses: 2200 },
  { month: 'Sep', revenue: 9500, expenses: 2600 },
  { month: 'Oct', revenue: 11200, expenses: 2800 },
  { month: 'Nov', revenue: 8900, expenses: 2500 },
  { month: 'Dec', revenue: 14500, expenses: 3200 },
  { month: 'Jan', revenue: 12300, expenses: 2900 },
  { month: 'Feb', revenue: 10800, expenses: 2700 },
  { month: 'Mar', revenue: 16500, expenses: 3400 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1B4332" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#1B4332" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C65D3E" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#C65D3E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F5EDE0" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFF8F0',
            border: '1px solid #F5EDE0',
            borderRadius: '12px',
            fontSize: '12px',
          }}
          formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Expenses']}
        />
        <Area type="monotone" dataKey="revenue" stroke="#1B4332" strokeWidth={2} fill="url(#colorRevenue)" />
        <Area type="monotone" dataKey="expenses" stroke="#C65D3E" strokeWidth={2} fill="url(#colorExpenses)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
