'use client'

import React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const investors = [
  { id: 1, name: 'Michael Johnson', email: 'michael@example.com', country: 'US', plan: 'Grove', trees: 55, invested: 1375, paidToDate: 1375, outstanding: 0, lastPayment: '2026-02-15', kycStatus: 'verified' as const, status: 'active' as const, joinDate: '2025-03-01', payouts: [{ date: '2025-12', amount: 247 }], notes: 'Interested in expanding to Orchard plan.' },
  { id: 2, name: 'Fatima Al-Hassan', email: 'fatima@example.com', country: 'AE', plan: 'Grove', trees: 100, invested: 4875, paidToDate: 4875, outstanding: 0, lastPayment: '2025-06-10', kycStatus: 'verified' as const, status: 'active' as const, joinDate: '2025-05-15', payouts: [{ date: '2025-12', amount: 550 }], notes: '' },
  { id: 3, name: 'Robert Chen', email: 'robert@example.com', country: 'CA', plan: 'Seedling', trees: 50, invested: 975, paidToDate: 975, outstanding: 0, lastPayment: '2025-08-20', kycStatus: 'verified' as const, status: 'active' as const, joinDate: '2025-08-01', payouts: [], notes: 'Trees not yet producing.' },
  { id: 4, name: 'Amara Kiggundu', email: 'amara@example.com', country: 'UK', plan: 'Orchard', trees: 200, invested: 19500, paidToDate: 14625, outstanding: 4875, lastPayment: '2026-01-05', kycStatus: 'verified' as const, status: 'partial' as const, joinDate: '2025-01-10', payouts: [{ date: '2025-12', amount: 1100 }], notes: 'Payment plan: 4 installments. 1 remaining.' },
  { id: 5, name: 'Jennifer Wu', email: 'jennifer@example.com', country: 'US', plan: 'Grove', trees: 55, invested: 1375, paidToDate: 1375, outstanding: 0, lastPayment: '2026-03-20', kycStatus: 'verified' as const, status: 'active' as const, joinDate: '2026-03-20', payouts: [], notes: 'New investor — just purchased today.' },
  { id: 6, name: 'David Kim', email: 'david.kim@example.com', country: 'KR', plan: 'Seedling', trees: 50, invested: 975, paidToDate: 650, outstanding: 325, lastPayment: '2025-11-15', kycStatus: 'pending' as const, status: 'overdue' as const, joinDate: '2025-09-01', payouts: [], notes: 'Payment overdue 45 days. 2 reminders sent.' },
  { id: 7, name: 'Kwame Asante', email: 'kwame@example.com', country: 'GH', plan: 'Orchard', trees: 500, invested: 19500, paidToDate: 19500, outstanding: 0, lastPayment: '2026-03-18', kycStatus: 'verified' as const, status: 'active' as const, joinDate: '2025-02-20', payouts: [{ date: '2025-12', amount: 2750 }], notes: 'VIP investor. Referred 3 others.' },
  { id: 8, name: 'Priya Sharma', email: 'priya@example.com', country: 'IN', plan: 'Grove', trees: 55, invested: 1375, paidToDate: 1375, outstanding: 0, lastPayment: '2026-03-15', kycStatus: 'verified' as const, status: 'active' as const, joinDate: '2026-03-15', payouts: [], notes: '' },
  { id: 9, name: 'Carlos Rodriguez', email: 'carlos@example.com', country: 'MX', plan: 'Seedling', trees: 50, invested: 975, paidToDate: 0, outstanding: 975, lastPayment: '', kycStatus: 'rejected' as const, status: 'overdue' as const, joinDate: '2026-02-01', payouts: [], notes: 'KYC failed — ID expired. Re-submitted.' },
  { id: 10, name: 'Maria Gonzalez', email: 'maria@example.com', country: 'ES', plan: 'Grove', trees: 250, invested: 4875, paidToDate: 4875, outstanding: 0, lastPayment: '2025-07-01', kycStatus: 'verified' as const, status: 'active' as const, joinDate: '2025-06-15', payouts: [{ date: '2025-12', amount: 1375 }], notes: 'Discovered us through Spain export.' },
]

const statusConfig = {
  active: { label: 'Active', bg: 'bg-forest/10', text: 'text-forest' },
  partial: { label: 'Partial', bg: 'bg-gold/20', text: 'text-charcoal' },
  overdue: { label: 'Overdue', bg: 'bg-red-100', text: 'text-red-700' },
}

