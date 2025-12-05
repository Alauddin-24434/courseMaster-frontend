"use client"

import { Eye, Edit, Trash2 } from "lucide-react"

interface Course {
  id: string
  title: string
  instructor: string
  students: number
  revenue: string
  status: "published" | "draft"
}

export function AdminCoursesTable() {
  const courses: Course[] = [
    {
      id: "1",
      title: "Web Development Masterclass",
      instructor: "John Smith",
      students: 342,
      revenue: "$8,550",
      status: "published",
    },
    {
      id: "2",
      title: "Python for Beginners",
      instructor: "Emily Rodriguez",
      students: 521,
      revenue: "$13,025",
      status: "published",
    },
    {
      id: "3",
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      students: 189,
      revenue: "$4,725",
      status: "published",
    },
  ]

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Course</th>
              <th className="px-4 py-3 text-left font-semibold">Instructor</th>
              <th className="px-4 py-3 text-center font-semibold">Students</th>
              <th className="px-4 py-3 text-right font-semibold">Revenue</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr
                key={course.id}
                className={`border-b border-border last:border-0 ${idx % 2 === 0 ? "bg-transparent" : "bg-muted/30"}`}
              >
                <td className="px-4 py-3 font-medium">{course.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{course.instructor}</td>
                <td className="px-4 py-3 text-center">{course.students}</td>
                <td className="px-4 py-3 text-right font-semibold">{course.revenue}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-700">
                    Published
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1.5 hover:bg-muted rounded transition" title="View">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 hover:bg-muted rounded transition" title="Edit">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 hover:bg-muted rounded transition" title="Delete">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
