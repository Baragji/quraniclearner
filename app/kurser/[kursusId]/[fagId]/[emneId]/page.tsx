import Link from "next/link"
import { ArrowLeft, BookOpen, ChevronRight, Download, ExternalLink, MessageSquare, Play, ThumbsUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIInsightCard } from "@/components/ai-insight-card"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"
import { TopicDiscussionThread } from "@/components/topic-discussion-thread"

export default function TopicPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <GlassmorphismHeader />

      <main className="container pb-16 pt-24">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/kurser" className="hover:text-foreground">
              Kurser
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/kurser/dataanalyse-python" className="hover:text-foreground">
              Dataanalyse med Python
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/kurser/dataanalyse-python/datastrukturer" className="hover:text-foreground">
              Datastrukturer
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Pandas DataFrame Manipulation</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" size="sm" asChild className="mb-2">
                <Link href="/kurser/dataanalyse-python/datastrukturer">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Tilbage til Datastrukturer
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Pandas DataFrame Manipulation</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline">Python</Badge>
                <Badge variant="outline">Data Science</Badge>
                <Badge variant="outline">Pandas</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Læsetid: ca. 15 min</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Diskussion
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Nyttigt
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <Tabs defaultValue="indhold">
                  <TabsList className="mb-4">
                    <TabsTrigger value="indhold">Indhold</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                    <TabsTrigger value="opgaver">Praktiske Opgaver</TabsTrigger>
                  </TabsList>
                  <TabsContent value="indhold" className="space-y-6">
                    <div>
                      <h2 className="mb-4 text-2xl font-semibold">Introduktion til Pandas DataFrames</h2>
                      <p className="mb-4 leading-relaxed text-muted-foreground">
                        Pandas er et kraftfuldt Python-bibliotek til dataanalyse og -manipulation. DataFrames er en af
                        de centrale datastrukturer i Pandas, der giver en fleksibel og effektiv måde at arbejde med
                        tabeldata på.
                      </p>
                      <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                        <h3 className="mb-2 font-medium">Hvad du vil lære</h3>
                        <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                          <li>Oprette og indlæse data i Pandas DataFrames</li>
                          <li>Filtrere og vælge data med forskellige metoder</li>
                          <li>Transformere og aggregere data</li>
                          <li>Håndtere manglende værdier</li>
                          <li>Kombinere flere DataFrames</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h2 className="mb-4 text-2xl font-semibold">Oprettelse af DataFrames</h2>
                      <p className="mb-4 leading-relaxed text-muted-foreground">
                        Der er flere måder at oprette en DataFrame på. Den mest almindelige er at indlæse data fra en
                        ekstern kilde som en CSV-fil, men du kan også oprette en DataFrame fra en Python dictionary
                        eller liste.
                      </p>
                      <div className="mb-4 overflow-hidden rounded-lg border bg-muted">
                        <div className="bg-muted px-4 py-2 font-mono text-sm">Eksempel: Oprettelse af DataFrame</div>
                        <div className="overflow-auto p-4 font-mono text-sm">
                          <pre>
                            {`import pandas as pd

# Fra dictionary
data = {
    'Navn': ['Anders', 'Mette', 'Søren', 'Louise'],
    'Alder': [28, 34, 42, 31],
    'By': ['København', 'Aarhus', 'Odense', 'Aalborg']
}

df = pd.DataFrame(data)
print(df)`}
                          </pre>
                        </div>
                      </div>
                      <div className="mb-4 overflow-hidden rounded-lg border">
                        <div className="bg-muted px-4 py-2 font-mono text-sm">Output</div>
                        <div className="overflow-auto p-4 font-mono text-sm">
                          <pre>
                            {`     Navn  Alder         By
0  Anders     28  København
1   Mette     34     Aarhus
2   Søren     42     Odense
3  Louise     31    Aalborg`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="mb-4 text-2xl font-semibold">Filtrering og Udvælgelse</h2>
                      <p className="mb-4 leading-relaxed text-muted-foreground">
                        En af de mest almindelige operationer med DataFrames er at filtrere og vælge specifikke rækker
                        eller kolonner baseret på betingelser.
                      </p>
                      <div className="mb-4 overflow-hidden rounded-lg border bg-muted">
                        <div className="bg-muted px-4 py-2 font-mono text-sm">Eksempel: Filtrering</div>
                        <div className="overflow-auto p-4 font-mono text-sm">
                          <pre>
                            {`# Vælg rækker hvor alder er over 30
ældre_end_30 = df[df['Alder'] > 30]
print(ældre_end_30)

# Vælg specifikke kolonner
navne_og_byer = df[['Navn', 'By']]
print(navne_og_byer)`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                      <h3 className="mb-4 text-xl font-semibold">Interaktiv H5P Simulation</h3>
                      <div className="aspect-video rounded-lg bg-muted">
                        <div className="flex h-full flex-col items-center justify-center">
                          <Play className="mb-2 h-12 w-12 text-muted-foreground" />
                          <p className="text-center text-muted-foreground">
                            Interaktiv Pandas DataFrame Manipulation Simulation
                          </p>
                          <Button className="mt-4">Start Simulation</Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="mb-4 text-2xl font-semibold">Transformation og Aggregering</h2>
                      <p className="mb-4 leading-relaxed text-muted-foreground">
                        Pandas giver dig mulighed for at transformere data og beregne aggregerede statistikker på tværs
                        af rækker eller kolonner.
                      </p>
                      <div className="mb-4 overflow-hidden rounded-lg border bg-muted">
                        <div className="bg-muted px-4 py-2 font-mono text-sm">Eksempel: Aggregering</div>
                        <div className="overflow-auto p-4 font-mono text-sm">
                          <pre>
                            {`# Beregn gennemsnitsalder
gennemsnit = df['Alder'].mean()
print(f"Gennemsnitsalder: {gennemsnit}")

# Gruppér efter by og beregn gennemsnitsalder
by_grupper = df.groupby('By')['Alder'].mean()
print("Gennemsnitsalder pr. by:")
print(by_grupper)`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-card p-6 shadow-sm">
                      <div>
                        <h3 className="text-lg font-medium">Supplerende Materialer</h3>
                        <p className="text-sm text-muted-foreground">
                          Download komplet notebook og datasæt til øvelser
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Notebook
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Datasæt
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Åbn i Colab
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="quiz">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                      <h2 className="mb-4 text-xl font-semibold">Test Din Viden: Pandas DataFrames</h2>
                      <p className="mb-4 text-muted-foreground">
                        Tag denne quiz for at teste din forståelse af Pandas DataFrame manipulation.
                      </p>
                      <Button>Start Quiz</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="opgaver">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                      <h2 className="mb-4 text-xl font-semibold">Praktiske Opgaver</h2>
                      <p className="mb-4 text-muted-foreground">Anvend det du har lært med disse praktiske øvelser.</p>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="mb-2 font-medium">Opgave 1: Data Cleaning</h3>
                          <p className="mb-2 text-sm text-muted-foreground">
                            Rens det medfølgende datasæt ved at håndtere manglende værdier og duplikater.
                          </p>
                          <Button variant="outline" size="sm">
                            Se Opgave
                          </Button>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h3 className="mb-2 font-medium">Opgave 2: Data Transformation</h3>
                          <p className="mb-2 text-sm text-muted-foreground">
                            Transformér data ved at oprette nye kolonner baseret på eksisterende data.
                          </p>
                          <Button variant="outline" size="sm">
                            Se Opgave
                          </Button>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h3 className="mb-2 font-medium">Opgave 3: Data Analysis</h3>
                          <p className="mb-2 text-sm text-muted-foreground">
                            Analysér datasættet for at finde mønstre og trends.
                          </p>
                          <Button variant="outline" size="sm">
                            Se Opgave
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold">Diskussion</h2>
              <TopicDiscussionThread />
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Dit Fremskridt</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Emne Fremskridt</span>
                  <span className="text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="mb-4" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                    <span>Indhold Læst</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                    <span>Quiz Ikke Fuldført</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <span>Opgaver Ikke Påbegyndt</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Markér som Fuldført</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Emner i Dette Fag</CardTitle>
                <CardDescription>Datastrukturer i Python</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Lister og Tupler</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      Fuldført
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Dictionaries og Sets</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    >
                      Fuldført
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium">Pandas DataFrame Manipulation</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      I gang
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                      <span className="text-sm">NumPy Arrays</span>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      Ikke startet
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                      <span className="text-sm">Avancerede Datastrukturer</span>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      Ikke startet
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Se Alle Emner
                </Button>
              </CardFooter>
            </Card>

            <AIInsightCard
              title="AI Studietip"
              insight="Pandas DataFrames er særligt nyttige til at håndtere store datasæt. Prøv at øve dig med .loc og .iloc metoderne for mere præcis dataadgang."
              recommendedAction="Øv med Eksempeldatasæt"
            />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Flashcards</CardTitle>
                <CardDescription>Repetér nøglebegreber</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] cursor-pointer rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <h3 className="mb-2 font-medium">Hvad er en Pandas DataFrame?</h3>
                    <p className="text-sm text-muted-foreground">(Klik for at vende)</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Forrige
                </Button>
                <div className="text-sm text-muted-foreground">1 af 10</div>
                <Button variant="outline" size="sm">
                  Næste
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
