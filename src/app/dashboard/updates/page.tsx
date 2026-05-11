import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farm Gallery — Avotien',
}

const galleryMonths = [
  {
    month: 'March 2026',
    summary: 'Irrigation complete, Block A trees at full canopy.',
    photos: [
      { caption: 'Aerial view of Block A \u2014 5,000 mature Hass trees', category: 'aerial' },
      { caption: 'New drip irrigation system operational', category: 'infrastructure' },
      { caption: 'Flowering trees \u2014 fruit expected in 6 months', category: 'growth' },
    ],
    yieldReport: { health: 8.2, yield: '2.3 tons', trees: 9800 },
  },
  {
    month: 'February 2026',
    summary: 'Block C planting complete. 3,000 new saplings in the ground.',
    photos: [
      { caption: 'Workers planting Block C saplings', category: 'planting' },
      { caption: 'Block C \u2014 freshly planted rows', category: 'aerial' },
      { caption: 'Soil preparation with organic compost', category: 'infrastructure' },
      { caption: 'Sapling quality inspection', category: 'growth' },
      { caption: 'Team photo \u2014 Mukono planting crew', category: 'team' },
    ],
    yieldReport: { health: 7.8, yield: '0 (new planting)', trees: 3000 },
  },
  {
    month: 'January 2026',
    summary: 'Q4 harvest complete. Grade A avocados shipped to export markets.',
    photos: [
      { caption: 'Grade A Hass avocados \u2014 export ready', category: 'harvest' },
      { caption: 'Packing station \u2014 quality control', category: 'harvest' },
      { caption: 'Truck loaded for Entebbe airport', category: 'logistics' },
    ],
    yieldReport: { health: 8.5, yield: '12.5 tons', trees: 6800 },
  },
  {
    month: 'December 2025',
    summary: 'Annual payout season. $67,200 distributed to 89 investors.',
    photos: [
      { caption: 'Harvest celebration with local team', category: 'team' },
      { caption: 'Block A panoramic view at sunset', category: 'aerial' },
    ],
    yieldReport: { health: 8.0, yield: '10.2 tons', trees: 6800 },
  },
]

const bioFacts = [
  { label: 'Farm Location', value: 'Mukono District, Central Uganda', icon: '\u{1F4CD}' },
  { label: 'Altitude', value: '1,200m above sea level', icon: '\u26F0\uFE0F' },
  { label: 'Soil Type', value: 'Ferralitic clay loam (volcanic)', icon: '\u{1F7E4}' },
  { label: 'Annual Rainfall', value: '1,200-1,500mm', icon: '\u{1F327}\uFE0F' },
  { label: 'Tree Variety', value: 'Hass Avocado (Persea americana)', icon: '\u{1F951}' },
  { label: 'Planting Density', value: '250 trees per hectare', icon: '\u{1F333}' },
  { label: 'Lifespan', value: '50+ years productive', icon: '\u267E\uFE0F' },
  { label: 'First Fruit', value: 'Year 3-4 after planting', icon: '\u{1F338}' },
  { label: 'Full Production', value: 'Year 6-7 (60-100 kg/tree)', icon: '\u{1F4C8}' },
  { label: 'Export Markets', value: 'Europe, Middle East, Asia', icon: '\u2708\uFE0F' },
  { label: 'Carbon Capture', value: '22 kg CO\u2082 per tree per year', icon: '\u{1F30D}' },
  { label: 'Workers Employed', value: '50+ local community members', icon: '\u{1F477}' },
]

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    aerial: 'bg-blue-50 text-blue-700',
    infrastructure: 'bg-purple-50 text-purple-700',
    growth: 'bg-green-50 text-green-700',
    planting: 'bg-yellow-50 text-yellow-700',
    team: 'bg-pink-50 text-pink-700',
    harvest: 'bg-orange-50 text-orange-700',
    logistics: 'bg-gray-50 text-gray-700',
  }
  return <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${colors[category] || 'bg-gray-50 text-gray-700'}`}>{category}</span>
}

export default function FarmGalleryPage() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-forest to-forest-light rounded-2xl p-6 md:p-8 text-cream">
        <h1 className="font-display text-2xl md:text-3xl font-bold">Farm Gallery & Progress</h1>
        <p className="text-cream/70 mt-1 text-sm">Follow the journey of your trees at Mukono Hass Orchard, Uganda</p>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div>
            <p className="text-2xl font-bold text-cream">15,000</p>
            <p className="text-[10px] text-cream/60">Total Trees</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-cream">60 ha</p>
            <p className="text-[10px] text-cream/60">Farm Size</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-cream">3</p>
            <p className="text-[10px] text-cream/60">Active Blocks</p>
          </div>
        </div>
      </div>

      {/* Bio Infographic */}
      <div>
        <h2 className="font-display text-lg font-bold text-charcoal mb-3">{'\u{1F951}'} About Hass Avocados at Mukono</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {bioFacts.map((fact) => (
            <div key={fact.label} className="bg-white rounded-xl p-3 shadow-sm border border-cream-dark/50 text-center">
              <span className="text-xl block mb-1">{fact.icon}</span>
              <p className="text-[10px] font-semibold text-gray uppercase tracking-wider">{fact.label}</p>
              <p className="text-xs font-bold text-charcoal mt-1 leading-tight">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Gallery */}
      {galleryMonths.map((month) => (
        <div key={month.month} className="bg-white rounded-xl shadow-sm border border-cream-dark/50 overflow-hidden">
          {/* Month Header */}
          <div className="p-5 border-b border-cream-dark/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold text-charcoal">{month.month}</h2>
                <p className="text-xs text-gray mt-0.5">{month.summary}</p>
              </div>
              <div className="flex gap-3 text-center">
                <div className="bg-forest/10 rounded-lg px-3 py-2">
                  <p className="text-xs font-bold text-forest">{month.yieldReport.health}/10</p>
                  <p className="text-[9px] text-gray">Health</p>
                </div>
                <div className="bg-terra/10 rounded-lg px-3 py-2">
                  <p className="text-xs font-bold text-terra">{month.yieldReport.yield}</p>
                  <p className="text-[9px] text-gray">Yield</p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          <div className="p-5">
            <div className={`grid gap-3 ${month.photos.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
              {month.photos.map((photo, j) => (
                <div key={j} className="group cursor-pointer">
                  <div className="aspect-4/3 rounded-xl bg-linear-to-br from-forest/10 to-forest/5 flex items-center justify-center group-hover:from-forest/20 group-hover:to-forest/10 transition-colors relative overflow-hidden">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{'\u{1F33F}'}</span>
                    <div className="absolute top-2 left-2">
                      <CategoryBadge category={photo.category} />
                    </div>
                  </div>
                  <p className="text-[10px] text-charcoal mt-1.5 line-clamp-2 leading-snug">{photo.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
