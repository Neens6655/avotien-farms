'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavIcon({ name, className }: { name: string; className?: string }) {
  const cls = className || 'w-5 h-5'
  const icons: Record<string, React.ReactNode> = {
    overview: <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
    trees: <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-6m0 0l-3-3m3 3l3-3m-3-3V3m0 0L9 6m3-3l3 3" /></svg>,
    payouts: <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    documents: <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    updates: <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>,
    support: <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796l-3.448 4.138m5.716-.37l-4.138 3.448M7.288 19.67l3.448-4.138m-3.448 4.138a9.027 9.027 0 01-1.306-1.652m1.306 1.652a9.014 9.014 0 01-.001-9.424m1.307 7.772l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.958 5.976a3.736 3.736 0 01-.88 1.388 3.737 3.737 0 01-1.388.88m2.268-2.268a3.765 3.765 0 010-2.528m-2.268 4.796l3.448-4.138m-5.716.37l4.138-3.448" /></svg>,
  }
  return <>{icons[name] || null}</>
}

const sidebarLinks = [
  { href: '/dashboard', label: 'Overview', icon: 'overview' },
  { href: '/dashboard/trees', label: 'My Trees', icon: 'trees' },
  { href: '/dashboard/payouts', label: 'Payouts', icon: 'payouts' },
  { href: '/dashboard/documents', label: 'Documents', icon: 'documents' },
  { href: '/dashboard/updates', label: 'Farm Updates', icon: 'updates' },
  { href: '/dashboard/support', label: 'Support', icon: 'support' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="pt-[72px] min-h-screen bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl p-4 shadow-sm">
              {/* Investor Profile */}
              <div className="p-4 mb-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-sm font-bold text-cream">
                    MJ
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Michael Johnson</p>
                    <span className="text-[10px] font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded-full">Grove Plan</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-cream-dark rounded-lg py-1.5">
                    <p className="text-sm font-bold text-charcoal">55</p>
                    <p className="text-[9px] text-gray">Trees</p>
                  </div>
                  <div className="bg-cream-dark rounded-lg py-1.5">
                    <p className="text-sm font-bold text-forest">$445</p>
                    <p className="text-[9px] text-gray">Earned</p>
                  </div>
                </div>
              </div>
              <hr className="border-cream-dark mx-4 mb-2" />
              <ul className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = link.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname.startsWith(link.href)
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-forest/10 text-forest font-semibold'
                            : 'text-charcoal hover:bg-cream-dark'
                        }`}
                      >
                        <NavIcon name={link.icon} />
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
