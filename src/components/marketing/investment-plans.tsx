'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PLANS } from '@/lib/constants'

export function InvestmentPlans() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Investment Plans
          </h2>
          <p className="text-gray max-w-2xl mx-auto text-lg">
            Choose a plan that matches your goals. Start small and grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col ${
                plan.popular ? 'ring-2 ring-terra' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terra text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="h-1.5 rounded-full mb-5" style={{ background: plan.popular ? 'var(--color-terra)' : 'var(--color-forest)' }} />
              <h3 className="font-display text-2xl font-bold text-charcoal">{plan.name}</h3>
              <p className="text-gray text-sm mt-2 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-forest">{plan.priceLabel}</span>
                <span className="text-gray text-sm ml-2">
                  / {plan.trees} tree{plan.trees > 1 ? 's' : ''}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/checkout"
                className={`block text-center py-3.5 rounded-full font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-terra hover:bg-terra-light text-white'
                    : 'bg-forest hover:bg-forest-light text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
