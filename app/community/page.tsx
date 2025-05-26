"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MessageSquare,
  Heart,
  Share2,
  BookmarkPlus,
  Users,
  Award,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Clock,
} from "lucide-react"
import { GlassmorphismHeader } from "@/components/glassmorphism-header"
import { TopicDiscussionThread } from "@/components/topic-discussion-thread"

// Mock data
const mockDiscussions = [
  {
    id: 1,
    title: "Forståelse af Rod-bogstavssystemet",
    author: {
      name: "Ahmed Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Avanceret",
    },
    date: "For 2 dage siden",
    content:
      "Jeg har svært ved at forstå konceptet med rod-bogstaver i arabisk. Kan nogen forklare, hvordan man identificerer roden i et ord, og hvordan det hjælper med at forstå ordets betydning?",
    tags: ["Grammatik", "Ordforråd", "Begynder"],
    likes: 24,
    comments: 8,
    views: 156,
  },
  {
    id: 2,
    title: "Tips til at huske arabiske verber",
    author: {
      name: "Sophia Jensen",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Mellem",
    },
    date: "For 5 dage siden",
    content:
      "Jeg har fundet nogle effektive metoder til at huske arabiske verber og deres konjugationer. Vil gerne dele dem med fællesskabet og høre, hvilke metoder I bruger.",
    tags: ["Verber", "Hukommelsesteknikker", "Studie"],
    likes: 42,
    comments: 15,
    views: 230,
  },
  {
    id: 3,
    title: "Analyse af Surah Al-Fatiha",
    author: {
      name: "Omar Khalid",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Ekspert",
    },
    date: "For 1 uge siden",
    content:
      "Jeg har lavet en detaljeret grammatisk analyse af Surah Al-Fatiha, som jeg gerne vil dele. Den indeholder ordforråd, grammatiske strukturer og kulturel kontekst.",
    tags: ["Quran", "Analyse", "Grammatik"],
    likes: 87,
    comments: 32,
    views: 412,
  },
]

