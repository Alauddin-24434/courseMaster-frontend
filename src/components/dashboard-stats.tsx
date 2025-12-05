"use client"

import type React from "react"

import { useTranslation } from "react-i18next"
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react"

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: string
}

function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </p>
          )}
        </div>
        <div className="text-primary/20">{icon}</div>
      </div>
    </div>
  )
}

export function DashboardStats() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label={t("dashboard.enrolled_courses") || "Enrolled Courses"}
        value="5"
        icon={<BookOpen className="w-8 h-8" />}
        trend="+2 this month"
      />
      <StatCard
        label={t("dashboard.hours_learned") || "Hours Learned"}
        value="127.5"
        icon={<Clock className="w-8 h-8" />}
        trend="+12.5 this week"
      />
      <StatCard
        label={t("dashboard.certificates") || "Certificates"}
        value="3"
        icon={<Award className="w-8 h-8" />}
        trend="+1 earned"
      />
      <StatCard
        label={t("dashboard.completion_rate") || "Completion Rate"}
        value="68%"
        icon={<TrendingUp className="w-8 h-8" />}
        trend="Up from 65%"
      />
    </div>
  )
}
