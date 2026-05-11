'use client'

import { useState } from 'react'
import Link from 'next/link'

const templates = [
  { id: 'welcome', name: 'Welcome Email', description: 'Sent after first purchase', lastUsed: '2026-03-13', sends: 1420 },
  { id: 'quarterly', name: 'Quarterly Farm Update', description: 'Photos + yield + next steps', lastUsed: '2026-03-15', sends: 5680 },
  { id: 'payout', name: 'Payout Notification', description: 'Payment sent confirmation', lastUsed: '2026-03-14', sends: 356 },
  { id: 'harvest', name: 'Harvest Season Alert', description: 'Upcoming harvest notification', lastUsed: '2026-01-10', sends: 1420 },
  { id: 'photo', name: 'Farm Photo Update', description: 'New photos from the orchard', lastUsed: '2026-03-10', sends: 4260 },
  { id: 'milestone', name: 'Milestone Celebration', description: 'Tree growth milestones', lastUsed: '2026-02-01', sends: 890 },
]

const emailLog = [
  { subject: 'Q3 2026 Harvest Update — Your Trees Are Thriving', recipients: 1420, type: 'broadcast', sent: '2026-03-15 10:30 AM', opens: 892, clicks: 234, openRate: 62.8 },
  { subject: 'Payout Processed — $23,400 Distributed', recipients: 89, type: 'automated', sent: '2026-03-14 2:00 PM', opens: 87, clicks: 45, openRate: 97.8 },
  { subject: 'Welcome to Avotien — Your Trees Await!', recipients: 1, type: 'automated', sent: '2026-03-13 4:15 PM', opens: 1, clicks: 1, openRate: 100 },
  { subject: 'Farm Photo Update — Mukono Irrigation Complete', recipients: 1420, type: 'broadcast', sent: '2026-03-10 9:00 AM', opens: 756, clicks: 189, openRate: 53.2 },
  { subject: 'Your KYC Has Been Approved', recipients: 1, type: 'automated', sent: '2026-03-12 11:00 AM', opens: 1, clicks: 0, openRate: 100 },
  { subject: 'February Planting Report — Block C Complete', recipients: 1420, type: 'broadcast', sent: '2026-02-28 10:00 AM', opens: 834, clicks: 201, openRate: 58.7 },
]

const autoTriggers = [
  { name: 'Welcome Sequence', trigger: 'On first purchase', emails: 3, status: 'active', description: 'Day 0: Welcome → Day 3: Tree assignment → Day 7: Farm intro' },
  { name: 'KYC Approved', trigger: 'KYC status → approved', emails: 1, status: 'active', description: 'Confirms approval + next steps' },
  { name: 'Payout Sent', trigger: 'Bank transfer confirmed', emails: 1, status: 'active', description: 'Payment confirmation with amount + bank details' },
  { name: 'Quarterly Update', trigger: 'Every 3 months (auto)', emails: 1, status: 'active', description: 'Auto-generated farm report with photos + yield data' },
  { name: 'Tree Milestone', trigger: 'Tree health score ≥ 9', emails: 1, status: 'paused', description: 'Celebrates tree reaching excellent health' },
  { name: 'Re-engagement', trigger: '60 days no login', emails: 2, status: 'draft', description: 'Reminder email + new farm photos' },
]