const mockStudyGroups = [
  {
    id: 1,
    name: "Begyndere i Quranic Arabisk",
    members: 128,
    description: "En gruppe for nybegyndere, der ønsker at lære grundlæggende Quranic arabisk sammen.",
    topics: ["Alfabet", "Grundlæggende Grammatik", "Daglige Udtryk"],
    meetingTime: "Onsdage kl. 19:00",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Quran Tafsir Studiegruppe",
    members: 76,
    description: "Vi studerer Quran med fokus på tafsir (fortolkning) og sproglig analyse.",
    topics: ["Tafsir", "Sproglig Analyse", "Historisk Kontekst"],
    meetingTime: "Lørdage kl. 10:00",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Arabisk Konversationsklub",
    members: 54,
    description: "Praktiser arabisk samtale med andre studerende på alle niveauer.",
    topics: ["Konversation", "Udtale", "Kulturel Udveksling"],
    meetingTime: "Mandage kl. 18:30",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const mockChallenges = [
  {
    id: 1,
    title: "30 Dages Quran Vokabular",
    participants: 342,
    description: "Lær 5 nye Quran-ord hver dag i 30 dage og test din hukommelse.",
    difficulty: "Mellem",
    progress: 65,
    daysLeft: 12,
    badge: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    title: "Grammatik Mester",
    participants: 186,
    description: "Gennemfør daglige grammatikøvelser og opnå mesterskab i arabisk grammatik.",
    difficulty: "Avanceret",
    progress: 40,
    daysLeft: 18,
    badge: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    title: "Udtale Udfordring",
    participants: 278,
    description: "Optag din udtale af arabiske lyde og få feedback fra fællesskabet.",
    difficulty: "Begynder",
    progress: 80,
    daysLeft: 6,
    badge: "/placeholder.svg?height=60&width=60",
  },
]

const mockLeaderboard = [
  { rank: 1, name: "Ahmed Hassan", points: 12450, avatar: "/placeholder.svg?height=40&width=40", streak: 86 },
  { rank: 2, name: "Sophia Jensen", points: 11280, avatar: "/placeholder.svg?height=40&width=40", streak: 64 },
  { rank: 3, name: "Omar Khalid", points: 10920, avatar: "/placeholder.svg?height=40&width=40", streak: 78 },
  { rank: 4, name: "Maria Rodriguez", points: 9840, avatar: "/placeholder.svg?height=40&width=40", streak: 52 },
  { rank: 5, name: "Yusuf Ali", points: 9210, avatar: "/placeholder.svg?height=40&width=40", streak: 45 },
]

export default function Community() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const [newPost, setNewPost] = useState({ title: "", content: "", tags: "" })

  const handleSelectDiscussion = (id: number) => {
    setSelectedDiscussion(id)
  }

  const handleBackToDiscussions = () => {
    setSelectedDiscussion(null)
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value)
  }

  const handlePostComment = () => {
    // In a real app, this would send the comment to a backend
    console.log("Posting comment:", newComment)
    setNewComment("")
  }

  const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreatePost = () => {
    // In a real app, this would send the new post to a backend
    console.log("Creating new post:", newPost)
    setNewPost({ title: "", content: "", tags: "" })
  }

  const handleJoinGroup = (groupId: number) => {
    // In a real app, this would join the user to the group
    console.log("Joining group:", groupId)
  }

  const handleJoinChallenge = (challengeId: number) => {
    // In a real app, this would join the user to the challenge
    console.log("Joining challenge:", challengeId)
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <GlassmorphismHeader
        title="Community"
        description="Forbind med andre arabisk-studerende, del ressourcer og deltag i diskussioner"
        imageUrl="/placeholder.svg?height=100&width=100"
      />

      <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Diskussioner</span>
          </TabsTrigger>
          <TabsTrigger value="study-groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Studiegrupper</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Udfordringer</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Rangliste</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="mt-0">
          {selectedDiscussion === null ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Start en ny diskussion</CardTitle>
                  <CardDescription>Del dine tanker, spørgsmål eller ressourcer med fællesskabet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Titel på din diskussion"
                        name="title"
                        value={newPost.title}
                        onChange={handleNewPostChange}
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Skriv dit indlæg her..."
                        className="min-h-[120px]"
                        name="content"
                        value={newPost.content}
                        onChange={handleNewPostChange}
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Tags (adskilt med komma)"
                        name="tags"
                        value={newPost.tags}
                        onChange={handleNewPostChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleCreatePost} disabled={!newPost.title || !newPost.content}>
                    Opret Diskussion
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-4">
                {mockDiscussions.map((discussion) => (
                  <Card
                    key={discussion.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleSelectDiscussion(discussion.id)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold">{discussion.title}</h3>
                          <div className="flex items-center space-x-4 text-gray-500">
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              <span>{discussion.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span>{discussion.comments}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <AvatarImage
                              src={discussion.author.avatar || "/placeholder.svg"}
                              alt={discussion.author.name}
                            />
                            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{discussion.author.name}</p>
                            <p className="text-sm text-gray-500">{discussion.date}</p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {discussion.author.level}
                          </Badge>
                        </div>

                        <p className="text-gray-700 line-clamp-2">{discussion.content}</p>

                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm" onClick={handleBackToDiscussions}>
                    &larr; Tilbage til diskussioner
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <BookmarkPlus className="h-4 w-4 mr-1" />
                      Gem
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Del
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <TopicDiscussionThread discussion={mockDiscussions.find((d) => d.id === selectedDiscussion)!} />

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Skriv en kommentar</h3>
                  <Textarea
                    placeholder="Del dine tanker..."
                    className="min-h-[100px]"
                    value={newComment}
                    onChange={handleCommentChange}
                  />
                  <Button onClick={handlePostComment} disabled={!newComment.trim()}>
                    Send Kommentar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="study-groups" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStudyGroups.map((group) => (
              <Card key={group.id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={group.image || "/placeholder.svg"} alt={group.name} />
                      <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.members} medlemmer</p>
                    </div>
                  </div>

                  <p className="text-gray-700">{group.description}</p>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Emner:</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{group.meetingTime}</span>
                  </div>

                  <Button onClick={() => handleJoinGroup(group.id)} className="w-full">
                    Deltag i Gruppe
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full space-y-4 min-h-[300px]">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-center">Opret en ny studiegruppe</h3>
                <p className="text-gray-500 text-center">
                  Start din egen studiegruppe og inviter andre til at lære sammen med dig
                </p>
                <Button>Opret Gruppe</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockChallenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{challenge.title}</h3>
                      <p className="text-sm text-gray-500">{challenge.participants} deltagere</p>
                    </div>
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={challenge.badge || "/placeholder.svg"} alt={challenge.title} />
                      <AvatarFallback>{challenge.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>

                  <p className="text-gray-700">{challenge.description}</p>

                  <div className="flex justify-between items-center">
                    <Badge
                      variant={
                        challenge.difficulty === "Begynder"
                          ? "outline"
                          : challenge.difficulty === "Mellem"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {challenge.difficulty}
                    </Badge>
                    <span className="text-sm text-gray-500">{challenge.daysLeft} dage tilbage</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Fremskridt</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: `${challenge.progress}%` }}></div>
                    </div>
                  </div>

                  <Button onClick={() => handleJoinChallenge(challenge.id)} className="w-full">
                    Deltag i Udfordring
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Top Studerende</CardTitle>
              <CardDescription>De mest aktive og engagerede studerende i fællesskabet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockLeaderboard.map((user, index) => (
                  <div key={user.rank} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-700"
                            : index === 1
                              ? "bg-gray-100 text-gray-700"
                              : index === 2
                                ? "bg-amber-100 text-amber-700"
                                : "bg-gray-50 text-gray-500"
                        }`}
                      >
                        {user.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <BookOpen className="h-3 w-3 mr-1" />
                          <span>{user.streak} dages streak</span>
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-lg">{user.points.toLocaleString()} point</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Se Fuld Rangliste</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
