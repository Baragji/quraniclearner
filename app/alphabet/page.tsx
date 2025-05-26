"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Check, Play, Volume2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassmorphismHeader } from "@/components/glassmorphism-header";
import { useState, useEffect } from "react";
import { calculatePercentage } from "@/lib/utils"; // Importer funktionen her

// Mock data for bogstaver - skal erstattes med reel datahentning
const alphabetData = [
  { id: "alif", letter: "ا", name: "Alif", transliteration: "a/ā", learned: true, audioSrc: "/audio/letters/alif.mp3" },
  { id: "ba", letter: "ب", name: "Ba", transliteration: "b", learned: true, audioSrc: "/audio/letters/ba.mp3" },
  { id: "ta", letter: "ت", name: "Ta", transliteration: "t", learned: true, audioSrc: "/audio/letters/ta.mp3" },
  { id: "tha", letter: "ث", name: "Tha", transliteration: "th", learned: true, audioSrc: "/audio/letters/tha.mp3" },
  { id: "jim", letter: "ج", name: "Jim", transliteration: "j", learned: false, audioSrc: "/audio/letters/jim.mp3" },
  { id: "ha", letter: "ح", name: "Ḥa", transliteration: "ḥ", learned: false, audioSrc: "/audio/letters/ha.mp3" },
  { id: "kha", letter: "خ", name: "Kha", transliteration: "kh", learned: false, audioSrc: "/audio/letters/kha.mp3" },
  { id: "dal", letter: "د", name: "Dal", transliteration: "d", learned: false, audioSrc: "/audio/letters/dal.mp3" },
  { id: "dhal", letter: "ذ", name: "Dhal", transliteration: "dh", learned: false, audioSrc: "/audio/letters/dhal.mp3" },
  { id: "ra", letter: "ر", name: "Ra", transliteration: "r", learned: false, audioSrc: "/audio/letters/ra.mp3" },
  { id: "zay", letter: "ز", name: "Zay", transliteration: "z", learned: false, audioSrc: "/audio/letters/zay.mp3" },
  { id: "sin", letter: "س", name: "Sin", transliteration: "s", learned: false, audioSrc: "/audio/letters/sin.mp3" },
  { id: "shin", letter: "ش", name: "Shin", transliteration: "sh", learned: false, audioSrc: "/audio/letters/shin.mp3" },
  { id: "sad", letter: "ص", name: "Ṣad", transliteration: "ṣ", learned: false, audioSrc: "/audio/letters/sad.mp3" },
  { id: "dad", letter: "ض", name: "Ḍad", transliteration: "ḍ", learned: false, audioSrc: "/audio/letters/dad.mp3" },
  { id: "tah", letter: "ط", name: "Ṭa", transliteration: "ṭ", learned: false, audioSrc: "/audio/letters/tah.mp3" },
  { id: "zah", letter: "ظ", name: "Ẓa", transliteration: "ẓ", learned: false, audioSrc: "/audio/letters/zah.mp3" },
  { id: "ayn", letter: "ع", name: "ʿAyn", transliteration: "ʿ", learned: false, audioSrc: "/audio/letters/ayn.mp3" },
  { id: "ghayn", letter: "غ", name: "Ghayn", transliteration: "gh", learned: false, audioSrc: "/audio/letters/ghayn.mp3" },
  { id: "fa", letter: "ف", name: "Fa", transliteration: "f", learned: false, audioSrc: "/audio/letters/fa.mp3" },
  { id: "qaf", letter: "ق", name: "Qaf", transliteration: "q", learned: false, audioSrc: "/audio/letters/qaf.mp3" },
  { id: "kaf", letter: "ك", name: "Kaf", transliteration: "k", learned: false, audioSrc: "/audio/letters/kaf.mp3" },
  { id: "lam", letter: "ل", name: "Lam", transliteration: "l", learned: false, audioSrc: "/audio/letters/lam.mp3" },
  { id: "mim", letter: "م", name: "Mim", transliteration: "m", learned: false, audioSrc: "/audio/letters/mim.mp3" },
  { id: "nun", letter: "ن", name: "Nun", transliteration: "n", learned: false, audioSrc: "/audio/letters/nun.mp3" },
  { id: "ha-h", letter: "ه", name: "Ha'", transliteration: "h", learned: false, audioSrc: "/audio/letters/ha-h.mp3" },
  { id: "waw", letter: "و", name: "Waw", transliteration: "w/ū", learned: false, audioSrc: "/audio/letters/waw.mp3" },
  { id: "ya", letter: "ي", name: "Ya", transliteration: "y/ī", learned: false, audioSrc: "/audio/letters/ya.mp3" },
];

// const calculatePercentage = (current: number, total: number) => { // FJERN DENNE LOKALE DEFINITION
//   if (total === 0) return 0;
//   return Math.round((current / total) * 100);
// };

const getNextLetterToLearn = (currentAlphabetData: typeof alphabetData) => {
    return currentAlphabetData.find(l => !l.learned) || currentAlphabetData[0];
};

