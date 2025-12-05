"use client"

import { CourseFilters } from "@/components/course-filters"
import { CoursesGrid } from "@/components/courses-grid"
import { useState } from "react"

import { useTranslation } from "react-i18next"

export default function CoursesPage() {
  const { t } = useTranslation()
  const [sortBy, setSortBy] = useState("newest")

  return (
    <>
 
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-serif font-bold mb-2">{t("courses.all")}</h1>
              <p className="text-muted-foreground">Discover and enroll in thousands of courses</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <aside className="lg:col-span-1">
                <CourseFilters />
              </aside>
              <div className="lg:col-span-3">
                <CoursesGrid sortBy={sortBy} onSortChange={setSortBy} />
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}
