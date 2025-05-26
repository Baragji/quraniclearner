"use client"

import { Lightbulb, X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface AIExplainOverlayProps {
  explanation: string
  onClose: () => void
}

export function AIExplainOverlay({ explanation, onClose }: AIExplainOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-w-md rounded-lg border bg-card p-6 shadow-lg">
        <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Luk</span>
        </Button>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <Lightbulb className="h-4 w-4 text-purple-700 dark:text-purple-300" />
          </div>
          <h3 className="text-lg font-semibold">AI Forklaring</h3>
        </div>
        <p className="text-muted-foreground">{explanation}</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>Forstået</Button>
        </div>
      </div>
    </div>
  )
}
