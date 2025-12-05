"use client"

import { useTranslation } from "react-i18next"
import { AdminStats } from "./admin-stats"
import { AdminCoursesTable } from "./admin-courses-table"
import { AdminUsersTable } from "./admin-users-table"

export function AdminDashboard() {
  const { t } = useTranslation()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-bold">{t("admin.title") || "Admin Dashboard"}</h1>
          <p className="text-muted-foreground">
            {t("admin.subtitle") || "Manage courses, users, and platform analytics"}
          </p>
        </div>

        {/* Stats */}
        <AdminStats />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Courses */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">{t("admin.recent_courses") || "Recent Courses"}</h2>
            <AdminCoursesTable />
          </div>

          {/* Recent Users */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-6">{t("admin.recent_users") || "Recent Users"}</h2>
            <AdminUsersTable />
          </div>
        </div>
      </div>
    </div>
  )
}
