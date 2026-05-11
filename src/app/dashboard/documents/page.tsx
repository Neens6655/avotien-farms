import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documents — Avotien',
}

const documents = [
  { name: 'Ownership Certificate — 55 Trees', type: 'PDF', date: '2026-03-01', size: '245 KB' },
  { name: 'Investment Agreement 2025', type: 'PDF', date: '2025-03-15', size: '1.2 MB' },
  { name: 'Payout Statement — Dec 2025', type: 'PDF', date: '2025-12-20', size: '89 KB' },
  { name: 'Mukono Farm Report Q4 2025', type: 'PDF', date: '2025-12-30', size: '3.5 MB' },
  { name: 'Tax Summary 2025', type: 'PDF', date: '2026-01-15', size: '156 KB' },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-charcoal">Documents</h1>

      <div className="space-y-3">
        {documents.map((doc, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-terra/10 flex items-center justify-center">
                <span className="text-xs font-bold text-terra">{doc.type}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">{doc.name}</p>
                <p className="text-xs text-gray">{doc.date} &middot; {doc.size}</p>
              </div>
            </div>
            <button className="text-sm font-medium text-forest hover:underline">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
