// src/redux/features/course/courseModuleApi.ts

import baseApi from "@/redux/baseApi/baseApi";

export const courseModuleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Add Module
    addModule: builder.mutation({
      query: (data) => ({
        url: `/modules`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Update Module
    updateModule: builder.mutation({
      query: ({ courseId, moduleId, data }) => ({
        url: `/courses/${courseId}/modules/${moduleId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Add Lesson
    addLesson: builder.mutation({
      query: (data) => ({
        url: `/modules/lessons`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Assignment create
    createAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Quiz create
    createQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    // Get single course with modules & lessons
    getCourse: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: ["Course"],
    }),
  }),
});

// Hooks Exports
export const {
  useAddModuleMutation,
  useUpdateModuleMutation,
  useAddLessonMutation,
  useCreateAssignmentMutation,
  useCreateQuizMutation,
  useGetCourseQuery,
} = courseModuleApi;
