import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

export default function TafsirSection() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tafsir, setTafsir] = useState<string>("")

  useEffect(() => {
    // Simuleret async fetch
    const timer = setTimeout(() => {
      // Her skal der integreres rigtig data senere
      setTafsir("Dette er et eksempel på tafsir for det valgte vers. Udskift med rigtig data.")
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <Card className="min-h-[120px]">
        <CardHeader>
          <CardTitle>Tafsir</CardTitle>
          <CardDescription>Indlæser tafsir...</CardDescription>
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
          <CardTitle>Tafsir</CardTitle>
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
        <CardTitle>Tafsir</CardTitle>
        <CardDescription>Forklaring og fortolkning af Quranens tekst</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{tafsir}</div>
      </CardContent>
    </Card>
  )
}