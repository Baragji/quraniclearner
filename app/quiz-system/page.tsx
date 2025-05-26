"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Trophy, Clock, BarChart2, BookOpen } from "lucide-react"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"

// Mock data for quizzes
const quizTypes = [
  { id: "vocabulary", name: "Ordforråd", icon: <BookOpen className="h-4 w-4" /> },
  { id: "grammar", name: "Grammatik", icon: <BookOpen className="h-4 w-4" /> },
  { id: "comprehension", name: "Forståelse", icon: <BookOpen className="h-4 w-4" /> },
  { id: "translation", name: "Oversættelse", icon: <BookOpen className="h-4 w-4" /> },
]

const mockQuizzes = {
  vocabulary: [
    {
      id: 1,
      question: "Hvad betyder كِتَاب?",
      options: ["Bog", "Pen", "Papir", "Bord"],
      correctAnswer: "Bog",
      type: "multiple-choice",
    },
    {
      id: 2,
      question: "Match det arabiske ord med dets betydning:",
      pairs: [
        { arabic: "قَلَم", meaning: "Pen" },
        { arabic: "مَدْرَسَة", meaning: "Skole" },
        { arabic: "بَيْت", meaning: "Hus" },
        { arabic: "مَاء", meaning: "Vand" },
      ],
      type: "matching",
    },
    {
      id: 3,
      question: 'Skriv det arabiske ord for "Dør"',
      correctAnswer: "باب",
      type: "text-input",
    },
  ],
  grammar: [
    {
      id: 1,
      question: "Hvilken type ord er هُوَ?",
      options: ["Pronomen", "Verbum", "Substantiv", "Adjektiv"],
      correctAnswer: "Pronomen",
      type: "multiple-choice",
    },
    {
      id: 2,
      question: 'Udfyld den korrekte form af verbet "at skrive" (كَتَبَ) i sætningen: أنا ____ رِسَالَة',
      options: ["كَتَبَ", "كَتَبْتُ", "يَكْتُبُ", "تَكْتُبُ"],
      correctAnswer: "كَتَبْتُ",
      type: "multiple-choice",
    },
  ],
  comprehension: [
    {
      id: 1,
      question:
        "Læs følgende passage og besvar spørgsmålet: ذَهَبَ مُحَمَّد إِلَى الْمَدْرَسَة. هُوَ طَالِب مُجْتَهِد. يَدْرُسُ كُلَّ يَوْم. Hvor gik Muhammad hen?",
      options: ["Til skolen", "Til markedet", "Til moskeen", "Til huset"],
      correctAnswer: "Til skolen",
      type: "multiple-choice",
    },
  ],
  translation: [
    {
      id: 1,
      question: "Oversæt følgende sætning til dansk: أَنَا أَسْكُنُ فِي الدَنْمَارْك",
      correctAnswer: "Jeg bor i Danmark",
      type: "text-input",
    },
  ],
}

