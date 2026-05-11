import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Knowledge Hub — Avotein Farms',
  description: 'Research, market intelligence, and investor education about Hass avocado farming in Uganda.',
}

const categories = ['All', 'Research', 'Market Intelligence', 'Farm Science', 'Investor Education', 'Impact'] as const

const articles = [
  {
    slug: 'hass-fund-launch',
    title: 'HASS Fund Launch — Projected 40% ROI from Year 4',
    date: '2025-01-20',
    category: 'Investor Education',
    readTime: '5 min',
    excerpt: 'Avotein Farms launches the HASS Fund — our flagship investment offering managing Hass avocado trees for 20 years.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d80f73?w=600&q=80',
    featured: true,
  },
  {
    slug: 'uganda-avocado-opportunity',
    title: 'Why Uganda Is the Next Global Avocado Powerhouse',
    date: '2025-03-15',
    category: 'Research',
    readTime: '12 min',
    excerpt: 'Uganda sits at the epicenter of the global avocado revolution. Equatorial climate, volcanic soils, and 1,000-2,000m altitude create conditions that rival Kenya and Peru. With labor costs 60% below competitors and direct air freight to the Middle East, Uganda\'s avocado industry is projected to reach $400M in exports by 2030.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80',
    featured: true,
  },
  {
    slug: 'hass-avocado-science',
    title: 'The Science of Hass Avocado Cultivation in East Africa',
    date: '2025-02-28',
    category: 'Farm Science',
    readTime: '10 min',
    excerpt: 'Hass avocados (Persea americana) thrive at 1,000-2,000m altitude with 1,200-1,800mm annual rainfall. Uganda\'s central highlands offer optimal conditions: ferralitic clay loams with pH 5.5-6.5, mean temperatures of 18-25\u00B0C, and 12-hour photoperiod year-round.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    featured: false,
  },
  {
    slug: 'global-avocado-market-2025',
    title: 'Global Avocado Market Report 2025 — $23B by 2030',
    date: '2025-03-01',
    category: 'Market Intelligence',
    readTime: '8 min',
    excerpt: 'The global avocado market reached $17.3B in 2024, growing at 7.3% CAGR. Demand from the Middle East grew 34% YoY, with UAE importing 45,000 tons. European demand led by the UK, Germany, and France, with Spain as the gateway port for East African producers.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    featured: false,
  },
  {
    slug: 'carrefour-partnership',
    title: 'I Feel Pretty Now in 7 Carrefour Uganda Branches',
    date: '2025-02-15',
    category: 'Market Intelligence',
    readTime: '4 min',
    excerpt: 'Our retail brand "I Feel Pretty" Hass Avocados is now available in all 7 Carrefour Uganda branches, retailing at $1.8/kg.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    featured: false,
  },
  {
    slug: 'export-expansion',
    title: 'Reefer Export: From 24 to 384 Containers Per Year',
    date: '2025-03-10',
    category: 'Market Intelligence',
    readTime: '6 min',
    excerpt: 'Our reefer export operation is scaling rapidly — shipping Hass avocados by air to Dubai, Jeddah, Kuwait, and by sea to Spain.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=600&q=80',
    featured: false,
  },
  {
    slug: 'bio-charcoal-circular-economy',
    title: 'BRIQUEEN: How Avocado Waste Becomes Clean Energy',
    date: '2025-02-01',
    category: 'Impact',
    readTime: '7 min',
    excerpt: 'Each year, Uganda loses 90,000 hectares of forest to charcoal production. BRIQUEEN bio-charcoal from avocado waste offers an alternative: high-heat, low-smoke briquettes that burn longer than wood charcoal while reducing deforestation.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
    featured: false,
  },
  {
    slug: 'smallholder-farmer-impact',
    title: '1,000 Farmers Connected: Building Uganda\'s Agricultural Middle Class',
    date: '2025-01-28',
    category: 'Impact',
    readTime: '9 min',
    excerpt: 'Our logistics hub network connects 1,000+ smallholder farmers to global markets. 12 collection centers aggregate produce from farms as small as 1 acre, providing fair-market pricing, quality grading, and cold-chain access.',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&q=80',
    featured: false,
  },
  {
    slug: 'avocado-nutrition-health',
    title: 'Avocado: The Superfood Driving $23B in Global Demand',
    date: '2025-01-15',
    category: 'Research',
    readTime: '6 min',
    excerpt: 'Hass avocados contain 20 vitamins and minerals, 7g of fiber, and 15g of heart-healthy monounsaturated fat per 100g. The health-conscious consumer segment grew 45% in 5 years, driving wholesale prices to $2.50-3.50/kg for export-grade fruit.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80',
    featured: false,
  },
  {
    slug: 'farm-management-model',
    title: 'Understanding the 20-Year Farm Management Agreement',
    date: '2025-01-10',
    category: 'Investor Education',
    readTime: '8 min',
    excerpt: 'The HASS Fund operates on a 20-year farm management model. Investors purchase trees; Avotein handles planting, cultivation, irrigation, harvesting, grading, packaging, and export. Revenue is shared 60/40 (investor/Avotein) after operational costs.',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&q=80',
    featured: false,
  },
  {
    slug: 'uganda-investment-climate',
    title: 'Uganda Investment Climate 2025: Government Incentives & Tax Benefits',
    date: '2025-02-20',
    category: 'Research',
    readTime: '11 min',
    excerpt: 'The Uganda Investment Authority offers tax holidays of up to 10 years for agricultural investments exceeding $300,000. Zero export tax on fresh produce, streamlined land acquisition, and bilateral investment treaties with 15 countries protect foreign investors.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80',
    featured: false,
  },
]

export default function KnowledgeHubPage() {
  const featured = articles.filter(a => a.featured)
  const rest = articles.filter(a => !a.featured)

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-forest py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-3">Knowledge Hub</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Research, Intelligence & Education
          </h1>
          <p className="text-cream/60 text-lg max-w-2xl">
            Deep research on Hass avocado farming, Ugandan agriculture, global market dynamics, and sustainable investment. Everything you need to make informed decisions.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {featured.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] font-semibold text-gold uppercase tracking-wider">{article.category}</span>
                      <h2 className="font-display text-xl font-bold text-white mt-1 group-hover:text-gold transition-colors">{article.title}</h2>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-sm text-gray leading-relaxed flex-1">{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-dark">
                      <span className="text-xs text-gray">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="text-xs text-forest font-medium">{article.readTime} read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* All Articles Grid */}
          <h2 className="font-display text-2xl font-bold text-charcoal mb-6">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-forest px-2.5 py-1 rounded-full">{article.category}</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-display text-sm font-bold text-charcoal mb-2 group-hover:text-forest transition-colors">{article.title}</h3>
                    <p className="text-xs text-gray leading-relaxed flex-1 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-dark">
                      <span className="text-[10px] text-gray">{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-[10px] text-forest font-medium">{article.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
