'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function Counter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(target)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2500
    const steps = 80
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const stats = [
  { value: 1000, suffix: '+', label: 'Smallholder Farmers', sublabel: 'Empowered across Uganda' },
  { value: 24, suffix: '', label: 'Export Containers', sublabel: 'Scaling to 384/year' },
  { value: 2000, suffix: '', label: 'Acres Target', sublabel: 'Phase 1 by 2026' },
  { value: 60, suffix: '%', label: 'Export ROI', sublabel: 'At 384 containers/year' },
]

export function ImpactStats() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
          alt="Aerial view of farmland"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-3">Impact & Scale</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Building Africa&apos;s Avocado Infrastructure
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-5xl md:text-6xl font-bold text-white mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm font-semibold text-gold uppercase tracking-wider">{stat.label}</p>
              <p className="text-xs text-white/50 mt-1">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
