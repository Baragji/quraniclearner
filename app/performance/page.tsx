import type { Metadata } from "next"
import { PerformanceMetrics } from "@/components/performance/performance-metrics"
import { ResourceMonitor } from "@/components/performance/resource-monitor"
import { CodeSplittingExample } from "@/components/performance/code-splitting-example"
import { OptimizedImage } from "@/components/performance/optimized-image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Performance | Quranic Arabic Trainer",
  description: "Monitor and optimize application performance",
}

export default function PerformancePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Performance Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Key metrics and insights about application performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This dashboard provides real-time monitoring of your application's performance metrics, including Core Web
              Vitals, resource usage, and memory consumption.
            </p>
            <p>Use these insights to identify bottlenecks and optimize the user experience.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimization Tips</CardTitle>
            <CardDescription>Recommendations to improve performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">1. Minimize JavaScript</h3>
              <p className="text-sm text-muted-foreground">
                Reduce bundle size by removing unused code and splitting bundles.
              </p>
            </div>
            <div>
              <h3 className="font-medium">2. Optimize Images</h3>
              <p className="text-sm text-muted-foreground">
                Use next/image for automatic optimization and responsive images.
              </p>
            </div>
            <div>
              <h3 className="font-medium">3. Implement Caching</h3>
              <p className="text-sm text-muted-foreground">
                Use service workers and HTTP caching for faster repeat visits.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <PerformanceMetrics />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResourceMonitor />
          <OptimizedImage />
        </div>
        <CodeSplittingExample />
      </div>
    </div>
  )
}
