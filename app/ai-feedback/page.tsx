"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Play, Square, Volume2, BookOpen, RefreshCw, AlertCircle, CheckCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"
import { AIExplainOverlay } from "@/components/ai-explain-overlay"

// Mock data for pronunciation feedback
const mockPronunciationFeedback = {
  overallScore: 78,
  feedback:
    "Din udtale er generelt god, men der er nogle områder, der kan forbedres. Fokuser på at udtale de gutturale lyde mere distinkt og arbejd på din intonation.",
  detailedFeedback: [
    {
      word: "الرَّحْمَنِ",
      score: 65,
      issues: ["Gutturale lyde kunne være mere distinkte", "Intonation kunne forbedres"],
      correctAudioUrl: "/placeholder-audio.mp3",
    },
    {
      word: "الرَّحِيمِ",
      score: 85,
      issues: ["Let forbedring af længden på lange vokaler"],
      correctAudioUrl: "/placeholder-audio.mp3",
    },
    {
      word: "مَالِكِ",
      score: 90,
      issues: [],
      correctAudioUrl: "/placeholder-audio.mp3",
    },
    {
      word: "يَوْمِ",
      score: 75,
      issues: ["Diftong kunne være tydeligere"],
      correctAudioUrl: "/placeholder-audio.mp3",
    },
    {
      word: "الدِّينِ",
      score: 75,
      issues: ["Emfatisk 'd' kunne være stærkere"],
      correctAudioUrl: "/placeholder-audio.mp3",
    },
  ],
}

// Mock data for grammar feedback
const mockGrammarFeedback = {
  overallScore: 82,
  feedback:
    "Din grammatiske forståelse er god. Du har en solid forståelse af grundlæggende strukturer, men kan forbedre din brug af kasus-endelser og verbale former.",
  detailedFeedback: [
    {
      sentence: "ذَهَبْتُ إِلَى المَدْرَسَةِ",
      translation: "Jeg gik til skolen",
      score: 95,
      correct: true,
      explanation: "Korrekt brug af perfektum verbum og præposition",
    },
    {
      sentence: "الكِتَابُ عَلَى الطَاوِلَةِ",
      translation: "Bogen er på bordet",
      score: 90,
      correct: true,
      explanation: "Korrekt nominativ kasus for subjekt",
    },
    {
      sentence: "أَكَلْتُ الطَعَامَ اللَذِيذَ",
      translation: "Jeg spiste den lækre mad",
      score: 70,
      correct: false,
      explanation: "Adjektivet skal matche substantivet i bestemthed: الطَعَامَ اللَذِيذَ",
      correction: "أَكَلْتُ الطَعَامَ اللَذِيذَ",
    },
    {
      sentence: "هُوَ يَذْهَبُ إِلَى المَسْجِدِ",
      translation: "Han går til moskeen",
      score: 85,
      correct: true,
      explanation: "Korrekt brug af præsens verbum",
    },
  ],
}

// Mock data for translation feedback
const mockTranslationFeedback = {
  overallScore: 75,
  feedback:
    "Din oversættelse fanger den grundlæggende betydning, men der er plads til forbedring i præcision og nuancer. Fokuser på at forstå konteksten og kulturelle referencer.",
  detailedFeedback: [
    {
      original: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
      userTranslation: "I Guds, Den Nådiges, Den Barmhjertiges navn",
      correctTranslation: "I Allahs, Den Barmhjertiges, Den Nådiges navn",
      score: 85,
      feedback: "God oversættelse, men rækkefølgen af attributterne er byttet om",
    },
    {
      original: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      userTranslation: "Tak til Gud, verdens herre",
      correctTranslation: "Al lovprisning tilkommer Allah, alle verdeners Herre",
      score: 70,
      feedback: "Oversættelsen mangler dybde og præcision. 'Al-hamd' er mere omfattende end blot 'tak'",
    },
    {
      original: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      userTranslation: "Dig alene tilbeder vi, og dig alene beder vi om hjælp",
      correctTranslation: "Dig alene tilbeder vi, og Dig alene beder vi om hjælp",
      score: 95,
      feedback: "Excellent oversættelse, der fanger både betydning og emfase",
    },
  ],
}

