"use client"

import { useState } from "react"
import { usePerformance } from "@/hooks/use-performance"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export function PerformanceMetrics() {
  const { metrics, resourceStats, memoryUsage } = usePerformance("PerformanceMetrics")
  const [activeTab, setActiveTab] = useState("web-vitals")

  // Helper function to get status color based on metric value
  const getStatusColor = (name: string, value: number): string => {
    switch (name) {
      case "LCP":
        return value < 2500 ? "bg-green-500" : value < 4000 ? "bg-yellow-500" : "bg-red-500"
      case "FID":
        return value < 100 ? "bg-green-500" : value < 300 ? "bg-yellow-500" : "bg-red-500"
      case "CLS":
        return value < 0.1 ? "bg-green-500" : value < 0.25 ? "bg-yellow-500" : "bg-red-500"
      case "FCP":
        return value < 1800 ? "bg-green-500" : value < 3000 ? "bg-yellow-500" : "bg-red-500"
      case "TTFB":
        return value < 800 ? "bg-green-500" : value < 1800 ? "bg-yellow-500" : "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  // Get the latest value for each metric type
  const getLatestMetrics = () => {
    const latest: Record<string, any> = {}

    metrics.forEach((metric) => {
      if (!latest[metric.name] || (metric.timestamp && latest[metric.name].timestamp < metric.timestamp)) {
        latest[metric.name] = metric
      }
    })

    return Object.values(latest)
  }

  const latestMetrics = getLatestMetrics()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Monitor key performance indicators for your application</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="web-vitals">Web Vitals</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
          </TabsList>

          <TabsContent value="web-vitals" className="space-y-4 mt-4">
            {latestMetrics
              .filter((metric) => ["CLS", "FID", "LCP", "FCP", "TTFB"].includes(metric.name))
              .map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      {metric.name}
                      {metric.name === "LCP" && " (Largest Contentful Paint)"}
                      {metric.name === "FID" && " (First Input Delay)"}
                      {metric.name === "CLS" && " (Cumulative Layout Shift)"}
                      {metric.name === "FCP" && " (First Contentful Paint)"}
                      {metric.name === "TTFB" && " (Time to First Byte)"}
                    </span>
                    <span className="text-sm font-medium">
                      {metric.name === "CLS" ? metric.value.toFixed(3) : `${metric.value.toFixed(0)}ms`}
                    </span>
                  </div>
                  <Progress
                    value={
                      metric.name === "CLS" ? Math.min(metric.value * 1000, 100) : Math.min(metric.value / 50, 100)
                    }
                    className={getStatusColor(metric.name, metric.value)}
                  />
                </div>
              ))}

            {latestMetrics.filter((metric) => ["CLS", "FID", "LCP", "FCP", "TTFB"].includes(metric.name)).length ===
              0 && (
              <div className="text-center py-4 text-muted-foreground">
                No Web Vitals data available yet. Interact with the page to generate metrics.
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="mt-4">
            {resourceStats ? (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 font-medium text-sm border-b pb-2">
                  <div>Type</div>
                  <div>Count</div>
                  <div>Size</div>
                  <div>Avg. Duration</div>
                </div>

                {Object.entries(resourceStats).map(([type, stats]: [string, any], index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 text-sm">
                    <div>{type}</div>
                    <div>{stats.count}</div>
                    <div>{(stats.totalSize / 1024).toFixed(1)} KB</div>
                    <div>{stats.avgDuration.toFixed(0)} ms</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">Resource timing data not available.</div>
            )}
          </TabsContent>

          <TabsContent value="memory" className="mt-4">
            {memoryUsage ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Used Memory</span>
                    <span className="text-sm font-medium">{(memoryUsage.used / (1024 * 1024)).toFixed(1)} MB</span>
                  </div>
                  <Progress
                    value={memoryUsage.percentUsed}
                    className={
                      memoryUsage.percentUsed < 70
                        ? "bg-green-500"
                        : memoryUsage.percentUsed < 85
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="font-medium">Total Allocated</div>
                    <div>{(memoryUsage.total / (1024 * 1024)).toFixed(1)} MB</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">Heap Limit</div>
                    <div>{(memoryUsage.limit / (1024 * 1024)).toFixed(1)} MB</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Memory usage data not available in this browser.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
