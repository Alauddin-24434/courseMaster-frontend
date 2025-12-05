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

    // Get All Courses
    getAllCourses: build.query<
      ICourseResponse,
      {
        page?: number;
        search?: string;
        sortBy?: string;
        category?: string;
      } | void
    >({
      query: ({ page, search, sortBy, category } = {}) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page.toString());
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

    // Enroll in Course
    enrollCourse: build.mutation<{ message: string; course: ICourse }, string>({
      query: (courseId) => ({
        url: `/courses/enroll/${courseId}`,
        method: "POST",
        // headers: Authorization header can be added globally in baseApi
      }),
      invalidatesTags: ["Course"], // To refresh course info after enrollment
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
} = courseApi;
