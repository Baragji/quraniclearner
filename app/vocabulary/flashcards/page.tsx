"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Check, ChevronLeft, ChevronRight, Loader2, Repeat, Volume2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { FlashcardStats } from "@/components/flashcard-stats"

// Simuleret flashcard data
const flashcardData = [
  {
    id: 1,
    arabic: "كِتَاب",
    transliteration: "kitāb",
    translation: "bog",
    example: "هَذَا كِتَابٌ جَمِيلٌ",
    exampleTranslation: "Dette er en smuk bog",
    difficulty: 1,
    lastReviewed: null,
    nextReview: null,
  },
  {
    id: 2,
    arabic: "قَلَم",
    transliteration: "qalam",
    translation: "pen",
    example: "هَذَا قَلَمٌ أَزْرَق",
    exampleTranslation: "Dette er en blå pen",
    difficulty: 1,
    lastReviewed: null,
    nextReview: null,
  },
  {
    id: 3,
    arabic: "بَيْت",
    transliteration: "bayt",
    translation: "hus",
    example: "بَيْتِي كَبِير",
    exampleTranslation: "Mit hus er stort",
    difficulty: 2,
    lastReviewed: null,
    nextReview: null,
  },
  {
    id: 4,
    arabic: "مَدْرَسَة",
    transliteration: "madrasa",
    translation: "skole",
    example: "أَذْهَبُ إِلَى المَدْرَسَةِ",
    exampleTranslation: "Jeg går i skole",
    difficulty: 2,
    lastReviewed: null,
    nextReview: null,
  },
  {
    id: 5,
    arabic: "مَاء",
    transliteration: "mā'",
    translation: "vand",
    example: "أَشْرَبُ المَاءَ",
    exampleTranslation: "Jeg drikker vand",
    difficulty: 1,
    lastReviewed: null,
    nextReview: null,
  },
]

