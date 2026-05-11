'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const farmPlots = [
  {
    id: 'A1', name: 'Block A — Mature Orchard', farm: 'Farm One, Central Uganda', farmGroup: 'farm-one',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    acres: 25, trees: 3750, planted: 'March 2023', age: '3 years', status: 'producing' as const,
    cropType: 'Hass' as const, altitude: '1,200m', yieldPerTree: '$6.20/yr', expectedFullYield: '2028',
    healthScore: 8.5, nextHarvest: 'October 2026', available: 450, yearsToMaturity: 2,
    annualRainfall: '1,200mm', soilType: 'Volcanic clay loam', irrigationType: 'Drip' as const,
    pricePerTree: 19.50,
  },
  {
    id: 'A2', name: 'Block B — Growth Phase', farm: 'Farm One, Central Uganda', farmGroup: 'farm-one',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80',
    acres: 25, trees: 3750, planted: 'September 2023', age: '2.5 years', status: 'growing' as const,
    cropType: 'Hass' as const, altitude: '1,200m', yieldPerTree: '$3.50/yr', expectedFullYield: '2028',
    healthScore: 7.8, nextHarvest: 'March 2027', available: 1200, yearsToMaturity: 3,
    annualRainfall: '1,200mm', soilType: 'Volcanic clay loam', irrigationType: 'Drip' as const,
    pricePerTree: 19.50,
  },
  {
    id: 'A3', name: 'Block C — Nursery Expansion', farm: 'Farm One, Central Uganda', farmGroup: 'farm-one',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    acres: 25, trees: 3750, planted: 'January 2025', age: '1 year', status: 'planted' as const,
    cropType: 'Hass' as const, altitude: '1,200m', yieldPerTree: '$0 (growing)', expectedFullYield: '2030',
    healthScore: 9.0, nextHarvest: '2028', available: 2800, yearsToMaturity: 4,
    annualRainfall: '1,200mm', soilType: 'Volcanic clay loam', irrigationType: 'Drip' as const,
    pricePerTree: 19.50,
  },
  {
    id: 'A4', name: 'Block D — Premium Altitude', farm: 'Farm One, Central Uganda', farmGroup: 'farm-one',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    acres: 25, trees: 3750, planted: 'June 2024', age: '1.5 years', status: 'growing' as const,
    cropType: 'Hass' as const, altitude: '1,250m', yieldPerTree: '$0 (growing)', expectedFullYield: '2029',
    healthScore: 8.2, nextHarvest: '2028', available: 2100, yearsToMaturity: 4,
    annualRainfall: '1,250mm', soilType: 'Red laterite', irrigationType: 'Drip' as const,
    pricePerTree: 19.50,
  },
  {
    id: 'B1', name: 'Block E — Western Highland', farm: 'Farm Two, Western Uganda', farmGroup: 'farm-two',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80',
    acres: 30, trees: 4500, planted: 'June 2024', age: '1.5 years', status: 'growing' as const,
    cropType: 'Hass' as const, altitude: '1,400m', yieldPerTree: '$0 (growing)', expectedFullYield: '2029',
    healthScore: 8.8, nextHarvest: '2028', available: 3200, yearsToMaturity: 4,
    annualRainfall: '1,400mm', soilType: 'Red laterite', irrigationType: 'Sprinkler' as const,
    pricePerTree: 19.50,
  },
  {
    id: 'B2', name: 'Block F — New Planting', farm: 'Farm Two, Western Uganda', farmGroup: 'farm-two',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
    acres: 30, trees: 4500, planted: 'January 2025', age: '1 year', status: 'planted' as const,
    cropType: 'Hass' as const, altitude: '1,400m', yieldPerTree: '$0 (growing)', expectedFullYield: '2030',
    healthScore: 9.2, nextHarvest: '2029', available: 4100, yearsToMaturity: 5,
    annualRainfall: '1,400mm', soilType: 'Red laterite', irrigationType: 'Rain-fed' as const,
    pricePerTree: 19.50,
  },
  {
    id: 'B3', name: 'Block G — Organic Trial', farm: 'Farm Two, Western Uganda', farmGroup: 'farm-two',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=80',
    acres: 20, trees: 3000, planted: 'March 2025', age: '1 year', status: 'planted' as const,
    cropType: 'Hass (Organic)' as const, altitude: '1,450m', yieldPerTree: '$0 (growing)', expectedFullYield: '2030',
    healthScore: 8.0, nextHarvest: '2029', available: 2800, yearsToMaturity: 5,
    annualRainfall: '1,500mm', soilType: 'Volcanic loam', irrigationType: 'Rain-fed' as const,
    pricePerTree: 22.00,
  },
  {
    id: 'C1', name: 'Phase 2 — Expansion Land', farm: 'Future Site, Northern Uganda', farmGroup: 'phase-2',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&q=80',
    acres: 200, trees: 30000, planted: 'Q3 2026 (planned)', age: 'Not yet planted', status: 'available' as const,
    cropType: 'Hass' as const, altitude: '1,100m', yieldPerTree: 'Projected $31.20/yr', expectedFullYield: '2031',
    healthScore: 0, nextHarvest: '2030', available: 30000, yearsToMaturity: 5,
    annualRainfall: '1,100mm', soilType: 'Ferralitic clay', irrigationType: 'Drip' as const,
    pricePerTree: 17.50,
  },
]

