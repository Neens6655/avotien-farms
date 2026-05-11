import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tree Inventory — Avotien Admin',
}

const trees = [
  { code: 'MKN-0001', project: 'Mukono Hass', block: 'A', investor: 'Michael Johnson', status: 'producing' as const, health: 9, planted: '2025-03-15' },
  { code: 'MKN-0002', project: 'Mukono Hass', block: 'A', investor: 'Michael Johnson', status: 'growing' as const, health: 8, planted: '2025-03-15' },
  { code: 'MKN-0003', project: 'Mukono Hass', block: 'A', investor: 'Fatima Al-Hassan', status: 'producing' as const, health: 9, planted: '2025-03-15' },
  { code: 'MKN-0004', project: 'Mukono Hass', block: 'A', investor: 'Fatima Al-Hassan', status: 'growing' as const, health: 7, planted: '2025-03-15' },
  { code: 'MKN-0005', project: 'Mukono Hass', block: 'B', investor: 'Robert Chen', status: 'growing' as const, health: 8, planted: '2025-03-20' },
  { code: 'MKN-0006', project: 'Mukono Hass', block: 'B', investor: null, status: 'available' as const, health: null, planted: '2025-03-20' },
  { code: 'MKN-0007', project: 'Mukono Hass', block: 'B', investor: null, status: 'available' as const, health: null, planted: '2025-03-20' },
  { code: 'MKN-0008', project: 'Mukono Hass', block: 'B', investor: 'Kwame Asante', status: 'producing' as const, health: 10, planted: '2025-03-20' },
  { code: 'MKN-0009', project: 'Mukono Hass', block: 'C', investor: 'Amara Kiggundu', status: 'growing' as const, health: 6, planted: '2026-02-15' },
  { code: 'MKN-0010', project: 'Mukono Hass', block: 'C', investor: null, status: 'available' as const, health: null, planted: null },
  { code: 'MKN-0011', project: 'Mukono Hass', block: 'C', investor: null, status: 'available' as const, health: null, planted: null },
  { code: 'MKN-0012', project: 'Mukono Hass', block: 'C', investor: 'Jennifer Wu', status: 'assigned' as const, health: null, planted: '2026-02-15' },
]

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    available: 'bg-cream-dark text-gray',
    assigned: 'bg-gold/20 text-charcoal',
    growing: 'bg-forest/10 text-forest',
    producing: 'bg-terra/10 text-terra',
    retired: 'bg-gray/10 text-gray',
  }
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status] || ''}`}>
      {status}
    </span>
  )
}

function HealthBar({ score }: { score: number | null }) {
  if (!score) return <span className="text-xs text-gray">—</span>
  const color = score >= 8 ? 'bg-forest' : score >= 5 ? 'bg-gold' : 'bg-terra'
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-cream-dark rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${score * 10}%` }} />
      </div>
      <span className="text-xs text-charcoal font-medium">{score}/10</span>
    </div>
  )
}

export default function TreesPage() {
  const available = trees.filter(t => t.status === 'available').length
  const assigned = trees.filter(t => t.status !== 'available').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Tree Inventory</h1>
          <p className="text-sm text-gray mt-1">{trees.length} total &middot; {assigned} assigned &middot; {available} available</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-forest hover:bg-forest-light text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Assign Trees
          </button>
          <button className="bg-cream-dark hover:bg-cream text-charcoal px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Update Health
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" placeholder="Search by code or investor..." className="flex-1 px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest" />
        <select className="px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-sm">
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="assigned">Assigned</option>
          <option value="growing">Growing</option>
          <option value="producing">Producing</option>
        </select>
        <select className="px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-sm">
          <option value="">All Blocks</option>
          <option value="A">Block A</option>
          <option value="B">Block B</option>
          <option value="C">Block C</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-dark bg-cream-dark/50">
                <th className="w-8 px-5 py-3.5"><input type="checkbox" className="rounded" /></th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Tree Code</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Project</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Block</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Investor</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Health</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Planted</th>
              </tr>
            </thead>
            <tbody>
              {trees.map((tree) => (
                <tr key={tree.code} className="border-b border-cream-dark last:border-0 hover:bg-cream-dark/30 transition-colors">
                  <td className="px-5 py-3"><input type="checkbox" className="rounded" /></td>
                  <td className="px-5 py-3 text-sm font-mono font-medium text-charcoal">{tree.code}</td>
                  <td className="px-5 py-3 text-sm text-charcoal">{tree.project}</td>
                  <td className="px-5 py-3 text-sm text-charcoal">{tree.block}</td>
                  <td className="px-5 py-3 text-sm text-charcoal">{tree.investor || <span className="text-gray italic">Unassigned</span>}</td>
                  <td className="px-5 py-3"><StatusBadge status={tree.status} /></td>
                  <td className="px-5 py-3"><HealthBar score={tree.health} /></td>
                  <td className="px-5 py-3 text-xs text-gray">{tree.planted || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
