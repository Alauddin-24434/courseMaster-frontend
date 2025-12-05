"use client"

import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import Link from "next/link"
import { ProgressBar } from "./progress-bar"
import { ArrowRight, BookOpen, Award } from "lucide-react"
import { RootState } from "@/redux/store"

const mockEnrolledCourses = [
  {
    id: "1",
    title: "Web Development Masterclass",
    instructor: "John Smith",
    progress: 65,
    thumbnail: "/web-development-concept.png",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    instructor: "Mike Chen",
    progress: 40,
    thumbnail: "/ui-ux-design-concept.png",
  },
]

export function StudentDashboard() {
  const { t } = useTranslation()
  const { user } = useSelector((state: RootState) => state.cmAuth)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 border border-primary/20">
          <h1 className="text-4xl font-serif font-bold mb-2">{t("dashboard.title")}</h1>
          <p className="text-lg text-muted-foreground">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Courses Enrolled</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary opacity-20" />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Hours Learned</p>
                <p className="text-3xl font-bold">42.5</p>
              </div>
              <Award className="w-8 h-8 text-secondary opacity-20" />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Certificates</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <Award className="w-8 h-8 text-accent opacity-20" />
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div>
          <h2 className="text-3xl font-serif font-bold mb-6">{t("dashboard.enrolled")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockEnrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition group cursor-pointer"
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-32 h-24 object-cover rounded-lg group-hover:scale-105 transition"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-serif font-bold line-clamp-2 group-hover:text-primary transition">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    <div className="space-y-1">
                      <ProgressBar progress={course.progress} />
                      <p className="text-xs text-muted-foreground">{course.progress}% Complete</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Link
                    href={`/course/${course.id}/player`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    {t("dashboard.continue")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
