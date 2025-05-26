"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  BarChart,
  BookOpen,
  Award,
  Star,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  BarChart3,
  Sparkles,
  AlertCircle,
  Volume,
  Layers,
  CheckCircle,
} from "lucide-react"
import { LevelProgressRing } from "@/components/level-progress-ring"
import { ProgressRing } from "@/components/progress-ring"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"

// Mock data for user progress
const mockUserProgress = {
  level: 12,
  levelProgress: 65,
  totalXP: 24680,
  streak: 42,
  hoursStudied: 120,
  completedLessons: 78,
  masteredWords: 520,
  skillBreakdown: {
    vocabulary: 85,
    grammar: 72,
    pronunciation: 68,
    reading: 77,
    writing: 64,
    listening: 70,
  },
  recentActivity: [
    { date: "2024-05-19", xp: 120, type: "Vocabulary Practice", accuracy: 90 },
    { date: "2024-05-18", xp: 85, type: "Grammar Quiz", accuracy: 75 },
    { date: "2024-05-17", xp: 150, type: "Quran Reading", accuracy: 85 },
    { date: "2024-05-16", xp: 65, type: "Pronunciation Session", accuracy: 70 },
    { date: "2024-05-15", xp: 110, type: "Flashcard Review", accuracy: 95 },
  ],
  weeklyXP: {
    Mandag: 250,
    Tirsdag: 350,
    Onsdag: 200,
    Torsdag: 300,
    Fredag: 400,
    Lørdag: 150,
    Søndag: 320,
  },
  achievements: [
    { name: "7-dages Streak", icon: "Calendar", earned: true, description: "Lær i 7 dage i træk" },
    { name: "Ordmester", icon: "BookOpen", earned: true, description: "Lær 500 nye ord" },
    {
      name: "Grammatikekspert",
      icon: "Award",
      earned: false,
      description: "Opnå 90% nøjagtighed i 10 grammatikquizzer",
    },
    { name: "Surah Fuldførelse", icon: "Star", earned: true, description: "Læs og oversæt en hel surah" },
    { name: "Udtaleperfektionist", icon: "Volume", earned: false, description: "Opnå perfekt score i 5 udtaleøvelser" },
  ],
}

// Mock data for learning path
const mockLearningPath = {
  currentFocus: "Intermediate Grammar",
  recommendedNext: [
    {
      title: "Verbale Former",
      difficulty: "Medium",
      type: "Grammar",
      estimated: "45 min",
      reasons: ["Baseret på din grammatikscore", "Næste logiske skridt i curriculum"],
    },
    {
      title: "Hverdagsudtryk",
      difficulty: "Easy",
      type: "Vocabulary",
      estimated: "30 min",
      reasons: ["Forbedrer konversationelle færdigheder", "Høj anvendelsesfrekvens"],
    },
    {
      title: "Surah Al-Fatiha Analyse",
      difficulty: "Hard",
      type: "Quran Study",
      estimated: "60 min",
      reasons: ["Bygger på tidligere Quran-studier", "Høj relevans for læringsmål"],
    },
  ],
  customizedPath: {
    shortTerm: [
      { week: 1, focus: "Verbale Former & Basale Samtaleudtryk", hours: 5 },
      { week: 2, focus: "Quran Analyse & Lytteøvelser", hours: 5 },
      { week: 3, focus: "Idiomatiske Udtryk & Tekstlæsning", hours: 5 },
    ],
    longTerm: [
      {
        month: 1,
        goal: "Beherskelse af grundlæggende samtale",
        milestones: ["500 ord", "10 samtaleemner", "Grundlæggende grammatiske strukturer"],
      },
      {
        month: 3,
        goal: "Læs korte arabiske tekster",
        milestones: ["1000 ord", "Intermediær grammatik", "Basale læseteknikker"],
      },
      {
        month: 6,
        goal: "Forstå simple Quran-passager",
        milestones: ["Quranisk ordforråd", "Grundlæggende tafsir", "Morfologisk analyse"],
      },
    ],
  },
  adaptiveRecommendations: {
    strengths: ["Vocabulary Retention", "Pattern Recognition", "Reading Comprehension"],
    weaknesses: ["Pronunciation of Gutturals", "Complex Grammar Structures", "Listening Comprehension"],
    recommendedFocus: [
      "Daily pronunciation practice",
      "Grammar drills focusing on verbal forms",
      "Listening exercises with native speakers",
    ],
  },
}

