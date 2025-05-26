import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"

export const metadata: Metadata = {
  title: "Indstillinger | Quranic Arabic Trainer",
  description: "Tilpas din læringsoplevelse med personlige indstillinger",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <GlassmorphismHeader
        title="Indstillinger"
        description="Tilpas din læringsoplevelse med personlige indstillinger"
        icon="Settings"
      />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="general">Generelt</TabsTrigger>
          <TabsTrigger value="appearance">Udseende</TabsTrigger>
          <TabsTrigger value="learning">Læring</TabsTrigger>
          <TabsTrigger value="notifications">Notifikationer</TabsTrigger>
          <TabsTrigger value="offline">Offline</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Generelle Indstillinger</CardTitle>
              <CardDescription>Administrer dine grundlæggende kontoindstillinger</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Sprog</Label>
                <Select defaultValue="danish">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Vælg sprog" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="danish">Dansk</SelectItem>
                    <SelectItem value="english">Engelsk</SelectItem>
                    <SelectItem value="arabic">Arabisk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Analysedata</Label>
                  <p className="text-sm text-muted-foreground">
                    Hjælp os med at forbedre platformen ved at dele anonyme brugsdata
                  </p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cookies">Cookies</Label>
                  <p className="text-sm text-muted-foreground">Tillad cookies for en bedre brugeroplevelse</p>
                </div>
                <Switch id="cookies" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Gem ændringer</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Udseende</CardTitle>
              <CardDescription>Tilpas platformens udseende efter dine præferencer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tema</Label>
                <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="light" id="light" className="peer sr-only" />
                    <Label
                      htmlFor="light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-sun"
                      >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                      <span className="mt-2">Lys</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                    <Label
                      htmlFor="dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-moon"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                      <span className="mt-2">Mørk</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="system" id="system" className="peer sr-only" />
                    <Label
                      htmlFor="system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-laptop"
                      >
                        <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                      </svg>
                      <span className="mt-2">System</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Skriftstørrelse</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs">A</span>
                  <Slider defaultValue={[16]} max={24} min={12} step={1} />
                  <span className="text-lg">A</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font">Skrifttype</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="font">
                    <SelectValue placeholder="Vælg skrifttype" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="sans">Sans-serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Gem ændringer</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Læringsindstillinger</CardTitle>
              <CardDescription>Tilpas din læringsoplevelse for at maksimere din fremgang</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Sværhedsgrad</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Vælg sværhedsgrad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Let</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Svær</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Dagligt læringsmål</Label>
                <div className="flex items-center space-x-2">
                  <span>5 min</span>
                  <Slider defaultValue={[20]} max={60} min={5} step={5} />
                  <span>60 min</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="spaced-repetition">Spaced Repetition</Label>
                  <p className="text-sm text-muted-foreground">
                    Optimér din læring med avancerede gentagelsesalgoritmer
                  </p>
                </div>
                <Switch id="spaced-repetition" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="audio-feedback">Lydfeedback</Label>
                  <p className="text-sm text-muted-foreground">Få lydfeedback ved korrekte og forkerte svar</p>
                </div>
                <Switch id="audio-feedback" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Gem ændringer</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifikationsindstillinger</CardTitle>
              <CardDescription>Administrer hvordan og hvornår du modtager notifikationer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="daily-reminder">Daglig påmindelse</Label>
                  <p className="text-sm text-muted-foreground">Få en daglig påmindelse om at øve</p>
                </div>
                <Switch id="daily-reminder" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="achievement">Præstationsnotifikationer</Label>
                  <p className="text-sm text-muted-foreground">Få besked når du opnår nye præstationer</p>
                </div>
                <Switch id="achievement" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="community">Fællesskabsnotifikationer</Label>
                  <p className="text-sm text-muted-foreground">Få besked om aktivitet i fællesskabet</p>
                </div>
                <Switch id="community" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-time">Påmindelsestidspunkt</Label>
                <Select defaultValue="18">
                  <SelectTrigger id="reminder-time">
                    <SelectValue placeholder="Vælg tidspunkt" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i.toString().padStart(2, "0")}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Gem ændringer</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="offline" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Offline-indstillinger</CardTitle>
              <CardDescription>Administrer hvordan appen fungerer, når du er offline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="offline-mode">Offline-tilstand</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktivér offline-funktionalitet for at bruge appen uden internetforbindelse
                  </p>
                </div>
                <Switch id="offline-mode" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage-limit">Lagerplads til offline-indhold</Label>
                <div className="flex items-center space-x-2">
                  <span>100 MB</span>
                  <Slider defaultValue={[500]} max={1000} min={100} step={100} />
                  <span>1 GB</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Nuværende forbrug: 235 MB / 500 MB</p>
              </div>

              <div className="space-y-2">
                <Label>Offline-indhold</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-sm font-medium">Kurser</span>
                      <p className="text-xs text-muted-foreground">Download kurser til offline-brug</p>
                    </div>
                    <Switch id="offline-courses" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-sm font-medium">Quran-tekst</span>
                      <p className="text-xs text-muted-foreground">Download Quran-tekst til offline-brug</p>
                    </div>
                    <Switch id="offline-quran-text" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-sm font-medium">Quran-lydoptagelser</span>
                      <p className="text-xs text-muted-foreground">Download Quran-recitationer til offline-brug</p>
                    </div>
                    <Switch id="offline-quran-audio" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-sm font-medium">Flashcards</span>
                      <p className="text-xs text-muted-foreground">Download flashcards til offline-brug</p>
                    </div>
                    <Switch id="offline-flashcards" defaultChecked />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Synkroniser offline-data nu
              </Button>
            </CardContent>
            <CardFooter>
              <Button>Gem ændringer</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
