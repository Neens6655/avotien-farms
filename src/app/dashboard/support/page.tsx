'use client'

import { useState } from 'react'

const myTickets = [
  { id: '1044', subject: 'Can I visit the farm?', status: 'in_progress' as const, created: '2026-03-20', lastReply: '2026-03-21' },
  { id: '1038', subject: 'How to download my certificate?', status: 'resolved' as const, created: '2026-02-10', lastReply: '2026-02-11' },
]

export default function InvestorSupportPage() {
  const [showForm, setShowForm] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Ticket submitted! Our team will respond within 24 hours. (Demo)')
    setShowForm(false)
    setSubject('')
    setMessage('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-charcoal">Support</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-forest hover:bg-forest-light text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Ticket'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="What do you need help with?"
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-charcoal uppercase tracking-wider block mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              placeholder="Describe your question or issue..."
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest resize-none"
            />
          </div>
          <button type="submit" className="bg-terra hover:bg-terra-light text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Submit Ticket
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cream-dark">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray uppercase">Ticket</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray uppercase">Status</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray uppercase">Created</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray uppercase">Last Reply</th>
            </tr>
          </thead>
          <tbody>
            {myTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-cream-dark last:border-0">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-charcoal">#{ticket.id}</p>
                  <p className="text-xs text-gray">{ticket.subject}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    ticket.status === 'resolved' ? 'bg-forest/10 text-forest'
                    : ticket.status === 'in_progress' ? 'bg-gold/20 text-charcoal'
                    : 'bg-terra/10 text-terra'
                  }`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray">{ticket.created}</td>
                <td className="px-6 py-4 text-xs text-gray">{ticket.lastReply}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-cream-dark rounded-2xl p-6 text-center">
        <p className="text-sm text-gray">Need immediate help?</p>
        <p className="text-sm text-charcoal font-medium mt-1">Email us at <a href="mailto:support@avotien.com" className="text-forest hover:underline">support@avotien.com</a></p>
      </div>
    </div>
  )
}
