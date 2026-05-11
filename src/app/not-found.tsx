import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="pt-[72px] min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-6xl font-display font-bold text-forest mb-4">404</p>
        <h1 className="font-display text-2xl font-bold text-charcoal mb-3">Page Not Found</h1>
        <p className="text-sm text-gray mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="bg-forest hover:bg-forest-light text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
