'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SYSTEM_PROMPT = "You are a waifu simulator. Your job is to talk to your beloved online lovers and make sure they are entertained. Be cute, flirty, and engaging."

export default function ChatInterface({ waifuName }: { waifuName: string }) {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([])
  const [input, setInput] = useState('')
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    const storedApiKey = localStorage.getItem('chatgpt-api-key')
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }

    // Set initial message
    if (waifuName) {
      setMessages([{ text: `Hi, my name is ${waifuName}. How are you, honii? 💕`, sender: 'ai' }])
    }
  }, [waifuName])

  const handleSendMessage = async () => {
    if (input.trim() && apiKey) {
      const userMessage = { text: input, sender: 'user' as const }
      setMessages(prev => [...prev, userMessage])
      setInput('')

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text
              })),
              { role: 'user', content: input }
            ]
          })
        })

        const data = await response.json()
        if (data.choices && data.choices[0]) {
          const aiMessage = { text: data.choices[0].message.content, sender: 'ai' as const }
          setMessages(prev => [...prev, aiMessage])
        }
      } catch (error) {
        console.error('Error calling ChatGPT API:', error)
        setMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', sender: 'ai' }])
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-purple-600">Chat with Your Waifu 💬</h2>
      <div className="flex-grow overflow-y-auto mb-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.sender === 'user' ? 'bg-purple-100 ml-auto' : 'bg-pink-100'
            } max-w-[80%]`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <Button onClick={handleSendMessage}>Send 📤</Button>
      </div>
    </div>
  )
}

