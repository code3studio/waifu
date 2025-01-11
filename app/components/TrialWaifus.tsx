import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const trialWaifus = [
  { name: 'Sakura', emoji: '🌸', description: 'A cheerful and energetic waifu' },
  { name: 'Yuki', emoji: '❄️', description: 'A cool and calm waifu' },
  { name: 'Hana', emoji: '🌻', description: 'A kind and nurturing waifu' },
]

export default function TrialWaifus() {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">Download Trial Waifus 🎉</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {trialWaifus.map((waifu) => (
          <Card key={waifu.name} className="bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-purple-600">{waifu.name} {waifu.emoji}</CardTitle>
              <CardDescription>{waifu.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-pink-100 rounded-lg flex items-center justify-center text-6xl">
                {waifu.emoji}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Download {waifu.name}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

