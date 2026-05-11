import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Trees — Avotien',
}

const blocks = [
  {
    name: 'Block A',
    trees: 45,
    status: 'producing',
    health: 8.5,
    planted: 'March 2025',
    variety: 'Hass',
    altitude: '1,200m',
    description: 'Original planting \u2014 mature trees with full canopy. First harvest completed Dec 2025.',
  },
  {
    name: 'Block C',
    trees: 10,
    status: 'growing',
    health: 7.2,
    planted: 'February 2026',
    variety: 'Hass',
    altitude: '1,180m',
    description: 'New expansion planting. Saplings 60cm tall, roots establishing. First fruit expected 2028.',
  },
]

const treeList = [
  ...Array.from({ length: 45 }, (_, i) => ({
    code: `MKN-${String(i + 1).padStart(4, '0')}`,
    block: 'A',
    status: 'producing' as const,
    health: 7 + Math.floor(Math.random() * 4),
    planted: '2025-03-15',
    height: `${180 + Math.floor(Math.random() * 40)}cm`,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    code: `MKN-${String(i + 51).padStart(4, '0')}`,
    block: 'C',
    status: 'growing' as const,
    health: 6 + Math.floor(Math.random() * 3),
    planted: '2026-02-15',
    height: `${50 + Math.floor(Math.random() * 20)}cm`,
  })),
]

function HealthDot({ score }: { score: number }) {
  const color = score >= 8 ? 'bg-forest' : score >= 6 ? 'bg-gold' : 'bg-terra'
  return <span className={`w-2 h-2 rounded-full ${color} inline-block`} />
}

export default function TreesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-charcoal">My Trees</h1>
        <p className="text-sm text-gray mt-1">55 trees across 2 blocks in Mukono Hass Orchard</p>
      </div>

      {/* Block Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blocks.map((block) => (
          <div key={block.name} className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-charcoal">{block.name}</h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  block.status === 'producing' ? 'bg-forest/10 text-forest' : 'bg-gold/20 text-charcoal'
                }`}>{block.status}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-charcoal">{block.trees}</p>
                <p className="text-[10px] text-gray">trees</p>
              </div>
            </div>
            <p className="text-xs text-gray leading-relaxed mb-3">{block.description}</p>
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-cream-dark/50">
              <div>
                <p className="text-[10px] text-gray">Health</p>
                <p className="text-sm font-bold text-forest">{block.health}/10</p>
              </div>
              <div>
                <p className="text-[10px] text-gray">Planted</p>
                <p className="text-sm font-bold text-charcoal">{block.planted}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray">Altitude</p>
                <p className="text-sm font-bold text-charcoal">{block.altitude}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Tree Grid */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-charcoal">All 55 Trees</h2>
          <div className="flex items-center gap-4 text-[10px] text-gray">
            <span className="flex items-center gap-1"><span className="w-6 h-6 rounded-lg bg-forest/20 flex items-center justify-center text-xs">{'\u{1F333}'}</span> Producing (45)</span>
            <span className="flex items-center gap-1"><span className="w-6 h-6 rounded-lg bg-gold/20 flex items-center justify-center text-xs">{'\u{1F331}'}</span> Growing (10)</span>
          </div>
        </div>
        <div className="grid grid-cols-8 sm:grid-cols-11 md:grid-cols-15 lg:grid-cols-20 gap-1.5">
          {treeList.map((tree) => (
            <div
              key={tree.code}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all hover:scale-125 hover:shadow-md hover:z-10 relative group ${
                tree.status === 'producing' ? 'bg-forest/15 hover:bg-forest/25' : 'bg-gold/15 hover:bg-gold/25'
              }`}
              title={`${tree.code} \u00B7 ${tree.block} \u00B7 ${tree.health}/10 \u00B7 ${tree.height}`}
            >
              {tree.status === 'producing' ? '\u{1F333}' : '\u{1F331}'}
              {/* Tooltip */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-charcoal text-cream rounded-lg px-3 py-2 text-[10px] whitespace-nowrap z-20 shadow-lg">
                <p className="font-bold">{tree.code}</p>
                <p>Block {tree.block} \u00B7 Health {tree.health}/10</p>
                <p>{tree.height} tall</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tree Table */}
      <div className="bg-white rounded-xl shadow-sm border border-cream-dark/50 overflow-hidden">
        <div className="px-5 py-3 border-b border-cream-dark/50 flex items-center justify-between">
          <h2 className="text-sm font-bold text-charcoal">Tree Details</h2>
          <input type="text" placeholder="Search tree code..." className="px-3 py-1.5 rounded-lg border border-cream-dark text-xs w-48 focus:outline-none focus:ring-2 focus:ring-forest" />
        </div>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full">
            <thead className="sticky top-0 bg-cream-dark/30">
              <tr>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase tracking-wider">Code</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase tracking-wider">Block</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase tracking-wider">Health</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase tracking-wider">Height</th>
                <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray uppercase tracking-wider">Planted</th>
              </tr>
            </thead>
            <tbody>
              {treeList.slice(0, 20).map((tree) => (
                <tr key={tree.code} className="border-b border-cream-dark/30 hover:bg-cream-dark/10">
                  <td className="px-4 py-2 text-xs font-mono font-medium text-charcoal">{tree.code}</td>
                  <td className="px-4 py-2 text-xs text-charcoal">{tree.block}</td>
                  <td className="px-4 py-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tree.status === 'producing' ? 'bg-forest/10 text-forest' : 'bg-gold/20 text-charcoal'}`}>{tree.status}</span>
                  </td>
                  <td className="px-4 py-2"><div className="flex items-center gap-1.5"><HealthDot score={tree.health} /><span className="text-xs text-charcoal">{tree.health}/10</span></div></td>
                  <td className="px-4 py-2 text-xs text-charcoal">{tree.height}</td>
                  <td className="px-4 py-2 text-[10px] text-gray">{tree.planted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-2.5 border-t border-cream-dark/50 text-[10px] text-gray">
          Showing 20 of {treeList.length} trees
        </div>
      </div>
    </div>
  )
}
