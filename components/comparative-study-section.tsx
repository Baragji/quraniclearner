import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

export default function ComparativeStudySection() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<string>("")

  useEffect(() => {
    // Simuleret async fetch
    const timer = setTimeout(() => {
      setData("Eksempel på sammenlignende analyse mellem forskellige oversættelser eller fortolkninger. Udskift med rigtig data.")
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Card className="min-h-[120px]">
        <CardHeader>
          <CardTitle>Sammenlignende Studie</CardTitle>
          <CardDescription>Indlæser sammenligning...</CardDescription>
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
          <CardTitle>Sammenlignende Studie</CardTitle>
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
        <CardTitle>Sammenlignende Studie</CardTitle>
        <CardDescription>Sammenlign forskellige oversættelser eller fortolkninger</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{data}</div>
      </CardContent>
    </Card>
  )
}