"use client"

import { CourseDetailView } from "@/components/course-detail-view"
import { use } from "react"

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // unwrap the promise

  return (
    <main className="min-h-screen bg-background">
      <CourseDetailView courseId={id} />
    </main>
  )
}