const getLetterForms = (letterObj: typeof alphabetData[0]) => {
    if (!letterObj) return { isolated: '', initial: '', medial: '', final: '' };
    const baseLetter = letterObj.letter;
    return {
        isolated: baseLetter,
        initial: baseLetter + (baseLetter !== 'ا' && baseLetter !== 'د' && baseLetter !== 'ذ' && baseLetter !== 'ر' && baseLetter !== 'ز' && baseLetter !== 'و' ? "ـ" : ""),
        medial: (baseLetter !== 'ا' && baseLetter !== 'د' && baseLetter !== 'ذ' && baseLetter !== 'ر' && baseLetter !== 'ز' && baseLetter !== 'و' ? "ـ" : "") + baseLetter + (baseLetter !== 'ا' && baseLetter !== 'د' && baseLetter !== 'ذ' && baseLetter !== 'ر' && baseLetter !== 'ز' && baseLetter !== 'و' ? "ـ" : ""),
        final: (baseLetter !== 'ا' && baseLetter !== 'د' && baseLetter !== 'ذ' && baseLetter !== 'ر' && baseLetter !== 'ز' && baseLetter !== 'و' ? "ـ" : "") + baseLetter,
    };
};

const exampleWordsData: { [key: string]: { word: string; transliteration: string; meaning: string; audioSrc: string }[] } = {
    alif: [{ word: "أَسَد", transliteration: "asad", meaning: "løve", audioSrc: "/audio/words/asad.mp3" }],
    ba: [{ word: "بَيْت", transliteration: "bayt", meaning: "hus", audioSrc: "/audio/words/bayt.mp3" }],
    shin: [
        { word: "شَمْس", transliteration: "shams", meaning: "sol", audioSrc: "/audio/words/shams.mp3" },
        { word: "شُكْرًا", transliteration: "shukran", meaning: "tak", audioSrc: "/audio/words/shukran.mp3" },
        { word: "مَشَى", transliteration: "mashā", meaning: "at gå", audioSrc: "/audio/words/masha.mp3" },
    ],
};

const practiceExercises = [
  { id: "listening", title: "Lytteøvelse", description: "Lyt til udtalen og vælg det korrekte bogstav.", href: "/practice/alphabet/listening" },
  { id: "writing", title: "Skriveøvelse", description: "Øv dig i at skrive arabiske bogstaver med vejledning.", href: "/practice/alphabet/writing" },
  { id: "matching", title: "Matchning", description: "Match arabiske bogstaver med deres latinske ækvivalenter.", href: "/practice/alphabet/matching" },
];

