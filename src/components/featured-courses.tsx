"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { Star, Users, Clock } from "lucide-react"

interface Course {
  id: string
  title: string
  instructor: string
  price: number
  rating: number
  students: number
  duration: string
  category: string
  thumbnail: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Web Development Masterclass",
    instructor: "John Smith",
    price: 99.99,
    rating: 4.8,
    students: 15240,
    duration: "24 hours",
    category: "Web Development",
    thumbnail: "/web-development-course.png",
  },
  {
    id: "2",
    title: "React Advanced Patterns",
    instructor: "Sarah Johnson",
    price: 79.99,
    rating: 4.9,
    students: 8920,
    duration: "18 hours",
    category: "React",
    thumbnail: "/react-programming.png",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    instructor: "Mike Chen",
    price: 89.99,
    rating: 4.7,
    students: 12000,
    duration: "20 hours",
    category: "Design",
    thumbnail: "/ui-ux-design-concept.png",
  },
  {
    id: "4",
    title: "Node.js & Express API",
    instructor: "Emma Wilson",
    price: 94.99,
    rating: 4.8,
    students: 9540,
    duration: "22 hours",
    category: "Backend",
    thumbnail: "/nodejs-backend.png",
  },
]

export function FeaturedCourses() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Web Development", "React", "Design", "Backend"]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">{t("home.featured")}</h2>
            <p className="text-muted-foreground">Learn from the best instructors in the world</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCourses.map((course) => (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary hover:shadow-lg transition duration-300"
              >
                <div className="overflow-hidden h-40 bg-muted">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-xs font-semibold text-accent uppercase">{course.category}</p>
                  <h3 className="font-serif font-bold text-lg line-clamp-2 group-hover:text-primary transition">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{(course.students / 1000).toFixed(1)}K</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-lg font-bold text-primary">${course.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center pt-8">
            <Link
              href="/courses"
              className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
