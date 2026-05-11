import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support Tickets — Avotien Admin',
}

const tickets = [
  { id: '1042', subject: 'Certificate download not working', investor: 'Robert Chen', status: 'resolved' as const, priority: 'high' as const, created: '2026-03-18', messages: 4 },
  { id: '1043', subject: 'When is my next payout?', investor: 'Sarah Okafor', status: 'open' as const, priority: 'normal' as const, created: '2026-03-19', messages: 1 },
  { id: '1044', subject: 'Can I visit the farm?', investor: 'Michael Johnson', status: 'in_progress' as const, priority: 'low' as const, created: '2026-03-20', messages: 3 },
  { id: '1045', subject: 'KYC verification pending for 2 weeks', investor: 'Carlos Rodriguez', status: 'open' as const, priority: 'high' as const, created: '2026-03-20', messages: 2 },
  { id: '1046', subject: 'Update bank details for payouts', investor: 'Fatima Al-Hassan', status: 'open' as const, priority: 'normal' as const, created: '2026-03-21', messages: 1 },
]

function PriorityDot({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    low: 'bg-gray',
    normal: 'bg-forest',
    high: 'bg-terra',
    urgent: 'bg-red-500',
  }
  return <span className={`w-2 h-2 rounded-full ${colors[priority] || 'bg-gray'}`} />
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    open: 'bg-terra/10 text-terra',
    in_progress: 'bg-gold/20 text-charcoal',
    resolved: 'bg-forest/10 text-forest',
    closed: 'bg-cream-dark text-gray',
  }
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || ''}`}>{status.replace('_', ' ')}</span>
}

export default function SupportPage() {
  const open = tickets.filter(t => t.status === 'open').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Support Tickets</h1>
          <p className="text-sm text-gray mt-1">{tickets.length} total &middot; {open} open</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-dark bg-cream-dark/50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Ticket</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Investor</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Priority</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Messages</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Created</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-cream-dark last:border-0 hover:bg-cream-dark/30 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-charcoal">#{t.id}</p>
                    <p className="text-xs text-gray mt-0.5">{t.subject}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-charcoal">{t.investor}</td>
                  <td className="px-5 py-4"><div className="flex items-center gap-2"><PriorityDot priority={t.priority} /><span className="text-xs text-charcoal capitalize">{t.priority}</span></div></td>
                  <td className="px-5 py-4"><StatusBadge status={t.status} /></td>
                  <td className="px-5 py-4 text-sm text-right text-charcoal">{t.messages}</td>
                  <td className="px-5 py-4 text-xs text-gray">{t.created}</td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/admin/support/${t.id}`} className="text-xs font-medium text-forest hover:underline">View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
