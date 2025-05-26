"use client"

import { useEffect, useState, useCallback } from "react"
import {
  initWebVitals,
  measurePerformance,
  getMetrics,
  analyzeResources,
  getMemoryUsage,
  type PerformanceMetric,
} from "@/lib/performance-monitoring"

export function usePerformance(componentName?: string) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [resourceStats, setResourceStats] = useState<any>(null)
  const [memoryUsage, setMemoryUsage] = useState<any>(null)

  // Initialize performance monitoring
  useEffect(() => {
    // Initialize web vitals on mount
    initWebVitals()

    // Mark component render
    if (componentName) {
      measurePerformance(`${componentName}_render`)
    }

    // Set up interval to update metrics
    const intervalId = setInterval(() => {
      setMetrics(getMetrics())
      setResourceStats(analyzeResources())
      setMemoryUsage(getMemoryUsage())
    }, 2000)

    return () => {
      clearInterval(intervalId)
      if (componentName) {
        measurePerformance(`${componentName}_unmount`)
      }
    }
  }, [componentName])

  // Function to measure a specific operation
  const measure = useCallback((operationName: string) => {
    const startMark = `${operationName}_start`
    const endMark = `${operationName}_end`

    return {
      start: () => measurePerformance(startMark),
      end: () => {
        measurePerformance(endMark)
        measurePerformance(operationName, startMark, endMark)
      },
    }
  }, [])

  return {
    metrics,
    resourceStats,
    memoryUsage,
    measure,
  }
}
