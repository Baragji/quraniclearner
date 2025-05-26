import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, BookMarked } from "lucide-react"
import GlassmorphismHeader from "@/components/glassmorphism-header"
import QuranWordAnalysis from "@/components/quran-word-analysis"
import TafsirSection from "@/components/tafsir-section"
import ComparativeStudySection from "@/components/comparative-study-section"
import ThematicExplorationSection from "@/components/thematic-exploration-section"

export default function AdvancedQuranStudyPage() {
  return (
    <div className="container mx-auto py-6">
      <GlassmorphismHeader
        title="Avanceret Quran Studie"
        subtitle="Dybdegående værktøjer til at studere og forstå Quranens tekst"
        icon={<BookMarked className="h-8 w-8 text-primary" />}
      />

      <div className="mt-8">
        <Tabs defaultValue="word-analysis" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="word-analysis">Ordanalyse</TabsTrigger>
            <TabsTrigger value="tafsir">Tafsir</TabsTrigger>
            <TabsTrigger value="comparative">Sammenlignende Studie</TabsTrigger>
            <TabsTrigger value="themes">Tematisk Udforskning</TabsTrigger>
          </TabsList>

          <TabsContent value="word-analysis" className="space-y-6">
            <WordAnalysisSection />
          </TabsContent>

          <TabsContent value="tafsir" className="space-y-6">
            <TafsirSection />
          </TabsContent>

          <TabsContent value="comparative" className="space-y-6">
            <ComparativeStudySection />
          </TabsContent>

          <TabsContent value="themes" className="space-y-6">
            <ThematicExplorationSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function WordAnalysisSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quran Ordanalyse</CardTitle>
          <CardDescription>Udforsk detaljeret morfologisk og grammatisk analyse af ord i Quran</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Vælg Surah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1. Al-Fatihah</SelectItem>
                  <SelectItem value="2">2. Al-Baqarah</SelectItem>
                  <SelectItem value="3">3. Aal-Imran</SelectItem>
                  <SelectItem value="4">4. An-Nisa</SelectItem>
                  <SelectItem value="5">5. Al-Ma'idah</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Vælg Vers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Vers 1</SelectItem>
                  <SelectItem value="2">Vers 2</SelectItem>
                  <SelectItem value="3">Vers 3</SelectItem>
                  <SelectItem value="4">Vers 4</SelectItem>
                  <SelectItem value="5">Vers 5</SelectItem>
                  <SelectItem value="6">Vers 6</SelectItem>
                  <SelectItem value="7">Vers 7</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Søg efter ord..." className="pl-8" />
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-md mb-6">
            <p className="font-arabic text-right text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="text-sm text-muted-foreground">Bismillāhi r-raḥmāni r-raḥīm</p>
            <p className="text-sm">I Allahs navn, den Nådige, den Barmhjertige</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Ordanalyse</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuranWordAnalysis
                word="بِسْمِ"
                transliteration="Bismi"
                translation="I navn"
                rootLetters="س م و"
                grammaticalForm="Substantiv i genitiv"
                analysis="Består af præpositionen بِ (i) + substantivet اسم (navn) i genitiv form. Præpositionen بِ styrer genitiv."
              />

              <QuranWordAnalysis
                word="اللَّهِ"
                transliteration="Allāhi"
                translation="Allah"
                rootLetters="ا ل ه"
                grammaticalForm="Substantiv i genitiv"
                analysis="Egennavnet Allah i genitiv form på grund af den foregående konstruktion (idafa). Den bestemte artikel الـ er assimileret med det første bogstav i ordet."
              />

              <QuranWordAnalysis
                word="الرَّحْمَٰنِ"
                transliteration="ar-Raḥmāni"
                translation="den Nådige"
                rootLetters="ر ح م"
                grammaticalForm="Adjektiv i genitiv"
                analysis="Et attribut (sifa) til Allah i genitiv form. Afledt af roden ر ح م, som indikerer barmhjertighed og nåde."
              />

              <QuranWordAnalysis
                word="الرَّحِيمِ"
                transliteration="ar-Raḥīmi"
                translation="den Barmhjertige"
                rootLetters="ر ح م"
                grammaticalForm="Adjektiv i genitiv"
                analysis="Et andet attribut til Allah i genitiv form. Fra samme rod som الرَّحْمَٰنِ, men med en anden intensitet og betydningsnuance."
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Forrige Vers</Button>
          <Button>Næste Vers</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rodordsanalyse</CardTitle>
          <CardDescription>Udforsk betydningen og anvendelsen af rødder i Quran</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Søg efter ord..." className="pl-8" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
