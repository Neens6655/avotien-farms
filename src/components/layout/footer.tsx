import Link from 'next/link'

const footerLinks = {
  Company: [
    { href: '/', label: 'About Us' },
    { href: '/', label: 'Our Team' },
    { href: '/blog', label: 'News' },
    { href: '/contact', label: 'Contact' },
  ],
  Invest: [
    { href: '/projects/farm-one', label: 'Current Projects' },
    { href: '/faq', label: 'FAQ' },
    { href: '/#calculator', label: 'ROI Calculator' },
    { href: '/checkout', label: 'Get Started' },
  ],
  Legal: [
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Risk Disclosure' },
    { href: '#', label: 'Cookie Policy' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Avotein Farms</h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              From seed to table. Capturing the avocado supply chain in Uganda.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-cream/70 hover:text-cream transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream/50">
            &copy; {new Date().getFullYear()} Avotein Farms Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-cream/50">Kampala, Uganda | hani@avoteinfarms.earth | +256 75 437 0246</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
