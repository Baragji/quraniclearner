"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Mic, Play, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default function PronunciationPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [feedback, setFeedback] = useState<null | {
    accuracy: number
    feedback: string
  }>(null)
  const [selectedLetter, setSelectedLetter] = useState("ا")
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const letters = [
    { letter: "ا", name: "Alif", sound: "a/i/u" },
    { letter: "ب", name: "Ba", sound: "b" },
    { letter: "ت", name: "Ta", sound: "t" },
    { letter: "ث", name: "Tha", sound: "th" },
    { letter: "ج", name: "Jim", sound: "j" },
    { letter: "ح", name: "Ha", sound: "ḥ" },
    { letter: "خ", name: "Kha", sound: "kh" },
    { letter: "د", name: "Dal", sound: "d" },
  ]

  const words = [
    { word: "كِتَاب", transliteration: "kitāb", meaning: "bog" },
    { word: "قَلَم", transliteration: "qalam", meaning: "pen" },
    { word: "بَيْت", transliteration: "bayt", meaning: "hus" },
    { word: "مَدْرَسَة", transliteration: "madrasa", meaning: "skole" },
  ]

  const phrases = [
    { phrase: "السَّلَامُ عَلَيْكُمْ", transliteration: "as-salāmu ʿalaykum", meaning: "Fred være med dig" },
    { phrase: "كَيْفَ حَالُكَ", transliteration: "kayfa ḥāluka", meaning: "Hvordan har du det?" },
    { phrase: "شُكْرًا", transliteration: "shukran", meaning: "Tak" },
    { phrase: "مَا اسْمُكَ", transliteration: "mā ismuka", meaning: "Hvad hedder du?" },
  ]

  const playAudio = () => {
    // I en rigtig app ville dette afspille en lydfil
    console.log(`Afspiller lyd for: ${selectedLetter}`)
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingComplete(false)
    setFeedback(null)

    // Simuler optagelse i 3 sekunder
    recordingTimeoutRef.current = setTimeout(() => {
      setIsRecording(false)
      setRecordingComplete(true)

      // Simuler feedback (i en rigtig app ville dette komme fra en API)
      const randomAccuracy = Math.floor(Math.random() * 40) + 60 // 60-99%
      setFeedback({
        accuracy: randomAccuracy,
        feedback:
          randomAccuracy > 85
            ? "Fremragende udtale! Din udtale er meget præcis."
            : randomAccuracy > 70
              ? "God udtale! Prøv at fokusere lidt mere på lydenes længde."
              : "Ikke dårligt! Prøv at lytte til eksemplet igen og fokuser på at efterligne lyden.",
      })
    }, 3000)
  }

  const stopRecording = () => {
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current)
    }
    setIsRecording(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <span className="text-lg font-bold">أتعلم العربية</span>
              <span className="text-lg font-bold text-muted-foreground">(Ata'allam al-Arabiya)</span>
            </Link>
            <MainNav />
          </div>
          <UserNav />
        </div>
      </header>

      <main className="container flex-1 py-10">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbage til Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Udtaleøvelser</h1>
          <p className="text-muted-foreground">Øv din arabiske udtale med interaktive øvelser</p>
        </div>

        <Tabs defaultValue="letters" className="mb-8">
          <TabsList>
            <TabsTrigger value="letters">Bogstaver</TabsTrigger>
            <TabsTrigger value="words">Ord</TabsTrigger>
            <TabsTrigger value="phrases">Sætninger</TabsTrigger>
          </TabsList>
          <TabsContent value="letters" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Udtaleøvelse: {selectedLetter}</span>
                      <Button variant="ghost" size="sm" onClick={playAudio} className="gap-1">
                        <Volume2 className="h-4 w-4" />
                        <span className="text-xs">Lyt til Udtale</span>
                      </Button>
                    </CardTitle>
                    <CardDescription>Lyt til udtalen og øv dig ved at gentage lyden</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 flex flex-col items-center justify-center">
                      <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        <span className="font-arabic text-6xl">{selectedLetter}</span>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium">{letters.find((l) => l.letter === selectedLetter)?.name}</p>
                        <p className="text-muted-foreground">
                          Udtales som "{letters.find((l) => l.letter === selectedLetter)?.sound}"
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col items-center">
                      <Button
                        size="lg"
                        className={`h-16 w-16 rounded-full ${
                          isRecording ? "bg-red-500 hover:bg-red-600" : "bg-emerald-700 hover:bg-emerald-800"
                        }`}
                        onClick={isRecording ? stopRecording : startRecording}
                      >
                        <Mic className={`h-6 w-6 ${isRecording ? "animate-pulse" : ""}`} />
                      </Button>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {isRecording
                          ? "Optager... Tryk for at stoppe"
                          : recordingComplete
                            ? "Optagelse færdig"
                            : "Tryk for at optage din udtale"}
                      </p>
                    </div>

                    {feedback && (
                      <div className="mt-6 rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">Feedback på din udtale</h3>
                        <div className="mb-4">
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Nøjagtighed</span>
                            <span>{feedback.accuracy}%</span>
                          </div>
                          <Progress
                            value={feedback.accuracy}
                            className="h-2"
                            indicatorClassName={
                              feedback.accuracy > 85
                                ? "bg-green-500"
                                : feedback.accuracy > 70
                                  ? "bg-yellow-500"
                                  : "bg-orange-500"
                            }
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={playAudio}>
                      <Play className="mr-2 h-4 w-4" />
                      Afspil Igen
                    </Button>
                    <Button onClick={startRecording} disabled={isRecording}>
                      <Mic className="mr-2 h-4 w-4" />
                      Optag Igen
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Udtaletips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                      <li>Lyt omhyggeligt til eksemplet før du forsøger at gentage det</li>
                      <li>Vær opmærksom på hvor i munden lyden dannes (læber, tunge, hals)</li>
                      <li>Øv dig i at skelne mellem lignende lyde som ح (ha) og خ (kha)</li>
                      <li>Optag og lyt til din egen udtale for at identificere områder, der kan forbedres</li>
                      <li>Øv regelmæssigt - selv korte daglige øvelser kan give store fremskridt over tid</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Vælg et Bogstav</CardTitle>
                    <CardDescription>Klik på et bogstav for at øve dets udtale</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      {letters.map((letter) => (
                        <Button
                          key={letter.letter}
                          variant={selectedLetter === letter.letter ? "default" : "outline"}
                          className={`h-12 font-arabic text-lg ${
                            selectedLetter === letter.letter ? "bg-emerald-700 hover:bg-emerald-800" : ""
                          }`}
                          onClick={() => {
                            setSelectedLetter(letter.letter)
                            setFeedback(null)
                            setRecordingComplete(false)
                          }}
                        >
                          {letter.letter}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Din Fremgang</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Mestrede Bogstaver</span>
                          <span className="text-muted-foreground">5/28</span>
                        </div>
                        <Progress value={(5 / 28) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Øvede Bogstaver</span>
                          <span className="text-muted-foreground">12/28</span>
                        </div>
                        <Progress value={(12 / 28) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Gennemsnitlig Nøjagtighed</span>
                          <span className="text-muted-foreground">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="words" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ordudtale</CardTitle>
                    <CardDescription>Øv udtalen af hele arabiske ord</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {words.map((word, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <p className="font-arabic text-2xl" dir="rtl">
                              {word.word}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {word.transliteration} - {word.meaning}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Volume2 className="mr-2 h-4 w-4" />
                              Lyt
                            </Button>
                            <Button size="sm">
                              <Mic className="mr-2 h-4 w-4" />
                              Øv
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Ordforråd Fremgang</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Mestrede Ord</span>
                        <span className="text-muted-foreground">12/100</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Øvede Ord</span>
                        <span className="text-muted-foreground">45/100</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Gennemsnitlig Nøjagtighed</span>
                        <span className="text-muted-foreground">82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="phrases" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sætningsudtale</CardTitle>
                    <CardDescription>Øv udtalen af arabiske sætninger og fraser</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {phrases.map((phrase, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <p className="font-arabic text-xl" dir="rtl">
                              {phrase.phrase}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {phrase.transliteration} - {phrase.meaning}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Volume2 className="mr-2 h-4 w-4" />
                              Lyt
                            </Button>
                            <Button size="sm">
                              <Mic className="mr-2 h-4 w-4" />
                              Øv
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sætnings Fremgang</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Mestrede Sætninger</span>
                        <span className="text-muted-foreground">5/50</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Øvede Sætninger</span>
                        <span className="text-muted-foreground">15/50</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Gennemsnitlig Nøjagtighed</span>
                        <span className="text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            &copy; 2025 أتعلم العربية (Ata'allam al-Arabiya). Alle rettigheder forbeholdes.
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              Om os
            </Link>
            <Link href="/contact" className="hover:underline">
              Kontakt
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privatlivspolitik
            </Link>
            <Link href="/terms" className="hover:underline">
              Vilkår
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
