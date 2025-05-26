import { Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AIInsightCardProps {
  title: string
  insight: string
  recommendedAction: string
}

export function AIInsightCard({ title, insight, recommendedAction }: AIInsightCardProps) {
  return (
    <Card className="border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <Lightbulb className="h-3.5 w-3.5 text-purple-700 dark:text-purple-300" />
          </div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{insight}</p>
      </CardContent>
      <CardFooter>
        <Button size="sm" className="w-full">
          {recommendedAction}
        </Button>
      </CardFooter>
    </Card>
  )
}
