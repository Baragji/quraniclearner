import { Download, FileText, Plus, Settings, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"
import { AdminAnalyticsChart } from "@/components/admin-analytics-chart"
import { AdminErrorHeatmap } from "@/components/admin-error-heatmap"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <GlassmorphismHeader isAdmin />

      <main className="container pb-16 pt-24">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Administrer indhold og overvåg platformens aktivitet</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Eksportér Data
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Opret Nyt Kursus
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Aktive Brugere</CardTitle>
              <CardDescription>Sidste 30 dage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,248</div>
              <p className="text-sm text-green-600 dark:text-green-400">+12.5% fra sidste måned</p>
              <div className="mt-4 h-[80px]">
                <AdminAnalyticsChart type="line" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Gennemførte Quizzer</CardTitle>
              <CardDescription>Sidste 30 dage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3,879</div>
              <p className="text-sm text-green-600 dark:text-green-400">+8.2% fra sidste måned</p>
              <div className="mt-4 h-[80px]">
                <AdminAnalyticsChart type="bar" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Gennemsnitlig Quiz Score</CardTitle>
              <CardDescription>Sidste 30 dage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">76.4%</div>
              <p className="text-sm text-red-600 dark:text-red-400">-2.1% fra sidste måned</p>
              <div className="mt-4 h-[80px]">
                <AdminAnalyticsChart type="line" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="analytics" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Indholdsadministration</TabsTrigger>
            <TabsTrigger value="users">Brugeradministration</TabsTrigger>
            <TabsTrigger value="ai">AI Konfiguration</TabsTrigger>
          </TabsList>
          <TabsContent value="analytics">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Aktivitetsfordeling</CardTitle>
                  <CardDescription>Brugeraktivitet fordelt på kurser og emner</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <AdminAnalyticsChart type="bar" isLarge />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Populære Kurser</CardTitle>
                  <CardDescription>Baseret på brugeraktivitet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Dataanalyse med Python", users: 342, change: "+15%" },
                      { name: "Avanceret Frontend Udvikling", users: 287, change: "+8%" },
                      { name: "Machine Learning Grundkursus", users: 231, change: "+12%" },
                      { name: "Databaser og SQL", users: 189, change: "-3%" },
                      { name: "Cloud Computing Fundamentals", users: 156, change: "+5%" },
                    ].map((course, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{course.name}</div>
                          <div className="text-sm text-muted-foreground">{course.users} aktive brugere</div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            course.change.startsWith("+")
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          }
                        >
                          {course.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brugerengagement</CardTitle>
                  <CardDescription>Fordeling af aktivitetstyper</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <AdminAnalyticsChart type="pie" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>Quiz Besvarelser (45%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>Indhold Læst (30%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span>Diskussioner (15%)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span>Praktiske Opgaver (10%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Error Hotspot Heatmap</CardTitle>
                  <CardDescription>Områder hvor brugere ofte laver fejl i quizzer</CardDescription>
                </CardHeader>
                <CardContent>
                  <AdminErrorHeatmap />
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Se Detaljeret Rapport</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Indholdsadministration</CardTitle>
                <CardDescription>Administrer kurser, fag og emner</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="font-medium">Dataanalyse med Python</div>
                        <div className="text-sm text-muted-foreground">5 fag, 23 emner</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Redigér
                      </Button>
                      <Button variant="outline" size="sm">
                        Vis
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-purple-500" />
                      <div>
                        <div className="font-medium">Avanceret Frontend Udvikling</div>
                        <div className="text-sm text-muted-foreground">4 fag, 18 emner</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Redigér
                      </Button>
                      <Button variant="outline" size="sm">
                        Vis
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="font-medium">Machine Learning Grundkursus</div>
                        <div className="text-sm text-muted-foreground">3 fag, 15 emner</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Redigér
                      </Button>
                      <Button variant="outline" size="sm">
                        Vis
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Opret Nyt Kursus
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Brugeradministration</CardTitle>
                <CardDescription>Administrer brugere og rettigheder</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        <span className="font-medium">MK</span>
                      </div>
                      <div>
                        <div className="font-medium">Mette Kristensen</div>
                        <div className="text-sm text-muted-foreground">mette.k@example.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge>Student</Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Administrer
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                        <span className="font-medium">AJ</span>
                      </div>
                      <div>
                        <div className="font-medium">Anders Jensen</div>
                        <div className="text-sm text-muted-foreground">anders.j@example.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge>Student</Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Administrer
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                        <span className="font-medium">SP</span>
                      </div>
                      <div>
                        <div className="font-medium">Søren Pedersen</div>
                        <div className="text-sm text-muted-foreground">soren.p@example.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        Instruktør
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Administrer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Administrer Brugere
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI Konfiguration</CardTitle>
                <CardDescription>Konfigurer AI-assisteret læring og feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">AI-assisteret Spørgsmålsgenerering</h3>
                    <div className="rounded-lg border p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="font-medium">Status</div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Aktiv
                        </Badge>
                      </div>
                      <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span>Kvalitet af genererede spørgsmål</span>
                          <span className="text-muted-foreground">85%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Konfigurer
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium">AI Study Companion</h3>
                    <div className="rounded-lg border p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="font-medium">Status</div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          Aktiv
                        </Badge>
                      </div>
                      <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span>Brugerengagement</span>
                          <span className="text-muted-foreground">72%</span>
                        </div>
                        <Progress value={72} />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Konfigurer
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-medium">Adaptive Quizzer</h3>
                    <div className="rounded-lg border p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="font-medium">Status</div>
                        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                          Test
                        </Badge>
                      </div>
                      <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span>Effektivitet af adaptiv algoritme</span>
                          <span className="text-muted-foreground">68%</span>
                        </div>
                        <Progress value={68} />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Konfigurer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Avancerede AI Indstillinger
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
