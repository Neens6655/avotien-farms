import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Cancelled — Avotien',
}

export default function CheckoutCancelPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-cream flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-terra/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">😕</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-charcoal mb-3">
          Payment Cancelled
        </h1>
        <p className="text-gray mb-8">
          No worries — your payment was not processed. You can try again whenever you&apos;re ready.
        </p>
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block bg-terra hover:bg-terra-light text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="block text-forest hover:underline text-sm font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
