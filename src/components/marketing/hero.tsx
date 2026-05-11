'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(target)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
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

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80&fit=crop"
        alt="Lush avocado farm in Uganda"
        fill
        className="object-cover"
        priority
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            From Seed to Table
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6 max-w-4xl">
            Invest in Uganda&apos;s
            <br />
            Avocado{' '}
            <span className="text-gold">Future</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-xl mb-10 leading-relaxed">
            Avotein Farms captures the full Hass avocado supply chain — nursery, farm, logistics, export, retail.
            The HASS Fund projects ~40% annual returns from year 4.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
            <Link
              href="/checkout"
              className="group bg-white text-forest px-8 py-4 rounded-full text-lg font-semibold hover:bg-cream transition-colors flex items-center gap-2"
            >
              Join the HASS Fund
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#calculator"
              className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-medium transition-colors"
            >
              Calculate Returns
            </Link>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/20"
        >
          <div className="md:pr-8">
            <p className="text-4xl md:text-5xl font-bold text-white">
              <AnimatedCounter target={200} />
            </p>
            <p className="text-sm text-white/50 mt-1">Acres Cultivated</p>
          </div>
          <div className="md:px-8">
            <p className="text-4xl md:text-5xl font-bold text-white">
              <AnimatedCounter target={10} suffix="k" />
            </p>
            <p className="text-sm text-white/50 mt-1">Seedling Nursery</p>
          </div>
          <div className="md:px-8">
            <p className="text-4xl md:text-5xl font-bold text-white">
              ~<AnimatedCounter target={40} suffix="%" />
            </p>
            <p className="text-sm text-white/50 mt-1">Projected Annual ROI</p>
          </div>
          <div className="md:pl-8">
            <p className="text-4xl md:text-5xl font-bold text-white">
              <AnimatedCounter target={20} />
              <span className="text-lg text-white/50 ml-1">yr</span>
            </p>
            <p className="text-sm text-white/50 mt-1">Managed Agreement</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
