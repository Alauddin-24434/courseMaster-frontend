"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";

import Link from "next/link";
import { Star, Users } from "lucide-react";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesApi";

export default function CoursesPage() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high">(
    "newest"
  );
  const [category, setCategory] = useState("");

  // Fetch courses
  const { data, isLoading } = useGetAllCoursesQuery({
    page: 1,
    limit: 1000,
    search,
    category,
    sortBy,
  });
  const courses: any = data?.data?.courses || [];

  // Fetch categories
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];

  // Filter + sort
  const filteredCourses = courses
    .filter((course: any) => {
      if (category && course.category !== category) return false; // category id অনুযায়ী filter
      if (
        search &&
        !course.title.toLowerCase().includes(search.toLowerCase()) &&
        !course.instructor.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const displayedCourses = filteredCourses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  // Skeleton Array for Loading State
  const skeletons = Array.from({ length: 8 });

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-serif font-bold mb-2">
            {t("courses.all")}
          </h1>
          <p className="text-muted-foreground">{t("courses.description")}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder={t("courses.search_placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full md:w-1/3"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="newest">{t("courses.sort.newest")}</option>
            <option value="price-low">{t("courses.sort.priceLow")}</option>
            <option value="price-high">{t("courses.sort.priceHigh")}</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">{t("courses.category.all")}</option>
            {categories.map((cat: any) => (
              <option key={cat._id || cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skeletons.map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-card rounded-lg overflow-hidden border border-border h-80 flex flex-col"
              >
                <div className="bg-muted h-40 w-full" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-3/4" />{" "}
                    {/* category */}
                    <div className="h-5 bg-gray-300 rounded w-full" />{" "}
                    {/* title */}
                    <div className="h-3 bg-gray-300 rounded w-5/6" />{" "}
                    {/* instructor */}
                  </div>
                  <div className="flex justify-between mt-4 items-center">
                    <div className="h-3 bg-gray-300 rounded w-1/4" />{" "}
                    {/* rating */}
                    <div className="h-3 bg-gray-300 rounded w-1/6" />{" "}
                    {/* students */}
                  </div>
                  <div className="h-5 bg-gray-300 rounded w-1/3 mt-3" />{" "}
                  {/* price */}
                </div>
              </div>
            ))}
          </div>
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
                  <p className="text-xs font-semibold text-accent uppercase">
                    {course.categoryName}
                  </p>
                  <h3 className="font-serif font-bold text-lg line-clamp-2 group-hover:text-primary transition">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {course.instructor}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {course.rating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{course?.students?.length || "0"}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-lg font-bold text-primary">
                      ${course.price?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center py-12 text-muted-foreground">
            {t("courses.no_results")}
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              {t("pagination.previous")}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg ${
                  page === p ? "bg-primary text-white" : "border"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              {t("pagination.next")}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
