'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 md:py-28 bg-forest">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            Join the Avotein Network
          </h2>
          <p className="text-cream/70 mb-8">
            Get updates on HASS Fund performance, farm progress, and new investment opportunities.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-cream text-charcoal placeholder:text-gray text-sm focus:outline-none focus:ring-2 focus:ring-terra"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-terra hover:bg-terra-light text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {status === 'success' && (
            <p className="text-sm text-cream/80 mt-4">Welcome aboard! Check your inbox.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-terra-light mt-4">Something went wrong. Please try again.</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
