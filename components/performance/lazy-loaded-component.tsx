"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This is a "heavy" component that will be lazy loaded
export default function LazyLoadedComponent() {
  const [data, setData] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("tab1")

  // Simulate heavy computation or data loading
  useEffect(() => {
    // Simulate delay
    const timer = setTimeout(() => {
      // Generate some dummy data
      const generatedData = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.floor(Math.random() * 1000),
        category: ["A", "B", "C"][Math.floor(Math.random() * 3)],
      }))

      setData(generatedData)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="border-green-500">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Heavy Component Loaded Successfully</h3>
          <p className="text-sm text-muted-foreground">
            This component was loaded dynamically to improve initial page load performance.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tab1">Data Table</TabsTrigger>
            <TabsTrigger value="tab2">Statistics</TabsTrigger>
            <TabsTrigger value="tab3">Visualization</TabsTrigger>
          </TabsList>

          <TabsContent value="tab1" className="mt-4">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Value</th>
                    <th className="p-2 text-left">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 5).map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.value}</td>
                      <td className="p-2">{item.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="tab2" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-2xl font-bold">
                    {data.length > 0 ? data.reduce((sum, item) => sum + item.value, 0) : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Value</div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-2xl font-bold">
                    {data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length) : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Value</div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-2xl font-bold">{data.length}</div>
                  <div className="text-sm text-muted-foreground">Total Items</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tab3" className="mt-4">
            <div className="h-40 flex items-end justify-around bg-muted rounded-md p-4">
              {data.length > 0 ? (
                Array.from({ length: 10 }, (_, i) => {
                  const value = data[i]?.value || 0
                  const normalizedHeight = (value / 1000) * 100
                  return (
                    <div
                      key={i}
                      className="bg-primary w-6 rounded-t-sm"
                      style={{ height: `${normalizedHeight}%` }}
                      title={`Value: ${value}`}
                    />
                  )
                })
              ) : (
                <div className="text-muted-foreground">Loading data...</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
