import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Detail — Avotien Admin',
}

const cropReports = [
  { id: '1', date: '2026-03-15', block: 'A', yield: 2300, health: 8, weather: 'Sunny, 28°C', notes: 'Trees looking healthy. New irrigation drip line installed.', photos: 3 },
  { id: '2', date: '2026-02-28', block: 'A', yield: 1800, health: 7, weather: 'Rainy season', notes: 'Heavy rains this week. Some waterlogging in lower sections.', photos: 5 },
  { id: '3', date: '2026-02-15', block: 'B', yield: 1500, health: 9, weather: 'Partly cloudy', notes: 'Block B saplings growing well. First signs of flowering.', photos: 2 },
  { id: '4', date: '2026-01-30', block: 'C', yield: 0, health: 6, weather: 'Dry spell', notes: 'New planting completed. Watering schedule increased.', photos: 4 },
  { id: '5', date: '2026-01-15', block: 'A', yield: 2100, health: 8, weather: 'Normal', notes: 'Routine inspection. Applied organic fertilizer.', photos: 2 },
]

const farmPhotos = [
  { caption: 'Mukono Block A — Mature trees', date: '2026-03-15' },
  { caption: 'New irrigation system', date: '2026-03-15' },
  { caption: 'Block B saplings flowering', date: '2026-02-15' },
  { caption: 'Aerial view of orchard', date: '2026-02-01' },
  { caption: 'Harvested avocados — Grade A', date: '2026-01-20' },
  { caption: 'Workers planting Block C', date: '2026-01-30' },
]

export default function FarmDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/farms" className="text-sm text-forest hover:underline">← Farms</Link>
        <span className="text-gray">/</span>
        <span className="text-sm text-charcoal font-medium">Mukono Hass Orchard</span>
      </div>

      {/* Farm Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-charcoal">Mukono Hass Orchard</h1>
            <p className="text-sm text-gray mt-1">Mukono District, Central Uganda &middot; 1200m altitude &middot; Ferralitic clay loam</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/farms/mukono-hass/report" className="bg-forest hover:bg-forest-light text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors">
              + New Crop Report
            </Link>
            <button className="bg-cream-dark hover:bg-cream text-charcoal px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Upload Photos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-xs text-gray">Total Trees</p>
            <p className="text-2xl font-bold text-charcoal">15,000</p>
          </div>
          <div>
            <p className="text-xs text-gray">Sold</p>
            <p className="text-2xl font-bold text-forest">9,800</p>
          </div>
          <div>
            <p className="text-xs text-gray">Available</p>
            <p className="text-2xl font-bold text-terra">5,200</p>
          </div>
          <div>
            <p className="text-xs text-gray">Avg Health</p>
            <p className="text-2xl font-bold text-charcoal">8.2/10</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop Reports */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-charcoal mb-4">Crop Reports</h2>
          <div className="space-y-4">
            {cropReports.map((report) => (
              <div key={report.id} className="py-4 border-b border-cream-dark last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded-full">Block {report.block}</span>
                    <span className="text-xs text-gray ml-2">{report.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {report.yield > 0 && (
                      <span className="text-xs text-charcoal font-medium">{(report.yield / 1000).toFixed(1)} tons</span>
                    )}
                    <span className="text-xs text-gray">Health: {report.health}/10</span>
                    <span className="text-xs text-gray">{report.photos} photos</span>
                  </div>
                </div>
                <p className="text-sm text-charcoal">{report.notes}</p>
                <p className="text-xs text-gray mt-1">{report.weather}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-charcoal mb-4">Recent Photos</h2>
          <div className="grid grid-cols-2 gap-3">
            {farmPhotos.map((photo, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-square rounded-xl bg-forest/10 flex items-center justify-center group-hover:bg-forest/20 transition-colors">
                  <span className="text-3xl">🌿</span>
                </div>
                <p className="text-xs text-charcoal mt-1.5 line-clamp-1">{photo.caption}</p>
                <p className="text-xs text-gray">{photo.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
