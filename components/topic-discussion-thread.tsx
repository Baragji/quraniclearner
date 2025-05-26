"use client"

import { useState } from "react"
import { Send, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function TopicDiscussionThread() {
  const [newComment, setNewComment] = useState("")

  const comments = [
    {
      id: 1,
      author: "Anders J.",
      avatar: "AJ",
      time: "For 2 timer siden",
      content:
        "Jeg har problemer med at forstå forskellen mellem .loc og .iloc i Pandas. Kan nogen forklare det på en enkel måde?",
      likes: 3,
      replies: [
        {
          id: 2,
          author: "Søren P.",
          avatar: "SP",
          time: "For 1 time siden",
          content:
            ".loc bruger labels til at vælge data (f.eks. kolonnenavne eller indeksværdier), mens .iloc bruger positioner (f.eks. 0, 1, 2). Tænk på .loc som 'label-baseret' og .iloc som 'integer-baseret'.",
          likes: 5,
        },
        {
          id: 3,
          author: "Mette K.",
          avatar: "MK",
          time: "For 45 minutter siden",
          content:
            "Et godt eksempel: df.loc['A':'C', 'navn'] vælger rækker med indeks A til C og kolonnen 'navn', mens df.iloc[0:3, 0] vælger de første 3 rækker og den første kolonne.",
          likes: 2,
        },
      ],
    },
    {
      id: 4,
      author: "Louise T.",
      avatar: "LT",
      time: "I går",
      content:
        "Er der nogen, der har et godt eksempel på, hvordan man håndterer manglende værdier i en DataFrame? Jeg er ikke sikker på, om jeg skal bruge dropna() eller fillna().",
      likes: 1,
      replies: [],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <Textarea
          placeholder="Skriv en kommentar eller stil et spørgsmål..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2 min-h-[100px] resize-none"
        />
        <div className="flex justify-end">
          <Button disabled={!newComment.trim()}>
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>{comment.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{comment.author}</div>
                    <div className="text-xs text-muted-foreground">{comment.time}</div>
                  </div>
                </div>
              </div>
              <p className="text-sm">{comment.content}</p>
              <div className="mt-3 flex items-center justify-between">
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8">
                  Svar
                </Button>
              </div>
            </div>

            {comment.replies.length > 0 && (
              <div className="ml-8 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>{reply.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{reply.author}</div>
                          <div className="text-xs text-muted-foreground">{reply.time}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">{reply.content}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{reply.likes}</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
