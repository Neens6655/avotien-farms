'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-terra/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-3">Something went wrong</h2>
        <p className="text-sm text-gray mb-6">{error.message || 'An unexpected error occurred. Please try again.'}</p>
        <button
          onClick={reset}
          className="bg-forest hover:bg-forest-light text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
