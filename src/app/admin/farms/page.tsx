import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farms — Avotien Admin',
}

const farms = [
  {
    slug: 'mukono-hass',
    name: 'Mukono Hass Orchard',
    location: 'Mukono District, Central Uganda',
    totalTrees: 15000,
    soldTrees: 9800,
    availableTrees: 5200,
    lastReport: '2026-03-15',
    lastYield: '2.3 tons',
    healthAvg: 8.2,
    status: 'active' as const,
  },
]

export default function FarmsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Farms</h1>
          <p className="text-sm text-gray mt-1">{farms.length} active project{farms.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="bg-forest hover:bg-forest-light text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farms.map((farm) => (
          <Link key={farm.slug} href={`/admin/farms/${farm.slug}`} className="block">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-charcoal">{farm.name}</h3>
                  <p className="text-xs text-gray mt-1">{farm.location}</p>
                </div>
                <span className="text-xs font-semibold text-forest bg-forest/10 px-2.5 py-1 rounded-full">{farm.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray">Total Trees</p>
                  <p className="text-lg font-bold text-charcoal">{farm.totalTrees.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray">Sold</p>
                  <p className="text-lg font-bold text-forest">{farm.soldTrees.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray">Available</p>
                  <p className="text-lg font-bold text-terra">{farm.availableTrees.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-cream-dark rounded-full overflow-hidden mb-4">
                <div className="h-full bg-forest rounded-full" style={{ width: `${(farm.soldTrees / farm.totalTrees) * 100}%` }} />
              </div>

              <div className="flex items-center justify-between text-xs text-gray">
                <span>Last report: {farm.lastReport}</span>
                <span>Avg health: {farm.healthAvg}/10</span>
                <span>Last yield: {farm.lastYield}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