export default function CommunicationsPage() {
  const [tab, setTab] = useState<'compose' | 'log' | 'templates' | 'automations'>('compose')
  const [composeData, setComposeData] = useState({
    audience: 'all',
    template: '',
    subject: '',
    body: '',
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">Communications Center</h1>
          <p className="text-xs text-gray mt-1">Broadcast, automate, and track investor communications</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-cream-dark/50">
          <p className="text-[10px] font-semibold text-gray uppercase tracking-wider">Total Sent</p>
          <p className="text-xl font-bold text-charcoal mt-1">14,286</p>
          <p className="text-[10px] text-forest">Lifetime</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-cream-dark/50">
          <p className="text-[10px] font-semibold text-gray uppercase tracking-wider">Avg Open Rate</p>
          <p className="text-xl font-bold text-charcoal mt-1">62.8%</p>
          <p className="text-[10px] text-forest">Industry avg: 21%</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-cream-dark/50">
          <p className="text-[10px] font-semibold text-gray uppercase tracking-wider">Avg Click Rate</p>
          <p className="text-xl font-bold text-charcoal mt-1">16.4%</p>
          <p className="text-[10px] text-forest">Industry avg: 2.6%</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-cream-dark/50">
          <p className="text-[10px] font-semibold text-gray uppercase tracking-wider">Active Automations</p>
          <p className="text-xl font-bold text-charcoal mt-1">4</p>
          <p className="text-[10px] text-gray">2 paused/draft</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-cream-dark/50 rounded-lg p-1">
        {(['compose', 'log', 'templates', 'automations'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-md text-xs font-semibold capitalize transition-colors ${
              tab === t ? 'bg-white text-charcoal shadow-sm' : 'text-gray hover:text-charcoal'
            }`}
          >
            {t === 'compose' ? 'Compose' : t === 'log' ? 'Email Log' : t === 'templates' ? 'Templates' : 'Automations'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'compose' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-cream-dark/50">
          <h2 className="text-sm font-bold text-charcoal mb-4">Compose Broadcast</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-gray uppercase tracking-wider block mb-1.5">Audience</label>
                <select value={composeData.audience} onChange={(e) => setComposeData({...composeData, audience: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest">
                  <option value="all">All Investors (1,420)</option>
                  <option value="seedling">Seedling Plan (340)</option>
                  <option value="grove">Grove Plan (890)</option>
                  <option value="orchard">Orchard Plan (190)</option>
                  <option value="us">United States (420)</option>
                  <option value="diaspora">Uganda Diaspora (280)</option>
                  <option value="kyc_pending">KYC Pending (45)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray uppercase tracking-wider block mb-1.5">Template</label>
                <select value={composeData.template} onChange={(e) => setComposeData({...composeData, template: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest">
                  <option value="">Start from scratch</option>
                  {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray uppercase tracking-wider block mb-1.5">Subject Line</label>
              <input type="text" value={composeData.subject} onChange={(e) => setComposeData({...composeData, subject: e.target.value})} placeholder="e.g., Your Trees Are Growing — March Update" className="w-full px-3 py-2 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray uppercase tracking-wider block mb-1.5">Message Body</label>
              <textarea value={composeData.body} onChange={(e) => setComposeData({...composeData, body: e.target.value})} rows={8} placeholder="Write your message to investors..." className="w-full px-3 py-2 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest resize-none font-body" />
              <p className="text-[10px] text-gray mt-1">Supports markdown. Variables: {'{{name}}'}, {'{{trees_count}}'}, {'{{total_invested}}'}, {'{{next_payout}}'}</p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <button className="bg-cream-dark hover:bg-cream text-charcoal px-4 py-2 rounded-lg text-xs font-medium transition-colors">
                  Attach Photos
                </button>
                <button className="bg-cream-dark hover:bg-cream text-charcoal px-4 py-2 rounded-lg text-xs font-medium transition-colors">
                  Preview
                </button>
              </div>
              <div className="flex gap-2">
                <button className="bg-cream-dark hover:bg-cream text-charcoal px-4 py-2 rounded-lg text-xs font-medium transition-colors">
                  Schedule
                </button>
                <button onClick={() => alert('Broadcast sent to 1,420 investors! (Demo)')} className="bg-terra hover:bg-terra-light text-white px-6 py-2 rounded-lg text-xs font-bold transition-colors">
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'log' && (
        <div className="bg-white rounded-xl shadow-sm border border-cream-dark/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-dark bg-cream-dark/30">
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray uppercase tracking-wider">Subject</th>
                  <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray uppercase tracking-wider">Recipients</th>
                  <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray uppercase tracking-wider">Opens</th>
                  <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray uppercase tracking-wider">Clicks</th>
                  <th className="text-right px-4 py-3 text-[10px] font-semibold text-gray uppercase tracking-wider">Open Rate</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-[10px] font-semibold text-gray uppercase tracking-wider">Sent</th>
                </tr>
              </thead>
              <tbody>
                {emailLog.map((email, i) => (
                  <tr key={i} className="border-b border-cream-dark/50 last:border-0 hover:bg-cream-dark/20">
                    <td className="px-4 py-3 text-xs font-medium text-charcoal max-w-[280px] truncate">{email.subject}</td>
                    <td className="px-4 py-3 text-xs text-right text-charcoal">{email.recipients.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-right text-charcoal">{email.opens.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-right text-charcoal">{email.clicks}</td>
                    <td className="px-4 py-3 text-xs text-right">
                      <span className={`font-bold ${email.openRate > 60 ? 'text-forest' : email.openRate > 40 ? 'text-charcoal' : 'text-terra'}`}>{email.openRate}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${email.type === 'broadcast' ? 'bg-terra/10 text-terra' : 'bg-forest/10 text-forest'}`}>{email.type}</span>
                    </td>
                    <td className="px-4 py-3 text-[10px] text-gray">{email.sent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div key={t.id} className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50 hover:shadow-md transition-shadow">
              <h3 className="text-sm font-bold text-charcoal">{t.name}</h3>
              <p className="text-xs text-gray mt-1">{t.description}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-cream-dark/50">
                <span className="text-[10px] text-gray">{t.sends.toLocaleString()} sends</span>
                <div className="flex gap-2">
                  <button className="text-[10px] text-forest font-semibold hover:underline">Edit</button>
                  <button className="text-[10px] text-terra font-semibold hover:underline">Use</button>
                </div>
              </div>
            </div>
          ))}
          <button className="border-2 border-dashed border-cream-dark rounded-xl p-5 flex flex-col items-center justify-center hover:border-forest/30 transition-colors">
            <span className="text-2xl mb-2">+</span>
            <span className="text-xs font-medium text-gray">Create Template</span>
          </button>
        </div>
      )}

      {tab === 'automations' && (
        <div className="space-y-3">
          {autoTriggers.map((auto, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-cream-dark/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-charcoal">{auto.name}</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      auto.status === 'active' ? 'bg-forest/10 text-forest' : auto.status === 'paused' ? 'bg-gold/20 text-charcoal' : 'bg-cream-dark text-gray'
                    }`}>{auto.status}</span>
                  </div>
                  <p className="text-xs text-gray mt-1">Trigger: <span className="text-charcoal font-medium">{auto.trigger}</span></p>
                  <p className="text-xs text-gray mt-0.5">{auto.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-xs text-gray">{auto.emails} email{auto.emails > 1 ? 's' : ''}</span>
                  <button className="text-xs text-forest font-semibold hover:underline">Configure</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
