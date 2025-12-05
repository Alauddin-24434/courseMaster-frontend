"use client"

import type React from "react"

import { useTranslation } from "react-i18next"
import { Users, BarChart3, Code, Zap } from "lucide-react"

interface Requirement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export function RequirementsSection() {
  const { t } = useTranslation()

  const requirements: Requirement[] = [
    {
      id: "1",
      title: "Browser Requirements",
      description: "Modern browser (Chrome, Firefox, Safari, or Edge) with JavaScript enabled",
      icon: <Code className="w-6 h-6" />,
    },
    {
      id: "2",
      title: "Internet Connection",
      description: "Minimum 2Mbps for video streaming, 1Mbps for course materials",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      id: "3",
      title: "System Requirements",
      description: "4GB RAM minimum, 500MB free disk space for cache",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      id: "4",
      title: "Account Requirements",
      description: "Valid email address and user account to track progress",
      icon: <Users className="w-6 h-6" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {requirements.map((req) => (
        <div key={req.id} className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition">
          <div className="flex gap-4">
            <div className="flex-shrink-0 text-primary">{req.icon}</div>
            <div className="flex-1">
              <h3 className="font-serif font-bold text-lg mb-2">{req.title}</h3>
              <p className="text-muted-foreground text-sm">{req.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
