import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Offline Indhold | Quranic Arabic Trainer",
  description: "Administrer dit offline indhold og lær arabisk uden internetforbindelse",
}

export default function OfflinePage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <GlassmorphismHeader
        title="Offline Indhold"
        description="Administrer dit offline indhold og lær arabisk uden internetforbindelse"
        icon="WifiOff"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Offline Status</span>
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 hover:bg-green-50">
                Aktiveret
              </Badge>
            </CardTitle>
            <CardDescription>
              Din app er konfigureret til at fungere offline. Du kan bruge de fleste funktioner uden
              internetforbindelse.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between text-sm">
                <span>Lagerplads</span>
                <span>235 MB / 500 MB</span>
              </div>
              <Progress value={47} className="h-2" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Sidst synkroniseret: I dag, 14:32</span>
              <Button variant="outline" size="sm">
                Synkroniser nu
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 md:row-span-2">
          <CardHeader>
            <CardTitle>Offline Indhold</CardTitle>
            <CardDescription>Administrer hvilket indhold der er tilgængeligt offline</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="courses">Kurser</TabsTrigger>
                <TabsTrigger value="quran">Quran</TabsTrigger>
                <TabsTrigger value="vocabulary">Ordforråd</TabsTrigger>
                <TabsTrigger value="grammar">Grammatik</TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {[
                    { title: "Introduktion til Arabisk", size: "45 MB", downloaded: true },
                    { title: "Arabiske Bogstaver", size: "32 MB", downloaded: true },
                    { title: "Grundlæggende Grammatik", size: "28 MB", downloaded: true },
                    { title: "Quranisk Arabisk Niveau 1", size: "56 MB", downloaded: false },
                    { title: "Quranisk Arabisk Niveau 2", size: "62 MB", downloaded: false },
                  ].map((course, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">{course.title}</div>
                        <div className="text-xs text-muted-foreground">{course.size}</div>
                      </div>
                      <Switch checked={course.downloaded} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="quran" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {[
                    { title: "Al-Fatiha (1)", size: "2 MB", downloaded: true },
                    { title: "Al-Baqarah (2)", size: "45 MB", downloaded: true },
                    { title: "Ali 'Imran (3)", size: "28 MB", downloaded: false },
                    { title: "An-Nisa (4)", size: "32 MB", downloaded: false },
                    { title: "Al-Ma'idah (5)", size: "30 MB", downloaded: false },
                  ].map((surah, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">{surah.title}</div>
                        <div className="text-xs text-muted-foreground">{surah.size}</div>
                      </div>
                      <Switch checked={surah.downloaded} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="vocabulary" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {[
                    { title: "Mest Almindelige Ord (Top 100)", size: "5 MB", downloaded: true },
                    { title: "Quraniske Nøgleord", size: "8 MB", downloaded: true },
                    { title: "Verber - Grundlæggende", size: "12 MB", downloaded: true },
                    { title: "Substantiver - Grundlæggende", size: "10 MB", downloaded: false },
                    { title: "Adjektiver - Grundlæggende", size: "7 MB", downloaded: false },
                  ].map((vocab, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">{vocab.title}</div>
                        <div className="text-xs text-muted-foreground">{vocab.size}</div>
                      </div>
                      <Switch checked={vocab.downloaded} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="grammar" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {[
                    { title: "Grundlæggende Sætningsstruktur", size: "8 MB", downloaded: true },
                    { title: "Verbers Tider", size: "15 MB", downloaded: true },
                    { title: "Substantivers Bøjning", size: "12 MB", downloaded: false },
                    { title: "Adjektivers Bøjning", size: "10 MB", downloaded: false },
                    { title: "Avanceret Grammatik", size: "18 MB", downloaded: false },
                  ].map((grammar, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">{grammar.title}</div>
                        <div className="text-xs text-muted-foreground">{grammar.size}</div>
                      </div>
                      <Switch checked={grammar.downloaded} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Gem ændringer</Button>
          </CardFooter>
        </Card>

        <Card className="md:row-span-1">
          <CardHeader>
            <CardTitle>Offline Indstillinger</CardTitle>
            <CardDescription>Konfigurer hvordan appen fungerer offline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-sync">Automatisk synkronisering</Label>
                <p className="text-xs text-muted-foreground">Synkroniser automatisk når du har internetforbindelse</p>
              </div>
              <Switch id="auto-sync" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="wifi-only">Kun på Wi-Fi</Label>
                <p className="text-xs text-muted-foreground">Download kun indhold når du er på Wi-Fi</p>
              </div>
              <Switch id="wifi-only" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-download">Automatisk download</Label>
                <p className="text-xs text-muted-foreground">Download automatisk nyt indhold</p>
              </div>
              <Switch id="auto-download" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:row-span-1">
          <CardHeader>
            <CardTitle>Offline Læring</CardTitle>
            <CardDescription>Funktioner tilgængelige uden internetforbindelse</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {[
                { feature: "Flashcards", available: true },
                { feature: "Quran Læsning", available: true },
                { feature: "Grammatikøvelser", available: true },
                { feature: "Udtaleøvelser", available: false },
                { feature: "Quizzer", available: true },
                { feature: "Fællesskabsfunktioner", available: false },
                { feature: "AI-assisteret Læring", available: false },
              ].map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.feature}</span>
                  {item.available ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Tilgængelig
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                      Kræver internet
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
