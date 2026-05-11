'use client'

import { useState } from 'react'
import { PLANS } from '@/lib/constants'

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    if (!selectedPlan) return
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: selectedPlan }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Failed to create checkout session')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-[72px] min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-bold text-charcoal text-center mb-4">
          Choose Your Plan
        </h1>
        <p className="text-gray text-center mb-12">
          Select a plan and complete your purchase securely via Stripe.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative bg-white rounded-2xl p-6 text-left transition-all ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-terra shadow-md scale-[1.02]'
                  : 'shadow-sm hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terra text-white text-xs font-semibold px-3 py-0.5 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-charcoal">{plan.name}</h3>
              <p className="text-gray text-sm mt-1 mb-3">{plan.description}</p>
              <p className="text-3xl font-bold text-forest">{plan.priceLabel}</p>
              <p className="text-xs text-gray mt-1">{plan.trees} tree{plan.trees > 1 ? 's' : ''}</p>

              {selectedPlan === plan.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-terra rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleCheckout}
            disabled={!selectedPlan || loading}
            className="bg-terra hover:bg-terra-light text-white px-10 py-4 rounded-full text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-terra/20"
          >
            {loading ? 'Redirecting to Stripe...' : 'Proceed to Payment'}
          </button>
          <p className="text-xs text-gray mt-4">
            Secured by Stripe. Your payment information is encrypted.
          </p>
        </div>
      </div>
    </div>
  )
}
