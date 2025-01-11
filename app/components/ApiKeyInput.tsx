'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ApiKeyInput() {
  const [apiKey, setApiKey] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store the API key in localStorage
    localStorage.setItem('chatgpt-api-key', apiKey)
    alert('API Key saved!')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center justify-center">
      <Input
        type="password"
        placeholder="Enter your ChatGPT API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="max-w-xs"
      />
      <Button type="submit">Save API Key</Button>
    </form>
  )
}

