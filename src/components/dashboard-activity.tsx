"use client"

import { useTranslation } from "react-i18next"
import { CheckCircle2, BookOpen, Award } from "lucide-react"

interface Activity {
  id: string
  type: "completion" | "enrollment" | "certificate"
  title: string
  description: string
  timestamp: string
}

export function DashboardActivity() {
  const { t } = useTranslation()

  const activities: Activity[] = [
    {
      id: "1",
      type: "completion",
      title: "Lesson Completed",
      description: "Completed 'Advanced CSS Grid' in Web Development Masterclass",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "enrollment",
      title: "New Course Enrolled",
      description: "Enrolled in 'Advanced React Patterns'",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      type: "certificate",
      title: "Certificate Earned",
      description: "Earned certificate for 'Python Fundamentals'",
      timestamp: "3 days ago",
    },
  ]

  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "completion":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "enrollment":
        return <BookOpen className="w-5 h-5 text-blue-500" />
      case "certificate":
        return <Award className="w-5 h-5 text-yellow-500" />
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-xl font-serif font-bold mb-6">{t("dashboard.recent_activity") || "Recent Activity"}</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
            <div className="flex-shrink-0">{getIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-2">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
