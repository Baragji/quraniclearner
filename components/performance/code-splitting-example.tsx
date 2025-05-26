"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { usePerformance } from "@/hooks/use-performance"

// This component demonstrates code splitting and lazy loading
export function CodeSplittingExample() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false)
  const { measure } = usePerformance("CodeSplittingExample")

  // Dynamically import the heavy component only when needed
  const loadComponent = async () => {
    const loadOperation = measure("loadHeavyComponent")
    loadOperation.start()

    try {
      const HeavyComponentModule = await import("./lazy-loaded-component")
      loadOperation.end()
      setShowHeavyComponent(true)
      return HeavyComponentModule.default
    } catch (error) {
      console.error("Failed to load component:", error)
      loadOperation.end()
      return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Splitting Demo</CardTitle>
        <CardDescription>
          This demonstrates dynamic loading of components to improve initial load performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Heavy components can be loaded on-demand instead of including them in the initial bundle. This reduces the
          initial JavaScript payload and improves page load times.
        </p>

        {showHeavyComponent ? (
          <Suspense fallback={<LoadingPlaceholder />}>
            <LazyHeavyComponent />
          </Suspense>
        ) : (
          <div className="bg-muted p-6 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Heavy component not loaded yet</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            if (!showHeavyComponent) {
              loadComponent()
            } else {
              setShowHeavyComponent(false)
            }
          }}
        >
          {showHeavyComponent ? "Unload Component" : "Load Heavy Component"}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Lazy loaded component wrapper
function LazyHeavyComponent() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    import("./lazy-loaded-component").then((module) => {
      setComponent(() => module.default)
    })
  }, [])

  if (!Component) {
    return <LoadingPlaceholder />
  }

  return <Component />
}

// Loading placeholder
function LoadingPlaceholder() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-8 w-2/3" />
    </div>
  )
}
