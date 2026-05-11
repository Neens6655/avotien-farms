'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    step: '01',
    title: 'Join the HASS Fund',
    description: 'Choose your investment plan. Avotein plants and manages your Hass avocado trees on our 200+ acre farms in Uganda.',
  },
  {
    step: '02',
    title: 'We Grow & Export',
    description: 'Our team handles cultivation, irrigation, harvesting, and exports to Dubai, Spain, and local retail via Carrefour Uganda.',
  },
  {
    step: '03',
    title: 'Earn Annual Returns',
    description: 'Receive USD payouts from harvest revenue starting year 4. Projected ~40% ROI annually over a 20-year managed period.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-cream-dark border-t border-forest/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            How It Works
          </h2>
          <p className="text-gray max-w-2xl mx-auto text-lg">
            Three simple steps to owning your avocado trees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-forest text-white font-display text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                {item.step}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-forest/20" />
              )}
              <h3 className="font-display text-2xl font-semibold text-charcoal mb-3">{item.title}</h3>
              <p className="text-gray leading-relaxed max-w-xs mx-auto">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
