"use client"

import { useTranslation } from "react-i18next"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { ProgressBar } from "./progress-bar"

interface EnrolledCourse {
  id: string
  title: string
  instructor: string
  progress: number
  thumbnail: string
  rating: number
  lastAccessed: string
}

export function EnrolledCoursesSection() {
  const { t } = useTranslation()

  const enrolledCourses: EnrolledCourse[] = [
    {
      id: "1",
      title: "Web Development Masterclass",
      instructor: "John Smith",
      progress: 65,
      thumbnail: "/web-development-concept.png",
      rating: 4.8,
      lastAccessed: "2 hours ago",
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Chen",
      progress: 40,
      thumbnail: "/ui-ux-design-concept.png",
      rating: 4.9,
      lastAccessed: "1 day ago",
    },
    {
      id: "5",
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      progress: 25,
      thumbnail: "/react-programming.png",
      rating: 4.7,
      lastAccessed: "3 days ago",
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold">{t("dashboard.enrolled") || "Enrolled Courses"}</h2>
        <Link href="/courses" className="text-primary hover:underline text-sm font-medium">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition group"
          >
            <div className="relative overflow-hidden h-40 bg-muted">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition"
              />
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-serif font-bold text-lg line-clamp-2 group-hover:text-primary transition">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-2">({course.rating})</span>
              </div>

              <div className="space-y-1">
                <ProgressBar progress={course.progress} />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{course.progress}% Complete</span>
                  <span>{course.lastAccessed}</span>
                </div>
              </div>

              <Link
                href={`/course/${course.id}/player`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline pt-2"
              >
                {t("dashboard.continue") || "Continue"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
