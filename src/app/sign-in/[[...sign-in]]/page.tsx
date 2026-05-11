import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — Avotien',
}

export default function SignInPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-cream flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <h1 className="font-display text-3xl font-bold text-charcoal mb-2">Welcome Back</h1>
          <p className="text-gray text-sm mb-8">Sign in to your Avotien investor account</p>

          {/* Placeholder — replace with <SignIn /> when Clerk is configured */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg border border-gray/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            />
            <button className="w-full bg-forest hover:bg-forest-light text-white py-3 rounded-full font-semibold transition-colors">
              Sign In
            </button>
          </div>

          <p className="text-xs text-gray mt-6">
            Don&apos;t have an account?{' '}
            <a href="/sign-up" className="text-forest font-medium hover:underline">Create one</a>
          </p>
        </div>
      </div>
    </div>
  )
}
