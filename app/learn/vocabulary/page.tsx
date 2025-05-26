"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, BookOpen, Check, Repeat, VolumeIcon as VolumeUp, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function VocabularyTrainer() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownWords, setKnownWords] = useState(new Set())

  const vocabularyCards = [
    {
      arabic: "ٱلْحَمْدُ",
      transliteration: "al-hamdu",
      translation: "the praise",
      example: "ٱلْحَمْدُ لِلَّهِ",
      exampleTranslation: "All praise is due to Allah",
    },
    {
      arabic: "رَبِّ",
      transliteration: "rabbi",
      translation: "Lord (of)",
      example: "رَبِّ ٱلْعَٰلَمِينَ",
      exampleTranslation: "Lord of the worlds",
    },
    {
      arabic: "ٱلْعَٰلَمِينَ",
      transliteration: "al-'ālamīna",
      translation: "the worlds",
      example: "رَبِّ ٱلْعَٰلَمِينَ",
      exampleTranslation: "Lord of the worlds",
    },
    {
      arabic: "ٱلرَّحْمَٰنِ",
      transliteration: "ar-raḥmāni",
      translation: "the Entirely Merciful",
      example: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      exampleTranslation: "The Entirely Merciful, the Especially Merciful",
    },
    {
      arabic: "ٱلرَّحِيمِ",
      transliteration: "ar-raḥīmi",
      translation: "the Especially Merciful",
      example: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      exampleTranslation: "The Entirely Merciful, the Especially Merciful",
    },
    {
      arabic: "مَٰلِكِ",
      transliteration: "māliki",
      translation: "Sovereign (of)",
      example: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
      exampleTranslation: "Sovereign of the Day of Recompense",
    },
    {
      arabic: "يَوْمِ",
      transliteration: "yawmi",
      translation: "Day (of)",
      example: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
      exampleTranslation: "Sovereign of the Day of Recompense",
    },
    {
      arabic: "ٱلدِّينِ",
      transliteration: "ad-dīni",
      translation: "the Recompense",
      example: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
      exampleTranslation: "Sovereign of the Day of Recompense",
    },
  ]

  const currentCard = vocabularyCards[currentCardIndex]
  const progress = (knownWords.size / vocabularyCards.length) * 100

  const handleNextCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % vocabularyCards.length)
  }

  const handlePrevCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + vocabularyCards.length) % vocabularyCards.length)
  }

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped)
  }

  const handleMarkAsKnown = () => {
    setKnownWords((prev) => {
      const newSet = new Set(prev)
      newSet.add(currentCardIndex)
      return newSet
    })
    handleNextCard()
  }

  const handleMarkAsUnknown = () => {
    setKnownWords((prev) => {
      const newSet = new Set(prev)
      newSet.delete(currentCardIndex)
      return newSet
    })
    handleNextCard()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-green-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-xl font-bold">Quranic Arabic Trainer</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-green-900">Vocabulary Trainer</h2>
            <p className="text-gray-600">Surah Al-Fatiha Vocabulary</p>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="flex-1">
              <Progress value={progress} className="h-2 bg-green-100" />
              <div className="mt-2 text-sm text-gray-600">
                {knownWords.size} of {vocabularyCards.length} words mastered ({Math.round(progress)}%)
              </div>
            </div>
            <div className="ml-4">
              <Button variant="outline" size="sm" onClick={() => setKnownWords(new Set())}>
                <Repeat className="mr-2 h-4 w-4" />
                Reset Progress
              </Button>
            </div>
          </div>

          <div className="mb-8 flex justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    Flashcard {currentCardIndex + 1}/{vocabularyCards.length}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => {}}>
                    <VolumeUp className="h-4 w-4" />
                    <span className="sr-only">Listen</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg bg-green-50 p-6 text-center transition-all duration-300"
                  onClick={handleFlipCard}
                >
                  {!isFlipped ? (
                    <div className="space-y-4">
                      <p className="text-4xl font-arabic" dir="rtl">
                        {currentCard.arabic}
                      </p>
                      <p className="text-sm text-gray-500">Click to reveal meaning</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xl font-medium">{currentCard.translation}</p>
                      <p className="text-md font-medium text-gray-700">{currentCard.transliteration}</p>
                      <div className="mt-4 rounded-lg bg-white p-3 text-sm">
                        <p className="mb-1 text-lg font-arabic" dir="rtl">
                          {currentCard.example}
                        </p>
                        <p className="text-gray-600">{currentCard.exampleTranslation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handlePrevCard}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" onClick={handleNextCard}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                    onClick={handleMarkAsUnknown}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Don't Know
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                    onClick={handleMarkAsKnown}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Know It
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-green-800">Study Tips</h3>
            <ul className="list-inside list-disc space-y-2 text-gray-700">
              <li>Practice these words daily for better retention</li>
              <li>Try to use these words in simple sentences</li>
              <li>Pay attention to the root letters to understand word relationships</li>
              <li>Listen to the pronunciation carefully and repeat aloud</li>
              <li>Look for these words when reading Quran to reinforce your learning</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-green-900 py-6 text-center text-white">
        <div className="container mx-auto px-4">
          <p>© 2025 Quranic Arabic Trainer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
