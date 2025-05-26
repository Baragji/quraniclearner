interface AdminAnalyticsChartProps {
  type: "line" | "bar" | "pie"
  isLarge?: boolean
}

export function AdminAnalyticsChart({ type, isLarge = false }: AdminAnalyticsChartProps) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded bg-muted/30 p-2">
      <div className="text-center text-sm text-muted-foreground">
        {type === "line" && "Linjediagram"}
        {type === "bar" && "Søjlediagram"}
        {type === "pie" && "Cirkeldiagram"}
        {isLarge && " (Stort)"}
      </div>
    </div>
  )
}
