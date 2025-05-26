import type React from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface RecentActivityCardProps {
  title: string
  description: string
  time: string
  result: string
  xpEarned: number
  icon: React.ReactNode
}

export function RecentActivityCard({ title, description, time, result, xpEarned, icon }: RecentActivityCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{result}</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">+{xpEarned} XP</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{time}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 pt-3">
        <Button variant="ghost" size="sm" className="ml-auto">
          Detaljer
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}
