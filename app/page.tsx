"use client";

import Link from "next/link";
import { BookOpen, GraduationCap, Languages, MessageSquare, Search, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassmorphismHeader } from "@/components/glassmorphism-header";
import { calculatePercentage } from "@/lib/utils"; // Importer funktionen her

// Eksempel på data - dette skal erstattes med reel datahentning
const userProgress = {
  alphabet: { mastered: 12, total: 28 },
  grammar: { lessonsCompleted: 3, totalLessons: 20 },
  vocabulary: { wordsLearned: 45, totalWords: 200 },
  conversation: { practiced: 2, total: 10 },
};

// const calculatePercentage = (current: number, total: number) => { // FJERN DENNE LOKALE DEFINITION
//   if (total === 0) return 0;
//   return Math.round((current / total) * 100);
// };

export default function Dashboard() {
  const alphabetProgress = calculatePercentage(userProgress.alphabet.mastered, userProgress.alphabet.total);
  const grammarProgress = calculatePercentage(userProgress.grammar.lessonsCompleted, userProgress.grammar.totalLessons);
  const vocabularyProgress = calculatePercentage(userProgress.vocabulary.wordsLearned, userProgress.vocabulary.totalWords);
  const conversationProgress = calculatePercentage(userProgress.conversation.practiced, userProgress.conversation.total);

  const courses = [
    { id: "begynder", title: "Arabisk for Begyndere", description: "Grundlæggende arabisk for nybegyndere", progress: 35, modules: 7, students: 1245, link: "/kurser/begynder" },
    { id: "quran-intro", title: "Quran Arabisk Introduktion", description: "Forstå det særlige sprog i Quran", progress: 20, modules: 10, students: 2130, link: "/kurser/quran-intro" },
    { id: "kalligrafi", title: "Arabisk Kalligrafi", description: "Lær den smukke kunst at skrive arabisk", progress: 0, modules: 5, students: 875, link: "/kurser/kalligrafi" },
  ];

  const quranStudies = [
    { id: "al-fatiha", title: "Surah Al-Fatiha Studie", description: "Dybdegående analyse af åbningskapitlet", progress: 60, verses: 7, link: "/quran/study/1" },
    { id: "al-ikhlas", title: "Surah Al-Ikhlas Studie", description: "Lær om den rene monoteisme", progress: 25, verses: 4, link: "/quran/study/112" },
  ];

  const practiceModules = [
    { id: "vocab-flashcards", title: "Ordforråds Flashcards", description: "Øv arabiske ord med spaced repetition", status: "45 kort klar", link: "/vocabulary/flashcards" },
    { id: "listening-exercises", title: "Lytteøvelser", description: "Træn din arabiske lytteforståelse", status: "5 nye klip", link: "/practice/listening" },
    { id: "grammar-quiz", title: "Grammatik Quiz", description: "Test din forståelse af arabisk grammatik", status: "3 quizzer klar", link: "/practice/quiz" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-950">
      <GlassmorphismHeader />
      <main className="container flex-1 py-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">مرحبًا بك / Velkommen tilbage</h1>
          <p className="text-muted-foreground">Fortsæt din rejse med at lære arabisk og Quran</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <BookOpen className="h-5 w-5" />
                <span>Arabisk Alfabet</span>
              </CardTitle>
              <CardDescription>Lær de arabiske bogstaver og udtale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-foreground dark:text-primary">
                {userProgress.alphabet.mastered}/{userProgress.alphabet.total}
              </div>
              <p className="text-sm text-muted-foreground">Bogstaver mestret</p>
              <Progress value={alphabetProgress} className="mt-2 h-2 bg-primary/20" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/alphabet">Fortsæt Læring</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <GraduationCap className="h-5 w-5" />
                <span>Grundlæggende Grammatik</span>
              </CardTitle>
              <CardDescription>Forstå arabisk grammatik og struktur</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-foreground dark:text-primary">
                {userProgress.grammar.lessonsCompleted}/{userProgress.grammar.totalLessons}
              </div>
              <p className="text-sm text-muted-foreground">Lektioner gennemført</p>
              <Progress value={grammarProgress} className="mt-2 h-2 bg-primary/20" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/grammar">Start Næste Lektion</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Languages className="h-5 w-5" />
                <span>Quran Ordforråd</span>
              </CardTitle>
              <CardDescription>Lær de mest almindelige ord i Quran</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-foreground dark:text-primary">
                {userProgress.vocabulary.wordsLearned}/{userProgress.vocabulary.totalWords}
              </div>
              <p className="text-sm text-muted-foreground">Ord lært</p>
              <Progress value={vocabularyProgress} className="mt-2 h-2 bg-primary/20" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/vocabulary/flashcards">Øv Ordforråd</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <MessageSquare className="h-5 w-5" />
                <span>Samtaleøvelser</span>
              </CardTitle>
              <CardDescription>Øv praktiske samtaler på arabisk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-foreground dark:text-primary">
                {userProgress.conversation.practiced}/{userProgress.conversation.total}
              </div>
              <p className="text-sm text-muted-foreground">Samtaler øvet</p>
              <Progress value={conversationProgress} className="mt-2 h-2 bg-primary/20" />
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/practice/conversation">Start Samtale</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="courses">Kurser</TabsTrigger>
              <TabsTrigger value="quran">Quran Studie</TabsTrigger>
              <TabsTrigger value="practice">Øvelser</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fremskridt: {course.progress}%</span>
                        <span>{course.modules} moduler</span>
                      </div>
                      <Progress value={course.progress} className="h-2 bg-primary/20" />
                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{course.students.toLocaleString()} studerende</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={course.link}>
                          {course.progress > 0 ? "Fortsæt Kursus" : "Start Kursus"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="quran" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {quranStudies.map((study) => (
                  <Card key={study.id}>
                    <CardHeader>
                      <CardTitle>{study.title}</CardTitle>
                      <CardDescription>{study.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fremskridt: {study.progress}%</span>
                        <span>{study.verses} vers</span>
                      </div>
                      <Progress value={study.progress} className="h-2 bg-primary/20" />
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={study.link}>
                          {study.progress > 0 ? "Fortsæt Studie" : "Start Studie"}
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="practice" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {practiceModules.map((practice) => (
                  <Card key={practice.id}>
                    <CardHeader>
                      <CardTitle>{practice.title}</CardTitle>
                      <CardDescription>{practice.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-sm text-muted-foreground">
                        {practice.status}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={practice.link}>
                          Start Øvelse
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Din Anbefalede Læringssti</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-md hover:bg-muted transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Fuldfør Arabisk Alfabet</h3>
                <p className="text-sm text-muted-foreground">Lær de resterende {userProgress.alphabet.total - userProgress.alphabet.mastered} bogstaver og deres udtale.</p>
              </div>
              <Button size="sm" asChild>
                <Link href="/alphabet">Start</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-md hover:bg-muted transition-colors opacity-70">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <span className="font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Grundlæggende Ordforråd - Sæt 2</h3>
                <p className="text-sm text-muted-foreground">Lær de næste 20 almindelige arabiske ord.</p>
              </div>
              <Button size="sm" variant="outline" disabled>
                Låst
              </Button>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Ata'allam al-Arabiya. Alle rettigheder forbeholdes.
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">Om os</Link>
            <Link href="/contact" className="hover:underline">Kontakt</Link>
            <Link href="/privacy" className="hover:underline">Privatlivspolitik</Link>
            <Link href="/terms" className="hover:underline">Vilkår</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}