// Quiz component
export default function QuizSystem() {
  const [activeTab, setActiveTab] = useState("vocabulary")
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<any>({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [matchingPairs, setMatchingPairs] = useState<{ [key: string]: string }>({})
  const [textInput, setTextInput] = useState("")

  const currentQuizzes = mockQuizzes[activeTab as keyof typeof mockQuizzes]
  const currentQuiz = currentQuizzes[currentQuizIndex]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning])

  useEffect(() => {
    // Reset state when changing quiz type
    setCurrentQuizIndex(0)
    setUserAnswers({})
    setQuizCompleted(false)
    setScore(0)
    setTimer(0)
    setIsTimerRunning(false)
    setMatchingPairs({})
    setTextInput("")
  }, [activeTab])

  const handleStartQuiz = () => {
    setIsTimerRunning(true)
  }

  const handleMultipleChoiceAnswer = (answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuiz.id]: answer,
    })
  }

  const handleMatchingPair = (arabic: string, meaning: string) => {
    setMatchingPairs({
      ...matchingPairs,
      [arabic]: meaning,
    })
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value)
  }

  const handleNextQuestion = () => {
    if (currentQuiz.type === "matching") {
      setUserAnswers({
        ...userAnswers,
        [currentQuiz.id]: matchingPairs,
      })
      setMatchingPairs({})
    } else if (currentQuiz.type === "text-input") {
      setUserAnswers({
        ...userAnswers,
        [currentQuiz.id]: textInput,
      })
      setTextInput("")
    }

    if (currentQuizIndex < currentQuizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1)
    } else {
      // Calculate score
      let correctAnswers = 0

      currentQuizzes.forEach((quiz) => {
        if (quiz.type === "multiple-choice" && userAnswers[quiz.id] === quiz.correctAnswer) {
          correctAnswers++
        } else if (quiz.type === "matching") {
          const userPairs = userAnswers[quiz.id] || {}
          const correctPairs = quiz.pairs.filter((pair) => userPairs[pair.arabic] === pair.meaning).length

          if (correctPairs === quiz.pairs.length) {
            correctAnswers++
          }
        } else if (quiz.type === "text-input") {
          // Case insensitive comparison for text input
          const userAnswer = userAnswers[quiz.id] || ""
          if (userAnswer.toLowerCase().trim() === quiz.correctAnswer.toLowerCase().trim()) {
            correctAnswers++
          }
        }
      })

      setScore(correctAnswers)
      setQuizCompleted(true)
      setIsTimerRunning(false)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0)
    setUserAnswers({})
    setQuizCompleted(false)
    setScore(0)
    setTimer(0)
    setIsTimerRunning(true)
    setMatchingPairs({})
    setTextInput("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const renderQuizContent = () => {
    if (!isTimerRunning && !quizCompleted) {
      return (
        <div className="flex flex-col items-center justify-center p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Quiz
          </h2>
          <p className="text-center text-gray-600">
            Test din viden om arabisk {activeTab.toLowerCase()} med denne quiz.
          </p>
          <p className="text-center text-gray-600">Quizzen indeholder {currentQuizzes.length} spørgsmål.</p>
          <Button onClick={handleStartQuiz} size="lg">
            Start Quiz
          </Button>
        </div>
      )
    }

    if (quizCompleted) {
      const percentage = Math.round((score / currentQuizzes.length) * 100)

      return (
        <div className="flex flex-col items-center justify-center p-8 space-y-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-center">Quiz Afsluttet!</h2>
          <div className="w-full max-w-md">
            <Progress value={percentage} className="h-3" />
            <div className="flex justify-between mt-2 text-sm">
              <span>0%</span>
              <span>{percentage}%</span>
              <span>100%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <BarChart2 className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-gray-500">Score</p>
                <p className="text-xl font-bold">
                  {score}/{currentQuizzes.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-gray-500">Tid</p>
                <p className="text-xl font-bold">{formatTime(timer)}</p>
              </CardContent>
            </Card>
          </div>
          <Button onClick={handleRestartQuiz} size="lg">
            Tag Quizzen Igen
          </Button>
        </div>
      )
    }

    return (
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="px-3 py-1">
            Spørgsmål {currentQuizIndex + 1}/{currentQuizzes.length}
          </Badge>
          <Badge variant="outline" className="px-3 py-1 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {formatTime(timer)}
          </Badge>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{currentQuiz.question}</h3>

          {currentQuiz.type === "multiple-choice" && (
            <RadioGroup
              value={userAnswers[currentQuiz.id] || ""}
              onValueChange={handleMultipleChoiceAnswer}
              className="space-y-3"
            >
              {currentQuiz.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer p-2 hover:bg-gray-100 rounded">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuiz.type === "matching" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Arabisk</h4>
                {currentQuiz.pairs.map((pair, index) => (
                  <Card key={index} className="p-2">
                    <div className="text-center text-xl">{pair.arabic}</div>
                  </Card>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Betydning</h4>
                {currentQuiz.pairs.map((pair, index) => (
                  <div key={index} className="space-y-1">
                    <select
                      className="w-full p-2 border rounded"
                      value={Object.entries(matchingPairs).find(([k]) => k === pair.arabic)?.[1] || ""}
                      onChange={(e) => handleMatchingPair(pair.arabic, e.target.value)}
                    >
                      <option value="">Vælg betydning</option>
                      {currentQuiz.pairs.map((p, i) => (
                        <option key={i} value={p.meaning}>
                          {p.meaning}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentQuiz.type === "text-input" && (
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Skriv dit svar her..."
                value={textInput}
                onChange={handleTextInputChange}
                dir={currentQuiz.correctAnswer.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr"}
              />
            </div>
          )}
        </div>

        <Button
          onClick={handleNextQuestion}
          className="w-full"
          disabled={
            (currentQuiz.type === "multiple-choice" && !userAnswers[currentQuiz.id]) ||
            (currentQuiz.type === "matching" && Object.keys(matchingPairs).length !== currentQuiz.pairs.length) ||
            (currentQuiz.type === "text-input" && !textInput)
          }
        >
          {currentQuizIndex < currentQuizzes.length - 1 ? "Næste Spørgsmål" : "Afslut Quiz"}
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <GlassmorphismHeader
        title="Quiz System"
        description="Test din viden om arabisk med interaktive quizzer"
        imageUrl="/placeholder.svg?height=100&width=100"
      />

      <Tabs defaultValue="vocabulary" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          {quizTypes.map((type) => (
            <TabsTrigger
              key={type.id}
              value={type.id}
              className="flex items-center gap-2"
              disabled={isTimerRunning && !quizCompleted}
            >
              {type.icon}
              <span>{type.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {quizTypes.map((type) => (
          <TabsContent key={type.id} value={type.id} className="mt-0">
            <Card>
              <CardContent className="p-0">{renderQuizContent()}</CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Statistik</CardTitle>
            <CardDescription>Din præstation i quizzer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Gennemførte quizzer</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>Gennemsnitlig score</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="flex justify-between">
                <span>Bedste kategori</span>
                <span className="font-medium">Ordforråd</span>
              </div>
              <div className="flex justify-between">
                <span>Område til forbedring</span>
                <span className="font-medium">Grammatik</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anbefalede Quizzer</CardTitle>
            <CardDescription>Baseret på din læringssti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Grundlæggende Grammatik</p>
                  <p className="text-sm text-gray-500">10 spørgsmål · 5 min</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Quran Ordforråd</p>
                  <p className="text-sm text-gray-500">15 spørgsmål · 8 min</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Daglige Udtryk</p>
                  <p className="text-sm text-gray-500">8 spørgsmål · 4 min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Præstationsoversigt</CardTitle>
            <CardDescription>Dine styrker og svagheder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Ordforråd</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Grammatik</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Forståelse</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Oversættelse</span>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
