import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

export default function ThematicExplorationSection() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [themes, setThemes] = useState<string>("")

  useEffect(() => {
    // Simuleret async fetch
    const timer = setTimeout(() => {
      setThemes("Eksempel på tematisk udforskning af Quranens emner. Udskift med rigtig data.")
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Card className="min-h-[120px]">
        <CardHeader>
          <CardTitle>Tematisk Udforskning</CardTitle>
          <CardDescription>Indlæser temaer...</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tematisk Udforskning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-destructive">Der opstod en fejl: {error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tematisk Udforskning</CardTitle>
        <CardDescription>Udforsk temaer og emner i Quranen</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{themes}</div>
      </CardContent>
    </Card>
  )
}