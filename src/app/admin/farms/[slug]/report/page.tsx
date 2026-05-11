'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CropReportPage() {
  const [form, setForm] = useState({
    block: '',
    reportDate: new Date().toISOString().split('T')[0],
    yieldKg: '',
    healthScore: '8',
    weatherNotes: '',
    pestNotes: '',
    notes: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: POST to API → save to Supabase
    alert('Crop report submitted! (Demo — will save to Supabase when configured)')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/farms/mukono-hass" className="text-sm text-forest hover:underline">← Mukono Hass</Link>
        <span className="text-gray">/</span>
        <span className="text-sm text-charcoal font-medium">New Crop Report</span>
      </div>

      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-bold text-charcoal mb-6">Submit Crop Report</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">Block</label>
              <select
                value={form.block}
                onChange={(e) => setForm({ ...form, block: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest"
              >
                <option value="">Select block</option>
                <option value="A">Block A</option>
                <option value="B">Block B</option>
                <option value="C">Block C</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">Report Date</label>
              <input
                type="date"
                value={form.reportDate}
                onChange={(e) => setForm({ ...form, reportDate: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">Yield (kg)</label>
              <input
                type="number"
                value={form.yieldKg}
                onChange={(e) => setForm({ ...form, yieldKg: e.target.value })}
                placeholder="e.g., 2300"
                className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">Health Score (1-10)</label>
              <input
                type="range"
                min={1}
                max={10}
                value={form.healthScore}
                onChange={(e) => setForm({ ...form, healthScore: e.target.value })}
                className="w-full accent-forest mt-2"
              />
              <div className="flex justify-between text-xs text-gray mt-1">
                <span>Poor (1)</span>
                <span className="font-bold text-forest">{form.healthScore}/10</span>
                <span>Excellent (10)</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">Weather Notes</label>
            <input
              type="text"
              value={form.weatherNotes}
              onChange={(e) => setForm({ ...form, weatherNotes: e.target.value })}
              placeholder="e.g., Sunny, 28°C, light winds"
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">Pest / Disease Notes</label>
            <input
              type="text"
              value={form.pestNotes}
              onChange={(e) => setForm({ ...form, pestNotes: e.target.value })}
              placeholder="Any pest or disease observations..."
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">General Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Overall observations, actions taken, recommendations..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">Photos</label>
            <div className="border-2 border-dashed border-cream-dark rounded-xl p-8 text-center">
              <p className="text-sm text-gray">Drag & drop photos or click to upload</p>
              <p className="text-xs text-gray mt-1">PNG, JPG up to 10MB each</p>
              <input type="file" multiple accept="image/*" className="hidden" />
              <button type="button" className="mt-3 text-sm text-forest font-medium hover:underline">
                Browse Files
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-forest hover:bg-forest-light text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">
              Submit Report
            </button>
            <Link href="/admin/farms/mukono-hass" className="bg-cream-dark hover:bg-cream text-charcoal px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
