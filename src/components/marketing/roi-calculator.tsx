'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { calculateReturns, type CalculatorInput } from '@/lib/calculator'

export function RoiCalculator() {
  const [trees, setTrees] = useState(50)
  const [years, setYears] = useState(15)
  const [scenario, setScenario] = useState<CalculatorInput['scenario']>('moderate')

  const results = useMemo(
    () => calculateReturns({ trees, years, scenario }),
    [trees, years, scenario]
  )

  return (
    <section id="calculator" className="py-20 md:py-28 bg-cream-dark">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            HASS Fund Calculator
          </h2>
          <p className="text-gray max-w-2xl mx-auto text-lg">
            Project your returns from the HASS Fund based on Avotein Farms financial model.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-8">
              <div>
                <label className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-charcoal uppercase tracking-wider">Number of Trees</span>
                  <span className="text-2xl font-bold text-forest">{trees}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={5000}
                  value={trees}
                  onChange={(e) => setTrees(Number(e.target.value))}
                  aria-label="Number of trees"
                  className="w-full h-2 bg-cream-dark rounded-full appearance-none cursor-pointer accent-forest"
                />
                <div className="flex justify-between text-xs text-gray mt-1">
                  <span>1</span>
                  <span>5,000</span>
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-charcoal uppercase tracking-wider">Investment Horizon</span>
                  <span className="text-2xl font-bold text-forest">{years} years</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  aria-label="Investment horizon in years"
                  className="w-full h-2 bg-cream-dark rounded-full appearance-none cursor-pointer accent-forest"
                />
                <div className="flex justify-between text-xs text-gray mt-1">
                  <span>5 years</span>
                  <span>30 years</span>
                </div>
              </div>

              <div>
                <span className="text-sm font-semibold text-charcoal uppercase tracking-wider block mb-3">Scenario</span>
                <div className="flex gap-2">
                  {(['conservative', 'moderate', 'optimistic'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setScenario(s)}
                      className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors capitalize ${
                        scenario === s
                          ? 'bg-forest text-white'
                          : 'bg-cream-dark text-charcoal hover:bg-cream'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-4">
              <ResultCard label="Total Investment" value={`$${results.totalInvestment.toLocaleString()}`} />
              <ResultCard label="Annual Payout" value={`$${results.annualPayout.toLocaleString()}`} highlight />
              <ResultCard label="Cumulative Return" value={`$${results.cumulativeReturn.toLocaleString()}`} />
              <ResultCard label="ROI" value={`${results.roi}%`} highlight />
              <ResultCard label="CO2 Offset" value={`${results.co2Offset} tons`} span2 />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ResultCard({ label, value, highlight, span2 }: { label: string; value: string; highlight?: boolean; span2?: boolean }) {
  return (
    <div className={`bg-cream-dark rounded-xl p-5 ${span2 ? 'col-span-2' : ''}`}>
      <p className="text-xs font-semibold text-gray uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-terra' : 'text-charcoal'}`}>{value}</p>
    </div>
  )
}
