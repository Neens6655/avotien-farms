export const faqCategories = ['HASS Fund', 'Returns', 'Operations', 'Impact'] as const

export type FaqCategory = typeof faqCategories[number]

export const faqs: { question: string; answer: string; category: FaqCategory }[] = [
  {
    category: 'HASS Fund',
    question: 'What is the HASS Fund?',
    answer: 'The HASS Fund promotes avocado farming through a farm management model. Avotein Farms manages your trees on our farms for a period of 20 years. You invest, we plant, cultivate, harvest, and sell — you receive your share of the revenue.',
  },
  {
    category: 'HASS Fund',
    question: 'How does the investment work?',
    answer: 'You purchase a block of Hass avocado trees on our managed farms in Uganda. Avotein handles all operations — from planting and irrigation to harvesting and export. Revenue from produce sales is shared with investors annually starting from year 4.',
  },
  {
    category: 'HASS Fund',
    question: 'What is the minimum investment?',
    answer: 'Our Seedling plan starts at $975 for 50 trees. Our most popular Grove plan is $4,875 for 250 trees (plus 25 bonus). For larger allocations, the Orchard plan starts at $19,500 for 1,000+ trees with land partnership options.',
  },
  {
    category: 'Returns',
    question: 'What returns can I expect?',
    answer: 'Projected investor returns average approximately 40% ROI per year starting from year 4, when trees reach full production. Years 1-3 are the growth period. The HASS Fund financial model shows revenue scaling from $350k in year 2 to $4.6m by year 6-7 per 1,000 acres.',
  },
  {
    category: 'Returns',
    question: 'When do payouts begin?',
    answer: 'Hass avocado trees begin producing fruit in year 3-4. Full production is reached around year 5-6. Annual payouts in USD begin once your trees start producing, with increasing yields each year as trees mature.',
  },
  {
    category: 'Returns',
    question: 'Where are the avocados sold?',
    answer: 'We capture the full supply chain: Export wholesale via reefer containers to Dubai, Jeddah, Kuwait (airway) and Spain (seaway). Retail locally through our "I Feel Pretty" brand in 7 Carrefour Uganda branches and top F&B venues in Kampala. We currently export 24 containers/year, scaling to 384.',
  },
  {
    category: 'Operations',
    question: 'How large are the farms?',
    answer: 'We have established two farms totaling 200 acres of cultivated Hass avocado, plus a 10,000-seedling nursery. Phase 1 targets 1,000 acres by 2026. Phase 2 adds 1,000 acres every 2 years with a 2,000sqm packhouse.',
  },
  {
    category: 'Operations',
    question: 'What is the logistics network?',
    answer: 'We are building a network of 12 collection centers and a fleet of 12 trucks connecting smallholder farms across Uganda to Kampala and export hubs. This logistics infrastructure is key to our supply chain capture — connecting farm to export.',
  },
  {
    category: 'Operations',
    question: 'What is BRIQUEEN bio-charcoal?',
    answer: 'BRIQUEEN is our eco-friendly bio-charcoal brand. Avocado pits and waste from oil processing are carbonized to produce high-heat, long-lasting briquettes. This reduces deforestation (replacing traditional charcoal from illegally collected firewood) and creates an additional revenue stream.',
  },
  {
    category: 'Impact',
    question: 'What is the social impact?',
    answer: 'Avotein Farms empowers over 1,000 smallholder farmers through our logistics hub and collection center network. We create jobs, build communities, enhance food security in Uganda, and align with government development interests through our partnership with the Uganda Investment Authority.',
  },
  {
    category: 'Impact',
    question: 'What about environmental sustainability?',
    answer: 'Our bio-charcoal production directly reduces deforestation by replacing traditional firewood charcoal. Avocado farming enhances soil fertility, and our sustainable cultivation practices protect Uganda\'s ecosystems while feeding global demand for organic produce.',
  },
  {
    category: 'Impact',
    question: 'Who are your partners?',
    answer: 'We partner with the Uganda Investment Authority, local and international NGOs, smallholder farmer cooperatives, and processing facilities for avocado oil and pineapple. Our retail partner Carrefour Uganda distributes our "I Feel Pretty" brand across 7 branches.',
  },
]