export default function AIFeedback() {
  const [activeTab, setActiveTab] = useState("pronunciation")
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [grammarInput, setGrammarInput] = useState("")
  const [translationInput, setTranslationInput] = useState("")
  const [translationOriginal, setTranslationOriginal] = useState(
    "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
  )
  const [showAIExplain, setShowAIExplain] = useState(false)
  const [currentExplanation, setCurrentExplanation] = useState({ title: "", content: "" })
  const [processingFeedback, setProcessingFeedback] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Simulate recording functionality
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)
        setRecordedAudio(audioUrl)
        audioChunksRef.current = []
      }

      audioChunksRef.current = []
      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      // In a real app, show a user-friendly error message
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Simulate a delay for processing
      setProcessingFeedback(true)
      setTimeout(() => {
        setProcessingFeedback(false)
        setShowFeedback(true)
      }, 1500)
    }
  }

  const playAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const handleGrammarInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGrammarInput(e.target.value)
  }

  const handleTranslationInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranslationInput(e.target.value)
  }

  const submitGrammarForFeedback = () => {
    // In a real app, this would send the text to an AI for analysis
    setProcessingFeedback(true)
    setTimeout(() => {
      setProcessingFeedback(false)
      setShowFeedback(true)
    }, 1500)
  }

  const submitTranslationForFeedback = () => {
    // In a real app, this would send the translation to an AI for analysis
    setProcessingFeedback(true)
    setTimeout(() => {
      setProcessingFeedback(false)
      setShowFeedback(true)
    }, 1500)
  }

  const resetFeedback = () => {
    setShowFeedback(false)
    setRecordedAudio(null)
    setGrammarInput("")
    setTranslationInput("")
  }

  const showExplanation = (title: string, content: string) => {
    setCurrentExplanation({ title, content })
    setShowAIExplain(true)
  }

  const closeExplanation = () => {
    setShowAIExplain(false)
  }

  // Reset feedback when changing tabs
  useEffect(() => {
    setShowFeedback(false)
    setRecordedAudio(null)
    setProcessingFeedback(false)
    stopAudio()
  }, [activeTab])

  return (
    <div className="container mx-auto py-6 space-y-8">
      <GlassmorphismHeader
        title="AI Feedback"
        description="Få personlig feedback på din udtale, grammatik og oversættelse"
        imageUrl="/placeholder.svg?height=100&width=100"
      />

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />

      {showAIExplain && (
        <AIExplainOverlay
          title={currentExplanation.title}
          content={currentExplanation.content}
          onClose={closeExplanation}
        />
      )}

      <Tabs defaultValue="pronunciation" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="pronunciation" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <span>Udtale</span>
          </TabsTrigger>
          <TabsTrigger value="grammar" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Grammatik</span>
          </TabsTrigger>
          <TabsTrigger value="translation" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Oversættelse</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pronunciation" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Udtaleøvelse</CardTitle>
                <CardDescription>Optag din udtale for at få AI-feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showFeedback ? (
                  <>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-center">Læs følgende passage højt:</h3>
                      <p className="text-2xl text-center leading-relaxed" dir="rtl" lang="ar">
                        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                        <br />
                        الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
                        <br />
                        الرَّحْمَنِ الرَّحِيمِ
                        <br />
                        مَالِكِ يَوْمِ الدِّينِ
                      </p>
                    </div>

                    <div className="flex justify-center">
                      {recordedAudio ? (
                        <div className="flex space-x-4">
                          <Button
                            variant={isPlaying ? "destructive" : "default"}
                            size="lg"
                            onClick={isPlaying ? stopAudio : () => playAudio(recordedAudio)}
                            className="flex items-center gap-2"
                          >
                            {isPlaying ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            {isPlaying ? "Stop" : "Afspil Optagelse"}
                          </Button>
                          <Button variant="outline" size="lg" onClick={() => setRecordedAudio(null)}>
                            Optag Igen
                          </Button>
                          <Button
                            size="lg"
                            onClick={() => {
                              setProcessingFeedback(true)
                              setTimeout(() => {
                                setProcessingFeedback(false)
                                setShowFeedback(true)
                              }, 1500)
                            }}
                          >
                            Få Feedback
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant={isRecording ? "destructive" : "default"}
                          size="lg"
                          onClick={isRecording ? stopRecording : startRecording}
                          className="flex items-center gap-2"
                        >
                          <Mic className="h-4 w-4" />
                          {isRecording ? "Stop Optagelse" : "Start Optagelse"}
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Din Udtale Feedback</h3>
                      <Button variant="outline" size="sm" onClick={resetFeedback}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Prøv Igen
                      </Button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Samlet Score</span>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold mr-2">{mockPronunciationFeedback.overallScore}%</span>
                          <Badge
                            variant={
                              mockPronunciationFeedback.overallScore >= 80
                                ? "default"
                                : mockPronunciationFeedback.overallScore >= 60
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {mockPronunciationFeedback.overallScore >= 80
                              ? "God"
                              : mockPronunciationFeedback.overallScore >= 60
                                ? "Forbedring Nødvendig"
                                : "Behøver Øvelse"}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={mockPronunciationFeedback.overallScore} className="h-2 mb-4" />
                      <p className="text-gray-700 dark:text-gray-300">{mockPronunciationFeedback.feedback}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Detaljeret Feedback</h4>

                      {mockPronunciationFeedback.detailedFeedback.map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <span className="text-xl font-semibold mr-2" dir="rtl" lang="ar">
                                  {item.word}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => playAudio(item.correctAudioUrl)}
                                >
                                  <Volume2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <Badge
                                variant={item.score >= 80 ? "default" : item.score >= 60 ? "secondary" : "destructive"}
                              >
                                {item.score}%
                              </Badge>
                            </div>

                            {item.issues.length > 0 ? (
                              <div className="space-y-1 mt-2">
                                {item.issues.map((issue, i) => (
                                  <div key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                    <AlertCircle className="h-4 w-4 mr-1 mt-0.5 text-amber-500" />
                                    {issue}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="flex items-start text-sm text-green-600 dark:text-green-400 mt-2">
                                <CheckCircle className="h-4 w-4 mr-1 mt-0.5" />
                                Udtalen er god
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {processingFeedback && (
                  <div className="p-8 flex flex-col items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-purple-400"></div>
                      <div className="h-2 w-48 bg-purple-200 rounded"></div>
                      <div className="h-2 w-40 bg-purple-200 rounded"></div>
                    </div>
                    <p className="mt-4 text-center text-gray-600 dark:text-gray-400">Analyserer din udtale...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Tips til Forbedring</CardTitle>
                <CardDescription>Lær hvordan du kan forbedre din udtale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Gutturale Lyde i Arabisk",
                      "Gutturale lyde er konsanter, der udtales i halsen. I arabisk inkluderer disse lyde: ح (ha), خ (kha), ع (ayn), غ (ghayn), ق (qaf). Disse lyde findes ikke i mange vestlige sprog, så de kræver særlig opmærksomhed. Prøv at lytte til indfødte talere og øv dig i at imitere disse lyde.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Forståelse af Gutturale Lyde</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Håndtering af Arabisk Intonation",
                      "Intonation refererer til tonefaldet og rytmen i sproget. I arabisk er intonation vigtig for at formidle betydning og følelser. Bemærk hvordan tonehøjden ændrer sig i forskellige typer sætninger (spørgsmål, udsagn, komandoer). Lyt til koranrecitationer for at fornemme den korrekte rytme og intonation.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Håndtering af Intonation</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Lange og Korte Vokaler",
                      "Arabisk skelner mellem lange og korte vokaler. Korte vokaler er ofte repræsenteret ved diakritiske tegn (fatha, kasra, damma), mens lange vokaler bruger disse tegn sammen med 'alif', 'ya' eller 'waw'. Det er vigtigt at udtale lange vokaler omkring dobbelt så lang tid som korte vokaler for at sikre korrekt udtale og betydning.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Lange og Korte Vokaler</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Emfatiske Konsonanter",
                      "Arabisk har flere emfatiske konsonanter, som udtales med mere kraft og en dybere resonans. Disse inkluderer ص (sad), ض (dad), ط (ta), ظ (zha). For at udtale disse korrekt, prøv at 'forstørre' mundhulen ved at sænke underkæben og trække tungen lidt tilbage.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Emfatiske Konsonanter</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Øvelsestekniker",
                      "Regelmæssig øvelse er nøglen til at forbedre din udtale. Prøv at optage dig selv og sammenligne med indfødte talere. Gentag vanskelige ord og lyde flere gange. Deltag i konversationsgrupper, hvor du kan øve og få feedback. Lyt aktivt til arabiske medier, koranrecitationer eller podcasts for at træne dit øre.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Øvelsestekniker</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grammar" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Grammatikanalyse</CardTitle>
                <CardDescription>Indtast arabiske sætninger for at få grammatisk feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showFeedback ? (
                  <>
                    <div className="space-y-4">
                      <Textarea
                        dir="rtl"
                        lang="ar"
                        placeholder="Indtast arabiske sætninger her..."
                        className="min-h-[150px] text-lg"
                        value={grammarInput}
                        onChange={handleGrammarInputChange}
                      />

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Eksempel</AlertTitle>
                        <AlertDescription>
                          Du kan indtaste sætninger som:
                          <div dir="rtl" lang="ar" className="mt-2">
                            ذَهَبْتُ إِلَى المَدْرَسَةِ
                            <br />
                            الكِتَابُ عَلَى الطَاوِلَةِ
                            <br />
                            أَكَلْتُ الطَعَامَ اللَذِيذَ
                          </div>
                        </AlertDescription>
                      </Alert>

                      <div className="flex justify-center">
                        <Button size="lg" onClick={submitGrammarForFeedback} disabled={!grammarInput.trim()}>
                          Få Grammatisk Feedback
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Din Grammatiske Feedback</h3>
                      <Button variant="outline" size="sm" onClick={resetFeedback}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Prøv Igen
                      </Button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Samlet Score</span>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold mr-2">{mockGrammarFeedback.overallScore}%</span>
                          <Badge
                            variant={
                              mockGrammarFeedback.overallScore >= 80
                                ? "default"
                                : mockGrammarFeedback.overallScore >= 60
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {mockGrammarFeedback.overallScore >= 80
                              ? "God"
                              : mockGrammarFeedback.overallScore >= 60
                                ? "Forbedring Nødvendig"
                                : "Behøver Øvelse"}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={mockGrammarFeedback.overallScore} className="h-2 mb-4" />
                      <p className="text-gray-700 dark:text-gray-300">{mockGrammarFeedback.feedback}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Detaljeret Feedback</h4>

                      {mockGrammarFeedback.detailedFeedback.map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xl font-semibold" dir="rtl" lang="ar">
                                {item.sentence}
                              </span>
                              <Badge variant={item.correct ? "default" : "destructive"}>{item.score}%</Badge>
                            </div>

                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.translation}</div>

                            {item.correct ? (
                              <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {item.explanation}
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  {item.explanation}
                                </div>
                                {item.correction && (
                                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-900/50">
                                    <div className="text-xs text-green-700 dark:text-green-400 mb-1">Korrekt Form:</div>
                                    <div dir="rtl" lang="ar" className="text-green-800 dark:text-green-300 font-medium">
                                      {item.correction}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {processingFeedback && (
                  <div className="p-8 flex flex-col items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-purple-400"></div>
                      <div className="h-2 w-48 bg-purple-200 rounded"></div>
                      <div className="h-2 w-40 bg-purple-200 rounded"></div>
                    </div>
                    <p className="mt-4 text-center text-gray-600 dark:text-gray-400">Analyserer grammatikken...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Grammatiske Koncepter</CardTitle>
                <CardDescription>Forstå nøglekoncepter i arabisk grammatik</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Kasus i Arabisk",
                      "Arabisk har tre kasus: nominativ (marfu - مَرْفُوع), akkusativ (mansub - مَنْصُوب) og genitiv (majrur - مَجْرُور). Nominativ bruges typisk til subjekter, akkusativ til objekter, og genitiv bruges efter præpositioner og i genitiv-konstruktioner. Hvert kasus har sine egne endelser, der varierer afhængigt af substantivets bestemthed og tal.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Kasus-system</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Verbale Former i Arabisk",
                      "Arabiske verber har forskellige former baseret på tid (perfektum/præteritum, imperfektum/præsens) og aspekt. Derudover bruger arabisk forskellige mønstre (awzan - أَوْزَان) til at danne afledte verbformer, der tilføjer forskellige betydninger til grundverbet, såsom kausativ, refleksiv, passiv, osv.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Verbale Former</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Kongruens i Arabisk",
                      "Kongruens er overensstemmelsen mellem forskellige grammatiske elementer, såsom adjektiver og substantiver. I arabisk skal adjektiver matche deres substantiv i køn, tal, kasus og bestemthed. Dette er meget vigtigt for at skabe korrekte sætninger.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Kongruens</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Idafa-konstruktion",
                      "Idafa (إِضَافَة) er en genitiv-konstruktion i arabisk, der bruges til at udtrykke besiddelse eller tilhørsforhold. Det svarer til den danske konstruktion med 'af' eller genitiv-s. I en idafa-konstruktion er det første substantiv altid ubestemt (uden 'al-'), mens det andet kan være enten bestemt eller ubestemt.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Idafa-konstruktion</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Sætningsstruktur i Arabisk",
                      "Arabisk har to hovedtyper af sætninger: verbale sætninger (بُدْءٌ بِالْفِعْل), der starter med et verbum, og nominale sætninger (بُدْءٌ بِالِاسْم), der starter med et substantiv eller pronomen. Den grundlæggende ordstilling i verbale sætninger er VSO (verbum-subjekt-objekt), mens nominale sætninger typisk følger en subjekt-prædikat struktur.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Sætningsstruktur</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="translation" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Oversættelsesøvelse</CardTitle>
                <CardDescription>Oversæt arabisk tekst for at få feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!showFeedback ? (
                  <>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Originaltekst:</h3>
                      <p className="text-xl text-center leading-relaxed" dir="rtl" lang="ar">
                        {translationOriginal.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Textarea
                        placeholder="Indtast din oversættelse her..."
                        className="min-h-[150px]"
                        value={translationInput}
                        onChange={handleTranslationInputChange}
                      />

                      <div className="flex justify-center">
                        <Button size="lg" onClick={submitTranslationForFeedback} disabled={!translationInput.trim()}>
                          Få Oversættelsesfeedback
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Din Oversættelsesfeedback</h3>
                      <Button variant="outline" size="sm" onClick={resetFeedback}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Prøv Igen
                      </Button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Samlet Score</span>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold mr-2">{mockTranslationFeedback.overallScore}%</span>
                          <Badge
                            variant={
                              mockTranslationFeedback.overallScore >= 80
                                ? "default"
                                : mockTranslationFeedback.overallScore >= 60
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {mockTranslationFeedback.overallScore >= 80
                              ? "God"
                              : mockTranslationFeedback.overallScore >= 60
                                ? "Forbedring Nødvendig"
                                : "Behøver Øvelse"}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={mockTranslationFeedback.overallScore} className="h-2 mb-4" />
                      <p className="text-gray-700 dark:text-gray-300">{mockTranslationFeedback.feedback}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Detaljeret Feedback</h4>

                      {mockTranslationFeedback.detailedFeedback.map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Original:</div>
                                <p className="text-lg" dir="rtl" lang="ar">
                                  {item.original}
                                </p>
                              </div>

                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Din oversættelse:</div>
                                <p
                                  className={`text-lg ${item.score >= 80 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}
                                >
                                  {item.userTranslation}
                                </p>
                              </div>

                              <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  Korrekt oversættelse:
                                </div>
                                <p className="text-lg text-green-700 dark:text-green-400">{item.correctTranslation}</p>
                              </div>

                              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-start gap-2">
                                  <Badge
                                    variant={
                                      item.score >= 80 ? "default" : item.score >= 60 ? "secondary" : "destructive"
                                    }
                                    className="mt-0.5"
                                  >
                                    {item.score}%
                                  </Badge>
                                  <span className="text-gray-700 dark:text-gray-300">{item.feedback}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {processingFeedback && (
                  <div className="p-8 flex flex-col items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-purple-400"></div>
                      <div className="h-2 w-48 bg-purple-200 rounded"></div>
                      <div className="h-2 w-40 bg-purple-200 rounded"></div>
                    </div>
                    <p className="mt-4 text-center text-gray-600 dark:text-gray-400">Analyserer din oversættelse...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Oversættelsestips</CardTitle>
                <CardDescription>Forbedre dine arabiske oversættelser</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Kulturel Kontekst",
                      "Arabisk er dybt forbundet med islamisk kultur og historie. Mange begreber, især i religiøse tekster, har kulturelle og historiske konnotationer, der ikke let kan oversættes direkte. For eksempel har ord som 'taqwa' (تقوى) mange nuancer, der omfatter gudfrygtighed, bevidsthed om Gud, fromhed og andet. Det er vigtigt at forstå den kulturelle kontekst for at lave præcise oversættelser.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Kulturel Kontekst</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Ordforråd og Synonymer",
                      "Arabisk har et rigt ordforråd med mange synonymer, der har subtile betydningsforskelle. For eksempel er der mange forskellige ord for 'kærlighed', hver med sine egne konnotationer og anvendelseskontekster. At kende disse nuancer er afgørende for præcis oversættelse. Brug ordbøger, der inkluderer eksempler og kontekstuelle anvendelser for at vælge det rigtige ord.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Ordforråd og Synonymer</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Idiomatiske Udtryk",
                      "Arabisk har mange idiomatiske udtryk og talemåder, der ikke giver mening, når de oversættes ord for ord. For eksempel betyder udtrykket 'عَلَى عَيْنِي' (på mit øje) egentlig 'med glæde' eller 'det er min ære'. Lær at genkende disse udtryk og find de tilsvarende udtryk på dit eget sprog i stedet for at oversætte dem direkte.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Idiomatiske Udtryk</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Grammatiske Strukturer",
                      "Arabisk har grammatiske strukturer, der ikke findes på samme måde i andre sprog. For eksempel bruger arabisk ofte verbale sætninger, hvor dansk og andre europæiske sprog ville bruge nominale sætninger. Også, arabisk bruger ofte den 'og'-lignende konjunktion 'wa' (و) langt oftere end dansk. Ved oversættelse bør du være opmærksom på disse strukturelle forskelle og tilpasse din oversættelse til målsprogets naturlige stil.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Grammatiske Strukturer</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() =>
                    showExplanation(
                      "Oversættelsesstrategier",
                      "Der er forskellige tilgange til oversættelse: Nogle foretrækker at være så tæt på originalen som muligt (formel ækvivalens), mens andre prioriterer at gengive den samme effekt på læseren (dynamisk ækvivalens). For Quran og religiøse tekster er præcision vigtigt, men også klarhed og forståelighed. Overvej din målgruppe og formålet med oversættelsen, når du vælger din strategi.",
                    )
                  }
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span>Oversættelsesstrategier</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
