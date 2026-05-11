'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const steps = [
  {
    stage: '01',
    title: 'Nursery',
    stat: '10,000',
    statLabel: 'Seedlings',
    description: 'Certified Hass avocado seedlings grown in our controlled nursery before transplanting.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  },
  {
    stage: '02',
    title: 'Cultivation',
    stat: '200',
    statLabel: 'Acres',
    description: 'Two farms in Central and Western Uganda with rich volcanic soil and equatorial climate.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
  },
  {
    stage: '03',
    title: 'Harvest',
    stat: '1,000+',
    statLabel: 'Farmers',
    description: 'Partnering with smallholder cooperatives. 12 collection centers across the country.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
  },
  {
    stage: '04',
    title: 'Logistics',
    stat: '12',
    statLabel: 'Trucks',
    description: 'Our fleet connects farms to packhouses and export hubs. From field to container in 48 hours.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
  },
  {
    stage: '05',
    title: 'Export',
    stat: '384',
    statLabel: 'Containers/yr target',
    description: 'Reefer containers by air to Dubai, Jeddah, Kuwait. By sea to Spain. Currently 24, scaling to 384.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=600&q=80',
  },
  {
    stage: '06',
    title: 'Retail',
    stat: '7',
    statLabel: 'Carrefour Stores',
    description: '"I Feel Pretty" brand on shelves in Carrefour Uganda. Retailing at $1.8/kg and expanding.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
  },
]

export function SupplyChain() {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 'left' | 'right') {
    if (!scrollRef.current) return
    const amount = 360
    scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <section className="py-20 md:py-28 bg-forest text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-3">Our Supply Chain</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              From Seed to Table
            </h2>
            <p className="text-white/60 max-w-xl text-lg">
              We capture every link in the avocado value chain — that is how we maximize returns for our investors.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Horizontal scrolling supply chain */}
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory -mx-6 px-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.stage}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[300px] md:min-w-[340px] snap-start flex-shrink-0"
            >
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs font-mono text-gold/80">{step.stage}</span>
                  <h3 className="text-xl font-display font-bold text-white">{step.title}</h3>
                </div>
              </div>
              <div className="mb-3">
                <span className="text-3xl font-bold text-gold">{step.stat}</span>
                <span className="text-sm text-white/50 ml-2">{step.statLabel}</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Connection line */}
        <div className="hidden md:flex items-center justify-center mt-8 gap-2">
          {steps.map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gold" />
              {i < steps.length - 1 && <div className="w-16 h-px bg-gold/30" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
