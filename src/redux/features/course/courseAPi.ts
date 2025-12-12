// src/redux/features/course/courseApi.ts

import { ICourse, ICourseResponse } from "@/interfaces/course.interface";
import baseApi from "@/redux/baseApi/baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Course
    createCourse: build.mutation<ICourse, Partial<ICourse>>({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),

   getAllCourses: build.query<
      { data: { courses: ICourse[]; total: number; page: number; totalPages: number } },
      { page?: number; limit?: number; search?: string; category?: string; sortBy?: string } | void >({
      query: ({ page, limit, search, category, sortBy } = {}) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        if (category) params.append("category", category);

        return `/courses?${params.toString()}`;
      },
      providesTags: ["Course"],
    }),
    // Get Single Course
    getCourseById: build.query<any, string>({
      query: (id) => `/courses/${id}`,
      providesTags: ["Course"],
    }),

    // Update Course
    updateCourse: build.mutation<
      ICourse,
      { id: string; data: Partial<ICourse> }
    >({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Delete Course
    deleteCourse: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  // ⬇⬇⬇ *** GET MY COURSES (Student enrolled courses) ***
    getMyCourses: build.query<ICourseResponse, void>({
      query: () => `/courses/my-courses`,
      providesTags: ["Course"],
    }),
    // Enroll in Course
    enrollCourse: build.mutation<{ message: string; course: ICourse }, string>({
      query: (courseId) => ({
        url: `/courses/enroll/${courseId}`,
        method: "POST",
        // headers: Authorization header can be added globally in baseApi
      }),
      invalidatesTags: ["Course"], // To refresh course info after enrollment
    }),
     // Complete Lesson
    completeLesson: build.mutation<{ success: boolean; progress: number }, { courseId: string; moduleId: string; lessonId: string }>({
      query: ({ courseId, moduleId, lessonId }) => ({
        url: "/courses/complete-lesson",
        method: "POST",
        body: { courseId, moduleId, lessonId },
      }),
      // ✅ Automatically invalidates cache if needed
      invalidatesTags: ["Course"],
    }),
  }),
});

// Hooks
export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useEnrollCourseMutation,
  useGetMyCoursesQuery,
  useCompleteLessonMutation
} = courseApi;
