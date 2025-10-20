"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

export function FloatingGIAChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm GIA, your AI assistant. How can I help you today?",
    },
  ])

  const handleSend = () => {
    if (!message.trim()) return

    setMessages([...messages, { role: "user", content: message }])
    setMessage("")

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm here to help! This is a demo response. In production, I'd provide personalized recommendations based on your activity.",
        },
      ])
    }, 1000)
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-50 p-4 bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse"
          style={{
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(123, 47, 255, 0.3)'
          }}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Expanded Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0118] animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-4">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] rounded-full"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                  }}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-transparent bg-clip-text">
                    GIA Assistant
                  </h2>
                  <p className="text-xs text-gray-400">Always here to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 pb-24 max-w-md mx-auto">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="p-2 bg-gradient-to-br from-[#00D4FF]/20 to-[#7B2FFF]/20 rounded-full h-fit">
                      <Sparkles className="h-4 w-4 text-[#00D4FF]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl p-4 ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] text-white"
                        : "bg-white/5 backdrop-blur-xl border border-white/10 text-white"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10 p-4">
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask GIA anything..."
                className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00D4FF]/50"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] rounded-xl hover:opacity-90 transition-opacity"
                style={{
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                }}
              >
                <Send className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

