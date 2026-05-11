export default function Loading() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-cream-dark border-t-forest animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray">Loading...</p>
      </div>
    </div>
  )
}