export default function AlphabetPage() {
  const [userAlphabetData, setUserAlphabetData] = useState(alphabetData);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const player = new Audio();
    setAudioPlayer(player);
    return () => {
      if (player) {
        player.pause();
        player.src = '';
      }
    };
  }, []);

  const playSound = (audioSrc: string | undefined) => {
    if (audioPlayer && audioSrc) {
      audioPlayer.src = audioSrc;
      audioPlayer.play().catch(error => console.error("Fejl ved afspilning af lyd:", error));
    } else {
      console.warn("Lydkilde mangler eller afspiller er ikke klar.");
    }
  };

  const learnedLetters = userAlphabetData.filter(l => l.learned);
  const remainingLetters = userAlphabetData.filter(l => !l.learned);
  const progress = calculatePercentage(learnedLetters.length, userAlphabetData.length);
  const nextLetterToLearn = getNextLetterToLearn(userAlphabetData);
  const currentLetterForms = getLetterForms(nextLetterToLearn);
  const currentExampleWords = exampleWordsData[nextLetterToLearn?.id || ''] || [];

  const handleMarkAsLearned = (letterId: string) => {
    setUserAlphabetData(prevData =>
      prevData.map(l => (l.id === letterId ? { ...l, learned: !l.learned } : l))
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950">
      <GlassmorphismHeader />
      <main className="container flex-1 py-24">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-2 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tilbage til Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">الأبجدية العربية / Det Arabiske Alfabet</h1>
          <p className="text-muted-foreground">Lær de 28 bogstaver i det arabiske alfabet og deres udtale</p>
        </div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Fremskridt</span>
              <span className="text-muted-foreground">{learnedLetters.length} af {userAlphabetData.length} bogstaver ({progress}%)</span>
            </div>
            <Progress value={progress} className="h-2 bg-primary/20" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={learnedLetters.length === 0}>
              <Play className="mr-2 h-4 w-4" />
              Gennemgå Lærte Bogstaver
            </Button>
            {nextLetterToLearn && (
              <Button size="sm" asChild disabled={remainingLetters.length === 0}>
                <Link href={`/alphabet/learn/${nextLetterToLearn.id}`}>
                  <Play className="mr-2 h-4 w-4" />
                  Fortsæt Læring
                </Link>
              </Button>
            )}
          </div>
        </div>
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Alle Bogstaver</TabsTrigger>
            <TabsTrigger value="learned">Lærte Bogstaver</TabsTrigger>
            <TabsTrigger value="remaining">Resterende Bogstaver</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {userAlphabetData.map((letter) => (
                <Card key={letter.id} className={letter.learned ? "border-green-500 bg-green-50/50 dark:bg-green-900/20" : "hover:shadow-md"}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{letter.name}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleMarkAsLearned(letter.id)}>
                        <Check className={`h-4 w-4 ${letter.learned ? "text-green-600" : "text-muted-foreground/50 hover:text-green-500"}`} />
                         <span className="sr-only">{letter.learned ? "Markér som ulært" : "Markér som lært"}</span>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-arabic text-5xl">{letter.letter}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => playSound(letter.audioSrc)}>
                        <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
                        <span className="sr-only">Afspil lyd for {letter.name}</span>
                      </Button>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">Udtale: {letter.transliteration}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="learned" className="mt-6">
             <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {learnedLetters.map((letter) => (
                <Card key={letter.id} className={"border-green-500 bg-green-50/50 dark:bg-green-900/20"}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{letter.name}</span>
                       <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-arabic text-5xl">{letter.letter}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => playSound(letter.audioSrc)}>
                        <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
                      </Button>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">Udtale: {letter.transliteration}</div>
                  </CardContent>
                </Card>
              ))}
               {learnedLetters.length === 0 && <p className="col-span-full text-center text-muted-foreground">Du har endnu ikke markeret nogen bogstaver som lærte.</p>}
            </div>
          </TabsContent>
          <TabsContent value="remaining" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {remainingLetters.map((letter) => (
                <Card key={letter.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{letter.name}</span>
                       <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleMarkAsLearned(letter.id)}>
                        <Check className="h-4 w-4 text-muted-foreground/50 hover:text-green-500" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-arabic text-5xl">{letter.letter}</span>
                       <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => playSound(letter.audioSrc)}>
                        <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
                      </Button>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">Udtale: {letter.transliteration}</div>
                  </CardContent>
                </Card>
              ))}
              {remainingLetters.length === 0 && <p className="col-span-full text-center text-muted-foreground">Tillykke! Du har lært alle bogstaverne.</p>}
            </div>
          </TabsContent>
        </Tabs>
        {nextLetterToLearn && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Lær Næste Bogstav: <span className="font-arabic text-3xl">{nextLetterToLearn.letter}</span> ({nextLetterToLearn.name})</CardTitle>
              <CardDescription>Lær udtale, skrivning og genkendelse af bogstavet "{nextLetterToLearn.name}".</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-medium">Om Bogstavet</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Bogstavet <span className="font-arabic text-lg">{nextLetterToLearn.letter}</span> ({nextLetterToLearn.name}) udtales som "{nextLetterToLearn.transliteration}".
                  </p>
                  <div className="mb-4 rounded-lg bg-muted p-4 dark:bg-gray-800">
                    <h4 className="mb-2 text-sm font-medium">Skriveformer</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <span className="font-arabic text-2xl">{currentLetterForms.isolated}</span>
                        <span className="text-sm text-muted-foreground">Isoleret form</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-arabic text-2xl">{currentLetterForms.initial}</span>
                        <span className="text-sm text-muted-foreground">Initial form</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-arabic text-2xl">{currentLetterForms.medial}</span>
                        <span className="text-sm text-muted-foreground">Medial form</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-arabic text-2xl">{currentLetterForms.final}</span>
                        <span className="text-sm text-muted-foreground">Final form</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Eksempler med {nextLetterToLearn.name}</h3>
                  <div className="space-y-4">
                    {currentExampleWords.length > 0 ? currentExampleWords.map((ex, index) => (
                      <div key={index} className="rounded-lg border p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-arabic text-xl">{ex.word}</span>
                          <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => playSound(ex.audioSrc)}>
                            <Volume2 className="h-4 w-4" />
                            <span className="text-xs">Lyt</span>
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Translitteration: {ex.transliteration}</p>
                          <p>Betydning: {ex.meaning}</p>
                        </div>
                      </div>
                    )) : <p className="text-sm text-muted-foreground">Ingen eksempler tilgængelige for dette bogstav endnu.</p>}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={`/alphabet/learn/${nextLetterToLearn.id}`}>Start Lektion for {nextLetterToLearn.name}</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Øvelser</CardTitle>
            <CardDescription>Træn din forståelse af det arabiske alfabet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {practiceExercises.map((exercise) => (
                <Link key={exercise.id} href={exercise.href} className="block">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader> <CardTitle className="text-lg">{exercise.title}</CardTitle> </CardHeader>
                    <CardContent> <p className="text-sm text-muted-foreground">{exercise.description}</p> </CardContent>
                    <CardFooter> <Button variant="outline" className="w-full">Start Øvelse <ChevronRight className="ml-2 h-4 w-4" /></Button> </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Ata'allam al-Arabiya. Alle rettigheder forbeholdes.
          </div>
        </div>
      </footer>
    </div>
  );
}