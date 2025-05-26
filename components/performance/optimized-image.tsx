"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { usePerformance } from "@/hooks/use-performance"

export function OptimizedImage() {
  const [activeTab, setActiveTab] = useState("optimized")
  const { measure } = usePerformance("OptimizedImage")
  const [loadTimes, setLoadTimes] = useState({
    optimized: 0,
    unoptimized: 0,
  })

  const handleLoadOptimized = () => {
    const loadOperation = measure("loadOptimizedImage")
    loadOperation.start()

    const img = new Image()
    img.onload = () => {
      loadOperation.end()
      setLoadTimes((prev) => ({ ...prev, optimized: performance.now() - startTime }))
    }
    const startTime = performance.now()
    img.src = "/images/quran-example-optimized.jpg"
  }

  const handleLoadUnoptimized = () => {
    const loadOperation = measure("loadUnoptimizedImage")
    loadOperation.start()

    const img = new Image()
    img.onload = () => {
      loadOperation.end()
      setLoadTimes((prev) => ({ ...prev, unoptimized: performance.now() - startTime }))
    }
    const startTime = performance.now()
    img.src = "/images/quran-example-original.jpg"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Optimization</CardTitle>
        <CardDescription>Compare optimized vs. unoptimized image loading performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="optimized">Optimized</TabsTrigger>
            <TabsTrigger value="unoptimized">Unoptimized</TabsTrigger>
          </TabsList>

          <TabsContent value="optimized" className="mt-4">
            <div className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg border">
                <Image
                  src="/images/quran-example-optimized.jpg"
                  alt="Optimized Quran page"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={activeTab === "optimized"}
                  quality={80}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>File size: 45KB (WebP format)</span>
                  <span>Load time: {loadTimes.optimized.toFixed(0)}ms</span>
                </div>
                <Button onClick={handleLoadOptimized} variant="outline" size="sm">
                  Test Load Time
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Benefits of optimized images:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Automatically converted to modern formats (WebP)</li>
                  <li>Responsive sizing based on device</li>
                  <li>Lazy loading for off-screen images</li>
                  <li>Reduced network payload</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="unoptimized" className="mt-4">
            <div className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg border">
                {/* Using img tag for unoptimized example */}
                <img
                  src="/images/quran-example-original.jpg"
                  alt="Unoptimized Quran page"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>File size: 250KB (JPEG format)</span>
                  <span>Load time: {loadTimes.unoptimized.toFixed(0)}ms</span>
                </div>
                <Button onClick={handleLoadUnoptimized} variant="outline" size="sm">
                  Test Load Time
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Issues with unoptimized images:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Larger file size increases page weight</li>
                  <li>Same large image sent to all devices</li>
                  <li>No automatic lazy loading</li>
                  <li>Layout shifts during loading</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
