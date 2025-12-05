import { ICategory } from "@/interfaces/category.interface";
import baseApi from "@/redux/baseApi/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Fetch all categories
    getCategories: build.query<ICategory[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    // Create a category
    createCategory: build.mutation<ICategory, Partial<ICategory>>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    // Update a category
    updateCategory: build.mutation<ICategory, { id: string; body: Partial<ICategory> }>({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    // Delete a category
    deleteCategory: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
