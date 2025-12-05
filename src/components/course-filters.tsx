"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { setFilters } from "@/redux/slices/coursesSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Design",
  "Business",
];

export function CourseFilters() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.courses.filters);
  const [priceMax, setPriceMax] = useState(500);

  return (
    <div className="sticky top-20 space-y-6 bg-card p-6 rounded-lg border border-border">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">{t("courses.category")}</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() =>
                  dispatch(setFilters({ category: cat === "All" ? "" : cat }))
                }
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  filters.category === (cat === "All" ? "" : cat) ||
                  (cat === "All" && !filters.category)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">{t("courses.price")}</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="500"
            value={priceMax}
            onChange={(e) => {
              const newPrice = Number.parseInt(e.target.value);
              setPriceMax(newPrice);
              dispatch(setFilters({ priceRange: [0, newPrice] }));
            }}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">$0</span>
            <span className="font-semibold text-primary">${priceMax}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <ul className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <li key={rating}>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition flex items-center gap-1">
                {"⭐".repeat(rating)}
                <span className="text-sm text-muted-foreground">& Up</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          dispatch(
            setFilters({ category: "", priceRange: [0, 500], searchQuery: "" })
          );
          setPriceMax(500);
        }}
        className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition text-sm font-medium"
      >
        Clear All
      </button>
    </div>
  );
}
