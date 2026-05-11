import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Purchase Successful — Avotien',
}

export default function CheckoutSuccessPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-cream flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🌳</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-charcoal mb-3">
          Welcome to the Orchard!
        </h1>
        <p className="text-gray mb-8">
          Your purchase was successful. Your trees are being assigned and you&apos;ll receive a confirmation email shortly with your ownership certificate.
        </p>
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block bg-forest hover:bg-forest-light text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Go to Dashboard
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
