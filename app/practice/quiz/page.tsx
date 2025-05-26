"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, HelpCircle, Lightbulb, Timer, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { AIExplainOverlay } from "@/components/ai-explain-overlay"

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [showAIExplain, setShowAIExplain] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutter i sekunder
  const [difficulty, setDifficulty] = useState(50) // 0-100 skala

  const quizQuestions = [
    {
      question: "Hvad betyder ordet 'كِتَاب' (kitāb)?",
      options: ["Pen", "Bog", "Stol", "Vand"],
      correctAnswer: "Bog",
      explanation:
        "Ordet 'كِتَاب' (kitāb) betyder 'bog' på arabisk. Det er et almindeligt ord, der stammer fra roden ك-ت-ب (k-t-b), som er relateret til skrivning og litteratur.",
    },
    {
      question: "Hvilken af følgende er den korrekte arabiske oversættelse af 'hus'?",
      options: ["مَدْرَسَة (madrasa)", "بَيْت (bayt)", "سَيَّارَة (sayyāra)", "كُرْسِي (kursī)"],
      correctAnswer: "بَيْت (bayt)",
      explanation:
        "بَيْت (bayt) er det arabiske ord for 'hus'. Det er et grundlæggende ord i arabisk ordforråd og bruges ofte i daglig tale.",
    },
    {
      question: "Hvad er den korrekte udtale af bogstavet 'ض'?",
      options: ["Za", "Da", "Ḍād", "Ṣād"],
      correctAnswer: "Ḍād",
      explanation:
        "Bogstavet 'ض' udtales som 'Ḍād'. Det er et unikt arabisk bogstav med en dyb 'd'-lyd, der dannes ved at presse tungen mod den øvre del af munden. Faktisk kaldes arabisk nogle gange for 'lughat al-ḍād' (sproget af ḍād), fordi dette bogstav er unikt for arabisk.",
    },
    {
      question: "Hvilken af følgende sætninger betyder 'Jeg læser en bog'?",
      options: [
        "أَنَا أَكْتُبُ كِتَابًا (anā aktubu kitāban)",
        "أَنَا أَقْرَأُ كِتَابًا (anā aqra'u kitāban)",
        "هَذَا كِتَابٌ (hādhā kitābun)",
        "أَيْنَ الكِتَاب؟ (ayna al-kitāb?)",
      ],
      correctAnswer: "أَنَا أَقْرَأُ كِتَابًا (anā aqra'u kitāban)",
      explanation:
        "أَنَا أَقْرَأُ كِتَابًا (anā aqra'u kitāban) betyder 'Jeg læser en bog'. 'أَنَا' (anā) betyder 'jeg', 'أَقْرَأُ' (aqra'u) er verbet 'at læse' i nutid, og 'كِتَابًا' (kitāban) er 'en bog' i akkusativ kasus.",
    },
    {
      question: "Hvad er den korrekte måde at sige 'godmorgen' på arabisk?",
      options: [
        "مَسَاءُ الخَيْر (masā' al-khayr)",
        "صَبَاحُ الخَيْر (ṣabāḥ al-khayr)",
        "مَرْحَبًا (marḥaban)",
        "إِلَى اللِقَاء (ilā al-liqā')",
      ],
      correctAnswer: "صَبَاحُ الخَيْر (ṣabāḥ al-khayr)",
      explanation:
        "صَبَاحُ الخَيْر (ṣabāḥ al-khayr) er den korrekte måde at sige 'godmorgen' på arabisk. Ordret betyder det 'morgen af godhed'. Det er en almindelig hilsen, der bruges om morgenen i arabisktalende lande.",
    },
  ]

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)) / quizQuestions.length) * 100

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    if (!isAnswerSubmitted) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer
      if (isCorrect) {
        setScore(score + 1)
        // Øg sværhedsgraden lidt for korrekte svar
        setDifficulty(Math.min(100, difficulty + 5))
      } else {
        // Sænk sværhedsgraden for forkerte svar
        setDifficulty(Math.max(0, difficulty - 10))
        setShowAIExplain(true)
      }
      setIsAnswerSubmitted(true)
    } else {
      // Gå til næste spørgsmål
      setShowAIExplain(false)
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer("")
        setIsAnswerSubmitted(false)
      } else {
        setQuizCompleted(true)
      }
    }
  }

  const getDifficultyColor = () => {
    if (difficulty < 30) return "text-green-500"
    if (difficulty < 70) return "text-yellow-500"
    return "text-red-500"
  }

  // Formater tid som MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
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
            <Link href="/practice">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbage til Øvelser
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Arabisk Ordforråd Quiz</h1>
          <p className="text-muted-foreground">Test din viden om grundlæggende arabiske ord og udtryk</p>
        </div>

        {!quizCompleted ? (
          <div className="mx-auto max-w-3xl">
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm">
                  Spørgsmål {currentQuestionIndex + 1} af {quizQuestions.length}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sværhedsgrad:</span>
                  <span className={`text-sm font-medium ${getDifficultyColor()}`}>
                    {difficulty < 30 ? "Let" : difficulty < 70 ? "Mellem" : "Svær"}
                  </span>
                </div>
              </div>
              <Progress value={progress} className="h-2 bg-emerald-100" />
            </div>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {difficulty < 30 ? "1" : difficulty < 70 ? "2" : "3"} point
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedAnswer} className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex cursor-pointer items-center space-x-2 rounded-lg border p-4 transition-colors ${
                        isAnswerSubmitted && option === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50 dark:border-green-700 dark:bg-green-900/20"
                          : isAnswerSubmitted && option === selectedAnswer && option !== currentQuestion.correctAnswer
                            ? "border-red-500 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                            : selectedAnswer === option
                              ? "border-emerald-200 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20"
                              : ""
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} disabled={isAnswerSubmitted} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex flex-1 cursor-pointer items-center justify-between"
                      >
                        {option}
                        {isAnswerSubmitted && option === currentQuestion.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {isAnswerSubmitted && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {isAnswerSubmitted && (
                  <div
                    className={`mt-4 rounded-lg p-4 ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                        : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {selectedAnswer === currentQuestion.correctAnswer ? (
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      ) : (
                        <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium">
                          {selectedAnswer === currentQuestion.correctAnswer ? "Korrekt!" : "Ikke korrekt"}
                        </p>
                        <p className="mt-1 text-sm">
                          {selectedAnswer === currentQuestion.correctAnswer
                            ? "Godt klaret! Du har forstået konceptet."
                            : `Det korrekte svar er: ${currentQuestion.correctAnswer}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                    <Timer className="h-4 w-4" />
                    <span className="text-xs font-medium">{formatTime(timeRemaining)}</span>
                  </div>
                </div>
                <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer && !isAnswerSubmitted}>
                  {isAnswerSubmitted ? (
                    <>
                      Næste
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Svar"
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium">Brug for hjælp?</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Se Materiale
                </Button>
                <Button size="sm" onClick={() => setShowAIExplain(true)}>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Få Hint
                </Button>
              </div>
            </div>

            {showAIExplain && (
              <AIExplainOverlay explanation={currentQuestion.explanation} onClose={() => setShowAIExplain(false)} />
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">Quiz Fuldført!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 text-4xl font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                    {score}/{quizQuestions.length}
                  </div>
                  <h3 className="text-xl font-semibold">
                    {score === quizQuestions.length
                      ? "Perfekt Score!"
                      : score >= quizQuestions.length * 0.7
                        ? "Godt Klaret!"
                        : "Fortsæt Det Gode Arbejde!"}
                  </h3>
                  <p className="mt-1 text-center text-muted-foreground">
                    {score === quizQuestions.length
                      ? "Du har mestret det grundlæggende arabiske ordforråd!"
                      : score >= quizQuestions.length * 0.7
                        ? "Du har en god forståelse af arabiske ord."
                        : "Med mere øvelse vil du mestre det arabiske ordforråd."}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Du har optjent</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
                        <span className="font-bold">{score * 25}</span>
                      </div>
                      <div>
                        <p className="font-medium">XP Points</p>
                        <p className="text-xs text-muted-foreground">+{score * 5} streak bonus</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Næste Badge</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-2 text-white">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Ordforråd Mester</p>
                        <p className="text-xs text-muted-foreground">2 af 3 quizzer fuldført</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Se Dine Svar</Button>
                <Button className="bg-emerald-700 hover:bg-emerald-800">Fortsæt Læring</Button>
              </CardFooter>
            </Card>
          </div>
        )}
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