// Mock data for learning goals
const mockLearningGoals = {
  active: [
    { title: "Lær 200 nye ord", progress: 85, deadline: "1. juni 2024", type: "Vocabulary" },
    { title: "Fuldfør 'Verbernes Verden' Kursus", progress: 60, deadline: "15. juni 2024", type: "Grammar" },
    { title: "Læs og oversæt Surah Al-Mulk", progress: 30, deadline: "30. juni 2024", type: "Quran Study" },
  ],
  completed: [
    { title: "Lær det arabiske alfabet", progress: 100, completedDate: "10. januar 2024", type: "Fundamentals" },
    { title: "Gennemfør begynderkursus", progress: 100, completedDate: "5. marts 2024", type: "Course" },
    { title: "Memorisér 100 almindelige ord", progress: 100, completedDate: "20. april 2024", type: "Vocabulary" },
  ],
  suggested: [
    {
      title: "Træn konversation med native speakers",
      type: "Speaking",
      difficulty: "Medium",
      estimatedTime: "8 uger (2 timer/uge)",
    },
    {
      title: "Mestre arabiske diftoner",
      type: "Pronunciation",
      difficulty: "Hard",
      estimatedTime: "4 uger (20 min/dag)",
    },
    {
      title: "Studér klassisk arabisk poesi",
      type: "Literature",
      difficulty: "Expert",
      estimatedTime: "12 uger (3 timer/uge)",
    },
  ],
}

