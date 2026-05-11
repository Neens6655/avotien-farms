'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { FarmPhotos } from '@/components/dashboard/farm-photos'
import { TreeGrowth } from '@/components/dashboard/tree-growth'
// WeatherWidget removed per user request

const PortfolioChart = dynamic(() => import('@/components/dashboard/portfolio-chart').then(m => ({ default: m.PortfolioChart })), {
  ssr: false,
  loading: () => <div className="h-48 bg-cream-dark rounded-xl animate-pulse" />,
})

const PayoutForecast = dynamic(() => import('@/components/dashboard/payout-forecast').then(m => ({ default: m.PayoutForecast })), {
  ssr: false,
  loading: () => <div className="h-48 bg-cream-dark rounded-xl animate-pulse" />,
})

const notifications = [
  { id: 1, message: 'Update your bank details for upcoming payout', link: '/dashboard/documents', urgent: true },
  { id: 2, message: 'Complete KYC verification to unlock full features', link: '/dashboard/documents', urgent: true },
]

const blocks = [
  {
    name: 'Block A', subtitle: 'Mature Orchard', trees: 50, status: 'producing' as const,
    health: 8.5, height: '2.1m', age: '3 years', nextMilestone: 'Full canopy — Q3 2026',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
    progress: 75, yieldPerTree: '$6.20/yr',
  },
  {
    name: 'Block C', subtitle: 'New Saplings', trees: 5, status: 'growing' as const,
    health: 9.0, height: '60cm', age: '1 year', nextMilestone: 'First flowering — 2027',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    progress: 20, yieldPerTree: '$0 (growing)',
  },
]

const timeline = [
  { date: 'Mar 2026', event: 'Trees flowering! Fruit expected in 6-8 months', type: 'milestone', highlight: true },
  { date: 'Feb 2026', event: 'Bought 5 more trees — Block C expansion', type: 'purchase', highlight: false },
  { date: 'Dec 2025', event: 'First payout received — $247', type: 'payout', highlight: true },
  { date: 'Oct 2025', event: '1.2m tall — canopy forming, irrigation installed', type: 'report', highlight: false },
  { date: 'Jul 2025', event: 'Growth report: 60cm tall, health 7/10', type: 'report', highlight: false },
  { date: 'Apr 2025', event: '50 saplings planted in Block A', type: 'milestone', highlight: false },
  { date: 'Mar 2025', event: 'Purchased 50 trees — Grove plan', type: 'purchase', highlight: true },
]

