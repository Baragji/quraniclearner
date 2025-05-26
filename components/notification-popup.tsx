"use client"

import { useEffect, useState } from "react"
import { Crown, X } from "lucide-react"

import { Button } from "@/components/ui/button"

interface NotificationPopupProps {
  title: string
  message: string
  type: "badge" | "xp" | "achievement"
}

export function NotificationPopup({ title, message, type }: NotificationPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show notification after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Hide notification after some time
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 8000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="rounded-lg border bg-card p-4 shadow-lg">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            {type === "badge" && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 text-white">
                <Crown className="h-5 w-5" />
              </div>
            )}
            <h3 className="font-semibold">{title}</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsVisible(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Luk</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
        <div className="mt-3 flex justify-end">
          <Button size="sm">Se Detaljer</Button>
        </div>
      </div>
    </div>
  )
}
