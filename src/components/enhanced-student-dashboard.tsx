"use client"

import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { DashboardStats } from "./dashboard-stats"
import { EnrolledCoursesSection } from "./enrolled-courses-section"
import { DashboardActivity } from "./dashboard-activity"

export function EnhancedStudentDashboard() {
  const { t } = useTranslation()
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-8 border border-primary/20">
          <h1 className="text-4xl font-serif font-bold mb-2">{t("dashboard.title") || "Dashboard"}</h1>
          <p className="text-lg text-muted-foreground">
            {t("dashboard.welcome") || "Welcome back"}, {user?.name}!{" "}
            {t("dashboard.subtitle") || "Keep learning and achieving your goals."}
          </p>
        </div>

        {/* Stats Grid */}
        <DashboardStats />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EnrolledCoursesSection />
          </div>
          <div className="lg:col-span-1">
            <DashboardActivity />
          </div>
        </div>
      </div>
    </div>
  )
}
