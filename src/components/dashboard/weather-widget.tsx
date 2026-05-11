export function WeatherWidget() {
  return (
    <div className="bg-forest rounded-xl p-4 text-cream">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-cream/50 text-[10px] uppercase tracking-wider">Mukono, Uganda</p>
          <p className="text-2xl font-bold mt-0.5">28°C</p>
          <p className="text-xs text-cream/60">Partly cloudy</p>
        </div>
        <div className="text-right">
          <p className="text-3xl">⛅</p>
          <p className="text-[10px] text-cream/50 mt-1">Rainy season</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-cream/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs font-bold text-cream">1,200mm</p>
          <p className="text-[9px] text-cream/50">Annual rain</p>
        </div>
        <div>
          <p className="text-xs font-bold text-cream">78%</p>
          <p className="text-[9px] text-cream/50">Humidity</p>
        </div>
        <div>
          <p className="text-xs font-bold text-cream">12km/h</p>
          <p className="text-[9px] text-cream/50">Wind</p>
        </div>
      </div>
      <p className="text-[10px] text-cream/40 mt-3 italic">Your trees are drinking deep in the rainy season — optimal growth conditions.</p>
    </div>
  )
}
