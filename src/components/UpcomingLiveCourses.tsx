"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { Star, Users, Clock, Video, Calendar } from "lucide-react"

interface LiveCourse {
  id: string
  title: string
  instructor: string
  price: number
  rating: number
  students: number
  duration: string
  category: string
  thumbnail: string
  startTime: Date
  liveViewers: number
  isLive: boolean
}

const mockLiveCourses: LiveCourse[] = [
  {
    id: "live-1",
    title: "React Advanced Patterns - Live Session",
    instructor: "Sarah Johnson",
    price: 0,
    rating: 4.9,
    students: 2340,
    duration: "2 hours",
    category: "React",
    thumbnail: "/react-programming.png",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    liveViewers: 0,
    isLive: false,
  },
  {
    id: "live-2",
    title: "Web Development Q&A - Live Now",
    instructor: "John Smith",
    price: 0,
    rating: 4.8,
    students: 5120,
    duration: "1.5 hours",
    category: "Web Development",
    thumbnail: "/web-development-course.png",
    startTime: new Date(Date.now() - 30 * 60 * 1000),
    liveViewers: 342,
    isLive: true,
  },
  {
    id: "live-3",
    title: "UI/UX Design Workshop - Live Session",
    instructor: "Mike Chen",
    price: 0,
    rating: 4.7,
    students: 1850,
    duration: "3 hours",
    category: "Design",
    thumbnail: "/ui-ux-design-concept.png",
    startTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    liveViewers: 0,
    isLive: false,
  },
  {
    id: "live-4",
    title: "Node.js Optimization Tips - Live Session",
    instructor: "Emma Wilson",
    price: 0,
    rating: 4.8,
    students: 1560,
    duration: "2.5 hours",
    category: "Backend",
    thumbnail: "/nodejs-backend.png",
    startTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    liveViewers: 0,
    isLive: false,
  },
]

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        setTimeLeft("Starting soon")
        return
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return <span className="font-semibold text-accent">{timeLeft}</span>
}

export function UpcomingLiveCourses() {
  const { t } = useTranslation()
  const [courses, setCourses] = useState<LiveCourse[]>(mockLiveCourses)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Video className="w-6 h-6 text-accent animate-pulse" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Live Now & Upcoming</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold">Live Learning Sessions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join interactive live sessions with expert instructors. Ask questions, learn in real-time, and connect
              with other learners.
            </p>
          </div>

          {/* Live Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/live/${course.id}`}
                className="group relative bg-card rounded-lg overflow-hidden border border-border hover:border-accent hover:shadow-xl transition duration-300"
              >
                {/* Live Badge */}
                {course.isLive && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </div>
                )}

                {/* Upcoming Badge */}
                {!course.isLive && (
                  <div className="absolute top-3 right-3 z-10 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Upcoming
                  </div>
                )}

                {/* Thumbnail */}
                <div className="overflow-hidden h-40 bg-muted relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {/* Live viewers overlay */}
                  {course.isLive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <div className="flex items-center gap-2 text-white">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold">{course.liveViewers.toLocaleString()} watching</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <p className="text-xs font-semibold text-accent uppercase">{course.category}</p>
                  <h3 className="font-serif font-bold text-lg line-clamp-2 group-hover:text-accent transition">
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

                  {/* Countdown or Free Badge */}
                  <div className="pt-3 border-t border-border">
                    {course.isLive ? (
                      <button className="w-full px-3 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition text-sm">
                        Join Live
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-accent" />
                          <CountdownTimer targetDate={course.startTime} />
                        </div>
                        <button className="w-full px-3 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition text-sm">
                          Set Reminder
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Live Sessions */}
          <div className="text-center pt-8">
            <Link
              href="/live"
              className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              View All Live Sessions
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