const kycConfig = {
  verified: { label: 'Verified', bg: 'bg-forest/10', text: 'text-forest' },
  pending: { label: 'Pending', bg: 'bg-gold/20', text: 'text-charcoal' },
  rejected: { label: 'Rejected', bg: 'bg-red-100', text: 'text-red-700' },
}

type StatusFilter = 'all' | 'active' | 'partial' | 'overdue'

export default function InvestorsCRMPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showCompose, setShowCompose] = useState<number | null>(null)

  const filtered = investors.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(search.toLowerCase()) || inv.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalAUM = investors.reduce((sum, inv) => sum + inv.paidToDate, 0)
  const totalOutstanding = investors.reduce((sum, inv) => sum + inv.outstanding, 0)
  const overdueCount = investors.filter(inv => inv.status === 'overdue').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">Investor CRM</h1>
          <p className="text-sm text-gray">{investors.length} investors · Manage payments, KYC, and communications</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-cream-dark hover:bg-cream text-charcoal px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Export CSV
          </button>
          <button className="bg-terra hover:bg-terra-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Send Bulk Reminder
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray uppercase tracking-wider">Total AUM</p>
          <p className="text-2xl font-bold text-charcoal mt-1">${totalAUM.toLocaleString()}</p>
          <p className="text-xs text-forest">{investors.length} investors</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray uppercase tracking-wider">Outstanding</p>
          <p className="text-2xl font-bold text-terra mt-1">${totalOutstanding.toLocaleString()}</p>
          <p className="text-xs text-gray">{investors.filter(i => i.outstanding > 0).length} investors</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray uppercase tracking-wider">Overdue</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{overdueCount}</p>
          <p className="text-xs text-gray">Need attention</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray uppercase tracking-wider">Avg Investment</p>
          <p className="text-2xl font-bold text-charcoal mt-1">${Math.round(totalAUM / investors.length).toLocaleString()}</p>
          <p className="text-xs text-gray">Per investor</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search investors by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'partial', 'overdue'] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === s ? 'bg-forest text-white' : 'bg-white text-charcoal hover:bg-cream-dark'
              }`}
            >
              {s === 'all' ? 'All' : s} {s !== 'all' && `(${investors.filter(i => i.status === s).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Investor List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream-dark/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray uppercase tracking-wider">Investor</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray uppercase tracking-wider">Plan</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray uppercase tracking-wider">Paid</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray uppercase tracking-wider">Outstanding</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray uppercase tracking-wider">KYC</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <React.Fragment key={inv.id}>
                  <tr
                    onClick={() => setExpandedId(expandedId === inv.id ? null : inv.id)}
                    className={`border-b border-cream-dark last:border-0 cursor-pointer transition-colors ${
                      expandedId === inv.id ? 'bg-cream-dark/30' : 'hover:bg-cream-dark/20'
                    } ${inv.status === 'overdue' ? 'bg-red-50/50' : ''}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-xs font-bold text-forest">
                          {inv.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">{inv.name}</p>
                          <p className="text-xs text-gray">{inv.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-sm text-charcoal">{inv.plan}</p>
                      <p className="text-xs text-gray">{inv.trees} trees</p>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <p className="text-sm font-medium text-charcoal">${inv.paidToDate.toLocaleString()}</p>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <p className={`text-sm font-medium ${inv.outstanding > 0 ? 'text-red-600' : 'text-forest'}`}>
                        {inv.outstanding > 0 ? `$${inv.outstanding.toLocaleString()}` : '—'}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${kycConfig[inv.kycStatus].bg} ${kycConfig[inv.kycStatus].text}`}>
                        {kycConfig[inv.kycStatus].label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusConfig[inv.status].bg} ${statusConfig[inv.status].text}`}>
                        {statusConfig[inv.status].label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowCompose(inv.id) }}
                          className="p-1.5 rounded-lg hover:bg-cream-dark text-gray hover:text-forest transition-colors"
                          title="Send email"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </button>
                        <Link
                          href={`/admin/investors/${inv.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg hover:bg-cream-dark text-gray hover:text-forest transition-colors"
                          title="View profile"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  <AnimatePresence>
                    {expandedId === inv.id && (
                      <tr>
                        <td colSpan={7} className="px-5 pb-4">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-cream/50 rounded-xl p-4 mt-1">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Payment History */}
                                <div>
                                  <h4 className="text-xs font-semibold text-gray uppercase tracking-wider mb-2">Payment History</h4>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray">Initial Investment</span>
                                      <span className="font-medium text-charcoal">${inv.invested.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray">Paid to Date</span>
                                      <span className="font-medium text-forest">${inv.paidToDate.toLocaleString()}</span>
                                    </div>
                                    {inv.outstanding > 0 && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray">Outstanding</span>
                                        <span className="font-medium text-red-600">${inv.outstanding.toLocaleString()}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray">Last Payment</span>
                                      <span className="text-charcoal">{inv.lastPayment || 'None'}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Payouts */}
                                <div>
                                  <h4 className="text-xs font-semibold text-gray uppercase tracking-wider mb-2">Payouts Sent</h4>
                                  {inv.payouts.length > 0 ? (
                                    <div className="space-y-2">
                                      {inv.payouts.map((p, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                          <span className="text-gray">{p.date}</span>
                                          <span className="font-medium text-forest">${p.amount.toLocaleString()}</span>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray">No payouts yet</p>
                                  )}
                                </div>

                                {/* Quick Actions */}
                                <div>
                                  <h4 className="text-xs font-semibold text-gray uppercase tracking-wider mb-2">Quick Actions</h4>
                                  <div className="space-y-2">
                                    <button
                                      onClick={() => setShowCompose(inv.id)}
                                      className="w-full text-left text-sm text-forest hover:underline"
                                    >
                                      Send Payment Reminder
                                    </button>
                                    <button className="w-full text-left text-sm text-forest hover:underline">
                                      Upload Document
                                    </button>
                                    <button className="w-full text-left text-sm text-forest hover:underline">
                                      Record Payment
                                    </button>
                                    <button className="w-full text-left text-sm text-forest hover:underline">
                                      Add Note
                                    </button>
                                  </div>
                                  {inv.notes && (
                                    <div className="mt-3 p-2 bg-white rounded-lg">
                                      <p className="text-[10px] text-gray uppercase mb-1">Notes</p>
                                      <p className="text-xs text-charcoal">{inv.notes}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Compose Modal */}
      <AnimatePresence>
        {showCompose !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowCompose(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-charcoal">Send Email</h3>
                  <button onClick={() => setShowCompose(null)} className="text-gray hover:text-charcoal">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-gray mb-4">
                  To: {investors.find(i => i.id === showCompose)?.email}
                </p>

                {/* Template selector */}
                <div className="mb-3">
                  <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-1">Template</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-cream-dark text-sm focus:ring-2 focus:ring-forest/30">
                    <option>Payment Reminder — Friendly</option>
                    <option>Payment Reminder — Urgent</option>
                    <option>Welcome New Investor</option>
                    <option>Payout Notification</option>
                    <option>KYC Reminder</option>
                    <option>Quarterly Report</option>
                    <option>Custom Message</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-1">Subject</label>
                  <input
                    type="text"
                    defaultValue="Payment Reminder — Avotein Farms HASS Fund"
                    className="w-full px-3 py-2 rounded-lg border border-cream-dark text-sm focus:ring-2 focus:ring-forest/30"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-1">Message</label>
                  <textarea
                    rows={6}
                    defaultValue={`Dear ${investors.find(i => i.id === showCompose)?.name},\n\nThis is a friendly reminder regarding your outstanding balance of $${investors.find(i => i.id === showCompose)?.outstanding.toLocaleString()} for your HASS Fund investment.\n\nPlease complete your payment at your earliest convenience to ensure uninterrupted service.\n\nBest regards,\nHani Dahlan\nAvotein Farms Ltd.`}
                    className="w-full px-3 py-2 rounded-lg border border-cream-dark text-sm focus:ring-2 focus:ring-forest/30 resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { alert('Email sent! (Demo)'); setShowCompose(null) }}
                    className="flex-1 bg-forest hover:bg-forest-light text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Send Email
                  </button>
                  <button onClick={() => setShowCompose(null)} className="px-4 py-2.5 rounded-lg text-sm text-gray hover:bg-cream-dark transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
