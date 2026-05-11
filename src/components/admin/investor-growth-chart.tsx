'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Apr', investors: 45 },
  { month: 'May', investors: 62 },
  { month: 'Jun', investors: 78 },
  { month: 'Jul', investors: 95 },
  { month: 'Aug', investors: 112 },
  { month: 'Sep', investors: 134 },
  { month: 'Oct', investors: 156 },
  { month: 'Nov', investors: 145 },
  { month: 'Dec', investors: 178 },
  { month: 'Jan', investors: 165 },
  { month: 'Feb', investors: 142 },
  { month: 'Mar', investors: 198 },
]

export function InvestorGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F5EDE0" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFF8F0',
            border: '1px solid #F5EDE0',
            borderRadius: '12px',
            fontSize: '12px',
          }}
          formatter={(value) => [`${value} investors`, 'New Signups']}
        />
        <Bar dataKey="investors" fill="#2D6A4F" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
