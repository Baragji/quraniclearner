import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"
import { QuranWordAnalysis } from "@/components/quran-word-analysis"

export const metadata: Metadata = {
  title: "Quran Studie | Quranic Arabic Trainer",
  description: "Dybdegående studie af Quran med grammatisk analyse og oversættelse",
}

// Dette er en mock-funktion, der ville blive erstattet af faktisk data fra en API eller database
function getSurahData(surahId: string) {
  const surahs = {
    "1": {
      name: "Al-Fatiha",
      arabicName: "الفاتحة",
      verses: 7,
      translation: "Åbningen",
      revelation: "Mekka",
      description:
        "Den første sura i Koranen, også kendt som 'Åbningen'. Den består af syv vers og er en af de mest reciterede suraer i daglige bønner.",
    },
    "2": {
      name: "Al-Baqarah",
      arabicName: "البقرة",
      verses: 286,
      translation: "Koen",
      revelation: "Medina",
      description: "Den længste sura i Koranen, der dækker mange aspekter af islamisk lov, historie og moral.",
    },
  }

  return (
    surahs[surahId as keyof typeof surahs] || {
      name: "Ukendt Sura",
      arabicName: "سورة",
      verses: 0,
      translation: "",
      revelation: "",
      description: "Ingen beskrivelse tilgængelig",
    }
  )
}

// Mock-data for vers
const verseData = [
  {
    number: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    transliteration: "Bismi Allahi alrrahmani alrraheemi",
    translation: "I Allahs navn, den Nådige, den Barmhjertige",
    words: [
      { arabic: "بِسْمِ", transliteration: "Bismi", translation: "I navn", type: "Substantiv", root: "س م و" },
      { arabic: "اللَّهِ", transliteration: "Allahi", translation: "Allah", type: "Egennavn", root: "ا ل ه" },
      { arabic: "الرَّحْمَٰنِ", transliteration: "alrrahmani", translation: "den Nådige", type: "Adjektiv", root: "ر ح م" },
      {
        arabic: "الرَّحِيمِ",
        transliteration: "alrraheemi",
        translation: "den Barmhjertige",
        type: "Adjektiv",
        root: "ر ح م",
      },
    ],
  },
  {
    number: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    transliteration: "Alhamdu lillahi rabbi alAAalameena",
    translation: "Al pris tilkommer Allah, verdenernes Herre",
    words: [
      { arabic: "الْحَمْدُ", transliteration: "Alhamdu", translation: "Al pris", type: "Substantiv", root: "ح م د" },
      {
        arabic: "لِلَّهِ",
        transliteration: "lillahi",
        translation: "tilkommer Allah",
        type: "Præposition + Egennavn",
        root: "ا ل ه",
      },
      { arabic: "رَبِّ", transliteration: "rabbi", translation: "Herre", type: "Substantiv", root: "ر ب ب" },
      {
        arabic: "الْعَالَمِينَ",
        transliteration: "alAAalameena",
        translation: "verdenernes",
        type: "Substantiv",
        root: "ع ل م",
      },
    ],
  },
  {
    number: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    transliteration: "Alrrahmani alrraheemi",
    translation: "Den Nådige, den Barmhjertige",
    words: [
      { arabic: "الرَّحْمَٰنِ", transliteration: "Alrrahmani", translation: "Den Nådige", type: "Adjektiv", root: "ر ح م" },
      {
        arabic: "الرَّحِيمِ",
        transliteration: "alrraheemi",
        translation: "den Barmhjertige",
        type: "Adjektiv",
        root: "ر ح م",
      },
    ],
  },
]

export default function QuranStudyPage({ params }: { params: { surahId: string } }) {
  const surah = getSurahData(params.surahId)

  return (
    <div className="container mx-auto py-6 space-y-8">
      <GlassmorphismHeader
        title={`${surah.name} (${surah.arabicName})`}
        description={`${surah.translation} - ${surah.verses} vers - Åbenbaret i ${surah.revelation}`}
        icon="BookOpen"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span>{surah.name}</span>
              <Badge variant="outline" className="ml-2">
                {surah.revelation}
              </Badge>
            </CardTitle>
            <CardDescription>{surah.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play mr-2"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Afspil Recitation
              </Button>
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-download mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download
              </Button>
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bookmark mr-2"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                Bogmærk
              </Button>
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-share mr-2"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" x2="12" y1="2" y2="15" />
                </svg>
                Del
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 lg:row-span-2">
          <CardHeader>
            <CardTitle>Vers og Analyse</CardTitle>
            <CardDescription>Udforsk versene med detaljeret grammatisk analyse</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="verse-1" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                {verseData.map((verse) => (
                  <TabsTrigger key={verse.number} value={`verse-${verse.number}`}>
                    Vers {verse.number}
                  </TabsTrigger>
                ))}
              </TabsList>

              {verseData.map((verse) => (
                <TabsContent key={verse.number} value={`verse-${verse.number}`} className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-right">
                      <p className="text-2xl font-arabic leading-loose">{verse.arabic}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground italic">{verse.transliteration}</p>
                      <p className="text-base mt-1">{verse.translation}</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Ordanalyse</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {verse.words.map((word, index) => (
                          <QuranWordAnalysis
                            key={index}
                            arabic={word.arabic}
                            transliteration={word.transliteration}
                            translation={word.translation}
                            type={word.type}
                            root={word.root}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grammatiske Fokuspunkter</CardTitle>
              <CardDescription>Vigtige grammatiske koncepter i denne sura</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Brug af præpositioner",
                  "Adjektivers bøjning",
                  "Genitiv konstruktioner",
                  "Definitte og indefinitte substantiver",
                ].map((point, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-check text-green-600 mr-2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Relaterede Ressourcer</CardTitle>
              <CardDescription>Supplerende materiale til at forstå denne sura</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  { title: "Tafsir Ibn Kathir", type: "Fortolkning" },
                  { title: "Grammatiklektion: Præpositioner", type: "Grammatik" },
                  { title: "Ordforråd fra Al-Fatiha", type: "Ordforråd" },
                  { title: "Recitation af Sheikh Mishary", type: "Audio" },
                ].map((resource, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-sm">{resource.title}</span>
                    <Badge variant="outline">{resource.type}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Læringsmål</CardTitle>
              <CardDescription>Hvad du bør kunne efter at have studeret denne sura</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Recitere suraen med korrekt tajwid",
                  "Forstå betydningen af hvert vers",
                  "Identificere de grammatiske strukturer",
                  "Genkende og forstå nøgleordene",
                ].map((goal, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-target text-primary mr-2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                    {goal}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
