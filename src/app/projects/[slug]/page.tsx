'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const farmPlots = [
  { id: 'A1', name: 'Block A — Mature Orchard', farm: 'Farm One', region: 'Central Uganda', lat: 0.35, lng: 32.62, status: 'producing' as const, acres: 25, trees: 3750, available: 450, healthScore: 8.5, pricePerTree: 19.50, yearsToMaturity: 2, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', cropType: 'Hass', altitude: '1,200m' },
  { id: 'A2', name: 'Block B — Growth Phase', farm: 'Farm One', region: 'Central Uganda', lat: 0.36, lng: 32.63, status: 'growing' as const, acres: 25, trees: 3750, available: 1200, healthScore: 7.8, pricePerTree: 19.50, yearsToMaturity: 3, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80', cropType: 'Hass', altitude: '1,200m' },
  { id: 'A3', name: 'Block C — Nursery Expansion', farm: 'Farm One', region: 'Central Uganda', lat: 0.34, lng: 32.61, status: 'planted' as const, acres: 25, trees: 3750, available: 2800, healthScore: 9.0, pricePerTree: 19.50, yearsToMaturity: 4, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', cropType: 'Hass', altitude: '1,200m' },
  { id: 'A4', name: 'Block D — Premium Altitude', farm: 'Farm One', region: 'Central Uganda', lat: 0.37, lng: 32.64, status: 'growing' as const, acres: 25, trees: 3750, available: 2100, healthScore: 8.2, pricePerTree: 19.50, yearsToMaturity: 4, image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80', cropType: 'Hass', altitude: '1,250m' },
  { id: 'B1', name: 'Block E — Western Highland', farm: 'Farm Two', region: 'Western Uganda', lat: 0.60, lng: 30.66, status: 'growing' as const, acres: 30, trees: 4500, available: 3200, healthScore: 8.8, pricePerTree: 19.50, yearsToMaturity: 4, image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=80', cropType: 'Hass', altitude: '1,400m' },
  { id: 'B2', name: 'Block F — New Planting', farm: 'Farm Two', region: 'Western Uganda', lat: 0.59, lng: 30.65, status: 'planted' as const, acres: 30, trees: 4500, available: 4100, healthScore: 9.2, pricePerTree: 19.50, yearsToMaturity: 5, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80', cropType: 'Hass', altitude: '1,400m' },
  { id: 'B3', name: 'Block G — Organic Trial', farm: 'Farm Two', region: 'Western Uganda', lat: 0.61, lng: 30.67, status: 'planted' as const, acres: 20, trees: 3000, available: 2800, healthScore: 8.0, pricePerTree: 22.00, yearsToMaturity: 5, image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&q=80', cropType: 'Hass (Organic)', altitude: '1,450m' },
  { id: 'C1', name: 'Phase 2 — Expansion', farm: 'Future Site', region: 'Northern Uganda', lat: 2.77, lng: 32.30, status: 'available' as const, acres: 200, trees: 30000, available: 30000, healthScore: 0, pricePerTree: 17.50, yearsToMaturity: 5, image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&q=80', cropType: 'Hass', altitude: '1,100m' },
]

const statusColors: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  producing: { bg: 'bg-forest/10', text: 'text-forest', dot: 'bg-forest', label: 'Producing' },
  growing: { bg: 'bg-gold/20', text: 'text-charcoal', dot: 'bg-gold', label: 'Growing' },
  planted: { bg: 'bg-terra/10', text: 'text-terra', dot: 'bg-terra', label: 'Planted' },
  available: { bg: 'bg-charcoal/10', text: 'text-charcoal', dot: 'bg-charcoal', label: 'Coming Soon' },
}

type Region = 'all' | 'Central Uganda' | 'Western Uganda' | 'Northern Uganda'

export default function FarmExplorerPage() {
  const [region, setRegion] = useState<Region>('all')
  const [hoveredPlot, setHoveredPlot] = useState<string | null>(null)
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null)

  const filtered = region === 'all' ? farmPlots : farmPlots.filter(p => p.region === region)
  const activePlot = farmPlots.find(p => p.id === (selectedPlot || hoveredPlot))

  return (
    <div className="pt-[72px] min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/" className="text-sm text-cream/60 hover:text-cream transition-colors mb-2 inline-block">&larr; Back to Home</Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-cream">Farm Explorer</h1>
          <p className="text-cream/60 mt-1">8 plots across 3 regions — explore, compare, and invest</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-forest/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto">
          {(['all', 'Central Uganda', 'Western Uganda', 'Northern Uganda'] as Region[]).map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                region === r ? 'bg-forest text-white' : 'bg-cream-dark text-charcoal hover:bg-cream'
              }`}
            >
              {r === 'all' ? `All Regions (${farmPlots.length})` : `${r} (${farmPlots.filter(p => p.region === r).length})`}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-4 text-xs text-gray">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-forest" /> Producing</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gold" /> Growing</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-terra" /> Planted</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-charcoal" /> Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Split layout: cards left, map right */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Plot cards */}
          <div className="lg:w-[55%] p-6 space-y-4">
            <p className="text-sm text-gray">{filtered.length} plots found</p>
            <AnimatePresence mode="popLayout">
              {filtered.map((plot) => (
                <motion.div
                  key={plot.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onMouseEnter={() => setHoveredPlot(plot.id)}
                  onMouseLeave={() => setHoveredPlot(null)}
                  onClick={() => setSelectedPlot(selectedPlot === plot.id ? null : plot.id)}
                  className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex ${
                    (hoveredPlot === plot.id || selectedPlot === plot.id) ? 'ring-2 ring-forest shadow-md' : ''
                  }`}
                >
                  <div className="relative w-40 md:w-52 flex-shrink-0">
                    <Image src={plot.image} alt={plot.name} fill className="object-cover" />
                    <div className="absolute top-2 left-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[plot.status].bg} ${statusColors[plot.status].text}`}>
                        {statusColors[plot.status].label}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-display text-sm font-bold text-charcoal">{plot.name}</h3>
                          <p className="text-xs text-gray">{plot.region} · {plot.altitude} · {plot.cropType}</p>
                        </div>
                        <span className="text-xs font-mono bg-cream-dark px-2 py-0.5 rounded text-charcoal">{plot.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4 text-xs">
                        <span><strong className="text-charcoal">{plot.acres}</strong> <span className="text-gray">acres</span></span>
                        <span><strong className="text-forest">{(plot.trees/1000).toFixed(1)}k</strong> <span className="text-gray">trees</span></span>
                        <span><strong className="text-terra">{plot.available > 999 ? `${(plot.available/1000).toFixed(1)}k` : plot.available}</strong> <span className="text-gray">avail</span></span>
                        {plot.healthScore > 0 && <span><strong className="text-forest">{plot.healthScore}</strong><span className="text-gray">/10</span></span>}
                      </div>
                      <span className="text-sm font-bold text-forest">${plot.pricePerTree.toFixed(2)}<span className="text-xs font-normal text-gray">/tree</span></span>
                    </div>

                    {/* Expanded detail */}
                    <AnimatePresence>
                      {selectedPlot === plot.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-cream-dark">
                            <div className="grid grid-cols-4 gap-2 mb-3">
                              {[
                                { year: 'Yr 1-3', yield: '$0' },
                                { year: 'Yr 4', yield: '$6.20' },
                                { year: 'Yr 5', yield: '$17.20' },
                                { year: 'Yr 6+', yield: '$31.20' },
                              ].map((s, i) => (
                                <div key={i} className="bg-cream rounded-lg p-2 text-center">
                                  <p className="text-xs font-bold text-charcoal">{s.yield}</p>
                                  <p className="text-[9px] text-gray">{s.year}</p>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray">
                                {plot.yearsToMaturity > 0 ? `${plot.yearsToMaturity} years to full production` : 'Producing now'}
                              </div>
                              <Link
                                href="/checkout"
                                className="bg-forest hover:bg-forest-light text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                              >
                                Invest Now
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right: Map */}
          <div className="lg:w-[45%] lg:sticky lg:top-[120px] lg:h-[calc(100vh-120px)] p-6">
            <div className="bg-forest/5 rounded-2xl h-full min-h-[400px] relative overflow-hidden border border-forest/10">
              {/* SVG Map of Uganda */}
              <svg viewBox="0 0 400 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Uganda outline (simplified) */}
                <path
                  d="M120,50 L280,30 L350,100 L370,200 L350,300 L320,380 L280,420 L220,460 L160,450 L100,400 L60,320 L40,220 L50,150 L80,80 Z"
                  fill="#F5EDE0"
                  stroke="#1B4332"
                  strokeWidth="2"
                  opacity="0.6"
                />
                {/* Lake Victoria */}
                <ellipse cx="300" cy="380" rx="60" ry="50" fill="#B8D4E3" opacity="0.4" />
                <text x="300" y="385" textAnchor="middle" className="text-[10px] fill-gray/50">Lake Victoria</text>

                {/* Region labels */}
                <text x="200" y="120" textAnchor="middle" className="text-[11px] fill-gray font-medium">Northern</text>
                <text x="220" y="280" textAnchor="middle" className="text-[11px] fill-gray font-medium">Central</text>
                <text x="100" y="300" textAnchor="middle" className="text-[11px] fill-gray font-medium">Western</text>

                {/* Kampala marker */}
                <circle cx="250" cy="310" r="4" fill="#1A1A1A" />
                <text x="260" y="305" className="text-[9px] fill-charcoal font-medium">Kampala</text>

                {/* Farm cluster: Central Uganda (Farm One) */}
                {farmPlots.filter(p => p.region === 'Central Uganda').map((plot, i) => {
                  const x = 230 + (i % 2) * 25
                  const y = 270 + Math.floor(i / 2) * 25
                  const isActive = hoveredPlot === plot.id || selectedPlot === plot.id
                  return (
                    <g key={plot.id} onMouseEnter={() => setHoveredPlot(plot.id)} onMouseLeave={() => setHoveredPlot(null)} onClick={() => setSelectedPlot(selectedPlot === plot.id ? null : plot.id)} className="cursor-pointer">
                      <circle cx={x} cy={y} r={isActive ? 14 : 10} fill={plot.status === 'producing' ? '#1B4332' : plot.status === 'growing' ? '#D4A84B' : plot.status === 'planted' ? '#B54E31' : '#1A1A1A'} className="transition-all duration-200" opacity={region !== 'all' && plot.region !== region ? 0.2 : 1} />
                      <text x={x} y={y + 3} textAnchor="middle" className="text-[8px] fill-white font-bold pointer-events-none">{plot.id}</text>
                      {isActive && (
                        <g>
                          <rect x={x - 50} y={y - 35} width="100" height="22" rx="6" fill="#1B4332" />
                          <text x={x} y={y - 20} textAnchor="middle" className="text-[9px] fill-white font-medium">{plot.name.split(' \u2014 ')[1] || plot.name}</text>
                        </g>
                      )}
                    </g>
                  )
                })}

                {/* Farm cluster: Western Uganda (Farm Two) */}
                {farmPlots.filter(p => p.region === 'Western Uganda').map((plot, i) => {
                  const x = 110 + (i % 2) * 25
                  const y = 310 + Math.floor(i / 2) * 25
                  const isActive = hoveredPlot === plot.id || selectedPlot === plot.id
                  return (
                    <g key={plot.id} onMouseEnter={() => setHoveredPlot(plot.id)} onMouseLeave={() => setHoveredPlot(null)} onClick={() => setSelectedPlot(selectedPlot === plot.id ? null : plot.id)} className="cursor-pointer">
                      <circle cx={x} cy={y} r={isActive ? 14 : 10} fill={plot.status === 'producing' ? '#1B4332' : plot.status === 'growing' ? '#D4A84B' : plot.status === 'planted' ? '#B54E31' : '#1A1A1A'} className="transition-all duration-200" opacity={region !== 'all' && plot.region !== region ? 0.2 : 1} />
                      <text x={x} y={y + 3} textAnchor="middle" className="text-[8px] fill-white font-bold pointer-events-none">{plot.id}</text>
                      {isActive && (
                        <g>
                          <rect x={x - 50} y={y - 35} width="100" height="22" rx="6" fill="#1B4332" />
                          <text x={x} y={y - 20} textAnchor="middle" className="text-[9px] fill-white font-medium">{plot.name.split(' \u2014 ')[1] || plot.name}</text>
                        </g>
                      )}
                    </g>
                  )
                })}

                {/* Farm cluster: Northern Uganda (Phase 2) */}
                {farmPlots.filter(p => p.region === 'Northern Uganda').map((plot) => {
                  const x = 200
                  const y = 130
                  const isActive = hoveredPlot === plot.id || selectedPlot === plot.id
                  return (
                    <g key={plot.id} onMouseEnter={() => setHoveredPlot(plot.id)} onMouseLeave={() => setHoveredPlot(null)} onClick={() => setSelectedPlot(selectedPlot === plot.id ? null : plot.id)} className="cursor-pointer">
                      <circle cx={x} cy={y} r={isActive ? 18 : 14} fill={plot.status === 'available' ? '#1A1A1A' : '#1B4332'} className="transition-all duration-200" opacity={region !== 'all' && plot.region !== region ? 0.2 : 1} strokeDasharray={plot.status === 'available' ? '4 2' : 'none'} stroke={plot.status === 'available' ? '#D4A84B' : 'none'} />
                      <text x={x} y={y + 3} textAnchor="middle" className="text-[8px] fill-white font-bold pointer-events-none">{plot.id}</text>
                      {isActive && (
                        <g>
                          <rect x={x - 55} y={y - 38} width="110" height="22" rx="6" fill="#1B4332" />
                          <text x={x} y={y - 23} textAnchor="middle" className="text-[9px] fill-white font-medium">Phase 2 — Expansion</text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Map legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                <p className="text-[10px] font-semibold text-charcoal uppercase tracking-wider mb-2">Map Legend</p>
                <div className="space-y-1.5">
                  <span className="flex items-center gap-2 text-[10px] text-gray"><span className="w-2.5 h-2.5 rounded-full bg-forest" /> Producing</span>
                  <span className="flex items-center gap-2 text-[10px] text-gray"><span className="w-2.5 h-2.5 rounded-full bg-gold" /> Growing</span>
                  <span className="flex items-center gap-2 text-[10px] text-gray"><span className="w-2.5 h-2.5 rounded-full bg-terra" /> Planted</span>
                  <span className="flex items-center gap-2 text-[10px] text-gray"><span className="w-2.5 h-2.5 rounded-full bg-charcoal" /> Coming Soon</span>
                </div>
              </div>

              {/* Active plot tooltip */}
              {activePlot && (
                <div className="absolute top-4 right-4 bg-white rounded-xl p-4 shadow-lg max-w-[220px]">
                  <div className="relative h-24 rounded-lg overflow-hidden mb-3">
                    <Image src={activePlot.image} alt={activePlot.name} fill className="object-cover" />
                  </div>
                  <h4 className="text-sm font-bold text-charcoal">{activePlot.name}</h4>
                  <p className="text-xs text-gray mb-2">{activePlot.region}</p>
                  <div className="grid grid-cols-3 gap-1 text-center mb-2">
                    <div><p className="text-sm font-bold text-charcoal">{activePlot.acres}</p><p className="text-[9px] text-gray">acres</p></div>
                    <div><p className="text-sm font-bold text-terra">{activePlot.available > 999 ? `${(activePlot.available/1000).toFixed(1)}k` : activePlot.available}</p><p className="text-[9px] text-gray">avail</p></div>
                    <div><p className="text-sm font-bold text-forest">${activePlot.pricePerTree}</p><p className="text-[9px] text-gray">/tree</p></div>
                  </div>
                  <Link href="/checkout" className="block text-center bg-forest text-white text-xs font-semibold py-2 rounded-full hover:bg-forest-light transition-colors">
                    Invest Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
