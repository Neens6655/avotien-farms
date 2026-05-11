export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-48 bg-cream-dark rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="h-3 w-20 bg-cream-dark rounded animate-pulse mb-3" />
            <div className="h-8 w-24 bg-cream-dark rounded animate-pulse mb-2" />
            <div className="h-3 w-16 bg-cream-dark rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="h-5 w-32 bg-cream-dark rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-cream-dark rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
