'use client'

import { motion } from 'framer-motion'
import { team } from '@/data/team'

export function TeamSection() {
  return (
    <section className="py-20 md:py-28 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our Leadership
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Building Uganda&apos;s largest vertically integrated avocado supply chain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-sm"
            >
              <div className="w-24 h-24 rounded-full bg-forest/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-forest">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal">{member.name}</h3>
              <p className="text-terra text-sm font-medium mt-1">{member.role}</p>
              <p className="text-gray text-sm mt-3 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
