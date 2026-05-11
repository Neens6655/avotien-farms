'use client'

import Image from 'next/image'

const photos = [
  { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', caption: 'Block A — Mature canopy', date: 'Mar 2026' },
  { src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', caption: 'Block C — New saplings', date: 'Feb 2026' },
  { src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80', caption: 'Aerial view — Farm One', date: 'Jan 2026' },
  { src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80', caption: 'Harvest season', date: 'Dec 2025' },
  { src: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80', caption: 'Irrigation system', date: 'Nov 2025' },
  { src: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&q=80', caption: 'Western Highland view', date: 'Oct 2025' },
]

export function FarmPhotos() {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider">Latest from Your Farm</h3>
        <a href="/dashboard/updates" className="text-xs text-forest font-medium hover:underline">View all →</a>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {photos.map((photo, i) => (
          <div key={i} className="flex-shrink-0 w-44">
            <div className="relative h-28 rounded-xl overflow-hidden mb-1.5">
              <Image src={photo.src} alt={photo.caption} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <p className="text-xs text-charcoal font-medium truncate">{photo.caption}</p>
            <p className="text-[10px] text-gray">{photo.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
