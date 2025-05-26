"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CloudOff, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log fejlen til en fejlrapporteringstjeneste
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <CloudOff className="mb-4 h-16 w-16 text-emerald-600 dark:text-emerald-400" />
      <h2 className="mb-2 text-2xl font-bold">Offline Indhold Utilgængeligt</h2>
      <p className="mb-6 max-w-md text-center text-muted-foreground">
        Der opstod en fejl ved indlæsning af offline indhold. Dette kan skyldes manglende internetforbindelse eller
        problemer med cachen.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Prøv Igen
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Gå til Forsiden</Link>
        </Button>
      </div>
    </div>
  )
}
