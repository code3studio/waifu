'use client'

import { useState } from 'react'
import WaifuViewer from './components/WaifuViewer'
import ChatInterface from './components/ChatInterface'
import SocialLinks from './components/SocialLinks'
import { Noto_Sans_JP } from 'next/font/google'
import TrialWaifus from './components/TrialWaifus'
import ApiKeyInput from './components/ApiKeyInput'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export default function Home() {
  const [waifuName, setWaifuName] = useState('')

  const handleFileUpload = (fileName: string) => {
    const name = fileName.split('.')[0] // Remove file extension
    setWaifuName(name)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 ${notoSansJP.className}`}>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">Welcome to wAIfu 💖</h1>
        <ApiKeyInput />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <WaifuViewer onFileUpload={handleFileUpload} />
          <ChatInterface waifuName={waifuName} />
        </div>
        <SocialLinks />
        <TrialWaifus />
      </main>
    </div>
  )
}

