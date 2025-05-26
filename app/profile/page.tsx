import Link from "next/link"

import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ChevronRight, Trophy, Star, Award, Calendar, Clock, Check, ArrowUpRight } from "lucide-react"
import { LevelProgressRing } from "@/components/level-progress-ring"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden items-center space-x-2 md:flex">
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
          <h1 className="text-3xl font-bold tracking-tight">Min Profil</h1>
          <p className="text-muted-foreground">Administrer din konto og se din fremgang</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl dark:bg-emerald-900 dark:text-emerald-300">
                        AB
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">Ahmed Bakir</CardTitle>
                      <CardDescription>Medlem siden januar 2025</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Rediger Profil
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  >
                    Begynder
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    5-dages Streak
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  >
                    Alfabet Mester
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="progress" className="mb-6">
              <TabsList>
                <TabsTrigger value="progress">Fremgang</TabsTrigger>
                <TabsTrigger value="achievements">Præstationer</TabsTrigger>
                <TabsTrigger value="activity">Aktivitet</TabsTrigger>
              </TabsList>
              <TabsContent value="progress" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Læringsrejse</CardTitle>
                      <CardDescription>Din fremgang i arabisk læring</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Arabisk Alfabet</span>
                            <span className="text-muted-foreground">12/28 bogstaver</span>
                          </div>
                          <Progress value={42.8} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Grundlæggende Ordforråd</span>
                            <span className="text-muted-foreground">45/100 ord</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Quran Ordforråd</span>
                            <span className="text-muted-foreground">15/200 ord</span>
                          </div>
                          <Progress value={7.5} className="h-2" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Grammatik</span>
                            <span className="text-muted-foreground">3/20 lektioner</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Nyligt Gennemførte</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Arabisk Alfabet - Lektion 4</p>
                              <p className="text-sm text-muted-foreground">Gennemført for 2 dage siden</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Grundlæggende Ordforråd - Lektion 2</p>
                              <p className="text-sm text-muted-foreground">Gennemført for 3 dage siden</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Surah Al-Fatiha - Introduktion</p>
                              <p className="text-sm text-muted-foreground">Gennemført for 5 dage siden</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Næste Skridt</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Arabisk Alfabet - Lektion 5</p>
                              <p className="text-sm text-muted-foreground">Lær bogstaverne ش til ع</p>
                            </div>
                            <Button size="sm">Start</Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Grundlæggende Ordforråd - Lektion 3</p>
                              <p className="text-sm text-muted-foreground">Lær 10 nye ord</p>
                            </div>
                            <Button size="sm">Start</Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                              <BookOpen className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Grammatik - Lektion 1</p>
                              <p className="text-sm text-muted-foreground">Introduktion til arabisk grammatik</p>
                            </div>
                            <Button size="sm">Start</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="achievements" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        <span>Alfabet Mester</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Lær alle 28 bogstaver i det arabiske alfabet</p>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Fremgang</span>
                          <span className="text-muted-foreground">12/28</span>
                        </div>
                        <Progress value={42.8} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-amber-500" />
                        <span>Ordforråd Samler</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Lær 100 grundlæggende arabiske ord</p>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Fremgang</span>
                          <span className="text-muted-foreground">45/100</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-amber-500" />
                        <span>Quran Begynder</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Gennemfør studiet af Surah Al-Fatiha</p>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Fremgang</span>
                          <span className="text-muted-foreground">3/7 vers</span>
                        </div>
                        <Progress value={42.8} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-amber-500" />
                        <span>Dedikeret Elev</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Log ind og lær 7 dage i træk</p>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Fremgang</span>
                          <span className="text-muted-foreground">5/7 dage</span>
                        </div>
                        <Progress value={71.4} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-500" />
                        <span>Tidlig Fugl</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Gennemfør 5 lektioner før kl. 9 om morgenen</p>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Fremgang</span>
                          <span className="text-muted-foreground">2/5 lektioner</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-gray-400" />
                        <span className="text-muted-foreground">Grammatik Guru</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Gennemfør alle grundlæggende grammatiklektioner</p>
                      <div className="mt-4">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Fremgang</span>
                          <span className="text-muted-foreground">3/20 lektioner</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nylig Aktivitet</CardTitle>
                    <CardDescription>Din læringsaktivitet fra de sidste 30 dage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Gennemførte Arabisk Alfabet - Lektion 4</p>
                            <p className="text-sm text-muted-foreground">2 dage siden</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Du lærte 3 nye bogstaver og bestod quizzen med 100%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Optjente præstationen "5-dages Streak"</p>
                            <p className="text-sm text-muted-foreground">2 dage siden</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Du har logget ind og lært 5 dage i træk</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Gennemførte Grundlæggende Ordforråd - Lektion 2</p>
                            <p className="text-sm text-muted-foreground">3 dage siden</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Du lærte 10 nye ord og øvede dem med flashcards
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                          <Award className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Optjente 150 XP</p>
                            <p className="text-sm text-muted-foreground">4 dage siden</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Du gennemførte 3 lektioner på én dag</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">Gennemførte Surah Al-Fatiha - Introduktion</p>
                            <p className="text-sm text-muted-foreground">5 dage siden</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Du lærte om Surah Al-Fatiha og dens betydning</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Se Fuld Aktivitetshistorik
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Dit Niveau</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <LevelProgressRing level={2} progress={65} />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">Du er 35% fra niveau 3</p>
                  <p className="mt-1 text-sm text-muted-foreground">Gennemfør flere lektioner for at stige i niveau</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                    <div className="text-center">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs">dage</div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Nuværende streak</p>
                    <p className="text-sm text-muted-foreground">Kom tilbage i morgen for at fortsætte din streak!</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-1">
                  {["M", "T", "O", "T", "F", "L", "S"].map((day, i) => (
                    <div key={i} className="text-center text-xs font-medium">
                      {day}
                    </div>
                  ))}
                  {[true, true, true, true, true, false, false].map((active, i) => (
                    <div
                      key={i}
                      className={`flex h-8 items-center justify-center rounded-full ${
                        active
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {active ? <Check className="h-4 w-4" /> : ""}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>XP Optjent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">1,245</div>
                    <p className="text-sm text-muted-foreground">Total XP</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">150</div>
                    <p className="text-sm text-muted-foreground">Denne uge</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Næste niveau</span>
                    <span className="text-muted-foreground">1,245 / 2,000 XP</span>
                  </div>
                  <Progress value={62.25} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Statistik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lektioner gennemført</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quiz gennemført</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ord lært</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bogstaver mestret</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Præstationer optjent</span>
                    <span className="font-medium">3</span>
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
