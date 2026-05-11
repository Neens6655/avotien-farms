import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings — Avotien Admin',
}

const teamMembers = [
  { name: 'David Mukasa', email: 'david@avotien.com', role: 'super_admin', lastLogin: '2026-03-21' },
  { name: 'Sarah Namukwaya', email: 'sarah@avotien.com', role: 'operations', lastLogin: '2026-03-21' },
  { name: 'Aisha Nabatanzi', email: 'aisha@avotien.com', role: 'support', lastLogin: '2026-03-20' },
  { name: 'James Ochieng', email: 'james@avotien.com', role: 'admin', lastLogin: '2026-03-19' },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-charcoal">Settings</h1>
        <p className="text-sm text-gray mt-1">Admin team management and configuration</p>
      </div>

      {/* Team */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-charcoal">Team Members</h2>
          <button className="bg-forest hover:bg-forest-light text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            + Invite Member
          </button>
        </div>
        <div className="space-y-3">
          {teamMembers.map((m) => (
            <div key={m.email} className="flex items-center justify-between py-3 border-b border-cream-dark last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-forest">{m.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">{m.name}</p>
                  <p className="text-xs text-gray">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-forest bg-forest/10 px-2.5 py-1 rounded-full">{m.role.replace('_', ' ')}</span>
                <span className="text-xs text-gray">Last login: {m.lastLogin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-charcoal mb-4">Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-cream-dark">
            <div>
              <p className="text-sm font-medium text-charcoal">Supabase</p>
              <p className="text-xs text-gray">Database and storage connection</p>
            </div>
            <span className="text-xs font-semibold text-terra bg-terra/10 px-2.5 py-1 rounded-full">Not configured</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-cream-dark">
            <div>
              <p className="text-sm font-medium text-charcoal">Stripe</p>
              <p className="text-xs text-gray">Payment processing</p>
            </div>
            <span className="text-xs font-semibold text-terra bg-terra/10 px-2.5 py-1 rounded-full">Not configured</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-cream-dark">
            <div>
              <p className="text-sm font-medium text-charcoal">Clerk</p>
              <p className="text-xs text-gray">Authentication and user management</p>
            </div>
            <span className="text-xs font-semibold text-terra bg-terra/10 px-2.5 py-1 rounded-full">Not configured</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-charcoal">Resend</p>
              <p className="text-xs text-gray">Transactional email</p>
            </div>
            <span className="text-xs font-semibold text-terra bg-terra/10 px-2.5 py-1 rounded-full">Not configured</span>
          </div>
        </div>
      </div>
    </div>
  )
}
