import { Twitter, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      <Button asChild variant="outline">
        <a href="https://twitter.com/wAIfu" target="_blank" rel="noopener noreferrer">
          <Twitter className="mr-2 h-4 w-4" />
          Twitter 🐦
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href="https://t.me/wAIfu" target="_blank" rel="noopener noreferrer">
          <Send className="mr-2 h-4 w-4" />
          Telegram 📱
        </a>
      </Button>
    </div>
  )
}

