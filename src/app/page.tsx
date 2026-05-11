import { Hero } from '@/components/marketing/hero'
import { WhyAvotien } from '@/components/marketing/why-avotien'
import { SupplyChain } from '@/components/marketing/supply-chain'
import { HowItWorks } from '@/components/marketing/how-it-works'
import { RoiCalculator } from '@/components/marketing/roi-calculator'
import { ImpactStats } from '@/components/marketing/impact-stats'
import { InvestmentPlans } from '@/components/marketing/investment-plans'
import { Testimonials } from '@/components/marketing/testimonials'
import { TeamSection } from '@/components/marketing/team-section'
import { FaqAccordion } from '@/components/marketing/faq-accordion'
import { FarmGallery } from '@/components/marketing/farm-gallery'
import { NewsletterForm } from '@/components/marketing/newsletter-form'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyAvotien />
      <SupplyChain />
      <RoiCalculator />
      <ImpactStats />
      <InvestmentPlans />
      <HowItWorks />
      <FarmGallery />
      <Testimonials />
      <TeamSection />
      <FaqAccordion />
      <NewsletterForm />
    </>
  )
}
