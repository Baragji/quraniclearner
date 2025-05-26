import Link from "next/link"
import { ArrowLeft, BookOpen, ChevronRight, Play, Search, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default function QuranPage() {
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
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbage til Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">القرآن الكريم / Quran Studie</h1>
          <p className="text-muted-foreground">Udforsk, lær og forstå Quran med interaktive værktøjer</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Søg i Quran..."
              className="h-10 w-full rounded-md border border-input bg-white pl-9 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:bg-gray-950"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Fortsæt Læsning
            </Button>
            <Button size="sm">
              <Play className="mr-2 h-4 w-4" />
              Start Ny Surah
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>سورة الفاتحة / Surah Al-Fatiha</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-xs">Lyt til Recitation</span>
                  </Button>
                </CardTitle>
                <CardDescription>Åbningen • 7 Vers • Mekka</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="arabic">
                  <TabsList className="mb-4">
                    <TabsTrigger value="arabic">Arabisk</TabsTrigger>
                    <TabsTrigger value="translation">Oversættelse</TabsTrigger>
                    <TabsTrigger value="both">Side om Side</TabsTrigger>
                  </TabsList>
                  <TabsContent value="arabic">
                    <div className="space-y-6 text-right">
                      <div className="border-b border-gray-200 pb-4">
                        <p className="mb-2 text-center text-sm text-muted-foreground">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                        <p className="font-arabic text-2xl leading-loose" dir="rtl">
                          ﭑﭒﭓﭔﭕ
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start justify-end gap-4">
                          <div className="text-right">
                            <p className="font-arabic text-2xl leading-loose" dir="rtl">
                              ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 1</p>
                          </div>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            ١
                          </div>
                        </div>
                        <div className="flex items-start justify-end gap-4">
                          <div className="text-right">
                            <p className="font-arabic text-2xl leading-loose" dir="rtl">
                              ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 2</p>
                          </div>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            ٢
                          </div>
                        </div>
                        <div className="flex items-start justify-end gap-4">
                          <div className="text-right">
                            <p className="font-arabic text-2xl leading-loose" dir="rtl">
                              مَٰلِكِ يَوْمِ ٱلدِّينِ
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 3</p>
                          </div>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            ٣
                          </div>
                        </div>
                        <div className="flex items-start justify-end gap-4">
                          <div className="text-right">
                            <p className="font-arabic text-2xl leading-loose" dir="rtl">
                              إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 4</p>
                          </div>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            ٤
                          </div>
                        </div>
                        <div className="flex items-start justify-end gap-4">
                          <div className="text-right">
                            <p className="font-arabic text-2xl leading-loose" dir="rtl">
                              ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 5</p>
                          </div>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            ٥
                          </div>
                        </div>
                        <div className="flex items-start justify-end gap-4">
                          <div className="text-right">
                            <p className="font-arabic text-2xl leading-loose" dir="rtl">
                              صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 6-7</p>
                          </div>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            ٦-٧
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="translation">
                    <div className="space-y-6">
                      <div className="border-b border-gray-200 pb-4">
                        <p className="mb-2 text-center text-sm text-muted-foreground">
                          I Allahs navn, den Nådige, den Barmhjertige
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            1
                          </div>
                          <div>
                            <p className="text-lg">Al pris tilkommer Allah, verdenernes Herre</p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 1</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            2
                          </div>
                          <div>
                            <p className="text-lg">Den Nådige, den Barmhjertige</p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 2</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            3
                          </div>
                          <div>
                            <p className="text-lg">Herre over Dommens Dag</p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 3</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            4
                          </div>
                          <div>
                            <p className="text-lg">Dig alene tilbeder vi, og Dig alene beder vi om hjælp</p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 4</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            5
                          </div>
                          <div>
                            <p className="text-lg">Led os på den rette vej</p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 5</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                            6-7
                          </div>
                          <div>
                            <p className="text-lg">
                              Vejen for dem, Du har skænket Din nåde, ikke for dem, der har vakt Din vrede, ej heller
                              for de vildfarne
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">Vers 6-7</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="both">
                    <div className="space-y-6">
                      <div className="border-b border-gray-200 pb-4">
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                          <p className="text-center text-sm text-muted-foreground">
                            I Allahs navn, den Nådige, den Barmhjertige
                          </p>
                          <p className="text-center text-sm text-muted-foreground" dir="rtl">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                          </p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                              1
                            </div>
                            <div>
                              <p className="text-lg">Al pris tilkommer Allah, verdenernes Herre</p>
                            </div>
                          </div>
                          <div className="flex items-start justify-end gap-4">
                            <div className="text-right">
                              <p className="font-arabic text-xl" dir="rtl">
                                ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ
                              </p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                              ١
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                              2
                            </div>
                            <div>
                              <p className="text-lg">Den Nådige, den Barmhjertige</p>
                            </div>
                          </div>
                          <div className="flex items-start justify-end gap-4">
                            <div className="text-right">
                              <p className="font-arabic text-xl" dir="rtl">
                                ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                              </p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                              ٢
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                              3
                            </div>
                            <div>
                              <p className="text-lg">Herre over Dommens Dag</p>
                            </div>
                          </div>
                          <div className="flex items-start justify-end gap-4">
                            <div className="text-right">
                              <p className="font-arabic text-xl" dir="rtl">
                                مَٰلِكِ يَوْمِ ٱلدِّينِ
                              </p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                              ٣
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Forrige Surah</Button>
                <Button variant="outline">Næste Surah</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ordanalyse</CardTitle>
                <CardDescription>Udforsk betydningen af nøgleord i Surah Al-Fatiha</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 text-center font-arabic text-2xl" dir="rtl">
                      الْحَمْدُ
                    </div>
                    <div className="text-center text-sm font-medium">al-hamdu</div>
                    <div className="mt-2 text-center text-sm">lovprisning</div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p>Rod: ح م د (H-M-D)</p>
                      <p>Type: Navneord</p>
                      <p>Form: Bestemt med "al-"</p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 text-center font-arabic text-2xl" dir="rtl">
                      لِلَّهِ
                    </div>
                    <div className="text-center text-sm font-medium">lillahi</div>
                    <div className="mt-2 text-center text-sm">til Allah / for Allah</div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p>Rod: ا ل ه (A-L-H)</p>
                      <p>Type: Navneord med præposition</p>
                      <p>Præposition: li (til/for)</p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 text-center font-arabic text-2xl" dir="rtl">
                      رَبِّ
                    </div>
                    <div className="text-center text-sm font-medium">rabbi</div>
                    <div className="mt-2 text-center text-sm">Herre</div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p>Rod: ر ب ب (R-B-B)</p>
                      <p>Type: Navneord i konstruktform</p>
                      <p>Form: Possessiv (Herre over)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Se Alle Ord</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Surahs</CardTitle>
                <CardDescription>Udforsk kapitlerne i Quran</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[300px] overflow-y-auto">
                <div className="space-y-2">
                  {[
                    { number: 1, name: "Al-Fatiha", arabic: "الفاتحة", verses: 7, type: "Mekka" },
                    { number: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, type: "Medina" },
                    { number: 3, name: "Aal-Imran", arabic: "آل عمران", verses: 200, type: "Medina" },
                    { number: 4, name: "An-Nisa", arabic: "النساء", verses: 176, type: "Medina" },
                    { number: 5, name: "Al-Ma'idah", arabic: "المائدة", verses: 120, type: "Medina" },
                    { number: 6, name: "Al-An'am", arabic: "الأنعام", verses: 165, type: "Mekka" },
                    { number: 7, name: "Al-A'raf", arabic: "الأعراف", verses: 206, type: "Mekka" },
                    { number: 8, name: "Al-Anfal", arabic: "الأنفال", verses: 75, type: "Medina" },
                    { number: 9, name: "At-Tawbah", arabic: "التوبة", verses: 129, type: "Medina" },
                    { number: 10, name: "Yunus", arabic: "يونس", verses: 109, type: "Mekka" },
                  ].map((surah) => (
                    <div
                      key={surah.number}
                      className={`flex items-center justify-between rounded-lg p-2 hover:bg-muted ${
                        surah.number === 1 ? "bg-emerald-50 dark:bg-emerald-950/20" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            surah.number === 1
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {surah.number}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{surah.name}</span>
                            <span className="font-arabic text-sm text-muted-foreground">{surah.arabic}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {surah.verses} vers • {surah.type}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Se Alle Surahs
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Læringsværktøjer</CardTitle>
                <CardDescription>Værktøjer til at forbedre din Quran-forståelse</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="rounded-lg border p-3">
                    <h3 className="mb-1 font-medium">Ordforråd Flashcards</h3>
                    <p className="mb-2 text-sm text-muted-foreground">Lær nøgleord fra Quran med spaced repetition</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Start Læring
                    </Button>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="mb-1 font-medium">Tajweed Regler</h3>
                    <p className="mb-2 text-sm text-muted-foreground">Lær reglerne for korrekt Quran-recitation</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Udforsk Regler
                    </Button>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="mb-1 font-medium">Tafsir (Fortolkning)</h3>
                    <p className="mb-2 text-sm text-muted-foreground">Udforsk dybdegående fortolkninger af Quran</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Læs Tafsir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Din Fremgang</CardTitle>
                <CardDescription>Spor din rejse gennem Quran</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Læste Surahs</span>
                      <span className="text-muted-foreground">2/114</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-[1.8%] rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Lærte Vers</span>
                      <span className="text-muted-foreground">15/6236</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-[0.24%] rounded-full bg-emerald-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Mestrede Ord</span>
                      <span className="text-muted-foreground">45/1722</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-[2.6%] rounded-full bg-emerald-500"></div>
                    </div>
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