export default function AdvancedProgression() {
  const [activeTab, setActiveTab] = useState("insights")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <GlassmorphismHeader
        title="Avanceret Progression"
        description="Få detaljeret indsigt i din læringsfremgang, personlige anbefalinger og adaptive læringssti"
        imageUrl="/placeholder.svg?height=100&width=100"
      />

      <Tabs defaultValue="insights" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Indsigter &amp; Analyse</span>
          </TabsTrigger>
          <TabsTrigger value="learning-path" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Læringssti</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span>Mål &amp; Milepæle</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Din Niveau</CardTitle>
                <CardDescription>Din aktuelle progression</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center pt-4">
                <LevelProgressRing level={mockUserProgress.level} progress={mockUserProgress.levelProgress} />
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-lg font-semibold">{mockUserProgress.totalXP} XP i alt</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-500 mb-1" />
                      <span className="text-lg font-bold">{mockUserProgress.streak}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Dages streak</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Clock className="h-5 w-5 text-green-500 mb-1" />
                      <span className="text-lg font-bold">{mockUserProgress.hoursStudied}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Timer studeret</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <BookOpen className="h-5 w-5 text-purple-500 mb-1" />
                      <span className="text-lg font-bold">{mockUserProgress.completedLessons}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Lektioner</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Award className="h-5 w-5 text-amber-500 mb-1" />
                      <span className="text-lg font-bold">{mockUserProgress.masteredWords}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Mestrede ord</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Færdighedsopdeling</CardTitle>
                <CardDescription>Din præstation på tværs af færdighedsområder</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(mockUserProgress.skillBreakdown).map(([skill, score]) => (
                    <div key={skill} className="flex flex-col items-center">
                      <ProgressRing progress={score} size={80}>
                        <div className="flex flex-col items-center justify-center text-center">
                          <span className="text-lg font-bold">{score}%</span>
                        </div>
                      </ProgressRing>
                      <span className="mt-2 capitalize">{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full">
                  Se Detaljeret Analyse
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Ugentlig XP</CardTitle>
                <CardDescription>Din læringsaktivitet gennem ugen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {Object.entries(mockUserProgress.weeklyXP).map(([day, xp]) => {
                    const heightPercentage = (xp / 400) * 100
                    return (
                      <div key={day} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-purple-500 dark:bg-purple-600 rounded-t-md"
                          style={{ height: `${heightPercentage}%` }}
                        ></div>
                        <div className="mt-2 text-xs text-center">
                          <div>{day.substring(0, 3)}</div>
                          <div className="font-semibold">{xp} XP</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Seneste Aktivitet</CardTitle>
                <CardDescription>Dine seneste læringsaktiviteter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserProgress.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                          {activity.type.includes("Vocabulary") && <BookOpen className="h-5 w-5" />}
                          {activity.type.includes("Grammar") && <BarChart3 className="h-5 w-5" />}
                          {activity.type.includes("Quran") && <BookOpen className="h-5 w-5" />}
                          {activity.type.includes("Pronunciation") && <Volume className="h-5 w-5" />}
                          {activity.type.includes("Flashcard") && <Layers className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="font-medium">{activity.type}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={activity.accuracy >= 90 ? "default" : "secondary"}>
                          {activity.accuracy}% præcision
                        </Badge>
                        <div className="font-semibold text-purple-600 dark:text-purple-400">+{activity.xp} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Se Komplet Historie
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Præstationer</CardTitle>
                <CardDescription>Din indsats belønnes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserProgress.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-lg ${
                        achievement.earned
                          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50"
                          : "bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full ${
                          achievement.earned
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                        } mr-3`}
                      >
                        {achievement.icon === "Calendar" && <Calendar className="h-4 w-4" />}
                        {achievement.icon === "BookOpen" && <BookOpen className="h-4 w-4" />}
                        {achievement.icon === "Award" && <Award className="h-4 w-4" />}
                        {achievement.icon === "Star" && <Star className="h-4 w-4" />}
                        {achievement.icon === "Volume" && <Volume className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-xs">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Se Alle Præstationer
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learning-path" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Anbefalede Næste Skridt</CardTitle>
                <CardDescription>Baseret på din performance og læringsmål</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <AlertTitle>Nuværende Fokus: {mockLearningPath.currentFocus}</AlertTitle>
                  <AlertDescription>
                    Dit AI-personlige kurrikulum er tilpasset for at maksimere din læring baseret på dine fremskridt og
                    mål.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {mockLearningPath.recommendedNext.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{item.title}</h4>
                            <Badge
                              variant={
                                item.difficulty === "Easy"
                                  ? "outline"
                                  : item.difficulty === "Medium"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {item.difficulty}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>{item.type}</span>
                            <span>•</span>
                            <span>{item.estimated}</span>
                          </div>
                          <div className="pt-2">
                            <div className="text-sm font-medium">Anbefalet fordi:</div>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                              {item.reasons.map((reason, i) => (
                                <li key={i}>{reason}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Button>Start Nu</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>AI-adaptiv Feedback</CardTitle>
                <CardDescription>Personaliseret feedback på din læringsstil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Dine Styrker</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {mockLearningPath.adaptiveRecommendations.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-2">Områder til Forbedring</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {mockLearningPath.adaptiveRecommendations.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Anbefalet Fokus</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {mockLearningPath.adaptiveRecommendations.recommendedFocus.map((focus, index) => (
                      <li key={index}>{focus}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Din Personlige Læringssti</CardTitle>
                <CardDescription>Skræddersyet curriculum baseret på dine mål</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Kortsigtet Plan (Næste 3 Uger)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockLearningPath.customizedPath.shortTerm.map((item, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium py-1 px-2 rounded mb-2">
                              Uge {item.week}
                            </div>
                            <h4 className="font-medium">{item.focus}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                              Anbefalet: ~{item.hours} timer
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Langsigtet Plan (6 Måneder)</h3>
                  <div className="space-y-6">
                    {mockLearningPath.customizedPath.longTerm.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium py-1 px-3 rounded">
                            Måned {item.month}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Projekteret Milestone</div>
                        </div>
                        <h4 className="text-lg font-semibold mb-2">{item.goal}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                          {item.milestones.map((milestone, idx) => (
                            <div
                              key={idx}
                              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 p-2 rounded text-center text-sm"
                            >
                              {milestone}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Tilpas Min Læringssti</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Aktive Mål</CardTitle>
                <CardDescription>Dine nuværende læringsmål</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockLearningGoals.active.map((goal, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{goal.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <Badge variant="outline">{goal.type}</Badge>
                            <span>Deadline: {goal.deadline}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8">
                          Rediger
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Fremskridt</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button className="w-full">Tilføj Nyt Mål</Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Fuldførte Mål</CardTitle>
                <CardDescription>Mål du har opnået</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockLearningGoals.completed.map((goal, index) => (
                  <div
                    key={index}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{goal.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <Badge variant="outline" className="bg-transparent">
                            {goal.type}
                          </Badge>
                          <span>Afsluttet: {goal.completedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  Se Alle Fuldførte Mål
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Foreslåede Mål</CardTitle>
                <CardDescription>Baseret på din fremgang og interesse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockLearningGoals.suggested.map((goal, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge
                            variant={
                              goal.difficulty === "Easy"
                                ? "outline"
                                : goal.difficulty === "Medium"
                                  ? "secondary"
                                  : goal.difficulty === "Hard"
                                    ? "destructive"
                                    : "default"
                            }
                          >
                            {goal.difficulty}
                          </Badge>
                          <Badge variant="outline">{goal.type}</Badge>
                        </div>
                        <h4 className="font-semibold text-lg mb-2">{goal.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{goal.estimatedTime}</p>
                        <Button size="sm" className="w-full">
                          Tilføj Dette Mål
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Alert variant="destructive" className="w-full">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Vigtigt at bemærke</AlertTitle>
                  <AlertDescription>
                    Sæt realistiske mål og tidsrammer. Det er bedre at opnå mindre mål konsekvent end at sætte for
                    ambitiøse mål, der kan føre til demotivation.
                  </AlertDescription>
                </Alert>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
