"use client"

import type React from "react"

import { Users, BookOpen, TrendingUp, DollarSign } from "lucide-react"

interface AdminStatProps {
  label: string
  value: string | number
  icon: React.ReactNode
  subtitle: string
}

function AdminStatCard({ label, value, icon, subtitle }: AdminStatProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
        </div>
        <div className="text-primary/20">{icon}</div>
      </div>
    </div>
  )
}

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AdminStatCard
        label="Total Users"
        value="2,483"
        icon={<Users className="w-8 h-8" />}
        subtitle="+12% from last month"
      />
      <AdminStatCard
        label="Total Courses"
        value="48"
        icon={<BookOpen className="w-8 h-8" />}
        subtitle="5 published this month"
      />
      <AdminStatCard
        label="Total Revenue"
        value="$24,580"
        icon={<DollarSign className="w-8 h-8" />}
        subtitle="+8.2% growth"
      />
      <AdminStatCard
        label="Engagement Rate"
        value="68%"
        icon={<TrendingUp className="w-8 h-8" />}
        subtitle="Students active this week"
      />
    </div>
  )
}