export default function DashboardPage() {
  const [showAllTimeline, setShowAllTimeline] = useState(false)
  const visibleTimeline = showAllTimeline ? timeline : timeline.slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-terra/10 border border-terra/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-terra shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-charcoal">Action Required</p>
              {notifications.map(n => (
                <Link key={n.id} href={n.link} className="text-sm text-terra hover:underline block mt-0.5">{n.message} →</Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero — Photo background with stats overlay */}
      <div className="relative rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80"
          alt="Your orchard in Mukono"
          width={1200}
          height={400}
          className="w-full h-56 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-cream/60 text-xs uppercase tracking-widest">Your Orchard · Mukono, Uganda</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-1">55 Trees Growing</h1>
              <p className="text-cream/60 text-sm mt-1">45 producing · 10 in growth phase</p>
            </div>
            <Link href="/checkout" className="hidden md:flex bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/20 px-5 py-2.5 rounded-full text-sm font-medium transition-colors items-center gap-2">
              + Expand Orchard
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Financials — 4 cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] text-gray uppercase tracking-wider">Total Invested</p>
          <p className="text-xl font-bold text-charcoal mt-1">$1,375</p>
          <p className="text-[10px] text-gray">Since Mar 2025</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] text-gray uppercase tracking-wider">Earned to Date</p>
          <p className="text-xl font-bold text-forest mt-1">$445</p>
          <p className="text-[10px] text-forest">2 payouts</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-[10px] text-gray uppercase tracking-wider">Portfolio Value</p>
          <p className="text-xl font-bold text-charcoal mt-1">$1,820</p>
          <p className="text-[10px] text-forest">+32.4% return</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-gold">
          <p className="text-[10px] text-gray uppercase tracking-wider">Next Payout</p>
          <p className="text-xl font-bold text-charcoal mt-1">$302</p>
          <p className="text-[10px] text-gray">Est. Dec 2026</p>
        </div>
      </div>

      {/* ── SECTION: YOUR FARM ── */}
      <div className="border-t border-forest/10 pt-6 mt-2">
        <h2 className="font-display text-xl font-bold text-charcoal mb-1">Your Farm</h2>
        <p className="text-xs text-gray mb-4">Live from Mukono, Uganda — your blocks, photos, and conditions</p>
      </div>

      {/* Farm Photos Gallery */}
      <FarmPhotos />

      {/* Block Cards — 2 equal columns */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {blocks.map((block) => (
            <div key={block.name} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="flex">
                <div className="relative w-32 shrink-0">
                  <Image src={block.image} alt={block.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/20" />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-charcoal">{block.name} — {block.subtitle}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      block.status === 'producing' ? 'bg-forest/10 text-forest' : 'bg-gold/20 text-charcoal'
                    }`}>
                      {block.status === 'producing' ? 'Producing' : 'Growing'}
                    </span>
                  </div>
                  <p className="text-xs text-gray">{block.trees} trees · {block.height} · Health {block.health}/10 · Yield {block.yieldPerTree}</p>

                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-gray mb-1">
                      <span>Growth</span>
                      <span>{block.progress}%</span>
                    </div>
                    <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${block.progress}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="h-full bg-forest rounded-full"
                      />
                    </div>
                    <p className="text-[10px] text-forest mt-1 font-medium">Next: {block.nextMilestone}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION: FINANCIALS ── */}
      <div className="border-t border-forest/10 pt-6 mt-2">
        <h2 className="font-display text-xl font-bold text-charcoal mb-1">Financials</h2>
        <p className="text-xs text-gray mb-4">Portfolio performance, payout history, and projections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PortfolioChart />
        <PayoutForecast />
      </div>

      {/* ── SECTION: ORCHARD STATUS ── */}
      <div className="border-t border-forest/10 pt-6 mt-2">
        <h2 className="font-display text-xl font-bold text-charcoal mb-1">Orchard Status</h2>
        <p className="text-xs text-gray mb-4">Growth stage and maturity progress</p>
      </div>

      <TreeGrowth stage={3} label="Your oldest trees are in the flowering stage — fruit expected in 6-8 months." />

      {/* Journey Timeline */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-charcoal uppercase tracking-wider">Your Investment Journey</h2>
          <button onClick={() => setShowAllTimeline(!showAllTimeline)} className="text-xs text-forest font-medium hover:underline">
            {showAllTimeline ? 'Show less' : `Show all (${timeline.length})`}
          </button>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3.75 top-2 bottom-2 w-px bg-cream-dark" />
          <div className="space-y-4">
            {visibleTimeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 z-10 ${
                  item.type === 'payout' ? 'bg-gold/20 text-charcoal' :
                  item.type === 'purchase' ? 'bg-forest/10 text-forest' :
                  item.type === 'milestone' ? 'bg-terra/10 text-terra' :
                  'bg-cream-dark text-gray'
                }`}>
                  {item.type === 'payout' ? '\u{1F4B0}' : item.type === 'purchase' ? '\u{1F4B3}' : item.type === 'milestone' ? '\u{1F31F}' : '\u{1F4CB}'}
                </div>
                <div className="flex-1 pb-1">
                  <p className={`text-sm ${item.highlight ? 'font-semibold text-charcoal' : 'text-charcoal/80'}`}>{item.event}</p>
                  <p className="text-xs text-gray">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 9: Certificate + Referral — 2 equal small cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ownership Certificate */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-forest/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">Ownership Certificate</p>
              <p className="text-xs text-gray">55 Hass Avocado Trees</p>
            </div>
          </div>
          <button className="w-full bg-forest/5 hover:bg-forest/10 text-forest py-2.5 rounded-lg text-sm font-medium transition-colors">
            Download Certificate (PDF)
          </button>
        </div>

        {/* Referral */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-charcoal mb-1">Refer a Friend</h3>
          <p className="text-xs text-gray mb-3">Share Avotein Farms and earn 2 free trees for every friend who invests.</p>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value="avoteinfarms.earth/ref/michael"
              className="flex-1 px-3 py-2 rounded-lg bg-cream-dark text-xs text-charcoal"
            />
            <button className="bg-forest text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-forest-light transition-colors">
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
