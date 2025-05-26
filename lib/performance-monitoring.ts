import { getCLS, getFID, getLCP, getFCP, getTTFB } from "web-vitals"

type MetricName = "CLS" | "FID" | "LCP" | "FCP" | "TTFB" | "Custom"

export interface PerformanceMetric {
  name: MetricName
  value: number
  id?: string
  delta?: number
  navigationType?: string
  timestamp?: number
  customDescription?: string
}

// Array to store metrics
const metrics: PerformanceMetric[] = []

// Function to report metrics to analytics
const reportMetric = (metric: PerformanceMetric) => {
  // Store metric in local array
  metrics.push(metric)

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Performance] ${metric.name}: ${metric.value}`)
  }

  // In a real app, you would send this to your analytics service
  // Example: sendToAnalytics(metric);
}

// Initialize web vitals monitoring
export const initWebVitals = () => {
  getCLS((metric) => reportMetric({ name: "CLS", value: metric.value, id: metric.id, delta: metric.delta }))
  getFID((metric) => reportMetric({ name: "FID", value: metric.value, id: metric.id, delta: metric.delta }))
  getLCP((metric) => reportMetric({ name: "LCP", value: metric.value, id: metric.id, delta: metric.delta }))
  getFCP((metric) => reportMetric({ name: "FCP", value: metric.value, id: metric.id, delta: metric.delta }))
  getTTFB((metric) => reportMetric({ name: "TTFB", value: metric.value, id: metric.id, delta: metric.delta }))
}

// Custom performance measurement
export const measurePerformance = (markName: string, startMark?: string, endMark?: string) => {
  if (typeof window !== "undefined" && "performance" in window) {
    // Create mark
    performance.mark(markName)

    // If start and end marks are provided, create a measure
    if (startMark && endMark) {
      try {
        performance.measure(markName, startMark, endMark)
        const entries = performance.getEntriesByName(markName, "measure")
        if (entries.length > 0) {
          reportMetric({
            name: "Custom",
            value: entries[0].duration,
            customDescription: markName,
            timestamp: Date.now(),
          })
        }
      } catch (e) {
        console.error("Error measuring performance:", e)
      }
    }
  }
}

// Get all collected metrics
export const getMetrics = (): PerformanceMetric[] => {
  return [...metrics]
}

// Clear metrics (useful for testing)
export const clearMetrics = () => {
  metrics.length = 0
}

// Resource timing analysis
export const analyzeResources = () => {
  if (typeof window !== "undefined" && "performance" in window) {
    const resources = performance.getEntriesByType("resource")

    // Group by resource type
    const byType: Record<string, { count: number; totalSize: number; avgDuration: number }> = {}

    resources.forEach((resource) => {
      const { initiatorType, duration, transferSize } = resource as PerformanceResourceTiming

      if (!byType[initiatorType]) {
        byType[initiatorType] = { count: 0, totalSize: 0, avgDuration: 0 }
      }

      byType[initiatorType].count++
      byType[initiatorType].totalSize += transferSize || 0
      byType[initiatorType].avgDuration =
        (byType[initiatorType].avgDuration * (byType[initiatorType].count - 1) + duration) / byType[initiatorType].count
    })

    return byType
  }

  return null
}

// Memory usage monitoring (where supported)
export const getMemoryUsage = () => {
  if (
    typeof window !== "undefined" &&
    "performance" in window &&
    // @ts-ignore - Not all browsers support memory info
    performance.memory
  ) {
    // @ts-ignore
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory

    return {
      used: usedJSHeapSize,
      total: totalJSHeapSize,
      limit: jsHeapSizeLimit,
      percentUsed: (usedJSHeapSize / jsHeapSizeLimit) * 100,
    }
  }

  return null
}
