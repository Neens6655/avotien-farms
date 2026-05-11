'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const suggestedQuestions = [
  'How does the HASS Fund work?',
  'What are the projected returns?',
  'How do I invest in a farm plot?',
  'When will I receive my first payout?',
  'Can I visit the farm in Uganda?',
  'What is BRIQUEEN bio-charcoal?',
]

const botResponses: Record<string, string> = {
  'How does the HASS Fund work?': 'The HASS Fund is our flagship investment offering. You purchase Hass avocado trees on our managed farms in Uganda, and Avotein Farms handles all cultivation, harvesting, and sales for 20 years. You receive annual USD payouts from harvest revenue starting from year 4.',
  'What are the projected returns?': 'The HASS Fund projects approximately 40% annual ROI from year 4 onwards, when trees reach full production. Revenue scales from $350k in year 2 to $4.6M by year 6-7 per 1,000 acres. Use our calculator on the homepage for personalized projections.',
  'How do I invest in a farm plot?': 'You can choose from 3 plans: Seedling ($975 for 50 trees), Grove ($4,875 for 250+25 bonus trees), or Orchard ($19,500+ for 1,000+ trees). Visit our Checkout page or explore specific plots on the Farm Explorer page.',
  'When will I receive my first payout?': 'Hass avocado trees begin producing fruit in year 3-4. Your first payout arrives once your trees start producing, typically in December of the harvest year. Full production is reached around year 5-6.',
  'Can I visit the farm in Uganda?': 'Yes! Grove and Orchard plan investors are invited for annual farm visits. We have two farms in Central and Western Uganda. Contact us at hani@avoteinfarms.earth to arrange a visit.',
  'What is BRIQUEEN bio-charcoal?': 'BRIQUEEN is our eco-friendly bio-charcoal brand. We convert avocado pits and processing waste into high-heat, long-lasting briquettes. This reduces deforestation by replacing traditional charcoal and creates an additional revenue stream.',
}

interface Message {
  role: 'user' | 'bot'
  text: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Welcome to Avotein Farms! \u{1F951} I can help you learn about our investment opportunities, farm operations, and the HASS Fund. What would you like to know?' },
  ])
  const [input, setInput] = useState('')

  function handleSend(text: string) {
    if (!text.trim()) return

    const userMsg: Message = { role: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Check for matching response
    setTimeout(() => {
      const matchKey = Object.keys(botResponses).find(q =>
        text.toLowerCase().includes(q.toLowerCase().split(' ').slice(0, 3).join(' ').toLowerCase())
      )
      const botText = matchKey
        ? botResponses[matchKey]
        : "Thank you for your question! For detailed inquiries, please email hani@avoteinfarms.earth or book a call through our Contact page. I'm here to help with common questions about the HASS Fund, our farms, and investment plans."

      setMessages(prev => [...prev, { role: 'bot', text: botText }])
    }, 800)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-forest hover:bg-forest-light text-white rounded-full shadow-lg shadow-forest/30 flex items-center justify-center transition-all hover:scale-105"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-forest p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm">{'\u{1F951}'}</div>
              <div>
                <p className="text-sm font-semibold text-cream">Avotein Assistant</p>
                <p className="text-[10px] text-cream/60">Ask about investments, farms & the HASS Fund</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-forest text-cream rounded-br-md'
                      : 'bg-cream-dark text-charcoal rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-[10px] text-gray uppercase tracking-wider mb-2">Quick questions</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.slice(0, 4).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[11px] bg-cream-dark hover:bg-cream text-charcoal px-3 py-1.5 rounded-full transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-cream-dark">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(input) }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-3.5 py-2.5 rounded-full bg-cream-dark text-sm text-charcoal placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-forest/30"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-forest hover:bg-forest-light text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
