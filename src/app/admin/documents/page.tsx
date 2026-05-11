import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documents — Avotien Admin',
}

const recentDocs = [
  { title: 'Ownership Certificate — 500 Trees', investor: 'Kwame Asante', type: 'certificate', generated: '2026-03-20', size: '312 KB' },
  { title: 'Payout Statement Q3 2026', investor: 'Fatima Al-Hassan', type: 'payout_statement', generated: '2026-03-15', size: '89 KB' },
  { title: 'Ownership Certificate — 55 Trees', investor: 'Michael Johnson', type: 'certificate', generated: '2026-03-01', size: '245 KB' },
  { title: 'Tax Summary 2025', investor: 'Robert Chen', type: 'tax_summary', generated: '2026-01-15', size: '156 KB' },
  { title: 'Q4 2025 Farm Report', investor: 'All investors', type: 'quarterly_report', generated: '2025-12-30', size: '3.5 MB' },
]

const generators = [
  { label: 'Ownership Certificates', description: 'Generate for new tree assignments', icon: '📜', action: 'Generate' },
  { label: 'Payout Statements', description: 'Generate for a harvest season', icon: '💳', action: 'Generate' },
  { label: 'Tax Summaries', description: 'Annual tax documents for investors', icon: '🧾', action: 'Generate' },
  { label: 'Quarterly Reports', description: 'Farm progress and yield reports', icon: '📊', action: 'Generate' },
]

export default function DocumentsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Documents</h1>
        <p className="text-sm text-gray mt-1">Generate and manage investor documents</p>
      </div>

      {/* Generators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {generators.map((gen) => (
          <div key={gen.label} className="bg-white rounded-xl p-5 shadow-sm">
            <span className="text-3xl block mb-3">{gen.icon}</span>
            <h3 className="text-sm font-semibold text-charcoal">{gen.label}</h3>
            <p className="text-xs text-gray mt-1 mb-4">{gen.description}</p>
            <button className="w-full bg-forest hover:bg-forest-light text-white py-2 rounded-lg text-sm font-medium transition-colors">
              {gen.action}
            </button>
          </div>
        ))}
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-cream-dark">
          <h2 className="font-display text-lg font-bold text-charcoal">Recently Generated</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-dark bg-cream-dark/50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Document</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Investor</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Generated</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray uppercase tracking-wider">Size</th>
              </tr>
            </thead>
            <tbody>
              {recentDocs.map((doc, i) => (
                <tr key={i} className="border-b border-cream-dark last:border-0 hover:bg-cream-dark/30 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-charcoal">{doc.title}</td>
                  <td className="px-5 py-4 text-sm text-gray">{doc.investor}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-forest bg-forest/10 px-2 py-1 rounded-full">{doc.type.replace('_', ' ')}</span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray">{doc.generated}</td>
                  <td className="px-5 py-4 text-xs text-right text-gray">{doc.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
