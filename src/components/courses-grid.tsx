"use client";

import type React from "react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Star, Users, Clock, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import { setFilters, setCurrentPage } from "@/redux/slices/coursesSlice";

interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  category: string;
  thumbnail: string;
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
    category: "Web Development",
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
    category: "Web Development",
    thumbnail: "/nodejs-backend.png",
  },
  {
    id: "5",
    title: "Mobile App Development",
    instructor: "Alex Rodriguez",
    price: 109.99,
    rating: 4.9,
    students: 11000,
    duration: "26 hours",
    category: "Mobile Development",
    thumbnail: "/mobile-app-development.png",
  },
  {
    id: "6",
    title: "Data Science Bootcamp",
    instructor: "Lisa Chen",
    price: 119.99,
    rating: 4.8,
    students: 7800,
    duration: "30 hours",
    category: "Data Science",
    thumbnail: "/data-science-concept.png",
  },
  {
    id: "7",
    title: "Business Strategy Essentials",
    instructor: "David Brown",
    price: 69.99,
    rating: 4.6,
    students: 5200,
    duration: "15 hours",
    category: "Business",
    thumbnail: "/business-strategy-meeting.png",
  },
  {
    id: "8",
    title: "Advanced CSS & Animations",
    instructor: "Sophie Martin",
    price: 59.99,
    rating: 4.7,
    students: 9800,
    duration: "16 hours",
    category: "Web Development",
    thumbnail: "/css-animations.png",
  },
];

export function CoursesGrid({
  sortBy,
  onSortChange,
}: {
  sortBy: string;
  onSortChange: (sort: string) => void;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.courses.filters);
  const currentPage = useSelector(
    (state: RootState) => state.courses.currentPage
  );
  const [searchInput, setSearchInput] = useState("");

  const filteredCourses = mockCourses
    .filter((course) => {
      if (filters.category && course.category !== filters.category)
        return false;
      if (
        course.price > filters.priceRange[1] ||
        course.price < filters.priceRange[0]
      )
        return false;
      if (
        filters.searchQuery &&
        !course.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return b.students - a.students;
        default:
          return 0;
      }
    });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedCourses = filteredCourses.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilters({ searchQuery: searchInput }));
  };

  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <input
            type="text"
            placeholder={t("courses.search")}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="newest">{t("courses.sort")}: Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {/* Courses Grid */}
      {displayedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCourses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary hover:shadow-lg transition duration-300"
            >
              <div className="overflow-hidden h-48 bg-muted">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs font-semibold text-accent uppercase">
                  {course.category}
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
                  <p className="text-lg font-bold text-primary">
                    ${course.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No courses found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-8">
          <button
            onClick={() =>
              dispatch(setCurrentPage(Math.max(1, currentPage - 1)))
            }
            disabled={currentPage === 1}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => dispatch(setCurrentPage(page))}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-muted"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