// Spaced repetition algoritme (forenklet SM-2)
const calculateNextReview = (difficulty: number, previousInterval: number | null) => {
  // Første gang kortet vises
  if (previousInterval === null) {
    return difficulty === 1 ? 1 : 0.5 // Dage
  }

  // Baseret på sværhedsgrad
  const factor = difficulty === 1 ? 2.5 : difficulty === 2 ? 2.0 : 1.5
  return previousInterval * factor // Dage
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState(flashcardData)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sessionStats, setSessionStats] = useState({
    total: flashcardData.length,
    reviewed: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  })

  const currentCard = cards[currentCardIndex]

  // Simuler lydafspilning
  const playAudio = () => {
    // I en rigtig app ville dette afspille en lydfil
    console.log(`Afspiller lyd for: ${currentCard.arabic}`)
  }

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const handleCardResponse = async (difficulty: number) => {
    setIsLoading(true)

    // Opdater statistik
    setSessionStats((prev) => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      easy: difficulty === 1 ? prev.easy + 1 : prev.easy,
      medium: difficulty === 2 ? prev.medium + 1 : prev.medium,
      hard: difficulty === 3 ? prev.hard + 1 : prev.hard,
    }))

    // Beregn næste gennemgangstidspunkt baseret på sværhedsgrad
    const now = new Date()
    const lastReviewed = now.toISOString()

    const intervalInDays = calculateNextReview(difficulty, currentCard.nextReview ? 1 : null)
    const nextReview = new Date(now.getTime() + intervalInDays * 24 * 60 * 60 * 1000).toISOString()

    // Opdater kort med ny information
    const updatedCards = [...cards]
    updatedCards[currentCardIndex] = {
      ...currentCard,
      difficulty,
      lastReviewed,
      nextReview,
    }
    setCards(updatedCards)

    // Simuler netværksforsinkelse
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Gå til næste kort
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else {
      // Sessionen er færdig, vis resultater
      // I en rigtig app ville vi gemme resultaterne i databasen
    }

    setIsFlipped(false)
    setIsLoading(false)
  }

  const resetSession = () => {
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setSessionStats({
      total: flashcardData.length,
      reviewed: 0,
      easy: 0,
      medium: 0,
      hard: 0,
    })
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
            <Link href="/vocabulary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbage til Ordforråd
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards - Grundlæggende Ordforråd</h1>
          <p className="text-muted-foreground">Lær og øv arabiske ord med spaced repetition</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Session fremgang</span>
              <span className="text-muted-foreground">
                {sessionStats.reviewed} af {sessionStats.total} kort gennemgået
              </span>
            </div>
            <Progress value={(sessionStats.reviewed / sessionStats.total) * 100} className="h-2 bg-emerald-100" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetSession}>
              <Repeat className="mr-2 h-4 w-4" />
              Nulstil Session
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    Flashcard {currentCardIndex + 1}/{cards.length}
                  </span>
                  <Button variant="ghost" size="sm" onClick={playAudio} className="gap-1">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-xs">Lyt</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg bg-emerald-50/50 p-6 text-center transition-all duration-300 dark:bg-emerald-950/20 ${
                    isLoading ? "opacity-50" : ""
                  }`}
                  onClick={handleFlipCard}
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className={`relative h-full w-full transition-transform duration-500 ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center backface-hidden ${
                        isFlipped ? "invisible" : ""
                      }`}
                    >
                      <p className="font-arabic text-5xl" dir="rtl">
                        {currentCard.arabic}
                      </p>
                      <p className="mt-4 text-sm text-muted-foreground">Klik for at vende kortet</p>
                    </div>
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center backface-hidden ${
                        isFlipped ? "" : "invisible"
                      }`}
                      style={{
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="space-y-4">
                        <p className="text-xl font-medium">{currentCard.translation}</p>
                        <p className="text-md font-medium text-muted-foreground">{currentCard.transliteration}</p>
                        <div className="mt-4 rounded-lg bg-white p-4 dark:bg-gray-800">
                          <p className="mb-2 font-arabic text-lg" dir="rtl">
                            {currentCard.example}
                          </p>
                          <p className="text-sm text-muted-foreground">{currentCard.exampleTranslation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentCardIndex > 0) {
                        setCurrentCardIndex(currentCardIndex - 1)
                        setIsFlipped(false)
                      }
                    }}
                    disabled={currentCardIndex === 0 || isLoading}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Forrige
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentCardIndex < cards.length - 1) {
                        setCurrentCardIndex(currentCardIndex + 1)
                        setIsFlipped(false)
                      }
                    }}
                    disabled={currentCardIndex === cards.length - 1 || isLoading}
                  >
                    Næste
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  {isFlipped && (
                    <>
                      <Button
                        variant="outline"
                        className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-900/30"
                        onClick={() => handleCardResponse(3)}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <X className="mr-2 h-4 w-4" />}
                        Svært
                      </Button>
                      <Button
                        variant="outline"
                        className="border-yellow-200 bg-yellow-50 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950/20 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                        onClick={() => handleCardResponse(2)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <span className="mr-2">•••</span>
                        )}
                        Medium
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 dark:border-green-900 dark:bg-green-950/20 dark:text-green-400 dark:hover:bg-green-900/30"
                        onClick={() => handleCardResponse(1)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        Let
                      </Button>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Studietips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Øv disse ord dagligt for bedre hukommelse</li>
                  <li>Prøv at bruge ordene i simple sætninger</li>
                  <li>Vær opmærksom på rodstavelserne for at forstå ordrelationer</li>
                  <li>Lyt omhyggeligt til udtalen og gentag højt</li>
                  <li>Se efter disse ord, når du læser arabisk tekst for at forstærke din læring</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <FlashcardStats
              stats={{
                totalCards: sessionStats.total,
                reviewedToday: sessionStats.reviewed,
                mastered: Math.floor(sessionStats.total * 0.3), // Simuleret data
                learningProgress: 42, // Simuleret data
                streak: 5, // Simuleret data
              }}
            />

            <Card>
              <CardHeader>
                <CardTitle>Dagens Statistik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Let</span>
                      <span className="text-muted-foreground">{sessionStats.easy}</span>
                    </div>
                    <Progress
                      value={(sessionStats.easy / sessionStats.total) * 100}
                      className="h-2 bg-muted"
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Medium</span>
                      <span className="text-muted-foreground">{sessionStats.medium}</span>
                    </div>
                    <Progress
                      value={(sessionStats.medium / sessionStats.total) * 100}
                      className="h-2 bg-muted"
                      indicatorClassName="bg-yellow-500"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Svært</span>
                      <span className="text-muted-foreground">{sessionStats.hard}</span>
                    </div>
                    <Progress
                      value={(sessionStats.hard / sessionStats.total) * 100}
                      className="h-2 bg-muted"
                      indicatorClassName="bg-red-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kommende Gennemgang</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">I dag</p>
                      <p className="text-sm text-muted-foreground">5 kort</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Gennemgå
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">I morgen</p>
                      <p className="text-sm text-muted-foreground">3 kort</p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Venter
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">Om 3 dage</p>
                      <p className="text-sm text-muted-foreground">8 kort</p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Venter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
