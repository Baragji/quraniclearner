import { ArrowRight, BookOpen } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CourseCardProps {
  title: string
  description: string
  progress: number
  image: string
  badges: string[]
  lastActivity: string
  nextTopic: string
}

export function CourseCard({ title, description, progress, image, badges, lastActivity, nextTopic }: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="hidden h-auto w-48 bg-muted md:block">
          <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{title}</CardTitle>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {badges.map((badge, index) => (
                  <Badge key={index} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Fremskridt</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="mt-4 flex items-start gap-2 text-sm">
              <BookOpen className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Sidst aktiv: {lastActivity}</p>
                <p className="font-medium">Næste: {nextTopic}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Fortsæt Læring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
