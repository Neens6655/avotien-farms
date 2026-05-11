import { FaqAccordion } from '@/components/marketing/faq-accordion'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Avotien',
  description: 'Frequently asked questions about investing in avocado trees with Avotien.',
}

export default function FaqPage() {
  return (
    <div className="pt-[72px]">
      <FaqAccordion />
    </div>
  )
}
