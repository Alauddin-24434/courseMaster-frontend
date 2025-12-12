"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Star, Users } from "lucide-react";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseAPi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoriesApi";

export function FeaturedCourses() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const limit = 4;

  const { data: catData } = useGetCategoriesQuery();
  const categories: string[] = ["All", ...(catData?.data?.map((cat: any) => cat.name) || [])];

  const { data: courseData, isLoading } = useGetAllCoursesQuery({
    page: 1,
    limit,
  });

  const courses: any[] = courseData?.data?.courses || [];

  const filteredCourses = selectedCategory === "All"
    ? courses
    : courses.filter(course => {
        const category = catData?.data?.find((c: any) => c._id === course.category);
        return category?.name === selectedCategory;
      });

  // Skeleton Array for Loading State
  const skeletons = Array.from({ length: limit });

  return (
    <section className="py-16">
      <div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold">
            {t("home.featured") || "Featured Courses"}
          </h2>
          <p className="text-muted-foreground">
            {t("home.featured_desc") || "Learn from the best instructors in the world"}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition cursor-pointer ${
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
          {isLoading
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-card rounded-lg overflow-hidden border border-border h-80"
                >
                  <div className="bg-muted h-40 w-full" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-gray-300 rounded w-1/2" />
                    <div className="h-5 bg-gray-300 rounded w-full" />
                    <div className="h-3 bg-gray-300 rounded w-3/4" />
                    <div className="flex justify-between mt-4">
                      <div className="h-3 bg-gray-300 rounded w-1/4" />
                      <div className="h-3 bg-gray-300 rounded w-1/6" />
                    </div>
                    <div className="h-5 bg-gray-300 rounded w-1/3 mt-3" />
                  </div>
                </div>
              ))
            : filteredCourses.map((course) => (
                <Link
                  key={course._id}
                  href={`/course/${course._id}`}
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
                      {catData?.data?.find((c: any) => c._id === course.category)?.name || "Uncategorized"}
                    </p>
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

        {/* View All */}
        <div className="text-center pt-8">
          <Link
            href="/courses"
            className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition"
          >
            {t("home.view_all") || "View All Courses"}
          </Link>
        </div>
      </div>
    </section>
  );
}
