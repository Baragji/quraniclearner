import { Award, Calendar, Star } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FlashcardStatsProps {
  stats: {
    totalCards: number
    reviewedToday: number
    mastered: number
    learningProgress: number
    streak: number
  }
}

export function FlashcardStats({ stats }: FlashcardStatsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Flashcard Statistik</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                <Star className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Mestrede Kort</p>
                <p className="text-xs text-muted-foreground">
                  {stats.mastered} af {stats.totalCards} kort
                </p>
              </div>
            </div>
            <div className="text-2xl font-bold">{Math.round((stats.mastered / stats.totalCards) * 100)}%</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Læringsfremdrift</p>
                <p className="text-xs text-muted-foreground">Samlet fremgang</p>
              </div>
            </div>
            <div className="text-2xl font-bold">{stats.learningProgress}%</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Streak</p>
                <p className="text-xs text-muted-foreground">Dage i træk</p>
              </div>
            </div>
            <div className="text-2xl font-bold">{stats.streak}</div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Dagens mål</span>
              <span className="text-muted-foreground">{stats.reviewedToday}/20 kort</span>
            </div>
            <Progress value={(stats.reviewedToday / 20) * 100} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
