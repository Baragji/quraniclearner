"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, HelpCircle, Lightbulb, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"
import { AIExplainOverlay } from "@/components/ai-explain-overlay"

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [showAIExplain, setShowAIExplain] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [difficulty, setDifficulty] = useState(50) // 0-100 scale

  const quizQuestions = [
    {
      question: "Hvilken metode bruges til at vælge specifikke kolonner i en Pandas DataFrame?",
      options: [
        "df.select(['kolonne1', 'kolonne2'])",
        "df[['kolonne1', 'kolonne2']]",
        "df.columns(['kolonne1', 'kolonne2'])",
        "df.get_columns('kolonne1', 'kolonne2')",
      ],
      correctAnswer: "df[['kolonne1', 'kolonne2']]",
      explanation:
        "I Pandas bruges dobbelte firkantede parenteser df[['kolonne1', 'kolonne2']] til at vælge flere specifikke kolonner. Den ydre parentes er DataFrame-indekseringsoperatoren, og den indre liste definerer kolonnerne, der skal vælges.",
    },
    {
      question: "Hvordan filtrerer man rækker i en DataFrame baseret på en betingelse?",
      options: [
        "df.filter(df['kolonne'] > 10)",
        "df.where(df['kolonne'] > 10)",
        "df[df['kolonne'] > 10]",
        "df.query('kolonne > 10')",
      ],
      correctAnswer: "df[df['kolonne'] > 10]",
      explanation:
        "For at filtrere rækker baseret på en betingelse, bruges boolean indexing: df[df['kolonne'] > 10]. Dette returnerer alle rækker, hvor værdien i 'kolonne' er større end 10. Bemærk at df.query('kolonne > 10') også er en gyldig metode, men den første er mere almindelig.",
    },
    {
      question: "Hvilken funktion bruges til at håndtere manglende værdier i en DataFrame?",
      options: ["df.handle_missing()", "df.dropna()", "df.fillna(0)", "Både B og C er korrekte"],
      correctAnswer: "Både B og C er korrekte",
      explanation:
        "Både dropna() og fillna() bruges til at håndtere manglende værdier. dropna() fjerner rækker eller kolonner med manglende værdier, mens fillna() erstatter manglende værdier med en specificeret værdi (f.eks. 0).",
    },
    {
      question: "Hvordan beregner man gennemsnittet af en numerisk kolonne i en DataFrame?",
      options: [
        "df['kolonne'].mean()",
        "df['kolonne'].average()",
        "df.mean('kolonne')",
        "df.calculate_mean('kolonne')",
      ],
      correctAnswer: "df['kolonne'].mean()",
      explanation:
        "For at beregne gennemsnittet af en kolonne, bruges mean() metoden på kolonnen: df['kolonne'].mean(). Dette er en del af Pandas' deskriptive statistikfunktioner.",
    },
    {
      question: "Hvilken metode bruges til at gruppere data i en DataFrame?",
      options: ["df.categorize()", "df.segment()", "df.groupby()", "df.cluster()"],
      correctAnswer: "df.groupby()",
      explanation:
        "groupby() metoden bruges til at gruppere DataFrame-data baseret på værdier i en eller flere kolonner. Dette muliggør aggregeringsoperationer som sum(), mean(), count() osv. på hver gruppe.",
    },
  ]

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)) / quizQuestions.length) * 100

  const handleAnswerSelect = (answer) => {
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
        // Increase difficulty slightly for correct answers
        setDifficulty(Math.min(100, difficulty + 5))
      } else {
        // Decrease difficulty for incorrect answers
        setDifficulty(Math.max(0, difficulty - 10))
        setShowAIExplain(true)
      }
      setIsAnswerSubmitted(true)
    } else {
      // Move to next question
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
      <GlassmorphismHeader />

      <main className="container pb-16 pt-24">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <a href="/kurser/dataanalyse-python/datastrukturer/pandas-dataframe-manipulation">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbage til Emne
            </a>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Pandas DataFrame Quiz</h1>
          <p className="text-muted-foreground">Test din viden om Pandas DataFrame manipulation</p>
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
              <Progress value={progress} className="h-2" />
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
                              ? "border-purple-200 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20"
                              : ""
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} disabled={isAnswerSubmitted} />
                      <label
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
                      </label>
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
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(currentQuestionIndex - 1)
                      setSelectedAnswer("")
                      setIsAnswerSubmitted(false)
                      setShowAIExplain(false)
                    }
                  }}
                  disabled={currentQuestionIndex === 0 || isAnswerSubmitted}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Forrige
                </Button>
                <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer && !isAnswerSubmitted}>
                  {isAnswerSubmitted ? (
                    <>
                      Næste
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Svar"
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Brug for hjælp?</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Se Materiale
                </Button>
                <Button size="sm">
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
                  <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-purple-100 text-4xl font-bold text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
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
                      ? "Du har mestret Pandas DataFrame koncepterne!"
                      : score >= quizQuestions.length * 0.7
                        ? "Du har en god forståelse af Pandas DataFrames."
                        : "Med mere øvelse vil du mestre Pandas DataFrames."}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 font-semibold">AI Anbefaling</h3>
                  <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800">
                        <span className="text-xs font-bold text-purple-700 dark:text-purple-300">AI</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {score === quizQuestions.length
                            ? "Fantastisk arbejde! Du er klar til at udforske mere avancerede Pandas funktioner som pivot tables og multi-indexing."
                            : score >= quizQuestions.length * 0.7
                              ? "Du klarer dig godt! Fokuser på at øve filtrering og gruppering af data for at styrke din forståelse yderligere."
                              : "Jeg anbefaler at gennemgå grundlæggende DataFrame operationer igen, især hvordan man vælger og filtrerer data."}
                        </p>
                        <div className="mt-3">
                          <Button size="sm">
                            {score === quizQuestions.length
                              ? "Gå til Avancerede Emner"
                              : score >= quizQuestions.length * 0.7
                                ? "Øv med Praktiske Opgaver"
                                : "Gennemgå Materialet Igen"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Du har optjent</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white">
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
                        <p className="font-medium">Data Analyst</p>
                        <p className="text-xs text-muted-foreground">2 af 3 quizzer fuldført</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Se Dine Svar</Button>
                <Button>Fortsæt Læring</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