const statusColors = {
  producing: { bg: 'bg-forest/10', text: 'text-forest', label: 'Producing' },
  growing: { bg: 'bg-gold/20', text: 'text-charcoal', label: 'Growing' },
  planted: { bg: 'bg-terra/10', text: 'text-terra', label: 'Recently Planted' },
  available: { bg: 'bg-charcoal/10', text: 'text-charcoal', label: 'Coming Soon' },
}

type MaturityFilter = 'all' | 'producing' | 'growing' | 'planted' | 'available'
type LocationFilter = 'all' | 'farm-one' | 'farm-two' | 'phase-2'
type SortKey = 'available' | 'health' | 'acres'

const locationLabels: Record<LocationFilter, string> = {
  all: 'All Locations',
  'farm-one': 'Farm One (Central)',
  'farm-two': 'Farm Two (Western)',
  'phase-2': 'Phase 2 (Northern)',
}

const maturityLabels: Record<MaturityFilter, string> = {
  all: 'All',
  producing: 'Producing',
  growing: 'Growing',
  planted: 'Planted',
  available: 'Coming Soon',
}

export function FarmGallery() {
  const [maturityFilter, setMaturityFilter] = useState<MaturityFilter>('all')
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('all')
  const [sortKey, setSortKey] = useState<SortKey>('available')
  const [selected, setSelected] = useState<typeof farmPlots[number] | null>(null)

  const filtered = useMemo(() => {
    let result = [...farmPlots]

    if (locationFilter !== 'all') {
      result = result.filter(p => p.farmGroup === locationFilter)
    }
    if (maturityFilter !== 'all') {
      result = result.filter(p => p.status === maturityFilter)
    }

    switch (sortKey) {
      case 'available':
        result.sort((a, b) => b.available - a.available)
        break
      case 'health':
        result.sort((a, b) => b.healthScore - a.healthScore)
        break
      case 'acres':
        result.sort((a, b) => b.acres - a.acres)
        break
    }

    return result
  }, [locationFilter, maturityFilter, sortKey])

  return (
    <section className="py-20 md:py-28 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-terra text-sm font-semibold uppercase tracking-[0.2em] mb-3">Farm Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Explore Our Plots
          </h2>
          <p className="text-gray max-w-xl text-lg">
            8 blocks across 2 farms — each with GPS coordinates, health scores, and yield projections. Choose where your trees grow.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          {/* Location dropdown */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value as LocationFilter)}
            className="px-4 py-2.5 rounded-full bg-white text-sm font-medium text-charcoal border border-cream-dark focus:outline-none focus:ring-2 focus:ring-forest/30 cursor-pointer"
          >
            {(Object.keys(locationLabels) as LocationFilter[]).map((key) => (
              <option key={key} value={key}>{locationLabels[key]}</option>
            ))}
          </select>

          {/* Maturity pills */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(maturityLabels) as MaturityFilter[]).map((f) => {
              const count = f === 'all'
                ? farmPlots.length
                : farmPlots.filter(p => p.status === f).length
              return (
                <button
                  key={f}
                  onClick={() => setMaturityFilter(f)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    maturityFilter === f ? 'bg-forest text-white' : 'bg-white text-charcoal hover:bg-cream'
                  }`}
                >
                  {maturityLabels[f]} ({count})
                </button>
              )
            })}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="px-4 py-2.5 rounded-full bg-white text-sm font-medium text-charcoal border border-cream-dark focus:outline-none focus:ring-2 focus:ring-forest/30 cursor-pointer md:ml-auto"
          >
            <option value="available">Sort: Available (most first)</option>
            <option value="health">Sort: Health Score</option>
            <option value="acres">Sort: Acres</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((plot) => (
              <motion.div
                key={plot.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(plot)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={plot.image}
                    alt={plot.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[plot.status].bg} ${statusColors[plot.status].text}`}>
                      {statusColors[plot.status].label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-mono px-2 py-1 rounded">
                    {plot.id}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-display text-sm font-bold text-charcoal mb-0.5">{plot.name}</h3>
                  <p className="text-xs text-gray mb-2">{plot.farm}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-forest bg-forest/10 px-2 py-0.5 rounded-full">
                      ${plot.pricePerTree.toFixed(2)}/tree
                    </span>
                    <span className="text-xs text-gray">
                      {plot.yearsToMaturity > 0 ? `${plot.yearsToMaturity}yr to maturity` : 'Mature'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-charcoal">{plot.acres}</p>
                      <p className="text-[10px] text-gray uppercase">Acres</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-forest">{(plot.trees / 1000).toFixed(1)}k</p>
                      <p className="text-[10px] text-gray uppercase">Trees</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-terra">{plot.available > 999 ? `${(plot.available / 1000).toFixed(1)}k` : plot.available}</p>
                      <p className="text-[10px] text-gray uppercase">Available</p>
                    </div>
                  </div>

                  {plot.healthScore > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-gray mb-1">
                        <span>Health</span>
                        <span>{plot.healthScore}/10</span>
                      </div>
                      <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
                        <div className="h-full bg-forest rounded-full" style={{ width: `${plot.healthScore * 10}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray text-lg">No plots match the selected filters.</p>
          </div>
        )}

        {/* Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              >
                {/* Hero image */}
                <div className="relative h-56">
                  <Image src={selected.image} alt={selected.name} fill className="object-cover rounded-t-2xl" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent rounded-t-2xl" />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[selected.status].bg} ${statusColors[selected.status].text}`}>
                      {statusColors[selected.status].label}
                    </span>
                    <span className="text-xs font-mono bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded">
                      {selected.id}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {/* Header with name + price */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-charcoal">{selected.name}</h2>
                      <p className="text-sm text-gray">{selected.farm}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-forest">${selected.pricePerTree.toFixed(2)}</span>
                      <span className="text-sm text-gray block">per tree</span>
                    </div>
                  </div>

                  {/* Top stats row — 4 big numbers */}
                  <div className="grid grid-cols-4 gap-3 my-6 py-5 border-y border-cream-dark">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-charcoal">{selected.acres}</p>
                      <p className="text-xs text-gray">Acres</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-charcoal">{selected.trees.toLocaleString()}</p>
                      <p className="text-xs text-gray">Trees</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-terra">{selected.available.toLocaleString()}</p>
                      <p className="text-xs text-gray">Available</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-forest">{selected.healthScore > 0 ? `${selected.healthScore}/10` : '\u2014'}</p>
                      <p className="text-xs text-gray">Health</p>
                    </div>
                  </div>

                  {/* Maturity Progress — clean horizontal bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">Maturity</span>
                      <span className="text-sm font-medium text-forest">{5 - selected.yearsToMaturity} of 5 years</span>
                    </div>
                    <div className="h-2.5 bg-cream-dark rounded-full overflow-hidden">
                      <div className="h-full bg-forest rounded-full transition-all" style={{ width: `${((5 - selected.yearsToMaturity) / 5) * 100}%` }} />
                    </div>
                  </div>

                  {/* Yield Projection — horizontal timeline */}
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-4">Yield Projection</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { year: 'Yr 1-3', yield: '$0', label: 'Growth', active: selected.yearsToMaturity > 2 },
                        { year: 'Yr 4', yield: '$6.20', label: 'First harvest', active: selected.yearsToMaturity <= 2 && selected.yearsToMaturity > 0 },
                        { year: 'Yr 5', yield: '$17.20', label: 'Scaling', active: false },
                        { year: 'Yr 6-20', yield: '$31.20', label: 'Full production', active: false },
                      ].map((step, i) => (
                        <div key={i} className={`rounded-xl p-3 text-center ${step.active ? 'bg-forest text-white' : 'bg-cream'}`}>
                          <p className={`text-lg font-bold ${step.active ? 'text-white' : 'text-charcoal'}`}>{step.yield}</p>
                          <p className={`text-[10px] font-semibold uppercase ${step.active ? 'text-white/70' : 'text-gray'}`}>{step.year}</p>
                          <p className={`text-[10px] mt-0.5 ${step.active ? 'text-white/60' : 'text-gray'}`}>{step.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specs — compact 2-row grid */}
                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Specifications</h3>
                    <div className="grid grid-cols-4 gap-x-6 gap-y-3">
                      {[
                        { label: 'Altitude', value: selected.altitude },
                        { label: 'Soil', value: selected.soilType },
                        { label: 'Irrigation', value: selected.irrigationType },
                        { label: 'Rainfall', value: selected.annualRainfall },
                        { label: 'Crop', value: selected.cropType },
                        { label: 'Planted', value: selected.planted },
                        { label: 'Next Harvest', value: selected.nextHarvest },
                        { label: 'Full Yield', value: selected.expectedFullYield },
                      ].map((spec) => (
                        <div key={spec.label}>
                          <p className="text-[10px] text-gray uppercase">{spec.label}</p>
                          <p className="text-sm font-medium text-charcoal">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="/checkout"
                    className="block text-center bg-forest hover:bg-forest-light text-white py-4 rounded-full font-semibold transition-colors text-lg"
                  >
                    Invest in {selected.name.split(' \u2014 ')[0]} — ${selected.pricePerTree.toFixed(2)}/tree
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
