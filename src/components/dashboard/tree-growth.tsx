'use client'

import { motion } from 'framer-motion'

interface TreeGrowthProps {
  stage: 1 | 2 | 3 | 4 | 5
  label: string
}

export function TreeGrowth({ stage, label }: TreeGrowthProps) {
  const stages = [
    { name: 'Sapling', year: 'Yr 1', icon: '🌱', heightPx: 32 },
    { name: 'Young', year: 'Yr 2', icon: '🌿', heightPx: 52 },
    { name: 'Flowering', year: 'Yr 3-4', icon: '🌸', heightPx: 72 },
    { name: 'Fruiting', year: 'Yr 5', icon: '🥑', heightPx: 92 },
    { name: 'Mature', year: 'Yr 6+', icon: '🌳', heightPx: 112 },
  ]

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">Orchard Maturity</h3>
      <p className="text-sm text-gray mb-5">{label}</p>

      <div className="flex items-end justify-around gap-3 mb-3" style={{ height: '130px' }}>
        {stages.map((s, i) => {
          const isActive = i < stage
          const isCurrent = i === stage - 1
          return (
            <div key={s.name} className="flex flex-col items-center gap-1.5">
              <span className="text-lg">{s.icon}</span>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: s.heightPx }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12, ease: 'easeOut' }}
                style={{ width: 36 }}
                className={`rounded-t-lg ${
                  isCurrent
                    ? 'bg-forest'
                    : isActive
                    ? 'bg-forest/50'
                    : 'bg-cream-dark'
                }`}
              />
            </div>
          )
        })}
      </div>

      <div className="flex justify-around gap-3">
        {stages.map((s, i) => {
          const isCurrent = i === stage - 1
          return (
            <div key={s.name} className="text-center" style={{ width: 50 }}>
              <p className={`text-[10px] font-semibold ${isCurrent ? 'text-forest' : 'text-gray'}`}>
                {s.name}
              </p>
              <p className="text-[9px] text-gray">{s.year}</p>
              {isCurrent && (
                <div className="w-1.5 h-1.5 rounded-full bg-forest mx-auto mt-1" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
