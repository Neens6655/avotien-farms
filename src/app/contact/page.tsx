import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Avotein Farms',
  description: 'Get in touch with the Avotein Farms team.',
}

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">Contact Us</h1>
          <p className="text-gray text-lg mb-10">
            Have questions? We would love to hear from you. Reach out to our team.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-charcoal mb-2">Uganda Office</h3>
              <p className="text-sm text-gray">Avotein Farms Ltd., Kampala, Uganda</p>
              <p className="text-sm text-forest mt-2">+256 75 437 0246</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-charcoal mb-2">Email & Web</h3>
              <p className="text-sm text-gray">General inquiries</p>
              <p className="text-sm text-forest mt-2">hani@avoteinfarms.earth</p>
              <p className="text-sm text-gray mt-3">Website</p>
              <p className="text-sm text-forest mt-1">www.avoteinfarms.earth</p>
            </div>
          </div>

          {/* Calendly embed placeholder */}
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <h3 className="font-display text-2xl font-bold text-charcoal mb-3">Book a Call</h3>
            <p className="text-gray text-sm mb-6">
              Schedule a 15-minute call with our investor relations team.
            </p>
            <a
              href="#"
              className="inline-block bg-forest hover:bg-forest-light text-white px-8 py-3.5 rounded-full font-semibold transition-colors"
            >
              Schedule on Calendly
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
