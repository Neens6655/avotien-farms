'use client'

import { useState } from 'react'
import Link from 'next/link'

const ticket = {
  id: '1044',
  subject: 'Can I visit the farm?',
  investor: 'Michael Johnson',
  email: 'michael@example.com',
  status: 'in_progress',
  priority: 'low',
  created: '2026-03-20',
  messages: [
    { sender: 'investor' as const, name: 'Michael Johnson', body: 'Hi there, I own 55 trees on the Mukono farm. I would love to visit in person during my trip to Uganda next month. Is this possible? What do I need to arrange?', time: '2026-03-20 10:30 AM' },
    { sender: 'admin' as const, name: 'Sarah Namukwaya', body: 'Hello Michael! Great to hear you want to visit. We welcome all Grove and Orchard investors for farm visits. I will coordinate with our team in Mukono to schedule your visit. Could you share your tentative travel dates?', time: '2026-03-20 2:15 PM' },
    { sender: 'investor' as const, name: 'Michael Johnson', body: 'I am planning to be in Kampala from April 10-18. Any day that week would work. I would love to see my trees and meet the farming team.', time: '2026-03-21 9:00 AM' },
  ],
}

export default function TicketDetailPage() {
  const [reply, setReply] = useState('')

  function handleReply(e: React.FormEvent) {
    e.preventDefault()
    if (!reply.trim()) return
    alert('Reply sent! (Demo — will save to Supabase when configured)')
    setReply('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/support" className="text-sm text-forest hover:underline">← Support</Link>
        <span className="text-gray">/</span>
        <span className="text-sm text-charcoal font-medium">Ticket #{ticket.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h1 className="font-display text-xl font-bold text-charcoal mb-1">{ticket.subject}</h1>
            <p className="text-sm text-gray">Opened {ticket.created} by {ticket.investor}</p>
          </div>

          <div className="space-y-3">
            {ticket.messages.map((msg, i) => (
              <div key={i} className={`rounded-xl p-5 shadow-sm ${msg.sender === 'admin' ? 'bg-forest/5 ml-6' : 'bg-white mr-6'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.sender === 'admin' ? 'bg-forest/20 text-forest' : 'bg-terra/20 text-terra'}`}>
                      {msg.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-charcoal">{msg.name}</span>
                    <span className="text-xs text-gray capitalize bg-cream-dark px-2 py-0.5 rounded-full">{msg.sender}</span>
                  </div>
                  <span className="text-xs text-gray">{msg.time}</span>
                </div>
                <p className="text-sm text-charcoal leading-relaxed">{msg.body}</p>
              </div>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleReply} className="bg-white rounded-xl p-5 shadow-sm">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-cream-dark text-sm focus:outline-none focus:ring-2 focus:ring-forest resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray">Reply as admin</span>
              <button type="submit" className="bg-forest hover:bg-forest-light text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
                Send Reply
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-charcoal">Ticket Details</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Status</span>
              <span className="text-xs font-semibold text-charcoal bg-gold/20 px-2 py-0.5 rounded-full">{ticket.status.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Priority</span>
              <span className="text-xs text-charcoal capitalize">{ticket.priority}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Created</span>
              <span className="text-xs text-charcoal">{ticket.created}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray">Messages</span>
              <span className="text-xs text-charcoal">{ticket.messages.length}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-charcoal">Investor</h3>
            <p className="text-sm text-charcoal">{ticket.investor}</p>
            <p className="text-xs text-gray">{ticket.email}</p>
            <Link href={`/admin/investors/1`} className="text-xs text-forest font-medium hover:underline block">
              View Profile →
            </Link>
          </div>

          <div className="space-y-2">
            <button className="w-full bg-forest hover:bg-forest-light text-white py-2.5 rounded-lg text-sm font-medium transition-colors">
              Mark as Resolved
            </button>
            <button className="w-full bg-cream-dark hover:bg-cream text-charcoal py-2.5 rounded-lg text-sm font-medium transition-colors">
              Change Priority
            </button>
            <button className="w-full bg-cream-dark hover:bg-cream text-charcoal py-2.5 rounded-lg text-sm font-medium transition-colors">
              Assign to Team Member
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
