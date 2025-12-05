"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ICourse } from "@/interfaces/course.interface";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import Link from "next/link";
import { Star, Users } from "lucide-react";

export default function CoursesPage() {
  const { t } = useTranslation();

  // State for filters & sorting
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">("newest");
  const [category, setCategory] = useState("");


  

  // Fetch courses using RTK Query
 const { data, isLoading } = useGetAllCoursesQuery({ page, search, sortBy, category });
const courses = data?.data || [];
  // Filter + search + sort (client-side example)
  const filteredCourses = courses
    .filter(course => {
      if (category && course.category !== category) return false;
      if (search && !course.title.toLowerCase().includes(search.toLowerCase()) &&
         !course.instructor.toLowerCase().includes(search.toLowerCase())
      ) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        default: return 0;
      }
    });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const displayedCourses = filteredCourses.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-5xl font-serif font-bold mb-2">{t("courses.all")}</h1>
          <p className="text-muted-foreground">Discover and enroll in thousands of courses</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Search by title or instructor"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full md:w-1/3"
          />

          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-4 py-2 border rounded-lg">
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-2 border rounded-lg">
            <option value="">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Design">Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <p>Loading courses...</p>
        ) : displayedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedCourses.map((course: any) => (
            <Link
              key={course._id || course.id}
              href={`/course/${course._id || course.id}`}
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
                <p className="text-xs font-semibold text-accent uppercase">{course.categoryName}</p>
                <h3 className="font-serif font-bold text-lg line-clamp-2 group-hover:text-primary transition">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating?.toFixed(1) || "0.0"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{course.enrollCounts.length || "0"}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-lg font-bold text-primary">${course.price?.toFixed(2) || "0.00"}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        ) : (
          <p className="text-center py-12 text-muted-foreground">No courses found.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg ${page === p ? "bg-primary text-white" : "border"}`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
