"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ResourceData {
  name: string
  size: number
  duration: number
}

export function ResourceMonitor() {
  const [resourceData, setResourceData] = useState<ResourceData[]>([])
  const [activeTab, setActiveTab] = useState("size")

  useEffect(() => {
    // Function to collect resource timing data
    const collectResourceData = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const resources = performance.getEntriesByType("resource")

        const data: ResourceData[] = resources
          .filter((resource: any) => {
            // Filter out tracking pixels and analytics
            return (
              !resource.name.includes("analytics") &&
              !resource.name.includes("tracking") &&
              !resource.name.includes("beacon")
            )
          })
          .map((resource: any) => {
            const url = new URL(resource.name)
            const pathParts = url.pathname.split("/")
            const fileName = pathParts[pathParts.length - 1]

            return {
              name: fileName || url.hostname,
              size: resource.transferSize || 0,
              duration: resource.duration,
              type: resource.initiatorType,
            }
          })
          .sort((a, b) => b.size - a.size)
          .slice(0, 15) // Take top 15 resources

        setResourceData(data)
      }
    }

    collectResourceData()

    // Set up interval to refresh data
    const intervalId = setInterval(collectResourceData, 5000)

    return () => clearInterval(intervalId)
  }, [])

  // Format bytes to human-readable format
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B"

    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resource Monitor</CardTitle>
        <CardDescription>Analyze resource loading performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="size">Resource Size</TabsTrigger>
            <TabsTrigger value="duration">Load Duration</TabsTrigger>
          </TabsList>

          <TabsContent value="size" className="h-80 mt-4">
            {resourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={formatBytes} />
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip formatter={(value: any) => formatBytes(value)} />
                  <Bar dataKey="size" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No resource data available
              </div>
            )}
          </TabsContent>

          <TabsContent value="duration" className="h-80 mt-4">
            {resourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(value) => `${value.toFixed(0)} ms`} />
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip formatter={(value: any) => `${value.toFixed(0)} ms`} />
                  <Bar dataKey="duration" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No resource data available
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
