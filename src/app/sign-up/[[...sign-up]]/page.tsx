import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up — Avotien',
}

export default function SignUpPage() {
  return (
    <div className="pt-[72px] min-h-screen bg-cream flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <h1 className="font-display text-3xl font-bold text-charcoal mb-2">Start Investing</h1>
          <p className="text-gray text-sm mb-8">Create your Avotien account in 60 seconds</p>

          {/* Placeholder — replace with <SignUp /> when Clerk is configured */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name"
                className="w-full px-4 py-3 rounded-lg border border-gray/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-lg border border-gray/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg border border-gray/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            />
            <input
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-3 rounded-lg border border-gray/20 text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            />
            <button className="w-full bg-terra hover:bg-terra-light text-white py-3 rounded-full font-semibold transition-colors">
              Create Account
            </button>
          </div>

          <p className="text-xs text-gray mt-6">
            Already have an account?{' '}
            <a href="/sign-in" className="text-forest font-medium hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}
