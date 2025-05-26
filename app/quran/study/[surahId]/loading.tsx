import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-emerald-600 dark:text-emerald-400" />
      <p className="mt-4 text-lg font-medium">Indlæser Quran studie...</p>
    </div>
  )
}
