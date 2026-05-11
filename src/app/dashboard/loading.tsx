export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-40 bg-cream-dark rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="h-3 w-16 bg-cream-dark rounded animate-pulse mb-3" />
            <div className="h-8 w-20 bg-cream-dark rounded animate-pulse mb-2" />
            <div className="h-3 w-12 bg-cream-dark rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
