import Link from "next/link"
import { ArrowLeft, BookOpen, ChevronRight, ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default function GrammarPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Arabisk Grammatik</h1>
          <p className="text-muted-foreground">Lær grundlæggende arabisk grammatik og sætningsstruktur</p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Samlet fremgang</span>
              <span className="text-muted-foreground">3/20 lektioner gennemført</span>
            </div>
            <Progress value={15} className="h-2 bg-emerald-100" />
          </div>
        </div>

        <Tabs defaultValue="lessons" className="mb-8">
          <TabsList>
            <TabsTrigger value="lessons">Lektioner</TabsTrigger>
            <TabsTrigger value="exercises">Øvelser</TabsTrigger>
            <TabsTrigger value="reference">Reference</TabsTrigger>
          </TabsList>
          <TabsContent value="lessons" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Lektion 1: Introduktion til Arabisk Grammatik</CardTitle>
                          <CardDescription>Grundlæggende koncepter og struktur</CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Gennemført
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        En introduktion til arabisk grammatik, herunder grundlæggende sætningsstruktur, ordklasser og
                        grammatiske termer.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline">Begynder</Badge>
                        <Badge variant="outline">15 min</Badge>
                        <Badge variant="outline">Teori</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Se Noter</Button>
                      <Button>Gennemgå Igen</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Lektion 2: Navneord og Køn</CardTitle>
                          <CardDescription>Maskuline og feminine navneord</CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Gennemført
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Lær om maskuline og feminine navneord i arabisk, og hvordan man identificerer og bruger dem
                        korrekt.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline">Begynder</Badge>
                        <Badge variant="outline">20 min</Badge>
                        <Badge variant="outline">Teori + Øvelser</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Se Noter</Button>
                      <Button>Gennemgå Igen</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Lektion 3: Bestemt og Ubestemt Form</CardTitle>
                          <CardDescription>Brug af Al- og Tanwin</CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Gennemført
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Forstå hvordan man bruger den bestemte artikel "al-" og ubestemt form med tanwin i arabisk.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline">Begynder</Badge>
                        <Badge variant="outline">25 min</Badge>
                        <Badge variant="outline">Teori + Øvelser</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Se Noter</Button>
                      <Button>Gennemgå Igen</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Lektion 4: Personlige Pronominer</CardTitle>
                          <CardDescription>Selvstændige og tilknyttede pronominer</CardDescription>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Næste</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Lær om personlige pronominer i arabisk, både selvstændige former og tilknyttede former.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline">Begynder</Badge>
                        <Badge variant="outline">30 min</Badge>
                        <Badge variant="outline">Teori + Øvelser</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Lektion</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Lektion 5: Verbets Grundform</CardTitle>
                          <CardDescription>Introduktion til arabiske verber</CardDescription>
                        </div>
                        <Badge variant="outline">Låst</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Introduktion til arabiske verber, deres rodstruktur og grundlæggende bøjning.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline">Begynder-Mellem</Badge>
                        <Badge variant="outline">35 min</Badge>
                        <Badge variant="outline">Teori + Øvelser</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" disabled>
                        Gennemfør Lektion 4 for at låse op
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Din Fremgang</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Gennemførte Lektioner</span>
                          <span className="text-muted-foreground">3/20</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Øvelser Gennemført</span>
                          <span className="text-muted-foreground">8/30</span>
                        </div>
                        <Progress value={26.7} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Quiz Score</span>
                          <span className="text-muted-foreground">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Grammatiske Koncepter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>Navneord</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>Verber</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>Pronominer</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>Adjektiver</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>Præpositioner</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Se Alle Koncepter
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ressourcer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">Grammatik Ordbog</p>
                          <p className="text-sm text-muted-foreground">Opslagsværk for grammatiske termer</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Åbn
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">Verbaltabeller</p>
                          <p className="text-sm text-muted-foreground">Oversigt over verbalbøjninger</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Åbn
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">Grammatik Cheatsheet</p>
                          <p className="text-sm text-muted-foreground">Hurtig reference til grammatikregler</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Åbn
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="exercises" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Grammatikøvelser</CardTitle>
                      <CardDescription>Øv din forståelse af arabisk grammatik</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <p className="font-medium">Navneord og Køn</p>
                            <p className="text-sm text-muted-foreground">
                              Øvelser i at identificere maskuline og feminine navneord
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline">Begynder</Badge>
                              <Badge variant="outline">10 spørgsmål</Badge>
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                Gennemført
                              </Badge>
                            </div>
                          </div>
                          <Button>Øv Igen</Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <p className="font-medium">Bestemt og Ubestemt Form</p>
                            <p className="text-sm text-muted-foreground">Øvelser i at bruge al- og tanwin korrekt</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline">Begynder</Badge>
                              <Badge variant="outline">15 spørgsmål</Badge>
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                Gennemført
                              </Badge>
                            </div>
                          </div>
                          <Button>Øv Igen</Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <p className="font-medium">Personlige Pronominer</p>
                            <p className="text-sm text-muted-foreground">
                              Øvelser i at bruge personlige pronominer korrekt
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline">Begynder</Badge>
                              <Badge variant="outline">12 spørgsmål</Badge>
                              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                Ny
                              </Badge>
                            </div>
                          </div>
                          <Button>Start Øvelse</Button>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                          <div>
                            <p className="font-medium">Verbets Grundform</p>
                            <p className="text-sm text-muted-foreground">
                              Øvelser i at identificere og bruge verber i grundform
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline">Begynder-Mellem</Badge>
                              <Badge variant="outline">15 spørgsmål</Badge>
                              <Badge variant="outline">Låst</Badge>
                            </div>
                          </div>
                          <Button disabled>Låst</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Øvelsesfremgang</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Gennemførte Øvelser</span>
                          <span className="text-muted-foreground">2/10</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Gennemsnitlig Score</span>
                          <span className="text-muted-foreground">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Anbefalede Øvelser</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="rounded-lg border p-3">
                        <p className="font-medium">Personlige Pronominer</p>
                        <p className="text-sm text-muted-foreground">Baseret på din seneste lektion</p>
                        <Button size="sm" className="mt-2 w-full">
                          Start
                        </Button>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="font-medium">Bestemt Form Repetition</p>
                        <p className="text-sm text-muted-foreground">Baseret på dine tidligere resultater</p>
                        <Button size="sm" className="mt-2 w-full">
                          Start
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Grammatik Quiz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Test din forståelse af arabisk grammatik med vores ugentlige quiz
                    </p>
                    <Button className="w-full">Start Ugentlig Quiz</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reference" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Grammatisk Reference</CardTitle>
                    <CardDescription>Omfattende guide til arabisk grammatik</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-2 text-lg font-medium">Navneord (الاسم)</h3>
                        <div className="rounded-lg border p-4">
                          <p className="mb-2 text-muted-foreground">
                            Navneord i arabisk er enten maskuline eller feminine og kan være i bestemt eller ubestemt
                            form.
                          </p>
                          <div className="mb-4 space-y-2">
                            <div className="flex items-start gap-2">
                              <span className="font-medium">Maskuline navneord:</span>
                              <span className="text-muted-foreground">
                                Har generelt ingen særlig endelse (f.eks. كِتَاب - bog)
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="font-medium">Feminine navneord:</span>
                              <span className="text-muted-foreground">
                                Ender ofte med ة (ta marbuta) (f.eks. مَدْرَسَة - skole)
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Læs Mere om Navneord
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-lg font-medium">Verber (الفعل)</h3>
                        <div className="rounded-lg border p-4">
                          <p className="mb-2 text-muted-foreground">
                            Arabiske verber er baseret på en rod, typisk bestående af tre konsonanter, og bøjes efter
                            person, køn, tal og tid.
                          </p>
                          <div className="mb-4 space-y-2">
                            <div className="flex items-start gap-2">
                              <span className="font-medium">Grundform:</span>
                              <span className="text-muted-foreground">
                                3. person ental maskulinum i perfektum (f.eks. كَتَبَ - han skrev)
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="font-medium">Hovedtider:</span>
                              <span className="text-muted-foreground">
                                Perfektum (afsluttet handling) og imperfektum (uafsluttet handling)
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Læs Mere om Verber
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-lg font-medium">Pronominer (الضمير)</h3>
                        <div className="rounded-lg border p-4">
                          <p className="mb-2 text-muted-foreground">
                            Arabisk har både selvstændige personlige pronominer og tilknyttede pronominer.
                          </p>
                          <div className="mb-4 space-y-2">
                            <div className="flex items-start gap-2">
                              <span className="font-medium">Selvstændige pronominer:</span>
                              <span className="text-muted-foreground">
                                Bruges som subjekt (f.eks. أَنَا - jeg, هُوَ - han)
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="font-medium">Tilknyttede pronominer:</span>
                              <span className="text-muted-foreground">
                                Tilføjes til navneord, verber eller præpositioner (f.eks. -ي - min/mig)
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Læs Mere om Pronominer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Grammatiske Termer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>الاسم (al-ism)</span>
                        <span className="text-sm text-muted-foreground">Navneord</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>الفعل (al-fi'l)</span>
                        <span className="text-sm text-muted-foreground">Verbum</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>الضمير (ad-damir)</span>
                        <span className="text-sm text-muted-foreground">Pronomen</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>الصفة (as-sifa)</span>
                        <span className="text-sm text-muted-foreground">Adjektiv</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                        <span>حرف الجر (harf al-jarr)</span>
                        <span className="text-sm text-muted-foreground">Præposition</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Se Fuld Ordliste
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Grammatiske Ressourcer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">Verbaltabeller</p>
                          <p className="text-sm text-muted-foreground">Komplette bøjningstabeller</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Åbn
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">Grammatik PDF</p>
                          <p className="text-sm text-muted-foreground">Omfattende grammatikguide</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Åbn
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">Quran Grammatik</p>
                          <p className="text-sm text-muted-foreground">Grammatik specifik for Quran</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Åbn
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
